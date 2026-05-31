const LESSONS = [
  {
    title: "Inspector (Elements) — Reading the DOM",
    points: 10,
    content: `<div class="htb-diagram-container"><img src="../../../assets/devtools_inspector_1779432792544.png" alt="Inspector (Elements) Diagram"></div>Imagine you are watching a magical play in a theater. From your seat in the audience, you only see what the director wants you to see: the actors, the painted backgrounds, and the bright lights. But what if you had a magic pair of X-ray glasses that let you see exactly what was happening backstage? You could see the actors changing costumes, the ropes holding up the scenery, and even secret notes the director left on the walls! In the computer world, a website is like that play, and the "Inspector" tool is your pair of magic X-ray glasses. The Inspector lets you see the raw, behind-the-scenes building blocks (called HTML and CSS) of the webpage. This is extremely important for hackers because developers are often lazy or forgetful. They might leave secret passwords, hidden buttons, or private notes "backstage" in the code, thinking that normal users will never see them. With the Inspector, you can peek behind the curtain, change the scenery yourself, and find the hidden treasure!

HOW TO OPEN IT:
Right-click any element on a page and select "Inspect", or press F12 and click the "Elements" / "Inspector" tab.

WHERE TO FIND A FLAG:
  • Hidden HTML comments: &lt;!-- flag{...} --&gt;
  • Hidden elements: &lt;div style="display:none;"&gt;flag{...}&lt;/div&gt;
  • Invisible text: &lt;p style="color: white; background: white;"&gt;flag{...}&lt;/p&gt;
  • Disabled buttons: &lt;button disabled&gt;Submit&lt;/button&gt;
  • Input fields with type="hidden": &lt;input type="hidden" name="token" value="flag{...}"&gt;

EXPLOITATION TECHNIQUE — BYPASSING CLIENT-SIDE RESTRICTIONS:
Client-side restrictions are NOT security controls. They only exist for user convenience.

Example: A "Submit" button is grayed out with the 'disabled' attribute.
  1. Open Inspector (F12).
  2. Find the &lt;button disabled&gt; tag.
  3. Double-click the word "disabled" and delete it.
  4. The button is now clickable — submit the form.

This works because the restriction only exists in the browser. The server never enforced it.

SEARCH THE DOM:
Press Ctrl+F inside the Inspector panel to search the entire DOM tree for keywords like "flag", "hidden", "secret", "password", or "admin".

PRO TIP:
You can also edit text content, change styles, add or remove attributes, and even delete entire elements directly in the Inspector. None of these changes are permanent — they only affect your local browser.`,
    questions: [
      { q: "What does the Inspector panel show you?", a: "The raw HTML and CSS of the live page" },
      { q: "What HTML comment syntax might hide a flag in the DOM?", a: "&lt;!-- --&gt;" },
      { q: "How do you bypass a 'disabled' button using DevTools?", a: "Delete the disabled attribute in the Inspector" },
      { q: "What CSS property is commonly used to hide an element from view?", a: "display: none" },
      { q: "What keyboard shortcut opens DevTools in most browsers?", a: "F12" }
    ]
  },
  {
    title: "Console — Running JavaScript Live",
    points: 10,
    content: `<div class="htb-diagram-container"><img src="../../../assets/devtools_console_1779432832051.png" alt="Console Diagram"></div>The Console is a place to run JavaScript commands and see logged messages from the website's scripts. It is your interactive command line inside the browser.

WHY IT MATTERS FOR CTF:
Developers sometimes leave debugging information in console.log() statements that aren't visible on the main page. Variables, flags, API keys, and even passwords can be leaked this way.

HOW TO OPEN IT:
Press F12 and click the "Console" tab. Or press Ctrl+Shift+J (Chrome) / Ctrl+Shift+K (Firefox).

WHERE TO FIND A FLAG:
  • Check for messages already printed by the page's scripts.
  • Type window.flag, document.flag, or secret_variable and press Enter.
  • Type localStorage to see all locally stored data.
  • Type document.cookie to see all accessible cookies.
  • Type Object.keys(window) to see all global variables defined by the page.

EXPLOITATION TECHNIQUE — OVERRIDING FUNCTIONS:
If a page has a JavaScript validation function that blocks your access, you can redefine it.

Example: A page calls validateUser() before showing a secret area, and it always returns false.
  1. Open Console.
  2. Type: validateUser = function() { return true; };
  3. Click the button — the page now thinks you're authorized.

DOM MANIPULATION FROM CONSOLE:
  document.getElementById('hidden-flag').style.display = 'block';
  → Reveals a hidden element.

  document.querySelectorAll('[type="hidden"]');
  → Lists all hidden input fields and their values.

ALERT/PROMPT EXPLOITATION:
  alert(document.cookie)  → Pops up all accessible cookies.
  alert(document.domain)  → Confirms which domain you're on (useful for XSS testing).

PRO TIP — CONSOLE ERRORS:
Error messages in the Console can reveal internal file paths, server endpoints, technology stack, and API structures. Always read the red error messages — they are a goldmine for reconnaissance.`,
    questions: [
      { q: "What JavaScript function do developers use to print messages to the Console?", a: "console.log()" },
      { q: "What command reveals all cookies accessible to JavaScript?", a: "document.cookie" },
      { q: "How can you override a JavaScript validation function in the Console?", a: "Redefine it with a new function that returns true" },
      { q: "What command lists all hidden input fields on the page?", a: "document.querySelectorAll('[type=\"hidden\"]')" },
      { q: "What type of Console messages can reveal internal server paths and API endpoints?", a: "Error messages" }
    ]
  },
  {
    title: "Debugger (Sources) — Pausing & Modifying Code",
    points: 10,
    content: `<div class="htb-diagram-container"><img src="../../../assets/devtools_sources_1779432847368.png" alt="Sources Diagram"></div>The Debugger (called "Sources" in Chrome) shows all the JavaScript files loaded by the website. It lets you read, search, pause, and modify running code.

WHY IT MATTERS FOR CTF:
Developers sometimes hardcode credentials, API keys, flags, or business logic directly in JavaScript files. The Debugger lets you examine this code line-by-line and even alter it during execution.

HOW TO OPEN IT:
Press F12 and click the "Sources" / "Debugger" tab. The left panel shows a file tree of all loaded resources.

WHERE TO FIND A FLAG:
  • Search through .js files for keywords: "flag", "password", "key", "secret", "admin", "token".
  • Look for Base64-encoded strings: atob("ZmxhZ3toaWRkZW5faW5fYmFzZTY0fQ==")
  • Check for hardcoded API endpoints that might return sensitive data.

BREAKPOINTS — THE MOST POWERFUL TOOL:
A breakpoint pauses code execution at a specific line. While paused, you can:
  1. View all variable values in the Scope panel.
  2. Change variable values in the Console (e.g., isAdmin = true).
  3. Step through execution one line at a time.
  4. Skip over functions or step into them.

EXPLOITATION TECHNIQUE — BREAKPOINT INJECTION:
  1. Find the login validation function in the Sources panel.
  2. Set a breakpoint on the line that checks: if (password === correctPassword)
  3. Submit any login attempt.
  4. Code pauses → In the Console, type: correctPassword
  5. The actual password is revealed in the scope.
  OR: Type password = correctPassword, then resume execution to bypass the check.

CONDITIONAL BREAKPOINTS:
Right-click a line number → "Add conditional breakpoint" → Enter a condition like: username === "admin"
The code only pauses when the condition is true.

WATCH EXPRESSIONS:
Add variables to the "Watch" panel to monitor their values as you step through code. Useful for tracking how data flows through the application.

PRO TIP — PRETTY PRINT:
Minified JavaScript (all on one line) is hard to read. Click the { } icon at the bottom of the Sources panel to "Pretty Print" the code into readable, formatted JavaScript.`,
    questions: [
      { q: "What is a breakpoint?", a: "A marker that pauses code execution at a specific line" },
      { q: "What panel shows all variable values when code is paused at a breakpoint?", a: "Scope panel" },
      { q: "What technique reveals a hardcoded password by pausing at the comparison line?", a: "Breakpoint Injection" },
      { q: "What button ( { } ) formats minified JavaScript into readable code?", a: "Pretty Print" },
      { q: "What JavaScript function decodes Base64-encoded strings?", a: "atob()" }
    ]
  },
  {
    title: "Network — Intercepting Data in Transit",
    points: 10,
    content: `<div class="htb-diagram-container"><img src="../../../assets/devtools_network_1779432863966.png" alt="Network Diagram"></div>The Network panel records every HTTP request the browser makes and receives — HTML pages, images, scripts, stylesheets, API calls, WebSocket messages, and more.

WHY IT MATTERS FOR CTF:
The Network tab shows you what the browser and server are actually saying to each other, not just what's displayed on the screen. Flags are often hidden in API responses, HTTP headers, or redirected URLs that the page never renders.

HOW TO OPEN IT:
Press F12 and click the "Network" tab. Refresh the page (F5) to start recording requests.

WHERE TO FIND A FLAG:
  • Response Body: Click on any request → "Response" tab. Check API calls (XHR/Fetch) for JSON data containing flags that the UI doesn't display.
  • Response Headers: A flag might be in a custom header: X-Flag: flag{...}
  • Redirects: A 302 redirect's Location header might contain a flag URL.
  • Request Headers: Custom headers like Authorization: Bearer &lt;token&gt; reveal authentication tokens.
  • Query Parameters: GET requests with ?token=flag{...} in the URL.

FILTER BY TYPE:
The Network panel has filter buttons: All, Fetch/XHR, JS, CSS, Img, Doc, WS, etc.
Click "Fetch/XHR" to isolate API calls — the most likely place to find hidden data.

EXPLOITATION TECHNIQUE — REPLAYING & MODIFYING REQUESTS:
  1. Find an interesting API call (e.g., /api/user?id=1).
  2. Right-click → "Copy as cURL" → paste into terminal.
  3. Modify the command: change id=1 to id=2 to access another user's data (IDOR attack).
  4. Or right-click → "Edit and Resend" (Firefox) to modify parameters directly.

TIMING ANALYSIS:
The "Timing" tab shows how long each phase takes (DNS, TLS, Waiting, Download). Unusual delays might indicate:
  • Server-side processing (e.g., time-based SQL injection: SLEEP(5) causes 5-second delay).
  • Rate limiting or WAF (Web Application Firewall) blocking.

WEBSOCKETS:
Click on WebSocket connections (WS filter) to see real-time bidirectional messages. Chat applications, live dashboards, and game servers often leak data through WebSocket frames.

PRO TIP — PRESERVE LOG:
Check "Preserve log" to keep recordings even when the page navigates or redirects. Without this, requests disappear after each page load, and you might miss a flag hidden in a redirect chain.`,
    questions: [
      { q: "What Network tab shows the raw data returned by the server?", a: "Response" },
      { q: "What filter isolates API calls in the Network panel?", a: "Fetch/XHR" },
      { q: "What custom HTTP header might contain a hidden flag?", a: "X-Flag (or any custom header)" },
      { q: "What technique copies a request as a terminal command for modification?", a: "Copy as cURL" },
      { q: "What checkbox prevents request logs from clearing during page redirects?", a: "Preserve log" }
    ]
  },
  {
    title: "Storage (Application) — Cookies, LocalStorage & Sessions",
    points: 10,
    content: `<div class="htb-diagram-container"><img src="../../../assets/devtools_storage_1779432888344.png" alt="Storage Diagram"></div>The Storage panel (called "Application" in Chrome) displays all data stored locally in the browser — Cookies, LocalStorage, SessionStorage, IndexedDB, and Cache Storage.

WHY IT MATTERS FOR CTF:
Developers often store sensitive data client-side: session tokens, user roles, feature flags, and sometimes literal CTF flags. If you can read or modify this data, you can escalate privileges or reveal hidden information.

HOW TO OPEN IT:
Press F12 → "Application" (Chrome) or "Storage" (Firefox). Expand the sidebar to see each storage type.

COOKIES:
Small key-value pairs sent automatically with every HTTP request.
  • Look for: session, token, user, role, admin, flag, auth.
  • Check values: Base64-encoded strings? Decode them with atob() in the Console.
  • Missing security flags: No HttpOnly? JavaScript can access it. No Secure? Sent over HTTP.

EXPLOITATION — COOKIE MANIPULATION:
  1. Find a cookie like: role=guest
  2. Double-click the value and change it to: role=admin
  3. Refresh the page.
  4. If the server trusts the cookie without verifying, you've escalated your privileges.

LOCALSTORAGE:
Persistent key-value storage accessible via JavaScript. Data persists even after the browser is closed.
  • View in Console: JSON.parse(localStorage.getItem('userData'))
  • Modify: localStorage.setItem('isAdmin', 'true')
  • Flags might be stored here during multi-step challenges.

SESSIONSTORAGE:
Identical to LocalStorage but cleared when the tab is closed.
  • Check it separately — some challenges store flags in SessionStorage thinking it's "more secure".

INDEXEDDB:
A more advanced client-side database for structured data. Less common in CTFs but worth checking for complex web apps.

JWT (JSON WEB TOKENS) IN STORAGE:
JWTs are often stored in LocalStorage or cookies. They look like: eyJhbGciOi... (three Base64 sections separated by dots).
  1. Copy the JWT.
  2. Paste it into jwt.io to decode the payload.
  3. Check for role, admin, or flag fields.
  4. If the algorithm is "none", you can forge tokens without a secret key.

PRO TIP — CLEAR STORAGE:
Sometimes you need to reset a challenge. Right-click → "Clear" or use the "Clear site data" button in Chrome's Application tab to wipe all stored data and start fresh.`,
    questions: [
      { q: "What Storage type sends data automatically with every HTTP request?", a: "Cookies" },
      { q: "What JavaScript command reads a value from LocalStorage?", a: "localStorage.getItem()" },
      { q: "What happens if you change a cookie value from 'role=guest' to 'role=admin'?", a: "You may escalate privileges if the server trusts the cookie" },
      { q: "What is the difference between LocalStorage and SessionStorage?", a: "SessionStorage is cleared when the tab is closed" },
      { q: "What website is commonly used to decode and inspect JWT tokens?", a: "jwt.io" }
    ]
  },
  {
    title: "Style Editor — Uncovering Visual Secrets",
    points: 10,
    content: `<div class="htb-diagram-container"><img src="../../../assets/devtools_styles_1779432908788.png" alt="Style Editor Diagram"></div>The Style Editor lets you view and modify all CSS stylesheets loaded by the page. In the context of CTFs, it's your tool for revealing elements that have been visually hidden.

WHY IT MATTERS FOR CTF:
A common CTF trick is to hide flags in plain sight — making text invisible through CSS tricks. The flag is literally on the page, but styled so humans can't see it. The Style Editor lets you strip away these disguises.

HOW TO OPEN IT:
  • Chrome: Elements panel → Styles sidebar (or Computed tab).
  • Firefox: F12 → Style Editor tab (shows full CSS files).

COMMON HIDING TECHNIQUES AND HOW TO REVEAL THEM:

1. display: none;
   The element exists in the DOM but is not rendered at all.
   FIX: Change to display: block; or display: inline;

2. visibility: hidden;
   The element takes up space but is invisible.
   FIX: Change to visibility: visible;

3. opacity: 0;
   The element is fully transparent.
   FIX: Change to opacity: 1;

4. color matching background:
   Text is the same color as the background (e.g., white on white).
   FIX: Change color to something visible, like red or #00ff00.

5. font-size: 0px;
   Text exists but has zero size.
   FIX: Change to font-size: 16px;

6. position: absolute; left: -9999px;
   Element is pushed way off-screen.
   FIX: Change to position: static; or left: 0;

7. overflow: hidden; height: 0;
   Content is clipped to zero height.
   FIX: Change height to auto and overflow to visible.

NUCLEAR OPTION — REVEAL EVERYTHING:
Paste this in the Console to override all hiding:
  document.querySelectorAll('*').forEach(el => {
    el.style.display = 'block';
    el.style.visibility = 'visible';
    el.style.opacity = '1';
    el.style.color = '#00ff00';
    el.style.fontSize = '16px';
    el.style.position = 'static';
    el.style.overflow = 'visible';
    el.style.height = 'auto';
  });

COMPUTED STYLES:
The "Computed" tab in Chrome shows the final, resolved CSS values after all stylesheets and overrides. Use it to check the actual rendered properties of any element.

PRO TIP — HIGHLIGHT ALL ELEMENTS:
Paste this in the Console to outline every element, making invisible containers obvious:
  document.querySelectorAll('*').forEach(el => { el.style.outline = '1px solid red'; });`,
    questions: [
      { q: "What CSS property makes an element exist in the DOM but not render at all?", a: "display: none" },
      { q: "What is the difference between visibility: hidden and display: none?", a: "visibility: hidden takes up space but is invisible, display: none removes it from layout" },
      { q: "How can text be hidden by matching colors?", a: "Set the text color the same as the background color" },
      { q: "What CSS technique pushes an element off-screen to hide it?", a: "position: absolute with a large negative left value" },
      { q: "What Console command outlines every element on the page?", a: "querySelectorAll('*').forEach(el => { el.style.outline = '1px solid red'; })" }
    ]
  },
  {
    title: "Memory & Performance — Advanced Analysis",
    points: 10,
    content: `<div class="htb-diagram-container"><img src="../../../assets/devtools_memory_1779432928449.png" alt="Memory Diagram"></div>The Memory and Performance panels are advanced DevTools features. While less commonly used in beginner CTFs, they provide powerful capabilities for deep analysis.

 MEMORY PANEL 

WHAT IT IS:
The Memory panel captures snapshots of everything stored in JavaScript memory — every variable, object, string, function, and data structure currently alive in the page.

WHY IT MATTERS FOR CTF:
Some challenges load sensitive data (keys, flags, passwords) into memory temporarily, then delete the visible references. The data might still exist in memory as a "detached" object until garbage collection runs.

HEAP SNAPSHOTS:
  1. Open Memory panel → Select "Heap snapshot" → Click "Take snapshot".
  2. Use the search/filter to look for strings containing "flag", "key", "secret".
  3. Even if a variable was deleted with: delete window.secret; the string value might still be in the heap.

ALLOCATION TIMELINE:
Records memory allocation over time. Useful for seeing when and where data is created during page interactions (e.g., when clicking a button triggers an API call that briefly stores a flag).

 PERFORMANCE PANEL 

WHAT IT IS:
The Performance panel records everything the browser does over a time period — JavaScript execution, rendering, painting, network requests, and user events.

WHY IT MATTERS FOR CTF:
Performance data can be used in "side-channel" attacks — inferring information based on how long operations take.

TIMING SIDE-CHANNEL EXAMPLE:
A password comparison function checks character-by-character:
  if (input[0] !== correct[0]) return false;  // fails fast for wrong first char
  if (input[1] !== correct[1]) return false;  // only reached if first char is correct
  ...

If the first character is wrong, the function returns in 0.1ms.
If the first character is correct, it takes 0.2ms (it checks the second character too).

By measuring response times in the Performance panel, an attacker can brute-force one character at a time:
  'a' → 0.1ms 
  'b' → 0.1ms 
  'f' → 0.2ms  → First character found!

This is a Timing Attack, a type of Side-Channel Attack.

DEFENSE:
Use constant-time comparison functions that always check every character, regardless of where the mismatch occurs.

PRO TIP — PERFORMANCE MARKS:
Some CTF challenges use performance.mark() and performance.measure() to track operations. Check the Performance panel's "User Timing" section for developer-added markers that might hint at hidden functionality.`,
    questions: [
      { q: "What Memory tool captures all objects currently in JavaScript memory?", a: "Heap snapshot" },
      { q: "What type of attack infers secrets by measuring how long operations take?", a: "Timing Attack (Side-Channel Attack)" },
      { q: "Why might a deleted variable's value still appear in a heap snapshot?", a: "The string may remain in memory until garbage collection runs" },
      { q: "What kind of comparison function defends against timing attacks?", a: "Constant-time comparison" },
      { q: "What Performance panel section shows developer-added timing markers?", a: "User Timing" }
    ]
  },
  {
    title: "Accessibility — The Hidden Text Layer",
    points: 10,
    content: `<div class="htb-diagram-container"><img src="../../../assets/devtools_accessibility_1779432955428.png" alt="Accessibility Diagram"></div>The Accessibility panel reveals the semantic structure of a page as interpreted by assistive technologies like screen readers. It exposes text and labels that may be invisible to sighted users.

WHY IT MATTERS FOR CTF:
A clever CTF trick is to hide a flag in the "accessibility layer" — text that screen readers can read aloud but that sighted users cannot see. This text exists in the DOM but is visually invisible.

HOW TO OPEN IT:
Press F12 → "Accessibility" tab (or Inspect an element → check the Accessibility pane in the sidebar).

SCREEN-READER-ONLY TEXT:
The classic CSS pattern for visually hiding text while keeping it accessible:
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

An element with this class is invisible on screen but read aloud by screen readers. A flag might be:
  &lt;span class="sr-only"&gt;flag{...}&lt;/span&gt;

HOW TO FIND IT:
  1. Open the Accessibility panel and browse the Accessibility Tree.
  2. Or search the DOM (Ctrl+F in Inspector) for "sr-only", "visually-hidden", or "screen-reader".
  3. Or use Console: document.querySelectorAll('.sr-only, .visually-hidden')

ARIA ATTRIBUTES:
Accessible Rich Internet Applications (ARIA) attributes add semantic meaning to elements:
  • aria-label="flag{...}" — A label not shown visually.
  • aria-describedby="hidden-desc" — Points to an element with the description.
  • aria-hidden="true" — Hides an element FROM screen readers (the opposite trick).

EXPLOITATION TECHNIQUE:
  1. Search the DOM for all aria-label attributes:
     document.querySelectorAll('[aria-label]').forEach(el => console.log(el.getAttribute('aria-label')));
  2. Check if any contain flags, passwords, or hints.

ALT TEXT ON IMAGES:
Flags can be hidden in the alt attribute of images:
  &lt;img src="logo.png" alt="flag{...}"&gt;
The alt text is read by screen readers and shown in the Accessibility panel, but not displayed visually (unless the image fails to load).

PRO TIP:
Use the Accessibility Tree view instead of the DOM tree — it strips away visual clutter and shows only the semantic content, making hidden text easier to spot.`,
    questions: [
      { q: "What CSS class name is commonly used to hide text visually while keeping it accessible to screen readers?", a: "sr-only (or visually-hidden)" },
      { q: "What ARIA attribute provides a text label that is not displayed visually?", a: "aria-label" },
      { q: "What DevTools feature shows the page structure as assistive technologies interpret it?", a: "Accessibility Tree" },
      { q: "Where can flags be hidden on image elements?", a: "In the alt attribute" },
      { q: "What does aria-hidden='true' do?", a: "Hides an element from screen readers" }
    ]
  },
  {
    title: "Global Search & Practical Workflow",
    points: 10,
    content: `<div class="htb-diagram-container"><img src="../../../assets/devtools_search_1779432972713.png" alt="Global Search Diagram"></div>Now that you know each DevTools panel, let's put it all together with practical workflows and the most powerful search technique available.

 GLOBAL SEARCH: Ctrl+Shift+F 

THE MOST IMPORTANT SHORTCUT:
While DevTools is open, press Ctrl+Shift+F (or Cmd+Opt+F on Mac) to search EVERY SINGLE FILE loaded by the website — all HTML, CSS, JavaScript, JSON, and text resources at once.

Search for:
  "flag"        — The obvious CTF keyword.
  "secret"      — Hidden variables, endpoints, or messages.
  "password"    — Hardcoded credentials.
  "admin"       — Admin panels, roles, or bypass paths.
  "token"       — API keys, session tokens, JWTs.
  "hidden"      — Hidden HTML elements or CSS classes.
  "base64"      — Encoded data worth decoding.
  "eval("       — Dangerous function that might execute hidden code.
  "console.log" — Developer debugging messages left behind.

 THE CTF DEVTOOLS CHECKLIST 

Follow this systematic checklist on every web CTF challenge:

STEP 1: VIEW SOURCE
  • Right-click → View Page Source (Ctrl+U).
  • Look for HTML comments &lt;!-- --&gt; and hidden inputs.

STEP 2: INSPECT ELEMENTS
  • Open Inspector (F12).
  • Search DOM with Ctrl+F for "flag", "hidden", "secret".
  • Check for disabled buttons, hidden divs, invisible text.

STEP 3: CHECK CONSOLE
  • Read all logged messages and errors.
  • Try: window.flag, document.cookie, localStorage.

STEP 4: SEARCH ALL FILES
  • Ctrl+Shift+F → Search "flag", "password", "secret" across all loaded resources.

STEP 5: INSPECT NETWORK
  • Refresh the page with the Network tab open.
  • Check Response bodies and Headers of all requests.
  • Filter by Fetch/XHR for API calls.

STEP 6: CHECK STORAGE
  • Application tab → Cookies, LocalStorage, SessionStorage.
  • Look for Base64 strings, JWTs, and role/admin values.

STEP 7: EXAMINE JAVASCRIPT
  • Sources tab → Browse .js files for hardcoded data.
  • Set breakpoints on validation functions.

STEP 8: REVEAL HIDDEN ELEMENTS
  • Use the "nuclear option" CSS override from the Style Editor lesson.
  • Check Accessibility Tree for screen-reader-only text.

 PRACTICAL EXAMPLE: DOM EXPLOITATION 

Imagine a page has a "Secret" button that only works if you are "Authorized," but there is no login page.

  1. Open Console.
  2. Type: validateUser = function() { return true; };
  3. Click the button.
  4. The site thinks you are authorized because you redefined the logic in the browser's memory, and it displays the flag!

This works because all client-side validation can be bypassed — security must always be enforced server-side.

PRO TIP:
Bookmark this checklist. The difference between a beginner and an experienced CTF player is not talent — it's having a systematic approach that ensures you never miss a flag.`,
    questions: [
      { q: "What keyboard shortcut searches all loaded files at once in DevTools?", a: "Ctrl+Shift+F" },
      { q: "What is the first step in the CTF DevTools Checklist?", a: "View Source (Ctrl+U)" },
      { q: "Why can all client-side validation be bypassed?", a: "Because it runs in the browser which the user controls" },
      { q: "What should you search for first when using Global Search on a CTF challenge?", a: "flag" },
      { q: "Where must security always be enforced to be reliable?", a: "Server-side" }
    ]
  }
];
