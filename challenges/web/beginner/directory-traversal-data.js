const LESSONS = [
  {
    title: "1. Climbing the Tree (Path Traversal)",
    points: 10,
    content: `CLIMBING THE FOLDERS
Imagine the folders on a computer are like branches on a giant tree. The main folder (the trunk) is called the "Root." Off this trunk, there are big branches like "Windows" or "System," and off those, there are smaller branches like "Documents" or "MyGames." When a website runs on a computer, it is only allowed to sit on one specific branch—usually a folder called "/var/www/html." It is forbidden from looking at any other branches. But what if the website has a search box that lets you ask to view a file, like "?file=image.jpg"? A hacker can type a special code to climb up the tree trunk: "../" (dot-dot-slash). In computer language, "../" means "climb up one branch toward the trunk." 

THE SECRET DOCUMENTS
If a hacker types "?file=../../../etc/passwd", the website's code reads the dots and slashes. It climbs up three branches, exits the safe website folder, and reaches the main system files. Then, it opens a file called "/etc/passwd." On Linux computers, this file is a world-readable diary containing a list of every single user account on the machine! If a hacker is attacking a Windows computer, they might type "../../../Windows/win.ini" to read configuration details. By climbing up the folder tree, the hacker can read source code, database passwords, and private SSH keys that they were never, ever supposed to see.

THE REAL-WORLD DANGER
Path Traversal is incredibly dangerous because it lets hackers sneak a peek behind the curtain. If a company stores its database password in a text file on the server, a path traversal bug lets the hacker read that text file and steal the database keys. In many cases, hackers combine this climbing trick with other bugs to completely take over the server. For example, if they can read the server's logs, they can inject malicious code into the logs and then use the climbing trick to run that code! It is one of the most common ways hackers turn a small file-viewing feature into a full server takeover.`,
    questions: [
      { q: "What symbol sequence is used to move up one folder level?", a: "../" },
      { q: "What Linux file contains the system user account directory?", a: "/etc/passwd" },
      { q: "On Windows, what configuration file is often targeted in path traversal?", a: "win.ini" },
      { q: "What is the main trunk of the computer's folder tree called?", a: "Root" },
      { q: "Can path traversal let hackers read files outside the website folder? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "2. The Disguise Shop (Filter Bypass)",
    points: 10,
    content: `BYPASSING THE DOTS
Programmers know that hackers love to climb the folder tree. So, they hire digital security guards (filters) to search every file request. If the guard sees the characters "../", they delete them! The hacker types "?file=../../../passwd", and the guard scrubs it clean, leaving just "passwd." Since there are no branches to climb, the request fails, and the hacker gets nothing. But hackers are very clever, and they have found many ways to put masks on their dots and slashes to sneak them right past the guard.

NESTED DOLLS TRICK
One of the funniest tricks is called "Nested Traversal." If the guard is dumb and only deletes the letters "../" once, the hacker types: "....//" (dot-dot-dot-dot-slash-slash). The guard spots the middle part "../" and deletes it. But guess what? When you remove the middle, the outer letters slide together and form a brand new "../"! The hacker used the guard's own deletion to build the climbing code! Another trick is "URL Encoding." The hacker translates the dot into "%2e" and the slash into "%2f". The guard looks at "%2e%2e%2f" and thinks it is just normal text, but the computer translates it back into "../" and lets the hacker climb the tree.

THE TERMINATOR TRICK
In older systems, programmers used a trick called "Null Byte Injection." The website might require all files to end in ".jpg" to make sure you are only looking at pictures. The hacker types "../../../etc/passwd%00.jpg". The "%00" is a secret symbol called a Null Byte, which acts like a giant stop sign for computers. The computer reads the request, sees the null byte, and stops reading immediately—completely ignoring the ".jpg" at the end! It opens the passwd file instead. To stop all of these tricks, programmers must use a "Whitelist" of allowed filenames, or use a function that resolves the absolute path (the canonical path) and verifies it stays inside the safe folder.`,
    questions: [
      { q: "What encoding replaces dots with %2e and slashes with %2f?", a: "URL encoding" },
      { q: "What character acts like a giant stop sign to terminate strings in old systems?", a: "Null byte (%00)" },
      { q: "What is better for preventing traversal: a whitelist or a blacklist of filenames?", a: "Whitelist" },
      { q: "What nested payload bypasses a filter that removes ../ once?", a: "....//" },
      { q: "What method resolves the full path to check if it is safe?", a: "Canonical path validation" }
    ]
  },
  {
    title: "3. Poisoning the Diary (Log Poisoning)",
    points: 10,
    content: `THE COMPUTER'S DIARY
Every time you visit a website, the server writes down a note in its diary. This diary is called a "Log File." It writes down things like: "A user from IP 1.2.3.4 visited the home page using Google Chrome." The server keeps these logs in folders like "/var/log/apache2/access.log". If the website has a path traversal bug, the hacker can use the climbing trick to open and read the log file. At first, this is just interesting. But then, the hacker realizes they can write whatever they want into the diary!

THE POISONED NOTE
How does the hacker write in the diary? When they connect to the website, their browser sends a header called the "User-Agent" to tell the server what browser they are using. The hacker can change this header to a snippet of malicious PHP code, like "<?php system($_GET['cmd']); ?>". The server reads this header and obediently writes it into the log file diary. The diary has now been poisoned! The code sits there silently, waiting. 

THE EXPLOSION
To trigger the poison, the hacker uses their path traversal bug to load the log file. Because the log file contains the PHP code, the website's server reads the log and accidentally executes the hacker's hidden command! Now the hacker can type '?cmd=whoami' at the end of the web address, and the server will execute the command in the control room and print the result. The hacker just upgraded a simple path traversal bug into complete control over the entire computer (Remote Code Execution)! To prevent this, programmers must make sure log folders are strictly protected and can never be loaded by the web app.`,
    questions: [
      { q: "What is the technique of injecting PHP code into a server log file called?", a: "Log poisoning" },
      { q: "What HTTP header is commonly poisoned in log poisoning attacks?", a: "User-Agent" },
      { q: "What is the default Apache log path on Linux systems?", a: "/var/log/apache2/access.log" },
      { q: "What happens when a path traversal reads a poisoned log file containing PHP code?", a: "The PHP code executes on the server (Remote Code Execution)" },
      { q: "What is the log file called that can be poisoned by making an SSH login attempt?", a: "/var/log/auth.log" }
    ]
  }
];
