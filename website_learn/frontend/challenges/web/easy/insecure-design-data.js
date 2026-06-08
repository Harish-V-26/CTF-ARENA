const LESSONS = [
  {
    title: "1. What is Insecure Design?",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/images/insecure_design.png" alt="Insecure Design Diagram" class="htb-diagram"></div>
      <h3>Insecure Design</h3>
      <p>Insecure Design refers to vulnerabilities originating from structural architectural flaws rather than implementation bugs (like simple coding errors). It highlights the absence of security controls during the planning phase. A system suffering from insecure design operates exactly as intended, but because threat modeling and abuse cases were never considered, the business logic is inherently exploitable.</p>
      <p>Imagine you are building a massive bank vault. You hire the best locksmiths to install the strongest cryptographic locks, but you accidentally design the vault with a giant glass window on the side that anyone can climb through. The locks work perfectly, and there are no "coding bugs" in the hinges — the blueprint itself is the problem. No amount of perfect code can fix a bad blueprint.</p>
      <h3>Practical Exploration</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Launch the Lab</strong><br>Click the [Launch Lab] button. A new tab will open with ShopSecure — a deliberately insecure online store.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Log In</strong><br>Use these credentials: Username: <code>customer</code> and Password: <code>shop2026</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Brute-Force the Coupon System</strong><br>The store has a coupon input with no rate limiting. Try codes like: <code>SAVE10</code>, <code>SAVE20</code>, and <code>MEGA100</code>. Notice that the system never locks you out — a critical design flaw!</div>
      </div>`,
    questions: [
      { q: "What OWASP Top 10 category describes flaws in the software's architectural blueprint?", a: "Insecure Design", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the coupon code that gives 100% discount?", a: "MEGA100", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag revealed when the MEGA100 coupon is applied?", a: "CTF{1ns3cur3_d3s1gn_n0_r4t3_l1m1t}", hint: "Check the command reference blocks." },
      { q: "What security control is missing that allows unlimited coupon guesses?", a: "rate limiting", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "2. Business Logic Flaws",
    points: 60,
    html: `<div class="htb-diagram-container"><img src="../../../assets/images/insecure_design_business.png" alt="Business Logic Flaws Diagram" class="htb-diagram"></div>
      <h3>Business Logic Flaws</h3>
      <p>Business Logic Flaws are a subset of insecure design where the application's rules are manipulated to achieve a malicious outcome. These vulnerabilities are not detected by automated scanners because they involve executing legitimate workflows in an unexpected sequence. Mitigating these flaws requires "abuse-case modeling" to anticipate how an attacker might combine or repeat legitimate application states.</p>
      <p>Imagine a supermarket that gives you a $5 off coupon. The barcode scans perfectly, and the math works perfectly. But the designer never told the cashier to confiscate the coupon after scanning it! So the customer just keeps handing the exact same $5 coupon to the cashier a hundred times until their groceries are free. The math is right, but the business logic is entirely flawed.</p>
      <h3>Practical Exploitation</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Apply a Coupon</strong><br>Go to the coupon section and apply any valid coupon code (e.g., <code>SAVE10</code>).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Apply It Again!</strong><br>Now apply the exact same coupon code a second time. Notice that the system accepts it again! This is a business logic flaw.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Claim the Flag</strong><br>When you apply a coupon for the second time, the system reveals the flag for exploiting the duplicate logic.</div>
      </div>`,
    questions: [
      { q: "What type of flaw allows applying the same coupon code multiple times?", a: "business logic flaw", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag for the duplicate coupon exploit?", a: "CTF{bus1n3ss_l0g1c_fl4w_d0ubl3_c0up0n}", hint: "Check the command reference blocks." },
      { q: "In secure design, what should the system check before accepting a coupon?", a: "if it was already used", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "3. Predictable Paths & Secure Design",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/images/insecure_design_obscurity.png" alt="Security through Obscurity Diagram" class="htb-diagram"></div>
      <h3>Security through Obscurity</h3>
      <p>Security through Obscurity is an anti-pattern in system design where engineers rely on secrecy (like hiding endpoints) as the primary method of defense. Placing administrative panels at unauthenticated but "hidden" paths (e.g., /admin-panel) violates the Principle of Least Privilege. Secure design dictates that robust authentication and authorization checks must guard every sensitive route.</p>
      <p>Imagine a bank vault where the door isn't actually locked; it's just hidden behind a very large, boring-looking painting. The designer assumes, "Nobody knows the vault is behind the painting, so it's perfectly safe!" This is Security through Obscurity. The problem is, hackers have automated robots that walk around the bank pulling on absolutely every painting they can find until the vault is exposed.</p>
      <h3>Practical Exploitation</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Discover the Admin Panel</strong><br>While logged in as <code>customer</code>, manually navigate to <code>/admin-panel</code> in the URL bar. You can access it without any admin credentials!</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Capture the Final Flag</strong><br>The admin panel displays the flag, proving that security-by-obscurity is not a valid defense.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Secure Design Practices</strong><br>To design securely: use Threat Modeling before coding, write Abuse Stories for every feature, and use Defense in Depth (never rely on a single control).</div>
      </div>`,
    questions: [
      { q: "What is the predictable URL path where the admin panel is located?", a: "/admin-panel", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag found on the unprotected admin panel?", a: "CTF{pr3d1ct4bl3_s3cr3t_p4th}", hint: "Check the command reference blocks." },
      { q: "What process should developers perform before coding to identify security risks?", a: "Threat Modeling", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What principle states that relying on hidden URLs for security is not valid?", a: "security through obscurity", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  }
];
