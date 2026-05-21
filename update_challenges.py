import re
from bs4 import BeautifulSoup
import json

with open("challenges.html", "r") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")

challenge_data = {}

cards = soup.find_all("div", class_="challenge-card")

for card in cards:
    cid = card.get("id")
    onclick = card.get("onclick")
    if not onclick: continue
    
    match = re.search(r"window\.location\.href='([^']+)'", onclick)
    if not match: continue
    href = match.group(1)
    
    title_el = card.find("div", class_="challenge-title")
    title = title_el.text.strip() if title_el else ""
    
    desc_el = card.find("div", class_="challenge-desc")
    desc = desc_el.text.strip() if desc_el else ""
    
    pts_el = card.find("span", class_="points")
    pts = pts_el.text.strip() if pts_el else ""
    
    cat_tag = card.find("span", class_="category-tag")
    cat = cat_tag.text.strip() if cat_tag else "Web"
    
    diff_tag = card.find("span", class_="difficulty-tag")
    diff = diff_tag.text.strip() if diff_tag else "Easy"
    
    # Generate some details based on title
    learn_list = []
    env_icon = ""
    env_title = "Theory & Reading Lab"
    env_desc = "You will read through a set of lessons and answer knowledge check questions."
    
    if "Practical" in diff or "Docker" in desc or "Gauntlet" in title or "Target" in title:
        env_icon = ""
        env_title = "Live Docker Environment"
        env_desc = "You will be provided with a private, isolated container running the vulnerable application."
    elif "Guided" in desc or "Auth" in title or "DevTools" in title:
        env_icon = ""
        env_title = "Interactive Guided Lab"
        env_desc = "A split-screen environment with step-by-step instructions alongside an interactive browser or target."
        
    if "SQL" in title:
        learn_list = ["SQL Syntax", "Authentication Bypass", "UNION Based Injections"]
    elif "XSS" in title:
        learn_list = ["Reflected XSS", "Stored XSS", "DOM XSS"]
    elif "DevTools" in title:
        learn_list = ["Inspector", "Console", "Network Tab", "Storage Manipulation"]
    elif "Auth" in title:
        learn_list = ["Session Cookies", "JWT Decoding", "Login Flow Analysis"]
    elif "Crypto" in title:
        learn_list = ["Encryption vs Hashing", "Ciphers", "Public Key Infrastructure"]
    else:
        learn_list = ["Vulnerability Identification", "Exploitation Techniques", "Mitigation Strategies"]
        
    challenge_data[cid] = {
        "id": cid,
        "title": title,
        "desc": desc,
        "href": href,
        "points": pts,
        "category": cat,
        "difficulty": diff,
        "learn": learn_list,
        "env_icon": env_icon,
        "env_title": env_title,
        "env_desc": env_desc
    }
    
    # Modify card
    card["onclick"] = f"openModal('{cid}')"

# Add Modal HTML
modal_html = """
  <!--  CHALLENGE DETAILS MODAL  -->
  <div id="challenge-modal" class="modal-overlay">
    <div class="modal-content">
      <button class="modal-close" onclick="closeModal()">×</button>
      <div class="modal-header">
        <div class="modal-meta">
          <span class="category-tag" id="modal-category">Web</span>
          <span class="difficulty-tag diff-easy" id="modal-difficulty">Easy</span>
        </div>
        <h2 id="modal-title">Challenge Title</h2>
      </div>
      <div class="modal-body">
        <p id="modal-desc" class="modal-desc">Detailed description goes here.</p>
        
        <div class="modal-section">
          <h3> What You Will Learn</h3>
          <ul id="modal-learn-list" class="modal-list">
          </ul>
        </div>
        
        <div class="modal-section">
          <h3> Environment & Expected Result</h3>
          <div class="env-preview">
            <div class="env-icon" id="modal-env-icon"></div>
            <div class="env-text">
              <strong id="modal-env-title">Docker Lab</strong>
              <p id="modal-env-desc">You will be dropped into a private container...</p>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border);">
        <span class="points" id="modal-points" style="font-size: 1.2rem;">200 pts</span>
        <a href="#" class="start-btn" id="modal-start-btn" style="padding: 10px 24px; font-size: 1rem; background: var(--accent); color: #000;">Start Challenge →</a>
      </div>
    </div>
  </div>

  <script>
    const challengeData = """ + json.dumps(challenge_data) + """;

    function openModal(cid) {
      const data = challengeData[cid];
      if (!data) return;
      
      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-desc').textContent = data.desc;
      document.getElementById('modal-category').textContent = data.category;
      document.getElementById('modal-difficulty').textContent = data.difficulty;
      document.getElementById('modal-difficulty').className = 'difficulty-tag ' + (data.difficulty.includes('Easy') ? 'diff-easy' : 'diff-medium');
      
      const learnList = document.getElementById('modal-learn-list');
      learnList.innerHTML = data.learn.map(item => `<li>${item}</li>`).join('');
      
      document.getElementById('modal-env-icon').textContent = data.env_icon;
      document.getElementById('modal-env-title').textContent = data.env_title;
      document.getElementById('modal-env-desc').textContent = data.env_desc;
      
      document.getElementById('modal-points').textContent = data.points;
      document.getElementById('modal-start-btn').href = data.href;
      
      document.getElementById('challenge-modal').classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      document.getElementById('challenge-modal').classList.remove('show');
      document.body.style.overflow = '';
    }

    // Close on outside click
    window.onclick = function(event) {
      const modal = document.getElementById('challenge-modal');
      if (event.target == modal) {
        closeModal();
      }
    }
  </script>
"""

# Find footer
footer = soup.find("footer")
if footer:
    footer.insert_after(BeautifulSoup(modal_html, "html.parser"))
else:
    soup.body.append(BeautifulSoup(modal_html, "html.parser"))

with open("challenges.html", "w") as f:
    f.write(str(soup))

