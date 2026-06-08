const LESSONS = [
  {
    title: "1. Introduction to Static Analysis",
    points: 100,
    html: `
      <div class="htb-diagram-container">
        <img src="../../../assets/images/static_analysis.png" alt="Static Analysis Diagram" class="htb-diagram">
      </div>
      <h3>What is Static Analysis?</h3>
      <p>Static Analysis is the process of examining a malicious file <strong>without executing it</strong>. It involves extracting information directly from the file's structure, metadata, embedded strings, and assembly code to safely understand its capabilities, intent, and indicators of compromise (IoCs).</p>
      <p>Imagine you are a bomb squad technician who has just found a suspicious device. If you press the buttons or plug it in, it might detonate and destroy the evidence. Instead, you carefully X-ray the device, read the manufacturer labels on the wires, and examine the circuit blueprints without ever turning it on. This allows you to understand exactly how the device is built and what it is designed to do just by looking at its components. This is <strong>Static Analysis</strong>.</p>

      <h3>Why Perform Static Analysis First?</h3>
      <p>Static analysis is the foundational first step because it is safe and fast. It allows analysts to:</p>
      <ul>
        <li><strong>Safely Extract IoCs:</strong> Finding Command & Control (C2) IP addresses, malicious domains, and file paths without risking infection.</li>
        <li><strong>Categorize the Threat:</strong> Quickly identifying if the file is a known threat by computing its cryptographic hash.</li>
        <li><strong>Understand Capabilities:</strong> Identifying which Windows APIs the malware imports (e.g., functions for logging keystrokes or encrypting files).</li>
      </ul>

      <h3>Use Cases & Technical Aspects</h3>
      <p>Static analysis is heavily used in Security Operations Centers (SOCs) for rapid triage. When a user downloads a suspicious attachment, a Tier 1 analyst will run basic static tools to pull strings and hashes to cross-reference against Threat Intelligence platforms.</p>
      <p>Advanced static analysis, often referred to as reverse engineering, involves using powerful Disassemblers and Decompilers to read the actual assembly logic of the malware. This allows experts to reverse cryptographic algorithms, bypass obfuscation, and write targeted YARA rules.</p>
      <p>In this room, we'll start from the basics of extracting hidden strings and hashes, move to analyzing Windows Portable Executable (PE) headers, and finally put it into practice in a secure Kali Linux environment against a target binary.</p>
    `,
    questions: [
      { q: "What type of malware analysis involves examining a file without executing it?", a: "static analysis" },
      { q: "What is the acronym for Indicators of Compromise?", a: "IoC" }
    ]
  },
  {
    title: "2. Basic Static Analysis: Hashes and Strings",
    points: 60,
    html: `
      <div class="htb-diagram-container">
        <img src="../../../assets/images/basic_static.png" alt="Hashes and Strings Diagram" class="htb-diagram">
      </div>
      <h3>File Identification via Hashing</h3>
      <p>The absolute first step in analyzing any suspicious file is to generate its cryptographic hash (commonly MD5, SHA-1, or SHA-256). A hash acts as a unique digital fingerprint for the file. Even changing a single byte inside the malware will completely change the resulting hash.</p>
      <p>Imagine arriving at a crime scene. Finding a cryptographic hash is like taking a suspect's unique fingerprint—it definitively identifies them. Extracting strings is like finding a torn, discarded shopping list on the floor that has the suspect's address written on it. These clues give you massive leads without ever seeing the suspect in action.</p>
      <ul>
        <li><strong>Open-Source Intelligence (OSINT):</strong> Once you have the hash, you can search for it on platforms like <a href="https://www.virustotal.com" target="_blank" style="color:var(--accent)">VirusTotal</a>, Hybrid Analysis, or AlienVault OTX. If the file is a known threat, these platforms will immediately provide comprehensive reports from dozens of antivirus engines, saving you hours of manual analysis.</li>
        <li><strong>Fuzzy Hashing (ssdeep):</strong> Because attackers frequently alter minor details to change the MD5 hash (a technique called polymorphic malware), analysts use "fuzzy hashing" to determine if a file is <em>similar</em> to known malware, rather than an exact match.</li>
        <li><strong>Command:</strong> <code>sha256sum suspicious_file.exe</code></li>
      </ul>

      <h3>Extracting Embedded Strings</h3>
      <p>Programs are compiled into machine code, but they often contain hardcoded human-readable text sequences known as <strong>strings</strong>. Extracting these strings is one of the fastest ways to gain context about the malware's intent.</p>
      <p>What are analysts looking for when extracting strings?</p>
      <ul>
        <li><strong>Network Indicators:</strong> Hardcoded IP addresses, domains, and URLs indicating Command and Control (C2) servers.</li>
        <li><strong>Host Indicators:</strong> File paths (e.g., <code>C:\\Windows\\System32\\malware.exe</code>) or Registry keys (e.g., <code>Run</code> keys) used to maintain persistence.</li>
        <li><strong>API Calls:</strong> Names of Windows functions like <code>CreateProcess</code> or <code>URLDownloadToFile</code>, which hint at the malware's capabilities.</li>
        <li><strong>Miscellaneous:</strong> Error messages, password dictionaries, attacker nicknames, or the original compiler path (PDB paths).</li>
      </ul>
      <p><strong>Command:</strong> <code>strings suspicious_file.exe</code></p>
      
      <div class="analogy-box">
        <p><strong>Note on Obfuscation:</strong> Malware authors know analysts look for strings. They often use "packing" or string encryption (like XOR or Base64) to hide them. If the <code>strings</code> command returns almost no readable text, or only gibberish, the file is likely obfuscated!</p>
      </div>
    `,
    questions: [
      { q: "What creates a unique digital fingerprint of a file? (e.g. MD5, SHA-256)", a: "hash" },
      { q: "What Linux tool extracts human-readable text from a binary?", a: "strings" },
      { q: "If a file has very few strings, what technique might the malware author have used?", a: "packing" }
    ]
  },
  {
    title: "3. Intermediate: PE Headers and Sections",
    points: 70,
    html: `
      <div class="htb-diagram-container">
        <img src="../../../assets/images/pe_headers.png" alt="PE Headers Diagram" class="htb-diagram">
      </div>
      <h3>The Portable Executable (PE) Format</h3>
      <p>On Windows, executable files (like .exe, .dll, and .sys) use the Portable Executable (PE) format. The PE format contains structured metadata (headers) and segmented data (sections) that tell the Windows OS how to load and run the program. Analyzing this structure can reveal malicious intent without ever looking at the code.</p>
      <p>Think of an executable file like a massive cargo ship. The Portable Executable (PE) Headers are the shipping manifest, declaring what should be in each cargo container (sections like .text and .data). If the manifest says a container is carrying 10 lbs of feathers (Raw Size on disk) but requests a warehouse the size of a stadium to unpack (Virtual Size in memory), you instantly know something is suspicious—the container is packed or compressed.</p>

      <h3>Key PE Sections</h3>
      <p>A standard executable is broken down into distinct sections:</p>
      <ul>
        <li><code>.text</code> — Contains the actual executable code (the CPU assembly instructions).</li>
        <li><code>.data</code> — Contains global, initialized variables.</li>
        <li><code>.rdata</code> — Contains read-only data, such as hardcoded strings.</li>
        <li><code>.bss</code> — Allocates memory for uninitialized variables.</li>
        <li><code>.rsrc</code> — Contains resources like icons, menus, dialogue boxes, and sometimes embedded secondary payloads or dropped files.</li>
      </ul>

      <h3>Detecting Packers and Obfuscation</h3>
      <p>A "packer" is a wrapper program that compresses or encrypts the original malware to evade antivirus detection. When the packed executable is run, a small piece of code called a "stub" decrypts the real malware directly into the computer's memory.</p>
      <p><strong>How to spot a packed file statically:</strong></p>
      <ol>
        <li><strong>Abnormal Section Names:</strong> Finding sections named <code>UPX0</code>, <code>UPX1</code>, or random characters instead of the standard <code>.text</code>.</li>
        <li><strong>High Entropy:</strong> Entropy measures randomness on a mathematical scale of 0 to 8. Normal code has an entropy around 4.0 to 6.0. Encrypted or compressed data is highly random, usually scoring above 7.0. If the <code>.text</code> section has an entropy of 7.9, it's definitively packed.</li>
        <li><strong>Virtual vs. Raw Size:</strong> In the PE headers, if a section's "Virtual Size" (size in memory) is drastically larger than its "Raw Size" (size on disk), it means the section is designed to decompress or unpack massive amounts of hidden data once executed.</li>
      </ol>
      <p><strong>Tools:</strong> <code>peframe</code>, <code>file</code>, <code>Detect It Easy (DiE)</code>, <code>PEstudio</code></p>
    `,
    questions: [
      { q: "What does PE stand for in Windows executables?", a: "Portable Executable" },
      { q: "Which PE section typically contains the executable CPU instructions?", a: ".text" },
      { q: "What mathematical metric measures the randomness of data to detect encryption?", a: "entropy" }
    ]
  },
  {
    title: "4. Advanced: Imports, Exports, and Disassembly",
    points: 80,
    html: `
      <div class="htb-diagram-container">
        <img src="../../../assets/images/advanced_static.png" alt="Imports and Disassembly Diagram" class="htb-diagram">
      </div>
      <h3>Import Address Table (IAT)</h3>
      <p>No program acts in isolation; malware must interact with the operating system to achieve its goals. It does this by importing functions from Windows Dynamic Link Libraries (DLLs) via the <strong>Import Address Table (IAT)</strong>. By auditing the IAT, an analyst can accurately profile the malware's capabilities.</p>
      <p>Imagine investigating a suspect and looking at their recent phone contacts. If they repeatedly call a lock-picking service and an underground getaway driver, you know their intent without catching them in the act. The Import Address Table (IAT) works exactly the same way—it reveals what external system functions the malware relies on.</p>
      <p><strong>Common Malicious Import Profiles:</strong></p>
      <ul>
        <li><strong>Network/Downloader:</strong> <code>InternetOpen</code>, <code>URLDownloadToFile</code>, <code>socket</code>, <code>connect</code> (Indicates the malware fetches secondary payloads or contacts a C2 server).</li>
        <li><strong>Persistence:</strong> <code>RegCreateKeyEx</code>, <code>RegSetValueEx</code> (Indicates the malware modifies the Windows Registry to start automatically upon reboot).</li>
        <li><strong>Process Injection:</strong> <code>VirtualAllocEx</code>, <code>WriteProcessMemory</code>, <code>CreateRemoteThread</code> (Indicates the malware hides by injecting its code into a legitimate process like explorer.exe).</li>
        <li><strong>Keylogging:</strong> <code>SetWindowsHookEx</code>, <code>GetAsyncKeyState</code> (Indicates the malware is recording keystrokes).</li>
      </ul>

      <h3>Disassembly vs. Decompilation</h3>
      <p>When metadata and strings aren't enough, analysts must read the underlying logic.</p>
      <ul>
        <li><strong>Disassemblers (e.g., objdump, radare2, IDA Pro):</strong> These tools translate raw binary machine code into Assembly language (e.g., x86/x64). Analysts read low-level instructions like <code>MOV</code> (move data), <code>PUSH</code> (push to stack), and <code>CALL</code> (execute function) to trace the exact execution flow.</li>
        <li><strong>Decompilers (e.g., Ghidra):</strong> These advanced tools take the process a step further, attempting to reverse-engineer the Assembly language back into highly readable, high-level C-like pseudo-code. This makes analyzing complex algorithms (like ransomware encryption routines) much faster.</li>
      </ul>
      <p>Through disassembly, a reverse engineer can map out logic branches, discover bypasses for anti-analysis checks, and fully reconstruct the malware's behavior.</p>
    `,
    questions: [
      { q: "What table lists the external library functions a program uses? (Acronym)", a: "IAT" },
      { q: "Which API function is a strong indicator of persistence via the Windows Registry?", a: "RegSetValueEx" },
      { q: "What advanced tool attempts to convert assembly back into C-like pseudo-code?", a: "Decompiler" }
    ]
  },
  {
    title: "5. Practical Lab: Static Analysis",
    points: 150,
    html: `
      <div class="htb-diagram-container">
        <img src="../../../assets/images/static_lab.png" alt="Static Analysis Lab Diagram" class="htb-diagram">
      </div>
      <h3>Put It Into Practice!</h3>
      <p>It's time to test your skills as a Malware Analyst. A suspicious binary has been discovered on an infected workstation. Your objective is to perform a static analysis to uncover its hidden secrets without executing it.</p>
      <p>Launch your private Kali Linux container from the panel above. You will use the terminal to analyze the file located at <code>/workspace/malware_analysis/suspicious_bin</code>.</p>

      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Identify the file format and hash:</strong><br>
          Run <code>file suspicious_bin</code>. Is it a Windows executable (PE) or a Linux executable (ELF)?<br>
          Run <code>sha256sum suspicious_bin</code>. In a real-world scenario, you would copy this hash into VirusTotal to check its reputation.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Extract Embedded Strings:</strong><br>
          Run <code>strings suspicious_bin</code>. This will dump all readable text. Look closely for IP addresses, URLs, or hidden flags. Since the output might be massive, you can pipe the output into grep to search for specific patterns: <br>
          <code>strings suspicious_bin | grep -i "CTF{"</code>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Analyze Headers and Imports:</strong><br>
          If it's an ELF file, use <code>readelf -a suspicious_bin</code> to view its section headers and imported functions. If it were a PE file, you would use <code>peframe suspicious_bin</code>.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 4</div>
        <div class="step-body">
          <strong>Disassemble the Code:</strong><br>
          Run <code>objdump -d suspicious_bin</code> to see the raw assembly instructions. Look at the function calls and register movements to understand the logic that governs the binary.
        </div>
      </div>
      <p>Use your Kali Linux attack box to inspect the binary and answer the lab challenge questions below to complete the room!</p>
    `,
    questions: [
      { q: "What command would you use to get the SHA-256 hash of a file?", a: "sha256sum" },
      { q: "What command extracts readable text sequences from a binary file?", a: "strings" },
      { q: "What is the hidden CTF flag found inside the suspicious_bin file?", a: "CTF{st4t1c_4n4lys1s_m4st3r}" }
    ]
  }
];
