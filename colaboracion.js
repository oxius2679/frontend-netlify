// ============================================================
// 🚀 SISTEMA DE COLABORACIÓN UNIFICADO - VERSIÓN FINAL
// ============================================================

(function() {
    'use strict';
    
    console.log('🔥 SISTEMA DE COLABORACIÓN UNIFICADO - VERSIÓN FINAL');
    
    const API_URL = 'https://mi-sistema-proyectos-backend-4.onrender.com/api';
    const STORAGE_KEY = 'proyectos_colaborativos_aceptados';
    
    let invitaciones = [];
    let misProyectos = [];
    let proyectosColaborativos = [];
    let proyectosAceptadosLocal = [];
    let panelAbierto = false;
    let socket = null;
    let socketConectado = false;
    let lastSyncTime = 0;
    const SYNC_INTERVAL = 2000; // 2 segundos mínimo entre sincronizaciones
    
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
    // WEB SOCKET UNIFICADO
    // ============================================
    function initWebSocket() {
        // Cerrar socket existente
        if (socket) {
            socket.disconnect();
            socket = null;
        }
        
        const token = getAuthToken();
        if (!token) {
            console.log('⏳ No hay token, WebSocket no iniciado');
            return;
        }
        
        try {
            socket = io('https://mi-sistema-proyectos-backend-4.onrender.com', {
                transports: ['websocket', 'polling'],
                auth: { token: token },
                reconnection: true,
                reconnectionAttempts: 10,
                reconnectionDelay: 1000,
                timeout: 10000
            });
            
            socket.on('connect', function() {
                console.log('🔗 WebSocket conectado (colaboración)');
                socketConectado = true;
                
                // Unirse a la sala principal de colaboración
                socket.emit('join-collab-room', { 
                    userId: getCurrentUser() || 'Usuario' 
                });
                
                // También unirse a la sala de proyecto actual
                if (typeof currentProjectIndex !== 'undefined' && currentProjectIndex !== null) {
                    socket.emit('join-project', currentProjectIndex);
                }
            });
            
            // ============================================
            // MANEJADOR DE EVENTOS - CON SINCRONIZACIÓN INMEDIATA
            // ============================================
            socket.on('collab-update', function(data) {
                console.log('📡 Evento colaborativo recibido:', data);
                
                // Si es el mismo usuario, ignorar
                if (data.userId === getCurrentUser()) {
                    console.log('ℹ️ Evento de mí mismo, ignorando');
                    return;
                }
                
                // FORZAR SINCRONIZACIÓN INMEDIATA
                console.log('🔄 Forzando sincronización inmediata...');
                forzarSincronizacionCompleta();
                
                // Mostrar notificación visual
                const acciones = {
                    'created': 'creó',
                    'updated': 'actualizó',
                    'moved': 'movió',
                    'deleted': 'eliminó'
                };
                const accionTexto = acciones[data.action] || data.action;
                
                // Notificación en la UI
                if (typeof showNotification === 'function') {
                    showNotification(`📡 ${data.userId || 'Alguien'} ${accionTexto} "${data.task?.name || 'una tarea'}"`);
                } else {
                    // Notificación simple
                    const notif = document.createElement('div');
                    notif.textContent = `📡 ${data.userId || 'Alguien'} ${accionTexto} una tarea`;
                    notif.style.cssText = `
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: #1e293b;
                        color: white;
                        padding: 12px 20px;
                        border-radius: 10px;
                        z-index: 9999999;
                        border: 2px solid #8b5cf6;
                        font-family: system-ui, sans-serif;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                        animation: slideInNotif 0.3s ease;
                    `;
                    document.body.appendChild(notif);
                    setTimeout(() => {
                        notif.style.animation = 'slideOutNotif 0.3s ease';
                        setTimeout(() => notif.remove(), 300);
                    }, 3000);
                }
            });
            
            // ============================================
            // EVENTOS DEL SISTEMA ORIGINAL (COMPATIBILIDAD)
            // ============================================
            socket.on('task-created', function(data) {
                console.log('📡 Evento task-created recibido:', data);
                if (data.userId === getCurrentUser()) return;
                setTimeout(forzarSincronizacionCompleta, 200);
            });
            
            socket.on('task-updated', function(data) {
                console.log('📡 Evento task-updated recibido:', data);
                if (data.userId === getCurrentUser()) return;
                setTimeout(forzarSincronizacionCompleta, 200);
            });
            
            socket.on('task-moved', function(data) {
                console.log('📡 Evento task-moved recibido:', data);
                if (data.userId === getCurrentUser()) return;
                setTimeout(forzarSincronizacionCompleta, 200);
            });
            
            socket.on('task-deleted', function(data) {
                console.log('📡 Evento task-deleted recibido:', data);
                if (data.userId === getCurrentUser()) return;
                setTimeout(forzarSincronizacionCompleta, 200);
            });
            
            socket.on('project-updated', function(data) {
                console.log('📡 Evento project-updated recibido:', data);
                if (data.userId === getCurrentUser()) return;
                setTimeout(forzarSincronizacionCompleta, 200);
            });
            
            socket.on('user-joined', function(data) {
                console.log('👤 Usuario unido:', data);
                if (data.userId === getCurrentUser()) return;
                // Mostrar notificación de usuario activo
                if (typeof showNotification === 'function') {
                    showNotification(`👤 ${data.userId || 'Alguien'} está trabajando en el proyecto`);
                }
            });
            
            socket.on('disconnect', function() {
                console.log('🔌 WebSocket desconectado (colaboración)');
                socketConectado = false;
            });
            
            socket.on('connect_error', function(error) {
                console.error('❌ Error WebSocket:', error);
                socketConectado = false;
            });
            
        } catch (error) {
            console.error('❌ Error iniciando WebSocket:', error);
            socketConectado = false;
        }
    }
    
    // ============================================
    // 🔥 FUNCIÓN DE SINCRONIZACIÓN FORZADA
    // ============================================
    function forzarSincronizacionCompleta() {
        const ahora = Date.now();
        if (ahora - lastSyncTime < SYNC_INTERVAL) {
            console.log('⏳ Sincronización muy reciente, esperando...');
            return;
        }
        lastSyncTime = ahora;
        
        console.log('🔄 FORZANDO SINCRONIZACIÓN COMPLETA...');
        
        // 1. Recargar proyectos del usuario
        const user = getCurrentUser();
        const token = getAuthToken();
        const clienteId = localStorage.getItem('clienteId');
        
        if (!token) {
            console.log('⚠️ No hay token, no se puede sincronizar');
            return;
        }
        
        // 2. Cargar proyectos del backend
        fetch(`${API_URL}/projects?clienteId=${clienteId || ''}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if (data.projects && data.projects.length > 0) {
                console.log(`📦 ${data.projects.length} proyectos cargados del backend`);
                
                // Fusionar con proyectos colaborativos
                const proyectosExistentesIds = new Set(data.projects.map(p => p.id));
                
                // Agregar proyectos colaborativos
                proyectosColaborativos.forEach(p => {
                    const id = p.id || p._id;
                    if (!proyectosExistentesIds.has(id)) {
                        const proyectoFormateado = {
                            id: id,
                            name: p.nombre || p.name,
                            clienteId: p.clienteId,
                            colaboradores: p.colaboradores || [],
                            tasks: p.tasks || [],
                            totalProjectTime: p.totalProjectTime || 0
                        };
                        data.projects.push(proyectoFormateado);
                        console.log(`➕ Proyecto colaborativo agregado: ${proyectoFormateado.name}`);
                    }
                });
                
                // Agregar proyectos aceptados localmente
                proyectosAceptadosLocal.forEach(p => {
                    const id = p.id || p._id;
                    if (!proyectosExistentesIds.has(id)) {
                        data.projects.push(p);
                        console.log(`📁 Proyecto local agregado: ${p.name}`);
                    }
                });
                
                // ACTUALIZAR GLOBAL
                window.projects = data.projects;
                localStorage.setItem('projects', JSON.stringify(data.projects));
                
                // 3. ACTUALIZAR UI
                actualizarUICompleta();
                
                console.log('✅ Sincronización completada');
            }
        })
        .catch(err => {
            console.error('❌ Error en sincronización:', err);
            // Fallback: recargar desde localStorage
            const localProjects = JSON.parse(localStorage.getItem('projects') || '[]');
            if (localProjects.length > 0) {
                window.projects = localProjects;
                actualizarUICompleta();
                console.log('📦 Usando datos de localStorage (fallback)');
            }
        });
    }
    
    // ============================================
    // ACTUALIZAR UI COMPLETA
    // ============================================
    function actualizarUICompleta() {
        console.log('🔄 Actualizando UI completa...');
        
        // 1. Renderizar menú lateral
        if (typeof renderProjects === 'function') {
            renderProjects();
            console.log('✅ Menú lateral actualizado');
        }
        
        // 2. Renderizar Kanban
        if (typeof renderKanbanTasks === 'function') {
            renderKanbanTasks();
            console.log('✅ Kanban actualizado');
        }
        
        // 3. Actualizar estadísticas
        if (typeof updateStatistics === 'function') {
            updateStatistics();
            console.log('✅ Estadísticas actualizadas');
        }
        
        // 4. Actualizar dashboard
        if (typeof renderDashboard === 'function') {
            renderDashboard();
            console.log('✅ Dashboard actualizado');
        }
        
        // 5. Actualizar lista de tareas
        if (typeof renderListTasks === 'function') {
            renderListTasks();
            console.log('✅ Lista de tareas actualizada');
        }
        
        // 6. Actualizar calendario
        if (typeof forceRefreshCalendar === 'function') {
            forceRefreshCalendar();
            console.log('✅ Calendario actualizado');
        }
        
        // 7. Actualizar contadores de columnas
        if (typeof actualizarContadoresColumnas === 'function') {
            actualizarContadoresColumnas();
            console.log('✅ Contadores actualizados');
        }
        
        // 8. Actualizar progreso del Gantt
        if (typeof actualizarProgresoGantt === 'function') {
            actualizarProgresoGantt();
            console.log('✅ Progreso Gantt actualizado');
        }
        
        // 9. Disparar eventos de UI
        document.dispatchEvent(new Event('tasksRendered'));
        document.dispatchEvent(new Event('projectUpdated'));
        
        console.log('✅ UI completamente actualizada');
    }
    
    // ============================================
    // EMITIR CAMBIO
    // ============================================
    function emitirCambio(projectId, task, action) {
        if (socket && socketConectado) {
            const payload = {
                projectId: projectId,
                task: task,
                action: action,
                userId: getCurrentUser() || 'Usuario',
                timestamp: new Date().toISOString()
            };
            
            // Emitir a ambas salas para compatibilidad
            socket.emit('collab-update', payload);
            socket.emit('task-changed', payload);
            
            console.log(`📤 Evento emitido: ${action} - "${task?.name}"`);
        } else {
            console.warn('⚠️ WebSocket no conectado, intentando reconectar...');
            initWebSocket();
            // Reintentar después de reconectar
            setTimeout(() => {
                if (socket && socketConectado) {
                    emitirCambio(projectId, task, action);
                }
            }, 1000);
        }
    }
    
    // ============================================
    // GUARDAR PROYECTO ACEPTADO
    // ============================================
    function guardarProyectoAceptadoLocal(proyecto) {
        let aceptados = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const existe = aceptados.some(p => p.id === proyecto.id || p._id === proyecto._id);
        if (!existe) {
            aceptados.push(proyecto);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(aceptados));
            console.log('💾 Proyecto guardado:', proyecto.nombre || proyecto.name);
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
        console.log('🔄 Sincronizando proyectos al menú lateral...');
        
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
            console.log('📭 No hay proyectos');
            return;
        }
        
        // Guardar proyectos originales para referencia
        if (!window.originalProjects) {
            window.originalProjects = [...window.projects];
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
        
        actualizarUICompleta();
    };
    
    // ============================================
    // CARGAR DATOS
    // ============================================
    async function cargarDatos() {
        const user = getCurrentUser();
        if (!user) {
            console.log('⏳ No hay usuario');
            return;
        }
        
        try {
            const respMis = await fetch(`${API_URL}/mis-proyectos`, {
                headers: getHeaders()
            });
            
            if (respMis.ok) {
                const data = await respMis.json();
                misProyectos = data.projects || [];
            }
            
            const respInv = await fetch(`${API_URL}/colaboracion/invitaciones`, {
                headers: getHeaders()
            });
            
            if (respInv.ok) {
                const data = await respInv.json();
                invitaciones = data.invitaciones || [];
            }
            
            const respCol = await fetch(`${API_URL}/colaboracion/proyectos`, {
                headers: getHeaders()
            });
            
            if (respCol.ok) {
                const data = await respCol.json();
                proyectosColaborativos = data.proyectos || [];
            }
            
            cargarProyectosAceptadosLocal();
            
            window.sincronizarProyectosAlMenu();
            updateBadge();
            
        } catch (error) {
            console.error('❌ Error:', error);
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
    // INTERCEPTAR CAMBIOS EN TAREAS
    // ============================================
    function interceptarCambiosTareas() {
        console.log('🔄 Interceptando cambios en tareas...');
        
        // Guardar funciones originales
        const originalCreate = window.createNewTask;
        const originalSave = window.saveTaskChanges;
        const originalDrop = window.handleDrop;
        const originalDelete = window.deleteTask;
        const originalMove = window.moveTaskUp || window.moveTaskDown;
        
        if (originalCreate) {
            window.createNewTask = function(e) {
                const result = originalCreate(e);
                setTimeout(() => {
                    const project = window.projects[currentProjectIndex];
                    if (project && project.tasks && project.tasks.length > 0) {
                        const task = project.tasks[project.tasks.length - 1];
                        emitirCambio(project.id, task, 'created');
                    }
                }, 500);
                return result;
            };
            console.log('✅ createNewTask interceptado');
        }
        
        if (originalSave) {
            window.saveTaskChanges = function(taskId) {
                const result = originalSave(taskId);
                setTimeout(() => {
                    const project = window.projects[currentProjectIndex];
                    const task = project?.tasks?.find(t => t.id === taskId);
                    if (project && task) {
                        emitirCambio(project.id, task, 'updated');
                    }
                }, 500);
                return result;
            };
            console.log('✅ saveTaskChanges interceptado');
        }
        
        if (originalDrop) {
            window.handleDrop = function(e) {
                const result = originalDrop(e);
                setTimeout(() => {
                    const project = window.projects[currentProjectIndex];
                    const taskId = e.dataTransfer?.getData('text/plain');
                    const task = project?.tasks?.find(t => String(t.id) === String(taskId));
                    if (project && task) {
                        emitirCambio(project.id, task, 'moved');
                    }
                }, 500);
                return result;
            };
            console.log('✅ handleDrop interceptado');
        }
        
        if (originalDelete) {
            window.deleteTask = function(taskStr) {
                const task = JSON.parse(decodeURIComponent(taskStr));
                const project = window.projects[currentProjectIndex];
                const result = originalDelete(taskStr);
                if (project && task) {
                    emitirCambio(project.id, task, 'deleted');
                }
                return result;
            };
            console.log('✅ deleteTask interceptado');
        }
        
        // Interceptar movimientos con flechas
        if (window.moveTaskUp) {
            const originalMoveUp = window.moveTaskUp;
            window.moveTaskUp = function(taskId, status) {
                const result = originalMoveUp(taskId, status);
                setTimeout(() => {
                    const project = window.projects[currentProjectIndex];
                    const task = project?.tasks?.find(t => t.id === taskId);
                    if (project && task) {
                        emitirCambio(project.id, task, 'moved');
                    }
                }, 500);
                return result;
            };
            console.log('✅ moveTaskUp interceptado');
        }
        
        if (window.moveTaskDown) {
            const originalMoveDown = window.moveTaskDown;
            window.moveTaskDown = function(taskId, status) {
                const result = originalMoveDown(taskId, status);
                setTimeout(() => {
                    const project = window.projects[currentProjectIndex];
                    const task = project?.tasks?.find(t => t.id === taskId);
                    if (project && task) {
                        emitirCambio(project.id, task, 'moved');
                    }
                }, 500);
                return result;
            };
            console.log('✅ moveTaskDown interceptado');
        }
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
    // ESTILOS DE ANIMACIÓN PARA NOTIFICACIONES
    // ============================================
    function injectStyles() {
        const style = document.createElement('style');
        style.id = 'colab-notification-styles';
        style.textContent = `
            @keyframes slideInNotif {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutNotif {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ============================================
    // POLLING DE RESPALDO (CADA 10 SEGUNDOS)
    // ============================================
    function iniciarPollingDeRespaldo() {
        console.log('🔄 Iniciando polling de respaldo (cada 10s)...');
        setInterval(() => {
            if (!socketConectado) {
                console.log('📡 WebSocket desconectado, usando polling...');
                forzarSincronizacionCompleta();
            }
        }, 10000);
    }
    
    // ============================================
    // INICIALIZACIÓN
    // ============================================
    async function init() {
        console.log('🚀 Inicializando sistema de colaboración unificado...');
        
        // Inyectar estilos
        injectStyles();
        
        // Cargar proyecto guardado
        const proyectoGuardado = localStorage.getItem('proyecto_colaborativo_aceptado');
        if (proyectoGuardado) {
            try {
                const proyecto = JSON.parse(proyectoGuardado);
                const existe = window.projects.some(p => p.id === proyecto.id);
                if (!existe) {
                    window.projects.push(proyecto);
                    localStorage.setItem('projects', JSON.stringify(window.projects));
                    console.log('✅ Proyecto colaborativo cargado:', proyecto.name);
                }
            } catch(e) {
                console.warn('Error cargando proyecto:', e);
            }
        }
        
        // Iniciar WebSocket
        initWebSocket();
        
        // Cargar datos
        await cargarDatos();
        
        // Crear botón flotante
        createFloatingButton();
        
        // Sincronizar al menú
        window.sincronizarProyectosAlMenu();
        
        // Interceptar cambios en tareas
        setTimeout(interceptarCambiosTareas, 1000);
        
        // Iniciar polling de respaldo
        iniciarPollingDeRespaldo();
        
        // EXPONER FUNCIÓN GLOBAL PARA SINCRONIZACIÓN MANUAL
        window.forzarSincronizacionColaboracion = forzarSincronizacionCompleta;
        
        console.log('✅ Sistema de colaboración unificado listo');
        console.log('📂 Mis proyectos:', misProyectos.length);
        console.log('📂 Colaborativos:', proyectosColaborativos.length + proyectosAceptadosLocal.length);
        console.log('🔗 WebSocket:', socketConectado ? '✅ Conectado' : '❌ Desconectado');
        console.log('💡 Usa forzarSincronizacionColaboracion() para sincronizar manualmente');
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100);
    }
    
})();