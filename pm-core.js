// pm-core.js - PM Virtual Ejecutivo
(function() {
    console.log('🚀 Cargando PM Virtual Ejecutivo...');

    // ============================================
    // CONFIGURACIÓN INICIAL
    // ============================================
    // Esperar a que los datos estén disponibles
    let interval = setInterval(() => {
        if (typeof window.projects !== 'undefined' || localStorage.getItem('projects')) {
            clearInterval(interval);
            console.log('✅ Datos de proyectos detectados');
            iniciarPMVirtual();
        }
    }, 500);

    // ============================================
    // INICIALIZACIÓN DEL PM
    // ============================================
    function iniciarPMVirtual() {
        // Crear botón flotante si no existe
        if (!document.getElementById('pmVirtualBtn')) {
            const btn = document.createElement('button');
            btn.id = 'pmVirtualBtn';
            btn.innerHTML = '👨‍💼 PM Virtual';
            btn.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                z-index: 10000;
                background: linear-gradient(135deg, #2c3e50, #1a2632);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 40px;
                font-weight: bold;
                cursor: pointer;
                font-size: 14px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                transition: all 0.2s;
            `;
            btn.onmouseenter = () => btn.style.transform = 'scale(1.05)';
            btn.onmouseleave = () => btn.style.transform = 'scale(1)';
            btn.onclick = () => window.PMVirtual.abrirPanel();
            document.body.appendChild(btn);
            console.log('✅ Botón PM Virtual añadido');
        }

        // Exponer el PM Virtual globalmente
        window.PMVirtual = {
            abrirPanel: abrirPanel,
            generarDocumento: window.generarDocumentoPM || (() => {}), // se definirá en pm-docs.js
            gestionarReunion: window.gestionarReunionPM || (() => {}), // se definirá en pm-meetings.js
            obtenerRecomendaciones: obtenerRecomendaciones,
            aplicarRecomendacion: aplicarRecomendacion,
            obtenerProyectos: obtenerProyectos,
            obtenerProyectoActual: obtenerProyectoActual
        };

        // Integración con SystemAssistant (si existe)
        if (window.SystemAssistant && typeof window.SystemAssistant.registrarComando === 'function') {
            window.SystemAssistant.registrarComando('pm', procesarComandoPM);
        } else if (window.SystemAssistant && typeof window.SystemAssistant.processMessage === 'function') {
            // Extender el asistente existente
            const originalProcess = window.SystemAssistant.processMessage;
            window.SystemAssistant.processMessage = function(message) {
                if (message && message.type === 'user') {
                    const cmd = message.content.toLowerCase();
                    if (cmd.includes('pm') || cmd.includes('project manager') || cmd.includes('virtual')) {
                        const respuesta = procesarComandoPM(cmd);
                        if (respuesta) {
                            this.addMessage('assistant', respuesta);
                            return;
                        }
                    }
                }
                return originalProcess.call(this, message);
            };
        }
    }

    // ============================================
    // FUNCIONES AUXILIARES
    // ============================================
    function obtenerProyectos() {
        try {
            const stored = localStorage.getItem('projects');
            if (stored) return JSON.parse(stored);
            if (window.projects) return window.projects;
            return [];
        } catch(e) { return []; }
    }

    function obtenerProyectoActual() {
        const proyectos = obtenerProyectos();
        let idx = window.currentProjectIndex;
        if (idx === undefined) {
            idx = parseInt(localStorage.getItem('currentProjectIndex')) || 0;
        }
        return proyectos[idx] || null;
    }

    function guardarProyectos(proyectos) {
        localStorage.setItem('projects', JSON.stringify(proyectos));
        if (window.projects) window.projects = proyectos;
    }

    // ============================================
    // PANEL PRINCIPAL DEL PM
    // ============================================
    function abrirPanel() {
        const overlay = document.createElement('div');
        overlay.id = 'pmVirtualPanel';
        overlay.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85);
            backdrop-filter: blur(10px);
            z-index: 100000;
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        const panel = document.createElement('div');
        panel.style.cssText = `
            width: 1100px;
            max-width: 90vw;
            height: 85vh;
            background: linear-gradient(135deg, #0f172a, #1e293b);
            border-radius: 24px;
            border: 1px solid #3b82f6;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            color: white;
            font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
        `;

        // Tabs
        const tabs = ['📊 Dashboard', '📄 Documentos', '⚙️ Control', '🗓️ Reuniones'];
        let activeTab = 0;

        // Header con tabs
        const header = document.createElement('div');
        header.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 25px;
            background: rgba(0,0,0,0.3);
            border-bottom: 1px solid #3b82f6;
        `;
        header.innerHTML = `
            <div style="display: flex; gap: 20px;">
                ${tabs.map((tab, i) => `
                    <button class="pm-tab" data-tab="${i}" style="
                        background: none;
                        border: none;
                        color: ${i === activeTab ? '#3b82f6' : '#94a3b8'};
                        font-size: 16px;
                        font-weight: bold;
                        cursor: pointer;
                        padding: 8px 16px;
                        border-radius: 8px;
                        transition: all 0.2s;
                    ">${tab}</button>
                `).join('')}
            </div>
            <button id="closePmPanel" style="
                background: rgba(239,68,68,0.2);
                border: 1px solid #ef4444;
                color: #ef4444;
                padding: 8px 16px;
                border-radius: 8px;
                cursor: pointer;
            ">✕ Cerrar</button>
        `;
        panel.appendChild(header);

        // Contenedor de contenido
        const contentDiv = document.createElement('div');
        contentDiv.id = 'pmContent';
        contentDiv.style.cssText = `
            flex: 1;
            overflow-y: auto;
            padding: 25px;
        `;
        panel.appendChild(contentDiv);

        // Cargar contenido inicial (Dashboard)
        function cargarTab(index) {
            const tabsBtns = document.querySelectorAll('.pm-tab');
            tabsBtns.forEach((btn, i) => {
                btn.style.color = i === index ? '#3b82f6' : '#94a3b8';
            });
            activeTab = index;
            if (index === 0) renderDashboard(contentDiv);
            else if (index === 1) renderDocumentos(contentDiv);
            else if (index === 2) renderControl(contentDiv);
            else if (index === 3) renderReuniones(contentDiv);
        }

        // Eventos de tabs
        header.querySelectorAll('.pm-tab').forEach((btn, i) => {
            btn.onclick = () => cargarTab(i);
        });
        document.getElementById('closePmPanel').onclick = () => overlay.remove();

        overlay.appendChild(panel);
        document.body.appendChild(overlay);
        cargarTab(0);
    }

    // ============================================
    // TAB 1: DASHBOARD EJECUTIVO
    // ============================================
    function renderDashboard(container) {
        const proyectos = obtenerProyectos();
        const proyecto = obtenerProyectoActual();
        const tasks = proyecto?.tasks || [];

        const total = tasks.length;
        const completadas = tasks.filter(t => t.status === 'completed').length;
        const enProgreso = tasks.filter(t => t.status === 'inProgress').length;
        const pendientes = tasks.filter(t => t.status === 'pending').length;
        const atrasadas = tasks.filter(t => t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed').length;

        const horasEst = tasks.reduce((s,t) => s + (Number(t.estimatedTime)||0),0);
        const horasReg = tasks.reduce((s,t) => s + (Number(t.timeLogged)||0),0);
        const eficiencia = horasEst ? Math.round((horasReg/horasEst)*100) : 0;

        // Calcular SPI y CPI básicos (usando horas)
        const BAC = horasEst;
        const EV = horasReg; // simplificado, pero podríamos usar EV real
        const AC = horasReg;
        const PV = BAC * 0.6; // planificación aproximada (60% del tiempo)
        const SPI = PV ? EV / PV : 0;
        const CPI = AC ? EV / AC : 0;

        container.innerHTML = `
            <h2 style="margin-bottom: 20px;">📊 Dashboard Ejecutivo</h2>
            <div style="display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; margin-bottom: 30px;">
                <div style="background: rgba(59,130,246,0.1); border-left: 4px solid #3b82f6; padding: 20px; border-radius: 12px;">
                    <div style="font-size: 32px; font-weight: bold;">${total}</div>
                    <div>Tareas Totales</div>
                </div>
                <div style="background: rgba(16,185,129,0.1); border-left: 4px solid #10b981; padding: 20px; border-radius: 12px;">
                    <div style="font-size: 32px; font-weight: bold;">${completadas}</div>
                    <div>Completadas</div>
                </div>
                <div style="background: rgba(245,158,11,0.1); border-left: 4px solid #f59e0b; padding: 20px; border-radius: 12px;">
                    <div style="font-size: 32px; font-weight: bold;">${atrasadas}</div>
                    <div>Atrasadas</div>
                </div>
                <div style="background: rgba(139,92,246,0.1); border-left: 4px solid #8b5cf6; padding: 20px; border-radius: 12px;">
                    <div style="font-size: 32px; font-weight: bold;">${eficiencia}%</div>
                    <div>Eficiencia</div>
                </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px;">
                    <h3>⏱️ Estado del Cronograma</h3>
                    <div>SPI: ${SPI.toFixed(2)} ${SPI >= 1 ? '✅' : SPI >= 0.8 ? '⚠️' : '🔴'}</div>
                    <div>${SPI >= 1 ? 'Adelantado' : SPI >= 0.8 ? 'En riesgo' : 'Crítico'}</div>
                </div>
                <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px;">
                    <h3>💰 Estado de Costos</h3>
                    <div>CPI: ${CPI.toFixed(2)} ${CPI >= 1 ? '✅' : CPI >= 0.9 ? '⚠️' : '🔴'}</div>
                    <div>${CPI >= 1 ? 'Bajo presupuesto' : CPI >= 0.9 ? 'Ligero sobrecosto' : 'Sobrecosto severo'}</div>
                </div>
            </div>
            <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px;">
                <h3>🔔 Alertas del PM</h3>
                <div id="pmAlertas" style="max-height: 200px; overflow-y: auto;"></div>
            </div>
        `;

        // Mostrar alertas dinámicas
        const alertasDiv = document.getElementById('pmAlertas');
        if (alertasDiv) {
            const alertas = [];
            if (atrasadas > 0) alertas.push(`⚠️ ${atrasadas} tareas atrasadas. Revisar plazos.`);
            if (SPI < 0.8) alertas.push('📅 El proyecto está significativamente retrasado (SPI bajo).');
            if (CPI < 0.9) alertas.push('💰 Sobrecosto detectado. Revisar asignación de recursos.');
            if (enProgreso > total * 0.6) alertas.push('🔄 Demasiadas tareas en progreso. Limitar WIP.');
            if (alertas.length === 0) alertas.push('✅ Todo está bajo control. Buen trabajo.');
            alertasDiv.innerHTML = alertas.map(a => `<div style="margin-bottom: 10px;">${a}</div>`).join('');
        }
    }

    // ============================================
    // TAB 2: DOCUMENTOS (se llama a pm-docs.js)
    // ============================================
    function renderDocumentos(container) {
        container.innerHTML = `
            <h2>📄 Generación de Documentos</h2>
            <div style="display: flex; gap: 20px; flex-wrap: wrap; margin: 20px 0;">
                <button id="genActaConstitutiva" class="pm-doc-btn" style="background: #3b82f6; padding: 12px 24px; border-radius: 12px; border: none; color: white; cursor: pointer;">📑 Acta Constitutiva</button>
                <button id="genPlanProyecto" class="pm-doc-btn" style="background: #3b82f6; padding: 12px 24px; border-radius: 12px; border: none; color: white; cursor: pointer;">📅 Plan de Proyecto</button>
                <button id="genActaCierre" class="pm-doc-btn" style="background: #3b82f6; padding: 12px 24px; border-radius: 12px; border: none; color: white; cursor: pointer;">🔚 Acta de Cierre</button>
                <button id="genInformeEstado" class="pm-doc-btn" style="background: #3b82f6; padding: 12px 24px; border-radius: 12px; border: none; color: white; cursor: pointer;">📊 Informe de Estado</button>
            </div>
            <div id="docPreview" style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; min-height: 200px;">
                Selecciona un documento para generarlo.
            </div>
        `;
        // Estos botones se conectarán con las funciones de pm-docs.js, que se cargará después.
        // Por ahora, mostramos un mensaje.
        setTimeout(() => {
            if (window.generarActaConstitutiva) {
                document.getElementById('genActaConstitutiva').onclick = () => window.generarActaConstitutiva();
                document.getElementById('genPlanProyecto').onclick = () => window.generarPlanProyecto();
                document.getElementById('genActaCierre').onclick = () => window.generarActaCierre();
                document.getElementById('genInformeEstado').onclick = () => window.generarInformeEstado();
            } else {
                document.querySelectorAll('.pm-doc-btn').forEach(btn => {
                    btn.onclick = () => alert('Funcionalidad de documentos no disponible. Asegúrate de cargar pm-docs.js');
                });
            }
        }, 100);
    }

    // ============================================
    // TAB 3: CONTROL (decisiones automáticas)
    // ============================================
    function renderControl(container) {
        const proyectos = obtenerProyectos();
        const proyecto = obtenerProyectoActual();
        const tasks = proyecto?.tasks || [];
        const recomendaciones = obtenerRecomendaciones(proyecto, tasks);

        container.innerHTML = `
            <h2>⚙️ Control y Decisiones</h2>
            <div id="controlRecomendaciones" style="margin: 20px 0;">
                ${recomendaciones.map((rec, i) => `
                    <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 15px; margin-bottom: 15px;">
                        <div>${rec.mensaje}</div>
                        ${rec.accion ? `<button class="aplicarRec" data-idx="${i}" style="margin-top: 10px; background: #10b981; border: none; padding: 8px 16px; border-radius: 8px; color: white; cursor: pointer;">✅ Aplicar recomendación</button>` : ''}
                    </div>
                `).join('')}
                ${recomendaciones.length === 0 ? '<div>No hay recomendaciones pendientes.</div>' : ''}
            </div>
        `;

        // Eventos para aplicar recomendaciones
        document.querySelectorAll('.aplicarRec').forEach(btn => {
            btn.onclick = () => {
                const idx = btn.dataset.idx;
                const rec = recomendaciones[idx];
                if (rec && rec.accion) {
                    rec.accion();
                    renderControl(container); // refrescar
                }
            };
        });
    }

    // ============================================
    // RECOMENDACIONES AUTOMÁTICAS
    // ============================================
    function obtenerRecomendaciones(proyecto, tasks) {
        if (!proyecto) return [];
        const recomendaciones = [];
        const total = tasks.length;
        const completadas = tasks.filter(t => t.status === 'completed').length;
        const enProgreso = tasks.filter(t => t.status === 'inProgress').length;
        const pendientes = tasks.filter(t => t.status === 'pending').length;
        const atrasadas = tasks.filter(t => t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed').length;
        const horasEst = tasks.reduce((s,t) => s + (Number(t.estimatedTime)||0),0);
        const horasReg = tasks.reduce((s,t) => s + (Number(t.timeLogged)||0),0);
        const SPI = horasEst ? (horasReg / horasEst) : 0; // simplificado
        const CPI = horasEst ? (horasReg / horasEst) : 0;

        if (atrasadas > 0) {
            recomendaciones.push({
                mensaje: `🚨 Hay ${atrasadas} tareas atrasadas. ¿Quieres que las reprograme?`,
                accion: () => {
                    if (confirm(`¿Reprogramar las ${atrasadas} tareas atrasadas para que finalicen en los próximos 7 días?`)) {
                        tasks.forEach(t => {
                            if (t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed') {
                                const newDeadline = new Date();
                                newDeadline.setDate(newDeadline.getDate() + 7);
                                t.deadline = newDeadline.toISOString().split('T')[0];
                            }
                        });
                        guardarProyectos(obtenerProyectos());
                        alert(`✅ ${atrasadas} tareas reprogramadas.`);
                    }
                }
            });
        }

        if (SPI < 0.8) {
            recomendaciones.push({
                mensaje: `📉 El proyecto está retrasado (SPI = ${SPI.toFixed(2)}). ¿Quieres añadir más recursos a las tareas críticas?`,
                accion: () => {
                    if (confirm('¿Marcar las tareas críticas como prioritarias para acelerar el proyecto?')) {
                        tasks.forEach(t => {
                            if (t.critical) t.priority = 'alta';
                        });
                        guardarProyectos(obtenerProyectos());
                        alert('✅ Tareas críticas marcadas como alta prioridad.');
                    }
                }
            });
        }

        if (enProgreso > total * 0.6 && pendientes > 0) {
            recomendaciones.push({
                mensaje: `🔄 Demasiadas tareas en progreso (${enProgreso}). ¿Limitar WIP?`,
                accion: () => {
                    if (confirm('¿Limitar el trabajo en progreso moviendo algunas tareas a "pendientes"?')) {
                        const tasksInProgress = tasks.filter(t => t.status === 'inProgress');
                        const toMove = tasksInProgress.slice(Math.floor(tasksInProgress.length / 2));
                        toMove.forEach(t => t.status = 'pending');
                        guardarProyectos(obtenerProyectos());
                        alert(`✅ ${toMove.length} tareas movidas a pendientes.`);
                    }
                }
            });
        }

        const recursoCargado = {};
        tasks.forEach(t => {
            if (t.assignee && t.status === 'inProgress') {
                recursoCargado[t.assignee] = (recursoCargado[t.assignee] || 0) + 1;
            }
        });
        const sobrecargados = Object.entries(recursoCargado).filter(([_, count]) => count > 2);
        if (sobrecargados.length > 0) {
            recomendaciones.push({
                mensaje: `⚠️ Recursos sobrecargados: ${sobrecargados.map(([r,c]) => `${r} (${c} tareas)`).join(', ')}. ¿Reasignar algunas tareas?`,
                accion: () => {
                    if (confirm('¿Reasignar tareas automáticamente a otros recursos disponibles?')) {
                        const otros = Object.keys(recursoCargado).filter(r => recursoCargado[r] <= 1);
                        if (otros.length) {
                            sobrecargados.forEach(([nombre, _]) => {
                                const tareas = tasks.filter(t => t.assignee === nombre && t.status === 'inProgress');
                                const aReasignar = tareas.slice(0, Math.ceil(tareas.length / 2));
                                aReasignar.forEach((t, i) => {
                                    t.assignee = otros[i % otros.length];
                                });
                            });
                            guardarProyectos(obtenerProyectos());
                            alert('✅ Tareas reasignadas.');
                        } else {
                            alert('No hay recursos disponibles para reasignar.');
                        }
                    }
                }
            });
        }

        return recomendaciones;
    }

    function aplicarRecomendacion(recomendacion) {
        if (recomendacion && recomendacion.accion) recomendacion.accion();
    }

    // ============================================
    // TAB 4: REUNIONES (integra con pm-meetings.js)
    // ============================================
    function renderReuniones(container) {
        container.innerHTML = `
            <h2>🗓️ Gestión de Reuniones</h2>
            <div style="margin-bottom: 20px;">
                <button id="nuevaReunionBtn" style="background: #3b82f6; border: none; padding: 12px 24px; border-radius: 12px; color: white; cursor: pointer;">+ Convocar reunión</button>
            </div>
            <div id="listaReuniones" style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; min-height: 200px;">
                Cargando reuniones...
            </div>
        `;
        // Cargar reuniones desde localStorage
        cargarListaReuniones();

        document.getElementById('nuevaReunionBtn').onclick = () => {
            if (window.gestionarReunionPM) window.gestionarReunionPM();
            else alert('Funcionalidad de reuniones no disponible. Asegúrate de cargar pm-meetings.js');
        };
    }

    function cargarListaReuniones() {
        const container = document.getElementById('listaReuniones');
        if (!container) return;
        let meetings = [];
        try {
            meetings = JSON.parse(localStorage.getItem('pmMeetings') || '[]');
        } catch(e) {}
        if (meetings.length === 0) {
            container.innerHTML = '<div>No hay reuniones registradas.</div>';
            return;
        }
        container.innerHTML = meetings.map((m, i) => `
            <div style="border-left: 4px solid #3b82f6; padding: 15px; margin-bottom: 15px; background: rgba(0,0,0,0.2); border-radius: 8px;">
                <div><strong>${m.titulo}</strong> - ${new Date(m.fecha).toLocaleString()}</div>
                <div>Acuerdos: ${m.acuerdos ? m.acuerdos.length : 0}</div>
                <button class="verActaBtn" data-idx="${i}" style="background: #10b981; border: none; padding: 4px 12px; border-radius: 6px; color: white; cursor: pointer; margin-top: 8px;">Ver acta</button>
            </div>
        `).join('');
        document.querySelectorAll('.verActaBtn').forEach(btn => {
            btn.onclick = () => {
                const idx = btn.dataset.idx;
                const meeting = meetings[idx];
                if (window.verActaReunion) window.verActaReunion(meeting);
                else alert('Acta no disponible');
            };
        });
    }

    // ============================================
    // COMANDOS DESDE EL CHAT (integración con SystemAssistant)
    // ============================================
    function procesarComandoPM(texto) {
        const lower = texto.toLowerCase();
        if (lower.includes('genera acta constitutiva')) {
            if (window.generarActaConstitutiva) {
                setTimeout(() => window.generarActaConstitutiva(), 100);
                return '📄 Generando acta constitutiva...';
            }
            return '❌ Módulo de documentos no disponible.';
        }
        if (lower.includes('genera plan de proyecto')) {
            if (window.generarPlanProyecto) {
                setTimeout(() => window.generarPlanProyecto(), 100);
                return '📅 Generando plan de proyecto...';
            }
            return '❌ Módulo de documentos no disponible.';
        }
        if (lower.includes('acta de cierre')) {
            if (window.generarActaCierre) {
                setTimeout(() => window.generarActaCierre(), 100);
                return '🔚 Generando acta de cierre...';
            }
            return '❌ Módulo de documentos no disponible.';
        }
        if (lower.includes('informe de estado')) {
            if (window.generarInformeEstado) {
                setTimeout(() => window.generarInformeEstado(), 100);
                return '📊 Generando informe de estado...';
            }
            return '❌ Módulo de documentos no disponible.';
        }
        if (lower.includes('convocar reunion')) {
            if (window.gestionarReunionPM) {
                setTimeout(() => window.gestionarReunionPM(), 100);
                return '🗓️ Abriendo asistente para convocar reunión...';
            }
            return '❌ Módulo de reuniones no disponible.';
        }
        if (lower.includes('recomendaciones') || lower.includes('qué hacer')) {
            const proyecto = obtenerProyectoActual();
            const tasks = proyecto?.tasks || [];
            const recs = obtenerRecomendaciones(proyecto, tasks);
            if (recs.length === 0) return '✅ No hay recomendaciones pendientes.';
            return recs.map((r,i) => `${i+1}. ${r.mensaje}`).join('\n');
        }
        if (lower.includes('reasignar') && (lower.includes('tarea') || lower.includes('recurso'))) {
            // Ejemplo simple: reasignar una tarea específica (podría mejorarse)
            return 'Para reasignar tareas, usa el panel de Control.';
        }
        return null;
    }

    // Exponer funciones para los otros módulos
    window.guardarProyectos = guardarProyectos;
    window.obtenerProyectos = obtenerProyectos;
    window.obtenerProyectoActual = obtenerProyectoActual;
})();