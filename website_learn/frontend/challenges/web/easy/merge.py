import re

files = [
    "insecure-design-data.js",
    "auth-failures-data.js",
    "integrity-failures-data.js",
    "logging-failures-data.js",
    "error-handling-data.js"
]

combined = "const LESSONS = [\n"
for i, f in enumerate(files):
    with open(f, 'r') as file:
        content = file.read()
        match = re.search(r'const LESSONS = \[(.*)\];', content, re.DOTALL)
        if match:
            inner = match.group(1).strip()
            # Prefix titles to clarify which section they belong to
            if "insecure" in f:
                inner = inner.replace('title: "1.', 'title: "ID 1.')
                inner = inner.replace('title: "2.', 'title: "ID 2.')
                inner = inner.replace('title: "3.', 'title: "ID 3.')
                container = 'insecure-design'
                label = 'Insecure Design'
            elif "auth" in f:
                inner = inner.replace('title: "1.', 'title: "AF 1.')
                inner = inner.replace('title: "2.', 'title: "AF 2.')
                inner = inner.replace('title: "3.', 'title: "AF 3.')
                container = 'auth-failures'
                label = 'Authentication Failures'
            elif "integrity" in f:
                inner = inner.replace('title: "1.', 'title: "IF 1.')
                inner = inner.replace('title: "2.', 'title: "IF 2.')
                inner = inner.replace('title: "3.', 'title: "IF 3.')
                container = 'integrity-failures'
                label = 'Software Integrity Failures'
            elif "logging" in f:
                inner = inner.replace('title: "1.', 'title: "LF 1.')
                inner = inner.replace('title: "2.', 'title: "LF 2.')
                inner = inner.replace('title: "3.', 'title: "LF 3.')
                container = 'logging-failures'
                label = 'Logging Failures'
            elif "error" in f:
                inner = inner.replace('title: "1.', 'title: "EH 1.')
                inner = inner.replace('title: "2.', 'title: "EH 2.')
                inner = inner.replace('title: "3.', 'title: "EH 3.')
                container = 'error-handling'
                label = 'Error Handling'
                
            # Inject the custom launcher block into the first lesson of each section!
            launcher_html = f"""
      <div class="docker-launch" style="background:#2c3e50; padding:20px; border-radius:8px; text-align:center; margin-bottom:20px; border-left:4px solid #f39c12">
        <h3 style="color:#fff; margin-top:0;">{label} Lab Environment</h3>
        <p style="color:#ecf0f1">This environment is required for the next 3 lessons.</p>
        <button id="btn-launch-{container}" class="btn-launch" style="display:inline-block;margin-top:15px;padding:10px 20px;background:#f39c12;color:#fff;border-radius:4px;font-weight:bold;border:none;cursor:pointer;" onclick="launchSpecific('{container}')">Launch {label} ⇗</button>
        <button id="btn-stop-{container}" class="btn-launch" style="display:none;margin-top:15px;padding:10px 20px;background:#c0392b;color:#fff;border-radius:4px;font-weight:bold;border:none;cursor:pointer;margin-left:10px;" onclick="stopSpecific('{container}')">Stop Lab</button>
        <div id="msg-{container}" style="color:#e67e22; font-weight:bold; margin-top:15px; display:none;"></div>
      </div>
"""
            # find first html: ` and inject
            inner = re.sub(r'html: `', f'html: `{launcher_html}', inner, count=1)
            
            combined += inner
            if i < len(files) - 1:
                combined += ",\n"

combined += "\n];\n"

with open('owasp-part2-data.js', 'w') as out:
    out.write(combined)
print("Merge complete!")
