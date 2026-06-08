import os
import re

replacement = """    let contentHtml = '';
    if (l.html) {
      contentHtml = l.html;
    } else if (l.content) {
      const diagramMatch = l.content.match(/^<div class="htb-diagram-container">.*?<\\/div>/);
      if (diagramMatch) {
        const diagram = diagramMatch[0];
        const rest = l.content.slice(diagram.length);
        const escapedRest = rest
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        contentHtml = diagram + escapedRest;
      } else {
        contentHtml = l.content
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }
    }"""

pattern = re.compile(r'\s*let contentHtml = \'\';\n\s*const diagramMatch = l\.content\.match.*?contentHtml = l\.content[^}]+}\n\s*}', re.DOTALL)

for root, _, files in os.walk('website_learn/frontend/challenges/web'):
    for file in files:
        if file.endswith('-lab.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
                
            if 'const diagramMatch = l.content.match' in content and 'if (l.html)' not in content:
                # We can just do a literal replace since it's identical across files
                # Find the start index
                start_idx = content.find("let contentHtml = '';\n    const diagramMatch = l.content.match")
                if start_idx == -1:
                    start_idx = content.find("// Separate diagram from text to avoid executing HTML payloads\n    let contentHtml = '';\n    const diagramMatch = l.content.match")
                    if start_idx == -1:
                        # try without comment but with indent
                        start_idx = content.find("    let contentHtml = '';\n    const diagramMatch = l.content.match")
                        
                if start_idx != -1:
                    # Find end index (the closing brace of the else block)
                    end_idx = content.find("    }\n    document.getElementById('reading-text').innerHTML = contentHtml;", start_idx)
                    if end_idx != -1:
                        end_idx += 5 # to include the closing brace
                        new_content = content[:start_idx] + replacement + content[end_idx:]
                        with open(filepath, 'w') as f:
                            f.write(new_content)
                        print(f"Fixed {filepath}")
                    else:
                        print(f"Could not find end index in {filepath}")
                else:
                    print(f"Could not find start index in {filepath}")
