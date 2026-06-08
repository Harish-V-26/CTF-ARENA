const LESSONS = [
  {
    title: "1. Broken Access Control & Security Misconfiguration",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/owasp_lesson1_diagram.png" alt="1. Broken Access Control & Security Misconfiguration"></div>
      <h3>What is the OWASP Top 10?</h3>
      <p>The OWASP Top 10 is a standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications. Maintained by the Open Web Application Security Project (OWASP), the list is periodically updated to reflect the evolving threat landscape.</p>
      <p>Imagine you are building a giant, super-cool treehouse, and you want to make sure no bullies can ever climb up and steal your toys. You could try to guess how they might break in, but it would be much easier if you had a list of the top ten tricks bullies use, written by all the smartest treehouse builders in the world. That is exactly what the OWASP Top 10 is! When programmers build websites, they read this list so they know exactly what traps to watch out for.</p>
      <h3>Rule 1 & Rule 2</h3>
      <div class="step-block">
        <div class="step-num">Rule 1</div>
        <div class="step-body"><strong>Broken Access Control [A01]</strong><br>Access control enforces policy such that users cannot act outside of their intended permissions. Failures typically lead to unauthorized information disclosure, modification, or destruction of all data. Imagine swiping your classroom keycard on the principal's office door, and it opens! To fix this, programmers must build a strict digital bouncer that checks your permissions every single time you open a door.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Rule 2</div>
        <div class="step-body"><strong>Security Misconfiguration [A02]</strong><br>Security misconfiguration arises from insecure default settings, incomplete configurations, open cloud storage, misconfigured HTTP headers, and verbose error messages containing sensitive information. It's like buying a high-tech safe but leaving the factory password set to "12345" and leaving the door wide open.</div>
      </div>`,
    questions: [
      { q: "What is the name of the group of experts who write the list of top 10 security rules?", a: "OWASP", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What mistake lets you open doors you shouldn't have access to, like the principal's office?", a: "Broken Access Control", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is it called when you leave default passwords active or forget to lock a security setting?", a: "Security Misconfiguration", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What default password did the safe builders leave active in our analogy?", a: "12345", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the title of the OWASP Top 10 list we are learning?", a: "OWASP Top 10", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "2. Supply Chains, Cryptography & Injection",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/owasp_lesson2_diagram.png" alt="2. Supply Chains, Cryptography & Injection"></div>
      <h3>Vulnerable Components & Cryptography</h3>
      <p>Modern applications rely heavily on external dependencies. If a single imported package contains a vulnerability, the entire application inherits that risk. Additionally, applications frequently handle sensitive data (like PII or credit cards) which must be cryptographically protected both in transit (using TLS/HTTPS) and at rest (using strong encryption algorithms).</p>
      <p>Imagine a toy manufacturer building an electric toy car. They buy the wheels from one shop, the motor from another, and the software from a third. If the shop that makes the software gets hacked, your toy car becomes dangerous! This is the Software Supply Chain. Also, if you want to send a secret message to your friend, you wouldn't write it on a big piece of paper. You would write it in a secret code. In computer language, this code is called encryption. Failing to use it is a Cryptographic Failure.</p>
      <h3>Rule 3, 4, & 5</h3>
      <div class="step-block">
        <div class="step-num">Rule 3</div>
        <div class="step-body"><strong>Vulnerable and Outdated Components [A03]</strong><br>Using libraries, frameworks, or software modules with known vulnerabilities. Programmers must constantly audit their dependency trees.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Rule 4</div>
        <div class="step-body"><strong>Cryptographic Failures [A04]</strong><br>Failures related to cryptography (formerly Sensitive Data Exposure), which often lead to sensitive data exposure. Always use HTTPS and strong encryption algorithms.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Rule 5</div>
        <div class="step-body"><strong>Injection [A05]</strong><br>Injection flaws, such as SQL, NoSQL, OS, and LDAP injection, occur when untrusted data is sent to an interpreter as part of a command or query. Imagine a robot helper whose only job is to get food. If you write "apple, and also throw the TV out the window", and the robot obeys both, that's an Injection attack!</div>
      </div>`,
    questions: [
      { q: "What is it called when you build a website using broken or hacked parts from other suppliers?", a: "Software Supply Chain Failures", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the process of converting passwords or sensitive data into scrambled secret code called?", a: "encryption", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "If a robot helper executes a hidden command mixed in with normal data, what attack is this?", a: "Injection", hint: "Check the command reference blocks." },
      { q: "What protocol/code scrambles web traffic to prevent cryptographic failures?", a: "HTTPS", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What action must programmers perform on inputs to separate commands from plain text?", a: "sanitize", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "3. Bad Designs, Authentication & Integrity",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/owasp_lesson3_diagram.png" alt="3. Bad Designs, Authentication & Integrity"></div>
      <h3>Design Flaws & Integrity</h3>
      <p>Secure architecture requires threat modeling during the design phase. A perfectly coded application can still be vulnerable if its core design logic is flawed. Furthermore, applications must verify the integrity of all data (including software updates and CI/CD pipelines) to ensure it has not been tampered with maliciously.</p>
      <p>Sometimes a website is built with very strong locks on all the doors, but the architect accidentally designed the house without a roof! This is called Insecure Design. It means the problem isn't a typo in the code, but a mistake in how the system was planned from the very beginning. Also, imagine someone comes to your front door wearing a cheap plastic mask of your best friend's face. If you just let them in, you have failed at authentication!</p>
      <h3>Rule 6, 7, & 8</h3>
      <div class="step-block">
        <div class="step-num">Rule 6</div>
        <div class="step-body"><strong>Insecure Design [A06]</strong><br>Risks related to design flaws. Requires the use of threat modeling, secure design patterns, and reference architectures.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Rule 7</div>
        <div class="step-body"><strong>Identification and Authentication Failures [A07]</strong><br>When user identity, authentication, and session management are not implemented correctly. Defended by using MFA and strong password policies.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Rule 8</div>
        <div class="step-body"><strong>Software and Data Integrity Failures [A08]</strong><br>Code and infrastructure that does not protect against integrity violations. Includes software updates without cryptographic signatures and insecure CI/CD pipelines.</div>
      </div>`,
    questions: [
      { q: "What is the name for a system designed without a roof or lacking basic security rules from the start?", a: "Insecure Design", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What failure happens when a website accepts weak passwords like 'password123'?", a: "Authentication Failures", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the type of failure when a hacker swaps good software updates or cookie data with bad ones?", a: "Software or Data Integrity Failures", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What do developers use to prove software or cookie data hasn't been tampered with?", a: "digital signatures", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What does MFA stand for?", a: "Multi-Factor Authentication", hint: "Review the definitions and acronyms section." }
    ]
  },
  {
    title: "4. Logging & Alerting, and Exceptional Conditions",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/owasp_lesson4_diagram.png" alt="4. Logging & Alerting, and Exceptional Conditions"></div>
      <h3>Monitoring & Error Handling</h3>
      <p>Without adequate logging and monitoring, breaches cannot be detected. Attackers rely on this lack of visibility to achieve their goals without being detected. Additionally, how an application handles exceptional conditions (errors) can inadvertently leak sensitive internal infrastructure details to the attacker.</p>
      <p>Imagine a bank with huge vaults and thick metal doors, but they completely forgot to install any security cameras or alarms. A robber could sneak in at midnight, and nobody would know until the next morning! This is a Security Logging Failure. A "log" is a computer's diary. If a website doesn't keep a diary, hackers can spend months quietly exploring the system. Also, imagine a locksmith arrives at your locked door, gets confused, and starts muttering: "I can't open this lock because the owner's second key is under the doormat." They just gave away all the secrets! This is what happens when websites print verbose stack trace error messages.</p>
      <h3>Rule 9 & Rule 10</h3>
      <div class="step-block">
        <div class="step-num">Rule 9</div>
        <div class="step-body"><strong>Security Logging and Monitoring Failures [A09]</strong><br>Failing to log critical security events (logins, failures, high-value transactions) and failing to set up alerting systems allows attackers to maintain persistence.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Rule 10</div>
        <div class="step-body"><strong>Server-Side Request Forgery (SSRF) [A10]</strong><br>SSRF flaws occur whenever a web application is fetching a remote resource without validating the user-supplied URL. It allows an attacker to coerce the application to send a crafted request to an unexpected destination, even when protected by a firewall, VPN, or another type of network access control list (ACL).</div>
      </div>`,
    questions: [
      { q: "What failure is described as a bank operating without security cameras or alarms?", a: "Security Logging & Alerting Failures", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the computer's diary that records everything that happens called?", a: "a log", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What attack occurs when a web application fetches a remote resource without validating the user-supplied URL?", a: "Server-Side Request Forgery (SSRF)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What should a website display instead of verbose technical stack traces during an error?", a: "generic error pages", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Where should detailed error information be written instead of HTTP responses?", a: "server logs", hint: "Refer to the HTTP protocol details." }
    ]
  }
];
