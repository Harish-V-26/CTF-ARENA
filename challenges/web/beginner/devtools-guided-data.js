const LESSONS = [
  {
    title: "1. Welcome to the Gauntlet",
    points: 30,
    content: `THE TRAINING GROUND
Welcome to the DevTools Gauntlet! This is your very first practical mission where you get to spin up a live target container and hack it. In the previous lessons, we learned the theory behind how developer tools work. Now, it's time to put on your detective gear, launch the sandbox, and solve three challenges. When you click the launch button above, the server will build a private Docker website just for you, and open it in a new browser tab.

THE THREE CHALLENGES
Inside the sandbox, you will face three tasks. Challenge 1 is "The Console Trick," where you must unlock a grayed-out button that refuses to be clicked. Challenge 2 is "The Hidden Element," where you must find a secret flag that is painted invisible using CSS rules. Challenge 3 is "The Storage Secret," where a flag is silently hidden inside the browser's LocalStorage vault when the page loads.

THE HINT BUTTONS
Don't worry about getting lost! Each challenge inside the sandbox has step-by-step instructions and hint buttons to guide you. The entire sandbox runs safely inside your browser, so you don't need to write any complicated server scripts. When you are done exploring and finding the flags, come back to this page and answer the questions below to submit your flags and earn your points!`,
    questions: [
      { q: "What keyboard shortcut opens the Console in Chrome?", a: "Ctrl+Shift+J" },
      { q: "What CSS property is used to hide elements from view in Challenge 02?", a: "display: none" },
      { q: "What browser storage mechanism is used in Challenge 03?", a: "LocalStorage" },
      { q: "Can front-end 'disabled' attributes be bypassed by the user? (yes/no)", a: "yes" },
      { q: "Are you ready to launch the lab? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "2. Challenge 01 — The Console Trick",
    points: 40,
    content: `THE DISABLED BUTTON
In many websites, when a form isn't filled out correctly or you don't have permission to click something, developers use a rule called the "disabled" attribute. This makes the button gray and locks it so it doesn't respond when you click it. Developers often think this is a safe way to block users. But they forget that the button is running inside YOUR browser, on YOUR computer, which means you can edit it however you like!

HOW TO UNLOCK IT
To unlock the button, right-click it in the sandbox and select "Inspect" to open the Inspector tree. You will see the HTML tag: "<button id='flagBtn' disabled>Locked</button>". To bypass this with the Console walkie-talkie, click the Console tab, type "document.getElementById('flagBtn').disabled = false", and press Enter. The browser instantly executes your command, removes the disabled rule, and turns the button active! Click the button, and the flag will pop onto your screen.

THE LESSON LEARNED
This challenge shows why developers must never trust front-end restrictions for security. If a user can edit the code in their browser, they can enable hidden buttons, write in read-only input boxes, and submit forms they shouldn't be allowed to touch. If you want a button to be truly secure, the server must verify the user's permissions when the form is submitted, rather than relying on a gray button to stop them!`,
    questions: [
      { q: "What is the flag from Challenge 01? (Hint: click the unlocked button)", a: "flag{console_is_powerful}" },
      { q: "What JavaScript command disables/enables an element's disabled property?", a: "document.getElementById('flagBtn').disabled = false" },
      { q: "Where must security restrictions be enforced to be reliable — client-side or server-side?", a: "server-side" },
      { q: "What HTML attribute was used to 'lock' the button?", a: "disabled" }
    ]
  },
  {
    title: "3. Challenge 02 — The Hidden Element",
    points: 40,
    content: `THE INVISIBLE BOX
Sometimes developers want to hide elements on a page, like a secret coupon code or a hidden menu, and they use a CSS style called "display: none". This rule tells the browser: "Don't draw this box on the screen, keep it completely invisible." But the box still exists in the website's HTML blueprint! Because the blueprint is sent to your browser, you can read it, edit it, and find the secret text without ever rendering it on the screen.

THE BLUUPRINT SEARCH
To find the hidden flag, open the Elements/Inspector panel. Click inside the HTML tree and press Ctrl+F to open the search bar. Type "flag" and press Enter. The Inspector will jump straight to the hidden tag: "<div id='hidden-flag-div' style='display:none;'>flag{...}</div>". You can read the flag text directly from the blueprint! Alternatively, you can double-click the style "display: none", change it to "display: block", and watch the secret box instantly paint itself onto the page.

THE LESSON LEARNED
This challenge teaches you that "security by obscurity" (trying to keep secrets safe just by hiding them from view) does not work. If data is sent to the client's browser, it is accessible, no matter what CSS rules you use to cover it up. If you don't want a user to read a secret flag, the server should never include it in the HTML code in the first place!`,
    questions: [
      { q: "What is the flag from Challenge 02?", a: "flag{inspector_dom_master}" },
      { q: "What CSS rule was hiding the flag element?", a: "display: none" },
      { q: "What Console command extracts text from a hidden element?", a: "document.getElementById('hidden-flag-div').textContent" },
      { q: "What DevTools shortcut searches the DOM tree?", a: "Ctrl+F" }
    ]
  },
  {
    title: "4. Challenge 03 — The Storage Secret",
    points: 40,
    content: `THE PERSISTENT STORAGE
Websites have a hard time remembering things because browsers have goldfish memory. To solve this, browsers give websites a small filing cabinet called "LocalStorage." When a website wants to save a setting, like a dark mode preference or your username, it writes it down on a card and slides it into this cabinet. The cabinet persists, meaning the data stays there even if you close the tab, close the browser, or turn off your computer!

PEEKING IN THE CABINET
When the sandbox page loaded, it silently executed a command that stored a secret key inside your cabinet: "localStorage.setItem('secret_flag', 'flag{...}')". Because the website didn't print this on the screen, you'd never know it was there. But you can check the cabinet! Open your DevTools, click the "Application" or "Storage" tab, expand the "Local Storage" folder, and click the website's URL. You will see a table with keys and values, and the secret flag is listed right there!

THE LESSON LEARNED
LocalStorage is a convenient place for developers to save user preferences, but it is completely unencrypted and readable by anyone who opens DevTools. It can also be stolen by hackers using malicious scripts (XSS). Therefore, developers must never store sensitive keys, session tokens, or private user data inside LocalStorage. If data needs to be kept secure, it should be stored on the server's database instead!`,
    questions: [
      { q: "What is the flag from Challenge 03?", a: "flag{storage_explorer_pro}" },
      { q: "What Console command retrieves a specific LocalStorage value?", a: "localStorage.getItem('secret_flag')" },
      { q: "What DevTools tab shows LocalStorage data?", a: "Application (or Storage)" },
      { q: "Does LocalStorage data persist after the browser is closed? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "5. Phase 1 Complete — Debrief",
    points: 50,
    content: `THE DECTECTIVE'S SUMMARY
Congratulations! You have completed Phase 1: Guided Practice. You have proven that you can unlock disabled buttons using the Console, find invisible elements in the Inspector DOM tree, and retrieve hidden variables from LocalStorage. These three skills form the core of web client-side analysis.

THE GOLDEN RULES
Let's review the main lessons: Rule 1: Front-end security is an illusion. Any restriction that runs in the browser can be modified by the user. Rule 2: The DOM blueprint contains everything. If a secret is written in the HTML, it is visible. Rule 3: Browser storage is public. Anyone with access to the computer can open DevTools and read the LocalStorage.

THE NEXT STEP
Now that you have completed the guided challenges, you are ready for Phase 2: The Independent Field Test! In the next phase, there are no instructions, and the flag is split into three parts hidden in different panels. You will need to check the Inspector, check the Network headers of a failed request, and search through JavaScript files to find all the pieces. Navigate back to the main Challenges page and start Phase 2 when you're ready!`,
    questions: [
      { q: "Can 'disabled' attributes on HTML forms prevent a determined attacker? (yes/no)", a: "no" },
      { q: "What DevTools panel lets you run arbitrary JavaScript in the page's context?", a: "Console" },
      { q: "Is hiding an element with CSS the same as removing it from the page? (yes/no)", a: "no" },
      { q: "Should sensitive data like API keys be stored in LocalStorage? (yes/no)", a: "no" },
      { q: "Are you ready for Phase 2: The Field Test? (yes/no)", a: "yes" }
    ]
  }
];
