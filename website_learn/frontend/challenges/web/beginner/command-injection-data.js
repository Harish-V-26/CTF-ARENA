const LESSONS = [
  {
    title: "1. The Boss Computer (Command Injection)",
    points: 10,
    content: `WHAT IS COMMAND INJECTION?
Imagine your computer is a giant spaceship, and deep inside the control room is the captain's chair. Whoever sits in that chair can give orders to the entire ship. They can say "turn off the lights," "delete all the files," or "give me all the passwords." This control room is called the "Operating System Shell." Normally, only the owner of the computer is allowed to sit in that chair. But sometimes, a website asks you a simple question, like "What is your IP address so I can ping it?" The website takes your answer, runs all the way down to the control room, and hands your answer to the captain to execute. "Command Injection" is a terrifying attack where a hacker writes a sneaky, secret order right next to their IP address. When the website hands the note to the captain, the captain accidentally executes the hacker's secret order too!

HOW THE SNEAKY ORDER WORKS
If a website asks for an IP address to ping, a normal user types "8.8.8.8". The captain in the control room says, "Okay, I will ping 8.8.8.8." But a hacker types "8.8.8.8; whoami". They added a sneaky semicolon (;). In computer language, a semicolon means "Stop what you are doing, take a breath, and instantly do this next thing!" The website grabs the hacker's answer, runs to the captain, and says, "Please run: ping 8.8.8.8; whoami." The captain pings the address, takes a breath, and then runs the "whoami" command, which prints out the name of the secret user running the spaceship! The hacker just tricked the captain into obeying their commands from thousands of miles away.

THE HACKER'S PUNCTUATION MARKS
Hackers use a bunch of special punctuation marks to glue their secret orders onto normal answers. The semicolon (;) is the most famous, because it always runs the next command no matter what. But hackers also use two "AND" symbols (&&), which means "Only run my secret order if the first order works perfectly." If they use two "PIPE" symbols (||), it means "Only run my secret order if the first order totally fails!" Sometimes, hackers use a single straight line (|) called a Pipe. This tells the captain, "Take the answer from the first order, and shove it straight into the mouth of my second order!" By using these tiny symbols, hackers can chain together massive, complicated attacks just by typing in a simple search box.`,
    questions: [
      { q: "What is the attack called where hackers sneak secret orders to the computer's captain?", a: "Command Injection" },
      { q: "What is the name of the 'control room' where the captain sits?", a: "Operating System Shell" },
      { q: "What tiny punctuation mark (;) means 'Stop what you are doing, take a breath, and do this next thing'?", a: ";" },
      { q: "What symbols (&&) mean 'Only run my secret order if the first one works'?", a: "&&" },
      { q: "What command did the hacker use to ask the captain for the name of the secret user?", a: "whoami" }
    ]
  },
  {
    title: "2. Hacking in the Dark (Blind Injection)",
    points: 10,
    content: `WHAT IS BLIND COMMAND INJECTION?
Imagine you slide a secret note under the door to the captain's control room, ordering them to read the ship's secret diary. The captain reads the diary, but there is no window in the door, and the captain doesn't slide the paper back out to you. You know the captain obeyed your order, but you can't see the answer! This is called "Blind Command Injection." A lot of modern websites are very careful. Even if you trick the captain into running a secret command, the website refuses to print the answer on your screen. You are completely in the dark. But just like with blind database tricks, hackers have invented incredibly clever ways to steal the answers without ever seeing them.

THE STOPWATCH TRICK
If a hacker is blind, they use a stopwatch. They slide a note under the door that says: "Captain, if you are reading this, go to sleep for exactly 5 seconds!" In computer language, they type "; sleep 5". The hacker clicks the button and starts their stopwatch. If the website spins and loads for exactly 5 extra seconds, the hacker shouts, "Aha! The captain obeyed my order!" This is called Time-Based Detection. It proves that the control room door is unlocked, even if the hacker can't see inside. Once the hacker knows the door is unlocked, they can start using even sneakier tricks to extract the treasure.

MAILING THE TREASURE HOME
If the hacker can't see the treasure through the door, they just tell the captain to mail the treasure to the hacker's house! This is called "Out-of-Band Exfiltration." The hacker slides a note that says: "Captain, read the secret diary, put it inside a digital envelope, and mail it to attacker.com." The captain obeys! The captain uses a tool like 'curl' or 'nslookup' to package up the secret files and send them flying across the internet straight to the hacker's secret server. The website screen might just say "Thank you for your input," but behind the scenes, the captain just mailed the keys to the castle directly to the bad guy.`,
    questions: [
      { q: "What is the attack called when the captain obeys your order, but you cannot see the answer on your screen?", a: "Blind Command Injection" },
      { q: "What word does a hacker type to make the Linux captain go to sleep for 5 seconds?", a: "sleep 5" },
      { q: "If the website takes 5 extra seconds to load, what does it prove to the hacker?", a: "That the captain obeyed the order (the door is unlocked)" },
      { q: "What is the trick called where the captain mails the treasure directly to the hacker's server?", a: "Out-of-Band Exfiltration" },
      { q: "What tool might the captain use to mail the digital envelope across the internet?", a: "curl (or nslookup)" }
    ]
  },
  {
    title: "3. Disguises and Sneaky Tricks",
    points: 10,
    content: `THE SECURITY GUARDS
Because Command Injection is so dangerous, programmers hire digital security guards to check every single note before it goes to the captain. If the guard sees a semicolon (;), a pipe (|), or an AND symbol (&), they rip the note up and throw it away! But hackers are masters of disguise. If the guard blocks the semicolon, the hacker might use a secret URL code, typing "%3b" instead. The guard looks at "%3b", gets confused, and lets it pass. When the note reaches the control room, the captain instantly recognizes "%3b" as a semicolon and executes the secret order! 

THE INVISIBLE SPACE BAR
Sometimes the guards are so strict that they ban the space bar! If the hacker can't type a space, they can't type "cat /etc/passwd" (the command to read the password file). The note is stuck together as "cat/etc/passwd", which makes no sense to the captain. To get around this, hackers use a magical variable called $IFS. In the bash language, $IFS stands for Internal Field Separator, which is just a super fancy computer word for "an invisible space." The hacker types "cat$IFS/etc/passwd". The guard sees no spaces and lets it through. The captain sees the magical $IFS, instantly turns it into a space, and reads the secret password file! 

THE WILDCARD TRICK
What if the guard bans the word "passwd" so the hacker can't ask for the password file? The hacker uses a "Wildcard." A wildcard is like a blank tile in Scrabble; it can be any letter you want! The most famous wildcard is the question mark (?). The hacker types "/etc/p?sswd". The guard looks at it and says, "Well, it doesn't say passwd, so it must be safe." They let it through. When the captain reads it, the captain says, "Hmm, I need to find a file that starts with P, has any letter in the middle, and ends in SSWD. Oh! You mean the passwd file!" The captain grabs the file and hands it over. The hacker got the passwords without ever typing the word!`,
    questions: [
      { q: "What secret URL code do hackers type to disguise a semicolon from the guards?", a: "%3b" },
      { q: "What magical bash variable acts like an invisible space bar to bypass space filters?", a: "$IFS" },
      { q: "What is the 'blank Scrabble tile' trick called where a symbol replaces a letter?", a: "a Wildcard" },
      { q: "What punctuation mark is used as a wildcard to represent any single letter?", a: "?" },
      { q: "If the hacker types '/etc/p?sswd', what file does the captain actually open?", a: "passwd (or /etc/passwd)" }
    ]
  },
  {
    title: "4. Taking Over the Spaceship",
    points: 10,
    content: `EXPLORING THE SHIP
Once a hacker successfully tricks the captain and gets an open line of communication into the control room, they start looking around. The very first thing they ask is, "Who am I?" (whoami). They want to know if they are a low-level crew member or the supreme commander (root). If they are a low-level member, they type "ls -la /", which tells the captain to print a map of every single folder and file on the entire spaceship. The hacker is looking for secret keys, hidden passwords left by lazy programmers, or misconfigured doors. They type "env" to look at the environment variables, which are like sticky notes the captain leaves on the wall; sometimes these sticky notes have the master passwords for the databases written right on them!

THE AUTOMATIC HACKING ROBOT
Finding all these secrets by hand takes a long time. So, professional hackers use an amazing automatic robot tool called "Commix." Commix was built specifically to find and exploit Command Injection. You just point Commix at a website, and the robot automatically tries thousands of different semicolons, pipes, invisible spaces, and sleep spells. If it finds a tiny crack in the armor, Commix rips the door open and gives the hacker a beautiful, black terminal screen. It looks exactly like the hacker is sitting in the captain's chair, even though they are thousands of miles away. 

THE WORST BUGS IN HISTORY
Command Injection has caused some of the most terrifying cyber-disasters in history. In 2014, a bug called "Shellshock" let hackers send secret orders to millions of internet servers just by changing their "User-Agent" (a note that tells the server what browser you are using). The servers were completely taken over. In 2021, an even worse bug called "Log4Shell" was discovered. Hackers could type a tiny line of code into a Minecraft chat box, and the Minecraft server would accidentally fetch a virus and run it in the control room! These bugs prove that if you let anyone talk to the captain, disaster is guaranteed.`,
    questions: [
      { q: "What command prints a map of every single folder and file on the spaceship?", a: "ls -la /" },
      { q: "What command reads the 'sticky notes' on the wall that might contain master passwords?", a: "env" },
      { q: "What is the name of the automatic robot tool built specifically to exploit Command Injection?", a: "Commix" },
      { q: "What terrifying 2014 bug let hackers take over servers just by changing their 'User-Agent' note?", a: "Shellshock" },
      { q: "What 2021 bug let hackers take over servers just by typing a code into a Minecraft chat box?", a: "Log4Shell" }
    ]
  },
  {
    title: "5. Putting the Captain in a Bubble (Defense)",
    points: 10,
    content: `THE GOLDEN RULE OF DEFENSE
If Command Injection is so terrifying, how do we stop it? The absolute best defense in the entire world is very simple: Never, ever let strangers talk to the captain! Programmers should never take a user's input and pass it directly to the Operating System Shell. If a website needs to ping an IP address, it shouldn't ask the captain to open a command line and type "ping." Instead, it should use a safe, built-in library function. A library function is like a tiny, specialized robot that only knows how to do one exact thing. If you hand the tiny robot an IP address, it pings it. If a hacker hands the tiny robot a tricky semicolon (; whoami), the tiny robot just stares at it blankly because it doesn't understand semicolons. The tiny robot cannot be tricked!

THE SAFE LIST (WHITELISTING)
Sometimes, programmers absolutely have to talk to the captain. If they must do it, they have to use a "Whitelist." A whitelist is an incredibly strict bouncer. If the website asks for an IP address, the bouncer only allows numbers and periods to pass through the door. If the bouncer sees a letter, a semicolon, a space, or a wildcard, they instantly throw the note in the trash. Blacklists (trying to guess all the bad words) never work because hackers will always find a new disguise or a new alien code. Whitelists only allow the exact things you expect, which shuts down the hackers completely.

ESCAPING THE TRAPS
If the programmer is stuck using old code, they have one last line of defense called "Escaping." This means taking the hacker's tricky note and wrapping it in layers of thick, protective digital bubble wrap before handing it to the captain. In Python, programmers use a tool called "shlex.quote()", and in PHP they use "escapeshellarg()". When the captain receives the bubble-wrapped note, the captain sees the semicolon, but the bubble wrap physically prevents the captain from executing it. The captain just reads the semicolon out loud instead of obeying it. It is always better to not talk to the captain at all, but if you must, make sure every word is safely wrapped in plastic!`,
    questions: [
      { q: "What is the absolute best way to prevent Command Injection?", a: "Never let user input talk to the Operating System Shell (use library functions instead)" },
      { q: "What is the name of the incredibly strict bouncer that only allows safe characters (like numbers) through?", a: "a Whitelist" },
      { q: "Do Blacklists (trying to block all bad words) work against hackers? (yes/no)", a: "no" },
      { q: "What is the last-resort defense where you wrap the user's input in protective digital bubble wrap?", a: "Escaping" },
      { q: "What PHP tool is used to bubble-wrap the hacker's note before handing it to the captain?", a: "escapeshellarg()" }
    ]
  }
];
