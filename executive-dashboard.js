/**
 * 🚀 Executive Dashboard 4D
 * Se alimenta de los datos reales de tu sistema (window.projects, window.currentProjectIndex)
 * Inyecta una vista premium con Kanban, EVM, Burndown, Gantt y Recursos Humanos.
 * 
 * CÓMO USARLO:
 * 1. Agrega esta línea en tu index.html DESPUÉS de script.js:
 *    <script src="executive-dashboard.js"></script>
 * 
 * 2. En tu menú lateral, agrega un botón que llame a:
 *    window.mostrarDashboardEjecutivo()
 * 
 * 3. O simplemente llama a esa función desde consola para probarlo.
 */

(function() {
    'use strict';

    // ============================================================
    // 1. CONFIGURACIÓN
    // ============================================================
    const DASHBOARD_ID = 'executiveDashboard4D';
    const CHART_CDN = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';

    // ============================================================
    // 2. CARGA DE CHART.JS (si no está ya cargado)
    // ============================================================
    let chartJsLoaded = false;

    function loadChartJs(callback) {
        if (typeof Chart !== 'undefined') {
            chartJsLoaded = true;
            callback();
            return;
        }
        const script = document.createElement('script');
        script.src = CHART_CDN;
        script.onload = function() {
            chartJsLoaded = true;
            callback();
        };
        script.onerror = function() {
            console.error('❌ No se pudo cargar Chart.js');
            callback(); // igualmente intentamos renderizar sin gráficos
        };
        document.head.appendChild(script);
    }

    // ============================================================
    // 3. FUNCIONES DE ACCESO A DATOS (usando tu sistema)
    // ============================================================
    function obtenerProyectoActual() {
        if (typeof window.projects !== 'undefined' && Array.isArray(window.projects) &&
            typeof window.currentProjectIndex !== 'undefined') {
            return window.projects[window.currentProjectIndex] || null;
        }
        // fallback: leer localStorage
        try {
            const stored = localStorage.getItem('projects');
            if (stored) {
                const parsed = JSON.parse(stored);
                const idx = parseInt(localStorage.getItem('currentProjectIndex') || '0');
                return parsed[idx] || null;
            }
        } catch (e) { /* ignore */ }
        return null;
    }

    function obtenerTareas() {
        const proj = obtenerProyectoActual();
        return proj?.tasks || [];
    }

    function getStats(tasks) {
        if (!tasks) tasks = [];
        return {
            total: tasks.length,
            pending: tasks.filter(t => (t.status || 'pending') === 'pending').length,
            inProgress: tasks.filter(t => (t.status || '') === 'inProgress').length,
            completed: tasks.filter(t => (t.status || '') === 'completed').length,
            overdue: tasks.filter(t => (t.status || '') === 'overdue' ||
                (t.deadline && new Date(t.deadline) < new Date() && (t.status || '') !== 'completed')).length
        };
    }

    function getEVMMetrics(tasks) {
        if (!tasks || tasks.length === 0) return null;
        let bac = 0,
            ev = 0,
            ac = 0;
        tasks.forEach(t => {
            const est = Number(t.estimatedTime) || 0;
            const log = Number(t.timeLogged) || 0;
            bac += est;
            ac += log;
            const status = (t.status || 'pending');
            let progress = 0;
            if (status === 'completed') progress = 1;
            else if (status === 'inProgress' || status === 'overdue') {
                progress = est > 0 ? Math.min(1, log / est) : 0.5;
            }
            ev += est * progress;
        });
        const pv = bac; // asumimos PV = BAC (puedes ajustar si tienes fechas)
        const spi = pv > 0 ? ev / pv : 1;
        const cpi = ac > 0 ? ev / ac : 1;
        const eac = cpi > 0 ? bac / cpi : bac;
        const vac = bac - eac;
        return { bac, pv, ev, ac, spi, cpi, eac, vac };
    }

    function getBurndownData(tasks) {
        if (!tasks || tasks.length === 0) return null;
        const total = tasks.reduce((s, t) => s + (t.estimatedTime || 0), 0);
        if (total === 0) return null;
        const logged = tasks.reduce((s, t) => s + (t.timeLogged || 0), 0);
        const remaining = Math.max(0, total - logged);
        return {
            total,
            logged,
            remaining,
            ideal: [total, total * 0.75, total * 0.5, total * 0.25, 0],
            actual: [total, total - logged * 0.25, total - logged * 0.5, total - logged * 0.75, remaining]
        };
    }

    // ============================================================
    // 4. RENDERIZADO DEL DASHBOARD
    // ============================================================
    let dashCharts = {};

    function renderizarDashboard() {
        // --- 4a. Obtener contenedor ---
        let container = document.getElementById(DASHBOARD_ID);
        if (!container) {
            container = document.createElement('div');
            container.id = DASHBOARD_ID;
            container.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(8, 12, 26, 0.98);
                backdrop-filter: blur(20px);
                z-index: 999999;
                overflow-y: auto;
                padding: 24px 32px 40px;
                font-family: 'Inter', -apple-system, sans-serif;
                color: #f1f5f9;
                display: none;
                box-sizing: border-box;
            `;
            document.body.appendChild(container);
        }

        // Si el dashboard ya está visible, lo cerramos y salimos (toggle)
        if (container.style.display === 'block') {
            container.style.display = 'none';
            // liberar gráficos
            Object.values(dashCharts).forEach(ch => { if (ch) { try { ch.destroy(); } catch (e) {} } });
            dashCharts = {};
            return;
        }

        container.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // --- 4b. Obtener datos reales ---
        const project = obtenerProyectoActual();
        const tasks = obtenerTareas();
        const stats = getStats(tasks);
        const evm = getEVMMetrics(tasks);
        const burndown = getBurndownData(tasks);

        // --- 4c. Construir HTML ---
        container.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:16px;">
                <div>
                    <h1 style="font-size:28px;font-weight:700;margin:0;background:linear-gradient(135deg,#fff 40%,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
                        🚀 Executive Dashboard 4D
                    </h1>
                    <p style="margin:4px 0 0;color:#94a3b8;font-size:14px;">
                        ${project ? project.name : 'Sin proyecto seleccionado'} · 
                        ${tasks.length} tareas · Actualizado: ${new Date().toLocaleTimeString()}
                    </p>
                </div>
                <button id="cerrarDashboardEjecutivo" style="background:rgba(239,68,68,0.2);border:1px solid #ef4444;color:#ef4444;padding:10px 20px;border-radius:8px;cursor:pointer;font-weight:600;">
                    ✕ Cerrar
                </button>
            </div>

            <!-- KPIs -->
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px;">
                <div style="background:rgba(30,41,59,0.6);border-radius:12px;padding:16px 20px;border:1px solid rgba(255,255,255,0.06);">
                    <div style="color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">Total Tareas</div>
                    <div style="font-size:32px;font-weight:800;margin-top:4px;">${stats.total}</div>
                </div>
                <div style="background:rgba(30,41,59,0.6);border-radius:12px;padding:16px 20px;border:1px solid rgba(16,185,129,0.2);">
                    <div style="color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">Completadas</div>
                    <div style="font-size:32px;font-weight:800;margin-top:4px;color:#10b981;">${stats.completed}</div>
                </div>
                <div style="background:rgba(30,41,59,0.6);border-radius:12px;padding:16px 20px;border:1px solid rgba(245,158,11,0.2);">
                    <div style="color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">En Progreso</div>
                    <div style="font-size:32px;font-weight:800;margin-top:4px;color:#f59e0b;">${stats.inProgress}</div>
                </div>
                <div style="background:rgba(30,41,59,0.6);border-radius:12px;padding:16px 20px;border:1px solid rgba(239,68,68,0.2);">
                    <div style="color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">Rezagadas</div>
                    <div style="font-size:32px;font-weight:800;margin-top:4px;color:#ef4444;">${stats.overdue}</div>
                </div>
            </div>

            <!-- Gráficos principales -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:28px;">
                <div style="background:rgba(30,41,59,0.6);border-radius:16px;padding:20px;border:1px solid rgba(255,255,255,0.06);">
                    <div style="color:#94a3b8;font-size:12px;font-weight:600;margin-bottom:12px;">📊 Distribución de Tareas</div>
                    <div style="height:220px;"><canvas id="dashDistChart"></canvas></div>
                </div>
                <div style="background:rgba(30,41,59,0.6);border-radius:16px;padding:20px;border:1px solid rgba(255,255,255,0.06);">
                    <div style="color:#94a3b8;font-size:12px;font-weight:600;margin-bottom:12px;">📈 Valor Ganado (EVM)</div>
                    <div style="height:220px;"><canvas id="dashEVMChart"></canvas></div>
                </div>
            </div>

            <!-- Burndown + Métricas EVM -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:28px;">
                <div style="background:rgba(30,41,59,0.6);border-radius:16px;padding:20px;border:1px solid rgba(255,255,255,0.06);">
                    <div style="color:#94a3b8;font-size:12px;font-weight:600;margin-bottom:12px;">📉 Burndown (horas)</div>
                    <div style="height:200px;"><canvas id="dashBurndownChart"></canvas></div>
                </div>
                <div style="background:rgba(30,41,59,0.6);border-radius:16px;padding:20px;border:1px solid rgba(255,255,255,0.06);">
                    <div style="color:#94a3b8;font-size:12px;font-weight:600;margin-bottom:12px;">🎯 Métricas EVM</div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                        ${evm ? `
                            <div><span style="color:#94a3b8;">BAC</span> <strong>${evm.bac.toFixed(1)}h</strong></div>
                            <div><span style="color:#94a3b8;">PV</span> <strong>${evm.pv.toFixed(1)}h</strong></div>
                            <div><span style="color:#94a3b8;">EV</span> <strong style="color:${evm.ev >= evm.pv ? '#10b981' : '#f59e0b'}">${evm.ev.toFixed(1)}h</strong></div>
                            <div><span style="color:#94a3b8;">AC</span> <strong style="color:${evm.ac <= evm.ev ? '#10b981' : '#ef4444'}">${evm.ac.toFixed(1)}h</strong></div>
                            <div><span style="color:#94a3b8;">SPI</span> <strong style="color:${evm.spi >= 1 ? '#10b981' : '#f59e0b'}">${evm.spi.toFixed(2)}</strong></div>
                            <div><span style="color:#94a3b8;">CPI</span> <strong style="color:${evm.cpi >= 1 ? '#10b981' : '#f59e0b'}">${evm.cpi.toFixed(2)}</strong></div>
                            <div><span style="color:#94a3b8;">EAC</span> <strong>${evm.eac.toFixed(1)}h</strong></div>
                            <div><span style="color:#94a3b8;">VAC</span> <strong style="color:${evm.vac >= 0 ? '#10b981' : '#ef4444'}">${evm.vac >= 0 ? '+' : ''}${evm.vac.toFixed(1)}h</strong></div>
                        ` : '<div style="grid-column:span 2;text-align:center;color:#94a3b8;">Sin datos EVM</div>'}
                    </div>
                    <div style="margin-top:16px;padding:12px;background:rgba(255,255,255,0.04);border-radius:8px;font-size:13px;color:${evm && evm.spi >= 0.95 && evm.cpi >= 0.95 ? '#10b981' : evm && evm.spi >= 0.8 && evm.cpi >= 0.8 ? '#f59e0b' : '#ef4444'};">
                        ${evm ? (evm.spi >= 0.95 && evm.cpi >= 0.95 ? '✅ Proyecto saludable' : evm.spi >= 0.8 && evm.cpi >= 0.8 ? '⚠️ Monitorizar desviaciones' : '🔴 Requiere acción inmediata') : 'No hay datos suficientes'}
                    </div>
                </div>
            </div>

            <!-- Kanban resumido -->
            <div style="background:rgba(30,41,59,0.6);border-radius:16px;padding:20px;border:1px solid rgba(255,255,255,0.06);margin-bottom:28px;">
                <div style="color:#94a3b8;font-size:12px;font-weight:600;margin-bottom:16px;">📋 Tablero Kanban (últimas 10 tareas)</div>
                <div id="dashKanbanContainer" style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;max-height:300px;overflow-y:auto;">
                    ${renderKanbanMini(tasks)}
                </div>
            </div>

            <!-- Recursos Humanos -->
            <div style="background:rgba(30,41,59,0.6);border-radius:16px;padding:20px;border:1px solid rgba(255,255,255,0.06);">
                <div style="color:#94a3b8;font-size:12px;font-weight:600;margin-bottom:16px;">👥 Recursos Humanos</div>
                <div id="dashHRContainer" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px;">
                    ${renderHR(tasks)}
                </div>
            </div>
        `;

        // --- 4d. Conectar eventos ---
        document.getElementById('cerrarDashboardEjecutivo').addEventListener('click', function() {
            container.style.display = 'none';
            document.body.style.overflow = 'auto';
            Object.values(dashCharts).forEach(ch => { if (ch) { try { ch.destroy(); } catch (e) {} } });
            dashCharts = {};
        });

        // Cerrar con ESC
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape' && container.style.display === 'block') {
                container.style.display = 'none';
                document.body.style.overflow = 'auto';
                Object.values(dashCharts).forEach(ch => { if (ch) { try { ch.destroy(); } catch (e) {} } });
                dashCharts = {};
                document.removeEventListener('keydown', escHandler);
            }
        });

        // --- 4e. Renderizar gráficos (con Chart.js) ---
        loadChartJs(function() {
            if (!chartJsLoaded) {
                console.warn('⚠️ Chart.js no disponible, los gráficos no se mostrarán');
                return;
            }
            setTimeout(() => {
                renderizarGraficos(tasks, stats, evm, burndown);
            }, 100);
        });
    }

    // ============================================================
    // 5. FUNCIONES DE RENDERIZADO DE COMPONENTES
    // ============================================================

    function renderKanbanMini(tasks) {
        const statuses = [
            { key: 'pending', label: 'Pendientes', color: '#f59e0b' },
            { key: 'inProgress', label: 'En Progreso', color: '#3b82f6' },
            { key: 'completed', label: 'Completadas', color: '#10b981' },
            { key: 'overdue', label: 'Rezagadas', color: '#ef4444' }
        ];
        return statuses.map(s => {
            const filtered = tasks.filter(t => (t.status || 'pending') === s.key);
            return `
                <div style="background:rgba(0,0,0,0.2);border-radius:10px;padding:12px;">
                    <div style="display:flex;justify-content:space-between;color:#94a3b8;font-size:12px;margin-bottom:8px;">
                        <span>${s.label}</span>
                        <span style="color:${s.color};font-weight:700;">${filtered.length}</span>
                    </div>
                    <div style="display:flex;flex-direction:column;gap:6px;">
                        ${filtered.slice(0, 5).map(t => `
                            <div style="background:rgba(255,255,255,0.04);padding:6px 10px;border-radius:6px;font-size:12px;display:flex;justify-content:space-between;">
                                <span>${t.name || 'Sin nombre'}</span>
                                <span style="color:#94a3b8;">${t.assignee || '—'}</span>
                            </div>
                        `).join('')}
                        ${filtered.length > 5 ? `<div style="color:#64748b;font-size:11px;text-align:center;">+${filtered.length - 5} más</div>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    function renderHR(tasks) {
        const assignees = {};
        tasks.forEach(t => {
            const a = t.assignee || 'Sin asignar';
            if (!assignees[a]) assignees[a] = { tasks: 0, completed: 0, hours: 0 };
            assignees[a].tasks++;
            if (t.status === 'completed') assignees[a].completed++;
            assignees[a].hours += (t.timeLogged || 0);
        });
        const entries = Object.entries(assignees);
        if (entries.length === 0) {
            return '<div style="grid-column:1/-1;text-align:center;color:#94a3b8;padding:20px;">No hay miembros asignados</div>';
        }
        return entries.map(([name, data]) => {
            const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
            const efficiency = data.tasks > 0 ? Math.round((data.completed / data.tasks) * 100) : 0;
            return `
                <div style="background:rgba(0,0,0,0.2);border-radius:10px;padding:14px;text-align:center;">
                    <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#06b6d4);margin:0 auto 8px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;">${initials}</div>
                    <div style="font-weight:600;font-size:14px;">${name}</div>
                    <div style="color:#94a3b8;font-size:11px;">${data.tasks} tareas · ${data.hours.toFixed(1)}h</div>
                    <div style="margin-top:6px;display:flex;justify-content:center;gap:12px;font-size:11px;">
                        <span>✅ ${data.completed}</span>
                        <span style="color:${efficiency >= 80 ? '#10b981' : efficiency >= 50 ? '#f59e0b' : '#ef4444'};">${efficiency}%</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    // ============================================================
    // 6. GRÁFICOS CON CHART.JS
    // ============================================================

    function renderizarGraficos(tasks, stats, evm, burndown) {
        // --- Distribución ---
        const distCanvas = document.getElementById('dashDistChart');
        if (distCanvas) {
            if (dashCharts.dist) { dashCharts.dist.destroy(); }
            const data = [stats.pending, stats.inProgress, stats.completed, stats.overdue];
            if (data.every(v => v === 0)) {
                dashCharts.dist = new Chart(distCanvas, {
                    type: 'doughnut',
                    data: { labels: ['Sin datos'], datasets: [{ data: [1], backgroundColor: ['#334155'] }] },
                    options: { plugins: { legend: { labels: { color: '#94a3b8' } } }, cutout: '70%' }
                });
            } else {
                dashCharts.dist = new Chart(distCanvas, {
                    type: 'doughnut',
                    data: {
                        labels: ['Pendientes', 'En Progreso', 'Completadas', 'Rezagadas'],
                        datasets: [{ data: data, backgroundColor: ['#f59e0b', '#3b82f6', '#10b981', '#ef4444'],
                            borderWidth: 0 }]
                    },
                    options: { responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: {
                                position: 'bottom', labels: { color: '#94a3b8', font: { size: 11 } } } } }
                });
            }
        }

        // --- EVM ---
        const evmCanvas = document.getElementById('dashEVMChart');
        if (evmCanvas) {
            if (dashCharts.evm) { dashCharts.evm.destroy(); }
            if (!evm || evm.bac === 0) {
                dashCharts.evm = new Chart(evmCanvas, {
                    type: 'bar',
                    data: { labels: ['PV', 'EV', 'AC'], datasets: [{ data: [0, 0, 0],
                            backgroundColor: ['#3b82f6', '#10b981', '#ef4444'] }] },
                    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
                        scales: { y: { beginAtZero: true, ticks: { color: '#94a3b8' } },
                        x: { ticks: { color: '#94a3b8' } } } }
                });
            } else {
                dashCharts.evm = new Chart(evmCanvas, {
                    type: 'bar',
                    data: {
                        labels: ['PV', 'EV', 'AC'],
                        datasets: [{ data: [evm.pv || 0, evm.ev || 0, evm.ac || 0],
                            backgroundColor: ['#3b82f6', '#10b981', '#ef4444'], borderRadius: 6 }]
                    },
                    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false },
                            tooltip: { callbacks: { label: (ctx) => `${ctx.raw.toFixed(1)}h` } } },
                        scales: { y: { beginAtZero: true, ticks: { color: '#94a3b8' } },
                        x: { ticks: { color: '#94a3b8' } } } }
                });
            }
        }

        // --- Burndown ---
        const burnCanvas = document.getElementById('dashBurndownChart');
        if (burnCanvas) {
            if (dashCharts.burndown) { dashCharts.burndown.destroy(); }
            if (!burndown || burndown.total === 0) {
                dashCharts.burndown = new Chart(burnCanvas, {
                    type: 'line',
                    data: { labels: ['Inicio', 'Sem 1', 'Sem 2', 'Sem 3', 'Fin'],
                    datasets: [{ label: 'Ideal', data: [0, 0, 0, 0, 0], borderColor: '#3b82f6',
                            borderDash: [5, 5] }, { label: 'Real', data: [0, 0, 0, 0, 0],
                            borderColor: '#f59e0b' }] },
                    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: (
                                    '#94a3b8') } } },
                        scales: { y: { beginAtZero: true, ticks: { color: '#94a3b8' } },
                        x: { ticks: { color: '#94a3b8' } } } }
                });
            } else {
                dashCharts.burndown = new Chart(burnCanvas, {
                    type: 'line',
                    data: {
                        labels: ['Inicio', 'Sem 1', 'Sem 2', 'Sem 3', 'Fin'],
                        datasets: [
                            { label: 'Ideal', data: burndown.ideal, borderColor: '#3b82f6', borderDash: [5, 5],
                                pointRadius: 0, tension: 0.2 },
                            { label: 'Real', data: burndown.actual, borderColor: '#f59e0b',
                                backgroundColor: 'rgba(245,158,11,0.05)', fill: true, tension: 0.2,
                                pointRadius: 4 }
                        ]
                    },
                    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: (
                                    '#94a3b8') } } },
                        scales: { y: { beginAtZero: true, ticks: { color: '#94a3b8' } },
                        x: { ticks: { color: '#94a3b8' } } } }
                });
            }
        }
    }

    // ============================================================
    // 7. EXPONER FUNCIÓN GLOBAL
    // ============================================================

    window.mostrarDashboardEjecutivo = function() {
        renderizarDashboard();
    };

    console.log('✅ Executive Dashboard 4D cargado. Usa window.mostrarDashboardEjecutivo() para abrirlo.');

})();