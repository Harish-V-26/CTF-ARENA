const LESSONS = [
  {
    title: "1. What is SQL Injection?",
    points: 20,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_intro_nologo_1779433210463.png" alt="What is SQL Injection?"></div>
      <h3>SQL Injection (SQLi)</h3>
      <p>SQL Injection is an injection attack that makes it possible to execute malicious SQL statements. These statements control a database server behind a web application. Attackers can use SQL Injection to bypass authentication, access, modify, and delete data within the database by manipulating the query structure through unescaped user input.</p>
      <p>Imagine a giant filing cabinet guarded by a strict robot librarian. You write a note: "Please give me the file named Alice." The robot reads it and gives you the file. But what if you hand the robot a sneaky note that says: "Please give me the file named Alice, OR give me EVERY single file in the entire cabinet!" Because the robot isn't very smart, it reads the note literally, gets confused by the "OR", and accidentally dumps thousands of secret files right onto the floor for you! SQLi is exactly like this trick.</p>
      <h3>Mechanics & Setup</h3>
      <div class="step-block">
        <div class="step-num">Mechanic</div>
        <div class="step-body"><strong>String Concatenation</strong><br>When code concatenates strings like <code>query = "SELECT * FROM users WHERE username = '" + input + "'"</code>, injecting <code>' OR 1=1 #</code> alters the logic. The <code>1=1</code> is always true, and <code>#</code> comments out the rest of the query.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Setup</div>
        <div class="step-body"><strong>Lab Environment</strong><br>Click "Launch DVWA Instance". Log in with <code>admin</code>/<code>password</code>. Click "Create / Reset Database", then set the DVWA Security level to "Low".</div>
      </div>`,
    questions: [
      { q: "What is the name of the language used to communicate with databases?", a: "SQL", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the default username for our lab?", a: "admin", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the default password?", a: "password", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "2. The Truth Trick — Low Security",
    points: 30,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_low_nologo_1779433226521.png" alt="The Truth Trick - Low Security"></div>
      <h3>Tautology-Based SQL Injection</h3>
      <p>A tautology-based SQL injection leverages conditional statements that always evaluate to true (e.g., <code>1=1</code>). By breaking out of the data context using string delimiters and appending a tautology using the <code>OR</code> operator, an attacker forces the database to return all records for the targeted table, bypassing intended WHERE clause filters.</p>
      <p>Imagine the website is a lazy messenger who takes your note and hands it straight to the database robot without even looking at it. It takes whatever you type in the box and pastes it directly into the instructions. If you type a magical math spell that says "OR 1=1", you are telling the robot: "Give me this specific file, OR if 1 equals 1, give me everything!" Since 1 always equals 1, the robot gives you everything!</p>
      <h3>Practical Attack Walkthrough</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Identify Vulnerability</strong><br>In DVWA, click "SQL Injection". Type "1" and click Submit. You see the admin's details. The input is being queried against the database.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Execute Payload</strong><br>Type the payload exactly: <code>' OR 1=1 #</code> and click Submit.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Analyze Results</strong><br>The database returns EVERY user in the table. The <code>'</code> closed the string, <code>OR 1=1</code> forced a true condition, and <code>#</code> commented out the rest of the legitimate query.</div>
      </div>`,
    questions: [
      { q: "What mathematical condition do we inject that is always true?", a: "1=1", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What character (#) turns the rest of the SQL query into a comment?", a: "#", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Did injecting OR 1=1 dump all users from the database? (yes/no)", a: "yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "3. The Dropdown Bypass — Medium Security",
    points: 30,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_medium_nologo_1779433243852.png" alt="The Dropdown Bypass - Medium Security"></div>
      <h3>Bypassing Client-Side Controls</h3>
      <p>Medium security attempts to mitigate attacks by restricting input vectors (using a dropdown menu) and applying <code>mysql_real_escape_string()</code> to escape quotes. However, client-side UI controls are easily bypassed by intercepting requests or modifying the DOM. Furthermore, if the backend query treats the input as an integer rather than a string, quote escaping provides zero protection.</p>
      <p>At Medium security, the lazy messenger replaces the empty text box with a multiple-choice checklist (the dropdown menu). They think, "If the hacker can only check boxes, they can't write any sneaky commands!" But this restriction only exists inside your browser. Using Developer Tools, you can literally rewrite the web page's code, change the dropdown values, and send your sneaky spell anyway!</p>
      <h3>Practical Attack Walkthrough</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Change Level</strong><br>Set DVWA Security to "Medium". Go to "SQL Injection". The text box is now a dropdown menu.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>DOM Modification</strong><br>Right-click the dropdown menu and select "Inspect" (DevTools). Find the HTML: <code>&lt;option value="1"&gt;1&lt;/option&gt;</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Inject & Execute</strong><br>Double-click the <code>value="1"</code> and change it to <code>value="1 OR 1=1"</code>. Press Enter. Select "1" from the dropdown and submit. The query lacks quotes for the integer, so <code>1 OR 1=1</code> executes perfectly without needing apostrophe evasion.</div>
      </div>`,
    questions: [
      { q: "What type of selection control replaced the text box in Medium level?", a: "dropdown", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What browser tool did we use to edit the web page code?", a: "DevTools", hint: "Look for the specific tools mentioned in the lesson." },
      { q: "Did we need to use an apostrophe (') in the Medium level payload? (yes/no)", a: "no", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "4. The Popup Bypass — High Security",
    points: 30,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_high_nologo_1779433261627.png" alt="The Popup Bypass - High Security"></div>
      <h3>Second-Order SQL Injection</h3>
      <p>A Second-Order (or stored) SQL Injection occurs when malicious input is safely stored by the application (or passed through an intermediary mechanism) but is later executed unsafely in a different context or query. By separating the injection point from the execution point, developers falsely assume the input has been sanitized.</p>
      <p>At High security, the website designers think they are brilliant. They move the text box into a completely different room (a popup window) far away from the main results page. They think making you walk to a different room makes it impossible to trick the robot. But the main robot is STILL vulnerable! You put your spell in the popup, the system stores it, and it fires later on the main page. This is a Second-Order attack!</p>
      <h3>Practical Attack Walkthrough</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Change Level</strong><br>Set DVWA Security to "High". Go to "SQL Injection". Click the text saying "Click here to change your ID".</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Inject in Popup</strong><br>A separate popup opens. In its text box, type your classic payload: <code>' OR 1=1 #</code>. Click "Submit" and close the popup.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Execution</strong><br>Look at the main results page. It now displays all user records. The injection fired successfully from the stored session data.</div>
      </div>`,
    questions: [
      { q: "Did the High level move the input to a separate popup window? (yes/no)", a: "yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is it called when input is submitted in one place but the injection fires in another?", a: "Second-Order", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Did our classic ' OR 1=1 # payload still work on High? (yes/no)", a: "yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "5. The Unbreakable Defense — Impossible Level",
    points: 30,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_impossible_nologo_1779433282143.png" alt="The Unbreakable Defense - Impossible Level"></div>
      <h3>Parameterized Queries (Prepared Statements)</h3>
      <p>Parameterized queries structurally separate the SQL code from the user-supplied data. The database compiles the query structure first (using placeholders), and binds the user input later strictly as literal values. This completely neutralizes SQL injection because the input is never parsed as executable SQL syntax.</p>
      <p>At the Impossible level, the website finally buys a super-secure lockbox called "Parameterized Queries". The developer sends the instructions to the robot first: "I will give you a name later, just treat it as a name." When you send your sneaky spell <code>' OR 1=1 #</code>, the robot doesn't run it as code. It literally searches for a user whose actual name is exactly "Quote-OR-1=1-Hashtag". Since no user is named that, the attack permanently fails!</p>
      <h3>The Defense in Action</h3>
      <div class="step-block">
        <div class="step-num">Defense</div>
        <div class="step-body"><strong>Try the Impossible</strong><br>Set security to Impossible. Try <code>' OR 1=1 #</code> or <code>1 UNION SELECT username, password FROM users #</code>. Every injection technique fails completely and safely. Prepared statements are the ultimate defense.</div>
      </div>`,
    questions: [
      { q: "What is the name of the correct defense that permanently prevents SQL Injection?", a: "Prepared Statements", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "With Parameterized Queries, does the database treat user input as SQL code? (yes/no)", a: "no", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Is the database completely safe from SQL Injection at Impossible level? (yes/no)", a: "yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  }
];
