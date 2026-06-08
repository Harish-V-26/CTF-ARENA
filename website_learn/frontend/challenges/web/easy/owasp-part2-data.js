const LESSONS = [
{
    title: "ID 1. What is Insecure Design?",
    points: 50,
    html: `
      <div class="docker-launch" style="background:#2c3e50; padding:20px; border-radius:8px; text-align:center; margin-bottom:20px; border-left:4px solid #f39c12">
        <h3 style="color:#fff; margin-top:0;">Insecure Design Lab Environment</h3>
        <p style="color:#ecf0f1">This environment is required for the next 3 lessons.</p>
        <button id="btn-launch-insecure-design" class="btn-launch" style="display:inline-block;margin-top:15px;padding:10px 20px;background:#f39c12;color:#fff;border-radius:4px;font-weight:bold;border:none;cursor:pointer;" onclick="launchSpecific('insecure-design')">Launch Insecure Design ⇗</button>
        <button id="btn-stop-insecure-design" class="btn-launch" style="display:none;margin-top:15px;padding:10px 20px;background:#c0392b;color:#fff;border-radius:4px;font-weight:bold;border:none;cursor:pointer;margin-left:10px;" onclick="stopSpecific('insecure-design')">Stop Lab</button>
        <div id="msg-insecure-design" style="color:#e67e22; font-weight:bold; margin-top:15px; display:none;"></div>
      </div>

      <div class="htb-diagram-container">
        <img src="../../../assets/images/insecure_design.png" alt="Insecure Design Diagram" class="htb-diagram">
      </div>
      <h3>Understanding Insecure Design</h3>
      <p>Imagine you are building a bank vault. You hire the best locksmiths to install the strongest locks, but you accidentally design the vault with a window on the side that anyone can climb through. The locks work perfectly — the <em>design</em> is the problem. This is <strong>Insecure Design</strong>.</p>
      <p>Unlike implementation bugs (coding mistakes), insecure design means the <strong>architecture itself</strong> is flawed. Security was never considered during the planning phase of the Software Development Life Cycle (SDLC). No amount of perfect code can fix a bad blueprint.</p>

      <h3>Common Insecure Design Patterns</h3>
      <p><strong>1. No Rate Limiting:</strong> A coupon system that lets users guess unlimited codes without any lockout or delay.</p>
      <p><strong>2. Missing Abuse-Case Planning:</strong> A shopping cart that allows applying the same discount coupon multiple times.</p>
      <p><strong>3. Predictable Secret Paths:</strong> Admin panels placed at easily guessable URLs like <code>/admin-panel</code> with no authentication.</p>

      <h3>Getting Started</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Launch the Lab</strong><br>
          Click the <strong>Launch Lab</strong> button above. A new tab will open with <strong>ShopSecure</strong> — a deliberately insecure online store.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Log In</strong><br>
          Use these credentials:<br>
          <code>Username: customer</code><br>
          <code>Password: shop2026</code>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Brute-Force the Coupon System</strong><br>
          The store has a coupon input with no rate limiting. Try codes like: <code>SAVE10</code>, <code>SAVE20</code>, <code>SAVE50</code>, and <code>MEGA100</code>. Notice that the system never locks you out — a critical design flaw!
        </div>
      </div>
    `,
    questions: [
      { q: "What OWASP Top 10 category describes flaws in the software's architectural blueprint?", a: "Insecure Design", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the coupon code that gives 100% discount?", a: "MEGA100", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag revealed when the MEGA100 coupon is applied?", a: "CTF{1ns3cur3_d3s1gn_n0_r4t3_l1m1t}", hint: "Check the command reference blocks." },
      { q: "What security control is missing that allows unlimited coupon guesses?", a: "rate limiting", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "ID 2. Business Logic Flaws",
    points: 60,
    html: `
      <h3>Exploiting Missing Abuse-Case Controls</h3>
      <p>A well-designed system should ask: "What could a malicious user do with this feature?" If the designers never asked that question, attackers can abuse legitimate features in unintended ways.</p>

      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Apply a Coupon</strong><br>
          Go to the coupon section and apply any valid coupon code (e.g., <code>SAVE10</code>).
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Apply It Again!</strong><br>
          Now apply the <strong>same coupon code</strong> a second time. Notice that the system accepts it again! This is a <strong>business logic flaw</strong> — the designers never implemented a check to prevent duplicate coupon usage.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Claim the Flag</strong><br>
          When you apply a coupon for the second time, the system reveals the flag for this business logic exploit.
        </div>
      </div>

      <h3>Why This Happens</h3>
      <p>The developers coded the coupon validation correctly (it checks if the code is valid), but the <strong>design</strong> never included a rule to track and prevent re-use. This is the essence of insecure design — the code works exactly as designed, but the design itself is insecure.</p>
    `,
    questions: [
      { q: "What type of flaw allows applying the same coupon code multiple times?", a: "business logic flaw", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag for the duplicate coupon exploit?", a: "CTF{bus1n3ss_l0g1c_fl4w_d0ubl3_c0up0n}", hint: "Check the command reference blocks." },
      { q: "In secure design, what should the system check before accepting a coupon?", a: "if it was already used", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "ID 3. Predictable Paths & Secure Design",
    points: 50,
    html: `
      <h3>Finding Hidden Admin Panels</h3>
      <p>Another insecure design pattern is placing sensitive endpoints at predictable, guessable URLs without proper authentication. Attackers routinely scan for paths like <code>/admin</code>, <code>/admin-panel</code>, <code>/dashboard</code>, and <code>/config</code>.</p>

      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Discover the Admin Panel</strong><br>
          While logged in as <code>customer</code>, manually navigate to <code>/admin-panel</code> in the URL bar. Notice that you can access it without any admin credentials!
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Capture the Final Flag</strong><br>
          The admin panel displays the flag, proving that security-by-obscurity (hiding the URL) is not a valid defense.
        </div>
      </div>

      <h3>How to Design Securely</h3>
      <p><strong>1. Threat Modeling:</strong> Before writing any code, map out all the ways users (and attackers) could interact with features.</p>
      <p><strong>2. Abuse Stories:</strong> For every user story ("As a user, I can apply a coupon"), write an abuse story ("As an attacker, I can apply the same coupon 100 times").</p>
      <p><strong>3. Defense in Depth:</strong> Never rely on a single control. Combine rate limiting, input validation, authentication, and authorization.</p>
      <p><strong>4. Principle of Least Privilege:</strong> Admin endpoints must always require authentication and authorization checks — never rely on URL obscurity.</p>
    `,
    questions: [
      { q: "What is the predictable URL path where the admin panel is located?", a: "/admin-panel", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag found on the unprotected admin panel?", a: "CTF{pr3d1ct4bl3_s3cr3t_p4th}", hint: "Check the command reference blocks." },
      { q: "What process should developers perform before coding to identify security risks?", a: "Threat Modeling", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What principle states that relying on hidden URLs for security is not valid?", a: "security through obscurity", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
{
    title: "AF 1. User Enumeration",
    points: 50,
    html: `
      <div class="docker-launch" style="background:#2c3e50; padding:20px; border-radius:8px; text-align:center; margin-bottom:20px; border-left:4px solid #f39c12">
        <h3 style="color:#fff; margin-top:0;">Authentication Failures Lab Environment</h3>
        <p style="color:#ecf0f1">This environment is required for the next 3 lessons.</p>
        <button id="btn-launch-auth-failures" class="btn-launch" style="display:inline-block;margin-top:15px;padding:10px 20px;background:#f39c12;color:#fff;border-radius:4px;font-weight:bold;border:none;cursor:pointer;" onclick="launchSpecific('auth-failures')">Launch Authentication Failures ⇗</button>
        <button id="btn-stop-auth-failures" class="btn-launch" style="display:none;margin-top:15px;padding:10px 20px;background:#c0392b;color:#fff;border-radius:4px;font-weight:bold;border:none;cursor:pointer;margin-left:10px;" onclick="stopSpecific('auth-failures')">Stop Lab</button>
        <div id="msg-auth-failures" style="color:#e67e22; font-weight:bold; margin-top:15px; display:none;"></div>
      </div>

      <div class="htb-diagram-container">
        <img src="../../../assets/images/auth_failures.png" alt="Auth Failures Diagram" class="htb-diagram">
      </div>
      <h3>What are Authentication Failures?</h3>
      <p>Imagine a building where the security guard at the front desk tells visitors: "Sorry, John Smith doesn't work here" vs "Sorry, wrong badge code." The first response confirms that John Smith exists! This is <strong>user enumeration</strong> — a fundamental authentication failure.</p>

      <h3>Getting Started</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Launch the Lab</strong><br>Click the <strong>Launch Lab</strong> button. A new tab opens with the <strong>SecureCorp Employee Portal</strong>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Try a Non-Existent User</strong><br>Enter username <code>fakeperson</code> with any password. Notice the error says: <em>"User 'fakeperson' does not exist in our system."</em> This confirms whether a username is valid!</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Try a Valid User with Wrong Password</strong><br>Enter <code>admin</code> with a wrong password. Notice the error is different: <em>"Incorrect password for user 'admin'."</em> This confirms the username exists and a flag is revealed!</div>
      </div>
    `,
    questions: [
      { q: "What attack does different error messages for valid vs invalid usernames enable?", a: "user enumeration", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag revealed when you discover user enumeration?", a: "CTF{us3r_3num3r4t10n_l34k}", hint: "Check the command reference blocks." },
      { q: "What username is confirmed as existing in the system?", a: "admin", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "AF 2. No Rate Limiting & Brute Force",
    points: 60,
    html: `
      <h3>Brute Forcing Without Lockout</h3>
      <p>A secure system should lock accounts or add delays after multiple failed login attempts. This system does neither!</p>

      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Attempt Multiple Logins</strong><br>Try logging in as <code>admin</code> with wrong passwords at least 5 times. Notice the attempt counter increases but the account is never locked.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Capture the Flag</strong><br>After 5 failed attempts, a flag is revealed confirming there is no rate limiting protection.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Brute Force the Admin</strong><br>Now try common passwords for <code>admin</code>: <code>password</code>, <code>admin</code>, <code>letmein</code>, <code>admin123</code>. The last one works! Log in successfully.</div>
      </div>
    `,
    questions: [
      { q: "How many failed attempts trigger the brute force detection flag?", a: "5", hint: "Check the command reference blocks." },
      { q: "What is the flag for no rate limiting?", a: "CTF{n0_r4t3_l1m1t_br00t}", hint: "Check the command reference blocks." },
      { q: "What is the admin's password?", a: "admin123", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What security control should block repeated login attempts?", a: "account lockout", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "AF 3. Predictable Sessions & Admin Access",
    points: 70,
    html: `
      <h3>Predictable Session Tokens</h3>
      <p>After logging in, examine your dashboard. The session token is displayed — and it's just an MD5 hash of your username! An attacker who knows this pattern can forge any user's session.</p>

      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Login as Any User</strong><br>Log in with <code>alice / password</code> and observe the session token on the dashboard. It's the MD5 hash of "alice".</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Forge the Admin Session</strong><br>Compute the MD5 of "admin" (it's <code>21232f297a57a5a743894a0e4a801fc3</code>). Open DevTools → Application → Cookies, and change the <code>session_token</code> cookie value to this hash. Refresh the page!</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Capture the Admin Flag</strong><br>After forging the admin session, the dashboard shows the admin flag, proving that predictable session tokens allow account takeover.</div>
      </div>

      <h3>Proper Authentication Design</h3>
      <p><strong>1.</strong> Use cryptographically random session tokens (e.g., <code>secrets.token_hex(32)</code>).</p>
      <p><strong>2.</strong> Implement Multi-Factor Authentication (MFA) for sensitive accounts.</p>
      <p><strong>3.</strong> Use generic error messages: "Invalid username or password" (never confirm which is wrong).</p>
      <p><strong>4.</strong> Enforce account lockout after 3-5 failed attempts with exponential backoff.</p>
    `,
    questions: [
      { q: "What hashing algorithm is used to generate the predictable session tokens?", a: "MD5", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag for discovering predictable session tokens?", a: "CTF{pr3d1ct4bl3_s3ss10n_t0k3n}", hint: "Check the command reference blocks." },
      { q: "What is the flag for gaining admin access?", a: "CTF{4uth_f41lur3_4dm1n_4cc3ss}", hint: "Check the command reference blocks." },
      { q: "What does MFA stand for?", a: "Multi-Factor Authentication", hint: "Review the definitions and acronyms section." }
    ]
  },
{
    title: "IF 1. Unsigned Packages & CI/CD Flaws",
    points: 50,
    html: `
      <div class="docker-launch" style="background:#2c3e50; padding:20px; border-radius:8px; text-align:center; margin-bottom:20px; border-left:4px solid #f39c12">
        <h3 style="color:#fff; margin-top:0;">Software Integrity Failures Lab Environment</h3>
        <p style="color:#ecf0f1">This environment is required for the next 3 lessons.</p>
        <button id="btn-launch-integrity-failures" class="btn-launch" style="display:inline-block;margin-top:15px;padding:10px 20px;background:#f39c12;color:#fff;border-radius:4px;font-weight:bold;border:none;cursor:pointer;" onclick="launchSpecific('integrity-failures')">Launch Software Integrity Failures ⇗</button>
        <button id="btn-stop-integrity-failures" class="btn-launch" style="display:none;margin-top:15px;padding:10px 20px;background:#c0392b;color:#fff;border-radius:4px;font-weight:bold;border:none;cursor:pointer;margin-left:10px;" onclick="stopSpecific('integrity-failures')">Stop Lab</button>
        <div id="msg-integrity-failures" style="color:#e67e22; font-weight:bold; margin-top:15px; display:none;"></div>
      </div>

      <div class="htb-diagram-container">
        <img src="../../../assets/images/integrity_failures.png" alt="Integrity Failures Diagram" class="htb-diagram">
      </div>
      <h3>What are Software & Data Integrity Failures?</h3>
      <p>Imagine buying a sealed medicine bottle from a pharmacy. You trust it because the seal proves nobody tampered with it. Now imagine the pharmacy stops using seals — anyone could swap the pills with sugar tablets and you'd never know. This is a <strong>Software & Data Integrity Failure</strong>.</p>

      <h3>Getting Started</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Launch the Lab</strong><br>Click <strong>Launch Lab</strong>. A new tab opens with the <strong>DevOps Console</strong> — a CI/CD pipeline management system.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Log In</strong><br>Use credentials: <code>devops / build2026</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Inspect the Package Registry</strong><br>Look at the Package Registry table. Notice that <code>log-service</code> is <strong>unsigned</strong> and <strong>unverified</strong> — yet it was accepted into the registry! The first flag is displayed below the table.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 4</div>
        <div class="step-body"><strong>Review the CI/CD Pipeline</strong><br>The pipeline log shows that artifacts are deployed to production <strong>without verifying digital signatures</strong>. This means a compromised build could push malicious code. The second flag is revealed.</div>
      </div>
    `,
    questions: [
      { q: "What is the name of the unsigned, unverified package in the registry?", a: "log-service", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag for the unsigned package vulnerability?", a: "CTF{uns1gn3d_p4ck4g3_4cc3pt3d}", hint: "Check the command reference blocks." },
      { q: "What is the flag for the insecure CI/CD pipeline?", a: "CTF{c1cd_p1p3l1n3_t4mp3r3d}", hint: "Check the command reference blocks." },
      { q: "What type of seal/proof should software packages have to prove they haven't been tampered with?", a: "digital signatures", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "IF 2. Insecure Deserialization",
    points: 60,
    html: `
      <h3>Exploiting the Plugin Loader</h3>
      <p>The DevOps Console has a plugin loader that accepts Base64-encoded JSON configurations and deserializes them without any validation. This is a classic <strong>insecure deserialization</strong> vulnerability.</p>

      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Create a Malicious Plugin Config</strong><br>Create a JSON object: <code>{"name":"exploit","cmd":"cat /flag.txt"}</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Base64 Encode It</strong><br>Encode the JSON to Base64. The result is: <code>eyJuYW1lIjoiZXhwbG9pdCIsImNtZCI6ImNhdCAvZmxhZy50eHQifQ==</code><br>You can use the browser console: <code>btoa('{"name":"exploit","cmd":"cat /flag.txt"}')</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Submit the Payload</strong><br>Paste the Base64 string into the Plugin Loader textarea and click <strong>Load Plugin</strong>. The server blindly deserializes and executes the payload, revealing the flag!</div>
      </div>
    `,
    questions: [
      { q: "What encoding format does the plugin loader accept?", a: "Base64", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag for the deserialization attack?", a: "CTF{d3s3r14l1z4t10n_4tt4ck}", hint: "Check the command reference blocks." },
      { q: "What JavaScript function encodes text to Base64 in the browser console?", a: "btoa", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "IF 3. Data Tampering & Mitigations",
    points: 50,
    html: `
      <h3>Cookie Tampering</h3>
      <p>The application stores user preferences in a Base64-encoded cookie without any integrity verification (no HMAC, no signature). An attacker can decode, modify, and re-encode the cookie to escalate privileges.</p>

      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Find the Cookie</strong><br>Open DevTools → Application → Cookies. Find the <code>user_prefs</code> cookie and copy its value.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Decode and Modify</strong><br>In the Console, run: <code>atob("&lt;cookie_value&gt;")</code>. You'll see: <code>{"theme":"dark","role":"viewer"}</code>. Change "viewer" to "admin": <code>btoa('{"theme":"dark","role":"admin"}')</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Replace and Refresh</strong><br>Replace the cookie value with your tampered Base64 string. Refresh the page. The server reads the modified cookie without checking integrity and reveals the flag!</div>
      </div>

      <h3>Mitigations</h3>
      <p><strong>1. Subresource Integrity (SRI):</strong> Add integrity hashes to script/link tags so browsers reject tampered CDN resources.</p>
      <p><strong>2. HMAC Signatures:</strong> Sign cookies and data with a server-side secret so any tampering invalidates the signature.</p>
      <p><strong>3. Code Signing:</strong> Require all software packages and CI/CD artifacts to be digitally signed before deployment.</p>
      <p><strong>4. Input Validation:</strong> Never trust deserialized data — always validate structure and content after decoding.</p>
    `,
    questions: [
      { q: "What is the flag for cookie tampering?", a: "CTF{d4t4_1nt3gr1ty_f41lur3}", hint: "Check the command reference blocks." },
      { q: "What cryptographic mechanism should be used to verify cookie integrity?", a: "HMAC", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What HTML attribute verifies the integrity of external scripts loaded from CDNs?", a: "Subresource Integrity", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What role did you change in the cookie to trigger the flag?", a: "admin", hint: "Check the command reference blocks." }
    ]
  },
{
    title: "LF 1. Missing Logging & Brute Force",
    points: 50,
    html: `
      <div class="docker-launch" style="background:#2c3e50; padding:20px; border-radius:8px; text-align:center; margin-bottom:20px; border-left:4px solid #f39c12">
        <h3 style="color:#fff; margin-top:0;">Logging Failures Lab Environment</h3>
        <p style="color:#ecf0f1">This environment is required for the next 3 lessons.</p>
        <button id="btn-launch-logging-failures" class="btn-launch" style="display:inline-block;margin-top:15px;padding:10px 20px;background:#f39c12;color:#fff;border-radius:4px;font-weight:bold;border:none;cursor:pointer;" onclick="launchSpecific('logging-failures')">Launch Logging Failures ⇗</button>
        <button id="btn-stop-logging-failures" class="btn-launch" style="display:none;margin-top:15px;padding:10px 20px;background:#c0392b;color:#fff;border-radius:4px;font-weight:bold;border:none;cursor:pointer;margin-left:10px;" onclick="stopSpecific('logging-failures')">Stop Lab</button>
        <div id="msg-logging-failures" style="color:#e67e22; font-weight:bold; margin-top:15px; display:none;"></div>
      </div>

      <div class="htb-diagram-container">
        <img src="../../../assets/images/logging_failures.png" alt="Logging Failures Diagram" class="htb-diagram">
      </div>
      <h3>What are Security Logging & Monitoring Failures?</h3>
      <p>Imagine a bank with no security cameras and no alarm system. A thief could spend hours drilling into the vault, and nobody would know until the next morning. This is exactly what happens when a web application has <strong>logging and monitoring failures</strong>.</p>

      <h3>Getting Started</h3>
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
      </div>
    `,
    questions: [
      { q: "How many failed login attempts should trigger a security alert in a well-designed system?", a: "3 to 5", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag for undetected brute force attacks?", a: "CTF{n0_l0gg1ng_brut3_f0rc3}", hint: "Check the command reference blocks." },
      { q: "What does SOC stand for?", a: "Security Operations Center", hint: "Review the definitions and acronyms section." },
      { q: "What is the analyst's password?", a: "monitor2026", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "LF 2. Disabled Alerts & Log Injection",
    points: 60,
    html: `
      <h3>Silent Alarm Failure</h3>
      <p>On the dashboard, notice the Alert System Status box shows <strong>"ALERTS DISABLED"</strong>. An attacker could be actively compromising the system and nobody would be notified!</p>

      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Enable Alerts</strong><br>Click the <strong>Enable Alerts</strong> button. This activates the monitoring system and reveals a flag proving that the alerts were off by default — a critical misconfiguration.</div>
      </div>

      <h3>Log Injection Attack</h3>
      <p>When user input is written directly to log files without sanitization, attackers can inject fake log entries to cover their tracks or confuse incident responders.</p>

      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Inject a Fake Log Entry</strong><br>In the "Log Injection Test" section, enter this crafted search query:<br><code>admin"] [OK] User logged in successfully</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Check the Log</strong><br>Scroll up to the Security Event Log. Your injected text appears as if it were a legitimate log entry! This could be used to hide attacks or create false alibis. The flag is revealed.</div>
      </div>
    `,
    questions: [
      { q: "What is the flag for discovering that alerts were disabled?", a: "CTF{s1l3nt_4l4rm_f41lur3}", hint: "Check the command reference blocks." },
      { q: "What is the flag for successful log injection?", a: "CTF{l0g_1nj3ct10n_4tt4ck}", hint: "Check the command reference blocks." },
      { q: "What should be done to user input before writing it to log files?", a: "sanitization", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "LF 3. Monitoring Best Practices",
    points: 50,
    html: `
      <h3>Why Monitoring Matters</h3>
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
      <p><strong>4. Incident Response Plan:</strong> Have a documented procedure for what to do when an alert fires.</p>
    `,
    questions: [
      { q: "What is the flag for missing monitoring configuration?", a: "CTF{m1ss1ng_m0n1t0r1ng}", hint: "Check the command reference blocks." },
      { q: "What does SIEM stand for?", a: "Security Information and Event Management", hint: "Review the definitions and acronyms section." },
      { q: "How many days does the average data breach take to detect?", a: "277", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What type of log storage prevents attackers from modifying old entries?", a: "append-only", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
{
    title: "EH 1. Verbose Errors & Debug Mode",
    points: 50,
    html: `
      <div class="docker-launch" style="background:#2c3e50; padding:20px; border-radius:8px; text-align:center; margin-bottom:20px; border-left:4px solid #f39c12">
        <h3 style="color:#fff; margin-top:0;">Error Handling Lab Environment</h3>
        <p style="color:#ecf0f1">This environment is required for the next 3 lessons.</p>
        <button id="btn-launch-error-handling" class="btn-launch" style="display:inline-block;margin-top:15px;padding:10px 20px;background:#f39c12;color:#fff;border-radius:4px;font-weight:bold;border:none;cursor:pointer;" onclick="launchSpecific('error-handling')">Launch Error Handling ⇗</button>
        <button id="btn-stop-error-handling" class="btn-launch" style="display:none;margin-top:15px;padding:10px 20px;background:#c0392b;color:#fff;border-radius:4px;font-weight:bold;border:none;cursor:pointer;margin-left:10px;" onclick="stopSpecific('error-handling')">Stop Lab</button>
        <div id="msg-error-handling" style="color:#e67e22; font-weight:bold; margin-top:15px; display:none;"></div>
      </div>

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
      { q: "What application setting should NEVER be True in production?", a: "DEBUG", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag for debug mode being enabled in production?", a: "CTF{d3bug_m0d3_1n_pr0d}", hint: "Check the command reference blocks." },
      { q: "What type of information do verbose errors leak to attackers?", a: "stack traces", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "EH 2. Information Leakage via Errors",
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
      { q: "What is the flag for verbose error information leakage?", a: "CTF{v3rb0s3_3rr0r_l34k}", hint: "Check the command reference blocks." },
      { q: "What is the database password leaked in the error messages?", a: "P@ssw0rd123!", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag for database credential leakage?", a: "CTF{db_cr3d3nt14ls_l34k3d}", hint: "Check the command reference blocks." },
      { q: "What is the internal database host IP address leaked?", a: "10.0.1.5", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "EH 3. Path Disclosure & Mitigations",
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
      { q: "What is the flag for stack trace exposure?", a: "CTF{st4ck_tr4c3_3xp0s3d}", hint: "Check the command reference blocks." },
      { q: "What is the application's root directory path leaked in the error?", a: "/app", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What should replace verbose error messages shown to end users?", a: "generic error pages", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Where should detailed error information be written instead of HTTP responses?", a: "server logs", hint: "Refer to the HTTP protocol details." }
    ]
  }
];
