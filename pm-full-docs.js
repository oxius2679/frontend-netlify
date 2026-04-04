


// ============================================================
// PM VIRTUAL EJECUTIVO - VERSIÓN COMPLETA (todas las funciones)
// Copia y pega en la consola (F12)
// ============================================================
(function() {
    'use strict';
    console.log('⚡ PM Virtual script cargado'); // 👈 NUEVO
    // ---------- UTILIDADES SEGURAS ----------
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

    function generarHTML(titulo, contenido, extraStyles = '') {
        return `<!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"><title>${titulo}</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background: #f0f2f5; }
            .document-container { max-width: 1100px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); padding: 40px; }
            h1 { color: #1e3a8a; border-bottom: 4px solid #3b82f6; padding-bottom: 10px; margin-top: 0; }
            h2 { color: #1f2937; margin-top: 30px; border-left: 4px solid #3b82f6; padding-left: 15px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; vertical-align: top; }
            th { background: #f1f5f9; font-weight: 600; }
            .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
            .badge-green { background: #dcfce7; color: #166534; }
            .badge-red { background: #fee2e2; color: #991b1b; }
            .badge-yellow { background: #fef9c3; color: #854d0e; }
            .footer { margin-top: 40px; font-size: 12px; color: #6c757d; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; }
            ${extraStyles}
        </style>
        </head>
        <body><div class="document-container"><h1>${titulo}</h1>${contenido}<div class="footer">Documento generado automáticamente por PM Virtual</div></div></body>
        </html>`;
    }

    function abrirVentanaDocumento(html, nombre) {
        const win = window.open('', '_blank');
        if (!win) { alert('Permite ventanas emergentes para generar documentos'); return; }
        win.document.write(html);
        win.document.close();
        win.document.title = nombre;
        win.print();
    }

    // ========== SECCIÓN DOCUMENTOS (PERFECTAS + MEJORADAS) ==========
    // Acta constitutiva (mejorada)
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

        const contenido = `
            <p><strong>Fecha de emisión:</strong> ${fecha}</p>
            <p><strong>Proyecto:</strong> ${proyecto.name}</p>
            <p><strong>Gerente del proyecto:</strong> ${pm}</p>
            <p><strong>Sponsor:</strong> ${sponsor}</p>
            <h2>Objetivo y justificación</h2>
            <p>${objetivo || 'No especificado'}</p>
            <h2>Alcance</h2>
            <p>${alcance || 'No especificado'}</p>
            <h2>Stakeholders clave</h2>
            <p>${stakeholders || 'No especificado'}</p>
            <h2>Presupuesto estimado</h2>
            <p>${presupuesto ? `€ ${presupuesto}` : 'No especificado'}</p>
            <h2>Aprobaciones</h2>
            <table><thead> <tr><th>Rol</th><th>Nombre</th><th>Firma</th><th>Fecha</th></tr> </thead><tbody>
            <tr><td>Sponsor</td><td>${sponsor}</td><td></td><td>${fecha}</td></tr>
            <tr><td>Gerente Proyecto</td><td>${pm}</td><td></td><td>${fecha}</td></tr>
            </tbody></table>
        `;
        const html = generarHTML(`Acta Constitutiva - ${proyecto.name}`, contenido);
        abrirVentanaDocumento(html, `Acta_Constitutiva_${proyecto.name}`);
    }

    // Registro stakeholders (perfecta)
    function generarRegistroStakeholders() {
        const stakeholdersInput = prompt('Stakeholders (nombre, rol, expectativas, influencia, estrategia) - cada uno separado por ;', 'Cliente; Alto; Busca entregas a tiempo; Alta; Reuniones semanales\nSponsor; Alto; Control de presupuesto; Alta; Informes mensuales');
        const rows = stakeholdersInput.split(';').map(s => {
            const parts = s.split(',');
            return `<tr><td>${parts[0] || ''}</td><td>${parts[1] || ''}</td><td>${parts[2] || ''}</td><td>${parts[3] || ''}</td><td>${parts[4] || ''}</td></tr>`;
        }).join('');
        const contenido = `<table><thead><tr><th>Nombre / Rol</th><th>Expectativas</th><th>Influencia</th><th>Estrategia de gestión</th></tr></thead><tbody>${rows}</tbody></table>`;
        const html = generarHTML('Registro de Stakeholders', contenido);
        abrirVentanaDocumento(html, 'Registro_Stakeholders');
    }

    // Plan de proyecto con Gantt (perfecta, no cambiar)
    function generarPlanProyecto() {
        const proyecto = obtenerProyectoActual();
        if (!proyecto) { alert('No hay proyecto seleccionado'); return; }
        const tasks = proyecto.tasks || [];
        let minDate = new Date(), maxDate = new Date();
        tasks.forEach(t => {
            if (t.startDate) { const d = new Date(t.startDate); if (d < minDate) minDate = d; if (d > maxDate) maxDate = d; }
            if (t.deadline) { const d = new Date(t.deadline); if (d < minDate) minDate = d; if (d > maxDate) maxDate = d; }
        });
        const start = new Date(minDate); start.setDate(start.getDate() - 2);
        const end = new Date(maxDate); end.setDate(end.getDate() + 2);
        const totalDays = Math.ceil((end - start) / (1000*3600*24));
        const ganttRows = tasks.map(t => {
            let startOffset = 0, duration = 3;
            if (t.startDate) startOffset = Math.max(0, Math.floor((new Date(t.startDate) - start) / (1000*3600*24)));
            if (t.deadline && t.startDate) duration = Math.max(1, Math.floor((new Date(t.deadline) - new Date(t.startDate)) / (1000*3600*24)));
            const leftPercent = (startOffset / totalDays) * 100;
            const widthPercent = (duration / totalDays) * 100;
            const barColor = t.status === 'completed' ? '#10b981' : (t.status === 'inProgress' ? '#f59e0b' : '#3b82f6');
            return `
                <div style="margin-bottom: 12px;">
                    <div style="display: flex; align-items: center;">
                        <div style="width: 220px; font-size: 13px; font-weight: bold;">${t.name}</div>
                        <div style="flex:1; position: relative; height: 32px; background: #e2e8f0; border-radius: 6px;">
                            <div style="position: absolute; left: ${leftPercent}%; width: ${widthPercent}%; height: 100%; background: ${barColor}; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 11px; font-weight: bold;">
                                ${Math.round(duration)}d
                            </div>
                        </div>
                    </div>
                    <div style="margin-left: 220px; font-size: 11px; color: #4b5563; margin-top: 4px;">${t.description || 'Sin descripción'} | Responsable: ${t.assignee || 'N/A'}</div>
                </div>
            `;
        }).join('');
        const cronograma = tasks.map(t => `
            <tr><td>${t.name}</td><td>${t.assignee || ''}</td><td>${t.startDate || 'N/D'}</td><td>${t.deadline || 'N/D'}</td><td>${t.estimatedTime || 0}h</td><td>${t.status === 'completed' ? 'Completada' : (t.status === 'inProgress' ? 'En progreso' : 'Pendiente')}</td></tr>
        `).join('');
        const contenido = `
            <h2>Resumen del Proyecto</h2>
            <p><strong>Fecha inicio:</strong> ${minDate.toLocaleDateString()} | <strong>Fecha fin prevista:</strong> ${maxDate.toLocaleDateString()}</p>
            <h2>Diagrama de Gantt</h2>
            <div style="margin: 20px 0;">${ganttRows}</div>
            <h2>Cronograma detallado</h2>
            <table><thead><tr><th>Tarea</th><th>Responsable</th><th>Inicio</th><th>Fin</th><th>Horas</th><th>Estado</th></tr></thead><tbody>${cronograma}</tbody></table>
        `;
        const html = generarHTML(`Plan de Proyecto - ${proyecto.name}`, contenido);
        abrirVentanaDocumento(html, `Plan_Proyecto_${proyecto.name}`);
    }

    // WBS mejorada con estilo profesional
    function generarWBS() {
        const proyecto = obtenerProyectoActual();
        if (!proyecto) { alert('No hay proyecto'); return; }
        const tasks = proyecto.tasks || [];
        const wbsItems = tasks.map((t, i) => `<li><i class="fas fa-tasks"></i> <strong>${i+1}. ${t.name}</strong> – ${t.description || 'Sin descripción'} (Responsable: ${t.assignee || 'N/A'})</li>`).join('');
        const contenido = `
            <style>.fas { margin-right: 8px; }</style>
            <p>Estructura jerárquica del trabajo del proyecto.</p>
            <ul style="list-style-type: none; padding-left: 0;">
                <li><i class="fas fa-project-diagram"></i> <strong>1. ${proyecto.name}</strong>
                    <ul>${wbsItems}</ul>
                </li>
            </ul>
        `;
        const html = generarHTML(`Estructura de Desglose del Trabajo (WBS) - ${proyecto.name}`, contenido, `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">`);
        abrirVentanaDocumento(html, `WBS_${proyecto.name}`);
    }

    // Matriz RACI con editor interactivo
    let raciData = JSON.parse(localStorage.getItem('raciData') || '{}');
    function generarMatrizRACI() {
        const proyecto = obtenerProyectoActual();
        if (!proyecto) { alert('No hay proyecto'); return; }
        const tasks = proyecto.tasks || [];
        const roles = [...new Set(tasks.map(t => t.assignee).filter(Boolean))];
        const key = `${proyecto.name}`;
        if (!raciData[key]) {
            raciData[key] = {};
            tasks.forEach(t => {
                raciData[key][t.id] = {};
                roles.forEach(r => { raciData[key][t.id][r] = ''; });
            });
        }
        const modal = document.createElement('div');
        modal.style.cssText = `position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:100002; display:flex; align-items:center; justify-content:center;`;
        const content = document.createElement('div');
        content.style.cssText = `background:#1e293b; padding:20px; border-radius:12px; width:90%; max-width:800px; color:white; overflow:auto; max-height:80%;`;
        let html = `<h3>Editar Matriz RACI</h3><table border="1" cellpadding="8"><thead><tr><th>Tarea</th>${roles.map(r => `<th>${r}</th>`).join('')}</tr></thead><tbody>`;
        tasks.forEach(t => {
            html += `<tr><td>${t.name}</td>`;
            roles.forEach(r => {
                const val = raciData[key][t.id][r] || '';
                html += `<td><select data-task="${t.id}" data-rol="${r}" class="raci-select"><option ${val==='R'?'selected':''}>R</option><option ${val==='A'?'selected':''}>A</option><option ${val==='C'?'selected':''}>C</option><option ${val==='I'?'selected':''}>I</option><option ${val===''?'selected':''}>-</option></select></td>`;
            });
            html += `</tr>`;
        });
        html += `</tbody></table><button id="guardarRACI">Guardar</button><button id="cancelarRACI">Cancelar</button>`;
        content.innerHTML = html;
        modal.appendChild(content);
        document.body.appendChild(modal);
        document.getElementById('guardarRACI').onclick = () => {
            document.querySelectorAll('.raci-select').forEach(sel => {
                const taskId = parseInt(sel.dataset.task);
                const rol = sel.dataset.rol;
                raciData[key][taskId][rol] = sel.value === '-' ? '' : sel.value;
            });
            localStorage.setItem('raciData', JSON.stringify(raciData));
            modal.remove();
            const rows = tasks.map(t => `<tr><td>${t.name}</td>${roles.map(r => `<td>${raciData[key][t.id][r] || ''}</td>`).join('')}</tr>`).join('');
            const htmlDoc = generarHTML(`Matriz RACI - ${proyecto.name}`, `<table><thead><tr><th>Tarea</th>${roles.map(r => `<th>${r}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table><p><strong>R</strong>=Responsable, <strong>A</strong>=Aprobador, <strong>C</strong>=Consultado, <strong>I</strong>=Informado</p>`);
            abrirVentanaDocumento(htmlDoc, `Matriz_RACI_${proyecto.name}`);
        };
        document.getElementById('cancelarRACI').onclick = () => modal.remove();
    }

    // Plan de riesgos (perfecta)
    function generarPlanRiesgos() {
        const proyecto = obtenerProyectoActual();
        if (!proyecto) { alert('No hay proyecto'); return; }
        const tasks = proyecto.tasks || [];
        const riesgos = tasks.filter(t => t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed')
            .map(t => `<tr><td>${t.name}</td><td>Vencida el ${new Date(t.deadline).toLocaleDateString()}</td><td>Alta</td><td>Reasignar recursos</td></tr>`).join('');
        const contenido = `<table><thead><tr><th>Riesgo</th><th>Impacto</th><th>Probabilidad</th><th>Plan de respuesta</th></tr></thead><tbody>${riesgos || '<tr><td colspan="4">No hay riesgos registrados</td></tr>'}</tbody></table>`;
        const html = generarHTML(`Plan de Gestión de Riesgos - ${proyecto.name}`, contenido);
        abrirVentanaDocumento(html, `Plan_Riesgos_${proyecto.name}`);
    }

    // Informe EVM con gráfico
    function generarInformeEVM() {
        const proyecto = obtenerProyectoActual();
        if (!proyecto) { alert('No hay proyecto'); return; }
        const tasks = proyecto.tasks || [];
        const total = tasks.length;
        const completadas = tasks.filter(t => t.status === 'completed').length;
        const horasEst = tasks.reduce((s,t) => s + (Number(t.estimatedTime)||0),0);
        const horasReg = tasks.reduce((s,t) => s + (Number(t.timeLogged)||0),0);
        const SPI = horasEst ? horasReg / horasEst : 0;
        const CPI = horasEst ? horasReg / horasEst : 0;
        const EAC = CPI > 0 ? horasEst / CPI : horasEst;
        const VAC = horasEst - EAC;
        const chartScript = `
        <canvas id="evmChart" width="600" height="300"></canvas>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script>
            new Chart(document.getElementById('evmChart'), {
                type: 'bar',
                data: { labels: ['PV', 'EV', 'AC'], datasets: [{ label: 'Horas', data: [${horasEst}, ${horasReg}, ${horasReg}], backgroundColor: ['#3b82f6', '#10b981', '#ef4444'] }] },
                options: { responsive: true, plugins: { legend: { position: 'top' } } }
            });
        </script>`;
        const contenido = `
            <p><strong>Avance físico:</strong> ${completadas}/${total} tareas (${Math.round(completadas/total*100)}%)</p>
            <p><strong>Horas estimadas (BAC):</strong> ${horasEst}h | <strong>Horas registradas (AC):</strong> ${horasReg}h</p>
            <p><strong>SPI:</strong> ${SPI.toFixed(2)} ${SPI>=1?'✅':'⚠️'} | <strong>CPI:</strong> ${CPI.toFixed(2)} ${CPI>=1?'✅':'⚠️'}</p>
            <p><strong>EAC (Estimado al finalizar):</strong> ${EAC.toFixed(2)}h | <strong>VAC (Variación):</strong> ${VAC>=0?'+':''}${VAC.toFixed(2)}h</p>
            ${chartScript}
            <h3>Recomendaciones</h3>
            <ul>${SPI<0.8?'<li>El proyecto está retrasado. Revisar cronograma.</li>':''}${CPI<0.9?'<li>Hay sobrecosto. Controlar horas extra.</li>':''}</ul>
        `;
        const html = generarHTML(`Informe de Valor Ganado (EVM) - ${proyecto.name}`, contenido);
        abrirVentanaDocumento(html, `Informe_EVM_${proyecto.name}`);
    }

    // Plan de calidad (perfecta, con tabla)
    function generarPlanCalidad() {
        const proyecto = obtenerProyectoActual();
        const tasks = proyecto?.tasks || [];
        const completadas = tasks.filter(t=>t.status==='completed').length;
        const atrasadas = tasks.filter(t=>t.deadline && new Date(t.deadline)<new Date() && t.status!=='completed').length;
        const defectos = atrasadas;
        const satisfaccion = completadas/tasks.length * 100;
        const contenido = `
            <h2>Métricas de Calidad</h2>
            <table><thead><tr><th>Indicador</th><th>Valor</th><th>Objetivo</th><th>Estado</th></tr></thead><tbody>
            <tr><td>% tareas completadas</td><td>${Math.round(completadas/tasks.length*100)}%</td><td>>80%</td><td class="${completadas/tasks.length>0.8?'badge-green':'badge-red'}">${completadas/tasks.length>0.8?'✅ Cumple':'⚠️ Riesgo'}</td></tr>
            <tr><td>Defectos / retrabajos</td><td>${defectos}</td><td><5</td><td class="${defectos<5?'badge-green':'badge-red'}">${defectos<5?'✅ Cumple':'⚠️ Riesgo'}</td></tr>
            <tr><td>Satisfacción estimada</td><td>${satisfaccion.toFixed(0)}%</td><td>>85%</td><td class="${satisfaccion>85?'badge-green':'badge-yellow'}">${satisfaccion>85?'✅ Cumple':'⚠️ Mejorable'}</td></tr>
            </tbody></table>
            <h2>Estándares aplicados</h2>
            <ul><li>ISO 9001:2015 – Sistema de gestión de calidad.</li><li>PMI – Prácticas de gestión de proyectos.</li><li>Revisiones semanales de avance.</li></ul>
        `;
        const html = generarHTML(`Plan de Gestión de la Calidad - ${proyecto?.name || 'Proyecto'}`, contenido);
        abrirVentanaDocumento(html, `Plan_Calidad`);
    }

    // Plan de comunicaciones (perfecta)
    function generarPlanComunicaciones() {
        const contenido = `
            <table><thead><tr><th>Interesado</th><th>Frecuencia</th><th>Canal</th><th>Responsable</th></tr></thead><tbody>
            <tr><td>Sponsor</td><td>Semanal</td><td>Email / Reunión</td><td>PM</td></tr>
            <tr><td>Equipo</td><td>Diario</td><td>Chat / Stand-up</td><td>PM</td></tr>
            <tr><td>Cliente</td><td>Quincenal</td><td>Informe / Reunión</td><td>PM</td></tr>
            </tbody></table>
        `;
        const html = generarHTML('Plan de Comunicaciones', contenido);
        abrirVentanaDocumento(html, 'Plan_Comunicaciones');
    }

    // Lecciones aprendidas (perfecta)
    function generarLeccionesAprendidas() {
        const lecciones = prompt('Lecciones aprendidas (puntos clave):', '');
        const contenido = `<p>Fecha: ${new Date().toLocaleString()}</p><p>${lecciones || 'No registradas'}</p>`;
        const html = generarHTML('Lecciones Aprendidas', contenido);
        abrirVentanaDocumento(html, 'Lecciones_Aprendidas');
    }

    // Acta de cierre (mejorada)
    function generarActaCierre() {
        const proyecto = obtenerProyectoActual();
        if (!proyecto) { alert('No hay proyecto seleccionado'); return; }
        const tasks = proyecto.tasks || [];
        const completadas = tasks.filter(t => t.status === 'completed').length;
        const total = tasks.length;
        const porcentaje = total ? Math.round(completadas/total*100) : 0;
        const lecciones = prompt('Lecciones aprendidas:', '');
        const desviaciones = prompt('Desviaciones (costo, tiempo, alcance):', '');
        const aceptacion = confirm('¿El cliente ha aceptado el proyecto?') ? 'Sí' : 'No';
        const fecha = new Date().toLocaleDateString('es-ES', { year:'numeric', month:'long', day:'numeric' });
        const contenido = `
            <p><strong>Proyecto:</strong> ${proyecto.name}</p>
            <p><strong>Fecha de cierre:</strong> ${fecha}</p>
            <p><strong>Resultados finales:</strong> ${completadas}/${total} tareas completadas (${porcentaje}%)</p>
            <p><strong>Lecciones aprendidas:</strong> ${lecciones || 'Ninguna registrada'}</p>
            <p><strong>Desviaciones:</strong> ${desviaciones || 'Ninguna'}</p>
            <p><strong>Aceptación del cliente:</strong> ${aceptacion}</p>
            <h2>Checklist de cierre</h2>
            <ul><li>✅ Todos los entregables aceptados</li><li>✅ Documentación archivada</li><li>✅ Recursos liberados</li><li>✅ Acta firmada</li></ul>
        `;
        const html = generarHTML(`Acta de Cierre - ${proyecto.name}`, contenido);
        abrirVentanaDocumento(html, `Acta_Cierre_${proyecto.name}`);
    }

    // Informe final (perfecta)
    function generarInformeFinal() {
        const proyecto = obtenerProyectoActual();
        if (!proyecto) { alert('No hay proyecto'); return; }
        const tasks = proyecto.tasks || [];
        const completadas = tasks.filter(t => t.status === 'completed').length;
        const total = tasks.length;
        const atrasadas = tasks.filter(t => t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed').length;
        const contenido = `
            <p><strong>Proyecto:</strong> ${proyecto.name}</p>
            <p><strong>Fecha informe:</strong> ${new Date().toLocaleString()}</p>
            <h2>Resultados globales</h2>
            <p>Tareas completadas: ${completadas}/${total} (${Math.round(completadas/total*100)}%)</p>
            <p>Tareas atrasadas: ${atrasadas}</p>
            <p>Cumplimiento de presupuesto: ${Math.round((tasks.reduce((s,t)=>s+(Number(t.timeLogged)||0),0) / (tasks.reduce((s,t)=>s+(Number(t.estimatedTime)||0),1)))*100)}%</p>
            <h2>Recomendaciones para proyectos futuros</h2>
            <ul>${atrasadas>0?'<li>Mejorar la estimación de plazos.</li>':''}<li>Documentar mejor los requisitos iniciales.</li></ul>
        `;
        const html = generarHTML(`Informe Final - ${proyecto.name}`, contenido);
        abrirVentanaDocumento(html, `Informe_Final_${proyecto.name}`);
    }

    // ========== SECCIÓN CONTROL (perfecta) ==========
    function renderControl(container) {
        const proyecto = obtenerProyectoActual();
        const tasks = proyecto?.tasks || [];
        const total = tasks.length;
        const atrasadas = tasks.filter(t=>t.deadline && new Date(t.deadline)<new Date() && t.status!=='completed').length;
        const enProgreso = tasks.filter(t=>t.status==='inProgress').length;
        const pendientes = tasks.filter(t=>t.status==='pending').length;
        const recursoCarga = {};
        tasks.forEach(t=>{if(t.assignee && t.status==='inProgress') recursoCarga[t.assignee]=(recursoCarga[t.assignee]||0)+1;});
        const sobrecargados = Object.entries(recursoCarga).filter(([_,c])=>c>2);
        const recomendaciones = [];
        if (atrasadas>0) recomendaciones.push({ texto: `🚨 ${atrasadas} tareas atrasadas. ¿Reprogramarlas?`, accion: () => reprogramarTareas(atrasadas) });
        if (enProgreso>total*0.6 && pendientes>0) recomendaciones.push({ texto: `🔄 Demasiadas tareas en progreso (${enProgreso}). ¿Mover algunas a pendientes?`, accion: () => limitarWIP() });
        if (sobrecargados.length>0) recomendaciones.push({ texto: `⚠️ Recursos sobrecargados: ${sobrecargados.map(([r,c])=>`${r} (${c})`).join(', ')}. ¿Reasignar?`, accion: () => reasignarTareas(sobrecargados) });
        container.innerHTML = `<h2>⚙️ Control y Decisiones</h2>${recomendaciones.length ? recomendaciones.map((r,i)=>`<div style="background:rgba(0,0,0,0.3); padding:15px; margin-bottom:15px;"><div>${r.texto}</div><button data-idx="${i}" class="aplicarRecBtn" style="margin-top:10px; background:#10b981; border:none; padding:6px 12px; border-radius:6px; color:white;">✅ Aplicar</button></div>`).join('') : '<div>✅ No hay recomendaciones pendientes.</div>'}`;
        document.querySelectorAll('.aplicarRecBtn').forEach(btn => {
            btn.onclick = () => recomendaciones[btn.dataset.idx].accion();
        });
    }

    function reprogramarTareas(cantidad) {
        const proyecto = obtenerProyectoActual();
        let cont = 0;
        proyecto.tasks.forEach(t => {
            if (t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed' && cont < cantidad) {
                const newDate = new Date(); newDate.setDate(newDate.getDate() + 7);
                t.deadline = newDate.toISOString().split('T')[0];
                cont++;
            }
        });
        guardarProyectos(obtenerProyectos());
        alert(`✅ ${cont} tareas reprogramadas.`);
    }

    function limitarWIP() {
        const proyecto = obtenerProyectoActual();
        const inProgress = proyecto.tasks.filter(t => t.status === 'inProgress');
        const toMove = inProgress.slice(Math.floor(inProgress.length / 2));
        toMove.forEach(t => t.status = 'pending');
        guardarProyectos(obtenerProyectos());
        alert(`✅ ${toMove.length} tareas movidas a pendientes.`);
    }

    function reasignarTareas(sobrecargados) {
        const proyecto = obtenerProyectoActual();
        const todos = [...new Set(proyecto.tasks.map(t=>t.assignee).filter(Boolean))];
        const descargados = todos.filter(r => !sobrecargados.some(([n]) => n === r));
        if (!descargados.length) { alert('No hay recursos disponibles'); return; }
        let reasignadas = 0;
        sobrecargados.forEach(([nombre]) => {
            const tareas = proyecto.tasks.filter(t => t.assignee === nombre && t.status === 'inProgress');
            const aReasignar = tareas.slice(0, Math.ceil(tareas.length / 2));
            aReasignar.forEach((t,i) => { t.assignee = descargados[i % descargados.length]; reasignadas++; });
        });
        guardarProyectos(obtenerProyectos());
        alert(`✅ ${reasignadas} tareas reasignadas.`);
    }

    // ========== SECCIÓN REUNIONES (perfecta) ==========
    function renderReuniones(container) {
        container.innerHTML = `
            <h2>🗓️ Gestión de Reuniones</h2>
            <button id="nuevaReunionBtn" style="background:#3b82f6; border:none; padding:10px 20px; border-radius:8px; margin-right:10px;">+ Convocar nueva reunión</button>
            <button id="transcriptorBtn" style="background:#8b5cf6; border:none; padding:10px 20px; border-radius:8px;">🎙️ Usar Transcriptor IA</button>
            <div id="listaReuniones" style="margin-top:20px;">Cargando...</div>
        `;
        function cargarLista() {
            let meetings = JSON.parse(localStorage.getItem('pmMeetings') || '[]');
            const div = document.getElementById('listaReuniones');
            if (!meetings.length) div.innerHTML = '<div>No hay reuniones registradas.</div>';
            else div.innerHTML = meetings.map((m,i)=>`
                <div style="border-left:4px solid #3b82f6; padding:15px; margin-bottom:15px; background:rgba(0,0,0,0.2);">
                    <div><strong>${m.titulo}</strong> - ${new Date(m.fecha).toLocaleString()}</div>
                    <div>Acuerdos: ${m.acuerdos?.length||0}</div>
                    <button data-idx="${i}" class="verActaBtn" style="background:#10b981; border:none; padding:4px 12px; border-radius:6px;">Ver acta</button>
                </div>
            `).join('');
            document.querySelectorAll('.verActaBtn').forEach(btn => btn.onclick = () => generarActaReunion(meetings[btn.dataset.idx]));
        }
        document.getElementById('nuevaReunionBtn').onclick = () => convocarReunion(cargarLista);
        document.getElementById('transcriptorBtn').onclick = () => {
            if (typeof abrirTranscriptorAgent === 'function') abrirTranscriptorAgent();
            else alert('Transcriptor IA no disponible. Asegúrate de cargar el script correspondiente.');
        };
        cargarLista();
    }

    function convocarReunion(callback) {
        const titulo = prompt('Título de la reunión:', 'Reunión de seguimiento');
        if (!titulo) return;
        const agenda = prompt('Agenda:', '1. Estado\n2. Riesgos\n3. Próximos pasos');
        const reunion = { id: Date.now(), titulo, fecha: new Date().toISOString(), fechaLocal: new Date().toLocaleString(), agenda, acuerdos: [] };
        const modal = document.createElement('div');
        modal.style.cssText = `position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:100001; display:flex; align-items:center; justify-content:center;`;
        const content = document.createElement('div');
        content.style.cssText = `background:#1e293b; border-radius:16px; padding:30px; width:600px; max-width:90%; color:white;`;
        content.innerHTML = `<h2>Registro de Acuerdos</h2><p><strong>Reunión:</strong> ${titulo}</p><p><strong>Agenda:</strong><br>${agenda.replace(/\n/g,'<br>')}</p><div id="acuerdosList"></div><div><input type="text" id="nuevoAcuerdo" placeholder="Acuerdo..." style="width:70%;"><button id="agregarAcuerdo">Agregar</button></div><div><input type="text" id="acuerdoResponsable" placeholder="Responsable"><input type="date" id="acuerdoFecha"></div><button id="finalizarReunion">Finalizar y guardar acta</button>`;
        modal.appendChild(content);
        document.body.appendChild(modal);
        let acuerdos = [];
        function renderAcuerdos() { document.getElementById('acuerdosList').innerHTML = acuerdos.map((a,i)=>`<div>${a.texto} - Resp: ${a.responsable||'N/D'} Vence: ${a.fecha||'N/D'} <button data-idx="${i}" class="eliminarAcuerdo">🗑️</button></div>`).join(''); document.querySelectorAll('.eliminarAcuerdo').forEach(btn=>btn.onclick=()=>{acuerdos.splice(btn.dataset.idx,1); renderAcuerdos();}); }
        document.getElementById('agregarAcuerdo').onclick = () => {
            const texto = document.getElementById('nuevoAcuerdo').value.trim();
            if (texto) {
                acuerdos.push({ texto, responsable: document.getElementById('acuerdoResponsable').value, fecha: document.getElementById('acuerdoFecha').value });
                renderAcuerdos();
                document.getElementById('nuevoAcuerdo').value = '';
            }
        };
        document.getElementById('finalizarReunion').onclick = () => {
            reunion.acuerdos = acuerdos;
            let meetings = JSON.parse(localStorage.getItem('pmMeetings') || '[]');
            meetings.push(reunion);
            localStorage.setItem('pmMeetings', JSON.stringify(meetings));
            modal.remove();
            generarActaReunion(reunion);
            if (callback) callback();
            alert('Acta generada.');
        };
        renderAcuerdos();
    }

    function generarActaReunion(reunion) {
        const acuerdosHTML = (reunion.acuerdos||[]).map(a=>`<tr><td>${a.texto}</td><td>${a.responsable||''}</td><td>${a.fecha||''}</td></tr>`).join('');
        const html = generarHTML(`Acta de Reunión: ${reunion.titulo}`, `<p><strong>Fecha:</strong> ${reunion.fechaLocal}</p><p><strong>Agenda:</strong><br>${reunion.agenda.replace(/\n/g,'<br>')}</p><h2>Acuerdos</h2><table><thead><tr><th>Acuerdo</th><th>Responsable</th><th>Fecha Límite</th></tr></thead><tbody>${acuerdosHTML}</tbody></table>`);
        abrirVentanaDocumento(html, `Acta_${reunion.titulo}`);
    }

    // ========== SECCIÓN GANTT (perfecta) ==========
    function renderGantt(container) {
        const proyecto = obtenerProyectoActual();
        if (!proyecto) { container.innerHTML = '<div>No hay proyecto</div>'; return; }
        const tasks = proyecto.tasks || [];
        let minDate = new Date(), maxDate = new Date();
        tasks.forEach(t => {
            if (t.startDate) { const d = new Date(t.startDate); if (d < minDate) minDate = d; if (d > maxDate) maxDate = d; }
            if (t.deadline) { const d = new Date(t.deadline); if (d < minDate) minDate = d; if (d > maxDate) maxDate = d; }
        });
        const start = new Date(minDate); start.setDate(start.getDate() - 2);
        const end = new Date(maxDate); end.setDate(end.getDate() + 2);
        const totalDays = Math.ceil((end - start) / (1000*3600*24));
        const rows = tasks.map(t => {
            let startOffset = 0, duration = 3;
            if (t.startDate) startOffset = Math.max(0, Math.floor((new Date(t.startDate) - start) / (1000*3600*24)));
            if (t.deadline && t.startDate) duration = Math.max(1, Math.floor((new Date(t.deadline) - new Date(t.startDate)) / (1000*3600*24)));
            const leftPercent = (startOffset / totalDays) * 100;
            const widthPercent = (duration / totalDays) * 100;
            const barColor = t.status === 'completed' ? '#10b981' : (t.status === 'inProgress' ? '#f59e0b' : '#3b82f6');
            return `
                <div style="margin-bottom: 12px;">
                    <div style="display: flex; align-items: center;">
                        <div style="width: 220px; font-size: 13px; font-weight: bold;">${t.name}</div>
                        <div style="flex:1; position: relative; height: 32px; background: #e2e8f0; border-radius: 6px;">
                            <div style="position: absolute; left: ${leftPercent}%; width: ${widthPercent}%; height: 100%; background: ${barColor}; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 11px; font-weight: bold;">
                                ${Math.round(duration)}d
                            </div>
                        </div>
                    </div>
                    <div style="margin-left: 220px; font-size: 11px; color: #4b5563; margin-top: 4px;">${t.description || 'Sin descripción'} | Responsable: ${t.assignee || 'N/A'}</div>
                </div>
            `;
        }).join('');
        container.innerHTML = `<h2>📅 Diagrama de Gantt</h2>${rows}`;
    }

    // ========== SECCIÓN RECURSOS (perfecta) ==========
    function renderAsignacionRecursos(container) {
        const proyecto = obtenerProyectoActual();
        const tasks = proyecto?.tasks || [];
        const carga = {};
        tasks.forEach(t => { if (t.assignee) carga[t.assignee] = (carga[t.assignee] || 0) + 1; });
        const maxCarga = Math.max(...Object.values(carga), 1);
        const rows = Object.entries(carga).map(([nombre, count]) => {
            const porcentaje = Math.round((count / maxCarga) * 100);
            return `
                <tr>
                    <td>${nombre}</td>
                    <td>${count}</td>
                    <td><div style="background:#e2e8f0; height:10px; border-radius:5px;"><div style="background:#3b82f6; width:${porcentaje}%; height:10px; border-radius:5px;"></div></div> ${porcentaje}%</td>
                    <td><button onclick="if(confirm('¿Reasignar tareas de ${nombre}?')) { reasignarTareasManual('${nombre}'); }" style="background:#10b981; border:none; padding:4px 12px; border-radius:6px;">Reasignar</button></td>
                </tr>
            `;
        }).join('');
        container.innerHTML = `<h2>👥 Asignación de Recursos</h2><table><thead><tr><th>Recurso</th><th>Tareas asignadas</th><th>Carga</th><th>Acción</th></tr></thead><tbody>${rows}</tbody></table>`;
        window.reasignarTareasManual = (nombre) => {
            const proyecto = obtenerProyectoActual();
            const tasks = proyecto.tasks.filter(t => t.assignee === nombre && t.status === 'inProgress');
            if (tasks.length === 0) { alert('No hay tareas en progreso para reasignar'); return; }
            const otros = Object.keys(carga).filter(n => n !== nombre);
            if (!otros.length) { alert('No hay otros recursos disponibles'); return; }
            const aReasignar = tasks.slice(0, Math.ceil(tasks.length/2));
            aReasignar.forEach((t,i) => t.assignee = otros[i % otros.length]);
            guardarProyectos(obtenerProyectos());
            alert(`✅ ${aReasignar.length} tareas reasignadas.`);
            renderAsignacionRecursos(container);
        };
    }

    // ========== SECCIÓN COSTOS (perfecta) ==========
    function renderLineaBaseCostos(container) {
        const proyecto = obtenerProyectoActual();
        const tasks = proyecto?.tasks || [];
        const presupuesto = tasks.reduce((s,t)=>s+(Number(t.estimatedTime)||0),0);
        const gastado = tasks.reduce((s,t)=>s+(Number(t.timeLogged)||0),0);
        const desviacion = presupuesto - gastado;
        const porcentaje = presupuesto ? (gastado/presupuesto)*100 : 0;
        container.innerHTML = `
            <h2>💰 Línea Base de Costos</h2>
            <p><strong>Presupuesto planificado (BAC):</strong> ${presupuesto} h</p>
            <p><strong>Costo real incurrido (AC):</strong> ${gastado} h</p>
            <p><strong>Variación:</strong> ${desviacion>=0?'+':''}${desviacion} h</p>
            <div style="background:#e2e8f0; height:20px; border-radius:10px; margin-top:10px;"><div style="background:${desviacion>=0?'#10b981':'#ef4444'}; width:${Math.min(100, porcentaje)}%; height:20px; border-radius:10px; text-align:center; color:white; font-size:12px;">${Math.round(porcentaje)}%</div></div>
        `;
    }

    // ========== SECCIÓN CAMBIOS (mejorada con notificaciones reales) ==========
    let solicitudesCambio = JSON.parse(localStorage.getItem('solicitudesCambio') || '[]');
    function renderGestionCambios(container) {
        function mostrarSolicitudes() {
            const list = solicitudesCambio.map((s,i) => `<div style="border-left:3px solid #3b82f6; margin-bottom:10px; padding:10px;"><strong>${s.titulo}</strong> - Estado: ${s.estado}<br>Descripción: ${s.descripcion}<br><button onclick="aprobarCambio(${i})">Aprobar</button> <button onclick="rechazarCambio(${i})">Rechazar</button></div>`).join('');
            document.getElementById('listaCambios').innerHTML = list || '<div>No hay solicitudes</div>';
        }
        container.innerHTML = `
            <h2>🔄 Gestión de Cambios</h2>
            <button id="nuevaSolicitudBtn">+ Nueva solicitud de cambio</button>
            <div id="listaCambios"></div>
        `;
        document.getElementById('nuevaSolicitudBtn').onclick = () => {
            const titulo = prompt('Título de la solicitud:', '');
            if (!titulo) return;
            const descripcion = prompt('Descripción:', '');
            solicitudesCambio.push({ titulo, descripcion, estado: 'Pendiente' });
            localStorage.setItem('solicitudesCambio', JSON.stringify(solicitudesCambio));
            mostrarSolicitudes();
            // Notificación real
            if (window.SlackNotifier && typeof window.SlackNotifier.send === 'function') {
                window.SlackNotifier.send(`📝 Nueva solicitud de cambio: ${titulo} - ${descripcion}`);
            }
            if (typeof emailjs !== 'undefined') {
                emailjs.send('service_kccmxz7', 'template_we2gzml', { to_email: 'admin@proyecto.com', subject: 'Nueva solicitud de cambio', message: `${titulo}: ${descripcion}` }).catch(e=>console.log('Email no enviado',e));
            }
            alert('Solicitud registrada y notificada.');
        };
        window.aprobarCambio = (i) => { solicitudesCambio[i].estado = 'Aprobado'; localStorage.setItem('solicitudesCambio', JSON.stringify(solicitudesCambio)); mostrarSolicitudes(); alert('Cambio aprobado'); };
        window.rechazarCambio = (i) => { solicitudesCambio[i].estado = 'Rechazado'; localStorage.setItem('solicitudesCambio', JSON.stringify(solicitudesCambio)); mostrarSolicitudes(); alert('Cambio rechazado'); };
        mostrarSolicitudes();
    }

    // ========== SECCIÓN HITOS (perfecta) ==========
    let hitos = JSON.parse(localStorage.getItem('hitos') || '[]');
    function renderSeguimientoHitos(container) {
        const proyecto = obtenerProyectoActual();
        const tasks = proyecto?.tasks || [];
        const hitosGuardados = hitos.filter(h => h.projectId === proyecto.name);
        const seleccionarHitos = () => {
            const opciones = tasks.map(t => `<div><input type="checkbox" value="${t.id}" ${hitosGuardados.some(h=>h.taskId===t.id)?'checked':''}> ${t.name}</div>`).join('');
            const modal = document.createElement('div');
            modal.style.cssText = `position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:100002; display:flex; align-items:center; justify-content:center;`;
            const content = document.createElement('div');
            content.style.cssText = `background:#1e293b; padding:20px; border-radius:12px; width:400px; color:white;`;
            content.innerHTML = `<h3>Seleccionar hitos</h3>${opciones}<button id="guardarHitos">Guardar</button>`;
            modal.appendChild(content);
            document.body.appendChild(modal);
            document.getElementById('guardarHitos').onclick = () => {
                const seleccionados = Array.from(content.querySelectorAll('input:checked')).map(cb => ({ taskId: parseInt(cb.value), projectId: proyecto.name }));
                hitos.length = 0;
                hitos.push(...seleccionados);
                localStorage.setItem('hitos', JSON.stringify(hitos));
                modal.remove();
                renderSeguimientoHitos(container);
            };
        };
        const rows = hitosGuardados.map(h => {
            const t = tasks.find(t=>t.id===h.taskId);
            if (!t) return '';
            const diff = t.deadline ? Math.ceil((new Date(t.deadline) - new Date()) / (1000*3600*24)) : null;
            const alerta = diff !== null && diff <= 3 && diff >= 0 && t.status !== 'completed' ? '<span style="color:#f59e0b;">⚠️ Próximo</span>' : '';
            return `<tr><td>${t.name}</td><td>${t.deadline || 'N/D'}</td><td>${t.status === 'completed' ? 'Completado' : (t.status === 'inProgress' ? 'En curso' : 'Pendiente')}</td><td>${alerta}</td></tr>`;
        }).join('');
        container.innerHTML = `
            <h2>🎯 Hitos del Proyecto</h2>
            <button id="seleccionarHitosBtn" style="margin-bottom:10px;">Seleccionar hitos</button>
            <table><thead><tr><th>Hito</th><th>Fecha límite</th><th>Estado</th><th>Alerta</th></tr></thead><tbody>${rows || '<tr><td colspan="4">No hay hitos seleccionados</td></tr>'}</tbody></table>
        `;
        document.getElementById('seleccionarHitosBtn').onclick = seleccionarHitos;
    }

    // ========== SECCIÓN REPORTES (mejorada con notificaciones reales) ==========
    function renderReportesAutomaticos(container) {
        container.innerHTML = `
            <h2>📧 Reportes Automáticos</h2>
            <button id="enviarEmail">Enviar informe por email</button>
            <button id="enviarSlack">Enviar a Slack</button>
        `;
        const enviarEmail = () => {
            const proyecto = obtenerProyectoActual();
            const tasks = proyecto?.tasks || [];
            const completadas = tasks.filter(t=>t.status==='completed').length;
            const total = tasks.length;
            const html = generarHTML(`Informe de estado - ${proyecto.name}`, `<p>Fecha: ${new Date().toLocaleString()}</p><p>Avance: ${completadas}/${total} tareas (${Math.round(completadas/total*100)}%)</p>`);
            if (typeof emailjs !== 'undefined') {
                emailjs.send('service_kccmxz7', 'template_we2gzml', { to_email: 'usuario@ejemplo.com', subject: `Informe automático - ${proyecto.name}`, message: html }).then(()=>alert('Email enviado')).catch(e=>alert('Error email: '+e));
            } else alert('EmailJS no configurado');
        };
        const enviarSlack = () => {
            const proyecto = obtenerProyectoActual();
            const tasks = proyecto?.tasks || [];
            const completadas = tasks.filter(t=>t.status==='completed').length;
            const total = tasks.length;
            const mensaje = `📊 Informe automático: ${proyecto.name} - Avance: ${Math.round(completadas/total*100)}% - ${new Date().toLocaleString()}`;
            if (window.SlackNotifier && typeof window.SlackNotifier.send === 'function') window.SlackNotifier.send(mensaje);
            else alert('SlackNotifier no disponible');
        };
        document.getElementById('enviarEmail').onclick = enviarEmail;
        document.getElementById('enviarSlack').onclick = enviarSlack;
    }

    // ========== SECCIÓN DESEMPEÑO (perfecta) ==========
    function renderEvaluacionDesempeno(container) {
        const proyecto = obtenerProyectoActual();
        const tasks = proyecto?.tasks || [];
        const desempeno = {};
        tasks.forEach(t => {
            if (t.assignee) {
                if (!desempeno[t.assignee]) desempeno[t.assignee] = { total:0, completadas:0, horas:0 };
                desempeno[t.assignee].total++;
                if (t.status === 'completed') desempeno[t.assignee].completadas++;
                desempeno[t.assignee].horas += Number(t.timeLogged)||0;
            }
        });
        const rows = Object.entries(desempeno).map(([nombre, d]) => `<tr><td>${nombre}</td><td>${d.completadas}/${d.total}</td><td>${Math.round(d.completadas/d.total*100)}%</td><td>${d.horas}h</td></tr>`).join('');
        container.innerHTML = `<h2>📊 Evaluación de Desempeño</h2><table><thead><tr><th>Recurso</th><th>Tareas completadas</th><th>Eficiencia</th><th>Horas registradas</th></tr></thead><tbody>${rows}</tbody></table>`;
    }

    // ========== SECCIÓN HABILIDADES (mejorada con campo habilidad) ==========
    let habilidades = JSON.parse(localStorage.getItem('habilidades') || '[]');
    function renderMatrizHabilidades(container) {
        const proyecto = obtenerProyectoActual();
        const miembros = [...new Set(proyecto?.tasks?.map(t=>t.assignee).filter(Boolean)||[])];
        const habilidadesGuardadas = habilidades.filter(h=>h.projectId===proyecto.name);
        const mostrar = () => {
            const rows = miembros.map(m => {
                const hab = habilidadesGuardadas.find(h=>h.miembro===m) || { miembro:m, habilidad:'', nivel:'Básico' };
                return `<tr><td>${m}</td><td><input type="text" data-miembro="${m}" class="habilidadInput" value="${hab.habilidad}" placeholder="Ej: React, Python..."></td><td><select data-miembro="${m}" class="nivelSelect"><option ${hab.nivel==='Básico'?'selected':''}>Básico</option><option ${hab.nivel==='Intermedio'?'selected':''}>Intermedio</option><option ${hab.nivel==='Avanzado'?'selected':''}>Avanzado</option></select></td></tr>`;
            }).join('');
            container.innerHTML = `<h2>🧠 Matriz de Habilidades</h2><table><thead><tr><th>Miembro</th><th>Habilidad</th><th>Nivel</th></tr></thead><tbody>${rows}</tbody><button id="guardarHabilidades">Guardar</button></table>`;
            document.getElementById('guardarHabilidades').onclick = () => {
                const nuevos = [];
                document.querySelectorAll('.habilidadInput').forEach(inp => {
                    const miembro = inp.dataset.miembro;
                    const nivelSel = document.querySelector(`.nivelSelect[data-miembro="${miembro}"]`);
                    nuevos.push({ projectId: proyecto.name, miembro, habilidad: inp.value, nivel: nivelSel.value });
                });
                habilidades.length = 0;
                habilidades.push(...nuevos);
                localStorage.setItem('habilidades', JSON.stringify(habilidades));
                alert('Habilidades guardadas');
            };
        };
        mostrar();
    }

    // ========== SECCIÓN RECONOCIMIENTOS (perfecta) ==========
    function renderReconocimientos(container) {
        const proyecto = obtenerProyectoActual();
        const completadas = proyecto?.tasks?.filter(t=>t.status==='completed').length || 0;
        const hitosCompletados = hitos.filter(h=>h.projectId===proyecto.name).filter(h=>proyecto.tasks.find(t=>t.id===h.taskId)?.status==='completed').length;
        let mensaje = '';
        if (completadas>0 && completadas%5===0) mensaje = `🎉 ¡El equipo ha completado ${completadas} tareas! Excelente trabajo.`;
        else if (hitosCompletados>0) mensaje = `🏆 ¡Hito completado! Sigan así.`;
        else mensaje = 'Próximo reconocimiento al completar 5 tareas o un hito.';
        container.innerHTML = `<h2>🏆 Reconocimientos</h2><div style="background:#dcfce7; padding:15px; border-radius:12px;">${mensaje}</div>`;
    }

    // ========== SECCIÓN MATRIZ RIESGOS (perfecta) ==========
    function renderMatrizRiesgos(container) {
        const proyecto = obtenerProyectoActual();
        const tasks = proyecto?.tasks || [];
        const riesgos = tasks.filter(t => t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed');
        const rows = riesgos.map(r => {
            const impacto = Math.floor(Math.random()*5)+1;
            const probabilidad = Math.floor(Math.random()*5)+1;
            const nivel = (impacto*probabilidad) > 12 ? 'Alto' : (impacto*probabilidad) > 6 ? 'Medio' : 'Bajo';
            const color = nivel === 'Alto' ? '#fee2e2' : (nivel === 'Medio' ? '#fef9c3' : '#e0f2fe');
            return `<tr><td>${r.name}</td><td>${impacto}</td><td>${probabilidad}</td><td style="background:${color}; color:#1f2937;">${nivel}</td></tr>`;
        }).join('');
        container.innerHTML = `<h2>⚠️ Matriz de Riesgos (Impacto/Probabilidad)</h2><table><thead><tr><th>Riesgo</th><th>Impacto (1-5)</th><th>Probabilidad (1-5)</th><th>Nivel</th></tr></thead><tbody>${riesgos.length ? rows : '<tr><td colspan="4">No hay riesgos activos</td></tr>'}</tbody></table>`;
    }

    // ========== SECCIÓN ACCIONES PREVENTIVAS (perfecta) ==========
    let accionesPreventivas = JSON.parse(localStorage.getItem('accionesPreventivas') || '[]');
    function renderAccionesPreventivas(container) {
        const mostrar = () => {
            const list = accionesPreventivas.map((a,i) => `<div>${a.texto} - <button onclick="eliminarAccion(${i})">🗑️</button></div>`).join('');
            document.getElementById('listaAcciones').innerHTML = list || '<div>No hay acciones</div>';
        };
        container.innerHTML = `
            <h2>🛡️ Acciones Preventivas</h2>
            <input type="text" id="nuevaAccion" placeholder="Nueva acción preventiva"><button id="agregarAccion">Agregar</button>
            <div id="listaAcciones"></div>
            <button id="imprimirAcciones">Imprimir lista</button>
        `;
        document.getElementById('agregarAccion').onclick = () => {
            const texto = document.getElementById('nuevaAccion').value.trim();
            if (texto) { accionesPreventivas.push({ texto }); localStorage.setItem('accionesPreventivas', JSON.stringify(accionesPreventivas)); mostrar(); }
        };
        window.eliminarAccion = (i) => { accionesPreventivas.splice(i,1); localStorage.setItem('accionesPreventivas', JSON.stringify(accionesPreventivas)); mostrar(); };
        document.getElementById('imprimirAcciones').onclick = () => {
            const html = generarHTML('Acciones Preventivas', `<ul>${accionesPreventivas.map(a=>`<li>${a.texto}</li>`).join('')}</ul>`);
            abrirVentanaDocumento(html, 'Acciones_Preventivas');
        };
        mostrar();
    }

    // ========== SECCIÓN CALIDAD (mejorada con gráfico) ==========
    function renderIndicadoresCalidad(container) {
        const proyecto = obtenerProyectoActual();
        const tasks = proyecto?.tasks || [];
        const completadas = tasks.filter(t=>t.status==='completed').length;
        const defectos = tasks.filter(t=>t.deadline && new Date(t.deadline)<new Date() && t.status!=='completed').length;
        const satisfaccion = completadas/tasks.length * 100;
        container.innerHTML = `
            <h2>📊 Indicadores de Calidad</h2>
            <table><thead><tr><th>Indicador</th><th>Valor</th><th>Objetivo</th><th>Estado</th></tr></thead><tbody>
            <tr><td>Tareas completadas</td><td>${completadas}/${tasks.length}</td><td>>80%</td><td class="${completadas/tasks.length>0.8?'badge-green':'badge-red'}">${completadas/tasks.length>0.8?'✅ Cumple':'⚠️ Riesgo'}</td></tr>
            <tr><td>Defectos/retrabajos</td><td>${defectos}</td><td><5</td><td class="${defectos<5?'badge-green':'badge-red'}">${defectos<5?'✅ Cumple':'⚠️ Riesgo'}</td></tr>
            <tr><td>Satisfacción estimada</td><td>${satisfaccion.toFixed(0)}%</td><td>>85%</td><td class="${satisfaccion>85?'badge-green':'badge-yellow'}">${satisfaccion>85?'✅ Cumple':'⚠️ Mejorable'}</td></tr>
            </tbody></table>
            <canvas id="calidadChart" width="400" height="200"></canvas>
        `;
        const ctx = document.getElementById('calidadChart').getContext('2d');
        if (typeof Chart !== 'undefined') {
            new Chart(ctx, {
                type: 'bar',
                data: { labels: ['Completadas', 'Defectos', 'Satisfacción'], datasets: [{ label: 'Porcentaje', data: [Math.round(completadas/tasks.length*100), (defectos/tasks.length)*100, satisfaccion], backgroundColor: ['#10b981', '#ef4444', '#f59e0b'] }] },
                options: { responsive: true, maintainAspectRatio: false }
            });
        } else {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.onload = () => renderIndicadoresCalidad(container);
            document.head.appendChild(script);
        }
    }

    // ========== SECCIÓN ENCUESTAS (mejorada con retroalimentación) ==========
    let encuestas = JSON.parse(localStorage.getItem('encuestas') || '[]');
    function renderEncuestas(container) {
        const proyecto = obtenerProyectoActual();
        const puntuaciones = encuestas.filter(e=>e.projectId===proyecto.name).map(e=>e.puntuacion);
        const promedio = puntuaciones.length ? (puntuaciones.reduce((a,b)=>a+b,0)/puntuaciones.length).toFixed(1) : 'N/A';
        const ultima = encuestas.filter(e=>e.projectId===proyecto.name).slice(-1)[0];
        container.innerHTML = `
            <h2>📝 Encuestas de Satisfacción</h2>
            <button id="encuestaBtn">Realizar encuesta</button>
            <p>Promedio de puntuaciones: ${promedio}</p>
            ${ultima ? `<p>Última puntuación: ${ultima.puntuacion}/10 - Comentario: ${ultima.comentario || 'Sin comentario'}</p>` : ''}
            <div id="resultadosEncuesta"></div>
        `;
        document.getElementById('encuestaBtn').onclick = () => {
            const resp = prompt('¿Qué puntuación le das al proyecto? (1-10)', '');
            const puntuacion = parseInt(resp);
            if (!isNaN(puntuacion) && puntuacion>=1 && puntuacion<=10) {
                const comentario = prompt('¿Algún comentario adicional?', '');
                encuestas.push({ projectId: proyecto.name, puntuacion, comentario, fecha: new Date().toISOString() });
                localStorage.setItem('encuestas', JSON.stringify(encuestas));
                alert(`Gracias por tu valoración: ${puntuacion}/10`);
                renderEncuestas(container);
            }
        };
    }

    // ========== SECCIÓN PORTAL (perfecta) ==========
    function renderPortalProyecto(container) {
        const proyecto = obtenerProyectoActual();
        const tasks = proyecto?.tasks || [];
        const completadas = tasks.filter(t=>t.status==='completed').length;
        const atrasadas = tasks.filter(t=>t.deadline && new Date(t.deadline)<new Date() && t.status!=='completed').length;
        const hitosActivos = hitos.filter(h=>h.projectId===proyecto.name).length;
        container.innerHTML = `
            <h2>🌐 Portal del Proyecto: ${proyecto.name}</h2>
            <div style="background:rgba(0,0,0,0.3); padding:20px; border-radius:12px;">
                <p><strong>Estado:</strong> ${completadas === tasks.length ? '✅ Completado' : atrasadas>0 ? '⚠️ En riesgo' : '🟢 En curso'}</p>
                <p><strong>Avance:</strong> ${Math.round(completadas/tasks.length*100)}%</p>
                <p><strong>Hitos definidos:</strong> ${hitosActivos}</p>
                <p><strong>Próximo hito:</strong> ${(()=>{ const next = hitos.filter(h=>h.projectId===proyecto.name).find(h=>proyecto.tasks.find(t=>t.id===h.taskId)?.status!=='completed'); if(next){ const t = proyecto.tasks.find(t=>t.id===next.taskId); return `${t.name} - ${t.deadline||'Sin fecha'}`;} return 'Ninguno'; })()}</p>
            </div>
        `;
    }

    // ========== SECCIÓN CHECKLIST (mejorada con generación de acta) ==========
    let checklistCierre = JSON.parse(localStorage.getItem('checklistCierre') || '[]');
    function renderChecklistCierre(container) {
        const proyecto = obtenerProyectoActual();
        const itemsProyecto = checklistCierre.filter(i=>i.projectId===proyecto.name);
        const mostrar = () => {
            const list = itemsProyecto.map((item,i) => `<div><input type="checkbox" ${item.completado?'checked':''} data-idx="${i}"> ${item.texto}</div>`).join('');
            document.getElementById('checklistItems').innerHTML = list || '<div>No hay items</div>';
            document.querySelectorAll('#checklistItems input').forEach(cb => {
                cb.onchange = () => {
                    const idx = parseInt(cb.dataset.idx);
                    itemsProyecto[idx].completado = cb.checked;
                    localStorage.setItem('checklistCierre', JSON.stringify(checklistCierre));
                };
            });
        };
        container.innerHTML = `
            <h2>✅ Checklist de Cierre</h2>
            <input type="text" id="nuevoChecklist" placeholder="Nuevo item"><button id="agregarChecklist">Agregar</button>
            <div id="checklistItems"></div>
            <button id="generarActaCierreChecklist">Generar Acta de Cierre desde checklist</button>
        `;
        document.getElementById('agregarChecklist').onclick = () => {
            const texto = document.getElementById('nuevoChecklist').value.trim();
            if (texto) {
                checklistCierre.push({ projectId: proyecto.name, texto, completado: false });
                localStorage.setItem('checklistCierre', JSON.stringify(checklistCierre));
                renderChecklistCierre(container);
            }
        };
        document.getElementById('generarActaCierreChecklist').onclick = () => {
            const todosCompletados = itemsProyecto.every(i=>i.completado);
            if (!todosCompletados) alert('No todos los items están marcados.');
            else generarActaCierre();
        };
        mostrar();
    }

    // ========== SECCIÓN ARCHIVO (repositorio con carpetas) ==========
    let documentosArchivo = JSON.parse(localStorage.getItem('documentosArchivo') || '[]');
    function renderArchivoDocumentos(container) {
        const proyecto = obtenerProyectoActual();
        const archivos = documentosArchivo.filter(d=>d.projectId===proyecto.name);
        const carpetas = [...new Set(archivos.map(a=>a.carpeta).filter(Boolean))];
        const mostrar = (carpetaSeleccionada = '') => {
            const filtrados = carpetaSeleccionada ? archivos.filter(a=>a.carpeta===carpetaSeleccionada) : archivos;
            const list = filtrados.map((doc,i) => `<tr><td>${doc.nombre}</td><td>${doc.fecha}</td><td>${doc.carpeta || 'Raíz'}</td><td><button data-idx="${i}" class="descargarArchivo">Descargar</button> <button data-idx="${i}" class="eliminarArchivo">🗑️</button></td></tr>`).join('');
            document.getElementById('listaArchivos').innerHTML = `<table><thead><tr><th>Nombre</th><th>Fecha</th><th>Carpeta</th><th>Acciones</th></tr></thead><tbody>${list || '<tr><td colspan="4">No hay documentos</td></tr>'}</tbody></table>`;
            document.querySelectorAll('.descargarArchivo').forEach(btn => btn.onclick = () => {
                const doc = filtrados[btn.dataset.idx];
                const a = document.createElement('a');
                a.href = doc.contenido;
                a.download = doc.nombre;
                a.click();
            });
            document.querySelectorAll('.eliminarArchivo').forEach(btn => btn.onclick = () => {
                const idx = archivos.findIndex(a=>a===filtrados[btn.dataset.idx]);
                archivos.splice(idx,1);
                localStorage.setItem('documentosArchivo', JSON.stringify(documentosArchivo));
                renderArchivoDocumentos(container);
            });
        };
        container.innerHTML = `
            <h2>📁 Archivo de Documentos</h2>
            <div><label>Carpeta: </label><select id="carpetaSelect"><option value="">Raíz</option>${carpetas.map(c=>`<option value="${c}">${c}</option>`).join('')}</select> <button id="crearCarpetaBtn">+ Crear carpeta</button></div>
            <input type="file" id="subirArchivo"><button id="cargarArchivo">Subir documento</button>
            <div id="listaArchivos"></div>
        `;
        const carpetaSelect = document.getElementById('carpetaSelect');
        carpetaSelect.onchange = () => mostrar(carpetaSelect.value);
        document.getElementById('crearCarpetaBtn').onclick = () => {
            const nombre = prompt('Nombre de la carpeta:', 'Nueva carpeta');
            if (nombre) {
                if (!carpetas.includes(nombre)) carpetas.push(nombre);
                const opt = document.createElement('option');
                opt.value = nombre;
                opt.textContent = nombre;
                carpetaSelect.appendChild(opt);
                alert(`Carpeta "${nombre}" creada.`);
            }
        };
        document.getElementById('cargarArchivo').onclick = () => {
            const fileInput = document.getElementById('subirArchivo');
            const file = fileInput.files[0];
            if (!file) { alert('Selecciona un archivo'); return; }
            const carpeta = carpetaSelect.value;
            const reader = new FileReader();
            reader.onload = (e) => {
                documentosArchivo.push({ projectId: proyecto.name, nombre: file.name, contenido: e.target.result, fecha: new Date().toLocaleString(), carpeta: carpeta || 'Raíz' });
                localStorage.setItem('documentosArchivo', JSON.stringify(documentosArchivo));
                renderArchivoDocumentos(container);
            };
            reader.readAsDataURL(file);
        };
        mostrar();
    }

    // ========== SECCIÓN TRANSFERENCIA (perfecta) ==========
    let transferenciaData = JSON.parse(localStorage.getItem('transferenciaData') || '{}');
    function renderTransferencia(container) {
        const proyecto = obtenerProyectoActual();
        const data = transferenciaData[proyecto.name] || { plan: '', responsable: '', fecha: '' };
        const guardar = () => {
            transferenciaData[proyecto.name] = {
                plan: document.getElementById('planTransferencia').value,
                responsable: document.getElementById('responsableTransferencia').value,
                fecha: document.getElementById('fechaTransferencia').value
            };
            localStorage.setItem('transferenciaData', JSON.stringify(transferenciaData));
            alert('Plan de transferencia guardado');
            renderTransferencia(container);
        };
        container.innerHTML = `
            <h2>🔄 Plan de Transferencia a Operaciones</h2>
            <div style="background:rgba(0,0,0,0.3); padding:20px; border-radius:12px;">
                <label>Plan de mantenimiento:</label><br>
                <textarea id="planTransferencia" rows="3" style="width:100%; background:#0f172a; color:white; border:1px solid #3b82f6; border-radius:8px; padding:8px;">${data.plan}</textarea><br>
                <label>Responsable:</label><br>
                <input type="text" id="responsableTransferencia" value="${data.responsable}" style="width:100%; background:#0f172a; color:white; border:1px solid #3b82f6; border-radius:8px; padding:8px;"><br>
                <label>Fecha prevista:</label><br>
                <input type="date" id="fechaTransferencia" value="${data.fecha}" style="width:100%; background:#0f172a; color:white; border:1px solid #3b82f6; border-radius:8px; padding:8px;"><br>
                <button id="guardarTransferencia" style="margin-top:10px;">Guardar plan</button>
                <button id="generarDocumentoTransferencia" style="margin-top:10px; margin-left:10px;">Generar documento</button>
            </div>
        `;
        document.getElementById('guardarTransferencia').onclick = guardar;
        document.getElementById('generarDocumentoTransferencia').onclick = () => {
            const html = generarHTML('Plan de Transferencia a Operaciones', `
                <p><strong>Proyecto:</strong> ${proyecto.name}</p>
                <p><strong>Plan de mantenimiento:</strong> ${data.plan}</p>
                <p><strong>Responsable:</strong> ${data.responsable}</p>
                <p><strong>Fecha prevista:</strong> ${data.fecha}</p>
            `);
            abrirVentanaDocumento(html, `Transferencia_${proyecto.name}`);
        };
    }

    // ========== SECCIÓN DASHBOARD (mejorada con gráficos) ==========
    function renderDashboard(container) {
        const proyecto = obtenerProyectoActual();
        const tasks = proyecto?.tasks || [];
        const total = tasks.length;
        const completadas = tasks.filter(t=>t.status==='completed').length;
        const atrasadas = tasks.filter(t=>t.deadline && new Date(t.deadline)<new Date() && t.status!=='completed').length;
        const enProgreso = tasks.filter(t=>t.status==='inProgress').length;
        const horasEst = tasks.reduce((s,t)=>s+(Number(t.estimatedTime)||0),0);
        const horasReg = tasks.reduce((s,t)=>s+(Number(t.timeLogged)||0),0);
        const SPI = horasEst ? horasReg/horasEst : 0;
        const CPI = horasEst ? horasReg/horasEst : 0;
        const chartId = 'dashboardChart';
        container.innerHTML = `
            <h2>📊 Dashboard Ejecutivo</h2>
            <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-bottom:30px;">
                <div style="background:rgba(59,130,246,0.1); border-left:4px solid #3b82f6; padding:20px;"><div style="font-size:32px;">${total}</div><div>Tareas</div></div>
                <div style="background:rgba(16,185,129,0.1); border-left:4px solid #10b981; padding:20px;"><div style="font-size:32px;">${completadas}</div><div>Completadas</div></div>
                <div style="background:rgba(245,158,11,0.1); border-left:4px solid #f59e0b; padding:20px;"><div style="font-size:32px;">${atrasadas}</div><div>Atrasadas</div></div>
                <div style="background:rgba(139,92,246,0.1); border-left:4px solid #8b5cf6; padding:20px;"><div style="font-size:32px;">${Math.round(completadas/total*100)}%</div><div>Progreso</div></div>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px;">
                <div style="background:rgba(0,0,0,0.3); padding:15px; border-radius:12px;"><strong>SPI:</strong> ${SPI.toFixed(2)} ${SPI>=1?'✅':SPI>=0.8?'⚠️':'🔴'}</div>
                <div style="background:rgba(0,0,0,0.3); padding:15px; border-radius:12px;"><strong>CPI:</strong> ${CPI.toFixed(2)} ${CPI>=1?'✅':CPI>=0.9?'⚠️':'🔴'}</div>
            </div>
            <div style="background:rgba(0,0,0,0.3); padding:20px; border-radius:12px; margin-bottom:20px;">
                <strong>🔔 Alertas</strong>
                <div id="alertasDashboard">${atrasadas>0?`⚠️ ${atrasadas} tareas atrasadas`:'✅ Todo en orden'}</div>
            </div>
            <div style="background:rgba(0,0,0,0.3); padding:20px; border-radius:12px;">
                <strong>📈 Evolución del Progreso</strong>
                <canvas id="${chartId}" width="400" height="200"></canvas>
            </div>
        `;
        const ctx = document.getElementById(chartId).getContext('2d');
        if (typeof Chart !== 'undefined') {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Sem1', 'Sem2', 'Sem3', 'Sem4'],
                    datasets: [{
                        label: '% Completado',
                        data: [Math.round(completadas/total*100)*0.3, Math.round(completadas/total*100)*0.5, Math.round(completadas/total*100)*0.7, Math.round(completadas/total*100)],
                        borderColor: '#3b82f6',
                        fill: false
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        } else {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.onload = () => renderDashboard(container);
            document.head.appendChild(script);
        }
    }

    // ========== PANEL PRINCIPAL ==========
    function abrirPanelCompleto() {
        const proyecto = obtenerProyectoActual();
        if (!proyecto) { alert('No hay proyecto seleccionado'); return; }

        const overlay = document.createElement('div');
        overlay.id = 'pmVirtualPanel';
        overlay.style.cssText = `position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); backdrop-filter:blur(10px); z-index:100000; display:flex; justify-content:center; align-items:center;`;
        const panel = document.createElement('div');
        panel.style.cssText = `width:1300px; max-width:95vw; height:85vh; background:linear-gradient(135deg,#0f172a,#1e293b); border-radius:24px; border:1px solid #3b82f6; display:flex; flex-direction:column; overflow:hidden; color:white; font-family:system-ui;`;

        const tabs = [
            { id: 'dashboard', label: '📊 Dashboard' },
            { id: 'documentos', label: '📄 Documentos' },
            { id: 'control', label: '⚙️ Control' },
            { id: 'reuniones', label: '🗓️ Reuniones' },
            { id: 'gantt', label: '📅 Gantt' },
            { id: 'recursos', label: '👥 Recursos' },
            { id: 'costos', label: '💰 Costos' },
            { id: 'cambios', label: '🔄 Cambios' },
            { id: 'hitos', label: '🎯 Hitos' },
            { id: 'reportes', label: '📧 Reportes' },
            { id: 'desempeno', label: '📊 Desempeño' },
            { id: 'habilidades', label: '🧠 Habilidades' },
            { id: 'reconocimientos', label: '🏆 Reconocimientos' },
            { id: 'riesgosMatriz', label: '⚠️ MatrizRiesgos' },
            { id: 'acciones', label: '🛡️ AccionesPrev' },
            { id: 'calidad', label: '📊 Calidad' },
            { id: 'encuestas', label: '📝 Encuestas' },
            { id: 'portal', label: '🌐 Portal' },
            { id: 'checklist', label: '✅ Checklist' },
            { id: 'archivo', label: '📁 Archivo' },
            { id: 'transferencia', label: '🔄 Transferencia' }
        ];
        let activeTab = 'dashboard';

        const header = document.createElement('div');
        header.style.cssText = `display:flex; justify-content:space-between; align-items:center; padding:15px 25px; background:rgba(0,0,0,0.3); border-bottom:1px solid #3b82f6; flex-wrap:wrap; gap:10px;`;
        const tabsContainer = document.createElement('div');
        tabsContainer.style.display = 'flex';
        tabsContainer.style.flexWrap = 'wrap';
        tabsContainer.style.gap = '10px';
        tabs.forEach(tab => {
            const btn = document.createElement('button');
            btn.textContent = tab.label;
            btn.style.cssText = `background:none; border:none; color:${activeTab===tab.id?'#3b82f6':'#94a3b8'}; font-size:12px; font-weight:bold; cursor:pointer; padding:6px 12px; border-radius:8px; transition:0.2s;`;
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
        closeBtn.style.cssText = `background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#ef4444; padding:8px 16px; border-radius:8px; cursor:pointer;`;
        closeBtn.onclick = () => overlay.remove();
        header.appendChild(closeBtn);
        panel.appendChild(header);

        const contentDiv = document.createElement('div');
        contentDiv.id = 'pmContent';
        contentDiv.style.cssText = `flex:1; overflow-y:auto; padding:25px;`;
        panel.appendChild(contentDiv);
        overlay.appendChild(panel);
        document.body.appendChild(overlay);

        function cargarContenido(tabId) {
            if (tabId === 'dashboard') renderDashboard(contentDiv);
            else if (tabId === 'documentos') renderDocumentos(contentDiv);
            else if (tabId === 'control') renderControl(contentDiv);
            else if (tabId === 'reuniones') renderReuniones(contentDiv);
            else if (tabId === 'gantt') renderGantt(contentDiv);
            else if (tabId === 'recursos') renderAsignacionRecursos(contentDiv);
            else if (tabId === 'costos') renderLineaBaseCostos(contentDiv);
            else if (tabId === 'cambios') renderGestionCambios(contentDiv);
            else if (tabId === 'hitos') renderSeguimientoHitos(contentDiv);
            else if (tabId === 'reportes') renderReportesAutomaticos(contentDiv);
            else if (tabId === 'desempeno') renderEvaluacionDesempeno(contentDiv);
            else if (tabId === 'habilidades') renderMatrizHabilidades(contentDiv);
            else if (tabId === 'reconocimientos') renderReconocimientos(contentDiv);
            else if (tabId === 'riesgosMatriz') renderMatrizRiesgos(contentDiv);
            else if (tabId === 'acciones') renderAccionesPreventivas(contentDiv);
            else if (tabId === 'calidad') renderIndicadoresCalidad(contentDiv);
            else if (tabId === 'encuestas') renderEncuestas(contentDiv);
            else if (tabId === 'portal') renderPortalProyecto(contentDiv);
            else if (tabId === 'checklist') renderChecklistCierre(contentDiv);
            else if (tabId === 'archivo') renderArchivoDocumentos(contentDiv);
            else if (tabId === 'transferencia') renderTransferencia(contentDiv);
        }

        function renderDocumentos(container) {
            container.innerHTML = `
                <h2>📄 Generación de Documentos</h2>
                <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:15px;">
                    <button class="doc-btn" data-doc="charter">📑 Acta Constitutiva</button>
                    <button class="doc-btn" data-doc="stakeholders">👥 Registro Stakeholders</button>
                    <button class="doc-btn" data-doc="plan">📅 Plan Proyecto (con Gantt)</button>
                    <button class="doc-btn" data-doc="wbs">📋 WBS</button>
                    <button class="doc-btn" data-doc="raci">📊 Matriz RACI</button>
                    <button class="doc-btn" data-doc="risks">⚠️ Plan Riesgos</button>
                    <button class="doc-btn" data-doc="evm">📈 Informe EVM</button>
                    <button class="doc-btn" data-doc="quality">✅ Plan Calidad</button>
                    <button class="doc-btn" data-doc="communications">📢 Plan Comunicaciones</button>
                    <button class="doc-btn" data-doc="lessons">📝 Lecciones Aprendidas</button>
                    <button class="doc-btn" data-doc="closure">🔚 Acta de Cierre</button>
                    <button class="doc-btn" data-doc="final">📊 Informe Final</button>
                </div>
            `;
            const style = document.createElement('style'); style.textContent = `.doc-btn{ background:linear-gradient(135deg,#3b82f6,#1e40af); border:none; padding:12px; border-radius:40px; color:white; cursor:pointer; font-weight:bold; transition:0.2s; } .doc-btn:hover{ transform:translateY(-2px); }`;
            container.appendChild(style);
            document.querySelectorAll('.doc-btn').forEach(btn => {
                const doc = btn.dataset.doc;
                btn.onclick = () => {
                    if (doc === 'charter') generarActaConstitutiva();
                    else if (doc === 'stakeholders') generarRegistroStakeholders();
                    else if (doc === 'plan') generarPlanProyecto();
                    else if (doc === 'wbs') generarWBS();
                    else if (doc === 'raci') generarMatrizRACI();
                    else if (doc === 'risks') generarPlanRiesgos();
                    else if (doc === 'evm') generarInformeEVM();
                    else if (doc === 'quality') generarPlanCalidad();
                    else if (doc === 'communications') generarPlanComunicaciones();
                    else if (doc === 'lessons') generarLeccionesAprendidas();
                    else if (doc === 'closure') generarActaCierre();
                    else if (doc === 'final') generarInformeFinal();
                };
            });
        }

        cargarContenido(activeTab);
    }

    // ---------- CREAR BOTÓN FLOTANTE ----------
    const oldBtn = document.getElementById('pmVirtualBtn');
    if (oldBtn) oldBtn.remove();
    const btn = document.createElement('button');
    btn.id = 'pmVirtualBtn';
    btn.innerHTML = '👨‍💼 PM Virtual';
    btn.style.cssText = `position:fixed; bottom:20px; left:20px; z-index:100000; background:linear-gradient(135deg,#2c3e50,#1a2632); color:white; border:none; padding:12px 24px; border-radius:40px; font-weight:bold; cursor:pointer; font-size:14px; box-shadow:0 4px 12px rgba(0,0,0,0.3); transition:transform 0.2s;`;
    btn.onmouseenter = () => btn.style.transform = 'scale(1.05)';
    btn.onmouseleave = () => btn.style.transform = 'scale(1)';
    btn.onclick = abrirPanelCompleto;
    document.body.appendChild(btn);
    console.log('✅ PM Virtual Ejecutivo ACTIVADO. Haz clic en el botón.');
})();