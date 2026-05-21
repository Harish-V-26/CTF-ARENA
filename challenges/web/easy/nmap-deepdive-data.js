const LESSONS = [
  {
    title: "Advanced Scan Types — Null, FIN, and Xmas",
    points: 30,
    content: `THE SECRET KNOCK
Imagine you are walking down a dark street in a medieval town, trying to find out which houses have people awake inside. If you knock loudly on the front door, the town guards will hear you and chase you away. In computer networks, standard port scans (like SYN scans) are like loud knocks that trigger security alarms. To sneak past firewalls, Nmap uses advanced scan types called Null, FIN, and Xmas scans. These scans use unusual packets to check ports without triggering simple alarm rules.

THE RULES OF THE PROTOCOL
To understand how these scans work, we must look at the rules of the internet protocol (RFC 793). Every data packet has flags that act like labels on a box. A SYN flag means: "I want to start a conversation." A closed port is required to reply to any unexpected packet (except SYN) with an RST (Reset) flag, which means: "Go away, this port is closed." But an open port simply ignores the strange packet and remains completely quiet! Nmap sends these strange packets and listens; if it hears nothing, it knows the port is open!

THE DECORATED XMAS TREE
Let's look at the three scans. A Null scan (-sN) sends a packet with no flags at all. A FIN scan (-sF) sends a packet with only the FIN flag (which usually closes a connection). An Xmas scan (-sX) sends a packet with the FIN, PSH, and URG flags all lit up at the same time, which developers thought looked like a decorated Christmas tree! These scans bypass simple, old-fashioned firewalls that only look for SYN flags. However, they do not work against Windows computers because Windows does not follow the rules and replies with RST to every unexpected packet.`,
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
    content: `THE SHREDDED LETTER
Imagine you want to mail a secret letter to a friend, but your parents inspect every envelope that comes through the door. To hide your message, you take the letter, shred it into tiny strips, put each strip in a separate, small envelope, and mail them all separately! A single strip of paper makes no sense on its own, so the inspectors let the envelopes pass. Once your friend receives all the envelopes, they glue the strips back together to read the message.

SPLITTING THE DATA
In computer networking, this trick is called "Packet Fragmentation." Nmap can split its probe packets into tiny pieces (called fragments) using the "-f" flag. When the fragments travel across the network, simple firewalls and Intrusion Detection Systems (IDS) fail to recognize them as a port scan because they only see small, incomplete packets. The firewall lets them pass, and the target computer's operating system reassembles the fragments automatically before responding!

THE MTU VAULT
You can control the size of these fragments using the "--mtu" (Maximum Transmission Unit) flag. For example, "--mtu 24" tells Nmap to chop the packet headers into chunks of 24 bytes. The MTU value must always be a multiple of 8. If you want even smaller pieces, you can use the "-ff" flag for double fragmentation, which chops the packets into 16-byte fragments. This technique requires administrator privileges on your Kali machine because it involves crafting custom raw network packets.`,
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
    content: `THE ANONYMOUS SENDER
Every computer on the internet has a unique address called an IP address, which is like your home address. When you scan a server, your IP address is written in the server's security logs, allowing administrators to trace the scan back to you. To hide your identity, Nmap provides two powerful strategies: Decoys and IP Spoofing. These techniques confuse the security logs, making it hard to tell who is actually scanning the system.

THE CLONE ARMY
A Decoy scan (-D) works by sending scan packets from your real IP address, but at the same time, sending matching scan packets from several fake IP addresses (decoys) that you specify. When the administrator checks the security logs, they see 10 different computers scanning their ports at the exact same second, making it extremely difficult to identify which scan is the real one! You must include the keyword "ME" in your decoy list so your real address is included, or use "RND:10" to generate 10 random decoys automatically.

THE FORGED RETURN ADDRESS
IP Spoofing (-S) takes this further by faking the return address on the packet. You replace your IP address with a completely different IP. The server will believe the scan came from the forged address. However, there is a big catch: because the return address is faked, the server sends all its replies to the fake computer, not to you! This means you will not receive any scan results unless you are on the local network segment and can sniff the replies as they pass by.`,
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
    content: `THE APP ENGINE
So far, you have used Nmap as a basic scout that tells you which ports are open. But Nmap also has a powerful engine called the Nmap Scripting Engine (NSE) which lets it run plugins or mini-programs. These scripts are written in a programming language called Lua, and they let Nmap automatically perform tasks like checking for known security bugs, guessing passwords, or reading system information on whatever ports it finds open.

THE SCRIPT CLASSIFICATIONS
NSE scripts are stored in the "/usr/share/nmap/scripts/" folder and are grouped into categories. "safe" scripts are gentle probes that will not crash the target. "vuln" scripts check if the target has specific security flaws (like the famous EternalBlue bug). "brute" scripts try to guess logins, and "default" scripts (-sC) run automatically to collect basic info. For example, the script "ftp-anon" automatically checks if an FTP server allows anonymous login without a password. You run scripts using the "--script" flag.`,
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
    content: `THE PORT HUNT
It is time to put your advanced Nmap skills to the test in a real target network! Start by clicking the "Nmap Deep Dive Target" and "Start Kali Container" buttons above. Connect to your Kali machine, and run a scan on all 65,535 ports using the command "nmap -p- host.docker.internal". The target server has hidden services running on non-standard ports that a default scan would completely miss!

THE BANNER REVEAL
Once the scan finishes, you will see three open ports: a web server on port 8881, an FTP server on port 2121, and a secret service on port 54321. To capture the flag, run the NSE banner script against the FTP port: "nmap -p 2121 --script banner host.docker.internal". Look at the output—the welcome banner contains Part 1 of the flag. Next, run the same banner scan on port 54321 to get Part 2. Combine the two parts together to form the final flag and submit it below!`,
    questions: [
      { q: "What port is the FTP service running on?", a: "2121" },
      { q: "What port is the secret service running on?", a: "54321" },
      { q: "What is Flag Part 1? (starts with CTF{)", a: "CTF{nm4p_d33p_" },
      { q: "What is Flag Part 2? (ends with })", a: "d1v3_m4st3r}" },
      { q: "What is the complete combined final flag?", a: "CTF{nm4p_d33p_d1v3_m4st3r}" }
    ]
  }
];
