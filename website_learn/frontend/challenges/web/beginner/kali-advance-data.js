/* ================================================
   CTF ARENA — Kali Linux Advanced Commands Lab Data
   ================================================ */

const LESSONS = [
  {
    title: "1. Text Searching & Stream Manipulation",
    points: 50,
    html: `
      <style>
        .command-card {
          background: #0d1117;
          border: 1px solid rgba(255, 77, 109, 0.2);
          border-radius: 8px;
          padding: 16px;
          margin: 16px 0;
          transition: all 0.3s ease;
        }
        .command-card:hover {
          border-color: var(--accent);
          box-shadow: 0 0 10px rgba(255, 77, 109, 0.15);
        }
        .command-card h4 {
          color: var(--accent);
          margin-top: 0;
          margin-bottom: 10px;
          font-family: var(--font-mono);
          font-size: 1.15rem;
        }
        .command-card ul {
          list-style-type: none;
          padding-left: 0;
          margin: 0;
        }
        .command-card li {
          margin-bottom: 8px;
          font-size: 0.95rem;
          color: var(--text-muted);
        }
        .command-card li strong {
          color: var(--text-primary);
        }
      </style>

      <h3>Introduction to Searching & Pipelines</h3>
      <div class="htb-diagram-container">
        <img src="../../../assets/kali_search_diagram.png" alt="Kali Linux File Searching and Filtering" style="max-width:100%; border-radius:8px;">
      </div>
      <p>In Linux, complex tasks are accomplished by combining small, specialized tools together. These tools read and write streams of text, passing data from one to the next like a conveyor belt.</p>

      <div class="analogy-box" style="margin-bottom: 24px; padding: 16px; background: rgba(255, 77, 109, 0.05); border-left: 4px solid var(--accent); border-radius: 4px;">
        <strong>The Conveyor Belt Analogy:</strong><br>
        Imagine a factory assembly line:
        <ul style="margin-top: 8px; padding-left: 20px;">
          <li><code>find</code> goes into the warehouse to retrieve boxes of files.</li>
          <li><code>grep</code> scans each box to see if it matches a query.</li>
          <li><code>cut</code> slices off unwanted parts of the files.</li>
          <li><code>sort</code> organizes them in order.</li>
          <li><code>uniq</code> discards identical duplicates.</li>
          <li><code>tr</code> translates characters (e.g. lowercase to uppercase).</li>
          <li><code>tee</code> splits the conveyor belt, sending one copy to the monitor and saving another copy to a storage file.</li>
        </ul>
        Using the pipe symbol (<code>|</code>), you link these tools into one continuous assembly line!
      </div>

      <h3>Detailed Command Reference:</h3>

      <div class="command-card">
        <h4>1. find</h4>
        <ul>
          <li><strong>What is it?</strong> A search assistant that crawls through folder structures to locate files or directories matching specific properties (like name, type, size, or edit date).</li>
          <li><strong>Why use it?</strong> When you are looking for configuration files or source code nested deep inside directories.</li>
          <li><strong>How is it used?</strong> <code>find &lt;path&gt; -name "&lt;pattern&gt;"</code><br>Example: <code>find /workspace -name "*.py"</code> finds all Python files.</li>
        </ul>
      </div>

      <div class="command-card">
        <h4>2. grep</h4>
        <ul>
          <li><strong>What is it?</strong> A text-searching scanner that reads files line-by-line to find matches for a word or regular expression pattern.</li>
          <li><strong>Why use it?</strong> To search files for passwords, configuration keys, or error messages.</li>
          <li><strong>How is it used?</strong> <code>grep -ri "&lt;pattern&gt;" &lt;path&gt;</code><br>Example: <code>grep -ri "todo" /workspace/</code> searches recursively (<code>-r</code>) and case-insensitively (<code>-i</code>) for the word "todo".</li>
        </ul>
      </div>

      <div class="command-card">
        <h4>3. xargs</h4>
        <ul>
          <li><strong>What is it?</strong> A command bridge that reads output text lines from one program and transforms them into arguments to run another program.</li>
          <li><strong>Why use it?</strong> When you find a list of files using <code>find</code> and want to pass all of them directly into <code>grep</code> or another tool.</li>
          <li><strong>How is it used?</strong> <code>&lt;command1&gt; | xargs &lt;command2&gt;</code><br>Example: <code>find /workspace -name "*.conf" | xargs grep "DB_HOST"</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>4. cut</h4>
        <ul>
          <li><strong>What is it?</strong> A column slicer that cuts out specific vertical fields or sections from lines of text.</li>
          <li><strong>Why use it?</strong> When processing structured logs or CSV lists where you only want specific columns (like usernames or IPs).</li>
          <li><strong>How is it used?</strong> <code>cut -d'&lt;delimiter&gt;' -f&lt;field_number&gt; &lt;file&gt;</code><br>Example: <code>cut -d',' -f2 employees.txt</code> extracts the second column from a comma-separated file.</li>
        </ul>
      </div>

      <div class="command-card">
        <h4>5. sort</h4>
        <ul>
          <li><strong>What is it?</strong> An organizer that sorts lines of text alphabetically or numerically.</li>
          <li><strong>Why use it?</strong> To group identical data together so it can be easily inspected or filtered.</li>
          <li><strong>How is it used?</strong> <code>sort &lt;file&gt;</code><br>Example: <code>sort access.log</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>6. uniq</h4>
        <ul>
          <li><strong>What is it?</strong> A duplicate filter that removes consecutive duplicate lines from text.</li>
          <li><strong>Why use it?</strong> To count or list unique values (like distinct IP addresses) in a stream. Note: It only works on adjacent lines, so you must run <code>sort</code> before running <code>uniq</code>.</li>
          <li><strong>How is it used?</strong> <code>uniq -c &lt;file&gt;</code> (the <code>-c</code> option counts occurrences).<br>Example: <code>sort access.log | uniq -c</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>7. tr</h4>
        <ul>
          <li><strong>What is it?</strong> A character translator that swaps or deletes specific sets of characters in text streams.</li>
          <li><strong>Why use it?</strong> When converting text cases (e.g., lowercase to uppercase) or swapping delimiters (e.g., tabs to commas).</li>
          <li><strong>How is it used?</strong> <code>tr '&lt;search&gt;' '&lt;replace&gt;'</code><br>Example: <code>tr 'a-z' 'A-Z'</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>8. tee</h4>
        <ul>
          <li><strong>What is it?</strong> A plumbing split-pipe that displays the output of a command on your screen while simultaneously saving it to a file.</li>
          <li><strong>Why use it?</strong> When you want to watch a script run in real-time but also log its complete output to a file for later.</li>
          <li><strong>How is it used?</strong> <code>&lt;command&gt; | tee &lt;file&gt;</code><br>Example: <code>ping target.local | tee network_log.txt</code></li>
        </ul>
      </div>

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
      { q: "Which grep option is used to search recursively through directories?", a: "-r" },
      { q: "Which find option is used to search for files by name (case-insensitive)?", a: "-iname" },
      { q: "Which grep option is used to print the line number of each matching line?", a: "-n" },
      { q: "Which symbol (like |, >, &) is used to pipe output from one command to another?", a: "|" }
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
      <p>Standard text filters operate line-by-line, but advanced diagnostics require modifying streams inline or parsing complex hierarchical data structures like JSON files directly on the CLI.</p>

      <div class="analogy-box" style="margin-bottom: 24px; padding: 16px; background: rgba(255, 77, 109, 0.05); border-left: 4px solid var(--accent); border-radius: 4px;">
        <strong>The Surgeon & The Translator Analogy:</strong><br>
        <ul style="margin-top: 8px; padding-left: 20px;">
          <li><code>sed</code> is like a surgeon's scalpel, quickly swapping text lines or replacing words inside files inline.</li>
          <li><code>awk</code> is like a smart column processor that slices, counts, and runs calculations on text databases.</li>
          <li><code>jq</code> is a JSON translator that understands nested blocks and pulls out keys in seconds.</li>
        </ul>
      </div>

      <h3>Detailed Command Reference:</h3>

      <div class="command-card">
        <h4>1. sed</h4>
        <ul>
          <li><strong>What is it?</strong> A stream editor that performs search-and-replace transformations on text streams.</li>
          <li><strong>Why use it?</strong> To quickly edit configurations or scripts automatically without manual typing. Use the <code>-i</code> option to write the changes directly back to the file (in-place).</li>
          <li><strong>How is it used?</strong> <code>sed 's/&lt;find&gt;/&lt;replace&gt;/g' &lt;file&gt;</code><br>Example: <code>sed -i 's/PORT=8080/PORT=9000/g' dev.conf</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>2. awk</h4>
        <ul>
          <li><strong>What is it?</strong> A powerful pattern scanning and data processing language that treats text lines as databases.</li>
          <li><strong>Why use it?</strong> To filter lines based on conditions and print formatted columns easily.</li>
          <li><strong>How is it used?</strong> <code>awk -F'&lt;delimiter&gt;' '&lt;condition&gt; {print $col}' &lt;file&gt;</code><br>Example: <code>awk -F',' '$5 == "Active" {print $2}' employees.txt</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>3. jq</h4>
        <ul>
          <li><strong>What is it?</strong> A command-line processor designed for parsing and filtering JSON data structures.</li>
          <li><strong>Why use it?</strong> Modern web APIs return JSON data; <code>jq</code> allows you to extract keys, format layout, and query nested values.</li>
          <li><strong>How is it used?</strong> <code>jq '.&lt;key&gt;' &lt;file&gt;</code><br>Example: <code>jq '.data.user.username' response.json</code></li>
        </ul>
      </div>

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
      { q: "Which sed option is used to modify a file in-place (directly save changes to the file)?", a: "-i" },
      { q: "Which built-in awk variable represents the number of fields (columns) in the current line?", a: "NF" },
      { q: "Which built-in awk variable represents the current record (line) number?", a: "NR" }
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
      <p>To audit or administer network applications, you must know how to pull web assets, transfer files securely, relay raw sockets, and intercept packets on network interfaces.</p>

      <div class="analogy-box" style="margin-bottom: 24px; padding: 16px; background: rgba(255, 77, 109, 0.05); border-left: 4px solid var(--accent); border-radius: 4px;">
        <strong>The Network Courier & The Wiretap Analogy:</strong><br>
        <ul style="margin-top: 8px; padding-left: 20px;">
          <li><code>curl</code> and <code>wget</code> are network couriers retrieving files from web servers.</li>
          <li><code>ssh</code> is a remote connection portal to run commands on another machine.</li>
          <li><code>scp</code> and <code>rsync</code> copy or sync directories securely.</li>
          <li><code>nc</code> (Netcat) is a simple telephone link connecting directly to any raw network socket.</li>
          <li><code>socat</code> is a bidirectional multi-purpose relay (a netcat with superpowers).</li>
          <li><code>tcpdump</code> is a network wiretap that sniffs every packet passing through your interface.</li>
        </ul>
      </div>

      <h3>Detailed Command Reference:</h3>

      <div class="command-card">
        <h4>1. curl</h4>
        <ul>
          <li><strong>What is it?</strong> A web client that fetches data from or sends data to servers using protocols like HTTP/S, FTP, etc.</li>
          <li><strong>Why use it?</strong> To test web page responses, retrieve headers, or make custom HTTP requests (GET, POST).</li>
          <li><strong>How is it used?</strong> <code>curl -X GET &lt;url&gt;</code><br>Example: <code>curl -I http://target.local</code> (displays the HTTP headers only).</li>
        </ul>
      </div>

      <div class="command-card">
        <h4>2. wget</h4>
        <ul>
          <li><strong>What is it?</strong> A download utility that retrieves files from web servers and saves them directly to your disk.</li>
          <li><strong>Why use it?</strong> To quickly download installer scripts, backups, or page images.</li>
          <li><strong>How is it used?</strong> <code>wget &lt;url&gt; -O &lt;output_name&gt;</code><br>Example: <code>wget http://target.local/backup/config.bak -O config.bak</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>3. ssh</h4>
        <ul>
          <li><strong>What is it?</strong> A secure shell client that opens encrypted terminal connections to remote systems.</li>
          <li><strong>Why use it?</strong> To remotely log in and run commands on servers securely over untrusted networks.</li>
          <li><strong>How is it used?</strong> <code>ssh &lt;user&gt;@&lt;host&gt;</code><br>Example: <code>ssh admin@target.local</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>4. scp</h4>
        <ul>
          <li><strong>What is it?</strong> A secure file copy utility that moves files between local and remote machines using SSH encryption.</li>
          <li><strong>Why use it?</strong> To upload scripts or download log files securely.</li>
          <li><strong>How is it used?</strong> <code>scp &lt;src&gt; &lt;user&gt;@&lt;host&gt;:&lt;dest&gt;</code><br>Example: <code>scp local.txt admin@target.local:/tmp/</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>5. rsync</h4>
        <ul>
          <li><strong>What is it?</strong> A directory synchronization utility that transfers only the differences between source and destination files.</li>
          <li><strong>Why use it?</strong> For backing up or mirroring large directory trees efficiently over network links.</li>
          <li><strong>How is it used?</strong> <code>rsync -avz &lt;src&gt; &lt;user&gt;@&lt;host&gt;:&lt;dest&gt;</code><br>Example: <code>rsync -avz /workspace/ admin@target.local:/tmp/sync/</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>6. nc (Netcat)</h4>
        <ul>
          <li><strong>What is it?</strong> A raw network utility that reads and writes data across network connections using TCP or UDP.</li>
          <li><strong>Why use it?</strong> To test ports, check banners, transfer files, or spawn simple socket listeners.</li>
          <li><strong>How is it used?</strong> <code>nc &lt;host&gt; &lt;port&gt;</code><br>Example: <code>nc target.local 4444</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>7. socat</h4>
        <ul>
          <li><strong>What is it?</strong> A bidirectional relay utility that links two independent data streams together.</li>
          <li><strong>Why use it?</strong> To forward ports, redirect local traffic to a remote target, or link raw files to sockets.</li>
          <li><strong>How is it used?</strong> <code>socat TCP4-LISTEN:&lt;port&gt;,fork TCP4:&lt;target&gt;:&lt;port&gt;</code><br>Example: <code>socat TCP4-LISTEN:8080,fork TCP4:target.local:80</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>8. tcpdump</h4>
        <ul>
          <li><strong>What is it?</strong> A network packet sniffer that captures and displays real-time network traffic details.</li>
          <li><strong>Why use it?</strong> To monitor protocol handshakes, troubleshoot connections, or capture raw packet dumps (pcap) for analysis.</li>
          <li><strong>How is it used?</strong> <code>tcpdump -i &lt;interface&gt; &lt;filters&gt;</code><br>Example: <code>tcpdump -i eth0 -A 'port 80'</code> (sniffs HTTP traffic in ASCII).</li>
        </ul>
      </div>

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
      { q: "Which curl option is used to follow HTTP server redirects?", a: "-L" },
      { q: "Which netcat option is used to set up an incoming socket listener?", a: "-l" },
      { q: "Which bidirectional relay utility is commonly called 'netcat with superpowers'?", a: "socat" }
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

      <div class="analogy-box" style="margin-bottom: 24px; padding: 16px; background: rgba(255, 77, 109, 0.05); border-left: 4px solid var(--accent); border-radius: 4px;">
        <strong>The Switchboard Operator Analogy:</strong><br>
        <ul style="margin-top: 8px; padding-left: 20px;">
          <li><code>ss</code> lets you inspect all connections currently plugged into your machine.</li>
          <li><code>lsof</code> shows which program or worker has the telephone receiver open.</li>
          <li><code>dig</code> queries the domain directory to lookup numbers (IPs) from names.</li>
          <li><code>ip</code> lets you check your local network addresses.</li>
          <li><code>traceroute</code> maps the exact highways and stops your packets drive through to reach a target.</li>
          <li><code>mtr</code> is a live supervisor checking connection quality and path latency continuously.</li>
        </ul>
      </div>

      <h3>Detailed Command Reference:</h3>

      <div class="command-card">
        <h4>1. ss</h4>
        <ul>
          <li><strong>What is it?</strong> A socket statistics tool that displays active network connections, routing tables, and listening ports.</li>
          <li><strong>Why use it?</strong> It replaces the older <code>netstat</code> command to let you audit which ports are open and waiting for connections.</li>
          <li><strong>How is it used?</strong> <code>ss -tulpn</code> (shows TCP <code>-t</code>, UDP <code>-u</code>, listening <code>-l</code>, processes <code>-p</code>, and numeric ports <code>-n</code>).</li>
        </ul>
      </div>

      <div class="command-card">
        <h4>2. lsof</h4>
        <ul>
          <li><strong>What is it?</strong> "List Open Files" command. Since Linux represents network ports as files, it identifies which processes own which ports.</li>
          <li><strong>Why use it?</strong> To identify exactly which program or process ID (PID) is running a service on a port (e.g. port 80).</li>
          <li><strong>How is it used?</strong> <code>lsof -i :&lt;port&gt;</code><br>Example: <code>lsof -i :80</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>3. dig</h4>
        <ul>
          <li><strong>What is it?</strong> A domain lookup utility that queries DNS servers for records.</li>
          <li><strong>Why use it?</strong> To resolve domain names to IP addresses or query specific record types like MX (mail servers) or TXT records.</li>
          <li><strong>How is it used?</strong> <code>dig &lt;domain&gt; &lt;type&gt;</code><br>Example: <code>dig target.local ANY</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>4. ip</h4>
        <ul>
          <li><strong>What is it?</strong> A network administration tool that displays and configures network adapters, IP addresses, and routing tables.</li>
          <li><strong>Why use it?</strong> It replaces the legacy <code>ifconfig</code> command to inspect local network interfaces and route rules.</li>
          <li><strong>How is it used?</strong> <code>ip addr show</code> or <code>ip route</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>5. traceroute</h4>
        <ul>
          <li><strong>What is it?</strong> A network diagnostics tool that prints the path of routers that packet streams hop through to reach a target.</li>
          <li><strong>Why use it?</strong> To pinpoint which network router or internet gateway is dropping your connection or introducing latency.</li>
          <li><strong>How is it used?</strong> <code>traceroute &lt;domain/IP&gt;</code><br>Example: <code>traceroute target.local</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>6. mtr</h4>
        <ul>
          <li><strong>What is it?</strong> My Traceroute. An interactive network diagnostic tool combining the functions of <code>ping</code> and <code>traceroute</code>.</li>
          <li><strong>Why use it?</strong> To observe live connection packet loss and latency statistics dynamically at each hop along a pathway.</li>
          <li><strong>How is it used?</strong> <code>mtr &lt;domain/IP&gt;</code><br>Example: <code>mtr target.local</code></li>
        </ul>
      </div>

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
      { q: "Which ss option is used to show process names and process IDs (PIDs) using the sockets?", a: "-p" },
      { q: "Which DNS record type (like A or TXT) represents Mail Exchange servers?", a: "MX" },
      { q: "Which modern command has replaced the legacy 'ifconfig' tool to check IP addresses?", a: "ip" }
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

      <div class="analogy-box" style="margin-bottom: 24px; padding: 16px; background: rgba(255, 77, 109, 0.05); border-left: 4px solid var(--accent); border-radius: 4px;">
        <strong>The Stage Manager Analogy:</strong><br>
        <ul style="margin-top: 8px; padding-left: 20px;">
          <li>Foreground processes (<code>fg</code>) are actors performing on stage.</li>
          <li>Background processes (<code>bg</code>, <code>&amp;</code>, <code>jobs</code>) are stagehands working in the dark wings.</li>
          <li><code>nohup</code> prevents them from packing up and leaving if the director leaves.</li>
          <li><code>timeout</code> pulls them off with a hook if they perform too long.</li>
          <li><code>watch</code> is a supervisor checking their status every few seconds.</li>
          <li><code>kill</code> and <code>pkill</code> terminate their script contracts immediately!</li>
        </ul>
      </div>

      <h3>Detailed Command Reference:</h3>

      <div class="command-card">
        <h4>1. ps</h4>
        <ul>
          <li><strong>What is it?</strong> A process snapshot viewer that lists all running processes on the system along with user, CPU, memory, and PIDs.</li>
          <li><strong>Why use it?</strong> To find process IDs of hung programs so you can terminate them.</li>
          <li><strong>How is it used?</strong> <code>ps aux</code> or <code>ps auxf</code> (displays process hierarchy).</li>
        </ul>
      </div>

      <div class="command-card">
        <h4>2. htop</h4>
        <ul>
          <li><strong>What is it?</strong> An interactive system resource monitor and task manager displaying real-time CPU, RAM, and process load.</li>
          <li><strong>Why use it?</strong> To easily monitor resource usage and terminate running tasks using a visual menu.</li>
          <li><strong>How is it used?</strong> Run <code>htop</code> in your terminal.</li>
        </ul>
      </div>

      <div class="command-card">
        <h4>3. kill</h4>
        <ul>
          <li><strong>What is it?</strong> A process signals transmitter that requests process IDs to stop executing.</li>
          <li><strong>Why use it?</strong> To close background scripts or terminate hung processes. Use the <code>-9</code> option for SIGKILL (unignorable force termination).</li>
          <li><strong>How is it used?</strong> <code>kill -&lt;signal&gt; &lt;PID&gt;</code><br>Example: <code>kill -9 1234</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>4. pkill</h4>
        <ul>
          <li><strong>What is it?</strong> A command killer that identifies processes by their name or matching patterns rather than raw IDs.</li>
          <li><strong>Why use it?</strong> When you want to kill all instances of a script (e.g. <code>daemon_loop</code>) without looking up its PID.</li>
          <li><strong>How is it used?</strong> <code>pkill -f &lt;name&gt;</code><br>Example: <code>pkill -f daemon_loop</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>5. &amp; (Background Operator)</h4>
        <ul>
          <li><strong>What is it?</strong> A command-line modifier that runs the preceding command in the background, keeping the terminal prompt free.</li>
          <li><strong>Why use it?</strong> To launch a daemon script or listener without blocking your active terminal window.</li>
          <li><strong>How is it used?</strong> <code>&lt;command&gt; &amp;</code><br>Example: <code>./daemon_loop.sh &amp;</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>6. jobs, bg, and fg</h4>
        <ul>
          <li><strong>What is it?</strong> Shell job controllers. <code>jobs</code> lists background tasks; <code>bg</code> resumes a suspended task in the background; <code>fg</code> pulls a task to the foreground.</li>
          <li><strong>Why use it?</strong> To manage suspended scripts (via <code>Ctrl+Z</code>) or toggle their interactive states.</li>
          <li><strong>How is it used?</strong> <code>jobs</code>, <code>bg %1</code>, or <code>fg %1</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>7. nohup</h4>
        <ul>
          <li><strong>What is it?</strong> No Hang Up. A utility that runs a command immune to shell logouts or terminal hangups.</li>
          <li><strong>Why use it?</strong> To ensure long-running syncs or scanner scripts continue running on a server after you close your session.</li>
          <li><strong>How is it used?</strong> <code>nohup &lt;command&gt; &amp;</code><br>Example: <code>nohup ./daemon_loop.sh &amp;</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>8. watch</h4>
        <ul>
          <li><strong>What is it?</strong> A periodic loop utility that executes a command repeatedly at a set interval (default 2 seconds), letting you monitor its output dynamically.</li>
          <li><strong>Why use it?</strong> To watch files growing, monitor active connections, or wait for a port to open.</li>
          <li><strong>How is it used?</strong> <code>watch -n &lt;seconds&gt; "&lt;command&gt;"</code><br>Example: <code>watch -n 1 ls -la</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>9. timeout</h4>
        <ul>
          <li><strong>What is it?</strong> An execution timer utility that halts a command if its run duration exceeds a specified limit.</li>
          <li><strong>Why use it?</strong> To prevent scanning or connecting scripts from hanging indefinitely.</li>
          <li><strong>How is it used?</strong> <code>timeout &lt;duration&gt; &lt;command&gt;</code><br>Example: <code>timeout 5s ping target.local</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>10. cron & crontab</h4>
        <ul>
          <li><strong>What is it?</strong> A scheduling daemon (<code>cron</code>) and configuration tool (<code>crontab</code>) that automates running scripts at set times (daily, hourly, etc.).</li>
          <li><strong>Why use it?</strong> To schedule recurring system tasks, like backups or log cleanup, to run automatically in the background.</li>
          <li><strong>How is it used?</strong> Edit schedules via <code>crontab -e</code>.</li>
        </ul>
      </div>

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
      { q: "Which keyboard shortcut is used to suspend (pause) a running foreground process?", a: "Ctrl+Z" },
      { q: "In cron syntax (* * * * *), which position controls the hour setting (e.g. first, second, third)?", a: "second" },
      { q: "What is the numeric value of the SIGKILL signal used to force-terminate processes?", a: "9" }
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

      <div class="analogy-box" style="margin-bottom: 24px; padding: 16px; background: rgba(255, 77, 109, 0.05); border-left: 4px solid var(--accent); border-radius: 4px;">
        <strong>The X-Ray Machine Analogy:</strong><br>
        <ul style="margin-top: 8px; padding-left: 20px;">
          <li>Looking at an executable binary is like looking at a closed black box.</li>
          <li><code>strings</code> is an X-ray that filters out junk to display human-readable English text.</li>
          <li><code>hexdump</code> and <code>xxd</code> reveal raw hexadecimal bytes.</li>
          <li><code>base64</code> decodes binary data converted to ASCII.</li>
          <li><code>strace</code> lists system calls (requests to the kernel like opening files).</li>
          <li><code>ltrace</code> lists library API calls (like comparing strings).</li>
        </ul>
      </div>

      <h3>Detailed Command Reference:</h3>

      <div class="command-card">
        <h4>1. strings</h4>
        <ul>
          <li><strong>What is it?</strong> A scanner that extracts printable character sequences (default min 4 characters) from binary files.</li>
          <li><strong>Why use it?</strong> To find hardcoded passwords, developer notes, or URL endpoints inside compiled programs.</li>
          <li><strong>How is it used?</strong> <code>strings &lt;binary&gt;</code><br>Example: <code>strings security_scanner</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>2. hexdump</h4>
        <ul>
          <li><strong>What is it?</strong> A binary data inspector that displays raw bytes of files represented in hexadecimal format.</li>
          <li><strong>Why use it?</strong> To examine non-text files, study binary formats, or inspect file headers for magic bytes.</li>
          <li><strong>How is it used?</strong> <code>hexdump -C &lt;file&gt;</code> (displays canonical hex and ASCII side-by-side).</li>
        </ul>
      </div>

      <div class="command-card">
        <h4>3. xxd</h4>
        <ul>
          <li><strong>What is it?</strong> A hex parser utility that creates hex dumps of binary files and can reverse hex streams back into binary outputs.</li>
          <li><strong>Why use it?</strong> To make byte-level edits to binaries or compile raw hex streams back into executables.</li>
          <li><strong>How is it used?</strong> <code>xxd &lt;file&gt;</code> or <code>xxd -r -p hex_raw.txt</code> (reverses raw hex back to binary).</li>
        </ul>
      </div>

      <div class="command-card">
        <h4>4. base64</h4>
        <ul>
          <li><strong>What is it?</strong> A data encoder/decoder that converts raw binary data into readable ASCII characters.</li>
          <li><strong>Why use it?</strong> To safely transmit or store binary data over systems that only support text inputs.</li>
          <li><strong>How is it used?</strong> <code>base64 -d &lt;file&gt;</code> (decodes a base64 encoded text file).</li>
        </ul>
      </div>

      <div class="command-card">
        <h4>5. strace</h4>
        <ul>
          <li><strong>What is it?</strong> A system call tracer that records every request a process makes to the Linux kernel (like reading files, sending packets, or allocating memory).</li>
          <li><strong>Why use it?</strong> To debug program failures, find what configuration files are missing, or trace execution logic.</li>
          <li><strong>How is it used?</strong> <code>strace &lt;command&gt;</code><br>Example: <code>strace ./security_scanner</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>6. ltrace</h4>
        <ul>
          <li><strong>What is it?</strong> A library calls tracer that intercepts and records shared library function calls (like string comparisons or math calculations) executed by a program.</li>
          <li><strong>Why use it?</strong> To observe internal operations, such as seeing what password string a program is matching your input against.</li>
          <li><strong>How is it used?</strong> <code>ltrace &lt;command&gt;</code><br>Example: <code>ltrace ./security_scanner</code></li>
        </ul>
      </div>

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
      { q: "Which strings option is used to specify the minimum length of characters to extract?", a: "-n" },
      { q: "Which base64 option is used to decode encoded text back into plain text?", a: "-d" },
      { q: "Which command utility converts canonical hex dumps back into binary?", a: "xxd" },
      { q: "Which strace option is used to trace child processes spawned by the main process?", a: "-f" }
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

      <div class="analogy-box" style="margin-bottom: 24px; padding: 16px; background: rgba(255, 77, 109, 0.05); border-left: 4px solid var(--accent); border-radius: 4px;">
        <strong>The System Gatekeeper Analogy:</strong><br>
        <ul style="margin-top: 8px; padding-left: 20px;">
          <li><code>chmod</code> and <code>chown</code> set who can enter which rooms in the castle.</li>
          <li><code>getfacl</code> and <code>setfacl</code> grant custom guest visitor passes.</li>
          <li><code>tar</code> packages goods into compact shipping crates.</li>
          <li><code>mount</code> binds external properties to the castle gates.</li>
          <li><code>systemctl</code> commands the guard services to start or stop.</li>
          <li><code>dmesg</code> reports castle gate anomalies.</li>
          <li>Shell environment variables (<code>env</code>, <code>export</code>, <code>source</code>) set regional castle rules.</li>
        </ul>
      </div>

      <h3>Detailed Command Reference:</h3>

      <div class="command-card">
        <h4>1. chmod</h4>
        <ul>
          <li><strong>What is it?</strong> A permissions modifier that changes the read, write, and execute permissions of files and folders.</li>
          <li><strong>Why use it?</strong> To make shell scripts executable or lock down sensitive configuration files so only the owner can read them.</li>
          <li><strong>How is it used?</strong> <code>chmod &lt;permissions&gt; &lt;file&gt;</code><br>Example: <code>chmod 600 secrets.txt</code> or <code>chmod +x script.sh</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>2. chown</h4>
        <ul>
          <li><strong>What is it?</strong> A file ownership modifier that changes which user and group owns a file.</li>
          <li><strong>Why use it?</strong> To reassign ownership of files when moving them between administrators or configuring system files.</li>
          <li><strong>How is it used?</strong> <code>chown &lt;owner&gt;:&lt;group&gt; &lt;file&gt;</code><br>Example: <code>chown admin:admin secrets.txt</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>3. getfacl</h4>
        <ul>
          <li><strong>What is it?</strong> Access Control List retriever. It displays the custom, fine-grained access permissions assigned to specific users or groups.</li>
          <li><strong>Why use it?</strong> Standard file permissions only allow setting owner/group; <code>getfacl</code> lets you verify custom rules for multiple independent users.</li>
          <li><strong>How is it used?</strong> <code>getfacl &lt;file&gt;</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>4. setfacl</h4>
        <ul>
          <li><strong>What is it?</strong> Access Control List modifier. It adds, modifies, or removes fine-grained permissions for specific users and groups.</li>
          <li><strong>Why use it?</strong> To grant temporary read/write access to a specific guest user without altering file ownership or group configuration.</li>
          <li><strong>How is it used?</strong> <code>setfacl -m u:&lt;user&gt;:&lt;perms&gt; &lt;file&gt;</code><br>Example: <code>setfacl -m u:guest_operator:r shared.log</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>5. tar</h4>
        <ul>
          <li><strong>What is it?</strong> Tape Archiver. A packaging tool that bundles multiple files and directories into a single compressed archive file (tarball).</li>
          <li><strong>Why use it?</strong> To compress directories for backups or packages to transfer them across machines.</li>
          <li><strong>How is it used?</strong> <code>tar -czvf &lt;name.tar.gz&gt; &lt;dir&gt;</code> (create) or <code>tar -xzvf &lt;archive.tar.gz&gt;</code> (extract).</li>
        </ul>
      </div>

      <div class="command-card">
        <h4>6. mount</h4>
        <ul>
          <li><strong>What is it?</strong> A storage connector that attaches disk drives, partitions, or virtual disks to your Linux folder tree.</li>
          <li><strong>Why use it?</strong> To access the files stored on external drives, USB sticks, or secondary virtual hard disks.</li>
          <li><strong>How is it used?</strong> <code>mount &lt;device&gt; &lt;folder&gt;</code><br>Example: <code>mount /dev/sdb1 /mnt</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>7. umount</h4>
        <ul>
          <li><strong>What is it?</strong> A storage disconnector that safely detaches disk drives from the Linux folder tree.</li>
          <li><strong>Why use it?</strong> To safely remove media without causing data loss or filesystem corruption.</li>
          <li><strong>How is it used?</strong> <code>umount &lt;folder/device&gt;</code><br>Example: <code>umount /mnt</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>8. lsblk</h4>
        <ul>
          <li><strong>What is it?</strong> List Block Storage. A storage viewer that lists all available block storage drives and partitions in a tree layout.</li>
          <li><strong>Why use it?</strong> To find the names (e.g. sdb1) and sizes of attached drives before mounting them.</li>
          <li><strong>How is it used?</strong> Run <code>lsblk</code> in your terminal.</li>
        </ul>
      </div>

      <div class="command-card">
        <h4>9. systemctl</h4>
        <ul>
          <li><strong>What is it?</strong> System Daemon Controller. A service manager tool that controls systemd services (daemons).</li>
          <li><strong>Why use it?</strong> To start, stop, restart, enable, or check the status of background services like web servers, databases, or SSH.</li>
          <li><strong>How is it used?</strong> <code>systemctl &lt;action&gt; &lt;service&gt;</code><br>Example: <code>systemctl status sshd</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>10. journalctl</h4>
        <ul>
          <li><strong>What is it?</strong> System Log Viewer. A query utility that displays logs generated by the systemd manager and background services.</li>
          <li><strong>Why use it?</strong> To investigate errors and logs when a service (like Apache or SSH) fails to launch correctly.</li>
          <li><strong>How is it used?</strong> <code>journalctl -u &lt;service&gt;</code><br>Example: <code>journalctl -u sshd</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>11. dmesg</h4>
        <ul>
          <li><strong>What is it?</strong> Diagnostic Message Buffer. A kernel log reporter that prints the startup and system diagnostic messages.</li>
          <li><strong>Why use it?</strong> To troubleshoot hardware failures, drivers, low-level disk connections, or firewall actions.</li>
          <li><strong>How is it used?</strong> <code>dmesg | tail -n 20</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>12. history</h4>
        <ul>
          <li><strong>What is it?</strong> A terminal command history recorder that lists previously typed instructions in your current shell.</li>
          <li><strong>Why use it?</strong> To find, recall, or reuse complex commands you entered earlier in your session.</li>
          <li><strong>How is it used?</strong> Run <code>history</code> in your terminal.</li>
        </ul>
      </div>

      <div class="command-card">
        <h4>13. alias</h4>
        <ul>
          <li><strong>What is it?</strong> A command shortcut builder that maps a custom word to execute a longer, complex command string.</li>
          <li><strong>Why use it?</strong> To save time typing frequent commands (e.g., aliasing <code>ll</code> to print a detailed directory listing).</li>
          <li><strong>How is it used?</strong> <code>alias &lt;shortcut&gt;="&lt;command&gt;"</code><br>Example: <code>alias ll="ls -lah"</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>14. env</h4>
        <ul>
          <li><strong>What is it?</strong> Environment variables reporter. It displays all active key-value variables set in your current shell session.</li>
          <li><strong>Why use it?</strong> To inspect configurations like system paths, shell types, or user home directories.</li>
          <li><strong>How is it used?</strong> Run <code>env</code> in your terminal.</li>
        </ul>
      </div>

      <div class="command-card">
        <h4>15. export</h4>
        <ul>
          <li><strong>What is it?</strong> A variable exporter that saves variables globally in the environment, making them accessible to any programs launched from the shell.</li>
          <li><strong>Why use it?</strong> To define options, target IPs, or settings that scripts and programs need to access.</li>
          <li><strong>How is it used?</strong> <code>export &lt;NAME&gt;="&lt;value&gt;"</code><br>Example: <code>export PATH="/workspace/bin:$PATH"</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>16. source</h4>
        <ul>
          <li><strong>What is it?</strong> A file execution evaluator that loads and executes commands from a script directly in the current shell session.</li>
          <li><strong>Why use it?</strong> To immediately apply updates made to configurations (like <code>.bashrc</code>) without opening a new terminal window.</li>
          <li><strong>How is it used?</strong> <code>source &lt;file&gt;</code><br>Example: <code>source ~/.bashrc</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>17. bash</h4>
        <ul>
          <li><strong>What is it?</strong> Bourne Again Shell. The default command line interpreter and shell execution environment used in Linux.</li>
          <li><strong>Why use it?</strong> To start a new shell session, evaluate command script files, or run terminal utilities.</li>
          <li><strong>How is it used?</strong> <code>bash &lt;script.sh&gt;</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>18. python3</h4>
        <ul>
          <li><strong>What is it?</strong> The Python 3 runtime interpreter.</li>
          <li><strong>Why use it?</strong> To run scripts, build exploit files, run calculations, or process data.</li>
          <li><strong>How is it used?</strong> <code>python3 &lt;script.py&gt;</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>19. perl</h4>
        <ul>
          <li><strong>What is it?</strong> The Perl scripting language interpreter.</li>
          <li><strong>Why use it?</strong> To run text-processing utilities or legacy tools configured in systems.</li>
          <li><strong>How is it used?</strong> <code>perl &lt;script.pl&gt;</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>20. git</h4>
        <ul>
          <li><strong>What is it?</strong> A distributed version control client used to download, share, and track changes in code repositories.</li>
          <li><strong>Why use it?</strong> To download security tools or clone developer source code from platforms like GitHub.</li>
          <li><strong>How is it used?</strong> <code>git clone &lt;repository_url&gt;</code></li>
        </ul>
      </div>

      <div class="command-card">
        <h4>21. docker</h4>
        <ul>
          <li><strong>What is it?</strong> A containerization engine that launches isolated virtual server environments on top of the host kernel.</li>
          <li><strong>Why use it?</strong> To quickly spin up, stop, or query isolated target systems and attack sandboxes.</li>
          <li><strong>How is it used?</strong> <code>docker ps</code> (shows running containers) or <code>docker run</code> (runs new container).</li>
        </ul>
      </div>

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
      { q: "What is the numeric (octal) permission value that gives read/write to the owner only (e.g. 777, 600)?", a: "600" },
      { q: "Which command displays block storage devices in a tree-like list?", a: "lsblk" },
      { q: "Which shell command prints a list of previously executed commands?", a: "history" },
      { q: "Which command is used to set or modify Access Control Lists (ACLs) on files?", a: "setfacl" }
    ]
  }
];
