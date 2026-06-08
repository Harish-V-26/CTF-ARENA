const LESSONS = [
  {
    title: "1. What is IDOR?",
    points: 30,
    html: `
      <div class="htb-diagram-container"><img src="../../../assets/idor_lesson1.png" alt="1. What is IDOR?"></div>

      <h3>What is IDOR?</h3>
      <p>Imagine you go to a giant, fancy hotel and the person at the front desk gives you a magical room key. They tell you, "This key is for Room 101." When you go upstairs, you use the key and it opens your room perfectly. But then, you get a little curious. You walk over to Room 102, put your key in the lock, and amazingly, the door swings wide open! You try Room 103, and it opens too! The hotel made a terrible, silly mistake. They gave you a key, but they forgot to check if your key is ACTUALLY allowed to open other people's rooms. On the internet, websites do this exact same thing. This is called Insecure Direct Object Reference (IDOR). A website gives you a link to see your own private invoice, like <code>/invoice/1001</code>. But if you are a sneaky hacker, you can just change the number in the web address to <code>/invoice/1002</code>. If the website's security guards are lazy and forget to check if you actually own that second invoice, they will just blindly hand over someone else's private secrets to you!</p>

      <h3>Why Do Attackers Use IDOR?</h3>
      <p>IDOR is one of the most common and impactful web vulnerabilities for several reasons:</p>
      <p><strong>1. It is easy to exploit:</strong> No special tools are needed. The attacker just changes a number in the URL bar of their browser.</p>
      <p><strong>2. The damage can be massive:</strong> By writing a simple script that tries every number from 1 to 100,000, an attacker can automatically download every record in the database — every user's personal details, invoices, medical records, or messages.</p>
      <p><strong>3. It is hard to detect:</strong> From the server's log, the attacker's requests look identical to legitimate user requests. There are no obvious signs of an "attack".</p>
      <p>Real-world IDOR attacks have exposed millions of records at companies like Facebook, Instagram, and major banks, resulting in enormous fines under privacy laws.</p>

      <h3>Getting Started with the Lab</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Launch the Lab</strong><br>
          Click the <span class="badge orange">Launch Field Test</span> button above. Wait a few seconds for the Docker container to start up. A new tab will open with the <strong>SecureCorp Invoice System</strong>, which is a simulated company website.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Log In as a Normal Employee</strong><br>
          Use these credentials on the login page. You are playing the role of a regular employee with limited access:<br>
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
      <div class="htb-diagram-container"><img src="../../../assets/idor_lesson2.png" alt="2. The Leaked Invoice"></div>

      <h3>Exploiting IDOR by Changing the URL</h3>

      <p>You are now logged in as <code>employee_john</code>. The dashboard shows your own invoices. In this lesson, you will discover another user's private invoice by simply changing a number in the website's URL.</p>

      <p>This technique is called <strong>URL Tampering</strong> — manipulating the address in the browser's address bar to access data you should not be able to see. Because the server does not verify ownership of the invoice, it will simply return whatever record number you request.</p>

      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>View Your Own Invoice</strong><br>
          Click <strong>"View Details"</strong> on <strong>Invoice #1001</strong>. The page will load and the address bar will show a URL like:<br>
          <code>http://localhost:PORT/invoice/1001</code><br><br>
          Notice the number 1001 at the end. This is the ID the server uses to look up the invoice from its database. The server responds to this request without checking if invoice 1001 belongs to you.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Tamper the URL — Change the Invoice Number</strong><br>
          Click on the address bar and manually change the number at the end. Try these values one at a time and press <strong>Enter</strong> after each:<br>
          <code>/invoice/1002</code><br>
          <code>/invoice/1003</code><br>
          <code>/invoice/1004</code><br><br>
          For each one, ask yourself: "Am I allowed to see this? Did the server stop me?" Observe what the server returns for each request.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Find the Hidden Flag</strong><br>
          One of those invoice numbers belongs to <strong>another user's account</strong> and contains a hidden CTF flag. Find it!<br>
          <span class="hint-text">Hint: The flag looks like <code>CTF{...}</code> and is embedded inside the invoice description text.</span>
        </div>
      </div>

      <div class="analogy-box"><strong>Why does this vulnerability exist?</strong> The server's code only checks: "Is this user logged in?" It does NOT check: "Does this user own invoice 1002?" That missing ownership check is the IDOR vulnerability. Fixing it requires adding a single database condition like: WHERE invoice_id = 1002 AND owner_user_id = current_user_id.</div>
    `,
    questions: [
      { q: "What is the flag found in the hidden invoice?", a: "CTF{ID0R_1nv0ic3_l34k}" },
      { q: "Did the server check if you owned the invoice before showing it? (yes/no)", a: "no" }
    ]
  },
  {
    title: "3. Privilege Escalation via Mass Assignment",
    points: 50,
    html: `
      <div class="htb-diagram-container"><img src="../../../assets/idor_lesson3.png" alt="3. Privilege Escalation via Mass Assignment"></div>

      <h3>From Regular Employee to Administrator</h3>

      <p>IDOR is not only about <em>reading</em> other users' data. It can also be used to <em>write</em> data you should not be able to control. This advanced form of IDOR is called <strong>Mass Assignment</strong>.</p>

      <p><strong>What is Mass Assignment?</strong> When you update your profile on a website, your browser sends the changes to the server as a block of data (called JSON). A vulnerable server blindly accepts and saves every field it receives, including hidden internal fields like your account "role" (whether you are a regular user or an administrator). By manually adding the <code>role</code> field to the data you send, you can promote yourself to admin.</p>

      <p>In this lesson, you will use your browser's built-in developer tools to intercept and modify the profile update request, adding a "role: admin" field that the website was never supposed to accept from regular users.</p>

      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Open Your Profile Page</strong><br>
          Click <strong>Profile</strong> in the SecureCorp navigation bar at the top. You will see a form with your email address and a <strong>Save Changes</strong> button.
        </div>
      </div>

      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Open the Browser Developer Tools and the Network Tab</strong><br>
          Press <kbd>F12</kbd> on your keyboard (or right-click anywhere on the page and choose <strong>Inspect</strong>). This opens the Developer Tools panel.<br><br>
          Click the <strong>Network</strong> tab at the top of the Developer Tools panel. This tab records every request your browser sends to the server and every response it receives. Tick <strong>"Preserve log"</strong> so requests are not cleared when the page changes.
        </div>
      </div>

      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Trigger the Profile Update to See the Request</strong><br>
          Type any new email in the email field, for example: <code>hacker@securecorp.com</code><br>
          Then click <strong>Save Changes</strong>.<br><br>
          In the Network tab, a new entry will appear named <strong>update_profile</strong>. Click on it. In the right panel, click the <strong>Payload</strong> tab (or "Request" tab in Firefox). You will see the raw data your browser sent:
          <pre>{"user_id":"1","email":"hacker@securecorp.com"}</pre>
          This is the JSON data the server received and saved. The key insight: the server trusts whatever JSON data you send it, with no restrictions on which fields are allowed.
        </div>
      </div>

      <div class="step-block">
        <div class="step-num">Step 4</div>
        <div class="step-body">
          <strong>Important: Do NOT use "Copy as fetch" from the Network Tab</strong><br>
          You might be tempted to right-click the request and select "Copy as fetch" to replay it. This approach has two problems that will cause it to fail:<br>
          &nbsp;&nbsp;- <code>credentials: "omit"</code> in the copied code means your session cookie is NOT sent, so the server rejects you with a "401 Unauthorized" error.<br>
          &nbsp;&nbsp;- The body string uses escaped quotes that can cause syntax errors in the console.<br><br>
          Instead, switch to the <strong>Console</strong> tab in Developer Tools and paste the code from Step 5 directly.
        </div>
      </div>

      <div class="step-block">
        <div class="step-num">Step 5</div>
        <div class="step-body">
          <strong>Paste This Exact Code into the Console and Press Enter</strong><br>
          This code sends the same profile update request, but adds the extra <code>role: "admin"</code> field. The <code>credentials: "include"</code> ensures your session cookie is sent so the server knows you are logged in:
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
          After pressing Enter, you should see a pop-up alert saying <strong>"Done! Refresh the page."</strong> This confirms the request was accepted.
        </div>
      </div>

      <div class="step-block">
        <div class="step-num">Step 6</div>
        <div class="step-body">
          <strong>Verify Your New Admin Role and Claim the Flag</strong><br>
          Press <kbd>F5</kbd> to refresh the page. Go back to the Profile page — the <strong>Role</strong> field should now show <strong>admin</strong> instead of "employee".<br>
          Click <strong>Admin Panel</strong> in the navigation bar. This page is normally restricted to administrators only. The CTF flag will be displayed there.
        </div>
      </div>

      <div class="analogy-box"><strong>Why does Mass Assignment work?</strong> A properly secured server should have a list of fields it is allowed to accept from users (called a "whitelist"). For example, only "email" should be changeable by the user — not "role", "account_balance", or "user_id". A vulnerable server does not have this whitelist and blindly saves every field in the data it receives, including dangerous ones like "role: admin".</div>
    `,
    questions: [
      { q: "What vulnerability allows you to modify database fields you should not have access to? (Mass...)", a: "Mass Assignment" },
      { q: "What is the flag found in the Admin Panel?", a: "CTF{ID0R_pr1v_3sc_4dm1n}" }
    ]
  }
];
