const LESSONS = [
  {
    title: "1. What is SSRF?",
    points: 50,
    html: `
      <h3>What is SSRF?</h3>
      <p>Imagine you are inside a gated corporate building. You aren't allowed to enter the highly secure Server Room, but there is a friendly delivery robot that can go anywhere in the building to fetch packages. If you tell the robot, "Go fetch a package from Room 101 (a public room)," it does so. But what if you tell it, "Go fetch the blueprints from the Server Room (which is normally locked to outsiders) and bring them back to me"? Because the robot is already inside the building's security perimeter, the doors open for it, and it blindly brings you the secret blueprints! This is <strong>Server-Side Request Forgery (SSRF)</strong>.</p>
      
      <p>In a web application, SSRF occurs when a server fetches a remote resource (like an image, file, or API response) from a URL provided by the user. If the website does not validate this URL, an attacker can supply internal URLs (like <code>http://127.0.0.1/admin</code>) and force the server to read local files, query internal databases, or access protected control panels that are not exposed to the public internet.</p>

      <h3>Why is SSRF Dangerous?</h3>
      <p>SSRF allows attackers to:
        <ul>
          <li><strong>Bypass Firewalls:</strong> Access internal services (such as databases, Redis, or admin portals) running on loopback interfaces.</li>
          <li><strong>Leak Cloud Metadata:</strong> On AWS, Azure, or Google Cloud, query the internal link-local IP <code>http://169.254.169.254</code> to steal IAM credentials or API keys.</li>
          <li><strong>Internal Port Scanning:</strong> Port scan the local network from the server's perspective.</li>
        </ul>
      </p>

      <h3>Getting Started with the Lab</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Launch the Target</strong><br>
          Click the <span class="badge orange">Launch Field Test</span> button above. A new browser tab will open showing the <strong>SecureCorp API Portal</strong>.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Log In</strong><br>
          Access the employee portal using these credentials:<br>
          <code>Username: employee_john</code><br>
          <code>Password: password123</code>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Exploit Basic SSRF</strong><br>
          Look at **Tool 1: General Web Previewer**. It takes any URL and displays its contents. If you try to visit <code>http://<TARGET_IP>/admin</code> in your own browser, you will get a <code>403 Access Denied</code> because the admin page only allows requests originating from local loopback (127.0.0.1).<br><br>
          Input <code>http://127.0.0.1/admin</code> into the General Web Previewer input field and click <strong>Fetch Preview</strong>. The server will request the page locally, bypass the remote address firewall, and return the response containing your first flag!
        </div>
      </div>
    `,
    questions: [
      { q: "What does the first 'S' in SSRF stand for?", a: "Server" },
      { q: "What is the flag found in the local admin panel?", a: "CTF{SSRF_l0c4lh0st_byp4ss}" }
    ]
  },
  {
    title: "2. Bypassing Hostname/IP Filters",
    points: 70,
    html: `
      <h3>SSRF Filters & Blacklists</h3>
      <p>To defend against SSRF, developers often implement a **blacklist** filter. If they see words like <code>127.0.0.1</code> or <code>localhost</code> in the user's input, they reject the request immediately.</p>
      
      <p>However, blacklists are notoriously easy to bypass because there are many different ways to represent the same local loopback address in computer networking.</p>

      <h3>Common Loopback Bypass Techniques</h3>
      <p>If a firewall blocks the literal strings <code>127.0.0.1</code> and <code>localhost</code>, you can try:
        <ul>
          <li><strong>Alternative IP representations:</strong>
            <ul>
              <li><code>127.1</code> (Omitted zeroes - resolved as 127.0.0.1)</li>
              <li><code>0.0.0.0</code> or <code>0</code> (Often maps to localhost on Linux)</li>
              <li><code>[::1]</code> (IPv6 loopback address)</li>
            </ul>
          </li>
          <li><strong>Decimal/Hex IP encoding:</strong>
            <ul>
              <li><code>2130706433</code> (Decimal equivalent of 127.0.0.1)</li>
              <li><code>0x7f000001</code> (Hexadecimal equivalent of 127.0.0.1)</li>
              <li><code>0177.0.0.1</code> (Octal representation of 127.0.0.1)</li>
            </ul>
          </li>
          <li><strong>DNS Redirection:</strong>
            <ul>
              <li>Using a domain that resolves to 127.0.0.1, such as <code>local.securecorp.com</code> or wildcards like <code>127.0.0.1.nip.io</code>.</li>
            </ul>
          </li>
        </ul>
      </p>

      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Identify the Firewall Restriction</strong><br>
          Scroll down to **Tool 2: Secure Endpoint Status Checker**. This tool is configured with a blacklist blocking <code>127.0.0.1</code> and <code>localhost</code>.<br>
          Try to fetch <code>http://127.0.0.1/secure-admin</code> or <code>http://localhost/secure-admin</code>. You will receive a security alert from the firewall.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Bypass the Blacklist</strong><br>
          Attempt one of the alternative representations listed above. For example, construct a URL targeting <code>/secure-admin</code> but replacing the blocked host with a bypass pattern (e.g. <code>http://127.1/secure-admin</code>, <code>http://0.0.0.0/secure-admin</code>, or decimal <code>http://2130706433/secure-admin</code>).
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Fetch the Second Flag</strong><br>
          Submit the bypassed URL into Tool 2. When successful, the firewall will be bypassed, and the server will return the response from the secure admin page containing the second flag!
        </div>
      </div>
    `,
    questions: [
      { q: "Which protocol version uses '[::1]' as the loopback address? (IPv4/IPv6)", a: "IPv6" },
      { q: "What is the flag found in the bypassed secure admin panel?", a: "CTF{SSRF_byp4ss_bl4ckl1st}" }
    ]
  }
];
