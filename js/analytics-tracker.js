/**
 * CTF LABS — Analytics Tracker
 * Tracks page visits, lab opens, session time, and daily activity.
 * All data stored in localStorage keyed per user UID.
 * Include this script on every page AFTER auth-state.js.
 */
(function () {
  const SESSION_KEY  = "ctf_session_start";
  const TRACKER_KEY  = (uid) => `ctf_analytics_${uid}`;

  /* ── Default analytics schema ── */
  function defaultData() {
    return {
      totalTimeMinutes: 0,
      dailyActivity:    {},        // { "YYYY-MM-DD": true }
      roomsCompleted:   [],
      questionsCorrect: 0,
      failedAttempts:   0,
      lastLogin:        null,
    };
  }

  function getUID() {
    const svc = window.authService;
    return svc && svc.currentUser ? svc.currentUser.uid : null;
  }

  function load(uid) {
    try {
      return JSON.parse(localStorage.getItem(TRACKER_KEY(uid))) || defaultData();
    } catch (_) { return defaultData(); }
  }

  function save(uid, data) {
    localStorage.setItem(TRACKER_KEY(uid), JSON.stringify(data));
  }

  /* ── Session time tracking ── */
  function startSession() {
    sessionStorage.setItem(SESSION_KEY, Date.now().toString());
  }

  function endSession(uid) {
    const start = parseInt(sessionStorage.getItem(SESSION_KEY) || "0", 10);
    if (!start || !uid) return;
    const mins = Math.round((Date.now() - start) / 60000);
    if (mins < 1) return; // ignore sub-minute

    const data = load(uid);
    data.totalTimeMinutes = (data.totalTimeMinutes || 0) + mins;
    save(uid, data);
    sessionStorage.removeItem(SESSION_KEY);
  }

  /* ── Track active day ── */
  function trackActiveDay(uid) {
    const data = load(uid);
    const day = new Date().toISOString().slice(0, 10);
    data.dailyActivity[day] = true;
    save(uid, data);
  }

  /* ── Event Queue (if auth isn't ready yet) ── */
  const eventQueue = [];

  function processQueue() {
    const uid = getUID();
    if (!uid) return;
    while(eventQueue.length > 0) {
      const fn = eventQueue.shift();
      fn(uid);
    }
  }

  /* ── Specific events called from lab pages ── */
  window.ctfTrackCorrect = function () {
    const uid = getUID();
    if (!uid) { eventQueue.push((uid) => window.ctfTrackCorrect()); return; }
    const data = load(uid);
    data.questionsCorrect = (data.questionsCorrect || 0) + 1;
    save(uid, data);
  };

  window.ctfTrackFailed = function () {
    const uid = getUID();
    if (!uid) { eventQueue.push((uid) => window.ctfTrackFailed()); return; }
    const data = load(uid);
    data.failedAttempts = (data.failedAttempts || 0) + 1;
    save(uid, data);
  };

  window.ctfTrackRoomComplete = function (roomName) {
    const uid = getUID();
    if (!uid) { eventQueue.push((uid) => window.ctfTrackRoomComplete(roomName)); return; }
    const data = load(uid);
    if (!data.roomsCompleted) data.roomsCompleted = [];
    if (!data.roomsCompleted.includes(roomName)) {
      data.roomsCompleted.push(roomName);
      save(uid, data);
    }
  };

  /* ── Login event ── */
  function trackLogin(uid) {
    const data = load(uid);
    data.lastLogin = new Date().toISOString();
    save(uid, data);
  }

  /* ── Bootstrap — wait for auth ── */
  function bootstrap() {
    startSession();

    function tryInit() {
      if (!window.authService) { setTimeout(tryInit, 100); return; }

      window.authService.onAuthStateChanged(function (user) {
        if (!user) return;
        trackLogin(user.uid);
        trackActiveDay(user.uid);
        processQueue();
        window.dispatchEvent(new Event("ctf-auth-ready"));
        
        window.addEventListener("beforeunload", () => endSession(user.uid));
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "hidden") {
            endSession(user.uid);
            startSession(); 
          }
        });
      });
    }
    tryInit();
  }

  /* ── Public API for dashboard to read ── */
  window.ctfAnalytics = {
    getData: function () {
      const uid = getUID();
      return uid ? load(uid) : defaultData();
    },
    getStreakDays: function () {
      const data = this.getData();
      const days = Object.keys(data.dailyActivity).sort().reverse();
      if (!days.length) return 0;

      let streak = 0;
      let cursor = new Date();
      cursor.setHours(0, 0, 0, 0);

      for (const day of days) {
        const d = new Date(day + "T00:00:00");
        const diff = Math.round((cursor - d) / 86400000);
        if (diff <= 1) { streak++; cursor = d; }
        else break;
      }
      return streak;
    }
  };

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", bootstrap);
  else
    bootstrap();
})();
