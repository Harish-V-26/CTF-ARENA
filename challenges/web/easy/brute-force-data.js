const LESSONS = [
  {
    title: "Introduction to Brute Forcing",
    points: 20,
    content: `WHAT IS A BRUTE FORCE ATTACK?
Imagine you find a giant treasure chest locked with a heavy padlock. You know the treasure is inside, but you don't know the combination code. Instead of trying to find the combination written down somewhere, you just sit in front of the chest and try every single number combination you can think of: 0-0-0, then 0-0-1, then 0-0-2, all the way until it finally pops open! This is exactly what a "Brute Force" attack is. Hackers use special computer tools to try thousands of different passwords on a website's front door until they accidentally guess the right one. In this challenge, you will get to be the hacker and use professional Kali Linux tools to break into a website by guessing the password.

1. Click the red 'Open Target Page' button above to access the target login form.
2. Note the URL and the form parameters (username and password) by inspecting the page source or intercepting a request.
3. The goal is to find the correct password for the 'admin' user.

Read through the next sections to learn how to use automated tools to perform this attack.`,
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
    content: `WHAT IS HYDRA?
If you are trying to open that giant treasure chest, guessing numbers with your fingers would take a very long time. What if you had a super-fast robot that could spin the lock dials thousands of times a second? In the cybersecurity world, that robot is called "Hydra." Hydra is a famous and incredibly fast tool used by hackers to break into network doors. You can give Hydra a giant list of popular passwords, and it will fire them at the login screen faster than you can blink! It is so smart that it can understand many different types of locks, including the "HTTP POST forms" that websites use for their login pages. 

To attack the login page, you can use the following syntax:
\`hydra -l admin -P /usr/share/wordlists/rockyou.txt <Target_IP> -s 5000 http-post-form "/api/brute-force-target:username=^USER^&password=^PASS^:Invalid username or password"\`

* \`-l admin\`: Specifies the single username 'admin'.
* \`-P <file>\`: Specifies the password list (in this case, the pre-installed rockyou.txt).
* \`http-post-form\`: The protocol.
* \`"/api/...:username=^USER^&...:Invalid..."\`: The path, form data, and the failure message that Hydra uses to know if a guess was wrong.
* \`-s 5000\`: Specifies the port.`,
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
    content: `UNLEASH THE ROBOT
Now it is time to put everything you have learned together! You have the URL of the target, you know the username is 'admin', and you know how to command the super-fast Hydra robot. You are going to open your Kali Linux terminal and unleash Hydra against the website's front door. It will read through the giant dictionary of passwords and hammer the login screen until the door finally swings open. 

Run the command using the pre-installed rockyou.txt wordlist.

Once you crack the password, log in to the target page to view your success.`,
    questions: [
      { q: "What is the correct password you found for the admin user?", a: "qwerty" },
      { q: "Did the server return a 200 OK status code upon successful login? (yes/no)", a: "yes" },
      { q: "What tool did you end up using to crack the password?", a: "Hydra" }
    ]
  }
];
