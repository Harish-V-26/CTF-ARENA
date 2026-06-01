import os
import glob
import re

files = glob.glob('challenges/**/*.html', recursive=True)

# We will look for <button id="...stop-btn"...>...</button> and remove it
stop_btn_pattern = re.compile(r'<button\s+id="[^"]*stop[^"]*"\s+class="btn-launch"[^>]*>.*?</button>', re.IGNORECASE)

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    modified = False

    # 1. Remove separate stop buttons from HTML
    new_content, count = stop_btn_pattern.subn('', content)
    if count > 0:
        modified = True
    
    # 2. Update launchKali() JS
    if 'stopBtn.style.display = \'inline-block\';' in new_content:
        new_content = new_content.replace(
            "stopBtn.style.display = 'inline-block';",
            "btn.style.display = 'inline-block';\n            btn.textContent = 'Stop Kali';\n            btn.style.background = '#c0392b';\n            btn.onclick = stopKali;"
        )
        modified = True

    # Same for stop.style.display = 'inline-block';
    if "stop.style.display = 'inline-block';" in new_content:
        # Check if it's for target or kali
        new_content = new_content.replace(
            "stop.style.display = 'inline-block';",
            "btn.style.display = 'inline-block';\n            btn.textContent = 'Stop Machine';\n            btn.style.background = '#c0392b';\n            btn.onclick = (btn.id.includes('kali') ? stopKali : (typeof stopTarget === 'function' ? stopTarget : stopLab));"
        )
        modified = True

    # 3. Update stopKali() / stopTarget() JS
    # Usually it looks like: document.getElementById('kali-stop-btn').style.display = 'none';
    # Or document.getElementById('target-stop-btn').style.display = 'none';
    
    # Replace the reset of the launch button
    if "launchBtn.style.display = 'inline-block';" in new_content:
        new_content = re.sub(
            r"launchBtn\.textContent = '[^']+';",
            "launchBtn.textContent = 'Restart Machine ⇗';\n        launchBtn.style.background = '';\n        launchBtn.onclick = (launchBtn.id.includes('kali') ? launchKali : (typeof launchTarget === 'function' ? launchTarget : launchLab));",
            new_content
        )
        modified = True

    if "b.style.display = 'inline-block';" in new_content:
         new_content = re.sub(
            r"b\.textContent = '[^']+';",
            "b.textContent = 'Restart Machine ⇗';\n        b.style.background = '';\n        b.onclick = (b.id.includes('kali') ? launchKali : (typeof launchTarget === 'function' ? launchTarget : launchLab));",
            new_content
        )
         modified = True

    # Remove the code hiding the stop button since it's the same button now
    new_content = re.sub(r"document\.getElementById\('[^']*stop[^']*'\)\.style\.display = 'none';", "", new_content)
    
    # Also remove stop.style.display = 'none'; and stopBtn.style.display = 'none'; inside launch functions
    new_content = re.sub(r"stopBtn\.style\.display = 'none';", "", new_content)
    new_content = re.sub(r"stop\.style\.display = 'none';", "", new_content)
    
    if modified:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f'Fixed buttons in {filepath}')

