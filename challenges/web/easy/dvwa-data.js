const LESSONS = [
  {
    title: "1. Open the Magic Box",
    points: 20,
    content: `THE CYBER PLAYGROUND
Welcome to your first real hands-on hacking lab! Today, we are going to explore a special website called the "Damn Vulnerable Web App," or DVWA for short. This website is special because it was created on purpose with dozens of security holes, bugs, and weaknesses built right into it. It acts like a safe cyber playground where hackers and security students can practice their skills without getting in trouble or breaking real internet servers.

SPINNING UP THE BOX
To begin, click the red "Launch DVWA Instance" button at the top of the page. This tells our server to boot up a tiny, private virtual computer just for you, which runs inside a secure Docker container. When the new tab opens, the site will ask for a name and password. Type the default credentials: Username: "admin" and Password: "password". Once you log in, scroll all the way to the bottom of the page and click the "Create / Reset Database" button. This sets up the game board so we can start playing!`,
    questions: [
      { q: "What is the secret username to log in?", a: "admin" },
      { q: "What is the secret password to log in?", a: "password" },
      { q: "Is this lab running inside your own tiny, private box? (yes/no)", a: "yes" },
      { q: "Which button do you click to set up the game after logging in?", a: "Create / Reset Database" },
      { q: "What does DVWA stand for? (Hint: Damn Vulnerable...)", a: "Damn Vulnerable Web App" }
    ]
  },
  {
    title: "2. The SQL Magic Trick",
    points: 60,
    content: `THE DATABASE GUARD
Now that you are logged in, let's perform your very first SQL Injection trick! Look at the menu on the left side of the screen and click on "SQL Injection." This page has a search box that asks for a User ID. When you type a number and click submit, the website runs to a database guard and asks: "Do you have a user with this number on your list?" The guard checks, finds the user, and prints their name on the screen.

TRICKING THE GUARD
We are going to trick the database guard by typing a special code that forces it to show us EVERY single user in the system! Type this exact magic spell into the box: "' OR 1=1 #". Let's see how this works. The single quote (') tells the database to close the current name query. The "OR 1=1" is a math trick; because one always equals one, this statement is always true. The hashtag (#) tells the database to ignore the rest of the guard's rules. The guard gets confused, checks the math, says "Well, 1 equals 1, so everyone is allowed!", and dumps all 5 users on the screen!`,
    questions: [
      { q: "What tiny character is used to start our magic trick? (It looks like a floating comma)", a: "'" },
      { q: "What symbol do we use to ignore the rest of the guard's rules? (It looks like a hashtag)", a: "#" },
      { q: "When you cast the `' OR 1=1 #` spell, how many users magically appear on the screen?", a: "5" },
      { q: "Who is the first user on the list?", a: "admin" },
      { q: "Did the website get confused because 1 always equals 1? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "3. The Hidden Command Spell",
    points: 60,
    content: `THE PING BOX
Let's try another cool trick. Click on the "Command Injection" tab on the left menu. This page has a text box that lets you ping an IP address. When you type an IP (like "127.0.0.1") and click submit, the website runs a script that calls the server's command-line terminal and runs the command "ping 127.0.0.1". It prints the results on the screen to show you if the target computer is active.

SNEAKING THE COMMANDS
We can use a special punctuation mark to sneak our own secret commands into the terminal! In computer terminal language, a semicolon (;) means "Stop what you are doing, take a breath, and instantly run this next command." Type this exact spell into the box: "127.0.0.1; whoami". The server will ping the address, see the semicolon, and then execute the "whoami" command. It will print out "www-data", which is the name of the system user running the web server. You just hacked into the server's control room!`,
    questions: [
      { q: "What character do we use to sneak in our second hidden command? (It looks like a dot over a comma)", a: ";" },
      { q: "When you type `127.0.0.1; whoami`, what is the name of the user the computer says you are?", a: "www-data" },
      { q: "Now try `127.0.0.1; ls`. This means 'list all files'. What file ends in .php?", a: "index.php" },
      { q: "Now try `127.0.0.1; cat /etc/passwd`. Did it show you a long, scary list of users? (yes/no)", a: "yes" },
      { q: "Are you officially hacking the computer? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "4. The Impossible Level",
    points: 60,
    content: `THE STRICT BOUNCER
Hacking is fun, but now let's learn how programmers defend their systems. Go to the "DVWA Security" tab on the left menu. Change the security level from "Low" to "Impossible" and click the Submit button. Now, go back to the "Command Injection" tab and try your sneaky spell again: "127.0.0.1; whoami". What happened? The server refused to run your command and printed an error instead!

INPUT VALIDATION DEFENSE
On Impossible mode, the website uses a strict bouncer technique called "Input Validation." Before sending your input to the server's terminal, it reads every character. The bouncer sees the semicolon, shakes its head, and says: "Hey, semicolons are not allowed here! I only accept numbers and periods." It throws your input in the trash. This simple check completely stops command injection, showing how programmers can easily defend their websites by verifying everything users type!`,
    questions: [
      { q: "Did our sneaky command work on Impossible mode? (yes/no)", a: "no" },
      { q: "What error message does it show when you try? (An invalid...)", a: "IP address" },
      { q: "What is the name of the strict bouncer technique that stops bad characters? (Input...)", a: "Input Validation" },
      { q: "When you close this tab, does our system clean up your private box for you? (yes/no)", a: "yes" },
      { q: "Are you ready to become a cyber superhero? (yes/no)", a: "yes" }
    ]
  }
];
