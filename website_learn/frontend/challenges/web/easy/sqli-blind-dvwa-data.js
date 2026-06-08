const LESSONS = [
  {
    title: "1. What is Blind SQLi?",
    points: 20,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_blind_lesson1.png" alt="1. What is Blind SQLi?"></div>
      <h3>Blind SQL Injection (SQLi)</h3>
      <p>Blind SQL Injection occurs when a web application is vulnerable to SQL injection, but its HTTP responses do not contain the direct results of the relevant SQL query or any database errors. Attackers must infer data from the database by asking the application a series of true/false queries, or by instructing the database to perform time-delay operations based on conditional logic.</p>
      <p>Imagine you are a detective investigating a crime. You find an important witness, but they have duct tape over their mouth and cannot speak! This is exactly what "Blind SQL Injection" is like. The website's guards stop the database from printing answers on the screen. To get secrets, we play "20 Questions"! We ask, "Does the password start with A?" If the guard nods, we know! Or we use a cooler trick: "If the answer is YES, go to sleep for 5 seconds." If the website freezes for 5 seconds, we magically know the answer was YES, without the guard ever speaking!</p>
      <h3>Lab Setup</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Start the Lab</strong><br>Click "Launch DVWA Instance". Wait for your container to start.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Log In & Setup</strong><br>Log in with <code>admin</code>/<code>password</code>. Click "Create / Reset Database". Go to "DVWA Security" and set it to "Low".</div>
      </div>`,
    questions: [
      { q: "Can the guard (database) speak and show you the data directly in a Blind attack? (yes/no)", a: "no", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What game is Blind SQLi similar to? (20...)", a: "20 Questions", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What trick can we use to see if the answer is YES? (Make the guard go to...)", a: "sleep", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "2. The Sleeping Guard (Low Level)",
    points: 30,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_blind_lesson2.png" alt="2. The Sleeping Guard (Low Level)"></div>
      <h3>Time-Based Blind SQLi</h3>
      <p>Time-based Blind SQLi leverages database pausing functions (like <code>SLEEP()</code> in MySQL or <code>pg_sleep()</code> in PostgreSQL) to infer whether an injected SQL conditional statement was executed. If the condition preceding the SLEEP command evaluates to true, the database halts execution for the specified duration, causing a measurable delay in the HTTP response time.</p>
      <p>It is time to try our amazing stopwatch trick on the mute database guard! We hand the guard a note that says, "Hey, if my math equation is true, I want you to immediately go to sleep for 5 seconds." Since we know our math equation is true, the guard will read it, fall asleep, and make the entire website spin and freeze. When we see the website spinning, we know our spell worked and we have broken the lock!</p>
      <h3>Practical Attack Walkthrough</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Verify Target</strong><br>Go to "SQL Injection (Blind)". If you type "1", it says "User ID exists" but shows no data.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Cast Time Spell</strong><br>Type the payload: <code>1' AND SLEEP(5) #</code> and submit.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Measure Response</strong><br>The server checks if User 1 exists (YES). The <code>AND SLEEP(5)</code> triggers, forcing a 5-second delay before the page loads. The delay confirms vulnerability.</div>
      </div>`,
    questions: [
      { q: "What word do we use to make the database freeze? (Hint: SLEEP)", a: "SLEEP", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "How many seconds did we tell the guard to sleep?", a: "5", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Did the website take a long time to load? (yes/no)", a: "yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "3. The Hidden Dropdown (Medium Level)",
    points: 30,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_blind_lesson3.png" alt="3. The Hidden Dropdown (Medium Level)"></div>
      <h3>Bypassing UI Restrictions for Blind Injection</h3>
      <p>Medium security replaces text inputs with dropdown menus and implements minimal escaping. However, just like standard SQLi, Blind SQLi payloads can be injected by modifying the DOM using browser developer tools, exploiting the fact that backend queries trust the structure of incoming integer parameters.</p>
      <p>The security guards realized we were typing magic spells, so they ripped the text box off the wall! They left a simple dropdown menu where you can only click numbers. They think we can't cast our spells. But hackers use Developer Tools (the X-ray glasses of the internet) to rewrite the code of the dropdown menu to hide our sleeping spell right inside it!</p>
      <h3>Practical Attack Walkthrough</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Change Level</strong><br>Set security to Medium. Go back to "SQL Injection (Blind)". The text box is now a dropdown.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>DOM Manipulation</strong><br>Right-click the dropdown and click "Inspect". Find <code>&lt;option value="1"&gt;1&lt;/option&gt;</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Inject & Execute</strong><br>Double-click <code>value="1"</code> and change it to <code>value="1 AND SLEEP(5)"</code>. Select "1" from the dropdown and submit. The 5-second spin proves the Blind SQLi still works.</div>
      </div>`,
    questions: [
      { q: "What tool did we use to change the dropdown menu code?", a: "DevTools", hint: "Look for the specific tools mentioned in the lesson." },
      { q: "Did the website freeze for 5 seconds again? (yes/no)", a: "yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Does Blind SQLi still work on the Medium level? (yes/no)", a: "yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "4. The Poisoned Cookie (High Level)",
    points: 30,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_blind_lesson4.png" alt="4. The Poisoned Cookie (High Level)"></div>
      <h3>Cookie-Based SQL Injection</h3>
      <p>HTTP Cookies are frequently overlooked as input vectors. If a web application uses a cookie value directly in a backend SQL query without sanitization, an attacker can manipulate their local cookie storage to perform SQL injection. This bypasses all form-based frontend filters entirely.</p>
      <p>On High security, they ripped out the dropdown menu too! Now there is nowhere to click or type. But the website gives you a digital wristband (a Cookie) so it remembers who you are. We are going to use DevTools to take our wristband, scratch out our ID number, and write our sleeping spell right on it! When the guard scans our wristband, the spell will be cast invisibly!</p>
      <h3>Practical Attack Walkthrough</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Identify Cookie Vector</strong><br>Set security to High. Go to "SQL Injection (Blind)". The page reads your ID from a cookie.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Access Storage</strong><br>Open DevTools (F12). Go to the "Application" or "Storage" tab. Click "Cookies" on the left and select the target IP.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Poison the Cookie</strong><br>Find the <code>id</code> cookie. Double-click its value (e.g., <code>1</code>) and change it to the spell: <code>1' AND SLEEP(5) #</code>. Refresh the page to trigger the 5-second delay.</div>
      </div>`,
    questions: [
      { q: "Where was the vulnerable parameter hiding this time?", a: "Cookie", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Which tab in DevTools lets you see and change Cookies?", a: "Application", hint: "Look for the specific tools mentioned in the lesson." },
      { q: "Did the page take 5 seconds to reload after poisoning the cookie? (yes/no)", a: "yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "5. The Strict Bouncer (Impossible Level)",
    points: 30,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_blind_lesson5.png" alt="5. The Strict Bouncer (Impossible Level)"></div>
      <h3>Defending Against Blind SQLi</h3>
      <p>Regardless of whether an SQL injection is in-band, error-based, or time-based (blind), the underlying vulnerability is identical: failure to separate code from data. Parameterized Queries (Prepared Statements) provide universal protection by treating all user input strictly as literal values, rendering blind payloads inert.</p>
      <p>Why did our amazing stopwatch and wristband tricks fail on Impossible mode? Even though the database guard is mute, the architects finally gave the guard the ultimate shield: a Prepared Statement. When you give the robot your sleep spell, it literally searches for a user named "1-Quote-AND-SLEEP-5-Hashtag". It never runs the SLEEP command. Prepared Statements save the day once again!</p>
      <h3>The Defense in Action</h3>
      <div class="step-block">
        <div class="step-num">Defense</div>
        <div class="step-body"><strong>Universal Protection</strong><br>Prepared statements neutralize all variants of SQL injection. Time-based blind payloads are treated as literal strings and safely discarded by the query execution engine.</div>
      </div>`,
    questions: [
      { q: "What is the best defense against Blind SQL Injection?", a: "Prepared Statements", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Did the SLEEP command work on Impossible mode? (yes/no)", a: "no", hint: "Check the command reference blocks." },
      { q: "Are Prepared Statements the superhero of database security? (yes/no)", a: "yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  }
];
