// ========================================
// premium-manager.js - VERSIÓN COMPLETA
// AGREGAR + LISTAR + ELIMINAR
// ========================================

(function() {
    console.log("🔓 Premium Manager Cargado");
    
    // ========== USUARIOS PREMIUM ==========
    let USUARIOS_PREMIUM = {};
    
    // Cargar usuarios guardados
    const saved = localStorage.getItem('premiumUsersList');
    if (saved) {
        try {
            USUARIOS_PREMIUM = JSON.parse(saved);
        } catch(e) {}
    }
    
    // Guardar usuarios
    function guardarUsuarios() {
        localStorage.setItem('premiumUsersList', JSON.stringify(USUARIOS_PREMIUM));
    }
    
    // ========== FUNCIONES PRINCIPALES ==========
    
    // Agregar usuario premium
    window.AgregarPremium = (email, plan = "premium") => {
        if (!email) {
            console.error("❌ Email requerido");
            return;
        }
        USUARIOS_PREMIUM[email] = plan;
        guardarUsuarios();
        console.log(`✅ ${email} ahora es ${plan.toUpperCase()}`);
        
        // Notificación visual
        mostrarNotificacion(`✅ ${email} ahora es ${plan.toUpperCase()}`, "#10b981");
    };
    
    // Eliminar usuario premium
    window.EliminarPremium = (email) => {
        if (!email) {
            console.error("❌ Email requerido");
            return;
        }
        
        if (USUARIOS_PREMIUM[email]) {
            delete USUARIOS_PREMIUM[email];
            guardarUsuarios();
            console.log(`🗑️ ${email} ya NO es premium`);
            mostrarNotificacion(`🗑️ ${email} ya NO es premium`, "#ef4444");
        } else {
            console.log(`❌ ${email} no está en la lista premium`);
            mostrarNotificacion(`❌ ${email} no está en la lista`, "#ef4444");
        }
    };
    
    // Listar usuarios premium
    window.ListarPremium = () => {
        const usuarios = Object.keys(USUARIOS_PREMIUM);
        if (usuarios.length === 0) {
            console.log("📭 No hay usuarios premium");
            alert("📭 No hay usuarios premium registrados");
        } else {
            console.table(USUARIOS_PREMIUM);
            let mensaje = "📋 USUARIOS PREMIUM:\n\n";
            for (const [email, plan] of Object.entries(USUARIOS_PREMIUM)) {
                mensaje += `• ${email} → ${plan.toUpperCase()}\n`;
            }
            alert(mensaje);
        }
        return USUARIOS_PREMIUM;
    };
    
    // Mostrar notificación flotante
    function mostrarNotificacion(mensaje, color) {
        const notif = document.createElement('div');
        notif.textContent = mensaje;
        notif.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: ${color};
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            z-index: 1000001;
            font-size: 13px;
            font-weight: bold;
            animation: fadeOutPremium 2s ease forwards;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        
        // Animación CSS
        if (!document.getElementById('premiumAnimations')) {
            const style = document.createElement('style');
            style.id = 'premiumAnimations';
            style.textContent = `
                @keyframes fadeOutPremium {
                    0% { opacity: 1; transform: translateX(0); }
                    70% { opacity: 1; transform: translateX(0); }
                    100% { opacity: 0; transform: translateX(100px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 2500);
    }
    
    // ========== PANEL COMPLETO CON ELIMINAR ==========
    window.AbrirPanelPremium = function() {
        // Cerrar panel existente
        const existing = document.getElementById('premiumPanelRoot');
        if (existing) existing.remove();
        
        // Obtener lista actualizada
        const usuarios = USUARIOS_PREMIUM;
        
        // Generar HTML de la lista de usuarios
        let listaHTML = '';
        for (const [email, plan] of Object.entries(usuarios)) {
            listaHTML += `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: rgba(139, 92, 246, 0.1); border-radius: 6px; margin-bottom: 5px;">
                    <div style="flex:1; overflow: hidden;">
                        <div style="color: white; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${email}</div>
                        <div style="color: #8b5cf6; font-size: 10px;">${plan.toUpperCase()}</div>
                    </div>
                    <button onclick="EliminarPremium('${email}'); setTimeout(() => AbrirPanelPremium(), 100);" 
                            style="background: #ef4444; border: none; color: white; padding: 4px 10px; border-radius: 5px; cursor: pointer; font-size: 11px; margin-left: 5px;">
                        🗑️
                    </button>
                </div>
            `;
        }
        
        if (Object.keys(usuarios).length === 0) {
            listaHTML = '<div style="color: #94a3b8; text-align: center; padding: 15px;">📭 No hay usuarios premium</div>';
        }
        
        const panel = document.createElement('div');
        panel.id = 'premiumPanelRoot';
        panel.innerHTML = `
            <div style="position:fixed; bottom:20px; right:20px; background:#1e293b; border-radius:12px; padding:15px; z-index:999999; border:2px solid #8b5cf6; width:320px; max-height:500px; overflow-y:auto; box-shadow:0 4px 20px rgba(0,0,0,0.5);">
                <div style="display:flex; justify-content:space-between; margin-bottom:15px;">
                    <strong style="color:white;">👑 Panel Premium</strong>
                    <button onclick="this.closest('#premiumPanelRoot').remove()" style="background:#ef4444; border:none; color:white; width:25px; height:25px; border-radius:50%; cursor:pointer;">✕</button>
                </div>
                
                <div style="color:#94a3b8; font-size:11px; margin-bottom:15px;">
                    💡 Atajos: F8 | Ctrl+Shift+P | Click en 👑
                </div>
                
                <!-- SECCIÓN AGREGAR -->
                <div style="margin-bottom:15px; padding-bottom:15px; border-bottom:1px solid #334155;">
                    <div style="color:#10b981; font-size:12px; margin-bottom:8px;">➕ AGREGAR USUARIO</div>
                    <input type="email" id="premEmail" placeholder="Email del usuario" style="width:100%; padding:8px; margin-bottom:8px; border-radius:6px; background:#0f172a; color:white; border:1px solid #8b5cf6; box-sizing:border-box;">
                    <select id="premPlan" style="width:100%; padding:8px; margin-bottom:8px; border-radius:6px; background:#0f172a; color:white;">
                        <option value="premium">Premium ⭐</option>
                        <option value="professional">Professional 📈</option>
                    </select>
                    <button id="btnAgregar" style="width:100%; background:#10b981; border:none; color:white; padding:8px; border-radius:6px; cursor:pointer;">➕ Agregar Premium</button>
                </div>
                
                <!-- SECCIÓN LISTA DE USUARIOS -->
                <div style="margin-bottom:10px;">
                    <div style="color:#f59e0b; font-size:12px; margin-bottom:8px;">📋 USUARIOS PREMIUM</div>
                    <div id="listaUsuariosPremium" style="max-height:200px; overflow-y:auto;">
                        ${listaHTML}
                    </div>
                </div>
                
                <div id="panelStatus" style="margin-top:10px; font-size:11px; color:#94a3b8; text-align:center;"></div>
            </div>
        `;
        document.body.appendChild(panel);
        
        // Evento agregar
        document.getElementById('btnAgregar').onclick = () => {
            const email = document.getElementById('premEmail').value.trim();
            const plan = document.getElementById('premPlan').value;
            if (!email) {
                document.getElementById('panelStatus').innerHTML = "❌ Ingresa un email";
                setTimeout(() => document.getElementById('panelStatus').innerHTML = '', 2000);
                return;
            }
            AgregarPremium(email, plan);
            document.getElementById('premEmail').value = '';
            document.getElementById('panelStatus').innerHTML = `✅ ${email} agregado`;
            setTimeout(() => {
                AbrirPanelPremium(); // Refrescar panel
            }, 500);
        };
    };
    
    // ========== ATAJOS DE TECLADO ==========
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F8') {
            e.preventDefault();
            console.log("⌨️ F8 - Abriendo panel premium");
            AbrirPanelPremium();
        }
        if (e.ctrlKey && e.shiftKey && e.key === 'P') {
            e.preventDefault();
            console.log("⌨️ Ctrl+Shift+P - Abriendo panel premium");
            AbrirPanelPremium();
        }
        if (e.ctrlKey && e.altKey && e.key === 'p') {
            e.preventDefault();
            console.log("⌨️ Ctrl+Alt+P - Abriendo panel premium");
            AbrirPanelPremium();
        }
    });
    
    // ========== BOTÓN FLOTANTE PERMANENTE ==========
    setTimeout(() => {
        if (document.getElementById('floatingPremiumBtn')) return;
        
        const floatingBtn = document.createElement('div');
        floatingBtn.id = 'floatingPremiumBtn';
        floatingBtn.innerHTML = '👑';
        floatingBtn.title = 'Abrir Panel Premium (F8)';
        floatingBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: linear-gradient(135deg, #8b5cf6, #6d28d9);
            color: white;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 999998;
            font-size: 20px;
            box-shadow: 0 4px 12px rgba(139,92,246,0.4);
            transition: all 0.3s;
        `;
        floatingBtn.onmouseenter = () => floatingBtn.style.transform = 'scale(1.1)';
        floatingBtn.onmouseleave = () => floatingBtn.style.transform = 'scale(1)';
        floatingBtn.onclick = () => AbrirPanelPremium();
        document.body.appendChild(floatingBtn);
        console.log("✅ Botón flotante 👑 agregado");
    }, 1000);
    
    // ========== VERIFICAR USUARIO ACTUAL ==========
    function getEmail() {
        try {
            const user = localStorage.getItem('user');
            if (user) return JSON.parse(user).email;
            const token = localStorage.getItem('authToken');
            if (token) return JSON.parse(atob(token.split('.')[1])).email;
        } catch(e) {}
        return null;
    }
    
    const email = getEmail();
    if (email && USUARIOS_PREMIUM[email]) {
        localStorage.setItem('userPlan', USUARIOS_PREMIUM[email]);
        localStorage.setItem('userLicense', USUARIOS_PREMIUM[email]);
        console.log(`🎉 ${email} → Plan ${USUARIOS_PREMIUM[email].toUpperCase()}`);
    }
    
    // ========== MENSAJE DE AYUDA ==========
    console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "color: #8b5cf6");
    console.log("%c👑 PREMIUM MANAGER - VERSIÓN COMPLETA", "color: #8b5cf6; font-weight: bold; font-size: 14px");
    console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "color: #8b5cf6");
    console.log("");
    console.log("📋 COMANDOS EN CONSOLA:");
    console.log("   AbrirPanelPremium() - Abre el panel gráfico");
    console.log("   AgregarPremium('email@test.com', 'premium') - Agrega usuario");
    console.log("   EliminarPremium('email@test.com') - Elimina usuario");
    console.log("   ListarPremium() - Lista todos los usuarios");
    console.log("");
    console.log("⌨️ ATAJOS DE TECLADO:");
    console.log("   F8 - Abrir panel");
    console.log("   Ctrl+Shift+P - Abrir panel");
    console.log("   Ctrl+Alt+P - Abrir panel");
    console.log("");
    console.log("🎯 BOTONES EN EL PANEL:");
    console.log("   ➕ Agregar - Añade nuevo usuario premium");
    console.log("   🗑️ (junto a cada usuario) - Elimina ese usuario");
    console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "color: #8b5cf6");
    
})();