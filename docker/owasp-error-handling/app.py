"""
OWASP #10 - Mishandling of Exceptional Conditions / Error Handling Lab
"""
from flask import Flask, render_template_string, request, session, redirect, url_for, jsonify
import secrets, traceback, os

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)
app.config['DEBUG'] = True  # BUG: Debug mode in production

USERS = {"developer": "dev2026", "admin": "SecretAdmin!99"}
DB_CONN = "mysql://admin:P@ssw0rd123!@10.0.1.5:3306/production_db"

F1 = "CTF{v3rb0s3_3rr0r_l34k}"
F2 = "CTF{st4ck_tr4c3_3xp0s3d}"
F3 = "CTF{d3bug_m0d3_1n_pr0d}"
F4 = "CTF{db_cr3d3nt14ls_l34k3d}"

LOGIN = """<!DOCTYPE html><html><head><meta charset="UTF-8"><title>AppServer — Login</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:sans-serif;background:#0d1117;color:#c9d1d9;display:flex;justify-content:center;align-items:center;min-height:100vh}.c{background:#161b22;border:1px solid #30363d;border-radius:12px;padding:40px;width:380px;text-align:center}h1{color:#e67e22;margin-bottom:8px}input{width:100%;padding:12px;margin-bottom:14px;background:#0d1117;border:1px solid #30363d;border-radius:6px;color:#c9d1d9}button{width:100%;padding:12px;background:#e67e22;border:none;border-radius:6px;color:#fff;font-weight:bold;cursor:pointer}button:hover{background:#d35400}.h{margin-top:16px;color:#8b949e;font-size:.82em}</style></head>
<body><div class="c"><h1>AppServer</h1><p style="color:#8b949e;margin-bottom:24px">Application Management Console</p>
{% if e %}<div style="color:#e74c3c;margin-bottom:14px">{{e}}</div>{% endif %}
<form method="POST" action="/login"><input name="u" placeholder="Username" value="developer"><input name="p" type="password" placeholder="Password"><button>Sign In</button></form>
<p class="h">developer / dev2026</p></div></body></html>"""

DASH = """<!DOCTYPE html><html><head><meta charset="UTF-8"><title>AppServer Dashboard</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:sans-serif;background:#0d1117;color:#c9d1d9;padding:20px}nav{display:flex;justify-content:space-between;padding:16px 24px;background:#161b22;border-radius:8px;margin-bottom:24px}nav h2{color:#e67e22}nav a{color:#e67e22;text-decoration:none}.s{background:#161b22;border:1px solid #30363d;border-radius:10px;padding:20px;margin-bottom:20px}.s h3{color:#e67e22;margin-bottom:14px}.fl{background:rgba(243,156,18,.15);color:#f39c12;border:1px solid rgba(243,156,18,.4);padding:14px;border-radius:6px;font-family:monospace;margin-top:12px;text-align:center}input.q{width:70%;padding:10px;background:#0d1117;border:1px solid #30363d;border-radius:6px;color:#c9d1d9;margin-bottom:10px}button.a{padding:10px 20px;background:#e67e22;border:none;border-radius:6px;color:#fff;font-weight:bold;cursor:pointer;margin-right:8px}button.a:hover{background:#d35400}pre.err{background:#0d1117;border:1px solid #e74c3c;border-radius:6px;padding:14px;color:#e74c3c;font-size:.82em;overflow-x:auto;margin-top:12px;white-space:pre-wrap}.warn{background:rgba(231,76,60,.1);border:1px solid rgba(231,76,60,.3);color:#e74c3c;padding:14px;border-radius:6px;margin-bottom:14px}</style></head>
<body><nav><h2>AppServer Console</h2><span>{{user}} | <a href="/logout">Logout</a></span></nav>

<div class="s"><h3>Debug Mode Status</h3>
<div class="warn">WARNING: Application is running with DEBUG=True in production! Stack traces are exposed to all users.</div>
<div class="fl">{{f3}}</div></div>

<div class="s"><h3>User Lookup (Verbose Errors)</h3>
<p style="margin-bottom:12px;color:#8b949e;font-size:.9em">Query a user ID. Invalid input triggers unhandled exceptions that leak internal details.</p>
<form method="GET" action="/api/user"><input class="q" name="id" placeholder="Enter user ID (try: abc, 999, -1)"><button class="a">Lookup</button></form>
{% if error_output %}<pre class="err">{{error_output}}</pre>{% endif %}
{% if flag_verbose %}<div class="fl">{{flag_verbose}}</div>{% endif %}
</div>

<div class="s"><h3>Database Connection Test</h3>
<p style="margin-bottom:12px;color:#8b949e;font-size:.9em">Click to test the database connection. On failure, the full connection string (with credentials) is leaked in the error.</p>
<form method="POST" action="/test-db"><button class="a">Test Connection</button></form>
{% if db_error %}<pre class="err">{{db_error}}</pre>{% endif %}
{% if flag_db %}<div class="fl">{{flag_db}}</div>{% endif %}
</div>

<div class="s"><h3>File Reader (Path Disclosure)</h3>
<p style="margin-bottom:12px;color:#8b949e;font-size:.9em">Read a server config file. Errors reveal full filesystem paths.</p>
<form method="GET" action="/read-config"><input class="q" name="file" placeholder="Try: /etc/shadow, /nonexistent"><button class="a">Read File</button></form>
{% if file_error %}<pre class="err">{{file_error}}</pre>{% endif %}
{% if flag_stack %}<div class="fl">{{flag_stack}}</div>{% endif %}
</div>

</body></html>"""

