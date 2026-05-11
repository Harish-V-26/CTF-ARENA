const LESSONS = [
  {
    title: "How the Web Works (DNS & IP)",
    points: 10,
    content: `Before attacking web applications, you must understand how they communicate. 

IP ADDRESSES:
Every device connected to the Internet has an IP address (e.g., 192.168.1.1). Computers use these numbers to route data to the correct destination.

DOMAIN NAME SYSTEM (DNS):
Humans are bad at remembering numbers, so we use domain names (like google.com). DNS is the internet's phonebook — it translates human-readable domain names into machine-readable IP addresses.

THE PROCESS:
1. You type a URL into your browser.
2. Your browser asks a DNS server: "What is the IP address for this domain?"
3. The DNS server returns the IP address.
4. Your browser connects directly to the server at that IP address.

DNS RECONNAISSANCE:
Attackers often query DNS to find subdomains (like dev.target.com or admin.target.com) to expand their attack surface.`,
    questions: [
      { q: "What system translates domain names into IP addresses?", a: "DNS" },
      { q: "What does an IP address primarily do on the Internet?", a: "Routes data to the correct destination" },
      { q: "What process involves finding subdomains of a target domain?", a: "DNS Reconnaissance" }
    ]
  },
  {
    title: "Web Application Architecture",
    points: 10,
    content: `Modern web applications are typically split into three main components (often called the 3-Tier Architecture):

1. THE CLIENT (Frontend):
This is what the user sees and interacts with. It runs in the web browser using HTML, CSS, and JavaScript. Vulnerabilities here affect the user directly (e.g., XSS).

2. THE SERVER (Backend / Application Layer):
This is the brain of the application. It processes requests, executes business logic, and interacts with the database. Common languages include Python, Node.js, PHP, and Java. Vulnerabilities here can compromise the entire application (e.g., Command Injection).

3. THE DATABASE (Data Layer):
This stores all the application's data, including user accounts, passwords, and site content. Examples are MySQL, PostgreSQL, and MongoDB. Vulnerabilities here lead to data breaches (e.g., SQL Injection).

Understanding where a vulnerability lives helps you exploit and patch it effectively.`,
    questions: [
      { q: "Which tier runs in the user's web browser?", a: "The Client" },
      { q: "Which tier processes requests and executes business logic?", a: "The Server" },
      { q: "In which tier does SQL Injection typically occur?", a: "The Database" }
    ]
  },
  {
    title: "Sessions and Cookies",
    points: 10,
    content: `HTTP is a stateless protocol, meaning each request is independent. The server doesn't inherently remember you between page loads. 

COOKIES:
To fix this, servers send a small piece of data called a Cookie. Your browser stores it and sends it back with every subsequent request to that same server.

SESSIONS:
When you log in, the server generates a unique Session ID. It sends this ID to your browser as a Cookie. On your next request, the browser sends the Session ID cookie, and the server knows you are already authenticated.

SECURITY RISKS:
If an attacker steals your Session ID cookie, they can impersonate you. This is known as Session Hijacking. 
To prevent this:
- Cookies should be marked Secure (HTTPS only).
- Cookies should be marked HttpOnly (preventing JS access to stop XSS).
- Session IDs should be long and randomly generated so they can't be guessed.`,
    questions: [
      { q: "Why does HTTP need cookies to remember users?", a: "Because HTTP is a stateless protocol" },
      { q: "What unique value identifies an authenticated user across multiple requests?", a: "Session ID" },
      { q: "What happens if an attacker steals a user's session cookie?", a: "Session Hijacking" }
    ]
  },
  {
    title: "Same-Origin Policy (SOP) & CORS",
    points: 10,
    content: `The Same-Origin Policy (SOP) is a critical security mechanism in web browsers.

WHAT IS SOP?
SOP prevents a malicious script on one website (e.g., attacker.com) from reading sensitive data on another website (e.g., bank.com) that the user is logged into.
Two URLs have the same origin if they have the same: Protocol (http/https), Port (80/443), and Host (domain).

CROSS-ORIGIN RESOURCE SHARING (CORS):
Sometimes, web applications legitimately need to request data from a different origin (e.g., an API on api.site.com). CORS is a mechanism that uses HTTP headers to allow a server to specify which other origins are permitted to access its resources.

CORS MISCONFIGURATION:
If a server is configured to trust any origin (Access-Control-Allow-Origin: *), an attacker can easily write a script to steal sensitive data from users visiting the attacker's site.`,
    questions: [
      { q: "What browser policy prevents scripts from one site from reading data on another?", a: "Same-Origin Policy" },
      { q: "What three components make up an origin?", a: "Protocol, Port, and Host" },
      { q: "What mechanism allows servers to bypass the SOP securely?", a: "CORS" }
    ]
  },
  {
    title: "Core Concepts & Importance of Web Security",
    points: 10,
    content: `Web Security is the practice of protecting websites, web applications, and APIs from malicious attacks, unauthorized access, and data breaches. 

WHY IT MATTERS:
As our lives move online, web applications handle highly sensitive data, including personal information, financial records, and medical histories. A breach can lead to:
- Financial loss (stolen credit cards, ransomware)
- Reputational damage for businesses
- Legal consequences (GDPR/CCPA fines)
- Loss of user trust

THE CIA TRIAD:
The foundation of information security relies on three core principles:
1. Confidentiality: Ensuring data is accessible only to authorized users.
2. Integrity: Ensuring data is accurate and unaltered by unauthorized parties.
3. Availability: Ensuring systems and data are available to users when needed.

If any of these pillars fall, the system is compromised.`,
    questions: [
      { q: "What does the 'C' in the CIA Triad stand for?", a: "Confidentiality" },
      { q: "Ensuring data is accurate and unaltered is known as what?", a: "Integrity" },
      { q: "What principle ensures systems are accessible when needed?", a: "Availability" }
    ]
  },
  {
    title: "HTTP Basics & Data Protection",
    points: 10,
    content: `The web operates on HTTP (Hypertext Transfer Protocol), which dictates how browsers and servers communicate.

THE PROBLEM WITH HTTP:
Basic HTTP sends all data in plain text. If an attacker intercepts the traffic (a Man-in-the-Middle attack), they can easily read passwords, session cookies, and personal messages.

THE SOLUTION: HTTPS
HTTPS (HTTP Secure) uses TLS/SSL to encrypt data between the client and server. Even if intercepted, the data appears as scrambled gibberish.

DATA PROTECTION BASICS:
- Encryption: Scrambling data so it can only be read with a decryption key.
- Hashing: A one-way mathematical function used to securely store passwords (e.g., bcrypt). You cannot reverse a hash to get the original password.
- Secure Cookies: Setting flags like 'Secure' (only sent over HTTPS) and 'HttpOnly' (prevents JavaScript access) protects session tokens from being stolen.`,
    questions: [
      { q: "What protocol encrypts data between the client and server?", a: "HTTPS" },
      { q: "What one-way function is used to securely store passwords?", a: "Hashing" },
      { q: "What cookie flag prevents JavaScript from accessing the cookie?", a: "HttpOnly" },
      { q: "What kind of attack intercepts communication between two parties?", a: "Man-in-the-Middle" }
    ]
  },
  {
    title: "Common Attack: SQL Injection (SQLi)",
    points: 10,
    content: `SQL Injection occurs when user input is insecurely embedded into a database query. 

HOW IT WORKS:
Imagine a login query:
SELECT * FROM users WHERE username = 'USER_INPUT' AND password = 'PASSWORD_INPUT'

If an attacker enters admin' -- as the username:
SELECT * FROM users WHERE username = 'admin' -- ' AND password = '...'

The -- comments out the password check, allowing the attacker to log in as the admin without knowing the password.

IMPACT:
- Bypassing authentication
- Reading sensitive database contents
- Modifying or deleting data
- Sometimes achieving command execution on the server

DEFENSE:
The best defense is using Parameterized Queries (Prepared Statements), which treat user input as data rather than executable code.`,
    questions: [
      { q: "What type of attack manipulates database queries?", a: "SQL Injection" },
      { q: "What characters are commonly used to comment out the rest of a SQL query?", a: "--" },
      { q: "What is the primary defense against SQL Injection?", a: "Parameterized Queries" }
    ]
  },
  {
    title: "Common Attack: Cross-Site Scripting (XSS)",
    points: 10,
    content: `Cross-Site Scripting (XSS) happens when a web application includes untrusted data in a web page without proper validation or escaping.

HOW IT WORKS:
An attacker injects malicious JavaScript into a website. When a victim visits the site, their browser executes the script, thinking it came from a trusted source.

TYPES OF XSS:
1. Reflected XSS: The malicious script comes from the current HTTP request (e.g., a search parameter in the URL).
2. Stored XSS: The malicious script is saved on the server (e.g., in a comment forum) and served to all users who view that page.
3. DOM-based XSS: The vulnerability exists in the client-side code rather than the server-side code.

IMPACT:
- Stealing session cookies to hijack accounts
- Redirecting users to malicious sites
- Modifying the webpage content (defacement)

DEFENSE:
Properly encode all user input before rendering it in the browser (e.g., converting < to &lt;).`,
    questions: [
      { q: "What type of attack injects malicious JavaScript into a webpage?", a: "Cross-Site Scripting" },
      { q: "Which type of XSS permanently saves the payload on the server?", a: "Stored XSS" },
      { q: "What is a common goal of an XSS attack regarding user sessions?", a: "Stealing session cookies" }
    ]
  },
  {
    title: "Common Attack: Brute Force & Authentication",
    points: 10,
    content: `Authentication mechanisms are the front door to web applications. Attackers frequently target them to gain unauthorized access.

BRUTE FORCE ATTACKS:
A brute force attack involves systematically submitting many passwords or passphrases with the hope of eventually guessing correctly. 

VARIATIONS:
- Dictionary Attack: Trying a list of common passwords (e.g., "password123", "admin").
- Credential Stuffing: Using lists of leaked username/password pairs from other breached websites.

IMPACT:
Account takeover leading to data theft, fraud, or lateral movement within an organization.

DEFENSE:
- Strong Password Policies: Require complexity and length.
- Rate Limiting: Block users or IPs after a certain number of failed login attempts.
- Multi-Factor Authentication (MFA): Require a second form of verification (like an SMS code or authenticator app).`,
    questions: [
      { q: "What attack tries many different passwords to guess the correct one?", a: "Brute Force" },
      { q: "What attack uses leaked username and password pairs from other breaches?", a: "Credential Stuffing" },
      { q: "What defense mechanism blocks repeated failed login attempts?", a: "Rate Limiting" },
      { q: "What does MFA stand for?", a: "Multi-Factor Authentication" }
    ]
  },
  {
    title: "Web Security Testing & Tools",
    points: 10,
    content: `To find and fix vulnerabilities, security professionals use specialized tools to inspect and manipulate web traffic.

WEB PROXIES (Burp Suite):
A web proxy sits between your browser and the target server. It intercepts all HTTP/HTTPS requests, allowing you to view, modify, and replay them before they reach the server.

Burp Suite is the industry standard tool for this. Key features include:
- Proxy: Intercepts and logs traffic.
- Repeater: Allows you to manually modify a request and resend it over and over.
- Intruder: Automates customized attacks (like brute force or fuzzing).

OTHER TOOLS:
- OWASP ZAP: A popular free and open-source alternative to Burp Suite.
- DirBuster / Gobuster: Tools for discovering hidden directories and files on a web server.
- SQLMap: Automates the detection and exploitation of SQL injection flaws.`,
    questions: [
      { q: "What tool intercepts traffic between a browser and a server?", a: "Web Proxy" },
      { q: "What is the industry standard web proxy tool used by security professionals?", a: "Burp Suite" },
      { q: "Which Burp Suite feature allows you to manually modify and resend requests?", a: "Repeater" },
      { q: "What tool automates the detection of SQL injection?", a: "SQLMap" }
    ]
  }
];
