import socket
import threading
import sys

def handle_port_80(client_socket):
    try:
        request = client_socket.recv(1024).decode('utf-8', errors='ignore')
        response = (
            "HTTP/1.1 200 OK\r\n"
            "Server: SecureCorp-WebPortal/2.4\r\n"
            "Content-Type: text/html\r\n"
            "Connection: close\r\n\r\n"
            "<html>\n"
            "<head><title>SecureCorp Portal</title></head>\n"
            "<body style='font-family: monospace; background: #0d1117; color: #58a6ff; text-align: center; padding-top: 10%;'>\n"
            "  <h1>SecureCorp Public Portal</h1>\n"
            "  <p>All network activities are logged and monitored.</p>\n"
            "  <p style='color: #8b949e;'>Port 80: OPEN [HTTP]</p>\n"
            "</body>\n"
            "</html>\n"
        )
        client_socket.sendall(response.encode('utf-8'))
    except Exception as e:
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

def handle_port_31337(client_socket):
    try:
        # Send flag upon connection
        msg = (
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
            "🔓 SecureCorp Internal Flag Server 1.0\n"
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
            "Access Granted.\n\n"
            "Flag: CTF{n4v1g4t1ng_p0rts_w1th_nm4p}\n"
            "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
        )
        client_socket.sendall(msg.encode('utf-8'))
    except Exception as e:
        pass
    finally:
        client_socket.close()

def run_port_31337():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    try:
        server.bind(('0.0.0.0', 31337))
        server.listen(5)
        print("Port 31337 listening...")
        while True:
            client, addr = server.accept()
            t = threading.Thread(target=handle_port_31337, args=(client,))
            t.daemon = True
            t.start()
    except Exception as e:
        print(f"Error on port 31337: {e}")
        sys.exit(1)

if __name__ == '__main__':
    t1 = threading.Thread(target=run_port_80)
    t2 = threading.Thread(target=run_port_31337)
    t1.daemon = True
    t2.daemon = True
    t1.start()
    t2.start()
    
    # Keep main thread alive
    import time
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("Exiting...")
