/* === Binary & Reverse Engineering Challenge Data === */

const CHALLENGE = {
  title: "Binary & Reverse Engineering",
  points: 500,
  difficulty: "Medium",
  category: "Reverse Engineering",
  flag: "FLAG{BIN_DISCLOSURE_MASTERY_B0F_C0NTR0L_ACH1EV3D_LOLBINS_ARE_SNEAKY}",
  hints: [
    "<strong>Clue 1 (Binary Disclosure):</strong> Visit the <code>/download</code> endpoint to get the executable. Run <code>strings vuln | grep FLAG</code> or disassemble the file to find the first secret key.",
    "<strong>Clue 2 (Buffer Overflow):</strong> Visit the <code>/bof</code> endpoint and supply a long payload query parameter (e.g. <code>?payload=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</code>) to crash the C binary and obtain the second secret key.",
    "<strong>Clue 3 (LOLBins):</strong> Exploit the <code>/lolbin</code> endpoint which runs commands starting with <code>find</code> or <code>tar</code>. Trigger command execution via <code>find</code>'s <code>-exec</code> parameter to print <code>/app/flag.txt</code>.",
    "<strong>Clue 4 (Concatenation):</strong> Submit the final master flag in the format: <code>FLAG{secret1_secret2_secret3}</code>."
  ]
};
