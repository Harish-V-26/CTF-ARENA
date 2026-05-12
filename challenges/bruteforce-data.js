const LESSONS = [
  {
    title: "Introduction to Brute Force Attacks",
    points: 10,
    content: `A brute force attack is a trial-and-error method used by attackers to decode sensitive data, most commonly passwords or encryption keys. It is the digital equivalent of trying every key on a keychain until one opens the door.

WHAT DO THEY TARGET?
- Login pages (web applications, SSH, FTP, RDP)
- Encrypted files and ZIP archives
- Password hashes stolen from databases
- Authentication tokens and API keys
- Wi-Fi WPA/WPA2 handshakes

WHY USE BRUTE FORCE?
Despite being one of the oldest attack methods, it remains highly effective because human beings are terrible at creating strong, unique passwords. If an attacker has enough time and computing power, a simple brute force attack will eventually crack any weak credential.

HOW LONG DOES IT TAKE?
The time depends on the password's character space and length:
  4-digit PIN (10^4):       10,000 guesses → cracked in seconds
  6 lowercase letters:      308 million guesses → cracked in minutes
  8 mixed characters:       200+ trillion guesses → could take years on a single CPU
  But with GPUs: modern hardware can test billions of hashes per second.

REAL-WORLD SCENARIO:
An attacker discovers an exposed administrative login panel for a company's website. They configure an automated script to submit combinations of common usernames (like "admin" or "root") and passwords until the server grants them access.

TYPES OF BRUTE FORCE ATTACKS:
  1. Simple Brute Force — tries every possible combination.
  2. Dictionary Attack — uses a wordlist of common passwords.
  3. Hybrid Attack — combines dictionary words with numbers/symbols.
  4. Credential Stuffing — reuses leaked username/password pairs.
  5. Password Spraying — tests one password against many accounts.`,
    questions: [
      { q: "What attack method uses trial-and-error to decode sensitive data or passwords?", a: "Brute Force" },
      { q: "Why do brute force attacks remain highly effective today?", a: "Because humans create weak passwords" },
      { q: "Besides login pages, what is another common target for brute force attacks?", a: "Encrypted files (or password hashes, tokens)" },
      { q: "What hardware is commonly used to massively speed up brute force attacks?", a: "GPUs (Graphics Processing Units)" },
      { q: "What type of brute force attack tries every single possible character combination?", a: "Simple Brute Force" }
    ]
  },
  {
    title: "Dictionary Attacks & Weak Passwords",
    points: 10,
    content: `A pure brute force attack tries every possible character combination (a, b, c... aa, ab...). This takes an impossibly long time for long passwords. To speed things up, attackers use Dictionary Attacks.

WHAT IS A DICTIONARY ATTACK?
Instead of trying random characters, the attacker uses a pre-compiled list of common words, phrases, and leaked passwords (called a "wordlist"). The most famous wordlist is the "RockYou.txt" list, which contains over 14 million common passwords leaked in the 2009 RockYou breach.

THE RISK OF WEAK PASSWORDS:
If your password is "password123", "qwerty", or "summer2024", it is already in every attacker's wordlist. A dictionary attack will guess these passwords in milliseconds.

TOP 10 MOST COMMON PASSWORDS (still used today):
  1. 123456         6. password1
  2. password       7. abc123
  3. 12345678       8. iloveyou
  4. qwerty         9. 111111
  5. 123456789     10. welcome

HYBRID ATTACKS:
A hybrid attack combines a dictionary attack with brute force. It takes words from a dictionary and appends common numbers or symbols.
Example: The attacker's list has the word "football". The hybrid attack will try "football1", "football123", "football!", and "Football@1".

RULE-BASED ATTACKS (Hashcat Rules):
Advanced tools like Hashcat apply transformation rules to wordlists:
  - Capitalize first letter: football → Football
  - Append year:            football → football2024
  - Leet substitution:      football → f00tb@ll
  - Reverse:                football → llabtoof
This dramatically multiplies the effectiveness of a wordlist without storing all variants.`,
    questions: [
      { q: "What type of attack uses a pre-compiled list of common words and passwords?", a: "Dictionary Attack" },
      { q: "What is the name of the famous wordlist containing over 14 million common passwords?", a: "RockYou" },
      { q: "What type of attack combines dictionary words with random numbers and symbols?", a: "Hybrid Attack" },
      { q: "In what year was the RockYou password list leaked?", a: "2009" },
      { q: "What does a rule-based attack (e.g., in Hashcat) do to a wordlist?", a: "Applies transformations like capitalization, number appending, or leet substitution" }
    ]
  },
  {
    title: "Credential Stuffing & Password Spraying",
    points: 10,
    content: `Attackers have adapted to modern security defenses by developing smarter brute force techniques that are harder to detect.

CREDENTIAL STUFFING:
When a website is breached, the stolen username and password pairs are sold on the dark web. In a credential stuffing attack, attackers take these leaked pairs and automatically inject ("stuff") them into other, unrelated websites (like banks, gaming sites, or email providers).
Why it works: People frequently reuse the same password across multiple websites. If your forum account is breached, your bank account is now at risk.

SCALE OF THE PROBLEM:
The "Have I Been Pwned" (HIBP) database contains over 12 billion breached accounts. Criminals have automated tools that can test thousands of credential pairs per second against multiple sites simultaneously.

CREDENTIAL STUFFING TOOLS:
  - SentryMBA: Configurable credential stuffing framework.
  - OpenBullet: Open-source automation tool used for stuffing.
  - SNIPR: Specialized tool targeting specific website configs.

PASSWORD SPRAYING:
Traditional brute force targets one account with thousands of passwords. This is noisy and triggers account lockouts.
Password Spraying does the opposite: it targets thousands of different accounts, but only tries a few common passwords (e.g., "Welcome1!", "Winter2024") on each account.
Why it works: It avoids triggering security alerts and account lockouts because each account only registers a single failed login attempt.

PASSWORD SPRAYING TIMING:
Attackers often wait 30-60 minutes between spray attempts to stay below lockout thresholds. This makes detection even harder for blue teams.

DIFFERENCE SUMMARY:
  Credential Stuffing → Known credentials, many sites.
  Password Spraying   → Common passwords, many accounts, same site.`,
    questions: [
      { q: "What attack uses stolen username/password pairs from one breach to log into other websites?", a: "Credential Stuffing" },
      { q: "Why is credential stuffing so successful against modern users?", a: "Because users reuse passwords" },
      { q: "What attack tries a single common password against thousands of different accounts to avoid lockouts?", a: "Password Spraying" },
      { q: "What well-known website lets you check if your email has appeared in a data breach?", a: "Have I Been Pwned (HIBP)" },
      { q: "Why do password spraying attackers wait 30-60 minutes between attempts?", a: "To stay below account lockout thresholds and avoid detection" }
    ]
  },
  {
    title: "Defending Against Brute Force: Policies & MFA",
    points: 10,
    content: `The best way to stop brute force attacks is to implement layers of defense that make the attack computationally expensive or impossible.

STRONG PASSWORD POLICIES:
Require passwords to be long (12+ characters) and complex. Length is mathematically more important than complexity. A 16-character password of random lowercase letters is much harder to brute force than an 8-character password with symbols.

Password Entropy:
Entropy measures unpredictability. Higher entropy = harder to crack.
  6 lowercase chars:  ~28 bits of entropy → cracked easily
  12 random chars:    ~71 bits of entropy → safe for years
  16 random chars:    ~95 bits of entropy → practically uncrackable

PASSWORD MANAGERS:
Encourage users to use Password Managers. These tools generate and store 20+ character random passwords for every site, completely eliminating password reuse and dictionary attacks.
Popular managers: Bitwarden (free, open-source), 1Password, Dashlane, KeePass.

MULTI-FACTOR AUTHENTICATION (MFA):
MFA requires the user to provide two or more verification factors to gain access.
  1. Something you know (a password).
  2. Something you have (a phone app generating a code, or a hardware security key).
  3. Something you are (biometrics — fingerprint, face scan).

Even if an attacker brute forces your password, they cannot log in without physically possessing your second factor. MFA stops 99.9% of automated account takeover attacks (per Microsoft research).

TYPES OF MFA:
  - TOTP (Time-based One-Time Password): Google Authenticator, Authy.
  - SMS OTP: One-time code via text (weaker — SIM swap attacks possible).
  - Hardware Keys: YubiKey, FIDO2 — the strongest form.
  - Push Notifications: Microsoft Authenticator app approvals.

PASSKEYS (FIDO2):
Passkeys are the next evolution — they use cryptographic key pairs stored on your device. They are completely phishing-resistant and immune to brute force since no password is ever transmitted.`,
    questions: [
      { q: "When creating a secure password, what is more important: length or complexity?", a: "Length" },
      { q: "What tool helps users generate and store long, unique passwords for every website?", a: "Password Manager" },
      { q: "What defense requires a second form of verification, like a code from a phone app?", a: "Multi-Factor Authentication (or MFA)" },
      { q: "What does TOTP stand for?", a: "Time-based One-Time Password" },
      { q: "What modern standard uses cryptographic key pairs stored on your device, making it phishing-resistant?", a: "Passkeys (or FIDO2)" }
    ]
  },
  {
    title: "Defending Against Brute Force: Application Controls",
    points: 10,
    content: `Web applications must enforce strict controls on their login pages to stop automated attack scripts.

ACCOUNT LOCKOUTS:
Temporarily lock the user's account after a certain number of failed login attempts (e.g., 5 failed attempts locks the account for 15 minutes). This entirely prevents traditional brute force against a single account.

Limitation: Attackers can weaponize lockouts for Denial-of-Service — intentionally locking out every account to prevent legitimate users from logging in. A better approach is progressive delays (increasing wait time after each failure).

RATE LIMITING:
Limit the number of login requests an IP address can make within a specific timeframe (e.g., max 10 requests per minute). This slows down automated tools, making dictionary attacks impractical.

Limitation: Attackers can rotate IP addresses using botnets or residential proxies to bypass per-IP rate limits.

CAPTCHA:
(Completely Automated Public Turing test to tell Computers and Humans Apart). Requires the user to identify objects in images or solve puzzles before logging in. This is highly effective at stopping automated scripts from submitting forms.
Types:
  - reCAPTCHA v2: Click "I'm not a robot" checkbox.
  - reCAPTCHA v3: Invisible, runs in background — scores behavior.
  - hCaptcha: Privacy-focused alternative to Google reCAPTCHA.

GEO-BLOCKING & DEVICE FINGERPRINTING:
Block login attempts from unexpected geographic locations or unrecognized devices. If a user usually logs in from India and suddenly gets a login attempt from Russia, flag it immediately.

MONITORING & ALERTING:
Security teams should actively monitor logs for:
  - Massive spikes in failed login attempts
  - Single IP trying many different accounts
  - Unusual geographic login locations
  - High rate of "account not found" errors

HONEYPOT ACCOUNTS:
Create fake admin accounts like "administrator" or "root" that no real user would use. Any login attempt to these accounts is guaranteed to be an attacker — immediately block their IP.`,
    questions: [
      { q: "What mechanism locks an account after multiple failed login attempts?", a: "Account Lockout" },
      { q: "What defense limits the number of requests an IP address can make in a given timeframe?", a: "Rate Limiting" },
      { q: "What mechanism forces a user to solve an image puzzle to prove they are not a robot?", a: "CAPTCHA" },
      { q: "How can attackers bypass per-IP rate limiting?", a: "By rotating IP addresses using botnets or proxies" },
      { q: "What is a honeypot account in the context of brute force defense?", a: "A fake account designed to detect attackers — any login attempt to it signals an attack" }
    ]
  },
  {
    title: "Ethical Testing Tools for Brute Force",
    points: 10,
    content: `Security professionals and penetration testers use specialized tools to test the strength of passwords and the resilience of authentication portals. Always obtain explicit written permission before testing!

HYDRA (THC-Hydra):
A very fast network logon cracker. It supports numerous protocols (SSH, FTP, HTTP, SMB, RDP, SMTP) and allows testers to launch automated dictionary attacks against network services.
Example usage:
  hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://192.168.1.10
  hydra -L users.txt -P pass.txt http-post-form "/login:user=^USER^&pass=^PASS^:Invalid"

MEDUSA:
Similar to Hydra but designed for speed and parallel connections. Supports HTTP, FTP, SSH, MSSQL, MySQL, and more. Often preferred for large-scale testing.

BURP SUITE INTRUDER:
A highly customizable tool used to automate customized web attacks. Testers configure Intruder to perform password spraying or credential stuffing specifically against custom web application login forms.
Attack Types:
  - Sniper: One payload set, one position at a time.
  - Cluster Bomb: Multiple payload sets tested in all combinations.
  - Pitchfork: Multiple payload sets tested in parallel.

JOHN THE RIPPER & HASHCAT:
These are offline password cracking tools. If a penetration tester manages to steal the database of password hashes, they will load those hashes into John or Hashcat and use high-end graphics cards (GPUs) to brute force the hashes locally, at millions of guesses per second.
  John the Ripper: Great for beginners, handles many hash types automatically.
  Hashcat: Faster, GPU-accelerated, supports 300+ hash algorithms.
  Example: hashcat -m 0 hashes.txt rockyou.txt   (mode 0 = MD5)

WFUZZ:
A web application fuzzer excellent for brute-forcing directories, files, and login forms. Often used to discover hidden admin panels before launching brute force.

Important: These tools are strictly for use on systems you have explicit permission to test!`,
    questions: [
      { q: "What fast network logon cracker is frequently used to brute force SSH or FTP services?", a: "Hydra" },
      { q: "What Burp Suite module is used to automate web attacks like credential stuffing?", a: "Intruder" },
      { q: "What type of tool is used offline to crack stolen password hashes using GPUs?", a: "Hashcat (or John the Ripper)" },
      { q: "In Hashcat, what mode number is used to crack MD5 hashes?", a: "0" },
      { q: "What is the Burp Intruder attack type that tests multiple payload sets in all combinations?", a: "Cluster Bomb" }
    ]
  }
];
