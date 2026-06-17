// ============================================================
// 🚀 SISTEMA DE COLABORACIÓN - VERSIÓN SEGURA
// ============================================================

(function() {
    'use strict';
    
    console.log('🔥 SISTEMA DE COLABORACIÓN - VERSIÓN SEGURA');
    console.log('⚠️ ESTA VERSIÓN NO MODIFICA FECHAS DE TAREAS');
    
    // ============================================
    // CONFIGURACIÓN
    // ============================================
    const STORAGE_KEY = 'colaboracion_data';
    let data = { proyectos: [], invitaciones: [], usuarios: [] };
    
    function loadData() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) data = JSON.parse(saved);
        } catch(e) {}
        return data;
    }
    
    function saveData() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch(e) {}
    }
    
    function getCurrentUser() {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (user.email) return user.email;
            const token = localStorage.getItem('authToken');
            if (token) {
                const payload = JSON.parse(atob(token.split('.')[1]));
                return payload.email || payload.sub;
            }
        } catch(e) {}
        return null;
    }
    
    // ============================================
    // NÚCLEO - VERSIÓN SEGURA
    // ============================================
    const Core = {
        // ✅ ESTA FUNCIÓN NO MODIFICA FECHAS
        syncProjectsToMainSystem: function() {
            const user = getCurrentUser();
            if (!user) return;
            if (typeof projects === 'undefined' || !Array.isArray(projects)) return;
            
            const misProyectos = data.proyectos.filter(p => 
                p.colaboradores && p.colaboradores.includes(user)
            );
            
            if (misProyectos.length === 0) return;
            
            let cambios = 0;
            misProyectos.forEach(proyectoExterno => {
                const existe = projects.find(p => p.name === proyectoExterno.nombre);
                if (!existe) {
                    // ✅ CREA PROYECTO CON FECHAS ORIGINALES
                    const nuevoProyecto = {
                        id: Date.now(),
                        name: proyectoExterno.nombre,
                        description: proyectoExterno.descripcion || '',
                        clienteId: localStorage.getItem('clienteId'),
                        tasks: (proyectoExterno.tareas || []).map(t => ({
                            id: t.id || Date.now() + Math.random(),
                            name: t.nombre || 'Tarea sin nombre',
                            status: t.estado === 'completada' ? 'completed' : 'pending',
                            priority: 'media',
                            estimatedTime: 0,
                            timeLogged: 0,
                            progress: 0,
                            assignee: t.asignado || '',
                            description: '',
                            // ✅ MANTIENE FECHAS ORIGINALES
                            startDate: t.startDate || '',
                            deadline: t.deadline || ''
                        })),
                        colaboradores: proyectoExterno.colaboradores || [user],
                        createdAt: new Date().toISOString(),
                        totalProjectTime: 0
                    };
                    projects.push(nuevoProyecto);
                    cambios++;
                    console.log('✅ Proyecto creado:', proyectoExterno.nombre);
                } else {
                    // ✅ SI YA EXISTE, SOLO ACTUALIZA COLABORADORES
                    if (!existe.colaboradores) existe.colaboradores = [];
                    if (!existe.colaboradores.includes(user)) {
                        existe.colaboradores.push(user);
                        cambios++;
                    }
                }
            });
            
            if (cambios > 0) {
                localStorage.setItem('projects', JSON.stringify(projects));
                if (typeof renderProjects === 'function') renderProjects();
                console.log('✅ ' + cambios + ' cambio(s) sincronizados');
            }
        },
        
        getMyProjects: function() {
            const user = getCurrentUser();
            if (!user) return [];
            return data.proyectos.filter(p => p.colaboradores && p.colaboradores.includes(user));
        },
        
        getMyInvitations: function() {
            const user = getCurrentUser();
            if (!user) return [];
            return data.invitaciones.filter(i => i.email === user && i.estado === 'pendiente');
        },
        
        acceptInvitation: function(invitacionId) {
            const user = getCurrentUser();
            if (!user) {
                alert('❌ Inicia sesión primero');
                return false;
            }
            
            const invitacion = data.invitaciones.find(i => i.id === invitacionId);
            if (!invitacion) {
                alert('❌ Invitación no encontrada');
                return false;
            }
            
            if (invitacion.estado !== 'pendiente') {
                alert('⚠️ Esta invitación ya fue procesada');
                return false;
            }
            
            if (invitacion.email !== user) {
                alert('❌ Esta invitación es para ' + invitacion.email);
                return false;
            }
            
            const proyecto = data.proyectos.find(p => p.id === invitacion.proyectoId);
            if (proyecto && !proyecto.colaboradores.includes(user)) {
                proyecto.colaboradores.push(user);
            }
            
            invitacion.estado = 'aceptada';
            invitacion.fechaAceptacion = new Date().toISOString();
            saveData();
            
            this.syncProjectsToMainSystem();
            
            alert('✅ Bienvenido al proyecto "' + invitacion.proyectoNombre + '"');
            
            if (typeof renderProjects === 'function') renderProjects();
            if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
            
            return true;
        },
        
        sendInvitation: function(proyectoId, email) {
            const user = getCurrentUser();
            if (!user) {
                alert('❌ Inicia sesión primero');
                return false;
            }
            
            const proyecto = data.proyectos.find(p => p.id == proyectoId);
            if (!proyecto) {
                alert('❌ Proyecto no encontrado');
                return false;
            }
            
            if (proyecto.colaboradores.includes(email)) {
                alert('⚠️ ' + email + ' ya es colaborador');
                return false;
            }
            
            const invitacion = {
                id: Date.now(),
                proyectoId: proyecto.id,
                proyectoNombre: proyecto.nombre,
                email: email,
                fecha: new Date().toISOString(),
                estado: 'pendiente',
                creador: user
            };
            
            data.invitaciones.push(invitacion);
            saveData();
            
            alert('✅ Invitación enviada a ' + email + ' para "' + proyecto.nombre + '"');
            return true;
        }
    };
    
    // ============================================
    // BOTÓN FLOTANTE
    // ============================================
    function createFloatingButton() {
        const existing = document.getElementById('colabFloatBtn');
        if (existing) existing.remove();
        
        const btn = document.createElement('div');
        btn.id = 'colabFloatBtn';
        btn.innerHTML = '👥';
        btn.title = 'Colaboración';
        btn.style.cssText = 'position:fixed;bottom:20px;left:20px;width:60px;height:60px;background:linear-gradient(135deg,#8b5cf6,#6d28d9);color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:28px;cursor:pointer;z-index:999999;box-shadow:0 4px 20px rgba(139,92,246,0.5);transition:all 0.3s ease;border:2px solid rgba(255,255,255,0.2);user-select:none;font-family:Arial,sans-serif;';
        
        btn.onclick = function() {
            const panel = document.getElementById('colabPanel');
            if (panel) panel.remove();
            else renderPanel();
        };
        
        const badge = document.createElement('div');
        badge.id = 'colabBadge';
        badge.style.cssText = 'position:absolute;top:-5px;right:-5px;background:#ef4444;color:white;border-radius:50%;width:24px;height:24px;font-size:12px;font-weight:bold;display:flex;align-items:center;justify-content:center;border:2px solid #0f172a;';
        badge.textContent = '0';
        btn.appendChild(badge);
        document.body.appendChild(btn);
        updateBadge();
    }
    
    function updateBadge() {
        const badge = document.getElementById('colabBadge');
        if (!badge) return;
        loadData();
        const pendientes = Core.getMyInvitations();
        badge.textContent = pendientes.length;
        badge.style.display = pendientes.length > 0 ? 'flex' : 'none';
    }
    
    function renderPanel() {
        const existing = document.getElementById('colabPanel');
        if (existing) existing.remove();
        
        loadData();
        const user = getCurrentUser();
        const pendientes = Core.getMyInvitations();
        const misProyectos = Core.getMyProjects();
        const esAdmin = user === 'ajackson2672@gmail.com';
        
        const panel = document.createElement('div');
        panel.id = 'colabPanel';
        panel.style.cssText = 'position:fixed;bottom:100px;left:20px;width:420px;max-height:65vh;background:#0f172a;border-radius:16px;border:2px solid #8b5cf6;box-shadow:0 20px 60px rgba(0,0,0,0.8);z-index:999998;color:white;font-family:Segoe UI,system-ui,sans-serif;overflow:hidden;display:flex;flex-direction:column;';
        
        const proyectosOptions = misProyectos.map(p => 
            '<option value="' + p.id + '">' + p.nombre + '</option>'
        ).join('');
        
        panel.innerHTML = `
            <div style="padding:16px 20px;background:#1e293b;border-bottom:1px solid #334155;display:flex;justify-content:space-between;align-items:center;">
                <div style="display:flex;align-items:center;gap:10px;">
                    <span style="font-size:20px;">👥</span>
                    <span style="font-weight:600;font-size:16px;">Colaboración</span>
                    ${pendientes.length > 0 ? '<span style="background:#ef4444;padding:2px 10px;border-radius:12px;font-size:11px;">' + pendientes.length + '</span>' : ''}
                </div>
                <button onclick="document.getElementById('colabPanel').remove()" style="background:none;border:none;color:#94a3b8;font-size:20px;cursor:pointer;">✕</button>
            </div>
            <div style="padding:16px;overflow-y:auto;flex:1;max-height:400px;">
                <div style="margin-bottom:20px;">
                    <div style="color:#f59e0b;font-size:13px;font-weight:600;margin-bottom:10px;">📩 Invitaciones Pendientes</div>
                    ${pendientes.length === 0 ? '<div style="text-align:center;padding:20px;color:#64748b;font-size:13px;">No tienes invitaciones pendientes</div>' : 
                        pendientes.map(inv => '<div style="background:rgba(255,255,255,0.05);border-radius:10px;padding:12px 16px;margin-bottom:10px;border-left:4px solid #f59e0b;"><div style="display:flex;justify-content:space-between;align-items:center;"><div><div style="font-weight:600;">' + inv.proyectoNombre + '</div><div style="font-size:11px;color:#94a3b8;">' + new Date(inv.fecha).toLocaleDateString() + '</div></div><button onclick="aceptarInvitacion(' + inv.id + ')" style="background:#10b981;color:white;border:none;padding:6px 16px;border-radius:8px;cursor:pointer;font-weight:600;font-size:12px;">✅ Aceptar</button></div></div>').join('')
                    }
                </div>
                <div style="margin-bottom:20px;">
                    <div style="color:#10b981;font-size:13px;font-weight:600;margin-bottom:10px;">📂 Mis Proyectos Colaborativos</div>
                    ${misProyectos.length === 0 ? '<div style="text-align:center;padding:20px;color:#64748b;font-size:13px;">No estás en ningún proyecto colaborativo</div>' :
                        misProyectos.map(p => '<div style="background:rgba(255,255,255,0.05);border-radius:10px;padding:12px 16px;margin-bottom:8px;border-left:4px solid #10b981;"><div style="display:flex;justify-content:space-between;align-items:center;"><div><div style="font-weight:600;">' + p.nombre + '</div><div style="font-size:11px;color:#94a3b8;">' + (p.colaboradores?.length || 1) + ' colaboradores</div></div><span style="color:#10b981;font-size:11px;">✅ Activo</span></div></div>').join('')
                    }
                </div>
                ${esAdmin ? `
                    <div style="border-top:1px solid #334155;padding-top:16px;">
                        <div style="color:#8b5cf6;font-size:13px;font-weight:600;margin-bottom:10px;">➕ Invitar Colaborador</div>
                        <div style="margin-bottom:8px;">
                            <select id="invitarProyectoSelect" style="width:100%;padding:10px;background:#0f172a;border:1px solid #334155;border-radius:8px;color:white;font-size:13px;">
                                ${proyectosOptions}
                                ${misProyectos.length === 0 ? '<option value="">No tienes proyectos</option>' : ''}
                            </select>
                        </div>
                        <div style="display:flex;gap:8px;">
                            <input type="email" id="invitarEmailInput" placeholder="email@ejemplo.com" style="flex:1;padding:10px;background:#0f172a;border:1px solid #334155;border-radius:8px;color:white;font-size:13px;">
                            <button onclick="enviarInvitacion()" style="background:linear-gradient(135deg,#8b5cf6,#6d28d9);color:white;border:none;padding:10px 20px;border-radius:8px;cursor:pointer;font-weight:600;">Enviar</button>
                        </div>
                        <div id="invitarMensaje" style="margin-top:8px;font-size:12px;text-align:center;"></div>
                    </div>
                ` : ''}
            </div>
        `;
        
        document.body.appendChild(panel);
        
        window.enviarInvitacion = function() {
            const select = document.getElementById('invitarProyectoSelect');
            const emailInput = document.getElementById('invitarEmailInput');
            const mensaje = document.getElementById('invitarMensaje');
            
            const proyectoId = select?.value;
            const email = emailInput?.value?.trim();
            
            if (!proyectoId) {
                mensaje.innerHTML = '<span style="color:#ef4444;">❌ Selecciona un proyecto</span>';
                return;
            }
            if (!email) {
                mensaje.innerHTML = '<span style="color:#ef4444;">❌ Ingresa un email</span>';
                return;
            }
            
            const resultado = Core.sendInvitation(Number(proyectoId), email);
            if (resultado) {
                mensaje.innerHTML = '<span style="color:#10b981;">✅ Invitación enviada a ' + email + '</span>';
                emailInput.value = '';
                setTimeout(() => mensaje.innerHTML = '', 5000);
            }
        };
        
        window.aceptarInvitacion = function(id) {
            Core.acceptInvitation(id);
        };
    }
    
    // ============================================
    // INICIALIZAR
    // ============================================
    loadData();
    createFloatingButton();
    
    setTimeout(function() {
        Core.syncProjectsToMainSystem();
    }, 1000);
    
    window.Core = Core;
    
    console.log('✅ SISTEMA DE COLABORACIÓN CARGADO - VERSIÓN SEGURA');
    console.log('⚠️ LAS FECHAS DE LAS TAREAS NO SE MODIFICAN');
    
})();