const LESSONS = [
  {
    title: "Path Traversal Basics",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/dir_basics_diagram.png" alt="Directory Traversal Basics"></div>
      <h3>What is Directory Traversal?</h3>
      <p>Directory Traversal (or Path Traversal) is a web security vulnerability that allows an attacker to read arbitrary files on the server that is running an application. By manipulating variables that reference files with "dot-dot-slash" (../) sequences, an attacker can step out of the intended application directory and access sensitive operating system files, configuration files containing passwords, or source code.</p>
      <p>Imagine a giant public library. The librarian says, "You can read any book in the 'Children's Section'." When you want a book, you give the librarian a slip of paper with the book's title, and they fetch it from that section. But what if you are a sneaky hacker? Instead of writing a book title, you write, "Go out of the Children's Section, walk into the Staff Only room, and bring me the Secret Employee Rulebook!" If the librarian is acting like a robot and blindly follows your exact instructions without checking the rules, they will actually go grab the secret book and hand it to you! In computers, this is called Directory Traversal. A website might let you ask for an image. But if you type special commands like "../" (which means "go backwards out of this room"), a lazy server will actually walk backwards into its own private folders and hand you its most secret, locked files!</p>
      <h3>How It Works</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Identify File Parameter</strong><br>An application serves a file based on user input: <code>http://site.com/view?file=report.pdf</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Inject Traversal Sequence</strong><br>An attacker uses <code>../</code> to move up the directory tree: <code>http://site.com/view?file=../../../etc/passwd</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Access Sensitive Files</strong><br>The server resolves the path and returns the contents of the target file, completely bypassing access controls.</div>
      </div>
      <h3>Sensitive Targets</h3>
      <ul>
        <li><strong>Linux:</strong> <code>/etc/passwd</code> (User info), <code>/etc/shadow</code> (Passwords), <code>~/.ssh/id_rsa</code> (SSH Keys)</li>
        <li><strong>Windows:</strong> <code>C:\\Windows\\win.ini</code>, <code>C:\\inetpub\\wwwroot\\web.config</code> (IIS config)</li>
      </ul>`,
    questions: [
      { q: "What symbol sequence is used to move up one directory level in path traversal?", a: "../", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What Linux file contains system user account information?", a: "/etc/passwd", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "On Windows, what IIS config file may contain database credentials?", a: "web.config", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What Linux file contains environment variables that may include secrets?", a: "/proc/self/environ", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Why is path traversal particularly dangerous when combined with configuration files?", a: "Config files often contain database credentials or API keys", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "Defeating Path Traversal Filters",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/dir_filters_diagram.png" alt="Defeating Path Traversal Filters"></div>
      <h3>Evading Developer Restrictions</h3>
      <p>Developers often try to prevent directory traversal by simply blocking or filtering the exact ` + "`" + `../` + "`" + ` string. However, attackers have developed numerous creative evasion techniques to bypass these naive filters. By using URL encoding, nested sequences, or alternative path separators, attackers can trick the application into accepting the payload, allowing the underlying operating system to ultimately resolve the path back to the intended malicious directory jump.</p>
      <p>Imagine a security guard who is told to confiscate any note containing the exact words "Secret Room." A clever spy wouldn't use those words. Instead, they might write the note in a foreign language, or use invisible ink, or chop the word "Secret" in half across two lines. When the guard looks at the note, they don't see the banned words, so they let it pass. But when the note reaches the inside agent, they translate the foreign language or decode the invisible ink, and instantly know to go to the Secret Room! In web hacking, attackers use URL encoding or nested symbols (like ` + "`" + `....//` + "`" + `) as their "foreign language" to slip right past the website's security filters.</p>
      <h3>Common Evasion Techniques</h3>
      <div class="step-block">
        <div class="step-num">Bypass 1</div>
        <div class="step-body"><strong>URL Encoding</strong><br>Encode characters: <code>.</code> → <code>%2e</code>, <code>/</code> → <code>%2f</code>.<br>Example: <code>%2e%2e%2f%2e%2e%2fetc%2fpasswd</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Bypass 2</div>
        <div class="step-body"><strong>Nested Traversal</strong><br>If the filter removes <code>../</code> non-recursively, use <code>....//</code> or <code>..././</code>. When the inner <code>../</code> is removed, the outer characters collapse to form a new <code>../</code> sequence.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Bypass 3</div>
        <div class="step-body"><strong>Null Byte Injection</strong><br>Old PHP applications can be tricked by adding a null byte terminator: <code>../../../etc/passwd%00.jpg</code>. The application sees a valid <code>.jpg</code> extension, but the OS stops reading the string at the null byte.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Bypass 4</div>
        <div class="step-body"><strong>Absolute Paths</strong><br>Skip traversal entirely. If the application blindly concatenates strings, simply providing <code>/etc/passwd</code> might bypass relative path checks.</div>
      </div>`,
    questions: [
      { q: "What encoding replaces '.' with '%2e' and '/' with '%2f'?", a: "URL encoding", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What character acts as a string terminator in old PHP applications (null byte injection)?", a: "Null byte (%00)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is better for preventing path traversal: a whitelist or a blacklist of filenames?", a: "Whitelist", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What nested traversal payload bypasses a filter that only removes ../ once?", a: "....// (becomes ../ after one removal)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What approach resolves the full file path and checks if it starts within an allowed directory?", a: "Canonical path validation", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "Directory Traversal Tools & Testing",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/dir_tools_diagram.png" alt="Directory Traversal Testing & Tools"></div>
      <h3>Testing Methodology</h3>
      <p>Professional security testers use specialized methodologies and automated tools to discover directory traversal vulnerabilities at scale. Testing involves fuzzing suspected file-serving parameters with extensive wordlists containing thousands of traversal variants, encodings, and common sensitive file paths across various operating systems.</p>
      <p>Imagine a master locksmith trying to crack a safe. They don't just try one key; they have a massive keychain with thousands of slightly different skeleton keys, and they use a fast robotic arm to try every single one in seconds! Hackers do the same thing using tools like Burp Suite Intruder or ffuf. They feed these tools a massive list of different ` + "`" + `../` + "`" + ` combinations, and the tool rapidly fires them at the website until it finds the exact "skeleton key" that breaks through the server's defenses.</p>
      <h3>Professional Tools</h3>
      <div class="step-block">
        <div class="step-num">Tool 1</div>
        <div class="step-body"><strong>Burp Suite Intruder</strong><br>Intercept the file request in the Burp Proxy, send it to Intruder, and automate payload testing using a dedicated traversal wordlist.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Tool 2</div>
        <div class="step-body"><strong>dotdotpwn</strong><br>A specialized automated fuzzer explicitly designed for directory traversal testing across HTTP, FTP, TFTP, and other protocols.<br><code>dotdotpwn -m http -h target.com -U "/view?file=TRAVERSAL"</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Tool 3</div>
        <div class="step-body"><strong>ffuf / gobuster</strong><br>Fuzz file parameter values with traversal payloads.<br><code>ffuf -u "http://site.com/file?path=FUZZ" -w payloads.txt</code></div>
      </div>
      <h3>Detection Signs</h3>
      <ul>
        <li>Look for URL parameters containing filename references: <code>?file=</code>, <code>?path=</code>, <code>?doc=</code>, <code>?page=</code></li>
        <li>Identify applications serving static files dynamically (e.g., PDF viewers, image loaders, configuration editors).</li>
      </ul>`,
    questions: [
      { q: "What Burp Suite module is used to automate directory traversal payload testing?", a: "Intruder", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What Python function resolves the absolute canonical path, eliminating all ../ segments?", a: "os.path.realpath()", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What common URL parameter name suggests potential path traversal vulnerability?", a: "file (or path, doc, page, template)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What prevention method uses numeric IDs instead of filenames, so user input never includes a real path?", a: "Indirect file reference (mapping IDs to files server-side)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What HTTP status code should be returned when a traversal attempt is blocked?", a: "403 (Forbidden)", hint: "Refer to the HTTP protocol details." }
    ]
  },
  {
    title: "Log Poisoning via Path Traversal",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/dir_poisoning_diagram.png" alt="Log Poisoning via LFI / Path Traversal"></div>
      <h3>Elevating Traversal to Code Execution</h3>
      <p>Log Poisoning is an advanced exploitation technique that escalates a simple path traversal (or Local File Inclusion - LFI) vulnerability into full Remote Code Execution (RCE). An attacker intentionally triggers error messages or crafts specific web requests containing malicious code (like PHP snippets) that are written into the server's log files. The attacker then uses the path traversal vulnerability to force the application to read and execute the poisoned log file.</p>
      <p>Imagine a hotel where the manager forces the receptionist to read the guestbook out loud every night. A hacker realizes this, so they write a dangerous magic spell inside the guestbook under a fake name. Later that night, when the manager tells the receptionist to read the guestbook out loud, the receptionist accidentally reads the magic spell, causing the entire hotel to explode! In web hacking, an attacker sneaks their computer code into the website's daily "log book." Then, they use Directory Traversal to force the website to read its own log book out loud. When the website reads the hacker's hidden code, it accidentally executes it, giving the hacker total control!</p>
      <h3>The Attack Chain</h3>
      <div class="step-block">
        <div class="step-num">Phase 1</div>
        <div class="step-body"><strong>Poison the Log</strong><br>Send a web request with a PHP payload injected into the <code>User-Agent</code> header: <code>User-Agent: &lt;?php system($_GET['cmd']); ?&gt;</code>. The web server blindly writes this verbatim into <code>/var/log/apache2/access.log</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Phase 2</div>
        <div class="step-body"><strong>Trigger Execution</strong><br>Use path traversal to include the poisoned log file: <code>?file=../../../var/log/apache2/access.log&cmd=whoami</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Phase 3</div>
        <div class="step-body"><strong>Alternative Poisoning</strong><br>Attempt SSH logins with a payload as the username: <code>ssh '&lt;?php system($_GET["cmd"]); ?&gt;'@target.com</code>. Traverse to <code>/var/log/auth.log</code> to execute the payload.</div>
      </div>`,
    questions: [
      { q: "What is the technique of injecting PHP code into a server log file called?", a: "Log poisoning", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What HTTP header is commonly poisoned with PHP code in log poisoning attacks?", a: "User-Agent", hint: "Refer to the HTTP protocol details." },
      { q: "What is the default Apache access log path on Linux systems?", a: "/var/log/apache2/access.log", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What happens when a path traversal vulnerability reads a poisoned log file containing PHP code?", a: "The PHP code executes on the server (Remote Code Execution)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What Linux log file can be poisoned by making an SSH login attempt with PHP code as the username?", a: "/var/log/auth.log", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "Path Traversal in APIs & Cloud",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/dir_cloud_diagram.png" alt="Path Traversal in APIs & Cloud"></div>
      <h3>Modern Traversal Variants</h3>
      <p>Path traversal is not limited to classic monolithic web servers. Modern cloud-native architectures, REST APIs, and microservices introduce new attack vectors. These include JSON-based traversal parameters, Zip Slip (archive extraction traversal), SSRF-based metadata exfiltration, and Docker container volume escapes.</p>
      <p>Imagine a modern, high-tech delivery drone. You hand the drone a package and type in the delivery address. But instead of a normal address, you type "Fly up to the cloud, go into the company's private control satellite, and bring me the master remote!" If the drone doesn't validate the address, it will literally fly out of its normal delivery route and steal the company's secrets from the cloud! Today, hackers don't just use path traversal on normal websites; they use it against modern APIs, cloud storage buckets, and Docker containers to break out of isolated environments and steal high-level cloud credentials.</p>
      <h3>Modern Attack Vectors</h3>
      <div class="step-block">
        <div class="step-num">Vector 1</div>
        <div class="step-body"><strong>Zip Slip</strong><br>An attacker uploads a malicious archive containing files with <code>../</code> in their names. When extracted by a vulnerable library, the files overwrite critical system files outside the target extraction directory (e.g., overwriting a cron job).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Vector 2</div>
        <div class="step-body"><strong>REST APIs</strong><br>Exploiting path parameters: <code>GET /api/v1/files/../../../../etc/passwd</code>. These are often harder to detect as they are hidden within JSON payloads rather than URL query strings.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Vector 3</div>
        <div class="step-body"><strong>Cloud Storage SSRF</strong><br>Using traversal to escape intended object paths and forcing the cloud server to query its own metadata IP: <code>http://169.254.169.254/latest/meta-data/</code>, leaking cloud API credentials.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Vector 4</div>
        <div class="step-body"><strong>Container Escapes</strong><br>If a Docker container poorly mounts a host volume (e.g., <code>/host</code> mapped to <code>/data</code>), a traversal payload to <code>/data/../../etc/passwd</code> reads the underlying HOST machine's file, escaping the container sandbox!</div>
      </div>`,
    questions: [
      { q: "What is Zip Slip?", a: "A path traversal attack via malicious archive entry names containing ../ that overwrite files outside the target directory", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What cloud metadata IP address can be accessed via SSRF or path traversal to steal cloud credentials?", a: "169.254.169.254", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What CVE number identified the critical Apache HTTP Server 2.4.49 path traversal vulnerability?", a: "CVE-2021-41773", hint: "Refer to the HTTP protocol details." },
      { q: "In a Docker container, why can path traversal reach the host filesystem?", a: "Because volume mounts expose host directories inside the container", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "In a REST API endpoint like /api/files/{filename}, what input would a tester use to test for path traversal?", a: "../../../../etc/passwd", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "Real-World Cases & Secure Coding",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/dir_defense_diagram.png" alt="Path Traversal Secure Coding"></div>
      <h3>Defending Against Traversal</h3>
      <p>Preventing directory traversal requires strict, defense-in-depth secure coding practices. Applications must never trust user-supplied input to directly form filesystem paths. Developers should resolve all paths to their canonical form (resolving all symbolic links and ` + "`" + `../` + "`" + ` sequences) and strictly verify that the resolved path originates within an intended, isolated base directory.</p>
      <p>Imagine designing an unhackable bank vault. Instead of letting customers walk into the vault to grab their safe deposit box, you force them to wait in the lobby. The customer writes down their box number. The bank teller takes the paper, completely ignores any weird instructions written on it, walks to the vault themselves, verifies the box number exists, grabs the box, and brings it back to the lobby. The customer never touches the vault door! Secure coding works exactly like this. The server takes the user's requested file name, sanitizes it, double-checks the exact mathematical path, and serves the file securely without ever letting the user's input directly touch the operating system's file commands.</p>
      <h3>Secure Coding Principles</h3>
      <div class="step-block">
        <div class="step-num">Principle 1</div>
        <div class="step-body"><strong>Canonical Path Validation</strong><br>Use built-in framework functions to resolve the absolute path, then check the prefix.<br><code>safe_path = os.path.realpath(os.path.join(BASE_DIR, filename))</code><br><code>if not safe_path.startswith(BASE_DIR): abort(403)</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Principle 2</div>
        <div class="step-body"><strong>Indirect Object References</strong><br>Never pass filenames. Use database IDs mapped to files server-side. For example, request <code>?file_id=5</code>, and the server queries the database to find the safe filename associated with ID 5.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Principle 3</div>
        <div class="step-body"><strong>Extract Only Filenames</strong><br>Strip all directory components entirely from user input using <code>os.path.basename(filename)</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Principle 4</div>
        <div class="step-body"><strong>Least Privilege</strong><br>Ensure the web server process runs with minimal operating system privileges, guaranteeing it physically cannot read files like <code>/etc/shadow</code> even if a traversal vulnerability exists.</div>
      </div>`,
    questions: [
      { q: "What Apache version introduced the critical CVE-2021-41773 path traversal vulnerability?", a: "Apache HTTP Server 2.4.49", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "In secure Python code, what function strips directory components, returning only the filename?", a: "os.path.basename()", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "In Node.js, what function resolves a path to its absolute form, resolving all ../ segments?", a: "path.resolve()", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What key secure coding principle ensures sensitive files (like /etc/shadow) can't be reached even if traversal succeeds?", a: "Storing sensitive files outside the web root", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What check in PHP confirms the resolved path starts within the allowed base directory?", a: "strpos($requested, $base) !== 0 (or using str_starts_with)", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  }
];
