const LESSONS = [
  {
    title: "1. Broken Access Control & Security Misconfiguration",
    points: 10,
    content: `WHAT IS THE OWASP TOP 10?
Imagine you are building a giant, super-cool treehouse, and you want to make sure no bullies can ever climb up and steal your toys. You could try to guess how they might break in, but it would be much easier if you had a list of the top ten tricks bullies use, written by all the smartest treehouse builders in the world. That is exactly what the OWASP Top 10 is! OWASP stands for the Open Web Application Security Project. It is a group of computer security experts who write a list of the ten most dangerous ways hackers break into websites. They update this list to keep it fresh. When programmers build websites, they read this list so they know exactly what traps to watch out for. It is the ultimate rulebook for keeping the internet safe.

RULE 1: BROKEN ACCESS CONTROL [OWASP A01:2025]
The number one most common way hackers break into websites is called "Broken Access Control." Imagine you have a special keycard for your school that only lets you into your classroom. But one day, you accidentally swipe your card on the principal's office door, and it opens! That is Broken Access Control. It means the website forgot to check if you are actually allowed to be in a certain place. Hackers use this mistake to wander into private areas of a website, like someone else's shopping cart or an administrator's secret control panel, just by changing a small part of the website address (like changing id=101 to id=100 in the URL). To fix this, programmers must build a strict digital bouncer that checks your permissions every single time you open a door.

RULE 2: SECURITY MISCONFIGURATION [OWASP A02:2025]
Security Misconfiguration is like buying a super expensive, high-tech safe to store your money, but leaving the factory password set to "12345" and leaving the door wide open. Websites run on complicated servers and databases that have hundreds of different security settings. If a programmer forgets to turn the security settings on, or leaves default passwords in place, hackers will find them immediately. Sometimes developers also leave special "debug" screens turned on, which are supposed to help them fix errors but end up showing hackers exactly how the website works behind the scenes. Keeping a website safe means carefully checking every single setting to make sure the digital safe is locked.`,
    questions: [
      { q: "What is the name of the group of experts who write the list of top 10 security rules?", a: "OWASP" },
      { q: "What mistake lets you open doors you shouldn't have access to, like the principal's office?", a: "Broken Access Control" },
      { q: "What is it called when you leave default passwords active or forget to lock a security setting?", a: "Security Misconfiguration" },
      { q: "What default password did the safe builders leave active in our analogy?", a: "12345" },
      { q: "What is the title of the OWASP Top 10 list we are learning?", a: "OWASP Top 10" }
    ]
  },
  {
    title: "2. Supply Chains, Cryptography & Injection",
    points: 10,
    content: `RULE 3: SOFTWARE SUPPLY CHAIN FAILURES [OWASP A03:2025]
Modern apps are rarely written from scratch. Developers use pre-made blocks of code called "packages" or "libraries" created by others to build their websites faster. This network of external parts is the Software Supply Chain. Imagine a toy manufacturer building an electric toy car. They buy the wheels from one shop, the motor from another, and the steering software from a third. If the shop that makes the software gets hacked, or sends a broken update, your toy car becomes dangerous! In web security, if developers use outdated or untrustworthy packages, hackers can compromise the entire app. Programmers must check and verify every single part they import.

RULE 4: CRYPTOGRAPHIC FAILURES [OWASP A04:2025]
This rule is all about keeping secrets. If you want to send a secret message to your friend in class, you wouldn't write it on a big piece of paper and pass it around. Anyone could read it! Instead, you would write it in a secret code that only you and your friend understand. In computer language, this code is called encryption, and failing to use it is a Cryptographic Failure. Sometimes websites accidentally send passwords or credit cards in plain, normal text. Hackers can easily scoop up those messages. To stop this, websites must use strong secret codes (like HTTPS) to scramble the data so that it just looks like gibberish to anyone else.

RULE 5: INJECTION ATTACKS [OWASP A05:2025]
Imagine you have a robot assistant whose only job is to go to the kitchen and get whatever food you write on a piece of paper. If you write "apple," it brings an apple. But what if a sneaky person writes: "apple, and also throw the television out the window"? If the robot isn't smart, it will bring the apple and then throw the TV out! This is an Injection attack. Hackers type tricky computer commands into normal places like search boxes or login fields. If the website doesn't separate commands from plain text, it executes the hacker's commands, thinking they are normal instructions. Programmers must sanitize inputs to make sure the server only reads data, never raw code.`,
    questions: [
      { q: "What is it called when you build a website using broken or hacked parts from other suppliers?", a: "Software Supply Chain Failures" },
      { q: "What is the process of converting passwords or sensitive data into scrambled secret code called?", a: "encryption" },
      { q: "If a robot helper executes a hidden command mixed in with normal data, what attack is this?", a: "Injection" },
      { q: "What protocol/code scrambles web traffic to prevent cryptographic failures?", a: "HTTPS" },
      { q: "What action must programmers perform on inputs to separate commands from plain text?", a: "sanitize" }
    ]
  },
  {
    title: "3. Bad Designs, Authentication & Integrity",
    points: 10,
    content: `RULE 6: INSECURE DESIGN [OWASP A06:2025]
Sometimes a website is built with very strong locks on all the doors, but the architect accidentally designed the house without a roof! This is called Insecure Design. It means the problem isn't a typo in the code, but a mistake in how the system was planned from the very beginning. For example, if you design a store's checkout page but forget to add a rule that prevents users from applying the same coupon discount code 100 times, the code works perfectly, but the blueprint is bad. Developers must perform threat modeling and think like hackers before they write a single line of code.

RULE 7: AUTHENTICATION FAILURES [OWASP A07:2025]
This rule is all about proving you are who you say you are. Imagine someone comes to your front door wearing a cheap plastic mask of your best friend's face. If you just look quickly and say, "Come on in!" without checking carefully, you have failed at authentication. Websites fail at this when they let users choose terrible passwords like "password123" or don't enforce account lockout after multiple incorrect tries. Hackers use computers to guess passwords rapidly. Strong systems prevent this by enforcing account lockouts and requiring Multi-Factor Authentication (MFA), which sends a secret code to your phone to verify your identity.

RULE 8: SOFTWARE OR DATA INTEGRITY FAILURES [OWASP A08:2025]
Integrity means trusting that something hasn't been secretly messed with. Imagine you buy a sealed video game from a store, but a thief opened the box, replaced the game disc with a piece of cardboard, and sealed it back up perfectly. You wouldn't know you were tricked until you tried to play it! Hackers do this with computer code or cookie data. They modify database values or session cookies to pretend to be an administrator. To prevent this, websites must use digital signatures (like cryptographic seals) and hashes to verify that the software packages, updates, and cookies have absolutely never been altered by anyone else.`,
    questions: [
      { q: "What is the name for a system designed without a roof or lacking basic security rules from the start?", a: "Insecure Design" },
      { q: "What failure happens when a website accepts weak passwords like 'password123'?", a: "Authentication Failures" },
      { q: "What is the type of failure when a hacker swaps good software updates or cookie data with bad ones?", a: "Software or Data Integrity Failures" },
      { q: "What do developers use to prove software or cookie data hasn't been tampered with?", a: "digital signatures" },
      { q: "What does MFA stand for?", a: "Multi-Factor Authentication" }
    ]
  },
  {
    title: "4. Logging & Alerting, and Exceptional Conditions",
    points: 10,
    content: `RULE 9: SECURITY LOGGING & ALERTING FAILURES [OWASP A09:2025]
Imagine a bank with huge vaults and thick metal doors, but they completely forgot to install any security cameras or alarms. A robber could sneak in at midnight, spend hours drilling into the vault, and nobody would know until the bank opened the next morning! This is a Security Logging and Alerting Failure. A "log" is a computer's diary. It writes down everything that happens (e.g., "admin logged in" or "failed password attempt"). If a website doesn't keep a diary, or if it doesn't set off alarms when suspicious patterns occur, hackers can spend months quietly exploring the system. Good websites use monitoring tools to alert defenders instantly.

RULE 10: MISHANDLING OF EXCEPTIONAL CONDITIONS [OWASP A10:2025]
This is a new rule about how websites behave when things go wrong. Imagine a locksmith arrives at your locked door, gets confused by the lock, and starts muttering out loud: "I can't open this lock because the internal pin size is 2mm, the code is 4921, and the owner's second key is under the doormat." They just gave away all the secrets! When websites crash or experience an error (like looking up an item that doesn't exist), they sometimes print verbose stack trace messages or internal directories on the screen. Hackers read these error messages to steal database credentials and mapping schemes. Websites must handle errors cleanly and only show generic pages to users.`,
    questions: [
      { q: "What failure is described as a bank operating without security cameras or alarms?", a: "Security Logging & Alerting Failures" },
      { q: "What is the computer's diary that records everything that happens called?", a: "a log" },
      { q: "What is the new Rule 10 vulnerability where a computer leaks internal secrets when it gets confused or crashes?", a: "Mishandling of Exceptional Conditions" },
      { q: "What should a website display instead of verbose technical stack traces during an error?", a: "generic error pages" },
      { q: "Where should detailed error information be written instead of HTTP responses?", a: "server logs" }
    ]
  }
];
