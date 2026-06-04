// ============================================
// SISTEMA DE INVITACIONES - STANDALONE
// NO MODIFICA TU SISTEMA, SOLO SE AGREGA
// ============================================

(function() {
    // Evitar duplicados
    if (window.StandaloneInvitar) return;
    
    // ========== DATOS PROPIOS ==========
    let datos = JSON.parse(localStorage.getItem('invitaciones_standalone') || '{"invitaciones":[],"permisos":{}}');
    
    function guardar() {
        localStorage.setItem('invitaciones_standalone', JSON.stringify(datos));
    }
    
    // ========== OBTENER EMAIL DEL USUARIO ACTUAL ==========
    function getEmailActual() {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (user.email) return user.email;
            const token = localStorage.getItem('authToken');
            if (token) {
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.email) return payload.email;
            }
        } catch(e) {}
        return null;
    }
    
    // ========== API PÚBLICA ==========
    window.StandaloneInvitar = {
        // Invitar a un proyecto
        invitar: function(email, proyectoNombre) {
            if (!email || !proyectoNombre) {
                alert('Faltan datos');
                return false;
            }
            
            const token = 'inv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 8);
            datos.invitaciones.push({
                email: email,
                proyecto: proyectoNombre,
                token: token,
                fecha: new Date().toISOString()
            });
            guardar();
            
            const link = window.location.origin + window.location.pathname + '?invitar=' + token;
            
            // Mostrar modal con link para copiar
            this.mostrarLink(link, email, proyectoNombre);
            return true;
        },
        
        // Mostrar modal con link
        mostrarLink: function(link, email, proyecto) {
            // Eliminar modal existente
            const existing = document.getElementById('modalInvitacionStandalone');
            if (existing) existing.remove();
            
            const modal = document.createElement('div');
            modal.id = 'modalInvitacionStandalone';
            modal.innerHTML = `
                <div style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:999999; display:flex; align-items:center; justify-content:center;">
                    <div style="background:#1e293b; border-radius:16px; padding:25px; max-width:500px; width:90%; border:2px solid #8b5cf6;">
                        <h3 style="color:white; margin:0 0 15px 0;">✅ Invitación creada</h3>
                        <p style="color:#94a3b8;">📧 <strong>${email}</strong></p>
                        <p style="color:#94a3b8;">📁 <strong>${proyecto}</strong></p>
                        <div style="background:#0f172a; padding:12px; border-radius:8px; margin:15px 0; word-break:break-all; color:#8b5cf6; font-size:12px;">${link}</div>
                        <button id="copiarLinkStandalone" style="background:#8b5cf6; border:none; color:white; padding:10px 20px; border-radius:8px; cursor:pointer; width:100%;">📋 Copiar enlace</button>
                        <button id="cerrarModalStandalone" style="background:#334155; border:none; color:white; padding:10px 20px; border-radius:8px; cursor:pointer; width:100%; margin-top:10px;">Cerrar</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
            document.getElementById('copiarLinkStandalone').onclick = () => {
                navigator.clipboard.writeText(link);
                alert('✅ Enlace copiado');
                modal.remove();
            };
            document.getElementById('cerrarModalStandalone').onclick = () => modal.remove();
        },
        
        // Aceptar invitación (se llama automáticamente desde URL)
        aceptar: function(token) {
            const invitacion = datos.invitaciones.find(i => i.token === token);
            if (!invitacion) {
                alert('❌ Invitación no válida o expirada');
                return false;
            }
            
            const emailActual = getEmailActual();
            if (!emailActual) {
                alert('❌ Debes iniciar sesión para aceptar la invitación');
                return false;
            }
            
            if (invitacion.email !== emailActual) {
                alert('❌ Esta invitación es para otro email');
                return false;
            }
            
            // Guardar permiso
            if (!datos.permisos[emailActual]) datos.permisos[emailActual] = [];
            if (!datos.permisos[emailActual].includes(invitacion.proyecto)) {
                datos.permisos[emailActual].push(invitacion.proyecto);
                guardar();
            }
            
            alert('✅ Invitación aceptada. Recarga la página.');
            return true;
        },
        
        // Obtener proyectos permitidos para el usuario actual
        misProyectos: function() {
            const email = getEmailActual();
            if (!email) return [];
            return datos.permisos[email] || [];
        },
        
        // Filtrar projects global (ejecutar después de login)
        filtrarMisProyectos: function() {
            const email = getEmailActual();
            const esAdmin = email === 'ajackson2672@gmail.com';
            
            if (esAdmin) {
                console.log('👑 Admin - Sin filtros');
                return;
            }
            
            const permitidos = this.misProyectos();
            if (permitidos.length === 0) {
                console.log('📭 Sin proyectos invitados');
                return;
            }
            
            // Filtrar projects SIN modificar referencia
            const originalProjects = [...projects];
            const filtrados = originalProjects.filter(p => permitidos.includes(p.name));
            
            if (filtrados.length !== projects.length) {
                projects.length = 0;
                projects.push(...filtrados);
                if (typeof renderProjects === 'function') renderProjects();
                console.log(`✅ Proyectos filtrados: ${filtrados.map(p => p.name).join(', ')}`);
            }
        }
    };
    
    // ========== DETECTAR INVITACIÓN EN URL ==========
    const urlToken = new URLSearchParams(window.location.search).get('invitar');
    if (urlToken) {
        setTimeout(() => {
            if (window.StandaloneInvitar.aceptar(urlToken)) {
                window.history.replaceState({}, document.title, window.location.pathname);
                location.reload();
            }
        }, 500);
    }
    
    // ========== AUTO-FILTRAR AL CARGAR ==========
    setTimeout(() => {
        if (getEmailActual()) {
            window.StandaloneInvitar.filtrarMisProyectos();
        }
    }, 1500);
    
    console.log('✅ Sistema standalone cargado');
    console.log('📌 Comandos:');
    console.log('   StandaloneInvitar.invitar("email@test.com", "Mi Proyecto")');
    console.log('   StandaloneInvitar.misProyectos()');
    console.log('   StandaloneInvitar.filtrarMisProyectos()');
})();