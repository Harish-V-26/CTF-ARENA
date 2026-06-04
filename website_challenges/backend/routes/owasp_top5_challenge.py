import base64
import json
from flask import Blueprint, request, render_template_string, make_response, jsonify

owasp_top5_challenge_bp = Blueprint('owasp_top5_challenge', __name__)

# Master styling for all OWASP pages to look premium and cyber-themed
BASE_CSS = '''
<style>
    :root {
        --bg-primary: #0a0e17;
        --bg-secondary: #131a26;
        --accent-color: #00ff41; /* Cyber green */
        --accent-orange: #ff9f43;
        --accent-blue: #00d2d3;
        --text-primary: #f5f6fa;
        --text-secondary: #a0aec0;
        --border-color: #2d3748;
        --card-bg: rgba(19, 26, 38, 0.8);
    }
    body {
        background-color: var(--bg-primary);
        color: var(--text-primary);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
    header {
        background-color: var(--bg-secondary);
        border-bottom: 2px solid var(--border-color);
        padding: 20px;
        text-align: center;
        position: relative;
    }
    header h1 {
        margin: 0;
        font-size: 24px;
        letter-spacing: 2px;
        color: var(--text-primary);
    }
    header h1 span {
        color: var(--accent-orange);
    }
    .back-btn {
        position: absolute;
        left: 20px;
        top: 22px;
        color: var(--text-secondary);
        text-decoration: none;
        font-weight: bold;
        transition: color 0.2s;
    }
    .back-btn:hover {
        color: var(--accent-orange);
    }
    .container {
        max-width: 900px;
        margin: 40px auto;
        padding: 0 20px;
        flex: 1;
    }
    .card {
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 30px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.5);
        margin-bottom: 30px;
        backdrop-filter: blur(10px);
    }
    .card h2 {
        margin-top: 0;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 10px;
        color: var(--accent-orange);
    }
    .nav-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 20px;
        margin-top: 30px;
    }
    .nav-card {
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 20px;
        text-align: center;
        text-decoration: none;
        color: var(--text-primary);
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .nav-card:hover {
        border-color: var(--accent-orange);
        transform: translateY(-5px);
        box-shadow: 0 4px 20px rgba(255, 159, 67, 0.2);
    }
    .nav-card h3 {
        margin-top: 0;
        color: var(--text-primary);
        font-size: 18px;
    }
    .nav-card p {
        color: var(--text-secondary);
        font-size: 14px;
        line-height: 1.5;
        margin-bottom: 20px;
    }
    .btn {
        background: var(--accent-orange);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
        text-decoration: none;
        transition: background 0.2s;
        display: inline-block;
    }
    .btn:hover {
        background: #e18728;
    }
    .btn-secondary {
        background: transparent;
        border: 1px solid var(--border-color);
        color: var(--text-primary);
    }
    .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: var(--text-secondary);
    }
    input[type="text"], input[type="number"], textarea {
        background: var(--bg-primary);
        border: 1px solid var(--border-color);
        color: var(--text-primary);
        padding: 12px;
        border-radius: 6px;
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 15px;
        font-family: monospace;
    }
    input:focus, textarea:focus {
        outline: none;
        border-color: var(--accent-orange);
    }
    pre {
        background: #000;
        color: var(--accent-color);
        padding: 15px;
        border-radius: 6px;
        overflow-x: auto;
        font-family: 'Courier New', Courier, monospace;
        border: 1px solid #1a2421;
    }
    .badge {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .badge-bac { background: rgba(235, 94, 40, 0.2); color: #eb5e28; border: 1px solid rgba(235, 94, 40, 0.4); }
    .badge-crypto { background: rgba(0, 210, 211, 0.2); color: #00d2d3; border: 1px solid rgba(0, 210, 211, 0.4); }
    .badge-injection { background: rgba(255, 107, 107, 0.2); color: #ff6b6b; border: 1px solid rgba(255, 107, 107, 0.4); }
    .badge-misconfig { background: rgba(255, 230, 0, 0.15); color: #ffdd59; border: 1px solid rgba(255, 230, 0, 0.3); }
    .badge-supply { background: rgba(168, 230, 207, 0.2); color: #a8e6cf; border: 1px solid rgba(168, 230, 207, 0.4); }
</style>
'''

