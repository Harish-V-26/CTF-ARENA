import base64
import json
from flask import Blueprint, request, render_template_string, make_response, jsonify

owasp_top5_bp = Blueprint('owasp_top5', __name__)

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
@owasp_top5_bp.route('/api/owasp-top5-lab/', methods=['GET'])
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
                    <a href="/api/owasp-top5-lab/profile?id=101" class="nav-card">
                        <div>
                            <span class="badge badge-bac">A01:2021</span>
                            <h3>Broken Access Control</h3>
                            <p>Verify how horizontal/vertical privilege escalation and IDOR flaws operate on profiles.</p>
                        </div>
                        <span class="btn">Launch</span>
                    </a>
                    
                    <a href="/api/owasp-top5-lab/crypto-dump" class="nav-card">
                        <div>
                            <span class="badge badge-crypto">A02:2021</span>
                            <h3>Cryptographic Failures</h3>
                            <p>Inspect database dumps using broken hashing algorithms and classical ciphers.</p>
                        </div>
                        <span class="btn">Launch</span>
                    </a>
                    
                    <a href="/api/owasp-top5-lab/search" class="nav-card">
                        <div>
                            <span class="badge badge-injection">A03:2021</span>
                            <h3>Injection</h3>
                            <p>Test SQL Injection queries to bypass authorization and extract database contents.</p>
                        </div>
                        <span class="btn">Launch</span>
                    </a>
                    
                    <a href="/api/owasp-top5-lab/backup/" class="nav-card">
                        <div>
                            <span class="badge badge-misconfig">A05:2021</span>
                            <h3>Security Misconfiguration</h3>
                            <p>Explore exposed servers running with directory indexing and sensitive backup leaks.</p>
                        </div>
                        <span class="btn">Launch</span>
                    </a>
                    
                    <a href="/api/owasp-top5-lab/yaml-load" class="nav-card">
                        <div>
                            <span class="badge badge-supply">A08:2021</span>
                            <h3>Software Supply Chain</h3>
                            <p>Examine vulnerable PyYAML 3.12 deserialization using unsafe YAML loads.</p>
                        </div>
                        <span class="btn">Launch</span>
                    </a>
                </div>
            </div>
        </div>
    </body>
    </html>
    '''
    return render_template_string(html)

# 2. Broken Access Control (Profile Page)
@owasp_top5_bp.route('/api/owasp-top5-lab/profile', methods=['GET'])
def profile():
    id_param = request.args.get('id', '')
    
    # Check ID parameter
    if id_param == '100':
        username = "admin"
        role = "Administrator (Root)"
        email = "admin@securecorp.com"
        secret = "flag{bac_broken_access_control_success}"
        status_msg = "Warning: Privileged admin profile exposed via direct parameter modification!"
        style_override = "border-color: #eb5e28;"
    elif id_param == '101':
        username = "johndoe"
        role = "Regular Employee"
        email = "john.doe@securecorp.com"
        secret = "REDRACTED (Only administrators can view this field)"
        status_msg = "Authorized View"
        style_override = ""
    else:
        # Invalid / other
        html = f'''
        <!DOCTYPE html>
        <html>
        <head><title>Profile Not Found</title>{BASE_CSS}</head>
        <body>
            <header>
                <a href="/api/owasp-top5-lab/" class="back-btn">← Back</a>
                <h1>Broken Access Control Target</h1>
            </header>
            <div class="container">
                <div class="card" style="text-align: center;">
                    <h2 style="color: #ff6b6b;">User Profile Not Found</h2>
                    <p>Requested profile user ID does not exist in the database dump.</p>
                    <a href="/api/owasp-top5-lab/profile?id=101" class="btn">Reset to User 101</a>
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
            <a href="/api/owasp-top5-lab/" class="back-btn">← Back</a>
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
            </div>
        </div>
    </body>
    </html>
    '''
    return render_template_string(html)

# 3. Cryptographic Failures (Database Dump)
@owasp_top5_bp.route('/api/owasp-top5-lab/crypto-dump', methods=['GET'])
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
            <a href="/api/owasp-top5-lab/" class="back-btn">← Back</a>
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
| 1  | admin     | 5f4dcc3b5aa765d61d8327deb882cf99 | synt{{pelcgb_snvyherf_k0k}} |
| 2  | support   | d8578edf8458ce06fbc5bb76a58c5ca4 | [REDACTED]                |
| 3  | guest     | 084e0343a0486ff05530df6c705c8bb9 | [REDACTED]                |
+----+-----------+----------------------------------+---------------------------+
                </pre>
                
                <div style="background: rgba(0, 210, 211, 0.1); border-left: 4px solid var(--accent-blue); padding: 15px; border-radius: 4px; margin-top: 20px;">
                    <strong>Vulnerability Notes:</strong>
                    <ul style="margin: 10px 0 0 20px; padding: 0;">
                        <li>MD5 hashes are 128-bit digests and can be easily cracked via lookup tables or rainbow tables because they lack salt and are computationally cheap.</li>
                        <li>Classic ciphers like ROT13 are simple letter substitutions (shifting letters by 13 positions) and provide zero security.</li>
                    </ul>
                </div>
            </div>
        </div>
    </body>
    </html>
    '''
    return render_template_string(html)

