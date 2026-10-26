/**
 * ============================================================
 * 🔒 SECURITY HARDENING MODULE v2.0 (FIXED)
 * ============================================================
 *
 * CORRECCIONES v2.0 (respecto a v1.0):
 *  ✅ Fingerprint estable (solo origin) → MasterKey nunca se regenera
 *  ✅ Solo se cifran CREDENCIALES (token, password, secret)
 *     Los datos de negocio (projects, tasks...) NUNCA se cifran
 *  ✅ decryptString devuelve null en fallo (no ciphertext)
 *  ✅ Manejo de QuotaExceededError con fallback a plano
 *  ✅ DOMPurify: 'draggable' permitido, <form> no bloqueado
 *  ✅ Migración de datos legacy con backup automático
 *  ✅ Null safety en todos los interceptores
 *
 * ⚠️  ORDEN DE CARGA (index.html):
 *   <script src="...crypto-js.min.js"></script>
 *   <script src="...purify.min.js"></script>
 *   <script src="security-hardening.js"></script>
 *   <script src="script.js"></script>
 * ============================================================
 */

(function () {
  'use strict';

  if (window.__SECURITY_HARDENING_LOADED__) {
    console.warn('🔒 security-hardening.js ya cargado.');
    return;
  }
  window.__SECURITY_HARDENING_LOADED__ = true;

  // ══════════════════════════════════════════════════════════
  // CONFIGURACIÓN
  // ══════════════════════════════════════════════════════════
  const CONFIG = {
    ENC_PREFIX: 'enc.v1.',

    SALT_STORAGE_KEY: '__sec_hardening_salt__',
    MK_STORAGE_KEY: '__sec_hardening_mk__',
    MK_CACHE_KEY: '__sec_hardening_mk_cache__',

    PBKDF2_ITERATIONS: 50000,
    KEY_SIZE_WORDS: 8,

    // ✅ SOLO credenciales. Nada más se cifra.
    SENSITIVE_KEYS: [
      'authToken', 'token', 'auth_token', 'jwt',
      'password', 'pass', 'secret',
      'apiKey', 'api_key',
      'slack_webhook'
    ],

    // ❌ NUNCA se cifran (grandes datasets + datos que leen muchos scripts)
    PASSTHROUGH_KEYS: [
      'preferredLanguage', 'modalLanguage', 'theme', 'systemConfig',
      'activeView', 'lastSync', 'projectMethodology', 'currentProjectIndex',
      'user', 'userEmail', 'clienteId', 'userPlan', 'userLicense',
      'userName', 'userId', 'currentProjectId',
      'projects', 'projectsData', 'projectData', 'project', 'projectTasks',
      'tasks', 'stakeholdersData', 'riesgosData', 'leccionesAprendidas',
      'issueLog', 'decisionLog', 'pmMeetings', 'comunicacionesData',
      'procurementItems', 'encuestas', 'hitos', 'accionesPreventivas',
      'habilidades', 'reconocimientos', 'kickoffDocumentos',
      'actasConstitutivas', 'planesProyecto', 'wbsGeneradas',
      'planesRiesgos', 'informesEVM', 'informesFinales',
      'planesCalidad', 'planesComunicaciones', 'actasCierre',
      'colaboradoresData', 'notificaciones', 'historialReportes'
    ],

    AUTO_LOGOUT_MS: 30 * 60 * 1000,

    ALLOWED_FETCH_DOMAINS: [
      'mi-sistema-proyectos-backend-4.onrender.com',
      'localhost', '127.0.0.1',
      'cdn.jsdelivr.net', 'cdnjs.cloudflare.com',
      'api.stripe.com', 'checkout.stripe.com',
      'googletagmanager.com', 'google-analytics.com',
      'region1.google-analytics.com',
      'kit.fontawesome.com', 'fonts.googleapis.com',
      'fonts.gstatic.com', 'cdn.socket.io'
    ]
  };

  // ══════════════════════════════════════════════════════════
  // ESTADO
  // ══════════════════════════════════════════════════════════
  const state = {
    cryptoReady: false,
    masterKey: null,
    originalMethods: {
      localStorageGetItem: null, localStorageSetItem: null,
      localStorageRemoveItem: null, localStorageClear: null,
      fetch: null,
      innerHTMLSetter: null, innerHTMLGetter: null,
      consoleLog: null, consoleInfo: null, consoleWarn: null
    },
    lastActivity: Date.now(),
    isLoggingOut: false
  };

  const decryptedCache = new Map();

  const log = (msg, data) => {
    if (window.__SECURITY_DEBUG__) {
      console.log(`%c🔒 [SEC] ${msg}`, 'color:#22c55e;font-weight:bold', data || '');
    }
  };
  const warn = (msg, data) => console.warn(`⚠️ [SEC] ${msg}`, data || '');

  function isSensitiveKey(key) {
    if (typeof key !== 'string') return false;
    if (key.startsWith('__sec_hardening')) return false;
    if (CONFIG.PASSTHROUGH_KEYS.includes(key)) return false;
    return CONFIG.SENSITIVE_KEYS.includes(key);
  }

  function isEncryptedValue(v) {
    return typeof v === 'string' && v.startsWith(CONFIG.ENC_PREFIX);
  }

  // ✅ STABLE FINGERPRINT - solo origin, nunca cambia
  function getStableFingerprint() {
    try { return location.origin || 'unknown'; }
    catch (e) { return 'default'; }
  }

  function getOrCreateSalt() {
    let salt = null;
    try { salt = localStorage.getItem(CONFIG.SALT_STORAGE_KEY); } catch (e) {}
    if (!salt) {
      salt = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Base64);
      try { localStorage.setItem(CONFIG.SALT_STORAGE_KEY, salt); } catch (e) {}
    }
    return salt;
  }

  function deriveKeyFromFingerprint(salt) {
    const fp = getStableFingerprint();
    const combined = fp + '|' + salt;
    return CryptoJS.PBKDF2(combined, CryptoJS.enc.Base64.parse(salt), {
      keySize: CONFIG.KEY_SIZE_WORDS,
      iterations: CONFIG.PBKDF2_ITERATIONS,
      hasher: CryptoJS.algo.SHA256
    });
  }

  function initMasterKey() {
    if (typeof CryptoJS === 'undefined') {
      warn('CryptoJS no cargado. Cifrado DESACTIVADO.');
      return false;
    }

    const salt = getOrCreateSalt();
    const derivedKey = deriveKeyFromFingerprint(salt);

    try {
      const cached = sessionStorage.getItem(CONFIG.MK_CACHE_KEY);
      if (cached) {
        state.masterKey = CryptoJS.enc.Base64.parse(cached);
        return true;
      }
    } catch (e) {}

    let stored = null;
    try { stored = localStorage.getItem(CONFIG.MK_STORAGE_KEY); } catch (e) {}

    if (stored) {
      try {
        const decrypted = CryptoJS.AES.decrypt(stored, derivedKey);
        const mkB64 = decrypted.toString(CryptoJS.enc.Utf8);
        if (mkB64) {
          state.masterKey = CryptoJS.enc.Base64.parse(mkB64);
          try { sessionStorage.setItem(CONFIG.MK_CACHE_KEY, mkB64); } catch (e) {}
          return true;
        }
      } catch (e) {
        warn('No se pudo descifrar MasterKey existente. Se regenerará.');
      }
    }

    const newMK = CryptoJS.lib.WordArray.random(32);
    const newMKB64 = newMK.toString(CryptoJS.enc.Base64);
    try {
      const enc = CryptoJS.AES.encrypt(newMKB64, derivedKey).toString();
      localStorage.setItem(CONFIG.MK_STORAGE_KEY, enc);
      sessionStorage.setItem(CONFIG.MK_CACHE_KEY, newMKB64);
    } catch (e) {}
    state.masterKey = newMK;
    return true;
  }

  function encryptString(plaintext) {
    if (!state.masterKey) return plaintext;
    if (plaintext == null) return plaintext;
    const str = typeof plaintext === 'string' ? plaintext : String(plaintext);
    if (!str) return plaintext;
    try {
      const cipher = CryptoJS.AES.encrypt(str, state.masterKey).toString();
      return CONFIG.ENC_PREFIX + cipher;
    } catch (e) {
      console.error('[SEC] Error cifrando:', e);
      return plaintext;
    }
  }

  // ✅ Devuelve null en fallo (NUNCA el ciphertext)
  function decryptString(ciphertext) {
    if (!isEncryptedValue(ciphertext)) return ciphertext;
    if (!state.masterKey) return null;
    try {
      const raw = ciphertext.substring(CONFIG.ENC_PREFIX.length);
      const decrypted = CryptoJS.AES.decrypt(raw, state.masterKey);
      const result = decrypted.toString(CryptoJS.enc.Utf8);
      return result || null;
    } catch (e) {
      return null;
    }
  }

  // ══════════════════════════════════════════════════════════
  // INTERCEPTOR localStorage
  // ══════════════════════════════════════════════════════════
  function installLocalStorageInterceptor() {
    try {
      state.originalMethods.localStorageGetItem = Storage.prototype.getItem;
      state.originalMethods.localStorageSetItem = Storage.prototype.setItem;
      state.originalMethods.localStorageRemoveItem = Storage.prototype.removeItem;
      state.originalMethods.localStorageClear = Storage.prototype.clear;

      Storage.prototype.getItem = function (key) {
        if (!isSensitiveKey(key)) {
          try { return state.originalMethods.localStorageGetItem.call(this, key); }
          catch (e) { return null; }
        }
        if (decryptedCache.has(key)) return decryptedCache.get(key);

        let stored;
        try { stored = state.originalMethods.localStorageGetItem.call(this, key); }
        catch (e) { return null; }
        if (stored == null) return null;

        let plain = stored;
        if (isEncryptedValue(stored)) {
          plain = decryptString(stored);
          if (plain === null) {
            console.warn(`[SEC] No se pudo descifrar "${key}". Se elimina (corrupto).`);
            try { state.originalMethods.localStorageRemoveItem.call(this, key); } catch (e) {}
            return null;
          }
        }
        decryptedCache.set(key, plain);
        return plain;
      };

      Storage.prototype.setItem = function (key, value) {
        if (!isSensitiveKey(key)) {
          return state.originalMethods.localStorageSetItem.call(this, key, value);
        }
        if (value === undefined || value === null) {
          decryptedCache.delete(key);
          return state.originalMethods.localStorageRemoveItem.call(this, key);
        }
        const strValue = typeof value === 'string' ? value : JSON.stringify(value);
        if (strValue === undefined || strValue === null) {
          decryptedCache.delete(key);
          return state.originalMethods.localStorageRemoveItem.call(this, key);
        }
        let toStore = strValue;
        if (state.cryptoReady && state.masterKey) {
          toStore = encryptString(strValue);
        }
        try {
          decryptedCache.set(key, strValue);
          return state.originalMethods.localStorageSetItem.call(this, key, toStore);
        } catch (e) {
          if (e.name === 'QuotaExceededError' || e.code === 22) {
            console.error(`[SEC] Quota exceeded en "${key}". Guardando sin cifrar.`);
            decryptedCache.set(key, strValue);
            return state.originalMethods.localStorageSetItem.call(this, key, strValue);
          }
          throw e;
        }
      };

      Storage.prototype.removeItem = function (key) {
        decryptedCache.delete(key);
        return state.originalMethods.localStorageRemoveItem.call(this, key);
      };

      Storage.prototype.clear = function () {
        decryptedCache.clear();
        return state.originalMethods.localStorageClear.call(this);
      };

      log('Interceptor localStorage instalado');
    } catch (e) {
      warn('No se pudo instalar interceptor localStorage:', e);
    }
  }

  // ══════════════════════════════════════════════════════════
  // TOKEN STORE
  // ══════════════════════════════════════════════════════════
  window.SecureTokenStore = {
    _token: null,
    set(token) {
      this._token = token;
      try {
        if (token) localStorage.setItem('authToken', token);
        else localStorage.removeItem('authToken');
      } catch (e) {}
    },
    get() {
      if (this._token) return this._token;
      try {
        const t = localStorage.getItem('authToken');
        if (t) { this._token = t; return t; }
      } catch (e) {}
      return null;
    },
    clear() {
      this._token = null;
      try { localStorage.removeItem('authToken'); } catch (e) {}
    },
    decode() {
      const token = this.get();
      if (!token) return null;
      try { return JSON.parse(atob(token.split('.')[1])); }
      catch (e) { return null; }
    }
  };

  try {
    Object.defineProperty(window, 'authToken', {
      configurable: true,
      get() { return window.SecureTokenStore.get() || ''; },
      set(v) { window.SecureTokenStore.set(v); }
    });
    log('window.authToken vinculado a SecureTokenStore');
  } catch (e) {
    warn('No se pudo redefinir window.authToken:', e);
  }

  // ══════════════════════════════════════════════════════════
  // XSS PROTECTION
  // ══════════════════════════════════════════════════════════
  function installXSSProtection() {
    if (typeof Element === 'undefined') return;
    const descriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
    if (!descriptor || !descriptor.set) return;

    state.originalMethods.innerHTMLSetter = descriptor.set;
    state.originalMethods.innerHTMLGetter = descriptor.get;

    const hasDOMPurify = typeof window.DOMPurify !== 'undefined' &&
                        typeof window.DOMPurify.sanitize === 'function';

    function basicSanitize(html) {
      if (typeof html !== 'string') return html;
      return html
        .replace(/<\s*script[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, '')
        .replace(/<\s*script[^>]*\/?>/gi, '')
        .replace(/<\s*iframe[^>]*>[\s\S]*?<\s*\/\s*iframe\s*>/gi, '')
        .replace(/<\s*object[^>]*>[\s\S]*?<\s*\/\s*object\s*>/gi, '')
        .replace(/<\s*embed[^>]*\/?>/gi, '')
        .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
        .replace(/javascript\s*:/gi, 'blocked:');
    }

    function sanitizeHTML(html) {
      if (typeof html !== 'string') return html;
      if (html.length < 8) return html;
      try {
        if (hasDOMPurify) {
          return window.DOMPurify.sanitize(html, {
            ALLOWED_TAGS: [
              'a','b','i','u','em','strong','span','div','p','br','hr',
              'ul','ol','li','h1','h2','h3','h4','h5','h6',
              'table','thead','tbody','tr','th','td','caption','colgroup','col',
              'img','svg','path','circle','rect','line','polyline','polygon',
              'g','defs','linearGradient','stop','marker','text','tspan',
              'button','input','select','option','textarea','label','form',
              'canvas','video','audio','source','figure','figcaption',
              'header','footer','section','article','aside','nav','main',
              'code','pre','blockquote','cite','abbr','time','small','mark',
              'del','ins','sub','sup','kbd','samp','var','wbr','details','summary'
            ],
            ALLOWED_ATTR: [
              'class','id','style','title','alt','src','href','width','height',
              'draggable',
              'role','aria-*','data-*','type','value','placeholder','name',
              'for','colspan','rowspan','viewBox','fill','stroke','stroke-width',
              'd','cx','cy','r','x','y','x1','y1','x2','y2','points','transform',
              'offset','stop-color','stop-opacity','gradientUnits','markerWidth',
              'markerHeight','refX','refY','orient','target','rel','download',
              'min','max','step','pattern','required','disabled','readonly',
              'checked','selected','multiple','rows','cols','autocomplete',
              'contenteditable','tabindex','lang','dir','hidden','open',
              'onclick','onchange','oninput','onsubmit','onmouseover','onmouseout',
              'onmouseenter','onmouseleave','onfocus','onblur','onkeydown',
              'onkeyup','onkeypress','onmousedown','onmouseup','ondblclick'
            ],
            ALLOW_DATA_ATTR: true,
            ALLOW_UNKNOWN_PROTOCOLS: false,
            FORBID_TAGS: ['script','iframe','object','embed','base']
          });
        } else {
          return basicSanitize(html);
        }
      } catch (e) {
        return basicSanitize(html);
      }
    }

    window.sanitizeHTML = sanitizeHTML;

    try {
      Object.defineProperty(Element.prototype, 'innerHTML', {
        configurable: true,
        get() { return state.originalMethods.innerHTMLGetter.call(this); },
        set(html) {
          const safe = sanitizeHTML(html);
          return state.originalMethods.innerHTMLSetter.call(this, safe);
        }
      });
      log('Protección XSS instalada');
    } catch (e) {
      warn('No se pudo instalar protección XSS:', e);
    }
  }

  // ══════════════════════════════════════════════════════════
  // FETCH INTERCEPTOR
  // ══════════════════════════════════════════════════════════
  function installFetchInterceptor() {
    if (typeof window.fetch !== 'function') return;
    state.originalMethods.fetch = window.fetch;

    window.fetch = function (input, init) {
      try {
        let url = typeof input === 'string' ? input : (input && input.url) || '';
        let hostname = '';
        try { hostname = new URL(url, location.origin).hostname; } catch (e) {}

        if (hostname && !CONFIG.ALLOWED_FETCH_DOMAINS.some(d => hostname.endsWith(d))) {
          warn(`Fetch a dominio no permitido: ${hostname}`);
        }

        init = init || {};
        init.headers = init.headers || {};

        const hasAuth = (init.headers instanceof Headers && init.headers.has('Authorization')) ||
          (typeof init.headers === 'object' && !(init.headers instanceof Headers) &&
            Object.keys(init.headers).some(k => k.toLowerCase() === 'authorization'));

        if (!hasAuth) {
          const token = window.SecureTokenStore.get();
          if (token) {
            if (init.headers instanceof Headers) {
              init.headers.set('Authorization', `Bearer ${token}`);
            } else {
              init.headers['Authorization'] = `Bearer ${token}`;
            }
          }
        }

        if (!init.cache) init.cache = 'no-store';

        return state.originalMethods.fetch.call(this, input, init);
      } catch (e) {
        return state.originalMethods.fetch.call(this, input, init);
      }
    };
    log('Interceptor fetch instalado');
  }

  // ══════════════════════════════════════════════════════════
  // CONSOLE MASKING
  // ══════════════════════════════════════════════════════════
  function installConsoleMasking() {
    const SENSITIVE_PATTERNS = [
      /Bearer\s+[A-Za-z0-9\-._~+/]+=*/gi,
      /"authToken"\s*:\s*"[^"]+"/gi,
      /"password"\s*:\s*"[^"]+"/gi,
      /eyJ[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+/g
    ];

    function mask(value, depth) {
      depth = depth || 0;
      if (depth > 3) return value;
      if (value instanceof Error) return value;
      if (typeof value === 'string') {
        let v = value;
        SENSITIVE_PATTERNS.forEach(p => {
          v = v.replace(p, m => m.length > 12 ? m.substring(0, 8) + '...[MASKED]' : '[MASKED]');
        });
        return v;
      }
      if (value && typeof value === 'object') {
        try {
          if (Array.isArray(value)) return value.map(x => mask(x, depth + 1));
          const out = {};
          for (const k of Object.keys(value)) {
            if (/^(authToken|token|password|pass|secret|api[_-]?key)$/i.test(k)) {
              out[k] = '[MASKED]';
            } else {
              out[k] = mask(value[k], depth + 1);
            }
          }
          return out;
        } catch (e) { return value; }
      }
      return value;
    }

    ['log', 'info', 'warn'].forEach(level => {
      const cap = 'console' + level.charAt(0).toUpperCase() + level.slice(1);
      state.originalMethods[cap] = console[level];
      console[level] = function (...args) {
        return state.originalMethods[cap].apply(console, args.map(a => mask(a, 0)));
      };
    });
    log('Enmascaramiento de consola activado');
  }

  // ══════════════════════════════════════════════════════════
  // AUTO-LOGOUT
  // ══════════════════════════════════════════════════════════
  function installAutoLogout() {
    const reset = () => { state.lastActivity = Date.now(); };
    ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(evt => {
      document.addEventListener(evt, reset, { passive: true });
    });

    setInterval(() => {
      if (!window.SecureTokenStore.get()) return;
      const idle = Date.now() - state.lastActivity;
      if (idle > CONFIG.AUTO_LOGOUT_MS && !state.isLoggingOut) {
        state.isLoggingOut = true;
        warn('Auto-logout por inactividad');
        try {
          window.SecureTokenStore.clear();
          localStorage.removeItem('user');
          sessionStorage.clear();
        } catch (e) {}
        alert('🔒 Sesión cerrada por inactividad (30 min).');
        location.reload();
      }
    }, 60000);
    log('Auto-logout activado');
  }

  // ══════════════════════════════════════════════════════════
  // CSP
  // ══════════════════════════════════════════════════════════
  function injectCSP() {
    if (document.querySelector('meta[http-equiv="Content-Security-Policy"]')) return;

    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://www.googletagmanager.com https://cdn.socket.io https://kit.fontawesome.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com",
      "font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://mi-sistema-proyectos-backend-4.onrender.com https://api.stripe.com https://cdn.jsdelivr.net https://www.google-analytics.com https://region1.google-analytics.com wss://mi-sistema-proyectos-backend-4.onrender.com",
      "frame-src 'self' https://js.stripe.com https://checkout.stripe.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ');

    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = csp;
    (document.head || document.documentElement).insertBefore(
      meta, (document.head || document.documentElement).firstChild
    );
    log('CSP inyectada');
  }

  // ══════════════════════════════════════════════════════════
  // MIGRACIÓN de datos legacy cifrados con v1 (fingerprint volátil)
  // ══════════════════════════════════════════════════════════
  function migrateLegacyEncryptedData() {
    if (!state.cryptoReady) return;
    let migrated = 0, deleted = 0, backedUp = 0;

    try {
      const keys = Object.keys(localStorage);
      keys.forEach(k => {
        if (k.startsWith('__sec_hardening')) return;
        const raw = state.originalMethods.localStorageGetItem.call(localStorage, k);
        if (!raw || !isEncryptedValue(raw)) return;

        if (isSensitiveKey(k)) {
          const decrypted = decryptString(raw);
          if (decrypted === null) {
            state.originalMethods.localStorageRemoveItem.call(localStorage, k);
            deleted++;
            console.warn(`[SEC] ⚠️ "${k}" cifrado legacy ilegible. Eliminado.`);
          }
          return;
        }

        const decrypted = decryptString(raw);
        if (decrypted === null) {
          const backupKey = k + '__legacy_enc_backup';
          state.originalMethods.localStorageSetItem.call(localStorage, backupKey, raw);
          state.originalMethods.localStorageRemoveItem.call(localStorage, k);
          backedUp++;
          console.warn(`[SEC] ⚠️ "${k}" cifrado legacy ilegible. Preservado como "${backupKey}".`);
        } else {
          state.originalMethods.localStorageSetItem.call(localStorage, k, decrypted);
          migrated++;
          log(`[SEC] ✅ "${k}" migrado a plano`);
        }
      });
    } catch (e) {
      warn('Error migrando:', e);
    }

    if (migrated || deleted || backedUp) {
      console.log(
        `%c[SEC] Migración: ${migrated} a plano, ${deleted} eliminados, ${backedUp} backups.`,
        'color:#f59e0b;font-weight:bold'
      );
    }
  }

  // ══════════════════════════════════════════════════════════
  // HELPERS PÚBLICOS
  // ══════════════════════════════════════════════════════════
  window.securityStatus = function () {
    console.group('🔒 SECURITY STATUS');
    console.log('Módulo cargado:', !!window.__SECURITY_HARDENING_LOADED__);
    console.log('Cifrado activo:', state.cryptoReady ? '✅' : '❌');
    console.log('MasterKey en memoria:', state.masterKey ? '✅' : '❌');
    console.log('Fingerprint:', getStableFingerprint());
    console.log('Token actual:', window.SecureTokenStore.get() ? '[PRESENTE]' : '[AUSENTE]');

    try {
      const raw = state.originalMethods.localStorageGetItem.call(localStorage, 'authToken');
      if (raw) {
        console.log('authToken en storage:', raw.startsWith(CONFIG.ENC_PREFIX) ? '🔒 cifrado' : '⚠️ plano');
      }
      const rawP = state.originalMethods.localStorageGetItem.call(localStorage, 'projects');
      if (rawP) {
        console.log('projects en storage:', rawP.startsWith(CONFIG.ENC_PREFIX) ? '⚠️ CIFRADO (debería ser plano)' : '✅ plano');
      }
    } catch (e) {}
    console.groupEnd();
  };

  window.securityRecover = function () {
    if (!confirm('⚠️ Esto limpiará el estado de seguridad (no los proyectos).\n\nSe cerrará sesión. ¿Continuar?')) return;
    try {
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith('__sec_hardening')) localStorage.removeItem(k);
      });
      sessionStorage.clear();
      localStorage.removeItem('authToken');
      console.log('[SEC] Estado limpiado. Recargando...');
      setTimeout(() => location.reload(), 500);
    } catch (e) {
      console.error('[SEC] Error:', e);
    }
  };

  // ══════════════════════════════════════════════════════════
  // BOOT
  // ══════════════════════════════════════════════════════════
  function boot() {
    log('Iniciando security-hardening.js v2.0...');
    if (typeof CryptoJS === 'undefined') {
      warn('CryptoJS no cargado. Cifrado DESACTIVADO.');
    } else {
      state.cryptoReady = initMasterKey();
    }

    installLocalStorageInterceptor();
    installFetchInterceptor();
    installXSSProtection();
    installConsoleMasking();
    installAutoLogout();
    injectCSP();
    migrateLegacyEncryptedData();

    console.log('%c🔒 Security Hardening v2.0 ACTIVO', 'color:#22c55e;font-size:14px;font-weight:bold');
    console.log('%c💡 securityStatus()  → ver estado', 'color:#3b82f6');
    console.log('%c💡 securityRecover() → recuperación', 'color:#3b82f6');
  }

  if (document.readyState === 'loading') boot();
  else boot();

  window.__SECURITY_CONFIG__ = CONFIG;
  window.__SECURITY_STATE__ = state;
})();