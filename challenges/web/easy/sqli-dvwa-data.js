const LESSONS = [
  {
    title: "1. What is SQL Injection?",
    points: 20,
    content: `Welcome to the SQL Injection Lab! 

WHAT IS SQL INJECTION?
Imagine a website is asking a database guard: "Is this user allowed in?"
The guard speaks a special language called "SQL".

If we type a normal name like "Alice", the guard checks for Alice.
But what if we type a secret spell in SQL language? We can confuse the guard into giving us ALL the secrets! 

STEP 1: Start the Lab
Click "Launch DVWA Instance". Wait for your tiny private computer to start.

STEP 2: Log In
Username: admin
Password: password

STEP 3: Setup the Game
Scroll down and click "Create / Reset Database".

STEP 4: Security Level
Go to "DVWA Security" on the left menu. Make sure it is set to "Low" and click "Submit".`,
    questions: [
      { q: "What is the default username for our lab?", a: "admin" },
      { q: "What is the default password?", a: "password" },
      { q: "What language does the database guard speak?", a: "SQL" }
    ]
  },
  {
    title: "2. The Truth Trick (Low Level)",
    points: 30,
    content: `Let's cast our first SQL spell!

HOW TO DO THE TRICK:

1. Go to "SQL Injection" on the left menu.
2. The website asks for a User ID. If you type 1, it shows admin.
3. Now type our secret spell: \`' OR 1=1 #\`

Why does this work?
- The \`'\` symbol breaks us out of the normal name box.
- \`OR 1=1\` is a math trick. 1 always equals 1! So the guard thinks "Oh, this is always TRUE!"
- The \`#\` symbol is like saying "Shhh! Ignore the rest of the rules!"

Because 1=1 is true, the guard gets confused and dumps EVERY user from the database onto the screen!`,
    questions: [
      { q: "What math trick do we use to make the guard think everything is TRUE?", a: "1=1" },
      { q: "What symbol (#) tells the guard to ignore the rest of the rules?", a: "#" },
      { q: "Did the guard dump all the users on the screen? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "3. The Hidden Dropdown (Medium Level)",
    points: 30,
    content: `Now the bouncer is slightly smarter. 

HOW TO DO THE TRICK:

1. Go to "DVWA Security" and change it to Medium.
2. Go back to "SQL Injection".
3. Oh no! There is no text box anymore! It's a dropdown menu. You can't type the spell!
4. But we are hackers. We can change the web page itself using DevTools!

THE HACK:
1. Right-click the dropdown menu and click "Inspect" (or open DevTools).
2. Look at the code. You will see something like \`<option value="1">1</option>\`.
3. Double-click the \`value="1"\` part.
4. Change it to our spell: \`value="1 OR 1=1"\` (No quotes needed this time!)
5. Press Enter. Now select the "1" from the dropdown and click Submit.

Boom! You hacked the dropdown!`,
    questions: [
      { q: "What kind of menu replaced the text box in the Medium level?", a: "dropdown" },
      { q: "What tool did we use to change the website code? (Dev...)", a: "DevTools" },
      { q: "Did we need to use the quote (') symbol for this spell? (yes/no)", a: "no" }
    ]
  },
  {
    title: "4. The Secret Input (High Level)",
    points: 30,
    content: `The High level tries to trick us by moving the input box somewhere else.

HOW TO DO THE TRICK:

1. Change security to High. Go to "SQL Injection".
2. Click "here to change your ID". A small popup appears!
3. This is called a "Second-Order" attack. We put the spell in one place (the popup), and it explodes in another place (the main page)!
4. Type our classic spell in the popup: \`' OR 1=1 #\`
5. Click Submit, then close the popup.
6. Look at the main page. The spell worked!`,
    questions: [
      { q: "Did the High level move the input box into a popup? (yes/no)", a: "yes" },
      { q: "What is it called when the spell is put in one place but explodes in another? (Second-...)", a: "Second-Order" },
      { q: "Did our classic spell still work? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "5. The Strict Bouncer (Impossible Level)",
    points: 30,
    content: `Why did it fail on Impossible mode?

1. Change security to Impossible. Try our tricks again. They all fail!

THE DEFENSE (Prepared Statements):
Imagine the website fired the old, easily-confused guard and hired a strict robot named "Prepared Statement".

When you give the robot your spell: \`' OR 1=1 #\`
The robot doesn't try to read it as SQL language. It puts your spell in a heavy steel box. 

It tells the database: "Go find a user whose name is literally the exact characters Quote-O-R-Space-1-Equals-1-Hashtag".
Since no one has that crazy name, it safely returns nothing. The magic is completely broken!`,
    questions: [
      { q: "What is the name of the strict robot defense? (Prepared...)", a: "Prepared Statements" },
      { q: "Does the robot let your spell run as SQL code? (yes/no)", a: "no" },
      { q: "Is the database safe from SQL Injection now? (yes/no)", a: "yes" }
    ]
  }
];
