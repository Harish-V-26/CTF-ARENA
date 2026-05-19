const LESSONS = [
  {
    title: "What is Nmap?",
    points: 20,
    content: "Welcome to your first reconnaissance tool! Before you can hack anything, you need to know what's out there. That's where Nmap comes in.\n\n🔍 What is Nmap?\nNmap stands for \"Network Mapper\". It is a free, open-source tool that lets you scan networks to find:\n• Which computers (hosts) are turned on and connected\n• Which doors (ports) are open on those computers\n• What programs (services) are running behind those doors\n• What operating system the computer is using\n\nThink of it like this:\nImagine you're a security guard checking a building. You walk through every hallway (the network), check which rooms exist (hosts), try every door handle (ports), peek inside to see what's happening (services), and note what type of lock each door has (versions).\n\nThat's exactly what Nmap does — but for computer networks!\n\n👤 Who Created Nmap?\nNmap was created by Gordon \"Fyodor\" Lyon in 1997. It has been maintained and improved by the open-source community for over 25 years. It is THE most widely used network scanning tool in the world.\n\n🎬 Fun Fact:\nNmap has appeared in over 20 Hollywood movies, including The Matrix Reloaded, Die Hard 4, and The Bourne Ultimatum. When you see a \"hacker\" scanning a network on screen — they're usually using Nmap!\n\nTASK: Answer the questions below to confirm you understand what Nmap is.",
    questions: [
      { q: "What does Nmap stand for?", a: "Network Mapper" },
      { q: "What year was Nmap created?", a: "1997" },
      { q: "What do we call the 'doors' on a computer that services listen on?", a: "ports" },
      { q: "Is Nmap free and open-source? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "Why Use Nmap?",
    points: 20,
    content: "Now that you know WHAT Nmap is, let's understand WHY it's so important.\n\n🛡️ Why Do Security Professionals Use Nmap?\n\nIn cybersecurity, the very first phase of any penetration test or security audit is called RECONNAISSANCE (or \"recon\"). This is the phase where you gather as much information as possible about your target — before you try to break in.\n\nNmap is the #1 tool for active reconnaissance because it answers the most critical questions:\n\n  Question 1: \"Is this machine even online?\"\n  → Nmap's host discovery tells you which machines are alive\n\n  Question 2: \"What doors are open?\"\n  → Nmap's port scanning finds every open port\n\n  Question 3: \"What's running behind each door?\"\n  → Nmap's service detection tells you the software and version\n\n  Question 4: \"What operating system is this?\"\n  → Nmap's OS detection fingerprints the target\n\n  Question 5: \"Are there known vulnerabilities?\"\n  → Nmap's scripting engine (NSE) can check for specific CVEs\n\n🎯 Real-World Use Cases:\n\n• Penetration Testers use Nmap to find entry points into a client's network\n• System Administrators use it to verify that only approved services are running\n• Bug Bounty Hunters use it to discover forgotten servers and subdomains\n• Incident Responders use it to identify compromised machines\n• Network Engineers use it to troubleshoot connectivity issues\n• Compliance Auditors use it to verify firewall rules are working\n\n📊 The Penetration Testing Lifecycle:\n  1. Reconnaissance  ← Nmap lives here!\n  2. Scanning & Enumeration  ← And here!\n  3. Exploitation\n  4. Post-Exploitation\n  5. Reporting\n\nWithout good recon, you're trying to pick a lock in the dark. Nmap turns the lights on.\n\nTASK: Answer the questions below.",
    questions: [
      { q: "What is the first phase of a penetration test called?", a: "reconnaissance" },
      { q: "What Nmap feature can check for specific CVE vulnerabilities?", a: "NSE" },
      { q: "What does 'active reconnaissance' mean? (type: directly scanning the target)", a: "directly scanning the target" },
      { q: "In the pentest lifecycle, what phase comes after Reconnaissance?", a: "Scanning & Enumeration" }
    ]
  },
  {
    title: "How Nmap Works — The Basics",
    points: 20,
    content: "Before we start running commands, let's understand HOW Nmap actually works under the hood. Don't worry — we'll keep it super simple!\n\n📡 Step 1: How Computers Talk\nEvery computer on a network has an IP address (like a home address). Example: 192.168.1.10\nEvery service on a computer listens on a PORT (like an apartment number). Example: Port 80\n\nSo when you visit a website, your browser connects to:\n  IP Address : Port\n  93.184.216.34 : 80\n\nThere are 65,535 total ports on every computer (0 to 65535).\n\n📡 Step 2: How Nmap Scans\nNmap works by sending tiny network packets to the target and analyzing the responses:\n\n  1. Nmap sends a packet to a port\n  2. If the port is OPEN → the target responds with \"Yes, I'm listening!\"\n  3. If the port is CLOSED → the target responds with \"Nothing here.\"\n  4. If the port is FILTERED → no response at all (a firewall is blocking it)\n\n📡 Step 3: The TCP Three-Way Handshake\nNormal network connections use a \"handshake\" before talking:\n\n  Your computer → SYN → Target       (\"Hey, want to connect?\")\n  Target → SYN-ACK → Your computer    (\"Sure, let's connect!\")\n  Your computer → ACK → Target        (\"Great, we're connected!\")\n\nNmap exploits this handshake to determine if ports are open — without always completing the full connection.\n\n📡 Step 4: Where Nmap Runs\nNmap is pre-installed on Kali Linux. You can also install it on:\n• Ubuntu/Debian: sudo apt install nmap\n• macOS: brew install nmap\n• Windows: Download from nmap.org\n\nTo check if Nmap is installed, run:\n  nmap --version\n\n⚖️ IMPORTANT — Legal Warning:\nScanning networks you do NOT own without written permission is ILLEGAL in most countries. Only scan:\n• Your own machines\n• Lab environments (like this one!)\n• Targets you have written authorization to test\n\nTASK: Answer the questions below.",
    questions: [
      { q: "How many total ports does every computer have?", a: "65535" },
      { q: "What are the 3 steps of the TCP handshake? (type: SYN, SYN-ACK, ACK)", a: "SYN, SYN-ACK, ACK" },
      { q: "What port state means a firewall is blocking the probe?", a: "filtered" },
      { q: "On which Linux distribution is Nmap pre-installed?", a: "Kali Linux" },
      { q: "Is it legal to scan a network without permission? (yes/no)", a: "no" }
    ]
  },
  {
    title: "Nmap Scan Types — A Quick Reference",
    points: 20,
    content: "Nmap supports many types of scans. Before we practice each one, here's a quick overview so you know the difference.\n\n📋 The Main Scan Types:\n\n┌─────────────────────────────────────────────────────────────┐\n│ Scan Type        │ Flag │ What It Does                     │\n├─────────────────────────────────────────────────────────────┤\n│ TCP Connect Scan │ -sT  │ Full TCP handshake (no root)     │\n│ SYN Scan         │ -sS  │ Half-open, stealth (needs root)  │\n│ UDP Scan         │ -sU  │ Scans UDP ports (slow)           │\n│ Ping Scan        │ -sn  │ Only checks if host is alive     │\n│ Version Scan     │ -sV  │ Detects service versions         │\n│ OS Detection     │ -O   │ Fingerprints operating system    │\n│ Aggressive Scan  │ -A   │ OS + Version + Scripts + Route   │\n│ Script Scan      │ -sC  │ Runs default NSE scripts         │\n└─────────────────────────────────────────────────────────────┘\n\n📋 Key Differences:\n\n🔹 TCP Connect (-sT) vs SYN Scan (-sS):\n   • -sT completes the full handshake → logged by the target → noisy\n   • -sS only sends SYN, then resets → not logged → stealthy\n   • -sS is the default when you run Nmap as root\n   • -sT is the default when you run without root\n\n🔹 Version Detection (-sV) vs OS Detection (-O):\n   • -sV identifies the SOFTWARE and VERSION on each open port\n   • -O identifies the OPERATING SYSTEM of the entire machine\n   • Both are important — they answer different questions\n\n🔹 Aggressive (-A) = Everything at once:\n   • Combines -O + -sV + -sC + --traceroute\n   • Very thorough but also very loud (easy to detect)\n   • Perfect for CTF labs, risky in real-world pentests\n\n📋 Common Ports You MUST Know:\n  21 → FTP (File Transfer)\n  22 → SSH (Secure Shell)\n  23 → Telnet (Insecure remote access)\n  25 → SMTP (Email)\n  53 → DNS (Domain Name System)\n  80 → HTTP (Web)\n  443 → HTTPS (Secure Web)\n  3306 → MySQL (Database)\n  3389 → RDP (Remote Desktop)\n  8080 → HTTP Proxy\n\nTASK: Answer the questions to confirm you understand the scan types.",
    questions: [
      { q: "What flag performs a stealth SYN scan?", a: "-sS" },
      { q: "What flag performs a full TCP connect scan?", a: "-sT" },
      { q: "What does -A combine? (type: OS, version, scripts, traceroute)", a: "OS, version, scripts, traceroute" },
      { q: "What service runs on port 443?", a: "HTTPS" },
      { q: "Which scan type is the default when running Nmap as root? (SYN/TCP Connect)", a: "SYN" }
    ]
  },
  {
    title: "Practical: Discovering Live Hosts",
    points: 30,
    content: "🔬 TIME TO GET HANDS-ON!\nFrom this lesson onward, you'll be running real Nmap commands. Launch the Kali container above if you haven't already.\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n🎯 Goal: Find which machines are alive on the network\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🔧 Commands to Try:\n\n1. Ping Scan — find live hosts without scanning ports:\n   nmap -sn 192.168.1.0/24\n\n   What this does:\n   • Sends ICMP echo requests (pings) to every IP in the range\n   • Reports which hosts responded = which are alive\n   • Does NOT scan any ports (fast!)\n\n2. Scan a single host:\n   nmap -sn <target-ip>\n\n3. Scan a range:\n   nmap -sn 10.10.10.1-50\n\n4. Skip host discovery (force scan even if host seems down):\n   nmap -Pn <target-ip>\n   Why? Some firewalls block pings. -Pn says \"don't ping, just scan.\"\n\n5. ARP discovery (local network only):\n   nmap -PR 192.168.1.0/24\n\n📖 Reading the Output:\n  Nmap scan report for 10.10.10.5\n  Host is up (0.0024s latency).\n\n  \"Host is up\" = the machine is alive and reachable.\n  \"0.0024s latency\" = it took 2.4 milliseconds to respond.\n\n💡 Pro Tip:\nAlways start with host discovery! There's no point scanning ports on a machine that's turned off.\n\nTASK: Practice these commands in Kali and answer below.",
    questions: [
      { q: "What Nmap flag performs a ping scan without port scanning?", a: "-sn" },
      { q: "What flag skips host discovery and treats all hosts as up?", a: "-Pn" },
      { q: "What protocol does a standard ping scan use?", a: "ICMP" },
      { q: "What does /24 mean in 192.168.1.0/24? (type: subnet mask)", a: "subnet mask" },
      { q: "What type of scan works only on local networks? (ARP/TCP/UDP)", a: "ARP" }
    ]
  },
  {
    title: "Practical: Scanning Open Ports",
    points: 30,
    content: "━━━━━━━━━━━━━━━━━━━━━━━━━━━\n🎯 Goal: Find which ports are open on the target\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🔧 Commands to Try:\n\n1. Default scan (top 1000 most common ports):\n   nmap <target-ip>\n\n2. Scan specific ports:\n   nmap -p 22,80,443 <target-ip>\n\n3. Scan a port range:\n   nmap -p 1-1000 <target-ip>\n\n4. Scan ALL 65,535 ports:\n   nmap -p- <target-ip>\n   ⚠️ This takes longer but finds hidden services on unusual ports!\n\n5. Scan top N most common ports:\n   nmap --top-ports 100 <target-ip>\n\n📖 Understanding Port States:\n\n  • open — A service IS listening. This is what you want to find!\n  • closed — Nothing is listening, but the port is reachable\n  • filtered — A firewall is blocking your probe. You can't tell if it's open or closed\n  • open|filtered — Nmap can't determine which one\n\n📖 Reading the Output:\n  PORT    STATE  SERVICE\n  22/tcp  open   ssh\n  80/tcp  open   http\n  443/tcp closed https\n  3306/tcp filtered mysql\n\n  This tells you:\n  • SSH and HTTP are running and accessible\n  • HTTPS port exists but nothing is listening\n  • MySQL port is blocked by a firewall\n\n💡 Pro Tip:\nAlways run -p- at least once per target. Many CTF flags are hidden on high-numbered ports like 8888, 9999, or 31337!\n\nTASK: Scan the target and answer the questions below.",
    questions: [
      { q: "How many ports does Nmap scan by default?", a: "1000" },
      { q: "What flag scans ALL 65535 ports?", a: "-p-" },
      { q: "What port state means a service IS actively listening?", a: "open" },
      { q: "What service typically runs on port 22?", a: "SSH" },
      { q: "What service typically runs on port 80?", a: "HTTP" }
    ]
  },
  {
    title: "Practical: Service & Version Detection",
    points: 30,
    content: "━━━━━━━━━━━━━━━━━━━━━━━━━━━\n🎯 Goal: Find WHAT is running on each open port and its exact version\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nKnowing that port 80 is open tells you \"there's a web server.\" But knowing it's running Apache 2.4.49 tells you there's a critical Path Traversal vulnerability (CVE-2021-41773)!\n\n🔧 Commands to Try:\n\n1. Version detection:\n   nmap -sV <target-ip>\n\n2. More aggressive version probing:\n   nmap -sV --version-intensity 9 <target-ip>\n   (intensity ranges from 0-9, default is 7)\n\n3. Quick/light version scan:\n   nmap -sV --version-light <target-ip>\n\n📖 Reading the Output:\n  PORT    STATE SERVICE VERSION\n  22/tcp  open  ssh     OpenSSH 8.9p1 Ubuntu 3\n  80/tcp  open  http    Apache httpd 2.4.49\n  3306/tcp open mysql   MySQL 5.7.38\n\n  Now you know:\n  • The SSH server is OpenSSH version 8.9\n  • The web server is Apache version 2.4.49 (vulnerable!)\n  • The database is MySQL version 5.7.38\n\n🎯 Why Versions Matter:\n  1. Search \"Apache 2.4.49 exploit\" → find CVE-2021-41773\n  2. Search \"OpenSSH 8.9 vulnerability\" → check if it's patched\n  3. Search \"MySQL 5.7 exploit\" → find privilege escalation paths\n\n  The CVE database (cve.mitre.org) maps vulnerabilities to specific software versions. Knowing the version = knowing the exploit.\n\nTASK: Run version detection and answer below.",
    questions: [
      { q: "What Nmap flag enables service version detection?", a: "-sV" },
      { q: "What is the default version detection intensity?", a: "7" },
      { q: "What database maps vulnerabilities to specific software versions?", a: "CVE" },
      { q: "Why is knowing the exact version important? (type: find exploits)", a: "find exploits" }
    ]
  },
  {
    title: "Practical: OS Detection & Stealth Scans",
    points: 30,
    content: "━━━━━━━━━━━━━━━━━━━━━━━━━━━\n🎯 Goal: Fingerprint the target OS & perform stealth scanning\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🖥️ OS DETECTION\nNmap can guess the operating system by analyzing subtle differences in how the target's TCP/IP stack responds.\n\n🔧 Commands:\n  nmap -O <target-ip>              # Basic OS detection\n  nmap -O --osscan-guess <target>  # Aggressive guessing\n\n📖 Example Output:\n  OS details: Linux 4.15 - 5.6\n  OS CPE: cpe:/o:linux:linux_kernel:5.4\n\n⚠️ Requirements:\n  • Needs root/sudo privileges\n  • Target must have at least 1 open AND 1 closed port\n  • Results are probabilistic (best guess)\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🥷 STEALTH SYN SCAN\nThe SYN scan is the most popular scan because it's fast AND stealthy.\n\n🔧 Commands:\n  nmap -sS <target-ip>   # SYN scan (stealth, needs root)\n  nmap -sT <target-ip>   # TCP connect (full handshake, no root needed)\n  nmap -sU <target-ip>   # UDP scan (discovers DNS, SNMP, etc.)\n\n📖 How SYN Scan Works:\n  1. Nmap sends SYN → \"Hey, want to connect?\"\n  2. If port is OPEN → target replies SYN-ACK\n  3. Nmap sends RST → \"Never mind!\" (connection never completed)\n  4. Because the connection was never completed, it often doesn't appear in the target's logs!\n\n🆚 Why SYN > TCP Connect?\n  • SYN is 5-10x faster\n  • SYN doesn't complete the handshake → harder to detect\n  • SYN is the default when running as root\n\nTASK: Try both scan types and answer below.",
    questions: [
      { q: "What Nmap flag enables OS detection?", a: "-O" },
      { q: "What privilege level is required for OS detection? (root/user)", a: "root" },
      { q: "What flag performs a SYN (stealth) scan?", a: "-sS" },
      { q: "In a SYN scan, does Nmap complete the TCP handshake? (yes/no)", a: "no" },
      { q: "What flag performs a UDP scan?", a: "-sU" }
    ]
  },
  {
    title: "Practical: Aggressive Scan & Saving Results",
    points: 30,
    content: "━━━━━━━━━━━━━━━━━━━━━━━━━━━\n🎯 Goal: Run a full aggressive scan and save your results like a pro\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🚀 AGGRESSIVE SCAN\nWhen you want EVERYTHING at once:\n\n  nmap -A <target-ip>\n\nThis single flag enables:\n  • OS detection (-O)\n  • Service version detection (-sV)\n  • Default script scanning (-sC)\n  • Traceroute (--traceroute)\n\n⏱️ TIMING TEMPLATES (T0-T5):\n  -T0  Paranoid   (extremely slow, evades IDS)\n  -T1  Sneaky     (slow, evades IDS)\n  -T2  Polite     (slower than default)\n  -T3  Normal     (default speed)\n  -T4  Aggressive (fast — perfect for labs!)\n  -T5  Insane     (fastest, may miss results)\n\n  Best combo for labs: nmap -A -T4 <target>\n  Best combo for stealth: nmap -sS -T1 <target>\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n💾 SAVING RESULTS\nProfessional pentesters always save scan results!\n\n  nmap -oN scan.txt <target>     # Normal (human-readable)\n  nmap -oX scan.xml <target>     # XML (for Metasploit)\n  nmap -oG scan.gnmap <target>   # Grepable (for scripting)\n  nmap -oA fullscan <target>     # ALL formats at once!\n\n  -oA creates 3 files: fullscan.nmap, fullscan.xml, fullscan.gnmap\n\n🎯 Pro Workflow:\n  1. Run:    nmap -A -T4 -oA recon <target>\n  2. Review: cat recon.nmap\n  3. Parse:  grep 'open' recon.gnmap\n  4. Import: db_import recon.xml  (in Metasploit)\n\nTASK: Run an aggressive scan, save the output, and answer below.",
    questions: [
      { q: "What Nmap flag enables the aggressive scan?", a: "-A" },
      { q: "What timing template is recommended for CTF labs?", a: "T4" },
      { q: "What flag saves output in ALL formats at once?", a: "-oA" },
      { q: "What flag saves output in XML format?", a: "-oX" },
      { q: "What timing template is called 'Paranoid'?", a: "T0" }
    ]
  },
  {
    title: "Mission: NexaCorp Reconnaissance",
    points: 40,
    content: "🎯 MISSION BRIEFING\n━━━━━━━━━━━━━━━━━\nClient: NexaCorp Industries\nObjective: External Network Reconnaissance\nClassification: AUTHORIZED PENETRATION TEST\n\n📋 Background:\nNexaCorp Industries has hired you as a penetration tester. They suspect unauthorized services are exposed on their staging server. Your job: find every entry point.\n\n🎯 Mission Objectives:\n\n  Objective 1: Host Discovery\n  • Confirm the target is alive\n  • Command: nmap -sn <target>\n\n  Objective 2: Port Enumeration\n  • Discover ALL open ports\n  • Command: nmap -p- -T4 <target>\n\n  Objective 3: Service Fingerprinting\n  • Identify services and versions\n  • Command: nmap -sV <target>\n\n  Objective 4: OS Identification\n  • Determine the operating system\n  • Command: nmap -O <target>\n\n  Objective 5: Full Reconnaissance\n  • Run comprehensive aggressive scan and save results\n  • Command: nmap -A -T4 -oA nexacorp_recon <target>\n\n📝 Your Report Should Include:\n  • List of all live hosts discovered\n  • All open ports and their services\n  • Software versions detected\n  • Operating system identified\n  • Saved scan files for the client\n\nTASK: Complete all objectives and answer the debrief.",
    questions: [
      { q: "What is the first step in any network recon? (type: host discovery)", a: "host discovery" },
      { q: "What flags would you use for a full aggressive scan with saved output? (type: -A -T4 -oA)", a: "-A -T4 -oA" },
      { q: "What Nmap flag scans all 65535 ports?", a: "-p-" },
      { q: "After finding services, what database do you search for vulnerabilities?", a: "CVE" },
      { q: "Should scan results be included in the pentest report? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "Capture the Flag — Nmap Challenge",
    points: 50,
    content: "🏁 FINAL CHALLENGE\n━━━━━━━━━━━━━━━━━\nIt is time to put everything you've learned into practice! You will scan a live target container and capture the hidden flag.\n\n🎯 Your Instructions:\n\n  1. Start both the Nmap Target Machine and the Kali Linux container above.\n  2. In your Kali terminal, perform an Nmap scan against the target hostname: host.docker.internal\n     Try a full port scan to find all open ports:\n     nmap -p- host.docker.internal\n\n  3. You should discover two open ports:\n     • Port 8880 (the public web server)\n     • Port 31337 (a secret, non-standard port!)\n\n  4. Query the secret port 31337 to extract the flag. You can use netcat (nc):\n     nc host.docker.internal 31337\n     Or run a version detection scan on that port:\n     nmap -sV -p 31337 host.docker.internal\n\n🏆 Complete the scan, find the flag, and answer the questions below to finish the lab!\n\nTASK: Submit the discovered port and flag.",
    questions: [
      { q: "What is the target hostname you scanned?", a: "host.docker.internal" },
      { q: "What is the standard HTTP port mapped on the host for this target?", a: "8880" },
      { q: "What is the secret high port number you discovered?", a: "31337" },
      { q: "What tool did you use to connect to port 31337 to fetch the banner? (nc/curl)", a: "nc" },
      { q: "What is the flag you retrieved from port 31337? (format: CTF{...})", a: "CTF{n4v1g4t1ng_p0rts_w1th_nm4p}" }
    ]
  }
];
