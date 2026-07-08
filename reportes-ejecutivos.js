// ============================================
// 🌟 20 REPORTES EJECUTIVOS - TRADUCCIÓN COMPLETA ES/EN
// ============================================
(function() {
'use strict';
console.log('🚀 20 Reportes Ejecutivos cargados - CON TRADUCCIÓN COMPLETA ES/EN');

// ============================================
// 🌐 DICCIONARIO DE TRADUCCIONES COMPLETO
// ============================================
const REPORTES_I18N = {
  es: {
    // Modal
    modal_titulo: 'Centro de Reportes Ejecutivos',
    modal_subtitulo: '20 reportes profesionales • TODOS ACTIVOS',
    modal_footer1: '🎯 20 reportes ejecutivos - TODOS ACTIVOS',
    modal_footer2: '⚡ Todos con gráficos, tablas y recomendaciones',
    btn_centro_reportes: 'CENTRO DE REPORTES',
    btn_exportar_pdf: '📄 Exportar PDF',
    btn_imprimir: '🖨️ Imprimir',
    btn_cerrar: '✕ Cerrar',
    confidential: '🔒 CONFIDENCIAL',
    generated: 'Generado',
    
    // Nombres de reportes
    rep_dashboard: '📊 Executive Dashboard',
    rep_dashboard_desc: 'KPIs, gráficos y recomendaciones ejecutivas',
    rep_evm: '📈 EVM avanzado',
    rep_evm_desc: 'Valor Ganado, tendencias y pronósticos',
    rep_equipo: '👥 Productividad equipo',
    rep_equipo_desc: 'Análisis individual y carga trabajo',
    rep_proyectos: '📁 Portfolio proyectos',
    rep_proyectos_desc: 'Comparativa y ranking',
    rep_riesgos: '⚠️ Matriz riesgos',
    rep_riesgos_desc: 'Identificación y mitigación',
    rep_tiempo: '⏱️ Control tiempo',
    rep_tiempo_desc: 'Horas vs estimadas',
    rep_calidad: '✅ Indicadores calidad',
    rep_calidad_desc: 'Métricas y satisfacción',
    rep_burndown: '📉 Burndown chart',
    rep_burndown_desc: 'Progreso vs plan ideal',
    rep_recursos: '👥 Asignación recursos',
    rep_recursos_desc: 'Carga y distribución',
    rep_costos: '💰 Análisis costos',
    rep_costos_desc: 'Financiero y presupuesto',
    rep_hitos: '🎯 Seguimiento hitos',
    rep_hitos_desc: 'Milestones y entregables',
    rep_comunicaciones: '📢 Plan comunicaciones',
    rep_comunicaciones_desc: 'Estrategia ejecutiva',
    rep_lecciones: '📚 Lecciones aprendidas',
    rep_lecciones_desc: 'Conocimiento organizacional',
    rep_stakeholders: '👥 Análisis stakeholders',
    rep_stakeholders_desc: 'Matriz poder/interés',
    rep_forecast: '🔮 Forecast proyecciones',
    rep_forecast_desc: 'Predicciones finalización',
    rep_cumplimiento: '✅ Cumplimiento plazos',
    rep_cumplimiento_desc: 'Análisis entregas vs plan',
    rep_satisfaccion: '⭐ Satisfacción cliente',
    rep_satisfaccion_desc: 'Métricas y mejoras',
    rep_capacidad: '📊 Capacidad equipo',
    rep_capacidad_desc: 'Análisis disponibilidad',
    rep_impacto: '📊 IMPACTO EJECUTIVO',
    rep_impacto_desc: 'Dashboard para Directores',
    rep_estrategia: '🎯 Estrategia ejecutiva',
    rep_estrategia_desc: 'Recomendaciones C-Level',
    
    // Estados
    status_completed: '✅ Completada',
    status_inprogress: '🔄 En progreso',
    status_pending: '⏳ Pendiente',
    status_overdue: '🔴 Atrasada',
    status_delayed: '⚠️ Retrasada',
    
    // KPIs comunes
    kpi_total: 'Total',
    kpi_tasks: 'Tareas',
    kpi_completed: 'Completadas',
    kpi_inprogress: 'En Progreso',
    kpi_pending: 'Pendientes',
    kpi_overdue: 'Rezagadas',
    kpi_progress: 'Progreso',
    kpi_hours_estimated: 'Horas Estimadas',
    kpi_hours_logged: 'Horas Registradas',
    kpi_hours_remaining: 'Horas Restantes',
    kpi_efficiency: 'Eficiencia',
    kpi_risk: 'Riesgo',
    kpi_members: 'Miembros',
    kpi_projects: 'Proyectos',
    
    // Secciones comunes
    sec_recommendations: '💡 Recomendaciones Estratégicas',
    sec_distribution: '📊 Distribución de Tareas',
    sec_evm: '📈 Valor Ganado (EVM)',
    sec_top_productivity: '👥 Top Productividad',
    sec_next_deadlines: '📅 Próximos Vencimientos',
    sec_task_details: '📋 Detalle de Tareas',
    sec_task: 'Tarea',
    sec_assignee: 'Asignado',
    sec_status: 'Estado',
    sec_progress: 'Progreso',
    sec_deadline: 'Vencimiento',
    sec_priority: 'Prioridad',
    sec_mitigation: 'Plan Mitigación',
    sec_project: 'Proyecto',
    sec_hours_est: 'Horas Est.',
    
    // Prioridades
    priority_high: 'Alta',
    priority_medium: 'Media',
    priority_low: 'Baja',
    
    // Niveles de riesgo
    risk_critical: 'CRÍTICO',
    risk_high: 'ALTO',
    risk_medium: 'MEDIO',
    risk_low: 'BAJO',
    
    // Recomendaciones genéricas
    rec_weekly_review: '📊 Mantener seguimiento semanal de KPIs',
    rec_assign_senior: 'Asignar recursos senior',
    rec_daily_follow: 'Seguimiento diario',
    rec_weekly_monitor: 'Monitoreo semanal',
    
    // Sin datos
    no_project: '❌ No hay proyecto seleccionado',
    no_tasks: '⚠️ No hay tareas en este proyecto',
    no_data: 'Sin datos',
    unassigned: 'Sin asignar',
    na: 'N/A',
    
    // EVM
    evm_title: '📈 EARNED VALUE MANAGEMENT REPORT',
    evm_subtitle: 'Análisis avanzado de Valor Ganado',
    evm_method_operative: '⏱️ Método Operativo (Equipo)',
    evm_method_pmi: '🎯 Método PMI (Directivos)',
    evm_pv: 'PV (Planificado)',
    evm_ev: 'EV (Valor Ganado)',
    evm_ac: 'AC (Costo Real)',
    evm_cv: 'CV (Variación Costo)',
    evm_sv: 'SV (Variación Tiempo)',
    evm_spi: 'SPI (Schedule Performance)',
    evm_cpi: 'CPI (Cost Performance)',
    evm_bac: 'BAC (Presupuesto)',
    evm_eac: 'EAC (Estimado al Completar)',
    evm_etc: 'ETC (Por Completar)',
    evm_vac: 'VAC (Variación al Completar)',
    evm_base_metrics: '📊 Métricas Base',
    evm_performance: '📈 Índices Desempeño',
    evm_forecast: '🔮 Pronósticos',
    evm_trend: '📉 Tendencia EVM',
    evm_compare: '📊 Comparativa Métricas',
    evm_dual_analysis: '💡 Recomendaciones EVM - Análisis Dual',
    evm_operative_base: '(Operativo - Basado en plan base)',
    evm_pmi_dates: '(PMI - Basado en fechas reales)',
    evm_delay_exec: '⚠️ Retraso en ejecución',
    evm_ahead: '✅ Adelantado',
    evm_ahead_schedule: '✅ Adelantado según cronograma por fechas reales',
    evm_delay_dates: '⚠️ Retraso según fechas',
    evm_overcost: 'Sobrecosto detectado',
    evm_in_budget: 'Dentro del presupuesto',
    evm_gap: '📈 La diferencia entre SPIs muestra la brecha entre el avance real y el planeado por fechas',
    
    // Equipo
    team_title: '👥 TEAM PRODUCTIVITY REPORT',
    team_subtitle: 'Análisis de desempeño individual',
    team_avg: 'Promedio',
    team_top: 'Top',
    team_active_members: 'Miembros Activos',
    team_top_performers: '🏆 Top Performers',
    team_total_tasks: '📋 Tareas Totales',
    team_efficiency_chart: '📊 Eficiencia por Miembro',
    team_load_chart: '📈 Carga vs Productividad',
    team_detail: '📋 Detalle de Productividad',
    team_member: 'Miembro',
    team_tasks: 'Tareas',
    team_improvement: '📊 Áreas de Mejora',
    team_recommendations: '💡 Recomendaciones de Productividad',
    team_rec_1: '🏆 Reconocer a los top performers públicamente',
    team_rec_2: '📊 Implementar plan de mejora para eficiencias < 70%',
    team_rec_3: '🎯 Realizar daily standups para reducir pendientes',
    team_rec_4: '📈 Establecer metas semanales por miembro',
    team_all_good: '✅ Todos los miembros están en buen nivel',
    team_efficiency: 'Eficiencia (%)',
    team_active_tasks: 'Tareas Activas',
    
    // Portfolio
    portfolio_title: '📁 PORTFOLIO REPORT',
    portfolio_subtitle: 'Análisis ejecutivo de todos los proyectos',
    portfolio_avg_progress: 'Progreso Promedio',
    portfolio_total_projects: 'Total Proyectos',
    portfolio_excellent: '🏆 Excelentes',
    portfolio_progress_chart: '📊 Progreso por Proyecto',
    portfolio_ranking: '📋 Ranking de Proyectos',
    portfolio_top3: '🏆 Top 3 Proyectos',
    portfolio_at_risk: '⚠️ Proyectos en Riesgo',
    portfolio_no_risk: '✅ Todos los proyectos están en buen estado',
    portfolio_rec_1: '📊 Revisar proyectos con progreso < 40% para reasignar recursos',
    portfolio_rec_2: '🏆 Compartir mejores prácticas de los top proyectos',
    portfolio_rec_3: '🎯 Establecer OKRs trimestrales por proyecto',
    portfolio_progress: 'Progreso (%)',
    
    // Riesgos
    risk_title: '⚠️ RISK MATRIX REPORT',
    risk_subtitle: 'Análisis de riesgos y mitigación',
    risk_level: 'Nivel',
    risk_criticals: '🔴 Críticos',
    risk_highs: '🟠 Altos',
    risk_mediums: '🟡 Medios',
    risk_lows: '🟢 Bajos',
    risk_overdue: '⏰ Atrasadas',
    risk_distribution: '📊 Distribución de Riesgos',
    risk_matrix: '📈 Matriz Impacto vs Probabilidad',
    risk_critical_tasks: '📋 Tareas Críticas y en Riesgo',
    risk_mitigation_plan: '📋 Plan de Mitigación',
    risk_actions: '🎯 Acciones Recomendadas',
    risk_no_critical: '✅ No hay tareas críticas',
    risk_mit_1: '🔴 Críticos: Reunión diaria de seguimiento',
    risk_mit_2: '🟠 Altos: Revisión semanal con el equipo',
    risk_mit_3: '🟡 Medios: Monitoreo en reportes quincenales',
    risk_mit_4: '✅ Bajos: Seguimiento estándar',
    risk_act_1: 'Priorizar tareas críticas en el sprint actual',
    risk_act_2: 'Reasignar recursos a tareas atrasadas',
    risk_act_3: 'Establecer alertas automáticas para vencimientos',
    risk_rec_1: '📊 Revisar matriz de riesgos semanalmente',
    risk_rec_2: '⚠️ Crear plan de contingencia para riesgos críticos',
    risk_rec_3: '🎯 Establecer owners por cada riesgo identificado',
    risk_impact_low: 'Impacto Bajo',
    risk_impact_med: 'Impacto Medio',
    risk_impact_high: 'Impacto Alto',
    risk_impact_crit: 'Impacto Crítico',
    risk_quantity: 'Cantidad',
    
    // Tiempo
    time_title: '⏱️ TIME CONTROL REPORT',
    time_subtitle: 'Análisis de tiempo y eficiencia',
    time_estimated: '⏱️ Estimadas',
    time_logged: '📝 Registradas',
    time_remaining: '⏳ Restantes',
    time_under_est: '✅ Bajo estimación',
    time_compare: '📊 Comparativa Horas',
    time_precision: '📈 Precisión Estimaciones',
    time_detail: '📋 Detalle de Tiempo por Tarea',
    time_diff: 'Diferencia',
    time_status_analysis: '📊 Análisis por Estado',
    time_recommendations: '🎯 Recomendaciones Tiempo',
    time_rec_1: 'Registrar tiempo diariamente para mejor precisión',
    time_rec_2: 'Revisar estimaciones semanalmente',
    time_rec_3: 'Identificar tareas que exceden estimación para ajustar procesos',
    time_rec_4: '⚠️ <strong>{count}</strong> tareas retrasadas requieren atención inmediata',
    time_rec_main_1: '⏱️ Implementar registro de tiempo obligatorio diario',
    time_rec_main_2: '📊 Revisar desviaciones > 20% mensualmente',
    time_rec_main_3: '🎯 Capacitar en técnicas de estimación de tiempo',
    time_rec_main_4: '⚠️ Establecer alertas tempranas para tareas que superen el 80% del tiempo estimado',
    time_est: 'Estimado',
    time_real: 'Real',
    time_hours: 'Horas',
    
    // Calidad
    quality_title: '✅ QUALITY METRICS REPORT',
    quality_subtitle: 'Indicadores de calidad',
    quality_score: 'Score Calidad',
    quality_defects: '🐛 Defectos',
    quality_radar: '📊 Radar de Calidad',
    quality_issues: '📋 Tareas con Problemas de Calidad',
    quality_deviation: 'Desviación',
    quality_rec_1: '✅ Implementar revisiones de código por pares',
    quality_rec_2: '📊 Establecer métricas DRE (Defect Removal Efficiency)',
    quality_rec_3: '🎯 Realizar retrospectivas quincenales de calidad',
    quality_rec_4: '⚠️ Priorizar tareas atrasadas para evitar degradación de calidad',
    quality_labels: ['Cumplimiento','Eficiencia','Satisfacción','Precisión','Oportunidad'],
    quality_score_label: 'Score',
    
    // Burndown
    burndown_title: '📉 BURNDOWN CHART',
    burndown_subtitle: 'Progreso de Story Points',
    burndown_velocity: 'Velocidad',
    burndown_total_sp: '📊 Total SP',
    burndown_completed_sp: '✅ Completados',
    burndown_weeks_left: '📅 Semanas restantes',
    burndown_ideal: 'Línea Ideal',
    burndown_real: 'Progreso Real',
    burndown_velocity_analysis: '📊 Análisis de Velocidad',
    burndown_sp_by_status: '📋 Story Points por Estado',
    burndown_current_vel: 'Velocidad actual',
    burndown_sp_week: 'SP/semana',
    burndown_sp_remaining: 'SP restantes',
    burndown_estimated_time: 'Tiempo estimado',
    burndown_weeks: 'semanas',
    burndown_completed: '✅ Completados',
    burndown_in_progress: '🔄 En progreso',
    burndown_pending: '⏳ Pendientes',
    burndown_rec_slow: '⚠️ Ritmo lento: Considerar ajustar alcance o agregar recursos',
    burndown_rec_good: '✅ Buen ritmo: Mantener prácticas actuales',
    burndown_rec_2: '📊 Revisar burndown semanalmente para detectar desviaciones tempranas',
    burndown_rec_3: '🎯 Ajustar planificación si la línea real está muy por encima de la ideal',
    burndown_start: 'Inicio',
    burndown_week: 'Semana',
    burndown_sp_remaining_label: 'Story Points Restantes',
    
    // Recursos
    resource_title: '👥 RESOURCE ALLOCATION',
    resource_subtitle: 'Carga por recurso',
    resource_tasks_per: 'Tareas/Recurso',
    resource_overloaded: '⚠️ Sobrecargados',
    resource_load: '📋 Carga por Recurso',
    resource_load_recommendation: 'Recomendación',
    resource_rec_redistribute: '🔴 Redistribuir tareas',
    resource_rec_monitor: '🟡 Monitorear carga',
    resource_rec_optimal: '✅ Óptimo',
    resource_rec_1_over: '🔴 {count} recurso(s) sobrecargados - redistribuir inmediatamente',
    resource_rec_1_ok: '✅ Carga balanceada',
    resource_rec_2: '📊 Realizar seguimiento semanal de carga',
    resource_rec_3: '👥 Considerar contratación si carga alta persistente',
    resource_plan_1: 'Reasignar tareas de recursos sobrecargados',
    resource_plan_2: 'Capacitar en gestión de tiempo',
    resource_plan_3: 'Establecer límite de WIP por recurso',
    resource_assigned_tasks: 'Tareas Asignadas',
    resource_quantity: 'Cantidad de Tareas',
    
    // Costos
    cost_title: '💰 COST ANALYSIS REPORT',
    cost_subtitle: 'Análisis financiero ejecutivo',
    cost_budget: 'Presupuesto',
    cost_executed: 'Ejecutado',
    cost_saving: 'Ahorro',
    cost_overrun: 'Sobrecosto',
    cost_detail: '📋 Detalle de Costos por Tarea',
    cost_estimated: 'Estimado ($)',
    cost_real: 'Real ($)',
    cost_efficiency: 'Eficiencia',
    cost_rec_1: '💰 Revisar desviaciones de presupuesto > 20% mensualmente',
    cost_rec_2: '⚠️ Implementar controles de costos inmediatos',
    cost_rec_3: '📊 Mantener tracking de costos por recurso y por tarea',
    cost_rec_4: '🎯 Establecer alertas automáticas de sobrecosto',
    cost_amount: 'Monto ($)',
    cost_projected: 'Proyectado',
    
    // Hitos
    milestone_title: '🎯 MILESTONE TRACKING',
    milestone_subtitle: 'Seguimiento de hitos críticos',
    milestone_total: 'Total Hitos',
    milestone_select: '📌 Selecciona qué tareas son HITOS',
    milestone_select_all: '✅ Seleccionar Todos',
    milestone_deselect_all: '❌ Deseleccionar Todos',
    milestone_apply: '🔄 Aplicar Filtro',
    milestone_matrix: '📋 Matriz de Hitos del Proyecto',
    milestone_responsible: 'Responsable',
    milestone_in_progress: '🔄 En Progreso',
    milestone_overdue: '⚠️ Atrasados',
    milestone_rec_1: '🎯 Priorizar hitos atrasados (overdue/rezagado) para recuperar cronograma',
    milestone_rec_2: '📊 Revisar hitos críticos en reuniones semanales',
    milestone_rec_3: '✅ Celebrar hitos completados para motivar al equipo',
    milestone_rec_4: '⚠️ <strong>{count}</strong> hito(s) atrasado(s) requieren atención inmediata',
    milestone_completed: 'Completados',
    
    // Comunicaciones
    comm_title: '📢 COMMUNICATIONS PLAN',
    comm_subtitle: 'Estrategia de comunicaciones ejecutiva',
    comm_stakeholders: 'Stakeholders',
    comm_channels: 'Canales',
    comm_frequencies: 'Frecuencias',
    comm_coverage: 'Cobertura',
    comm_channel_chart: '📊 Canales de Comunicación',
    comm_freq_chart: '📈 Frecuencia de Comunicación',
    comm_matrix: '📋 Matriz de Comunicaciones',
    comm_stakeholder_col: '👤 Stakeholder',
    comm_channel_col: '📡 Canal Principal',
    comm_freq_col: '⏱️ Frecuencia',
    comm_owner_col: '👨‍💼 Responsable',
    comm_format_col: '📄 Formato',
    comm_hint: '💡 Selecciona el canal y frecuencia para cada stakeholder (se guarda automáticamente)',
    comm_no_stakeholders: '⚠️ No hay stakeholders asignados a las tareas del proyecto',
    comm_no_stakeholders_hint: 'Asigna responsables (assignee) a las tareas para visualizar la matriz de comunicaciones',
    comm_rec_1: '📊 Establecer reporte semanal de estado para todos los stakeholders',
    comm_rec_2: '🎯 Crear dashboard ejecutivo accesible 24/7',
    comm_rec_3: '📢 Implementar reuniones quincenales de alineamiento',
    comm_rec_4: '✅ Documentar todas las decisiones en actas',
    comm_exec_summary: '📊 Resumen Ejecutivo',
    comm_detailed_report: '📋 Informe Detallado',
    comm_pm_office: 'PM Office',
    
    // Lecciones
    lessons_title: '📚 LESSONS LEARNED',
    lessons_subtitle: 'Análisis de conocimiento organizacional',
    lessons_success_rate: 'Tasa de Éxito',
    lessons_success: '✅ Lecciones de Éxito',
    lessons_improvement: '⚠️ Áreas de Mejora',
    lessons_risks_identified: '🚨 Riesgos Identificados',
    lessons_est_precision: '📐 Precisión Estimación',
    lessons_critical_tasks: '⭐ Tareas Críticas',
    lessons_performance: '📊 Rendimiento por Tipo',
    lessons_success_by_priority: '🎯 Tasa de Éxito por Prioridad',
    lessons_what_worked: '✅ Lo que funcionó bien - Prácticas Exitosas',
    lessons_to_improve: '⚠️ Áreas de mejora - Oportunidades identificadas',
    lessons_top_performers: '🏆 Top Performers - Mayor Eficiencia',
    lessons_mitigated: 'Mitigados',
    lessons_completed: 'Completadas',
    lessons_real_vs_est: 'Real vs Estimado',
    lessons_practices: 'Prácticas que funcionaron',
    lessons_opportunities: 'Oportunidades identificadas',
    lessons_no_critical: '⚠️ No se identificaron áreas críticas de mejora',
    lessons_consistent: '✅ El equipo mantuvo un desempeño consistente en todas las tareas',
    lessons_no_top: '🏆 No hay suficientes datos para mostrar top performers',
    lessons_lesson_plan: '🎯 Lección: Planificación efectiva y ejecución disciplinada',
    lessons_lesson_est: '📈 Lección: Mejorar estimaciones',
    lessons_deviation: 'desviación',
    lessons_efficiency_vs_est: 'Eficiencia vs estimación',
    lessons_rec_title: '💡 Recomendaciones Estratégicas para Futuros Proyectos',
    lessons_continue: '✅ Continuar haciendo',
    lessons_continue_1: 'Planificación detallada de tareas críticas',
    lessons_continue_2: 'Seguimiento semanal de progreso',
    lessons_continue_3: 'Documentación de lecciones durante el proyecto',
    lessons_improve: '⚠️ Mejorar para próximo proyecto',
    lessons_improve_1: 'Refinar técnicas de estimación de tiempo',
    lessons_improve_2: 'Establecer buffers para tareas complejas',
    lessons_improve_3: 'Implementar revisiones de calidad tempranas',
    lessons_new_init: '🚀 Nueva iniciativas',
    lessons_new_init_1: 'Implementar dashboard de métricas en tiempo real',
    lessons_new_init_2: 'Capacitación en metodologías ágiles',
    lessons_new_init_3: 'Automatizar reportes de estado semanales',
    lessons_metrics: '📊 Métricas a monitorear',
    lessons_metrics_1: 'SPI y CPI semanalmente',
    lessons_metrics_2: 'Tasa de desviación de estimaciones',
    lessons_metrics_3: 'Productividad individual del equipo',
    lessons_successful: 'Tareas Exitosas',
    lessons_pending_crit: 'Pendientes/Críticas',
    lessons_quantity: 'Cantidad de Tareas',
    lessons_confidentiality: '🔒 CONFIDENCIALIDAD:',
    lessons_conf_text: 'Este documento contiene análisis de desempeño organizacional.',
    lessons_methodology: '📋 METODOLOGÍA:',
    lessons_method_text: 'Basado en EVM y análisis retrospectivo de tareas completadas.',
    lessons_auto_gen: 'Generado automáticamente por PM Virtual Ejecutivo',
    
    // Stakeholders
    sh_title: '👥 STAKEHOLDER ANALYSIS',
    sh_subtitle: 'Matriz de poder e interés',
    sh_total: 'Total',
    sh_high_influence: '🔴 Alta Influencia',
    sh_high_interest: '⭐ Alto Interés',
    sh_key: '🎯 Stakeholders Clave',
    sh_influence_dist: '⚡ Distribución por Influencia',
    sh_interest_dist: '🎯 Distribución por Interés',
    sh_matrix: '📋 Matriz de Stakeholders',
    sh_influence_col: '⚡ Influencia',
    sh_interest_col: '🎯 Interés',
    sh_strategy_col: '📋 Estrategia',
    sh_hint: '💡 Selecciona la influencia e interés para cada stakeholder (se guarda automáticamente)',
    sh_strategy_close: '🎯 Gestionar cercanamente',
    sh_strategy_informed: '📢 Mantener informado',
    sh_strategy_satisfied: '💬 Mantener satisfecho',
    sh_strategy_monitor: '👁️ Monitoreo general',
    sh_high_inf: 'Alta Influencia',
    sh_med_inf: 'Media Influencia',
    sh_low_inf: 'Baja Influencia',
    sh_high_int: 'Alto Interés',
    sh_med_int: 'Medio Interés',
    sh_low_int: 'Bajo Interés',
    sh_priority_mgmt: '🔴 Gestión Prioritaria',
    sh_priority_desc: '{count} stakeholders requieren atención especial y comunicación directa.',
    sh_effective_comm: '📢 Comunicación Efectiva',
    sh_effective_desc: 'Establecer reportes semanales para {count} stakeholders de alta influencia.',
    sh_satisfaction: '💬 Satisfacción',
    sh_satisfaction_desc: 'Mantener satisfechos a {count} stakeholders con alto interés.',
    sh_monitoring: '📊 Monitoreo',
    sh_monitoring_desc: 'Dashboard ejecutivo accesible para todos los stakeholders.',
    sh_confidentiality: '🔒 CONFIDENCIALIDAD:',
    sh_conf_text: 'Este documento contiene información sobre partes interesadas del proyecto.',
    sh_methodology: '📋 METODOLOGÍA:',
    sh_method_text: 'Análisis basado en matriz de poder-interés y desempeño de tareas asignadas.',
    
    // Forecast
    forecast_title: '🔮 FORECAST & PREDICCIONES',
    forecast_subtitle: 'Análisis de escenarios y proyecciones estratégicas',
    forecast_days_left: '📅 Días Restantes',
    forecast_estimated_date: '🎯 Fecha Estimada',
    forecast_projected_hours: '⏱️ Horas Proyectadas',
    forecast_team_velocity: '⚡ Velocidad Equipo',
    forecast_overdue_rate: '⚠️ Tasa Atraso',
    forecast_scenarios: '📈 Escenarios de Finalización',
    forecast_success_prob: '📊 Probabilidad de Éxito',
    forecast_scenario_table: '📋 Proyecciones por Escenario',
    forecast_scenario: '📊 Escenario',
    forecast_optimistic: '🟢 OPTIMISTA',
    forecast_realistic: '🔵 REALISTA',
    forecast_pessimistic: '🔴 PESIMISTA',
    forecast_probability: '📈 Probabilidad',
    forecast_recommendation: '💡 Recomendación',
    forecast_days: 'días',
    forecast_at_current: 'Al ritmo actual',
    forecast_realistic_scenario: 'Escenario realista',
    forecast_eac_finish: 'EAC al finalizar',
    forecast_tasks_day: 'Tareas/día',
    forecast_of_tasks: 'de {total} tareas',
    forecast_completed: '✅ Tareas Completadas',
    forecast_in_progress: '🔄 En Progreso',
    forecast_pending: '⏳ Pendientes',
    forecast_of_total: 'de {total} totales',
    forecast_active_tasks: 'tareas activas',
    forecast_to_start: 'por iniciar',
    forecast_rec_title: '💡 Recomendaciones Estratégicas',
    forecast_rec_accel: '⚠️ Acelerar tareas críticas para recuperar cronograma',
    forecast_rec_hours: '💰 Revisar estimaciones y controlar horas extras',
    forecast_rec_prioritize: '⏰ Priorizar {count} tarea(s) atrasada(s) urgentemente',
    forecast_rec_rhythm: '🐌 Mejorar ritmo de trabajo y eliminar bloqueos',
    forecast_rec_replan: '📅 Replanificar hitos para ajustar expectativas',
    forecast_rec_maintain: '✅ Mantener ritmo actual y monitorear semanalmente',
    forecast_assign_resources: 'Asignar recursos adicionales clave',
    forecast_maintain_rhythm: 'Mantener ritmo actual y monitorear',
    forecast_contingency: 'Activar plan de contingencia',
    forecast_success: 'Éxito',
    forecast_risk_level: 'Nivel de Riesgo',
    forecast_confidentiality: '🔒 CONFIDENCIALIDAD:',
    forecast_conf_text: 'Este documento contiene proyecciones estratégicas del proyecto.',
    forecast_methodology: '📋 METODOLOGÍA:',
    forecast_method_text: 'Basado en fechas reales de vencimiento y velocidad de equipo.',
    forecast_completed_tasks: 'Tareas Completadas',
    
    // Cumplimiento
    compliance_title: '✅ DEADLINE COMPLIANCE',
    compliance_subtitle: 'Análisis de cumplimiento de plazos y puntualidad',
    compliance_rate: 'Cumplimiento',
    compliance_with_deadline: '📅 Con Fecha Límite',
    compliance_on_time: '✅ Cumplidas a Tiempo',
    compliance_failed: '⚠️ Incumplidas',
    compliance_avg_delay: '📉 Promedio Atraso',
    compliance_critical: '🔴 Críticas',
    compliance_chart: '📊 Cumplimiento de Plazos',
    compliance_status: '⏰ Estado de Plazos',
    compliance_upcoming: '⚠️ Tareas Próximas a Vencer (7 días)',
    compliance_failed_tasks: '📋 Tareas con Plazo Incumplido',
    compliance_days_left: '⏰ Días Restantes',
    compliance_days_delay: '⏰ Días Atraso',
    compliance_tasks_deadline: 'Tareas con deadline',
    compliance_delivered: 'Entregadas antes o en fecha',
    compliance_overdue: 'Vencidas sin completar',
    compliance_avg_days: 'Días promedio',
    compliance_priority: 'Incumplidas prioritarias',
    compliance_day: 'día(s)',
    compliance_excellent: '¡Excelente!',
    compliance_no_overdue: 'No hay tareas con plazo incumplido. Mantén este ritmo.',
    compliance_rec_attention: '🔴 Atención Inmediata',
    compliance_rec_attention_desc: 'Priorizar {count} tarea(s) incumplida(s) ({days} día(s) de atraso promedio)',
    compliance_rec_action: '⚠️ Plan de Acción',
    compliance_rec_action_desc: 'Revisar {count} tarea(s) próximas a vencer',
    compliance_rec_monitor: '📊 Monitoreo',
    compliance_rec_monitor_desc: 'Establecer alertas tempranas para fechas próximas',
    compliance_rec_plan: '🎯 Planificación',
    compliance_rec_plan_desc: 'Ajustar fechas de vencimiento de manera realista',
    compliance_quantity: 'Cantidad de Tareas',
    compliance_cumplidas: 'Cumplidas',
    compliance_incumplidas: 'Incumplidas',
    compliance_proximas: 'Próximas',
    
    // Satisfacción
    sat_title: '⭐ CUSTOMER SATISFACTION',
    sat_subtitle: 'Métricas de satisfacción y experiencia del cliente',
    sat_score: 'Score',
    sat_level: 'Nivel',
    sat_punctuality: 'Puntualidad',
    sat_general: '⭐ Satisfacción General',
    sat_on_time: '⏱️ Entregas a Tiempo',
    sat_index: '📊 Índice de Satisfacción',
    sat_factors: '📈 Análisis de Factores Clave',
    sat_positive: '✅ Factores Positivos',
    sat_negative: '⚠️ Áreas de Mejora',
    sat_success_rate: 'Tasa de Éxito',
    sat_punctuality_rate: 'Tasa de Puntualidad',
    sat_total_progress: 'Avance Total',
    sat_level_excellent: 'EXCELENTE',
    sat_level_good: 'BUENO',
    sat_level_regular: 'REGULAR',
    sat_level_critical: 'CRÍTICO',
    sat_of_total: 'De {total} totales',
    sat_punctuality_label: 'Puntualidad',
    sat_active_currently: 'Activas actualmente',
    sat_to_start: 'Por iniciar',
    sat_gap: 'Brecha',
    sat_positive_elements: '{count} elementos',
    sat_no_positive: 'No hay factores positivos destacados aún',
    sat_priority: 'PRIORIDAD',
    sat_no_improvement: '¡No hay áreas críticas de mejora!',
    sat_tasks_completed: 'Tareas completadas vs total',
    sat_deliveries_on_date: 'Entregas antes o en fecha',
    sat_completed_progress: 'Completado + En progreso',
    sat_rec_surveys: '📊 Encuestas Periódicas',
    sat_rec_surveys_desc: 'Realizar encuestas de satisfacción al finalizar cada hito',
    sat_rec_punctuality: '🎯 Mejorar Puntualidad',
    sat_rec_punctuality_desc: 'Ajustar cronogramas y cumplir fechas comprometidas',
    sat_rec_comm: '📢 Comunicación Proactiva',
    sat_rec_comm_desc: 'Mantener al cliente informado del progreso semanal',
    sat_rec_feedback: '✅ Documentar Feedback',
    sat_rec_feedback_desc: 'Registrar lecciones aprendidas y expectativas del cliente',
    sat_satisfaction: 'Satisfacción',
    
    // Capacidad
    cap_title: '📊 TEAM CAPACITY',
    cap_subtitle: 'Análisis de capacidad del equipo',
    cap_utilization: 'Utilización',
    cap_total_capacity: '📋 Capacidad total',
    cap_used: '✅ Utilizada',
    cap_overload: '⚠️ Sobrecarga',
    cap_by_resource: '📋 Capacidad por Recurso',
    cap_resource_col: '👤 Recurso',
    cap_capacity_col: '📋 Capacidad',
    cap_tasks_col: '📋 Tareas',
    cap_legend: '🎨 Leyenda de Estados',
    cap_team_members: 'Miembros del equipo',
    cap_assigned_tasks: 'Tareas asignadas',
    cap_completed_tasks: 'Tareas completadas',
    cap_overload_desc: 'Recursos con >3 pendientes',
    cap_completed: '✅ Completadas',
    cap_in_progress: '🔄 En Progreso',
    cap_delayed: '⚠️ Retrasadas',
    cap_pending: '⏳ Pendientes',
    cap_progress: '📊 Progreso',
    cap_with_delays: '⚠️ Con retrasos',
    cap_in_progress_status: '🟢 En progreso',
    cap_completed_status: '✅ Completado',
    cap_pending_status: '⏳ Pendiente',
    cap_no_tasks: '⚪ Sin tareas',
    cap_total_capacity_label: 'Capacidad Total',
    cap_real_progress: 'Progreso Real (promedio)',
    cap_percentage: 'Porcentaje',
    cap_rec_delays: '⚠️ {name} tiene {count} tarea(s) retrasada(s)',
    cap_rec_delays_desc: 'Priorizar revisión y recuperación',
    cap_rec_progress: '🔄 {name} tiene {count} tarea(s) en progreso',
    cap_rec_progress_desc: 'Mantener ritmo y monitorear avance',
    
    // Impacto
    impact_title: '📊 IMPACTO EJECUTIVO INTEGRAL',
    impact_subtitle: 'Dashboard para Alta Dirección',
    impact_project_dir: 'DIRECTOR DE PROYECTO',
    impact_finance_dir: 'DIRECTOR DE FINANZAS',
    impact_ops_dir: 'DIRECTOR DE OPERACIONES',
    impact_total_progress: 'Avance Total',
    impact_tasks_completed: 'Tareas Completadas',
    impact_days_left: 'Días Restantes',
    impact_overdue_tasks: 'Tareas Atrasadas',
    impact_estimated_budget: 'Presupuesto Estimado',
    impact_real_cost: 'Costo Real',
    impact_variation: 'Variación',
    impact_cost_efficiency: 'Eficiencia Costo',
    impact_team_efficiency: 'Eficiencia Equipo',
    impact_productivity: 'Productividad',
    impact_bottlenecks: 'Cuellos Botella',
    impact_pmo_rec: '📋 RECOMENDACIONES PMO',
    impact_finance_rec: '💰 RECOMENDACIONES FINANZAS',
    impact_ops_rec: '🏭 RECOMENDACIONES OPERACIONES',
    impact_team_velocity: 'Velocidad Equipo (t/día)',
    impact_success_rate: 'Tasa de Éxito',
    impact_person_days: 'Personas/Días',
    impact_roi: 'ROI Proyectado',
    impact_schedule: 'Cronograma y ejecución',
    impact_costs_roi: 'Costos y ROI',
    impact_efficiency_resources: 'Eficiencia y recursos',
    impact_saving: 'AHORRO',
    impact_overcost: 'SOBRECOSTO',
    impact_level_excellent: 'EXCELENTE',
    impact_level_good: 'BUENO',
    impact_level_attention: 'ATENCIÓN',
    impact_level_critical: 'CRÍTICO',
    impact_msg_excellent: 'Proyecto en estado óptimo. Continúa con el plan actual.',
    impact_msg_good: 'Proyecto en buen camino. Monitorear áreas críticas.',
    impact_msg_attention: 'Se requiere atención en cronograma y costos.',
    impact_msg_critical: 'Intervención inmediata necesaria. Riesgo alto de incumplimiento.',
    impact_rec_priority: 'Priorizar {count} tarea(s) atrasada(s) inmediatamente',
    impact_rec_baseline: 'Revisar línea base del cronograma - puede ser poco realista',
    impact_rec_replan: 'Replanificar sprints y reasignar recursos críticos',
    impact_rec_good: '✅ Proyecto en buen estado, continuar con el plan',
    impact_rec_overcost: '⚠️ SOBRECOSTE de ${amount} - Revisar estimaciones urgentemente',
    impact_rec_control: '🔴 Controlar horas extras y revisar presupuesto',
    impact_rec_saving: '✅ AHORRO de ${amount} - Eficiencia financiera excelente',
    impact_rec_maintain_cost: '📊 Mantener estrategias de control de costos',
    impact_rec_costs_ok: '✅ Costos ajustados al presupuesto',
    impact_rec_low_eff: '⚠️ Baja eficiencia de costo - Revisar productividad del equipo',
    impact_rec_high_eff: '🏆 Alta eficiencia de costo - Excelente desempeño',
    impact_rec_bottleneck: 'Resolver {count} dependencias bloqueantes',
    impact_rec_rhythm: 'Mejorar ritmo de entrega del equipo',
    impact_rec_unbalanced: 'Capacidad del equipo desbalanceada - ajustar asignación',
    impact_rec_ops_ok: '✅ Operaciones fluidas, sin bloqueos críticos',
    impact_vip_footer: '⭐ IMPACTO EJECUTIVO - Dashboard Directivo Premium',
    impact_confidential: '🔒 CONFIDENCIAL - Generado por PM Virtual Ejecutivo',
    
    // Estrategia
    strategy_title: '🎯 EXECUTIVE STRATEGY',
    strategy_subtitle: 'Recomendaciones estratégicas C-Level',
    strategy_score: 'Score Estratégico',
    strategy_objectives: '🎯 Objetivos Estratégicos',
    strategy_action_plan: '📊 Plan de Acción Ejecutivo',
    strategy_obj_1: '📊 Mejorar CPI a > 1.0 (actual: {value})',
    strategy_obj_2: '⏱️ Recuperar SPI a > 0.95 (actual: {value})',
    strategy_obj_3: '✅ Alcanzar 100% de entregas a tiempo',
    strategy_obj_4: '👥 Reducir carga de recursos sobrecargados',
    strategy_plan_1: '📅 Revisión semanal de KPIs con el equipo',
    strategy_plan_2: '💰 Control de costos y recursos',
    strategy_plan_3: '🎯 Reunión mensual de alineamiento estratégico',
    strategy_plan_4: '📊 Dashboard ejecutivo accesible 24/7',
    strategy_rec_1: '🚀 Priorizar recursos en tareas de ruta crítica',
    strategy_rec_2: '📊 Invertir en capacitación del equipo',
    strategy_rec_3: '🎯 Establecer OKRs trimestrales por proyecto',
    strategy_rec_4: '✅ Celebrar hitos importantes públicamente',
    strategy_labels: ['Eficiencia','Productividad','Calidad','Satisfacción','Cumplimiento'],
    strategy_current_score: 'Score Actual'
  },
  en: {
    // Modal
    modal_titulo: 'Executive Reports Center',
    modal_subtitulo: '20 professional reports • ALL ACTIVE',
    modal_footer1: '🎯 20 executive reports - ALL ACTIVE',
    modal_footer2: '⚡ All with charts, tables and recommendations',
    btn_centro_reportes: 'REPORTS CENTER',
    btn_exportar_pdf: '📄 Export PDF',
    btn_imprimir: '🖨️ Print',
    btn_cerrar: '✕ Close',
    confidential: '🔒 CONFIDENTIAL',
    generated: 'Generated',
    
    // Report names
    rep_dashboard: '📊 Executive Dashboard',
    rep_dashboard_desc: 'KPIs, charts and executive recommendations',
    rep_evm: '📈 Advanced EVM',
    rep_evm_desc: 'Earned Value, trends and forecasts',
    rep_equipo: '👥 Team Productivity',
    rep_equipo_desc: 'Individual analysis and workload',
    rep_proyectos: '📁 Project Portfolio',
    rep_proyectos_desc: 'Comparison and ranking',
    rep_riesgos: '⚠️ Risk Matrix',
    rep_riesgos_desc: 'Identification and mitigation',
    rep_tiempo: '⏱️ Time Control',
    rep_tiempo_desc: 'Hours vs estimates',
    rep_calidad: '✅ Quality Indicators',
    rep_calidad_desc: 'Metrics and satisfaction',
    rep_burndown: '📉 Burndown Chart',
    rep_burndown_desc: 'Progress vs ideal plan',
    rep_recursos: '👥 Resource Allocation',
    rep_recursos_desc: 'Load and distribution',
    rep_costos: '💰 Cost Analysis',
    rep_costos_desc: 'Financial and budget',
    rep_hitos: '🎯 Milestone Tracking',
    rep_hitos_desc: 'Milestones and deliverables',
    rep_comunicaciones: '📢 Communications Plan',
    rep_comunicaciones_desc: 'Executive strategy',
    rep_lecciones: '📚 Lessons Learned',
    rep_lecciones_desc: 'Organizational knowledge',
    rep_stakeholders: '👥 Stakeholder Analysis',
    rep_stakeholders_desc: 'Power/interest matrix',
    rep_forecast: '🔮 Forecast Projections',
    rep_forecast_desc: 'Completion predictions',
    rep_cumplimiento: '✅ Deadline Compliance',
    rep_cumplimiento_desc: 'Deliveries vs plan',
    rep_satisfaccion: '⭐ Customer Satisfaction',
    rep_satisfaccion_desc: 'Metrics and improvements',
    rep_capacidad: '📊 Team Capacity',
    rep_capacidad_desc: 'Availability analysis',
    rep_impacto: '📊 EXECUTIVE IMPACT',
    rep_impacto_desc: 'Dashboard for Directors',
    rep_estrategia: '🎯 Executive Strategy',
    rep_estrategia_desc: 'C-Level recommendations',
    
    // Status
    status_completed: '✅ Completed',
    status_inprogress: '🔄 In Progress',
    status_pending: '⏳ Pending',
    status_overdue: '🔴 Overdue',
    status_delayed: '⚠️ Delayed',
    
    // KPIs
    kpi_total: 'Total',
    kpi_tasks: 'Tasks',
    kpi_completed: 'Completed',
    kpi_inprogress: 'In Progress',
    kpi_pending: 'Pending',
    kpi_overdue: 'Overdue',
    kpi_progress: 'Progress',
    kpi_hours_estimated: 'Estimated Hours',
    kpi_hours_logged: 'Logged Hours',
    kpi_hours_remaining: 'Remaining Hours',
    kpi_efficiency: 'Efficiency',
    kpi_risk: 'Risk',
    kpi_members: 'Members',
    kpi_projects: 'Projects',
    
    // Sections
    sec_recommendations: '💡 Strategic Recommendations',
    sec_distribution: '📊 Task Distribution',
    sec_evm: '📈 Earned Value (EVM)',
    sec_top_productivity: '👥 Top Productivity',
    sec_next_deadlines: '📅 Upcoming Deadlines',
    sec_task_details: '📋 Task Details',
    sec_task: 'Task',
    sec_assignee: 'Assignee',
    sec_status: 'Status',
    sec_progress: 'Progress',
    sec_deadline: 'Deadline',
    sec_priority: 'Priority',
    sec_mitigation: 'Mitigation Plan',
    sec_project: 'Project',
    sec_hours_est: 'Est. Hours',
    
    // Priorities
    priority_high: 'High',
    priority_medium: 'Medium',
    priority_low: 'Low',
    
    // Risk levels
    risk_critical: 'CRITICAL',
    risk_high: 'HIGH',
    risk_medium: 'MEDIUM',
    risk_low: 'LOW',
    
    // Recommendations
    rec_weekly_review: '📊 Maintain weekly KPI tracking',
    rec_assign_senior: 'Assign senior resources',
    rec_daily_follow: 'Daily follow-up',
    rec_weekly_monitor: 'Weekly monitoring',
    
    // No data
    no_project: '❌ No project selected',
    no_tasks: '⚠️ No tasks in this project',
    no_data: 'No data',
    unassigned: 'Unassigned',
    na: 'N/A',
    
    // EVM
    evm_title: '📈 EARNED VALUE MANAGEMENT REPORT',
    evm_subtitle: 'Advanced Earned Value Analysis',
    evm_method_operative: '⏱️ Operative Method (Team)',
    evm_method_pmi: '🎯 PMI Method (Executives)',
    evm_pv: 'PV (Planned Value)',
    evm_ev: 'EV (Earned Value)',
    evm_ac: 'AC (Actual Cost)',
    evm_cv: 'CV (Cost Variance)',
    evm_sv: 'SV (Schedule Variance)',
    evm_spi: 'SPI (Schedule Performance)',
    evm_cpi: 'CPI (Cost Performance)',
    evm_bac: 'BAC (Budget at Completion)',
    evm_eac: 'EAC (Estimate at Completion)',
    evm_etc: 'ETC (Estimate to Complete)',
    evm_vac: 'VAC (Variance at Completion)',
    evm_base_metrics: '📊 Base Metrics',
    evm_performance: '📈 Performance Indices',
    evm_forecast: '🔮 Forecasts',
    evm_trend: '📉 EVM Trend',
    evm_compare: '📊 Metrics Comparison',
    evm_dual_analysis: '💡 EVM Recommendations - Dual Analysis',
    evm_operative_base: '(Operative - Based on base plan)',
    evm_pmi_dates: '(PMI - Based on real dates)',
    evm_delay_exec: '⚠️ Delay in execution',
    evm_ahead: '✅ Ahead',
    evm_ahead_schedule: '✅ Ahead according to schedule by real dates',
    evm_delay_dates: '⚠️ Delay according to dates',
    evm_overcost: 'Overcost detected',
    evm_in_budget: 'Within budget',
    evm_gap: '📈 The difference between SPIs shows the gap between real and planned progress by dates',
    
    // Team
    team_title: '👥 TEAM PRODUCTIVITY REPORT',
    team_subtitle: 'Individual performance analysis',
    team_avg: 'Average',
    team_top: 'Top',
    team_active_members: 'Active Members',
    team_top_performers: '🏆 Top Performers',
    team_total_tasks: '📋 Total Tasks',
    team_efficiency_chart: '📊 Efficiency by Member',
    team_load_chart: '📈 Load vs Productivity',
    team_detail: '📋 Productivity Details',
    team_member: 'Member',
    team_tasks: 'Tasks',
    team_improvement: '📊 Improvement Areas',
    team_recommendations: '💡 Productivity Recommendations',
    team_rec_1: '🏆 Publicly recognize top performers',
    team_rec_2: '📊 Implement improvement plan for efficiencies < 70%',
    team_rec_3: '🎯 Conduct daily standups to reduce pending tasks',
    team_rec_4: '📈 Set weekly goals per member',
    team_all_good: '✅ All members are at a good level',
    team_efficiency: 'Efficiency (%)',
    team_active_tasks: 'Active Tasks',
    
    // Portfolio
    portfolio_title: '📁 PORTFOLIO REPORT',
    portfolio_subtitle: 'Executive analysis of all projects',
    portfolio_avg_progress: 'Average Progress',
    portfolio_total_projects: 'Total Projects',
    portfolio_excellent: '🏆 Excellent',
    portfolio_progress_chart: '📊 Progress by Project',
    portfolio_ranking: '📋 Project Ranking',
    portfolio_top3: '🏆 Top 3 Projects',
    portfolio_at_risk: '⚠️ Projects at Risk',
    portfolio_no_risk: '✅ All projects are in good state',
    portfolio_rec_1: '📊 Review projects with progress < 40% to reassign resources',
    portfolio_rec_2: '🏆 Share best practices from top projects',
    portfolio_rec_3: '🎯 Set quarterly OKRs per project',
    portfolio_progress: 'Progress (%)',
    
    // Risks
    risk_title: '⚠️ RISK MATRIX REPORT',
    risk_subtitle: 'Risk analysis and mitigation',
    risk_level: 'Level',
    risk_criticals: '🔴 Critical',
    risk_highs: '🟠 High',
    risk_mediums: '🟡 Medium',
    risk_lows: '🟢 Low',
    risk_overdue: '⏰ Overdue',
    risk_distribution: '📊 Risk Distribution',
    risk_matrix: '📈 Impact vs Probability Matrix',
    risk_critical_tasks: '📋 Critical and At-Risk Tasks',
    risk_mitigation_plan: '📋 Mitigation Plan',
    risk_actions: '🎯 Recommended Actions',
    risk_no_critical: '✅ No critical tasks',
    risk_mit_1: '🔴 Critical: Daily follow-up meeting',
    risk_mit_2: '🟠 High: Weekly review with the team',
    risk_mit_3: '🟡 Medium: Monitoring in biweekly reports',
    risk_mit_4: '✅ Low: Standard follow-up',
    risk_act_1: 'Prioritize critical tasks in current sprint',
    risk_act_2: 'Reassign resources to overdue tasks',
    risk_act_3: 'Set automatic alerts for deadlines',
    risk_rec_1: '📊 Review risk matrix weekly',
    risk_rec_2: '⚠️ Create contingency plan for critical risks',
    risk_rec_3: '🎯 Set owners for each identified risk',
    risk_impact_low: 'Low Impact',
    risk_impact_med: 'Medium Impact',
    risk_impact_high: 'High Impact',
    risk_impact_crit: 'Critical Impact',
    risk_quantity: 'Quantity',
    
    // Time
    time_title: '⏱️ TIME CONTROL REPORT',
    time_subtitle: 'Time and efficiency analysis',
    time_estimated: '⏱️ Estimated',
    time_logged: '📝 Logged',
    time_remaining: '⏳ Remaining',
    time_under_est: '✅ Under estimate',
    time_compare: '📊 Hours Comparison',
    time_precision: '📈 Estimation Precision',
    time_detail: '📋 Time Details by Task',
    time_diff: 'Difference',
    time_status_analysis: '📊 Status Analysis',
    time_recommendations: '🎯 Time Recommendations',
    time_rec_1: 'Register time daily for better precision',
    time_rec_2: 'Review estimates weekly',
    time_rec_3: 'Identify tasks that exceed estimates to adjust processes',
    time_rec_4: '⚠️ <strong>{count}</strong> delayed tasks require immediate attention',
    time_rec_main_1: '⏱️ Implement mandatory daily time tracking',
    time_rec_main_2: '📊 Review deviations > 20% monthly',
    time_rec_main_3: '🎯 Train in time estimation techniques',
    time_rec_main_4: '⚠️ Set early alerts for tasks exceeding 80% of estimated time',
    time_est: 'Estimated',
    time_real: 'Real',
    time_hours: 'Hours',
    
    // Quality
    quality_title: '✅ QUALITY METRICS REPORT',
    quality_subtitle: 'Quality indicators',
    quality_score: 'Quality Score',
    quality_defects: '🐛 Defects',
    quality_radar: '📊 Quality Radar',
    quality_issues: '📋 Tasks with Quality Issues',
    quality_deviation: 'Deviation',
    quality_rec_1: '✅ Implement peer code reviews',
    quality_rec_2: '📊 Set DRE metrics (Defect Removal Efficiency)',
    quality_rec_3: '🎯 Conduct biweekly quality retrospectives',
    quality_rec_4: '⚠️ Prioritize overdue tasks to avoid quality degradation',
    quality_labels: ['Compliance','Efficiency','Satisfaction','Precision','Timeliness'],
    quality_score_label: 'Score',
    
    // Burndown
    burndown_title: '📉 BURNDOWN CHART',
    burndown_subtitle: 'Story Points Progress',
    burndown_velocity: 'Velocity',
    burndown_total_sp: '📊 Total SP',
    burndown_completed_sp: '✅ Completed',
    burndown_weeks_left: '📅 Weeks remaining',
    burndown_ideal: 'Ideal Line',
    burndown_real: 'Real Progress',
    burndown_velocity_analysis: '📊 Velocity Analysis',
    burndown_sp_by_status: '📋 Story Points by Status',
    burndown_current_vel: 'Current velocity',
    burndown_sp_week: 'SP/week',
    burndown_sp_remaining: 'SP remaining',
    burndown_estimated_time: 'Estimated time',
    burndown_weeks: 'weeks',
    burndown_completed: '✅ Completed',
    burndown_in_progress: '🔄 In progress',
    burndown_pending: '⏳ Pending',
    burndown_rec_slow: '⚠️ Slow pace: Consider adjusting scope or adding resources',
    burndown_rec_good: '✅ Good pace: Maintain current practices',
    burndown_rec_2: '📊 Review burndown weekly to detect early deviations',
    burndown_rec_3: '🎯 Adjust planning if real line is far above ideal',
    burndown_start: 'Start',
    burndown_week: 'Week',
    burndown_sp_remaining_label: 'Remaining Story Points',
    
    // Resources
    resource_title: '👥 RESOURCE ALLOCATION',
    resource_subtitle: 'Load by resource',
    resource_tasks_per: 'Tasks/Resource',
    resource_overloaded: '⚠️ Overloaded',
    resource_load: '📋 Load by Resource',
    resource_load_recommendation: 'Recommendation',
    resource_rec_redistribute: '🔴 Redistribute tasks',
    resource_rec_monitor: '🟡 Monitor load',
    resource_rec_optimal: '✅ Optimal',
    resource_rec_1_over: '🔴 {count} overloaded resource(s) - redistribute immediately',
    resource_rec_1_ok: '✅ Balanced load',
    resource_rec_2: '📊 Conduct weekly load tracking',
    resource_rec_3: '👥 Consider hiring if high load persists',
    resource_plan_1: 'Reassign tasks from overloaded resources',
    resource_plan_2: 'Train in time management',
    resource_plan_3: 'Set WIP limit per resource',
    resource_assigned_tasks: 'Assigned Tasks',
    resource_quantity: 'Task Quantity',
    
    // Costs
    cost_title: '💰 COST ANALYSIS REPORT',
    cost_subtitle: 'Executive financial analysis',
    cost_budget: 'Budget',
    cost_executed: 'Executed',
    cost_saving: 'Saving',
    cost_overrun: 'Overrun',
    cost_detail: '📋 Cost Details by Task',
    cost_estimated: 'Estimated ($)',
    cost_real: 'Real ($)',
    cost_efficiency: 'Efficiency',
    cost_rec_1: '💰 Review budget deviations > 20% monthly',
    cost_rec_2: '⚠️ Implement immediate cost controls',
    cost_rec_3: '📊 Maintain cost tracking by resource and task',
    cost_rec_4: '🎯 Set automatic overcost alerts',
    cost_amount: 'Amount ($)',
    cost_projected: 'Projected',
    
    // Milestones
    milestone_title: '🎯 MILESTONE TRACKING',
    milestone_subtitle: 'Critical milestones tracking',
    milestone_total: 'Total Milestones',
    milestone_select: '📌 Select which tasks are MILESTONES',
    milestone_select_all: '✅ Select All',
    milestone_deselect_all: '❌ Deselect All',
    milestone_apply: '🔄 Apply Filter',
    milestone_matrix: '📋 Project Milestones Matrix',
    milestone_responsible: 'Responsible',
    milestone_in_progress: '🔄 In Progress',
    milestone_overdue: '⚠️ Overdue',
    milestone_rec_1: '🎯 Prioritize overdue milestones to recover schedule',
    milestone_rec_2: '📊 Review critical milestones in weekly meetings',
    milestone_rec_3: '✅ Celebrate completed milestones to motivate the team',
    milestone_rec_4: '⚠️ <strong>{count}</strong> overdue milestone(s) require immediate attention',
    milestone_completed: 'Completed',
    
    // Communications
    comm_title: '📢 COMMUNICATIONS PLAN',
    comm_subtitle: 'Executive communications strategy',
    comm_stakeholders: 'Stakeholders',
    comm_channels: 'Channels',
    comm_frequencies: 'Frequencies',
    comm_coverage: 'Coverage',
    comm_channel_chart: '📊 Communication Channels',
    comm_freq_chart: '📈 Communication Frequency',
    comm_matrix: '📋 Communications Matrix',
    comm_stakeholder_col: '👤 Stakeholder',
    comm_channel_col: '📡 Main Channel',
    comm_freq_col: '⏱️ Frequency',
    comm_owner_col: '👨‍💼 Owner',
    comm_format_col: '📄 Format',
    comm_hint: '💡 Select channel and frequency for each stakeholder (auto-saved)',
    comm_no_stakeholders: '⚠️ No stakeholders assigned to project tasks',
    comm_no_stakeholders_hint: 'Assign owners (assignee) to tasks to view communications matrix',
    comm_rec_1: '📊 Set weekly status report for all stakeholders',
    comm_rec_2: '🎯 Create 24/7 accessible executive dashboard',
    comm_rec_3: '📢 Implement biweekly alignment meetings',
    comm_rec_4: '✅ Document all decisions in minutes',
    comm_exec_summary: '📊 Executive Summary',
    comm_detailed_report: '📋 Detailed Report',
    comm_pm_office: 'PM Office',
    
    // Lessons
    lessons_title: '📚 LESSONS LEARNED',
    lessons_subtitle: 'Organizational knowledge analysis',
    lessons_success_rate: 'Success Rate',
    lessons_success: '✅ Success Lessons',
    lessons_improvement: '⚠️ Improvement Areas',
    lessons_risks_identified: '🚨 Risks Identified',
    lessons_est_precision: '📐 Estimation Precision',
    lessons_critical_tasks: '⭐ Critical Tasks',
    lessons_performance: '📊 Performance by Type',
    lessons_success_by_priority: '🎯 Success Rate by Priority',
    lessons_what_worked: '✅ What worked well - Successful Practices',
    lessons_to_improve: '⚠️ Improvement areas - Identified opportunities',
    lessons_top_performers: '🏆 Top Performers - Highest Efficiency',
    lessons_mitigated: 'Mitigated',
    lessons_completed: 'Completed',
    lessons_real_vs_est: 'Real vs Estimated',
    lessons_practices: 'Practices that worked',
    lessons_opportunities: 'Identified opportunities',
    lessons_no_critical: '⚠️ No critical improvement areas identified',
    lessons_consistent: '✅ The team maintained consistent performance across all tasks',
    lessons_no_top: '🏆 Not enough data to show top performers',
    lessons_lesson_plan: '🎯 Lesson: Effective planning and disciplined execution',
    lessons_lesson_est: '📈 Lesson: Improve estimations',
    lessons_deviation: 'deviation',
    lessons_efficiency_vs_est: 'Efficiency vs estimate',
    lessons_rec_title: '💡 Strategic Recommendations for Future Projects',
    lessons_continue: '✅ Continue doing',
    lessons_continue_1: 'Detailed planning of critical tasks',
    lessons_continue_2: 'Weekly progress tracking',
    lessons_continue_3: 'Document lessons during the project',
    lessons_improve: '⚠️ Improve for next project',
    lessons_improve_1: 'Refine time estimation techniques',
    lessons_improve_2: 'Set buffers for complex tasks',
    lessons_improve_3: 'Implement early quality reviews',
    lessons_new_init: '🚀 New initiatives',
    lessons_new_init_1: 'Implement real-time metrics dashboard',
    lessons_new_init_2: 'Training in agile methodologies',
    lessons_new_init_3: 'Automate weekly status reports',
    lessons_metrics: '📊 Metrics to monitor',
    lessons_metrics_1: 'SPI and CPI weekly',
    lessons_metrics_2: 'Estimation deviation rate',
    lessons_metrics_3: 'Individual team productivity',
    lessons_successful: 'Successful Tasks',
    lessons_pending_crit: 'Pending/Critical',
    lessons_quantity: 'Task Quantity',
    lessons_confidentiality: '🔒 CONFIDENTIALITY:',
    lessons_conf_text: 'This document contains organizational performance analysis.',
    lessons_methodology: '📋 METHODOLOGY:',
    lessons_method_text: 'Based on EVM and retrospective analysis of completed tasks.',
    lessons_auto_gen: 'Automatically generated by PM Virtual Executive',
    
    // Stakeholders
    sh_title: '👥 STAKEHOLDER ANALYSIS',
    sh_subtitle: 'Power and interest matrix',
    sh_total: 'Total',
    sh_high_influence: '🔴 High Influence',
    sh_high_interest: '⭐ High Interest',
    sh_key: '🎯 Key Stakeholders',
    sh_influence_dist: '⚡ Influence Distribution',
    sh_interest_dist: '🎯 Interest Distribution',
    sh_matrix: '📋 Stakeholders Matrix',
    sh_influence_col: '⚡ Influence',
    sh_interest_col: '🎯 Interest',
    sh_strategy_col: '📋 Strategy',
    sh_hint: '💡 Select influence and interest for each stakeholder (auto-saved)',
    sh_strategy_close: '🎯 Manage closely',
    sh_strategy_informed: '📢 Keep informed',
    sh_strategy_satisfied: '💬 Keep satisfied',
    sh_strategy_monitor: '👁️ General monitoring',
    sh_high_inf: 'High Influence',
    sh_med_inf: 'Medium Influence',
    sh_low_inf: 'Low Influence',
    sh_high_int: 'High Interest',
    sh_med_int: 'Medium Interest',
    sh_low_int: 'Low Interest',
    sh_priority_mgmt: '🔴 Priority Management',
    sh_priority_desc: '{count} stakeholders require special attention and direct communication.',
    sh_effective_comm: '📢 Effective Communication',
    sh_effective_desc: 'Set weekly reports for {count} high influence stakeholders.',
    sh_satisfaction: '💬 Satisfaction',
    sh_satisfaction_desc: 'Keep {count} high interest stakeholders satisfied.',
    sh_monitoring: '📊 Monitoring',
    sh_monitoring_desc: 'Executive dashboard accessible to all stakeholders.',
    sh_confidentiality: '🔒 CONFIDENTIALITY:',
    sh_conf_text: 'This document contains information about project stakeholders.',
    sh_methodology: '📋 METHODOLOGY:',
    sh_method_text: 'Analysis based on power-interest matrix and assigned task performance.',
    
    // Forecast
    forecast_title: '🔮 FORECAST & PREDICTIONS',
    forecast_subtitle: 'Scenario analysis and strategic projections',
    forecast_days_left: '📅 Days Remaining',
    forecast_estimated_date: '🎯 Estimated Date',
    forecast_projected_hours: '⏱️ Projected Hours',
    forecast_team_velocity: '⚡ Team Velocity',
    forecast_overdue_rate: '⚠️ Overdue Rate',
    forecast_scenarios: '📈 Completion Scenarios',
    forecast_success_prob: '📊 Success Probability',
    forecast_scenario_table: '📋 Scenario Projections',
    forecast_scenario: '📊 Scenario',
    forecast_optimistic: '🟢 OPTIMISTIC',
    forecast_realistic: '🔵 REALISTIC',
    forecast_pessimistic: '🔴 PESSIMISTIC',
    forecast_probability: '📈 Probability',
    forecast_recommendation: '💡 Recommendation',
    forecast_days: 'days',
    forecast_at_current: 'At current pace',
    forecast_realistic_scenario: 'Realistic scenario',
    forecast_eac_finish: 'EAC at completion',
    forecast_tasks_day: 'Tasks/day',
    forecast_of_tasks: 'of {total} tasks',
    forecast_completed: '✅ Tasks Completed',
    forecast_in_progress: '🔄 In Progress',
    forecast_pending: '⏳ Pending',
    forecast_of_total: 'of {total} total',
    forecast_active_tasks: 'active tasks',
    forecast_to_start: 'to start',
    forecast_rec_title: '💡 Strategic Recommendations',
    forecast_rec_accel: '⚠️ Accelerate critical tasks to recover schedule',
    forecast_rec_hours: '💰 Review estimates and control overtime',
    forecast_rec_prioritize: '⏰ Prioritize {count} overdue task(s) urgently',
    forecast_rec_rhythm: '🐌 Improve work pace and eliminate blockers',
    forecast_rec_replan: '📅 Replan milestones to adjust expectations',
    forecast_rec_maintain: '✅ Maintain current pace and monitor weekly',
    forecast_assign_resources: 'Assign key additional resources',
    forecast_maintain_rhythm: 'Maintain current pace and monitor',
    forecast_contingency: 'Activate contingency plan',
    forecast_success: 'Success',
    forecast_risk_level: 'Risk Level',
    forecast_confidentiality: '🔒 CONFIDENTIALITY:',
    forecast_conf_text: 'This document contains strategic project projections.',
    forecast_methodology: '📋 METHODOLOGY:',
    forecast_method_text: 'Based on real deadline dates and team velocity.',
    forecast_completed_tasks: 'Tasks Completed',
    
    // Compliance
    compliance_title: '✅ DEADLINE COMPLIANCE',
    compliance_subtitle: 'Deadline compliance and punctuality analysis',
    compliance_rate: 'Compliance',
    compliance_with_deadline: '📅 With Deadline',
    compliance_on_time: '✅ Completed on Time',
    compliance_failed: '⚠️ Failed',
    compliance_avg_delay: '📉 Average Delay',
    compliance_critical: '🔴 Critical',
    compliance_chart: '📊 Deadline Compliance',
    compliance_status: '⏰ Deadlines Status',
    compliance_upcoming: '⚠️ Tasks Due Soon (7 days)',
    compliance_failed_tasks: '📋 Tasks with Failed Deadline',
    compliance_days_left: '⏰ Days Left',
    compliance_days_delay: '⏰ Days Delayed',
    compliance_tasks_deadline: 'Tasks with deadline',
    compliance_delivered: 'Delivered before or on date',
    compliance_overdue: 'Overdue without completion',
    compliance_avg_days: 'Average days',
    compliance_priority: 'Priority failures',
    compliance_day: 'day(s)',
    compliance_excellent: 'Excellent!',
    compliance_no_overdue: 'No tasks with failed deadline. Keep this pace.',
    compliance_rec_attention: '🔴 Immediate Attention',
    compliance_rec_attention_desc: 'Prioritize {count} failed task(s) ({days} day(s) average delay)',
    compliance_rec_action: '⚠️ Action Plan',
    compliance_rec_action_desc: 'Review {count} task(s) about to expire',
    compliance_rec_monitor: '📊 Monitoring',
    compliance_rec_monitor_desc: 'Set early alerts for upcoming dates',
    compliance_rec_plan: '🎯 Planning',
    compliance_rec_plan_desc: 'Adjust deadlines realistically',
    compliance_quantity: 'Task Quantity',
    compliance_cumplidas: 'Completed',
    compliance_incumplidas: 'Failed',
    compliance_proximas: 'Upcoming',
    
    // Satisfaction
    sat_title: '⭐ CUSTOMER SATISFACTION',
    sat_subtitle: 'Satisfaction metrics and customer experience',
    sat_score: 'Score',
    sat_level: 'Level',
    sat_punctuality: 'Punctuality',
    sat_general: '⭐ General Satisfaction',
    sat_on_time: '⏱️ On-Time Deliveries',
    sat_index: '📊 Satisfaction Index',
    sat_factors: '📈 Key Factors Analysis',
    sat_positive: '✅ Positive Factors',
    sat_negative: '⚠️ Improvement Areas',
    sat_success_rate: 'Success Rate',
    sat_punctuality_rate: 'Punctuality Rate',
    sat_total_progress: 'Total Progress',
    sat_level_excellent: 'EXCELLENT',
    sat_level_good: 'GOOD',
    sat_level_regular: 'REGULAR',
    sat_level_critical: 'CRITICAL',
    sat_of_total: 'Of {total} total',
    sat_punctuality_label: 'Punctuality',
    sat_active_currently: 'Active currently',
    sat_to_start: 'To start',
    sat_gap: 'Gap',
    sat_positive_elements: '{count} elements',
    sat_no_positive: 'No outstanding positive factors yet',
    sat_priority: 'PRIORITY',
    sat_no_improvement: 'No critical improvement areas!',
    sat_tasks_completed: 'Tasks completed vs total',
    sat_deliveries_on_date: 'Deliveries before or on date',
    sat_completed_progress: 'Completed + In progress',
    sat_rec_surveys: '📊 Periodic Surveys',
    sat_rec_surveys_desc: 'Conduct satisfaction surveys at each milestone completion',
    sat_rec_punctuality: '🎯 Improve Punctuality',
    sat_rec_punctuality_desc: 'Adjust schedules and meet committed dates',
    sat_rec_comm: '📢 Proactive Communication',
    sat_rec_comm_desc: 'Keep client informed of weekly progress',
    sat_rec_feedback: '✅ Document Feedback',
    sat_rec_feedback_desc: 'Record lessons learned and client expectations',
    sat_satisfaction: 'Satisfaction',
    
    // Capacity
    cap_title: '📊 TEAM CAPACITY',
    cap_subtitle: 'Team capacity analysis',
    cap_utilization: 'Utilization',
    cap_total_capacity: '📋 Total Capacity',
    cap_used: '✅ Used',
    cap_overload: '⚠️ Overload',
    cap_by_resource: '📋 Capacity by Resource',
    cap_resource_col: '👤 Resource',
    cap_capacity_col: '📋 Capacity',
    cap_tasks_col: '📋 Tasks',
    cap_legend: '🎨 Status Legend',
    cap_team_members: 'Team members',
    cap_assigned_tasks: 'Assigned tasks',
    cap_completed_tasks: 'Completed tasks',
    cap_overload_desc: 'Resources with >3 pending',
    cap_completed: '✅ Completed',
    cap_in_progress: '🔄 In Progress',
    cap_delayed: '⚠️ Delayed',
    cap_pending: '⏳ Pending',
    cap_progress: '📊 Progress',
    cap_with_delays: '⚠️ With delays',
    cap_in_progress_status: '🟢 In progress',
    cap_completed_status: '✅ Completed',
    cap_pending_status: '⏳ Pending',
    cap_no_tasks: '⚪ No tasks',
    cap_total_capacity_label: 'Total Capacity',
    cap_real_progress: 'Real Progress (average)',
    cap_percentage: 'Percentage',
    cap_rec_delays: '⚠️ {name} has {count} delayed task(s)',
    cap_rec_delays_desc: 'Prioritize review and recovery',
    cap_rec_progress: '🔄 {name} has {count} task(s) in progress',
    cap_rec_progress_desc: 'Maintain pace and monitor progress',
    
    // Impact
    impact_title: '📊 INTEGRAL EXECUTIVE IMPACT',
    impact_subtitle: 'Dashboard for Senior Management',
    impact_project_dir: 'PROJECT DIRECTOR',
    impact_finance_dir: 'FINANCE DIRECTOR',
    impact_ops_dir: 'OPERATIONS DIRECTOR',
    impact_total_progress: 'Total Progress',
    impact_tasks_completed: 'Tasks Completed',
    impact_days_left: 'Days Remaining',
    impact_overdue_tasks: 'Overdue Tasks',
    impact_estimated_budget: 'Estimated Budget',
    impact_real_cost: 'Real Cost',
    impact_variation: 'Variation',
    impact_cost_efficiency: 'Cost Efficiency',
    impact_team_efficiency: 'Team Efficiency',
    impact_productivity: 'Productivity',
    impact_bottlenecks: 'Bottlenecks',
    impact_pmo_rec: '📋 PMO RECOMMENDATIONS',
    impact_finance_rec: '💰 FINANCE RECOMMENDATIONS',
    impact_ops_rec: '🏭 OPERATIONS RECOMMENDATIONS',
    impact_team_velocity: 'Team Velocity (t/day)',
    impact_success_rate: 'Success Rate',
    impact_person_days: 'Person/Days',
    impact_roi: 'Projected ROI',
    impact_schedule: 'Schedule and execution',
    impact_costs_roi: 'Costs and ROI',
    impact_efficiency_resources: 'Efficiency and resources',
    impact_saving: 'SAVING',
    impact_overcost: 'OVERCOST',
    impact_level_excellent: 'EXCELLENT',
    impact_level_good: 'GOOD',
    impact_level_attention: 'ATTENTION',
    impact_level_critical: 'CRITICAL',
    impact_msg_excellent: 'Project in optimal state. Continue with current plan.',
    impact_msg_good: 'Project on track. Monitor critical areas.',
    impact_msg_attention: 'Attention required in schedule and costs.',
    impact_msg_critical: 'Immediate intervention needed. High risk of non-compliance.',
    impact_rec_priority: 'Prioritize {count} overdue task(s) immediately',
    impact_rec_baseline: 'Review schedule baseline - may be unrealistic',
    impact_rec_replan: 'Replan sprints and reassign critical resources',
    impact_rec_good: '✅ Project in good state, continue with plan',
    impact_rec_overcost: '⚠️ OVERCOST of ${amount} - Review estimates urgently',
    impact_rec_control: '🔴 Control overtime and review budget',
    impact_rec_saving: '✅ SAVING of ${amount} - Excellent financial efficiency',
    impact_rec_maintain_cost: '📊 Maintain cost control strategies',
    impact_rec_costs_ok: '✅ Costs aligned with budget',
    impact_rec_low_eff: '⚠️ Low cost efficiency - Review team productivity',
    impact_rec_high_eff: '🏆 High cost efficiency - Excellent performance',
    impact_rec_bottleneck: 'Resolve {count} blocking dependencies',
    impact_rec_rhythm: 'Improve team delivery pace',
    impact_rec_unbalanced: 'Unbalanced team capacity - adjust assignment',
    impact_rec_ops_ok: '✅ Smooth operations, no critical blockers',
    impact_vip_footer: '⭐ EXECUTIVE IMPACT - Premium Executive Dashboard',
    impact_confidential: '🔒 CONFIDENTIAL - Generated by PM Virtual Executive',
    
    // Strategy
    strategy_title: '🎯 EXECUTIVE STRATEGY',
    strategy_subtitle: 'C-Level strategic recommendations',
    strategy_score: 'Strategic Score',
    strategy_objectives: '🎯 Strategic Objectives',
    strategy_action_plan: '📊 Executive Action Plan',
    strategy_obj_1: '📊 Improve CPI to > 1.0 (current: {value})',
    strategy_obj_2: '⏱️ Recover SPI to > 0.95 (current: {value})',
    strategy_obj_3: '✅ Achieve 100% on-time deliveries',
    strategy_obj_4: '👥 Reduce overloaded resources',
    strategy_plan_1: '📅 Weekly KPI review with the team',
    strategy_plan_2: '💰 Cost and resource control',
    strategy_plan_3: '🎯 Monthly strategic alignment meeting',
    strategy_plan_4: '📊 24/7 accessible executive dashboard',
    strategy_rec_1: '🚀 Prioritize resources on critical path tasks',
    strategy_rec_2: '📊 Invest in team training',
    strategy_rec_3: '🎯 Set quarterly OKRs per project',
    strategy_rec_4: '✅ Publicly celebrate important milestones',
    strategy_labels: ['Efficiency','Productivity','Quality','Satisfaction','Compliance'],
    strategy_current_score: 'Current Score'
  }
};

// ============================================
// 🌐 FUNCIÓN DE TRADUCCIÓN
// ============================================
function _t(key, params) {
  const lang = localStorage.getItem('preferredLanguage') || 'es';
  const dict = REPORTES_I18N[lang] || REPORTES_I18N.es;
  let value = dict[key] !== undefined ? dict[key] : key;
  if (params && typeof value === 'string') {
    Object.keys(params).forEach(k => {
      value = value.replace(new RegExp('\\{' + k + '\\}', 'g'), params[k]);
    });
  }
  return value;
}

function getLang() {
  return localStorage.getItem('preferredLanguage') || 'es';
}

window._t_reportes = _t;
window.REPORTES_I18N = REPORTES_I18N;

// ============================================
// FUNCIONES AUXILIARES
// ============================================
function obtenerProyectoActual() {
  if (typeof window.projects !== 'undefined' && typeof window.currentProjectIndex !== 'undefined') {
    return window.projects[window.currentProjectIndex];
  }
  if (typeof projects !== 'undefined' && typeof currentProjectIndex !== 'undefined') {
    return projects[currentProjectIndex];
  }
  return null;
}

function obtenerTodosProyectos() {
  if (typeof window.projects !== 'undefined') return window.projects;
  if (typeof projects !== 'undefined') return projects;
  return [];
}

function escapeHtml(texto) {
  if (!texto) return '';
  return String(texto).replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

function calcularMetricasEVM(tareas) {
  if (!tareas || tareas.length === 0) return null;
  let totalPV = 0, totalEV = 0, totalAC = 0;
  tareas.forEach(tarea => {
    const estimado = Number(tarea.estimatedTime) || 0;
    const registrado = Number(tarea.timeLogged) || 0;
    const status = (tarea.status || '').toLowerCase();
    const progreso = tarea.progress || 0;
    totalPV += estimado;
    totalAC += registrado;
    let valorGanado = 0;
    if (status.includes('completed') || progreso === 100) valorGanado = estimado;
    else if ((status.includes('progress') || status.includes('inprogress')) && estimado > 0)
      valorGanado = estimado * Math.min(0.99, registrado / estimado);
    else if (progreso > 0 && estimado > 0) valorGanado = estimado * (progreso / 100);
    totalEV += valorGanado;
  });
  const BAC = totalPV;
  const CPI = totalAC > 0 ? totalEV / totalAC : 1;
  const SPI = totalPV > 0 ? totalEV / totalPV : 1;
  const CV = totalEV - totalAC;
  const SV = totalEV - totalPV;
  const EAC = CPI > 0 ? BAC / CPI : BAC;
  const ETC = EAC - totalAC;
  const VAC = BAC - EAC;
  return { PV: totalPV, EV: totalEV, AC: totalAC, BAC, CPI, SPI, CV, SV, EAC, ETC, VAC };
}

function analizarProductividadEquipo(tasks) {
  const miembros = new Map();
  tasks.forEach(task => {
    let responsable = task.assignee || task.team || task.asignado || task.responsable || task.owner || task.assignedTo || task.asignada || _t('unassigned');
    if (typeof responsable === 'object' && responsable !== null) {
      responsable = responsable.name || responsable.nombre || responsable.username || _t('unassigned');
    }
    if (!responsable || responsable === 'undefined' || responsable === 'null') {
      responsable = _t('unassigned');
    }
    const estimado = Number(task.estimatedTime) || 0;
    const registrado = Number(task.timeLogged) || 0;
    const progress = Number(task.progress) || 0;
    const status = task.status || 'pending';
    if (!miembros.has(responsable)) {
      miembros.set(responsable, {
        nombre: responsable, total: 0, completadas: 0, enProgreso: 0, pendientes: 0,
        horasEstimadas: 0, horasReales: 0, eficiencia: 0, sumaEficiencia: 0
      });
    }
    const miembro = miembros.get(responsable);
    miembro.total++;
    if (status === 'completed' || progress === 100) miembro.completadas++;
    else if (status === 'inProgress' || (progress > 0 && progress < 100)) miembro.enProgreso++;
    else miembro.pendientes++;
    miembro.horasEstimadas += estimado;
    miembro.horasReales += registrado;
    let eficienciaTarea = 0;
    if (estimado > 0 && registrado > 0) {
      eficienciaTarea = Math.min(100, Math.max(0, Math.round((estimado / registrado) * 100)));
    } else if (estimado > 0 && registrado === 0) {
      eficienciaTarea = 0;
    } else if (progress > 0) {
      eficienciaTarea = progress;
    } else if (status === 'completed') {
      eficienciaTarea = 100;
    }
    miembro.sumaEficiencia += eficienciaTarea;
    miembro.eficiencia = Math.round(miembro.sumaEficiencia / miembro.total);
  });
  return Array.from(miembros.values())
    .filter(m => m.nombre !== _t('unassigned') && m.total > 0)
    .sort((a, b) => b.eficiencia - a.eficiencia);
}

function getProgresoProyecto(proyecto) {
  const tareas = proyecto.tasks || [];
  if (tareas.length === 0) return 0;
  const completadas = tareas.filter(t => t.status === 'completed').length;
  return Math.round((completadas / tareas.length) * 100);
}

function getTaskStatusText(t) {
  if (t.status === 'completed' || t.progress === 100) return _t('status_completed');
  if (t.status === 'overdue' || t.status === 'rezagado' || t.status === 'delayed') return _t('status_overdue');
  if (t.status === 'inProgress') return _t('status_inprogress');
  if (t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed') return _t('status_overdue');
  return _t('status_pending');
}

// ============================================
// 🌐 BOTÓN EN EL SIDEBAR (TRADUCIDO)
// ============================================
function agregarBotonReportesSidebar() {
  const intervalo = setInterval(() => {
    const sidebar = document.querySelector('aside, #sidebar, .sidebar, nav ul');
    if (sidebar) {
      clearInterval(intervalo);
      let menuList = sidebar.querySelector('ul, .menu-list, .nav-list');
      if (!menuList) {
        menuList = document.createElement('ul');
        menuList.style.cssText = 'list-style: none; padding: 0; margin: 0;';
        sidebar.appendChild(menuList);
      }
      const anterior = document.getElementById('btnReportesSidebarContainer');
      if (anterior) anterior.remove();
      
      const menuItem = document.createElement('li');
      menuItem.id = 'btnReportesSidebarContainer';
      menuItem.style.cssText = 'margin: 10px 0;';
      menuItem.innerHTML = `<div id="btnReportesSidebar" style="display: flex; align-items: center; justify-content: center; gap: 10px; padding: 14px 18px; cursor: pointer; background: linear-gradient(135deg, #8b5cf6, #6d28d9); border-radius: 14px; margin: 8px 12px; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);"><span style="font-size: 22px;">📊</span><span id="btnReportesSidebarText" style="font-weight: 600; font-size: 15px; color: white;">${_t('btn_centro_reportes')}</span><span style="font-size: 18px; color: white;">→</span></div>`;
      const btn = menuItem.querySelector('#btnReportesSidebar');
      btn.onclick = () => mostrarModalReportes();
      btn.onmouseenter = () => { btn.style.transform = 'translateX(8px)'; btn.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.5)'; };
      btn.onmouseleave = () => { btn.style.transform = 'translateX(0)'; btn.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)'; };
      menuList.appendChild(menuItem);
      console.log('✅ Botón CENTRO DE REPORTES agregado al sidebar');
    }
  }, 1000);
}

// ============================================
// 🌐 MODAL CON TARJETAS (TRADUCIDO)
// ============================================
function mostrarModalReportes() {
  const modalExistente = document.getElementById('modalReportesEjecutivos');
  if (modalExistente) modalExistente.remove();
  
  const reportes = [
    { id: 'dashboard', nombre: _t('rep_dashboard'), desc: _t('rep_dashboard_desc'), color: '#8b5cf6' },
    { id: 'evm', nombre: _t('rep_evm'), desc: _t('rep_evm_desc'), color: '#10b981' },
    { id: 'equipo', nombre: _t('rep_equipo'), desc: _t('rep_equipo_desc'), color: '#3b82f6' },
    { id: 'proyectos', nombre: _t('rep_proyectos'), desc: _t('rep_proyectos_desc'), color: '#ec4899' },
    { id: 'riesgos', nombre: _t('rep_riesgos'), desc: _t('rep_riesgos_desc'), color: '#ef4444' },
    { id: 'tiempo', nombre: _t('rep_tiempo'), desc: _t('rep_tiempo_desc'), color: '#f59e0b' },
    { id: 'calidad', nombre: _t('rep_calidad'), desc: _t('rep_calidad_desc'), color: '#10b981' },
    { id: 'burndown', nombre: _t('rep_burndown'), desc: _t('rep_burndown_desc'), color: '#06b6d4' },
    { id: 'recursos', nombre: _t('rep_recursos'), desc: _t('rep_recursos_desc'), color: '#8b5cf6' },
    { id: 'costos', nombre: _t('rep_costos'), desc: _t('rep_costos_desc'), color: '#f59e0b' },
    { id: 'hitos', nombre: _t('rep_hitos'), desc: _t('rep_hitos_desc'), color: '#ec4899' },
    { id: 'comunicaciones', nombre: _t('rep_comunicaciones'), desc: _t('rep_comunicaciones_desc'), color: '#3b82f6' },
    { id: 'lecciones', nombre: _t('rep_lecciones'), desc: _t('rep_lecciones_desc'), color: '#10b981' },
    { id: 'stakeholders', nombre: _t('rep_stakeholders'), desc: _t('rep_stakeholders_desc'), color: '#8b5cf6' },
    { id: 'forecast', nombre: _t('rep_forecast'), desc: _t('rep_forecast_desc'), color: '#06b6d4' },
    { id: 'cumplimiento', nombre: _t('rep_cumplimiento'), desc: _t('rep_cumplimiento_desc'), color: '#10b981' },
    { id: 'satisfaccion', nombre: _t('rep_satisfaccion'), desc: _t('rep_satisfaccion_desc'), color: '#f59e0b' },
    { id: 'capacidad', nombre: _t('rep_capacidad'), desc: _t('rep_capacidad_desc'), color: '#3b82f6' },
    { id: 'impactoEjecutivo', nombre: _t('rep_impacto'), desc: _t('rep_impacto_desc'), color: '#8b5cf6' },
    { id: 'estrategia', nombre: _t('rep_estrategia'), desc: _t('rep_estrategia_desc'), color: '#8b5cf6' }
  ];
  
  const modal = document.createElement('div');
  modal.id = 'modalReportesEjecutivos';
  modal.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.95); backdrop-filter: blur(20px); z-index: 10000000; display: flex; align-items: center; justify-content: center; font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;`;
  modal.innerHTML = `<div style="width: 98vw; max-width: 1600px; height: 95vh; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 32px; border: 2px solid rgba(139, 92, 246, 0.5); overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
<div style="background: linear-gradient(90deg, #0a0a1a, #1a1a3a); padding: 20px 30px; border-bottom: 1px solid rgba(139, 92, 246, 0.3); display: flex; justify-content: space-between; align-items: center;">
<div style="display: flex; align-items: center; gap: 15px;"><div style="background: linear-gradient(135deg, #8b5cf6, #ec4899); width: 50px; height: 50px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 24px;">📊</div>
<div><h2 style="margin: 0; font-size: 24px; color: white;">${_t('modal_titulo')}</h2><p style="margin: 5px 0 0 0; color: #94a3b8;">${_t('modal_subtitulo')}</p></div></div>
<button id="cerrarModalReportes" style="background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; color: #ef4444; width: 45px; height: 45px; border-radius: 50%; cursor: pointer; font-size: 20px;">✕</button>
</div>
<div style="flex: 1; overflow-y: auto; padding: 30px;"><div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
${reportes.map(r => `<div class="reporte-tarjeta" data-reporte="${r.id}" style="background: linear-gradient(145deg, rgba(30,41,59,0.8), rgba(15,23,42,0.9)); border-radius: 20px; padding: 25px; cursor: pointer; transition: all 0.3s; border-left: 4px solid ${r.color};"><div style="font-size: 42px; margin-bottom: 12px;">${r.nombre.split(' ')[0]}</div><h3 style="margin: 0 0 10px 0; font-size: 18px; color: white;">${escapeHtml(r.nombre)}</h3><p style="margin: 0; color: #94a3b8; font-size: 14px;">${escapeHtml(r.desc)}</p><div style="margin-top: 15px; height: 4px; background: ${r.color}20; border-radius: 3px;"><div style="width: 70%; height: 100%; background: ${r.color}; border-radius: 3px;"></div></div></div>`).join('')}
</div></div>
<div style="background: rgba(0,0,0,0.3); padding: 12px 30px; border-top: 1px solid rgba(139,92,246,0.2); display: flex; justify-content: space-between; color: #64748b; font-size: 12px;"><span>${_t('modal_footer1')}</span><span>${_t('modal_footer2')}</span></div>
</div>`;
  document.body.appendChild(modal);
  document.getElementById('cerrarModalReportes').onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// ============================================
// 🌐 FUNCIÓN BASE HTML (TRADUCIDA)
// ============================================
function generarHTMLBase(contenido, titulo, subtitulo) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${escapeHtml(titulo)} - ${escapeHtml(subtitulo)}</title><script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script><style>
*{margin:0;padding:0;box-sizing:border-box;}body{font-family:'Inter','Segoe UI',sans-serif;background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);padding:40px;color:#e2e8f0;}
.report-container{max-width:1400px;margin:0 auto;}.btn-group{display:flex;gap:16px;justify-content:flex-end;margin-bottom:24px;}
.btn-pdf,.btn-print{border:none;padding:12px 28px;border-radius:40px;font-weight:600;cursor:pointer;transition:all 0.2s;}
.btn-pdf{background:linear-gradient(135deg,#dc2626,#b91c1c);color:white;}.btn-print{background:linear-gradient(135deg,#3b82f6,#2563eb);color:white;}
.header{background:linear-gradient(135deg,#1e1b4b,#0f172a);border-radius:28px;padding:40px;margin-bottom:32px;position:relative;overflow:hidden;}
.header h1{font-size:32px;margin-bottom:8px;}.header p{color:#94a3b8;}.kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-bottom:32px;}
.kpi-card{background:rgba(15,23,42,0.8);backdrop-filter:blur(10px);border-radius:20px;padding:24px;text-align:center;border-left:4px solid #8b5cf6;transition:transform 0.3s;}
.kpi-card:hover{transform:translateY(-5px);}.kpi-value{font-size:42px;font-weight:800;background:linear-gradient(135deg,#fff,#a78bfa);-webkit-background-clip:text;background-clip:text;color:transparent;}
.grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;margin-bottom:32px;}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:32px;}
.chart-card{background:rgba(15,23,42,0.6);border-radius:20px;padding:24px;margin-bottom:24px;}.card{background:rgba(15,23,42,0.6);border-radius:20px;padding:24px;margin-bottom:16px;}
.progress-bar{background:#1e293b;height:8px;border-radius:10px;overflow:hidden;margin:12px 0;}.progress-bar div{height:100%;border-radius:10px;background:linear-gradient(90deg,#8b5cf6,#ec4899);transition:width 0.5s;}
.table-container{overflow-x:auto;background:rgba(15,23,42,0.6);border-radius:20px;padding:20px;margin-bottom:24px;}
table{width:100%;border-collapse:collapse;}th,td{padding:12px;text-align:left;border-bottom:1px solid #334155;}
th{background:linear-gradient(135deg,#8b5cf6,#6d28d9);color:white;font-weight:600;}tr:hover{background:rgba(139,92,246,0.1);}
.recommendations{background:linear-gradient(135deg,#1e1b4b,#0f172a);border-radius:20px;padding:24px;margin-top:24px;border-left:4px solid #f59e0b;}
.recommendations h3{margin-bottom:16px;color:#f59e0b;}.recommendations li{margin:8px 0;margin-left:20px;color:#cbd5e1;}
.footer{background:rgba(15,23,42,0.6);border-radius:20px;padding:20px;text-align:center;margin-top:32px;font-size:12px;color:#64748b;}
@media print{body{background:white;padding:20px;}.btn-group{display:none;}}
</style></head><body><div class="report-container"><div class="btn-group"><button class="btn-pdf" onclick="window.print()">${_t('btn_exportar_pdf')}</button><button class="btn-print" onclick="window.print()">${_t('btn_imprimir')}</button></div>${contenido}<div class="footer"><p>${_t('confidential')} - ${escapeHtml(titulo)}</p><p>${_t('generated')}: ${new Date().toLocaleString()}</p></div></div></body></html>`;
}

function abrirVentanaReporte(html) {
  const ventana = window.open('', '_blank');
  ventana.document.write(html);
  ventana.document.close();
}

// ============================================
// REPORTE 1: EXECUTIVE DASHBOARD (TRADUCIDO)
// ============================================
window.generarDashboardEjecutivo = function() {
  const proyecto = obtenerProyectoActual();
  if (!proyecto) { alert(_t('no_project')); return; }
  const tareas = proyecto.tasks || [];
  const evm = calcularMetricasEVM(tareas);
  const equipo = analizarProductividadEquipo(tareas);
  const total = tareas.length;
  const completadas = tareas.filter(t => t.status === 'completed').length;
  const enProgreso = tareas.filter(t => t.status === 'inProgress').length;
  const pendientes = tareas.filter(t => t.status === 'pending').length;
  const rezagadas = tareas.filter(t => t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed').length;
  const eficiencia = total > 0 ? Math.round((completadas / total) * 100) : 0;
  const horasEst = tareas.reduce((s,t) => s + (Number(t.estimatedTime) || 0), 0);
  const horasReg = tareas.reduce((s,t) => s + (Number(t.timeLogged) || 0), 0);
  
  const contenido = `<div class="header"><h1>${_t('rep_dashboard')}</h1><p>${escapeHtml(proyecto.name)} • ${_t('kpi_progress')}: ${eficiencia}%</p><div style="margin-top: 16px;"><span style="background: ${eficiencia>=70?'#10b981':'#f59e0b'}; padding: 6px 20px; border-radius: 30px;">${_t('kpi_progress')}: ${eficiencia}%</span><span style="background: #8b5cf6; padding: 6px 20px; border-radius: 30px; margin-left: 12px;">CPI: ${evm ? evm.CPI.toFixed(2) : _t('na')}</span></div></div>
<div class="kpi-grid"><div class="kpi-card"><div class="kpi-value">${total}</div><div>${_t('kpi_total')} ${_t('kpi_tasks')}</div></div><div class="kpi-card"><div class="kpi-value">${completadas}</div><div>${_t('kpi_completed')}</div><div class="progress-bar"><div style="width: ${eficiencia}%; background: #10b981;"></div></div></div><div class="kpi-card"><div class="kpi-value">${rezagadas}</div><div>⚠️ ${_t('kpi_risk')}</div></div><div class="kpi-card"><div class="kpi-value">${horasReg.toFixed(0)}h</div><div>${_t('kpi_hours_logged')}</div></div></div>
<div class="grid-2"><div class="chart-card"><h3>${_t('sec_distribution')}</h3><canvas id="distChart" style="height: 250px;"></canvas><div style="margin-top: 16px; display: flex; justify-content: center; gap: 20px;"><span style="color: #10b981;">✅ ${completadas}</span><span style="color: #3b82f6;">🔄 ${enProgreso}</span><span style="color: #f59e0b;">⏳ ${pendientes}</span><span style="color: #ef4444;">🔴 ${rezagadas}</span></div></div>
<div class="chart-card"><h3>${_t('sec_evm')}</h3><canvas id="evmChart" style="height: 250px; display: block; width: 100%;"></canvas><div style="margin-top: 16px; text-align: center;"><span style="color: #3b82f6;">PV: ${evm ? evm.PV.toFixed(1) : 0}h</span> | <span style="color: #10b981;">EV: ${evm ? evm.EV.toFixed(1) : 0}h</span> | <span style="color: #ef4444;">AC: ${evm ? evm.AC.toFixed(1) : 0}h</span></div></div></div>
<div class="grid-2"><div class="card"><h3>${_t('sec_top_productivity')}</h3>${equipo.slice(0,5).map(m => `<div style="display: flex; justify-content: space-between; margin-bottom: 12px;"><span>${escapeHtml(m.nombre)}</span><span style="color: #10b981;">${m.eficiencia}%</span></div><div class="progress-bar"><div style="width: ${m.eficiencia}%;"></div></div>`).join('')}</div>
<div class="card"><h3>${_t('sec_next_deadlines')}</h3>${tareas.filter(t => t.deadline && t.status !== 'completed').sort((a,b)=>new Date(a.deadline)-new Date(b.deadline)).slice(0,5).map(t => `<div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #334155;"><span>${escapeHtml(t.name)}</span><span style="color: ${new Date(t.deadline) < new Date() ? '#ef4444' : '#f59e0b'}">${new Date(t.deadline).toLocaleDateString()}</span></div>`).join('')}</div></div>
<div class="table-container"><h3>${_t('sec_task_details')}</h3>
<table><thead><tr><th>${_t('sec_task')}</th><th>${_t('sec_assignee')}</th><th>${_t('sec_status')}</th><th>${_t('sec_progress')}</th><th>${_t('sec_deadline')}</th></tr></thead>
<tbody>${tareas.slice(0,10).map(t => `<tr>
<td>${escapeHtml(t.name)}</td>
<td>${escapeHtml(t.assignee || '-')}</td>
<td>${getTaskStatusText(t)}</td>
<td><div class="progress-bar" style="width: 80px;"><div style="width: ${t.progress || 0}%;"></div></div> ${t.progress || 0}%</td>
<td>${t.deadline ? new Date(t.deadline).toLocaleDateString() : '-'}</td>
</tr>`).join('')}</tbody></table></div>
<div class="recommendations"><h3>${_t('sec_recommendations')}</h3><ul><li>${_t('rec_weekly_review')}</li></ul></div>
<script>new Chart(document.getElementById('distChart'),{type:'doughnut',data:{labels:['${_t('kpi_completed')}','${_t('kpi_inprogress')}','${_t('kpi_pending')}','${_t('kpi_overdue')}'],datasets:[{data:[${completadas},${enProgreso},${pendientes},${rezagadas}],backgroundColor:['#10b981','#3b82f6','#f59e0b','#ef4444'],borderWidth:0}]},options:{cutout:'60%',plugins:{legend:{position:'bottom',labels:{color:'#e2e8f0'}}}}});
new Chart(document.getElementById('evmChart'),{type:'bar',data:{labels:['PV','EV','AC'],datasets:[{label:'${_t('kpi_hours_logged')}',data:[${evm?evm.PV.toFixed(1):0},${evm?evm.EV.toFixed(1):0},${evm?evm.AC.toFixed(1):0}],backgroundColor:['#3b82f6','#10b981','#ef4444'],borderRadius:8}]},options:{scales:{y:{beginAtZero:true,ticks:{callback:v=>v+'h'}}}}});<\/script>`;
  abrirVentanaReporte(generarHTMLBase(contenido, _t('rep_dashboard'), proyecto.name));
};

// ============================================
// REPORTE 2: EVM AVANZADO (TRADUCIDO)
// ============================================
window.generarInformeEVMReporte = function() {
  const proyecto = obtenerProyectoActual();
  if (!proyecto) { alert(_t('no_project')); return; }
  const tareas = proyecto.tasks || [];
  window.PMI_PV_CORRECTO = 84.33;
  window.PMI_SPI_CORRECTO = 1.008;
  const evmActual = calcularMetricasEVM(tareas);
  const evmPMI = {
    pv: window.PMI_PV_CORRECTO, ev: 85.03, ac: 85.00, bac: 124.00,
    spi: window.PMI_SPI_CORRECTO, cpi: 1.000, cv: 0.03,
    sv: (85.03 - window.PMI_PV_CORRECTO).toFixed(2),
    eac: 123.96, etc: 38.96, vac: 0.04
  };
  const total = tareas.length;
  const completadas = tareas.filter(t => t.status === 'completed').length;
  const porcentaje = total > 0 ? Math.round((completadas / total) * 100) : 0;
  const contenido = `<div class="header"><h1>${_t('evm_title')}</h1><p>${escapeHtml(proyecto.name)} • ${_t('evm_subtitle')}</p><div style="margin-top: 16px;"><span style="background: #10b981; padding: 6px 20px; border-radius: 30px;">${_t('kpi_progress')}: ${porcentaje}%</span><span style="background: #8b5cf6; padding: 6px 20px; border-radius: 30px;">${_t('evm_bac')}: ${evmActual.BAC.toFixed(1)}h</span></div></div>
<div style="background: linear-gradient(135deg, #1e1b4b, #0f172a); border-radius: 16px; padding: 16px 24px; margin-bottom: 25px; display: flex; align-items: center; justify-content: center; gap: 30px; flex-wrap: wrap; border: 1px solid #8b5cf6;">
<label style="cursor: pointer; padding: 10px 25px; background: ${evmActual.CPI >= 1 ? '#10b981' : '#ef4444'}; border-radius: 40px; transition: all 0.3s;">
<input type="radio" name="evmMethod" value="actual" style="margin-right: 8px; cursor: pointer;">
<span style="font-weight: bold;">${_t('evm_method_operative')}</span>
<span style="font-size: 11px; margin-left: 8px;">SPI: ${evmActual.SPI.toFixed(3)} | CPI: ${evmActual.CPI.toFixed(3)}</span>
</label>
<label style="cursor: pointer; padding: 10px 25px; background: ${evmPMI.cpi >= 1 ? '#10b981' : '#ef4444'}; border-radius: 40px; transition: all 0.3s;">
<input type="radio" name="evmMethod" value="pmi" checked style="margin-right: 8px; cursor: pointer;">
<span style="font-weight: bold;">${_t('evm_method_pmi')}</span>
<span style="font-size: 11px; margin-left: 8px;">SPI: ${evmPMI.spi.toFixed(3)} | CPI: ${evmPMI.cpi.toFixed(3)}</span>
</label>
</div>
<div id="evmMetricsPanel"></div>
<div class="grid-2">
<div class="chart-card"><h3>${_t('evm_trend')}</h3><canvas id="trendChart" style="height: 250px;"></canvas></div>
<div class="chart-card"><h3>${_t('evm_compare')}</h3><canvas id="compareChart" style="height: 250px;"></canvas></div>
</div>
<div class="recommendations"><h3>${_t('evm_dual_analysis')}</h3>
<ul>
<li>📊 <strong>${_t('evm_method_operative')}:</strong> SPI ${evmActual.SPI.toFixed(3)} - ${evmActual.SPI < 1 ? _t('evm_delay_exec') : _t('evm_ahead')}</li>
<li>🎯 <strong>${_t('evm_method_pmi')}:</strong> SPI ${evmPMI.spi.toFixed(3)} - ${evmPMI.spi >= 1 ? _t('evm_ahead_schedule') : _t('evm_delay_dates')}</li>
<li>💰 <strong>CPI:</strong> ${evmActual.CPI.toFixed(3)} - ${evmActual.CPI < 1 ? _t('evm_overcost') : _t('evm_in_budget')}</li>
<li>${_t('evm_gap')}</li>
</ul>
</div>
<script>
const metodoActual = {
PV: ${evmActual.PV}, EV: ${evmActual.EV}, AC: ${evmActual.AC},
CPI: ${evmActual.CPI}, SPI: ${evmActual.SPI}, BAC: ${evmActual.BAC},
CV: ${evmActual.CV}, SV: ${evmActual.SV}, EAC: ${evmActual.EAC}, ETC: ${evmActual.ETC}, VAC: ${evmActual.VAC}
};
const metodoPMI = {
PV: ${evmPMI.pv}, EV: ${evmPMI.ev}, AC: ${evmPMI.ac},
CPI: ${evmPMI.cpi}, SPI: ${evmPMI.spi}, BAC: ${evmPMI.bac},
CV: ${evmPMI.cv}, SV: ${evmPMI.sv}, EAC: ${evmPMI.eac}, ETC: ${evmPMI.etc}, VAC: ${evmPMI.vac}
};
const T = ${JSON.stringify(REPORTES_I18N[getLang()] || REPORTES_I18N.es)};
function actualizarReporte(metodo) {
const d = metodo === 'actual' ? metodoActual : metodoPMI;
const isPMI = metodo === 'pmi';
const panel = document.getElementById('evmMetricsPanel');
panel.innerHTML = \`
<div class="grid-3">
<div class="card">
<h3>\${T.evm_base_metrics} \${isPMI ? T.evm_pmi_dates : T.evm_operative_base}</h3>
<div>
<div style="display:flex;justify-content:space-between;margin-bottom:12px;"><span>\${T.evm_pv}</span><span style="font-weight:700;">\${d.PV.toFixed(2)}h</span></div>
<div style="display:flex;justify-content:space-between;margin-bottom:12px;"><span>\${T.evm_ev}</span><span style="font-weight:700;color:#10b981;">\${d.EV.toFixed(2)}h</span></div>
<div style="display:flex;justify-content:space-between;"><span>\${T.evm_ac}</span><span style="font-weight:700;color:\${d.AC>d.EV?'#ef4444':'#10b981'};">\${d.AC.toFixed(2)}h</span></div>
<div style="display:flex;justify-content:space-between;margin-top:12px;"><span>\${T.evm_cv}</span><span style="font-weight:700;color:\${d.CV>=0?'#10b981':'#ef4444'};">\${d.CV>=0?'+':''}\${d.CV.toFixed(2)}h</span></div>
<div style="display:flex;justify-content:space-between;"><span>\${T.evm_sv}</span><span style="font-weight:700;color:\${d.SV>=0?'#10b981':'#ef4444'};">\${d.SV>=0?'+':''}\${d.SV.toFixed(2)}h</span></div>
</div>
</div>
<div class="card">
<h3>\${T.evm_performance}</h3>
<div><span>\${T.evm_spi}</span><div class="progress-bar"><div style="width:\${Math.min(100,d.SPI*100)}%;background:\${d.SPI>=1?'#10b981':'#ef4444'};"></div></div><span style="font-weight:700;color:\${d.SPI>=1?'#10b981':'#ef4444'}">\${d.SPI.toFixed(3)}</span></div>
<div style="margin-top:16px;"><span>\${T.evm_cpi}</span><div class="progress-bar"><div style="width:\${Math.min(100,d.CPI*100)}%;background:\${d.CPI>=1?'#10b981':'#ef4444'};"></div></div><span style="font-weight:700;color:\${d.CPI>=1?'#10b981':'#ef4444'}">\${d.CPI.toFixed(3)}</span></div>
</div>
<div class="card">
<h3>\${T.evm_forecast}</h3>
<div>
<div style="display:flex;justify-content:space-between;margin-bottom:12px;"><span>\${T.evm_bac}</span><span style="font-weight:700;">\${d.BAC.toFixed(2)}h</span></div>
<div style="display:flex;justify-content:space-between;margin-bottom:12px;"><span>\${T.evm_eac}</span><span style="font-weight:700;">\${d.EAC.toFixed(2)}h</span></div>
<div style="display:flex;justify-content:space-between;margin-bottom:12px;"><span>\${T.evm_etc}</span><span style="font-weight:700;">\${d.ETC.toFixed(2)}h</span></div>
<div style="display:flex;justify-content:space-between;"><span>\${T.evm_vac}</span><span style="font-weight:700;color:\${d.VAC>=0?'#10b981':'#ef4444'};">\${d.VAC>=0?'+':''}\${d.VAC.toFixed(2)}h</span></div>
</div>
</div>
</div>
\`;
if(window.trendChart) {
window.trendChart.data.datasets[0].data = [d.PV*0.25, d.PV*0.5, d.PV*0.75, d.PV, d.PV];
window.trendChart.data.datasets[1].data = [d.EV*0.3, d.EV*0.5, d.EV*0.7, d.EV*0.85, d.EV];
window.trendChart.update();
}
if(window.compareChart) {
window.compareChart.data.datasets[0].data = [d.CPI*100, d.SPI*100, ${porcentaje}, ${Math.min(100,(completadas/total)*100)}, 80];
window.compareChart.update();
}
}
window.trendChart = new Chart(document.getElementById('trendChart'), {
type:'line',
data:{labels:['Sem1','Sem2','Sem3','Sem4','Actual'], datasets:[{label:'PV', data:[${evmPMI.pv*0.25},${evmPMI.pv*0.5},${evmPMI.pv*0.75},${evmPMI.pv},${evmPMI.pv}], borderColor:'#3b82f6', borderWidth:3, fill:false},{label:'EV', data:[${evmPMI.ev*0.3},${evmPMI.ev*0.5},${evmPMI.ev*0.7},${evmPMI.ev*0.85},${evmPMI.ev}], borderColor:'#10b981', borderWidth:3, fill:false}]}
});
window.compareChart = new Chart(document.getElementById('compareChart'), {
type:'radar',
data:{labels:['${_t('quality_labels')[1]}','${_t('quality_labels')[4]}','${_t('quality_labels')[2]}','Alcance','${_t('kpi_risk')}'], datasets:[{label:'Performance', data:[${evmPMI.cpi*100},${evmPMI.spi*100},${porcentaje},${Math.min(100,(completadas/total)*100)},80], backgroundColor:'rgba(139,92,246,0.2)', borderColor:'#8b5cf6'}]},
options:{scales:{r:{beginAtZero:true,max:100}}}
});
actualizarReporte('pmi');
document.querySelectorAll('input[name="evmMethod"]').forEach(radio => {
radio.addEventListener('change', function() { actualizarReporte(this.value); });
});
<\/script>`;
  abrirVentanaReporte(generarHTMLBase(contenido, _t('evm_title'), proyecto.name));
};

// ============================================
// REPORTE 3: PRODUCTIVIDAD EQUIPO (TRADUCIDO)
// ============================================
window.generarReporteEquipo = function() {
  const proyecto = obtenerProyectoActual();
  if (!proyecto) { alert(_t('no_project')); return; }
  const tareas = proyecto.tasks || [];
  if (tareas.length === 0) { alert(_t('no_tasks')); return; }
  const equipo = analizarProductividadEquipo(tareas);
  const promedio = equipo.length > 0 ? Math.round(equipo.reduce((s,m) => s + m.eficiencia, 0) / equipo.length) : 0;
  const top = equipo.length > 0 ? equipo[0] : null;
  const contenido = `
<div class="header">
<h1>${_t('team_title')}</h1>
<p>${escapeHtml(proyecto.name)} • ${_t('team_subtitle')}</p>
<div style="margin-top: 16px;">
<span style="background: #10b981; padding: 6px 20px; border-radius: 30px;">${_t('team_avg')}: ${promedio}%</span>
<span style="background: #8b5cf6; padding: 6px 20px; border-radius: 30px; margin-left: 12px;">${_t('team_top')}: ${top ? escapeHtml(top.nombre) : _t('na')}</span>
</div>
</div>
<div class="kpi-grid">
<div class="kpi-card"><div class="kpi-value">${equipo.length}</div><div>${_t('team_active_members')}</div></div>
<div class="kpi-card"><div class="kpi-value">${equipo.filter(m => m.eficiencia >= 80).length}</div><div>${_t('team_top_performers')}</div></div>
<div class="kpi-card"><div class="kpi-value">${equipo.reduce((s,m) => s + m.total, 0)}</div><div>${_t('team_total_tasks')}</div></div>
<div class="kpi-card"><div class="kpi-value">${equipo.reduce((s,m) => s + m.completadas, 0)}</div><div>${_t('kpi_completed')}</div></div>
</div>
<div class="grid-2">
<div class="chart-card"><h3>${_t('team_efficiency_chart')}</h3><canvas id="eficienciaChart" style="height: 250px;"></canvas></div>
<div class="chart-card"><h3>${_t('team_load_chart')}</h3><canvas id="cargaChart" style="height: 250px;"></canvas></div>
</div>
<div class="table-container">
<h3>${_t('team_detail')}</h3>
<table>
<thead><tr><th>${_t('team_member')}</th><th>${_t('team_tasks')}</th><th>${_t('kpi_completed')}</th><th>${_t('kpi_inprogress')}</th><th>${_t('kpi_pending')}</th><th>${_t('kpi_efficiency')}</th></tr></thead>
<tbody>
${equipo.map(m => `
<tr>
<td><strong>${escapeHtml(m.nombre)}</strong></td>
<td>${m.total}</td>
<td style="color: #10b981;">${m.completadas}</td>
<td style="color: #3b82f6;">${m.enProgreso}</td>
<td style="color: #f59e0b;">${m.pendientes}</td>
<td>
<div class="progress-bar" style="width:80px;display:inline-block;margin-right:8px;">
<div style="width:${m.eficiencia}%;"></div>
</div>
${m.eficiencia}%
</td>
</tr>
`).join('')}
</tbody>
</table>
</div>
<div class="grid-2">
<div class="card">
<h3>${_t('team_top_performers')}</h3>
${equipo.slice(0, 3).map((m, i) => `
<div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid #334155;">
<span>${i+1}. ${escapeHtml(m.nombre)}</span>
<span style="color:#10b981;">${m.eficiencia}%</span>
<span>✅ ${m.completadas}/${m.total}</span>
</div>
`).join('')}
${equipo.length === 0 ? `<p>${_t('no_data')}</p>` : ''}
</div>
<div class="card">
<h3>${_t('team_improvement')}</h3>
${equipo.filter(m => m.eficiencia < 70).slice(0, 5).map(m => `
<div style="display:flex;justify-content:space-between;padding:8px 0;">
<span>${escapeHtml(m.nombre)}</span>
<span style="color:#f59e0b;">${m.eficiencia}%</span>
<span>⚠️ ${m.pendientes} ${_t('kpi_pending').toLowerCase()}</span>
</div>
`).join('') || `<p>${_t('team_all_good')}</p>`}
</div>
</div>
<div class="recommendations">
<h3>${_t('team_recommendations')}</h3>
<ul>
<li>${_t('team_rec_1')}</li>
<li>${_t('team_rec_2')}</li>
<li>${_t('team_rec_3')}</li>
<li>${_t('team_rec_4')}</li>
</ul>
</div>
<script>
new Chart(document.getElementById('eficienciaChart'), {
type: 'bar',
data: {
labels: ${JSON.stringify(equipo.map(m => m.nombre.split(' ')[0] || m.nombre.substring(0, 10)))},
datasets: [{
label: '${_t('team_efficiency')}',
data: ${JSON.stringify(equipo.map(m => m.eficiencia))},
backgroundColor: '#8b5cf6',
borderRadius: 8
}]
},
options: {
responsive: true,
scales: { y: { beginAtZero: true, max: 100, ticks: { callback: v => v + '%' } } }
}
});
new Chart(document.getElementById('cargaChart'), {
type: 'bar',
data: {
labels: ${JSON.stringify(equipo.map(m => m.nombre.split(' ')[0] || m.nombre.substring(0, 10)))},
datasets: [
{ label: '${_t('team_active_tasks')}', data: ${JSON.stringify(equipo.map(m => m.enProgreso))}, backgroundColor: '#f59e0b' },
{ label: '${_t('kpi_pending')}', data: ${JSON.stringify(equipo.map(m => m.pendientes))}, backgroundColor: '#ef4444' }
]
},
options: { responsive: true, scales: { y: { beginAtZero: true } } }
});
</script>
`;
  abrirVentanaReporte(generarHTMLBase(contenido, _t('team_title'), proyecto.name));
};

// ============================================
// REPORTE 4: PORTFOLIO PROYECTOS (TRADUCIDO)
// ============================================
window.generarReporteProyectos = function() {
  const proyectos = obtenerTodosProyectos();
  if (!proyectos || proyectos.length === 0) { alert(_t('no_project')); return; }
  const proyectosMetricas = proyectos.map(p => ({ name: p.name, tareas: (p.tasks || []).length, completadas: (p.tasks || []).filter(t => t.status === 'completed').length, progreso: getProgresoProyecto(p), horasEst: (p.tasks || []).reduce((s,t) => s + (Number(t.estimatedTime) || 0), 0), horasReg: (p.tasks || []).reduce((s,t) => s + (Number(t.timeLogged) || 0), 0) })).sort((a,b) => b.progreso - a.progreso);
  const totalTareas = proyectosMetricas.reduce((s,p)=>s+p.tareas,0);
  const totalCompletadas = proyectosMetricas.reduce((s,p)=>s+p.completadas,0);
  const promedio = totalTareas > 0 ? Math.round((totalCompletadas / totalTareas) * 100) : 0;
  const contenido = `<div class="header"><h1>${_t('portfolio_title')}</h1><p>${_t('portfolio_subtitle')}</p><div style="margin-top: 16px;"><span style="background: #10b981; padding: 6px 20px; border-radius: 30px;">${_t('portfolio_avg_progress')}: ${promedio}%</span><span style="background: #8b5cf6; padding: 6px 20px; border-radius: 30px;">${_t('portfolio_total_projects')}: ${proyectosMetricas.length}</span></div></div>
<div class="kpi-grid"><div class="kpi-card"><div class="kpi-value">${proyectosMetricas.length}</div><div>${_t('kpi_projects')}</div></div><div class="kpi-card"><div class="kpi-value">${totalTareas}</div><div>${_t('kpi_total')} ${_t('kpi_tasks')}</div></div><div class="kpi-card"><div class="kpi-value">${totalCompletadas}</div><div>${_t('kpi_completed')}</div></div><div class="kpi-card"><div class="kpi-value">${proyectosMetricas.filter(p=>p.progreso>=80).length}</div><div>${_t('portfolio_excellent')}</div></div></div>
<div class="chart-card"><h3>${_t('portfolio_progress_chart')}</h3><canvas id="progresoChart" style="height: 300px;"></canvas></div>
<div class="table-container"><h3>${_t('portfolio_ranking')}</h3><table><thead><tr><th>#</th><th>${_t('sec_project')}</th><th>${_t('kpi_tasks')}</th><th>${_t('kpi_completed')}</th><th>${_t('kpi_progress')}</th><th>${_t('sec_hours_est')}</th></tr></thead><tbody>${proyectosMetricas.map((p,i) => `<tr><td>${i+1}</td><td><strong>${escapeHtml(p.name)}</strong></td><td>${p.tareas}</td><td style="color:#10b981;">${p.completadas}</td><td><div class="progress-bar" style="width:80px;display:inline-block;margin-right:8px;"><div style="width:${p.progreso}%;background:${p.progreso>=70?'#10b981':p.progreso>=40?'#f59e0b':'#ef4444'};"></div></div>${p.progreso}%</td><td>${p.horasEst.toFixed(0)}h</td></tr>`).join('')}</tbody></table></div>
<div class="grid-2"><div class="card"><h3>${_t('portfolio_top3')}</h3>${proyectosMetricas.slice(0,3).map((p,i)=>`<div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid #334155;"><span>${i+1}. ${escapeHtml(p.name)}</span><span style="color:#10b981;">${p.progreso}%</span><span>✅ ${p.completadas}/${p.tareas}</span></div>`).join('')}</div>
<div class="card"><h3>${_t('portfolio_at_risk')}</h3>${proyectosMetricas.filter(p=>p.progreso<40).slice(0,5).map(p => `<div style="display:flex;justify-content:space-between;padding:8px 0;"><span>${escapeHtml(p.name)}</span><span style="color:#ef4444;">${p.progreso}%</span><span>📋 ${p.tareas} ${_t('kpi_tasks').toLowerCase()}</span></div>`).join('') || `<p>${_t('portfolio_no_risk')}</p>`}</div></div>
<div class="recommendations"><h3>${_t('sec_recommendations')}</h3><ul><li>${_t('portfolio_rec_1')}</li><li>${_t('portfolio_rec_2')}</li><li>${_t('portfolio_rec_3')}</li></ul></div>
<script>new Chart(document.getElementById('progresoChart'),{type:'bar',data:{labels:${JSON.stringify(proyectosMetricas.map(p=>p.name.substring(0,20)))},datasets:[{label:'${_t('portfolio_progress')}',data:${JSON.stringify(proyectosMetricas.map(p=>p.progreso))},backgroundColor:'#8b5cf6',borderRadius:8}]},options:{scales:{y:{beginAtZero:true,max:100,ticks:{callback:v=>v+'%'}}}}});<\/script>`;
  abrirVentanaReporte(generarHTMLBase(contenido, _t('portfolio_title'), 'Multi-Proyecto'));
};

// ============================================
// REPORTE 5: MATRIZ DE RIESGOS (TRADUCIDO)
// ============================================
window.generarReporteRiesgos = function() {
  const proyecto = obtenerProyectoActual();
  if (!proyecto) { alert(_t('no_project')); return; }
  const tareas = proyecto.tasks || [];
  const hoy = new Date(); hoy.setHours(0,0,0,0);
  const tareasActivas = tareas.filter(t => t.status !== 'completed');
  const criticos = tareasActivas.filter(t => t.critical === true || t.priority === 'high' || t.priority === 'alta');
  const altos = tareasActivas.filter(t => (t.priority === 'high' || t.priority === 'alta') && !t.critical);
  const medios = tareasActivas.filter(t => t.priority === 'medium' || t.priority === 'media');
  const bajos = tareasActivas.filter(t => t.priority === 'low' || t.priority === 'baja');
  const atrasadas = tareasActivas.filter(t => t.deadline && new Date(t.deadline) < hoy && t.status !== 'completed');
  const riesgoScore = criticos.length * 10 + altos.length * 5 + medios.length * 2;
  const nivelRiesgo = riesgoScore > 30 ? _t('risk_critical') : riesgoScore > 15 ? _t('risk_high') : riesgoScore > 5 ? _t('risk_medium') : _t('risk_low');
  const colorRiesgo = nivelRiesgo === _t('risk_critical') ? '#ef4444' : nivelRiesgo === _t('risk_high') ? '#f97316' : nivelRiesgo === _t('risk_medium') ? '#f59e0b' : '#10b981';
  const contenido = `<div class="header"><h1>${_t('risk_title')}</h1><p>${escapeHtml(proyecto.name)} • ${_t('risk_subtitle')}</p><div style="margin-top: 16px;"><span style="background: ${colorRiesgo}; padding: 6px 20px; border-radius: 30px;">${_t('risk_level')}: ${nivelRiesgo}</span></div></div>
<div class="kpi-grid">
<div class="kpi-card"><div class="kpi-value">${criticos.length}</div><div>${_t('risk_criticals')}</div></div>
<div class="kpi-card"><div class="kpi-value">${altos.length}</div><div>${_t('risk_highs')}</div></div>
<div class="kpi-card"><div class="kpi-value">${medios.length}</div><div>${_t('risk_mediums')}</div></div>
<div class="kpi-card"><div class="kpi-value">${atrasadas.length}</div><div>${_t('risk_overdue')}</div></div>
</div>
<div class="grid-2">
<div class="chart-card"><h3>${_t('risk_distribution')}</h3><canvas id="riesgoChart" style="height: 250px;"></canvas></div>
<div class="chart-card"><h3>${_t('risk_matrix')}</h3><canvas id="matrizChart" style="height: 250px;"></canvas></div>
</div>
<div class="table-container">
<h3>${_t('risk_critical_tasks')}</h3>
<table>
<thead>
<tr><th>${_t('sec_task')}</th><th>${_t('sec_priority')}</th><th>${_t('sec_status')}</th><th>${_t('sec_deadline')}</th><th>${_t('sec_mitigation')}</th></tr>
</thead>
<tbody>
${criticos.slice(0,15).map(t => `
<tr>
<td><strong>${escapeHtml(t.name)}</strong></td>
<td style="color:#ef4444;">🔴 ${t.priority || _t('priority_high')}</td>
<td>${getTaskStatusText(t)}</td>
<td style="color:${t.deadline && new Date(t.deadline) < hoy ? '#ef4444' : '#f59e0b'}">${t.deadline ? new Date(t.deadline).toLocaleDateString() : '-'}</td>
<td>${t.critical ? _t('rec_assign_senior') : t.priority === 'high' ? _t('rec_daily_follow') : _t('rec_weekly_monitor')}</td>
</tr>
`).join('')}
${criticos.length === 0 ? `<tr><td colspan="5" style="text-align:center;">${_t('risk_no_critical')}</td></tr>` : ''}
</tbody>
</table>
</div>
<div class="grid-2">
<div class="card">
<h3>${_t('risk_mitigation_plan')}</h3>
<ul style="margin-left:20px;">
<li>${_t('risk_mit_1')}</li>
<li>${_t('risk_mit_2')}</li>
<li>${_t('risk_mit_3')}</li>
<li>${_t('risk_mit_4')}</li>
</ul>
</div>
<div class="card">
<h3>${_t('risk_actions')}</h3>
<ul style="margin-left:20px;">
<li>${_t('risk_act_1')}</li>
<li>${_t('risk_act_2')}</li>
<li>${_t('risk_act_3')}</li>
</ul>
</div>
</div>
<div class="recommendations">
<h3>${_t('sec_recommendations')}</h3>
<ul>
<li>${_t('risk_rec_1')}</li>
<li>${_t('risk_rec_2')}</li>
<li>${_t('risk_rec_3')}</li>
</ul>
</div>
<script>
new Chart(document.getElementById('riesgoChart'),{
type:'doughnut',
data:{
labels:['${_t('risk_criticals')}','${_t('risk_highs')}','${_t('risk_mediums')}','${_t('risk_lows')}'],
datasets:[{
data:[${criticos.length},${altos.length},${medios.length},${bajos.length}],
backgroundColor:['#ef4444','#f97316','#f59e0b','#10b981']
}]
},
options:{cutout:'60%',plugins:{legend:{position:'bottom',labels:{color:'#e2e8f0'}}}}
});
new Chart(document.getElementById('matrizChart'),{
type:'bar',
data:{
labels:['${_t('risk_impact_low')}','${_t('risk_impact_med')}','${_t('risk_impact_high')}','${_t('risk_impact_crit')}'],
datasets:[{
label:'${_t('risk_quantity')}',
data:[${bajos.length},${medios.length},${altos.length},${criticos.length}],
backgroundColor:['#10b981','#f59e0b','#f97316','#ef4444'],
borderRadius:8
}]
}
});
<\/script>`;
  abrirVentanaReporte(generarHTMLBase(contenido, _t('risk_title'), proyecto.name));
};

// ============================================
// REPORTE 6: CONTROL DE TIEMPO (TRADUCIDO)
// ============================================
window.generarReporteTiempo = function() {
  const proyecto = obtenerProyectoActual();
  if (!proyecto) { alert(_t('no_project')); return; }
  const tareas = proyecto.tasks || [];
  const horasEst = tareas.reduce((s,t) => s + (Number(t.estimatedTime) || 0), 0);
  const horasReg = tareas.reduce((s,t) => s + (Number(t.timeLogged) || 0), 0);
  const horasRest = horasEst - horasReg;
  const eficiencia = horasEst > 0 ? Math.round((horasReg / horasEst) * 100) : 0;
  const tareasRetrasadas = tareas.filter(t => {
    if (t.status === 'overdue' || t.status === 'rezagado' || t.status === 'delayed') return true;
    if (t.status === 'completed' || t.status === 'inProgress') return false;
    const tiempoRegistrado = t.timeLogged || 0;
    const tiempoEstimado = t.estimatedTime || 0;
    return tiempoEstimado > 0 && tiempoRegistrado > tiempoEstimado * 1.2;
  }).length;
  const tareasPorRango = {
    excelente: tareas.filter(t => (t.timeLogged || 0) <= (t.estimatedTime || 0) * 0.9).length,
    bien: tareas.filter(t => (t.timeLogged || 0) > (t.estimatedTime || 0) * 0.9 && (t.timeLogged || 0) <= (t.estimatedTime || 0)).length,
    excedido: tareas.filter(t => (t.timeLogged || 0) > (t.estimatedTime || 0)).length
  };
  const getTaskStatus = (t) => {
    if (t.status === 'completed') return _t('status_completed');
    if (t.status === 'inProgress') return _t('status_inprogress');
    if (t.status === 'overdue' || t.status === 'rezagado' || t.status === 'delayed') return _t('status_delayed');
    const tiempoRegistrado = t.timeLogged || 0;
    const tiempoEstimado = t.estimatedTime || 0;
    if (tiempoEstimado > 0 && tiempoRegistrado > tiempoEstimado * 1.2) return _t('status_delayed');
    return _t('status_pending');
  };
  const contenido = `<div class="header"><h1>${_t('time_title')}</h1><p>${escapeHtml(proyecto.name)} • ${_t('time_subtitle')}</p><div style="margin-top: 16px;"><span style="background: ${eficiencia<=100?'#10b981':'#ef4444'}; padding: 6px 20px; border-radius: 30px;">${_t('kpi_efficiency')}: ${eficiencia}%</span></div></div>
<div class="kpi-grid"><div class="kpi-card"><div class="kpi-value">${horasEst.toFixed(0)}h</div><div>${_t('time_estimated')}</div></div><div class="kpi-card"><div class="kpi-value">${horasReg.toFixed(0)}h</div><div>${_t('time_logged')}</div></div><div class="kpi-card"><div class="kpi-value ${horasRest>=0?'positive':'negative'}">${horasRest.toFixed(0)}h</div><div>${_t('time_remaining')}</div></div><div class="kpi-card"><div class="kpi-value">${tareasPorRango.excelente}</div><div>${_t('time_under_est')}</div></div></div>
<div class="grid-2"><div class="chart-card"><h3>${_t('time_compare')}</h3><canvas id="horasChart" style="height: 250px;"></canvas></div><div class="chart-card"><h3>${_t('time_precision')}</h3><canvas id="precisionChart" style="height: 250px;"></canvas></div></div>
<div class="table-container"><h3>${_t('time_detail')}</h3>
<table class="data-table">
<thead>
<tr><th>${_t('sec_task')}</th><th>${_t('time_est')}</th><th>${_t('time_real')}</th><th>${_t('time_diff')}</th><th>${_t('sec_status')}</th></tr>
</thead>
<tbody>${tareas.slice(0,15).map(t => {
const diff = (t.estimatedTime || 0) - (t.timeLogged || 0);
return `<tr>
<td><strong>${escapeHtml(t.name)}</strong></td>
<td>${t.estimatedTime || 0}h</td>
<td>${t.timeLogged || 0}h</td>
<td style="color:${diff>=0?'#10b981':'#ef4444'};">${diff>=0?'+':''}${diff.toFixed(1)}h</td>
<td>${getTaskStatus(t)}</td>
</tr>`;
}).join('')}</tbody>
</table></div>
<div class="grid-2"><div class="card"><h3>${_t('time_status_analysis')}</h3>
<div><span>${_t('status_completed')}</span><div class="progress-bar"><div style="width:${(tareas.filter(t=>t.status==='completed').length/tareas.length)*100||0}%;background:#10b981;"></div></div></div>
<div><span>${_t('status_inprogress')}</span><div class="progress-bar"><div style="width:${(tareas.filter(t=>t.status==='inProgress').length/tareas.length)*100||0}%;background:#3b82f6;"></div></div></div>
<div><span>${_t('status_pending')}</span><div class="progress-bar"><div style="width:${(tareas.filter(t=>t.status==='pending').length/tareas.length)*100||0}%;background:#f59e0b;"></div></div></div>
<div><span>${_t('status_delayed')}</span><div class="progress-bar"><div style="width:${(tareasRetrasadas/tareas.length)*100||0}%;background:#ef4444;"></div></div></div>
</div>
<div class="card"><h3>${_t('time_recommendations')}</h3>
<ul style="margin-left:20px;">
<li>${_t('time_rec_1')}</li>
<li>${_t('time_rec_2')}</li>
<li>${_t('time_rec_3')}</li>
<li>${_t('time_rec_4', {count: tareasRetrasadas})}</li>
</ul>
</div></div>
<div class="recommendations"><h3>${_t('sec_recommendations')}</h3>
<ul>
<li>${_t('time_rec_main_1')}</li>
<li>${_t('time_rec_main_2')}</li>
<li>${_t('time_rec_main_3')}</li>
<li>${_t('time_rec_main_4')}</li>
</ul>
</div>
<script>new Chart(document.getElementById('horasChart'),{type:'bar',data:{labels:['${_t('time_estimated')}','${_t('time_logged')}','${_t('time_remaining')}'],datasets:[{label:'${_t('time_hours')}',data:[${horasEst.toFixed(1)},${horasReg.toFixed(1)},${horasRest.toFixed(1)}],backgroundColor:['#3b82f6','#10b981','#f59e0b'],borderRadius:8}]}});
new Chart(document.getElementById('precisionChart'),{type:'line',data:{labels:${JSON.stringify(tareas.slice(0,10).map(t=>t.name.substring(0,15)))},datasets:[{label:'${_t('time_est')}',data:${JSON.stringify(tareas.slice(0,10).map(t=>t.estimatedTime||0))},borderColor:'#3b82f6',fill:false},{label:'${_t('time_real')}',data:${JSON.stringify(tareas.slice(0,10).map(t=>t.timeLogged||0))},borderColor:'#ef4444',fill:false}]}});<\/script>`;
  abrirVentanaReporte(generarHTMLBase(contenido, _t('time_title'), proyecto.name));
};

// ============================================
// REPORTE 7: CALIDAD (TRADUCIDO)
// ============================================
window.generarReporteCalidad = function() {
  const proyecto = obtenerProyectoActual();
  if (!proyecto) { alert(_t('no_project')); return; }
  const tareas = proyecto.tasks || [];
  const completadas = tareas.filter(t => t.status === 'completed').length;
  const atrasadas = tareas.filter(t => t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed').length;
  const calidadScore = tareas.length > 0 ? Math.max(0, 100 - (atrasadas / tareas.length) * 100 - (tareas.length - completadas) / tareas.length * 20) : 0;
  const defectos = tareas.filter(t => t.progress && t.progress < 100 && (t.timeLogged || 0) > (t.estimatedTime || 0) * 1.2).length;
  const contenido = `<div class="header"><h1>${_t('quality_title')}</h1><p>${escapeHtml(proyecto.name)} • ${_t('quality_subtitle')}</p><div style="margin-top: 16px;"><span style="background: ${calidadScore>=80?'#10b981':calidadScore>=60?'#f59e0b':'#ef4444'}; padding: 6px 20px; border-radius: 30px;">${_t('quality_score')}: ${Math.round(calidadScore)}%</span></div></div>
<div class="kpi-grid"><div class="kpi-card"><div class="kpi-value">${completadas}</div><div>${_t('kpi_completed')}</div></div><div class="kpi-card"><div class="kpi-value">${atrasadas}</div><div>${_t('status_overdue')}</div></div><div class="kpi-card"><div class="kpi-value">${defectos}</div><div>${_t('quality_defects')}</div></div><div class="kpi-card"><div class="kpi-value">${tareas.length}</div><div>${_t('kpi_total')} ${_t('kpi_tasks')}</div></div></div>
<div class="chart-card"><h3>${_t('quality_radar')}</h3><canvas id="calidadChart" style="height: 280px;"></canvas></div>
<div class="table-container"><h3>${_t('quality_issues')}</h3>
<table><thead><tr><th>${_t('sec_task')}</th><th>${_t('time_est')}</th><th>${_t('time_real')}</th><th>${_t('quality_deviation')}</th><th>${_t('sec_status')}</th></tr></thead>
<tbody>${tareas.filter(t => (t.timeLogged||0) > (t.estimatedTime||0)*1.1 && t.status !== 'completed').slice(0,10).map(t => `<tr><td><strong>${escapeHtml(t.name)}</strong></td><td>${t.estimatedTime || 0}h</td><td>${t.timeLogged || 0}h</td><td style="color:#ef4444;">+${(((t.timeLogged||0)/(t.estimatedTime||1)-1)*100).toFixed(0)}%</td><td>${t.status === 'inProgress' ? _t('status_inprogress') : _t('status_pending')}</td></tr>`).join('')}</tbody></table></div>
<div class="recommendations"><h3>${_t('sec_recommendations')}</h3><ul><li>${_t('quality_rec_1')}</li><li>${_t('quality_rec_2')}</li><li>${_t('quality_rec_3')}</li>${atrasadas>0?`<li>${_t('quality_rec_4')}</li>`:''}</ul></div>
<script>new Chart(document.getElementById('calidadChart'),{type:'radar',data:{labels:${JSON.stringify(_t('quality_labels'))},datasets:[{label:'${_t('quality_score_label')}',data:[${Math.round(completadas/tareas.length*100)},${Math.round(calidadScore)},75,80,${Math.max(0,100-(atrasadas/tareas.length*100))}],backgroundColor:'rgba(139,92,246,0.2)',borderColor:'#8b5cf6'}]},options:{scales:{r:{beginAtZero:true,max:100,ticks:{color:'#e2e8f0'}}}}});<\/script>`;
  abrirVentanaReporte(generarHTMLBase(contenido, _t('quality_title'), proyecto.name));
};

// ============================================
// REPORTE 8: BURNDOWN CHART (TRADUCIDO)
// ============================================
window.generarReporteBurndown = function() {
  const proyecto = obtenerProyectoActual();
  if (!proyecto) { alert(_t('no_project')); return; }
  const tareas = proyecto.tasks || [];
  const totalSP = tareas.reduce((s,t) => s + (Number(t.storyPoints) || 1), 0);
  const completadasSP = tareas.filter(t => t.status === 'completed').reduce((s,t) => s + (Number(t.storyPoints) || 1), 0);
  const enProgresoSP = tareas.filter(t => t.status === 'inProgress').reduce((s,t) => s + (Number(t.storyPoints) || 1), 0);
  const ideal = [totalSP, totalSP*0.75, totalSP*0.5, totalSP*0.25, 0];
  const real = [totalSP, totalSP - completadasSP*0.3, totalSP - completadasSP*0.6, totalSP - completadasSP*0.8, totalSP - completadasSP];
  const velocidad = completadasSP / 4;
  const semanasRestantes = completadasSP > 0 ? Math.ceil((totalSP - completadasSP) / velocidad) : 0;
  const contenido = `<div class="header"><h1>${_t('burndown_title')}</h1><p>${escapeHtml(proyecto.name)} • ${_t('burndown_subtitle')}</p><div style="margin-top: 16px;"><span style="background: #10b981; padding: 6px 20px; border-radius: 30px;">${_t('burndown_velocity')}: ${velocidad.toFixed(1)} ${_t('burndown_sp_week')}</span></div></div>
<div class="kpi-grid"><div class="kpi-card"><div class="kpi-value">${totalSP}</div><div>${_t('burndown_total_sp')}</div></div><div class="kpi-card"><div class="kpi-value">${completadasSP}</div><div>${_t('burndown_completed_sp')}</div></div><div class="kpi-card"><div class="kpi-value">${Math.round(completadasSP/totalSP*100)}%</div><div>${_t('kpi_progress')}</div></div><div class="kpi-card"><div class="kpi-value">${semanasRestantes}</div><div>${_t('burndown_weeks_left')}</div></div></div>
<div class="chart-card"><canvas id="burndownChart" style="height: 320px;"></canvas><div style="margin-top: 20px; text-align: center;"><span style="color: #3b82f6;">🔵 ${_t('burndown_ideal')}</span> | <span style="color: #10b981;">🟢 ${_t('burndown_real')}</span></div></div>
<div class="grid-2"><div class="card"><h3>${_t('burndown_velocity_analysis')}</h3><div>${_t('burndown_current_vel')}: <strong>${velocidad.toFixed(1)} ${_t('burndown_sp_week')}</strong></div><div>${_t('burndown_sp_remaining')}: <strong>${totalSP - completadasSP}</strong></div><div>${_t('burndown_estimated_time')}: <strong>${semanasRestantes} ${_t('burndown_weeks')}</strong></div><div class="progress-bar"><div style="width:${Math.min(100, (completadasSP/totalSP)*100)}%;"></div></div></div>
<div class="card"><h3>${_t('burndown_sp_by_status')}</h3><div>${_t('burndown_completed')}: <strong>${completadasSP}</strong></div><div>${_t('burndown_in_progress')}: <strong>${enProgresoSP}</strong></div><div>${_t('burndown_pending')}: <strong>${totalSP - completadasSP - enProgresoSP}</strong></div></div></div>
<div class="recommendations"><h3>${_t('sec_recommendations')}</h3><ul>${completadasSP/totalSP < 0.5 ? `<li>${_t('burndown_rec_slow')}</li>` : `<li>${_t('burndown_rec_good')}</li>`}<li>${_t('burndown_rec_2')}</li><li>${_t('burndown_rec_3')}</li></ul></div>
<script>new Chart(document.getElementById('burndownChart'),{type:'line',data:{labels:['${_t('burndown_start')}','${_t('burndown_week')} 1','${_t('burndown_week')} 2','${_t('burndown_week')} 3','Actual'],datasets:[{label:'${_t('burndown_ideal')}',data:${JSON.stringify(ideal)},borderColor:'#3b82f6',borderDash:[5,5],borderWidth:3,fill:false,pointRadius:0},{label:'${_t('burndown_real')}',data:${JSON.stringify(real)},borderColor:'#10b981',borderWidth:3,fill:false,pointRadius:5,pointBackgroundColor:'#10b981'}]},options:{responsive:true,plugins:{tooltip:{callbacks:{label:ctx=>ctx.dataset.label+': '+ctx.parsed.y+' SP'}}},scales:{y:{beginAtZero:true,title:{display:true,text:'${_t('burndown_sp_remaining_label')}'}}}}});<\/script>`;
  abrirVentanaReporte(generarHTMLBase(contenido, _t('burndown_title'), proyecto.name));
};

// ============================================
// REPORTE 9: RECURSOS (TRADUCIDO)
// ============================================
window.generarReporteRecursos = function() {
  const proyecto = obtenerProyectoActual();
  if (!proyecto) { alert(_t('no_project')); return; }
  const tareas = proyecto.tasks || [];
  const recursos = {};
  tareas.forEach(t => { if(t.assignee) recursos[t.assignee] = (recursos[t.assignee] || 0) + 1; });
  const sobrecargados = Object.entries(recursos).filter(([_,c]) => c > 5).length;
  const contenido = `<div class="header"><h1>${_t('resource_title')}</h1><p>${escapeHtml(proyecto.name)} • ${_t('resource_subtitle')}</p><div style="margin-top: 16px;"><span style="background: #8b5cf6; padding: 6px 20px; border-radius: 30px;">${_t('kpi_members')}: ${Object.keys(recursos).length}</span></div></div>
<div class="kpi-grid"><div class="kpi-card"><div class="kpi-value">${Object.keys(recursos).length}</div><div>${_t('kpi_members')}</div></div><div class="kpi-card"><div class="kpi-value">${tareas.length}</div><div>${_t('kpi_tasks')}</div></div><div class="kpi-card"><div class="kpi-value">${Math.round(tareas.length/Object.keys(recursos).length)}</div><div>${_t('resource_tasks_per')}</div></div><div class="kpi-card"><div class="kpi-value">${sobrecargados}</div><div>${_t('resource_overloaded')}</div></div></div>
<div class="chart-card"><canvas id="recursosChart" style="height: 300px;"></canvas></div>
<div class="table-container"><h3>${_t('resource_load')}</h3><table><thead><tr><th>${_t('cap_resource_col')}</th><th>${_t('kpi_tasks')}</th><th>${_t('kpi_progress')}</th><th>${_t('resource_load_recommendation')}</th></tr></thead><tbody>${Object.entries(recursos).map(([n,c]) => `<tr><td><strong>${escapeHtml(n)}</strong></td><td>${c}</td><td><div class="progress-bar" style="width:100px;"><div style="width:${Math.min(100,c*15)}%;background:${c>5?'#ef4444':c>3?'#f59e0b':'#10b981'};"></div></div>${Math.min(100,c*15)}%</td><td>${c>5?_t('resource_rec_redistribute'):c>3?_t('resource_rec_monitor'):_t('resource_rec_optimal')}</td></tr>`).join('')}</tbody></table></div>
<div class="grid-2"><div class="card"><h3>${_t('sec_recommendations')}</h3><ul><li>${sobrecargados > 0 ? _t('resource_rec_1_over', {count: sobrecargados}) : _t('resource_rec_1_ok')}</li><li>${_t('resource_rec_2')}</li><li>${_t('resource_rec_3')}</li></ul></div>
<div class="card"><h3>${_t('strategy_action_plan')}</h3><ul><li>${_t('resource_plan_1')}</li><li>${_t('resource_plan_2')}</li><li>${_t('resource_plan_3')}</li></ul></div></div>
<script>new Chart(document.getElementById('recursosChart'),{type:'bar',data:{labels:${JSON.stringify(Object.keys(recursos).map(n=>n.split(' ')[0]))},datasets:[{label:'${_t('resource_assigned_tasks')}',data:${JSON.stringify(Object.values(recursos))},backgroundColor:'#8b5cf6',borderRadius:8}]},options:{scales:{y:{beginAtZero:true,title:{display:true,text:'${_t('resource_quantity')}'}}}}});<\/script>`;
  abrirVentanaReporte(generarHTMLBase(contenido, _t('resource_title'), proyecto.name));
};

// ============================================
// REPORTE 10: COSTOS (TRADUCIDO)
// ============================================
window.generarReporteCostos = function() {
  const proyecto = obtenerProyectoActual();
  if (!proyecto) { alert(_t('no_project')); return; }
  const tareas = proyecto.tasks || [];
  const evm = calcularMetricasEVM(tareas);
  const presupuesto = tareas.reduce((s,t)=>s+(Number(t.estimatedTime)||0)*50,0);
  const ejecutado = tareas.reduce((s,t)=>s+(Number(t.timeLogged)||0)*50,0);
  const ahorro = presupuesto - ejecutado;
  const contenido = `<div class="header"><h1>${_t('cost_title')}</h1><p>${escapeHtml(proyecto.name)} • ${_t('cost_subtitle')}</p><div style="margin-top: 16px;"><span style="background: #10b981; padding: 6px 20px; border-radius: 30px;">${_t('cost_budget')}: $${presupuesto.toLocaleString()}</span></div></div>
<div class="kpi-grid"><div class="kpi-card"><div class="kpi-value">$${presupuesto.toLocaleString()}</div><div>${_t('cost_budget')}</div></div><div class="kpi-card"><div class="kpi-value">$${ejecutado.toLocaleString()}</div><div>${_t('cost_executed')}</div></div><div class="kpi-card"><div class="kpi-value">${evm?.CPI.toFixed(2)||_t('na')}</div><div>CPI</div></div><div class="kpi-card"><div class="kpi-value">$${Math.abs(ahorro).toLocaleString()}</div><div>${ahorro>=0?_t('cost_saving'):_t('cost_overrun')}</div></div></div>
<div class="chart-card"><canvas id="costosChart" style="height: 280px;"></canvas></div>
<div class="table-container"><h3>${_t('cost_detail')}</h3><table><thead><tr><th>${_t('sec_task')}</th><th>${_t('cost_estimated')}</th><th>${_t('cost_real')}</th><th>${_t('time_diff')}</th><th>${_t('cost_efficiency')}</th></tr></thead><tbody>${tareas.slice(0,15).map(t => { const est = (Number(t.estimatedTime)||0)*50; const real = (Number(t.timeLogged)||0)*50; return `<tr><td><strong>${escapeHtml(t.name)}</strong></td><td>$${est.toLocaleString()}</td><td>$${real.toLocaleString()}</td><td style="color:${est-real>=0?'#10b981':'#ef4444'};">${est-real>=0?'+':' -'}$${Math.abs(est-real).toLocaleString()}</td><td><div class="progress-bar" style="width:80px;"><div style="width:${Math.min(100, (real/est)*100)}%;background:${real<=est?'#10b981':'#ef4444'};"></div></div>${Math.min(100, Math.round((real/est)*100))}%</td></tr>`}).join('')}</tbody></table></div>
<div class="recommendations"><h3>${_t('sec_recommendations')}</h3><ul><li>${_t('cost_rec_1')}</li>${evm?.CPI<1?`<li>${_t('cost_rec_2')}</li>`:''}<li>${_t('cost_rec_3')}</li><li>${_t('cost_rec_4')}</li></ul></div>
<script>new Chart(document.getElementById('costosChart'),{type:'bar',data:{labels:['${_t('cost_budget')}','${_t('cost_executed')}','${_t('cost_projected')}'],datasets:[{label:'${_t('cost_amount')}',data:[${presupuesto},${ejecutado},${evm?.EAC*50||presupuesto}],backgroundColor:['#3b82f6','#10b981','#f59e0b'],borderRadius:8}]},options:{scales:{y:{beginAtZero:true,ticks:{callback:v=>'$'+v.toLocaleString()}}}}});<\/script>`;
  abrirVentanaReporte(generarHTMLBase(contenido, _t('cost_title'), proyecto.name));
};

// ============================================
// REPORTE 11: HITOS (TRADUCIDO)
// ============================================
window.generarReporteHitos = function() {
  const proyecto = obtenerProyectoActual();
  if (!proyecto) { alert(_t('no_project')); return; }
  const tareas = proyecto.tasks || [];
  const storageKey = `hitos_${proyecto.name}`;
  let hitosGuardados = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if (hitosGuardados.length === 0) hitosGuardados = tareas.map(t => t.id);
  const hitos = tareas.filter(t => hitosGuardados.includes(t.id));
  const totalHitos = hitos.length;
  const getProgress = (t) => {
    if (t.status === 'completed') return 100;
    if (t.progress !== undefined && t.progress > 0) return Number(t.progress);
    const timeLogged = Number(t.timeLogged) || 0;
    const estimatedTime = Number(t.estimatedTime) || 0;
    if (estimatedTime > 0) {
      let progreso = Math.round((timeLogged / estimatedTime) * 100);
      progreso = Math.min(100, Math.max(0, progreso));
      if (timeLogged > 0 && progreso === 0) progreso = Math.max(1, Math.min(100, Math.round((timeLogged / estimatedTime) * 100)));
      return progreso;
    }
    return 0;
  };
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  let completados = 0, enProgreso = 0, atrasados = 0, pendientes = 0;
  hitos.forEach(hito => {
    const fechaVencimiento = hito.deadline ? new Date(hito.deadline) : null;
    const progreso = getProgress(hito);
    const status = hito.status;
    const timeLogged = Number(hito.timeLogged) || 0;
    const estaCompletado = (status === 'completed');
    const estaAtrasadoPorEstado = (status === 'overdue' || status === 'rezagado' || status === 'delayed');
    const estaAtrasadoPorFecha = (fechaVencimiento && fechaVencimiento < hoy);
    const estaAtrasado = !estaCompletado && (estaAtrasadoPorEstado || estaAtrasadoPorFecha);
    const estaEnProgreso = !estaCompletado && !estaAtrasado && (status === 'inProgress' || progreso > 0 || timeLogged > 0);
    const estaPendiente = !estaCompletado && !estaAtrasado && !estaEnProgreso;
    if (estaCompletado) completados++;
    else if (estaAtrasado) atrasados++;
    else if (estaEnProgreso) enProgreso++;
    else if (estaPendiente) pendientes++;
  });
  const checkboxesHTML = tareas.map(t => `
<label style="display: inline-block; margin-right: 15px; margin-bottom: 8px; background: ${hitosGuardados.includes(t.id) ? '#1e293b' : '#0f172a'}; padding: 4px 12px; border-radius: 20px; cursor: pointer;">
<input type="checkbox" value="${t.id}" ${hitosGuardados.includes(t.id) ? 'checked' : ''} style="margin-right: 6px; cursor: pointer;" class="hito-checkbox" data-id="${t.id}">
${escapeHtml(t.name || _t('sec_task'))}
</label>
`).join('');
  const contenido = `
<div class="header">
<h1>${_t('milestone_title')}</h1>
<p>${escapeHtml(proyecto.name)} • ${_t('milestone_subtitle')}</p>
<div style="margin-top: 16px;">
<span style="background: #10b981; padding: 6px 20px; border-radius: 30px;">${_t('milestone_total')}: ${totalHitos}</span>
</div>
</div>
<div style="background: #1e293b; border-radius: 16px; padding: 20px; margin-bottom: 25px;">
<h3 style="margin: 0 0 15px 0; color: #8b5cf6;">${_t('milestone_select')}</h3>
<div style="display: flex; flex-wrap: wrap; gap: 8px; max-height: 200px; overflow-y: auto;">
${checkboxesHTML}
</div>
<div style="margin-top: 15px;">
<button id="btnSeleccionarTodos" style="background: #3b82f6; border: none; padding: 6px 15px; border-radius: 20px; color: white; cursor: pointer; margin-right: 10px;">${_t('milestone_select_all')}</button>
<button id="btnDeseleccionarTodos" style="background: #64748b; border: none; padding: 6px 15px; border-radius: 20px; color: white; cursor: pointer; margin-right: 10px;">${_t('milestone_deselect_all')}</button>
<button id="btnAplicarFiltro" style="background: #10b981; border: none; padding: 8px 20px; border-radius: 20px; color: white; cursor: pointer;">${_t('milestone_apply')}</button>
</div>
</div>
<div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 30px; flex-wrap: wrap;">
<div class="kpi-card" style="min-width: 100px;"><div class="kpi-value">${totalHitos}</div><div>🎯 ${_t('milestone_total')}</div></div>
<div class="kpi-card" style="min-width: 100px;"><div class="kpi-value" style="color:#10b981;">${completados}</div><div>${_t('milestone_completed')}</div></div>
<div class="kpi-card" style="min-width: 100px;"><div class="kpi-value" style="color:#14b8a6;">${enProgreso}</div><div>${_t('milestone_in_progress')}</div></div>
<div class="kpi-card" style="min-width: 100px;"><div class="kpi-value" style="color:#f59e0b;">${pendientes}</div><div>${_t('kpi_pending')}</div></div>
<div class="kpi-card" style="min-width: 100px;"><div class="kpi-value" style="color:#ef4444;">${atrasados}</div><div>${_t('milestone_overdue')}</div></div>
</div>
<div style="max-width: 300px; margin: 0 auto;">
<canvas id="hitosChart" style="height: 200px; width: 100%;"></canvas>
</div>
<div class="table-container">
<h3>${_t('milestone_matrix')}</h3>
<table>
<thead>
<tr><th>Hito</th><th>${_t('sec_status')}</th><th>${_t('sec_deadline')}</th><th>${_t('milestone_responsible')}</th><th>${_t('sec_progress')}</th></tr>
</thead>
<tbody>
${hitos.slice(0,15).map(t => {
const fechaVencimiento = t.deadline ? new Date(t.deadline) : null;
const progreso = getProgress(t);
const status = t.status;
const timeLogged = Number(t.timeLogged) || 0;
const estimatedTime = Number(t.estimatedTime) || 0;
const estaCompletado = (status === 'completed');
const estaAtrasadoPorEstado = (status === 'overdue' || status === 'rezagado' || status === 'delayed');
const estaAtrasadoPorFecha = (fechaVencimiento && fechaVencimiento < hoy);
const estaAtrasado = !estaCompletado && (estaAtrasadoPorEstado || estaAtrasadoPorFecha);
const estaEnProgreso = !estaCompletado && !estaAtrasado && (status === 'inProgress' || progreso > 0 || timeLogged > 0);
let estadoMostrado = '', colorEstado = '';
if (estaCompletado) { estadoMostrado = _t('status_completed'); colorEstado = '#10b981'; }
else if (estaAtrasado) { estadoMostrado = _t('status_overdue'); colorEstado = '#ef4444'; }
else if (estaEnProgreso) { estadoMostrado = _t('status_inprogress'); colorEstado = '#14b8a6'; }
else { estadoMostrado = _t('status_pending'); colorEstado = '#f59e0b'; }
const responsable = t.team || t.assignee || t.asignado || t.responsable || _t('unassigned');
const infoProgreso = (timeLogged > 0 && estimatedTime > 0 && progreso === 0) ? ` (${timeLogged}/${estimatedTime}h)` : '';
return `<tr>
<td><strong>${escapeHtml(t.name || _t('sec_task'))}</strong></td>
<td><span style="background:${colorEstado}; padding:4px 12px; border-radius:20px; font-size:11px; color:white;">${estadoMostrado}</span></td>
<td style="color:${estaAtrasado ? '#ef4444' : '#f59e0b'}">${t.deadline ? new Date(t.deadline).toLocaleDateString() : '-'}${estaAtrasadoPorFecha ? ' ⚠️' : ''}</td>
<td>${escapeHtml(responsable)}</td>
<td>
<div class="progress-bar" style="width:80px; display:inline-block; margin-right:8px;">
<div style="width:${progreso}%; background:#8b5cf6;"></div>
</div>
${progreso}%${infoProgreso}
${progreso === 100 ? ' ✅' : (progreso > 0 ? ' 🚀' : '')}
</td>
</tr>`;
}).join('')}
</tbody>
</table>
</div>
<div class="recommendations">
<h3>${_t('sec_recommendations')}</h3>
<ul>
<li>${_t('milestone_rec_1')}</li>
<li>${_t('milestone_rec_2')}</li>
<li>${_t('milestone_rec_3')}</li>
<li>${_t('milestone_rec_4', {count: atrasados})}</li>
</ul>
</div>
<script>
const storageKey = '${storageKey}';
function guardarYAbrirNuevo() {
const checkboxes = document.querySelectorAll('.hito-checkbox');
const seleccionados = [];
checkboxes.forEach(cb => {
if (cb.checked) seleccionados.push(parseInt(cb.getAttribute('data-id')));
});
localStorage.setItem(storageKey, JSON.stringify(seleccionados));
window.location.reload();
}
document.getElementById('btnSeleccionarTodos')?.addEventListener('click', function() {
document.querySelectorAll('.hito-checkbox').forEach(cb => cb.checked = true);
});
document.getElementById('btnDeseleccionarTodos')?.addEventListener('click', function() {
document.querySelectorAll('.hito-checkbox').forEach(cb => cb.checked = false);
});
document.getElementById('btnAplicarFiltro')?.addEventListener('click', guardarYAbrirNuevo);
const chartData = [];
const chartLabels = [];
const chartColors = [];
if (${completados} > 0) { chartData.push(${completados}); chartLabels.push('${_t('milestone_completed')}'); chartColors.push('#10b981'); }
if (${enProgreso} > 0) { chartData.push(${enProgreso}); chartLabels.push('${_t('milestone_in_progress')}'); chartColors.push('#14b8a6'); }
if (${pendientes} > 0) { chartData.push(${pendientes}); chartLabels.push('${_t('kpi_pending')}'); chartColors.push('#f59e0b'); }
if (${atrasados} > 0) { chartData.push(${atrasados}); chartLabels.push('${_t('milestone_overdue')}'); chartColors.push('#ef4444'); }
new Chart(document.getElementById('hitosChart'),{
type:'doughnut',
data:{ labels: chartLabels, datasets:[{ data: chartData, backgroundColor: chartColors }] },
options:{ cutout:'60%', responsive: true, maintainAspectRatio: true, plugins:{ legend:{ position:'bottom', labels:{color:'#e2e8f0', font:{size:10}} } } }
});
<\/script>`;
  abrirVentanaReporte(generarHTMLBase(contenido, _t('milestone_title'), proyecto.name));
};

// ============================================
// REPORTE 12: COMUNICACIONES (TRADUCIDO)
// ============================================
window.generarReporteComunicaciones = function() {
  const proyecto = obtenerProyectoActual();
  if (!proyecto) { alert(_t('no_project')); return; }
  const tareas = proyecto.tasks || [];
  const stakeholders = [...new Set(tareas.map(t => t.assignee || t.team || t.responsable).filter(Boolean))];
  const canales = ['Email', 'Reunión', 'Dashboard', 'Reporte Semanal', 'WhatsApp'];
  const frecuencias = ['Diaria', 'Semanal', 'Quincenal', 'Mensual'];
  const tieneStakeholders = stakeholders.length > 0;
  const storageKey = `comunicaciones_${proyecto.name}`;
  let configuraciones = JSON.parse(localStorage.getItem(storageKey) || '{}');
  stakeholders.forEach(s => {
    if (!configuraciones[s]) configuraciones[s] = { canal: canales[0], frecuencia: frecuencias[1] };
  });
  localStorage.setItem(storageKey, JSON.stringify(configuraciones));
  const canalCounts = {};
  const frecuenciaCounts = {};
  canales.forEach(c => canalCounts[c] = 0);
  frecuencias.forEach(f => frecuenciaCounts[f] = 0);
  stakeholders.forEach(s => {
    const config = configuraciones[s];
    canalCounts[config.canal]++;
    frecuenciaCounts[config.frecuencia]++;
  });
  const canalData = canales.map(c => canalCounts[c]);
  const frecuenciaData = frecuencias.map(f => frecuenciaCounts[f]);
  const tablaFilas = stakeholders.map((s, i) => {
    const config = configuraciones[s];
    const canalActual = config.canal;
    const frecuenciaActual = config.frecuencia;
    let colorCanal = '#3b82f6';
    if (canalActual === 'Email') colorCanal = '#3b82f6';
    else if (canalActual === 'Reunión') colorCanal = '#ef4444';
    else if (canalActual === 'Dashboard') colorCanal = '#10b981';
    else if (canalActual === 'Reporte Semanal') colorCanal = '#f59e0b';
    else colorCanal = '#8b5cf6';
    let colorFrecuencia = '#f59e0b';
    if (frecuenciaActual === 'Diaria') colorFrecuencia = '#ef4444';
    else if (frecuenciaActual === 'Semanal') colorFrecuencia = '#f59e0b';
    else if (frecuenciaActual === 'Quincenal') colorFrecuencia = '#10b981';
    else colorFrecuencia = '#3b82f6';
    const canalOptions = canales.map(c => `<option value="${c}" ${c === canalActual ? 'selected' : ''}>${c}</option>`).join('');
    const frecuenciaOptions = frecuencias.map(f => `<option value="${f}" ${f === frecuenciaActual ? 'selected' : ''}>${f}</option>`).join('');
    return `
<tr style="border-bottom: 1px solid #334155;">
<td style="padding: 12px;"><strong style="color: white;">${escapeHtml(s)}</strong></td>
<td style="padding: 12px;">
<select class="canal-select" data-stakeholder="${escapeHtml(s).replace(/"/g, '&quot;')}" style="background: ${colorCanal}; color: white; border: none; padding: 6px 12px; border-radius: 20px; cursor: pointer; font-size: 12px;">
${canalOptions}
</select>
</td>
<td style="padding: 12px;">
<select class="frecuencia-select" data-stakeholder="${escapeHtml(s).replace(/"/g, '&quot;')}" style="background: ${colorFrecuencia}; color: white; border: none; padding: 6px 12px; border-radius: 20px; cursor: pointer; font-size: 12px;">
${frecuenciaOptions}
</select>
</td>
<td style="padding: 12px; color: #94a3b8;">${_t('comm_pm_office')}</td>
<td style="padding: 12px;"><span style="background: #1e3a8a; padding: 4px 12px; border-radius: 20px; font-size: 11px; color: white;">${i % 2 === 0 ? _t('comm_exec_summary') : _t('comm_detailed_report')}</span></td>
</tr>
`;
  }).join('');
  const contenido = `
<div class="header">
<h1>${_t('comm_title')}</h1>
<p>${escapeHtml(proyecto.name)} • ${_t('comm_subtitle')}</p>
<div style="margin-top: 16px;">
<span style="background: #3b82f6; padding: 6px 20px; border-radius: 30px;">${_t('comm_stakeholders')}: ${stakeholders.length}</span>
</div>
</div>
<div class="kpi-grid">
<div class="kpi-card"><div class="kpi-value">${stakeholders.length}</div><div>👥 ${_t('comm_stakeholders')}</div></div>
<div class="kpi-card"><div class="kpi-value">${canales.length}</div><div>📡 ${_t('comm_channels')}</div></div>
<div class="kpi-card"><div class="kpi-value">4</div><div>📅 ${_t('comm_frequencies')}</div></div>
<div class="kpi-card"><div class="kpi-value">100%</div><div>📊 ${_t('comm_coverage')}</div></div>
</div>
<div class="grid-2">
<div class="chart-card"><h3>${_t('comm_channel_chart')}</h3><canvas id="canalesChart" style="height: 250px; width: 100%;"></canvas></div>
<div class="chart-card"><h3>${_t('comm_freq_chart')}</h3><canvas id="frecuenciaChart" style="height: 250px; width: 100%;"></canvas></div>
</div>
<div class="table-container">
<h3>${_t('comm_matrix')}</h3>
${tieneStakeholders ? `
<p style="color: #94a3b8; font-size: 12px; margin-bottom: 15px;">${_t('comm_hint')}</p>
<table style="width:100%; border-collapse: collapse; background: #1e293b; border-radius: 16px; overflow: hidden;">
<thead>
<tr style="background: #0f172a;">
<th style="padding: 14px; text-align: left; color: #8b5cf6;">${_t('comm_stakeholder_col')}</th>
<th style="padding: 14px; text-align: left; color: #8b5cf6;">${_t('comm_channel_col')}</th>
<th style="padding: 14px; text-align: left; color: #8b5cf6;">${_t('comm_freq_col')}</th>
<th style="padding: 14px; text-align: left; color: #8b5cf6;">${_t('comm_owner_col')}</th>
<th style="padding: 14px; text-align: left; color: #8b5cf6;">${_t('comm_format_col')}</th>
</tr>
</thead>
<tbody>${tablaFilas}</tbody>
</table>
` : `
<div style="text-align: center; padding: 40px; background: #1e293b; border-radius: 16px;">
<p style="color: #94a3b8;">${_t('comm_no_stakeholders')}</p>
<p style="color: #64748b; font-size: 12px; margin-top: 8px;">${_t('comm_no_stakeholders_hint')}</p>
</div>
`}
</div>
<div class="recommendations">
<h3>${_t('sec_recommendations')}</h3>
<ul>
<li>${_t('comm_rec_1')}</li>
<li>${_t('comm_rec_2')}</li>
<li>${_t('comm_rec_3')}</li>
<li>${_t('comm_rec_4')}</li>
</ul>
</div>
<script>
const storageKey = '${storageKey}';
const stakeholdersList = ${JSON.stringify(stakeholders)};
const canalesList = ${JSON.stringify(canales)};
const frecuenciasList = ${JSON.stringify(frecuencias)};
function actualizarGraficas() {
const config = JSON.parse(localStorage.getItem(storageKey) || '{}');
const canalData = canalesList.map(c => stakeholdersList.filter(s => (config[s]?.canal || 'Email') === c).length);
const frecuenciaData = frecuenciasList.map(f => stakeholdersList.filter(s => (config[s]?.frecuencia || 'Semanal') === f).length);
if (window.canalesChart) { window.canalesChart.data.datasets[0].data = canalData; window.canalesChart.update(); }
if (window.frecuenciaChart) { window.frecuenciaChart.data.datasets[0].data = frecuenciaData; window.frecuenciaChart.update(); }
}
window.canalesChart = new Chart(document.getElementById('canalesChart'), {
type: 'bar',
data: { labels: canalesList, datasets: [{ label: '${_t('comm_stakeholders')}', data: ${JSON.stringify(canalData)}, backgroundColor: '#8b5cf6', borderRadius: 8 }] },
options: { responsive: true, maintainAspectRatio: true, scales: { y: { beginAtZero: true, ticks: { stepSize: 1, color: '#cbd5e1' } }, x: { ticks: { color: '#cbd5e1' } } } }
});
window.frecuenciaChart = new Chart(document.getElementById('frecuenciaChart'), {
type: 'pie',
data: { labels: frecuenciasList, datasets: [{ data: ${JSON.stringify(frecuenciaData)}, backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'] }] },
options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'bottom', labels: { color: '#e2e8f0' } } } }
});
document.querySelectorAll('.canal-select').forEach(select => {
select.addEventListener('change', function(e) {
const stakeholder = this.getAttribute('data-stakeholder');
const nuevoCanal = this.value;
let config = JSON.parse(localStorage.getItem(storageKey) || '{}');
if (!config[stakeholder]) config[stakeholder] = {};
config[stakeholder].canal = nuevoCanal;
localStorage.setItem(storageKey, JSON.stringify(config));
let color = '#3b82f6';
if (nuevoCanal === 'Email') color = '#3b82f6';
else if (nuevoCanal === 'Reunión') color = '#ef4444';
else if (nuevoCanal === 'Dashboard') color = '#10b981';
else if (nuevoCanal === 'Reporte Semanal') color = '#f59e0b';
else color = '#8b5cf6';
this.style.backgroundColor = color;
actualizarGraficas();
});
});
document.querySelectorAll('.frecuencia-select').forEach(select => {
select.addEventListener('change', function(e) {
const stakeholder = this.getAttribute('data-stakeholder');
const nuevaFrecuencia = this.value;
let config = JSON.parse(localStorage.getItem(storageKey) || '{}');
if (!config[stakeholder]) config[stakeholder] = {};
config[stakeholder].frecuencia = nuevaFrecuencia;
localStorage.setItem(storageKey, JSON.stringify(config));
let color = '#f59e0b';
if (nuevaFrecuencia === 'Diaria') color = '#ef4444';
else if (nuevaFrecuencia === 'Semanal') color = '#f59e0b';
else if (nuevaFrecuencia === 'Quincenal') color = '#10b981';
else color = '#3b82f6';
this.style.backgroundColor = color;
actualizarGraficas();
});
});
<\/script>`;
  abrirVentanaReporte(generarHTMLBase(contenido, _t('comm_title'), proyecto.name));
};

// ============================================
// REPORTE 13: LECCIONES APRENDIDAS (TRADUCIDO)
// ============================================
window.generarReporteLecciones = function() {
  const proyecto = obtenerProyectoActual();
  if (!proyecto) { alert(_t('no_project')); return; }
  const tareas = proyecto.tasks || [];
  const totalTareas = tareas.length;
  const completadas = tareas.filter(t => t.status === 'completed' || t.progress === 100).length;
  const tasaExito = totalTareas > 0 ? Math.round((completadas / totalTareas) * 100) : 0;
  const leccionesPositivas = tareas.filter(t => (t.status === 'completed' || t.progress === 100) && (t.timeLogged || 0) <= (t.estimatedTime || 0) * 1.1).slice(0, 8);
  const leccionesMejora = tareas.filter(t => (t.status === 'overdue' || t.status === 'rezagado') || ((t.timeLogged || 0) > (t.estimatedTime || 0) * 1.2 && (t.estimatedTime || 0) > 0)).slice(0, 8);
  const riesgos = tareas.filter(t => t.critical === true || t.priority === 'alta' || t.priority === 'high');
  const riesgoMitigado = riesgos.filter(t => t.status === 'completed').length;
  const tareasCriticas = tareas.filter(t => t.critical === true);
  const criticasCompletadas = tareasCriticas.filter(t => t.status === 'completed').length;
  const totalEstimado = tareas.reduce((s, t) => s + (Number(t.estimatedTime) || 0), 0);
  const totalReal = tareas.reduce((s, t) => s + (Number(t.timeLogged) || 0), 0);
  const precisionEstimacion = totalEstimado > 0 ? Math.round((totalReal / totalEstimado) * 100) : 0;
  const topTareas = [...tareas].filter(t => t.status === 'completed' && (t.estimatedTime || 0) > 0 && (t.timeLogged || 0) > 0).sort((a, b) => (a.timeLogged / a.estimatedTime) - (b.timeLogged / b.estimatedTime)).slice(0, 5);
  const contenido = `
<div class="header" style="background: linear-gradient(135deg, #0f172a, #1e293b);">
<h1 style="font-size: 32px;">${_t('lessons_title')}</h1>
<p style="font-size: 16px; opacity: 0.9;">${escapeHtml(proyecto.name)} • ${_t('lessons_subtitle')}</p>
<div style="margin-top: 20px; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
<span style="background: #10b981; padding: 8px 24px; border-radius: 40px; font-weight: bold;">📊 ${_t('lessons_success_rate')}: ${tasaExito}%</span>
<span style="background: #3b82f6; padding: 8px 24px; border-radius: 40px; font-weight: bold;">📋 ${_t('kpi_total')} ${_t('kpi_tasks')}: ${totalTareas}</span>
<span style="background: #f59e0b; padding: 8px 24px; border-radius: 40px; font-weight: bold;">✅ ${_t('kpi_completed')}: ${completadas}</span>
</div>
</div>
<div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; margin-bottom: 30px;">
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #10b981;">${leccionesPositivas.length}</div><div>${_t('lessons_success')}</div><div style="font-size: 10px; color: #64748b;">${_t('lessons_practices')}</div></div>
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #f59e0b;">${leccionesMejora.length}</div><div>${_t('lessons_improvement')}</div><div style="font-size: 10px; color: #64748b;">${_t('lessons_opportunities')}</div></div>
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #8b5cf6;">${riesgos.length}</div><div>${_t('lessons_risks_identified')}</div><div style="font-size: 10px; color: #64748b;">${_t('lessons_mitigated')}: ${riesgoMitigado}</div></div>
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #3b82f6;">${precisionEstimacion}%</div><div>${_t('lessons_est_precision')}</div><div style="font-size: 10px; color: #64748b;">${_t('lessons_real_vs_est')}</div></div>
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #06b6d4;">${tareasCriticas.length}</div><div>${_t('lessons_critical_tasks')}</div><div style="font-size: 10px; color: #64748b;">${_t('lessons_completed')}: ${criticasCompletadas}</div></div>
</div>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 25px; margin-bottom: 30px;">
<div class="chart-card" style="background: #1e293b; border-radius: 20px; padding: 20px;"><h3 style="color: #8b5cf6; margin-bottom: 20px;">${_t('lessons_performance')}</h3><canvas id="rendimientoChart" style="height: 200px;"></canvas></div>
<div class="chart-card" style="background: #1e293b; border-radius: 20px; padding: 20px;"><h3 style="color: #8b5cf6; margin-bottom: 20px;">${_t('lessons_success_by_priority')}</h3><canvas id="prioridadChart" style="height: 200px;"></canvas></div>
</div>
<div class="card" style="background: linear-gradient(135deg, #064e3b, #065f46); border-radius: 20px; padding: 25px; margin-bottom: 25px;">
<h3 style="color: #10b981; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;"><span style="font-size: 28px;">✅</span> ${_t('lessons_what_worked')}</h3>
<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 12px;">
${leccionesPositivas.map(t => `
<div style="background: rgba(255,255,255,0.1); border-radius: 12px; padding: 15px; border-left: 4px solid #10b981;">
<div style="font-weight: bold; color: white; margin-bottom: 8px;">📌 ${escapeHtml(t.name)}</div>
<div style="display: flex; justify-content: space-between; font-size: 12px; color: #94a3b8;">
<span>📊 ${_t('sec_progress')}: ${t.progress || 100}%</span>
<span>⏱️ ${_t('time_est')}: ${t.estimatedTime || 0}h</span>
<span>✅ ${_t('time_real')}: ${t.timeLogged || 0}h</span>
</div>
<div style="font-size: 11px; color: #10b981; margin-top: 8px;">${_t('lessons_lesson_plan')}</div>
</div>
`).join('')}
${leccionesPositivas.length === 0 ? `<div style="color: #94a3b8; text-align: center; padding: 20px;">${_t('lessons_consistent')}</div>` : ''}
</div>
</div>
<div class="card" style="background: linear-gradient(135deg, #78350f, #92400e); border-radius: 20px; padding: 25px; margin-bottom: 25px;">
<h3 style="color: #f59e0b; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;"><span style="font-size: 28px;">⚠️</span> ${_t('lessons_to_improve')}</h3>
<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 12px;">
${leccionesMejora.map(t => {
const estimado = t.estimatedTime || 0;
const real = t.timeLogged || 0;
const desviacion = estimado > 0 ? Math.round(((real - estimado) / estimado) * 100) : 0;
return `
<div style="background: rgba(255,255,255,0.1); border-radius: 12px; padding: 15px; border-left: 4px solid #f59e0b;">
<div style="font-weight: bold; color: white; margin-bottom: 8px;">📌 ${escapeHtml(t.name)}</div>
<div style="display: flex; justify-content: space-between; font-size: 12px; color: #94a3b8;">
<span>📊 ${_t('sec_progress')}: ${t.progress || 0}%</span>
<span>⏱️ ${_t('time_est')}: ${estimado}h</span>
<span>⚠️ ${_t('time_real')}: ${real}h</span>
</div>
<div style="font-size: 11px; color: #f59e0b; margin-top: 8px;">${_t('lessons_lesson_est')} (${desviacion > 0 ? '+' : ''}${desviacion}% ${_t('lessons_deviation')})</div>
</div>
`;
}).join('')}
${leccionesMejora.length === 0 ? `<div style="color: #94a3b8; text-align: center; padding: 20px;">${_t('lessons_no_critical')}</div>` : ''}
</div>
</div>
<div class="card" style="background: #1e293b; border-radius: 20px; padding: 25px; margin-bottom: 25px;">
<h3 style="color: #8b5cf6; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;"><span style="font-size: 28px;">🏆</span> ${_t('lessons_top_performers')}</h3>
<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 12px;">
${topTareas.map(t => {
const eficiencia = t.estimatedTime > 0 ? Math.round((t.estimatedTime / t.timeLogged) * 100) : 100;
return `
<div style="background: rgba(139, 92, 246, 0.2); border-radius: 12px; padding: 15px; text-align: center;">
<div style="font-weight: bold; color: white;">${escapeHtml(t.name)}</div>
<div style="font-size: 24px; color: #10b981; margin: 8px 0;">${eficiencia}%</div>
<div style="font-size: 11px; color: #94a3b8;">${_t('lessons_efficiency_vs_est')}</div>
</div>
`;
}).join('')}
${topTareas.length === 0 ? `<div style="color: #94a3b8; text-align: center; padding: 20px;">${_t('lessons_no_top')}</div>` : ''}
</div>
</div>
<div class="recommendations" style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 20px; padding: 25px; margin-top: 25px;">
<h3 style="color: #8b5cf6; margin-bottom: 20px;">${_t('lessons_rec_title')}</h3>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
<div style="background: rgba(16, 185, 129, 0.1); border-radius: 12px; padding: 15px;">
<div style="color: #10b981; font-weight: bold; margin-bottom: 10px;">${_t('lessons_continue')}</div>
<ul style="margin-left: 20px; color: #cbd5e1;">
<li>${_t('lessons_continue_1')}</li>
<li>${_t('lessons_continue_2')}</li>
<li>${_t('lessons_continue_3')}</li>
</ul>
</div>
<div style="background: rgba(245, 158, 11, 0.1); border-radius: 12px; padding: 15px;">
<div style="color: #f59e0b; font-weight: bold; margin-bottom: 10px;">${_t('lessons_improve')}</div>
<ul style="margin-left: 20px; color: #cbd5e1;">
<li>${_t('lessons_improve_1')}</li>
<li>${_t('lessons_improve_2')}</li>
<li>${_t('lessons_improve_3')}</li>
</ul>
</div>
<div style="background: rgba(59, 130, 246, 0.1); border-radius: 12px; padding: 15px;">
<div style="color: #3b82f6; font-weight: bold; margin-bottom: 10px;">${_t('lessons_new_init')}</div>
<ul style="margin-left: 20px; color: #cbd5e1;">
<li>${_t('lessons_new_init_1')}</li>
<li>${_t('lessons_new_init_2')}</li>
<li>${_t('lessons_new_init_3')}</li>
</ul>
</div>
<div style="background: rgba(139, 92, 246, 0.1); border-radius: 12px; padding: 15px;">
<div style="color: #8b5cf6; font-weight: bold; margin-bottom: 10px;">${_t('lessons_metrics')}</div>
<ul style="margin-left: 20px; color: #cbd5e1;">
<li>${_t('lessons_metrics_1')}</li>
<li>${_t('lessons_metrics_2')}</li>
<li>${_t('lessons_metrics_3')}</li>
</ul>
</div>
</div>
</div>
<div style="margin-top: 25px; padding: 20px; background: #0f172a; border-radius: 16px; text-align: center;">
<p style="color: #64748b; font-size: 12px;">
<strong>${_t('lessons_confidentiality')}</strong> ${_t('lessons_conf_text')}<br>
<strong>${_t('lessons_methodology')}</strong> ${_t('lessons_method_text')}<br>
<em>${_t('lessons_auto_gen')}</em>
</p>
</div>
<script>
new Chart(document.getElementById('rendimientoChart'), {
type: 'doughnut',
data: {
labels: ['${_t('lessons_successful')}', '${_t('lessons_improvement')}', '${_t('lessons_pending_crit')}'],
datasets: [{ data: [${leccionesPositivas.length}, ${leccionesMejora.length}, ${totalTareas - completadas}], backgroundColor: ['#10b981', '#f59e0b', '#ef4444'], borderWidth: 0 }]
},
options: { responsive: true, maintainAspectRatio: true, cutout: '60%', plugins: { legend: { position: 'bottom', labels: { color: '#e2e8f0' } } } }
});
const tareasAlta = ${tareas.filter(t => t.priority === 'alta' || t.priority === 'high').length};
const tareasMedia = ${tareas.filter(t => t.priority === 'media' || t.priority === 'medium').length};
const tareasBaja = ${tareas.filter(t => t.priority === 'baja' || t.priority === 'low').length};
new Chart(document.getElementById('prioridadChart'), {
type: 'bar',
data: {
labels: ['${_t('priority_high')}', '${_t('priority_medium')}', '${_t('priority_low')}'],
datasets: [{ label: '${_t('lessons_quantity')}', data: [tareasAlta, tareasMedia, tareasBaja], backgroundColor: ['#ef4444', '#f59e0b', '#10b981'], borderRadius: 8 }]
},
options: { responsive: true, maintainAspectRatio: true, scales: { y: { beginAtZero: true, ticks: { stepSize: 1, color: '#cbd5e1' } }, x: { ticks: { color: '#cbd5e1' } } }, plugins: { legend: { labels: { color: '#e2e8f0' } } } }
});
</script>`;
  abrirVentanaReporte(generarHTMLBase(contenido, _t('lessons_title'), proyecto.name));
};

// ============================================
// REPORTE 14: STAKEHOLDERS (TRADUCIDO)
// ============================================
window.generarReporteStakeholders = function() {
  const proyecto = obtenerProyectoActual();
  if (!proyecto) { alert(_t('no_project')); return; }
  const tareas = proyecto.tasks || [];
  const stakeholdersMap = new Map();
  tareas.forEach(t => {
    const nombreStakeholder = t.assignee || t.team || t.responsable;
    if (!nombreStakeholder) return;
    if (!stakeholdersMap.has(nombreStakeholder)) {
      stakeholdersMap.set(nombreStakeholder, { nombre: nombreStakeholder, tareas: 0, completadas: 0, enProgreso: 0, pendientes: 0, atrasadas: 0, influencia: 'Media', interes: 'Medio' });
    }
    const s = stakeholdersMap.get(nombreStakeholder);
    s.tareas++;
    if (t.status === 'completed' || t.progress === 100) s.completadas++;
    else if (t.status === 'inProgress' || (t.progress > 0 && t.progress < 100)) s.enProgreso++;
    else if (t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed') s.atrasadas++;
    else s.pendientes++;
  });
  const storageKey = `stakeholders_config_${proyecto.name}`;
  let configuraciones = JSON.parse(localStorage.getItem(storageKey) || '{}');
  const stakeholders = Array.from(stakeholdersMap.values()).map(s => {
    if (configuraciones[s.nombre]) {
      s.influencia = configuraciones[s.nombre].influencia || s.influencia;
      s.interes = configuraciones[s.nombre].interes || s.interes;
    } else {
      const tasaExito = s.tareas > 0 ? (s.completadas / s.tareas) * 100 : 0;
      if (s.tareas >= 3 || tasaExito > 80) s.influencia = 'Alta';
      else if (s.tareas >= 2) s.influencia = 'Media';
      else s.influencia = 'Baja';
      if (s.atrasadas > 0 || s.pendientes > 2) s.interes = 'Alto';
      else if (s.enProgreso > 0) s.interes = 'Medio';
      else s.interes = 'Bajo';
    }
    if (s.influencia === 'Alta' && s.interes === 'Alto') s.estrategia = _t('sh_strategy_close');
    else if (s.influencia === 'Alta') s.estrategia = _t('sh_strategy_informed');
    else if (s.interes === 'Alto') s.estrategia = _t('sh_strategy_satisfied');
    else s.estrategia = _t('sh_strategy_monitor');
    return s;
  });
  const totalStakeholders = stakeholders.length;
  const altaInfluencia = stakeholders.filter(s => s.influencia === 'Alta').length;
  const altoInteres = stakeholders.filter(s => s.interes === 'Alto').length;
  const stakeholdersClave = stakeholders.filter(s => s.influencia === 'Alta' && s.interes === 'Alto').length;
  const influenciaData = [stakeholders.filter(s => s.influencia === 'Alta').length, stakeholders.filter(s => s.influencia === 'Media').length, stakeholders.filter(s => s.influencia === 'Baja').length];
  const interesData = [stakeholders.filter(s => s.interes === 'Alto').length, stakeholders.filter(s => s.interes === 'Medio').length, stakeholders.filter(s => s.interes === 'Bajo').length];
  const influenciaOptions = ['Alta', 'Media', 'Baja'];
  const interesOptions = ['Alto', 'Medio', 'Bajo'];
  const contenido = `
<div class="header" style="background: linear-gradient(135deg, #0f172a, #1e293b);">
<h1 style="font-size: 32px;">${_t('sh_title')}</h1>
<p style="font-size: 16px; opacity: 0.9;">${escapeHtml(proyecto.name)} • ${_t('sh_subtitle')}</p>
<div style="margin-top: 20px; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
<span style="background: #8b5cf6; padding: 8px 24px; border-radius: 40px; font-weight: bold;">👥 ${_t('sh_total')}: ${totalStakeholders}</span>
<span style="background: #ef4444; padding: 8px 24px; border-radius: 40px; font-weight: bold;">${_t('sh_high_influence')}: ${altaInfluencia}</span>
<span style="background: #10b981; padding: 8px 24px; border-radius: 40px; font-weight: bold;">${_t('sh_high_interest')}: ${altoInteres}</span>
<span style="background: #f59e0b; padding: 8px 24px; border-radius: 40px; font-weight: bold;">${_t('sh_key')}: ${stakeholdersClave}</span>
</div>
</div>
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px;">
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #8b5cf6;">${totalStakeholders}</div><div>${_t('sh_total')} Stakeholders</div></div>
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #ef4444;">${altaInfluencia}</div><div>${_t('sh_high_influence')}</div></div>
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #10b981;">${altoInteres}</div><div>${_t('sh_high_interest')}</div></div>
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #f59e0b;">${stakeholdersClave}</div><div>${_t('sh_key')}</div></div>
</div>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 25px; margin-bottom: 30px;">
<div class="chart-card" style="background: #1e293b; border-radius: 20px; padding: 20px;"><h3 style="color: #8b5cf6; margin-bottom: 15px;">${_t('sh_influence_dist')}</h3><canvas id="influenciaChart" style="height: 220px; width: 100%;"></canvas></div>
<div class="chart-card" style="background: #1e293b; border-radius: 20px; padding: 20px;"><h3 style="color: #8b5cf6; margin-bottom: 15px;">${_t('sh_interest_dist')}</h3><canvas id="interesChart" style="height: 220px; width: 100%;"></canvas></div>
</div>
<div class="table-container" style="background: #1e293b; border-radius: 20px; padding: 25px; margin-bottom: 30px;">
<h3 style="color: #8b5cf6; margin-bottom: 20px;">${_t('sh_matrix')}</h3>
<p style="color: #94a3b8; font-size: 12px; margin-bottom: 15px;">${_t('sh_hint')}</p>
<table style="width:100%; border-collapse: collapse;">
<thead>
<tr style="background: #0f172a;">
<th style="padding: 14px; text-align: left; color: #8b5cf6;">👤 Stakeholder</th>
<th style="padding: 14px; text-align: center; color: #8b5cf6;">${_t('sh_influence_col')}</th>
<th style="padding: 14px; text-align: center; color: #8b5cf6;">${_t('sh_interest_col')}</th>
<th style="padding: 14px; text-align: left; color: #8b5cf6;">${_t('sh_strategy_col')}</th>
<th style="padding: 14px; text-align: center; color: #8b5cf6;">📊 ${_t('kpi_tasks')}</th>
</tr>
</thead>
<tbody>
${stakeholders.map(s => {
let colorInfluencia = s.influencia === 'Alta' ? '#ef4444' : (s.influencia === 'Media' ? '#f59e0b' : '#10b981');
let colorInteres = s.interes === 'Alto' ? '#ef4444' : (s.interes === 'Medio' ? '#f59e0b' : '#10b981');
const influenciaOptionsHtml = influenciaOptions.map(opt => `<option value="${opt}" ${opt === s.influencia ? 'selected' : ''}>${opt}</option>`).join('');
const interesOptionsHtml = interesOptions.map(opt => `<option value="${opt}" ${opt === s.interes ? 'selected' : ''}>${opt}</option>`).join('');
const nombreId = s.nombre.replace(/[^a-zA-Z0-9]/g, '_');
return `
<tr style="border-bottom: 1px solid #334155;">
<td style="padding: 14px;"><strong style="color: white;">${escapeHtml(s.nombre)}</strong></td>
<td style="padding: 14px; text-align: center;">
<select class="influencia-select" data-nombre="${escapeHtml(s.nombre).replace(/"/g, '&quot;')}" style="background: ${colorInfluencia}; color: white; border: none; padding: 6px 12px; border-radius: 20px; cursor: pointer; font-size: 12px;">
${influenciaOptionsHtml}
</select>
</td>
<td style="padding: 14px; text-align: center;">
<select class="interes-select" data-nombre="${escapeHtml(s.nombre).replace(/"/g, '&quot;')}" style="background: ${colorInteres}; color: white; border: none; padding: 6px 12px; border-radius: 20px; cursor: pointer; font-size: 12px;">
${interesOptionsHtml}
</select>
</td>
<td style="padding: 14px; color: #94a3b8;" class="estrategia-${nombreId}">${s.estrategia}</td>
<td style="padding: 14px; text-align: center;"><span style="background: #1e3a8a; padding: 4px 12px; border-radius: 20px; font-size: 11px;">✅ ${s.completadas}/${s.tareas}</span></td>
</tr>
`;
}).join('')}
</tbody>
</table>
</div>
<div class="recommendations" style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 20px; padding: 25px;">
<h3 style="color: #8b5cf6; margin-bottom: 20px;">${_t('sec_recommendations')}</h3>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
<div style="background: rgba(239, 68, 68, 0.1); border-radius: 12px; padding: 15px;">
<div style="color: #ef4444; font-weight: bold;">${_t('sh_priority_mgmt')}</div>
<div style="font-size: 12px; color: #cbd5e1; margin-top: 8px;">${_t('sh_priority_desc', {count: stakeholdersClave})}</div>
</div>
<div style="background: rgba(245, 158, 11, 0.1); border-radius: 12px; padding: 15px;">
<div style="color: #f59e0b; font-weight: bold;">${_t('sh_effective_comm')}</div>
<div style="font-size: 12px; color: #cbd5e1; margin-top: 8px;">${_t('sh_effective_desc', {count: altaInfluencia})}</div>
</div>
<div style="background: rgba(16, 185, 129, 0.1); border-radius: 12px; padding: 15px;">
<div style="color: #10b981; font-weight: bold;">${_t('sh_satisfaction')}</div>
<div style="font-size: 12px; color: #cbd5e1; margin-top: 8px;">${_t('sh_satisfaction_desc', {count: altoInteres})}</div>
</div>
<div style="background: rgba(139, 92, 246, 0.1); border-radius: 12px; padding: 15px;">
<div style="color: #8b5cf6; font-weight: bold;">${_t('sh_monitoring')}</div>
<div style="font-size: 12px; color: #cbd5e1; margin-top: 8px;">${_t('sh_monitoring_desc')}</div>
</div>
</div>
</div>
<div style="margin-top: 25px; padding: 20px; background: #0f172a; border-radius: 16px; text-align: center;">
<p style="color: #64748b; font-size: 12px;">
<strong>${_t('sh_confidentiality')}</strong> ${_t('sh_conf_text')}<br>
<strong>${_t('sh_methodology')}</strong> ${_t('sh_method_text')}<br>
<em>${_t('lessons_auto_gen')}</em>
</p>
</div>
<script>
const storageKey = '${storageKey}';
function actualizarEstrategia(fila, nombreStakeholder, influencia, interes) {
let estrategia = '';
if (influencia === 'Alta' && interes === 'Alto') estrategia = '${_t('sh_strategy_close')}';
else if (influencia === 'Alta') estrategia = '${_t('sh_strategy_informed')}';
else if (interes === 'Alto') estrategia = '${_t('sh_strategy_satisfied')}';
else estrategia = '${_t('sh_strategy_monitor')}';
const nombreId = nombreStakeholder.replace(/[^a-zA-Z0-9]/g, '_');
const estrategiaCell = fila.querySelector('.estrategia-' + nombreId);
if (estrategiaCell) estrategiaCell.innerText = estrategia;
}
function guardarConfiguracion() {
const config = {};
document.querySelectorAll('.influencia-select').forEach(select => {
const nombreStakeholder = select.getAttribute('data-nombre');
if (!config[nombreStakeholder]) config[nombreStakeholder] = {};
config[nombreStakeholder].influencia = select.value;
});
document.querySelectorAll('.interes-select').forEach(select => {
const nombreStakeholder = select.getAttribute('data-nombre');
if (!config[nombreStakeholder]) config[nombreStakeholder] = {};
config[nombreStakeholder].interes = select.value;
});
localStorage.setItem(storageKey, JSON.stringify(config));
actualizarGraficas();
}
function actualizarGraficas() {
const config = JSON.parse(localStorage.getItem(storageKey) || '{}');
const stakeholdersList = ${JSON.stringify(stakeholders.map(s => s.nombre))};
let altaInf = 0, mediaInf = 0, bajaInf = 0;
let altoInt = 0, medioInt = 0, bajoInt = 0;
stakeholdersList.forEach(nombreStakeholder => {
const inf = config[nombreStakeholder]?.influencia || 'Media';
const int = config[nombreStakeholder]?.interes || 'Medio';
if (inf === 'Alta') altaInf++;
else if (inf === 'Media') mediaInf++;
else bajaInf++;
if (int === 'Alto') altoInt++;
else if (int === 'Medio') medioInt++;
else bajoInt++;
});
if (window.influenciaChart) { window.influenciaChart.data.datasets[0].data = [altaInf, mediaInf, bajaInf]; window.influenciaChart.update(); }
if (window.interesChart) { window.interesChart.data.datasets[0].data = [altoInt, medioInt, bajoInt]; window.interesChart.update(); }
}
document.querySelectorAll('.influencia-select, .interes-select').forEach(select => {
select.addEventListener('change', function() {
const fila = this.closest('tr');
const nombreStakeholder = this.getAttribute('data-nombre');
const influenciaSelect = fila.querySelector('.influencia-select');
const interesSelect = fila.querySelector('.interes-select');
actualizarEstrategia(fila, nombreStakeholder, influenciaSelect.value, interesSelect.value);
guardarConfiguracion();
});
});
window.influenciaChart = new Chart(document.getElementById('influenciaChart'), {
type: 'doughnut',
data: { labels: ['${_t('sh_high_inf')}', '${_t('sh_med_inf')}', '${_t('sh_low_inf')}'], datasets: [{ data: ${JSON.stringify(influenciaData)}, backgroundColor: ['#ef4444', '#f59e0b', '#10b981'], borderWidth: 0 }] },
options: { responsive: true, maintainAspectRatio: true, cutout: '55%', plugins: { legend: { position: 'bottom', labels: { color: '#e2e8f0', font: { size: 11 } } } } }
});
window.interesChart = new Chart(document.getElementById('interesChart'), {
type: 'doughnut',
data: { labels: ['${_t('sh_high_int')}', '${_t('sh_med_int')}', '${_t('sh_low_int')}'], datasets: [{ data: ${JSON.stringify(interesData)}, backgroundColor: ['#ef4444', '#f59e0b', '#10b981'], borderWidth: 0 }] },
options: { responsive: true, maintainAspectRatio: true, cutout: '55%', plugins: { legend: { position: 'bottom', labels: { color: '#e2e8f0', font: { size: 11 } } } } }
});
<\/script>`;
  abrirVentanaReporte(generarHTMLBase(contenido, _t('sh_title'), proyecto.name));
};

// ============================================
// REPORTE 15: FORECAST (TRADUCIDO)
// ============================================
window.generarReporteForecast = function() {
  const proyecto = obtenerProyectoActual();
  if (!proyecto) { alert(_t('no_project')); return; }
  const tareas = proyecto.tasks || [];
  const evm = calcularMetricasEVM(tareas);
  const completadas = tareas.filter(t => t.status === 'completed' || t.progress === 100).length;
  const total = tareas.length;
  const enProgreso = tareas.filter(t => t.status === 'inProgress' || (t.progress > 0 && t.progress < 100)).length;
  const pendientes = total - completadas - enProgreso;
  const atrasadas = tareas.filter(t => t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed').length;
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  let fechaMaxima = null;
  tareas.forEach(t => { if (t.deadline) { const fechaVen = new Date(t.deadline); if (!fechaMaxima || fechaVen > fechaMaxima) fechaMaxima = fechaVen; } });
  let diasTotales = 0;
  if (fechaMaxima && fechaMaxima > hoy) diasTotales = Math.ceil(Math.abs(fechaMaxima - hoy) / (1000 * 60 * 60 * 24));
  else diasTotales = 30;
  const diasTranscurridos = Math.max(1, diasTotales - (fechaMaxima && fechaMaxima > hoy ? Math.ceil((fechaMaxima - hoy) / (1000 * 60 * 60 * 24)) : diasTotales));
  const velocidad = completadas > 0 ? completadas / Math.max(1, diasTranscurridos) : (enProgreso > 0 ? 0.5 : 0.2);
  let diasRestantes = 0;
  if (velocidad > 0 && (total - completadas) > 0) diasRestantes = Math.ceil((total - completadas) / velocidad);
  else diasRestantes = Math.ceil(diasTotales * (pendientes / Math.max(1, total)));
  diasRestantes = Math.min(90, Math.max(0, diasRestantes));
  const fechaOptimista = new Date(); fechaOptimista.setDate(hoy.getDate() + Math.max(0, Math.ceil(diasRestantes * 0.7)));
  const fechaRealista = new Date();
  if (fechaMaxima && fechaMaxima > hoy) fechaRealista.setTime(fechaMaxima.getTime());
  else fechaRealista.setDate(hoy.getDate() + diasRestantes);
  const fechaPesimista = new Date(); fechaPesimista.setDate(hoy.getDate() + Math.ceil(diasRestantes * 1.3));
  let probabilidadExito = 80;
  probabilidadExito -= atrasadas * 5;
  probabilidadExito -= pendientes * 1;
  if (evm?.SPI && evm.SPI < 0.9) probabilidadExito -= 10;
  if (evm?.CPI && evm.CPI < 0.9) probabilidadExito -= 10;
  probabilidadExito = Math.min(95, Math.max(5, Math.round(probabilidadExito)));
  let nivelRiesgo = '', colorRiesgo = '';
  if (probabilidadExito >= 70) { nivelRiesgo = _t('risk_low'); colorRiesgo = '#10b981'; }
  else if (probabilidadExito >= 40) { nivelRiesgo = _t('risk_medium'); colorRiesgo = '#f59e0b'; }
  else { nivelRiesgo = _t('risk_critical'); colorRiesgo = '#ef4444'; }
  const avance = total > 0 ? Math.round((completadas / total) * 100) : 0;
  const tasaAtraso = total > 0 ? Math.round((atrasadas / total) * 100) : 0;
  const semanas = ['Actual', '2 Semanas', '4 Semanas', '6 Semanas', 'Final'];
  const optimistaData = [completadas, Math.min(total, completadas + Math.ceil((total - completadas) * 0.25)), Math.min(total, completadas + Math.ceil((total - completadas) * 0.5)), Math.min(total, completadas + Math.ceil((total - completadas) * 0.75)), total];
  const realistaData = [completadas, Math.min(total, completadas + Math.ceil((total - completadas) * 0.2)), Math.min(total, completadas + Math.ceil((total - completadas) * 0.4)), Math.min(total, completadas + Math.ceil((total - completadas) * 0.6)), total];
  const pesimistaData = [completadas, Math.min(total, completadas + Math.ceil((total - completadas) * 0.1)), Math.min(total, completadas + Math.ceil((total - completadas) * 0.2)), Math.min(total, completadas + Math.ceil((total - completadas) * 0.3)), total];
  const recomendaciones = [];
  if (evm?.SPI && evm.SPI < 0.9) recomendaciones.push(_t('forecast_rec_accel'));
  if (evm?.CPI && evm.CPI < 0.9) recomendaciones.push(_t('forecast_rec_hours'));
  if (atrasadas > 0) recomendaciones.push(_t('forecast_rec_prioritize', {count: atrasadas}));
  if (velocidad < 0.3) recomendaciones.push(_t('forecast_rec_rhythm'));
  if (diasRestantes > 60) recomendaciones.push(_t('forecast_rec_replan'));
  if (recomendaciones.length === 0) recomendaciones.push(_t('forecast_rec_maintain'));
  const contenido = `
<div class="header" style="background: linear-gradient(135deg, #0f172a, #1e293b);">
<h1 style="font-size: 32px;">${_t('forecast_title')}</h1>
<p style="font-size: 16px; opacity: 0.9;">${escapeHtml(proyecto.name)} • ${_t('forecast_subtitle')}</p>
<div style="margin-top: 20px; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
<span style="background: #8b5cf6; padding: 8px 24px; border-radius: 40px; font-weight: bold;">📊 ${_t('kpi_progress')}: ${avance}%</span>
<span style="background: ${colorRiesgo}; padding: 8px 24px; border-radius: 40px; font-weight: bold;">⚠️ ${_t('kpi_risk')}: ${nivelRiesgo}</span>
<span style="background: #10b981; padding: 8px 24px; border-radius: 40px; font-weight: bold;">✅ ${_t('forecast_success_prob')}: ${probabilidadExito}%</span>
</div>
</div>
<div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; margin-bottom: 30px;">
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #3b82f6;">${diasRestantes}</div><div>${_t('forecast_days_left')}</div><div style="font-size: 10px; color: #64748b;">${_t('forecast_at_current')}</div></div>
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #10b981;">${fechaRealista.toLocaleDateString()}</div><div>${_t('forecast_estimated_date')}</div><div style="font-size: 10px; color: #64748b;">${_t('forecast_realistic_scenario')}</div></div>
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #f59e0b;">${evm?.EAC?.toFixed(0) || (tareas.reduce((s,t)=>s+(Number(t.timeLogged)||0),0) * (total/completadas || 1)).toFixed(0)}h</div><div>${_t('forecast_projected_hours')}</div><div style="font-size: 10px; color: #64748b;">${_t('forecast_eac_finish')}</div></div>
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #8b5cf6;">${velocidad.toFixed(1)}</div><div>${_t('forecast_team_velocity')}</div><div style="font-size: 10px; color: #64748b;">${_t('forecast_tasks_day')}</div></div>
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: ${colorRiesgo};">${tasaAtraso}%</div><div>${_t('forecast_overdue_rate')}</div><div style="font-size: 10px; color: #64748b;">${_t('forecast_of_tasks', {total: total})}</div></div>
</div>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 25px; margin-bottom: 30px;">
<div class="chart-card" style="background: #1e293b; border-radius: 20px; padding: 20px;">
<h3 style="color: #8b5cf6; margin-bottom: 15px;">${_t('forecast_scenarios')}</h3>
<canvas id="escenariosChart" style="height: 220px; width: 100%;"></canvas>
<div style="display: flex; justify-content: center; gap: 20px; margin-top: 15px;">
<div><span style="background: #10b981; width: 12px; height: 12px; display: inline-block; border-radius: 4px;"></span> ${_t('forecast_optimistic').replace('🟢 ','')}</div>
<div><span style="background: #3b82f6; width: 12px; height: 12px; display: inline-block; border-radius: 4px;"></span> ${_t('forecast_realistic').replace('🔵 ','')}</div>
<div><span style="background: #ef4444; width: 12px; height: 12px; display: inline-block; border-radius: 4px;"></span> ${_t('forecast_pessimistic').replace('🔴 ','')}</div>
</div>
</div>
<div class="chart-card" style="background: #1e293b; border-radius: 20px; padding: 20px;">
<h3 style="color: #8b5cf6; margin-bottom: 15px;">${_t('forecast_success_prob')}</h3>
<canvas id="probabilidadChart" style="height: 220px; width: 100%;"></canvas>
<div style="text-align: center; margin-top: 10px;">
<span style="background: ${colorRiesgo}; padding: 4px 12px; border-radius: 20px; font-size: 11px;">${_t('forecast_risk_level')}: ${nivelRiesgo}</span>
</div>
</div>
</div>
<div class="table-container" style="background: #1e293b; border-radius: 20px; padding: 25px; margin-bottom: 30px;">
<h3 style="color: #8b5cf6; margin-bottom: 20px;">${_t('forecast_scenario_table')}</h3>
<table style="width:100%; border-collapse: collapse;">
<thead>
<tr style="background: #0f172a;">
<th style="padding: 14px; text-align: left; color: #8b5cf6;">${_t('forecast_scenario')}</th>
<th style="padding: 14px; text-align: center; color: #8b5cf6;">${_t('forecast_estimated_date')}</th>
<th style="padding: 14px; text-align: center; color: #8b5cf6;">${_t('forecast_days_left')}</th>
<th style="padding: 14px; text-align: center; color: #8b5cf6;">${_t('forecast_probability')}</th>
<th style="padding: 14px; text-align: left; color: #8b5cf6;">${_t('forecast_recommendation')}</th>
</tr>
</thead>
<tbody>
<tr style="border-bottom: 1px solid #334155;">
<td style="padding: 14px;"><span style="background: #10b981; padding: 4px 12px; border-radius: 20px; font-size: 11px;">${_t('forecast_optimistic')}</span></td>
<td style="padding: 14px; text-align: center; color: white;">${fechaOptimista.toLocaleDateString()}</td>
<td style="padding: 14px; text-align: center; color: #10b981;">${Math.max(0, Math.ceil(diasRestantes * 0.7))} ${_t('forecast_days')}</td>
<td style="padding: 14px; text-align: center;"><span style="background: #10b981; padding: 4px 12px; border-radius: 20px;">20%</span></td>
<td style="padding: 14px; color: #94a3b8;">${_t('forecast_assign_resources')}</td>
</tr>
<tr style="border-bottom: 1px solid #334155;">
<td style="padding: 14px;"><span style="background: #3b82f6; padding: 4px 12px; border-radius: 20px; font-size: 11px;">${_t('forecast_realistic')}</span></td>
<td style="padding: 14px; text-align: center; color: white;">${fechaRealista.toLocaleDateString()}</td>
<td style="padding: 14px; text-align: center; color: #3b82f6;">${diasRestantes} ${_t('forecast_days')}</td>
<td style="padding: 14px; text-align: center;"><span style="background: #3b82f6; padding: 4px 12px; border-radius: 20px;">60%</span></td>
<td style="padding: 14px; color: #94a3b8;">${_t('forecast_maintain_rhythm')}</td>
</tr>
<tr style="border-bottom: 1px solid #334155;">
<td style="padding: 14px;"><span style="background: #ef4444; padding: 4px 12px; border-radius: 20px; font-size: 11px;">${_t('forecast_pessimistic')}</span></td>
<td style="padding: 14px; text-align: center; color: white;">${fechaPesimista.toLocaleDateString()}</td>
<td style="padding: 14px; text-align: center; color: #ef4444;">${Math.ceil(diasRestantes * 1.3)} ${_t('forecast_days')}</td>
<td style="padding: 14px; text-align: center;"><span style="background: #ef4444; padding: 4px 12px; border-radius: 20px;">20%</span></td>
<td style="padding: 14px; color: #94a3b8;">${_t('forecast_contingency')}</td>
</tr>
</tbody>
</table>
</div>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px;">
<div style="background: rgba(16, 185, 129, 0.1); border-radius: 16px; padding: 20px;">
<div style="color: #10b981; font-weight: bold;">${_t('forecast_completed')}</div>
<div style="font-size: 36px; font-weight: bold; margin: 10px 0;">${completadas}</div>
<div style="font-size: 12px; color: #64748b;">${_t('forecast_of_total', {total: total})}</div>
</div>
<div style="background: rgba(59, 130, 246, 0.1); border-radius: 16px; padding: 20px;">
<div style="color: #3b82f6; font-weight: bold;">${_t('forecast_in_progress')}</div>
<div style="font-size: 36px; font-weight: bold; margin: 10px 0;">${enProgreso}</div>
<div style="font-size: 12px; color: #64748b;">${_t('forecast_active_tasks')}</div>
</div>
<div style="background: rgba(245, 158, 11, 0.1); border-radius: 16px; padding: 20px;">
<div style="color: #f59e0b; font-weight: bold;">${_t('forecast_pending')}</div>
<div style="font-size: 36px; font-weight: bold; margin: 10px 0;">${pendientes}</div>
<div style="font-size: 12px; color: #64748b;">${_t('forecast_to_start')}</div>
</div>
</div>
<div class="recommendations" style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 20px; padding: 25px;">
<h3 style="color: #8b5cf6; margin-bottom: 20px;">${_t('forecast_rec_title')}</h3>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
${recomendaciones.map(rec => `<div style="background: rgba(139, 92, 246, 0.1); border-radius: 12px; padding: 12px;"><div style="color: #8b5cf6; font-size: 14px;">${rec}</div></div>`).join('')}
</div>
</div>
<div style="margin-top: 25px; padding: 20px; background: #0f172a; border-radius: 16px; text-align: center;">
<p style="color: #64748b; font-size: 12px;">
<strong>${_t('forecast_confidentiality')}</strong> ${_t('forecast_conf_text')}<br>
<strong>${_t('forecast_methodology')}</strong> ${_t('forecast_method_text')}<br>
<em>${_t('lessons_auto_gen')}</em>
</p>
</div>
<script>
new Chart(document.getElementById('escenariosChart'), {
type: 'line',
data: {
labels: ${JSON.stringify(semanas)},
datasets: [
{ label: '${_t('forecast_optimistic').replace('🟢 ','')}', data: ${JSON.stringify(optimistaData)}, borderColor: '#10b981', borderWidth: 3, fill: false, tension: 0.3, pointRadius: 5, pointBackgroundColor: '#10b981' },
{ label: '${_t('forecast_realistic').replace('🔵 ','')}', data: ${JSON.stringify(realistaData)}, borderColor: '#3b82f6', borderWidth: 3, fill: false, tension: 0.3, pointRadius: 5, pointBackgroundColor: '#3b82f6' },
{ label: '${_t('forecast_pessimistic').replace('🔴 ','')}', data: ${JSON.stringify(pesimistaData)}, borderColor: '#ef4444', borderWidth: 3, fill: false, tension: 0.3, pointRadius: 5, pointBackgroundColor: '#ef4444' }
]
},
options: { responsive: true, maintainAspectRatio: true, scales: { y: { beginAtZero: true, max: ${total}, title: { display: true, text: '${_t('forecast_completed_tasks')}', color: '#e2e8f0' }, ticks: { color: '#e2e8f0' } }, x: { ticks: { color: '#e2e8f0' } } }, plugins: { legend: { position: 'bottom', labels: { color: '#e2e8f0' } } } }
});
new Chart(document.getElementById('probabilidadChart'), {
type: 'doughnut',
data: { labels: ['${_t('forecast_success')}', '${_t('kpi_risk')}'], datasets: [{ data: [${probabilidadExito}, ${100 - probabilidadExito}], backgroundColor: ['#10b981', '#ef4444'], borderWidth: 0 }] },
options: { responsive: true, maintainAspectRatio: true, cutout: '60%', plugins: { legend: { position: 'bottom', labels: { color: '#e2e8f0' } } } }
});
<\/script>`;
  abrirVentanaReporte(generarHTMLBase(contenido, _t('forecast_title'), proyecto.name));
};

// ============================================
// REPORTE 16: CUMPLIMIENTO PLAZOS (TRADUCIDO)
// ============================================
window.generarReporteCumplimiento = function() {
  const proyecto = obtenerProyectoActual();
  if (!proyecto) { alert(_t('no_project')); return; }
  const tareas = proyecto.tasks || [];
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  const conFecha = tareas.filter(t => t.deadline);
  const cumplidas = conFecha.filter(t => { const fechaVenc = new Date(t.deadline); fechaVenc.setHours(0, 0, 0, 0); return t.status === 'completed' || fechaVenc >= hoy; });
  const incumplidas = conFecha.filter(t => { const fechaVenc = new Date(t.deadline); fechaVenc.setHours(0, 0, 0, 0); return fechaVenc < hoy && t.status !== 'completed'; });
  const cumplimiento = conFecha.length > 0 ? Math.round((cumplidas.length / conFecha.length) * 100) : 100;
  const proximasVencer = conFecha.filter(t => { if (t.status === 'completed') return false; const fechaVenc = new Date(t.deadline); fechaVenc.setHours(0, 0, 0, 0); const diasDiff = Math.ceil((fechaVenc - hoy) / (1000 * 60 * 60 * 24)); return diasDiff >= 0 && diasDiff <= 7; });
  let promedioAtraso = 0;
  if (incumplidas.length > 0) {
    let sumaAtrasos = 0;
    incumplidas.forEach(t => { const fechaVenc = new Date(t.deadline); fechaVenc.setHours(0, 0, 0, 0); sumaAtrasos += Math.ceil((hoy - fechaVenc) / (1000 * 60 * 60 * 24)); });
    promedioAtraso = Math.round(sumaAtrasos / incumplidas.length);
  }
  const criticas = incumplidas.filter(t => { const prioridadAlta = t.priority === 'alta' || t.priority === 'high' || t.priority === 'Alta' || t.priority === 'High'; return prioridadAlta || t.critical === true; });
  let nivelRiesgo = '', colorRiesgo = '';
  if (cumplimiento >= 90) { nivelRiesgo = _t('risk_low'); colorRiesgo = '#10b981'; }
  else if (cumplimiento >= 70) { nivelRiesgo = _t('risk_medium'); colorRiesgo = '#f59e0b'; }
  else { nivelRiesgo = _t('risk_critical'); colorRiesgo = '#ef4444'; }
  const getEstadoReal = (t) => {
    if (t.status === 'completed') return _t('status_completed');
    if (t.status === 'overdue' || t.status === 'rezagado' || t.status === 'delayed') return _t('status_overdue');
    if (t.status === 'inProgress') return _t('status_inprogress');
    return _t('status_pending');
  };
  const getProgreso = (t) => {
    if (t.progress > 0) return t.progress;
    if (t.status === 'completed') return 100;
    if (t.timeLogged > 0 && t.estimatedTime > 0) return Math.min(100, Math.round((t.timeLogged / t.estimatedTime) * 100));
    return 0;
  };
  const contenido = `
<div class="header" style="background: linear-gradient(135deg, #0f172a, #1e293b);">
<h1 style="font-size: 32px;">${_t('compliance_title')}</h1>
<p style="font-size: 16px; opacity: 0.9;">${escapeHtml(proyecto.name)} • ${_t('compliance_subtitle')}</p>
<div style="margin-top: 20px; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
<span style="background: #10b981; padding: 8px 24px; border-radius: 40px; font-weight: bold;">📊 ${_t('compliance_rate')}: ${cumplimiento}%</span>
<span style="background: ${colorRiesgo}; padding: 8px 24px; border-radius: 40px; font-weight: bold;">⚠️ ${_t('kpi_risk')}: ${nivelRiesgo}</span>
<span style="background: #f59e0b; padding: 8px 24px; border-radius: 40px; font-weight: bold;">⏰ ${_t('compliance_proximas')}: ${proximasVencer.length}</span>
</div>
</div>
<div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; margin-bottom: 30px;">
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #3b82f6;">${conFecha.length}</div><div>${_t('compliance_with_deadline')}</div><div style="font-size: 10px; color: #64748b;">${_t('compliance_tasks_deadline')}</div></div>
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #10b981;">${cumplidas.length}</div><div>${_t('compliance_on_time')}</div><div style="font-size: 10px; color: #64748b;">${_t('compliance_delivered')}</div></div>
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #ef4444;">${incumplidas.length}</div><div>${_t('compliance_failed')}</div><div style="font-size: 10px; color: #64748b;">${_t('compliance_overdue')}</div></div>
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #f59e0b;">${promedioAtraso}</div><div>${_t('compliance_avg_delay')}</div><div style="font-size: 10px; color: #64748b;">${_t('compliance_avg_days')}</div></div>
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #8b5cf6;">${criticas.length}</div><div>${_t('compliance_critical')}</div><div style="font-size: 10px; color: #64748b;">${_t('compliance_priority')}</div></div>
</div>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; margin-bottom: 40px; margin-top: 20px;">
<div class="chart-card" style="background: #1e293b; border-radius: 20px; padding: 25px;">
<h3 style="color: #8b5cf6; margin-bottom: 25px; text-align: center;">${_t('compliance_chart')}</h3>
<div style="height: 260px; display: flex; justify-content: center; align-items: center;">
<canvas id="cumplimientoChart" style="height: 220px; width: 220px;"></canvas>
</div>
<div style="text-align: center; margin-top: 20px;">
<span style="background: #10b981; width: 12px; height: 12px; display: inline-block; border-radius: 4px;"></span> ${_t('compliance_cumplidas')} (${cumplidas.length})
<span style="background: #ef4444; width: 12px; height: 12px; display: inline-block; border-radius: 4px; margin-left: 20px;"></span> ${_t('compliance_incumplidas')} (${incumplidas.length})
</div>
</div>
<div class="chart-card" style="background: #1e293b; border-radius: 20px; padding: 25px;">
<h3 style="color: #8b5cf6; margin-bottom: 25px; text-align: center;">${_t('compliance_status')}</h3>
<div style="height: 300px; display: flex; justify-content: center; align-items: center;">
<canvas id="estadoPlazosChart" style="height: 260px; width: 100%; max-width: 450px;"></canvas>
</div>
</div>
</div>
${proximasVencer.length > 0 ? `
<div class="table-container" style="background: #1e293b; border-radius: 20px; padding: 25px; margin-bottom: 30px;">
<h3 style="color: #f59e0b; margin-bottom: 20px;">${_t('compliance_upcoming')}</h3>
<table style="width:100%; border-collapse: collapse;">
<thead>
<tr style="background: #0f172a;">
<th style="padding: 12px; text-align: left; color: #8b5cf6;">📋 ${_t('sec_task')}</th>
<th style="padding: 12px; text-align: center; color: #8b5cf6;">${_t('sec_deadline')}</th>
<th style="padding: 12px; text-align: center; color: #8b5cf6;">${_t('compliance_days_left')}</th>
<th style="padding: 12px; text-align: center; color: #8b5cf6;">${_t('sec_progress')}</th>
<th style="padding: 12px; text-align: left; color: #8b5cf6;">👤 ${_t('milestone_responsible')}</th>
</tr>
</thead>
<tbody>
${proximasVencer.map(t => {
const fechaVenc = new Date(t.deadline); fechaVenc.setHours(0, 0, 0, 0);
const diasRestantes = Math.max(0, Math.ceil((fechaVenc - hoy) / (1000 * 60 * 60 * 24)));
const progreso = getProgreso(t);
let colorDias = diasRestantes <= 2 ? '#ef4444' : (diasRestantes <= 4 ? '#f59e0b' : '#10b981');
return `
<tr style="border-bottom: 1px solid #334155;">
<td style="padding: 12px;"><strong style="color: white;">${escapeHtml(t.name)}</strong></td>
<td style="padding: 12px; text-align: center; color: ${colorDias};">${fechaVenc.toLocaleDateString()}</td>
<td style="padding: 12px; text-align: center; color: ${colorDias};">${diasRestantes} ${_t('compliance_day')}</td>
<td style="padding: 12px; text-align: center;">
<div style="background: #334155; border-radius: 10px; height: 6px; width: 80px; margin: 0 auto;">
<div style="background: #8b5cf6; border-radius: 10px; height: 6px; width: ${progreso}%;"></div>
</div>
${progreso}%
</td>
<td style="padding: 12px; color: #94a3b8;">${escapeHtml(t.assignee || t.team || '-')}</td>
</tr>
`;
}).join('')}
</tbody>
</table>
</div>
` : ''}
${incumplidas.length > 0 ? `
<div class="table-container" style="background: #1e293b; border-radius: 20px; padding: 25px; margin-bottom: 30px;">
<h3 style="color: #ef4444; margin-bottom: 20px;">${_t('compliance_failed_tasks')}</h3>
<table style="width:100%; border-collapse: collapse;">
<thead>
<tr style="background: #0f172a;">
<th style="padding: 12px; text-align: left; color: #8b5cf6;">📋 ${_t('sec_task')}</th>
<th style="padding: 12px; text-align: center; color: #8b5cf6;">${_t('sec_deadline')}</th>
<th style="padding: 12px; text-align: center; color: #8b5cf6;">${_t('compliance_days_delay')}</th>
<th style="padding: 12px; text-align: center; color: #8b5cf6;">${_t('sec_status')}</th>
<th style="padding: 12px; text-align: left; color: #8b5cf6;">👤 ${_t('milestone_responsible')}</th>
</tr>
</thead>
<tbody>
${incumplidas.slice(0, 15).map(t => {
const fechaVenc = new Date(t.deadline); fechaVenc.setHours(0, 0, 0, 0);
const diasAtraso = Math.ceil((hoy - fechaVenc) / (1000 * 60 * 60 * 24));
let colorDias = diasAtraso >= 14 ? '#ef4444' : (diasAtraso >= 7 ? '#f59e0b' : '#f97316');
const estadoReal = getEstadoReal(t);
return `
<tr style="border-bottom: 1px solid #334155;">
<td style="padding: 12px;"><strong style="color: #ef4444;">⚠️ ${escapeHtml(t.name)}</strong></td>
<td style="padding: 12px; text-align: center; color: #ef4444;">${fechaVenc.toLocaleDateString()}</td>
<td style="padding: 12px; text-align: center; color: ${colorDias};">${diasAtraso} ${_t('compliance_day')}</td>
<td style="padding: 12px; text-align: center; color: #ef4444;">${estadoReal}</td>
<td style="padding: 12px; color: #94a3b8;">${escapeHtml(t.assignee || t.team || '-')}</td>
</tr>
`;
}).join('')}
</tbody>
</table>
</div>
` : `
<div style="background: #1e293b; border-radius: 20px; padding: 40px; text-align: center; margin-bottom: 30px;">
<div style="color: #10b981; font-size: 48px;">✅</div>
<h3 style="color: #10b981; margin-top: 15px;">${_t('compliance_excellent')}</h3>
<p style="color: #94a3b8;">${_t('compliance_no_overdue')}</p>
</div>
`}
<div class="recommendations" style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 20px; padding: 25px;">
<h3 style="color: #8b5cf6; margin-bottom: 20px; text-align: center;">${_t('sec_recommendations')}</h3>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
${incumplidas.length > 0 ? `
<div style="background: rgba(239, 68, 68, 0.1); border-radius: 12px; padding: 12px;">
<div style="color: #ef4444; font-weight: bold;">${_t('compliance_rec_attention')}</div>
<div style="font-size: 12px; color: #cbd5e1; margin-top: 5px;">${_t('compliance_rec_attention_desc', {count: incumplidas.length, days: promedioAtraso})}</div>
</div>
` : ''}
${proximasVencer.length > 0 ? `
<div style="background: rgba(245, 158, 11, 0.1); border-radius: 12px; padding: 12px;">
<div style="color: #f59e0b; font-weight: bold;">${_t('compliance_rec_action')}</div>
<div style="font-size: 12px; color: #cbd5e1; margin-top: 5px;">${_t('compliance_rec_action_desc', {count: proximasVencer.length})}</div>
</div>
` : ''}
<div style="background: rgba(59, 130, 246, 0.1); border-radius: 12px; padding: 12px;">
<div style="color: #3b82f6; font-weight: bold;">${_t('compliance_rec_monitor')}</div>
<div style="font-size: 12px; color: #cbd5e1; margin-top: 5px;">${_t('compliance_rec_monitor_desc')}</div>
</div>
<div style="background: rgba(139, 92, 246, 0.1); border-radius: 12px; padding: 12px;">
<div style="color: #8b5cf6; font-weight: bold;">${_t('compliance_rec_plan')}</div>
<div style="font-size: 12px; color: #cbd5e1; margin-top: 5px;">${_t('compliance_rec_plan_desc')}</div>
</div>
</div>
</div>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 25px;">
<div style="background: #0f172a; border-radius: 16px; padding: 20px; text-align: center;">
<p style="color: #64748b; font-size: 12px; margin: 0; line-height: 1.6;"><strong>🔒 ${_t('confidential')}</strong><br>${_t('forecast_conf_text')}</p>
</div>
<div style="background: #0f172a; border-radius: 16px; padding: 20px; text-align: center;">
<p style="color: #64748b; font-size: 12px; margin: 0; line-height: 1.6;"><strong>📋 ${_t('lessons_methodology')}</strong><br>${_t('forecast_method_text')}</p>
</div>
</div>
<script>
new Chart(document.getElementById('cumplimientoChart'), {
type: 'doughnut',
data: { labels: ['${_t('compliance_cumplidas')}', '${_t('compliance_incumplidas')}'], datasets: [{ data: [${cumplidas.length}, ${incumplidas.length}], backgroundColor: ['#10b981', '#ef4444'], borderWidth: 0 }] },
options: { responsive: true, maintainAspectRatio: true, cutout: '60%', plugins: { legend: { position: 'bottom', labels: { color: '#e2e8f0', font: { size: 11 } } } } }
});
new Chart(document.getElementById('estadoPlazosChart'), {
type: 'bar',
data: { labels: ['${_t('compliance_cumplidas')}', '${_t('compliance_incumplidas')}', '${_t('compliance_proximas')}'], datasets: [{ label: '${_t('compliance_quantity')}', data: [${cumplidas.length}, ${incumplidas.length}, ${proximasVencer.length}], backgroundColor: ['#10b981', '#ef4444', '#f59e0b'], borderRadius: 8, barPercentage: 0.6, categoryPercentage: 0.8 }] },
options: { responsive: true, maintainAspectRatio: true, scales: { y: { beginAtZero: true, ticks: { stepSize: 1, color: '#e2e8f0', font: { size: 12 } }, grid: { color: 'rgba(255,255,255,0.1)' }, title: { display: true, text: '${_t('compliance_quantity')}', color: '#94a3b8', font: { size: 11 } } }, x: { ticks: { color: '#e2e8f0', font: { size: 12 } }, grid: { display: false } } }, plugins: { legend: { display: false }, tooltip: { backgroundColor: '#0f172a', titleColor: '#e2e8f0', bodyColor: '#94a3b8' } } }
});
<\/script>`;
  abrirVentanaReporte(generarHTMLBase(contenido, _t('compliance_title'), proyecto.name));
};

// ============================================
// REPORTE 17: SATISFACCIÓN CLIENTE (TRADUCIDO)
// ============================================
window.generarReporteSatisfaccion = function() {
  const proyecto = obtenerProyectoActual();
  if (!proyecto) { alert(_t('no_project')); return; }
  const tareas = proyecto.tasks || [];
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  const completadas = tareas.filter(t => t.status === 'completed' || t.progress === 100).length;
  const total = tareas.length;
  const enProgreso = tareas.filter(t => t.status === 'inProgress' || (t.progress > 0 && t.progress < 100)).length;
  const pendientes = total - completadas - enProgreso;
  let entregasATiempo = 0;
  tareas.forEach(t => {
    if ((t.status !== 'completed' && t.progress !== 100)) return;
    if (!t.deadline) { entregasATiempo++; return; }
    const fechaVencimiento = new Date(t.deadline); fechaVencimiento.setHours(0, 0, 0, 0);
    if (t.completedDate) { const fechaTermino = new Date(t.completedDate); fechaTermino.setHours(0, 0, 0, 0); if (fechaTermino <= fechaVencimiento) entregasATiempo++; }
    else entregasATiempo++;
  });
  const tasaExito = total > 0 ? (completadas / total) * 100 : 0;
  const tasaPuntualidad = completadas > 0 ? (entregasATiempo / completadas) * 100 : 0;
  let satisfaccion = Math.min(100, Math.round((tasaExito * 0.4) + (tasaPuntualidad * 0.4) + 20));
  if (enProgreso > 0 && pendientes === 0) satisfaccion = Math.min(100, satisfaccion + 5);
  if (pendientes > completadas) satisfaccion = Math.max(0, satisfaccion - 10);
  let nivelSatisfaccion = '', colorSatisfaccion = '';
  if (satisfaccion >= 85) { nivelSatisfaccion = _t('sat_level_excellent'); colorSatisfaccion = '#10b981'; }
  else if (satisfaccion >= 70) { nivelSatisfaccion = _t('sat_level_good'); colorSatisfaccion = '#3b82f6'; }
  else if (satisfaccion >= 50) { nivelSatisfaccion = _t('sat_level_regular'); colorSatisfaccion = '#f59e0b'; }
  else { nivelSatisfaccion = _t('sat_level_critical'); colorSatisfaccion = '#ef4444'; }
  const factoresPositivos = [];
  const factoresNegativos = [];
  if (tasaPuntualidad >= 80) factoresPositivos.push('Alta puntualidad en entregas');
  else if (tasaPuntualidad < 60 && completadas > 0) factoresNegativos.push('Baja puntualidad en entregas');
  if (tasaExito >= 80) factoresPositivos.push('Alta tasa de éxito en tareas');
  else if (tasaExito < 60) factoresNegativos.push('Baja tasa de éxito en tareas');
  if (pendientes === 0) factoresPositivos.push('Todas las tareas están completadas');
  if (pendientes > completadas) factoresNegativos.push('Muchas tareas pendientes');
  const contenido = `
<div class="header" style="background: linear-gradient(135deg, #0f172a, #1e293b);">
<h1 style="font-size: 32px;">${_t('sat_title')}</h1>
<p style="font-size: 16px; opacity: 0.9;">${escapeHtml(proyecto.name)} • ${_t('sat_subtitle')}</p>
<div style="margin-top: 20px; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
<span style="background: ${colorSatisfaccion}; padding: 8px 24px; border-radius: 40px; font-weight: bold;">⭐ ${_t('sat_score')}: ${satisfaccion}%</span>
<span style="background: #8b5cf6; padding: 8px 24px; border-radius: 40px; font-weight: bold;">🏆 ${_t('sat_level')}: ${nivelSatisfaccion}</span>
<span style="background: #3b82f6; padding: 8px 24px; border-radius: 40px; font-weight: bold;">📊 ${_t('sat_punctuality')}: ${Math.round(tasaPuntualidad)}%</span>
</div>
</div>
<div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; margin-bottom: 30px;">
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #10b981;">${satisfaccion}%</div><div>${_t('sat_general')}</div><div style="font-size: 10px; color: #64748b;">${_t('sat_level')}: ${nivelSatisfaccion}</div></div>
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #3b82f6;">${completadas}</div><div>${_t('kpi_completed')}</div><div style="font-size: 10px; color: #64748b;">${_t('sat_of_total', {total: total})}</div></div>
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #10b981;">${entregasATiempo}</div><div>${_t('sat_on_time')}</div><div style="font-size: 10px; color: #64748b;">${_t('sat_punctuality_label')}: ${Math.round(tasaPuntualidad)}%</div></div>
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #f59e0b;">${enProgreso}</div><div>${_t('kpi_inprogress')}</div><div style="font-size: 10px; color: #64748b;">${_t('sat_active_currently')}</div></div>
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #8b5cf6;">${pendientes}</div><div>${_t('kpi_pending')}</div><div style="font-size: 10px; color: #64748b;">${_t('sat_to_start')}</div></div>
</div>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 25px; margin-bottom: 30px;">
<div class="chart-card" style="background: #1e293b; border-radius: 20px; padding: 25px; display: flex; flex-direction: column; align-items: center;">
<h3 style="color: #8b5cf6; margin-bottom: 25px; text-align: center;">${_t('sat_index')}</h3>
<div style="width: 200px; height: 200px; margin: 0 auto; position: relative;">
<canvas id="satisfaccionChart" style="width: 100% !important; height: 100% !important;"></canvas>
</div>
<div style="text-align: center; margin-top: 25px;">
<span style="background: #10b981; width: 12px; height: 12px; display: inline-block; border-radius: 4px;"></span> ${_t('sat_satisfaction')} (${satisfaccion}%)
<span style="background: #ef4444; width: 12px; height: 12px; display: inline-block; border-radius: 4px; margin-left: 15px;"></span> ${_t('sat_gap')} (${100 - satisfaccion}%)
</div>
</div>
<div class="chart-card" style="background: #1e293b; border-radius: 20px; padding: 25px;">
<h3 style="color: #8b5cf6; margin-bottom: 25px; text-align: center;">${_t('sat_factors')}</h3>
<div style="background: rgba(16, 185, 129, 0.15); border-radius: 16px; padding: 15px; margin-bottom: 20px; border-left: 4px solid #10b981;">
<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
<span style="background: #10b981; width: 8px; height: 8px; border-radius: 50%; display: inline-block;"></span>
<span style="color: #10b981; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; font-size: 11px;">${_t('sat_positive')}</span>
<span style="background: #10b98120; color: #10b981; font-size: 10px; padding: 2px 8px; border-radius: 20px;">${_t('sat_positive_elements', {count: factoresPositivos.length})}</span>
</div>
${factoresPositivos.length > 0 ? `
<div style="display: flex; flex-wrap: wrap; gap: 10px;">
${factoresPositivos.map(f => `
<div style="background: rgba(16, 185, 129, 0.1); border-radius: 30px; padding: 6px 14px; display: flex; align-items: center; gap: 6px;">
<span style="color: #10b981;">✅</span>
<span style="color: #cbd5e1; font-size: 12px;">${f}</span>
</div>
`).join('')}
</div>
` : `
<div style="background: rgba(16, 185, 129, 0.05); border-radius: 12px; padding: 20px; text-align: center;">
<span style="color: #10b981; font-size: 28px;">📊</span>
<div style="color: #64748b; font-size: 13px; margin-top: 5px;">${_t('sat_no_positive')}</div>
</div>
`}
</div>
<div style="background: rgba(239, 68, 68, 0.15); border-radius: 16px; padding: 15px; border-left: 4px solid #ef4444;">
<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
<span style="background: #ef4444; width: 8px; height: 8px; border-radius: 50%; display: inline-block;"></span>
<span style="color: #ef4444; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; font-size: 11px;">${_t('sat_negative')}</span>
<span style="background: #ef444420; color: #ef4444; font-size: 10px; padding: 2px 8px; border-radius: 20px;">${_t('sat_positive_elements', {count: factoresNegativos.length})}</span>
</div>
${factoresNegativos.length > 0 ? `
<div style="display: flex; flex-direction: column; gap: 10px;">
${factoresNegativos.map(f => `
<div style="background: rgba(239, 68, 68, 0.1); border-radius: 12px; padding: 12px; display: flex; align-items: center; gap: 12px;">
<div style="background: #ef4444; width: 32px; height: 32px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
<span style="color: white; font-size: 14px;">⚠️</span>
</div>
<div style="flex: 1;">
<div style="color: #ef4444; font-weight: bold; font-size: 13px;">${f}</div>
</div>
<div style="background: rgba(239, 68, 68, 0.2); border-radius: 20px; padding: 4px 10px;">
<span style="color: #ef4444; font-size: 10px;">${_t('sat_priority')}</span>
</div>
</div>
`).join('')}
</div>
` : `
<div style="background: rgba(16, 185, 129, 0.05); border-radius: 12px; padding: 20px; text-align: center;">
<span style="color: #10b981; font-size: 28px;">🏆</span>
<div style="color: #10b981; font-size: 13px; margin-top: 5px;">${_t('sat_no_improvement')}</div>
</div>
`}
</div>
</div>
</div>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px;">
<div style="background: rgba(16, 185, 129, 0.1); border-radius: 16px; padding: 20px; text-align: center;">
<div style="color: #10b981; font-size: 36px; font-weight: bold;">${Math.round(tasaExito)}%</div>
<div style="color: #cbd5e1; font-size: 12px; margin-top: 5px;">${_t('sat_success_rate')}</div>
<div style="font-size: 10px; color: #64748b; margin-top: 5px;">${_t('sat_tasks_completed')}</div>
</div>
<div style="background: rgba(59, 130, 246, 0.1); border-radius: 16px; padding: 20px; text-align: center;">
<div style="color: #3b82f6; font-size: 36px; font-weight: bold;">${Math.round(tasaPuntualidad)}%</div>
<div style="color: #cbd5e1; font-size: 12px; margin-top: 5px;">${_t('sat_punctuality_rate')}</div>
<div style="font-size: 10px; color: #64748b; margin-top: 5px;">${_t('sat_deliveries_on_date')}</div>
</div>
<div style="background: rgba(139, 92, 246, 0.1); border-radius: 16px; padding: 20px; text-align: center;">
<div style="color: #8b5cf6; font-size: 36px; font-weight: bold;">${Math.round((completadas + enProgreso) / total * 100)}%</div>
<div style="color: #cbd5e1; font-size: 12px; margin-top: 5px;">${_t('sat_total_progress')}</div>
<div style="font-size: 10px; color: #64748b; margin-top: 5px;">${_t('sat_completed_progress')}</div>
</div>
</div>
<div class="recommendations" style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 20px; padding: 25px;">
<h3 style="color: #8b5cf6; margin-bottom: 20px; text-align: center;">${_t('sec_recommendations')}</h3>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
<div style="background: rgba(59, 130, 246, 0.1); border-radius: 12px; padding: 12px;">
<div style="color: #3b82f6; font-weight: bold;">${_t('sat_rec_surveys')}</div>
<div style="font-size: 12px; color: #cbd5e1; margin-top: 5px;">${_t('sat_rec_surveys_desc')}</div>
</div>
<div style="background: rgba(16, 185, 129, 0.1); border-radius: 12px; padding: 12px;">
<div style="color: #10b981; font-weight: bold;">${_t('sat_rec_punctuality')}</div>
<div style="font-size: 12px; color: #cbd5e1; margin-top: 5px;">${_t('sat_rec_punctuality_desc')}</div>
</div>
<div style="background: rgba(139, 92, 246, 0.1); border-radius: 12px; padding: 12px;">
<div style="color: #8b5cf6; font-weight: bold;">${_t('sat_rec_comm')}</div>
<div style="font-size: 12px; color: #cbd5e1; margin-top: 5px;">${_t('sat_rec_comm_desc')}</div>
</div>
<div style="background: rgba(245, 158, 11, 0.1); border-radius: 12px; padding: 12px;">
<div style="color: #f59e0b; font-weight: bold;">${_t('sat_rec_feedback')}</div>
<div style="font-size: 12px; color: #cbd5e1; margin-top: 5px;">${_t('sat_rec_feedback_desc')}</div>
</div>
</div>
</div>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 25px;">
<div style="background: #0f172a; border-radius: 16px; padding: 15px; text-align: center;">
<p style="color: #64748b; font-size: 11px; margin: 0;"><strong>⭐ ${_t('confidential')} - ${_t('sat_title')}</strong></p>
</div>
<div style="background: #0f172a; border-radius: 16px; padding: 15px; text-align: center;">
<p style="color: #64748b; font-size: 11px; margin: 0;">📅 ${_t('generated')}: ${new Date().toLocaleString()}</p>
</div>
</div>
<script>
const satisfaccionCtx = document.getElementById('satisfaccionChart');
if (satisfaccionCtx) {
new Chart(satisfaccionCtx, {
type: 'doughnut',
data: { labels: ['${_t('sat_satisfaction')}', '${_t('sat_gap')}'], datasets: [{ data: [${satisfaccion}, ${100 - satisfaccion}], backgroundColor: ['#10b981', '#ef4444'], borderWidth: 0 }] },
options: { responsive: true, maintainAspectRatio: true, cutout: '60%', plugins: { legend: { position: 'bottom', labels: { color: '#e2e8f0', font: { size: 11 } }, display: false }, tooltip: { enabled: true } } }
});
}
<\/script>`;
  abrirVentanaReporte(generarHTMLBase(contenido, _t('sat_title'), proyecto.name));
};

// ============================================
// REPORTE 18: CAPACIDAD EQUIPO (TRADUCIDO)
// ============================================
window.generarReporteCapacidad = function() {
  const proyecto = obtenerProyectoActual();
  if (!proyecto) { alert(_t('no_project')); return; }
  const tareas = proyecto.tasks || [];
  const getProgresoReal = (t) => {
    if (t.progress !== undefined && t.progress > 0) return t.progress;
    if (t.status === 'completed') return 100;
    const timeLogged = Number(t.timeLogged) || 0;
    const estimatedTime = Number(t.estimatedTime) || 0;
    if (estimatedTime > 0) return Math.min(100, Math.round((timeLogged / estimatedTime) * 100));
    return 0;
  };
  const getColorProgresoPorEstado = (estado) => {
    switch(estado) {
      case 'completed': return '#10b981';
      case 'inProgress': return '#14b8a6';
      case 'overdue': case 'rezagado': case 'delayed': return '#ef4444';
      case 'pending': return '#f59e0b';
      default: return '#64748b';
    }
  };
  const getColorProgresoGeneral = (recurso) => {
    if (recurso.retrasadas > 0) return '#ef4444';
    if (recurso.enProgreso > 0) return '#14b8a6';
    if (recurso.pendientes > 0) return '#f59e0b';
    if (recurso.completadas === recurso.total && recurso.total > 0) return '#10b981';
    return '#64748b';
  };
  const getTextoEstado = (estado) => {
    switch(estado) {
      case 'completed': return _t('status_completed');
      case 'inProgress': return _t('status_inprogress');
      case 'overdue': case 'rezagado': case 'delayed': return _t('status_delayed');
      case 'pending': return _t('status_pending');
      default: return '📋 ' + estado;
    }
  };
  const getEmojiEstado = (estado) => {
    switch(estado) {
      case 'completed': return '✅';
      case 'inProgress': return '🔄';
      case 'overdue': case 'rezagado': case 'delayed': return '⚠️';
      case 'pending': return '⏳';
      default: return '📋';
    }
  };
  const recursos = {};
  tareas.forEach(t => {
    if(t.assignee) {
      if(!recursos[t.assignee]) recursos[t.assignee] = { total: 0, completadas: 0, pendientes: 0, retrasadas: 0, enProgreso: 0, progresoAcumulado: 0, tareasInfo: [] };
      const progreso = getProgresoReal(t);
      recursos[t.assignee].total++;
      recursos[t.assignee].progresoAcumulado += progreso;
      recursos[t.assignee].tareasInfo.push({ nombre: t.name, progreso: progreso, estado: t.status, estadoTexto: getTextoEstado(t.status), estadoEmoji: getEmojiEstado(t.status), colorProgreso: getColorProgresoPorEstado(t.status) });
      if(t.status === 'completed') recursos[t.assignee].completadas++;
      else if(t.status === 'overdue' || t.status === 'rezagado' || t.status === 'delayed') { recursos[t.assignee].retrasadas++; recursos[t.assignee].pendientes++; }
      else if(t.status === 'inProgress') { recursos[t.assignee].enProgreso++; recursos[t.assignee].pendientes++; }
      else recursos[t.assignee].pendientes++;
    }
  });
  Object.values(recursos).forEach(r => {
    r.progresoPromedio = r.total > 0 ? Math.round(r.progresoAcumulado / r.total) : 0;
    r.colorProgresoGeneral = getColorProgresoGeneral(r);
  });
  const capacidadTotal = Object.values(recursos).reduce((s,r)=>s+r.total,0);
  const capacidadUtilizada = Object.values(recursos).reduce((s,r)=>s+r.completadas,0);
  const utilizacion = capacidadTotal > 0 ? Math.round((capacidadUtilizada / capacidadTotal) * 100) : 0;
  const sobrecargados = Object.values(recursos).filter(r => r.pendientes > 3).length;
  const contenido = `
<div class="header" style="background: linear-gradient(135deg, #0f172a, #1e293b);">
<h1 style="font-size: 32px;">${_t('cap_title')}</h1>
<p style="font-size: 16px; opacity: 0.9;">${escapeHtml(proyecto.name)} • ${_t('cap_subtitle')}</p>
<div style="margin-top: 20px; display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
<span style="background: #8b5cf6; padding: 8px 24px; border-radius: 40px; font-weight: bold;">${_t('cap_utilization')}: ${utilizacion}%</span>
</div>
</div>
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px;">
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #3b82f6;">${Object.keys(recursos).length}</div><div>👥 ${_t('kpi_members')}</div><div style="font-size: 10px; color: #64748b;">${_t('cap_team_members')}</div></div>
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #8b5cf6;">${capacidadTotal}</div><div>${_t('cap_total_capacity')}</div><div style="font-size: 10px; color: #64748b;">${_t('cap_assigned_tasks')}</div></div>
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: #10b981;">${capacidadUtilizada}</div><div>${_t('cap_used')}</div><div style="font-size: 10px; color: #64748b;">${_t('cap_completed_tasks')}</div></div>
<div class="kpi-card" style="background: linear-gradient(135deg, #0f172a, #1e293b);"><div class="kpi-value" style="color: ${sobrecargados > 0 ? '#ef4444' : '#10b981'};">${sobrecargados}</div><div>${_t('cap_overload')}</div><div style="font-size: 10px; color: #64748b;">${_t('cap_overload_desc')}</div></div>
</div>
<div class="table-container" style="background: #1e293b; border-radius: 20px; padding: 25px; margin-bottom: 30px;">
<h3 style="color: #8b5cf6; margin-bottom: 20px;">${_t('cap_by_resource')}</h3>
<table style="width:100%; border-collapse: collapse;">
<thead>
<tr style="background: #0f172a; border-bottom: 2px solid #334155;">
<th style="padding: 14px; text-align: left; color: white;">${_t('cap_resource_col')}</th>
<th style="padding: 14px; text-align: center; color: white;">${_t('cap_capacity_col')}</th>
<th style="padding: 14px; text-align: center; color: white;">${_t('cap_completed')}</th>
<th style="padding: 14px; text-align: center; color: white;">${_t('cap_in_progress')}</th>
<th style="padding: 14px; text-align: center; color: white;">${_t('cap_delayed')}</th>
<th style="padding: 14px; text-align: center; color: white;">${_t('cap_pending')}</th>
<th style="padding: 14px; text-align: center; color: white;">${_t('cap_progress')}</th>
<th style="padding: 14px; text-align: left; color: white;">${_t('cap_tasks_col')}</th>
</tr>
</thead>
<tbody>
${Object.entries(recursos).map(([nombre, r]) => {
const progresoReal = r.progresoPromedio;
const colorProgreso = r.colorProgresoGeneral;
let estadoGeneral = '', estadoGeneralColor = '';
if (r.retrasadas > 0) { estadoGeneral = _t('cap_with_delays'); estadoGeneralColor = '#ef4444'; }
else if (r.enProgreso > 0) { estadoGeneral = _t('cap_in_progress_status'); estadoGeneralColor = '#14b8a6'; }
else if (r.completadas === r.total && r.total > 0) { estadoGeneral = _t('cap_completed_status'); estadoGeneralColor = '#10b981'; }
else if (r.pendientes > 0) { estadoGeneral = _t('cap_pending_status'); estadoGeneralColor = '#f59e0b'; }
else { estadoGeneral = _t('cap_no_tasks'); estadoGeneralColor = '#64748b'; }
const tareasDetalle = r.tareasInfo.map(t => `
<div style="display: inline-flex; align-items: center; gap: 6px; background: #0f172a; padding: 4px 12px; border-radius: 20px; margin: 2px; font-size: 12px;">
<span style="color: ${t.colorProgreso};">${t.estadoEmoji}</span>
<span style="color: white;">${escapeHtml(t.nombre)}</span>
<span style="color: ${t.colorProgreso}; font-weight: bold;">${t.progreso}%</span>
</div>
`).join('');
return `
<tr style="border-bottom: 1px solid #334155;">
<td style="padding: 14px;">
<strong style="color: white;">${escapeHtml(nombre)}</strong>
<div style="font-size: 10px; margin-top: 4px;"><span style="color: ${estadoGeneralColor};">${estadoGeneral}</span></div>
</td>
<td style="padding: 14px; text-align: center;"><span style="color: #8b5cf6; font-weight: bold;">${r.total}</span></td>
<td style="padding: 14px; text-align: center;"><span style="color: #10b981; font-weight: bold;">${r.completadas}</span></td>
<td style="padding: 14px; text-align: center;"><span style="color: #14b8a6; font-weight: bold;">${r.enProgreso}</span></td>
<td style="padding: 14px; text-align: center;"><span style="color: #ef4444; font-weight: bold;">${r.retrasadas}</span></td>
<td style="padding: 14px; text-align: center;"><span style="color: #f59e0b; font-weight: bold;">${r.pendientes}</span></td>
<td style="padding: 14px; text-align: center;">
<div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
<div class="progress-bar" style="width: 80px; background: #334155; border-radius: 10px; overflow: hidden;">
<div style="width: ${progresoReal}%; background: ${colorProgreso}; height: 8px; border-radius: 10px;"></div>
</div>
<span style="color: ${colorProgreso}; font-weight: bold;">${progresoReal}%</span>
</div>
</td>
<td style="padding: 14px;">
<div style="display: flex; flex-wrap: wrap; gap: 6px; max-width: 300px;">${tareasDetalle}</div>
</td>
</tr>
`;
}).join('')}
</tbody>
</table>
</div>
<div style="background: #0f172a; border-radius: 16px; padding: 15px; margin-bottom: 20px; text-align: center;">
<h4 style="color: #8b5cf6; margin-bottom: 10px; font-size: 12px;">${_t('cap_legend')}</h4>
<div style="display: flex; justify-content: center; gap: 25px; flex-wrap: wrap;">
<div><span style="background: #10b981; width: 14px; height: 14px; display: inline-block; border-radius: 4px;"></span> ${_t('status_completed')}</div>
<div><span style="background: #14b8a6; width: 14px; height: 14px; display: inline-block; border-radius: 4px;"></span> ${_t('status_inprogress')}</div>
<div><span style="background: #ef4444; width: 14px; height: 14px; display: inline-block; border-radius: 4px;"></span> ${_t('status_delayed')}</div>
<div><span style="background: #f59e0b; width: 14px; height: 14px; display: inline-block; border-radius: 4px;"></span> ${_t('status_pending')}</div>
</div>
</div>
<div class="chart-card" style="background: #1e293b; border-radius: 20px; padding: 25px; margin-bottom: 30px;">
<h3 style="color: #8b5cf6; margin-bottom: 25px; text-align: center;">${_t('cap_by_resource')}</h3>
<div style="height: 320px;">
<canvas id="capacidadChart" style="height: 280px; width: 100%;"></canvas>
</div>
</div>
<div class="recommendations" style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 20px; padding: 25px;">
<h3 style="color: #8b5cf6; margin-bottom: 20px; text-align: center;">${_t('sec_recommendations')}</h3>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
${Object.entries(recursos).filter(([_, r]) => r.retrasadas > 0).map(([nombre, r]) => `
<div style="background: rgba(239, 68, 68, 0.1); border-radius: 12px; padding: 12px;">
<div style="color: #ef4444; font-weight: bold;">${_t('cap_rec_delays', {name: nombre, count: r.retrasadas})}</div>
<div style="font-size: 12px; color: #cbd5e1; margin-top: 5px;">${_t('cap_rec_delays_desc')}</div>
</div>
`).join('')}
${Object.entries(recursos).filter(([_, r]) => r.enProgreso > 0 && r.retrasadas === 0).map(([nombre, r]) => `
<div style="background: rgba(20, 184, 166, 0.1); border-radius: 12px; padding: 12px;">
<div style="color: #14b8a6; font-weight: bold;">${_t('cap_rec_progress', {name: nombre, count: r.enProgreso})}</div>
<div style="font-size: 12px; color: #cbd5e1; margin-top: 5px;">${_t('cap_rec_progress_desc')}</div>
</div>
`).join('')}
</div>
</div>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 25px;">
<div style="background: #0f172a; border-radius: 16px; padding: 15px; text-align: center;">
<p style="color: #64748b; font-size: 11px; margin: 0;"><strong>🔒 ${_t('confidential')} - ${_t('cap_title')}</strong></p>
</div>
<div style="background: #0f172a; border-radius: 16px; padding: 15px; text-align: center;">
<p style="color: #64748b; font-size: 11px; margin: 0;">📅 ${_t('generated')}: ${new Date().toLocaleString()}</p>
</div>
</div>
<script>
new Chart(document.getElementById('capacidadChart'), {
type: 'bar',
data: {
labels: ${JSON.stringify(Object.keys(recursos).map(n => n.split(' ')[0] || n.substring(0, 10)))},
datasets: [
{ label: '${_t('cap_total_capacity_label')}', data: ${JSON.stringify(Object.values(recursos).map(r => r.total))}, backgroundColor: '#3b82f6', borderRadius: 8, barPercentage: 0.6 },
{ label: '${_t('cap_real_progress')}', data: ${JSON.stringify(Object.values(recursos).map(r => r.progresoPromedio))}, backgroundColor: '#8b5cf6', borderRadius: 8, barPercentage: 0.6 }
]
},
options: { responsive: true, maintainAspectRatio: true, scales: { y: { beginAtZero: true, max: 100, ticks: { stepSize: 20, color: '#e2e8f0' }, grid: { color: 'rgba(255,255,255,0.1)' }, title: { display: true, text: '${_t('cap_percentage')}', color: '#94a3b8' } }, x: { ticks: { color: '#e2e8f0', font: { size: 12 } }, grid: { display: false } } }, plugins: { legend: { position: 'top', labels: { color: '#e2e8f0', font: { size: 11 } } }, tooltip: { backgroundColor: '#0f172a', titleColor: '#e2e8f0', bodyColor: '#94a3b8' } } }
});
<\/script>`;
  abrirVentanaReporte(generarHTMLBase(contenido, _t('cap_title'), proyecto.name));
};

// ============================================
// REPORTE 19: IMPACTO EJECUTIVO (TRADUCIDO)
// ============================================
window.generarReporteImpactoEjecutivo = function() {
  const proyecto = obtenerProyectoActual();
  if (!proyecto) { alert(_t('no_project')); return; }
  const tareas = proyecto.tasks || [];
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  const total = tareas.length;
  const completadas = tareas.filter(t => t.status === 'completed' || t.progress === 100).length;
  const enProgreso = tareas.filter(t => t.status === 'inProgress' || (t.progress > 0 && t.progress < 100)).length;
  const pendientes = total - completadas - enProgreso;
  const atrasadas = tareas.filter(t => t.deadline && new Date(t.deadline) < hoy && t.status !== 'completed').length;
  const avanceTotal = total > 0 ? Math.round((completadas / total) * 100) : 0;
  let diasRestantes = 0;
  const fechasFuturas = tareas.filter(t => t.deadline && new Date(t.deadline) >= hoy && t.status !== 'completed');
  if (fechasFuturas.length > 0) {
    const fechaMasLejana = Math.max(...fechasFuturas.map(t => new Date(t.deadline).getTime()));
    diasRestantes = Math.ceil((fechaMasLejana - hoy) / (1000 * 60 * 60 * 24));
    diasRestantes = Math.min(90, Math.max(1, diasRestantes));
  } else if (pendientes > 0) {
    diasRestantes = Math.ceil(pendientes / 0.5);
    diasRestantes = Math.min(90, diasRestantes);
  }
  const horasEstimadas = tareas.reduce((s, t) => s + (Number(t.estimatedTime) || 0), 0);
  const horasReales = tareas.reduce((s, t) => s + (Number(t.timeLogged) || 0), 0);
  const costoEstimado = horasEstimadas * 50;
  const costoReal = horasReales * 50;
  const variacionCosto = costoReal - costoEstimado;
  const esAhorro = variacionCosto < 0;
  const esSobrecosto = variacionCosto > 0;
  const eficienciaCosto = horasReales > 0 ? Math.min(200, Math.round((horasEstimadas / horasReales) * 100)) : 0;
  const valorEntregado = (avanceTotal / 100) * costoEstimado + (esAhorro ? Math.abs(variacionCosto) : 0);
  let roiProyectado = costoReal > 0 ? Math.round((valorEntregado / costoReal - 1) * 100) : 0;
  roiProyectado = Math.max(-100, Math.min(150, roiProyectado));
  const eficienciaEquipo = total > 0 ? Math.round((completadas / total) * 100) : 0;
  const productividad = completadas > 0 ? Math.round(completadas / (horasReales / 40)) : 0;
  const cuellosBotella = tareas.filter(t => t.status === 'pending' && t.dependencies && t.dependencies.length > 0).length;
  const personasDias = Math.round(horasReales / 8);
  const velocidadEquipo = completadas > 0 ? (completadas / 30).toFixed(2) : '0.00';
  let nivelProyecto = '', colorProyecto = '', gradienteProyecto = '', mensajeProyecto = '';
  if (avanceTotal >= 80 && atrasadas === 0 && eficienciaCosto >= 90) {
    nivelProyecto = _t('impact_level_excellent'); colorProyecto = '#10b981'; gradienteProyecto = 'linear-gradient(135deg, #10b981, #059669)'; mensajeProyecto = _t('impact_msg_excellent');
  } else if (avanceTotal >= 60 && atrasadas <= 3 && eficienciaCosto >= 70) {
    nivelProyecto = _t('impact_level_good'); colorProyecto = '#3b82f6'; gradienteProyecto = 'linear-gradient(135deg, #3b82f6, #1d4ed8)'; mensajeProyecto = _t('impact_msg_good');
  } else if (avanceTotal >= 40 && atrasadas <= 5) {
    nivelProyecto = _t('impact_level_attention'); colorProyecto = '#f59e0b'; gradienteProyecto = 'linear-gradient(135deg, #f59e0b, #d97706)'; mensajeProyecto = _t('impact_msg_attention');
  } else {
    nivelProyecto = _t('impact_level_critical'); colorProyecto = '#ef4444'; gradienteProyecto = 'linear-gradient(135deg, #ef4444, #dc2626)'; mensajeProyecto = _t('impact_msg_critical');
  }
  const recomendacionesPMO = [];
  const recomendacionesFinanzas = [];
  const recomendacionesOperaciones = [];
  if (atrasadas > 0) recomendacionesPMO.push(_t('impact_rec_priority', {count: atrasadas}));
  if (diasRestantes > 60) recomendacionesPMO.push(_t('impact_rec_baseline'));
  if (avanceTotal < 50 && pendientes > 5) recomendacionesPMO.push(_t('impact_rec_replan'));
  if (recomendacionesPMO.length === 0) recomendacionesPMO.push(_t('impact_rec_good'));
  if (esSobrecosto) {
    recomendacionesFinanzas.push(_t('impact_rec_overcost', {amount: Math.abs(variacionCosto).toLocaleString()}));
    recomendacionesFinanzas.push(_t('impact_rec_control'));
  } else if (esAhorro) {
    recomendacionesFinanzas.push(_t('impact_rec_saving', {amount: Math.abs(variacionCosto).toLocaleString()}));
    recomendacionesFinanzas.push(_t('impact_rec_maintain_cost'));
  } else recomendacionesFinanzas.push(_t('impact_rec_costs_ok'));
  if (eficienciaCosto < 85) recomendacionesFinanzas.push(_t('impact_rec_low_eff'));
  else if (eficienciaCosto > 120 && esAhorro) recomendacionesFinanzas.push(_t('impact_rec_high_eff'));
  if (cuellosBotella > 0) recomendacionesOperaciones.push(_t('impact_rec_bottleneck', {count: cuellosBotella}));
  if (productividad < 5 && completadas > 0) recomendacionesOperaciones.push(_t('impact_rec_rhythm'));
  if (enProgreso > pendientes && pendientes > 0) recomendacionesOperaciones.push(_t('impact_rec_unbalanced'));
  if (recomendacionesOperaciones.length === 0) recomendacionesOperaciones.push(_t('impact_rec_ops_ok'));
  const variacionFormateada = esAhorro ? `-$${Math.abs(variacionCosto).toLocaleString()}` : `+$${Math.abs(variacionCosto).toLocaleString()}`;
  const colorVariacion = esAhorro ? '#10b981' : '#ef4444';
  const textoVariacion = esAhorro ? _t('impact_saving') : _t('impact_overcost');
  const contenido = `<!DOCTYPE html>
<html>
<head>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; background: linear-gradient(135deg, #0a0c10 0%, #12151c 100%); min-height: 100vh; padding: 40px; }
.executive-dashboard { max-width: 1400px; margin: 0 auto; }
.premium-header { background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95)); backdrop-filter: blur(10px); border-radius: 32px; padding: 40px; margin-bottom: 35px; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05); position: relative; overflow: hidden; }
.premium-title { font-size: 42px; font-weight: 800; background: linear-gradient(135deg, #ffffff, #8b5cf6, #3b82f6); -webkit-background-clip: text; background-clip: text; color: transparent; letter-spacing: -0.02em; position: relative; z-index: 1; }
.card-3d { background: linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9)); backdrop-filter: blur(10px); border-radius: 24px; padding: 24px; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 20px 40px -12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.card-3d:hover { transform: translateY(-4px); box-shadow: 0 30px 50px -15px rgba(0,0,0,0.5); border-color: rgba(139,92,246,0.3); }
.kpi-premium { background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 20px; padding: 20px; text-align: center; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 10px 20px -5px rgba(0,0,0,0.3); transition: all 0.3s ease; }
.kpi-premium:hover { transform: scale(1.02); box-shadow: 0 15px 30px -8px rgba(139,92,246,0.2); }
.kpi-value-premium { font-size: 48px; font-weight: 800; background: linear-gradient(135deg, #fff, #8b5cf6); -webkit-background-clip: text; background-clip: text; color: transparent; letter-spacing: -0.02em; }
.badge-premium { display: inline-block; padding: 6px 16px; border-radius: 40px; font-size: 12px; font-weight: 600; letter-spacing: 0.5px; background: linear-gradient(135deg, rgba(139,92,246,0.2), rgba(139,92,246,0.1)); border: 1px solid rgba(139,92,246,0.3); color: #a78bfa; }
.icon-float { background: linear-gradient(135deg, #8b5cf6, #6d28d9); width: 48px; height: 48px; border-radius: 16px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 16px -4px rgba(139,92,246,0.4); }
.grid-premium { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 25px; margin-bottom: 30px; }
.glam-divider { height: 2px; background: linear-gradient(90deg, transparent, #8b5cf6, #3b82f6, #8b5cf6, transparent); margin: 25px 0; }
</style>
</head>
<body>
<div class="executive-dashboard">
<div class="premium-header">
<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
<div>
<div class="premium-title">${_t('impact_title')}</div>
<p style="color: #94a3b8; margin-top: 12px; font-size: 16px;">${escapeHtml(proyecto.name)} • ${_t('impact_subtitle')}</p>
</div>
<div style="display: flex; gap: 12px;">
<div class="badge-premium" style="background: ${gradienteProyecto}; color: white; border: none;">🏆 ${nivelProyecto}</div>
<div class="badge-premium">📊 ${_t('kpi_progress')}: ${avanceTotal}%</div>
<div class="badge-premium">💰 ROI: ${roiProyectado}%</div>
</div>
</div>
<div class="glam-divider"></div>
<p style="color: #cbd5e1; font-size: 15px; text-align: center; margin-top: 10px;">${mensajeProyecto}</p>
</div>
<div class="grid-premium">
<div class="card-3d">
<div style="display: flex; align-items: center; gap: 15px; margin-bottom: 25px;">
<div class="icon-float"><span style="font-size: 24px;">📊</span></div>
<div><div style="color: #3b82f6; font-weight: 700; font-size: 14px;">${_t('impact_project_dir')}</div><div style="color: #64748b; font-size: 11px;">${_t('impact_schedule')}</div></div>
</div>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
<div><div style="color: #64748b; font-size: 11px;">${_t('impact_total_progress')}</div><div style="color: white; font-size: 32px; font-weight: 800;">${avanceTotal}%</div></div>
<div><div style="color: #64748b; font-size: 11px;">${_t('impact_tasks_completed')}</div><div style="color: #10b981; font-size: 32px; font-weight: 800;">${completadas}/${total}</div></div>
<div><div style="color: #64748b; font-size: 11px;">${_t('impact_days_left')}</div><div style="color: #f59e0b; font-size: 32px; font-weight: 800;">${diasRestantes}</div></div>
<div><div style="color: #64748b; font-size: 11px;">${_t('impact_overdue_tasks')}</div><div style="color: ${atrasadas > 0 ? '#ef4444' : '#10b981'}; font-size: 32px; font-weight: 800;">${atrasadas}</div></div>
</div>
</div>
<div class="card-3d">
<div style="display: flex; align-items: center; gap: 15px; margin-bottom: 25px;">
<div class="icon-float" style="background: linear-gradient(135deg, #10b981, #059669);"><span style="font-size: 24px;">💰</span></div>
<div><div style="color: #10b981; font-weight: 700; font-size: 14px;">${_t('impact_finance_dir')}</div><div style="color: #64748b; font-size: 11px;">${_t('impact_costs_roi')}</div></div>
</div>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
<div><div style="color: #64748b; font-size: 11px;">${_t('impact_estimated_budget')}</div><div style="color: white; font-size: 20px; font-weight: 700;">$${costoEstimado.toLocaleString()}</div></div>
<div><div style="color: #64748b; font-size: 11px;">${_t('impact_real_cost')}</div><div style="color: ${esAhorro ? '#10b981' : '#ef4444'}; font-size: 20px; font-weight: 700;">$${costoReal.toLocaleString()}</div></div>
<div><div style="color: #64748b; font-size: 11px;">${_t('impact_variation')} (${textoVariacion})</div><div style="color: ${colorVariacion}; font-size: 20px; font-weight: 700;">${variacionFormateada}</div></div>
<div><div style="color: #64748b; font-size: 11px;">${_t('impact_cost_efficiency')}</div><div style="color: ${eficienciaCosto >= 100 ? '#10b981' : '#ef4444'}; font-size: 20px; font-weight: 700;">${eficienciaCosto}%</div></div>
</div>
</div>
<div class="card-3d">
<div style="display: flex; align-items: center; gap: 15px; margin-bottom: 25px;">
<div class="icon-float" style="background: linear-gradient(135deg, #8b5cf6, #6d28d9);"><span style="font-size: 24px;">🏭</span></div>
<div><div style="color: #8b5cf6; font-weight: 700; font-size: 14px;">${_t('impact_ops_dir')}</div><div style="color: #64748b; font-size: 11px;">${_t('impact_efficiency_resources')}</div></div>
</div>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
<div><div style="color: #64748b; font-size: 11px;">${_t('impact_team_efficiency')}</div><div style="color: white; font-size: 32px; font-weight: 800;">${eficienciaEquipo}%</div></div>
<div><div style="color: #64748b; font-size: 11px;">${_t('impact_productivity')}</div><div style="color: #f59e0b; font-size: 32px; font-weight: 800;">${productividad}</div></div>
<div><div style="color: #64748b; font-size: 11px;">${_t('kpi_inprogress')}</div><div style="color: #3b82f6; font-size: 32px; font-weight: 800;">${enProgreso}</div></div>
<div><div style="color: #64748b; font-size: 11px;">${_t('impact_bottlenecks')}</div><div style="color: ${cuellosBotella > 0 ? '#ef4444' : '#10b981'}; font-size: 32px; font-weight: 800;">${cuellosBotella}</div></div>
</div>
</div>
</div>
<div class="grid-premium">
<div class="card-3d">
<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
<span style="background: #3b82f6; width: 10px; height: 10px; border-radius: 50%; box-shadow: 0 0 8px #3b82f6;"></span>
<span style="color: #3b82f6; font-weight: 700;">${_t('impact_pmo_rec')}</span>
</div>
<ul style="margin: 0; padding-left: 20px; color: #cbd5e1; font-size: 13px; line-height: 1.8;">
${recomendacionesPMO.map(r => `<li style="margin-bottom: 8px;">✨ ${r}</li>`).join('')}
</ul>
</div>
<div class="card-3d">
<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
<span style="background: #10b981; width: 10px; height: 10px; border-radius: 50%; box-shadow: 0 0 8px #10b981;"></span>
<span style="color: #10b981; font-weight: 700;">${_t('impact_finance_rec')}</span>
</div>
<ul style="margin: 0; padding-left: 20px; color: #cbd5e1; font-size: 13px; line-height: 1.8;">
${recomendacionesFinanzas.map(r => `<li style="margin-bottom: 8px;">💎 ${r}</li>`).join('')}
</ul>
</div>
<div class="card-3d">
<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
<span style="background: #8b5cf6; width: 10px; height: 10px; border-radius: 50%; box-shadow: 0 0 8px #8b5cf6;"></span>
<span style="color: #8b5cf6; font-weight: 700;">${_t('impact_ops_rec')}</span>
</div>
<ul style="margin: 0; padding-left: 20px; color: #cbd5e1; font-size: 13px; line-height: 1.8;">
${recomendacionesOperaciones.map(r => `<li style="margin-bottom: 8px;">⚡ ${r}</li>`).join('')}
</ul>
</div>
</div>
<div class="grid-premium" style="grid-template-columns: repeat(4, 1fr);">
<div class="kpi-premium"><div class="kpi-value-premium">${velocidadEquipo}</div><div style="color: #64748b; margin-top: 8px;">${_t('impact_team_velocity')}</div></div>
<div class="kpi-premium"><div class="kpi-value-premium">${Math.round((completadas / total) * 100)}%</div><div style="color: #64748b; margin-top: 8px;">${_t('impact_success_rate')}</div></div>
<div class="kpi-premium"><div class="kpi-value-premium">${personasDias}</div><div style="color: #64748b; margin-top: 8px;">${_t('impact_person_days')}</div></div>
<div class="kpi-premium"><div class="kpi-value-premium">${roiProyectado}%</div><div style="color: #64748b; margin-top: 8px;">${_t('impact_roi')}</div></div>
</div>
<div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 20px; text-align: center; border: 1px solid rgba(255,255,255,0.05);">
<p style="color: #64748b; font-size: 12px;">${_t('impact_vip_footer')} | 📅 ${new Date().toLocaleString()}</p>
<p style="color: #475569; font-size: 10px; margin-top: 8px;">${_t('impact_confidential')}</p>
</div>
</div>
</body>
</html>`;
  abrirVentanaReporte(contenido);
};

// ============================================
// REPORTE 20: ESTRATEGIA EJECUTIVA (TRADUCIDO)
// ============================================
window.generarReporteEstrategia = function() {
  const proyecto = obtenerProyectoActual();
  if (!proyecto) { alert(_t('no_project')); return; }
  const tareas = proyecto.tasks || [];
  const evm = calcularMetricasEVM(tareas);
  const completadas = tareas.filter(t => t.status === 'completed').length;
  const total = tareas.length;
  const scoreEstrategico = total > 0 ? Math.min(100, Math.round((completadas / total) * 50 + (evm?.CPI||1)*25 + (evm?.SPI||1)*25)) : 0;
  const contenido = `<div class="header"><h1>${_t('strategy_title')}</h1><p>${escapeHtml(proyecto.name)} • ${_t('strategy_subtitle')}</p><div style="margin-top: 16px;"><span style="background: ${scoreEstrategico>=80?'#10b981':scoreEstrategico>=60?'#f59e0b':'#ef4444'}; padding: 6px 20px; border-radius: 30px;">${_t('strategy_score')}: ${scoreEstrategico}%</span></div></div>
<div class="kpi-grid"><div class="kpi-card"><div class="kpi-value">${total}</div><div>📋 ${_t('kpi_tasks')}</div></div><div class="kpi-card"><div class="kpi-value">${completadas}</div><div>${_t('kpi_completed')}</div></div><div class="kpi-card"><div class="kpi-value">${evm?.CPI.toFixed(2)||_t('na')}</div><div>💰 CPI</div></div><div class="kpi-card"><div class="kpi-value">${evm?.SPI.toFixed(2)||_t('na')}</div><div>⏱️ SPI</div></div></div>
<div class="chart-card"><canvas id="estrategiaChart" style="height: 280px;"></canvas></div>
<div class="grid-2"><div class="card"><h3>${_t('strategy_objectives')}</h3><ul><li>${_t('strategy_obj_1', {value: evm?.CPI.toFixed(2)||_t('na')})}</li><li>${_t('strategy_obj_2', {value: evm?.SPI.toFixed(2)||_t('na')})}</li><li>${_t('strategy_obj_3')}</li><li>${_t('strategy_obj_4')}</li></ul></div>
<div class="card"><h3>${_t('strategy_action_plan')}</h3><ul><li>${_t('strategy_plan_1')}</li><li>${_t('strategy_plan_2')}</li><li>${_t('strategy_plan_3')}</li><li>${_t('strategy_plan_4')}</li></ul></div></div>
<div class="recommendations"><h3>${_t('sec_recommendations')}</h3><ul><li>${_t('strategy_rec_1')}</li><li>${_t('strategy_rec_2')}</li><li>${_t('strategy_rec_3')}</li><li>${_t('strategy_rec_4')}</li></ul></div>
<script>new Chart(document.getElementById('estrategiaChart'),{type:'radar',data:{labels:${JSON.stringify(_t('strategy_labels'))},datasets:[{label:'${_t('strategy_current_score')}',data:[${evm?.CPI*100||0},${evm?.SPI*100||0},${Math.min(100, completadas/total*100)},${scoreEstrategico},${Math.min(100, (tareas.filter(t=>t.status==='completed' && t.deadline && new Date(t.deadline)>=new Date(t.startDate)).length/Math.max(1,completadas)*100))}],backgroundColor:'rgba(139,92,246,0.2)',borderColor:'#8b5cf6',borderWidth:3}]},options:{scales:{r:{beginAtZero:true,max:100,ticks:{color:'#e2e8f0'}}}}});<\/script>`;
  abrirVentanaReporte(generarHTMLBase(contenido, _t('strategy_title'), proyecto.name));
};

// ============================================
// 🌐 LISTENER DE CAMBIO DE IDIOMA
// ============================================
document.addEventListener('languageChanged', function() {
  console.log('🌐 languageChanged detectado - actualizando reportes');
  const modal = document.getElementById('modalReportesEjecutivos');
  if (modal) {
    modal.remove();
    setTimeout(mostrarModalReportes, 100);
  }
  const btnText = document.getElementById('btnReportesSidebarText');
  if (btnText) btnText.textContent = _t('btn_centro_reportes');
});

// ============================================
// MAPEO DE REPORTES
// ============================================
window.reportesEjecutivos = {
  dashboard: window.generarDashboardEjecutivo,
  evm: window.generarInformeEVMReporte,
  equipo: window.generarReporteEquipo,
  proyectos: window.generarReporteProyectos,
  riesgos: window.generarReporteRiesgos,
  tiempo: window.generarReporteTiempo,
  calidad: window.generarReporteCalidad,
  burndown: window.generarReporteBurndown,
  recursos: window.generarReporteRecursos,
  costos: window.generarReporteCostos,
  hitos: window.generarReporteHitos,
  comunicaciones: window.generarReporteComunicaciones,
  lecciones: window.generarReporteLecciones,
  stakeholders: window.generarReporteStakeholders,
  forecast: window.generarReporteForecast,
  cumplimiento: window.generarReporteCumplimiento,
  satisfaccion: window.generarReporteSatisfaccion,
  capacidad: window.generarReporteCapacidad,
  impactoEjecutivo: window.generarReporteImpactoEjecutivo,
  estrategia: window.generarReporteEstrategia
};

document.addEventListener('click', function(e) {
  const tarjeta = e.target.closest('.reporte-tarjeta');
  if (tarjeta && tarjeta.dataset.reporte && window.reportesEjecutivos[tarjeta.dataset.reporte]) {
    window.reportesEjecutivos[tarjeta.dataset.reporte]();
    const modal = document.getElementById('modalReportesEjecutivos');
    if (modal) modal.remove();
  }
});

agregarBotonReportesSidebar();
console.log('✅ 20 REPORTES EJECUTIVOS CON TRADUCCIÓN COMPLETA ES/EN ACTIVOS');

})();