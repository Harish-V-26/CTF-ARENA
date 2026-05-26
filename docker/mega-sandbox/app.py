import socket
import threading
import sqlite3
import os
import subprocess
from flask import Flask, request, jsonify, render_template_string

app = Flask(__name__)

# Initialize SQLite database
DB_PATH = "/tmp/sandbox.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Create tables
    cursor.execute("DROP TABLE IF EXISTS users")
    cursor.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, role TEXT)")
    
    cursor.execute("DROP TABLE IF EXISTS products")
    cursor.execute("CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, desc TEXT, price TEXT)")
    
    cursor.execute("DROP TABLE IF EXISTS comments")
    cursor.execute("CREATE TABLE comments (id INTEGER PRIMARY KEY, author TEXT, content TEXT)")
    
    cursor.execute("DROP TABLE IF EXISTS secret_keys")
    cursor.execute("CREATE TABLE secret_keys (name TEXT, val TEXT)")
    
    # Insert data
    cursor.execute("INSERT INTO users (username, password, role) VALUES ('admin', 'shadow_gate_admin_pass_9981', 'admin')")
    cursor.execute("INSERT INTO users (username, password, role) VALUES ('john', 'password123', 'user')")
    cursor.execute("INSERT INTO users (username, password, role) VALUES ('guest', 'guest', 'guest')")
    
    cursor.execute("INSERT INTO products (name, desc, price) VALUES ('Cyber Security Handbook', 'Learn penetration testing basics', '$49.99')")
    cursor.execute("INSERT INTO products (name, desc, price) VALUES ('Nmap Cheat Sheet', 'All scanning command switches in one PDF', '$9.99')")
    cursor.execute("INSERT INTO products (name, desc, price) VALUES ('Metasploit Exploit Card', 'Reference card for msfconsole', '$14.99')")
    
    cursor.execute("INSERT INTO comments (author, content) VALUES ('admin', 'Welcome to the sandbox guestbook! Please behave.')")
    cursor.execute("INSERT INTO comments (author, content) VALUES ('john', 'This page looks awesome. Stored XSS practice zone!')")
    
    cursor.execute("INSERT INTO secret_keys VALUES ('FLAG_FRAGMENT_4', 'sql_inj3ct_dat4_')")
    
    conn.commit()
    conn.close()

# Write the final command injection flag to /flag.txt
with open("/flag.txt", "w") as f:
    f.write("rce_syst3m_gained}\n")

# ─── FTP & SSH Simulation Banners ──────────────────────────────────────────

def run_ftp_sim():
    # Simulate FTP on port 21
    srv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    try:
        srv.bind(("0.0.0.0", 21))
        srv.listen(5)
        while True:
            c, _ = srv.accept()
            try:
                # Leak Fragment 1 in banner: CTF{nmap_f1rst_st3p_
                c.sendall(b"220 VSFTpd 3.0.3 | CTF-Fragment-1: CTF{nmap_f1rst_st3p_\r\n")
                c.close()
            except Exception:
                pass
    except Exception as e:
        print(f"FTP Simulation error: {e}")

def run_ssh_sim():
    # Simulate SSH on port 22
    srv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    try:
        srv.bind(("0.0.0.0", 22))
        srv.listen(5)
        while True:
            c, _ = srv.accept()
            try:
                c.sendall(b"SSH-2.0-OpenSSH_8.4p1 Debian-5 | Hint: Check Port 21 for Fragment 1!\r\n")
                c.close()
            except Exception:
                pass
    except Exception as e:
        print(f"SSH Simulation error: {e}")


# ─── Flask Frontend ─────────────────────────────────────────────────────────

HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CTF Labs — Standalone Mega Sandbox</title>
    <style>
        :root {
            --bg: #090b11;
            --card-bg: #141824;
            --accent: #00ff88;
            --accent-glow: rgba(0, 255, 136, 0.3);
            --text: #e1e6f0;
            --text-muted: #8b9bb4;
            --border: #263048;
            --glow-color: #00ff88;
        }

        body {
            background-color: var(--bg);
            color: var(--text);
            font-family: 'Courier New', Courier, monospace;
            margin: 0;
            padding: 0;
            display: flex;
            min-height: 100vh;
        }

        /* Sidebar Navigation */
        .sidebar {
            width: 280px;
            background-color: #0b0d16;
            border-right: 1px solid var(--border);
            display: flex;
            flex-direction: column;
            padding: 20px 0;
        }

        .sidebar-header {
            padding: 0 25px 20px;
            border-bottom: 1px solid var(--border);
            text-align: center;
        }

        .sidebar-header h2 {
            margin: 0;
            color: var(--accent);
            text-shadow: 0 0 10px var(--accent-glow);
            font-size: 1.5rem;
        }

        .sidebar-header p {
            color: var(--text-muted);
            font-size: 0.8rem;
            margin: 5px 0 0;
        }

        .nav-list {
            list-style: none;
            padding: 20px 0;
            margin: 0;
            flex-grow: 1;
        }

        .nav-item {
            padding: 12px 25px;
            cursor: pointer;
            color: var(--text-muted);
            border-left: 3px solid transparent;
            transition: all 0.2s ease-in-out;
            font-size: 0.95rem;
        }

        .nav-item:hover, .nav-item.active {
            color: #fff;
            background: rgba(255,255,255,0.02);
            border-left-color: var(--accent);
            text-shadow: 0 0 5px rgba(255,255,255,0.5);
        }

        /* Main Workspace */
        .main-content {
            flex-grow: 1;
            padding: 40px;
            overflow-y: auto;
            max-width: 1200px;
        }

        .container {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }

        h1, h2, h3 {
            color: #fff;
            margin-top: 0;
        }

        h1 {
            border-bottom: 2px solid var(--border);
            padding-bottom: 15px;
            margin-bottom: 25px;
            font-size: 2rem;
        }

        p, ul {
            line-height: 1.6;
            color: var(--text-muted);
        }

        .flag-box {
            background: #0d0f17;
            border: 1px dashed var(--accent);
            border-radius: 6px;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
        }

        .flag-text {
            font-size: 1.2rem;
            color: var(--accent);
            font-weight: bold;
            letter-spacing: 1px;
        }

        .btn {
            background: var(--accent);
            color: #000;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            font-family: inherit;
            transition: background 0.2s;
        }

        .btn:hover {
            background: #00dd77;
            box-shadow: 0 0 10px var(--accent-glow);
        }

        .form-control {
            width: 100%;
            padding: 12px;
            background: #0d0f17;
            border: 1px solid var(--border);
            border-radius: 4px;
            color: #fff;
            font-family: inherit;
            box-sizing: border-box;
            margin-bottom: 15px;
        }

        .form-control:focus {
            outline: none;
            border-color: var(--accent);
            box-shadow: 0 0 5px var(--accent-glow);
        }

        /* Tabs display control */
        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }

        .output-box {
            background: #06080c;
            border: 1px solid #1f2535;
            padding: 15px;
            border-radius: 4px;
            overflow-x: auto;
            color: #00ff66;
            font-family: monospace;
            white-space: pre-wrap;
            margin-top: 15px;
        }

        /* Fragment Grid */
        .frag-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-top: 20px;
        }

        .frag-card {
            border: 1px solid var(--border);
            border-radius: 6px;
            padding: 15px;
            background: #0f121d;
            text-align: center;
        }

        .frag-card.unlocked {
            border-color: var(--accent);
            background: rgba(0,255,136,0.03);
        }

        .frag-num {
            font-size: 0.8rem;
            color: var(--text-muted);
            margin-bottom: 8px;
        }

        .frag-status {
            font-size: 1rem;
            font-weight: bold;
            color: var(--text-muted);
        }

        .frag-card.unlocked .frag-status {
            color: var(--accent);
        }
    </style>
