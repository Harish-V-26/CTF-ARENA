const LESSONS = [
  {
    title: "1. Broken Access Control (A01:2025)",
    points: 50,
    html: `
      <h3>What is Access Control?</h3>
      <p>Think of web security in two distinct phases:
      <ul>
        <li><strong>Authentication (AuthN):</strong> Proving <em>who you are</em> (e.g., logging in with your username and password).</li>
        <li><strong>Authorization (AuthZ):</strong> Defining <em>what you are allowed to do</em> (e.g., viewing your own dashboard, but not deleting another user's account).</li>
      </ul>
      </p>

      <p><strong>Broken Access Control</strong> (ranked #1 in the OWASP Top 10) is a failure of <em>Authorization</em>. Even if you log in successfully, the application fails to verify whether you have permission to perform an action or view a specific resource.</p>

      <img src="../../../assets/owasp_bac_diagram.png" alt="Broken Access Control and IDOR Diagram" style="width: 100%; max-width: 600px; display: block; margin: 20px auto; border-radius: 8px; border: 1px solid var(--border-color); box-shadow: 0 4px 20px rgba(0,0,0,0.4);" />

      <div class="analogy-box">
        <strong>The School Analogy:</strong><br>
        Imagine a school security system. Students have ID cards to enter the building (Authentication). Once inside, they can go to classrooms, but they are not allowed inside the teacher's lounge or the principal's record safe (Authorization). If the door to the principal's safe is left unlocked, allowing any student to walk in and read records, that is <strong>Broken Access Control</strong>.
      </div>

      <h3>Insecure Direct Object References (IDOR)</h3>
      <p>One common type of Broken Access Control is <strong>IDOR</strong>. This happens when a website exposes a direct pointer to a database object (like a URL parameter <code>id=101</code>) and fails to check if the current user actually owns that object. A user can simply change the number in their browser's address bar (e.g., to <code>id=100</code>) to view someone else's data.</p>

      <h3>Practical Lab Task</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Open the Target Lab Portal</strong><br>
          Click the <span class="badge orange">Open OWASP Portal ⇗</span> button above to launch the interactive target application in a new tab.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Check Your Profile</strong><br>
          Navigate to the <strong>Broken Access Control</strong> panel. You will be logged in as a normal employee. Look at your URL in the address bar:
          <pre>/api/owasp-top5-lab/profile?id=101</pre>
          You are viewing your own profile details (User ID: 101).
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Tamper with the Parameter</strong><br>
          Manually edit the URL in your browser's address bar. Change the <code>id</code> parameter value from <code>101</code> to <code>100</code>:<br>
          <code>/api/owasp-top5-lab/profile?id=100</code><br><br>
          Press Enter to load the page. Because the server does not enforce access permissions, it will return the administrator's profile page containing the secret flag!
        </div>
      </div>
    `,
    questions: [
      { q: "Which security concept describes defining what resources an authenticated user is allowed to access?", a: "authorization" },
      { q: "What is the abbreviation for Insecure Direct Object References?", a: "idor" },
      { q: "What is the flag found on the Administrator's profile (id=100)?", a: "flag{bac_broken_access_control_success}" }
    ]
  },
  {
    title: "2. Cryptographic Failures (A04:2025)",
    points: 50,
    html: `
      <h3>What are Cryptographic Failures?</h3>
      <p>Formerly known as <em>Sensitive Data Exposure</em>, this category covers failures to protect sensitive data (such as passwords, credit card numbers, and API keys) at rest or in transit using secure cryptography.</p>

      <img src="../../../assets/owasp_crypto_diagram.png" alt="Cryptographic Failures Diagram" style="width: 100%; max-width: 600px; display: block; margin: 20px auto; border-radius: 8px; border: 1px solid var(--border-color); box-shadow: 0 4px 20px rgba(0,0,0,0.4);" />

      <div class="analogy-box">
        <strong>The Blender Analogy for Hashing:</strong><br>
        Imagine a fruit blender. If you throw in a banana, strawberry, and yogurt, you get a pink smoothie. This is a one-way process: you cannot put the smoothie back into the blender to separate it into a whole banana and strawberry. 
        <br><br>
        <strong>Cryptographic Hashing</strong> works the same way. It is a one-way mathematical function. Instead of storing your password "123456" in plain text, the server hashes it to a scrambled string. When you log in, the server hashes your input and compares it to the stored scramble. If a hacker steals the database of hashes, they cannot easily reverse them to find your password.
      </div>

      <h3>Common Failures in Cryptography:</h3>
      <ul>
        <li><strong>Using Plaintext:</strong> Storing passwords or secrets with no encryption or hashing at all.</li>
        <li><strong>Weak Algorithms:</strong> Using algorithms like <code>MD5</code> or <code>SHA1</code>. Because computers are now extremely fast, these algorithms are considered broken. Hackers can check billions of hashes per second using lookup lists (rainbow tables) to decode them.</li>
        <li><strong>Symmetric Ciphers without Keys:</strong> Using simple substitution ciphers like <strong>ROT13</strong> (which rotates alphabetical letters by 13 positions, e.g., 'A' becomes 'N'). There is no secret key involved, so anyone can easily reverse it.</li>
      </ul>

      <h3>Practical Lab Task</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Open the Database Dump</strong><br>
          In the target lab portal, click on the <strong>Cryptographic Failures</strong> module. You will be shown a leaked backup file of a user accounts table.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Analyze the Administrator Password Hash</strong><br>
          Locate the row for the <code>admin</code> user. The password hash is:
          <pre>5f4dcc3b5aa765d61d8327deb882cf99</pre>
          Note that this hash has exactly 32 hexadecimal characters. This is a classic indicator of the weak <strong>MD5</strong> hashing algorithm.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Decode the Scrambled Flag</strong><br>
          Look at the encrypted flag column for the admin user:
          <pre>synt{pelcgb_snvyherf_k0k}</pre>
          This flag has been encrypted using the ROT13 cipher. Use an online tool (like CyberChef) or write a quick script to rotate the letters back by 13 positions to find the flag.
        </div>
      </div>
    `,
    questions: [
      { q: "Is cryptographic hashing a one-way or two-way mathematical process?", a: "one-way" },
      { q: "What is the name of the simple cipher that rotates alphabetical letters by 13 positions?", a: "rot13" },
      { q: "What weak, broken hashing algorithm was used to generate the 32-character admin password hash?", a: "md5" },
      { q: "What is the plaintext flag decoded from the ROT13 ciphertext?", a: "flag{crypto_failures_x0x}" }
    ]
  },
  {
    title: "3. Injection (A05:2025)",
    points: 50,
    html: `
      <h3>What is Injection?</h3>
      <p>An <strong>Injection</strong> vulnerability occurs when untrusted user input is sent directly to an interpreter (like a database or system shell) as part of a query or command. The interpreter cannot distinguish between the developer's original code and the user's input, leading to unintended command execution.</p>

      <img src="../../../assets/owasp_injection_diagram.png" alt="SQL Injection Diagram" style="width: 100%; max-width: 600px; display: block; margin: 20px auto; border-radius: 8px; border: 1px solid var(--border-color); box-shadow: 0 4px 20px rgba(0,0,0,0.4);" />

      <div class="analogy-box">
        <strong>The Classroom Analogy:</strong><br>
        Imagine a teacher tells a student: "Write the following name on the board: [NAME]." <br>
        If the teacher asks for the name "Bob", the student writes "Bob" (Normal behavior).<br>
        If a sneaky student inputs the "name": <code>Bob, and then erase the blackboard</code>, the student writes "Bob" and then erases the board! <br>
        The student got confused because the input contained an action (command) mixed inside the data.
      </div>

      <h3>SQL Injection (SQLi)</h3>
      <p>In web apps, SQL Injection is the most common form. Imagine a backend database query built using string concatenation:</p>
      <pre>SELECT * FROM users WHERE name = 'USER_INPUT'</pre>
      <p>If you search for <code>alice</code>, the database runs: <code>SELECT * FROM users WHERE name = 'alice'</code>.</p>
      <p>If you enter: <code>' OR '1'='1</code>, the single quote breaks out of the string boundary, transforming the query into:</p>
      <pre>SELECT * FROM users WHERE name = '' OR '1'='1'</pre>
      <p>Because the condition <code>'1'='1'</code> is always true (a tautology), the database ignores the name filter and returns <strong>every row</strong> in the table.</p>

      <h3>Practical Lab Task</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Open the Search Page</strong><br>
          In the target lab, click on the <strong>Injection</strong> module. You will see a user directory search input box.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Perform a Normal Search</strong><br>
          Type <code>alice</code> in the search bar and click Search. Only Alice's record is displayed.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Inject a Tautology Payload</strong><br>
          Type the classic SQL Injection payload in the search field:<br>
          <code>' OR '1'='1</code><br><br>
          Click Search. Notice how the page prints the executed query and dumps the entire database table. Locate the secret flag account!
        </div>
      </div>
    `,
    questions: [
      { q: "What component of an application evaluates and executes instructions, making it vulnerable to injection if inputs aren't sanitized?", a: "interpreter" },
      { q: "What does the 'SQL' in SQL Injection stand for?", a: "structured query language" },
      { q: "What string payload can be injected to force the SQL query to return all records?", a: "' OR '1'='1" },
      { q: "What is the flag returned in the dumped user list?", a: "flag{sqli_injection_is_fun}" }
    ]
  },
  {
    title: "4. Security Misconfiguration (A02:2025)",
    points: 50,
    html: `
      <h3>What is Security Misconfiguration?</h3>
      <p><strong>Security Misconfiguration</strong> occurs when security controls are not set up or maintained correctly. This includes using default passwords, enabling unnecessary services, leaving debugging/console panels active in production, or failing to disable directory browsing.</p>

      <img src="../../../assets/owasp_misconfig_diagram.png" alt="Security Misconfiguration Diagram" style="width: 100%; max-width: 600px; display: block; margin: 20px auto; border-radius: 8px; border: 1px solid var(--border-color); box-shadow: 0 4px 20px rgba(0,0,0,0.4);" />

      <div class="analogy-box">
        <strong>The House Analogy:</strong><br>
        Imagine you build a high-tech house with fingerprint locks and security cameras. However, during installation, the builders left the default master key (which is "1234") active, and left a copy of the house blue-prints in an unlocked mailbox outside. Even though your house has advanced tech, it gets broken into due to a <strong>Security Misconfiguration</strong>.
      </div>

      <h3>Directory Listing / Indexing</h3>
      <p>A web server is usually set up to serve a file like <code>index.html</code> when a folder is visited. If no index file is present, and "Directory Listing" is enabled, the server will display a file browser of everything in that folder. This exposes backup config files (like <code>config.bak</code>) or temporary files that developers forgot to remove.</p>

      <h3>Practical Lab Task</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Open the Backup Directory</strong><br>
          In the target lab portal, click on the <strong>Security Misconfiguration</strong> module. You will be taken to:<br>
          <code>/api/owasp-top5-lab/backup/</code>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Locate the Leaked Configuration File</strong><br>
          Observe the raw file listing generated by the web server. Notice a backup file named <code>config.bak</code>.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Extract the Flag</strong><br>
          Click on <code>config.bak</code> to open and read its text contents. Look for the database configuration fields to discover the leaked password flag!
        </div>
      </div>
    `,
    questions: [
      { q: "What is the name of the feature that automatically lists files in a folder when no index page is present?", a: "directory listing" },
      { q: "What is the file extension of the backup file found in the directory listing?", a: "bak" },
      { q: "What is the database password flag leaked in the backup file?", a: "flag{misconfig_backup_leak}" }
    ]
  },
  {
    title: "5. Software Supply Chain Failures (A03:2025)",
    points: 50,
    html: `
      <h3>What is a Software Supply Chain Failure?</h3>
      <p>Modern applications are rarely written entirely from scratch. Developers rely heavily on third-party libraries and open-source packages (like npm modules or Python pip packages) to speed up development. This collection of third-party components is the <strong>Software Supply Chain</strong>.</p>
      
      <p>If you integrate code from untrusted sources or use outdated packages that have known, unpatched security vulnerabilities, attackers can compromise your entire system.</p>

      <img src="../../../assets/owasp_supply_chain.png" alt="Software Supply Chain Failures Diagram" style="width: 100%; max-width: 600px; display: block; margin: 20px auto; border-radius: 8px; border: 1px solid var(--border-color); box-shadow: 0 4px 20px rgba(0,0,0,0.4);" />

      <div class="analogy-box">
        <strong>The Car Assembly Analogy:</strong><br>
        Imagine a car manufacturer that builds an electric car. They buy the brakes from one supplier, the tires from another, and the screen display software from a third. If the screen software supplier gets hacked, or if they send a version of the software with a known bug that lets someone disable the brakes remotely, the car manufacturer is vulnerable due to a <strong>Supply Chain Failure</strong>.
      </div>

      <h3>Insecure Deserialization</h3>
      <p><strong>Serialization</strong> is the process of converting live programming language objects into a flat string format (like JSON or YAML) so they can be saved or sent over the network. <strong>Deserialization</strong> is the reverse process: rebuilding that flat string back into live code objects. If the deserialization library is vulnerable (like PyYAML's <code>yaml.load()</code> function in version 3.12), an attacker can craft a malicious string that automatically executes commands on the server when unpacked.</p>

      <h3>Practical Lab Task</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Check the Application Dependencies</strong><br>
          In the target lab, click the <strong>Software Supply Chain</strong> module to fetch the JSON package metadata. Notice the outdated package: <code>PyYAML==3.12</code>.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Identify the CVE Identifier</strong><br>
          Look up the vulnerability ID (CVE number) associated with the insecure <code>yaml.load()</code> function in PyYAML 3.12. (Format: CVE-2017-18342).
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Exploit Deserialization to Get the Flag</strong><br>
          Go to the deserializer page in the portal at:<br>
          <code>/api/owasp-top5-lab/yaml-load</code><br><br>
          Send the following payload into the text area and click process:<br>
          <pre>!!python/object/apply:os.system ["echo flag{...}"]</pre>
          The parser will deserialize the object, execute the system command, and print the flag output.
        </div>
      </div>
    `,
    questions: [
      { q: "What term describes converting flat text data back into live programming language objects?", a: "deserialization" },
      { q: "What standard database registry system assigns unique numbers to public vulnerabilities? (e.g. CVE)", a: "cve" },
      { q: "What CVE number is associated with the PyYAML 3.12 deserialization vulnerability?", a: "CVE-2017-18342" },
      { q: "What is the flag returned upon submitting the exploit payload to the YAML parser?", a: "flag{supply_chain_integrity_vuln}" }
    ]
  }
];
