from flask import Flask, request, send_file
import subprocess
import os

app = Flask(__name__)

@app.route('/')
def index():
    return '''
    <h1>Binary Web Exploitation Target</h1>
    <p>Welcome to the practical lab. Find the flags!</p>
    <ul>
        <li><a href="/bof?payload=A">Test Buffer Overflow (/bof)</a></li>
        <li><a href="/download">Download Binary (/download)</a></li>
        <li><a href="/lolbin?cmd=ls">Execute LOLBin (/lolbin)</a></li>
    </ul>
    '''

@app.route('/bof')
def bof():
    payload = request.args.get('payload', '')
    try:
        # Run vulnerable C program
        result = subprocess.run(['./vuln', payload], capture_output=True, text=True, timeout=2)
        if result.returncode == -11: # Segmentation fault
            return "Segmentation fault (core dumped)<br><br><b>FLAG{B0F_C0NTR0L_ACH1EV3D}</b>"
        return f"<pre>{result.stdout}</pre>"
    except Exception as e:
        return str(e)

@app.route('/download')
def download():
    return send_file('vuln', as_attachment=True)

@app.route('/lolbin')
def lolbin():
    cmd = request.args.get('cmd', '')
    if cmd.startswith('find ') or cmd.startswith('tar '):
        try:
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=2)
            return f"<pre>{result.stdout}</pre>"
        except Exception as e:
            return str(e)
    return "Command restricted. Only 'find' or 'tar' (LOLBins) allowed."

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
