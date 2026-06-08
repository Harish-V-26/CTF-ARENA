const LESSONS = [
  {
    title: "1. Authentication Weaknesses",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/auth_weaknesses_diagram.png" alt="Authentication Weaknesses"></div>
      <h3>Broken Authentication</h3>
      <p>Broken Authentication is a broad category of vulnerabilities that occur when an application fails to properly implement and protect identity verification, session management, or credential storage. It allows attackers to compromise passwords, keys, or session tokens, ultimately allowing them to assume the identities of other users, permanently taking over accounts and accessing sensitive data.</p>
      <p>Imagine you are trying to enter a super-secret treehouse club. To get inside, the club president stands at the door and asks for a secret handshake. Every single website in the world does this when they ask you for a username and a password. But what happens if the club president is really bad at his job? What if he lets people in who just guess the secret handshake, or what if he accidentally leaves a spare key under the doormat? Because the front door is broken, hackers can easily trick the guards, steal other people's ID cards, and walk right into the website pretending to be someone else.</p>
      <h3>Common Weaknesses</h3>
      <div class="step-block">
        <div class="step-num">Weakness 1</div>
        <div class="step-body"><strong>Brute Force & Weak Passwords</strong><br>Missing rate limits allow attackers to perform automated credential stuffing or dictionary attacks. If the password policy is weak, guessing passwords becomes trivial.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Weakness 2</div>
        <div class="step-body"><strong>Verbose Error Messages</strong><br>An error like "Username not found" vs "Invalid password" allows attackers to silently enumerate thousands of valid usernames on the system before launching targeted password attacks.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Weakness 3</div>
        <div class="step-body"><strong>Insecure Password Storage</strong><br>Storing passwords in plaintext or using outdated, unsalted hashes (like MD5) allows attackers to instantly crack the database using precomputed Rainbow Tables if a breach occurs.</div>
      </div>`,
    questions: [
      { q: "What is it called when a login page returns no limit on login attempts?", a: "Missing brute force protection (or no rate limiting)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What type of error message helps attackers enumerate valid usernames?", a: "Verbose error messages (e.g., 'Username not found')", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the recommended modern algorithm for storing passwords securely?", a: "bcrypt (or Argon2, scrypt, PBKDF2)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Why does storing passwords without salting allow rainbow table attacks?", a: "Identical passwords produce identical hashes, which can be precomputed", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What second authentication factor is considered the strongest form of MFA?", a: "Hardware security key (e.g., YubiKey / FIDO2)", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "2. Session Hijacking",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/auth_session_hijack_diagram.png" alt="Session Hijacking"></div>
      <h3>Session Hijacking</h3>
      <p>Session Hijacking (or Cookie Hijacking) is the exploitation of a valid computer session to gain unauthorized access. Once a user logs in, the server issues a session token. If an attacker intercepts or predicts this token, they can present it to the server and completely bypass the authentication process, impersonating the user without needing their credentials.</p>
      <p>Imagine you go to a giant amusement park. When you buy your ticket, the person at the front gate checks your ID and gives you a special, un-copyable wristband. For the rest of the day, you don't have to show your ID to ride the rollercoasters; you just flash your wristband! Websites use the exact same trick to keep you logged in. After you type your password correctly, the website gives your browser a special digital wristband called a "Session Token". If a sneaky thief steals your wristband right off your arm, they can put it on their own browser. The website sees the wristband and thinks the hacker is YOU!</p>
      <h3>Attack Vectors & Prevention</h3>
      <div class="step-block">
        <div class="step-num">Vector 1</div>
        <div class="step-body"><strong>Session Sniffing & XSS</strong><br>Capturing session cookies over unencrypted HTTP (prevented by the <code>Secure</code> flag) or stealing them via JavaScript execution in an XSS attack (prevented by the <code>HttpOnly</code> flag).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Vector 2</div>
        <div class="step-body"><strong>Session Fixation</strong><br>The attacker gives the victim a known session ID before they log in. Prevented by always regenerating the session ID upon login.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Vector 3</div>
        <div class="step-body"><strong>Predictable Tokens</strong><br>Using sequential or timestamp-based tokens allows attackers to guess other users' active sessions. Tokens must always be cryptographically random.</div>
      </div>`,
    questions: [
      { q: "What attack gives a victim a known session ID before they log in?", a: "Session fixation", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What cookie flag prevents transmission of the cookie over unencrypted HTTP?", a: "Secure", hint: "Check the command reference blocks." },
      { q: "What cookie flag prevents JavaScript from reading the session cookie via document.cookie?", a: "HttpOnly", hint: "Check the command reference blocks." },
      { q: "Should session tokens be predictable or cryptographically random?", a: "Cryptographically random", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What cookie attribute (SameSite=___) prevents the browser from sending cookies with cross-site requests?", a: "Strict", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "3. JWT & Modern Auth Vulnerabilities",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/auth_jwt_diagram.png" alt="JWT Tokens"></div>
      <h3>JSON Web Tokens (JWT)</h3>
      <p>A JSON Web Token (JWT) is an open standard that securely transmits information between parties as a JSON object, digitally signed. Misconfigurations in verifying the signature (such as trusting user-supplied algorithms or using weak secrets) lead to severe cryptographic vulnerabilities.</p>
      <p>Think about how normal movie tickets work. When you hand the ticket to the usher, they check a giant list to make sure the ticket is real. Now imagine a super-advanced movie ticket. Instead of checking a list, the usher just looks at a special, magical stamp on the ticket. The stamp proves the ticket is real instantly! Modern websites use these super-tickets, called JWTs. This token contains a mathematical signature (the magical stamp) that proves who you are instantly. But if programmers make mistakes, hackers forge their own magical stamps and sneak into the website for free!</p>
      <h3>JWT Flaws</h3>
      <div class="step-block">
        <div class="step-num">Flaw 1</div>
        <div class="step-body"><strong>Algorithm Confusion (alg:none)</strong><br>An attacker changes the header's algorithm to <code>"none"</code> and removes the signature. If the server implicitly trusts the header, it accepts the unsigned token as valid!</div>
      </div>
      <div class="step-block">
        <div class="step-num">Flaw 2</div>
        <div class="step-body"><strong>Weak HMAC Secrets</strong><br>If the server uses a weak, guessable string (like "secret123") to sign the JWT, attackers can crack the signature offline and forge tokens as an Administrator.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Flaw 3</div>
        <div class="step-body"><strong>Sensitive Payload Data</strong><br>The payload of a JWT is merely base64-encoded, not encrypted. Storing passwords or API keys inside the payload exposes it to anyone who intercepts the token.</div>
      </div>`,
    questions: [
      { q: "What are the three parts of a JWT token separated by dots?", a: "Header, Payload, Signature", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What JWT attack changes the algorithm to 'none' and removes the signature?", a: "Algorithm confusion / alg:none attack", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Is the JWT payload encrypted or just base64-encoded?", a: "Just base64-encoded (NOT encrypted)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What JWT claim defines when the token expires?", a: "exp (expiration)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What hashcat mode is used to crack JWT HMAC signatures?", a: "16500", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "4. OAuth 2.0 & SSO Vulnerabilities",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/auth_oauth_diagram.png" alt="OAuth 2.0"></div>
      <h3>What is OAuth 2.0?</h3>
      <p>OAuth 2.0 is the industry-standard authorization protocol that allows third-party services to exchange web resources on behalf of a user without revealing their credentials. It uses Authorization Codes and Access Tokens to securely delegate access. Vulnerabilities occur when redirect URIs are poorly validated or when CSRF protections are omitted.</p>
      <p>Have you ever tried to sign up for a new game, and instead of inventing a password, you click "Sign in with Google"? That is powered by OAuth 2.0! Imagine you want to hire a dog walker. Instead of giving the dog walker the master key to your entire house, you call the security guard at your neighborhood gate and say, "Hey, it is okay to let this dog walker into my yard, but ONLY into the yard." OAuth works exactly like that! It is a secure way to let an app access some of your information without giving them your secret password.</p>
      <h3>Common Flow Exploits</h3>
      <div class="step-block">
        <div class="step-num">Exploit 1</div>
        <div class="step-body"><strong>Missing State Parameter (CSRF)</strong><br>The <code>state</code> parameter acts as a CSRF token. Without it, an attacker can trick the victim into submitting an authorization code, linking the victim's account to the attacker's third-party login.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Exploit 2</div>
        <div class="step-body"><strong>Redirect URI Manipulation</strong><br>If the identity provider doesn't strictly whitelist the <code>redirect_uri</code>, an attacker can modify the URL to point to <code>https://attacker.com</code>, stealing the victim's secret authorization code!</div>
      </div>
      <div class="step-block">
        <div class="step-num">Exploit 3</div>
        <div class="step-body"><strong>Implicit Flow Risks</strong><br>The deprecated Implicit Flow returns the access token directly in the URL fragment, exposing it in browser history. Modern implementations use Authorization Code + PKCE instead.</div>
      </div>`,
    questions: [
      { q: "What OAuth 2.0 parameter acts as a CSRF token to prevent cross-site request forgery in the auth flow?", a: "state", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What OAuth attack redirects the authorization code to an attacker-controlled URL?", a: "Redirect URI manipulation", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What OAuth extension should mobile and SPA apps use instead of client secrets?", a: "PKCE (Proof Key for Code Exchange)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Why is the OAuth Implicit Flow deprecated?", a: "It returns the access_token directly in the URL, exposing it in browser history and referrer headers", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What SAML attack manipulates the XML signature to validate an unsigned malicious assertion?", a: "XML Signature Wrapping (XSW)", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "5. Multi-Factor Authentication Deep Dive",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/auth_mfa_diagram.png" alt="MFA Deep Dive"></div>
      <h3>Multi-Factor Authentication (MFA)</h3>
      <p>Multi-Factor Authentication (MFA) requires users to provide two or more verification factors to gain access. Factors are: Something you KNOW (password), Something you HAVE (phone), and Something you ARE (biometrics). SMS is vulnerable to interception, while hardware security keys provide cryptographic, phishing-resistant defense.</p>
      <p>Imagine you buy the strongest metal door in the world for your house, but you accidentally drop the key on the sidewalk. Passwords are like that key. Even if a website's security is amazing, if a hacker tricks you into giving them your password, they walk right in. MFA adds a completely different, second lock to the door. Even if the hacker steals your password key, they still need the second key (like a special code sent to your physical cell phone) to get inside.</p>
      <h3>MFA Bypass Techniques</h3>
      <div class="step-block">
        <div class="step-num">Bypass 1</div>
        <div class="step-body"><strong>SIM Swapping (Attacking SMS)</strong><br>An attacker social-engineers a mobile carrier into transferring the victim's phone number to the attacker's SIM card. All SMS-based OTPs are routed to the attacker.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Bypass 2</div>
        <div class="step-body"><strong>MFA Fatigue (Push Bombing)</strong><br>An attacker repeatedly triggers MFA push notifications to the victim's phone at 3:00 AM. Annoyed, the victim eventually taps "Approve" just to make it stop, granting access.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Bypass 3</div>
        <div class="step-body"><strong>Attacker-in-the-Middle (AiTM) Phishing</strong><br>Using tools like Evilginx2, attackers set up a reverse proxy. When the victim enters their TOTP code, the proxy forwards it instantly and steals the valid session cookie.</div>
      </div>`,
    questions: [
      { q: "What social engineering attack transfers a victim's phone number to an attacker's SIM card to steal SMS OTPs?", a: "SIM swapping", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What MFA bypass sends repeated push notification requests until the victim approves one?", a: "MFA fatigue / push bombing", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What tool acts as a reverse proxy to steal session cookies in real-time, bypassing TOTP MFA?", a: "Evilginx2 (or Modlishka)", hint: "Look for the specific tools mentioned in the lesson." },
      { q: "What is the only MFA type that is resistant to real-time phishing attacks?", a: "Hardware security keys (FIDO2/WebAuthn)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What 2022 company was breached via MFA fatigue (push bombing) by an 18-year-old attacker?", a: "Uber", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "6. Secure Authentication Implementation",
    points: 10,
    html: `<div class="htb-diagram-container"><img src="../../../assets/auth_secure_impl_diagram.png" alt="Secure Implementation"></div>
      <h3>Building a Secure Architecture</h3>
      <p>A secure authentication implementation must unify strong password hashing algorithms (Argon2, bcrypt), rigorous session management controls, rate limiting, and robust password reset workflows. Security is a chain; if an application uses military-grade hashing but allows infinite guesses, the entire system is compromised.</p>
      <p>Imagine you are the architect building a massive bank vault. You can't just slap a padlock on a wooden door. You need thick steel walls, laser beams, security cameras, and guards who check IDs perfectly every single time. Building a secure login system is exactly like building that bank vault. If a programmer gets lazy and forgets to turn on the security cameras (like logging failed login attempts), hackers will find that mistake and break in.</p>
      <h3>Implementation Best Practices</h3>
      <div class="step-block">
        <div class="step-num">Practice 1</div>
        <div class="step-body"><strong>Adaptive Hashing</strong><br>Use memory-hard hashing algorithms like Argon2 or bcrypt. Never use fast hashes like MD5 or SHA-256 for passwords.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Practice 2</div>
        <div class="step-body"><strong>Session & Cookie Security</strong><br>Always regenerate the session ID immediately after a successful login to prevent Session Fixation. Flag all session cookies with <code>HttpOnly</code>, <code>Secure</code>, and <code>SameSite=Strict</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Practice 3</div>
        <div class="step-body"><strong>Secure Account Recovery</strong><br>Generate password reset tokens using cryptographically secure random number generators. Store only the hashed token in the database, expire it within 15-30 minutes, and strictly invalidate it upon its first use.</div>
      </div>`,
    questions: [
      { q: "What bcrypt cost factor value (rounds) is recommended for a good balance of security and performance?", a: "12 (rounds=12)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What PHP function is the correct way to hash a password using Argon2?", a: "password_hash($password, PASSWORD_ARGON2ID)", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "After a successful login, what must the server do to the session ID to prevent session fixation?", a: "Regenerate (rotate) the session ID", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What security measure on password reset tokens prevents them from being used more than once?", a: "Invalidate/delete the token after first use", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What Python module provides cryptographically secure random token generation for password reset links?", a: "secrets (secrets.token_urlsafe())", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  }
];
