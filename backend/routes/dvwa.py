import docker
import random
from flask import jsonify
from . import dvwa_bp

# Connect to the local Docker daemon
try:
    client = docker.from_env()
except Exception as e:
    print(f"Warning: Could not connect to Docker daemon: {e}")
    client = None

@dvwa_bp.route('/api/start-dvwa', methods=['POST'])
def start_dvwa():
    if not client:
        return jsonify({"status": "error", "message": "Docker daemon is not running or accessible."}), 500

    try:
        user_port = random.randint(8000, 9000)
        
        container = client.containers.run(
            "vulnerables/web-dvwa",
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

import threading

# Dictionary to hold timers
cleanup_timers = {}

@dvwa_bp.route('/api/stop-dvwa-delayed/<container_id>', methods=['POST'])
def stop_dvwa_delayed(container_id):
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

@dvwa_bp.route('/api/cancel-stop-dvwa/<container_id>', methods=['POST'])
def cancel_stop_dvwa(container_id):
    if container_id in cleanup_timers:
        cleanup_timers[container_id].cancel()
        cleanup_timers.pop(container_id, None)
    return jsonify({"status": "success"})

@dvwa_bp.route('/api/stop-dvwa/<container_id>', methods=['POST'])
def stop_dvwa(container_id):
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
