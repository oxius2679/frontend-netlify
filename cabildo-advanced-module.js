// ============================================================
// 📊 STORYTELLING MODULE - v5.4 (COMPLETO CON PDF)
// Módulo externo autocontenido - Narrativa Ejecutiva
// ============================================================

(function() {
    'use strict';

    // ============================================================
    // 1. VERIFICAR SISTEMA
    // ============================================================
    function isSystemReady() {
        return (typeof projects !== 'undefined' && typeof currentProjectIndex !== 'undefined');
    }

    function getCurrentProject() {
        if (!isSystemReady()) return null;
        return projects[currentProjectIndex] || null;
    }

    // ============================================================
    // 2. CÁLCULOS
    // ============================================================
    function calcEVM(tasks) {
        if (!tasks || tasks.length === 0) return null;
        let BAC = 0, AC = 0, EV = 0;
        tasks.forEach(t => {
            const est = Number(t.estimatedTime) || 0;
            const logged = Number(t.timeLogged) || 0;
            const prog = Number(t.progress) || 0;
            const status = (t.status || '').toLowerCase();
            BAC += est;
            AC += logged;
            if (status === 'completed' || prog >= 100) EV += est;
            else if (status === 'inProgress' || (prog > 0 && prog < 100)) EV += est * (prog / 100);
            else if (status === 'overdue' || status === 'rezagado') EV += est * Math.min(1, (prog / 100) || (logged / (est || 1)));
        });
        BAC = Math.round(BAC * 100) / 100;
        AC = Math.round(AC * 100) / 100;
        EV = Math.round(EV * 100) / 100;
        const PV = BAC;
        const SPI = PV > 0 ? Math.round((EV / PV) * 1000) / 1000 : 1;
        const CPI = AC > 0 ? Math.round((EV / AC) * 1000) / 1000 : 1;
        const EAC = CPI > 0 ? Math.round((BAC / CPI) * 100) / 100 : BAC;
        const ETC = Math.round((EAC - AC) * 100) / 100;
        const VAC = Math.round((BAC - EAC) * 100) / 100;
        return { PV, EV, AC, BAC, SPI, CPI, EAC, ETC, VAC, progress: BAC > 0 ? Math.round((EV/BAC)*100) : 0 };
    }

    function getDist(tasks) {
        let c = 0, ip = 0, p = 0, o = 0;
        tasks.forEach(t => {
            const st = (t.status || '').toLowerCase();
            const prog = Number(t.progress) || 0;
            if (st === 'completed' || prog >= 100) c++;
            else if (st === 'inProgress' || (prog > 0 && prog < 100)) ip++;
            else if (st === 'overdue' || st === 'rezagado' || (t.deadline && new Date(t.deadline) < new Date() && st !== 'completed')) o++;
            else p++;
        });
        return { completed: c, inProgress: ip, pending: p, overdue: o };
    }

    // ============================================================
    // 3. TRADUCCIONES (COMPLETAS)
    // ============================================================
    const translations = {
        es: {
            storytellingBtn: 'Storytelling',
            close: 'Cerrar',
            project: 'Proyecto',
            tasks: 'tareas',
            collaborators: 'colaboradores',
            updated: 'Actualizado',
            exportPDF: 'Exportar PDF',
            print: 'Imprimir',
            storyTitle: 'Narrativa Ejecutiva',
            progress: 'Progreso',
            efficiency: 'Eficiencia',
            forecast: 'Pronóstico EAC',
            evm: 'Valor Ganado (EVM)',
            kpis: 'Indicadores Clave de Desempeño (KPIs)',
            kpiDescription: 'Los siguientes indicadores proporcionan una visión completa del rendimiento del proyecto según la metodología de Valor Ganado (EVM):',
            totalTasksKPI: 'Total de Tareas',
            totalTasksDesc: 'Cantidad total de tareas registradas en el proyecto. Representa el alcance completo del trabajo planificado.',
            completedTasksKPI: 'Tareas Completadas',
            completedTasksDesc: 'Tareas finalizadas al 100%. Representan el trabajo entregado y validado. Son la base del Valor Ganado (EV).',
            inProgressTasksKPI: 'Tareas en Progreso',
            inProgressTasksDesc: 'Tareas actualmente en ejecución, con avance parcial registrado. Indican el trabajo activo del equipo.',
            pendingTasksKPI: 'Tareas Pendientes',
            pendingTasksDesc: 'Tareas que aún no han iniciado su ejecución. Representan el trabajo futuro programado.',
            overdueTasksKPI: 'Tareas Retrasadas',
            overdueTasksDesc: 'Tareas que han superado su fecha límite sin estar completadas. Requieren atención inmediata y representan riesgo para el cronograma.',
            completionRate: 'Tasa de Finalización',
            completionRateDesc: 'Porcentaje del total de tareas que han sido completadas exitosamente. Indica el avance cuantitativo del proyecto.',
            executionHealth: 'Salud de Ejecución',
            executionHealthDesc: 'Indicador general del estado operativo del proyecto basado en la distribución de tareas y el ratio de tareas retrasadas.',
            healthy: 'Saludable',
            warning: 'Atención requerida',
            critical: 'Crítico',
            healthStatus: {
                excellent: 'EXCELENTE',
                onTrack: 'EN CURSO',
                critical: 'CRÍTICO'
            },
            kpiTotalTasksImpact: '{total} tareas representan el alcance total del proyecto.',
            kpiCompletedImpact: '{completed} tareas entregadas = {pct}% del alcance. Base del Valor Ganado.',
            kpiInProgressImpact: '{inProgress} tareas activas; indican la carga actual del equipo.',
            kpiPendingImpact: '{pending} tareas por iniciar; planificar su ejecución.',
            kpiOverdueImpact: '{overdue} tareas retrasadas; atención inmediata requerida.',
            kpiCompletionImpact: '{pct}% de las tareas están completas, reflejando la madurez de la ejecución.',
            kpiHealthImpact: '{health} ({overdue}% de retraso, {completion}% completado).',
            kpiPVImpact: '{pv}h planificadas hasta hoy.',
            kpiEVImpact: '{ev}h de valor ganado, {comparison} lo planificado.',
            kpiACImpact: '{ac}h consumidas, {efficiency} el valor ganado.',
            kpiSPIImpact: '{status} del {pct}%.',
            kpiCPIImpact: '{status} en costes.',
            kpiEACImpact: 'Proyección final de coste: {eac}h.',
            kpiETCImpact: '{etc}h adicionales estimadas para finalizar.',
            kpiVACImpact: '{status} de {vac}h.',
            above: 'superando',
            below: 'por debajo de',
            efficient: 'eficiente',
            exceeding: 'excediendo',
            adequate: 'Ritmo adecuado',
            delayed: 'Retraso del',
            costEfficient: 'Eficiencia en costes',
            overCost: 'Sobrecoste del',
            savings: 'Ahorro estimado',
            overspending: 'Sobrecoste estimado',
            taskKPIs: 'KPIs Operativos de Tareas',
            taskKPIDescription: 'Distribución del estado actual de todas las tareas del proyecto. Estos indicadores operativos complementan las métricas financieras (EVM) y proporcionan una visión clara del avance real del trabajo.',
            kpiPV: 'PV (Valor Planificado)',
            kpiPVDesc: 'Presupuesto total aprobado para el trabajo que debería estar completado en este momento. Representa la línea base del cronograma.',
            kpiEV: 'EV (Valor Ganado)',
            kpiEVDesc: 'Valor del trabajo realmente completado, medido en términos del presupuesto aprobado. Indica cuánto progreso se ha logrado.',
            kpiAC: 'AC (Coste Actual)',
            kpiACDesc: 'Coste real incurrido hasta la fecha para completar el trabajo. Representa los recursos efectivamente consumidos.',
            kpiBAC: 'BAC (Presupuesto a la Conclusión)',
            kpiBACDesc: 'Presupuesto total aprobado para todo el proyecto. Es el objetivo financiero inicial.',
            kpiSPI: 'SPI (Índice de Rendimiento del Cronograma)',
            kpiSPIDesc: 'EV ÷ PV. Mide la eficiencia del cronograma. Valores > 1 indican avance, valores < 1 indican retraso.',
            kpiCPI: 'CPI (Índice de Rendimiento del Coste)',
            kpiCPIDesc: 'EV ÷ AC. Mide la eficiencia del coste. Valores > 1 indican ahorro, valores < 1 indican sobrecoste.',
            kpiEAC: 'EAC (Estimación a la Conclusión)',
            kpiEACDesc: 'Proyección del coste total del proyecto basada en el rendimiento actual. BAC ÷ CPI.',
            kpiETC: 'ETC (Estimación para Completar)',
            kpiETCDesc: 'Coste estimado necesario para completar el trabajo restante. EAC - AC.',
            kpiVAC: 'VAC (Variación a la Conclusión)',
            kpiVACDesc: 'Diferencia proyectada entre el presupuesto y el coste final estimado. BAC - EAC. Positivo = ahorro, negativo = sobrecoste.',
            kpiInterpretation: 'Interpretación de Resultados',
            kpiInterpretationText: 'Los índices SPI y CPI son los indicadores más críticos. Un valor de 1.0 representa el rendimiento planificado. Valores superiores a 1.0 indican un desempeño mejor que el planificado, mientras que valores inferiores a 1.0 señalan desviaciones que requieren atención.',
            trends: 'Tendencias',
            weeklyProgress: 'Progreso semanal estimado',
            executionRate: 'Ritmo de ejecución',
            adequateRate: 'Adecuado',
            delayedRate: 'Retrasado',
            costEfficiencyLabel: 'Eficiencia de costes',
            efficientLabel: 'Eficiente',
            overCostLabel: 'Sobre coste',
            teamResources: 'Equipo y Recursos',
            workload: 'Distribución de carga',
            teamMetrics: 'Métrica de equipo',
            activeCollaborators: 'Colaboradores activos',
            tasksPerPerson: 'Tareas por persona',
            mostProductive: 'Miembro más productivo',
            criticalRisks: 'Riesgos críticos',
            noRisksDetected: '✅ No se detectan tareas rezagadas.',
            opportunities: 'Oportunidades',
            completedTasks: 'tareas completadas',
            knowledgeBase: 'Base de conocimiento consolidada',
            progressRate: 'de avance',
            sustainablePace: 'Ritmo sostenible si se mantiene',
            activeResources: 'recursos activos',
            installedCapacity: 'Capacidad instalada para acelerar',
            strategicRecommendations: 'Recomendaciones Estratégicas',
            maintainCourse: 'Mantener el rumbo',
            maintainDesc: 'La ejecución es eficiente. Documentar lecciones aprendidas y estandarizar procesos.',
            optimizeResources: 'Optimizar recursos',
            optimizeDesc: 'Reasignar personal de tareas completadas a áreas de mejora continua.',
            prepareDelivery: 'Preparar la entrega',
            prepareDesc: 'Iniciar la planificación de la fase de cierre y transferencia de conocimiento.',
            prioritizeCritical: 'Priorizar tareas críticas',
            prioritizeDesc: 'Enfocar el equipo en las actividades de la ruta crítica para recuperar el cronograma.',
            reviewWorkload: 'Revisar la carga de trabajo',
            reviewDesc: 'Equilibrar la asignación de tareas entre los recursos disponibles.',
            activeCommunication: 'Comunicación activa',
            activeCommDesc: 'Establecer reuniones de seguimiento diarias para desbloquear impedimentos.',
            urgentIntervention: 'Intervención urgente',
            urgentDesc: 'Realizar una revisión del alcance y redefinir los entregables prioritarios.',
            reinforceTeam: 'Refuerzo de equipo',
            reinforceDesc: 'Incorporar recursos adicionales o externalizar tareas críticas.',
            contingencyPlan: 'Plan de contingencia',
            contingencyDesc: 'Establecer un plan de recuperación con hitos semanales medibles.',
            recommendationsNote: 'Estas recomendaciones se derivan del análisis de los datos de rendimiento y la evaluación de riesgos. Su implementación permitirá estabilizar el proyecto y alinear los resultados con los objetivos estratégicos.',
            outlook: 'Outlook y Próximos Pasos',
            completionForecast: 'Pronóstico de finalización',
            withinBudgetLabel: '✅ Dentro del presupuesto',
            extra: 'h extra',
            pendingTasks: 'Tareas pendientes',
            inProgressLabel: 'en progreso',
            toStart: 'por iniciar',
            immediateAction: 'Acción inmediata',
            resolveOverdue: 'Resolver {overdue} tareas rezagadas',
            maintainPace: 'Mantener el ritmo actual',
            highPriority: 'Prioridad alta',
            nextReview: 'Próxima revisión ejecutiva',
            footer: 'Informe Ejecutivo · Datos en tiempo real',
            confidential: 'CONFIDENCIAL',
            executiveReport: 'INFORME EJECUTIVO',
            generatedOn: 'Generado el',
            executiveSystem: 'Sistema Ejecutivo',
            verdictExcellent: 'El proyecto avanza con solidez y eficiencia. Se mantiene el rumbo estratégico, con un progreso del {progress}% que supera las expectativas iniciales. La ejecución ha sido disciplinada y los recursos están bien aprovechados.',
            verdictOnTrack: 'El proyecto muestra un progreso constante del {progress}%, aunque con algunas desviaciones en el cronograma y el coste. Es necesario optimizar la ejecución para garantizar el éxito final, pero el equipo está comprometido y la base está sólida.',
            verdictCritical: 'El proyecto presenta un avance crítico del {progress}%, muy por debajo de lo planificado. Se requiere una intervención inmediata en la gestión de recursos y el alcance. La situación es reversible, pero exige acciones contundentes.',
            performanceExcellent: 'El rendimiento es excelente: el índice de rendimiento del cronograma (SPI = {spi}) y el índice de rendimiento del coste (CPI = {cpi}) están por encima de 1, lo que indica que estamos adelantados y dentro del presupuesto. El valor ganado (EV = {ev}h) supera lo planificado, lo que refleja una ejecución eficaz.',
            performanceScheduleCost: 'El cronograma va bien (SPI = {spi}), pero el coste se está desviando (CPI = {cpi}). Esto sugiere que estamos gastando más de lo previsto para el trabajo realizado. Es recomendable revisar los procesos y los recursos para ajustar el presupuesto.',
            performanceCostSchedule: 'El coste está controlado (CPI = {cpi}), pero el cronograma muestra retrasos (SPI = {spi}). Esto indica que el equipo está trabajando de manera eficiente en costes, pero necesita acelerar el ritmo para cumplir con los plazos. Priorizar tareas críticas será clave.',
            performanceCritical: 'Tanto el cronograma (SPI = {spi}) como el coste (CPI = {cpi}) están por debajo de 1. El proyecto está sufriendo retrasos y sobrecostes. Se necesita una reasignación de recursos y una revisión del alcance para estabilizar la ejecución.',
            teamNarrative: 'El equipo está compuesto por {collaborators} colaboradores activos, con una carga media de {avgTasks} tareas por persona. El miembro más productivo es {topAssignee}, con {topCount} tareas asignadas, lo que demuestra un alto nivel de compromiso. Sin embargo, la distribución de la carga no es homogénea: algunos recursos muestran un avance notable, mientras que otros requieren apoyo adicional.',
            riskNarrativeNone: 'No se detectan tareas rezagadas. Todos los plazos están bajo control, lo que refleja una buena planificación y seguimiento. Sin embargo, es importante mantener la vigilancia sobre las tareas que se aproximan a su fecha límite.',
            riskNarrativeOverdue: 'Se han identificado {overdueCount} tareas rezagadas, que representan un riesgo crítico para el cronograma. Las principales causas son la subestimación de esfuerzos y la dependencia entre tareas. Es prioritario reasignar recursos y establecer planes de recuperación para estas actividades.',
            outlookNarrative: 'El pronóstico actual indica que el proyecto finalizará con un coste total estimado de {eac} horas, {budgetStatus}. La tendencia sugiere que, si se mantienen las condiciones actuales, el proyecto podría completarse en el plazo previsto, aunque con posibles ajustes en el alcance.'
        },
        en: {
            storytellingBtn: 'Storytelling',
            close: 'Close',
            project: 'Project',
            tasks: 'tasks',
            collaborators: 'collaborators',
            updated: 'Updated',
            exportPDF: 'Export PDF',
            print: 'Print',
            storyTitle: 'Executive Storytelling',
            progress: 'Progress',
            efficiency: 'Efficiency',
            forecast: 'EAC Forecast',
            evm: 'Earned Value (EVM)',
            kpis: 'Key Performance Indicators (KPIs)',
            kpiDescription: 'The following indicators provide a complete view of project performance according to the Earned Value Management (EVM) methodology:',
            totalTasksKPI: 'Total Tasks',
            totalTasksDesc: 'Total number of tasks registered in the project. Represents the complete scope of planned work.',
            completedTasksKPI: 'Completed Tasks',
            completedTasksDesc: 'Tasks finished at 100%. They represent delivered and validated work. They are the basis of Earned Value (EV).',
            inProgressTasksKPI: 'Tasks in Progress',
            inProgressTasksDesc: 'Tasks currently in execution, with partial progress recorded. They indicate the team\'s active work.',
            pendingTasksKPI: 'Pending Tasks',
            pendingTasksDesc: 'Tasks that have not yet started their execution. They represent future scheduled work.',
            overdueTasksKPI: 'Overdue Tasks',
            overdueTasksDesc: 'Tasks that have exceeded their deadline without being completed. They require immediate attention and represent schedule risk.',
            completionRate: 'Completion Rate',
            completionRateDesc: 'Percentage of total tasks that have been successfully completed. Indicates the quantitative progress of the project.',
            executionHealth: 'Execution Health',
            executionHealthDesc: 'General indicator of the project\'s operational status based on task distribution and overdue task ratio.',
            healthy: 'Healthy',
            warning: 'Attention Required',
            critical: 'Critical',
            healthStatus: {
                excellent: 'EXCELLENT',
                onTrack: 'ON TRACK',
                critical: 'CRITICAL'
            },
            kpiTotalTasksImpact: '{total} tasks represent the total scope of the project.',
            kpiCompletedImpact: '{completed} tasks delivered = {pct}% of scope. Basis of Earned Value.',
            kpiInProgressImpact: '{inProgress} active tasks; indicate current team workload.',
            kpiPendingImpact: '{pending} tasks to start; plan their execution.',
            kpiOverdueImpact: '{overdue} overdue tasks; immediate attention required.',
            kpiCompletionImpact: '{pct}% of tasks completed, reflecting execution maturity.',
            kpiHealthImpact: '{health} ({overdue}% overdue, {completion}% completed).',
            kpiPVImpact: '{pv}h planned to date.',
            kpiEVImpact: '{ev}h earned value, {comparison} planned.',
            kpiACImpact: '{ac}h consumed, {efficiency} earned value.',
            kpiSPIImpact: '{status} of {pct}%.',
            kpiCPIImpact: '{status} in costs.',
            kpiEACImpact: 'Final cost projection: {eac}h.',
            kpiETCImpact: '{etc}h additional estimated to finish.',
            kpiVACImpact: '{status} of {vac}h.',
            above: 'above',
            below: 'below',
            efficient: 'efficient',
            exceeding: 'exceeding',
            adequate: 'Adequate pace',
            delayed: 'Delay of',
            costEfficient: 'Cost efficiency',
            overCost: 'Cost overrun of',
            savings: 'Estimated savings',
            overspending: 'Estimated overspending',
            taskKPIs: 'Task Operational KPIs',
            taskKPIDescription: 'Distribution of the current status of all project tasks. These operational indicators complement financial metrics (EVM) and provide a clear view of actual work progress.',
            kpiPV: 'PV (Planned Value)',
            kpiPVDesc: 'Total approved budget for work that should be completed at this time. Represents the schedule baseline.',
            kpiEV: 'EV (Earned Value)',
            kpiEVDesc: 'Value of work actually completed, measured in terms of approved budget. Indicates how much progress has been achieved.',
            kpiAC: 'AC (Actual Cost)',
            kpiACDesc: 'Actual cost incurred to date for completing the work. Represents resources effectively consumed.',
            kpiBAC: 'BAC (Budget at Completion)',
            kpiBACDesc: 'Total approved budget for the entire project. It is the initial financial target.',
            kpiSPI: 'SPI (Schedule Performance Index)',
            kpiSPIDesc: 'EV ÷ PV. Measures schedule efficiency. Values > 1 indicate ahead of schedule, values < 1 indicate delay.',
            kpiCPI: 'CPI (Cost Performance Index)',
            kpiCPIDesc: 'EV ÷ AC. Measures cost efficiency. Values > 1 indicate under budget, values < 1 indicate over budget.',
            kpiEAC: 'EAC (Estimate at Completion)',
            kpiEACDesc: 'Projection of total project cost based on current performance. BAC ÷ CPI.',
            kpiETC: 'ETC (Estimate to Complete)',
            kpiETCDesc: 'Estimated cost needed to complete remaining work. EAC - AC.',
            kpiVAC: 'VAC (Variance at Completion)',
            kpiVACDesc: 'Projected difference between budget and estimated final cost. BAC - EAC. Positive = savings, negative = over budget.',
            kpiInterpretation: 'Results Interpretation',
            kpiInterpretationText: 'SPI and CPI indices are the most critical indicators. A value of 1.0 represents planned performance. Values above 1.0 indicate better-than-planned performance, while values below 1.0 signal deviations requiring attention.',
            trends: 'Trends',
            weeklyProgress: 'Estimated weekly progress',
            executionRate: 'Execution rate',
            adequateRate: 'Adequate',
            delayedRate: 'Delayed',
            costEfficiencyLabel: 'Cost efficiency',
            efficientLabel: 'Efficient',
            overCostLabel: 'Over cost',
            teamResources: 'Team & Resources',
            workload: 'Workload distribution',
            teamMetrics: 'Team metrics',
            activeCollaborators: 'Active collaborators',
            tasksPerPerson: 'Tasks per person',
            mostProductive: 'Most productive member',
            criticalRisks: 'Critical risks',
            noRisksDetected: '✅ No overdue tasks detected.',
            opportunities: 'Opportunities',
            completedTasks: 'completed tasks',
            knowledgeBase: 'Consolidated knowledge base',
            progressRate: 'progress rate',
            sustainablePace: 'Sustainable pace if maintained',
            activeResources: 'active resources',
            installedCapacity: 'Installed capacity to accelerate',
            strategicRecommendations: 'Strategic Recommendations',
            maintainCourse: 'Maintain the course',
            maintainDesc: 'Execution is efficient. Document lessons learned and standardize processes.',
            optimizeResources: 'Optimize resources',
            optimizeDesc: 'Reassign staff from completed tasks to continuous improvement areas.',
            prepareDelivery: 'Prepare delivery',
            prepareDesc: 'Start planning the closing phase and knowledge transfer.',
            prioritizeCritical: 'Prioritize critical tasks',
            prioritizeDesc: 'Focus the team on critical path activities to recover the schedule.',
            reviewWorkload: 'Review workload',
            reviewDesc: 'Balance task assignment among available resources.',
            activeCommunication: 'Active communication',
            activeCommDesc: 'Establish daily follow-up meetings to unblock impediments.',
            urgentIntervention: 'Urgent intervention',
            urgentDesc: 'Review the scope and redefine priority deliverables.',
            reinforceTeam: 'Reinforce team',
            reinforceDesc: 'Add additional resources or outsource critical tasks.',
            contingencyPlan: 'Contingency plan',
            contingencyDesc: 'Establish a recovery plan with measurable weekly milestones.',
            recommendationsNote: 'These recommendations derive from performance data analysis and risk assessment. Their implementation will stabilize the project and align outcomes with strategic objectives.',
            outlook: 'Outlook & Next Steps',
            completionForecast: 'Completion forecast',
            withinBudgetLabel: '✅ Within budget',
            extra: 'h over',
            pendingTasks: 'Pending tasks',
            inProgressLabel: 'in progress',
            toStart: 'to start',
            immediateAction: 'Immediate action',
            resolveOverdue: 'Resolve {overdue} overdue tasks',
            maintainPace: 'Maintain current pace',
            highPriority: 'High priority',
            nextReview: 'Next executive review',
            footer: 'Executive Report · Real-time data',
            confidential: 'CONFIDENTIAL',
            executiveReport: 'EXECUTIVE REPORT',
            generatedOn: 'Generated on',
            executiveSystem: 'Executive System',
            verdictExcellent: 'The project is progressing solidly and efficiently. The strategic course is maintained, with a progress of {progress}% exceeding initial expectations. Execution has been disciplined and resources are well utilized.',
            verdictOnTrack: 'The project shows steady progress of {progress}%, although with some deviations in schedule and cost. Optimization is needed to ensure final success, but the team is committed and the foundation is solid.',
            verdictCritical: 'The project has a critical progress of {progress}%, far below planned. Immediate intervention in resource management and scope is required. The situation is reversible but demands decisive actions.',
            performanceExcellent: 'Performance is excellent: schedule performance index (SPI = {spi}) and cost performance index (CPI = {cpi}) are above 1, indicating we are ahead of schedule and within budget. Earned value (EV = {ev}h) exceeds planned, reflecting effective execution.',
            performanceScheduleCost: 'Schedule is good (SPI = {spi}), but cost is deviating (CPI = {cpi}). This suggests we are spending more than planned for the work done. It is advisable to review processes and resources to adjust the budget.',
            performanceCostSchedule: 'Cost is controlled (CPI = {cpi}), but schedule shows delays (SPI = {spi}). This indicates the team is working efficiently in costs, but needs to accelerate to meet deadlines. Prioritizing critical tasks will be key.',
            performanceCritical: 'Both schedule (SPI = {spi}) and cost (CPI = {cpi}) are below 1. The project is experiencing delays and cost overruns. Resource reallocation and scope review are needed to stabilize execution.',
            teamNarrative: 'The team consists of {collaborators} active collaborators, with an average workload of {avgTasks} tasks per person. The most productive member is {topAssignee}, with {topCount} assigned tasks, demonstrating a high level of commitment. However, workload distribution is not homogeneous: some resources show notable progress, while others require additional support.',
            riskNarrativeNone: 'No overdue tasks detected. All deadlines are under control, reflecting good planning and monitoring. However, it is important to maintain vigilance over tasks approaching their deadline.',
            riskNarrativeOverdue: '{overdueCount} overdue tasks have been identified, representing a critical risk to the schedule. The main causes are underestimation of efforts and task dependencies. It is a priority to reallocate resources and establish recovery plans for these activities.',
            outlookNarrative: 'The current forecast indicates that the project will finish with an estimated total cost of {eac} hours, {budgetStatus}. The trend suggests that if current conditions are maintained, the project could be completed on schedule, though with possible scope adjustments.'
        }
    };

    // ============================================================
    // 4. FUNCIONES DE IDIOMA
    // ============================================================
    function getLang() {
        return window.currentLanguage || localStorage.getItem('appLanguage') || localStorage.getItem('lang') || 'es';
    }

    function t(key, vars) {
        const lang = getLang();
        const parts = key.split('.');
        let value = translations[lang];
        for (const part of parts) {
            if (value && typeof value === 'object' && part in value) {
                value = value[part];
            } else {
                let fallback = translations['es'];
                for (const p of parts) {
                    if (fallback && typeof fallback === 'object' && p in fallback) {
                        fallback = fallback[p];
                    } else {
                        fallback = key;
                        break;
                    }
                }
                value = fallback;
                break;
            }
        }
        if (typeof value !== 'string') value = key;
        if (vars) {
            for (const [k, v] of Object.entries(vars)) {
                value = value.replace(new RegExp(`{${k}}`, 'g'), v);
            }
        }
        return value;
    }

    function updateLanguageButton() {
        const btn = document.getElementById('langToggleBtn');
        if (btn) btn.textContent = getLang() === 'es' ? '🌐 EN' : '🌐 ES';
    }

    // ============================================================
    // 5. EXPORTAR A PDF (COMPLETO Y DEFINITIVO)
    // ============================================================
    function exportToPDF() {
        const project = getCurrentProject();
        if (!project) return;
        const tasks = project.tasks || [];
        if (tasks.length === 0) return;

        const evm = calcEVM(tasks);
        if (!evm) return;
        const dist = getDist(tasks);
        const total = tasks.length;
        const assignees = [...new Set(tasks.map(t => t.assignee).filter(Boolean))];
        let topAssignee = 'N/A', topCount = 0;
        const counts = {};
        tasks.forEach(t => { if (t.assignee) { counts[t.assignee] = (counts[t.assignee]||0)+1; if (counts[t.assignee] > topCount) { topCount = counts[t.assignee]; topAssignee = t.assignee; } } });
        
        const locale = getLang() === 'es' ? 'es-ES' : 'en-US';
        const na = getLang() === 'es' ? 'N/D' : 'N/A';
        const startDates = tasks.map(t => t.startDate).filter(Boolean);
        const endDates = tasks.map(t => t.deadline).filter(Boolean);
        const start = startDates.length ? new Date(Math.min(...startDates.map(d => new Date(d)))).toLocaleDateString(locale) : na;
        const end = endDates.length ? new Date(Math.max(...endDates.map(d => new Date(d)))).toLocaleDateString(locale) : na;

        const efficiency = Math.round(((evm.CPI + evm.SPI) / 2) * 100);
        const healthStatusKey = evm.progress >= 80 ? 'excellent' : evm.progress >= 50 ? 'onTrack' : 'critical';
        const healthColor = evm.progress >= 80 ? '#10b981' : evm.progress >= 50 ? '#D4AF37' : '#ef4444';
        const healthLabel = t('healthStatus.' + healthStatusKey);

        const completionRate = total > 0 ? Math.round((dist.completed / total) * 100) : 0;
        const overdueRate = total > 0 ? Math.round((dist.overdue / total) * 100) : 0;
        let execHealthKey = 'healthy', execHealthColor = '#10b981';
        if (overdueRate > 20 || completionRate < 30) { execHealthKey = 'critical'; execHealthColor = '#ef4444'; }
        else if (overdueRate > 10 || completionRate < 60) { execHealthKey = 'warning'; execHealthColor = '#D4AF37'; }
        const execHealthLabel = t(execHealthKey);

        let verdictNarrative = evm.progress >= 80 ? t('verdictExcellent', { progress: evm.progress }) :
                               evm.progress >= 50 ? t('verdictOnTrack', { progress: evm.progress }) :
                               t('verdictCritical', { progress: evm.progress });

        let performanceNarrative = '';
        if (evm.SPI >= 1 && evm.CPI >= 1) performanceNarrative = t('performanceExcellent', { spi: evm.SPI.toFixed(2), cpi: evm.CPI.toFixed(2), ev: evm.EV.toFixed(1) });
        else if (evm.SPI >= 1 && evm.CPI < 1) performanceNarrative = t('performanceScheduleCost', { spi: evm.SPI.toFixed(2), cpi: evm.CPI.toFixed(2) });
        else if (evm.SPI < 1 && evm.CPI >= 1) performanceNarrative = t('performanceCostSchedule', { spi: evm.SPI.toFixed(2), cpi: evm.CPI.toFixed(2) });
        else performanceNarrative = t('performanceCritical', { spi: evm.SPI.toFixed(2), cpi: evm.CPI.toFixed(2) });

        const teamNarrative = t('teamNarrative', {
            collaborators: assignees.length || 1,
            avgTasks: total > 0 ? Math.round(total / (assignees.length || 1)) : 0,
            topAssignee: topAssignee,
            topCount: topCount
        });

        const overdueTasks = tasks.filter(t => t.status !== 'completed' && t.deadline && new Date(t.deadline) < new Date());
        const riskNarrative = overdueTasks.length === 0 ? t('noRisksDetected') : t('riskNarrativeOverdue', { overdueCount: overdueTasks.length });

        const budgetStatus = evm.EAC <= evm.BAC ? t('withinBudgetLabel') + ' (BAC = ' + evm.BAC.toFixed(1) + 'h)' : '⚠️ ' + (evm.EAC - evm.BAC).toFixed(1) + ' ' + t('extra');
        const outlookNarrative = t('outlookNarrative', { eac: evm.EAC.toFixed(1), budgetStatus: budgetStatus });

        const generatedDate = new Date().toLocaleString(locale, { 
            year: 'numeric', month: 'long', day: 'numeric', 
            hour: '2-digit', minute: '2-digit' 
        });

        // ============================================================
        // HTML DEL PDF (COMPLETO)
        // ============================================================
        const htmlContent = `
<!DOCTYPE html>
<html lang="${getLang()}">
<head>
<meta charset="UTF-8">
<title>${t('storyTitle')} - ${project.name}</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
    /* ========== ESTILOS ========== */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :root { --gold: #D4AF37; --gold-light: #F4E4B8; --gold-dark: #B8860B; --black: #0a0a0a; --black-soft: #1a1a1a; --cream: #FAF7F0; --text-dark: #1a1a1a; --text-light: #FAF7F0; --green: #10b981; --red: #ef4444; --blue: #3b82f6; --gray: #6b7280; }
    @page { size: A4; margin: 15mm 15mm 20mm 15mm; }
    body { font-family: 'Inter', sans-serif; background: var(--cream); color: var(--text-dark); line-height: 1.6; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .page { width: 210mm; min-height: 297mm; padding: 15mm; background: var(--cream); position: relative; page-break-after: always; }
    .page:last-child { page-break-after: auto; }
    .gold-frame { position: absolute; top: 8mm; left: 8mm; right: 8mm; bottom: 8mm; border: 1px solid var(--gold); pointer-events: none; }
    .gold-frame::before { content: ''; position: absolute; top: 2mm; left: 2mm; right: 2mm; bottom: 2mm; border: 0.5px solid var(--gold-light); opacity: 0.6; }
    .corner { position: absolute; width: 15mm; height: 15mm; border: 2px solid var(--gold); }
    .corner.tl { top: 6mm; left: 6mm; border-right: none; border-bottom: none; }
    .corner.tr { top: 6mm; right: 6mm; border-left: none; border-bottom: none; }
    .corner.bl { bottom: 6mm; left: 6mm; border-right: none; border-top: none; }
    .corner.br { bottom: 6mm; right: 6mm; border-left: none; border-top: none; }
    .cover { display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; height: 100%; padding: 20mm; }
    .cover-emblem { margin-bottom: 10mm; }
    .cover-confidential { font-family: 'Cormorant Garamond', serif; font-size: 11px; letter-spacing: 8px; color: var(--gold-dark); margin-bottom: 15mm; text-transform: uppercase; border-top: 1px solid var(--gold); border-bottom: 1px solid var(--gold); padding: 3mm 15mm; }
    .cover-title { font-family: 'Cormorant Garamond', serif; font-size: 48px; font-weight: 600; color: var(--black); margin-bottom: 5mm; letter-spacing: 1px; line-height: 1.1; }
    .cover-subtitle { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; color: var(--gold-dark); font-style: italic; margin-bottom: 20mm; }
    .cover-divider { width: 80mm; height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent); margin: 10mm 0; }
    .cover-divider.ornament::before, .cover-divider.ornament::after { content: '◆'; position: absolute; color: var(--gold); font-size: 10px; top: -4px; }
    .cover-divider.ornament::before { left: -8px; }
    .cover-divider.ornament::after { right: -8px; }
    .cover-project { font-size: 16px; color: var(--text-dark); margin-bottom: 5mm; font-weight: 500; }
    .cover-meta { font-size: 11px; color: #666; letter-spacing: 1px; text-transform: uppercase; margin-top: 30mm; }
    .cover-meta strong { color: var(--gold-dark); font-weight: 600; }
    .page-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 5mm; border-bottom: 1px solid var(--gold); margin-bottom: 8mm; }
    .page-header-left { font-family: 'Cormorant Garamond', serif; font-size: 14px; font-weight: 600; color: var(--black); letter-spacing: 2px; text-transform: uppercase; }
    .page-header-right { font-size: 9px; color: var(--gold-dark); letter-spacing: 1px; text-transform: uppercase; }
    .page-footer { position: absolute; bottom: 10mm; left: 15mm; right: 15mm; display: flex; justify-content: space-between; align-items: center; padding-top: 3mm; border-top: 1px solid var(--gold-light); font-size: 8px; color: #888; letter-spacing: 1px; text-transform: uppercase; }
    .section { margin-bottom: 10mm; }
    .section-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; color: var(--black); margin-bottom: 4mm; padding-bottom: 2mm; border-bottom: 1px solid var(--gold); display: flex; align-items: center; gap: 3mm; }
    .section-title .num { display: inline-block; width: 8mm; height: 8mm; background: var(--gold); color: var(--black); text-align: center; line-height: 8mm; font-size: 13px; font-weight: 700; border-radius: 50%; font-family: 'Inter', sans-serif; }
    .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4mm; margin-bottom: 6mm; }
    .kpi-card { background: var(--black); color: var(--text-light); padding: 5mm; border-radius: 2mm; border: 1px solid var(--gold); text-align: center; position: relative; overflow: hidden; }
    .kpi-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-dark)); }
    .kpi-label { font-size: 8px; letter-spacing: 2px; text-transform: uppercase; color: var(--gold-light); margin-bottom: 2mm; }
    .kpi-value { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 700; color: var(--gold); line-height: 1; }
    .kpi-value.green { color: #10b981; }
    .kpi-value.red { color: #ef4444; }
    .executive-summary { background: linear-gradient(135deg, var(--black) 0%, var(--black-soft) 100%); color: var(--text-light); padding: 8mm; border-radius: 3mm; border: 1px solid var(--gold); position: relative; margin-bottom: 6mm; }
    .executive-summary::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-dark)); }
    .exec-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5mm; padding-bottom: 3mm; border-bottom: 1px solid rgba(212, 175, 55, 0.3); }
    .exec-badge { display: inline-block; padding: 2mm 5mm; border: 1px solid var(--gold); color: var(--gold); font-size: 10px; letter-spacing: 3px; text-transform: uppercase; font-weight: 600; }
    .exec-progress { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 700; color: var(--gold); }
    .exec-narrative { font-size: 11px; line-height: 1.7; color: #e5e5e5; font-style: italic; padding: 4mm; background: rgba(212, 175, 55, 0.05); border-left: 2px solid var(--gold); margin-top: 4mm; }
    .exec-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; margin-top: 5mm; }
    .exec-metric { text-align: center; padding: 3mm; background: rgba(212, 175, 55, 0.08); border-radius: 2mm; }
    .exec-metric-label { font-size: 8px; letter-spacing: 2px; text-transform: uppercase; color: var(--gold-light); }
    .exec-metric-value { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 700; color: var(--gold); margin-top: 1mm; }
    .narrative { font-size: 11px; line-height: 1.8; color: var(--text-dark); padding: 5mm; background: #fff; border-left: 3px solid var(--gold); margin: 4mm 0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .evm-table { width: 100%; border-collapse: collapse; margin: 4mm 0; font-size: 10px; }
    .evm-table th { background: var(--black); color: var(--gold); padding: 3mm; text-align: left; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; font-size: 9px; border: 1px solid var(--gold); }
    .evm-table td { padding: 3mm; border: 1px solid #ddd; background: #fff; }
    .evm-table tr:nth-child(even) td { background: #fafafa; }
    .evm-table .value { font-family: 'Cormorant Garamond', serif; font-size: 16px; font-weight: 700; color: var(--black); }
    .kpi-explanation { background: #fff; border: 1px solid var(--gold); border-radius: 2mm; padding: 4mm; margin-bottom: 3mm; }
    .kpi-explanation-title { font-family: 'Cormorant Garamond', serif; font-size: 14px; font-weight: 600; color: var(--gold-dark); margin-bottom: 2mm; display: flex; align-items: center; gap: 2mm; }
    .kpi-explanation-title::before { content: '◆'; color: var(--gold); font-size: 10px; }
    .kpi-explanation-desc { font-size: 10px; line-height: 1.6; color: var(--text-dark); padding-left: 4mm; }
    .task-kpi-dashboard { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; margin-bottom: 6mm; }
    .task-kpi-card { background: linear-gradient(135deg, var(--black) 0%, var(--black-soft) 100%); color: var(--text-light); padding: 5mm; border-radius: 3mm; border: 1px solid var(--gold); text-align: center; position: relative; overflow: hidden; min-height: 35mm; }
    .task-kpi-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-dark)); }
    .task-kpi-card.total { border-top: 3px solid var(--gold); }
    .task-kpi-card.completed { border-top: 3px solid var(--green); }
    .task-kpi-card.inprogress { border-top: 3px solid var(--blue); }
    .task-kpi-card.pending { border-top: 3px solid var(--gray); }
    .task-kpi-card.overdue { border-top: 3px solid var(--red); }
    .task-kpi-icon { font-size: 24px; margin-bottom: 2mm; }
    .task-kpi-label { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--gold-light); margin-bottom: 3mm; font-weight: 600; }
    .task-kpi-value { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 700; color: var(--gold); line-height: 1; margin-bottom: 2mm; }
    .task-kpi-card.completed .task-kpi-value { color: var(--green); }
    .task-kpi-card.inprogress .task-kpi-value { color: var(--blue); }
    .task-kpi-card.pending .task-kpi-value { color: var(--gray); }
    .task-kpi-card.overdue .task-kpi-value { color: var(--red); }
    .task-kpi-pct { font-size: 10px; color: var(--gold-light); letter-spacing: 1px; }
    .task-progress-bar { background: #fff; border: 1px solid var(--gold); border-radius: 2mm; padding: 5mm; margin-bottom: 4mm; }
    .task-progress-title { font-family: 'Cormorant Garamond', serif; font-size: 14px; font-weight: 600; color: var(--gold-dark); margin-bottom: 3mm; display: flex; justify-content: space-between; align-items: center; }
    .task-progress-track { width: 100%; height: 8mm; background: #f0f0f0; border-radius: 4mm; overflow: hidden; display: flex; position: relative; border: 1px solid #e0e0e0; }
    .task-progress-segment { height: 100%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 9px; font-weight: 700; letter-spacing: 0.5px; }
    .task-progress-segment.completed { background: var(--green); }
    .task-progress-segment.inprogress { background: var(--blue); }
    .task-progress-segment.pending { background: var(--gray); }
    .task-progress-segment.overdue { background: var(--red); }
    .task-progress-legend { display: flex; justify-content: space-around; margin-top: 3mm; font-size: 9px; }
    .legend-item { display: flex; align-items: center; gap: 2mm; }
    .legend-dot { width: 3mm; height: 3mm; border-radius: 50%; }
    .legend-dot.completed { background: var(--green); }
    .legend-dot.inprogress { background: var(--blue); }
    .legend-dot.pending { background: var(--gray); }
    .legend-dot.overdue { background: var(--red); }
    .team-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; }
    .team-member { display: flex; align-items: center; gap: 3mm; padding: 3mm; background: #fff; border: 1px solid #e5e5e5; border-left: 3px solid var(--gold); border-radius: 2mm; }
    .team-avatar { width: 10mm; height: 10mm; border-radius: 50%; background: var(--black); color: var(--gold); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; border: 1px solid var(--gold); }
    .team-info { flex: 1; }
    .team-name { font-weight: 600; font-size: 11px; color: var(--black); }
    .team-tasks { font-size: 9px; color: #666; }
    .team-pct { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 700; color: var(--gold-dark); }
    .risk-item { display: flex; align-items: center; gap: 3mm; padding: 3mm; background: #fff; border: 1px solid #e5e5e5; border-left: 3px solid var(--gold); margin-bottom: 2mm; font-size: 10px; }
    .risk-dot { width: 3mm; height: 3mm; border-radius: 50%; background: var(--gold); }
    .risk-dot.critical { background: #ef4444; }
    .risk-dot.high { background: #f97316; }
    .risk-dot.medium { background: var(--gold); }
    .risk-dot.low { background: #10b981; }
    .risk-name { flex: 1; font-weight: 500; }
    .risk-level { padding: 1mm 3mm; background: var(--black); color: var(--gold); font-size: 8px; letter-spacing: 1px; text-transform: uppercase; border-radius: 1mm; }
    .recommendation { padding: 4mm; background: linear-gradient(135deg, var(--black) 0%, var(--black-soft) 100%); color: var(--text-light); border-left: 3px solid var(--gold); margin-bottom: 3mm; border-radius: 2mm; }
    .recommendation-title { font-family: 'Cormorant Garamond', serif; font-size: 14px; font-weight: 600; color: var(--gold); margin-bottom: 1mm; }
    .recommendation-desc { font-size: 10px; line-height: 1.6; color: #e5e5e5; }
    .outlook-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; margin-bottom: 4mm; }
    .outlook-card { padding: 4mm; background: #fff; border: 1px solid var(--gold); border-radius: 2mm; text-align: center; }
    .outlook-label { font-size: 8px; letter-spacing: 2px; text-transform: uppercase; color: #666; margin-bottom: 2mm; }
    .outlook-value { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; color: var(--black); }
    .outlook-sub { font-size: 9px; color: #666; margin-top: 1mm; }
    .signature-block { margin-top: 10mm; padding-top: 5mm; border-top: 1px solid var(--gold); display: flex; justify-content: flex-end; align-items: flex-end; }
    .signature-line { width: 60mm; border-top: 1px solid var(--black); margin-top: 15mm; text-align: center; font-size: 9px; color: #666; padding-top: 2mm; }
    @media print { body { background: white; } .page { page-break-after: always; } }
</style>
</head>
<body>

<!-- ==================== PÁGINA 1: PORTADA ==================== -->
<div class="page">
    <div class="gold-frame"></div>
    <div class="corner tl"></div>
    <div class="corner tr"></div>
    <div class="corner bl"></div>
    <div class="corner br"></div>
    <div class="cover">
        <div class="cover-emblem">
            <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="#0a0a0a" stroke="#D4AF37" stroke-width="3"/>
                <text x="50" y="55" text-anchor="middle" font-size="32" fill="#D4AF37" font-family="serif" font-weight="bold">E</text>
            </svg>
        </div>
        <div class="cover-confidential">${t('confidential')}</div>
        <div class="cover-divider ornament" style="position:relative;"></div>
        <h1 class="cover-title">${t('storyTitle')}</h1>
        <div class="cover-subtitle">${t('executiveReport')}</div>
        <div class="cover-divider"></div>
        <div class="cover-project">${t('project')}: <strong>${project.name}</strong></div>
        <div style="font-size:12px; color:#666; margin-top:3mm;">
            📅 ${start} → ${end} &nbsp;·&nbsp; 📋 ${total} ${t('tasks')} &nbsp;·&nbsp; 👥 ${assignees.length || 1} ${t('collaborators')}
        </div>
        <div class="cover-meta">
            ${t('generatedOn')} <strong>${generatedDate}</strong>
        </div>
    </div>
</div>

<!-- ==================== PÁGINA 2: RESUMEN ==================== -->
<div class="page">
    <div class="gold-frame"></div>
    <div class="corner tl"></div>
    <div class="corner tr"></div>
    <div class="corner bl"></div>
    <div class="corner br"></div>
    <div class="page-header">
        <div class="page-header-left">📊 ${t('storyTitle')}</div>
        <div class="page-header-right">${project.name}</div>
    </div>
    <div class="section">
        <h2 class="section-title"><span class="num">I</span> ${t('storyTitle')}</h2>
        <div class="executive-summary">
            <div class="exec-header">
                <div class="exec-badge">${healthLabel}</div>
                <div class="exec-progress">${evm.progress}%</div>
            </div>
            <div class="exec-metrics">
                <div class="exec-metric">
                    <div class="exec-metric-label">${t('efficiency')}</div>
                    <div class="exec-metric-value">${efficiency}%</div>
                </div>
                <div class="exec-metric">
                    <div class="exec-metric-label">${t('forecast')}</div>
                    <div class="exec-metric-value">${evm.EAC.toFixed(1)}h</div>
                </div>
            </div>
            <div class="exec-narrative">${verdictNarrative}</div>
        </div>
    </div>
    <div class="page-footer">
        <span>${t('confidential')}</span>
        <span>${t('footer')}</span>
    </div>
</div>

<!-- ==================== PÁGINA 3: KPIs TAREAS ==================== -->
<div class="page">
    <div class="gold-frame"></div>
    <div class="corner tl"></div>
    <div class="corner tr"></div>
    <div class="corner bl"></div>
    <div class="corner br"></div>
    <div class="page-header">
        <div class="page-header-left">📊 ${t('storyTitle')}</div>
        <div class="page-header-right">${project.name}</div>
    </div>
    <div class="section">
        <h2 class="section-title"><span class="num">II</span> ${t('taskKPIs')}</h2>
        <div class="narrative" style="margin-bottom:6mm;">${t('taskKPIDescription')}</div>
        <div class="task-kpi-dashboard">
            <div class="task-kpi-card total">
                <div class="task-kpi-icon">📋</div>
                <div class="task-kpi-label">${t('totalTasksKPI')}</div>
                <div class="task-kpi-value">${total}</div>
                <div class="task-kpi-pct">100%</div>
            </div>
            <div class="task-kpi-card completed">
                <div class="task-kpi-icon">✅</div>
                <div class="task-kpi-label">${t('completedTasksKPI')}</div>
                <div class="task-kpi-value">${dist.completed}</div>
                <div class="task-kpi-pct">${total > 0 ? Math.round((dist.completed/total)*100) : 0}%</div>
            </div>
            <div class="task-kpi-card inprogress">
                <div class="task-kpi-icon">🔄</div>
                <div class="task-kpi-label">${t('inProgressTasksKPI')}</div>
                <div class="task-kpi-value">${dist.inProgress}</div>
                <div class="task-kpi-pct">${total > 0 ? Math.round((dist.inProgress/total)*100) : 0}%</div>
            </div>
            <div class="task-kpi-card pending">
                <div class="task-kpi-icon">⏳</div>
                <div class="task-kpi-label">${t('pendingTasksKPI')}</div>
                <div class="task-kpi-value">${dist.pending}</div>
                <div class="task-kpi-pct">${total > 0 ? Math.round((dist.pending/total)*100) : 0}%</div>
            </div>
            <div class="task-kpi-card overdue">
                <div class="task-kpi-icon">⚠️</div>
                <div class="task-kpi-label">${t('overdueTasksKPI')}</div>
                <div class="task-kpi-value">${dist.overdue}</div>
                <div class="task-kpi-pct">${overdueRate}%</div>
            </div>
            <div class="task-kpi-card" style="border-top: 3px solid ${execHealthColor};">
                <div class="task-kpi-icon">💎</div>
                <div class="task-kpi-label">${t('completionRate')}</div>
                <div class="task-kpi-value" style="color:${execHealthColor};">${completionRate}%</div>
                <div class="task-kpi-pct">${execHealthLabel}</div>
            </div>
        </div>
        <div class="task-progress-bar">
            <div class="task-progress-title">
                <span>${t('executionHealth')}</span>
                <span style="color:${execHealthColor}; font-weight:700;">${execHealthLabel}</span>
            </div>
            <div class="task-progress-track">
                ${dist.completed > 0 ? `<div class="task-progress-segment completed" style="width:${(dist.completed/total)*100}%;">${total > 0 && (dist.completed/total) > 0.1 ? dist.completed : ''}</div>` : ''}
                ${dist.inProgress > 0 ? `<div class="task-progress-segment inprogress" style="width:${(dist.inProgress/total)*100}%;">${total > 0 && (dist.inProgress/total) > 0.1 ? dist.inProgress : ''}</div>` : ''}
                ${dist.pending > 0 ? `<div class="task-progress-segment pending" style="width:${(dist.pending/total)*100}%;">${total > 0 && (dist.pending/total) > 0.1 ? dist.pending : ''}</div>` : ''}
                ${dist.overdue > 0 ? `<div class="task-progress-segment overdue" style="width:${(dist.overdue/total)*100}%;">${total > 0 && (dist.overdue/total) > 0.1 ? dist.overdue : ''}</div>` : ''}
            </div>
            <div class="task-progress-legend">
                <div class="legend-item"><div class="legend-dot completed"></div>${t('completedTasksKPI')} (${dist.completed})</div>
                <div class="legend-item"><div class="legend-dot inprogress"></div>${t('inProgressTasksKPI')} (${dist.inProgress})</div>
                <div class="legend-item"><div class="legend-dot pending"></div>${t('pendingTasksKPI')} (${dist.pending})</div>
                <div class="legend-item"><div class="legend-dot overdue"></div>${t('overdueTasksKPI')} (${dist.overdue})</div>
            </div>
        </div>
        <!-- Explicaciones -->
        <div class="kpi-explanation">
            <div class="kpi-explanation-title">${t('totalTasksKPI')}: ${total}</div>
            <div class="kpi-explanation-desc">${t('totalTasksDesc')} <br><span style="color:var(--gold-dark); font-weight:500;">→ ${t('kpiTotalTasksImpact', { total })}</span></div>
        </div>
        <div class="kpi-explanation">
            <div class="kpi-explanation-title">${t('completedTasksKPI')}: ${dist.completed} (${total > 0 ? Math.round((dist.completed/total)*100) : 0}%)</div>
            <div class="kpi-explanation-desc">${t('completedTasksDesc')} <br><span style="color:var(--gold-dark); font-weight:500;">→ ${t('kpiCompletedImpact', { completed: dist.completed, pct: total > 0 ? Math.round((dist.completed/total)*100) : 0 })}</span></div>
        </div>
        <div class="kpi-explanation">
            <div class="kpi-explanation-title">${t('inProgressTasksKPI')}: ${dist.inProgress} (${total > 0 ? Math.round((dist.inProgress/total)*100) : 0}%)</div>
            <div class="kpi-explanation-desc">${t('inProgressTasksDesc')} <br><span style="color:var(--gold-dark); font-weight:500;">→ ${t('kpiInProgressImpact', { inProgress: dist.inProgress })}</span></div>
        </div>
        <div class="kpi-explanation">
            <div class="kpi-explanation-title">${t('pendingTasksKPI')}: ${dist.pending} (${total > 0 ? Math.round((dist.pending/total)*100) : 0}%)</div>
            <div class="kpi-explanation-desc">${t('pendingTasksDesc')} <br><span style="color:var(--gold-dark); font-weight:500;">→ ${t('kpiPendingImpact', { pending: dist.pending })}</span></div>
        </div>
        <div class="kpi-explanation">
            <div class="kpi-explanation-title">${t('overdueTasksKPI')}: ${dist.overdue} (${overdueRate}%)</div>
            <div class="kpi-explanation-desc">${t('overdueTasksDesc')} <br><span style="color:var(--gold-dark); font-weight:500;">→ ${t('kpiOverdueImpact', { overdue: dist.overdue })}</span></div>
        </div>
        <div class="kpi-explanation">
            <div class="kpi-explanation-title">${t('completionRate')}: ${completionRate}%</div>
            <div class="kpi-explanation-desc">${t('completionRateDesc')} <br><span style="color:var(--gold-dark); font-weight:500;">→ ${t('kpiCompletionImpact', { pct: completionRate })}</span></div>
        </div>
        <div class="kpi-explanation">
            <div class="kpi-explanation-title">${t('executionHealth')}: ${execHealthLabel}</div>
            <div class="kpi-explanation-desc">${t('executionHealthDesc')} <br><span style="color:var(--gold-dark); font-weight:500;">→ ${t('kpiHealthImpact', { health: execHealthLabel, overdue: overdueRate, completion: completionRate })}</span></div>
        </div>
    </div>
    <div class="page-footer">
        <span>${t('confidential')}</span>
        <span>${t('footer')}</span>
    </div>
</div>

<!-- ==================== PÁGINA 4: BURNDOWN ==================== -->
<div class="page">
    <div class="gold-frame"></div>
    <div class="corner tl"></div>
    <div class="corner tr"></div>
    <div class="corner bl"></div>
    <div class="corner br"></div>
    <div class="page-header">
        <div class="page-header-left">📊 ${t('storyTitle')}</div>
        <div class="page-header-right">${project.name}</div>
    </div>
    <div class="section">
        <h2 class="section-title"><span class="num">III</span> Burndown Chart</h2>
        <div class="narrative" style="margin-bottom:6mm;">
            ${getLang() === 'es' 
                ? 'El Burndown Chart muestra visualmente el progreso del proyecto en términos de trabajo pendiente (horas). La <strong>línea gris</strong> representa el ritmo ideal, mientras que la <strong>línea dorada</strong> refleja la ejecución real. La diferencia entre ambas indica la desviación actual y permite anticipar acciones correctivas.'
                : 'The Burndown Chart visually shows project progress in terms of remaining work (hours). The <strong>gray line</strong> represents the ideal pace, while the <strong>gold line</strong> reflects actual execution. The difference between them indicates current deviation and allows anticipating corrective actions.'}
        </div>
        <div style="background:#fff; border:1px solid var(--gold); border-radius:4mm; padding:6mm; text-align:center;">
            <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto; max-width:700px;">
                <rect x="0" y="0" width="800" height="400" fill="#fcf9f5" rx="8" />
                <line x1="80" y1="340" x2="740" y2="340" stroke="#333" stroke-width="2" />
                <line x1="80" y1="40" x2="80" y2="340" stroke="#333" stroke-width="2" />
                <text x="60" y="340" text-anchor="end" font-size="12" fill="#666">0</text>
                <text x="60" y="240" text-anchor="end" font-size="12" fill="#666">${Math.round(evm.BAC * 0.5)}</text>
                <text x="60" y="140" text-anchor="end" font-size="12" fill="#666">${Math.round(evm.BAC * 0.75)}</text>
                <text x="60" y="50" text-anchor="end" font-size="12" fill="#666">${evm.BAC.toFixed(0)}</text>
                ${(() => {
                    const startDate = new Date(Math.min(...tasks.map(t => new Date(t.startDate).getTime())));
                    const endDate = new Date(Math.max(...tasks.map(t => new Date(t.deadline).getTime())));
                    const totalDays = Math.ceil((endDate - startDate) / (1000*60*60*24)) || 1;
                    const weeks = Math.max(1, Math.ceil(totalDays / 7));
                    let labels = '';
                    for (let i = 0; i <= weeks; i++) {
                        const x = 80 + (i / weeks) * 660;
                        const label = i === 0 ? (getLang() === 'es' ? 'Inicio' : 'Start') : i === weeks ? (getLang() === 'es' ? 'Hoy' : 'Today') : (getLang() === 'es' ? `Sem ${i}` : `Wk ${i}`);
                        labels += `<text x="${x}" y="360" text-anchor="middle" font-size="10" fill="#666">${label}</text>`;
                        labels += `<line x1="${x}" y1="340" x2="${x}" y2="345" stroke="#ccc" stroke-width="1" />`;
                    }
                    return labels;
                })()}
                <line x1="80" y1="50" x2="740" y2="340" stroke="#aaa" stroke-width="2" stroke-dasharray="8,6" />
                ${(() => {
                    const xStart = 80, yStart = 50;
                    const progressPct = Math.min(1, evm.progress / 100);
                    const remaining = evm.BAC - evm.EV;
                    const total = evm.BAC;
                    const yEnd = 50 + (340 - 50) * (remaining / total);
                    const xEnd = 80 + 660 * progressPct;
                    return `<line x1="${xStart}" y1="${yStart}" x2="${xEnd}" y2="${yEnd}" stroke="#D4AF37" stroke-width="3" />`;
                })()}
                ${(() => {
                    const remaining = evm.BAC - evm.EV;
                    const total = evm.BAC;
                    const y = 50 + (340 - 50) * (remaining / total);
                    const progressPct = Math.min(1, evm.progress / 100);
                    const x = 80 + 660 * progressPct;
                    return `<circle cx="${x}" cy="${y}" r="8" fill="#D4AF37" stroke="#fff" stroke-width="2" />
                            <text x="${x + 14}" y="${y + 4}" font-size="12" fill="#333">${remaining.toFixed(0)}h ${getLang() === 'es' ? 'rest.' : 'rem.'}</text>`;
                })()}
                <rect x="600" y="30" width="130" height="60" fill="rgba(255,255,255,0.8)" stroke="#ddd" rx="4" />
                <line x1="610" y1="45" x2="640" y2="45" stroke="#aaa" stroke-dasharray="4,4" stroke-width="2" />
                <text x="650" y="48" font-size="10" fill="#666">${getLang() === 'es' ? 'Ideal' : 'Ideal'}</text>
                <line x1="610" y1="65" x2="640" y2="65" stroke="#D4AF37" stroke-width="2" />
                <text x="650" y="68" font-size="10" fill="#666">${getLang() === 'es' ? 'Real' : 'Actual'}</text>
            </svg>
        </div>
        <div class="narrative" style="margin-top:6mm; border-left-color:var(--gold-dark);">
            <strong style="color:var(--gold-dark);">${getLang() === 'es' ? 'Interpretación:' : 'Interpretation:'}</strong> 
            ${getLang() === 'es' 
                ? `El burndown muestra que el equipo ha completado el <strong>${evm.progress}%</strong> del trabajo total. La línea real se encuentra ${evm.SPI >= 1 ? 'por debajo' : 'por encima'} de la línea ideal, lo que indica ${evm.SPI >= 1 ? 'un avance más rápido de lo planeado' : 'un retraso que requiere atención'}. El trabajo restante estimado es de <strong>${(evm.BAC - evm.EV).toFixed(1)} horas</strong>. ${evm.SPI < 1 ? 'Se recomienda revisar las tareas de la ruta crítica y acelerar el ritmo.' : 'Se mantiene una tendencia positiva; se puede explorar la optimización de recursos.'}`
                : `The burndown shows the team has completed <strong>${evm.progress}%</strong> of the total work. The actual line is ${evm.SPI >= 1 ? 'below' : 'above'} the ideal line, indicating ${evm.SPI >= 1 ? 'faster than planned progress' : 'a delay requiring attention'}. The estimated remaining work is <strong>${(evm.BAC - evm.EV).toFixed(1)} hours</strong>. ${evm.SPI < 1 ? 'It is recommended to review critical path tasks and accelerate the pace.' : 'A positive trend is maintained; resource optimization can be explored.'}`
            }
        </div>
    </div>
    <div class="page-footer">
        <span>${t('confidential')}</span>
        <span>${t('footer')}</span>
    </div>
</div>

<!-- ==================== PÁGINA 5: EVM ==================== -->
<div class="page">
    <div class="gold-frame"></div>
    <div class="corner tl"></div>
    <div class="corner tr"></div>
    <div class="corner bl"></div>
    <div class="corner br"></div>
    <div class="page-header">
        <div class="page-header-left">📊 ${t('storyTitle')}</div>
        <div class="page-header-right">${project.name}</div>
    </div>
    <div class="section">
        <h2 class="section-title"><span class="num">IV</span> ${t('evm')}</h2>
        <div class="narrative" style="margin-bottom:6mm;">${t('kpiDescription')}</div>
        <div class="kpi-grid">
            <div class="kpi-card"><div class="kpi-label">PV</div><div class="kpi-value">${evm.PV.toFixed(1)}h</div></div>
            <div class="kpi-card"><div class="kpi-label">EV</div><div class="kpi-value green">${evm.EV.toFixed(1)}h</div></div>
            <div class="kpi-card"><div class="kpi-label">AC</div><div class="kpi-value red">${evm.AC.toFixed(1)}h</div></div>
            <div class="kpi-card"><div class="kpi-label">BAC</div><div class="kpi-value">${evm.BAC.toFixed(1)}h</div></div>
        </div>
        <table class="evm-table">
            <thead><tr><th>${getLang() === 'es' ? 'Indicador' : 'Indicator'}</th><th>${getLang() === 'es' ? 'Valor' : 'Value'}</th><th>${getLang() === 'es' ? 'Estado' : 'Status'}</th></tr></thead>
            <tbody>
                <tr><td>SPI (Schedule Performance Index)</td><td class="value">${evm.SPI.toFixed(2)}</td><td>${evm.SPI >= 1 ? '✅ ' + (getLang() === 'es' ? 'En plazo' : 'On schedule') : '⚠️ ' + (getLang() === 'es' ? 'Retrasado' : 'Delayed')}</td></tr>
                <tr><td>CPI (Cost Performance Index)</td><td class="value">${evm.CPI.toFixed(2)}</td><td>${evm.CPI >= 1 ? '✅ ' + (getLang() === 'es' ? 'En presupuesto' : 'On budget') : '⚠️ ' + (getLang() === 'es' ? 'Sobre coste' : 'Over cost')}</td></tr>
                <tr><td>EAC (Estimate at Completion)</td><td class="value">${evm.EAC.toFixed(1)}h</td><td>${evm.EAC <= evm.BAC ? '✅' : '⚠️'} ${budgetStatus}</td></tr>
                <tr><td>VAC (Variance at Completion)</td><td class="value">${evm.VAC >= 0 ? '+' : ''}${evm.VAC.toFixed(1)}h</td><td>${evm.VAC >= 0 ? '✅' : '⚠️'} ${getLang() === 'es' ? 'Variación' : 'Variance'}</td></tr>
            </tbody>
        </table>
        <div class="narrative">${performanceNarrative}</div>
    </div>
    <div class="section">
        <h2 class="section-title"><span class="num">V</span> ${t('kpis')}</h2>
        <div class="kpi-explanation">
            <div class="kpi-explanation-title">${t('kpiPV')}: ${evm.PV.toFixed(1)}h</div>
            <div class="kpi-explanation-desc">${t('kpiPVDesc')} <br><span style="color:var(--gold-dark); font-weight:500;">→ ${t('kpiPVImpact', { pv: evm.PV.toFixed(1) })}</span></div>
        </div>
        <div class="kpi-explanation">
            <div class="kpi-explanation-title">${t('kpiEV')}: ${evm.EV.toFixed(1)}h</div>
            <div class="kpi-explanation-desc">${t('kpiEVDesc')} <br><span style="color:var(--gold-dark); font-weight:500;">→ ${t('kpiEVImpact', { ev: evm.EV.toFixed(1), comparison: evm.EV >= evm.PV ? t('above') : t('below') })}</span></div>
        </div>
        <div class="kpi-explanation">
            <div class="kpi-explanation-title">${t('kpiAC')}: ${evm.AC.toFixed(1)}h</div>
            <div class="kpi-explanation-desc">${t('kpiACDesc')} <br><span style="color:var(--gold-dark); font-weight:500;">→ ${t('kpiACImpact', { ac: evm.AC.toFixed(1), efficiency: evm.AC <= evm.EV ? t('efficient') : t('exceeding') })}</span></div>
        </div>
        <div class="kpi-explanation">
            <div class="kpi-explanation-title">${t('kpiBAC')}: ${evm.BAC.toFixed(1)}h</div>
            <div class="kpi-explanation-desc">${t('kpiBACDesc')}</div>
        </div>
        <div class="kpi-explanation">
            <div class="kpi-explanation-title">${t('kpiSPI')}: ${evm.SPI.toFixed(2)}</div>
            <div class="kpi-explanation-desc">${t('kpiSPIDesc')} <br><span style="color:var(--gold-dark); font-weight:500;">→ ${t('kpiSPIImpact', { status: evm.SPI >= 1 ? t('adequate') : t('delayed'), pct: evm.SPI >= 1 ? '0' : Math.round((1 - evm.SPI)*100) })}</span></div>
        </div>
        <div class="kpi-explanation">
            <div class="kpi-explanation-title">${t('kpiCPI')}: ${evm.CPI.toFixed(2)}</div>
            <div class="kpi-explanation-desc">${t('kpiCPIDesc')} <br><span style="color:var(--gold-dark); font-weight:500;">→ ${t('kpiCPIImpact', { status: evm.CPI >= 1 ? t('costEfficient') : t('overCost'), pct: evm.CPI >= 1 ? '0' : Math.round((1 - evm.CPI)*100) })}</span></div>
        </div>
        <div class="kpi-explanation">
            <div class="kpi-explanation-title">${t('kpiEAC')}: ${evm.EAC.toFixed(1)}h</div>
            <div class="kpi-explanation-desc">${t('kpiEACDesc')} <br><span style="color:var(--gold-dark); font-weight:500;">→ ${t('kpiEACImpact', { eac: evm.EAC.toFixed(1) })}</span></div>
        </div>
        <div class="kpi-explanation">
            <div class="kpi-explanation-title">${t('kpiETC')}: ${evm.ETC.toFixed(1)}h</div>
            <div class="kpi-explanation-desc">${t('kpiETCDesc')} <br><span style="color:var(--gold-dark); font-weight:500;">→ ${t('kpiETCImpact', { etc: evm.ETC.toFixed(1) })}</span></div>
        </div>
        <div class="kpi-explanation">
            <div class="kpi-explanation-title">${t('kpiVAC')}: ${evm.VAC >= 0 ? '+' : ''}${evm.VAC.toFixed(1)}h</div>
            <div class="kpi-explanation-desc">${t('kpiVACDesc')} <br><span style="color:var(--gold-dark); font-weight:500;">→ ${t('kpiVACImpact', { status: evm.VAC >= 0 ? t('savings') : t('overspending'), vac: Math.abs(evm.VAC).toFixed(1) })}</span></div>
        </div>
        <div class="narrative" style="margin-top:6mm; border-left-color:var(--gold-dark);">
            <strong style="color:var(--gold-dark);">${t('kpiInterpretation')}:</strong> ${t('kpiInterpretationText')}
        </div>
    </div>
    <div class="page-footer">
        <span>${t('confidential')}</span>
        <span>${t('footer')}</span>
    </div>
</div>

<!-- ==================== PÁGINA 6: RIESGOS + EQUIPO ==================== -->
<div class="page">
    <div class="gold-frame"></div>
    <div class="corner tl"></div>
    <div class="corner tr"></div>
    <div class="corner bl"></div>
    <div class="corner br"></div>
    <div class="page-header">
        <div class="page-header-left">📊 ${t('storyTitle')}</div>
        <div class="page-header-right">${project.name}</div>
    </div>
    <div class="section">
        <h2 class="section-title"><span class="num">VI</span> ${t('criticalRisks')}</h2>
        ${tasks.filter(t => t.status !== 'completed' && t.deadline).sort((a,b) => new Date(a.deadline) - new Date(b.deadline)).slice(0,6).map(t => {
            const days = Math.ceil((new Date(t.deadline) - new Date()) / (1000*60*60*24));
            let level = '', dotClass = '';
            if (days <= 0) { level = getLang() === 'es' ? 'Crítico' : 'Critical'; dotClass = 'critical'; }
            else if (days <= 3) { level = getLang() === 'es' ? 'Alto' : 'High'; dotClass = 'high'; }
            else if (days <= 7) { level = getLang() === 'es' ? 'Medio' : 'Medium'; dotClass = 'medium'; }
            else { level = getLang() === 'es' ? 'Bajo' : 'Low'; dotClass = 'low'; }
            return `<div class="risk-item"><div class="risk-dot ${dotClass}"></div><div class="risk-name">${t.name}</div><div class="risk-level">${level}</div></div>`;
        }).join('')}
        ${tasks.filter(t => t.status !== 'completed' && t.deadline).length === 0 ? '<div class="narrative">' + t('noRisksDetected') + '</div>' : ''}
        <div class="narrative">${riskNarrative}</div>
    </div>
    <div class="section">
        <h2 class="section-title"><span class="num">VII</span> ${t('teamResources')}</h2>
        <div class="team-grid">
            ${assignees.map(name => {
                const userTasks = tasks.filter(t => t.assignee === name);
                const comp = userTasks.filter(t => t.status === 'completed' || t.progress >= 100).length;
                const totalUser = userTasks.length;
                const pct = totalUser > 0 ? Math.round((comp/totalUser)*100) : 0;
                return `<div class="team-member"><div class="team-avatar">${name.charAt(0).toUpperCase()}</div><div class="team-info"><div class="team-name">${name}</div><div class="team-tasks">${comp}/${totalUser} ${t('tasks')}</div></div><div class="team-pct">${pct}%</div></div>`;
            }).join('')}
        </div>
        <div class="narrative">${teamNarrative}</div>
    </div>
    <div class="page-footer">
        <span>${t('confidential')}</span>
        <span>${t('footer')}</span>
    </div>
</div>

<!-- ==================== PÁGINA 7: RECOMENDACIONES + OUTLOOK ==================== -->
<div class="page">
    <div class="gold-frame"></div>
    <div class="corner tl"></div>
    <div class="corner tr"></div>
    <div class="corner bl"></div>
    <div class="corner br"></div>
    <div class="page-header">
        <div class="page-header-left">📊 ${t('storyTitle')}</div>
        <div class="page-header-right">${project.name}</div>
    </div>
    <div class="section">
        <h2 class="section-title"><span class="num">VIII</span> ${t('strategicRecommendations')}</h2>
        ${evm.progress >= 80 ? `
            <div class="recommendation"><div class="recommendation-title">✅ ${t('maintainCourse')}</div><div class="recommendation-desc">${t('maintainDesc')}</div></div>
            <div class="recommendation"><div class="recommendation-title">✅ ${t('optimizeResources')}</div><div class="recommendation-desc">${t('optimizeDesc')}</div></div>
            <div class="recommendation"><div class="recommendation-title">✅ ${t('prepareDelivery')}</div><div class="recommendation-desc">${t('prepareDesc')}</div></div>
        ` : evm.progress >= 50 ? `
            <div class="recommendation"><div class="recommendation-title">🔸 ${t('prioritizeCritical')}</div><div class="recommendation-desc">${t('prioritizeDesc')}</div></div>
            <div class="recommendation"><div class="recommendation-title">🔸 ${t('reviewWorkload')}</div><div class="recommendation-desc">${t('reviewDesc')}</div></div>
            <div class="recommendation"><div class="recommendation-title">🔸 ${t('activeCommunication')}</div><div class="recommendation-desc">${t('activeCommDesc')}</div></div>
        ` : `
            <div class="recommendation"><div class="recommendation-title">⚠️ ${t('urgentIntervention')}</div><div class="recommendation-desc">${t('urgentDesc')}</div></div>
            <div class="recommendation"><div class="recommendation-title">⚠️ ${t('reinforceTeam')}</div><div class="recommendation-desc">${t('reinforceDesc')}</div></div>
            <div class="recommendation"><div class="recommendation-title">⚠️ ${t('contingencyPlan')}</div><div class="recommendation-desc">${t('contingencyDesc')}</div></div>
        `}
        <div class="narrative">${t('recommendationsNote')}</div>
    </div>
    <div class="section">
        <h2 class="section-title"><span class="num">IX</span> ${t('outlook')}</h2>
        <div class="outlook-grid">
            <div class="outlook-card"><div class="outlook-label">${t('completionForecast')}</div><div class="outlook-value">${evm.EAC.toFixed(1)}h</div><div class="outlook-sub">${evm.EAC <= evm.BAC ? t('withinBudgetLabel') : '⚠️ ' + (evm.EAC - evm.BAC).toFixed(1) + ' ' + t('extra')}</div></div>
            <div class="outlook-card"><div class="outlook-label">${t('pendingTasks')}</div><div class="outlook-value">${dist.pending + dist.inProgress}</div><div class="outlook-sub">${dist.inProgress} ${t('inProgressLabel')}, ${dist.pending} ${t('toStart')}</div></div>
            <div class="outlook-card"><div class="outlook-label">${t('immediateAction')}</div><div class="outlook-value" style="font-size:14px;">${dist.overdue > 0 ? t('resolveOverdue', { overdue: dist.overdue }) : t('maintainPace')}</div><div class="outlook-sub">${t('highPriority')}</div></div>
        </div>
        <div class="narrative">${outlookNarrative}</div>
        <div style="margin-top:6mm; padding:4mm; background:var(--black); border-radius:3mm; border-left:4px solid ${healthColor};">
            <div style="color:var(--gold); font-weight:600; font-size:14px; text-transform:uppercase; letter-spacing:2px;">
                ${healthStatusKey === 'excellent' ? '✅ ' + (getLang() === 'es' ? 'Proyecto en Verde' : 'Project Green') : healthStatusKey === 'onTrack' ? '⚠️ ' + (getLang() === 'es' ? 'Proyecto en Amarillo' : 'Project Yellow') : '❌ ' + (getLang() === 'es' ? 'Proyecto en Rojo' : 'Project Red')}
            </div>
            <div style="color:#e5e5e5; font-size:11px; margin-top:2mm;">${verdictNarrative}</div>
        </div>
        <div style="margin-top:6mm; padding:4mm; background:#0f172a; border-radius:3mm; text-align:center; color:#cbd5e1; font-size:11px;">
            <span style="font-weight:600;">${t('nextReview')}:</span> ${new Date(new Date().getTime() + 7*24*60*60*1000).toLocaleDateString(locale)}
        </div>
    </div>
    <div class="signature-block">
        <div>
            <div style="font-size:9px; color:#666; letter-spacing:2px; text-transform:uppercase; margin-bottom:2mm;">${t('generatedOn')}</div>
            <div style="font-size:11px; color:var(--black);">${generatedDate}</div>
            <div class="signature-line">${t('executiveSystem')}</div>
        </div>
    </div>
    <div class="page-footer">
        <span>${t('confidential')}</span>
        <span>${t('footer')}</span>
    </div>
</div>

</body>
</html>
        `;

        // Abrir ventana de impresión
        const printWindow = window.open('', '_blank', 'width=900,height=700');
        if (!printWindow) {
            alert(getLang() === 'es' ? 
                '⚠️ Por favor, permite las ventanas emergentes para exportar el PDF.' : 
                '⚠️ Please allow pop-ups to export the PDF.');
            return;
        }
        
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        
        printWindow.onload = function() {
            setTimeout(() => {
                printWindow.focus();
                printWindow.print();
            }, 500);
        };
    }

    // ============================================================
// 6. STORYTELLING MODAL (VERSIÓN COMPLETA)
// ============================================================
function openStorytelling() {
    const project = getCurrentProject();
    if (!project) {
        alert('⚠️ ' + (getLang() === 'es' ? 'No hay proyecto seleccionado.' : 'No project selected.'));
        return;
    }
    const tasks = project.tasks || [];
    if (tasks.length === 0) {
        alert('⚠️ ' + (getLang() === 'es' ? 'El proyecto no tiene tareas.' : 'The project has no tasks.'));
        return;
    }

    const evm = calcEVM(tasks);
    if (!evm) {
        alert('⚠️ ' + (getLang() === 'es' ? 'Error calculando métricas.' : 'Error calculating metrics.'));
        return;
    }
    const dist = getDist(tasks);
    const total = tasks.length;
    const assignees = [...new Set(tasks.map(t => t.assignee).filter(Boolean))];
    let topAssignee = 'N/A', topCount = 0;
    const counts = {};
    tasks.forEach(t => { if (t.assignee) { counts[t.assignee] = (counts[t.assignee]||0)+1; if (counts[t.assignee] > topCount) { topCount = counts[t.assignee]; topAssignee = t.assignee; } } });
    
    const locale = getLang() === 'es' ? 'es-ES' : 'en-US';
    const na = getLang() === 'es' ? 'N/D' : 'N/A';
    const startDates = tasks.map(t => t.startDate).filter(Boolean);
    const endDates = tasks.map(t => t.deadline).filter(Boolean);
    const start = startDates.length ? new Date(Math.min(...startDates.map(d => new Date(d)))).toLocaleDateString(locale) : na;
    const end = endDates.length ? new Date(Math.max(...endDates.map(d => new Date(d)))).toLocaleDateString(locale) : na;

    const efficiency = Math.round(((evm.CPI + evm.SPI) / 2) * 100);
    const healthStatusKey = evm.progress >= 80 ? 'excellent' : evm.progress >= 50 ? 'onTrack' : 'critical';
    const healthColor = evm.progress >= 80 ? '#10b981' : evm.progress >= 50 ? '#f59e0b' : '#ef4444';

    const overdueTasks = tasks.filter(t => t.status !== 'completed' && t.deadline && new Date(t.deadline) < new Date());

    let verdictNarrative = evm.progress >= 80 ? t('verdictExcellent', { progress: evm.progress }) :
                           evm.progress >= 50 ? t('verdictOnTrack', { progress: evm.progress }) :
                           t('verdictCritical', { progress: evm.progress });

    let performanceNarrative = '';
    if (evm.SPI >= 1 && evm.CPI >= 1) performanceNarrative = t('performanceExcellent', { spi: evm.SPI.toFixed(2), cpi: evm.CPI.toFixed(2), ev: evm.EV.toFixed(1) });
    else if (evm.SPI >= 1 && evm.CPI < 1) performanceNarrative = t('performanceScheduleCost', { spi: evm.SPI.toFixed(2), cpi: evm.CPI.toFixed(2) });
    else if (evm.SPI < 1 && evm.CPI >= 1) performanceNarrative = t('performanceCostSchedule', { spi: evm.SPI.toFixed(2), cpi: evm.CPI.toFixed(2) });
    else performanceNarrative = t('performanceCritical', { spi: evm.SPI.toFixed(2), cpi: evm.CPI.toFixed(2) });

    const teamNarrative = t('teamNarrative', {
        collaborators: assignees.length || 1,
        avgTasks: total > 0 ? Math.round(total / (assignees.length || 1)) : 0,
        topAssignee: topAssignee,
        topCount: topCount
    });

    const riskNarrative = overdueTasks.length === 0 ? t('noRisksDetected') : t('riskNarrativeOverdue', { overdueCount: overdueTasks.length });

    const budgetStatus = evm.EAC <= evm.BAC ? t('withinBudgetLabel') + ' (BAC = ' + evm.BAC.toFixed(1) + 'h)' : '⚠️ ' + (evm.EAC - evm.BAC).toFixed(1) + ' ' + t('extra');
    const outlookNarrative = t('outlookNarrative', { eac: evm.EAC.toFixed(1), budgetStatus: budgetStatus });

    // Crear overlay (igual que antes)
    const overlay = document.createElement('div');
    overlay.id = 'storytellingOverlay';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: radial-gradient(ellipse at top left, #0f172a 0%, #020617 100%);
        z-index: 10000001; overflow-y: auto; padding: 40px 20px;
        font-family: 'Inter', 'Segoe UI', system-ui, sans-serif; color: #e2e8f0;
        display: flex; flex-direction: column; align-items: center; box-sizing: border-box;
    `;

    // Botón cerrar
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕ ' + t('close');
    closeBtn.style.cssText = `
        position: fixed; top: 20px; right: 30px;
        background: rgba(239,68,68,0.15); border: 1px solid #ef4444;
        color: #ef4444; padding: 10px 24px; border-radius: 40px;
        cursor: pointer; font-weight: 600; z-index: 10000002;
        transition: all 0.3s; font-size: 14px; letter-spacing: 0.5px;
    `;
    closeBtn.onmouseenter = function() { this.style.background = '#ef4444'; this.style.color = '#fff'; };
    closeBtn.onmouseleave = function() { this.style.background = 'rgba(239,68,68,0.15)'; this.style.color = '#ef4444'; };
    closeBtn.onclick = () => overlay.remove();
    overlay.appendChild(closeBtn);

    // Botón exportar PDF
    const exportBtn = document.createElement('button');
    exportBtn.innerHTML = `📄 ${t('exportPDF')}`;
    exportBtn.style.cssText = `
        position: fixed; top: 20px; right: 180px;
        background: linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #D4AF37 100%);
        border: 1px solid #F4E4B8;
        color: #0a0a0a; padding: 10px 24px; border-radius: 40px;
        cursor: pointer; font-weight: 700; z-index: 10000002;
        transition: all 0.3s; font-size: 14px; letter-spacing: 0.5px;
        box-shadow: 0 4px 20px rgba(212, 175, 55, 0.4), inset 0 1px 0 rgba(255,255,255,0.3);
        font-family: 'Inter', sans-serif;
    `;
    exportBtn.onmouseenter = function() { 
        this.style.transform = 'translateY(-2px)'; 
        this.style.boxShadow = '0 8px 30px rgba(212, 175, 55, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)';
    };
    exportBtn.onmouseleave = function() { 
        this.style.transform = 'translateY(0)'; 
        this.style.boxShadow = '0 4px 20px rgba(212, 175, 55, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)';
    };
    exportBtn.onclick = (e) => {
        e.stopPropagation();
        exportToPDF();
    };
    overlay.appendChild(exportBtn);

    // Selector de idioma
    const langSelector = document.createElement('div');
    langSelector.style.cssText = `
        position: fixed; top: 20px; left: 30px; z-index: 10000002;
        display: flex; gap: 8px; background: rgba(15,23,42,0.8);
        padding: 6px 12px; border-radius: 40px; border: 1px solid rgba(139,92,246,0.3);
        backdrop-filter: blur(8px);
    `;
    const btnES = document.createElement('button');
    btnES.textContent = 'ES';
    btnES.style.cssText = `background: ${getLang() === 'es' ? '#8b5cf6' : 'transparent'}; color: ${getLang() === 'es' ? '#fff' : '#94a3b8'}; border: none; padding: 4px 12px; border-radius: 20px; cursor: pointer; font-weight: 600; font-size: 13px; transition: all 0.3s;`;
    btnES.onclick = function(e) {
        e.stopPropagation();
        if (getLang() !== 'es') {
            window.currentLanguage = 'es';
            localStorage.setItem('appLanguage', 'es');
            localStorage.setItem('lang', 'es');
            updateLanguageButton();
            overlay.remove();
            openStorytelling();
        }
    };
    const btnEN = document.createElement('button');
    btnEN.textContent = 'EN';
    btnEN.style.cssText = `background: ${getLang() === 'en' ? '#8b5cf6' : 'transparent'}; color: ${getLang() === 'en' ? '#fff' : '#94a3b8'}; border: none; padding: 4px 12px; border-radius: 20px; cursor: pointer; font-weight: 600; font-size: 13px; transition: all 0.3s;`;
    btnEN.onclick = function(e) {
        e.stopPropagation();
        if (getLang() !== 'en') {
            window.currentLanguage = 'en';
            localStorage.setItem('appLanguage', 'en');
            localStorage.setItem('lang', 'en');
            updateLanguageButton();
            overlay.remove();
            openStorytelling();
        }
    };
    langSelector.appendChild(btnES);
    langSelector.appendChild(btnEN);
    overlay.appendChild(langSelector);

    // Estilos dinámicos
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes fadeSlideIn { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        .exec-badge { display:inline-block; padding:4px 16px; border-radius:40px; font-size:12px; font-weight:600; letter-spacing:0.5px; text-transform:uppercase; }
        .exec-stat-card { background:rgba(30,41,59,0.5); backdrop-filter:blur(8px); border-radius:16px; padding:24px; border:1px solid rgba(255,255,255,0.05); transition:all 0.3s; }
        .exec-stat-card:hover { border-color:rgba(139,92,246,0.3); transform:translateY(-2px); box-shadow:0 12px 40px rgba(0,0,0,0.3); }
        .exec-list-item { display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.04); }
        .exec-list-item:last-child { border-bottom:none; }
        .exec-tag { font-size:11px; font-weight:600; padding:2px 12px; border-radius:20px; }
        .narrative-text { color:#cbd5e1; line-height:1.7; font-size:1rem; margin:12px 0 0 0; padding:12px 16px; background:rgba(15,23,42,0.5); border-radius:12px; border-left:3px solid #8b5cf6; }
    `;
    document.head.appendChild(styleSheet);

    // ============================================================
    // CONTENIDO COMPLETO DEL MODAL (con todas las secciones)
    // ============================================================
    const content = document.createElement('div');
    content.style.cssText = 'max-width: 1100px; width: 100%; padding: 20px 0; animation: fadeSlideIn 0.6s ease;';
    const healthStatusLabel = t('healthStatus.' + healthStatusKey);
    const opportunities = [
        { icon: '✅', title: dist.completed + ' ' + t('completedTasks'), desc: t('knowledgeBase') },
        { icon: '📈', title: evm.progress + '% ' + t('progressRate'), desc: t('sustainablePace') },
        { icon: '🔧', title: assignees.length + ' ' + t('activeResources'), desc: t('installedCapacity') }
    ];

    content.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; margin-bottom:50px; text-align:center;">
            <div style="display:flex; align-items:center; gap:16px; margin-bottom:8px;">
                <span style="font-size:44px;">📊</span>
                <h1 style="font-size:3.2rem; font-weight:700; margin:0; background:linear-gradient(135deg,#ffffff,#a78bfa); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">${t('storyTitle')}</h1>
            </div>
            <p style="color:#94a3b8; font-size:1.3rem; margin:0;">${t('project')}: ${project.name}</p>
            <div style="display:flex; gap:20px; margin-top:10px; flex-wrap:wrap; justify-content:center;">
                <span style="color:#64748b; font-size:0.9rem;">📅 ${start} → ${end}</span>
                <span style="color:#64748b; font-size:0.9rem;">📋 ${total} ${t('tasks')}</span>
                <span style="color:#64748b; font-size:0.9rem;">👥 ${assignees.length || 1} ${t('collaborators')}</span>
                <span style="color:#64748b; font-size:0.9rem;">🕒 ${t('updated')}: ${new Date().toLocaleString(locale)}</span>
            </div>
        </div>

        <div class="exec-stat-card" style="margin-bottom:40px; border-left:6px solid ${healthColor};">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:20px;">
                <div style="flex:1;">
                    <div style="display:flex; align-items:center; gap:14px; flex-wrap:wrap;">
                        <span class="exec-badge" style="background:${healthColor}22; color:${healthColor}; border:1px solid ${healthColor}55;">${healthStatusLabel}</span>
                        <span style="font-size:0.9rem; color:#94a3b8;">${t('progress')}</span>
                        <span style="font-size:2rem; font-weight:700; color:${healthColor};">${evm.progress}%</span>
                    </div>
                    <div style="height:6px; background:#1e293b; border-radius:6px; margin:12px 0; overflow:hidden; max-width:400px;">
                        <div style="width:${evm.progress}%; height:100%; background:${healthColor}; border-radius:6px; transition:width 0.8s;"></div>
                    </div>
                    <div class="narrative-text">${verdictNarrative}</div>
                </div>
                <div style="display:flex; gap:20px; flex-wrap:wrap;">
                    <div style="background:#0f172a; border-radius:14px; padding:16px 24px; text-align:center; min-width:100px;">
                        <div style="font-size:0.7rem; color:#94a3b8; text-transform:uppercase; letter-spacing:1px;">${t('efficiency')}</div>
                        <div style="font-size:2.2rem; font-weight:700; color:${efficiency >= 80 ? '#34d399' : efficiency >= 60 ? '#f59e0b' : '#ef4444'};">${efficiency}%</div>
                    </div>
                    <div style="background:#0f172a; border-radius:14px; padding:16px 24px; text-align:center; min-width:100px;">
                        <div style="font-size:0.7rem; color:#94a3b8; text-transform:uppercase; letter-spacing:1px;">${t('forecast')}</div>
                        <div style="font-size:2.2rem; font-weight:700; color:${evm.EAC <= evm.BAC ? '#34d399' : '#f87171'};">${evm.EAC.toFixed(1)}h</div>
                    </div>
                </div>
            </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:30px; margin-bottom:40px;">
            <div class="exec-stat-card">
                <h3 style="color:#94a3b8; font-weight:400; text-transform:uppercase; letter-spacing:1px; font-size:0.8rem; margin:0 0 12px 0;">📊 ${t('evm')}</h3>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
                    <div><span style="color:#64748b; font-size:0.8rem;">PV</span><div style="font-size:1.6rem; font-weight:600; color:#60a5fa;">${evm.PV.toFixed(1)}h</div></div>
                    <div><span style="color:#64748b; font-size:0.8rem;">EV</span><div style="font-size:1.6rem; font-weight:600; color:#34d399;">${evm.EV.toFixed(1)}h</div></div>
                    <div><span style="color:#64748b; font-size:0.8rem;">AC</span><div style="font-size:1.6rem; font-weight:600; color:#f87171;">${evm.AC.toFixed(1)}h</div></div>
                    <div><span style="color:#64748b; font-size:0.8rem;">BAC</span><div style="font-size:1.6rem; font-weight:600; color:#a78bfa;">${evm.BAC.toFixed(1)}h</div></div>
                </div>
                <div style="margin-top:16px; display:flex; gap:20px; flex-wrap:wrap;">
                    <div><span style="color:#64748b; font-size:0.8rem;">SPI</span> <span style="font-weight:600; color:${evm.SPI >= 1 ? '#34d399' : '#f87171'};">${evm.SPI.toFixed(2)}</span></div>
                    <div><span style="color:#64748b; font-size:0.8rem;">CPI</span> <span style="font-weight:600; color:${evm.CPI >= 1 ? '#34d399' : '#f87171'};">${evm.CPI.toFixed(2)}</span></div>
                    <div><span style="color:#64748b; font-size:0.8rem;">VAC</span> <span style="font-weight:600; color:${evm.VAC >= 0 ? '#34d399' : '#f87171'};">${evm.VAC >= 0 ? '+' : ''}${evm.VAC.toFixed(1)}h</span></div>
                </div>
                <div class="narrative-text" style="margin-top:12px;">${performanceNarrative}</div>
            </div>
            <div class="exec-stat-card">
                <h3 style="color:#94a3b8; font-weight:400; text-transform:uppercase; letter-spacing:1px; font-size:0.8rem; margin:0 0 12px 0;">📉 ${t('trends')}</h3>
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <div><span style="color:#64748b; font-size:0.8rem;">${t('weeklyProgress')}</span><div style="font-size:1.4rem; font-weight:600;">${evm.progress > 0 ? Math.round(evm.progress / 4) : 0}%</div></div>
                    <div><span style="color:#64748b; font-size:0.8rem;">${t('executionRate')}</span><div style="font-size:1.4rem; font-weight:600; color:${evm.SPI >= 1 ? '#34d399' : '#f59e0b'};">${evm.SPI >= 1 ? t('adequateRate') : t('delayedRate')}</div></div>
                    <div><span style="color:#64748b; font-size:0.8rem;">${t('costEfficiencyLabel')}</span><div style="font-size:1.4rem; font-weight:600; color:${evm.CPI >= 1 ? '#34d399' : '#f87171'};">${evm.CPI >= 1 ? t('efficientLabel') : t('overCostLabel')}</div></div>
                </div>
                <div class="narrative-text" style="margin-top:12px;">${evm.SPI >= 1 && evm.CPI >= 1 ? '✅ ' + (getLang() === 'es' ? 'Ejecución equilibrada y eficiente.' : 'Balanced and efficient execution.') : evm.SPI >= 1 && evm.CPI < 1 ? '⚠️ ' + (getLang() === 'es' ? 'Revisar costes sin descuidar el ritmo.' : 'Review costs without neglecting pace.') : evm.SPI < 1 && evm.CPI >= 1 ? '⚠️ ' + (getLang() === 'es' ? 'Priorizar acciones para recuperar el cronograma.' : 'Prioritize actions to recover schedule.') : '⚠️ ' + (getLang() === 'es' ? 'Intervención integral en gestión de proyectos.' : 'Comprehensive intervention in project management.')}</div>
            </div>
        </div>

        <div class="exec-stat-card" style="margin-bottom:40px;">
            <h3 style="color:#94a3b8; font-weight:400; text-transform:uppercase; letter-spacing:1px; font-size:0.8rem; margin:0 0 16px 0;">👥 ${t('teamResources')}</h3>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
                <div>
                    <div style="font-size:0.9rem; color:#94a3b8; margin-bottom:8px;">${t('workload')}</div>
                    ${assignees.map(name => {
                        const userTasks = tasks.filter(t => t.assignee === name);
                        const comp = userTasks.filter(t => t.status === 'completed' || t.progress >= 100).length;
                        const totalUser = userTasks.length;
                        const pct = totalUser > 0 ? Math.round((comp/totalUser)*100) : 0;
                        const color = pct >= 80 ? '#34d399' : pct >= 50 ? '#fbbf24' : '#f87171';
                        return `<div class="exec-list-item">
                            <div style="width:32px; height:32px; border-radius:50%; background:${color}33; display:flex; align-items:center; justify-content:center; font-weight:700; color:${color}; font-size:13px;">${name.charAt(0).toUpperCase()}</div>
                            <div style="flex:1;"><div style="font-size:14px; font-weight:500;">${name}</div><div style="font-size:11px; color:#94a3b8;">${comp}/${totalUser} ${t('tasks')}</div></div>
                            <div style="width:70px;"><div style="height:4px; background:#1e293b; border-radius:2px;"><div style="width:${pct}%; height:100%; background:${color}; border-radius:2px;"></div></div></div>
                            <div style="font-size:13px; font-weight:600; color:${color}; min-width:35px; text-align:right;">${pct}%</div>
                        </div>`;
                    }).join('')}
                    ${assignees.length === 0 ? '<div style="color:#64748b; padding:10px 0;">' + (getLang() === 'es' ? 'No hay recursos asignados' : 'No resources assigned') + '</div>' : ''}
                </div>
                <div>
                    <div style="font-size:0.9rem; color:#94a3b8; margin-bottom:8px;">${t('teamMetrics')}</div>
                    <div style="background:#0f172a; border-radius:12px; padding:16px;">
                        <div style="display:flex; justify-content:space-between; padding:6px 0;"><span style="color:#94a3b8;">${t('activeCollaborators')}</span><strong>${assignees.length || 1}</strong></div>
                        <div style="display:flex; justify-content:space-between; padding:6px 0; border-top:1px solid rgba(255,255,255,0.05);"><span style="color:#94a3b8;">${t('tasksPerPerson')}</span><strong>${total > 0 ? Math.round(total / (assignees.length || 1)) : 0}</strong></div>
                        <div style="display:flex; justify-content:space-between; padding:6px 0; border-top:1px solid rgba(255,255,255,0.05);"><span style="color:#94a3b8;">${t('mostProductive')}</span><strong style="color:#a78bfa;">${topAssignee}</strong> <span style="font-size:0.8rem; color:#94a3b8;">(${topCount} ${t('tasks')})</span></div>
                    </div>
                    <div class="narrative-text" style="margin-top:12px;">${teamNarrative}</div>
                </div>
            </div>
        </div>

        <div style="display:grid; grid-template-columns:2fr 1fr; gap:30px; margin-bottom:40px;">
            <div class="exec-stat-card">
                <h3 style="color:#94a3b8; font-weight:400; text-transform:uppercase; letter-spacing:1px; font-size:0.8rem; margin:0 0 16px 0;">⚠️ ${t('criticalRisks')}</h3>
                ${tasks.filter(t => t.status !== 'completed' && t.deadline).sort((a,b) => new Date(a.deadline) - new Date(b.deadline)).slice(0,6).map(t => {
                    const days = Math.ceil((new Date(t.deadline) - new Date()) / (1000*60*60*24));
                    let riskLevel = '', color = '';
                    if (days <= 0) { riskLevel = getLang() === 'es' ? 'Crítico' : 'Critical'; color = '#ef4444'; }
                    else if (days <= 3) { riskLevel = getLang() === 'es' ? 'Alto' : 'High'; color = '#f97316'; }
                    else if (days <= 7) { riskLevel = getLang() === 'es' ? 'Medio' : 'Medium'; color = '#f59e0b'; }
                    else { riskLevel = getLang() === 'es' ? 'Bajo' : 'Low'; color = '#10b981'; }
                    const daysLabel = days > 0 ? days + 'd' : (getLang() === 'es' ? 'Vencida' : 'Overdue');
                    return `<div class="exec-list-item">
                        <span style="font-size:1.2rem;">${days <= 0 ? '🔴' : days <= 3 ? '🟠' : days <= 7 ? '🟡' : '🟢'}</span>
                        <div style="flex:1; font-size:14px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${t.name}</div>
                        <span class="exec-tag" style="background:${color}22; color:${color};">${riskLevel}</span>
                        <span style="font-size:12px; color:#94a3b8;">${daysLabel}</span>
                    </div>`;
                }).join('')}
                ${tasks.filter(t => t.status !== 'completed' && t.deadline).length === 0 ? '<div style="color:#10b981; padding:16px 0;">' + t('noRisksDetected') + '</div>' : ''}
                <div class="narrative-text" style="margin-top:12px;">${riskNarrative}</div>
            </div>
            <div class="exec-stat-card">
                <h3 style="color:#94a3b8; font-weight:400; text-transform:uppercase; letter-spacing:1px; font-size:0.8rem; margin:0 0 16px 0;">📌 ${t('opportunities')}</h3>
                ${opportunities.map(opp => `
                    <div style="background:#0f172a; border-radius:10px; padding:14px; margin-bottom:10px;">
                        <div style="color:#34d399; font-weight:600; font-size:1rem;">${opp.icon} ${opp.title}</div>
                        <div style="color:#94a3b8; font-size:0.8rem;">${opp.desc}</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="exec-stat-card" style="margin-bottom:40px; border:1px solid rgba(139,92,246,0.3); background:rgba(139,92,246,0.06);">
            <h3 style="color:#c4b5fd; font-weight:600; text-transform:uppercase; letter-spacing:1px; font-size:0.8rem; margin:0 0 12px 0;">🎯 ${t('strategicRecommendations')}</h3>
            <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:12px;">
                ${evm.progress >= 80 ? `
                    <li style="display:flex; align-items:flex-start; gap:12px;"><span style="color:#34d399;">✅</span> <span><strong>${t('maintainCourse')}:</strong> ${t('maintainDesc')}</span></li>
                    <li style="display:flex; align-items:flex-start; gap:12px;"><span style="color:#34d399;">✅</span> <span><strong>${t('optimizeResources')}:</strong> ${t('optimizeDesc')}</span></li>
                    <li style="display:flex; align-items:flex-start; gap:12px;"><span style="color:#34d399;">✅</span> <span><strong>${t('prepareDelivery')}:</strong> ${t('prepareDesc')}</span></li>
                ` : evm.progress >= 50 ? `
                    <li style="display:flex; align-items:flex-start; gap:12px;"><span style="color:#f59e0b;">🔸</span> <span><strong>${t('prioritizeCritical')}:</strong> ${t('prioritizeDesc')}</span></li>
                    <li style="display:flex; align-items:flex-start; gap:12px;"><span style="color:#f59e0b;">🔸</span> <span><strong>${t('reviewWorkload')}:</strong> ${t('reviewDesc')}</span></li>
                    <li style="display:flex; align-items:flex-start; gap:12px;"><span style="color:#f59e0b;">🔸</span> <span><strong>${t('activeCommunication')}:</strong> ${t('activeCommDesc')}</span></li>
                ` : `
                    <li style="display:flex; align-items:flex-start; gap:12px;"><span style="color:#ef4444;">⚠️</span> <span><strong>${t('urgentIntervention')}:</strong> ${t('urgentDesc')}</span></li>
                    <li style="display:flex; align-items:flex-start; gap:12px;"><span style="color:#ef4444;">⚠️</span> <span><strong>${t('reinforceTeam')}:</strong> ${t('reinforceDesc')}</span></li>
                    <li style="display:flex; align-items:flex-start; gap:12px;"><span style="color:#ef4444;">⚠️</span> <span><strong>${t('contingencyPlan')}:</strong> ${t('contingencyDesc')}</span></li>
                `}
            </ul>
            <div class="narrative-text" style="margin-top:16px;">${t('recommendationsNote')}</div>
        </div>

        <div class="exec-stat-card" style="border-left:6px solid #8b5cf6;">
            <h3 style="color:#94a3b8; font-weight:400; text-transform:uppercase; letter-spacing:1px; font-size:0.8rem; margin:0 0 12px 0;">📅 ${t('outlook')}</h3>
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:20px;">
                <div>
                    <div style="font-size:0.8rem; color:#94a3b8;">${t('completionForecast')}</div>
                    <div style="font-size:1.6rem; font-weight:700; color:#a78bfa;">${evm.EAC.toFixed(1)}h</div>
                    <div style="font-size:0.8rem; color:${evm.EAC <= evm.BAC ? '#34d399' : '#f87171'};">${evm.EAC <= evm.BAC ? t('withinBudgetLabel') : '⚠️ ' + (evm.EAC - evm.BAC).toFixed(1) + ' ' + t('extra')}</div>
                </div>
                <div>
                    <div style="font-size:0.8rem; color:#94a3b8;">${t('pendingTasks')}</div>
                    <div style="font-size:1.6rem; font-weight:700; color:#fbbf24;">${dist.pending + dist.inProgress}</div>
                    <div style="font-size:0.8rem; color:#94a3b8;">${dist.inProgress} ${t('inProgressLabel')}, ${dist.pending} ${t('toStart')}</div>
                </div>
                <div>
                    <div style="font-size:0.8rem; color:#94a3b8;">${t('immediateAction')}</div>
                    <div style="font-size:1.1rem; font-weight:600; color:#f87171;">${dist.overdue > 0 ? t('resolveOverdue', { overdue: dist.overdue }) : t('maintainPace')}</div>
                    <div style="font-size:0.8rem; color:#94a3b8;">${t('highPriority')}</div>
                </div>
            </div>
            <div class="narrative-text" style="margin-top:16px;">${outlookNarrative}</div>
            <div style="margin-top:20px; padding:16px; background:#0f172a; border-radius:12px; text-align:center; color:#cbd5e1;">
                <span style="font-weight:600;">${t('nextReview')}:</span> ${new Date(new Date().getTime() + 7*24*60*60*1000).toLocaleDateString(locale)}
            </div>
        </div>

        <div style="text-align:center; margin-top:50px; padding-top:24px; border-top:1px solid rgba(255,255,255,0.05); color:#475569; font-size:0.8rem;">
            <span>${t('footer')}</span>
        </div>
    `;

    overlay.appendChild(content);
    document.body.appendChild(overlay);
    overlay.focus();
}

    // ============================================================
    // 7. AGREGAR BOTÓN AL SIDEBAR
    // ============================================================
    function addStorytellingButtonToSidebar() {
        if (document.getElementById('storytellingSidebarBtn')) return;
        let aside = document.querySelector('aside');
        if (!aside) {
            setTimeout(addStorytellingButtonToSidebar, 500);
            return;
        }
        const helpBtn = document.getElementById('helpSidebarButton');
        const newBtn = document.createElement('button');
        newBtn.id = 'storytellingSidebarBtn';
        newBtn.innerHTML = `📖 ${t('storytellingBtn')}`;
        newBtn.style.cssText = `
            width: calc(100% - 24px) !important;
            background: linear-gradient(135deg, #8b5cf6, #6d28d9) !important;
            border: none !important;
            color: white !important;
            padding: 12px 16px !important;
            border-radius: 12px !important;
            cursor: pointer !important;
            font-weight: 600 !important;
            font-size: 14px !important;
            margin: 10px 12px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 8px !important;
            box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4) !important;
            transition: 0.3s !important;
        `;
        newBtn.onclick = function(e) {
            e.stopPropagation();
            openStorytelling();
        };
        if (helpBtn) {
            helpBtn.parentNode.insertBefore(newBtn, helpBtn.nextSibling);
        } else {
            aside.appendChild(newBtn);
        }
        console.log('📊 Botón Storytelling añadido al sidebar.');
    }

    // ============================================================
    // 8. SELECTOR DE IDIOMA
    // ============================================================
    function setupLanguageToggle() {
        const toggleBtn = document.getElementById('langToggleBtn');
        if (!toggleBtn) return;
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const newLang = getLang() === 'es' ? 'en' : 'es';
            window.currentLanguage = newLang;
            localStorage.setItem('appLanguage', newLang);
            localStorage.setItem('lang', newLang);
            updateLanguageButton();
            const storyOverlay = document.getElementById('storytellingOverlay');
            if (storyOverlay) {
                storyOverlay.remove();
                openStorytelling();
            }
            const sidebarBtn = document.getElementById('storytellingSidebarBtn');
            if (sidebarBtn) sidebarBtn.innerHTML = `📖 ${t('storytellingBtn')}`;
        });
    }

    // ============================================================
    // 9. INICIALIZACIÓN
    // ============================================================
    function init() {
        window.currentLanguage = window.currentLanguage || localStorage.getItem('appLanguage') || localStorage.getItem('lang') || 'es';
        updateLanguageButton();
        if (isSystemReady()) {
            addStorytellingButtonToSidebar();
            setupLanguageToggle();
            console.log('📊 Módulo Storytelling v5.4 (COMPLETO CON PDF) cargado.');
        } else {
            const interval = setInterval(() => {
                if (isSystemReady()) {
                    clearInterval(interval);
                    addStorytellingButtonToSidebar();
                    setupLanguageToggle();
                    console.log('📊 Módulo Storytelling v5.4 (COMPLETO CON PDF) cargado.');
                }
            }, 500);
        }
    }

    // Exponer funciones
    window.openStorytelling = openStorytelling;
    window.exportStorytellingPDF = exportToPDF;
    window.getLang = getLang;
    window.t = t;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();