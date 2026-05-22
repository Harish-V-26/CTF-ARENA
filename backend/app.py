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

if __name__ == '__main__':
    # Run the server
    app.run(host="0.0.0.0", port=5000, debug=True)

        