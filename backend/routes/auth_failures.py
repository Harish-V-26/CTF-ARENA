import docker
import random
from flask import Blueprint, jsonify
from .docker_client import get_docker_client

auth_failures_bp = Blueprint('auth_failures_bp', __name__)
client = get_docker_client()

@auth_failures_bp.route('/api/start-auth-failures', methods=['POST'])
def start():
    global client
    if not client: client = get_docker_client()
    if not client: return jsonify({"status": "error", "message": "Docker daemon is not running."}), 500
    try:
        try: client.images.get("ctflabs/owasp-auth-failures:latest")
        except docker.errors.ImageNotFound:
            client.images.build(path="./docker/owasp-auth-failures", tag="ctflabs/owasp-auth-failures:latest", rm=True, forcerm=True)
        port = random.randint(9600, 9999)
        c = client.containers.run("ctflabs/owasp-auth-failures:latest", detach=True, ports={'80/tcp': port}, remove=True)
        return jsonify({"status": "success", "container_id": c.id, "port": port})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@auth_failures_bp.route('/api/stop-auth-failures/<container_id>', methods=['POST'])
def stop(container_id):
    global client
    if not client: client = get_docker_client()
    if not client: return jsonify({"status": "error", "message": "Docker not available"}), 500
    try:
        client.containers.get(container_id).stop()
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
