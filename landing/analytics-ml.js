// ============================================================
// ADVANCED ANALYTICS WITH MACHINE LEARNING
// Módulo independiente para Zacky Gantt Enterprise Pro
// ============================================================

class ZackyML {
    constructor() {
        this.projects = [];
        this.insights = [];
        this.correlations = [];
        this.recommendations = [];
        this.isInitialized = false;
    }

    // ===== INICIALIZAR CON DATOS DE EJEMPLO =====
    init() {
        // Datos simulados de proyectos (en producción, vendrían de tu API)
        this.projects = [
            { id: 1, teamSize: 4, duration: 120, cost: 45000, evm_cpi: 1.15, evm_spi: 0.95, satisfaction: 4.2, meetingsPerWeek: 3, avgMeetingDuration: 45, hasDailyStandup: true, completed: true },
            { id: 2, teamSize: 8, duration: 180, cost: 82000, evm_cpi: 0.92, evm_spi: 0.88, satisfaction: 3.1, meetingsPerWeek: 5, avgMeetingDuration: 60, hasDailyStandup: false, completed: true },
            { id: 3, teamSize: 6, duration: 90, cost: 38000, evm_cpi: 1.24, evm_spi: 1.12, satisfaction: 4.8, meetingsPerWeek: 2, avgMeetingDuration: 30, hasDailyStandup: true, completed: true },
            { id: 4, teamSize: 10, duration: 240, cost: 125000, evm_cpi: 0.78, evm_spi: 0.72, satisfaction: 2.5, meetingsPerWeek: 6, avgMeetingDuration: 75, hasDailyStandup: false, completed: true },
            { id: 5, teamSize: 5, duration: 60, cost: 28000, evm_cpi: 1.32, evm_spi: 1.08, satisfaction: 4.9, meetingsPerWeek: 2, avgMeetingDuration: 25, hasDailyStandup: true, completed: true },
            { id: 6, teamSize: 7, duration: 150, cost: 65000, evm_cpi: 1.05, evm_spi: 1.02, satisfaction: 4.0, meetingsPerWeek: 3, avgMeetingDuration: 40, hasDailyStandup: true, completed: true },
            { id: 7, teamSize: 3, duration: 45, cost: 18000, evm_cpi: 1.18, evm_spi: 0.92, satisfaction: 3.8, meetingsPerWeek: 4, avgMeetingDuration: 50, hasDailyStandup: false, completed: true },
            { id: 8, teamSize: 9, duration: 210, cost: 98000, evm_cpi: 0.85, evm_spi: 0.80, satisfaction: 2.8, meetingsPerWeek: 5, avgMeetingDuration: 65, hasDailyStandup: false, completed: true },
            { id: 9, teamSize: 6, duration: 75, cost: 32000, evm_cpi: 1.28, evm_spi: 1.15, satisfaction: 4.7, meetingsPerWeek: 2, avgMeetingDuration: 28, hasDailyStandup: true, completed: true },
            { id: 10, teamSize: 12, duration: 300, cost: 150000, evm_cpi: 0.72, evm_spi: 0.65, satisfaction: 2.0, meetingsPerWeek: 7, avgMeetingDuration: 80, hasDailyStandup: false, completed: true },
            { id: 11, teamSize: 4, duration: 50, cost: 22000, evm_cpi: 1.35, evm_spi: 1.20, satisfaction: 5.0, meetingsPerWeek: 1, avgMeetingDuration: 20, hasDailyStandup: true, completed: true },
            { id: 12, teamSize: 7, duration: 120, cost: 55000, evm_cpi: 1.08, evm_spi: 0.98, satisfaction: 4.1, meetingsPerWeek: 3, avgMeetingDuration: 38, hasDailyStandup: true, completed: true }
        ];
        
        this.runAnalysis();
        this.isInitialized = true;
        console.log('🧠 Zacky ML inicializado con', this.projects.length, 'proyectos analizados');
        return this;
    }

    // ===== ANALIZAR DATOS Y GENERAR INSIGHTS =====
    runAnalysis() {
        this.findCorrelations();
        this.generateInsights();
        this.generateRecommendations();
        return this;
    }

