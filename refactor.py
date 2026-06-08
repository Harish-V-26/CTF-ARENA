import os
import re

def refactor_text(text):
    # remove leading/trailing backticks and any html/content prefix if passed
    lines = text.strip().split('\n')
    output = []
    in_list = False
    in_step = False
    
    # keep the diagram container if it exists
    if lines and 'htb-diagram-container' in lines[0]:
        output.append(lines[0].strip())
        lines = lines[1:]
        
    current_p = []
    
    def flush_p():
        if current_p:
            p_text = ' '.join(current_p).strip()
            if p_text:
                output.append(f"      <p>{p_text}</p>")
            current_p.clear()

    for line in lines:
        stripped = line.strip()
        if not stripped:
            flush_p()
            continue
            
        # Check if heading (all uppercase or mostly uppercase, no long sentences)
        words = stripped.split()
        is_heading = False
        
        # Heading heuristic
        if len(words) < 12 and stripped.upper() == stripped and not stripped.startswith('http') and not stripped.startswith('<'):
            is_heading = True
        if stripped.startswith('<h3>'):
            is_heading = True
        
        if is_heading:
            flush_p()
            if in_step:
                output.append('        </div>\n      </div>')
                in_step = False
            clean_heading = stripped.replace('<h3>', '').replace('</h3>', '')
            clean_heading = clean_heading.title() # Title case
            output.append(f"      <h3>{clean_heading}</h3>")
            continue
            
        # Check if it's a step
        step_match = re.match(r'^(?:STEP\s+(\d+)\s*[—:-]\s*|(\d+)\.\s+)(.*)', stripped, re.IGNORECASE)
        # Avoid matching simple numbered lists inside paragraphs if they are not steps
        if step_match and len(words) > 1:
            flush_p()
            step_num = step_match.group(1) or step_match.group(2)
            step_title = step_match.group(3)
            
            # If we are already in a step, close it
            if in_step:
                output.append('        </div>\n      </div>')
                
            output.append(f'      <div class="step-block">')
            output.append(f'        <div class="step-num">Step {step_num}</div>')
            output.append(f'        <div class="step-body"><strong>{step_title}</strong><br>')
            in_step = True
            continue
            
        # Check if list item
        if stripped.startswith('- ') or stripped.startswith('• '):
            flush_p()
            if not in_list:
                output.append("      <ul>")
                in_list = True
            output.append(f"        <li>{stripped[2:]}</li>")
            continue
            
        if in_list and not stripped.startswith('- ') and not stripped.startswith('• '):
            output.append("      </ul>")
            in_list = False

        if in_step:
            output[-1] += f"{stripped}<br>"
            continue

        # Normal paragraph
        current_p.append(stripped)

    flush_p()
    if in_list:
        output.append("      </ul>")
    if in_step:
        output.append('        </div>\n      </div>')
        
    return '\n'.join(output)

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find content: `...` or html: `...`
    # We only process if it's NOT already nicely formatted with <h3> and <p>
    pattern = re.compile(r'(?:content|html):\s*`([^`]+)`', re.DOTALL)
    
    def replacer(match):
        inner_text = match.group(1)
        # Heuristic: if it already has <p> tags, it might be already formatted
        if '<p>' in inner_text and '<h3>' in inner_text:
            return f"html: `{inner_text}`"
            
        refactored = refactor_text(inner_text)
        return f"html: `\n{refactored}\n    `"

    new_content = pattern.sub(replacer, content)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('website_learn/frontend/challenges'):
    for file in files:
        if file.endswith('-data.js'):
            process_file(os.path.join(root, file))
