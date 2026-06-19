// ============================================================
// 🚀 SISTEMA DE COLABORACIÓN - VERSIÓN CON MONGODB
// ============================================================

(function() {
    'use strict';
    
    console.log('🔥 SISTEMA DE COLABORACIÓN - CON MONGODB');
    
    // ============================================
    // CONFIGURACIÓN
    // ============================================
    
    // 🔥 URL DE TU BACKEND - CAMBIA ESTO SEGÚN CORRESPONDA
    const API_URL = 'https://mi-sistema-proyectos-backend-4.onrender.com/api';
    // Si estás en desarrollo local, usa:
    // const API_URL = 'http://localhost:10000/api';
    
    const STORAGE_KEY = 'colaboracion_data';
    let data = { proyectos: [], invitaciones: [], usuarios: [] };
    let panelAbierto = false;    
    // ============================================
    // FUNCIONES DE API - MONGODB
    // ============================================
    const API = {
        // 📨 OBTENER INVITACIONES DE MONGODB
        async getInvitaciones(email) {
            try {
                const response = await fetch(`${API_URL}/invitaciones?email=${encodeURIComponent(email)}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) throw new Error('Error al obtener invitaciones');
                const data = await response.json();
                console.log('📨 Invitaciones desde MongoDB:', data.length);
                return data;
            } catch (error) {
                console.error('❌ Error obteniendo invitaciones:', error);
                return [];
            }
        },
        
        // 📨 CREAR INVITACIÓN EN MONGODB
        async crearInvitacion(invitacion) {
            try {
                const response = await fetch(`${API_URL}/invitaciones`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(invitacion)
                });
                if (!response.ok) throw new Error('Error al crear invitación');
                const data = await response.json();
                console.log('✅ Invitación creada en MongoDB:', data);
                return data;
            } catch (error) {
                console.error('❌ Error creando invitación:', error);
                return null;
            }
        },
        
        // 📨 ACEPTAR INVITACIÓN EN MONGODB
        async aceptarInvitacion(invitacionId, usuario) {
            try {
                const response = await fetch(`${API_URL}/invitaciones/${invitacionId}/aceptar`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ usuario })
                });
                if (!response.ok) throw new Error('Error al aceptar invitación');
                const data = await response.json();
                console.log('✅ Invitación aceptada en MongoDB:', data);
                return data;
            } catch (error) {
                console.error('❌ Error aceptando invitación:', error);
                return null;
            }
        },
        
        // 📨 RECHAZAR INVITACIÓN EN MONGODB
        async rechazarInvitacion(invitacionId) {
            try {
                const response = await fetch(`${API_URL}/invitaciones/${invitacionId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) throw new Error('Error al rechazar invitación');
                console.log('✅ Invitación rechazada');
                return true;
            } catch (error) {
                console.error('❌ Error rechazando invitación:', error);
                return false;
            }
        },
        
        // 📂 OBTENER PROYECTOS COLABORATIVOS
        async getProyectosColaborativos(email) {
            try {
                const response = await fetch(`${API_URL}/proyectos/colaborativos?email=${encodeURIComponent(email)}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) throw new Error('Error al obtener proyectos');
                const data = await response.json();
                console.log('📂 Proyectos colaborativos:', data.length);
                return data;
            } catch (error) {
                console.error('❌ Error obteniendo proyectos:', error);
                return [];
            }
        }
    };
    
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
    // FUNCIONES LOCALES
    // ============================================
    function loadData() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                data = JSON.parse(saved);
                console.log('📂 Datos locales cargados:', data.proyectos.length, 'proyectos');
            } else {
                data = { proyectos: [], invitaciones: [], usuarios: [] };
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
    
    // ============================================
    // NÚCLEO DEL SISTEMA - CON MONGODB
    // ============================================
    const Core = {
        // ✅ CARGAR INVITACIONES DESDE MONGODB
        async loadInvitacionesFromDB() {
            const user = getCurrentUser();
            if (!user) {
                console.log('⏳ No hay usuario logueado');
                return [];
            }
            
            console.log('📨 Cargando invitaciones desde MongoDB para:', user);
            const invitaciones = await API.getInvitaciones(user);
            
            // Guardar en localStorage para caché
            data.invitaciones = invitaciones;
            saveData();
            
            console.log('📨 Invitaciones cargadas:', invitaciones.length);
            return invitaciones;
        },
        
        // ✅ CARGAR PROYECTOS COLABORATIVOS DESDE MONGODB
        async loadProyectosFromDB() {
            const user = getCurrentUser();
            if (!user) return [];
            
            console.log('📂 Cargando proyectos colaborativos desde MongoDB para:', user);
            const proyectos = await API.getProyectosColaborativos(user);
            
            // Guardar en localStorage para caché
            data.proyectos = proyectos;
            saveData();
            
            console.log('📂 Proyectos cargados:', proyectos.length);
            return proyectos;
        },
        
        // ✅ OBTENER PROYECTOS DEL USUARIO (desde caché local)
        getMyProjects: function() {
            const user = getCurrentUser();
            if (!user) return [];
            
            const userNormalizado = user.trim().toLowerCase();
            
            const misProyectos = data.proyectos.filter(p => {
                if (!p.colaboradores || !Array.isArray(p.colaboradores)) {
                    return false;
                }
                return p.colaboradores.some(c => c.trim().toLowerCase() === userNormalizado);
            });
            
            console.log(`📂 Proyectos para ${user}:`, misProyectos.length);
            return misProyectos;
        },
        
        // ✅ OBTENER PROYECTOS DONDE ES DUEÑO
        getMisProyectosComoDueño: function() {
            const user = getCurrentUser();
            if (!user) return [];
            
            const userNormalizado = user.trim().toLowerCase();
            
            const proyectosDueño = data.proyectos.filter(p => {
                if (p.colaboradores && p.colaboradores.length > 0) {
                    return p.colaboradores[0].trim().toLowerCase() === userNormalizado;
                }
                return false;
            });
            
            console.log(`👑 Proyectos donde ${user} es dueño:`, proyectosDueño.length);
            return proyectosDueño;
        },
        
        // ✅ VERIFICAR SI ES DUEÑO
        esDueñoDeProyecto: function(proyectoId) {
            const user = getCurrentUser();
            if (!user) return false;
            
            const userNormalizado = user.trim().toLowerCase();
            const proyecto = data.proyectos.find(p => p.id == proyectoId);
            if (!proyecto) return false;
            
            return proyecto.colaboradores && 
                   proyecto.colaboradores.length > 0 && 
                   proyecto.colaboradores[0].trim().toLowerCase() === userNormalizado;
        },
        
        // ✅ OBTENER INVITACIONES PENDIENTES (desde caché local)
        getMyInvitations: function() {
            const user = getCurrentUser();
            if (!user) return [];
            
            const userNormalizado = user.trim().toLowerCase();
            
            const pendientes = data.invitaciones.filter(i => {
                const emailNormalizado = i.email.trim().toLowerCase();
                return emailNormalizado === userNormalizado && i.estado === 'pendiente';
            });
            
            console.log(`📩 Invitaciones pendientes para ${user}:`, pendientes.length);
            return pendientes;
        },
        
        // ✅ ENVIAR INVITACIÓN - GUARDAR EN MONGODB
        async sendInvitation(proyectoId, email) {
            const user = getCurrentUser();
            if (!user) {
                alert('❌ Inicia sesión primero');
                return false;
            }
            
            console.log('📨 Enviando invitación a:', email);
            
            const emailNormalizado = email.trim().toLowerCase();
            const proyecto = data.proyectos.find(p => p.id == proyectoId);
            
            if (!proyecto) {
                alert('❌ Proyecto no encontrado');
                return false;
            }
            
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
            
            // Verificar invitación duplicada en MongoDB
            const invitacionExistente = data.invitaciones.some(
                i => i.proyectoId === proyecto.id && 
                     i.email.trim().toLowerCase() === emailNormalizado && 
                     i.estado === 'pendiente'
            );
            if (invitacionExistente) {
                alert(`⚠️ Ya hay una invitación pendiente para ${email} en "${proyecto.nombre}"`);
                return false;
            }
            
            // Crear invitación
            const nuevaInvitacion = {
                proyectoId: proyecto.id,
                proyectoNombre: proyecto.nombre,
                email: email,
                fecha: new Date().toISOString(),
                estado: 'pendiente',
                creador: user,
                creadorEmail: user
            };
            
            // Guardar en MongoDB
            const resultado = await API.crearInvitacion(nuevaInvitacion);
            
            if (!resultado) {
                alert('❌ Error al guardar la invitación en la base de datos');
                return false;
            }
            
            // Actualizar caché local
            data.invitaciones.push(resultado);
            saveData();
            
            console.log('✅ Invitación guardada en MongoDB:', resultado);
            
            // Enviar correo
            if (typeof emailjs !== 'undefined') {
                emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATE_ID,
                    {
                        to_email: email,
                        project_name: proyecto.nombre,
                        reply_to: user,
                        message: `Has sido invitado al proyecto "${proyecto.nombre}" por ${user}.`
                    }
                ).then(() => {
                    console.log('✅ Correo enviado a', email);
                }).catch((error) => {
                    console.error('❌ Error enviando correo:', error);
                });
            }
            
            alert(`✅ Invitación enviada a ${email} para "${proyecto.nombre}"`);
            
            // Actualizar UI
            updateBadge();
            if (document.getElementById('colabPanel')) {
                const panel = document.getElementById('colabPanel');
                panel.remove();
                panelAbierto = false;
                setTimeout(() => togglePanel(), 500);
            }
            
            return true;
        },
        
        // ✅ ACEPTAR INVITACIÓN - EN MONGODB
        async acceptInvitation(invitacionId) {
            const user = getCurrentUser();
            if (!user) {
                alert('❌ Inicia sesión primero');
                return false;
            }
            
            console.log('✅ Aceptando invitación ID:', invitacionId);
            
            const invitacion = data.invitaciones.find(i => i.id === invitacionId);
            if (!invitacion) {
                alert('❌ Invitación no encontrada');
                return false;
            }
            
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
            
            // Aceptar en MongoDB
            const resultado = await API.aceptarInvitacion(invitacionId, user);
            
            if (!resultado) {
                alert('❌ Error al aceptar la invitación');
                return false;
            }
            
            // Actualizar caché local
            invitacion.estado = 'aceptada';
            invitacion.fechaAceptacion = new Date().toISOString();
            saveData();
            
            // Agregar al proyecto en el sistema principal
            const proyecto = data.proyectos.find(p => p.id === invitacion.proyectoId);
            if (proyecto && !proyecto.colaboradores.includes(user)) {
                proyecto.colaboradores.push(user);
                saveData();
            }
            
            alert(`✅ ¡Bienvenido al proyecto "${invitacion.proyectoNombre}"!`);
            
            // Actualizar interfaces
            if (typeof renderProjects === 'function') renderProjects();
            if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
            
            updateBadge();
            if (document.getElementById('colabPanel')) {
                const panel = document.getElementById('colabPanel');
                panel.remove();
                panelAbierto = false;
                setTimeout(() => togglePanel(), 500);
            }
            
            // Recargar invitaciones desde MongoDB
            await this.loadInvitacionesFromDB();
            
            return true;
        },
        
        // ✅ RECARGAR DATOS DESDE MONGODB
        async refreshData() {
            console.log('🔄 Recargando datos desde MongoDB...');
            await this.loadInvitacionesFromDB();
            await this.loadProyectosFromDB();
            updateBadge();
            
            if (document.getElementById('colabPanel')) {
                const panel = document.getElementById('colabPanel');
                panel.remove();
                panelAbierto = false;
                setTimeout(() => togglePanel(), 500);
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
        loadData();
        const pendientes = Core.getMyInvitations();
        const count = pendientes.length;
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
    
    async function togglePanel() {
        const existing = document.getElementById('colabPanel');
        if (existing) {
            existing.remove();
            panelAbierto = false;
            return;
        }
        
        // Cargar datos desde MongoDB antes de mostrar el panel
        await Core.refreshData();
        
        const user = getCurrentUser();
        const pendientes = Core.getMyInvitations();
        const misProyectos = Core.getMyProjects();
        const proyectosDueño = Core.getMisProyectosComoDueño();
        
        console.log('========================================');
        console.log('📊 PANEL DE COLABORACIÓN');
        console.log('👤 Usuario actual:', user);
        console.log('📂 Proyectos colaborativos:', misProyectos.length);
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
                    ${pendientes.length > 0 ? `<span style="background: #ef4444; padding: 2px 10px; border-radius: 12px; font-size: 11px;">${pendientes.length}</span>` : ''}
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
                            <br><span style="font-size: 11px;">Las invitaciones se cargan desde la base de datos</span>
                        </div>
                    ` : pendientes.map(inv => `
                        <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 12px 16px; margin-bottom: 10px; border-left: 4px solid #f59e0b;">
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
                
                <!-- Info de sincronización -->
                <div style="margin-top: 10px; padding: 10px; background: rgba(255,255,255,0.03); border-radius: 8px; font-size: 10px; color: #64748b; border: 1px solid #1e293b; text-align: center;">
                    🔄 Datos sincronizados con MongoDB
                    <br><span style="font-size: 9px;">Las invitaciones se comparten entre todos los usuarios</span>
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
            const resultado = await Core.sendInvitation(Number(proyectoId), email);
            if (resultado) {
                mensaje.innerHTML = `<span style="color: #10b981;">✅ Invitación enviada a ${email}</span>`;
                emailInput.value = '';
                setTimeout(() => mensaje.innerHTML = '', 5000);
            }
        };
        
        window.aceptarInvitacion = async function(id) {
            await Core.acceptInvitation(id);
        };
    }
    
    // ============================================
    // INICIALIZACIÓN
    // ============================================
    async function init() {
        console.log('🚀 Inicializando sistema de colaboración con MongoDB...');
        loadData();
        
        // Cargar datos desde MongoDB
        await Core.loadInvitacionesFromDB();
        await Core.loadProyectosFromDB();
        
        createFloatingButton();
        
        // Sincronización periódica con MongoDB (cada 15 segundos)
        setInterval(async function() {
            await Core.refreshData();
        }, 15000);
        
        console.log('✅ SISTEMA DE COLABORACIÓN LISTO CON MONGODB');
        console.log('📌 Las invitaciones ahora se comparten entre todos los usuarios');
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
            console.log('📥 Cambio detectado en localStorage');
            loadData();
            updateBadge();
        }
    });
    
    console.log('✅ Sistema de colaboración con MongoDB cargado');
    console.log('📌 Para forzar actualización: Core.refreshData()');
    
})();