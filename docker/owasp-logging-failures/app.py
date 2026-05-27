"""
OWASP #9 - Security Logging & Monitoring Failures Lab
"""
from flask import Flask, render_template_string, request, session, redirect, url_for, jsonify
import secrets, time, json
from datetime import datetime

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)

USERS = {"admin": "SuperSecure!42", "analyst": "monitor2026"}
SECURITY_LOG = []
FAILED_LOGINS = {}
ALERTS_ENABLED = False

F1 = "CTF{n0_l0gg1ng_brut3_f0rc3}"
F2 = "CTF{s1l3nt_4l4rm_f41lur3}"
F3 = "CTF{l0g_1nj3ct10n_4tt4ck}"
F4 = "CTF{m1ss1ng_m0n1t0r1ng}"

LOGIN = """<!DOCTYPE html><html><head><meta charset="UTF-8"><title>SOC Console</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:sans-serif;background:#0d1117;color:#c9d1d9;display:flex;justify-content:center;align-items:center;min-height:100vh}.c{background:#161b22;border:1px solid #30363d;border-radius:12px;padding:40px;width:400px;text-align:center}h1{color:#2ecc71;margin-bottom:8px}input{width:100%;padding:12px;margin-bottom:14px;background:#0d1117;border:1px solid #30363d;border-radius:6px;color:#c9d1d9}button{width:100%;padding:12px;background:#2ecc71;border:none;border-radius:6px;color:#fff;font-weight:bold;cursor:pointer}button:hover{background:#27ae60}.e{color:#e74c3c;margin-bottom:14px}.h{margin-top:16px;color:#8b949e;font-size:.82em}.fl{background:rgba(243,156,18,.15);color:#f39c12;border:1px solid rgba(243,156,18,.4);padding:14px;border-radius:6px;font-family:monospace;margin-top:12px}</style></head>
<body><div class="c"><h1>SOC Console</h1><p style="color:#8b949e;margin-bottom:24px">Security Operations Center</p>
{% if e %}<div class="e">{{e}}</div>{% endif %}
{% if fl %}<div class="fl">{{fl}}</div>{% endif %}
<form method="POST" action="/login"><input name="u" placeholder="Username"><input name="p" type="password" placeholder="Password"><button>Log In</button></form>
<p class="h">analyst / monitor2026</p></div></body></html>"""

