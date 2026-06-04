import random
import threading
import docker
from flask import Blueprint, jsonify
from .docker_client import get_docker_client

owasp_part2_ctf_bp = Blueprint('owasp_part2_ctf_bp', __name__)
client = get_docker_client()

cleanup_timers = {}

@owasp_part2_ctf_bp.route('/api/start-owasp-part2-ctf', methods=['POST'])
def start_owasp_part2_ctf():
    global client
    if not client:
        client = get_docker_client()
    if not client:
        return jsonify({"status": "error", "message": "Docker daemon is not running or accessible."}), 500

    try:
        # Build owasp-part2-ctf image if not present
        try:
            client.images.get("ctflabs/owasp-part2-ctf:latest")
        except docker.errors.ImageNotFound:
            client.images.build(
                path="./docker/owasp-part2-ctf",
                tag="ctflabs/owasp-part2-ctf:latest",
                rm=True,
                forcerm=True
            )

        # Run container with dynamic port allocation for 80/tcp
        container = client.containers.run(
            "ctflabs/owasp-part2-ctf:latest",
            detach=True,
            ports={'80/tcp': None},
            remove=True
        )
        
        # Reload container attributes to populate ports
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

@owasp_part2_ctf_bp.route('/api/stop-owasp-part2-ctf-delayed/<container_id>', methods=['POST'])
def stop_owasp_part2_ctf_delayed(container_id):
    global client
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

@owasp_part2_ctf_bp.route('/api/cancel-stop-owasp-part2-ctf/<container_id>', methods=['POST'])
def cancel_stop_owasp_part2_ctf(container_id):
    if container_id in cleanup_timers:
        cleanup_timers[container_id].cancel()
        cleanup_timers.pop(container_id, None)
    return jsonify({"status": "success"})

@owasp_part2_ctf_bp.route('/api/stop-owasp-part2-ctf/<container_id>', methods=['POST'])
def stop_owasp_part2_ctf(container_id):
    global client
    if not client:
        return jsonify({"status": "error", "message": "Docker not available"}), 500
    
    if container_id in cleanup_timers:
        cleanup_timers[container_id].cancel()
        cleanup_timers.pop(container_id, None)

    try:
        container = client.containers.get(container_id)
        container.stop()
        return jsonify({"status": "success"})
    except docker.errors.NotFound:
        return jsonify({"status": "success", "message": "Container already stopped."})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
