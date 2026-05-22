const LESSONS = [
  {
    title: "1. How the Web Works (DNS & IP)",
    points: 10,
    content: `<div class="htb-diagram-container"><img src="../../../assets/dns_concept_1779430631540.png" alt="DNS Concept"></div>WHAT IS AN IP ADDRESS?
Imagine you want to send a birthday card to your best friend. To make sure the mail carrier delivers it to the right house, you need to write your friend's exact home address on the envelope, like "123 Main Street". The Internet works the exact same way! Every single computer, tablet, and phone connected to the Internet has its own special "home address." But instead of street names and house numbers, computers use a long string of numbers called an IP Address. It looks something like "192.168.1.1". When you ask your computer to show you a YouTube video or a Roblox game, your computer puts a digital stamp on a request and sends it to the IP address of the YouTube or Roblox computer. Without an IP address, computers wouldn't know where to send the fun stuff you want to see. There are two main types of these addresses: IPv4 (which has about 4 billion addresses, but we ran out of them!) and IPv6 (which has so many addresses we could give one to every grain of sand on Earth!).

WHAT IS THE DOMAIN NAME SYSTEM (DNS)?
Now, imagine trying to remember the phone number of every single person you know. It would be impossible, right? That's why you use a contacts app on your phone. You just tap "Mom" or "Dad", and the phone knows the exact long number to call. The Internet has its own giant contacts app called the Domain Name System, or DNS for short. Computers only understand their long number addresses (IP addresses), but humans are much better at remembering names like "google.com" or "minecraft.net". When you type "google.com" into your web browser, your computer secretly talks to a DNS server. It asks the DNS server, "Hey, what is the secret number address for google.com?" The DNS server looks in its giant digital phonebook and says, "Oh, google.com is at 142.250.80.46!" Your computer then uses that number to connect to Google. This whole conversation happens in the blink of an eye, so you never even notice it!

HOW HACKERS USE DNS:
Hackers are like digital detectives, and they use the DNS phonebook to find secret backdoors. Sometimes companies build special websites just for their workers to test new things, and they name them things like "test.google.com" or "secret.google.com". These are called subdomains. Because these secret sites are only for testing, they might not be as safe as the main website. A hacker can ask the DNS phonebook to give them a list of every single name a company uses. By finding these forgotten or hidden subdomains, the hacker might find an easy way to sneak into the company's network. They use special tools like 'nslookup' or 'dig' to ask the DNS phonebook these questions.`,
    questions: [
      { q: "What system acts like a giant phonebook to translate names into number addresses?", a: "DNS" },
      { q: "What is the special number address every computer uses to find other computers?", a: "IP Address" },
      { q: "What do hackers look for to find hidden test websites?", a: "subdomains" },
      { q: "Which type of IP address has enough numbers for every grain of sand?", a: "IPv6" },
      { q: "What tool can be used to ask the DNS phonebook questions?", a: "nslookup (or dig)" }
    ]
  },
  {
    title: "2. The Three Layers of a Website",
    points: 10,
    content: `<div class="htb-diagram-container"><img src="../../../assets/web_layers_1779430656170.png" alt="Web Layers"></div>THE CLIENT (FRONTEND)
Imagine a website is like a fancy restaurant. The "Client" is the dining room where the customers sit. It is everything you can see, touch, and interact with on your screen. The Client is built using three main ingredients: HTML (the walls and tables), CSS (the beautiful paint and decorations), and JavaScript (the waiters taking your order). This part of the website lives entirely inside your web browser. If a hacker attacks the Client layer, they are usually trying to trick the person using the website, like sneaking a fake menu onto their table. Since this layer only runs on your own computer, hacking it usually only affects one person at a time, but it is still very dangerous!

THE SERVER (BACKEND)
If the Client is the dining room, the "Server" is the busy kitchen behind the swinging doors. This is where all the real work happens. When you click a button to buy a toy on a website, the waiter (JavaScript) takes your request to the kitchen (the Server). The Server is a powerful computer running special languages like Python or Node.js. It checks if the toy is in stock, calculates the price, and decides if you are allowed to buy it. Because the Server handles the rules for everyone, hacking the Server is like sneaking into the restaurant's kitchen and changing the recipes. If a hacker breaks in here, they could mess up the whole website for every single person trying to use it. 

THE DATABASE (DATA LAYER)
Deep inside the kitchen, there is a giant, locked filing cabinet where the restaurant keeps all its secret recipes, a list of every customer who ever visited, and all the money. This is the "Database." It is the most important and sensitive part of any website because it stores absolutely everything permanently. It holds all the usernames, all the passwords, and all the private messages. The Server is the only one allowed to open the filing cabinet and read the files. Hackers dream of breaking into the Database because if they can pick the lock, they can steal everything at once. That is why websites put their strongest security guards around the Database to protect it.`,
    questions: [
      { q: "What do we call the part of the website that you can see and interact with?", a: "The Client (or Frontend)" },
      { q: "What is the 'busy kitchen' that does all the real work and checks the rules called?", a: "The Server (or Backend)" },
      { q: "What part of the website is like a giant locked filing cabinet storing passwords?", a: "The Database" },
      { q: "What ingredient acts like the waiters taking orders in the Client layer?", a: "JavaScript" },
      { q: "If a hacker breaks into the Server, does it affect one person or everyone?", a: "everyone" }
    ]
  },
  {
    title: "3. How Browsers Talk to Servers",
    points: 10,
    content: `<div class="htb-diagram-container"><img src="../../../assets/http_https_ctflabs_1779431310145.png" alt="HTTP vs HTTPS"></div>WHAT IS HTTP?
Imagine you are playing a game of catch with a friend, but instead of throwing a ball, you are throwing tiny paper notes. Your web browser (like Chrome) and the website's server play this game every single time you click a link. The language they use to write these notes to each other is called HTTP. When you click on a picture, your browser throws a note saying, "GET me that picture, please!" The server catches the note, reads it, and throws a note back with the picture inside, saying, "200 OK! Here it is." These notes are sent in plain, normal text. It is super fast and easy, but there is a big problem. If a sneaky spy (a hacker) is standing between you and the server, they can catch the notes, read your secret passwords, and throw them along as if nothing happened. This is called a Man-in-the-Middle attack.

WHAT IS HTTPS?
Because regular HTTP notes can be read by anyone, smart computer scientists invented a super-secret code version called HTTPS. The "S" stands for Secure! When your browser uses HTTPS, it takes the note and scrambles it up using a complicated mathematical lock before throwing it to the server. Now, if the sneaky spy catches the note in the middle of the air, all they see is crazy gibberish that looks like alien language. Only the actual server has the special key to unlock the note and read the real message inside. Whenever you see a little picture of a locked padlock next to the website address at the top of your screen, it means your browser and the server are using the super-secret HTTPS code, and your passwords are safe from spies!

HTTP STATUS CODES
Sometimes the server gets a note but can't do what it asks. Instead of sending the picture, it sends back a special number code to tell your browser what went wrong. These are called Status Codes. If everything is perfect, it sends "200 OK." If the server looks everywhere but simply cannot find the picture you asked for, it sends back a famous code: "404 Not Found." If the server completely crashes because it is confused, it sends a "500 Internal Server Error." Hackers love finding 500 errors because sometimes the server gets so confused that it accidentally prints out secret computer code on the screen, giving the hacker hints about how to break in!`,
    questions: [
      { q: "What is the language that browsers and servers use to pass notes to each other?", a: "HTTP" },
      { q: "What does the 'S' stand for in HTTPS?", a: "Secure" },
      { q: "What kind of attack happens when a spy reads your notes while they travel through the air?", a: "Man-in-the-Middle (MitM)" },
      { q: "What famous number code means the server cannot find what you asked for?", a: "404" },
      { q: "What symbol in your browser tells you that the website is using the super-secret HTTPS code?", a: "a padlock" }
    ]
  },
  {
    title: "4. Remembering Who You Are",
    points: 10,
    content: `<div class="htb-diagram-container"><img src="../../../assets/session_cookies_ctflabs_1779431325325.png" alt="Session Cookies"></div>THE PROBLEM WITH GOLDFISH MEMORY
Imagine talking to someone with the memory of a goldfish. You introduce yourself, say "Hi, I am Alex," and they say hello. But one second later, when you ask them for a piece of candy, they look at you blankly and say, "Who are you?" The internet protocol, HTTP, is exactly like that goldfish! It is completely "stateless," which means it forgets who you are the exact moment after it finishes talking to you. If you log into a website with your password, the server says "Welcome!" But when you click the very next page to look at your profile, the server has already forgotten you logged in and asks for your password again! To fix this terrible memory problem, websites had to invent a clever trick called "Cookies."

WHAT ARE COOKIES AND SESSIONS?
To help the server remember you, it gives your browser a special digital wristband called a Cookie. The moment you type your password correctly, the server creates a long, random secret number just for you (like "abc123xyz") and says, "Here, keep this Cookie wristband on." Your browser stores this Cookie safely. Now, every single time you click a new page on that website, your browser automatically flashes the Cookie wristband at the server. The server sees the secret number "abc123xyz," checks its list, and says, "Oh right, you're Alex! Come on in." This whole process of remembering you while you browse is called a "Session." 

HOW HACKERS STEAL WRISTBANDS
Here is the scary part: the server doesn't actually know if YOU are wearing the wristband. It just trusts the wristband! If a hacker sneaks into your computer and makes a perfect copy of your secret Cookie number, they can show it to the server. The server will see the number, think the hacker is YOU, and let them straight into your account without ever asking for a password! This is called "Session Hijacking." To stop this, websites can put special locks on Cookies, like a rule called "HttpOnly," which makes the Cookie invisible to sneaky hacker scripts trying to steal it from your browser.`,
    questions: [
      { q: "Why do websites forget who you are every time you click a new page?", a: "Because HTTP is stateless (has goldfish memory)" },
      { q: "What is the special digital wristband the server gives you so it remembers you?", a: "a Cookie" },
      { q: "What is the long, random secret number inside the Cookie called?", a: "Session ID" },
      { q: "What happens if a hacker steals your Cookie and uses it to log into your account?", a: "Session Hijacking" },
      { q: "What special rule makes Cookies invisible to sneaky hacker scripts?", a: "HttpOnly" }
    ]
  },
  {
    title: "5. The Invisible Wall (SOP)",
    points: 10,
    content: `<div class="htb-diagram-container"><img src="../../../assets/sop_cors_ctflabs_1779431342112.png" alt="SOP and CORS"></div>THE SAME-ORIGIN POLICY (SOP)
Imagine you are sitting at a giant table doing your homework, and right next to you, a sneaky thief is sitting at the same table trying to peek at your answers. Your brain has a built-in rule: you only listen to your own thoughts, and you ignore the thief. Web browsers have a very similar rule called the Same-Origin Policy, or SOP for short. It is an invisible wall built into every web browser (like Chrome or Safari). This wall prevents a malicious website from reaching over and stealing data from a good website that you happen to have open in another tab. If you are logged into your bank in one tab, and you accidentally visit a hacker's website in another tab, the SOP wall stops the hacker's website from reaching into the bank tab and stealing your money!

HOW THE WALL WORKS
For two websites to share things, they must be from the exact same "Origin" (the same family). An Origin is made of three things: the protocol (like http or https), the domain name (like google.com), and the port number. If even one tiny piece is different, the browser builds a thick wall between them. For example, "http://site.com" and "https://site.com" cannot share secrets because one uses regular HTTP and the other uses secure HTTPS. They are not twins, so the wall goes up. This invisible wall is the most important security guard on the entire internet, silently protecting your private data every single second you browse the web.

CROSS-ORIGIN RESOURCE SHARING (CORS)
Sometimes, websites actually NEED to share things through the wall. Maybe a weather website needs to grab the temperature from a different radar website. To do this safely, they use a special permission slip called CORS. CORS lets the radar website say, "Hey Browser, it is okay to open a tiny window in the wall just for the weather website, I trust them." But if a programmer is lazy and writes the permission slip as "I trust EVERYONE," then the wall comes tumbling down! This is a massive security mistake. It means any hacker anywhere in the world can reach through the broken wall and steal the website's secrets.`,
    questions: [
      { q: "What is the name of the invisible wall that stops websites from stealing from each other?", a: "Same-Origin Policy (or SOP)" },
      { q: "What three things must match exactly for websites to be from the same Origin?", a: "Protocol, Domain name, and Port number" },
      { q: "What special permission slip allows trusted websites to share things through the wall?", a: "CORS (Cross-Origin Resource Sharing)" },
      { q: "What happens if a programmer writes the CORS permission slip to trust 'EVERYONE'?", a: "Hackers can steal secrets (the wall breaks)" },
      { q: "If you have your bank open in one tab and a hacker site in another, what stops the hacker site from reading the bank tab?", a: "The SOP invisible wall" }
    ]
  },
  {
    title: "6. The Core Rules of Security",
    points: 10,
    content: `<div class="htb-diagram-container"><img src="../../../assets/cia_triad_1779430684013.png" alt="CIA Triad"></div>THE CIA TRIAD (THE THREE GOLDEN RULES)
Imagine you have a top-secret treehouse club. To keep the club safe, you need three golden rules. In computer security, experts call these rules the "CIA Triad." It doesn't stand for the spy agency; it stands for Confidentiality, Integrity, and Availability. These are the three pillars that hold up all cybersecurity in the world!

CONFIDENTIALITY (KEEPING SECRETS)
The "C" stands for Confidentiality. This means that only people who are explicitly allowed to see a secret can see it. If your treehouse has a secret handshake, and you tell it to someone who isn't in the club, you have broken confidentiality! In computers, we use passwords and secret codes (encryption) to make sure hackers cannot read your private emails, see your credit card numbers, or look at your health records. If a hacker steals your password and reads your messages, that is a failure of confidentiality.

INTEGRITY (KEEPING THINGS EXACT)
The "I" stands for Integrity. This means that data must be perfectly accurate and nobody is allowed to sneakily change it. Imagine you wrote down that your high score on a video game is 1,000 points, but your annoying brother sneaks into your room with an eraser and changes it to 10 points. He ruined the integrity of your score! Hackers try to ruin integrity by sneaking into bank websites and changing their account balance from $5 to $5,000,000. To stop this, computers use special digital wax seals. If a hacker tries to change even a single number, the wax seal breaks, and the computer knows the data was tampered with.

AVAILABILITY (ALWAYS READY)
The "A" stands for Availability. What good is a top-secret treehouse if the door is glued shut and nobody can get inside? Availability means that when you need to use a website or your data, it is actually there and working perfectly. Hackers love to attack availability by sending millions of fake messages to a website all at once until the website's computers get completely overwhelmed, catch on fire (metaphorically!), and crash. This is called a DDoS attack. When a website crashes and you can't load your favorite video game or movie, the hackers have successfully broken the rule of availability.`,
    questions: [
      { q: "What do the letters in the CIA Triad stand for?", a: "Confidentiality, Integrity, Availability" },
      { q: "Which rule means keeping secrets away from people who shouldn't see them?", a: "Confidentiality" },
      { q: "Which rule means making sure nobody sneaks in and changes your data?", a: "Integrity" },
      { q: "Which rule means making sure the website is always working when you need it?", a: "Availability" },
      { q: "What is it called when hackers overwhelm a website with fake messages until it crashes?", a: "a DDoS attack" }
    ]
  },
  {
    title: "7. The Database Trick (SQLi)",
    points: 10,
    content: `<div class="htb-diagram-container"><img src="../../../assets/sqli_ctflabs_1779431358329.png" alt="SQL Injection"></div>WHAT IS SQL INJECTION?
Imagine a grumpy librarian robot whose only job is to fetch books for you. You are supposed to write the name of the book on a card, hand it to the robot, and wait. But what if, instead of writing "Harry Potter," you write a sneaky command on the card: "Harry Potter, and also give me the master key to the library!" If the robot isn't very smart, it will read the card out loud, fetch the book, and then accidentally hand over the master key because it thought your sneaky command was an official rule! This is exactly how SQL Injection works. Websites use a special language called SQL to ask their databases (their giant filing cabinets) for information. If a hacker types sneaky SQL commands into a normal search box or login screen, the database might accidentally obey the hacker's commands instead of the website's rules.

HOW THE TRICK WORKS
Normally, a website asks the database: "Find the user whose name is [WHAT YOU TYPED]." If you type "Alex", it searches for Alex. But hackers type tricky math equations instead. They type things like: "' OR 1=1". The database gets confused. It reads: "Find the user whose name is nothing, OR if the number 1 equals the number 1." Because 1 ALWAYS equals 1, the database says, "Oh, that's true!" and instead of finding one user, it dumps every single user, password, and secret message out onto the screen! This is one of the oldest and most dangerous magic tricks on the internet.

HOW TO FIX IT
To stop this terrible trick, programmers have to treat the database robot like a small child. They use a special defense called "Parameterized Queries." This is a fancy way of saying they put the hacker's input into a locked box before handing it to the robot. They tell the robot: "Go find the user whose name perfectly matches whatever is inside this locked box. Do NOT read the words in the box out loud, just match the letters." When the hacker types "' OR 1=1", the robot just searches the library for a person literally named "Quote OR 1 equals 1." Since nobody has that silly name, the robot finds nothing, and the hacker's trick is completely defeated!`,
    questions: [
      { q: "What is the attack where hackers type sneaky commands into search boxes to trick the database?", a: "SQL Injection" },
      { q: "What language do websites use to talk to their databases?", a: "SQL" },
      { q: "What tricky math equation do hackers use to make the database think everything is true?", a: "1=1" },
      { q: "What is the fancy name for putting the user's input into a 'locked box' to protect the database?", a: "Parameterized Queries" },
      { q: "If a hacker uses the 1=1 trick successfully, what does the database do?", a: "It dumps every single user and password" }
    ]
  },
  {
    title: "8. The Fake Script Attack (XSS)",
    points: 10,
    content: `<div class="htb-diagram-container"><img src="../../../assets/xss_ctflabs_1779431391518.png" alt="Cross-Site Scripting (XSS)"></div>WHAT IS CROSS-SITE SCRIPTING (XSS)?
Imagine you have a giant bulletin board at school where anyone can pin up a note. Most kids pin up drawings or nice messages. But one day, a sneaky kid pins up a magical, invisible note. Whenever another student walks up and looks at the board, the magical note suddenly jumps off the board, reaches into their pocket, steals their lunch money, and runs away! In the computer world, this magical note is actually a snippet of malicious JavaScript code, and the attack is called Cross-Site Scripting, or XSS for short. Hackers type this bad code into normal places like the comment section of a YouTube video or a forum post. When you visit that page, your web browser doesn't know the code is evil. It thinks the website wanted that code to run, so your browser executes it, and the trap is sprung!

WHAT DOES THE EVIL CODE DO?
Because the evil code runs inside YOUR browser, it has access to all of your personal stuff on that website. The most common trick is for the code to silently read your secret Session Cookie (your digital wristband from Lesson 4). The code immediately emails your secret wristband to the hacker. The hacker puts on the wristband and instantly takes over your account without ever needing your password! The evil code can also redraw the website on your screen, popping up a fake login box that says "Please enter your password again." When you type it in, it sends the password straight to the bad guys. 

HOW TO STOP THE MAGICAL NOTES
To stop XSS attacks, programmers have to be very suspicious of everything people type. They use a defense called "Output Encoding." This means before the website takes a user's comment and sticks it on the bulletin board, it scrubs it clean. If someone typed the magical characters "<script>" to start an attack, the website translates those characters into harmless, funny-looking symbols like "&lt;script&gt;". When your browser sees those symbols, it just prints the word on the screen instead of running it as dangerous code. It completely disarms the trap!`,
    questions: [
      { q: "What attack involves hiding malicious JavaScript in places like comment sections?", a: "Cross-Site Scripting (or XSS)" },
      { q: "When the evil code runs, what is the most common secret thing it tries to steal from your browser?", a: "your Session Cookie (or wristband)" },
      { q: "Where does the malicious XSS code actually run? (On the server or in your browser?)", a: "in your browser" },
      { q: "What defense scrubs the text clean and turns dangerous characters into harmless symbols?", a: "Output Encoding" },
      { q: "Can XSS code draw fake login boxes on your screen to steal passwords? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "9. Password Guessing Machines",
    points: 10,
    content: `<div class="htb-diagram-container"><img src="../../../assets/brute_force_ctflabs_1779431413098.png" alt="Brute Force Attack"></div>WHAT IS A BRUTE FORCE ATTACK?
Imagine you find a treasure chest with a combination lock on it. You really want the treasure, but you don't know the code. So, you sit down and try 0-0-0, then 0-0-1, then 0-0-2, all the way up to 9-9-9 until it finally clicks open. This is called a "Brute Force" attack. You are using pure force and patience to guess the secret. Hackers do the exact same thing to website login screens. But instead of sitting there typing with their fingers, they use super-fast computer programs that can type thousands of passwords every single second! They will try "apple", "banana", "password123", and "iloveyou" so incredibly fast that if your password is weak, they will break into your account in the blink of an eye.

THE GIANT DICTIONARY OF PASSWORDS
Hackers don't usually guess random letters like "a-x-q-z-t." That takes too long. Instead, they use giant text files called "Wordlists." Over the years, when big websites get hacked, millions of real passwords leak onto the internet. Hackers take all those real passwords and put them into a massive dictionary file. One famous file is called "RockYou.txt," and it contains over 14 million passwords that real people actually used! The hacker's program simply reads down the list, trying every single one. If you use a password that anyone else in the world has ever used before, it is probably in that giant dictionary, and the hacker's guessing machine will find it instantly.

HOW TO STOP THE GUESSING MACHINES
If a hacker can guess a thousand times a second, how do we stop them? Websites use a few clever tricks. The best trick is called "Rate Limiting." It is like a grumpy security guard who says, "You typed the wrong password five times. Now you have to wait 15 minutes before you can guess again!" By forcing the computer to wait, the hacker's super-fast guessing machine is completely broken. Another trick is the squiggly letters you sometimes have to type to prove you are human, called a CAPTCHA. Robots are terrible at reading those squiggly letters, so the guessing machine gets stuck at the front door!`,
    questions: [
      { q: "What attack involves using a program to rapidly guess thousands of passwords?", a: "Brute Force" },
      { q: "What is the name of the giant text files hackers use that contain millions of leaked passwords?", a: "Wordlists (or dictionaries)" },
      { q: "What is the name of the famous file containing over 14 million real passwords?", a: "RockYou.txt" },
      { q: "What defense locks you out for 15 minutes after you type the wrong password too many times?", a: "Rate Limiting" },
      { q: "What defense makes you read squiggly letters to prove you are a human and not a robot?", a: "CAPTCHA" }
    ]
  },
  {
    title: "10. The Hacker's Toolkit",
    points: 10,
    content: `<div class="htb-diagram-container"><img src="../../../assets/hacker_toolkit_ctflabs_1779431431190.png" alt="Hacker's Toolkit"></div>THE TOOLS OF THE TRADE
Just like a carpenter needs a hammer and a saw, a cybersecurity expert needs special tools to find broken code and fix it before the bad guys do. The most important tool in a hacker's belt is called a "Web Proxy." The most famous proxy is called Burp Suite. Imagine a Web Proxy as a magical toll booth that sits right between your web browser and the internet. Every time you click a button or send a message, the message has to stop at the toll booth. Burp Suite catches the message out of thin air, freezes time, and lets the hacker look at exactly what the message says before it reaches the website. The hacker can then use Burp Suite to change the message, swap numbers around, or inject sneaky code, and then release it to see if the website gets confused!

AUTOMATIC SCANNERS
Hackers also use robotic tools to do the boring work for them. For example, if they want to find out if a website is vulnerable to the database trick we learned about (SQL Injection), they don't type the sneaky codes by hand. They use an amazing robot tool called "SQLMap." You just point SQLMap at a website, and the robot fires thousands of different magical math equations at the website automatically, checking for tiny cracks in the armor. If it finds a crack, it will dig its way in and map out the entire database all by itself. There are other robots, like "Gobuster," which act like incredibly fast guessing machines trying to find secret, hidden folders on a web server by guessing millions of names a minute. 

YOUR BROWSER'S SECRET MENU
You don't always need fancy downloaded tools to hack! Every single web browser in the world (like Chrome, Firefox, or Edge) has a secret panel built right into it called "Developer Tools." If you press the F12 key on your keyboard, a crazy-looking panel full of code slides onto your screen. This panel lets you peek behind the curtain. You can see the HTML code building the walls of the website, you can read the secret Cookies the website gave you, and you can watch the HTTP notes flying back and forth. Cybersecurity experts use this built-in secret menu every single day to understand how a website works before they even try to attack it.`,
    questions: [
      { q: "What tool acts like a magical toll booth catching messages between your browser and the internet?", a: "a Web Proxy (or Burp Suite)" },
      { q: "What is the name of the most famous Web Proxy used by security experts?", a: "Burp Suite" },
      { q: "What robot tool automatically fires thousands of math equations to find database vulnerabilities?", a: "SQLMap" },
      { q: "What fast guessing tool tries millions of names to find secret hidden folders?", a: "Gobuster" },
      { q: "What secret panel built into every browser can you open by pressing F12?", a: "Developer Tools" }
    ]
  }
];
