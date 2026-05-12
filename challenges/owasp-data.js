const LESSONS = [
  {
    title: "OWASP Top 10 (2021) — A01 to A05",
    points: 10,
    content: `The OWASP (Open Web Application Security Project) Top 10 is the industry-standard awareness document for web application security. Updated every 3-4 years, it represents the most critical security risks.

A01: BROKEN ACCESS CONTROL (Most Common)
Users accessing resources or performing actions they shouldn't.

Examples:
  - Changing ?userId=123 to ?userId=124 to access another user's data (IDOR)
  - Accessing admin pages at /admin without admin privileges
  - Viewing private files by changing a URL parameter

Prevention: Enforce access control server-side on every request. Deny by default.

A02: CRYPTOGRAPHIC FAILURES
Failures related to encryption that expose sensitive data.

Examples:
  - Transmitting credit card numbers over HTTP (not HTTPS)
  - Using MD5 or SHA1 to hash passwords (crackable in seconds)
  - Hardcoding passwords/API keys in source code
  - Using weak ECB mode encryption (patterns leak)

Prevention: Use TLS 1.3, AES-256, bcrypt for passwords. Never store unnecessary data.

A03: INJECTION
Untrusted data sent to an interpreter as part of a command or query.

Types: SQL Injection, OS Command Injection, LDAP Injection, XPath Injection
Prevention: Parameterized queries, input validation, least privilege.

A04: INSECURE DESIGN
Architecture-level flaws where security wasn't designed in from the start.

Examples:
  - No rate limiting on password reset (allows brute forcing reset codes)
  - Business logic flaws (buy 10 items but pay for 1)

Prevention: Threat modeling during design phase. Security design patterns.

A05: SECURITY MISCONFIGURATION
Using insecure default configurations that leave systems exposed.

Examples:
  - Default admin passwords (admin/admin)
  - Debug mode enabled in production (shows stack traces)
  - Open cloud storage buckets (S3, Azure Blob)
  - Missing security headers (HSTS, CSP, X-Frame-Options)`,
    questions: [
      { q: "What does OWASP stand for?", a: "Open Web Application Security Project" },
      { q: "What A01 vulnerability allows accessing another user's data by changing an ID in the URL?", a: "Broken Access Control (specifically IDOR — Insecure Direct Object Reference)" },
      { q: "What A03 category covers SQL, NoSQL, OS Command, and LDAP injection attacks?", a: "A03: Injection" },
      { q: "What A02 failure involves transmitting sensitive data over HTTP instead of HTTPS?", a: "Cryptographic Failures" },
      { q: "What A05 example leaves debug mode enabled in production, showing full stack traces?", a: "Security Misconfiguration" }
    ]
  },
  {
    title: "OWASP Top 10 (2021) — A06 to A10",
    points: 10,
    content: `The second half of the OWASP Top 10 (2021), covering vulnerable components, authentication failures, integrity, logging, and SSRF.

A06: VULNERABLE AND OUTDATED COMPONENTS
Using software components with known vulnerabilities.

Examples:
  - Running jQuery 1.x with known XSS vulnerabilities
  - Old OpenSSL with Heartbleed bug (CVE-2014-0160)
  Famous: Equifax breach (2017) — Apache Struts with unpatched RCE.
  143 million records stolen. Unpatched for months.

Prevention: Software Composition Analysis (SCA), dependency scanning, regular patching.

A07: IDENTIFICATION AND AUTHENTICATION FAILURES
Weaknesses in authentication mechanisms.

Examples: Weak passwords, no MFA, session fixation, predictable session tokens
Prevention: Strong passwords, MFA, secure session management, bcrypt.

A08: SOFTWARE AND DATA INTEGRITY FAILURES
Assuming software and data hasn't been tampered with.

Examples:
  - Unsigned software updates (attacker pushes malicious updates)
  - Insecure CI/CD pipelines (attacker injects malicious code into build)
  - Deserializing untrusted data (Java deserialization RCE)
  Famous: SolarWinds supply chain attack (2020)

A09: SECURITY LOGGING AND MONITORING FAILURES
Not logging, monitoring, or alerting on security-relevant events.

Examples:
  - Login failures not logged
  - No alerting when admin accounts accessed at 3am
  Average breach detection time without monitoring: 287 days.

A10: SERVER-SIDE REQUEST FORGERY (SSRF)
Server makes HTTP requests to internal resources based on user-controlled input.

Attack: http://site.com/fetch?url=http://169.254.169.254/latest/meta-data/
Reads AWS instance metadata containing temporary cloud credentials!`,
    questions: [
      { q: "What famous 2017 breach exploited an unpatched Apache Struts library vulnerability?", a: "Equifax breach" },
      { q: "What A10 vulnerability allows attacking internal cloud metadata services via server-side requests?", a: "Server-Side Request Forgery (SSRF)" },
      { q: "What A08 attack compromised the SolarWinds software update process in 2020?", a: "Supply chain attack" },
      { q: "What does SRI (Subresource Integrity) prevent in A08 failures?", a: "Tampered CDN scripts executing in the browser" },
      { q: "According to research, what is the average time to detect a breach without proper security logging?", a: "287 days" }
    ]
  },
  {
    title: "OWASP: Testing Tools & SDLC Integration",
    points: 10,
    content: `Understanding OWASP in practice — how to test for these vulnerabilities and integrate security into your development lifecycle.

OWASP TESTING TOOLS:

1. OWASP ZAP (Zed Attack Proxy):
   Free, open-source web application security scanner.
   - Active scan: automatically tests for SQLi, XSS, misconfigurations
   - Passive scan: analyzes traffic for security issues
   - API scanning: test REST APIs with OpenAPI/Swagger specs

2. Burp Suite:
   Industry-standard web security testing platform.
   - Spider: crawl and map the application
   - Scanner (Pro): automated vulnerability scanning
   - Repeater: manual request modification and testing

3. Additional Tools:
   sqlmap → SQL injection testing (A03)
   Nikto  → Web server misconfiguration scanner (A05)
   OWASP Dependency-Check → Vulnerable library detection (A06)
   jwt_tool → JWT vulnerability testing (A07)

SDLC SECURITY INTEGRATION:

Phase 1 — Requirements:
  Threat modeling (STRIDE, PASTA frameworks)

Phase 2 — Design:
  Security design review + data flow diagrams

Phase 3 — Development:
  SAST (Static Application Security Testing): SonarQube, Semgrep, Bandit

Phase 4 — Testing:
  DAST (Dynamic Application Security Testing): OWASP ZAP, Burp Suite
  Penetration testing before major releases

Phase 5 — Deployment:
  Security headers, secrets management (HashiCorp Vault, AWS Secrets Manager)

Phase 6 — Monitoring:
  SIEM, automated alerting on anomalous behavior, regular vulnerability scanning

OWASP ADDITIONAL RESOURCES:
  - OWASP Testing Guide: comprehensive manual testing methodology
  - OWASP ASVS: Application Security Verification Standard (checklist)
  - OWASP Cheat Sheet Series: developer-friendly quick references`,
    questions: [
      { q: "What free, open-source tool does OWASP provide for automated web application security scanning?", a: "OWASP ZAP (Zed Attack Proxy)" },
      { q: "What type of testing (SAST or DAST) analyzes code without running the application?", a: "SAST (Static Application Security Testing)" },
      { q: "What OWASP document provides a comprehensive checklist for application security verification?", a: "ASVS (Application Security Verification Standard)" },
      { q: "What security tool automates SQL injection testing, directly addressing OWASP A03?", a: "sqlmap" },
      { q: "What secrets management tool should replace hardcoded credentials in source code?", a: "HashiCorp Vault (or AWS Secrets Manager)" }
    ]
  },
  {
    title: "Broken Access Control & IDOR Deep Dive",
    points: 10,
    content: `Broken Access Control (A01) is the most common OWASP vulnerability. It occurs when users can act outside their intended permissions.

TYPES OF ACCESS CONTROL FAILURES:

1. IDOR (Insecure Direct Object Reference):
   Using user-supplied IDs directly to access objects without authorization.
   Examples:
     GET /api/users/1234/invoices  → change 1234 to 1235 (another user's invoices)
     GET /download?file=report_user1.pdf → change to report_user2.pdf
     DELETE /api/orders/567 → delete another user's order

2. FORCED BROWSING (Missing Function-Level Access Control):
   Accessing admin pages directly by guessing URLs:
     http://site.com/admin/
     http://site.com/admin/deleteUser?id=1
     http://site.com/api/v1/admin/users
   If the backend doesn't check authorization, access is granted.

3. HORIZONTAL vs. VERTICAL PRIVILEGE ESCALATION:
   Horizontal: Access another user's data at the SAME privilege level
   Vertical:   Access functionality requiring HIGHER privilege level

4. JWT CLAIM MANIPULATION:
   If the server trusts the "role" claim in the JWT payload:
   Decode JWT → change role from "user" to "admin" → re-encode
   (If signature isn't properly validated)

5. HTTP METHOD CONFUSION:
   App protects POST but not PUT or PATCH:
     POST /admin/deleteUser → blocked
     DELETE /admin/deleteUser → allowed!
   Or: some frameworks treat HEAD same as GET.

TESTING TECHNIQUES:
  - Use Burp Suite "Autorize" extension to automatically test access control
  - Test every API endpoint with a different user's token
  - Check all numeric IDs (try sequential values ± 1, ± 100)
  - Try unauthenticated access to every endpoint
  - Test all HTTP methods on every endpoint`,
    questions: [
      { q: "What is IDOR (Insecure Direct Object Reference)?", a: "Using user-supplied IDs to directly access objects without authorization checks" },
      { q: "What type of privilege escalation allows accessing another user's data at the same privilege level?", a: "Horizontal privilege escalation" },
      { q: "What type of privilege escalation allows accessing functionality requiring higher privilege?", a: "Vertical privilege escalation" },
      { q: "What Burp Suite extension automatically tests access control by replaying requests with different user tokens?", a: "Autorize" },
      { q: "What HTTP method confusion vulnerability occurs when POST is protected but DELETE or PUT is not?", a: "HTTP method confusion (or missing method-level access control)" }
    ]
  },
  {
    title: "Cryptographic Failures & Secure Communications",
    points: 10,
    content: `Cryptographic Failures (A02) cover the misuse or absence of cryptography, leading to exposure of sensitive data.

TLS/HTTPS CONFIGURATION:

Weak TLS Versions (should be DISABLED):
  TLS 1.0 — deprecated 2020, has BEAST, POODLE vulnerabilities
  TLS 1.1 — deprecated 2020
  SSL 2.0/3.0 — severely broken (POODLE, DROWN attacks)

Correct TLS Configuration (Apache):
  SSLProtocol             all -SSLv3 -TLSv1 -TLSv1.1
  SSLCipherSuite          ECDHE-ECDSA-AES128-GCM-SHA256:...
  SSLHonorCipherOrder     off
  Header always set Strict-Transport-Security "max-age=63072000"

HSTS (HTTP Strict Transport Security):
  Tells browsers to only connect over HTTPS (never HTTP).
  Header: Strict-Transport-Security: max-age=31536000; includeSubDomains
  HSTS Preloading: browser vendors maintain a list of HSTS sites
  baked into the browser itself.

CERTIFICATE PINNING:
  Mobile apps hardcode the expected server certificate fingerprint.
  Even if an attacker installs a rogue CA, pinning rejects the cert.
  Used by banking apps, high-security APIs.

CRYPTOGRAPHIC ALGORITHM FAILURES:

Weak Algorithms (DO NOT USE):
  DES, 3DES     → Crackable (SWEET32 attack)
  RC4           → Broken (statistical biases)
  MD5, SHA1     → Collision attacks proven
  ECB mode      → Patterns leak (famous ECB penguin)

Strong Algorithms (USE THESE):
  AES-256-GCM   → Symmetric encryption (authenticated)
  ChaCha20      → Stream cipher (modern alternative)
  RSA-2048+     → Asymmetric (use RSA-4096 or ECC for new systems)
  SHA-256/384   → Hashing (not for passwords — use bcrypt)
  bcrypt/Argon2 → Password hashing specifically

COMMON MISTAKES:
  - Using Math.random() for cryptographic purposes
  - Reusing IV/nonce in AES-GCM (catastrophic!)
  - Storing private keys in source code repositories
  - Using ECB mode (visually reveals patterns in encrypted data)`,
    questions: [
      { q: "What TLS version was deprecated in 2020 and should be disabled due to BEAST and POODLE vulnerabilities?", a: "TLS 1.0 (and TLS 1.1)" },
      { q: "What HTTP security header forces browsers to only connect over HTTPS for a specified duration?", a: "Strict-Transport-Security (HSTS)" },
      { q: "What AES mode is considered insecure because it reveals patterns in encrypted data (famous ECB penguin)?", a: "ECB (Electronic Codebook) mode" },
      { q: "What is the correct algorithm choice for encrypting symmetric data with authentication in modern systems?", a: "AES-256-GCM" },
      { q: "What mobile security technique hardcodes the server's certificate fingerprint to prevent man-in-the-middle attacks?", a: "Certificate pinning" }
    ]
  },
  {
    title: "Supply Chain, Logging & SSRF",
    points: 10,
    content: `The final three areas of the OWASP Top 10 — supply chain attacks, logging failures, and SSRF — represent critical emerging threats.

SUPPLY CHAIN ATTACKS (A08: Software & Data Integrity Failures):

The SolarWinds Attack (2020):
  - Attackers compromised SolarWinds' build system
  - Inserted malicious code into Orion software updates
  - ~18,000 organizations installed the backdoored update
  - Victims: US Treasury, Pentagon, FireEye, Microsoft
  - SUNBURST backdoor gave attackers months of undetected access

npm / PyPI Dependency Confusion:
  - Attackers publish malicious packages with names matching private
    internal packages (dependency confusion)
  - Package managers may download the public (malicious) version
  - Alex Birsan (2021) earned $130,000 in bug bounties using this technique

Typosquatting:
  - npm package "lodash" (popular) vs "1odash" (malicious)
  - "requests" (Python) vs "request" (both exist — always verify)

Subresource Integrity (SRI) for CDN scripts:
  <script src="https://cdn.example.com/lib.js"
    integrity="sha256-abc123..."
    crossorigin="anonymous"></script>
  Browser verifies hash before executing. If CDN is compromised
  and script changes, the hash won't match — script is blocked.

SSRF IN DEPTH (A10):

Common SSRF Targets:
  Cloud metadata: http://169.254.169.254/ (AWS, GCP, Azure)
  Internal services: http://localhost:6379/ (Redis, no auth!)
  Internal APIs: http://10.0.0.1/admin/
  File system: file:///etc/passwd

SSRF Bypass Techniques:
  DNS rebinding: resolve attacker.com to internal IP after bypass check
  IP obfuscation: 0x7f000001 = 127.0.0.1 in hex
  IPv6: http://[::1]/ = localhost in IPv6
  URL redirects: attacker.com → 192.168.1.1 (via 302 redirect)

LOGGING FAILURES (A09) — CRITICAL EVENTS TO LOG:
  ✔ All authentication attempts (success and failure)
  ✔ Access control failures
  ✔ Input validation failures
  ✔ Privilege escalation attempts
  ✔ Sensitive data access
  ✔ Admin actions
  Never log: passwords, session tokens, credit card numbers, PII`,
    questions: [
      { q: "What 2020 supply chain attack compromised the SolarWinds Orion software update to backdoor 18,000 organizations?", a: "SUNBURST / SolarWinds supply chain attack" },
      { q: "What Subresource Integrity (SRI) attribute on a script tag prevents execution of tampered CDN files?", a: "integrity (with a hash value like sha256-...)" },
      { q: "What dependency confusion attack technique publishes a malicious package with the same name as a private internal package?", a: "Dependency confusion" },
      { q: "What IPv6 address represents localhost and can be used to bypass SSRF filters that block 127.0.0.1?", a: "::1 (or [::1])" },
      { q: "What critical data should NEVER be included in server-side logs to prevent sensitive data exposure?", a: "Passwords, session tokens, credit card numbers, or PII" }
    ]
  }
];
