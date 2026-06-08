const LESSONS = [
  {
    title: "Lesson 1: How Login Systems Work",
    points: 40,
    content: `THEORY & CONCEPTS:
WHAT IS A LOGIN SYSTEM?
Imagine you have a giant, magical toy box, but you only want your best friends to be able to open it. If you just left it open in the park, anyone could take your toys! So, you put a padlock on it and give a secret password to your friends. A Login System on the internet works the exact same way. When you visit a website like a video game or a bank, the website needs to know if you are the real owner of the account before it lets you see your private stuff. When you type your username and password and click "Login", you are basically whispering the secret password to the digital padlock. But doing this safely over the internet is actually incredibly complicated! The website has to scramble your password so spies can't read it, and it has to give you a special digital wristband so it doesn't forget who you are every time you click a new page. Let's look at exactly what happens behind the scenes when you click that Login button:


1. Password Hashing (How and Why)
WHY: If a website stores your password in plain text and gets hacked, hackers get your password. 
HOW: Instead of saving "password123", the server runs your password through a one-way math formula called a "hash function" (like bcrypt). It stores a scramble like "J$9aZ...". When you log in, it hashes what you typed and compares it to the saved scramble.

2. Sessions & Cookies (How and Why)
WHY: The internet (HTTP) has "amnesia"—it forgets who you are every time you click a link. 
HOW: To keep you logged in, the server creates a temporary "Session" in its database. It then sends your browser a unique ID ticket called a "Cookie" (e.g., session_id=abc890). Your browser automatically attaches this Cookie to every future request, proving you are the same person who just logged in.

3. Tokens / JWTs (How and Why)
WHY: Checking the database for a session on every single click is slow for large apps like Netflix or Facebook.
HOW: Instead of a database session, the server creates a JSON Web Token (JWT). This is a digitally signed ticket that contains your actual user data (like "user: admin"). The server gives this Token to your browser. Your browser sends it back, and the server just verifies the digital signature mathematically without needing a database lookup!

YOUR TASK:
Read the concepts above carefully. Once you understand the 'how' and 'why' of login systems, answer the questions below to prove your knowledge. Then we will move on to the practical tasks where you will observe these in action!`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/auth_basics_lesson1.png" alt="Lesson 1: How Login Systems Work"></div>

THEORY & CONCEPTS:
WHAT IS A LOGIN SYSTEM?
Imagine you have a giant, magical toy box, but you only want your best friends to be able to open it. If you just left it open in the park, anyone could take your toys! So, you put a padlock on it and give a secret password to your friends. A Login System on the internet works the exact same way. When you visit a website like a video game or a bank, the website needs to know if you are the real owner of the account before it lets you see your private stuff. When you type your username and password and click "Login", you are basically whispering the secret password to the digital padlock. But doing this safely over the internet is actually incredibly complicated! The website has to scramble your password so spies can't read it, and it has to give you a special digital wristband so it doesn't forget who you are every time you click a new page. Let's look at exactly what happens behind the scenes when you click that Login button:


1. Password Hashing (How and Why)
WHY: If a website stores your password in plain text and gets hacked, hackers get your password. 
HOW: Instead of saving "password123", the server runs your password through a one-way math formula called a "hash function" (like bcrypt). It stores a scramble like "J$9aZ...". When you log in, it hashes what you typed and compares it to the saved scramble.

2. Sessions & Cookies (How and Why)
WHY: The internet (HTTP) has "amnesia"—it forgets who you are every time you click a link. 
HOW: To keep you logged in, the server creates a temporary "Session" in its database. It then sends your browser a unique ID ticket called a "Cookie" (e.g., session_id=abc890). Your browser automatically attaches this Cookie to every future request, proving you are the same person who just logged in.

3. Tokens / JWTs (How and Why)
WHY: Checking the database for a session on every single click is slow for large apps like Netflix or Facebook.
HOW: Instead of a database session, the server creates a JSON Web Token (JWT). This is a digitally signed ticket that contains your actual user data (like "user: admin"). The server gives this Token to your browser. Your browser sends it back, and the server just verifies the digital signature mathematically without needing a database lookup!

YOUR TASK:
Read the concepts above carefully. Once you understand the 'how' and 'why' of login systems, answer the questions below to prove your knowledge. Then we will move on to the practical tasks where you will observe these in action!`,
    questions: [
      { q: "What one-way mathematical function prevents hackers from reading stored passwords?", a: "hashing" },
      { q: "What does the server give your browser to 'remember' you between page clicks?", a: "cookie" },
      { q: "What type of modern token allows the server to verify you without checking a database?", a: "JWT" }
    ]
  },
  {
    title: "Lesson 2: Analyze Login Flow & Compare Responses",
    points: 50,
    content: `WHAT TO LEARN:
Now that you know the theory, let's look at the Login Flow in action. When you submit a form, your browser securely sends an HTTP POST request to the server. 
The server will respond with an HTTP Status Code:
- 200 OK: Valid login! The server accepts your credentials.
- 401 Unauthorized: Invalid login! The server rejects you.

WHAT TO DO:
Your objective is to open the target lab, test both valid and invalid logins, and compare the server's responses.

HOW TO DO IT:
1. Click the "Open Login Portal" button above to launch the target lab in a new tab.
2. In the target tab, open your Browser Developer Tools (F12) and go to the "Network" tab.
3. Try typing incorrect credentials (like test / test). Click Login. 
4. Look at the Network tab. Click on the request to '/api/auth-lab/login' and observe the 401 status.
5. Now, log in with the correct credentials:
   Username: admin
   Password: admin123
6. Observe the Network tab again. You should see a successful 200 OK response!

YOUR TASK:
Complete the practical steps above. Compare how the application handles good and bad passwords, then answer the questions below.`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/auth_basics_lesson2.png" alt="Lesson 2: Analyze Login Flow & Compare Responses"></div>

WHAT TO LEARN:
Now that you know the theory, let's look at the Login Flow in action. When you submit a form, your browser securely sends an HTTP POST request to the server. 
The server will respond with an HTTP Status Code:
- 200 OK: Valid login! The server accepts your credentials.
- 401 Unauthorized: Invalid login! The server rejects you.

WHAT TO DO:
Your objective is to open the target lab, test both valid and invalid logins, and compare the server's responses.

HOW TO DO IT:
1. Click the "Open Login Portal" button above to launch the target lab in a new tab.
2. In the target tab, open your Browser Developer Tools (F12) and go to the "Network" tab.
3. Try typing incorrect credentials (like test / test). Click Login. 
4. Look at the Network tab. Click on the request to '/api/auth-lab/login' and observe the 401 status.
5. Now, log in with the correct credentials:
   Username: admin
   Password: admin123
6. Observe the Network tab again. You should see a successful 200 OK response!

YOUR TASK:
Complete the practical steps above. Compare how the application handles good and bad passwords, then answer the questions below.`,
    questions: [
      { q: "What HTTP method is typically used to securely submit a login form?", a: "POST" },
      { q: "What HTTP status code is returned when you type the wrong password?", a: "401" },
      { q: "What HTTP status code indicates a valid, successful login?", a: "200" }
    ]
  },
  {
    title: "Lesson 3: Observe Session Cookies",
    points: 50,
    content: `WHAT TO LEARN:
As we learned in Lesson 1, the server uses Cookies to fix HTTP's amnesia. When your login was successful (200 OK), the server sent a "Set-Cookie" instruction to your browser. Your browser silently saved this cookie.

WHAT TO DO:
Your objective is to use your Developer Tools to locate the exact session cookies the server gave you when you logged in as admin.

HOW TO DO IT:
1. Ensure you have successfully logged in as 'admin' in the target lab.
2. Open DevTools (F12) and navigate to the "Application" tab (Chrome/Edge) or "Storage" tab (Firefox).
3. In the left sidebar, expand the "Cookies" section and click on the current domain.
4. Look at the table of cookies. You will see the server has set a session ID and a token.

YOUR TASK:
Find the cookie storage panel and identify the exact names of the cookies set by the server. Answer the questions below to prove you can observe session cookies.`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/auth_basics_lesson3.png" alt="Lesson 3: Observe Session Cookies"></div>

WHAT TO LEARN:
As we learned in Lesson 1, the server uses Cookies to fix HTTP's amnesia. When your login was successful (200 OK), the server sent a "Set-Cookie" instruction to your browser. Your browser silently saved this cookie.

WHAT TO DO:
Your objective is to use your Developer Tools to locate the exact session cookies the server gave you when you logged in as admin.

HOW TO DO IT:
1. Ensure you have successfully logged in as 'admin' in the target lab.
2. Open DevTools (F12) and navigate to the "Application" tab (Chrome/Edge) or "Storage" tab (Firefox).
3. In the left sidebar, expand the "Cookies" section and click on the current domain.
4. Look at the table of cookies. You will see the server has set a session ID and a token.

YOUR TASK:
Find the cookie storage panel and identify the exact names of the cookies set by the server. Answer the questions below to prove you can observe session cookies.`,
    questions: [
      { q: "What is the exact name of the cookie used for the session ID?", a: "session_id" },
      { q: "What is the name of the cookie used to store the token?", a: "auth_token" },
      { q: "Which HTTP header does the server use to tell the browser to store a cookie?", a: "Set-Cookie" }
    ]
  },
  {
    title: "Lesson 4: Decode the JWT",
    points: 60,
    content: `WHAT TO LEARN:
You found the Token in the previous step! As you learned in Lesson 1, a JSON Web Token (JWT) is used for stateless authentication. 
A JWT has three parts separated by dots (.): Header.Payload.Signature.
Crucially, the Header and Payload are NOT encrypted—they are only Base64 encoded. Anyone who finds the token can decode and read the data inside it!

WHAT TO DO:
Your objective is to find the JWT token you received, decode the payload section, and extract the secret flag hidden inside.

HOW TO DO IT:
1. In the Application/Storage tab where you found your cookies, find the 'auth_token' cookie.
2. Double-click the value and copy the entire long string.
3. Notice the two periods (.) separating the string into three parts.
4. Open a new tab and go to a site like jwt.io, or use an online Base64 decoder.
5. Paste the token. Look at the decoded "Payload" section.
6. Read the JSON data carefully to find the hidden flag!

YOUR TASK:
Complete the lab by copying your JWT, decoding it, and extracting the secret flag. Enter the flag below to finish the Authentication Basics lab!`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/auth_basics_lesson4.png" alt="Lesson 4: Decode the JWT"></div>

WHAT TO LEARN:
You found the Token in the previous step! As you learned in Lesson 1, a JSON Web Token (JWT) is used for stateless authentication. 
A JWT has three parts separated by dots (.): Header.Payload.Signature.
Crucially, the Header and Payload are NOT encrypted—they are only Base64 encoded. Anyone who finds the token can decode and read the data inside it!

WHAT TO DO:
Your objective is to find the JWT token you received, decode the payload section, and extract the secret flag hidden inside.

HOW TO DO IT:
1. In the Application/Storage tab where you found your cookies, find the 'auth_token' cookie.
2. Double-click the value and copy the entire long string.
3. Notice the two periods (.) separating the string into three parts.
4. Open a new tab and go to a site like jwt.io, or use an online Base64 decoder.
5. Paste the token. Look at the decoded "Payload" section.
6. Read the JSON data carefully to find the hidden flag!

YOUR TASK:
Complete the lab by copying your JWT, decoding it, and extracting the secret flag. Enter the flag below to finish the Authentication Basics lab!`,
    questions: [
      { q: "Are the contents of a standard JWT encrypted or just encoded?", a: "encoded" },
      { q: "What is the hidden flag found inside the decoded JWT payload?", a: "flag{jwt_m4st3r_decoded}" }
    ]
  }
];
