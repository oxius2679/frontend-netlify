// ============================================
// 🌟 21 REPORTES EJECUTIVOS - TRADUCCIÓN COMPLETA ES/EN + MAPA 3D
// ============================================
(function() {
'use strict'; 
console.log('🚀 21 Reportes Ejecutivos cargados - CON TRADUCCIÓN COMPLETA ES/EN + MAPA 3D');

// ============================================
// 🌐 DICCIONARIO DE TRADUCCIONES COMPLETO
// ============================================
const REPORTES_I18N = {
es: {
  modal_titulo: 'Centro de Reportes Ejecutivos',
  modal_subtitulo: '21 reportes profesionales • TODOS ACTIVOS',
  modal_footer1: '🎯 21 reportes ejecutivos - TODOS ACTIVOS',
  modal_footer2: '⚡ Todos con gráficos, tablas y recomendaciones',
  btn_centro_reportes: 'CENTRO DE REPORTES',
  btn_exportar_pdf: '📄 Exportar PDF',
  btn_imprimir: '🖨️ Imprimir',
  btn_cerrar: '✕ Cerrar',
  confidential: '🔒 CONFIDENCIAL',
  generated: 'Generado',
  selector_titulo: '📌 Proyecto:',
  selector_cambiar: 'Cambiar proyecto',
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
  rep_mapa3d: '🌍 Mapa Satelital EVM',
  rep_mapa3d_desc: 'Mapa mundial con métricas EVM y gestión de ubicaciones',
  status_completed: '✅ Completada',
  status_inprogress: '🔄 En progreso',
  status_pending: '⏳ Pendiente',
  status_overdue: '🔴 Atrasada',
  status_delayed: '⚠️ Retrasada',
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
  priority_high: 'Alta',
  priority_medium: 'Media',
  priority_low: 'Baja',
  risk_critical: 'CRÍTICO',
  risk_high: 'ALTO',
  risk_medium: 'MEDIO',
  risk_low: 'BAJO',
  rec_weekly_review: '📊 Mantener seguimiento semanal de KPIs',
  rec_assign_senior: 'Asignar recursos senior',
  rec_daily_follow: 'Seguimiento diario',
  rec_weekly_monitor: 'Monitoreo semanal',
  no_project: '❌ No hay proyecto seleccionado',
  no_tasks: '⚠️ No hay tareas en este proyecto',
  no_data: 'Sin datos',
  unassigned: 'Sin asignar',
  na: 'N/A',
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
  modal_titulo: 'Executive Reports Center',
  modal_subtitulo: '21 professional reports • ALL ACTIVE',
  modal_footer1: '🎯 21 executive reports - ALL ACTIVE',
  modal_footer2: '⚡ All with charts, tables and recommendations',
  btn_centro_reportes: 'REPORTS CENTER',
  btn_exportar_pdf: '📄 Export PDF',
  btn_imprimir: '🖨️ Print',
  btn_cerrar: '✕ Close',
  confidential: '🔒 CONFIDENTIAL',
  generated: 'Generated',
  selector_titulo: '📌 Project:',
  selector_cambiar: 'Change project',
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
  rep_mapa3d: '🌍 3D Satellite EVM Map',
  rep_mapa3d_desc: 'World map with EVM metrics and location management',
  status_completed: '✅ Completed',
  status_inprogress: '🔄 In Progress',
  status_pending: '⏳ Pending',
  status_overdue: '🔴 Overdue',
  status_delayed: '⚠️ Delayed',
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
  priority_high: 'High',
  priority_medium: 'Medium',
  priority_low: 'Low',
  risk_critical: 'CRITICAL',
  risk_high: 'HIGH',
  risk_medium: 'MEDIUM',
  risk_low: 'LOW',
  rec_weekly_review: '📊 Maintain weekly KPI tracking',
  rec_assign_senior: 'Assign senior resources',
  rec_daily_follow: 'Daily follow-up',
  rec_weekly_monitor: 'Weekly monitoring',
  no_project: '❌ No project selected',
  no_tasks: '⚠️ No tasks in this project',
  no_data: 'No data',
  unassigned: 'Unassigned',
  na: 'N/A',
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
  sh_title: '👥 STAKEHOLDER ANALYSIS',
  sh_subtitle: 'Power and interest matrix',
  sh_total: 'Total',
  sh_high_influence: '🔴 High Influence',
  sh_high_interest: '⭐ High Interest',
  sh_key: '🎯 Key Stakeholders',
  sh_influence_dist: '⚡ Influence Distribution',
  sh_interest_dist: '🎯 Interest Distribution',
  sh_matrix: '📋 Stakeholder Matrix',
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
// FUNCIONES AUXILIARES - CON SELECCIÓN DE PROYECTO
// ============================================
function obtenerProyectoActual() {
  let idx = localStorage.getItem('selectedProjectIndex');
  if (idx !== null) {
    idx = parseInt(idx, 10);
  } else {
    idx = typeof window.currentProjectIndex !== 'undefined' ? window.currentProjectIndex : 0;
  }
  const proyectos = obtenerTodosProyectos();
  if (proyectos && proyectos.length > 0 && idx >= 0 && idx < proyectos.length) {
    if (typeof window.currentProjectIndex !== 'undefined') {
      window.currentProjectIndex = idx;
    }
    return proyectos[idx];
  }
  return null;
}

function obtenerTodosProyectos() {
  if (typeof window.projects !== 'undefined' && Array.isArray(window.projects) && window.projects.length > 0) return window.projects;
  if (typeof projects !== 'undefined' && Array.isArray(projects) && projects.length > 0) return projects;
  const claves = ['proyectos', 'projects', 'pm_proyectos', 'pm_projects'];
  for (const clave of claves) {
    try {
      const data = JSON.parse(localStorage.getItem(clave));
      if (Array.isArray(data) && data.length > 0) return data;
    } catch (e) { /* seguir buscando */ }
  }
  return [];
}

function cambiarProyecto(index) {
  const proyectos = obtenerTodosProyectos();
  if (!proyectos || index < 0 || index >= proyectos.length) return;
  localStorage.setItem('selectedProjectIndex', String(index));
  if (typeof window.currentProjectIndex !== 'undefined') {
    window.currentProjectIndex = index;
  }
  const selector = document.getElementById('projectSelector');
  if (selector) {
    selector.value = index;
    const displayText = document.getElementById('selectorDisplayText');
    if (displayText) {
      const nombre = proyectos[index]?.name || '';
      displayText.textContent = `${_t('selector_titulo')} ${nombre}`;
    }
  }
  document.dispatchEvent(new Event('projectChanged'));
}

window.cambiarProyecto = cambiarProyecto;
window.obtenerProyectoActual = obtenerProyectoActual;
window.obtenerTodosProyectos = obtenerTodosProyectos;
window.ultimoReporteId = null;
window._ventanaPrevia = null;

function initProjectSelector() {
  const proyectos = obtenerTodosProyectos();
  if (!proyectos || proyectos.length === 0) return null;
  let idx = localStorage.getItem('selectedProjectIndex');
  if (idx === null) {
    idx = typeof window.currentProjectIndex !== 'undefined' ? window.currentProjectIndex : 0;
    localStorage.setItem('selectedProjectIndex', String(idx));
  } else {
    idx = parseInt(idx, 10);
  }
  if (idx >= proyectos.length) idx = 0;
  const container = document.createElement('div');
  container.style.cssText = 'display: flex; align-items: center; gap: 12px; margin-left: 20px;';
  const label = document.createElement('span');
  label.id = 'selectorDisplayText';
  label.style.cssText = 'color: #94a3b8; font-size: 14px; font-weight: 500; white-space: nowrap;';
  label.textContent = `${_t('selector_titulo')} ${proyectos[idx]?.name || ''}`;
  const select = document.createElement('select');
  select.id = 'projectSelector';
  select.style.cssText = 'background: #1e293b; color: white; border: 1px solid #334155; border-radius: 30px; padding: 8px 16px; font-size: 14px; cursor: pointer; outline: none; min-width: 180px; transition: all 0.2s;';
  select.onmouseenter = () => { select.style.borderColor = '#8b5cf6'; };
  select.onmouseleave = () => { select.style.borderColor = '#334155'; };
  proyectos.forEach((p, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = p.name || `Proyecto ${i+1}`;
    if (i === idx) option.selected = true;
    select.appendChild(option);
  });
  select.addEventListener('change', function() {
    const newIdx = parseInt(this.value, 10);
    cambiarProyecto(newIdx);
    const displayText = document.getElementById('selectorDisplayText');
    if (displayText) {
      const nombre = proyectos[newIdx]?.name || '';
      displayText.textContent = `${_t('selector_titulo')} ${nombre}`;
    }
    const notif = document.createElement('div');
    notif.style.cssText = 'position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: #1e293b; color: #8b5cf6; padding: 12px 28px; border-radius: 40px; border: 1px solid #8b5cf6; box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 99999999; font-weight: 600; transition: opacity 0.3s;';
    notif.textContent = `${_t('selector_cambiar')}: ${nombre}`;
    document.body.appendChild(notif);
    setTimeout(() => { notif.style.opacity = '0'; setTimeout(() => notif.remove(), 400); }, 2000);
  });
  container.appendChild(label);
  container.appendChild(select);
  return container;
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
// 🌐 BOTÓN EN EL SIDEBAR (VERSIÓN ROBUSTA)
// ============================================
function agregarBotonReportesSidebar() {
  if (!localStorage.getItem('authToken')) {
    console.log('⏸️ Sin autenticación - no agregar botón Reports Center');
    return false;
  }
  if (document.body.classList.contains('show-login')) {
    console.log('⏸️ Login visible - no agregar botón Reports Center');
    return false;
  }
  function insertarBoton(sidebar) {
    if (!sidebar) return false;
    if (document.getElementById('btnReportesSidebarContainer')) return true;
    let menuList = sidebar.querySelector('ul, .menu-list, .nav-list, nav > ul');
    if (!menuList) {
      menuList = document.createElement('ul');
      menuList.style.cssText = 'list-style: none; padding: 0; margin: 0;';
      sidebar.appendChild(menuList);
    }
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
    return true;
  }
  const selectores = ['aside', '#sidebar', '.sidebar', 'nav', '.nav', '.menu', '#menu', '.navigation'];
  let encontrado = false;
  for (const sel of selectores) {
    const elem = document.querySelector(sel);
    if (elem && insertarBoton(elem)) {
      encontrado = true;
      break;
    }
  }
  if (encontrado) return;
  const observer = new MutationObserver(() => {
    for (const sel of selectores) {
      const elem = document.querySelector(sel);
      if (elem && insertarBoton(elem)) {
        observer.disconnect();
        return;
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => {
    if (!document.getElementById('btnReportesSidebarContainer')) {
      const floatBtn = document.createElement('div');
      floatBtn.id = 'btnReportesSidebarContainer';
      floatBtn.style.cssText = 'position: fixed; bottom: 30px; right: 30px; z-index: 999999; background: linear-gradient(135deg, #8b5cf6, #6d28d9); border-radius: 60px; padding: 16px 24px; box-shadow: 0 8px 30px rgba(139,92,246,0.6); cursor: pointer; display: flex; align-items: center; gap: 12px; border: none; transition: all 0.3s;';
      floatBtn.innerHTML = `<span style="font-size: 28px;">📊</span><span style="color: white; font-weight: 700; font-size: 18px;">${_t('btn_centro_reportes')}</span>`;
      floatBtn.onclick = () => mostrarModalReportes();
      floatBtn.onmouseenter = () => { floatBtn.style.transform = 'scale(1.05)'; };
      floatBtn.onmouseleave = () => { floatBtn.style.transform = 'scale(1)'; };
      document.body.appendChild(floatBtn);
      console.log('✅ Botón flotante de reportes creado (fallback)');
    }
  }, 5000);
}

// ============================================
// 🌐 MODAL CON TARJETAS + SELECTOR DE PROYECTOS
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
    { id: 'estrategia', nombre: _t('rep_estrategia'), desc: _t('rep_estrategia_desc'), color: '#8b5cf6' },
    { id: 'mapa3d', nombre: _t('rep_mapa3d'), desc: _t('rep_mapa3d_desc'), color: '#fbbf24' }
  ];
  const modal = document.createElement('div');
  modal.id = 'modalReportesEjecutivos';
  modal.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.95); backdrop-filter: blur(20px); z-index: 10000000; display: flex; align-items: center; justify-content: center; font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;`;
  modal.innerHTML = `<div style="width: 98vw; max-width: 1600px; height: 95vh; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 32px; border: 2px solid rgba(139, 92, 246, 0.5); overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
    <div style="background: linear-gradient(90deg, #0a0a1a, #1a1a3a); padding: 20px 30px; border-bottom: 1px solid rgba(139, 92, 246, 0.3); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
      <div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;">
        <div style="background: linear-gradient(135deg, #8b5cf6, #ec4899); width: 50px; height: 50px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 24px;">📊</div>
        <div>
          <h2 style="margin: 0; font-size: 24px; color: white;">${_t('modal_titulo')}</h2>
          <p style="margin: 5px 0 0 0; color: #94a3b8;">${_t('modal_subtitulo')}</p>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
        <div id="projectSelectorContainer" style="display: flex; align-items: center; gap: 10px;"></div>
        <button id="cerrarModalReportes" style="background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; color: #ef4444; width: 45px; height: 45px; border-radius: 50%; cursor: pointer; font-size: 20px;">✕</button>
      </div>
    </div>
    <div style="flex: 1; overflow-y: auto; padding: 30px;">
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
        ${reportes.map(r => `<div class="reporte-tarjeta" data-reporte="${r.id}" style="background: linear-gradient(145deg, rgba(30,41,59,0.8), rgba(15,23,42,0.9)); border-radius: 20px; padding: 25px; cursor: pointer; transition: all 0.3s; border-left: 4px solid ${r.color};">
          <div style="font-size: 42px; margin-bottom: 12px;">${r.nombre.split(' ')[0]}</div>
          <h3 style="margin: 0 0 10px 0; font-size: 18px; color: white;">${escapeHtml(r.nombre)}</h3>
          <p style="margin: 0; color: #94a3b8; font-size: 14px;">${escapeHtml(r.desc)}</p>
          <div style="margin-top: 15px; height: 4px; background: ${r.color}20; border-radius: 3px;">
            <div style="width: 70%; height: 100%; background: ${r.color}; border-radius: 3px;"></div>
          </div>
        </div>`).join('')}
      </div>
    </div>
    <div style="background: rgba(0,0,0,0.3); padding: 12px 30px; border-top: 1px solid rgba(139,92,246,0.2); display: flex; justify-content: space-between; color: #64748b; font-size: 12px;">
      <span>${_t('modal_footer1')}</span>
      <span>${_t('modal_footer2')}</span>
    </div>
  </div>`;
  document.body.appendChild(modal);
  const container = document.getElementById('projectSelectorContainer');
  if (container) {
    const selectorElem = initProjectSelector();
    if (selectorElem) {
      container.appendChild(selectorElem);
    } else {
      container.innerHTML = '<span style="color: #64748b; font-size: 13px;">Sin proyectos</span>';
    }
  }
  document.getElementById('cerrarModalReportes').onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// ============================================
// 🌐 SELECTOR DE PROYECTO DENTRO DE CADA REPORTE
// ============================================
function generarSelectorProyectosHTML() {
  const proyectos = obtenerTodosProyectos();
  if (!proyectos || proyectos.length === 0) return '';
  let idx = parseInt(localStorage.getItem('selectedProjectIndex') || '0', 10);
  if (isNaN(idx) || idx < 0 || idx >= proyectos.length) idx = 0;
  const options = proyectos.map((p, i) =>
    `<option value="${i}" ${i === idx ? 'selected' : ''}>${escapeHtml(p.name || ('Proyecto ' + (i + 1)))}</option>`
  ).join('');
  return `
    <div style="display:flex;justify-content:flex-end;align-items:center;gap:10px;margin-bottom:16px;">
      <span style="color:#94a3b8;font-size:13px;white-space:nowrap;">${_t('selector_titulo')}</span>
      <select id="reportProjectSelector" style="background:#1e293b;color:#e2e8f0;border:1px solid #334155;border-radius:30px;padding:8px 18px;font-size:13px;cursor:pointer;outline:none;min-width:180px;">
        ${options}
      </select>
    </div>
    <script>
    (function() {
      var sel = document.getElementById('reportProjectSelector');
      if (!sel) return;
      function getApp() {
        try {
          if (window.__appWindow && !window.__appWindow.closed && window.__appWindow.reportesEjecutivos) return window.__appWindow;
          var w = window.opener, i = 0;
          while (w && !w.closed && i < 10) {
            if (w.reportesEjecutivos) return w;
            w = w.opener; i++;
          }
        } catch (e) {}
        return null;
      }
      sel.addEventListener('change', function() {
        var idx = parseInt(sel.value, 10);
        try { localStorage.setItem('selectedProjectIndex', String(idx)); } catch (e) {}
        var id = null;
        try { id = localStorage.getItem('ultimoReporteEjecutado'); } catch (e) {}
        var app = getApp();
        if (!app || !id || !app.reportesEjecutivos[id]) { location.reload(); return; }
        if (app.cambiarProyecto) { try { app.cambiarProyecto(idx); } catch (e) {} }
        var nueva = window.open('', '_blank');
        if (!nueva) { alert('⚠️ Permite las ventanas emergentes (popups) para este sitio.'); return; }
        try { nueva.__appWindow = app; } catch (e) {}
        app._ventanaPrevia = nueva;
        try { app.reportesEjecutivos[id](); window.close(); }
        catch (e) { nueva.close(); }
      });
    })();
    <\/script>`;
}

// ============================================
// 🌐 FUNCIÓN BASE HTML (TRADUCIDA)
// ============================================
function generarHTMLBase(contenido, titulo, subtitulo) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${escapeHtml(titulo)} - ${escapeHtml(subtitulo)}</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>
  <style>
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
  </style></head><body>
  <div class="report-container">
    <div class="btn-group">
      <button class="btn-pdf" onclick="window.print()">${_t('btn_exportar_pdf')}</button>
      <button class="btn-print" onclick="window.print()">${_t('btn_imprimir')}</button>
    </div>
    ${generarSelectorProyectosHTML()}
    ${contenido}
    <div class="footer">
      <p>${_t('confidential')} - ${escapeHtml(titulo)}</p>
      <p>${_t('generated')}: ${new Date().toLocaleString()}</p>
    </div>
  </div></body></html>`;
}

function abrirVentanaReporte(html) {
  const ventana = window._ventanaPrevia || window.open('', '_blank');
  window._ventanaPrevia = null;
  if (!ventana) {
    alert('⚠️ El navegador bloqueó la ventana del reporte. Permite las ventanas emergentes (popups) para este sitio.');
    return null;
  }
  ventana.document.write(html);
  ventana.document.close();
  return ventana;
}

// ============================================
// 🌍 REPORTE 21: MAPA 3D EVM GLOBAL (SATELITAL)
// ============================================

// 1. INYECTAR LIBRERÍAS (Permitidas por CSP: jsdelivr)
if(!document.getElementById('leaflet-css-m3d')){
  var l = document.createElement('link'); l.id='leaflet-css-m3d'; l.rel='stylesheet';
  l.href='https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css';
  document.head.appendChild(l);
}
if(!document.getElementById('leaflet-js-m3d')){
  var s = document.createElement('script'); s.id='leaflet-js-m3d';
  s.src='https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js';
  document.head.appendChild(s);
}
if(!document.getElementById('chart-js-m3d')){
  var ch = document.createElement('script'); ch.id='chart-js-m3d';
  ch.src='https://cdn.jsdelivr.net/npm/chart.js';
  document.head.appendChild(ch);
}

// 2. BASE DE DATOS LOCAL (Ciudades para búsqueda offline)
var DB_CIUDADES_M3D = [
  {n:'Madrid',c:[40.4168,-3.7038],r:'España'},{n:'Barcelona',c:[41.3851,2.1734],r:'España'},
  {n:'Valencia',c:[39.4699,-0.3763],r:'España'},{n:'Sevilla',c:[37.3891,-5.9845],r:'España'},
  {n:'Zaragoza',c:[41.6488,-0.8890],r:'España'},{n:'Málaga',c:[36.7213,-4.4214],r:'España'},
  {n:'Bilbao',c:[43.2630,-2.9253],r:'España'},{n:'Toledo',c:[39.8628,-4.0226],r:'España'},
  {n:'Ciudad de México',c:[19.4326,-99.1332],r:'México'},{n:'Cancún',c:[21.1619,-86.8515],r:'México'},
  {n:'Guadalajara',c:[20.6597,-103.3496],r:'México'},{n:'Monterrey',c:[25.6866,-100.3161],r:'México'},
  {n:'Bogotá',c:[4.7110,-74.0721],r:'Colombia'},{n:'Buenos Aires',c:[-34.6037,-58.3816],r:'Argentina'},
  {n:'Santiago',c:[-33.4489,-70.6693],r:'Chile'},{n:'Lima',c:[-12.0464,-77.0428],r:'Perú'},
  {n:'Nueva York',c:[40.7128,-74.0060],r:'EE.UU.'},{n:'Miami',c:[25.7617,-80.1918],r:'EE.UU.'},
  {n:'Londres',c:[51.5072,-0.1276],r:'Reino Unido'},{n:'París',c:[48.8566,2.3522],r:'Francia'},
  {n:'Berlín',c:[52.5200,13.4050],r:'Alemania'},{n:'Roma',c:[41.9028,12.4964],r:'Italia'},
  {n:'Tokio',c:[35.6895,139.6917],r:'Japón'},{n:'Dubái',c:[25.2048,55.2708],r:'EAU'}
];

var mapInstanceM3D = null;
var chartInstanceM3D = null;
var tendenciaChartM3D = null;

function normalizarM3D(txt) {
  return txt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getUbicM3D(proy) {
  var raw = null;
  try { raw = JSON.parse(localStorage.getItem('ubic3d_' + (proy.name || proy.nombre || 'default')) || '[]'); } catch(e) {}
  if (raw && !Array.isArray(raw)) {
    var arrLimpio = [];
    Object.keys(raw).forEach(function(k) {
      if (raw[k] === true) {
        var city = DB_CIUDADES_M3D.find(function(c) { return c.n === k; });
        if (city) arrLimpio.push(city);
      }
    });
    return arrLimpio;
  }
  return Array.isArray(raw) ? raw : [];
}

// Funciones de dibujo de gauges (reutilizables)
function drawGaugeM3D(canvasId, value, max, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = (canvas.width / 2) - 8;
  const startAngle = 0.75 * Math.PI;
  const endAngle = 2.25 * Math.PI;
  const valueAngle = startAngle + (Math.min(value, max) / max) * (endAngle - startAngle);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#1e293b';
  ctx.lineCap = 'round';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, valueAngle);
  ctx.lineWidth = 6;
  ctx.strokeStyle = color;
  ctx.lineCap = 'round';
  ctx.stroke();
}

function drawGaugeSaludM3D(canvasId, value) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = (canvas.width / 2) - 8;
  const startAngle = 0.75 * Math.PI;
  const endAngle = 2.25 * Math.PI;
  const valueAngle = startAngle + (value / 100) * (endAngle - startAngle);
  const color = value >= 80 ? '#10b981' : value >= 60 ? '#f59e0b' : '#ef4444';

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.lineWidth = 7;
  ctx.strokeStyle = '#1e293b';
  ctx.lineCap = 'round';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, valueAngle);
  ctx.lineWidth = 7;
  ctx.strokeStyle = color;
  ctx.lineCap = 'round';
  ctx.stroke();
}

function drawTendenciaEVM(canvasId, totalPV, totalEV, totalAC) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  if (tendenciaChartM3D) {
    try { tendenciaChartM3D.destroy(); } catch(e) {}
    tendenciaChartM3D = null;
  }
  if (typeof Chart === 'undefined') return;

  const periodos = ['P1', 'P2', 'P3', 'P4', 'P5', 'Actual'];
  const pvData = [totalPV*0.1, totalPV*0.25, totalPV*0.45, totalPV*0.65, totalPV*0.85, totalPV];
  const evData = [totalEV*0.05, totalEV*0.2, totalEV*0.35, totalEV*0.55, totalEV*0.75, totalEV];
  const acData = [totalAC*0.08, totalAC*0.22, totalAC*0.4, totalAC*0.6, totalAC*0.8, totalAC];

  const fmt = v => {
    if (v >= 1000000) return (v / 1000000).toFixed(2) + 'M';
    if (v >= 1000) return (v / 1000).toFixed(1) + 'k';
    return v.toFixed(0);
  };

  tendenciaChartM3D = new Chart(canvas, {
    type: 'line',
    data: {
      labels: periodos,
      datasets: [
        { label: 'PV', data: pvData, borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)', borderWidth: 2, pointRadius: 4, pointBackgroundColor: '#3b82f6', tension: 0.3, fill: false },
        { label: 'EV', data: evData, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', borderWidth: 2, pointRadius: 4, pointBackgroundColor: '#10b981', tension: 0.3, fill: false },
        { label: 'AC', data: acData, borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)', borderWidth: 2, pointRadius: 4, pointBackgroundColor: '#ef4444', tension: 0.3, fill: false }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(15,23,42,0.95)',
          titleColor: '#fff',
          bodyColor: '#cbd5e1',
          borderColor: 'rgba(139,92,246,0.3)',
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + fmt(context.parsed.y) + 'h';
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: {
            color: '#64748b',
            font: { size: 9 },
            callback: function(value) { return fmt(value) + 'h'; }
          }
        },
        x: {
          grid: { display: false },
          ticks: {
            color: '#94a3b8',
            font: { size: 10, weight: '600' }
          }
        }
      }
    }
  });
}

window.generarReporteMapa3D = function() {
  var proyectos = obtenerTodosProyectos();
  if (!proyectos || proyectos.length === 0) { alert(_t('no_project')); return; }
  
  var idx = parseInt(localStorage.getItem('selectedProjectIndex') || '0', 10);
  if (isNaN(idx) || idx < 0 || idx >= proyectos.length) idx = 0;
  var proy = proyectos[idx];

  var ex = document.getElementById('m3d-overlay');
  if (ex) ex.remove();
  
  var ov = document.createElement('div');
  ov.id = 'm3d-overlay';
  ov.style.cssText = 'position:fixed!important;top:0!important;left:0!important;width:100vw!important;height:100vh!important;z-index:2147483647!important;background:#060910!important;display:flex!important;flex-direction:column!important;font-family:Inter,system-ui,sans-serif!important;color:#e2e8f0!important;overflow:hidden!important;';
  
  var h = document.createElement('div');
  h.style.cssText = 'height:74px;padding:0 24px;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(90deg,#0f172a,#1e293b);border-bottom:1px solid rgba(251,191,36,0.2);flex-shrink:0;z-index:10;';
  
  var hl = document.createElement('div');
  hl.style.cssText = 'display:flex;align-items:center;gap:14px;';
  hl.innerHTML = '<div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(145deg,#fbbf24,#d97706);display:flex;align-items:center;justify-content:center;font-size:22px;color:#0a0a1a;">🌍</div>' +
    '<div><h1 style="font-size:18px;font-weight:800;color:#fbbf24;margin:0;">Mapa Satelital Ejecutivo</h1>' +
    '<div style="font-size:11px;color:#94a3b8;margin-top:2px;">Control Global de Proyectos (Offline Mode)</div></div>';
  
  var hr = document.createElement('div');
  hr.style.cssText = 'display:flex;gap:12px;align-items:center;';
  
  var select = document.createElement('select');
  select.style.cssText = 'background:#0f172a;color:#fff;border:1px solid #475569;border-radius:30px;padding:10px 16px;font-size:13px;cursor:pointer;min-width:240px;outline:none;font-weight:600;';
  proyectos.forEach(function(p, i) {
    var opt = document.createElement('option');
    opt.value = i;
    opt.textContent = p.name || p.nombre || ('Proyecto ' + (i+1));
    if (i === idx) opt.selected = true;
    select.appendChild(opt);
  });
  
  var bUbi = document.createElement('button');
  bUbi.innerHTML = '📍 Gestionar Ubicaciones';
  bUbi.style.cssText = 'background:#1e293b;border:1px solid #475569;color:#fff;padding:10px 20px;border-radius:30px;font-weight:600;cursor:pointer;font-size:13px;transition:all 0.2s;';
  bUbi.onmouseenter = function() { this.style.background = '#334155'; };
  bUbi.onmouseleave = function() { this.style.background = '#1e293b'; };
  
  var bX = document.createElement('button');
  bX.textContent = '✕';
  bX.style.cssText = 'background:rgba(239,68,68,0.1);border:1px solid #ef4444;color:#ef4444;width:42px;height:42px;border-radius:50%;font-weight:bold;cursor:pointer;font-size:16px;';
  bX.onclick = function() { ov.remove(); if(mapInstanceM3D) { mapInstanceM3D.remove(); mapInstanceM3D = null; } };
  
  hr.appendChild(select); hr.appendChild(bUbi); hr.appendChild(bX);
  h.appendChild(hl); h.appendChild(hr);
  
  var m = document.createElement('div');
  m.style.cssText = 'display:flex;flex:1;overflow:hidden;';
  
  var mpWrapper = document.createElement('div');
  mpWrapper.style.cssText = 'flex:1;position:relative;background:#000;';
  var overlayFilter = document.createElement('div');
  overlayFilter.style.cssText = 'position:absolute;inset:0;background:rgba(10,15,28,0.4);z-index:400;pointer-events:none;';
  var mp = document.createElement('div');
  mp.id = 'leaflet-map-m3d';
  mp.style.cssText = 'width:100%;height:100%;background:#000;';
  mpWrapper.appendChild(mp); mpWrapper.appendChild(overlayFilter);
  
  var mapWidget = document.createElement('div');
  mapWidget.style.cssText = 'position:absolute;bottom:24px;left:24px;background:rgba(15,23,42,0.85);backdrop-filter:blur(8px);border:1px solid rgba(251,191,36,0.3);padding:12px 18px;border-radius:12px;z-index:500;display:flex;align-items:center;gap:12px;pointer-events:none;';
  mapWidget.innerHTML = '<div style="width:10px;height:10px;background:#34d399;border-radius:50%;box-shadow:0 0 10px #34d399;"></div><div style="font-size:12px;color:#e2e8f0;font-weight:600;">Haz clic en cualquier punto exacto para poner un pin</div>';
  mpWrapper.appendChild(mapWidget);
  
  var sb = document.createElement('div');
  sb.style.cssText = 'width:480px;background:#0a0f1c;border-left:1px solid rgba(255,255,255,0.05);display:flex;flex-direction:column;flex-shrink:0;z-index:10;';
  var sbContent = document.createElement('div');
  sbContent.id = 'm3d-sb-content';
  sbContent.style.cssText = 'padding:24px;overflow-y:auto;flex:1;';
  sb.appendChild(sbContent);
  
  m.appendChild(mpWrapper); m.appendChild(sb);
  ov.appendChild(h); ov.appendChild(m);
  (document.documentElement || document.body).appendChild(ov);
  
  function actualizarInterfazM3D(p) {
    try {
      var ts = p.tasks || p.tareas || [];
      var evm = calcularMetricasEVM(ts);
      var cs = getUbicM3D(p);
      
      // ===== CÁLCULOS EVM COMPLETOS PARA KPIs ENRIQUECIDOS =====
      var hoy = new Date();
      var totalPV = evm ? evm.PV : 0;
      var totalEV = evm ? evm.EV : 0;
      var totalAC = evm ? evm.AC : 0;
      var BAC = totalPV;
      var CPI = evm ? evm.CPI : 1;
      var SPI = evm ? evm.SPI : 1;
      var CV = evm ? evm.CV : 0;
      var SV = evm ? evm.SV : 0;
      var EAC = evm ? evm.EAC : 0;
      var ETC = evm ? evm.ETC : 0;
      var VAC = evm ? evm.VAC : 0;
      var TCPI = (BAC - totalEV) > 0 && (BAC - totalAC) > 0 ? (BAC - totalEV) / (BAC - totalAC) : 1;

      var completadas = ts.filter(function(t) { return t.status === 'completed'; }).length;
      var enProgreso = ts.filter(function(t) { return t.status === 'inProgress'; }).length;
      var pendientes = ts.filter(function(t) { return t.status === 'pending'; }).length;
      var atrasadas = ts.filter(function(t) { return t.deadline && new Date(t.deadline) < hoy && t.status !== 'completed'; }).length;
      var criticas = ts.filter(function(t) { return t.priority === 'high' || t.priority === 'alta' || t.critical; }).length;
      var enRiesgo = ts.filter(function(t) {
        if (!t.deadline) return false;
        var dias = Math.ceil((new Date(t.deadline) - hoy) / (1000 * 60 * 60 * 24));
        return dias <= 3 && t.status !== 'completed';
      }).length;

      var scoreSalud = Math.max(0, Math.min(100, Math.round(
        (SPI * 25) + (CPI * 25) + ((completadas / Math.max(1, ts.length)) * 30) + (Math.max(0, 1 - (atrasadas / Math.max(1, ts.length))) * 20)
      )));

      var fmt = function(v) {
        if (v >= 1000000) return (v / 1000000).toFixed(2) + 'M';
        if (v >= 1000) return (v / 1000).toFixed(1) + 'k';
        return v.toFixed(0);
      };
      
      var sbC = document.getElementById('m3d-sb-content');
      if (sbC) {
        var tablaHTML = cs.length === 0 ? 
          '<div style="color:#64748b;font-size:12px;font-style:italic;">No hay ubicaciones configuradas. Haz clic en el mapa o usa el buscador.</div>' :
          '<table style="width:100%;border-collapse:collapse;font-size:12px;"><tbody>' +
            cs.map(function(c) {
              return '<tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:10px 0;color:#fff;font-weight:600;">' + c.n + '</td><td style="padding:10px 0;text-align:right;"><span style="background:rgba(52,211,153,0.15);color:#34d399;padding:2px 8px;border-radius:12px;font-size:10px;font-weight:700;">ACTIVO</span></td></tr>';
            }).join('') + '</tbody></table>';

        sbC.innerHTML = 
          '<!-- 1. SCORE DE SALUD (Compacto) -->' +
          '<div style="background:linear-gradient(135deg,rgba(139,92,246,0.15),rgba(59,130,246,0.08));border:1px solid rgba(139,92,246,0.3);border-radius:14px;padding:16px;margin-bottom:16px;display:flex;align-items:center;gap:16px;">' +
            '<div style="position:relative;width:80px;height:80px;flex-shrink:0;">' +
              '<canvas id="gauge-salud" width="80" height="80"></canvas>' +
              '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:20px;font-weight:800;color:#fff;">' + scoreSalud + '</div>' +
            '</div>' +
            '<div style="flex:1;text-align:center;">' +
              '<div style="font-size:11px;color:#8b5cf6;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">🏥 Salud del Proyecto</div>' +
              '<div style="font-size:16px;color:#fff;font-weight:700;margin-bottom:4px;">' + (scoreSalud >= 80 ? '✅ Óptimo' : scoreSalud >= 60 ? '⚠️ Atención' : '🔴 Crítico') + '</div>' +
              '<div style="font-size:11px;color:#94a3b8;">SPI: ' + SPI.toFixed(2) + ' · CPI: ' + CPI.toFixed(2) + '</div>' +
              '<div style="font-size:11px;color:#94a3b8;margin-top:2px;">' + completadas + '/' + ts.length + ' tareas completadas</div>' +
            '</div>' +
          '</div>' +

          '<!-- 2. TRÍADA EVM (PV, EV, AC) -->' +
          '<div style="font-size:11px;color:#8b5cf6;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">📊 Valor Ganado (EVM)</div>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:14px;">' +
            '<div style="background:rgba(59,130,246,0.12);border:1px solid rgba(59,130,246,0.3);border-radius:12px;padding:12px;text-align:center;">' +
              '<div style="font-size:9px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">PV</div>' +
              '<div style="font-size:20px;font-weight:800;color:#3b82f6;margin:4px 0;">' + fmt(totalPV) + 'h</div>' +
              '<div style="font-size:9px;color:#64748b;">Planificado</div>' +
            '</div>' +
            '<div style="background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.3);border-radius:12px;padding:12px;text-align:center;">' +
              '<div style="font-size:9px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">EV</div>' +
              '<div style="font-size:20px;font-weight:800;color:#10b981;margin:4px 0;">' + fmt(totalEV) + 'h</div>' +
              '<div style="font-size:9px;color:#64748b;">Ganado</div>' +
            '</div>' +
            '<div style="background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.3);border-radius:12px;padding:12px;text-align:center;">' +
              '<div style="font-size:9px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">AC</div>' +
              '<div style="font-size:20px;font-weight:800;color:#ef4444;margin:4px 0;">' + fmt(totalAC) + 'h</div>' +
              '<div style="font-size:9px;color:#64748b;">Real</div>' +
            '</div>' +
          '</div>' +

          '<!-- CV y SV -->' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">' +
            '<div style="background:rgba(30,41,59,0.5);border-radius:10px;padding:10px;text-align:center;">' +
              '<div style="font-size:9px;color:#94a3b8;text-transform:uppercase;">CV (Variación Costo)</div>' +
              '<div style="font-size:16px;font-weight:700;color:' + (CV >= 0 ? '#10b981' : '#ef4444') + ';margin-top:2px;">' + (CV >= 0 ? '+' : '') + fmt(CV) + 'h</div>' +
            '</div>' +
            '<div style="background:rgba(30,41,59,0.5);border-radius:10px;padding:10px;text-align:center;">' +
              '<div style="font-size:9px;color:#94a3b8;text-transform:uppercase;">SV (Variación Tiempo)</div>' +
              '<div style="font-size:16px;font-weight:700;color:' + (SV >= 0 ? '#10b981' : '#ef4444') + ';margin-top:2px;">' + (SV >= 0 ? '+' : '') + fmt(SV) + 'h</div>' +
            '</div>' +
          '</div>' +

          '<!-- 3. GAUGES SPI y CPI -->' +
          '<div style="font-size:11px;color:#8b5cf6;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">📈 Índices de Desempeño</div>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">' +
            '<div style="background:rgba(30,41,59,0.5);border-radius:12px;padding:14px;text-align:center;">' +
              '<div style="position:relative;width:90px;height:90px;margin:0 auto;">' +
                '<canvas id="gauge-spi" width="90" height="90"></canvas>' +
                '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:22px;font-weight:800;color:#fff;">' + SPI.toFixed(2) + '</div>' +
              '</div>' +
              '<div style="font-size:10px;color:#94a3b8;margin-top:6px;">SPI (Ritmo)</div>' +
              '<div style="font-size:10px;color:' + (SPI >= 0.95 ? '#10b981' : SPI >= 0.85 ? '#f59e0b' : '#ef4444') + ';font-weight:600;margin-top:2px;">' + (SPI >= 0.95 ? '✅ En ritmo' : SPI >= 0.85 ? '⚠️ Retraso' : '🔴 Crítico') + '</div>' +
            '</div>' +
            '<div style="background:rgba(30,41,59,0.5);border-radius:12px;padding:14px;text-align:center;">' +
              '<div style="position:relative;width:90px;height:90px;margin:0 auto;">' +
                '<canvas id="gauge-cpi" width="90" height="90"></canvas>' +
                '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:22px;font-weight:800;color:#fff;">' + CPI.toFixed(2) + '</div>' +
              '</div>' +
              '<div style="font-size:10px;color:#94a3b8;margin-top:6px;">CPI (Eficiencia)</div>' +
              '<div style="font-size:10px;color:' + (CPI >= 0.95 ? '#10b981' : CPI >= 0.85 ? '#f59e0b' : '#ef4444') + ';font-weight:600;margin-top:2px;">' + (CPI >= 0.95 ? '✅ Eficiente' : CPI >= 0.85 ? '⚠️ Sobrecosto' : '🔴 Crítico') + '</div>' +
            '</div>' +
          '</div>' +

          '<!-- 4. PRONÓSTICOS (filas alineadas) -->' +
          '<div style="font-size:11px;color:#8b5cf6;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">🔮 Pronósticos</div>' +
          '<div style="background:rgba(30,41,59,0.4);border-radius:12px;padding:14px;margin-bottom:16px;">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);">' +
              '<div style="font-size:10px;color:#94a3b8;text-transform:uppercase;">EAC (Estimado Final)</div>' +
              '<div style="font-size:16px;font-weight:700;color:#f59e0b;">' + fmt(EAC) + 'h</div>' +
            '</div>' +
            '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);">' +
              '<div style="font-size:10px;color:#94a3b8;text-transform:uppercase;">ETC (Por Completar)</div>' +
              '<div style="font-size:16px;font-weight:700;color:#3b82f6;">' + fmt(ETC) + 'h</div>' +
            '</div>' +
            '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);">' +
              '<div style="font-size:10px;color:#94a3b8;text-transform:uppercase;">VAC (Variación Final)</div>' +
              '<div style="font-size:16px;font-weight:700;color:' + (VAC >= 0 ? '#10b981' : '#ef4444') + ';">' + (VAC >= 0 ? '+' : '') + fmt(VAC) + 'h</div>' +
            '</div>' +
            '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;">' +
              '<div style="font-size:10px;color:#94a3b8;text-transform:uppercase;">TCPI (Eficiencia Necesaria)</div>' +
              '<div style="font-size:16px;font-weight:700;color:' + (TCPI <= 1 ? '#10b981' : '#ef4444') + ';">' + TCPI.toFixed(2) + '</div>' +
            '</div>' +
            (TCPI > 1 ? '<div style="margin-top:10px;padding:8px;background:rgba(239,68,68,0.1);border-radius:8px;font-size:10px;color:#ef4444;text-align:center;">⚠️ Se requiere eficiencia de ' + TCPI.toFixed(2) + ' para completar dentro del presupuesto</div>' : '') +
          '</div>' +

          '<!-- 5. ANÁLISIS DE RIESGO -->' +
          '<div style="font-size:11px;color:#8b5cf6;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">⚠️ Análisis de Riesgo</div>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:16px;">' +
            '<div style="background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.3);border-radius:10px;padding:10px;text-align:center;">' +
              '<div style="font-size:20px;font-weight:800;color:#ef4444;">' + criticas + '</div>' +
              '<div style="font-size:9px;color:#94a3b8;">Críticas</div>' +
            '</div>' +
            '<div style="background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.3);border-radius:10px;padding:10px;text-align:center;">' +
              '<div style="font-size:20px;font-weight:800;color:#f59e0b;">' + enRiesgo + '</div>' +
              '<div style="font-size:9px;color:#94a3b8;">En Riesgo</div>' +
            '</div>' +
            '<div style="background:rgba(139,92,246,0.12);border:1px solid rgba(139,92,246,0.3);border-radius:10px;padding:10px;text-align:center;">' +
              '<div style="font-size:20px;font-weight:800;color:#8b5cf6;">' + atrasadas + '</div>' +
              '<div style="font-size:9px;color:#94a3b8;">Atrasadas</div>' +
            '</div>' +
          '</div>' +

          '<!-- 6. TENDENCIA EVM (CON ALTURA FIJA) -->' +
          '<div style="font-size:11px;color:#8b5cf6;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">📈 Tendencia EVM (últimos 6 periodos)</div>' +
          '<div style="background:rgba(30,41,59,0.4);border-radius:12px;padding:12px;margin-bottom:16px;">' +
            '<div style="height:140px;position:relative;">' +
              '<canvas id="tendencia-evm-chart"></canvas>' +
            '</div>' +
            '<div style="display:flex;justify-content:center;gap:16px;margin-top:10px;font-size:10px;">' +
              '<span style="color:#3b82f6;">● PV Planificado</span>' +
              '<span style="color:#10b981;">● EV Ganado</span>' +
              '<span style="color:#ef4444;">● AC Real</span>' +
            '</div>' +
          '</div>' +

          '<!-- 7. RESUMEN OPERATIVO -->' +
          '<div style="font-size:11px;color:#8b5cf6;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">📋 Resumen Operativo</div>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">' +
            '<div style="background:rgba(16,185,129,0.12);border-radius:10px;padding:10px;text-align:center;">' +
              '<div style="font-size:18px;font-weight:700;color:#10b981;">' + completadas + '</div>' +
              '<div style="font-size:9px;color:#94a3b8;">✅ Completadas</div>' +
            '</div>' +
            '<div style="background:rgba(59,130,246,0.12);border-radius:10px;padding:10px;text-align:center;">' +
              '<div style="font-size:18px;font-weight:700;color:#3b82f6;">' + enProgreso + '</div>' +
              '<div style="font-size:9px;color:#94a3b8;">🔄 En Progreso</div>' +
            '</div>' +
            '<div style="background:rgba(245,158,11,0.12);border-radius:10px;padding:10px;text-align:center;">' +
              '<div style="font-size:18px;font-weight:700;color:#f59e0b;">' + pendientes + '</div>' +
              '<div style="font-size:9px;color:#94a3b8;">⏳ Pendientes</div>' +
            '</div>' +
            '<div style="background:rgba(239,68,68,0.12);border-radius:10px;padding:10px;text-align:center;">' +
              '<div style="font-size:18px;font-weight:700;color:#ef4444;">' + atrasadas + '</div>' +
              '<div style="font-size:9px;color:#94a3b8;">🔴 Atrasadas</div>' +
            '</div>' +
          '</div>' +

          '<!-- Barra de progreso general -->' +
          '<div style="margin-top:16px;background:rgba(30,41,59,0.5);border-radius:10px;padding:12px;">' +
            '<div style="display:flex;justify-content:space-between;margin-bottom:6px;">' +
              '<span style="font-size:10px;color:#94a3b8;">Progreso General</span>' +
              '<span style="font-size:10px;color:#fff;font-weight:600;">' + (ts.length > 0 ? Math.round((completadas / ts.length) * 100) : 0) + '%</span>' +
            '</div>' +
            '<div style="background:#1e293b;height:6px;border-radius:3px;overflow:hidden;">' +
              '<div style="width:' + (ts.length > 0 ? (completadas / ts.length) * 100 : 0) + '%;height:100%;background:linear-gradient(90deg,#8b5cf6,#3b82f6);border-radius:3px;"></div>' +
            '</div>' +
          '</div>' +

          '<!-- Ubicaciones -->' +
          '<div style="font-size:13px;color:#e2e8f0;font-weight:700;margin:16px 0 12px 0;">📍 Ubicaciones (' + cs.length + ')</div>' +
          '<div style="max-height:200px;overflow-y:auto;padding-right:8px;">' + tablaHTML + '</div>';
      }

      // Dibujar gauges después de que el DOM esté listo
      setTimeout(function() {
        drawGaugeSaludM3D('gauge-salud', scoreSalud);
        drawGaugeM3D('gauge-spi', SPI, 1.5, SPI >= 0.95 ? '#10b981' : SPI >= 0.85 ? '#f59e0b' : '#ef4444');
        drawGaugeM3D('gauge-cpi', CPI, 1.5, CPI >= 0.95 ? '#10b981' : CPI >= 0.85 ? '#f59e0b' : '#ef4444');
        drawTendenciaEVM('tendencia-evm-chart', totalPV, totalEV, totalAC);
      }, 150);

      if (mapInstanceM3D) mapInstanceM3D.remove();
      if (window.L) {
        mapInstanceM3D = L.map('leaflet-map-m3d', { zoomControl: false, attributionControl: false }).setView([20, 0], 2);
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19 }).addTo(mapInstanceM3D);

        var latlngs = [];
        cs.forEach(function(c) {
          latlngs.push(c.c);
          L.circleMarker(c.c, { radius: 15, fillColor: '#34d399', color: 'transparent', fillOpacity: 0.2 }).addTo(mapInstanceM3D);
          L.circleMarker(c.c, { radius: 6, fillColor: '#34d399', color: '#fff', weight: 2, fillOpacity: 1 }).addTo(mapInstanceM3D)
           .bindTooltip('<div style="background:#0f172a;color:#fbbf24;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:bold;border:1px solid #fbbf24;">' + c.n + '</div>', {permanent: true, direction: 'top', className: 'custom-tooltip'});
        });
        
        if (latlngs.length > 1) {
          for (var i = 0; i < latlngs.length; i++) {
            for (var j = i + 1; j < latlngs.length; j++) {
              L.polyline([latlngs[i], latlngs[j]], { color: '#fbbf24', weight: 2, opacity: 0.6, dashArray: '5, 10' }).addTo(mapInstanceM3D);
            }
          }
        }
        if (latlngs.length > 0) mapInstanceM3D.fitBounds(L.latLngBounds(latlngs), { padding: [50, 50], maxZoom: 6 });
        
        mapInstanceM3D.on('click', function(e) {
          var nombre = prompt('📍 Nueva ubicación exacta\n\nCoordenadas: ' + e.latlng.lat.toFixed(4) + ', ' + e.latlng.lng.toFixed(4) + '\n\nEscribe un nombre para este punto (ej. "El Barbecho 10"):');
          if (nombre && nombre.trim() !== '') {
            var actuales = getUbicM3D(p);
            actuales.push({ n: nombre.trim(), c: [e.latlng.lat, e.latlng.lng] });
            localStorage.setItem('ubic3d_' + (p.name || p.nombre || 'default'), JSON.stringify(actuales));
            actualizarInterfazM3D(p);
          }
        });
        setTimeout(function() { mapInstanceM3D.invalidateSize(); }, 300);
      }
    } catch (err) {
      console.error('Error M3D:', err);
      var sbC = document.getElementById('m3d-sb-content');
      if (sbC) sbC.innerHTML = '<div style="color:#ef4444; padding: 20px;">Error: ' + err.message + '</div>';
    }
  }

  function abrirModalUbicacionesM3D(overlay, proyecto) {
    var modal = document.createElement('div');
    modal.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:99999;';
    var content = document.createElement('div');
    content.style.cssText = 'background:#0f172a;border-radius:24px;padding:30px;max-width:700px;width:90%;max-height:85vh;display:flex;flex-direction:column;border:1px solid rgba(251,191,36,0.3);box-shadow:0 20px 50px rgba(0,0,0,0.5);';
    
    content.innerHTML = 
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">' +
        '<h2 style="font-size:20px;color:#fff;margin:0;">📍 Gestor de Ubicaciones (Offline)</h2>' +
        '<button id="m3d-close-modal" style="background:rgba(239,68,68,0.1);border:1px solid #ef4444;color:#ef4444;width:36px;height:36px;border-radius:50%;cursor:pointer;">✕</button>' +
      '</div>' +
      '<div style="display:flex;gap:10px;margin-bottom:15px;">' +
        '<input type="text" id="m3d-search-input" placeholder="Busca país o ciudad (ej. México, Madrid)" style="flex:1;background:#1e293b;border:1px solid #475569;color:#fff;padding:12px 16px;border-radius:10px;font-size:14px;outline:none;">' +
        '<button id="m3d-search-btn" style="background:#fbbf24;color:#0a0a1a;border:none;padding:0 24px;border-radius:10px;font-weight:700;cursor:pointer;transition:all 0.2s;">🔍 Buscar</button>' +
      '</div>' +
      '<div style="font-size:11px;color:#64748b;margin-bottom:20px;">💡 Para una dirección exacta, cierra esto y haz <b>clic directo en el mapa</b>.</div>' +
      '<div id="m3d-search-results" style="margin-bottom:20px; display:none;"></div>' +
      '<div style="font-size:13px;color:#e2e8f0;font-weight:700;margin-bottom:10px;">Ubicaciones Configuradas</div>' +
      '<div style="flex:1;overflow-y:auto;padding-right:8px;" id="m3d-ubi-list"></div>';
      
    modal.appendChild(content);
    overlay.appendChild(modal);
    
    function renderLista() {
      var lista = content.querySelector('#m3d-ubi-list');
      var actuales = getUbicM3D(proyecto);
      if (actuales.length === 0) {
        lista.innerHTML = '<div style="color:#64748b;font-size:13px;text-align:center;padding:20px;">No hay ubicaciones guardadas.</div>';
        return;
      }
      lista.innerHTML = actuales.map(function(c, i) {
        return '<div style="display:flex;justify-content:space-between;align-items:center;background:#1e293b;padding:12px 16px;border-radius:10px;margin-bottom:8px;">' +
          '<div style="font-size:14px;color:#fff;font-weight:600;">📍 ' + c.n + '</div>' +
          '<button class="m3d-del-btn" data-idx="' + i + '" style="background:rgba(239,68,68,0.2);border:none;color:#ef4444;padding:6px 12px;border-radius:8px;cursor:pointer;font-size:12px;font-weight:bold;">Eliminar</button>' +
        '</div>';
      }).join('');
      lista.querySelectorAll('.m3d-del-btn').forEach(function(btn) {
        btn.onclick = function() {
          var arr = getUbicM3D(proyecto);
          arr.splice(parseInt(this.getAttribute('data-idx')), 1);
          localStorage.setItem('ubic3d_' + (proyecto.name || proyecto.nombre || 'default'), JSON.stringify(arr));
          renderLista(); actualizarInterfazM3D(proyecto);
        };
      });
    }
    renderLista();
    
    content.querySelector('#m3d-close-modal').onclick = function() { modal.remove(); };
    
    content.querySelector('#m3d-search-btn').onclick = function() {
      var qRaw = content.querySelector('#m3d-search-input').value.trim();
      var resDiv = content.querySelector('#m3d-search-results');
      if (!qRaw) return;
      var q = normalizarM3D(qRaw);
      var ciudadesEncontradas = DB_CIUDADES_M3D.filter(function(c) { return normalizarM3D(c.n).includes(q) || normalizarM3D(c.r).includes(q); });
      
      if (ciudadesEncontradas.length === 0) {
        resDiv.style.display = 'block';
        resDiv.innerHTML = '<div style="color:#ef4444; font-size:13px; background:rgba(239,68,68,0.1); padding:12px; border-radius:8px;">No se encontraron resultados. Usa el clic directo en el mapa.</div>';
        return;
      }

      resDiv.style.display = 'block';
      resDiv.innerHTML = '<div style="font-size:11px; color:#34d399; margin-bottom:6px; font-weight:bold;">🏙️ Resultados:</div>' +
        ciudadesEncontradas.map(function(c) {
          return '<div class="m3d-add-result" data-lat="' + c.c[0] + '" data-lng="' + c.c[1] + '" data-n="' + c.n + '" style="background:rgba(52,211,153,0.1); border:1px solid rgba(52,211,153,0.3); padding:10px 14px; border-radius:8px; margin-bottom:6px; cursor:pointer; display:flex; justify-content:space-between; align-items:center;">' +
            '<div style="color:#fff; font-size:13px;">📍 ' + c.n + ' <span style="color:#94a3b8; font-size:11px;">(' + c.r + ')</span></div>' +
            '<button style="background:#34d399; color:#0a0a1a; border:none; padding:4px 12px; border-radius:20px; font-weight:bold; font-size:11px; pointer-events:none;">Añadir</button>' +
          '</div>';
        }).join('');

      resDiv.querySelectorAll('.m3d-add-result').forEach(function(el) {
        el.onmouseenter = function() { this.style.opacity = '0.8'; };
        el.onmouseleave = function() { this.style.opacity = '1'; };
        el.onclick = function() {
          var n = this.getAttribute('data-n');
          var lat = parseFloat(this.getAttribute('data-lat'));
          var lng = parseFloat(this.getAttribute('data-lng'));
          var arr = getUbicM3D(proyecto);
          if (!arr.find(function(x) { return x.n === n; })) {
            arr.push({ n: n, c: [lat, lng] });
            localStorage.setItem('ubic3d_' + (proyecto.name || proyecto.nombre || 'default'), JSON.stringify(arr));
            renderLista(); actualizarInterfazM3D(proyecto);
            resDiv.style.display = 'none';
            content.querySelector('#m3d-search-input').value = '';
          }
        };
      });
    };
  }

  bUbi.onclick = function() { abrirModalUbicacionesM3D(ov, proy); };
  
  select.onchange = function() {
    idx = parseInt(this.value, 10);
    try { localStorage.setItem('selectedProjectIndex', String(idx)); } catch(e) {}
    proy = proyectos[idx];
    actualizarInterfazM3D(proy);
  };

  function checkLibs() {
    if (window.L && window.Chart) { actualizarInterfazM3D(proy); } 
    else { setTimeout(checkLibs, 100); }
  }
  checkLibs();
};

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
  estrategia: window.generarReporteEstrategia,
  mapa3d: window.generarReporteMapa3D
};

