const LESSONS = [
  {
    title: "Lesson 1: How Login Systems Work",
    points: 40,
    html: `<div class="htb-diagram-container"><img src="../../../assets/auth_basics_lesson1.png" alt="Lesson 1: How Login Systems Work"></div>
      <h3>Authentication Theory</h3>
      <p>Authentication is the process of verifying the identity of a user, device, or system. In web applications, this typically involves receiving credentials (like a username and password), cryptographically verifying them against stored values, and then establishing a stateful session over the stateless HTTP protocol using mechanisms like Cookies or JSON Web Tokens (JWTs).</p>
      <p>Imagine you have a giant, magical toy box, but you only want your best friends to be able to open it. So, you put a padlock on it and give a secret password to your friends. A Login System on the internet works the exact same way. When you type your username and password, you are whispering the secret password to the digital padlock. But doing this safely over the internet is incredibly complicated! The website has to scramble your password so spies can't read it, and it has to give you a special digital wristband so it doesn't forget who you are every time you click a new page.</p>
      <h3>Core Mechanisms</h3>
      <div class="step-block">
        <div class="step-num">Mechanism 1</div>
        <div class="step-body"><strong>Password Hashing</strong><br>Instead of saving "password123", the server runs your password through a one-way math formula called a "hash function" (like bcrypt). It stores a scramble like "J$9aZ...". When you log in, it hashes what you typed and compares it to the saved scramble.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Mechanism 2</div>
        <div class="step-body"><strong>Sessions & Cookies</strong><br>The internet (HTTP) has "amnesia". To keep you logged in, the server creates a temporary "Session" in its database and sends your browser a unique ID ticket called a "Cookie". Your browser attaches this Cookie to every future request.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Mechanism 3</div>
        <div class="step-body"><strong>Tokens / JWTs</strong><br>Checking the database for a session on every click is slow. Instead, the server creates a JSON Web Token (JWT), a digitally signed ticket containing your user data. The server verifies the digital signature mathematically without needing a database lookup!</div>
      </div>`,
    questions: [
      { q: "What one-way mathematical function prevents hackers from reading stored passwords?", a: "hashing", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What does the server give your browser to 'remember' you between page clicks?", a: "cookie", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What type of modern token allows the server to verify you without checking a database?", a: "JWT", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "Lesson 2: Analyze Login Flow & Compare Responses",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/auth_basics_lesson2.png" alt="Lesson 2: Analyze Login Flow & Compare Responses"></div>
      <h3>HTTP Response Codes</h3>
      <p>When a client submits authentication credentials, the server processes the request and returns an HTTP status code indicating the result. A <code>200 OK</code> response indicates successful authentication, while a <code>401 Unauthorized</code> response indicates that the provided credentials were invalid. Security analysts use the Network panel to observe these responses and infer application logic.</p>
      <p>Now that you know the theory, let's look at the Login Flow in action. When you submit a form, your browser securely sends an HTTP POST request to the server. Your objective is to open the target lab, test both valid and invalid logins, and compare the server's responses.</p>
      <h3>Practical Steps</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Launch the Lab</strong><br>Click the "Open Login Portal" button above to launch the target lab in a new tab. Open your Browser Developer Tools (F12) and go to the "Network" tab.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Test Invalid Login</strong><br>Try typing incorrect credentials (like test / test). Click Login. Look at the Network tab. Click on the request to <code>/api/auth-lab/login</code> and observe the 401 status.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Test Valid Login</strong><br>Now, log in with the correct credentials: Username: <code>admin</code>, Password: <code>admin123</code>. Observe the Network tab again. You should see a successful 200 OK response!</div>
      </div>`,
    questions: [
      { q: "What HTTP method is typically used to securely submit a login form?", a: "POST", hint: "Refer to the HTTP protocol details." },
      { q: "What HTTP status code is returned when you type the wrong password?", a: "401", hint: "Refer to the HTTP protocol details." },
      { q: "What HTTP status code indicates a valid, successful login?", a: "200", hint: "Refer to the HTTP protocol details." }
    ]
  },
  {
    title: "Lesson 3: Observe Session Cookies",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/auth_basics_lesson3.png" alt="Lesson 3: Observe Session Cookies"></div>
      <h3>Cookie Management</h3>
      <p>Cookies are small pieces of data sent from a website and stored on the user's computer by the user's web browser. When an authentication request is successful, the server includes a <code>Set-Cookie</code> header in its response. The browser automatically stores this cookie and appends it to all subsequent requests to that domain, effectively maintaining the authenticated session.</p>
      <p>As we learned in Lesson 1, the server uses Cookies to fix the internet's amnesia. When your login was successful, the server sent a "Set-Cookie" instruction to your browser. Your browser silently saved this cookie. Your objective is to use your Developer Tools to locate the exact session cookies the server gave you when you logged in as admin.</p>
      <h3>Practical Steps</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Authenticate</strong><br>Ensure you have successfully logged in as 'admin' in the target lab.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Open Storage Panel</strong><br>Open DevTools (F12) and navigate to the "Application" tab (Chrome/Edge) or "Storage" tab (Firefox).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Identify Cookies</strong><br>In the left sidebar, expand the "Cookies" section and click on the current domain. Look at the table of cookies. You will see the server has set a session ID and a token.</div>
      </div>`,
    questions: [
      { q: "What is the exact name of the cookie used for the session ID?", a: "session_id", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the name of the cookie used to store the token?", a: "auth_token", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Which HTTP header does the server use to tell the browser to store a cookie?", a: "Set-Cookie", hint: "Refer to the HTTP protocol details." }
    ]
  },
  {
    title: "Lesson 4: Decode the JWT",
    points: 60,
    html: `<div class="htb-diagram-container"><img src="../../../assets/auth_basics_lesson4.png" alt="Lesson 4: Decode the JWT"></div>
      <h3>JWT Data Exposure</h3>
      <p>A JSON Web Token (JWT) consists of three parts separated by dots: Header, Payload, and Signature. The Header and Payload are Base64Url encoded, NOT encrypted. Therefore, any sensitive data placed within the payload (such as roles, permissions, or PII) is publicly readable by anyone who intercepts the token. The signature only guarantees integrity, not confidentiality.</p>
      <p>You found the Token in the previous step! As you learned in Lesson 1, a JWT is used for stateless authentication. Crucially, the Header and Payload are NOT encrypted—they are only Base64 encoded. Anyone who finds the token can decode and read the data inside it! Your objective is to decode the payload section and extract the secret flag hidden inside.</p>
      <h3>Practical Steps</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Extract the Token</strong><br>In the Application/Storage tab where you found your cookies, find the 'auth_token' cookie. Double-click the value and copy the entire long string.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Decode the Payload</strong><br>Notice the two periods (.) separating the string. Open a new tab and go to a site like <code>jwt.io</code>, or use an online Base64 decoder. Paste the token.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Capture the Flag</strong><br>Look at the decoded "Payload" section. Read the JSON data carefully to find the hidden flag!</div>
      </div>`,
    questions: [
      { q: "Are the contents of a standard JWT encrypted or just encoded?", a: "encoded", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the hidden flag found inside the decoded JWT payload?", a: "flag{jwt_m4st3r_decoded}", hint: "Check the command reference blocks." }
    ]
  }
];
