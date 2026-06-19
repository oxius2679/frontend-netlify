// ============================================================
// 🚀 SISTEMA DE COLABORACIÓN - VERSIÓN FINAL CON SINCRO MEJORADA
// ============================================================

(function() {
    'use strict';
    
    console.log('🔥 SISTEMA DE COLABORACIÓN - VERSIÓN FINAL CON SINCRO MEJORADA');
    
    const API_URL = 'https://mi-sistema-proyectos-backend-4.onrender.com/api';
    const STORAGE_KEY = 'proyectos_colaborativos_aceptados';
    
    let invitaciones = [];
    let misProyectos = [];
    let proyectosColaborativos = [];
    let proyectosAceptadosLocal = [];
    let panelAbierto = false;
    let socket = null;
    let socketConectado = false;
    
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
    // WEB SOCKET - MEJORADO
    // ============================================
    function initWebSocket() {
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
                reconnectionAttempts: 5,
                reconnectionDelay: 1000
            });
            
            socket.on('connect', function() {
                console.log('🔗 WebSocket conectado (colaboración)');
                socketConectado = true;
                socket.emit('join-collab-room', { 
                    userId: getCurrentUser() || 'Usuario' 
                });
            });
            
            socket.on('collab-update', function(data) {
                console.log('📡 Evento colaborativo recibido:', data);
                
                // Si es el mismo usuario, ignorar
                const currentUser = getCurrentUser();
                if (data.userId === currentUser) {
                    console.log('ℹ️ Evento de mí mismo, ignorando');
                    return;
                }
                
                // Si es una solicitud de sincronización
                if (data.action === 'sync-request') {
                    console.log('🔄 Solicitud de sincronización de', data.userId);
                    // Responder con los datos actuales
                    const project = window.projects[currentProjectIndex];
                    if (project && socket && socketConectado) {
                        socket.emit('collab-update', {
                            projectId: project.id,
                            task: null,
                            action: 'sync-response',
                            userId: currentUser,
                            projectData: project,
                            timestamp: new Date().toISOString()
                        });
                    }
                    return;
                }
                
                // Si es una respuesta de sincronización
                if (data.action === 'sync-response' && data.projectData) {
                    console.log('🔄 Recibiendo datos de sincronización de', data.userId);
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
                        console.log('✅ Datos sincronizados desde', data.userId);
                        showNotification(`✅ Proyecto sincronizado con ${data.userId}`);
                    }
                    return;
                }
                
                // Sincronizar proyectos al menú
                window.sincronizarProyectosAlMenu();
                
                // Si es una acción de tarea, actualizar el board
                if (data.task && data.action !== 'sync-request' && data.action !== 'sync-response') {
                    // Buscar el proyecto en el array
                    let projectIndex = window.projects.findIndex(p => p.id === data.projectId);
                    if (projectIndex === -1) {
                        // Buscar por nombre
                        projectIndex = window.projects.findIndex(p => p.name === data.projectName);
                    }
                    
                    if (projectIndex !== -1 && data.task) {
                        const project = window.projects[projectIndex];
                        
                        // Actualizar la tarea según la acción
                        switch (data.action) {
                            case 'created':
                                // Verificar que no exista duplicado
                                const existe = project.tasks.some(t => t.id === data.task.id);
                                if (!existe) {
                                    project.tasks.push(data.task);
                                    console.log('✅ Tarea creada:', data.task.name);
                                }
                                break;
                            case 'updated':
                                const updateIndex = project.tasks.findIndex(t => t.id === data.task.id);
                                if (updateIndex !== -1) {
                                    project.tasks[updateIndex] = data.task;
                                    console.log('✅ Tarea actualizada:', data.task.name);
                                }
                                break;
                            case 'moved':
                                const moveIndex = project.tasks.findIndex(t => t.id === data.task.id);
                                if (moveIndex !== -1) {
                                    project.tasks[moveIndex] = data.task;
                                    console.log('✅ Tarea movida:', data.task.name);
                                }
                                break;
                            case 'deleted':
                                const deleteIndex = project.tasks.findIndex(t => t.id === data.task.id);
                                if (deleteIndex !== -1) {
                                    project.tasks.splice(deleteIndex, 1);
                                    console.log('✅ Tarea eliminada:', data.task.name);
                                }
                                break;
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
                        
                        console.log(`✅ Tarea ${data.action} sincronizada:`, data.task.name);
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
    // EMITIR CAMBIO - MEJORADO
    // ============================================
    function emitirCambio(projectId, task, action) {
        console.log(`📤 Intentando emitir: ${action} - "${task?.name || task?.nombre}"`);
        
        if (!socket || !socketConectado) {
            console.warn('⚠️ WebSocket no conectado, cambio no emitido');
            // Intentar reconectar
            if (!socket || !socket.connected) {
                console.log('🔄 Intentando reconectar WebSocket...');
                initWebSocket();
                // Reintentar después de reconectar
                setTimeout(() => {
                    if (socket && socketConectado) {
                        emitirCambio(projectId, task, action);
                    }
                }, 1000);
            }
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
        
        try {
            socket.emit('collab-update', payload);
            console.log(`✅ Evento emitido: ${action} - "${task?.name || task?.nombre}" para usuario ${user}`);
            return true;
        } catch (error) {
            console.error('❌ Error emitiendo evento:', error);
            return false;
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
        
        if (typeof renderProjects === 'function') {
            renderProjects();
            console.log('✅ Menú lateral actualizado');
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
    // INTERCEPTAR CAMBIOS EN TAREAS - MEJORADO
    // ============================================
    function interceptarCambiosTareas() {
        console.log('🔄 Interceptando cambios en tareas...');
        
        // Guardar funciones originales
        const originalCreate = window.createNewTask;
        const originalSave = window.saveTaskChanges;
        const originalDrop = window.handleDrop;
        const originalDelete = window.deleteTask;
        
        if (originalCreate) {
            window.createNewTask = function(e) {
                console.log('🔍 createNewTask interceptado');
                const result = originalCreate(e);
                
                // Esperar a que la tarea se haya creado
                setTimeout(() => {
                    try {
                        const project = window.projects[currentProjectIndex];
                        if (project && project.tasks && project.tasks.length > 0) {
                            const task = project.tasks[project.tasks.length - 1];
                            if (task) {
                                console.log('📤 Emitiendo task-created:', task.name);
                                emitirCambio(project.id, task, 'created');
                                
                                // También guardar en localStorage para sincronización
                                const proyectosColab = JSON.parse(localStorage.getItem('proyectos_colaborativos_aceptados') || '[]');
                                const proyectoExistente = proyectosColab.find(p => p.id === project.id);
                                if (proyectoExistente) {
                                    proyectoExistente.tasks = project.tasks;
                                    localStorage.setItem('proyectos_colaborativos_aceptados', JSON.stringify(proyectosColab));
                                }
                            }
                        }
                    } catch (error) {
                        console.error('Error emitiendo task-created:', error);
                    }
                }, 300);
                
                return result;
            };
            console.log('✅ createNewTask interceptado');
        }
        
        if (originalSave) {
            window.saveTaskChanges = function(taskId) {
                console.log('🔍 saveTaskChanges interceptado para:', taskId);
                const result = originalSave(taskId);
                
                setTimeout(() => {
                    try {
                        const project = window.projects[currentProjectIndex];
                        const task = project?.tasks?.find(t => t.id === taskId);
                        if (project && task) {
                            console.log('📤 Emitiendo task-updated:', task.name);
                            emitirCambio(project.id, task, 'updated');
                        }
                    } catch (error) {
                        console.error('Error emitiendo task-updated:', error);
                    }
                }, 300);
                
                return result;
            };
            console.log('✅ saveTaskChanges interceptado');
        }
        
        if (originalDrop) {
            window.handleDrop = function(e) {
                console.log('🔍 handleDrop interceptado');
                const result = originalDrop(e);
                
                setTimeout(() => {
                    try {
                        const project = window.projects[currentProjectIndex];
                        const taskId = e.dataTransfer?.getData('text/plain');
                        if (taskId) {
                            const task = project?.tasks?.find(t => String(t.id) === String(taskId));
                            if (project && task) {
                                console.log('📤 Emitiendo task-moved:', task.name);
                                emitirCambio(project.id, task, 'moved');
                            }
                        }
                    } catch (error) {
                        console.error('Error emitiendo task-moved:', error);
                    }
                }, 300);
                
                return result;
            };
            console.log('✅ handleDrop interceptado');
        }
        
        if (originalDelete) {
            window.deleteTask = function(taskStr) {
                console.log('🔍 deleteTask interceptado');
                let task = null;
                let project = null;
                
                try {
                    // Intentar obtener la tarea antes de eliminarla
                    if (typeof taskStr === 'string') {
                        try {
                            task = JSON.parse(decodeURIComponent(taskStr));
                        } catch(e) {
                            // Si no es JSON, puede ser un ID
                            project = window.projects[currentProjectIndex];
                            task = project?.tasks?.find(t => String(t.id) === String(taskStr));
                            if (task) {
                                taskStr = JSON.stringify(task);
                            }
                        }
                    } else if (typeof taskStr === 'number' || typeof taskStr === 'string') {
                        // Si es un ID, buscar la tarea
                        project = window.projects[currentProjectIndex];
                        task = project?.tasks?.find(t => String(t.id) === String(taskStr));
                        if (task) {
                            taskStr = JSON.stringify(task);
                        }
                    }
                    
                    const result = originalDelete(taskStr);
                    
                    setTimeout(() => {
                        try {
                            if (project && task) {
                                console.log('📤 Emitiendo task-deleted:', task.name);
                                emitirCambio(project.id, task, 'deleted');
                            } else {
                                // Intentar obtener el proyecto actual
                                const currentProject = window.projects[currentProjectIndex];
                                if (currentProject) {
                                    // Buscar por ID en el string
                                    let taskId = taskStr;
                                    try {
                                        const parsed = JSON.parse(decodeURIComponent(taskStr));
                                        taskId = parsed.id;
                                    } catch(e) {}
                                    
                                    const taskToDelete = currentProject.tasks.find(t => String(t.id) === String(taskId));
                                    if (taskToDelete) {
                                        console.log('📤 Emitiendo task-deleted (recuperado):', taskToDelete.name);
                                        emitirCambio(currentProject.id, taskToDelete, 'deleted');
                                    }
                                }
                            }
                        } catch (error) {
                            console.error('Error emitiendo task-deleted:', error);
                        }
                    }, 300);
                    
                    return result;
                } catch (error) {
                    console.error('Error en deleteTask interceptado:', error);
                    // Fallback: ejecutar original
                    return originalDelete(taskStr);
                }
            };
            console.log('✅ deleteTask interceptado');
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
                    ${socketConectado ? ' | 🔗 Conectado' : ' | 🔌 Desconectado'}
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
        console.log('🔄 Forzando sincronización manual...');
        
        // Guardar proyecto actual
        const project = window.projects[currentProjectIndex];
        if (!project) {
            console.error('❌ No hay proyecto seleccionado');
            alert('❌ No hay proyecto seleccionado');
            return;
        }
        
        // Emitir cambio forzado
        if (socket && socketConectado) {
            socket.emit('collab-update', {
                projectId: project.id,
                task: null,
                action: 'sync-request',
                userId: getCurrentUser() || 'Usuario',
                timestamp: new Date().toISOString()
            });
            console.log('📤 Solicitud de sincronización enviada');
            alert('✅ Solicitud de sincronización enviada');
        } else {
            console.error('❌ WebSocket no conectado');
            // Intentar reconectar
            initWebSocket();
            setTimeout(() => {
                if (socket && socketConectado) {
                    window.forceSyncNow();
                } else {
                    alert('❌ No se pudo conectar el WebSocket');
                }
            }, 2000);
            return;
        }
        
        // Sincronizar menú
        window.sincronizarProyectosAlMenu();
        
        // Recargar tareas
        if (typeof renderKanbanTasks === 'function') {
            renderKanbanTasks();
        }
        if (typeof renderProjects === 'function') {
            renderProjects();
        }
        if (typeof updateProjectProgress === 'function') {
            updateProjectProgress();
        }
        
        console.log('✅ Sincronización forzada completada');
    };
    
    // ============================================
    // INICIALIZACIÓN
    // ============================================
    async function init() {
        console.log('🚀 Inicializando sistema de colaboración...');
        
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
        
        console.log('✅ Sistema de colaboración listo');
        console.log('📂 Mis proyectos:', misProyectos.length);
        console.log('📂 Colaborativos:', proyectosColaborativos.length + proyectosAceptadosLocal.length);
        console.log('🔗 WebSocket:', socketConectado ? '✅ Conectado' : '❌ Desconectado');
        console.log('💡 Para forzar sincronización usa: forceSyncNow()');
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100);
    }
    
})();