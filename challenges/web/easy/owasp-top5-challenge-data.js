/* === OWASP Top 5 Gauntlet Challenge Data === */

const CHALLENGE = {
  title: "OWASP Top 5 Gauntlet",
  points: 1000,
  difficulty: "Hard",
  category: "Web Vulnerabilities",
  flag: "CTF{B4C_CRYPT0_SQL1_M1SC0NF1G_SUPPLY}",
  hints: [
    "<strong>Stage 1 (Broken Access Control):</strong> Analyze the URL query parameters on the profile page and access the admin account (ID 100).",
    "<strong>Stage 2 (Cryptographic Failures):</strong> Take the ROT13 encrypted string from the user_accounts table and paste it into the decryption console to decode it.",
    "<strong>Stage 3 (Injection):</strong> Input a SQL injection query like <code>' OR '1'='1</code> in the search bar to bypass restrictions and dump the table.",
    "<strong>Stage 4 & 5 (DevOps & RCE):</strong> Access the exposed backup folder to find the DB password flag fragment, then authorize the DevOps console and run the PyYAML exploit (e.g. <code>!!python/object/apply:os.system [\"whoami\"]</code> modified to read flag.txt) to get the final flag fragment. Combine both fragments together."
  ]
};
