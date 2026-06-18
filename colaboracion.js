// ============================================================
// 🚀 SISTEMA DE COLABORACIÓN - VERSIÓN CORREGIDA
// ============================================================
// ✅ SIN DUPLICACIÓN DE PROYECTOS
// ✅ CON BACKEND
// ✅ CON SOCKET.IO

(function() {
    'use strict';
    
    console.log('🔥 SISTEMA DE COLABORACIÓN - VERSIÓN CORREGIDA');

    // ============================================
    // CONFIGURACIÓN
    // ============================================
    const API_URL = 'https://mi-sistema-proyectos-backend-4.onrender.com/api';
    const SOCKET_URL = 'https://mi-sistema-proyectos-backend-4.onrender.com';
    
    let socket = null;
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
            return localStorage.getItem('userEmail') || null;
        } catch(e) {
            return null;
        }
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

    // ============================================
    // PROYECTOS - BACKEND
    // ============================================
    const Proyectos = {
        getMisProyectos: async function() {
            const token = getAuthToken();
            if (!token) return [];

            try {
                const response = await fetch(`${API_URL}/user/projects`, {
                    headers: getHeaders()
                });

                if (!response.ok) throw new Error(`HTTP ${response.status}`);

                const data = await response.json();
                console.log(`📂 ${data.allProjects?.length || 0} proyectos obtenidos`);
                
                if (typeof projects !== 'undefined' && data.allProjects) {
                    // LIMPIAR y reemplazar (NO duplicar)
                    projects.length = 0;
                    projects.push(...data.allProjects);
                    localStorage.setItem('projects', JSON.stringify(projects));
                }
                
                return data.allProjects || [];
            } catch(error) {
                console.error('❌ Error:', error);
                return [];
            }
        },

        sincronizar: async function() {
            return await this.getMisProyectos();
        }
    };

    // ============================================
    // INVITACIONES
    // ============================================
    const Invitaciones = {
        enviar: async function(proyectoIndex, proyectoNombre, email, rol = 'viewer') {
            const token = getAuthToken();
            if (!token) {
                alert('❌ Inicia sesión primero');
                return false;
            }

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
                    alert(`✅ Invitación enviada a ${email} para "${proyectoNombre}"`);
                    return true;
                } else {
                    alert(`❌ Error: ${data.error || 'No se pudo enviar'}`);
                    return false;
                }
            } catch(error) {
                console.error('❌ Error:', error);
                alert('❌ Error al enviar la invitación');
                return false;
            }
        }
    };

    // ============================================
    // SOCKET.IO
    // ============================================
    const SocketIO = {
        conectado: false,

        conectar: function() {
            const token = getAuthToken();
            if (!token) {
                setTimeout(() => this.conectar(), 2000);
                return;
            }

            if (socket && socket.connected) return;

            try {
                if (typeof io === 'undefined') {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.socket.io/4.7.2/socket.io.min.js';
                    script.onload = () => this._inicializar(token);
                    document.head.appendChild(script);
                } else {
                    this._inicializar(token);
                }
            } catch(error) {
                console.error('❌ Error:', error);
            }
        },

        _inicializar: function(token) {
            try {
                socket = io(SOCKET_URL, {
                    auth: { token: token },
                    transports: ['websocket', 'polling'],
                    reconnection: true
                });

                socket.on('connect', () => {
                    console.log('✅ Socket conectado');
                    this.conectado = true;
                    socket.emit('register-user', { userId: getClienteId() });
                });

                socket.on('disconnect', () => {
                    console.log('🔌 Socket desconectado');
                    this.conectado = false;
                });

                socket.on('task-created', (data) => {
                    console.log('📦 Tarea creada:', data);
                    this._aplicarCambio('task-created', data);
                });

                socket.on('task-moved', (data) => {
                    console.log('📦 Tarea movida:', data);
                    this._aplicarCambio('task-moved', data);
                });

                socket.on('task-updated', (data) => {
                    console.log('📦 Tarea actualizada:', data);
                    this._aplicarCambio('task-updated', data);
                });

                socket.on('task-deleted', (data) => {
                    console.log('📦 Tarea eliminada:', data);
                    this._aplicarCambio('task-deleted', data);
                });

                console.log('✅ Socket configurado');
            } catch(error) {
                console.error('❌ Error:', error);
            }
        },

        _aplicarCambio: function(evento, data) {
            if (typeof projects === 'undefined') return;

            const proyecto = projects.find(p => {
                const id = p.id || p._id;
                return id == data.projectId || p.name === data.projectName;
            });

            if (!proyecto) {
                console.warn('⚠️ Proyecto no encontrado');
                return;
            }

            if (!proyecto.tasks) proyecto.tasks = [];

            switch(evento) {
                case 'task-created':
                    if (data.task) {
                        // Verificar que no exista ya
                        const existe = proyecto.tasks.some(t => t.id == data.task.id);
                        if (!existe) {
                            proyecto.tasks.push(data.task);
                            console.log('✅ Tarea agregada remotamente');
                        }
                    }
                    break;

                case 'task-moved':
                    if (data.taskId && data.newStatus) {
                        const index = proyecto.tasks.findIndex(t => t.id == data.taskId);
                        if (index !== -1) {
                            proyecto.tasks[index].status = data.newStatus;
                            console.log('✅ Tarea movida remotamente');
                        }
                    }
                    break;

                case 'task-deleted':
                    if (data.taskId) {
                        proyecto.tasks = proyecto.tasks.filter(t => t.id != data.taskId);
                        console.log('✅ Tarea eliminada remotamente');
                    }
                    break;
            }

            localStorage.setItem('projects', JSON.stringify(projects));
            if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
        },

        emitir: function(evento, data) {
            if (!socket || !socket.connected) return;
            socket.emit(evento, {
                ...data,
                projectId: localStorage.getItem('currentProjectId'),
                userEmail: getCurrentUser()
            });
        }
    };

    // ============================================
    // BOTÓN FLOTANTE
    // ============================================
    function createFloatingButton() {
        const existing = document.getElementById('colabFloatBtn');
        if (existing) existing.remove();
        
        const btn = document.createElement('div');
        btn.id = 'colabFloatBtn';
        btn.innerHTML = '👥';
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
            border: 2px solid rgba(255,255,255,0.2);
        `;
        btn.onclick = togglePanel;
        document.body.appendChild(btn);
    }

    // ============================================
    // PANEL
    // ============================================
    async function togglePanel() {
        const existing = document.getElementById('colabPanel');
        if (existing) {
            existing.remove();
            panelAbierto = false;
            return;
        }
        
        const misProyectos = await Proyectos.getMisProyectos();
        
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
        
        const proyectosOptions = misProyectos.map((p, i) => {
            const nombre = p.name || p.nombre || `Proyecto ${i}`;
            return `<option value="${i}">${nombre}</option>`;
        }).join('');
        
        panel.innerHTML = `
            <div style="padding: 16px 20px; background: #1e293b; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: 600; font-size: 16px;">👥 Colaboración</span>
                <button onclick="document.getElementById('colabPanel').remove()" style="background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer;">✕</button>
            </div>
            
            <div style="padding: 16px; overflow-y: auto; flex: 1;">
                <div style="margin-bottom: 16px;">
                    <div style="color: #f59e0b; font-size: 13px; font-weight: 600; margin-bottom: 10px;">📩 Invitar</div>
                    <select id="invitarProyectoSelect" style="width: 100%; padding: 10px; background: #0f172a; border: 1px solid #334155; border-radius: 8px; color: white; font-size: 13px; margin-bottom: 8px;">
                        ${proyectosOptions || '<option value="">No tienes proyectos</option>'}
                    </select>
                    <div style="display: flex; gap: 8px;">
                        <input type="email" id="invitarEmailInput" placeholder="email@ejemplo.com" style="flex: 1; padding: 10px; background: #0f172a; border: 1px solid #334155; border-radius: 8px; color: white; font-size: 13px;">
                        <button onclick="window.enviarInvitacionUI()" style="background: #8b5cf6; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600;">Enviar</button>
                    </div>
                    <div id="invitarMensaje" style="margin-top: 8px; font-size: 12px; text-align: center;"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        panelAbierto = true;
        
        window.enviarInvitacionUI = async function() {
            const select = document.getElementById('invitarProyectoSelect');
            const emailInput = document.getElementById('invitarEmailInput');
            const mensaje = document.getElementById('invitarMensaje');
            
            const proyectoIndex = select?.value;
            const email = emailInput?.value?.trim();
            
            if (!proyectoIndex || !email) {
                mensaje.innerHTML = '<span style="color: #ef4444;">❌ Completa todos los campos</span>';
                return;
            }
            
            const proyecto = misProyectos[parseInt(proyectoIndex)];
            if (!proyecto) {
                mensaje.innerHTML = '<span style="color: #ef4444;">❌ Proyecto no encontrado</span>';
                return;
            }
            
            mensaje.innerHTML = '<span style="color: #f59e0b;">⏳ Enviando...</span>';
            const resultado = await Invitaciones.enviar(
                parseInt(proyectoIndex),
                proyecto.name || proyecto.nombre,
                email
            );
            
            if (resultado) {
                mensaje.innerHTML = `<span style="color: #10b981;">✅ Invitación enviada a ${email}</span>`;
                emailInput.value = '';
            } else {
                mensaje.innerHTML = '<span style="color: #ef4444;">❌ Error al enviar</span>';
            }
        };
    }

    // ============================================
    // INICIALIZAR
    // ============================================
    async function init() {
        console.log('🚀 Iniciando...');
        
        // Cargar proyectos
        await Proyectos.sincronizar();
        
        // Conectar socket
        SocketIO.conectar();
        
        // Crear botón
        createFloatingButton();
        
        console.log('✅ Sistema listo');
        console.log('📌 Busca el botón 👥 en la esquina inferior izquierda');
    }

    // ============================================
    // EJECUTAR
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(init, 100));
    } else {
        setTimeout(init, 100);
    }

})();