// ============================================================
// 🚀 SISTEMA DE COLABORACIÓN - VERSIÓN BACKEND
// ============================================================
// USA LOS ENDPOINTS DE TU SERVIDOR EN RENDER

(function() {
    'use strict';
    
    console.log('🔥 SISTEMA DE COLABORACIÓN - VERSIÓN BACKEND');
    
    // ============================================
    // CONFIGURACIÓN
    // ============================================
    const API_URL = 'https://mi-sistema-proyectos-backend-4.onrender.com/api';
    const FRONTEND_URL = 'https://admonproject.netlify.app';
    
    // ============================================
    // OBTENER TOKEN DE AUTENTICACIÓN
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
        } catch(e) {}
        return null;
    }
    
    // ============================================
    // HEADERS PARA API
    // ============================================
    function getHeaders() {
        const token = getAuthToken();
        return {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        };
    }
    
    // ============================================
    // NÚCLEO DEL SISTEMA - CON BACKEND
    // ============================================
    const Core = {
        // OBTENER PROYECTOS DEL USUARIO (DESDE BACKEND)
        getMyProjects: async function() {
            const token = getAuthToken();
            if (!token) {
                console.log('⏳ No hay token de autenticación');
                return [];
            }
            
            try {
                const response = await fetch(`${API_URL}/user/projects`, {
                    headers: getHeaders()
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                
                const data = await response.json();
                console.log('📂 Proyectos del usuario:', data.allProjects?.length || 0);
                return data.allProjects || [];
            } catch(error) {
                console.error('❌ Error obteniendo proyectos:', error);
                return [];
            }
        },
        
        // ENVIAR INVITACIÓN (USA BACKEND)
        sendInvitation: async function(proyectoIndex, proyectoNombre, email, rol = 'viewer') {
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
                    
                    // Enviar por correo usando EmailJS
                    if (typeof emailjs !== 'undefined') {
                        emailjs.send(
                            'service_kccmxz7',
                            'template_we2gzml',
                            {
                                to_email: email,
                                project_name: proyectoNombre,
                                invite_link: data.url,
                                reply_to: getCurrentUser()
                            }
                        ).then(() => {
                            console.log('📧 Correo de invitación enviado');
                        }).catch((error) => {
                            console.error('❌ Error enviando correo:', error);
                        });
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
        
        // ACEPTAR INVITACIÓN (USA BACKEND)
        acceptInvitation: async function(tokenInvitacion) {
            try {
                const response = await fetch(`${API_URL}/invitations/accept`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: tokenInvitacion })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    console.log('✅ Invitación aceptada:', data);
                    alert(`✅ ¡Bienvenido al proyecto "${data.proyectoNombre}"!`);
                    
                    // Recargar proyectos desde backend
                    await this.syncProjectsFromBackend();
                    
                    if (typeof renderProjects === 'function') renderProjects();
                    if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
                    
                    return true;
                } else {
                    alert(`❌ Error: ${data.error || 'No se pudo aceptar la invitación'}`);
                    return false;
                }
            } catch(error) {
                console.error('❌ Error aceptando invitación:', error);
                alert('❌ Error al aceptar la invitación');
                return false;
            }
        },
        
        // SINCRONIZAR PROYECTOS DESDE BACKEND
        syncProjectsFromBackend: async function() {
            const token = getAuthToken();
            if (!token) return;
            
            try {
                const response = await fetch(`${API_URL}/user/projects`, {
                    headers: getHeaders()
                });
                
                if (!response.ok) return;
                
                const data = await response.json();
                
                if (data.allProjects && Array.isArray(data.allProjects)) {
                    // ACTUALIZAR EL ARRAY GLOBAL projects
                    // Usar los proyectos del backend
                    const proyectosBackend = data.allProjects;
                    
                    // Buscar el documento del cliente en localStorage
                    const clienteId = localStorage.getItem('clienteId');
                    
                    // Guardar en localStorage para compatibilidad
                    const docExistente = JSON.parse(localStorage.getItem('projects_doc') || '{}');
                    docExistente.projects = proyectosBackend;
                    docExistente.clienteId = clienteId;
                    localStorage.setItem('projects_doc', JSON.stringify(docExistente));
                    
                    // ACTUALIZAR EL ARRAY GLOBAL projects
                    if (typeof projects !== 'undefined') {
                        projects.length = 0;
                        projects.push(...proyectosBackend);
                        console.log(`✅ ${projects.length} proyectos sincronizados desde backend`);
                    }
                    
                    return proyectosBackend;
                }
            } catch(error) {
                console.error('❌ Error sincronizando desde backend:', error);
            }
        },
        
        // OBTENER INVITACIONES DEL USUARIO (DESDE BACKEND)
        getMyInvitations: async function() {
            // Las invitaciones se manejan por token en la URL
            // Esta función es para el panel de invitaciones pendientes
            return [];
        }
    };
    
    // ============================================
    // INTERFAZ VISUAL - BOTÓN FLOTANTE
    // ============================================
    
    let panelAbierto = false;
    
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
    }
    
    function updateBadge() {
        // Las invitaciones se manejan por URL, no por badge
        const badge = document.getElementById('colabBadge');
        if (badge) badge.style.display = 'none';
    }
    
    // ============================================
    // PANEL DE COLABORACIÓN
    // ============================================
    
    async function togglePanel() {
        const existing = document.getElementById('colabPanel');
        if (existing) {
            existing.remove();
            panelAbierto = false;
            return;
        }
        
        const user = getCurrentUser();
        const misProyectos = await Core.getMyProjects();
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
        const proyectosOptions = misProyectos.map((p, i) => 
            `<option value="${i}">${p.name || p.nombre}</option>`
        ).join('');
        
        panel.innerHTML = `
            <div style="padding: 16px 20px; background: #1e293b; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 20px;">👥</span>
                    <span style="font-weight: 600; font-size: 16px;">Colaboración</span>
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
                            <option value="editor">✏️ Editor (Puede editar)</option>
                            <option value="admin">👑 Admin (Control total)</option>
                        </select>
                    </div>
                    
                    <div style="display: flex; gap: 8px;">
                        <input type="email" id="invitarEmailInput" placeholder="email@ejemplo.com" style="flex: 1; padding: 10px; background: #0f172a; border: 1px solid #334155; border-radius: 8px; color: white; font-size: 13px;">
                        <button onclick="enviarInvitacionBackend()" style="background: linear-gradient(135deg, #8b5cf6, #6d28d9); color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600;">
                            Enviar
                        </button>
                    </div>
                    <div id="invitarMensaje" style="margin-top: 8px; font-size: 12px; text-align: center;"></div>
                </div>
                
                <div style="border-top: 1px solid #334155; padding-top: 16px;">
                    <div style="color: #10b981; font-size: 13px; font-weight: 600; margin-bottom: 10px;">📂 Tus Proyectos</div>
                    ${misProyectos.length === 0 ? `
                        <div style="text-align: center; padding: 20px; color: #64748b; font-size: 13px;">No tienes proyectos</div>
                    ` : misProyectos.map((p, i) => `
                        <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 12px 16px; margin-bottom: 8px; border-left: 4px solid #10b981;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600;">${p.name || p.nombre}</div>
                                    <div style="font-size: 11px; color: #94a3b8;">${p.colaboradores?.length || 0} colaboradores</div>
                                </div>
                                <span style="color: #10b981; font-size: 11px;">✅ Activo</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        panelAbierto = true;
        
        // Función para enviar invitación usando backend
        window.enviarInvitacionBackend = async function() {
            const select = document.getElementById('invitarProyectoSelect');
            const emailInput = document.getElementById('invitarEmailInput');
            const rolSelect = document.getElementById('invitarRolSelect');
            const mensaje = document.getElementById('invitarMensaje');
            
            const proyectoIndex = select?.value;
            const email = emailInput?.value?.trim();
            const rol = rolSelect?.value || 'viewer';
            
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
            
            mensaje.innerHTML = '<span style="color: #f59e0b;">⏳ Enviando invitación...</span>';
            
            const resultado = await Core.sendInvitation(
                parseInt(proyectoIndex),
                proyecto.name || proyecto.nombre,
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
    }
    
    // ============================================
    // INICIALIZACIÓN
    // ============================================
    
    async function init() {
        console.log('🚀 Inicializando sistema de colaboración con BACKEND...');
        
        // Sincronizar proyectos desde backend
        await Core.syncProjectsFromBackend();
        
        // Crear botón flotante
        createFloatingButton();
        
        // Sincronización periódica
        setInterval(async function() {
            await Core.syncProjectsFromBackend();
        }, 30000);
        
        console.log('✅ SISTEMA DE COLABORACIÓN CON BACKEND LISTO');
        console.log('📌 Busca el botón 👥 en la esquina inferior izquierda');
        console.log('📌 Las invitaciones se guardan en MongoDB');
        console.log('📌 Los colaboradores aceptan desde el enlace que reciben por correo');
    }
    
    // ============================================
    // EJECUTAR
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100);
    }
    
    // ============================================
    // EXPORTAR FUNCIONES PARA USO GLOBAL
    // ============================================
    window.ColaboracionBackend = Core;
    
    console.log('✅ Sistema de colaboración con backend cargado');
    console.log('📌 Usa ColaboracionBackend.sendInvitation(index, nombre, email, rol)');
    
})();


