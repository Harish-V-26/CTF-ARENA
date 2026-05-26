"""
Ultimate Gauntlet Target Server
================================
A deliberately vulnerable multi-service server for the CTF challenge.
Services:
  Port 80   — Web Recon (HTTP): hidden /robots.txt, /staging/ dir, admin panel
  Port 21   — FTP banner (Metasploit scanner target): leaks Phase 1 key
  Port 8080 — IDOR API: user/invoice lookup with access control bypass
  Port 9090 — File Upload Service: validates Content-Type, accepts .php webshell
               (/execute?cmd=cat+/flag.txt reveals the final flag)

Flag chain:
  Phase 1: Scan ports → FTP banner reveals  CTF{R3C0N_  (via Metasploit scanner or Nmap)
  Phase 2: Recon HTTP → /robots.txt reveals  /staging/api_key.txt  →  p4ss_ph4s3_2
           Visit /staging/api_key.txt → reveals  _1D0R_
  Phase 3: IDOR API (port 8080) → /api/invoice/1003 reveals  _F1L3_
  Phase 4: File Upload (port 9090) → upload shell.php → execute cat /flag.txt → G4UNT}
  
  Final combined flag: CTF{R3C0N_1D0R_F1L3_G4UNT}
"""

import socket
import threading
import os
from flask import Flask, request, jsonify, render_template_string, send_from_directory

# ─── Flask App (ports 8080 & 9090) ────────────────────────────────────────────

app = Flask(__name__)

UPLOAD_DIR = "/tmp/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Write the real flag to /flag.txt inside the container
with open("/flag.txt", "w") as f:
    f.write("G4UNT}\n")

# ─── Fake user/invoice DB (IDOR) ──────────────────────────────────────────────
USERS = {
    1: {"id": 1, "username": "john_user",  "role": "user",  "email": "john@securecorp.htb"},
    2: {"id": 2, "username": "admin_root", "role": "admin", "email": "admin@securecorp.htb"},
}
INVOICES = {
    1001: {"id": 1001, "owner_id": 1, "amount": "$200",    "desc": "Stationery"},
    1002: {"id": 1002, "owner_id": 1, "amount": "$450",    "desc": "Printer ink"},
    1003: {"id": 1003, "owner_id": 2, "amount": "$99,000", "desc": "Phase 3 token: _F1L3_"},
    1004: {"id": 1004, "owner_id": 2, "amount": "$5,000",  "desc": "Security Review"},
}

IDOR_HTML = """<!DOCTYPE html>
<html>
<head><title>SecureCorp Billing System</title>
<style>
  body{background:#0a0f0a;color:#00ff41;font-family:monospace;display:flex;
       justify-content:center;align-items:center;height:100vh;margin:0;}
  .box{background:#111;border:1px solid #00ff41;padding:40px;border-radius:8px;width:500px;}
  h2{margin:0 0 20px;color:#00ff41;text-align:center;}
  .form-group{margin-bottom:20px;}
  label{display:block;margin-bottom:8px;color:#888;}
  input[type=number]{width:100%;padding:10px;background:#1a1a1a;border:1px solid #333;color:#00ff41;border-radius:4px;box-sizing:border-box;font-family:monospace;font-size:1.1rem;}
  button{background:#00ff41;color:#000;border:none;padding:10px 20px;
         font-size:1rem;cursor:pointer;border-radius:4px;font-weight:bold;width:100%;margin-top:10px;}
  button:hover{background:#00cc33;}
  .invoice-card{margin-top:30px;border:1px dashed #333;padding:20px;border-radius:6px;display:none;background:#151515;}
  .invoice-header{display:flex;justify-content:space-between;border-bottom:1px solid #222;padding-bottom:10px;margin-bottom:15px;}
  .invoice-title{font-weight:bold;font-size:1.2rem;}
  .invoice-amount{color:#ff5555;font-weight:bold;font-size:1.2rem;}
  .invoice-desc{color:#ccc;}
</style>
</head>
<body>
<div class="box">
  <h2>💳 SecureCorp Invoice Portal</h2>
  <div class="form-group">
    <label for="invoice-id">Enter Invoice ID:</label>
    <input type="number" id="invoice-id" value="1001" placeholder="e.g. 1001"/>
    <button onclick="loadInvoice()">View Invoice</button>
  </div>
  
  <div id="invoice-card" class="invoice-card">
    <div style="display:flex; justify-content:space-between; border-bottom:1px solid #333; padding-bottom:10px; margin-bottom:15px;">
      <span class="invoice-title" id="card-title">Invoice #1001</span>
      <span class="invoice-amount" id="card-amount">$200</span>
    </div>
    <p><strong>Description:</strong> <span id="card-desc">Stationery</span></p>
    <p style="color:#666; font-size:0.8rem; margin-top:15px; margin-bottom:0;">Owner ID: <span id="card-owner">1</span></p>
  </div>
</div>

<script>
async function loadInvoice() {
  const id = document.getElementById('invoice-id').value;
  const card = document.getElementById('invoice-card');
  try {
    const res = await fetch(`/api/invoice/${id}`);
    if (res.status === 200) {
      const data = await res.json();
      document.getElementById('card-title').textContent = `Invoice #${data.id}`;
      document.getElementById('card-amount').textContent = data.amount;
      document.getElementById('card-desc').textContent = data.desc;
      document.getElementById('card-owner').textContent = data.owner_id;
      card.style.display = 'block';
    } else {
      alert("Invoice not found or Access Denied!");
      card.style.display = 'none';
    }
  } catch(e) {
    alert("Error fetching invoice data.");
  }
}
// Load default
window.onload = loadInvoice;
</script>
</body>
</html>
"""

