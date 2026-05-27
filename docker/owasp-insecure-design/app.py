"""
OWASP #4 — Insecure Design Lab
A deliberately insecure coupon/discount system for a fictional e-commerce store.
Vulnerabilities:
  - No rate limiting on coupon guessing
  - Predictable coupon codes
  - No business logic validation (applying coupons multiple times)
  - Missing abuse-case controls
"""
from flask import Flask, render_template_string, request, session, redirect, url_for, jsonify
import secrets
import time

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)

# --- In-Memory "Database" ---
USERS = {
    "customer": {"password": "shop2026", "role": "customer"},
    "admin":    {"password": "SecureAdmin!99", "role": "admin"},
}

PRODUCTS = [
    {"id": 1, "name": "Wireless Headphones", "price": 120.00},
    {"id": 2, "name": "Mechanical Keyboard",  "price": 85.00},
    {"id": 3, "name": "USB-C Hub",            "price": 45.00},
]

# Predictable coupon — insecure design flaw
VALID_COUPONS = {
    "SAVE10":  10,
    "SAVE20":  20,
    "SAVE50":  50,
    "MEGA100": 100,  # 100% off — the flag coupon
}

COUPON_ATTEMPTS = {}   # ip -> [timestamps]
APPLIED_COUPONS = {}   # session_id -> [coupons]

FLAG_DESIGN    = "CTF{1ns3cur3_d3s1gn_n0_r4t3_l1m1t}"
FLAG_ABUSE     = "CTF{bus1n3ss_l0g1c_fl4w_d0ubl3_c0up0n}"
FLAG_ADMIN     = "CTF{pr3d1ct4bl3_s3cr3t_p4th}"

# ──────────────────── HTML Templates ────────────────────

LOGIN_PAGE = """<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ShopSecure — Login</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',sans-serif;background:#0d1117;color:#c9d1d9;display:flex;justify-content:center;align-items:center;min-height:100vh}.card{background:#161b22;border:1px solid #30363d;border-radius:12px;padding:40px;width:380px;text-align:center}h1{color:#f39c12;margin-bottom:8px}p.sub{color:#8b949e;margin-bottom:24px;font-size:.9em}input{width:100%;padding:12px;margin-bottom:14px;background:#0d1117;border:1px solid #30363d;border-radius:6px;color:#c9d1d9;font-size:.95em}button{width:100%;padding:12px;background:#f39c12;border:none;border-radius:6px;color:#fff;font-weight:bold;font-size:1em;cursor:pointer}button:hover{background:#d35400}.err{color:#e74c3c;margin-bottom:14px;font-size:.9em}</style></head>
<body><div class="card"><h1>ShopSecure</h1><p class="sub">Log in to the online store</p>
{% if error %}<div class="err">{{ error }}</div>{% endif %}
<form method="POST" action="/login"><input name="username" placeholder="Username" required><input name="password" type="password" placeholder="Password" required><button>Log In</button></form>
<p style="margin-top:16px;color:#8b949e;font-size:.82em">Hint: customer / shop2026</p></div></body></html>"""

SHOP_PAGE = """<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ShopSecure — Store</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',sans-serif;background:#0d1117;color:#c9d1d9;padding:20px}nav{display:flex;justify-content:space-between;align-items:center;padding:16px 24px;background:#161b22;border-radius:8px;margin-bottom:24px}nav h2{color:#f39c12}nav a{color:#f39c12;text-decoration:none}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;margin-bottom:30px}.product{background:#161b22;border:1px solid #30363d;border-radius:10px;padding:20px;text-align:center}.product h3{color:#fff;margin-bottom:6px}.product .price{color:#f39c12;font-size:1.3em;font-weight:bold;margin:10px 0}.coupon-section{background:#161b22;border:1px solid #30363d;border-radius:10px;padding:24px;max-width:500px;margin:0 auto;text-align:center}.coupon-section h3{color:#f39c12;margin-bottom:12px}input.coupon{width:70%;padding:10px;background:#0d1117;border:1px solid #30363d;border-radius:6px;color:#c9d1d9}button.apply{padding:10px 20px;background:#f39c12;border:none;border-radius:6px;color:#fff;font-weight:bold;cursor:pointer;margin-left:8px}button.apply:hover{background:#d35400}.msg{margin-top:14px;padding:10px;border-radius:6px;font-size:.9em}.msg.ok{background:rgba(46,204,113,.15);color:#2ecc71;border:1px solid rgba(46,204,113,.3)}.msg.err{background:rgba(231,76,60,.15);color:#e74c3c;border:1px solid rgba(231,76,60,.3)}.msg.flag{background:rgba(243,156,18,.15);color:#f39c12;border:1px solid rgba(243,156,18,.4);font-weight:bold;font-size:1.05em}.applied{margin-top:16px;color:#8b949e;font-size:.85em}
</style></head><body>
<nav><h2>ShopSecure</h2><span>Welcome, {{ user }} | <a href="/logout">Logout</a></span></nav>
<div class="grid">{% for p in products %}<div class="product"><h3>{{ p.name }}</h3><div class="price">${{ "%.2f"|format(p.price) }}</div></div>{% endfor %}</div>
<div class="coupon-section"><h3>Apply Coupon Code</h3>
<form method="POST" action="/apply-coupon" style="display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:center"><input class="coupon" name="code" placeholder="Enter coupon code…" required><button class="apply">Apply</button></form>
{% if msg %}<div class="msg {{ msg_class }}">{{ msg }}</div>{% endif %}
{% if applied %}<div class="applied">Applied coupons this session: {{ applied|join(', ') }}</div>{% endif %}
</div></body></html>"""