// ============================================================
// 🔥 SINCRONIZACIÓN EN TIEMPO REAL - SOCKET.IO
// ============================================================

(function sincronizacionTiempoReal() {

    console.log('🔥 INICIANDO SINCRONIZACIÓN EN TIEMPO REAL...');

    // ============================================
    // CONFIGURACIÓN SOCKET.IO
    // ============================================
    const SOCKET_URL = 'https://mi-sistema-proyectos-backend-4.onrender.com';
    let socket = null;
    let proyectoActual = null;
    let clienteId = localStorage.getItem('clienteId');

    // ============================================
    // OBTENER TOKEN
    // ============================================
    function getAuthToken() {
        return localStorage.getItem('authToken') || 
               localStorage.getItem('token') || 
               null;
    }

    // ============================================
    // CONECTAR A SOCKET.IO
    // ============================================
    function conectarSocket() {
        const token = getAuthToken();
        if (!token) {
            console.log('⏳ Esperando token para conectar socket...');
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
                script.onload = function() {
                    inicializarSocket(token);
                };
                document.head.appendChild(script);
            } else {
                inicializarSocket(token);
            }
        } catch (error) {
            console.error('❌ Error conectando socket:', error);
        }
    }

    function inicializarSocket(token) {
        try {
            socket = io(SOCKET_URL, {
                auth: { token: token },
                transports: ['websocket', 'polling'],
                reconnection: true,
                reconnectionAttempts: 10,
                reconnectionDelay: 1000
            });

            // ============================================
            // EVENTOS DE SOCKET
            // ============================================

            socket.on('connect', function() {
                console.log('✅ Socket conectado:', socket.id);
                
                // Registrar usuario
                socket.emit('register-user', { 
                    userId: localStorage.getItem('clienteId') || clienteId 
                });

                // Unirse a la sala del proyecto actual
                unirseAlProyectoActual();
            });

            socket.on('disconnect', function() {
                console.log('🔌 Socket desconectado');
            });

            socket.on('reconnect', function() {
                console.log('🔄 Socket reconectado');
                unirseAlProyectoActual();
            });

            socket.on('connect_error', function(error) {
                console.error('❌ Error de conexión socket:', error);
            });

            // ============================================
            // RECIBIR EVENTOS DE TAREAS
            // ============================================

            // Tarea creada por otro usuario
            socket.on('task-created', function(data) {
                console.log('📦 Tarea creada por otro usuario:', data);
                aplicarCambioRemoto('task-created', data);
            });

            // Tarea actualizada por otro usuario
            socket.on('task-updated', function(data) {
                console.log('📦 Tarea actualizada por otro usuario:', data);
                aplicarCambioRemoto('task-updated', data);
            });

            // Tarea movida por otro usuario
            socket.on('task-moved', function(data) {
                console.log('📦 Tarea movida por otro usuario:', data);
                aplicarCambioRemoto('task-moved', data);
            });

            // Tarea eliminada por otro usuario
            socket.on('task-deleted', function(data) {
                console.log('📦 Tarea eliminada por otro usuario:', data);
                aplicarCambioRemoto('task-deleted', data);
            });

            // Proyecto actualizado
            socket.on('project-updated', function(data) {
                console.log('📊 Proyecto actualizado por otro usuario:', data);
                if (data.projectId === proyectoActual) {
                    sincronizarProyectoDesdeBackend();
                }
            });

            // Sincronización completa
            socket.on('sync-response', function(data) {
                console.log('📦 Sincronización completa recibida');
                if (data.projects) {
                    sincronizarProyectosLocales(data.projects);
                }
            });

        } catch (error) {
            console.error('❌ Error inicializando socket:', error);
        }
    }

    // ============================================
    // UNIRSE AL PROYECTO ACTUAL
    // ============================================
    function unirseAlProyectoActual() {
        // Obtener proyecto actual del menú o de la URL
        const proyectoId = obtenerProyectoActual();
        if (proyectoId && socket && socket.connected) {
            socket.emit('join-project', proyectoId);
            proyectoActual = proyectoId;
            console.log(`📁 Unido a sala project-${proyectoId}`);
        }
    }

    function obtenerProyectoActual() {
        // Intentar obtener de múltiples fuentes
        try {
            // De la URL
            const urlParams = new URLSearchParams(window.location.search);
            const projectId = urlParams.get('projectId') || urlParams.get('proyectoId');
            if (projectId) return projectId;

            // Del localStorage
            const currentProject = localStorage.getItem('currentProjectId');
            if (currentProject) return currentProject;

            // Del objeto global projects
            if (typeof projects !== 'undefined' && projects.length > 0) {
                const currentIndex = parseInt(localStorage.getItem('currentProjectIndex') || '0');
                if (projects[currentIndex] && projects[currentIndex].id) {
                    return projects[currentIndex].id;
                }
                // Si no tiene id, usar el índice
                return currentIndex;
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
        console.log(`🔄 Aplicando cambio remoto: ${evento}`, data);

        // Buscar el proyecto en el array global
        if (typeof projects === 'undefined') return;

        const proyecto = projects.find(p => {
            const idProyecto = p.id || p._id || p.id_proyecto;
            return idProyecto == data.projectId || 
                   p.name === data.projectName || 
                   p.id === data.projectId;
        });

        if (!proyecto) {
            console.warn('⚠️ Proyecto no encontrado para cambio remoto');
            return;
        }

        switch(evento) {
            case 'task-created':
                if (data.task && proyecto.tasks) {
                    proyecto.tasks.push(data.task);
                    console.log(`✅ Tarea "${data.task.name}" agregada remotamente`);
                }
                break;

            case 'task-updated':
                if (data.taskId && proyecto.tasks) {
                    const index = proyecto.tasks.findIndex(t => 
                        t.id == data.taskId || t.id === data.taskId
                    );
                    if (index !== -1 && data.task) {
                        proyecto.tasks[index] = { ...proyecto.tasks[index], ...data.task };
                        console.log(`✅ Tarea "${data.task.name}" actualizada remotamente`);
                    }
                }
                break;

            case 'task-moved':
                if (data.taskId && data.newStatus && proyecto.tasks) {
                    const index = proyecto.tasks.findIndex(t => 
                        t.id == data.taskId || t.id === data.taskId
                    );
                    if (index !== -1) {
                        proyecto.tasks[index].status = data.newStatus;
                        proyecto.tasks[index].estado = data.newStatus;
                        console.log(`✅ Tarea movida a "${data.newStatus}" remotamente`);
                    }
                }
                break;

            case 'task-deleted':
                if (data.taskId && proyecto.tasks) {
                    proyecto.tasks = proyecto.tasks.filter(t => 
                        t.id != data.taskId && t.id !== data.taskId
                    );
                    console.log(`✅ Tarea eliminada remotamente`);
                }
                break;
        }

        // Guardar cambios localmente
        localStorage.setItem('projects', JSON.stringify(projects));

        // Actualizar interfaz
        if (typeof renderKanbanTasks === 'function') {
            renderKanbanTasks();
        }
        if (typeof renderProjects === 'function') {
            renderProjects();
        }

        // Mostrar notificación
        mostrarNotificacion(`🔄 ${data.userEmail || 'Alguien'} ha realizado un cambio`);
    }

    // ============================================
    // EMITIR EVENTOS DE TAREAS
    // ============================================
    function emitirCambioTarea(evento, data) {
        if (!socket || !socket.connected) {
            console.warn('⚠️ Socket no conectado, guardando localmente');
            return;
        }

        const proyectoId = obtenerProyectoActual();
        const userEmail = localStorage.getItem('userEmail') || 'Usuario';

        const payload = {
            ...data,
            projectId: proyectoId,
            userEmail: userEmail,
            timestamp: new Date().toISOString()
        };

        console.log(`📤 Emitiendo ${evento}:`, payload);
        socket.emit(evento, payload);
    }

    // ============================================
    // SINCRONIZAR PROYECTO DESDE BACKEND
    // ============================================
    async function sincronizarProyectoDesdeBackend() {
        try {
            const token = getAuthToken();
            if (!token) return;

            const response = await fetch('https://mi-sistema-proyectos-backend-4.onrender.com/api/user/projects', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) return;

            const data = await response.json();
            if (data.allProjects) {
                sincronizarProyectosLocales(data.allProjects);
            }
        } catch(error) {
            console.error('❌ Error sincronizando desde backend:', error);
        }
    }

    function sincronizarProyectosLocales(proyectosBackend) {
        if (typeof projects !== 'undefined' && Array.isArray(projects)) {
            // Actualizar proyectos locales
            proyectosBackend.forEach(pBackend => {
                const localIndex = projects.findIndex(p => 
                    p.id === pBackend.id || p.name === pBackend.name
                );
                if (localIndex !== -1) {
                    projects[localIndex] = pBackend;
                } else {
                    projects.push(pBackend);
                }
            });
            localStorage.setItem('projects', JSON.stringify(projects));
            
            if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
            if (typeof renderProjects === 'function') renderProjects();
            console.log('✅ Proyectos sincronizados localmente');
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

        setTimeout(() => {
            notif.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }

    // ============================================
    // INTERCEPTAR FUNCIONES DE TAREAS PARA EMITIR
    // ============================================
    function interceptarFuncionesTareas() {
        // Guardar referencia a funciones originales
        const originalRenderKanban = window.renderKanbanTasks;

        // Interceptar movimientos de tareas (drag & drop)
        if (typeof document !== 'undefined') {
            document.addEventListener('task-moved-local', function(e) {
                const data = e.detail;
                if (data) {
                    emitirCambioTarea('task-moved', data);
                }
            });
        }

        // Interceptar creación de tareas
        const originalCreateTask = window.crearTarea || window.createTask;
        if (originalCreateTask) {
            window.crearTarea = function(...args) {
                const result = originalCreateTask.apply(this, args);
                // Emitir evento después de crear
                setTimeout(() => {
                    const proyectoId = obtenerProyectoActual();
                    const tarea = args[0] || { name: 'Nueva tarea' };
                    emitirCambioTarea('task-created', {
                        task: tarea,
                        projectId: proyectoId
                    });
                }, 100);
                return result;
            };
        }

        // Interceptar eliminación de tareas
        const originalDeleteTask = window.eliminarTarea || window.deleteTask;
        if (originalDeleteTask) {
            window.eliminarTarea = function(taskId, ...args) {
                const result = originalDeleteTask.apply(this, [taskId, ...args]);
                emitirCambioTarea('task-deleted', { taskId: taskId });
                return result;
            };
        }

        console.log('✅ Funciones de tareas interceptadas para emitir eventos');
    }

    // ============================================
    // INICIALIZAR
    // ============================================
    function init() {
        // Conectar socket
        setTimeout(conectarSocket, 1000);

        // Interceptar funciones de tareas
        setTimeout(interceptarFuncionesTareas, 2000);

        // Sincronización periódica
        setInterval(async function() {
            await sincronizarProyectoDesdeBackend();
        }, 10000);

        // Reconectar si se pierde la conexión
        setInterval(function() {
            if (socket && !socket.connected) {
                console.log('🔄 Intentando reconectar socket...');
                conectarSocket();
            }
        }, 5000);

        console.log('✅ Sincronización en tiempo real activada');
        console.log('📌 Los cambios de tareas se sincronizarán automáticamente');
    }

    // ============================================
    // EJECUTAR
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 500);
    }

    // ============================================
    // EXPORTAR FUNCIONES
    // ============================================
    window.SincronizacionTiempoReal = {
        conectar: conectarSocket,
        emitirCambio: emitirCambioTarea,
        sincronizar: sincronizarProyectoDesdeBackend,
        unirseAlProyecto: unirseAlProyectoActual
    };

})();
