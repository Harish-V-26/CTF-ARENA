const LESSONS = [
  {
    title: "1. Introduction to Dynamic Analysis",
    points: 100,
    html: `
      <div class="htb-diagram-container">
        <img src="../../../assets/images/dynamic_analysis.png" alt="Dynamic Analysis Diagram" class="htb-diagram">
      </div>
      <h3>What is Dynamic Analysis?</h3>
      <p>Dynamic Analysis is the process of examining malware by <strong>executing it</strong> in a safe, controlled environment. Instead of looking at the dead code, you observe its live behavior: what files it drops, what registry keys it modifies, and what network connections it makes.</p>
      <p>Imagine you have an unknown seed. Static analysis would be examining its shape and sequencing its DNA in a lab. Dynamic analysis is planting the seed in a heavily secured greenhouse, watering it, and safely watching exactly what kind of toxic plant grows. You learn everything about its behavior by letting it come alive.</p>

      <h3>Why Perform Dynamic Analysis?</h3>
      <p>Some malware capabilities are hidden through packing or obfuscation, making static analysis difficult.</p>
      <ul>
        <li><strong>Bypass Obfuscation:</strong> Even heavily encrypted malware must decrypt its payload in memory to run. Dynamic analysis catches it in the act.</li>
        <li><strong>Behavioral Profiling:</strong> See exactly what the malware tries to do on a live system, such as encrypting files (Ransomware) or reaching out to a C2 server.</li>
        <li><strong>Rapid Triage:</strong> Running malware in an automated sandbox generates a behavioral report in minutes.</li>
      </ul>

      <h3>The Risks</h3>
      <p>Because you are executing live malware, there is a risk of infection. Dynamic analysis must <strong>always</strong> be performed in a secure, isolated environment called a Sandbox.</p>
    `,
    questions: [
      { q: "What type of malware analysis involves executing a file to observe its behavior?", a: "dynamic analysis" },
      { q: "What secure, isolated environment is required to safely run malware?", a: "sandbox" }
    ]
  },
  {
    title: "2. Sandboxing and Isolation",
    points: 60,
    html: `
      <div class="htb-diagram-container">
        <img src="../../../assets/images/sandbox.png" alt="Sandboxing Diagram" class="htb-diagram">
      </div>
      <h3>What is a Sandbox?</h3>
      <p>A sandbox is a tightly controlled environment—usually a Virtual Machine (VM)—isolated from your host network and the internet. It provides a safe arena to detonate malware without risking the rest of the organization.</p>
      <p>Imagine placing a suspect in a room with one-way glass and hidden microphones. The suspect thinks they are alone and acting normally, but they are actually in a completely isolated, observed environment where they can't escape or harm anyone. This is the concept of a <strong>Sandbox</strong>.</p>
      
      <h3>Automated Sandboxes</h3>
      <p>Security teams use automated platforms like <strong>Cuckoo Sandbox</strong>, <strong>ANY.RUN</strong>, or <strong>Joe Sandbox</strong>. You upload a file, the platform detonates it in a VM, records everything for a few minutes, and generates a report of indicators (IPs, dropped files).</p>
      
      <h3>Sandbox Evasion</h3>
      <p>Malware authors know about sandboxes and try to evade them.</p>
      <ul>
        <li><strong>Timing Checks:</strong> Malware might sleep for 30 minutes, outlasting a typical 5-minute automated sandbox run.</li>
        <li><strong>Environment Checks:</strong> Malware checks for "VMware" drivers or a lack of human interaction (no mouse movement) before revealing its true payload.</li>
        <li><strong>Human Interaction:</strong> Some malware requires the user to scroll through a document or click a specific button to activate.</li>
      </ul>
    `,
    questions: [
      { q: "What technique do attackers use to detect if they are running in a VM and hide their behavior?", a: "sandbox evasion" },
      { q: "Name a popular automated sandbox platform mentioned above.", a: "Cuckoo Sandbox" }
    ]
  },
  {
    title: "3. Host and Network Monitoring",
    points: 70,
    html: `
      <div class="htb-diagram-container">
        <img src="../../../assets/images/host_network.png" alt="Host and Network Monitoring Diagram" class="htb-diagram">
      </div>
      <h3>Monitoring the Host</h3>
      <p>When executing malware, you need tools to record what it does to the operating system.</p>
      <p>Monitoring the host is like a police stakeout: you watch the suspect's house, noting every time they open a door or change a lock.</p>
      <ul>
        <li><strong>Process Hacker / Process Explorer:</strong> Advanced task managers that show running processes, injected threads, and memory usage.</li>
        <li><strong>Procmon (Process Monitor):</strong> A Sysinternals tool that captures every file system, Registry, and process activity in real-time. You see exactly which files the malware creates or deletes.</li>
        <li><strong>Regshot:</strong> Takes a snapshot of the Windows Registry before and after execution, highlighting persistence keys.</li>
      </ul>

      <h3>Monitoring the Network</h3>
      <p>Malware needs to communicate to download payloads or exfiltrate data.</p>
      <p>Monitoring the network is like a wiretap: you record every single phone call they make to their boss. Together, host and network monitoring provide a complete picture of the suspect's activities.</p>
      <ul>
        <li><strong>Wireshark:</strong> A network protocol analyzer that captures every packet leaving the sandbox, revealing C2 server IPs.</li>
        <li><strong>INetSim:</strong> Simulates common internet services (HTTP, DNS). If malware requests a file, INetSim serves a fake one, tricking the malware into revealing its network behavior without a real internet connection.</li>
      </ul>
    `,
    questions: [
      { q: "What Sysinternals tool captures real-time file system, Registry, and process activity?", a: "Procmon" },
      { q: "What network tool captures every packet leaving the sandbox?", a: "Wireshark" },
      { q: "What tool simulates internet services within an isolated sandbox network?", a: "INetSim" }
    ]
  },
  {
    title: "4. Advanced: API Hooking and Debugging",
    points: 80,
    html: `
      <div class="htb-diagram-container">
        <img src="../../../assets/images/api_hooking.png" alt="API Hooking and Debugging Diagram" class="htb-diagram">
      </div>
      <h3>API Hooking</h3>
      <p>API Hooking involves intercepting calls the malware makes to the Windows OS. By placing a "hook" on functions like <code>InternetConnect</code> or <code>WriteFile</code>, an analyst sees exactly what data is being sent or written, right before it executes.</p>
      <p>API Hooking is like intercepting outgoing mail before it reaches the post office—you can read exactly what the malware is trying to send to the operating system.</p>
      
      <h3>Debugging</h3>
      <p>While static analysis uses Disassemblers, dynamic analysis uses <strong>Debuggers</strong> (like x64dbg) to control code execution step-by-step.</p>
      <p>Debugging is like having a superpower to freeze time; you can stop the malware right as it's about to pull the trigger, inspect its weapon, and safely unload the bullets.</p>
      <ul>
        <li><strong>Set Breakpoints:</strong> Pause execution right before a critical function (like a decryption routine).</li>
        <li><strong>Step Over/Into:</strong> Execute the malware one assembly instruction at a time.</li>
        <li><strong>Inspect Memory:</strong> View CPU registers and memory contents in real-time to extract decrypted strings or payloads, overcoming heavy obfuscation.</li>
      </ul>
    `,
    questions: [
      { q: "What technique involves intercepting calls made to the operating system?", a: "API Hooking" },
      { q: "What tool is used to execute malware step-by-step and inspect memory in real-time?", a: "Debugger" }
    ]
  },
  {
    title: "5. Practical Lab: Dynamic Analysis",
    points: 150,
    html: `
      <div class="htb-diagram-container">
        <img src="../../../assets/images/dynamic_lab.png" alt="Dynamic Analysis Lab Diagram" class="htb-diagram">
      </div>
      <h3>Put It Into Practice!</h3>
      <p>It's time to conduct a dynamic analysis. You have a suspicious binary that you need to detonate in a safe environment.</p>
      <p>Launch your private Kali Linux container from the panel above. You will use the terminal to analyze the file located at <code>/workspace/malware_analysis/suspicious_bin</code>.</p>

      <div class="step-block">
        <div class="step-num">Step 1</div>
        <div class="step-body">
          <strong>Execute the Binary:</strong><br>
          Normally, you'd run Windows malware in a Windows sandbox, but for this lab, we have an ELF binary. Run it using <code>./suspicious_bin</code> in the <code>/workspace/malware_analysis/</code> directory. Observe its output. Does it print anything? Does it seem to pause or make a connection?
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 2</div>
        <div class="step-body">
          <strong>System Call Tracing with strace:</strong><br>
          Run <code>strace ./suspicious_bin</code>. strace monitors all the system calls the program makes to the Linux kernel. Look for calls like <code>open()</code>, <code>read()</code>, <code>write()</code>, and <code>connect()</code> to see what files it accesses and if it tries to open network sockets.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 3</div>
        <div class="step-body">
          <strong>Library Tracing with ltrace:</strong><br>
          Run <code>ltrace ./suspicious_bin</code>. ltrace intercepts and records the dynamic library calls. This will show you exactly which high-level functions the program is using, like <code>printf()</code>, <code>strcmp()</code>, or <code>malloc()</code>.
        </div>
      </div>
      <div class="step-block">
        <div class="step-num">Step 4</div>
        <div class="step-body">
          <strong>Network Monitoring (Optional):</strong><br>
          In a real scenario, you might run <code>tcpdump</code> or Wireshark in the background while detonating the binary to capture any network traffic it generates.
        </div>
      </div>
      <p>Use your Kali Linux attack box to inspect the binary and answer the lab challenge questions below to complete the room!</p>
    `,
    questions: [
      { q: "What Linux command traces system calls made by a process?", a: "strace" },
      { q: "What Linux command intercepts and records dynamic library calls?", a: "ltrace" },
      { q: "What is the dynamic analysis CTF flag printed when the payload executes?", a: "CTF{dyn4m1c_b3h4v10r_c4ught}" }
    ]
  }
];
