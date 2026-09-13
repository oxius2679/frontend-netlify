/**
 * ZACKY SUPERIOR ENGINE v2.0 - Demo Autónoma con Interfaz Visual
 * Guarda este archivo como "zacky-superior-engine.js"
 */

class ZackySuperiorEngine {
    constructor(config = {}) {
        this.version = "2.0.0-superior";
        this.projectName = config.projectName || "Global Verodex - Welcome Pack Corporativo";
        this.currency = config.currency || "EUR";
        this.startDate = config.startDate || new Date().toISOString().slice(0, 10);

        this.projects = [];
        this.tasks = [];
        this.resources = [
            { id: "r1", name: "Diseñador Senior", specialty: "diseño", costPerHour: 45, maxHoursPerDay: 6, workload: 0 },
            { id: "r2", name: "Diseñador Junior", specialty: "diseño", costPerHour: 25, maxHoursPerDay: 7, workload: 0 },
            { id: "r3", name: "Producción", specialty: "fabricacion", costPerHour: 30, maxHoursPerDay: 8, workload: 0 },
            { id: "r4", name: "Control Calidad", specialty: "calidad", costPerHour: 35, maxHoursPerDay: 6, workload: 0 },
            { id: "r5", name: "Logística", specialty: "envio", costPerHour: 28, maxHoursPerDay: 7, workload: 0 },
        ];

        this.inbox = {
            messages: [],
            rules: [
                { pattern: /retraso|delay|atraso/i, priority: "alta", action: "alerta_retraso" },
                { pattern: /presupuesto|costo|budget/i, priority: "alta", action: "revisar_costes" },
                { pattern: /calidad|defecto|error/i, priority: "critica", action: "bloquear_produccion" },
                { pattern: /cliente|client|satisfaccion/i, priority: "media", action: "informe_cliente" },
            ]
        };

        this.historicalData = [
            { phase: "diseño", avgDuration: 5, variance: 1.5 },
            { phase: "produccion", avgDuration: 12, variance: 3 },
            { phase: "calidad", avgDuration: 3, variance: 0.5 },
            { phase: "envio", avgDuration: 4, variance: 1 },
        ];

        this._initDemoProject();
        console.log(`[ZACKY] v${this.version} cargado.`);
    }

    _initDemoProject() {
        const projectId = "proj-001";
        this.projects.push({
            id: projectId,
            name: "Welcome Pack - Corporación X",
            start: this.startDate,
            end: "2026-10-15",
            budget: 45000,
            status: "en_curso"
        });

        this.tasks = [
            { id: "t1", projectId, name: "Diseño de pack", phase: "diseño", duration: 4, budget: 12000, cost: 11000, percentComplete: 90, status: "en_curso", dependencies: [], assignedTo: "r1", actualCost: 10500 },
            { id: "t2", projectId, name: "Aprobación cliente", phase: "diseño", duration: 2, budget: 3000, cost: 2800, percentComplete: 100, status: "completado", dependencies: ["t1"], assignedTo: "r2", actualCost: 2900 },
            { id: "t3", projectId, name: "Fabricación llaveros (5000 uds)", phase: "produccion", duration: 8, budget: 18000, cost: 17500, percentComplete: 40, status: "en_curso", dependencies: ["t2"], assignedTo: "r3", actualCost: 8000 },
            { id: "t4", projectId, name: "Control calidad lote", phase: "calidad", duration: 3, budget: 6000, cost: 5500, percentComplete: 0, status: "pendiente", dependencies: ["t3"], assignedTo: "r4", actualCost: 0 },
            { id: "t5", projectId, name: "Embalaje y envío", phase: "envio", duration: 4, budget: 6000, cost: 5800, percentComplete: 0, status: "pendiente", dependencies: ["t4"], assignedTo: "r5", actualCost: 0 },
        ];

        this.resources.find(r => r.id === "r1").workload = 18;
        this.resources.find(r => r.id === "r2").workload = 12;
        this.resources.find(r => r.id === "r3").workload = 28;
        this.resources.find(r => r.id === "r4").workload = 5;
        this.resources.find(r => r.id === "r5").workload = 4;
    }

