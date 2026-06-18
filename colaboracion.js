// ============================================================
// 🚀 COLABORACIÓN - VERSIÓN QUE SÍ FUNCIONA
// ============================================================
// SOLO USA localStorage, NO DUPLICA

(function() {
    'use strict';
    
    console.log('🔥 COLABORACIÓN - VERSIÓN FINAL');
    
    const STORAGE_KEY = 'colaboracion_data';
    let data = { proyectos: [], invitaciones: [], usuarios: [] };
    let panelAbierto = false;
    
    // ============================================
    // CARGAR DATOS
    // ============================================
    function loadData() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                data = JSON.parse(saved);
            } else {
                data = { proyectos: [], invitaciones: [], usuarios: [] };
                saveData();
            }
        } catch(e) {
            data = { proyectos: [], invitaciones: [], usuarios: [] };
        }
        return data;
    }
    
    function saveData() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch(e) {}
    }
    
    // ============================================
    // USUARIO ACTUAL
    // ============================================
    function getCurrentUser() {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (user.email) return user.email;
            const token = localStorage.getItem('authToken');
            if (token) {
                const payload = JSON.parse(atob(token.split('.')[1]));
                return payload.email || payload.sub;
            }
            return localStorage.getItem('userEmail') || null;
        } catch(e) {
            return null;
        }
    }
    
    // ============================================
    // SINCRONIZAR PROYECTOS EXISTENTES (SOLO UNA VEZ)
    // ============================================
    function syncProjects() {
        const user = getCurrentUser();
        if (!user || typeof projects === 'undefined') return;
        
        console.log('🔄 Sincronizando proyectos...');
        
        // Limpiar data.proyectos
        data.proyectos = [];
        
        // Copiar proyectos de projects a data.proyectos
        for (let i = 0; i < projects.length; i++) {
            const p = projects[i];
            const nuevoProyecto = {
                id: p.id || Date.now() + i,
                nombre: p.name || p.nombre || 'Proyecto',
                descripcion: p.description || '',
                creador: p.clienteId || user,
                fecha: new Date().toISOString(),
                colaboradores: p.colaboradores && p.colaboradores.length > 0 ? p.colaboradores : [user],
                tareas: (p.tasks || []).map(t => ({
                    id: t.id || Date.now(),
                    nombre: t.name || 'Tarea',
                    estado: t.status === 'completed' ? 'completada' : 'pendiente',
                    asignado: t.assignee || ''
                })),
                activo: true
            };
            data.proyectos.push(nuevoProyecto);
        }
        
        saveData();
        console.log(`✅ ${data.proyectos.length} proyectos sincronizados`);
    }
    
    // ============================================
    // OBTENER MIS PROYECTOS
    // ============================================
    function getMyProjects() {
        const user = getCurrentUser();
        if (!user) return [];
        return data.proyectos.filter(p => p.colaboradores && p.colaboradores.includes(user));
    }
    
    // ============================================
    // OBTENER INVITACIONES
    // ============================================
    function getMyInvitations() {
        const user = getCurrentUser();
        if (!user) return [];
        return data.invitaciones.filter(i => i.email === user && i.estado === 'pendiente');
    }
    
    // ============================================
    // ENVIAR INVITACIÓN
    // ============================================
    function sendInvitation(proyectoId, email) {
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
            alert(`⚠️ ${email} ya es colaborador`);
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
        
        alert(`✅ Invitación enviada a ${email}`);
        updateBadge();
        renderPanel();
        return true;
    }
    
    // ============================================
    // ACEPTAR INVITACIÓN
    // ============================================
    function acceptInvitation(invitacionId) {
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
            alert('⚠️ Invitación ya procesada');
            return false;
        }
        
        if (invitacion.email !== user) {
            alert(`❌ Esta invitación es para ${invitacion.email}`);
            return false;
        }
        
        const proyecto = data.proyectos.find(p => p.id === invitacion.proyectoId);
        if (proyecto && !proyecto.colaboradores.includes(user)) {
            proyecto.colaboradores.push(user);
        }
        
        invitacion.estado = 'aceptada';
        saveData();
        
        alert(`✅ Bienvenido a "${invitacion.proyectoNombre}"`);
        
        if (typeof renderProjects === 'function') renderProjects();
        if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
        
        updateBadge();
        renderPanel();
        return true;
    }
    
    // ============================================
    // BOTÓN FLOTANTE
    // ============================================
    function createFloatingButton() {
        const existing = document.getElementById('colabFloatBtn');
        if (existing) existing.remove();
        
        const btn = document.createElement('div');
        btn.id = 'colabFloatBtn';
        btn.innerHTML = '👥';
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
        `;
        
        btn.onclick = togglePanel;
        
        const badge = document.createElement('div');
        badge.id = 'colabBadge';
        badge.style.cssText = `
            position: absolute;
            top: -5px;
            right: -5px;
            background: #ef4444;
            color: white;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            font-size: 12px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #0f172a;
        `;
        badge.textContent = '0';
        btn.appendChild(badge);
        
        document.body.appendChild(btn);
        updateBadge();
    }
    
    function updateBadge() {
        const badge = document.getElementById('colabBadge');
        if (!badge) return;
        loadData();
        const pendientes = getMyInvitations();
        badge.textContent = pendientes.length;
        badge.style.display = pendientes.length > 0 ? 'flex' : 'none';
    }
    
    // ============================================
    // PANEL
    // ============================================
    function togglePanel() {
        const existing = document.getElementById('colabPanel');
        if (existing) {
            existing.remove();
            panelAbierto = false;
            return;
        }
        
        loadData();
        const user = getCurrentUser();
        const pendientes = getMyInvitations();
        const misProyectos = getMyProjects();
        
        const panel = document.createElement('div');
        panel.id = 'colabPanel';
        panel.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 20px;
            width: 420px;
            max-height: 65vh;
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
        
        const proyectosOptions = misProyectos.map(p => 
            `<option value="${p.id}">${p.nombre}</option>`
        ).join('');
        
        panel.innerHTML = `
            <div style="padding: 16px 20px; background: #1e293b; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: 600; font-size: 16px;">👥 Colaboración</span>
                <button onclick="document.getElementById('colabPanel').remove()" style="background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer;">✕</button>
            </div>
            
            <div style="padding: 16px; overflow-y: auto; flex: 1; max-height: 400px;">
                <div style="margin-bottom: 20px;">
                    <div style="color: #f59e0b; font-size: 13px; font-weight: 600; margin-bottom: 10px;">📩 Invitaciones Pendientes</div>
                    ${pendientes.length === 0 ? `
                        <div style="text-align: center; padding: 20px; color: #64748b; font-size: 13px;">No tienes invitaciones</div>
                    ` : pendientes.map(inv => `
                        <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 12px 16px; margin-bottom: 10px; border-left: 4px solid #f59e0b;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600;">${inv.proyectoNombre}</div>
                                    <div style="font-size: 11px; color: #94a3b8;">${new Date(inv.fecha).toLocaleDateString()}</div>
                                </div>
                                <button onclick="window.aceptarInvitacion(${inv.id})" style="background: #10b981; color: white; border: none; padding: 6px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 12px;">
                                    ✅ Aceptar
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div style="margin-bottom: 20px;">
                    <div style="color: #10b981; font-size: 13px; font-weight: 600; margin-bottom: 10px;">📂 Mis Proyectos</div>
                    ${misProyectos.length === 0 ? `
                        <div style="text-align: center; padding: 20px; color: #64748b; font-size: 13px;">No estás en proyectos</div>
                    ` : misProyectos.map(p => `
                        <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 12px 16px; margin-bottom: 8px; border-left: 4px solid #10b981;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600;">${p.nombre}</div>
                                    <div style="font-size: 11px; color: #94a3b8;">${p.colaboradores?.length || 1} colaboradores</div>
                                </div>
                                <span style="color: #10b981; font-size: 11px;">✅ Activo</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div style="border-top: 1px solid #334155; padding-top: 16px;">
                    <div style="color: #8b5cf6; font-size: 13px; font-weight: 600; margin-bottom: 10px;">➕ Invitar</div>
                    <select id="invitarProyectoSelect" style="width: 100%; padding: 10px; background: #0f172a; border: 1px solid #334155; border-radius: 8px; color: white; font-size: 13px; margin-bottom: 8px;">
                        ${proyectosOptions || '<option value="">No tienes proyectos</option>'}
                    </select>
                    <div style="display: flex; gap: 8px;">
                        <input type="email" id="invitarEmailInput" placeholder="email@ejemplo.com" style="flex: 1; padding: 10px; background: #0f172a; border: 1px solid #334155; border-radius: 8px; color: white; font-size: 13px;">
                        <button onclick="window.enviarInvitacion()" style="background: #8b5cf6; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600;">
                            Enviar
                        </button>
                    </div>
                    <div id="invitarMensaje" style="margin-top: 8px; font-size: 12px; text-align: center;"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        panelAbierto = true;
        
        window.enviarInvitacion = function() {
            const select = document.getElementById('invitarProyectoSelect');
            const emailInput = document.getElementById('invitarEmailInput');
            const mensaje = document.getElementById('invitarMensaje');
            
            const proyectoId = select?.value;
            const email = emailInput?.value?.trim();
            
            if (!proyectoId) {
                mensaje.innerHTML = '<span style="color: #ef4444;">❌ Selecciona un proyecto</span>';
                return;
            }
            if (!email) {
                mensaje.innerHTML = '<span style="color: #ef4444;">❌ Ingresa un email</span>';
                return;
            }
            
            mensaje.innerHTML = '<span style="color: #f59e0b;">⏳ Enviando...</span>';
            const resultado = sendInvitation(Number(proyectoId), email);
            if (resultado) {
                mensaje.innerHTML = `<span style="color: #10b981;">✅ Invitación enviada a ${email}</span>`;
                emailInput.value = '';
            }
        };
        
        window.aceptarInvitacion = function(id) {
            acceptInvitation(id);
        };
    }
    
    // ============================================
    // INICIALIZAR
    // ============================================
    function init() {
        console.log('🚀 Iniciando colaboración...');
        loadData();
        syncProjects();
        createFloatingButton();
        
        setInterval(function() {
            loadData();
            updateBadge();
        }, 5000);
        
        console.log('✅ Sistema listo');
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100);
    }
    
})();

