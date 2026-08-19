// ============================================================
// 🤝 SISTEMA DE COLABORACIÓN EN TIEMPO REAL
// Archivo: collaboration-system.js
// Versión: 2.0.0
// ============================================================
(function() {
'use strict';

console.log('🤝 Iniciando Sistema de Colaboración en Tiempo Real v2.0...');

// ============================================================
// 1. CONFIGURACIÓN
// ============================================================
const CONFIG = {
    API_URL: 'https://mi-sistema-proyectos-backend-4.onrender.com',
    RECONNECT_INTERVAL: 3000,
    MAX_RECONNECT_ATTEMPTS: 10,
    HEARTBEAT_INTERVAL: 25000,
    ROLES: {
        viewer: { label: '👁️ Visualizador', color: '#3b82f6' },
        editor: { label: '✏️ Editor', color: '#f59e0b' },
        admin: { label: '👑 Administrador', color: '#10b981' }
    }
};

// ============================================================
// 2. ESTADO GLOBAL
// ============================================================
const STATE = {
    socket: null,
    connected: false,
    reconnectAttempts: 0,
    heartbeatTimer: null,
    currentUser: null,
    currentProject: null,
    collaborators: new Map(), // projectId -> [collaborators]
    modalOpen: false,
    selectedProjectId: null
};

// ============================================================
// 3. UTILIDADES
// ============================================================
function getUserEmail() {
    try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.email) return user.email;
        const token = localStorage.getItem('authToken');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.email || payload.sub;
        }
    } catch (e) {
        console.error('Error obteniendo email:', e);
    }
    return null;
}

function getAuthToken() {
    return localStorage.getItem('authToken');
}

