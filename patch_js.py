import os, glob, re

files = glob.glob('challenges/**/*.html', recursive=True)

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    modified = False

    # 1. Prevent TypeError on any remaining getElementById for stop buttons
    if 'stop-btn\')' in content:
        # Instead of generic regex, let's target the exact lines in the restore logic
        
        # Target restore
        old_target_restore = """document.getElementById('target-launch-btn').style.display = 'none';
      document.getElementById('target-stop-btn').style.display = 'inline-block';"""
        new_target_restore = """const targetBtn = document.getElementById('target-launch-btn');
      if (targetBtn) {
          targetBtn.style.display = 'inline-block';
          targetBtn.textContent = 'Stop Machine';
          targetBtn.style.background = '#c0392b';
          targetBtn.onclick = (typeof stopTarget === 'function' ? stopTarget : stopLab);
      }"""
        if old_target_restore in content:
            content = content.replace(old_target_restore, new_target_restore)
            modified = True
            
        # Kali restore
        old_kali_restore = """document.getElementById('kali-launch-btn').style.display = 'none';
      document.getElementById('kali-stop-btn').style.display = 'inline-block';"""
        new_kali_restore = """const kaliBtn = document.getElementById('kali-launch-btn');
      if (kaliBtn) {
          kaliBtn.style.display = 'inline-block';
          kaliBtn.textContent = 'Stop Kali';
          kaliBtn.style.background = '#c0392b';
          kaliBtn.onclick = stopKali;
      }"""
        if old_kali_restore in content:
            content = content.replace(old_kali_restore, new_kali_restore)
            modified = True

        # Generic lab restore
        old_lab_restore = """document.getElementById('launch-btn').style.display = 'none';
      document.getElementById('stop-btn').style.display = 'inline-block';"""
        new_lab_restore = """const labBtn = document.getElementById('launch-btn');
      if (labBtn) {
          labBtn.style.display = 'inline-block';
          labBtn.textContent = 'Stop Machine';
          labBtn.style.background = '#c0392b';
          labBtn.onclick = stopLab;
      }"""
        if old_lab_restore in content:
            content = content.replace(old_lab_restore, new_lab_restore)
            modified = True

    # Also catch any other stop button style display assignments and neutralise them
    content = re.sub(r"document\.getElementById\('[^']*stop[^']*'\)\.style\.display = '[^']*';", "", content)
    
    if modified:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Patched {filepath}")

