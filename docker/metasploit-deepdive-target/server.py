import http.server
import socketserver
import urllib.parse
import json
import base64

PORT = 80

class VulnerableHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        # Suppress logging to keep stdin/stdout clean
        return

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path

        if path == "/":
            self.send_response(200)
            self.send_header("Content-Type", "text/html")
            self.send_header("Server", "Vulnerable-Web-App/1.0 (SimplePython)")
            self.end_headers()
            self.wfile.write(b"""
            <html>
            <head>
                <title>SecureCorp Internal API Portal</title>
                <style>
                    body { background-color: #1e1e1e; color: #cfcfcf; font-family: 'Courier New', monospace; padding: 50px; }
                    h1 { color: #ff6b6b; }
                    .card { background-color: #2d2d2d; padding: 20px; border-radius: 5px; border-left: 5px solid #ff6b6b; margin-top: 20px; }
                    code { color: #f8f8f2; background-color: #111; padding: 3px 6px; border-radius: 3px; }
                </style>
            </head>
            <body>
                <h1>SecureCorp API Portal</h1>
                <div class="card">
                    <h3>System Diagnostic Status: ONLINE</h3>
                    <p>Welcome to the internal administrative dashboard. Only authorized network personnel are permitted to query diagnostics.</p>
                    <p>To run server-side health checks, use: <code>/api/diagnostics?cmd=ping</code></p>
                </div>
            </body>
            </html>
            """)
        elif path == "/api/diagnostics":
            query = urllib.parse.parse_qs(parsed_url.query)
            cmd = query.get("cmd", [None])[0]
            
            if not cmd:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Missing parameter 'cmd'"}).encode())
                return

            # Simulating command execution vulnerability.
            # In a real environment, this might execute actual OS commands,
            # but we simulate safe exploitation or lookups to deliver the flag.
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            
            # If the user tries to exploit or read etc:
            if "flag" in cmd.lower() or "cat" in cmd.lower() or ";" in cmd or "|" in cmd:
                response_data = {
                    "status": "success",
                    "output": "Simulated RCE Triggered: FLAG{MSF_D33P_D1V3_M4ST3R}",
                    "debug_info": "Warning: Command sanitization failed. Unauthorized command context executed."
                }
            elif cmd == "ping":
                response_data = {
                    "status": "success",
                    "output": "PING localhost (127.0.0.1) 56(84) bytes of data.\n64 bytes from localhost (127.0.0.1): icmp_seq=1 ttl=64 time=0.042 ms\n--- localhost ping statistics ---\n1 packets transmitted, 1 received, 0% packet loss"
                }
            else:
                response_data = {
                    "status": "success",
                    "output": f"Executing: {cmd}... Command succeeded.",
                    "note": "For security reasons, full outputs of commands other than 'ping' are masked in public logs unless debug mode is active."
                }
            
            self.wfile.write(json.dumps(response_data).encode())
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), VulnerableHandler) as httpd:
        print(f"Serving vulnerable target on port {PORT}...")
        httpd.serve_forever()
