import sys

filepath = '/home/kavin/Desktop/CTF-LEARNING-WEBAPP/challenges/web/easy/brute-force-data.js'
with open(filepath, 'r') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    if 29 <= i <= 33:
        if i == 29:
            new_lines.append('<ul style=\"margin-top: 10px; margin-bottom: 15px; padding-left: 20px;\">\n')
            new_lines.append('  <li style=\"margin-bottom: 8px;\"><strong>hydra</strong>: This wakes up the robot program.</li>\n')
            new_lines.append('  <li style=\"margin-bottom: 8px;\"><strong>-l admin</strong>: The <strong>l</strong> (login). We are telling Hydra, \"Only try to log in to the account named <strong>admin</strong>.\"</li>\n')
            new_lines.append('  <li style=\"margin-bottom: 8px;\"><strong>-P /usr/share/.../rockyou.txt</strong>: The <strong>P</strong> (Password file). We give Hydra a giant dictionary book full of passwords to try.</li>\n')
            new_lines.append('  <li style=\"margin-bottom: 8px;\"><strong>&lt;Target_IP&gt;</strong>: This is the <em>address</em> of the target house we want to break into.</li>\n')
            new_lines.append('  <li style=\"margin-bottom: 8px;\"><strong>-s 5000</strong>: The <strong>s</strong> (server port). It tells Hydra exactly which door (port 5000) to knock on.</li>\n')
            new_lines.append('  <li style=\"margin-bottom: 8px;\"><strong>http-post-form</strong>: This tells Hydra what <em>kind</em> of door it is (a standard website login form).</li>\n')
            new_lines.append('  <li style=\"margin-bottom: 8px;\"><strong>\"/api/...:username=...:Invalid...\"</strong>: This is the secret map for the door. It has 3 parts separated by colons (:):\n')
            new_lines.append('    <br>1) <em>The URL</em>: <code>/api/brute-force-target</code> (where the form lives).\n')
            new_lines.append('    <br>2) <em>The Data</em>: <code>username=^USER^&amp;password=^PASS^</code> (Hydra plugs in the guesses here).\n')
            new_lines.append('    <br>3) <em>The Failure Message</em>: <code>Invalid username or password</code> (If Hydra sees this, it knows the guess failed and tries the next one!).\n')
            new_lines.append('  </li>\n')
            new_lines.append('</ul>`,\n')
        continue
    new_lines.append(line)

with open(filepath, 'w') as f:
    f.writelines(new_lines)
print('Successfully replaced lines in brute-force-data.js')
