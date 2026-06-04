from flask import Blueprint

dvwa_bp = Blueprint('dvwa', __name__)
kali_bp = Blueprint('kali', __name__)
challenges_bp = Blueprint('challenges', __name__)
devtools_bp = Blueprint('devtools', __name__)
recon_bp = Blueprint('recon', __name__)
nmap_bp = Blueprint('nmap', __name__)
nmap_deepdive_bp = Blueprint('nmap_deepdive', __name__)
gauntlet_bp = Blueprint('gauntlet', __name__)

from . import dvwa, kali, challenges, devtools, recon, nmap, nmap_deepdive, gauntlet
