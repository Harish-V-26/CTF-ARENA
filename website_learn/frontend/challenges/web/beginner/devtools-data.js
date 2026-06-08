const LESSONS = [
  {
    title: "1. Inspector (Elements) — Reading the DOM",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/devtools_inspector_1779432792544.png" alt="Inspector (Elements) Diagram"></div>
      <h3>The DOM Inspector</h3>
      <p>The DOM (Document Object Model) Inspector is a fundamental DevTools feature that displays the hierarchical structure of a web page as the browser currently renders it. Unlike "View Source", which shows the initial HTML delivered by the server, the Inspector shows the live DOM, including modifications made dynamically by JavaScript. Attackers use it to discover hidden inputs, analyze client-side security controls, and manipulate element states.</p>
      <p>Imagine you are watching a magical play in a theater. From your seat in the audience, you only see what the director wants you to see. But what if you had a magic pair of X-ray glasses that let you see exactly what was happening backstage? You could see the actors changing costumes, the ropes holding up the scenery, and even secret notes the director left on the walls! In the computer world, a website is like that play, and the "Inspector" tool is your pair of magic X-ray glasses. The Inspector lets you see the raw, behind-the-scenes building blocks of the webpage.</p>
      <h3>Inspection Techniques</h3>
      <div class="step-block">
        <div class="step-num">Technique 1</div>
        <div class="step-body"><strong>Finding Hidden Elements</strong><br>Developers often leave hidden HTML comments <code>&lt;!-- secret --&gt;</code>, hidden elements <code>style="display:none;"</code>, or hidden form inputs <code>type="hidden"</code> in the DOM.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Technique 2</div>
        <div class="step-body"><strong>Bypassing Client-Side Restrictions</strong><br>If a "Submit" button is grayed out with the <code>disabled</code> attribute, you can double-click the attribute in the Inspector and delete it. The button instantly becomes clickable, proving that client-side restrictions are NOT security controls.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Technique 3</div>
        <div class="step-body"><strong>Searching the DOM</strong><br>Press Ctrl+F inside the Inspector panel to search the entire DOM tree for keywords like "flag", "hidden", "secret", or "admin".</div>
      </div>`,
    questions: [
      { q: "What does the Inspector panel show you?", a: "The raw HTML and CSS of the live page", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What HTML comment syntax might hide a flag in the DOM?", a: "&lt;!-- --&gt;", hint: "Check the command reference blocks." },
      { q: "How do you bypass a 'disabled' button using DevTools?", a: "Delete the disabled attribute in the Inspector", hint: "Look for the specific tools mentioned in the lesson." },
      { q: "What CSS property is commonly used to hide an element from view?", a: "display: none", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What keyboard shortcut opens DevTools in most browsers?", a: "F12", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "2. Console — Running JavaScript Live",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/devtools_console_1779432832051.png" alt="Console Diagram"></div>
      <h3>The JavaScript Console</h3>
      <p>The Developer Console provides a Read-Eval-Print Loop (REPL) environment directly connected to the active browser window's JavaScript context. It captures diagnostic output and allows real-time execution of arbitrary JavaScript. Attackers use the console to override validation functions, execute Cross-Site Scripting (XSS) payloads, and programmatically query the DOM and storage APIs.</p>
      <p>Imagine you have a magical walkie-talkie that lets you give orders directly to the actors on stage. The Console is your interactive command line inside the browser. If a page has a JavaScript rule that says "Only the manager can click this button," you can use your walkie-talkie to redefine the rule and say, "Actually, everyone is the manager now!" Developers sometimes leave debugging information or secret passwords in these walkie-talkie channels, so it's always worth listening in.</p>
      <h3>Console Exploitation</h3>
      <div class="step-block">
        <div class="step-num">Exploit 1</div>
        <div class="step-body"><strong>Overriding Functions</strong><br>If a page calls <code>validateUser()</code> and returns false, you can type <code>validateUser = function() { return true; };</code> in the Console. The page now thinks you're authorized.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Exploit 2</div>
        <div class="step-body"><strong>Data Extraction</strong><br>Typing <code>document.cookie</code> or <code>localStorage</code> reveals sensitive tokens. Using <code>document.querySelectorAll('[type="hidden"]')</code> instantly lists all hidden inputs on the page.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Exploit 3</div>
        <div class="step-body"><strong>Analyzing Errors</strong><br>Error messages in the Console can reveal internal file paths, server endpoints, technology stacks, and API structures. Always read the red error messages.</div>
      </div>`,
    questions: [
      { q: "What JavaScript function do developers use to print messages to the Console?", a: "console.log()", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What command reveals all cookies accessible to JavaScript?", a: "document.cookie", hint: "Check the command reference blocks." },
      { q: "How can you override a JavaScript validation function in the Console?", a: "Redefine it with a new function that returns true", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What command lists all hidden input fields on the page?", a: "document.querySelectorAll('[type=\"hidden\"]')", hint: "Check the command reference blocks." },
      { q: "What type of Console messages can reveal internal server paths and API endpoints?", a: "Error messages", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "3. Debugger (Sources) — Pausing Code",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/devtools_sources_1779432847368.png" alt="Sources Diagram"></div>
      <h3>The Debugger</h3>
      <p>The Sources (or Debugger) panel allows developers to step through JavaScript execution chronologically. By setting breakpoints, execution pauses, enabling inspection of local scope variables, call stacks, and the ability to mutate states in memory before execution resumes. It is a critical tool for reverse-engineering obfuscated client-side logic.</p>
      <p>Imagine you have a magic remote control that can pause time. While time is paused, you can walk around, look at what everyone is holding, swap items out of their hands, and then press play again. The Debugger lets you pause the website's code exactly when it's making a decision (like checking your password). While paused, you can read the "correct" password right out of the computer's memory, or just change the answer to "True" so you win automatically!</p>
      <h3>Debugging Features</h3>
      <div class="step-block">
        <div class="step-num">Feature 1</div>
        <div class="step-body"><strong>Breakpoints</strong><br>A breakpoint pauses code execution at a specific line. While paused, you can view all variable values in the Scope panel or change them in the Console (e.g., <code>isAdmin = true</code>).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Feature 2</div>
        <div class="step-body"><strong>De-obfuscation</strong><br>Minified JavaScript (all on one line) is hard to read. Clicking the <code>{ }</code> icon "Pretty Prints" the code into readable, formatted JavaScript.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Feature 3</div>
        <div class="step-body"><strong>Conditional Breakpoints</strong><br>Right-click a line number to add a condition (like <code>username === "admin"</code>). The code only pauses when the condition is met, filtering out noise.</div>
      </div>`,
    questions: [
      { q: "What is a breakpoint?", a: "A marker that pauses code execution at a specific line", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What panel shows all variable values when code is paused at a breakpoint?", a: "Scope panel", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What technique reveals a hardcoded password by pausing at the comparison line?", a: "Breakpoint Injection", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What button ( { } ) formats minified JavaScript into readable code?", a: "Pretty Print", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What JavaScript function decodes Base64-encoded strings?", a: "atob()", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "4. Network — Intercepting Data",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/devtools_network_1779432863966.png" alt="Network Diagram"></div>
      <h3>The Network Panel</h3>
      <p>The Network panel is a built-in HTTP proxy interceptor. It records all asynchronous XHR/Fetch requests, WebSockets, and static asset downloads. It exposes the raw HTTP request/response headers and payloads. Security analysts use it to uncover hidden REST API endpoints, intercept authorization tokens, and analyze side-channel vulnerabilities.</p>
      <p>Imagine you are a detective wiretapping a phone line. When you look at a website, you only see the final picture. But the Network panel lets you listen to every single whispered conversation between your browser and the server. You can hear the browser ask for images, passwords, and secret data. Often, the server will whisper back a secret flag or a piece of data that the website decides not to show on the screen.</p>
      <h3>Network Analysis</h3>
      <div class="step-block">
        <div class="step-num">Analysis 1</div>
        <div class="step-body"><strong>Fetch/XHR Filtering</strong><br>Filter by "Fetch/XHR" to isolate API calls. Check the "Response" tab for JSON data containing flags or excessive data exposure.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Analysis 2</div>
        <div class="step-body"><strong>Header Inspection</strong><br>Examine Request Headers for <code>Authorization: Bearer &lt;token&gt;</code> and Response Headers for custom flags like <code>X-Flag: flag{...}</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Analysis 3</div>
        <div class="step-body"><strong>Copy as cURL</strong><br>Right-click an interesting API call, select "Copy as cURL," and paste it into your terminal to easily modify parameters and test for IDOR vulnerabilities.</div>
      </div>`,
    questions: [
      { q: "What Network tab shows the raw data returned by the server?", a: "Response", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What filter isolates API calls in the Network panel?", a: "Fetch/XHR", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What custom HTTP header might contain a hidden flag?", a: "X-Flag (or any custom header)", hint: "Check the command reference blocks." },
      { q: "What technique copies a request as a terminal command for modification?", a: "Copy as cURL", hint: "Check the command reference blocks." },
      { q: "What checkbox prevents request logs from clearing during page redirects?", a: "Preserve log", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "5. Storage — Cookies & Sessions",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/devtools_storage_1779432888344.png" alt="Storage Diagram"></div>
      <h3>Browser Storage</h3>
      <p>Modern browsers implement several local storage APIs (Cookies, LocalStorage, SessionStorage, IndexedDB) to maintain state in stateless HTTP environments. Because all these mechanisms are fundamentally readable and writable by the client, storing sensitive authorization logic or unencrypted PII client-side is a critical vulnerability.</p>
      <p>Imagine your browser has a tiny backpack. When you visit a website, the website drops little notes into the backpack so it remembers who you are the next time you visit. These notes are called Cookies or LocalStorage. By opening the Storage panel, you can unzip the backpack, read all the notes, and even erase the note that says "Guest" and replace it with a note that says "Admin"!</p>
      <h3>Storage Mechanisms</h3>
      <div class="step-block">
        <div class="step-num">Mechanism 1</div>
        <div class="step-body"><strong>Cookies</strong><br>Small key-value pairs sent automatically with every HTTP request. Changing a cookie from <code>role=guest</code> to <code>role=admin</code> can escalate privileges.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Mechanism 2</div>
        <div class="step-body"><strong>LocalStorage</strong><br>Persistent key-value storage. Data persists even after the browser is closed. Flags are frequently hidden here during CTF challenges.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Mechanism 3</div>
        <div class="step-body"><strong>JWT Inspection</strong><br>JSON Web Tokens (JWTs) are often found in storage. They look like <code>eyJhb...</code>. Copy them to <code>jwt.io</code> to decode the payload.</div>
      </div>`,
    questions: [
      { q: "What Storage type sends data automatically with every HTTP request?", a: "Cookies", hint: "Refer to the HTTP protocol details." },
      { q: "What JavaScript command reads a value from LocalStorage?", a: "localStorage.getItem()", hint: "Check the command reference blocks." },
      { q: "What happens if you change a cookie value from 'role=guest' to 'role=admin'?", a: "You may escalate privileges if the server trusts the cookie", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the difference between LocalStorage and SessionStorage?", a: "SessionStorage is cleared when the tab is closed", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What website is commonly used to decode and inspect JWT tokens?", a: "jwt.io", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "6. Global Search & Practical Workflow",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/devtools_search_1779432972713.png" alt="Global Search Diagram"></div>
      <h3>Global Search & Methodology</h3>
      <p>DevTools includes a Global Search feature capable of executing full-text string matching across all loaded resources simultaneously. A systematic methodology—iterating through source inspection, DOM analysis, console interactions, and network interception—is required for efficient vulnerability discovery.</p>
      <p>Imagine trying to find a specific needle in ten different haystacks. Doing it by hand would take forever. The Global Search tool is like a giant magnet that instantly pulls the exact needle you want out of all the haystacks at once. By pressing Ctrl+Shift+F, you can search every single file, script, and stylesheet on the entire website simultaneously for the word "flag".</p>
      <h3>The Master Workflow</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Global Search (Ctrl+Shift+F)</strong><br>Search across all loaded resources for keywords like "flag", "secret", "password", "admin", "token", or "hidden".</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Inspect the Network & DOM</strong><br>Check HTML source for comments, filter the Network tab for API responses, and review the Application tab for stored tokens.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Console Manipulation</strong><br>If a button is locked because of client-side validation, redefine the validation function in the Console. Client-side logic is always bypassable.</div>
      </div>`,
    questions: [
      { q: "What keyboard shortcut searches all loaded files at once in DevTools?", a: "Ctrl+Shift+F", hint: "Check the command reference blocks." },
      { q: "What is the first step in the CTF DevTools Checklist?", a: "View Source (Ctrl+U)", hint: "Look for the specific tools mentioned in the lesson." },
      { q: "Why can all client-side validation be bypassed?", a: "Because it runs in the browser which the user controls", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What should you search for first when using Global Search on a CTF challenge?", a: "flag", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Where must security always be enforced to be reliable?", a: "Server-side", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  }
];
