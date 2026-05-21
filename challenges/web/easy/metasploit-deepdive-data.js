const LESSONS = [
  //  LESSON 1: THE METASPLOIT DATABASE 
  {
    title: "The Metasploit Database (db_status)",
    points: 40,
    icon: "",
    practical: false,
    content: `THE SECRET NOTEBOOK
Imagine you are a detective hired to investigate a giant warehouse with hundreds of locked doors and rooms. If you don't write down which doors you've checked, which keys worked on which locks, and what treasures you found inside each room, you will quickly get confused and lost. To prevent this, the Metasploit framework uses a built-in database (a system called PostgreSQL) to act like a smart, organized digital notebook. It automatically records every target computer it discovers, every open door (port), and every vulnerability it finds.

THE CHAPTER SYSTEM
Inside this digital notebook, you can create separate chapters called "Workspaces" so your notes don't get mixed up. For example, if you are testing the billing office network and the customer support network, you make a workspace for each. You can run commands inside Metasploit to manage your notes: "db_status" checks if your database notebook is connected, "workspace" lists or creates chapters, "db_nmap" runs a scan and saves the results directly to the database, and the "hosts" and "services" commands print a neat table of the targets and programs discovered.`,
    questions: [
      { q: "What database management system does Metasploit integrate with? (one word)", a: "postgresql" },
      { q: "What command verifies the connection status of the Metasploit database?", a: "db_status" },
      { q: "What command creates a new workspace named 'internal'?", a: "workspace -a internal" },
      { q: "What command runs an Nmap version scan on 10.10.10.5 and saves it directly to the database?", a: "db_nmap -sV 10.10.10.5" },
      { q: "What command lists all discovered services across all hosts in the database?", a: "services" }
    ]
  },

  //  LESSON 2: METASPLOIT MODULE TYPES & PATHS 
  {
    title: "Module Types, Search Filters & Context",
    points: 50,
    icon: "",
    practical: false,
    content: `THE TOOL CABINET
Metasploit has thousands of different hacking programs organized into a neat cabinet of folders. Every tool has a path name that looks like: "type/platform/service/name". For example, "exploit/linux/http/webmin_backdoor" tells you that the tool is an exploit, built for a Linux operating system, targeting a web server service (HTTP), and its name is "webmin_backdoor". Knowing this layout helps you navigate the system and select the right tool for the job.

THE SEARCH FILTERS
Because the cabinet has over 2000 tools, using a standard search can return too many results. To help you, Metasploit lets you use filters like "type:" to search for specific tool categories, "platform:" to search for operating systems, "port:" to target specific ports, or "cve:" to find tools matching a specific security advisory year. When you find a tool, you can type "info" followed by its path to read a detailed description of what it does, who wrote it, and its reliability ranking (with "excellent" being the most reliable).`,
    questions: [
      { q: "What search filter restricts search results to 'exploit' modules only?", a: "type:exploit" },
      { q: "What search filter restricts results to the Windows platform?", a: "platform:windows" },
      { q: "What command displays detailed information (description, authors, targets) for a specific module?", a: "info" },
      { q: "What reliability rank is considered the highest/most reliable in Metasploit?", a: "excellent" }
    ]
  },

  //  LESSON 3: PAYLOADS DEEP DIVE (STAGED VS UNSTAGED) 
  {
    title: "Payloads: Staged vs Unstaged",
    points: 50,
    icon: "",
    practical: false,
    content: `THE DROPPED BOXES
When you successfully bypass a server's security lock, you send a payload—which is the computer code you want to run. Metasploit divides payloads into two types: Staged and Unstaged. A staged payload is split into two steps. First, you send a tiny code snippet (Stage 0, or the Stager) whose only job is to connect back to your Kali machine and download the larger, main program (Stage 1). This is useful when the security hole only allows you to send a tiny message at first.

THE ALL-IN-ONE PACKAGE
An unstaged payload is a single, complete package that contains the entire program in one go. It is much larger, but because it doesn't need to make a second connection to download more code, it is more stable and works in networks that block extra downloads. You can easily tell them apart by looking at their path names: staged payloads use a slash (like "windows/meterpreter/reverse_tcp"), while unstaged payloads use an underscore (like "windows/meterpreter_reverse_tcp"). The most advanced payload is "Meterpreter," which runs entirely inside the computer's memory so it doesn't leave files on the hard drive!`,
    questions: [
      { q: "What type of payload is split into a tiny stager and a larger stage? (one word)", a: "staged" },
      { q: "Does the payload path 'linux/x86/shell/reverse_tcp' represent a staged or unstaged payload?", a: "staged" },
      { q: "Does the payload path 'linux/x86/shell_reverse_tcp' represent a staged or unstaged payload?", a: "unstaged" },
      { q: "What is the name of Metasploit's advanced, in-memory payload that avoids writing to the target's disk?", a: "meterpreter" }
    ]
  },

  //  LESSON 4: EXPLOITING WEB APPLICATIONS 
  {
    title: "Exploiting Web Applications via Metasploit",
    points: 60,
    icon: "",
    practical: false,
    content: `TARGETING THE WEBSITES
Metasploit is famous for network attacks, but it also contains a massive library of web application scanners and exploits. When targeting web servers, we must configure specific variables so the exploit knows where to go. "LHOST" is your local IP address, which tells the server where to send the reverse shell connection. "LPORT" is the port on your Kali machine that is listening for that connection.

THE WEB DIRECTORY
Because web applications don't always run on the homepage, Metasploit uses a setting called "TARGETURI" to define the directory folder where the vulnerable application is installed (like "/blog" or "/app"). If the website requires an encrypted connection, you must also set the "SSL" variable to true. Before running an exploit, you should run scanners like "http_version" to check the server type, and use the "check" command which probes the target to see if the vulnerability exists without actually launching any exploit code.`,
    questions: [
      { q: "What option defines the local listening IP of the attacker for reverse connections?", a: "LHOST" },
      { q: "What option defines the path directory where the web application is hosted? (e.g. /wp-content)", a: "TARGETURI" },
      { q: "What command tests if a target is vulnerable without actually executing the exploit payload?", a: "check" },
      { q: "What option must be set to 'true' if the web server requires HTTPS? (three letters)", a: "SSL" }
    ]
  },

  //  LESSON 5: PRACTICAL CHALLENGE (DOCKER PANELS SHOWN HERE) 
  {
    title: "Practical — Exploit the Target API",
    points: 60,
    icon: "",
    practical: true,
    content: `THE SECRET DIAGNOSTICS
In this lesson, you are going to exploit a real live target server running inside a Docker container! The target represents a company API portal that has a diagnostics page located at "/api/diagnostics?cmd=ping". The developers forgot to clean the input, allowing users to type commands directly into the "cmd" parameter. When you send a command, the server executes it on the operating system, which is a classic Command Injection vulnerability.

URL SPELLING RULES
Because web browsers use special rules for URL text, we cannot use spaces or semicolons directly. We must use "URL Encoding," which replaces special characters with percent codes: a semicolon (;) becomes "%3B" and a space becomes "%20". In terminal language, a semicolon tells the system: "Run the first command, and then immediately run this second command." If we send the payload "cmd=ping%3Bcat%20/etc/flag", the server will run ping, see the semicolon, and run "cat /etc/flag" to print the secret flag!

RUNNING THE COMMAND
To perform the attack, click the "Launch Target Server" and "Start Kali Container" buttons. Connect to your Kali container using the command shown in the box, and type the curl command to visit the diagnostics page with our encoded payload. The server will execute the command and return a JSON message containing the secret flag on your screen! Copy the flag, go to the next lesson, and paste it into the answer box to complete the challenge.`,
    questions: [
      { q: "What Linux command did you use to make HTTP requests from the Kali terminal? (one word)", a: "curl" },
      { q: "What is the URL-encoded representation of a semicolon? (e.g. %XX)", a: "%3B" },
      { q: "What is the vulnerable API endpoint path on the target server?", a: "/api/diagnostics" }
    ]
  },

  //  LESSON 6: FLAG SUBMISSION 
  {
    title: " Capture the Flag",
    points: 20,
    icon: "",
    practical: false,
    content: `SUBMITTING THE TREASURE
Congratulations on completing the exploitation phase! If you ran the curl command in your Kali terminal, the server returned a JSON response containing the secret flag. The flag looks like "FLAG{...}". Copy the exact flag value from your terminal, return to this page, and paste it into the box below to claim your points.

RECAP OF THE DEEP DIVE
Let's review the advanced skills you learned today! You studied the Metasploit database (db_status, workspaces, and hosts tables), module structures and search filters, staged versus unstaged payloads, and key web options (LHOST and TARGETURI). You also practiced hands-on command injection using URL encoding to read sensitive files.

THE POWER OF INPUT SANITIZATION
This lesson shows why input sanitization is so important. When building applications, developers must never pass user input directly to system command shells. Instead, they should use secure APIs that do not invoke the operating system shell, or run input through strict sanitization filters that strip away characters like semicolons and pipes, keeping their servers safe from injection attacks.`,
    questions: [
      { q: "Submit the flag you captured from the vulnerable target:", a: "FLAG{MSF_D33P_D1V3_M4ST3R}" }
    ]
  }
];
