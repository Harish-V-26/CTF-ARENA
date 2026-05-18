import random
from flask import jsonify
from . import kali_bp

# Connect to the local Docker daemon
from .docker_client import get_docker_client
client = get_docker_client()

@kali_bp.route('/api/start-kali', methods=['POST'])
def start_kali():
    if not client:
        return jsonify({"status": "error", "message": "Docker daemon is not running or accessible."}), 500

    try:
        container = client.containers.run(
            "ctflabs/kali-web",
            command="tail -f /dev/null",
            detach=True,                  
            remove=True                   
        )
        
        return jsonify({
            "status": "success",
            "container_id": container.id,
            "message": "Kali container started. You can use 'docker exec -it <id> bash' to access it from the host for now."
        })
        
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

import threading

cleanup_timers = {}

@kali_bp.route('/api/stop-kali-delayed/<container_id>', methods=['POST'])
def stop_kali_delayed(container_id):
    if not client:
        return jsonify({"status": "error"})
    
    if container_id in cleanup_timers:
        cleanup_timers[container_id].cancel()

    def kill_container():
        try:
            container = client.containers.get(container_id)
            container.stop()
        except Exception:
            pass
        cleanup_timers.pop(container_id, None)

    t = threading.Timer(5.0, kill_container)
    t.start()
    cleanup_timers[container_id] = t
    return jsonify({"status": "success"})

@kali_bp.route('/api/cancel-stop-kali/<container_id>', methods=['POST'])
def cancel_stop_kali(container_id):
    if container_id in cleanup_timers:
        cleanup_timers[container_id].cancel()
        cleanup_timers.pop(container_id, None)
    return jsonify({"status": "success"})

@kali_bp.route('/api/stop-kali/<container_id>', methods=['POST'])
def stop_kali(container_id):
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

