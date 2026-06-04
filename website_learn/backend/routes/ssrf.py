import docker
import random
import os
from flask import Blueprint, jsonify
from .docker_client import get_docker_client

ssrf_bp = Blueprint('ssrf_bp', __name__)
client = get_docker_client()

@ssrf_bp.route('/api/start-ssrf', methods=['POST'])
def start_ssrf():
    global client
    if not client:
        client = get_docker_client()
    if not client:
        return jsonify({"status": "error", "message": "Docker daemon is not running."}), 500
        
    try:
        # Build image if not present
        try:
            client.images.get("ctflabs/ssrf-lab:latest")
        except docker.errors.ImageNotFound:
            # Path to the build context (which is root of repo, but let's build from relative docker/ssrf-lab)
            client.images.build(
                path="./docker/ssrf-lab",
                tag="ctflabs/ssrf-lab:latest",
                rm=True,
                forcerm=True
            )

        container = client.containers.run(
            "ctflabs/ssrf-lab:latest",
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

@ssrf_bp.route('/api/stop-ssrf/<container_id>', methods=['POST'])
def stop_ssrf(container_id):
    global client
    if not client:
        client = get_docker_client()
    if not client:
        return jsonify({"status": "error", "message": "Docker not available"}), 500
    try:
        container = client.containers.get(container_id)
        container.stop()
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
