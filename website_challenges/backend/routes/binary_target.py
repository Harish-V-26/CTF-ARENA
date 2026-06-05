from flask import Blueprint, jsonify
import docker
import socket
import os

binary_target_bp = Blueprint('binary_target', __name__)
client = docker.from_env()

def get_free_port():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('', 0))
    port = s.getsockname()[1]
    s.close()
    return port

@binary_target_bp.route('/api/start-binary', methods=['POST'])
def start_binary():
    try:
        try:
            client.images.get('binary-target-image')
        except docker.errors.ImageNotFound:
            dockerfile_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../docker/binary-target'))
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
    try:
        container = client.containers.get(container_id)
        container.stop()
        return jsonify({'status': 'success'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
