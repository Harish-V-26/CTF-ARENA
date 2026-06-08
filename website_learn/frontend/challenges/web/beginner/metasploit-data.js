const LESSONS = [
  {
    title: "Introduction — What is Penetration Testing?",
    points: 30,
    html: `<div class="htb-diagram-container"><img src="../../../assets/metasploit_intro_nologo_1779434453492.png" alt="Metasploit Introduction"></div>
      <h3>Penetration Testing Frameworks</h3>
      <p>A Penetration Testing Framework is an integrated software platform that provides a standardized environment, vast libraries of modular exploits, payloads, and automated toolchains for performing vulnerability assessments and authorized cyber attacks. Frameworks drastically reduce the overhead of managing disparate standalone tools and ensure methodological consistency.</p>
      <p>Imagine you are a master mechanic fixing cars. If you only had one tool, you could only fix one very specific type of problem. But what if you had a massive, magical rolling toolbox? This toolbox perfectly organizes thousands of different wrenches, hammers, and computer scanners. It even tells you exactly which tool to use for which car! A "Penetration Testing Framework" is exactly like this magical toolbox, but for ethical hackers. Instead of downloading hundreds of separate hacking programs, a framework puts everything you will ever need into one organized, powerful system.</p>
      <h3>Ethical Principles & Legal Usage</h3>
      <div class="step-block">
        <div class="step-num">Rule 1</div>
        <div class="step-body"><strong>Authorization</strong><br>You must ONLY use penetration testing tools on systems you own or have EXPLICIT written permission to test. Using these tools on unauthorized systems is ILLEGAL under laws like the CFAA.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Rule 2</div>
        <div class="step-body"><strong>Safe Learning Environment</strong><br>This lab runs entirely in a SIMULATED environment. The terminal below is a safe simulation — no real exploits are executed against external targets.</div>
      </div>`,
    questions: [
      { q: "What is the primary benefit of using a framework like Metasploit over individual tools?", a: "consistency", hint: "Look for the specific tools mentioned in the lesson." },
      { q: "What does 'CFAA' stand for? (full name)", a: "computer fraud and abuse act", hint: "Review the definitions and acronyms section." },
      { q: "Before testing any system, what MUST an ethical hacker obtain? (two words)", a: "written authorization", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Is it legal to use Metasploit against any internet server you want? (yes/no)", a: "no", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "What is Metasploit?",
    points: 40,
    html: `<div class="htb-diagram-container"><img src="../../../assets/metasploit_basics_nologo_1779673940162.png" alt="Metasploit Basics"></div>
      <h3>The Metasploit Framework Architecture</h3>
      <p>The Metasploit Framework is a modular penetration testing platform that enables the development, testing, and execution of exploit code. Its architecture cleanly separates exploits (the delivery mechanism exploiting a vulnerability) from payloads (the code executing after successful exploitation), allowing them to be dynamically mixed and matched at runtime.</p>
      <p>Imagine a master thief who has a massive belt full of every lockpick, crowbar, and secret key ever invented in the world. Whenever they find a locked door, they don't have to invent a new tool; they just reach into their belt, find the exact right key for that specific lock, and open the door in seconds! Metasploit is exactly like that magical toolbelt. Instead of writing complicated hacking code from scratch every time, an ethical hacker just tells Metasploit which computer to test, and Metasploit automatically pulls out the right tool to do the job!</p>
      <h3>Core Metasploit Concepts</h3>
      <div class="step-block">
        <div class="step-num">Concept 1</div>
        <div class="step-body"><strong>Modules & Exploits</strong><br>Modules are self-contained pieces of code that perform a specific task. Exploits are modules that take advantage of a specific vulnerability in a service (e.g., <code>exploit/windows/smb/ms17_010_eternalblue</code>).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Concept 2</div>
        <div class="step-body"><strong>Payloads & Sessions</strong><br>Payloads are code that runs on the target AFTER a successful exploit (like dropping a reverse shell). Once the payload executes, an active connection called a Session is created.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Concept 3</div>
        <div class="step-body"><strong>Auxiliary Modules</strong><br>These modules scan, fuzz, sniff, or brute-force without exploiting. They are safe tools used for reconnaissance (e.g., <code>auxiliary/scanner/ftp/ftp_version</code>).</div>
      </div>`,
    questions: [
      { q: "Who originally created the Metasploit Framework?", a: "H.D. Moore", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the name of the main Metasploit console command?", a: "msfconsole", hint: "Check the command reference blocks." },
      { q: "What type of module scans and probes without exploiting? (one word)", a: "auxiliary", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is created after a successful exploit delivers its payload? (one word)", a: "session", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What payload type opens a remote shell back to the attacker? (format: x/x/x)", a: "windows/meterpreter/reverse_tcp", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "Core Commands — msfconsole",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/metasploit_commands_nologo_1779673954712.png" alt="Essential Metasploit Commands"></div>
      <h3>Interactive Console Operations</h3>
      <p><code>msfconsole</code> is the primary interactive command-line interface for the Metasploit Framework. It provides centralized access to the underlying PostgreSQL database, module search functionalities, context-aware autocompletion, and session management capabilities required to mount complex cyber-attacks.</p>
      <p>Imagine you are a pilot stepping into the cockpit of a highly advanced fighter jet. The <code>msfconsole</code> is your dashboard. From this one seat, you can search the radar for targets, load specific missiles (modules), aim your weapons by setting coordinates (options), and finally press the big red 'fire' button (run) to launch your tools.</p>
      <h3>Essential msfconsole Workflow</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>search & use</strong><br><code>search &lt;term&gt;</code> searches the massive database for modules matching a keyword (like <code>search ftp</code>). <code>use &lt;module&gt;</code> loads the specific module into your active context.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>show options & set</strong><br><code>show options</code> displays all configurable parameters for the loaded module. <code>set &lt;OPTION&gt; &lt;value&gt;</code> defines those parameters, like <code>set RHOSTS 192.168.1.10</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>run & back</strong><br><code>run</code> (or <code>exploit</code>) executes the currently loaded module. When finished, <code>back</code> exits the module context and returns you to the global prompt.</div>
      </div>`,
    questions: [
      { q: "What command searches for modules related to 'ssh'?", a: "search ssh", hint: "Check the command reference blocks." },
      { q: "What command loads a module into your current context?", a: "use", hint: "Check the command reference blocks." },
      { q: "What command shows all configurable options for the loaded module?", a: "show options", hint: "Check the command reference blocks." },
      { q: "What command sets the target IP address option?", a: "set RHOSTS", hint: "Check the command reference blocks." },
      { q: "What two commands execute the loaded module?", a: "run or exploit", hint: "Check the command reference blocks." },
      { q: "What command exits the current module context?", a: "back", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "Interactive Terminal — Practice Commands",
    points: 60,
    html: `<div class="htb-diagram-container"><img src="../../../assets/metasploit_terminal_nologo_1779673970904.png" alt="Interactive Terminal Practice"></div>
      <h3>Practical Console Simulation</h3>
      <p>Simulators provide risk-free environments to develop muscle memory and operational fluency with complex command-line interfaces. Navigating <code>msfconsole</code> quickly is critical during time-sensitive penetration testing engagements.</p>
      <p>Imagine practicing your secret agent skills in a highly realistic virtual reality training room before you go on a real mission. The terminal below is your safe VR room. You can type commands, make mistakes, and practice loading your tools without ever risking breaking a real computer or getting into trouble.</p>
      <h3>Practice Workflow</h3>
      <div class="step-block">
        <div class="step-num">Task 1</div>
        <div class="step-body"><strong>Launch Console</strong><br>Type <code>msfconsole</code> to start the framework simulation.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Task 2</div>
        <div class="step-body"><strong>Find & Load</strong><br>Type <code>search ftp</code>, then type <code>use auxiliary/scanner/ftp/ftp_version</code> to load the module.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Task 3</div>
        <div class="step-body"><strong>Configure & Execute</strong><br>Type <code>show options</code>. Then type <code>set RHOSTS 127.0.0.1</code>. Finally, type <code>run</code>. Familiarize yourself with this sequence!</div>
      </div>`,
    questions: [
      { q: "After loading a module with 'use', what command shows its options?", a: "show options", hint: "Check the command reference blocks." },
      { q: "What option sets the target IP in most scanner modules?", a: "RHOSTS", hint: "Check the command reference blocks." },
      { q: "What option sets the target port number? (all caps)", a: "RPORT", hint: "Check the command reference blocks." },
      { q: "After running a scan module, what command exits back to global context?", a: "back", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "Practice Challenge — Find the FTP Scanner",
    points: 70,
    html: `<div class="htb-diagram-container"><img src="../../../assets/metasploit_challenge_nologo_1779673986381.png" alt="Practice Challenge"></div>
      <h3>Vulnerability Scanning via Auxiliary Modules</h3>
      <p>Service enumeration is the process of identifying listening ports and the specific software versions backing them. Metasploit auxiliary scanner modules automate protocol-specific handshakes to extract service banners and identify potential vulnerabilities efficiently.</p>
      <p>It's time for your final exam! You are a master hacker and you've found a locked safe (an FTP server). Your mission is to use your magical toolbelt to pull out the "scanner" tool, point it at the safe, and read the secret serial number stamped on the lock. Follow the exact steps you learned to reveal the secret flag!</p>
      <h3>The Challenge Execution</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Start & Search</strong><br>Open the terminal, type <code>msfconsole</code>, then search for FTP modules using <code>search ftp</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Load & Configure</strong><br>Select the module: <code>use auxiliary/scanner/ftp/ftp_version</code>. Check the options using <code>show options</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Target & Fire</strong><br>Set the target IP: <code>set RHOSTS &lt;TARGET_IP&gt;</code> (Use the IP given when you launch the Target Server!). Finally, type <code>run</code>. Look closely at the terminal output to find the secret FLAG hidden in the FTP banner message!</div>
      </div>`,
    questions: [
      { q: "Submit the flag you received from completing the terminal challenge!", a: "FLAG{MSF_BEGINNER_COMPLETE}", hint: "Check the command reference blocks." },
      { q: "What is the full path of the FTP version scanner module?", a: "auxiliary/scanner/ftp/ftp_version", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What Metasploit command searches for FTP-related modules?", a: "search ftp", hint: "Check the command reference blocks." },
      { q: "In a real engagement, what must you have before scanning any target? (two words)", a: "written authorization", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  }
];
