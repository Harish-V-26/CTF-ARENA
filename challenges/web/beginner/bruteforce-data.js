const LESSONS = [
  {
    title: "1. The Giant Keychain",
    points: 10,
    content: `WHAT IS A BRUTE FORCE ATTACK?
Imagine you find a heavy, locked treasure chest. You know there is a key somewhere, but instead of finding it, you bring a giant ring with a million different keys on it. You sit there and try every single key, one by one, until finally, one of them turns the lock! This is exactly what a Brute Force Attack is in the computer world. Hackers want to break into your accounts, but they don't know your password. So, they use a computer program to rapidly try thousands of different passwords, over and over, until they accidentally guess the right one. It is not very sneaky or clever; it is just using pure computer muscle to smash the door open. 

WHY DOES IT WORK?
You might think guessing passwords would take forever. If a hacker has to try every single combination of letters and numbers (like "aaaaa", then "aaaab", then "aaaac"), it would take millions of years! But computers are incredibly fast. A normal computer can guess thousands of passwords a second. And if a hacker uses a special computer built for video games (using a GPU), they can sometimes guess billions of passwords every single second! Because so many people use terrible, short passwords like "12345" or "qwerty," the hacker's super-fast guessing machine will unlock the account almost instantly. 

WHAT DO THEY ATTACK?
Hackers don't just attack website login screens. They also use the giant keychain to unlock secret, encrypted ZIP files that hold private company documents. If a hacker breaks into a website and steals the giant database file where everyone's passwords are saved (which are usually scrambled up to protect them), the hacker takes that scrambled file home. They put it into their giant, roaring guessing machine and let it run for weeks, trying to unscramble all the passwords so they can sell them on the internet.`,
    questions: [
      { q: "What attack involves trying passwords over and over like testing keys on a giant ring?", a: "Brute Force" },
      { q: "Why are these attacks still so successful today?", a: "Because humans create weak passwords" },
      { q: "What do hackers use besides login screens to test their guessing machines?", a: "Encrypted files (or password hashes, tokens)" },
      { q: "What special computer part (used for video games) makes guessing incredibly fast?", a: "GPUs (Graphics Processing Units)" },
      { q: "What do we call the simplest attack that tries every single letter combination (a, b, c...)?", a: "Simple Brute Force" }
    ]
  },
  {
    title: "2. The Hacker's Dictionary",
    points: 10,
    content: `WHAT IS A DICTIONARY ATTACK?
Instead of guessing random nonsense letters like "x-q-z-b-f", which takes forever, hackers realized they could save a lot of time. Humans aren't very creative when making passwords. Most people use normal words like "football", "summer", or "password". So, hackers created massive text files called "Wordlists." These files are literally just giant dictionaries containing millions of normal words. When a hacker uses a program to read down this list and try every word as a password, it is called a "Dictionary Attack." It is much, much faster than a Simple Brute Force attack because the computer isn't wasting time guessing words that don't make sense.

THE ROCKYOU FILE
Over the years, many big websites have been hacked, and the hackers stole all the passwords. The hackers took all those real passwords and mashed them together into the ultimate hacker dictionary. The most famous dictionary in the entire world is called "RockYou.txt." It contains over 14 million passwords that real, living people actually used on the internet! If you use a password that is anywhere in that file, a hacker's computer will guess your password in less than a second. 

MIXING IT UP (HYBRID ATTACKS)
Hackers know that sometimes people try to be a little bit tricky. Someone might take a dictionary word like "football" and add the year to the end, making it "football2024." To catch these people, hackers use a "Hybrid Attack." Their guessing machine takes a word from the dictionary and automatically adds numbers and symbols to the end. It will try "football1", "football!", and "football123". The smartest hacking machines even have "Rules." These rules tell the machine to take a dictionary word and capitalize the first letter, or change the letter "o" into the number "0" (like f00tball). This multiplies the power of the dictionary, making the attack incredibly dangerous!`,
    questions: [
      { q: "What attack uses a giant list of normal words to guess passwords faster?", a: "Dictionary Attack" },
      { q: "What is the name of the most famous hacker dictionary with 14 million passwords?", a: "RockYou" },
      { q: "What attack takes dictionary words and adds numbers or symbols to them?", a: "Hybrid Attack" },
      { q: "In what year was the famous RockYou list leaked?", a: "2009" },
      { q: "What do advanced hacking machines use to capitalize letters or change letters to numbers?", a: "Rules (or transformation rules)" }
    ]
  },
  {
    title: "3. Stuffing the Box",
    points: 10,
    content: `WHAT IS CREDENTIAL STUFFING?
Hackers have gotten even smarter in recent years. They realized that trying millions of passwords against one account makes a lot of noise and sets off security alarms. So, they invented a sneaky attack called "Credential Stuffing." When a giant website (like a video game company or a forum) gets hacked, the bad guys steal a massive list of usernames and the exact passwords that match them. Because humans are very lazy, they often use the exact same username and password on every single website they visit! The hacker takes that stolen list and automatically "stuffs" those exact username and password pairs into the login screens of thousands of completely different websites, like banks and email providers. If your forum account got hacked, the bad guy instantly has the key to your bank account, too!

THE SNEAKY SPRAY ATTACK
Another very clever trick hackers use to avoid setting off alarms is called "Password Spraying." Normally, a brute force attack tries a thousand passwords on one single user account. The website sees this, gets suspicious, and locks the account to keep it safe. But in a Spray attack, the hacker does the exact opposite! The hacker gathers a list of a thousand different usernames. Then, they take just ONE very common password (like "Winter2024!") and "spray" it across all one thousand accounts. Because each account only sees one single bad guess, the security alarm never rings! 

WAITING IN THE SHADOWS
To be even sneakier, hackers who use the Spray attack will often wait a very long time between guesses. They might try one password, wait 45 minutes, and then try another one. They do this because they know the security guards are looking for fast, robotic clicking. By moving incredibly slowly, the hacker blends in with normal traffic, making it almost impossible for the website's defenders to realize an attack is happening until it is too late!`,
    questions: [
      { q: "What attack takes stolen username and password pairs and uses them on other websites?", a: "Credential Stuffing" },
      { q: "Why does the Stuffing attack work so well on humans?", a: "Because users reuse the same password on many websites" },
      { q: "What attack tries one common password against thousands of different accounts to avoid alarms?", a: "Password Spraying" },
      { q: "What website lets you check if your password was stolen in a big hack?", a: "Have I Been Pwned (HIBP)" },
      { q: "Why do Spray attackers wait 45 minutes between their guesses?", a: "To stay below alarms and avoid getting locked out" }
    ]
  },
  {
    title: "4. Building a Stronger Door (Defense)",
    points: 10,
    content: `HOW TO MAKE AN UNBREAKABLE KEY
If hackers have giant supercomputers guessing passwords, how do we stop them? The absolute best defense is to make a password that is incredibly long. Length is much more important than weird symbols. A password like "purpledinosaurridingabicycle" is much, much harder for a supercomputer to guess than "P@ssw0rd1!". This is because every single letter you add makes the math problem millions of times harder for the computer to solve. To remember these long passwords, you should use a "Password Manager," which is a digital vault that creates and stores a different, super-long password for every single website you visit.

THE SECOND LOCK (MFA)
Even if you have a perfect password, a hacker might trick you into giving it to them. This is why every important website uses "Multi-Factor Authentication" (MFA). Imagine a vault with two completely different locks. The first lock is your password (something you know). The second lock is a special code that pops up on your mobile phone (something you have). If a hacker in another country steals your password and tries to log in, the vault stops them and says, "Okay, now type the code from your phone!" Since the hacker doesn't have your physical phone in their hand, they are completely locked out. MFA stops 99% of all hacker attacks!

THE FUTURE OF KEYS
Passwords are fundamentally broken because humans are bad at making them. The internet is slowly moving to a new system called "Passkeys." With a Passkey, you don't even have a password to type! Instead, your phone or computer holds a secret, invisible cryptographic key. When you want to log in, the website asks your phone to unlock the door, and you just use your fingerprint or face scan to say "Yes, it's me." Because there is no password to type, there is absolutely nothing for a hacker to steal or guess. It makes brute force attacks completely impossible!`,
    questions: [
      { q: "When creating a safe password to beat a supercomputer, what is more important: length or weird symbols?", a: "Length" },
      { q: "What digital vault creates and stores a different long password for every website you use?", a: "Password Manager" },
      { q: "What defense puts a second lock on the door, like sending a code to your phone?", a: "Multi-Factor Authentication (or MFA)" },
      { q: "What does the 'T' stand for in TOTP (the special code app on your phone)?", a: "Time-based (Time-based One-Time Password)" },
      { q: "What new technology uses fingerprints instead of typed passwords, making hacking impossible?", a: "Passkeys (or FIDO2)" }
    ]
  },
  {
    title: "5. Traps for the Hackers",
    points: 10,
    content: `THE ANGRY BOUNCER
Websites have to fight back against the robot guessing machines. The most common way they do this is with an "Account Lockout" policy. Imagine a very strict bouncer at the door of a club. If you tell the bouncer the wrong secret password five times in a row, the bouncer crosses his arms and says, "You are locked out! Come back in 15 minutes." This completely breaks the hacker's guessing machine. If the hacker has to wait 15 minutes after every five guesses, it will take them thousands of years to try all the words in their dictionary! 

SLOWING THEM DOWN
Sometimes, hackers try to be sneaky and attack hundreds of different accounts from the same computer. To stop this, websites use "Rate Limiting." The bouncer looks at the hacker's IP address (their computer's home address) and says, "You are only allowed to make 10 guesses per minute, total!" If the hacker tries to guess 11 times, the bouncer throws the guesses in the trash. Hackers try to get around this by using "botnets," which is a giant army of infected computers all around the world. The hacker makes each infected computer send one guess, so the bouncer doesn't realize it's all coming from the same bad guy!

THE SQUIGGLY LETTERS AND FAKE ACCOUNTS
To prove you are not a robotic guessing machine, websites make you solve a puzzle called a CAPTCHA. You have to click pictures of traffic lights or type out squiggly, hard-to-read letters. Robots are terrible at reading squiggly letters, so they get stuck at the puzzle and can't even try to guess the password. The sneakiest trick of all is a "Honeypot Account." A website creator will make a fake account named "administrator" and never tell anyone about it. Since no real human knows the account exists, if anyone ever tries to log into it, the website instantly knows it is a hacker guessing passwords! The website immediately blocks the hacker's computer from the entire internet.`,
    questions: [
      { q: "What policy locks the door for 15 minutes after you type the wrong password five times?", a: "Account Lockout" },
      { q: "What defense tells a computer they are only allowed to make 10 guesses per minute?", a: "Rate Limiting" },
      { q: "What puzzle forces you to read squiggly letters to prove you are a human and not a robot?", a: "CAPTCHA" },
      { q: "How do hackers get around Rate Limiting by using infected computers?", a: "By rotating IP addresses (using botnets or proxies)" },
      { q: "What is the secret fake account called that websites use to catch hackers?", a: "A Honeypot account" }
    ]
  },
  {
    title: "6. The Hacker's Tools",
    points: 10,
    content: `THE PROFESSIONAL LOCKPICKS
Just like a locksmith needs special tools to open a safe, cybersecurity professionals use special guessing tools to test how strong a company's passwords really are. Remember, it is incredibly illegal to use these tools on computers you do not own! One of the most famous and fastest tools is called "Hydra." It is a network logon cracker. You open a terminal, point Hydra at a server (like a website or an email server), hand it the giant RockYou dictionary, and tell it to go to work. Hydra will fire thousands of guesses at the server's front door until it breaks in. Another tool very similar to Hydra is called "Medusa," which is built for extreme speed and testing lots of computers all at the exact same time.

THE OFFLINE CRACKING MACHINES
Sometimes, a hacker breaks into a website and steals the giant filing cabinet containing everyone's passwords. The passwords are scrambled up (hashed) so nobody can read them. To unscramble them, the hacker takes the file home and uses an "Offline Cracking" tool. The most famous offline tools are "John the Ripper" and "Hashcat." These tools don't talk to the internet at all. They just sit on the hacker's super-fast video game computer and try millions of different dictionary words, scrambling each word to see if it perfectly matches the stolen scrambled passwords. Hashcat is so powerful that it can guess billions of passwords every single second using the computer's graphics card!

THE INTRUDER
If a professional wants to attack a very specific, custom website, they use the "Intruder" tool built inside Burp Suite (the magical toll booth we learned about). Intruder lets the hacker take a web request, highlight the password box, and say, "Fire the dictionary right here!" Intruder will automatically swap out the password, send the request, read the website's answer, and highlight any guess that worked. By using these tools, security experts find the weak passwords and force the employees to change them before the bad guys show up!`,
    questions: [
      { q: "What fast network cracking tool do professionals use to test a server's front door?", a: "Hydra" },
      { q: "What tool built inside Burp Suite lets you fire a dictionary at a specific website password box?", a: "Intruder" },
      { q: "What tool do hackers use offline to unscramble stolen passwords using super-fast graphics cards?", a: "Hashcat (or John the Ripper)" },
      { q: "What mode number is used in Hashcat to crack old MD5 passwords?", a: "0" },
      { q: "What type of Intruder attack tests multiple payload lists in all combinations?", a: "Cluster Bomb" }
    ]
  }
];
