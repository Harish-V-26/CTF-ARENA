const LESSONS = [
  {
    title: "1. What is Insecure Design?",
    points: 50,
    html: `
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
      { q: "What OWASP Top 10 category describes flaws in the software's architectural blueprint?", a: "Insecure Design" },
      { q: "What is the coupon code that gives 100% discount?", a: "MEGA100" },
      { q: "What is the flag revealed when the MEGA100 coupon is applied?", a: "CTF{1ns3cur3_d3s1gn_n0_r4t3_l1m1t}" },
      { q: "What security control is missing that allows unlimited coupon guesses?", a: "rate limiting" }
    ]
  },
  {
    title: "2. Business Logic Flaws",
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
      { q: "What type of flaw allows applying the same coupon code multiple times?", a: "business logic flaw" },
      { q: "What is the flag for the duplicate coupon exploit?", a: "CTF{bus1n3ss_l0g1c_fl4w_d0ubl3_c0up0n}" },
      { q: "In secure design, what should the system check before accepting a coupon?", a: "if it was already used" }
    ]
  },
  {
    title: "3. Predictable Paths & Secure Design",
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
      { q: "What is the predictable URL path where the admin panel is located?", a: "/admin-panel" },
      { q: "What is the flag found on the unprotected admin panel?", a: "CTF{pr3d1ct4bl3_s3cr3t_p4th}" },
      { q: "What process should developers perform before coding to identify security risks?", a: "Threat Modeling" },
      { q: "What principle states that relying on hidden URLs for security is not valid?", a: "security through obscurity" }
    ]
  }
];
