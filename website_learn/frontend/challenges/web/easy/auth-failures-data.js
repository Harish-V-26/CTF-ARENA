const LESSONS = [
  {
    title: "1. User Enumeration",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/images/auth_failures.png" alt="User Enumeration"></div>
      <h3>User Enumeration</h3>
      <p>User enumeration is a vulnerability where an application's authentication mechanisms inadvertently reveal whether a specific username or email address exists in its backend database. This typically occurs when login pages return distinct error messages or exhibit differing response times for valid versus invalid accounts, allowing attackers to harvest a list of valid usernames.</p>
      <p>Imagine a building where the security guard at the front desk tells visitors: "Sorry, John Smith doesn't work here" versus "Sorry, John Smith works here, but that is the wrong badge code." By answering differently, the guard has accidentally given away a complete roster of who works in the building! By analyzing the exact error messages, hackers can build a complete list of valid employee names.</p>
      <h3>Practical Exploitation</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Launch the Lab</strong><br>Click the [Launch Lab] button to open the SecureCorp Employee Portal.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Try a Fake User</strong><br>Enter username <code>fakeperson</code> with any password. Notice the error says: <em>"User 'fakeperson' does not exist in our system."</em> This confirms the system leaks information.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Try a Valid User</strong><br>Enter <code>admin</code> with a wrong password. Notice the error is different: <em>"Incorrect password for user 'admin'."</em> This confirms the username exists and reveals a flag!</div>
      </div>`,
    questions: [
      { q: "What attack does different error messages for valid vs invalid usernames enable?", a: "user enumeration", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag revealed when you discover user enumeration?", a: "CTF{us3r_3num3r4t10n_l34k}", hint: "Check the command reference blocks." },
      { q: "What username is confirmed as existing in the system?", a: "admin", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "2. No Rate Limiting & Brute Force",
    points: 60,
    html: `<div class="htb-diagram-container"><img src="../../../assets/images/auth_failures_brute.png" alt="Brute Force"></div>
      <h3>Rate Limiting and Account Lockout</h3>
      <p>Rate limiting is a critical defensive control designed to prevent automated abuse by restricting the number of requests a user or IP address can make within a given timeframe. When authentication endpoints lack rate limiting or account lockout mechanisms, they become highly susceptible to brute-force and dictionary attacks, allowing attackers to guess passwords sequentially.</p>
      <p>Think of rate limiting like a bank ATM. If you type the wrong PIN three times, the ATM eats your card and refuses to let you try again. This prevents thieves from standing at the machine all day trying every possible number combination. If a website doesn't have an "account lockout" feature, a hacker's robot can stand at the digital front door and try millions of keys until the lock finally turns.</p>
      <h3>Practical Exploitation</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Attempt Logins</strong><br>Try logging in as <code>admin</code> with wrong passwords at least 5 times. Notice the attempt counter increases but the account is never locked.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Capture the Flag</strong><br>After 5 failed attempts, a flag is revealed confirming there is no rate limiting protection.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Brute Force the Admin</strong><br>Now try common passwords for <code>admin</code>: <code>password</code>, <code>admin</code>, <code>letmein</code>, and <code>admin123</code>. The last one works!</div>
      </div>`,
    questions: [
      { q: "How many failed attempts trigger the brute force detection flag?", a: "5", hint: "Check the command reference blocks." },
      { q: "What is the flag for no rate limiting?", a: "CTF{n0_r4t3_l1m1t_br00t}", hint: "Check the command reference blocks." },
      { q: "What is the admin's password?", a: "admin123", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What security control should block repeated login attempts?", a: "account lockout", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "3. Predictable Sessions & Admin Access",
    points: 70,
    html: `<div class="htb-diagram-container"><img src="../../../assets/images/auth_failures_session.png" alt="Session Hijacking"></div>
      <h3>Predictable Session Tokens</h3>
      <p>Session tokens must be cryptographically secure, random, and unpredictable to prevent session hijacking. If a developer uses a deterministic algorithm (like encoding a username via MD5) to generate session IDs, an attacker can trivially deduce the token of a target user, forge the cookie, and assume their identity without needing their password.</p>
      <p>Imagine a concert ticket where the "secret barcode" is just your name spelled backward. If an attacker knows your name, they can easily forge their own ticket and steal your seat! In web security, the "ticket" is your Session Cookie. If the server creates a highly predictable ticket, hackers don't need your password; they can just counterfeit your VIP wristband and walk right past the bouncer.</p>
      <h3>Practical Exploitation</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Analyze the Token</strong><br>Log in with <code>alice / password</code> and observe the session token on the dashboard. It's exactly the MD5 hash of "alice".</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Forge Admin Session</strong><br>Compute the MD5 of "admin" (it is <code>21232f297a57a5a743894a0e4a801fc3</code>). Open DevTools → Application → Cookies, and change the <code>session_token</code> cookie value to this hash.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Capture the Flag</strong><br>Refresh the page! You have forged an admin session and bypassed authentication entirely.</div>
      </div>`,
    questions: [
      { q: "What hashing algorithm is used to generate the predictable session tokens?", a: "MD5", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag for discovering predictable session tokens?", a: "CTF{pr3d1ct4bl3_s3ss10n_t0k3n}", hint: "Check the command reference blocks." },
      { q: "What is the flag for gaining admin access?", a: "CTF{4uth_f41lur3_4dm1n_4cc3ss}", hint: "Check the command reference blocks." },
      { q: "What does MFA stand for?", a: "Multi-Factor Authentication", hint: "Review the definitions and acronyms section." }
    ]
  }
];
