import http.server
import socketserver
import json
from urllib.parse import parse_qs

PORT = 5000

class HackingTargetHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        # 1. Directory fuzzing check
        if self.path == '/':
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            html = """
            <html>
            <head><title>SecureCorp Employee Resource Portal</title></head>
            <body style="font-family: monospace; background: #0d1117; color: #58a6ff; text-align: center; padding-top: 10%;">
              <h1>SecureCorp - Employee Resource Portal</h1>
              <p>Security Warning: Unauthorized access is strictly prohibited and logged.</p>
              <p style="color: #8b949e;">Python Scripting Target Active on Port 5000</p>
            </body>
            </html>
            """
            self.wfile.write(html.encode('utf-8'))
        elif self.path == '/admin-login':
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            html = """
            <html>
            <head><title>Admin Login Panel</title></head>
            <body style="font-family: monospace; background: #161b22; color: #ff7b72; text-align: center; padding-top: 10%;">
              <h1>System Administrative Portal</h1>
              <form method="POST" action="/admin-login" style="display: inline-block; text-align: left; background: #0d1117; padding: 20px; border-radius: 8px; border: 1px solid #30363d;">
                <div style="margin-bottom: 10px;">
                  <label>Username:</label><br/>
                  <input type="text" name="username" style="background: #21262d; border: 1px solid #30363d; color: #c9d1d9; padding: 5px; border-radius: 4px;"/>
                </div>
                <div style="margin-bottom: 10px;">
                  <label>Password:</label><br/>
                  <input type="password" name="password" style="background: #21262d; border: 1px solid #30363d; color: #c9d1d9; padding: 5px; border-radius: 4px;"/>
                </div>
                <input type="submit" value="Login" style="background: #238636; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;"/>
              </form>
            </body>
            </html>
            """
            self.wfile.write(html.encode('utf-8'))
        elif self.path == '/robots.txt':
            self.send_response(200)
            self.send_header('Content-Type', 'text/plain')
            self.end_headers()
            self.wfile.write(b"User-agent: *\nDisallow: /admin-login\n")
        else:
            self.send_response(404)
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            self.wfile.write(b"404 Not Found")

    def do_POST(self):
        if self.path == '/admin-login':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            
            # Support both form submission and JSON API submission for brute-force scripting flexibility!
            username = None
            password = None
            
            # Check if JSON
            if self.headers.get('Content-Type') == 'application/json':
                try:
                    params = json.loads(post_data)
                    username = params.get('username')
                    password = params.get('password')
                except:
                    pass
            else:
                params = parse_qs(post_data)
                username = params.get('username', [None])[0]
                password = params.get('password', [None])[0]

            if username == 'admin' and password == 'pypower':
                self.send_response(200)
                self.send_header('Content-Type', 'text/html')
                self.end_headers()
                html = """
                <html>
                <head><title>Admin Dashboard</title></head>
                <body style="font-family: monospace; background: #0d1117; color: #56d364; text-align: center; padding-top: 10%;">
                  <h1>Welcome Administrator</h1>
                  <p style="font-size: 1.2rem; color: #f2cc60;">Authentication Successful!</p>
                  <p style="font-size: 1.5rem; background: #161b22; display: inline-block; padding: 10px 20px; border-radius: 6px; border: 1px dashed #56d364;">
                    Flag: <strong>CTF{py_h4ck_succ3ss_9210}</strong>
                  </p>
                </body>
                </html>
                """
                self.wfile.write(html.encode('utf-8'))
            else:
                self.send_response(401)
                self.send_header('Content-Type', 'text/html')
                self.end_headers()
                html = """
                <html>
                <head><title>Unauthorized</title></head>
                <body style="font-family: monospace; background: #0d1117; color: #f85149; text-align: center; padding-top: 10%;">
                  <h1>Invalid Credentials</h1>
                  <p>Incorrect username or password. Access Denied.</p>
                </body>
                </html>
                """
                self.wfile.write(html.encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Not Found")

if __name__ == '__main__':
    # Using TCPServer for raw socket handling
    class ForkingTCPServer(socketserver.ForkingMixIn, socketserver.TCPServer):
        pass

    ForkingTCPServer.allow_reuse_address = True
    with ForkingTCPServer(("0.0.0.0", PORT), HackingTargetHandler) as httpd:
        print(f"Target running on port {PORT}")
        httpd.serve_forever()
