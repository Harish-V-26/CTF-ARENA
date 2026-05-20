import docker
from flask import jsonify
from . import nmap_deepdive_bp
from .docker_client import get_docker_client

client = get_docker_client()

@nmap_deepdive_bp.route('/api/start-nmap-deepdive-target', methods=['POST'])
def start_nmap_deepdive_target():
    global client
    if not client:
        client = get_docker_client()
    if not client:
        return jsonify({"status": "error", "message": "Docker not available"}), 500
    try:
        try:
            client.images.get("ctflabs/nmap-deepdive-target:latest")
        except docker.errors.ImageNotFound:
            client.images.build(path="./docker/nmap-deepdive", tag="ctflabs/nmap-deepdive-target:latest")

        container = client.containers.run(
            "ctflabs/nmap-deepdive-target:latest",
            detach=True,
            ports={'80/tcp': 8881, '21/tcp': 2121, '54321/tcp': 54321},
            remove=True
        )
        return jsonify({"status": "success", "container_id": container.id, "ports": {"80": 8881, "21": 2121, "54321": 54321}})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@nmap_deepdive_bp.route('/api/stop-nmap-deepdive-target/<id>', methods=['POST'])
def stop_nmap_deepdive_target(id):
    global client
    if not client:
        client = get_docker_client()
    if not client: return jsonify({"status": "error"}), 500
    try:
        container = client.containers.get(id)
        container.stop()
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
