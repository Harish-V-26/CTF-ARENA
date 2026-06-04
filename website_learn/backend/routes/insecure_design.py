import docker
import random
from flask import Blueprint, jsonify
from .docker_client import get_docker_client

insecure_design_bp = Blueprint('insecure_design_bp', __name__)
client = get_docker_client()

@insecure_design_bp.route('/api/start-insecure-design', methods=['POST'])
def start():
    global client
    if not client: client = get_docker_client()
    if not client: return jsonify({"status": "error", "message": "Docker daemon is not running."}), 500
    try:
        try: client.images.get("ctflabs/owasp-insecure-design:latest")
        except docker.errors.ImageNotFound:
            client.images.build(path="./docker/owasp-insecure-design", tag="ctflabs/owasp-insecure-design:latest", rm=True, forcerm=True)
        c = client.containers.run("ctflabs/owasp-insecure-design:latest", detach=True, ports={'80/tcp': None}, remove=True)
        c.reload()
        port = int(c.attrs['NetworkSettings']['Ports']['80/tcp'][0]['HostPort'])
        return jsonify({"status": "success", "container_id": c.id, "port": port})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@insecure_design_bp.route('/api/stop-insecure-design/<container_id>', methods=['POST'])
def stop(container_id):
    global client
    if not client: client = get_docker_client()
    if not client: return jsonify({"status": "error", "message": "Docker not available"}), 500
    try:
        client.containers.get(container_id).stop()
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