# 1. Lobby/Dashboard
@owasp_top5_challenge_bp.route('/api/owasp-top5-challenge-lab/', methods=['GET'])
def index():
    html = f'''
    <!DOCTYPE html>
    <html>
    <head>
        <title>OWASP Top 10 Part 1 Target Portal</title>
        {BASE_CSS}
    </head>
    <body>
        <header>
            <h1>OWASP Top 10 <span>Part 1 (1-5) Target Portal</span></h1>
        </header>
        <div class="container">
            <div class="card">
                <h2>SecureCorp Sandbox Portal</h2>
                <p>Welcome to SecureCorp's simulated staging environment. Use this portal to test and verify the first 5 vulnerabilities of the OWASP Top 10.</p>
                
                <div class="nav-grid">
                    <a href="/api/owasp-top5-challenge-lab/profile?id=101" class="nav-card">
                        <div>
                            <span class="badge badge-bac">Step 1</span>
                            <h3>Employee Portal</h3>
                            <p>Start your engagement here. Review your profile and see if you can access the administrator's profile (ID 100).</p>
                        </div>
                        <span class="btn">Start Engagement</span>
                    </a>
                </div>
            </div>
        </div>
    </body>
    </html>
    '''
    return render_template_string(html)

# 2. Broken Access Control (Profile Page)
@owasp_top5_challenge_bp.route('/api/owasp-top5-challenge-lab/profile', methods=['GET'])
def profile():
    id_param = request.args.get('id', '')
    
    # Check ID parameter
    if id_param == '100':
        username = "admin"
        role = "Administrator (Root)"
        email = "admin@securecorp.com"
        secret = "CTF{B4C_"
        status_msg = "Warning: Privileged admin profile exposed via direct parameter modification!"
        style_override = "border-color: #eb5e28;"
        admin_note = '''
        <div style="margin-top: 30px; padding: 25px; background: rgba(0, 255, 65, 0.05); border: 2px solid var(--accent-color); border-radius: 8px; text-align: center; box-shadow: 0 0 20px rgba(0, 255, 65, 0.15);">
            <h3 style="color: var(--accent-color); margin-top: 0; font-family: monospace; font-size: 1.2rem; letter-spacing: 2px;">[ PRIVILEGE ESCALATION DETECTED ]</h3>
            <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 20px;">You have bypassed access control systems and retrieved the admin secret flag fragment. Execute the next step in the gauntlet chain.</p>
            <a href="/api/owasp-top5-challenge-lab/crypto-dump" class="btn" style="background: var(--accent-color); color: #000; font-family: monospace; font-weight: bold; border-radius: 4px; box-shadow: 0 0 10px rgba(0, 255, 65, 0.3); padding: 12px 24px;">Proceed to Cryptographic Failures →</a>
        </div>
        '''
    elif id_param == '101':
        username = "johndoe"
        role = "Regular Employee"
        email = "john.doe@securecorp.com"
        secret = "REDRACTED (Only administrators can view this field)"
        status_msg = "Authorized View"
        style_override = ""
        admin_note = ""
    else:
        # Invalid / other
        html = f'''
        <!DOCTYPE html>
        <html>
        <head><title>Profile Not Found</title>{BASE_CSS}</head>
        <body>
            <header>
                <a href="/api/owasp-top5-challenge-lab/" class="back-btn">← Back</a>
                <h1>Broken Access Control Target</h1>
            </header>
            <div class="container">
                <div class="card" style="text-align: center;">
                    <h2 style="color: #ff6b6b;">User Profile Not Found</h2>
                    <p>Requested profile user ID does not exist in the database dump.</p>
                    <a href="/api/owasp-top5-challenge-lab/profile?id=101" class="btn">Reset to User 101</a>
                </div>
            </div>
        </body>
        </html>
        '''
        return render_template_string(html), 404

    html = f'''
    <!DOCTYPE html>
    <html>
    <head>
        <title>User Profile — SecureCorp</title>
        {BASE_CSS}
    </head>
    <body>
        <header>
            <a href="/api/owasp-top5-challenge-lab/" class="back-btn">← Back</a>
            <h1>Broken Access Control Target</h1>
        </header>
        <div class="container">
            <div class="card" style="{style_override}">
                <h2>Profile Details: {username}</h2>
                <p><strong>Status:</strong> <span style="color: {'#eb5e28' if id_param=='100' else '#00ff41'}; font-weight: bold;">{status_msg}</span></p>
                <hr style="border: 0; border-top: 1px solid var(--border-color); margin: 20px 0;">
                
                <table style="width: 100%; border-collapse: collapse; text-align: left;">
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <th style="padding: 12px; color: var(--text-secondary);">User ID</th>
                        <td style="padding: 12px; font-family: monospace;">{id_param}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <th style="padding: 12px; color: var(--text-secondary);">Username</th>
                        <td style="padding: 12px;">{username}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <th style="padding: 12px; color: var(--text-secondary);">Role</th>
                        <td style="padding: 12px; font-weight: bold; color: {'#eb5e28' if id_param=='100' else 'inherit'};">{role}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <th style="padding: 12px; color: var(--text-secondary);">Email</th>
                        <td style="padding: 12px;">{email}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid var(--border-color);">
                        <th style="padding: 12px; color: var(--text-secondary);">Access Secret</th>
                        <td style="padding: 12px; font-family: monospace; color: {'#00ff41' if id_param=='100' else 'var(--text-secondary)'}; font-weight: bold;">{secret}</td>
                    </tr>
                </table>
                {admin_note}
            </div>
        </div>
    </body>
    </html>
    '''
    return render_template_string(html)

