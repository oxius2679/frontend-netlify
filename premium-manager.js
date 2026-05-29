// ========================================
// ADMIN PREMIUM - VERSIÓN DEFINITIVA
// SOLO PARA DESARROLLADOR
// ========================================

(function() {
    // === SOLO CAMBIA ESTO ===
    const MI_EMAIL = "ajackson2672@gmail.com";
    // =======================
    
    // Obtener email actual de forma segura
    function getEmail() {
        try {
            const user = localStorage.getItem('user');
            if (user) return JSON.parse(user).email;
            const token = localStorage.getItem('authToken');
            if (token) {
                const payload = JSON.parse(atob(token.split('.')[1]));
                return payload.email || payload.sub;
            }
        } catch(e) {}
        return null;
    }
    
    const EMAIL_ACTUAL = getEmail();
    const SOY_ADMIN = EMAIL_ACTUAL === MI_EMAIL;
    
    // === SOLO EJECUTAR SI SOY ADMIN ===
    if (!SOY_ADMIN) {
        console.log("🔒 Premium desactivado - No eres administrador");
        // Asegurar que el usuario normal no tenga el botón
        document.getElementById('floatingPremiumBtn')?.remove();
        return;
    }
    
    console.log("👑 MODO ADMINISTRADOR ACTIVADO");
    
    // === GESTIÓN DE USUARIOS PREMIUM ===
    let USUARIOS = JSON.parse(localStorage.getItem('admin_premium_users') || '{}');
    
    function guardar() {
        localStorage.setItem('admin_premium_users', JSON.stringify(USUARIOS));
        // Forzar actualización en otras pestañas
        localStorage.setItem('admin_premium_update', Date.now().toString());
    }
    
    // === FUNCIONES GLOBALES PARA ADMIN ===
    window.autorizarPremium = (email, plan = 'premium') => {
        if (!email) return;
        USUARIOS[email] = { plan, fecha: new Date().toISOString() };
        guardar();
        console.log(`✅ ${email} → ${plan.toUpperCase()}`);
        mostrarNotificacion(`✅ ${email} ahora es ${plan.toUpperCase()}`, '#10b981');
        return true;
    };
    
    window.revocarPremium = (email) => {
        if (USUARIOS[email]) {
            delete USUARIOS[email];
            guardar();
            console.log(`🗑️ ${email} ya no es premium`);
            mostrarNotificacion(`🗑️ ${email} ya no es premium`, '#ef4444');
            return true;
        }
        return false;
    };
    
    window.listarPremium = () => {
        console.table(USUARIOS);
        return USUARIOS;
    };
    
    function mostrarNotificacion(msg, color) {
        const n = document.createElement('div');
        n.textContent = msg;
        n.style.cssText = `position:fixed;bottom:20px;right:20px;background:${color};color:white;padding:12px 20px;border-radius:10px;z-index:1000000;font-size:14px;animation:fadeOut 2s forwards`;
        document.body.appendChild(n);
        setTimeout(() => n.remove(), 2500);
    }
    
    // === PANEL ADMIN (SOLO PARA TI) ===
    window.mostrarPanelPremium = function() {
        document.getElementById('adminPremiumPanel')?.remove();
        
        let html = '';
        for (const [email, data] of Object.entries(USUARIOS)) {
            html += `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background:rgba(139,92,246,0.1);border-radius:8px;margin-bottom:8px;">
                    <div>
                        <div style="color:white;font-weight:500;">${email}</div>
                        <div style="color:#8b5cf6;font-size:11px;">${data.plan.toUpperCase()} • ${new Date(data.fecha).toLocaleDateString()}</div>
                    </div>
                    <button onclick="revocarPremium('${email}'); setTimeout(()=>mostrarPanelPremium(),200);" 
                            style="background:#ef4444;border:none;color:white;padding:6px 12px;border-radius:6px;cursor:pointer;">Revocar</button>
                </div>
            `;
        }
        
        if (Object.keys(USUARIOS).length === 0) {
            html = '<div style="color:#94a3b8;text-align:center;padding:20px;">📭 No hay usuarios premium autorizados</div>';
        }
        
        const panel = document.createElement('div');
        panel.id = 'adminPremiumPanel';
        panel.innerHTML = `
            <div style="position:fixed;bottom:20px;right:20px;background:#1e293b;border-radius:16px;padding:20px;z-index:1000000;border:2px solid #8b5cf6;width:350px;max-height:500px;overflow-y:auto;box-shadow:0 10px 40px rgba(0,0,0,0.5);">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                    <div>
                        <h3 style="margin:0;color:white;">👑 Admin Premium</h3>
                        <p style="margin:5px 0 0 0;color:#94a3b8;font-size:12px;">${EMAIL_ACTUAL}</p>
                    </div>
                    <button onclick="this.closest('#adminPremiumPanel').remove()" style="background:#ef4444;border:none;color:white;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:16px;">✕</button>
                </div>
                
                <div style="margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #334155;">
                    <div style="color:#10b981;font-size:13px;margin-bottom:10px;">➕ AUTORIZAR USUARIO</div>
                    <input type="email" id="adminEmail" placeholder="Email del usuario" style="width:100%;padding:10px;margin-bottom:10px;border-radius:8px;background:#0f172a;color:white;border:1px solid #8b5cf6;">
                    <select id="adminPlan" style="width:100%;padding:10px;margin-bottom:10px;border-radius:8px;background:#0f172a;color:white;border:1px solid #8b5cf6;">
                        <option value="premium">⭐ PREMIUM</option>
                        <option value="professional">📈 PROFESSIONAL</option>
                    </select>
                    <button id="btnAutorizar" style="width:100%;background:#10b981;border:none;color:white;padding:10px;border-radius:8px;cursor:pointer;font-weight:bold;">✓ AUTORIZAR</button>
                </div>
                
                <div>
                    <div style="color:#f59e0b;font-size:13px;margin-bottom:10px;">📋 USUARIOS AUTORIZADOS</div>
                    <div id="listaUsuarios" style="max-height:250px;overflow-y:auto;">${html}</div>
                </div>
            </div>
        `;
        document.body.appendChild(panel);
        
        document.getElementById('btnAutorizar').onclick = () => {
            const email = document.getElementById('adminEmail').value.trim();
            const plan = document.getElementById('adminPlan').value;
            if (!email) {
                alert('Ingresa un email');
                return;
            }
            autorizarPremium(email, plan);
            document.getElementById('adminEmail').value = '';
            mostrarPanelPremium();
        };
    };
    
    // === BOTÓN FLOTANTE SOLO PARA ADMIN ===
    setTimeout(() => {
        if (document.getElementById('adminFloatingBtn')) return;
        const btn = document.createElement('div');
        btn.id = 'adminFloatingBtn';
        btn.innerHTML = '👑';
        btn.title = 'Panel Admin Premium';
        btn.style.cssText = `position:fixed;bottom:20px;left:20px;background:linear-gradient(135deg,#8b5cf6,#6d28d9);color:white;width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:999999;font-size:24px;box-shadow:0 4px 15px rgba(139,92,246,0.5);transition:all 0.3s`;
        btn.onmouseenter = () => btn.style.transform = 'scale(1.1)';
        btn.onmouseleave = () => btn.style.transform = 'scale(1)';
        btn.onclick = () => mostrarPanelPremium();
        document.body.appendChild(btn);
        console.log("✅ Botón Admin 👑 agregado");
    }, 1000);
    
    console.log("🎯 Panel Admin Premium listo");
})();