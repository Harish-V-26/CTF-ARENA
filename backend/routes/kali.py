import docker
import random
from flask import jsonify
from . import kali_bp

# Connect to the local Docker daemon
try:
    client = docker.from_env()
except Exception as e:
    print(f"Warning: Could not connect to Docker daemon: {e}")
    client = None

@kali_bp.route('/api/start-kali', methods=['POST'])
def start_kali():
    if not client:
        return jsonify({"status": "error", "message": "Docker daemon is not running or accessible."}), 500

    try:
        container = client.containers.run(
            "ctflabs/kali-web",
            command="tail -f /dev/null",
            detach=True,                  
            remove=True                   
        )
        
        return jsonify({
            "status": "success",
            "container_id": container.id,
            "message": "Kali container started. You can use 'docker exec -it <id> bash' to access it from the host for now."
        })
        
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@kali_bp.route('/api/stop-kali/<container_id>', methods=['POST'])
def stop_kali(container_id):
    if not client:
        return jsonify({"status": "error", "message": "Docker not available"}), 500
    try:
        container = client.containers.get(container_id)
        container.stop()
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
