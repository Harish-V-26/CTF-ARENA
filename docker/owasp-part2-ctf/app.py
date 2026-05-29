"""
OWASP Part 2 (6-10) CTF Challenge Target
Vulnerabilities:
  - OWASP #10: Verbose error handling & stack trace leakage (database credentials & hidden path)
  - OWASP #6: Insecure Design (predictable secret path & missing rate limit)
  - OWASP #7: Identification & Authentication Failures (user enumeration, brute force, predictable sessions)
  - OWASP #8: Software and Data Integrity Failures (insecure deserialization of unsigned Base64 JSON)
  - OWASP #9: Security Logging & Monitoring Failures (disabled alerts & log injection)
"""
from flask import Flask, render_template_string, request, session, redirect, url_for, jsonify, make_response
import secrets
import hashlib
import base64
import json
import subprocess

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)

# Configuration / "Database"
USERS = {
    "guest": {"password": "guestpassword", "role": "guest"},
    "sysadmin": {"password": "sysadmin123", "role": "administrator"},
}

DB_CONN = "mysql://sysadmin:sysadmin123@10.0.5.10:3306/production_vault"
MASTER_FLAG = "CTF{owasp_part2_compl3t3_chain_auth_integrity_errors_design_logging}"

# Security Log Store
SECURITY_LOGS = [
    {"time": "12:00:05", "level": "INFO", "msg": "System initialized successfully."},
    {"time": "12:05:22", "level": "WARN", "msg": "Intrusion alerts are disabled (ALERTS_ENABLED=FALSE)."},
]

# Write flag to /app/flag.txt for the deserialization exploit to read
try:
    with open("/app/flag.txt", "w") as f:
        f.write(MASTER_FLAG)
except Exception:
    pass

# HTML Styles block to reuse across self-contained templates
STYLE_BLOCK = """
    <style>
        :root {
            --bg-base: #080c10;
            --bg-surface: #0d1217;
            --bg-element: #161b22;
            --border: #30363d;
            --text: #c9d1d9;
            --text-muted: #8b949e;
            --accent: #ff4d6d;
            --accent-dim: rgba(255, 77, 109, 0.15);
            --success: #2ecc71;
            --warning: #f39c12;
            --error: #e74c3c;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            background: var(--bg-base);
            color: var(--text);
            line-height: 1.5;
            padding: 20px;
        }
        .container {
            max-width: 900px;
            margin: 40px auto;
            padding: 0 20px;
        }
        header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 1px solid var(--border);
            padding-bottom: 20px;
        }
        h1 { color: #fff; font-size: 2rem; margin-bottom: 8px; font-weight: 700; }
        h1 span { color: var(--accent); }
        .subtitle { color: var(--text-muted); font-size: 1rem; }
        .card {
            background: var(--bg-surface);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 30px;
            margin-bottom: 24px;
        }
        .card-title {
            font-size: 1.25rem;
            color: #fff;
            margin-bottom: 16px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .card-title::before {
            content: '';
            display: inline-block;
            width: 4px;
            height: 1.25rem;
            background: var(--accent);
            border-radius: 2px;
        }
        input, select, textarea {
            width: 100%;
            padding: 10px 14px;
            background: var(--bg-base);
            border: 1px solid var(--border);
            border-radius: 6px;
            color: var(--text);
            font-size: 0.95rem;
            margin-bottom: 12px;
            transition: border-color 0.2s;
        }
        input:focus, select:focus, textarea:focus {
            outline: none;
            border-color: var(--accent);
        }
        button {
            background: var(--accent);
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: opacity 0.2s;
        }
        button:hover { opacity: 0.9; }
        .btn-muted {
            background: rgba(255, 255, 255, 0.1);
            color: var(--text);
            margin-left: 10px;
        }
        .feedback {
            margin-top: 14px;
            padding: 12px;
            border-radius: 6px;
            font-size: 0.9rem;
            font-weight: bold;
        }
        .feedback.err {
            background: rgba(231, 76, 60, 0.15);
            color: var(--error);
            border: 1px solid rgba(231, 76, 60, 0.3);
        }
        .feedback.ok {
            background: rgba(46, 204, 113, 0.15);
            color: var(--success);
            border: 1px solid rgba(46, 204, 113, 0.3);
        }
        .feedback.warn {
            background: rgba(243, 156, 18, 0.15);
            color: var(--warning);
            border: 1px solid rgba(243, 156, 18, 0.3);
        }
        .feedback.info {
            background: rgba(52, 152, 219, 0.15);
            color: #3498db;
            border: 1px solid rgba(52, 152, 219, 0.3);
        }
        pre.error-trace {
            background: #000;
            color: #ff3b30;
            padding: 16px;
            border-radius: 6px;
            font-family: monospace;
            font-size: 0.85rem;
            white-space: pre-wrap;
            overflow-x: auto;
            border-left: 4px solid var(--error);
            margin-top: 15px;
        }
        .log-container {
            background: #000;
            border: 1px solid var(--border);
            padding: 15px;
            border-radius: 6px;
            font-family: monospace;
            font-size: 0.85rem;
            max-height: 250px;
            overflow-y: auto;
            margin-bottom: 15px;
        }
        .log-entry { margin-bottom: 6px; }
        .log-entry.INFO { color: #3498db; }
        .log-entry.WARN { color: var(--warning); }
        .log-entry.ERROR { color: var(--error); }
        .log-entry.SUCCESS { color: var(--success); }
        .badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: bold;
            text-transform: uppercase;
        }
        .badge.active { background: rgba(46, 204, 113, 0.15); color: var(--success); }
        .badge.disabled { background: rgba(231, 76, 60, 0.15); color: var(--error); }
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: var(--bg-surface);
            padding: 14px 24px;
            border-radius: 8px;
            margin-bottom: 30px;
            border: 1px solid var(--border);
        }
        nav a { color: var(--accent); text-decoration: none; font-weight: bold; }
        nav a:hover { text-decoration: underline; }
    </style>
"""