# 3. Cryptographic Failures (Database Dump)
@owasp_top5_challenge_bp.route('/api/owasp-top5-challenge-lab/crypto-dump', methods=['GET'])
def crypto_dump():
    html = f'''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Database Credentials Leak — Cryptographic Failures</title>
        {BASE_CSS}
    </head>
    <body>
        <header>
            <a href="/api/owasp-top5-challenge-lab/" class="back-btn">← Back</a>
            <h1>Cryptographic Failures Target</h1>
        </header>
        <div class="container">
            <div class="card">
                <h2>Exposed Database Backup Dump</h2>
                <p>An unsecured endpoint has leaked the backup database table containing hashed administrator credentials and system flags.</p>
                
                <h3>Table: user_accounts</h3>
                <pre>
+----+-----------+----------------------------------+---------------------------+
| ID | Username  | Password_Hash (MD5)              | Encrypted_Flag (ROT13)    |
+----+-----------+----------------------------------+---------------------------+
| 1  | admin     | 5f4dcc3b5aa765d61d8327deb882cf99 | PELCG0_                     |
| 2  | support   | d8578edf8458ce06fbc5bb76a58c5ca4 | [REDACTED]                |
| 3  | guest     | 084e0343a0486ff05530df6c705c8bb9 | [REDACTED]                |
+----+-----------+----------------------------------+---------------------------+
                </pre>
                
                <div style="margin-top: 30px; padding: 25px; background: rgba(0, 210, 211, 0.05); border: 2px solid var(--accent-blue); border-radius: 8px; box-shadow: 0 0 20px rgba(0, 210, 211, 0.15);">
                    <h3 style="color: var(--accent-blue); margin-top: 0; font-family: monospace; font-size: 1.2rem; letter-spacing: 2px;">[ DECRYPTION CONSOLE ]</h3>
                    <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 20px;">Input the ROT13 encrypted flag fragment from the user_accounts table above to decode the second piece of the flag and unlock the database search beta portal.</p>
                    <div style="display: flex; gap: 15px; margin-bottom: 20px;">
                        <input type="text" id="crypto-input" placeholder="Paste encrypted flag fragment here..." style="margin-bottom: 0; border-color: var(--accent-blue); font-family: monospace; background: rgba(0,0,0,0.5); color: #fff;">
                        <button onclick="decryptROT13()" class="btn" style="background: var(--accent-blue); color: #000; font-family: monospace; font-weight: bold; border-radius: 4px; padding: 0 25px;">DECRYPT</button>
                    </div>
                    <div id="crypto-output" style="display: none; padding: 15px; background: #000; border: 1px solid var(--border-color); border-radius: 6px; font-family: monospace; color: var(--accent-blue); margin-bottom: 20px; font-size: 15px; letter-spacing: 1px;"></div>
                    <a href="/api/owasp-top5-challenge-lab/search" id="crypto-next-btn" class="btn" style="display: none; width: 100%; box-sizing: border-box; text-align: center; background: var(--accent-blue); color: #000; font-family: monospace; font-weight: bold; border-radius: 4px; padding: 12px 0;">Proceed to Injection Beta Portal →</a>
                </div>
                <script>
                function decryptROT13() {{
                    const val = document.getElementById('crypto-input').value.trim();
                    const dec = val.replace(/[a-zA-Z]/g, function(c){{
                        return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);
                    }});
                    const output = document.getElementById('crypto-output');
                    const nextBtn = document.getElementById('crypto-next-btn');
                    output.style.display = 'block';
                    output.innerHTML = 'Decrypted Flag Piece: <strong style="color: #fff; font-size: 1.1rem; text-shadow: 0 0 10px rgba(0,210,211,0.5);">' + dec + '</strong>';
                    if (dec.toUpperCase() === 'CRYPT0_' || val.toUpperCase() === 'CRYPT0_') {{
                        nextBtn.style.display = 'block';
                    }}
                }}
                </script>
            </div>
        </div>
    </body>
    </html>
    '''
    return render_template_string(html)