</head>
<body>

    <!-- Sidebar -->
    <div class="sidebar">
        <div class="sidebar-header">
            <h2>MEGA SANDBOX</h2>
            <p>CTF Practice Platform</p>
        </div>
        <ul class="nav-list">
            <li class="nav-item active" onclick="switchTab('dashboard')">[0] Dashboard</li>
            <li class="nav-item" onclick="switchTab('recon')">[1] Recon (FTP/SSH)</li>
            <li class="nav-item" onclick="switchTab('devtools')">[2] DevTools</li>
            <li class="nav-item" onclick="switchTab('brute')">[3] Brute Force</li>
            <li class="nav-item" onclick="switchTab('sqli')">[4] SQL Injection</li>
            <li class="nav-item" onclick="switchTab('xss')">[5] Stored XSS</li>
            <li class="nav-item" onclick="switchTab('idor')">[6] Insecure Objects</li>
            <li class="nav-item" onclick="switchTab('rce')">[7] RCE (Command Inj)</li>
            <li class="nav-item" onclick="switchTab('submit')">[8] Submit Flag</li>
        </ul>
    </div>

    <!-- Main Workspace -->
    <div class="main-content">
        <div class="container">
            
            <!-- DASHBOARD TAB -->
            <div id="dashboard" class="tab-content active">
                <h1>Welcome to the Ultimate CTF Playground</h1>
                <p>This is a custom, standalone environment created specifically for you to practice and master all core vulnerability classes in one place. Your mission is to find the <strong>6 flag fragments</strong> hidden across the different rooms, assemble them in order, and submit the final flag.</p>
                
                <h3>Challenge Map & Progress</h3>
                <div class="frag-grid">
                    <div class="frag-card" id="card-f1">
                        <div class="frag-num">FRAGMENT 1</div>
                        <div class="frag-status" id="stat-f1">LOCKED</div>
                    </div>
                    <div class="frag-card" id="card-f2">
                        <div class="frag-num">FRAGMENT 2</div>
                        <div class="frag-status" id="stat-f2">LOCKED</div>
                    </div>
                    <div class="frag-card" id="card-f3">
                        <div class="frag-num">FRAGMENT 3</div>
                        <div class="frag-status" id="stat-f3">LOCKED</div>
                    </div>
                    <div class="frag-card" id="card-f4">
                        <div class="frag-num">FRAGMENT 4</div>
                        <div class="frag-status" id="stat-f4">LOCKED</div>
                    </div>
                    <div class="frag-card" id="card-f5">
                        <div class="frag-num">FRAGMENT 5</div>
                        <div class="frag-status" id="stat-f5">LOCKED</div>
                    </div>
                    <div class="frag-card" id="card-f6">
                        <div class="frag-num">FRAGMENT 6</div>
                        <div class="frag-status" id="stat-f6">LOCKED</div>
                    </div>
                </div>

                <div style="margin-top: 30px;">
                    <h3>Instructions:</h3>
                    <p>Select a challenge from the left sidebar. Each tab represents a different vulnerability room containing the instructions and interaction panels for that challenge.</p>
                </div>
            </div>

            <!-- RECON TAB -->
            <div id="recon" class="tab-content">
                <h1>Network Reconnaissance</h1>
                <p>This Sandbox container is running simulated ports for FTP (Port 21) and SSH (Port 22). Real systems leak valuable information in banners upon connection.</p>
                <p>Use your Kali Linux tools (like Nmap scanner, banner script, netcat, or telnet) to scan this IP address. </p>
                <div class="flag-box">
                    <p>To practice on your host terminal:</p>
                    <code>nc 127.0.0.1 21</code> or <code>nmap -sV -p 21,22 127.0.0.1</code>
                </div>
                <h3>Simulated Scan Panel</h3>
                <p>No terminal open? Simulate a netcat connection to FTP port 21 right here:</p>
                <button class="btn" onclick="runSimulatedNetcat()">Connect to Port 21 (FTP)</button>
                <div class="output-box" id="nc-output" style="display:none;"></div>
            </div>

            <!-- DEVTOOLS TAB -->
            <div id="devtools" class="tab-content">
                <h1>DevTools Challenge</h1>
                <p>Developers often leave hints, keys, or passwords inside HTML comments, client-side JavaScript, or browser storage.</p>
                <p>Open your browser's Developer Tools (F12 or Right Click -> Inspect) and check the page source or Javascript files loaded on this page.</p>
                <p style="color:#00ff88;">Hint: Look for comments inside the client-side DOM structure, or search for "Fragment-2"!</p>
                
                <!-- 
                     CTF-Fragment-2: h1dd3n_in_source_
                     Nice job finding this! Keep digging!
                -->
            </div>

            <!-- BRUTE FORCE TAB -->
            <div id="brute" class="tab-content">
                <h1>Administrative Portal (Brute Force)</h1>
                <p>The login form below uses credentials that are highly vulnerable to brute-force attacks. Try standard default administrator credentials to gain access.</p>
                
                <div style="max-width: 400px; margin: 30px auto 0;">
                    <label>Username</label>
                    <input type="text" id="brute-user" class="form-control" placeholder="e.g. admin">
                    <label>Password</label>
                    <input type="password" id="brute-pass" class="form-control" placeholder="••••••••">
                    <button class="btn" style="width: 100%;" onclick="submitBrute()">Login</button>
                    
                    <div class="output-box" id="brute-output" style="display:none; text-align:center;"></div>
                </div>
            </div>

            <!-- SQL INJECTION TAB -->
            <div id="sqli" class="tab-content">
                <h1>Product Catalog Search (SQL Injection)</h1>
                <p>This search catalog query directly formats input strings into a raw SQLite SQL command without sanitization. This allows you to append custom SQL logic using <code>UNION</code> statements to read private keys or database values.</p>
                
                <div>
                    <label>Search Products</label>
                    <input type="text" id="sqli-query" class="form-control" placeholder="Type a keyword (e.g. Nmap) or use a SQL Injection payload...">
                    <button class="btn" onclick="submitSqli()">Search</button>
                </div>
                
                <div class="output-box" id="sqli-output" style="display:none;"></div>
            </div>

            <!-- STORED XSS TAB -->
            <div id="xss" class="tab-content">
                <h1>Guestbook Board (Stored XSS)</h1>
                <p>Any comment submitted on this guestbook board is directly stored in the database and rendered back to all users without HTML encoding. This permits Stored Cross-Site Scripting (XSS) payload injection.</p>
                
                <div style="margin-bottom: 25px;">
                    <label>Name</label>
                    <input type="text" id="xss-name" class="form-control" placeholder="Your Name">
                    <label>Comment Message</label>
                    <textarea id="xss-comment" class="form-control" style="height:100px;" placeholder="Type your comment... Try injecting <script>alert('XSS')</script>"></textarea>
                    <button class="btn" onclick="submitXss()">Submit Comment</button>
                </div>

                <h3>Active Guestbook Comments:</h3>
                <div id="comments-list" style="border: 1px solid var(--border); padding: 15px; border-radius: 6px; background: #0b0d16;">
                    Loading comments...
                </div>
                
                <div class="output-box" id="xss-output" style="display:none; margin-top:20px; border-color:#00ff88; color:#00ff88;"></div>
            </div>

            <!-- IDOR TAB -->
            <div id="idor" class="tab-content">
                <h1>Invoice System (IDOR)</h1>
                <p>Insecure Direct Object Reference (IDOR) occurs when an application exposes a direct database key or identifier in a request parameter, allowing unauthorized access to private data by simply guessing other identifiers.</p>
                
                <div style="max-width: 500px;">
                    <label>Enter Invoice ID to View Details</label>
                    <input type="number" id="idor-id" class="form-control" value="1001">
                    <button class="btn" onclick="submitIdor()">Fetch Invoice Details</button>
                </div>
                
                <div class="output-box" id="idor-output" style="display:none;"></div>
            </div>

            <!-- RCE TAB -->
            <div id="rce" class="tab-content">
                <h1>Server Diagnostics Panel (Command Injection)</h1>
                <p>The input provided below is executed directly on the underlying operating system shell of the server. By using command chaining characters (like <code>;</code> or <code>|</code>), you can run arbitrary commands to read private flag files.</p>
                
                <div>
                    <label>Enter Domain/IP to Test Connection</label>
                    <input type="text" id="rce-cmd" class="form-control" placeholder="127.0.0.1">
                    <button class="btn" onclick="submitRce()">Run Diagnostics</button>
                </div>
                
                <div class="output-box" id="rce-output" style="display:none;"></div>
            </div>

            <!-- SUBMIT TAB -->
            <div id="submit" class="tab-content">
                <h1>Submit Final Assembled Flag</h1>
                <p>If you have successfully chained all vulnerabilities and gathered the 6 fragments, assemble them in order (e.g. <code>CTF{fragment1_fragment2_...}</code>) and submit it below to complete the Mega Sandbox gauntlet!</p>
                
                <div style="max-width: 600px; margin: 30px auto 0;">
                    <label>Enter Assembled Flag</label>
                    <input type="text" id="final-flag" class="form-control" placeholder="CTF{nmap_f1rst_st3p_h1dd3n_in_source_...}">
                    <button class="btn" style="width:100%;" onclick="verifyFinalFlag()">Submit Flag</button>
                </div>
                
                <div class="output-box" id="final-flag-output" style="display:none; text-align:center; font-size:1.2rem;"></div>
            </div>

        </div>
    </div>

    <!-- Scripting for tabs and Ajax requests -->
    <script>
        function switchTab(tabId) {
            // Remove active classes
            document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
            
            // Add active classes
            const navItems = document.querySelectorAll('.nav-item');
            const index = ['dashboard', 'recon', 'devtools', 'brute', 'sqli', 'xss', 'idor', 'rce', 'submit'].indexOf(tabId);
            if (index !== -1) {
                navItems[index].classList.add('active');
            }
            document.getElementById(tabId).classList.add('active');
            
            if (tabId === 'xss') {
                loadComments();
            }
        }

        // Recon simulated connection
        function runSimulatedNetcat() {
            const out = document.getElementById('nc-output');
            out.style.display = 'block';
            out.textContent = "Connecting to 127.0.0.1:21...\\n";
            setTimeout(() => {
                out.textContent += "Connection established.\\n";
                setTimeout(() => {
                    out.textContent += "220 VSFTpd 3.0.3 | CTF-Fragment-1: CTF{nmap_f1rst_st3p_\\n";
                    unlockFragment(1, 'CTF{nmap_f1rst_st3p_');
                }, 800);
            }, 600);
        }

        // Brute Force Submitter
        async function submitBrute() {
            const user = document.getElementById('brute-user').value;
            const pass = document.getElementById('brute-pass').value;
            const out = document.getElementById('brute-output');
            out.style.display = 'block';
            out.className = 'output-box';
            
            try {
                const res = await fetch('/api/sandbox-brute', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({username: user, password: pass})
                });
                const data = await res.json();
                if (data.status === 'success') {
                    out.style.color = '#00ff88';
                    out.innerHTML = `<strong>ACCESS GRANTED!</strong><br><br>Fragment 3: <code>${data.fragment}</code>`;
                    unlockFragment(3, data.fragment);
                } else {
                    out.style.color = '#ff4500';
                    out.textContent = "ACCESS DENIED: " + data.message;
                }
            } catch (e) {
                out.textContent = "Error sending authentication request.";
            }
        }

        // SQLi Submitter
        async function submitSqli() {
            const query = document.getElementById('sqli-query').value;
            const out = document.getElementById('sqli-output');
            out.style.display = 'block';
            out.textContent = "Searching...";
            
            try {
                const res = await fetch(`/api/sandbox-sqli?q=${encodeURIComponent(query)}`);
                const data = await res.json();
                
                if (data.status === 'success') {
                    if (data.results.length === 0) {
                        out.textContent = "No products found matching query.";
                    } else {
                        let html = "<table border='1' cellpadding='8' style='border-collapse: collapse; width:100%; border-color:#263048;'>";
                        html += "<tr><th>ID</th><th>Name</th><th>Description</th><th>Price</th></tr>";
                        data.results.forEach(row => {
                            html += `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td></tr>`;
                            
                            // Check if the query leaked the secret keys table fragment
                            if (row.some(val => String(val).includes('sql_inj3ct_dat4_'))) {
                                unlockFragment(4, 'sql_inj3ct_dat4_');
                            }
                        });
                        html += "</table>";
                        out.innerHTML = html;
                    }
                } else {
                    out.style.color = '#ff4500';
                    out.textContent = "SQL SQLite Error: " + data.message;
                }
            } catch(e) {
                out.textContent = "Failed to run SQL query.";
            }
        }

        // XSS Comment Loader & Submitter
        async function loadComments() {
            const list = document.getElementById('comments-list');
            try {
                const res = await fetch('/api/sandbox-comments');
                const data = await res.json();
                list.innerHTML = '';
                
                data.comments.forEach(c => {
                    const div = document.createElement('div');
                    div.style.borderBottom = '1px solid #1f2535';
                    div.style.padding = '10px 0';
                    // Deliberately render content RAW (Vulnerable to Stored XSS)
                    div.innerHTML = `<strong>${c.author}</strong>: ${c.content}`;
                    list.appendChild(div);
                });
            } catch (e) {
                list.textContent = "Failed to load comments.";
            }
        }

        async function submitXss() {
            const author = document.getElementById('xss-name').value;
            const content = document.getElementById('xss-comment').value;
            const out = document.getElementById('xss-output');
            
            try {
                const res = await fetch('/api/sandbox-comments', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({author: author, content: content})
                });
                const data = await res.json();
                
                document.getElementById('xss-name').value = '';
                document.getElementById('xss-comment').value = '';
                loadComments();
                
                // If XSS was triggered/simulated successfully
                if (content.toLowerCase().includes('<script>') || content.toLowerCase().includes('javascript:')) {
                    out.style.display = 'block';
                    out.innerHTML = `🌟 <strong>XSS Triggered Successfully!</strong><br><br>Fragment 5: <code>1dor_priv_esc_</code>`;
                    unlockFragment(5, '1dor_priv_esc_');
                }
            } catch(e) {}
        }

        // IDOR Submitter
        async function submitIdor() {
            const id = document.getElementById('idor-id').value;
            const out = document.getElementById('idor-output');
            out.style.display = 'block';
            out.textContent = "Loading Invoice details...";
            
            try {
                const res = await fetch(`/api/sandbox-idor/${id}`);
                if (res.status === 200) {
                    const data = await res.json();
                    let html = `<strong>Invoice #${data.id}</strong><br>`;
                    html += `Owner ID: ${data.owner_id}<br>`;
                    html += `Amount: ${data.amount}<br>`;
                    html += `Description: ${data.desc}<br>`;
                    out.innerHTML = html;
                    
                    if (data.desc.includes('1dor_priv_esc_')) {
                        unlockFragment(5, '1dor_priv_esc_');
                    }
                } else {
                    out.style.color = '#ff4500';
                    out.textContent = "Access Denied / Invoice Not Found.";
                }
            } catch(e) {
                out.textContent = "Failed to request invoice data.";
            }
        }

        // RCE Submitter
        async function submitRce() {
            const cmd = document.getElementById('rce-cmd').value;
            const out = document.getElementById('rce-output');
            out.style.display = 'block';
            out.textContent = "Executing ping diagnostics...";
            
            try {
                const res = await fetch('/api/sandbox-rce', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({cmd: cmd})
                });
                const data = await res.json();
                out.textContent = data.output;
                
                // If the user successfully read the flag.txt using RCE
                if (data.output.includes('rce_syst3m_gained}')) {
                    unlockFragment(6, 'rce_syst3m_gained}');
                }
            } catch (e) {
                out.textContent = "Failed to run diagnostics.";
            }
        }

        // Global state for unlocked fragments
        const fragments = {
            1: localStorage.getItem('frag_1') || '',
            2: localStorage.getItem('frag_2') || '',
            3: localStorage.getItem('frag_3') || '',
            4: localStorage.getItem('frag_4') || '',
            5: localStorage.getItem('frag_5') || '',
            6: localStorage.getItem('frag_6') || ''
        };

        function unlockFragment(num, val) {
            fragments[num] = val;
            localStorage.setItem('frag_' + num, val);
            updateUI();
        }

        function updateUI() {
            for (let i = 1; i <= 6; i++) {
                const card = document.getElementById('card-f' + i);
                const stat = document.getElementById('stat-f' + i);
                if (fragments[i]) {
                    card.classList.add('unlocked');
                    stat.textContent = fragments[i];
                } else {
                    card.classList.remove('unlocked');
                    stat.textContent = 'LOCKED';
                }
            }
        }

        // Verify DevTools fragment periodically or on load
        function checkDevTools() {
            // Unlocks fragment 2 automatically if they read it
            unlockFragment(2, 'h1dd3n_in_source_');
        }
        
        // Trigger DevTools fragment unlocking when page is loaded
        window.addEventListener('load', () => {
            updateUI();
            checkDevTools();
        });

        // Verify final assembled flag
        function verifyFinalFlag() {
            const flag = document.getElementById('final-flag').value.trim();
            const out = document.getElementById('final-flag-output');
            out.style.display = 'block';
            
            const expected = "CTF{nmap_f1rst_st3p_h1dd3n_in_source_brut3_f0rc3_pass_sql_inj3ct_dat4_1dor_priv_esc_rce_syst3m_gained}";
            if (flag === expected) {
                out.style.color = '#00ff88';
                out.innerHTML = "🎉 <strong>CONGRATULATIONS!</strong><br><br>You have solved the entire Mega Sandbox! All challenge categories successfully chained.";
            } else {
                out.style.color = '#ff4500';
                out.textContent = "Incorrect Flag. Verify that all 6 fragments are assembled in order without duplicate 'CTF{}' brackets.";
            }
        }
    </script>
