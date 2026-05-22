const LESSONS = [
  {
    title: "1. What is Blind SQLi?",
    points: 20,
    content: `Welcome to the Blind SQL Injection Lab! 

WHAT IS BLIND SQL INJECTION?
Imagine you are a detective investigating a crime, and you have found a very important witness who knows all the secrets! But there is a huge problem: the witness has duct tape over their mouth and cannot speak a single word. They also cannot hand you any papers. This is exactly what "Blind SQL Injection" is like! The website's security guards are smart enough to stop the database from printing out the passwords on the screen. The database knows the answers, but it is totally blind and mute to you. So, how do we get the secrets? We have to play the game "20 Questions" with the computer! Instead of asking "What is the password?", we ask "Does the password start with the letter A?" If the database guard nods yes, we know the first letter! Or, we can use an even cooler trick: we tell the guard, "If the answer is YES, close your eyes and go to sleep for exactly 5 seconds!" If we start our stopwatch and the website freezes for exactly 5 seconds, we magically know the answer was YES, without the guard ever speaking a word!

STEP 1: Start the Lab
Click "Launch DVWA Instance". Wait for your container to start.

STEP 2: Log In & Setup
1. Username: admin, Password: password
2. Click "Create / Reset Database".
3. Go to "DVWA Security" and set it to "Low".`,
    questions: [
      { q: "Can the guard (database) speak and show you the data directly in a Blind attack? (yes/no)", a: "no" },
      { q: "What game is Blind SQLi similar to? (20...)", a: "20 Questions" },
      { q: "What trick can we use to see if the answer is YES? (Make the guard go to...)", a: "sleep" }
    ]
  },
  {
    title: "2. The Sleeping Guard (Low Level)",
    points: 30,
    content: `THE SLEEPING GUARD TRICK
Now it is time to try our amazing stopwatch trick on the mute database guard! Remember, the guard cannot talk to us, but the guard still obeys our math spells. We are going to hand the guard a note that says, "Hey, if my math equation is perfectly true, I want you to immediately go to sleep for 5 seconds before you do anything else." Since we know our math equation is true, the guard will read it, fall asleep, and make the entire website spin and freeze. When we see the website spinning, we know our spell worked and we have broken the lock!

HOW TO DO THE TRICK:

1. Go to "SQL Injection (Blind)" on the left menu.
2. If you type 1, it says "User ID exists". But it won't show you any names.
3. Let's cast our sleeping spell: \`1' AND SLEEP(5) #\`

Why does this work?
- The guard checks if User 1 exists (YES).
- Then it sees "AND SLEEP(5)". Since the first part was YES, it executes the sleep command!
- The website will freeze and spin for exactly 5 seconds before answering.

Try it! Notice how long it takes to load. You just proved the database is vulnerable!`,
    questions: [
      { q: "What word do we use to make the database freeze? (Hint: SLEEP)", a: "SLEEP" },
      { q: "How many seconds did we tell the guard to sleep?", a: "5" },
      { q: "Did the website take a long time to load? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "3. The Hidden Dropdown (Medium Level)",
    points: 30,
    content: `HIDING THE MAGIC WAND
Uh oh! We leveled up to Medium security, and the security guards realized we were typing magic spells into the text box. So, they completely ripped the text box off the wall! Instead, they left a simple dropdown menu where you can only click numbers. They think that because we can't type, we can't cast our spells. But hackers are very clever. We can use our Developer Tools (the x-ray glasses of the internet) to look behind the webpage and change the HTML code itself! We are going to rewrite the code of the dropdown menu to hide our sleeping spell right inside it.

HOW TO DO THE TRICK:

1. Change security to Medium. Go back to "SQL Injection (Blind)".
2. We have a dropdown menu again. Let's hack it using DevTools!
3. Right-click the dropdown menu and click "Inspect".
4. Find the code: \`<option value="1">1</option>\`.
5. Double-click the \`value="1"\` part.
6. Change it to: \`value="1 AND SLEEP(5)"\` (No quotes needed).
7. Press Enter. Select the "1" from the dropdown and click Submit.

Watch the loading spinner! If it spins for 5 seconds, you successfully hacked the Blind SQLi!`,
    questions: [
      { q: "What tool did we use to change the dropdown menu code?", a: "DevTools" },
      { q: "Did the website freeze for 5 seconds again? (yes/no)", a: "yes" },
      { q: "Does Blind SQLi still work on the Medium level? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "4. The Poisoned Cookie (High Level)",
    points: 30,
    content: `THE POISONED WRISTBAND
The security guards are getting really mad! On High security, they ripped out the text box AND the dropdown menu. Now there is absolutely nowhere to click or type. How are we supposed to hand our spell to the mute database guard? The answer is Cookies! Remember the special digital wristband the website gives you so it remembers who you are? The website is secretly reading your ID number off that wristband every time you click a page. We are going to use our Developer Tools to take our wristband, scratch out our ID number, and write our sleeping spell right on the wristband itself! When the guard scans our wristband, the spell will be cast invisibly!

HOW TO DO THE TRICK:

1. Change security to High. Go to "SQL Injection (Blind)".
2. The website is passing your User ID invisibly using a "Cookie".
3. Open DevTools (F12). Go to the "Application" or "Storage" tab at the top.
4. On the left side, click "Cookies" and select the website IP.
5. You will see a cookie named \`id\` with a value of \`1\`.
6. Double-click the value \`1\` and change it to our spell: \`1' AND SLEEP(5) #\`
7. Refresh the page! 

The page will take 5 seconds to reload. You just poisoned a cookie!`,
    questions: [
      { q: "Where was the vulnerable parameter hiding this time?", a: "Cookie" },
      { q: "Which tab in DevTools lets you see and change Cookies?", a: "Application" },
      { q: "Did the page take 5 seconds to reload after poisoning the cookie? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "5. The Strict Bouncer (Impossible Level)",
    points: 30,
    content: `THE ULTIMATE SHIELD
Why did all of our amazing stopwatch and wristband tricks suddenly fail on Impossible mode? Even though the database guard is mute, the architects of the website finally gave the guard the ultimate shield: a Prepared Statement. 

THE DEFENSE (Prepared Statements):
Just like regular SQL Injection, the best defense is a "Prepared Statement".

When you give the robot your spell: \`1' AND SLEEP(5) #\`
The robot puts it in a safe box. It asks the database: "Is there a user named literally 1-Quote-AND-SLEEP-5-Hashtag?"
The database instantly says NO, without ever running the SLEEP command.

Prepared Statements save the day once again!`,
    questions: [
      { q: "What is the best defense against Blind SQL Injection?", a: "Prepared Statements" },
      { q: "Did the SLEEP command work on Impossible mode? (yes/no)", a: "no" },
      { q: "Are Prepared Statements the superhero of database security? (yes/no)", a: "yes" }
    ]
  }
];
