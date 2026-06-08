const LESSONS = [
  {
    title: "1. Missing Logging & Brute Force",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/images/logging_failures.png" alt="Logging Failures Diagram" class="htb-diagram"></div>
      <h3>What are Security Logging & Monitoring Failures?</h3>
      <p>Security Logging and Monitoring Failures occur when an application does not adequately record, monitor, or alert on security-critical events such as failed logins, privilege escalation attempts, or high-value transactions. Without comprehensive logging, incident response teams cannot detect active breaches, determine the scope of a compromise, or perform post-incident forensics. Attackers rely on this lack of visibility to extract data and maintain persistent access over extended periods without triggering any alarms.</p>
      <p>Imagine a bank with no security cameras and no alarm system. A thief could spend hours drilling into the vault, and nobody would know until the next morning. This is exactly what happens when a web application has logging and monitoring failures. Hackers can smash against the digital front door thousands of times, but because the website isn't keeping a diary (logs) or ringing a bell (alerts), the security team remains completely blind to the attack.</p>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Launch the Lab</strong><br>Click <strong>Launch Lab</strong>. A <strong>SOC (Security Operations Center) Console</strong> opens.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Attempt Failed Logins</strong><br>Try logging in with wrong passwords at least 5 times (use <code>analyst</code> with wrong passwords). Notice the attempt counter goes up but no alerts are triggered.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Log In Successfully</strong><br>After seeing the brute force flag, log in correctly: <code>analyst / monitor2026</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 4</div>
        <div class="step-body"><strong>Check the Security Log</strong><br>On the dashboard, observe the Security Event Log. Notice that your 5+ failed login attempts were <strong>never recorded</strong>! The flag is displayed below the log.</div>
      </div>`,
    questions: [
      { q: "How many failed login attempts should trigger a security alert in a well-designed system?", a: "3 to 5", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag for undetected brute force attacks?", a: "CTF{n0_l0gg1ng_brut3_f0rc3}", hint: "Check the command reference blocks." },
      { q: "What does SOC stand for?", a: "Security Operations Center", hint: "Review the definitions and acronyms section." },
      { q: "What is the analyst's password?", a: "monitor2026", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "2. Disabled Alerts & Log Injection",
    points: 60,
    html: `<h3>Silent Alarm Failure and Log Injection</h3>
      <p>Even if an application generates logs, the defense fails if proactive alerting is disabled or misconfigured. Furthermore, if log entries are generated using unsanitized user input, attackers can perform Log Injection (or Log Forging). By injecting newline characters or fake log formats into input fields, an attacker can write fabricated entries into the server logs, allowing them to mask their malicious activity, frame other users, or corrupt the log parsers used by SIEM systems.</p>
      <p>Imagine a security guard who writes down the name of every person who enters a building. If an attacker walks in wearing a nametag that says "Bob \\n 12:00 PM - Guard fell asleep", the guard might blindly copy that entire phrase into the logbook. Later, when the manager reads the book, it looks like a legitimate entry stating the guard was asleep! By carefully formatting their input, hackers can trick the logging system into writing fake history to cover their tracks.</p>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Enable Alerts</strong><br>Click the <strong>Enable Alerts</strong> button. This activates the monitoring system and reveals a flag proving that the alerts were off by default — a critical misconfiguration.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Inject a Fake Log Entry</strong><br>In the "Log Injection Test" section, enter this crafted search query:<br><code>admin"] [OK] User logged in successfully</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Check the Log</strong><br>Scroll up to the Security Event Log. Your injected text appears as if it were a legitimate log entry! This could be used to hide attacks or create false alibis. The flag is revealed.</div>
      </div>`,
    questions: [
      { q: "What is the flag for discovering that alerts were disabled?", a: "CTF{s1l3nt_4l4rm_f41lur3}", hint: "Check the command reference blocks." },
      { q: "What is the flag for successful log injection?", a: "CTF{l0g_1nj3ct10n_4tt4ck}", hint: "Check the command reference blocks." },
      { q: "What should be done to user input before writing it to log files?", a: "sanitization", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "3. Monitoring Best Practices",
    points: 50,
    html: `<h3>Why Monitoring Matters</h3>
      <p>According to security research, the average time to detect a data breach is <strong>277 days</strong>. Proper logging and monitoring can reduce this to minutes.</p>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Review the Dashboard</strong><br>Notice the "ALERTS DISABLED" status that was present by default. This is the flag for missing monitoring — a system that ships with its alarm system turned off!</div>
      </div>
      <h3>What Should Be Logged</h3>
      <p><strong>1. Authentication Events:</strong> All login successes, failures, and lockouts.</p>
      <p><strong>2. Authorization Failures:</strong> When a user tries to access a resource they're not allowed to.</p>
      <p><strong>3. Input Validation Failures:</strong> SQL injection attempts, XSS payloads, etc.</p>
      <p><strong>4. Application Errors:</strong> Unexpected exceptions and crashes.</p>
      <h3>Monitoring Essentials</h3>
      <p><strong>1. SIEM Systems:</strong> Security Information and Event Management tools like Splunk or ELK Stack aggregate and analyze logs in real-time.</p>
      <p><strong>2. Alerting Rules:</strong> Configure alerts for patterns like 5+ failed logins, access from unusual IPs, or privilege escalation attempts.</p>
      <p><strong>3. Log Integrity:</strong> Use append-only log storage with checksums to prevent tampering.</p>
      <p><strong>4. Incident Response Plan:</strong> Have a documented procedure for what to do when an alert fires.</p>`,
    questions: [
      { q: "What is the flag for missing monitoring configuration?", a: "CTF{m1ss1ng_m0n1t0r1ng}", hint: "Check the command reference blocks." },
      { q: "What does SIEM stand for?", a: "Security Information and Event Management", hint: "Review the definitions and acronyms section." },
      { q: "How many days does the average data breach take to detect?", a: "277", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What type of log storage prevents attackers from modifying old entries?", a: "append-only", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  }
];
