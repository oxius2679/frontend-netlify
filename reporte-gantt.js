// ===== REPORTE EJECUTIVO COMPLETO - VERSIÓN FINAL CON MENSAJE DE ESTADO =====
window.generarReporteGanttCompleto = function() {
    console.log('📊 Generando Reporte Ejecutivo Completo...');
    
    const gantt = document.getElementById('premiumExecutiveGantt');
    if (!gantt) {
        alert('❌ Abre el Gantt Ejecutivo primero');
        return;
    }
    
    const projectIndex = parseInt(gantt.dataset.projectIndex) || window.currentProjectIndex || 0;
    const project = window.projects?.[projectIndex];
    
    if (!project) {
        alert('❌ No hay proyecto seleccionado');
        return;
    }
    
    const tasks = project.tasks || [];
    if (tasks.length === 0) {
        alert('⚠️ No hay tareas');
        return;
    }
    
    // ========== CÁLCULOS ==========
    const total = tasks.length;
    const completadas = tasks.filter(t => t.status === 'completed').length;
    const enProgreso = tasks.filter(t => t.status === 'inProgress').length;
    const pendientes = tasks.filter(t => t.status === 'pending').length;
    const atrasadas = tasks.filter(t => t.status === 'overdue' || t.status === 'rezagado').length;
    
    const horasEst = tasks.reduce((s, t) => s + (t.estimatedTime || 0), 0);
    const horasReg = tasks.reduce((s, t) => s + (t.timeLogged || 0), 0);
    const progreso = total > 0 ? Math.round((completadas / total) * 100) : 0;
    
    // EVM
    let BAC = 0, EV = 0, AC = 0;
    tasks.forEach(t => {
        const est = t.estimatedTime || 0;
        BAC += est;
        AC += t.timeLogged || 0;
        
        let avance = 0;
        if (t.status === 'completed') avance = 1;
        else if (t.status === 'inProgress') avance = 0.5;
        else if (t.progress > 0) avance = t.progress / 100;
        EV += est * avance;
    });
    
    const CPI = AC > 0 ? EV / AC : 1;
    const SPI = BAC > 0 ? EV / BAC : 1;
    const EAC = CPI > 0 ? BAC / CPI : BAC;
    const ETC = EAC - AC;
    const VAC = BAC - EAC;
    
    // ========== MENSAJE DE ESTADO DEL PROYECTO ==========
    let estadoIcono = '', estadoTexto = '', estadoColor = '', estadoDescripcion = '';
    
    if (SPI < 0.7 || CPI < 0.7) {
        estadoIcono = '🔴';
        estadoTexto = 'CRÍTICO - REQUIERE ACCIÓN INMEDIATA';
        estadoColor = '#ef4444';
        estadoDescripcion = 'El proyecto presenta graves desviaciones. Se requiere intervención ejecutiva urgente.';
    } else if (SPI < 0.85 || CPI < 0.85) {
        estadoIcono = '🟠';
        estadoTexto = 'ATENCIÓN - RIESGO SIGNIFICATIVO';
        estadoColor = '#f97316';
        estadoDescripcion = 'El proyecto tiene desviaciones moderadas. Se recomienda monitoreo intensivo.';
    } else if (SPI < 0.95 || CPI < 0.95) {
        estadoIcono = '🟡';
        estadoTexto = 'MONITOREO - DESVIACIONES LEVES';
        estadoColor = '#f59e0b';
        estadoDescripcion = 'El proyecto tiene pequeñas desviaciones. Ajustar plan de trabajo.';
    } else if (SPI >= 1.05 && CPI >= 1.05) {
        estadoIcono = '🏆';
        estadoTexto = 'EXCELENTE - SUPERANDO OBJETIVOS';
        estadoColor = '#8b5cf6';
        estadoDescripcion = 'El proyecto está superando las expectativas. Mantener el ritmo.';
    } else {
        estadoIcono = '✅';
        estadoTexto = 'EN CONTROL - PROYECTO SALUDABLE';
        estadoColor = '#10b981';
        estadoDescripcion = 'El proyecto está dentro de los parámetros esperados. Continuar así.';
    }
    
    // ========== RECOMENDACIONES ==========
    const recomendaciones = [];
    if (SPI < 0.9) recomendaciones.push('⏰ Acelerar cronograma: el SPI indica retraso significativo');
    if (CPI < 0.9) recomendaciones.push('💰 Controlar costos: el CPI está por debajo de lo esperado');
    if (atrasadas > 0) recomendaciones.push(`🔥 Atender ${atrasadas} tarea(s) atrasada(s) urgentemente`);
    if (SPI >= 0.95 && CPI >= 0.95 && atrasadas === 0) {
        recomendaciones.push('✅ Mantener el ritmo actual - el proyecto está saludable');
        recomendaciones.push('📊 Continuar con el monitoreo semanal de métricas');
    }
    if (recomendaciones.length === 0) {
        recomendaciones.push('📊 Mantener el plan de trabajo actual');
        recomendaciones.push('🎯 Seguir monitoreando indicadores clave');
    }
    
    // Datos para gráficas
    const distribucionData = [completadas, enProgreso, pendientes, atrasadas];
    const distribucionLabels = ['Completadas', 'En Progreso', 'Pendientes', 'Rezagadas'];
    const distribucionColors = ['#2ecc71', '#008080', '#f1c40f', '#e74c3c'];
    
    const semanas = ['Inicio', 'Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
    const burndownIdeal = [BAC, BAC * 0.75, BAC * 0.5, BAC * 0.25, 0];
    const burndownReal = [BAC, BAC - (EV * 0.25), BAC - (EV * 0.5), BAC - (EV * 0.75), Math.max(0, BAC - EV)];
    
    const saludValores = [
        Math.min(100, CPI * 100),
        Math.min(100, SPI * 100),
        progreso,
        100 - Math.min(30, atrasadas * 5),
        Math.min(100, (completadas / Math.max(1, total)) * 100)
    ];
    const saludLabels = ['Eficiencia Costos', 'Cronograma', 'Progreso', 'Control Atrasos', 'Productividad'];
    
    const fecha = new Date().toLocaleDateString('es-ES', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    const hora = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    
    // Tabla EVM
    const evmTableRows = `
        <tr style="background:#f8fafc;"><td style="padding:12px; border:1px solid #e2e8f0;"><strong>PV (Valor Planificado)</strong></td><td style="padding:12px; border:1px solid #e2e8f0; text-align:right;">${BAC.toFixed(2)} h</td><td style="padding:12px; border:1px solid #e2e8f0;">Trabajo programado hasta la fecha</td></tr>
        <tr style="background:white;"><td style="padding:12px; border:1px solid #e2e8f0;"><strong>EV (Valor Ganado)</strong></td><td style="padding:12px; border:1px solid #e2e8f0; text-align:right;">${EV.toFixed(2)} h</td><td style="padding:12px; border:1px solid #e2e8f0;">Trabajo realmente completado</td></tr>
        <tr style="background:#f8fafc;"><td style="padding:12px; border:1px solid #e2e8f0;"><strong>AC (Costo Real)</strong></td><td style="padding:12px; border:1px solid #e2e8f0; text-align:right;">${AC.toFixed(2)} h</td><td style="padding:12px; border:1px solid #e2e8f0;">Horas realmente registradas</td></tr>
        <tr style="background:white;"><td style="padding:12px; border:1px solid #e2e8f0;"><strong>CPI (Índice Costo)</strong></td><td style="padding:12px; border:1px solid #e2e8f0; text-align:right;">${CPI.toFixed(2)}</td><td style="padding:12px; border:1px solid #e2e8f0;">${CPI >= 1 ? '✅ Eficiente' : '⚠️ Sobrecosto'}</td></tr>
        <tr style="background:#f8fafc;"><td style="padding:12px; border:1px solid #e2e8f0;"><strong>SPI (Índice Tiempo)</strong></td><td style="padding:12px; border:1px solid #e2e8f0; text-align:right;">${SPI.toFixed(2)}</td><td style="padding:12px; border:1px solid #e2e8f0;">${SPI >= 1 ? '✅ Adelantado' : '⚠️ Retrasado'}</td></tr>
        <tr style="background:white;"><td style="padding:12px; border:1px solid #e2e8f0;"><strong>BAC (Presupuesto Total)</strong></td><td style="padding:12px; border:1px solid #e2e8f0; text-align:right;">${BAC.toFixed(2)} h</td><td style="padding:12px; border:1px solid #e2e8f0;">Presupuesto base del proyecto</td></tr>
    `;
    
    // ========== HTML DEL REPORTE ==========
    const html = `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Reporte Ejecutivo - ${project.name}</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: 'Segoe UI', 'Inter', system-ui, sans-serif;
                background: linear-gradient(135deg, #f0f2f5 0%, #e2e8f0 100%);
                padding: 40px;
                min-height: 100vh;
            }
            .container {
                max-width: 1300px;
                margin: 0 auto;
                background: white;
                border-radius: 32px;
                box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
                color: white;
                padding: 40px 50px;
                text-align: center;
            }
            .header h1 { font-size: 36px; font-weight: 700; margin-bottom: 8px; }
            .header p { opacity: 0.85; font-size: 18px; }
            .header-meta {
                display: flex;
                justify-content: center;
                gap: 30px;
                margin-top: 20px;
                font-size: 13px;
                opacity: 0.7;
            }
            /* Mensaje de estado */
            .status-message {
                margin: 30px 50px 0 50px;
                padding: 20px 30px;
                background: ${estadoColor}10;
                border: 2px solid ${estadoColor};
                border-radius: 16px;
                text-align: center;
            }
            .status-message .status-icon { font-size: 40px; margin-bottom: 8px; }
            .status-message .status-title { font-size: 22px; font-weight: 700; color: ${estadoColor}; margin-bottom: 8px; }
            .status-message .status-stats { font-size: 14px; color: #475569; margin-top: 10px; }
            .content { padding: 40px 50px; }
            .section { margin-bottom: 45px; }
            .section-title {
                font-size: 22px;
                font-weight: 700;
                color: #0f172a;
                border-left: 5px solid #8b5cf6;
                padding-left: 20px;
                margin-bottom: 25px;
            }
            /* KPIs - solo 2 centrados */
            .kpi-grid {
                display: flex;
                justify-content: center;
                gap: 40px;
                margin-bottom: 40px;
            }
            .kpi-card {
                background: linear-gradient(145deg, #f8fafc, #f1f5f9);
                border-radius: 20px;
                padding: 25px 40px;
                text-align: center;
                border: 1px solid #e2e8f0;
                min-width: 200px;
            }
            .kpi-value { font-size: 42px; font-weight: 800; color: #0f172a; }
            .kpi-label { color: #64748b; margin-top: 8px; font-size: 14px; font-weight: 500; }
            /* Estado de Tareas */
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 20px;
                margin-bottom: 40px;
            }
            .stat-card {
                background: #f8fafc;
                border-radius: 16px;
                padding: 20px;
                text-align: center;
                border: 1px solid #e2e8f0;
            }
            .stat-number { font-size: 32px; font-weight: 700; }
            .stat-label { color: #64748b; margin-top: 5px; font-size: 13px; }
            .charts-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 30px;
                margin-bottom: 40px;
            }
            .chart-card {
                background: #f8fafc;
                border-radius: 20px;
                padding: 25px;
                border: 1px solid #e2e8f0;
                text-align: center;
            }
            .chart-card h3 { font-size: 18px; font-weight: 600; color: #1e293b; margin-bottom: 20px; }
            .chart-container { display: flex; justify-content: center; align-items: center; min-height: 280px; }
            canvas { max-width: 100%; max-height: 260px; }
            .evm-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }
            .evm-table td {
                padding: 12px;
                border: 1px solid #e2e8f0;
            }
            .data-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 13px;
                border-radius: 16px;
                overflow: hidden;
            }
            .data-table th, .data-table td {
                padding: 14px 12px;
                text-align: left;
                border-bottom: 1px solid #e2e8f0;
            }
            .data-table th { background: #f8fafc; font-weight: 600; }
            .status-badge {
                display: inline-block;
                padding: 4px 12px;
                border-radius: 30px;
                font-size: 11px;
                font-weight: 600;
            }
            .status-completed { background: #2ecc71; color: white; }
            .status-progress { background: #008080; color: white; }
            .status-pending { background: #f1c40f; color: #2c3e50; }
            .status-overdue { background: #e74c3c; color: white; }
            .progress-bar-cell { width: 80px; background: #e2e8f0; border-radius: 20px; height: 6px; overflow: hidden; }
            .progress-fill { height: 100%; background: #8b5cf6; border-radius: 20px; }
            .forecast-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
                margin-bottom: 40px;
            }
            .forecast-card {
                background: linear-gradient(135deg, #f8fafc, #f1f5f9);
                border-radius: 16px;
                padding: 20px;
                text-align: center;
                border: 1px solid #e2e8f0;
            }
            .forecast-value { font-size: 28px; font-weight: 700; }
            .forecast-label { color: #64748b; font-size: 12px; margin-top: 5px; }
            .analysis-card {
                background: linear-gradient(135deg, #f8fafc, #f1f5f9);
                border-radius: 20px;
                padding: 25px;
                border-left: 5px solid #8b5cf6;
                margin-bottom: 30px;
            }
            .recommendations-card {
                background: linear-gradient(135deg, #fef3c7, #fffbeb);
                border-radius: 20px;
                padding: 25px;
                border-left: 5px solid #f59e0b;
            }
            .recommendations-card h3 { color: #92400e; margin-bottom: 15px; }
            .recommendations-card ul { margin-left: 20px; color: #78350f; }
            .recommendations-card li { margin: 8px 0; }
            .footer {
                background: #f8fafc;
                padding: 20px 40px;
                text-align: center;
                color: #64748b;
                font-size: 12px;
                border-top: 1px solid #e2e8f0;
            }
            @media print {
                body { padding: 0; background: white; }
                .no-print { display: none; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- HEADER -->
            <div class="header">
                <h1>📊 REPORTE EJECUTIVO - GANTT</h1>
                <p>${project.name}</p>
                <div class="header-meta">
                    <span>📅 ${fecha}</span>
                    <span>🕒 ${hora}</span>
                </div>
            </div>
            
            <!-- MENSAJE DE ESTADO DEL PROYECTO -->
            <div class="status-message">
                <div class="status-icon">${estadoIcono}</div>
                <div class="status-title">${estadoTexto}</div>
                <div class="status-stats">
                    📊 CPI: ${CPI.toFixed(2)} | ⏰ SPI: ${SPI.toFixed(2)} | 📈 Progreso: ${progreso}% | 📋 Tareas: ${total}
                </div>
                <div style="margin-top: 10px; font-size: 13px; color: #64748b;">${estadoDescripcion}</div>
            </div>
            
            <div class="content">
                <!-- KPIS PRINCIPALES (SOLO 2 CENTRADOS) -->
                <div class="kpi-grid">
                    <div class="kpi-card"><div class="kpi-value">${total}</div><div class="kpi-label">TOTAL TAREAS</div></div>
                    <div class="kpi-card"><div class="kpi-value">${progreso}%</div><div class="kpi-label">PROGRESO GENERAL</div></div>
                </div>
                
                <!-- Estado de Tareas -->
                <div class="stats-grid">
                    <div class="stat-card"><div class="stat-number" style="color: #2ecc71;">${completadas}</div><div class="stat-label">✅ Completadas</div></div>
                    <div class="stat-card"><div class="stat-number" style="color: #008080;">${enProgreso}</div><div class="stat-label">🔄 En Progreso</div></div>
                    <div class="stat-card"><div class="stat-number" style="color: #f1c40f;">${pendientes}</div><div class="stat-label">⏳ Pendientes</div></div>
                    <div class="stat-card"><div class="stat-number" style="color: #e74c3c;">${atrasadas}</div><div class="stat-label">⚠️ Rezagadas</div></div>
                </div>
                
                <!-- GRÁFICA DISTRIBUCIÓN + RADAR -->
                <div class="charts-row">
                    <div class="chart-card">
                        <h3>🍩 Distribución de Tareas</h3>
                        <div class="chart-container"><canvas id="distribucionChart" width="300" height="300"></canvas></div>
                    </div>
                    <div class="chart-card">
                        <h3>🕸️ Salud del Proyecto (Radar)</h3>
                        <div class="chart-container"><canvas id="radarChart" width="300" height="300"></canvas></div>
                    </div>
                </div>
                
                <!-- TABLA EVM COMPLETA -->
                <div class="section">
                    <h2 class="section-title">💰 TABLA DE VALOR GANADO (EVM)</h2>
                    <table class="evm-table">
                        <thead><tr style="background:#e2e8f0;"><th style="padding:12px; text-align:left;">Indicador</th><th style="padding:12px; text-align:center;">Valor</th><th style="padding:12px; text-align:left;">Interpretación</th></tr></thead>
                        <tbody>${evmTableRows}</tbody>
                    </table>
                </div>
                
                <!-- GRÁFICAS EVM + BURNDOWN -->
                <div class="charts-row">
                    <div class="chart-card">
                        <h3>📊 Gráfico EVM (Barras)</h3>
                        <div class="chart-container"><canvas id="evmChart" width="400" height="250"></canvas></div>
                    </div>
                    <div class="chart-card">
                        <h3>📉 Gráfico Burndown (Línea)</h3>
                        <div class="chart-container"><canvas id="burndownChart" width="400" height="250"></canvas></div>
                    </div>
                </div>
                
                <!-- PRONÓSTICOS -->
                <div class="section">
                    <h2 class="section-title">🔮 PRONÓSTICOS DEL PROYECTO</h2>
                    <div class="forecast-grid">
                        <div class="forecast-card"><div class="forecast-value" style="color: #3b82f6;">${EAC.toFixed(0)}h</div><div class="forecast-label">EAC (Estimado al Finalizar)</div></div>
                        <div class="forecast-card"><div class="forecast-value" style="color: #f59e0b;">${ETC.toFixed(0)}h</div><div class="forecast-label">ETC (Estimado para Completar)</div></div>
                        <div class="forecast-card"><div class="forecast-value" style="color: ${VAC >= 0 ? '#2ecc71' : '#e74c3c'};">${VAC >= 0 ? '+' : ''}${VAC.toFixed(0)}h</div><div class="forecast-label">VAC (Variación al Finalizar)</div></div>
                    </div>
                </div>
                
                <!-- TABLA DE TAREAS -->
                <div class="section">
                    <h2 class="section-title">📋 DETALLE DE TAREAS <span style="font-size: 14px; color: #64748b;">(${total} tareas)</span></h2>
                    <div style="overflow-x: auto; border-radius: 16px; border: 1px solid #e2e8f0;">
                        <table class="data-table">
                            <thead><tr><th>#</th><th>Tarea</th><th>Estado</th><th>Estimado (h)</th><th>Registrado (h)</th><th>Progreso</th></tr></thead>
                            <tbody>
                                ${tasks.map((t, i) => {
                                    let statusClass = '', statusText = '';
                                    if (t.status === 'completed') { statusClass = 'completed'; statusText = 'Completada'; }
                                    else if (t.status === 'inProgress') { statusClass = 'progress'; statusText = 'En Progreso'; }
                                    else if (t.status === 'overdue' || t.status === 'rezagado') { statusClass = 'overdue'; statusText = 'Rezagada'; }
                                    else { statusClass = 'pending'; statusText = 'Pendiente'; }
                                    return `
                                    <tr>
                                        <td><strong>${i+1}</strong></td>
                                        <td><strong>${t.name || 'Sin título'}</strong></td>
                                        <td><span class="status-badge status-${statusClass}">${statusText}</span></td>
                                        <td>${(t.estimatedTime || 0).toFixed(1)}</td>
                                        <td>${(t.timeLogged || 0).toFixed(1)}</td>
                                        <td><div style="display:flex; align-items:center; gap:8px;"><div class="progress-bar-cell"><div class="progress-fill" style="width: ${t.progress || 0}%"></div></div><span>${t.progress || 0}%</span></div></td>
                                    </tr>`;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- ANÁLISIS EJECUTIVO -->
                <div class="analysis-card">
                    <h3 style="margin-bottom: 15px;">📌 Análisis Ejecutivo</h3>
                    <p>📊 <strong>CPI:</strong> ${CPI.toFixed(2)} - ${CPI >= 0.95 ? 'Costos ajustados ✅' : CPI >= 0.9 ? 'Ligero sobrecosto ⚠️' : 'Sobrecosto significativo 🔴'}</p>
                    <p>⏰ <strong>SPI:</strong> ${SPI.toFixed(2)} - ${SPI >= 0.95 ? 'Cronograma en tiempo ✅' : SPI >= 0.85 ? 'Retraso moderado ⚠️' : 'Retraso significativo 🔴'}</p>
                    <p>📋 <strong>Distribución:</strong> ${completadas} completadas, ${enProgreso} en progreso, ${pendientes} pendientes, ${atrasadas} rezagadas</p>
                    <p>💰 <strong>VAC:</strong> ${VAC >= 0 ? 'Ahorro de' : 'Sobrecosto de'} ${Math.abs(VAC).toFixed(0)}h</p>
                </div>
                
                <!-- RECOMENDACIONES -->
                <div class="recommendations-card">
                    <h3>💡 RECOMENDACIONES</h3>
                    <ul>
                        ${recomendaciones.map(r => `<li>${r}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="footer">
                <p>Reporte generado automáticamente por PM Virtual Executive</p>
                <p>© ${new Date().getFullYear()} - Todos los derechos reservados</p>
            </div>
        </div>
        
        <div class="no-print" style="text-align: center; margin-top: 20px;">
            <button onclick="window.print()" style="background: #8b5cf6; color: white; border: none; padding: 12px 30px; border-radius: 40px; cursor: pointer; font-weight: bold; margin-right: 10px;">🖨️ IMPRIMIR REPORTE</button>
            <button onclick="window.close()" style="background: #64748b; color: white; border: none; padding: 12px 30px; border-radius: 40px; cursor: pointer; font-weight: bold;">✕ CERRAR</button>
        </div>
        
        <script>
            new Chart(document.getElementById('distribucionChart'), {
                type: 'doughnut',
                data: { labels: ${JSON.stringify(distribucionLabels)}, datasets: [{ data: ${JSON.stringify(distribucionData)}, backgroundColor: ${JSON.stringify(distribucionColors)}, borderWidth: 0, cutout: '65%' }] },
                options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } } }
            });
            new Chart(document.getElementById('radarChart'), {
                type: 'radar',
                data: { labels: ${JSON.stringify(saludLabels)}, datasets: [{ label: 'Puntuación', data: ${JSON.stringify(saludValores)}, backgroundColor: 'rgba(139,92,246,0.2)', borderColor: '#8b5cf6', borderWidth: 2, pointBackgroundColor: '#8b5cf6', pointBorderColor: '#fff' }] },
                options: { responsive: true, maintainAspectRatio: true, scales: { r: { beginAtZero: true, max: 100, ticks: { stepSize: 20 } } }, plugins: { legend: { display: false } } }
            });
            new Chart(document.getElementById('evmChart'), {
                type: 'bar',
                data: { labels: ['PV', 'EV', 'AC'], datasets: [{ label: 'Horas', data: [${BAC}, ${EV}, ${AC}], backgroundColor: ['#3b82f6', '#2ecc71', '#e74c3c'], borderRadius: 10, barPercentage: 0.6 }] },
                options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { callback: v => v + 'h' } } } }
            });
            new Chart(document.getElementById('burndownChart'), {
                type: 'line',
                data: { labels: ${JSON.stringify(semanas)}, datasets: [
                    { label: 'Línea Ideal', data: ${JSON.stringify(burndownIdeal)}, borderColor: '#3b82f6', borderWidth: 2, borderDash: [8, 4], fill: false, pointRadius: 0 },
                    { label: 'Progreso Real', data: ${JSON.stringify(burndownReal)}, borderColor: '#e74c3c', borderWidth: 3, fill: false, pointRadius: 4, pointBackgroundColor: '#e74c3c', pointBorderColor: '#fff' }
                ] },
                options: { responsive: true, maintainAspectRatio: true, scales: { y: { beginAtZero: true, ticks: { callback: v => v + 'h' } } } }
            });
        <\/script>
    </body>
    </html>`;
    
    const ventana = window.open('', '_blank');
    if (!ventana) {
        alert('❌ Permite ventanas emergentes');
        return;
    }
    
    ventana.document.write(html);
    ventana.document.close();
    console.log('✅ Reporte Ejecutivo Generado');
};

// Conectar el botón del Gantt
const gantt = document.getElementById('premiumExecutiveGantt');
if (gantt) {
    const botones = gantt.querySelectorAll('button');
    for (let btn of botones) {
        if (btn.textContent.includes('Reporte') && btn.textContent.includes('Ejecutivo')) {
            btn.onclick = function(e) {
                e.preventDefault();
                window.generarReporteGanttCompleto();
            };
            console.log('✅ Botón Reporte Ejecutivo conectado');
            break;
        }
    }
}

// Reconectar el botón existente cuando el Gantt cargue
setInterval(function() {
    const gantt = document.getElementById('premiumExecutiveGantt');
    if (gantt) {
        const botones = gantt.querySelectorAll('button');
        for (let btn of botones) {
            if (btn.textContent.includes('Reporte') && btn.textContent.includes('Ejecutivo')) {
                if (!btn.dataset.reporteFijo) {
                    btn.dataset.reporteFijo = 'true';
                    btn.onclick = function(e) {
                        e.preventDefault();
                        window.generarReporteGanttCompleto();
                    };
                    console.log('✅ Botón Reporte Ejecutivo fijado permanentemente');
                }
            }
        }
    }
}, 1000);