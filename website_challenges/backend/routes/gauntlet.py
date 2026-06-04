import docker
import threading
from flask import Blueprint, jsonify
from .docker_client import get_docker_client

gauntlet_bp = Blueprint('gauntlet', __name__)
client = get_docker_client()
cleanup_timers = {}

@gauntlet_bp.route('/api/start-gauntlet-target', methods=['POST'])
def start_gauntlet():
    global client
    if not client:
        client = get_docker_client()
    if not client:
        return jsonify({"status": "error", "message": "Docker not available"}), 500
    try:
        # Build image if not present
        try:
            client.images.get("ctflabs/gauntlet-target:latest")
        except docker.errors.ImageNotFound:
            client.images.build(
                path="./docker/gauntlet-target",
                tag="ctflabs/gauntlet-target:latest",
                rm=True,
                forcerm=True
            )

        container = client.containers.run(
            "ctflabs/gauntlet-target:latest",
            detach=True,
            ports={
                '80/tcp':   8000,
                '21/tcp':   21,
                '8080/tcp': 8081,
                '9090/tcp': 9000,
            },
            remove=True
        )
        return jsonify({
            "status": "success",
            "container_id": container.id,
            "ports": {
                "http":   8000,
                "ftp":    21,
                "idor":   8081,
                "upload": 9000
            }
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@gauntlet_bp.route('/api/stop-gauntlet-target/<container_id>', methods=['POST'])
def stop_gauntlet(container_id):
    global client
    if not client:
        client = get_docker_client()
    if not client:
        return jsonify({"status": "error", "message": "Docker not available"}), 500
    if container_id in cleanup_timers:
        cleanup_timers[container_id].cancel()
        cleanup_timers.pop(container_id, None)
    try:
        container = client.containers.get(container_id)
        container.stop()
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
