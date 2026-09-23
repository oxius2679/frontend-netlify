/**
 * ============================================================
 *  ORFER BRIDGE · Conexión SPA → Dashboard dedicado
 * ============================================================
 *  Inyecta un botón flotante para usuarios autorizados a
 *  acceder al dashboard ORFER MOBILITY HUB, con SSO por token.
 *
 *  NO modifica nada del SPA. Solo añade un elemento visual.
 * ============================================================
 */
(function () {
    'use strict';

    var CONFIG = {
        // Emails autorizados a ver el botón (Oscar + quien tú decidas)
        allowedEmails: [
            'oscar.ruiz@corsaenergiasolar.com',
            'oscar.ruiz.corsa@gmail.com',
            'ajackson2672@gmail.com'   // ← admin (tú) para pruebas
        ],
        // Roles que siempre ven el botón (aunque no estén en la lista)
        allowedRoles: ['admin'],
        // URL del dashboard dedicado
        dashboardUrl: 'https://orfer.thejacksonssolutions.com',
        // Texto y estilo del botón
        buttonText: '⚡ ORFER MOBILITY HUB'
    };

    function getUser() {
        try {
            var raw = localStorage.getItem('user');
            return raw ? JSON.parse(raw) : null;
        } catch (e) { return null; }
    }

    function getToken() {
        return localStorage.getItem('authToken');
    }

    function shouldShowButton() {
        var user = getUser();
        if (!user) return false;
        if (CONFIG.allowedRoles.indexOf(user.role) !== -1) return true;
        if (user.email) {
            var email = user.email.toLowerCase();
            for (var i = 0; i < CONFIG.allowedEmails.length; i++) {
                if (CONFIG.allowedEmails[i].toLowerCase() === email) return true;
            }
        }
        return false;
    }

    function openDashboard() {
        var token = getToken();
        var url = CONFIG.dashboardUrl;
        if (token) url += '?token=' + encodeURIComponent(token);
        window.open(url, '_blank');
    }

    function injectButton() {
        if (document.getElementById('orfer-bridge-btn')) return;
        var user = getUser();

        var btn = document.createElement('a');
        btn.id = 'orfer-bridge-btn';
        btn.href = '#';
        btn.onclick = function (e) { e.preventDefault(); openDashboard(); };
        btn.innerHTML = CONFIG.buttonText;
        btn.style.cssText = [
            'position:fixed',
            'bottom:30px',
            'left:30px',
            'z-index:9998',
            'padding:14px 22px',
            'border-radius:50px',
            'background:linear-gradient(135deg, #06b6d4, #0891b2)',
            'color:#fff',
            'font-family:Inter, system-ui, sans-serif',
            'font-weight:800',
            'font-size:13px',
            'letter-spacing:1px',
            'text-decoration:none',
            'box-shadow:0 10px 30px rgba(6,182,212,0.5), 0 0 60px rgba(6,182,212,0.25)',
            'cursor:pointer',
            'display:inline-flex',
            'align-items:center',
            'gap:10px',
            'border:1px solid rgba(255,255,255,0.2)',
            'transition:transform 0.25s, box-shadow 0.25s'
        ].join(';');

        btn.onmouseover = function () {
            btn.style.transform = 'translateY(-3px) scale(1.03)';
            btn.style.boxShadow = '0 14px 40px rgba(6,182,212,0.7), 0 0 80px rgba(6,182,212,0.4)';
        };
        btn.onmouseout = function () {
            btn.style.transform = '';
            btn.style.boxShadow = '0 10px 30px rgba(6,182,212,0.5), 0 0 60px rgba(6,182,212,0.25)';
        };

        document.body.appendChild(btn);
        console.log('[ORFER Bridge] ✅ Botón inyectado para:', user ? user.email : '(sin usuario)');
    }

    function init() {
        if (shouldShowButton()) injectButton();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Reintentar por si el usuario se loguea después (SPA con login dinámico)
    var tries = 0;
    var iv = setInterval(function () {
        tries++;
        if (document.getElementById('orfer-bridge-btn')) { clearInterval(iv); return; }
        if (shouldShowButton()) { injectButton(); clearInterval(iv); }
        if (tries > 20) clearInterval(iv);
    }, 1500);

    console.log('[ORFER Bridge] v1.0 cargado');
})();