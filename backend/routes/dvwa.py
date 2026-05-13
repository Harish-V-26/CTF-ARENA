import docker
import random
from flask import jsonify
from . import dvwa_bp

# Connect to the local Docker daemon
try:
    client = docker.from_env()
except Exception as e:
    print(f"Warning: Could not connect to Docker daemon: {e}")
    client = None

@dvwa_bp.route('/api/start-dvwa', methods=['POST'])
def start_dvwa():
    if not client:
        return jsonify({"status": "error", "message": "Docker daemon is not running or accessible."}), 500

    try:
        user_port = random.randint(8000, 9000)
        
        container = client.containers.run(
            "vulnerables/web-dvwa",
            detach=True,
            ports={'80/tcp': user_port},
            remove=True
        )
        
        return jsonify({
            "status": "success",
            "container_id": container.id,
            "port": user_port
        })
        
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@dvwa_bp.route('/api/stop-dvwa/<container_id>', methods=['POST'])
def stop_dvwa(container_id):
    if not client:
        return jsonify({"status": "error", "message": "Docker not available"}), 500
    try:
        container = client.containers.get(container_id)
        container.stop()
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