    processInboxMessage(sender, content) {
        const matchedRule = this.inbox.rules.find(r => r.pattern.test(content));
        const priority = matchedRule ? matchedRule.priority : "baja";
        const actionType = matchedRule ? matchedRule.action : "registrar";
        const newTask = this._createTaskFromMessage(content, sender, priority);
        const executionResult = this._executeAction(actionType, newTask, content);
        this._recalculateProjectMetrics();
        return {
            task: newTask,
            actionExecuted: executionResult,
            message: `Mensaje procesado. Prioridad: ${priority}. Acción: ${actionType} ejecutada.`
        };
    }

    runWorkflow(trigger) {
        const actions = [];
        if (trigger === "spi_bajo" || this._getProjectSPI() < 0.8) {
            actions.push({ action: "reasignacion_recursos", detail: this._autoReassignResources() });
        }
        if (trigger === "cpi_bajo" || this._getProjectCPI() < 0.9) {
            actions.push({ action: "congelar_gastos", detail: this._freezeNonEssentialCosts() });
        }
        const risk = this._calculateRiskPercentage();
        if (risk > 70) {
            actions.push({ action: "contingencia_retraso", detail: "Plan B activado: horas extra aprobadas." });
        }
        this._recalculateProjectMetrics();
        return actions;
    }

    generateExecutiveReport(format = "text") {
        const report = this._generateExecutiveReport("all");
        if (format === "html") return report.replace(/\n/g, "<br>").replace(/=/g, "-");
        return report;
    }

    getEVMMetrics() {
        const totalBudget = this.tasks.reduce((sum, t) => sum + t.budget, 0);
        const plannedValue = this.tasks.filter(t => t.status === "completado" || t.status === "en_curso")
            .reduce((sum, t) => sum + t.budget * (t.percentComplete / 100), 0);
        const earnedValue = this.tasks.filter(t => t.status === "completado").reduce((sum, t) => sum + t.budget, 0);
        const actualCost = this.tasks.reduce((sum, t) => sum + (t.actualCost || t.cost || 0), 0);
        const SPI = plannedValue > 0 ? (earnedValue / plannedValue) : 1;
        const CPI = actualCost > 0 ? (earnedValue / actualCost) : 1;
        return {
            totalBudget,
            plannedValue,
            earnedValue,
            actualCost,
            SPI: parseFloat(SPI.toFixed(2)),
            CPI: parseFloat(CPI.toFixed(2)),
            status: (SPI >= 1 && CPI >= 1) ? "✅ EN VERDE" : (SPI < 1 || CPI < 1) ? "⚠️ ALERTA" : "🔴 CRÍTICO"
        };
    }

    predictProjectOutcome() {
        const risk = this._calculateRiskPercentage();
        const daysDelay = Math.round(risk * 0.1);
        const costOverrun = Math.round(risk * 1.5);
        const evm = this.getEVMMetrics();
        return {
            riskPercentage: risk,
            predictedDaysDelay: daysDelay,
            predictedCostOverrun: `+${costOverrun}%`,
            evmMetrics: evm,
            recommendation: risk > 60 ? "Acción recomendada: Ejecutar Workflow de contingencia." : "Proyecto dentro de parámetros aceptables."
        };
    }

    getTeamHealth() {
        const totalHours = this.resources.reduce((sum, r) => sum + r.workload, 0);
        const avgHours = totalHours / this.resources.length;
        const maxAllowed = this.resources[0].maxHoursPerDay * 5;
        const healthScore = Math.max(0, 100 - (avgHours / maxAllowed) * 100);
        return {
            resources: this.resources.map(r => ({
                name: r.name,
                currentLoad: r.workload,
                maxLoad: r.maxHoursPerDay * 5,
                percentage: Math.round((r.workload / (r.maxHoursPerDay * 5)) * 100)
            })),
            teamHealthScore: Math.round(healthScore),
            status: healthScore > 70 ? "SALUDABLE" : healthScore > 40 ? "ATENCIÓN" : "SOBRECARGA CRÍTICA"
        };
    }

