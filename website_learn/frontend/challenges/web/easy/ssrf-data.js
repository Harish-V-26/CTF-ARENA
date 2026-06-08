const LESSONS = [
  {
    title: "1. What is SSRF & Alternative Schemes",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/ssrf_concept_diagram.png" alt="SSRF Concept Diagram" style="width: 100%; max-width: 600px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); margin: 15px 0;"></div>
      <h3>What is SSRF?</h3>
      <p>Server-Side Request Forgery (SSRF) is a web security vulnerability that allows an attacker to induce the server-side application to make HTTP requests to an arbitrary domain of the attacker's choosing. In a typical SSRF exploit, the attacker might cause the server to make a connection back to itself, or to other web-based services within the organization's infrastructure, or to external third-party systems.</p>
      <p>Imagine you are inside a gated corporate building. You aren't allowed to enter the highly secure Server Room, but there is a friendly delivery robot that can go anywhere in the building to fetch packages. If you tell the robot, "Go fetch a package from Room 101 (a public room)," it does so. But what if you tell it, "Go fetch the blueprints from the Server Room (which is normally locked to outsiders) and bring them back to me"? Because the robot is already inside the building's security perimeter, the doors open for it, and it blindly brings you the secret blueprints! This is exactly how SSRF works.</p>
      <p>In a web application, if the website does not validate a user-supplied URL, an attacker can supply internal URLs (like <code>http://127.0.0.1/admin</code>) and force the server to read local files, query internal databases, or access protected control panels that are not exposed to the public internet.</p>
      <h3>Vulnerable Protocol Schemes</h3>
      <p>Developers often assume SSRF only involves HTTP or HTTPS protocols. However, if the underlying fetch library supports other URI schemes, attackers can request:
        <ul>
          <li><strong>file://</strong> — Read local files from the server's disk (e.g. <code>file:///etc/passwd</code> or <code>file:///flag.txt</code>).</li>
          <li><strong>gopher://</strong> — Construct raw TCP payloads (essential for interacting with Redis, Memcached, or databases).</li>
          <li><strong>dict://</strong> — Connect to internal ports and retrieve banners or list protocols.</li>
        </ul>
      </p>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Launch the Target</strong><br>Click the <span class="badge orange">Launch Field Test</span> button above. A new browser tab will open showing the <strong>SecureCorp API Portal</strong>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Log In</strong><br>Access the employee portal using these credentials:<br><code>Username: employee_john</code><br><code>Password: password123</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Exploit file:// Scheme to Read Local Files</strong><br>Look at **Tool 1: General Web Previewer**. It takes any URL and displays its contents. If you try to visit <code>http://127.0.0.1/admin</code>, you will find out the flag is not hosted on the web page.<br><br>Since the backend URL previewer is vulnerable to SSRF and supports alternative protocols, input <code>file:///flag.txt</code> into the General Web Previewer input field and click <strong>Fetch Preview</strong>. The server will read the local flag file and display it in the preview box!</div>
      </div>`,
    questions: [
      { q: "What does the first 'S' in SSRF stand for?", a: "Server", hint: "Review the definitions and acronyms section." },
      { q: "Which URI scheme is used to read local files on the server? (e.g. http)", a: "file", hint: "Refer to the HTTP protocol details." },
      { q: "What is the flag found inside the local flag file?", a: "CTF{SSRF_f1l3_sch3m3_r34d}", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "2. Bypassing Hostname/IP Filters",
    points: 70,
    html: `<div class="htb-diagram-container"><img src="../../../assets/ssrf_filter_bypass.png" alt="SSRF Filter Bypass Diagram" style="width: 100%; max-width: 600px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); margin: 15px 0;"></div>
      <h3>SSRF Filters & Blacklists</h3>
      <p>To defend against SSRF, developers often implement a **blacklist** filter. If they see words like <code>127.0.0.1</code> or <code>localhost</code> in the user's input, they reject the request immediately.</p>
      <p>However, blacklists are notoriously easy to bypass because there are many different ways to represent the same local loopback address in computer networking.</p>
      <h3>Common Loopback Bypass Techniques</h3>
      <p>If a firewall blocks the literal strings <code>127.0.0.1</code> and <code>localhost</code>, you can try:
        <ul>
          <li><strong>Alternative IP representations:</strong>
            <ul>
              <li><code>127.1</code> (Omitted zeroes - resolved as 127.0.0.1)</li>
              <li><code>0.0.0.0</code> or <code>0</code> (Often maps to localhost on Linux systems)</li>
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
              <li>Using a domain that resolves to 127.0.0.1, such as <code>local.securecorp.com</code> or wildcard services like <code>127.0.0.1.nip.io</code>.</li>
            </ul>
          </li>
        </ul>
      </p>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Identify the Firewall Restriction</strong><br>Scroll down to **Tool 2: Secure Endpoint Status Checker**. This tool is configured with a blacklist blocking <code>127.0.0.1</code> and <code>localhost</code>.<br>Try to fetch <code>http://127.0.0.1/api/admin/config</code> or <code>http://localhost/api/admin/config</code>. You will receive a security alert from the firewall.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Bypass the Blacklist</strong><br>Attempt one of the alternative representations listed above. Construct a URL targeting the admin configuration API (<code>/api/admin/config</code>) but replacing the blocked host with a bypass pattern (e.g. <code>http://127.1/api/admin/config</code>, <code>http://0.0.0.0/api/admin/config</code>, or decimal <code>http://2130706433/api/admin/config</code>).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Fetch the Second Flag</strong><br>Submit the bypassed URL into Tool 2. When successful, the firewall will be bypassed, and the server will return the response from the secure administrative configuration API containing the flag in a JSON property!</div>
      </div>`,
    questions: [
      { q: "Which protocol version uses '[::1]' as the loopback address? (IPv4/IPv6)", a: "IPv6", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag found in the secure configuration API JSON?", a: "CTF{SSRF_byp4ss_bl4ckl1st}", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "3. Cloud Metadata Services (IMDSv1)",
    points: 80,
    html: `<div class="htb-diagram-container"><img src="../../../assets/ssrf_metadata_diagram.png" alt="Cloud Metadata Diagram" style="width: 100%; max-width: 600px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); margin: 15px 0;"></div>
      <h3>SSRF in Cloud Environments</h3>
      <p>In modern cloud environments (AWS, GCP, Azure), virtual machine instances have access to a local **Instance Metadata Service (IMDS)**. This service allows instances to retrieve information about themselves, including networks, instance IDs, and most importantly, temporary IAM role credentials.</p>
      <p>This service is accessible via a link-local, non-routable IP address: <strong><code>http://169.254.169.254</code></strong>. Because it requires no authentication from within the VM, any SSRF vulnerability in a hosted application allows attackers to query this IP address and steal the server's cloud identity credentials.</p>
      <h3>Exploitation Steps (AWS IMDSv1)</h3>
      <p>Under AWS IMDSv1, fetching metadata is a straightforward GET request:
        <ul>
          <li><code>http://169.254.169.254/latest/meta-data/</code> — List top-level metadata categories.</li>
          <li><code>http://169.254.169.254/latest/meta-data/iam/security-credentials/</code> — List the IAM roles attached to the instance.</li>
          <li><code>http://169.254.169.254/latest/meta-data/iam/security-credentials/&lt;ROLE_NAME&gt;</code> — Retrieve AWS access keys, secret keys, and session tokens.</li>
        </ul>
      </p>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Enumerate the Metadata Service</strong><br>In <strong>Tool 1</strong>, input <code>http://169.254.169.254/latest/meta-data/</code> and click <strong>Fetch Preview</strong>. Observe the category list returned.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Identify the Active IAM Role</strong><br>Now query the security credentials subcategory by entering <code>http://169.254.169.254/latest/meta-data/iam/security-credentials/</code>. Note down the role name returned in the response body.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Extract the Temporary Credentials</strong><br>Fetch the actual credentials file for the role name you found: <code>http://169.254.169.254/latest/meta-data/iam/security-credentials/&lt;ROLE_NAME&gt;</code>. You will receive a JSON structure containing AWS credentials and the third flag!</div>
      </div>`,
    questions: [
      { q: "What is the standard link-local IP used to access instance metadata?", a: "169.254.169.254", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the IAM role name configured for this simulated instance?", a: "admin-role", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the flag found in the temporary security token?", a: "CTF{SSRF_cl0ud_m3t4d4t4_l34k}", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "4. SSRF Mitigations & IMDSv2",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/ssrf_mitigations.png" alt="SSRF Mitigations Diagram" style="width: 100%; max-width: 600px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); margin: 15px 0;"></div>
      <h3>How to Prevent SSRF</h3>
      <p>Securing applications against SSRF requires defense-in-depth since attackers are skilled at bypassing filters. Effective mitigations include:
        <ul>
          <li><strong>Allowlists:</strong> Do not use blacklists. Validate inputs against a strict allowlist of approved schemas (only HTTP/HTTPS), domains, and ports.</li>
          <li><strong>Disable Unused Protocols:</strong> Ensure the HTTP client library only supports <code>http://</code> and <code>https://</code>, explicitly disabling alternative schemes like <code>file://</code>, <code>gopher://</code>, or <code>ftp://</code>.</li>
          <li><strong>Network Segregation:</strong> Configure local firewalls (e.g., iptables) to block outbound web server requests to internal systems (like databases, Redis) and the link-local metadata IP.</li>
          <li><strong>DNS Resolution Checking:</strong> Perform DNS resolution on the input URL, verify it resolves to a public IP address (not a private subnet like 10.x.x.x, 192.168.x.x, or 127.x.x.x), and perform the fetch using the resolved IP to prevent DNS Rebinding attacks.</li>
        </ul>
      </p>
      <h3>Mitigating Cloud SSRF with AWS IMDSv2</h3>
      <p>To defend cloud environments against SSRF, AWS introduced <strong>IMDSv2</strong>. IMDSv2 converts the simple GET requests of IMDSv1 into a session-oriented request flow:
        <ol>
          <li>The client must make an HTTP <strong>PUT</strong> request to <code>http://169.254.169.254/latest/api/token</code> with a header specifying token expiration.</li>
          <li>The client receives a session token in response.</li>
          <li>The client performs a <strong>GET</strong> request to retrieve metadata categories, passing the token in the <code>X-aws-ec2-metadata-token</code> HTTP header.</li>
        </ol>
        Because simple SSRF vulnerabilities only allow attackers to perform standard GET requests (and typically do not let them inject arbitrary HTTP headers or perform PUT requests), IMDSv2 successfully mitigates the vast majority of metadata leak vectors!
      </p>`,
    questions: [
      { q: "Which version of the AWS Instance Metadata Service requires a PUT request and token header?", a: "IMDSv2", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Is it safer to use an input validation blacklist or an allowlist?", a: "allowlist", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  }
];
