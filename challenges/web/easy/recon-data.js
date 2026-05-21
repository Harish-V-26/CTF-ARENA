const LESSONS = [
  {
    title: "Robots.txt & Sitemap.xml",
    points: 40,
    content: "Every web server can expose hidden information through two special files that are meant for search engine crawlers.\n\n📄 robots.txt\nThis file tells crawlers which pages NOT to index. Ironically, it also tells attackers exactly where the sensitive pages are!\n\nTo check it, navigate to:\n  http://host.docker.internal/robots.txt\n\nYou will often find entries like:\n  Disallow: /admin\n  Disallow: /staging\n  Disallow: /backup\n\n📄 sitemap.xml\nThis file lists ALL pages on the site so search engines can index them. For an attacker, it is a complete map of the application.\n\nTo check it, navigate to:\n  http://host.docker.internal/sitemap.xml\n\nTASK: On our target server (launch it above), browse to /robots.txt and /sitemap.xml. Answer the questions below using what you find.",
    questions: [
      { q: "What file tells search engine crawlers which paths to avoid indexing?", a: "robots.txt" },
      { q: "What file provides a complete map of all URLs on a website for search engines?", a: "sitemap.xml" },
      { q: "In robots.txt, what directive is used to block a path from crawlers?", a: "Disallow" },
      { q: "In our target's robots.txt, what hidden path is listed as Disallow? (e.g. /admin)", a: "/staging" },
      { q: "Why is robots.txt useful to a penetration tester? (Type: reveals hidden paths)", a: "reveals hidden paths" }
    ]
  },
  {
    title: "Tech Stack Fingerprinting with WhatWeb",
    points: 50,
    content: "Before exploiting a web app, you need to know what it's built with. This is called fingerprinting.\n\n🔧 Tool: whatweb\nWhatWeb is a command-line tool that identifies technologies used by a website — web framework, CMS, server type, JavaScript libraries, and more.\n\nInstallation (Kali Linux):\n  whatweb is pre-installed on Kali Linux.\n\nBasic usage:\n  whatweb http://host.docker.internal\n\nVerbose output (more detail):\n  whatweb -v http://host.docker.internal\n\nVery aggressive scan:\n  whatweb -a 3 http://host.docker.internal\n\nTASK: Spin up the Kali container above and run WhatWeb against the target server. Answer the questions below.",
    questions: [
      { q: "What is the name of the command-line tool used for web technology fingerprinting in this lab?", a: "whatweb" },
      { q: "What flag makes WhatWeb output more detailed information?", a: "-v" },
      { q: "What browser extension can identify web technologies without using the terminal?", a: "Wappalyzer" },
      { q: "Run: whatweb http://host.docker.internal. What web server does it detect? (type: nginx)", a: "nginx" },
      { q: "What HTTP header often reveals the server software (e.g., Apache, nginx, Python)? (type the header name)", a: "Server" }
    ]
  },
  {
    title: "Instruction: Wappalyzer",
    points: 0,
    content: "🔧 Tool: Wappalyzer\n\nWappalyzer is a free browser extension (Chrome/Firefox) that identifies web technologies visually. Unlike command-line tools, it runs directly in your browser and displays detected stacks in a clean popup.\n\nKey Features:\n• Instantly detects CMS, frameworks, and analytics\n• Works as you browse the target site\n• Perfect for quick surface mapping\n\nNote: For this specific lab environment, we focus on terminal-based reconnaissance (WhatWeb), but Wappalyzer is an essential tool for any web penetration tester's toolkit.",
    questions: []
  },
  {
    title: "Directory & Path Fuzzing with ffuf",
    points: 60,
    content: "Web servers often have hidden directories and files that are not linked from the main page. Fuzzing means automatically trying thousands of possible paths to discover them.\n\n🔧 Tool: ffuf (Fuzz Faster U Fool)\nffuf is a blazing-fast web fuzzer that uses wordlists to brute-force paths.\n\nInstallation (Kali Linux):\n  ffuf is pre-installed on Kali.\n\nBasic directory fuzzing command:\n  ffuf -u http://host.docker.internal/FUZZ -w /usr/share/wordlists/dirb/common.txt\n\n  -u    = Target URL (FUZZ is the placeholder for the wordlist word)\n  -w    = Path to the wordlist file\n\nFilter out 404 responses to reduce noise:\n  ffuf -u http://host.docker.internal/FUZZ -w /usr/share/wordlists/dirb/common.txt -fc 404\n\nTASK: Run ffuf against the target server. Find the hidden paths that are NOT linked from the homepage.",
    questions: [
      { q: "What does 'FUZZ' represent in an ffuf command?", a: "the placeholder for the wordlist word" },
      { q: "What flag in ffuf specifies the wordlist to use?", a: "-w" },
      { q: "What flag filters out responses with a specific HTTP status code?", a: "-fc" },
      { q: "Run ffuf against the target. What hidden path responds with HTTP 200? (type the path, e.g. /admin)", a: "/staging" },
      { q: "What HTTP status code means 'Not Found'?", a: "404" }
    ]
  },
  {
    title: "Subdomain Enumeration",
    points: 50,
    content: "Large web applications often have multiple subdomains (e.g., staging.example.com, api.example.com, admin.example.com). Discovering these is a key part of attack surface mapping.\n\n🔧 Technique: Virtual Host Fuzzing with ffuf\nSince our lab is local, we fuzz virtual hosts using the Host header rather than DNS.\n\nCommand:\n  ffuf -u http://host.docker.internal -H 'Host: FUZZ.target.local' -w /usr/share/wordlists/dirb/common.txt -fw 1\n\n  -H    = Sets a custom HTTP header\n  -fw   = Filters results by number of words in the response (to remove identical 'not found' pages)\n\n🔎 Real-world subdomain tools:\n  - subfinder   = passive subdomain discovery\n  - amass       = active/passive OSINT subdomain enumeration\n  - dnsx        = DNS resolution and validation\n\nTASK: Answer the knowledge-check questions about subdomain enumeration concepts and techniques.",
    questions: [
      { q: "What part of a URL like 'admin.example.com' is the subdomain?", a: "admin" },
      { q: "What HTTP header can be fuzzed to discover virtual hosts on a shared server?", a: "Host" },
      { q: "What ffuf flag filters results by the number of words in the response body?", a: "-fw" },
      { q: "What is the process of mapping all entry points and exposed surfaces of a target called?", a: "attack surface mapping" },
      { q: "What subdomain is commonly used for a pre-production test environment?", a: "staging" }
    ]
  },
  {
    title: "Capture the Flag — Recon Challenge",
    points: 60,
    content: "Time to put everything together! The target server has a hidden flag waiting to be found using only the recon skills from this lab.\n\n🎯 Challenge:\nThe flag is hidden somewhere on the target server. Use the following steps to find it:\n\nStep 1: Check robots.txt — is there a path that is deliberately hidden?\nStep 2: Use ffuf to confirm the hidden path exists.\nStep 3: Browse to the discovered path in your browser while the target is running.\nStep 4: The page will display the flag — enter it below to complete the challenge.\n\n💡 Tip:\nThe flag follows the format: CTF{...} — you must discover the exact value yourself!",
    questions: [
      { q: "What tool did you use to discover the hidden directory? (ffuf / WhatWeb / Wappalyzer)", a: "ffuf" },
      { q: "What path on the server contains the flag? (e.g. /admin)", a: "/staging" },
      { q: "What is the flag you found on the staging page? (format: CTF{...})", a: "CTF{r3c0n_m4st3r_2026}" },
      { q: "What technique did you use to discover hidden paths by trying thousands of common directory names?", a: "fuzzing" },
      { q: "Are you ready to move on to the next challenge? (yes/no)", a: "yes" }
    ]
  }
];
