/* ================================================
   CTF LABS — Kali Linux Advanced Commands Lab Data
   ================================================ */

const LESSONS = [
  {
    title: "1. Nmap — Port Scanning & Service Discovery",
    points: 50,
    html: `
      <h3>What is Nmap?</h3>
      <p><strong>Nmap</strong> (Network Mapper) is an open-source terminal tool for network exploration and security auditing. It acts as an active scanner that sends custom-crafted packets to a target machine to see how it responds.</p>

      <img src="../../../assets/kali_nmap_diagram.png" alt="Nmap Port Scanning Diagram" style="width: 100%; max-width: 600px; display: block; margin: 20px auto; border-radius: 8px; border: 1px solid var(--border-color); box-shadow: 0 4px 20px rgba(0,0,0,0.4);" />

      <div class="analogy-box">
        <strong>The Mailman Analogy:</strong><br>
        Imagine a mailman walks up to a massive apartment complex with 65,535 mailboxes. Instead of delivering mail, he knocks on each door one by one. If someone answers, he notes down that the apartment is occupied (Open Port). He then asks what they do for a living (Service Detection) and tries to guess their age based on their voice (OS Detection). That is exactly what Nmap does to a computer network!
      </div>

      <h3>Core Scan Flags:</h3>
      <ul>
        <li><code>-sS</code> (TCP SYN Scan): A stealthy, fast scan type. It starts a connection handshake but stops halfway through, so the target server doesn't log the full connection.</li>
        <li><code>-sV</code> (Service Version Detection): Probes open ports to determine what software and version are running.</li>
        <li><code>-O</code> (OS Detection): Analyzes packet timings to guess the Operating System of the target.</li>
        <li><code>-p-</code> (Scan All Ports): Scans all 65,535 ports instead of just the top 1,000 common ones.</li>
      </ul>

      <h3>Practical Console Commands</h3>
      <div class="step-block">
        <div class="step-num">Command</div>
        <div class="step-body">
          Run a stealth version scan on the target:
          <pre>nmap -sS -sV -O 10.10.10.50</pre>
        </div>
      </div>
    `,
    questions: [
      { q: "What scan flag tells Nmap to perform a TCP SYN stealth scan?", a: "-sS" },
      { q: "What flag tells Nmap to perform Operating System (OS) detection?", a: "-O" },
      { q: "What flag is used to scan all 65,535 ports?", a: "-p-" }
    ]
  },
  {
    title: "2. Dirb — Web Directory Fuzzing",
    points: 50,
    html: `
      <h3>What is Dirb?</h3>
      <p><strong>Dirb</strong> is a web content scanner. It is a terminal-based tool that looks for hidden files, folders, and directories on a web server by testing them against a pre-defined list of common words (called a wordlist).</p>

      <img src="../../../assets/kali_dirb_diagram.png" alt="Dirb Directory Fuzzing Diagram" style="width: 100%; max-width: 600px; display: block; margin: 20px auto; border-radius: 8px; border: 1px solid var(--border-color); box-shadow: 0 4px 20px rgba(0,0,0,0.4);" />

      <div class="analogy-box">
        <strong>The Dictionary Guessing Game:</strong><br>
        Imagine you are trying to find hidden rooms in a library. Instead of searching the walls, you look at a dictionary of common room names (like "office", "basement", "vault", "attic") and ask the librarian if each one exists. If they say "yes, here is the key" (HTTP 200), you've found a hidden room! Dirb does this automatically by requesting pages like <code>http://example.com/admin</code> or <code>/backup</code> using a wordlist.
      </div>

      <h3>Key Concepts in Directory Fuzzing:</h3>
      <ul>
        <li><strong>Wordlists:</strong> Plain text files containing lists of directories (e.g. <code>common.txt</code>). In Kali Linux, these are stored in <code>/usr/share/wordlists/</code>.</li>
        <li><strong>HTTP Status Codes:</strong> Dirb analyzes server responses. Code <code>200 OK</code> means the page exists. Code <code>403 Forbidden</code> means it exists but is restricted. Code <code>404 Not Found</code> means it doesn't exist.</li>
      </ul>

      <h3>Practical Console Commands</h3>
      <div class="step-block">
        <div class="step-num">Command</div>
        <div class="step-body">
          Scan a website using the default common wordlist:
          <pre>dirb http://10.10.10.50 /usr/share/wordlists/dirb/common.txt</pre>
        </div>
      </div>
    `,
    questions: [
      { q: "What is the file path of the default common directory wordlist in Kali Linux?", a: "/usr/share/wordlists/dirb/common.txt" },
      { q: "What HTTP status code indicates a page was successfully found and accessed?", a: "200" }
    ]
  },
  {
    title: "3. Sqlmap — Automated SQL Injection",
    points: 50,
    html: `
      <h3>What is Sqlmap?</h3>
      <p><strong>Sqlmap</strong> is a powerful terminal tool that automates the process of detecting and exploiting SQL injection vulnerabilities in web applications. It can scan database systems, retrieve schemas, dump database tables, and even read files on the server.</p>

      <img src="../../../assets/kali_sqlmap_diagram.png" alt="Sqlmap Injection Diagram" style="width: 100%; max-width: 600px; display: block; margin: 20px auto; border-radius: 8px; border: 1px solid var(--border-color); box-shadow: 0 4px 20px rgba(0,0,0,0.4);" />

      <div class="analogy-box">
        <strong>The Locksmith Robot Analogy:</strong><br>
        Imagine a mechanical robot that specializes in opening keycard locks. Instead of trying to break the door, the robot plugs in a tester and automatically sends 10,000 different signal combinations in a few seconds. When it finds one that clicks, it opens the safe, lists everything inside, and hands it to you. Sqlmap is that locksmith robot for database inputs.
      </div>

      <h3>Core Parameters:</h3>
      <ul>
        <li><code>-u</code>: Specifies the target URL containing the parameter to scan (e.g. <code>?id=1</code>).</li>
        <li><code>--dbs</code>: Tells sqlmap to list all databases it can find on the server.</li>
        <li><code>--tables</code>: Lists the tables inside the current database.</li>
        <li><code>--dump</code>: Dumps the actual rows and credentials from a specified database table.</li>
      </ul>

      <h3>Practical Console Commands</h3>
      <div class="step-block">
        <div class="step-num">Command</div>
        <div class="step-body">
          Scan a URL parameter and list available databases:
          <pre>sqlmap -u "http://10.10.10.50/view.php?id=1" --dbs</pre>
        </div>
      </div>
    `,
    questions: [
      { q: "What flag specifies the target URL in a Sqlmap scan?", a: "-u" },
      { q: "What parameter flag tells Sqlmap to dump database table rows?", a: "--dump" }
    ]
  },
  {
    title: "4. Hydra — Network Logon Cracker",
    points: 50,
    html: `
      <h3>What is Hydra?</h3>
      <p><strong>Hydra</strong> is a parallelized network login cracker. It is a command-line tool used to test usernames and passwords against services like SSH, FTP, HTTP, and Telnet using dictionary attacks.</p>

      <img src="../../../assets/kali_hydra_diagram.png" alt="Hydra Diagram" style="width: 100%; max-width: 600px; display: block; margin: 20px auto; border-radius: 8px; border: 1px solid var(--border-color); box-shadow: 0 4px 20px rgba(0,0,0,0.4);" />

      <div class="analogy-box">
        <strong>The Rapid Lock Picker:</strong><br>
        Imagine a high-speed mechanical key-turner. You give it a bag containing one username card ("admin") and 1,000 password keys. The machine plugs keys into the lock at a speed of 50 keys per second. When a key turns the lock successfully, it halts and rings a bell, showing you the exact credentials. That is Hydra.
      </div>

      <h3>Core Command Syntax:</h3>
      <ul>
        <li><code>-l</code>: Specifies a single username (lowercase).</li>
        <li><code>-P</code>: Specifies a wordlist file of passwords (uppercase).</li>
        <li><code>-t</code>: Controls the number of parallel tasks (threads) running at once. More tasks mean a faster scan, but can crash the target.</li>
        <li><strong>Service Target:</strong> Written as <code>ssh://IP</code> or <code>ftp://IP</code> at the end of the command.</li>
      </ul>

      <h3>Practical Console Commands</h3>
      <div class="step-block">
        <div class="step-num">Command</div>
        <div class="step-body">
          Brute-force SSH credentials on a target host:
          <pre>hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://10.10.10.50</pre>
        </div>
      </div>
    `,
    questions: [
      { q: "What lowercase flag is used to specify a single username in Hydra?", a: "-l" },
      { q: "What uppercase flag specifies the password wordlist path in Hydra?", a: "-P" },
      { q: "What target prefix tells Hydra that you are brute-forcing Secure Shell?", a: "ssh://" }
    ]
  },
  {
    title: "5. Netcat — The Networking Swiss Army Knife",
    points: 50,
    html: `
      <h3>What is Netcat (nc)?</h3>
      <p><strong>Netcat</strong> (command: <code>nc</code>) is a terminal utility that reads and writes data across network connections using TCP or UDP protocols. It is widely called the "Swiss Army Knife" of networking because it can act as a port scanner, connection client, file transfer system, or backdoor port listener.</p>

      <img src="../../../assets/kali_netcat_diagram.png" alt="Netcat Diagram" style="width: 100%; max-width: 600px; display: block; margin: 20px auto; border-radius: 8px; border: 1px solid var(--border-color); box-shadow: 0 4px 20px rgba(0,0,0,0.4);" />

      <div class="analogy-box">
        <strong>The Paper Cup and String Analogy:</strong><br>
        Imagine two paper cups connected by a long string. If you talk into one cup, your friend hears it in the other. Netcat works the same way: you can tell it to hold a cup to its ear and listen for someone (Listen Mode), or tell it to shout into a cup to connect to someone else (Connect Mode). It is the simplest possible tool to bridge two terminals across the web.
      </div>

      <h3>Common Usage Modes:</h3>
      <ul>
        <li><strong>Listen Mode (<code>nc -lvp &lt;port&gt;</code>):</strong> Opens a local port to listen for incoming connections.</li>
        <li><strong>Connect Mode (<code>nc &lt;ip&gt; &lt;port&gt;</code>):</strong> Establishes a direct connection to a remote server port (often used for banner grabbing).</li>
      </ul>

      <h3>Practical Console Commands</h3>
      <div class="step-block">
        <div class="step-num">Command 1</div>
        <div class="step-body">
          Start a local listener on port 4444:
          <pre>nc -lvp 4444</pre>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Command 2</div>
        <div class="step-body">
          Connect to a web server's HTTP port:
          <pre>nc 10.10.10.50 80</pre>
        </div>
      </div>
    `,
    questions: [
      { q: "What flag places Netcat in 'listen' mode?", a: "-l" },
      { q: "What flag tells Netcat to output verbose connection status logs?", a: "-v" },
      { q: "What flag specifies the local listening port in netcat?", a: "-p" }
    ]
  }
];
