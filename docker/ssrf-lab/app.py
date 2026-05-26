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

def handle_local_or_mock_requests(url):
    """
    Handles local file protocol and mocks cloud metadata services
    to simulate real-world SSRF scenarios.
    """
    # 1. Handle file:// scheme for Local File LFI simulation
    if url.lower().startswith('file://'):
        filepath = url[7:]
        # Prevent accessing paths outside standard locations if needed, 
        # but in a docker environment it's fine.
        if os.path.exists(filepath) and os.path.isfile(filepath):
            try:
                with open(filepath, 'r', errors='ignore') as f:
                    content = f.read()
                return {
                    "status": 200,
                    "headers": {"Content-Type": "text/plain"},
                    "body": content
                }
            except Exception as e:
                return {"error": f"Error reading file: {str(e)}"}
        else:
            return {"error": f"File not found: {filepath}"}

    # 2. Intercept AWS Metadata Service (169.254.169.254)
    if "169.254.169.254" in url:
        url_lower = url.lower()
        if "/latest/meta-data/iam/security-credentials/admin-role" in url_lower:
            return {
                "status": 200,
                "headers": {"Content-Type": "application/json"},
                "body": '{\n  "Code" : "Success",\n  "LastUpdated" : "2026-05-26T12:00:00Z",\n  "Type" : "AWS-HMAC",\n  "AccessKeyId" : "ASIAIOSFODNN7EXAMPLE",\n  "SecretAccessKey" : "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",\n  "Token" : "CTF{SSRF_cl0ud_m3t4d4t4_l34k}",\n  "Expiration" : "2036-05-26T18:00:00Z"\n}'
            }
        elif "/latest/meta-data/iam/security-credentials" in url_lower:
            return {
                "status": 200,
                "headers": {"Content-Type": "text/plain"},
                "body": "admin-role"
            }
        elif "/latest/meta-data" in url_lower:
            return {
                "status": 200,
                "headers": {"Content-Type": "text/plain"},
                "body": "iam/"
            }
        else:
            return {
                "status": 200,
                "headers": {"Content-Type": "text/plain"},
                "body": "latest/"
            }
            
    return None

@app.route('/api/fetch', methods=['POST'])
def fetch_api():
    if 'user_id' not in session:
        return jsonify({"error": "Unauthorized"}), 401
    
    url = request.form.get('url', '').strip()
    if not url:
        return jsonify({"error": "URL is required"}), 400
        
    # Check for local protocols / mock metadata first
    local_response = handle_local_or_mock_requests(url)
    if local_response is not None:
        if "error" in local_response:
            return jsonify({"error": local_response["error"]}), 400
        return jsonify(local_response)
        
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
            
    # Check for local protocols / mock metadata first
    local_response = handle_local_or_mock_requests(url)
    if local_response is not None:
        if "error" in local_response:
            return jsonify({"error": local_response["error"]}), 400
        return jsonify(local_response)
        
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
    # Regular page, doesn't contain flags directly
    if request.remote_addr != '127.0.0.1':
        return render_template('error.html', message="Access Denied: Localhost (127.0.0.1) requests only."), 403
    return render_template('admin.html', flag="[Access Granted] System status: Operational. Please check /api/admin/config for system variables.")

@app.route('/api/admin/config')
def admin_config():
    # Internal system configuration API
    if request.remote_addr != '127.0.0.1':
        return render_template('error.html', message="Access Denied: Localhost (127.0.0.1) requests only."), 403
    return jsonify({
        "status": "success",
        "app_env": "production",
        "debug": False,
        "database_uri": "postgresql://admin:super_secret_db_pass@127.0.0.1:5432/securecorp",
        "system_flag": "CTF{SSRF_byp4ss_bl4ckl1st}"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