function getCurrentUser() {
    if (!STATE.currentUser) {
        STATE.currentUser = {
            email: getUserEmail(),
            token: getAuthToken()
        };
    }
    return STATE.currentUser;
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, type = 'info') {
    const colors = {
        info: { bg: '#3b82f6', icon: '📢' },
        success: { bg: '#10b981', icon: '✅' },
        warning: { bg: '#f59e0b', icon: '⚠️' },
        error: { bg: '#ef4444', icon: '❌' }
    };
    const config = colors[type] || colors.info;
    
    const notif = document.createElement('div');
    notif.innerHTML = `
        <div style="
            position: fixed; bottom: 20px; right: 20px;
            background: ${config.bg}; color: white;
            padding: 15px 20px; border-radius: 12px;
            z-index: 1000000; display: flex; align-items: center; gap: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            font-family: system-ui, sans-serif; font-size: 14px;
            animation: slideInRight 0.3s ease;
        ">
            <span style="font-size: 20px;">${config.icon}</span>
            <span>${escapeHtml(message)}</span>
        </div>
    `;
    document.body.appendChild(notif);
    setTimeout(() => {
        notif.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// ============================================================
// 4. CONEXIÓN WEBSOCKET
// ============================================================
function connectWebSocket() {
    const user = getCurrentUser();
    if (!user.token) {
        console.warn('⚠️ No hay token, no se puede conectar WebSocket');
        updateConnectionStatus('disconnected');
        return;
    }

    try {
        // Desconectar si ya existe
        if (STATE.socket && STATE.socket.connected) {
            STATE.socket.disconnect();
        }

        updateConnectionStatus('connecting');

        STATE.socket = io(CONFIG.API_URL, {
            transports: ['websocket', 'polling'],
            auth: { token: user.token },
            reconnection: true,
            reconnectionAttempts: CONFIG.MAX_RECONNECT_ATTEMPTS,
            reconnectionDelay: CONFIG.RECONNECT_INTERVAL
        });

        STATE.socket.on('connect', () => {
            console.log('✅ WebSocket conectado');
            STATE.connected = true;
            STATE.reconnectAttempts = 0;
            updateConnectionStatus('connected');

            // Registrar usuario
            STATE.socket.emit('register-user', {
                email: user.email,
                timestamp: Date.now()
            });

            // Unirse al proyecto actual si existe
            if (typeof currentProjectIndex !== 'undefined' && window.projects?.[currentProjectIndex]) {
                joinProjectRoom(window.projects[currentProjectIndex].id);
            }

            // Iniciar heartbeat
            startHeartbeat();
        });

        STATE.socket.on('disconnect', (reason) => {
            console.log('🔌 WebSocket desconectado:', reason);
            STATE.connected = false;
            updateConnectionStatus('disconnected');
            stopHeartbeat();
        });

        STATE.socket.on('connect_error', (error) => {
            console.error('❌ Error de conexión WebSocket:', error.message);
            STATE.reconnectAttempts++;
            if (STATE.reconnectAttempts >= CONFIG.MAX_RECONNECT_ATTEMPTS) {
                updateConnectionStatus('disconnected');
            } else {
                updateConnectionStatus('reconnecting');
            }
        });

        // Eventos de colaboración
        STATE.socket.on('collaborator-joined', (data) => {
            console.log('👤 Colaborador unido:', data);
            showNotification(`${data.email} se unió al proyecto`, 'info');
            updateCollaboratorsList(data.projectId);
        });

        STATE.socket.on('collaborator-left', (data) => {
            console.log('👋 Colaborador salió:', data);
            updateCollaboratorsList(data.projectId);
        });

        STATE.socket.on('project-updated', (data) => {
            console.log('📡 Proyecto actualizado:', data);
            // Solo actualizar si estamos viendo ese proyecto
            if (STATE.currentProject && STATE.currentProject.id === data.projectId) {
                window.dispatchEvent(new CustomEvent('collab-project-updated', { detail: data }));
            }
        });

        STATE.socket.on('task-created', (data) => {
            if (STATE.currentProject?.id === data.projectId) {
                window.dispatchEvent(new CustomEvent('collab-task-created', { detail: data }));
            }
        });

        STATE.socket.on('task-updated', (data) => {
            if (STATE.currentProject?.id === data.projectId) {
                window.dispatchEvent(new CustomEvent('collab-task-updated', { detail: data }));
            }
        });

        STATE.socket.on('task-deleted', (data) => {
            if (STATE.currentProject?.id === data.projectId) {
                window.dispatchEvent(new CustomEvent('collab-task-deleted', { detail: data }));
            }
        });

        STATE.socket.on('invitation-accepted', (data) => {
            console.log('✅ Invitación aceptada:', data);
            showNotification(`Nueva colaboración en ${data.projectName}`, 'success');
        });

    } catch (error) {
        console.error('Error conectando WebSocket:', error);
        updateConnectionStatus('disconnected');
    }
}

function joinProjectRoom(projectId) {
    if (!STATE.socket || !STATE.connected) return;
    
    // Salir de sala anterior
    if (STATE.currentProject) {
        STATE.socket.emit('leave-project', { projectId: STATE.currentProject.id });
    }
    
    STATE.currentProject = window.projects?.find(p => p.id === projectId) || null;
    
    if (STATE.currentProject) {
        STATE.socket.emit('join-project', { projectId: projectId });
        console.log(`📁 Unido a sala del proyecto: ${STATE.currentProject.name}`);
        updateCollaboratorsList(projectId);
    }
}

function startHeartbeat() {
    stopHeartbeat();
    STATE.heartbeatTimer = setInterval(() => {
        if (STATE.socket?.connected) {
            STATE.socket.emit('heartbeat', { timestamp: Date.now() });
        }
    }, CONFIG.HEARTBEAT_INTERVAL);
}

function stopHeartbeat() {
    if (STATE.heartbeatTimer) {
        clearInterval(STATE.heartbeatTimer);
        STATE.heartbeatTimer = null;
    }
}

function updateConnectionStatus(status) {
    const indicator = document.getElementById('collab-connection-indicator');
    if (!indicator) return;
    
    const states = {
        connected: { color: '#10b981', label: 'Conectado', pulse: true },
        connecting: { color: '#f59e0b', label: 'Conectando...', pulse: true },
        reconnecting: { color: '#f59e0b', label: 'Reconectando...', pulse: true },
        disconnected: { color: '#ef4444', label: 'Desconectado', pulse: false }
    };
    
    const state = states[status] || states.disconnected;
    indicator.style.background = state.color;
    indicator.title = `WebSocket: ${state.label}`;
    
    if (state.pulse) {
        indicator.style.animation = 'collab-pulse 2s infinite';
    } else {
        indicator.style.animation = 'none';
    }
}

// ============================================================
// 5. API - INVITACIONES
// ============================================================
async function sendInvitation(projectId, email, role) {
    const token = getAuthToken();
    if (!token) {
        showNotification('No estás autenticado', 'error');
        return { success: false, error: 'No autenticado' };
    }

    try {
        const response = await fetch(`${CONFIG.API_URL}/api/invitations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                email: email,
                proyectoIndex: window.projects?.findIndex(p => p.id === projectId) || 0,
                proyectoNombre: window.projects?.find(p => p.id === projectId)?.name || '',
                rol: role
            })
        });

        const data = await response.json();
        
        if (data.success) {
            showNotification(`Invitación enviada a ${email}`, 'success');
            return data;
        } else {
            showNotification(data.error || 'Error al enviar invitación', 'error');
            return data;
        }
    } catch (error) {
        console.error('Error enviando invitación:', error);
        showNotification('Error de conexión', 'error');
        return { success: false, error: error.message };
    }
}

async function syncProject(projectId) {
    const token = getAuthToken();
    if (!token) return;

    try {
        const response = await fetch(`${CONFIG.API_URL}/api/projects?clienteId=${localStorage.getItem('clienteId')}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();
        if (data.projects) {
            const project = data.projects.find(p => p.id === projectId);
            if (project) {
                // Actualizar solo el proyecto específico
                const index = window.projects.findIndex(p => p.id === projectId);
                if (index !== -1) {
                    window.projects[index] = project;
                }
                localStorage.setItem('projects', JSON.stringify(window.projects));
                showNotification('Proyecto sincronizado', 'success');
                window.dispatchEvent(new CustomEvent('collab-project-synced', { detail: { projectId } }));
            }
        }
    } catch (error) {
        console.error('Error sincronizando:', error);
        showNotification('Error al sincronizar', 'error');
    }
}

async function updateCollaboratorsList(projectId) {
    const token = getAuthToken();
    if (!token) return;

    try {
        const response = await fetch(`${CONFIG.API_URL}/api/projects/${projectId}/collaborators`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            const data = await response.json();
            STATE.collaborators.set(projectId, data.collaborators || []);
            renderCollaboratorsList(projectId);
        }
    } catch (error) {
        console.warn('Error obteniendo colaboradores:', error);
    }
}

// ============================================================
// 6. UI - BOTÓN FLOTANTE Y MODAL
// ============================================================
function createFloatingButton() {
    if (document.getElementById('collab-floating-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'collab-floating-btn';
    btn.innerHTML = `
        <span id="collab-connection-indicator" style="
            position: absolute; top: -4px; right: -4px;
            width: 14px; height: 14px; border-radius: 50%;
            background: #ef4444; border: 2px solid white;
            box-shadow: 0 0 0 2px rgba(0,0,0,0.2);
        "></span>
        <span style="font-size: 24px;">🤝</span>
    `;
    
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #8b5cf6, #6d28d9);
        border: none;
        color: white;
        cursor: pointer;
        box-shadow: 0 10px 25px rgba(139, 92, 246, 0.4);
        z-index: 999998;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.1)';
        btn.style.boxShadow = '0 15px 35px rgba(139, 92, 246, 0.6)';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
        btn.style.boxShadow = '0 10px 25px rgba(139, 92, 246, 0.4)';
    });

    btn.addEventListener('click', toggleModal);
    document.body.appendChild(btn);
}

function toggleModal() {
    if (STATE.modalOpen) {
        closeModal();
    } else {
        openModal();
    }
}

function openModal() {
    if (document.getElementById('collab-modal')) return;
    
    STATE.modalOpen = true;
    const user = getCurrentUser();
    const isAdmin = user.email === 'ajackson2672@gmail.com';
    
    // Obtener proyectos disponibles (solo los del usuario)
    const userProjects = getUserProjects();
    
    const modal = document.createElement('div');
    modal.id = 'collab-modal';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(10px);
        z-index: 999999; display: flex; align-items: center; justify-content: center;
        animation: collab-fadeIn 0.3s ease;
    `;

    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #0f172a, #1e293b);
            border-radius: 24px; padding: 30px;
            width: 700px; max-width: 95vw; max-height: 90vh;
            overflow-y: auto; border: 2px solid #8b5cf6;
            box-shadow: 0 30px 60px rgba(0,0,0,0.5);
            animation: collab-slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        ">
            <!-- HEADER -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid rgba(139,92,246,0.3);">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #8b5cf6, #6d28d9); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px;">🤝</div>
                    <div>
                        <h3 style="margin: 0; color: white; font-size: 22px;">Colaboración en Tiempo Real</h3>
                        <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px;">Invita colaboradores a tus proyectos</p>
                    </div>
                </div>
                <button id="collab-modal-close" style="background: rgba(239,68,68,0.2); border: 1px solid rgba(239,68,68,0.3); color: #ef4444; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-size: 20px;">✕</button>
            </div>

            <!-- ESTADO DE CONEXIÓN -->
            <div id="collab-status-bar" style="background: rgba(16,185,129,0.1); border: 1px solid #10b981; border-radius: 12px; padding: 12px 16px; margin-bottom: 20px; display: flex; align-items: center; gap: 12px;">
                <div id="collab-modal-indicator" style="width: 12px; height: 12px; border-radius: 50%; background: #10b981; animation: collab-pulse 2s infinite;"></div>
                <span style="color: #10b981; font-weight: 600;">Conectado</span>
                <span style="color: #94a3b8; font-size: 13px; margin-left: auto;">WebSocket activo</span>
            </div>

            <!-- SELECTOR DE PROYECTO -->
            <div style="margin-bottom: 20px;">
                <label style="display: block; color: #94a3b8; margin-bottom: 8px; font-size: 13px; font-weight: 600;">📁 Seleccionar Proyecto</label>
                <select id="collab-project-select" style="
                    width: 100%; padding: 12px; background: #0f172a;
                    border: 1px solid #3b82f6; border-radius: 8px;
                    color: white; font-size: 14px;
                ">
                    <option value="">-- Selecciona un proyecto --</option>
                    ${userProjects.map(p => `<option value="${p.id}">${escapeHtml(p.name)}</option>`).join('')}
                </select>
            </div>

            <!-- INVITACIÓN -->
            <div style="background: rgba(139,92,246,0.1); border: 1px solid rgba(139,92,246,0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                <h4 style="color: white; margin: 0 0 15px 0; font-size: 16px;">📧 Invitar Colaborador</h4>
                
                <div style="margin-bottom: 12px;">
                    <label style="display: block; color: #94a3b8; margin-bottom: 6px; font-size: 12px;">Email del colaborador</label>
                    <input type="email" id="collab-email-input" placeholder="ejemplo@correo.com" style="
                        width: 100%; padding: 10px; background: #0f172a;
                        border: 1px solid #3b82f6; border-radius: 8px;
                        color: white; font-size: 14px; box-sizing: border-box;
                    ">
                </div>
                
                <div style="margin-bottom: 15px;">
                    <label style="display: block; color: #94a3b8; margin-bottom: 6px; font-size: 12px;">Rol</label>
                    <select id="collab-role-select" style="
                        width: 100%; padding: 10px; background: #0f172a;
                        border: 1px solid #3b82f6; border-radius: 8px;
                        color: white; font-size: 14px;
                    ">
                        <option value="viewer">👁️ Visualizador - Solo lectura</option>
                        <option value="editor" selected>✏️ Editor - Puede modificar</option>
                        <option value="admin">👑 Administrador - Control total</option>
                    </select>
                </div>

                <div style="display: flex; gap: 10px;">
                    <button id="collab-send-email-btn" style="
                        flex: 1; background: linear-gradient(135deg, #8b5cf6, #6d28d9);
                        border: none; color: white; padding: 12px;
                        border-radius: 8px; cursor: pointer; font-weight: 600;
                        display: flex; align-items: center; justify-content: center; gap: 8px;
                    ">📧 Enviar Email</button>
                    <button id="collab-copy-link-btn" style="
                        flex: 1; background: #475569;
                        border: none; color: white; padding: 12px;
                        border-radius: 8px; cursor: pointer; font-weight: 600;
                        display: flex; align-items: center; justify-content: center; gap: 8px;
                    ">📋 Copiar Enlace</button>
                </div>
            </div>

            <!-- SINCRONIZAR -->
            <div style="margin-bottom: 20px;">
                <button id="collab-sync-btn" style="
                    width: 100%; background: linear-gradient(135deg, #10b981, #059669);
                    border: none; color: white; padding: 12px;
                    border-radius: 8px; cursor: pointer; font-weight: 600;
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                ">🔄 Sincronizar Proyecto Actual</button>
            </div>

            <!-- COLABORADORES ACTIVOS -->
            <div style="background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.3); border-radius: 12px; padding: 20px;">
                <h4 style="color: white; margin: 0 0 15px 0; font-size: 16px;">👥 Colaboradores del Proyecto</h4>
                <div id="collab-list" style="color: #94a3b8; font-size: 13px;">
                    Selecciona un proyecto para ver sus colaboradores
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Event listeners
    document.getElementById('collab-modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.getElementById('collab-send-email-btn').addEventListener('click', handleSendInvitation);
    document.getElementById('collab-copy-link-btn').addEventListener('click', handleCopyLink);
    document.getElementById('collab-sync-btn').addEventListener('click', handleSyncProject);
    document.getElementById('collab-project-select').addEventListener('change', handleProjectChange);
}

function closeModal() {
    const modal = document.getElementById('collab-modal');
    if (modal) {
        modal.style.animation = 'collab-fadeOut 0.2s ease';
        setTimeout(() => modal.remove(), 200);
    }
    STATE.modalOpen = false;
}

function getUserProjects() {
    if (!window.projects) return [];
    
    const userEmail = getUserEmail();
    const userClienteId = localStorage.getItem('clienteId');
    const isAdmin = userEmail === 'ajackson2672@gmail.com';
    
    // Admin ve todos sus proyectos
    if (isAdmin) {
        return window.projects.filter(p => p.clienteId === userClienteId);
    }
    
    // Usuario normal: solo proyectos donde es dueño o colaborador
    return window.projects.filter(p => {
        if (p.clienteId === userClienteId) return true;
        if (p.colaboradores && Array.isArray(p.colaboradores)) {
            return p.colaboradores.includes(userEmail);
        }
        return false;
    });
}

function handleProjectChange(e) {
    const projectId = e.target.value;
    STATE.selectedProjectId = projectId;
    
    if (projectId) {
        updateCollaboratorsList(projectId);
        joinProjectRoom(projectId);
    } else {
        document.getElementById('collab-list').innerHTML = 'Selecciona un proyecto para ver sus colaboradores';
    }
}

function renderCollaboratorsList(projectId) {
    const list = document.getElementById('collab-list');
    if (!list) return;
    
    const collaborators = STATE.collaborators.get(projectId) || [];
    
    if (collaborators.length === 0) {
        list.innerHTML = '<div style="color: #94a3b8; font-style: italic;">No hay colaboradores en este proyecto</div>';
        return;
    }
    
    list.innerHTML = collaborators.map(c => {
        const role = CONFIG.ROLES[c.rol] || CONFIG.ROLES.viewer;
        return `
            <div style="
                display: flex; justify-content: space-between; align-items: center;
                background: rgba(0,0,0,0.2); padding: 10px 12px;
                border-radius: 8px; margin-bottom: 8px;
            ">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="
                        width: 36px; height: 36px; border-radius: 50%;
                        background: ${role.color}; display: flex;
                        align-items: center; justify-content: center;
                        color: white; font-weight: bold;
                    ">${(c.email || '?')[0].toUpperCase()}</div>
                    <div>
                        <div style="color: white; font-size: 13px;">${escapeHtml(c.email)}</div>
                        <div style="color: ${role.color}; font-size: 11px;">${role.label}</div>
                    </div>
                </div>
                ${c.online ? '<div style="width: 10px; height: 10px; border-radius: 50%; background: #10b981;"></div>' : ''}
            </div>
        `;
    }).join('');
}

async function handleSendInvitation() {
    const projectId = document.getElementById('collab-project-select').value;
    const email = document.getElementById('collab-email-input').value.trim();
    const role = document.getElementById('collab-role-select').value;
    
    if (!projectId) {
        showNotification('Selecciona un proyecto', 'warning');
        return;
    }
    
    if (!email) {
        showNotification('Ingresa un email', 'warning');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Email inválido', 'error');
        return;
    }
    
    const btn = document.getElementById('collab-send-email-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '⏳ Enviando...';
    btn.disabled = true;
    
    const result = await sendInvitation(projectId, email, role);
    
    btn.innerHTML = originalText;
    btn.disabled = false;
    
    if (result.success) {
        document.getElementById('collab-email-input').value = '';
    }
}

function handleCopyLink() {
    const projectId = document.getElementById('collab-project-select').value;
    const email = document.getElementById('collab-email-input').value.trim();
    const role = document.getElementById('collab-role-select').value;
    
    if (!projectId) {
        showNotification('Selecciona un proyecto', 'warning');
        return;
    }
    
    // Generar enlace de invitación
    const baseUrl = window.location.origin;
    const token = btoa(JSON.stringify({ projectId, email, role, ts: Date.now() }));
    const inviteLink = `${baseUrl}/?invite=${token}`;
    
    navigator.clipboard.writeText(inviteLink).then(() => {
        showNotification('Enlace copiado al portapapeles', 'success');
    }).catch(() => {
        // Fallback
        const input = document.createElement('input');
        input.value = inviteLink;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        showNotification('Enlace copiado', 'success');
    });
}

async function handleSyncProject() {
    const projectId = document.getElementById('collab-project-select').value || 
                     (STATE.currentProject ? STATE.currentProject.id : null);
    
    if (!projectId) {
        showNotification('Selecciona un proyecto', 'warning');
        return;
    }
    
    const btn = document.getElementById('collab-sync-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '⏳ Sincronizando...';
    btn.disabled = true;
    
    await syncProject(projectId);
    
    btn.innerHTML = originalText;
    btn.disabled = false;
}

// ============================================================
// 7. ESTILOS
// ============================================================
function injectStyles() {
    if (document.getElementById('collab-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'collab-styles';
    style.textContent = `
        @keyframes collab-fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes collab-fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes collab-slideUp {
            from { opacity: 0; transform: translateY(40px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes collab-pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.1); }
        }
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================================
// 8. INICIALIZACIÓN
// ============================================================
function initialize() {
    console.log('🚀 Inicializando Sistema de Colaboración...');
    
    injectStyles();
    createFloatingButton();
    
    // Conectar WebSocket si hay token
    if (getAuthToken()) {
        setTimeout(connectWebSocket, 1500);
    }
    
    // Escuchar cambios de autenticación
    window.addEventListener('storage', (e) => {
        if (e.key === 'authToken') {
            if (e.newValue) {
                setTimeout(connectWebSocket, 1000);
            } else {
                if (STATE.socket) {
                    STATE.socket.disconnect();
                    STATE.socket = null;
                }
                updateConnectionStatus('disconnected');
            }
        }
    });
    
    // Escuchar cambio de proyecto
    const originalSelectProject = window.selectProject;
    window.selectProject = function(index) {
        const result = originalSelectProject ? originalSelectProject(index) : undefined;
        
        if (STATE.socket?.connected && window.projects?.[index]) {
            joinProjectRoom(window.projects[index].id);
        }
        
        return result;
    };
    
    // Eventos de colaboración para actualizar UI
    window.addEventListener('collab-project-updated', () => {
        if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
        if (typeof renderProjects === 'function') renderProjects();
    });
    
    window.addEventListener('collab-task-created', () => {
        if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
    });
    
    window.addEventListener('collab-task-updated', () => {
        if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
    });
    
    window.addEventListener('collab-task-deleted', () => {
        if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
    });
    
    console.log('✅ Sistema de Colaboración inicializado');
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

// ============================================================
// 9. API PÚBLICA (para uso desde consola u otros scripts)
// ============================================================
window.CollabSystem = {
    connect: connectWebSocket,
    disconnect: () => STATE.socket?.disconnect(),
    sendInvitation: sendInvitation,
    syncProject: syncProject,
    getState: () => ({ ...STATE }),
    isConnected: () => STATE.connected
};

console.log('🤝 Sistema de Colaboración cargado. API disponible en window.CollabSystem');

})();