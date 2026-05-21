const LESSONS = [
  {
    title: "1. The Open Window (Unrestricted File Upload)",
    points: 10,
    content: `THE OPEN DOOR
Imagine your house has a special mail slot in the front door. You only want the mail carrier to drop flat letters and postcard photos through the slot. But instead of a narrow slot, you build a giant, wide-open window on the front door with no lock on it. Now, instead of sending a postcard, a robber can slide a giant package through the window, or even climb through it themselves! This is exactly what "Unrestricted File Upload" is. Websites often let you upload files, like a profile picture (a JPEG or PNG) or a resume (a PDF). But if the programmer doesn't lock the door properly, a hacker can upload a computer program instead of a picture!

THE WEB SHELL ATTACK
The most dangerous program a hacker can upload is called a "Web Shell." In computer language, it is just a tiny script written in PHP or Python. The hacker names it "shell.php" and uploads it to the website's profile picture box. The website, being too polite, says "Thank you!" and saves it in a folder called "/uploads/". The hacker then opens their web browser and goes to the web address "website.com/uploads/shell.php". The website's server sees the PHP file and executes it! The hacker can now type computer commands in their browser, like "whoami", and the server will execute them. The hacker just climbed through the window and took over the entire house!

BYPASSING THE GUARDS
Websites try to hire security guards to check the files. If the guard sees a file ending in ".php", they throw it away. But hackers use clever tricks to bypass the guards. If the guard blocks ".php", the hacker might name their file "shell.phtml" or "shell.pHp" with mixed capital letters, which the guard might not recognize. If the guard checks the "Content-Type" (which is like a label on the package), the hacker uses a tool called Burp Suite to rewrite the label to say "image/jpeg" even though the file is actually full of evil code! The guard reads the label, thinks it's a photo, and lets it through.`,
    questions: [
      { q: "What is the most severe consequence of letting users upload any file they want?", a: "Remote Code Execution (RCE)" },
      { q: "What file extension indicates a PHP script most targeted for web shell uploads?", a: ".php" },
      { q: "What technique adds real file headers like 'GIF89a;' to a malicious file to bypass magic byte checks?", a: "Magic bytes injection" },
      { q: "What request interception tool can change the Content-Type header to bypass MIME type checks?", a: "Burp Suite" },
      { q: "What extension variation of .php attempts to bypass case-sensitive extension filters?", a: ".pHp (case variation) or .php5, .phtml" }
    ]
  },
  {
    title: "2. The Hacked Photo (Web Shells)",
    points: 10,
    content: `THE SNEAKY PHP CODE
A web shell is like a remote control for a toy car. You click a button on the remote, and the car moves. When a hacker uploads a web shell to a website's server, they are installing their own remote control. A simple PHP web shell is only one line of code: "<?php system($_GET['cmd']); ?>". This tiny code tells the server: "Go get whatever command I type in the URL bar, and run it in the main control room!" It is incredibly tiny, making it very easy to hide inside a folder with thousands of real photos.

ADVANCED REMOTE CONTROLS
Hackers don't just use simple one-liners. They also use advanced, pre-made web shells with beautiful user interfaces, like "b374k" or "c99". Once uploaded, these shells look like a complete operating system inside your web browser. They have file managers that let the hacker click folders, copy files, edit text, and even read database passwords. They even have databases clients built right in so the hacker can steal credit cards with a single click. It turns the hacker's browser into a complete control dashboard for the victim's server.

WHERE THE SECRETS HIDE
To protect files, the best thing a programmer can do is store uploaded files completely outside the web root directory. The web root is the public folder that you can visit using a web browser. If the files are saved outside the web root (like in "/var/uploads/"), a browser cannot navigate to them. Even if a hacker successfully uploads a web shell, they cannot click it or open it in their browser, meaning the shell sits there completely lifeless and harmless, unable to hurt the server!`,
    questions: [
      { q: "In a PHP web shell, what function executes system commands and returns output?", a: "system() (or shell_exec(), exec())" },
      { q: "What is the best defense location for storing uploaded files — inside or outside the web root?", a: "Outside the web root" },
      { q: "What are the first 4 hex bytes (magic bytes) of a PNG image file?", a: "89 50 4E 47" },
      { q: "What popular feature-rich PHP web shell includes a file manager and SQL client?", a: "b374k" },
      { q: "What HTTP method for web shell commands is harder to detect in web server access logs?", a: "POST" }
    ]
  },
  {
    title: "3. Disguising the Files (Advanced Bypasses)",
    points: 10,
    content: `THE DOUBLE IDENTITY
If the website's security guards are very strict, hackers have to use advanced magic tricks to disguise their files. One trick is the "Double Extension Attack." The hacker names their file "shell.php.jpg". The stupid security guard looks at the very end of the name, sees ".jpg", and says, "Oh, it's a JPEG photo! Come on in." But the web server (like Apache) is misconfigured. It looks at the file, sees ".php" in the middle, and decides to run it as a PHP script anyway! The hacker successfully sneaked their script past the guard by giving it a double identity.

THE MAGIC BYTES
Sometimes, the security guard doesn't just look at the filename; they open the file and look at the first few letters. Real images have special, secret codes at the very beginning of the file called "Magic Bytes." For example, a PNG file always starts with the bytes "89 50 4E 47". A GIF file always starts with "GIF89a;". The guard reads the first few bytes, and if the code doesn't match, they block the file. To bypass this, hackers write "GIF89a;" at the very top of their PHP file! The guard reads the top, thinks it's a GIF, and lets it through. The PHP interpreter ignores the GIF letters and runs the code below them anyway!

THE POLYGLOT MAGIC
The ultimate disguise is a "Polyglot File." This is a file that is literally two things at once! A hacker can take a real, beautiful JPEG photo of a cat, and use a tool called "exiftool" to hide their PHP code inside the photo's metadata (its camera details). The file is a perfectly valid, working JPEG photo that you can open and look at. But if the web server reads the photo metadata and runs it through PHP, the code executes! The file is both a cat photo AND a virus at the same time, easily passing every security check in the book.`,
    questions: [
      { q: "What Apache configuration directive causes any file with .php in its name to be executed as PHP?", a: "AddHandler application/x-httpd-php .php" },
      { q: "What alternative PHP file extension (not .php) is commonly forgotten in extension blacklists?", a: ".phtml (or .phar, .php5, .php7)" },
      { q: "What tool can embed PHP code into a JPEG image's EXIF metadata?", a: "exiftool" },
      { q: "What XML-based image format can contain embedded JavaScript and is often overlooked by file upload filters?", a: "SVG" },
      { q: "What is a polyglot file in the context of file upload attacks?", a: "A file that is simultaneously valid as two different file types (e.g., valid JPEG and valid PHP)" }
    ]
  },
  {
    title: "4. The Trojan SVG (XXE & SSRF)",
    points: 10,
    content: `THE XML TRAP
File upload features don't just lead to web shells; they can also trigger other terrifying attacks. One common file type people upload is SVG (Scalable Vector Graphics), which is a type of picture. But unlike JPEGs, SVG files are actually written in a computer language called XML! XML is a markup language that lets you define data. If a website lets you upload an SVG file, and then uses a parser to read the XML to display the picture, a hacker can hide a trap inside the SVG. This trap is called "XML External Entity" (XXE) injection.

MAILING THE PASSWORDS
Inside the malicious SVG file, the hacker writes a special rule: "Define an entity called 'xxe' that points to the file 'file:///etc/passwd'." Then, they place the symbol "&xxe;" inside the picture data. When the server tries to read the SVG file to draw the picture, it sees the symbol "&xxe;", goes to the computer's hard drive, opens the "/etc/passwd" file, reads all the usernames, and pastes them directly into the picture! The hacker downloads the rendered picture and reads the usernames. They used a picture to steal system files!

TRICKING THE SERVER (SSRF)
The hacker can also use this XML trap to make the server talk to other computers. They can point the entity to a cloud metadata address, like "http://169.254.169.254/latest/meta-data/". When the server parses the XML, it secretly connects to the cloud server, grabs the administrator's master access keys, and prints them inside the picture. This is called Server-Side Request Forgery (SSRF) via XXE. To prevent this, programmers must configure their XML parsers to completely disable "external entity resolution" so the parser ignores any external links.`,
    questions: [
      { q: "What XML attack uses external entity references to read local files or make server-side HTTP requests?", a: "XML External Entity injection (XXE)" },
      { q: "What file format (used by Microsoft Office) is a ZIP archive containing XML files vulnerable to XXE?", a: "DOCX (or XLSX)" },
      { q: "What cloud metadata URL can be reached via XXE SSRF to steal cloud credentials?", a: "http://169.254.169.254/latest/meta-data/" },
      { q: "What ImageMagick vulnerability (CVE-2016-3714) allowed code execution via malicious image files?", a: "ImageTragick" },
      { q: "What XML parser setting should be disabled to prevent XXE attacks?", a: "External entity resolution (resolve_entities=False or equivalent)" }
    ]
  },
  {
    title: "5. Safe Building Blocks (Defense)",
    points: 10,
    content: `THE SAFE BOX
To completely secure file uploads, developers must build a multi-layered defense. The first rule is to rename every single file that is uploaded. If you upload a file named "myphoto.php", the server should immediately rename it to a random string of numbers, like a UUID (e.g. "a7f3b2c4-1234-5678-abcd-ef0123456789") and strip away the extension entirely. Because the file has no ".php" extension, the server will never try to execute it as a script, even if it is stored in the public folder.

THE STRICT WHITELIST
Programmers must also use a strict "Whitelist" of allowed file extensions. They should write a rule: "Only allow files that end in '.jpg', '.jpeg', '.png', or '.gif'. Block absolutely everything else." Blacklists (trying to block '.php' and '.py') are a terrible idea because hackers will always find a new extension, like '.phtml' or '.phar', that the programmer forgot to put on the list. The whitelist is simple, clear, and extremely hard to bypass.

THE HTACCESS SHIELD
If the web app uses Apache, programmers can place a special configuration file called ".htaccess" inside the uploads folder. This file acts like a shield. Inside the file, they write: "php_flag engine off". This command tells the web server: "If anyone tries to load any script inside this folder, turn off the PHP execution engine. Just treat the script like plain text." Now, even if a hacker successfully bypasses all filters and uploads their web shell, when they try to load it, the server just prints the raw code on the screen instead of running it, rendering the attack completely useless!`,
    questions: [
      { q: "What is the safest location to store uploaded files to prevent direct web access?", a: "Outside the web root (e.g., /var/uploads/)" },
      { q: "What method of renaming uploaded files prevents extension-based execution even if stored in the web root?", a: "Renaming to a UUID (no file extension)" },
      { q: "What Apache directive removes PHP handler from the uploads directory to prevent script execution?", a: "RemoveHandler .php .phtml" },
      { q: "Should you use an extension whitelist or blacklist to validate file uploads?", a: "Whitelist (only allow known safe extensions)" },
      { q: "What open-source antivirus engine is commonly used to scan uploaded files on Linux servers?", a: "ClamAV" }
    ]
  }
];
