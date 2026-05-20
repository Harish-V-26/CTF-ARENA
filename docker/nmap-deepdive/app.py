import socket
import threading
import sys

def handle_port_80(client_socket):
    try:
        request = client_socket.recv(1024).decode('utf-8', errors='ignore')
        response = (
            "HTTP/1.1 200 OK\r\n"
            "Server: SecureCorp-WebPortal/2.0\r\n"
            "Content-Type: text/html\r\n"
            "Connection: close\r\n\r\n"
            "<html>\n"
            "<head><title>SecureCorp Internal Portal v2.0</title></head>\n"
            "<body style='font-family: monospace; background: #0a0f0a; color: #00ff41; text-align: center; padding-top: 10%;'>\n"
            "  <h1>SecureCorp Internal Portal v2.0</h1>\n"
            "  <p>WARNING: Internal systems only. Unauthorized access is prohibited.</p>\n"
            "  <p style='color: #00cc33;'>Port 80: OPEN [HTTP]</p>\n"
            "</body>\n"
            "</html>\n"
        )
        client_socket.sendall(response.encode('utf-8'))
    except Exception:
        pass
    finally:
        client_socket.close()

def run_port_80():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    try:
        server.bind(('0.0.0.0', 80))
        server.listen(5)
        print("Port 80 listening...")
        while True:
            client, addr = server.accept()
            t = threading.Thread(target=handle_port_80, args=(client,))
            t.daemon = True
            t.start()
    except Exception as e:
        print(f"Error on port 80: {e}")
        sys.exit(1)

def handle_port_21(client_socket):
    try:
        client_socket.sendall(b"220 SecureCorp FTP | Flag Part 1: CTF{nm4p_d33p_\r\n")
        user_ok = False
        while True:
            data = client_socket.recv(1024).decode('utf-8', errors='ignore')
            if not data:
                break
            cmd = data.strip().upper()
            if cmd.startswith("USER"):
                parts = cmd.split(" ")
                if len(parts) > 1 and parts[1] == "ANONYMOUS":
                    user_ok = True
                    client_socket.sendall(b"331 Please specify the password.\r\n")
                else:
                    user_ok = False
                    client_socket.sendall(b"331 User name okay, password required.\r\n")
            elif cmd.startswith("PASS"):
                if user_ok:
                    client_socket.sendall(
                        b"230-Anonymous access granted.\r\n"
                        b"230-Flag Part 1: CTF{nm4p_d33p_\r\n"
                        b"230 Anonymous user logged in, proceed.\r\n"
                    )
                else:
                    client_socket.sendall(b"530 Login incorrect.\r\n")
            elif cmd.startswith("QUIT"):
                client_socket.sendall(b"221 Goodbye.\r\n")
                break
            elif cmd.startswith("SYST"):
                client_socket.sendall(b"215 UNIX Type: L8\r\n")
            elif cmd.startswith("FEAT"):
                client_socket.sendall(b"211-Features:\r\n211 End\r\n")
            else:
                client_socket.sendall(b"500 Syntax error, command unrecognized.\r\n")
    except Exception:
        pass
    finally:
        client_socket.close()

def run_port_21():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    try:
        server.bind(('0.0.0.0', 21))
        server.listen(5)
        print("Port 21 listening...")
        while True:
            client, addr = server.accept()
            t = threading.Thread(target=handle_port_21, args=(client,))
            t.daemon = True
            t.start()
    except Exception as e:
        print(f"Error on port 21: {e}")
        sys.exit(1)

def handle_port_54321(client_socket):
    try:
        msg = "SECURE-PORTAL | Flag Part 2: d1v3_m4st3r}\n"
        client_socket.sendall(msg.encode('utf-8'))
    except Exception:
        pass
    finally:
        client_socket.close()

def run_port_54321():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    try:
        server.bind(('0.0.0.0', 54321))
        server.listen(5)
        print("Port 54321 listening...")
        while True:
            client, addr = server.accept()
            t = threading.Thread(target=handle_port_54321, args=(client,))
            t.daemon = True
            t.start()
    except Exception as e:
        print(f"Error on port 54321: {e}")
        sys.exit(1)

if __name__ == '__main__':
    t1 = threading.Thread(target=run_port_80)
    t2 = threading.Thread(target=run_port_21)
    t3 = threading.Thread(target=run_port_54321)
    t1.daemon = True
    t2.daemon = True
    t3.daemon = True
    t1.start()
    t2.start()
    t3.start()
    
    import time
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("Exiting...")
