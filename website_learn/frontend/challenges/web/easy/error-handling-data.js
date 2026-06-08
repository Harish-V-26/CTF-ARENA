const LESSONS = [
  {
    title: "1. Verbose Errors & Debug Mode",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/images/error_handling.png" alt="Error Handling Diagram" class="htb-diagram"></div>
      <h3>What is Mishandling of Exceptional Conditions?</h3>
      <p>Security Misconfiguration often manifests as verbose error handling, where an application fails to gracefully handle an exception and instead returns raw stack traces or internal environment variables directly to the end-user. When frameworks like Django, Flask, or Express are deployed with ` + "`" + `DEBUG=True` + "`" + ` in a production environment, they prioritize developer convenience over security, leaking critical internal system states when errors occur.</p>
      <p>Imagine calling a locksmith and they accidentally say: "I can't open your lock, but I noticed the brand is MasterLock 3000, the key pattern is X7Y, and the back door at 42 Oak Street uses the same model." Now you have way too much information! This is exactly what happens when a website breaks and throws a giant page of code at you. The website's "Debug Mode" is acting like a talkative mechanic who accidentally hands over the blueprints to the entire building.</p>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Launch the Lab</strong><br>Click <strong>Launch Lab</strong>. The <strong>AppServer Console</strong> opens — a management application running with debug mode enabled in production.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Log In</strong><br>Use: <code>developer / dev2026</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Observe the Debug Warning</strong><br>The dashboard immediately shows a warning that the application is running with <code>DEBUG=True</code> in production. This first flag proves that debug mode exposes stack traces to all users.</div>
      </div>`,
    questions: [
      { q: "What application setting should NEVER be True in production?", a: "DEBUG", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag for debug mode being enabled in production?", a: "CTF{d3bug_m0d3_1n_pr0d}", hint: "Check the command reference blocks." },
      { q: "What type of information do verbose errors leak to attackers?", a: "stack traces", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "2. Information Leakage via Errors",
    points: 70,
    html: `<h3>Extracting Secrets from Error Messages</h3>
      <p>When unhandled exceptions bubble up to the HTTP response, they frequently carry sensitive context from the application's memory. This information leakage can include absolute filesystem paths, internal IP addressing, software versions, and severely, database connection strings containing plaintext credentials. Attackers leverage these leaked details to chain vulnerabilities, using the exposed internal architecture to launch secondary, more devastating attacks like SQL Injection or Remote Code Execution.</p>
      <p>If you break a vase in your house, you sweep up the pieces so nobody steps on them. But a poorly programmed website doesn't sweep up its mess. If you force the website to crash, it panics and dumps all of its internal secrets onto the floor for everyone to see. By deliberately giving the website broken or confusing data, hackers force these crashes on purpose, hoping the website will accidentally drop a valuable database password or a secret map of the server.</p>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Trigger a User Lookup Error</strong><br>In the "User Lookup" section, enter <code>abc</code> as the user ID. The application crashes with a <code>ValueError</code> and leaks the full stack trace including the database connection string!</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Try an Out-of-Range ID</strong><br>Enter <code>999</code>. This triggers an <code>IndexError</code> that leaks the database table name, row count, and full connection string with credentials.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Test the Database Connection</strong><br>Click <strong>Test Connection</strong> in the "Database Connection Test" section. The connection fails and the error reveals the complete connection string including username, password, host, and database name!</div>
      </div>`,
    questions: [
      { q: "What is the flag for verbose error information leakage?", a: "CTF{v3rb0s3_3rr0r_l34k}", hint: "Check the command reference blocks." },
      { q: "What is the database password leaked in the error messages?", a: "P@ssw0rd123!", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag for database credential leakage?", a: "CTF{db_cr3d3nt14ls_l34k3d}", hint: "Check the command reference blocks." },
      { q: "What is the internal database host IP address leaked?", a: "10.0.1.5", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "3. Path Disclosure & Mitigations",
    points: 60,
    html: `<h3>Filesystem Path Disclosure</h3>
      <p>Full Path Disclosure (FPD) is a specific type of error leakage where the application reveals its exact location on the server's filesystem (e.g., ` + "`" + `/var/www/html/app/config.php` + "`" + `). While not a critical vulnerability in isolation, FPD is a vital stepping stone for attackers. Knowing the absolute path is often required to successfully exploit Local File Inclusion (LFI) vulnerabilities or to write malicious shells to executable directories.</p>
      <p>Imagine trying to steal a secret recipe from a massive corporate office building. It would take weeks to search every drawer! But what if an employee accidentally leaves a sticky note on the door that says: "The recipe is in Room 402, Filing Cabinet C, Folder 8"? That is exactly what Path Disclosure is. The error message gives the hacker a perfect, turn-by-turn map directly to the website's most sensitive files.</p>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Trigger a File Read Error</strong><br>In the "File Reader" section, enter <code>/nonexistent</code>. The error reveals the full Python traceback including the working directory, Python path, application root, and process ID.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Try Accessing Sensitive Files</strong><br>Try <code>/etc/shadow</code>. Even though access is denied, the error reveals valuable filesystem information.</div>
      </div>
      <h3>How to Handle Errors Securely</h3>
      <p><strong>1. Generic Error Pages:</strong> Show users friendly messages like "Something went wrong. Please try again." Never show stack traces or internal details.</p>
      <p><strong>2. Disable Debug Mode:</strong> Always set <code>DEBUG=False</code> in production. Use environment-specific configurations.</p>
      <p><strong>3. Centralized Error Handling:</strong> Use try-catch blocks and global error handlers to catch all exceptions before they reach the user.</p>
      <p><strong>4. Log Errors Internally:</strong> Write detailed error information to secure server logs that only developers can access — never to the HTTP response.</p>`,
    questions: [
      { q: "What is the flag for stack trace exposure?", a: "CTF{st4ck_tr4c3_3xp0s3d}", hint: "Check the command reference blocks." },
      { q: "What is the application's root directory path leaked in the error?", a: "/app", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What should replace verbose error messages shown to end users?", a: "generic error pages", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Where should detailed error information be written instead of HTTP responses?", a: "server logs", hint: "Refer to the HTTP protocol details." }
    ]
  }
];
