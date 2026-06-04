/* === Ultimate Gauntlet CTF Challenge Data ===
 *
 * Flag Chain Design:
 *  Phase 1 → Port scan with Nmap / Metasploit → FTP banner leaks "CTF{R3C0N_"
 *  Phase 2 → HTTP Recon on port 80 → /robots.txt → /staging/api_key.txt → "_1D0R_"
 *  Phase 3 → IDOR API on port 8080 → GET /api/invoice/1003 → "_F1L3_"
 *  Phase 4 → File Upload on port 9090 → upload shell.php with image/jpeg Content-Type
 *             → visit /execute?cmd=cat+/flag.txt → "G4UNT}"
 *
 *  Final Flag: CTF{R3C0N_1D0R_F1L3_G4UNT}
 */

const CHALLENGE = {
  title: "The Ultimate Gauntlet",
  points: 1000,
  difficulty: "Hard",
  category: "Web + Network",

  // 3 locked hints - shown one at a time with a cost warning
  hints: [
    {
      id: 1,
      cost: 0,
      title: "Hint 1 — Where to start",
      locked: true,
      content: "Not all services run on standard ports. The target runs on four different ports. Your first tool should be a full-range port scanner. Once you have a port list, enumerate the banners — one service is talkative on connect."
    },
    {
      id: 2,
      cost: 0,
      title: "Hint 2 — The web server is hiding something",
      locked: true,
      content: "Web servers often tell crawlers what not to index. A well-known file at the root of every web server reveals disallowed directories. One of those directories contains developer leftovers that were never meant to be public."
    },
    {
      id: 3,
      cost: 0,
      title: "Hint 3 — Trust issues",
      locked: true,
      content: "The API trusts the ID you give it. Invoice IDs are sequential integers — try requesting ones that don't belong to you. The upload service only checks the HTTP header for file type validation, not the actual file contents."
    }
  ],

  // Submission answers — exact match required
  flag: "CTF{R3C0N_1D0R_F1L3_G4UNT}",

  // Port map returned by the backend (populated dynamically)
  ports: {
    http:   7780,
    ftp:    7721,
    idor:   7808,
    upload: 7909
  }
};
