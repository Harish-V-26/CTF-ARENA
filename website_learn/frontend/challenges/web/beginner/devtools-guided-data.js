const LESSONS = [
  {
    title: "Welcome to the Gauntlet",
    points: 30,
    html: `<div class="htb-diagram-container"><img src="../../../assets/devtools_welcome_diagram.png" alt="Welcome to the Gauntlet"></div>
      <h3>Phase 1: Guided Practice</h3>
      <p>The Browser Developer Tools (DevTools) is a suite of web developer tools built directly into modern web browsers (Chrome, Firefox, Edge). DevTools allow developers (and security analysts) to inspect the rendered HTML DOM, monitor network activity, manipulate client-side JavaScript, and interact with local browser storage. Mastery of DevTools is the foundational skill required for all web exploitation.</p>
      <p>Imagine you are a spy recruit who just got their very first set of secret gadgets! You've read the instruction manual, but reading about gadgets isn't the same as actually using them. So, your spy academy has built a special training obstacle course called the "Gauntlet". In this safe, indoor course, you get to put on your magic X-ray glasses (the Inspector) and use your secret decoder ring (the Console) to overcome real challenges. You will practice unlocking locked doors without the key, finding invisible objects, and digging up buried secrets!</p>
      <h3>The Three Challenges</h3>
      <div class="step-block">
        <div class="step-num">Challenge 1</div>
        <div class="step-body"><strong>The Console Trick</strong><br>A disabled button that you must unlock using the JavaScript Console.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Challenge 2</div>
        <div class="step-body"><strong>The Hidden Element</strong><br>An invisible HTML element containing a flag, hidden with CSS rules.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Challenge 3</div>
        <div class="step-body"><strong>The Storage Secret</strong><br>A flag silently stored in the browser's LocalStorage when the page loaded.</div>
      </div>`,
    questions: [
      { q: "What keyboard shortcut opens the Console in Chrome?", a: "Ctrl+Shift+J", hint: "Check the command reference blocks." },
      { q: "What CSS property is used to hide elements from view in Challenge 02?", a: "display: none", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What browser storage mechanism is used in Challenge 03?", a: "LocalStorage", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Can front-end 'disabled' attributes be bypassed by the user? (yes/no)", a: "yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Are you ready to launch the lab? (yes/no)", a: "yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "Challenge 01 — The Console Trick",
    points: 40,
    html: `<div class="htb-diagram-container"><img src="../../../assets/devtools_console_diagram.png" alt="Challenge 01 — The Console Trick"></div>
      <h3>Bypassing Client-Side Controls</h3>
      <p>Client-side controls, such as the HTML <code>disabled</code> attribute, are UX (User Experience) features, not security boundaries. Because the DOM is rendered locally on the client's machine, the user has ultimate authority over its state. Attackers can use the JavaScript Console to interact directly with the DOM API, altering element properties dynamically to bypass UI restrictions.</p>
      <p>Many web applications use the HTML "disabled" attribute to prevent users from clicking buttons. Developers sometimes think this is a security feature — but it's not. The "disabled" attribute only exists in YOUR browser. You can modify it freely.</p>
      <h3>Step-by-Step Walkthrough</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Inspect the Element</strong><br>In the sandbox tab, right-click the "Locked" button and select "Inspect". You'll see the HTML: <code>&lt;button id="flagBtn" disabled&gt;</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Use the Console</strong><br>Switch to the Console tab (Ctrl+Shift+J in Chrome). Type: <code>document.getElementById('flagBtn').disabled = false</code> and press Enter.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Capture the Flag</strong><br>The button turns green and active. Click the button to reveal the flag! This demonstrates that ALL client-side restrictions can be bypassed. True security must be enforced server-side.</div>
      </div>`,
    questions: [
      { q: "What is the flag from Challenge 01? (Hint: click the unlocked button)", a: "flag{console_is_powerful}", hint: "Check the command reference blocks." },
      { q: "What JavaScript command disables/enables an element's disabled property?", a: "document.getElementById('flagBtn').disabled = false", hint: "Check the command reference blocks." },
      { q: "Where must security restrictions be enforced to be reliable — client-side or server-side?", a: "server-side", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What HTML attribute was used to 'lock' the button?", a: "disabled", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "Challenge 02 — The Hidden Element",
    points: 40,
    html: `<div class="htb-diagram-container"><img src="../../../assets/devtools_hidden_diagram.png" alt="Challenge 02 — The Hidden Element"></div>
      <h3>DOM Inspection</h3>
      <p>The DOM (Document Object Model) contains all elements delivered by the server, regardless of their visual rendering state. Developers often use CSS rules like <code>display: none</code> or <code>visibility: hidden</code> to hide elements from the viewport. However, these elements remain fully accessible and searchable via the DevTools Inspector panel.</p>
      <p>Developers often hide elements using CSS rather than removing them from the page entirely. This means the data is still in the DOM — it's just invisible. The Inspector lets you see EVERYTHING in the DOM, regardless of visual styling.</p>
      <h3>Step-by-Step Walkthrough</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Search the DOM</strong><br>In the sandbox tab, open DevTools (F12) and go to the Inspector / Elements tab. Press Ctrl+F to search the DOM.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Find the Target</strong><br>Type "flag" and press Enter. You'll find the hidden div: <code>&lt;div id="hidden-flag-div" style="display:none;"&gt;flag{...}&lt;/div&gt;</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Extract the Data</strong><br>Copy the flag text directly from the HTML source. Alternatively, in the console, you can run: <code>document.getElementById('hidden-flag-div').textContent</code> to extract it programmatically.</div>
      </div>`,
    questions: [
      { q: "What is the flag from Challenge 02?", a: "flag{inspector_dom_master}", hint: "Check the command reference blocks." },
      { q: "What CSS rule was hiding the flag element?", a: "display: none", hint: "Check the command reference blocks." },
      { q: "What Console command extracts text from a hidden element?", a: "document.getElementById('hidden-flag-div').textContent", hint: "Check the command reference blocks." },
      { q: "What DevTools shortcut searches the DOM tree?", a: "Ctrl+F", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "Challenge 03 — The Storage Secret",
    points: 40,
    html: `<div class="htb-diagram-container"><img src="../../../assets/devtools_storage_diagram.png" alt="Challenge 03 — The Storage Secret"></div>
      <h3>Local Storage Extraction</h3>
      <p>LocalStorage is a web storage API that allows JavaScript sites and apps to store key-value pairs in a web browser with no expiration date. Because it is completely accessible via client-side JavaScript, it is insecure for storing sensitive data. The DevTools Application (or Storage) tab provides a GUI to inspect, modify, and delete these entries.</p>
      <p>Web applications frequently store data in the browser using LocalStorage. Developers sometimes mistakenly store sensitive data here: session tokens, user preferences, feature flags, and sometimes literal secrets. When the sandbox page loaded, it silently executed a script that stored a flag in your browser's LocalStorage without displaying it anywhere on the page.</p>
      <h3>Step-by-Step Walkthrough</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Access the Storage Panel</strong><br>In the sandbox tab, open DevTools (F12). Go to the Application tab (Chrome) or Storage tab (Firefox).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Inspect LocalStorage</strong><br>In the left sidebar, expand "Local Storage". Click on the current domain/URL.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Extract the Secret</strong><br>Look for a key named "secret_flag" — the value is your flag! Alternatively, use the Console: <code>localStorage.getItem('secret_flag')</code>.</div>
      </div>`,
    questions: [
      { q: "What is the flag from Challenge 03?", a: "flag{storage_explorer_pro}", hint: "Check the command reference blocks." },
      { q: "What Console command retrieves a specific LocalStorage value?", a: "localStorage.getItem('secret_flag')", hint: "Check the command reference blocks." },
      { q: "What DevTools tab shows LocalStorage data?", a: "Application (or Storage)", hint: "Look for the specific tools mentioned in the lesson." },
      { q: "Does LocalStorage data persist after the browser is closed? (yes/no)", a: "yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "Phase 1 Complete — Debrief",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/devtools_debrief_diagram.png" alt="Phase 1 Complete — Debrief"></div>
      <h3>Debrief & Key Takeaways</h3>
      <p>Client-side security is an oxymoron. Any logic, restriction, or data sent to the client's browser is fundamentally under the client's control. Secure architecture dictates that all authorization checks, input validation, and sensitive data protection must occur exclusively on the server backend.</p>
      <p>Congratulations! You've completed Phase 1: Guided Practice of the DevTools Gauntlet! You've mastered using the Console to modify DOM properties, the Inspector to search for hidden elements, and the Storage panel to find sensitive data.</p>
      <h3>Core Principles</h3>
      <div class="step-block">
        <div class="step-num">Principle 1</div>
        <div class="step-body"><strong>Client-Side Security is an Illusion</strong><br>Disabled buttons, hidden inputs, and front-end validation can ALL be bypassed by the user. Never rely on them for security.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Principle 2</div>
        <div class="step-body"><strong>The DOM Contains Everything</strong><br>If data is in the HTML source, it's accessible. "display: none" hides from human eyes, not from DevTools.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Principle 3</div>
        <div class="step-body"><strong>Browser Storage is Not Secure</strong><br>LocalStorage, SessionStorage, and cookies are all readable and modifiable by the user. Never store secrets client-side.</div>
      </div>`,
    questions: [
      { q: "Can 'disabled' attributes on HTML forms prevent a determined attacker? (yes/no)", a: "no", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What DevTools panel lets you run arbitrary JavaScript in the page's context?", a: "Console", hint: "Look for the specific tools mentioned in the lesson." },
      { q: "Is hiding an element with CSS the same as removing it from the page? (yes/no)", a: "no", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Should sensitive data like API keys be stored in LocalStorage? (yes/no)", a: "no", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Are you ready for Phase 2: The Field Test? (yes/no)", a: "yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  }
];
