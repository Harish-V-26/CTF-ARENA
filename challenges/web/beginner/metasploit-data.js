const LESSONS = [
  {
    title: "1. Introduction — What is Penetration Testing?",
    points: 30,
    content: `THE SWISS ARMY KNIFE
Imagine you are a professional security explorer hired to test the locks on a massive castle. Instead of walking around with a wheelbarrow full of different heavy tools—a hammer, a crowbar, a lockpick, a ladder, and a flashlight—you carry a single, magical, compact Swiss Army knife. This knife has every single tool folded neatly inside it, ready to pop out whenever you need it. In the hacking world, this magical tool is called a "Penetration Testing Framework." It is a structured collection of programs, scanners, and scripts that security experts use to test the defenses of computers in a controlled, safe way.

ETHICAL COMPASS
Testing locks on a castle is only legal if the King of the castle explicitly gives you a signed note saying: "Yes, please try to break in so I can fix my weak doors!" In cybersecurity, this signed note is called "Written Authorization." If you try to test locks without this note, you are a digital burglar, which is highly illegal and can get you sent to jail under laws like the Computer Fraud and Abuse Act (CFAA). Ethical hackers always follow strict rules, stay inside their agreed boundaries, and use their powers to help people rather than steal their treasures.

THE SAFE TRAINING GROUND
Because learning how to use these powerful tools can be dangerous, we have built a simulated training ground for you. The black terminal screen in this lab is not connected to a real computer system; it is a safe simulation. None of the commands you type will execute real attacks or cause any harm. It is designed to teach you the syntax—which is the spelling of computer commands—so you can practice the workflow of a professional penetration tester without any risk of breaking things.`,
    questions: [
      { q: "What is the primary benefit of using a framework like Metasploit over individual tools?", a: "consistency" },
      { q: "What does 'CFAA' stand for? (full name)", a: "computer fraud and abuse act" },
      { q: "Before testing any system, what MUST an ethical hacker obtain? (two words)", a: "written authorization" },
      { q: "Is it legal to use Metasploit against any internet server you want? (yes/no)", a: "no" }
    ]
  },
  {
    title: "2. What is Metasploit?",
    points: 40,
    content: `THE SECURITY WORKSHOP
Metasploit is the most famous and widely used penetration testing system in the world. It was created in 2003 by a developer named H.D. Moore, and it is now run by a company called Rapid7. It is pre-installed on Kali Linux (the hacker operating system). You open it by typing "msfconsole" in your terminal. Metasploit is organized into separate drawers of tools called "Modules." Just like apps on a phone, each module does one specific job.

THE FIVE MODULE DRAWERS
The first drawer contains "Exploits." These are special keys built to slide into very specific broken locks on a computer service (like the famous EternalBlue exploit). The second drawer contains "Payloads." A payload is the instructions we want the computer to execute AFTER we open the lock. The most famous payload is called "Meterpreter," which opens a secret connection (a session) from the victim's computer back to the hacker. The third drawer contains "Auxiliary" modules. These are scanners and probes that search for computers and check their versions without actually exploiting them, making them very safe to use for exploration.

THE ATTACK PIPELINE
The workflow in Metasploit always follows the same simple pipeline. First, you start the console (msfconsole). Second, you use a scanner (auxiliary) to find a target. Third, you search for a module that fits the target. Fourth, you load it (use). Fifth, you look at what options it needs (show options) and fill them in (set RHOSTS). Finally, you type "run" to fire the module. If it is an exploit, and it works, Metasploit creates a "Session," giving you a terminal screen to interact with the target!`,
    questions: [
      { q: "Who originally created the Metasploit Framework?", a: "H.D. Moore" },
      { q: "What is the name of the main Metasploit console command?", a: "msfconsole" },
      { q: "What type of module scans and probes without exploiting? (one word)", a: "auxiliary" },
      { q: "What is created after a successful exploit delivers its payload? (one word)", a: "session" },
      { q: "What payload type opens a remote shell back to the attacker? (format: x/x/x)", a: "windows/meterpreter/reverse_tcp" }
    ]
  },
  {
    title: "3. Core Commands — msfconsole",
    points: 50,
    content: `THE CONSOLE MASTER
When you type "msfconsole" in your terminal, the screen fills with colorful retro art, and the prompt changes to "msf6 >". This is your home base. From here, you run commands to search and load tools. The first command you must learn is "search". If you want to find scanner modules for FTP (File Transfer Protocol), you type "search ftp". Metasploit will search its thousands of modules and print a numbered list of everything it found that matches your search term.

LOADING THE MODULE
Once you find a module you want to use, you type "use" followed by the full name of the module, like "use auxiliary/scanner/ftp/ftp_version". The console prompt changes to show the name of the module in red brackets, indicating you have entered its context. Now, you type "show options" to see what variables the module needs. The most important variable in almost every Metasploit module is "RHOSTS", which stands for Remote Hosts. This is the IP address of the target computer you want to scan or test.

FIRING THE TRIGGER
To tell the module who to scan, you type "set RHOSTS 192.168.1.10" (replacing the numbers with your target's actual address). The console will confirm the change. Finally, you type "run" or "exploit" to fire the trigger. The module will connect to the target, do its job, print the output on your screen, and say "execution completed." When you are done and want to exit the module and return to home base, you simply type "back".`,
    questions: [
      { q: "What command searches for modules related to 'ssh'?", a: "search ssh" },
      { q: "What command loads a module into your current context?", a: "use" },
      { q: "What command shows all configurable options for the loaded module?", a: "show options" },
      { q: "What command sets the target IP address option?", a: "set RHOSTS" },
      { q: "What two commands execute the loaded module?", a: "run or exploit" },
      { q: "What command exits the current module context?", a: "back" }
    ]
  },
  {
    title: "4. Interactive Terminal — Practice Commands",
    points: 60,
    content: `PRACTICING THE MOVES
To become a master hacker, you have to practice the muscle memory of typing commands in a real terminal. Below this lesson, you will see a simulated Kali Linux black console. You can click on it and type real commands just like you would on a real Linux computer. If you type "msfconsole", the framework will boot up. If you get confused, you can type "help" to see a list of every command available, or click the Hint button to get a tip.

THE SCANNING FLOW
Scanners are the safest modules in Metasploit. They are like knocking on a house's front door to ask who lives there. The module "auxiliary/scanner/ftp/ftp_version" does exactly this. It connects to the target's port 21 (the FTP port) and asks the server for its name card (banner). The server replies with its version name, like "vsftpd 2.3.4". Professional testers use this version info to search the internet for known bugs that affect that specific version, allowing them to plan their next steps.

AUTOFULL AND HELPERS
Our simulated terminal has helpers built in to make typing easier. If you start typing a long module path like "auxiliary/sc...", you can press the Tab key on your keyboard, and the console will automatically finish spelling the word for you, just like a real terminal! If you ever make a mistake or the terminal gets messy, you can type "clear" to clean the screen, or click the "Reset" button to wipe the memory and start over from the beginning.`,
    questions: [
      { q: "After loading a module with 'use', what command shows its options?", a: "show options" },
      { q: "What option sets the target IP in most scanner modules?", a: "RHOSTS" },
      { q: "What option sets the target port number? (all caps)", a: "RPORT" },
      { q: "After running a scan module, what command exits back to global context?", a: "back" }
    ]
  },
  {
    title: "5. Practice Challenge — Find the FTP Scanner",
    points: 70,
    content: `THE FINAL EXAM
You have learned the framework, the modules, and the commands. Now it is time to put your skills to the test and earn your Metasploit badge! We have set up a target server inside a simulated network. Your objective is to run a version scan against this target using the terminal below. First, type "msfconsole" to boot the system. Second, search for the FTP version scanner and use it. Third, look at the options and set the "RHOSTS" variable to the target's IP address.

THE HIDDEN BANNER
Once you have configured the scanner, type "run" to execute the scan. The terminal will show progress logs as it connects to the target. Look closely at the text that pops up! When the target server replies with its name card banner, it will reveal a hidden secret flag in the format "FLAG{...}". The flag is hiding right inside the banner text. Copy the flag, come back to this page, and paste it into the answer box below to complete the challenge!

KEEPING IT LEGAL
Remember, this entire exercise is running in a simulated sandbox. In the real world, you must always double-check your target IP address before launching any scan or exploit. If you type a single number wrong in the RHOSTS box, you might scan a random hospital or bank computer instead of your target, which is unauthorized and highly dangerous. Always check your variables twice before typing the run command!`,
    questions: [
      { q: "Submit the flag you received from completing the terminal challenge!", a: "FLAG{MSF_BEGINNER_COMPLETE}" },
      { q: "What is the full path of the FTP version scanner module?", a: "auxiliary/scanner/ftp/ftp_version" },
      { q: "What Metasploit command searches for FTP-related modules?", a: "search ftp" },
      { q: "In a real engagement, what must you have before scanning any target? (two words)", a: "written authorization" }
    ]
  }
];