// ✅ CAMBIO 6: recordar qué reporte se abrió
document.addEventListener('click', function(e) {
  const tarjeta = e.target.closest('.reporte-tarjeta');
  if (tarjeta && tarjeta.dataset.reporte && window.reportesEjecutivos[tarjeta.dataset.reporte]) {
    window.ultimoReporteId = tarjeta.dataset.reporte;
    try { localStorage.setItem('ultimoReporteEjecutado', tarjeta.dataset.reporte); } catch (err) {}
    window.reportesEjecutivos[tarjeta.dataset.reporte]();
    const modal = document.getElementById('modalReportesEjecutivos');
    if (modal) modal.remove();
  }
});

window.addEventListener('message', function(e) {
  const d = e.data;
  if (!d || d.tipo !== 'cambiarProyectoReporte') return;
  cambiarProyecto(parseInt(d.index, 10));
  const id = d.reporte || window.ultimoReporteId;
  if (id && window.reportesEjecutivos[id]) window.reportesEjecutivos[id]();
});

// ============================================
// 🌐 INICIALIZACIÓN CUANDO EL DOM ESTÉ LISTO
// ============================================
function iniciar() {
  agregarBotonReportesSidebar();
  console.log('✅ 21 REPORTES EJECUTIVOS CON TRADUCCIÓN COMPLETA ES/EN + MAPA 3D ACTIVOS');
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciar);
} else {
  iniciar();
}
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
})();