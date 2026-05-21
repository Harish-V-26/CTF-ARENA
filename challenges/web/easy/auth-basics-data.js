const LESSONS = [
  {
    title: "Lesson 1: How Login Systems Work",
    points: 40,
    content: `THE SECRET CLUBHOUSE
Imagine you want to start a secret clubhouse in your backyard with a locked door. To let your friends in, you write their names and secret passwords on a notepad. When they come to the door, they tell you their password, you check your notepad, and if it matches, you unlock the door! This is exactly how a computer login system works. It checks your credentials (your username and password) against its internal database notepad to verify who you are before letting you access your profile.

THE PASSWORD SCRAMBLER (HASHING)
Saving passwords as plain text on the notepad is a terrible idea. If a bad guy steals your notepad, they get everyone's passwords! To prevent this, websites use a special scrambler machine called a "Hash Function" (like bcrypt). Instead of saving "admin123", the machine scrambles it into a long, crazy code like "J$9aZ...". When you log in, the website scrambles what you typed and compares it to the saved scramble. The cool thing is, you can never unscramble it back, so even if a hacker steals the notepad, they only see meaningless codes!

THE DIGITAL WRISTBAND (COOKIES & TOKENS)
Computers have a funny medical condition called "amnesia." Every time you click a link or visit a new page, the server completely forgets who you are and wants to ask for your password again! To fix this, when you log in successfully, the server stamps a digital wristband called a "Cookie" onto your browser. Your browser automatically shows this wristband to the server every time you click a page, proving you are still the logged-in user. Large websites also use JSON Web Tokens (JWTs), which are digital tickets signed by the server's secret pen, allowing fast checks without database lookups.`,
    questions: [
      { q: "What one-way mathematical function prevents hackers from reading stored passwords?", a: "hashing" },
      { q: "What does the server give your browser to 'remember' you between page clicks?", a: "cookie" },
      { q: "What type of modern token allows the server to verify you without checking a database?", a: "JWT" }
    ]
  },
  {
    title: "Lesson 2: Analyze Login Flow & Compare Responses",
    points: 50,
    content: `THE SECURE MESSAGE (POST)
When you type your password and click the login button, your browser packages your credentials inside a secure digital envelope. It sends this envelope to the server using a command called a "POST request." This method is used because it hides your password inside the envelope body rather than displaying it in the web address bar where everyone can see it. The server opens the envelope, runs the password scrambler, checks its database notepad, and replies with a special status number.

THE SERVER'S ANSWER
If you typed the right password, the server replies with a status code "200 OK". This is the server's way of saying: "Everything is perfect, come on in!" But if you typed a wrong password, the server replies with "401 Unauthorized", which means: "I don't know who you are, go away!" By looking at these status codes in your browser's Network monitor tab, you can see exactly how the server responds to different attempts.

PRACTICAL EXPLORATION
Let's see this in action! Click the "Open Login Portal" button above to launch your private lab target. Once the page loads, press the F12 key to open your Developer Tools and click on the "Network" tab. Try typing a wrong username and password, then click Login. Watch the Network tab and you will see a request to '/api/auth-lab/login' turn red with a 401 code. Now, type the correct admin credentials and watch the request turn green with a 200 OK code!`,
    questions: [
      { q: "What HTTP method is typically used to securely submit a login form?", a: "POST" },
      { q: "What HTTP status code is returned when you type the wrong password?", a: "401" },
      { q: "What HTTP status code indicates a valid, successful login?", a: "200" }
    ]
  },
  {
    title: "Lesson 3: Observe Session Cookies",
    points: 50,
    content: `THE AUTOMATIC TICKET
In Lesson 1, we learned that the server stamps a digital cookie wristband onto your browser so it doesn't forget you. When the server approved your login with a 200 OK code, it sent a special header command called "Set-Cookie." Your browser read this header and automatically saved the cookie in a secure vault on your computer. Now, every single time your browser asks the server for a new page, it silently clips the cookie to the request.

FINDING THE COOKIE VAULT
You can open this cookie vault and inspect your wristbands! Open your browser's Developer Tools (F12) and head over to the "Application" or "Storage" tab. On the left side menu, expand the "Cookies" section and click on the website's URL. You will see a list of cookies saved by the site. In this lab, the server has saved a cookie named "session_id" to keep track of your active session, and a second cookie named "auth_token" that holds your access token.

UNDERSTANDING THE FLAGS
If you look closely at the cookie table, you will see checkbox flags like "HttpOnly" and "Secure." If "HttpOnly" is checked, it means JavaScript code cannot read your cookie, protecting it from hacker script theft. If "Secure" is checked, it means the cookie is only sent over encrypted connections. Finding these cookies is a key step for hackers, because if they can copy the value of your session cookie and paste it into their own browser, they can access your account without knowing your password!`,
    questions: [
      { q: "What is the exact name of the cookie used for the session ID?", a: "session_id" },
      { q: "What is the name of the cookie used to store the token?", a: "auth_token" },
      { q: "Which HTTP header does the server use to tell the browser to store a cookie?", a: "Set-Cookie" }
    ]
  },
  {
    title: "Lesson 4: Decode the JWT",
    points: 60,
    content: `THE STATELSSS TICKET
You found the "auth_token" cookie in the previous lesson! This token is a JSON Web Token (JWT), which is a modern way for servers to remember you without using database memory. A JWT consists of three parts glued together with dots: the Header (describing the ticket), the Payload (containing your user details), and the Signature (proving the ticket is real). Because the signature is signed with the server's private key, the user cannot change the data without breaking the signature.

THE BASE64 DECODER
Here is the big catch: the Header and Payload of a JWT are not encrypted! They are only encoded in a format called Base64, which is just a fancy way of scrambling letters so computers can read them faster. Anyone who intercepts your token can copy it, paste it into a decoder website like jwt.io, and read every single piece of information inside. If the developer accidentally placed a secret code or a CTF flag inside the token payload, it is completely exposed!

YOUR CHALLENGE
Let's extract the flag from the JWT! Open your Developer Tools, go to the cookie vault in the Application tab, double-click the value of the "auth_token" cookie, and copy it. Open a new tab in your browser, visit a site like jwt.io, and paste the token into the box. Look at the decoded "Payload" section on the right. You will see your username, your role, and a secret flag hiding inside! Copy that flag, return to this tab, and paste it into the box below to complete your mission.`,
    questions: [
      { q: "Are the contents of a standard JWT encrypted or just encoded?", a: "encoded" },
      { q: "What is the hidden flag found inside the decoded JWT payload?", a: "flag{jwt_m4st3r_decoded}" }
    ]
  }
];