@app.route('/')
def index():
    if 'u' in session: return redirect(url_for('dash'))
    return render_template_string(LOGIN)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return redirect(url_for('index'))
    u=request.form.get('u',''); p=request.form.get('p','')
    if u in USERS and USERS[u]==p:
        session['u']=u; return redirect(url_for('dash'))
    return render_template_string(LOGIN, e="Invalid credentials")

@app.route('/dashboard')
def dash():
    if 'u' not in session: return redirect('/')
    return render_template_string(DASH, user=session['u'], f3=F3,
        error_output=None, flag_verbose=None, db_error=None, flag_db=None,
        file_error=None, flag_stack=None)

@app.route('/api/user')
def user_lookup():
    if 'u' not in session: return redirect('/')
    uid = request.args.get('id', '')
    error_output=None; flag_verbose=None
    try:
        uid_int = int(uid)
        if uid_int < 0: raise ValueError(f"Negative user ID not allowed: {uid_int}")
        if uid_int > 100: raise IndexError(f"User ID {uid_int} out of range in database table 'users' at {DB_CONN}")
        error_output = f"User #{uid_int}: developer@securecorp.io (role: user)"
    except ValueError as e:
        error_output = f"ValueError: {str(e)}\n\nTraceback (most recent call last):\n  File \"/app/app.py\", line 89, in user_lookup\n    uid_int = int(uid)\n  File \"/app/models/user.py\", line 42, in validate_id\n    raise ValueError(f\"Invalid ID: {{uid}}\")\n\nServer: Python/3.9 Flask/2.3.3\nDB Connection: {DB_CONN}\nApp Root: /app\nConfig: /app/config/production.yml"
        flag_verbose = F1
    except IndexError as e:
        error_output = f"IndexError: {str(e)}\n\nDatabase Query Failed:\n  SELECT * FROM users WHERE id={uid_int};\n  Connection: {DB_CONN}\n  Table: production_db.users (1547 rows)\n\nStack Trace:\n  File \"/app/app.py\", line 91\n  File \"/app/db/connector.py\", line 23\n  File \"/usr/lib/python3.9/mysql/connector.py\", line 156"
        flag_verbose = F4
    return render_template_string(DASH, user=session['u'], f3=F3,
        error_output=error_output, flag_verbose=flag_verbose,
        db_error=None, flag_db=None, file_error=None, flag_stack=None)

@app.route('/test-db', methods=['POST'])
def test_db():
    if 'u' not in session: return redirect('/')
    db_error = f"ConnectionRefusedError: Failed to connect to database\n\n  Connection String: {DB_CONN}\n  Host: 10.0.1.5\n  Port: 3306\n  Username: admin\n  Password: P@ssw0rd123!\n  Database: production_db\n\nTraceback:\n  File \"/app/db/connector.py\", line 15, in connect\n    self.conn = mysql.connector.connect(**self.config)\n  File \"/usr/lib/python3.9/site-packages/mysql/connector/connection.py\", line 176\n    raise InterfaceError(\"Connection refused\")"
    return render_template_string(DASH, user=session['u'], f3=F3,
        error_output=None, flag_verbose=None, db_error=db_error, flag_db=F4,
        file_error=None, flag_stack=None)

@app.route('/read-config')
def read_config():
    if 'u' not in session: return redirect('/')
    f = request.args.get('file', '/etc/hostname')
    file_error=None; flag_stack=None
    try:
        with open(f, 'r') as fh: content = fh.read()
        file_error = f"File contents ({f}):\n{content}"
    except Exception as e:
        file_error = f"FileNotFoundError: [Errno 2] No such file or directory: '{f}'\n\nFull Stack Trace:\n{traceback.format_exc()}\n\nServer Info:\n  Working Directory: {os.getcwd()}\n  App Root: /app\n  Python Path: {':'.join(os.sys.path[:3])}\n  User: root\n  PID: {os.getpid()}"
        flag_stack = F2
    return render_template_string(DASH, user=session['u'], f3=F3,
        error_output=None, flag_verbose=None, db_error=None, flag_db=None,
        file_error=file_error, flag_stack=flag_stack)

@app.route('/logout')
def logout():
    session.clear(); return redirect('/')

if __name__=='__main__': app.run(host='0.0.0.0', port=80, debug=True)
