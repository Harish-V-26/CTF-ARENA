from flask import Flask, render_template, request, session, redirect, url_for, jsonify, make_response
import os
import requests
import secrets
from html.parser import HTMLParser
from urllib.parse import urljoin

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)

# Fake Database in-memory
ACCOUNTS = {
    "alice": {
        "username": "alice",
        "password": "password123",
        "balance": 1000,
        "role": "user",
        "flag": "CTF{CSRF_Tr4nsf3r_Succ3ss}"
    },
    "bob": {
        "username": "bob",
        "password": "securebobpassword",
        "balance": 5000,
        "role": "user",
        "flag": None
    }
}

TRANSACTIONS = {
    "alice": [
        {"from": "System", "to": "alice", "amount": 1000, "desc": "Initial Deposit"}
    ],
    "bob": [
        {"from": "System", "to": "bob", "amount": 5000, "desc": "Initial Deposit"}
    ]
}

EXPLOITS = {}

class CSRFFormParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.form_action = None
        self.form_method = "GET"
        self.inputs = {}
        self.in_form = False

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == 'form':
            self.in_form = True
            self.form_action = attrs_dict.get('action')
            self.form_method = attrs_dict.get('method', 'GET').upper()
        elif tag == 'input' and self.in_form:
            name = attrs_dict.get('name')
            val = attrs_dict.get('value', '')
            if name:
                self.inputs[name] = val

    def handle_endtag(self, tag):
        if tag == 'form':
            self.in_form = False

@app.route('/')
def index():
    if 'username' in session:
        return redirect(url_for('dashboard'))
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if username in ACCOUNTS and ACCOUNTS[username]['password'] == password:
            session['username'] = username
            # Generate CSRF token for secure transfers
            session['csrf_token'] = secrets.token_hex(16)
            return redirect(url_for('dashboard'))
        return render_template('index.html', error="Invalid username or password. Hint: alice / password123")
    return redirect(url_for('index'))

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

@app.route('/dashboard')
def dashboard():
    if 'username' not in session:
        return redirect(url_for('index'))
    username = session['username']
    account = ACCOUNTS[username]
    tx_list = TRANSACTIONS.get(username, [])
    csrf_token = session.get('csrf_token')
    return render_template('dashboard.html', account=account, transactions=tx_list, csrf_token=csrf_token)

@app.route('/transfer', methods=['POST'])
def transfer():
    if 'username' not in session:
        return jsonify({"error": "Unauthorized"}), 401
    
    sender = session['username']
    to_account = request.form.get('to_account')
    amount_str = request.form.get('amount')
    
    try:
        amount = int(amount_str)
    except (ValueError, TypeError):
        return render_template('dashboard.html', account=ACCOUNTS[sender], 
                               transactions=TRANSACTIONS.get(sender, []), 
                               error="Invalid transfer amount", 
                               csrf_token=session.get('csrf_token'))
                               
    if amount <= 0:
        return render_template('dashboard.html', account=ACCOUNTS[sender], 
                               transactions=TRANSACTIONS.get(sender, []), 
                               error="Amount must be positive", 
                               csrf_token=session.get('csrf_token'))
                               
    if ACCOUNTS[sender]['balance'] < amount:
        return render_template('dashboard.html', account=ACCOUNTS[sender], 
                               transactions=TRANSACTIONS.get(sender, []), 
                               error="Insufficient funds", 
                               csrf_token=session.get('csrf_token'))
                               
    if to_account not in ACCOUNTS:
        return render_template('dashboard.html', account=ACCOUNTS[sender], 
                               transactions=TRANSACTIONS.get(sender, []), 
                               error="Recipient account not found", 
                               csrf_token=session.get('csrf_token'))
                               
    if to_account == sender:
        return render_template('dashboard.html', account=ACCOUNTS[sender], 
                               transactions=TRANSACTIONS.get(sender, []), 
                               error="Cannot transfer to yourself", 
                               csrf_token=session.get('csrf_token'))
                               
    # Perform Transfer
    ACCOUNTS[sender]['balance'] -= amount
    ACCOUNTS[to_account]['balance'] += amount
    
    tx = {"from": sender, "to": to_account, "amount": amount, "desc": "Transfer"}
    TRANSACTIONS[sender].append(tx)
    if to_account not in TRANSACTIONS:
        TRANSACTIONS[to_account] = []
    TRANSACTIONS[to_account].append(tx)
    
    return redirect(url_for('dashboard'))

