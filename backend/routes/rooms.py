from flask import Blueprint, request, jsonify, render_template_string
import os
import json
import uuid
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash

rooms_bp = Blueprint('rooms_bp', __name__)
DATA_FILE = os.path.join(os.path.dirname(__file__), '..', 'data', 'rooms.json')
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), '..', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def load_rooms():
    if not os.path.exists(DATA_FILE):
        return {}
    with open(DATA_FILE, 'r') as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return {}

def save_rooms(rooms):
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    with open(DATA_FILE, 'w') as f:
        json.dump(rooms, f, indent=4)

@rooms_bp.route('/api/create_room', methods=['POST'])
def create_room():
    data = request.json
    if not data or 'roomName' not in data:
        return jsonify({'error': 'Invalid data'}), 400
    
    room_id = data.get('roomCode')
    if not room_id:
        room_id = data['roomName'].lower().replace(' ', '-').replace('/', '')
    
    try:
        # Hash answers for security as requested
        for task in data.get('tasks', []):
            for q in task.get('questions', []):
                if 'answer' in q and not q['answer'].startswith('pbkdf2:') and not q['answer'].startswith('scrypt:'):
                    q['answer_hash'] = generate_password_hash(str(q['answer']))
                    # keep answer in data for editing for MVP, but in production we'd remove it
        
        rooms = load_rooms()
        rooms[room_id] = data
        save_rooms(rooms)
        
        return jsonify({'success': True, 'room_id': room_id}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@rooms_bp.route('/api/rooms/<room_id>', methods=['GET'])
def get_room_json(room_id):
    rooms = load_rooms()
    if room_id not in rooms:
        return jsonify({'error': 'Not found'}), 404
    return jsonify(rooms[room_id])

@rooms_bp.route('/api/rooms/<room_id>', methods=['PUT'])
def update_room(room_id):
    rooms = load_rooms()
    if room_id not in rooms:
        return jsonify({'error': 'Not found'}), 404
    
    data = request.json
    for task in data.get('tasks', []):
        for q in task.get('questions', []):
            if 'answer' in q and not q['answer'].startswith('pbkdf2:'):
                q['answer_hash'] = generate_password_hash(q['answer'])
    
    rooms[room_id] = data
    save_rooms(rooms)
    return jsonify({'success': True, 'room_id': room_id})

@rooms_bp.route('/api/rooms/<room_id>', methods=['DELETE'])
def delete_room(room_id):
    rooms = load_rooms()
    if room_id not in rooms:
        return jsonify({'error': 'Not found'}), 404
        
    try:
        del rooms[room_id]
        save_rooms(rooms)
        return jsonify({'success': True}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@rooms_bp.route('/api/rooms/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        filename = secure_filename(f"{uuid.uuid4().hex}_{file.filename}")
        file.save(os.path.join(UPLOAD_FOLDER, filename))
        return jsonify({'success': True, 'filename': filename, 'url': f"/uploads/{filename}"})


@rooms_bp.route('/api/rooms', methods=['GET'])
def get_rooms():
    rooms = load_rooms()
    summary = []
    for room_id, data in rooms.items():
        summary.append({
            'id': room_id,
            'roomName': data.get('roomName', 'Untitled'),
            'roomType': data.get('roomType', 'Walkthrough'),
            'difficulty': data.get('difficulty', 'Easy'),
            'visibility': data.get('visibility', 'Private')
        })
    return jsonify({'rooms': summary})

@rooms_bp.route('/room/<room_id>', methods=['GET'])
def view_room(room_id):
    rooms = load_rooms()
    if room_id not in rooms:
        return "<h1>Room Not Found</h1>", 404
    
    room = rooms[room_id]
    
    import json
    tasks_json = json.dumps(room.get('tasks', []))
    room_name = room.get('roomName', 'Untitled')
    
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>CTF LABS — {room_name}</title>
  <link rel="stylesheet" href="http://127.0.0.1:5501/css/global.css"/>
  <link rel="stylesheet" href="http://127.0.0.1:5501/css/web-room.css"/>
  <style>
     .machine-panel {{
         background: var(--surface);
         padding: 20px;
         border-radius: 8px;
         border: 1px solid var(--border);
         margin-bottom: 20px;
     }}
     .machine-panel button {{
         background: var(--accent);
         color: #0a0e1a;
         font-weight: bold;
         border: none;
         padding: 10px;
         border-radius: 4px;
         cursor: pointer;
         text-transform: uppercase;
     }}
  </style>
</head>
<body>
<nav class="navbar" aria-label="Main navigation">
  <a href="http://127.0.0.1:5501/index.html" class="logo">CTF<span>LABS</span></a>
  <div class="nav-links">
    <a href="http://127.0.0.1:5501/index.html">Home</a>
    <a href="http://127.0.0.1:5501/learn.html">Learn</a>
    <a href="http://127.0.0.1:5501/challenges.html">Challenges</a>
    <a href="http://127.0.0.1:5501/rules.html">Rules</a>
    <a href="http://127.0.0.1:5501/create-room.html">Create Room</a>
    <div class="dropdown" role="navigation" aria-label="Profile menu">
      <a href="#" aria-haspopup="true">Profile </a>
      <div class="dropdown-content" role="menu">
        <a href="#" role="menuitem">Dashboard</a>
        <a href="#" role="menuitem">Settings</a>
        <a href="#" role="menuitem">Logout</a>
      </div>
    </div>
  </div>
</nav>

<div class="room-wrapper">
  <aside class="room-sidebar">
    <div class="sidebar-header">
      <div class="sidebar-title">{room_name}</div>
      <div class="overall-progress-wrap">
        <div class="overall-progress-bar">
          <div class="overall-progress-fill" id="overall-fill" style="width:0%"></div>
        </div>
        <div class="overall-progress-pct" id="overall-pct">0%</div>
      </div>
    </div>
    <nav class="sidebar-nav" id="sidebar-nav"></nav>
  </aside>

  <div class="room-main">
    <div class="challenge-header">
      <div class="ch-breadcrumb">Rooms › {room_name} › <span id="ch-crumb">Task 1</span></div>
      <div class="ch-meta">
        <span class="ch-title" id="ch-title"></span>
        <span class="ch-pts" id="ch-pts"></span>
        <div class="step-dots" id="step-dots"></div>
      </div>
    </div>

    <div class="room-body" id="room-body">
      <div class="machine-panel">
        <h3 style="margin-top:0;color:var(--accent);">Active Machine</h3>
        <div id="machine-status" style="margin-bottom: 15px; color: var(--text-muted); font-size: 0.9em;">
          Status: <span style="color: #e74c3c;">Offline</span>
        </div>
        <button onclick="deployMachine()" id="deploy-btn" style="width:100%;">START MACHINE</button>
        <div id="machine-ip-container" style="display: none; margin-top: 15px;">
          <span style="font-size: 0.8em; color: var(--text-muted);">IP Address:</span>
          <div style="background: var(--base); padding: 8px; font-family: monospace; color: var(--accent); border: 1px dashed var(--border); margin-top: 5px; text-align: center;">
              <span id="machine-ip"></span>
          </div>
        </div>
      </div>

      <div id="lesson-panel">
        <div class="reading-panel">
          <div class="reading-label"><span></span> Study before answering</div>
          <div class="reading-text" id="reading-text"></div>
        </div>
        <div class="qa-section" id="qa-section">
          <div class="qa-heading"> Tasks</div>
          <div id="questions-container"></div>
        </div>
      </div>

      <div class="completion-card" id="completion-card">
        <div class="trophy-icon"></div>
        <h2>Room Complete!</h2>
        <p>Congratulations! You have completed all tasks in this room.</p>
        <div class="score-pill" id="score-pill">0 / 0 pts</div>
        <a href="http://127.0.0.1:5501/create-room.html" class="btn btn-primary">← Back to Manage Rooms</a>
      </div>
    </div>

    <div class="room-footer-nav">
      <div class="challenge-counter">Task <span id="cur-num">1</span> of <span id="tot-num">1</span></div>
      <div class="nav-btns">
        <button class="nav-btn" id="btn-prev" onclick="navigate(-1)" disabled>← Previous</button>
        <button class="nav-btn primary" id="btn-next" onclick="navigate(1)">Next →</button>
      </div>
    </div>
  </div>
</div>

<script>
  function deployMachine() {{
      const btn = document.getElementById('deploy-btn');
      const status = document.getElementById('machine-status');
      const ipContainer = document.getElementById('machine-ip-container');
      const ipText = document.getElementById('machine-ip');
      
      btn.disabled = true;
      btn.innerText = "Deploying...";
      btn.style.background = "#58a6ff";
      status.innerHTML = 'Status: <span style="color: #f1c40f;">Starting VM...</span>';
      
      setTimeout(() => {{
          btn.innerText = "Terminate Machine";
          btn.style.background = "#e74c3c";
          btn.disabled = false;
          btn.onclick = () => window.location.reload();
          
          status.innerHTML = 'Status: <span style="color: #00ff88;">Running</span>';
          ipContainer.style.display = "block";
          
          ipText.innerText = "10.10." + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255);
      }}, 3000);
  }}

  const LESSONS = {tasks_json};
  let cur = 0;
  const TOTAL = LESSONS.length || 1;
  const answered = LESSONS.length ? LESSONS.map(l => (l.questions || []).map(() => false)) : [];

  function buildSidebar() {{
    const nav = document.getElementById('sidebar-nav');
    if (!LESSONS.length) return;
    nav.innerHTML = LESSONS.map((l, i) => `
      <div class="module-group">
        <div class="module-label" id="mod-${{i}}">
          <span class="mod-num">${{String(i+1).padStart(2,'0')}}</span> ${{l.title}}
        </div>
        <div class="nav-item${{i===0?' active':''}}" id="nav-${{i}}" onclick="goTo(${{i}})">
          <div class="nav-dot"></div>
          <span class="nav-label">${{l.title}}</span>
          <span class="nav-pts">pts</span>
        </div>
      </div>`).join('');
  }}

  function buildDots() {{
    if (!LESSONS.length) return;
    document.getElementById('step-dots').innerHTML =
      LESSONS.map((_,i) => `<div class="step-dot${{i===0?' current':''}}" id="dot-${{i}}"></div>`).join('');
    document.getElementById('tot-num').textContent = TOTAL;
  }}

  function renderLesson(idx) {{
    if (!LESSONS.length) return;
    const l = LESSONS[idx];
    document.getElementById('ch-title').textContent = l.title || 'Task';
    document.getElementById('ch-pts').textContent = '';
    document.getElementById('ch-crumb').textContent = `Task ${{idx+1}}`;
    document.getElementById('cur-num').textContent = idx+1;
    document.getElementById('reading-text').innerHTML = (l.description || '').replace(/\\n/g, '<br/>');

    const qc = document.getElementById('questions-container');
    qc.innerHTML = (l.questions || []).map((q, qi) => `
      <div class="question-card${{answered[idx][qi]?' correct':''}}" id="qc-${{idx}}-${{qi}}">
        <div class="question-text"><span class="q-num">Q${{qi+1}}</span>${{q.text}}</div>
        <div class="answer-row">
          <input class="answer-input" id="ans-${{idx}}-${{qi}}" type="text"
            placeholder="Type your answer…" autocomplete="off"
            ${{answered[idx][qi]?'disabled':''}} onkeydown="onEnter(event,${{idx}},${{qi}})"/>
          <button class="check-btn" id="btn-${{idx}}-${{qi}}"
            onclick="checkAnswer(${{idx}},${{qi}})"
            ${{answered[idx][qi]?'disabled':''}}>Check</button>
        </div>
        <div class="feedback${{answered[idx][qi]?' correct-msg show':''}}" id="fb-${{idx}}-${{qi}}">
          ${{answered[idx][qi]?' Correct! '+q.answer:''}}
        </div>
      </div>`).join('');
  }}

  function updateNav(from, to) {{
    if (!LESSONS.length) return;
    const fromEl = document.getElementById(`nav-${{from}}`);
    if(fromEl) fromEl.classList.remove('active');
    const dotFrom = document.getElementById(`dot-${{from}}`);
    if(dotFrom) {{
        dotFrom.classList.remove('current');
        dotFrom.classList.toggle('done', lessonDone(from));
    }}
    if (lessonDone(from) && fromEl) fromEl.classList.add('completed');

    const toEl = document.getElementById(`nav-${{to}}`);
    if(toEl) toEl.classList.add('active');
    const dotTo = document.getElementById(`dot-${{to}}`);
    if(dotTo) dotTo.classList.add('current');
  }}

  function normalise(s) {{ return (s||'').trim().toLowerCase().replace(/\s+/g,' '); }}

  function checkAnswer(lesson, qi) {{
    if (answered[lesson][qi]) return;
    const input = document.getElementById(`ans-${{lesson}}-${{qi}}`);
    const correct = LESSONS[lesson].questions[qi].answer || '';
    const cn = normalise(correct);
    const un = normalise(input.value);

    const ok = un === cn || cn.includes(un) || (un.length > 0 && un.includes(cn.split(' ')[0]));

    const fb  = document.getElementById(`fb-${{lesson}}-${{qi}}`);
    const qc  = document.getElementById(`qc-${{lesson}}-${{qi}}`);

    if (ok) {{
      answered[lesson][qi] = true;
      qc.classList.add('correct');
      fb.className = 'feedback correct-msg show';
      fb.textContent = ' Correct! ' + correct;
      input.disabled = true;
      document.getElementById(`btn-${{lesson}}-${{qi}}`).disabled = true;
      updateProgress();
    }} else {{
      qc.classList.add('wrong');
      fb.className = 'feedback wrong-msg show';
      fb.textContent = ' Not quite — try again.';
      setTimeout(() => {{ qc.classList.remove('wrong'); fb.classList.remove('show'); }}, 2000);
    }}
  }}

  function onEnter(e, lesson, qi) {{
    if (e.key === 'Enter') checkAnswer(lesson, qi);
  }}

  function lessonDone(idx) {{ return answered[idx] && answered[idx].every(Boolean); }}
  function totalDone()     {{ return answered.flat().filter(Boolean).length; }}
  function totalQs()       {{ return answered.flat().length; }}

  function updateProgress() {{
    const tot = totalQs();
    const pct = tot > 0 ? Math.round(totalDone() / tot * 100) : 100;
    document.getElementById('overall-fill').style.width = pct + '%';
    document.getElementById('overall-pct').textContent = pct + '%';
    for (let i = 0; i < TOTAL; i++) {{
      if (lessonDone(i)) {{
        const nEl = document.getElementById(`nav-${{i}}`);
        if(nEl) nEl.classList.add('completed');
        const mEl = document.getElementById(`mod-${{i}}`);
        if(mEl) mEl.classList.add('completed');
      }}
    }}
    if (tot > 0 && totalDone() === tot) showCompletion();
  }}

  function goTo(idx) {{
    updateNav(cur, idx);
    cur = idx;
    renderLesson(cur);
    document.getElementById('btn-prev').disabled = cur === 0;
    document.getElementById('btn-next').textContent = cur === TOTAL-1 ? 'Finish →' : 'Next →';
    document.querySelector('.room-body').scrollTop = 0;
  }}

  function navigate(dir) {{
    const next = cur + dir;
    if (next >= 0 && next < TOTAL) {{ goTo(next); }}
    else if (dir === 1)            {{ showCompletion(); }}
  }}

  function showCompletion() {{
    document.getElementById('lesson-panel').style.display = 'none';
    const pts = Math.round(totalDone() / (totalQs()||1) * 100);
    document.getElementById('score-pill').textContent = `100% Completed`;
    document.getElementById('completion-card').classList.add('show');
    document.getElementById('btn-next').disabled = true;
    document.getElementById('btn-prev').disabled = true;
    document.getElementById('overall-fill').style.width = '100%';
    document.getElementById('overall-pct').textContent = '100%';
    document.querySelector('.room-body').scrollTop = 0;
  }}

  buildSidebar();
  buildDots();
  renderLesson(0);
</script>
<script src="http://127.0.0.1:5501/js/firebase-config.js"></script>
<script src="http://127.0.0.1:5501/js/auth-state.js"></script>
</body>
</html>
"""
    return html

