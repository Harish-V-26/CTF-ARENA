import os
import glob

workspace = "/home/harishv26/Desktop/Csuite Project/CTF-LEARNING-WEBAPP/challenges"

html_files = glob.glob(os.path.join(workspace, "**", "*-guide.html"), recursive=True)
html_files += glob.glob(os.path.join(workspace, "**", "guide.html"), recursive=True)
html_files += glob.glob(os.path.join(workspace, "**", "*-hub.html"), recursive=True)

tracking_script = """
  <!-- COMPLETION TRACKING INJECTED -->
  <div style="text-align: center; margin: 40px 0; padding-bottom: 40px;">
    <button id="btn-complete-guide" onclick="markGuideComplete()" style="background: #2ecc71; color: white; border: none; padding: 12px 24px; font-size: 1.1em; border-radius: 6px; cursor: pointer; font-weight: bold; transition: background 0.3s;">Mark as Complete</button>
    <p id="completion-msg" style="display:none; color: #2ecc71; font-weight: bold; margin-top: 10px;">✓ Marked as Complete</p>
  </div>
  <script>
    function markGuideComplete() {
      if(window.ctfTrackCorrect) window.ctfTrackCorrect();
      if(window.ctfTrackRoomComplete) window.ctfTrackRoomComplete(document.title);
      document.getElementById('btn-complete-guide').style.display = 'none';
      document.getElementById('completion-msg').style.display = 'block';
    }
  </script>
"""

for filepath in html_files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    if "markGuideComplete" in content:
        continue # Already injected

    # Determine depth to construct path to js
    depth = filepath.replace(workspace, "").count(os.sep)
    prefix = "../" * (depth) + "js/" # E.g. web/easy/guide.html -> depth 2 -> ../../js/ (wait, challenges/web/easy/guide.html -> challenges is depth 1 relative to root, but the file is inside challenges. Actually, challenges/web/easy/guide.html is 3 levels deep from root.
    # Let's count depth relative to root. root is the webapp folder.
    # filepath = /.../CTF-LEARNING-WEBAPP/challenges/web/easy/guide.html
    # relative to CTF-LEARNING-WEBAPP:
    rel_path = os.path.relpath(filepath, "/home/harishv26/Desktop/Csuite Project/CTF-LEARNING-WEBAPP")
    depth = len(rel_path.split(os.sep)) - 1
    js_prefix = "../" * depth + "js/"

    # Check if scripts are already there
    scripts_to_add = ""
    if "firebase-config.js" not in content:
        scripts_to_add += f'\n  <script src="{js_prefix}firebase-config.js"></script>'
    if "auth-state.js" not in content:
        scripts_to_add += f'\n  <script src="{js_prefix}auth-state.js"></script>'
    if "analytics-tracker.js" not in content:
        scripts_to_add += f'\n  <script src="{js_prefix}analytics-tracker.js"></script>'

    # We want to inject before </body> or at the end if </body> is missing.
    if "</body>" in content:
        new_content = content.replace("</body>", f"{tracking_script}{scripts_to_add}\n</body>")
    else:
        new_content = content + f"\n{tracking_script}{scripts_to_add}"

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)
    
print(f"Processed {len(html_files)} files.")
