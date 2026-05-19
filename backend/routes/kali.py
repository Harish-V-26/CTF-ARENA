import random
import threading
from flask import jsonify, request
from . import kali_bp

# Connect to the local Docker daemon
from .docker_client import get_docker_client
client = get_docker_client()

cleanup_timers = {}


@kali_bp.route('/api/start-kali', methods=['POST'])
def start_kali():
    """Legacy: start a headless Kali container (no terminal UI)."""
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
            "message": "Kali container started."
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@kali_bp.route('/api/start-kali-terminal', methods=['POST'])
def start_kali_terminal():
    """
    Start a Kali Linux container with ttyd web terminal.
    Returns a port the browser can iframe directly.
    Optionally links it to a running DVWA container network.
    """
    if not client:
        return jsonify({"status": "error", "message": "Docker daemon is not running or accessible."}), 500

    try:
        # Pick a random host port for ttyd (7681 inside container)
        ttyd_port = random.randint(17000, 18000)

        # Optional: get DVWA container id from request to share network
        data = request.get_json(silent=True) or {}
        dvwa_container_id = data.get("dvwa_container_id")

        run_kwargs = dict(
            image="ctflabs/kali-terminal",
            detach=True,
            remove=True,
            ports={"7681/tcp": ttyd_port},
            # Give hacker user sudo without password for lab use
            cap_add=["NET_ADMIN"],
        )

        # If DVWA is running, add its container to /etc/hosts
        # by linking via the same user-defined bridge network (best effort)
        if dvwa_container_id:
            try:
                dvwa_c = client.containers.get(dvwa_container_id)
                dvwa_networks = dvwa_c.attrs.get("NetworkSettings", {}).get("Networks", {})
                dvwa_ip = None
                for net_info in dvwa_networks.values():
                    dvwa_ip = net_info.get("IPAddress")
                    if dvwa_ip:
                        break
                if dvwa_ip:
                    run_kwargs["extra_hosts"] = {"dvwa": dvwa_ip}
            except Exception:
                pass  # Non-critical: DVWA link is optional

        container = client.containers.run(**run_kwargs)

        return jsonify({
            "status": "success",
            "container_id": container.id,
            "port": ttyd_port,
            "message": f"Kali terminal running at port {ttyd_port}"
        })

    except docker.errors.ImageNotFound:
        return jsonify({
            "status": "error",
            "message": "Kali terminal image not found. Run: docker build -t ctflabs/kali-terminal ./docker/kali-terminal/"
        }), 500
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


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


@kali_bp.route('/api/stop-kali-delayed/<container_id>', methods=['POST'])
def stop_kali_delayed(container_id):
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
