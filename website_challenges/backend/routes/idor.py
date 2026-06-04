import docker
import random
from flask import Blueprint, jsonify
from .docker_client import get_docker_client

idor_bp = Blueprint('idor_bp', __name__)
client = get_docker_client()

@idor_bp.route('/api/start-idor', methods=['POST'])
def start_idor():
    global client
    if not client:
        client = get_docker_client()
    if not client:
        return jsonify({"status": "error", "message": "Docker daemon is not running."}), 500
    try:
        container = client.containers.run(
            "ctflabs/idor-lab:latest",
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
