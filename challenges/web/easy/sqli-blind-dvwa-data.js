const LESSONS = [
  {
    title: "1. What is Blind SQLi?",
    points: 20,
    content: `Welcome to the Blind SQL Injection Lab! 

WHAT IS BLIND SQL INJECTION?
Imagine you are asking the database guard a question, but the guard has tape over their mouth! They can't speak or show you the data. 

How do we get answers? We play "20 Questions". We ask yes/no questions, and watch how the guard reacts. Or, we tell the guard: "If the answer is YES, go to sleep for 5 seconds!" 

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
    content: `Let's use the Time trick!

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
    content: `Just like normal SQLi, the input box is gone!

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
    content: `The High level completely removes the dropdown menu! How do we send our spell?

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
    content: `Why did the sleeping spell fail on Impossible mode?

1. Change security to Impossible. Try our tricks again. They fail!

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
