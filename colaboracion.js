// ============================================================
// 🚀 SISTEMA DE COLABORACIÓN - VERSIÓN MONGODB COMPATIBLE
// ============================================================

(function() {
    'use strict';
    
    console.log('🔥 SISTEMA DE COLABORACIÓN - VERSIÓN MONGODB');
    
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
            // Primero intentar desde el objeto user
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (user.email) return user.email;
            
            // Luego desde el token JWT
            const token = getAuthToken();
            if (token) {
                try {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    if (payload.email) return payload.email;
                    if (payload.sub) return payload.sub;
                } catch(e) {}
            }
            
            // Fallback
            const email = localStorage.getItem('userEmail');
            if (email) return email;
            
            return null;
        } catch(e) {
            return null;
        }
    }
    
    function getClienteId() {
        return localStorage.getItem('clienteId') || null;
    }
    
    function getHeaders() {
        const token = getAuthToken();
        return {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json'
        };
    }
    
    function getProyectoId(proyecto) {
        return proyecto._id || proyecto.id;
    }
    
    // ============================================
    // WEB SOCKET (SIN CAMBIOS)
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
                reconnectionAttempts: 5
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
                if (data.userId === getCurrentUser()) return;
                sincronizarProyectosAlMenu();
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
    
    function emitirCambio(projectId, task, action) {
        if (socket && socketConectado) {
            socket.emit('collab-update', {
                projectId: projectId,
                task: task,
                action: action,
                userId: getCurrentUser() || 'Usuario',
                timestamp: new Date().toISOString()
            });
            console.log(`📤 Evento emitido: ${action} - "${task?.name}"`);
        }
    }
    
    // ============================================
    // GUARDAR PROYECTO ACEPTADO (MONGODB)
    // ============================================
    function guardarProyectoAceptadoLocal(proyecto) {
        if (!proyecto) return;
        
        let aceptados = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const id = getProyectoId(proyecto);
        const existe = aceptados.some(p => getProyectoId(p) === id);
        
        if (!existe) {
            // Normalizar proyecto para almacenamiento
            const proyectoNormalizado = {
                _id: proyecto._id || proyecto.id,
                id: proyecto.id || proyecto._id,
                name: proyecto.nombre || proyecto.name,
                nombre: proyecto.nombre || proyecto.name,
                clienteId: proyecto.clienteId,
                colaboradores: proyecto.colaboradores || [],
                tasks: proyecto.tasks || [],
                totalProjectTime: proyecto.totalProjectTime || 0
            };
            
            aceptados.push(proyectoNormalizado);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(aceptados));
            console.log('💾 Proyecto guardado localmente:', proyectoNormalizado.name);
        }
        proyectosAceptadosLocal = aceptados;
    }
    
    function cargarProyectosAceptadosLocal() {
        proyectosAceptadosLocal = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        return proyectosAceptadosLocal;
    }
    
    function eliminarProyectoAceptadoLocal(proyectoId) {
        let aceptados = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        aceptados = aceptados.filter(p => getProyectoId(p) !== proyectoId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(aceptados));
        proyectosAceptadosLocal = aceptados;
    }
    
    // ============================================
    // SINCRONIZAR AL MENÚ LATERAL - FUNCIÓN GLOBAL
    // ============================================
    window.sincronizarProyectosAlMenu = function() {
        console.log('🔄 Sincronizando proyectos al menú lateral (MongoDB)...');
        
        cargarProyectosAceptadosLocal();
        
        // Obtener proyectos del backend (si están disponibles)
        const proyectosBackend = window.projects || [];
        
        // Combinar todos los proyectos
        const todosLosProyectos = [...proyectosBackend, ...misProyectos, ...proyectosColaborativos, ...proyectosAceptadosLocal];
        
        // Eliminar duplicados por ID
        const idsVistos = new Set();
        const proyectosUnicos = todosLosProyectos.filter(p => {
            if (!p) return false;
            const id = getProyectoId(p);
            if (!id) return false;
            if (idsVistos.has(id)) return false;
            idsVistos.add(id);
            return true;
        });
        
        if (proyectosUnicos.length === 0) {
            console.log('📭 No hay proyectos para mostrar');
            return;
        }
        
        // Actualizar el array global de proyectos
        window.projects = proyectosUnicos.map(p => ({
            id: getProyectoId(p),
            _id: p._id || p.id,
            name: p.nombre || p.name,
            clienteId: p.clienteId,
            colaboradores: p.colaboradores || [],
            tasks: p.tasks || [],
            totalProjectTime: p.totalProjectTime || 0
        }));
        
        // Guardar en localStorage para persistencia
        localStorage.setItem('projects', JSON.stringify(window.projects));
        
        // Actualizar interfaz
        if (typeof renderProjects === 'function') {
            renderProjects();
            console.log('✅ Menú lateral actualizado con', window.projects.length, 'proyectos');
        }
        if (typeof renderKanbanTasks === 'function') {
            renderKanbanTasks();
        }
        
        // Disparar evento de actualización
        document.dispatchEvent(new CustomEvent('projectsUpdated', { 
            detail: { projects: window.projects } 
        }));
    };
    
    // ============================================
    // CARGAR DATOS DESDE MONGODB
    // ============================================
    async function cargarDatos() {
        const user = getCurrentUser();
        const clienteId = getClienteId();
        
        if (!user && !clienteId) {
            console.log('⏳ No hay usuario o clienteId');
            return;
        }
        
        console.log('📡 Cargando datos para usuario:', user, 'clienteId:', clienteId);
        
        try {
            // 1. Cargar proyectos donde el usuario es dueño
            if (clienteId) {
                const respMis = await fetch(`${API_URL}/projects?clienteId=${clienteId}`, {
                    headers: getHeaders()
                });
                
                if (respMis.ok) {
                    const data = await respMis.json();
                    misProyectos = data.projects || [];
                    console.log('✅ Mis proyectos:', misProyectos.length);
                } else {
                    console.warn('⚠️ Error cargando mis proyectos:', respMis.status);
                }
            }
            
            // 2. Cargar invitaciones pendientes
            const respInv = await fetch(`${API_URL}/colaboracion/invitaciones`, {
                headers: getHeaders()
            });
            
            if (respInv.ok) {
                const data = await respInv.json();
                invitaciones = data.invitaciones || [];
                console.log('✅ Invitaciones:', invitaciones.length);
            }
            
            // 3. Cargar proyectos colaborativos (donde el usuario ha sido invitado)
            const respCol = await fetch(`${API_URL}/colaboracion/proyectos`, {
                headers: getHeaders()
            });
            
            if (respCol.ok) {
                const data = await respCol.json();
                proyectosColaborativos = data.proyectos || [];
                console.log('✅ Proyectos colaborativos:', proyectosColaborativos.length);
            }
            
            // 4. Cargar proyectos aceptados localmente
            cargarProyectosAceptadosLocal();
            
            // 5. Sincronizar al menú
            window.sincronizarProyectosAlMenu();
            updateBadge();
            
        } catch (error) {
            console.error('❌ Error cargando datos:', error);
        }
    }
    
    // ============================================
    // NÚCLEO DE COLABORACIÓN (VERSIÓN MONGODB)
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
                const emailNormalizado = (i.email || '').trim().toLowerCase();
                return emailNormalizado === userNormalizado && i.estado === 'pendiente';
            });
        },
        
        async sendInvitation(proyectoId, email, rol = 'colaborador') {
            const user = getCurrentUser();
            if (!user) {
                alert('❌ Inicia sesión para invitar colaboradores');
                return false;
            }
            
            // Buscar proyecto en mis proyectos o en el array global
            let proyecto = misProyectos.find(p => getProyectoId(p) == proyectoId);
            if (!proyecto) {
                proyecto = window.projects.find(p => getProyectoId(p) == proyectoId);
            }
            
            if (!proyecto) {
                alert('❌ Proyecto no encontrado');
                return false;
            }
            
            const nombreProyecto = proyecto.nombre || proyecto.name;
            
            try {
                const response = await fetch(`${API_URL}/invitations`, {
                    method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify({
                        email: email,
                        proyectoIndex: 0,
                        proyectoNombre: nombreProyecto,
                        rol: rol,
                        proyectoId: getProyectoId(proyecto)
                    })
                });
                
                if (!response.ok) {
                    const error = await response.json().catch(() => ({}));
                    throw new Error(error.error || 'Error al enviar invitación');
                }
                
                const data = await response.json();
                
                // Recargar datos
                await cargarDatos();
                alert(`✅ Invitación enviada a ${email}`);
                updateBadge();
                renderPanel();
                return true;
                
            } catch (error) {
                console.error('❌ Error enviando invitación:', error);
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
                    const error = await response.json().catch(() => ({}));
                    throw new Error(error.error || 'Error al aceptar');
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
                console.error('❌ Error aceptando invitación:', error);
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
                    const error = await response.json().catch(() => ({}));
                    throw new Error(error.error || 'Error al rechazar');
                }
                
                await cargarDatos();
                updateBadge();
                renderPanel();
                return true;
                
            } catch (error) {
                console.error('❌ Error rechazando invitación:', error);
                alert('❌ Error: ' + error.message);
                return false;
            }
        }
    };
    
    // ============================================
    // INTERCEPTAR CAMBIOS EN TAREAS (SIN CAMBIOS)
    // ============================================
    function interceptarCambiosTareas() {
        console.log('🔄 Interceptando cambios en tareas...');
        
        const originalCreate = window.createNewTask;
        const originalSave = window.saveTaskChanges;
        const originalDrop = window.handleDrop;
        const originalDelete = window.deleteTask;
        
        if (originalCreate) {
            window.createNewTask = function(e) {
                const result = originalCreate(e);
                setTimeout(() => {
                    const project = window.projects[currentProjectIndex];
                    if (project && project.tasks && project.tasks.length > 0) {
                        const task = project.tasks[project.tasks.length - 1];
                        emitirCambio(getProyectoId(project), task, 'created');
                    }
                }, 500);
                return result;
            };
        }
        
        if (originalSave) {
            window.saveTaskChanges = function(taskId) {
                const result = originalSave(taskId);
                setTimeout(() => {
                    const project = window.projects[currentProjectIndex];
                    const task = project?.tasks?.find(t => t.id === taskId);
                    if (project && task) {
                        emitirCambio(getProyectoId(project), task, 'updated');
                    }
                }, 500);
                return result;
            };
        }
        
        if (originalDrop) {
            window.handleDrop = function(e) {
                const result = originalDrop(e);
                setTimeout(() => {
                    const project = window.projects[currentProjectIndex];
                    const taskId = e.dataTransfer?.getData('text/plain');
                    const task = project?.tasks?.find(t => String(t.id) === String(taskId));
                    if (project && task) {
                        emitirCambio(getProyectoId(project), task, 'moved');
                    }
                }, 500);
                return result;
            };
        }
        
        if (originalDelete) {
            window.deleteTask = function(taskStr) {
                const task = JSON.parse(decodeURIComponent(taskStr));
                const project = window.projects[currentProjectIndex];
                const result = originalDelete(taskStr);
                if (project && task) {
                    emitirCambio(getProyectoId(project), task, 'deleted');
                }
                return result;
            };
        }
    }
    
    // ============================================
    // INTERFAZ VISUAL (ACTUALIZADA)
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
        
        const puedeInvitar = misProyectosList.length > 0 || window.projects.length > 0;
        
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
        
        // Obtener proyectos para invitar
        const proyectosParaInvitar = [...misProyectosList, ...window.projects].filter(p => {
            // Solo proyectos donde el usuario es dueño
            const clienteId = getClienteId();
            return p.clienteId === clienteId;
        });
        
        const optionsProyectos = proyectosParaInvitar.map(p => 
            `<option value="${getProyectoId(p)}">${p.nombre || p.name}</option>`
        ).join('');
        
        const seccionInvitar = puedeInvitar ? `
            <div style="border-top: 1px solid #334155; padding-top: 16px;">
                <div style="color: #8b5cf6; font-size: 13px; font-weight: 600; margin-bottom: 10px;">➕ Invitar Colaborador</div>
                ${proyectosParaInvitar.length > 0 ? `
                    <div style="margin-bottom: 8px;">
                        <select id="invitarProyectoSelect" style="width: 100%; padding: 10px; background: #0f172a; border: 1px solid #334155; border-radius: 8px; color: white; font-size: 13px;">
                            ${optionsProyectos}
                        </select>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <input type="email" id="invitarEmailInput" placeholder="email@ejemplo.com" style="flex: 1; padding: 10px; background: #0f172a; border: 1px solid #334155; border-radius: 8px; color: white; font-size: 13px;">
                        <button onclick="enviarInvitacion()" style="background: linear-gradient(135deg, #8b5cf6, #6d28d9); color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600;">
                            Enviar
                        </button>
                    </div>
                    <div id="invitarMensaje" style="margin-top: 8px; font-size: 12px; text-align: center;"></div>
                ` : `
                    <div style="text-align: center; color: #64748b; font-size: 13px; padding: 10px;">
                        💡 Crea un proyecto en el menú lateral para poder invitar colaboradores.
                    </div>
                `}
            </div>
        ` : `
            <div style="border-top: 1px solid #334155; padding-top: 16px; text-align: center; color: #64748b; font-size: 13px;">
                💡 Crea un proyecto en el menú lateral para poder invitar colaboradores.
            </div>
        `;
        
        // Construir panel con todos los proyectos
        const todosProyectos = [...misProyectosList, ...colaborativosList, ...aceptadosLocal];
        const proyectosUnicos = todosProyectos.filter((p, i, arr) => {
            const id = getProyectoId(p);
            return arr.findIndex(x => getProyectoId(x) === id) === i;
        });
        
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
                <!-- Invitaciones Pendientes -->
                <div style="margin-bottom: 20px;">
                    <div style="color: #f59e0b; font-size: 13px; font-weight: 600; margin-bottom: 10px;">📩 Invitaciones Pendientes</div>
                    ${pendientes.length === 0 ? `
                        <div style="text-align: center; padding: 20px; color: #64748b; font-size: 13px;">No tienes invitaciones pendientes</div>
                    ` : pendientes.map(inv => `
                        <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 12px 16px; margin-bottom: 10px; border-left: 4px solid #f59e0b;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600;">${inv.proyectoNombre || inv.proyecto?.name || 'Proyecto'}</div>
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
                                    <div style="font-weight: 600;">${p.nombre || p.name}</div>
                                    <div style="font-size: 11px; color: #94a3b8;">
                                        ${p.colaboradores?.length || 0} colaboradores
                                    </div>
                                </div>
                                <span style="color: #8b5cf6; font-size: 11px; font-weight: 600;">👑 DUEÑO</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <!-- PROYECTOS COLABORATIVOS -->
                <div style="margin-bottom: 20px;">
                    <div style="color: #10b981; font-size: 13px; font-weight: 600; margin-bottom: 10px;">📂 Proyectos Colaborativos</div>
                    ${colaborativosList.length === 0 && aceptadosLocal.length === 0 ? `
                        <div style="text-align: center; padding: 20px; color: #64748b; font-size: 13px;">No estás en proyectos colaborativos</div>
                    ` : `
                        ${colaborativosList.map(p => `
                            <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 12px 16px; margin-bottom: 8px; border-left: 4px solid #10b981;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="font-weight: 600;">${p.nombre || p.name}</div>
                                        <div style="font-size: 11px; color: #94a3b8;">
                                            ${p.colaboradores?.length || 0} colaboradores
                                        </div>
                                    </div>
                                    <span style="color: #10b981; font-size: 11px; font-weight: 600;">✅ Colaborador</span>
                                </div>
                            </div>
                        `).join('')}
                        ${aceptadosLocal.filter(p => !colaborativosList.some(c => getProyectoId(c) === getProyectoId(p))).map(p => `
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
                    <br><span style="font-size: 9px; color: #475569;">Conectado a MongoDB</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        panelAbierto = true;
        
        // ============================================
        // FUNCIONES GLOBALES PARA EL PANEL
        // ============================================
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
    // INICIALIZACIÓN
    // ============================================
    async function init() {
        console.log('🚀 Inicializando sistema de colaboración (MongoDB)...');
        
        // Asegurar que la función sincronizarProyectosAlMenu esté disponible
        window.sincronizarProyectosAlMenu = window.sincronizarProyectosAlMenu || function() {
            console.log('🔄 Sincronizando proyectos desde el menú...');
            if (typeof renderProjects === 'function') {
                renderProjects();
            }
            if (typeof renderKanbanTasks === 'function') {
                renderKanbanTasks();
            }
        };
        
        // Cargar datos
        await cargarDatos();
        
        // Iniciar WebSocket
        initWebSocket();
        
        // Crear botón flotante
        createFloatingButton();
        
        // Interceptar cambios en tareas
        setTimeout(interceptarCambiosTareas, 1000);
        
        // Escuchar cambios en el proyecto seleccionado
        const originalSelectProject = window.selectProject;
        if (originalSelectProject) {
            window.selectProject = function(index) {
                const result = originalSelectProject(index);
                if (socket && socketConectado) {
                    socket.emit('join-project', index);
                }
                return result;
            };
        }
        
        // Escuchar eventos de sincronización
        document.addEventListener('projectsUpdated', function(e) {
            console.log('📡 Evento projectsUpdated recibido');
            if (typeof renderProjects === 'function') {
                renderProjects();
            }
        });
        
        console.log('✅ Sistema de colaboración MongoDB listo');
        console.log('📂 Mis proyectos:', misProyectos.length);
        console.log('📂 Colaborativos:', proyectosColaborativos.length + proyectosAceptadosLocal.length);
        console.log('🔗 WebSocket:', socketConectado ? '✅ Conectado' : '❌ Desconectado');
    }
    
    // Inicializar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100);
    }
    
})();