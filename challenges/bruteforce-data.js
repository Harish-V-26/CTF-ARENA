const LESSONS = [
  {
    title: "Introduction to Brute Force Attacks",
    points: 10,
    content: `A brute force attack is a trial-and-error method used by attackers to decode sensitive data, most commonly passwords or encryption keys. It is the digital equivalent of trying every key on a keychain until one opens the door.

WHAT DO THEY TARGET?
- Login pages (web applications, SSH, FTP, RDP)
- Encrypted files and ZIP archives
- Password hashes stolen from databases
- Authentication tokens

WHY USE BRUTE FORCE?
Despite being one of the oldest attack methods, it remains highly effective because human beings are terrible at creating strong, unique passwords. If an attacker has enough time and computing power, a simple brute force attack will eventually crack any weak credential.

REAL-WORLD SCENARIO:
An attacker discovers an exposed administrative login panel for a company's website. They configure an automated script to submit combinations of common usernames (like "admin" or "root") and passwords until the server grants them access.`,
    questions: [
      { q: "What attack method uses trial-and-error to decode sensitive data or passwords?", a: "Brute Force" },
      { q: "Why do brute force attacks remain highly effective today?", a: "Because humans create weak passwords" },
      { q: "Besides login pages, what is another common target for brute force attacks?", a: "Encrypted files (or password hashes, tokens)" }
    ]
  },
  {
    title: "Dictionary Attacks & Weak Passwords",
    points: 10,
    content: `A pure brute force attack tries every possible character combination (a, b, c... aa, ab...). This takes an impossibly long time for long passwords. To speed things up, attackers use Dictionary Attacks.

WHAT IS A DICTIONARY ATTACK?
Instead of trying random characters, the attacker uses a pre-compiled list of common words, phrases, and leaked passwords (called a "wordlist"). The most famous wordlist is the "RockYou.txt" list, which contains over 14 million common passwords.

THE RISK OF WEAK PASSWORDS:
If your password is "password123", "qwerty", or "summer2024", it is already in every attacker's wordlist. A dictionary attack will guess these passwords in milliseconds.

HYBRID ATTACKS:
A hybrid attack combines a dictionary attack with brute force. It takes words from a dictionary and appends common numbers or symbols.
Example: The attacker's list has the word "football". The hybrid attack will try "football1", "football123", "football!", and "Football@1".`,
    questions: [
      { q: "What type of attack uses a pre-compiled list of common words and passwords?", a: "Dictionary Attack" },
      { q: "What is the name of the famous wordlist containing over 14 million common passwords?", a: "RockYou" },
      { q: "What type of attack combines dictionary words with random numbers and symbols?", a: "Hybrid Attack" }
    ]
  },
  {
    title: "Credential Stuffing & Password Spraying",
    points: 10,
    content: `Attackers have adapted to modern security defenses by developing smarter brute force techniques.

CREDENTIAL STUFFING:
When a website is breached, the stolen username and password pairs are sold on the dark web. In a credential stuffing attack, attackers take these leaked pairs and automatically inject ("stuff") them into other, unrelated websites (like banks, gaming sites, or email providers).
Why it works: People frequently reuse the same password across multiple websites. If your forum account is breached, your bank account is now at risk.

PASSWORD SPRAYING:
Traditional brute force targets one account with thousands of passwords. This is noisy and triggers account lockouts.
Password Spraying does the opposite: it targets thousands of different accounts, but only tries a few common passwords (e.g., "Welcome1!", "Winter2024") on each account.
Why it works: It avoids triggering security alerts and account lockouts because each account only registers a single failed login attempt.`,
    questions: [
      { q: "What attack uses stolen username/password pairs from one breach to log into other websites?", a: "Credential Stuffing" },
      { q: "Why is credential stuffing so successful against modern users?", a: "Because users reuse passwords" },
      { q: "What attack tries a single common password against thousands of different accounts to avoid lockouts?", a: "Password Spraying" }
    ]
  },
  {
    title: "Defending Against Brute Force: Policies & MFA",
    points: 10,
    content: `The best way to stop brute force attacks is to implement layers of defense that make the attack computationally expensive or impossible.

STRONG PASSWORD POLICIES:
Require passwords to be long (12+ characters) and complex. Length is mathematically more important than complexity. A 16-character password of random lowercase letters is much harder to brute force than an 8-character password with symbols.

PASSWORD MANAGERS:
Encourage users to use Password Managers. These tools generate and store 20+ character random passwords for every site, completely eliminating password reuse and dictionary attacks.

MULTI-FACTOR AUTHENTICATION (MFA):
MFA requires the user to provide two or more verification factors to gain access.
1. Something you know (a password).
2. Something you have (a phone app generating a code, or a hardware security key).
Even if an attacker brute forces your password, they cannot log in without physically possessing your second factor. MFA stops 99.9% of automated account takeover attacks.`,
    questions: [
      { q: "When creating a secure password, what is more important: length or complexity?", a: "Length" },
      { q: "What tool helps users generate and store long, unique passwords for every website?", a: "Password Manager" },
      { q: "What defense requires a second form of verification, like a code from a phone app?", a: "Multi-Factor Authentication (or MFA)" }
    ]
  },
  {
    title: "Defending Against Brute Force: Application Controls",
    points: 10,
    content: `Web applications must enforce strict controls on their login pages to stop automated attack scripts.

ACCOUNT LOCKOUTS:
Temporarily lock the user's account after a certain number of failed login attempts (e.g., 5 failed attempts locks the account for 15 minutes). This entirely prevents traditional brute force against a single account.

RATE LIMITING:
Limit the number of login requests an IP address can make within a specific timeframe (e.g., max 10 requests per minute). This slows down automated tools, making dictionary attacks impractical.

CAPTCHA:
(Completely Automated Public Turing test to tell Computers and Humans Apart). Requires the user to identify objects in images or solve puzzles before logging in. This is highly effective at stopping automated scripts from submitting forms.

MONITORING & ALERTING:
Security teams should actively monitor logs for massive spikes in failed login attempts or unusual geographic login locations.`,
    questions: [
      { q: "What mechanism locks an account after multiple failed login attempts?", a: "Account Lockout" },
      { q: "What defense limits the number of requests an IP address can make in a given timeframe?", a: "Rate Limiting" },
      { q: "What mechanism forces a user to solve an image puzzle to prove they are not a robot?", a: "CAPTCHA" }
    ]
  },
  {
    title: "Ethical Testing Tools for Brute Force",
    points: 10,
    content: `Security professionals and penetration testers use specialized tools to test the strength of passwords and the resilience of authentication portals.

HYDRA (THC-Hydra):
A very fast network logon cracker. It supports numerous protocols (SSH, FTP, HTTP, SMB) and allows testers to launch automated dictionary attacks against network services.

BURP SUITE INTRUDER:
A highly customizable tool used to automate customized web attacks. Testers configure Intruder to perform password spraying or credential stuffing specifically against custom web application login forms.

JOHN THE RIPPER & HASHCAT:
These are offline password cracking tools. If a penetration tester manages to steal the database of password hashes, they will load those hashes into John or Hashcat and use high-end graphics cards (GPUs) to brute force the hashes locally, at millions of guesses per second.

Important: These tools are strictly for use on systems you have explicit permission to test!`,
    questions: [
      { q: "What fast network logon cracker is frequently used to brute force SSH or FTP services?", a: "Hydra" },
      { q: "What Burp Suite module is used to automate web attacks like credential stuffing?", a: "Intruder" },
      { q: "What type of tool is used offline to crack stolen password hashes using GPUs?", a: "Hashcat (or John the Ripper)" }
    ]
  }
];