# 4. Injection (User Search Portal)
@owasp_top5_challenge_bp.route('/api/owasp-top5-challenge-lab/search', methods=['GET', 'POST'])
def search():
    query = request.form.get('q', '').strip() if request.method == 'POST' else request.args.get('q', '').strip()
    results = []
    executed_query = ""
    error_raised = ""
    is_sqli = False
    
    if query:
        # Simulate query concatenation: SELECT * FROM users WHERE name LIKE '%QUERY%'
        executed_query = f"SELECT * FROM users WHERE name LIKE '%{query}%'"
        
        # SQL Injection detection logic
        # If payload contains ' OR '1'='1 or similar tautology
        normalized = query.lower().replace(" ", "")
        is_sqli = False
        
        # Detect common tautology constructs and basic SQL injection patterns
        if ("'" in normalized and ("or" in normalized or "union" in normalized or "--" in normalized or "1=1" in normalized or "true" in normalized)) or \
           ("'or'1" in normalized) or \
           ("or1=1" in normalized):
            is_sqli = True

        if is_sqli:
            results = [
                {"id": 1, "name": "alice", "role": "Developer", "status": "Active"},
                {"id": 2, "name": "bob", "role": "HR Manager", "status": "Active"},
                {"id": 10, "name": "flag_holder", "role": "System Flag Account", "status": "SQL1_"}
            ]
        elif "alice" in query.lower():
            results = [{"id": 1, "name": "alice", "role": "Developer", "status": "Active"}]
        elif "bob" in query.lower():
            results = [{"id": 2, "name": "bob", "role": "HR Manager", "status": "Active"}]
        else:
            results = []
            
    html = f'''
    <!DOCTYPE html>
    <html>
    <head>
        <title>SQL Injection Search Target — SecureCorp</title>
        {BASE_CSS}
        <style>
            .results-table {{
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }}
            .results-table th, .results-table td {{
                border: 1px solid var(--border-color);
                padding: 12px;
                text-align: left;
            }}
            .results-table th {{
                background-color: var(--bg-secondary);
            }}
        </style>
    </head>
    <body>
        <header>
            <a href="/api/owasp-top5-challenge-lab/" class="back-btn">← Back</a>
            <h1>Injection Target</h1>
        </header>
        <div class="container">
            <div class="card">
                <h2>User Lookup Directory</h2>
                <p>Search for SecureCorp employees by name. This search endpoint is vulnerable to SQL Injection due to string interpolation.</p>
                
                <form method="POST" action="/api/owasp-top5-challenge-lab/search">
                    <input type="text" name="q" value="{query}" placeholder="Search name (e.g. alice, bob)..." required>
                    <button type="submit" class="btn">Search Table</button>
                </form>
                
                {f'<h3>Executed Query:</h3><pre>{executed_query}</pre>' if executed_query else ''}
                
                {f'<h3 style="color: #ff6b6b;">Results Found ({len(results)}):</h3>' if query else ''}
                
                {'''
                <table class="results-table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Status / Secret</th>
                        </tr>
                    </thead>
                    <tbody>
                ''' + "".join([f'''
                        <tr>
                            <td>{r["id"]}</td>
                            <td>{r["name"]}</td>
                            <td>{r["role"]}</td>
                            <td style="font-family: monospace; color: {'#00ff41' if 'SQL1' in r['status'] else 'inherit'}; font-weight: {'bold' if 'SQL1' in r['status'] else 'normal'};">{r["status"]}</td>
                        </tr>
                ''' for r in results]) + '''
                    </tbody>
                </table>
                ''' if results else (f'<p style="color: var(--text-secondary);">No results returned.</p>' if query else '')}
                
                {'''
                <div style="margin-top: 30px; padding: 25px; background: rgba(255, 107, 107, 0.05); border: 2px solid #ff6b6b; border-radius: 8px; box-shadow: 0 0 20px rgba(255, 107, 107, 0.15);">
                    <h3 style="color: #ff6b6b; margin-top: 0; font-family: monospace; font-size: 1.2rem; letter-spacing: 2px;">[ DATABASE INTEGRITY LEAK ]</h3>
                    <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 20px;">SQL injection successfully exploited! The system has logged an automated emergency backup. Navigate to the exposed backup directory to recover the next fragment.</p>
                    <a href="/api/owasp-top5-challenge-lab/backup/" class="btn" style="background: #ff6b6b; color: #fff; font-family: monospace; font-weight: bold; border-radius: 4px; padding: 12px 24px;">Expose Backup Directory →</a>
                </div>
                ''' if is_sqli else ''}
            </div>
        </div>
    </body>
    </html>
    '''
    return render_template_string(html)

