const LESSONS = [
  {
    title: "Mission Briefing",
    points: 30,
    content: `<div class="htb-diagram-container"><img src="../../../assets/devtools_fieldtest_welcome.png" alt="Mission Briefing"></div>
Welcome to the DevTools Field Test — Phase 2: The Independent Challenge!

Imagine you are a master spy taking your final exam. You have been dropped into a secret facility with no map, no guide, and no instructions. The only tools you have are your magic X-ray glasses (the Inspector), your hidden microphone (the Network panel), and your code-breaking notebook (the Sources panel). Your mission is to find three pieces of a torn-up secret message hidden somewhere in this digital building. You must rely entirely on the spy skills you've practiced to hunt down each piece and put them back together. Are you ready to prove you are a true DevTools Master?

HOW IT WORKS:
1. Click the "Launch Field Test" button above.
2. A Docker container will spin up with a fake corporate website: "SecureCorp™ Employee Portal".
3. A SINGLE FLAG is hidden across the site, split into THREE parts.
4. Each part is hidden using a different DevTools technique.
5. Find all three parts, combine them, and submit the complete flag.

THE THREE PARTS:
  Part 1 → Hidden somewhere the Inspector can find.
  Part 2 → Hidden somewhere the Network panel can reveal.
  Part 3 → Hidden somewhere the Debugger/Sources can expose.

FLAG FORMAT:
The complete flag follows this format: flag_part1{_______________}
You must combine all three parts in order.

TIPS:
  • Start by searching the DOM with Ctrl+F in the Inspector.
  • Check ALL network requests — especially failed ones.
  • Browse through loaded JavaScript files in the Sources panel.
  • Use Ctrl+Shift+F (Global Search) as a last resort.

This is a test of everything you've learned. Good luck!`,
    questions: [
      { q: "How many parts is the flag split into?", a: "3" },
      { q: "What DevTools shortcut searches across ALL loaded files at once?", a: "Ctrl+Shift+F" },
      { q: "What three DevTools panels should you check for the flag parts?", a: "Inspector, Network, Debugger" },
      { q: "Are you ready to begin the field test? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "Part 1 — The Inspector Hunt",
    points: 50,
    content: `<div class="htb-diagram-container"><img src="../../../assets/devtools_fieldtest_inspector.png" alt="Inspector Hunt"></div>
OBJECTIVE: Find Part 1 of the flag using the Inspector.

WHAT TO LOOK FOR:
Part 1 is hidden somewhere in the HTML source of the SecureCorp™ page. It could be in:
  • An HTML comment: <!-- -->
  • A hidden element: <div style="display:none">
  • A data attribute: data-flag="..."
  • An invisible element pushed off-screen

YOUR APPROACH:
1. Open DevTools (F12) → Inspector/Elements tab.
2. Press Ctrl+F and search for "flag".
3. Check HTML comments — they won't show on the page but appear in source.
4. Alternatively, right-click the page → "View Page Source" (Ctrl+U) and search.

HINT:
HTML comments look like: <!-- text here -->
They are completely invisible on the rendered page but fully visible in the DOM Inspector and page source.

Once you find Part 1, write it down and move to the next lesson.`,
    questions: [
      { q: "What is Part 1 of the flag? (Found in the Inspector/HTML source)", a: "flag_part1{dev_tools_" },
      { q: "Where specifically was Part 1 hidden?", a: "HTML comment" },
      { q: "What keyboard shortcut opens 'View Page Source' to see raw HTML?", a: "Ctrl+U" }
    ]
  },
  {
    title: "Part 2 — The Network Detective",
    points: 50,
    content: `<div class="htb-diagram-container"><img src="../../../assets/devtools_fieldtest_network.png" alt="Network Detective"></div>
OBJECTIVE: Find Part 2 of the flag using the Network panel.

WHAT TO LOOK FOR:
Part 2 is hidden in the HTTP response headers of one of the network requests. It could be in:
  • A custom HTTP header (e.g., X-Flag-Part2: ...)
  • A failed request's response headers
  • A redirect's Location header

YOUR APPROACH:
1. Open DevTools (F12) → Network tab.
2. Refresh the page (F5) to capture all requests.
3. Click on EACH request and check the "Headers" tab.
4. Look specifically at "Response Headers" for any custom headers.
5. Pay attention to failed requests (404s, 500s) — they can still have headers!

HINT:
The SecureCorp™ page tries to load a banner image that FAILS (404 error). Check the response headers of that failed image request — there's something interesting there.

Look for headers starting with "X-" — these are custom headers that developers add.

Once you find Part 2, write it down and move to the next lesson.`,
    questions: [
      { q: "What is Part 2 of the flag? (Found in Network response headers)", a: "power_" },
      { q: "What specific HTTP header contained Part 2?", a: "X-Flag-Part2" },
      { q: "What HTTP status code did the failed image request return?", a: "404" },
      { q: "What does the 'X-' prefix in HTTP headers typically indicate?", a: "Custom (non-standard) header" }
    ]
  },
  {
    title: "Part 3 — The Source Code Spy",
    points: 50,
    content: `<div class="htb-diagram-container"><img src="../../../assets/devtools_fieldtest_sources.png" alt="Source Code Spy"></div>
OBJECTIVE: Find Part 3 of the flag using the Debugger/Sources panel.

WHAT TO LOOK FOR:
Part 3 is hidden inside a JavaScript file loaded by the page. It could be:
  • A hardcoded variable: const secret = "...";
  • A function that returns the value
  • An encoded string (Base64, etc.)

YOUR APPROACH:
1. Open DevTools (F12) → Sources/Debugger tab.
2. In the left panel, browse the loaded JavaScript files.
3. Open each .js file and search (Ctrl+F) for keywords: "flag", "final", "part", "secret".
4. Or use Global Search (Ctrl+Shift+F) to search all files at once.

HINT:
Look at the file named "app.js" — it contains what looks like normal application code, but there's one variable that doesn't quite fit...

Search for "finalPiece" or "final" in the JS files.

Once you find Part 3, you have all the pieces!`,
    questions: [
      { q: "What is Part 3 of the flag? (Found in JavaScript source)", a: "user}" },
      { q: "What JavaScript variable name held Part 3?", a: "finalPiece" },
      { q: "What file was Part 3 hidden in?", a: "app.js" }
    ]
  },
  {
    title: "Mission Complete — Submit the Flag",
    points: 70,
    content: `<div class="htb-diagram-container"><img src="../../../assets/devtools_fieldtest_debrief.png" alt="Mission Complete"></div>
OBJECTIVE: Combine all three parts and submit the complete flag.

THE THREE PARTS YOU FOUND:
  Part 1 (Inspector):      flag_part1{...}
  Part 2 (Network):        ...
  Part 3 (Sources):        ...}

THE COMPLETE FLAG:
Combine them in order: Part 1 + Part 2 + Part 3

Submit the complete flag both in the Docker sandbox (for the victory screen) and in the questions below.

DEBRIEF — WHAT YOU'VE PROVEN:
   Inspector:  You can find data hidden in HTML comments and the DOM.
   Network:    You can discover information in HTTP response headers, even from failed requests.
   Sources:    You can search through JavaScript source files for hardcoded secrets.
   Workflow:   You can systematically check multiple DevTools panels to find scattered information.

REAL-WORLD APPLICATION:
In real penetration testing and bug bounty hunting, sensitive information is frequently leaked through:
  • HTML comments containing internal notes, credentials, or API endpoints
  • Custom HTTP headers exposing server versions, debug info, or internal IPs
  • JavaScript files containing API keys, hardcoded passwords, or business logic flaws

The skills you've practiced here are DIRECTLY applicable to real web security work.

Congratulations — you are now a certified DevTools operator! `,
    questions: [
      { q: "What is the COMPLETE flag? (All three parts combined)", a: "flag_part1{dev_tools_power_user}" },
      { q: "How many different DevTools panels did you need to find the complete flag?", a: "3" },
      { q: "In real penetration testing, are HTML comments a common source of information leaks? (yes/no)", a: "yes" },
      { q: "Can HTTP response headers contain sensitive information even on 404 error pages? (yes/no)", a: "yes" },
      { q: "Should developers ever hardcode secrets in client-side JavaScript? (yes/no)", a: "no" }
    ]
  }
];
