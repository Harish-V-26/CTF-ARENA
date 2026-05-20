const LESSONS = [
  {
    title: "Advanced Scan Types",
    points: 30,
    content: "Welcome to the Nmap Deep Dive lab! In the introductory room, you learned about SYN scans (-sS) and TCP Connect scans (-sT). Now, we will explore advanced TCP scan types designed to bypass stateless firewalls and filters: Null, FIN, and Xmas scans.\n\n🛠️ How They Work:\nAccording to the TCP specification (RFC 793), closed ports MUST respond with a RST (Reset) packet to any incoming TCP packet that does not have the SYN, RST, or ACK flags set. However, open ports should ignore these unexpected packets. Nmap leverages this behavior:\n\n1. Null Scan (-sN):\n   • Sets no flags in the TCP header (all 0s).\n   • Command: nmap -sN <target-ip>\n   • Open port: Ignores the packet (no response).\n   • Closed port: Responds with a RST packet.\n\n2. FIN Scan (-sF):\n   • Sets only the FIN flag (used to close a connection).\n   • Command: nmap -sF <target-ip>\n   • Open port: Ignores the packet (no response).\n   • Closed port: Responds with a RST packet.\n\n3. Xmas Scan (-sX):\n   • Sets the FIN, PSH, and URG flags simultaneously (lighting the packet up like a Christmas tree!).\n   • Command: nmap -sX <target-ip>\n   • Open port: Ignores the packet (no response).\n   • Closed port: Responds with a RST packet.\n\n🛡️ Why Use Them?\nBecause these scans do not contain the standard SYN flag, simple, stateless packet filters and firewalls configured to block incoming SYN packets will let these scans pass straight through to the target.\n\n⚠️ The Catch:\n• Some operating systems, notably Microsoft Windows and many network devices, do not fully follow RFC 793. They respond with a RST packet regardless of whether the port is open or closed. Therefore, these scans are highly effective against Linux/UNIX-based targets but will report all ports as closed on Windows systems.\n• Firewalls that are stateful (tracking connection states) will easily block these scans.\n\nTASK: Answer the questions below.",
    questions: [
      { q: "What flag performs a Null scan?", a: "-sN" },
      { q: "What flag performs an Xmas scan?", a: "-sX" },
      { q: "Which TCP flags are set in an Xmas scan? (type: FIN, PSH, URG)", a: "FIN, PSH, URG" },
      { q: "What packet does a closed port send in response to a FIN scan?", a: "RST" },
      { q: "True or False: Null scans work perfectly against Microsoft Windows hosts.", a: "False" }
    ]
  },
  {
    title: "Evasion: Fragmentation & MTU",
    points: 30,
    content: "When scanning a target, you will often encounter firewalls and Intrusion Detection Systems (IDS) designed to block scanning activity. Nmap provides several built-in features to evade these defenses.\n\n🧩 Packet Fragmentation (-f)\nBy default, firewalls inspect incoming packets by reading their headers. If the packet header matches a signature (like a rapid succession of SYN packets to different ports), the firewall blocks it.\n\nTo evade this, you can fragment your packets:\n• Command: nmap -f <target-ip>\n• What it does: Splits the TCP header across several smaller packets (usually 8 bytes each).\n• Result: The packet filter/IDS has to queue and reassemble the fragments to read the full header. If it isn't configured to do reassembly, the scan will bypass the filter undetected!\n• You can use -ff to fragment packets into even smaller 16-byte chunks.\n\n📏 Custom MTU (--mtu)\nInstead of letting Nmap choose the fragment size, you can specify your own Maximum Transmission Unit (MTU):\n• Command: nmap --mtu 24 <target-ip>\n• What it does: Specifies the maximum size of each fragment in bytes.\n• Rule: The MTU value must be a multiple of 8 (e.g., 8, 16, 24, 32, etc.).\n\n⚠️ Troubleshooting Tip:\nPacket fragmentation is most effective when scanning as root/sudo because it requires raw packet creation. Some virtualized networks or modern stateful firewalls automatically reassemble fragments at the network boundary, rendering this evasion technique less effective on those networks.\n\nTASK: Answer the questions below.",
    questions: [
      { q: "What flag tells Nmap to fragment packets into 8-byte chunks?", a: "-f" },
      { q: "What option allows you to specify a custom fragment size?", a: "--mtu" },
      { q: "To what multiple must the MTU value be aligned?", a: "8" },
      { q: "Which flag performs even smaller 16-byte fragmentation? (type: -ff)", a: "-ff" }
    ]
  },
  {
    title: "Evasion: Decoys & IP Spoofing",
    points: 30,
    content: "If a system administrator is monitoring network logs, they will easily see your IP address scanning their systems. Nmap offers two powerful features to hide your identity: Decoys and IP Spoofing.\n\n👥 Decoy Scanning (-D)\nInstead of hiding your scan, decoy scanning mixes your IP address with fake (decoy) IP addresses. To the defender's logs, it looks like a dozen hosts are scanning them simultaneously, making it extremely difficult to pin down the real attacker.\n\n• Command: nmap -D 192.168.1.5,10.0.0.25,ME <target-ip>\n• How it works: Nmap sends probes from the decoy IPs (192.168.1.5, 10.0.0.25) as well as your own IP (represented by 'ME').\n• You can also let Nmap generate random decoy IPs automatically:\n  nmap -D RND:10 <target-ip>   (generates 10 random decoy IPs)\n\n🎭 IP Spoofing (-S)\nIP Spoofing replaces your source IP address with a completely different IP address. The target will believe the scan originated from the spoofed address.\n\n• Command: nmap -S <spoofed-ip> -e <interface> -Pn <target-ip>\n• Requirements: You must specify the network interface (using -e) and disable ping discovery (using -Pn).\n• The Catch: Since the target sends the scan responses back to the spoofed IP, you will NOT receive any scan results unless you are on the same network segment and sniffing the traffic, or have controlled routing!\n\nTASK: Answer the questions below.",
    questions: [
      { q: "What flag enables decoy scanning?", a: "-D" },
      { q: "What keyword represents your own IP address in a decoy list?", a: "ME" },
      { q: "What flag is used to specify a spoofed source IP address?", a: "-S" },
      { q: "What flag must be used to specify the network interface when spoofing?", a: "-e" },
      { q: "Can you easily receive scan replies when spoofing an IP you don't control? (yes/no)", a: "no" }
    ]
  },
  {
    title: "NSE Scripts Deep Dive",
    points: 40,
    content: "The Nmap Scripting Engine (NSE) allows users to write and share scripts to automate networking tasks. These scripts are written in the Lua programming language.\n\nNSE scripts are categorized into several groups:\n• safe: Non-intrusive scripts that won't crash services or consume excessive bandwidth.\n• default: Default scripts run when using -sC or -A.\n• discovery: Explores the network to gather information (e.g., listing SMB shares).\n• vuln: Checks for known vulnerabilities (e.g., MS17-010 EternalBlue).\n• exploit: Attempts to actively exploit a vulnerability.\n• brute: Performs brute-force credential attacks.\n\n🔧 Running NSE Scripts:\n\n1. Run all scripts in a category:\n   nmap --script=vuln <target-ip>\n\n2. Run a specific script:\n   nmap --script=ftp-anon <target-ip>\n\n3. Run multiple categories:\n   nmap --script=\"default or safe\" <target-ip>\n\n4. Grab a service banner:\n   nmap --script=banner -p 54321 <target-ip>\n\n💡 Pro Tip:\nOn Kali Linux, all NSE scripts are stored in `/usr/share/nmap/scripts/`. They all end with the `.nse` extension.\n\nTASK: Answer the questions below.",
    questions: [
      { q: "What flag runs NSE scripts?", a: "--script" },
      { q: "In what directory are NSE scripts stored on Kali? (type: /usr/share/nmap/scripts/)", a: "/usr/share/nmap/scripts/" },
      { q: "What language are NSE scripts written in?", a: "Lua" },
      { q: "Which script category checks for vulnerabilities?", a: "vuln" },
      { q: "What NSE script checks if an FTP server allows anonymous login? (type: ftp-anon)", a: "ftp-anon" }
    ]
  },
  {
    title: "Capture the Flag — Deep Dive Challenge",
    points: 50,
    content: "🏁 FINAL CHALLENGE\n━━━━━━━━━━━━━━━━━\nIt is time to put your advanced Nmap knowledge to the test against our brand new secure target environment.\n\n🎯 Your Instructions:\n\n  1. Start both the Nmap Deep Dive Target and the Kali Linux container above.\n  2. In your Kali terminal, perform an Nmap scan against the target: host.docker.internal\n     Since this machine has hidden services, scan all ports:\n     nmap -p- host.docker.internal\n\n  3. You should discover three open ports:\n     • Port 8881 (HTTP Web Server)\n     • Port 2121 (FTP Server)\n     • Port 54321 (Secret Server)\n\n  4. Port 2121 is running FTP. To get Flag Part 1 using only Nmap tools, run the banner script to read the server's welcome message:\n     nmap -p 2121 --script banner host.docker.internal\n\n  5. Port 54321 is a secret high-security server. Use Nmap's banner script to read its output:\n     nmap -p 54321 --script banner host.docker.internal\n     This will output Flag Part 2.\n\n  6. Combine Flag Part 1 and Flag Part 2 (no spaces) to submit the final flag!\n\n🏆 Complete the challenge, find the flags, and answer the questions below to finish this lab!",
    questions: [
      { q: "What is the host-mapped port for the FTP service?", a: "2121" },
      { q: "What is the host-mapped port for the secret server?", a: "54321" },
      { q: "What is Flag Part 1? (e.g. CTF{...)", a: "CTF{nm4p_d33p_" },
      { q: "What is Flag Part 2? (e.g. ...})", a: "d1v3_m4st3r}" },
      { q: "What is the combined final flag? (format: CTF{...})", a: "CTF{nm4p_d33p_d1v3_m4st3r}" }
    ]
  }
];
