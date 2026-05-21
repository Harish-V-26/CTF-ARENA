const LESSONS = [
  {
    title: "1. The Weak Locks (Broken Authentication)",
    points: 10,
    content: `WHAT IS AUTHENTICATION?
Imagine you are building a secret clubhouse in your backyard, and you only want your best friends to get inside. You create a special password: "banana." When a friend comes to the door and whispers "banana" through the mail slot, you know it is really them, and you let them in! This process of checking if someone is who they say they are is called "Authentication." In the computer world, websites use passwords to authenticate users. When you type your password, the website checks its records to make sure you are the real owner of the account. 

WHAT IS BROKEN AUTHENTICATION?
Now, imagine you built the clubhouse door, but you made a huge mistake: you put the lock on the inside, but you left a giant hole in the door where anyone can reach their hand through and slide the lock open! That is "Broken Authentication." It means the website's check-in system has a terrible mistake in its design or code, and hackers can easily bypass the password screen entirely. Sometimes developers build login screens that let you guess passwords a million times without ever locking you out, or they send your password over the air in plain text so anyone standing nearby can sniff it out.

VERBOSE ERROR TRAPS
One very common mistake is when the login screen is too chatty! If you type the wrong username, the screen says: "ERROR: THAT USERNAME DOES NOT EXIST!" If you type a real username but the wrong password, the screen says: "ERROR: WRONG PASSWORD FOR THAT USER!" This is a huge help to hackers. It means they can try a thousand usernames until the screen says "Wrong password," and instantly they know they found a real user! This is called "Username Enumeration." A good website must always be quiet and only say "Invalid credentials," no matter what part of the login you got wrong.`,
    questions: [
      { q: "What is the process of checking if someone is who they say they are called?", a: "Authentication" },
      { q: "What is it called when a website's login system has a mistake that hackers can exploit?", a: "Broken Authentication" },
      { q: "What is the name for the mistake where a login page tells you exactly if the username or password was wrong?", a: "Verbose error messages" },
      { q: "What does the website say instead of 'Username not found' to stay safe?", a: "Invalid credentials" },
      { q: "What is it called when a hacker finds a list of real usernames by testing them on a chatty login screen?", a: "Username Enumeration" }
    ]
  },
  {
    title: "2. The Copycat Keycard (Session Hijacking)",
    points: 10,
    content: `THE DIGITAL WRISTBAND
In our earlier lessons, we learned that websites have "goldfish memory." Once you log in, they instantly forget who you are. To fix this, the website gives your browser a special digital wristband called a "Session Cookie." The wristband has a long, random code on it. Every time you click a new page, your browser shows the wristband to the server, and the server lets you in without asking for your password again. But what if a sneaky thief sneaks up behind you, takes a photo of your wristband, and makes an exact copy of the code? That is called "Session Hijacking."

HOW THE THEFT HAPPENS
Hackers use a few sneaky tricks to steal your digital wristband. One trick is called "Session Fixation." The hacker creates a wristband code first, sends you a link with that exact code, and tricks you into logging in. Once you log in, the website activates that wristband! Since the hacker already knows the code, they just put on their copy of the wristband and instantly walk into your account. Another trick is stealing the wristband using malicious scripts (XSS). If a hacker can run JavaScript in your browser, they can type "document.cookie" to grab the code and email it to themselves.

PROTECTING THE WRISTBAND
To stop these cookie thieves, programmers use special "cookie flags." The most important flag is called "HttpOnly." When you set this flag, the browser builds a thick wall around the cookie that prevents any JavaScript script from ever reading it. Even if a hacker hacks the website, their scripts are blind to the cookie! Another flag is "Secure," which tells the browser: "Only send this wristband over encrypted HTTPS connections, never over regular HTTP where spies can sniff it out of the air." Finally, the "SameSite=Strict" flag stops the browser from sharing your wristband if you click a link from a different, untrusted website.`,
    questions: [
      { q: "What is the digital wristband called that the server gives your browser after you log in?", a: "Session Cookie" },
      { q: "What is it called when a hacker steals your wristband and pretends to be you?", a: "Session Hijacking" },
      { q: "What cookie flag blocks JavaScript from reading your session cookie?", a: "HttpOnly" },
      { q: "What cookie flag ensures the wristband is only sent over encrypted connections?", a: "Secure" },
      { q: "What cookie attribute stops the browser from sending cookies with cross-site requests?", a: "Strict" }
    ]
  },
  {
    title: "3. The Clear Token (JWT Attacks)",
    points: 10,
    content: `WHAT IS A JWT?
Modern websites don't always use simple cookies. Instead, they use a special, fancy ticket called a "JSON Web Token," or JWT for short. Imagine a movie ticket that is split into three parts separated by dots: the Header (which says what kind of pen was used to sign the ticket), the Payload (which has your name and what seat you have), and the Signature (a special scribble from the theater manager proving the ticket is real). JWTs are very popular because they contain all your information right inside the ticket, so the server doesn't have to look up your name in a database every time you click a page.

THE FAKE SIGNATURE
Here is the catch: the information inside a JWT is not encrypted! It is just written in a format called "base64url," which is just a fancy way of writing letters so computers can read them faster. Anyone can take a JWT, put it into a free online decoder (like jwt.io), and read exactly what is written inside. If a hacker wants to change their role from "user" to "admin," they can easily rewrite the text. But if they change the text, the manager's scribble (the signature) at the end won't match anymore, and the server will reject it. 

ALGORITHM TRICKS
Hackers have found clever ways to bypass the signature. In the header of the ticket, there is a field called "alg" that tells the server how to verify the signature. Hackers will change this field to "none" and delete the signature entirely! If the server is poorly coded, it reads the header, sees "none," and says, "Oh, I guess I don't need to check the signature on this ticket!" The server then lets the hacker in with their modified payload. To prevent this, programmers must write strict code that completely rejects any tickets that use the "none" algorithm, and use super-strong keys to sign their tickets so hackers can't guess them.`,
    questions: [
      { q: "What are the three parts of a JWT ticket separated by dots?", a: "Header, Payload, Signature" },
      { q: "Is the information inside a JWT ticket encrypted or just encoded?", a: "Just encoded (base64url)" },
      { q: "What attack changes the signature type to 'none' to bypass verification?", a: "Algorithm confusion" },
      { q: "What claim inside the payload tells the server when the ticket is no longer valid?", a: "exp" },
      { q: "What online website do developers and hackers use to decode and read JWTs?", a: "jwt.io" }
    ]
  },
  {
    title: "4. Single Sign-On (OAuth 2.0)",
    points: 10,
    content: `SIGN IN WITH GOOGLE
Have you ever visited a new website and clicked a big button that says "Sign in with Google" or "Sign in with GitHub"? This is called "Single Sign-On" (SSO), and it uses a special set of rules called "OAuth 2.0." Instead of creating a new username and password for every single site on the internet, you let Google verify who you are, and Google sends a special "Authorization Code" to the new website to prove you are allowed in. This is much safer because you don't have to trust the new website with your real password!

THE STOLEN CODE
OAuth is very safe when built correctly, but if a programmer makes a mistake, hackers can steal your login ticket. When you sign in with Google, Google needs to send you back to the new website. It uses an address called the "redirect_uri." If the programmer doesn't write strict rules, a hacker can change this address to "attacker.com." Google will verify your identity and then accidentally send your secret authorization code straight to the hacker's server! The hacker grabs the code, logs in, and takes over your account.

THE STATE PROTECTOR
To prevent hackers from tricking you into linking your account to their session, OAuth uses a special parameter called "state." The state parameter is like a secret token the website generates before sending you to Google. When you return, the website checks if the state token matches. If it doesn't match, the website knows a hacker is trying to play a trick, and it stops the login. Programmers must also use a modern system called PKCE (Proof Key for Code Exchange) for mobile apps, which makes sure that even if a hacker intercepts the code, they cannot use it without knowing a secret password.`,
    questions: [
      { q: "What is the standard protocol used for 'Sign in with Google' called?", a: "OAuth 2.0" },
      { q: "What parameter acts like a CSRF token to prevent tricks in the OAuth flow?", a: "state" },
      { q: "What vulnerability happens when Google sends the login code to a hacker-controlled website?", a: "Redirect URI manipulation" },
      { q: "What extension should mobile apps use to keep authorization codes extra safe?", a: "PKCE" },
      { q: "Is the Implicit Flow considered safe today? (yes/no)", a: "no" }
    ]
  }
];