// ============================================================
// 🔥 SINCRONIZACIÓN EN TIEMPO REAL CON SOCKET.IO
// ============================================================

(function sincronizacionTiempoReal() {
    'use strict';
    
    console.log('🔥 INICIANDO SINCRONIZACIÓN EN TIEMPO REAL...');
    
    const SOCKET_URL = 'https://mi-sistema-proyectos-backend-4.onrender.com';
    let socket = null;
    let proyectoActual = null;
    
    // ============================================
    // CONECTAR SOCKET
    // ============================================
    function conectarSocket() {
        const token = localStorage.getItem('authToken') || localStorage.getItem('token');
        if (!token) {
            console.log('⏳ Esperando token...');
            setTimeout(conectarSocket, 2000);
            return;
        }
        
        if (socket && socket.connected) {
            console.log('✅ Socket ya conectado');
            return;
        }
        
        try {
            if (typeof io === 'undefined') {
                const script = document.createElement('script');
                script.src = 'https://cdn.socket.io/4.7.2/socket.io.min.js';
                script.onload = function() {
                    _inicializarSocket(token);
                };
                document.head.appendChild(script);
            } else {
                _inicializarSocket(token);
            }
        } catch(e) {
            console.error('❌ Error conectando socket:', e);
            setTimeout(conectarSocket, 5000);
        }
    }
    
    function _inicializarSocket(token) {
        try {
            socket = io(SOCKET_URL, {
                auth: { token: token },
                transports: ['websocket', 'polling'],
                reconnection: true,
                reconnectionAttempts: 10,
                reconnectionDelay: 1000
            });
            
            socket.on('connect', function() {
                console.log('✅ Socket conectado:', socket.id);
                const clienteId = localStorage.getItem('clienteId');
                socket.emit('register-user', { userId: clienteId });
                unirseAlProyectoActual();
            });
            
            socket.on('disconnect', function() {
                console.log('🔌 Socket desconectado');
            });
            
            socket.on('reconnect', function() {
                console.log('🔄 Socket reconectado');
                unirseAlProyectoActual();
            });
            
            // ============================================
            // RECIBIR EVENTOS DE TAREAS
            // ============================================
            socket.on('task-created', function(data) {
                console.log('📦 Tarea creada por otro usuario:', data);
                aplicarCambioRemoto('task-created', data);
            });
            
            socket.on('task-updated', function(data) {
                console.log('📦 Tarea actualizada por otro usuario:', data);
                aplicarCambioRemoto('task-updated', data);
            });
            
            socket.on('task-moved', function(data) {
                console.log('📦 Tarea movida por otro usuario:', data);
                aplicarCambioRemoto('task-moved', data);
            });
            
            socket.on('task-deleted', function(data) {
                console.log('📦 Tarea eliminada por otro usuario:', data);
                aplicarCambioRemoto('task-deleted', data);
            });
            
            socket.on('project-updated', function(data) {
                console.log('📊 Proyecto actualizado:', data);
                sincronizarDesdeBackend();
            });
            
        } catch(e) {
            console.error('❌ Error:', e);
        }
    }
    
    // ============================================
    // UNIRSE AL PROYECTO ACTUAL
    // ============================================
    function unirseAlProyectoActual() {
        const projectId = obtenerProyectoActual();
        if (projectId && socket && socket.connected) {
            socket.emit('join-project', projectId);
            proyectoActual = projectId;
            console.log('📁 Unido a sala project-' + projectId);
        }
    }
    
    function obtenerProyectoActual() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const projectId = urlParams.get('projectId') || urlParams.get('proyectoId');
            if (projectId) return projectId;
            
            const currentProject = localStorage.getItem('currentProjectId');
            if (currentProject) return currentProject;
            
            if (typeof projects !== 'undefined' && projects.length > 0) {
                const currentIndex = parseInt(localStorage.getItem('currentProjectIndex') || '0');
                if (projects[currentIndex]) {
                    return projects[currentIndex].id || projects[currentIndex]._id || currentIndex;
                }
            }
            return null;
        } catch(e) {
            return null;
        }
    }
    
    // ============================================
    // APLICAR CAMBIO REMOTO
    // ============================================
    function aplicarCambioRemoto(evento, data) {
        console.log('🔄 Aplicando cambio remoto:', evento, data);
        
        if (typeof projects === 'undefined') return;
        
        // Buscar el proyecto
        const proyecto = projects.find(p => {
            const id = p.id || p._id;
            return id == data.projectId || p.name === data.projectName;
        });
        
        if (!proyecto) {
            console.warn('⚠️ Proyecto no encontrado');
            return;
        }
        
        if (!proyecto.tasks) proyecto.tasks = [];
        
        switch(evento) {
            case 'task-created':
                if (data.task) {
                    const existe = proyecto.tasks.some(t => t.id == data.task.id);
                    if (!existe) {
                        proyecto.tasks.push(data.task);
                        console.log('✅ Tarea agregada remotamente');
                    }
                }
                break;
                
            case 'task-updated':
                if (data.taskId && data.task) {
                    const index = proyecto.tasks.findIndex(t => t.id == data.taskId);
                    if (index !== -1) {
                        proyecto.tasks[index] = { ...proyecto.tasks[index], ...data.task };
                        console.log('✅ Tarea actualizada remotamente');
                    }
                }
                break;
                
            case 'task-moved':
                if (data.taskId && data.newStatus) {
                    const index = proyecto.tasks.findIndex(t => t.id == data.taskId);
                    if (index !== -1) {
                        proyecto.tasks[index].status = data.newStatus;
                        proyecto.tasks[index].estado = data.newStatus;
                        console.log('✅ Tarea movida a "' + data.newStatus + '" remotamente');
                    }
                }
                break;
                
            case 'task-deleted':
                if (data.taskId) {
                    proyecto.tasks = proyecto.tasks.filter(t => t.id != data.taskId);
                    console.log('✅ Tarea eliminada remotamente');
                }
                break;
        }
        
        // Guardar localmente
        localStorage.setItem('projects', JSON.stringify(projects));
        
        // Actualizar interfaz
        if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
        if (typeof renderProjects === 'function') renderProjects();
        
        mostrarNotificacion('🔄 Cambio sincronizado');
    }
    
    // ============================================
    // EMITIR EVENTOS LOCALES
    // ============================================
    function emitirCambioLocal(evento, data) {
        if (!socket || !socket.connected) {
            console.warn('⚠️ Socket no conectado, cambio solo local');
            return;
        }
        
        const projectId = obtenerProyectoActual();
        const userEmail = getCurrentUser() || 'Usuario';
        
        const payload = {
            ...data,
            projectId: projectId,
            userEmail: userEmail,
            timestamp: new Date().toISOString()
        };
        
        console.log('📤 Emitiendo ' + evento + ':', payload);
        socket.emit(evento, payload);
    }
    
    // ============================================
    // INTERCEPTAR FUNCIONES DE TAREAS
    // ============================================
    function interceptarFuncionesTareas() {
        // Interceptar movimiento de tareas (drag & drop)
        document.addEventListener('task-moved-local', function(e) {
            const data = e.detail;
            if (data) {
                emitirCambioLocal('task-moved', data);
            }
        });
        
        // Interceptar creación de tareas
        const originalCreateTask = window.crearTarea || window.createTask;
        if (originalCreateTask) {
            window.crearTarea = function(...args) {
                const result = originalCreateTask.apply(this, args);
                setTimeout(function() {
                    const tarea = args[0] || { name: 'Nueva tarea' };
                    emitirCambioLocal('task-created', { task: tarea });
                }, 100);
                return result;
            };
            console.log('✅ crearTarea interceptada');
        }
        
        // Interceptar actualización de tareas
        const originalUpdateTask = window.actualizarTarea || window.updateTask;
        if (originalUpdateTask) {
            window.actualizarTarea = function(taskId, data, ...args) {
                const result = originalUpdateTask.apply(this, [taskId, data, ...args]);
                emitirCambioLocal('task-updated', { taskId: taskId, task: data });
                return result;
            };
            console.log('✅ actualizarTarea interceptada');
        }
        
        // Interceptar eliminación de tareas
        const originalDeleteTask = window.eliminarTarea || window.deleteTask;
        if (originalDeleteTask) {
            window.eliminarTarea = function(taskId, ...args) {
                const result = originalDeleteTask.apply(this, [taskId, ...args]);
                emitirCambioLocal('task-deleted', { taskId: taskId });
                return result;
            };
            console.log('✅ eliminarTarea interceptada');
        }
    }
    
    // ============================================
    // SINCRONIZAR DESDE BACKEND
    // ============================================
    async function sincronizarDesdeBackend() {
        const token = localStorage.getItem('authToken') || localStorage.getItem('token');
        if (!token) return;
        
        try {
            const res = await fetch('https://mi-sistema-proyectos-backend-4.onrender.com/api/user/projects', {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            const data = await res.json();
            
            if (data.allProjects && data.allProjects.length > 0) {
                projects.length = 0;
                projects.push(...data.allProjects);
                localStorage.setItem('projects', JSON.stringify(projects));
                console.log('✅ Proyectos sincronizados desde backend');
                if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
                if (typeof renderProjects === 'function') renderProjects();
            }
        } catch(e) {
            console.error('❌ Error sincronizando:', e);
        }
    }
    
    // ============================================
    // NOTIFICACIONES
    // ============================================
    function mostrarNotificacion(mensaje) {
        const existing = document.getElementById('syncNotification');
        if (existing) existing.remove();
        
        const notif = document.createElement('div');
        notif.id = 'syncNotification';
        notif.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #8b5cf6;
            color: white;
            padding: 12px 20px;
            border-radius: 10px;
            z-index: 1000000;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
            max-width: 350px;
        `;
        notif.textContent = mensaje;
        document.body.appendChild(notif);
        
        setTimeout(function() {
            notif.style.animation = 'slideOut 0.3s ease';
            setTimeout(function() { notif.remove(); }, 300);
        }, 3000);
    }
    
    // ============================================
    // INICIALIZAR
    // ============================================
    function init() {
        console.log('🚀 Iniciando sincronización en tiempo real...');
        
        // Conectar socket
        setTimeout(conectarSocket, 1000);
        
        // Interceptar funciones de tareas
        setTimeout(interceptarFuncionesTareas, 2000);
        
        // Sincronización periódica
        setInterval(function() {
            sincronizarDesdeBackend();
        }, 15000);
        
        console.log('✅ Sincronización en tiempo real activada');
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 500);
    }
    
})();