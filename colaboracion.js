// ============================================================
// 🚀 SISTEMA DE COLABORACIÓN - VERSIÓN FINAL CORREGIDA
// ============================================================

(function() {
    'use strict';
    
    console.log('🔥 SISTEMA DE COLABORACIÓN - VERSIÓN FINAL CORREGIDA');
    
    const API_URL = 'https://mi-sistema-proyectos-backend-4.onrender.com/api';
    const STORAGE_KEY = 'proyectos_colaborativos_aceptados';
    
    let invitaciones = [];
    let misProyectos = [];
    let proyectosColaborativos = [];
    let proyectosAceptadosLocal = [];
    let panelAbierto = false;
    let socket = null;
    
    // ✅ EXPONER ESTAS VARIABLES GLOBALMENTE
    window.socketConectado = false;
    window._interceptoresActivos = false;
    window._socket = null;
    
    // ============================================
    // CONFIGURACIÓN EMAILJS
    // ============================================
    const EMAILJS_CONFIG = {
        PUBLIC_KEY: 'RKPQ7q1n2sDJdBqcG',
        SERVICE_ID: 'service_kccmxz7',
        TEMPLATE_ID: 'template_we2gzml'
    };
    
    if (typeof emailjs === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.onload = function() {
            emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
            console.log('✅ EmailJS cargado');
        };
        document.head.appendChild(script);
    } else {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
    
    // ============================================
    // FUNCIÓN DE LOG PARA DEBUG
    // ============================================
    function debugLog(...args) {
        console.log('🔵 [COLLAB]', ...args);
    }
    
    function debugWarn(...args) {
        console.warn('🟡 [COLLAB]', ...args);
    }
    
    function debugError(...args) {
        console.error('🔴 [COLLAB]', ...args);
    }
    
    // ============================================
    // FUNCIONES DE UTILIDAD
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
                try {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    if (payload.email) return payload.email;
                    if (payload.sub) return payload.sub;
                } catch(e) {}
            }
            
            const email = localStorage.getItem('userEmail');
            if (email) return email;
            
            return null;
        } catch(e) {
            return null;
        }
    }
    
    function getHeaders() {
        const token = getAuthToken();
        return {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json'
        };
    }
    
    // ============================================
    // WEB SOCKET - CORREGIDO
    // ============================================
    window.initWebSocket = function() {
        debugLog('🔄 Iniciando WebSocket...');
        
        if (socket) {
            debugLog('🔄 Desconectando socket anterior...');
            socket.disconnect();
            socket = null;
        }
        
        const token = getAuthToken();
        if (!token) {
            debugWarn('⏳ No hay token, WebSocket no iniciado');
            window.socketConectado = false;
            return;
        }
        
        try {
            // Verificar que io esté definido
            if (typeof io === 'undefined') {
                debugError('❌ io no está definido. Cargando Socket.IO...');
                // Cargar Socket.IO si no está disponible
                const script = document.createElement('script');
                script.src = 'https://cdn.socket.io/4.7.2/socket.io.min.js';
                script.onload = function() {
                    debugLog('✅ Socket.IO cargado, reintentando...');
                    window.initWebSocket();
                };
                document.head.appendChild(script);
                return;
            }
            
            socket = io('https://mi-sistema-proyectos-backend-4.onrender.com', {
                transports: ['websocket', 'polling'],
                auth: { token: token },
                reconnection: true,
                reconnectionAttempts: 10,
                reconnectionDelay: 1000,
                timeout: 10000
            });
            
            window._socket = socket;
            
            socket.on('connect', function() {
                debugLog('✅ WebSocket conectado (colaboración)');
                window.socketConectado = true;
                socket.emit('join-collab-room', { 
                    userId: getCurrentUser() || 'Usuario' 
                });
                mostrarEstadoWebSocket(true);
                debugLog('📊 Estado actualizado: socketConectado = true');
            });
            
            socket.on('collab-update', function(data) {
                debugLog('📡 Evento colaborativo recibido:', data);
                
                // Si es el mismo usuario, ignorar
                const currentUser = getCurrentUser();
                if (data.userId === currentUser) {
                    debugLog('ℹ️ Evento de mí mismo, ignorando');
                    return;
                }
                
                procesarEventoColaborativo(data);
            });
            
            socket.on('disconnect', function() {
                debugLog('🔌 WebSocket desconectado (colaboración)');
                window.socketConectado = false;
                mostrarEstadoWebSocket(false);
            });
            
            socket.on('connect_error', function(error) {
                debugError('❌ Error WebSocket:', error.message);
                window.socketConectado = false;
                mostrarEstadoWebSocket(false);
            });
            
            socket.on('reconnect', function(attempt) {
                debugLog(`🔄 Reconectado después de ${attempt} intentos`);
                window.socketConectado = true;
                mostrarEstadoWebSocket(true);
            });
            
        } catch (error) {
            debugError('❌ Error iniciando WebSocket:', error);
            window.socketConectado = false;
        }
    };
    
    // ============================================
    // MOSTRAR ESTADO WEBSOCKET EN UI
    // ============================================
    function mostrarEstadoWebSocket(conectado) {
        const indicator = document.getElementById('wsStatusIndicator') || (() => {
            const el = document.createElement('div');
            el.id = 'wsStatusIndicator';
            el.style.cssText = `
                position: fixed;
                bottom: 90px;
                left: 20px;
                padding: 4px 12px;
                border-radius: 12px;
                font-size: 10px;
                font-family: monospace;
                z-index: 999997;
                color: white;
                background: #333;
                border: 1px solid #555;
                pointer-events: none;
            `;
            document.body.appendChild(el);
            return el;
        })();
        
        indicator.textContent = conectado ? '🔗 WS Conectado' : '🔌 WS Desconectado';
        indicator.style.background = conectado ? '#10b981' : '#ef4444';
        indicator.style.border = conectado ? '1px solid #34d399' : '1px solid #f87171';
    }
    
    // ============================================
    // PROCESAR EVENTO COLABORATIVO
    // ============================================
    function procesarEventoColaborativo(data) {
        debugLog('🔄 Procesando evento:', data.action);
        
        // Si es una solicitud de sincronización
        if (data.action === 'sync-request') {
            debugLog('🔄 Solicitud de sincronización de', data.userId);
            const project = window.projects[currentProjectIndex];
            if (project && socket && window.socketConectado) {
                socket.emit('collab-update', {
                    projectId: project.id,
                    task: null,
                    action: 'sync-response',
                    userId: getCurrentUser(),
                    projectData: project,
                    timestamp: new Date().toISOString()
                });
                debugLog('📤 Respuesta de sincronización enviada');
            }
            return;
        }
        
        // Si es una respuesta de sincronización
        if (data.action === 'sync-response' && data.projectData) {
            debugLog('🔄 Recibiendo datos de sincronización de', data.userId);
            const projectIndex = window.projects.findIndex(p => p.id === data.projectData.id);
            if (projectIndex !== -1) {
                window.projects[projectIndex] = data.projectData;
                localStorage.setItem('projects', JSON.stringify(window.projects));
                if (typeof renderKanbanTasks === 'function') {
                    renderKanbanTasks();
                }
                if (typeof renderProjects === 'function') {
                    renderProjects();
                }
                debugLog('✅ Datos sincronizados desde', data.userId);
                if (typeof showNotification === 'function') {
                    showNotification(`✅ Proyecto sincronizado con ${data.userId}`);
                }
            }
            return;
        }
        
        // Sincronizar proyectos al menú
        if (typeof window.sincronizarProyectosAlMenu === 'function') {
            window.sincronizarProyectosAlMenu();
        }
        
        // Si es una acción de tarea, actualizar el board
        if (data.task && data.action) {
            debugLog(`🔄 Procesando acción ${data.action} para tarea:`, data.task.name || data.task.id);
            
            // Buscar el proyecto en el array
            let projectIndex = window.projects.findIndex(p => p.id === data.projectId);
            if (projectIndex === -1) {
                projectIndex = window.projects.findIndex(p => p.name === data.projectName);
            }
            
            if (projectIndex !== -1) {
                const project = window.projects[projectIndex];
                debugLog(`📂 Proyecto encontrado: ${project.name} (index: ${projectIndex})`);
                
                // Actualizar la tarea según la acción
                switch (data.action) {
                    case 'created':
                        const existe = project.tasks.some(t => t.id === data.task.id);
                        if (!existe) {
                            project.tasks.push(data.task);
                            debugLog('✅ Tarea creada:', data.task.name);
                        } else {
                            debugWarn('⚠️ Tarea ya existe, ignorando creación');
                        }
                        break;
                    case 'updated':
                        const updateIndex = project.tasks.findIndex(t => t.id === data.task.id);
                        if (updateIndex !== -1) {
                            project.tasks[updateIndex] = data.task;
                            debugLog('✅ Tarea actualizada:', data.task.name);
                        } else {
                            debugWarn('⚠️ Tarea no encontrada para actualizar');
                        }
                        break;
                    case 'moved':
                        const moveIndex = project.tasks.findIndex(t => t.id === data.task.id);
                        if (moveIndex !== -1) {
                            project.tasks[moveIndex] = data.task;
                            debugLog('✅ Tarea movida:', data.task.name);
                        } else {
                            debugWarn('⚠️ Tarea no encontrada para mover');
                        }
                        break;
                    case 'deleted':
                        const deleteIndex = project.tasks.findIndex(t => t.id === data.task.id);
                        if (deleteIndex !== -1) {
                            project.tasks.splice(deleteIndex, 1);
                            debugLog('✅ Tarea eliminada:', data.task.name);
                        } else {
                            debugWarn('⚠️ Tarea no encontrada para eliminar');
                        }
                        break;
                    default:
                        debugWarn('⚠️ Acción desconocida:', data.action);
                }
                
                // Guardar cambios
                localStorage.setItem('projects', JSON.stringify(window.projects));
                
                // Refrescar vistas
                if (typeof renderKanbanTasks === 'function') {
                    renderKanbanTasks();
                }
                if (typeof renderProjects === 'function') {
                    renderProjects();
                }
                if (typeof updateProjectProgress === 'function') {
                    updateProjectProgress();
                }
                
                debugLog(`✅ Tarea ${data.action} sincronizada:`, data.task.name);
            } else {
                debugWarn('⚠️ Proyecto no encontrado para:', data.projectId || data.projectName);
            }
        }
        
        // Mostrar notificación
        if (typeof showNotification === 'function') {
            const acciones = {
                'created': 'creó',
                'updated': 'actualizó',
                'moved': 'movió',
                'deleted': 'eliminó'
            };
            const accionTexto = acciones[data.action] || data.action;
            const nombreTarea = data.task?.name || data.task?.nombre || 'una tarea';
            showNotification(`📡 ${data.userId || 'Alguien'} ${accionTexto} "${nombreTarea}"`);
        }
    }
    
    // ============================================
    // EMITIR CAMBIO - CORREGIDO
    // ============================================
    function emitirCambio(projectId, task, action) {
        debugLog(`📤 Intentando emitir: ${action} - "${task?.name || task?.nombre}"`);
        debugLog(`📤 Estado socket: conectado=${window.socketConectado}, socket=${!!socket}`);
        
        if (!socket || !window.socketConectado) {
            debugWarn('⚠️ WebSocket no conectado, intentando reconectar...');
            window.initWebSocket();
            setTimeout(() => {
                if (socket && window.socketConectado) {
                    debugLog('🔄 Reintentando emisión después de reconectar...');
                    emitirCambio(projectId, task, action);
                } else {
                    debugError('❌ No se pudo reconectar WebSocket');
                    // Guardar en localStorage para sincronización posterior
                    const pendingEvents = JSON.parse(localStorage.getItem('pendingCollabEvents') || '[]');
                    pendingEvents.push({ projectId, task, action, timestamp: Date.now() });
                    localStorage.setItem('pendingCollabEvents', JSON.stringify(pendingEvents));
                    debugLog('💾 Evento guardado para sincronización posterior');
                }
            }, 2000);
            return;
        }
        
        const user = getCurrentUser() || 'Usuario';
        const payload = {
            projectId: projectId,
            task: task,
            action: action,
            userId: user,
            timestamp: new Date().toISOString()
        };
        
        debugLog('📤 Enviando payload:', payload);
        
        try {
            socket.emit('collab-update', payload);
            debugLog(`✅ Evento emitido: ${action} - "${task?.name || task?.nombre}"`);
            
            // También guardar para sincronización local
            if (action === 'created' || action === 'updated' || action === 'moved') {
                const proyectosColab = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
                const proyectoExistente = proyectosColab.find(p => p.id === projectId);
                if (proyectoExistente) {
                    const taskIndex = proyectoExistente.tasks?.findIndex(t => t.id === task.id);
                    if (taskIndex !== -1) {
                        proyectoExistente.tasks[taskIndex] = task;
                    } else if (action === 'created') {
                        if (!proyectoExistente.tasks) proyectoExistente.tasks = [];
                        proyectoExistente.tasks.push(task);
                    }
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(proyectosColab));
                }
            }
            
            return true;
        } catch (error) {
            debugError('❌ Error emitiendo evento:', error);
            return false;
        }
    }
    
    // ============================================
    // FUNCIONES DE PROYECTOS
    // ============================================
    function guardarProyectoAceptadoLocal(proyecto) {
        let aceptados = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const existe = aceptados.some(p => p.id === proyecto.id || p._id === proyecto._id);
        if (!existe) {
            aceptados.push(proyecto);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(aceptados));
            debugLog('💾 Proyecto guardado:', proyecto.nombre || proyecto.name);
        }
        proyectosAceptadosLocal = aceptados;
    }
    
    function cargarProyectosAceptadosLocal() {
        proyectosAceptadosLocal = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        return proyectosAceptadosLocal;
    }
    
    // ============================================
    // SINCronizar al menú lateral - FUNCIÓN GLOBAL
    // ============================================
    window.sincronizarProyectosAlMenu = function() {
        debugLog('🔄 Sincronizando proyectos al menú lateral...');
        
        cargarProyectosAceptadosLocal();
        
        const todosLosProyectos = [...misProyectos, ...proyectosColaborativos, ...proyectosAceptadosLocal];
        
        const idsVistos = new Set();
        const proyectosUnicos = todosLosProyectos.filter(p => {
            const id = p.id || p._id;
            if (idsVistos.has(id)) return false;
            idsVistos.add(id);
            return true;
        });
        
        if (proyectosUnicos.length === 0) {
            debugLog('📭 No hay proyectos');
            return;
        }
        
        window.projects = proyectosUnicos.map(p => ({
            id: p.id || p._id,
            name: p.nombre || p.name,
            clienteId: p.clienteId,
            colaboradores: p.colaboradores || [],
            tasks: p.tasks || [],
            totalProjectTime: p.totalProjectTime || 0
        }));
        
        localStorage.setItem('projects', JSON.stringify(window.projects));
        
        if (typeof renderProjects === 'function') {
            renderProjects();
            debugLog('✅ Menú lateral actualizado');
        }
        if (typeof renderKanbanTasks === 'function') {
            renderKanbanTasks();
        }
        if (typeof updateProjectProgress === 'function') {
            updateProjectProgress();
        }
    };
    
    // ============================================
    // CARGAR DATOS
    // ============================================
    async function cargarDatos() {
        const user = getCurrentUser();
        if (!user) {
            debugLog('⏳ No hay usuario');
            return;
        }
        
        debugLog('🔄 Cargando datos para usuario:', user);
        
        try {
            const respMis = await fetch(`${API_URL}/mis-proyectos`, {
                headers: getHeaders()
            });
            
            if (respMis.ok) {
                const data = await respMis.json();
                misProyectos = data.projects || [];
                debugLog('✅ Mis proyectos:', misProyectos.length);
            }
            
            const respInv = await fetch(`${API_URL}/colaboracion/invitaciones`, {
                headers: getHeaders()
            });
            
            if (respInv.ok) {
                const data = await respInv.json();
                invitaciones = data.invitaciones || [];
                debugLog('✅ Invitaciones:', invitaciones.length);
            }
            
            const respCol = await fetch(`${API_URL}/colaboracion/proyectos`, {
                headers: getHeaders()
            });
            
            if (respCol.ok) {
                const data = await respCol.json();
                proyectosColaborativos = data.proyectos || [];
                debugLog('✅ Proyectos colaborativos:', proyectosColaborativos.length);
            }
            
            cargarProyectosAceptadosLocal();
            
            window.sincronizarProyectosAlMenu();
            updateBadge();
            
        } catch (error) {
            debugError('❌ Error cargando datos:', error);
        }
    }
    
    // ============================================
    // NÚCLEO
    // ============================================
    const Core = {
        getMisProyectos: function() {
            return misProyectos;
        },
        
        getProyectosColaborativos: function() {
            return proyectosColaborativos;
        },
        
        getMyInvitations: function() {
            const user = getCurrentUser();
            if (!user) return [];
            
            const userNormalizado = user.trim().toLowerCase();
            
            return invitaciones.filter(i => {
                const emailNormalizado = i.email.trim().toLowerCase();
                return emailNormalizado === userNormalizado && i.estado === 'pendiente';
            });
        },
        
        async sendInvitation(proyectoId, email) {
            const user = getCurrentUser();
            if (!user) {
                alert('❌ Inicia sesión');
                return false;
            }
            
            const proyecto = misProyectos.find(p => p.id == proyectoId);
            if (!proyecto) {
                alert('❌ Proyecto no encontrado');
                return false;
            }
            
            try {
                const response = await fetch(`${API_URL}/invitations`, {
                    method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify({
                        email: email,
                        proyectoIndex: 0,
                        proyectoNombre: proyecto.name,
                        rol: 'colaborador'
                    })
                });
                
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || 'Error');
                }
                
                await cargarDatos();
                alert(`✅ Invitación enviada a ${email}`);
                updateBadge();
                renderPanel();
                return true;
                
            } catch (error) {
                alert('❌ Error: ' + error.message);
                return false;
            }
        },
        
        async acceptInvitation(invitacionId) {
            try {
                const response = await fetch(`${API_URL}/colaboracion/aceptar-invitacion`, {
                    method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify({ invitacionId })
                });
                
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || 'Error');
                }
                
                const data = await response.json();
                if (data.proyecto) {
                    guardarProyectoAceptadoLocal(data.proyecto);
                }
                
                await cargarDatos();
                alert('✅ Invitación aceptada');
                updateBadge();
                renderPanel();
                window.sincronizarProyectosAlMenu();
                
                return true;
                
            } catch (error) {
                alert('❌ Error: ' + error.message);
                return false;
            }
        },
        
        async rejectInvitation(invitacionId) {
            try {
                const response = await fetch(`${API_URL}/colaboracion/rechazar-invitacion`, {
                    method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify({ invitacionId })
                });
                
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || 'Error');
                }
                
                await cargarDatos();
                updateBadge();
                renderPanel();
                return true;
                
            } catch (error) {
                alert('❌ Error: ' + error.message);
                return false;
            }
        }
    };
    
    // ============================================
    // INTERCEPTAR CAMBIOS EN TAREAS - CORREGIDO
    // ============================================
    function interceptarCambiosTareas() {
        debugLog('🔄 Interceptando cambios en tareas...');
        
        // Verificar que las funciones existan
        if (typeof window.createNewTask !== 'function') {
            debugWarn('⚠️ createNewTask no encontrada');
        }
        if (typeof window.saveTaskChanges !== 'function') {
            debugWarn('⚠️ saveTaskChanges no encontrada');
        }
        if (typeof window.handleDrop !== 'function') {
            debugWarn('⚠️ handleDrop no encontrada');
        }
        if (typeof window.deleteTask !== 'function') {
            debugWarn('⚠️ deleteTask no encontrada');
        }
        
        // Guardar funciones originales
        const originalCreate = window.createNewTask;
        const originalSave = window.saveTaskChanges;
        const originalDrop = window.handleDrop;
        const originalDelete = window.deleteTask;
        
        if (originalCreate) {
            window.createNewTask = function(e) {
                debugLog('🔍 createNewTask interceptado');
                const result = originalCreate(e);
                
                setTimeout(() => {
                    try {
                        const project = window.projects[currentProjectIndex];
                        debugLog('📂 Proyecto actual para created:', project?.name);
                        if (project && project.tasks && project.tasks.length > 0) {
                            const task = project.tasks[project.tasks.length - 1];
                            if (task) {
                                debugLog('📤 Emitiendo task-created:', task.name);
                                emitirCambio(project.id, task, 'created');
                            }
                        }
                    } catch (error) {
                        debugError('❌ Error emitiendo task-created:', error);
                    }
                }, 500);
                
                return result;
            };
            debugLog('✅ createNewTask interceptado');
        }
        
        if (originalSave) {
            window.saveTaskChanges = function(taskId) {
                debugLog('🔍 saveTaskChanges interceptado para:', taskId);
                const result = originalSave(taskId);
                
                setTimeout(() => {
                    try {
                        const project = window.projects[currentProjectIndex];
                        const task = project?.tasks?.find(t => t.id === taskId);
                        if (project && task) {
                            debugLog('📤 Emitiendo task-updated:', task.name);
                            emitirCambio(project.id, task, 'updated');
                        }
                    } catch (error) {
                        debugError('❌ Error emitiendo task-updated:', error);
                    }
                }, 500);
                
                return result;
            };
            debugLog('✅ saveTaskChanges interceptado');
        }
        
        if (originalDrop) {
            window.handleDrop = function(e) {
                debugLog('🔍 handleDrop interceptado');
                const result = originalDrop(e);
                
                setTimeout(() => {
                    try {
                        const project = window.projects[currentProjectIndex];
                        const taskId = e.dataTransfer?.getData('text/plain');
                        if (taskId) {
                            const task = project?.tasks?.find(t => String(t.id) === String(taskId));
                            if (project && task) {
                                debugLog('📤 Emitiendo task-moved:', task.name);
                                emitirCambio(project.id, task, 'moved');
                            }
                        }
                    } catch (error) {
                        debugError('❌ Error emitiendo task-moved:', error);
                    }
                }, 500);
                
                return result;
            };
            debugLog('✅ handleDrop interceptado');
        }
        
        if (originalDelete) {
            window.deleteTask = function(taskStr) {
                debugLog('🔍 deleteTask interceptado');
                let task = null;
                let project = null;
                
                try {
                    if (typeof taskStr === 'string') {
                        try {
                            task = JSON.parse(decodeURIComponent(taskStr));
                        } catch(e) {
                            project = window.projects[currentProjectIndex];
                            task = project?.tasks?.find(t => String(t.id) === String(taskStr));
                            if (task) {
                                taskStr = JSON.stringify(task);
                            }
                        }
                    }
                    
                    const result = originalDelete(taskStr);
                    
                    setTimeout(() => {
                        try {
                            if (project && task) {
                                debugLog('📤 Emitiendo task-deleted:', task.name);
                                emitirCambio(project.id, task, 'deleted');
                            }
                        } catch (error) {
                            debugError('❌ Error emitiendo task-deleted:', error);
                        }
                    }, 500);
                    
                    return result;
                } catch (error) {
                    debugError('❌ Error en deleteTask interceptado:', error);
                    return originalDelete(taskStr);
                }
            };
            debugLog('✅ deleteTask interceptado');
        }
        
        window._interceptoresActivos = true;
        debugLog('✅ Interceptores activados');
    }
    
    // ============================================
    // INTERFAZ VISUAL
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
        btn.appendChild(badge);
        
        document.body.appendChild(btn);
        updateBadge();
        mostrarEstadoWebSocket(false);
    }
    
    function updateBadge() {
        const badge = document.getElementById('colabBadge');
        if (!badge) return;
        const pendientes = Core.getMyInvitations();
        badge.textContent = pendientes.length;
        badge.style.display = pendientes.length > 0 ? 'flex' : 'none';
    }
    
    function renderPanel() {
        const existing = document.getElementById('colabPanel');
        if (existing) {
            existing.remove();
            panelAbierto = false;
        }
        setTimeout(() => togglePanel(), 100);
    }
    
    async function togglePanel() {
        const existing = document.getElementById('colabPanel');
        if (existing) {
            existing.remove();
            panelAbierto = false;
            return;
        }
        
        await cargarDatos();
        
        const pendientes = Core.getMyInvitations();
        const misProyectosList = Core.getMisProyectos();
        const colaborativosList = Core.getProyectosColaborativos();
        const aceptadosLocal = proyectosAceptadosLocal;
        
        const puedeInvitar = misProyectosList.length > 0;
        
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
        
        const proyectosParaInvitar = misProyectosList.map(p => 
            `<option value="${p.id}">${p.name}</option>`
        ).join('');
        
        const seccionInvitar = puedeInvitar ? `
            <div style="border-top: 1px solid #334155; padding-top: 16px;">
                <div style="color: #8b5cf6; font-size: 13px; font-weight: 600; margin-bottom: 10px;">➕ Invitar Colaborador</div>
                <div style="margin-bottom: 8px;">
                    <select id="invitarProyectoSelect" style="width: 100%; padding: 10px; background: #0f172a; border: 1px solid #334155; border-radius: 8px; color: white; font-size: 13px;">
                        ${proyectosParaInvitar}
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
        ` : `
            <div style="border-top: 1px solid #334155; padding-top: 16px; text-align: center; color: #64748b; font-size: 13px;">
                💡 Crea un proyecto en el menú lateral para poder invitar colaboradores.
            </div>
        `;
        
        panel.innerHTML = `
            <div style="padding: 16px 20px; background: #1e293b; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 20px;">👥</span>
                    <span style="font-weight: 600; font-size: 16px;">Colaboración</span>
                    ${pendientes.length > 0 ? `<span style="background: #ef4444; padding: 2px 10px; border-radius: 12px; font-size: 11px;">${pendientes.length}</span>` : ''}
                </div>
                <button onclick="document.getElementById('colabPanel').remove()" style="background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer;">✕</button>
            </div>
            
            <div style="padding: 16px; overflow-y: auto; flex: 1; max-height: 400px;">
                <!-- Invitaciones -->
                <div style="margin-bottom: 20px;">
                    <div style="color: #f59e0b; font-size: 13px; font-weight: 600; margin-bottom: 10px;">📩 Invitaciones Pendientes</div>
                    ${pendientes.length === 0 ? `
                        <div style="text-align: center; padding: 20px; color: #64748b; font-size: 13px;">No tienes invitaciones</div>
                    ` : pendientes.map(inv => `
                        <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 12px 16px; margin-bottom: 10px; border-left: 4px solid #f59e0b;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600;">${inv.proyectoNombre}</div>
                                    <div style="font-size: 11px; color: #94a3b8;">De: ${inv.creador || 'Desconocido'}</div>
                                </div>
                                <button onclick="aceptarInvitacionConSincronizacion('${inv._id || inv.id}')" style="background: #10b981; color: white; border: none; padding: 6px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 12px;">
                                    ✅ Aceptar
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <!-- MIS PROYECTOS -->
                <div style="margin-bottom: 20px;">
                    <div style="color: #8b5cf6; font-size: 13px; font-weight: 600; margin-bottom: 10px;">👑 Mis Proyectos</div>
                    ${misProyectosList.length === 0 ? `
                        <div style="text-align: center; padding: 20px; color: #64748b; font-size: 13px;">No tienes proyectos propios</div>
                    ` : misProyectosList.map(p => `
                        <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 12px 16px; margin-bottom: 8px; border-left: 4px solid #8b5cf6;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600;">${p.name}</div>
                                    <div style="font-size: 11px; color: #94a3b8;">
                                        ${p.colaboradores?.length || 1} colaboradores
                                    </div>
                                </div>
                                <span style="color: #8b5cf6; font-size: 11px; font-weight: 600;">👑 DUEÑO</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <!-- COLABORATIVOS -->
                <div style="margin-bottom: 20px;">
                    <div style="color: #10b981; font-size: 13px; font-weight: 600; margin-bottom: 10px;">📂 Proyectos Colaborativos</div>
                    ${colaborativosList.length === 0 && aceptadosLocal.length === 0 ? `
                        <div style="text-align: center; padding: 20px; color: #64748b; font-size: 13px;">No estás en proyectos colaborativos</div>
                    ` : `
                        ${colaborativosList.map(p => `
                            <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 12px 16px; margin-bottom: 8px; border-left: 4px solid #10b981;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="font-weight: 600;">${p.nombre}</div>
                                        <div style="font-size: 11px; color: #94a3b8;">
                                            ${p.colaboradores?.length || 1} colaboradores
                                        </div>
                                    </div>
                                    <span style="color: #10b981; font-size: 11px; font-weight: 600;">✅ Colaborador</span>
                                </div>
                            </div>
                        `).join('')}
                        ${aceptadosLocal.filter(p => !colaborativosList.some(c => c.id === p.id || c._id === p._id)).map(p => `
                            <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 12px 16px; margin-bottom: 8px; border-left: 4px solid #f59e0b;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="font-weight: 600;">${p.nombre || p.name}</div>
                                        <div style="font-size: 11px; color: #94a3b8;">
                                            💾 Guardado local
                                        </div>
                                    </div>
                                    <span style="color: #f59e0b; font-size: 11px; font-weight: 600;">📦 LOCAL</span>
                                </div>
                            </div>
                        `).join('')}
                    `}
                </div>
                
                ${seccionInvitar}
                
                <div style="margin-top: 10px; padding: 10px; background: rgba(255,255,255,0.03); border-radius: 8px; font-size: 10px; color: #64748b; border: 1px solid #1e293b; text-align: center;">
                    🔄 ${misProyectosList.length} propios | ${colaborativosList.length + aceptadosLocal.length} colaborativos
                    ${window.socketConectado ? ' | 🔗 Conectado' : ' | 🔌 Desconectado'}
                    ${window._interceptoresActivos ? ' | ✅ Interceptores activos' : ' | ❌ Sin interceptores'}
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        panelAbierto = true;
        
        window.enviarInvitacion = async function() {
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
            if (!email.includes('@')) {
                mensaje.innerHTML = '<span style="color: #ef4444;">❌ Email inválido</span>';
                return;
            }
            
            mensaje.innerHTML = '<span style="color: #f59e0b;">⏳ Enviando...</span>';
            const resultado = await Core.sendInvitation(proyectoId, email);
            if (resultado) {
                mensaje.innerHTML = `<span style="color: #10b981;">✅ Invitación enviada a ${email}</span>`;
                emailInput.value = '';
                setTimeout(() => mensaje.innerHTML = '', 5000);
            }
        };
        
        window.aceptarInvitacionConSincronizacion = async function(id) {
            const resultado = await Core.acceptInvitation(id);
            if (resultado) {
                await cargarDatos();
                window.sincronizarProyectosAlMenu();
                renderPanel();
            }
        };
        
        window.rechazarInvitacion = async function(id) {
            if (confirm('¿Rechazar esta invitación?')) {
                await Core.rejectInvitation(id);
            }
        };
    }
    
    // ============================================
    // FUNCIÓN PARA FORZAR SINCRONIZACIÓN MANUAL
    // ============================================
    window.forceSyncNow = function() {
        debugLog('🔄 Forzando sincronización manual...');
        
        const project = window.projects[currentProjectIndex];
        if (!project) {
            debugError('❌ No hay proyecto seleccionado');
            alert('❌ No hay proyecto seleccionado');
            return;
        }
        
        debugLog('📂 Proyecto actual:', project.name);
        
        if (socket && window.socketConectado) {
            socket.emit('collab-update', {
                projectId: project.id,
                task: null,
                action: 'sync-request',
                userId: getCurrentUser() || 'Usuario',
                timestamp: new Date().toISOString()
            });
            debugLog('📤 Solicitud de sincronización enviada');
            alert('✅ Solicitud de sincronización enviada');
        } else {
            debugError('❌ WebSocket no conectado');
            window.initWebSocket();
            setTimeout(() => {
                if (socket && window.socketConectado) {
                    window.forceSyncNow();
                } else {
                    alert('❌ No se pudo conectar el WebSocket');
                }
            }, 2000);
            return;
        }
        
        window.sincronizarProyectosAlMenu();
        if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
        if (typeof renderProjects === 'function') renderProjects();
        
        debugLog('✅ Sincronización forzada completada');
    };
    
    // ============================================
    // FUNCIÓN PARA VER ESTADO
    // ============================================
    window.getCollabStatus = function() {
        console.log('📊 === ESTADO COLABORACIÓN ===');
        console.log('🔗 WebSocket conectado:', window.socketConectado);
        console.log('🔄 Interceptores activos:', window._interceptoresActivos);
        console.log('👤 Usuario actual:', getCurrentUser());
        console.log('📂 Mis proyectos:', misProyectos.length);
        console.log('📂 Colaborativos:', proyectosColaborativos.length + proyectosAceptadosLocal.length);
        console.log('📋 Proyectos en window.projects:', window.projects?.length || 0);
        console.log('📋 Proyecto actual:', window.projects[currentProjectIndex]?.name || 'Ninguno');
        console.log('📋 Tareas:', window.projects[currentProjectIndex]?.tasks?.length || 0);
        console.log('📋 Invitaciones pendientes:', Core.getMyInvitations().length);
        console.log('=============================');
    };
    
    // ============================================
    // PROCESAR EVENTOS PENDIENTES
    // ============================================
    function procesarEventosPendientes() {
        const pendingEvents = JSON.parse(localStorage.getItem('pendingCollabEvents') || '[]');
        if (pendingEvents.length > 0) {
            debugLog(`🔄 Procesando ${pendingEvents.length} eventos pendientes...`);
            pendingEvents.forEach(event => {
                emitirCambio(event.projectId, event.task, event.action);
            });
            localStorage.removeItem('pendingCollabEvents');
        }
    }
    
    // ============================================
    // INICIALIZACIÓN
    // ============================================
    async function init() {
        debugLog('🚀 Inicializando sistema de colaboración...');
        
        const proyectoGuardado = localStorage.getItem('proyecto_colaborativo_aceptado');
        if (proyectoGuardado) {
            try {
                const proyecto = JSON.parse(proyectoGuardado);
                const existe = window.projects.some(p => p.id === proyecto.id);
                if (!existe) {
                    window.projects.push(proyecto);
                    localStorage.setItem('projects', JSON.stringify(window.projects));
                    debugLog('✅ Proyecto colaborativo cargado:', proyecto.name);
                }
            } catch(e) {
                debugWarn('Error cargando proyecto:', e);
            }
        }
        
        // Iniciar WebSocket
        window.initWebSocket();
        
        await cargarDatos();
        createFloatingButton();
        window.sincronizarProyectosAlMenu();
        
        setTimeout(interceptarCambiosTareas, 1000);
        
        // Procesar eventos pendientes
        setTimeout(procesarEventosPendientes, 2000);
        
        debugLog('✅ Sistema de colaboración listo');
        debugLog('💡 Para forzar sincronización usa: forceSyncNow()');
        debugLog('💡 Para ver estado usa: getCollabStatus()');
        
        window.getCollabStatus();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100);
    }
    
})();