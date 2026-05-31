from flask import Flask, render_template, request, session, redirect, url_for, jsonify
import os

app = Flask(__name__)
app.secret_key = 'super_secret_idor_key'

# Fake Database
USERS = {
    1: {"id": 1, "username": "employee_john", "password": "password123", "role": "user", "email": "john@securecorp.com"},
    2: {"id": 2, "username": "admin_sarah", "password": "supersecretpassword", "role": "admin", "email": "sarah@securecorp.com"}
}

INVOICES = {
    1001: {"id": 1001, "user_id": 1, "amount": "$500", "desc": "Office Supplies", "status": "Paid"},
    1002: {"id": 1002, "user_id": 1, "amount": "$1200", "desc": "New Laptops", "status": "Pending"},
    1003: {"id": 1003, "user_id": 2, "amount": "$10,000", "desc": "Server Infrastructure - FLAG: CTF{ID0R_1nv0ic3_l34k}", "status": "Paid"},
    1004: {"id": 1004, "user_id": 2, "amount": "$50,000", "desc": "Security Audit Q3", "status": "Pending"}
}

@app.route('/')
def index():
    if 'user_id' in session:
        return redirect(url_for('dashboard'))
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')
    for u_id, user in USERS.items():
        if user['username'] == username and user['password'] == password:
            session['user_id'] = u_id
            return redirect(url_for('dashboard'))
    return "Invalid credentials. Hint: use employee_john / password123", 401

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('index'))

@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('index'))
    user = USERS[session['user_id']]
    user_invoices = [inv for inv in INVOICES.values() if inv['user_id'] == user['id']]
    return render_template('dashboard.html', user=user, invoices=user_invoices)

@app.route('/invoice/<int:invoice_id>')
@app.route('/dashboard/invoice/<int:invoice_id>')
def view_invoice(invoice_id):
    if 'user_id' not in session:
        return redirect(url_for('index'))
    
    # VULNERABILITY: No check if the invoice belongs to the logged-in user! (IDOR)
    invoice = INVOICES.get(invoice_id)
    if not invoice:
        return "Invoice not found", 404
        
    return render_template('invoice.html', invoice=invoice)

@app.route('/profile')
def profile():
    if 'user_id' not in session:
        return redirect(url_for('index'))
    user = USERS[session['user_id']]
    return render_template('profile.html', user=user)

@app.route('/api/update_profile', methods=['POST'])
def update_profile():
    if 'user_id' not in session:
        return jsonify({"error": "Unauthorized"}), 401
    
    data = request.json
    
    # VULNERABILITY: Mass Assignment / IDOR on user ID
    target_id = data.get('user_id', session['user_id'])
    
    # Ensure it's an integer
    try:
        target_id = int(target_id)
    except ValueError:
        return jsonify({"error": "Invalid user_id format"}), 400
    
    if target_id not in USERS:
        return jsonify({"error": "User not found"}), 404
        
    user = USERS[target_id]
    
    # Update fields
    if 'email' in data:
        user['email'] = data['email']
    if 'role' in data:
        user['role'] = data['role'] # VULNERABILITY: User can update their own role
        
    return jsonify({"success": True, "message": "Profile updated successfully"})

@app.route('/admin')
def admin():
    if 'user_id' not in session:
        return redirect(url_for('index'))
    
    user = USERS[session['user_id']]
    if user['role'] != 'admin':
        return render_template('error.html', message="Access Denied: Admins only"), 403
        
    return render_template('admin.html', flag="CTF{ID0R_pr1v_3sc_4dm1n}")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
