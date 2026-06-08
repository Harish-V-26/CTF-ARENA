const LESSONS = [
  {
    title: "1. Robots.txt & Sitemap.xml",
    points: 40,
    content: `FINDING HIDDEN MAPS ON THE INTERNET

WHAT IS ROBOTS.TXT?
Imagine a giant library where a busy robot librarian is constantly running around taking notes on every single book so people can find them later. This robot is like the search engines (like Google). Now, imagine the library has a secret back room where the staff keeps their private notes. They put a sign on the door that says "Robot Librarian: Do Not Enter!" This sign is exactly what the robots.txt file is! It is a simple text file that websites use to tell search engines which pages they are NOT allowed to look at or share with the world. But here is the funny part: hackers can read this sign too! By looking at the robots.txt file, hackers can see exactly where the website owners are hiding their secret pages. It's like putting a giant neon sign pointing to your secret hiding spot. You can see it yourself by typing "/robots.txt" at the end of almost any website address.

WHAT IS SITEMAP.XML?
If robots.txt is the list of places NOT to go, then sitemap.xml is the ultimate treasure map of places TO go. When a website is very big, the owners want to make sure the robot librarian doesn't miss any important pages. So, they create a special file called sitemap.xml that lists every single public page on their entire website. It's literally a map of the website! For a hacker, this is like finding a blueprint of a castle. Instead of wandering around guessing where the doors and windows are, the hacker just reads the sitemap and instantly knows every single page that exists on the website. They can look at this map to find old, forgotten pages that might not be protected very well.

TASK: On our target server, browse to /robots.txt and /sitemap.xml. Answer the questions below using what you find.`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/recon_lesson1.png" alt="1. Robots.txt & Sitemap.xml"></div>

FINDING HIDDEN MAPS ON THE INTERNET

WHAT IS ROBOTS.TXT?
Imagine a giant library where a busy robot librarian is constantly running around taking notes on every single book so people can find them later. This robot is like the search engines (like Google). Now, imagine the library has a secret back room where the staff keeps their private notes. They put a sign on the door that says "Robot Librarian: Do Not Enter!" This sign is exactly what the robots.txt file is! It is a simple text file that websites use to tell search engines which pages they are NOT allowed to look at or share with the world. But here is the funny part: hackers can read this sign too! By looking at the robots.txt file, hackers can see exactly where the website owners are hiding their secret pages. It's like putting a giant neon sign pointing to your secret hiding spot. You can see it yourself by typing "/robots.txt" at the end of almost any website address.

WHAT IS SITEMAP.XML?
If robots.txt is the list of places NOT to go, then sitemap.xml is the ultimate treasure map of places TO go. When a website is very big, the owners want to make sure the robot librarian doesn't miss any important pages. So, they create a special file called sitemap.xml that lists every single public page on their entire website. It's literally a map of the website! For a hacker, this is like finding a blueprint of a castle. Instead of wandering around guessing where the doors and windows are, the hacker just reads the sitemap and instantly knows every single page that exists on the website. They can look at this map to find old, forgotten pages that might not be protected very well.

TASK: On our target server, browse to /robots.txt and /sitemap.xml. Answer the questions below using what you find.`,
    questions: [
      { q: "What file acts like a 'Do Not Enter' sign for search engine robots?", a: "robots.txt" },
      { q: "What file acts like a treasure map listing every page on the website?", a: "sitemap.xml" },
      { q: "In robots.txt, what word is used to tell robots they cannot enter a path?", a: "Disallow" },
      { q: "In our target's robots.txt, what hidden path is listed? (e.g. /admin)", a: "/staging" },
      { q: "Why do hackers like looking at robots.txt? (Type: reveals hidden paths)", a: "reveals hidden paths" }
    ]
  },
  {
    title: "2. Finding What Things Are Made Of",
    points: 50,
    content: `DISCOVERING HOW A WEBSITE WAS BUILT

WHAT IS FINGERPRINTING?
Imagine you are a master chef tasting a delicious cake for the first time. Even without seeing the recipe, you can taste the vanilla, the type of flour, and the chocolate chips. You are figuring out what the cake is made of just by observing it. In cybersecurity, this is called "fingerprinting." When hackers look at a website, they don't just see pictures and text. They want to know exactly what kind of computer code was used to build it. They want to know if it was built with a program called WordPress, or if it uses a language called PHP, or what kind of web server is hosting it. Knowing what ingredients were used to build the website is super important because if a hacker knows the website uses an old, broken ingredient, they know exactly how to break into it!

HOW TO USE WHATWEB:
Hackers use special tools that act like super-tasters to figure out the ingredients of a website. One of the most famous tools is called WhatWeb. It is a tool that runs in the command line (the black screen where you type commands). When you point WhatWeb at a website, it quickly scans the site and prints out a list of all the technologies it can recognize. It's like a magical scanner that tells you everything about how the website was constructed. You just type "whatweb" followed by the website address, and it does all the hard work for you. If you want it to look really, really closely and tell you every tiny detail, you can use the "-v" flag, which stands for "verbose" (meaning it uses a lot of words to explain things).

TASK: Spin up the Kali container above and run WhatWeb against the target server. Answer the questions below.`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/recon_lesson2.png" alt="2. Finding What Things Are Made Of"></div>

DISCOVERING HOW A WEBSITE WAS BUILT

WHAT IS FINGERPRINTING?
Imagine you are a master chef tasting a delicious cake for the first time. Even without seeing the recipe, you can taste the vanilla, the type of flour, and the chocolate chips. You are figuring out what the cake is made of just by observing it. In cybersecurity, this is called "fingerprinting." When hackers look at a website, they don't just see pictures and text. They want to know exactly what kind of computer code was used to build it. They want to know if it was built with a program called WordPress, or if it uses a language called PHP, or what kind of web server is hosting it. Knowing what ingredients were used to build the website is super important because if a hacker knows the website uses an old, broken ingredient, they know exactly how to break into it!

HOW TO USE WHATWEB:
Hackers use special tools that act like super-tasters to figure out the ingredients of a website. One of the most famous tools is called WhatWeb. It is a tool that runs in the command line (the black screen where you type commands). When you point WhatWeb at a website, it quickly scans the site and prints out a list of all the technologies it can recognize. It's like a magical scanner that tells you everything about how the website was constructed. You just type "whatweb" followed by the website address, and it does all the hard work for you. If you want it to look really, really closely and tell you every tiny detail, you can use the "-v" flag, which stands for "verbose" (meaning it uses a lot of words to explain things).

TASK: Spin up the Kali container above and run WhatWeb against the target server. Answer the questions below.`,
    questions: [
      { q: "What is the process of figuring out what technologies a website uses called?", a: "fingerprinting" },
      { q: "What command-line tool did we use to scan the website's ingredients?", a: "whatweb" },
      { q: "What flag makes WhatWeb talk a lot and give more detailed information?", a: "-v" },
      { q: "Run whatweb on the target. What web server does it say it is using? (type: nginx)", a: "nginx" },
      { q: "What HTTP header often gives away the server's secret software name?", a: "Server" }
    ]
  },
  {
    title: "3. Wappalyzer — The Browser Detective",
    points: 0,
    content: `THE EASIEST WAY TO FINGERPRINT A WEBSITE

WHAT IS WAPPALYZER?
In the last lesson, we learned about WhatWeb, which is a tool you have to type into a command line. But what if you could figure out what a website is made of just by visiting it in your normal web browser? That is exactly what Wappalyzer does! Wappalyzer is a special add-on (like a mini-app) that you can install directly into browsers like Google Chrome or Mozilla Firefox. Once you install it, it sits quietly in the corner of your browser. Every time you visit a new website, Wappalyzer automatically looks at the code behind the scenes and figures out all the technologies the website is using. 

HOW IT HELPS:
Instead of having to open a complicated terminal and type commands, you just click the little Wappalyzer icon at the top of your screen. A neat little menu pops down showing you everything: what kind of database they use, what programming language they wrote it in, and even what kind of analytics tools they use to track visitors. It is like having X-ray glasses for websites! While hackers often use command-line tools because they can automate them, many security professionals and web developers use Wappalyzer every single day because it is so fast and easy to use while just browsing the web normally.

Note: We don't have questions for this lesson, but it's a great tool to remember!`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/recon_lesson3.png" alt="3. Wappalyzer — The Browser Detective"></div>

THE EASIEST WAY TO FINGERPRINT A WEBSITE

WHAT IS WAPPALYZER?
In the last lesson, we learned about WhatWeb, which is a tool you have to type into a command line. But what if you could figure out what a website is made of just by visiting it in your normal web browser? That is exactly what Wappalyzer does! Wappalyzer is a special add-on (like a mini-app) that you can install directly into browsers like Google Chrome or Mozilla Firefox. Once you install it, it sits quietly in the corner of your browser. Every time you visit a new website, Wappalyzer automatically looks at the code behind the scenes and figures out all the technologies the website is using. 

HOW IT HELPS:
Instead of having to open a complicated terminal and type commands, you just click the little Wappalyzer icon at the top of your screen. A neat little menu pops down showing you everything: what kind of database they use, what programming language they wrote it in, and even what kind of analytics tools they use to track visitors. It is like having X-ray glasses for websites! While hackers often use command-line tools because they can automate them, many security professionals and web developers use Wappalyzer every single day because it is so fast and easy to use while just browsing the web normally.

Note: We don't have questions for this lesson, but it's a great tool to remember!`,
    questions: []
  },
  {
    title: "4. Guessing Hidden Folders (Fuzzing)",
    points: 60,
    content: `FINDING SECRET DOORS BY GUESSING

WHAT IS DIRECTORY FUZZING?
Imagine you are in a giant house with thousands of blank doors. Most of the doors lead to empty closets, but a few of them lead to rooms full of treasure. None of the doors have labels. How do you find the treasure rooms? You could try opening every single door one by one, but that would take forever! Instead, you use a super-fast robot that can try opening thousands of doors every second. In cybersecurity, websites often have secret folders (directories) that they don't link to anywhere on the main page. They might have a secret folder called "/admin" or "/backup". If you don't know the exact name, you can't visit it. "Fuzzing" is the process of using a computer program to rapidly guess thousands of different folder names to see if any of them exist. 

HOW TO USE FFUF:
One of the fastest guessing robots in the world is a tool called "ffuf" (which stands for Fuzz Faster U Fool). To use it, you give it a giant list of words (like a dictionary). Ffuf will take the website's address, add a word from the dictionary to the end of it, and check if a page loads. It does this over and over again, thousands of times a second. For example, it will try website.com/apple, website.com/admin, website.com/backup, and so on. If the website says "404 Not Found", ffuf knows the folder doesn't exist and moves on. If the website actually loads a page, ffuf shouts "I found a secret door!" and shows you the path. We use the placeholder "FUZZ" in our command to tell the tool exactly where to put the dictionary words.

TASK: Run ffuf against the target server using the common.txt wordlist. Find the hidden path.`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/recon_lesson4.png" alt="4. Guessing Hidden Folders (Fuzzing)"></div>

FINDING SECRET DOORS BY GUESSING

WHAT IS DIRECTORY FUZZING?
Imagine you are in a giant house with thousands of blank doors. Most of the doors lead to empty closets, but a few of them lead to rooms full of treasure. None of the doors have labels. How do you find the treasure rooms? You could try opening every single door one by one, but that would take forever! Instead, you use a super-fast robot that can try opening thousands of doors every second. In cybersecurity, websites often have secret folders (directories) that they don't link to anywhere on the main page. They might have a secret folder called "/admin" or "/backup". If you don't know the exact name, you can't visit it. "Fuzzing" is the process of using a computer program to rapidly guess thousands of different folder names to see if any of them exist. 

HOW TO USE FFUF:
One of the fastest guessing robots in the world is a tool called "ffuf" (which stands for Fuzz Faster U Fool). To use it, you give it a giant list of words (like a dictionary). Ffuf will take the website's address, add a word from the dictionary to the end of it, and check if a page loads. It does this over and over again, thousands of times a second. For example, it will try website.com/apple, website.com/admin, website.com/backup, and so on. If the website says "404 Not Found", ffuf knows the folder doesn't exist and moves on. If the website actually loads a page, ffuf shouts "I found a secret door!" and shows you the path. We use the placeholder "FUZZ" in our command to tell the tool exactly where to put the dictionary words.

TASK: Run ffuf against the target server using the common.txt wordlist. Find the hidden path.`,
    questions: [
      { q: "What is the process of rapidly guessing folder names to find hidden ones called?", a: "fuzzing" },
      { q: "What super-fast tool do we use to guess these secret paths?", a: "ffuf" },
      { q: "What special word do we use as a placeholder to tell the tool where to guess?", a: "FUZZ" },
      { q: "What flag in the tool tells it to ignore pages that say 'Not Found'?", a: "-fc" },
      { q: "What number code does a website send when a page is 'Not Found'?", a: "404" }
    ]
  },
  {
    title: "5. Finding Secret Subdomains",
    points: 50,
    content: `DISCOVERING HIDDEN WEBSITES WITHIN A WEBSITE

WHAT IS SUBDOMAIN ENUMERATION?
Think of a big company like a giant shopping mall. The main mall address might be "shoppingmall.com". But inside the mall, there are many different stores. A company's website is often like that. They have their main website at "company.com", but they might also have a special site just for their employees at "staff.company.com", or a site where they test new features at "test.company.com". These extra parts attached to the front of the main name are called "subdomains". Finding all these subdomains is super important for hackers. The main website is usually guarded very heavily, like the front door of a bank. But a forgotten testing subdomain might be guarded very poorly, like a flimsy back door that was left unlocked.

HOW TO FIND THEM:
Hackers use a process called "Subdomain Enumeration" (enumeration just means finding and listing everything). They use tools similar to the guessing robot we learned about in the last lesson. Instead of guessing folders at the end of the website name, the tools guess words at the BEGINNING of the website name. The tool will try guessing "admin.target.com", "dev.target.com", "backup.target.com", and so on. When doing this on a local testing lab like ours, we use a special trick. We use our fuzzing tool (ffuf) to guess the "Host header". The Host header is like the name tag you wear to a party so the server knows which specific website you want to talk to. By rapidly changing the name tag, we can trick the server into revealing its hidden subdomains!

TASK: Answer the questions below about subdomains.`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/recon_lesson5.png" alt="5. Finding Secret Subdomains"></div>

DISCOVERING HIDDEN WEBSITES WITHIN A WEBSITE

WHAT IS SUBDOMAIN ENUMERATION?
Think of a big company like a giant shopping mall. The main mall address might be "shoppingmall.com". But inside the mall, there are many different stores. A company's website is often like that. They have their main website at "company.com", but they might also have a special site just for their employees at "staff.company.com", or a site where they test new features at "test.company.com". These extra parts attached to the front of the main name are called "subdomains". Finding all these subdomains is super important for hackers. The main website is usually guarded very heavily, like the front door of a bank. But a forgotten testing subdomain might be guarded very poorly, like a flimsy back door that was left unlocked.

HOW TO FIND THEM:
Hackers use a process called "Subdomain Enumeration" (enumeration just means finding and listing everything). They use tools similar to the guessing robot we learned about in the last lesson. Instead of guessing folders at the end of the website name, the tools guess words at the BEGINNING of the website name. The tool will try guessing "admin.target.com", "dev.target.com", "backup.target.com", and so on. When doing this on a local testing lab like ours, we use a special trick. We use our fuzzing tool (ffuf) to guess the "Host header". The Host header is like the name tag you wear to a party so the server knows which specific website you want to talk to. By rapidly changing the name tag, we can trick the server into revealing its hidden subdomains!

TASK: Answer the questions below about subdomains.`,
    questions: [
      { q: "In the address 'admin.example.com', what do we call the 'admin' part?", a: "subdomain" },
      { q: "What is the word for finding and listing all the entry points of a target?", a: "enumeration" },
      { q: "What part of the web request acts like a 'name tag' that we can fuzz to find subdomains?", a: "Host header" },
      { q: "Why do hackers look for subdomains? (To find hidden...)", a: "entry points" },
      { q: "What subdomain name is often used by companies to test new things before they are public?", a: "staging" }
    ]
  },
  {
    title: "6. Capture the Flag — Recon Challenge",
    points: 60,
    content: `THE FINAL RECON TEST

PUTTING YOUR DETECTIVE SKILLS TO WORK
You have learned how to read secret maps (robots.txt), how to identify what a website is made of (fingerprinting), and how to use super-fast robots to guess hidden doors (fuzzing). Now it is time to put all those detective skills together to solve a puzzle! The target server we have set up for you has a secret flag hidden inside it. A flag is just a special piece of text that proves you successfully hacked into the right place. It will look something like this: CTF{some_secret_words}.

YOUR MISSION:
Your goal is to find that hidden flag without anyone telling you exactly where it is. You will need to use your tools. First, you should act like a search engine robot and check if the website owners left any "Do Not Enter" signs lying around that might give you a hint. Then, you should use your fuzzing tool (ffuf) to blast the website with guesses to see if you can uncover any secret folders that aren't linked anywhere. Once your tool finds a secret folder, you can open your web browser and navigate to that exact secret address. If you did everything right, the web page will load and the secret flag will be sitting right there on the screen waiting for you! 

Good luck, detective!`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/recon_lesson6.png" alt="6. Capture the Flag — Recon Challenge"></div>

THE FINAL RECON TEST

PUTTING YOUR DETECTIVE SKILLS TO WORK
You have learned how to read secret maps (robots.txt), how to identify what a website is made of (fingerprinting), and how to use super-fast robots to guess hidden doors (fuzzing). Now it is time to put all those detective skills together to solve a puzzle! The target server we have set up for you has a secret flag hidden inside it. A flag is just a special piece of text that proves you successfully hacked into the right place. It will look something like this: CTF{some_secret_words}.

YOUR MISSION:
Your goal is to find that hidden flag without anyone telling you exactly where it is. You will need to use your tools. First, you should act like a search engine robot and check if the website owners left any "Do Not Enter" signs lying around that might give you a hint. Then, you should use your fuzzing tool (ffuf) to blast the website with guesses to see if you can uncover any secret folders that aren't linked anywhere. Once your tool finds a secret folder, you can open your web browser and navigate to that exact secret address. If you did everything right, the web page will load and the secret flag will be sitting right there on the screen waiting for you! 

Good luck, detective!`,
    questions: [
      { q: "What tool did you use to discover the hidden directory? (ffuf / WhatWeb / Wappalyzer)", a: "ffuf" },
      { q: "What path on the server contains the flag? (e.g. /admin)", a: "/staging" },
      { q: "What is the flag you found on the staging page? (format: CTF{...})", a: "CTF{r3c0n_m4st3r_2026}" },
      { q: "What technique did you use to discover hidden paths by trying thousands of common directory names?", a: "fuzzing" },
      { q: "Are you ready to move on to the next challenge? (yes/no)", a: "yes" }
    ]
  }
];
