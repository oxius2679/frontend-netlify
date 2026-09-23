/**
 * API LOADER · ORFER MOBILITY HUB
 * Conecta el dashboard con el backend Zacky. Si falla, cae al config.js
 */
(function () {
    'use strict';
    const CFG = window.ORFER_CONFIG;
    const LOG = '[ORFER-HUB]';

    function getAuthToken() {
        const urlToken = new URLSearchParams(location.search).get('token');
        if (urlToken) { try { localStorage.setItem('zacky_token', urlToken); } catch (e) {} return urlToken; }
        return localStorage.getItem('zacky_token') || sessionStorage.getItem('zacky_token') || null;
    }

    async function apiFetch(path) {
        const token = getAuthToken();
        const ctrl = new AbortController();
        const tid = setTimeout(function () { ctrl.abort(); }, 8000);
        const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
        if (token) headers['Authorization'] = 'Bearer ' + token;
        try {
            const res = await fetch(CFG.apiUrl + path, { headers: headers, signal: ctrl.signal, mode: 'cors', credentials: 'omit' });
            clearTimeout(tid);
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return await res.json();
        } catch (e) { clearTimeout(tid); throw e; }
    }

    async function loadClientData() {
        if (!CFG.useRealApi) return null;
        if (!getAuthToken()) return null;
        try {
            console.log(LOG, 'Cargando datos del cliente:', CFG.clientId);
            const data = await apiFetch('/api/clients/' + CFG.clientId + '/settings');
            console.log(LOG, '✅ Settings cargados desde API');
            return data;
        } catch (e) {
            console.warn(LOG, 'API no disponible:', e.message);
            return null;
        }
    }

        function mergeData(apiData) {
        if (!apiData) return Object.assign({}, CFG, { source: 'config' });

        var loc = Object.assign({}, CFG.location || {}, apiData.location || {});

        return Object.assign({}, CFG, {
            clientId: CFG.clientId,
            clientName: CFG.clientName,
            apiUrl: CFG.apiUrl,
            // Coordenadas aplanadas arriba (raíz)
            lat: loc.lat,
            lon: loc.lon,
            direccion: loc.direccion,
            ciudad: loc.ciudad,
            // Mantener también anidado
            location: loc,
            proyecto: Object.assign({}, CFG.proyecto || {}, apiData.proyecto || {}),
            economico: Object.assign({}, CFG.economico || {}, apiData.economico || {}),
            escenarios: apiData.escenarios || CFG.escenarios,
            capexDesglose: apiData.capexDesglose || CFG.capexDesglose,
            contacto: Object.assign({}, CFG.contacto || {}, apiData.contacto || {}),
            source: 'api'
        });
    }

    async function bootstrap() {
        var banner = document.createElement('div');
        banner.style.cssText = 'position:fixed;top:12px;left:50%;transform:translateX(-50%);padding:8px 20px;background:#0f172a;border:1px solid #fbbf24;border-radius:40px;font-size:11px;color:#fbbf24;font-weight:700;z-index:99999;font-family:Inter,sans-serif;letter-spacing:1px;transition:opacity 0.4s';
        banner.textContent = '⏳ CARGANDO DATOS...';
        if (document.body) document.body.appendChild(banner);

        try {
            var apiData = await loadClientData();
            var merged = mergeData(apiData);
            if (window.ORFER) Object.assign(window.ORFER, merged);
            else window.ORFER = merged;
            window.dispatchEvent(new CustomEvent('orfer-data-ready', { detail: merged }));

            banner.textContent = apiData ? '✅ DATOS API CARGADOS' : '📦 MODO CONFIG LOCAL';
            banner.style.borderColor = apiData ? '#34d399' : '#a78bfa';
            banner.style.color = apiData ? '#34d399' : '#a78bfa';
            setTimeout(function () { banner.style.opacity = '0'; setTimeout(function () { banner.remove(); }, 500); }, 2500);
        } catch (e) {
            console.error(LOG, 'Error:', e);
            if (banner) banner.textContent = '⚠️ ERROR · USANDO DEMO';
            setTimeout(function () { if (banner) banner.remove(); }, 4000);
        }
    }

    window.ORFER_API = { bootstrap: bootstrap, refresh: bootstrap, getAuthToken: getAuthToken };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bootstrap);
    else bootstrap();
})();