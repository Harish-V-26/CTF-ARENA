const LESSONS = [
  {
    title: "Mission Briefing",
    points: 30,
    html: `<div class="htb-diagram-container"><img src="../../../assets/devtools_fieldtest_welcome.png" alt="Mission Briefing"></div>
      <h3>Phase 2: The Independent Challenge</h3>
      <p>In Phase 1, you learned how to use individual DevTools panels under guided instruction. In Phase 2, you must apply a systematic methodology—combining DOM inspection, network analysis, and source code review—to discover vulnerabilities autonomously in an unguided environment.</p>
      <p>Imagine you are a master spy taking your final exam. You have been dropped into a secret facility with no map, no guide, and no instructions. The only tools you have are your magic X-ray glasses (the Inspector), your hidden microphone (the Network panel), and your code-breaking notebook (the Sources panel). Your mission is to find three pieces of a torn-up secret message hidden somewhere in this digital building. You must rely entirely on the spy skills you've practiced to hunt down each piece and put them back together.</p>
      <h3>The Challenge Structure</h3>
      <div class="step-block">
        <div class="step-num">Part 1</div>
        <div class="step-body"><strong>Inspector Hunt</strong><br>Find the first flag piece hidden somewhere the Inspector can find.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Part 2</div>
        <div class="step-body"><strong>Network Detective</strong><br>Find the second flag piece hidden somewhere the Network panel can reveal.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Part 3</div>
        <div class="step-body"><strong>Source Code Spy</strong><br>Find the third flag piece hidden somewhere the Debugger/Sources can expose.</div>
      </div>`,
    questions: [
      { q: "How many parts is the flag split into?", a: "3", hint: "Check the command reference blocks." },
      { q: "What DevTools shortcut searches across ALL loaded files at once?", a: "Ctrl+Shift+F", hint: "Check the command reference blocks." },
      { q: "What three DevTools panels should you check for the flag parts?", a: "Inspector, Network, Debugger", hint: "Check the command reference blocks." },
      { q: "Are you ready to begin the field test? (yes/no)", a: "yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "Part 1 — The Inspector Hunt",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/devtools_fieldtest_inspector.png" alt="Inspector Hunt"></div>
      <h3>DOM Analysis</h3>
      <p>Web developers frequently leave comments or extraneous data attributes in their HTML templates during development, forgetting to remove them in production. The DOM Inspector makes these artifacts immediately visible, regardless of whether they are rendered by the browser.</p>
      <p>Part 1 is hidden somewhere in the HTML source of the SecureCorp™ page. It could be in an HTML comment, a hidden element, a data attribute, or an invisible element pushed off-screen. HTML comments look like <code>&lt;!-- text here --&gt;</code>. They are completely invisible on the rendered page but fully visible in the DOM Inspector and page source.</p>
      <h3>Hunting Strategy</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Open Inspector</strong><br>Open DevTools (F12) → Inspector/Elements tab.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Search DOM</strong><br>Press Ctrl+F and search for "flag".</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Check Source</strong><br>Alternatively, right-click the page → "View Page Source" (Ctrl+U) and search there. Once you find Part 1, write it down!</div>
      </div>`,
    questions: [
      { q: "What is Part 1 of the flag? (Found in the Inspector/HTML source)", a: "flag_part1{dev_tools_", hint: "Check the command reference blocks." },
      { q: "Where specifically was Part 1 hidden?", a: "HTML comment", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What keyboard shortcut opens 'View Page Source' to see raw HTML?", a: "Ctrl+U", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "Part 2 — The Network Detective",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/devtools_fieldtest_network.png" alt="Network Detective"></div>
      <h3>HTTP Header Inspection</h3>
      <p>HTTP responses contain metadata called headers. Custom headers (often prefixed with <code>X-</code>) are frequently used by developers to pass debugging information or internal state to the client. Crucially, even failed requests (like 404 Not Found or 500 Internal Server Error) return HTTP headers, making them a viable vector for information disclosure.</p>
      <p>Part 2 is hidden in the HTTP response headers of one of the network requests. It could be in a custom HTTP header (e.g., <code>X-Flag-Part2: ...</code>), a failed request's response headers, or a redirect's Location header. The SecureCorp™ page tries to load a banner image that FAILS (404 error). Check the response headers of that failed image request — there's something interesting there.</p>
      <h3>Hunting Strategy</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Open Network Panel</strong><br>Open DevTools (F12) → Network tab.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Capture Requests</strong><br>Refresh the page (F5) to capture all requests.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Inspect Headers</strong><br>Click on EACH request and check the "Headers" tab. Look specifically at "Response Headers" for any custom headers starting with "X-".</div>
      </div>`,
    questions: [
      { q: "What is Part 2 of the flag? (Found in Network response headers)", a: "power_", hint: "Check the command reference blocks." },
      { q: "What specific HTTP header contained Part 2?", a: "X-Flag-Part2", hint: "Refer to the HTTP protocol details." },
      { q: "What HTTP status code did the failed image request return?", a: "404", hint: "Refer to the HTTP protocol details." },
      { q: "What does the 'X-' prefix in HTTP headers typically indicate?", a: "Custom (non-standard) header", hint: "Refer to the HTTP protocol details." }
    ]
  },
  {
    title: "Part 3 — The Source Code Spy",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/devtools_fieldtest_sources.png" alt="Source Code Spy"></div>
      <h3>JavaScript Source Analysis</h3>
      <p>Because JavaScript executes client-side, all business logic, variable declarations, and constants defined in those scripts are transmitted to the browser in plaintext. Hardcoding sensitive values (like API keys or flags) inside JavaScript files is a fundamental architectural flaw.</p>
      <p>Part 3 is hidden inside a JavaScript file loaded by the page. It could be a hardcoded variable, a function that returns the value, or an encoded string (like Base64). Look at the file named "app.js" — it contains what looks like normal application code, but there's one variable that doesn't quite fit...</p>
      <h3>Hunting Strategy</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Open Sources</strong><br>Open DevTools (F12) → Sources/Debugger tab.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Browse Files</strong><br>In the left panel, browse the loaded JavaScript files.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Search Code</strong><br>Open each <code>.js</code> file and search (Ctrl+F) for keywords like "flag", "final", "part", or "secret". Or use Global Search (Ctrl+Shift+F) to search all files at once.</div>
      </div>`,
    questions: [
      { q: "What is Part 3 of the flag? (Found in JavaScript source)", a: "user}", hint: "Check the command reference blocks." },
      { q: "What JavaScript variable name held Part 3?", a: "finalPiece", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What file was Part 3 hidden in?", a: "app.js", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "Mission Complete — Submit the Flag",
    points: 70,
    html: `<div class="htb-diagram-container"><img src="../../../assets/devtools_fieldtest_debrief.png" alt="Mission Complete"></div>
      <h3>Debrief & Synthesis</h3>
      <p>You have successfully applied a multi-disciplinary approach to client-side enumeration. In real-world penetration testing and bug bounty hunting, critical vulnerabilities and sensitive information leaks are frequently discovered exactly this way: hidden in DOM comments, custom HTTP headers, and client-side JavaScript assets.</p>
      <p>You have proven your mastery! You can find data hidden in HTML comments and the DOM. You can discover information in HTTP response headers, even from failed requests. You can search through JavaScript source files for hardcoded secrets. You can systematically check multiple DevTools panels to find scattered information.</p>
      <h3>Final Actions</h3>
      <div class="step-block">
        <div class="step-num">Action 1</div>
        <div class="step-body"><strong>Compile the Flag</strong><br>Combine the pieces you found in order: Part 1 + Part 2 + Part 3.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Action 2</div>
        <div class="step-body"><strong>Submit in Sandbox</strong><br>Submit the complete flag in the Docker sandbox to reach the victory screen.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Action 3</div>
        <div class="step-body"><strong>Claim Points</strong><br>Submit the complete flag in the questions below to finish the lab!</div>
      </div>`,
    questions: [
      { q: "What is the COMPLETE flag? (All three parts combined)", a: "flag_part1{dev_tools_power_user}", hint: "Check the command reference blocks." },
      { q: "How many different DevTools panels did you need to find the complete flag?", a: "3", hint: "Check the command reference blocks." },
      { q: "In real penetration testing, are HTML comments a common source of information leaks? (yes/no)", a: "yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Can HTTP response headers contain sensitive information even on 404 error pages? (yes/no)", a: "yes", hint: "Refer to the HTTP protocol details." },
      { q: "Should developers ever hardcode secrets in client-side JavaScript? (yes/no)", a: "no", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  }
];
