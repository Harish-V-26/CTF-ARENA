import base64
import json
import hmac
import hashlib
from flask import Blueprint, request, render_template_string, make_response

auth_basics_bp = Blueprint('auth_basics', __name__)

@auth_basics_bp.route('/api/auth-lab/login', methods=['GET', 'POST'])
def auth_lab_login():
    if request.method == 'POST':
        username = request.form.get('username', '')
        password = request.form.get('password', '')
        
        if username == 'admin' and password == 'admin123':
            # Create a simple JWT-like token
            header = base64.urlsafe_b64encode(json.dumps({"alg": "HS256", "typ": "JWT"}).encode()).decode().rstrip('=')
            payload = base64.urlsafe_b64encode(json.dumps({"user": "admin", "role": "admin", "flag": "flag{jwt_m4st3r_decoded}"}).encode()).decode().rstrip('=')
            signature = base64.urlsafe_b64encode(hmac.new(b's3cr3t_k3y', f"{header}.{payload}".encode(), hashlib.sha256).digest()).decode().rstrip('=')
            jwt_token = f"{header}.{payload}.{signature}"

            html = '''
            <html>
                <body style="background: #2c3e50; color: #ecf0f1; font-family: monospace; text-align: center; margin-top: 20%;">
                    <h1 style="color: #2ecc71;">Login Successful!</h1>
                    <p>Welcome back, admin.</p>
                    <p>Check your browser's Developer Tools (Application -> Cookies) to find your session and token!</p>
                </body>
            </html>
            '''
            resp = make_response(render_template_string(html))
            resp.set_cookie('session_id', 'sess_9f8a7b6c5d4e3f2a1b0c', httponly=False)
            resp.set_cookie('auth_token', jwt_token, httponly=False)
            return resp
        else:
            html = '''
            <html>
                <body style="background: #2c3e50; color: #ecf0f1; font-family: monospace; text-align: center; margin-top: 20%;">
                    <h1 style="color: #e74c3c;">Invalid credentials</h1>
                    <p>Incorrect username or password. Please check your spelling and try again.</p>
                    <a href="/api/auth-lab/login" style="color: #3498db;">Try Again</a>
                </body>
            </html>
            '''
            return make_response(render_template_string(html), 401)
            
    # GET request
    html = '''
    <html>
        <head>
            <title>Auth Target</title>
            <style>
                body { background: #2c3e50; color: #ecf0f1; font-family: monospace; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                .login-box { background: #34495e; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); text-align: center; width: 300px; }
                input { margin: 10px 0; padding: 10px; width: 100%; box-sizing: border-box; border: none; border-radius: 4px; }
                button { background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-size: 16px; margin-top: 15px; width: 100%;}
                button:hover { background: #2980b9; }
            </style>
        </head>
        <body>
            <div class="login-box">
                <h2>Secure Portal</h2>
                <form method="POST" action="/api/auth-lab/login">
                    <input type="text" name="username" placeholder="Username" required><br>
                    <input type="password" name="password" placeholder="Password" required><br>
                    <button type="submit">Login</button>
                </form>
            </div>
        </body>
    </html>
    '''
    return render_template_string(html)
