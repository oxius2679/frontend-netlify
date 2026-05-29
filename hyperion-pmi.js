<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>EVM Report - Hyperion Logic</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', system-ui, sans-serif;
            background: linear-gradient(135deg, #0A0F1E, #0A0A1A);
            color: #E0E0FF;
            padding: 30px;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        .card {
            background: rgba(15, 20, 35, 0.8);
            border-radius: 24px;
            padding: 24px;
            margin-bottom: 24px;
            border: 1px solid rgba(0, 240, 255, 0.2);
        }
        h1 { font-size: 1.8rem; margin-bottom: 8px; }
        h2 { color: #00F0FF; font-size: 1.2rem; margin-bottom: 16px; border-left: 3px solid #FF00D4; padding-left: 12px; }
        .metricas {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
        }
        .metrica {
            background: rgba(0,0,0,0.4);
            border-radius: 16px;
            padding: 16px;
            text-align: center;
        }
        .metrica .label { font-size: 0.7rem; text-transform: uppercase; color: #888; letter-spacing: 1px; }
        .metrica .value { font-size: 1.8rem; font-weight: bold; font-family: monospace; }
        .metrica .unit { font-size: 0.7rem; color: #888; }
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.8rem;
        }
        th, td {
            padding: 10px 8px;
            text-align: left;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        th { color: #00F0FF; }
        .badge {
            display: inline-block;
            padding: 2px 10px;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: bold;
        }
        .badge-green { background: #00AA55; color: white; }
        .badge-yellow { background: #AA8800; color: white; }
        .badge-red { background: #AA3355; color: white; }
        .badge-gray { background: #444; color: white; }
        .footer {
            text-align: center;
            font-size: 0.7rem;
            color: #555;
            margin-top: 24px;
        }
        button {
            background: linear-gradient(135deg, #00F0FF, #FF00D4);
            border: none;
            padding: 12px 24px;
            border-radius: 40px;
            color: white;
            font-weight: bold;
            cursor: pointer;
            margin-top: 16px;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="card">
        <h1>📊 EVM REPORT</h1>
        <p>Basado en lógica Hyperion · Corte día hábil anterior · EV por horas reales</p>
    </div>

    <div class="metricas" id="metricas"></div>

    <div class="card">
        <h2>📋 Detalle de Tareas</h2>
        <div style="overflow-x: auto;">
            <table id="tablaTareas">
                <thead>
                    <tr><th>Tarea</th><th>Estado</th><th>Est (h)</th><th>Real (h)</th><th>Progreso Real</th><th>Inicio</th><th>Fin</th><th>PV (h)</th><th>EV (h)</th></tr>
                </thead>
                <tbody id="tablaBody"></tbody>
            </table>
        </div>
    </div>

    <div style="text-align: center;">
        <button id="btnActualizar">🔄 Actualizar desde sistema</button>
    </div>
    <div class="footer">
        Corte: día hábil anterior a la fecha · EV calculado como timeLogged/estimatedTime
    </div>
</div>

<script>
    // ============================================
    // LÓGICA EXACTA DE TU SISTEMA
    // ============================================
    
    // 1. Determinar si un día es hábil (L-V)
    function esHabil(date) {
        const dia = date.getDay();
        return dia !== 0 && dia !== 6;
    }
    
    // 2. Contar días hábiles entre dos fechas (inclusive)
    function contarDiasHabiles(inicio, fin) {
        let count = 0;
        const current = new Date(inicio);
        const end = new Date(fin);
        current.setHours(0,0,0,0);
        end.setHours(0,0,0,0);
        while (current <= end) {
            if (esHabil(current)) count++;
            current.setDate(current.getDate() + 1);
        }
        return count;
    }
    
    // 3. Contar días hábiles TRANSCURRIDOS (excluyendo la fecha final)
    function contarDiasHabilesTranscurridos(inicio, hasta) {
        let count = 0;
        const current = new Date(inicio);
        const end = new Date(hasta);
        current.setHours(0,0,0,0);
        end.setHours(0,0,0,0);
        while (current < end) {
            current.setDate(current.getDate() + 1);
            if (esHabil(current)) count++;
        }
        return count;
    }
    
    // 4. Ajustar al día hábil ANTERIOR (CLAVE DE TU SISTEMA)
    function ajustarDiaHabilAnterior(fecha) {
        const f = new Date(fecha);
        f.setDate(f.getDate() - 1);
        const dia = f.getDay();
        if (dia === 6) f.setDate(f.getDate() - 1);  // sábado → viernes
        if (dia === 0) f.setDate(f.getDate() - 2);  // domingo → viernes
        return f;
    }
    
    // 5. Calcular PV (planificado)
    function calcularPV(tasks, fechaReferencia) {
        let pv = 0;
        const fecha = ajustarDiaHabilAnterior(fechaReferencia);
        
        tasks.forEach(task => {
            const est = Number(task.estimatedTime) || 0;
            if (task.startDate && task.deadline && est > 0) {
                const start = new Date(task.startDate);
                const end = new Date(task.deadline);
                start.setHours(0,0,0,0);
                end.setHours(0,0,0,0);
                
                let prog = 0;
                if (fecha >= end) {
                    prog = 1;
                } else if (fecha > start) {
                    const total = contarDiasHabiles(start, end);
                    const trans = contarDiasHabilesTranscurridos(start, fecha);
                    prog = total > 0 ? trans / total : 0;
                    prog = Math.min(1, Math.max(0, prog));
                }
                pv += est * prog;
            }
        });
        return Math.round(pv * 100) / 100;
    }
    
    // 6. Calcular EV (valor ganado - basado en horas reales, NO en campo progress)
    function calcularEV(tasks) {
        let ev = 0;
        tasks.forEach(task => {
            const est = Number(task.estimatedTime) || 0;
            const logged = Number(task.timeLogged) || 0;
            const status = (task.status || '').toLowerCase();
            
            let pct = 0;
            if (status === 'completed') {
                pct = 1;
            } else if (est > 0) {
                pct = Math.min(1, logged / est);
            }
            ev += est * pct;
        });
        return Math.round(ev * 100) / 100;
    }
    
    // 7. Calcular AC (costo real)
    function calcularAC(tasks) {
        const total = tasks.reduce((s, t) => s + (Number(t.timeLogged) || 0), 0);
        return Math.round(total * 100) / 100;
    }
    
    // 8. Calcular BAC (presupuesto total)
    function calcularBAC(tasks) {
        const total = tasks.reduce((s, t) => s + (Number(t.estimatedTime) || 0), 0);
        return Math.round(total * 100) / 100;
    }
    
    // 9. Función principal EVM
    function calcularEVM(tasks, fechaRef) {
        const PV = calcularPV(tasks, fechaRef);
        const EV = calcularEV(tasks);
        const AC = calcularAC(tasks);
        const BAC = calcularBAC(tasks);
        const SPI = PV > 0 ? EV / PV : 1;
        const CPI = AC > 0 ? EV / AC : 1;
        const SV = EV - PV;
        const CV = EV - AC;
        
        return {
            PV, EV, AC, BAC,
            SPI: Math.round(SPI * 1000) / 1000,
            CPI: Math.round(CPI * 1000) / 1000,
            SV: Math.round(SV * 100) / 100,
            CV: Math.round(CV * 100) / 100,
            fechaCorte: ajustarDiaHabilAnterior(fechaRef)
        };
    }
    
    // ============================================
    // FUNCIONES PARA OBTENER DATOS DEL SISTEMA
    // ============================================
    
    function obtenerDatosDelSistema() {
        // Buscar en diferentes lugares donde puedan estar las tareas
        let tasks = null;
        let projectName = 'Proyecto actual';
        
        if (typeof projects !== 'undefined' && typeof currentProjectIndex !== 'undefined' && projects[currentProjectIndex]) {
            tasks = projects[currentProjectIndex].tasks;
            projectName = projects[currentProjectIndex].name || projectName;
        } else if (typeof tasksGlobal !== 'undefined') {
            tasks = tasksGlobal;
        } else if (window.tasks && Array.isArray(window.tasks)) {
            tasks = window.tasks;
        }
        
        return { tasks, projectName };
    }
    
    // ============================================
    // RENDERIZADO DEL REPORTE
    // ============================================
    
    function renderizarReporte() {
        const { tasks, projectName } = obtenerDatosDelSistema();
        
        if (!tasks || tasks.length === 0) {
            document.getElementById('metricas').innerHTML = '<div class="card" style="text-align:center">⚠️ No se encontraron tareas. Asegúrate de tener un proyecto cargado.</div>';
            return;
        }
        
        const fechaHoy = new Date(2026, 4, 26); // 26/5/2026 - MISMA QUE TU SISTEMA
        const evm = calcularEVM(tasks, fechaHoy);
        
        // Renderizar métricas
        const metricasHtml = `
            <div class="metrica"><div class="label">PV</div><div class="value">${evm.PV}</div><div class="unit">horas</div></div>
            <div class="metrica"><div class="label">EV</div><div class="value">${evm.EV}</div><div class="unit">horas</div></div>
            <div class="metrica"><div class="label">AC</div><div class="value">${evm.AC}</div><div class="unit">horas</div></div>
            <div class="metrica"><div class="label">BAC</div><div class="value">${evm.BAC}</div><div class="unit">horas</div></div>
            <div class="metrica"><div class="label">SPI</div><div class="value">${evm.SPI}</div><div class="unit">${evm.SPI >= 1 ? '✅ Adelantado' : '❌ Atrasado'}</div></div>
            <div class="metrica"><div class="label">CPI</div><div class="value">${evm.CPI}</div><div class="unit">${evm.CPI >= 1 ? '✅ Eficiente' : '❌ Ineficiente'}</div></div>
            <div class="metrica"><div class="label">SV</div><div class="value">${evm.SV >= 0 ? '+' : ''}${evm.SV}</div><div class="unit">horas</div></div>
            <div class="metrica"><div class="label">CV</div><div class="value">${evm.CV >= 0 ? '+' : ''}${evm.CV}</div><div class="unit">horas</div></div>
        `;
        document.getElementById('metricas').innerHTML = metricasHtml;
        
        // Renderizar tabla de tareas
        const tbody = document.getElementById('tablaBody');
        tbody.innerHTML = '';
        
        tasks.forEach(task => {
            const est = Number(task.estimatedTime) || 0;
            const logged = Number(task.timeLogged) || 0;
            const progresoReal = est > 0 ? (logged / est * 100).toFixed(1) : 0;
            const status = (task.status || '').toLowerCase();
            
            let badgeClass = 'badge-gray';
            let badgeText = '⏳ Pendiente';
            if (status === 'completed') {
                badgeClass = 'badge-green';
                badgeText = '✅ Completada';
            } else if (status === 'inProgress') {
                badgeClass = 'badge-yellow';
                badgeText = '🔄 En progreso';
            } else if (status === 'overdue') {
                badgeClass = 'badge-red';
                badgeText = '⚠️ Atrasada';
            }
            
            // Calcular PV individual para debugging
            const fechaCorte = ajustarDiaHabilAnterior(new Date(2026, 4, 26));
            let pvIndividual = 0;
            if (task.startDate && task.deadline && est > 0) {
                const start = new Date(task.startDate);
                const end = new Date(task.deadline);
                if (fechaCorte >= end) {
                    pvIndividual = est;
                } else if (fechaCorte > start) {
                    const total = contarDiasHabiles(start, end);
                    const trans = contarDiasHabilesTranscurridos(start, fechaCorte);
                    const pct = total > 0 ? trans / total : 0;
                    pvIndividual = est * Math.min(1, pct);
                }
            }
            
            const evIndividual = est * (Math.min(1, logged / est));
            
            const row = `
                <tr>
                    <td>${task.name || 'Sin nombre'}</td>
                    <td><span class="badge ${badgeClass}">${badgeText}</span></td>
                    <td>${est}</td>
                    <td>${logged}</td>
                    <td>${progresoReal}%</td>
                    <td>${task.startDate || '-'}</td>
                    <td>${task.deadline || '-'}</td>
                    <td>${pvIndividual.toFixed(2)}</td>
                    <td>${evIndividual.toFixed(2)}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
        
        // Agregar fila de totales
        const totalEV = calcularEV(tasks);
        const totalPV = calcularPV(tasks, new Date(2026, 4, 26));
        tbody.innerHTML += `
            <tr style="border-top: 2px solid #00F0FF; font-weight: bold;">
                <td><strong>TOTALES</strong></td>
                <td></td>
                <td><strong>${calcularBAC(tasks)}</strong></td>
                <td><strong>${calcularAC(tasks)}</strong></td>
                <td></td>
                <td></td>
                <td></td>
                <td><strong>${totalPV.toFixed(2)}</strong></td>
                <td><strong>${totalEV.toFixed(2)}</strong></td>
            </tr>
        `;
    }
    
    // Actualizar al hacer clic en el botón
    document.getElementById('btnActualizar').addEventListener('click', renderizarReporte);
    
    // Cargar inicial
    renderizarReporte();
</script>
</body>
</html>