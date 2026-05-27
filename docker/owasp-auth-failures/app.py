"""
OWASP #7 — Identification & Authentication Failures Lab
A deliberately insecure login system demonstrating:
  - Weak password policy (accepts anything)
  - No rate limiting on login attempts
  - Predictable session tokens
  - No MFA
  - User enumeration via different error messages
"""
from flask import Flask, render_template_string, request, session, redirect, url_for, jsonify, make_response
import secrets
import hashlib
import time

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)

# --- In-Memory Database ---
USERS = {
    "admin":    {"password": "admin123",    "role": "admin", "email": "admin@securecorp.io"},
    "alice":    {"password": "password",    "role": "user",  "email": "alice@securecorp.io"},
    "bob":      {"password": "letmein",     "role": "user",  "email": "bob@securecorp.io"},
    "charlie":  {"password": "qwerty",      "role": "user",  "email": "charlie@securecorp.io"},
}

LOGIN_ATTEMPTS = {}  # username -> count
SESSION_STORE = {}   # token -> username

FLAG_ENUM     = "CTF{us3r_3num3r4t10n_l34k}"
FLAG_BRUTEFORCE = "CTF{n0_r4t3_l1m1t_br00t}"
FLAG_SESSION  = "CTF{pr3d1ct4bl3_s3ss10n_t0k3n}"
FLAG_ADMIN    = "CTF{4uth_f41lur3_4dm1n_4cc3ss}"

# ──── Templates ────

LOGIN_HTML = """<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SecureCorp — Login</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',sans-serif;background:#0d1117;color:#c9d1d9;display:flex;justify-content:center;align-items:center;min-height:100vh}.card{background:#161b22;border:1px solid #30363d;border-radius:12px;padding:40px;width:400px}.card h1{color:#3498db;text-align:center;margin-bottom:8px}.card p.sub{text-align:center;color:#8b949e;margin-bottom:24px;font-size:.9em}input{width:100%;padding:12px;margin-bottom:14px;background:#0d1117;border:1px solid #30363d;border-radius:6px;color:#c9d1d9;font-size:.95em}button{width:100%;padding:12px;background:#3498db;border:none;border-radius:6px;color:#fff;font-weight:bold;font-size:1em;cursor:pointer}button:hover{background:#2980b9}.msg{padding:10px;border-radius:6px;margin-bottom:14px;font-size:.9em}.msg.err{background:rgba(231,76,60,.15);color:#e74c3c;border:1px solid rgba(231,76,60,.3)}.msg.ok{background:rgba(46,204,113,.15);color:#2ecc71}.msg.flag{background:rgba(243,156,18,.15);color:#f39c12;border:1px solid rgba(243,156,18,.4);font-family:monospace}.hint{margin-top:16px;color:#8b949e;font-size:.82em;text-align:center}
</style></head><body><div class="card"><h1>SecureCorp</h1><p class="sub">Employee Portal — Login</p>
{% if error %}<div class="msg err">{{ error }}</div>{% endif %}
{% if flag_msg %}<div class="msg flag">{{ flag_msg }}</div>{% endif %}
<form method="POST" action="/login"><input name="username" placeholder="Username" required><input name="password" type="password" placeholder="Password" required><button>Sign In</button></form>
<p class="hint">Try common usernames: admin, alice, bob, charlie</p>
</div></body></html>"""

