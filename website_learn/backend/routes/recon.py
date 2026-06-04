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
            ports={'80/tcp': None},
            remove=True
        )
        container.reload()
        ports = container.attrs['NetworkSettings']['Ports']
        user_port = int(ports['80/tcp'][0]['HostPort'])
        return jsonify({"status": "success", "container_id": container.id, "port": user_port})
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


