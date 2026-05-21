const LESSONS = [
  {
    title: "1. Mission Briefing",
    points: 30,
    content: `THE FINAL EXAM
Welcome to the DevTools Field Test! This is your final practical test to prove you are a master browser detective. In the previous lessons, we walked you through every step with instructions. But in this field test, the training wheels are completely off! You must rely on your own skills and curiosity to find a single secret flag that is hidden across a corporate website. The website is a simulated login portal for a big company called SecureCorp, and it runs inside a private sandbox container just for you.

THE SPLIT FLAG
The secret flag is too big to hide in one place, so we have split it into three separate pieces. Each piece is hidden using a different technique we studied. Part 1 is hidden somewhere in the HTML blueprint of the page (which you can read with the Inspector). Part 2 is hidden in the network conversations (which you can intercept with the Network panel). Part 3 is hidden inside the website's JavaScript brain files (which you can inspect using the Debugger). You must find all three parts in order, stitch them together, and submit the complete flag!

THE DETECTIVE'S TIPS
When you launch the test, don't panic! Start by opening your DevTools panel by pressing the F12 key. First, search the elements tree for keywords like "flag" or "part". Second, look at the Network tab and reload the page; check the headers of every request, even the ones that fail and turn red. Third, click on the Sources panel and browse through the files to look for hidden variables. If you get completely stuck, remember you can press Ctrl+Shift+F to open the Global Search bar and search all the files at the same time!`,
    questions: [
      { q: "How many parts is the flag split into?", a: "3" },
      { q: "What DevTools shortcut searches across ALL loaded files at once?", a: "Ctrl+Shift+F" },
      { q: "What three DevTools panels should you check for the flag parts?", a: "Inspector, Network, Debugger" },
      { q: "Are you ready to begin the field test? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "2. Part 1 — The Inspector Hunt",
    points: 50,
    content: `HIDING IN THE BLUEPRINT
Your first objective is to find Part 1 of the flag using the Elements Inspector. Remember, the Inspector displays the raw HTML code that builds the page. Even if text is invisible on the screen, or is written inside developer comments that are ignored by the browser, it is still completely visible in the Inspector tree. You need to inspect the main page code and look for anything out of the ordinary.

THE COMMENT HUNT
Developer comments look like this: "<!-- comment here -->". Developers often leave notes to themselves in the code, and sometimes they leave secret codes or hints there too! To find this part of the flag, open the Elements panel, click inside the tree, and press Ctrl+F to search. Type "flag" and read the matches. You can also right-click the page and select "View Page Source" to open the raw text file of the HTML and search there. Once you find the first piece, write it down so you don't forget it, and move on to the next hunt!`,
    questions: [
      { q: "What is Part 1 of the flag? (Found in the Inspector/HTML source)", a: "flag_part1{dev_tools_" },
      { q: "Where specifically was Part 1 hidden?", a: "HTML comment" },
      { q: "What keyboard shortcut opens 'View Page Source' to see raw HTML?", a: "Ctrl+U" }
    ]
  },
  {
    title: "3. Part 2 — The Network Detective",
    points: 50,
    content: `INTERCEPTING HEADERS
Your second objective is to find Part 2 of the flag using the Network panel. When your browser talks to a server, it sends request headers and receives response headers. These headers contain details like: "This server is running Apache," or "The file you asked for is a JPEG photo." Sighted users never see these headers because they only see the webpage files. But the Network panel logs every single header that passes through your browser.

THE RED HERRING
When you open the Network panel and reload the page, you will see a list of requests. One of these requests is an image that fails to load, returning a "404 Not Found" error. Usually, developers hide information inside these failed requests because they think no one will check them. Click on that failed request, open the "Headers" tab, and read through the "Response Headers." Look for a custom header that starts with "X-". Developers use "X-" to name custom headers, and the second part of the flag is hiding right inside one of them!`,
    questions: [
      { q: "What is Part 2 of the flag? (Found in Network response headers)", a: "power_" },
      { q: "What specific HTTP header contained Part 2?", a: "X-Flag-Part2" },
      { q: "What HTTP status code did the failed image request return?", a: "404" },
      { q: "What does the 'X-' prefix in HTTP headers typically indicate?", a: "Custom (non-standard) header" }
    ]
  },
  {
    title: "4. Part 3 — The Source Code Spy",
    points: 50,
    content: `PEEKING IN THE BRAIN
Your third and final objective is to find Part 3 of the flag using the Sources Debugger panel. The Sources panel displays all the raw JavaScript brain files that run the website's logic. These files contain variables, functions, and calculations. Sometimes, developers leave secrets hardcoded right inside these files as variables, assuming that users will only look at the main visual page and never peek at the source code.

THE VARIABLE HUNT
Open the Sources panel and look at the file tree on the left. Find a file named "app.js", which is the main JavaScript file for the page. Open the file and read the code. You can press Ctrl+F inside the file editor to search for terms like "final" or "piece". You will see a hardcoded variable that holds the final part of the flag! Once you grab this last piece, you will have all three parts. Stitch them together in order, and you will have the master flag ready for submission!`,
    questions: [
      { q: "What is Part 3 of the flag? (Found in JavaScript source)", a: "user}" },
      { q: "What JavaScript variable name held Part 3?", a: "finalPiece" },
      { q: "What file was Part 3 hidden in?", a: "app.js" }
    ]
  },
  {
    title: "5. Mission Complete — Submit the Flag",
    points: 70,
    content: `STITCHING IT TOGETHER
Congratulations! You have hunted down all three hidden pieces of the flag. Let's look at the pieces you found: Part 1 from the Inspector comments was "flag_part1{dev_tools_", Part 2 from the Network headers was "power_", and Part 3 from the JavaScript sources was "user}". When you combine them in order, you get the complete master flag: "flag_part1{dev_tools_power_user}". Paste this flag into the submission box inside the sandbox to watch the victory screen pop up!

THE REAL-WORLD POWER
What you have done today is exactly what professional penetration testers do when they audit corporate websites. They inspect elements to find developer comments that leak database names or API keys. They analyze network traffic to find custom headers that reveal server software versions. They read through client-side JavaScript files to find hardcoded credentials and security bypasses. These basic browser skills are the foundation of all web security research.

NEVER HARDCODE SECRETS
This challenge also teaches a very important defensive lesson: Never hardcode secrets in client-side files! Anything that is sent to the user's browser—whether it is HTML comments, CSS rules, JavaScript variables, or network headers—can be read by anyone who knows how to open their DevTools panel. If you need to keep a password, API key, or CTF flag safe, it must remain locked inside the server and never be sent to the client's browser!`,
    questions: [
      { q: "What is the COMPLETE flag? (All three parts combined)", a: "flag_part1{dev_tools_power_user}" },
      { q: "How many different DevTools panels did you need to find the complete flag?", a: "3" },
      { q: "In real penetration testing, are HTML comments a common source of information leaks? (yes/no)", a: "yes" },
      { q: "Can HTTP response headers contain sensitive information even on 404 error pages? (yes/no)", a: "yes" },
      { q: "Should developers ever hardcode secrets in client-side JavaScript? (yes/no)", a: "no" }
    ]
  }
];