DASH = """<!DOCTYPE html><html><head><meta charset="UTF-8"><title>SOC Dashboard</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:sans-serif;background:#0d1117;color:#c9d1d9;padding:20px}nav{display:flex;justify-content:space-between;padding:16px 24px;background:#161b22;border-radius:8px;margin-bottom:24px}nav h2{color:#2ecc71}nav a{color:#2ecc71;text-decoration:none}.s{background:#161b22;border:1px solid #30363d;border-radius:10px;padding:20px;margin-bottom:20px}.s h3{color:#2ecc71;margin-bottom:14px}.log{background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:14px;font-family:monospace;font-size:.85em;max-height:300px;overflow-y:auto;margin-bottom:12px}.log-entry{padding:4px 0;border-bottom:1px solid #1a1f29}.log-ok{color:#2ecc71}.log-warn{color:#f39c12}.log-err{color:#e74c3c}.log-info{color:#3498db}.fl{background:rgba(243,156,18,.15);color:#f39c12;border:1px solid rgba(243,156,18,.4);padding:14px;border-radius:6px;font-family:monospace;margin-top:12px;text-align:center}.alert-box{padding:14px;border-radius:6px;margin-bottom:14px}.alert-off{background:rgba(231,76,60,.1);border:1px solid rgba(231,76,60,.3);color:#e74c3c}.alert-on{background:rgba(46,204,113,.1);border:1px solid rgba(46,204,113,.3);color:#2ecc71}button.a{padding:10px 20px;border:none;border-radius:6px;color:#fff;font-weight:bold;cursor:pointer;margin-right:8px}button.g{background:#2ecc71}button.r{background:#e74c3c}input.q{width:70%;padding:10px;background:#0d1117;border:1px solid #30363d;border-radius:6px;color:#c9d1d9;margin-bottom:10px}</style></head>
<body><nav><h2>SOC Console</h2><span>{{user}} | <a href="/logout">Logout</a></span></nav>

<div class="s"><h3>Alert System Status</h3>
<div class="alert-box {{'alert-on' if alerts else 'alert-off'}}">{{"ALERTS ENABLED" if alerts else "ALERTS DISABLED - No intrusion detection active!"}}</div>
<form method="POST" action="/toggle-alerts" style="display:inline"><button class="a g">Enable Alerts</button></form>
<form method="POST" action="/toggle-alerts" style="display:inline"><button class="a r">Disable Alerts</button></form>
{% if not alerts %}<div class="fl">{{f4}}</div>{% endif %}
</div>

<div class="s"><h3>Security Event Log</h3>
<div class="log">{% if logs %}{% for l in logs %}<div class="log-entry log-{{l.level}}">[{{l.time}}] [{{l.level|upper}}] {{l.msg}}</div>{% endfor %}{% else %}<div style="color:#8b949e">No security events recorded. This system is NOT logging login attempts!</div>{% endif %}</div>
<p style="color:#8b949e;font-size:.85em">Total failed login attempts: <strong style="color:#e74c3c">{{failed_count}}</strong> — Notice: no alerts were triggered!</p>
{% if failed_count >= 5 %}<div class="fl">Brute force undetected! {{f1}}</div>{% endif %}
</div>

<div class="s"><h3>Log Injection Test</h3>
<p style="margin-bottom:12px;color:#8b949e;font-size:.9em">Enter a search query. The server logs your input without sanitization.</p>
<form method="POST" action="/search"><input class="q" name="q" placeholder='Try: admin"] [OK] User logged in successfully'><button class="a g">Search</button></form>
{% if search_result %}<div style="margin-top:12px;padding:12px;background:rgba(46,204,113,.1);border:1px solid rgba(46,204,113,.3);border-radius:6px;color:#2ecc71">{{search_result}}</div>{% endif %}
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
    u=request.form.get('u',''); p=request.form.get('p',''); fl=None
    FAILED_LOGINS.setdefault('total', 0)
    if u in USERS and USERS[u]==p:
        session['u']=u
        return redirect(url_for('dash'))
    FAILED_LOGINS['total']+=1
    # BUG: Failed login is NOT logged to the security log
    if FAILED_LOGINS['total']>=5: fl=f"5+ failed logins with no alert! {F1}"
    return render_template_string(LOGIN, e=f"Invalid credentials (attempt #{FAILED_LOGINS['total']})", fl=fl)

@app.route('/dashboard')
def dash():
    if 'u' not in session: return redirect('/')
    return render_template_string(DASH, user=session['u'], logs=SECURITY_LOG, alerts=ALERTS_ENABLED,
                                  failed_count=FAILED_LOGINS.get('total',0), f1=F1, f4=F4, search_result=None)

@app.route('/toggle-alerts', methods=['POST'])
def toggle():
    global ALERTS_ENABLED
    ALERTS_ENABLED = not ALERTS_ENABLED
    SECURITY_LOG.append({"time": datetime.now().strftime("%H:%M:%S"), "level": "info",
                         "msg": f"Alerts {'enabled' if ALERTS_ENABLED else 'disabled'} by {session.get('u','?')}"})
    if ALERTS_ENABLED:
        SECURITY_LOG.append({"time": datetime.now().strftime("%H:%M:%S"), "level": "ok",
                             "msg": f"Alert system activated. Flag: {F2}"})
    return redirect(url_for('dash'))

@app.route('/search', methods=['POST'])
def search():
    if 'u' not in session: return redirect('/')
    q = request.form.get('q','')
    # BUG: Log injection - user input written directly to log without sanitization
    SECURITY_LOG.append({"time": datetime.now().strftime("%H:%M:%S"), "level": "info",
                         "msg": f'Search query by {session["u"]}: "{q}"'})
    sr = f"Search complete for: {q}"
    if ']' in q and '[' in q:
        sr = f"Log injection detected! Your crafted entry was written to the log. {F3}"
    return render_template_string(DASH, user=session['u'], logs=SECURITY_LOG, alerts=ALERTS_ENABLED,
                                  failed_count=FAILED_LOGINS.get('total',0), f1=F1, f4=F4, search_result=sr)

@app.route('/logout')
def logout():
    session.clear(); return redirect('/')

if __name__=='__main__': app.run(host='0.0.0.0', port=80)