DASHBOARD_HTML = """<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SecureCorp — Dashboard</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',sans-serif;background:#0d1117;color:#c9d1d9;padding:20px}nav{display:flex;justify-content:space-between;align-items:center;padding:16px 24px;background:#161b22;border-radius:8px;margin-bottom:24px}nav h2{color:#3498db}nav a{color:#3498db;text-decoration:none}.panel{background:#161b22;border:1px solid #30363d;border-radius:10px;padding:24px;max-width:700px;margin:0 auto}.panel h2{color:#3498db;margin-bottom:16px}.info{margin-bottom:12px;padding:10px;background:#0d1117;border-radius:6px;border:1px solid #30363d}.info strong{color:#f39c12}.flag{background:rgba(243,156,18,.15);color:#f39c12;border:1px solid rgba(243,156,18,.4);padding:14px;border-radius:6px;font-family:monospace;margin-top:16px;text-align:center;font-size:1.05em}.session-info{margin-top:16px;padding:12px;background:rgba(52,152,219,.1);border:1px solid rgba(52,152,219,.3);border-radius:6px;font-size:.85em;color:#8b949e}
</style></head><body>
<nav><h2>SecureCorp</h2><span>{{ role|upper }} — {{ user }} | <a href="/logout">Logout</a></span></nav>
<div class="panel"><h2>Dashboard</h2>
<div class="info"><strong>Username:</strong> {{ user }}</div>
<div class="info"><strong>Email:</strong> {{ email }}</div>
<div class="info"><strong>Role:</strong> {{ role }}</div>
<div class="info"><strong>Session Token:</strong> <code>{{ token }}</code></div>
{% if role == 'admin' %}<div class="flag">Admin Access Achieved! {{ flag }}</div>{% endif %}
<div class="session-info">Notice: Your session token is a simple MD5 hash of your username. This is a <strong style="color:#e74c3c">predictable session token</strong> vulnerability! An attacker who knows this pattern can forge any user's session.<br><br>Flag for discovering this: <strong style="color:#f39c12">{{ session_flag }}</strong></div>
</div></body></html>"""

# ──── Routes ────

@app.route('/')
def index():
    if 'username' in session:
        return redirect(url_for('dashboard'))
    return render_template_string(LOGIN_HTML)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return redirect(url_for('index'))
    username = request.form.get('username', '').strip().lower()
    password = request.form.get('password', '')
    flag_msg = None

    # BUG 1: User enumeration — different messages for valid vs invalid users
    if username not in USERS:
        return render_template_string(LOGIN_HTML, error=f"User '{username}' does not exist in our system.",
                                      flag_msg=f"User Enumeration Detected! {FLAG_ENUM}")

    # BUG 2: No rate limiting — track attempts but never block
    LOGIN_ATTEMPTS.setdefault(username, 0)
    LOGIN_ATTEMPTS[username] += 1

    if LOGIN_ATTEMPTS[username] == 5:
        flag_msg = f"5 failed attempts — no lockout! {FLAG_BRUTEFORCE}"

    if USERS[username]['password'] != password:
        return render_template_string(LOGIN_HTML,
                                      error=f"Incorrect password for user '{username}'. Attempt #{LOGIN_ATTEMPTS[username]}",
                                      flag_msg=flag_msg)

    # BUG 3: Predictable session token (MD5 of username)
    token = hashlib.md5(username.encode()).hexdigest()
    SESSION_STORE[token] = username

    session['username'] = username
    session['token'] = token
    LOGIN_ATTEMPTS[username] = 0

    resp = make_response(redirect(url_for('dashboard')))
    resp.set_cookie('session_token', token, httponly=False)  # BUG: httponly=False
    return resp

@app.route('/dashboard')
def dashboard():
    if 'username' not in session:
        # Check cookie for session hijacking
        token = request.cookies.get('session_token')
        if token and token in SESSION_STORE:
            session['username'] = SESSION_STORE[token]
            session['token'] = token
        else:
            return redirect(url_for('index'))

    username = session['username']
    user_data = USERS.get(username, {})
    token = session.get('token', '')

    return render_template_string(DASHBOARD_HTML,
                                  user=username,
                                  email=user_data.get('email', ''),
                                  role=user_data.get('role', 'user'),
                                  token=token,
                                  flag=FLAG_ADMIN,
                                  session_flag=FLAG_SESSION)

@app.route('/logout')
def logout():
    token = session.get('token')
    if token and token in SESSION_STORE:
        del SESSION_STORE[token]
    session.clear()
    resp = make_response(redirect(url_for('index')))
    resp.delete_cookie('session_token')
    return resp

# API endpoint to check if a user exists (another enumeration vector)
@app.route('/api/check-user')
def check_user():
    username = request.args.get('u', '').strip().lower()
    if username in USERS:
        return jsonify({"exists": True, "message": f"User '{username}' found"})
    return jsonify({"exists": False, "message": "User not found"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
