const LESSONS = [
  {
    title: "Advanced Scan Types — Null, FIN, and Xmas",
    points: 30,
    html: `<div class="htb-diagram-container"><img src="../../../assets/nmap_deepdive_advanced.png" alt="Advanced Scan Types"></div>
      <h3>Firewall Evasion via TCP Header Manipulation</h3>
      <p>Advanced Nmap scans manipulate the TCP header flags to bypass stateless firewalls and intrusion detection systems. According to RFC 793, a closed port must respond to any packet not containing the SYN, RST, or ACK flags with an RST packet, while an open port must ignore it. Nmap exploits this protocol behavior to infer port states without initiating a standard SYN handshake.</p>
      <p>Imagine sneaking into a castle with a strict guard. Normally, you say "Hello" (a SYN scan), and the guard blocks you. But what if you walk up and say absolutely nothing? Or say "Goodbye" even though you just arrived? Or wear a glowing Christmas tree costume? Because the guard only blocks "Hello", doing something weird confuses them, and they might let you slip past! These sneaky scans use weird packet flags to slip past basic firewalls.</p>
      <h3>The Three Advanced Scans</h3>
      <div class="step-block">
        <div class="step-num">Scan 1</div>
        <div class="step-body"><strong>Null Scan (-sN)</strong><br>Sends a packet with NO flags set. Open ports ignore it; closed ports reply with an RST. Works against Unix/Linux, but Windows responds with RST regardless of state.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Scan 2</div>
        <div class="step-body"><strong>FIN Scan (-sF)</strong><br>Sends a packet with only the FIN flag set (attempting to close a non-existent connection). Bypasses stateless firewalls blocking inbound SYN packets.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Scan 3</div>
        <div class="step-body"><strong>Xmas Scan (-sX)</strong><br>Sends a packet with FIN, PSH, and URG flags all set simultaneously, "lighting up" the packet like a Christmas tree.</div>
      </div>`,
    questions: [
      { q: "What Nmap flag performs a Null scan (no flags set)?", a: "-sN", hint: "Check the command reference blocks." },
      { q: "What Nmap flag performs an Xmas scan?", a: "-sX", hint: "Check the command reference blocks." },
      { q: "Which three TCP flags are set simultaneously in an Xmas scan?", a: "FIN, PSH, URG", hint: "Check the command reference blocks." },
      { q: "What packet does a CLOSED port send back in response to a FIN scan?", a: "RST", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "True or False: Null scans work reliably against Microsoft Windows hosts.", a: "False", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "Evasion — Fragmentation and MTU",
    points: 30,
    html: `<div class="htb-diagram-container"><img src="../../../assets/nmap_deepdive_evasion_frag.png" alt="Packet Fragmentation"></div>
      <h3>Packet Fragmentation</h3>
      <p>Packet fragmentation splits the TCP header across multiple smaller IP packets. This evasion technique forces Intrusion Detection Systems (IDS) or firewalls to queue and reassemble the fragments to analyze the full signature. If the security appliance fails to reassemble them, the fragmented probes pass through undetected to the target host.</p>
      <p>Imagine sending a secret message through the mail, but inspectors read every letter. Your solution: cut the message into tiny pieces and mail them separately. Each piece makes no sense alone. The inspector can't read it, so it slips through! Fragmentation cuts the network scan into tiny pieces. Unless the firewall pauses to tape all the pieces back together, the scan slips through completely undetected!</p>
      <h3>Fragmentation Techniques</h3>
      <div class="step-block">
        <div class="step-num">Tech 1</div>
        <div class="step-body"><strong>Basic Fragmentation (-f)</strong><br>Splits the TCP header into 8-byte chunks across separate IP packets. Requires raw packet access (root privileges).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Tech 2</div>
        <div class="step-body"><strong>Double Fragmentation (-ff)</strong><br>Splits packets into 16-byte chunks.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Tech 3</div>
        <div class="step-body"><strong>Custom MTU (--mtu)</strong><br>Specifies a custom fragment size (Maximum Transmission Unit). The MTU value must be a multiple of 8 (e.g., 24, 32).</div>
      </div>`,
    questions: [
      { q: "What Nmap flag tells it to split packets into 8-byte fragments?", a: "-f", hint: "Check the command reference blocks." },
      { q: "What flag allows you to specify a completely custom fragment size?", a: "--mtu", hint: "Check the command reference blocks." },
      { q: "What must the MTU value always be a multiple of?", a: "8", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Which flag performs double fragmentation into 16-byte chunks?", a: "-ff", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "Evasion — Decoys and IP Spoofing",
    points: 30,
    html: `<div class="htb-diagram-container"><img src="../../../assets/nmap_deepdive_evasion_decoys.png" alt="Decoys and IP Spoofing"></div>
      <h3>Decoy Scanning and IP Spoofing</h3>
      <p>Decoy scanning (<code>-D</code>) obscures the actual source of a scan by blending the attacker's real IP address with multiple spoofed decoy IPs in the target's logs. IP Spoofing (<code>-S</code>) completely forges the source address, although it renders the attacker "blind" since response packets are routed to the forged IP rather than the attacker's machine.</p>
      <p>Imagine playing hide-and-seek with bright red paint on your shoes. You leave a trail of footprints straight to your hiding spot! Your IP Address is that red paint. When you scan, the security cameras log your IP. But Nmap has a trick: Decoys! Nmap sends fake scans from dozens of random addresses at the same time as yours. The target's logs are flooded with fake footprints, making it impossible to know which one is the real attacker!</p>
      <h3>Implementation</h3>
      <div class="step-block">
        <div class="step-num">Method 1</div>
        <div class="step-body"><strong>Decoy Scanning (-D)</strong><br>Command: <code>nmap -D RND:10,ME [target]</code>. Generates 10 random IP addresses and mixes them with your real IP (<code>ME</code>) during the scan.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Method 2</div>
        <div class="step-body"><strong>IP Spoofing (-S)</strong><br>Command: <code>nmap -S [fake-ip] -e eth0 -Pn [target]</code>. Completely replaces your source IP. Note: You will not see the scan results unless you can monitor the network traffic directed at the fake IP.</div>
      </div>`,
    questions: [
      { q: "What Nmap flag enables decoy scanning?", a: "-D", hint: "Check the command reference blocks." },
      { q: "What keyword in the decoy list represents your own real IP address?", a: "ME", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What flag is used to set a spoofed source IP address?", a: "-S", hint: "Check the command reference blocks." },
      { q: "What flag specifies the network interface when IP spoofing?", a: "-e", hint: "Check the command reference blocks." },
      { q: "When you spoof an IP address, do you receive the scan responses? (yes/no)", a: "no", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "NSE Scripts — Automating Nmap with Scripting",
    points: 40,
    html: `<div class="htb-diagram-container"><img src="../../../assets/nmap_deepdive_nse.png" alt="Nmap Scripting Engine"></div>
      <h3>Nmap Scripting Engine (NSE)</h3>
      <p>The Nmap Scripting Engine (NSE) utilizes the embedded Lua programming language to automate advanced network tasks. NSE scripts extend Nmap's functionality beyond port scanning to include advanced vulnerability detection, backdoor exploitation, and complex service enumeration, directly interfacing with the discovered network daemons.</p>
      <p>Imagine Nmap is a smart robot dog that barks at open doors. That is helpful, but what if you could plug in magical chips that teach it new tricks? "When you find a door, go inside and guess the password!" The Nmap Scripting Engine (NSE) is exactly this! It turns Nmap into a massive multi-tool that runs mini-programs (scripts) to automatically check for famous security holes the instant it finds an open door.</p>
      <h3>Script Categories and Usage</h3>
      <div class="step-block">
        <div class="step-num">Categories</div>
        <div class="step-body"><strong>NSE Categories</strong><br>Scripts are grouped into categories: <code>safe</code>, <code>default</code>, <code>vuln</code> (checks for vulnerabilities), <code>exploit</code>, and <code>brute</code> (password guessing).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Execution</div>
        <div class="step-body"><strong>Running Scripts</strong><br>Use <code>--script=[category or name]</code>. For example, <code>nmap --script=vuln &lt;target&gt;</code> runs all vulnerability scripts. Use <code>nmap --script=banner -p 80 &lt;target&gt;</code> to grab a service banner.</div>
      </div>`,
    questions: [
      { q: "What Nmap flag is used to run NSE scripts?", a: "--script", hint: "Check the command reference blocks." },
      { q: "Where are NSE scripts stored on Kali Linux?", a: "/usr/share/nmap/scripts/", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What programming language are NSE scripts written in?", a: "Lua", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Which NSE script category checks for known vulnerabilities?", a: "vuln", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What NSE script checks if an FTP server allows login without a password?", a: "ftp-anon", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "Capture the Flag — Deep Dive Challenge",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/nmap_deepdive_challenge.png" alt="Deep Dive Challenge"></div>
      <h3>Advanced NSE Application Challenge</h3>
      <p>Service banner grabbing via NSE scripts is a critical technique for accurately fingerprinting custom or non-standard daemons. In this practical challenge, you will utilize full-spectrum port scanning to locate hidden services and execute specific NSE scripts to extract embedded flags from their TCP handshakes.</p>
      <p>It is time to put your advanced Nmap skills to the test! You will perform a full port discovery scan to find hidden doors, and then use NSE scripts to talk to those doors and extract the hidden flags. Connect to Kali and begin the hunt!</p>
      <h3>Challenge Execution</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Scan All Ports</strong><br>Run <code>nmap -p- host.docker.internal</code> to discover hidden ports (e.g., 2121 and 54321).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Extract FTP Banner</strong><br>Use <code>nmap -p 2121 --script banner host.docker.internal</code> to read the FTP welcome message and extract Flag Part 1.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Extract Secret Banner</strong><br>Use <code>nmap -p 54321 --script banner host.docker.internal</code> to communicate with the mystery service and extract Flag Part 2. Combine them to complete the CTF.</div>
      </div>`,
    questions: [
      { q: "What port is the FTP service running on?", a: "2121", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What port is the secret service running on?", a: "54321", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is Flag Part 1? (starts with CTF{)", a: "CTF{nm4p_d33p_", hint: "Check the command reference blocks." },
      { q: "What is Flag Part 2? (ends with })", a: "d1v3_m4st3r}", hint: "Check the command reference blocks." },
      { q: "What is the complete combined final flag?", a: "CTF{nm4p_d33p_d1v3_m4st3r}", hint: "Check the command reference blocks." }
    ]
  }
];
