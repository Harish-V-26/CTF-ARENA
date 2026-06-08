const LESSONS = [
  {
    title: "1. Unsigned Packages & CI/CD Flaws",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/images/integrity_failures.png" alt="Integrity Failures Diagram" class="htb-diagram"></div>
      <h3>What are Software & Data Integrity Failures?</h3>
      <p>Software and Data Integrity Failures occur when applications rely on plugins, libraries, or external modules from untrusted sources without verifying their digital signatures. In modern CI/CD pipelines, if the build process blindly accepts auto-updates or pulls packages from remote repositories without cryptographic checksum validation (like SHA-256 hashes or GPG signatures), attackers can inject malicious dependencies (Supply Chain Attacks) that immediately compromise the entire application upon deployment.</p>
      <p>Imagine buying a sealed medicine bottle from a pharmacy. You trust it because the tamper-proof seal guarantees nobody has messed with the pills inside. Now imagine the pharmacy stops using seals entirely — anyone in the supply chain could swap your medicine with poison, and you would never know until it was too late! This is exactly what happens when software developers download and run code from the internet without checking its "digital seal" (signature). Hackers sneak malicious code into the system, and the application just drinks the poison.</p>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Launch the Lab</strong><br>Click <strong>Launch Lab</strong>. A new tab opens with the <strong>DevOps Console</strong> — a CI/CD pipeline management system.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Log In</strong><br>Use credentials: <code>devops / build2026</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Inspect the Package Registry</strong><br>Look at the Package Registry table. Notice that <code>log-service</code> is <strong>unsigned</strong> and <strong>unverified</strong> — yet it was accepted into the registry! The first flag is displayed below the table.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 4</div>
        <div class="step-body"><strong>Review the CI/CD Pipeline</strong><br>The pipeline log shows that artifacts are deployed to production <strong>without verifying digital signatures</strong>. This means a compromised build could push malicious code. The second flag is revealed.</div>
      </div>`,
    questions: [
      { q: "What is the name of the unsigned, unverified package in the registry?", a: "log-service", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag for the unsigned package vulnerability?", a: "CTF{uns1gn3d_p4ck4g3_4cc3pt3d}", hint: "Check the command reference blocks." },
      { q: "What is the flag for the insecure CI/CD pipeline?", a: "CTF{c1cd_p1p3l1n3_t4mp3r3d}", hint: "Check the command reference blocks." },
      { q: "What type of seal/proof should software packages have to prove they haven't been tampered with?", a: "digital signatures", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "2. Insecure Deserialization",
    points: 60,
    html: `<h3>Exploiting Insecure Deserialization</h3>
      <p>Serialization is the process of converting complex data structures into a format (like JSON, XML, or binary streams) that can be easily transmitted. Deserialization is the reverse process. Insecure deserialization occurs when untrusted, user-controllable data is deserialized by the server without prior validation. Attackers manipulate the serialized objects to insert hostile code or alter application state. When the server automatically instantiates these objects, the malicious payload executes, frequently leading to devastating Remote Code Execution (RCE) flaws.</p>
      <p>Imagine receiving a mysterious, flat-packed box of furniture in the mail from a stranger. The instruction manual on the outside says, "Assemble this instantly without checking what the parts are!" If you blindly follow the instructions, you might accidentally assemble a bomb in your living room instead of a chair. Insecure deserialization is just like this. The server receives a packed box of data (Serialization) and blindly puts it together (Deserialization) exactly as instructed, completely failing to notice that the hacker packed malicious commands inside.</p>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Create a Malicious Plugin Config</strong><br>Create a JSON object: <code>{"name":"exploit","cmd":"cat /flag.txt"}</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Base64 Encode It</strong><br>Encode the JSON to Base64. The result is: <code>eyJuYW1lIjoiZXhwbG9pdCIsImNtZCI6ImNhdCAvZmxhZy50eHQifQ==</code><br>You can use the browser console: <code>btoa('{"name":"exploit","cmd":"cat /flag.txt"}')</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Submit the Payload</strong><br>Paste the Base64 string into the Plugin Loader textarea and click <strong>Load Plugin</strong>. The server blindly deserializes and executes the payload, revealing the flag!</div>
      </div>`,
    questions: [
      { q: "What encoding format does the plugin loader accept?", a: "Base64", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag for the deserialization attack?", a: "CTF{d3s3r14l1z4t10n_4tt4ck}", hint: "Check the command reference blocks." },
      { q: "What JavaScript function encodes text to Base64 in the browser console?", a: "btoa", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "3. Data Tampering & Mitigations",
    points: 50,
    html: `<h3>Cookie Tampering and Integrity Protections</h3>
      <p>Data stored on the client side (like cookies or local storage) is inherently untrusted. If an application relies on client-side state without employing cryptographic integrity checks (like HMAC - Hash-Based Message Authentication Code), attackers can easily modify their authorization levels, pricing data, or user profiles. Integrity mechanisms guarantee that data remains unchanged during transit and storage.</p>
      <p>Imagine a theme park where your VIP access is determined by a handwritten sticky note on your shirt. If you can simply cross out "Guest" and write "Admin" on the note with a Sharpie, the security is completely broken! A proper system would use an unforgeable, digitally signed badge. If a website gives you a cookie that simply says "role=user" in plain text, you can easily use your developer tools to erase "user," type "admin," and trick the server into giving you total control.</p>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Find the Cookie</strong><br>Open DevTools → Application → Cookies. Find the <code>user_prefs</code> cookie and copy its value.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Decode and Modify</strong><br>In the Console, run: <code>atob("&lt;cookie_value&gt;")</code>. You'll see: <code>{"theme":"dark","role":"viewer"}</code>. Change "viewer" to "admin": <code>btoa('{"theme":"dark","role":"admin"}')</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Replace and Refresh</strong><br>Replace the cookie value with your tampered Base64 string. Refresh the page. The server reads the modified cookie without checking integrity and reveals the flag!</div>
      </div>
      <h3>Mitigations</h3>
      <p><strong>1. Subresource Integrity (SRI):</strong> Add integrity hashes to script/link tags so browsers reject tampered CDN resources.</p>
      <p><strong>2. HMAC Signatures:</strong> Sign cookies and data with a server-side secret so any tampering invalidates the signature.</p>
      <p><strong>3. Code Signing:</strong> Require all software packages and CI/CD artifacts to be digitally signed before deployment.</p>
      <p><strong>4. Input Validation:</strong> Never trust deserialized data — always validate structure and content after decoding.</p>`,
    questions: [
      { q: "What is the flag for cookie tampering?", a: "CTF{d4t4_1nt3gr1ty_f41lur3}", hint: "Check the command reference blocks." },
      { q: "What cryptographic mechanism should be used to verify cookie integrity?", a: "HMAC", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What HTML attribute verifies the integrity of external scripts loaded from CDNs?", a: "Subresource Integrity", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What role did you change in the cookie to trigger the flag?", a: "admin", hint: "Check the command reference blocks." }
    ]
  }
];
