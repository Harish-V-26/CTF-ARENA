const LESSONS = [
  {
    title: "Introduction to Symmetric Encryption",
    points: 10,
    content: `Symmetric encryption is the oldest and most widely used form of encryption. It uses a SINGLE shared secret key to both encrypt and decrypt data.

============= HOW SYMMETRIC ENCRYPTION WORKS =============

The same key performs both operations:

  Sender:    Plaintext + Secret Key → Encrypt → Ciphertext
  Receiver:  Ciphertext + Secret Key → Decrypt → Plaintext

Think of it like a padlock with a single key — whoever has the key can lock (encrypt) and unlock (decrypt) the data. Both the sender and receiver must possess the exact same key.

============= WHY SYMMETRIC ENCRYPTION? =============

Symmetric encryption dominates real-world usage because of its speed:
  - AES-256 can encrypt data at speeds of several GB/s on modern CPUs
  - Hardware acceleration (AES-NI instructions) makes it even faster
  - Ideal for encrypting large files, disk drives, and network traffic

Where you encounter symmetric encryption daily:
  - Wi-Fi (WPA2/WPA3 uses AES)
  - Full-disk encryption (BitLocker, FileVault, LUKS)
  - VPN tunnels (IPSec, WireGuard)
  - HTTPS (after the TLS handshake, symmetric encryption handles data)
  - Zip file encryption
  - Database encryption at rest

============= THE KEY DISTRIBUTION PROBLEM =============

The fundamental weakness of symmetric encryption:
  How do you safely deliver the secret key to the other party?

If Alice wants to send Bob an encrypted file:
  1. She encrypts with the shared key
  2. She must somehow get the key to Bob securely
  3. If she sends the key over email/chat, an attacker could intercept it
  4. If the attacker has the key, ALL encrypted data is compromised

This is called the Key Distribution Problem — and it's the reason asymmetric encryption was invented.

============= KEY MANAGEMENT AT SCALE =============

Symmetric keys don't scale well for large groups:
  - 2 people need 1 key
  - 5 people need 10 keys
  - 100 people need 4,950 keys
  - Formula: n × (n-1) / 2

Managing thousands of keys securely is extremely difficult, making symmetric encryption impractical as the sole solution for large networks.`,
    questions: [
      { q: "How many keys does symmetric encryption use for both encryption and decryption?", a: "One (a single shared key)" },
      { q: "What is the main advantage of symmetric encryption over asymmetric?", a: "Speed" },
      { q: "What fundamental problem arises when two parties need to share a symmetric key?", a: "The Key Distribution Problem" },
      { q: "How many unique symmetric keys would 100 people need to communicate in pairs?", a: "4,950" },
      { q: "What CPU instruction set provides hardware acceleration for AES?", a: "AES-NI" }
    ]
  },
  {
    title: "Stream Ciphers vs Block Ciphers",
    points: 10,
    content: `Symmetric ciphers are divided into two fundamental categories based on HOW they process data: stream ciphers and block ciphers.

============= STREAM CIPHERS =============

How they work:
  Encrypt data ONE BIT or ONE BYTE at a time by combining each bit of plaintext with a bit from a pseudorandom keystream generated from the key.

  Key → Keystream Generator → Pseudorandom Keystream
  Plaintext XOR Keystream = Ciphertext

The keystream looks random but is entirely determined by the key, making decryption possible with the same key.

Common Stream Ciphers:
  - RC4: Once the most popular stream cipher (used in WEP, early TLS). Now BROKEN — serious biases in the keystream allow attacks.
  - ChaCha20: Modern, fast, and secure. Created by Daniel Bernstein. Used in TLS 1.3, WireGuard VPN, and Google's QUIC protocol.
  - Salsa20: Predecessor to ChaCha20, also by Bernstein.

Advantages:
  + Very fast, minimal memory usage
  + No padding needed (encrypts bit by bit)
  + Ideal for real-time streaming data (voice, video calls)

Disadvantages:
  - NEVER reuse a key+nonce combination — reuse allows XOR attacks that reveal plaintext
  - Harder to implement securely

============= BLOCK CIPHERS =============

How they work:
  Encrypt data in FIXED-SIZE BLOCKS (typically 64 or 128 bits). If the data doesn't fill a complete block, PADDING is added.

  Plaintext Block (128 bits) + Key → Block Cipher → Ciphertext Block (128 bits)

Common Block Ciphers:
  - DES (Data Encryption Standard):
    Block size: 64 bits, Key: 56 bits
    Status: BROKEN. A 56-bit key can be brute-forced in hours.
    Historical significance: US federal standard from 1977-2001.

  - 3DES (Triple DES):
    Applies DES three times with 2 or 3 different keys.
    Effective key strength: 112 bits.
    Status: DEPRECATED. Too slow for modern use.

  - AES (Advanced Encryption Standard):
    Block size: 128 bits, Keys: 128, 192, or 256 bits
    Status: CURRENT GOLD STANDARD. Selected by NIST in 2001 from 15 candidates (Rijndael algorithm won).
    Speed: ~4 GB/s with hardware acceleration.

  - Blowfish: 64-bit blocks, variable key (32-448 bits). Fast but aging.
  - Twofish: 128-bit blocks. AES finalist, very secure.

Advantages:
  + Well-studied and proven security properties
  + Can provide both encryption and authentication (with proper modes)
  + Standardized and widely implemented

Disadvantages:
  - Requires padding for non-block-aligned data
  - Slightly slower than stream ciphers
  - Security depends heavily on the MODE OF OPERATION used

============= PADDING =============

When plaintext doesn't fill a complete block, padding bytes are added:
  - PKCS#7: Most common. Pads with bytes whose value equals the number of padding bytes needed.
    Example (16-byte block): "HELLO" (5 bytes) → pad with 11 bytes of value 0x0B
  - Padding Oracle Attack: If a server reveals whether padding is valid/invalid, an attacker can decrypt ciphertext byte by byte WITHOUT the key.`,
    questions: [
      { q: "What type of cipher encrypts data one bit or byte at a time?", a: "Stream cipher" },
      { q: "What modern stream cipher is used in TLS 1.3 and WireGuard VPN?", a: "ChaCha20" },
      { q: "What is the block size of AES?", a: "128 bits" },
      { q: "Why is DES considered broken?", a: "Its 56-bit key can be brute-forced in hours" },
      { q: "What attack exploits error messages about invalid padding to decrypt data without the key?", a: "Padding Oracle Attack" }
    ]
  },
  {
    title: "Block Cipher Modes of Operation",
    points: 10,
    content: `A block cipher alone only encrypts ONE block at a time. To encrypt data larger than one block, you need a MODE OF OPERATION — a method that defines how blocks are chained together.

The choice of mode is CRITICAL for security. A strong cipher with a bad mode is insecure.

============= ECB — Electronic Codebook =============

How it works:
  Each plaintext block is encrypted independently with the same key.
  Block1 + Key → Cipher → CipherBlock1
  Block2 + Key → Cipher → CipherBlock2

THE PROBLEM — Pattern Leakage:
  Identical plaintext blocks produce identical ciphertext blocks!
  This means patterns in the plaintext are visible in the ciphertext.

  The famous "ECB Penguin" example:
  - Encrypt a bitmap image of a penguin using ECB mode
  - The encrypted image STILL shows the penguin outline because identical color blocks encrypt to the same ciphertext

  ECB is NEVER safe for encrypting data with patterns (images, text, structured data). Only acceptable for single-block encryption (like encrypting a single AES key).

============= CBC — Cipher Block Chaining =============

How it works:
  Each plaintext block is XORed with the PREVIOUS ciphertext block before encryption.
  - First block is XORed with a random Initialization Vector (IV)
  - The IV must be random and unpredictable for each encryption

  Block1 XOR IV → Encrypt → CipherBlock1
  Block2 XOR CipherBlock1 → Encrypt → CipherBlock2

Advantage: Identical plaintext blocks produce DIFFERENT ciphertext (because of chaining).
Weakness: Vulnerable to Padding Oracle attacks and bit-flipping attacks if not implemented carefully. Encryption is sequential (can't parallelize).

============= CTR — Counter Mode =============

How it works:
  Turns a block cipher into a stream cipher. A counter value (nonce + incrementing number) is encrypted, then XORed with plaintext.

  Encrypt(Nonce||Counter0) XOR Block1 = CipherBlock1
  Encrypt(Nonce||Counter1) XOR Block2 = CipherBlock2

Advantage: Fully parallelizable (fast). No padding needed.
Weakness: NEVER reuse a nonce — nonce reuse completely breaks security.

============= GCM — Galois/Counter Mode =============

How it works:
  Combines CTR mode encryption with GMAC authentication.
  Provides BOTH confidentiality AND integrity in a single operation.
  This is called Authenticated Encryption with Associated Data (AEAD).

Output: Ciphertext + Authentication Tag (verifies data wasn't tampered with)

Why GCM is the modern standard:
  - Used in TLS 1.2/1.3 (AES-128-GCM, AES-256-GCM)
  - Parallelizable and fast with hardware acceleration
  - Detects any tampering with ciphertext
  - NIST recommended

============= CHOOSING A MODE =============

  NEVER use:  ECB (pattern leakage)
  Legacy:     CBC (still common but has known attack vectors)
  Modern:     GCM (encryption + authentication, recommended)
  Also good:  CTR (when you handle authentication separately)`,
    questions: [
      { q: "Which block cipher mode is highly insecure because identical plaintext blocks produce identical ciphertext?", a: "ECB (Electronic Codebook)" },
      { q: "What must be random and unique for each encryption in CBC mode?", a: "Initialization Vector (IV)" },
      { q: "What does GCM stand for?", a: "Galois/Counter Mode" },
      { q: "What does AEAD stand for in the context of authenticated encryption?", a: "Authenticated Encryption with Associated Data" },
      { q: "Which mode is recommended by NIST and used in TLS 1.2/1.3?", a: "GCM" }
    ]
  },
  {
    title: "Introduction to Asymmetric Encryption",
    points: 10,
    content: `Asymmetric encryption (also called Public-Key Cryptography) was invented in 1976 by Whitfield Diffie and Martin Hellman. It solved the key distribution problem that had plagued symmetric encryption for centuries.

============= THE KEY PAIR =============

Instead of one shared key, asymmetric encryption uses TWO mathematically related keys:

  Public Key:  Shared openly with the world. Anyone can have it.
  Private Key: Kept SECRET by the owner. Never shared with anyone.

These keys have a special mathematical relationship:
  - Data encrypted with the Public Key can ONLY be decrypted with the corresponding Private Key
  - Data signed with the Private Key can be VERIFIED by anyone with the Public Key
  - You CANNOT derive the Private Key from the Public Key (computationally infeasible)

============= ENCRYPTION FLOW =============

If Alice wants to send Bob a secret message:
  1. Bob generates a key pair (public + private) and publishes his public key
  2. Alice encrypts her message with Bob's PUBLIC key
  3. Alice sends the ciphertext to Bob (even over an insecure channel)
  4. Bob decrypts with his PRIVATE key
  5. Even if an attacker intercepts the ciphertext AND knows Bob's public key, they CANNOT decrypt it — only the private key can

This elegantly solves the key distribution problem — no secret key ever needs to be transmitted!

============= DIGITAL SIGNATURES =============

Asymmetric encryption also enables digital signatures — cryptographic proof that a message is authentic and unmodified.

How signing works:
  1. Alice hashes her message (e.g., SHA-256)
  2. Alice encrypts the hash with her PRIVATE key → this is the signature
  3. Alice sends the message + signature to Bob
  4. Bob decrypts the signature with Alice's PUBLIC key → gets the hash
  5. Bob hashes the message independently and compares
  6. If hashes match → message is authentic and unmodified

Digital signatures provide:
  - Authentication: Proves who sent the message
  - Integrity: Proves the message wasn't altered
  - Non-repudiation: Alice cannot deny sending it (only her private key could create the signature)

============= SPEED COMPARISON =============

Asymmetric encryption is extremely slow compared to symmetric:
  - RSA-2048: ~1,000 operations/second
  - AES-256:  ~1,000,000,000 operations/second
  - Asymmetric is roughly 1000x slower

This is why asymmetric encryption is NEVER used to encrypt bulk data directly. Instead, it is combined with symmetric encryption in a hybrid approach.`,
    questions: [
      { q: "Who invented public-key cryptography and in what year?", a: "Diffie and Hellman in 1976" },
      { q: "Which key do you share openly with everyone?", a: "Public Key" },
      { q: "If you want to send someone a secret message, which of THEIR keys do you encrypt with?", a: "Their Public Key" },
      { q: "What three properties do digital signatures provide?", a: "Authentication, Integrity, and Non-repudiation" },
      { q: "Why is asymmetric encryption not used to encrypt large amounts of data?", a: "It is too slow (roughly 1000x slower than symmetric)" }
    ]
  },
  {
    title: "RSA, ECC & Key Exchange",
    points: 10,
    content: `Several asymmetric algorithms exist, each based on different mathematical hard problems.

============= RSA (Rivest-Shamir-Adleman) =============

Invented in 1977 by Ron Rivest, Adi Shamir, and Leonard Adleman.

Mathematical basis: The difficulty of FACTORING the product of two very large prime numbers.

How RSA key generation works (simplified):
  1. Choose two large prime numbers: p and q
  2. Compute n = p × q (this is the modulus)
  3. Compute φ(n) = (p-1)(q-1) (Euler's totient)
  4. Choose public exponent e (commonly 65537)
  5. Compute private exponent d such that e × d ≡ 1 (mod φ(n))
  6. Public Key = (n, e) — shared openly
  7. Private Key = (n, d) — kept secret

  Encryption: ciphertext = plaintext^e mod n
  Decryption: plaintext = ciphertext^d mod n

Security relies on: Factoring n back into p and q is computationally infeasible for large n (2048+ bits). Current record: RSA-250 (829 bits) factored in 2020 using massive computing resources.

Recommended key sizes:
  - 2048 bits: Minimum acceptable (secure until ~2030)
  - 4096 bits: Recommended for long-term security

============= ECC (Elliptic Curve Cryptography) =============

Mathematical basis: The Elliptic Curve Discrete Logarithm Problem (ECDLP).

ECC provides the SAME security as RSA with MUCH smaller keys:
  - 256-bit ECC ≈ 3072-bit RSA
  - 384-bit ECC ≈ 7680-bit RSA
  - 521-bit ECC ≈ 15360-bit RSA

Advantages:
  + Smaller keys = faster operations, less bandwidth, less storage
  + Ideal for mobile devices and IoT with limited resources
  + Used in Bitcoin/Ethereum (secp256k1 curve)

Common ECC algorithms:
  - ECDSA: Elliptic Curve Digital Signature Algorithm
  - ECDH: Elliptic Curve Diffie-Hellman (key exchange)
  - Ed25519: Modern signature scheme (used in SSH, Signal)

============= DIFFIE-HELLMAN KEY EXCHANGE =============

NOT an encryption algorithm — it's a method for two parties to establish a shared symmetric key over an insecure channel.

How it works (simplified):
  1. Alice and Bob agree on public parameters (large prime p, generator g)
  2. Alice picks secret a, computes A = g^a mod p, sends A to Bob
  3. Bob picks secret b, computes B = g^b mod p, sends B to Alice
  4. Alice computes shared secret: s = B^a mod p
  5. Bob computes shared secret: s = A^b mod p
  6. Both arrive at the SAME shared secret without ever transmitting it!

An eavesdropper who sees A and B CANNOT compute s (Discrete Logarithm Problem).

This shared secret is then used as a symmetric encryption key (e.g., AES key).`,
    questions: [
      { q: "What mathematical problem does RSA's security rely on?", a: "Factoring the product of two large prime numbers" },
      { q: "What is the commonly used public exponent (e) in RSA?", a: "65537" },
      { q: "How many bits of ECC provide equivalent security to 3072-bit RSA?", a: "256 bits" },
      { q: "What is Diffie-Hellman used for?", a: "Establishing a shared symmetric key over an insecure channel" },
      { q: "What modern ECC signature scheme is used in SSH and Signal?", a: "Ed25519" }
    ]
  },
  {
    title: "Hybrid Encryption & PKI",
    points: 10,
    content: `In the real world, symmetric and asymmetric encryption are NEVER used alone — they are combined in a system called Hybrid Encryption.

============= HYBRID ENCRYPTION =============

The best of both worlds:
  - Asymmetric encryption: Solves key distribution (slow but secure key exchange)
  - Symmetric encryption: Handles bulk data (fast encryption/decryption)

How HTTPS/TLS uses hybrid encryption:
  1. Your browser connects to a website (e.g., bank.com)
  2. Server sends its Digital Certificate containing its Public Key
  3. Browser verifies the certificate with the Certificate Authority (CA)
  4. Browser generates a random symmetric Session Key
  5. Browser encrypts the Session Key with the server's Public Key (asymmetric)
  6. Server decrypts the Session Key with its Private Key
  7. Both parties now share the Session Key
  8. ALL subsequent data is encrypted with the Session Key using AES-GCM (symmetric)

The asymmetric step happens ONCE (key exchange).
The symmetric step handles ALL data (fast bulk encryption).

============= PUBLIC KEY INFRASTRUCTURE (PKI) =============

PKI is the trust framework that makes asymmetric encryption work at scale.

Key components:
  - Digital Certificate: An electronic document that binds a public key to an identity (person, server, organization). Contains: subject name, public key, issuer, validity dates, serial number.
  - Certificate Authority (CA): A trusted third party that verifies identities and issues certificates. Examples: Let's Encrypt, DigiCert, Comodo, GlobalSign.
  - Certificate Chain: Root CA → Intermediate CA → End-entity certificate. Browsers trust Root CAs pre-installed in their certificate store.
  - Certificate Revocation: CRL (Certificate Revocation List) or OCSP (Online Certificate Status Protocol) checks if a certificate has been revoked.

============= CERTIFICATE TYPES =============

  - DV (Domain Validation): Verifies domain ownership only. Quick and automated (Let's Encrypt). Shows padlock in browser.
  - OV (Organization Validation): Verifies domain + organization identity. Takes days.
  - EV (Extended Validation): Highest level of verification. Shows organization name in some browsers. Expensive and thorough.

============= ATTACKS ON PKI =============

  - Man-in-the-Middle: Attacker presents their own certificate to intercept traffic. Prevented by certificate pinning and proper CA validation.
  - Rogue CA: If a CA is compromised, attackers can issue valid certificates for any domain. Has happened (DigiNotar 2011, Symantec issues).
  - Certificate Forgery: MD5 collision attacks allowed forging certificates (2008). Now mitigated with SHA-256.

============= SYMMETRIC vs ASYMMETRIC SUMMARY =============

  Feature          | Symmetric         | Asymmetric
  ─────────────────|───────────────────|──────────────────
  Keys             | 1 shared key      | 2 keys (pub/priv)
  Speed            | Very fast         | Very slow
  Key distribution | Difficult         | Easy (public key)
  Use case         | Bulk data         | Key exchange, signatures
  Key size         | 128-256 bits      | 2048-4096 bits (RSA)
  Examples         | AES, ChaCha20     | RSA, ECC, DH`,
    questions: [
      { q: "What technique combines asymmetric key exchange with symmetric bulk encryption?", a: "Hybrid Encryption" },
      { q: "In TLS/HTTPS, what type of key is generated by the browser for encrypting actual data?", a: "Symmetric Session Key" },
      { q: "What entity issues and signs digital certificates?", a: "Certificate Authority (CA)" },
      { q: "What is the highest level of certificate validation that shows the organization name?", a: "EV (Extended Validation)" },
      { q: "What real-world CA was compromised in 2011, leading to its complete shutdown?", a: "DigiNotar" }
    ]
  },
  {
    title: "\u{1F6A9} XOR Operator Challenge",
    points: 50,
    content: `============= CHALLENGE: XOR OPERATION =============

At the heart of many symmetric ciphers is the bitwise XOR (Exclusive OR) operation.

XOR TRUTH TABLE:
  0 XOR 0 = 0
  0 XOR 1 = 1
  1 XOR 0 = 1
  1 XOR 1 = 0

The magic of XOR:
  If A XOR B = C, then C XOR B = A
  This makes XOR perfect for encryption — XOR with a key to encrypt, XOR with the same key to decrypt!

YOUR CHALLENGE:
  Compute the result of XORing these two binary values:
    1010 XOR 1100

  Work it out bit by bit:
    1 XOR 1 = ?
    0 XOR 1 = ?
    1 XOR 0 = ?
    0 XOR 0 = ?

  Format the flag as CTF{binary_result}

Flag format: CTF{...}`,
    questions: [
      { q: "What does XOR stand for?", a: "Exclusive OR" },
      { q: "What is the result of XORing any value with itself (e.g., 1010 XOR 1010)?", a: "0 (all zeros)" },
      { q: "Why is XOR useful for encryption?", a: "XOR with a key encrypts, XOR with the same key decrypts" },
      { q: "What is 1 XOR 0?", a: "1" },
      { q: "Enter the flag (CTF{binary_result} of 1010 XOR 1100):", a: "CTF{0110}" }
    ]
  },
  {
    title: "\u{1F6A9} The Private Key",
    points: 50,
    content: `============= CHALLENGE: RSA BASICS =============

In RSA, the public key consists of the modulus 'n' and the public exponent 'e'. The private key consists of the private exponent 'd'.

If an attacker can factor 'n' into its prime components 'p' and 'q', they can calculate 'd' and steal your secrets.

This algorithm was invented in 1977 by three brilliant cryptographers whose last names gave the algorithm its name: Rivest, Shamir, and Adleman.

What is the abbreviation of this famous algorithm?
Wrap it in CTF{...}.

Flag format: CTF{...}`,
    questions: [
      { q: "What two components make up an RSA public key?", a: "The modulus n and the public exponent e" },
      { q: "If an attacker factors n into p and q, what can they compute?", a: "The private exponent d" },
      { q: "What is the minimum recommended RSA key size today?", a: "2048 bits" },
      { q: "In what year was the RSA algorithm invented?", a: "1977" },
      { q: "Enter the flag (abbreviation of the algorithm by Rivest, Shamir, and Adleman):", a: "CTF{RSA}" }
    ]
  },
  {
    title: "\u{1F6A9} Hybrid Handshake",
    points: 50,
    content: `============= CHALLENGE: TLS HANDSHAKE =============

Every time you visit an HTTPS website, a handshake occurs that uses BOTH symmetric and asymmetric encryption.

During this handshake:
  1. The server presents a digital certificate
  2. The browser verifies it with the Certificate Authority
  3. A symmetric session key is securely exchanged
  4. All further communication uses fast symmetric encryption

The protocol that makes this all possible replaced the older SSL protocol and is now the standard for secure web communication. Its current version is 1.3 (released in 2018).

What is the name of this protocol?
Wrap it in CTF{...}.

Hint: It stands for Transport Layer ________.

Flag format: CTF{...}`,
    questions: [
      { q: "What older protocol did TLS replace?", a: "SSL" },
      { q: "What is the latest version of TLS (as of 2018)?", a: "1.3" },
      { q: "During the TLS handshake, what type of key is exchanged for bulk encryption?", a: "Symmetric session key" },
      { q: "What document does the server present to prove its identity during the handshake?", a: "Digital certificate" },
      { q: "Enter the flag (the name of the protocol):", a: "CTF{TLS}" }
    ]
  }
];
