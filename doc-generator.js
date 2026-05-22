// doc-generator.js
(function() {
    // Extiende las funciones que PMAgent usa
    window.generateProjectCharter = function() {
        const project = window.projects[window.currentProjectIndex];
        if (!project) return alert('No hay proyecto seleccionado');
        // Recopilar más datos (podrías abrir un modal de entrada)
        const html = `
            <!DOCTYPE html>
            <html><head><title>Acta Constitutiva - ${project.name}</title></head>
            <body>
                <h1>Acta Constitutiva del Proyecto</h1>
                <p><strong>Nombre del proyecto:</strong> ${project.name}</p>
                <p><strong>Fecha de elaboración:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>Descripción:</strong> ${project.description || 'Sin descripción'}</p>
                <p><strong>Objetivos:</strong> ${prompt('Ingrese los objetivos del proyecto (separados por comas):') || 'No definidos'}</p>
                <p><strong>Alcance:</strong> ${prompt('Ingrese el alcance del proyecto:') || 'No definido'}</p>
                <p><strong>Stakeholders clave:</strong> ${prompt('Stakeholders clave:') || 'No definidos'}</p>
                <p><strong>Presupuesto estimado:</strong> ${prompt('Presupuesto estimado:') || 'No definido'}</p>
                <p><strong>Gerente de proyecto:</strong> ${localStorage.getItem('userName') || 'No asignado'}</p>
                <p><strong>Sponsor:</strong> ${prompt('Nombre del sponsor:') || 'No definido'}</p>
                <p><strong>Criterios de éxito:</strong> ${prompt('Criterios de éxito:') || 'No definidos'}</p>
            </body>
            </html>
        `;
        const win = window.open('', '_blank');
        win.document.write(html);
        win.document.close();
    };

    window.generateClosureReport = function() {
        const project = window.projects[window.currentProjectIndex];
        if (!project) return alert('No hay proyecto seleccionado');
        const tasks = project.tasks || [];
        const completed = tasks.filter(t => t.status === 'completed').length;
        const total = tasks.length;
        const lecciones = prompt('Ingrese las lecciones aprendidas:') || 'No registradas';
        const desviaciones = prompt('Desviaciones respecto al plan:') || 'No registradas';
        const html = `
            <!DOCTYPE html>
            <html><head><title>Acta de Cierre - ${project.name}</title></head>
            <body>
                <h1>Acta de Cierre del Proyecto</h1>
                <p><strong>Proyecto:</strong> ${project.name}</p>
                <p><strong>Fecha de cierre:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>Estado de entregables:</strong> ${completed}/${total} tareas completadas (${total? Math.round(completed/total*100):0}%)</p>
                <p><strong>Lecciones aprendidas:</strong> ${lecciones}</p>
                <p><strong>Desviaciones:</strong> ${desviaciones}</p>
                <p><strong>Evaluación final:</strong> ${prompt('Evaluación final del proyecto (satisfactorio/regular/insatisfactorio):') || 'No evaluado'}</p>
            </body>
            </html>
        `;
        const win = window.open('', '_blank');
        win.document.write(html);
        win.document.close();
    };

    window.generateProjectPlan = function() {
        const project = window.projects[window.currentProjectIndex];
        if (!project) return alert('No hay proyecto seleccionado');
        const tasks = project.tasks || [];
        let tasksHTML = tasks.map(t => `
            <li>
                <strong>${t.name}</strong><br>
                <em>Duración:</em> ${t.estimatedTime || 0}h<br>
                <em>Responsable:</em> ${t.assignee || 'No asignado'}<br>
                <em>Fecha inicio:</em> ${t.startDate || 'No definida'}<br>
                <em>Fecha fin:</em> ${t.deadline || 'No definida'}<br>
                <em>Estado:</em> ${t.status || 'pendiente'}
            </li>
        `).join('');
        const html = `
            <!DOCTYPE html>
            <html><head><title>Plan de Proyecto - ${project.name}</title></head>
            <body>
                <h1>Plan de Proyecto</h1>
                <h2>${project.name}</h2>
                <p><strong>Descripción:</strong> ${project.description || 'Sin descripción'}</p>
                <h3>Estructura de tareas (WBS)</h3>
                <ul>${tasksHTML || '<li>No hay tareas definidas</li>'}</ul>
                <h3>Cronograma de hitos</h3>
                <ul>${tasks.filter(t => t.critical || t.priority === 'alta').map(t => `<li>${t.name} - ${t.deadline || 'Sin fecha'}</li>`).join('') || '<li>No hay hitos definidos</li>'}</ul>
            </body>
            </html>
        `;
        const win = window.open('', '_blank');
        win.document.write(html);
        win.document.close();
    };
    console.log('✅ Generadores de documentación cargados');
})();