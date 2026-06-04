const LESSONS = [
  {
    title: "1. Insecure Design (OWASP A06:2025)",
    points: 20,
    html: `
      <div class="htb-diagram-container">
        <img src="../../../assets/images/insecure_design.png" alt="Insecure Design Diagram" class="htb-diagram">
      </div>
      <h3>Understanding Insecure Design</h3>
      <p>Imagine you are building a bank vault. You hire the best locksmiths to install the strongest locks, but you accidentally design the vault with a window on the side that anyone can climb through. The locks work perfectly — the <em>design</em> is the problem. This is <strong>Insecure Design</strong>.</p>
      <p>Unlike implementation bugs (coding mistakes), insecure design means the <strong>architecture itself</strong> is flawed. Security was never considered during the planning phase of the Software Development Life Cycle (SDLC). No amount of perfect code can fix a bad blueprint.</p>

      <h3>Common Insecure Design Patterns</h3>
      <p><strong>1. Missing Abuse-Case Planning:</strong> A shopping cart that allows applying the same discount coupon multiple times because no one designed a rule to prevent it.</p>
      <p><strong>2. Predictable Secret Paths:</strong> Admin panels placed at easily guessable URLs like <code>/admin-panel</code> with no authentication, relying on "security through obscurity."</p>

      <h3>How to Design Securely</h3>
      <p><strong>Threat Modeling:</strong> Before writing any code, map out all the ways users (and attackers) could interact with features.</p>
      <p><strong>Defense in Depth:</strong> Never rely on a single control. Combine rate limiting, input validation, authentication, and authorization.</p>
    `,
    questions: [
      { q: "What OWASP Top 10 category describes flaws in the software's architectural blueprint?", a: "Insecure Design" },
      { q: "What process should developers perform before coding to identify security risks?", a: "Threat Modeling" },
      { q: "What principle states that relying on hidden URLs for security is a bad idea?", a: "security through obscurity" }
    ]
  },
  {
    title: "2. Authentication Failures (OWASP A07:2025)",
    points: 20,
    html: `
      <div class="htb-diagram-container">
        <img src="../../../assets/images/auth_failures.png" alt="Auth Failures Diagram" class="htb-diagram">
      </div>
      <h3>What are Authentication Failures?</h3>
      <p>Imagine a building where the security guard tells visitors: "Sorry, John Smith doesn't work here" vs "Sorry, wrong badge code." The first response confirms that John Smith exists! This is <strong>user enumeration</strong> — a fundamental authentication failure.</p>

      <h3>Common Authentication Flaws</h3>
      <p><strong>1. No Rate Limiting:</strong> A secure system should lock accounts or add delays after multiple failed login attempts to prevent Brute Force attacks.</p>
      <p><strong>2. Predictable Sessions:</strong> If a session token is just an MD5 hash of the username, an attacker can easily forge any user's session.</p>

      <h3>Proper Authentication Design</h3>
      <p><strong>1.</strong> Use cryptographically random session tokens.</p>
      <p><strong>2.</strong> Implement Multi-Factor Authentication (MFA) for sensitive accounts.</p>
      <p><strong>3.</strong> Use generic error messages: "Invalid username or password" (never confirm which is wrong).</p>
      <p><strong>4.</strong> Enforce account lockout after 3-5 failed attempts with exponential backoff.</p>
    `,
    questions: [
      { q: "What attack does different error messages for valid vs invalid usernames enable?", a: "user enumeration" },
      { q: "What security control should block repeated login attempts?", a: "account lockout" },
      { q: "What does MFA stand for?", a: "Multi-Factor Authentication" }
    ]
  },
  {
    title: "3. Software or Data Integrity Failures (OWASP A08:2025)",
    points: 20,
    html: `
      <div class="htb-diagram-container">
        <img src="../../../assets/images/integrity_failures.png" alt="Integrity Failures Diagram" class="htb-diagram">
      </div>
      <h3>What are Software & Data Integrity Failures?</h3>
      <p>Imagine buying a sealed medicine bottle from a pharmacy. You trust it because the seal proves nobody tampered with it. Now imagine the pharmacy stops using seals — anyone could swap the pills with sugar tablets and you'd never know. This is a <strong>Software & Data Integrity Failure</strong>.</p>

      <h3>CI/CD and Deserialization Flaws</h3>
      <p>If a CI/CD pipeline deploys artifacts to production <strong>without verifying digital signatures</strong>, a compromised build server could push malicious code to millions of users.</p>
      <p>Another integrity failure is <strong>Insecure Deserialization</strong>, where a server blindly trusts and executes serialized data (like a Base64-encoded JSON object) provided by the user without validation.</p>

      <h3>Mitigations</h3>
      <p><strong>1. Subresource Integrity (SRI):</strong> Add integrity hashes to script/link tags so browsers reject tampered CDN resources.</p>
      <p><strong>2. Code Signing:</strong> Require all software packages and CI/CD artifacts to be digitally signed before deployment.</p>
    `,
    questions: [
      { q: "What type of seal/proof should software packages have to prove they haven't been tampered with?", a: "digital signatures" },
      { q: "What vulnerability occurs when a server blindly trusts and executes serialized data from a user?", a: "Insecure Deserialization" },
      { q: "What HTML attribute verifies the integrity of external scripts loaded from CDNs?", a: "Subresource Integrity" }
    ]
  },
  {
    title: "4. Security Logging & Alerting Failures (OWASP A09:2025)",
    points: 20,
    html: `
      <div class="htb-diagram-container">
        <img src="../../../assets/images/logging_failures.png" alt="Logging Failures Diagram" class="htb-diagram">
      </div>
      <h3>Missing Alarms and Cameras</h3>
      <p>Imagine a bank with huge vaults but no security cameras and no alarm system. A thief could spend hours drilling into the vault, and nobody would know until the next morning. This happens when an application has <strong>logging and monitoring failures</strong>.</p>

      <h3>Log Injection Attack</h3>
      <p>When user input is written directly to log files without sanitization, attackers can inject fake log entries to cover their tracks or confuse incident responders. For example, injecting <code>\n[OK] Admin logged in</code> into a search query that gets logged.</p>

      <h3>Monitoring Essentials</h3>
      <p><strong>1. SIEM Systems:</strong> Security Information and Event Management tools aggregate and analyze logs in real-time.</p>
      <p><strong>2. Alerting Rules:</strong> Configure alerts for patterns like 5+ failed logins, access from unusual IPs, or privilege escalation attempts.</p>
      <p><strong>3. Log Integrity:</strong> Use append-only log storage with checksums to prevent attackers from modifying old entries to hide their tracks.</p>
    `,
    questions: [
      { q: "What should be done to user input before writing it to log files to prevent injection?", a: "sanitization" },
      { q: "What does SIEM stand for?", a: "Security Information and Event Management" },
      { q: "What type of log storage prevents attackers from modifying old entries?", a: "append-only" }
    ]
  },
  {
    title: "5. Mishandling of Exceptional Conditions (OWASP A10:2025)",
    points: 20,
    html: `
      <div class="htb-diagram-container">
        <img src="../../../assets/images/error_handling.png" alt="Error Handling Diagram" class="htb-diagram">
      </div>
      <h3>Mishandling of Exceptional Conditions</h3>
      <p>When applications don't handle errors properly, they can leak database credentials, internal IP addresses, full filesystem paths, and software versions — all invaluable to an attacker. This is often caused by leaving <code>DEBUG=True</code> enabled in a production environment.</p>

      <h3>Path and Stack Trace Disclosure</h3>
      <p>If a user searches for an invalid ID and the server crashes, returning a full Python or Java stack trace, the attacker instantly knows the exact directory structure of the server (e.g., <code>/var/www/html/app.py</code>) and what database software is running.</p>

      <h3>How to Handle Errors Securely</h3>
      <p><strong>1. Generic Error Pages:</strong> Show users friendly messages like "Something went wrong. Please try again." Never show stack traces or internal details.</p>
      <p><strong>2. Centralized Error Handling:</strong> Use try-catch blocks and global error handlers to catch all exceptions before they reach the user.</p>
      <p><strong>3. Log Errors Internally:</strong> Write detailed error information to secure server logs that only developers can access — never to the HTTP response.</p>
    `,
    questions: [
      { q: "What application setting should NEVER be enabled in a production environment?", a: "DEBUG" },
      { q: "What type of information do verbose errors leak to attackers that reveals the code execution path?", a: "stack traces" },
      { q: "What should replace verbose error messages shown to end users?", a: "generic error pages" },
      { q: "Where should detailed error information be written instead of HTTP responses?", a: "server logs" }
    ]
  }
];
