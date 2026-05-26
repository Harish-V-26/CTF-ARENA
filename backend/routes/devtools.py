import random
from flask import jsonify
from . import devtools_bp

# Connect to the local Docker daemon
from .docker_client import get_docker_client
client = get_docker_client()

# ── DevTools Guided Practice Lab ──
@devtools_bp.route('/api/start-devtools-guided', methods=['POST'])
def start_devtools_guided():
    if not client:
        return jsonify({"status": "error", "message": "Docker daemon is not running or accessible."}), 500

    try:
        user_port = random.randint(9001, 9500)

        container = client.containers.run(
            "ctflabs/devtools-guided:latest",
            detach=True,
            ports={'80/tcp': user_port},
            remove=True
        )

        return jsonify({
            "status": "success",
            "container_id": container.id,
            "port": user_port
        })

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@devtools_bp.route('/api/stop-devtools-guided/<container_id>', methods=['POST'])
def stop_devtools_guided(container_id):
    if not client:
        return jsonify({"status": "error", "message": "Docker not available"}), 500
    try:
        container = client.containers.get(container_id)
        container.stop()
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# ── DevTools Field Test Lab ──
@devtools_bp.route('/api/start-devtools-fieldtest', methods=['POST'])
def start_devtools_fieldtest():
    if not client:
        return jsonify({"status": "error", "message": "Docker daemon is not running or accessible."}), 500

    try:
        user_port = random.randint(9501, 9999)

        container = client.containers.run(
            "ctflabs/devtools-fieldtest:latest",
            detach=True,
            ports={'80/tcp': user_port},
            remove=True
        )

        return jsonify({
            "status": "success",
            "container_id": container.id,
            "port": user_port
        })

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@devtools_bp.route('/api/stop-devtools-fieldtest/<container_id>', methods=['POST'])
def stop_devtools_fieldtest(container_id):
    if not client:
        return jsonify({"status": "error", "message": "Docker not available"}), 500
    try:
        container = client.containers.get(container_id)
        container.stop()
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
