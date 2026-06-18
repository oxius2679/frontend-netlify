// ============================================================
// 🚀 SISTEMA DE COLABORACIÓN - VERSIÓN CON INVITACIONES FUNCIONALES
// ============================================================

(function() {
    'use strict';
    
    console.log('🔥 SISTEMA DE COLABORACIÓN - INVITACIONES FUNCIONALES');
    
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
                // Mostrar todas las invitaciones para debug
                if (data.invitaciones.length > 0) {
                    console.log('📨 Todas las invitaciones:');
                    data.invitaciones.forEach((inv, i) => {
                        console.log(`  ${i+1}. Para: ${inv.email} | Proyecto: ${inv.proyectoNombre} | Estado: ${inv.estado}`);
                    });
                }
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
            console.log('💾 Datos guardados:', data.invitaciones.length, 'invitaciones');
        } catch(e) {
            console.error('Error guardando datos:', e);
        }
    }
    
    function getCurrentUser() {
        try {
            // Intentar obtener de diferentes fuentes
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (user.email) {
                console.log('👤 Usuario obtenido de user.email:', user.email);
                return user.email;
            }
            
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    if (payload.email) {
                        console.log('👤 Usuario obtenido de token:', payload.email);
                        return payload.email;
                    }
                    if (payload.sub) {
                        console.log('👤 Usuario obtenido de token.sub:', payload.sub);
                        return payload.sub;
                    }
                } catch(e) {}
            }
            
            const email = localStorage.getItem('userEmail');
            if (email) {
                console.log('👤 Usuario obtenido de userEmail:', email);
                return email;
            }
            
            // Si no hay nada, usar un valor por defecto
            console.warn('⚠️ No se encontró usuario, usando "admin@test.com"');
            return 'admin@test.com';
        } catch(e) {
            console.error('Error obteniendo usuario:', e);
            return 'admin@test.com';
        }
    }
    
    // ============================================
    // NÚCLEO DEL SISTEMA
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
                    console.log(`  ✅ Proyecto "${p.name}" sincronizado`);
                } else {
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
        
        // ✅ OBTENER PROYECTOS DEL USUARIO
        getMyProjects: function() {
            const user = getCurrentUser();
            console.log('👤 Buscando proyectos para:', user);
            
            const todos = data.proyectos;
            console.log('📂 Total proyectos en data:', todos.length);
            
            const misProyectos = todos.filter(p => {
                if (!p.colaboradores || !Array.isArray(p.colaboradores)) {
                    return false;
                }
                const esColaborador = p.colaboradores.some(c => c.trim().toLowerCase() === user.trim().toLowerCase());
                if (esColaborador) {
                    console.log(`  ✅ "${p.nombre}" - ${user} es colaborador`);
                }
                return esColaborador;
            });
            
            console.log(`📂 Proyectos para ${user}:`, misProyectos.length);
            return misProyectos;
        },
        
        // ✅ OBTENER PROYECTOS DONDE ES DUEÑO
        getMisProyectosComoDueño: function() {
            const user = getCurrentUser();
            const misProyectos = this.getMyProjects();
            
            const proyectosDueño = misProyectos.filter(p => {
                if (p.colaboradores && p.colaboradores.length > 0) {
                    const esDueño = p.colaboradores[0].trim().toLowerCase() === user.trim().toLowerCase();
                    if (esDueño) {
                        console.log(`  👑 "${p.nombre}" - ${user} es DUEÑO`);
                    }
                    return esDueño;
                }
                return false;
            });
            
            console.log(`👑 Proyectos donde ${user} es dueño:`, proyectosDueño.length);
            return proyectosDueño;
        },
        
        // ✅ VERIFICAR SI ES DUEÑO
        esDueñoDeProyecto: function(proyectoId) {
            const user = getCurrentUser();
            const proyecto = data.proyectos.find(p => p.id == proyectoId);
            if (!proyecto) return false;
            
            const esDueño = proyecto.colaboradores && 
                           proyecto.colaboradores.length > 0 && 
                           proyecto.colaboradores[0].trim().toLowerCase() === user.trim().toLowerCase();
            
            console.log(`🔍 ¿${user} es dueño de "${proyecto.nombre}"?`, esDueño);
            return esDueño;
        },
        
        // ✅ OBTENER INVITACIONES PENDIENTES (CON COMPARACIÓN MEJORADA)
        getMyInvitations: function() {
            const user = getCurrentUser();
            console.log('📩 Buscando invitaciones para:', user);
            
            // Normalizar el email del usuario (quitar espacios, minúsculas)
            const userNormalizado = user.trim().toLowerCase();
            
            const pendientes = data.invitaciones.filter(i => {
                const emailNormalizado = i.email.trim().toLowerCase();
                const esParaMi = emailNormalizado === userNormalizado;
                const estaPendiente = i.estado === 'pendiente';
                
                if (esParaMi && estaPendiente) {
                    console.log(`  📨 Invitación encontrada: "${i.proyectoNombre}" de ${i.creador}`);
                }
                
                return esParaMi && estaPendiente;
            });
            
            console.log(`📩 Invitaciones pendientes para ${user}:`, pendientes.length);
            if (pendientes.length === 0) {
                console.log('  ℹ️ No hay invitaciones pendientes. Todas las invitaciones:', data.invitaciones.length);
                data.invitaciones.forEach(inv => {
                    console.log(`    - Para: ${inv.email} | Proyecto: ${inv.proyectoNombre} | Estado: ${inv.estado}`);
                });
            }
            return pendientes;
        },
        
        // ✅ ENVIAR INVITACIÓN (CON VERIFICACIONES MEJORADAS)
        sendInvitation: function(proyectoId, email) {
            const user = getCurrentUser();
            console.log('📨 Enviando invitación...');
            console.log('  - Usuario emisor:', user);
            console.log('  - Proyecto ID:', proyectoId);
            console.log('  - Email destinatario:', email);
            
            // Normalizar email
            const emailNormalizado = email.trim().toLowerCase();
            
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
            
            // Verificar si ya es colaborador
            const esColaborador = proyecto.colaboradores.some(c => c.trim().toLowerCase() === emailNormalizado);
            if (esColaborador) {
                alert(`⚠️ ${email} ya es colaborador de "${proyecto.nombre}"`);
                return false;
            }
            
            // Verificar invitación duplicada
            const existeInvitacion = data.invitaciones.some(
                i => i.proyectoId === proyecto.id && 
                     i.email.trim().toLowerCase() === emailNormalizado && 
                     i.estado === 'pendiente'
            );
            if (existeInvitacion) {
                alert(`⚠️ Ya hay una invitación pendiente para ${email}`);
                return false;
            }
            
            const invitacion = {
                id: Date.now() + Math.floor(Math.random() * 1000),
                proyectoId: proyecto.id,
                proyectoNombre: proyecto.nombre,
                email: email, // Guardar el email exacto que ingresó el usuario
                fecha: new Date().toISOString(),
                estado: 'pendiente',
                creador: user
            };
            
            data.invitaciones.push(invitacion);
            saveData();
            console.log('✅ Invitación CREADA y GUARDADA:', invitacion);
            
            // Mostrar todas las invitaciones después de guardar
            console.log('📨 Todas las invitaciones después de guardar:');
            data.invitaciones.forEach((inv, idx) => {
                console.log(`  ${idx+1}. Para: ${inv.email} | Proyecto: ${inv.proyectoNombre} | Estado: ${inv.estado}`);
            });
            
            // Enviar correo
            if (typeof emailjs !== 'undefined') {
                emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATE_ID,
                    {
                        to_email: email,
                        project_name: proyecto.nombre,
                        reply_to: user,
                        message: `Has sido invitado al proyecto "${proyecto.nombre}" por ${user}. Acepta la invitación en el panel de colaboración (botón 👥 en la esquina inferior izquierda).`
                    }
                ).then(() => {
                    console.log('✅ Correo enviado a', email);
                }).catch((error) => {
                    console.error('❌ Error enviando correo:', error);
                });
            }
            
            alert(`✅ Invitación enviada a ${email} para "${proyecto.nombre}"`);
            
            // Forzar actualización del badge y panel
            updateBadge();
            
            // Si el panel está abierto, cerrarlo y abrirlo para actualizar
            if (document.getElementById('colabPanel')) {
                const panel = document.getElementById('colabPanel');
                panel.remove();
                panelAbierto = false;
                setTimeout(() => togglePanel(), 500);
            }
            
            return true;
        },
        
        // ✅ ACEPTAR INVITACIÓN
        acceptInvitation: function(invitacionId) {
            const user = getCurrentUser();
            console.log('✅ Aceptando invitación ID:', invitacionId);
            
            const invitacion = data.invitaciones.find(i => i.id === invitacionId);
            if (!invitacion) {
                alert('❌ Invitación no encontrada');
                return false;
            }
            
            console.log('  - Invitación encontrada:', invitacion);
            
            if (invitacion.estado !== 'pendiente') {
                alert('⚠️ Esta invitación ya fue procesada');
                return false;
            }
            
            // Verificar que la invitación sea para el usuario actual
            const userNormalizado = user.trim().toLowerCase();
            const emailInvitacionNormalizado = invitacion.email.trim().toLowerCase();
            
            if (emailInvitacionNormalizado !== userNormalizado) {
                alert(`❌ Esta invitación es para ${invitacion.email}`);
                return false;
            }
            
            const proyecto = data.proyectos.find(p => p.id === invitacion.proyectoId);
            if (proyecto) {
                // Verificar si ya es colaborador
                const yaEsColaborador = proyecto.colaboradores.some(c => c.trim().toLowerCase() === userNormalizado);
                if (!yaEsColaborador) {
                    proyecto.colaboradores.push(user);
                    console.log(`✅ ${user} agregado como colaborador de "${proyecto.nombre}"`);
                } else {
                    console.log(`ℹ️ ${user} ya es colaborador de "${proyecto.nombre}"`);
                }
            }
            
            invitacion.estado = 'aceptada';
            invitacion.fechaAceptacion = new Date().toISOString();
            saveData();
            console.log('✅ Invitación aceptada y guardada');
            
            alert(`✅ ¡Bienvenido al proyecto "${invitacion.proyectoNombre}"!`);
            
            // Sincronizar con sistema principal
            this.syncToMainSystem();
            
            if (typeof renderProjects === 'function') renderProjects();
            if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
            
            updateBadge();
            
            // Actualizar panel
            if (document.getElementById('colabPanel')) {
                const panel = document.getElementById('colabPanel');
                panel.remove();
                panelAbierto = false;
                setTimeout(() => togglePanel(), 500);
            }
            
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
        const count = pendientes.length;
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
        console.log('🔴 Badge actualizado:', count, 'invitaciones');
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
        console.log('📊 PANEL DE COLABORACIÓN');
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
            </div>
        `;
        
        panel.innerHTML = `
            <div style="padding: 16px 20px; background: #1e293b; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 20px;">👥</span>
                    <span style="font-weight: 600; font-size: 16px;">Colaboración</span>
                    ${pendientes.length > 0 ? `<span style="background: #ef4444; padding: 2px 10px; border-radius: 12px; font-size: 11px; animation: pulse 1s infinite;">${pendientes.length}</span>` : ''}
                </div>
                <button onclick="document.getElementById('colabPanel').remove()" style="background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer;">✕</button>
            </div>
            
            <div style="padding: 16px; overflow-y: auto; flex: 1; max-height: 400px;">
                <!-- Invitaciones Pendientes -->
                <div style="margin-bottom: 20px;">
                    <div style="color: #f59e0b; font-size: 13px; font-weight: 600; margin-bottom: 10px;">📩 Invitaciones Pendientes</div>
                    ${pendientes.length === 0 ? `
                        <div style="text-align: center; padding: 20px; color: #64748b; font-size: 13px;">
                            No tienes invitaciones pendientes
                            ${data.invitaciones.length > 0 ? `<br><span style="font-size: 11px;">(Hay ${data.invitaciones.length} invitaciones totales, pero ninguna para ti)</span>` : ''}
                        </div>
                    ` : pendientes.map(inv => `
                        <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 12px 16px; margin-bottom: 10px; border-left: 4px solid #f59e0b; animation: slideIn 0.3s ease;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600;">${inv.proyectoNombre}</div>
                                    <div style="font-size: 11px; color: #94a3b8;">
                                        De: ${inv.creador} | ${new Date(inv.fecha).toLocaleDateString()}
                                    </div>
                                </div>
                                <button onclick="aceptarInvitacion(${inv.id})" style="background: #10b981; color: white; border: none; padding: 6px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 12px;">
                                    ✅ Aceptar
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <!-- Mis Proyectos -->
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
                        <summary>🔍 Debug - Todas las invitaciones (${data.invitaciones.length})</summary>
                        <div style="margin-top: 5px; font-family: monospace; max-height: 150px; overflow: auto;">
                            ${data.invitaciones.length === 0 ? 'No hay invitaciones' : 
                            data.invitaciones.map((inv, idx) => 
                                `<div style="padding: 2px 0; border-bottom: 1px solid #1e293b;">
                                    ${idx+1}. Para: <strong>${inv.email}</strong> | Proyecto: ${inv.proyectoNombre} | Estado: ${inv.estado} | De: ${inv.creador}
                                    ${inv.email.trim().toLowerCase() === user.trim().toLowerCase() ? ' 👈 (TÚ)' : ''}
                                </div>`
                            ).join('')}
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
            panelAbierto = false;
            setTimeout(() => togglePanel(), 300);
        }
    }
    
    // ============================================
    // INICIALIZACIÓN
    // ============================================
    function init() {
        console.log('🚀 Inicializando sistema de colaboración...');
        loadData();
        Core.syncExistingProjects();
        createFloatingButton();
        
        // Sincronización periódica más frecuente para invitaciones
        setInterval(function() {
            const oldData = JSON.stringify(data);
            loadData();
            const newData = JSON.stringify(data);
            if (oldData !== newData) {
                console.log('🔄 Datos actualizados automáticamente');
                updateBadge();
                if (document.getElementById('colabPanel')) {
                    const panel = document.getElementById('colabPanel');
                    panel.remove();
                    panelAbierto = false;
                    setTimeout(() => togglePanel(), 300);
                }
            }
        }, 5000); // Cada 5 segundos para detectar invitaciones nuevas
        
        console.log('✅ SISTEMA DE COLABORACIÓN LISTO');
        console.log('📌 Para debug: console.log(data)');
        console.log('📌 Para ver invitaciones: Core.getMyInvitations()');
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
            console.log('📥 Cambio detectado en colaboración desde otra pestaña');
            loadData();
            updateBadge();
            if (document.getElementById('colabPanel')) {
                const panel = document.getElementById('colabPanel');
                if (panel) {
                    panel.remove();
                    panelAbierto = false;
                    setTimeout(() => togglePanel(), 300);
                }
            }
        }
    });
    
    // Estilos para animaciones
    if (!document.getElementById('colabStyles')) {
        const style = document.createElement('style');
        style.id = 'colabStyles';
        style.textContent = `
            @keyframes slideIn {
                from { opacity: 0; transform: translateX(-20px); }
                to { opacity: 1; transform: translateX(0); }
            }
            @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('✅ Sistema de colaboración cargado');
    console.log('🔧 Para forzar actualización: Core.syncExistingProjects()');
    
})();