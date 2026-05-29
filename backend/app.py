from flask import Flask
from flask_cors import CORS
import os

# Fix for Docker Desktop on Linux
desktop_sock = os.path.expanduser("~/.docker/desktop/docker.sock")
if not os.environ.get("DOCKER_HOST") and os.path.exists(desktop_sock):
    os.environ["DOCKER_HOST"] = f"unix://{desktop_sock}"

from routes.dvwa import dvwa_bp
from routes.kali import kali_bp
from routes.challenges import challenges_bp
from routes.devtools import devtools_bp
from routes.recon import recon_bp
from routes.auth_basics import auth_basics_bp   
from routes.idor import idor_bp
from routes.metasploit import metasploit_bp
from routes.nmap import nmap_bp
from routes.nmap_deepdive import nmap_deepdive_bp
from routes.shadow_gate import shadow_gate_bp
from routes.csrf import csrf_bp
from routes.ssrf import ssrf_bp
from routes.python_hacking import python_hacking_bp

from routes.insecure_design import insecure_design_bp
from routes.auth_failures import auth_failures_bp
from routes.integrity_failures import integrity_failures_bp
from routes.logging_failures import logging_failures_bp
from routes.error_handling import error_handling_bp
from routes.owasp_top5 import owasp_top5_bp
from routes.gauntlet import gauntlet_bp
from routes.owasp_part2_ctf import owasp_part2_ctf_bp
from routes.rooms import rooms_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(dvwa_bp)
app.register_blueprint(kali_bp)
app.register_blueprint(challenges_bp)
app.register_blueprint(devtools_bp)
app.register_blueprint(recon_bp)
app.register_blueprint(auth_basics_bp)
app.register_blueprint(idor_bp)
app.register_blueprint(metasploit_bp)
app.register_blueprint(nmap_bp)
app.register_blueprint(nmap_deepdive_bp)
app.register_blueprint(shadow_gate_bp)
app.register_blueprint(csrf_bp)
app.register_blueprint(ssrf_bp)
app.register_blueprint(python_hacking_bp)
app.register_blueprint(insecure_design_bp)
app.register_blueprint(auth_failures_bp)
app.register_blueprint(integrity_failures_bp)
app.register_blueprint(logging_failures_bp)
app.register_blueprint(error_handling_bp)
app.register_blueprint(owasp_top5_bp)
app.register_blueprint(gauntlet_bp)
app.register_blueprint(owasp_part2_ctf_bp)
app.register_blueprint(rooms_bp)

if __name__ == '__main__':
    # Run the server
    app.run(host="0.0.0.0", port=5000, debug=True)

        