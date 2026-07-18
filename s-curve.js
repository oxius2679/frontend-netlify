// ============================================
// 📈 CURVA S - MÓDULO EJECUTIVO (VERSIÓN CORREGIDA)
// ============================================

(function(global) {
    'use strict';

    // ============================================
    // 1. CONFIGURACIÓN E IDIOMA (dinámico)
    // ============================================
    function getLang() {
        return localStorage.getItem('preferredLanguage') || 'es';
    }

    const translations = {
        es: {
            title: '📈 Curva S del Proyecto',
            subtitle: 'Análisis de Avance Planificado vs Real',
            planned: 'Planificado',
            actual: 'Real',
            week: 'Semana',
            month: 'Mes',
            noData: 'No hay datos suficientes para generar la curva S.',
            noTasks: 'El proyecto no tiene tareas con fechas y horas estimadas.',
            progressLabel: 'Avance Acumulado (%)',
            weekLabel: 'Semanas',
            monthLabel: 'Meses',
            exportBtn: '📥 Exportar Gráfico',
            closeBtn: '✕ Cerrar',
            totalHoursPlanned: 'Horas Planificadas',
            totalHoursActual: 'Horas Reales',
            deviation: 'Desviación',
            ahead: 'Adelantado',
            behind: 'Retrasado',
            onTrack: 'En línea'
        },
        en: {
            title: '📈 Project S-Curve',
            subtitle: 'Planned vs Actual Progress Analysis',
            planned: 'Planned',
            actual: 'Actual',
            week: 'Week',
            month: 'Month',
            noData: 'Not enough data to generate S-Curve.',
            noTasks: 'Project has no tasks with dates and estimated hours.',
            progressLabel: 'Cumulative Progress (%)',
            weekLabel: 'Weeks',
            monthLabel: 'Months',
            exportBtn: '📥 Export Chart',
            closeBtn: '✕ Close',
            totalHoursPlanned: 'Planned Hours',
            totalHoursActual: 'Actual Hours',
            deviation: 'Deviation',
            ahead: 'Ahead',
            behind: 'Behind',
            onTrack: 'On Track'
        }
    };

    function t(key) {
        const lang = getLang();
        return translations[lang]?.[key] || translations.es[key] || key;
    }

    // ============================================
    // 2. FUNCIÓN DE CÁLCULO DE CURVA S (sin cambios)
    // ============================================
    function calculateSCurve(tasks) {
        if (!tasks || tasks.length === 0) return null;

        const dates = [];
        tasks.forEach(task => {
            if (task.startDate) dates.push(new Date(task.startDate));
            if (task.deadline) dates.push(new Date(task.deadline));
        });
        if (dates.length === 0) return null;

        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));
        minDate.setHours(0, 0, 0, 0);
        maxDate.setHours(0, 0, 0, 0);

        const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24));
        const numPoints = Math.min(Math.max(totalDays, 4), 52);
        const step = Math.max(1, Math.floor(totalDays / (numPoints - 1)));

        const timePoints = [];
        let current = new Date(minDate);
        while (current <= maxDate) {
            timePoints.push(new Date(current));
            current.setDate(current.getDate() + step);
        }
        if (timePoints[timePoints.length - 1] < maxDate) {
            timePoints.push(new Date(maxDate));
        }

        const totalPlanned = tasks.reduce((sum, t) => sum + (Number(t.estimatedTime) || 0), 0);
        const totalActual = tasks.reduce((sum, t) => sum + (Number(t.timeLogged) || 0), 0);

        const plannedCurve = timePoints.map(date => {
            let planned = 0;
            tasks.forEach(task => {
                if (!task.startDate || !task.deadline) return;
                const start = new Date(task.startDate);
                const end = new Date(task.deadline);
                const estimated = Number(task.estimatedTime) || 0;
                if (estimated === 0) return;
                if (date >= start && date <= end) {
                    const totalDuration = (end - start) / (1000 * 60 * 60 * 24);
                    const elapsed = (date - start) / (1000 * 60 * 60 * 24);
                    const progress = totalDuration > 0 ? Math.min(1, elapsed / totalDuration) : 1;
                    planned += estimated * progress;
                } else if (date > end) {
                    planned += estimated;
                }
            });
            return planned;
        });

        const actualCurve = timePoints.map(date => {
            let actual = 0;
            tasks.forEach(task => {
                const estimated = Number(task.estimatedTime) || 0;
                if (estimated === 0) return;
                if (task.status === 'completed') {
                    actual += estimated;
                    return;
                }
                if (task.deadline) {
                    const end = new Date(task.deadline);
                    if (date > end && task.status !== 'pending') {
                        actual += estimated;
                        return;
                    }
                }
                let progress = 0;
                if (task.progress !== undefined && task.progress !== null) {
                    progress = Math.min(1, Number(task.progress) / 100);
                } else if (task.timeLogged && task.estimatedTime) {
                    progress = Math.min(1, Number(task.timeLogged) / estimated);
                } else if (task.status === 'inProgress') {
                    progress = 0.5;
                }
                actual += estimated * progress;
            });
            return actual;
        });

        const maxTotal = Math.max(...plannedCurve, ...actualCurve, 1);
        const plannedPercent = plannedCurve.map(v => (v / maxTotal) * 100);
        const actualPercent = actualCurve.map(v => (v / maxTotal) * 100);

        const lang = getLang();
        const labels = timePoints.map(date => {
            return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
                month: 'short',
                day: 'numeric'
            });
        });

        return {
            labels,
            planned: plannedPercent,
            actual: actualPercent,
            totalPlanned,
            totalActual,
            maxTotal,
            deviation: plannedPercent[plannedPercent.length - 1] - actualPercent[actualPercent.length - 1],
            finalPlanned: plannedPercent[plannedPercent.length - 1],
            finalActual: actualPercent[actualPercent.length - 1]
        };
    }

    // ============================================
    // 3. RENDERIZADO (con traducciones dinámicas)
    // ============================================
    let sCurveChartInstance = null;
    let sCurveContainer = null;
    let sCurveData = null;

    function render(container) {
        const project = global.projects?.[global.currentProjectIndex];
        if (!project) {
            container.innerHTML = `<div style="padding: 40px; text-align: center; color: #94a3b8;">${t('noData')}</div>`;
            return;
        }

        const tasks = project.tasks || [];
        if (tasks.length === 0) {
            container.innerHTML = `<div style="padding: 40px; text-align: center; color: #94a3b8;">${t('noTasks')}</div>`;
            return;
        }

        const data = calculateSCurve(tasks);
        if (!data) {
            container.innerHTML = `<div style="padding: 40px; text-align: center; color: #94a3b8;">${t('noData')}</div>`;
            return;
        }
        sCurveData = data;

        const diff = data.deviation;
        let statusText = t('onTrack');
        let statusColor = '#10b981';
        if (diff > 3) {
            statusText = t('ahead');
            statusColor = '#3b82f6';
        } else if (diff < -3) {
            statusText = t('behind');
            statusColor = '#ef4444';
        }

        // Si ya existe un contenedor, lo limpiamos y reutilizamos
        if (sCurveContainer && sCurveContainer.parentNode) {
            // Limpiar contenido anterior pero mantener el contenedor
            sCurveContainer.innerHTML = '';
        } else {
            // Crear nuevo contenedor
            sCurveContainer = document.createElement('div');
            sCurveContainer.id = 'sCurveContainer';
            sCurveContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.92);
                backdrop-filter: blur(12px);
                z-index: 1000000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
            `;
            document.body.appendChild(sCurveContainer);
        }

        // Generar HTML
        sCurveContainer.innerHTML = `
            <div style="
                background: linear-gradient(145deg, #0f172a, #1e293b);
                border-radius: 32px;
                width: 100%;
                max-width: 1200px;
                max-height: 90vh;
                padding: 30px;
                border: 2px solid rgba(139, 92, 246, 0.3);
                box-shadow: 0 40px 80px rgba(0,0,0,0.6);
                display: flex;
                flex-direction: column;
                overflow: hidden;
            ">
                <!-- HEADER -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; flex-wrap: wrap; gap: 15px;">
                    <div>
                        <h2 style="margin: 0; font-size: 28px; font-weight: 700; color: white;">
                            ${t('title')}
                        </h2>
                        <p style="margin: 5px 0 0 0; color: #94a3b8; font-size: 15px;">
                            ${project.name} • ${t('subtitle')}
                        </p>
                    </div>
                    <div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;">
                        <div style="background: ${statusColor}20; border: 1px solid ${statusColor}; border-radius: 40px; padding: 8px 20px;">
                            <span style="color: ${statusColor}; font-weight: 600;">${statusText}</span>
                        </div>
                        <button id="sCurveExportBtn" style="
                            background: linear-gradient(135deg, #8b5cf6, #6d28d9);
                            border: none;
                            color: white;
                            padding: 10px 20px;
                            border-radius: 40px;
                            cursor: pointer;
                            font-weight: 600;
                            transition: 0.2s;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                            📥 ${t('exportBtn')}
                        </button>
                        <button id="sCurveCloseBtn" style="
                            background: rgba(239, 68, 68, 0.2);
                            border: 1px solid #ef4444;
                            color: #ef4444;
                            padding: 10px 20px;
                            border-radius: 40px;
                            cursor: pointer;
                            font-weight: 600;
                            transition: 0.2s;
                        " onmouseover="this.style.background='rgba(239,68,68,0.3)'" onmouseout="this.style.background='rgba(239,68,68,0.2)'">
                            ${t('closeBtn')}
                        </button>
                    </div>
                </div>

                <!-- MÉTRICAS -->
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 25px;">
                    <div style="background: rgba(255,255,255,0.05); border-radius: 16px; padding: 18px; text-align: center;">
                        <div style="color: #94a3b8; font-size: 12px; text-transform: uppercase;">${t('totalHoursPlanned')}</div>
                        <div style="font-size: 28px; font-weight: 700; color: #3b82f6;">${data.totalPlanned.toFixed(1)}h</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.05); border-radius: 16px; padding: 18px; text-align: center;">
                        <div style="color: #94a3b8; font-size: 12px; text-transform: uppercase;">${t('totalHoursActual')}</div>
                        <div style="font-size: 28px; font-weight: 700; color: #10b981;">${data.totalActual.toFixed(1)}h</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.05); border-radius: 16px; padding: 18px; text-align: center;">
                        <div style="color: #94a3b8; font-size: 12px; text-transform: uppercase;">${t('deviation')}</div>
                        <div style="font-size: 28px; font-weight: 700; color: ${diff > 0 ? '#3b82f6' : diff < 0 ? '#ef4444' : '#10b981'};">
                            ${diff > 0 ? '+' : ''}${diff.toFixed(1)}%
                        </div>
                    </div>
                </div>

                <!-- GRÁFICO -->
                <div style="flex: 1; min-height: 400px; position: relative; background: rgba(0,0,0,0.2); border-radius: 16px; padding: 20px;">
                    <canvas id="sCurveChart" style="width: 100%; height: 100%;"></canvas>
                </div>

                <!-- FOOTER -->
                <div style="margin-top: 20px; display: flex; justify-content: space-between; color: #64748b; font-size: 12px;">
                    <span>📊 ${t('weekLabel')}</span>
                    <span>${new Date().toLocaleString()}</span>
                </div>
            </div>
        `;

        // Inicializar gráfico
        const canvas = document.getElementById('sCurveChart');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            canvas.width = canvas.parentElement.clientWidth - 40;
            canvas.height = canvas.parentElement.clientHeight - 40;

            if (sCurveChartInstance) {
                sCurveChartInstance.destroy();
                sCurveChartInstance = null;
            }

            sCurveChartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.labels,
                    datasets: [
                        {
                            label: t('planned'),
                            data: data.planned,
                            borderColor: '#3b82f6',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            borderWidth: 3,
                            fill: true,
                            tension: 0.3,
                            pointRadius: 3,
                            pointBackgroundColor: '#3b82f6'
                        },
                        {
                            label: t('actual'),
                            data: data.actual,
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            borderWidth: 3,
                            fill: true,
                            tension: 0.3,
                            pointRadius: 3,
                            pointBackgroundColor: '#10b981'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: '#e2e8f0',
                                font: { size: 14, weight: '600' },
                                padding: 20
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                            titleColor: '#e2e8f0',
                            bodyColor: '#cbd5e1',
                            borderColor: 'rgba(139, 92, 246, 0.3)',
                            borderWidth: 1,
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + '%';
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            title: {
                                display: true,
                                text: t('progressLabel'),
                                color: '#94a3b8'
                            },
                            ticks: {
                                color: '#94a3b8',
                                callback: function(value) { return value + '%'; }
                            },
                            grid: {
                                color: 'rgba(255,255,255,0.05)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: t('weekLabel'),
                                color: '#94a3b8'
                            },
                            ticks: {
                                color: '#94a3b8',
                                maxRotation: 45,
                                autoSkip: true,
                                maxTicksLimit: 20
                            },
                            grid: {
                                color: 'rgba(255,255,255,0.05)'
                            }
                        }
                    }
                }
            });
        }

        // Eventos
        document.getElementById('sCurveCloseBtn')?.addEventListener('click', closeSCurve);
        document.getElementById('sCurveExportBtn')?.addEventListener('click', function() {
            const canvas = document.getElementById('sCurveChart');
            if (canvas) {
                const link = document.createElement('a');
                link.download = `s-curve_${project.name.replace(/\s+/g, '_')}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            }
        });

        // Cerrar con Escape
        const escHandler = function(e) {
            if (e.key === 'Escape') {
                closeSCurve();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);

        // Redimensionar
        const resizeHandler = function() {
            if (sCurveChartInstance) {
                sCurveChartInstance.resize();
            }
        };
        window.addEventListener('resize', resizeHandler);

        // Guardar limpieza
        sCurveContainer._cleanup = function() {
            window.removeEventListener('resize', resizeHandler);
            document.removeEventListener('keydown', escHandler);
        };
    }

    function closeSCurve() {
        if (sCurveContainer) {
            if (sCurveContainer._cleanup) sCurveContainer._cleanup();
            sCurveContainer.remove();
            sCurveContainer = null;
        }
        if (sCurveChartInstance) {
            sCurveChartInstance.destroy();
            sCurveChartInstance = null;
        }
        sCurveData = null;
    }

    // ============================================
    // 4. REFRESCAR IDIOMA
    // ============================================
    function refreshLanguage() {
        if (sCurveContainer && sCurveData) {
            // Recrear el contenedor con el nuevo idioma
            const project = global.projects?.[global.currentProjectIndex];
            if (project) {
                // Guardar referencia al contenedor actual
                const oldContainer = sCurveContainer;
                // Crear uno nuevo y reemplazar
                const newContainer = document.createElement('div');
                newContainer.id = 'sCurveContainer';
                oldContainer.parentNode.replaceChild(newContainer, oldContainer);
                sCurveContainer = newContainer;
                // Renderizar de nuevo
                render(sCurveContainer);
            }
        }
    }

    // ============================================
    // 5. FUNCIÓN PRINCIPAL DE INICIO
    // ============================================
    function launch() {
        if (sCurveContainer) {
            closeSCurve();
            return;
        }
        const tempContainer = document.createElement('div');
        tempContainer.id = 'sCurveTemp';
        document.body.appendChild(tempContainer);
        render(tempContainer);
        // Eliminar el temporal después de renderizar (el render crea su propio contenedor fijo)
        setTimeout(() => {
            if (tempContainer.parentNode) tempContainer.remove();
        }, 100);
    }


   // ============================================
