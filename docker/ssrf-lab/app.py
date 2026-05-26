from flask import Flask, render_template, request, session, redirect, url_for, jsonify
import os
import requests

app = Flask(__name__)
app.secret_key = 'super_secret_ssrf_key'

# Fake Database
USERS = {
    1: {"id": 1, "username": "employee_john", "password": "password123", "role": "user", "email": "john@securecorp.com"}
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
    return render_template('dashboard.html', user=user)

@app.route('/api/fetch', methods=['POST'])
def fetch_api():
    if 'user_id' not in session:
        return jsonify({"error": "Unauthorized"}), 401
    
    url = request.form.get('url', '')
    if not url:
        return jsonify({"error": "URL is required"}), 400
        
    try:
        # Perform server-side GET request
        resp = requests.get(url, timeout=3, verify=False)
        return jsonify({
            "status": resp.status_code,
            "headers": dict(resp.headers),
            "body": resp.text
        })
    except Exception as e:
        return jsonify({"error": f"Failed to fetch: {str(e)}"}), 500

@app.route('/api/fetch-secure', methods=['POST'])
def fetch_api_secure():
    if 'user_id' not in session:
        return jsonify({"error": "Unauthorized"}), 401
    
    url = request.form.get('url', '').strip()
    if not url:
        return jsonify({"error": "URL is required"}), 400
        
    # Basic SSRF filter / Blacklist
    blacklist = ["127.0.0.1", "localhost"]
    for word in blacklist:
        if word in url.lower():
            return jsonify({"error": "Security Alert: Access to 127.0.0.1 and localhost is blocked by the Firewall."}), 403
            
    try:
        # Perform server-side GET request
        resp = requests.get(url, timeout=3, verify=False)
        return jsonify({
            "status": resp.status_code,
            "headers": dict(resp.headers),
            "body": resp.text
        })
    except Exception as e:
        return jsonify({"error": f"Failed to fetch: {str(e)}"}), 500

@app.route('/admin')
def admin():
    # Only allow requests originating from localhost (127.0.0.1)
    if request.remote_addr != '127.0.0.1':
        return render_template('error.html', message="Access Denied: Localhost (127.0.0.1) requests only."), 403
    return render_template('admin.html', flag="CTF{SSRF_l0c4lh0st_byp4ss}")

@app.route('/secure-admin')
def secure_admin():
    # Only allow requests originating from localhost (127.0.0.1)
    if request.remote_addr != '127.0.0.1':
        return render_template('error.html', message="Access Denied: Localhost (127.0.0.1) requests only."), 403
    return render_template('admin.html', flag="CTF{SSRF_byp4ss_bl4ckl1st}")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