ADMIN_PAGE = """<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>ShopSecure — Admin</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',sans-serif;background:#0d1117;color:#c9d1d9;display:flex;justify-content:center;align-items:center;min-height:100vh}.card{background:#161b22;border:1px solid #30363d;border-radius:12px;padding:40px;max-width:600px;text-align:center}h1{color:#e74c3c;margin-bottom:12px}p{margin-bottom:14px;line-height:1.6}.flag{background:rgba(243,156,18,.15);color:#f39c12;border:1px solid rgba(243,156,18,.4);padding:12px;border-radius:6px;font-family:monospace;font-size:1.1em;margin-top:16px}</style></head>
<body><div class="card"><h1>Admin Panel</h1><p>This admin panel was placed at a predictable, guessable path with no authentication middleware protecting it. An attacker who discovers <code>/admin-panel</code> can access it directly.</p><div class="flag">{{ flag }}</div></div></body></html>"""

# ──────────────────── Routes ────────────────────

@app.route('/')
def index():
    if 'username' in session:
        return redirect(url_for('shop'))
    return render_template_string(LOGIN_PAGE)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return redirect(url_for('index'))
    u = request.form.get('username', '')
    p = request.form.get('password', '')
    if u in USERS and USERS[u]['password'] == p:
        session['username'] = u
        session['role'] = USERS[u]['role']
        session['sid'] = secrets.token_hex(8)
        return redirect(url_for('shop'))
    return render_template_string(LOGIN_PAGE, error="Invalid credentials")

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

@app.route('/shop')
def shop():
    if 'username' not in session:
        return redirect(url_for('index'))
    applied = APPLIED_COUPONS.get(session.get('sid'), [])
    return render_template_string(SHOP_PAGE, user=session['username'], products=PRODUCTS, applied=applied, msg=None, msg_class='')

@app.route('/apply-coupon', methods=['POST'])
def apply_coupon():
    if 'username' not in session:
        return redirect(url_for('index'))

    code = request.form.get('code', '').strip().upper()
    sid = session.get('sid', '')
    applied = APPLIED_COUPONS.setdefault(sid, [])

    # BUG 1: No rate limiting — attacker can brute-force coupon codes
    # BUG 2: No check for duplicate coupon application (business logic flaw)

    if code not in VALID_COUPONS:
        return render_template_string(SHOP_PAGE, user=session['username'], products=PRODUCTS,
                                      applied=applied, msg=f"Invalid coupon code: {code}", msg_class='err')

    discount = VALID_COUPONS[code]

    # BUG 2: Can apply the same coupon multiple times
    applied.append(code)

    if code == "MEGA100":
        msg = f"MEGA COUPON applied! 100% off! Flag: {FLAG_DESIGN}"
        msg_class = 'flag'
    elif len(applied) > 1:
        msg = f"Coupon {code} applied again! ({discount}% off). Stacking exploit detected — Flag: {FLAG_ABUSE}"
        msg_class = 'flag'
    else:
        msg = f"Coupon {code} applied! {discount}% discount."
        msg_class = 'ok'

    return render_template_string(SHOP_PAGE, user=session['username'], products=PRODUCTS,
                                  applied=applied, msg=msg, msg_class=msg_class)

# BUG 3: Predictable admin path with no auth check
@app.route('/admin-panel')
def admin_panel():
    return render_template_string(ADMIN_PAGE, flag=FLAG_ADMIN)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
