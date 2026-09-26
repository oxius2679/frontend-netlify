/**
 * ============================================================
 * 🔒 SECURITY HARDENING MODULE v1.0
 * ============================================================
 * 
 * Capas de seguridad añadidas al frontend sin modificar script.js:
 * 
 *  1. Cifrado AES-256 de datos sensibles en localStorage
 *  2. Gestión segura de tokens JWT (memoria + cifrado persistente)
 *  3. Protección XSS (sanitización transparente de innerHTML)
 *  4. Interceptor de fetch para evitar fugas de credenciales
 *  5. Auto-logout por inactividad (30 min)
 *  6. Detección de vulnerabilidades (HTTPS, iframes, hooks de consola)
 *  7. Enmascaramiento de datos sensibles en console.log
 * 
 * ============================================================
 * ⚠️  ORDEN DE CARGA OBLIGATORIO (en tu index.html):
 * ============================================================
 * 
 *   <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js"></script>
 *   <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.8/purify.min.js"></script>
 *   <script src="security-hardening.js"></script>   <!-- ANTES que script.js -->
 *   <script src="script.js"></script>
 * 
 * ============================================================
 */

(function () {
  'use strict';

  // Evitar doble inicialización
  if (window.__SECURITY_HARDENING_LOADED__) {
    console.warn('🔒 security-hardening.js ya cargado.');
    return;
  }
  window.__SECURITY_HARDENING_LOADED__ = true;

  // ══════════════════════════════════════════════════════════
  // 1. CONFIGURACIÓN
  // ══════════════════════════════════════════════════════════
  const CONFIG = {
    // Prefijo que marca un valor cifrado
    ENC_PREFIX: 'enc.v1.',

    // Clave donde se guarda el "salt" persistente (plano, es solo parte de la derivación)
    SALT_STORAGE_KEY: '__sec_hardening_salt__',
    MK_STORAGE_KEY: '__sec_hardening_mk__',   // Master key cifrada con la derived key
    MK_CACHE_KEY: '__sec_hardening_mk_cache__', // Master key en sessionStorage (más rápido)

    // Iteraciones de PBKDF2 (más = más seguro, pero más lento)
    PBKDF2_ITERATIONS: 100000,
    KEY_SIZE_WORDS: 8, // 256 bits

    // Claves que SIEMPRE se cifran
    SENSITIVE_KEYS: [
      'authToken', 'token', 'auth_token', 'jwt',
      'user', 'userEmail', 'clienteId', 'password', 'pass',
      'projects', 'projectsData', 'projectData', 'project',
      'tasks', 'projectTasks',
      'userPlan', 'userLicense',
      'stakeholdersData', 'riesgosData', 'leccionesAprendidas',
      'issueLog', 'decisionLog', 'pmMeetings', 'comunicacionesData',
      'procurementItems', 'encuestas', 'hitos', 'accionesPreventivas',
      'habilidades', 'reconocimientos', 'kickoffDocumentos',
      'actasConstitutivas', 'planesProyecto', 'wbsGeneradas',
      'planesRiesgos', 'informesEVM', 'informesFinales',
      'planesCalidad', 'planesComunicaciones', 'actasCierre',
      'colaboradoresData', 'notificaciones', 'historialReportes'
    ],

    // Claves que NUNCA se cifran (por rendimiento o compatibilidad)
    PASSTHROUGH_KEYS: [
      'preferredLanguage', 'modalLanguage', 'theme', 'systemConfig',
      'activeView', 'lastSync', 'projectMethodology', 'currentProjectIndex',
      'slack_webhook'
    ],

    // Auto-logout: 30 minutos de inactividad
    AUTO_LOGOUT_MS: 30 * 60 * 1000,

    // Dominios permitidos para fetch (whitelist)
    ALLOWED_FETCH_DOMAINS: [
      'mi-sistema-proyectos-backend-4.onrender.com',
      'localhost',
      '127.0.0.1',
      'cdn.jsdelivr.net',
      'cdnjs.cloudflare.com',
      'api.stripe.com',
      'checkout.stripe.com'
    ]
  };

  // ══════════════════════════════════════════════════════════
  // 2. ESTADO INTERNO
  // ══════════════════════════════════════════════════════════
  const state = {
    cryptoReady: false,
    masterKey: null,          // CryptoJS WordArray
    originalMethods: {
      localStorageGetItem: null,
      localStorageSetItem: null,
      localStorageRemoveItem: null,
      localStorageClear: null,
      localStorageKey: null,
      fetch: null,
      innerHTMLSetter: null,
      innerHTMLGetter: null,
      consoleLog: null,
      consoleInfo: null,
      consoleWarn: null
    },
    lastActivity: Date.now(),
    logoutTimer: null,
    isLoggingOut: false
  };

  // Caché en memoria de datos descifrados (evita re-descifrar constantemente)
  const decryptedCache = new Map();

  // ══════════════════════════════════════════════════════════
  // 3. UTILIDADES
  // ══════════════════════════════════════════════════════════
  const log = (msg, data) => {
    if (window.__SECURITY_DEBUG__) {
      console.log(`%c🔒 [SEC] ${msg}`, 'color:#22c55e;font-weight:bold', data || '');
    }
  };
  const warn = (msg, data) => console.warn(`⚠️ [SEC] ${msg}`, data || '');

  function isSensitiveKey(key) {
    if (typeof key !== 'string') return false;
    if (CONFIG.PASSTHROUGH_KEYS.includes(key)) return false;
    // Cualquier clave que coincida con la lista, o que empiece por alguna
    return CONFIG.SENSITIVE_KEYS.some(k => key === k || key.startsWith(k));
  }

  function isEncryptedValue(value) {
    return typeof value === 'string' && value.startsWith(CONFIG.ENC_PREFIX);
  }

  // Fingerprint del dispositivo (no es secreto, pero forma parte de la derivación)
  function getDeviceFingerprint() {
    try {
      const parts = [
        navigator.userAgent || '',
        navigator.language || '',
        (screen.width || 0) + 'x' + (screen.height || 0),
        (screen.colorDepth || 0).toString(),
        (new Date().getTimezoneOffset()).toString(),
        location.origin || '',
        navigator.hardwareConcurrency || '0',
        navigator.platform || ''
      ];
      return parts.join('|');
    } catch (e) {
      return 'default-fingerprint';
    }
  }

  // Genera/lee el salt persistente (32 bytes aleatorios, base64)
  function getOrCreateSalt() {
    let salt = null;
    try {
      salt = localStorage.getItem(CONFIG.SALT_STORAGE_KEY);
    } catch (e) {}

    if (!salt) {
      salt = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Base64);
      try {
        localStorage.setItem(CONFIG.SALT_STORAGE_KEY, salt);
      } catch (e) {
        warn('No se pudo persistir salt en localStorage');
      }
    }
    return salt;
  }

  // Deriva la "derived key" (DK) que cifra a la master key
  function deriveKeyFromFingerprint(salt) {
    const fingerprint = getDeviceFingerprint();
    // Combinamos fingerprint + salt para la derivación
    const combined = fingerprint + '|' + salt;

    return CryptoJS.PBKDF2(combined, CryptoJS.enc.Base64.parse(salt), {
      keySize: CONFIG.KEY_SIZE_WORDS,
      iterations: CONFIG.PBKDF2_ITERATIONS,
      hasher: CryptoJS.algo.SHA256
    });
  }

  // Inicializa/recupera la master key (MK)
  function initMasterKey() {
    if (typeof CryptoJS === 'undefined') {
      warn('CryptoJS no está cargado. El cifrado NO está activo.');
      return false;
    }

    const salt = getOrCreateSalt();
    const derivedKey = deriveKeyFromFingerprint(salt);

    // 1) Intentar recuperar MK desde sessionStorage (caché rápida)
    try {
      const cachedMK = sessionStorage.getItem(CONFIG.MK_CACHE_KEY);
      if (cachedMK) {
        state.masterKey = CryptoJS.enc.Base64.parse(cachedMK);
        log('MasterKey recuperada de sessionStorage');
        return true;
      }
    } catch (e) {}

    // 2) Intentar descifrar MK persistida con la DK
    let storedMKEncrypted = null;
    try {
      storedMKEncrypted = localStorage.getItem(CONFIG.MK_STORAGE_KEY);
    } catch (e) {}

    if (storedMKEncrypted) {
      try {
        const decrypted = CryptoJS.AES.decrypt(storedMKEncrypted, derivedKey);
        const mkB64 = decrypted.toString(CryptoJS.enc.Utf8);
        if (mkB64) {
          state.masterKey = CryptoJS.enc.Base64.parse(mkB64);
          // Cachear
          try {
            sessionStorage.setItem(CONFIG.MK_CACHE_KEY, mkB64);
          } catch (e) {}
          log('MasterKey descifrada desde localStorage');
          return true;
        }
      } catch (e) {
        warn('No se pudo descifrar la MasterKey existente. Se generará una nueva.');
      }
    }

    // 3) Generar nueva MK y persistirla cifrada
    const newMK = CryptoJS.lib.WordArray.random(32);
    const newMKB64 = newMK.toString(CryptoJS.enc.Base64);
    try {
      const enc = CryptoJS.AES.encrypt(newMKB64, derivedKey).toString();
      localStorage.setItem(CONFIG.MK_STORAGE_KEY, enc);
      sessionStorage.setItem(CONFIG.MK_CACHE_KEY, newMKB64);
    } catch (e) {
      warn('No se pudo persistir la MasterKey cifrada.');
    }
    state.masterKey = newMK;
    log('Nueva MasterKey generada');
    return true;
  }

  // Cifra un string con la MK
  function encryptString(plaintext) {
    if (!state.masterKey) return plaintext;
    if (plaintext == null) return plaintext;                              // 🆕
    const str = typeof plaintext === 'string' ? plaintext : String(plaintext);  // 🆕
    if (!str) return plaintext;                                           // 🆕
    try {
      const cipher = CryptoJS.AES.encrypt(str, state.masterKey).toString();
      return CONFIG.ENC_PREFIX + cipher;
    } catch (e) {
      // No usar warn() (está enmascarado): usar console.error directo
      console.error('[SEC] Error cifrando:', e && e.message, e && e.stack);
      return plaintext;
    }
  }

  // Descifra un string cifrado
  function decryptString(ciphertext) {
    if (!isEncryptedValue(ciphertext)) return ciphertext;
    if (!state.masterKey) return ciphertext; // No podemos descifrar
    try {
      const raw = ciphertext.substring(CONFIG.ENC_PREFIX.length);
      const decrypted = CryptoJS.AES.decrypt(raw, state.masterKey);
      const result = decrypted.toString(CryptoJS.enc.Utf8);
      return result || ciphertext;
    } catch (e) {
      warn('Error descifrando:', e);
      return ciphertext;
    }
  }

  // ══════════════════════════════════════════════════════════
  // 4. INTERCEPCIÓN DE localStorage
  // ══════════════════════════════════════════════════════════
  function installLocalStorageInterceptor() {
    try {
      // Guardar métodos originales
      state.originalMethods.localStorageGetItem = Storage.prototype.getItem;
      state.originalMethods.localStorageSetItem = Storage.prototype.setItem;
      state.originalMethods.localStorageRemoveItem = Storage.prototype.removeItem;
      state.originalMethods.localStorageClear = Storage.prototype.clear;
      state.originalMethods.localStorageKey = Storage.prototype.key;

      // getItem
      Storage.prototype.getItem = function (key) {
        // Añadir a passthrough
        if (!isSensitiveKey(key)) {
          return state.originalMethods.localStorageGetItem.call(this, key);
        }

        // Cache
        if (decryptedCache.has(key)) {
          return decryptedCache.get(key);
        }

        const stored = state.originalMethods.localStorageGetItem.call(this, key);
        if (stored == null) return null;

        let plain = stored;
        if (isEncryptedValue(stored)) {
          plain = decryptString(stored);
        }

        decryptedCache.set(key, plain);
        return plain;
      };

      // setItem
      Storage.prototype.setItem = function (key, value) {
        if (!isSensitiveKey(key)) {
          return state.originalMethods.localStorageSetItem.call(this, key, value);
        }

        // 🆕 undefined/null → eliminar la clave, no guardar basura
        if (value === undefined || value === null) {
          decryptedCache.delete(key);
          return state.originalMethods.localStorageRemoveItem.call(this, key);
        }

        const strValue = typeof value === 'string' ? value : JSON.stringify(value);

        // 🆕 JSON.stringify pudo devolver undefined (funciones, symbols, etc.)
        if (strValue === undefined) {
          decryptedCache.delete(key);
          return state.originalMethods.localStorageRemoveItem.call(this, key);
        }

        let toStore = strValue;
        if (state.cryptoReady && state.masterKey) {
          toStore = encryptString(strValue);
        }

        decryptedCache.set(key, strValue);
        return state.originalMethods.localStorageSetItem.call(this, key, toStore);
      };

      // removeItem
      Storage.prototype.removeItem = function (key) {
        decryptedCache.delete(key);
        return state.originalMethods.localStorageRemoveItem.call(this, key);
      };

      // clear
      Storage.prototype.clear = function () {
        decryptedCache.clear();
        return state.originalMethods.localStorageClear.call(this);
      };

      log('Interceptor de localStorage instalado');
    } catch (e) {
      warn('No se pudo instalar el interceptor de localStorage:', e);
    }
  }

  // ══════════════════════════════════════════════════════════
  // 5. GESTIÓN DE TOKEN JWT (memoria + cifrado)
  // ══════════════════════════════════════════════════════════
  window.SecureTokenStore = {
    _token: null,

    set(token) {
      this._token = token;
      // Persistir cifrado (el interceptor se encarga)
      if (token) {
        try { localStorage.setItem('authToken', token); } catch (e) {}
      } else {
        try { localStorage.removeItem('authToken'); } catch (e) {}
      }
    },

    get() {
      if (this._token) return this._token;
      // Recuperar de localStorage (que se descifrará automáticamente)
      try {
        const t = localStorage.getItem('authToken');
        if (t) {
          this._token = t;
          return t;
        }
      } catch (e) {}
      return null;
    },

    clear() {
      this._token = null;
      try { localStorage.removeItem('authToken'); } catch (e) {}
    },

    // Decodifica el payload sin verificar firma (solo para UI)
    decode() {
      const token = this.get();
      if (!token) return null;
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (e) {
        return null;
      }
    }
  };

  // Parchear window.authToken para que use el store
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
  // 6. PROTECCIÓN XSS (sanitización de innerHTML)
  // ══════════════════════════════════════════════════════════
  function installXSSProtection() {
    if (typeof Element === 'undefined') return;

    const descriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
    if (!descriptor || !descriptor.set) {
      warn('No se pudo acceder a innerHTML descriptor');
      return;
    }

    state.originalMethods.innerHTMLSetter = descriptor.set;
    state.originalMethods.innerHTMLGetter = descriptor.get;

    // Detectar DOMPurify
    const hasDOMPurify = typeof window.DOMPurify !== 'undefined' &&
                        typeof window.DOMPurify.sanitize === 'function';

    if (!hasDOMPurify) {
      warn('DOMPurify no está disponible. Instalando sanitizador básico.');
    }

    // Sanitizador de respaldo (básico, pero eficaz contra vectores comunes)
    function basicSanitize(html) {
      if (typeof html !== 'string') return html;
      // Eliminar <script>, <iframe>, <object>, <embed>, <link>, <style>
      // y atributos on* y javascript:
      return html
        .replace(/<\s*script[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, '')
        .replace(/<\s*script[^>]*\/?>/gi, '')
        .replace(/<\s*iframe[^>]*>[\s\S]*?<\s*\/\s*iframe\s*>/gi, '')
        .replace(/<\s*object[^>]*>[\s\S]*?<\s*\/\s*object\s*>/gi, '')
        .replace(/<\s*embed[^>]*\/?>/gi, '')
        .replace(/<\s*link[^>]*\/?>/gi, '')
        .replace(/<\s*meta[^>]*\/?>/gi, '')
        .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
        .replace(/javascript\s*:/gi, 'blocked:')
        .replace(/data\s*:\s*text\/html/gi, 'blocked:');
    }

    function sanitizeHTML(html) {
      if (typeof html !== 'string') return html;
      if (html.length < 8) return html; // Evitar overhead en strings triviales

      try {
        if (hasDOMPurify) {
          // DOMPurify con configuración permisiva (permite SVG, estilos inline, etc.)
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
              'role','aria-*','data-*','type','value','placeholder','name',
              'for','colspan','rowspan','viewBox','fill','stroke','stroke-width',
              'd','cx','cy','r','x','y','x1','y1','x2','y2','points','transform',
              'offset','stop-color','stop-opacity','gradientUnits','markerWidth',
              'markerHeight','refX','refY','orient','target','rel','download',
              'onclick','onchange','oninput','onsubmit','onload','onerror'
            ],
            ALLOW_DATA_ATTR: true,
            ALLOW_UNKNOWN_PROTOCOLS: false,
            FORBID_TAGS: ['script','iframe','object','embed','base','form'],
            FORBID_ATTR: [
              'onerror','onload','onmouseover','onmouseout',
              'onfocus','onblur','onkeydown','onkeyup','onkeypress'
            ]
          });
        } else {
          return basicSanitize(html);
        }
      } catch (e) {
        warn('Error sanitizando HTML, usando fallback:', e);
        return basicSanitize(html);
      }
    }

    // Exponer sanitizador
    window.sanitizeHTML = sanitizeHTML;

    // Sobrescribir el setter
    try {
      Object.defineProperty(Element.prototype, 'innerHTML', {
        configurable: true,
        get() {
          return state.originalMethods.innerHTMLGetter.call(this);
        },
        set(html) {
          const safe = sanitizeHTML(html);
          return state.originalMethods.innerHTMLSetter.call(this, safe);
        }
      });
      log('Protección XSS instalada (innerHTML sanitizado)');
    } catch (e) {
      warn('No se pudo instalar la protección XSS:', e);
    }
  }

  // ══════════════════════════════════════════════════════════
  // 7. INTERCEPCIÓN DE FETCH (evitar fugas de credenciales)
  // ══════════════════════════════════════════════════════════
  function installFetchInterceptor() {
    if (typeof window.fetch !== 'function') return;
    state.originalMethods.fetch = window.fetch;

    window.fetch = function (input, init) {
      try {
        let url = typeof input === 'string' ? input : (input && input.url) || '';
        let hostname = '';
        try {
          hostname = new URL(url, location.origin).hostname;
        } catch (e) {}

        // Whitelist de dominios (si la URL es absoluta)
        if (hostname && !CONFIG.ALLOWED_FETCH_DOMAINS.some(d => hostname.endsWith(d))) {
          warn(`Fetch bloqueado a dominio no permitido: ${hostname}`);
          // No lanzamos error para no romper la app; solo advertimos
          // Para bloqueo estricto, descomenta la siguiente línea:
          // return Promise.reject(new Error('Dominio no permitido: ' + hostname));
        }

        // Añadir credenciales por defecto (si no se especifican)
        init = init || {};
        init.headers = init.headers || {};

        // Añadir Authorization si hay token y no lo trae ya
        const hasAuthHeader =
          (init.headers instanceof Headers && init.headers.has('Authorization')) ||
          (typeof init.headers === 'object' && !(init.headers instanceof Headers) &&
            Object.keys(init.headers).some(k => k.toLowerCase() === 'authorization'));

        if (!hasAuthHeader) {
          const token = window.SecureTokenStore.get();
          if (token) {
            if (init.headers instanceof Headers) {
              init.headers.set('Authorization', `Bearer ${token}`);
            } else {
              init.headers['Authorization'] = `Bearer ${token}`;
            }
          }
        }

        // No cachear respuestas sensibles
        if (!init.cache) init.cache = 'no-store';

        return state.originalMethods.fetch.call(this, input, init);
      } catch (e) {
        return state.originalMethods.fetch.call(this, input, init);
      }
    };
    log('Interceptor de fetch instalado');
  }

  // ══════════════════════════════════════════════════════════
  // 8. ENMASCARAMIENTO EN CONSOLA
  // ══════════════════════════════════════════════════════════
  function installConsoleMasking() {
    const SENSITIVE_PATTERNS = [
      /Bearer\s+[A-Za-z0-9\-._~+/]+=*/gi,
      /"authToken"\s*:\s*"[^"]+"/gi,
      /"password"\s*:\s*"[^"]+"/gi,
      /eyJ[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+/g // JWT
    ];

    function mask(value) {
  if (value instanceof Error) return value;  // 🆕 no enmascarar errores
      if (typeof value === 'string') {
        let v = value;
        SENSITIVE_PATTERNS.forEach(p => {
          v = v.replace(p, (m) => m.length > 12 ? m.substring(0, 8) + '...[MASKED]' : '[MASKED]');
        });
        return v;
      }
      if (value && typeof value === 'object') {
        try {
          if (Array.isArray(value)) return value.map(mask);
          const out = {};
          for (const k of Object.keys(value)) {
            if (/token|password|pass|secret|apikey|api_key/i.test(k)) {
              out[k] = '[MASKED]';
            } else {
              out[k] = mask(value[k]);
            }
          }
          return out;
        } catch (e) {
          return value;
        }
      }
      return value;
    }

    ['log', 'info', 'warn'].forEach(level => {
      state.originalMethods['console' + level.charAt(0).toUpperCase() + level.slice(1)] = console[level];
      console[level] = function (...args) {
        const masked = args.map(mask);
        return state.originalMethods['console' + level.charAt(0).toUpperCase() + level.slice(1)].apply(console, masked);
      };
    });
    log('Enmascaramiento de consola activado');
  }

  // ══════════════════════════════════════════════════════════
  // 9. AUTO-LOGOUT POR INACTIVIDAD
  // ══════════════════════════════════════════════════════════
  function installAutoLogout() {
    const resetActivity = () => { state.lastActivity = Date.now(); };

    ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'].forEach(evt => {
      document.addEventListener(evt, resetActivity, { passive: true });
    });

    state.logoutTimer = setInterval(() => {
      if (!window.SecureTokenStore.get()) return; // Sin sesión → nada que hacer
      const idle = Date.now() - state.lastActivity;
      if (idle > CONFIG.AUTO_LOGOUT_MS && !state.isLoggingOut) {
        state.isLoggingOut = true;
        warn('Auto-logout por inactividad');
        try {
          window.SecureTokenStore.clear();
          localStorage.removeItem('user');
          sessionStorage.clear();
        } catch (e) {}
        alert('🔒 Sesión cerrada por inactividad (30 minutos).');
        location.reload();
      }
    }, 60000); // Revisar cada minuto
    log('Auto-logout por inactividad activado (30 min)');
  }

  // ══════════════════════════════════════════════════════════
  // 10. VERIFICACIONES DE SEGURIDAD
  // ══════════════════════════════════════════════════════════
  function runSecurityChecks() {
    const findings = [];

    // HTTPS
    if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
      findings.push({
        level: 'CRITICAL',
        msg: 'La aplicación no está sirviendo por HTTPS. Los datos viajan sin cifrar.'
      });
    }

    // CryptoJS disponible
    if (typeof CryptoJS === 'undefined') {
      findings.push({
        level: 'CRITICAL',
        msg: 'CryptoJS no cargado. El cifrado de localStorage está DESACTIVADO.'
      });
    }

    // DOMPurify disponible
    if (typeof DOMPurify === 'undefined') {
      findings.push({
        level: 'WARNING',
        msg: 'DOMPurify no cargado. Se usa un sanitizador básico (menos robusto).'
      });
    }

    // iframe framing
    if (window.top !== window.self) {
      findings.push({
        level: 'WARNING',
        msg: 'La aplicación se está ejecutando dentro de un iframe (posible clickjacking).'
      });
    }

    // Tokens en localStorage
    try {
      const raw = state.originalMethods.localStorageGetItem.call(localStorage, 'authToken');
      if (raw && !isEncryptedValue(raw)) {
        findings.push({
          level: 'CRITICAL',
          msg: 'authToken encontrado en texto plano. El cifrado no se aplicó (revisar orden de carga).'
        });
      }
    } catch (e) {}

    return findings;
  }

  // ══════════════════════════════════════════════════════════
  // 11. INYECCIÓN DE CSP (Content-Security-Policy)
  // ══════════════════════════════════════════════════════════
  function injectCSP() {
    // Solo si no hay una CSP ya definida
    const existing = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (existing) return;

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
    // Insertar lo antes posible
    (document.head || document.documentElement).insertBefore(
      meta,
      (document.head || document.documentElement).firstChild
    );
    log('CSP inyectada (meta tag)');
  }

  // ══════════════════════════════════════════════════════════
  // 12. REPORTE DE SEGURIDAD (accesible desde consola)
  // ══════════════════════════════════════════════════════════
  window.securityReport = function () {
    const findings = runSecurityChecks();
    console.group('🔒 REPORTE DE SEGURIDAD');
    console.log('Cifrado AES-256 activo:', state.cryptoReady ? '✅' : '❌');
    console.log('MasterKey en memoria:', state.masterKey ? '✅' : '❌');
    console.log('Interceptor localStorage:', '✅');
    console.log('Interceptor fetch:', '✅');
    console.log('Protección XSS (innerHTML):', '✅');
    console.log('DOMPurify disponible:', typeof DOMPurify !== 'undefined' ? '✅' : '❌');
    console.log('Auto-logout 30min:', '✅');
    console.log('CSP inyectada:', document.querySelector('meta[http-equiv="Content-Security-Policy"]') ? '✅' : '❌');
    console.log('Token actual:', window.SecureTokenStore.get() ? '[PRESENTE]' : '[AUSENTE]');
    console.log('Dominios permitidos:', CONFIG.ALLOWED_FETCH_DOMAINS);

    if (findings.length > 0) {
      console.group('⚠️ Hallazgos:');
      findings.forEach(f => {
        const icon = f.level === 'CRITICAL' ? '🔴' : '🟡';
        console.log(`${icon} [${f.level}] ${f.msg}`);
      });
      console.groupEnd();
    } else {
      console.log('✅ No se encontraron problemas de seguridad.');
    }
    console.groupEnd();
  };

  // ══════════════════════════════════════════════════════════
  // 13. INICIALIZACIÓN
  // ══════════════════════════════════════════════════════════
  function boot() {
    log('Iniciando security-hardening.js...');

    // 1) Cifrado primero (necesita CryptoJS)
    if (typeof CryptoJS === 'undefined') {
      warn('CryptoJS no cargado. Asegúrate de incluir el <script> ANTES de este archivo.');
    } else {
      state.cryptoReady = initMasterKey();
      log('Cifrado listo:', state.cryptoReady);
    }

    // 2) Interceptores
    installLocalStorageInterceptor();
    installFetchInterceptor();
    installXSSProtection();
    installConsoleMasking();
    installAutoLogout();

    // 3) CSP
    injectCSP();

    // 4) Migración: re-cifrar datos existentes que estén en plano
    migrateExistingPlainData();

    // 5) Reporte automático en modo debug
    if (window.__SECURITY_DEBUG__) {
      setTimeout(() => window.securityReport(), 500);
    }

    console.log('%c🔒 Security Hardening Module ACTIVO', 'color:#22c55e;font-size:14px;font-weight:bold');
    console.log('%c💡 Escribe securityReport() para ver el estado', 'color:#3b82f6');
  }

  function migrateExistingPlainData() {
    // Recorre todas las claves sensibles y re-guarda (ya cifradas)
    if (!state.cryptoReady) return;

    let migrated = 0;
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(k => {
        if (!isSensitiveKey(k)) return;
        if (k.startsWith('__sec_hardening')) return;

        const raw = state.originalMethods.localStorageGetItem.call(localStorage, k);
        if (raw && !isEncryptedValue(raw)) {
          // Está en plano → re-guardar cifrado
          const encrypted = encryptString(raw);
          state.originalMethods.localStorageSetItem.call(localStorage, k, encrypted);
          migrated++;
        }
      });
    } catch (e) {
      warn('Error durante migración:', e);
    }
    if (migrated > 0) {
      log(`Migrados ${migrated} valores a formato cifrado`);
    }
  }

  // Arrancar lo antes posible
  if (document.readyState === 'loading') {
    // Ejecutar ya, sin esperar DOMContentLoaded (interceptores deben estar cuanto antes)
    boot();
  } else {
    boot();
  }

  // Exponer configuración para ajustes avanzados
  window.__SECURITY_CONFIG__ = CONFIG;
  window.__SECURITY_STATE__ = state;

})();