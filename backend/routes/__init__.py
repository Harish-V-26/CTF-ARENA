from flask import Blueprint

dvwa_bp = Blueprint('dvwa', __name__)
kali_bp = Blueprint('kali', __name__)
challenges_bp = Blueprint('challenges', __name__)
devtools_bp = Blueprint('devtools', __name__)

from . import dvwa, kali, challenges, devtools