# 5. Security Misconfiguration (Directory Listing & Backup File Leak)
@owasp_top5_challenge_bp.route('/api/owasp-top5-challenge-lab/backup/', methods=['GET'])
def directory_listing():
    html = f'''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Index of /api/owasp-top5-challenge-lab/backup/</title>
        {BASE_CSS}
    </head>
    <body>
        <header>
            <a href="/api/owasp-top5-challenge-lab/" class="back-btn">← Back</a>
            <h1>Security Misconfiguration Target</h1>
        </header>
        <div class="container">
            <div class="card">
                <h2>Index of /backup/</h2>
                <p>Sensitive configurations and disabled indices are exposed due to server misconfiguration.</p>
                
                <pre style="background: #000; padding: 20px; border-radius: 8px; font-family: monospace; border: 1px solid var(--border-color);">
[DIR]  <a href="/api/owasp-top5-challenge-lab/" style="color: var(--accent-orange);">.. (Parent Directory)</a>

Wednesday, May 27, 2026 10:14 AM        421 <a href="/api/owasp-top5-challenge-lab/backup/config.bak" target="_blank" style="color: var(--accent-orange); text-decoration: underline;">config.bak</a>
Wednesday, May 27, 2026 09:21 AM       1240 <span style="color: var(--text-secondary);">index.php.disabled</span>
Wednesday, May 27, 2026 09:21 AM         82 <span style="color: var(--text-secondary);">version.txt</span>
                </pre>

                <div style="margin-top: 30px; padding: 25px; background: rgba(255, 230, 0, 0.05); border: 2px solid var(--accent-orange); border-radius: 8px; box-shadow: 0 0 20px rgba(255, 159, 67, 0.15);">
                    <h3 style="color: var(--accent-orange); margin-top: 0; font-family: monospace; font-size: 1.2rem; letter-spacing: 2px;">[ DEVOPS CONSOLE UNLOCK ]</h3>
                    <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 20px;">Inspect the exposed <code>config.bak</code> file to find the database password. Enter it below to authorize the DevOps Deployment Pipeline.</p>
                    <div style="display: flex; gap: 15px; margin-bottom: 20px;">
                        <input type="text" id="config-pass" placeholder="Enter DB_PASS credential..." style="margin-bottom: 0; border-color: var(--accent-orange); font-family: monospace; background: rgba(0,0,0,0.5); color: #fff;">
                        <button onclick="unlockDevOps()" class="btn" style="background: var(--accent-orange); color: #000; font-family: monospace; font-weight: bold; border-radius: 4px; padding: 0 25px;">AUTHORIZE</button>
                    </div>
                    <div id="unlock-output" style="display: none; padding: 15px; background: #000; border: 1px solid var(--border-color); border-radius: 6px; font-family: monospace; color: var(--accent-orange); margin-bottom: 20px; font-size: 15px;"></div>
                    <a href="/api/owasp-top5-challenge-lab/yaml-load" id="devops-btn" class="btn" style="display: none; width: 100%; box-sizing: border-box; text-align: center; background: var(--accent-orange); color: #000; font-family: monospace; font-weight: bold; border-radius: 4px; padding: 12px 0;">Initialize DevOps YAML Processor →</a>
                </div>
            </div>
        </div>
        <script>
        function unlockDevOps() {{
            const val = document.getElementById('config-pass').value.trim();
            const output = document.getElementById('unlock-output');
            const btn = document.getElementById('devops-btn');
            output.style.display = 'block';
            if (val === 'M1SC0NF1G_') {{
                output.innerHTML = '<strong>Access Granted.</strong> DevOps deployment pipeline unlocked.';
                btn.style.display = 'block';
            }} else {{
                output.innerHTML = '<span style="color: #ff6b6b;">Access Denied. Incorrect credentials.</span>';
                btn.style.display = 'none';
            }}
        }}
        </script>
    </body>
    </html>
    '''
    return render_template_string(html)