INDEX_TEMPLATE = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SecureCorp — Infrastructure Portal v2</title>
    {STYLE_BLOCK}
</head>
<body>
    <div class="container">
        <header>
            <h1>SecureCorp <span>Infrastructure Portal</span></h1>
            <p class="subtitle">Protected Environment — Authorized Operators Only</p>
        </header>
        
        <div class="card">
            <div class="card-title">Diagnostics Database Connection Check</div>
            <p style="color: var(--text-muted); margin-bottom: 15px;">Verify the status of the main data store. In case of failure, debug tracebacks will assist the engineer.</p>
            
            <form method="POST" action="/test-db">
                <button type="submit">Test Connection</button>
            </form>
            
            {{% if error_trace %}}
                <pre class="error-trace">{{{{ error_trace }}}}</pre>
            {{% endif %}}
        </div>

        <div class="card" style="text-align: center;">
            <div class="card-title" style="justify-content: center;">Operator Authorization</div>
            <p style="color: var(--text-muted); margin-bottom: 20px;">If you have active portal credentials, authenticate below.</p>
            <a href="/sys-admin-login"><button>Portal Login</button></a>
        </div>
    </div>
</body>
</html>
"""

LOGIN_TEMPLATE = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SecureCorp — Employee Login</title>
    {STYLE_BLOCK}
</head>
<body>
    <div class="container">
        <header>
            <h1>SecureCorp <span>Infrastructure Portal</span></h1>
            <p class="subtitle">Protected Environment — Authorized Operators Only</p>
        </header>

        <nav>
            <a href="/">← Return Home</a>
        </nav>

        <div class="card" style="max-width: 450px; margin: 0 auto;">
            <div class="card-title">Employee Authentication</div>
            
            {{% if error %}}
                <div class="feedback err">{{{{ error }}}}</div>
            {{% endif %}}
            
            <form method="POST" action="/sys-admin-login">
                <label>Username</label>
                <input type="text" name="username" placeholder="e.g. guest" required autocomplete="off">
                
                <label>Password</label>
                <input type="password" name="password" required>
                
                <button type="submit" style="width: 100%;">Sign In</button>
            </form>
            <p style="color: var(--text-muted); font-size: 0.8rem; text-align: center; margin-top: 15px;">Hint: guest / guestpassword</p>
        </div>
    </div>
</body>
</html>
"""

ADMIN_PORTAL_TEMPLATE = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SecureCorp — Dashboard</title>
    {STYLE_BLOCK}
