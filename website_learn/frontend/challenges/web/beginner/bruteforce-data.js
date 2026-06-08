const LESSONS = [
  {
    title: "1. The Giant Keychain",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/bf_keychain_1779434324462.png" alt="The Giant Keychain"></div>
      <h3>What is a Brute Force Attack?</h3>
      <p>A Brute Force Attack is a cryptographic hack that relies on exhaustive search. An attacker submits many passwords or passphrases with the hope of eventually guessing a combination correctly. The attacker systematically checks all possible passwords until the correct one is found. This technique discovers login credentials, encryption keys, or hidden web directories.</p>
      <p>Imagine you find a heavy, locked treasure chest. You know there is a key somewhere, but instead of finding it, you bring a giant ring with a million different keys on it. You sit there and try every single key, one by one, until finally, one of them turns the lock! This is exactly what a Brute Force Attack is in the computer world. Hackers use a program to rapidly try thousands of different passwords, over and over, until they accidentally guess the right one.</p>
      <h3>Attack Execution</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Target Selection</strong><br>The attacker identifies an authentication endpoint, such as a website login page or SSH service.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Exhaustive Generation</strong><br>A script sequentially generates combinations of characters (e.g., "aaaa", "aaab", "aaac").</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Validation</strong><br>The script sends the generated payload to the server. If successful (HTTP 200/302), the script stops and outputs the password.</div>
      </div>`,
    questions: [
      { q: "What attack involves trying passwords over and over like testing keys on a giant ring?", a: "Brute Force", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Why are these attacks still so successful today?", a: "Because humans create weak passwords", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What do hackers use besides login screens to test their guessing machines?", a: "Encrypted files (or password hashes, tokens)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What special computer part (used for video games) makes guessing incredibly fast?", a: "GPUs (Graphics Processing Units)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What do we call the simplest attack that tries every single letter combination (a, b, c...)?", a: "Simple Brute Force", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "2. The Hacker's Dictionary",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/bf_dictionary_1779434339084.png" alt="Dictionary Attack"></div>
      <h3>Dictionary Attacks</h3>
      <p>A Dictionary Attack is an optimized brute-force technique that defeats authentication mechanisms by systematically entering every word in a pre-compiled list, known as a wordlist. Rather than testing all possible combinations of characters, it exploits the human tendency to use recognizable words, phrases, and predictable patterns in passwords.</p>
      <p>Instead of guessing random nonsense letters like "x-q-z-b-f", which takes forever, hackers realized they could save a lot of time. Humans aren't very creative when making passwords. Most people use normal words like "football" or "summer". So, hackers created massive text files called "Wordlists." When a hacker uses a program to read down this list and try every word as a password, it is called a Dictionary Attack.</p>
      <h3>Advanced Techniques</h3>
      <div class="step-block">
        <div class="step-num">Concept 1</div>
        <div class="step-body"><strong>RockYou.txt</strong><br>The most famous wordlist, RockYou, contains over 14 million cleartext passwords exposed in a 2009 breach. It serves as the baseline dictionary for nearly all cracking attempts.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Concept 2</div>
        <div class="step-body"><strong>Hybrid Attacks</strong><br>Attackers append numbers or symbols to dictionary words (e.g., "password123").</div>
      </div>
      <div class="step-block">
        <div class="step-num">Concept 3</div>
        <div class="step-body"><strong>Rule-Based Attacks</strong><br>Attackers apply algorithmic transformations to dictionary words. Rules can dictate actions like "capitalize the first letter" or "leetspeak substitution" (e.g., "P@ssw0rd").</div>
      </div>`,
    questions: [
      { q: "What attack uses a giant list of normal words to guess passwords faster?", a: "Dictionary Attack", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the name of the most famous hacker dictionary with 14 million passwords?", a: "RockYou", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What attack takes dictionary words and adds numbers or symbols to them?", a: "Hybrid Attack", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "In what year was the famous RockYou list leaked?", a: "2009", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What do advanced hacking machines use to capitalize letters or change letters to numbers?", a: "Rules (or transformation rules)", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "3. Stuffing the Box",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/brute_force_ctflabs_1779431413098.png" alt="Credential Stuffing"></div>
      <h3>Credential Stuffing & Password Spraying</h3>
      <p>Credential Stuffing is an attack where stolen account credentials (obtained from data breaches) are injected into the login pages of entirely unrelated web applications to gain unauthorized access. Password Spraying targets many users with a single common password to evade account lockout policies.</p>
      <p>When a giant website gets hacked, the bad guys steal a massive list of usernames and passwords. Because humans are lazy, they often use the exact same username and password on every single website! The hacker takes that stolen list and automatically "stuffs" those exact pairs into thousands of completely different websites. If your forum account got hacked, the bad guy instantly has the key to your bank account, too!</p>
      <h3>Execution Strategies</h3>
      <div class="step-block">
        <div class="step-num">Strategy 1</div>
        <div class="step-body"><strong>Credential Stuffing</strong><br>Target: Same user across multiple domains. Execution: Use stolen pairs (userA:pass1) on Site X, Site Y, and Site Z.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Strategy 2</div>
        <div class="step-body"><strong>Password Spraying</strong><br>Target: Many users on a single domain. Execution: Guess the password "Winter2024!" against UserA, UserB, and UserC.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Strategy 3</div>
        <div class="step-body"><strong>Evading Lockouts</strong><br>By spreading the attempts across different accounts, password spraying ensures no single account triggers the failed login threshold.</div>
      </div>`,
    questions: [
      { q: "What attack takes stolen username and password pairs and uses them on other websites?", a: "Credential Stuffing", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Why does the Stuffing attack work so well on humans?", a: "Because users reuse the same password on many websites", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What attack tries one common password against thousands of different accounts to avoid alarms?", a: "Password Spraying", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What website lets you check if your password was stolen in a big hack?", a: "Have I Been Pwned (HIBP)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Why do Spray attackers wait between their guesses?", a: "To stay below alarms and avoid getting locked out", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "4. Building a Stronger Door",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/brute_force_ctflabs_1779431413098.png" alt="Defense and MFA"></div>
      <h3>Defensive Architecture & MFA</h3>
      <p>Defending against brute-force attacks requires a combination of password entropy enforcement and Multi-Factor Authentication (MFA). High password entropy mathematically increases the time required for an exhaustive search. MFA mandates a secondary, out-of-band verification token, ensuring that compromised passwords alone are insufficient for authentication.</p>
      <p>If hackers have supercomputers guessing passwords, how do we stop them? The absolute best defense is to make a password that is incredibly long. Every single letter you add makes the math problem millions of times harder for the computer to solve. Even better is Multi-Factor Authentication (MFA). Imagine a vault with two different locks. The first lock is your password. The second lock is a special code that pops up on your mobile phone. Even if a hacker steals your password, they are completely locked out without your phone.</p>
      <h3>Core Defensive Measures</h3>
      <div class="step-block">
        <div class="step-num">Defense 1</div>
        <div class="step-body"><strong>Password Entropy</strong><br>Enforce minimum length requirements (e.g., 12-16 characters) rather than strict complexity rules, encouraging long passphrases.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Defense 2</div>
        <div class="step-body"><strong>Multi-Factor Authentication</strong><br>Implement TOTP (Time-based One-Time Password) apps or WebAuthn hardware keys to decouple identity verification from purely knowledge-based factors.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Defense 3</div>
        <div class="step-body"><strong>Password Managers</strong><br>Encourage the use of secure credential vaults that generate unique, cryptographic-strength passwords for every service.</div>
      </div>`,
    questions: [
      { q: "When creating a safe password to beat a supercomputer, what is more important: length or weird symbols?", a: "Length", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What digital vault creates and stores a different long password for every website you use?", a: "Password Manager", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What defense puts a second lock on the door, like sending a code to your phone?", a: "Multi-Factor Authentication (or MFA)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What does the 'T' stand for in TOTP?", a: "Time-based (Time-based One-Time Password)", hint: "Review the definitions and acronyms section." },
      { q: "What new technology uses fingerprints instead of typed passwords?", a: "Passkeys (or FIDO2)", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "5. Traps for the Hackers",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/brute_force_ctflabs_1779431413098.png" alt="Lockouts and Rate Limiting"></div>
      <h3>Rate Limiting & Account Lockouts</h3>
      <p>Account Lockout policies and Rate Limiting are infrastructural controls designed to severely penalize rapid, automated login attempts. An account lockout policy disables an account after a threshold of failed login attempts. Rate limiting restricts the number of HTTP requests a single IP address can make to an endpoint within a specific time window.</p>
      <p>Imagine a strict bouncer at the door of a club. If you tell the bouncer the wrong secret password five times in a row, the bouncer crosses his arms and says, "You are locked out! Come back in 15 minutes." This completely breaks the hacker's guessing machine. If the hacker has to wait 15 minutes after every five guesses, it will take them thousands of years to try all the words in their dictionary!</p>
      <h3>Countermeasures</h3>
      <div class="step-block">
        <div class="step-num">Measure 1</div>
        <div class="step-body"><strong>Account Lockout</strong><br>Lock the account after 5 failed attempts for 15 minutes. This defeats linear dictionary attacks targeting a specific user.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Measure 2</div>
        <div class="step-body"><strong>Rate Limiting & WAFs</strong><br>Limit requests per IP address to slow down automated enumeration tools.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Measure 3</div>
        <div class="step-body"><strong>CAPTCHA & Honeypots</strong><br>Implement CAPTCHAs to force human interaction. Deploy dummy "honeypot" accounts that, when interacted with, ban the source IP.</div>
      </div>`,
    questions: [
      { q: "What policy locks the door for 15 minutes after you type the wrong password five times?", a: "Account Lockout", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What defense tells a computer they are only allowed to make 10 guesses per minute?", a: "Rate Limiting", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What puzzle forces you to read squiggly letters to prove you are a human and not a robot?", a: "CAPTCHA", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "How do hackers get around Rate Limiting by using infected computers?", a: "By rotating IP addresses (using botnets or proxies)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the secret fake account called that websites use to catch hackers?", a: "A Honeypot account", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "6. The Hacker's Tools",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/hacker_toolkit_ctflabs_1779431431190.png" alt="Hacker Tools"></div>
      <h3>Online & Offline Cracking Suites</h3>
      <p>Penetration testers employ specialized software to audit password strength. Online cracking tools (like Hydra) interact directly with network protocols to test authentication live against a server. Offline cracking tools (like Hashcat) do not interact with a network; they run locally to mathematically reverse-engineer cryptographic hashes stolen from a database, leveraging GPUs to calculate billions of hashes per second.</p>
      <p>Just like a locksmith needs special tools to open a safe, cybersecurity professionals use special guessing tools to test how strong a company's passwords really are. One of the most famous tools is called "Hydra." You point Hydra at a website, hand it the giant RockYou dictionary, and tell it to go to work. If they steal a password database, they use "Hashcat" on a super-fast gaming computer to crack the passwords offline without talking to the internet.</p>
      <h3>Industry Standard Tools</h3>
      <div class="step-block">
        <div class="step-num">Tool 1</div>
        <div class="step-body"><strong>THC Hydra</strong><br>A parallelized network logon cracker that supports numerous protocols. Example: <code>hydra -l admin -P rockyou.txt ssh://10.10.10.5</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Tool 2</div>
        <div class="step-body"><strong>Hashcat</strong><br>Advanced offline password recovery tool that utilizes GPU acceleration for unprecedented cracking speeds.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Tool 3</div>
        <div class="step-body"><strong>Burp Suite Intruder</strong><br>A tool for automating customized web attacks. Testers use "Sniper" or "Cluster Bomb" modes to test login endpoints with payload lists.</div>
      </div>`,
    questions: [
      { q: "What fast network cracking tool do professionals use to test a server's front door?", a: "Hydra", hint: "Look for the specific tools mentioned in the lesson." },
      { q: "What tool built inside Burp Suite lets you fire a dictionary at a specific password box?", a: "Intruder", hint: "Look for the specific tools mentioned in the lesson." },
      { q: "What tool do hackers use offline to unscramble stolen passwords using super-fast graphics cards?", a: "Hashcat (or John the Ripper)", hint: "Look for the specific tools mentioned in the lesson." },
      { q: "What mode number is used in Hashcat to crack old MD5 passwords?", a: "0", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What type of Intruder attack tests multiple payload lists in all combinations?", a: "Cluster Bomb", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  }
];
