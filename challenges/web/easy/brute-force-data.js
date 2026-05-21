const LESSONS = [
  {
    title: "Introduction to Brute Forcing",
    points: 20,
    content: "Welcome to the Brute Force Lab! In this challenge, you will learn how to attack authentication mechanisms using Kali Linux tools.\n\n1. Click the red 'Open Target Page' button above to access the target login form.\n2. Note the URL and the form parameters (username and password) by inspecting the page source or intercepting a request.\n3. The goal is to find the correct password for the 'admin' user.\n\nRead through the next sections to learn how to use automated tools to perform this attack.",
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
    content: "Hydra is a fast network logon cracker. It supports many protocols, including HTTP POST forms.\n\nTo attack the login page, you can use the following syntax:\n`hydra -l admin -P /usr/share/wordlists/rockyou.txt <Target_IP> -s 5000 http-post-form \"/api/brute-force-target:username=^USER^&password=^PASS^:Invalid username or password\"`\n\n* `-l admin`: Specifies the single username 'admin'.\n* `-P <file>`: Specifies the password list (in this case, the pre-installed rockyou.txt).\n* `http-post-form`: The protocol.\n* `\"/api/...:username=^USER^&...:Invalid...\"`: The path, form data, and the failure message that Hydra uses to know if a guess was wrong.\n* `-s 5000`: Specifies the port.",
    questions: [
      { q: "What flag in Hydra is used to specify a single username?", a: "-l" },
      { q: "What flag in Hydra is used to specify a file containing a list of passwords?", a: "-P" },
      { q: "What string does Hydra look for to determine if a login attempt failed in the example above?", a: "Invalid username or password" },
      { q: "What protocol module in Hydra is used for testing HTML forms that use POST?", a: "http-post-form" },
      { q: "What flag specifies the target port in Hydra?", a: "-s" }
    ]
  },
  {
    title: "Executing the Attack",
    points: 60,
    content: "Now it's time to execute the attack! Use Hydra from your Kali Linux machine against the target.\n\nRun the command using the pre-installed rockyou.txt wordlist.\n\nOnce you crack the password, log in to the target page to view your success.",
    questions: [
      { q: "What is the correct password you found for the admin user?", a: "qwerty" },
      { q: "Did the server return a 200 OK status code upon successful login? (yes/no)", a: "yes" },
      { q: "What tool did you end up using to crack the password?", a: "Hydra" }
    ]
  }
];
