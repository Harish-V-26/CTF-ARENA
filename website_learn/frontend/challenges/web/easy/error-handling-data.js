const LESSONS = [
  {
    title: "1. Verbose Errors & Debug Mode",
    points: 50,
    html: `
      <div class="htb-diagram-container">
        <img src="../../../assets/images/error_handling.png" alt="Error Handling Diagram" class="htb-diagram">
      </div>
      <h3>What is Mishandling of Exceptional Conditions?</h3>
      <p>Imagine calling a locksmith and they accidentally say: "I can't open your lock, but I noticed the brand is MasterLock 3000, the key pattern is X7Y, and the back door at 42 Oak Street uses the same model." Now you have way too much information! This is what happens when applications leak <strong>verbose error messages</strong>.</p>

      <h3>Getting Started</h3>
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
      </div>
    `,
    questions: [
      { q: "What application setting should NEVER be True in production?", a: "DEBUG" },
      { q: "What is the flag for debug mode being enabled in production?", a: "CTF{d3bug_m0d3_1n_pr0d}" },
      { q: "What type of information do verbose errors leak to attackers?", a: "stack traces" }
    ]
  },
  {
    title: "2. Information Leakage via Errors",
    points: 70,
    html: `
      <h3>Extracting Secrets from Error Messages</h3>
      <p>When applications don't handle errors properly, they can leak database credentials, internal IP addresses, file paths, and software versions — all invaluable to an attacker.</p>

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
      </div>
    `,
    questions: [
      { q: "What is the flag for verbose error information leakage?", a: "CTF{v3rb0s3_3rr0r_l34k}" },
      { q: "What is the database password leaked in the error messages?", a: "P@ssw0rd123!" },
      { q: "What is the flag for database credential leakage?", a: "CTF{db_cr3d3nt14ls_l34k3d}" },
      { q: "What is the internal database host IP address leaked?", a: "10.0.1.5" }
    ]
  },
  {
    title: "3. Path Disclosure & Mitigations",
    points: 60,
    html: `
      <h3>Filesystem Path Disclosure</h3>
      <p>Error messages can also reveal the server's internal file structure, which helps attackers plan further attacks like directory traversal or privilege escalation.</p>

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
      <p><strong>4. Log Errors Internally:</strong> Write detailed error information to secure server logs that only developers can access — never to the HTTP response.</p>
      <p><strong>5. Security Headers:</strong> Use headers like <code>X-Content-Type-Options</code> and remove <code>Server</code> version headers to minimize information leakage.</p>
    `,
    questions: [
      { q: "What is the flag for stack trace exposure?", a: "CTF{st4ck_tr4c3_3xp0s3d}" },
      { q: "What is the application's root directory path leaked in the error?", a: "/app" },
      { q: "What should replace verbose error messages shown to end users?", a: "generic error pages" },
      { q: "Where should detailed error information be written instead of HTTP responses?", a: "server logs" }
    ]
  }
];