@app.route("/")
def index():
    port = request.environ.get('SERVER_PORT')
    if port == '9090':
        return render_template_string(UPLOAD_HTML)
    return render_template_string(IDOR_HTML)

# ─── Port 8080 — IDOR API ─────────────────────────────────────────────────────

@app.route("/api/user/<int:uid>")
def api_user(uid):
    u = USERS.get(uid)
    if not u:
        return jsonify({"error": "not found"}), 404
    return jsonify(u)

@app.route("/api/invoice/<int:iid>")
def api_invoice(iid):
    # VULNERABLE: no session/ownership check — pure IDOR
    inv = INVOICES.get(iid)
    if not inv:
        return jsonify({"error": "not found"}), 404
    return jsonify(inv)

@app.route("/api/users")
def api_users():
    return jsonify(list(USERS.values()))

# ─── Port 9090 — File Upload ──────────────────────────────────────────────────

UPLOAD_HTML = """<!DOCTYPE html>
<html>
<head><title>SecureCorp Upload Portal</title>
<style>
  body{background:#0a0f0a;color:#00ff41;font-family:monospace;display:flex;
       justify-content:center;align-items:center;height:100vh;margin:0;}
  .box{background:#111;border:1px solid #00ff41;padding:40px;border-radius:8px;width:400px;}
  h2{margin:0 0 20px;color:#00ff41;}
  input[type=file]{display:block;margin:20px 0;color:#00ff41;}
  button{background:#00ff41;color:#000;border:none;padding:10px 30px;
         font-size:1rem;cursor:pointer;border-radius:4px;font-weight:bold;}
  button:hover{background:#00cc33;}
  .note{color:#888;font-size:0.8rem;margin-top:15px;}
</style>
</head>
<body>
<div class="box">
  <h2>📁 SecureCorp File Upload</h2>
  <p>Upload your report file (JPG/PNG/PDF only).</p>
  <form method="POST" action="/upload" enctype="multipart/form-data">
    <input type="file" name="file" required/>
    <button type="submit">Upload File</button>
  </form>
  <p class="note">Allowed types: image/jpeg, image/png, application/pdf</p>
  <!-- Dev Note: Remember to remove the /execute-debug?script=<filepath> testing endpoint before production! -->
</div>
</body>
</html>
"""

EXEC_HTML = """<!DOCTYPE html>
<html>
<head><title>Shell Output</title>
<style>body{{background:#000;color:#00ff41;font-family:monospace;padding:30px;}}
pre{{background:#111;padding:20px;border-radius:6px;overflow-x:auto;}}</style>
</head>
<body>
<h2>$ {cmd}</h2>
<pre>{output}</pre>
<p><a href="/upload-form" style="color:#888;">← Back</a></p>
</body>
</html>
"""

@app.route("/upload-form")
def upload_form():
    return render_template_string(UPLOAD_HTML)

@app.route("/upload", methods=["POST"])
def do_upload():
    f = request.files.get("file")
    if not f:
        return jsonify({"error": "no file"}), 400

    # VULNERABLE: only checks Content-Type header, not actual file content
    allowed_types = {"image/jpeg", "image/png", "application/pdf"}
    ct = f.content_type or ""
    if ct not in allowed_types:
        return jsonify({
            "error": f"File type '{ct}' not allowed. Allowed: image/jpeg, image/png, application/pdf"
        }), 400

    filename = f.filename or "upload.bin"
    save_path = os.path.join(UPLOAD_DIR, filename)
    f.save(save_path)
    os.chmod(save_path, 0o755)

    return jsonify({
        "success": True,
        "message": f"File '{filename}' uploaded successfully.",
        "path": f"/tmp/uploads/{filename}"
    })

@app.route("/execute-debug")
def execute():
    script = request.args.get("script", "")
    if not script:
        return jsonify({"error": "No script parameter provided"}), 400
    
    if not os.path.exists(script):
        return jsonify({"error": "File not found"}), 404

    try:
        import subprocess
        # Execute the uploaded file as a bash script
        result = subprocess.check_output(f"bash {script}", shell=True, stderr=subprocess.STDOUT, timeout=5)
        output = result.decode("utf-8", errors="ignore")
    except subprocess.CalledProcessError as e:
        output = e.output.decode("utf-8", errors="ignore")
    except Exception as ex:
        output = str(ex)
    return EXEC_HTML.format(cmd=f"bash {script}", output=output)


# ─── Port 80 — Web Recon HTTP server ─────────────────────────────────────────

