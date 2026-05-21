const LESSONS = [
  {
    title: "1. The Big List of Security Rules (OWASP Top 10)",
    points: 10,
    content: `WHAT IS THE OWASP TOP 10?
Imagine you are building a giant, super-cool treehouse, and you want to make sure no bullies can ever climb up and steal your toys. You could try to guess how they might break in, but it would be much easier if you had a list of the top ten tricks bullies use, written by all the smartest treehouse builders in the world. That is exactly what the OWASP Top 10 is! OWASP stands for the Open Web Application Security Project. It is a huge group of extremely smart computer security experts who get together and write a list of the ten most dangerous ways hackers break into websites. They update this list every few years to keep it fresh. When programmers build websites, they read this list so they know exactly what traps to watch out for. It is basically the ultimate rulebook for keeping the internet safe.

RULE 1: BROKEN ACCESS CONTROL
The number one most common way hackers break into websites is called "Broken Access Control." Imagine you have a special keycard for your school that only lets you into your classroom. But one day, you accidentally swipe your card on the principal's office door, and it opens! That is Broken Access Control. It means the website forgot to check if you are actually allowed to be in a certain place. Hackers use this mistake to wander into private areas of a website, like someone else's shopping cart or an administrator's secret control panel, just by changing a small part of the website address. To fix this, programmers have to build a strict digital bouncer that checks your ID card every single time you try to open any door.

RULE 2: CRYPTOGRAPHIC FAILURES
This rule is all about keeping secrets. If you want to send a secret message to your friend in class, you wouldn't just write it on a big piece of paper and pass it around. Anyone could read it! Instead, you would write it in a secret code that only you and your friend understand. In computer language, this secret code is called encryption, and when a website fails to use it properly, it's called a Cryptographic Failure. Sometimes websites accidentally send important things like passwords or credit card numbers in plain, normal text over the internet. A hacker can easily scoop up those messages as they travel through the air. To stop this, websites must use strong secret codes (like HTTPS) to scramble the data so that even if a hacker catches it, it just looks like gibberish.`,
    questions: [
      { q: "What is the name of the group of experts who write the list of top 10 security rules?", a: "OWASP" },
      { q: "What is the number one most common mistake where websites let people into rooms they shouldn't be in?", a: "Broken Access Control" },
      { q: "What do we call it when a website fails to use secret codes to protect sensitive messages?", a: "Cryptographic Failure" },
      { q: "What happens if a website sends a password in plain text without using a secret code?", a: "Hackers can read it" },
      { q: "How often do the security experts update their Top 10 list?", a: "every few years" }
    ]
  },
  {
    title: "2. Injection and Bad Designs",
    points: 10,
    content: `RULE 3: INJECTION ATTACKS
Imagine you have a robot assistant whose only job is to go to the kitchen and get whatever food you write on a piece of paper. If you write "apple," it brings an apple. But what if a sneaky person writes "apple, and also throw the television out the window"? If the robot isn't very smart, it will bring the apple and then throw the TV out! This is called an Injection attack. Hackers type special, tricky computer commands into normal places like search boxes or login screens. If the website isn't careful, it accidentally reads those sneaky commands and executes them, thinking they are normal instructions. This is how hackers trick databases into handing over everyone's passwords. To stop this, programmers have to teach the website to carefully separate normal words from computer commands, just like teaching the robot to only look for food names.

RULE 4: INSECURE DESIGN
Sometimes a website is built with very strong locks on all the doors, but the architect accidentally designed the house without a roof! This is called Insecure Design. It means the security problem isn't a mistake in the coding, but a mistake in how the whole system was planned from the very beginning. For example, imagine a website that lets you guess your password as many times as you want without ever locking you out. A hacker could use a super-fast computer to guess a million passwords a second until they get in. The code itself isn't broken, but the design is bad because it doesn't have a rule to stop endless guessing. To prevent this, programmers have to think like hackers before they even start building, carefully planning out how every single feature could be abused.

RULE 5: SECURITY MISCONFIGURATION
Security Misconfiguration is like buying a super expensive, high-tech safe to store your money, but leaving the factory password set to "12345" and leaving the door wide open. Websites run on complicated servers and databases that have hundreds of different security settings. If a programmer forgets to turn the security settings on, or leaves default passwords in place, hackers will find them immediately. Sometimes developers also leave special "debug" screens turned on, which are supposed to help them fix errors but end up showing hackers exactly how the website works behind the scenes. Keeping a website safe means carefully checking every single setting to make sure the digital safe is actually locked.`,
    questions: [
      { q: "What is it called when a hacker types sneaky computer commands into a normal search box?", a: "Injection" },
      { q: "What happens if a website has strong locks but was planned poorly from the start?", a: "Insecure Design" },
      { q: "What is it called when a programmer forgets to turn on security settings or leaves default passwords?", a: "Security Misconfiguration" },
      { q: "If a robot reads a sneaky command and executes it, what attack does this describe?", a: "Injection" },
      { q: "What kind of special screen should developers turn off so hackers can't see behind the scenes?", a: "debug screens" }
    ]
  },
  {
    title: "3. Old Software and Fake Identities",
    points: 10,
    content: `RULE 6: VULNERABLE AND OUTDATED COMPONENTS
Imagine you build a beautiful new bicycle, but you decide to use rusty, broken brakes from an old junkyard. It doesn't matter how shiny the new bike is; the broken brakes make the whole thing dangerous! In computer programming, people rarely write everything from scratch. They use pre-made blocks of code called "components" or "libraries" to build their websites faster. But sometimes, those older blocks of code have known security holes that hackers have already figured out how to break. If a programmer uses an old, outdated component to build their brand-new website, hackers can use old tricks to break right in. To stay safe, programmers have to act like mechanics, constantly checking to make sure every single part of their website is updated and using the newest, safest versions available.

RULE 7: IDENTIFICATION AND AUTHENTICATION FAILURES
This rule is all about proving you are who you say you are. Imagine someone comes to your front door wearing a cheap plastic mask of your best friend's face. If you just look quickly and say, "Come on in!" without checking carefully, you have failed at authentication. Websites fail at this when they let people use terrible passwords like "password123" or when they don't use extra security steps like sending a text message code to your phone (which is called Multi-Factor Authentication). Hackers use giant lists of stolen passwords to see if they can sneak into other people's accounts. If the website doesn't have strong checks in place, the hacker can put on a digital mask and walk right in, pretending to be you.

RULE 8: SOFTWARE AND DATA INTEGRITY FAILURES
Integrity means trusting that something hasn't been secretly messed with. Imagine you buy a sealed video game from a store, but a sneaky thief carefully opened the box, replaced the game with a piece of cardboard, and sealed it back up perfectly. You wouldn't know you were tricked until you tried to play it! Hackers do this with computer updates. They sneak into the place where companies make their software and secretly insert malicious code into the official updates. When the company sends the update out to thousands of customers, the customers trust it because it came from the official company. But really, they are downloading the hacker's secret trap. Websites have to use special digital signatures (like tamper-proof seals) to prove that their software has absolutely never been touched by a hacker.`,
    questions: [
      { q: "What is it called when a programmer builds a site using old, broken blocks of code?", a: "Vulnerable and Outdated Components" },
      { q: "What failure happens when a website lets you use a terrible password like 'password123'?", a: "Identification and Authentication Failures" },
      { q: "What extra security step sends a code to your phone to prove it's really you?", a: "Multi-Factor Authentication (or MFA)" },
      { q: "What failure involves hackers sneaking bad code into official company updates?", a: "Software and Data Integrity Failures" },
      { q: "What do companies use to prove their software hasn't been messed with, like a tamper-proof seal?", a: "digital signatures" }
    ]
  },
  {
    title: "4. Logging and Secret Requests",
    points: 10,
    content: `RULE 9: SECURITY LOGGING AND MONITORING FAILURES
Imagine a bank with huge vaults and thick metal doors, but they completely forgot to install any security cameras or alarms. A robber could sneak in at midnight, spend hours drilling into the vault, and nobody would know until the bank opened the next morning! This is exactly what happens when a website has Logging and Monitoring Failures. A "log" is just a computer's diary. It writes down everything that happens, like "User A logged in" or "Someone tried the wrong password ten times." If a website doesn't keep a diary, or if nobody ever reads the diary, hackers can spend months quietly exploring the system without anyone ever noticing. Good websites have digital alarms that go off and text the security team the exact moment someone tries something suspicious, so they can stop the hacker before any real damage is done.

RULE 10: SERVER-SIDE REQUEST FORGERY (SSRF)
This is a tricky attack that involves confusing the server. Imagine you are not allowed to go into the teacher's lounge, but you really want a soda from the machine inside. You know a very polite student who is allowed in there, so you trick them by saying, "The principal said you need to go buy a soda and bring it to me." The student goes in, gets the soda, and brings it out to you. You used the trusted student to do something you weren't allowed to do! In an SSRF attack, the hacker does this to the website's main computer (the server). The server is allowed to look at secret internal files that the hacker is blocked from seeing. So, the hacker sends a tricky message telling the server, "Hey, go fetch this file and show it to me." The server, being too polite and not checking properly, goes and grabs the secret internal file and hands it right over to the hacker.

This wraps up the OWASP Top 10! These are the ten most important rules every programmer must learn to keep the internet safe from bad guys.`,
    questions: [
      { q: "What is it called when a website acts like a bank with no security cameras or alarms?", a: "Security Logging and Monitoring Failures" },
      { q: "What is a computer's 'diary' that writes down everything that happens called?", a: "a log" },
      { q: "What attack tricks the website's server into fetching secret internal files for the hacker?", a: "Server-Side Request Forgery (or SSRF)" },
      { q: "If hackers try the wrong password ten times, what should the website do immediately?", a: "set off an alarm (or alert the security team)" },
      { q: "Who does the hacker trick in an SSRF attack to do their dirty work?", a: "the server" }
    ]
  }
];
