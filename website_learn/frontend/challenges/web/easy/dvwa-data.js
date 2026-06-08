const LESSONS = [
  {
    title: "1. Open the Magic Box",
    points: 20,
    html: `<h3>Your Very Own Hacker Playground</h3>
      <p>Welcome to your first real hacking lab! Have you ever wanted to take apart a remote control car just to see how the motor works inside, but you were worried you might break it? Cybersecurity is a lot like that! To learn how hackers break into websites, you have to actually practice breaking into websites yourself. But doing that to a real website on the internet is very illegal and could get you in huge trouble.</p>
      <p>So, cybersecurity teachers built a special, broken toy website called DVWA (Damn Vulnerable Web App). It is a website that is intentionally built with terrible security, full of secret doors and broken locks, just waiting for you to find them! Because it runs in its own safe, private bubble on your computer, you can smash it, break it, and hack it as much as you want without hurting anyone. It is your very own safe hacker playground!</p>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Launch the Instance</strong><br>Click the red <strong>Launch DVWA Instance</strong> button. This is like turning on a tiny, private computer just for you.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Log In</strong><br>When the new tab opens, it asks for a name and password. Type Username: <code>admin</code> and Password: <code>password</code>.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Setup Database</strong><br>Scroll down and click <strong>Create / Reset Database</strong>. This sets up the game for us to play!</div>
      </div>`,
    questions: [
      { q: "What is the secret username to log in?", a: "admin", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the secret password to log in?", a: "password", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Is this lab running inside your own tiny, private box? (yes/no)", a: "yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Which button do you click to set up the game after logging in?", a: "Create / Reset Database", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What does DVWA stand for? (Hint: Damn Vulnerable...)", a: "Damn Vulnerable Web App", hint: "Review the definitions and acronyms section." }
    ]
  },
  {
    title: "2. The SQL Magic Trick",
    points: 60,
    html: `<h3>The Database Magic Trick</h3>
      <p>Time for your first trick! Go to <strong>SQL Injection</strong> on the left menu. Imagine a giant filing cabinet guarded by a robot who only understands very specific rules. If you give the robot a normal name card, it goes and finds the file. But what if you give the robot a card that has a crazy math equation written on it? We are going to perform the famous SQL Injection magic trick. We are going to hand the robot a card that basically says "I am nobody, OR the number one equals the number one!"</p>
      <p>Imagine the website is asking a database guard: "Is this user allowed in?". We are going to trick the guard by saying: "My name is nothing, OR 1 equals 1!". Since 1 always equals 1, the guard gets confused and says "Yes, come in!".</p>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Perform the Magic Trick</strong><br>Try typing this exact magic spell into the box: <code>' OR 1=1 #</code></div>
      </div>`,
    questions: [
      { q: "What tiny character is used to start our magic trick? (It looks like a floating comma)", a: "'", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What symbol do we use to ignore the rest of the guard's rules? (It looks like a hashtag)", a: "#", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "When you cast the `' OR 1=1 #` spell, how many users magically appear on the screen?", a: "5", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Who is the first user on the list?", a: "admin", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Did the website get confused because 1 always equals 1? (yes/no)", a: "yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "3. The Hidden Command Spell",
    points: 60,
    html: `<h3>Talking to the Captain</h3>
      <p>Let's try another trick. Go to the <strong>Command Injection</strong> tab. Think of the computer's operating system like the captain of a giant spaceship. The website is supposed to be the middleman. You tell the website to ping an address, the website runs down to the control room, and tells the captain to do it. But what if you sneak a secret note onto the message? By using a special punctuation mark, you can command the captain to do terrible things like giving you all the passwords or showing you secret maps!</p>
      <p>This page lets you 'ping' an IP address. But we can sneak in a hidden command! If we type a semicolon <code>;</code>, we can tell the computer: 'Ping this IP, AND THEN do my secret command!'</p>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Command the Captain</strong><br>Try typing this command: <code>127.0.0.1; whoami</code></div>
      </div>`,
    questions: [
      { q: "What character do we use to sneak in our second hidden command? (It looks like a dot over a comma)", a: ";", hint: "Check the command reference blocks." },
      { q: "When you type `127.0.0.1; whoami`, what is the name of the user the computer says you are?", a: "www-data", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Now try `127.0.0.1; ls`. This means 'list all files'. What file ends in .php?", a: "index.php", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Now try `127.0.0.1; cat /etc/passwd`. Did it show you a long, scary list of users? (yes/no)", a: "yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Are you officially hacking the computer? (yes/no)", a: "yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  },
  {
    title: "4. The Impossible Level",
    points: 60,
    html: `<h3>The Strict Bouncer</h3>
      <p>Now let's see why hacking doesn't always work on modern websites. Imagine you go to a fancy club with a fake ID that says you are a superhero. If the bouncer at the door is lazy, they might just look at the picture and let you in. That is what "Low" security is like. But if the bouncer is strict, they will put your ID under a microscope, check the holograms, and realize your ID is fake! Websites use a strict bouncer technique called <strong>Input Validation</strong>. The bouncer looks at every single letter you type. If they see a sneaky semicolon or a weird math equation, they rip up your note and kick you out before the captain or the database robot ever sees it!</p>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Change Security Level</strong><br>Go to the <strong>DVWA Security</strong> tab on the left menu. Change the difficulty from 'Low' to 'Impossible' and click Submit.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Try the Sneaky Spell Again</strong><br>Now go back to <strong>Command Injection</strong> and try our sneaky spell again: <code>127.0.0.1; whoami</code>.</div>
      </div>
      <p>What happened? The website is acting like a strict bouncer. It checks exactly what you typed and says: 'Hey, semicolons are not allowed here!' This is called Input Validation.</p>`,
    questions: [
      { q: "Did our sneaky command work on Impossible mode? (yes/no)", a: "no", hint: "Check the command reference blocks." },
      { q: "What error message does it show when you try? (An invalid...)", a: "IP address", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What is the name of the strict bouncer technique that stops bad characters? (Input...)", a: "Input Validation", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "When you close this tab, does our system clean up your private box for you? (yes/no)", a: "yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Are you ready to become a cyber superhero? (yes/no)", a: "yes", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  }
];
