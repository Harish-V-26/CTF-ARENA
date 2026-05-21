import os
import re

# Regex to match emojis (this is a simplified range for emojis)
emoji_pattern = re.compile(
    "["
    "\U0001f600-\U0001f64f"  # emoticons
    "\U0001f300-\U0001f5ff"  # symbols & pictographs
    "\U0001f680-\U0001f6ff"  # transport & map symbols
    "\U0001f1e0-\U0001f1ff"  # flags (iOS)
    "\U00002702-\U000027b0"
    "\U000024c2-\U0001f251"
    "\u2b50"
    "\u2600-\u26ff"
    "]+", flags=re.UNICODE)

def remove_emojis_from_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = emoji_pattern.sub(r'', content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Removed emojis from {filepath}")

for root, dirs, files in os.walk('challenges'):
    for file in files:
        if file.endswith('.js') or file.endswith('.html'):
            remove_emojis_from_file(os.path.join(root, file))

print("Done")
