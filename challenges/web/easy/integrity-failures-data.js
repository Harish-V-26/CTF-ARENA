const LESSONS = [
  {
    title: "1. Unsigned Packages & CI/CD Flaws",
    points: 50,
    html: `
      <div class="htb-diagram-container">
        <img src="../../../assets/images/integrity_failures.png" alt="Integrity Failures Diagram" class="htb-diagram">
      </div>
      <h3>What are Software & Data Integrity Failures?</h3>
      <p>Imagine buying a sealed medicine bottle from a pharmacy. You trust it because the seal proves nobody tampered with it. Now imagine the pharmacy stops using seals — anyone could swap the pills with sugar tablets and you'd never know. This is a <strong>Software & Data Integrity Failure</strong>.</p>

      <h3>Getting Started</h3>
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
      </div>
    `,
    questions: [
      { q: "What is the name of the unsigned, unverified package in the registry?", a: "log-service" },
      { q: "What is the flag for the unsigned package vulnerability?", a: "CTF{uns1gn3d_p4ck4g3_4cc3pt3d}" },
      { q: "What is the flag for the insecure CI/CD pipeline?", a: "CTF{c1cd_p1p3l1n3_t4mp3r3d}" },
      { q: "What type of seal/proof should software packages have to prove they haven't been tampered with?", a: "digital signatures" }
    ]
  },
  {
    title: "2. Insecure Deserialization",
    points: 60,
    html: `
      <h3>Exploiting the Plugin Loader</h3>
      <p>The DevOps Console has a plugin loader that accepts Base64-encoded JSON configurations and deserializes them without any validation. This is a classic <strong>insecure deserialization</strong> vulnerability.</p>

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
      </div>
    `,
    questions: [
      { q: "What encoding format does the plugin loader accept?", a: "Base64" },
      { q: "What is the flag for the deserialization attack?", a: "CTF{d3s3r14l1z4t10n_4tt4ck}" },
      { q: "What JavaScript function encodes text to Base64 in the browser console?", a: "btoa" }
    ]
  },
  {
    title: "3. Data Tampering & Mitigations",
    points: 50,
    html: `
      <h3>Cookie Tampering</h3>
      <p>The application stores user preferences in a Base64-encoded cookie without any integrity verification (no HMAC, no signature). An attacker can decode, modify, and re-encode the cookie to escalate privileges.</p>

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
      <p><strong>4. Input Validation:</strong> Never trust deserialized data — always validate structure and content after decoding.</p>
    `,
    questions: [
      { q: "What is the flag for cookie tampering?", a: "CTF{d4t4_1nt3gr1ty_f41lur3}" },
      { q: "What cryptographic mechanism should be used to verify cookie integrity?", a: "HMAC" },
      { q: "What HTML attribute verifies the integrity of external scripts loaded from CDNs?", a: "Subresource Integrity" },
      { q: "What role did you change in the cookie to trigger the flag?", a: "admin" }
    ]
  }
];
