"""
OWASP #8 - Software & Data Integrity Failures Lab
"""
from flask import Flask, render_template_string, request, session, redirect, url_for, jsonify, make_response
import secrets, hashlib, base64, json

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)

PACKAGES = [
    {"name": "auth-module", "version": "2.1.0", "hash": "a1b2c3d4", "signed": True, "status": "verified"},
    {"name": "payment-gw", "version": "1.5.2", "hash": "e5f6g7h8", "signed": True, "status": "verified"},
    {"name": "log-service", "version": "3.0.1", "hash": "i9j0k1l2", "signed": False, "status": "unverified"},
]
PIPELINE = [
    {"time": "10:00:01", "action": "git pull origin main", "status": "ok"},
    {"time": "10:00:15", "action": "npm install (no integrity)", "status": "warning"},
    {"time": "10:00:30", "action": "build artifacts", "status": "ok"},
    {"time": "10:00:45", "action": "deploy to prod (no sig)", "status": "critical"},
]

F1 = "CTF{uns1gn3d_p4ck4g3_4cc3pt3d}"
F2 = "CTF{d3s3r14l1z4t10n_4tt4ck}"
F3 = "CTF{c1cd_p1p3l1n3_t4mp3r3d}"
F4 = "CTF{d4t4_1nt3gr1ty_f41lur3}"

LOGIN = """<!DOCTYPE html><html><head><meta charset="UTF-8"><title>DevOps Console</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:sans-serif;background:#0d1117;color:#c9d1d9;display:flex;justify-content:center;align-items:center;min-height:100vh}.c{background:#161b22;border:1px solid #30363d;border-radius:12px;padding:40px;width:380px;text-align:center}h1{color:#9b59b6;margin-bottom:8px}input{width:100%;padding:12px;margin-bottom:14px;background:#0d1117;border:1px solid #30363d;border-radius:6px;color:#c9d1d9}button{width:100%;padding:12px;background:#9b59b6;border:none;border-radius:6px;color:#fff;font-weight:bold;cursor:pointer}.h{margin-top:16px;color:#8b949e;font-size:.82em}</style></head>
<body><div class="c"><h1>DevOps Console</h1><p style="color:#8b949e;margin-bottom:24px">CI/CD Pipeline Management</p>
{% if e %}<div style="color:#e74c3c;margin-bottom:14px">{{e}}</div>{% endif %}
<form method="POST" action="/login"><input name="u" placeholder="Username" value="devops"><input name="p" type="password" placeholder="Password"><button>Sign In</button></form>
<p class="h">devops / build2026</p></div></body></html>"""