@owasp_top5_challenge_bp.route('/api/owasp-top5-challenge-lab/backup/config.bak', methods=['GET'])
def config_backup():
    content = '''[Database]
DB_HOST = 10.0.8.23
DB_USER = securecorp_dbo
DB_PASS = M1SC0NF1G_
DB_PORT = 3306

[Security]
DEBUG_MODE = True
ALLOWED_HOSTS = *
SECRET_KEY = 93a8d8e3b4a2d109f3e829d38bc

[DevOps]
YAML_PROCESSOR = /api/owasp-top5-challenge-lab/yaml-load
'''
    resp = make_response(content, 200)
    resp.headers['Content-Type'] = 'text/plain; charset=utf-8'
    return resp

# 6. Software Supply Chain Failures (Dependencies and Deserializer)
@owasp_top5_challenge_bp.route('/api/owasp-top5-challenge-lab/dependencies', methods=['GET'])
def dependencies():
    # Return JSON representation of vulnerable packages
    return jsonify({
        "environment": "SecureCorp Production Backend",
        "python_version": "3.8.10",
        "dependencies": {
            "Flask": "2.0.1",
            "PyYAML": "3.12",
            "requests": "2.25.1",
            "Werkzeug": "2.0.1"
        },
        "vulnerability_scan_status": "Outdated modules detected. High risks identified in PyYAML deserialization handler."
    })