    // ===== ENCONTRAR CORRELACIONES =====
    findCorrelations() {
        const correlations = [];
        const metrics = [
            { key: 'teamSize', label: 'Tamaño del equipo', unit: 'personas' },
            { key: 'duration', label: 'Duración', unit: 'días' },
            { key: 'cost', label: 'Coste', unit: '€' },
            { key: 'evm_cpi', label: 'CPI' },
            { key: 'evm_spi', label: 'SPI' },
            { key: 'satisfaction', label: 'Satisfacción', unit: '/5' },
            { key: 'meetingsPerWeek', label: 'Reuniones por semana' },
            { key: 'avgMeetingDuration', label: 'Duración media de reunión', unit: 'min' }
        ];

        // Calcular correlaciones con satisfacción
        for (let i = 0; i < metrics.length; i++) {
            const m = metrics[i];
            if (m.key === 'satisfaction') continue;
            
            const values = this.projects.map(p => p[m.key]);
            const satisfactionValues = this.projects.map(p => p.satisfaction);
            
            const correlation = this.calculateCorrelation(values, satisfactionValues);
            
            correlations.push({
                metric: m.key,
                label: m.label,
                unit: m.unit || '',
                correlation: correlation,
                strength: Math.abs(correlation),
                direction: correlation > 0 ? 'positiva' : 'negativa'
            });
        }
        
        // Ordenar por fuerza de correlación
        correlations.sort((a, b) => b.strength - a.strength);
        this.correlations = correlations;
        return this;
    }

    // ===== CALCULAR CORRELACIÓN DE PEARSON =====
    calculateCorrelation(x, y) {
        const n = x.length;
        const sumX = x.reduce((a, b) => a + b, 0);
        const sumY = y.reduce((a, b) => a + b, 0);
        const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
        const sumX2 = x.reduce((a, b) => a + b * b, 0);
        const sumY2 = y.reduce((a, b) => a + b * b, 0);
        
        const numerator = n * sumXY - sumX * sumY;
        const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
        
        if (denominator === 0) return 0;
        return numerator / denominator;
    }

    // ===== GENERAR INSIGHTS =====
    generateInsights() {
        const insights = [];
        const topCorrelations = this.correlations.slice(0, 4);
        
        topCorrelations.forEach(c => {
            let insight = '';
            if (c.metric === 'teamSize') {
                if (c.correlation > 0.5) {
                    insight = 'Equipos más grandes tienden a tener mayor satisfacción (r = ' + c.correlation.toFixed(2) + ')';
                } else if (c.correlation < -0.5) {
                    insight = 'Equipos más grandes tienden a tener menor satisfacción (r = ' + c.correlation.toFixed(2) + ')';
                } else {
                    insight = 'El tamaño del equipo no es el factor más importante para la satisfacción (r = ' + c.correlation.toFixed(2) + ')';
                }
            } else if (c.metric === 'duration') {
                if (c.correlation < -0.5) {
                    insight = 'Proyectos más largos tienden a tener menor satisfacción (r = ' + c.correlation.toFixed(2) + ')';
                } else {
                    insight = 'La duración del proyecto tiene una ' + c.direction + ' correlación con la satisfacción (r = ' + c.correlation.toFixed(2) + ')';
                }
            } else if (c.metric === 'evm_cpi') {
                if (c.correlation > 0.6) {
                    insight = 'CPI alto (eficiencia en costes) se correlaciona fuertemente con satisfacción (r = ' + c.correlation.toFixed(2) + ')';
                } else {
                    insight = 'CPI tiene una ' + c.direction + ' correlación con satisfacción (r = ' + c.correlation.toFixed(2) + ')';
                }
            } else if (c.metric === 'evm_spi') {
                if (c.correlation > 0.6) {
                    insight = 'SPI alto (cumplir plazos) se correlaciona fuertemente con satisfacción (r = ' + c.correlation.toFixed(2) + ')';
                } else {
                    insight = 'SPI tiene una ' + c.direction + ' correlación con satisfacción (r = ' + c.correlation.toFixed(2) + ')';
                }
            } else if (c.metric === 'meetingsPerWeek') {
                if (c.correlation < -0.5) {
                    insight = 'Demasiadas reuniones reducen la satisfacción. Ideal: 2-3 por semana (r = ' + c.correlation.toFixed(2) + ')';
                } else {
                    insight = 'El número de reuniones tiene una ' + c.direction + ' correlación con satisfacción (r = ' + c.correlation.toFixed(2) + ')';
                }
            } else if (c.metric === 'avgMeetingDuration') {
                if (c.correlation < -0.5) {
                    insight = 'Reuniones largas (>45min) reducen la satisfacción (r = ' + c.correlation.toFixed(2) + ')';
                } else {
                    insight = 'La duración de reuniones tiene una ' + c.direction + ' correlación con satisfacción (r = ' + c.correlation.toFixed(2) + ')';
                }
            } else {
                insight = c.label + ' tiene una ' + c.direction + ' correlación con satisfacción (r = ' + c.correlation.toFixed(2) + ')';
            }
            
            insights.push({
                metric: c.label,
                correlation: c.correlation,
                insight: insight,
                recommendation: this.generateRecommendationForMetric(c)
            });
        });

        // Insight adicional sobre daily standups
        const standupProjects = this.projects.filter(p => p.hasDailyStandup);
        const noStandupProjects = this.projects.filter(p => !p.hasDailyStandup);
        if (standupProjects.length > 0 && noStandupProjects.length > 0) {
            const avgSatisfactionStandup = standupProjects.reduce((sum, p) => sum + p.satisfaction, 0) / standupProjects.length;
            const avgSatisfactionNoStandup = noStandupProjects.reduce((sum, p) => sum + p.satisfaction, 0) / noStandupProjects.length;
            const diff = avgSatisfactionStandup - avgSatisfactionNoStandup;
            
            insights.push({
                metric: 'Daily Standup',
                correlation: diff / 5,
                insight: diff > 0.5 ? 
                    'Los equipos con daily standups tienen ' + (diff * 100 / 5).toFixed(0) + '% más satisfacción que los que no' :
                    'Los daily standups no parecen tener un gran impacto en la satisfacción',
                recommendation: diff > 0.5 ? 
                    'Recomendación: Implementar daily standups de 15 minutos en todos los proyectos' :
                    'Evaluar si los daily standups son necesarios o pueden optimizarse'
            });
        }

        this.insights = insights;
        return this;
    }

