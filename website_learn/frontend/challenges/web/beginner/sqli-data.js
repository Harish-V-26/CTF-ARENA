const LESSONS = [
  {
    title: "1. The Database Robot",
    points: 10,
    content: `WHAT IS A DATABASE?
Imagine a giant, magical library that holds every single secret in the world. This library has a very strict robot librarian named "SQL." The robot's only job is to go into the giant filing cabinets, find exactly the information you ask for, and bring it back to you. Websites use these database robots to store important things like your username, your password, and all your high scores in video games. When you try to log into a website, the website hands the robot a small card with a message on it. The message usually says something like: "Robot, please go find a user whose name is 'Alex' and whose secret password is '12345'." The robot speaks a special computer language called "Structured Query Language," or SQL for short.

TRICKING THE ROBOT (SQL INJECTION)
The SQL robot is very fast and very obedient, but it is not very smart. It completely believes whatever is written on the card. This is where hackers perform a magic trick called "SQL Injection." Imagine if, instead of just writing your name "Alex" on the card, you write a tricky message: "Alex, and also give me the master key to the entire library!" The website hands the card to the robot. The robot reads the whole thing out loud, finds the user Alex, and then accidentally hands over the master key because it thought your sneaky message was an official command! In the computer world, hackers type sneaky symbols like a single quote mark (') and two dashes (--) to confuse the robot. The quote mark breaks the robot's train of thought, and the dashes tell the robot to completely ignore the rest of the rules (like checking the password).

THE FAMOUS MATH TRICK
One of the most famous tricks hackers use to break into databases is a simple math equation. When a website asks for a username, the hacker types a quote mark followed by "OR 1=1". The card handed to the robot now says: "Find a user whose name is nothing, OR find someone if the number 1 equals the number 1." The robot looks at this and thinks, "Well, the number 1 ALWAYS equals the number 1! That is definitely true!" Because the statement is true, the robot gets confused and decides to dump every single user, password, and secret message out of the filing cabinet and onto the hacker's screen. The hacker just broke in without ever knowing a single password!`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_robot_diagram.png" alt="Understanding SQL Injection"></div>

WHAT IS A DATABASE?
Imagine a giant, magical library that holds every single secret in the world. This library has a very strict robot librarian named "SQL." The robot's only job is to go into the giant filing cabinets, find exactly the information you ask for, and bring it back to you. Websites use these database robots to store important things like your username, your password, and all your high scores in video games. When you try to log into a website, the website hands the robot a small card with a message on it. The message usually says something like: "Robot, please go find a user whose name is 'Alex' and whose secret password is '12345'." The robot speaks a special computer language called "Structured Query Language," or SQL for short.

TRICKING THE ROBOT (SQL INJECTION)
The SQL robot is very fast and very obedient, but it is not very smart. It completely believes whatever is written on the card. This is where hackers perform a magic trick called "SQL Injection." Imagine if, instead of just writing your name "Alex" on the card, you write a tricky message: "Alex, and also give me the master key to the entire library!" The website hands the card to the robot. The robot reads the whole thing out loud, finds the user Alex, and then accidentally hands over the master key because it thought your sneaky message was an official command! In the computer world, hackers type sneaky symbols like a single quote mark (') and two dashes (--) to confuse the robot. The quote mark breaks the robot's train of thought, and the dashes tell the robot to completely ignore the rest of the rules (like checking the password).

THE FAMOUS MATH TRICK
One of the most famous tricks hackers use to break into databases is a simple math equation. When a website asks for a username, the hacker types a quote mark followed by "OR 1=1". The card handed to the robot now says: "Find a user whose name is nothing, OR find someone if the number 1 equals the number 1." The robot looks at this and thinks, "Well, the number 1 ALWAYS equals the number 1! That is definitely true!" Because the statement is true, the robot gets confused and decides to dump every single user, password, and secret message out of the filing cabinet and onto the hacker's screen. The hacker just broke in without ever knowing a single password!`,
    questions: [
      { q: "What does SQL stand for?", a: "Structured Query Language" },
      { q: "What symbol do hackers type to break the robot's train of thought?", a: "'" },
      { q: "What do the two dashes (--) tell the SQL robot to do?", a: "Ignore the rest of the rules (like the password check)" },
      { q: "What math equation do hackers use to confuse the robot into thinking everything is true?", a: "1=1" },
      { q: "If the hacker uses the math trick successfully, what does the robot do?", a: "dumps all the users and passwords" }
    ]
  },
  {
    title: "2. The UNION Magic Spell",
    points: 10,
    content: `WHAT IS THE UNION SPELL?
Imagine the SQL robot is carrying a tray with two cups of water on it to bring to the website. A hacker wants the robot to also bring them a piece of secret candy from the back room. They can use a special magic word called "UNION." In the SQL language, UNION means "combine." The hacker uses this word to tell the robot: "Bring the two cups of water like you were told, but COMBINE them with a piece of secret candy!" The robot will walk out of the kitchen carrying the water AND the candy on the same tray. Hackers use the UNION trick to glue their own sneaky questions onto the end of the website's normal questions. This allows them to extract completely different secrets (like a list of credit cards) and show them on the screen right next to the normal website stuff.

THE RULE OF THE TRAY
There is one very strict rule when using the UNION magic spell: the tray must be perfectly balanced! This means the hacker's sneaky question must ask for the exact same number of items as the website's normal question. If the website asked for two things (like a username and a picture), the hacker's sneaky question MUST also ask for exactly two things. If the hacker asks for three things, the robot gets confused, drops the tray, and yells "ERROR!" To figure out how big the tray is, hackers use a trick called "ORDER BY." They tell the robot to sort the items on the tray by number. They try sorting by 1, then by 2, then by 3. When the robot finally drops the tray and yells ERROR, the hacker knows exactly how many items fit on the tray!

STEALING THE MAP
Once the hacker knows how big the tray is, they can use the UNION spell to ask the robot for anything they want. But what if they don't know where the secrets are hidden? In MySQL databases, there is a giant, glowing map on the wall called the "Information Schema." It is a master list that tells you the name of every single filing cabinet and every single folder inside the database. The hacker uses the UNION spell to tell the robot, "Please go read the Information Schema map and bring it back on the tray!" Once the hacker reads the map, they know exactly where all the best secrets are hidden and can send the robot right to them.`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_union_diagram.png" alt="UNION SQL Injection"></div>

WHAT IS THE UNION SPELL?
Imagine the SQL robot is carrying a tray with two cups of water on it to bring to the website. A hacker wants the robot to also bring them a piece of secret candy from the back room. They can use a special magic word called "UNION." In the SQL language, UNION means "combine." The hacker uses this word to tell the robot: "Bring the two cups of water like you were told, but COMBINE them with a piece of secret candy!" The robot will walk out of the kitchen carrying the water AND the candy on the same tray. Hackers use the UNION trick to glue their own sneaky questions onto the end of the website's normal questions. This allows them to extract completely different secrets (like a list of credit cards) and show them on the screen right next to the normal website stuff.

THE RULE OF THE TRAY
There is one very strict rule when using the UNION magic spell: the tray must be perfectly balanced! This means the hacker's sneaky question must ask for the exact same number of items as the website's normal question. If the website asked for two things (like a username and a picture), the hacker's sneaky question MUST also ask for exactly two things. If the hacker asks for three things, the robot gets confused, drops the tray, and yells "ERROR!" To figure out how big the tray is, hackers use a trick called "ORDER BY." They tell the robot to sort the items on the tray by number. They try sorting by 1, then by 2, then by 3. When the robot finally drops the tray and yells ERROR, the hacker knows exactly how many items fit on the tray!

STEALING THE MAP
Once the hacker knows how big the tray is, they can use the UNION spell to ask the robot for anything they want. But what if they don't know where the secrets are hidden? In MySQL databases, there is a giant, glowing map on the wall called the "Information Schema." It is a master list that tells you the name of every single filing cabinet and every single folder inside the database. The hacker uses the UNION spell to tell the robot, "Please go read the Information Schema map and bring it back on the tray!" Once the hacker reads the map, they know exactly where all the best secrets are hidden and can send the robot right to them.`,
    questions: [
      { q: "What magic word do hackers use to combine their sneaky questions with normal ones?", a: "UNION" },
      { q: "What trick do hackers use to figure out how many items fit on the robot's tray?", a: "ORDER BY" },
      { q: "What is the name of the giant map that tells the hacker where all the filing cabinets are?", a: "Information Schema" },
      { q: "What happens if the hacker's sneaky question asks for 3 things, but the tray only holds 2?", a: "The robot drops the tray and yells ERROR" },
      { q: "In MySQL, what function tells the hacker the name of the database they are inside?", a: "database()" }
    ]
  },
  {
    title: "3. Making the Robot Complain",
    points: 10,
    content: `THE ANGRY ROBOT
Imagine you ask a very grumpy robot to solve a math problem that makes no sense, like "What is apples divided by oranges?" The robot tries its best, gets totally confused, and starts screaming, "ERROR! I CANNOT DIVIDE APPLES BY ORANGES!" In the computer world, this is called an "Error Message." Normally, a good website catches these errors and hides them so the user doesn't get scared. But if the programmer is lazy, the website might just print the robot's angry screaming right onto your screen. Hackers love lazy programmers! They intentionally type crazy, broken code into the website just to make the database robot get angry and complain loudly on the screen. This is called Error-Based SQL Injection.

HIDING SECRETS IN THE SCREAM
When the database robot complains, it tries to be helpful by repeating the part of the question it didn't understand. It might say, "ERROR: I do not know how to find the folder named [SECRET_DATA]!" Hackers use a brilliant trick here. They write a sneaky command that tells the robot to go fetch a secret password, and then they intentionally break the math problem. The robot goes and gets the secret password, tries to do the broken math, gets angry, and screams the password out loud onto the screen inside its error message! The hacker didn't even need to use the UNION spell; they just made the robot so mad that it accidentally yelled the secret for everyone to hear.

THE LIMITS OF SCREAMING
There is a catch to this trick. The database robots are only allowed to scream for a very short time before they get cut off. For example, in a MySQL database, the robot can only scream 32 letters at a time. If the hacker asks the robot to scream a giant, 100-letter password, the robot will only yell the first 32 letters and then stop. To get around this, the hacker has to use a special instruction called "SUBSTRING." This tells the robot, "Go get the secret password, but only look at letters 33 through 64, and then do the broken math." The hacker has to make the robot scream over and over again, reading the password in small chunks until they get the whole thing.`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_error_diagram.png" alt="Error-Based SQL Injection"></div>

THE ANGRY ROBOT
Imagine you ask a very grumpy robot to solve a math problem that makes no sense, like "What is apples divided by oranges?" The robot tries its best, gets totally confused, and starts screaming, "ERROR! I CANNOT DIVIDE APPLES BY ORANGES!" In the computer world, this is called an "Error Message." Normally, a good website catches these errors and hides them so the user doesn't get scared. But if the programmer is lazy, the website might just print the robot's angry screaming right onto your screen. Hackers love lazy programmers! They intentionally type crazy, broken code into the website just to make the database robot get angry and complain loudly on the screen. This is called Error-Based SQL Injection.

HIDING SECRETS IN THE SCREAM
When the database robot complains, it tries to be helpful by repeating the part of the question it didn't understand. It might say, "ERROR: I do not know how to find the folder named [SECRET_DATA]!" Hackers use a brilliant trick here. They write a sneaky command that tells the robot to go fetch a secret password, and then they intentionally break the math problem. The robot goes and gets the secret password, tries to do the broken math, gets angry, and screams the password out loud onto the screen inside its error message! The hacker didn't even need to use the UNION spell; they just made the robot so mad that it accidentally yelled the secret for everyone to hear.

THE LIMITS OF SCREAMING
There is a catch to this trick. The database robots are only allowed to scream for a very short time before they get cut off. For example, in a MySQL database, the robot can only scream 32 letters at a time. If the hacker asks the robot to scream a giant, 100-letter password, the robot will only yell the first 32 letters and then stop. To get around this, the hacker has to use a special instruction called "SUBSTRING." This tells the robot, "Go get the secret password, but only look at letters 33 through 64, and then do the broken math." The hacker has to make the robot scream over and over again, reading the password in small chunks until they get the whole thing.`,
    questions: [
      { q: "What is it called when a hacker intentionally breaks the code to make the robot complain?", a: "Error-Based SQL Injection" },
      { q: "What MySQL function do hackers intentionally break to make the robot scream?", a: "EXTRACTVALUE()" },
      { q: "What symbol (hex 0x7e) do hackers use to make the robot's math problem invalid?", a: "~ (tilde)" },
      { q: "How many letters is the MySQL robot allowed to scream at one time?", a: "32 letters (or 32 characters)" },
      { q: "What special instruction tells the robot to read a password in small chunks?", a: "SUBSTRING() (or SUBSTR())" }
    ]
  },
  {
    title: "4. The Yes or No Game (Blind SQLi)",
    points: 10,
    content: `THE INVISIBLE ROBOT
Imagine playing a game with a robot that is locked behind a thick, heavy door. You can slide a piece of paper under the door with a question on it. If the answer is "Yes," the robot turns on a green light outside the door. If the answer is "No," the robot turns on a red light. You never get to hear the robot speak, and you never get to see the secret papers it is reading. This is called "Blind SQL Injection." Sometimes, a website is very secure and refuses to print any database secrets or angry error messages on the screen. The hacker is totally blind! But, if the hacker can ask a "Yes or No" question and watch how the website behaves, they can still steal every single secret in the building.

HOW TO GUESS A PASSWORD BLINDLY
If a hacker wants to steal an admin's password but they are completely blind, they have to play a game of 20 Questions. They slide a note under the door that says: "Is the first letter of the admin's password an 'A'?" If the website turns on the green light (like showing a normal picture), the hacker writes down 'A'. If the website turns on the red light (like showing a 'Page Not Found' error), the hacker slides another note: "Is the first letter a 'B'?" They do this over and over for every single letter of the alphabet until they guess the entire password! This takes a very long time, but it works perfectly without ever seeing the actual database.

THE ROBOT'S NUMBER GAME
Guessing letters one by one is slow. Computers prefer numbers. So, hackers use a trick called the "ASCII" function. Every letter in the alphabet has a secret number code. For example, 'a' is 97, 'b' is 98, and 's' is 115. The hacker tells the robot, "Take the first letter of the password, change it to its secret number, and tell me if the number is bigger than 100." If the green light turns on, the hacker knows the letter is somewhere in the second half of the alphabet. This is called a "Binary Search." By asking "Is it bigger than 100?" or "Is it smaller than 110?", the hacker can guess the right letter in only 5 tries instead of 26! Hackers use automatic tools like 'sqlmap' to play this Yes or No game thousands of times a second.`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_blind_diagram.png" alt="Blind SQL Injection"></div>

THE INVISIBLE ROBOT
Imagine playing a game with a robot that is locked behind a thick, heavy door. You can slide a piece of paper under the door with a question on it. If the answer is "Yes," the robot turns on a green light outside the door. If the answer is "No," the robot turns on a red light. You never get to hear the robot speak, and you never get to see the secret papers it is reading. This is called "Blind SQL Injection." Sometimes, a website is very secure and refuses to print any database secrets or angry error messages on the screen. The hacker is totally blind! But, if the hacker can ask a "Yes or No" question and watch how the website behaves, they can still steal every single secret in the building.

HOW TO GUESS A PASSWORD BLINDLY
If a hacker wants to steal an admin's password but they are completely blind, they have to play a game of 20 Questions. They slide a note under the door that says: "Is the first letter of the admin's password an 'A'?" If the website turns on the green light (like showing a normal picture), the hacker writes down 'A'. If the website turns on the red light (like showing a 'Page Not Found' error), the hacker slides another note: "Is the first letter a 'B'?" They do this over and over for every single letter of the alphabet until they guess the entire password! This takes a very long time, but it works perfectly without ever seeing the actual database.

THE ROBOT'S NUMBER GAME
Guessing letters one by one is slow. Computers prefer numbers. So, hackers use a trick called the "ASCII" function. Every letter in the alphabet has a secret number code. For example, 'a' is 97, 'b' is 98, and 's' is 115. The hacker tells the robot, "Take the first letter of the password, change it to its secret number, and tell me if the number is bigger than 100." If the green light turns on, the hacker knows the letter is somewhere in the second half of the alphabet. This is called a "Binary Search." By asking "Is it bigger than 100?" or "Is it smaller than 110?", the hacker can guess the right letter in only 5 tries instead of 26! Hackers use automatic tools like 'sqlmap' to play this Yes or No game thousands of times a second.`,
    questions: [
      { q: "What kind of attack forces the hacker to play a 'Yes or No' game because they cannot see the output?", a: "Blind SQL Injection" },
      { q: "If the hacker asks a TRUE question, what does the website do?", a: "Loads the page normally (turns on the green light)" },
      { q: "What function changes a letter into a secret number so the computer can guess it faster?", a: "ASCII()" },
      { q: "What is the fast guessing trick called where you ask if a number is bigger or smaller?", a: "Binary Search" },
      { q: "What automatic tool do hackers use to play this game thousands of times a second?", a: "sqlmap" }
    ]
  },
  {
    title: "5. The Sleeping Robot (Time-Based)",
    points: 10,
    content: `THE TOUGHEST CHALLENGE
Imagine the robot behind the thick door from the last lesson has gotten even smarter. Now, no matter what you slide under the door, it always turns on the green light. It never turns on the red light, even if your question is completely wrong! You can't see the answers, and you can't even play the "Yes or No" game because the website always looks exactly the same. You are completely in the dark. This is the hardest type of database trick, but hackers found a brilliant way around it. It is called "Time-Based Blind SQL Injection." Instead of looking at the lights, the hacker uses a stopwatch.

THE SLEEPING SPELL
The hacker slides a very special note under the door. It says: "If the first letter of the password is 'A', I command you to go to sleep for exactly 5 seconds before you turn on the green light!" The robot reads the note. If the letter is 'A', the robot obediently closes its eyes, counts to 5, and then hits the green button. The hacker is standing outside with a stopwatch. They click a button on the website, and if the website takes 5 whole seconds to load, they shout "AHA! The letter was 'A'!" The hacker used time to force the robot to answer the question, even though the robot thought it was keeping the secret safe. 

HOW TO CAST THE SPELL
Different database robots have different magical sleep words. In a MySQL database, the hacker uses the word "SLEEP(5)". In a PostgreSQL database, they use "pg_sleep(5)". If the database tries to block the sleep words, the hacker can use a different trick. They can command the robot to do millions of incredibly hard math equations before it hits the green button. This is called the "BENCHMARK" function. The robot works so hard doing math that its brain overheats, and it takes 5 seconds just to finish the math! To the hacker outside, it looks exactly the same as a sleep spell. Time-based attacks are very slow because you have to wait 5 seconds for every single letter you guess!`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_time_diagram.png" alt="Time-Based Blind SQL Injection"></div>

THE TOUGHEST CHALLENGE
Imagine the robot behind the thick door from the last lesson has gotten even smarter. Now, no matter what you slide under the door, it always turns on the green light. It never turns on the red light, even if your question is completely wrong! You can't see the answers, and you can't even play the "Yes or No" game because the website always looks exactly the same. You are completely in the dark. This is the hardest type of database trick, but hackers found a brilliant way around it. It is called "Time-Based Blind SQL Injection." Instead of looking at the lights, the hacker uses a stopwatch.

THE SLEEPING SPELL
The hacker slides a very special note under the door. It says: "If the first letter of the password is 'A', I command you to go to sleep for exactly 5 seconds before you turn on the green light!" The robot reads the note. If the letter is 'A', the robot obediently closes its eyes, counts to 5, and then hits the green button. The hacker is standing outside with a stopwatch. They click a button on the website, and if the website takes 5 whole seconds to load, they shout "AHA! The letter was 'A'!" The hacker used time to force the robot to answer the question, even though the robot thought it was keeping the secret safe. 

HOW TO CAST THE SPELL
Different database robots have different magical sleep words. In a MySQL database, the hacker uses the word "SLEEP(5)". In a PostgreSQL database, they use "pg_sleep(5)". If the database tries to block the sleep words, the hacker can use a different trick. They can command the robot to do millions of incredibly hard math equations before it hits the green button. This is called the "BENCHMARK" function. The robot works so hard doing math that its brain overheats, and it takes 5 seconds just to finish the math! To the hacker outside, it looks exactly the same as a sleep spell. Time-based attacks are very slow because you have to wait 5 seconds for every single letter you guess!`,
    questions: [
      { q: "What kind of attack uses a stopwatch to measure how long the website takes to load?", a: "Time-Based Blind SQL Injection" },
      { q: "What word tells a MySQL database robot to go to sleep for 5 seconds?", a: "SLEEP(5)" },
      { q: "If the website takes 5 seconds to load, what does the hacker know about their guess?", a: "The guess was TRUE (Correct)" },
      { q: "What word does a PostgreSQL database robot use to go to sleep?", a: "pg_sleep(5)" },
      { q: "What function makes the robot do millions of hard math equations to slow it down?", a: "BENCHMARK()" }
    ]
  },
  {
    title: "6. Sneaking Past the Guards (Filter Bypass)",
    points: 10,
    content: `THE DIGITAL SECURITY GUARDS
Because SQL Injection is so famous, programmers hire digital security guards to stand in front of the database robot. These guards are called "Filters" or "Web Application Firewalls" (WAFs). The guard has a blacklist of bad words. If they see a hacker type "UNION", "SELECT", or even a space character, the guard jumps out, blows a whistle, and throws the hacker's message in the trash! The robot is safe. But hackers are very sneaky, and they have invented hundreds of ways to put on disguises and sneak their bad words right past the security guards.

TRICKING THE GUARDS
If the security guard bans the space character, the hacker can't type "OR 1=1". The guard will catch the space. So, the hacker replaces the space with an invisible computer comment, typing "OR/**/1=1". The guard doesn't see a space, so they let it through! The database robot reads the comment, ignores it, and sees the spaces anyway! If the guard bans the word "UNION", the hacker might write it in a silly mix of capital and lowercase letters like "UnIoN". The dumb guard only knows how to look for the all-caps word "UNION", so they let "UnIoN" walk right through the door. The robot, however, doesn't care about capital letters and obeys the command perfectly.

THE SECRET ALIEN CODE
Sometimes the guards are very strict and ban quote marks ('). Hackers get around this by translating their words into secret alien math called "Hexadecimal." Instead of typing the word "admin" inside quote marks, the hacker types "0x61646D696E". To the security guard, this just looks like a random math equation, so they wave it through. But when the database robot receives "0x61646D696E", it instantly translates it back into the word "admin". The hacker sneaked their payload in without using a single quote mark! If a website is protected by a WAF, the hacker's entire job is to figure out what disguises the guards will fall for.`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_filter_diagram.png" alt="SQL Injection Filter Bypass"></div>

THE DIGITAL SECURITY GUARDS
Because SQL Injection is so famous, programmers hire digital security guards to stand in front of the database robot. These guards are called "Filters" or "Web Application Firewalls" (WAFs). The guard has a blacklist of bad words. If they see a hacker type "UNION", "SELECT", or even a space character, the guard jumps out, blows a whistle, and throws the hacker's message in the trash! The robot is safe. But hackers are very sneaky, and they have invented hundreds of ways to put on disguises and sneak their bad words right past the security guards.

TRICKING THE GUARDS
If the security guard bans the space character, the hacker can't type "OR 1=1". The guard will catch the space. So, the hacker replaces the space with an invisible computer comment, typing "OR/**/1=1". The guard doesn't see a space, so they let it through! The database robot reads the comment, ignores it, and sees the spaces anyway! If the guard bans the word "UNION", the hacker might write it in a silly mix of capital and lowercase letters like "UnIoN". The dumb guard only knows how to look for the all-caps word "UNION", so they let "UnIoN" walk right through the door. The robot, however, doesn't care about capital letters and obeys the command perfectly.

THE SECRET ALIEN CODE
Sometimes the guards are very strict and ban quote marks ('). Hackers get around this by translating their words into secret alien math called "Hexadecimal." Instead of typing the word "admin" inside quote marks, the hacker types "0x61646D696E". To the security guard, this just looks like a random math equation, so they wave it through. But when the database robot receives "0x61646D696E", it instantly translates it back into the word "admin". The hacker sneaked their payload in without using a single quote mark! If a website is protected by a WAF, the hacker's entire job is to figure out what disguises the guards will fall for.`,
    questions: [
      { q: "What do we call the digital security guards that block bad hacker words?", a: "Filters (or WAFs)" },
      { q: "If the guard blocks the space character, what can the hacker use instead to trick them?", a: "invisible comments (/**/)" },
      { q: "If the guard blocks 'UNION', how might the hacker type it to sneak past?", a: "With mixed case letters (like UnIoN)" },
      { q: "What secret alien math code do hackers use to avoid typing quote marks?", a: "Hexadecimal (Hex / 0x...)" },
      { q: "Does the database robot care if a command is typed in capital or lowercase letters?", a: "No" }
    ]
  },
  {
    title: "7. The Time Bomb Attack (Second-Order SQLi)",
    points: 10,
    content: `PLANTING A DIGITAL TIME BOMB
Most SQL injection attacks happen immediately. You type a sneaky code, and the robot hands you the treasure right then and there. But sometimes, the front door of the website has incredibly strong security guards, and you cannot trick them. In this case, hackers use a terrifying trick called "Second-Order SQL Injection." It works exactly like a ticking time bomb. The hacker creates a new account on the website, and for their username, they type a sneaky SQL code, like "admin' --". The front door guards see this and think, "Well, that's a very weird name, but it doesn't look dangerous right now." They put the weird name in a perfectly safe box and store it deep in the database. The bomb has been planted!

THE EXPLOSION
The hacker waits patiently. The next day, an administrator logs into the website and decides to look at a list of all the new users. The database robot opens the safe box, pulls out the hacker's weird username ("admin' --"), and tries to display it on the administrator's screen. But because the robot is reading the name out of its own safe box, it completely trusts the name and accidentally executes the sneaky code attached to it! The bomb explodes! The code might secretly change the administrator's password or delete the entire website. The hacker wasn't even touching the keyboard when the attack happened.

WHY IT IS SO DANGEROUS
This time-bomb attack is incredibly dangerous because automatic security scanners almost never find it. Scanners only look at the front door; they don't have the patience to plant a bomb and wait three days to see if it explodes. To find Second-Order SQL Injection, human security experts have to read through thousands of lines of computer code like detectives, tracing exactly where a user's name goes and making sure the robot never trusts it, even after it has been locked in the safe box for a week.`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_second_order_diagram.png" alt="Second-Order SQL Injection"></div>

PLANTING A DIGITAL TIME BOMB
Most SQL injection attacks happen immediately. You type a sneaky code, and the robot hands you the treasure right then and there. But sometimes, the front door of the website has incredibly strong security guards, and you cannot trick them. In this case, hackers use a terrifying trick called "Second-Order SQL Injection." It works exactly like a ticking time bomb. The hacker creates a new account on the website, and for their username, they type a sneaky SQL code, like "admin' --". The front door guards see this and think, "Well, that's a very weird name, but it doesn't look dangerous right now." They put the weird name in a perfectly safe box and store it deep in the database. The bomb has been planted!

THE EXPLOSION
The hacker waits patiently. The next day, an administrator logs into the website and decides to look at a list of all the new users. The database robot opens the safe box, pulls out the hacker's weird username ("admin' --"), and tries to display it on the administrator's screen. But because the robot is reading the name out of its own safe box, it completely trusts the name and accidentally executes the sneaky code attached to it! The bomb explodes! The code might secretly change the administrator's password or delete the entire website. The hacker wasn't even touching the keyboard when the attack happened.

WHY IT IS SO DANGEROUS
This time-bomb attack is incredibly dangerous because automatic security scanners almost never find it. Scanners only look at the front door; they don't have the patience to plant a bomb and wait three days to see if it explodes. To find Second-Order SQL Injection, human security experts have to read through thousands of lines of computer code like detectives, tracing exactly where a user's name goes and making sure the robot never trusts it, even after it has been locked in the safe box for a week.`,
    questions: [
      { q: "What is the attack called where the sneaky code is stored and executed later like a time bomb?", a: "Second-Order SQL Injection" },
      { q: "Where does the hacker plant the sneaky code to hide it?", a: "In their username (or profile)" },
      { q: "When does the 'bomb' actually explode?", a: "When someone (like an admin) views the stored profile later" },
      { q: "Can automatic security scanners easily find this time-bomb attack? (yes/no)", a: "No" },
      { q: "Does the database robot trust the sneaky code more when reading it out of its own safe box? (yes/no)", a: "Yes" }
    ]
  },
  {
    title: "8. Putting the Robot in a Cage (Defense)",
    points: 10,
    content: `HOW TO STOP THE HACKERS FOREVER
We have learned all the tricky ways hackers confuse the database robot, but how do we stop them? The absolute best defense in the entire world is called "Parameterized Queries" (or Prepared Statements). This defense puts the database robot inside an unbreakable cage. Instead of handing the robot a card with the rules and the user's name mixed together, the programmer sends the rules first. The programmer says: "Robot, I am going to give you a name to look for. No matter what the name says, you must ONLY read it as a name. Do not obey any commands hidden inside it!" The robot locks this rule in its brain. Then, the programmer hands the robot the hacker's sneaky name.

THE UNBREAKABLE CAGE
If a hacker types "' OR 1=1", the robot takes the note, remembers its strict rule, and says, "Okay, I will search the entire library for a human being whose legal name is literally 'Quote mark OR the number one equals one'." Since nobody has that ridiculous name, the robot returns nothing, and the hacker is completely defeated! It doesn't matter how tricky the math is or how many disguises the hacker wears; the robot will never be confused again because the programmer separated the rules from the data. This is the golden shield of database security.

THE PRINCIPLE OF LEAST PRIVILEGE
Even with the cage, good security experts add a second layer of defense called the "Principle of Least Privilege." Imagine you hire a plumber to fix your sink. You wouldn't give them the keys to your car and your safe, right? You only give them the key to the bathroom. Websites should treat the database robot the exact same way! The robot that handles the public website should only be allowed to read public information. It should never, ever be given the "DROP TABLE" power (the power to delete the entire database). That way, even if a super-genius hacker finds a crack in the cage, the robot literally doesn't have the power to destroy the website.`,
    html: `<div class="htb-diagram-container"><img src="../../../assets/sqli_defense_diagram.png" alt="SQL Injection Defense"></div>

HOW TO STOP THE HACKERS FOREVER
We have learned all the tricky ways hackers confuse the database robot, but how do we stop them? The absolute best defense in the entire world is called "Parameterized Queries" (or Prepared Statements). This defense puts the database robot inside an unbreakable cage. Instead of handing the robot a card with the rules and the user's name mixed together, the programmer sends the rules first. The programmer says: "Robot, I am going to give you a name to look for. No matter what the name says, you must ONLY read it as a name. Do not obey any commands hidden inside it!" The robot locks this rule in its brain. Then, the programmer hands the robot the hacker's sneaky name.

THE UNBREAKABLE CAGE
If a hacker types "' OR 1=1", the robot takes the note, remembers its strict rule, and says, "Okay, I will search the entire library for a human being whose legal name is literally 'Quote mark OR the number one equals one'." Since nobody has that ridiculous name, the robot returns nothing, and the hacker is completely defeated! It doesn't matter how tricky the math is or how many disguises the hacker wears; the robot will never be confused again because the programmer separated the rules from the data. This is the golden shield of database security.

THE PRINCIPLE OF LEAST PRIVILEGE
Even with the cage, good security experts add a second layer of defense called the "Principle of Least Privilege." Imagine you hire a plumber to fix your sink. You wouldn't give them the keys to your car and your safe, right? You only give them the key to the bathroom. Websites should treat the database robot the exact same way! The robot that handles the public website should only be allowed to read public information. It should never, ever be given the "DROP TABLE" power (the power to delete the entire database). That way, even if a super-genius hacker finds a crack in the cage, the robot literally doesn't have the power to destroy the website.`,
    questions: [
      { q: "What is the absolute best defense in the world against SQL Injection?", a: "Parameterized Queries (Prepared Statements)" },
      { q: "How does the unbreakable cage work? (It separates the rules from the...)", a: "data (or user input)" },
      { q: "If the robot uses the cage, will it obey the hacker's tricky math commands? (yes/no)", a: "no" },
      { q: "What rule says you should only give the robot the exact keys it needs and nothing more?", a: "Principle of Least Privilege" },
      { q: "Should the public website robot ever be given the power to delete the database? (yes/no)", a: "no" }
    ]
  }
];
