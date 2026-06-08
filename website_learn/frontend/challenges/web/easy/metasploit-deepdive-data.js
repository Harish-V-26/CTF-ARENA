const LESSONS = [
  {
    title: "Meterpreter — Advanced Post-Exploitation",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/msf_adv_lesson1.png" alt="Meterpreter — Advanced Post-Exploitation"></div>
      <h3>Meterpreter In-Memory Payloads</h3>
      <p>Meterpreter is an advanced, dynamically extensible payload that executes entirely within the memory (RAM) of the compromised host, never touching the physical disk. This fileless execution model drastically reduces forensic artifacts and evades many signature-based antivirus solutions. It provides encrypted communication and robust post-exploitation APIs.</p>
      <p>Imagine you have picked the lock and snuck inside a giant castle. You need to steal the jewels, plant microphones, and create secret tunnels without being seen. Meterpreter is an invisible spy that lives inside the castle's walls. Once you exploit a target, this silent agent runs entirely in memory. It never touches the hard drive, making it almost impossible for guard dogs (antivirus) to sniff it out. From this session, you can do almost anything on the target machine.</p>
      <h3>Core Post-Exploitation Commands</h3>
      <div class="step-block">
        <div class="step-num">Cmd 1</div>
        <div class="step-body"><strong>Process & Privilege Management</strong><br><code>migrate &lt;PID&gt;</code> moves Meterpreter into a different stable process (like explorer.exe). <code>getsystem</code> attempts to escalate your privileges to SYSTEM using token duplication.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Cmd 2</div>
        <div class="step-body"><strong>Credential Harvesting</strong><br><code>hashdump</code> extracts NTLM password hashes from the SAM database. <code>load kiwi</code> loads the Mimikatz extension, allowing <code>creds_all</code> to dump plaintext passwords directly from memory.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Cmd 3</div>
        <div class="step-body"><strong>File & Network Operations</strong><br><code>download &lt;file&gt;</code> and <code>upload &lt;file&gt;</code> move files seamlessly. <code>ipconfig</code> and <code>route</code> display network interfaces and routing tables, critical for discovering internal networks.</div>
      </div>`,
    questions: [
      { q: "What Meterpreter command moves your session into a different process for stability?", a: "migrate", hint: "Check the command reference blocks." },
      { q: "What Meterpreter command attempts to escalate privileges to SYSTEM level?", a: "getsystem", hint: "Check the command reference blocks." },
      { q: "What Meterpreter command extracts NTLM password hashes from the SAM database?", a: "hashdump", hint: "Check the command reference blocks." },
      { q: "What Meterpreter extension (loaded via 'load' command) provides Mimikatz functionality?", a: "kiwi", hint: "Check the command reference blocks." },
      { q: "What Meterpreter command shows your current user identity on the target?", a: "getuid", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "Post-Exploitation Modules & Persistence",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/msf_adv_lesson2.png" alt="Post-Exploitation Modules & Persistence"></div>
      <h3>Post-Exploitation and Backdooring</h3>
      <p>Post-exploitation modules in Metasploit leverage an existing session to perform automated intelligence gathering, privilege escalation, and lateral movement. Persistence mechanisms modify OS configurations (like Registry Run Keys or Cron jobs) to ensure an attacker retains access across reboots and credential resets.</p>
      <p>You've broken into the castle, but what happens tomorrow when they fix the lock? A skilled burglar doesn't just steal things — they install a secret hidden door in the castle wall so they can walk right back in whenever they want, even after the original lock is replaced! In Metasploit, "Post" modules are tools designed to run AFTER you've already compromised a target. And "Persistence" is the art of installing that hidden back door.</p>
      <h3>Post Module Categories</h3>
      <div class="step-block">
        <div class="step-num">Cat 1</div>
        <div class="step-body"><strong>GATHER — Intelligence Collection</strong><br>Modules like <code>post/windows/gather/enum_applications</code> list installed software. <code>post/multi/gather/firefox_creds</code> extracts saved passwords from browser profiles.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Cat 2</div>
        <div class="step-body"><strong>ESCALATE & MANAGE</strong><br><code>post/multi/recon/local_exploit_suggester</code> analyzes the target system and suggests local exploits that are likely to work. <code>post/windows/manage/enable_rdp</code> remotely turns on GUI access.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Cat 3</div>
        <div class="step-body"><strong>PERSISTENCE — Maintaining Access</strong><br><code>post/windows/manage/persistence_exe</code> creates a registry key to run your payload on every login. <code>post/linux/manage/sshkey_persistence</code> injects your public key for passwordless SSH access.</div>
      </div>`,
    questions: [
      { q: "What post module analyses a target and suggests local privilege escalation exploits?", a: "post/multi/recon/local_exploit_suggester", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What Meterpreter command sends your current session to the background?", a: "background", hint: "Check the command reference blocks." },
      { q: "What option must you set to tell a post module which Meterpreter session to use?", a: "SESSION", hint: "Check the command reference blocks." },
      { q: "What post module enables Remote Desktop Protocol (RDP) on a Windows target?", a: "post/windows/manage/enable_rdp", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What post module injects an SSH key for persistent Linux access?", a: "post/linux/manage/sshkey_persistence", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "Pivoting & Port Forwarding",
    points: 60,
    html: `<div class="htb-diagram-container"><img src="../../../assets/msf_adv_lesson3.png" alt="Pivoting & Port Forwarding"></div>
      <h3>Network Pivoting</h3>
      <p>Pivoting is the technique of routing traffic from the attacker machine through a compromised host (acting as a proxy) to reach segmented internal networks. It enables attackers to attack isolated systems that are not directly routable from the internet. Metasploit achieves this via internal routing tables (autoroute) and port forwarding.</p>
      <p>Imagine you've broken into Castle A, and from inside, you see Castle B across the moat. Castle B has its drawbridge up — it only talks to Castle A through a private underground tunnel. From outside, you can NEVER reach Castle B directly. But because you're now inside Castle A, you can use its private tunnel to sneak into Castle B! This is "Pivoting" — using a compromised machine as a stepping stone to reach hidden networks.</p>
      <h3>Pivoting Techniques</h3>
      <div class="step-block">
        <div class="step-num">Tech 1</div>
        <div class="step-body"><strong>Autoroute</strong><br><code>run autoroute -s 10.10.10.0/24</code> tells Metasploit to send all traffic for that internal subnet through your active Meterpreter session, allowing you to use scanners against internal hosts.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Tech 2</div>
        <div class="step-body"><strong>Port Forwarding</strong><br><code>portfwd add -l 4444 -p 3389 -r 10.10.10.20</code> creates a tunnel. Connecting to localhost:4444 on your machine tunnels directly to the internal target's RDP port.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Tech 3</div>
        <div class="step-body"><strong>SOCKS Proxy</strong><br>Using <code>auxiliary/server/socks_proxy</code> sets up a proxy. You can then use tools like <code>proxychains nmap</code> to route arbitrary external commands through the compromised host.</div>
      </div>`,
    questions: [
      { q: "What Meterpreter command adds a route to an internal network through a compromised session?", a: "autoroute", hint: "Check the command reference blocks." },
      { q: "What Meterpreter command creates a tunnel from a local port to a remote port through the victim?", a: "portfwd", hint: "Check the command reference blocks." },
      { q: "In the command 'portfwd add -l 4444 -p 3389 -r 10.10.10.20', what does the -l flag specify?", a: "local port", hint: "Check the command reference blocks." },
      { q: "What auxiliary module creates a SOCKS proxy for flexible pivoting?", a: "auxiliary/server/socks_proxy", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What Linux tool routes arbitrary commands through a SOCKS proxy? (one word)", a: "proxychains", hint: "Check the command reference blocks." },
      { q: "What type of host has connections to two separate networks, making it ideal for pivoting? (two words)", a: "dual-homed", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "Evasion — Encoders, Packers & AV Bypass",
    points: 60,
    html: `<div class="htb-diagram-container"><img src="../../../assets/msf_adv_lesson4.png" alt="Evasion — Encoders, Packers & AV Bypass"></div>
      <h3>Payload Obfuscation and Encoding</h3>
      <p>Signature-based Antivirus (AV) solutions detect malware by matching binary sequences. Payload encoders in msfvenom (like shikata_ga_nai) use polymorphic XOR additive feedback algorithms to scramble the binary signature while keeping the payload functionally identical, actively circumventing static AV detection.</p>
      <p>Imagine you're trying to sneak a birthday present past your little brother. If he sees a box wrapped in birthday paper, he'll grab it! So, you disguise it. You wrap it in a brown shopping bag, put that inside a sports bag, and carry it in a backpack. Your brother looks at the backpack and thinks, "Boring." In cybersecurity, Evasion Techniques do exactly this — they disguise malicious payloads so security tools can't recognize them.</p>
      <h3>Msfvenom Obfuscation</h3>
      <div class="step-block">
        <div class="step-num">Tech 1</div>
        <div class="step-body"><strong>Encoders</strong><br><code>msfvenom -p windows/meterpreter/reverse_tcp -e x86/shikata_ga_nai -i 10 -f exe -o payload.exe</code> encodes the payload using Shikata Ga Nai and iterates it 10 times for deep obfuscation.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Tech 2</div>
        <div class="step-body"><strong>Output Formats</strong><br><code>msfvenom</code> can generate payloads as .exe, .elf (Linux), raw bytes, Python scripts, ASP web shells, or VBA macros. Use <code>--list formats</code> to see them all.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Tech 3</div>
        <div class="step-body"><strong>Custom Templates</strong><br>Use <code>-x /path/to/legitimate.exe -k</code> to embed your malicious payload inside a fully functional, legitimate software executable. The user runs the program normally, but the payload executes silently in the background.</div>
      </div>`,
    questions: [
      { q: "What is the name of Metasploit's most famous polymorphic XOR feedback encoder?", a: "shikata_ga_nai", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What msfvenom flag specifies the encoder to use?", a: "-e", hint: "Check the command reference blocks." },
      { q: "What msfvenom flag specifies how many times to re-encode the payload?", a: "-i", hint: "Check the command reference blocks." },
      { q: "What msfvenom command lists all available output formats?", a: "msfvenom --list formats", hint: "Check the command reference blocks." },
      { q: "What msfvenom flag embeds the payload inside a legitimate executable template?", a: "-x", hint: "Check the command reference blocks." },
      { q: "What msfvenom flag keeps the template executable functional while adding the payload?", a: "-k", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "Resource Scripts & Handler Automation",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/msf_adv_lesson5.png" alt="Resource Scripts & Handler Automation"></div>
      <h3>Automation via Resource Scripts</h3>
      <p>Resource scripts (.rc files) are sequential batch files interpreted by msfconsole. They are utilized to automate repetitive tasks, ensure reproducible penetration testing workflows, and rapidly deploy complex multi-handler listeners with customized global configurations across engagements.</p>
      <p>Imagine you had a robot butler who could memorize a perfect sequence of 100 actions: unlock the door, turn on lights, start coffee, and open curtains — all without you saying a word. Every morning, you just press one button and the robot does everything perfectly, in order. Metasploit Resource Scripts are exactly like this robot butler. They are simple text files with a list of commands. Load the script, and Metasploit executes every command automatically!</p>
      <h3>Automation Techniques</h3>
      <div class="step-block">
        <div class="step-num">Tech 1</div>
        <div class="step-body"><strong>Creating a Script</strong><br>Write a plain <code>.rc</code> file containing standard commands like <code>use exploit/multi/handler</code>, <code>set PAYLOAD ...</code>, and <code>exploit -j</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Tech 2</div>
        <div class="step-body"><strong>Executing Scripts</strong><br>Run it inside the console with <code>resource auto_handler.rc</code>, or launch msfconsole with it directly using <code>msfconsole -r auto_handler.rc</code>. Use <code>makerc</code> to save your current session history to a script.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Tech 3</div>
        <div class="step-body"><strong>Handler Configuration</strong><br>Set <code>ExitOnSession false</code> to keep a listener running after catching a session. Use <code>setg RHOSTS ...</code> to define global variables that apply to all modules you load subsequently.</div>
      </div>`,
    questions: [
      { q: "What file extension do Metasploit resource scripts use?", a: ".rc", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What msfconsole command loads and executes a resource script?", a: "resource", hint: "Check the command reference blocks." },
      { q: "What msfconsole command records your current session's commands into a resource script?", a: "makerc", hint: "Check the command reference blocks." },
      { q: "What option keeps the multi/handler listening after receiving a session?", a: "ExitOnSession", hint: "Check the command reference blocks." },
      { q: "What command sets a global variable that persists across all modules?", a: "setg", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "Practical — Advanced Exploitation Chain",
    points: 60,
    html: `<div class="htb-diagram-container"><img src="../../../assets/msf_adv_lesson6.png" alt="Practical — Advanced Exploitation Chain"></div>
      <h3>Multi-Stage Exploitation Chain</h3>
      <p>Real-world attacks rarely involve a single exploit. Advanced exploitation requires a multi-stage methodology: performing initial reconnaissance, exploiting an edge vulnerability (like Command Injection) to establish a foothold, chaining OS commands to enumerate local configurations, and ultimately exfiltrating sensitive data.</p>
      <p>Your Mission: Exploit a vulnerable web API using advanced techniques. The target is the "SecureCorp API Portal" — a server with an OS Command Injection vulnerability at <code>/api/diagnostics?cmd=&lt;command&gt;</code>. You won't just grab a file. You'll perform a realistic attack chain: enumerate the system, discover secrets, and exfiltrate data using command chaining!</p>
      <h3>Attack Chain Walkthrough</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Launch & Recon</strong><br>Launch the Target Server and Kali Container. Note the Target IP. Use <code>curl "http://&lt;TARGET_IP&gt;/api/diagnostics?cmd=id"</code> to discover the user, and <code>uname -a</code> for the OS.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Enumerate Files</strong><br>Use <code>curl "http://&lt;TARGET_IP&gt;/api/diagnostics?cmd=ls%20/"</code> and <code>ls /etc/</code> to find the hidden flag file inside the <code>/etc/</code> directory.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Exfiltrate Data</strong><br>Use command chaining (semicolon = <code>%3B</code> or pipe = <code>%7C</code>). Run <code>curl "http://&lt;TARGET_IP&gt;/api/diagnostics?cmd=id%3Bcat%20/etc/flag"</code>. This executes <code>id</code>, then immediately runs <code>cat /etc/flag</code>, returning the secret!</div>
      </div>`
  }
];
