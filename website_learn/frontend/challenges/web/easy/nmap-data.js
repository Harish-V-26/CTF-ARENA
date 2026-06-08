const LESSONS = [
  {
    title: "1. What is Nmap?",
    points: 20,
    icon: "../../../assets/nmap_whatis.png",
    content: `<div class="htb-diagram-container"><img src="../../../assets/nmap_whatis.png" alt="What is Nmap?"></div>
 WHAT IS NMAP? 
Imagine you are a brave explorer looking for hidden treasure in a giant, dark castle. The castle has thousands of doors, and you need to know which ones are open, which ones are locked, and what is hiding behind them. In the computer world, networks are like that giant castle, and hackers use a magical flashlight called "Nmap" to explore it. Nmap stands for Network Mapper. It is a free tool that you can type into your computer, and it acts like an incredibly fast robot explorer. You tell the robot to run down the digital hallways, jiggle every single door handle, and report back to you. It tells you exactly which computers are turned on, which digital doors (called ports) are wide open, and even tries to peek inside the rooms to see what kind of software is running in there.

 A FAMOUS HOLLYWOOD HACKER TOOL
Nmap isn't just some random toy; it is the most famous and widely used network scanning tool in the entire world! It was created way back in 1997 by a very smart programmer named Gordon "Fyodor" Lyon, and thousands of people have helped make it better over the last 25 years. Because it is the real tool that actual hackers and cybersecurity experts use every single day, it has become incredibly famous in Hollywood movies. Have you ever watched a movie like The Matrix Reloaded, Die Hard 4, or The Bourne Ultimatum, and seen a hacker typing crazy green text on a black screen to break into a system? If you look closely at the screen in those movies, they are almost always using real Nmap commands! When you learn to use Nmap, you are learning to use the exact same tool the movie stars use.

 THE RULES OF THE GAME
Before we start sending our robot explorer out to jiggle door handles, there is one very important rule you must learn. Sending Nmap to explore a computer network that you do not own is like walking up to a stranger's house and checking to see if their front door is unlocked. It is extremely illegal in most places, and you can get in huge trouble! You must only use Nmap on your own computers, in safe practice labs like this one, or on networks where the owner has signed a piece of paper giving you explicit permission to test their locks. Good hackers use Nmap to help companies find their open doors and lock them before the bad guys do.`,
    questions: [
      { q: "What does Nmap stand for?", a: "Network Mapper" },
      { q: "What year was the famous Nmap tool created?", a: "1997" },
      { q: "What do we call the 'digital doors' on a computer that Nmap checks?", a: "ports" },
      { q: "Is Nmap a free tool that anyone can use? (yes/no)", a: "yes" },
      { q: "Is it legal to use Nmap on a stranger's computer without permission? (yes/no)", a: "no" }
    ]
  },
  {
    title: "2. Why Do We Use Nmap?",
    points: 20,
    icon: "../../../assets/nmap_why.png",
    content: `<div class="htb-diagram-container"><img src="../../../assets/nmap_why.png" alt="Why Do We Use Nmap?"></div>
 THE FIRST STEP OF HACKING
If you want to break into a fortress, you don't just run up to the front gate and start hitting it with a stick. You sit on a hill with binoculars, sketching a map, counting the guards, and finding the weakest window. In cybersecurity, this planning phase is called "Reconnaissance." It is always the very first step of any hacking mission, and it is the most important part! Nmap is the ultimate pair of digital binoculars. Security experts use it to gather as much information as possible about their target before they ever try to break in. If you don't do your reconnaissance, you are just guessing in the dark. Nmap turns the lights on so you can see exactly what you are dealing with.

 THE FIVE BIG QUESTIONS
When a hacker points Nmap at a target, they are trying to answer five massive questions. Question One: "Is this machine even turned on right now?" Nmap sends a quick ping to see if anyone answers. Question Two: "What doors are open?" Nmap checks all 65,535 doors to find the open ones. Question Three: "What is running behind the door?" If door number 80 is open, Nmap peeks inside to see if it is a web server or a database. Question Four: "What operating system is this computer using?" Nmap acts like a detective, looking at tiny clues to guess if it is a Windows computer or a Mac. Question Five: "Are there any easy traps to spring?" Nmap has special built-in scripts that can actually check if the open doors have known, famous security holes in them.

 WHO USES THIS TOOL?
Because Nmap answers so many important questions, almost everyone in the computer world uses it. Good-guy hackers (Penetration Testers) use it to find the weak spots in a company's armor so they can fix them. System Administrators (the people who run the networks) use it to make sure nobody accidentally left a dangerous door open. Bug Bounty Hunters use it to explore giant companies, hunting for forgotten, broken servers so they can earn a reward. Even network mechanics use it just to figure out why the internet isn't working properly! It is the Swiss Army knife of the internet.`,
    questions: [
      { q: "What is the very first step of any hacking mission called?", a: "Reconnaissance" },
      { q: "What Nmap feature checks for specific known security holes using scripts?", a: "NSE" },
      { q: "What do we call the good-guy hackers who test companies' armor?", a: "Penetration Testers" },
      { q: "Does Nmap try to guess if the computer is running Windows or a Mac? (yes/no)", a: "yes" },
      { q: "How many total 'doors' (ports) does Nmap have to check?", a: "65,535" }
    ]
  },
  {
    title: "3. How Does Nmap Actually Work?",
    points: 20,
    icon: "../../../assets/nmap_how.png",
    content: `<div class="htb-diagram-container"><img src="../../../assets/nmap_how.png" alt="How Does Nmap Actually Work?"></div>
 HOW COMPUTERS SHAKE HANDS
Imagine you walk up to a friend and say, "Hi, want to talk?" Your friend says, "Sure, let's talk!" Then you say, "Great, I'm ready!" This little three-step greeting is exactly how computers talk to each other on the internet. It is called the "TCP Three-Way Handshake." When your computer wants to connect to a website, it sends a tiny packet called a SYN (which means 'Synchronize' or 'Hello'). The server replies with a SYN-ACK ('Hello back, I am ready'). Finally, your computer sends an ACK ('Acknowledge, let's go'). Nmap is incredibly clever because it exploits this handshake to figure out if doors are open. Nmap sends the first 'Hello' packet to every single door. If the door is locked (closed), the server rudely yells back, "Go away!" (an RST packet). If the door is open, the server politely says, "Hello back!" (SYN-ACK). 

 THE SNEAKY STEALTH SCAN
If Nmap completes the full three-way handshake, the server's diary (the log) writes down, "Someone named Nmap just stopped by to say hello." Hackers don't want to leave their name in the diary! So, Nmap uses a brilliant trick called a Stealth Scan. Nmap sends the first 'Hello' packet. The server happily replies 'Hello back, I am ready!' But instead of finishing the handshake, Nmap suddenly sends an 'RST' packet, which means 'Never mind, forget I asked!' and runs away. Because the conversation was never actually finished, the server's diary usually doesn't write anything down. Nmap found out the door was open, but it didn't leave a trace. This sneaky trick is why Nmap is so powerful.

 UNDERSTANDING PORT STATES
When Nmap finishes knocking on all the doors, it gives you a neat little report card. It labels every door with a "State" so you know exactly what is going on. If the state is "open," it means a program is happily listening behind the door, ready to talk. This is the jackpot for a hacker! If the state is "closed," it means the computer is on, but nobody is standing behind that particular door. But sometimes, Nmap gets no answer at all. It knocks and knocks, but it is just total silence. When this happens, Nmap labels the door "filtered." This means there is a giant, invisible security wall (a firewall) standing in front of the door, catching Nmap's 'Hello' packets and throwing them in the trash before they even reach the door!`,
    questions: [
      { q: "What is the three-step greeting computers use to start talking called?", a: "TCP Three-Way Handshake" },
      { q: "What are the three steps of the handshake? (type: SYN, SYN-ACK, ACK)", a: "SYN, SYN-ACK, ACK" },
      { q: "What does Nmap do in a Stealth Scan after the server says 'Hello back'?", a: "sends an 'RST' (Never mind!) and runs away" },
      { q: "What state means a program is happily listening behind the door?", a: "open" },
      { q: "What state means a security wall (firewall) is blocking Nmap's packets?", a: "filtered" }
    ]
  },
  {
    title: "4. The Different Scan Types",
    points: 20,
    icon: "../../../assets/nmap_scantypes.png",
    content: `<div class="htb-diagram-container"><img src="../../../assets/nmap_scantypes.png" alt="The Different Scan Types"></div>
 THE MANY WAYS TO SCAN
Nmap is like a giant toolbox; it doesn't just have one way to scan, it has dozens! You tell Nmap which tool to use by adding a "flag" (a little dash and a letter) to your command. The most common tool is the Stealth Scan we just learned about. You use it by typing "-sS". But if you don't have the special administrator powers on your computer to be sneaky, you have to use the noisy, normal scan called the TCP Connect Scan, by typing "-sT". This completes the full handshake and leaves a big mess in the server's diary. If you want to check if the computer is even awake without knocking on all 65,535 doors, you use a Ping Scan by typing "-sn". This just yells "Are you there?" and waits for an answer. It is super fast and perfect for finding out how many computers are in the castle.

 THE DETECTIVE FLAGS
Once you find an open door, you want to know what is behind it. You use the Version Detection flag, "-sV". This makes Nmap politely knock on the open door and ask, "Excuse me, what software are you running?" The server might reply, "I am an Apache web server, version 2.4." This is incredibly useful because if version 2.4 has a famous broken lock, the hacker instantly knows how to break in! If you want to guess whether the whole computer is a Windows machine or a Linux machine, you use the OS Detection flag, "-O". Nmap looks at exactly how the computer answers its knocks, because Windows and Linux have slightly different accents when they talk. 

 THE EVERYTHING BURGER (AGGRESSIVE SCAN)
Sometimes you are in a rush and you just want Nmap to do absolutely everything at once. You want it to find the open doors, ask what software is running, guess the operating system, and run security checks all at the same time. You can do this by using the Aggressive Scan flag, "-A". It is like ordering the biggest, messiest burger on the menu! The Aggressive Scan is incredibly powerful and gives you a massive amount of information. But there is a catch: it is incredibly loud. Imagine throwing fireworks at the castle walls instead of sneaking around. Every security guard (and firewall) in the area will instantly know you are there. It is perfect for practice labs, but very dangerous to use if you are trying to be a sneaky ninja!`,
    questions: [
      { q: "What flag do you type to use the sneaky Stealth Scan?", a: "-sS" },
      { q: "What flag do you type to politely ask the open door what software version it is running?", a: "-sV" },
      { q: "What flag do you type to guess if the computer is running Windows or Linux?", a: "-O" },
      { q: "What flag does absolutely everything at once (the 'Everything Burger')?", a: "-A" },
      { q: "Is the Aggressive Scan (-A) sneaky and quiet, or extremely loud and messy?", a: "loud and messy" }
    ]
  },
  {
    title: "5. Practical: Discovering Live Hosts",
    points: 30,
    icon: "../../../assets/nmap_hosts.png",
    content: `<div class="htb-diagram-container"><img src="../../../assets/nmap_hosts.png" alt="Practical: Discovering Live Hosts"></div>
 TIME TO START EXPLORING!
Now it is time to put your hands on the keyboard and act like a real explorer. The first thing you always do is figure out who is awake in the castle. You don't want to waste hours knocking on the doors of a computer that is completely unplugged! We do this using Host Discovery. Imagine standing in a dark hallway and shining a flashlight. If someone is there, the light bounces back. Nmap does this by sending a "Ping" (a tiny echo request). To do this, you open your terminal and type: "nmap -sn 192.168.1.0/24". The "-sn" tells Nmap "Do a Ping Scan only, don't check the doors yet." The numbers at the end tell Nmap to shine its flashlight down the entire hallway, checking all 256 possible addresses in that neighborhood at once.

 DEFEATING THE FIREWALL
Sometimes, computers are extremely shy. They have a security wall (a firewall) that is programmed to completely ignore your Ping flashlights. You shine the light, and nothing bounces back, so you think the computer is turned off. But really, it is hiding! Hackers have a trick for this. They use the "-Pn" flag. This tells Nmap: "Assume the computer is awake, even if it ignores your Ping, and just go straight to checking the doors!" It takes a lot longer because Nmap will carefully check all the doors even if the computer really is turned off, but it is the only way to find those shy, hidden computers that are trying to ignore you.

 READING THE MAP
When Nmap finishes its Ping scan, it prints out a little map on your screen. It will look something like this: "Nmap scan report for 10.10.10.5. Host is up (0.0024s latency)." This is a success! "Host is up" means the computer is awake and ready to play. The "latency" is just a fancy word for how long it took the ping to travel there and bounce back. 0.0024 seconds means the computer is extremely close to you, probably on the exact same network. Once you have your list of awake computers, you can move on to the really fun part: checking their doors!`,
    questions: [
      { q: "What flag do you use to do a Ping scan to see who is awake without checking doors?", a: "-sn" },
      { q: "What does Nmap send to see if a computer is awake, like shining a flashlight?", a: "a Ping (echo request)" },
      { q: "What flag tells Nmap to ignore the Ping and assume the computer is awake?", a: "-Pn" },
      { q: "What phrase does Nmap print to tell you the computer is awake and ready?", a: "Host is up" },
      { q: "What is the fancy word for how long it took the ping to bounce back?", a: "latency" }
    ]
  },
  {
    title: "6. Practical: Scanning Open Ports",
    points: 30,
    icon: "../../../assets/nmap_ports.png",
    content: `<div class="htb-diagram-container"><img src="../../../assets/nmap_ports.png" alt="Practical: Scanning Open Ports"></div>
 KNOCKING ON THE DOORS
Now that you know which computers are awake, it is time to find their open doors (ports). If you just type "nmap" and the computer's address, Nmap will automatically knock on the 1,000 most popular doors. It knows that most people put their web servers on door 80, and their file servers on door 21, so it checks those first. This saves a lot of time! But sometimes you only want to check a few specific doors. You can use the "-p" flag. If you type "nmap -p 80,443 target-ip", Nmap will ONLY check door 80 and door 443. This is like running straight to the kitchen and the living room without bothering to check the bedrooms. It is incredibly fast.

 FINDING THE HIDDEN DOORS
Hackers know that security guards watch the popular doors very closely. So, if a hacker installs a secret backdoor into a computer, they usually hide it on a weird, high-numbered door, like door 31337 or door 9999. If you only scan the top 1,000 doors, you will completely miss the hacker's secret hideout! To fix this, you have to tell Nmap to scan every single door in the entire castle, all 65,535 of them. You do this by typing a special flag: "-p-". That little dash after the 'p' means "check everything from 1 to 65535." It takes a lot longer for the robot to run down that massive hallway, but it guarantees that absolutely nothing can stay hidden from you.

 IMPORTANT DOORS TO MEMORIZE
As an explorer, you need to memorize what usually lives behind the most popular doors. If door 80 is open, it almost always means a normal Website (HTTP) is running there. If door 443 is open, it is a Secure Website (HTTPS). Door 22 is a very special door called SSH; it allows administrators to log in and control the computer from far away. Door 21 is for FTP, which is like a giant digital filing cabinet where people can download files. And door 3306 is where the massive databases (MySQL) live, guarding all the passwords. When you see these numbers pop up on your Nmap scan, you will instantly know exactly what kind of treasure is hiding inside!`,
    questions: [
      { q: "If you don't give it any special instructions, how many popular doors does Nmap check?", a: "1,000" },
      { q: "What flag do you use to tell Nmap to check every single one of the 65,535 doors?", a: "-p-" },
      { q: "What kind of treasure is usually hiding behind door 80?", a: "a Website (HTTP)" },
      { q: "What is door 22 (SSH) used for?", a: "administrators controlling the computer from far away" },
      { q: "Why might a hacker hide their secret backdoor on a weird door like 31337?", a: "Because security guards only watch the popular doors" }
    ]
  },
  {
    title: "7. Practical: Saving Your Work",
    points: 30,
    icon: "../../../assets/nmap_saving.png",
    content: `<div class="htb-diagram-container"><img src="../../../assets/nmap_saving.png" alt="Practical: Saving Your Work"></div>
 KEEPING YOUR NOTES ORGANIZED
Imagine you spend three hours exploring a massive castle, writing down which doors are locked and which ones are open. But as you walk out, you trip, drop your notebook in a puddle, and the ink washes away! All your hard work is gone. When you run a giant Nmap scan, all the answers print out on your black terminal screen. If you close that window or turn off your computer, the answers disappear forever. Real hackers and security professionals never let this happen. They always tell Nmap to save its report card into a permanent file so they can read it later, share it with their team, or put it in their official security report.

 THE MAGIC EXPORT FLAGS
Nmap has special flags that tell it how to save the file. If you use the "-oN" flag, Nmap saves a "Normal" file. It looks exactly like what you see on your screen, which is great for humans to read. But computers are terrible at reading human text. So, you can use the "-oX" flag to save an "XML" file. This looks like crazy, messy code to you, but other hacking tools (like Metasploit) can read it instantly and understand everything Nmap found! If you use the "-oG" flag, it saves a "Grepable" file, which crams all the answers onto one giant long line so you can easily search through it. 

 THE ULTIMATE SAVING TRICK
Instead of trying to decide which type of file you want, professional hackers just ask for all of them! You can use the amazing "-oA" flag. The "A" stands for All. If you type "nmap -A -p- -oA myscan target-ip", Nmap will run the big Aggressive scan, check all the doors, and then save THREE different files to your computer: myscan.nmap, myscan.xml, and myscan.gnmap. Now you have a human copy to read, a computer copy for your other hacking tools, and a searchable copy for later. You have perfectly saved all your hard work!`,
    questions: [
      { q: "Why is it important to save your Nmap scan results into a file?", a: "So they don't disappear when you close the screen" },
      { q: "Which flag saves a 'Normal' file that is easy for humans to read?", a: "-oN" },
      { q: "Which flag saves an 'XML' file that other hacking tools can easily read?", a: "-oX" },
      { q: "What does the amazing '-oA' flag do?", a: "saves all three types of files at once" },
      { q: "If you use '-oA myscan', what three files does Nmap create?", a: "myscan.nmap, myscan.xml, and myscan.gnmap" }
    ]
  },
  {
    title: "8. Mission: NexaCorp Reconnaissance",
    points: 40,
    icon: "../../../assets/nmap_mission.png",
    content: `<div class="htb-diagram-container"><img src="../../../assets/nmap_mission.png" alt="Mission: NexaCorp Reconnaissance"></div>
 YOUR FIRST OFFICIAL MISSION
You have learned how to use the flashlight, how to knock on the doors, and how to save your notes. Now it is time for a real mission! A pretend company called NexaCorp Industries has hired you as a professional Penetration Tester. They think they accidentally left some dangerous doors open on their main server, but they don't know which ones. They have given you legal permission to scan their systems and find out. Your job is to perform a full, professional reconnaissance sweep of their target machine and report back with everything you find. 

 THE FIVE OBJECTIVES
To do a professional job, you need to follow the five steps. Objective 1: Do a Ping scan (-sn) to prove the server is actually awake. Objective 2: Run a fast scan on all 65,535 doors (-p-) to make sure no secret hacker backdoors are hiding in the high numbers. Objective 3: Once you find the open doors, use the Version Detection flag (-sV) to politely ask the doors exactly what software is running behind them. Objective 4: Use the OS Detection flag (-O) to figure out if NexaCorp is using Windows or Linux computers. Objective 5: Finally, run the giant Aggressive scan (-A) and use the save flag (-oA) to create a permanent record of your findings for the NexaCorp boss. 

 BEING A PROFESSIONAL
Remember, hacking isn't just about breaking things; it is about writing good reports! When you finish your scans, you need to be able to tell the boss: "I found three computers awake. One of them has a Web Server running Apache version 2.4 on door 80, and the computer is using Linux." By saving your Nmap files, you can prove exactly what you found and help the company lock their doors before the real bad guys show up. Now open your terminal and get to work, explorer!`,
    questions: [
      { q: "What is your pretend job title for this mission?", a: "Penetration Tester" },
      { q: "Why did NexaCorp hire you to scan their computers?", a: "to see if they accidentally left dangerous doors open" },
      { q: "What flag do you use for Objective 3 to find out exactly what software is running?", a: "-sV" },
      { q: "What flag do you use for Objective 4 to figure out if it is Windows or Linux?", a: "-O" },
      { q: "Why do professional hackers need to save their Nmap files? (To write good...)", a: "reports" }
    ]
  },
  {
    title: "9. Capture the Flag — Nmap Challenge",
    points: 50,
    icon: "../../../assets/nmap_challenge.png",
    content: `<div class="htb-diagram-container"><img src="../../../assets/nmap_challenge.png" alt="Capture the Flag — Nmap Challenge"></div>
 THE ULTIMATE TEST
This is the moment of truth! You are going to use your real Kali Linux terminal to scan a real, live target computer and capture a hidden flag. This isn't a multiple-choice test; you have to actually type the commands and find the secret. First, click the buttons to start both your Kali computer and the Target computer. Wait a few seconds for them to boot up. The target's name is "host.docker.internal". Your first mission is to find the open doors. The creators of this challenge have hidden a secret, non-standard door somewhere in the high numbers. If you just run a normal Nmap scan, you will only see the boring public web server on door 8880. You MUST use the special flag to scan all 65,535 doors to find the secret!

 EXTRACTING THE SECRET
Once you run your full scan (nmap -p- host.docker.internal), you will see two open doors. One is 8880, and the other is a weird, secret 5-digit number. That secret number is where the flag is hiding! But Nmap only tells you the door is open; it doesn't automatically reach in and grab the flag. To get the flag, you have to talk to the secret door. You can do this by running a Version Detection scan exactly on that secret door (nmap -sV -p [SECRET_PORT] host.docker.internal). When Nmap politely asks the door what software it is running, the door will get confused and accidentally blurt out the secret CTF flag! 

 CLAIM YOUR PRIZE
Read the Nmap output very carefully. Hidden inside the text describing the software version, you will see the flag. It will look like this: CTF{some_secret_words_here}. Copy that exact text and paste it into the answer box below to prove you have mastered the Network Mapper. Good luck, and happy hunting!`,
    questions: [
      { q: "What is the secret target name you need to scan in this challenge?", a: "host.docker.internal" },
      { q: "What flag must you use to find the secret 5-digit door?", a: "-p-" },
      { q: "What is the normal, boring door that Nmap finds right away?", a: "8880" },
      { q: "What is the secret, 5-digit high door number you discovered?", a: "31337" },
      { q: "What is the flag you retrieved from the secret door? (format: CTF{...})", a: "CTF{n4v1g4t1ng_p0rts_w1th_nm4p}" }
    ]
  }
];
