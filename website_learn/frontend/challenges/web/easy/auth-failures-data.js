const LESSONS = [
  {
    title: "1. User Enumeration",
    points: 50,
    html: `
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
      { q: "What attack does different error messages for valid vs invalid usernames enable?", a: "user enumeration" },
      { q: "What is the flag revealed when you discover user enumeration?", a: "CTF{us3r_3num3r4t10n_l34k}" },
      { q: "What username is confirmed as existing in the system?", a: "admin" }
    ]
  },
  {
    title: "2. No Rate Limiting & Brute Force",
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
      { q: "How many failed attempts trigger the brute force detection flag?", a: "5" },
      { q: "What is the flag for no rate limiting?", a: "CTF{n0_r4t3_l1m1t_br00t}" },
      { q: "What is the admin's password?", a: "admin123" },
      { q: "What security control should block repeated login attempts?", a: "account lockout" }
    ]
  },
  {
    title: "3. Predictable Sessions & Admin Access",
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
      { q: "What hashing algorithm is used to generate the predictable session tokens?", a: "MD5" },
      { q: "What is the flag for discovering predictable session tokens?", a: "CTF{pr3d1ct4bl3_s3ss10n_t0k3n}" },
      { q: "What is the flag for gaining admin access?", a: "CTF{4uth_f41lur3_4dm1n_4cc3ss}" },
      { q: "What does MFA stand for?", a: "Multi-Factor Authentication" }
    ]
  }
];
