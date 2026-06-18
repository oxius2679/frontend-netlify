// ============================================================
// 🚀 SISTEMA DE COLABORACIÓN - VERSIÓN DEFINITIVA CON BACKEND
// ============================================================
// ✅ USA TU BACKEND EN RENDER
// ✅ SINCRONIZACIÓN EN TIEMPO REAL CON SOCKET.IO
// ✅ INVITACIONES POR CORREO
// ✅ PROYECTOS EN MONGODB

(function() {
    'use strict';
    
    console.log('🔥 SISTEMA DE COLABORACIÓN - VERSIÓN DEFINITIVA CON BACKEND');
    console.log('⚠️ LOS CAMBIOS SE SINCRONIZAN EN TIEMPO REAL');

    // ============================================
    // CONFIGURACIÓN
    // ============================================
    const API_URL = 'https://mi-sistema-proyectos-backend-4.onrender.com/api';
    const SOCKET_URL = 'https://mi-sistema-proyectos-backend-4.onrender.com';
    const FRONTEND_URL = 'https://admonproject.netlify.app';
    
    let socket = null;
    let proyectoActualId = null;
    let panelAbierto = false;

    // ============================================
    // UTILIDADES
    // ============================================
    function getAuthToken() {
        return localStorage.getItem('authToken') || 
               localStorage.getItem('token') || 
               null;
    }

    function getCurrentUser() {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (user.email) return user.email;
            const token = getAuthToken();
            if (token) {
                const payload = JSON.parse(atob(token.split('.')[1]));
                return payload.email || payload.sub;
            }
            const email = localStorage.getItem('userEmail');
            if (email) return email;
        } catch(e) {}
        return null;
    }

    function getHeaders() {
        const token = getAuthToken();
        return {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        };
    }

    function getClienteId() {
        return localStorage.getItem('clienteId') || 'cliente_default';
    }

    function getProyectoActual() {
        try {
            // De la URL
            const urlParams = new URLSearchParams(window.location.search);
            const projectId = urlParams.get('projectId') || urlParams.get('proyectoId');
            if (projectId) return projectId;

            // Del localStorage
            const currentProject = localStorage.getItem('currentProjectId');
            if (currentProject) return currentProject;

            // Del objeto global
            if (typeof projects !== 'undefined' && Array.isArray(projects) && projects.length > 0) {
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
    // 1. SISTEMA DE PROYECTOS - BACKEND
    // ============================================
    const Proyectos = {
        // Obtener proyectos del usuario
        getMisProyectos: async function() {
            const token = getAuthToken();
            if (!token) {
                console.log('⏳ No hay token');
                return [];
            }

            try {
                const response = await fetch(`${API_URL}/user/projects`, {
                    headers: getHeaders()
                });

                if (!response.ok) throw new Error(`HTTP ${response.status}`);

                const data = await response.json();
                console.log(`📂 ${data.allProjects?.length || 0} proyectos obtenidos`);
                
                // Actualizar array global
                if (typeof projects !== 'undefined' && data.allProjects) {
                    projects.length = 0;
                    projects.push(...data.allProjects);
                    localStorage.setItem('projects', JSON.stringify(projects));
                }
                
                return data.allProjects || [];
            } catch(error) {
                console.error('❌ Error obteniendo proyectos:', error);
                return [];
            }
        },

        // Guardar proyectos en backend
        guardarProyectos: async function(proyectos, clienteId) {
            try {
                const response = await fetch(`${API_URL}/projects`, {
                    method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify({
                        clienteId: clienteId || getClienteId(),
                        projects: proyectos,
                        currentProjectIndex: 0
                    })
                });

                if (!response.ok) throw new Error(`HTTP ${response.status}`);

                const data = await response.json();
                console.log('✅ Proyectos guardados en backend');
                return data;
            } catch(error) {
                console.error('❌ Error guardando proyectos:', error);
                return null;
            }
        },

        // Sincronizar con backend
        sincronizar: async function() {
            return await this.getMisProyectos();
        }
    };

    // ============================================
    // 2. SISTEMA DE INVITACIONES - BACKEND
    // ============================================
    const Invitaciones = {
        // Enviar invitación
        enviar: async function(proyectoIndex, proyectoNombre, email, rol = 'viewer') {
            const token = getAuthToken();
            if (!token) {
                alert('❌ Inicia sesión primero');
                return false;
            }

            console.log(`📨 Enviando invitación a ${email} para "${proyectoNombre}"...`);

            try {
                const response = await fetch(`${API_URL}/invitations`, {
                    method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify({
                        email: email,
                        proyectoIndex: proyectoIndex,
                        proyectoNombre: proyectoNombre,
                        rol: rol
                    })
                });

                const data = await response.json();

                if (data.success) {
                    console.log('✅ Invitación creada en el servidor');
                    console.log('🔗 URL:', data.url);

                    // Enviar por correo con EmailJS
                    if (typeof emailjs !== 'undefined') {
                        try {
                            await emailjs.send(
                                'service_kccmxz7',
                                'template_we2gzml',
                                {
                                    to_email: email,
                                    project_name: proyectoNombre,
                                    invite_link: data.url,
                                    reply_to: getCurrentUser()
                                }
                            );
                            console.log('📧 Correo de invitación enviado');
                        } catch(emailError) {
                            console.error('❌ Error enviando correo:', emailError);
                        }
                    } else {
                        console.warn('⚠️ EmailJS no disponible, enlace generado:', data.url);
                    }

                    alert(`✅ Invitación enviada a ${email} para "${proyectoNombre}"`);
                    return true;
                } else {
                    alert(`❌ Error: ${data.error || 'No se pudo enviar la invitación'}`);
                    return false;
                }
            } catch(error) {
                console.error('❌ Error enviando invitación:', error);
                alert('❌ Error al enviar la invitación');
                return false;
            }
        },

        // Validar invitación
        validar: async function(token) {
            try {
                const response = await fetch(`${API_URL}/invitations/validate?token=${token}`);
                const data = await response.json();
                return data;
            } catch(error) {
                console.error('❌ Error validando invitación:', error);
                return null;
            }
        },

        // Aceptar invitación
        aceptar: async function(token) {
            try {
                const response = await fetch(`${API_URL}/invitations/accept`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: token })
                });

                const data = await response.json();

                if (data.success) {
                    console.log('✅ Invitación aceptada:', data);
                    
                    // Sincronizar proyectos
                    await Proyectos.sincronizar();
                    
                    if (typeof renderProjects === 'function') renderProjects();
                    if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
                    
                    return data;
                } else {
                    throw new Error(data.error || 'Error al aceptar');
                }
            } catch(error) {
                console.error('❌ Error aceptando invitación:', error);
                throw error;
            }
        }
    };

    // ============================================
    // 3. SOCKET.IO - SINCRONIZACIÓN EN TIEMPO REAL
    // ============================================
    const SocketIO = {
        conectado: false,

        conectar: function() {
            const token = getAuthToken();
            if (!token) {
                console.log('⏳ Esperando token para conectar socket...');
                setTimeout(() => this.conectar(), 2000);
                return;
            }

            if (socket && socket.connected) {
                console.log('✅ Socket ya conectado');
                return;
            }

            console.log('🔌 Conectando a Socket.IO...');

            try {
                // Cargar socket.io si no está disponible
                if (typeof io === 'undefined') {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.socket.io/4.7.2/socket.io.min.js';
                    script.onload = () => this._inicializar(token);
                    document.head.appendChild(script);
                } else {
                    this._inicializar(token);
                }
            } catch(error) {
                console.error('❌ Error conectando socket:', error);
                setTimeout(() => this.conectar(), 5000);
            }
        },

        _inicializar: function(token) {
            try {
                socket = io(SOCKET_URL, {
                    auth: { token: token },
                    transports: ['websocket', 'polling'],
                    reconnection: true,
                    reconnectionAttempts: 20,
                    reconnectionDelay: 1000
                });

                // Eventos de conexión
                socket.on('connect', () => {
                    console.log('✅ Socket conectado:', socket.id);
                    this.conectado = true;
                    
                    // Registrar usuario
                    socket.emit('register-user', { 
                        userId: getClienteId()
                    });

                    // Unirse al proyecto actual
                    this.unirseAlProyecto();
                });

                socket.on('disconnect', () => {
                    console.log('🔌 Socket desconectado');
                    this.conectado = false;
                });

                socket.on('reconnect', () => {
                    console.log('🔄 Socket reconectado');
                    this.conectado = true;
                    this.unirseAlProyecto();
                    this._solicitarSincronizacion();
                });

                socket.on('connect_error', (error) => {
                    console.error('❌ Error de conexión socket:', error);
                    this.conectado = false;
                });

                // ============================================
                // EVENTOS RECIBIDOS
                // ============================================

                // Tarea creada
                socket.on('task-created', (data) => {
                    console.log('📦 Tarea creada por otro usuario:', data);
                    this._aplicarCambio('task-created', data);
                });

                // Tarea actualizada
                socket.on('task-updated', (data) => {
                    console.log('📦 Tarea actualizada por otro usuario:', data);
                    this._aplicarCambio('task-updated', data);
                });

                // Tarea movida
                socket.on('task-moved', (data) => {
                    console.log('📦 Tarea movida por otro usuario:', data);
                    this._aplicarCambio('task-moved', data);
                });

                // Tarea eliminada
                socket.on('task-deleted', (data) => {
                    console.log('📦 Tarea eliminada por otro usuario:', data);
                    this._aplicarCambio('task-deleted', data);
                });

                // Proyecto actualizado
                socket.on('project-updated', (data) => {
                    console.log('📊 Proyecto actualizado por otro usuario:', data);
                    if (data.projectId == proyectoActualId || data.projectId === proyectoActualId) {
                        this._solicitarSincronizacion();
                    }
                });

                // Sincronización completa
                socket.on('sync-response', (data) => {
                    console.log('📦 Sincronización completa recibida');
                    if (data.projects) {
                        this._sincronizarProyectos(data.projects);
                    }
                });

                // Ping/Pong
                socket.on('pong', (data) => {
                    console.log('🏓 Pong recibido:', data);
                });

                console.log('✅ Socket.IO configurado correctamente');

            } catch(error) {
                console.error('❌ Error en _inicializar:', error);
            }
        },

        unirseAlProyecto: function() {
            const projectId = getProyectoActual();
            if (projectId && socket && socket.connected) {
                socket.emit('join-project', projectId);
                proyectoActualId = projectId;
                console.log(`📁 Unido a sala project-${projectId}`);
            }
        },

        _solicitarSincronizacion: function() {
            if (socket && socket.connected) {
                socket.emit('request-sync', { 
                    clienteId: getClienteId() 
                });
                console.log('🔄 Solicitando sincronización...');
            }
        },

        _sincronizarProyectos: function(proyectosBackend) {
            if (typeof projects !== 'undefined' && Array.isArray(projects)) {
                // Actualizar proyectos locales
                proyectosBackend.forEach(pBackend => {
                    const localIndex = projects.findIndex(p => 
                        p.id === pBackend.id || p._id === pBackend._id || p.name === pBackend.name
                    );
                    if (localIndex !== -1) {
                        projects[localIndex] = pBackend;
                    } else {
                        projects.push(pBackend);
                    }
                });
                localStorage.setItem('projects', JSON.stringify(projects));
                
                // Actualizar interfaz
                if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
                if (typeof renderProjects === 'function') renderProjects();
                
                this._mostrarNotificacion('🔄 Datos sincronizados');
                console.log('✅ Proyectos sincronizados localmente');
            }
        },

        _aplicarCambio: function(evento, data) {
            console.log(`🔄 Aplicando cambio remoto: ${evento}`, data);

            if (typeof projects === 'undefined') return;

            // Buscar el proyecto
            const proyecto = projects.find(p => {
                const idProyecto = p.id || p._id;
                return idProyecto == data.projectId || p.name === data.projectName;
            });

            if (!proyecto) {
                console.warn('⚠️ Proyecto no encontrado para cambio remoto');
                return;
            }

            if (!proyecto.tasks) proyecto.tasks = [];

            switch(evento) {
                case 'task-created':
                    if (data.task) {
                        proyecto.tasks.push(data.task);
                        console.log(`✅ Tarea "${data.task.name || 'Nueva'}" agregada remotamente`);
                    }
                    break;

                case 'task-updated':
                    if (data.taskId && data.task) {
                        const index = proyecto.tasks.findIndex(t => t.id == data.taskId);
                        if (index !== -1) {
                            proyecto.tasks[index] = { ...proyecto.tasks[index], ...data.task };
                            console.log(`✅ Tarea actualizada remotamente`);
                        }
                    }
                    break;

                case 'task-moved':
                    if (data.taskId && data.newStatus) {
                        const index = proyecto.tasks.findIndex(t => t.id == data.taskId);
                        if (index !== -1) {
                            proyecto.tasks[index].status = data.newStatus;
                            proyecto.tasks[index].estado = data.newStatus;
                            console.log(`✅ Tarea movida a "${data.newStatus}" remotamente`);
                        }
                    }
                    break;

                case 'task-deleted':
                    if (data.taskId) {
                        proyecto.tasks = proyecto.tasks.filter(t => t.id != data.taskId);
                        console.log(`✅ Tarea eliminada remotamente`);
                    }
                    break;
            }

            // Guardar localmente
            localStorage.setItem('projects', JSON.stringify(projects));

            // Actualizar interfaz
            if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
            if (typeof renderProjects === 'function') renderProjects();

            // Mostrar notificación
            const usuario = data.userEmail || 'Alguien';
            this._mostrarNotificacion(`🔄 ${usuario} ha realizado un cambio`);
        },

        _mostrarNotificacion: function(mensaje) {
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

            setTimeout(() => {
                notif.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notif.remove(), 300);
            }, 3000);
        },

        // EMITIR EVENTOS
        emitir: function(evento, data) {
            if (!socket || !socket.connected) {
                console.warn('⚠️ Socket no conectado, cambio solo local');
                return;
            }

            const projectId = getProyectoActual();
            const userEmail = getCurrentUser() || 'Usuario';

            const payload = {
                ...data,
                projectId: projectId,
                userEmail: userEmail,
                timestamp: new Date().toISOString()
            };

            console.log(`📤 Emitiendo ${evento}:`, payload);
            socket.emit(evento, payload);
        },

        // INTERCEPTAR FUNCIONES DE TAREAS
        interceptar: function() {
            // Interceptar movimiento de tareas (drag & drop)
            document.addEventListener('task-moved-local', (e) => {
                const data = e.detail;
                if (data) {
                    this.emitir('task-moved', data);
                }
            });

            // Interceptar creación de tareas
            const originalCreateTask = window.crearTarea || window.createTask;
            if (originalCreateTask) {
                window.crearTarea = function(...args) {
                    const result = originalCreateTask.apply(this, args);
                    setTimeout(() => {
                        const tarea = args[0] || { name: 'Nueva tarea' };
                        SocketIO.emitir('task-created', { task: tarea });
                    }, 100);
                    return result;
                };
                console.log('✅ Función crearTarea interceptada');
            }

            // Interceptar eliminación de tareas
            const originalDeleteTask = window.eliminarTarea || window.deleteTask;
            if (originalDeleteTask) {
                window.eliminarTarea = function(taskId, ...args) {
                    const result = originalDeleteTask.apply(this, [taskId, ...args]);
                    SocketIO.emitir('task-deleted', { taskId: taskId });
                    return result;
                };
                console.log('✅ Función eliminarTarea interceptada');
            }

            // Interceptar actualización de tareas
            const originalUpdateTask = window.actualizarTarea || window.updateTask;
            if (originalUpdateTask) {
                window.actualizarTarea = function(taskId, data, ...args) {
                    const result = originalUpdateTask.apply(this, [taskId, data, ...args]);
                    SocketIO.emitir('task-updated', { taskId: taskId, task: data });
                    return result;
                };
                console.log('✅ Función actualizarTarea interceptada');
            }

            console.log('✅ Funciones de tareas interceptadas');
        }
    };

    // ============================================
    // 4. INTERFAZ VISUAL - BOTÓN FLOTANTE
    // ============================================
    
    function createFloatingButton() {
        const existing = document.getElementById('colabFloatBtn');
        if (existing) existing.remove();
        
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
            transition: all 0.3s ease;
            border: 2px solid rgba(255,255,255,0.2);
            user-select: none;
            font-family: Arial, sans-serif;
        `;
        
        btn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            togglePanel();
        };
        
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
        badge.style.display = 'none';
        btn.appendChild(badge);
        
        document.body.appendChild(btn);
        console.log('✅ Botón flotante creado');
    }

    function updateBadge() {
        const badge = document.getElementById('colabBadge');
        if (badge) badge.style.display = 'none';
    }

    // ============================================
    // 5. PANEL DE COLABORACIÓN
    // ============================================
    
    async function togglePanel() {
        const existing = document.getElementById('colabPanel');
        if (existing) {
            existing.remove();
            panelAbierto = false;
            return;
        }
        
        const user = getCurrentUser();
        const misProyectos = await Proyectos.getMisProyectos();
        const token = getAuthToken();
        
        console.log('👤 Usuario:', user);
        console.log('📂 Proyectos del usuario:', misProyectos.length);
        
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
        
        // Opciones de proyectos
        const proyectosOptions = misProyectos.map((p, i) => {
            const nombre = p.name || p.nombre || `Proyecto ${i}`;
            return `<option value="${i}">${nombre}</option>`;
        }).join('');
        
        panel.innerHTML = `
            <div style="padding: 16px 20px; background: #1e293b; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 20px;">👥</span>
                    <span style="font-weight: 600; font-size: 16px;">Colaboración en Tiempo Real</span>
                    <span style="background: #10b981; padding: 2px 8px; border-radius: 12px; font-size: 10px; color: white;">${SocketIO.conectado ? '🟢 Conectado' : '🔴 Desconectado'}</span>
                </div>
                <button onclick="document.getElementById('colabPanel').remove()" style="background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer;">✕</button>
            </div>
            
            <div style="padding: 16px; overflow-y: auto; flex: 1; max-height: 400px;">
                <div style="margin-bottom: 20px;">
                    <div style="color: #f59e0b; font-size: 13px; font-weight: 600; margin-bottom: 10px;">📩 Invitar Colaborador</div>
                    
                    <div style="margin-bottom: 8px;">
                        <select id="invitarProyectoSelect" style="width: 100%; padding: 10px; background: #0f172a; border: 1px solid #334155; border-radius: 8px; color: white; font-size: 13px;">
                            ${proyectosOptions || '<option value="">No tienes proyectos</option>'}
                        </select>
                    </div>
                    
                    <div style="margin-bottom: 8px;">
                        <select id="invitarRolSelect" style="width: 100%; padding: 10px; background: #0f172a; border: 1px solid #334155; border-radius: 8px; color: white; font-size: 13px;">
                            <option value="viewer">👁️ Viewer (Solo lectura)</option>
                            <option value="editor" selected>✏️ Editor (Puede editar)</option>
                            <option value="admin">👑 Admin (Control total)</option>
                        </select>
                    </div>
                    
                    <div style="display: flex; gap: 8px;">
                        <input type="email" id="invitarEmailInput" placeholder="email@ejemplo.com" style="flex: 1; padding: 10px; background: #0f172a; border: 1px solid #334155; border-radius: 8px; color: white; font-size: 13px;">
                        <button onclick="window.enviarInvitacionUI()" style="background: linear-gradient(135deg, #8b5cf6, #6d28d9); color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; white-space: nowrap;">
                            Enviar
                        </button>
                    </div>
                    <div id="invitarMensaje" style="margin-top: 8px; font-size: 12px; text-align: center;"></div>
                </div>
                
                <div style="border-top: 1px solid #334155; padding-top: 16px;">
                    <div style="color: #10b981; font-size: 13px; font-weight: 600; margin-bottom: 10px;">📂 Tus Proyectos</div>
                    ${misProyectos.length === 0 ? `
                        <div style="text-align: center; padding: 20px; color: #64748b; font-size: 13px;">No tienes proyectos</div>
                    ` : misProyectos.slice(0, 5).map((p, i) => {
                        const nombre = p.name || p.nombre || `Proyecto ${i}`;
                        const colaboradores = p.colaboradores?.length || 0;
                        return `
                            <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 12px 16px; margin-bottom: 8px; border-left: 4px solid #10b981;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="font-weight: 600;">${nombre}</div>
                                        <div style="font-size: 11px; color: #94a3b8;">${colaboradores} colaboradores · ${p.tasks?.length || 0} tareas</div>
                                    </div>
                                    <span style="color: #10b981; font-size: 11px;">✅ Activo</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                    ${misProyectos.length > 5 ? `<div style="text-align: center; color: #64748b; font-size: 12px;">+ ${misProyectos.length - 5} más</div>` : ''}
                </div>
                
                <div style="border-top: 1px solid #334155; padding-top: 16px; margin-top: 12px;">
                    <div style="display: flex; justify-content: space-between; font-size: 11px; color: #64748b;">
                        <span>🔌 ${SocketIO.conectado ? 'Conectado en tiempo real' : 'Desconectado'}</span>
                        <span>🔄 <a href="#" onclick="window.sincronizarProyectos()" style="color: #8b5cf6; text-decoration: none;">Sincronizar</a></span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        panelAbierto = true;
        
        // Función para enviar invitación desde UI
        window.enviarInvitacionUI = async function() {
            const select = document.getElementById('invitarProyectoSelect');
            const emailInput = document.getElementById('invitarEmailInput');
            const rolSelect = document.getElementById('invitarRolSelect');
            const mensaje = document.getElementById('invitarMensaje');
            
            const proyectoIndex = select?.value;
            const email = emailInput?.value?.trim();
            const rol = rolSelect?.value || 'editor';
            
            if (!proyectoIndex || proyectoIndex === '') {
                mensaje.innerHTML = '<span style="color: #ef4444;">❌ Selecciona un proyecto</span>';
                return;
            }
            if (!email) {
                mensaje.innerHTML = '<span style="color: #ef4444;">❌ Ingresa un email</span>';
                return;
            }
            if (!email.includes('@')) {
                mensaje.innerHTML = '<span style="color: #ef4444;">❌ Email inválido</span>';
                return;
            }
            
            const proyecto = misProyectos[parseInt(proyectoIndex)];
            if (!proyecto) {
                mensaje.innerHTML = '<span style="color: #ef4444;">❌ Proyecto no encontrado</span>';
                return;
            }
            
            const nombreProyecto = proyecto.name || proyecto.nombre;
            
            mensaje.innerHTML = '<span style="color: #f59e0b;">⏳ Enviando invitación...</span>';
            
            const resultado = await Invitaciones.enviar(
                parseInt(proyectoIndex),
                nombreProyecto,
                email,
                rol
            );
            
            if (resultado) {
                mensaje.innerHTML = `<span style="color: #10b981;">✅ Invitación enviada a ${email}</span>`;
                emailInput.value = '';
                setTimeout(() => mensaje.innerHTML = '', 5000);
            } else {
                mensaje.innerHTML = '<span style="color: #ef4444;">❌ Error al enviar invitación</span>';
            }
        };

        // Función para sincronizar
        window.sincronizarProyectos = async function() {
            const mensaje = document.getElementById('invitarMensaje');
            if (mensaje) {
                mensaje.innerHTML = '<span style="color: #f59e0b;">⏳ Sincronizando...</span>';
            }
            await Proyectos.sincronizar();
            if (typeof renderProjects === 'function') renderProjects();
            if (mensaje) {
                mensaje.innerHTML = '<span style="color: #10b981;">✅ Sincronizado</span>';
                setTimeout(() => mensaje.innerHTML = '', 3000);
            }
        };
    }

    // ============================================
    // 6. INICIALIZACIÓN COMPLETA
    // ============================================
    
    async function init() {
        console.log('🚀 INICIANDO SISTEMA DE COLABORACIÓN COMPLETO...');
        
        // 1. Conectar socket
        SocketIO.conectar();
        
        // 2. Interceptar funciones de tareas
        setTimeout(() => SocketIO.interceptar(), 2000);
        
        // 3. Cargar proyectos desde backend
        await Proyectos.sincronizar();
        
        // 4. Crear botón flotante
        createFloatingButton();
        
        // 5. Sincronización periódica
        setInterval(async function() {
            await Proyectos.sincronizar();
        }, 30000);
        
        // 6. Reconectar socket si se pierde
        setInterval(function() {
            if (socket && !socket.connected) {
                console.log('🔄 Intentando reconectar socket...');
                SocketIO.conectar();
            }
        }, 5000);
        
        console.log('✅ SISTEMA DE COLABORACIÓN COMPLETO LISTO');
        console.log('📌 Busca el botón 👥 en la esquina inferior izquierda');
        console.log('📌 Los cambios se sincronizan en tiempo real');
        console.log('📌 Los colaboradores reciben invitaciones por correo');
    }

    // ============================================
    // 7. ESTILOS PARA NOTIFICACIONES
    // ============================================
    
    if (!document.getElementById('colabStyles')) {
        const style = document.createElement('style');
        style.id = 'colabStyles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================
    // 8. PROCESAR INVITACIÓN DESDE URL
    // ============================================
    
    async function procesarInvitacionDesdeURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token') || urlParams.get('invitation');
        
        if (!token) return;
        
        console.log('📨 Procesando invitación desde URL...');
        
        try {
            // Validar invitación
            const validacion = await Invitaciones.validar(token);
            
            if (!validacion || !validacion.success) {
                console.error('❌ Invitación inválida:', validacion?.error);
                mostrarMensajeInvitacion('❌ Esta invitación no es válida o ya expiró', 'error');
                return;
            }
            
            console.log('✅ Invitación válida:', validacion);
            
            // Mostrar modal de aceptación
            mostrarModalAceptacion(validacion, token);
            
        } catch(error) {
            console.error('❌ Error procesando invitación:', error);
            mostrarMensajeInvitacion('❌ Error al procesar la invitación', 'error');
        }
    }

    function mostrarModalAceptacion(validacion, token) {
        const modal = document.createElement('div');
        modal.id = 'invitacionModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000001;
            animation: fadeIn 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="background: #0f172a; border-radius: 20px; padding: 40px; max-width: 500px; width: 90%; border: 2px solid #8b5cf6; box-shadow: 0 20px 60px rgba(0,0,0,0.9);">
                <div style="text-align: center; margin-bottom: 24px;">
                    <div style="font-size: 48px; margin-bottom: 12px;">📨</div>
                    <h2 style="color: white; margin: 0; font-size: 24px;">Has sido invitado</h2>
                    <p style="color: #94a3b8; margin: 8px 0 0;">para colaborar en el proyecto</p>
                </div>
                
                <div style="background: #1e293b; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                    <div style="color: #8b5cf6; font-size: 14px; font-weight: 600;">📌 Proyecto</div>
                    <div style="color: white; font-size: 20px; font-weight: 600; margin-top: 4px;">${validacion.proyecto || 'Proyecto'}</div>
                    <div style="color: #94a3b8; font-size: 13px; margin-top: 8px;">
                        Rol: <span style="color: white;">${validacion.rol || 'viewer'}</span>
                    </div>
                    <div style="color: #94a3b8; font-size: 13px;">
                        Invitado: <span style="color: white;">${validacion.email || 'Usuario'}</span>
                    </div>
                </div>
                
                <div style="display: flex; gap: 12px;">
                    <button onclick="window.aceptarInvitacionURL('${token}')" style="flex: 1; background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; padding: 14px; border-radius: 10px; font-size: 16px; font-weight: 600; cursor: pointer;">
                        ✅ Aceptar invitación
                    </button>
                    <button onclick="document.getElementById('invitacionModal').remove()" style="background: #1e293b; color: #94a3b8; border: 1px solid #334155; padding: 14px 24px; border-radius: 10px; font-size: 16px; cursor: pointer;">
                        Cancelar
                    </button>
                </div>
                
                <div id="invitacionMensaje" style="margin-top: 16px; text-align: center; font-size: 14px;"></div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        window.aceptarInvitacionURL = async function(token) {
            const mensaje = document.getElementById('invitacionMensaje');
            if (mensaje) {
                mensaje.innerHTML = '<span style="color: #f59e0b;">⏳ Aceptando invitación...</span>';
            }
            
            try {
                const resultado = await Invitaciones.aceptar(token);
                
                if (resultado && resultado.success) {
                    if (mensaje) {
                        mensaje.innerHTML = '<span style="color: #10b981;">✅ ¡Invitación aceptada! Redirigiendo...</span>';
                    }
                    
                    setTimeout(() => {
                        document.getElementById('invitacionModal')?.remove();
                        // Recargar la página para mostrar el proyecto
                        window.location.href = window.location.pathname;
                    }, 2000);
                } else {
                    if (mensaje) {
                        mensaje.innerHTML = `<span style="color: #ef4444;">❌ Error: ${resultado?.error || 'No se pudo aceptar'}</span>`;
                    }
                }
            } catch(error) {
                if (mensaje) {
                    mensaje.innerHTML = `<span style="color: #ef4444;">❌ Error: ${error.message}</span>`;
                }
            }
        };
    }

    function mostrarMensajeInvitacion(mensaje, tipo) {
        const existing = document.getElementById('invitacionMensajeToast');
        if (existing) existing.remove();
        
        const toast = document.createElement('div');
        toast.id = 'invitacionMensajeToast';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${tipo === 'error' ? '#ef4444' : '#10b981'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            z-index: 1000002;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        toast.textContent = mensaje;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }

    // ============================================
    // 9. EJECUTAR
    // ============================================
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(init, 100);
            setTimeout(procesarInvitacionDesdeURL, 500);
        });
    } else {
        setTimeout(init, 100);
        setTimeout(procesarInvitacionDesdeURL, 500);
    }

    // ============================================
    // 10. EXPORTAR FUNCIONES GLOBALES
    // ============================================
    
    window.Colaboracion = {
        proyectos: Proyectos,
        invitaciones: Invitaciones,
        socket: SocketIO,
        sincronizar: Proyectos.sincronizar,
        emitir: SocketIO.emitir.bind(SocketIO)
    };

    console.log('✅ Sistema de colaboración completo cargado');
    console.log('📌 API:', API_URL);
    console.log('📌 Socket:', SOCKET_URL);
    console.log('📌 Usuario:', getCurrentUser());

})();