const LESSONS = [
  {
    title: "1. Broken Access Control (A01:2025)",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/owasp_bac_diagram.png" alt="Broken Access Control"></div>
      <h3>Broken Access Control</h3>
      <p>Broken Access Control is a failure of Authorization. Even if you log in successfully (Authentication), the application fails to verify whether you have permission to perform an action or view a specific resource, allowing users to act outside of their intended permissions.</p>
      <p>Imagine a school security system. Students have ID cards to enter the building (Authentication). Once inside, they can go to classrooms, but they are not allowed inside the teacher's lounge or the principal's record safe (Authorization). If the door to the principal's safe is left unlocked, allowing any student to walk in and read records, that is Broken Access Control.</p>
      <h3>Practical Lab Task</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Open the Target Lab Portal</strong><br>Click the [Open OWASP Portal ⇗] button to launch the target application in a new tab.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Check Your Profile</strong><br>Navigate to the "Broken Access Control" panel. Look at your URL: <code>/api/owasp-top5-lab/profile?id=101</code>. You are viewing your own profile.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Tamper with the Parameter (IDOR)</strong><br>Change the <code>id</code> parameter to <code>100</code>: <code>/api/owasp-top5-lab/profile?id=100</code>. Press Enter. Because the server does not enforce access permissions, it returns the administrator's profile!</div>
      </div>`,
    questions: [
      { q: "Which security concept describes defining what resources an authenticated user is allowed to access?", a: "authorization", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the abbreviation for Insecure Direct Object References?", a: "idor", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag found on the Administrator's profile (id=100)?", a: "flag{bac_broken_access_control_success}", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "2. Cryptographic Failures (A04:2025)",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/owasp_crypto_diagram.png" alt="Cryptographic Failures"></div>
      <h3>Cryptographic Failures</h3>
      <p>Cryptographic Failures occur when an application fails to protect sensitive data (such as passwords, credit cards, or API keys) at rest or in transit. This includes storing passwords in plaintext, using weak algorithms like MD5 or SHA1, or using simple substitution ciphers without keys.</p>
      <p>Imagine a fruit blender. If you throw in a banana, strawberry, and yogurt, you get a pink smoothie. This is a one-way process: you cannot put the smoothie back into the blender to separate the fruit. Cryptographic Hashing works the same way. Instead of storing your password "123456" in plain text, the server hashes it to a scrambled string. If a hacker steals the database, they cannot easily reverse the smoothie back into your password.</p>
      <h3>Practical Lab Task</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Open the Database Dump</strong><br>In the portal, click the "Cryptographic Failures" module to view a leaked backup file of user accounts.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Analyze the Hash</strong><br>Locate the <code>admin</code> user. The password hash has exactly 32 hexadecimal characters, which is a classic indicator of the weak, broken MD5 hashing algorithm.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Decode the Flag</strong><br>The admin flag is <code>synt{pelcgb_snvyherf_k0k}</code>. This uses the ROT13 cipher. Rotate the letters back by 13 positions using CyberChef to reveal the flag.</div>
      </div>`,
    questions: [
      { q: "Is cryptographic hashing a one-way or two-way mathematical process?", a: "one-way", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the name of the simple cipher that rotates alphabetical letters by 13 positions?", a: "rot13", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What weak, broken hashing algorithm was used to generate the 32-character admin password hash?", a: "md5", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the plaintext flag decoded from the ROT13 ciphertext?", a: "flag{crypto_failures_x0x}", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "3. Injection (A05:2025)",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/owasp_injection_diagram.png" alt="Injection"></div>
      <h3>Injection Vulnerabilities</h3>
      <p>An Injection vulnerability occurs when untrusted user input is sent directly to an interpreter (like a database or system shell) as part of a query or command. The interpreter cannot distinguish between the developer's original code and the user's malicious input, leading to unintended command execution.</p>
      <p>Imagine a teacher tells a student: "Write the following name on the board: [NAME]." If the teacher asks for "Bob", the student writes "Bob". But if a sneaky student inputs the name "Bob, and then erase the blackboard", the student writes "Bob" and then immediately erases the board! The student got confused because the input contained an action mixed inside the data.</p>
      <h3>Practical Lab Task</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Open the Search Page</strong><br>Click on the "Injection" module. You will see a user directory search input box.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Perform a Normal Search</strong><br>Type <code>alice</code> and click Search to see only Alice's record.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Inject a Payload</strong><br>Type the payload: <code>' OR '1'='1</code> and click Search. Because '1'='1' is always true, the database returns every row in the table, revealing the secret flag!</div>
      </div>`,
    questions: [
      { q: "What component of an application evaluates and executes instructions, making it vulnerable to injection?", a: "interpreter", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What does the 'SQL' in SQL Injection stand for?", a: "structured query language", hint: "Review the definitions and acronyms section." },
      { q: "What string payload can be injected to force the SQL query to return all records?", a: "' OR '1'='1", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag returned in the dumped user list?", a: "flag{sqli_injection_is_fun}", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "4. Security Misconfiguration (A02:2025)",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/owasp_misconfig_diagram.png" alt="Security Misconfiguration"></div>
      <h3>Security Misconfiguration</h3>
      <p>Security Misconfiguration occurs when security controls are not set up or maintained correctly. This includes using default passwords, enabling unnecessary services, leaving debugging panels active in production, or failing to disable directory listing.</p>
      <p>Imagine you build a high-tech house with fingerprint locks and security cameras. However, the builders left the default master code ("1234") active, and left a copy of the blueprints in an unlocked mailbox. Even though your house has advanced tech, it gets broken into due to a simple misconfiguration!</p>
      <h3>Practical Lab Task</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Open the Backup Directory</strong><br>Click on the "Security Misconfiguration" module to visit the <code>/backup/</code> directory.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Directory Listing</strong><br>Because there is no index file and directory listing is enabled, the server displays all files in the folder. Notice the <code>config.bak</code> file.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Extract the Flag</strong><br>Click on <code>config.bak</code> to read its contents and discover the leaked password flag.</div>
      </div>`,
    questions: [
      { q: "What is the name of the feature that automatically lists files in a folder when no index page is present?", a: "directory listing", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the file extension of the backup file found in the directory listing?", a: "bak", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the database password flag leaked in the backup file?", a: "flag{misconfig_backup_leak}", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "5. Software Supply Chain Failures (A03:2025)",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/owasp_supply_chain.png" alt="Software Supply Chain"></div>
      <h3>Software Supply Chain Failures</h3>
      <p>Modern applications rely heavily on third-party libraries (like npm or pip packages). If you integrate code from untrusted sources or use outdated packages with known security vulnerabilities, attackers can compromise your entire system through the supply chain.</p>
      <p>Imagine a car manufacturer that builds an electric car. They buy the brakes from one supplier, and the screen display software from another. If the screen software supplier gets hacked, or if they send a version of the software with a known bug that lets someone disable the brakes remotely, the car manufacturer is vulnerable due to a Supply Chain Failure.</p>
      <h3>Practical Lab Task</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Check Dependencies</strong><br>Click the "Software Supply Chain" module to fetch the JSON package metadata. Notice the outdated package: <code>PyYAML==3.12</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Identify the CVE</strong><br>Look up the vulnerability ID associated with the insecure <code>yaml.load()</code> function in PyYAML 3.12.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Exploit Deserialization</strong><br>Go to the deserializer page. Send the payload: <code>!!python/object/apply:os.system ["echo flag{...}"]</code> to execute commands and get the flag.</div>
      </div>`,
    questions: [
      { q: "What term describes converting flat text data back into live programming language objects?", a: "deserialization", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What standard database registry system assigns unique numbers to public vulnerabilities? (e.g. CVE)", a: "cve", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What CVE number is associated with the PyYAML 3.12 deserialization vulnerability?", a: "CVE-2017-18342", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag returned upon submitting the exploit payload to the YAML parser?", a: "flag{supply_chain_integrity_vuln}", hint: "Check the command reference blocks." }
    ]
  }
];
