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
            
            return localStorage.getItem('userEmail') || null;
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
        return proyecto?._id || proyecto?.id;
    }
    
    // ============================================
    // FUNCIÓN PRINCIPAL: CARGAR TODOS LOS PROYECTOS
    // ============================================
    window.sincronizarProyectosColaborativos = async function() {
        console.log('🔄 SINCRONIZANDO PROYECTOS COLABORATIVOS...');
        
        const token = getAuthToken();
        const clienteId = getClienteId();
        const userEmail = getCurrentUser();
        
        if (!token) {
            console.error('❌ No hay token de autenticación');
            alert('❌ Inicia sesión primero');
            return false;
        }
        
        try {
            // 1. Cargar proyectos del usuario (dueño)
            let misProyectos = [];
            if (clienteId) {
                console.log('📡 Cargando proyectos del dueño...');
                const resp = await fetch(`${API_URL}/projects?clienteId=${clienteId}`, {
                    headers: getHeaders()
                });
                if (resp.ok) {
                    const data = await resp.json();
                    misProyectos = data.projects || [];
                    console.log('✅ Mis proyectos:', misProyectos.length);
                }
            }
            
            // 2. Cargar proyectos colaborativos
            let proyectosColaborativos = [];
            console.log('📡 Cargando proyectos colaborativos...');
            try {
                const resp = await fetch(`${API_URL}/colaboracion/proyectos`, {
                    headers: getHeaders()
                });
                if (resp.ok) {
                    const data = await resp.json();
                    proyectosColaborativos = data.proyectos || [];
                    console.log('✅ Proyectos colaborativos (backend):', proyectosColaborativos.length);
                }
            } catch (e) {
                console.warn('⚠️ Error en /colaboracion/proyectos:', e.message);
            }
            
            // 3. Cargar proyectos del usuario específico
            let proyectosUser = [];
            if (userEmail) {
                try {
                    const resp = await fetch(`${API_URL}/user/projects`, {
                        headers: getHeaders()
                    });
                    if (resp.ok) {
                        const data = await resp.json();
                        proyectosUser = data.collaboratedProjects || [];
                        console.log('✅ Proyectos user/projects:', proyectosUser.length);
                    }
                } catch (e) {
                    console.warn('⚠️ Error en /user/projects:', e.message);
                }
            }
            
            // 4. Cargar proyectos guardados localmente
            let proyectosLocales = [];
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                proyectosLocales = stored ? JSON.parse(stored) : [];
                console.log('✅ Proyectos locales:', proyectosLocales.length);
            } catch (e) {
                console.warn('⚠️ Error cargando locales:', e.message);
            }
            
            // 5. COMBINAR TODOS
            const todos = [...misProyectos, ...proyectosColaborativos, ...proyectosUser, ...proyectosLocales];
            console.log('📊 Total antes de filtrar:', todos.length);
            
            // 6. Eliminar duplicados
            const idsVistos = new Set();
            const proyectosUnicos = todos.filter(p => {
                if (!p) return false;
                const id = getProyectoId(p);
                if (!id) return false;
                if (idsVistos.has(id)) return false;
                idsVistos.add(id);
                return true;
            });
            
            console.log('📊 Proyectos únicos:', proyectosUnicos.length);
            
            // 7. ACTUALIZAR window.projects
            if (proyectosUnicos.length > 0) {
                window.projects = proyectosUnicos.map(p => ({
                    id: getProyectoId(p),
                    _id: p._id || p.id,
                    name: p.nombre || p.name,
                    clienteId: p.clienteId,
                    colaboradores: p.colaboradores || [],
                    tasks: p.tasks || [],
                    totalProjectTime: p.totalProjectTime || 0
                }));
                
                localStorage.setItem('projects', JSON.stringify(window.projects));
                console.log('✅ window.projects actualizado con', window.projects.length, 'proyectos');
                
                // 8. ACTUALIZAR INTERFAZ
                if (typeof renderProjects === 'function') {
                    renderProjects();
                }
                if (typeof renderKanbanTasks === 'function') {
                    renderKanbanTasks();
                }
                
                console.log('📋 PROYECTOS:');
                window.projects.forEach((p, i) => {
                    console.log('  ' + (i+1) + '. ' + p.name + ' (ID: ' + p.id + ')');
                });
                
                alert('✅ ' + window.projects.length + ' proyectos sincronizados');
                return true;
            } else {
                console.log('📭 No hay proyectos para mostrar');
                alert('📭 No hay proyectos disponibles');
                return false;
            }
            
        } catch (error) {
            console.error('❌ Error:', error);
            alert('❌ Error al sincronizar: ' + error.message);
            return false;
        }
    };
    
    // ============================================
    // WEB SOCKET - SINCRONIZACIÓN EN TIEMPO REAL
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
            
            // Escuchar eventos de colaboración
            socket.on('collab-update', function(data) {
                console.log('📡 Evento colaborativo recibido:', data);
                if (data.userId === getCurrentUser()) return;
                window.sincronizarProyectosColaborativos();
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
    // GUARDAR PROYECTO ACEPTADO LOCALMENTE
    // ============================================
    function guardarProyectoAceptadoLocal(proyecto) {
        if (!proyecto) return;
        
        let aceptados = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const id = getProyectoId(proyecto);
        const existe = aceptados.some(p => getProyectoId(p) === id);
        
        if (!existe) {
            aceptados.push({
                _id: proyecto._id || proyecto.id,
                id: proyecto.id || proyecto._id,
                name: proyecto.nombre || proyecto.name,
                clienteId: proyecto.clienteId,
                colaboradores: proyecto.colaboradores || [],
                tasks: proyecto.tasks || [],
                totalProjectTime: proyecto.totalProjectTime || 0
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(aceptados));
            console.log('💾 Proyecto guardado localmente');
        }
        proyectosAceptadosLocal = aceptados;
    }
    
    // ============================================
    // CARGAR INVITACIONES
    // ============================================
    async function cargarInvitaciones() {
        try {
            const resp = await fetch(`${API_URL}/colaboracion/invitaciones`, {
                headers: getHeaders()
            });
            if (resp.ok) {
                const data = await resp.json();
                invitaciones = data.invitaciones || [];
                console.log('✅ Invitaciones:', invitaciones.length);
                updateBadge();
            }
        } catch (error) {
            console.error('❌ Error cargando invitaciones:', error);
        }
    }
    
    // ============================================
    // INTERCEPTAR CAMBIOS EN TAREAS
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
        
        console.log('✅ Cambios en tareas interceptados');
    }
    
    // ============================================
    // CORE - FUNCIONES PRINCIPALES
    // ============================================
    const Core = {
        getMyInvitations: function() {
            const user = getCurrentUser();
            if (!user) return [];
            const userNormalizado = user.trim().toLowerCase();
            return invitaciones.filter(i => {
                const email = (i.email || '').trim().toLowerCase();
                return email === userNormalizado && i.estado === 'pendiente';
            });
        },
        
        async sendInvitation(proyectoId, email) {
            const user = getCurrentUser();
            if (!user) {
                alert('❌ Inicia sesión para invitar');
                return false;
            }
            
            const proyecto = window.projects.find(p => getProyectoId(p) == proyectoId);
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
                        rol: 'colaborador',
                        proyectoId: getProyectoId(proyecto)
                    })
                });
                
                if (!response.ok) {
                    const error = await response.json().catch(() => ({}));
                    throw new Error(error.error || 'Error al enviar');
                }
                
                const data = await response.json();
                await cargarInvitaciones();
                alert(`✅ Invitación enviada a ${email}`);
                updateBadge();
                renderPanel();
                return true;
                
            } catch (error) {
                console.error('❌ Error:', error);
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
                
                await cargarInvitaciones();
                await window.sincronizarProyectosColaborativos();
                
                alert('✅ Invitación aceptada');
                updateBadge();
                renderPanel();
                
                return true;
                
            } catch (error) {
                console.error('❌ Error:', error);
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
                
                await cargarInvitaciones();
                updateBadge();
                renderPanel();
                return true;
                
            } catch (error) {
                console.error('❌ Error:', error);
                alert('❌ Error: ' + error.message);
                return false;
            }
        }
    };
    
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
        
        await cargarInvitaciones();
        
        const pendientes = Core.getMyInvitations();
        const proyectosActuales = window.projects || [];
        
        const misProyectos = proyectosActuales.filter(p => p.clienteId === getClienteId());
        const colaborativos = proyectosActuales.filter(p => p.clienteId !== getClienteId());
        
        const puedeInvitar = misProyectos.length > 0;
        
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
        
        const optionsProyectos = misProyectos.map(p => 
            `<option value="${getProyectoId(p)}">${p.name}</option>`
        ).join('');
        
        const seccionInvitar = puedeInvitar ? `
            <div style="border-top: 1px solid #334155; padding-top: 16px;">
                <div style="color: #8b5cf6; font-size: 13px; font-weight: 600; margin-bottom: 10px;">➕ Invitar Colaborador</div>
                ${misProyectos.length > 0 ? `
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
                        💡 Crea un proyecto en el menú lateral para invitar colaboradores.
                    </div>
                `}
            </div>
        ` : `
            <div style="border-top: 1px solid #334155; padding-top: 16px; text-align: center; color: #64748b; font-size: 13px;">
                💡 Crea un proyecto en el menú lateral para invitar colaboradores.
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
                        <div style="text-align: center; padding: 20px; color: #64748b; font-size: 13px;">No tienes invitaciones pendientes</div>
                    ` : pendientes.map(inv => `
                        <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 12px 16px; margin-bottom: 10px; border-left: 4px solid #f59e0b;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600;">${inv.proyectoNombre || 'Proyecto'}</div>
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
                
                <!-- PROYECTOS COLABORATIVOS -->
                <div style="margin-bottom: 20px;">
                    <div style="color: #10b981; font-size: 13px; font-weight: 600; margin-bottom: 10px;">📂 Proyectos Colaborativos</div>
                    ${colaborativos.length === 0 ? `
                        <div style="text-align: center; padding: 20px; color: #64748b; font-size: 13px;">No estás en proyectos colaborativos</div>
                    ` : colaborativos.map(p => `
                        <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 12px 16px; margin-bottom: 8px; border-left: 4px solid #10b981;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600;">${p.name}</div>
                                    <div style="font-size: 11px; color: #94a3b8;">
                                        ${p.colaboradores?.length || 0} colaboradores
                                    </div>
                                </div>
                                <span style="color: #10b981; font-size: 11px; font-weight: 600;">✅ Colaborador</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                ${seccionInvitar}
                
                <div style="margin-top: 10px; padding: 10px; background: rgba(255,255,255,0.03); border-radius: 8px; font-size: 10px; color: #64748b; border: 1px solid #1e293b; text-align: center;">
                    🔄 ${misProyectos.length} propios | ${colaborativos.length} colaborativos
                    <br><span style="font-size: 9px; color: #475569;">Conectado a MongoDB</span>
                    <br><button onclick="window.sincronizarProyectosColaborativos()" style="background: none; border: 1px solid #475569; color: #94a3b8; padding: 4px 12px; border-radius: 4px; cursor: pointer; font-size: 10px; margin-top: 4px;">
                        🔄 Recargar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        panelAbierto = true;
        
        // Funciones globales
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
                await window.sincronizarProyectosColaborativos();
                renderPanel();
            }
        };
    }
    
    // ============================================
    // INICIALIZACIÓN
    // ============================================
    async function init() {
        console.log('🚀 Inicializando sistema de colaboración (MongoDB)...');
        
        // Asegurar que la función esté disponible
        if (typeof window.sincronizarProyectosColaborativos === 'undefined') {
            window.sincronizarProyectosColaborativos = async function() {
                console.log('🔄 Función de sincronización cargada');
                return false;
            };
        }
        
        // Cargar proyectos
        await window.sincronizarProyectosColaborativos();
        
        // Cargar invitaciones
        await cargarInvitaciones();
        
        // Iniciar WebSocket
        initWebSocket();
        
        // Crear botón flotante
        createFloatingButton();
        
        // Interceptar cambios en tareas
        setTimeout(interceptarCambiosTareas, 1000);
        
        // Sincronizar cada 30 segundos
        setInterval(() => {
            window.sincronizarProyectosColaborativos();
        }, 30000);
        
        console.log('✅ Sistema de colaboración MongoDB listo');
        console.log('📂 Proyectos totales:', window.projects?.length || 0);
        console.log('🔗 WebSocket:', socketConectado ? '✅ Conectado' : '❌ Desconectado');
        console.log('💡 Usa sincronizarProyectosColaborativos() para sincronizar manualmente');
    }
    
    // Inicializar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100);
    }
    
})();