import docker
import random
from flask import Blueprint, jsonify
import os

idor_bp = Blueprint('idor_bp', __name__)

# Connect to Docker Desktop socket
_sock = os.path.expanduser("~/.docker/desktop/docker.sock")
try:
    client = docker.DockerClient(base_url=f"unix://{_sock}")
    client.ping()
except Exception:
    try:
        client = docker.from_env()
    except Exception:
        client = None

@idor_bp.route('/api/start-idor', methods=['POST'])
def start_idor():
    if not client:
        return jsonify({"status": "error", "message": "Docker daemon is not running."}), 500
    try:
        user_port = random.randint(9001, 9500)
        container = client.containers.run(
            "ctflabs/idor-lab:latest",
            detach=True,
            ports={'80/tcp': user_port},
            remove=True
        )
        return jsonify({"status": "success", "container_id": container.id, "port": user_port})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@idor_bp.route('/api/stop-idor/<container_id>', methods=['POST'])
def stop_idor(container_id):
    if not client:
        return jsonify({"status": "error", "message": "Docker not available"}), 500
    try:
        container = client.containers.get(container_id)
        container.stop()
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
