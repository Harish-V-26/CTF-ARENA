import random
from flask import Blueprint, jsonify
from .docker_client import get_docker_client

csrf_bp = Blueprint('csrf_bp', __name__)
client = get_docker_client()

@csrf_bp.route('/api/start-csrf', methods=['POST'])
def start_csrf():
    if not client:
        return jsonify({"status": "error", "message": "Docker daemon is not running or accessible."}), 500
    try:
        container = client.containers.run(
            "ctflabs/csrf-lab:latest",
            detach=True,
            ports={'80/tcp': None},
            remove=True
        )
        container.reload()
        ports = container.attrs['NetworkSettings']['Ports']
        user_port = int(ports['80/tcp'][0]['HostPort'])
        return jsonify({"status": "success", "container_id": container.id, "port": user_port})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@csrf_bp.route('/api/stop-csrf/<container_id>', methods=['POST'])
def stop_csrf(container_id):
    if not client:
        return jsonify({"status": "error", "message": "Docker not available"}), 500
    try:
        container = client.containers.get(container_id)
        container.stop()
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
