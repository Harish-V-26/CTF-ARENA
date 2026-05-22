const LESSONS = [
  {
    title: "1. What is SQL Injection?",
    points: 20,
    content: `<div class="htb-diagram-container"><img src="../../../assets/sqli_intro_nologo_1779433210463.png" alt="What is SQL Injection?"></div>SQL INJECTION — A BEGINNER'S COMPLETE GUIDE

WHAT IS SQL INJECTION?
Imagine a giant filing cabinet guarded by a very strict robot librarian. To get a file, you have to write a note on a piece of paper and hand it to the robot. The robot only understands notes written in a special language called SQL. Normally, you write "Please give me the file named Alice." The robot reads it, understands you want Alice's file, and gives it to you. But what if you are a sneaky hacker? You could hand the robot a note that says: "Please give me the file named Alice, OR give me EVERY single file in the entire cabinet!" Because the robot isn't very smart, it just reads the note literally, gets confused by the "OR", and accidentally dumps thousands of secret files right onto the floor for you! SQL Injection (SQLi) is exactly like this trick. It happens when a website takes something you type and hands it directly to the database robot without checking to see if you snuck in any dangerous commands.

WHY DO ATTACKERS USE SQL INJECTION?
SQL Injection is one of the oldest and most destructive web attacks. It is consistently ranked number one on the OWASP list of most critical web security risks.

An attacker can use SQLi to:
  1. Bypass Authentication: Log in to any account, including admin accounts, without knowing the password.
  2. Dump the Entire Database: Extract every user's username, password, email, and personal information in seconds.
  3. Modify Data: Change prices, transfer funds, alter records, or delete data.
  4. Destroy Data: Use commands like DROP TABLE to permanently wipe the entire database.
  5. Take Over the Server: In some configurations, SQL commands can be used to read and write files on the server's hard drive.

HOW DOES SQL INJECTION WORK?
The core vulnerability is "trusting user input". When a developer writes code that does this:

  query = "SELECT * FROM users WHERE username = '" + userInput + "'"

They are building the SQL command by joining text together. If you type the name "alice", the query becomes safe:
  SELECT * FROM users WHERE username = 'alice'

But if you type: ' OR 1=1 #
The query becomes:
  SELECT * FROM users WHERE username = '' OR 1=1 #'

Breaking this down:
  - The first apostrophe (') closes the 'alice' string early.
  - OR 1=1 adds a condition. Since 1 always equals 1, this condition is ALWAYS TRUE for every row in the table.
  - The # symbol (in MySQL) turns the rest of the line into a comment, so the closing apostrophe is ignored.

The database now returns every single user record because the OR 1=1 condition is true for all of them. You have bypassed the intended check completely.

HOW TO SET UP THE LAB

STEP 1 — Start the Lab:
Click "Launch DVWA Instance" and wait for your private container to start.

STEP 2 — Log In:
  Username: admin
  Password: password

STEP 3 — Reset the Database:
Scroll down and click "Create / Reset Database". This sets up the practice database.

STEP 4 — Set Security Level:
Go to "DVWA Security" in the left menu. Make sure it is set to "Low" and click "Submit".`,
    questions: [
      { q: "What is the name of the language used to communicate with databases?", a: "SQL" },
      { q: "What is the default username for our lab?", a: "admin" },
      { q: "What is the default password?", a: "password" }
    ]
  },
  {
    title: "2. The Truth Trick — Low Security",
    points: 30,
    content: `<div class="htb-diagram-container"><img src="../../../assets/sqli_low_nologo_1779433226521.png" alt="The Truth Trick - Low Security"></div>EXPLOITING SQL INJECTION ON LOW SECURITY

UNDERSTANDING THE VULNERABILITY
Imagine the website is a lazy messenger who takes your note and hands it straight to the database robot without even looking at it. At Low security, DVWA does exactly this! It takes whatever you type in the "User ID" box and pastes it directly into an SQL query with absolutely zero protection. The query looks like this:

  SELECT first_name, last_name FROM users WHERE user_id = '[YOUR INPUT]'

If you type "1", the query finds the user with ID 1. But we can break out of this query structure by typing SQL code.

HOW TO PERFORM THE ATTACK

STEP 1 — Navigate to the SQL Injection page:
In the DVWA left sidebar, click "SQL Injection". You will see a text box asking for a User ID.

STEP 2 — Verify normal behavior:
Type "1" and click Submit. You should see the admin user's details. This confirms the input goes to the database.

STEP 3 — Perform the SQL Injection:
In the User ID box, type exactly this (include the apostrophe at the start):
  ' OR 1=1 #

Then click Submit.

WHAT HAPPENS AND WHY:
The server builds this SQL query from your input:
  SELECT first_name, last_name FROM users WHERE user_id = '' OR 1=1 #'

Analyzing each part:
  - The ' (apostrophe) closes the opening quote. The user_id condition is now empty.
  - OR adds an alternative condition. If EITHER condition is true, the row is returned.
  - 1=1 is a mathematical statement that is ALWAYS TRUE for every single row in the table.
  - The # symbol marks everything after it as a comment — the database ignores the rest.

Result: The database returns EVERY user in the table because 1=1 is true for every row. You have bypassed the intended filter and extracted all user records.

ADDITIONAL PAYLOADS TO TRY:
  1' OR '1'='1
    (Alternative syntax — same logical result)
  1' UNION SELECT user, password FROM users #
    (UNION attack — combines your query with a second query to dump the password table)
  1' AND 1=2 #
    (This returns NO results because AND 1=2 is always false — useful for confirming the injection exists)`,
    questions: [
      { q: "What mathematical condition do we inject that is always true?", a: "1=1" },
      { q: "What character (#) turns the rest of the SQL query into a comment?", a: "#" },
      { q: "Did injecting OR 1=1 dump all users from the database? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "3. The Dropdown Bypass — Medium Security",
    points: 30,
    content: `<div class="htb-diagram-container"><img src="../../../assets/sqli_medium_nologo_1779433243852.png" alt="The Dropdown Bypass - Medium Security"></div>BYPASSING MEDIUM SECURITY VIA DEVTOOLS

WHAT CHANGED IN MEDIUM?
At Medium security, the lazy messenger finally realizes they are being tricked, so they try to fix the problem in two silly ways:
  1. They replace the empty box where you write your note with a pre-printed multiple-choice checklist (the dropdown menu). They think, "If the hacker can only check boxes, they can't write any sneaky commands!"
  2. They tell the messenger to look for dangerous punctuation marks (like apostrophes) and scribble over them.

WHY IT IS STILL VULNERABLE:
The dropdown restriction only exists on the web page in your browser — it is a "client-side" control. The browser sends the selected value to the server as a simple number. The actual protection lives only in your browser, not on the server. Using your browser's Developer Tools, you can directly edit the HTML and change the value being sent.

HOW TO PERFORM THE ATTACK

STEP 1 — Change DVWA to Medium:
Go to "DVWA Security" → select "Medium" → click "Submit".

STEP 2 — Go to "SQL Injection":
You will see the dropdown menu. There is no text box.

STEP 3 — Open Developer Tools:
Right-click on the dropdown menu and click "Inspect" (or press F12 and click the Inspector/Elements tab).
This opens the browser's code editor, showing the raw HTML of the page.

STEP 4 — Find and edit the dropdown values:
In the code, look for lines that look like:
  <option value="1">1</option>
  <option value="2">2</option>

Double-click the value="1" text inside one of these lines. The value becomes editable.

STEP 5 — Change the value to an injection payload:
Replace the value with:
  1 OR 1=1

So it now reads: <option value="1 OR 1=1">1</option>

Note: We do NOT use an apostrophe (') here because medium security escapes apostrophes. Since the original query puts our input directly as a number (not inside quotes), we do not need one.

STEP 6 — Select and submit:
Click OK/press Enter to confirm the edit. Now select "1" from the dropdown and click Submit.

The injected value (1 OR 1=1) is sent to the server. The database returns all users.`,
    questions: [
      { q: "What type of selection control replaced the text box in Medium level?", a: "dropdown" },
      { q: "What browser tool did we use to edit the web page code?", a: "DevTools" },
      { q: "Did we need to use an apostrophe (') in the Medium level payload? (yes/no)", a: "no" }
    ]
  },
  {
    title: "4. The Popup Bypass — High Security",
    points: 30,
    content: `<div class="htb-diagram-container"><img src="../../../assets/sqli_high_nologo_1779433261627.png" alt="The Popup Bypass - High Security"></div>EXPLOITING HIGH SECURITY VIA A POPUP WINDOW

WHAT CHANGED IN HIGH?
At High security, the website designers think they have come up with a brilliant plan. They decide to move the place where you type your note into a completely different room (a popup window) far away from the database robot. They think that by making you walk to a different room to write the note, it will be impossible for you to trick the robot on the main page. They also add a few more guards to check your spelling. Despite this crazy setup, the main database robot is STILL vulnerable, and the guards are still not perfect! Our classic magic spell will still work.

WHAT IS A SECOND-ORDER ATTACK?
When the input and the output happen on different pages or at different times, this is called a Second-Order (or Stored) SQL Injection. You put your payload in one place (the popup form), it gets stored or passed to another part of the application (the main results page), and the injection fires there.

HOW TO PERFORM THE ATTACK

STEP 1 — Change DVWA to High:
Go to "DVWA Security" → select "High" → click "Submit".

STEP 2 — Go to "SQL Injection":
You will see text saying "Click here to change your ID". Click it.

STEP 3 — A popup window opens:
This separate popup has a text input box for entering a User ID.

STEP 4 — Enter the injection payload in the popup:
In the popup's text box, type:
  ' OR 1=1 #

Click "Submit" and then close the popup.

STEP 5 — View the results on the main page:
The main page will now display all the user records from the database. The injection fired on the results page based on the value stored from the popup. The attack succeeded.`,
    questions: [
      { q: "Did the High level move the input to a separate popup window? (yes/no)", a: "yes" },
      { q: "What is it called when input is submitted in one place but the injection fires in another?", a: "Second-Order" },
      { q: "Did our classic ' OR 1=1 # payload still work on High? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "5. The Unbreakable Defense — Impossible Level",
    points: 30,
    content: `<div class="htb-diagram-container"><img src="../../../assets/sqli_impossible_nologo_1779433282143.png" alt="The Unbreakable Defense - Impossible Level"></div>WHY IMPOSSIBLE SECURITY STOPS ALL ATTACKS

UNDERSTANDING THE DEFENSE
At the Impossible level, the website finally fires the lazy messenger and buys a super-secure lockbox called "Parameterized Queries" (also known as Prepared Statements). This is the ultimate, unbreakable shield against SQL Injection.

WHAT ARE PARAMETERIZED QUERIES?
With normal (vulnerable) queries, the developer builds the SQL command as a text string with the user's input pasted inside it. The database receives a finished query with the input already embedded.

With Parameterized Queries, the developer sends the SQL command STRUCTURE to the database first, separately from the data. It works in two steps:
  1. First, the developer tells the database the SHAPE of the query: "I am going to search for a user ID. I will give you the number later. Here is a placeholder (?) for it."
  2. Second, the developer sends the actual user input as a separate piece of data, clearly labeled as DATA, not as code.

The database now knows for certain that the placeholder (?) will ONLY ever be treated as a value to compare against, NEVER as SQL instructions.

WHAT HAPPENS TO OUR ATTACK?
When we type:  ' OR 1=1 #

With a parameterized query, the database does not parse this as SQL code. It searches for a user whose user_id column LITERALLY contains the text: ' OR 1=1 # (apostrophe, space, O, R, space, 1, equals sign, 1, space, hash).

No user has that as their ID. The database returns zero results. The attack is completely, permanently broken.

WHY IS THIS THE CORRECT FIX?
  - It does not rely on filtering specific characters (which attackers can always bypass).
  - It does not rely on escaping characters (which sometimes has edge cases).
  - It works by making it structurally impossible for user input to be interpreted as code.
  - It is the same protection used by all major, well-written web applications.

TRY IT: Change security to Impossible, go to SQL Injection, and try:
  ' OR 1=1 #
  ' OR '1'='1
  1 UNION SELECT username, password FROM users #

All of these will return zero results or an error. Every injection technique fails.`,
    questions: [
      { q: "What is the name of the correct defense that permanently prevents SQL Injection?", a: "Prepared Statements" },
      { q: "With Parameterized Queries, does the database treat user input as SQL code? (yes/no)", a: "no" },
      { q: "Is the database completely safe from SQL Injection at Impossible level? (yes/no)", a: "yes" }
    ]
  }
];
