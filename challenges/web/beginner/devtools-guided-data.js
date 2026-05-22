const LESSONS = [
  {
    title: "Welcome to the Gauntlet",
    points: 30,
    content: `Welcome to the DevTools Gauntlet — Phase 1: Guided Practice!

This is your first PRACTICAL Docker challenge for Browser Developer Tools. Unlike the theory lessons, here you will exploit real vulnerabilities in a live web application running inside a Docker container.

HOW IT WORKS:
1. Click the "Launch DevTools Guided Lab" button above.
2. A private Docker container will spin up just for you.
3. A new tab will open with your sandbox environment.
4. Complete the three challenges inside the sandbox.
5. Come back here and answer the questions to earn points.

THE THREE CHALLENGES:
  Challenge 01: The Console Trick
    → A disabled button that you must unlock using the Console.

  Challenge 02: The Hidden Element
    → An invisible HTML element containing a flag, hidden with CSS.

  Challenge 03: The Storage Secret
    → A flag silently stored in LocalStorage when the page loaded.

IMPORTANT TIPS:
  • Each challenge has step-by-step instructions built into the sandbox page.
  • Each challenge has a hint button if you get stuck.
  • The sandbox runs entirely in your browser — no server-side hacking needed.
  • Your container is automatically destroyed when you close the tab.

Ready? Launch the lab and let's begin!`,
    questions: [
      { q: "What keyboard shortcut opens the Console in Chrome?", a: "Ctrl+Shift+J" },
      { q: "What CSS property is used to hide elements from view in Challenge 02?", a: "display: none" },
      { q: "What browser storage mechanism is used in Challenge 03?", a: "LocalStorage" },
      { q: "Can front-end 'disabled' attributes be bypassed by the user? (yes/no)", a: "yes" },
      { q: "Are you ready to launch the lab? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "Challenge 01 — The Console Trick",
    points: 40,
    content: `OBJECTIVE: Unlock the disabled button and capture the flag.

BACKGROUND:
Many web applications use the HTML "disabled" attribute to prevent users from clicking buttons. Developers sometimes think this is a security feature — but it's not. The "disabled" attribute only exists in YOUR browser. You can modify it freely.

THE VULNERABILITY:
The button uses: <button id="flagBtn" disabled>Locked</button>
The word "disabled" tells the browser to gray out the button and ignore clicks. But you control the browser!

STEP-BY-STEP WALKTHROUGH:
1. In the sandbox tab, right-click the "Locked" button and select "Inspect".
2. You'll see the HTML: <button id="flagBtn" disabled>
3. Switch to the Console tab (Ctrl+Shift+J in Chrome).
4. Type: document.getElementById('flagBtn').disabled = false
5. Press Enter. The button turns green and active.
6. Click the button to reveal the flag!

ALTERNATIVE METHOD:
In the Inspector, you can also:
  • Double-click the word "disabled" in the HTML tag and delete it.
  • Or right-click the element → Edit as HTML → remove "disabled".

WHY THIS MATTERS:
This demonstrates that ALL client-side restrictions can be bypassed. If a button, form, or input is "disabled" or "readonly" on the front-end, a real attacker can always enable it. True security must be enforced server-side.

After completing this challenge in the sandbox, submit the flag and answer the questions below.`,
    questions: [
      { q: "What is the flag from Challenge 01? (Hint: click the unlocked button)", a: "flag{console_is_powerful}" },
      { q: "What JavaScript command disables/enables an element's disabled property?", a: "document.getElementById('flagBtn').disabled = false" },
      { q: "Where must security restrictions be enforced to be reliable — client-side or server-side?", a: "server-side" },
      { q: "What HTML attribute was used to 'lock' the button?", a: "disabled" }
    ]
  },
  {
    title: "Challenge 02 — The Hidden Element",
    points: 40,
    content: `OBJECTIVE: Find the hidden HTML element and extract the flag.

BACKGROUND:
Developers often hide elements using CSS rather than removing them from the page entirely. This means the data is still in the DOM — it's just invisible. The Inspector lets you see EVERYTHING in the DOM, regardless of visual styling.

THE VULNERABILITY:
The sandbox contains: <div id="hidden-flag-div" style="display:none;">flag{...}</div>
The CSS rule "display: none" makes the element invisible, but it still exists in the page source.

STEP-BY-STEP WALKTHROUGH:
1. In the sandbox tab, open DevTools (F12).
2. Go to the Inspector / Elements tab.
3. Press Ctrl+F to search the DOM.
4. Type "flag" and press Enter.
5. You'll find the hidden div with the flag inside!
6. Copy the flag text.

ALTERNATIVE METHOD (Console):
Type in Console: document.getElementById('hidden-flag-div').textContent
This directly extracts the text content without changing any styling.

BONUS — MAKE IT VISIBLE:
In the Inspector, change "display: none" to "display: block" to see the flag appear on the page.
Or in Console: document.getElementById('hidden-flag-div').style.display = 'block'

After finding the flag, submit it in the sandbox and answer the questions below.`,
    questions: [
      { q: "What is the flag from Challenge 02?", a: "flag{inspector_dom_master}" },
      { q: "What CSS rule was hiding the flag element?", a: "display: none" },
      { q: "What Console command extracts text from a hidden element?", a: "document.getElementById('hidden-flag-div').textContent" },
      { q: "What DevTools shortcut searches the DOM tree?", a: "Ctrl+F" }
    ]
  },
  {
    title: "Challenge 03 — The Storage Secret",
    points: 40,
    content: `OBJECTIVE: Find the flag hidden in the browser's LocalStorage.

BACKGROUND:
Web applications frequently store data in the browser using LocalStorage — a key-value store that persists even after the browser is closed. Developers sometimes store sensitive data here: session tokens, user preferences, feature flags, and sometimes literal secrets.

THE VULNERABILITY:
When the sandbox page loaded, it silently executed:
  localStorage.setItem('secret_flag', 'flag{...}');
This stored a flag in your browser's LocalStorage without displaying it anywhere on the page.

STEP-BY-STEP WALKTHROUGH:
1. In the sandbox tab, open DevTools (F12).
2. Go to the Application tab (Chrome) or Storage tab (Firefox).
3. In the left sidebar, expand "Local Storage".
4. Click on the current domain/URL.
5. Look for a key named "secret_flag" — the value is your flag!

ALTERNATIVE METHOD (Console):
Type: localStorage.getItem('secret_flag')
This directly retrieves the value from LocalStorage.

BONUS — SEE ALL STORAGE:
Type: localStorage   (returns all key-value pairs)
Type: document.cookie   (returns all accessible cookies — there's a bonus hint cookie too!)

After finding the flag, submit it in the sandbox and answer the questions below.`,
    questions: [
      { q: "What is the flag from Challenge 03?", a: "flag{storage_explorer_pro}" },
      { q: "What Console command retrieves a specific LocalStorage value?", a: "localStorage.getItem('secret_flag')" },
      { q: "What DevTools tab shows LocalStorage data?", a: "Application (or Storage)" },
      { q: "Does LocalStorage data persist after the browser is closed? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "Phase 1 Complete — Debrief",
    points: 50,
    content: `Congratulations! You've completed Phase 1: Guided Practice of the DevTools Gauntlet!

SKILLS YOU'VE MASTERED:
   Console: Modifying DOM properties (removing "disabled" attributes).
   Inspector: Searching the DOM for hidden elements and extracting their content.
   Storage: Finding sensitive data in LocalStorage using both the Application tab and Console commands.

KEY TAKEAWAYS:
1. Client-side security is an illusion.
   Disabled buttons, hidden inputs, and front-end validation can ALL be bypassed by the user. Never rely on them for security.

2. The DOM contains everything — visible or not.
   If data is in the HTML source, it's accessible. "display: none" hides from human eyes, not from DevTools.

3. Browser storage is NOT secure.
   LocalStorage, SessionStorage, and cookies are all readable and modifiable by the user. Never store secrets client-side.

4. The Console is your most powerful tool.
   It lets you run arbitrary JavaScript in the page's context — reading variables, calling functions, modifying the DOM, and accessing storage.

WHAT'S NEXT:
Ready for Phase 2? The "DevTools Field Test" is the real challenge — no instructions, no hand-holding. A flag is split across three different locations (Inspector, Network headers, and JavaScript source code), and you must find all three parts independently.

Navigate back to the Challenges page and launch "DevTools Field Test — Phase 2" when you're ready!`,
    questions: [
      { q: "Can 'disabled' attributes on HTML forms prevent a determined attacker? (yes/no)", a: "no" },
      { q: "What DevTools panel lets you run arbitrary JavaScript in the page's context?", a: "Console" },
      { q: "Is hiding an element with CSS the same as removing it from the page? (yes/no)", a: "no" },
      { q: "Should sensitive data like API keys be stored in LocalStorage? (yes/no)", a: "no" },
      { q: "Are you ready for Phase 2: The Field Test? (yes/no)", a: "yes" }
    ]
  }
];
