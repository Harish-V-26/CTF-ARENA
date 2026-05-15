const LESSONS = [
  {
    title: "1. What is XSS?",
    points: 20,
    content: `Welcome to the XSS Lab! We are going to learn about "Cross-Site Scripting" (XSS).

WHAT IS XSS?
Imagine a website is a magic whiteboard where people can leave messages for each other. XSS happens when a bad guy writes a secret spell (made of JavaScript code) on the board instead of a normal message. 

When you look at the board, the board accidentally casts the spell on you! This spell can steal your cookies or make you do things you didn't want to.

STEP 1: Start the Lab
Click the "Launch DVWA Instance" button. Wait for your tiny private computer to start.

STEP 2: Log In like a Boss
Username: admin
Password: password

STEP 3: Setup the Game
Scroll down and click "Create / Reset Database".

STEP 4: Security Level
Go to "DVWA Security" on the left menu. Make sure it is set to "Low" and click "Submit".`,
    questions: [
      { q: "What is the default username for our lab?", a: "admin" },
      { q: "What is the default password?", a: "password" },
      { q: "What language are the secret spells (XSS attacks) usually written in?", a: "JavaScript" }
    ]
  },
  {
    title: "2. The Echo Trick (Reflected XSS)",
    points: 30,
    content: `Reflected XSS is like an echo. You yell a magic spell into the website, and it yells it right back at you, accidentally casting it!

HOW TO DO THE TRICK:

🟢 LOW LEVEL (The Bouncer is Asleep)
1. Go to "DVWA Security" and set it to Low.
2. Go to "XSS (Reflected)".
3. Type this spell: <script>alert(1)</script>
4. It works! A box pops up because the website echoed your code perfectly.

🟡 MEDIUM LEVEL (The Bouncer is confused)
1. Change security to Medium. Try the spell again—it fails!
2. The website is now looking for the word "script" and deleting it.
3. Trick it by changing the capital letters: <SCRIPT>alert(1)</SCRIPT>

🔴 HIGH LEVEL (The Strict Bouncer)
1. Change security to High. Now it deletes anything that looks like a script tag!
2. We don't need a script tag. Let's send a broken image! 
3. Type: <img src="x" onerror="alert(1)">
4. The browser tries to load image "x", fails, and runs our spell instead!

🛡️ IMPOSSIBLE LEVEL: The Translator Tool
Why did it fail on Impossible mode?

Imagine the website hired a very strict translator named "htmlspecialchars()".
When you yell your secret spell into the website: <script>alert(1)</script>
The translator catches the echo and says: "No way! These brackets (< and >) look dangerous!"

Instead of echoing the dangerous brackets back to you, the translator changes them into safe, boring text codes.
So, the website just safely prints the exact text you typed on the screen. The echo is completely harmless!`,
    questions: [
      { q: "Which attack is like an echo yelling the spell back at you?", a: "Reflected XSS" },
      { q: "What tag can we use to run a spell when an image fails to load?", a: "img" },
      { q: "What tool translates our attack into harmless safe text?", a: "htmlspecialchars" }
    ]
  },
  {
    title: "3. The Poisoned Billboard (Stored XSS)",
    points: 30,
    content: `Stored XSS is the scariest one! It's like painting a poisoned spell permanently onto a billboard. Anyone who walks by and looks at the billboard gets attacked!

HOW TO DO THE TRICK:

🟢 LOW LEVEL
1. Change security to Low. Go to "XSS (Stored)".
2. In Name, type "Hacker". In Message, type: <script>alert('Stored!')</script>
3. Sign the Guestbook. Boom! The spell is saved. If you refresh the page, it hits you again!

🟡 MEDIUM LEVEL
1. Change security to Medium. 
2. The Message box is now safe, but the Name box is still vulnerable! 
3. But wait, the Name box only lets you type 10 letters. 
4. Right-click the Name box and click "Inspect" (DevTools). Find where it says maxlength="10" and change it to 100!
5. Now type your spell in the Name box: <script>alert(1)</script>

🔴 HIGH LEVEL
1. Change security to High. The Name box now deletes "script" tags.
2. Change the maxlength to 100 again.
3. Use a different spell: <svg onload="alert(1)">

🛡️ IMPOSSIBLE LEVEL: The Translator Tool
Why did it fail on Impossible mode?

Imagine the website hired a very strict translator named "htmlspecialchars()".
When you type your secret spell: <script>alert(1)</script>
The translator looks at it and says: "No way! These brackets (< and >) look dangerous!"

Instead of saving the dangerous brackets to the database, the translator changes them into safe, boring text codes (like &lt; and &gt;).
So, when the website paints your message on the billboard for everyone to see, it doesn't run the spell. It just safely prints the exact text you typed. The magic is completely broken before it even reaches the database!`,
    questions: [
      { q: "Does Stored XSS save the spell permanently? (yes/no)", a: "yes" },
      { q: "Which box has a restriction of 10 letters that we have to bypass?", a: "Name" },
      { q: "What tool do we use to change the 10 letter limit?", a: "DevTools" }
    ]
  },
  {
    title: "4. The Inside Job (DOM XSS)",
    points: 30,
    content: `DOM XSS is a sneaky trick that happens entirely inside the victim's web browser. The server never even sees the spell!

HOW TO DO THE TRICK:

🟢 LOW LEVEL
1. Change security to Low and go to "XSS (DOM)".
2. Look at the URL bar at the top: ?default=English
3. Change it to: ?default=<script>alert(1)</script>
4. The website's code reads the URL and blindly runs our spell!

🟡 MEDIUM & 🔴 HIGH LEVELS
1. You can bypass filters using the hash symbol (#).
2. The browser never sends the hash to the server! Try: ?default=English#<script>alert(1)</script>

🛡️ IMPOSSIBLE LEVEL: innerHTML vs textContent
Why couldn't we hack it on Impossible mode? Let's explain it simply:

Bad Way (innerHTML):
Imagine the website takes your message and feeds it to a robot called 'innerHTML'. This robot is gullible. If your message is "Make a box pop up!", the robot will actually execute the command and make the box pop up. This is dangerous!

Good Way (textContent):
On Impossible mode, the developer fires the gullible robot and hires a smart robot called 'textContent'. When you tell 'textContent' to "Make a box pop up!", it refuses to obey. Instead, it just safely writes the words "Make a box pop up!" on the screen like a painting. It never runs your code!`,
    questions: [
      { q: "Where does DOM XSS happen entirely? (Inside the...)", a: "browser" },
      { q: "What symbol (#) hides our spell from the server?", a: "#" },
      { q: "Which robot is gullible and runs dangerous code? (innerHTML or textContent)", a: "innerHTML" },
      { q: "Which smart robot just paints the message safely on the screen without running it?", a: "textContent" }
    ]
  },
  {
    title: "5. How to Stop the Bad Guys",
    points: 20,
    content: `Now you know how hackers attack. But how do we defend the website?

1. THE BAD DEFENSE (Blacklisting)
Trying to block specific bad words (like "<script>") is like playing whack-a-mole. Hackers will just find new bad words (like "<img onerror=">). It doesn't work!

2. THE GOOD DEFENSE (Translation / Output Encoding)
Whenever someone types a message, run it through a translator like "htmlspecialchars()". This turns dangerous magic spells into harmless, boring text before they hit the screen.

3. THE GOOD ROBOT (Safe DOM APIs)
If you are writing code in JavaScript, always use the safe "textContent" robot instead of the dangerous "innerHTML" robot.

4. THE SHIELD (Content Security Policy)
This is a rule you put on your server that says: "Only run spells that I wrote myself. Never run spells written by visitors."`,
    questions: [
      { q: "Is trying to block bad words (Blacklisting) a good defense? (yes/no)", a: "no" },
      { q: "What defense translates dangerous spells into harmless text? (Output...)", a: "Output Encoding" },
      { q: "What is the name of the rule that blocks spells from visitors? (Content Security...)", a: "Content Security Policy" }
    ]
  }
];