// 6. AGREGAR BOTÓN CURVA S (DESPUÉS DE DASHBOARD 4D)
// ============================================
function addSCurveButton() {
    const sidebar = document.querySelector('aside, #sidebar, .sidebar, .side-menu, .menu-lateral');
    if (!sidebar) {
        setTimeout(addSCurveButton, 500);
        return;
    }

    // Eliminar duplicado si existe
    const existingBtn = document.getElementById('sCurveSidebarBtn');
    if (existingBtn) existingBtn.remove();

    // Buscar el elemento "Dashboard 4D"
    let dashboard4D = document.getElementById('showDashboard4DView');
    if (!dashboard4D) {
        // Buscar por texto si no encuentra por ID
        const allItems = sidebar.querySelectorAll('li, .menu-item, .nav-item');
        for (const item of allItems) {
            if (item.textContent.includes('Dashboard 4D') || item.textContent.includes('Dashboard4D')) {
                dashboard4D = item;
                break;
            }
        }
    }

    // Si no encuentra Dashboard 4D, insertar después de proyectos (fallback)
    if (!dashboard4D) {
        console.warn('⚠️ No se encontró "Dashboard 4D", insertando después de proyectos');
        const projectSection = document.getElementById('projectList');
        if (projectSection && projectSection.parentNode) {
            dashboard4D = projectSection;
        } else {
            // Fallback final: al final del sidebar
            const btn = crearBotonCurvaS();
            sidebar.appendChild(btn);
            return;
        }
    }

    // Obtener el li padre (el elemento del menú)
    const targetLi = dashboard4D.closest('li');
    if (!targetLi) {
        console.warn('⚠️ Dashboard 4D no está dentro de un li, insertando después del elemento');
        const btn = crearBotonCurvaS();
        dashboard4D.parentNode.insertBefore(btn, dashboard4D.nextSibling);
        return;
    }

    // Crear el botón (será un button, no un li, para que tenga el mismo tamaño que los de abajo)
    const btn = document.createElement('button');
    btn.id = 'sCurveSidebarBtn';
    btn.innerHTML = '📈 Curva S';

    // ========================================
    // ESTILOS AMARILLOS (los que funcionaron)
    // ========================================
    function aplicarEstilos() {
        btn.style.setProperty('width', 'calc(100% - 24px)', 'important');
        btn.style.setProperty('background', 'linear-gradient(135deg, #fbbf24, #f59e0b)', 'important');
        btn.style.setProperty('border', 'none', 'important');
        btn.style.setProperty('color', 'white', 'important');
        btn.style.setProperty('padding', '14px 20px', 'important'); // Más padding para que sea más grande
        btn.style.setProperty('height', '48px', 'important'); // Más alto
        btn.style.setProperty('border-radius', '10px', 'important');
        btn.style.setProperty('cursor', 'pointer', 'important');
        btn.style.setProperty('font-weight', '600', 'important');
        btn.style.setProperty('font-size', '15px', 'important');
        btn.style.setProperty('margin', '8px 12px', 'important');
        btn.style.setProperty('display', 'flex', 'important');
        btn.style.setProperty('align-items', 'center', 'important');
        btn.style.setProperty('justify-content', 'center', 'important');
        btn.style.setProperty('gap', '10px', 'important');
        btn.style.setProperty('transition', 'all 0.3s ease', 'important');
        btn.style.setProperty('box-shadow', '0 4px 12px rgba(251, 191, 36, 0.4)', 'important');
        btn.style.setProperty('letter-spacing', '0.5px', 'important');
        btn.style.setProperty('border', '1px solid rgba(255, 255, 255, 0.2)', 'important');
    }

    aplicarEstilos();

    // Eventos hover
    btn.addEventListener('mouseenter', () => {
        btn.style.setProperty('transform', 'translateY(-2px)', 'important');
        btn.style.setProperty('box-shadow', '0 8px 20px rgba(251, 191, 36, 0.6)', 'important');
        btn.style.setProperty('background', 'linear-gradient(135deg, #fcd34d, #f59e0b)', 'important');
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.setProperty('transform', 'translateY(0)', 'important');
        btn.style.setProperty('box-shadow', '0 4px 12px rgba(251, 191, 36, 0.4)', 'important');
        btn.style.setProperty('background', 'linear-gradient(135deg, #fbbf24, #f59e0b)', 'important');
    });

    // Evento click
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Lanzar Curva S
        if (typeof launch === 'function') {
            launch();
        } else if (typeof window.SCurve?.launch === 'function') {
            window.SCurve.launch();
        }
    });

    // Insertar DESPUÉS de Dashboard 4D
    targetLi.parentNode.insertBefore(btn, targetLi.nextSibling);

    console.log('✅ Botón Curva S insertado después de Dashboard 4D');

    // ========================================
    // PROTECCIÓN CONTRA SOBRESCRITURA
    // ========================================
    let intentos = 0;
    const interval = setInterval(() => {
        const currentBg = btn.style.background || '';
        if (!currentBg.includes('fbbf24') && !currentBg.includes('f59e0b')) {
            aplicarEstilos();
            console.log('🔄 Estilo del botón Curva S restaurado (intento ' + (intentos + 1) + ')');
        }
        intentos++;
        if (intentos > 10) {
            clearInterval(interval);
            console.log('✅ Protección de estilos finalizada');
        }
    }, 2000);
}
   // ============================================
    // 7. EXPOSICIÓN GLOBAL Y EVENTOS
    // ============================================
    global.SCurve = {
        launch: launch,
        render: render,
        refreshLanguage: refreshLanguage,
        close: closeSCurve,
        addButton: addSCurveButton
    };

    // Escuchar evento de cambio de idioma
    document.addEventListener('languageChanged', refreshLanguage);

    // Inicializar automáticamente al cargar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addSCurveButton);
    } else {
        addSCurveButton();
    }

    console.log('📈 Módulo Curva S cargado correctamente (versión corregida)');

})(window);