import socket

def start_server():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    s.bind(("0.0.0.0", 21))
    s.listen(5)
    print("Vulnerable FTP Server listening on port 21...")
    
    while True:
        try:
            client, addr = s.accept()
            print(f"Connection from {addr}")
            client.send(b"220 FLAG{MSF_BEGINNER_COMPLETE}\r\n")
            client.close()
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    start_server()
