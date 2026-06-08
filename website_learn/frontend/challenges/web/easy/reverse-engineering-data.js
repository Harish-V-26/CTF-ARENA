const LESSONS = [
  {
    title: "1. What is Reverse Engineering?",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/rev_eng_lesson1.png" alt="Reverse Engineering"></div>
      <h3>Reverse Engineering (RE)</h3>
      <p>In cybersecurity, Reverse Engineering (RE) is the process of analyzing a compiled binary, firmware, or program to understand its behavior without having access to the original source code. Security professionals use RE to find vulnerabilities in closed-source software, analyze malware, or understand proprietary network protocols.</p>
      <p>Imagine you find a locked mystery box with no instruction manual. Reverse engineering is the art of examining that box — its shape, weight, and the sounds it makes — to figure out exactly how it was built and what it does, without ever seeing the original blueprints. Programs are built by converting readable source code into unreadable machine code. Reverse engineering travels this pipeline backwards.</p>
      <h3>The Compilation Pipeline</h3>
      <div class="step-block">
        <div class="step-num">Stage 1</div>
        <div class="step-body"><strong>Source Code (.c)</strong><br>Human-readable code written by the developer (e.g., <code>printf("Hello");</code>).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Stage 2</div>
        <div class="step-body"><strong>Assembly (.s)</strong><br>Compiler translates C to assembly language (low-level CPU instructions like mov, push, call).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Stage 3</div>
        <div class="step-body"><strong>Machine Code</strong><br>Assembler and Linker convert assembly into the final executable binary file (ELF on Linux, PE on Windows).</div>
      </div>`,
    questions: [
      { q: "What is the process of analysing a compiled program without source code called?", a: "reverse engineering", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "Does static analysis involve running the binary? (yes/no)", a: "no", hint: "Re-read the lesson paragraphs and step-blocks carefully." },
      { q: "What tool stage converts assembly language into raw machine bytes?", a: "assembler", hint: "Look for the specific tools mentioned in the lesson." }
    ]
  },
  {
    title: "2. The 'strings' Command",
    points: 60,
    html: `<div class="htb-diagram-container"><img src="../../../assets/rev_eng_lesson2.png" alt="Strings Command"></div>
      <h3>Extracting Plaintext from Binaries</h3>
      <p>Developers often leave human-readable text embedded directly inside compiled binaries. This includes passwords, encryption keys, flags, error messages, and debug output. The <code>strings</code> command is a critical utility that extracts every sequence of printable characters from a file, making it the very first tool used during static analysis.</p>
      <p>Think of the compiled binary as a book written in a secret, unreadable cipher. Even though most of the book looks like gibberish, some pages still have standard sticky notes written in plain English. The <code>strings</code> command acts like a magnet that instantly rips all those readable sticky notes out of the book and hands them to you, revealing hidden secrets without you having to decode the rest of the text!</p>
      <h3>Practical Usage</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Basic Extraction</strong><br>Run <code>strings ./challenge_binary</code>. This prints every sequence of 4 or more consecutive printable characters found in the file.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Filter Output</strong><br>Pipe with grep to hunt for specific patterns: <code>strings ./binary | grep -i "CTF{"</code> to instantly locate hardcoded flags.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Show Offsets</strong><br>Use <code>-t x</code> to display the file offset (in hex) where each string lives inside the binary file.</div>
      </div>`,
    questions: [
      { q: "What Linux command extracts readable text from a binary file?", a: "strings", hint: "Check the command reference blocks." },
      { q: "What flag do you pass to 'strings' to show the hex offset of each string? (e.g. -x)", a: "-t x", hint: "Check the command reference blocks." },
      { q: "What is the flag found in the simulated strings output above?", a: "CTF{str1ngs_4r3_34sy}", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "3. Disassembly and Decompilation",
    points: 70,
    html: `<div class="htb-diagram-container"><img src="../../../assets/rev_eng_lesson3.png" alt="Disassembly"></div>
      <h3>Reading Machine Instructions</h3>
      <p>When <code>strings</code> fails because the flag is computed dynamically, you must read the actual assembly instructions. Tools like <code>objdump</code> disassemble the binary sections into readable assembly. Advanced tools like Ghidra or IDA Pro act as decompilers, attempting to reconstruct pseudo-C source code from the raw assembly.</p>
      <p>If you have a baked cake (the binary), <code>objdump</code> looks at the cake and tells you exactly what chemicals are inside it (the assembly instructions). Ghidra is a magical chef that looks at the cake and writes down the exact recipe (the pseudo-C code) that was used to bake it, making it incredibly easy for a human to understand the logic!</p>
      <h3>Tools and Instructions</h3>
      <div class="step-block">
        <div class="step-num">Tool 1</div>
        <div class="step-body"><strong>objdump</strong><br>Use <code>objdump -d -M intel ./binary</code> to disassemble the binary into readable Intel-syntax assembly.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Tool 2</div>
        <div class="step-body"><strong>Ghidra</strong><br>A free decompiler developed by the NSA that reconstructs high-level C code logic from binaries.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Instruction</div>
        <div class="step-body"><strong>cmp & je</strong><br>In assembly, <code>cmp</code> compares two values, and <code>je</code> (jump if equal) executes a branch. This is the classic signature of a password check.</div>
      </div>`,
    questions: [
      { q: "Which objdump flag enables Intel assembly syntax? (e.g. -M intel)", a: "-M intel", hint: "Check the command reference blocks." },
      { q: "Which assembly instruction compares two values and sets CPU flags?", a: "cmp", hint: "Check the command reference blocks." },
      { q: "Which free decompiler tool by the NSA converts assembly back to pseudo-C?", a: "Ghidra", hint: "Look for the specific tools mentioned in the lesson." }
    ]
  },
  {
    title: "4. Dynamic Trace Analysis",
    points: 70,
    html: `<div class="htb-diagram-container"><img src="../../../assets/rev_eng_lesson4.png" alt="Dynamic Analysis"></div>
      <h3>Dynamic Analysis via Tracing</h3>
      <p>Static analysis reads code without executing it. Dynamic analysis runs the binary in a controlled environment and intercepts its runtime behavior. Utilities like <code>ltrace</code> (Library Call Tracer) intercept calls to shared libraries (e.g., <code>strcmp</code>, <code>printf</code>), while <code>strace</code> intercepts low-level kernel system calls (e.g., <code>read</code>, <code>write</code>).</p>
      <p>Static analysis is like reading a recipe in a book. Dynamic analysis is like standing directly next to the chef in the kitchen and watching every single ingredient they grab, every pot they use, and every action they take in real-time! If a program uses a password checking function, <code>ltrace</code> will print exactly what password it is looking for on the screen!</p>
      <h3>Tracing Tools</h3>
      <div class="step-block">
        <div class="step-num">Tool 1</div>
        <div class="step-body"><strong>ltrace</strong><br>Run <code>ltrace ./binary</code>. If the program compares your input against a secret key using <code>strcmp</code>, ltrace will intercept the call and print both strings on the screen, instantly revealing the password!</div>
      </div>
      <div class="step-block">
        <div class="step-num">Tool 2</div>
        <div class="step-body"><strong>strace</strong><br>Run <code>strace ./binary</code> to watch file reads, writes, and network connections. Use <code>-e trace=read,write</code> to filter the noise.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Tool 3</div>
        <div class="step-body"><strong>gdb</strong><br>The GNU Debugger allows you to set breakpoints, pause execution, and inspect memory dynamically.</div>
      </div>`,
    questions: [
      { q: "Which tool intercepts shared library function calls like strcmp? (ltrace/strace)", a: "ltrace", hint: "Look for the specific tools mentioned in the lesson." },
      { q: "Which tool traces kernel-level system calls? (ltrace/strace)", a: "strace", hint: "Look for the specific tools mentioned in the lesson." },
      { q: "What strace flag limits output to only specific syscall names? (e.g. -e trace=)", a: "-e trace=", hint: "Check the command reference blocks." }
    ]
  },
  {
    title: "5. CTF Crackme Methodology",
    points: 50,
    html: `<div class="htb-diagram-container"><img src="../../../assets/rev_eng_lesson5.png" alt="CTF Crackme Methodology"></div>
      <h3>The Crackme Workflow</h3>
      <p>In a CTF Reverse Engineering challenge, you are given a binary (a "crackme") that asks for a password or key. Your goal is to reverse engineer the logic to find the correct input that unlocks the flag.</p>
      <p>Approaching a crackme requires a systematic process, starting from the easiest, lowest-hanging fruit (hardcoded strings) up to the most complex (full decompilation). Never jump straight into assembly reading if a simple tool will give you the answer in two seconds!</p>
      <h3>Execution Workflow</h3>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body"><strong>Identify & Strings</strong><br>Run <code>file</code> to identify the architecture. Then run <code>strings | grep CTF</code> to check for hardcoded instant wins.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body"><strong>Dynamic Tracing</strong><br>Run the binary under <code>ltrace</code>. Enter a dummy password and watch the intercepted <code>strcmp</code> arguments.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body"><strong>Decompile</strong><br>If the flag is dynamically constructed (e.g., XOR encoded), import the binary into Ghidra to read the pseudo-C and write a script to reverse the algorithm.</div>
      </div>`,
    questions: [
      { q: "Which command identifies a binary's type and architecture?", a: "file", hint: "Check the command reference blocks." },
      { q: "In a CTF crackme, what RE pattern XORs the flag with a key at runtime?", a: "XOR encoding", hint: "Check the command reference blocks." },
      { q: "What is the name given to a CTF binary reverse engineering challenge that asks for a password?", a: "crackme", hint: "Re-read the lesson paragraphs and step-blocks carefully." }
    ]
  }
];