@owasp_top5_challenge_bp.route('/api/owasp-top5-challenge-lab/yaml-load', methods=['GET', 'POST'])
def yaml_load():
    yaml_input = request.form.get('yaml', '').strip() if request.method == 'POST' else request.args.get('yaml', '').strip()
    output = ""
    error = ""
    
    if yaml_input:
        # Safe simulation of PyYAML insecure load
        # Detect !!python/object or apply triggers
        normalized = yaml_input.replace(" ", "")
        if "!!python/object" in normalized or "apply" in normalized or "os.system" in normalized:
            # Simulate real CLI output depending on the command executed
            import re
            cmd_match = re.search(r'\[\s*["\']([^"\']+)["\']\s*\]', yaml_input)
            cmd = cmd_match.group(1).strip() if cmd_match else "whoami"
            
            if cmd == "whoami":
                output = "Command Executed: whoami\nOutput: securecorp_app"
                is_rce = False
            elif cmd == "id":
                output = "Command Executed: id\nOutput: uid=1001(securecorp_app) gid=1001(securecorp_app) groups=1001(securecorp_app)"
                is_rce = False
            elif cmd == "ls":
                output = "Command Executed: ls\nOutput: app.py\nrequirements.txt\ntargets/\nflag.txt"
                is_rce = False
            elif "echo" in cmd and "flag" in cmd.lower():
                output = f"Command Executed: {cmd}\nOutput: flag"
                is_rce = True
            elif "cat" in cmd and "flag" in cmd.lower():
                output = f"Command Executed: {cmd}\nOutput: SUPPLY}}"
                is_rce = True
            else:
                output = f"Command Executed: {cmd}\nOutput: Error: Permission denied to run this system resource."
                is_rce = False
        else:
            try:
                # Simulated parsing of standard YAML (just convert standard key-value string to python object representation)
                # To prevent actual code execution risks, we just parse standard inputs safely
                output = "YAML Loaded Successfully:\n" + str(json.dumps({"input_data": yaml_input}, indent=2))
                is_rce = False
            except Exception as e:
                error = "YAML Parsing Error: " + str(e)
                is_rce = False
    else:
        is_rce = False
                
    html = f'''
    <!DOCTYPE html>
    <html>
    <head>
        <title>YAML Deserializer Target — Software Supply Chain</title>
        {BASE_CSS}
    </head>
    <body>
        <header>
            <a href="/api/owasp-top5-challenge-lab/" class="back-btn">← Back</a>
            <h1>Software Supply Chain Target</h1>
        </header>
        <div class="container">
            <div class="card">
                <h2>Vulnerable YAML Deserialization Handler</h2>
                <p>This endpoint takes user-supplied YAML configuration input and processes it using the outdated <code>yaml.load()</code> function from <code>PyYAML==3.12</code>. This package is susceptible to remote code execution (RCE) via custom constructor tags.</p>
                
                <form method="POST" action="/api/owasp-top5-challenge-lab/yaml-load">
                    <label for="yaml"><strong>Enter YAML Configuration:</strong></label>
                    <textarea name="yaml" id="yaml" rows="8" placeholder="e.g.&#10;theme: dark&#10;debug: true" required>{yaml_input}</textarea>
                    <button type="submit" class="btn">Process YAML Config</button>
                </form>
                
                {f'<h3>Output:</h3><pre>{output}</pre>' if output else ''}
                {f'<h3>Error:</h3><pre style="color: #ff6b6b; border-color: #3b1d1d;">{error}</pre>' if error else ''}
                
                {'''
                <div style="margin-top: 30px; padding: 25px; background: rgba(168, 230, 207, 0.05); border: 2px solid #a8e6cf; border-radius: 8px; text-shadow: 0 0 5px rgba(168, 230, 207, 0.3); box-shadow: 0 0 20px rgba(168, 230, 207, 0.15);">
                    <h3 style="color: #a8e6cf; margin-top: 0; font-family: monospace; font-size: 1.2rem; letter-spacing: 2px;">[ REMOTE CODE EXECUTION SUCCESSFUL ]</h3>
                    <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 20px;">You have triggered remote code execution on the staging environment server. The final flag fragment is retrieved.</p>
                    <div style="font-size: 24px; font-weight: bold; color: #a8e6cf; text-align: center; font-family: monospace; letter-spacing: 2px; margin-bottom: 20px;">SUPPLY}</div>
                    <p style="font-size: 13px; color: var(--text-secondary); text-align: center; margin-bottom: 0;">Gather all flag fragments from your journey to submit the complete flag in the CTF Labs portal.</p>
                </div>
                ''' if is_rce else ''}
                
                <div style="background: rgba(168, 230, 207, 0.1); border-left: 4px solid #a8e6cf; padding: 15px; border-radius: 4px; margin-top: 20px;">
                    <strong>Hint / Exploit Clue:</strong><br>
                    Use the PyYAML RCE constructor template below to execute system commands (e.g., <code>whoami</code> or listing files with <code>ls</code>). Try reading the flag file (e.g. <code>flag.txt</code>) to retrieve the final flag piece:<br>
                    <code style="background: #000; color: #a8e6cf; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-top: 8px; font-family: monospace;">!!python/object/apply:os.system ["whoami"]</code>
                </div>
            </div>
        </div>
    </body>
    </html>
    '''
    return render_template_string(html)
