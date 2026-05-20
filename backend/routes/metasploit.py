from flask import Blueprint, jsonify
import docker

metasploit_bp = Blueprint('metasploit_bp', __name__)
from .docker_client import get_docker_client

client = get_docker_client()

@metasploit_bp.route('/api/start-metasploit-target', methods=['POST'])
def start_target():
    if not client:
        return jsonify({"status": "error", "message": "Docker not available"}), 500
    try:
        container = client.containers.run(
            "metasploit-target:latest",
            detach=True,
            remove=True
        )
        # Reload to populate NetworkSettings
        container.reload()
        
        target_ip = "Unknown"
        networks = container.attrs.get("NetworkSettings", {}).get("Networks", {})
        for net_info in networks.values():
            ip = net_info.get("IPAddress")
            if ip:
                target_ip = ip
                break
                
        return jsonify({
            "status": "success",
            "container_id": container.id,
            "ip_address": target_ip,
            "message": "Metasploit target started."
        })
    except docker.errors.ImageNotFound:
        return jsonify({"status": "error", "message": "Target image not built yet."}), 500
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

import threading

cleanup_timers = {}

@metasploit_bp.route('/api/stop-metasploit-target/<container_id>', methods=['POST'])
def stop_target(container_id):
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

@metasploit_bp.route('/api/stop-metasploit-target-delayed/<container_id>', methods=['POST'])
def stop_target_delayed(container_id):
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

@metasploit_bp.route('/api/start-metasploit-deepdive-target', methods=['POST'])
def start_deepdive_target():
    if not client:
        return jsonify({"status": "error", "message": "Docker not available"}), 500
    try:
        # Check if the image exists, otherwise build it
        try:
            client.images.get("metasploit-deepdive-target:latest")
        except docker.errors.ImageNotFound:
            client.images.build(path="./docker/metasploit-deepdive-target", tag="metasploit-deepdive-target:latest")

        container = client.containers.run(
            "metasploit-deepdive-target:latest",
            detach=True,
            remove=True
        )
        container.reload()
        
        target_ip = "Unknown"
        networks = container.attrs.get("NetworkSettings", {}).get("Networks", {})
        for net_info in networks.values():
            ip = net_info.get("IPAddress")
            if ip:
                target_ip = ip
                break
                
        return jsonify({
            "status": "success",
            "container_id": container.id,
            "ip_address": target_ip,
            "message": "Metasploit deep dive target started."
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@metasploit_bp.route('/api/stop-metasploit-deepdive-target/<container_id>', methods=['POST'])
def stop_deepdive_target(container_id):
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

@metasploit_bp.route('/api/stop-metasploit-deepdive-target-delayed/<container_id>', methods=['POST'])
def stop_deepdive_target_delayed(container_id):
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

@metasploit_bp.route('/api/cancel-stop-metasploit-deepdive-target/<container_id>', methods=['POST'])
def cancel_stop_deepdive_target(container_id):
    if container_id in cleanup_timers:
        cleanup_timers[container_id].cancel()
        cleanup_timers.pop(container_id, None)
    return jsonify({"status": "success"})

