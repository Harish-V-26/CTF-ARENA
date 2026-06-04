import random
from flask import jsonify
from . import dvwa_bp

# Connect to the local Docker daemon
from .docker_client import get_docker_client
client = get_docker_client()

@dvwa_bp.route('/api/start-dvwa', methods=['POST'])
def start_dvwa():
    if not client:
        return jsonify({"status": "error", "message": "Docker daemon is not running or accessible."}), 500

    try:
        container = client.containers.run(
            "vulnerables/web-dvwa",
            detach=True,
            ports={'80/tcp': None},
            remove=True
        )
        container.reload()
        ports = container.attrs['NetworkSettings']['Ports']
        user_port = int(ports['80/tcp'][0]['HostPort'])
        
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