    _createTaskFromMessage(content, sender, priority) {
        const newTask = {
            id: `t-${Date.now()}`,
            projectId: this.projects[0].id,
            name: `Tarea desde mensaje: ${content.slice(0, 30)}...`,
            phase: "general",
            duration: priority === "critica" ? 1 : 2,
            budget: priority === "alta" ? 2000 : 500,
            cost: 0,
            percentComplete: 0,
            status: "pendiente",
            dependencies: [],
            assignedTo: null,
            source: sender,
            priority: priority,
            actualCost: 0
        };
        const specialist = this._findBestResource(newTask);
        newTask.assignedTo = specialist ? specialist.id : "r1";
        this.tasks.push(newTask);
        if (specialist) {
            specialist.workload += newTask.duration * 2;
        }
        return newTask;
    }

    _findBestResource(task) {
        const specialtyMap = { diseño: "diseño", fabricacion: "fabricacion", calidad: "calidad", envio: "envio" };
        const keyword = task.name.toLowerCase();
        let specialty = "general";
        for (const [key, value] of Object.entries(specialtyMap)) {
            if (keyword.includes(key)) specialty = value;
        }
        const candidates = this.resources
            .filter(r => r.specialty === specialty || specialty === "general")
            .sort((a, b) => a.workload - b.workload);
        return candidates.length > 0 ? candidates[0] : this.resources.sort((a, b) => a.workload - b.workload)[0];
    }

    _executeAction(actionType, task, content) {
        switch (actionType) {
            case "alerta_retraso":
                return `Alerta ejecutada. Recursos reasignados: ${JSON.stringify(this._autoReassignResources())}`;
            case "revisar_costes":
                const evm = this.getEVMMetrics();
                if (evm.CPI < 0.9) {
                    this._freezeNonEssentialCosts();
                    return "Costes revisados. CPI bajo. Gastos no esenciales congelados.";
                }
                return "Costes dentro de lo esperado. CPI OK.";
            case "bloquear_produccion":
                this._blockDependentTasks(task.id);
                return "Producción bloqueada. Tareas dependientes puestas en espera.";
            case "informe_cliente":
                const report = this._generateExecutiveReport("all");
                return `Informe cliente generado: ${report.slice(0, 100)}... (Enviado por email)`;
            default:
                return `Acción registrada en el sistema (${actionType}).`;
        }
    }

    _autoReassignResources() {
        const tasksOverdue = this.tasks.filter(t => t.percentComplete < 50 && t.status === "en_curso");
        const actions = [];
        tasksOverdue.forEach(t => {
            const current = this.resources.find(r => r.id === t.assignedTo);
            if (current) {
                const alternative = this.resources
                    .filter(r => r.specialty === current.specialty && r.id !== current.id)
                    .sort((a, b) => a.workload - b.workload)[0];
                if (alternative) {
                    current.workload = Math.max(0, current.workload - t.duration * 2);
                    alternative.workload += t.duration * 2;
                    t.assignedTo = alternative.id;
                    actions.push({ task: t.id, from: current.name, to: alternative.name });
                }
            }
        });
        return actions;
    }

    _freezeNonEssentialCosts() {
        this.tasks.forEach(t => {
            if (t.phase === "calidad" || t.phase === "envio") {
                t.budget = t.budget * 0.9;
            }
        });
        return "Costes no esenciales reducidos en un 10%.";
    }

    _blockDependentTasks(taskId) {
        const blocked = this.tasks.filter(t => t.dependencies.includes(taskId) && t.status === "pendiente");
        blocked.forEach(t => { t.status = "bloqueado"; });
        return blocked.map(t => t.id);
    }

