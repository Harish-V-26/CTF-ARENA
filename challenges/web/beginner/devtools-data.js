const LESSONS = [
  {
    title: "1. Inspector (Elements) — Reading the DOM",
    points: 10,
    content: `THE LIVE BLUEPRINT
Imagine a website is like a massive LEGO castle. When you look at the screen, you only see the finished castle. But what if you could press a button and see the exact instructions booklet showing where every single brick was placed? In web browsers, this instruction booklet is called the "Inspector" or "Elements" panel. It shows the raw HTML code that builds the pages you look at. Every picture, every text box, and every hidden button is listed right there in a tree. Hackers use the Inspector to see if the website designers accidentally left secret folders or private developer notes lying around in the instructions booklet.

THE HIDDEN NOTES
Website builders often write notes to each other inside the code, which are called "Comments." These comments look like this: "<!-- secret note here -->". Normal users can't see them on the page, but they are completely visible in the Inspector! Sometimes, developers also use a CSS style called "display: none" to make buttons or text completely invisible to normal visitors, but the code is still sitting right there in the booklet. Hackers search the Inspector for keywords like "flag" or "secret" to find these hidden goodies. 

BREAKING THE RULES
The Inspector doesn't just let you read the instructions; it lets you change them! Imagine a button on a page is grayed out and you can't click it because it has a rule called "disabled" attached to it. You can double-click that "disabled" rule in the Inspector, press the delete key on your keyboard, and watch the button instantly light up! You can now click it, and it will send your data to the server. This works because the rule only existed on your computer, not on the server, showing that browser-side rules are very weak!`,
    questions: [
      { q: "What does the Inspector panel show you?", a: "The raw HTML and CSS of the live page" },
      { q: "What HTML comment syntax might hide a flag in the DOM?", a: "<!-- -->" },
      { q: "How do you bypass a 'disabled' button using DevTools?", a: "Delete the disabled attribute in the Inspector" },
      { q: "What CSS property is commonly used to hide an element from view?", a: "display: none" },
      { q: "What keyboard shortcut opens DevTools in most browsers?", a: "F12" }
    ]
  },
  {
    title: "2. Console — Running JavaScript Live",
    points: 10,
    content: `THE SECRET CHAT BOX
Imagine your web browser has a secret walkie-talkie that lets you talk directly to the website's engine. This walkie-talkie is called the "Console." It is an interactive panel where you can type JavaScript commands and watch them execute instantly. Normally, the website uses its own JavaScript files to make things move and work. But the Console lets you jump in and type your own commands to override theirs! If a developer is lazy, they might print out secret messages or debugging codes to the Console, thinking that regular users won't know how to open it and read them.

OVERWRITING THE RULES
The Console is extremely powerful because you can redefine how the website works. Imagine the website has a function called "validateUser()" that checks if you are allowed to see a secret page, and it always says "No!" You can open the Console, type "validateUser = function() { return true; };", and press enter. You just rewrote the rules in the website's brain! Now when you click the button, the website thinks you are allowed in and reveals the secret. 

READING THE MEMORY
You can also use the Console to check the website's memory. You can type "document.cookie" to see the digital wristbands (cookies) the server gave you, or type "localStorage" to see what data the site has saved on your hard drive. Hackers often write scripts that grab this memory data and send it to their own servers. The Console is also where you look for red error messages. If the server crashes or gets confused, it prints a red error here, which often tells you exactly what kind of software the server is using behind the scenes.`,
    questions: [
      { q: "What JavaScript function do developers use to print messages to the Console?", a: "console.log()" },
      { q: "What command reveals all cookies accessible to JavaScript?", a: "document.cookie" },
      { q: "How can you override a JavaScript validation function in the Console?", a: "Redefine it with a new function that returns true" },
      { q: "What command lists all hidden input fields on the page?", a: "document.querySelectorAll('[type=\"hidden\"]')" },
      { q: "What type of Console messages can reveal internal server paths and API endpoints?", a: "Error messages" }
    ]
  },
  {
    title: "3. Debugger (Sources) — Pausing & Modifying Code",
    points: 10,
    content: `FREEZING TIME
Imagine you are playing a fast-paced video game, and you have a magical button that can freeze time at any exact second. While time is frozen, you can walk around, look at the values of all the items, change your health score, and then unfreeze time to watch it play out. In your web browser, this magical freezer is called the "Debugger" or "Sources" panel. It lists every single JavaScript file that the website has loaded. You can open any file, look at the code, and set a "Breakpoint" on any line you want to pause.

THE PASSWORD TRAP
Setting a breakpoint is the ultimate way to catch a secret. Imagine the website has a login button, and when you click it, the code runs a comparison check: "if (userPassword === correctPassword)". You can set a breakpoint right on that comparison line. When you type "hello" in the password box and click login, time freezes! The browser stops executing the code. You can now hover your mouse over the word "correctPassword" or type it into the Console, and the browser will reveal the real, secret password that was hidden in its memory!

CLEANING THE MESS
Developers often squeeze all their JavaScript code onto one single line to make the website load faster. This is called "Minified Code," and it looks like a giant, messy pile of spaghetti. It is impossible for humans to read. But the Debugger has a magical button at the bottom that looks like two curly brackets "{ }". This button is called "Pretty Print." When you click it, the Debugger automatically cleans up the spaghetti code, formatting it into beautiful, easy-to-read lines so you can analyze exactly how it works.`,
    questions: [
      { q: "What is a breakpoint?", a: "A marker that pauses code execution at a specific line" },
      { q: "What panel shows all variable values when code is paused at a breakpoint?", a: "Scope panel" },
      { q: "What technique reveals a hardcoded password by pausing at the comparison line?", a: "Breakpoint Injection" },
      { q: "What button ( { } ) formats minified JavaScript into readable code?", a: "Pretty Print" },
      { q: "What JavaScript function decodes Base64-encoded strings?", a: "atob()" }
    ]
  },
  {
    title: "4. Network — Intercepting Data in Transit",
    points: 10,
    content: `THE TRAFFIC MONITOR
Every time you click a link, type a message, or load a picture on a website, your browser has to send a request to the server and wait for an answer. This constant back-and-forth conversation is logged in the "Network" panel. It acts like a digital traffic monitor that records every single message flying in and out of your computer. Hackers use the Network panel to see the raw text that the browser and server are saying to each other, which is often completely different from what you see on the screen.

THE API TREASURE
Sometimes, when you log into a dashboard, the server sends back a giant package of data containing your user ID, your email, and your secret role. The website's frontend code reads the package and only prints your name on the screen to keep it clean. But if you open the Network panel, click on the request, and look at the "Response" tab, you can see the raw package (usually called JSON)! The server might have accidentally included your secret password or a CTF flag inside that raw package, thinking the frontend would hide it. 

REPLAYING THE MESSAGE
The Network panel doesn't just let you watch; it lets you copy and rewrite requests. If you find a request that asks the server for user data, like "/api/user?id=1", you can right-click it, select "Copy as cURL", and paste it into a terminal. You can then change "id=1" to "id=2" and send it again to steal another user's data! This is the foundation of many web attacks, and the Network panel is where you gather the raw messages to modify them.`,
    questions: [
      { q: "What Network tab shows the raw data returned by the server?", a: "Response" },
      { q: "What filter isolates API calls in the Network panel?", a: "Fetch/XHR" },
      { q: "What custom HTTP header might contain a hidden flag?", a: "X-Flag (or any custom header)" },
      { q: "What technique copies a request as a terminal command for modification?", a: "Copy as cURL" },
      { q: "What checkbox prevents request logs from clearing during page redirects?", a: "Preserve log" }
    ]
  },
  {
    title: "5. Storage (Application) — Cookies, LocalStorage & Sessions",
    points: 10,
    content: `THE browser'S SAFE
Websites need a place to save data on your computer so they don't forget who you are. This local storage area is displayed in the "Storage" or "Application" panel. Here, you can see your Session Cookies (the digital wristbands that keep you logged in), "LocalStorage" (a persistent cabinet that saves your preferences even if you close the browser), and "SessionStorage" (a temporary cabinet that clears when you close the tab).

TAMPERING WITH THE SAFE
Just like everything else in the browser, you have complete control over this storage area. If a website stores a value like "isAdmin = false" in your LocalStorage, you can simply double-click the word "false" inside the Application panel, type "true", and refresh the page. If the developers were lazy and didn't double-check this on their server, the website will suddenly load with full administrator powers! Hackers always check the Storage panel first to see what kind of keys are lying around.

DECODING THE TOKENS
Many modern websites store JSON Web Tokens (JWTs) in their LocalStorage or Cookies. These tokens look like long, random strings of letters that start with "eyJ". While they look like nonsense, they are actually just encoded text. You can copy the token from the Storage panel, paste it into a decoder like jwt.io, and read exactly what permissions the website has granted you. If the token is poorly secured, you can edit it and paste it back into the Storage panel to escalate your privileges.`,
    questions: [
      { q: "What Storage type sends data automatically with every HTTP request?", a: "Cookies" },
      { q: "What JavaScript command reads a value from LocalStorage?", a: "localStorage.getItem()" },
      { q: "What happens if you change a cookie value from 'role=guest' to 'role=admin'?", a: "You may escalate privileges if the server trusts the cookie" },
      { q: "What is the difference between LocalStorage and SessionStorage?", a: "SessionStorage is cleared when the tab is closed" },
      { q: "What website is commonly used to decode and inspect JWT tokens?", a: "jwt.io" }
    ]
  },
  {
    title: "6. Style Editor — Uncovering Visual Secrets",
    points: 10,
    content: `THE INVISIBLE PAINT
Sometimes developers hide secrets on a page by making them invisible. They might use a CSS style called "opacity: 0" (which makes the text fully transparent, like clean glass), or paint the text the exact same color as the background (white text on a white page). The text is physically there on the screen, and your computer knows it, but your eyes can't see it. The "Style Editor" tab lets you see and modify all the CSS paint rules on the website.

REVEALING THE SECRETS
In the Style Editor, you can turn off any CSS rule just by unchecking a box. If you see an element styled with "display: none" or "visibility: hidden", you can delete that rule or change it to "visible". Instantly, the hidden text or buttons will pop back onto the screen! You can also click the "Computed" tab to see the final, combined paint rules for any element you inspect, which makes it easy to spot if text is hidden by being pushed off-screen (like "position: absolute; left: -9999px").

THE NUCLEAR OPTION
If you suspect there are lots of hidden elements on a page but you don't want to find them one by one, you can run a script in the Console that overrides every single CSS hiding rule at once. This script targets every element and forces its opacity to 1, its visibility to visible, and its color to bright red. The page will look crazy and broken, but any hidden passwords or CTF flags will be instantly revealed in bright colors right before your eyes!`,
    questions: [
      { q: "What CSS property makes an element exist in the DOM but not render at all?", a: "display: none" },
      { q: "What is the difference between visibility: hidden and display: none?", a: "visibility: hidden takes up space but is invisible, display: none removes it from layout" },
      { q: "How can text be hidden by matching colors?", a: "Set the text color the same as the background color" },
      { q: "What CSS technique pushes an element off-screen to hide it?", a: "position: absolute with a large negative left value" },
      { q: "What Console command outlines every element on the page?", a: "querySelectorAll('*').forEach(el => { el.style.outline = '1px solid red'; })" }
    ]
  },
  {
    title: "7. Memory & Performance — Advanced Analysis",
    points: 10,
    content: `THE COMPUTER'S BRAIN
The "Memory" panel lets you peek inside the browser's active thinking space. It captures a "Heap Snapshot," which is a picture of every single variable, word, and function currently alive in the browser's RAM. Sometimes, a website will load a secret flag or password into its memory temporarily to check if you typed it right, and then delete it from the screen. But because computers are messy, that secret word might still be sitting in the RAM heap waiting to be cleared!

THE TIMING ATTACKS
The "Performance" panel records exactly how long every single calculation takes. Hackers use this to perform "Timing Attacks." Imagine a password check that reads your input character-by-character. If your first letter is wrong, the code stops checking immediately and returns "No" in 0.1 milliseconds. But if your first letter is correct, it checks the second letter, which takes 0.2 milliseconds. By measuring the execution times in the Performance panel, a hacker can brute-force a password one letter at a time just by finding which letters make the computer think slightly longer!

CONSTANT-TIME DEFENSE
To protect websites from timing attacks, programmers must write special "constant-time" comparison functions. These functions are designed to always take the exact same amount of time to check a password, regardless of whether the first letter was right or wrong. This makes the Performance stopwatch completely useless to hackers because the timing never changes, keeping the secrets safe.`,
    questions: [
      { q: "What Memory tool captures all objects currently in JavaScript memory?", a: "Heap snapshot" },
      { q: "What type of attack infers secrets by measuring how long operations take?", a: "Timing Attack (Side-Channel Attack)" },
      { q: "Why might a deleted variable's value still appear in a heap snapshot?", a: "The string may remain in memory until garbage collection runs" },
      { q: "What kind of comparison function defends against timing attacks?", a: "Constant-time comparison" },
      { q: "What Performance panel section shows developer-added timing markers?", a: "User Timing" }
    ]
  },
  {
    title: "8. Accessibility — The Hidden Text Layer",
    points: 10,
    content: `THE SCREEN READER LAYER
The "Accessibility" panel reveals the website's structure as interpreted by tools like screen readers, which read the page aloud for visually impaired users. Sometimes, developers hide text from the screen using visual CSS, but forget to hide it from the Accessibility Tree. Sighted users see nothing, but a screen reader will read the secret flag aloud! This is a very common trick in CTFs.

THE ACCESSIBLE LABELS
Developers use ARIA (Accessible Rich Internet Applications) attributes to label elements for screen readers. For example, a button might have a tag like "aria-label='secret_key'". This label never appears on the screen, but it is fully visible in the Accessibility panel or DOM. ALT text on images is another hidden layer. A logo image might have "alt='flag{hidden_treasure}'" attached to it, which screen readers read but normal browsers hide unless the image fails to load.

FINDING THE LABELS
To find these hidden labels, hackers use Console commands to scan the page for any elements with 'aria-label' or 'alt' attributes, or they simply browse the Accessibility Tree instead of the normal DOM tree. The Accessibility Tree strips away all the visual layout clutter and shows only the raw semantic content, making hidden screen-reader-only text stand out immediately.`,
    questions: [
      { q: "What CSS class name is commonly used to hide text visually while keeping it accessible to screen readers?", a: "sr-only (or visually-hidden)" },
      { q: "What ARIA attribute provides a text label that is not displayed visually?", a: "aria-label" },
      { q: "What DevTools feature shows the page structure as assistive technologies interpret it?", a: "Accessibility Tree" },
      { q: "Where can flags be hidden on image elements?", a: "In the alt attribute" },
      { q: "What does aria-hidden='true' do?", a: "Hides an element from screen readers" }
    ]
  },
  {
    title: "9. Global Search & Practical Workflow",
    points: 10,
    content: `THE ULTIMATE SHORTCUT
Now that you know all the panels, it's time for the ultimate workflow secret. While DevTools is open, you can press "Ctrl+Shift+F" (or Cmd+Opt+F on Mac) to open the "Global Search" bar. This tool searches through every single file, script, stylesheet, and image loaded by the website all at once! Instead of clicking through folders one by one, you just type "flag" or "secret" and watch the results list every match instantly.

THE SYSTEMATIC CHECKLIST
When attacking a web CTF challenge, you should always follow a checklist. Step 1: Right-click and View Source (Ctrl+U) to look for simple comments. Step 2: Open the Inspector (F12) and search the DOM for hidden elements. Step 3: Check the Console for logged messages. Step 4: Use Global Search (Ctrl+Shift+F) to scan all JavaScript files for hardcoded keys. Step 5: Check the Network panel for API responses. Step 6: Inspect the Storage panel for cookies and local storage variables.

CLIENT-SIDE IS NOT SECURITY
The most important rule in web security is: All client-side checks can be bypassed! Since the browser runs on the user's computer, the user has complete control over it. They can delete disabled buttons, rewrite JavaScript functions, freeze execution, and change cookies. True security must always be enforced on the Server, which is in a locked control room that the user cannot touch.`,
    questions: [
      { q: "What keyboard shortcut searches all loaded files at once in DevTools?", a: "Ctrl+Shift+F" },
      { q: "What is the first step in the CTF DevTools Checklist?", a: "View Source (Ctrl+U)" },
      { q: "Why can all client-side validation be bypassed?", a: "Because it runs in the browser which the user controls" },
      { q: "What should you search for first when using Global Search on a CTF challenge?", a: "flag" },
      { q: "Where must security always be enforced to be reliable?", a: "Server-side" }
    ]
  }
];