@app.route('/secure_transfer', methods=['POST'])
def secure_transfer():
    if 'username' not in session:
        return jsonify({"error": "Unauthorized"}), 401
        
    sender = session['username']
    user_token = request.form.get('csrf_token')
    session_token = session.get('csrf_token')
    
    if not user_token or user_token != session_token:
        # CSRF token mismatch! Block request.
        return render_template('dashboard.html', account=ACCOUNTS[sender], 
                               transactions=TRANSACTIONS.get(sender, []), 
                               error="CSRF Token Mismatch! Request blocked.", 
                               csrf_token=session_token), 403
                               
    to_account = request.form.get('to_account')
    amount_str = request.form.get('amount')
    
    try:
        amount = int(amount_str)
    except (ValueError, TypeError):
        return render_template('dashboard.html', account=ACCOUNTS[sender], 
                               transactions=TRANSACTIONS.get(sender, []), 
                               error="Invalid transfer amount", 
                               csrf_token=session_token)
                               
    if amount <= 0:
        return render_template('dashboard.html', account=ACCOUNTS[sender], 
                               transactions=TRANSACTIONS.get(sender, []), 
                               error="Amount must be positive", 
                               csrf_token=session_token)
                               
    if ACCOUNTS[sender]['balance'] < amount:
        return render_template('dashboard.html', account=ACCOUNTS[sender], 
                               transactions=TRANSACTIONS.get(sender, []), 
                               error="Insufficient funds", 
                               csrf_token=session_token)
                               
    if to_account not in ACCOUNTS:
        return render_template('dashboard.html', account=ACCOUNTS[sender], 
                               transactions=TRANSACTIONS.get(sender, []), 
                               error="Recipient account not found", 
                               csrf_token=session_token)
                               
    if to_account == sender:
        return render_template('dashboard.html', account=ACCOUNTS[sender], 
                               transactions=TRANSACTIONS.get(sender, []), 
                               error="Cannot transfer to yourself", 
                               csrf_token=session_token)
                               
    # Perform Transfer
    ACCOUNTS[sender]['balance'] -= amount
    ACCOUNTS[to_account]['balance'] += amount
    
    tx = {"from": sender, "to": to_account, "amount": amount, "desc": "Secure Transfer"}
    TRANSACTIONS[sender].append(tx)
    if to_account not in TRANSACTIONS:
        TRANSACTIONS[to_account] = []
    TRANSACTIONS[to_account].append(tx)
    
    return redirect(url_for('dashboard'))

@app.route('/exploit-server', methods=['GET', 'POST'])
def exploit_server():
    if request.method == 'POST':
        html_code = request.form.get('html_code', '')
        exploit_id = secrets.token_hex(4)
        EXPLOITS[exploit_id] = html_code
        host_url = request.host_url
        exploit_url = urljoin(host_url, f'/view-exploit/{exploit_id}')
        return render_template('exploit_server.html', exploit_url=exploit_url, html_code=html_code)
        
    return render_template('exploit_server.html')

@app.route('/view-exploit/<exploit_id>')
def view_exploit(exploit_id):
    html_code = EXPLOITS.get(exploit_id)
    if not html_code:
        return "Exploit not found", 404
    resp = make_response(html_code)
    resp.headers['Content-Type'] = 'text/html'
    return resp

