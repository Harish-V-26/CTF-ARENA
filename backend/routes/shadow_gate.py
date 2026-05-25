import random
import threading
from flask import Blueprint, jsonify
from .docker_client import get_docker_client

shadow_gate_bp = Blueprint('shadow_gate_bp', __name__)
client = get_docker_client()

cleanup_timers = {}

@shadow_gate_bp.route('/api/start-shadow-gate', methods=['POST'])
def start_shadow_gate():
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
        
        # Inject the Master Flag into the container
        # We put it in /tmp so www-data (the web server user) can read it when they get a shell
        container.exec_run('sh -c "echo \'CTF{shadow_g4t3_m4st3r_br3ach3d}\' > /tmp/master.flag"')
        
        return jsonify({
            "status": "success",
            "container_id": container.id,
            "port": user_port
        })
        
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@shadow_gate_bp.route('/api/stop-shadow-gate-delayed/<container_id>', methods=['POST'])
def stop_shadow_gate_delayed(container_id):
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

@shadow_gate_bp.route('/api/cancel-stop-shadow-gate/<container_id>', methods=['POST'])
def cancel_stop_shadow_gate(container_id):
    if container_id in cleanup_timers:
        cleanup_timers[container_id].cancel()
        cleanup_timers.pop(container_id, None)
    return jsonify({"status": "success"})

@shadow_gate_bp.route('/api/stop-shadow-gate/<container_id>', methods=['POST'])
def stop_shadow_gate(container_id):
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
