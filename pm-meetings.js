// pm-meetings.js - Gestión de reuniones y actas
(function() {
    console.log('🗓️ Cargando gestor de reuniones...');

    // Cargar reuniones desde localStorage
    function cargarReuniones() {
        try {
            return JSON.parse(localStorage.getItem('pmMeetings') || '[]');
        } catch(e) { return []; }
    }

    function guardarReuniones(reuniones) {
        localStorage.setItem('pmMeetings', JSON.stringify(reuniones));
    }

    // Función principal para convocar reunión
    window.gestionarReunionPM = function() {
        const titulo = prompt('Título de la reunión:', 'Reunión de seguimiento');
        if (!titulo) return;

        const fecha = new Date();
        const fechaStr = fecha.toISOString();
        const fechaLocal = fecha.toLocaleString();

        const agenda = prompt('Agenda (temas a tratar):', '1. Revisión de estado\n2. Riesgos\n3. Próximos pasos');
        if (!agenda) return;

        // Crear objeto reunión
        const reunion = {
            id: Date.now(),
            titulo: titulo,
            fecha: fechaStr,
            fechaLocal: fechaLocal,
            agenda: agenda,
            acuerdos: []
        };

        // Mostrar interfaz para registrar acuerdos
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; top:0; left:0; width:100%; height:100%;
            background: rgba(0,0,0,0.9); z-index: 100001;
            display: flex; justify-content: center; align-items: center;
        `;
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: #1e293b; border-radius: 16px; padding: 30px;
            width: 600px; max-width: 90%; color: white;
        `;
        modal.innerHTML = `
            <h2>Registro de Acuerdos</h2>
            <p><strong>Reunión:</strong> ${titulo}</p>
            <p><strong>Fecha:</strong> ${fechaLocal}</p>
            <p><strong>Agenda:</strong><br>${agenda.replace(/\n/g,'<br>')}</p>
            <div id="acuerdosList"></div>
            <div style="margin: 20px 0;">
                <input type="text" id="nuevoAcuerdo" placeholder="Nuevo acuerdo (descripción)" style="width: 70%; padding: 8px; border-radius: 8px;">
                <button id="agregarAcuerdoBtn" style="background: #3b82f6; border: none; padding: 8px 16px; border-radius: 8px; color: white;">Agregar</button>
            </div>
            <div style="margin-top: 20px;">
                <label>Responsable:</label>
                <input type="text" id="acuerdoResponsable" placeholder="Responsable" style="width: 100%; padding: 8px; margin: 5px 0;">
                <label>Fecha límite:</label>
                <input type="date" id="acuerdoFecha" style="width: 100%; padding: 8px; margin: 5px 0;">
                <button id="finalizarReunionBtn" style="background: #10b981; border: none; padding: 12px 24px; border-radius: 8px; color: white; margin-top: 15px;">Finalizar y guardar acta</button>
            </div>
        `;
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        const acuerdos = [];

        function renderAcuerdos() {
            const container = document.getElementById('acuerdosList');
            if (!container) return;
            container.innerHTML = acuerdos.map((a, i) => `
                <div style="border-left: 3px solid #10b981; padding: 8px; margin: 8px 0;">
                    <strong>${a.texto}</strong><br>
                    Responsable: ${a.responsable || 'N/D'} | Vence: ${a.fecha || 'N/D'}
                    <button data-idx="${i}" class="eliminarAcuerdo" style="background: none; border: none; color: #ef4444; cursor: pointer; margin-left: 10px;">🗑️</button>
                </div>
            `).join('');
            document.querySelectorAll('.eliminarAcuerdo').forEach(btn => {
                btn.onclick = () => {
                    const idx = btn.dataset.idx;
                    acuerdos.splice(idx, 1);
                    renderAcuerdos();
                };
            });
        }

        document.getElementById('agregarAcuerdoBtn').onclick = () => {
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

        document.getElementById('finalizarReunionBtn').onclick = () => {
            reunion.acuerdos = acuerdos;
            const reuniones = cargarReuniones();
            reuniones.push(reunion);
            guardarReuniones(reuniones);
            overlay.remove();

            // Generar acta
            generarActaReunion(reunion);
            alert('Acta generada y reunión guardada.');
            // Si el panel de PM está abierto, recargar lista
            if (window.PMVirtual && typeof window.PMVirtual.recargarReuniones === 'function') {
                window.PMVirtual.recargarReuniones();
            }
        };
    };

    function generarActaReunion(reunion) {
        const acuerdosHTML = reunion.acuerdos.map(a => `
            <tr>
                <td>${a.texto}</td>
                <td>${a.responsable || 'N/D'}</td>
                <td>${a.fecha || 'N/D'}</td>
            </tr>
        `).join('');

        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Acta de Reunión - ${reunion.titulo}</title>
                <style>
                    body { font-family: 'Segoe UI', Arial, sans-serif; margin: 40px; }
                    h1 { color: #2c3e50; }
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background: #f2f2f2; }
                </style>
            </head>
            <body>
                <h1>Acta de Reunión</h1>
                <p><strong>Título:</strong> ${reunion.titulo}</p>
                <p><strong>Fecha:</strong> ${reunion.fechaLocal}</p>
                <p><strong>Agenda:</strong><br>${reunion.agenda.replace(/\n/g,'<br>')}</p>
                <h2>Acuerdos</h2>
                <table>
                    <tr><th>Acuerdo</th><th>Responsable</th><th>Fecha Límite</th></tr>
                    ${acuerdosHTML}
                </table>
                <p style="margin-top: 40px; font-size: 12px; color: #7f8c8d;">Acta generada automáticamente por el PM Virtual.</p>
            </body>
            </html>
        `;
        const ventana = window.open('', '_blank');
        ventana.document.write(html);
        ventana.document.close();
        ventana.document.title = `Acta_${reunion.titulo}`;
    }

    window.verActaReunion = function(reunion) {
        if (!reunion) return;
        generarActaReunion(reunion);
    };

    // Exponer funciones para recargar lista desde el panel
    window.PMVirtual = window.PMVirtual || {};
    window.PMVirtual.recargarReuniones = function() {
        // Esta función será llamada desde pm-core.js si existe
        if (window.PMVirtual && typeof window.PMVirtual.cargarListaReuniones === 'function') {
            window.PMVirtual.cargarListaReuniones();
        }
    };
})();