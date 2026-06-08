const LESSONS = [
  {
    title: "Introduction to Brute Forcing",
    points: 20,
    html: `<div class="htb-diagram-container"><img src="../../../assets/brute_force_intro_nologo_1779432704498.png" alt="Introduction to Brute Forcing"></div>
      <h3>What is a Brute Force Attack?</h3>
      <p>A brute-force attack is a cryptographic hack that relies on guessing possible combinations of a targeted password until the correct one is discovered. Attackers utilize automated scripts and tools to rapidly iterate through character combinations or predefined wordlists against an authentication endpoint. While this method is exhaustive and guarantees eventual success against weak passwords, it is computationally expensive and highly visible. Defenses against brute-force attacks include implementing account lockouts, rate limiting, and requiring complex passwords.</p>
      <p>Imagine you find a giant treasure chest locked with a heavy padlock. You know the treasure is inside, but you don't know the combination code. Instead of trying to find the combination written down somewhere, you just sit in front of the chest and try every single number combination you can think of: 0-0-0, then 0-0-1, then 0-0-2, all the way until it finally pops open! This is exactly what a "Brute Force" attack is. Hackers use special computer tools to try thousands of different passwords on a website's front door until they accidentally guess the right one. In this challenge, you will get to be the hacker and use professional Kali Linux tools to break into a website by guessing the password.</p>`,
    questions: [
      { q: "What username are you trying to brute force in this lab?", a: "admin", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What HTTP method does the target login form use to send credentials?", a: "POST", hint: "Refer to the HTTP protocol details." },
      { q: "Are brute force attacks generally faster or slower than SQL injection?", a: "slower", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the URL path for the target login page? (e.g. /api/...)", a: "/api/brute-force-target", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Are you ready to use Kali Linux tools for this challenge? (yes/no)", a: "yes", hint: "Look for the specific tools mentioned in the lesson." }
    ]
  },
  {
    title: "Using Hydra",
    points: 60,
    html: `<div class="htb-diagram-container"><img src="../../../assets/using_hydra_nologo_1779432721188.png" alt="Using Hydra"></div>
      <h3>Automating the Attack with Hydra</h3>
      <p>THC-Hydra is a widely used, rapid network logon cracker capable of performing parallelized dictionary attacks against numerous protocols, including HTTP POST forms, SSH, FTP, and more. It automates the brute-forcing process by sending continuous authentication requests using credentials sourced from a specified wordlist, such as the famous <code>rockyou.txt</code>. To use Hydra effectively against web forms, an attacker must supply the target IP, the target port, the exact HTTP request path, the form parameters (e.g., <code>username=^USER^&amp;password=^PASS^</code>), and the unique error string the server returns upon a failed login attempt so Hydra knows when it has guessed correctly.</p>
      <p>If you are trying to open that giant treasure chest, guessing numbers with your fingers would take a very long time. What if you had a super-fast robot that could spin the lock dials thousands of times a second? In the cybersecurity world, that robot is called "Hydra." You can give Hydra a giant dictionary book full of passwords, and it will fire them at the login screen faster than you can blink! You just have to tell Hydra which door to knock on and what the guard says when a password is wrong (like "Invalid username or password"). Once Hydra stops seeing that error message, it knows it has found the correct key!</p>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Understand the Hydra Syntax</strong><br>To attack the login page, you can use the following syntax:<br><code>hydra -l admin -P /usr/share/wordlists/rockyou.txt &lt;Target_IP&gt; -s 5000 http-post-form "/api/brute-force-target:username=^USER^&amp;password=^PASS^:Invalid username or password"</code></div>
      </div>`,
    questions: [
      { q: "What flag in Hydra is used to specify a single username?", a: "-l", hint: "Check the command reference blocks." },
      { q: "What flag in Hydra is used to specify a file containing a list of passwords?", a: "-P", hint: "Check the command reference blocks." },
      { q: "What string does Hydra look for to determine if a login attempt failed in the example above?", a: "Invalid username or password", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What protocol module in Hydra is used for testing HTML forms that use POST?", a: "http-post-form", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What flag specifies the target port in Hydra?", a: "-s", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "Executing the Attack",
    points: 60,
    html: `<div class="htb-diagram-container"><img src="../../../assets/executing_attack_nologo_1779432740633.png" alt="Executing the Attack"></div>
      <h3>Unleash the Robot</h3>
      <p>Executing a successful brute-force attack requires careful enumeration and tool configuration. Once the parameters are set, Hydra will rapidly iterate through the wordlist. During execution, it is critical to monitor network latency and potential rate limiting from the target server, which could block the attack. In a real-world scenario, attackers might throttle their requests or use distributed botnets to avoid detection. In this lab environment, you can execute the attack without fear of being blocked, utilizing the pre-installed tools in your Kali Linux container to uncover the correct credentials.</p>
      <p>Now it is time to put everything you have learned together! You have the URL of the target, you know the username is 'admin', and you know how to command the super-fast Hydra robot. You are going to open your Kali Linux terminal and unleash Hydra against the website's front door.</p>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Run Hydra in Kali</strong><br>It will read through the giant dictionary of passwords and hammer the login screen until the door finally swings open.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Capture the Flag</strong><br>Once you crack the password, you can log in to the target page to view your success and capture the flag!</div>
      </div>`,
    questions: [
      { q: "What is the secret flag revealed after logging in as admin?", a: "CTF{brut3_f0rc3_m4st3r}", hint: "Check the command reference blocks." },
      { q: "Did the server return a 200 OK status code upon successful login? (yes/no)", a: "yes", hint: "Refer to the HTTP protocol details." },
      { q: "What tool did you end up using to crack the password?", a: "Hydra", hint: "Look for the specific tools mentioned in the lesson." }
    ]
  }
];
