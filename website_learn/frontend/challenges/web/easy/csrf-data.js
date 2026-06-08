const LESSONS = [
  {
    title: "1. CSRF Fundamentals",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/images/csrf_fundamentals.png" alt="CSRF Fundamentals Diagram" class="htb-diagram"></div>
      <h3>Cross-Site Request Forgery (CSRF)</h3>
      <p>Cross-Site Request Forgery (CSRF) is an attack that forces an authenticated user to execute unwanted actions on a web application in which they are currently authenticated. Because browsers automatically include ambient credentials (like session cookies) with cross-origin requests, a vulnerable application cannot distinguish between a legitimate request initiated by the user and a forged request initiated by a malicious site on the user's behalf.</p>
      <p>Imagine you have a personal checkbook, and you keep a signed blank check in your wallet. If you walk into a store, the clerk recognizes you, takes the check, and writes the amount. This works because the clerk trusts your signature. Now, imagine a sneaky pickpocket tricks you into handing over that signed check without you looking at it, and fills it out to pay themselves. The bank accepts it because it has your real signature on it. In a CSRF attack, your browser automatically attaches your "signature" (session cookie), and the website blindly trusts it!</p>
      <h3>Practical Attack Setup</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Launch the Lab</strong><br>Click the <strong>Launch CSRF Lab</strong> button. A new tab will open with the <strong>PaySecure Bank</strong> website.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Log In</strong><br>Use credentials: Username <code>alice</code> and Password <code>password123</code>. Note Alice's starting balance of $1,000.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Identify the Vulnerability</strong><br>Observe the "Standard (Vuln)" tab under "Transfer Funds". This endpoint relies entirely on session cookies and is vulnerable to CSRF.</div>
      </div>`,
    questions: [
      { q: "What is the short abbreviation for Cross-Site Request Forgery?", a: "CSRF", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the name of the browser-stored text that acts like a user's signature?", a: "session cookie", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What does the website trust because you are logged in?", a: "browser", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the starting balance of Alice in dollars?", a: "1000", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the username of the account you must use to log into the bank?", a: "alice", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "2. Crafting the CSRF Exploit",
    points: 70,
    html: `<div class="htb-diagram-container"><img src="../../../assets/images/csrf_exploit.png" alt="Crafting Exploit Diagram" class="htb-diagram"></div>
      <h3>Exploiting CSRF via Auto-Submitting Forms</h3>
      <p>An attacker exploits CSRF by hosting a malicious page containing HTML/JavaScript that automatically generates a cross-origin request (e.g., via an auto-submitting POST form) to the vulnerable application. When the authenticated victim visits the attacker's page, the victim's browser seamlessly executes the request within their active session context.</p>
      <p>You will play the role of the attacker. You will write a malicious HTML page on the Attacker Server, host it, and send the link to Bob (a wealthy bank customer). When Bob loads your link, his browser will automatically submit a hidden request to transfer funds to Alice's account, acting entirely on his behalf without him clicking anything!</p>
      <h3>Practical Attack Walkthrough</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Write Exploit</strong><br>Open the Attacker Server. Write an HTML page that submits a POST request to <code>/transfer</code> targeting <code>alice</code> with <code>amount</code> 2000:
        <pre><code>&lt;form id="csrf-form" action="/transfer" method="POST"&gt;
  &lt;input type="hidden" name="to_account" value="alice"&gt;
  &lt;input type="hidden" name="amount" value="2000"&gt;
&lt;/form&gt;
&lt;script&gt;document.getElementById("csrf-form").submit();&lt;/script&gt;</code></pre>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Host and Deliver</strong><br>Click <strong>Save and Host Exploit</strong>. Copy the generated URL. Click <strong>Report to Victim</strong> and send the URL to the Victim Bot (Bob).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Verify Success</strong><br>Watch the console logs as Bob navigates to the exploit. Check Alice's balance to confirm the forged $2,000 transfer and grab the flag!</div>
      </div>`,
    questions: [
      { q: "What HTML tag is commonly used to create a form for sending POST requests?", a: "form", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag displayed on Alice's dashboard?", a: "CTF{CSRF_Tr4nsf3r_Succ3ss}", hint: "Check the command reference blocks." },
      { q: "What JavaScript method is used to automatically send a form without user interaction?", a: "submit", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What HTTP method is used by the vulnerable transfer endpoint to process the transfer?", a: "POST", hint: "Refer to the HTTP protocol details." },
      { q: "What is the username of the simulated victim that visits your hosted exploit link?", a: "bob", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "3. Securing Against CSRF",
    points: 60,
    html: `<div class="htb-diagram-container"><img src="../../../assets/images/csrf_secure.png" alt="Securing CSRF Diagram" class="htb-diagram"></div>
      <h3>CSRF Tokens and SameSite Cookies</h3>
      <p>The standard defense against CSRF is the implementation of Anti-CSRF Tokens. These are unpredictable, session-tied values generated by the server and included as hidden fields in state-changing forms. Additionally, setting the <code>SameSite</code> attribute (Strict or Lax) on session cookies provides modern browser-level mitigation by restricting cross-origin cookie transmission.</p>
      <p>Think of our bank check analogy again: To stop forged checks, the bank introduces a new rule: Every time you transfer money, the teller hands you a unique, random PIN code on a sticky note (the CSRF Token). When you hand your slip back, you MUST attach that exact sticky note. Because the attacker is not at the bank with you, they can't see the sticky note. Even if they forge your signature, they don't have the PIN, and the bank rejects it!</p>
      <h3>Testing the Defenses</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Identify the Token</strong><br>Go to the Bank Dashboard and click the <strong>Secure (Token)</strong> tab. Look at the hidden input box containing the random string—this is the CSRF Token.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Attempt the Exploit</strong><br>Go back to the Attacker Server. Change your exploit code's action to <code>action="/secure_transfer"</code>. Host it and send it to Bob.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Analyze the Failure</strong><br>The bot visits your page, but the forged request lacks Bob's specific CSRF token. The bank rejects the request and logs a "CSRF Token Mismatch" error, successfully defending the user.</div>
      </div>`,
    questions: [
      { q: "What is the name of the token used to defend against CSRF attacks?", a: "CSRF Token", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Which SameSite cookie attribute value allows cookies to be sent only on same-site requests?", a: "Strict", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "In our analogy, what physical item is used to represent the CSRF Token?", a: "sticky note", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the other common SameSite cookie attribute value besides Strict that restricts cookies?", a: "Lax", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What error is logged in the console when the token verification fails during an attack?", a: "CSRF Token Mismatch", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  }
];
