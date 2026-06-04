/* ================================================
   CTF ARENA — Metasploit Introduction Lab Data
   ================================================ */

const LESSONS = [
  //  LESSON 0: INTRO 
  {
    title: "Introduction — What is Penetration Testing?",
    points: 30,
    icon: "../../../assets/metasploit_intro_nologo_1779434453492.png",
    content: `<div class="htb-diagram-container"><img src="../../../assets/metasploit_intro_nologo_1779434453492.png" alt="Metasploit Introduction"></div>WELCOME TO THE METASPLOIT INTRODUCTION LAB

What is a Penetration Testing Framework?

Imagine you are a master mechanic fixing cars. If you only had one tool, like a single screwdriver, you could only fix one very specific type of problem. But what if you had a massive, magical rolling toolbox? This toolbox has thousands of different wrenches, hammers, and computer scanners perfectly organized inside of it. Not only does it hold the tools, but it even tells you exactly which tool to use for which car! A "Penetration Testing Framework" is exactly like this magical toolbox, but for ethical hackers. Instead of downloading hundreds of separate, confusing hacking programs and trying to make them work together, a framework puts everything you will ever need into one organized, powerful system. It makes testing the security of computer networks fast, safe, and perfectly organized!

Why Do Security Professionals Use Frameworks?

  • Consistency — Same methodology, reproducible results
  • Efficiency  — Everything in one place, no need to install separate tools
  • Reporting   — Generate professional vulnerability reports
  • Automation  — Script complex attack chains easily
  • Community   — Huge database of known exploits and modules

Ethical Hacking & Legal Usage

  CRITICAL: You must ONLY use penetration testing tools on systems you own or have EXPLICIT written permission to test. Using these tools on unauthorized systems is ILLEGAL in most countries under:
  • Computer Fraud and Abuse Act (CFAA) – USA
  • Computer Misuse Act – UK
  • IT Act 2000 – India

Ethical hackers always operate within a defined scope with written authorization.

Safe Learning Disclaimer

This lab runs entirely in a SIMULATED environment. The terminal below is a safe JavaScript simulation — no real exploits are executed. This environment is designed purely to teach you Metasploit command syntax and methodology.

NEVER run these commands against real systems without authorization!`,
    questions: [
      { q: "What is the primary benefit of using a framework like Metasploit over individual tools?", a: "consistency" },
      { q: "What does 'CFAA' stand for? (full name)", a: "computer fraud and abuse act" },
      { q: "Before testing any system, what MUST an ethical hacker obtain? (two words)", a: "written authorization" },
      { q: "Is it legal to use Metasploit against any internet server you want? (yes/no)", a: "no" }
    ]
  },

  //  LESSON 1: WHAT IS METASPLOIT 
  {
    title: "What is Metasploit?",
    points: 40,
    icon: "../../../assets/metasploit_basics_nologo_1779673940162.png",
    content: `<div class="htb-diagram-container"><img src="../../../assets/metasploit_basics_nologo_1779673940162.png" alt="Metasploit Basics"></div>METASPLOIT FRAMEWORK — THE BASICS

What is Metasploit?

Metasploit is the world's most famous and powerful penetration testing framework. Imagine a master thief who has a massive belt full of every lockpick, crowbar, and secret key ever invented in the world. Whenever they find a locked door, they don't have to invent a new tool; they just reach into their belt, find the exact right key for that specific lock, and open the door in seconds! Metasploit is exactly like that magical toolbelt. It is a massive software program that contains thousands of pre-made "exploits" (keys) designed to break into different types of computers. Instead of writing complicated hacking code from scratch every time, an ethical hacker just tells Metasploit which computer to test, and Metasploit automatically pulls out the right tool to do the job! It is pre-installed on hacker operating systems like Kali Linux, and gives you a single command station (called msfconsole) to control all your tools.

Core Concepts at a Glance

FRAMEWORK
  The entire Metasploit system. Includes the database, console, modules, and all tools.
  Think of it as the "operating system" for your hacking toolkit.

MODULES
  Self-contained pieces of code that perform a specific task.
  Like apps on your phone — each one does one job.
  Types: exploit, auxiliary, payload, encoder, nop, post, evasion

EXPLOITS
  Modules that take advantage of a specific vulnerability in a service or application.
  Example: exploit/windows/smb/ms17_010_eternalblue (the famous EternalBlue!)

PAYLOADS
  Code that runs on the target AFTER a successful exploit.
  Think of it as your "drop zone" — what happens once you're in.
  Example: windows/meterpreter/reverse_tcp (opens a remote shell back to you)

SESSIONS
  An active connection between you and a compromised target.
  Once an exploit succeeds and the payload executes, a session is created.

AUXILIARY MODULES
  Modules that DON'T exploit — they scan, fuzz, sniff, or brute-force.
  Example: auxiliary/scanner/ftp/ftp_version — scans for FTP services
  Safe for learning! They're like Nmap on steroids.

Visual Flow

  [You] → msfconsole → [Select Module] → [Set Options] → [Run] → [Session]
                                                ↓
                                    Exploit / Auxiliary / Post`,
    questions: [
      { q: "Who originally created the Metasploit Framework?", a: "H.D. Moore" },
      { q: "What is the name of the main Metasploit console command?", a: "msfconsole" },
      { q: "What type of module scans and probes without exploiting? (one word)", a: "auxiliary" },
      { q: "What is created after a successful exploit delivers its payload? (one word)", a: "session" },
      { q: "What payload type opens a remote shell back to the attacker? (format: x/x/x)", a: "windows/meterpreter/reverse_tcp" }
    ]
  },

  //  LESSON 2: CORE COMMANDS 
  {
    title: "Core Commands — msfconsole",
    points: 50,
    icon: "../../../assets/metasploit_commands_nologo_1779673954712.png",
    content: `<div class="htb-diagram-container"><img src="../../../assets/metasploit_commands_nologo_1779673954712.png" alt="Essential Metasploit Commands"></div>ESSENTIAL METASPLOIT COMMANDS

msfconsole

Command: msfconsole
What it does: Launches the Metasploit Framework interactive console.
Why it matters: This is your entry point — everything happens from here.

  $ msfconsole
  [*] Starting Metasploit Framework...
  msf6 >



search <term>

Command: search ftp
What it does: Searches the module database for anything matching "ftp".
Why it matters: There are 2000+ modules. You'll use this constantly.

  msf6 > search ftp
  Matching Modules
  ================
     #  Name                                    Rank
     -  ----                                    ----
     0  auxiliary/scanner/ftp/ftp_version       normal
     1  auxiliary/scanner/ftp/ftp_login         normal
     2  exploit/unix/ftp/vsftpd_234_backdoor    excellent



use <module>

Command: use auxiliary/scanner/ftp/ftp_version
What it does: Loads the specified module and switches your context to it.
Why it matters: You must "enter" a module before setting options or running it.

  msf6 > use auxiliary/scanner/ftp/ftp_version
  msf6 auxiliary(scanner/ftp/ftp_version) >



show options

Command: show options
What it does: Displays all configurable options for the current module.
Why it matters: Every module needs specific values (like target IP, port) before running.

  msf6 auxiliary(scanner/ftp/ftp_version) > show options
  Module Options:
     Name     Current Setting  Required  Description
     ----     ---------------  --------  -----------
     RHOSTS                    yes       The target host(s)
     RPORT    21               yes       The target port (TCP)
     THREADS  1                yes       Number of concurrent threads



set <OPTION> <value>

Command: set RHOSTS 192.168.1.10
What it does: Sets the value of a module option.
Why it matters: Without setting required options, the module won't run.

  msf6 auxiliary(scanner/ftp/ftp_version) > set RHOSTS 192.168.1.10
  RHOSTS => 192.168.1.10



run (or exploit)

Command: run
What it does: Executes the current loaded module with the options you've set.
Why it matters: This is the trigger — it launches the scan or exploit.

  msf6 auxiliary(scanner/ftp/ftp_version) > run
  [*] 192.168.1.10:21  - FTP Banner: '220 vsftpd 2.3.4'
  [*] Scanned 1 of 1 hosts (100% complete)
  [*] Auxiliary module execution completed



back

Command: back
What it does: Exits the current module and returns to the global context.
Why it matters: Use this when done with a module to select a different one.



help

Command: help
What it does: Shows all available commands and their descriptions.
Why it matters: When in doubt, always check help!`,
    questions: [
      { q: "What command searches for modules related to 'ssh'?", a: "search ssh" },
      { q: "What command loads a module into your current context?", a: "use" },
      { q: "What command shows all configurable options for the loaded module?", a: "show options" },
      { q: "What command sets the target IP address option?", a: "set RHOSTS" },
      { q: "What two commands execute the loaded module?", a: "run or exploit" },
      { q: "What command exits the current module context?", a: "back" }
    ]
  },

  //  LESSON 3: TERMINAL PRACTICE 
  {
    title: "Interactive Terminal — Practice Commands",
    points: 60,
    icon: "../../../assets/metasploit_terminal_nologo_1779673970904.png",
    content: `<div class="htb-diagram-container"><img src="../../../assets/metasploit_terminal_nologo_1779673970904.png" alt="Interactive Terminal Practice"></div>INTERACTIVE TERMINAL PRACTICE

You now have access to a SIMULATED Kali Linux terminal below!

WHAT YOU CAN DO:
    Type real Metasploit commands and see realistic output
    Practice the workflow: search → use → show options → set → run
    Reset the terminal at any time with the Reset button
    Use the Hint button if you get stuck
    Tab autocomplete is simulated for common commands

AVAILABLE COMMANDS (try them all!):
  msfconsole          → Start the framework
  help                → List all commands
  search <term>       → Search modules (try: search ftp, search ssh, search http)
  use <module>        → Load a module
  show options        → Show module options
  show modules        → List loaded modules info
  set RHOSTS <ip>     → Set target IP
  set RPORT <port>    → Set target port
  run / exploit       → Execute the module
  back                → Return to global context
  sessions            → List active sessions
  version             → Show MSF version
  banner              → Display Metasploit banner
  clear               → Clear the terminal
  exit / quit         → Exit (resets terminal)

  SAFETY NOTE:
You are interacting with a REAL Metasploit Framework inside an isolated container. 
All scans and traffic occur locally within the secure sandbox environment.

PRACTICE WORKFLOW:
  1. Type: msfconsole
  2. Type: search ftp
  3. Type: use auxiliary/scanner/ftp/ftp_version
  4. Type: show options
  5. Type: set RHOSTS <TARGET_IP>
  6. Type: run

Complete the practice challenge in the next lesson to earn the flag!`,
    questions: [
      { q: "After loading a module with 'use', what command shows its options?", a: "show options" },
      { q: "What option sets the target IP in most scanner modules?", a: "RHOSTS" },
      { q: "What option sets the target port number? (all caps)", a: "RPORT" },
      { q: "After running a scan module, what command exits back to global context?", a: "back" }
    ]
  },

  //  LESSON 4: CHALLENGE 
  {
    title: "Practice Challenge — Find the FTP Scanner",
    points: 70,
    icon: "../../../assets/metasploit_challenge_nologo_1779673986381.png",
    content: `<div class="htb-diagram-container"><img src="../../../assets/metasploit_challenge_nologo_1779673986381.png" alt="Practice Challenge"></div>PRACTICE CHALLENGE — EARN THE FLAG!

OBJECTIVE:
Complete the following workflow in the terminal to earn FLAG{...}

CHALLENGE GOAL:
  1. Open the Metasploit console
  2. Search for FTP scanner modules
  3. Select the FTP version scanner module
  4. View its options
  5. Set a target IP
  6. Run the module

EXACT WORKFLOW TO FOLLOW:
  Step 1 → Type: msfconsole
  Step 2 → Type: search ftp
  Step 3 → Type: use auxiliary/scanner/ftp/ftp_version
  Step 4 → Type: show options
  Step 5 → Type: set RHOSTS <TARGET_IP> (Use the IP given when you launch the Target Server!)
  Step 6 → Type: run

 HINTS:
  • The module path is: auxiliary/scanner/ftp/ftp_version
  • RHOSTS is the option for the target IP address

FLAG UNLOCK:
When you run the scanner module, it will connect to the target and read the FTP banner. Look closely at the terminal output! The vulnerable server will reveal the secret flag within its banner message.

SUBMIT YOUR FLAG:
Once you spot the flag in the terminal output, copy it and submit it in the answer box below!

 Good luck, ethical hacker!`,
    questions: [
      { q: "Submit the flag you received from completing the terminal challenge!", a: "FLAG{MSF_BEGINNER_COMPLETE}" },
      { q: "What is the full path of the FTP version scanner module?", a: "auxiliary/scanner/ftp/ftp_version" },
      { q: "What Metasploit command searches for FTP-related modules?", a: "search ftp" },
      { q: "In a real engagement, what must you have before scanning any target? (two words)", a: "written authorization" }
    ]
  }
];
