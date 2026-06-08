const LESSONS = [
  {
    title: "1. Text Searching & Stream Manipulation",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/kali_search_diagram.png" alt="Kali Linux File Searching and Filtering"></div>
      <h3>Text Searching & Stream Manipulation</h3>
      <p>In Unix-like operating systems, complex tasks are accomplished by combining small, specialized tools that read and write streams of text. The pipe operator (<code>|</code>) is used to pass the standard output (stdout) of one command directly into the standard input (stdin) of another, creating efficient data processing pipelines.</p>
      <p>Imagine a factory assembly line. <code>find</code> goes into the warehouse to retrieve boxes of files. <code>grep</code> scans each box to see if it matches a query. <code>cut</code> slices off unwanted parts of the files. <code>sort</code> organizes them in order, and <code>uniq</code> discards identical duplicates. Using the pipe symbol, you link these tools into one continuous assembly line!</p>
      <h3>Detailed Command Reference</h3>
      <div class="step-block">
        <div class="step-num">Cmd 1</div>
        <div class="step-body"><strong>find & grep</strong><br><code>find &lt;path&gt; -name "&lt;pattern&gt;"</code> locates files. <code>grep -ri "&lt;pattern&gt;" &lt;path&gt;</code> searches inside files line-by-line for matching text.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Cmd 2</div>
        <div class="step-body"><strong>xargs & cut</strong><br><code>xargs</code> takes output from one command and uses it as arguments for another. <code>cut -d'&lt;delimiter&gt;' -f&lt;field&gt;</code> slices out specific vertical columns from text.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Cmd 3</div>
        <div class="step-body"><strong>sort, uniq, tr, tee</strong><br><code>sort</code> orders lines, <code>uniq</code> removes duplicates, <code>tr</code> translates characters, and <code>tee</code> splits the output to both the screen and a file.</div>
      </div>`,
    questions: [
      { q: "Which grep option is used to search recursively through directories?", a: "-r", hint: "Check the command reference blocks." },
      { q: "Which find option is used to search for files by name (case-insensitive)?", a: "-iname", hint: "Check the command reference blocks." },
      { q: "Which grep option is used to print the line number of each matching line?", a: "-n", hint: "Check the command reference blocks." },
      { q: "Which symbol (like |, >, &) is used to pipe output from one command to another?", a: "|", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "2. Stream Editing & Structured Data Parsing",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/kali_stream_diagram.png" alt="Kali Linux Stream Editing and Data Parsing"></div>
      <h3>Advanced Text Stream Editors</h3>
      <p>Standard text filters operate line-by-line, but advanced diagnostics require modifying streams inline or parsing complex hierarchical data structures. Tools like <code>sed</code>, <code>awk</code>, and <code>jq</code> provide Turing-complete or highly expressive data manipulation capabilities directly on the CLI.</p>
      <p>Imagine a team of specialized translators. <code>sed</code> is like a surgeon's scalpel, quickly swapping text lines or replacing words inside files inline. <code>awk</code> is like a smart accountant that slices, counts, and runs calculations on text databases. <code>jq</code> is a JSON translator that understands nested blocks and pulls out keys in seconds.</p>
      <h3>Detailed Command Reference</h3>
      <div class="step-block">
        <div class="step-num">Cmd 1</div>
        <div class="step-body"><strong>sed (Stream Editor)</strong><br>Performs search-and-replace transformations on text streams. Use <code>sed -i 's/old/new/g' file.txt</code> to edit a file in-place.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Cmd 2</div>
        <div class="step-body"><strong>awk</strong><br>A pattern scanning language that treats text lines as databases. <code>awk -F',' '$1 == "admin" {print $2}'</code> filters and prints columns based on conditions.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Cmd 3</div>
        <div class="step-body"><strong>jq</strong><br>A command-line processor designed for parsing JSON data structures. <code>jq '.data.user.username' file.json</code> extracts specific nested keys from API responses.</div>
      </div>`,
    questions: [
      { q: "Which sed option is used to modify a file in-place (directly save changes to the file)?", a: "-i", hint: "Check the command reference blocks." },
      { q: "Which built-in awk variable represents the number of fields (columns) in the current line?", a: "NF", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Which built-in awk variable represents the current record (line) number?", a: "NR", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "3. Network Communication & Data Transfer",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/kali_network_diagram.png" alt="Kali Linux Network Communication Flow"></div>
      <h3>Network Utilities</h3>
      <p>Administrating or auditing network applications requires utilities to retrieve web assets, establish encrypted tunnels, relay raw TCP/UDP sockets, and intercept packet payloads on network interfaces promiscuously.</p>
      <p>Imagine your computer has a team of messengers. <code>curl</code> and <code>wget</code> are network couriers retrieving files from web servers. <code>ssh</code> is a portal to run commands on another machine. <code>nc</code> (Netcat) is a simple telephone link connecting directly to any raw network socket, and <code>tcpdump</code> is a network wiretap that sniffs every packet passing through your interface.</p>
      <h3>Detailed Command Reference</h3>
      <div class="step-block">
        <div class="step-num">Cmd 1</div>
        <div class="step-body"><strong>curl & wget</strong><br><code>curl</code> fetches data from servers using HTTP/S, often used to test APIs. <code>wget</code> downloads files and saves them directly to your disk.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Cmd 2</div>
        <div class="step-body"><strong>ssh & scp</strong><br><code>ssh</code> opens encrypted terminal connections to remote systems. <code>scp</code> securely copies files between local and remote machines over SSH.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Cmd 3</div>
        <div class="step-body"><strong>nc, socat, tcpdump</strong><br><code>nc</code> reads and writes data across network sockets. <code>socat</code> is a bidirectional multi-purpose relay. <code>tcpdump</code> captures and displays real-time network traffic details.</div>
      </div>`,
    questions: [
      { q: "Which curl option is used to follow HTTP server redirects?", a: "-L", hint: "Check the command reference blocks." },
      { q: "Which netcat option is used to set up an incoming socket listener?", a: "-l", hint: "Check the command reference blocks." },
      { q: "Which bidirectional relay utility is commonly called 'netcat with superpowers'?", a: "socat", hint: "Look for the specific tools mentioned in the lesson." }
    ]
  },
  {
    title: "4. Network Reconnaissance & Troubleshooting",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/kali_recon_diagram.png" alt="Kali Linux Network Reconnaissance & Troubleshooting"></div>
      <h3>Network Diagnostics</h3>
      <p>Network diagnostics involve interrogating the local TCP/IP stack to determine port states, routing paths, and DNS resolution. Tools like <code>ss</code>, <code>ip</code>, and <code>traceroute</code> expose the kernel's routing tables and socket bindings.</p>
      <p>Imagine your computer is a massive telephone switchboard. <code>ss</code> lets you inspect all connections currently plugged into your machine. <code>lsof</code> shows which worker has the telephone receiver open. <code>dig</code> queries the domain directory to lookup numbers (IPs) from names. <code>traceroute</code> maps the exact highways your packets drive through to reach a target.</p>
      <h3>Detailed Command Reference</h3>
      <div class="step-block">
        <div class="step-num">Cmd 1</div>
        <div class="step-body"><strong>ss & lsof</strong><br><code>ss -tulpn</code> displays active network connections and listening ports. <code>lsof -i :80</code> identifies which process ID (PID) is using port 80.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Cmd 2</div>
        <div class="step-body"><strong>dig & ip</strong><br><code>dig</code> queries DNS servers for records (like A or MX). <code>ip</code> displays and configures network adapters and routing tables (replacing <code>ifconfig</code>).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Cmd 3</div>
        <div class="step-body"><strong>traceroute & mtr</strong><br><code>traceroute</code> prints the path of routers packets hop through. <code>mtr</code> is an interactive diagnostic tool combining ping and traceroute.</div>
      </div>`,
    questions: [
      { q: "Which ss option is used to show process names and process IDs (PIDs) using the sockets?", a: "-p", hint: "Check the command reference blocks." },
      { q: "Which DNS record type (like A or TXT) represents Mail Exchange servers?", a: "MX", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Which modern command has replaced the legacy 'ifconfig' tool to check IP addresses?", a: "ip", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "5. Process Control & Job Scheduling",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/kali_process_diagram.png" alt="Kali Linux Process Control and Scheduling"></div>
      <h3>Process Management</h3>
      <p>Linux is a multitasking OS that manages execution via process IDs (PIDs) and signals. Administrators must manage process states (foreground/background), monitor resource exhaustion, send POSIX signals (like SIGKILL) to terminate processes, and schedule automated tasks via cron daemons.</p>
      <p>Imagine your computer is a theater stage. Foreground processes are actors performing on stage. Background processes (<code>&amp;</code>) are stagehands working in the dark wings. <code>nohup</code> prevents them from leaving if the director leaves. <code>watch</code> is a supervisor checking their status, and <code>kill</code> terminates their contracts immediately!</p>
      <h3>Detailed Command Reference</h3>
      <div class="step-block">
        <div class="step-num">Cmd 1</div>
        <div class="step-body"><strong>ps & htop</strong><br><code>ps aux</code> lists all running processes and PIDs. <code>htop</code> is an interactive system resource monitor showing real-time CPU and RAM load.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Cmd 2</div>
        <div class="step-body"><strong>kill & pkill</strong><br><code>kill -9 &lt;PID&gt;</code> sends a SIGKILL signal to force-terminate a process. <code>pkill -f &lt;name&gt;</code> kills processes matching a specific name pattern.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Cmd 3</div>
        <div class="step-body"><strong>Backgrounding & cron</strong><br>Append <code>&amp;</code> to a command to run it in the background. <code>nohup</code> keeps it running after logout. <code>crontab -e</code> edits automated job schedules.</div>
      </div>`,
    questions: [
      { q: "Which keyboard shortcut is used to suspend (pause) a running foreground process?", a: "Ctrl+Z", hint: "Check the command reference blocks." },
      { q: "In cron syntax (* * * * *), which position controls the hour setting (e.g. first, second, third)?", a: "second", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the numeric value of the SIGKILL signal used to force-terminate processes?", a: "9", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "6. Binary Analysis & Low-Level Diagnostics",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/kali_binary_diagram.png" alt="Kali Linux Binary Analysis and System Call Tracing"></div>
      <h3>Binary & Syscall Analysis</h3>
      <p>Reverse engineering and debugging require inspecting compiled ELF binaries for hardcoded ASCII strings, analyzing raw hexadecimal representations of memory, and dynamically tracing system calls (syscalls) made by a process to the Linux kernel.</p>
      <p>Looking at an executable binary is like looking at a closed black box. <code>strings</code> is an X-ray that filters out junk to display human-readable English text. <code>hexdump</code> and <code>xxd</code> reveal raw hexadecimal bytes. <code>strace</code> lists the exact requests the program is making to the operating system's kernel.</p>
      <h3>Detailed Command Reference</h3>
      <div class="step-block">
        <div class="step-num">Cmd 1</div>
        <div class="step-body"><strong>strings & base64</strong><br><code>strings</code> extracts printable character sequences from binary files. <code>base64 -d</code> decodes Base64 encoded text back into raw data.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Cmd 2</div>
        <div class="step-body"><strong>hexdump & xxd</strong><br><code>hexdump -C</code> displays raw bytes in hexadecimal format. <code>xxd</code> creates hex dumps and can reverse hex streams back into binary outputs.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Cmd 3</div>
        <div class="step-body"><strong>strace & ltrace</strong><br><code>strace</code> records every request a process makes to the Linux kernel. <code>ltrace</code> records shared library function calls executed by a program.</div>
      </div>`,
    questions: [
      { q: "Which strings option is used to specify the minimum length of characters to extract?", a: "-n", hint: "Check the command reference blocks." },
      { q: "Which base64 option is used to decode encoded text back into plain text?", a: "-d", hint: "Check the command reference blocks." },
      { q: "Which command utility converts canonical hex dumps back into binary?", a: "xxd", hint: "Check the command reference blocks." },
      { q: "Which strace option is used to trace child processes spawned by the main process?", a: "-f", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "7. Storage, Permissions & Environment Controls",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/kali_storage_diagram.png" alt="Kali Linux System Internals and Storage"></div>
      <h3>Permissions & System Administration</h3>
      <p>Linux utilizes Discretionary Access Control (DAC) via file permissions (read, write, execute for user, group, and others). System administrators must govern these permissions, manage environment variables that define shell behavior, and utilize systemd to control service daemons.</p>
      <p>Imagine your system is a castle. <code>chmod</code> and <code>chown</code> set who can enter which rooms in the castle. <code>tar</code> packages goods into compact shipping crates. <code>mount</code> binds external properties to the castle gates. <code>systemctl</code> commands the guard services to start or stop, and Shell environment variables (<code>export</code>) set regional castle rules.</p>
      <h3>Detailed Command Reference</h3>
      <div class="step-block">
        <div class="step-num">Cmd 1</div>
        <div class="step-body"><strong>chmod & chown</strong><br><code>chmod 600 file</code> modifies read/write/execute permissions. <code>chown user:group file</code> changes the ownership of files.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Cmd 2</div>
        <div class="step-body"><strong>tar & mount</strong><br><code>tar -czvf archive.tar.gz folder/</code> compresses and archives directories. <code>mount</code> attaches file systems or external drives to the directory tree.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Cmd 3</div>
        <div class="step-body"><strong>systemctl & env</strong><br><code>systemctl start apache2</code> controls systemd services. <code>env</code> prints environment variables, and <code>export VAR=value</code> sets them.</div>
      </div>`,
    questions: [
      { q: "Which chmod permission number represents full read, write, and execute access?", a: "7", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Which tar flag is used to extract an archive?", a: "-x", hint: "Check the command reference blocks." },
      { q: "What command is used to view the kernel ring buffer logs for hardware and driver issues?", a: "dmesg", hint: "Check the command reference blocks." }
    ]
  }
];
