const LESSONS = [
  {
    title: "Setting Up DVWA",
    points: 20,
    content: "Welcome to your first practical lab! DVWA (Damn Vulnerable Web App) is a PHP/MySQL web application that is intentionally vulnerable. \n\n1. Click the red 'Launch DVWA Instance' button above.\n2. Wait for the server to spin up your private Docker container.\n3. A new tab will automatically open with your unique lab URL.\n4. Log in using the default credentials: Username: admin | Password: password\n5. Go to 'Setup / Reset DB' and click 'Create / Reset Database'.\n\nOnce you have logged in, answer the questions below.",
    questions: [
      { q: "What is the default username for DVWA?", a: "admin" },
      { q: "What is the default password for DVWA?", a: "password" },
      { q: "Is your lab environment running in an isolated Docker container? (yes/no)", a: "yes" },
      { q: "Which button do you need to click first after logging in to initialize the app?", a: "Create / Reset Database" },
      { q: "What does DVWA stand for?", a: "Damn Vulnerable Web App" }
    ]
  },
  {
    title: "SQL Injection Practice",
    points: 60,
    content: "Now that you have DVWA running, navigate to the 'SQL Injection' tab on the left menu. Ensure the security level is set to 'Low' (you can check this in the 'DVWA Security' tab).\n\nYour goal is to extract the database version and the database user.\n\nTry inputting `' OR 1=1 #` to see all users. Then try a UNION-based injection to extract the version: `' UNION SELECT null, version() #`.",
    questions: [
      { q: "What SQL character is commonly used to close a string and start an injection?", a: "'" },
      { q: "What SQL symbol is used to comment out the rest of the query in MySQL?", a: "#" },
      { q: "Execute the UNION injection payload to find the MySQL version. What is the major version number? (e.g., 5 or 8)", a: "10" },
      { q: "Execute a payload to find the current user: `' UNION SELECT null, user() #`. What is the user?", a: "root@localhost" },
      { q: "How many users are displayed when you bypass authentication using `' OR 1=1 #`?", a: "5" }
    ]
  },
  {
    title: "Command Injection Practice",
    points: 60,
    content: "Navigate to the 'Command Injection' tab in DVWA.\n\nThis application pings an IP address you provide. However, it does not sanitize your input, allowing you to chain commands using `;` or `&&`.\n\nExample: `127.0.0.1; whoami`",
    questions: [
      { q: "What character can be used in Linux to execute a second command regardless of the first command's success?", a: ";" },
      { q: "Execute `127.0.0.1; whoami`. What user is the web server running as?", a: "www-data" },
      { q: "Execute `127.0.0.1; uname -a`. What is the underlying OS kernel?", a: "Linux" },
      { q: "Try to read the passwd file: `127.0.0.1; cat /etc/passwd`. Which user has UID 0?", a: "root" },
      { q: "What PHP function is typically responsible for this vulnerability if used carelessly?", a: "shell_exec" }
    ]
  },
  {
    title: "Capture the Flag",
    points: 60,
    content: "Let's put it all together. There is a hidden file in the web root containing a flag. \n\nUse the Command Injection vulnerability to list the files in the current directory (`ls -la`), or traverse directories to find it. \nLook for a file named something like 'flag.txt' or similar. Read its contents to get the flag.",
    questions: [
      { q: "What command is used to list all files, including hidden ones, in Linux?", a: "ls -la" },
      { q: "What command is used to output the contents of a file to the terminal?", a: "cat" },
      { q: "Using command injection, find the hostname of the Docker container using the `hostname` command. What does it start with? (Type 'container')", a: "container" },
      { q: "When you close the tab, does the backend automatically delete your container? (yes/no)", a: "yes" },
      { q: "Are you ready to move on to the next challenge?", a: "yes" }
    ]
  }
];
