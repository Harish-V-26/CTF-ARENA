import docker
import random
from flask import jsonify, Blueprint
from .docker_client import get_docker_client

python_hacking_bp = Blueprint('python_hacking', __name__)
client = get_docker_client()

@python_hacking_bp.route('/api/start-python-hacking-target', methods=['POST'])
def start_python_hacking():
    global client
    if not client:
        client = get_docker_client()
    if not client:
        return jsonify({"status": "error", "message": "Docker not available"}), 500
    try:
        # Check if the image exists, otherwise build it
        try:
            client.images.get("ctflabs/python-hacking-target:latest")
        except docker.errors.ImageNotFound:
            client.images.build(path="./docker/python-hacking-target", tag="ctflabs/python-hacking-target:latest", rm=True, forcerm=True)

        container = client.containers.run(
            "ctflabs/python-hacking-target:latest",
            detach=True,
            ports={'5000/tcp': None},
            remove=True
        )
        container.reload()
        ports = container.attrs['NetworkSettings']['Ports']
        user_port = int(ports['5000/tcp'][0]['HostPort'])
        return jsonify({"status": "success", "container_id": container.id, "port": user_port})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@python_hacking_bp.route('/api/stop-python-hacking-target/<id>', methods=['POST'])
def stop_python_hacking(id):
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
