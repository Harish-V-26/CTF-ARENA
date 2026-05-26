const LESSONS = [
  {
    title: "1. CSRF Fundamentals",
    points: 50,
    html: `
      <div class="htb-diagram-container">
        <img src="../../../assets/images/csrf_fundamentals.png" alt="CSRF Fundamentals Diagram" class="htb-diagram">
      </div>
      <h3>What is CSRF?</h3>
      <p>Imagine you have a personal checkbook, and you keep a signed blank check in your wallet. If you walk into a store, the clerk recognizes you, takes the check, and writes the amount. This works because the clerk trusts you. Now, imagine a sneaky pickpocket tricks you into handing over that signed check without you looking at it, and fills it out to pay themselves. The bank accepts it because it has your real signature on it. This is exactly what happens in a Cross-Site Request Forgery (CSRF) attack.</p>
      <p>A website trusts your browser because you are logged in. The browser stores a small piece of text called a <strong>session cookie</strong>. Every time your browser makes a request to that website, it automatically attaches that session cookie, which acts like your signature. If you visit a malicious site while logged into your bank, the malicious site can trick your browser into sending a request to your bank to transfer money. Since the browser automatically attaches your session cookie, the bank processes the request, thinking you wanted it!</p>

      <h3>Why Do Attackers Use CSRF?</h3>
      <p>CSRF allows attackers to perform actions on behalf of other users without knowing their password or hijacking their account directly. The impact depends on what actions are vulnerable:</p>
      <p><strong>1. Financial Theft:</strong> Forcing a victim to transfer funds or purchase items.</p>
      <p><strong>2. Account Takeover:</strong> Forcing a victim to change their email address or password to an attacker-controlled one.</p>
      <p><strong>3. Privilege Escalation:</strong> Tricking an administrator into creating a new admin account or deleting users.</p>

      <h3>Getting Started with the Lab</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Launch the Lab</strong><br>
          Click the <strong>Launch CSRF Lab</strong> button above. Wait a few seconds for the Docker container to start. A new tab will open with the <strong>PaySecure Bank</strong> website.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Log In as a Normal User</strong><br>
          Use these credentials on the bank login page:<br>
          <code>Username: alice</code><br>
          <code>Password: password123</code>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Observe the Dashboard</strong><br>
          Note that Alice starts with a balance of $1,000. Under "Transfer Funds", observe the "Standard (Vuln)" tab. This is the vulnerable endpoint we will attack.
        </div>
      </div>
    `,
    questions: [
      { q: "What is the short abbreviation for Cross-Site Request Forgery?", a: "CSRF" },
      { q: "What is the name of the browser-stored text that acts like a user's signature?", a: "session cookie" },
      { q: "What does the website trust because you are logged in?", a: "browser" },
      { q: "What is the starting balance of Alice in dollars?", a: "1000" },
      { q: "What is the username of the account you must use to log into the bank?", a: "alice" }
    ]
  },
  {
    title: "2. Crafting the CSRF Exploit",
    points: 70,
    html: `
      <div class="htb-diagram-container">
        <img src="../../../assets/images/csrf_exploit.png" alt="Crafting Exploit Diagram" class="htb-diagram">
      </div>
      <h3>How is CSRF Used?</h3>
      <p>An attacker exploits CSRF by hosting a malicious page on their own server and tricking the victim into visiting it. The page contains code that automatically submits a form targeting the vulnerable site.</p>
      <p>In this lesson, you will play the role of the attacker. You will write a malicious HTML page on the Attacker Server, host it, and send the link to Bob (a wealthy bank customer). When Bob loads your link, his browser will automatically submit a hidden request to transfer funds to Alice's account.</p>
 
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Open the Attacker Server</strong><br>
          Click the yellow <strong>Attacker Server</strong> button in the navigation bar. This opens the Attacker's Exploit Hosting page.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Write the Exploit Code</strong><br>
          In the text area, write an HTML page that submits a POST request to the bank's transfer system on load. The target path is <code>/transfer</code>, and the inputs are <code>to_account</code> (value: <code>alice</code>) and <code>amount</code> (value: <code>2000</code>). Here is the pattern:
          <pre>&lt;form id="csrf-form" action="/transfer" method="POST"&gt;
  &lt;input type="hidden" name="to_account" value="alice"&gt;
  &lt;input type="hidden" name="amount" value="2000"&gt;
&lt;/form&gt;
&lt;script&gt;
  document.getElementById("csrf-form").submit();
&lt;/script&gt;</pre>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Host and Copy the Link</strong><br>
          Click <strong>Save and Host Exploit</strong>. Underneath, a unique URL like <code>http://localhost:PORT/view-exploit/xxxx</code> will be generated. Copy this URL.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 4</div>
        <div class="step-body">
          <strong>Deliver the Exploit to Bob</strong><br>
          Click <strong>Report to Victim</strong> in the navigation bar. Paste your copied exploit URL into the input field and click <strong>Send to Victim Bot</strong>.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 5</div>
        <div class="step-body">
          <strong>Check the Logs and Claim the Flag</strong><br>
          Watch the console logs. It will show Bob navigating to your exploit page, loading the self-submitting form, and executing the transfer. Go back to your Bank Dashboard, refresh, and inspect Alice's balance (it should now be $3,000) to find the flag.
        </div>
      </div>
    `,
    questions: [
      { q: "What HTML tag is commonly used to create a form for sending POST requests?", a: "form" },
      { q: "What is the flag displayed on Alice's dashboard?", a: "CTF{CSRF_Tr4nsf3r_Succ3ss}" },
      { q: "What JavaScript method is used to automatically send a form without user interaction?", a: "submit" },
      { q: "What HTTP method is used by the vulnerable transfer endpoint to process the transfer?", a: "POST" },
      { q: "What is the username of the simulated victim that visits your hosted exploit link?", a: "bob" }
    ]
  },
  {
    title: "3. Securing Against CSRF",
    points: 60,
    html: `
      <div class="htb-diagram-container">
        <img src="../../../assets/images/csrf_secure.png" alt="Securing CSRF Diagram" class="htb-diagram">
      </div>
      <h3>How Do We Defend Against CSRF?</h3>
      <p>The standard way to defend against CSRF is by using <strong>CSRF Tokens</strong>. Think of our bank check analogy again: Normally, an attacker can forge your check because the bank only checks your signature (your session cookie).</p>
      <div class="analogy-box">
        To stop this, the bank introduces a new rule: Every time you want to make a transfer, the teller hands you a unique, random PIN code on a sticky note (the <strong>CSRF Token</strong>). When you hand your transfer slip back, you MUST attach that exact sticky note. Because the attacker is not at the bank with you, they can't see the sticky note. Even if they forge your signature, they don't have the correct PIN, and the bank will reject the transfer!
      </div>
      <p>When a web server renders a form, it includes this secret token as a hidden field. Since an attacker's website cannot read the token (due to browser security boundaries), any forged request they make will fail verification.</p>
 
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Find the "Sticky Note" (The Token)</strong><br>
          <strong>What to do:</strong> Go to the Bank Dashboard and click the <strong>Secure (Token)</strong> tab under "Transfer Funds". Look at the bottom of the form to see a box displaying a long, random string of text. This is the CSRF Token!<br><br>
          <strong>Why:</strong> This step is just for you to <em>see</em> the token. The bank is showing it to you to say, "Hey, if anyone wants to use this secure form, they must submit this exact random string along with the transfer!"
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Try to Attack the Secure System</strong><br>
          <strong>What to do:</strong> Go back to your Attacker Server. Change your exploit code so it targets the secure version of the transfer page by changing the action to: <code>&lt;form action="/secure_transfer" ...&gt;</code>. Click <strong>Save and Host Exploit</strong>.<br><br>
          <strong>Why:</strong> You are trying to attack the secure system using the exact same trick. But notice your malicious code only sends the <code>to_account</code> and <code>amount</code>. It does <em>not</em> send the CSRF token. Why? Because you (the attacker) have no way of guessing what secret random string the bank gave to the victim (Bob)!
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Watch the Attack Fail</strong><br>
          Submit the new exploit URL to the Victim Bot. The bot will visit your page and try to force the transfer. However, because your forged request doesn't include Bob's secret token, the bank will block it and log a "CSRF Token Mismatch" error. You successfully proved that CSRF tokens stop the attack!
        </div>
      </div>
 
      <h3>Other Defenses: SameSite Cookies</h3>
      <p>Another powerful defense is the <strong>SameSite</strong> attribute on cookies. When SameSite is set to <strong>Strict</strong> or <strong>Lax</strong>, the browser restricts when cookies are sent along with requests originating from third-party sites, preventing the automatic attachment of the session cookie during cross-site attacks.</p>
    `,
    questions: [
      { q: "What is the name of the token used to defend against CSRF attacks?", a: "CSRF Token" },
      { q: "Which SameSite cookie attribute value allows cookies to be sent only on same-site requests?", a: "Strict" },
      { q: "In our analogy, what physical item is used to represent the CSRF Token?", a: "sticky note" },
      { q: "What is the other common SameSite cookie attribute value besides Strict that restricts cookies?", a: "Lax" },
      { q: "What error is logged in the console when the token verification fails during an attack?", a: "CSRF Token Mismatch" }
    ]
  }
];
