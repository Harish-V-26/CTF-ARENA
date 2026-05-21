const LESSONS = [
  {
    title: "1. Start Here — Set Up the Lab",
    points: 10,
    content: `THE SECRET TRAINING BASE
Welcome to your digital training base! Today, we are going to learn how hackers attack website upload forms. This lab is built strictly for education, which means you should only test these tricks inside this private playground. To start, look at the red boxes at the top of this page. You will see a button to launch the "DVWA Target Server" (the victim computer) and another button to start your "Kali Linux Environment" (your attack machine).

PREPARING THE TARGET
Click the "Open DVWA Target" button first to spin up the target website in a new tab. Once it loads, click "Setup / Reset DB" in the left menu, and click the big button to create the database. This prepares the playground. Next, log in using the credentials: Username: "admin" and Password: "password". Finally, go to the "DVWA Security" tab, change the dropdown setting to "Low", and click Submit. Now, launch your Kali Linux attack terminal using the command shown in the second box to get your command line ready!`,
    questions: [
      { q: "What username do you use to log into DVWA?", a: "admin" },
      { q: "What security level must DVWA be set to for Lesson 4 (basic upload)?", a: "low" },
      { q: "After clicking 'Create / Reset Database', what should you see?", a: "success" }
    ]
  },
  {
    title: "2. What is a File Upload Vulnerability?",
    points: 10,
    content: `THE TRICK PACKAGE
Imagine you are the guard of a museum, and you let visitors bring in flat drawing pads to sketch the art. One day, a sneaky visitor walks in carrying a giant wooden box shaped like a drawing pad. Inside the box, they have hidden a remote-controlled robot helper. Once they leave the box in the hallway, they press a button on their remote control, the robot pops out of the box, unlocks the museum's back doors, and lets the visitor run inside! This is exactly how a file upload vulnerability works.

THE REMOTE CONTROL
When a website has an upload box for profile pictures (JPEGs or PNGs), it expects harmless image files. But if the website does not check the file type properly, a hacker can upload a small computer program (called a "Web Shell") disguised as a photo. Once the website saves this program in its public folders, the hacker can visit the file's web address in their browser. This visits the script, which runs inside the server and lets the hacker type terminal commands to read databases, delete files, or take complete control of the machine!`,
    questions: [
      { q: "What is it called when an attacker runs code on a remote server?", a: "Remote Code Execution" },
      { q: "What do we call a PHP script uploaded to run OS commands via a URL?", a: "web shell" },
      { q: "In DVWA, what is the name of the folder where uploaded files are stored?", a: "hackable/uploads" }
    ]
  },
  {
    title: "3. Linux Commands You Will Use",
    points: 10,
    content: `THE SECRET SPELLS
Once you have uploaded your web shell script, you will talk to it using URL parameters in your browser bar. To tell the server what to do, you will use standard Linux commands. The first command is "whoami", which tells the server: "Print the name of the user account running this web program!" The server will usually reply with "www-data", which is the low-privilege service account used by the Apache web server.

EXPLORING the CABINETS
You can also use the command "pwd" to ask the server: "Which folder directory on the hard drive are we currently sitting in?" The server will reply with the path "/var/www/html/dvwa/hackable/uploads". To list all other files in that directory, you use the "ls" command. If you want to read a specific configuration file on the computer, you use the "cat" command followed by the file path, like "cat /etc/passwd". You separate the words in your browser address bar with plus signs (+) because URLs cannot contain spaces.`,
    questions: [
      { q: "Which command shows what OS user the web server is running as?", a: "whoami" },
      { q: "Which command lists files in the current directory?", a: "ls" },
      { q: "In a URL, what character replaces a space in the cmd parameter?", a: "+" }
    ]
  },
  {
    title: "4. DVWA Low — Upload Your First Shell",
    points: 20,
    content: `BUILDING THE ROBOT
Now we will build our first web shell script. Open your Kali Linux terminal and run the "cat > shell.php" command shown below to create a file named "shell.php". Inside this file, we write a small script: "<?php if(isset($_REQUEST['cmd'])){ echo shell_exec($_REQUEST['cmd']); } ?>". This script tells the server: "Listen for any text sent in the URL after '?cmd=', run it in the main system terminal, and print the results back on my screen."

PLANTING THE PAYLOAD
Next, head over to the DVWA tab in your browser and click on the "File Upload" page. Click the "Choose File" button, select the "shell.php" file you just created in your Kali folder, and click the "Upload" button. The website will display a success message showing the path where the file was saved. Now, copy that path, paste it in your browser address bar, and append "?cmd=whoami" to the end of the URL. The screen will display "www-data", confirming you just achieved Remote Code Execution!`,
    questions: [
      { q: "What PHP function runs an OS command and returns its output?", a: "shell_exec" },
      { q: "After uploading shell.php on Low, which folder is it saved in?", a: "hackable/uploads" },
      { q: "What URL parameter sends commands to the web shell?", a: "cmd" }
    ]
  },
  {
    title: "5. How Servers Check Files (MIME & Magic Bytes)",
    points: 10,
    content: `THE SECURITY BARRIERS
Websites use different checks to stop hackers from uploading shells. The first method is checking the "Content-Type" header. When your browser uploads a file, it attaches a label like "Content-Type: image/jpeg". The server checks this label and blocks the upload if it says "application/x-php". The second method is checking the "File Extension," which is the suffix at the end of the filename (like blocking ".php" but allowing ".jpg").

THE MAGIC HEADER
The third, most secure check is reading the "Magic Bytes." Every real file format starts with a unique signature at the very beginning of the file. For example, a GIF image always starts with the characters "GIF89a". To check this, developers use a PHP function called "getimagesize()". To bypass this, hackers use a trick: they write the characters "GIF89a" at the very first line of their PHP script! The checker reads the first few characters, thinks it is a real GIF image, and lets it through, but the PHP engine still runs the code below it!`,
    questions: [
      { q: "What HTTP header tells the server what type of file is being uploaded?", a: "Content-Type" },
      { q: "What 6 characters do you prepend to trick getimagesize() into thinking a file is a GIF?", a: "GIF89a" },
      { q: "What are the specific bytes at the start of a file that identify its real type called?", a: "magic bytes" }
    ]
  },
  {
    title: "6. DVWA Medium — Bypass the MIME Check",
    points: 20,
    content: `THE LYING LABEL
On Medium security, the developer has added a rule that checks the Content-Type header. If you try to upload "shell.php" normally, your browser tells the server: "This is a PHP file," and the server blocks it. To bypass this, we will use a tool called "curl" from our Kali Linux terminal to upload our shell. Curl lets us manually specify the request headers, meaning we can write our own labels!

TRICKING THE UPLOADER
We will run a curl command that includes the parameter "type=image/jpeg". This forces curl to label our PHP file as a JPEG image. When the server reads the request header, it sees the "image/jpeg" tag, assumes the file is a harmless photo of a cat, and saves it in the uploads folder. The server doesn't look at the file extension or the file body itself! Once the command finishes, you can visit the uploaded shell in your browser and execute commands just like before.`,
    questions: [
      { q: "What is it called when you fake the Content-Type header to bypass file type checks?", a: "MIME spoofing" },
      { q: "In the curl command, which part sets the fake MIME type?", a: "type=image/jpeg" },
      { q: "Where do you find your PHPSESSID cookie value?", a: "developer tools" }
    ]
  },
  {
    title: "7. DVWA High — Bypass Magic Byte Check",
    points: 20,
    content: `THE DOUBLE ATTACK
On High security, the website uses the "getimagesize()" function to check the magic bytes, and it also blocks any file extension that contains ".php". This means MIME spoofing fails, and we cannot name our file ".php" either. To bypass this double check, we must build a "Polyglot" file. In your Kali terminal, write a command to create a file named "evil.gif" that starts with the characters "GIF89a" followed by our PHP script.

CHAINING THE BUGS
When we upload "evil.gif", the server checks the magic bytes (which match "GIF89a"), checks the extension (which matches ".gif"), and saves the file. But because the file ends in ".gif", the web server will not run it as PHP if we visit it directly; it will just show it as a broken image. To force the server to execute the script, we must use a second bug on the site: "File Inclusion." By navigating to the File Inclusion page and pointing the "?page=" parameter to our uploaded GIF file, the PHP interpreter reads the file and executes our hidden code!`,
    questions: [
      { q: "Which PHP function reads file header bytes to validate if it is a real image?", a: "getimagesize" },
      { q: "What 6-character magic bytes do we put at the start of the file to bypass the image check?", a: "GIF89a" },
      { q: "Which second DVWA vulnerability do we use to execute the uploaded .gif as PHP?", a: "File Inclusion" }
    ]
  },
  {
    title: "8. Tool Method — Metasploit Reverse Shell",
    points: 20,
    content: `THE REVERSE CALL
So far, we have typed commands one by one in our browser URL bar. Now we will use a professional hacking tool called "Metasploit" to get a full interactive console called a "Reverse Shell." Usually, you try to connect to a target computer, but security firewalls block you. In a reverse shell, you set up a receiver on your Kali machine, and make the victim server connect back to you instead! Because the connection starts from inside the server, the firewall thinks it is safe and lets it pass.

BUILDING THE SHELL
First, we will use a tool called "msfvenom" to generate a special PHP reverse shell payload and save it as "payload.php". Next, we boot "msfconsole" and load a listener module called "exploit/multi/handler" configured with our Kali IP address (LHOST) and port (LPORT). We start the listener, go to our DVWA upload page, upload "payload.php", and visit the file's web address in our browser. The server runs the payload, connects back to our Kali machine, and opens an interactive terminal!`,
    questions: [
      { q: "What msfvenom flag sets the attacker's listening IP address?", a: "LHOST" },
      { q: "What Metasploit module listens for and handles incoming reverse shell connections?", a: "exploit/multi/handler" },
      { q: "What Meterpreter command drops you into a real system bash shell?", a: "shell" }
    ]
  },
  {
    title: "9. Defenses — How to Stop These Attacks",
    points: 15,
    content: `BUILDING THE FORTRESS
To protect file upload forms, developers must build multiple layers of defenses. First, they should use a strict "Whitelist" of allowed file extensions (only allowing JPEGs and PNGs) instead of trying to block bad ones. Second, they should use the PHP "finfo_file()" function to read the actual bytes of the file and verify its real MIME type, rather than trusting the browser's Content-Type header.

THE SECURE VAULT
Third, the server should randomly rename every uploaded file (using a UUID like a7f3b2...) and strip away the extension entirely so it cannot be run as a script. Fourth, and most importantly, uploaded files should be stored in a directory completely outside the web root (like "/var/uploads/"). Because this directory cannot be reached by a web URL, a hacker can never visit their uploaded shell to trigger it, making the attack completely harmless!`,
    questions: [
      { q: "Which PHP function reads actual file bytes to verify the real MIME type?", a: "finfo_file" },
      { q: "What Apache directive in .htaccess stops PHP execution in a directory?", a: "php_flag engine off" },
      { q: "Why is storing uploads OUTSIDE the webroot the strongest defense?", a: "the file cannot be accessed via URL" }
    ]
  },
  {
    title: "10. Final Quiz — Prove You Know It!",
    points: 15,
    content: `THE KNOWLEDGE RECAP
You have reached the final stage of the File Upload lab! Let's do a quick recap of the key concepts you mastered. You learned that file upload bugs allow Remote Code Execution (RCE) by uploading web shells. You practiced bypassing MIME headers using curl spoofing on Medium security, and getimagesize() magic bytes checks using GIF89a polyglots chained with File Inclusion on High security.

THE SECURE PATHWAY
You also studied how developers defend their systems using whitelists, finfo byte verification, file renaming, and storing uploads completely outside the web server's public root folder. These skills are essential for both auditing applications and building secure websites. Now, answer the final questions below to submit your results, close your lab container, and complete the challenge!`,
    questions: [
      { q: "What is the one-word term for running attacker-controlled code on a remote server?", a: "RCE" },
      { q: "What 6-character string bypasses getimagesize() on DVWA High?", a: "GIF89a" },
      { q: "What command starts a simple netcat listener on port 4444?", a: "nc -lvkp 4444" },
      { q: "What is the technique of using both File Upload AND File Inclusion together called?", a: "LFI upload chain" },
      { q: "Which curl flag sets the MIME type of the uploaded file (e.g. to image/jpeg)?", a: "type" }
    ]
  }
];
