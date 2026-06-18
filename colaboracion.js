// ============================================================
// 🚀 SISTEMA DE COLABORACIÓN - VERSIÓN OPTIMIZADA (SIN PARPADEOS)
// ============================================================

(function() {
    'use strict';
    
    console.log('🔥 SISTEMA DE COLABORACIÓN - VERSIÓN OPTIMIZADA');
    
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
    // CONFIGURACIÓN GENERAL
    // ============================================
    const STORAGE_KEY = 'colaboracion_data';
    let data = { proyectos: [], invitaciones: [], usuarios: [] };
    let panelAbierto = false;
    let sincronizacionEnCurso = false;
    let ultimoSyncCompleto = 0;
    
    function loadData() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                data = JSON.parse(saved);
                console.log('📂 Datos cargados:', data.proyectos.length, 'proyectos');
            } else {
                console.log('📂 Creando datos nuevos...');
                data = { proyectos: [], invitaciones: [], usuarios: [] };
                saveData();
            }
        } catch(e) {
            console.error('Error cargando datos:', e);
            data = { proyectos: [], invitaciones: [], usuarios: [] };
        }
        return data;
    }
    
    function saveData() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch(e) {
            console.error('Error guardando datos:', e);
        }
    }
    
    function getCurrentUser() {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (user.email) return user.email;
            const token = localStorage.getItem('authToken');
            if (token) {
                const payload = JSON.parse(atob(token.split('.')[1]));
                return payload.email || payload.sub;
            }
            const email = localStorage.getItem('userEmail');
            if (email) return email;
        } catch(e) {}
        return null;
    }
    
    // ============================================
    // NÚCLEO DEL SISTEMA (OPTIMIZADO)
    // ============================================
    const Core = {
        // ✅ SINCRONIZAR PROYECTOS EXISTENTES (UNA SOLA VEZ)
        syncExistingProjects: function() {
            const user = getCurrentUser();
            if (!user) {
                console.log('⏳ Esperando usuario...');
                return;
            }
            
            if (typeof projects === 'undefined' || !Array.isArray(projects)) {
                console.log('⚠️ projects no disponible');
                return;
            }
            
            // Solo sincronizar si hay cambios reales
            let hayCambios = false;
            
            projects.forEach(p => {
                const existe = data.proyectos.find(dp => dp.nombre === p.name);
                if (!existe) {
                    const nuevoProyecto = {
                        id: Date.now() + Math.floor(Math.random() * 1000),
                        nombre: p.name,
                        descripcion: p.description || '',
                        creador: p.clienteId || user,
                        fecha: new Date().toISOString(),
                        colaboradores: p.colaboradores && p.colaboradores.length > 0 ? p.colaboradores : [user],
                        tareas: (p.tasks || []).map(t => ({
                            id: t.id || Date.now(),
                            nombre: t.name || 'Tarea',
                            estado: t.status === 'completed' ? 'completada' : 'pendiente',
                            asignado: t.assignee || '',
                            startDate: t.startDate || '',
                            deadline: t.deadline || ''
                        })),
                        activo: true
                    };
                    data.proyectos.push(nuevoProyecto);
                    hayCambios = true;
                    console.log(`  ✅ "${p.name}" sincronizado`);
                } else {
                    // Actualizar colaboradores si es necesario
                    if (p.colaboradores && p.colaboradores.length > 0) {
                        let colaboradoresCambiaron = false;
                        p.colaboradores.forEach(c => {
                            if (!existe.colaboradores.includes(c)) {
                                existe.colaboradores.push(c);
                                colaboradoresCambiaron = true;
                            }
                        });
                        if (colaboradoresCambiaron) {
                            const idx = data.proyectos.indexOf(existe);
                            data.proyectos[idx] = existe;
                            hayCambios = true;
                        }
                    }
                }
            });
            
            if (hayCambios) {
                saveData();
                console.log('✅ Cambios guardados en colaboración');
            }
            
            return data.proyectos;
        },
        
        // ✅ SINCRONIZAR PROYECTOS EXTERNOS (SOLO CUANDO HAY CAMBIOS REALES)
        syncProjectsToMainSystem: function() {
            const user = getCurrentUser();
            if (!user) return;
            if (typeof projects === 'undefined' || !Array.isArray(projects)) return;
            
            const misProyectos = data.proyectos.filter(p => 
                p.colaboradores && p.colaboradores.includes(user)
            );
            
            if (misProyectos.length === 0) return;
            
            let cambios = 0;
            misProyectos.forEach(proyectoExterno => {
                const existe = projects.find(p => p.name === proyectoExterno.nombre);
                if (!existe) {
                    const nuevoProyecto = {
                        id: Date.now(),
                        name: proyectoExterno.nombre,
                        description: proyectoExterno.descripcion || '',
                        clienteId: localStorage.getItem('clienteId'),
                        tasks: (proyectoExterno.tareas || []).map(t => ({
                            id: t.id || Date.now() + Math.random(),
                            name: t.nombre || 'Tarea sin nombre',
                            status: t.estado === 'completada' ? 'completed' : 'pending',
                            priority: 'media',
                            estimatedTime: 0,
                            timeLogged: 0,
                            progress: 0,
                            assignee: t.asignado || '',
                            description: '',
                            startDate: t.startDate || '',
                            deadline: t.deadline || ''
                        })),
                        colaboradores: proyectoExterno.colaboradores || [user],
                        createdAt: new Date().toISOString(),
                        totalProjectTime: 0
                    };
                    projects.push(nuevoProyecto);
                    cambios++;
                    console.log('✅ Proyecto creado en sistema principal:', proyectoExterno.nombre);
                } else {
                    if (!existe.colaboradores) existe.colaboradores = [];
                    if (!existe.colaboradores.includes(user)) {
                        existe.colaboradores.push(user);
                        cambios++;
                    }
                }
            });
            
            if (cambios > 0) {
                localStorage.setItem('projects', JSON.stringify(projects));
                // Solo renderizar si hay cambios reales
                if (typeof renderProjects === 'function') {
                    renderProjects();
                }
                if (typeof renderKanbanTasks === 'function') {
                    renderKanbanTasks();
                }
                console.log(`✅ ${cambios} cambio(s) sincronizados al sistema principal`);
            }
        },
        
        getMyInvitations: function() {
            const user = getCurrentUser();
            if (!user) return [];
            return data.invitaciones.filter(i => i.email === user && i.estado === 'pendiente');
        },
        
        getMyProjects: function() {
            const user = getCurrentUser();
            if (!user) return [];
            return data.proyectos.filter(p => p.colaboradores && p.colaboradores.includes(user));
        },
        
        sendInvitation: function(proyectoId, email) {
            const user = getCurrentUser();
            if (!user) {
                alert('❌ Inicia sesión primero');
                return false;
            }
            
            const proyecto = data.proyectos.find(p => p.id == proyectoId);
            if (!proyecto) {
                alert('❌ Proyecto no encontrado');
                return false;
            }
            
            if (proyecto.colaboradores.includes(email)) {
                alert(`⚠️ ${email} ya es colaborador de "${proyecto.nombre}"`);
                return false;
            }
            
            const invitacion = {
                id: Date.now(),
                proyectoId: proyecto.id,
                proyectoNombre: proyecto.nombre,
                email: email,
                fecha: new Date().toISOString(),
                estado: 'pendiente',
                creador: user
            };
            
            data.invitaciones.push(invitacion);
            saveData();
            
            if (typeof emailjs !== 'undefined') {
                emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATE_ID,
                    {
                        to_email: email,
                        project_name: proyecto.nombre,
                        reply_to: user
                    }
                ).then(() => {
                    console.log('✅ Correo enviado a', email);
                }).catch((error) => {
                    console.error('❌ Error enviando correo:', error);
                });
            }
            
            alert(`✅ Invitación enviada a ${email} para "${proyecto.nombre}"`);
            updateBadge();
            renderPanel();
            return true;
        },
        
        acceptInvitation: function(invitacionId) {
            const user = getCurrentUser();
            if (!user) {
                alert('❌ Inicia sesión primero');
                return false;
            }
            
            const invitacion = data.invitaciones.find(i => i.id === invitacionId);
            if (!invitacion) {
                alert('❌ Invitación no encontrada');
                return false;
            }
            
            if (invitacion.estado !== 'pendiente') {
                alert('⚠️ Esta invitación ya fue procesada');
                return false;
            }
            
            if (invitacion.email !== user) {
                alert(`❌ Esta invitación es para ${invitacion.email}`);
                return false;
            }
            
            const proyecto = data.proyectos.find(p => p.id === invitacion.proyectoId);
            if (proyecto && !proyecto.colaboradores.includes(user)) {
                proyecto.colaboradores.push(user);
            }
            
            invitacion.estado = 'aceptada';
            invitacion.fechaAceptacion = new Date().toISOString();
            saveData();
            
            this.syncProjectsToMainSystem();
            
            alert(`✅ ¡Bienvenido al proyecto "${invitacion.proyectoNombre}"!`);
            
            if (typeof renderProjects === 'function') renderProjects();
            if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
            
            updateBadge();
            renderPanel();
            return true;
        }
    };
    
    // ============================================
    // INTERFAZ VISUAL - BOTÓN FLOTANTE
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
        loadData();
        const pendientes = Core.getMyInvitations();
        badge.textContent = pendientes.length;
        badge.style.display = pendientes.length > 0 ? 'flex' : 'none';
    }
    
    // ============================================
    // PANEL DE COLABORACIÓN
    // ============================================
    
    function togglePanel() {
        const existing = document.getElementById('colabPanel');
        if (existing) {
            existing.remove();
            panelAbierto = false;
            return;
        }
        
        loadData();
        const user = getCurrentUser();
        const pendientes = Core.getMyInvitations();
        const misProyectos = Core.getMyProjects();
        const clienteId = localStorage.getItem('clienteId');
        
        console.log('👤 Usuario:', user);
        console.log('🔑 clienteId:', clienteId);
        console.log('📂 Proyectos del usuario:', misProyectos.length);
        
        // ✅ DETERMINAR SI PUEDE INVITAR
        const esAdmin = user === 'ajackson2672@gmail.com';
        
        const esDuenoDeProyecto = misProyectos.some(p => {
            const proyectoMain = projects.find(pp => pp.name === p.nombre);
            if (proyectoMain) {
                return proyectoMain.clienteId === clienteId;
            }
            return p.colaboradores && p.colaboradores.length > 0 && p.colaboradores[0] === user;
        });
        
        const puedeInvitar = esAdmin || esDuenoDeProyecto;
        
        console.log('👑 ¿Puede invitar?', puedeInvitar);
        
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
        
        const proyectosOptions = misProyectos.map(p => 
            `<option value="${p.id}">${p.nombre}</option>`
        ).join('');
        
        const seccionInvitar = puedeInvitar ? `
            <div style="border-top: 1px solid #334155; padding-top: 16px;">
                <div style="color: #8b5cf6; font-size: 13px; font-weight: 600; margin-bottom: 10px;">➕ Invitar Colaborador</div>
                <div style="margin-bottom: 8px;">
                    <select id="invitarProyectoSelect" style="width: 100%; padding: 10px; background: #0f172a; border: 1px solid #334155; border-radius: 8px; color: white; font-size: 13px;">
                        ${proyectosOptions}
                        ${misProyectos.length === 0 ? '<option value="">No tienes proyectos</option>' : ''}
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
                💡 Solo los dueños de proyectos pueden invitar colaboradores.
                <br>Si eres dueño de un proyecto, aparecerá la opción aquí.
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
                <!-- Invitaciones Pendientes -->
                <div style="margin-bottom: 20px;">
                    <div style="color: #f59e0b; font-size: 13px; font-weight: 600; margin-bottom: 10px;">📩 Invitaciones Pendientes</div>
                    ${pendientes.length === 0 ? `
                        <div style="text-align: center; padding: 20px; color: #64748b; font-size: 13px;">No tienes invitaciones pendientes</div>
                    ` : pendientes.map(inv => `
                        <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 12px 16px; margin-bottom: 10px; border-left: 4px solid #f59e0b;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600;">${inv.proyectoNombre}</div>
                                    <div style="font-size: 11px; color: #94a3b8;">${new Date(inv.fecha).toLocaleDateString()}</div>
                                </div>
                                <button onclick="aceptarInvitacion(${inv.id})" style="background: #10b981; color: white; border: none; padding: 6px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 12px;">
                                    ✅ Aceptar
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <!-- Mis Proyectos Colaborativos -->
                <div style="margin-bottom: 20px;">
                    <div style="color: #10b981; font-size: 13px; font-weight: 600; margin-bottom: 10px;">📂 Mis Proyectos Colaborativos</div>
                    ${misProyectos.length === 0 ? `
                        <div style="text-align: center; padding: 20px; color: #64748b; font-size: 13px;">No estás en ningún proyecto colaborativo</div>
                    ` : misProyectos.map(p => `
                        <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 12px 16px; margin-bottom: 8px; border-left: 4px solid #10b981;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600;">${p.nombre}</div>
                                    <div style="font-size: 11px; color: #94a3b8;">${p.colaboradores?.length || 1} colaboradores</div>
                                </div>
                                <span style="color: #10b981; font-size: 11px;">✅ Activo</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                ${seccionInvitar}
            </div>
        `;
        
        document.body.appendChild(panel);
        panelAbierto = true;
        
        window.enviarInvitacion = function() {
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
            const resultado = Core.sendInvitation(Number(proyectoId), email);
            if (resultado) {
                mensaje.innerHTML = `<span style="color: #10b981;">✅ Invitación enviada a ${email}</span>`;
                emailInput.value = '';
                setTimeout(() => mensaje.innerHTML = '', 5000);
            }
        };
        
        window.aceptarInvitacion = function(id) {
            Core.acceptInvitation(id);
        };
    }
    
    // ============================================
    // INICIALIZACIÓN OPTIMIZADA
    // ============================================
    function init() {
        console.log('🚀 Inicializando sistema de colaboración (OPTIMIZADO)...');
        loadData();
        
        // ✅ SOLO UNA SINCRONIZACIÓN INICIAL
        Core.syncExistingProjects();
        Core.syncProjectsToMainSystem();
        
        // ✅ Crear botón flotante
        createFloatingButton();
        
        // ✅ Sincronización PERIÓDICA pero más ESPACIADA
        setInterval(function() {
            // Solo actualizar el badge, no todo el sistema
            loadData();
            updateBadge();
        }, 10000); // Cada 10 segundos en lugar de 5
        
        // ✅ Sincronización completa pero menos frecuente
        setInterval(function() {
            // Evitar sincronizaciones simultáneas
            if (!sincronizacionEnCurso) {
                sincronizacionEnCurso = true;
                try {
                    // Verificar si hay cambios antes de sincronizar
                    const proyectosActuales = JSON.stringify(projects);
                    const proyectosGuardados = localStorage.getItem('projects');
                    
                    // Solo sincronizar si hay cambios
                    if (proyectosActuales !== proyectosGuardados) {
                        Core.syncExistingProjects();
                        Core.syncProjectsToMainSystem();
                        console.log('🔄 Sincronización periódica ejecutada');
                    }
                } catch(e) {
                    console.error('Error en sincronización periódica:', e);
                } finally {
                    sincronizacionEnCurso = false;
                }
            }
        }, 60000); // Cada 60 segundos en lugar de 30
        
        console.log('✅ SISTEMA DE COLABORACIÓN LISTO (OPTIMIZADO)');
        console.log('📌 Busca el botón 👥 en la esquina inferior izquierda');
        console.log('📌 Los parpadeos deberían haber desaparecido');
    }
    
    // ============================================
    // EJECUTAR
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100);
    }
    
    // ============================================
    // SINCRONIZACIÓN EN TIEMPO REAL (OPTIMIZADA)
    // ============================================
    window.addEventListener('storage', function(e) {
        if (e.key === 'projects' && e.newValue) {
            console.log('📥 Cambio detectado en otra pestaña');
            // Solo procesar si hay cambios reales
            try {
                const nuevosProyectos = JSON.parse(e.newValue);
                if (Array.isArray(nuevosProyectos) && nuevosProyectos.length > 0) {
                    const cambios = JSON.stringify(projects) !== JSON.stringify(nuevosProyectos);
                    if (cambios) {
                        projects.length = 0;
                        projects.push(...nuevosProyectos);
                        // Solo renderizar si es necesario
                        if (typeof renderProjects === 'function') {
                            renderProjects();
                        }
                        if (typeof renderKanbanTasks === 'function') {
                            renderKanbanTasks();
                        }
                        if (typeof updateStatistics === 'function') {
                            updateStatistics();
                        }
                        // Sincronizar colaboración solo si hay cambios
                        if (!sincronizacionEnCurso) {
                            sincronizacionEnCurso = true;
                            try {
                                Core.syncExistingProjects();
                                showSyncNotification('🔄 Datos actualizados');
                            } finally {
                                sincronizacionEnCurso = false;
                            }
                        }
                    }
                }
            } catch(error) {
                console.error('❌ Error sincronizando:', error);
            }
        }
        
        if (e.key === 'colaboracion_data' && e.newValue) {
            console.log('📥 Cambio en sistema de colaboración');
            try {
                loadData();
                updateBadge();
                // Solo actualizar panel si está abierto
                if (document.getElementById('colabPanel')) {
                    // Recargar el panel en lugar de toggle
                    const panel = document.getElementById('colabPanel');
                    if (panel) {
                        // Actualizar solo el contenido, no cerrar/reabrir
                        // Esto evita el parpadeo
                        const oldPanel = panel;
                        oldPanel.remove();
                        // Recrear el panel
                        setTimeout(() => {
                            togglePanel();
                        }, 50);
                    }
                }
            } catch(error) {
                console.error('❌ Error:', error);
            }
        }
    });
    
    function showSyncNotification(message) {
        const existing = document.getElementById('syncNotification');
        if (existing) existing.remove();
        const notif = document.createElement('div');
        notif.id = 'syncNotification';
        notif.style.cssText = `
            position: fixed; top: 20px; right: 20px; background: #10b981; color: white;
            padding: 12px 20px; border-radius: 10px; z-index: 1000000;
            font-family: Arial, sans-serif; font-size: 14px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
            max-width: 350px;
        `;
        notif.textContent = message;
        document.body.appendChild(notif);
        setTimeout(() => {
            notif.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }
    
    if (!document.getElementById('syncStyles')) {
        const style = document.createElement('style');
        style.id = 'syncStyles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('✅ Sincronización en tiempo real activada (OPTIMIZADA)');
    console.log('⚠️ Las fechas de las tareas NO se modifican');
    console.log('✅ ELIMINADO EL PARPADEO DE LOS NOMBRES DE PROYECTOS');
    
})();