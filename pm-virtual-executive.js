// ============================================================
// PM VIRTUAL EJECUTIVO – Versión Profesional
// ============================================================
(function() {
    'use strict';

    console.log('🚀 Cargando PM Virtual Ejecutivo...');

    // ============================================================
    // CONFIGURACIÓN Y ESPERA DE DATOS
    // ============================================================
    let esperaInterval = setInterval(() => {
        const proyectos = obtenerProyectos();
        if (proyectos && proyectos.length > 0) {
            clearInterval(esperaInterval);
            console.log('✅ Datos de proyectos cargados. Iniciando PM Virtual...');
            iniciarPMVirtual();
        }
    }, 500);

    // Función robusta para obtener proyectos desde localStorage o window
    function obtenerProyectos() {
        try {
            if (window.projects && window.projects.length) return window.projects;
            const stored = localStorage.getItem('projects');
            return stored ? JSON.parse(stored) : [];
        } catch(e) { return []; }
    }

    function obtenerProyectoActual() {
        const proyectos = obtenerProyectos();
        let idx = window.currentProjectIndex;
        if (idx === undefined) idx = parseInt(localStorage.getItem('currentProjectIndex')) || 0;
        return proyectos[idx] || null;
    }

    function guardarProyectos(proyectos) {
        localStorage.setItem('projects', JSON.stringify(proyectos));
        if (window.projects) window.projects = proyectos;
    }

    // ============================================================
    // CREACIÓN DEL BOTÓN FLOTANTE
    // ============================================================
    function crearBoton() {
        if (document.getElementById('pmVirtualBtn')) return;
        const btn = document.createElement('button');
        btn.id = 'pmVirtualBtn';
        btn.innerHTML = '👨‍💼 PM Virtual';
        btn.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 100000;
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
        btn.onclick = () => abrirPanelPrincipal();
        document.body.appendChild(btn);
        console.log('✅ Botón PM Virtual añadido');
    }

    // ============================================================
    // PANEL PRINCIPAL (PESTAÑAS EJECUTIVAS)
    // ============================================================
    function abrirPanelPrincipal() {
        // Eliminar panel anterior si existe
        const existing = document.getElementById('pmVirtualPanel');
        if (existing) existing.remove();

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
            width: 1200px;
            max-width: 95vw;
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
        const tabs = [
            { id: 'dashboard', label: '📊 Dashboard Ejecutivo', icon: '📊' },
            { id: 'documentos', label: '📄 Documentos Profesionales', icon: '📄' },
            { id: 'control', label: '⚙️ Control & Decisiones', icon: '⚙️' },
            { id: 'reuniones', label: '🗓️ Reuniones & Actas', icon: '🗓️' },
            { id: 'gantt', label: '📅 Gantt Ejecutivo', icon: '📅' }
        ];
        let activeTab = 'dashboard';

        // Header
        const header = document.createElement('div');
        header.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 25px;
            background: rgba(0,0,0,0.3);
            border-bottom: 1px solid #3b82f6;
        `;
        const tabsContainer = document.createElement('div');
        tabsContainer.style.display = 'flex';
        tabsContainer.style.gap = '15px';
        tabsContainer.style.flexWrap = 'wrap';
        tabs.forEach(tab => {
            const btn = document.createElement('button');
            btn.textContent = tab.label;
            btn.style.cssText = `
                background: none;
                border: none;
                color: ${activeTab === tab.id ? '#3b82f6' : '#94a3b8'};
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
                padding: 8px 16px;
                border-radius: 8px;
                transition: all 0.2s;
            `;
            btn.onclick = () => {
                activeTab = tab.id;
                document.querySelectorAll('.pm-tab-btn').forEach(b => b.style.color = '#94a3b8');
                btn.style.color = '#3b82f6';
                cargarContenido(tab.id);
            };
            btn.classList.add('pm-tab-btn');
            tabsContainer.appendChild(btn);
        });
        header.appendChild(tabsContainer);
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕ Cerrar';
        closeBtn.style.cssText = `
            background: rgba(239,68,68,0.2);
            border: 1px solid #ef4444;
            color: #ef4444;
            padding: 8px 16px;
            border-radius: 8px;
            cursor: pointer;
        `;
        closeBtn.onclick = () => overlay.remove();
        header.appendChild(closeBtn);
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
        overlay.appendChild(panel);
        document.body.appendChild(overlay);

        // Función para cargar contenido según tab
        function cargarContenido(tabId) {
            if (tabId === 'dashboard') renderDashboard(contentDiv);
            else if (tabId === 'documentos') renderDocumentos(contentDiv);
            else if (tabId === 'control') renderControl(contentDiv);
            else if (tabId === 'reuniones') renderReuniones(contentDiv);
            else if (tabId === 'gantt') renderGantt(contentDiv);
        }
        cargarContenido(activeTab);
    }

    // ============================================================
    // DASHBOARD EJECUTIVO (con EVM, gráficos, alertas)
    // ============================================================
    function renderDashboard(container) {
        const proyecto = obtenerProyectoActual();
        if (!proyecto) {
            container.innerHTML = '<div style="text-align:center; padding:50px;">No hay proyecto seleccionado</div>';
            return;
        }
        const tasks = proyecto.tasks || [];
        const total = tasks.length;
        const completadas = tasks.filter(t => t.status === 'completed').length;
        const enProgreso = tasks.filter(t => t.status === 'inProgress').length;
        const pendientes = tasks.filter(t => t.status === 'pending').length;
        const atrasadas = tasks.filter(t => t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed').length;
        const horasEst = tasks.reduce((s,t) => s + (Number(t.estimatedTime)||0),0);
        const horasReg = tasks.reduce((s,t) => s + (Number(t.timeLogged)||0),0);
        const eficiencia = horasEst ? Math.round((horasReg/horasEst)*100) : 0;

        // Cálculo simple de SPI y CPI (basado en horas, para demo)
        const BAC = horasEst;
        const EV = horasReg;
        const AC = horasReg;
        const PV = BAC * (completadas / (total || 1));
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
        const alertasDiv = document.getElementById('pmAlertas');
        const alertas = [];
        if (atrasadas > 0) alertas.push(`⚠️ ${atrasadas} tareas atrasadas. Revisar plazos.`);
        if (SPI < 0.8) alertas.push('📅 El proyecto está significativamente retrasado (SPI bajo).');
        if (CPI < 0.9) alertas.push('💰 Sobrecosto detectado. Revisar asignación de recursos.');
        if (enProgreso > total * 0.6 && pendientes > 0) alertas.push('🔄 Demasiadas tareas en progreso. Limitar WIP.');
        if (alertas.length === 0) alertas.push('✅ Todo está bajo control. Buen trabajo.');
        alertasDiv.innerHTML = alertas.map(a => `<div style="margin-bottom: 10px;">${a}</div>`).join('');
    }

    // ============================================================
    // DOCUMENTOS PROFESIONALES (CON GANTT Y GRÁFICOS)
    // ============================================================
    function renderDocumentos(container) {
        container.innerHTML = `
            <h2>📄 Generación de Documentos Profesionales</h2>
            <p>Selecciona el documento que deseas generar. Los informes incluirán gráficos, tablas y el Gantt ejecutivo (si está disponible).</p>
            <div style="display: flex; gap: 15px; flex-wrap: wrap; margin: 20px 0;">
                <button id="docActaConstitutiva" class="doc-btn">📑 Acta Constitutiva</button>
                <button id="docPlanProyecto" class="doc-btn">📅 Plan de Proyecto (con Gantt)</button>
                <button id="docActaCierre" class="doc-btn">🔚 Acta de Cierre</button>
                <button id="docInformeEjecutivo" class="doc-btn">📊 Informe Ejecutivo (EVM)</button>
            </div>
            <div id="docPreview" style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; min-height: 150px;">
                Selecciona un documento para previsualizar y descargar en PDF.
            </div>
        `;
        // Estilos para los botones
        const style = document.createElement('style');
        style.textContent = `
            .doc-btn {
                background: linear-gradient(135deg, #3b82f6, #1e40af);
                border: none;
                padding: 12px 24px;
                border-radius: 40px;
                color: white;
                cursor: pointer;
                font-weight: bold;
                transition: transform 0.2s;
            }
            .doc-btn:hover { transform: translateY(-2px); }
        `;
        container.appendChild(style);

        // Conectar botones a generadores
        document.getElementById('docActaConstitutiva').onclick = () => generarActaConstitutiva();
        document.getElementById('docPlanProyecto').onclick = () => generarPlanProyecto();
        document.getElementById('docActaCierre').onclick = () => generarActaCierre();
        document.getElementById('docInformeEjecutivo').onclick = () => generarInformeEjecutivo();
    }

    // Generador de Acta Constitutiva (HTML + prompt para datos)
    function generarActaConstitutiva() {
        const proyecto = obtenerProyectoActual();
        if (!proyecto) { alert('No hay proyecto seleccionado'); return; }

        const objetivo = prompt('Objetivo principal del proyecto:', proyecto.description || '');
        const alcance = prompt('Alcance (qué incluye y qué no):', '');
        const stakeholders = prompt('Stakeholders clave (separados por comas):', '');
        const presupuesto = prompt('Presupuesto estimado (€):', '');
        const sponsor = prompt('Sponsor / Patrocinador:', '');
        const pm = prompt('Gerente del proyecto:', 'Usuario');

        const fecha = new Date().toLocaleDateString('es-ES', { year:'numeric', month:'long', day:'numeric' });
        const nombre = proyecto.name;

        const html = `<!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"><title>Acta Constitutiva - ${nombre}</title>
        <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; margin: 40px; line-height: 1.6; background: #f9fafb; }
            .container { max-width: 1000px; margin: 0 auto; background: white; padding: 40px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
            h1 { color: #1e40af; border-bottom: 3px solid #3b82f6; padding-bottom: 10px; }
            h2 { color: #2c3e50; margin-top: 30px; }
            .fecha { text-align: right; color: #6c757d; margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background: #f1f5f9; }
        </style>
        </head>
        <body>
        <div class="container">
            <h1>Acta Constitutiva del Proyecto</h1>
            <div class="fecha">${fecha}</div>
            <h2>1. Identificación</h2>
            <p><strong>Proyecto:</strong> ${nombre}</p>
            <p><strong>Gerente:</strong> ${pm}</p>
            <p><strong>Sponsor:</strong> ${sponsor || 'No especificado'}</p>
            <h2>2. Objetivo Principal</h2>
            <p>${objetivo || 'No especificado'}</p>
            <h2>3. Alcance</h2>
            <p>${alcance || 'No especificado'}</p>
            <h2>4. Stakeholders Clave</h2>
            <p>${stakeholders || 'No especificado'}</p>
            <h2>5. Presupuesto Estimado</h2>
            <p>${presupuesto ? `€ ${presupuesto}` : 'No especificado'}</p>
            <h2>6. Aprobaciones</h2>
            <table><tr><th>Rol</th><th>Nombre</th><th>Firma</th><th>Fecha</th></tr>
            <tr><td>Sponsor</td><td>${sponsor || ''}</td><td></td><td></td></tr>
            <tr><td>Gerente</td><td>${pm}</td><td></td><td></td></tr>
            </table>
            <p style="margin-top: 40px; font-size: 12px; color: #6c757d;">Documento generado automáticamente por PM Virtual</p>
        </div>
        </body>
        </html>`;
        abrirVentanaPDF(html, `Acta_Constitutiva_${nombre}`);
    }

    // Generador de Plan de Proyecto (con Gantt capturado)
    async function generarPlanProyecto() {
        const proyecto = obtenerProyectoActual();
        if (!proyecto) { alert('No hay proyecto seleccionado'); return; }
        const tasks = proyecto.tasks || [];

        // Intentar capturar una imagen del Gantt ejecutivo si existe
        let ganttImage = '';
        const ganttContainer = document.getElementById('premiumExecutiveGantt');
        if (ganttContainer && typeof html2canvas !== 'undefined') {
            try {
                ganttImage = await html2canvas(ganttContainer, { scale: 2 }).then(canvas => canvas.toDataURL());
            } catch(e) { console.warn('No se pudo capturar Gantt', e); }
        }

        const cronogramaHTML = tasks.map(t => `
            <tr><td>${t.name}</td><td>${t.assignee || 'Sin asignar'}</td>
            <td>${t.startDate || 'N/D'}</td><td>${t.deadline || 'N/D'}</td>
            <td>${t.estimatedTime || 0}h</td>
            <td>${t.status === 'completed' ? 'Completada' : (t.status === 'inProgress' ? 'En progreso' : 'Pendiente')}</td></tr>
        `).join('');

        const html = `<!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"><title>Plan de Proyecto - ${proyecto.name}</title>
        <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; margin: 40px; background: #f9fafb; }
            .container { max-width: 1200px; margin: 0 auto; background: white; padding: 40px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
            h1 { color: #1e40af; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background: #f1f5f9; }
            .gantt-img { max-width: 100%; margin: 20px 0; border: 1px solid #ddd; border-radius: 8px; }
        </style>
        </head>
        <body>
        <div class="container">
            <h1>Plan de Proyecto: ${proyecto.name}</h1>
            <p>Fecha de generación: ${new Date().toLocaleString()}</p>
            <h2>Resumen</h2>
            <p>Total tareas: ${tasks.length}</p>
            <h2>Cronograma de Tareas</h2>
            <table><thead><tr><th>Tarea</th><th>Responsable</th><th>Inicio</th><th>Fin</th><th>Horas</th><th>Estado</th></tr></thead><tbody>${cronogramaHTML}</tbody></table>
            ${ganttImage ? `<h2>Diagrama de Gantt Ejecutivo</h2><img class="gantt-img" src="${ganttImage}" />` : '<p>No se pudo cargar el Gantt. Asegúrate de tener el Gantt abierto antes de generar el plan.</p>'}
            <p style="margin-top: 40px; font-size: 12px;">Documento generado automáticamente por PM Virtual</p>
        </div>
        </body>
        </html>`;
        abrirVentanaPDF(html, `Plan_Proyecto_${proyecto.name}`);
    }

    // Acta de Cierre
    function generarActaCierre() {
        const proyecto = obtenerProyectoActual();
        if (!proyecto) { alert('No hay proyecto seleccionado'); return; }
        const tasks = proyecto.tasks || [];
        const completadas = tasks.filter(t => t.status === 'completed').length;
        const total = tasks.length;
        const porcentaje = total ? Math.round(completadas/total*100) : 0;

        const lecciones = prompt('Lecciones aprendidas (puntos clave):', '');
        const desviaciones = prompt('Desviaciones significativas (presupuesto, tiempo):', '');
        const aceptacion = confirm('¿El cliente ha aceptado el proyecto?') ? 'Sí' : 'No';

        const html = `<!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"><title>Acta de Cierre - ${proyecto.name}</title>
        <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; margin: 40px; background: #f9fafb; }
            .container { max-width: 1000px; margin: 0 auto; background: white; padding: 40px; border-radius: 16px; }
            h1 { color: #1e40af; }
        </style>
        </head>
        <body>
        <div class="container">
            <h1>Acta de Cierre del Proyecto</h1>
            <p><strong>Proyecto:</strong> ${proyecto.name}</p>
            <p><strong>Fecha de cierre:</strong> ${new Date().toLocaleDateString()}</p>
            <h2>Resultados Finales</h2>
            <p>Tareas completadas: ${completadas}/${total} (${porcentaje}%)</p>
            <h2>Lecciones Aprendidas</h2>
            <p>${lecciones || 'No registradas'}</p>
            <h2>Desviaciones</h2>
            <p>${desviaciones || 'Ninguna'}</p>
            <h2>Aceptación del Cliente</h2>
            <p>${aceptacion}</p>
            <p style="margin-top: 40px;">Documento generado automáticamente por PM Virtual</p>
        </div>
        </body>
        </html>`;
        abrirVentanaPDF(html, `Acta_Cierre_${proyecto.name}`);
    }

    // Informe Ejecutivo con gráficos EVM (usando Chart.js)
    async function generarInformeEjecutivo() {
        const proyecto = obtenerProyectoActual();
        if (!proyecto) { alert('No hay proyecto seleccionado'); return; }
        const tasks = proyecto.tasks || [];

        // Calcular métricas
        const total = tasks.length;
        const completadas = tasks.filter(t => t.status === 'completed').length;
        const atrasadas = tasks.filter(t => t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed').length;
        const horasEst = tasks.reduce((s,t) => s + (Number(t.estimatedTime)||0),0);
        const horasReg = tasks.reduce((s,t) => s + (Number(t.timeLogged)||0),0);
        const eficiencia = horasEst ? Math.round((horasReg/horasEst)*100) : 0;

        // Crear gráfico temporal para capturar imagen
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');
        if (typeof Chart !== 'undefined') {
            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Completadas', 'Pendientes', 'Atrasadas'],
                    datasets: [{ label: 'Cantidad', data: [completadas, total - completadas - atrasadas, atrasadas], backgroundColor: ['#10b981', '#94a3b8', '#ef4444'] }]
                },
                options: { responsive: false, plugins: { legend: { display: false } } }
            });
            await new Promise(r => setTimeout(r, 500));
        }
        const chartImage = canvas.toDataURL();

        const html = `<!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"><title>Informe Ejecutivo - ${proyecto.name}</title>
        <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; margin: 40px; background: #f9fafb; }
            .container { max-width: 1000px; margin: 0 auto; background: white; padding: 40px; border-radius: 16px; }
            h1 { color: #1e40af; }
            .kpi { display: inline-block; width: 180px; margin: 10px; padding: 15px; background: #f1f5f9; border-radius: 12px; text-align: center; }
            img { max-width: 100%; margin: 20px 0; }
        </style>
        </head>
        <body>
        <div class="container">
            <h1>Informe Ejecutivo del Proyecto</h1>
            <p>Proyecto: ${proyecto.name}</p>
            <p>Fecha: ${new Date().toLocaleString()}</p>
            <div>
                <div class="kpi"><strong>${total}</strong><br>Tareas</div>
                <div class="kpi"><strong>${completadas}</strong><br>Completadas</div>
                <div class="kpi"><strong>${atrasadas}</strong><br>Atrasadas</div>
                <div class="kpi"><strong>${eficiencia}%</strong><br>Eficiencia</div>
            </div>
            <h2>Análisis de Progreso</h2>
            <img src="${chartImage}" />
            <p>El proyecto ha completado el ${Math.round(completadas/total*100)}% de las tareas.</p>
            <p>${atrasadas > 0 ? `⚠️ Hay ${atrasadas} tareas atrasadas que requieren atención.` : '✅ No hay tareas atrasadas.'}</p>
            <p style="margin-top: 40px;">Documento generado automáticamente por PM Virtual</p>
        </div>
        </body>
        </html>`;
        abrirVentanaPDF(html, `Informe_Ejecutivo_${proyecto.name}`);
    }

    // Función auxiliar para abrir ventana de impresión (que puede guardarse como PDF)
    function abrirVentanaPDF(html, nombreArchivo) {
        const ventana = window.open('', '_blank');
        if (!ventana) { alert('Permite ventanas emergentes para generar documentos'); return; }
        ventana.document.write(html);
        ventana.document.close();
        ventana.document.title = nombreArchivo;
        ventana.print();
    }

    // ============================================================
    // CONTROL Y DECISIONES AUTOMÁTICAS
    // ============================================================
    function renderControl(container) {
        const proyecto = obtenerProyectoActual();
        if (!proyecto) { container.innerHTML = '<div>No hay proyecto seleccionado</div>'; return; }
        const tasks = proyecto.tasks || [];
        const total = tasks.length;
        const atrasadas = tasks.filter(t => t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed').length;
        const enProgreso = tasks.filter(t => t.status === 'inProgress').length;
        const pendientes = tasks.filter(t => t.status === 'pending').length;

        // Detectar recursos sobrecargados
        const recursoCarga = {};
        tasks.forEach(t => { if (t.assignee && t.status === 'inProgress') recursoCarga[t.assignee] = (recursoCarga[t.assignee]||0)+1; });
        const sobrecargados = Object.entries(recursoCarga).filter(([_,c]) => c > 2);

        const recomendaciones = [];
        if (atrasadas > 0) recomendaciones.push({
            mensaje: `🚨 ${atrasadas} tareas atrasadas. ¿Reprogramarlas para los próximos 7 días?`,
            accion: () => reprogramarTareas(atrasadas)
        });
        if (enProgreso > total * 0.6 && pendientes > 0) recomendaciones.push({
            mensaje: `🔄 Demasiadas tareas en progreso (${enProgreso}). ¿Mover algunas a pendientes?`,
            accion: () => limitarWIP()
        });
        if (sobrecargados.length > 0) recomendaciones.push({
            mensaje: `⚠️ Recursos sobrecargados: ${sobrecargados.map(([r,c]) => `${r} (${c} tareas)`).join(', ')}. ¿Reasignar tareas?`,
            accion: () => reasignarTareas(sobrecargados)
        });

        container.innerHTML = `
            <h2>⚙️ Control y Decisiones</h2>
            <div id="recomendacionesList"></div>
        `;
        const recDiv = document.getElementById('recomendacionesList');
        if (recomendaciones.length === 0) recDiv.innerHTML = '<div>✅ No hay recomendaciones pendientes.</div>';
        else {
            recDiv.innerHTML = recomendaciones.map((r,i) => `
                <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 15px; margin-bottom: 15px;">
                    <div>${r.mensaje}</div>
                    <button data-idx="${i}" class="aplicarRecBtn" style="margin-top: 10px; background: #10b981; border: none; padding: 8px 16px; border-radius: 8px; color: white; cursor: pointer;">✅ Aplicar recomendación</button>
                </div>
            `).join('');
            document.querySelectorAll('.aplicarRecBtn').forEach(btn => {
                btn.onclick = () => recomendaciones[btn.dataset.idx].accion();
            });
        }
    }

    function reprogramarTareas(cantidad) {
        const proyecto = obtenerProyectoActual();
        if (!proyecto) return;
        const tasks = proyecto.tasks || [];
        let cont = 0;
        tasks.forEach(t => {
            if (t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed' && cont < cantidad) {
                const newDate = new Date();
                newDate.setDate(newDate.getDate() + 7);
                t.deadline = newDate.toISOString().split('T')[0];
                cont++;
            }
        });
        guardarProyectos(obtenerProyectos());
        alert(`✅ ${cont} tareas reprogramadas.`);
        // Recargar panel
        document.querySelector('#pmContent') && renderControl(document.querySelector('#pmContent'));
    }

    function limitarWIP() {
        const proyecto = obtenerProyectoActual();
        if (!proyecto) return;
        const tasks = proyecto.tasks || [];
        const inProgress = tasks.filter(t => t.status === 'inProgress');
        const toMove = inProgress.slice(Math.floor(inProgress.length / 2));
        toMove.forEach(t => t.status = 'pending');
        guardarProyectos(obtenerProyectos());
        alert(`✅ ${toMove.length} tareas movidas a pendientes.`);
        renderControl(document.querySelector('#pmContent'));
    }

    function reasignarTareas(sobrecargados) {
        const proyecto = obtenerProyectoActual();
        if (!proyecto) return;
        const tasks = proyecto.tasks || [];
        const todosRecursos = [...new Set(tasks.map(t => t.assignee).filter(Boolean))];
        const descargados = todosRecursos.filter(r => !sobrecargados.some(([n]) => n === r));
        if (descargados.length === 0) { alert('No hay recursos disponibles para reasignar'); return; }
        let reasignadas = 0;
        sobrecargados.forEach(([nombre, _]) => {
            const tareas = tasks.filter(t => t.assignee === nombre && t.status === 'inProgress');
            const aReasignar = tareas.slice(0, Math.ceil(tareas.length / 2));
            aReasignar.forEach((t, i) => {
                t.assignee = descargados[i % descargados.length];
                reasignadas++;
            });
        });
        guardarProyectos(obtenerProyectos());
        alert(`✅ ${reasignadas} tareas reasignadas.`);
        renderControl(document.querySelector('#pmContent'));
    }

    // ============================================================
    // REUNIONES Y ACTAS
    // ============================================================
    function renderReuniones(container) {
        container.innerHTML = `
            <h2>🗓️ Gestión de Reuniones</h2>
            <button id="nuevaReunionBtn" style="background: #3b82f6; border: none; padding: 12px 24px; border-radius: 40px; color: white; margin-bottom: 20px;">+ Convocar nueva reunión</button>
            <div id="listaReuniones" style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px;">
                Cargando...
            </div>
        `;
        cargarListaReuniones();

        document.getElementById('nuevaReunionBtn').onclick = () => convocarReunion();
    }

    function cargarListaReuniones() {
        const container = document.getElementById('listaReuniones');
        if (!container) return;
        let meetings = [];
        try { meetings = JSON.parse(localStorage.getItem('pmMeetings') || '[]'); } catch(e) {}
        if (meetings.length === 0) { container.innerHTML = '<div>No hay reuniones registradas.</div>'; return; }
        container.innerHTML = meetings.map((m, i) => `
            <div style="border-left: 4px solid #3b82f6; padding: 15px; margin-bottom: 15px; background: rgba(0,0,0,0.2); border-radius: 8px;">
                <div><strong>${m.titulo}</strong> - ${new Date(m.fecha).toLocaleString()}</div>
                <div>Acuerdos: ${m.acuerdos ? m.acuerdos.length : 0}</div>
                <button data-idx="${i}" class="verActaBtn" style="background: #10b981; border: none; padding: 4px 12px; border-radius: 6px; color: white; margin-top: 8px;">Ver acta</button>
            </div>
        `).join('');
        document.querySelectorAll('.verActaBtn').forEach(btn => {
            btn.onclick = () => {
                const idx = btn.dataset.idx;
                const reunion = meetings[idx];
                generarActaReunion(reunion);
            };
        });
    }

    function convocarReunion() {
        const titulo = prompt('Título de la reunión:', 'Reunión de seguimiento');
        if (!titulo) return;
        const fecha = new Date();
        const agenda = prompt('Agenda (temas a tratar):', '1. Revisión de estado\n2. Riesgos\n3. Próximos pasos');
        if (!agenda) return;

        const reunion = {
            id: Date.now(),
            titulo: titulo,
            fecha: fecha.toISOString(),
            fechaLocal: fecha.toLocaleString(),
            agenda: agenda,
            acuerdos: []
        };

        // Modal para registrar acuerdos
        const overlay = document.createElement('div');
        overlay.style.cssText = `position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:100001; display:flex; align-items:center; justify-content:center;`;
        const modal = document.createElement('div');
        modal.style.cssText = `background:#1e293b; border-radius:16px; padding:30px; width:600px; max-width:90%; color:white;`;
        modal.innerHTML = `
            <h2>Registro de Acuerdos</h2>
            <p><strong>Reunión:</strong> ${titulo}</p>
            <p><strong>Fecha:</strong> ${fecha.toLocaleString()}</p>
            <p><strong>Agenda:</strong><br>${agenda.replace(/\n/g,'<br>')}</p>
            <div id="acuerdosList"></div>
            <div style="margin:20px 0;">
                <input type="text" id="nuevoAcuerdo" placeholder="Nuevo acuerdo (descripción)" style="width:70%; padding:8px; border-radius:8px;">
                <button id="agregarAcuerdo" style="background:#3b82f6; border:none; padding:8px 16px; border-radius:8px; color:white;">Agregar</button>
            </div>
            <div><input type="text" id="acuerdoResponsable" placeholder="Responsable" style="width:100%; padding:8px; margin:5px 0;"><input type="date" id="acuerdoFecha" style="width:100%; padding:8px; margin:5px 0;">
            <button id="finalizarReunion" style="background:#10b981; border:none; padding:12px 24px; border-radius:8px; color:white; margin-top:15px;">Finalizar y guardar acta</button>
        `;
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        const acuerdos = [];
        function renderAcuerdos() {
            const container = document.getElementById('acuerdosList');
            if (!container) return;
            container.innerHTML = acuerdos.map((a,i) => `
                <div style="border-left:3px solid #10b981; padding:8px; margin:8px 0;">
                    <strong>${a.texto}</strong><br>
                    Responsable: ${a.responsable||'N/D'} | Vence: ${a.fecha||'N/D'}
                    <button data-idx="${i}" class="eliminarAcuerdo" style="background:none; border:none; color:#ef4444; cursor:pointer;">🗑️</button>
                </div>
            `).join('');
            document.querySelectorAll('.eliminarAcuerdo').forEach(btn => {
                btn.onclick = () => { acuerdos.splice(btn.dataset.idx,1); renderAcuerdos(); };
            });
        }
        document.getElementById('agregarAcuerdo').onclick = () => {
            const texto = document.getElementById('nuevoAcuerdo').value.trim();
            if (!texto) return;
            acuerdos.push({
                texto: texto,
                responsable: document.getElementById('acuerdoResponsable').value,
                fecha: document.getElementById('acuerdoFecha').value
            });
            document.getElementById('nuevoAcuerdo').value = '';
            document.getElementById('acuerdoResponsable').value = '';
            document.getElementById('acuerdoFecha').value = '';
            renderAcuerdos();
        };
        document.getElementById('finalizarReunion').onclick = () => {
            reunion.acuerdos = acuerdos;
            let meetings = [];
            try { meetings = JSON.parse(localStorage.getItem('pmMeetings') || '[]'); } catch(e) {}
            meetings.push(reunion);
            localStorage.setItem('pmMeetings', JSON.stringify(meetings));
            overlay.remove();
            generarActaReunion(reunion);
            cargarListaReuniones();
            alert('Acta generada y reunión guardada.');
        };
        renderAcuerdos();
    }

    function generarActaReunion(reunion) {
        const acuerdosHTML = (reunion.acuerdos || []).map(a => `
            <tr><td>${a.texto}</td><td>${a.responsable || 'N/D'}</td><td>${a.fecha || 'N/D'}</td></tr>
        `).join('');
        const html = `<!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"><title>Acta de Reunión - ${reunion.titulo}</title>
        <style>body{font-family:sans-serif;margin:40px;} table{border-collapse:collapse;width:100%} th,td{border:1px solid #ddd;padding:8px}</style>
        </head>
        <body>
            <h1>Acta de Reunión</h1>
            <p><strong>Título:</strong> ${reunion.titulo}</p>
            <p><strong>Fecha:</strong> ${reunion.fechaLocal}</p>
            <p><strong>Agenda:</strong><br>${reunion.agenda.replace(/\n/g,'<br>')}</p>
            <h2>Acuerdos</h2>
            <table><thead><tr><th>Acuerdo</th><th>Responsable</th><th>Fecha Límite</th></tr></thead><tbody>${acuerdosHTML}</tbody></table>
            <p style="margin-top:40px;">Acta generada automáticamente por PM Virtual</p>
        </body>
        </html>`;
        const ventana = window.open('', '_blank');
        if (ventana) { ventana.document.write(html); ventana.document.close(); ventana.print(); }
        else alert('Permite ventanas emergentes para ver el acta.');
    }

    // ============================================================
    // GANTT EJECUTIVO (reutiliza tu función)
    // ============================================================
    function renderGantt(container) {
        container.innerHTML = `
            <h2>📅 Diagrama de Gantt Ejecutivo</h2>
            <p>Haz clic en el botón para abrir el Gantt de tu sistema.</p>
            <button id="abrirGanttBtn" style="background:#3b82f6; border:none; padding:12px 24px; border-radius:40px; color:white;">Abrir Gantt Ejecutivo</button>
            <div id="ganttPreview" style="margin-top:20px;"></div>
        `;
        document.getElementById('abrirGanttBtn').onclick = () => {
            if (typeof createCompleteGanttForCurrentProject === 'function') {
                createCompleteGanttForCurrentProject();
            } else {
                alert('La función de Gantt no está disponible.');
            }
        };
    }

    // ============================================================
    // INICIALIZACIÓN
    // ============================================================
    function iniciarPMVirtual() {
        crearBoton();
        console.log('✅ PM Virtual Ejecutivo listo. Usa el botón flotante.');
    }
})();