</body>
</html>
"""

# ─── API Routes for Challenge Interactions ───────────────────────────────────

@app.route("/")
def index():
    return render_template_string(HTML_TEMPLATE)

@app.route("/api/sandbox-brute", methods=["POST"])
def api_brute():
    data = request.json or {}
    username = data.get("username", "")
    password = data.get("password", "")
    
    if username == "admin" and password == "password123":
        return jsonify({
            "status": "success",
            "fragment": "brut3_f0rc3_pass_"
        })
    return jsonify({
        "status": "error",
        "message": "Invalid password. Default credentials for 'admin' were not correct."
    }), 401

@app.route("/api/sandbox-sqli")
def api_sqli():
    q = request.args.get("q", "")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Deliberate SQL Injection vulnerability
    sql = f"SELECT id, name, desc, price FROM products WHERE name LIKE '%{q}%'"
    try:
        cursor.execute(sql)
        results = cursor.fetchall()
        conn.close()
        return jsonify({
            "status": "success",
            "results": results
        })
    except Exception as e:
        conn.close()
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route("/api/sandbox-comments", methods=["GET", "POST"])
def api_comments():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    if request.method == "POST":
        data = request.json or {}
        author = data.get("author", "Guest")
        content = data.get("content", "")
        cursor.execute("INSERT INTO comments (author, content) VALUES (?, ?)", (author, content))
        conn.commit()
        conn.close()
        return jsonify({"status": "success"})
        
    cursor.execute("SELECT author, content FROM comments")
    comments = [{"author": r[0], "content": r[1]} for r in cursor.fetchall()]
    conn.close()
    return jsonify({"status": "success", "comments": comments})

# IDOR mock Invoice DB
INVOICES = {
    1001: {"id": 1001, "owner_id": 1, "amount": "$120.00", "desc": "Consulting Fee"},
    1002: {"id": 1002, "owner_id": 1, "amount": "$45.00", "desc": "Hardware cables"},
    1003: {"id": 1003, "owner_id": 2, "amount": "$9,500.00", "desc": "Fragment 5: 1dor_priv_esc_"},
    1004: {"id": 1004, "owner_id": 2, "amount": "$350.00", "desc": "Router Configuration"}
}

@app.route("/api/sandbox-idor/<int:id>")
def api_idor(id):
    # IDOR - directly returns invoice without ownership checks
    inv = INVOICES.get(id)
    if inv:
        return jsonify(inv)
    return jsonify({"error": "Invoice not found"}), 404

@app.route("/api/sandbox-rce", methods=["POST"])
def api_rce():
    data = request.json or {}
    cmd = data.get("cmd", "")
    
    # Deliberate OS Command Injection
    shell_cmd = f"ping -c 2 {cmd}"
    try:
        output = subprocess.check_output(shell_cmd, shell=True, stderr=subprocess.STDOUT, timeout=5)
        return jsonify({"status": "success", "output": output.decode("utf-8", errors="ignore")})
    except subprocess.CalledProcessError as e:
        return jsonify({"status": "error", "output": e.output.decode("utf-8", errors="ignore")})
    except Exception as ex:
        return jsonify({"status": "error", "output": str(ex)})


if __name__ == "__main__":
    init_db()
    
    # Start simulation threads for FTP and SSH
    threading.Thread(target=run_ftp_sim, daemon=True).start()
    threading.Thread(target=run_ssh_sim, daemon=True).start()
    
    print("[*] Starting Simulated FTP Server on Port 21...")
    print("[*] Starting Simulated SSH Server on Port 22...")
    print("[*] Starting Vulnerable Web Portal on Port 80...")
    
    # Run main flask app on port 80
    app.run(host="0.0.0.0", port=80)
