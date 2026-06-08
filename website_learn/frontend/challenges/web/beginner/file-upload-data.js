const LESSONS = [
  {
    title: "Unrestricted File Upload",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/fileupload_concept_nologo_1779677390166.png" alt="Unrestricted File Upload"></div>
      <h3>What is an Unrestricted File Upload?</h3>
      <p>An unrestricted file upload vulnerability occurs when a web application allows users to upload files without sufficiently validating their name, type, contents, or size. If the application server executes these uploaded files rather than just storing them, attackers can upload malicious server-side scripts (like PHP, ASP, or JSP files). Once accessed via the browser, these scripts execute with the privileges of the web server, leading to full Remote Code Execution (RCE) and complete system compromise.</p>
      <p>Imagine a magical mailbox that lets anyone drop a letter inside. The mail carrier takes the letter and puts it on a big bulletin board for everyone to read. This works great if people only send nice letters or pictures. But what if a sneaky villain drops a magic spell into the mailbox? If the mail carrier doesn't carefully check what they are putting on the board, the magic spell might activate and take over the entire town! In the computer world, if security guards are lazy and don't check what an uploaded file actually is, a hacker can upload dangerous code. When the website tries to look at the "picture," the hacker's code activates instead, taking control of the server.</p>
      <h3>The Classic Web Shell Attack</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Upload Payload</strong><br>Attacker uploads: <code>shell.php</code> containing <code>&lt;?php system($_GET['cmd']); ?&gt;</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>File Storage</strong><br>The file is saved to the server's public directory, e.g., <code>/var/www/html/uploads/shell.php</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Execute the Shell</strong><br>Attacker visits the uploaded file: <code>http://site.com/uploads/shell.php?cmd=whoami</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 4</div>
        <div class="step-body"><strong>Full Control</strong><br>The server executes the <code>whoami</code> command and returns the output. Full Remote Code Execution (RCE) is achieved!</div>
      </div>`,
    questions: [
      { q: "What is the most severe consequence of an unrestricted file upload vulnerability?", a: "Remote Code Execution (RCE)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What file extension indicates a PHP script most targeted for web shell uploads?", a: ".php", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What technique adds real file headers like 'GIF89a;' to a malicious file to bypass magic byte checks?", a: "Magic bytes injection", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What request interception tool can change the Content-Type header to bypass MIME type checks?", a: "Burp Suite", hint: "Look for the specific tools mentioned in the lesson." },
      { q: "What extension variation of .php attempts to bypass case-sensitive extension filters?", a: ".pHp (case variation) or .php5, .phtml", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "Web Shells & Exploitation",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/fileupload_low_nologo_1779677421616.png" alt="Web Shells"></div>
      <h3>Understanding Web Shells</h3>
      <p>A web shell is a malicious script uploaded to a server that provides the attacker with a web-based interface for remote command execution. Unlike a traditional reverse shell that connects back to the attacker's terminal over a dedicated network port, a web shell communicates entirely over standard HTTP/HTTPS traffic. This makes it incredibly stealthy, as it blends in with normal web browsing activity and easily bypasses outbound firewall rules that would normally block strange network connections.</p>
      <p>Imagine a bank robber who manages to sneak a walkie-talkie into the bank manager's office. Instead of breaking down the front door and setting off alarms, the robber can sit safely in a coffee shop across the street, quietly whispering commands into the radio. A web shell is just like that walkie-talkie. It gets secretly placed inside the server, allowing the hacker to comfortably send silent commands through their regular web browser without setting off standard network firewalls.</p>
      <h3>Simple Web Shell Examples</h3>
      <div class="step-block">
        <div class="step-num">PHP GET</div>
        <div class="step-body"><strong>Basic One-Liner</strong><br><code>&lt;?php system($_GET['cmd']); ?&gt;</code><br>Usage: <code>http://site.com/uploads/shell.php?cmd=whoami</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">PHP POST</div>
        <div class="step-body"><strong>Stealthy Execution</strong><br><code>&lt;?php system($_POST['cmd']); ?&gt;</code><br>Commands are sent via POST body, keeping them out of URL access logs.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Auth Shell</div>
        <div class="step-body"><strong>Password Protected</strong><br><code>&lt;?php if($_GET['pass'] === 'secret123') { system($_GET['cmd']); } ?&gt;</code><br>Prevents other hackers from stealing the shell.</div>
      </div>
      <h3>Finding Uploaded Shells</h3>
      <ul>
        <li>Scan upload directories for unexpected executable file extensions (.php, .jsp, .aspx).</li>
        <li>Check webserver access logs for unusual, repetitive GET or POST requests to files in the <code>/uploads/</code> directory.</li>
        <li>Monitor the filesystem for newly created files containing system execution functions (like <code>shell_exec</code> or <code>Runtime.getRuntime().exec</code>).</li>
      </ul>`,
    questions: [
      { q: "In a PHP web shell, what function executes system commands and returns output?", a: "system() (or shell_exec(), exec())", hint: "Check the command reference blocks." },
      { q: "What is the best defense location for storing uploaded files — inside or outside the web root?", a: "Outside the web root", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What are the first 4 hex bytes (magic bytes) of a PNG image file?", a: "89 50 4E 47", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What popular feature-rich PHP web shell includes a file manager and SQL client?", a: "b374k", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What HTTP method for web shell commands is harder to detect in web server access logs?", a: "POST", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "Bypassing Advanced Upload Filters",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/fileupload_medium_nologo_1779677455707.png" alt="Bypassing Filters"></div>
      <h3>Evasion Techniques for Upload Filters</h3>
      <p>When basic validation is implemented, attackers use advanced evasion techniques to bypass the filters. These include Content-Type spoofing (modifying the HTTP header to trick MIME validation), double extensions (exploiting Apache parser misconfigurations like ` + "`" + `shell.php.jpg` + "`" + `), case variations (` + "`" + `.pHp` + "`" + `), and polyglot files. Polyglots are files that simultaneously conform to multiple format specifications; for example, a file that contains valid JPEG headers and EXIF data, but also contains valid PHP code embedded within its metadata comments.</p>
      <p>Imagine you are trying to sneak a secret diary into a library that only allows picture books. The guard checks the cover of every book. First, you try gluing a picture book cover over your diary (Content-Type spoofing). If the guard is smart and flips through the pages, you have to get creative. You take a real, beautiful picture book, but you write your secret diary entries in tiny, invisible ink in the margins! (This is a Polyglot file). The guard flips through, sees the pretty pictures, and lets you in, completely unaware of the hidden text. Hackers do this by hiding their code inside the metadata of real, valid image files!</p>
      <h3>Common Evasion Methods</h3>
      <div class="step-block">
        <div class="step-num">Method 1</div>
        <div class="step-body"><strong>Extension Case Sensitivity</strong><br>Linux filesystems are case-sensitive. If a developer only blocks <code>.php</code>, you can bypass it with <code>.PHP</code>, <code>.Php</code>, or <code>.pHp</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Method 2</div>
        <div class="step-body"><strong>Content-Type Spoofing</strong><br>Using a proxy like Burp Suite, intercept the upload request and change <code>Content-Type: application/x-php</code> to <code>Content-Type: image/jpeg</code> before it reaches the server.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Method 3</div>
        <div class="step-body"><strong>Polyglot Files (Metadata Injection)</strong><br>Embed PHP in the EXIF data of a real image using Exiftool:<br><code>exiftool -Comment='&lt;?php system($_GET["cmd"]); ?&gt;' shell.jpg</code><br>The file passes image checks but executes if passed to the PHP interpreter.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Method 4</div>
        <div class="step-body"><strong>SVG File XSS</strong><br>If PHP is blocked, upload an SVG image containing JavaScript. Because SVG is XML-based, the browser will execute the embedded script when viewing the image, causing Stored XSS.</div>
      </div>`,
    questions: [
      { q: "What Apache configuration directive causes any file with .php in its name to be executed as PHP?", a: "AddHandler application/x-httpd-php .php", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What alternative PHP file extension (not .php) is commonly forgotten in extension blacklists?", a: ".phtml (or .phar, .php5, .php7)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What tool can embed PHP code into a JPEG image's EXIF metadata?", a: "exiftool", hint: "Look for the specific tools mentioned in the lesson." },
      { q: "What XML-based image format can contain embedded JavaScript and is often overlooked by file upload filters?", a: "SVG", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is a polyglot file in the context of file upload attacks?", a: "A file that is simultaneously valid as two different file types (e.g., valid JPEG and valid PHP)", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "Server-Side Issues: XXE & SSRF via Upload",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/fileupload_high_nologo_1779677473626.png" alt="XXE & SSRF"></div>
      <h3>Beyond Web Shells: XML & Image Parsing</h3>
      <p>File uploads can trigger server-side vulnerabilities beyond direct code execution. When an application processes complex file formats like XML, SVG, or modern document formats (DOCX/XLSX, which are zipped XML files), poorly configured parsers can be exploited. Malicious XML can trigger XML External Entity (XXE) injection to read local server files or initiate Server-Side Request Forgery (SSRF). Similarly, image processing libraries (like ImageMagick) can be exploited to execute remote payloads during the resizing or metadata extraction process.</p>
      <p>Imagine handing a magical scroll to a royal reader. You don't want the reader to just hold the scroll; you want them to read it out loud. But instead of a normal story, you write a command on the scroll that says: "Dear Reader, please stop reading this, go into the King's private vault, memorize the secret combination, and shout it out loud!" Because the reader blindly follows the instructions written on the scroll, they accidentally reveal the King's secrets. This is what happens with XXE and SSRF: the server's processing tools blindly execute the hidden instructions embedded inside uploaded documents and images.</p>
      <h3>Advanced Upload Exploits</h3>
      <div class="step-block">
        <div class="step-num">XXE Attack</div>
        <div class="step-body"><strong>XML External Entity Injection</strong><br>Upload an XML (or SVG) file containing external entities pointing to local files:<br><code>&lt;!ENTITY xxe SYSTEM "file:///etc/passwd"&gt;</code><br>When parsed, the entity is replaced with the system file's contents.</div>
      </div>
      <div class="step-block">
        <div class="step-num">SSRF via XXE</div>
        <div class="step-body"><strong>Stealing Cloud Metadata</strong><br>Change the entity to target internal network endpoints, such as the AWS metadata server:<br><code>&lt;!ENTITY xxe SYSTEM "http://169.254.169.254/latest/meta-data/"&gt;</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">ImageTragick</div>
        <div class="step-body"><strong>Image Parsing RCE</strong><br>Vulnerabilities in libraries like ImageMagick allow code execution when the server attempts to resize or process an uploaded image.</div>
      </div>
      <h3>Prevention Tactics</h3>
      <ul>
        <li>Disable external entity resolution (e.g., ` + "`" + `resolve_entities=False` + "`" + `) in all XML parsers.</li>
        <li>Keep image processing libraries up to date and disable vulnerable delegates in configuration files.</li>
      </ul>`,
    questions: [
      { q: "What XML attack uses external entity references to read local files or make server-side HTTP requests?", a: "XML External Entity injection (XXE)", hint: "Refer to the HTTP protocol details." },
      { q: "What file format (used by Microsoft Office) is a ZIP archive containing XML files vulnerable to XXE?", a: "DOCX (or XLSX)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What cloud metadata URL can be reached via XXE SSRF to steal cloud credentials?", a: "http://169.254.169.254/latest/meta-data/", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What ImageMagick vulnerability (CVE-2016-3714) allowed code execution via malicious image files?", a: "ImageTragick", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What XML parser setting should be disabled to prevent XXE attacks?", a: "External entity resolution (resolve_entities=False or equivalent)", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "Secure File Upload Implementation",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/fileupload_defense_nologo_1779677510360.png" alt="Secure Uploads"></div>
      <h3>Defense-in-Depth for File Uploads</h3>
      <p>Properly securing file uploads requires a defense-in-depth approach, utilizing multiple, overlapping security controls. A single validation check (like checking the extension or the MIME type) is never sufficient, as attackers possess specialized techniques to bypass individual layers. Secure architecture dictates that uploaded files should be completely decoupled from the web execution environment, stripped of their original metadata, and heavily scrutinized before ever interacting with users.</p>
      <p>Imagine building a high-security quarantine facility for alien artifacts. You wouldn't just put a padlock on the front door and call it safe! First, you put the artifacts in a bunker miles away from the city (Storing Outside Web Root). Then, you completely strip off their original alien names and assign them random barcode numbers (Renaming Files). Finally, you send them through an X-ray scanner, an acid wash, and a radiation bath to destroy any hidden bugs (Image Re-encoding). By combining all these intense security layers together, it becomes impossible for a dangerous alien bug to accidentally escape into the city!</p>
      <h3>Complete Secure Upload Checklist</h3>
      <div class="step-block">
        <div class="step-num">Layer 1</div>
        <div class="step-body"><strong>Store Outside the Web Root</strong><br>Never store uploads in a directory accessible via a direct URL (like <code>/var/www/html/uploads</code>). Store them in isolated directories (like <code>/var/uploads</code>) and serve them via a controlled script.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Layer 2</div>
        <div class="step-body"><strong>Rename Files to UUIDs</strong><br>Never keep the user's original filename. Rename every file to a random UUID (e.g., <code>a7f3b2c4-1234...</code>). Without a <code>.php</code> extension, the server will not execute it even if it bypasses other checks.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Layer 3</div>
        <div class="step-body"><strong>Server-Side Extension Whitelists</strong><br>Never use blacklists. Only allow explicitly safe extensions using strict server-side logic: <code>$allowed = ['jpg', 'png', 'pdf'];</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Layer 4</div>
        <div class="step-body"><strong>Disable Execution & Scan</strong><br>Use <code>.htaccess</code> or server configurations to disable script execution in upload directories. Implement ClamAV to scan all incoming files for malware signatures.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Layer 5</div>
        <div class="step-body"><strong>Image Re-encoding</strong><br>For images, process them through a safe library (like Python's Pillow) to strip all EXIF metadata and hidden polyglot payloads, saving only the clean pixel data.</div>
      </div>`,
    questions: [
      { q: "What is the safest location to store uploaded files to prevent direct web access?", a: "Outside the web root (e.g., /var/uploads/)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What method of renaming uploaded files prevents extension-based execution even if stored in the web root?", a: "Renaming to a UUID (no file extension)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What Apache directive removes PHP handler from the uploads directory to prevent script execution?", a: "RemoveHandler .php .phtml", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Should you use an extension whitelist or blacklist to validate file uploads?", a: "Whitelist (only allow known safe extensions)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What open-source antivirus engine is commonly used to scan uploaded files on Linux servers?", a: "ClamAV", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  }
];
