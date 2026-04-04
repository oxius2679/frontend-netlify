// pm-docs.js - Generación de documentos profesionales
(function() {
    console.log('📄 Cargando generador de documentos...');

    // Funciones de utilidad
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
    // ACTA CONSTITUTIVA
    // ============================================
    window.generarActaConstitutiva = function() {
        const proyecto = obtenerProyectoActual();
        if (!proyecto) {
            alert('No hay proyecto seleccionado.');
            return;
        }

        // Recoger información adicional mediante prompt
        const objetivos = prompt('Objetivo principal del proyecto:', '');
        const alcance = prompt('Alcance (qué incluye y qué no):', '');
        const stakeholders = prompt('Stakeholders clave (separados por comas):', '');
        const presupuesto = prompt('Presupuesto estimado (€):', '');
        const sponsor = prompt('Sponsor / Patrocinador:', '');
        const pm = prompt('Gerente del proyecto:', 'Usuario');

        const fecha = new Date().toLocaleDateString('es-ES');
        const nombreProyecto = proyecto.name;

        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Acta Constitutiva - ${nombreProyecto}</title>
                <style>
                    body { font-family: 'Segoe UI', Arial, sans-serif; margin: 40px; line-height: 1.6; }
                    h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
                    h2 { color: #2980b9; margin-top: 30px; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .fecha { color: #7f8c8d; text-align: center; margin-top: 5px; }
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background: #f2f2f2; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>ACTA CONSTITUTIVA DEL PROYECTO</h1>
                    <div class="fecha">${fecha}</div>
                </div>
                <h2>1. Identificación del Proyecto</h2>
                <p><strong>Nombre del Proyecto:</strong> ${nombreProyecto}</p>
                <p><strong>Gerente del Proyecto:</strong> ${pm}</p>
                <p><strong>Sponsor:</strong> ${sponsor || 'No especificado'}</p>

                <h2>2. Justificación y Objetivos</h2>
                <p><strong>Objetivo principal:</strong> ${objetivos || 'No especificado'}</p>

                <h2>3. Alcance</h2>
                <p>${alcance || 'No especificado'}</p>

                <h2>4. Stakeholders Clave</h2>
                <p>${stakeholders || 'No especificado'}</p>

                <h2>5. Presupuesto Estimado</h2>
                <p>${presupuesto ? `€${presupuesto}` : 'No especificado'}</p>

                <h2>6. Aprobaciones</h2>
                <table>
                    <tr><th>Rol</th><th>Nombre</th><th>Firma</th><th>Fecha</th></tr>
                    <tr><td>Sponsor</td><td>${sponsor || ''}</td><td></td><td></td></tr>
                    <tr><td>Gerente Proyecto</td><td>${pm}</td><td></td><td></td></tr>
                </table>
                <p style="margin-top: 40px; font-size: 12px; color: #7f8c8d;">Documento generado automáticamente por el PM Virtual.</p>
            </body>
            </html>
        `;
        abrirVentanaDocumento(html, `Acta_Constitutiva_${nombreProyecto}`);
    };

    // ============================================
    // PLAN DE PROYECTO
    // ============================================
    window.generarPlanProyecto = function() {
        const proyecto = obtenerProyectoActual();
        if (!proyecto) {
            alert('No hay proyecto seleccionado.');
            return;
        }
        const tasks = proyecto.tasks || [];
        const hitos = tasks.filter(t => t.critical || t.priority === 'alta');
        const responsables = [...new Set(tasks.map(t => t.assignee).filter(Boolean))];

        const cronogramaHTML = tasks.map(t => `
            <tr>
                <td>${t.name}</td>
                <td>${t.assignee || 'Sin asignar'}</td>
                <td>${t.startDate ? new Date(t.startDate).toLocaleDateString() : 'N/D'}</td>
                <td>${t.deadline ? new Date(t.deadline).toLocaleDateString() : 'N/D'}</td>
                <td>${t.estimatedTime || 0}h</td>
                <td>${t.status === 'completed' ? 'Completada' : (t.status === 'inProgress' ? 'En progreso' : 'Pendiente')}</td>
            </tr>
        `).join('');

        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Plan de Proyecto - ${proyecto.name}</title>
                <style>
                    body { font-family: 'Segoe UI', Arial, sans-serif; margin: 40px; }
                    h1 { color: #2c3e50; }
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background: #f2f2f2; }
                    .section { margin-bottom: 30px; }
                </style>
            </head>
            <body>
                <h1>Plan de Proyecto: ${proyecto.name}</h1>
                <div class="section">
                    <h2>Resumen Ejecutivo</h2>
                    <p>Fecha de inicio: ${proyecto.startDate || 'N/D'} | Fecha de fin estimada: ${proyecto.endDate || 'N/D'}</p>
                    <p>Total de tareas: ${tasks.length}</p>
                    <p>Recursos asignados: ${responsables.join(', ') || 'Ninguno'}</p>
                </div>
                <div class="section">
                    <h2>Cronograma de Tareas</h2>
                    <table>
                        <tr><th>Tarea</th><th>Responsable</th><th>Inicio</th><th>Fin</th><th>Horas</th><th>Estado</th></tr>
                        ${cronogramaHTML}
                    </table>
                </div>
                <div class="section">
                    <h2>Hitos del Proyecto</h2>
                    <ul>
                        ${hitos.map(h => `<li>${h.name} (${h.deadline ? new Date(h.deadline).toLocaleDateString() : 'N/D'})</li>`).join('')}
                    </ul>
                </div>
                <div class="section">
                    <h2>Matriz de Responsabilidades</h2>
                    <ul>
                        ${responsables.map(r => `<li>${r}</li>`).join('')}
                    </ul>
                </div>
                <p style="margin-top: 40px; font-size: 12px; color: #7f8c8d;">Documento generado automáticamente por el PM Virtual.</p>
            </body>
            </html>
        `;
        abrirVentanaDocumento(html, `Plan_Proyecto_${proyecto.name}`);
    };

    // ============================================
    // ACTA DE CIERRE
    // ============================================
    window.generarActaCierre = function() {
        const proyecto = obtenerProyectoActual();
        if (!proyecto) {
            alert('No hay proyecto seleccionado.');
            return;
        }
        const tasks = proyecto.tasks || [];
        const completadas = tasks.filter(t => t.status === 'completed').length;
        const total = tasks.length;
        const porcentaje = total ? Math.round((completadas/total)*100) : 0;

        const lecciones = prompt('Lecciones aprendidas (puntos clave):', '');
        const desviaciones = prompt('Desviaciones significativas (presupuesto, tiempo):', '');
        const aceptacion = confirm('¿El cliente ha aceptado el proyecto? (Aceptar para Sí, Cancelar para No)');

        const fecha = new Date().toLocaleDateString('es-ES');

        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Acta de Cierre - ${proyecto.name}</title>
                <style>
                    body { font-family: 'Segoe UI', Arial, sans-serif; margin: 40px; }
                    h1 { color: #2c3e50; }
                    .section { margin-bottom: 30px; }
                </style>
            </head>
            <body>
                <h1>Acta de Cierre del Proyecto</h1>
                <p><strong>Proyecto:</strong> ${proyecto.name}</p>
                <p><strong>Fecha de cierre:</strong> ${fecha}</p>
                <div class="section">
                    <h2>Resultados Finales</h2>
                    <p>Porcentaje de tareas completadas: ${porcentaje}% (${completadas}/${total})</p>
                    <p>Estado final: ${porcentaje === 100 ? 'Completado' : 'Parcialmente completado'}</p>
                </div>
                <div class="section">
                    <h2>Lecciones Aprendidas</h2>
                    <p>${lecciones || 'No registradas'}</p>
                </div>
                <div class="section">
                    <h2>Desviaciones</h2>
                    <p>${desviaciones || 'Ninguna'}</p>
                </div>
                <div class="section">
                    <h2>Aceptación del Cliente</h2>
                    <p>${aceptacion ? 'Aceptado' : 'Pendiente de aceptación'}</p>
                </div>
                <p style="margin-top: 40px; font-size: 12px; color: #7f8c8d;">Documento generado automáticamente por el PM Virtual.</p>
            </body>
            </html>
        `;
        abrirVentanaDocumento(html, `Acta_Cierre_${proyecto.name}`);
    };

    // ============================================
    // INFORME DE ESTADO
    // ============================================
    window.generarInformeEstado = function() {
        const proyecto = obtenerProyectoActual();
        if (!proyecto) {
            alert('No hay proyecto seleccionado.');
            return;
        }
        const tasks = proyecto.tasks || [];
        const completadas = tasks.filter(t => t.status === 'completed').length;
        const enProgreso = tasks.filter(t => t.status === 'inProgress').length;
        const pendientes = tasks.filter(t => t.status === 'pending').length;
        const atrasadas = tasks.filter(t => t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed').length;
        const horasEst = tasks.reduce((s,t) => s + (Number(t.estimatedTime)||0),0);
        const horasReg = tasks.reduce((s,t) => s + (Number(t.timeLogged)||0),0);
        const eficiencia = horasEst ? Math.round((horasReg/horasEst)*100) : 0;

        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Informe de Estado - ${proyecto.name}</title>
                <style>
                    body { font-family: 'Segoe UI', Arial, sans-serif; margin: 40px; }
                    h1 { color: #2c3e50; }
                    .kpi { display: inline-block; width: 200px; margin: 10px; padding: 15px; background: #f8f9fa; border-radius: 8px; }
                </style>
            </head>
            <body>
                <h1>Informe de Estado del Proyecto</h1>
                <p>Proyecto: ${proyecto.name}</p>
                <p>Fecha: ${new Date().toLocaleString()}</p>
                <div style="display: flex; flex-wrap: wrap;">
                    <div class="kpi"><strong>Total tareas</strong><br>${tasks.length}</div>
                    <div class="kpi"><strong>Completadas</strong><br>${completadas}</div>
                    <div class="kpi"><strong>En progreso</strong><br>${enProgreso}</div>
                    <div class="kpi"><strong>Pendientes</strong><br>${pendientes}</div>
                    <div class="kpi"><strong>Atrasadas</strong><br>${atrasadas}</div>
                    <div class="kpi"><strong>Eficiencia</strong><br>${eficiencia}%</div>
                </div>
                <h2>Próximos pasos</h2>
                <p>${atrasadas > 0 ? 'Atención: hay tareas atrasadas. Revisar planificación.' : 'El proyecto avanza según lo esperado.'}</p>
                <p style="margin-top: 40px; font-size: 12px; color: #7f8c8d;">Informe generado automáticamente por el PM Virtual.</p>
            </body>
            </html>
        `;
        abrirVentanaDocumento(html, `Informe_Estado_${proyecto.name}`);
    };

    // Función auxiliar para abrir documento en nueva ventana
    function abrirVentanaDocumento(html, nombreArchivo) {
        const ventana = window.open('', '_blank');
        ventana.document.write(html);
        ventana.document.close();
        ventana.document.title = nombreArchivo;
    }
})();