DASH = """<!DOCTYPE html><html><head><meta charset="UTF-8"><title>DevOps Dashboard</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:sans-serif;background:#0d1117;color:#c9d1d9;padding:20px}nav{display:flex;justify-content:space-between;padding:16px 24px;background:#161b22;border-radius:8px;margin-bottom:24px}nav h2{color:#9b59b6}nav a{color:#9b59b6;text-decoration:none}.s{background:#161b22;border:1px solid #30363d;border-radius:10px;padding:20px;margin-bottom:20px}.s h3{color:#9b59b6;margin-bottom:14px}table{width:100%;border-collapse:collapse}th,td{padding:10px;text-align:left;border-bottom:1px solid #30363d;font-size:.9em}th{color:#f39c12}.ok{color:#2ecc71}.warning{color:#f39c12}.critical{color:#e74c3c}.fl{background:rgba(243,156,18,.15);color:#f39c12;border:1px solid rgba(243,156,18,.4);padding:14px;border-radius:6px;font-family:monospace;margin-top:12px;text-align:center}textarea{width:100%;height:80px;background:#0d1117;border:1px solid #30363d;border-radius:6px;color:#c9d1d9;padding:10px;font-family:monospace;margin-bottom:10px}button.a{padding:10px 20px;background:#9b59b6;border:none;border-radius:6px;color:#fff;font-weight:bold;cursor:pointer}</style></head>
<body><nav><h2>DevOps Console</h2><a href="/logout">Logout</a></nav>
<div class="s"><h3>Package Registry</h3>
<table><tr><th>Package</th><th>Version</th><th>Hash</th><th>Signed</th><th>Status</th></tr>
{% for p in pkgs %}<tr><td>{{p.name}}</td><td>{{p.version}}</td><td><code>{{p.hash}}</code></td><td>{{"Yes" if p.signed else "NO"}}</td><td class="{{p.status}}">{{p.status|upper}}</td></tr>{% endfor %}</table>
<p style="margin-top:14px;color:#8b949e;font-size:.85em">The <strong style="color:#e74c3c">log-service</strong> is unsigned yet accepted!</p>
<div class="fl">{{f1}}</div></div>
<div class="s"><h3>CI/CD Pipeline Log</h3>
<table><tr><th>Time</th><th>Action</th><th>Status</th></tr>
{% for l in pipe %}<tr><td>{{l.time}}</td><td>{{l.action}}</td><td class="{{l.status}}">{{l.status|upper}}</td></tr>{% endfor %}</table>
<p style="margin-top:14px;color:#8b949e;font-size:.85em">Pipeline deploys <strong style="color:#e74c3c">without signature verification</strong>.</p>
<div class="fl">{{f3}}</div></div>
<div class="s"><h3>Plugin Loader (Deserialization)</h3>
<p style="margin-bottom:12px;color:#8b949e;font-size:.9em">Base64-encode a JSON plugin config. Server deserializes without validation.</p>
<form method="POST" action="/load-plugin"><textarea name="d" placeholder='Base64: {"name":"exploit","cmd":"cat /flag.txt"}'></textarea><button class="a">Load Plugin</button></form>
{% if pr %}<div style="margin-top:12px;padding:12px;background:rgba(243,156,18,.1);border:1px solid rgba(243,156,18,.3);border-radius:6px;color:#f39c12">{{pr}}</div>{% endif %}</div>
<div class="s"><h3>Data Integrity Checker</h3>
<p style="margin-bottom:12px;color:#8b949e;font-size:.9em">Modify the <code>user_prefs</code> cookie to change your role from "viewer". The server does not verify integrity.</p>
<div style="padding:10px;background:#0d1117;border-radius:6px;border:1px solid #30363d"><strong>Prefs:</strong> {{prefs}}</div>
{% if tf %}<div class="fl">{{tf}}</div>{% endif %}</div>
</body></html>"""

@app.route('/')
def index():
    if 'u' in session: return redirect(url_for('dash'))
    return render_template_string(LOGIN)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return redirect(url_for('index'))
    if request.form.get('u')=='devops' and request.form.get('p')=='build2026':
        session['u']='devops'
        r=redirect(url_for('dash'))
        r.set_cookie('user_prefs', base64.b64encode(json.dumps({"theme":"dark","role":"viewer"}).encode()).decode())
        return r
    return render_template_string(LOGIN, e="Invalid credentials")

@app.route('/dashboard')
def dash():
    if 'u' not in session: return redirect('/')
    pb=request.cookies.get('user_prefs',''); tf=None; prefs="None"
    try:
        pj=json.loads(base64.b64decode(pb).decode()); prefs=json.dumps(pj)
        if pj.get('role','viewer')!='viewer': tf=F4
    except: prefs=pb or "None"
    return render_template_string(DASH, pkgs=PACKAGES, pipe=PIPELINE, f1=F1, f3=F3, prefs=prefs, tf=tf, pr=None)

@app.route('/load-plugin', methods=['POST'])
def load_plugin():
    if 'u' not in session: return redirect('/')
    d=request.form.get('d','')
    try:
        dec=base64.b64decode(d).decode(); pl=json.loads(dec)
        if 'cmd' in pl and 'flag' in pl.get('cmd',''): pr=f"Plugin '{pl.get('name','?')}' executed: {pl['cmd']} -> {F2}"
        else: pr=f"Plugin '{pl.get('name','?')}' loaded. Config: {json.dumps(pl)}"
    except Exception as e: pr=f"Error: {e}"
    pb=request.cookies.get('user_prefs',''); tf=None; prefs="None"
    try:
        pj=json.loads(base64.b64decode(pb).decode()); prefs=json.dumps(pj)
        if pj.get('role','viewer')!='viewer': tf=F4
    except: prefs=pb or "None"
    return render_template_string(DASH, pkgs=PACKAGES, pipe=PIPELINE, f1=F1, f3=F3, prefs=prefs, tf=tf, pr=pr)

@app.route('/logout')
def logout():
    session.clear(); r=make_response(redirect('/')); r.delete_cookie('user_prefs'); return r

if __name__=='__main__': app.run(host='0.0.0.0', port=80)
