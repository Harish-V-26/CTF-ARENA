const LESSONS = [
  {
    title: "1. Open the Magic Box",
    points: 20,
    content: "Welcome to your first real hacking lab! \n\n1. Click the red 'Launch DVWA Instance' button. This is like turning on a tiny, private computer just for you.\n2. When the new tab opens, it asks for a name and password. Type Username: admin and Password: password.\n3. Scroll down and click 'Create / Reset Database'. This sets up the game for us to play!\n\nOnce you are in, answer the questions below.",
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
    content: "Time for your first trick! Go to 'SQL Injection' on the left menu. \n\nImagine the website is asking a database guard: 'Is this user allowed in?'. We are going to trick the guard by saying: 'My name is nothing, OR 1 equals 1!'. Since 1 always equals 1, the guard gets confused and says 'Yes, come in!'.\n\nTry typing this exact magic spell into the box: `' OR 1=1 #`",
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
    content: "Let's try another trick. Go to the 'Command Injection' tab.\n\nThis page lets you 'ping' an IP address. But we can sneak in a hidden command! If we type a semicolon `;`, we can tell the computer: 'Ping this IP, AND THEN do my secret command!'\n\nTry typing: `127.0.0.1; whoami`",
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
    content: "Now let's see why hacking doesn't always work. \n\nGo to the 'DVWA Security' tab on the left menu. Change the difficulty from 'Low' to 'Impossible' and click Submit.\n\nNow go back to 'Command Injection' and try our sneaky spell again: `127.0.0.1; whoami`.\n\nWhat happened? The website is acting like a strict bouncer. It checks exactly what you typed and says: 'Hey, semicolons are not allowed here!' This is called Input Validation.",
    questions: [
      { q: "Did our sneaky command work on Impossible mode? (yes/no)", a: "no" },
      { q: "What error message does it show when you try? (An invalid...)", a: "IP address" },
      { q: "What is the name of the strict bouncer technique that stops bad characters? (Input...)", a: "Input Validation" },
      { q: "When you close this tab, does our system clean up your private box for you? (yes/no)", a: "yes" },
      { q: "Are you ready to become a cyber superhero? (yes/no)", a: "yes" }
    ]
  }
];