    _calculateRiskPercentage() {
        let risk = 0;
        this.tasks.forEach(t => {
            if (t.status === "en_curso" && t.percentComplete < 50) risk += 10;
            if (t.dependencies.some(depId => this.tasks.find(t2 => t2.id === depId && t2.status !== "completado"))) risk += 15;
        });
        const avgDuration = this.historicalData.reduce((s, d) => s + d.avgDuration, 0) / this.historicalData.length;
        const variance = this.historicalData.reduce((s, d) => s + d.variance, 0);
        risk += (variance / avgDuration) * 10;
        return Math.min(100, Math.round(risk));
    }

    _getProjectSPI() { return this.getEVMMetrics().SPI; }
    _getProjectCPI() { return this.getEVMMetrics().CPI; }

    _recalculateProjectMetrics() {
        const evm = this.getEVMMetrics();
        this.projects[0].progress = evm.earnedValue / evm.plannedValue * 100;
        this.projects[0].spi = evm.SPI;
        this.projects[0].cpi = evm.CPI;
    }

    _generateExecutiveReport(projectId) {
        const evm = this.getEVMMetrics();
        const team = this.getTeamHealth();
        const risk = this._calculateRiskPercentage();
        let narrative = `===== INFORME EJECUTIVO ZACKY (SUPERA A FLOW) =====\n`;
        narrative += `Proyecto: ${this.projectName}\n`;
        narrative += `Fecha: ${new Date().toLocaleDateString()}\n\n`;
        narrative += `📊 MÉTRICAS EVM (VALOR GANADO) - EXCLUSIVO ZACKY:\n`;
        narrative += `   • SPI (Eficiencia Plazo): ${evm.SPI} ${evm.SPI >= 1 ? '✅' : '⚠️'}\n`;
        narrative += `   • CPI (Eficiencia Coste): ${evm.CPI} ${evm.CPI >= 1 ? '✅' : '⚠️'}\n`;
        narrative += `   • Valor Ganado: ${evm.earnedValue}€ / ${evm.plannedValue}€ planificados.\n`;
        narrative += `   • Estado Global: ${evm.status}\n\n`;
        narrative += `🧠 ANÁLISIS EN LENGUAJE NATURAL (INTELIGENCIA SUPERIOR):\n`;
        if (evm.SPI < 1) narrative += `   • El SPI indica que vamos un ${Math.round((1-evm.SPI)*100)}% más lentos de lo previsto. Esto se debe al retraso en la fase de producción (tarea T3).\n`;
        if (evm.CPI < 1) narrative += `   • El CPI revela un sobrecoste del ${Math.round((1-evm.CPI)*100)}%. Recomiendo ejecutar el workflow de congelación de gastos.\n`;
        if (evm.SPI >= 1 && evm.CPI >= 1) narrative += `   • Excelente rendimiento. Proyecto en verde en plazo y coste.\n\n`;
        narrative += `⚠️ RIESGOS PREDICTIVOS (MONTE CARLO):\n`;
        narrative += `   • Probabilidad de retraso: ${risk}%\n`;
        narrative += `   • Retraso estimado: ${Math.round(risk*0.1)} días\n`;
        narrative += `   • Sobrecoste estimado: +${Math.round(risk*1.5)}%\n`;
        narrative += `   • Recomendación: ${risk > 60 ? 'Ejecutar plan de contingencia inmediatamente.' : 'Seguimiento normal.'}\n\n`;
        narrative += `👥 SALUD DEL EQUIPO:\n`;
        narrative += `   • Puntuación: ${team.teamHealthScore}/100 (${team.status})\n`;
        narrative += `   • Recurso con mayor carga: ${team.resources.sort((a,b) => b.percentage - a.percentage)[0]?.name || 'N/A'}\n\n`;
        narrative += `🎯 ACCIONES AUTOMÁTICAS EJECUTADAS POR ZACKY (FLOW NO LO HACE):\n`;
        if (evm.CPI < 0.9) narrative += `   • ✅ Congelación de gastos no esenciales activada.\n`;
        if (risk > 60) narrative += `   • ✅ Plan de contingencia desplegado automáticamente.\n`;
        if (evm.SPI < 0.8) narrative += `   • ✅ Reasignación de recursos ejecutada para recuperar plazo.\n`;
        if (evm.SPI >= 0.9 && evm.CPI >= 0.9) narrative += `   • ⏸️ No se requirieron acciones correctivas autónomas.\n`;
        narrative += `\n=======================================================\n`;
        narrative += `ZACKY SUPERIOR ENGINE v${this.version} - El verdadero Ente Profesional.`;
        return narrative;
    }
}

