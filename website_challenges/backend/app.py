from flask import Flask
from flask_cors import CORS
import os

desktop_sock = os.path.expanduser("~/.docker/desktop/docker.sock")
if not os.environ.get("DOCKER_HOST") and os.path.exists(desktop_sock):
    os.environ["DOCKER_HOST"] = f"unix://{desktop_sock}"

from routes.kali import kali_bp
from routes.shadow_gate import shadow_gate_bp
from routes.owasp_top5_challenge import owasp_top5_challenge_bp
from routes.gauntlet import gauntlet_bp
from routes.owasp_part2_ctf import owasp_part2_ctf_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(kali_bp)
app.register_blueprint(shadow_gate_bp)
app.register_blueprint(owasp_top5_challenge_bp)
app.register_blueprint(gauntlet_bp)
app.register_blueprint(owasp_part2_ctf_bp)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5002, debug=True)
