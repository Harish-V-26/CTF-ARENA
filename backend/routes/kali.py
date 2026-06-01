import docker
import random
import threading
import docker
from flask import jsonify, request
from . import kali_bp

# Dynamic Docker client proxy to avoid caching connection failures on startup
class DockerClientProxy:
    @property
    def _client(self):
        from .docker_client import get_docker_client
        return get_docker_client()

    def __getattr__(self, name):
        c = self._client
        if not c:
            raise RuntimeError("Docker daemon is not running or accessible.")
        return getattr(c, name)

    def __bool__(self):
        return self._client is not None

client = DockerClientProxy()


cleanup_timers = {}


@kali_bp.route('/api/start-kali', methods=['POST'])
def start_kali():
    """Start a headless Kali container and its associated target container."""
    if not client:
        return jsonify({"status": "error", "message": "Docker daemon is not running or accessible."}), 500
    try:
        # Resolve absolute paths to avoid working directory issues
        import os
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        kali_path = os.path.join(base_dir, "kalilinux")
        target_path = os.path.join(base_dir, "docker", "kali-advance-target")

        # Build the custom kali-rolling image if it does not exist locally
        try:
            client.images.get("kali-rolling:latest")
        except docker.errors.ImageNotFound:
            client.images.build(path=kali_path, tag="kali-rolling:latest", rm=True, forcerm=True)

        # Build the custom target image if it does not exist locally
        try:
            client.images.get("kali-advance-target:latest")
        except docker.errors.ImageNotFound:
            client.images.build(path=target_path, tag="kali-advance-target:latest", rm=True, forcerm=True)


        # Start the target container
        target_container = client.containers.run(
            "kali-advance-target:latest",
            detach=True,
            remove=True
        )
        target_container.reload()

        target_ip = "Unknown"
        networks = target_container.attrs.get("NetworkSettings", {}).get("Networks", {})
        for net_info in networks.values():
            ip = net_info.get("IPAddress")
            if ip:
                target_ip = ip
                break

        # Start the Kali container
        container = client.containers.run(
            "kali-rolling:latest",
            command="tail -f /dev/null",
            detach=True,
            remove=True,
            extra_hosts={"host.docker.internal": "host-gateway", "target.local": target_ip}, cap_add=["NET_ADMIN", "NET_RAW"]
        )

        return jsonify({
            "status": "success",
            "container_id": container.id,
            "target_container_id": target_container.id,
            "target_ip": target_ip,
            "message": "Kali container and target started."
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@kali_bp.route('/api/stop-kali/<container_id>', methods=['POST'])
def stop_kali(container_id):
    if not client:
        return jsonify({"status": "error", "message": "Docker not available."}), 500
    try:
        container = client.containers.get(container_id)
        container.stop()
        return jsonify({"status": "success"})
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
            extra_hosts={"host.docker.internal": "host-gateway"},
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
                    run_kwargs["extra_hosts"]["dvwa"] = dvwa_ip
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


@kali_bp.route('/api/start-kali-advance-target', methods=['POST'])
def start_kali_advance_target():
    if not client:
        return jsonify({"status": "error", "message": "Docker daemon is not running or accessible."}), 500
    try:
        import os
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        target_path = os.path.join(base_dir, "docker", "kali-advance-target")

        # Build the custom target image if it does not exist locally
        try:
            client.images.get("kali-advance-target:latest")
        except docker.errors.ImageNotFound:
            client.images.build(path=target_path, tag="kali-advance-target:latest", rm=True, forcerm=True)

        web_port = random.randint(18000, 19000)
        nc_port = random.randint(19001, 20000)

        target_container = client.containers.run(
            "kali-advance-target:latest",
            detach=True,
            remove=True,
            ports={"80/tcp": web_port, "4444/tcp": nc_port}
        )
        target_container.reload()

        target_ip = "Unknown"
        networks = target_container.attrs.get("NetworkSettings", {}).get("Networks", {})
        for net_info in networks.values():
            ip = net_info.get("IPAddress")
            if ip:
                target_ip = ip
                break

        return jsonify({
            "status": "success",
            "container_id": target_container.id,
            "target_ip": target_ip,
            "web_port": web_port,
            "nc_port": nc_port
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@kali_bp.route('/api/stop-kali-advance-target/<container_id>', methods=['POST'])
def stop_kali_advance_target(container_id):
    if not client:
        return jsonify({"status": "error", "message": "Docker not available."}), 500
    if container_id in cleanup_timers:
        cleanup_timers[container_id].cancel()
        cleanup_timers.pop(container_id, None)
    try:
        container = client.containers.get(container_id)
        container.stop()
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@kali_bp.route('/api/start-kali-advance-kali', methods=['POST'])
def start_kali_advance_kali():
    if not client:
        return jsonify({"status": "error", "message": "Docker daemon not available."}), 500
    try:
        data = request.get_json() or {}
        target_ip = data.get("target_ip", "127.0.0.1")

        import os
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        kali_path = os.path.join(base_dir, "kalilinux")

        # Build the custom kali-rolling image if it does not exist locally
        try:
            client.images.get("kali-rolling:latest")
        except docker.errors.ImageNotFound:
            client.images.build(path=kali_path, tag="kali-rolling:latest", rm=True, forcerm=True)

        container = client.containers.run(
            "kali-rolling:latest",
            command="tail -f /dev/null",
            detach=True,
            remove=True,
            extra_hosts={"host.docker.internal": "host-gateway", "target.local": target_ip}, cap_add=["NET_ADMIN", "NET_RAW"],
            volumes={"/var/run/docker.sock": {"bind": "/var/run/docker.sock", "mode": "rw"}}
        )

        return jsonify({
            "status": "success",
            "container_id": container.id
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@kali_bp.route('/api/stop-kali-advance-kali/<container_id>', methods=['POST'])
def stop_kali_advance_kali(container_id):
    if not client:
        return jsonify({"status": "error", "message": "Docker not available."}), 500
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
