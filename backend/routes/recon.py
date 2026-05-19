import docker
from flask import jsonify, Blueprint
from . import recon_bp
from .docker_client import get_docker_client

client = get_docker_client()

@recon_bp.route('/api/start-recon-target', methods=['POST'])
def start_recon():
    if not client:
        return jsonify({"status": "error", "message": "Docker not available"}), 500
    try:
        container = client.containers.run(
            "recon-ng:latest",
            detach=True,
            ports={'80/tcp': 80},
            remove=True
        )
        return jsonify({"status": "success", "container_id": container.id, "port": 80})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@recon_bp.route('/api/stop-recon-target/<id>', methods=['POST'])
def stop_recon(id):
    if not client: return jsonify({"status": "error"}), 500
    try:
        container = client.containers.get(id)
        container.stop()
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@recon_bp.route('/api/start-nmap-target', methods=['POST'])
def start_nmap_target():
    if not client:
        return jsonify({"status": "error", "message": "Docker not available"}), 500
    try:
        # Check if the image exists, otherwise build it
        try:
            client.images.get("ctflabs/nmap-target:latest")
        except docker.errors.ImageNotFound:
            client.images.build(path="./docker/nmap-target", tag="ctflabs/nmap-target:latest")

        container = client.containers.run(
            "ctflabs/nmap-target:latest",
            detach=True,
            ports={'80/tcp': 8880, '31337/tcp': 31337},
            remove=True
        )
        return jsonify({"status": "success", "container_id": container.id, "ports": {"80": 8880, "31337": 31337}})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@recon_bp.route('/api/stop-nmap-target/<id>', methods=['POST'])
def stop_nmap_target(id):
    if not client: return jsonify({"status": "error"}), 500
    try:
        container = client.containers.get(id)
        container.stop()
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

