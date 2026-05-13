const LESSONS = [
  {
    title: "Introduction to Brute Forcing",
    points: 20,
    content: "Welcome to the Brute Force Lab! In this challenge, you will learn how to attack authentication mechanisms using Kali Linux tools.\n\n1. Click the red 'Open Target Page' button above to access the target login form.\n2. Note the URL and the form parameters (username and password) by inspecting the page source or intercepting a request.\n3. The goal is to find the correct password for the 'admin' user and retrieve the hidden flag.\n\nRead through the next sections to learn how to use automated tools to perform this attack.",
    questions: [
      { q: "What username are you trying to brute force in this lab?", a: "admin" },
      { q: "What HTTP method does the target login form use to send credentials?", a: "POST" },
      { q: "Are brute force attacks generally faster or slower than SQL injection?", a: "slower" },
      { q: "What is the URL path for the target login page? (e.g. /api/...)", a: "/api/brute-force-target" },
      { q: "Are you ready to use Kali Linux tools for this challenge? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "Using Hydra",
    points: 60,
    content: "Hydra is a fast network logon cracker. It supports many protocols, including HTTP POST forms.\n\nTo attack the login page, you can use the following syntax:\n`hydra -l admin -P /usr/share/wordlists/rockyou.txt <Target_IP> http-post-form \"/api/brute-force-target:username=^USER^&password=^PASS^:Invalid username or password\" -s 5000`\n\n* `-l admin`: Specifies the single username 'admin'.\n* `-P <file>`: Specifies the password list (we recommend creating a small custom list for testing or using a popular wordlist).\n* `http-post-form`: The protocol.\n* `\"/api/...:username=^USER^&...:Invalid...\"`: The path, form data, and the failure message that Hydra uses to know if a guess was wrong.\n* `-s 5000`: Specifies the port.",
    questions: [
      { q: "What flag in Hydra is used to specify a single username?", a: "-l" },
      { q: "What flag in Hydra is used to specify a file containing a list of passwords?", a: "-P" },
      { q: "What string does Hydra look for to determine if a login attempt failed in the example above?", a: "Invalid username or password" },
      { q: "What protocol module in Hydra is used for testing HTML forms that use POST?", a: "http-post-form" },
      { q: "What flag specifies the target port in Hydra?", a: "-s" }
    ]
  },
  {
    title: "Using Burp Suite Intruder",
    points: 60,
    content: "Alternatively, you can use Burp Suite to brute force the login page.\n\n1. Open Burp Suite and configure your browser proxy.\n2. Submit a dummy login request on the target page and intercept it in Burp's 'Proxy' tab.\n3. Send the request to 'Intruder' (Ctrl+I).\n4. In Intruder, go to 'Positions', clear the auto-selected payloads, and add a payload marker (`§`) around the password value.\n5. Go to 'Payloads', load your wordlist.\n6. Click 'Start attack'.\n\nLook for a response with a different length or status code (like 200 OK instead of 401 Unauthorized).",
    questions: [
      { q: "Which tool within Burp Suite is used to automate customized attacks like brute forcing?", a: "Intruder" },
      { q: "What character does Burp Suite use to denote a payload marker position?", a: "§" },
      { q: "When the attack runs, what metric helps you identify a successful login if the HTTP status code doesn't change? (e.g. response ______)", a: "length" },
      { q: "What tab do you use to configure the list of passwords in Burp Intruder?", a: "Payloads" },
      { q: "If the login is successful, you will receive the flag. Does this lab require intercepting traffic? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "Capture the Flag",
    points: 60,
    content: "Now it's time to execute the attack! Use either Hydra or Burp Suite from your Kali Linux machine against the target.\n\nThe password is one of the top commonly used passwords. If you don't want to run a massive dictionary, try a small list like 'password123, admin123, qwerty, letmein'.\n\nOnce you crack the password, log in to the target page to view your flag.",
    questions: [
      { q: "What is the correct password you found for the admin user?", a: "qwerty" },
      { q: "Did the server return a 200 OK status code upon successful login? (yes/no)", a: "yes" },
      { q: "What tool did you end up using to crack the password? (Hydra or Burp)", a: "Hydra" }, 
      { q: "Enter the first 5 characters of the flag (including CTF{):", a: "CTF{b" },
      { q: "Enter the full flag you found on the successful login page:", a: "CTF{brut3_f0rc3_m4st3r}" }
    ]
  }
];
