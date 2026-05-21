const LESSONS = [
  {
    title: "1. Introduction to Brute Forcing",
    points: 20,
    content: `THE DIGITAL KEY RING
Imagine you find a heavy, locked treasure chest in a dusty attic. You want to open it, but you don't have the key. Instead of looking for the key, you buy a giant key ring with every single key style in the world on it. You sit down in front of the chest and try the first key. It doesn't work. You try the second key, the third key, the fourth key, and so on. If you keep going, testing keys one by one, you will eventually find the one key that turns the lock and pops the chest open! This is exactly what a "Brute Force Attack" is in the computer world.

THE MACHINE ATTACK
In this lab, you are going to learn how to launch a brute force attack against a website's login screen. The website has a user account named "admin", but we do not know the password. Instead of guessing manually, we are going to use an automated hacking tool on our Kali Linux machine to try thousands of different passwords from a pre-made text file (a wordlist) until the website says "Success!" and lets us in. It is not a very sneaky attack, but because computers are incredibly fast at guessing, it is very effective against weak passwords.

PREPARING THE TARGET
To begin, click the red "Open Target Page" button at the top of this page. This will launch the target login form in a new tab. Before we can start guessing, we need to know where to send our guesses. Inspect the page code or watch the URL bar. The page where the login form sends its credentials is located at the path "/api/brute-force-target", and it sends the data using a secure POST request. Let's move to the next lesson to see how we can configure our guessing machine!`,
    questions: [
      { q: "What username are you trying to brute force in this lab?", a: "admin" },
      { q: "What HTTP method does the target login form use to send credentials?", a: "POST" },
      { q: "Are brute force attacks generally faster or slower than SQL injection?", a: "slower" },
      { q: "What is the URL path for the target login page? (e.g. /api/...)", a: "/api/brute-force-target" },
      { q: "Are you ready to use Kali Linux tools for this challenge? (yes/no)", a: "yes" }
    ]
  },
  {
    title: "2. Using Hydra",
    points: 60,
    content: `THE GUESSING MONSTER
To crack the password, we will use a famous Kali Linux tool called "Hydra." Hydra is a super-fast network logon cracker that can fire passwords at a server's front door at lightning speed. It supports many different protocols, but since we are attacking a website login form, we will use its HTTP POST form module. We also need a "Wordlist," which is a giant text file filled with millions of common passwords. Kali Linux has a pre-installed wordlist called "rockyou.txt" that we will use as our dictionary.

THE CRACKING FORMULA
To tell Hydra what to do, we use a specific terminal command: 'hydra -l admin -P /usr/share/wordlists/rockyou.txt <Target_IP> -s 5000 http-post-form "/api/brute-force-target:username=^USER^&password=^PASS^:Invalid username or password"'. Let's break down this formula! The '-l admin' flag tells Hydra to only attack the username 'admin'. The '-P' flag points to the rockyou dictionary file. The '-s 5000' flag tells it what port the target website is listening on.

HOW HYDRA DETECTS SUCCESS
The most important part of the command is the string inside the double quotes. It tells Hydra the path to the login screen, how the form parameters are named (username and password), and the exact error message the website displays when a guess fails: "Invalid username or password." Hydra will try a password, read the website's response, and if it sees the word "Invalid", it knows the guess was wrong and immediately tries the next password. The moment it runs a guess that does NOT return the "Invalid" error, Hydra stops, rings its alarm, and prints the correct password on your screen!`,
    questions: [
      { q: "What flag in Hydra is used to specify a single username?", a: "-l" },
      { q: "What flag in Hydra is used to specify a file containing a list of passwords?", a: "-P" },
      { q: "What string does Hydra look for to determine if a login attempt failed in the example above?", a: "Invalid username or password" },
      { q: "What protocol module in Hydra is used for testing HTML forms that use POST?", a: "http-post-form" },
      { q: "What flag specifies the target port in Hydra?", a: "-s" }
    ]
  },
  {
    title: "3. Executing the Attack",
    points: 60,
    content: `LAUNCHING THE MISSILE
Now it's time to run the command! Open your Kali Linux terminal, copy the Hydra command from the previous lesson, swap out '<Target_IP>' with the actual IP address of your target server, and press Enter. You will see Hydra spring to life, launching parallel threads that guess passwords at a rate of hundreds of attempts per second. Because our target server is running locally in your private sandbox, the scan will finish very quickly.

THE SWEET VICTORY
Once Hydra scans through the list, it will find the correct password: "qwerty". The terminal will display a successful match log and stop guessing. Copy this password, head over to the target login tab in your browser, type "admin" in the username box, type "qwerty" in the password box, and click Login. The screen will reload and display a congratulations message!

DEFENDING THE SYSTEM
This lab shows why weak passwords like "qwerty" are so dangerous. A computer program can guess them in less than a second! In real life, websites protect themselves from tools like Hydra by using "Account Lockout" policies (locking the account after 5 wrong attempts) or "Rate Limiting" (slowing down how fast you can make requests). This completely breaks Hydra's speed, making brute forcing practically impossible.`,
    questions: [
      { q: "What is the correct password you found for the admin user?", a: "qwerty" },
      { q: "Did the server return a 200 OK status code upon successful login? (yes/no)", a: "yes" },
      { q: "What tool did you end up using to crack the password?", a: "Hydra" }
    ]
  }
];