# 4. Injection (User Search Portal)
@owasp_top5_bp.route('/api/owasp-top5-lab/search', methods=['GET', 'POST'])
def search():
    query = request.form.get('q', '').strip() if request.method == 'POST' else request.args.get('q', '').strip()
    results = []
    executed_query = ""
    error_raised = ""
    
    if query:
        # Simulate query concatenation: SELECT * FROM users WHERE name LIKE '%QUERY%'
        executed_query = f"SELECT * FROM users WHERE name LIKE '%{query}%'"
        
        # SQL Injection detection logic
        # If payload contains ' OR '1'='1 or similar tautology
        normalized = query.lower().replace(" ", "")
        is_sqli = False
        
        # Detect common tautology constructs
        if ("'or'" in normalized and ("1=1" in normalized or "'1'='1" in normalized or "true" in normalized)) or \
           ("'or'1" in normalized) or \
           ("admin'--" in normalized) or \
           ("or1=1" in normalized):
            is_sqli = True

        if is_sqli:
            results = [
                {"id": 1, "name": "alice", "role": "Developer", "status": "Active"},
                {"id": 2, "name": "bob", "role": "HR Manager", "status": "Active"},
                {"id": 10, "name": "flag_holder", "role": "System Flag Account", "status": "flag{sqli_injection_is_fun}"}
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
            <a href="/api/owasp-top5-lab/" class="back-btn">← Back</a>
            <h1>Injection Target</h1>
        </header>
        <div class="container">
            <div class="card">
                <h2>User Lookup Directory</h2>
                <p>Search for SecureCorp employees by name. This search endpoint is vulnerable to SQL Injection due to string interpolation.</p>
                
                <form method="POST" action="/api/owasp-top5-lab/search">
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
                            <td style="font-family: monospace; color: {'#00ff41' if 'flag' in r["status"] else 'inherit'}; font-weight: {'bold' if 'flag' in r["status"] else 'normal'};">{r["status"]}</td>
                        </tr>
                ''' for r in results]) + '''
                    </tbody>
                </table>
                ''' if results else (f'<p style="color: var(--text-secondary);">No results returned.</p>' if query else '')}
            </div>
        </div>
    </body>
    </html>
    '''
    return render_template_string(html)

# 5. Security Misconfiguration (Directory Listing & Backup File Leak)
@owasp_top5_bp.route('/api/owasp-top5-lab/backup/', methods=['GET'])
def directory_listing():
    html = f'''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Index of /api/owasp-top5-lab/backup/</title>
        <style>
            body {{ background: #000; color: #fff; font-family: monospace; padding: 20px; }}
            h1 {{ border-bottom: 1px solid #333; padding-bottom: 10px; font-size: 20px; }}
            a {{ color: #00ff41; text-decoration: none; }}
            a:hover {{ text-decoration: underline; }}
            pre {{ font-size: 14px; line-height: 1.5; }}
        </style>
    </head>
    <body>
        <h1>Index of /api/owasp-top5-lab/backup/</h1>
        <pre>
<a href="/api/owasp-top5-lab/">[To Parent Directory]</a>

Wednesday, May 27, 2026 10:14 AM        421 <a href="/api/owasp-top5-lab/backup/config.bak">config.bak</a>
Wednesday, May 27, 2026 09:21 AM       1240 <a href="#">index.php.disabled</a>
Wednesday, May 27, 2026 09:21 AM         82 <a href="#">version.txt</a>
        </pre>
        <hr style="border-color: #333;">
        <address>Apache/2.4.41 (Ubuntu) Server at SecureCorp Staging Port 5000</address>
    </body>
    </html>
    '''
    return render_template_string(html)

@owasp_top5_bp.route('/api/owasp-top5-lab/backup/config.bak', methods=['GET'])
def config_backup():
    content = '''[Database]
DB_HOST = 10.0.8.23
DB_USER = securecorp_dbo
DB_PASS = flag{misconfig_backup_leak}
DB_PORT = 3306

[Security]
DEBUG_MODE = True
ALLOWED_HOSTS = *
SECRET_KEY = 93a8d8e3b4a2d109f3e829d38bc
'''
    resp = make_response(content, 200)
    resp.headers['Content-Type'] = 'text/plain; charset=utf-8'
    return resp

# 6. Software Supply Chain Failures (Dependencies and Deserializer)
@owasp_top5_bp.route('/api/owasp-top5-lab/dependencies', methods=['GET'])
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

@owasp_top5_bp.route('/api/owasp-top5-lab/yaml-load', methods=['GET', 'POST'])
def yaml_load():
    yaml_input = request.form.get('yaml', '').strip() if request.method == 'POST' else request.args.get('yaml', '').strip()
    output = ""
    error = ""
    
    if yaml_input:
        # Safe simulation of PyYAML insecure load
        # Detect !!python/object or apply triggers
        normalized = yaml_input.replace(" ", "")
        if "!!python/object" in normalized or "apply" in normalized or "os.system" in normalized:
            output = "Command Executed: echo 'flag{supply_chain_integrity_vuln}'\nOutput: flag{supply_chain_integrity_vuln}"
        else:
            try:
                # Simulated parsing of standard YAML (just convert standard key-value string to python object representation)
                # To prevent actual code execution risks, we just parse standard inputs safely
                output = "YAML Loaded Successfully:\n" + str(json.dumps({"input_data": yaml_input}, indent=2))
            except Exception as e:
                error = "YAML Parsing Error: " + str(e)
                
    html = f'''
    <!DOCTYPE html>
    <html>
    <head>
        <title>YAML Deserializer Target — Software Supply Chain</title>
        {BASE_CSS}
    </head>
    <body>
        <header>
            <a href="/api/owasp-top5-lab/" class="back-btn">← Back</a>
            <h1>Software Supply Chain Target</h1>
        </header>
        <div class="container">
            <div class="card">
                <h2>Vulnerable YAML Deserialization Handler</h2>
                <p>This endpoint takes user-supplied YAML configuration input and processes it using the outdated <code>yaml.load()</code> function from <code>PyYAML==3.12</code>. This package is susceptible to remote code execution (RCE) via custom constructor tags.</p>
                
                <form method="POST" action="/api/owasp-top5-lab/yaml-load">
                    <label for="yaml"><strong>Enter YAML Configuration:</strong></label>
                    <textarea name="yaml" id="yaml" rows="8" placeholder="e.g.&#10;theme: dark&#10;debug: true" required>{yaml_input}</textarea>
                    <button type="submit" class="btn">Process YAML Config</button>
                </form>
                
                {f'<h3>Output:</h3><pre>{output}</pre>' if output else ''}
                {f'<h3>Error:</h3><pre style="color: #ff6b6b; border-color: #3b1d1d;">{error}</pre>' if error else ''}
                
                <div style="background: rgba(168, 230, 207, 0.1); border-left: 4px solid #a8e6cf; padding: 15px; border-radius: 4px; margin-top: 20px;">
                    <strong>Hint / Exploit String:</strong><br>
                    Try sending the PyYAML RCE payload below to trigger object instantiation and command execution:<br>
                    <code style="background: #000; color: #a8e6cf; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-top: 8px; font-family: monospace;">!!python/object/apply:os.system ["echo flag{{supply_chain_integrity_vuln}}"]</code>
                </div>
            </div>
        </div>
    </body>
    </html>
    '''
    return render_template_string(html)
