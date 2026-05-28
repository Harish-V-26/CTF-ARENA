import socket
import threading
import sys
import sqlite3
import urllib.parse
import re

# Initialize SQLite database in memory
conn = sqlite3.connect(":memory:", check_same_thread=False)
cursor = conn.cursor()
cursor.execute("CREATE TABLE users (id INTEGER, username TEXT, password TEXT)")
cursor.execute("INSERT INTO users VALUES (1, 'admin', 'sqlmap_automated_injection_complete')")
cursor.execute("INSERT INTO users VALUES (2, 'guest', 'guestpassword')")
cursor.execute("INSERT INTO users VALUES (3, 'user', 'userpassword')")
conn.commit()

def handle_port_80(client_socket):
    try:
        request_data = client_socket.recv(4096).decode('utf-8', errors='ignore')
        if not request_data:
            return

        # Parse request line
        lines = request_data.split("\r\n")
        req_line = lines[0]
        match = re.match(r"^([A-Z]+)\s+([^\s\?]+)(\?[^\s]*)?\s+HTTP", req_line)
        if not match:
            return
        
        method, path, query_str = match.groups()
        query_params = {}
        if query_str:
            # strip leading ?
            query_str = query_str[1:]
            query_params = urllib.parse.parse_qs(query_str)

        # Route matching
        if path == "/":
            response_body = (
                "<html>\n"
                "<head><title>SecureCorp Internal Portal</title></head>\n"
                "<body style='font-family: monospace; background: #0d1117; color: #00ff41; padding: 50px; text-align: center;'>\n"
                "  <h1>SecureCorp Systems Administration</h1>\n"
                "  <p>Warning: Unauthorized access is strictly prohibited and logged.</p>\n"
                "  <hr style='border-color: #00ff41;'>\n"
                "  <p>Services available locally. Use authorized scanning tools to verify configurations.</p>\n"
                "</body>\n"
                "</html>\n"
            )
            send_html(client_socket, response_body)
            
        elif path == "/admin":
            response_body = (
                "<html>\n"
                "<head><title>Admin Dashboard</title></head>\n"
                "<body style='font-family: monospace; background: #0d1117; color: #e74c3c; padding: 50px;'>\n"
                "  <h1>SecureCorp Admin Control Room</h1>\n"
                "  <p style='color: #00ff41;'>Verification code discovered via directory brute forcing!</p>\n"
                "  <p style='font-size: 20px; font-weight: bold;'>Verification Code: dirb_admin_panel_unlocked</p>\n"
                "</body>\n"
                "</html>\n"
            )
            send_html(client_socket, response_body)

        elif path == "/backup" or path == "/backup/":
            response_body = (
                "<html>\n"
                "<head><title>Index of /backup</title></head>\n"
                "<body style='font-family: monospace; background: #0d1117; color: #58a6ff; padding: 50px;'>\n"
                "  <h1>Index of /backup</h1>\n"
                "  <hr>\n"
                "  <ul>\n"
                "    <li><a href='../'>Parent Directory</a></li>\n"
                "    <li><a href='config.bak' style='color: #00ff41;'>config.bak</a></li>\n"
                "  </ul>\n"
                "</body>\n"
                "</html>\n"
            )
            send_html(client_socket, response_body)

        elif path == "/backup/config.bak":
            response_body = (
                "[database]\n"
                "db_host = localhost\n"
                "db_name = secure_db\n"
                "db_user = db_admin\n"
                "db_pass = dirb_config_backup_leak\n"
                "\n"
                "[ssh]\n"
                "note = admin user has standard credentials. test using login tools.\n"
            )
            send_text(client_socket, response_body)

        elif path == "/view.php":
            # SQL Injection Endpoint
            id_val = query_params.get("id", [""])[0]
            
            # Intentionally vulnerable to SQL Injection via string interpolation
            # Using raw SQLite to execute the query
            response_html = (
                "<html>\n"
                "<head><title>User Profiles</title></head>\n"
                "<body style='font-family: monospace; background: #0d1117; color: #58a6ff; padding: 40px;'>\n"
                "  <h1>Search Employee Database</h1>\n"
                "  <form action='/view.php' method='GET'>\n"
                "    ID: <input type='text' name='id' style='background:#161b22; color:#fff; border:1px solid #30363d;' />\n"
                "    <input type='submit' value='Query' style='background:#238636; color:#fff; border:none; padding:4px 12px; cursor:pointer;' />\n"
                "  </form>\n"
                "  <hr style='border-color: #30363d;'>\n"
            )
            
            if id_val:
                try:
                    # Vulnerable query construction
                    query = f"SELECT id, username, password FROM users WHERE id = {id_val}"
                    cursor.execute(query)
                    rows = cursor.fetchall()
                    
                    if rows:
                        response_html += "  <table border='1' cellpadding='10' style='border-collapse: collapse; border-color: #30363d; min-width: 400px;'>\n"
                        response_html += "    <tr style='background: #161b22;'><th>ID</th><th>Username</th><th>Profile Info</th></tr>\n"
                        for row in rows:
                            # Note: we hide the direct password field unless queried, but SQL injection will dump it
                            response_html += f"    <tr><td>{row[0]}</td><td>{row[1]}</td><td>Status Active / Hash: {row[2][:12]}...</td></tr>\n"
                        response_html += "  </table>\n"
                    else:
                        response_html += "  <p style='color: #f85149;'>No records found.</p>\n"
                except Exception as e:
                    # Return detailed database errors to aid manual SQL injection
                    response_html += f"  <p style='color: #f85149;'>Database Error: {e}</p>\n"
            
            response_html += "</body>\n</html>\n"
            send_html(client_socket, response_html)

        else:
            # 404 Response
            response = (
                "HTTP/1.1 404 Not Found\r\n"
                "Content-Length: 0\r\n"
                "Connection: close\r\n\r\n"
            )
            client_socket.sendall(response.encode('utf-8'))
            
    except Exception as e:
        pass
    finally:
        client_socket.close()