INDEX_HTML = b"""HTTP/1.1 200 OK\r\nServer: SecureCorp-Portal/3.1\r\nContent-Type: text/html\r\nConnection: close\r\n\r\n<!DOCTYPE html>
<html>
<head><title>SecureCorp Internal Portal</title>
<style>body{background:#0a0f0a;color:#00ff41;font-family:monospace;text-align:center;padding-top:10%;}
h1{font-size:2.5rem;} p{color:#ccc;}</style>
</head>
<body>
<h1>SecureCorp Internal Portal</h1>
<p>WARNING: Authorised personnel only.</p>
<p style="color:#555;font-size:0.8rem;">v3.1.0 | Build 2024</p>
</body>
</html>
"""

ROBOTS_TXT = b"""HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nConnection: close\r\n\r\nUser-agent: *
Disallow: /staging/
Disallow: /admin-backup/
Disallow: /dev/

# Note to devs: remove api_key.txt from staging before next deploy
"""

STAGING_INDEX = b"""HTTP/1.1 200 OK\r\nContent-Type: text/html\r\nConnection: close\r\n\r\n<!DOCTYPE html>
<html><body style="background:#111;color:#0f0;font-family:monospace;padding:40px;">
<h2>/staging/ - Development Environment</h2>
<ul>
  <li><a href="/staging/api_key.txt" style="color:#0f0;">/staging/api_key.txt</a></li>
  <li><a href="/staging/config.bak" style="color:#0f0;">/staging/config.bak</a></li>
</ul>
</body></html>
"""

API_KEY_TXT = b"""HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nConnection: close\r\n\r\n# SecureCorp Staging API Key
# DO NOT COMMIT TO REPO

phase_token=_1D0R_
api_key=sk-prod-9x7z2p
deploy_user=admin_root
"""

CONFIG_BAK = b"""HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nConnection: close\r\n\r\n[database]
host=db.internal
user=root
pass=Sup3rS3cr3t!

[api]
internal_port=8080
"""

NOT_FOUND = b"HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\nConnection: close\r\n\r\n404 Not Found"

def handle_http(client):
    try:
        data = client.recv(4096).decode("utf-8", errors="ignore")
        path = "/"
        if data:
            line = data.split("\r\n")[0]
            parts = line.split(" ")
            if len(parts) >= 2:
                path = parts[1].split("?")[0]

        responses = {
            "/":                   INDEX_HTML,
            "/robots.txt":         ROBOTS_TXT,
            "/staging/":           STAGING_INDEX,
            "/staging":            STAGING_INDEX,
            "/staging/api_key.txt": API_KEY_TXT,
            "/staging/config.bak": CONFIG_BAK,
        }
        resp = responses.get(path, NOT_FOUND)
        client.sendall(resp)
    except Exception:
        pass
    finally:
        client.close()

def run_http():
    srv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    srv.bind(("0.0.0.0", 80))
    srv.listen(10)
    print("[*] HTTP listening on port 80")
    while True:
        c, _ = srv.accept()
        threading.Thread(target=handle_http, args=(c,), daemon=True).start()


# ─── Port 21 — FTP banner (Metasploit/Nmap scanner target) ───────────────────

def handle_ftp(client):
    try:
        # Banner contains Phase 1 token
        client.sendall(b"220 SecureCorp FTP v2.0 | Phase-1-Token: CTF{R3C0N_ | Use Metasploit ftp_version or nmap --script banner\r\n")
        while True:
            data = client.recv(1024)
            if not data:
                break
            cmd = data.strip().upper()
            if cmd.startswith(b"QUIT"):
                client.sendall(b"221 Goodbye.\r\n")
                break
            elif cmd.startswith(b"USER"):
                client.sendall(b"331 Password required.\r\n")
            elif cmd.startswith(b"PASS"):
                client.sendall(b"530 Login incorrect.\r\n")
            else:
                client.sendall(b"500 Unrecognised command.\r\n")
    except Exception:
        pass
    finally:
        client.close()

def run_ftp():
    srv = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    srv.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    srv.bind(("0.0.0.0", 21))
    srv.listen(10)
    print("[*] FTP listening on port 21")
    while True:
        c, _ = srv.accept()
        threading.Thread(target=handle_ftp, args=(c,), daemon=True).start()


# ─── Main ─────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    # Start raw TCP servers in background threads
    threading.Thread(target=run_http,  daemon=True).start()
    threading.Thread(target=run_ftp,   daemon=True).start()

    # Run Flask on two ports: 8080 (IDOR) and 9090 (upload)
    # Use werkzeug to serve both via threading
    from werkzeug.serving import make_server

    idor_srv   = make_server("0.0.0.0", 8080, app)
    upload_srv = make_server("0.0.0.0", 9090, app)

    threading.Thread(target=idor_srv.serve_forever,   daemon=True).start()
    threading.Thread(target=upload_srv.serve_forever, daemon=True).start()

    print("[*] IDOR API listening on port 8080")
    print("[*] File Upload listening on port 9090")
    print("[*] All services running. Press Ctrl+C to stop.")

    import time
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("Exiting.")