    // ===== GENERAR RECOMENDACIONES =====
    generateRecommendationForMetric(c) {
        const recommendations = {
            teamSize: 'Equipo ideal: 5-7 personas (balance entre productividad y comunicación)',
            duration: 'Dividir proyectos largos (>180 días) en fases más cortas',
            evm_cpi: 'Monitorear CPI semanalmente. Si baja de 1.0, revisar costes inmediatamente',
            evm_spi: 'Monitorear SPI semanalmente. Si baja de 0.95, revisar plazos',
            meetingsPerWeek: 'Ideal: 2-3 reuniones por semana. Más de 4 reduce productividad',
            avgMeetingDuration: 'Reuniones ideales: 20-30 minutos. Más de 45 minutos son ineficientes'
        };
        return recommendations[c.metric] || 'Revisar métricas regularmente para optimizar rendimiento';
    }

    // ===== GENERAR RECOMENDACIONES GENERALES =====
    generateRecommendations() {
        const recommendations = [];
        
        // Recomendación 1: Tamaño de equipo
        const teamSizes = this.projects.map(p => p.teamSize);
        const avgTeamSize = teamSizes.reduce((a, b) => a + b, 0) / teamSizes.length;
        const satisfactionByTeamSize = {};
        this.projects.forEach(p => {
            const size = p.teamSize;
            if (!satisfactionByTeamSize[size]) satisfactionByTeamSize[size] = [];
            satisfactionByTeamSize[size].push(p.satisfaction);
        });
        const avgSatisfactionBySize = {};
        Object.keys(satisfactionByTeamSize).forEach(size => {
            const values = satisfactionByTeamSize[size];
            avgSatisfactionBySize[size] = values.reduce((a, b) => a + b, 0) / values.length;
        });
        const bestSize = Object.keys(avgSatisfactionBySize).reduce((a, b) => 
            avgSatisfactionBySize[a] > avgSatisfactionBySize[b] ? a : b
        );
        
        recommendations.push({
            category: 'Tamaño de equipo',
            title: 'Equipo óptimo de ' + bestSize + ' personas',
            description: 'Los proyectos con equipos de ' + bestSize + ' personas tienen la mayor satisfacción (' + 
                avgSatisfactionBySize[bestSize].toFixed(1) + '/5)',
            impact: 'Alto',
            action: 'Recomendar a los clientes que mantengan equipos de ' + bestSize + ' personas'
        });

        // Recomendación 2: Daily Standup
        const standupProjects = this.projects.filter(p => p.hasDailyStandup);
        const noStandupProjects = this.projects.filter(p => !p.hasDailyStandup);
        if (standupProjects.length > 0 && noStandupProjects.length > 0) {
            const avgSatisfactionStandup = standupProjects.reduce((sum, p) => sum + p.satisfaction, 0) / standupProjects.length;
            const avgSatisfactionNoStandup = noStandupProjects.reduce((sum, p) => sum + p.satisfaction, 0) / noStandupProjects.length;
            
            if (avgSatisfactionStandup > avgSatisfactionNoStandup) {
                recommendations.push({
                    category: 'Metodología',
                    title: 'Implementar Daily Standups',
                    description: 'Los equipos con daily standups tienen ' + 
                        ((avgSatisfactionStandup - avgSatisfactionNoStandup) * 100 / 5).toFixed(0) + 
                        '% más satisfacción que los que no',
                    impact: 'Medio-Alto',
                    action: 'Recomendar a los clientes que implementen daily standups de 15 minutos'
                });
            }
        }

        // Recomendación 3: Reuniones
        const projectsWithShortMeetings = this.projects.filter(p => p.avgMeetingDuration <= 30);
        const projectsWithLongMeetings = this.projects.filter(p => p.avgMeetingDuration > 45);
        if (projectsWithShortMeetings.length > 0 && projectsWithLongMeetings.length > 0) {
            const avgSatisfactionShort = projectsWithShortMeetings.reduce((sum, p) => sum + p.satisfaction, 0) / projectsWithShortMeetings.length;
            const avgSatisfactionLong = projectsWithLongMeetings.reduce((sum, p) => sum + p.satisfaction, 0) / projectsWithLongMeetings.length;
            
            if (avgSatisfactionShort > avgSatisfactionLong) {
                recommendations.push({
                    category: 'Productividad',
                    title: 'Reuniones más cortas y efectivas',
                    description: 'Equipos con reuniones de ≤30min tienen ' + 
                        ((avgSatisfactionShort - avgSatisfactionLong) * 100 / 5).toFixed(0) + 
                        '% más satisfacción que los que tienen reuniones >45min',
                    impact: 'Alto',
                    action: 'Recomendar reuniones de 20-30 minutos con agenda clara'
                });
            }
        }

        // Recomendación 4: CPI
        const projectsGoodCPI = this.projects.filter(p => p.evm_cpi >= 1.05);
        const projectsBadCPI = this.projects.filter(p => p.evm_cpi < 0.95);
        if (projectsGoodCPI.length > 0 && projectsBadCPI.length > 0) {
            const avgSatisfactionGood = projectsGoodCPI.reduce((sum, p) => sum + p.satisfaction, 0) / projectsGoodCPI.length;
            const avgSatisfactionBad = projectsBadCPI.reduce((sum, p) => sum + p.satisfaction, 0) / projectsBadCPI.length;
            
            recommendations.push({
                category: 'Costes',
                title: 'Mantener CPI > 1.05',
                description: 'Proyectos con CPI > 1.05 tienen ' + 
                    ((avgSatisfactionGood - avgSatisfactionBad) * 100 / 5).toFixed(0) + 
                    '% más satisfacción que los que tienen CPI < 0.95',
                impact: 'Muy Alto',
                action: 'Usar Zacky para monitorear CPI en tiempo real y alertar si baja de 1.0'
            });
        }

        this.recommendations = recommendations;
        return this;
    }

