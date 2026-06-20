// ============================================================
// 🔥 SISTEMA DE COLABORACIÓN - VERSIÓN QUE SÍ FUNCIONA
// ============================================================

(function() {
    'use strict';
    
    console.log('🔥 INSTALANDO SISTEMA DE COLABORACIÓN DEFINITIVO...');
    
    // ============================================================
    // 1. FUNCIÓN PARA RECARGAR PROYECTOS (CON RECARGA FORZADA)
    // ============================================================
    window.recargarProyectosForzado = async function() {
        console.log('🔄 RECARGANDO PROYECTOS (FORZADO)...');
        
        const token = localStorage.getItem('authToken');
        const clienteId = localStorage.getItem('clienteId');
        
        if (!token || !clienteId) {
            console.error('❌ No hay token o clienteId');
            return false;
        }
        
        try {
            // 1. Cargar proyectos del dueño
            const resp = await fetch(`https://mi-sistema-proyectos-backend-4.onrender.com/api/projects?clienteId=${clienteId}`, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            
            if (!resp.ok) {
                console.error('❌ Error:', resp.status);
                return false;
            }
            
            const data = await resp.json();
            console.log('📦 Datos recibidos:', data.projects?.length || 0, 'proyectos');
            
            if (data.projects) {
                // Guardar en memoria
                window.projects = data.projects;
                
                // Guardar en localStorage
                localStorage.setItem('projects', JSON.stringify(data.projects));
                
                // 🔥 FORZAR ACTUALIZACIÓN DE LA INTERFAZ
                console.log('🎯 FORZANDO ACTUALIZACIÓN DE INTERFAZ...');
                
                // Método 1: Renderizar proyectos
                if (typeof renderProjects === 'function') {
                    renderProjects();
                    console.log('✅ renderProjects ejecutado');
                }
                
                // Método 2: Renderizar Kanban
                if (typeof renderKanbanTasks === 'function') {
                    renderKanbanTasks();
                    console.log('✅ renderKanbanTasks ejecutado');
                }
                
                // Método 3: Recargar vista actual
                if (typeof refreshCurrentView === 'function') {
                    refreshCurrentView();
                    console.log('✅ refreshCurrentView ejecutado');
                }
                
                // Método 4: FORZAR RECARGA DE PÁGINA (como último recurso)
                // window.location.reload();
                
                mostrarNotificacion('✅ Proyectos actualizados (' + data.projects.length + ' proyectos)');
                return true;
            }
            
        } catch (error) {
            console.error('❌ Error:', error);
            return false;
        }
    };
    
    // ============================================================
    // 2. FUNCIÓN PARA MOVER TAREA Y EMITIR EVENTO
    // ============================================================
    window.moverTareaYNotificar = function(taskId, nuevoEstado) {
        console.log(`🔄 Moviendo tarea ${taskId} a ${nuevoEstado}...`);
        
        const project = window.projects[currentProjectIndex];
        if (!project) {
            console.error('❌ No hay proyecto seleccionado');
            return;
        }
        
        const task = project.tasks.find(t => t.id == taskId);
        if (!task) {
            console.error('❌ Tarea no encontrada');
            return;
        }
        
        const estadoAnterior = task.status;
        task.status = nuevoEstado;
        
        // Guardar cambios
        localStorage.setItem('projects', JSON.stringify(window.projects));
        
        // Emitir evento por socket
        if (window.miSocket && window.miSocket.connected) {
            window.miSocket.emit('collab-update', {
                action: 'moved',
                task: { id: task.id, name: task.name },
                projectId: currentProjectIndex,
                userId: localStorage.getItem('userEmail') || 'Usuario',
                oldStatus: estadoAnterior,
                newStatus: nuevoEstado,
                timestamp: new Date().toISOString()
            });
            console.log('📤 Evento emitido');
        } else {
            console.warn('⚠️ Socket no conectado, evento no emitido');
        }
        
        // Actualizar interfaz
        if (typeof renderKanbanTasks === 'function') {
            renderKanbanTasks();
        }
        
        mostrarNotificacion(`✅ Tarea "${task.name}" movida a ${nuevoEstado}`);
    };
    
    // ============================================================
    // 3. ESCUCHAR EVENTOS DEL SOCKET
    // ============================================================
    function escucharEventosSocket() {
        if (!window.miSocket) {
            console.warn('⚠️ No hay socket para escuchar');
            return;
        }
        
        console.log('👂 Configurando listeners del socket...');
        
        window.miSocket.on('collab-update', function(data) {
            console.log('📡 EVENTO COLLAB RECIBIDO:', data);
            
            // Mostrar notificación
            const mensaje = data.action === 'created' ? '✅ Nueva tarea creada' :
                           data.action === 'moved' ? `🔄 Tarea "${data.task?.name}" movida` :
                           data.action === 'updated' ? '✏️ Tarea actualizada' :
                           data.action === 'deleted' ? '🗑️ Tarea eliminada' :
                           '📡 Cambio detectado';
            
            mostrarNotificacion(`${mensaje} por ${data.userId || 'otro usuario'}`);
            
            // 🔥 RECARGAR PROYECTOS FORZADAMENTE
            setTimeout(() => {
                window.recargarProyectosForzado();
            }, 500);
        });
        
        // Escuchar eventos específicos
        window.miSocket.on('task-moved', function(data) {
            console.log('🔄 Tarea movida (evento específico):', data);
            setTimeout(() => window.recargarProyectosForzado(), 500);
        });
        
        window.miSocket.on('task-created', function(data) {
            console.log('📦 Tarea creada (evento específico):', data);
            setTimeout(() => window.recargarProyectosForzado(), 500);
        });
        
        window.miSocket.on('task-updated', function(data) {
            console.log('✏️ Tarea actualizada (evento específico):', data);
            setTimeout(() => window.recargarProyectosForzado(), 500);
        });
        
        window.miSocket.on('task-deleted', function(data) {
            console.log('🗑️ Tarea eliminada (evento específico):', data);
            setTimeout(() => window.recargarProyectosForzado(), 500);
        });
        
        console.log('✅ Listeners configurados');
    }
    
    // ============================================================
    // 4. NOTIFICACIÓN VISUAL
    // ============================================================
    function mostrarNotificacion(mensaje) {
        console.log('🔔 Notificación:', mensaje);
        
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
            backdrop-filter: blur(10px);
        `;
        notif.textContent = mensaje;
        document.body.appendChild(notif);
        
        setTimeout(() => {
            notif.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notif.remove(), 300);
        }, 4000);
    }
    
    // ============================================================
    // 5. CREAR SOCKET SI NO EXISTE
    // ============================================================
    function crearSocketSiNoExiste() {
        if (window.miSocket && window.miSocket.connected) {
            console.log('✅ Socket ya existe y está conectado');
            return;
        }
        
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('❌ No hay token');
            return;
        }
        
        console.log('🔗 Creando socket...');
        window.miSocket = io('https://mi-sistema-proyectos-backend-4.onrender.com', {
            transports: ['websocket', 'polling'],
            auth: { token: token },
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 1000
        });
        
        window.miSocket.on('connect', function() {
            console.log('✅ Socket CONECTADO! ID:', window.miSocket.id);
            window.miSocket.emit('join-collab-room', { 
                userId: localStorage.getItem('userEmail') || 'usuario_' + Date.now()
            });
            mostrarNotificacion('✅ Conectado al servidor de colaboración');
            escucharEventosSocket();
        });
        
        window.miSocket.on('connect_error', function(error) {
            console.error('❌ Error de conexión:', error.message);
        });
        
        window.miSocket.on('disconnect', function() {
            console.log('🔌 Socket desconectado');
        });
    }
    
    // ============================================================
    // 6. INICIALIZAR
    // ============================================================
    console.log('🚀 INICIALIZANDO...');
    
    // Crear socket
    crearSocketSiNoExiste();
    
    // Recargar proyectos
    setTimeout(() => {
        window.recargarProyectosForzado();
    }, 500);
    
    // Sincronizar cada 5 segundos (polling de respaldo)
    setInterval(() => {
        window.recargarProyectosForzado();
    }, 5000);
    
    console.log('✅ SISTEMA INSTALADO');
    console.log('');
    console.log('📋 COMANDOS DISPONIBLES:');
    console.log('  recargarProyectosForzado()   → Recargar proyectos manualmente');
    console.log('  moverTareaYNotificar(id, estado) → Mover tarea y notificar');
    console.log('  window.miSocket              → Ver socket');
    console.log('');
    console.log('💡 PRUEBA:');
    console.log('  recargarProyectosForzado()');
    
})();



// ============================================================
// 🚀 SOLO MODAL DE COLABORACIÓN - SIN ROMPER MOVIMIENTOS
// ============================================================

(function() {
    console.log('🔥 AGREGANDO MODAL DE COLABORACIÓN...');

    // ============================================================
    // 1. CREAR BOTÓN FLOTANTE
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

    // ============================================================
    // 2. ABRIR PANEL
    // ============================================================
    async function abrirPanel() {
        const token = localStorage.getItem('authToken');
        const clienteId = localStorage.getItem('clienteId');
        
        if (!token || !clienteId) {
            alert('❌ Inicia sesión primero');
            return;
        }
        
        try {
            // Obtener datos
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
            
            // Crear panel
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
            
            // Invitaciones pendientes
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
            
            // Mis proyectos
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
            
            // Invitar
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
            
            // Funciones del panel
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
                        location.reload();
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
    // 3. INICIAR
    // ============================================================
    crearBoton();
    console.log('✅ Modal de colaboración agregado SIN romper movimientos');
    
})();


