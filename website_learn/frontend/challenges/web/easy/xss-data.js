const LESSONS = [
  {
    title: "1. What is XSS and Core Concepts",
    points: 20,
    html: `<div class="htb-diagram-container"><img src="../../../assets/xss_intro_nologo_1779433714294.png" alt="What is XSS and Core Concepts"></div>
      <h3>Cross-Site Scripting (XSS)</h3>
      <p>Cross-Site Scripting (XSS) is a client-side code injection vulnerability. It occurs when an application includes untrusted data in a web page without proper validation or escaping. This allows an attacker to execute malicious scripts (typically JavaScript) within the victim's browser, potentially hijacking user sessions, defacing websites, or redirecting the user to malicious sites.</p>
      <p>Imagine a giant public notice board in your school where anyone can pin a message. Normally, people pin up normal pieces of paper. But what if a prankster pins a special, magical piece of paper that contains a secret robot command? Because the principal never checks the papers, the magic paper waits there. When an innocent student reads the board, the paper jumps off and forces the student's brain to do whatever the prankster commanded! This is XSS: a hacker posts secret computer code (JavaScript) that runs automatically inside the browser of anyone who views the page.</p>
      <h3>XSS Types and Mechanisms</h3>
      <div class="step-block">
        <div class="step-num">Type 1</div>
        <div class="step-body"><strong>Reflected XSS</strong><br>The attack is inside a crafted link. When clicked, the code is sent to the server and instantly "reflected" back to the victim's browser to execute.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Type 2</div>
        <div class="step-body"><strong>Stored XSS</strong><br>The attack code is saved permanently in the website's database (like a forum post). Everyone who visits that page gets attacked. This is the most dangerous type.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Type 3</div>
        <div class="step-body"><strong>DOM XSS</strong><br>The attack never touches the server. The code is hidden inside the URL hash and processed entirely by JavaScript running in the victim's browser.</div>
      </div>
      <h3>Lab Setup</h3>
      <div class="step-block">
        <div class="step-num">Setup</div>
        <div class="step-body">Click "Launch DVWA Instance". Log in with Username: <code>admin</code>, Password: <code>password</code>. Click "Create / Reset Database", then go to "DVWA Security" and set it to "Low".</div>
      </div>`,
    questions: [
      { q: "What is the default username for our lab?", a: "admin", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the default password?", a: "password", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What programming language are XSS attacks written in?", a: "JavaScript", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Which JS function opens a confirmation dialog box?", a: "confirm", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "2. DVWA XSS (Reflected) — Practical Attack",
    points: 30,
    html: `<div class="htb-diagram-container"><img src="../../../assets/xss_reflected_nologo_1779433732914.png" alt="DVWA XSS (Reflected) - Practical Attack"></div>
      <h3>Reflected XSS Execution</h3>
      <p>In a Reflected XSS attack, the malicious payload is not stored on the server. Instead, it is part of the request (e.g., a URL parameter) and is immediately echoed (reflected) back by the web application in an HTTP response. Because the browser trusts the domain, it executes the embedded script in the context of the user's session.</p>
      <p>Imagine standing in front of a canyon and shouting a magic word, and the canyon instantly echoes that spell back to hit you in the face! In Reflected XSS, the website is the canyon. You send a malicious piece of magic code to the website (inside a tricky web link), and the website instantly echoes it straight back without cleaning it. The attack only hits the specific person who shouted it (or the victim who was tricked into clicking the sneaky link).</p>
      <h3>Practical Attack Walkthrough</h3>
      <div class="step-block">
        <div class="step-num">Low</div>
        <div class="step-body"><strong>No Filtering</strong><br>Go to "XSS (Reflected)". The server takes your input and pastes it directly. Type <code>&lt;script&gt;alert(1)&lt;/script&gt;</code> and click Submit. A pop-up proves your code executed.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Medium</div>
        <div class="step-body"><strong>Script Tag Blocking</strong><br>Medium blocks the exact word "&lt;script&gt;". Bypass it by using different HTML tags that execute code, like <code>&lt;img src=x onerror=alert(1)&gt;</code> or mixing cases like <code>&lt;ScRiPt&gt;</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">High</div>
        <div class="step-body"><strong>Strict Regex Blocking</strong><br>High uses Regex to block "script" entirely. Avoid the word completely by using event handlers: <code>&lt;svg onload=alert(1)&gt;</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Impossible</div>
        <div class="step-body"><strong>Proper Defense</strong><br>The server uses <code>htmlspecialchars()</code> to convert dangerous characters (like <code>&lt;</code>) into safe text entities (<code>&amp;lt;</code>). The code is displayed harmlessly on screen instead of running.</div>
      </div>`,
    questions: [
      { q: "What type of XSS sends the attack in a URL and the server bounces it back?", a: "Reflected XSS", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What HTML tag runs code when an image fails to load (onerror)?", a: "img", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What PHP function converts dangerous characters into safe text (impossible mode)?", a: "htmlspecialchars", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "3. DVWA XSS (Stored) — The Permanent Attack",
    points: 30,
    html: `<div class="htb-diagram-container"><img src="../../../assets/xss_stored_nologo_1779433750517.png" alt="DVWA XSS (Stored) - The Permanent Attack"></div>
      <h3>Stored XSS Execution</h3>
      <p>Stored (Persistent) XSS is the most critical variant. The malicious payload is permanently saved on the target server (e.g., within a database, message forum, or visitor log). When a victim navigates to the affected page, the server serves the stored payload along with the normal HTML, resulting in silent and automatic execution against every visitor.</p>
      <p>Imagine someone spray-paints a magical trap on a brick wall in the middle of town. The trap is permanently painted there! Every single person who walks past that wall, today, tomorrow, or next year, will accidentally trigger the trap and get hit by the spell! Stored XSS is identical: the hacker types malicious code into a normal comment box, the website saves it forever, and every single person who visits gets attacked instantly without clicking anything!</p>
      <h3>Practical Attack Walkthrough</h3>
      <div class="step-block">
        <div class="step-num">Low</div>
        <div class="step-body"><strong>Persistent Injection</strong><br>Go to "XSS (Stored)". In the Message field, type <code>&lt;script&gt;alert(document.cookie)&lt;/script&gt;</code> and sign the guestbook. The alert will pop up permanently for every visitor.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Medium</div>
        <div class="step-body"><strong>Client-Side Limits</strong><br>The Message box is protected, but the Name field is weak. However, Name has a 10-character limit. Right-click the Name box, choose "Inspect", change <code>maxlength="10"</code> to "100", and inject <code>&lt;img src=x onerror=alert(1)&gt;</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">High</div>
        <div class="step-body"><strong>Strict Regex</strong><br>High blocks the word "script". Use the DevTools maxlength bypass again on the Name field, and inject an alternative tag like <code>&lt;svg/onload=alert(1)&gt;</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Impossible</div>
        <div class="step-body"><strong>Full Defense</strong><br>The server sanitizes both fields using <code>htmlspecialchars()</code> before saving them to the database, treating all input strictly as text.</div>
      </div>`,
    questions: [
      { q: "Does Stored XSS save the malicious code permanently in the database? (yes/no)", a: "yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Which input box in DVWA Stored XSS has a 10-character limit we bypass with DevTools?", a: "Name", hint: "Look for the specific tools mentioned in the lesson." },
      { q: "What JavaScript property reads the victim's session cookies?", a: "document.cookie", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "4. DVWA XSS (DOM) — The Invisible Attack",
    points: 30,
    html: `<div class="htb-diagram-container"><img src="../../../assets/xss_dom_nologo_1779433767352.png" alt="DVWA XSS (DOM) - The Invisible Attack"></div>
      <h3>DOM-Based XSS</h3>
      <p>DOM XSS occurs when a web application contains client-side JavaScript that processes data from an untrusted source (like the URL or window.location) in an unsafe way, usually by writing that data to the Document Object Model (DOM) via dangerous sinks like <code>document.write()</code> or <code>innerHTML</code>. The payload is never sent to the server.</p>
      <p>Imagine a magical mirror that changes how you look based on a sticky note you put on your own forehead. The mirror never talks to anyone else, it only looks at you! DOM XSS is just like this. The attack happens entirely inside your own browser (the mirror). The code is hidden in a special part of the web address that the server never even sees. Because the server never sees the attack, it can't protect you!</p>
      <h3>Practical Attack Walkthrough</h3>
      <div class="step-block">
        <div class="step-num">Low</div>
        <div class="step-body"><strong>Dangerous Sinks</strong><br>Go to "XSS (DOM)". The page uses <code>document.write()</code> to print the language URL parameter. Add your payload to the URL: <code>?default=&lt;script&gt;alert(1)&lt;/script&gt;</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Medium</div>
        <div class="step-body"><strong>Hash Fragment Bypass</strong><br>The server checks the URL and blocks "&lt;script". Bypass this using the URL hash (#): <code>?default=English#&lt;img src=x onerror=alert(1)&gt;</code>. The browser never sends the hash to the server, keeping the payload invisible to backend filters.</div>
      </div>
      <div class="step-block">
        <div class="step-num">High</div>
        <div class="step-body"><strong>Server Whitelists</strong><br>The server only allows "English" or "French" as values. The hash bypass still works perfectly: <code>?default=English#&lt;svg onload=alert(1)&gt;</code> because the server approves "English", and the browser executes the hash.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Impossible</div>
        <div class="step-body"><strong>Safe APIs</strong><br>The application stops using <code>document.write()</code> and instead uses the safe <code>element.textContent</code> API, forcing the browser to render the payload as literal text rather than executable code.</div>
      </div>`,
    questions: [
      { q: "Where does DOM XSS happen entirely — on the server or in the browser?", a: "browser", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What URL symbol (#) hides the attack payload from the server?", a: "#", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Which dangerous DOM property injects HTML and can run code?", a: "innerHTML", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Which safe DOM property treats content as plain text and cannot run code?", a: "textContent", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "5. Bypasses, Tools and Ultimate Defense",
    points: 30,
    html: `<div class="htb-diagram-container"><img src="../../../assets/xss_defense_nologo_1779433783443.png" alt="Bypasses, Tools and Ultimate Defense"></div>
      <h3>Filter Evasion and XSS Mitigation</h3>
      <p>Filter evasion involves utilizing alternate syntaxes, encodings, and edge-case HTML parser behaviors to bypass Web Application Firewalls (WAFs) or input sanitizers. The correct architectural mitigation is Context-Aware Output Encoding and Content Security Policy (CSP), which prevents code execution regardless of input constraints.</p>
      <p>Imagine a teacher who makes a list of "Bad Words" that students are not allowed to say. This is "blacklisting." But kids are clever! If the teacher blocks "mad", the kids say "furious". Attackers do the exact same thing! If a website blocks one type of attack code, attackers will write the exact same code in dozens of different, sneaky ways using different words or symbols to bypass the filter.</p>
      <h3>Bypasses & Defense strategies</h3>
      <div class="step-block">
        <div class="step-num">Tech 1</div>
        <div class="step-body"><strong>Common Bypasses</strong><br>Mixed Case: <code>&lt;ScRiPt&gt;</code>. Alternative Tags: <code>&lt;svg onload=alert(1)&gt;</code>. No Quotes: <code>&lt;img src=x onerror=alert(1)&gt;</code>. URL Encoding: <code>%3Cscript%3E</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Tech 2</div>
        <div class="step-body"><strong>Blacklisting Flaws</strong><br>Maintaining a list of "bad" words to remove is fundamentally flawed. Attackers can always find a new tag or encoding to slip past the filter.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Tech 3</div>
        <div class="step-body"><strong>The Ultimate Defense</strong><br><strong>Output Encoding:</strong> Convert dangerous characters to display text (<code>&lt;</code> to <code>&amp;lt;</code>). <strong>Safe APIs:</strong> Use <code>textContent</code> instead of <code>innerHTML</code>. <strong>CSP:</strong> Enforce a strict Content Security Policy to block unauthorized script execution.</div>
      </div>`,
    questions: [
      { q: "Is blacklisting (blocking specific bad words) an effective XSS defense? (yes/no)", a: "no", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What defense converts dangerous characters like < into safe display text like &lt;? (Output...)", a: "Output Encoding", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What HTTP header instructs the browser to only run scripts from approved sources? (Content Security...)", a: "Content Security Policy", hint: "Refer to the HTTP protocol details." },
      { q: "What is a payload called that combines multiple bypass techniques to evade complex filters?", a: "Polyglot", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  }
];
