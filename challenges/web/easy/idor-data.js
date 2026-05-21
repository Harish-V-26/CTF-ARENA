const LESSONS = [
  {
    title: "1. What is IDOR?",
    points: 30,
    html: `
      <h3>INSECURE DIRECT OBJECT REFERENCE (IDOR)</h3>

      <h3>What is IDOR?</h3>
      <p>Imagine a giant hotel with hundreds of locked rooms. When you check in at the front desk, the receptionist hands you a keycard with "Room 101" written on it. You go upstairs, slide the card, and your door opens. But out of curiosity, you walk over to Room 102, slide your card, and the door opens there too! Then you try Room 103, and it opens as well! The hotel's locking system has a massive flaw: it knows you are a checked-in guest, but it forgets to check if the card in your hand matches the specific room door you are trying to open. In the computer world, this lock mistake is called an Insecure Direct Object Reference, or IDOR for short.</p>

      <p>When you use a website, every item in the database—like your user profile, your private chat messages, your photos, or your shopping invoices—is stored on a shelf with a unique ID number. For example, your invoice might be number 1001, and another user's invoice is 1002. When you click "View Invoice," the website asks the server for the file: "/invoice/1001." An IDOR vulnerability happens when the website server fetches record 1001 and hands it to you, but if you change the address number in your browser bar to "/invoice/1002," the server blindly fetches that invoice too, completely forgetting to verify if you are the rightful owner of record 1002!</p>

      <p>This is one of the most common and dangerous bugs on the internet because it is incredibly easy for hackers to exploit. They do not need any special terminal programs or hacking software; they just click their web browser's address bar and change a single number! By writing a simple loop script that changes the ID number from 1 to 100,000 in a fraction of a second, an attacker can automatically download the entire company database, exposing private medical files, credit card numbers, or chat histories. It is very hard for defenders to spot because from the server's view, the hacker's requests look identical to normal, healthy traffic.</p>

      <h3>Getting Started with the Lab</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Launch the Lab</strong><br>
          Click the Launch Field Test button above. Wait a few seconds for the Docker container to start up. A new tab will open with the SecureCorp Invoice System, which is a simulated company website.
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
      <h3>Exploiting IDOR by Changing the URL</h3>

      <p>Now that you are logged in as employee_john, you can see your personal dashboard containing your own invoices. Your objective is to find a secret flag that is hidden inside another employee's private invoice. To do this, you will practice a technique called URL Tampering, which simply means editing the address path in your browser's navigation bar to ask the server for files you are not supposed to see.</p>

      <p>When you click the "View Details" button on Invoice #1001, the browser loads the invoice and showing a URL path like "/invoice/1001." The number 1001 at the end is the unique database ID key. Because the developers forgot to write an ownership check in the server code, the server will fetch whatever ID number you type. If you click your browser's address bar and change 1001 to 1002, 1003, or 1004, the server will fetch those files and display them on your screen, allowing you to read other users' private details!</p>

      <p>One of these numbers belongs to another employee and contains the secret flag. Once you find the correct invoice page, look closely at the description text to copy the flag and paste it in the box below. This shows how a missing condition in the database query (like forgetting to verify if the user's ID matches the invoice's owner ID) allows unauthorized access to private data.</p>

      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>View Your Own Invoice</strong><br>
          Click "View Details" on Invoice #1001. Look at the address bar to see the invoice number.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Tamper the URL</strong><br>
          Manually change the number at the end of the URL to 1002, 1003, and 1004, pressing Enter each time.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Find the Hidden Flag</strong><br>
          Locate the flag inside the description of the leaked invoice page and write it down.
        </div>
      </div>
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
      <h3>From Regular Employee to Administrator</h3>

      <p>IDOR vulnerabilities do not just let you read other people's files; they can also let you rewrite database files to steal administrator privileges! This advanced form of IDOR is called "Mass Assignment." When you save changes on your user profile page, your browser packages up the form details (like your email address) into a structured text format called JSON, and sends it to the server in a POST request. The server reads this block of data and saves it directly to your profile row in the database.</p>

      <p>A vulnerable server blindly accepts and saves every single field it receives in the JSON block, even if it is a field that does not appear on your screen! For example, the database has a column called "role" which decides if you are a regular user or an admin. The form on the webpage only lets you edit your email, sending a block like: '{"user_id": "1", "email": "john@test.com"}'. But if you use your browser's Developer Tools Console, you can intercept the message and manually add a secret field: '{"user_id": "1", "email": "john@test.com", "role": "admin"}'. When the server reads the message, it blindly updates your role column to admin!</p>

      <p>To perform this attack, go to the Profile page, open your Developer Tools Console (F12), and paste the special fetch script that sends the profile update request with the extra "role: admin" parameter included. After running the script, refresh the page and you will see your role has magically changed to admin! A new "Admin Panel" button will appear in the navigation bar, giving you access to the administrator-only dashboard where the final CTF flag is stored. This shows why servers must use a "Whitelist" to only accept specific user-editable fields rather than blindly saving everything they receive.</p>

      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Open Profile Page</strong><br>
          Click Profile in the navigation bar to see your email form.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Open Console</strong><br>
          Press F12 and click the Console tab.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Paste and Run the Script</strong><br>
          Paste this fetch command into the Console box and press Enter:<br>
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
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 4</div>
        <div class="step-body">
          <strong>Claim the Flag</strong><br>
          Refresh the page, check your profile role, click the Admin Panel menu, and copy the flag.
        </div>
      </div>
    `,
    questions: [
      { q: "What vulnerability allows you to modify database fields you should not have access to? (Mass...)", a: "Mass Assignment" },
      { q: "What is the flag found in the Admin Panel?", a: "CTF{ID0R_pr1v_3sc_4dm1n}" }
    ]
  }
];
