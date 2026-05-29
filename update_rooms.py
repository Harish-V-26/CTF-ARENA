import json

with open("backend/routes/rooms.py", "r") as f:
    content = f.read()

with open("template_rooms.py", "r") as f:
    template = f.read()

# get the template part
template_part = template.replace('def get_room_html(room):\n', '').strip()

prefix = content[:content.find("    # Basic HTML template")]
suffix = "    return render_template_string(html)\n"

new_content = prefix + template_part + "\n" + suffix

with open("backend/routes/rooms.py", "w") as f:
    f.write(new_content)

