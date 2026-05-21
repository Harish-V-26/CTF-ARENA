const LESSONS = [
  {
    title: "1. What is Blind SQLi?",
    points: 20,
    content: `THE SILENT GUARD
Imagine you are trying to find out what treasures are kept inside a locked room by asking the castle guard. In a normal SQL Injection attack, the guard is very talkative and dumps the items on a table for you. But in a "Blind SQL Injection" attack, the guard has tape over their mouth! They cannot speak or show you the data. However, they can still hear you, and they can nod their head "yes" or shake it "no". To steal the information, you have to play a game of "20 Questions," asking clever yes-or-no questions to figure out the secrets one letter at a time!

THE TIME SPELL
How do we get a computer to nod yes or shake no when it doesn't print any answers? We use a "Time Delay" spell! We tell the database guard: "Check if the first letter of the administrator's password is 'A'. If it is 'A', go to sleep and take a nap for exactly 5 seconds before answering me. If it is NOT 'A', answer me immediately." When we send the query, we look at our watch. If the page freezes and takes 5 seconds to load, we know the answer was YES! If it loads instantly, we know the answer was NO. By repeating this test for every letter, we can extract the complete password.

SETTING UP THE LAB
Let's launch the playground and prepare our environment. Click the red "Launch DVWA Instance" button above and wait for your container to load in a new tab. Log in using the default credentials: Username: "admin" and Password: "password". Scroll down, click the "Create / Reset Database" button to set up the practice tables, and then click the "DVWA Security" tab on the left menu. Change the security level to "Low" and click Submit so we can practice our first time-delay spell!`,
    questions: [
      { q: "Can the guard (database) speak and show you the data directly in a Blind attack? (yes/no)", a: "no" },
      { q: "What game is Blind SQLi similar to? (20...)", a: "20 Questions" },
      { q: "What trick can we use to see if the answer is YES? (Make the guard go to...)", a: "sleep" }
    ]
  },
  {
    title: "2. The Sleeping Guard (Low Level)",
    points: 30,
    content: `CASTING THE SLEEP SPELL
Now that the laboratory is ready, click on "SQL Injection (Blind)" in the left side menu. You will see a text box asking for a User ID. If you type "1", the page simply replies "User ID exists". It does not print any usernames or details. To test if the input is vulnerable to SQL injection, we will cast our sleeping spell by typing: "1' AND SLEEP(5) #".

THE MATH BEHIND THE NAP
Let's see why this works! The single quote (') closes the query string, and the hashtag (#) comments out the rest of the server's rules. The query becomes: "Check if User 1 exists, AND run the sleep command for 5 seconds." Since User 1 does exist, the database runs the SLEEP(5) instruction. The website will freeze and the loading wheel will spin for exactly 5 seconds before returning the "User ID exists" message. If the database was not vulnerable, it would ignore our sleep command and load instantly. This freeze proves the database is listening to our commands!`,
    questions: [
      { q: "What word do we use to make the database freeze? (Hint: SLEEP)", a: "SLEEP" },
      { q: "How many seconds did we tell the guard to sleep?", a: "5" },
      { q: "Did the website take a long time to load? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "3. The Hidden Dropdown (Medium Level)",
    points: 30,
    content: `THE DROPDOWN BARRIER
Let's step up the security! Go to the DVWA Security menu, change the difficulty to "Medium", and click Submit. Navigate back to "SQL Injection (Blind)". You will notice the free-text input box is gone, replaced by a simple dropdown menu. The programmer thinks that because you can only click the numbers 1 through 5, you cannot inject any SQL commands. But as we learned, this dropdown restriction only exists in your browser!

THE DEVTOOLS BYPASS
To bypass this barrier, we will use our Browser Developer Tools (F12) to rewrite the dropdown menu options. Right-click the dropdown menu and select "Inspect" to open the HTML tree. Look for the code: "<option value='1'>1</option>". Double-click the "value='1'" attribute and change it to: "value='1 AND SLEEP(5)'". Press Enter to save your changes, select the number 1 in the dropdown, and click Submit. Watch the browser tab! It will freeze and spin for 5 seconds, proving the injection still works on Medium!`,
    questions: [
      { q: "What tool did we use to change the dropdown menu code?", a: "DevTools" },
      { q: "Did the website freeze for 5 seconds again? (yes/no)", a: "yes" },
      { q: "Does Blind SQLi still work on the Medium level? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "4. The Poisoned Cookie (High Level)",
    points: 30,
    content: `THE COOKIE HIDING PLACE
Let's increase the security again! Change the difficulty to "High" and return to the blind injection page. The dropdown menu is completely gone! The webpage doesn't even show a form. Instead, the page reads your User ID from a secret tracking file called a "Cookie" stored inside your browser. Because the input parameter is not in the URL or on the page, the developers think it is completely safe from hacking.

POISONING THE VAULT
We can use our Developer Tools to open the browser's cookie storage and edit the cookie value directly! Open DevTools (F12), click the "Application" or "Storage" tab, expand "Cookies" on the left, and click the domain. You will see a cookie named "id" with a value of "1". Double-click that value and type our sleep spell: "1' AND SLEEP(5) #". Now, refresh the page by pressing F5. The page will take 5 seconds to reload, proving that even cookies can be poisoned to hack a database!`,
    questions: [
      { q: "Where was the vulnerable parameter hiding this time?", a: "Cookie" },
      { q: "Which tab in DevTools lets you see and change Cookies?", a: "Application" },
      { q: "Did the page take 5 seconds to reload after poisoning the cookie? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "5. The Strict Bouncer (Impossible Level)",
    points: 30,
    content: `THE UNBREAKABLE DEFENSE
Let's see how developers build a perfect defense. Change the security difficulty to "Impossible" and try running your sleep spells again. They will all fail completely! The server loads instantly, ignoring our commands. The developers fixed the code by using "Prepared Statements," which is the gold standard for database defense.

THE DATA PLACEHOLDER
With Prepared Statements, the server sends the query blueprint to the database first: "Search for a user with ID equal to this placeholder (?)". The database compiles the SQL logic structure beforehand. When we submit our spell "1' AND SLEEP(5) #", the database reads it as a literal search term rather than computer instructions. It looks for a user whose ID name is literally the string "1-quote-AND-SLEEP...". Since no user has that name, it returns zero results instantly without running the sleep command, keeping the database perfectly safe!`,
    questions: [
      { q: "What is the best defense against Blind SQL Injection?", a: "Prepared Statements" },
      { q: "Did the SLEEP command work on Impossible mode? (yes/no)", a: "no" },
      { q: "Are Prepared Statements the superhero of database security? (yes/no)", a: "yes" }
    ]
  }
];
