const LESSONS = [
  {
    title: "1. Robots.txt & Sitemap.xml",
    points: 40,
    html: `<div class="htb-diagram-container"><img src="../../../assets/recon_lesson1.png" alt="1. Robots.txt & Sitemap.xml"></div>
      <h3>Search Engine Artifacts: Robots.txt and Sitemap.xml</h3>
      <p>Web servers utilize <code>robots.txt</code> and <code>sitemap.xml</code> to dictate crawling policies to search engine spiders (like Googlebot). <code>robots.txt</code> implements the Robots Exclusion Protocol to block specific URIs from being indexed, while <code>sitemap.xml</code> provides an exhaustive XML map of all public routes. Both are prime targets for reconnaissance to uncover hidden or unlinked directories.</p>
      <p>Imagine a giant library where a busy robot librarian is taking notes on every single book. The staff has a secret back room with a sign saying "Robot Librarian: Do Not Enter!" This sign is exactly what the robots.txt file is! It tells search engines what NOT to look at. But hackers can read this sign too, revealing secret hiding spots! Similarly, sitemap.xml is the ultimate treasure map, listing every single public page on the website.</p>
      <h3>Practical Task</h3>
      <div class="step-block">
        <div class="step-num">Task</div>
        <div class="step-body"><strong>Locate Files</strong><br>On our target server, browse directly to <code>/robots.txt</code> and <code>/sitemap.xml</code> via your browser URL bar. Answer the questions below using the hidden paths you find within them.</div>
      </div>`,
    questions: [
      { q: "What file acts like a 'Do Not Enter' sign for search engine robots?", a: "robots.txt", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What file acts like a treasure map listing every page on the website?", a: "sitemap.xml", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "In robots.txt, what word is used to tell robots they cannot enter a path?", a: "Disallow", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "In our target's robots.txt, what hidden path is listed? (e.g. /admin)", a: "/staging", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Why do hackers like looking at robots.txt? (Type: reveals hidden paths)", a: "reveals hidden paths", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "2. Finding What Things Are Made Of",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/recon_lesson2.png" alt="2. Finding What Things Are Made Of"></div>
      <h3>Technology Fingerprinting</h3>
      <p>Web technology fingerprinting involves analyzing HTTP headers, HTML source code, DOM variables, and cookie structures to definitively identify the software stack powering a target web application (e.g., Nginx, PHP, WordPress). Identifying exact software versions allows attackers to search CVE databases for known public exploits.</p>
      <p>Imagine you are a master chef tasting a cake. Even without seeing the recipe, you can taste the vanilla, flour, and chocolate chips. You are figuring out what the cake is made of. In cybersecurity, this is "fingerprinting." When hackers look at a website, they use tools to taste the code and find out if it was built with WordPress or PHP. If they know the ingredients, they know exactly how to break it!</p>
      <h3>Command-Line Fingerprinting</h3>
      <div class="step-block">
        <div class="step-num">Task</div>
        <div class="step-body"><strong>Use WhatWeb</strong><br>Spin up the Kali container. Run the command <code>whatweb -v &lt;TARGET_URL&gt;</code> to scan the website's ingredients. Review the output to determine the server stack.</div>
      </div>`,
    questions: [
      { q: "What is the process of figuring out what technologies a website uses called?", a: "fingerprinting", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What command-line tool did we use to scan the website's ingredients?", a: "whatweb", hint: "Check the command reference blocks." },
      { q: "What flag makes WhatWeb talk a lot and give more detailed information?", a: "-v", hint: "Check the command reference blocks." },
      { q: "Run whatweb on the target. What web server does it say it is using? (type: nginx)", a: "nginx", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What HTTP header often gives away the server's secret software name?", a: "Server", hint: "Refer to the HTTP protocol details." }
    ]
  },
  {
    title: "3. Wappalyzer — The Browser Detective",
    points: 0,
    html: `<div class="htb-diagram-container"><img src="../../../assets/recon_lesson3.png" alt="3. Wappalyzer — The Browser Detective"></div>
      <h3>Passive Fingerprinting via Browser Extensions</h3>
      <p>Wappalyzer is a passive fingerprinting utility implemented as a browser extension. It analyzes the DOM and network traffic of the active tab in real-time, matching thousands of regex signatures against HTML elements, script tags, and API endpoints to passively map the technology stack without triggering intrusion detection systems.</p>
      <p>What if you could figure out what a website is made of just by visiting it? Wappalyzer is a special add-on you install in your browser. It sits quietly in the corner, and every time you visit a new site, it automatically figures out all the technologies being used. It's like wearing X-ray glasses! Just click the icon, and a menu pops down showing the databases, languages, and analytics tools.</p>
      <h3>Practical Task</h3>
      <div class="step-block">
        <div class="step-num">Note</div>
        <div class="step-body"><strong>Awareness</strong><br>We don't have questions for this lesson, but install the Wappalyzer extension in your personal browser to see it in action on real websites!</div>
      </div>`,
    questions: []
  },
  {
    title: "4. Guessing Hidden Folders (Fuzzing)",
    points: 60,
    html: `<div class="htb-diagram-container"><img src="../../../assets/recon_lesson4.png" alt="4. Guessing Hidden Folders (Fuzzing)"></div>
      <h3>Directory Fuzzing (Brute-Force Enumeration)</h3>
      <p>Directory and file fuzzing is the automated process of sequentially appending thousands of predefined payload strings (from a wordlist) to a base URL to discover unlinked assets. HTTP status codes (like 200 OK or 403 Forbidden) are analyzed to confirm the existence of hidden administrative panels or backup archives.</p>
      <p>Imagine you are in a giant house with thousands of blank doors. None of the doors have labels. Trying them all would take forever! Instead, you use a super-fast robot that can try opening thousands of doors every second. Websites often have secret folders (like "/admin"). "Fuzzing" uses a computer program to rapidly guess thousands of different folder names from a dictionary to see if any of them exist!</p>
      <h3>Fuzzing Execution</h3>
      <div class="step-block">
        <div class="step-num">Task</div>
        <div class="step-body"><strong>Use ffuf</strong><br>In your Kali container, use the <code>ffuf</code> command to brute-force directories. Example: <code>ffuf -w /usr/share/wordlists/dirb/common.txt -u http://&lt;TARGET&gt;/FUZZ</code>. Look for paths returning status 200.</div>
      </div>`,
    questions: [
      { q: "What is the process of rapidly guessing folder names to find hidden ones called?", a: "fuzzing", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What super-fast tool do we use to guess these secret paths?", a: "ffuf", hint: "Look for the specific tools mentioned in the lesson." },
      { q: "What special word do we use as a placeholder to tell the tool where to guess?", a: "FUZZ", hint: "Look for the specific tools mentioned in the lesson." },
      { q: "What flag in the tool tells it to ignore pages that say 'Not Found'?", a: "-fc", hint: "Check the command reference blocks." },
      { q: "What number code does a website send when a page is 'Not Found'?", a: "404", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "5. Finding Secret Subdomains",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/recon_lesson5.png" alt="5. Finding Secret Subdomains"></div>
      <h3>Subdomain Enumeration & Virtual Host Fuzzing</h3>
      <p>Subdomain enumeration maps the broader attack surface of an organization. While public subdomains can be found via DNS brute-forcing or OSINT, internal Virtual Hosts (vhosts) on the same IP address must be discovered by fuzzing the HTTP Host header, tricking the reverse proxy into routing requests to hidden development environments.</p>
      <p>Think of a big company like a giant shopping mall. The main address is "mall.com". But inside, there are special areas like "staff.mall.com" or "test.mall.com". Finding these subdomains is super important! The main site is heavily guarded, but a forgotten testing subdomain might be guarded poorly, like a flimsy unlocked back door. We fuzz the 'Host header' (like swapping name tags) to trick the server into revealing them.</p>
      <h3>Practical Task</h3>
      <div class="step-block">
        <div class="step-num">Task</div>
        <div class="step-body"><strong>Understand VHost Fuzzing</strong><br>Review the concepts of subdomain and virtual host enumeration to answer the questions below.</div>
      </div>`,
    questions: [
      { q: "In the address 'admin.example.com', what do we call the 'admin' part?", a: "subdomain", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the word for finding and listing all the entry points of a target?", a: "enumeration", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What part of the web request acts like a 'name tag' that we can fuzz to find subdomains?", a: "Host header", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Why do hackers look for subdomains? (To find hidden...)", a: "entry points", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What subdomain name is often used by companies to test new things before they are public?", a: "staging", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "6. Capture the Flag — Recon Challenge",
    points: 60,
    html: `<div class="htb-diagram-container"><img src="../../../assets/recon_lesson6.png" alt="6. Capture the Flag — Recon Challenge"></div>
      <h3>Comprehensive Reconnaissance Simulation</h3>
      <p>Effective reconnaissance requires chaining multiple discovery vectors. A penetration tester will correlate data found in robots.txt exclusions with active directory brute-forcing techniques to map the full topology of the target web application, leading directly to the identification of unprotected, high-value assets.</p>
      <p>It's time to put your detective skills to work! The target server has a secret flag hidden inside it (e.g., <code>CTF{secret}</code>). Your goal is to find it! Act like a search engine robot and check for "Do Not Enter" signs (robots.txt). Then, use your fast fuzzing robot (ffuf) to blast the website with guesses. When you find the hidden door, navigate there in your browser to capture the flag!</p>
      <h3>Challenge Execution</h3>
      <div class="step-block">
        <div class="step-num">Action</div>
        <div class="step-body"><strong>Find the Flag</strong><br>Use <code>ffuf</code> to discover the hidden directory. Browse to that directory in your web browser. Read the flag displayed on the screen and submit it below.</div>
      </div>`,
    questions: [
      { q: "What tool did you use to discover the hidden directory? (ffuf / WhatWeb / Wappalyzer)", a: "ffuf", hint: "Look for the specific tools mentioned in the lesson." },
      { q: "What path on the server contains the flag? (e.g. /admin)", a: "/staging", hint: "Check the command reference blocks." },
      { q: "What is the flag you found on the staging page? (format: CTF{...})", a: "CTF{r3c0n_m4st3r_2026}", hint: "Check the command reference blocks." },
      { q: "What technique did you use to discover hidden paths by trying thousands of common directory names?", a: "fuzzing", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Are you ready to move on to the next challenge? (yes/no)", a: "yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  }
];
