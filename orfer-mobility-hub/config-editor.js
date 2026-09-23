/**
 * ============================================================
 *  CONFIG EDITOR · ORFER MOBILITY HUB · v1.0 PRODUCCIÓN
 * ============================================================
 *  Panel de administración para editar config.js sin tocar código.
 *  Acceso controlado por JWT (email + role). Persistencia en
 *  localStorage. Próxima fase: persistencia en backend.
 * ============================================================
 */
(function () {
    'use strict';

    /* ============================================================
       CONFIGURACIÓN DE ACCESO
       ============================================================ */
    var ADMIN_EMAILS = [
        'oscar.ruiz@corsaenergiasolar.com',
        'oscar.ruiz.corsa@gmail.com',
        'ajackson2672@gmail.com'
    ];
    var ADMIN_ROLES = ['admin'];
    var STORAGE_KEY = 'orfer_config_override_v1';

    /* ============================================================
       OBTENER TOKEN (URL → localStorage → sessionStorage)
       ============================================================ */
    function getToken() {
        // 1. URL primero (llega desde el SPA con ?token=...)
        try {
            var urlToken = new URLSearchParams(location.search).get('token');
            if (urlToken) {
                try { localStorage.setItem('zacky_token', urlToken); } catch (e) {}
                return urlToken;
            }
        } catch (e) {}

        // 2. localStorage (varias keys posibles)
        return localStorage.getItem('zacky_token')
            || localStorage.getItem('authToken')
            || sessionStorage.getItem('zacky_token')
            || null;
    }

    /* ============================================================
       DECODIFICAR JWT SIN LIBRERÍAS
       ============================================================ */
    function decodeJWT(token) {
        if (!token || typeof token !== 'string') return null;
        try {
            var parts = token.split('.');
            if (parts.length !== 3) return null;
            var payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
            var decoded = JSON.parse(decodeURIComponent(escape(atob(payload))));
            return decoded;
        } catch (e) {
            console.warn('[CONFIG-EDITOR] JWT decode error:', e.message);
            return null;
        }
    }

    /* ============================================================
       DETECTAR ADMIN (basado en JWT y/o localStorage)
       ============================================================ */
    function isAdmin() {
        // 1. Intentar desde JWT (prioridad máxima)
        var token = getToken();
        if (token) {
            var payload = decodeJWT(token);
            if (payload) {
                if (payload.role && ADMIN_ROLES.indexOf(payload.role) !== -1) return true;
                if (payload.email && ADMIN_EMAILS.some(function (e) {
                    return e.toLowerCase() === String(payload.email).toLowerCase();
                })) return true;
            }
        }

        // 2. Fallback a localStorage (por si el token no llega pero el user sí)
        try {
            var raw = localStorage.getItem('user') || localStorage.getItem('zacky_user');
            if (raw) {
                var user = JSON.parse(raw);
                if (ADMIN_ROLES.indexOf(user.role) !== -1) return true;
                if (user.email && ADMIN_EMAILS.some(function (e) {
                    return e.toLowerCase() === String(user.email).toLowerCase();
                })) return true;
            }
        } catch (e) {}

        return false;
    }

    /* ============================================================
       APLICAR OVERRIDE AL CARGAR
       ============================================================ */
    function applyOverride() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return false;
            var saved = JSON.parse(raw);
            if (window.ORFER_CONFIG) Object.assign(window.ORFER_CONFIG, saved);
            if (window.ORFER) Object.assign(window.ORFER, saved);
            console.log('[CONFIG-EDITOR] Override aplicado desde localStorage');
            return true;
        } catch (e) {
            console.warn('[CONFIG-EDITOR] Error aplicando override:', e);
            return false;
        }
    }

    /* ============================================================
       ESTILOS DEL PANEL
       ============================================================ */
    function injectStyles() {
        if (document.getElementById('config-editor-styles')) return;
        var s = document.createElement('style');
        s.id = 'config-editor-styles';
        s.textContent = `
.ce-float-btn {
    position: fixed; bottom: 30px; right: 115px; z-index: 9998;
    width: 60px; height: 60px; border-radius: 50%;
    background: linear-gradient(135deg, #06b6d4, #0891b2);
    color: #fff; font-size: 26px; cursor: pointer; border: none;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 10px 30px rgba(6,182,212,0.5), 0 0 60px rgba(6,182,212,0.25);
    transition: transform 0.25s, box-shadow 0.25s;
    font-family: Inter, system-ui, sans-serif;
}
.ce-float-btn:hover { transform: scale(1.1) rotate(90deg); box-shadow: 0 14px 40px rgba(6,182,212,0.7), 0 0 80px rgba(6,182,212,0.4); }
.ce-overlay {
    position: fixed; inset: 0; z-index: 2147483000;
    background: rgba(0,0,0,0.92); backdrop-filter: blur(20px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px; opacity: 0; visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
    font-family: Inter, system-ui, sans-serif;
}
.ce-overlay.active { opacity: 1; visibility: visible; }
.ce-modal {
    width: 96vw; max-width: 1200px; height: 92vh; max-height: 820px;
    background: linear-gradient(145deg, #0f172a, #0a0f1c);
    border: 1px solid rgba(6,182,212,0.4); border-radius: 24px;
    display: flex; flex-direction: column; overflow: hidden;
    color: #e2e8f0; box-shadow: 0 40px 100px rgba(0,0,0,0.8);
}
.ce-header {
    padding: 20px 28px; background: rgba(0,0,0,0.4);
    border-bottom: 1px solid rgba(6,182,212,0.3);
    display: flex; justify-content: space-between; align-items: center;
}
.ce-header h2 { font-size: 20px; font-weight: 800; color: #fff; margin: 0; }
.ce-header .sub { font-size: 12px; color: #94a3b8; margin-top: 4px; }
.ce-close { width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(239,68,68,0.3); background: rgba(239,68,68,0.15); color: #fca5a5; font-size: 18px; cursor: pointer; }
.ce-tabs { display: flex; gap: 4px; padding: 16px 28px 0; background: rgba(0,0,0,0.2); border-bottom: 1px solid rgba(6,182,212,0.15); flex-wrap: wrap; }
.ce-tab {
    padding: 10px 20px; border-radius: 40px 40px 0 0;
    background: transparent; border: none; cursor: pointer;
    color: #94a3b8; font-size: 12px; font-weight: 700; font-family: inherit;
    transition: all 0.25s; letter-spacing: 0.5px;
}
.ce-tab:hover { color: #67e8f9; background: rgba(6,182,212,0.08); }
.ce-tab.active { color: #0b0e17; background: linear-gradient(135deg, #06b6d4, #0891b2); }
.ce-body { flex: 1; overflow-y: auto; padding: 26px 32px; }
.ce-body::-webkit-scrollbar { width: 8px; }
.ce-body::-webkit-scrollbar-thumb { background: rgba(6,182,212,0.4); border-radius: 10px; }
.ce-section { display: none; }
.ce-section.active { display: block; }
.ce-section h3 { font-size: 15px; font-weight: 800; color: #67e8f9; margin: 0 0 20px; letter-spacing: 1px; text-transform: uppercase; }
.ce-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
.ce-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 16px; }
.ce-field { display: flex; flex-direction: column; gap: 6px; }
.ce-field label { font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.2px; }
.ce-field input, .ce-field select, .ce-field textarea {
    padding: 11px 14px; background: #0b1220; color: #fff;
    border: 1px solid rgba(6,182,212,0.25); border-radius: 10px;
    font-size: 13px; font-family: inherit; outline: none;
    transition: border-color 0.25s;
}
.ce-field input:focus, .ce-field textarea:focus { border-color: #06b6d4; box-shadow: 0 0 0 3px rgba(6,182,212,0.15); }
.ce-field .hint { font-size: 10px; color: #64748b; font-style: italic; }
.ce-btn {
    padding: 11px 22px; border-radius: 40px; font-size: 12px;
    font-weight: 800; letter-spacing: 1px; text-transform: uppercase;
    cursor: pointer; border: none; font-family: inherit;
    display: inline-flex; align-items: center; gap: 8px;
    transition: all 0.25s;
}
.ce-btn-primary { background: linear-gradient(135deg, #06b6d4, #0891b2); color: #0b0e17; }
.ce-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(6,182,212,0.5); }
.ce-btn-secondary { background: rgba(255,255,255,0.06); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.12); }
.ce-btn-danger { background: rgba(239,68,68,0.15); color: #fca5a5; border: 1px solid rgba(239,68,68,0.3); }
.ce-geocode-wrap { position: relative; }
.ce-geocode-results {
    position: absolute; top: 100%; left: 0; right: 0;
    background: #0b1220; border: 1px solid rgba(6,182,212,0.4);
    border-radius: 10px; margin-top: 4px; max-height: 260px;
    overflow-y: auto; z-index: 100; display: none;
}
.ce-geocode-results.active { display: block; }
.ce-geocode-item {
    padding: 11px 14px; cursor: pointer; font-size: 12px;
    color: #cbd5e1; border-bottom: 1px solid rgba(255,255,255,0.05);
    line-height: 1.4;
}
.ce-geocode-item:hover { background: rgba(6,182,212,0.12); color: #67e8f9; }
.ce-geocode-item:last-child { border-bottom: none; }
.ce-geocode-loading { padding: 12px; text-align: center; font-size: 11px; color: #67e8f9; }
.ce-table { width: 100%; border-collapse: collapse; font-size: 12px; }
.ce-table th { text-align: left; padding: 8px 10px; color: #94a3b8; font-size: 9px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(6,182,212,0.2); }
.ce-table td { padding: 4px; }
.ce-table input { width: 100%; padding: 7px 10px; background: #0b1220; color: #fff; border: 1px solid rgba(6,182,212,0.2); border-radius: 6px; font-size: 11px; font-family: inherit; }
.ce-footer {
    padding: 16px 28px; background: rgba(0,0,0,0.4);
    border-top: 1px solid rgba(6,182,212,0.2);
    display: flex; justify-content: space-between; align-items: center;
    gap: 12px; flex-wrap: wrap;
}
.ce-footer .left { display: flex; gap: 10px; flex-wrap: wrap; }
.ce-footer .right { display: flex; gap: 10px; flex-wrap: wrap; }
.ce-badge { font-size: 10px; padding: 4px 12px; border-radius: 40px; background: rgba(6,182,212,0.15); color: #67e8f9; font-weight: 800; letter-spacing: 1px; }
.ce-toast {
    position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
    background: #0f172a; border: 1px solid #06b6d4; color: #67e8f9;
    padding: 12px 24px; border-radius: 40px; font-size: 12px; font-weight: 800;
    z-index: 2147483647; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    font-family: Inter, system-ui, sans-serif;
    animation: ceToastIn 0.3s ease;
}
@keyframes ceToastIn { from { opacity: 0; transform: translate(-50%, -20px); } to { opacity: 1; transform: translate(-50%, 0); } }
@media (max-width: 700px) {
    .ce-grid-2, .ce-grid-3 { grid-template-columns: 1fr; }
    .ce-modal { height: 95vh; }
    .ce-body { padding: 18px; }
    .ce-float-btn { right: 100px; bottom: 20px; }
}
`;
        document.head.appendChild(s);
    }

    /* ============================================================
       TOAST
       ============================================================ */
    function toast(msg, color) {
        var t = document.createElement('div');
        t.className = 'ce-toast';
        t.textContent = msg;
        if (color) { t.style.borderColor = color; t.style.color = color; }
        document.body.appendChild(t);
        setTimeout(function () { t.remove(); }, 3000);
    }

    /* ============================================================
       CREAR MODAL
       ============================================================ */
    function createModal() {
        var cfg = window.ORFER_CONFIG || window.ORFER || {};
        var isOverride = !!localStorage.getItem(STORAGE_KEY);
        var proyecto = cfg.proyecto || {};
        var economico = cfg.economico || {};
        var contacto = cfg.contacto || {};

        var overlay = document.createElement('div');
        overlay.className = 'ce-overlay';
        overlay.id = 'ce-overlay';
        overlay.innerHTML = `
<div class="ce-modal">
    <div class="ce-header">
        <div>
            <h2>⚙️ Editor de Configuración · ORFER MOBILITY HUB</h2>
            <div class="sub">Modifica todos los valores sin tocar código · Los cambios se aplican al instante</div>
        </div>
        <button class="ce-close" id="ce-close">✕</button>
    </div>
    <div class="ce-tabs">
        <button class="ce-tab active" data-tab="ubicacion">📍 Ubicación</button>
        <button class="ce-tab" data-tab="proyecto">⚡ Proyecto</button>
        <button class="ce-tab" data-tab="economico">💰 Económico</button>
        <button class="ce-tab" data-tab="escenarios">📊 Escenarios</button>
        <button class="ce-tab" data-tab="contacto">📞 Contacto</button>
    </div>
    <div class="ce-body">
        <div class="ce-section active" data-section="ubicacion">
            <h3>📍 Ubicación del proyecto</h3>
            <div class="ce-field ce-geocode-wrap">
                <label>Buscar dirección (autocompletado OpenStreetMap)</label>
                <input type="text" id="ce-geocode-input" placeholder="Ej: Av. Tecnológico 1860, Ciudad Juárez" autocomplete="off">
                <div class="ce-geocode-results" id="ce-geocode-results"></div>
                <span class="hint">Escribe una dirección, selecciona el resultado y las coordenadas se llenan automáticamente.</span>
            </div>
            <div class="ce-grid-2">
                <div class="ce-field"><label>Latitud</label><input type="number" step="0.000001" id="ce-lat" value="${cfg.lat || ''}"></div>
                <div class="ce-field"><label>Longitud</label><input type="number" step="0.000001" id="ce-lon" value="${cfg.lon || ''}"></div>
            </div>
            <div class="ce-grid-2">
                <div class="ce-field"><label>Dirección completa</label><input type="text" id="ce-direccion" value="${(cfg.direccion || '').replace(/"/g, '&quot;')}"></div>
                <div class="ce-field"><label>Ciudad</label><input type="text" id="ce-ciudad" value="${(cfg.ciudad || '').replace(/"/g, '&quot;')}"></div>
            </div>
        </div>

        <div class="ce-section" data-section="proyecto">
            <h3>⚡ Configuración técnica</h3>
            <div class="ce-grid-3">
                <div class="ce-field"><label>Cargadores</label><input type="number" id="ce-cargadores" value="${proyecto.cargadores || ''}"></div>
                <div class="ce-field"><label>Potencia por cargador (kW)</label><input type="number" id="ce-potenciaPorCargador" value="${proyecto.potenciaPorCargador || ''}"></div>
                <div class="ce-field"><label>Potencia total (kW)</label><input type="number" id="ce-potenciaTotal" value="${proyecto.potenciaTotal || ''}"></div>
            </div>
            <div class="ce-grid-3">
                <div class="ce-field"><label>Horas operación/día</label><input type="number" id="ce-horasOperacion" value="${proyecto.horasOperacion || ''}"></div>
                <div class="ce-field"><label>SFV (kWp)</label><input type="number" id="ce-sfvKwp" value="${proyecto.sfvKwp || ''}"></div>
                <div class="ce-field"><label>Transformador (kVA)</label><input type="number" id="ce-transformadorKva" value="${proyecto.transformadorKva || ''}"></div>
            </div>
            <div class="ce-grid-3">
                <div class="ce-field"><label>Carport (m²)</label><input type="number" id="ce-carportM2" value="${proyecto.carportM2 || ''}"></div>
                <div class="ce-field"><label>Generación anual (kWh)</label><input type="number" id="ce-generacionAnualKwh" value="${proyecto.generacionAnualKwh || ''}"></div>
                <div class="ce-field"><label>Break-even (%)</label><input type="number" step="0.01" id="ce-breakEven" value="${proyecto.breakEven || ''}"></div>
            </div>
        </div>

        <div class="ce-section" data-section="economico">
            <h3>💰 Supuestos económicos</h3>
            <div class="ce-grid-2">
                <div class="ce-field"><label>CAPEX (MXN)</label><input type="number" id="ce-capex" value="${economico.capex || ''}"></div>
                <div class="ce-field"><label>IVA (decimal, ej: 0.08)</label><input type="number" step="0.01" id="ce-iva" value="${economico.iva || ''}"></div>
            </div>
            <div class="ce-grid-3">
                <div class="ce-field"><label>Precio venta (MXN/kWh)</label><input type="number" step="0.01" id="ce-precioVenta" value="${economico.precioVenta || ''}"></div>
                <div class="ce-field"><label>Costo CFE (MXN/kWh)</label><input type="number" step="0.01" id="ce-costoCFE" value="${economico.costoCFE || ''}"></div>
                <div class="ce-field"><label>O&M anual (MXN)</label><input type="number" id="ce-omAnual" value="${economico.omAnual || ''}"></div>
            </div>
        </div>

        <div class="ce-section" data-section="escenarios">
            <h3>📊 Escenarios de utilización</h3>
            <p style="font-size:11px;color:#94a3b8;margin-bottom:14px;">Edita cada fila. Los cambios se aplican al guardar.</p>
            <table class="ce-table">
                <thead>
                    <tr><th>Util.</th><th>kWh/año</th><th>Ingresos</th><th>Costo CFE</th><th>Flujo</th><th>Payback</th><th>TIR</th></tr>
                </thead>
                <tbody id="ce-escenarios-tbody"></tbody>
            </table>
        </div>

        <div class="ce-section" data-section="contacto">
            <h3>📞 Datos de contacto</h3>
            <div class="ce-grid-2">
                <div class="ce-field"><label>Nombre</label><input type="text" id="ce-contacto-nombre" value="${contacto.nombre || ''}"></div>
                <div class="ce-field"><label>Cargo</label><input type="text" id="ce-contacto-cargo" value="${contacto.cargo || ''}"></div>
            </div>
            <div class="ce-grid-2">
                <div class="ce-field"><label>Empresa</label><input type="text" id="ce-contacto-empresa" value="${contacto.empresa || ''}"></div>
                <div class="ce-field"><label>Teléfono</label><input type="text" id="ce-contacto-telefono" value="${contacto.telefono || ''}"></div>
            </div>
            <div class="ce-grid-2">
                <div class="ce-field"><label>Email</label><input type="text" id="ce-contacto-email" value="${contacto.email || ''}"></div>
                <div class="ce-field"><label>Sitio web</label><input type="text" id="ce-contacto-web" value="${contacto.web || ''}"></div>
            </div>
        </div>
    </div>
    <div class="ce-footer">
        <div class="left">
            <span class="ce-badge" id="ce-status-badge">${isOverride ? '✏️ EDITADO' : '📄 CONFIG ORIGINAL'}</span>
        </div>
        <div class="right">
            <button class="ce-btn ce-btn-danger" id="ce-reset">🗑️ Resetear</button>
            <button class="ce-btn ce-btn-secondary" id="ce-export">⬇️ Exportar config.js</button>
            <button class="ce-btn ce-btn-primary" id="ce-save">💾 Guardar y aplicar</button>
        </div>
    </div>
</div>`;
        document.body.appendChild(overlay);

        renderEscenarios(cfg.escenarios || {});
        wireEvents();
    }

    /* ============================================================
       RENDER ESCENARIOS
       ============================================================ */
    function renderEscenarios(escenarios) {
        var tbody = document.getElementById('ce-escenarios-tbody');
        if (!tbody) return;
        var keys = ['15', '25', '35', '45', '50', '100'];
        tbody.innerHTML = keys.map(function (k) {
            var e = escenarios[k] || {};
            return '<tr data-k="' + k + '">' +
                '<td style="font-weight:900;color:#67e8f9;padding:8px 10px;">' + k + '%</td>' +
                '<td><input type="number" data-f="kwh" value="' + (e.kwh || 0) + '"></td>' +
                '<td><input type="number" data-f="ingresos" value="' + (e.ingresos || 0) + '"></td>' +
                '<td><input type="number" data-f="costoCFE" value="' + (e.costoCFE || 0) + '"></td>' +
                '<td><input type="number" data-f="flujo" value="' + (e.flujo || 0) + '"></td>' +
                '<td><input type="number" step="0.01" data-f="payback" value="' + (e.payback || 0) + '"></td>' +
                '<td><input type="number" step="0.1" data-f="tir" value="' + (e.tir || 0) + '"></td>' +
                '</tr>';
        }).join('');
    }

    /* ============================================================
       RECOLECTAR DATA DEL FORMULARIO
       ============================================================ */
    function collectData() {
        var cfg = JSON.parse(JSON.stringify(window.ORFER_CONFIG || {}));

        var latEl = document.getElementById('ce-lat');
        var lonEl = document.getElementById('ce-lon');
        var dirEl = document.getElementById('ce-direccion');
        var ciudadEl = document.getElementById('ce-ciudad');

        cfg.lat = latEl ? parseFloat(latEl.value) : undefined;
        cfg.lon = lonEl ? parseFloat(lonEl.value) : undefined;
        cfg.direccion = dirEl ? dirEl.value : '';
        cfg.ciudad = ciudadEl ? ciudadEl.value : '';
        cfg.location = { lat: cfg.lat, lon: cfg.lon, direccion: cfg.direccion, ciudad: cfg.ciudad };

        cfg.proyecto = cfg.proyecto || {};
        ['cargadores', 'potenciaPorCargador', 'potenciaTotal', 'horasOperacion', 'sfvKwp', 'transformadorKva', 'carportM2', 'generacionAnualKwh', 'breakEven'].forEach(function (k) {
            var el = document.getElementById('ce-' + k);
            if (el) cfg.proyecto[k] = parseFloat(el.value);
        });

        cfg.economico = cfg.economico || {};
        ['capex', 'iva', 'precioVenta', 'costoCFE', 'omAnual'].forEach(function (k) {
            var el = document.getElementById('ce-' + k);
            if (el) cfg.economico[k] = parseFloat(el.value);
        });

        cfg.escenarios = {};
        document.querySelectorAll('#ce-escenarios-tbody tr').forEach(function (tr) {
            var k = tr.dataset.k;
            cfg.escenarios[k] = {};
            tr.querySelectorAll('input[data-f]').forEach(function (inp) {
                cfg.escenarios[k][inp.dataset.f] = parseFloat(inp.value);
            });
        });

        cfg.contacto = {
            nombre: (document.getElementById('ce-contacto-nombre') || {}).value || '',
            cargo: (document.getElementById('ce-contacto-cargo') || {}).value || '',
            empresa: (document.getElementById('ce-contacto-empresa') || {}).value || '',
            telefono: (document.getElementById('ce-contacto-telefono') || {}).value || '',
            email: (document.getElementById('ce-contacto-email') || {}).value || '',
            web: (document.getElementById('ce-contacto-web') || {}).value || ''
        };

        return cfg;
    }

    /* ============================================================
       GEOCODING · Nominatim (OpenStreetMap)
       ============================================================ */
    var geocodeTimer = null;

    function setupGeocode() {
        var input = document.getElementById('ce-geocode-input');
        var results = document.getElementById('ce-geocode-results');
        if (!input || !results) return;

        input.addEventListener('input', function () {
            clearTimeout(geocodeTimer);
            var q = input.value.trim();
            if (q.length < 4) { results.classList.remove('active'); return; }
            results.innerHTML = '<div class="ce-geocode-loading">🔍 Buscando...</div>';
            results.classList.add('active');
            geocodeTimer = setTimeout(function () { doGeocode(q); }, 500);
        });

        document.addEventListener('click', function (e) {
            if (!results.contains(e.target) && e.target !== input) results.classList.remove('active');
        });
    }

    function doGeocode(q) {
        var results = document.getElementById('ce-geocode-results');
        var url = 'https://nominatim.openstreetmap.org/search?format=json&limit=6&q=' + encodeURIComponent(q);

        fetch(url, { headers: { 'Accept': 'application/json' } })
            .then(function (res) { return res.json(); })
            .then(function (data) {
                if (!data || !data.length) {
                    results.innerHTML = '<div class="ce-geocode-loading">❌ Sin resultados</div>';
                    return;
                }
                results.innerHTML = data.map(function (r) {
                    var lat = parseFloat(r.lat).toFixed(6);
                    var lon = parseFloat(r.lon).toFixed(6);
                    return '<div class="ce-geocode-item" data-lat="' + lat + '" data-lon="' + lon + '" data-nombre="' + (r.display_name || '').replace(/"/g, '&quot;') + '">' +
                        r.display_name + '<br><span style="font-size:10px;color:#64748b;">' + lat + ', ' + lon + '</span></div>';
                }).join('');

                results.querySelectorAll('.ce-geocode-item').forEach(function (item) {
                    item.addEventListener('click', function () {
                        document.getElementById('ce-lat').value = this.dataset.lat;
                        document.getElementById('ce-lon').value = this.dataset.lon;
                        var parts = this.dataset.nombre.split(',');
                        document.getElementById('ce-direccion').value = parts.slice(0, 3).join(',').trim();
                        if (!document.getElementById('ce-ciudad').value && parts.length >= 3) {
                            document.getElementById('ce-ciudad').value = parts.slice(-3).join(',').trim();
                        }
                        input.value = this.dataset.nombre;
                        results.classList.remove('active');
                    });
                });
            })
            .catch(function () {
                results.innerHTML = '<div class="ce-geocode-loading">⚠️ Error consultando Nominatim</div>';
            });
    }

    /* ============================================================
       EXPORTAR CONFIG
       ============================================================ */
    function exportConfig() {
        var cfg = collectData();
        var header = '/**\n * CONFIG · ORFER MOBILITY HUB · Exportado ' + new Date().toLocaleString('es-MX') + '\n */\n';
        var content = header + 'window.ORFER_CONFIG = ' + JSON.stringify(cfg, null, 4) + ';\n';
        var blob = new Blob([content], { type: 'application/javascript' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'config.js';
        a.click();
        URL.revokeObjectURL(url);
        toast('📥 config.js descargado', '#34d399');
    }

    /* ============================================================
       RESET
       ============================================================ */
    function resetConfig() {
        if (!confirm('¿Borrar todos los cambios guardados y volver al config.js original?')) return;
        localStorage.removeItem(STORAGE_KEY);
        toast('🔄 Config original restaurado. Recargando...', '#fbbf24');
        setTimeout(function () { location.reload(); }, 1200);
    }

    /* ============================================================
       SAVE
       ============================================================ */
    function saveConfig() {
        var cfg = collectData();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
        toast('✅ Configuración guardada. Recargando...', '#34d399');
        setTimeout(function () { location.reload(); }, 1000);
    }

    /* ============================================================
       WIRE EVENTS
       ============================================================ */
    function wireEvents() {
        document.querySelectorAll('.ce-tab').forEach(function (tab) {
            tab.addEventListener('click', function () {
                document.querySelectorAll('.ce-tab').forEach(function (t) { t.classList.remove('active'); });
                document.querySelectorAll('.ce-section').forEach(function (s) { s.classList.remove('active'); });
                this.classList.add('active');
                var sec = document.querySelector('.ce-section[data-section="' + this.dataset.tab + '"]');
                if (sec) sec.classList.add('active');
            });
        });

        var closeBtn = document.getElementById('ce-close');
        var saveBtn = document.getElementById('ce-save');
        var exportBtn = document.getElementById('ce-export');
        var resetBtn = document.getElementById('ce-reset');
        var overlay = document.getElementById('ce-overlay');

        if (closeBtn) closeBtn.onclick = function () { overlay.classList.remove('active'); };
        if (overlay) overlay.onclick = function (e) { if (e.target === overlay) overlay.classList.remove('active'); };
        if (saveBtn) saveBtn.onclick = saveConfig;
        if (exportBtn) exportBtn.onclick = exportConfig;
        if (resetBtn) resetBtn.onclick = resetConfig;

        setupGeocode();
    }

    /* ============================================================
       INYECTAR BOTÓN FLOTANTE
       ============================================================ */
    function injectButton() {
        if (document.getElementById('ce-float-btn')) return;
        if (!document.body) return;

        var btn = document.createElement('button');
        btn.id = 'ce-float-btn';
        btn.className = 'ce-float-btn';
        btn.title = 'Editar configuración';
        btn.innerHTML = '⚙️';
        btn.onclick = function () {
            if (!document.getElementById('ce-overlay')) createModal();
            document.getElementById('ce-overlay').classList.add('active');
        };
        document.body.appendChild(btn);
        console.log('[CONFIG-EDITOR] ✅ Botón flotante inyectado');
    }

    /* ============================================================
       INIT CON REINTENTOS
       ============================================================ */
    applyOverride();
    injectStyles();

    var attempts = 0;
    var MAX_ATTEMPTS = 20; // 20 × 500ms = 10 segundos

    function tryInject() {
        attempts++;
        var admin = isAdmin();
        console.log('[CONFIG-EDITOR] Intento ' + attempts + ' · isAdmin: ' + admin);

        if (admin) {
            injectButton();
            return true;
        }
        return false;
    }

    function boot() {
        if (tryInject()) return;

        // Reintentar cada 500ms hasta 10 segundos (por si el token llega tarde)
        var interval = setInterval(function () {
            if (tryInject() || attempts >= MAX_ATTEMPTS) {
                clearInterval(interval);
                if (attempts >= MAX_ATTEMPTS && !document.getElementById('ce-float-btn')) {
                    console.warn('[CONFIG-EDITOR] No se pudo inyectar el botón: usuario no autorizado o token ausente.');
                    console.warn('[CONFIG-EDITOR] URL:', location.href);
                    console.warn('[CONFIG-EDITOR] Token presente:', !!getToken());
                    console.warn('[CONFIG-EDITOR] JWT payload:', decodeJWT(getToken()));
                }
            }
        }, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

    /* ============================================================
       API PÚBLICA
       ============================================================ */
    window.ConfigEditor = {
        open: function () {
            if (!document.getElementById('ce-overlay')) createModal();
            document.getElementById('ce-overlay').classList.add('active');
        },
        reset: resetConfig,
        export: exportConfig,
        isAdmin: isAdmin,
        getToken: getToken
    };

    console.log('[CONFIG-EDITOR] v1.0 PRODUCCIÓN cargado');
})();