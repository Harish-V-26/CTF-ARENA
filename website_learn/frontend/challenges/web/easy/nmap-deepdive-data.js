const LESSONS = [
  {
    title: "Advanced Scan Types — Null, FIN, and Xmas",
    points: 30,
    content: `ADVANCED NMAP SCAN TYPES

WHAT ARE THESE ADVANCED SCANS?
Imagine you are trying to sneak into a castle, but the front gate has a very strict guard. Normally, people walk up to the guard and say, "Hello, can I come in?" (This is like a normal SYN scan). The guard immediately says, "No! Go away!" and writes your name in his notebook. So, instead of saying hello, what if you walk up to the guard and say absolutely nothing at all? Or what if you walk up and say, "Goodbye, I am leaving now," even though you just got there? Or what if you wear a crazy, glowing Christmas tree costume? These are exactly what Advanced Nmap Scans do! Because the guard is only trained to block people who say "Hello", doing something completely weird confuses the guard. Sometimes, the guard gets so confused that they accidentally leave the gate open or give away secrets about the castle. In this deep dive, you will learn how to use these sneaky, weird techniques to slip right past basic computer firewalls!

To understand these scans, you first need to know a little about how computers establish connections.

BACKGROUND — HOW TCP CONNECTIONS WORK:
Every piece of data sent over the internet is wrapped in a "packet". Inside the packet is a special section called the TCP Header, which contains small switches called "flags". These flags tell the receiving computer what to do with the packet:
  - The SYN flag means: "I want to start a new connection with you."
  - The ACK flag means: "I received your last packet, thank you."
  - The FIN flag means: "I am done and want to close this connection."
  - The RST flag means: "Something is wrong, reset and cancel this connection."
  - The PSH flag means: "Process this data immediately, do not buffer it."
  - The URG flag means: "This data is urgent, process it first."

THE KEY RULE BEING EXPLOITED:
According to the official internet specification (RFC 793) that all computers follow, if a CLOSED port receives any unexpected packet — one that is not a SYN packet — it MUST respond with an RST (Reset) packet to say "this port is closed, go away."

An OPEN port, on the other hand, simply ignores these unexpected packets and sends nothing back.

Nmap uses this difference to detect which ports are open and which are closed.

THE THREE ADVANCED SCAN TYPES:

1. NULL SCAN (-sN):
   What it does: Sends a packet with NO flags set at all (all bits are zero).
   Command: nmap -sN [target-ip]
   
   What Nmap looks for:
   - If the port is OPEN: The port ignores the empty packet. No response is sent back. Nmap records this as "open or filtered".
   - If the port is CLOSED: The port sends back an RST packet. Nmap records this as "closed".

2. FIN SCAN (-sF):
   What it does: Sends a packet with only the FIN flag set. FIN normally means "I want to close a connection", but you cannot close a connection that was never opened.
   Command: nmap -sF [target-ip]
   
   What Nmap looks for:
   - Open port: Ignores the unexpected FIN. No response.
   - Closed port: Responds with RST.

3. XMAS SCAN (-sX):
   What it does: Sends a packet with the FIN, PSH, and URG flags all set at the same time. The name comes from the idea that turning on multiple "lights" on the packet looks like a decorated Christmas tree.
   Command: nmap -sX [target-ip]
   
   What Nmap looks for:
   - Open port: Ignores the strange combination of flags. No response.
   - Closed port: Responds with RST.

WHY USE THESE INSTEAD OF A NORMAL SYN SCAN?
Simple, old-fashioned firewalls (called "stateless" firewalls) work by blocking packets based on simple rules like: "block all incoming SYN packets". Because Null, FIN, and Xmas scans do NOT use the SYN flag, they can pass straight through these basic firewalls without being blocked.

THE IMPORTANT LIMITATION:
These scan types do NOT work reliably against Windows computers. Microsoft Windows does not follow RFC 793 precisely. Windows will respond to ALL unexpected packets (including Null, FIN, and Xmas) with an RST, regardless of whether the port is open or closed. This makes it appear that all ports are closed, even open ones.

These scans work best against Linux and Unix-based servers.

TASK: Answer the questions below.`,
    questions: [
      { q: "What Nmap flag performs a Null scan (no flags set)?", a: "-sN" },
      { q: "What Nmap flag performs an Xmas scan?", a: "-sX" },
      { q: "Which three TCP flags are set simultaneously in an Xmas scan?", a: "FIN, PSH, URG" },
      { q: "What packet does a CLOSED port send back in response to a FIN scan?", a: "RST" },
      { q: "True or False: Null scans work reliably against Microsoft Windows hosts.", a: "False" }
    ]
  },
  {
    title: "Evasion — Fragmentation and MTU",
    points: 30,
    content: `EVADING DETECTION WITH PACKET FRAGMENTATION

WHAT IS PACKET FRAGMENTATION?
Imagine you want to send a large secret message through the mail, but you know that mail inspectors read every letter that arrives. Your solution: cut the message into dozens of tiny pieces, put each piece in a separate envelope, and mail them all separately. Each tiny piece makes no sense on its own, so the inspector cannot figure out what the message says.

Packet fragmentation works the same way for network scanning. Instead of sending one complete network probe packet, Nmap splits it into several very small pieces (called "fragments"). Firewalls and Intrusion Detection Systems (IDS) — which are like automated mail inspectors — have to collect and reassemble all the fragments to understand the full request. If they are not configured to do this reassembly, the scan packets slip through undetected.

WHY DO ATTACKERS USE THIS?
When performing a network scan, the scanner's activity is often detected by security software. Firewalls and IDS tools look for recognizable patterns, like "someone is sending a lot of probes to many different ports very quickly". Fragmentation makes these probes harder to recognize because each individual fragment is incomplete and does not match the known signatures for a port scan.

HOW FRAGMENTATION WORKS IN NMAP:

1. BASIC FRAGMENTATION — The -f Flag:
   Command: nmap -f [target-ip]
   
   What it does: Nmap takes the TCP header of each probe packet and splits it into two pieces, each 8 bytes long. Each piece is sent inside its own smaller IP packet.
   
   Why this evades detection: The firewall sees a small, incomplete packet. Without reassembling all the fragments, it cannot tell it is part of a port scan. Simple firewalls that do not track fragments let them through.

2. DOUBLE FRAGMENTATION — The -ff Flag:
   Command: nmap -ff [target-ip]
   
   What it does: Splits packets into even smaller 16-byte chunks instead of 8-byte chunks.

3. CUSTOM SIZE — The --mtu Flag:
   Command: nmap --mtu 24 [target-ip]
   
   What it does: MTU stands for Maximum Transmission Unit — the maximum size of each fragment in bytes. The --mtu flag lets you specify exactly how large each fragment should be.
   
   Important rule: The MTU value must be a multiple of 8 (for example: 8, 16, 24, 32, 40, etc.).

LIMITATIONS AND PRACTICAL NOTES:
  - Fragmentation requires administrator/root privileges because it involves creating custom raw network packets.
  - Modern "stateful" firewalls and IDS systems ARE able to reassemble fragments and can still detect these scans.
  - This technique is most effective against older or simpler network security devices.

TASK: Answer the questions below.`,
    questions: [
      { q: "What Nmap flag tells it to split packets into 8-byte fragments?", a: "-f" },
      { q: "What flag allows you to specify a completely custom fragment size?", a: "--mtu" },
      { q: "What must the MTU value always be a multiple of?", a: "8" },
      { q: "Which flag performs double fragmentation into 16-byte chunks?", a: "-ff" }
    ]
  },
  {
    title: "Evasion — Decoys and IP Spoofing",
    points: 30,
    content: `HIDING YOUR IDENTITY — DECOYS AND IP SPOOFING

THE PROBLEM: THE TRAIL OF BREADCRUMBS
Imagine you are playing a game of hide-and-seek, but your shoes are covered in bright red paint. Every time you walk around the house looking for people, you leave a trail of bright red footprints pointing exactly back to where you are hiding! In the computer world, your computer's "IP Address" is exactly like that red paint. Every time you scan a target network, the target's security cameras take a picture of your IP Address. If a security guard reviews the tapes, they can easily follow the trail of digital footprints right back to your exact computer and report you! Nmap gives hackers two amazing tricks to hide their footprints so they don't get caught: Decoys and IP Spoofing.

Nmap provides two techniques to make attribution difficult: Decoys and IP Spoofing.

TECHNIQUE 1 — DECOY SCANNING (-D):

What is a Decoy?
In military strategy, a decoy is a fake target used to confuse the enemy. Decoy scanning works the same way. Instead of just sending probes from your real IP address, Nmap also sends probes that appear to come from other fake (decoy) IP addresses. The target's logs are then flooded with what looks like simultaneous scans from dozens of different addresses, making it very difficult to identify which one is real.

Command: nmap -D [decoy-ip1],[decoy-ip2],ME [target-ip]

Breaking this down:
  - [decoy-ip1],[decoy-ip2]: These are fake IP addresses you choose. The target will receive probes that appear to come from these addresses.
  - ME: This represents YOUR actual real IP address. Include it somewhere in the list so your scan packets actually reach you.
  - The target sees: Scans coming from decoy-ip1, decoy-ip2, AND your real IP all at the same time. Identifying the real attacker becomes much harder.

Using Random Decoys:
  nmap -D RND:10 [target-ip]
  This generates 10 random fake IP addresses automatically.

TECHNIQUE 2 — IP SPOOFING (-S):

What is IP Spoofing?
Every network packet contains a "return address" — your source IP. IP Spoofing means you forge (fake) this return address. You replace your real IP with a completely different IP address. The target then believes the scan is coming from that forged address.

Command: nmap -S [spoofed-ip] -e [interface] -Pn [target-ip]

Breaking this down:
  - -S [spoofed-ip]: The fake IP address you want packets to appear to come from.
  - -e [interface]: The network interface to send packets through (e.g., eth0). Required because spoofing needs raw packet access.
  - -Pn: Skip the initial ping check (required because the ping reply would also go to the fake address).

The Critical Problem with IP Spoofing:
When you spoof an IP address, the TARGET sends its responses back to the FAKE address — not to you. This means you will not receive the scan results unless:
  - You are on the same local network and can sniff (monitor) all the traffic, OR
  - You have somehow arranged to see traffic destined for the spoofed IP.

In practice, pure IP spoofing is more useful for disruption attacks than for reconnaissance scanning.

TASK: Answer the questions below.`,
    questions: [
      { q: "What Nmap flag enables decoy scanning?", a: "-D" },
      { q: "What keyword in the decoy list represents your own real IP address?", a: "ME" },
      { q: "What flag is used to set a spoofed source IP address?", a: "-S" },
      { q: "What flag specifies the network interface when IP spoofing?", a: "-e" },
      { q: "When you spoof an IP address, do you receive the scan responses? (yes/no)", a: "no" }
    ]
  },
  {
    title: "NSE Scripts — Automating Nmap with Scripting",
    points: 40,
    content: `THE NMAP SCRIPTING ENGINE (NSE)

WHAT IS THE NSE?
Imagine Nmap is a really smart robot dog. Normally, you tell the robot dog to run through a house and bark every time it finds an open door. That is super helpful, but that is all the dog knows how to do. What if you could give the robot dog special, magical chips that teach it new tricks? You could plug in a chip that says, "When you find an open door, go inside and try to guess the password to the safe!" or "When you find an open door, read the poster on the wall and tell me what it says!" The Nmap Scripting Engine (NSE) is exactly like a collection of these magical chips. It turns Nmap from a simple door-checker into a massive, incredibly powerful multi-tool. It lets Nmap run special mini-programs (called scripts) that automatically perform complicated tasks the instant Nmap finds an open door.

Think of NSE scripts like plugins or apps for Nmap. Once Nmap finds an open port running a web server, for example, an NSE script can automatically check: "Is this web server running a version known to have security vulnerabilities?" without you needing to do anything additional.

NSE scripts are written in a programming language called Lua, and Kali Linux comes with hundreds of them pre-installed in: /usr/share/nmap/scripts/

WHY IS THIS USEFUL FOR ATTACKERS AND DEFENDERS?
  - For attackers (penetration testers): NSE scripts dramatically speed up the reconnaissance phase. Instead of manually checking each service, scripts automatically identify vulnerabilities, gather passwords, and enumerate system information.
  - For defenders: The same scripts can be run against your own systems to find weaknesses before real attackers do.

NSE SCRIPT CATEGORIES:
Scripts are organized into categories based on what they do:

  safe:       These scripts are non-disruptive. They will not crash services, generate excessive traffic, or have any negative side effects. Safe to run against any system.

  default:    These are the standard scripts that run automatically when you use the -sC or -A flag. They are a good balance of useful information gathering and minimal disruption.

  discovery:  Scripts that actively explore and map the target. For example, listing shared folders on a Windows file server (SMB shares) or finding all hosts on a network segment.

  vuln:       Scripts that check whether the target has specific known vulnerabilities. For example, checking if a Windows system is vulnerable to the famous EternalBlue exploit (MS17-010).

  exploit:    Scripts that go further and actually attempt to exploit a vulnerability, not just detect it.

  brute:      Scripts that attempt to guess passwords by trying many common usernames and passwords rapidly (brute-force credential attacks).

HOW TO RUN NSE SCRIPTS:

1. Run all scripts in a specific category:
   nmap --script=vuln [target-ip]
   (This runs every vulnerability-checking script against the target)

2. Run one specific script by name:
   nmap --script=ftp-anon [target-ip]
   (The "ftp-anon" script checks if the FTP server allows anyone to log in without a password — called "anonymous login")

3. Run scripts from multiple categories:
   nmap --script="default or safe" [target-ip]

4. Grab a service banner (the introductory message a service sends when you connect):
   nmap --script=banner -p 54321 [target-ip]
   (This reads the welcome message from whatever service is running on port 54321)

All installed scripts are in: /usr/share/nmap/scripts/ and end with the .nse file extension.

TASK: Answer the questions below.`,
    questions: [
      { q: "What Nmap flag is used to run NSE scripts?", a: "--script" },
      { q: "Where are NSE scripts stored on Kali Linux?", a: "/usr/share/nmap/scripts/" },
      { q: "What programming language are NSE scripts written in?", a: "Lua" },
      { q: "Which NSE script category checks for known vulnerabilities?", a: "vuln" },
      { q: "What NSE script checks if an FTP server allows login without a password?", a: "ftp-anon" }
    ]
  },
  {
    title: "Capture the Flag — Deep Dive Challenge",
    points: 50,
    content: `FINAL CHALLENGE — APPLY YOUR ADVANCED NMAP KNOWLEDGE

It is time to put your advanced Nmap skills to the test against a real target environment. In this challenge, you will perform a full port discovery scan and then use NSE scripts to extract flags hidden in service banners.

YOUR MISSION:

STEP 1 — Start the lab containers:
Click both the "Nmap Deep Dive Target" button and the "Start Kali Container" button above.
Wait for both to start, then connect to Kali using the command shown.

STEP 2 — Scan ALL ports on the target:
The target has services running on non-standard, hidden ports. A default scan only checks the 1000 most common ports. To find hidden services, you must scan ALL 65,535 ports:
  nmap -p- host.docker.internal

Wait for the scan to complete. You should discover three open ports:
  - Port 8881 — A web server (HTTP)
  - Port 2121 — An FTP (File Transfer Protocol) server
  - Port 54321 — A secret, unknown service

STEP 3 — Get Flag Part 1 from the FTP service on port 2121:
FTP servers often display a "banner" (a welcome message) when you first connect. Use the NSE banner script to read it:
  nmap -p 2121 --script banner host.docker.internal

Read the banner output carefully. Flag Part 1 is hidden in the FTP welcome message.

STEP 4 — Get Flag Part 2 from the secret service on port 54321:
Use the same banner technique on the mystery port:
  nmap -p 54321 --script banner host.docker.internal

The secret service on this port will output Flag Part 2 in its banner.

STEP 5 — Combine the flag:
Join Flag Part 1 and Flag Part 2 together (with no space between them) to get the complete final flag and submit it below.

TASK: Answer the questions below.`,
    questions: [
      { q: "What port is the FTP service running on?", a: "2121" },
      { q: "What port is the secret service running on?", a: "54321" },
      { q: "What is Flag Part 1? (starts with CTF{)", a: "CTF{nm4p_d33p_" },
      { q: "What is Flag Part 2? (ends with })", a: "d1v3_m4st3r}" },
      { q: "What is the complete combined final flag?", a: "CTF{nm4p_d33p_d1v3_m4st3r}" }
    ]
  }
];
