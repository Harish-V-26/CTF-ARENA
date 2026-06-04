import docker
import random
from flask import Blueprint, jsonify
from .docker_client import get_docker_client

error_handling_bp = Blueprint('error_handling_bp', __name__)
client = get_docker_client()

@error_handling_bp.route('/api/start-error-handling', methods=['POST'])
def start():
    global client
    if not client: client = get_docker_client()
    if not client: return jsonify({"status": "error", "message": "Docker daemon is not running."}), 500
    try:
        try: client.images.get("ctflabs/owasp-error-handling:latest")
        except docker.errors.ImageNotFound:
            client.images.build(path="./docker/owasp-error-handling", tag="ctflabs/owasp-error-handling:latest", rm=True, forcerm=True)
        c = client.containers.run("ctflabs/owasp-error-handling:latest", detach=True, ports={'80/tcp': None}, remove=True)
        c.reload()
        port = int(c.attrs['NetworkSettings']['Ports']['80/tcp'][0]['HostPort'])
        return jsonify({"status": "success", "container_id": c.id, "port": port})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@error_handling_bp.route('/api/stop-error-handling/<container_id>', methods=['POST'])
def stop(container_id):
    global client
    if not client: client = get_docker_client()
    if not client: return jsonify({"status": "error", "message": "Docker not available"}), 500
    try:
        client.containers.get(container_id).stop()
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
