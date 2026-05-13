from flask import Flask
from flask_cors import CORS

from routes.dvwa import dvwa_bp
from routes.kali import kali_bp
from routes.challenges import challenges_bp
from routes.devtools import devtools_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(dvwa_bp)
app.register_blueprint(kali_bp)
app.register_blueprint(challenges_bp)
app.register_blueprint(devtools_bp)

if __name__ == '__main__':
    # Run the server
    app.run(host="0.0.0.0", port=5000, debug=True)

