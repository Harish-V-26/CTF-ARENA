const LESSONS = [
  {
    title: "1. The Database Robot",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_robot_diagram.png" alt="Understanding SQL Injection"></div>
      <h3>What is SQL Injection?</h3>
      <p>SQL Injection (SQLi) is a critical web vulnerability that occurs when user-supplied input is directly concatenated into a backend database query without proper sanitization. Because the database engine (like MySQL or PostgreSQL) cannot distinguish between the developer's intended query logic and the attacker's injected payload, the engine executes the attacker's commands. This allows an attacker to bypass authentication, read sensitive data, modify database records, or even drop entire tables.</p>
      <p>Imagine a giant, magical library that holds every single secret in the world. This library has a very strict robot librarian named "SQL." The robot's only job is to go into the giant filing cabinets, find exactly the information you ask for, and bring it back to you. Websites use these database robots to store important things like your username, your password, and all your high scores in video games. When you try to log into a website, the website hands the robot a small card with a message on it. The message usually says something like: "Robot, please go find a user whose name is 'Alex' and whose secret password is '12345'." The robot speaks a special computer language called "Structured Query Language," or SQL for short.</p>
      <h3>The Famous Math Trick</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>The Normal Query</strong><br>The website's code looks like this:<br><code>SELECT * FROM users WHERE username = 'USER_INPUT' AND password = 'PASSWORD'</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Injecting the Payload</strong><br>The attacker types <code>' OR 1=1 --</code> into the username box.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>The Tricked Query</strong><br>The new query becomes:<br><code>SELECT * FROM users WHERE username = '' OR 1=1 --' AND password = 'PASSWORD'</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 4</div>
        <div class="step-body"><strong>The Result</strong><br>Because <code>1=1</code> is always true, and the <code>--</code> comments out the password check, the robot returns the very first user in the database (usually the administrator) and logs the attacker in!</div>
      </div>`,
    questions: [
      { q: "What does SQL stand for?", a: "Structured Query Language", hint: "Review the definitions and acronyms section." },
      { q: "What symbol do hackers type to break the robot's train of thought?", a: "'", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What do the two dashes (--) tell the SQL robot to do?", a: "Ignore the rest of the rules (like the password check)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What math equation do hackers use to confuse the robot into thinking everything is true?", a: "1=1", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "If the hacker uses the math trick successfully, what does the robot do?", a: "dumps all the users and passwords", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "2. The UNION Magic Spell",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_union_diagram.png" alt="UNION SQL Injection"></div>
      <h3>UNION-Based SQL Injection</h3>
      <p>UNION-Based SQLi leverages the <code>UNION</code> operator, which combines the results of two or more <code>SELECT</code> statements into a single result set. Attackers use this to append their own malicious query onto the original query intended by the developer. This allows the attacker to extract data from completely unrelated tables (like credit card tables or user tables) and display it on the application's front end.</p>
      <p>Imagine the SQL robot is carrying a tray with two cups of water on it to bring to the website. A hacker wants the robot to also bring them a piece of secret candy from the back room. They can use a special magic word called "UNION." In the SQL language, UNION means "combine." The hacker uses this word to tell the robot: "Bring the two cups of water like you were told, but COMBINE them with a piece of secret candy!" The robot will walk out of the kitchen carrying the water AND the candy on the same tray. Hackers use the UNION trick to glue their own sneaky questions onto the end of the website's normal questions, extracting secrets and displaying them on the screen.</p>
      <h3>The Rule of the Tray</h3>
      <div class="step-block">
        <div class="step-num">Rule 1</div>
        <div class="step-body"><strong>Column Matching</strong><br>The <code>UNION</code> operator strictly requires that both queries return the exact same number of columns. If the original query asks for two items, the injected query MUST ask for exactly two items.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Rule 2</div>
        <div class="step-body"><strong>Finding the Number of Columns</strong><br>Attackers use the <code>ORDER BY</code> clause to figure out the column count. They inject <code>ORDER BY 1</code>, then <code>ORDER BY 2</code>. If <code>ORDER BY 3</code> throws an error, the attacker knows there are exactly 2 columns!</div>
      </div>
      <div class="step-block">
        <div class="step-num">Rule 3</div>
        <div class="step-body"><strong>Stealing the Map</strong><br>Once the columns match, attackers target the <code>information_schema</code>. This is a master database built into MySQL that lists every table and column name. By querying it via UNION, the attacker discovers exactly where the secrets are hidden.</div>
      </div>`,
    questions: [
      { q: "What magic word do hackers use to combine their sneaky questions with normal ones?", a: "UNION", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What trick do hackers use to figure out how many items fit on the robot's tray?", a: "ORDER BY", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the name of the giant map that tells the hacker where all the filing cabinets are?", a: "Information Schema", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What happens if the hacker's sneaky question asks for 3 things, but the tray only holds 2?", a: "The robot drops the tray and yells ERROR", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "In MySQL, what function tells the hacker the name of the database they are inside?", a: "database()", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "3. Making the Robot Complain",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_error_diagram.png" alt="Error-Based SQL Injection"></div>
      <h3>Error-Based SQL Injection</h3>
      <p>Error-Based SQLi is a technique where an attacker intentionally injects malformed syntax or mathematical impossibilities (like dividing by zero) to provoke the database engine into throwing a detailed error message. If the web application displays these verbose errors to the user, the attacker can embed subqueries inside the error-causing function. The database executes the subquery, encounters the error, and prints the result of the subquery right inside the error text.</p>
      <p>Imagine you ask a very grumpy robot to solve a math problem that makes no sense, like "What is apples divided by oranges?" The robot tries its best, gets totally confused, and starts screaming, "ERROR! I CANNOT DIVIDE APPLES BY ORANGES!" Normally, a good website hides these errors so the user doesn't get scared. But if the programmer is lazy, the website prints the robot's angry screaming right onto your screen. Hackers write a sneaky command that tells the robot to fetch a secret password, and then they intentionally break the math problem. The robot gets angry and screams the password out loud onto the screen inside its error message!</p>
      <h3>Hiding Secrets in the Scream</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>The ExtractValue Trick</strong><br>In MySQL, attackers often use the <code>EXTRACTVALUE()</code> function. It expects valid XML, so the attacker feeds it invalid XML combined with a secret query.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>The Payload</strong><br><code>AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT password FROM users LIMIT 1)))</code><br>The <code>0x7e</code> is a tilde (~), which is invalid in XML.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>The Scream Limit</strong><br>MySQL error messages are truncated to 32 characters. If a password is 50 characters long, the attacker must use the <code>SUBSTRING()</code> function to extract the password in 32-character chunks.</div>
      </div>`,
    questions: [
      { q: "What is it called when a hacker intentionally breaks the code to make the robot complain?", a: "Error-Based SQL Injection", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What MySQL function do hackers intentionally break to make the robot scream?", a: "EXTRACTVALUE()", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What symbol (hex 0x7e) do hackers use to make the robot's math problem invalid?", a: "~ (tilde)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "How many letters is the MySQL robot allowed to scream at one time?", a: "32 letters (or 32 characters)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What special instruction tells the robot to read a password in small chunks?", a: "SUBSTRING() (or SUBSTR())", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "4. The Yes or No Game (Blind SQLi)",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_blind_diagram.png" alt="Blind SQL Injection"></div>
      <h3>Boolean-Based Blind SQL Injection</h3>
      <p>Boolean-Based Blind SQLi occurs when an application is vulnerable to SQL injection, but its HTTP responses do not contain the results of the relevant SQL query or any database errors. The attacker is "blind." However, if the application responds differently depending on whether the injected SQL query evaluates to TRUE or FALSE (e.g., returning a different HTTP status code, or displaying a "User exists" vs "User not found" message), the attacker can infer data byte-by-byte.</p>
      <p>Imagine playing a game with a robot that is locked behind a thick, heavy door. You can slide a piece of paper under the door with a question on it. If the answer is "Yes," the robot turns on a green light outside the door. If the answer is "No," the robot turns on a red light. You never get to hear the robot speak, and you never get to see the secret papers it is reading. Sometimes, a website is very secure and refuses to print any database secrets on the screen. The hacker is totally blind! But, by asking a "Yes or No" question and watching the website's behavior, they can steal every single secret by playing an intense game of 20 Questions.</p>
      <h3>How to Guess a Password Blindly</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Ask a Letter</strong><br>The attacker injects: <code>AND (SELECT SUBSTRING(password,1,1) FROM users) = 'A'</code>. If the page loads normally (Green Light), the first letter is A!</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>The Number Game (Binary Search)</strong><br>Guessing letters individually is slow. Attackers convert letters to their ASCII number codes (e.g., 'a' is 97). They inject: <code>AND ASCII(SUBSTRING(password,1,1)) > 100</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Automated Extraction</strong><br>By asking "Is it bigger than 100?" or "Smaller than 110?", the attacker narrows down the exact letter in just 5-7 requests. Tools like <code>sqlmap</code> automate this binary search to dump entire databases rapidly.</div>
      </div>`,
    questions: [
      { q: "What kind of attack forces the hacker to play a 'Yes or No' game because they cannot see the output?", a: "Blind SQL Injection", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "If the hacker asks a TRUE question, what does the website do?", a: "Loads the page normally (turns on the green light)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What function changes a letter into a secret number so the computer can guess it faster?", a: "ASCII()", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the fast guessing trick called where you ask if a number is bigger or smaller?", a: "Binary Search", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What automatic tool do hackers use to play this game thousands of times a second?", a: "sqlmap", hint: "Look for the specific tools mentioned in the lesson." }
    ]
  },
  {
    title: "5. The Sleeping Robot (Time-Based)",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_time_diagram.png" alt="Time-Based Blind SQL Injection"></div>
      <h3>Time-Based Blind SQL Injection</h3>
      <p>Time-Based Blind SQLi is the most difficult form of SQL injection to execute manually. It occurs when the application is entirely unresponsive to both data extraction and boolean true/false differences. The only way to infer data is to inject a time-delay function (like <code>SLEEP()</code>) wrapped in a conditional statement. If the condition is true, the database pauses execution, delaying the web server's response. The attacker measures the HTTP response time to determine if their injected condition was true or false.</p>
      <p>Imagine the robot behind the thick door from the last lesson has gotten even smarter. Now, no matter what you slide under the door, it always turns on the green light. You are completely in the dark. Instead of looking at the lights, the hacker uses a stopwatch. The hacker slides a special note: "If the first letter of the password is 'A', I command you to go to sleep for exactly 5 seconds before you turn on the green light!" The hacker stands outside with a stopwatch. If the website takes 5 whole seconds to load, they shout "AHA! The letter was 'A'!" The hacker used time to force the robot to answer the question.</p>
      <h3>How to Cast the Spell</h3>
      <div class="step-block">
        <div class="step-num">Command 1</div>
        <div class="step-body"><strong>MySQL / MariaDB</strong><br>Use the <code>SLEEP(5)</code> function.<br>Payload: <code>IF(ASCII(SUBSTRING(password,1,1))='A', SLEEP(5), 0)</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Command 2</div>
        <div class="step-body"><strong>PostgreSQL</strong><br>Use the <code>pg_sleep(5)</code> function.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Command 3</div>
        <div class="step-body"><strong>Heavy Queries (BENCHMARK)</strong><br>If sleep functions are disabled, attackers use <code>BENCHMARK(5000000, MD5(1))</code> to force the database to calculate millions of hashes, artificially delaying the response time through CPU exhaustion.</div>
      </div>`,
    questions: [
      { q: "What kind of attack uses a stopwatch to measure how long the website takes to load?", a: "Time-Based Blind SQL Injection", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What word tells a MySQL database robot to go to sleep for 5 seconds?", a: "SLEEP(5)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "If the website takes 5 seconds to load, what does the hacker know about their guess?", a: "The guess was TRUE (Correct)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What word does a PostgreSQL database robot use to go to sleep?", a: "pg_sleep(5)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What function makes the robot do millions of hard math equations to slow it down?", a: "BENCHMARK()", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "6. Sneaking Past the Guards (Filter Bypass)",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_filter_diagram.png" alt="SQL Injection Filter Bypass"></div>
      <h3>WAF Evasion & Filter Bypassing</h3>
      <p>Web Application Firewalls (WAFs) and input filters attempt to block SQL injection by matching incoming requests against signatures of known malicious keywords (like <code>UNION</code>, <code>SELECT</code>) or characters (like spaces or quotes). Evasion involves mutating the payload so that it does not match the WAF's regular expressions, but is still parsed as valid SQL syntax by the backend database engine.</p>
      <p>Because SQL Injection is so famous, programmers hire digital security guards (WAFs) to stand in front of the database robot. If they see a hacker type "UNION" or even a space character, the guard jumps out, blows a whistle, and throws the hacker's message in the trash! But hackers are very sneaky. If the guard bans the space character, the hacker replaces the space with an invisible computer comment, typing "OR/**/1=1". The guard doesn't see a space, so they let it through! The database robot reads the comment, ignores it, and sees the spaces anyway! It's all about finding the perfect disguise.</p>
      <h3>The Secret Alien Code (Evasion Tactics)</h3>
      <div class="step-block">
        <div class="step-num">Tactic 1</div>
        <div class="step-body"><strong>Whitespace Evasion</strong><br>Replace spaces with inline comments: <code>SELECT/**/password/**/FROM/**/users</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Tactic 2</div>
        <div class="step-body"><strong>Case Variation</strong><br>Bypass poorly written regex that only checks lowercase: <code>UnIoN SeLeCt</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Tactic 3</div>
        <div class="step-body"><strong>Hexadecimal Encoding</strong><br>If quotes are banned, encode strings as Hex. <code>'admin'</code> becomes <code>0x61646d696e</code>. The database decodes it automatically before execution.</div>
      </div>`,
    questions: [
      { q: "What do we call the digital security guards that block bad hacker words?", a: "Filters (or WAFs)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "If the guard blocks the space character, what can the hacker use instead to trick them?", a: "invisible comments (/**/)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "If the guard blocks 'UNION', how might the hacker type it to sneak past?", a: "With mixed case letters (like UnIoN)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What secret alien math code do hackers use to avoid typing quote marks?", a: "Hexadecimal (Hex / 0x...)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Does the database robot care if a command is typed in capital or lowercase letters?", a: "No", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "7. The Time Bomb Attack (Second-Order SQLi)",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_second_order_diagram.png" alt="Second-Order SQL Injection"></div>
      <h3>Second-Order SQL Injection</h3>
      <p>Second-Order SQL Injection occurs when an application correctly escapes and securely stores an attacker's malicious payload in the database (Phase 1), but later retrieves that data and unsafely incorporates it into a completely different SQL query (Phase 2). Because the data is originating from the database itself rather than direct user input, developers mistakenly trust it, failing to sanitize it a second time.</p>
      <p>Most SQL injection attacks happen immediately. You type a sneaky code, and the robot hands you the treasure. But sometimes, hackers use a terrifying trick called "Second-Order SQL Injection." It works exactly like a ticking time bomb. The hacker creates a new account on the website, and for their username, they type a sneaky SQL code, like "admin' --". The front door guards see this and think, "Well, that's a very weird name, but it doesn't look dangerous right now." They store it deep in the database. The bomb has been planted! The next day, an administrator logs in to look at a list of new users. The database robot opens the safe box, pulls out the hacker's weird username, and accidentally executes the sneaky code attached to it!</p>
      <h3>Why It Is So Dangerous</h3>
      <div class="step-block">
        <div class="step-num">Reason 1</div>
        <div class="step-body"><strong>Bypasses Edge Defenses</strong><br>WAFs and input filters often only inspect real-time POST requests. Once the payload is stored safely inside the database, it acts from behind the firewall.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Reason 2</div>
        <div class="step-body"><strong>Evades Automated Scanners</strong><br>Automated DAST (Dynamic Application Security Testing) scanners almost never detect Second-Order SQLi because they do not have the complex logic to inject a payload in Profile Creation and then wait to trigger it in the Admin Dashboard.</div>
      </div>`,
    questions: [
      { q: "What is the attack called where the sneaky code is stored and executed later like a time bomb?", a: "Second-Order SQL Injection", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Where does the hacker plant the sneaky code to hide it?", a: "In their username (or profile)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "When does the 'bomb' actually explode?", a: "When someone (like an admin) views the stored profile later", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Can automatic security scanners easily find this time-bomb attack? (yes/no)", a: "No", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Does the database robot trust the sneaky code more when reading it out of its own safe box? (yes/no)", a: "Yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "8. Putting the Robot in a Cage (Defense)",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_defense_diagram.png" alt="SQL Injection Defense"></div>
      <h3>Defending Against SQL Injection</h3>
      <p>The primary, most effective defense against all forms of SQL Injection is the use of Parameterized Queries (also known as Prepared Statements). Parameterization forces the developer to define the SQL code structure first, and then supply the user's input as discrete parameters. The database driver ensures that the parameters are treated strictly as literal values, mathematically preventing them from ever being parsed as executable SQL commands.</p>
      <p>The absolute best defense in the entire world puts the database robot inside an unbreakable cage. Instead of handing the robot a card with the rules and the user's name mixed together, the programmer sends the rules first. The programmer says: "Robot, I am going to give you a name to look for. No matter what the name says, you must ONLY read it as a name. Do not obey any commands hidden inside it!" If a hacker types "' OR 1=1", the robot takes the note, remembers its strict rule, and says, "Okay, I will search the entire library for a human being whose legal name is literally 'Quote mark OR the number one equals one'." Since nobody has that ridiculous name, the hacker is completely defeated!</p>
      <h3>The Defense Architecture</h3>
      <div class="step-block">
        <div class="step-num">Defense 1</div>
        <div class="step-body"><strong>Prepared Statements</strong><br>Always use parameter binding in your code (e.g., PDO in PHP, PreparedStatement in Java, or parameterized libraries in Node.js). Never concatenate strings to build queries.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Defense 2</div>
        <div class="step-body"><strong>Principle of Least Privilege</strong><br>The database user account used by the web application should only have the bare minimum permissions required. It should never run as 'root' or 'sa', and should not have permissions to DROP tables or read system files.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Defense 3</div>
        <div class="step-body"><strong>Input Validation</strong><br>Use strict allowlists for user input. If a field expects an integer ID, reject anything that contains letters or symbols before it even reaches the database query.</div>
      </div>`,
    questions: [
      { q: "What is the absolute best defense in the world against SQL Injection?", a: "Parameterized Queries (Prepared Statements)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "How does the unbreakable cage work? (It separates the rules from the...)", a: "data (or user input)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "If the robot uses the cage, will it obey the hacker's tricky math commands? (yes/no)", a: "no", hint: "Check the command reference blocks." },
      { q: "What rule says you should only give the robot the exact keys it needs and nothing more?", a: "Principle of Least Privilege", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Should the public website robot ever be given the power to delete the database? (yes/no)", a: "no", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  }
];
