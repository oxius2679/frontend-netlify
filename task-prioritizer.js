// ============================================================
// 🎯 TASK PRIORITIZER - MÓDULO INTELIGENTE DE PRIORIZACIÓN
// Versión: 1.0.0 | Moderno, con IA, sin puntos de falla
// ============================================================
(function() {
'use strict';

console.log('🎯 Iniciando Task Prioritizer AI Module...');

// ============================================================
// 🔧 CONFIGURACIÓN
// ============================================================
const CONFIG = {
    STORAGE_KEY: 'task_priorities',
    AI_CONFIDENCE_THRESHOLD: 0.7,
    METHODS: {
        EISENHOWER: 'eisenhower',
        MOSCOW: 'moscow',
        RICE: 'rice',
        IMPACT_EFFORT: 'impact_effort',
        FREQUENCY_IMPACT: 'frequency_impact'
    }
};

// ============================================================
// 🤖 MOTOR DE IA PARA PRIORIZACIÓN
// ============================================================
class AIPrioritizationEngine {
    constructor() {
        this.weights = {
            deadline: 0.25,        // Urgencia por fecha límite
            progress: 0.20,        // Progreso actual
            estimatedVsLogged: 0.15, // Diferencia estimado vs real
            dependencies: 0.15,    // Tareas que dependen de esta
            critical: 0.15,        // Es tarea crítica
            status: 0.10           // Estado actual
        };
    }

    /**
     * Analiza una tarea y devuelve scores para cada método
     */
    analyzeTask(task, allTasks = []) {
        if (!task) return this.getDefaultAnalysis();

        const analysis = {
            task: task,
            timestamp: Date.now(),
            confidence: 0,
            methods: {},
            recommendation: null,
            riskLevel: 'medium',
            aiExplanation: []
        };

        // Calcular métricas base
        const metrics = this.calculateMetrics(task, allTasks);

        // Aplicar cada método
        analysis.methods.eisenhower = this.applyEisenhower(task, metrics);
        analysis.methods.moscow = this.applyMoSCoW(task, metrics);
        analysis.methods.rice = this.applyRICE(task, metrics, allTasks);
        analysis.methods.impactEffort = this.applyImpactEffort(task, metrics);
        analysis.methods.frequencyImpact = this.applyFrequencyImpact(task, metrics);

        // Determinar recomendación principal
        analysis.recommendation = this.determineRecommendation(analysis.methods);
        analysis.confidence = this.calculateConfidence(analysis.methods);
        analysis.riskLevel = this.calculateRiskLevel(task, metrics);
        analysis.aiExplanation = this.generateExplanation(task, metrics, analysis);

        return analysis;
    }

    calculateMetrics(task, allTasks) {
        const today = new Date();
        const metrics = {
            daysUntilDeadline: null,
            isOverdue: false,
            progressPercentage: 0,
            estimatedVsLoggedRatio: 1,
            dependencyCount: 0,
            isCritical: false,
            isBlocked: false,
            timeSpent: 0,
            timeRemaining: 0
        };

        // Calcular días hasta deadline
        if (task.deadline) {
            const deadline = new Date(task.deadline);
            metrics.daysUntilDeadline = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
            metrics.isOverdue = metrics.daysUntilDeadline < 0;
        }

        // Progreso
        metrics.progressPercentage = Number(task.progress) || 0;

        // Ratio estimado vs registrado
        const estimated = Number(task.estimatedTime) || 0;
        const logged = Number(task.timeLogged) || 0;
        if (estimated > 0) {
            metrics.estimatedVsLoggedRatio = logged / estimated;
            metrics.timeSpent = logged;
            metrics.timeRemaining = Math.max(0, estimated - logged);
        }

        // Dependencias
        if (task.dependencies && Array.isArray(task.dependencies)) {
            metrics.dependencyCount = task.dependencies.length;
            metrics.isBlocked = task.dependencies.some(depId => {
                const dep = allTasks.find(t => String(t.id) === String(depId));
                return dep && dep.status !== 'completed';
            });
        }

        // Es crítica
        metrics.isCritical = task.critical === true || task.priority === 'alta';

        return metrics;
    }

    applyEisenhower(task, metrics) {
        const urgent = metrics.isOverdue || (metrics.daysUntilDeadline !== null && metrics.daysUntilDeadline <= 3);
        const important = metrics.isCritical || metrics.progressPercentage > 50 || metrics.dependencyCount > 0;

        let quadrant, label, color;

        if (urgent && important) {
            quadrant = 'do_first';
            label = '🔥 Hacer Ya';
            color = '#ef4444';
        } else if (!urgent && important) {
            quadrant = 'schedule';
            label = '📅 Programar';
            color = '#3b82f6';
        } else if (urgent && !important) {
            quadrant = 'delegate';
            label = '🤝 Delegar';
            color = '#f59e0b';
        } else {
            quadrant = 'eliminate';
            label = '🗑️ Eliminar';
            color = '#6b7280';
        }

        return {
            quadrant,
            label,
            color,
            urgent,
            important,
            score: this.calculateQuadrantScore(urgent, important, metrics)
        };
    }

    applyMoSCoW(task, metrics) {
        let category, label, color, description;

        if (metrics.isCritical && (metrics.isOverdue || metrics.daysUntilDeadline <= 7)) {
            category = 'must';
            label = 'M - Debe Tener';
            color = '#ef4444';
            description = 'Esencial para el éxito del proyecto';
        } else if (metrics.isCritical || metrics.progressPercentage > 60) {
            category = 'should';
            label = 'S - Debería Tener';
            color = '#3b82f6';
            description = 'Importante pero no crítico';
        } else if (metrics.progressPercentage > 30 || metrics.estimatedVsLoggedRatio > 0.5) {
            category = 'could';
            label = 'C - Podría Tener';
            color = '#f59e0b';
            description = 'Deseable si hay tiempo';
        } else {
            category = 'wont';
            label = 'W - No Hará';
            color = '#6b7280';
            description = 'No se hará en esta iteración';
        }

        return {
            category,
            label,
            color,
            description,
            score: this.calculateMoSCoWScore(category)
        };
    }

    applyRICE(task, metrics, allTasks) {
        // Reach: cuántas personas impacta (basado en dependencias)
        const reach = Math.max(1, metrics.dependencyCount + 1);

        // Impact: 1-3 (bajo, medio, alto)
        let impact = 1;
        if (metrics.isCritical) impact = 3;
        else if (metrics.progressPercentage > 50) impact = 2;

        // Confidence: 0.5-1.0 (basado en claridad de la tarea)
        let confidence = 0.7;
        if (task.description && task.description.length > 20) confidence = 0.9;
        if (task.estimatedTime && task.estimatedTime > 0) confidence = 0.95;

        // Effort: horas estimadas
        const effort = Math.max(1, Number(task.estimatedTime) || 8);

        // Fórmula RICE: (Reach × Impact × Confidence) / Effort
        const score = (reach * impact * confidence) / effort;

        let priority, color;
        if (score >= 10) {
            priority = 'high';
            color = '#ef4444';
        } else if (score >= 5) {
            priority = 'medium';
            color = '#f59e0b';
        } else {
            priority = 'low';
            color = '#6b7280';
        }

        return {
            reach,
            impact,
            confidence,
            effort,
            score: Math.round(score * 100) / 100,
            priority,
            color
        };
    }

    applyImpactEffort(task, metrics) {
        // Impacto: basado en criticidad, dependencias, progreso
        let impact = 50;
        if (metrics.isCritical) impact += 30;
        if (metrics.dependencyCount > 0) impact += 10;
        if (metrics.progressPercentage > 50) impact += 10;
        impact = Math.min(100, impact);

        // Esfuerzo: basado en tiempo estimado y ratio
        let effort = 50;
        const estimated = Number(task.estimatedTime) || 8;
        if (estimated > 20) effort += 30;
        else if (estimated > 10) effort += 15;
        if (metrics.estimatedVsLoggedRatio > 1.5) effort += 20; // Sobrepasó estimado
        effort = Math.min(100, effort);

        let quadrant, label, color;
        if (impact > 60 && effort < 40) {
            quadrant = 'quick_wins';
            label = '⚡ Quick Wins';
            color = '#10b981';
        } else if (impact > 60 && effort >= 40) {
            quadrant = 'major_projects';
            label = '🎯 Proyectos Mayores';
            color = '#3b82f6';
        } else if (impact <= 60 && effort < 40) {
            quadrant = 'fill_ins';
            label = '📝 Rellenos';
            color = '#f59e0b';
        } else {
            quadrant = 'thankless';
            label = '⚠️ Evitar';
            color = '#6b7280';
        }

        return {
            impact,
            effort,
            quadrant,
            label,
            color,
            score: (impact - effort) / 2
        };
    }

    applyFrequencyImpact(task, metrics) {
        // Frecuencia: basado en criticidad y dependencias
        let frequency = 2; // Ocasional
        if (metrics.isCritical) frequency = 4; // Probable
        if (metrics.dependencyCount > 2) frequency = 5; // Frecuente
        if (metrics.progressPercentage > 70) frequency = 3; // Posible

        // Impacto: basado en criticidad y tiempo
        let impact = 2; // Menor
        if (metrics.isCritical) impact = 4; // Mayor
        if (metrics.isOverdue) impact = 5; // Catastrófico
        if (metrics.progressPercentage > 80) impact = 3; // Moderado

        const labels = {
            1: 'Improbable', 2: 'Ocasional', 3: 'Posible', 4: 'Probable', 5: 'Frecuente'
        };
        const impactLabels = {
            1: 'Insignificante', 2: 'Menor', 3: 'Moderado', 4: 'Mayor', 5: 'Catastrófico'
        };

        return {
            frequency,
            impact,
            frequencyLabel: labels[frequency],
            impactLabel: impactLabels[impact],
            riskScore: frequency * impact,
            color: this.getRiskColor(frequency * impact)
        };
    }

    calculateQuadrantScore(urgent, important, metrics) {
        let score = 0;
        if (urgent && important) score = 100;
        else if (!urgent && important) score = 75;
        else if (urgent && !important) score = 50;
        else score = 25;

        // Ajustar por métricas
        if (metrics.isOverdue) score += 10;
        if (metrics.progressPercentage > 50) score += 5;
        if (metrics.dependencyCount > 0) score += 5;

        return Math.min(100, score);
    }

    calculateMoSCoWScore(category) {
        const scores = { must: 100, should: 75, could: 50, wont: 25 };
        return scores[category] || 50;
    }

    getRiskColor(score) {
        if (score >= 20) return '#ef4444';
        if (score >= 12) return '#f97316';
        if (score >= 6) return '#f59e0b';
        return '#10b981';
    }

    determineRecommendation(methods) {
        // Votar entre métodos para determinar recomendación final
        const votes = {
            high: 0,
            medium: 0,
            low: 0
        };

        // Eisenhower
        if (methods.eisenhower.quadrant === 'do_first') votes.high++;
        else if (methods.eisenhower.quadrant === 'schedule') votes.medium++;
        else votes.low++;

        // MoSCoW
        if (methods.moscow.category === 'must') votes.high++;
        else if (methods.moscow.category === 'should') votes.medium++;
        else votes.low++;

        // RICE
        if (methods.rice.priority === 'high') votes.high++;
        else if (methods.rice.priority === 'medium') votes.medium++;
        else votes.low++;

        // Impact/Effort
        if (methods.impactEffort.quadrant === 'quick_wins' || methods.impactEffort.quadrant === 'major_projects') votes.high++;
        else if (methods.impactEffort.quadrant === 'fill_ins') votes.medium++;
        else votes.low++;

        // Determinar recomendación
        if (votes.high >= 2) return { priority: 'high', label: '🔥 Alta Prioridad', color: '#ef4444' };
        if (votes.medium >= 2) return { priority: 'medium', label: '⚡ Prioridad Media', color: '#f59e0b' };
        return { priority: 'low', label: '📝 Baja Prioridad', color: '#6b7280' };
    }

    calculateConfidence(methods) {
        // Confianza basada en consistencia entre métodos
        const scores = [
            methods.eisenhower.score,
            methods.moscow.score,
            methods.rice.score * 10, // Normalizar
            methods.impactEffort.score + 50 // Normalizar
        ];

        const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
        const variance = scores.reduce((sum, s) => sum + Math.pow(s - avg, 2), 0) / scores.length;
        const stdDev = Math.sqrt(variance);

        // Confianza inversamente proporcional a la varianza
        const confidence = Math.max(0.5, Math.min(1, 1 - (stdDev / 100)));
        return Math.round(confidence * 100) / 100;
    }

    calculateRiskLevel(task, metrics) {
        let riskScore = 0;

        if (metrics.isOverdue) riskScore += 30;
        else if (metrics.daysUntilDeadline !== null && metrics.daysUntilDeadline <= 3) riskScore += 20;

        if (metrics.estimatedVsLoggedRatio > 1.5) riskScore += 25;
        else if (metrics.estimatedVsLoggedRatio > 1) riskScore += 15;

        if (metrics.isBlocked) riskScore += 20;
        if (metrics.progressPercentage < 20 && metrics.daysUntilDeadline !== null && metrics.daysUntilDeadline <= 7) riskScore += 15;

        if (riskScore >= 50) return 'high';
        if (riskScore >= 25) return 'medium';
        return 'low';
    }

    generateExplanation(task, metrics, analysis) {
        const explanations = [];

        if (metrics.isOverdue) {
            explanations.push(`⚠️ Esta tarea está vencida hace ${Math.abs(metrics.daysUntilDeadline)} días`);
        } else if (metrics.daysUntilDeadline !== null && metrics.daysUntilDeadline <= 3) {
            explanations.push(`⏰ Vence en ${metrics.daysUntilDeadline} días - Requiere atención inmediata`);
        }

        if (metrics.isCritical) {
            explanations.push(`🎯 Es una tarea crítica para el proyecto`);
        }

        if (metrics.dependencyCount > 0) {
            explanations.push(`🔗 ${metrics.dependencyCount} tarea(s) dependen de esta`);
        }

        if (metrics.estimatedVsLoggedRatio > 1.5) {
            explanations.push(`📊 Ha excedido el tiempo estimado en ${Math.round((metrics.estimatedVsLoggedRatio - 1) * 100)}%`);
        }

        if (metrics.progressPercentage > 70) {
            explanations.push(`✨ Tiene un progreso del ${metrics.progressPercentage}% - Cerca de completarse`);
        }

        if (metrics.isBlocked) {
            explanations.push(`🚫 Está bloqueada por dependencias no completadas`);
        }

        if (explanations.length === 0) {
            explanations.push(`ℹ️ Tarea con prioridad estándar`);
        }

        return explanations;
    }

    getDefaultAnalysis() {
        return {
            task: null,
            timestamp: Date.now(),
            confidence: 0,
            methods: {
                eisenhower: { quadrant: 'schedule', label: '📅 Programar', color: '#3b82f6', score: 50 },
                moscow: { category: 'should', label: 'S - Debería Tener', color: '#3b82f6', score: 75 },
                rice: { score: 5, priority: 'medium', color: '#f59e0b' },
                impactEffort: { quadrant: 'fill_ins', label: '📝 Rellenos', color: '#f59e0b', score: 0 },
                frequencyImpact: { riskScore: 6, color: '#f59e0b' }
            },
            recommendation: { priority: 'medium', label: '⚡ Prioridad Media', color: '#f59e0b' },
            riskLevel: 'medium',
            aiExplanation: ['ℹ️ No se pudo analizar la tarea']
        };
    }

    /**
     * Analiza todas las tareas de un proyecto y devuelve ranking
     */
    analyzeProject(project) {
        if (!project || !project.tasks || project.tasks.length === 0) {
            return { tasks: [], summary: {} };
        }

        const analyses = project.tasks.map(task => this.analyzeTask(task, project.tasks));

        // Ordenar por prioridad (high > medium > low)
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        analyses.sort((a, b) => {
            const priorityDiff = priorityOrder[a.recommendation.priority] - priorityOrder[b.recommendation.priority];
            if (priorityDiff !== 0) return priorityDiff;

            // Si tienen misma prioridad, ordenar por score
            return b.methods.eisenhower.score - a.methods.eisenhower.score;
        });

        // Calcular resumen
        const summary = {
            total: analyses.length,
            high: analyses.filter(a => a.recommendation.priority === 'high').length,
            medium: analyses.filter(a => a.recommendation.priority === 'medium').length,
            low: analyses.filter(a => a.recommendation.priority === 'low').length,
            highRisk: analyses.filter(a => a.riskLevel === 'high').length,
            overdue: analyses.filter(a => a.methods.eisenhower.urgent && a.methods.eisenhower.important).length,
            avgConfidence: analyses.reduce((sum, a) => sum + a.confidence, 0) / analyses.length
        };

        return { tasks: analyses, summary };
    }
}

// ============================================================
// 🎨 CONSTRUCTOR DE UI
// ============================================================
class PriorityUIBuilder {
    constructor(engine) {
        this.engine = engine;
        this.currentMethod = CONFIG.METHODS.EISENHOWER;
        this.currentProject = null;
        this.analysis = null;
    }

    /**
     * Crea el modal principal
     */
    createMainModal(project) {
        this.currentProject = project;
        this.analysis = this.engine.analyzeProject(project);

        // Eliminar modal anterior
        const existing = document.getElementById('taskPrioritizerModal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'taskPrioritizerModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
            z-index: 1000000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            animation: fadeIn 0.3s ease;
        `;

        modal.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                border-radius: 24px;
                width: 95%;
                max-width: 1400px;
                max-height: 90vh;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                border: 2px solid rgba(139, 92, 246, 0.3);
                box-shadow: 0 40px 80px rgba(0,0,0,0.5);
            ">
                ${this.buildHeader()}
                ${this.buildMethodSelector()}
                <div id="priorityContent" style="flex: 1; overflow-y: auto; padding: 30px;">
                    ${this.buildContent()}
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.attachEventListeners();
    }

    buildHeader() {
        return `
            <div style="
                padding: 25px 30px;
                background: linear-gradient(90deg, rgba(139,92,246,0.1), rgba(59,130,246,0.1));
                border-bottom: 1px solid rgba(139, 92, 246, 0.2);
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <div>
                    <h2 style="margin: 0 0 8px 0; color: white; font-size: 24px;">
                        🎯 Priorización Inteligente con IA
                    </h2>
                    <p style="margin: 0; color: #94a3b8; font-size: 14px;">
                        ${this.currentProject?.name || 'Proyecto'} • ${this.analysis?.summary?.total || 0} tareas analizadas
                    </p>
                </div>
                <div style="display: flex; gap: 15px; align-items: center;">
                    <div style="
                        background: rgba(16, 185, 129, 0.1);
                        border: 1px solid #10b981;
                        padding: 8px 16px;
                        border-radius: 20px;
                        color: #10b981;
                        font-size: 13px;
                    ">
                        🤖 IA Activa • Confianza: ${Math.round((this.analysis?.summary?.avgConfidence || 0) * 100)}%
                    </div>
                    <button onclick="document.getElementById('taskPrioritizerModal').remove()" style="
                        background: rgba(239, 68, 68, 0.1);
                        border: 1px solid rgba(239, 68, 68, 0.3);
                        color: #ef4444;
                        width: 40px;
                        height: 40px;
                        border-radius: 12px;
                        cursor: pointer;
                        font-size: 18px;
                    ">✕</button>
                </div>
            </div>
        `;
    }

    buildMethodSelector() {
        const methods = [
            { id: 'eisenhower', label: '🎯 Eisenhower', desc: 'Urgente/Importante' },
            { id: 'moscow', label: '📋 MoSCoW', desc: 'Must/Should/Could/Wont' },
            { id: 'rice', label: '🧪 RICE', desc: 'Reach/Impact/Confidence/Effort' },
            { id: 'impact_effort', label: '⚡ Impacto/Esfuerzo', desc: 'Matriz 2x2' },
            { id: 'frequency_impact', label: '📊 Frecuencia/Impacto', desc: 'Gestión de riesgos' }
        ];

        return `
            <div style="
                padding: 20px 30px;
                background: rgba(0, 0, 0, 0.2);
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                display: flex;
                gap: 12px;
                overflow-x: auto;
            ">
                ${methods.map(m => `
                    <button class="method-btn" data-method="${m.id}" style="
                        background: ${m.id === this.currentMethod ? 'linear-gradient(135deg, #8b5cf6, #6d28d9)' : 'rgba(255,255,255,0.05)'};
                        border: 1px solid ${m.id === this.currentMethod ? '#8b5cf6' : 'rgba(255,255,255,0.1)'};
                        color: ${m.id === this.currentMethod ? 'white' : '#94a3b8'};
                        padding: 12px 20px;
                        border-radius: 12px;
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: 600;
                        white-space: nowrap;
                        transition: all 0.2s;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 4px;
                    ">
                        <span>${m.label}</span>
                        <span style="font-size: 11px; opacity: 0.8; font-weight: 400;">${m.desc}</span>
                    </button>
                `).join('')}
            </div>
        `;
    }

    buildContent() {
        switch (this.currentMethod) {
            case CONFIG.METHODS.EISENHOWER:
                return this.buildEisenhowerView();
            case CONFIG.METHODS.MOSCOW:
                return this.buildMoSCoWView();
            case CONFIG.METHODS.RICE:
                return this.buildRICEView();
            case CONFIG.METHODS.IMPACT_EFFORT:
                return this.buildImpactEffortView();
            case CONFIG.METHODS.FREQUENCY_IMPACT:
                return this.buildFrequencyImpactView();
            default:
                return this.buildEisenhowerView();
        }
    }

    buildEisenhowerView() {
        const quadrants = {
            do_first: { label: '🔥 Hacer Ya', color: '#ef4444', tasks: [] },
            schedule: { label: '📅 Programar', color: '#3b82f6', tasks: [] },
            delegate: { label: '🤝 Delegar', color: '#f59e0b', tasks: [] },
            eliminate: { label: '🗑️ Eliminar', color: '#6b7280', tasks: [] }
        };

        // Clasificar tareas
        this.analysis.tasks.forEach(analysis => {
            const q = analysis.methods.eisenhower.quadrant;
            quadrants[q].tasks.push(analysis);
        });

        return `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                ${Object.entries(quadrants).map(([key, q]) => `
                    <div style="
                        background: ${q.color}10;
                        border: 2px solid ${q.color}40;
                        border-radius: 16px;
                        padding: 20px;
                        min-height: 300px;
                    ">
                        <div style="
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 15px;
                            padding-bottom: 10px;
                            border-bottom: 1px solid ${q.color}30;
                        ">
                            <h3 style="margin: 0; color: ${q.color}; font-size: 18px;">
                                ${q.label}
                            </h3>
                            <span style="
                                background: ${q.color}20;
                                color: ${q.color};
                                padding: 4px 12px;
                                border-radius: 20px;
                                font-size: 12px;
                                font-weight: bold;
                            ">${q.tasks.length}</span>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            ${q.tasks.length === 0 ? `
                                <p style="color: #64748b; font-style: italic; text-align: center; padding: 20px;">
                                    Sin tareas
                                </p>
                            ` : q.tasks.map(analysis => this.buildTaskCard(analysis, key)).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    buildMoSCoWView() {
        const categories = {
            must: { label: 'M - Debe Tener', color: '#ef4444', tasks: [] },
            should: { label: 'S - Debería Tener', color: '#3b82f6', tasks: [] },
            could: { label: 'C - Podría Tener', color: '#f59e0b', tasks: [] },
            wont: { label: 'W - No Hará', color: '#6b7280', tasks: [] }
        };

        this.analysis.tasks.forEach(analysis => {
            const c = analysis.methods.moscow.category;
            categories[c].tasks.push(analysis);
        });

        return `
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
                ${Object.entries(categories).map(([key, cat]) => `
                    <div style="
                        background: ${cat.color}10;
                        border: 2px solid ${cat.color}40;
                        border-radius: 16px;
                        padding: 20px;
                    ">
                        <div style="
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 15px;
                            padding-bottom: 10px;
                            border-bottom: 1px solid ${cat.color}30;
                        ">
                            <h3 style="margin: 0; color: ${cat.color}; font-size: 18px;">
                                ${cat.label}
                            </h3>
                            <span style="
                                background: ${cat.color}20;
                                color: ${cat.color};
                                padding: 4px 12px;
                                border-radius: 20px;
                                font-size: 12px;
                                font-weight: bold;
                            ">${cat.tasks.length}</span>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            ${cat.tasks.length === 0 ? `
                                <p style="color: #64748b; font-style: italic; text-align: center; padding: 20px;">
                                    Sin tareas
                                </p>
                            ` : cat.tasks.map(analysis => this.buildTaskCard(analysis, key)).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    buildRICEView() {
        // Ordenar por score RICE (mayor a menor)
        const sorted = [...this.analysis.tasks].sort((a, b) => b.methods.rice.score - a.methods.rice.score);

        return `
            <div style="
                background: rgba(255, 255, 255, 0.03);
                border-radius: 16px;
                padding: 20px;
            ">
                <div style="
                    display: grid;
                    grid-template-columns: 50px 1fr 100px 100px 100px 100px 100px;
                    gap: 15px;
                    padding: 15px;
                    background: rgba(139, 92, 246, 0.1);
                    border-radius: 12px;
                    margin-bottom: 15px;
                    font-weight: bold;
                    color: #a78bfa;
                    font-size: 13px;
                ">
                    <div>#</div>
                    <div>Tarea</div>
                    <div style="text-align: center;">Reach</div>
                    <div style="text-align: center;">Impact</div>
                    <div style="text-align: center;">Confidence</div>
                    <div style="text-align: center;">Effort</div>
                    <div style="text-align: center;">Score</div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    ${sorted.map((analysis, idx) => {
                        const rice = analysis.methods.rice;
                        return `
                            <div style="
                                display: grid;
                                grid-template-columns: 50px 1fr 100px 100px 100px 100px 100px;
                                gap: 15px;
                                padding: 15px;
                                background: rgba(255, 255, 255, 0.03);
                                border-radius: 12px;
                                border-left: 4px solid ${rice.color};
                                align-items: center;
                            ">
                                <div style="color: #94a3b8; font-weight: bold;">${idx + 1}</div>
                                <div>
                                    <div style="color: white; font-weight: 600; margin-bottom: 4px;">
                                        ${analysis.task.name}
                                    </div>
                                    <div style="font-size: 11px; color: #64748b;">
                                        ${analysis.aiExplanation[0] || ''}
                                    </div>
                                </div>
                                <div style="text-align: center; color: #94a3b8;">${rice.reach}</div>
                                <div style="text-align: center; color: #94a3b8;">${rice.impact}</div>
                                <div style="text-align: center; color: #94a3b8;">${Math.round(rice.confidence * 100)}%</div>
                                <div style="text-align: center; color: #94a3b8;">${rice.effort}h</div>
                                <div style="
                                    text-align: center;
                                    background: ${rice.color}20;
                                    color: ${rice.color};
                                    padding: 6px 12px;
                                    border-radius: 20px;
                                    font-weight: bold;
                                    font-size: 14px;
                                ">${rice.score}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    buildImpactEffortView() {
        const quadrants = {
            quick_wins: { label: '⚡ Quick Wins', color: '#10b981', tasks: [] },
            major_projects: { label: '🎯 Proyectos Mayores', color: '#3b82f6', tasks: [] },
            fill_ins: { label: '📝 Rellenos', color: '#f59e0b', tasks: [] },
            thankless: { label: '⚠️ Evitar', color: '#6b7280', tasks: [] }
        };

        this.analysis.tasks.forEach(analysis => {
            const q = analysis.methods.impactEffort.quadrant;
            quadrants[q].tasks.push(analysis);
        });

        return `
            <div style="
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                position: relative;
            ">
                <!-- Ejes -->
                <div style="position: absolute; top: 50%; left: 0; right: 0; height: 2px; background: rgba(255,255,255,0.1); z-index: 0;"></div>
                <div style="position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: rgba(255,255,255,0.1); z-index: 0;"></div>

                ${Object.entries(quadrants).map(([key, q]) => `
                    <div style="
                        background: ${q.color}10;
                        border: 2px solid ${q.color}40;
                        border-radius: 16px;
                        padding: 20px;
                        min-height: 300px;
                        position: relative;
                        z-index: 1;
                    ">
                        <div style="
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 15px;
                            padding-bottom: 10px;
                            border-bottom: 1px solid ${q.color}30;
                        ">
                            <h3 style="margin: 0; color: ${q.color}; font-size: 18px;">
                                ${q.label}
                            </h3>
                            <span style="
                                background: ${q.color}20;
                                color: ${q.color};
                                padding: 4px 12px;
                                border-radius: 20px;
                                font-size: 12px;
                                font-weight: bold;
                            ">${q.tasks.length}</span>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            ${q.tasks.length === 0 ? `
                                <p style="color: #64748b; font-style: italic; text-align: center; padding: 20px;">
                                    Sin tareas
                                </p>
                            ` : q.tasks.map(analysis => this.buildTaskCard(analysis, key)).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div style="
                margin-top: 20px;
                padding: 15px;
                background: rgba(139, 92, 246, 0.05);
                border-radius: 12px;
                text-align: center;
                color: #94a3b8;
                font-size: 13px;
            ">
                💡 <strong>Quick Wins:</strong> Alto impacto, bajo esfuerzo • 
                <strong>Proyectos Mayores:</strong> Alto impacto, alto esfuerzo • 
                <strong>Rellenos:</strong> Bajo impacto, bajo esfuerzo • 
                <strong>Evitar:</strong> Bajo impacto, alto esfuerzo
            </div>
        `;
    }

    buildFrequencyImpactView() {
        // Ordenar por riskScore (mayor a menor)
        const sorted = [...this.analysis.tasks].sort((a, b) => 
            b.methods.frequencyImpact.riskScore - a.methods.frequencyImpact.riskScore
        );

        return `
            <div style="
                background: rgba(255, 255, 255, 0.03);
                border-radius: 16px;
                padding: 20px;
            ">
                <div style="
                    display: grid;
                    grid-template-columns: 50px 1fr 150px 150px 100px 1fr;
                    gap: 15px;
                    padding: 15px;
                    background: rgba(239, 68, 68, 0.1);
                    border-radius: 12px;
                    margin-bottom: 15px;
                    font-weight: bold;
                    color: #fca5a5;
                    font-size: 13px;
                ">
                    <div>#</div>
                    <div>Tarea</div>
                    <div style="text-align: center;">Frecuencia</div>
                    <div style="text-align: center;">Impacto</div>
                    <div style="text-align: center;">Riesgo</div>
                    <div>Explicación IA</div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    ${sorted.map((analysis, idx) => {
                        const fi = analysis.methods.frequencyImpact;
                        return `
                            <div style="
                                display: grid;
                                grid-template-columns: 50px 1fr 150px 150px 100px 1fr;
                                gap: 15px;
                                padding: 15px;
                                background: rgba(255, 255, 255, 0.03);
                                border-radius: 12px;
                                border-left: 4px solid ${fi.color};
                                align-items: center;
                            ">
                                <div style="color: #94a3b8; font-weight: bold;">${idx + 1}</div>
                                <div style="color: white; font-weight: 600;">
                                    ${analysis.task.name}
                                </div>
                                <div style="text-align: center; color: #94a3b8;">
                                    ${fi.frequencyLabel}
                                </div>
                                <div style="text-align: center; color: #94a3b8;">
                                    ${fi.impactLabel}
                                </div>
                                <div style="
                                    text-align: center;
                                    background: ${fi.color}20;
                                    color: ${fi.color};
                                    padding: 6px 12px;
                                    border-radius: 20px;
                                    font-weight: bold;
                                ">${fi.riskScore}</div>
                                <div style="font-size: 12px; color: #64748b;">
                                    ${analysis.aiExplanation[0] || ''}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    buildTaskCard(analysis, quadrant) {
        const task = analysis.task;
        const metrics = this.engine.calculateMetrics(task, this.currentProject.tasks);

        return `
            <div style="
                background: rgba(255, 255, 255, 0.05);
                border-radius: 12px;
                padding: 12px;
                border-left: 4px solid ${analysis.recommendation.color};
                cursor: pointer;
                transition: all 0.2s;
            " onmouseover="this.style.background='rgba(255,255,255,0.08)'; this.style.transform='translateX(4px)'"
               onmouseout="this.style.background='rgba(255,255,255,0.05)'; this.style.transform='translateX(0)'">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                    <div style="flex: 1;">
                        <div style="color: white; font-weight: 600; font-size: 14px; margin-bottom: 4px;">
                            ${task.name}
                        </div>
                        <div style="font-size: 11px; color: #64748b;">
                            ${analysis.aiExplanation[0] || ''}
                        </div>
                    </div>
                    <div style="
                        background: ${analysis.recommendation.color}20;
                        color: ${analysis.recommendation.color};
                        padding: 4px 10px;
                        border-radius: 20px;
                        font-size: 11px;
                        font-weight: bold;
                    ">
                        ${analysis.recommendation.priority === 'high' ? '🔥' : analysis.recommendation.priority === 'medium' ? '⚡' : '📝'}
                    </div>
                </div>
                <div style="display: flex; gap: 10px; font-size: 11px; color: #94a3b8;">
                    ${metrics.isOverdue ? `<span style="color: #ef4444;">⚠️ Vencida</span>` : ''}
                    ${metrics.progressPercentage > 0 ? `<span>📊 ${metrics.progressPercentage}%</span>` : ''}
                    ${task.estimatedTime ? `<span>⏱️ ${task.estimatedTime}h</span>` : ''}
                    ${metrics.dependencyCount > 0 ? `<span>🔗 ${metrics.dependencyCount}</span>` : ''}
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Cambiar método
        document.querySelectorAll('.method-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentMethod = btn.dataset.method;
                this.createMainModal(this.currentProject);
            });
        });
    }
}

// ============================================================
// 🔗 CAPA DE INTEGRACIÓN
// ============================================================
class IntegrationLayer {
    constructor(engine, ui) {
        this.engine = engine;
        this.ui = ui;
        this.priorities = this.loadPriorities();
    }

    loadPriorities() {
        try {
            const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            console.warn('Error cargando prioridades:', e);
            return {};
        }
    }

    savePriorities() {
        try {
            localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(this.priorities));
        } catch (e) {
            console.warn('Error guardando prioridades:', e);
        }
    }

    saveTaskPriority(taskId, priority, method) {
        if (!this.priorities[taskId]) {
            this.priorities[taskId] = {};
        }
        this.priorities[taskId] = {
            priority,
            method,
            timestamp: Date.now()
        };
        this.savePriorities();
    }

    getTaskPriority(taskId) {
        return this.priorities[taskId] || null;
    }

    /**
     * Abre el módulo de priorización
     */
    openPrioritizer() {
        if (typeof projects === 'undefined' || typeof currentProjectIndex === 'undefined') {
            alert('❌ El sistema aún no está listo');
            return;
        }

        const project = projects[currentProjectIndex];
        if (!project) {
            alert('❌ No hay proyecto seleccionado');
            return;
        }

        if (!project.tasks || project.tasks.length === 0) {
            alert('⚠️ El proyecto no tiene tareas para priorizar');
            return;
        }

        this.ui.createMainModal(project);
    }
}

// ============================================================
// 🚀 INICIALIZACIÓN
// ============================================================
const engine = new AIPrioritizationEngine();
const ui = new PriorityUIBuilder(engine);
const integration = new IntegrationLayer(engine, ui);

// Exponer función global
window.openTaskPrioritizer = function() {
    integration.openPrioritizer();
};

// Agregar botón al sidebar
function addSidebarButton() {
    const sidebar = document.querySelector('aside, #sidebar, .sidebar');
    if (!sidebar) {
        setTimeout(addSidebarButton, 500);
        return;
    }

    if (document.getElementById('taskPrioritizerBtn')) return;

    const btn = document.createElement('button');
    btn.id = 'taskPrioritizerBtn';
    btn.innerHTML = '🎯 Priorización IA';
    btn.style.cssText = `
        width: calc(100% - 24px);
        background: linear-gradient(135deg, #8b5cf6, #6d28d9);
        border: none;
        color: white;
        padding: 12px 16px;
        border-radius: 12px;
        cursor: pointer;
        font-weight: bold;
        font-size: 14px;
        margin: 10px 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.3s;
    `;

    btn.addEventListener('mouseover', () => {
        btn.style.transform = 'translateY(-2px)';
        btn.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.4)';
    });

    btn.addEventListener('mouseout', () => {
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = 'none';
    });

    btn.addEventListener('click', () => {
        window.openTaskPrioritizer();
    });

    sidebar.appendChild(btn);
    console.log('✅ Botón de Priorización IA agregado al sidebar');
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addSidebarButton);
} else {
    addSidebarButton();
}

console.log('✅ Task Prioritizer AI Module cargado correctamente');
console.log('📌 Uso: window.openTaskPrioritizer() o botón en sidebar');

})();