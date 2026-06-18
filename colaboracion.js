// ============================================================
// 🚀 COLABORACIÓN - VERSIÓN QUE SÍ FUNCIONA
// ============================================================

(function() {
    'use strict';
    
    console.log('🔥 COLABORACIÓN - VERSIÓN FINAL');

    // ============================================
    // 1. LIMPIAR PROYECTOS DUPLICADOS AHORA MISMO
    // ============================================
    if (typeof projects !== 'undefined' && Array.isArray(projects)) {
        console.log('🧹 Limpiando proyectos duplicados...');
        const vistos = new Set();
        const unicos = [];
        
        for (let i = 0; i < projects.length; i++) {
            const p = projects[i];
            const id = p.id || p._id || p.name;
            if (!vistos.has(id)) {
                vistos.add(id);
                unicos.push(p);
            }
        }
        
        if (unicos.length !== projects.length) {
            projects.length = 0;
            projects.push(...unicos);
            localStorage.setItem('projects', JSON.stringify(projects));
            console.log(`✅ Eliminados ${projects.length - unicos.length} duplicados`);
        }
    }

    // ============================================
    // 2. CONFIGURACIÓN
    // ============================================
    const API_URL = 'https://mi-sistema-proyectos-backend-4.onrender.com/api';
    let socket = null;
    let panelAbierto = false;

    // ============================================
    // 3. UTILIDADES
    // ============================================
    function getToken() {
        return localStorage.getItem('authToken') || localStorage.getItem('token') || null;
    }

    function getHeaders() {
        const token = getToken();
        return {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        };
    }

    // ============================================
    // 4. OBTENER PROYECTOS (SIN DUPLICAR)
    // ============================================
    async function obtenerProyectos() {
        const token = getToken();
        if (!token) return [];

        try {
            const res = await fetch(`${API_URL}/user/projects`, { headers: getHeaders() });
            if (!res.ok) throw new Error('Error');
            const data = await res.json();
            
            if (data.allProjects && Array.isArray(data.allProjects)) {
                // REEMPLAZAR completamente, no agregar
                if (typeof projects !== 'undefined') {
                    projects.length = 0;
                    projects.push(...data.allProjects);
                    localStorage.setItem('projects', JSON.stringify(projects));
                }
                return data.allProjects;
            }
            return [];
        } catch(e) {
            console.error('❌ Error:', e);
            return [];
        }
    }

    // ============================================
    // 5. INVITAR
    // ============================================
    async function invitar(email, proyectoIndex, proyectoNombre) {
        const token = getToken();
        if (!token) {
            alert('❌ Inicia sesión');
            return false;
        }

        try {
            const res = await fetch(`${API_URL}/invitations`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({
                    email,
                    proyectoIndex,
                    proyectoNombre,
                    rol: 'editor'
                })
            });
            const data = await res.json();
            
            if (data.success) {
                alert(`✅ Invitación enviada a ${email}`);
                return true;
            } else {
                alert(`❌ ${data.error || 'Error'}`);
                return false;
            }
        } catch(e) {
            alert('❌ Error al enviar');
            return false;
        }
    }

    // ============================================
    // 6. SOCKET.IO - SIN DUPLICADOS
    // ============================================
    function conectarSocket() {
        try {
            if (typeof io === 'undefined') {
                const script = document.createElement('script');
                script.src = 'https://cdn.socket.io/4.7.2/socket.io.min.js';
                script.onload = () => _conectarSocket();
                document.head.appendChild(script);
            } else {
                _conectarSocket();
            }
        } catch(e) {
            console.error('❌ Socket error:', e);
        }
    }

    function _conectarSocket() {
        const token = getToken();
        if (!token) return;

        socket = io('https://mi-sistema-proyectos-backend-4.onrender.com', {
            auth: { token },
            transports: ['websocket', 'polling']
        });

        socket.on('connect', () => {
            console.log('✅ Socket conectado');
            socket.emit('register-user', { userId: localStorage.getItem('clienteId') });
        });

        socket.on('task-created', (data) => {
            console.log('📦 Tarea creada:', data);
            _aplicarCambio(data);
        });

        socket.on('task-moved', (data) => {
            console.log('📦 Tarea movida:', data);
            _aplicarCambio(data);
        });

        socket.on('task-deleted', (data) => {
            console.log('📦 Tarea eliminada:', data);
            _aplicarCambio(data);
        });
    }

    function _aplicarCambio(data) {
        if (typeof projects === 'undefined') return;
        
        const proyecto = projects.find(p => {
            const id = p.id || p._id;
            return id == data.projectId || p.name === data.projectName;
        });
        
        if (!proyecto) return;
        if (!proyecto.tasks) proyecto.tasks = [];

        if (data.task && data.action === 'created') {
            const existe = proyecto.tasks.some(t => t.id == data.task.id);
            if (!existe) proyecto.tasks.push(data.task);
        }
        
        if (data.taskId && data.newStatus) {
            const t = proyecto.tasks.find(t => t.id == data.taskId);
            if (t) t.status = data.newStatus;
        }
        
        if (data.taskId && data.action === 'deleted') {
            proyecto.tasks = proyecto.tasks.filter(t => t.id != data.taskId);
        }

        localStorage.setItem('projects', JSON.stringify(projects));
        if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
    }

    // ============================================
    // 7. BOTÓN Y PANEL
    // ============================================
    function crearBoton() {
        const btn = document.createElement('div');
        btn.id = 'colabBtn';
        btn.innerHTML = '👥';
        btn.style.cssText = `
            position: fixed; bottom: 20px; left: 20px;
            width: 60px; height: 60px;
            background: #8b5cf6; color: white;
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-size: 28px; cursor: pointer;
            z-index: 999999;
            box-shadow: 0 4px 20px rgba(139,92,246,0.5);
            border: 2px solid rgba(255,255,255,0.2);
        `;
        btn.onclick = togglePanel;
        document.body.appendChild(btn);
    }

    async function togglePanel() {
        const existing = document.getElementById('colabPanel');
        if (existing) {
            existing.remove();
            panelAbierto = false;
            return;
        }

        const proyectos = await obtenerProyectos();
        
        const panel = document.createElement('div');
        panel.id = 'colabPanel';
        panel.style.cssText = `
            position: fixed; bottom: 100px; left: 20px;
            width: 400px; max-height: 60vh;
            background: #0f172a; border-radius: 16px;
            border: 2px solid #8b5cf6;
            padding: 20px;
            z-index: 999998;
            color: white;
            overflow-y: auto;
        `;

        const options = proyectos.map((p, i) => 
            `<option value="${i}">${p.name || p.nombre || 'Proyecto'}</option>`
        ).join('');

        panel.innerHTML = `
            <div style="display:flex;justify-content:space-between;margin-bottom:16px;">
                <span style="font-weight:bold;font-size:18px;">👥 Colaboración</span>
                <button onclick="document.getElementById('colabPanel').remove()" style="background:none;border:none;color:#94a3b8;font-size:20px;cursor:pointer;">✕</button>
            </div>
            
            <div style="margin-bottom:12px;">
                <select id="proyectoSelect" style="width:100%;padding:10px;background:#1e293b;border:1px solid #334155;border-radius:8px;color:white;margin-bottom:8px;">
                    ${options || '<option>No hay proyectos</option>'}
                </select>
                <input type="email" id="emailInput" placeholder="email@ejemplo.com" style="width:100%;padding:10px;background:#1e293b;border:1px solid #334155;border-radius:8px;color:white;margin-bottom:8px;">
                <button onclick="window.enviar()" style="width:100%;padding:10px;background:#8b5cf6;border:none;border-radius:8px;color:white;font-weight:bold;cursor:pointer;">Enviar invitación</button>
                <div id="mensaje" style="margin-top:8px;font-size:12px;text-align:center;"></div>
            </div>
            
            <div style="border-top:1px solid #334155;padding-top:12px;">
                <div style="font-size:12px;color:#64748b;">
                    ${socket && socket.connected ? '🟢 Conectado' : '🔴 Desconectado'}
                    <span style="float:right;">${proyectos.length} proyectos</span>
                </div>
            </div>
        `;

        document.body.appendChild(panel);
        panelAbierto = true;

        window.enviar = async function() {
            const select = document.getElementById('proyectoSelect');
            const email = document.getElementById('emailInput').value.trim();
            const mensaje = document.getElementById('mensaje');
            
            const idx = parseInt(select.value);
            const proyecto = proyectos[idx];
            
            if (!proyecto || !email) {
                mensaje.innerHTML = '<span style="color:#ef4444;">❌ Completa todos los campos</span>';
                return;
            }
            
            mensaje.innerHTML = '<span style="color:#f59e0b;">⏳ Enviando...</span>';
            const ok = await invitar(email, idx, proyecto.name || proyecto.nombre);
            
            if (ok) {
                mensaje.innerHTML = `<span style="color:#10b981;">✅ Invitación enviada a ${email}</span>`;
                document.getElementById('emailInput').value = '';
            } else {
                mensaje.innerHTML = '<span style="color:#ef4444;">❌ Error al enviar</span>';
            }
        };
    }

    // ============================================
    // 8. INICIALIZAR
    // ============================================
    async function init() {
        console.log('🚀 Iniciando colaboración...');
        
        // Limpiar duplicados una vez más
        if (typeof projects !== 'undefined') {
            const vistos = new Set();
            const unicos = [];
            for (const p of projects) {
                const id = p.id || p._id || p.name;
                if (!vistos.has(id)) {
                    vistos.add(id);
                    unicos.push(p);
                }
            }
            if (unicos.length < projects.length) {
                projects.length = 0;
                projects.push(...unicos);
                localStorage.setItem('projects', JSON.stringify(projects));
            }
        }
        
        await obtenerProyectos();
        conectarSocket();
        crearBoton();
        
        console.log('✅ Listo');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();