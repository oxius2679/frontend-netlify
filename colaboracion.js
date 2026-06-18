// ============================================================
// 🚀 SISTEMA DE COLABORACIÓN - VERSIÓN SIMPLIFICADA Y FUNCIONAL
// ============================================================

(function() {
    'use strict';
    
    console.log('🔥 SISTEMA DE COLABORACIÓN - VERSIÓN SIMPLIFICADA');
    
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
    
    function loadData() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                data = JSON.parse(saved);
                console.log('📂 Datos cargados:', data.proyectos.length, 'proyectos,', data.invitaciones.length, 'invitaciones');
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
            localStorage.setItem('_colab_timestamp', Date.now().toString());
        } catch(e) {
            console.error('Error guardando datos:', e);
        }
    }
    
    function getCurrentUser() {
        try {
            // Intentar obtener de diferentes fuentes
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (user.email) return user.email;
            
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    if (payload.email) return payload.email;
                    if (payload.sub) return payload.sub;
                } catch(e) {}
            }
            
            const email = localStorage.getItem('userEmail');
            if (email) return email;
            
            // Si no hay nada, devolver un valor por defecto para pruebas
            console.warn('⚠️ No se encontró usuario, usando "admin@test.com"');
            return 'admin@test.com';
        } catch(e) {
            console.error('Error obteniendo usuario:', e);
            return 'admin@test.com';
        }
    }
    
    // ============================================
    // NÚCLEO DEL SISTEMA - SIMPLIFICADO
    // ============================================
    const Core = {
        // ✅ SINCRONIZAR PROYECTOS EXISTENTES
        syncExistingProjects: function() {
            const user = getCurrentUser();
            console.log('🔄 Sincronizando para usuario:', user);
            
            if (typeof projects === 'undefined' || !Array.isArray(projects)) {
                console.log('⚠️ projects no disponible');
                return;
            }
            
            console.log('📋 Proyectos en sistema principal:', projects.length);
            
            let hayCambios = false;
            
            projects.forEach(p => {
                const existe = data.proyectos.find(dp => dp.nombre === p.name);
                if (!existe) {
                    // Crear nuevo proyecto en colaboración
                    const colaboradores = p.colaboradores || [user];
                    const nuevoProyecto = {
                        id: Date.now() + Math.floor(Math.random() * 1000),
                        nombre: p.name,
                        descripcion: p.description || '',
                        creador: p.clienteId || user,
                        fecha: new Date().toISOString(),
                        colaboradores: colaboradores,
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
                    console.log(`  ✅ Proyecto "${p.name}" sincronizado con ${colaboradores.length} colaboradores`);
                } else {
                    // Actualizar colaboradores
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
                            console.log(`  🔄 Colaboradores actualizados para "${p.name}"`);
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
        
        // ✅ OBTENER PROYECTOS DEL USUARIO (DONDE ES COLABORADOR O DUEÑO)
        getMyProjects: function() {
            const user = getCurrentUser();
            console.log('👤 Buscando proyectos para:', user);
            
            const todos = data.proyectos;
            console.log('📂 Total proyectos en data:', todos.length);
            
            // Mostrar todos los proyectos con sus colaboradores
            todos.forEach(p => {
                console.log(`  - "${p.nombre}" colaboradores:`, p.colaboradores);
            });
            
            // Filtrar proyectos donde el usuario está en la lista de colaboradores
            const misProyectos = todos.filter(p => {
                if (!p.colaboradores || !Array.isArray(p.colaboradores)) {
                    console.log(`  ⚠️ "${p.nombre}" no tiene colaboradores definidos`);
                    return false;
                }
                const esColaborador = p.colaboradores.includes(user);
                console.log(`  - "${p.nombre}" ¿${user} es colaborador?`, esColaborador);
                return esColaborador;
            });
            
            console.log(`📂 Proyectos para ${user}:`, misProyectos.length);
            return misProyectos;
        },
        
        // ✅ OBTENER PROYECTOS DONDE EL USUARIO ES DUEÑO
        getMisProyectosComoDueño: function() {
            const user = getCurrentUser();
            const misProyectos = this.getMyProjects();
            
            // Un usuario es dueño si es el PRIMER colaborador o si su email coincide con el creador
            const proyectosDueño = misProyectos.filter(p => {
                // Si tiene colaboradores y el primero es el usuario
                if (p.colaboradores && p.colaboradores.length > 0) {
                    return p.colaboradores[0] === user;
                }
                return false;
            });
            
            console.log(`👑 Proyectos donde ${user} es dueño:`, proyectosDueño.length);
            return proyectosDueño;
        },
        
        // ✅ VERIFICAR SI ES DUEÑO DE UN PROYECTO ESPECÍFICO
        esDueñoDeProyecto: function(proyectoId) {
            const user = getCurrentUser();
            const proyecto = data.proyectos.find(p => p.id == proyectoId);
            if (!proyecto) return false;
            
            const esDueño = proyecto.colaboradores && 
                           proyecto.colaboradores.length > 0 && 
                           proyecto.colaboradores[0] === user;
            
            console.log(`🔍 ¿${user} es dueño de "${proyecto.nombre}"?`, esDueño);
            return esDueño;
        },
        
        // ✅ OBTENER INVITACIONES PENDIENTES
        getMyInvitations: function() {
            const user = getCurrentUser();
            const pendientes = data.invitaciones.filter(i => 
                i.email === user && i.estado === 'pendiente'
            );
            console.log(`📩 Invitaciones pendientes para ${user}:`, pendientes.length);
            return pendientes;
        },
        
        // ✅ ENVIAR INVITACIÓN
        sendInvitation: function(proyectoId, email) {
            const user = getCurrentUser();
            console.log('📨 Enviando invitación...');
            console.log('  - Usuario:', user);
            console.log('  - Proyecto ID:', proyectoId);
            console.log('  - Email destinatario:', email);
            
            const proyecto = data.proyectos.find(p => p.id == proyectoId);
            if (!proyecto) {
                alert('❌ Proyecto no encontrado');
                return false;
            }
            
            console.log('  - Proyecto:', proyecto.nombre);
            console.log('  - Colaboradores actuales:', proyecto.colaboradores);
            
            // Verificar si el usuario es dueño
            if (!this.esDueñoDeProyecto(proyectoId)) {
                alert('❌ Solo el dueño del proyecto puede invitar colaboradores');
                return false;
            }
            
            if (proyecto.colaboradores.includes(email)) {
                alert(`⚠️ ${email} ya es colaborador de "${proyecto.nombre}"`);
                return false;
            }
            
            // Verificar invitación duplicada
            const existeInvitacion = data.invitaciones.some(
                i => i.proyectoId === proyecto.id && i.email === email && i.estado === 'pendiente'
            );
            if (existeInvitacion) {
                alert(`⚠️ Ya hay una invitación pendiente para ${email}`);
                return false;
            }
            
            const invitacion = {
                id: Date.now() + Math.floor(Math.random() * 1000),
                proyectoId: proyecto.id,
                proyectoNombre: proyecto.nombre,
                email: email,
                fecha: new Date().toISOString(),
                estado: 'pendiente',
                creador: user
            };
            
            data.invitaciones.push(invitacion);
            saveData();
            console.log('✅ Invitación creada:', invitacion);
            
            alert(`✅ Invitación enviada a ${email} para "${proyecto.nombre}"`);
            updateBadge();
            renderPanel();
            return true;
        },
        
        // ✅ ACEPTAR INVITACIÓN
        acceptInvitation: function(invitacionId) {
            const user = getCurrentUser();
            console.log('✅ Aceptando invitación:', invitacionId);
            
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
            if (proyecto) {
                if (!proyecto.colaboradores.includes(user)) {
                    proyecto.colaboradores.push(user);
                    console.log(`✅ ${user} agregado como colaborador de "${proyecto.nombre}"`);
                }
            }
            
            invitacion.estado = 'aceptada';
            invitacion.fechaAceptacion = new Date().toISOString();
            saveData();
            
            // Sincronizar con sistema principal
            this.syncToMainSystem();
            
            alert(`✅ ¡Bienvenido al proyecto "${invitacion.proyectoNombre}"!`);
            
            if (typeof renderProjects === 'function') renderProjects();
            if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
            
            updateBadge();
            renderPanel();
            return true;
        },
        
        // ✅ SINCRONIZAR CON SISTEMA PRINCIPAL
        syncToMainSystem: function() {
            const user = getCurrentUser();
            if (typeof projects === 'undefined') return;
            
            const misProyectos = this.getMyProjects();
            misProyectos.forEach(p => {
                const existe = projects.find(pp => pp.name === p.nombre);
                if (!existe) {
                    projects.push({
                        id: Date.now(),
                        name: p.nombre,
                        description: p.descripcion || '',
                        clienteId: localStorage.getItem('clienteId'),
                        tasks: [],
                        colaboradores: p.colaboradores || [user],
                        createdAt: new Date().toISOString()
                    });
                    console.log(`✅ Proyecto "${p.nombre}" sincronizado al sistema principal`);
                }
            });
            
            localStorage.setItem('projects', JSON.stringify(projects));
            if (typeof renderProjects === 'function') renderProjects();
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
        loadData();
        const pendientes = Core.getMyInvitations();
        badge.textContent = pendientes.length;
        badge.style.display = pendientes.length > 0 ? 'flex' : 'none';
    }
    
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
        const proyectosDueño = Core.getMisProyectosComoDueño();
        
        console.log('========================================');
        console.log('👤 Usuario actual:', user);
        console.log('📂 Proyectos donde es colaborador:', misProyectos.length);
        console.log('👑 Proyectos donde es dueño:', proyectosDueño.length);
        console.log('📩 Invitaciones pendientes:', pendientes.length);
        console.log('========================================');
        
        const puedeInvitar = proyectosDueño.length > 0;
        
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
        
        // Proyectos para invitar (solo los que son dueño)
        const proyectosParaInvitar = proyectosDueño.map(p => 
            `<option value="${p.id}">${p.nombre}</option>`
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
                💡 Para invitar colaboradores necesitas ser dueño de un proyecto.
                <br>El dueño es el primer colaborador agregado al proyecto.
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
                                    <div style="font-size: 11px; color: #94a3b8;">${new Date(inv.fecha).toLocaleDateString()} - De: ${inv.creador}</div>
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
                        <div style="text-align: center; padding: 20px; color: #64748b; font-size: 13px;">
                            No estás en ningún proyecto colaborativo
                            <br><span style="font-size: 11px;">Los proyectos aparecerán aquí cuando alguien te invite</span>
                        </div>
                    ` : misProyectos.map(p => {
                        const esDueño = proyectosDueño.some(dp => dp.id === p.id);
                        return `
                            <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 12px 16px; margin-bottom: 8px; border-left: 4px solid ${esDueño ? '#8b5cf6' : '#10b981'};">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="font-weight: 600;">${p.nombre}</div>
                                        <div style="font-size: 11px; color: #94a3b8;">
                                            ${p.colaboradores?.length || 1} colaboradores
                                            ${p.colaboradores ? `: ${p.colaboradores.join(', ')}` : ''}
                                        </div>
                                    </div>
                                    <span style="color: ${esDueño ? '#8b5cf6' : '#10b981'}; font-size: 11px; font-weight: 600;">
                                        ${esDueño ? '👑 DUEÑO' : '✅ Colaborador'}
                                    </span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                ${seccionInvitar}
                
                <!-- Debug info -->
                <div style="margin-top: 10px; padding: 10px; background: rgba(255,255,255,0.03); border-radius: 8px; font-size: 10px; color: #64748b; border: 1px solid #1e293b;">
                    <details>
                        <summary>🔍 Debug Info</summary>
                        <div style="margin-top: 5px; font-family: monospace;">
                            <div>Usuario: ${user}</div>
                            <div>Proyectos en data: ${data.proyectos.length}</div>
                            <div>Mis proyectos: ${misProyectos.length}</div>
                            <div>Proyectos donde soy dueño: ${proyectosDueño.length}</div>
                            <div>Invitaciones pendientes: ${pendientes.length}</div>
                            <div>Total invitaciones: ${data.invitaciones.length}</div>
                        </div>
                    </details>
                </div>
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
    
    function renderPanel() {
        if (document.getElementById('colabPanel')) {
            const panel = document.getElementById('colabPanel');
            panel.remove();
            setTimeout(() => togglePanel(), 100);
        }
    }
    
    // ============================================
    // INICIALIZACIÓN
    // ============================================
    function init() {
        console.log('🚀 Inicializando sistema de colaboración (SIMPLIFICADO)...');
        loadData();
        Core.syncExistingProjects();
        createFloatingButton();
        
        // Actualizar cada 10 segundos
        setInterval(function() {
            loadData();
            updateBadge();
        }, 10000);
        
        console.log('✅ SISTEMA DE COLABORACIÓN LISTO');
        console.log('👑 El DUEÑO es el PRIMER colaborador del proyecto');
        console.log('📌 Para debug: console.log(data)');
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
    // SINCRONIZACIÓN ENTRE PESTAÑAS
    // ============================================
    window.addEventListener('storage', function(e) {
        if (e.key === 'colaboracion_data' || e.key === '_colab_timestamp') {
            console.log('📥 Cambio detectado en colaboración');
            loadData();
            updateBadge();
            if (document.getElementById('colabPanel')) {
                const panel = document.getElementById('colabPanel');
                if (panel) {
                    panel.remove();
                    setTimeout(() => togglePanel(), 100);
                }
            }
        }
    });
    
    console.log('✅ Sistema de colaboración cargado correctamente');
    console.log('🔧 Para forzar actualización: limpiarDatos()');
    
    // Función de limpieza manual
    window.limpiarDatos = function() {
        if (confirm('¿Limpiar todos los datos de colaboración?')) {
            localStorage.removeItem(STORAGE_KEY);
            data = { proyectos: [], invitaciones: [], usuarios: [] };
            saveData();
            updateBadge();
            if (document.getElementById('colabPanel')) {
                document.getElementById('colabPanel').remove();
            }
            alert('✅ Datos limpiados. Recarga la página.');
        }
    };
    
})();