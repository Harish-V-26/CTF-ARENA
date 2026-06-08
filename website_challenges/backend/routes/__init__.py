from flask import Blueprint

kali_bp = Blueprint('kali', __name__)
gauntlet_bp = Blueprint('gauntlet', __name__)

from . import kali, gauntlet
