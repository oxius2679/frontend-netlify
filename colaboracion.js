// ============================================================
// 🚀 SISTEMA DE COLABORACIÓN - CON SINCRONIZACIÓN EN TIEMPO REAL
// ============================================================

(function() {
    'use strict';
    
    console.log('🔥 SISTEMA DE COLABORACIÓN - CON SINCRO EN TIEMPO REAL');
    
    const API_URL = 'https://mi-sistema-proyectos-backend-4.onrender.com/api';
    const STORAGE_KEY = 'proyectos_colaborativos_aceptados';
    let socket = null;
    
    let invitaciones = [];
    let misProyectos = [];
    let proyectosColaborativos = [];
    let proyectosAceptadosLocal = [];
    let panelAbierto = false;
    
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
    // 🔥 WEBSOCKET PARA SINCRONIZACIÓN EN TIEMPO REAL
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
            });
            
            // Escuchar cambios en proyectos colaborativos
            socket.on('collab-project-updated', function(data) {
                console.log('📡 Cambio en proyecto colaborativo:', data);
                handleCollabChange(data);
            });
            
            socket.on('disconnect', function() {
                console.log('🔌 WebSocket desconectado (colaboración)');
            });
            
            socket.on('connect_error', function(error) {
                console.error('❌ Error WebSocket:', error);
            });
            
        } catch (error) {
            console.error('❌ Error iniciando WebSocket:', error);
        }
    }
    
    function handleCollabChange(data) {
        // Actualizar el proyecto en projects
        const projectIndex = window.projects.findIndex(p => p.id === data.projectId);
        if (projectIndex !== -1) {
            if (data.action === 'task-created' || data.action === 'task-updated' || data.action === 'task-moved') {
                // Actualizar tareas
                const project = window.projects[projectIndex];
                const taskIndex = project.tasks.findIndex(t => t.id === data.task.id);
                if (taskIndex !== -1) {
                    project.tasks[taskIndex] = data.task;
                } else {
                    project.tasks.push(data.task);
                }
                
                // Guardar y actualizar
                localStorage.setItem('projects', JSON.stringify(window.projects));
                
                // Actualizar vistas
                if (typeof renderKanbanTasks === 'function') {
                    renderKanbanTasks();
                }
                if (typeof renderListTasks === 'function') {
                    renderListTasks();
                }
                if (typeof forceRefreshCalendar === 'function') {
                    forceRefreshCalendar();
                }
                
                showNotification(`📡 ${data.userName || 'Alguien'} ${data.actionText || 'actualizó'} "${data.task?.name || 'una tarea'}"`);
            }
        }
    }
    
    // ============================================
    // 🔥 EMITIR CAMBIOS A OTROS USUARIOS
    // ============================================
    function emitCollabChange(projectId, action, task, actionText) {
        if (socket && socket.connected) {
            socket.emit('collab-project-updated', {
                projectId: projectId,
                action: action,
                task: task,
                actionText: actionText || action,
                userName: getCurrentUser() || 'Usuario',
                timestamp: new Date().toISOString()
            });
            console.log('📤 Cambio emitido a colaboradores:', action, task?.name);
        }
    }
    
    // ============================================
    // GUARDAR Y CARGAR PROYECTOS ACEPTADOS EN LOCAL
    // ============================================
    function guardarProyectoAceptadoLocal(proyecto) {
        let aceptados = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const existe = aceptados.some(p => p.id === proyecto.id || p._id === proyecto._id);
        if (!existe) {
            aceptados.push(proyecto);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(aceptados));
            console.log('💾 Proyecto guardado en localStorage:', proyecto.nombre || proyecto.name);
        }
        proyectosAceptadosLocal = aceptados;
    }
    
    function cargarProyectosAceptadosLocal() {
        proyectosAceptadosLocal = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        console.log('📂 Proyectos aceptados locales:', proyectosAceptadosLocal.length);
        return proyectosAceptadosLocal;
    }
    
    // ============================================
    // Sincronizar proyectos al menú lateral
    // ============================================
    function sincronizarProyectosAlMenu() {
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
            console.log('📭 No hay proyectos para mostrar');
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
            console.log('✅ Menú lateral actualizado con', window.projects.length, 'proyectos');
        }
        
        if (typeof renderKanbanTasks === 'function' && currentProjectIndex !== undefined) {
            renderKanbanTasks();
        }
    }
    
    // ============================================
    // CARGAR DATOS
    // ============================================
    async function cargarDatos() {
        const user = getCurrentUser();
        if (!user) {
            console.log('⏳ No hay usuario logueado');
            return;
        }
        
        try {
            console.log('📂 Cargando MIS proyectos...');
            const respMis = await fetch(`${API_URL}/mis-proyectos`, {
                headers: getHeaders()
            });
            
            if (respMis.ok) {
                const data = await respMis.json();
                misProyectos = data.projects || [];
                console.log('📂 MIS proyectos:', misProyectos.length);
            }
            
            console.log('📨 Cargando invitaciones...');
            const respInv = await fetch(`${API_URL}/colaboracion/invitaciones`, {
                headers: getHeaders()
            });
            
            if (respInv.ok) {
                const data = await respInv.json();
                invitaciones = data.invitaciones || [];
                console.log('📨 Invitaciones:', invitaciones.length);
            }
            
            console.log('📂 Cargando proyectos colaborativos...');
            const respCol = await fetch(`${API_URL}/colaboracion/proyectos`, {
                headers: getHeaders()
            });
            
            if (respCol.ok) {
                const data = await respCol.json();
                proyectosColaborativos = data.proyectos || [];
                console.log('📂 Colaborativos del backend:', proyectosColaborativos.length);
            }
            
            cargarProyectosAceptadosLocal();
            console.log('📂 Colaborativos locales:', proyectosAceptadosLocal.length);
            
            sincronizarProyectosAlMenu();
            updateBadge();
            
        } catch (error) {
            console.error('❌ Error cargando datos:', error);
        }
    }
    
    // ============================================
    // 🔥 NÚCLEO CON SINCRO
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
                alert('❌ Inicia sesión primero');
                return false;
            }
            
            const proyecto = misProyectos.find(p => p.id == proyectoId);
            if (!proyecto) {
                alert('❌ Proyecto no encontrado o no eres dueño');
                return false;
            }
            
            if (proyecto.colaboradores && proyecto.colaboradores.includes(email)) {
                alert(`⚠️ ${email} ya es colaborador`);
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
                    throw new Error(error.error || 'Error al crear invitación');
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
                sincronizarProyectosAlMenu();
                
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
                    throw new Error(error.error || 'Error al rechazar');
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
        
        const user = getCurrentUser();
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
                        <div style="text-align: center; padding: 20px; color: #64748b; font-size: 13px;">No tienes invitaciones pendientes</div>
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
                
                <!-- COLABORATIVOS (BACKEND + LOCAL) -->
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
                                            💾 Guardado localmente
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
                sincronizarProyectosAlMenu();
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
    // 🔥 INTERCEPTAR CAMBIOS EN TAREAS PARA SINCRO
    // ============================================
    function interceptTaskChanges() {
        console.log('🔄 Interceptando cambios en tareas para sincronización...');
        
        // Guardar funciones originales
        const originalCreate = window.createNewTask;
        const originalSave = window.saveTaskChanges;
        const originalDrop = window.handleDrop;
        const originalDelete = window.deleteTask;
        
        // Interceptar creación
        if (originalCreate) {
            window.createNewTask = function(e) {
                const result = originalCreate(e);
                
                // Emitir cambio después de crear
                setTimeout(() => {
                    const project = window.projects[currentProjectIndex];
                    if (project && project.tasks && project.tasks.length > 0) {
                        const task = project.tasks[project.tasks.length - 1];
                        emitCollabChange(project.id, 'task-created', task, 'creó una tarea');
                    }
                }, 500);
                
                return result;
            };
        }
        
        // Interceptar guardado
        if (originalSave) {
            window.saveTaskChanges = function(taskId) {
                const result = originalSave(taskId);
                
                setTimeout(() => {
                    const project = window.projects[currentProjectIndex];
                    const task = project?.tasks?.find(t => t.id === taskId);
                    if (project && task) {
                        emitCollabChange(project.id, 'task-updated', task, 'actualizó una tarea');
                    }
                }, 500);
                
                return result;
            };
        }
        
        // Interceptar movimiento (drag & drop)
        if (originalDrop) {
            window.handleDrop = function(e) {
                const result = originalDrop(e);
                
                setTimeout(() => {
                    const project = window.projects[currentProjectIndex];
                    // Obtener la tarea movida (por el ID del drag)
                    const taskId = e.dataTransfer?.getData('text/plain');
                    const task = project?.tasks?.find(t => String(t.id) === String(taskId));
                    if (project && task) {
                        emitCollabChange(project.id, 'task-moved', task, 'movió una tarea');
                    }
                }, 500);
                
                return result;
            };
        }
        
        // Interceptar eliminación
        if (originalDelete) {
            window.deleteTask = function(taskStr) {
                const task = JSON.parse(decodeURIComponent(taskStr));
                const project = window.projects[currentProjectIndex];
                
                const result = originalDelete(taskStr);
                
                if (project && task) {
                    emitCollabChange(project.id, 'task-deleted', task, 'eliminó una tarea');
                }
                
                return result;
            };
        }
        
        console.log('✅ Cambios en tareas interceptados para sincronización');
    }
    
    // ============================================
    // INICIALIZACIÓN
    // ============================================
    async function init() {
        console.log('🚀 Inicializando sistema...');
        
        // Iniciar WebSocket
        initWebSocket();
        
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
                console.warn('Error cargando proyecto guardado:', e);
            }
        }
        
        await cargarDatos();
        createFloatingButton();
        
        sincronizarProyectosAlMenu();
        
        // Interceptar cambios en tareas
        setTimeout(interceptTaskChanges, 1000);
        
        setInterval(async function() {
            await cargarDatos();
        }, 30000);
        
        console.log('✅ Sistema listo con sincronización en tiempo real');
        console.log('📂 Mis proyectos:', misProyectos.length);
        console.log('📂 Colaborativos (backend):', proyectosColaborativos.length);
        console.log('📂 Colaborativos (local):', proyectosAceptadosLocal.length);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100);
    }
    
})();