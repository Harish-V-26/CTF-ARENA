/**
 * CTF Platform — Authentication State Manager
 * Uses Firebase Modular SDK v12 (ESM) via dynamic import().
 * Falls back to LocalStorage mock when Firebase config is absent.
 */

(function () {
  const host = window.location.hostname || "localhost";
  const protocol = window.location.protocol;

  const FIREBASE_VERSION = "12.14.0";
  const BASE_CDN = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}`;

  const cfg = window.firebaseConfig;
  const isConfigured =
    cfg &&
    cfg.apiKey &&
    cfg.apiKey !== "YOUR_API_KEY" &&
    cfg.apiKey.trim() !== "";

  /* ═══════════════════════════════════════════════
     AUTH SERVICE — public interface
  ═══════════════════════════════════════════════ */
  const authService = {
    // Cookie support helpers for multi-port session sharing
    _setCookie: function (name, value, days) {
      let expires = "";
      if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    },
    _getCookie: function (name) {
      let nameEQ = name + "=";
      let ca = document.cookie.split(';');
      for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    },
    _eraseCookie: function (name) {
      document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },

    isMock:          !isConfigured,
    currentUser:     null,
    authInitialized: false,
    _redirecting:    false,
    _callbacks:      [],

    /* ── Bootstrap ── */
    init: function () {
      let cached = localStorage.getItem("ctf_active_user_session");
      if (!cached) {
        cached = this._getCookie("ctf_active_user_session");
        if (cached) {
          localStorage.setItem("ctf_active_user_session", cached);
        }
      }
      if (cached) {
        try {
          const user = JSON.parse(cached);
          const meta = this._loadMeta(user.uid);
          const fallbackAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.email || "mock")}`;
          const photoURL = (meta.photoURL === "none") ? null : (meta.photoURL || user.photoURL || fallbackAvatar);
          this.currentUser = { ...user, photoURL };
          this._fixAllLinks();
      this._updateNavbar();
        } catch (_) {}
      }

      if (isConfigured) {
        this._initFirebase();
      } else {
        console.info("CTF-Auth: Firebase config absent — running in offline/mock mode.");
        this._initMock();
      }
    },

    /* ── Firebase modular v12 ── */
    _initFirebase: async function () {
      try {
        const { initializeApp, getApps } = await import(`${BASE_CDN}/firebase-app.js`);
        const { getAuth, onAuthStateChanged, createUserWithEmailAndPassword,
                signInWithEmailAndPassword, signOut, updateProfile,
                GoogleAuthProvider, signInWithPopup } =
              await import(`${BASE_CDN}/firebase-auth.js`);

        // Avoid re-initialising on pages that already ran the script
        const app  = getApps().length === 0
                       ? initializeApp(cfg)
                       : getApps()[0];
        const auth = getAuth(app);

        // Optional analytics (non-blocking)
        import(`${BASE_CDN}/firebase-analytics.js`)
          .then(({ getAnalytics }) => { try { getAnalytics(app); } catch (_) {} })
          .catch(() => {});

        onAuthStateChanged(auth, (fbUser) => {
          if (fbUser) {
            const meta = this._loadMeta(fbUser.uid);
            const fallbackAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(fbUser.email)}`;
            const photoURL = (meta.photoURL === "none") ? null : (meta.photoURL || fbUser.photoURL || fallbackAvatar);
            this.currentUser = {
              uid:         fbUser.uid,
              email:       fbUser.email,
              displayName: meta.name || fbUser.displayName || fbUser.email.split("@")[0],
              photoURL
            };
            localStorage.setItem("ctf_active_user_session", JSON.stringify(this.currentUser));
            this._setCookie("ctf_active_user_session", JSON.stringify(this.currentUser), 7);
          } else {
            // Preserve mock sessions (e.g. mock Google login on local dev)
            const mockSession = localStorage.getItem("mock_auth_session");
            if (mockSession) {
              try {
                const session = JSON.parse(mockSession);
                const meta = this._loadMeta(session.uid);
                const fallbackAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(session.email || "mock")}`;
                const photoURL = (meta.photoURL === "none") ? null : (meta.photoURL || session.photoURL || fallbackAvatar);
                this.currentUser = { ...session, photoURL };
              } catch (_) {
                this.currentUser = null;
                localStorage.removeItem("ctf_active_user_session");
                this._eraseCookie("ctf_active_user_session");
              }
            } else {
              this.currentUser = null;
              localStorage.removeItem("ctf_active_user_session");
              this._eraseCookie("ctf_active_user_session");
            }
          }
          this.authInitialized = true;
          this._notify();
        });

        // Store Firebase helpers for sign-up / login / logout calls
        this._fb = { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
                     signOut, updateProfile, GoogleAuthProvider, signInWithPopup };

      } catch (err) {
        console.error("CTF-Auth: Firebase init failed, falling back to mock.", err);
        this.isMock = true;
        this._initMock();
      }
    },

    _initMock: function () {
      const saved = localStorage.getItem("mock_auth_session");
      if (saved) {
        try {
          const session = JSON.parse(saved);
          const meta = this._loadMeta(session.uid);
          const fallbackAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(session.email || "mock")}`;
          const photoURL = (meta.photoURL === "none") ? null : (meta.photoURL || session.photoURL || fallbackAvatar);
          this.currentUser = {
            ...session,
            photoURL
          };
          localStorage.setItem("ctf_active_user_session", JSON.stringify(this.currentUser));
            this._setCookie("ctf_active_user_session", JSON.stringify(this.currentUser), 7);
        } catch (_) {}
      } else {
        localStorage.removeItem("ctf_active_user_session");
            this._eraseCookie("ctf_active_user_session");
      }
      this.authInitialized = true;
      setTimeout(() => this._notify(), 60);
    },

    /* ── LocalStorage user metadata helpers ── */
    _saveMeta: function (uid, data) {
      localStorage.setItem(`ctf_user_meta_${uid}`, JSON.stringify(data));
    },
    _loadMeta: function (uid) {
      try { return JSON.parse(localStorage.getItem(`ctf_user_meta_${uid}`)) || {}; }
      catch (_) { return {}; }
    },

    /* ── Subscriber management ── */
    onAuthStateChanged: function (cb) {
      this._callbacks.push(cb);
      // Only fire immediately if Firebase has fully confirmed the session.
      // Do NOT fire from the unvalidated localStorage cache (currentUser set in init())
      // — that causes a redirect loop when the cached token is stale.
      if (this.authInitialized) {
        try { cb(this.currentUser); } catch (_) {}
      }
    },
    _notify: function () {
      this._callbacks.forEach(cb => { try { cb(this.currentUser); } catch (_) {} });
      this._fixAllLinks();
      this._updateNavbar();

      // Enforce global authentication redirect — guarded to fire only once per page
      if (this._redirecting) return;
      const path = window.location.pathname.replace(/\\/g, "/");
      const isLoginPage = /\/login(\/?|(\/index\.html))$/.test(path);
      const isRoomPage = path.startsWith("/room/");
      if (this.authInitialized && !this.currentUser && !isLoginPage && !isRoomPage) {
        this._redirecting = true;
        window.location.href = `${protocol}//${host}:8002/login/index.html`;
      }
    },

    /* ═══════════════════════════════════════════════
       PUBLIC API — signUp / login / logout
    ═══════════════════════════════════════════════ */
    signUp: function (name, email, password, callback) {
      if (!email.toLowerCase().endsWith("@gmail.com"))
        return callback(new Error("Email must be a valid Gmail address (@gmail.com)."));

      if (this.isMock) {
        const users = this._mockUsers();
        if (users.some(u => u.email.toLowerCase() === email.toLowerCase()))
          return callback(new Error("An account with this Gmail address already exists."));

        const user = { uid: "mock_" + Date.now(), name, email, password };
        users.push(user);
        localStorage.setItem("mock_users_db", JSON.stringify(users));

        const fallbackAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`;
        this.currentUser = { uid: user.uid, email, displayName: name, photoURL: fallbackAvatar };
        localStorage.setItem("mock_auth_session", JSON.stringify(this.currentUser));
        this._notify();
        callback(null, this.currentUser);

      } else {
        const { auth, createUserWithEmailAndPassword, updateProfile } = this._fb;
        createUserWithEmailAndPassword(auth, email, password)
          .then(({ user }) =>
            updateProfile(user, { displayName: name }).then(() => {
              const fallbackAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.email)}`;
              this._saveMeta(user.uid, { name });
              // onAuthStateChanged will fire and call _notify automatically
              callback(null, { uid: user.uid, email, displayName: name, photoURL: fallbackAvatar });
            })
          )
          .catch(err => callback(new Error(this._friendlyError(err))));
      }
    },

    login: function (email, password, callback) {
      // For mock mode, enforce @gmail.com so it matches signup rule.
      // For Firebase, let Firebase validate the email — no pre-check needed.
      if (this.isMock) {
        if (!email.toLowerCase().endsWith("@gmail.com"))
          return callback(new Error("Please enter the Gmail address you registered with."));

        const user = this._mockUsers().find(
          u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (!user) return callback(new Error("No account found, or password is incorrect."));

        const meta = this._loadMeta(user.uid);
        const fallbackAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.email)}`;
        const photoURL = (meta.photoURL === "none") ? null : (meta.photoURL || fallbackAvatar);
        this.currentUser = { uid: user.uid, email: user.email, displayName: user.name, photoURL };
        localStorage.setItem("mock_auth_session", JSON.stringify(this.currentUser));
        this._notify();
        callback(null, this.currentUser);

      } else {
        const { auth, signInWithEmailAndPassword } = this._fb;
        signInWithEmailAndPassword(auth, email.trim(), password)
          .then(({ user }) => {
            const meta = this._loadMeta(user.uid);
            const fallbackAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.email)}`;
            const photoURL = (meta.photoURL === "none") ? null : (meta.photoURL || user.photoURL || fallbackAvatar);
            callback(null, {
              uid:         user.uid,
              email:       user.email,
              displayName: meta.name || user.displayName || user.email.split("@")[0],
              photoURL
            });
          })
          .catch(err => callback(new Error(this._friendlyError(err))));
      }
    },

    loginWithGoogle: function (callback) {
      if (this.isMock) {
        // Mock Google login (no popup needed)
        const email = "google_hacker@gmail.com";
        const name = "Google Hacker";
        const fallbackAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`;
        this.currentUser = { uid: "mock_google_123", email, displayName: name, photoURL: fallbackAvatar };
        localStorage.setItem("mock_auth_session", JSON.stringify(this.currentUser));
        localStorage.setItem("ctf_active_user_session", JSON.stringify(this.currentUser));
        this._setCookie("ctf_active_user_session", JSON.stringify(this.currentUser), 7);
        this._notify();
        callback(null, this.currentUser);
      } else {
        const { auth, GoogleAuthProvider, signInWithPopup } = this._fb;
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then(({ user }) => {
            const meta = this._loadMeta(user.uid);
            const fallbackAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.email)}`;
            const photoURL = (meta.photoURL === "none") ? null : (meta.photoURL || user.photoURL || fallbackAvatar);
            const payload = {
              uid:         user.uid,
              email:       user.email,
              displayName: meta.name || user.displayName || user.email.split("@")[0],
              photoURL
            };
            this.currentUser = payload;
            this._notify();
            callback(null, payload);
          })
          .catch(err => {
            console.warn("Firebase Google login failed, falling back to mock: ", err);
            const email = "google_hacker@gmail.com";
            const name = "Google Hacker (Mock)";
            const fallbackAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`;
            this.currentUser = { uid: "mock_google_123", email, displayName: name, photoURL: fallbackAvatar };
            localStorage.setItem("mock_auth_session", JSON.stringify(this.currentUser));
            localStorage.setItem("ctf_active_user_session", JSON.stringify(this.currentUser));
            this._setCookie("ctf_active_user_session", JSON.stringify(this.currentUser), 7);
            this._notify();
            
            // Display a warning toast to notify the user of the fallback
            const toastCont = document.getElementById("toast-container");
            if (toastCont) {
              const el = document.createElement("div");
              el.className = "toast error";
              el.innerHTML = "<strong>Notice:</strong> Google login fell back to offline mock mode (domain unauthorized or Firebase provider disabled).";
              toastCont.appendChild(el);
              setTimeout(() => {
                el.style.opacity = '0';
                el.style.transition = 'opacity 0.5s ease';
                setTimeout(() => el.remove(), 500);
              }, 5000);
            }
            callback(null, this.currentUser);
          });
      }
    },

    logout: function (callback) {
      localStorage.removeItem("ctf_active_user_session");
      this._eraseCookie("ctf_active_user_session");
      localStorage.removeItem("mock_auth_session");
      this.currentUser = null;
      if (this.isMock) {
        this._notify();
        if (callback) callback(null);
      } else {
        this._fb.signOut(this._fb.auth)
          .then(() => { if (callback) callback(null); })
          .catch(err => { if (callback) callback(err); });
      }
    },

    /* ── Helpers ── */
    _mockUsers: function () {
      try { return JSON.parse(localStorage.getItem("mock_users_db")) || []; }
      catch (_) { return []; }
    },

    _friendlyError: function (err) {
      const map = {
        "auth/email-already-in-use":      "An account with this Gmail already exists.",
        "auth/invalid-email":             "Please enter a valid Gmail address.",
        "auth/weak-password":             "Password must be at least 6 characters.",
        "auth/user-not-found":            "No account found for this Gmail address.",
        "auth/wrong-password":            "Incorrect password.",
        "auth/invalid-credential":        "Invalid Gmail address or password.",
        "auth/too-many-requests":         "Too many attempts. Please wait and try again.",
        "auth/network-request-failed":    "Network error. Check your connection.",
        "auth/configuration-not-found":   "Firebase Email/Password sign-in is not enabled. Go to Firebase Console → Authentication → Sign-in method → Email/Password → Enable.",
        "auth/unauthorized-domain":       "This domain is not authorised in Firebase. Go to Firebase Console → Authentication → Settings → Authorized domains and add '127.0.0.1'.",
        "auth/operation-not-allowed":     "Email/Password sign-in is disabled. Enable it in Firebase Console → Authentication → Sign-in method.",
      };
      return map[err.code] || err.message;
    },

    /* ── Dynamic navbar update ── */
        _fixAllLinks: function () {
      const h = window.location.hostname;
      const p = window.location.protocol;
      if (!h || h === "localhost" || h === "127.0.0.1") return;

      document.querySelectorAll("a").forEach(a => {
        let href = a.getAttribute("href");
        if (href) {
          const pattern = /^https?:\/\/(localhost|127\.0\.0\.1)/;
          if (pattern.test(href)) {
            href = href.replace(pattern, p + "//" + h);
            a.setAttribute("href", href);
          }
        }
      });
    },
    _updateNavbar: function () {
      this._fixAllLinks();
      const navLinks = document.querySelector(".navbar .nav-links");
      const dropdown = document.querySelector(".navbar .dropdown");
      if (!navLinks) return;

      const path = window.location.pathname.replace(/\\/g, "/");

      // Dynamically remove the Learn and Create Room options from the Challenges website navbar
      navLinks.querySelectorAll("a").forEach(a => {
        const text = a.textContent.trim().toLowerCase();
        if (text === "learn" || text === "create room") {
          a.remove();
        }
      });

      // Highlight the active link dynamically based on page location on Challenges website
      let homeLink = null;
      let challengesLink = null;
      let rulesLink = null;

      navLinks.querySelectorAll("a").forEach(a => {
        const text = a.textContent.trim().toLowerCase();
        if (text === "home") {
          homeLink = a;
        } else if (text === "challenges") {
          challengesLink = a;
        } else if (text === "rules") {
          rulesLink = a;
        }
        a.classList.remove("active");
      });

      if (path.includes("/challenges.html") || path.includes("/web/") || path.includes("/crypto/") || path.includes("-challenge-lab") || path.includes("-ctf-lab")) {
        if (challengesLink) challengesLink.classList.add("active");
      } else if (path.includes("/rules.html")) {
        if (rulesLink) rulesLink.classList.add("active");
      } else if (path.includes("/index.html") || path === "/" || path === "") {
        if (homeLink) homeLink.classList.add("active");
      }

      // Remove any previously inserted Login button
      const existing = document.getElementById("nav-auth-login-btn");
      if (existing) existing.remove();

      if (this.currentUser) {
        if (dropdown) {
          dropdown.style.display = "block";

          // Update trigger label to show a circular avatar
          const trigger = dropdown.querySelector("a[aria-haspopup='true']");
          if (trigger && this.currentUser.displayName) {
            if (this.currentUser.photoURL) {
              trigger.innerHTML = `<img src="${this.currentUser.photoURL}" style="width:32px; height:32px; border-radius:50%; object-fit: cover;" referrerpolicy="no-referrer" alt="Avatar">`;
            } else {
              const initials = this.currentUser.displayName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
              trigger.innerHTML = `<div style="width:32px; height:32px; border-radius:50%; background:#ff3366; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:14px;">${initials}</div>`;
            }
            trigger.style.padding = "5px"; // Adjust padding for the avatar
          }

          // Wire each dropdown item by its text label
          dropdown.querySelectorAll(".dropdown-content a").forEach((link) => {
            const label = link.textContent.trim().toLowerCase();

            if (label === "dashboard") {
              link.href    = `${protocol}//${host}:8002/dashboard.html`;
              link.onclick = null;

            } else if (label === "settings") {
              link.href    = `${protocol}//${host}:8002/settings.html`;
              link.onclick = null;

            } else if (label === "logout") {
              link.href    = "javascript:void(0)";
              link.onclick = (e) => {
                e.preventDefault();
                this.logout(() => {
                  window.location.href = `${protocol}//${host}:8002/login/index.html`;
                });
              };
            }
          });
        }

      } else {
        // Hide dropdown, show Login button
        if (dropdown) dropdown.style.display = "none";

        const href = `${protocol}//${host}:8002/login/index.html`;
        const btn = document.createElement("a");
        btn.id          = "nav-auth-login-btn";
        btn.href        = href;
        btn.className   = "auth-btn";
        btn.textContent = "Login";

        if (dropdown) navLinks.insertBefore(btn, dropdown);
        else          navLinks.appendChild(btn);
      }
    },

  };

  window.authService = authService;

  // Bootstrap
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", () => authService.init());
  else
    authService.init();
})();
