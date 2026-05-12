const LESSONS = [
  {
    title: "What is Cryptography?",
    points: 10,
    content: `Cryptography is one of the oldest and most critical pillars of cybersecurity. The word itself comes from two Greek words:
  - "kryptos" meaning hidden or secret
  - "graphein" meaning to write

So cryptography literally means "secret writing."

In modern terms, cryptography is the science and practice of securing information by transforming it into an unreadable format so that only authorized parties can access and understand it. It is the backbone of secure communications across the internet — from online banking and messaging apps to password storage and digital signatures.

============= WHY CRYPTOGRAPHY MATTERS =============

Every time you do any of the following, cryptography is at work:
  - Log into a website (your password is hashed)
  - Send a message on WhatsApp (end-to-end encryption)
  - Make an online payment (TLS/SSL encrypts the connection)
  - Connect to a VPN (encrypted tunnel)
  - Verify a software download (hash integrity check)

Without cryptography, anyone on the same network could read your passwords, messages, and financial data in plain text.

============= CRYPTOGRAPHY vs CRYPTANALYSIS =============

These two fields are often confused but are actually opposites:

  Cryptography:  The art of CREATING secure codes and ciphers.
                 Goal: Protect information.

  Cryptanalysis: The art of BREAKING codes and ciphers.
                 Goal: Defeat cryptographic protections.

  Cryptology:    The umbrella term that covers BOTH
                 cryptography and cryptanalysis.

In CTF competitions, you will use cryptanalysis techniques to break weak or improperly implemented cryptographic systems.

============= BRIEF HISTORY =============

Cryptography has been used for thousands of years:
  - 1900 BC: Egyptian scribes used non-standard hieroglyphs
  - 500 BC:  Spartan military used the Scytale cipher
  - 100 BC:  Julius Caesar used the Caesar Cipher (shift cipher)
  - 1467:    Leon Alberti invented the polyalphabetic cipher
  - 1918:    The Enigma machine was invented (broken in WWII)
  - 1976:    Diffie-Hellman key exchange published
  - 1977:    RSA algorithm invented
  - 2001:    AES (Advanced Encryption Standard) adopted

Today, cryptography is entirely mathematical and computational. Modern encryption algorithms are designed to be practically impossible to break without the correct key.`,
    questions: [
      { q: "What two Greek words does 'cryptography' come from?", a: "kryptos (hidden) and graphein (to write)" },
      { q: "What is the difference between cryptography and cryptanalysis?", a: "Cryptography creates secure codes; cryptanalysis breaks them" },
      { q: "What umbrella term covers both cryptography and cryptanalysis?", a: "Cryptology" },
      { q: "What ancient Roman leader used a famous shift cipher?", a: "Julius Caesar" },
      { q: "What modern encryption standard was adopted in 2001?", a: "AES (Advanced Encryption Standard)" }
    ]
  },
  {
    title: "The CIA Triad",
    points: 10,
    content: `The CIA Triad is the foundational model for information security. It stands for Confidentiality, Integrity, and Availability. Every security measure you encounter maps back to one or more of these three principles.

============= 1. CONFIDENTIALITY =============

Definition: Ensuring that information is accessible ONLY to those who are authorized to view it.

Confidentiality means keeping secrets secret. If you send a private message to a friend, confidentiality ensures that no one else can read that message — not hackers, not your ISP, not even the platform provider (in the case of end-to-end encryption).

How cryptography provides confidentiality:
  - Encryption: Transforms readable data (plaintext) into unreadable data (ciphertext). Only someone with the correct decryption key can reverse the process.
  - Access Controls: Passwords, biometrics, and multi-factor authentication restrict who can access data.
  - Data Classification: Labeling data as public, internal, confidential, or top-secret to control access levels.

Real-world examples:
  - HTTPS encrypts web traffic so attackers can't sniff it
  - Full-disk encryption (BitLocker, FileVault) protects data if your laptop is stolen
  - Database encryption protects stored sensitive records

Threats to confidentiality:
  - Eavesdropping / Man-in-the-Middle attacks
  - Data breaches and leaks
  - Social engineering (tricking people into revealing secrets)
  - Weak or broken encryption algorithms

============= 2. INTEGRITY =============

Definition: Ensuring that data has NOT been altered, tampered with, or corrupted — either in storage or during transmission.

Integrity answers the question: "Is this data exactly the same as when it was originally created or sent?"

How cryptography provides integrity:
  - Hashing: Produces a fixed-size fingerprint (hash) of data. If even one bit of the data changes, the hash changes completely (this is called the avalanche effect).
  - Digital Signatures: The sender signs a message with their private key. The receiver verifies it with the sender's public key, confirming both integrity AND authenticity.
  - Message Authentication Codes (MACs): A keyed hash that verifies both data integrity and the identity of the sender.

Real-world examples:
  - File download checksums (SHA-256 hash verification)
  - Git commits use SHA-1 hashes to track changes
  - Digital signatures on software updates
  - Blockchain uses hashing to ensure transaction integrity

Threats to integrity:
  - Man-in-the-Middle attacks modifying data in transit
  - Malware altering files on disk
  - SQL injection modifying database records
  - Bit-flipping attacks on encrypted data

============= 3. AVAILABILITY =============

Definition: Ensuring that authorized users can access information and systems WHEN they need them.

A perfectly encrypted and integrity-verified system is useless if legitimate users cannot access it. Availability ensures that systems remain operational and accessible.

How it is maintained:
  - Redundancy: Multiple servers, backup power supplies, and data replication across locations
  - Load Balancing: Distributing traffic to prevent overload
  - Disaster Recovery: Backup plans and failover systems
  - DDoS Protection: Filtering malicious traffic

Threats to availability:
  - DDoS (Distributed Denial of Service) attacks
  - Ransomware (encrypts data, demands payment)
  - Hardware failures
  - Natural disasters
  - Power outages

============= THE TRIAD IN ACTION =============

Consider online banking:
  - Confidentiality: Your login credentials and account balance are encrypted so only you and the bank see them
  - Integrity: Transaction records are hashed so no one can secretly change a $100 transfer to $10,000
  - Availability: The bank's website stays online 24/7 with redundant servers so you can access your money anytime`,
    questions: [
      { q: "What does the CIA triad stand for?", a: "Confidentiality, Integrity, and Availability" },
      { q: "Which CIA component ensures that data has not been altered?", a: "Integrity" },
      { q: "What cryptographic technique primarily provides confidentiality?", a: "Encryption" },
      { q: "What type of attack threatens availability by flooding a server with traffic?", a: "DDoS (Distributed Denial of Service)" },
      { q: "What property of hash functions causes a completely different output when even one bit of input changes?", a: "Avalanche effect" }
    ]
  },
  {
    title: "Core Cryptographic Terminology",
    points: 10,
    content: `Before diving deeper into cryptography, you must understand the fundamental vocabulary. These terms appear constantly in CTF challenges and real-world security.

============= PLAINTEXT =============

The original, readable, human-understandable message or data BEFORE any encryption is applied.

Examples of plaintext:
  - "Hello, World!"
  - "My password is hunter2"
  - The contents of an unencrypted email
  - A file on your desktop before you encrypt it

In cryptographic notation, plaintext is usually represented by the letter "P" or "M" (for message).

Important: Plaintext does NOT have to be text! It can be any data — images, videos, binary files, database records. The term simply means "unencrypted data."

============= CIPHERTEXT =============

The scrambled, unreadable output produced AFTER encryption is applied to plaintext. Ciphertext should appear random and meaningless to anyone without the decryption key.

Example:
  Plaintext:   "HELLO"
  Ciphertext:  "KHOOR" (Caesar cipher with shift of 3)

In notation, ciphertext is represented by the letter "C".

Properties of good ciphertext:
  - Indistinguishable from random data
  - Reveals nothing about the plaintext
  - Same plaintext can produce different ciphertext (with different keys or initialization vectors)

============= CIPHER =============

A cipher is the ALGORITHM or method used to perform encryption and decryption. It is the set of rules that transforms plaintext into ciphertext and back again.

Types of ciphers:
  - Substitution Ciphers: Replace each letter with another
    Example: Caesar Cipher (A→D, B→E, C→F...)
  - Transposition Ciphers: Rearrange the order of letters
    Example: Rail Fence Cipher
  - Block Ciphers: Encrypt data in fixed-size blocks
    Example: AES (128-bit blocks)
  - Stream Ciphers: Encrypt data one bit or byte at a time
    Example: RC4, ChaCha20

Famous ciphers in history:
  - Caesar Cipher (100 BC) — simple letter shift
  - Vigenère Cipher (1553) — polyalphabetic substitution
  - Enigma Machine (1918) — electromechanical rotor cipher
  - AES (2001) — current gold standard for symmetric encryption

============= KEY =============

A key is the secret piece of information that controls the behavior of the cipher. The SAME cipher with DIFFERENT keys produces completely DIFFERENT ciphertext from the same plaintext.

Think of it like a lock:
  - The cipher is the type of lock (deadbolt, combination, etc.)
  - The key is the specific combination or physical key
  - Without the right key, the lock cannot be opened

Example with Caesar Cipher:
  Plaintext: "HELLO"
  Key = 3:  "KHOOR"
  Key = 7:  "OLSSV"
  Key = 13: "URYYB"

Key properties:
  - Key Length: Measured in bits. Longer = more secure.
    128-bit key = 2^128 possible combinations
    256-bit key = 2^256 possible combinations
  - Key Space: The total number of possible keys
  - Key Management: How keys are generated, stored, shared, and destroyed is critical to security

============= ENCRYPTION & DECRYPTION =============

Encryption: The process of converting plaintext to ciphertext
  Plaintext + Key → Cipher Algorithm → Ciphertext

Decryption: The reverse — converting ciphertext back to plaintext
  Ciphertext + Key → Cipher Algorithm → Plaintext

These are inverse operations:
  Decrypt(Encrypt(P, K), K) = P`,
    questions: [
      { q: "What is the term for the original, readable message before encryption?", a: "Plaintext" },
      { q: "What letter is commonly used to represent ciphertext in notation?", a: "C" },
      { q: "What is a cipher?", a: "The algorithm or method used to perform encryption and decryption" },
      { q: "How many possible combinations does a 128-bit key have?", a: "2^128" },
      { q: "What type of cipher encrypts data in fixed-size blocks?", a: "Block cipher" }
    ]
  },
  {
    title: "Types of Cryptography",
    points: 10,
    content: `Modern cryptography is divided into three major categories, each with different use cases, strengths, and weaknesses.

============= 1. SYMMETRIC CRYPTOGRAPHY =============

Also called: Secret-key cryptography, shared-key cryptography

How it works:
  The SAME key is used for both encryption AND decryption. Both the sender and receiver must possess the identical key.

  Sender:    Plaintext + Key → Encrypt → Ciphertext
  Receiver:  Ciphertext + Key → Decrypt → Plaintext

Common symmetric algorithms:
  - AES (Advanced Encryption Standard): The gold standard. Key sizes: 128, 192, or 256 bits. Used everywhere.
  - DES (Data Encryption Standard): Old, 56-bit key. BROKEN.
  - 3DES (Triple DES): Applies DES three times. Being phased out.
  - Blowfish / Twofish: Variable key length, fast.
  - ChaCha20: Modern stream cipher, used in TLS 1.3.
  - RC4: Stream cipher. BROKEN. Do not use.

Advantages:
  + Very FAST — ideal for encrypting large amounts of data
  + Simple to implement
  + Low computational overhead

Disadvantages:
  - KEY DISTRIBUTION PROBLEM: How do you securely share the key with the other party? If you send the key over an insecure channel, an attacker can intercept it.
  - Key management scales poorly: If 100 people need to communicate securely in pairs, you need 100 × 99 / 2 = 4,950 unique keys!

Real-world usage:
  - AES-256 for encrypting files and disk drives
  - ChaCha20 in mobile device encryption
  - AES in Wi-Fi security (WPA2/WPA3)

============= 2. ASYMMETRIC CRYPTOGRAPHY =============

Also called: Public-key cryptography

How it works:
  Uses a PAIR of mathematically related keys:
  - Public Key: Shared openly with everyone
  - Private Key: Kept secret by the owner

  Anyone can encrypt with the public key, but ONLY the holder of the corresponding private key can decrypt.

  Sender:    Plaintext + Receiver's Public Key → Encrypt → Ciphertext
  Receiver:  Ciphertext + Receiver's Private Key → Decrypt → Plaintext

Common asymmetric algorithms:
  - RSA (Rivest-Shamir-Adleman): Most widely used. Key sizes: 2048 or 4096 bits recommended.
  - ECC (Elliptic Curve Cryptography): Smaller keys, same security. 256-bit ECC ≈ 3072-bit RSA.
  - Diffie-Hellman: Key exchange protocol (not encryption).
  - DSA (Digital Signature Algorithm): For digital signatures.
  - ElGamal: Based on Diffie-Hellman, used in PGP.

Advantages:
  + SOLVES the key distribution problem
  + Enables digital signatures (authentication + integrity)
  + Scalable: Each person needs only ONE key pair

Disadvantages:
  - SLOW — 100x to 1000x slower than symmetric encryption
  - Not practical for encrypting large amounts of data
  - Larger key sizes required for equivalent security

How it is actually used (Hybrid Encryption):
  In practice, asymmetric and symmetric are used TOGETHER:
  1. Use asymmetric encryption to securely exchange a symmetric session key
  2. Use the fast symmetric key to encrypt the actual data
  This is exactly how HTTPS/TLS works!

============= 3. HASHING =============

Hashing is NOT encryption — it is a ONE-WAY function. You can convert data into a hash, but you CANNOT reverse the hash back into the original data.

How it works:
  Input (any size) → Hash Function → Fixed-size output (hash/digest)

Properties of a good hash function:
  - Deterministic: Same input ALWAYS produces same output
  - Fixed Output: No matter the input size, output is fixed (e.g., SHA-256 always produces 256 bits)
  - One-Way: Cannot reverse the hash to find the input
  - Avalanche Effect: Tiny change in input = massive change in output
  - Collision Resistant: Extremely hard to find two different inputs that produce the same hash

Common hash algorithms:
  - MD5: 128-bit output. BROKEN. Do not use for security.
  - SHA-1: 160-bit output. BROKEN. Being phased out.
  - SHA-256: 256-bit output. Current standard. Secure.
  - SHA-512: 512-bit output. More secure, slightly slower.
  - bcrypt: Password hashing with built-in salt and cost factor.
  - Argon2: Modern password hashing. Winner of the Password Hashing Competition (2015).

Use cases for hashing:
  - Password storage (store hash, not plaintext password)
  - File integrity verification (checksums)
  - Digital signatures (sign the hash of a document)
  - Blockchain (each block contains hash of previous block)

Example:
  Input:  "Hello"
  MD5:    8b1a9953c4611296a827abf8c47804d7
  SHA256: 185f8db32271fe25f561a6fc938b2e26...

  Input:  "hello" (just lowercase h)
  MD5:    5d41402abc4b2a76b9719d911017c592
  SHA256: 2cf24dba5fb0a30e26e83b2ac5b9e29e...

  Notice: Changing ONE character completely changes the hash!`,
    questions: [
      { q: "Which type of cryptography uses the same key for both encryption and decryption?", a: "Symmetric cryptography" },
      { q: "What is the key distribution problem in symmetric cryptography?", a: "The difficulty of securely sharing the secret key with the other party" },
      { q: "In asymmetric cryptography, which key is used to encrypt data?", a: "The receiver's public key" },
      { q: "Why is hashing considered a one-way function?", a: "You cannot reverse the hash to find the original input" },
      { q: "What property ensures that a tiny change in input produces a completely different hash output?", a: "Avalanche effect" }
    ]
  },
  {
    title: "Kerckhoffs's Principle & Cipher Security",
    points: 10,
    content: `In 1883, Dutch cryptographer Auguste Kerckhoffs published a groundbreaking paper that defined six design principles for military ciphers. The most famous of these is now known as Kerckhoffs's Principle:

  "A cryptographic system should be secure even if everything about the system, EXCEPT the key, is public knowledge."

This means:
  - The algorithm can be published openly
  - The implementation details can be known
  - The only secret should be the KEY itself
  - If knowing the algorithm breaks the system, the system is fundamentally flawed

============= WHY THIS MATTERS =============

The opposite approach is called "Security Through Obscurity":
  - Keep the algorithm secret and hope no one figures it out
  - This is DANGEROUS and unreliable

Why security through obscurity fails:
  1. Reverse Engineering: Attackers can analyze compiled code, network traffic, or hardware to figure out the algorithm
  2. Insider Threats: Employees who know the secret algorithm can leak it or be bribed
  3. No Peer Review: If only you know the algorithm, no one can find its weaknesses before attackers do
  4. Single Point of Failure: Once the algorithm is discovered, ALL data encrypted with it is compromised. You cannot just change a key — you must redesign the entire system.

============= REAL-WORLD EXAMPLES =============

Good (follows Kerckhoffs's Principle):
  - AES: The algorithm is publicly documented in detail. Security depends entirely on the key. Anyone can study it, test it, and attack it. It has survived 20+ years of intense scrutiny from the world's best cryptographers.
  - RSA: Algorithm is published. Security relies on the difficulty of factoring large prime numbers.

Bad (security through obscurity):
  - DVD CSS Encryption: The Content Scramble System was kept secret. Once reverse-engineered, it was trivially broken with DeCSS in 1999.
  - GSM A5/1 Cipher: Kept secret for years. When leaked, it was found to have serious weaknesses.
  - Proprietary encryption in IoT devices: Often weak, custom algorithms that crumble under scrutiny.

============= MODERN APPLICATION =============

Today, all trusted cryptographic standards follow this principle:
  - NIST (National Institute of Standards and Technology) holds open competitions to select algorithms
  - AES was selected from 15 publicly submitted candidates
  - SHA-3 was selected from 51 submitted algorithms
  - Post-quantum algorithms are currently being standardized through the same open process

The lesson: NEVER invent your own encryption algorithm. Use well-tested, publicly reviewed standards like AES and RSA. Your security should depend on key secrecy, not algorithm secrecy.`,
    questions: [
      { q: "What principle states that a cryptosystem should be secure even if the algorithm is public?", a: "Kerckhoffs's Principle" },
      { q: "What is the dangerous opposite approach called, where the algorithm itself is kept secret?", a: "Security through obscurity" },
      { q: "What year was Kerckhoffs's Principle published?", a: "1883" },
      { q: "Why is peer review important for cryptographic algorithms?", a: "So experts can find weaknesses before attackers do" },
      { q: "What organization holds open competitions to select cryptographic standards like AES?", a: "NIST (National Institute of Standards and Technology)" }
    ]
  },
  {
    title: "The Caesar Cipher — A Classic Example",
    points: 10,
    content: `The Caesar Cipher is one of the earliest and simplest encryption techniques. It is named after Julius Caesar, who reportedly used it to communicate with his generals.

How it works:
  Each letter in the plaintext is SHIFTED by a fixed number of positions in the alphabet.

Example with a shift of 3 (Key = 3):
  Plaintext Alphabet:  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
  Ciphertext Alphabet: D E F G H I J K L M N O P Q R S T U V W X Y Z A B C

  Encryption (shift right by 3):
    A → D    H → K    Z → C (wraps around)

  Plaintext:  "HELLO WORLD"
  Ciphertext: "KHOOR ZRUOG"

Decryption (shift left by 3):
    D → A    K → H    C → Z

  Ciphertext: "KHOOR ZRUOG"
  Plaintext:  "HELLO WORLD"

============= MATHEMATICAL FORMULA =============

Assign each letter a number: A=0, B=1, C=2, ..., Z=25

  Encryption: C = (P + K) mod 26
  Decryption: P = (C - K) mod 26

Example:
  Letter 'H' = 7
  Key = 3
  Encrypted: (7 + 3) mod 26 = 10 = 'K'

============= BREAKING THE CAESAR CIPHER =============

The Caesar Cipher is extremely weak because:

1. Small Key Space: There are only 25 possible shifts (shift of 0 = no encryption). An attacker can try all 25 possibilities in seconds — this is called a BRUTE FORCE attack.

2. Frequency Analysis: In English, certain letters appear more often than others:
     E (12.7%), T (9.1%), A (8.2%), O (7.5%), I (7.0%)
   By analyzing which letter appears most in the ciphertext, you can guess it corresponds to 'E' and calculate the shift.

3. Pattern Preservation: The cipher preserves word lengths and spaces, making it even easier to crack.

============= ROT13: A SPECIAL CASE =============

ROT13 is a Caesar Cipher with a shift of 13. Since 13 is half of 26 (the alphabet length), applying ROT13 twice returns the original text:
  ROT13(ROT13("HELLO")) = "HELLO"

ROT13 is NOT encryption — it is used as a simple way to hide spoilers or puzzle answers online.

  "HELLO" → ROT13 → "URYYB" → ROT13 → "HELLO"

============= CTF TIPS FOR CAESAR CIPHER =============

In CTF challenges involving Caesar Cipher:
  1. Try all 25 shifts (brute force) — tools like CyberChef or dcode.fr make this instant
  2. Look for the "CTF{" pattern in the output
  3. Use frequency analysis for longer texts
  4. Remember that numbers and special characters typically are NOT shifted — only letters A-Z
  5. The shift value IS the key`,
    questions: [
      { q: "How many possible keys does the Caesar Cipher have?", a: "25" },
      { q: "What attack tries all possible keys to break a cipher?", a: "Brute force attack" },
      { q: "What is ROT13?", a: "A Caesar Cipher with a shift of 13" },
      { q: "What technique analyzes letter frequency to break substitution ciphers?", a: "Frequency analysis" },
      { q: "What is the most common letter in the English language?", a: "E" }
    ]
  },
  {
    title: "🚩 Caesar's Secret Message",
    points: 50,
    content: `============= CHALLENGE: DECRYPT THE MESSAGE =============

One of the oldest known ciphers is the Caesar Cipher, a simple substitution cipher where each letter in the plaintext is shifted a fixed number of positions down the alphabet.

We intercepted an encrypted message from an enemy general. Intelligence reports indicate they are using a Caesar Cipher with a shift of 3 (A becomes D, B becomes E, etc.).

The encrypted message is:
  "FWI{edvlf_flskhu}"

Your mission: Decrypt this message to recover the flag.

Hint: To decrypt, shift each letter BACK by 3 positions.
  F → C, W → T, I → F, e → b, d → a, ...

Flag format: CTF{...}`,
    questions: [
      { q: "Enter the decrypted flag:", a: "CTF{basic_cipher}" }
    ]
  },
  {
    title: "🚩 ROT13 Decoder",
    points: 50,
    content: `============= CHALLENGE: ROT13 DECRYPTION =============

ROT13 is a special case of the Caesar Cipher where the shift value is 13. Since there are 26 letters in the alphabet, applying ROT13 twice gives back the original text.

We found this suspicious encoded string in a hacker's notes:
  "PGS{ebg_guvegrra_vf_abg_rapelcgvba}"

Your mission: Apply ROT13 decryption to reveal the flag.

Hint: A→N, B→O, C→P, ... N→A, O→B, P→C, ...
You can use CyberChef or any ROT13 decoder tool.

Flag format: CTF{...}`,
    questions: [
      { q: "Enter the decrypted flag:", a: "CTF{rot_thirteen_is_not_encryption}" }
    ]
  },
  {
    title: "🚩 The Hash Detective",
    points: 50,
    content: `============= CHALLENGE: IDENTIFY THE HASH =============

A security analyst found this hash in a compromised database:
  5d41402abc4b2a76b9719d911017c592

They know the original password was a common English word (all lowercase, 5 letters).

Hint 1: The hash is 32 hexadecimal characters long.
Hint 2: Think about what hash algorithm produces 32-char output.
Hint 3: The word is a common greeting.

The flag is the plaintext word wrapped in the flag format.

Flag format: CTF{the_word}`,
    questions: [
      { q: "Enter the flag (the word that produces this MD5 hash):", a: "CTF{hello}" }
    ]
  }
];