    // ===== OBTENER RESULTADOS =====
    getResults() {
        return {
            correlations: this.correlations,
            insights: this.insights,
            recommendations: this.recommendations,
            projectCount: this.projects.length,
            avgSatisfaction: this.projects.reduce((sum, p) => sum + p.satisfaction, 0) / this.projects.length
        };
    }

    // ===== GENERAR HTML PARA EL DASHBOARD =====
    renderDashboard() {
        const results = this.getResults();
        const isES = localStorage.getItem('zacky_lang') === 'es';
        
        let html = `
            <div style="padding: 1rem;">
                <h3 style="color: #818cf8; margin-bottom: 1rem;">
                    ${isES ? '🧠 Análisis Avanzado con ML' : '🧠 Advanced Analytics with ML'}
                </h3>
                <p style="color: #94a3b8; margin-bottom: 1.5rem;">
                    ${isES ? 'Basado en ' + results.projectCount + ' proyectos analizados' : 'Based on ' + results.projectCount + ' analyzed projects'}
                </p>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
                    <div style="background: rgba(16,185,129,0.1); padding: 1rem; border-radius: 12px; text-align: center;">
                        <div style="font-size: 1.8rem; font-weight: 800; color: #10b981;">${results.avgSatisfaction.toFixed(1)}</div>
                        <div style="color: #94a3b8; font-size: 0.8rem;">${isES ? 'Satisfacción media' : 'Avg Satisfaction'}</div>
                    </div>
                    <div style="background: rgba(99,102,241,0.1); padding: 1rem; border-radius: 12px; text-align: center;">
                        <div style="font-size: 1.8rem; font-weight: 800; color: #818cf8;">${results.projectCount}</div>
                        <div style="color: #94a3b8; font-size: 0.8rem;">${isES ? 'Proyectos analizados' : 'Projects analyzed'}</div>
                    </div>
                </div>
        `;

        // Recomendaciones
        if (this.recommendations.length > 0) {
            html += `
                <h4 style="color: #f59e0b; margin: 1rem 0 0.5rem 0;">
                    ${isES ? '🎯 Recomendaciones' : '🎯 Recommendations'}
                </h4>
                <div style="display: flex; flex-direction: column; gap: 0.8rem;">
            `;
            this.recommendations.forEach(rec => {
                html += `
                    <div style="background: rgba(30,41,59,0.8); padding: 1rem; border-radius: 12px; border-left: 4px solid #f59e0b;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-weight: 600; color: #e2e8f0;">${rec.title}</span>
                            <span style="background: rgba(245,158,11,0.2); color: #f59e0b; padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.7rem;">${rec.impact}</span>
                        </div>
                        <div style="color: #94a3b8; font-size: 0.85rem; margin-top: 0.3rem;">${rec.description}</div>
                        <div style="color: #818cf8; font-size: 0.8rem; margin-top: 0.3rem;">
                            💡 ${rec.action}
                        </div>
                    </div>
                `;
            });
            html += `</div>`;
        }

        // Insights
        if (this.insights.length > 0) {
            html += `
                <h4 style="color: #06b6d4; margin: 1.5rem 0 0.5rem 0;">
                    ${isES ? '💡 Insights Detectados' : '💡 Detected Insights'}
                </h4>
                <div style="display: flex; flex-direction: column; gap: 0.6rem;">
            `;
            this.insights.slice(0, 5).forEach(insight => {
                html += `
                    <div style="background: rgba(6,182,212,0.05); padding: 0.8rem 1rem; border-radius: 8px; border-left: 3px solid #06b6d4;">
                        <div style="color: #cbd5e1; font-size: 0.9rem;">${insight.insight}</div>
                        <div style="color: #64748b; font-size: 0.75rem; margin-top: 0.2rem;">
                            ${isES ? 'Correlación' : 'Correlation'}: ${insight.correlation.toFixed(2)}
                        </div>
                    </div>
                `;
            });
            html += `</div>`;
        }

        html += `
                <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(99,102,241,0.1); border-radius: 12px; text-align: center; font-size: 0.8rem; color: #94a3b8;">
                    ${isES ? 'Los datos se actualizan automáticamente con cada proyecto completado' : 'Data is automatically updated with each completed project'}
                </div>
            </div>
        `;

        return html;
    }
}

