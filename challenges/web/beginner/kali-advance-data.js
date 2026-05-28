/* ================================================
   CTF LABS — Kali Linux Advanced Commands Lab Data
   ================================================ */

const LESSONS = [
  {
    title: "1. Text Searching & Stream Manipulation",
    points: 50,
    html: `
      <h3>Introduction to Searching & Pipelines</h3>
      <div class="htb-diagram-container">
        <img src="../../../assets/kali_search_diagram.png" alt="Kali Linux File Searching and Filtering" style="max-width:100%; border-radius:8px;">
      </div>
      <p>In Linux, the philosophy is to write programs that do one thing well and work together via text streams. This lesson covers searching files, slicing columns, filtering, and piping outputs to automate tasks.</p>

      <div class="analogy-box">
        <strong>The Conveyor Belt Analogy:</strong><br>
        Imagine a factory conveyor belt. <code>find</code> locates the boxes of files. <code>grep</code> scans each box to see if it matches a query. <code>cut</code> slices off unwanted parts. <code>sort</code> organizes them in order. <code>uniq</code> discards identical duplicates. <code>tr</code> translates individual characters. and <code>tee</code> splits the output, sending one copy to the monitor and saving another copy to a storage file. By using the pipe symbol (<code>|</code>), you link these tools into one continuous assembly line!
      </div>

      <h3>Key Commands & Syntax:</h3>
      <ul>
        <li><code>find &lt;path&gt; -name "&lt;pattern&gt;"</code>: Searches for files in a directory tree.</li>
        <li><code>grep -ri "&lt;pattern&gt;" &lt;path&gt;</code>: Recursively searches text files for a pattern (case-insensitive).</li>
        <li><code>xargs</code>: Reads strings from standard input and converts them into arguments for another command.</li>
        <li><code>cut -d',' -f2 &lt;file&gt;</code>: Slices columns out of structured lines using a delimiter.</li>
        <li><code>sort</code> &amp; <code>uniq</code>: Sorts text lines alphabetically/numerically, and removes consecutive duplicates.</li>
        <li><code>tr 'a-z' 'A-Z'</code>: Translates or replaces specific characters (e.g. lowercase to uppercase).</li>
        <li><code>tee &lt;file&gt;</code>: Reads from standard input and writes to both standard output and files simultaneously.</li>
      </ul>

      <h3>Practical Lab Task</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Connect to your Kali shell:</strong><br>
          Click <strong>Launch Kali Machine ⇗</strong> above and run the generated <code>docker exec</code> command in your host terminal.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Search for files and find a hidden todo comment:</strong><br>
          Use <code>find</code> to locate files in the workspace, then use <code>grep</code> to search recursively for the word "todo":
          <pre>find /workspace -name "*.py"
grep -r "todo" /workspace/text_processing/</pre>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Leverage xargs to chain commands:</strong><br>
          Use find to find configurations, then feed them to grep with <code>xargs</code> to locate the database host server config:
          <pre>find /workspace/text_processing/config -name "*.conf" | xargs grep "DB_HOST"</pre>
        </div>
      </div>
    `,
    questions: [
      { q: "What flag tells grep to search recursively through subdirectories?", a: "-r" },
      { q: "What flag is used with find to search for files by name (case-insensitive)?", a: "-iname" },
      { q: "What is the TODO comment inside helpers.py?", a: "TODO: implement user session logging helper" },
      { q: "What is the DB_HOST value found inside prod.conf using xargs?", a: "prod-db-server-01.internal" }
    ]
  },
  {
    title: "2. Stream Editing & Structured Data Parsing",
    points: 50,
    html: `
      <h3>Advanced Text Stream Editors (awk, sed, jq)</h3>
      <div class="htb-diagram-container">
        <img src="../../../assets/kali_stream_diagram.png" alt="Kali Linux Stream Editing and Data Parsing" style="max-width:100%; border-radius:8px;">
      </div>
      <p>Standard text filters operate line-by-line, but advanced tasks require modifying streams inline or parsing complex data structures like JSON files directly on the CLI.</p>

      <div class="analogy-box">
        <strong>The Surgeon & The Translator:</strong><br>
        If standard tools are scissors, <code>sed</code> is a scalpel for modifying strings inline, <code>awk</code> is a scriptable database processor that slices, counts, and prints formatted columns, and <code>jq</code> is a JSON translator that understands nested structures and filters values in seconds without leaving the terminal.
      </div>

      <h3>Key Commands & Syntax:</h3>
      <ul>
        <li><code>sed 's/find/replace/g' input.txt</code>: Substitutes strings globally in text streams. Use <code>-i</code> to edit files in-place.</li>
        <li><code>awk -F',' '{print $2, $4}' employees.txt</code>: Processes lines column-by-column. <code>-F</code> sets the delimiter, and <code>$N</code> prints that column (<code>$0</code> represents the whole line).</li>
        <li><code>jq '.data.user.username' response.json</code>: Parses and formats JSON output cleanly, pulling specific keys from deep hierarchies.</li>
      </ul>

      <h3>Practical Lab Task</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Process employee logs with awk:</strong><br>
          Filter out the Active employees from <code>employees.txt</code> and print only their name and department:
          <pre>awk -F',' '$5 == "Active" {print $2 " works in " $3}' /workspace/text_processing/employees.txt</pre>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Edit text inline with sed:</strong><br>
          Substitute a port number inside dev.conf:
          <pre>sed 's/PORT=8080/PORT=9000/g' /workspace/text_processing/config/env/dev.conf</pre>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Parse JSON with jq:</strong><br>
          Query the api response JSON to extract the hidden API key:
          <pre>jq '.data.user.meta.api_token' /workspace/text_processing/api_response.json</pre>
        </div>
      </div>
    `,
    questions: [
      { q: "What flag allows sed to perform an in-place modification on a file?", a: "-i" },
      { q: "In awk, what variable represents the number of fields (columns) in the current line?", a: "NF" },
      { q: "What is the API token value extracted from api_response.json using jq?", a: "usr_s4sec_9823" }
    ]
  },
  {
    title: "3. Network Communication & Data Transfer",
    points: 50,
    html: `
      <h3>Moving Data Across the Network</h3>
      <div class="htb-diagram-container">
        <img src="../../../assets/kali_network_diagram.png" alt="Kali Linux Network Communication Flow" style="max-width:100%; border-radius:8px;">
      </div>
      <p>As a Linux systems administrator or security professional, you must know how to pull web assets, transfer files securely, relay raw sockets, and intercept packets on network interfaces.</p>

      <div class="analogy-box">
        <strong>The Network Courier & The Wiretap:</strong><br>
        <code>curl</code> and <code>wget</code> are network couriers that retrieve files from web servers. <code>nc</code> (Netcat) is a telephone that lets you talk directly to raw network sockets. <code>socat</code> is a bidirectional multi-purpose relay (a netcat with superpowers). And <code>tcpdump</code> is a wiretap that intercepts every packet travelling through the air or cables of your interface.
      </div>

      <h3>Key Commands & Syntax:</h3>
      <ul>
        <li><code>curl -L -X GET http://&lt;url&gt;</code>: Fetch web pages. <code>-L</code> follows redirects; <code>-I</code> prints headers.</li>
        <li><code>wget -O output.html http://&lt;url&gt;</code>: Downloads assets directly to disk.</li>
        <li><code>ssh user@host</code> / <code>scp file.txt user@host:/path</code>: Secure remote shells and file transfers.</li>
        <li><code>rsync -avz /src user@host:/dest</code>: Syncs directory trees efficiently over SSH.</li>
        <li><code>nc -lvp &lt;port&gt;</code> / <code>nc &lt;host&gt; &lt;port&gt;</code>: Open socket listeners and client connections.</li>
        <li><code>socat TCP4-LISTEN:8080,fork TCP4:target.local:80</code>: Relays traffic from port 8080 to the target.</li>
        <li><code>tcpdump -i eth0 -A 'port 80'</code>: Sniffs network packets. <code>-A</code> prints ASCII payloads, <code>-w</code> saves to a pcap file.</li>
      </ul>

      <h3>Practical Lab Task</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Request target headers using curl:</strong><br>
          Run a quick request to target.local to view headers:
          <pre>curl -I http://target.local</pre>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Query target socket with Netcat:</strong><br>
          Use netcat to connect directly to the target machine's port 4444:
          <pre>nc target.local 4444</pre>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Snoop web traffic with tcpdump:</strong><br>
          Launch a packet sniffer listening on your local container interface (eth0) for port 80 HTTP requests:
          <pre>tcpdump -i eth0 -A -c 5 'port 80'</pre>
        </div>
      </div>
    `,
    questions: [
      { q: "What curl flag is used to follow HTTP server redirects?", a: "-L" },
      { q: "What is the verification code retrieved by connecting to target.local port 4444 via netcat?", a: "netcat_connection_verified" },
      { q: "What utility allows bidirectional data transfer and relays (often referred to as netcat with superpowers)?", a: "socat" }
    ]
  },
  {
    title: "4. Network Reconnaissance & Troubleshooting",
    points: 50,
    html: `
      <h3>Diagnosing Network States</h3>
      <div class="htb-diagram-container">
        <img src="../../../assets/kali_recon_diagram.png" alt="Kali Linux Network Reconnaissance & Troubleshooting" style="max-width:100%; border-radius:8px;">
      </div>
      <p>When services fail to load, you must determine if the local port is listening, what process owns that port, how domain names are resolving, and which router is dropping packages.</p>

      <div class="analogy-box">
        <strong>The Switchboard Operator:</strong><br>
        Imagine you are an operator in a telephone exchange building. <code>ss</code> lets you inspect all connections currently plugged in. <code>lsof</code> shows which office worker (process) is holding the telephone receiver. <code>dig</code> queries the central directory to lookup phone numbers (IPs) from names (DNS). And <code>traceroute</code> maps the exact highways and rest stops (routers) your mail truck drives through to reach its destination.
      </div>

      <h3>Key Commands & Syntax:</h3>
      <ul>
        <li><code>ss -tulpn</code>: Lists socket connections. <code>-t</code> (TCP), <code>-u</code> (UDP), <code>-l</code> (listening), <code>-p</code> (processes), <code>-n</code> (numeric IPs/ports).</li>
        <li><code>lsof -i :80</code>: Lists open files and sockets associated with port 80.</li>
        <li><code>dig target.local ANY</code>: Resolves domain name system records.</li>
        <li><code>ip addr show</code> / <code>ip route</code>: Inspects local network cards and routing tables.</li>
        <li><code>traceroute google.com</code>: Traces packets path to a target.</li>
        <li><code>mtr google.com</code>: Combined ping and traceroute interactive diagnostic tool.</li>
      </ul>

      <h3>Practical Lab Task</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>List open ports on the attacker machine:</strong><br>
          Query what socket connections are listening on your Kali box:
          <pre>ss -tulpn</pre>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Identify port ownership:</strong><br>
          Check which process ID is using port 80 or any other active port:
          <pre>lsof -i</pre>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Resolve target name locally:</strong><br>
          Query target.local's local container resolving configuration:
          <pre>dig target.local</pre>
        </div>
      </div>
    `,
    questions: [
      { q: "What ss flag displays process names and IDs associated with sockets?", a: "-p" },
      { q: "What dig query type is used to check the Mail Exchange records of a domain?", a: "MX" },
      { q: "What command replaces the old 'ifconfig' tool to check interface addresses?", a: "ip" }
    ]
  },
  {
    title: "5. Process Control & Job Scheduling",
    points: 50,
    html: `
      <h3>Managing System Resources & Tasks</h3>
      <div class="htb-diagram-container">
        <img src="../../../assets/kali_process_diagram.png" alt="Kali Linux Process Control and Scheduling" style="max-width:100%; border-radius:8px;">
      </div>
      <p>Linux is multitasking. You must manage processes running in the background, terminate hung jobs, monitor real-time resource exhaustion, and automate scripts to run at specific times.</p>

      <div class="analogy-box">
        <strong>The Stage Manager:</strong><br>
        Imagine you are managing a theatre. Foreground processes (<code>fg</code>) are actors on stage. Background processes (<code>bg</code>, <code>&amp;</code>, <code>jobs</code>) are stagehands working in the dark wings. <code>nohup</code> prevents them from packing up if you leave. <code>timeout</code> pulls them off with a hook if they perform too long. <code>watch</code> is a supervisor checking their status every 2 seconds. And <code>kill</code> terminates their contract immediately!
      </div>

      <h3>Key Commands & Syntax:</h3>
      <ul>
        <li><code>ps aux</code>: Displays a snapshot of all active processes.</li>
        <li><code>htop</code>: Interactive, colorful process monitor and resource viewer.</li>
        <li><code>kill -9 &lt;pid&gt;</code>: Force-kills a process using SIGKILL signal.</li>
        <li><code>pkill -f &lt;name&gt;</code>: Kills processes by name matching.</li>
        <li><code>command &amp;</code>: Runs a command in the background, releasing the terminal.</li>
        <li><code>jobs</code> / <code>fg %1</code> / <code>bg %1</code>: Lists active shell jobs, and toggles foreground/background execution.</li>
        <li><code>nohup script.sh &amp;</code>: Allows processes to survive terminal sessions closing.</li>
        <li><code>watch -n 1 "date"</code>: Runs a command repeatedly at a set interval.</li>
        <li><code>timeout 5s ping target.local</code>: Runs a command and halts it if it exceeds the limit.</li>
        <li><code>crontab -e</code> / <code>cron</code>: Schedules scripts to run at regular times (e.g. daily, hourly).</li>
      </ul>

      <h3>Practical Lab Task</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Start a background task:</strong><br>
          Run the provided daemon loop in the background:
          <pre>/workspace/network_practice/daemon_loop.sh &</pre>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Identify and kill the background process:</strong><br>
          Use <code>jobs</code> and <code>ps</code> to locate the PID of the daemon loop, then kill it:
          <pre>jobs
ps aux | grep daemon_loop
kill -9 [PID]</pre>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Run with execution limit:</strong><br>
          Enforce a timeout limit on ping:
          <pre>timeout 3 ping target.local</pre>
        </div>
      </div>
    `,
    questions: [
      { q: "What keyboard shortcut suspends a running foreground process in bash?", a: "Ctrl+Z" },
      { q: "What cron scheduling syntax column represents the hour setting (0-23)?", a: "second" },
      { q: "What signal number represents SIGKILL, the unignorable force termination signal?", a: "9" }
    ]
  },
  {
    title: "6. Binary Analysis & Low-Level Diagnostics",
    points: 50,
    html: `
      <h3>Peeking inside Binaries & Kernel Calls</h3>
      <div class="htb-diagram-container">
        <img src="../../../assets/kali_binary_diagram.png" alt="Kali Linux Binary Analysis and System Call Tracing" style="max-width:100%; border-radius:8px;">
      </div>
      <p>When auditing closed-source software or troubleshooting crashes, you need to read plain-text strings embedded inside binary files, inspect raw hex codes, and monitor direct calls to the operating system.</p>

      <div class="analogy-box">
        <strong>The X-Ray Machine:</strong><br>
        If looking at an executable is like looking at a closed black box, <code>strings</code> is an X-ray that filters out junk to display human-readable English text. <code>xxd</code> and <code>hexdump</code> reveal raw hexadecimal bytes. <code>base64</code> decodes binary data converted to ASCII. <code>strace</code> lists system calls (requests to the kernel like opening a file), and <code>ltrace</code> lists library function calls (like comparing strings).
      </div>

      <h3>Key Commands & Syntax:</h3>
      <ul>
        <li><code>strings &lt;binary&gt;</code>: Prints all printable character sequences (default min 4 chars).</li>
        <li><code>hexdump -C &lt;file&gt;</code>: Canonical hex+ASCII output.</li>
        <li><code>xxd &lt;file&gt;</code> / <code>xxd -r &lt;hex_dump&gt;</code>: Binary dump utility. Can convert hex dumps back to binary.</li>
        <li><code>base64 -d &lt;file&gt;</code>: Decodes base64-encoded strings.</li>
        <li><code>strace ./executable</code>: Traces system calls (open, read, write, connect) made by the process.</li>
        <li><code>ltrace ./executable</code>: Traces shared library API calls (strcmp, printf, malloc).</li>
      </ul>

      <h3>Practical Lab Task</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Extract hidden string constants:</strong><br>
          Inspect the compiled binary file inside /workspace/binary_analysis to find the secret string:
          <pre>strings /workspace/binary_analysis/security_scanner</pre>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Decode the base64 value:</strong><br>
          Extract and decode the base64 challenge:
          <pre>base64 -d /workspace/binary_analysis/b64_encoded.txt</pre>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Convert Hex text back to ASCII:</strong><br>
          Decode the hex challenge using xxd:
          <pre>xxd -r -p /workspace/binary_analysis/hex_raw.txt</pre>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 4</div>
        <div class="step-body">
          <strong>Trace runtime system calls:</strong><br>
          Audit what system calls are run by security_scanner when passing the secret key:
          <pre>strace /workspace/binary_analysis/security_scanner open_secret</pre>
        </div>
      </div>
    `,
    questions: [
      { q: "What flag inside strings sets the minimum length of characters to extract?", a: "-n" },
      { q: "What is the secret string found inside security_scanner using the strings command?", a: "strings_binary_inspection_ninja" },
      { q: "What is the decoded value inside b64_encoded.txt?", a: "base64_decoding_is_simple" },
      { q: "What is the plain-text string printed by decoding hex_raw.txt?", a: "xxd_binary_viewing_power" }
    ]
  },
  {
    title: "7. Storage, Permissions & Environment Controls",
    points: 50,
    html: `
      <h3>System Administration & Shell Environment</h3>
      <div class="htb-diagram-container">
        <img src="../../../assets/kali_storage_diagram.png" alt="Kali Linux System Internals and Storage" style="max-width:100%; border-radius:8px;">
      </div>
      <p>To safely govern a Linux system, you must know how to adjust permissions and ACLs, package directories, mount file systems, view kernel logs, control services, and configure shell variables.</p>

      <div class="analogy-box">
        <strong>The System Gatekeeper:</strong><br>
        Imagine you are the gatekeeper of a castle. <code>chmod</code> and <code>chown</code> set who can enter which rooms. <code>setfacl</code> grants custom visitor passes. <code>tar</code> packages goods into compact crates. <code>mount</code> binds external properties to the castle gates. <code>systemctl</code> commands the guard services to start or stop. <code>dmesg</code> reports castle gate anomalies. And the shell environment variables (like <code>export</code>, <code>env</code>) set regional rules.
      </div>

      <h3>Key Commands & Syntax:</h3>
      <ul>
        <li><code>chmod 600 &lt;file&gt;</code> / <code>chown user:group &lt;file&gt;</code>: Modifies file read/write/execute flags and ownership.</li>
        <li><code>getfacl &lt;file&gt;</code> / <code>setfacl -m u:user:rwx &lt;file&gt;</code>: Retrieves and edits fine-grained Access Control Lists.</li>
        <li><code>tar -czvf backup.tar.gz /src</code> / <code>tar -xzvf archive.tar.gz</code>: Packages and compresses directories.</li>
        <li><code>mount /dev/sdb1 /mnt</code> / <code>umount /mnt</code>: Mounts/unmounts disk devices.</li>
        <li><code>lsblk</code> / <code>fdisk -l</code> / <code>parted</code>: Displays block storage devices and manages disk partition tables.</li>
        <li><code>systemctl status &lt;service&gt;</code> / <code>journalctl -u &lt;service&gt;</code>: Manages systemd services and queries service logs.</li>
        <li><code>dmesg</code>: Prints kernel message ring buffer logs.</li>
        <li><code>history</code> / <code>alias name="cmd"</code>: View shell command history and create shorthand command aliases.</li>
        <li><code>env</code> / <code>export VAR="val"</code>: Displays active shell environment variables and exports variables globally.</li>
        <li><code>source ~/.bashrc</code>: Runs script commands within the current shell context.</li>
        <li><code>bash</code>, <code>python3</code>, <code>perl</code>, <code>git</code>, <code>docker</code>: Runs interactive shell environments, scripts, VCS, and manages containers.</li>
      </ul>

      <h3>Practical Lab Task</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Review active block storage devices:</strong><br>
          Use <code>lsblk</code> to see the container's virtual block devices:
          <pre>lsblk</pre>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Manage access permissions:</strong><br>
          View file permissions inside the folder /workspace/file_management/permissions:
          <pre>ls -l /workspace/file_management/permissions</pre>
          Check the ACL status on shared.log:
          <pre>getfacl /workspace/file_management/permissions/shared.log</pre>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Extract a tar archive:</strong><br>
          Extract the files inside backup.tar.gz:
          <pre>tar -xzvf /workspace/file_management/archive/backup.tar.gz -C /workspace/file_management/archive/</pre>
        </div>
      </div>
    `,
    questions: [
      { q: "What numeric octal permission grants read and write permissions to the user owner, but zero permissions to group and others?", a: "600" },
      { q: "What command displays detailed block storage devices information in a tree-like view?", a: "lsblk" },
      { q: "What shell command lists all previously entered commands in the current session?", a: "history" },
      { q: "What command is used to set or modify Access Control Lists (ACLs) on files?", a: "setfacl" }
    ]
  }
];
