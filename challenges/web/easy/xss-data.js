const LESSONS = [
  {
    title: "1. What is XSS and Core Concepts",
    points: 20,
    content: `THE GRAFFITI TRICK
Imagine you are at a school notice board where children pin paper notes to share messages. Normally, someone pins a note that says: "Have a nice day!" Everyone reads it and smiles. But one day, a sneaky student pins a note that has a magic spell written on it. When other children look at the note, the spell forces their hands to automatically reach into their pockets, pull out their lunch money, and toss it over the fence to the sneaky student! In the computer world, this magic trick is called Cross-Site Scripting, or XSS for short.

THE VICTIM'S COMPUTER
Instead of paper notes, XSS happens on websites that let users type text that other visitors will see (like comments or search boxes). If the website does not clean up the input, a hacker can type JavaScript code instead of normal text. When another user visits the page, their web browser reads the code, thinks it is an official command from the website, and runs it automatically. This allows hackers to steal the victim's session cookies (the digital keycards that keep you logged in), record every key they type on their keyboard to capture passwords, or redirect their browser to fake websites.

THE THREE SPELLS
There are three main types of XSS. "Reflected XSS" is when the magic spell is hidden inside a link; it only affects the single person who clicks the link. "Stored XSS" is when the spell is saved permanently in the website's database, affecting every single person who visits that page. "DOM XSS" is a special type that happens entirely inside the browser's memory without ever touching the website's server. To set up our lab, click the "Launch DVWA Instance" button above, log in as admin, reset the database, set the security difficulty to "Low", and click Submit!`,
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
    content: `THE ECHO ATTACK
Reflected XSS is like shouting at a mountain and hearing your voice echo straight back at you. When you type text into a search box, the website echoes your text back on the results page: "You searched for: [your text]". If the website doesn't check your input, and you type a JavaScript tag like "<script>alert(1)</script>", the browser reads the echoed text as code and pops up a box showing the number 1! This proves you can run custom code inside the victim's browser.

BYPASSING THE FILTERS
On Medium security, the developer tries to stop us by deleting the word "<script>". If we type "<script>", it disappears! We can bypass this by using different tags that can also run code, like an image tag with an error handler: "<img src=x onerror=alert(1)>". When the browser tries to load the fake image "x", it fails and runs the alert script. We can also mix capital and lowercase letters like "<ScRiPt>" to slip past the filter because the server only searches for lowercase words. On High security, the server blocks the word "script" entirely, so we must use the image or SVG tag bypasses instead.

THE SAFE CONVERSION
On Impossible security, the developer uses a function called "htmlspecialchars()". This function converts dangerous code characters into harmless display text before showing them on the page. The symbol "<" is turned into "&lt;" and ">" is turned into "&gt;". When the browser reads these converted characters, it displays them as normal letters on the screen rather than executing them as code. The magic spell is broken, and the website remains perfectly safe!`,
    questions: [
      { q: "What type of XSS sends the attack in a URL and the server bounces it back?", a: "Reflected XSS" },
      { q: "What HTML tag runs code when an image fails to load (onerror)?", a: "img" },
      { q: "What PHP function converts dangerous characters into safe text (impossible mode)?", a: "htmlspecialchars" }
    ]
  },
  {
    title: "3. DVWA XSS (Stored) — The Permanent Attack",
    points: 30,
    content: `THE PERMANENT GRAFFITI
Stored XSS is the most dangerous form of Cross-Site Scripting because it is permanent! It is like spray-painting a magic spell on a public wall. Every single person who walks past the wall is automatically hit by the spell, without needing to click any links or type any input. The attacker submits their code through a comment box, and the website saves it in its database. When other users load the comments, the server fetches the code and runs it in their browsers.

BYPASSING THE LENGTH LIMIT
On Low security, we can type "<script>alert(document.cookie)</script>" in the message box to show the visitor's session cookie. On Medium security, the message box is protected, but the Name box is vulnerable. However, the Name box has a maximum length of 10 characters set in the HTML. To bypass this, we right-click the Name box, click "Inspect" to open Developer Tools, find the "maxlength='10'" code, and change it to "maxlength='100'". Now we can type longer tags like our image bypass into the Name field!

THE ROBUST VAULT
On High security, we use our DevTools trick to expand the name field again, and bypass the "script" word filter by using an SVG tag: "<svg/onload=alert(1)>". On Impossible security, the database uses parameterized queries, and the server runs htmlspecialchars() on all inputs before saving or displaying them. This treats all inputs strictly as safe text, rendering every stored XSS attack completely useless and keeping the database clean.`,
    questions: [
      { q: "Does Stored XSS save the malicious code permanently in the database? (yes/no)", a: "yes" },
      { q: "Which input box in DVWA Stored XSS has a 10-character limit we bypass with DevTools?", a: "Name" },
      { q: "What JavaScript property reads the victim's session cookies?", a: "document.cookie" }
    ]
  },
  {
    title: "4. DVWA XSS (DOM) — The Invisible Attack",
    points: 30,
    content: `THE IN-MEMORY MEMO
To understand DOM XSS, we must look at how browsers load websites. When a webpage loads, the browser builds an internal map of all the elements in the computer's memory, called the Document Object Model (DOM). JavaScript can read and change this map to update the page. DOM XSS happens when a website's own JavaScript reads input from the URL bar (like a language setting) and writes it directly into the memory map without checking it.

THE UNSEEN HASH
The target page has a dropdown to select a language, and the URL shows "?default=English". On Low security, we can append our script tag directly after "?default=". On Medium and High security, the server checks the URL parameter and redirects us if it sees a script. We can bypass this by putting our payload after the "#" symbol (like "default=English#<img src=x onerror=alert(1)>"). The browser never sends anything after the "#" to the server, so the server thinks it is safe, but the browser's own JavaScript still reads it and injects it!

THE SAFE WRITER
On Impossible security, the developer fixes the bug by changing the JavaScript function used to update the page. Instead of using "innerHTML" (which treats input as HTML code), they use "textContent" (which treats input strictly as plain text). When textContent is used, the browser displays the literal characters "<script>" on the screen instead of running them, keeping the memory map safe and clean from injection.`,
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
    content: `THE ARSENAL OF TRICKS
Websites often try to defend against XSS by building "Blacklists" of bad words to block. But because there are hundreds of ways to write JavaScript, blockers can never block everything. Attackers can mix cases like "<ScRiPt>", use alternate tags like image or svg, write tags without quotes, or use backticks instead of parentheses. They can also use "URL Encoding" to hide their tags as hex numbers like "%3C" and "%3E", which fools weak filters.

THE TESTING DRONES
Security professionals use automated tools to test for XSS. "Burp Suite" acts as a proxy between your browser and the website, allowing you to automatically send hundreds of test payloads into input fields. "XSStrike" is a smart command-line tool that analyzes a page's HTML structure and designs custom bypass payloads for it. "OWASP ZAP" is a vulnerability scanner that automatically crawls websites to find injection holes.

THE SECURE WALLS
The only reliable way to defend against XSS is by using "Output Encoding" (like the htmlspecialchars function) to turn dangerous symbols into harmless display text. Developers should also use safe DOM APIs like "textContent" rather than innerHTML. Finally, they should implement a Content Security Policy (CSP) header, which tells the browser to only run JavaScript that comes from approved, trusted files, blocking all injected scripts!`,
    questions: [
      { q: "Is blacklisting (blocking specific bad words) an effective XSS defense? (yes/no)", a: "no" },
      { q: "What defense converts dangerous characters like < into safe display text like &lt;? (Output...)", a: "Output Encoding" },
      { q: "What HTTP header instructs the browser to only run scripts from approved sources? (Content Security...)", a: "Content Security Policy" },
      { q: "What is a payload called that combines multiple bypass techniques to evade complex filters?", a: "Polyglot" }
    ]
  }
];