@app.route('/report', methods=['GET', 'POST'])
def report():
    if request.method == 'POST':
        exploit_url = request.form.get('exploit_url', '')
        logs = []
        logs.append("[*] Starting Simulated Admin Bot (Bob)...")
        logs.append("[*] Logging in admin bot session...")
        
        if not exploit_url:
            logs.append("[-] Error: Exploit URL is empty.")
            return jsonify({"status": "error", "logs": logs})
            
        # Standardize local url if relative or points to the host port
        from urllib.parse import urlparse, urlunparse
        
        full_url = exploit_url
        if not full_url.startswith('http'):
            full_url = urljoin("http://127.0.0.1:80", full_url)
        else:
            parsed = urlparse(full_url)
            if parsed.hostname in ['localhost', '127.0.0.1', '0.0.0.0'] or parsed.netloc == request.host:
                parsed = parsed._replace(netloc='127.0.0.1:80')
                full_url = urlunparse(parsed)
            
        logs.append(f"[*] Bot navigating to: {full_url}")
        
        try:
            # Fetch exploit code
            r = requests.get(full_url, timeout=5)
            if r.status_code != 200:
                logs.append(f"[-] Bot received HTTP {r.status_code} from exploit server.")
                return jsonify({"status": "error", "logs": logs})
                
            logs.append(f"[+] Exploit Page fetched successfully ({len(r.text)} bytes).")
            logs.append("[*] Parsing page content for forms...")
            
            # Parse form
            parser = CSRFFormParser()
            parser.feed(r.text)
            
            if not parser.form_action:
                logs.append("[-] Error: No form found on the page.")
                return jsonify({"status": "error", "logs": logs})
                
            action_url = urljoin(full_url, parser.form_action)
            
            # If the action url points to this app, also make sure it uses port 80
            parsed_action = urlparse(action_url)
            if parsed_action.hostname in ['localhost', '127.0.0.1', '0.0.0.0'] or parsed_action.netloc == request.host:
                parsed_action = parsed_action._replace(netloc='127.0.0.1:80')
                action_url = urlunparse(parsed_action)
                
            logs.append(f"[+] Found form targeting action: {action_url}")
            logs.append(f"[+] Form method: {parser.form_method}")
            logs.append(f"[+] Extracted form parameters: {parser.inputs}")
            
            logs.append("[*] Bot executing form action on PaySecure Bank...")
            
            # Simulate Bob executing the request using requests session
            session_client = requests.Session()
            
            # Log in as Bob
            login_url = "http://127.0.0.1:80/login"
            login_res = session_client.post(login_url, data={
                "username": "bob",
                "password": "securebobpassword"
            }, allow_redirects=False)
            
            logs.append("[*] Authentication cookie set for 'bob'.")
            
            # Send payload request as Bob
            if parser.form_method == 'POST':
                target_res = session_client.post(action_url, data=parser.inputs, timeout=5)
            else:
                target_res = session_client.get(action_url, params=parser.inputs, timeout=5)
                
            logs.append(f"[+] Target responded with HTTP {target_res.status_code}")
            
            # Check success condition
            if "CSRF Token Mismatch" in target_res.text:
                logs.append("[-] Target returned CSRF Token Error. Request blocked.")
                logs.append("[-] CSRF Attack Failed!")
                return jsonify({"status": "blocked", "logs": logs})
            else:
                logs.append("[+] Request processed by Target server.")
                logs.append("[*] Verifying Alice's account balance...")
                
                # Check if transfer happened
                alice_balance = ACCOUNTS["alice"]["balance"]
                logs.append(f"[+] Alice's current balance: ${alice_balance}")
                
                if alice_balance >= 3000:
                    logs.append("[+] CSRF Attack Successful! Funds transferred.")
                    logs.append("[*] Closing admin session.")
                    return jsonify({"status": "success", "logs": logs})
                else:
                    logs.append("[-] No funds were transferred to Alice.")
                    logs.append("[-] CSRF Attack Failed.")
                    return jsonify({"status": "failed", "logs": logs})
                    
        except Exception as e:
            logs.append(f"[-] Bot encountered error: {str(e)}")
            return jsonify({"status": "error", "logs": logs})
            
    return render_template('report.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
