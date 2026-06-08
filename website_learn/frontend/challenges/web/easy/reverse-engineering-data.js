const LESSONS = [
  {
    title: "1. What is Reverse Engineering?",
    points: 50,
    html: `
      <div class="htb-diagram-container"><img src="../../../assets/rev_eng_lesson1.png" alt="1. What is Reverse Engineering?"></div>

      <h3>What is Reverse Engineering?</h3>
      <div class="analogy-box">
        <p><strong>Real-World Analogy:</strong> Imagine you find a locked mystery box with no instruction manual. Reverse engineering is the art of examining that box — its shape, weight, sounds it makes — to figure out <em>exactly</em> how it was built and what it does, without ever seeing the original blueprints.</p>
      </div>
      <p>In cybersecurity, <strong>Reverse Engineering (RE)</strong> means analysing a compiled binary, firmware, or program to understand its behaviour <em>without</em> having the original source code. Security professionals use RE to:</p>
      <ul>
        <li><strong>Find vulnerabilities</strong> in closed-source software.</li>
        <li><strong>Analyse malware</strong> to understand how it operates.</li>
        <li><strong>Crack licence checks</strong> or hidden flags in CTF challenges.</li>
        <li><strong>Understand protocols</strong> used by proprietary applications.</li>
      </ul>

      <h3>How Programs Are Built (Compilation Pipeline)</h3>
      <p>Before we can reverse something, we must understand how it was created. A typical C program goes through these stages:</p>
      <div class="step-block">
        <div class="step-num">Stage 1</div>
        <div class="step-body"><strong>Source Code (.c)</strong> — Human-readable code written by the developer. e.g. <code>printf("Hello");</code></div>
      </div>
      <div class="step-block">
        <div class="step-num">Stage 2</div>
        <div class="step-body"><strong>Compilation → Assembly (.s)</strong> — Compiler translates C to assembly language (mov, push, call instructions).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Stage 3</div>
        <div class="step-body"><strong>Assembling → Object File (.o)</strong> — Assembler converts assembly to machine code (raw bytes the CPU understands).</div>
      </div>
      <div class="step-block">
        <div class="step-num">Stage 4</div>
        <div class="step-body"><strong>Linking → Executable (ELF/PE)</strong> — Linker combines object files and libraries into the final binary you run.</div>
      </div>
      <p>Reverse engineering travels this pipeline <strong>backwards</strong> — from the binary back up toward understanding the original logic.</p>

      <h3>Key RE Terminology</h3>
      <ul>
        <li><strong>Binary</strong> — The compiled executable file (ELF on Linux, PE/EXE on Windows).</li>
        <li><strong>Disassembly</strong> — Converting raw machine bytes back into assembly instructions.</li>
        <li><strong>Decompilation</strong> — Attempting to reconstruct pseudo-C source code from assembly.</li>
        <li><strong>Static Analysis</strong> — Examining the binary without running it.</li>
        <li><strong>Dynamic Analysis</strong> — Running the binary and observing its behaviour in real-time.</li>
        <li><strong>Strings</strong> — Printable text embedded in the binary (flags, passwords, error messages).</li>
      </ul>
    `,
    questions: [
      { q: "What is the process of analysing a compiled program without source code called?", a: "reverse engineering" },
      { q: "Does static analysis involve running the binary? (yes/no)", a: "no" },
      { q: "What tool stage converts assembly language into raw machine bytes?", a: "assembler" }
    ]
  },
  {
    title: "2. The 'strings' Command — Finding Hidden Text",
    points: 60,
    html: `
      <div class="htb-diagram-container"><img src="../../../assets/rev_eng_lesson2.png" alt="2. The 'strings' Command — Finding Hidden Text"></div>

      <h3>Why Strings Are Goldmines</h3>
      <p>Developers often leave human-readable text embedded directly inside binaries — passwords, flags, error messages, URLs, and debug output. The <code>strings</code> command extracts every sequence of printable characters from a file. It is always the <strong>first command</strong> you should run on an unknown binary.</p>

      <div class="analogy-box">
        <p><strong>Analogy:</strong> Think of the binary as a book written in a secret cipher. Even though most of it is unreadable, some pages still have sticky notes written in plain English. <code>strings</code> finds all those sticky notes for you instantly.</p>
      </div>

      <h3>Basic Usage</h3>
      <div class="step-block">
        <div class="step-num">Command</div>
        <div class="step-body">
          <code>strings ./challenge_binary</code><br><br>
          This prints every sequence of 4+ consecutive printable characters found in the file.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Filter Output</div>
        <div class="step-body">
          Pipe with <code>grep</code> to hunt for specific patterns:<br>
          <code>strings ./binary | grep -i "flag"</code><br>
          <code>strings ./binary | grep -i "CTF{"</code><br>
          <code>strings ./binary | grep -i "password"</code>
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Show Offsets</div>
        <div class="step-body">
          Use <code>-t x</code> to display the file offset (in hex) where each string lives:<br>
          <code>strings -t x ./binary</code>
        </div>
      </div>

      <h3>Practical Exercise — Simulate It</h3>
      <p>Imagine this is the output of running <code>strings ./crackme_01</code>:</p>
      <pre style="background:#0d1117;color:#58a6ff;padding:14px;border-radius:6px;font-family:var(--font-mono), monospace;font-size:13px;overflow-x:auto;">
/lib64/ld-linux-x86-64.so.2
libc.so.6
printf
strcmp
__libc_start_main
Enter the password: 
Wrong password!
Access Granted!
s3cr3t_p4ss
CTF{str1ngs_4r3_34sy}
GCC: (Ubuntu 11.3.0-1ubuntu1~22.04) 11.3.0
      </pre>
      <p>From this output alone, we can immediately see the plaintext password <code>s3cr3t_p4ss</code> and the flag <code>CTF{str1ngs_4r3_34sy}</code> — without even running the binary! This is why hardcoded secrets are a massive vulnerability.</p>
    `,
    questions: [
      { q: "What Linux command extracts readable text from a binary file?", a: "strings" },
      { q: "What flag do you pass to 'strings' to show the hex offset of each string? (e.g. -x)", a: "-t x" },
      { q: "What is the flag found in the simulated strings output above?", a: "CTF{str1ngs_4r3_34sy}" }
    ]
  },
  {
    title: "3. Disassembly with 'objdump' & 'radare2'",
    points: 70,
    html: `
      <div class="htb-diagram-container"><img src="../../../assets/rev_eng_lesson3.png" alt="3. Disassembly with 'objdump' & 'radare2'"></div>

      <h3>Going Deeper — Reading Assembly</h3>
      <p>When <code>strings</code> doesn't find the flag (because it's computed at runtime or obfuscated), you need to read the actual <strong>assembly instructions</strong> — the disassembly of the binary.</p>

      <h3>Using objdump (Built-in Linux tool)</h3>
      <p><code>objdump</code> is available on virtually every Linux system. It disassembles the binary sections into readable assembly:</p>
      <div class="step-block">
        <div class="step-num">Basic Disassembly</div>
        <div class="step-body">
          <code>objdump -d ./binary</code><br>
          Disassembles all executable sections. Look for the <code>&lt;main&gt;</code> function.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Intel Syntax (Easier to Read)</div>
        <div class="step-body">
          <code>objdump -d -M intel ./binary</code><br>
          Uses Intel syntax (destination first) instead of AT&amp;T syntax.
        </div>
      </div>

      <h3>Key x86-64 Assembly Instructions</h3>
      <ul>
        <li><code>mov rax, rbx</code> — Copy value from rbx into rax.</li>
        <li><code>cmp rax, rbx</code> — Compare two values (sets CPU flags).</li>
        <li><code>je / jne</code> — Jump if Equal / Jump if Not Equal (based on cmp result).</li>
        <li><code>call printf</code> — Call a function (printf in this case).</li>
        <li><code>push / pop</code> — Stack operations for function calls.</li>
        <li><code>ret</code> — Return from function.</li>
      </ul>

      <h3>Reading a Typical Password Check</h3>
      <pre style="background:#0d1117;color:#58a6ff;padding:14px;border-radius:6px;font-family:var(--font-mono), monospace;font-size:13px;overflow-x:auto;">
&lt;main&gt;:
  ...
  lea    rdi, [rip+0x200]    ; Load "Enter password: " string
  call   puts                ; Print it
  lea    rdi, [rip+0x210]    ; Load expected password into rdi
  mov    rsi, rbx            ; rbx = user input
  call   strcmp              ; Compare them
  test   eax, eax            ; Was result 0 (equal)?
  jne    &lt;wrong_password&gt;    ; If NOT equal, jump to fail
  lea    rdi, [rip+0x230]    ; Load "Access Granted!" string
  call   puts
      </pre>
      <p>When you see a <code>strcmp</code> followed by <code>je</code> or <code>jne</code>, you've found a string comparison — the classic password check pattern in CTF crackmes.</p>

      <h3>Using Ghidra (Free Decompiler by NSA)</h3>
      <p>For complex binaries, <strong>Ghidra</strong> (free) or <strong>IDA Pro</strong> can <em>decompile</em> assembly back into pseudo-C code, making it much easier to understand logic. In Ghidra:</p>
      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">Open Ghidra → New Project → Import the binary file.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">Double-click the binary → Auto-analyse → Open Code Browser.</div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">Navigate to <code>Functions → main</code> in the Symbol Tree. The right panel shows the decompiled pseudo-C.</div>
      </div>
    `,
    questions: [
      { q: "Which objdump flag enables Intel assembly syntax? (e.g. -M intel)", a: "-M intel" },
      { q: "Which assembly instruction compares two values and sets CPU flags?", a: "cmp" },
      { q: "Which free decompiler tool by the NSA converts assembly back to pseudo-C?", a: "Ghidra" }
    ]
  },
  {
    title: "4. Dynamic Analysis with 'ltrace' & 'strace'",
    points: 70,
    html: `
      <div class="htb-diagram-container"><img src="../../../assets/rev_eng_lesson4.png" alt="4. Dynamic Analysis with 'ltrace' & 'strace'"></div>

      <h3>Watching a Binary Execute Live</h3>
      <p>Static analysis reads the code without running it. <strong>Dynamic analysis</strong> runs the binary in a controlled way and intercepts what it actually does — which library functions it calls, which syscalls it makes, and what data it passes around.</p>

      <div class="analogy-box">
        <p><strong>Analogy:</strong> Static analysis is reading a recipe. Dynamic analysis is standing next to the chef and watching every ingredient they grab, every pot they use, and every action they take — in real time.</p>
      </div>

      <h3>ltrace — Library Call Tracer</h3>
      <p><code>ltrace</code> intercepts calls to shared library functions (like <code>strcmp</code>, <code>printf</code>, <code>malloc</code>). This is extremely powerful for crackmes because you can see the arguments passed to <code>strcmp</code> — including the expected password!</p>
      <div class="step-block">
        <div class="step-num">Usage</div>
        <div class="step-body">
          <code>ltrace ./crackme_01</code><br>
          Run the binary under ltrace. When prompted for a password, type anything.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Sample Output</div>
        <div class="step-body">
          <pre style="background:#0d1117;color:#2ecc71;padding:10px;border-radius:4px;font-size:12px;margin:0;">
puts("Enter the password: ")      = 21
fgets("wrongguess\\n", 64, stdin)  = 0x7fff...
strcmp("wrongguess", "s3cr3t_p4ss") = -1
puts("Wrong password!")            = 17</pre>
          The two arguments to <code>strcmp</code> are printed! You can see the expected value <code>s3cr3t_p4ss</code> directly.
        </div>
      </div>

      <h3>strace — System Call Tracer</h3>
      <p><code>strace</code> traces kernel-level <em>syscalls</em> (open, read, write, execve). Useful for understanding file access, network connections, and process behaviour.</p>
      <div class="step-block">
        <div class="step-num">Usage</div>
        <div class="step-body">
          <code>strace ./crackme_01</code><br>
          You'll see low-level calls like <code>openat(AT_FDCWD, "/etc/passwd"...)</code> or <code>write(1, "Flag: CTF{...}", 30)</code>.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Filter by syscall</div>
        <div class="step-body">
          <code>strace -e trace=read,write ./binary</code><br>
          Only show read and write syscalls — much cleaner output.
        </div>
      </div>

      <h3>When to Use Which Tool</h3>
      <ul>
        <li>Use <code>strings</code> first — instant wins from hardcoded secrets.</li>
        <li>Use <code>ltrace</code> — when you suspect a strcmp/strcpy password check.</li>
        <li>Use <code>strace</code> — when you need to see file/network operations.</li>
        <li>Use <code>objdump</code> / <code>Ghidra</code> — when you need deep code understanding.</li>
        <li>Use <code>gdb</code> — when you need full debugger control (breakpoints, memory inspection).</li>
      </ul>
    `,
    questions: [
      { q: "Which tool intercepts shared library function calls like strcmp? (ltrace/strace)", a: "ltrace" },
      { q: "Which tool traces kernel-level system calls? (ltrace/strace)", a: "strace" },
      { q: "What strace flag limits output to only specific syscall names? (e.g. -e trace=)", a: "-e trace=" }
    ]
  },
  {
    title: "5. Practical CTF Crackme Walkthrough",
    points: 50,
    html: `
      <div class="htb-diagram-container"><img src="../../../assets/rev_eng_lesson5.png" alt="5. Practical CTF Crackme Walkthrough"></div>

      <h3>Putting It All Together</h3>
      <p>In a CTF Reverse Engineering challenge, you are typically given a binary (called a <strong>crackme</strong>) that asks for a password or key. Your goal is to find the correct input that unlocks the flag. Here is the complete methodology:</p>

      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Recon the binary type:</strong><br>
          <code>file ./crackme</code> — Is it ELF 64-bit? 32-bit? Is it stripped (debug symbols removed)?<br>
          <code>checksec --file=./crackme</code> — What protections are enabled (NX, PIE, canary)?
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>Check for obvious strings:</strong><br>
          <code>strings ./crackme | grep -i "CTF\|flag\|pass\|key"</code><br>
          If the flag is hardcoded — you win instantly!
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Dynamic trace:</strong><br>
          <code>ltrace ./crackme</code> then enter a dummy password and observe strcmp arguments. Often reveals the expected password!
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 4</div>
        <div class="step-body">
          <strong>Disassemble main:</strong><br>
          <code>objdump -d -M intel ./crackme | grep -A 50 "&lt;main&gt;"</code><br>
          Identify the comparison logic and any conditional jumps (je/jne).
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 5</div>
        <div class="step-body">
          <strong>Decompile with Ghidra:</strong><br>
          Import the binary, auto-analyse, open the <code>main</code> function in the decompiler. Read pseudo-C to understand the password construction algorithm.
        </div>
      </div>

      <h3>Common CTF RE Patterns</h3>
      <ul>
        <li><strong>Direct strcmp</strong> — Password compared with a hardcoded string. Found with ltrace or strings.</li>
        <li><strong>XOR Encoding</strong> — Flag XOR'd with a key at runtime. Must patch or trace the XOR loop.</li>
        <li><strong>Character-by-Character Check</strong> — Each character validated individually in a loop.</li>
        <li><strong>Hash Check</strong> — Input is hashed (MD5/SHA) and compared to a stored digest. Try CrackStation or hashcat.</li>
        <li><strong>Anti-debugging</strong> — Binary checks if it is being traced and exits. Patch the ptrace() check.</li>
      </ul>

      <h3>Quick Reference Cheatsheet</h3>
      <pre style="background:#0d1117;color:#58a6ff;padding:14px;border-radius:6px;font-family:var(--font-mono), monospace;font-size:13px;">
file ./binary                    # Identify binary type
strings ./binary | grep CTF      # Hunt for flags/passwords
ltrace ./binary                  # Trace library calls
strace ./binary                  # Trace syscalls
objdump -d -M intel ./binary     # Disassemble
readelf -a ./binary              # ELF headers & sections
gdb -q ./binary                  # Full debugger
      </pre>
    `,
    questions: [
      { q: "Which command identifies a binary's type and architecture?", a: "file" },
      { q: "In a CTF crackme, what RE pattern XORs the flag with a key at runtime?", a: "XOR encoding" },
      { q: "What is the name given to a CTF binary reverse engineering challenge that asks for a password?", a: "crackme" }
    ]
  }
];