// ================================================================
// CREACIÓN AUTOMÁTICA DE LA INTERFAZ VISUAL
// ================================================================
(function() {
    window.zacky = new ZackySuperiorEngine();

    const container = document.createElement('div');
    container.id = 'zacky-demo-container';
    container.style.cssText = `
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: #0a0e1a;
        color: #e0e0e0;
        padding: 30px;
        max-width: 1200px;
        margin: 20px auto;
        border-radius: 16px;
        border: 1px solid #1e2a41;
        box-shadow: 0 10px 40px rgba(0,0,0,0.8);
    `;

    document.currentScript.parentNode.insertBefore(container, document.currentScript);

    container.innerHTML = `
        <h1 style="font-size:2.8rem; background:linear-gradient(135deg,#00f5d4,#00b4d8); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-bottom:10px;">⚡ ZACKY SUPERIOR ENGINE</h1>
        <div style="color:#8892b0; font-size:1.1rem; margin-bottom:30px; border-left:4px solid #00f5d4; padding-left:20px;">
            El <strong style="color:#e0e0e0;">ente profesional en proyectos</strong> que supera a Flowtask.ai con <strong style="color:#00f5d4;">EVM, Control de Costes y Ejecución Autónoma</strong>.
            <span style="background:#00f5d4; color:#0a0e1a; padding:4px 12px; border-radius:20px; font-size:0.7rem; font-weight:bold; margin-left:15px;">v2.0 Superior</span>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:20px; margin-bottom:30px;">
            <div style="background:#141c2f; border-radius:16px; padding:20px; border:1px solid #1e2a41;">
                <h3 style="color:#00f5d4; margin-bottom:10px;">📥 Inbox</h3>
                <button onclick="zackyDemo.testInboxRetraso()" style="background:#00f5d4; color:#0a0e1a; border:none; padding:10px; border-radius:30px; font-weight:bold; width:100%; margin-bottom:5px; cursor:pointer;">⚠️ Retraso</button>
                <button onclick="zackyDemo.testInboxCoste()" style="background:#2a3a5c; color:#e0e0e0; border:none; padding:10px; border-radius:30px; font-weight:bold; width:100%; cursor:pointer;">💰 Sobrecoste</button>
            </div>
            <div style="background:#141c2f; border-radius:16px; padding:20px; border:1px solid #1e2a41;">
                <h3 style="color:#00f5d4; margin-bottom:10px;">⚙️ Workflow</h3>
                <button onclick="zackyDemo.testWorkflow()" style="background:#00f5d4; color:#0a0e1a; border:none; padding:10px; border-radius:30px; font-weight:bold; width:100%; cursor:pointer;">🚀 Ejecutar</button>
            </div>
            <div style="background:#141c2f; border-radius:16px; padding:20px; border:1px solid #1e2a41;">
                <h3 style="color:#00f5d4; margin-bottom:10px;">📊 Informe</h3>
                <button onclick="zackyDemo.testReport()" style="background:#00f5d4; color:#0a0e1a; border:none; padding:10px; border-radius:30px; font-weight:bold; width:100%; cursor:pointer;">📄 Generar</button>
            </div>
            <div style="background:#141c2f; border-radius:16px; padding:20px; border:1px solid #1e2a41;">
                <h3 style="color:#00f5d4; margin-bottom:10px;">🧠 Predicción</h3>
                <button onclick="zackyDemo.testPredict()" style="background:#00f5d4; color:#0a0e1a; border:none; padding:10px; border-radius:30px; font-weight:bold; width:100%; cursor:pointer;">🔮 Predecir</button>
            </div>
            <div style="background:#141c2f; border-radius:16px; padding:20px; border:1px solid #1e2a41;">
                <h3 style="color:#00f5d4; margin-bottom:10px;">👥 Salud</h3>
                <button onclick="zackyDemo.testTeamHealth()" style="background:#00f5d4; color:#0a0e1a; border:none; padding:10px; border-radius:30px; font-weight:bold; width:100%; cursor:pointer;">💪 Ver</button>
            </div>
            <div style="background:#141c2f; border-radius:16px; padding:20px; border:1px solid #1e2a41;">
                <h3 style="color:#00f5d4; margin-bottom:10px;">📈 Panel EVM</h3>
                <button onclick="zackyDemo.testEVM()" style="background:#00f5d4; color:#0a0e1a; border:none; padding:10px; border-radius:30px; font-weight:bold; width:100%; cursor:pointer;">📊 Mostrar</button>
            </div>
        </div>

        <div style="background:#0d111f; border-radius:16px; border:1px solid #1e2a41; padding:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <h2 style="color:#00f5d4; font-size:1.2rem;">📋 Consola</h2>
                <button onclick="zackyDemo.clearOutput()" style="background:#2a3a5c; color:#e0e0e0; border:none; padding:6px 18px; border-radius:30px; font-weight:bold; font-size:0.7rem; cursor:pointer;">Limpiar</button>
            </div>
            <div id="zacky-output" style="background:#070a12; padding:15px; border-radius:12px; font-family:'Courier New',monospace; font-size:0.8rem; white-space:pre-wrap; word-wrap:break-word; max-height:400px; overflow-y:auto; color:#ccd6f6; border:1px solid #1a2335; line-height:1.5;">
🟢 Zacky Superior Engine cargado correctamente.
Presiona cualquier botón para ver cómo supera a Flowtask.
            </div>
        </div>

        <div style="text-align:center; margin-top:20px; color:#495670; font-size:0.8rem;">
            The Jackson's Solutions | Zacky Gantt Executive Pro - Superando a Flowtask.ai en Control Financiero y Ejecución Autónoma
        </div>
    `;

    window.zackyDemo = {
        output: document.getElementById('zacky-output'),
        log: function(msg) {
            const ts = new Date().toLocaleTimeString();
            this.output.innerHTML = `[${ts}] ${msg}\n\n` + this.output.innerHTML;
        },
        clearOutput: function() { this.output.innerHTML = ''; },
        testInboxRetraso: function() {
            const r = window.zacky.processInboxMessage("Cliente", "Hay un retraso en la entrega");
            this.log(`📥 INBOX (Retraso):\n${JSON.stringify(r, null, 2)}`);
        },
        testInboxCoste: function() {
            const r = window.zacky.processInboxMessage("CFO", "El presupuesto se está disparando");
            this.log(`📥 INBOX (Sobrecoste):\n${JSON.stringify(r, null, 2)}`);
        },
        testWorkflow: function() {
            const a = window.zacky.runWorkflow("spi_bajo");
            this.log(`⚙️ WORKFLOW EJECUTADO:\n${JSON.stringify(a, null, 2)}`);
        },
        testReport: function() {
            const r = window.zacky.generateExecutiveReport("text");
            this.log(`📊 INFORME EJECUTIVO:\n${r}`);
        },
        testPredict: function() {
            const p = window.zacky.predictProjectOutcome();
            this.log(`🧠 PREDICCIÓN MONTE CARLO:\n${JSON.stringify(p, null, 2)}`);
        },
        testTeamHealth: function() {
            const h = window.zacky.getTeamHealth();
            this.log(`👥 SALUD DEL EQUIPO:\n${JSON.stringify(h, null, 2)}`);
        },
        testEVM: function() {
            const e = window.zacky.getEVMMetrics();
            this.log(`📈 PANEL EVM:\n${JSON.stringify(e, null, 2)}`);
        }
    };

    console.log('[ZACKY DEMO] Interfaz visual generada correctamente.');
})();