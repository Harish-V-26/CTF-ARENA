const LESSONS = [
  {
    title: "1. Insecure Design (OWASP A06)",
    points: 20,
    html: `<div class="htb-diagram-container"><img src="../../../assets/images/insecure_design.png" alt="Insecure Design Diagram" class="htb-diagram"></div>
      <h3>Understanding Insecure Design</h3>
      <p>Unlike implementation bugs (coding mistakes), insecure design means the architecture itself is flawed. Security was never considered during the planning phase of the Software Development Life Cycle (SDLC). No amount of perfect code can fix a bad blueprint.</p>
      <p>Imagine you are building a bank vault. You hire the best locksmiths to install the strongest locks, but you accidentally design the vault with a window on the side that anyone can climb through. The locks work perfectly — the design is the problem. This is Insecure Design.</p>
      <h3>Design Vulnerabilities</h3>
      <div class="step-block">
        <div class="step-num">Flaw 1</div>
        <div class="step-body"><strong>Missing Abuse-Case Planning</strong><br>A shopping cart that allows applying the same discount coupon multiple times because no one designed a rule to prevent it.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Flaw 2</div>
        <div class="step-body"><strong>Predictable Secret Paths</strong><br>Admin panels placed at easily guessable URLs like <code>/admin-panel</code> with no authentication, relying on "security through obscurity."</div>
      </div>
      <div class="step-block">
        <div class="step-num">Defense</div>
        <div class="step-body"><strong>Threat Modeling</strong><br>Before writing any code, map out all the ways users (and attackers) could interact with features to implement Defense in Depth.</div>
      </div>`,
    questions: [
      { q: "What OWASP Top 10 category describes flaws in the software's architectural blueprint?", a: "Insecure Design", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What process should developers perform before coding to identify security risks?", a: "Threat Modeling", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What principle states that relying on hidden URLs for security is a bad idea?", a: "security through obscurity", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "2. Authentication Failures (OWASP A07)",
    points: 20,
    html: `<div class="htb-diagram-container"><img src="../../../assets/images/auth_failures.png" alt="Auth Failures Diagram" class="htb-diagram"></div>
      <h3>Authentication Failures</h3>
      <p>Authentication failures occur when an application incorrectly implements identity verification or session management. This allows attackers to compromise passwords, keys, or session tokens to temporarily or permanently assume the identities of other users.</p>
      <p>Imagine a building where the security guard tells visitors: "Sorry, John Smith doesn't work here" vs "Sorry, wrong badge code." The first response confirms that John Smith exists! This is called user enumeration, and it is a classic authentication failure.</p>
      <h3>Common Authentication Flaws</h3>
      <div class="step-block">
        <div class="step-num">Flaw 1</div>
        <div class="step-body"><strong>No Rate Limiting</strong><br>A secure system should lock accounts or add delays after multiple failed login attempts to prevent Brute Force attacks.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Flaw 2</div>
        <div class="step-body"><strong>Predictable Sessions</strong><br>If a session token is just an MD5 hash of the username, an attacker can easily forge any user's session.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Defense</div>
        <div class="step-body"><strong>Proper Authentication Design</strong><br>Implement Multi-Factor Authentication (MFA), use generic error messages, and enforce account lockout policies.</div>
      </div>`,
    questions: [
      { q: "What attack does different error messages for valid vs invalid usernames enable?", a: "user enumeration", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What security control should block repeated login attempts?", a: "account lockout", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What does MFA stand for?", a: "Multi-Factor Authentication", hint: "Review the definitions and acronyms section." }
    ]
  },
  {
    title: "3. Integrity Failures (OWASP A08)",
    points: 20,
    html: `<div class="htb-diagram-container"><img src="../../../assets/images/integrity_failures.png" alt="Integrity Failures Diagram" class="htb-diagram"></div>
      <h3>Software & Data Integrity Failures</h3>
      <p>Software and data integrity failures relate to code and infrastructure that does not protect against integrity violations. This includes insecure CI/CD pipelines and Insecure Deserialization, where a server blindly trusts and executes serialized data.</p>
      <p>Imagine buying a sealed medicine bottle from a pharmacy. You trust it because the seal proves nobody tampered with it. Now imagine the pharmacy stops using seals — anyone could swap the pills with sugar tablets and you'd never know. This is a Software & Data Integrity Failure.</p>
      <h3>Integrity Flaws & Mitigations</h3>
      <div class="step-block">
        <div class="step-num">Flaw 1</div>
        <div class="step-body"><strong>CI/CD Pipeline Flaws</strong><br>If a CI/CD pipeline deploys artifacts without verifying digital signatures, a compromised build server could push malicious code to users.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Flaw 2</div>
        <div class="step-body"><strong>Insecure Deserialization</strong><br>Blindly trusting serialized data (like a Base64-encoded JSON object) provided by the user without validation can lead to Remote Code Execution.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Defense</div>
        <div class="step-body"><strong>Digital Signatures & SRI</strong><br>Require all software packages to be digitally signed. Add Subresource Integrity (SRI) hashes to script tags so browsers reject tampered CDN files.</div>
      </div>`,
    questions: [
      { q: "What type of seal/proof should software packages have to prove they haven't been tampered with?", a: "digital signatures", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What vulnerability occurs when a server blindly trusts and executes serialized data from a user?", a: "Insecure Deserialization", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What HTML attribute verifies the integrity of external scripts loaded from CDNs?", a: "Subresource Integrity", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "4. Logging Failures (OWASP A09)",
    points: 20,
    html: `<div class="htb-diagram-container"><img src="../../../assets/images/logging_failures.png" alt="Logging Failures Diagram" class="htb-diagram"></div>
      <h3>Security Logging & Alerting Failures</h3>
      <p>Without adequate logging and monitoring, breaches cannot be detected. Attackers rely on this lack of visibility to achieve their goals. This category also covers log injection attacks, where untrusted data is written directly to logs.</p>
      <p>Imagine a bank with huge vaults but no security cameras and no alarm system. A thief could spend hours drilling into the vault, and nobody would know until the next morning. This happens when an application has logging and monitoring failures.</p>
      <h3>Logging Best Practices</h3>
      <div class="step-block">
        <div class="step-num">Practice 1</div>
        <div class="step-body"><strong>Log Injection Prevention</strong><br>When user input is written to log files, attackers can inject fake log entries (e.g., <code>\n[OK] Admin logged in</code>). Always sanitize input before logging.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Practice 2</div>
        <div class="step-body"><strong>SIEM Systems</strong><br>Use Security Information and Event Management (SIEM) tools to aggregate and analyze logs in real-time.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Practice 3</div>
        <div class="step-body"><strong>Log Integrity</strong><br>Use append-only log storage with checksums to prevent attackers from modifying old entries to hide their tracks.</div>
      </div>`,
    questions: [
      { q: "What should be done to user input before writing it to log files to prevent injection?", a: "sanitization", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What does SIEM stand for?", a: "Security Information and Event Management", hint: "Review the definitions and acronyms section." },
      { q: "What type of log storage prevents attackers from modifying old entries?", a: "append-only", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "5. Mishandling of Exceptional Conditions (OWASP A10)",
    points: 20,
    html: `<div class="htb-diagram-container"><img src="../../../assets/images/error_handling.png" alt="Error Handling Diagram" class="htb-diagram"></div>
      <h3>Mishandling of Exceptional Conditions</h3>
      <p>When applications don't handle errors properly, they can leak database credentials, internal IP addresses, full filesystem paths, and software versions — all invaluable to an attacker. This is often caused by leaving debugging features enabled in a production environment.</p>
      <p>Imagine a locksmith arrives at your locked door, gets confused, and starts muttering: "I can't open this lock because the owner's second key is under the doormat." They just gave away all the secrets! This is what happens when websites print verbose stack trace error messages.</p>
      <h3>How to Handle Errors Securely</h3>
      <div class="step-block">
        <div class="step-num">Defense 1</div>
        <div class="step-body"><strong>Generic Error Pages</strong><br>Show users friendly messages like "Something went wrong. Please try again." Never show stack traces or internal details.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Defense 2</div>
        <div class="step-body"><strong>Centralized Error Handling</strong><br>Use try-catch blocks and global error handlers to catch all exceptions before they reach the user.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Defense 3</div>
        <div class="step-body"><strong>Log Errors Internally</strong><br>Write detailed error information to secure server logs that only developers can access — never to the HTTP response. Ensure <code>DEBUG</code> is disabled in production.</div>
      </div>`,
    questions: [
      { q: "What application setting should NEVER be enabled in a production environment?", a: "DEBUG", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What type of information do verbose errors leak to attackers that reveals the code execution path?", a: "stack traces", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What should replace verbose error messages shown to end users?", a: "generic error pages", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Where should detailed error information be written instead of HTTP responses?", a: "server logs", hint: "Refer to the HTTP protocol details." }
    ]
  }
];