def send_html(client_socket, body):
    response = (
        "HTTP/1.1 200 OK\r\n"
        "Server: Apache/2.4.41 (Unix)\r\n"
        "Content-Type: text/html\r\n"
        "Content-Length: {}\r\n"
        "Connection: close\r\n\r\n{}"
    ).format(len(body), body)
    client_socket.sendall(response.encode('utf-8'))

def send_text(client_socket, body):
    response = (
        "HTTP/1.1 200 OK\r\n"
        "Server: Apache/2.4.41 (Unix)\r\n"
        "Content-Type: text/plain\r\n"
        "Content-Length: {}\r\n"
        "Connection: close\r\n\r\n{}"
    ).format(len(body), body)
    client_socket.sendall(response.encode('utf-8'))

def run_port_80():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    try:
        server.bind(('0.0.0.0', 80))
        server.listen(5)
        while True:
            client, addr = server.accept()
            t = threading.Thread(target=handle_port_80, args=(client,))
            t.daemon = True
            t.start()
    except Exception as e:
        sys.exit(1)

def handle_port_4444(client_socket):
    try:
        banner = (
            "\n"
            "==========================================================\n"
            "   SecureCorp Netcat Remote Check System v1.2\n"
            "==========================================================\n"
            "  [+] Status: Socket Connection Established Successfully!\n"
            "  [+] Verification: netcat_connection_verified\n"
            "==========================================================\n"
            "\n"
        )
        client_socket.sendall(banner.encode('utf-8'))
    except Exception as e:
        pass
    finally:
        client_socket.close()

def run_port_4444():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    try:
        server.bind(('0.0.0.0', 4444))
        server.listen(5)
        while True:
            client, addr = server.accept()
            t = threading.Thread(target=handle_port_4444, args=(client,))
            t.daemon = True
            t.start()
    except Exception as e:
        sys.exit(1)

if __name__ == '__main__':
    t1 = threading.Thread(target=run_port_80)
    t2 = threading.Thread(target=run_port_4444)
    t1.daemon = True
    t2.daemon = True
    t1.start()
    t2.start()

    import time
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        sys.exit(0)