</head>
<body>
    <div class="container">
        <header>
            <h1>SecureCorp <span>Infrastructure Portal</span></h1>
            <p class="subtitle">Protected Environment — Authorized Operators Only</p>
        </header>

        <nav>
            <span>Welcome, <strong>{{{{ username }}}}</strong> (Role: {{{{ role }}}})</span>
            <a href="/logout">Logout</a>
        </nav>

        <div class="card">
            <div class="card-title">Monitoring & Alert System Status</div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-base); padding: 15px; border-radius: 6px; border: 1px solid var(--border);">
                <div>
                    <strong>Alert Triggering Engine:</strong>
                    <span class="badge {{{{ 'active' if alerts_enabled else 'disabled' }}}}">
                        {{{{ 'ACTIVE' if alerts_enabled else 'DISABLED' }}}}
                    </span>
                </div>
                <form method="POST" action="/toggle-alerts">
                    <button type="submit" class="btn-muted">Toggle Alerts</button>
                </form>
            </div>
        </div>

        <div class="card">
            <div class="card-title">Security Event Logs</div>
            <div class="log-container">
                {{% for log in logs %}}
                    <div class="log-entry {{{{ log.level }}}}">
                        [{{{{ log.time }}}}] [{{{{ log.level }}}}] {{{{ log.msg }}}}
                    </div>
                {{% endfor %}}
            </div>
            
            <p style="color: var(--text-muted); margin-bottom: 12px; font-size: 0.9rem;">Submit a search query to inspect recent events. Inputs are stored in the temporary system session logger.</p>
            
            <form method="POST" action="/search-logs" style="display: flex; gap: 10px;">
                <input type="text" name="query" placeholder="Enter log search query..." required style="margin-bottom: 0;">
                <button type="submit">Search</button>
            </form>
            
            {{% if search_feedback %}}
                <div class="feedback info">{{{{ search_feedback }}}}</div>
            {{% endif %}}
        </div>

        {{% if role == 'administrator' %}}
        <div class="card">
            <div class="card-title">Custom Plugin Installer</div>
            <p style="color: var(--text-muted); margin-bottom: 15px;">Administrators can upload customized modules to enhance the monitoring interface. Provide a Base64-encoded JSON configuration file.</p>
            
            <form method="POST" action="/load-plugin">
                <textarea name="payload" rows="4" placeholder="Base64 JSON plugin payload..." required></textarea>
                <button type="submit">Deploy Plugin</button>
            </form>
            
            {{% if plugin_feedback %}}
                <div class="feedback ok">{{{{ plugin_feedback }}}}</div>
            {{% endif %}}
            {{% if plugin_error %}}
                <div class="feedback err">{{{{ plugin_error }}}}</div>
            {{% endif %}}
        </div>
        {{% else %}}
        <div class="card">
            <div class="card-title">Custom Plugin Installer</div>
            <div class="feedback err">Access Denied: Only users with the role 'administrator' can deploy custom plugins.</div>
        </div>
        {{% endif %}}
    </div>
