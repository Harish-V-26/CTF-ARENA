import docker
import random
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Connect to the local Docker daemon
try:
    client = docker.from_env()
except Exception as e:
    print(f"Warning: Could not connect to Docker daemon: {e}")
    client = None

@app.route('/api/start-dvwa', methods=['POST'])
def start_dvwa():
    if not client:
        return jsonify({"status": "error", "message": "Docker daemon is not running or accessible."}), 500

    try:
        # Generate a random port between 8000 and 9000 for this specific user
        user_port = random.randint(8000, 9000)
        
        # Start the container dynamically
        container = client.containers.run(
            "vulnerables/web-dvwa",
            detach=True,                  # Run in background
            ports={'80/tcp': user_port},  # Map container port 80 to the random user port
            remove=True                   # Automatically delete container when stopped
        )
        
        # Return the connection info to the frontend
        return jsonify({
            "status": "success",
            "container_id": container.id,
            "port": user_port
        })
        
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/stop-dvwa/<container_id>', methods=['POST'])
def stop_dvwa(container_id):
    if not client:
        return jsonify({"status": "error", "message": "Docker not available"}), 500
    try:
        container = client.containers.get(container_id)
        container.stop() # This automatically removes it because of remove=True
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    # Run the server
    app.run(host="0.0.0.0", port=5000, debug=True)
