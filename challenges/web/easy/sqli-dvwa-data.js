const LESSONS = [
  {
    title: "1. What is SQL Injection?",
    points: 20,
    content: `THE DATABASE LIBRARY
Imagine a massive library filled with thousands of books containing details about every user, account, and product on a website. To talk to the librarian, developers use a special programming language called SQL (Structured Query Language). When you log in, the website tells the librarian: "SELECT * FROM users WHERE username = 'alice' AND password = 'secretpassword'." This command tells the librarian to search the shelves, find the user named Alice, check if her password matches, and let her in if it does.

THE SLIPPED NOTE
SQL Injection (SQLi) happens when the website takes something you type in a search box and pastes it directly into the note it hands to the librarian without checking it first. If the note-maker is lazy, an attacker can write librarian commands instead of a username! The librarian reads the note, gets confused, and executes the attacker's commands as if they were official rules. This is one of the oldest and most dangerous security bugs on the internet, allowing hackers to bypass login screens, steal entire tables of user data, modify account balances, or erase the entire library!

THE OR 1=1 TRICK
Let's see how the trick works. The note-maker builds the query by gluing text together: 'SELECT * FROM users WHERE username = ' + input. If the hacker types: "' OR 1=1 #", the note becomes: "SELECT * FROM users WHERE username = '' OR 1=1 #'". The single quote (') closes the search early. The "OR 1=1" is a mathematical statement that is always true. The hashtag (#) tells the librarian to ignore the rest of the text. The librarian reads the note, sees that one always equals one, and hands over every single book in the library!

SETTING UP THE LAB
Let's launch our training playground to see this trick in action! Click the red "Launch DVWA Instance" button and wait for the private Docker tab to open. Log in using Username: "admin" and Password: "password". Scroll to the bottom of the dashboard and click the "Create / Reset Database" button to set up our practice books. Finally, click the "DVWA Security" tab in the left sidebar, select "Low" difficulty, and click Submit to start our practice!`,
    questions: [
      { q: "What is the name of the language used to communicate with databases?", a: "SQL" },
      { q: "What is the default username for our lab?", a: "admin" },
      { q: "What is the default password?", a: "password" }
    ]
  },
  {
    title: "2. The Truth Trick — Low Security",
    points: 30,
    content: `THE LOW-LEVEL HOLE
At Low security, the website takes whatever you type in the User ID box and pastes it directly into the database query with no filter at all. The query looks like: "SELECT first_name, last_name FROM users WHERE user_id = '[INPUT]'". If you type "1", the query finds User 1. But because the input is trusted blindly, we can break out of the quote structure and inject our own database commands to extract all user records in the table.

CASTING THE SPELL
Navigate to the "SQL Injection" page on the left menu. Try typing "1" and click Submit to verify normal behavior. You will see the admin details. Now, type our classic spell in the User ID box: "' OR 1=1 #". Click Submit and watch the screen! The page will dump all 5 users from the database. Let's analyze why: the first apostrophe (') closed the user search, the "OR 1=1" math statement evaluated to true for every single row in the database table, and the hashtag (#) commented out the remaining quotes in the server's code!

OTHER SPELLS TO TRY
There are many variations of this trick. You can type "1' OR '1'='1" to achieve the same logical result using closing quotes. You can also type "1' UNION SELECT user, password FROM users #" which uses the UNION command to combine the normal query results with a second query that dumps the entire password table! If you want to check if the injection is vulnerable without dumping data, you can type "1' AND 1=2 #"; since one never equals two, this always returns zero results, confirming the injection exists.`,
    questions: [
      { q: "What mathematical condition do we inject that is always true?", a: "1=1" },
      { q: "What character (#) turns the rest of the SQL query into a comment?", a: "#" },
      { q: "Did injecting OR 1=1 dump all users from the database? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "3. The Dropdown Bypass — Medium Security",
    points: 30,
    content: `THE DROPDOWN TRAP
Let's increase the security! Go to the DVWA Security tab, change the difficulty level to "Medium", and click Submit. Return to the SQL Injection page. You will notice the text box is gone, replaced by a simple dropdown menu containing numbers. The developer did this thinking: "If the user cannot type, they cannot enter any SQL injection characters!" They also added a function called "mysql_real_escape_string" to add backslashes to any apostrophes to break them.

THE DEVTOOLS REWRITE
This dropdown menu is a "client-side" control, which means the restriction only exists in your browser. The browser sends the selected number to the server when you submit the form. To bypass this, we will use our Browser Developer Tools (F12) to rewrite the HTML code! Right-click on the dropdown menu and select "Inspect" to open the HTML editor. Look for the line: "<option value='1'>1</option>". Double-click "value='1'" and change it to: "value='1 OR 1=1'". Press Enter, select 1 from the menu, and click Submit.

THE BACKSLASH ESCAPE
Why did this injection work even though the developer is filtering apostrophes? Because the database query on Medium security does not put quotes around the number parameter! The query looks like: "WHERE user_id = [INPUT]". Since there are no quotes in the query, we did not need to use an apostrophe (') in our payload "1 OR 1=1" to break out of anything. The filter searched for apostrophes to escape, found none, and sent our payload straight to the database librarian, who executed it and returned all user records!`,
    questions: [
      { q: "What type of selection control replaced the text box in Medium level?", a: "dropdown" },
      { q: "What browser tool did we use to edit the web page code?", a: "DevTools" },
      { q: "Did we need to use an apostrophe (') in the Medium level payload? (yes/no)", a: "no" }
    ]
  },
  {
    title: "4. The Popup Bypass — High Security",
    points: 30,
    content: `THE POPUP BARRIER
Let's increase the security level again! Go to the Security menu, change it to "High", and return to the SQL Injection page. You will see a text link saying "Click here to change your ID." When you click it, a separate browser popup window opens with an input box. The developer did this to separate the input page from the results page, thinking it would break automated hacking scripts that look at page URLs.

THE SECOND-ORDER ATTACK
Even with this separation, the underlying database query still does not use parameterized queries. When you type your input inside the popup box and click submit, the website saves your input in a temporary storage location. Then, the main results page reads that saved input and runs it through the database. This is called a "Second-Order" SQL Injection. Type our classic payload "' OR 1=1 #" in the popup input, click submit, close the window, and refresh the main page. The injection fires on the results page and displays all users!`,
    questions: [
      { q: "Did the High level move the input to a separate popup window? (yes/no)", a: "yes" },
      { q: "What is it called when input is submitted in one place but the injection fires in another?", a: "Second-Order" },
      { q: "Did our classic ' OR 1=1 # payload still work on High? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "5. The Unbreakable Defense — Impossible Level",
    points: 30,
    content: `THE PREPARED BLUEPRINT
Let's look at the only defense that stops every SQL Injection attack permanently. Go to the Security menu, set it to "Impossible", and click Submit. Try any of your SQL injection tricks now, and they will all fail! The server loads instantly and returns zero results. This is because the developers rewrote the database query using a technique called "Prepared Statements," also known as Parameterized Queries.

THE PLACEHOLDER METHOD
With Prepared Statements, the developer sends the query structure to the database first, using placeholders: "SELECT first_name, last_name FROM users WHERE user_id = ?". The database parses this structure and knows that the "?" placeholder can only ever represent a literal value, not database commands. When the user sends their input, like "' OR 1=1 #", the database treats it as a search for a user whose ID name is literally that text. Since no user has that name, it returns nothing, rendering all SQL injection attacks completely useless!`,
    questions: [
      { q: "What is the name of the correct defense that permanently prevents SQL Injection?", a: "Prepared Statements" },
      { q: "With Parameterized Queries, does the database treat user input as SQL code? (yes/no)", a: "no" },
      { q: "Is the database completely safe from SQL Injection at Impossible level? (yes/no)", a: "yes" }
    ]
  }
];
