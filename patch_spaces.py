import os, glob, re

files = glob.glob('challenges/**/*.html', recursive=True)

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    modified = False

    # 1. Remove stop button hide lines with optional spaces
    new_content, count1 = re.subn(r"stop(?:Btn)?\.style\.display\s*=\s*'none';", "", content)
    
    # 2. Replace stop button show lines with button transform logic
    replacement_str = """btn.style.display='inline-block';
      btn.textContent='Stop Machine';
      btn.style.background='#c0392b';
      btn.onclick=(btn.id.includes('kali') ? stopKali : (typeof stopTarget === 'function' ? stopTarget : stopLab));"""
    
    new_content, count2 = re.subn(r"stop(?:Btn)?\.style\.display\s*=\s*'inline-block';", replacement_str, new_content)

    if count1 > 0 or count2 > 0:
        modified = True
    
    # Let's also double check if any other document.getElementById('...stop-btn') are causing issues
    # Just in case there are assignments we missed
    new_content, count3 = re.subn(r"document\.getElementById\('[^']*stop[^']*'\)\.style\.display\s*=\s*'[^']*';", "", new_content)
    if count3 > 0:
        modified = True

    if modified:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Patched flexible regex in {filepath}")