// ===== INICIALIZAR Y EXPONER GLOBALMENTE =====
const zackyML = new ZackyML();
zackyML.init();

// Exponer funciones globales para usar desde el HTML
window.zackyML = zackyML;
window.showMLDashboard = function() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        z-index: 10002;
        backdrop-filter: blur(15px);
        overflow-y: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        max-width: 800px;
        max-height: 90vh;
        overflow-y: auto;
        background: linear-gradient(135deg, #1e293b, #0f172a);
        border-radius: 32px;
        padding: 2rem;
        border: 2px solid rgba(99,102,241,0.3);
        color: #e2e8f0;
        position: relative;
        width: 100%;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
        position: sticky;
        float: right;
        top: 0;
        background: rgba(239,68,68,0.8);
        border: none;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        transition: all 0.3s;
        z-index: 10;
        margin-bottom: 1rem;
    `;
    closeBtn.onmouseover = () => { closeBtn.style.background = '#ef4444'; closeBtn.style.transform = 'scale(1.1)'; };
    closeBtn.onmouseout = () => { closeBtn.style.background = 'rgba(239,68,68,0.8)'; closeBtn.style.transform = 'scale(1)'; };
    closeBtn.onclick = () => { document.body.removeChild(modal); document.body.style.overflow = 'auto'; };
    
    const contentWrapper = document.createElement('div');
    contentWrapper.innerHTML = zackyML.renderDashboard();
    content.appendChild(closeBtn);
    content.appendChild(contentWrapper);
    modal.appendChild(content);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        }
    };
};

console.log('🧠 Zacky ML Analytics cargado correctamente');
console.log('📊 Para ver el dashboard, ejecuta: showMLDashboard()');