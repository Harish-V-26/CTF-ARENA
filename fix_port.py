with open('backend/routes/rooms.py', 'r') as f:
    content = f.read()
content = content.replace('127.0.0.1:5500', '127.0.0.1:5501')
with open('backend/routes/rooms.py', 'w') as f:
    f.write(content)
