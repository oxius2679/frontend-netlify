// ============================================================
// 🚀 SISTEMA DE COLABORACIÓN COMPLETO - UN SOLO BLOQUE
// ============================================================

(function() {
    'use strict';
    
    console.log('🔥 INSTALANDO SISTEMA DE COLABORACIÓN COMPLETO...');

    // ============================================================
    // 1. SINCRONIZACIÓN ENTRE PESTAÑAS (NO ROMPE MOVIMIENTOS)
    // ============================================================
    
    // Escuchar cambios en localStorage (esto NO interfiere con drag & drop)
    window.addEventListener('storage', function(e) {
        if (e.key === 'projects' || e.key === 'sync-flag') {
            console.log('📡 Cambio en localStorage detectado!');
            setTimeout(() => {
                const stored = localStorage.getItem('projects');
                if (stored) {
                    try {
                        const nuevos = JSON.parse(stored);
                        if (JSON.stringify(nuevos) !== JSON.stringify(window.projects)) {
                            window.projects = nuevos;
                            if (typeof renderProjects === 'function') renderProjects();
                            if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
                            mostrarNotificacion('🔄 Proyectos actualizados');
                        }
                    } catch(e) {}
                }
            }, 100);
        }
    });
    
    // Interceptar safeSave (SOLO para emitir flag, sin romper nada)
    const originalSafeSave = window.safeSave;
    if (originalSafeSave) {
        window.safeSave = async function(clienteId) {
            const result = await originalSafeSave(clienteId);
            localStorage.setItem('sync-flag', Date.now().toString());
            return result;
        };
    }
    
    // Polling de respaldo (cada 3 segundos)
    setInterval(function() {
        const stored = localStorage.getItem('projects');
        if (stored) {
            try {
                const nuevos = JSON.parse(stored);
                if (JSON.stringify(nuevos) !== JSON.stringify(window.projects)) {
                    window.projects = nuevos;
                    if (typeof renderProjects === 'function') renderProjects();
                    if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
                }
            } catch(e) {}
        }
    }, 3000);
    
    // ============================================================
    // 2. NOTIFICACIÓN VISUAL
    // ============================================================
    function mostrarNotificacion(mensaje) {
        const anterior = document.getElementById('notifColaboracion');
        if (anterior) anterior.remove();
        
        const notif = document.createElement('div');
        notif.id = 'notifColaboracion';
        notif.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: #1e293b;
            border: 2px solid #8b5cf6;
            border-radius: 12px;
            padding: 14px 20px;
            color: white;
            font-family: system-ui, sans-serif;
            font-size: 14px;
            z-index: 9999999;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            max-width: 400px;
            animation: slideIn 0.3s ease;
        `;
        notif.textContent = mensaje;
        document.body.appendChild(notif);
        setTimeout(function() { notif.remove(); }, 3000);
    }
    
    // ============================================================
    // 3. BOTÓN FLOTANTE Y MODAL DE COLABORACIÓN
    // ============================================================
    
    function crearBoton() {
        if (document.getElementById('colabFloatBtn')) return;
        
        const btn = document.createElement('div');
        btn.id = 'colabFloatBtn';
        btn.innerHTML = '👥';
        btn.title = 'Colaboración';
        btn.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #8b5cf6, #6d28d9);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            cursor: pointer;
            z-index: 999999;
            box-shadow: 0 4px 20px rgba(139, 92, 246, 0.5);
            border: 2px solid rgba(255,255,255,0.2);
            user-select: none;
            font-family: Arial, sans-serif;
        `;
        
        btn.onclick = function() {
            const panel = document.getElementById('colabPanel');
            if (panel) {
                panel.remove();
            } else {
                abrirPanel();
            }
        };
        
        document.body.appendChild(btn);
        console.log('✅ Botón creado');
    }

    async function abrirPanel() {
        const token = localStorage.getItem('authToken');
        const clienteId = localStorage.getItem('clienteId');
        
        if (!token || !clienteId) {
            alert('❌ Inicia sesión primero');
            return;
        }
        
        try {
            const resp = await fetch(`https://mi-sistema-proyectos-backend-4.onrender.com/api/projects?clienteId=${clienteId}`, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            const data = await resp.json();
            const misProyectos = data.projects || [];
            
            const respInv = await fetch(`https://mi-sistema-proyectos-backend-4.onrender.com/api/colaboracion/invitaciones`, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            const dataInv = await respInv.json();
            const invitaciones = dataInv.invitaciones || [];
            
            const panel = document.createElement('div');
            panel.id = 'colabPanel';
            panel.style.cssText = `
                position: fixed;
                bottom: 100px;
                left: 20px;
                width: 420px;
                max-height: 70vh;
                background: #0f172a;
                border-radius: 16px;
                border: 2px solid #8b5cf6;
                box-shadow: 0 20px 60px rgba(0,0,0,0.8);
                z-index: 999998;
                color: white;
                font-family: 'Segoe UI', system-ui, sans-serif;
                overflow: hidden;
                display: flex;
                flex-direction: column;
            `;
            
            let html = `
                <div style="padding: 16px 20px; background: #1e293b; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 20px;">👥</span>
                        <span style="font-weight: 600; font-size: 16px;">Colaboración</span>
                        ${invitaciones.filter(i => i.estado === 'pendiente').length > 0 ? 
                            `<span style="background: #ef4444; padding: 2px 10px; border-radius: 12px; font-size: 11px;">${invitaciones.filter(i => i.estado === 'pendiente').length}</span>` : ''}
                    </div>
                    <button onclick="document.getElementById('colabPanel').remove()" style="background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer;">✕</button>
                </div>
                
                <div style="padding: 16px; overflow-y: auto; flex: 1; max-height: 400px;">
            `;
            
            const pendientes = invitaciones.filter(i => i.estado === 'pendiente');
            html += `
                <div style="margin-bottom: 20px;">
                    <div style="color: #f59e0b; font-size: 13px; font-weight: 600; margin-bottom: 10px;">📩 Invitaciones Pendientes</div>
                    ${pendientes.length === 0 ? `
                        <div style="text-align: center; padding: 20px; color: #64748b; font-size: 13px;">No tienes invitaciones pendientes</div>
                    ` : pendientes.map(inv => `
                        <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 12px 16px; margin-bottom: 10px; border-left: 4px solid #f59e0b;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600;">${inv.proyectoNombre || 'Proyecto'}</div>
                                    <div style="font-size: 11px; color: #94a3b8;">Rol: ${inv.rol || 'colaborador'}</div>
                                </div>
                                <button onclick="aceptarInvitacion('${inv._id}')" style="background: #10b981; color: white; border: none; padding: 6px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 12px;">
                                    ✅ Aceptar
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            html += `
                <div style="margin-bottom: 20px;">
                    <div style="color: #8b5cf6; font-size: 13px; font-weight: 600; margin-bottom: 10px;">👑 Mis Proyectos</div>
                    ${misProyectos.length === 0 ? `
                        <div style="text-align: center; padding: 20px; color: #64748b; font-size: 13px;">No tienes proyectos propios</div>
                    ` : misProyectos.map(p => `
                        <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 12px 16px; margin-bottom: 8px; border-left: 4px solid #8b5cf6;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600;">${p.name}</div>
                                    <div style="font-size: 11px; color: #94a3b8;">
                                        ${p.colaboradores?.length || 0} colaboradores
                                    </div>
                                </div>
                                <span style="color: #8b5cf6; font-size: 11px; font-weight: 600;">👑 DUEÑO</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            if (misProyectos.length > 0) {
                html += `
                    <div style="border-top: 1px solid #334155; padding-top: 16px;">
                        <div style="color: #8b5cf6; font-size: 13px; font-weight: 600; margin-bottom: 10px;">➕ Invitar Colaborador</div>
                        <div style="margin-bottom: 8px;">
                            <select id="invitarProyectoSelect" style="width: 100%; padding: 10px; background: #0f172a; border: 1px solid #334155; border-radius: 8px; color: white; font-size: 13px;">
                                ${misProyectos.map(p => `<option value="${p.id || p._id}">${p.name}</option>`).join('')}
                            </select>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <input type="email" id="invitarEmailInput" placeholder="email@ejemplo.com" style="flex: 1; padding: 10px; background: #0f172a; border: 1px solid #334155; border-radius: 8px; color: white; font-size: 13px;">
                            <button onclick="enviarInvitacion()" style="background: linear-gradient(135deg, #8b5cf6, #6d28d9); color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600;">
                                Enviar
                            </button>
                        </div>
                        <div id="invitarMensaje" style="margin-top: 8px; font-size: 12px; text-align: center;"></div>
                    </div>
                `;
            }
            
            html += `
                    <div style="margin-top: 10px; padding: 10px; background: rgba(255,255,255,0.03); border-radius: 8px; font-size: 10px; color: #64748b; border: 1px solid #1e293b; text-align: center;">
                        🔄 ${misProyectos.length} propios | ${invitaciones.filter(i => i.estado === 'aceptada').length} colaborativos
                    </div>
                </div>
            `;
            
            panel.innerHTML = html;
            document.body.appendChild(panel);
            
            window.enviarInvitacion = async function() {
                const select = document.getElementById('invitarProyectoSelect');
                const emailInput = document.getElementById('invitarEmailInput');
                const mensaje = document.getElementById('invitarMensaje');
                
                const proyectoId = select?.value;
                const email = emailInput?.value?.trim();
                
                if (!proyectoId || !email) {
                    mensaje.innerHTML = '<span style="color: #ef4444;">❌ Completa todos los campos</span>';
                    return;
                }
                
                mensaje.innerHTML = '<span style="color: #f59e0b;">⏳ Enviando...</span>';
                
                try {
                    const resp = await fetch('https://mi-sistema-proyectos-backend-4.onrender.com/api/invitations', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                        body: JSON.stringify({
                            email: email,
                            proyectoIndex: 0,
                            proyectoNombre: misProyectos.find(p => (p.id || p._id) == proyectoId)?.name || 'Proyecto',
                            rol: 'editor'
                        })
                    });
                    
                    const data = await resp.json();
                    
                    if (data.success) {
                        mensaje.innerHTML = `<span style="color: #10b981;">✅ Invitación enviada a ${email}</span>`;
                        emailInput.value = '';
                        setTimeout(() => mensaje.innerHTML = '', 5000);
                    } else {
                        mensaje.innerHTML = `<span style="color: #ef4444;">❌ ${data.error || 'Error'}</span>`;
                    }
                } catch (error) {
                    mensaje.innerHTML = `<span style="color: #ef4444;">❌ Error de conexión</span>`;
                    console.error(error);
                }
            };
            
            window.aceptarInvitacion = async function(invitacionId) {
                try {
                    const resp = await fetch('https://mi-sistema-proyectos-backend-4.onrender.com/api/colaboracion/aceptar-invitacion', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                        body: JSON.stringify({ invitacionId })
                    });
                    
                    const data = await resp.json();
                    
                    if (data.success) {
                        alert('✅ Invitación aceptada');
                        document.getElementById('colabPanel')?.remove();
                        // Recargar datos sin recargar página
                        const stored = localStorage.getItem('projects');
                        if (stored) {
                            window.projects = JSON.parse(stored);
                            if (typeof renderProjects === 'function') renderProjects();
                            if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
                        }
                    } else {
                        alert('❌ Error: ' + (data.error || 'Error desconocido'));
                    }
                } catch (error) {
                    alert('❌ Error de conexión');
                    console.error(error);
                }
            };
            
        } catch (error) {
            console.error('❌ Error:', error);
            alert('❌ Error al cargar el panel');
        }
    }

    // ============================================================
    // 4. INICIALIZAR
    // ============================================================
    crearBoton();
    console.log('✅ SISTEMA DE COLABORACIÓN INSTALADO');
    console.log('✅ Los movimientos (drag & drop) NO se ven afectados');
    console.log('💡 Haz clic en el botón 👥 para abrir el panel');
    
})();