</body>
</html>
"""

# --- Core Routes ---

@app.route('/')
def home():
    error_trace = session.pop('db_error', None)
    return render_template_string(INDEX_TEMPLATE, error_trace=error_trace), 200

# OWASP #10: Verbose Error Handling & Credentials leakage
@app.route('/test-db', methods=['POST'])
def test_db():
    # Force a database connection failure traceback that leaks credentials and a hidden path
    trace = (
        "Traceback (most recent call last):\n"
        "  File \"/app/app.py\", line 155, in test_db\n"
        "    connection = db_connect(conn_str)\n"
        "  File \"/app/db/connector.py\", line 34, in db_connect\n"
        f"    raise ConnectionError(\"Failed to connect to {DB_CONN}: Host unreachable.\")\n"
        "ConnectionError: Failed to connect to MySQL database server.\n\n"
        "--- Internal Diagnostics ---\n"
        "Config file loaded: /app/config.json\n"
        "System parameters:\n"
        "  DEBUG = True\n"
        "  ALERTS_ENABLED = False\n"
        "  ADMIN_URL_PATH = /sys-admin-login  <-- (Security warning: hidden path is active)\n"
        "  COOKIE_INTEGRITY = NONE"
    )
    session['db_error'] = trace
    return redirect(url_for('home'))

# Fallback route for /login to redirect to /sys-admin-login
@app.route('/login', methods=['GET', 'POST'])
def login_fallback():
    return redirect(url_for('login'))

# OWASP #6: Insecure Design (predictable path and missing rate limiting)
@app.route('/sys-admin-login', methods=['GET', 'POST'])
def login():
    # If a valid session cookie is already present, redirect to dashboard
    token = request.cookies.get('session_token')
    if token:
        for user in USERS:
            if hashlib.md5(user.encode()).hexdigest() == token:
                return redirect(url_for('dashboard'))

    if request.method == 'GET':
        error = session.pop('login_error', None)
        return render_template_string(LOGIN_TEMPLATE, error=error)
        
    username = request.form.get('username', '').strip().lower()
    password = request.form.get('password', '')

    # OWASP #7: Authentication Failures — User Enumeration via distinct messages
    if username not in USERS:
        session['login_error'] = f"User '{username}' does not exist in our employee database."
        return redirect(url_for('login'))
        
    if USERS[username]['password'] != password:
        session['login_error'] = f"Incorrect password for user '{username}'."
        return redirect(url_for('login'))

    # Successful authentication
    session['username'] = username
    session['role'] = USERS[username]['role']
    
    # OWASP #7: Predictable session cookie (MD5 of username)
    token = hashlib.md5(username.encode()).hexdigest()
    
    response = make_response(redirect(url_for('dashboard')))
    response.set_cookie('session_token', token)
    return response

@app.route('/dashboard')
def dashboard():
    # Verify session via predictable cookie token
    token = request.cookies.get('session_token')
    username = None
    
    if token:
        # Check token values
        for user in USERS:
            if hashlib.md5(user.encode()).hexdigest() == token:
                username = user
                break
                
    if not username:
        return redirect(url_for('login'))
        
    role = USERS[username]['role']
    
    # Grab alerts and logging states
    alerts = session.get('alerts_enabled', False)
    search_feedback = session.pop('search_feedback', None)
    plugin_feedback = session.pop('plugin_feedback', None)
    plugin_error = session.pop('plugin_error', None)
    
    return render_template_string(
        ADMIN_PORTAL_TEMPLATE,
        username=username,
        role=role,
        alerts_enabled=alerts,
        logs=SECURITY_LOGS,
        search_feedback=search_feedback,
        plugin_feedback=plugin_feedback,
        plugin_error=plugin_error
    )

# OWASP #9: Security Logging & Monitoring Failures (Disabled alerts by default & Log Injection)
@app.route('/toggle-alerts', methods=['POST'])
def toggle_alerts():
    current_state = session.get('alerts_enabled', False)
    session['alerts_enabled'] = not current_state
    
    log_msg = f"Alert status changed to {'ENABLED' if not current_state else 'DISABLED'}."
    SECURITY_LOGS.append({
        "time": "12:10:00",
        "level": "SUCCESS" if not current_state else "WARN",
        "msg": log_msg
    })
    return redirect(url_for('dashboard'))

@app.route('/search-logs', methods=['POST'])
def search_logs():
    query = request.form.get('query', '').strip()
    
    # OWASP #9: Log Injection via unsanitized query string
    SECURITY_LOGS.append({
        "time": "12:12:01",
        "level": "INFO",
        "msg": f"Log search executed with query: \"{query}\""
    })
    
    # If the user attempts log injection to fake success
    if "SUCCESS" in query or "SUCCESS" in query.upper() or "]" in query:
        session['search_feedback'] = "Query logged. Alert Engine triggered: Potential Log Injection Vulnerability detected!"
    else:
        session['search_feedback'] = f"No events matched query: \"{query}\""
        
    return redirect(url_for('dashboard'))

# OWASP #8: Software and Data Integrity Failures — Insecure Deserialization of Base64 JSON
@app.route('/load-plugin', methods=['POST'])
def load_plugin():
    # Auth validation (must be admin)
    token = request.cookies.get('session_token')
    is_admin = False
    if token and hashlib.md5(b"sysadmin").hexdigest() == token:
        is_admin = True
        
    if not is_admin:
        session['plugin_error'] = "Access Denied: Admin role required."
        return redirect(url_for('dashboard'))
        
    payload_b64 = request.form.get('payload', '').strip()
    try:
        # Decode and deserialize
        decoded_bytes = base64.b64decode(payload_b64)
        config = json.loads(decoded_bytes.decode())
        
        # Insecure handling: if cmd is present, execute it on the host! (RCE payload trigger)
        if "cmd" in config:
            cmd = config["cmd"]
            # Filter output slightly or run it directly
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
            output = result.stdout + result.stderr
            session['plugin_feedback'] = f"Plugin '{config.get('name', 'unknown')}' loaded. Run output: {output}"
        else:
            session['plugin_feedback'] = f"Plugin '{config.get('name', 'unknown')}' registered successfully (Integrity Check: PASSED - Warning: No digital signatures verified)."
            
    except Exception as e:
        session['plugin_error'] = f"Deserialization Error: {str(e)}"
        
    return redirect(url_for('dashboard'))

@app.route('/logout')
def logout():
    response = make_response(redirect(url_for('home')))
    response.delete_cookie('session_token')
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
