import re

file_path = "/home/harishv26/Desktop/Csuite Project/CTF-LEARNING-WEBAPP/challenges/web/beginner/web-security-data.js"
with open(file_path, "r") as f:
    content = f.read()

replacements = [
    (r"WHAT IS THE DOMAIN NAME SYSTEM \(DNS\)\?\nNow, imagine", 
     "WHAT IS THE DOMAIN NAME SYSTEM (DNS)?\nThe Domain Name System (DNS) is a hierarchical and decentralized naming system for computers, services, or other resources connected to the Internet. It translates easily memorized domain names to the numerical IP addresses needed for locating and identifying computer services and devices with the underlying network protocols.\n\nNow, imagine"),

    (r"HOW HACKERS USE DNS:\nHackers are like", 
     "HOW HACKERS USE DNS:\nDNS reconnaissance is the process of using publicly available domain records to map a target's network infrastructure. Attackers query DNS servers for records such as A, AAAA, MX, and CNAME to uncover hidden subdomains and internal routing configurations, expanding the attack surface.\n\nHackers are like"),

    (r"THE CLIENT \(FRONTEND\)\nImagine a website is like", 
     "THE CLIENT (FRONTEND)\nThe frontend, or client-side, refers to the graphical user interface of a web application that executes directly within the user's web browser. It is constructed using HTML for structure, CSS for presentation, and JavaScript for dynamic behavior, functioning independently from the backend server infrastructure.\n\nImagine a website is like"),

    (r"THE SERVER \(BACKEND\)\nIf the Client is", 
     "THE SERVER (BACKEND)\nThe backend, or server-side, represents the data access layer and core computational logic of an application. It processes client requests, executes business rules, interfaces with databases, and dynamically generates responses using server-side languages and frameworks.\n\nIf the Client is"),

    (r"THE DATABASE \(DATA LAYER\)\nDeep inside the kitchen", 
     "THE DATABASE (DATA LAYER)\nA database is an organized collection of structured information, or data, typically stored electronically in a computer system. Managed by a Database Management System (DBMS), it provides secure, efficient storage, retrieval, and manipulation of sensitive application data, including user credentials and application state.\n\nDeep inside the kitchen"),

    (r"WHAT IS HTTP\?\nImagine you are playing", 
     "WHAT IS HTTP?\nThe Hypertext Transfer Protocol (HTTP) is an application-layer protocol for transmitting hypermedia documents, such as HTML. It functions as a stateless, request-response protocol within the client-server computing model, transmitting data in plain text without cryptographic security.\n\nImagine you are playing"),

    (r"WHAT IS HTTPS\?\nBecause regular HTTP notes", 
     "WHAT IS HTTPS?\nHypertext Transfer Protocol Secure (HTTPS) is an extension of HTTP. It uses Transport Layer Security (TLS) or Secure Sockets Layer (SSL) to encrypt communication over a computer network, ensuring data confidentiality, integrity, and cryptographic authentication between the client and the server.\n\nBecause regular HTTP notes"),

    (r"HTTP STATUS CODES\nSometimes the server gets", 
     "HTTP STATUS CODES\nHTTP status codes are standardized three-digit server responses indicating the outcome of a client's request. They are categorized into five classes: informational (1xx), successful (2xx), redirection (3xx), client error (4xx), and server error (5xx), providing diagnostic information for application behavior.\n\nSometimes the server gets"),

    (r"THE PROBLEM WITH GOLDFISH MEMORY\nImagine talking to someone", 
     "THE PROBLEM WITH GOLDFISH MEMORY\nHTTP is fundamentally a stateless protocol, meaning that each request is processed independently without any knowledge of previous requests. The server does not retain user state or session information between discrete HTTP transactions.\n\nImagine talking to someone"),

    (r"WHAT ARE COOKIES AND SESSIONS\?\nTo help the server", 
     "WHAT ARE COOKIES AND SESSIONS?\nA session is a temporary, stateful dialogue between a client and a server, typically maintained using a Session ID. A cookie is a small piece of data sent from a server and stored locally in the user's web browser, which is subsequently transmitted back to the server with future requests to authenticate and maintain the session state.\n\nTo help the server"),

    (r"HOW HACKERS STEAL WRISTBANDS\nHere is the scary", 
     "HOW HACKERS STEAL WRISTBANDS\nSession Hijacking is the exploitation of a valid computer session to gain unauthorized access to information or services in a computer system. This often involves stealing or predicting a valid session token (such as a cookie) to impersonate a legitimate user without requiring their authentication credentials.\n\nHere is the scary"),

    (r"THE SAME-ORIGIN POLICY \(SOP\)\nImagine you are sitting", 
     "THE SAME-ORIGIN POLICY (SOP)\nThe Same-Origin Policy (SOP) is a critical web security mechanism embedded in modern browsers. It dictates that a web browser permits scripts contained in a first web page to access data in a second web page, but only if both web pages have the same origin (identical URI scheme, host name, and port number).\n\nImagine you are sitting"),

    (r"HOW THE WALL WORKS\nFor two websites to", 
     "HOW THE WALL WORKS\nAn origin is defined by the combination of the protocol (scheme), domain (hostname), and port of the URL. The browser enforces strict isolation boundaries, preventing cross-origin read access to sensitive data, DOM elements, and network responses.\n\nFor two websites to"),

    (r"CROSS-ORIGIN RESOURCE SHARING \(CORS\)\nSometimes, websites actually", 
     "CROSS-ORIGIN RESOURCE SHARING (CORS)\nCross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources. It safely relaxes the Same-Origin Policy when explicitly authorized by the server.\n\nSometimes, websites actually"),

    (r"THE CIA TRIAD \(THE THREE GOLDEN RULES\)\nImagine you have", 
     "THE CIA TRIAD (THE THREE GOLDEN RULES)\nThe CIA Triad is a foundational model designed to guide policies for information security within an organization. The model consists of three core components: Confidentiality, Integrity, and Availability, which collectively form the basis of secure systems and data protection.\n\nImagine you have"),

    (r"CONFIDENTIALITY \(KEEPING SECRETS\)\nThe \"C\" stands for", 
     "CONFIDENTIALITY (KEEPING SECRETS)\nConfidentiality ensures that sensitive information is accessed only by authorized individuals, processes, or systems. It is typically enforced through cryptographic encryption, access control lists (ACLs), and secure authentication protocols to prevent unauthorized data disclosure.\n\nThe \"C\" stands for"),

    (r"INTEGRITY \(KEEPING THINGS EXACT\)\nThe \"I\" stands for", 
     "INTEGRITY (KEEPING THINGS EXACT)\nIntegrity guarantees the accuracy, completeness, and reliability of data over its entire lifecycle. It ensures that information is not altered, degraded, or destroyed by unauthorized actors, often verified through cryptographic hashing and digital signatures.\n\nThe \"I\" stands for"),

    (r"AVAILABILITY \(ALWAYS READY\)\nThe \"A\" stands for", 
     "AVAILABILITY (ALWAYS READY)\nAvailability guarantees that systems, applications, and data are accessible to authorized users when required. It involves protecting against disruptions such as hardware failures, network congestion, and malicious Denial-of-Service (DoS) attacks through redundancy and load balancing.\n\nThe \"A\" stands for"),

    (r"WHAT IS SQL INJECTION\?\nImagine a grumpy librarian", 
     "WHAT IS SQL INJECTION?\nSQL Injection (SQLi) is a code injection technique that exploits vulnerabilities in an application's software by inserting malicious SQL statements into entry fields for execution. This allows attackers to manipulate backend databases, bypass authentication, and access, modify, or delete sensitive data.\n\nImagine a grumpy librarian"),

    (r"HOW THE TRICK WORKS\nNormally, a website asks", 
     "HOW THE TRICK WORKS\nSQL injection occurs when user-supplied data is concatenated directly into a dynamic SQL query without proper validation or escaping. By injecting logical operators (such as OR 1=1) or terminating query strings, attackers can alter the query's structural logic to extract unauthorized database records.\n\nNormally, a website asks"),

    (r"HOW TO FIX IT\nTo stop this terrible", 
     "HOW TO FIX IT\nThe primary defense against SQL Injection is the implementation of Parameterized Queries (Prepared Statements). This technique separates the SQL code logic from the user-supplied data parameters, ensuring that the database driver treats input strictly as literal values rather than executable code.\n\nTo stop this terrible"),

    (r"WHAT IS CROSS-SITE SCRIPTING \(XSS\)\?\nImagine you have", 
     "WHAT IS CROSS-SITE SCRIPTING (XSS)?\nCross-Site Scripting (XSS) is a client-side vulnerability occurring when an application includes untrusted data in a web page without proper validation or escaping. This allows an attacker to execute malicious scripts (usually JavaScript) within the victim's browser context.\n\nImagine you have"),

    (r"WHAT DOES THE EVIL CODE DO\?\nBecause the evil code", 
     "WHAT DOES THE EVIL CODE DO?\nWhen an XSS payload executes, it operates with the same permissions as the web application. Attackers leverage this execution context to exfiltrate session cookies, manipulate the Document Object Model (DOM) to capture keystrokes, or perform actions on behalf of the authenticated user.\n\nBecause the evil code"),

    (r"HOW TO STOP THE MAGICAL NOTES\nTo stop XSS attacks", 
     "HOW TO STOP THE MAGICAL NOTES\nThe primary mitigation for XSS is Context-Aware Output Encoding. This process sanitizes untrusted input before rendering it in the browser by converting potentially executable characters (like `<` and `>`) into safe HTML entities (like `&lt;` and `&gt;`), neutralizing the script execution.\n\nTo stop XSS attacks"),

    (r"WHAT IS A BRUTE FORCE ATTACK\?\nImagine you find a", 
     "WHAT IS A BRUTE FORCE ATTACK?\nA Brute Force attack is a cryptographic hack that uses trial-and-error to guess login info, encryption keys, or find hidden web pages. Attackers utilize automated software to systematically check all possible password combinations or dictionary words until the correct credential is found.\n\nImagine you find a"),

    (r"THE GIANT DICTIONARY OF PASSWORDS\nHackers don't usually", 
     "THE GIANT DICTIONARY OF PASSWORDS\nA Dictionary Attack is a subset of brute force attacks where the automated software utilizes precompiled lists of commonly used passwords, known as wordlists. These lists are often aggregated from historical data breaches, significantly reducing the time required to compromise weak credentials.\n\nHackers don't usually"),

    (r"HOW TO STOP THE GUESSING MACHINES\nIf a hacker can", 
     "HOW TO STOP THE GUESSING MACHINES\nDefenses against brute force attacks involve implementing Account Lockout mechanisms, progressive delays (Rate Limiting), and challenge-response tests (CAPTCHA). These controls computationally exhaust the attacker's resources or mandate human interaction, rendering automated guessing unfeasible.\n\nIf a hacker can"),

    (r"THE TOOLS OF THE TRADE\nJust like a carpenter", 
     "THE TOOLS OF THE TRADE\nAn Intercepting Web Proxy is a diagnostic and security testing tool that positions itself between the client browser and the target web server. It captures, inspects, and allows the modification of raw HTTP/HTTPS requests and responses before they are forwarded to their destination.\n\nJust like a carpenter"),

    (r"AUTOMATIC SCANNERS\nHackers also use robotic", 
     "AUTOMATIC SCANNERS\nAutomated Vulnerability Scanners are specialized software applications designed to systematically probe network services, web applications, or source code to identify known security flaws. They utilize predefined payload dictionaries and heuristic analysis to accelerate the discovery of vulnerabilities like SQLi and directory traversal.\n\nHackers also use robotic"),

    (r"YOUR BROWSER'S SECRET MENU\nYou don't always need", 
     "YOUR BROWSER'S SECRET MENU\nBrowser Developer Tools are a suite of web authoring and debugging utilities built directly into modern web browsers. They provide deep inspection capabilities for the DOM, CSS styling, network request profiling, client-side storage analysis, and JavaScript execution debugging.\n\nYou don't always need")
]

for pattern, replacement in replacements:
    content = re.sub(pattern, replacement, content)

with open(file_path, "w") as f:
    f.write(content)

print("Modifications applied.")
