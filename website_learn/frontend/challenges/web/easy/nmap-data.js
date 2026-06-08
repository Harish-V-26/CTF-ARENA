const LESSONS = [
  {
    title: "1. What is Nmap?",
    points: 20,
    icon: "../../../assets/nmap_whatis.png",
    html: `<div class="htb-diagram-container"><img src="../../../assets/nmap_whatis.png" alt="What is Nmap?"></div>
      <h3>Network Mapper (Nmap)</h3>
      <p>Nmap (Network Mapper) is an open-source utility for network discovery and security auditing. It uses raw IP packets in novel ways to determine what hosts are available on the network, what services (application name and version) those hosts are offering, what operating systems they are running, what type of packet filters/firewalls are in use, and dozens of other characteristics.</p>
      <p>Imagine you are an explorer looking for treasure in a dark castle with thousands of doors. You need to know which are open, which are locked, and what is behind them. Networks are like that castle, and hackers use a magical flashlight called Nmap! You tell this robot explorer to run down the digital hallways, jiggle every door handle (ports), and report exactly which computers are on and what doors are wide open!</p>
      <h3>Nmap Usage and Rules</h3>
      <div class="step-block">
        <div class="step-num">Concept</div>
        <div class="step-body"><strong>Industry Standard</strong><br>Created in 1997 by Gordon "Fyodor" Lyon, Nmap is the most famous scanning tool globally, utilized heavily by security professionals and frequently featured in Hollywood movies like The Matrix.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Rule</div>
        <div class="step-body"><strong>Authorization Required</strong><br>Scanning a network without explicit permission is illegal. Only use Nmap on your own infrastructure or in authorized testing environments like this lab.</div>
      </div>`,
    questions: [
      { q: "What does Nmap stand for?", a: "Network Mapper", hint: "Review the definitions and acronyms section." },
      { q: "What year was the famous Nmap tool created?", a: "1997", hint: "Look for the specific tools mentioned in the lesson." },
      { q: "What do we call the 'digital doors' on a computer that Nmap checks?", a: "ports", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Is Nmap a free tool that anyone can use? (yes/no)", a: "yes", hint: "Look for the specific tools mentioned in the lesson." },
      { q: "Is it legal to use Nmap on a stranger's computer without permission? (yes/no)", a: "no", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "2. Why Do We Use Nmap?",
    points: 20,
    icon: "../../../assets/nmap_why.png",
    html: `<div class="htb-diagram-container"><img src="../../../assets/nmap_why.png" alt="Why Do We Use Nmap?"></div>
      <h3>Reconnaissance and Enumeration</h3>
      <p>Reconnaissance is the foundational phase of any penetration test. Nmap provides detailed enumeration capabilities that allow an attacker or defender to map the attack surface by identifying live hosts, open ports, running services, and underlying operating systems before any exploitation is attempted.</p>
      <p>If you want to break into a fortress, you don't just run up and hit the gate with a stick. You sit on a hill with binoculars, sketching a map and finding the weakest window. In cybersecurity, this is "Reconnaissance". Nmap is the ultimate pair of digital binoculars. If you don't do reconnaissance, you are guessing in the dark. Nmap turns the lights on!</p>
      <h3>The Five Objectives</h3>
      <div class="step-block">
        <div class="step-num">Objectives</div>
        <div class="step-body"><strong>What Nmap Answers</strong><br>
        1. Is the machine online? (Host Discovery)<br>
        2. What doors are open? (Port Scanning)<br>
        3. What is running? (Service/Version Detection)<br>
        4. What OS is it? (OS Detection)<br>
        5. Are there known vulnerabilities? (Nmap Scripting Engine - NSE)</div>
      </div>`,
    questions: [
      { q: "What is the very first step of any hacking mission called?", a: "Reconnaissance", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What Nmap feature checks for specific known security holes using scripts?", a: "NSE", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What do we call the good-guy hackers who test companies' armor?", a: "Penetration Testers", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Does Nmap try to guess if the computer is running Windows or a Mac? (yes/no)", a: "yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "How many total 'doors' (ports) does Nmap have to check?", a: "65,535", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "3. How Does Nmap Actually Work?",
    points: 20,
    icon: "../../../assets/nmap_how.png",
    html: `<div class="htb-diagram-container"><img src="../../../assets/nmap_how.png" alt="How Does Nmap Actually Work?"></div>
      <h3>TCP Three-Way Handshake and Port States</h3>
      <p>Nmap interacts with the Transmission Control Protocol (TCP) at a low level. A standard connection utilizes a three-way handshake (SYN, SYN-ACK, ACK). Nmap manipulates this sequence (e.g., in a Stealth Scan by sending an RST instead of the final ACK) to determine port states without fully establishing a connection, thus evading basic logging mechanisms.</p>
      <p>Imagine saying to a friend, "Hi, want to talk?" They say, "Sure!" You reply, "Great, ready!" This three-step greeting is the "TCP Three-Way Handshake." Nmap uses this to find open doors. It sends the first 'Hello' (SYN). If the door is locked, the server yells "Go away!" (RST). If open, it says "Hello back!" (SYN-ACK). To be sneaky, Nmap suddenly yells "Never mind!" (RST) and runs away before the server writes its name in the logbook!</p>
      <h3>Understanding Port States</h3>
      <div class="step-block">
        <div class="step-num">State 1</div>
        <div class="step-body"><strong>Open</strong><br>A program is actively listening on the port. This is the primary target for attackers.</div>
      </div>
      <div class="step-block">
        <div class="step-num">State 2</div>
        <div class="step-body"><strong>Closed</strong><br>The host responded, but no application is listening on that port.</div>
      </div>
      <div class="step-block">
        <div class="step-num">State 3</div>
        <div class="step-body"><strong>Filtered</strong><br>A firewall or network filter is dropping the packets. Nmap receives no response or an ICMP error, unable to determine if it is open or closed.</div>
      </div>`,
    questions: [
      { q: "What is the three-step greeting computers use to start talking called?", a: "TCP Three-Way Handshake", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What are the three steps of the handshake? (type: SYN, SYN-ACK, ACK)", a: "SYN, SYN-ACK, ACK", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What does Nmap do in a Stealth Scan after the server says 'Hello back'?", a: "sends an 'RST' (Never mind!) and runs away", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What state means a program is happily listening behind the door?", a: "open", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What state means a security wall (firewall) is blocking Nmap's packets?", a: "filtered", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "4. The Different Scan Types",
    points: 20,
    icon: "../../../assets/nmap_scantypes.png",
    html: `<div class="htb-diagram-container"><img src="../../../assets/nmap_scantypes.png" alt="The Different Scan Types"></div>
      <h3>Scan Flags and Aggressiveness</h3>
      <p>Nmap operates via command-line flags that define its operational parameters. These range from stealthy SYN scans (<code>-sS</code>) to noisy, comprehensive Aggressive scans (<code>-A</code>). Attackers choose flags based on the required operational security (OPSEC) and the specific enumeration goals for the target.</p>
      <p>Nmap is a giant toolbox! You tell it what tool to use with a "flag" (like <code>-sS</code> for Stealth Scan). If you just want to check if a computer is awake without checking doors, you yell "Are you there?" with a Ping Scan (<code>-sn</code>). If you want Nmap to do absolutely everything at once—find doors, ask what software is running, and guess the OS—you use the Aggressive Scan (<code>-A</code>). It's like ordering the biggest, messiest burger on the menu! It gives huge information, but it is extremely loud and sets off alarms.</p>
      <h3>Common Flags</h3>
      <div class="step-block">
        <div class="step-num">Flags</div>
        <div class="step-body"><strong>Key Scanning Options</strong><br>
        <code>-sS</code> : Stealth SYN Scan (default with root privileges).<br>
        <code>-sV</code> : Version Detection (probes open ports for service info).<br>
        <code>-O</code> : OS Detection (fingerprints the operating system).<br>
        <code>-A</code> : Aggressive Scan (enables OS detection, version detection, script scanning, and traceroute).</div>
      </div>`,
    questions: [
      { q: "What flag do you type to use the sneaky Stealth Scan?", a: "-sS", hint: "Check the command reference blocks." },
      { q: "What flag do you type to politely ask the open door what software version it is running?", a: "-sV", hint: "Check the command reference blocks." },
      { q: "What flag do you type to guess if the computer is running Windows or Linux?", a: "-O", hint: "Check the command reference blocks." },
      { q: "What flag does absolutely everything at once (the 'Everything Burger')?", a: "-A", hint: "Check the command reference blocks." },
      { q: "Is the Aggressive Scan (-A) sneaky and quiet, or extremely loud and messy?", a: "loud and messy", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "5. Practical: Discovering Live Hosts",
    points: 30,
    icon: "../../../assets/nmap_hosts.png",
    html: `<div class="htb-diagram-container"><img src="../../../assets/nmap_hosts.png" alt="Practical: Discovering Live Hosts"></div>
      <h3>Host Discovery (Ping Sweep)</h3>
      <p>Host discovery is the process of mapping active IP addresses on a network segment before performing deep port scanning. By issuing ICMP Echo Requests or TCP ACK packets to a subnet (e.g., <code>192.168.1.0/24</code>), testers efficiently isolate live targets from dead IP space.</p>
      <p>It is time to act like a real explorer! First, figure out who is awake. You don't want to waste hours knocking on the doors of a plugged-out computer! Imagine shining a flashlight in a dark hallway; if someone is there, light bounces back. Nmap does this by sending a "Ping". If a firewall blocks the ping, the computer hides! Hackers use the <code>-Pn</code> flag to say, "Assume the computer is awake, ignore the ping, and just check the doors!"</p>
      <h3>Practical Execution</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Ping Scan</strong><br>Use <code>nmap -sn 192.168.1.0/24</code> to perform a ping sweep of an entire subnet without port scanning.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Bypass Ping Filters</strong><br>Use <code>nmap -Pn &lt;target&gt;</code> to force a port scan on a host that is blocking ICMP ping requests.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Reading Output</strong><br>Look for the output <code>Host is up</code> which confirms the target is online and responding.</div>
      </div>`,
    questions: [
      { q: "What flag do you use to do a Ping scan to see who is awake without checking doors?", a: "-sn", hint: "Check the command reference blocks." },
      { q: "What does Nmap send to see if a computer is awake, like shining a flashlight?", a: "a Ping (echo request)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What flag tells Nmap to ignore the Ping and assume the computer is awake?", a: "-Pn", hint: "Check the command reference blocks." },
      { q: "What phrase does Nmap print to tell you the computer is awake and ready?", a: "Host is up", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the fancy word for how long it took the ping to bounce back?", a: "latency", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "6. Practical: Scanning Open Ports",
    points: 30,
    icon: "../../../assets/nmap_ports.png",
    html: `<div class="htb-diagram-container"><img src="../../../assets/nmap_ports.png" alt="Practical: Scanning Open Ports"></div>
      <h3>Port Specification and Discovery</h3>
      <p>By default, Nmap scans the 1,000 most common ports. To conduct a thorough security assessment and uncover services hidden on non-standard ports (such as backdoors or administrative panels), security professionals specify full port ranges using the <code>-p-</code> flag, scanning all 65,535 TCP ports.</p>
      <p>Nmap normally checks the 1,000 most popular doors (like Web on 80). It saves time! But hackers know security guards watch popular doors closely. If a hacker installs a secret backdoor, they hide it on a weird high number like door 31337. If you only scan the top 1,000, you miss the secret hideout! Using the special flag <code>-p-</code> forces the robot to check every single door from 1 to 65,535.</p>
      <h3>Practical Execution</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Targeted Ports</strong><br>Use <code>nmap -p 80,443 &lt;target&gt;</code> to rapidly scan only specific ports (e.g., HTTP and HTTPS).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Full Port Scan</strong><br>Use <code>nmap -p- &lt;target&gt;</code> to scan all 65,535 ports to uncover hidden or non-standard services.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Common Ports</strong><br>Memorize key ports: 21 (FTP), 22 (SSH), 80 (HTTP), 443 (HTTPS), and 3306 (MySQL).</div>
      </div>`,
    questions: [
      { q: "If you don't give it any special instructions, how many popular doors does Nmap check?", a: "1,000", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What flag do you use to tell Nmap to check every single one of the 65,535 doors?", a: "-p-", hint: "Check the command reference blocks." },
      { q: "What kind of treasure is usually hiding behind door 80?", a: "a Website (HTTP)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is door 22 (SSH) used for?", a: "administrators controlling the computer from far away", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Why might a hacker hide their secret backdoor on a weird door like 31337?", a: "Because security guards only watch the popular doors", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "7. Practical: Saving Your Work",
    points: 30,
    icon: "../../../assets/nmap_saving.png",
    html: `<div class="htb-diagram-container"><img src="../../../assets/nmap_saving.png" alt="Practical: Saving Your Work"></div>
      <h3>Output Formats and Data Export</h3>
      <p>Retaining scan data is critical for reporting, compliance, and integrating with other security tools. Nmap supports multiple output formats: Normal (human-readable), XML (machine-readable for tools like Metasploit), and Grepable (optimized for command-line parsing using bash utilities like grep and awk).</p>
      <p>Imagine spending three hours exploring a castle, but you drop your notebook in a puddle and the ink washes away! When you run Nmap, the answers print on the black screen. If you close it, they vanish. Real hackers always save their report cards into a permanent file! You can save a "Normal" file for humans, an "XML" file for other hacking tools, or use the ultimate trick: the <code>-oA</code> flag to save all three versions at once!</p>
      <h3>Saving Formats</h3>
      <div class="step-block">
        <div class="step-num">Format 1</div>
        <div class="step-body"><strong>Normal Output (-oN)</strong><br>Saves the output exactly as it appears on the terminal screen. Good for human review.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Format 2</div>
        <div class="step-body"><strong>XML Output (-oX)</strong><br>Saves in XML format, which is easily imported into vulnerability scanners or the Metasploit Framework.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Format 3</div>
        <div class="step-body"><strong>All Formats (-oA)</strong><br>Outputs Normal, XML, and Grepable (.gnmap) simultaneously using a specified base filename.</div>
      </div>`,
    questions: [
      { q: "Why is it important to save your Nmap scan results into a file?", a: "So they don't disappear when you close the screen", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Which flag saves a 'Normal' file that is easy for humans to read?", a: "-oN", hint: "Check the command reference blocks." },
      { q: "Which flag saves an 'XML' file that other hacking tools can easily read?", a: "-oX", hint: "Check the command reference blocks." },
      { q: "What does the amazing '-oA' flag do?", a: "saves all three types of files at once", hint: "Check the command reference blocks." },
      { q: "If you use '-oA myscan', what three files does Nmap create?", a: "myscan.nmap, myscan.xml, and myscan.gnmap", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "8. Mission: NexaCorp Reconnaissance",
    points: 40,
    icon: "../../../assets/nmap_mission.png",
    html: `<div class="htb-diagram-container"><img src="../../../assets/nmap_mission.png" alt="Mission: NexaCorp Reconnaissance"></div>
      <h3>Comprehensive Scanning Strategy</h3>
      <p>Professional penetration testing requires a structured methodology: identifying live hosts, mapping all ports, enumerating specific service versions and OS fingerprints, and securely documenting the findings. Chaining Nmap flags allows for a complete, holistic view of the target's attack surface.</p>
      <p>Your first official mission! NexaCorp hired you as a Penetration Tester. They accidentally left dangerous doors open, and you must find them. To do a pro job, use your tools in order: Ping scan to find the awake servers, check all 65,535 doors, politely ask the software versions (<code>-sV</code>), guess the OS (<code>-O</code>), and finally use the Aggressive Scan and save your files (<code>-oA</code>) to write a brilliant report for the boss!</p>
      <h3>Mission Objectives</h3>
      <div class="step-block">
        <div class="step-num">Task 1</div>
        <div class="step-body"><strong>Identify Services</strong><br>Review the flags required to extract detailed version and OS information (<code>-sV</code> and <code>-O</code>).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Task 2</div>
        <div class="step-body"><strong>Documentation</strong><br>Understand the professional requirement of utilizing the <code>-oA</code> flag to generate artifacts for reporting.</div>
      </div>`,
    questions: [
      { q: "What is your pretend job title for this mission?", a: "Penetration Tester", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Why did NexaCorp hire you to scan their computers?", a: "to see if they accidentally left dangerous doors open", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What flag do you use for Objective 3 to find out exactly what software is running?", a: "-sV", hint: "Check the command reference blocks." },
      { q: "What flag do you use for Objective 4 to figure out if it is Windows or Linux?", a: "-O", hint: "Check the command reference blocks." },
      { q: "Why do professional hackers need to save their Nmap files? (To write good...)", a: "reports", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "9. Capture the Flag — Nmap Challenge",
    points: 50,
    icon: "../../../assets/nmap_challenge.png",
    html: `<div class="htb-diagram-container"><img src="../../../assets/nmap_challenge.png" alt="Capture the Flag — Nmap Challenge"></div>
      <h3>CTF Practical Application</h3>
      <p>Apply full-range port scanning and service version detection against the live containerized target. Extracting sensitive data from hidden service banners is a common real-world technique for locating embedded flags or administrative credentials.</p>
      <p>The moment of truth! You must use your Kali terminal to scan the live target (<code>host.docker.internal</code>) and capture a hidden flag. The creators hid a secret door in the high numbers. A normal scan won't find it; you MUST use the flag to check all 65,535 doors! Once found, use Version Detection to politely ask the secret door what software it is running, and the door will accidentally blurt out the secret CTF flag!</p>
      <h3>Challenge Execution</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Scan All Ports</strong><br>Run <code>nmap -p- host.docker.internal</code> to discover the high-numbered secret port.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Extract the Banner</strong><br>Run a version scan targeting the discovered secret port (e.g., <code>nmap -sV -p &lt;SECRET_PORT&gt; host.docker.internal</code>).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Capture the Flag</strong><br>Read the version output carefully. Extract the flag format <code>CTF{...}</code> and submit it below.</div>
      </div>`,
    questions: [
      { q: "What is the secret target name you need to scan in this challenge?", a: "host.docker.internal", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What flag must you use to find the secret 5-digit door?", a: "-p-", hint: "Check the command reference blocks." },
      { q: "What is the normal, boring door that Nmap finds right away?", a: "8880", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the secret, 5-digit high door number you discovered?", a: "31337", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag you retrieved from the secret door? (format: CTF{...})", a: "CTF{n4v1g4t1ng_p0rts_w1th_nm4p}", hint: "Check the command reference blocks." }
    ]
  }
];
