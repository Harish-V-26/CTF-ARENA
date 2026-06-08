from flask import Blueprint, jsonify
import docker
import socket
import os
from .docker_client import get_docker_client

binary_target_bp = Blueprint('binary_target', __name__)
client = get_docker_client()

def get_free_port():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('', 0))
    port = s.getsockname()[1]
    s.close()
    return port

@binary_target_bp.route('/api/start-binary', methods=['POST'])
def start_binary():
    global client
    if not client:
        client = get_docker_client()
    if not client:
        return jsonify({"status": "error", "message": "Docker daemon is not running."}), 500
        
    try:
        try:
            client.images.get('binary-target-image')
        except docker.errors.ImageNotFound:
            dockerfile_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../docker/binary-target'))
            client.images.build(path=dockerfile_path, tag='binary-target-image', rm=True)

        port = get_free_port()
        container = client.containers.run(
            'binary-target-image',
            detach=True,
            ports={'80/tcp': port},
            remove=True
        )
        return jsonify({'status': 'success', 'container_id': container.id, 'port': port})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@binary_target_bp.route('/api/stop-binary/<container_id>', methods=['POST'])
def stop_binary(container_id):
    global client
    if not client:
        client = get_docker_client()
    if not client:
        return jsonify({"status": "error", "message": "Docker not available"}), 500
    try:
        container = client.containers.get(container_id)
        container.stop()
        return jsonify({'status': 'success'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

cleanup_timers = {}

@binary_target_bp.route('/api/stop-binary-delayed/<container_id>', methods=['POST'])
def stop_binary_delayed(container_id):
    global client
    if not client:
        return jsonify({"status": "error"})
    if container_id in cleanup_timers:
        cleanup_timers[container_id].cancel()

    def kill_container():
        try:
            c = client.containers.get(container_id)
            c.stop()
        except Exception:
            pass
        cleanup_timers.pop(container_id, None)

    import threading
    t = threading.Timer(5.0, kill_container)
    t.start()
    cleanup_timers[container_id] = t
    return jsonify({"status": "success"})

@binary_target_bp.route('/api/cancel-stop-binary/<container_id>', methods=['POST'])
def cancel_stop_binary(container_id):
    if container_id in cleanup_timers:
        cleanup_timers[container_id].cancel()
        cleanup_timers.pop(container_id, None)
    return jsonify({"status": "success"})
