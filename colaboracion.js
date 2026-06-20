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