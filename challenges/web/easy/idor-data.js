const LESSONS = [
  {
    title: "1. What is IDOR?",
    points: 30,
    html: `
      <h3>🔍 What is IDOR?</h3>
      <p><strong>IDOR</strong> stands for <strong>Insecure Direct Object Reference</strong>. It happens when an application gives direct access to objects (like database records, files, or accounts) based on user‑supplied input <em>without checking if the user is authorized</em>.</p>
      <div class="analogy-box">💡 <strong>Analogy:</strong> Imagine a valet who hands you any car just because you gave them a random ticket number — without verifying it's yours!</div>

      <h3>🚀 Getting Started</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Launch the Lab</strong><br>
          Click the <span class="badge orange">Launch Field Test ⇗</span> button above. Wait a few seconds for the Docker container to spin up. A new tab will open with the <strong>SecureCorp Invoice System</strong>.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Log In</strong><br>
          Use these credentials on the login page:<br>
          <code>Username: employee_john</code><br>
          <code>Password: password123</code>
        </div>
      </div>
    `,
    questions: [
      { q: "What does the 'I' in IDOR stand for?", a: "Insecure" },
      { q: "What does the 'O' in IDOR stand for?", a: "Object" }
    ]
  },
  {
    title: "2. The Leaked Invoice",
    points: 40,
    html: `
      <h3>📄 Exploiting IDOR via URL Tampering</h3>
      <p>You are logged in as <code>employee_john</code>. The dashboard shows your own invoices. Let's see if we can access <em>someone else's</em> invoices.</p>

      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          Click <strong>"View Details"</strong> on <strong>Invoice #1001</strong>. The page will open and the URL will look like:<br>
          <code>http://localhost:PORT/invoice/1001</code>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Tamper the URL</strong> — click the address bar and change <code>1001</code> to <code>1002</code>, then <code>1003</code>.<br>
          Press <strong>Enter</strong> after each change and observe what the server returns.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          One of those invoices belongs to <strong>another user</strong> and contains a hidden flag. Find it!<br>
          <span class="hint-text">💡 Hint: The flag looks like <code>CTF{...}</code> and is inside the invoice description.</span>
        </div>
      </div>

      <div class="analogy-box">🐛 <strong>Why does this work?</strong> The server only checks if you are <em>logged in</em>, not if the invoice <em>belongs to you</em>. That is the IDOR vulnerability.</div>
    `,
    questions: [
      { q: "What is the flag found in the hidden invoice?", a: "CTF{ID0R_1nv0ic3_l34k}" },
      { q: "Did the server check if you owned the invoice before showing it? (yes/no)", a: "no" }
    ]
  },
  {
    title: "3. Privilege Escalation",
    points: 50,
    html: `
      <h3>⚡ Mass Assignment — Become Admin</h3>
      <p>IDOR is not just about <em>reading</em> other users' data. It can also be used to <em>write</em> data you shouldn't control. This is called <strong>Mass Assignment</strong>.</p>
      <p>The profile‑update API blindly accepts any JSON field — including <code>role</code>. We will use this to grant ourselves admin privileges.</p>

      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Open the Profile page</strong><br>
          Click <strong>Profile</strong> in the SecureCorp navigation bar. You will see a form with your email address and a <strong>Save Changes</strong> button.
        </div>
      </div>

      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Open Developer Tools &amp; Network tab</strong><br>
          Press <kbd>F12</kbd> (or right‑click → <strong>Inspect</strong>).<br>
          Click the <strong>Network</strong> tab. Tick <strong>"Preserve log"</strong> so requests are not lost on reload.
        </div>
      </div>

      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Trigger the profile update</strong><br>
          Type any new email in the field, e.g. <code>hacker@securecorp.com</code>, then click <strong>Save Changes</strong>.<br>
          In the Network tab you will see a new <code>POST</code> request named <strong>update_profile</strong>. Click it.<br>
          In the right panel open the <strong>Payload</strong> tab — you will see:
          <pre>{"user_id":"1","email":"hacker@securecorp.com"}</pre>
          The server trusts whatever JSON you send!
        </div>
      </div>

      <div class="step-block">
        <div class="step-num">Step 4</div>
        <div class="step-body">
          <strong>⚠️ Do NOT use "Copy as fetch" from the Network tab</strong><br>
          The snippet Chrome copies has two problems that will break the attack:<br>
          &nbsp;&nbsp;• <code>credentials: "omit"</code> → session cookie is not sent → you get <strong>401 Unauthorized</strong><br>
          &nbsp;&nbsp;• <code>body: "{\"user_id\":...}"</code> raw string → unescaped quotes cause a <strong>SyntaxError</strong><br><br>
          Instead, go directly to the <strong>Console</strong> tab in DevTools and type or paste the snippet from Step 5 below.
        </div>
      </div>

      <div class="step-block">
        <div class="step-num">Step 5</div>
        <div class="step-body">
          <strong>Paste this exact snippet into the Console and press <kbd>Enter</kbd></strong><br>
          This uses <code>JSON.stringify()</code> (no quoting issues) and <code>credentials: "include"</code> (sends your session cookie):
          <pre>fetch("/api/update_profile", {
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    user_id: "1",
    email: "hacker@test.com",
    role: "admin"
  })
}).then(r => r.json()).then(d => { console.log(d); alert("Done! Refresh the page."); });</pre>
          <strong>Why the last line matters:</strong><br>
          &nbsp;&nbsp;• <code>.then(r =&gt; r.json())</code> — reads the JSON response from the server<br>
          &nbsp;&nbsp;• <code>.then(d =&gt; { console.log(d); alert("Done!..."); })</code> — logs the result and shows a popup so you <em>know</em> the request succeeded before refreshing<br>
          &nbsp;&nbsp;• Without this, the Promise runs silently — you'd have no way to confirm it worked<br><br>
          After pressing <kbd>Enter</kbd> you should see an alert popup saying <strong>"Done! Refresh the page."</strong>
        </div>
      </div>

      <div class="step-block">
        <div class="step-num">Step 6</div>
        <div class="step-body">
          <strong>Verify &amp; Claim the Flag</strong><br>
          Refresh the Profile page (<kbd>F5</kbd>). The <strong>Role</strong> field should now show <strong>admin</strong>.<br>
          Click <strong>Admin Panel</strong> in the navigation bar — the flag will be displayed on that page!
        </div>
      </div>

      <div class="analogy-box">🐛 <strong>Why does this work?</strong> The server does not whitelist which fields can be updated. An attacker can inject any field — like <code>role</code> — into the JSON payload and the server will blindly write it to the database.</div>
    `,
    questions: [
      { q: "What vulnerability allows you to modify fields you shouldn't? (Mass...)", a: "Mass Assignment" },
      { q: "What is the flag found in the Admin Panel?", a: "CTF{ID0R_pr1v_3sc_4dm1n}" }
    ]
  }
];
