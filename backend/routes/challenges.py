from flask import request, render_template_string
from . import challenges_bp

@challenges_bp.route('/api/brute-force-target', methods=['GET', 'POST'])
def brute_force_target():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        if username == 'admin' and password == 'qwerty':
            return render_template_string('''
            <html>
                <body style="background: #2c3e50; color: #ecf0f1; font-family: monospace; text-align: center; margin-top: 20%;">
                    <h1 style="color: #2ecc71;">Login Successful!</h1>
                    <h2>Flag: CTF{brut3_f0rc3_m4st3r}</h2>
                </body>
            </html>
            ''')
        else:
            return render_template_string('''
            <html>
                <body style="background: #2c3e50; color: #ecf0f1; font-family: monospace; text-align: center; margin-top: 20%;">
                    <h1 style="color: #e74c3c;">Invalid username or password</h1>
                    <a href="/api/brute-force-target" style="color: #3498db;">Try Again</a>
                </body>
            </html>
            '''), 401
    
    return render_template_string('''
    <html>
        <head>
            <title>Target Login</title>
            <style>
                body { background: #2c3e50; color: #ecf0f1; font-family: monospace; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                .login-box { background: #34495e; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); text-align: center; }
                input { margin: 10px 0; padding: 10px; width: 100%; box-sizing: border-box; border: none; border-radius: 4px; }
                button { background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-size: 16px; margin-top: 15px;}
                button:hover { background: #2980b9; }
            </style>
        </head>
        <body>
            <div class="login-box">
                <h2>Admin Portal Login</h2>
                <p style="color: #95a5a6; font-size: 0.9em; margin-bottom: 20px;">Use your Kali Linux tools (Hydra, Burp Suite) to break in.</p>
                <form method="POST" action="/api/brute-force-target">
                    <input type="text" name="username" placeholder="Username" required><br>
                    <input type="password" name="password" placeholder="Password" required><br>
                    <button type="submit">Login</button>
                </form>
            </div>
        </body>
    </html>
    ''')
