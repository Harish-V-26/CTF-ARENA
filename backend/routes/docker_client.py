"""
Shared Docker client helper.
Automatically detects Docker Desktop socket on Linux/Mac when
the standard /var/run/docker.sock is not available.
"""
import os
import docker

def get_docker_client():
    """Return a connected Docker client, trying common socket paths."""
    # 1. Standard system socket (Linux with docker-ce)
    standard = "/var/run/docker.sock"
    # 2. Docker Desktop socket (Linux)
    desktop  = os.path.expanduser("~/.docker/desktop/docker.sock")
    # 3. DOCKER_HOST environment variable (overrides everything)
    env_host = os.environ.get("DOCKER_HOST", "")

    sockets = []
    if env_host:
        sockets.append(env_host)
    if os.path.exists(standard):
        sockets.append(f"unix://{standard}")
    if os.path.exists(desktop):
        sockets.append(f"unix://{desktop}")

    for sock in sockets:
        try:
            c = docker.DockerClient(base_url=sock)
            c.ping()          # verify the daemon is actually responsive
            return c
        except Exception:
            continue

    # Last resort: let the SDK try whatever it finds
    try:
        return docker.from_env()
    except Exception:
        return None
