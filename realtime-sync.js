// ============================================
// 🚀 SISTEMA DE COLABORACIÓN EN TIEMPO REAL
// Archivo externo - no modifica script.js original
// ============================================

(function() {
    'use strict';

    let socket = null;
    let isConnected = false;
    let currentClienteId = null;
    let currentProjectIndex = null;
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 10;

    // ========== OBTENER CONFIGURACIÓN ==========
    function getClienteId() {
        return localStorage.getItem('clienteId');
    }

    function getCurrentProjectIndex() {
        if (typeof currentProjectIndex !== 'undefined') {
            return currentProjectIndex;
        }
        const idx = localStorage.getItem('currentProjectIndex');
        return idx !== null ? parseInt(idx) : 0;
    }

    // ========== CONEXIÓN WEBSOCKET ==========
    function connect() {
        const clienteId = getClienteId();
        if (!clienteId) {
            console.warn('⚠️ [RealTime] No hay clienteId, no se puede conectar');
            return;
        }

        if (socket && (socket.connected || socket.connecting)) {
            console.log('ℹ️ [RealTime] Ya conectado o conectando');
            return;
        }

        const token = localStorage.getItem('authToken');
        if (!token) {
            console.warn('⚠️ [RealTime] No hay token de autenticación');
            return;
        }

        currentClienteId = clienteId;
        const backendUrl = 'https://mi-sistema-proyectos-backend-4.onrender.com';

        console.log('🔌 [RealTime] Conectando a', backendUrl, 'con clienteId:', clienteId);

        socket = io(backendUrl, {
            transports: ['websocket', 'polling'],
            auth: { token: token },
            reconnection: true,
            reconnectionAttempts: maxReconnectAttempts,
            reconnectionDelay: 1000,
            timeout: 10000
        });

        socket.on('connect', () => {
            console.log('✅ [RealTime] Conectado. Socket ID:', socket.id);
            isConnected = true;
            reconnectAttempts = 0;
            updateConnectionIndicator(true);

            const projectIdx = getCurrentProjectIndex();
            socket.emit('join-project', String(projectIdx));
            console.log('📡 Unido a proyecto:', projectIdx);
        });

        socket.on('disconnect', (reason) => {
            console.warn('⚠️ [RealTime] Desconectado:', reason);
            isConnected = false;
            updateConnectionIndicator(false);
        });

        socket.on('connect_error', (error) => {
            console.error('❌ [RealTime] Error de conexión:', error.message);
            isConnected = false;
            updateConnectionIndicator(false);
        });

        // ========== ESCUCHAR EVENTOS REMOTOS ==========
        socket.on('task-created', (data) => {
            console.log('📡 [RealTime] Tarea CREADA remotamente:', data);
            handleRemoteTaskChange('created', data);
        });

        socket.on('task-updated', (data) => {
            console.log('📡 [RealTime] Tarea ACTUALIZADA remotamente:', data);
            handleRemoteTaskChange('updated', data);
        });

        socket.on('task-deleted', (data) => {
            console.log('📡 [RealTime] Tarea ELIMINADA remotamente:', data);
            handleRemoteTaskChange('deleted', data);
        });

        socket.on('task-moved', (data) => {
            console.log('📡 [RealTime] Tarea MOVIDA remotamente:', data);
            handleRemoteTaskChange('moved', data);
        });

        socket.on('welcome', (data) => {
            console.log('👋 [RealTime] Bienvenida:', data.message);
        });
    }

    // ========== MANEJAR CAMBIOS REMOTOS ==========
    function handleRemoteTaskChange(action, data) {
        console.log(`🔄 [RealTime] Procesando ${action}...`, data);

        // Verificar que el cambio corresponda al proyecto actual
        const remoteProjectId = data.projectId !== undefined ? String(data.projectId) : null;
        const currentProj = String(getCurrentProjectIndex());

        if (remoteProjectId && remoteProjectId !== currentProj) {
            console.log(`ℹ️ [RealTime] Cambio en otro proyecto (${remoteProjectId} vs ${currentProj}), ignorando`);
            return;
        }

        if (typeof projects === 'undefined' || !Array.isArray(projects)) {
            console.warn('⚠️ [RealTime] projects no disponible');
            return;
        }

        let projectIdx = getCurrentProjectIndex();
        if (data.projectIndex !== undefined) {
            projectIdx = data.projectIndex;
        }

        if (!projects[projectIdx]) {
            console.warn('⚠️ [RealTime] Proyecto no encontrado:', projectIdx);
            return;
        }

        const project = projects[projectIdx];
        const taskId = data.taskId || data.task?.id;
        let changed = false;

        switch (action) {
            case 'created':
                if (data.task && !project.tasks.some(t => t.id === data.task.id)) {
                    project.tasks.push(data.task);
                    console.log('✅ [RealTime] Tarea agregada localmente:', data.task.name);
                    changed = true;
                }
                break;

            case 'updated':
                const taskIndex = project.tasks.findIndex(t => t.id === taskId);
                if (taskIndex !== -1 && data.task) {
                    Object.assign(project.tasks[taskIndex], data.task);
                    console.log('✅ [RealTime] Tarea actualizada localmente:', data.task.name);
                    changed = true;
                }
                break;

            case 'deleted':
                const delIndex = project.tasks.findIndex(t => t.id === taskId);
                if (delIndex !== -1) {
                    const taskName = project.tasks[delIndex].name;
                    project.tasks.splice(delIndex, 1);
                    console.log('✅ [RealTime] Tarea eliminada localmente:', taskName);
                    changed = true;
                }
                break;

            case 'moved':
                const moveTask = project.tasks.find(t => t.id === taskId);
                if (moveTask && data.newStatus && moveTask.status !== data.newStatus) {
                    moveTask.status = data.newStatus;
                    if (data.newStatus === 'completed') moveTask.progress = 100;
                    else if (data.newStatus === 'inProgress' && (moveTask.progress === undefined || moveTask.progress < 50)) moveTask.progress = 50;
                    else if (data.newStatus === 'pending') moveTask.progress = 0;
                    console.log('✅ [RealTime] Tarea movida a', data.newStatus);
                    changed = true;
                }
                break;
        }

        if (changed) {
            // Guardar en localStorage
            localStorage.setItem('projects', JSON.stringify(projects));
            // Forzar actualización de la UI
            forceRefreshUI();
        }
    }

    // ========== FORZAR ACTUALIZACIÓN DE UI ==========
    function forceRefreshUI() {
        console.log('🔄 [RealTime] Forzando actualización de UI...');
        
        // Determinar qué vista está activa
        let activeView = 'board';
        const views = {
            board: document.getElementById('boardView'),
            list: document.getElementById('listView'),
            calendar: document.getElementById('calendarView'),
            gantt: document.getElementById('ganttView'),
            dashboard: document.getElementById('dashboardView'),
            reports: document.getElementById('reportsView')
        };
        
        for (const [view, el] of Object.entries(views)) {
            if (el && el.classList && el.classList.contains('active')) {
                activeView = view;
                break;
            }
        }
        
        console.log('   Vista activa:', activeView);
        
        // Actualizar según la vista
        switch (activeView) {
            case 'board':
                if (typeof renderKanbanTasks === 'function') {
                    renderKanbanTasks();
                    console.log('   ✅ renderKanbanTasks ejecutado');
                }
                break;
            case 'list':
                if (typeof renderListTasks === 'function') {
                    renderListTasks();
                    console.log('   ✅ renderListTasks ejecutado');
                }
                break;
            case 'calendar':
                if (typeof refreshCalendar === 'function') {
                    refreshCalendar();
                } else if (typeof renderCalendar === 'function') {
                    renderCalendar();
                }
                console.log('   ✅ Calendario actualizado');
                break;
            case 'dashboard':
                if (typeof renderDashboard === 'function') {
                    renderDashboard();
                    console.log('   ✅ renderDashboard ejecutado');
                }
                break;
            case 'reports':
                if (typeof generateReports === 'function') {
                    generateReports();
                    console.log('   ✅ generateReports ejecutado');
                }
                break;
            default:
                if (typeof renderKanbanTasks === 'function') {
                    renderKanbanTasks();
                    console.log('   ✅ renderKanbanTasks (default) ejecutado');
                }
        }
        
        // Actualizar estadísticas y gráficos auxiliares
        if (typeof updateStatistics === 'function') updateStatistics();
        if (typeof generatePieChart === 'function' && typeof getStats === 'function') {
            generatePieChart(getStats());
        }
        if (typeof updateProjectProgress === 'function') updateProjectProgress();
        if (typeof actualizarContadoresColumnas === 'function') actualizarContadoresColumnas();
    }

    // ========== INDICADOR VISUAL DE CONEXIÓN ==========
    function updateConnectionIndicator(connected) {
        let indicator = document.getElementById('realtimeIndicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'realtimeIndicator';
            indicator.style.cssText = `
                position: fixed;
                bottom: 10px;
                left: 10px;
                background: rgba(0,0,0,0.7);
                color: white;
                padding: 5px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-family: monospace;
                z-index: 9999;
                pointer-events: none;
                backdrop-filter: blur(5px);
                transition: all 0.3s;
            `;
            document.body.appendChild(indicator);
        }
        
        if (connected) {
            indicator.innerHTML = '🟢 Tiempo real activo';
            indicator.style.background = 'rgba(0,100,0,0.8)';
        } else {
            indicator.innerHTML = '🔴 Sin conexión en tiempo real';
            indicator.style.background = 'rgba(100,0,0,0.8)';
        }
    }

    // ========== EMITIR EVENTOS LOCALES ==========
    function emitTaskCreated(projectIdx, task) {
        if (!socket || !isConnected) {
            console.warn('⚠️ [RealTime] No conectado, no se emite task-created');
            return;
        }
        const data = {
            projectId: String(projectIdx),
            projectIndex: projectIdx,
            task: task,
            clienteId: currentClienteId,
            timestamp: new Date().toISOString()
        };
        socket.emit('task-created', data);
        console.log('📤 [RealTime] Emitido task-created para proyecto', projectIdx);
    }

    function emitTaskUpdated(projectIdx, taskId, taskData) {
        if (!socket || !isConnected) return;
        socket.emit('task-updated', {
            projectId: String(projectIdx),
            projectIndex: projectIdx,
            taskId: taskId,
            task: taskData,
            clienteId: currentClienteId,
            timestamp: new Date().toISOString()
        });
        console.log('📤 [RealTime] Emitido task-updated');
    }

    function emitTaskDeleted(projectIdx, taskId, taskName) {
        if (!socket || !isConnected) return;
        socket.emit('task-deleted', {
            projectId: String(projectIdx),
            projectIndex: projectIdx,
            taskId: taskId,
            taskName: taskName,
            clienteId: currentClienteId,
            timestamp: new Date().toISOString()
        });
        console.log('📤 [RealTime] Emitido task-deleted');
    }

    function emitTaskMoved(projectIdx, taskId, newStatus) {
        if (!socket || !isConnected) return;
        socket.emit('task-moved', {
            projectId: String(projectIdx),
            projectIndex: projectIdx,
            taskId: taskId,
            newStatus: newStatus,
            clienteId: currentClienteId,
            timestamp: new Date().toISOString()
        });
        console.log('📤 [RealTime] Emitido task-moved');
    }

    // ========== INTERCEPTAR FUNCIONES ORIGINALES ==========
    function interceptFunctions() {
        if (typeof window.createNewTask === 'function') {
            const originalCreate = window.createNewTask;
            window.createNewTask = function(e) {
                const result = originalCreate.apply(this, arguments);
                setTimeout(() => {
                    const projectIdx = getCurrentProjectIndex();
                    const project = projects[projectIdx];
                    if (project && project.tasks && project.tasks.length > 0) {
                        const lastTask = project.tasks[project.tasks.length - 1];
                        emitTaskCreated(projectIdx, lastTask);
                    }
                }, 200);
                return result;
            };
            console.log('✅ [RealTime] createNewTask interceptada');
        }

        if (typeof window.saveTaskChanges === 'function') {
            const originalSave = window.saveTaskChanges;
            window.saveTaskChanges = function(taskId) {
                const result = originalSave.apply(this, arguments);
                setTimeout(() => {
                    const projectIdx = getCurrentProjectIndex();
                    const project = projects[projectIdx];
                    const task = project?.tasks?.find(t => t.id === taskId);
                    if (task) {
                        emitTaskUpdated(projectIdx, taskId, task);
                    }
                }, 200);
                return result;
            };
            console.log('✅ [RealTime] saveTaskChanges interceptada');
        }

        if (typeof window.deleteTask === 'function') {
            const originalDelete = window.deleteTask;
            window.deleteTask = function(taskStr) {
                let task;
                try {
                    task = typeof taskStr === 'string' ? JSON.parse(decodeURIComponent(taskStr)) : taskStr;
                } catch(e) { task = taskStr; }
                const taskId = task?.id;
                const taskName = task?.name;
                const result = originalDelete.apply(this, arguments);
                setTimeout(() => {
                    const projectIdx = getCurrentProjectIndex();
                    emitTaskDeleted(projectIdx, taskId, taskName);
                }, 200);
                return result;
            };
            console.log('✅ [RealTime] deleteTask interceptada');
        }

        if (typeof window.handleDrop === 'function') {
            const originalDrop = window.handleDrop;
            window.handleDrop = function(e) {
                const result = originalDrop.apply(this, arguments);
                setTimeout(() => {
                    const taskId = parseInt(e.dataTransfer?.getData('taskId'));
                    if (taskId) {
                        const projectIdx = getCurrentProjectIndex();
                        const project = projects[projectIdx];
                        const task = project?.tasks?.find(t => t.id === taskId);
                        if (task) {
                            emitTaskMoved(projectIdx, taskId, task.status);
                        }
                    }
                }, 200);
                return result;
            };
            console.log('✅ [RealTime] handleDrop interceptada');
        }
    }

    // ========== INICIALIZACIÓN ==========
    function init() {
        console.log('🚀 [RealTime] Inicializando sistema de colaboración...');
        
        // Esperar a que las funciones principales estén listas
        const waitForFunctions = setInterval(() => {
            if (typeof projects !== 'undefined' && typeof renderKanbanTasks === 'function') {
                clearInterval(waitForFunctions);
                connect();
                interceptFunctions();
                console.log('✅ [RealTime] Funciones interceptadas correctamente');
            }
        }, 500);
        
        // Reconectar cuando cambie el proyecto
        if (typeof window.selectProject === 'function') {
            const originalSelect = window.selectProject;
            window.selectProject = function(index) {
                const result = originalSelect.apply(this, arguments);
                setTimeout(() => {
                    currentProjectIndex = index;
                    if (socket && isConnected) {
                        socket.emit('join-project', String(index));
                        console.log('📡 Cambiado a proyecto:', index);
                    }
                }, 100);
                return result;
            };
        }
    }

    // Exponer funciones para depuración
    window.realtimeSync = {
        connect: connect,
        status: () => ({ connected: isConnected, socketId: socket?.id, projectIndex: getCurrentProjectIndex() }),
        emit: (event, data) => { if (socket && isConnected) socket.emit(event, data); }
    };

    init();
})();