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
                '80/tcp':   None,
                '21/tcp':   None,
                '8080/tcp': None,
                '9090/tcp': None,
            },
            remove=True
        )
        container.reload()
        ports = container.attrs['NetworkSettings']['Ports']
        http_port = int(ports['80/tcp'][0]['HostPort'])
        ftp_port = int(ports['21/tcp'][0]['HostPort'])
        idor_port = int(ports['8080/tcp'][0]['HostPort'])
        upload_port = int(ports['9090/tcp'][0]['HostPort'])
        return jsonify({
            "status": "success",
            "container_id": container.id,
            "ports": {
                "http":   http_port,
                "ftp":    ftp_port,
                "idor":   idor_port,
                "upload": upload_port
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
