import random
import threading
import docker
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
        # Build mega-sandbox image if not present
        try:
            client.images.get("ctflabs/mega-sandbox:latest")
        except docker.errors.ImageNotFound:
            client.images.build(
                path="./docker/mega-sandbox",
                tag="ctflabs/mega-sandbox:latest",
                rm=True,
                forcerm=True
            )

        # Run container with dynamic port allocation for 80, 21, and 22
        container = client.containers.run(
            "ctflabs/mega-sandbox:latest",
            detach=True,
            ports={
                '80/tcp': None,
                '21/tcp': None,
                '22/tcp': None
            },
            remove=True
        )
        
        # Reload container attributes to populate ports
        container.reload()
        ports = container.attrs['NetworkSettings']['Ports']
        
        user_port_web = int(ports['80/tcp'][0]['HostPort'])
        user_port_ftp = int(ports['21/tcp'][0]['HostPort'])
        user_port_ssh = int(ports['22/tcp'][0]['HostPort'])
        
        # Inject the Master Flag into the container
        container.exec_run('sh -c "mkdir -p /tmp && echo \'CTF{nmap_f1rst_st3p_h1dd3n_in_source_brut3_f0rc3_pass_sql_inj3ct_dat4_1dor_priv_esc_rce_syst3m_gained}\' > /tmp/master.flag"')
        
        return jsonify({
            "status": "success",
            "container_id": container.id,
            "ports": {
                "web": user_port_web,
                "ftp": user_port_ftp,
                "ssh": user_port_ssh
            }
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
    except docker.errors.NotFound:
        return jsonify({"status": "success", "message": "Container already stopped."})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
