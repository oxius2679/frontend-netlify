/**
 * ============================================================
 *  👑 EXECUTIVE SUITE — C-SUITE COMMAND CENTER v1.0
 * ============================================================
 *  8 módulos ejecutivos de nivel enterprise:
 *  1. Portafolio Financiero (CFO)
 *  2. OKRs & Estrategia (CEO)
 *  3. Capacity Planning (COO)
 *  4. Business Intelligence
 *  5. Governance & Compliance
 *  6. Enterprise Integrations
 *  7. Advanced Finance
 *  8. Executive Experience
 *
 *  Archivo 100% autocontenido. NO modifica código existente.
 *
 *  Uso en index.html (antes de </body>):
 *      <script src="executive-suite.js"></script>
 * ============================================================
 */
(function () {
  'use strict';

  const CFG = {
    name: 'Executive Suite',
    version: '1.0.0',
    autoRefreshMs: 30000,
    currency: 'EUR',
    locale: 'es-ES'
  };


  /* ==========================================================
     SECCIÓN 0.5 · INTERNACIONALIZACIÓN (i18n)
     ========================================================== */
  function getLang() {
    return localStorage.getItem('zacky_lang') || 'es';
  }

  const I18N = {
    es: {
      // Sidebar
      nav_section_title: 'Módulos C-Suite',

      // 8 Módulos - Labels
      nav_portfolio: 'Portafolio Financiero',
      nav_okrs: 'OKRs y Estrategia',
      nav_capacity: 'Planificación de Capacidad',
      nav_bi: 'Inteligencia de Negocio',
      nav_governance: 'Gobernanza y Cumplimiento',
      nav_integrations: 'Integraciones',
      nav_finance: 'Finanzas Avanzadas',
      nav_experience: 'Experiencia Ejecutiva',

      // 8 Módulos - Subtitles
      sub_portfolio: 'Consolidado de todos los proyectos',
      sub_okrs: 'Alineación estratégica',
      sub_capacity: 'Gestión de recursos',
      sub_bi: 'Reportes avanzados',
      sub_governance: 'Auditoría y riesgos',
      sub_integrations: 'SSO, API, Webhooks',
      sub_finance: 'Facturación y márgenes',
      sub_experience: 'Vista C-Suite',

            // Topbar
      btn_refresh: '🔄 Actualizar',
      btn_export: '📄 Exportar',
      btn_close: '✕ Cerrar',

      // ═══════════ MÓDULO 1: PORTAFOLIO FINANCIERO ═══════════
      p1_no_projects: 'No hay proyectos disponibles',
      p1_word_projects: 'proyectos',
      p1_word_consumed: 'consumido',
      p1_word_of_budget: 'del presupuesto',
      p1_kpi_bac: 'BAC Total',
      p1_kpi_ac: 'Costo Real (AC)',
      p1_kpi_ev: 'Valor Ganado (EV)',
      p1_kpi_cpi: 'CPI Global',
      p1_kpi_eac: 'EAC Proyectado',
      p1_kpi_vac: 'VAC Proyectado',
      p1_kpi_margin: 'Margen Proyectado',
      p1_kpi_spi: 'SPI Global',
      p1_status_efficient: 'Eficiente',
      p1_status_tolerance: 'En tolerancia',
      p1_status_overcost: 'Sobrecosto',
      p1_status_ahead: 'Adelantado',
      p1_status_ontime: 'En tiempo',
      p1_status_delayed: 'Retrasado',
      p1_eac_sub: 'Estimado al cierre',
      p1_vac_saving: 'Ahorro',
      p1_vac_overcost: 'Sobrecosto',
      p1_margin_sub: 'del BAC',
      p1_health_title: 'Distribución por Salud del Portafolio',
      p1_health_saludable: 'Saludable',
      p1_health_aceptable: 'Aceptable',
      p1_health_riesgo: 'En riesgo',
      p1_health_critico: 'Crítico',
      p1_projects_detail: 'Detalle por Proyecto',
      p1_col_project: 'Proyecto',
      p1_col_margin: 'Margen',
      p1_col_health: 'Salud',
      p1_total_portfolio: 'TOTAL PORTAFOLIO',
      p1_burn_title: 'Burn Rate & Runway',
      p1_per_day: '/día',
      p1_runway: 'Runway',
      p1_days: 'días',
      p1_top_margin: 'Top Proyectos por Margen',
            p1_tasks_word: 'tareas',
      p1_completed: 'completado',

      // ═══════════ MÓDULO 2: OKRs Y ESTRATEGIA ═══════════
      p2_no_projects: 'No hay proyectos disponibles',
      p2_scorecard_title: 'Cuadro de Mando Integral · Salud Estratégica Global',
      p2_score_label: 'Puntuación Estratégica / 100',
      p2_score_excellent: '🟢 Excelente',
      p2_score_stable: '🟡 Estable',
      p2_score_needs_action: '🔴 Requiere acción',
      p2_persp_financiera: 'Perspectiva Financiera',
      p2_persp_cliente: 'Perspectiva Cliente',
      p2_persp_procesos: 'Procesos Internos',
      p2_persp_aprendizaje: 'Aprendizaje y Crecimiento',
      p2_objectives_title: 'Objetivos Estratégicos Derivados',
      p2_progress_word: 'Progreso',
      p2_alignment_title: 'Matriz de Alineación Estratégica',
      p2_col_project: 'Proyecto',
      p2_col_alignment: 'Alineación',
      p2_col_impact: 'Impacto Estratégico',
      p2_col_priority: 'Prioridad',
      p2_col_recommendation: 'Recomendación',
      p2_forecast_title: 'Previsión Estratégica 12 meses',
      p2_decisions_title: 'Decisiones Estratégicas Recomendadas',

      // Insights scorecard
      p2_ins_fin_estable: 'Situación estable',
      p2_ins_fin_solidas: 'Finanzas sólidas',
      p2_ins_fin_ajustado: 'Margen ajustado',
      p2_ins_fin_intervencion: 'Requiere intervención',
      p2_ins_cli_moderada: 'Satisfacción moderada',
      p2_ins_cli_satisfechos: 'Clientes satisfechos',
      p2_ins_cli_atencion: 'Atención requerida',
      p2_ins_cli_riesgo: 'Riesgo de insatisfacción',
      p2_ins_pro_funcionales: 'Procesos funcionales',
      p2_ins_pro_excelencia: 'Excelencia operativa',
      p2_ins_pro_oportunidades: 'Oportunidades de mejora',
      p2_ins_pro_reingenieria: 'Reingeniería necesaria',
      p2_ins_apr_productivo: 'Equipo productivo',
      p2_ins_apr_alto: 'Alto desempeño',
      p2_ins_apr_continuo: 'Aprendizaje continuo',
      p2_ins_apr_formacion: 'Requiere formación',

      // Objetivos (títulos, descripciones y acciones)
      p2_obj1_title: 'Optimizar eficiencia de costos (CPI ≥ 1.00)',
      p2_obj1_desc: 'Actualmente el CPI global es {cpi}. Objetivo: recuperar el margen y alcanzar eficiencia financiera sostenible.',
      p2_obj1_action_ok: 'Mantener el control actual',
      p2_obj1_action_ko: 'Auditoría de horas y revisión de alcance',
      p2_obj2_title: 'Alinear el cronograma (SPI ≥ 1.00)',
      p2_obj2_desc: 'SPI global: {spi}. Objetivo: ejecutar al ritmo planificado y recuperar retrasos acumulados.',
      p2_obj2_action_ok: 'Mantener velocidad',
      p2_obj2_action_ko: 'Fast-tracking en ruta crítica',
      p2_obj3_title: 'Alcanzar margen positivo del portafolio',
      p2_obj3_desc: 'Margen actual: {margen} ({margenPct}). Objetivo: reducir sobrecostos y proteger rentabilidad.',
      p2_obj3_action_ok: 'Documentar prácticas exitosas',
      p2_obj3_action_ko: 'Renegociar contratos y revisar estimaciones',
      p2_obj4_title: 'Reducir tareas rezagadas a < 5%',
      p2_obj4_desc: 'Actualmente {rezagadas} de {total} tareas están rezagadas ({pct}). Objetivo: cero rezagos críticos.',
      p2_obj4_action_ok: 'Mantener seguimiento',
      p2_obj4_action_ko: 'Reasignación de recursos y revisión de dependencias',
      p2_obj5_title: 'Consolidar el portafolio activo',
      p2_obj5_desc: '{activos} proyectos activos. Objetivo: escalar a {target} proyectos con el mismo equipo.',
            p2_obj5_action: 'Estandarizar procesos y automatizar reportes',

      // Estados de objetivos
      p2_estado_logrado: 'Logrado',
      p2_estado_en_curso: 'En curso',
      p2_estado_riesgo: 'Riesgo',
      p2_estado_critico: 'Crítico',

      // Prioridades (alineación)
      p2_priority_critica: 'Crítica',
      p2_priority_alta: 'Alta',
      p2_priority_media: 'Media',
      p2_priority_baja: 'Baja',

      // Impacto estratégico
      p2_impact_nulo: 'Nulo',
      p2_impact_bajo: 'Bajo',
      p2_impact_medio: 'Medio',
      p2_impact_alto: 'Alto',

      // Recomendaciones de alineación
      p2_rec_define_scope: 'Definir alcance o archivar',
      p2_rec_maintain: 'Mantener monitoreo',
      p2_rec_immediate: 'Intervención ejecutiva inmediata',
      p2_rec_recovery: 'Plan de recuperación en 7 días',

      // Forecast trimestres
      p2_q1_desc: 'Recuperación del margen actual',
      p2_q2_desc: 'Consolidación del portafolio',
      p2_q3_desc: 'Escalado del equipo',
      p2_q4_desc: 'Nuevos mercados',

      // Decisiones del forecast
      p2_dec1_title_urgent: 'Auditoría financiera urgente',
      p2_dec1_title_optimize: 'Optimización del margen',
      p2_dec1_detail_urgent: 'Sobrecosto detectado en el portafolio. Revisar estimaciones, horas facturables y alcance de los proyectos en riesgo.',
      p2_dec1_detail_optimize: 'El portafolio es rentable. Documentar prácticas exitosas para replicar.',
      p2_dec2_title: 'Priorizar proyectos con mayor alineación',
      p2_dec2_detail: 'Enfocar recursos en proyectos con CPI/SPI ≥ 0.95 para maximizar el retorno del portafolio.',
      p2_dec3_title_clean: 'Decidir sobre proyectos sin alcance',
      p2_dec3_title_scale: 'Revisar oportunidades de escalado',
      p2_dec3_detail_clean: 'Hay {count} proyectos sin tareas. Definir alcance o archivar para no distorsionar métricas.',
                  p2_dec3_detail_scale: 'La estructura actual permite añadir 2 proyectos más con el equipo existente.',

      // ═══════════ MÓDULO 3: CAPACITY PLANNING ═══════════
      p3_no_projects: 'No hay proyectos disponibles',
      p3_no_team: 'No hay asignaciones de equipo registradas en los proyectos',
      p3_kpi_total_team: 'Equipo Total',
      p3_kpi_total_team_sub: 'personas asignadas',
      p3_kpi_avg_util: 'Utilización Media',
      p3_kpi_avg_util_optimal: 'Óptima',
      p3_kpi_avg_util_ok: 'Aceptable',
      p3_kpi_avg_util_low: 'Baja',
      p3_kpi_overloaded: 'Sobrecargados',
      p3_kpi_overloaded_sub: 'personas > 100%',
      p3_kpi_bench: 'En Bench',
      p3_kpi_bench_sub: 'sin asignación activa',
      p3_distribution_title: 'Distribución por Nivel de Carga',
      p3_load_overloaded: 'Sobrecargados',
      p3_load_high: 'Alta carga',
      p3_load_optimal: 'Óptimos',
      p3_load_available: 'Disponibles',
      p3_load_bench: 'En bench',
      p3_top_title: '🔥 Top Personas por Carga',
      p3_active_tasks: 'tareas activas',
      p3_hours_assigned: 'h asignadas',
      p3_bench_title: '💤 Personas en Bench / Disponibles',
      p3_all_assigned: '✅ Todo el equipo está asignado a tareas activas',
      p3_no_active: 'Sin asignación activa',
      p3_tasks_word: 'tareas',
      p3_load_word: 'carga',
      p3_badge_bench: 'BENCH',
      p3_badge_available: 'DISPONIBLE',
      p3_project_load_title: 'Carga por Proyecto',
      p3_col_project: 'Proyecto',
      p3_col_people: 'Personas',
      p3_col_hours_assigned: 'Horas Asignadas',
      p3_col_hours_logged: 'Horas Registradas',
      p3_col_pct_progress: '% Avance',
      p3_col_active_tasks: 'Tareas Activas',
      p3_col_load: 'Carga',
      p3_forecast_title: 'Previsión de Necesidades (próximos 6 meses)',
      p3_forecast_people_needed: 'personas necesarias',
      p3_forecast_optimal: 'Capacidad óptima',
      p3_forecast_hire_singular: '+1 contratación',
            p3_forecast_hire_plural: '+{count} contrataciones',
            p3_forecast_sufficient: 'Equipo suficiente',

      // ═══════════ MÓDULO 4: BUSINESS INTELLIGENCE ═══════════
      p4_no_data: 'No hay datos para analizar',
      p4_kpi_available: 'Reportes Disponibles',
      p4_kpi_available_sub: 'plantillas ejecutivas',
      p4_kpi_active: 'Proyectos Activos',
      p4_kpi_active_sub: 'de {total} totales',
      p4_kpi_insights: 'Insights Generados',
      p4_kpi_insights_sub: 'análisis automáticos',
      p4_kpi_processed: 'Datos Procesados',
      p4_kpi_processed_sub: 'tareas analizadas',
      p4_reports_title: 'Reportes Ejecutivos Disponibles',
      p4_generate: 'GENERAR →',

      // Reportes
      p4_rep_ejecutivo: 'Reporte Ejecutivo',
      p4_rep_ejecutivo_desc: 'Resumen C-Suite de KPIs y estado',
      p4_rep_financiero: 'Reporte Financiero',
      p4_rep_financiero_desc: 'Costos, márgenes y proyecciones',
      p4_rep_cronograma: 'Reporte de Cronograma',
      p4_rep_cronograma_desc: 'SPI, deadlines, tareas rezagadas',
      p4_rep_equipo: 'Reporte de Equipo',
      p4_rep_equipo_desc: 'Carga, utilización y performance',
      p4_rep_riesgos: 'Reporte de Riesgos',
      p4_rep_riesgos_desc: 'Identificación y mitigación',
      p4_rep_comparativo: 'Reporte Comparativo',
      p4_rep_comparativo_desc: 'Benchmark entre proyectos',

      // Tendencias
      p4_trends_title: 'Tendencias Temporales (últimos 6 meses)',
      p4_trend_label_margin: 'Margen %',
      p4_trend_label_progress: 'Progreso %',
      p4_vs_prev_month: 'vs mes anterior',
      p4_auto_analysis: 'Análisis automático:',

      // Top / Bottom
      p4_top_title: 'Top Performers',
      p4_bottom_title: 'Requieren Atención',
      p4_no_data_enough: 'Sin datos suficientes',
      p4_score: 'SCORE',
      p4_delays_word: 'rezagos',

      // Benchmark
      p4_benchmark_title: 'Benchmark vs Media del Portafolio',
      p4_col_project: 'Proyecto',
      p4_col_vs_avg: 'vs Media',
      p4_col_margin: 'Margen %',
      p4_col_position: 'Posición',
      p4_pos_leader: 'Líder',
      p4_pos_laggard: 'Reagazado',
      p4_pos_mixed: 'Mixto',

      // Insights
      p4_insights_title: 'Insights Automáticos',
      p4_ins_alert: 'Alerta',
      p4_ins_excellence: 'Excelencia',
      p4_ins_balance: 'Equilibrio',
      p4_ins_hygiene: 'Higiene de datos',
      p4_ins_risk: 'Riesgo operativo',
      p4_ins_concentration: 'Concentración',
           p4_ins_efficiency: 'Eficiencia',

      // Textos de tendencias
      p4_trend_positive: 'El portafolio muestra tendencia positiva. El CPI ha mejorado {cpi}% y el SPI {spi}% en el último mes. Mantener el ritmo actual permitirá alcanzar los objetivos anuales.',
      p4_trend_negative: 'El portafolio muestra deterioro sostenido. El CPI cayó {cpi}% y el SPI {spi}% respecto al mes anterior. Se recomienda intervención inmediata en los proyectos de mayor impacto.',
      p4_trend_stable: 'El portafolio se mantiene estable con ligeras variaciones. El CPI varió {cpi}% y el SPI {spi}%. Continuar con monitoreo semanal para detectar desviaciones tempranas.',

      // Textos de insights
      p4_ins1_alert: 'El portafolio tiene un CPI de {cpi} y SPI de {spi}. Por debajo del umbral de tolerancia. Requiere plan de recuperación.',
      p4_ins1_excellence: 'El portafolio es financieramente eficiente (CPI {cpi}) y puntual (SPI {spi}). Oportunidad para escalar.',
      p4_ins1_balance: 'El portafolio está en zona de tolerancia. Pequeñas desviaciones corregibles con gestión proactiva.',
      p4_ins2_hygiene: '{count} proyecto(s) sin tareas definidas ({names}). Distorsionan las métricas agregadas. Definir alcance o archivar.',
      p4_ins3_risk: '{count} tarea(s) rezagadas ({pct}% del total). Priorizar su resolución para evitar impacto en cascada.',
      p4_ins4_concentration: 'El proyecto "{name}" representa el {pct}% del presupuesto total. Alto riesgo de concentración: diversificar cartera.',
      p4_ins5_efficiency: 'El equipo ha registrado {logged}h de {estimated}h planificadas ({pct}%).',
      p4_ins5_high_fidelity: ' Alta fidelidad de estimación.',
      p4_ins5_margin_optim: ' Margen de optimización disponible.',
            p4_ins5_review_estimates: ' Revisar estimaciones y registro de horas.',

      // ═══════════ UTILIDADES DE PDF EJECUTIVO ═══════════
      p4_pdf_brand: 'The Jacksons Solutions',
      p4_pdf_exec_intelligence: 'Executive Intelligence',
      p4_pdf_confidential: 'Confidencial',
      p4_pdf_page: 'Página',
      p4_pdf_date_label: 'Fecha',
      p4_pdf_projects_label: 'Proyectos',
      p4_pdf_active_word: 'activos',
      p4_pdf_budget_label: 'Presupuesto',

      // Estados de salud en el PDF
      p4_pdf_health_saludable: 'Saludable',
      p4_pdf_health_aceptable: 'Aceptable',
      p4_pdf_health_riesgo: 'En riesgo',
            p4_pdf_health_critico: 'Crítico',

      // ═══════════ REPORTE 1: EJECUTIVO ═══════════
      p4_r1_title: 'Reporte Ejecutivo',
      p4_r1_subtitle: 'Análisis consolidado del portafolio y estado estratégico de los proyectos activos.',
      p4_r1_page1_title: 'Resumen Ejecutivo',
      p4_r1_page1_meta: 'Dashboard Consolidado',
      p4_r1_story: 'El portafolio gestiona {count} proyectos activos con un presupuesto total de {bac}. El desempeño financiero global muestra un CPI de {cpi} {cpiStatus}, mientras que el cronograma presenta un SPI de {spi}. El margen proyectado al cierre es de {margen} ({margenPct}).',
      p4_r1_cpi_above: 'por encima del objetivo',
      p4_r1_cpi_tolerance: 'en zona de tolerancia',
      p4_r1_cpi_attention: 'requiriendo atención ejecutiva',
      p4_r1_kpi_section: 'Indicadores Clave del Portafolio',
      p4_r1_kpi_budget: 'Presupuesto Total',
      p4_r1_kpi_budget_sub: '{count} proyectos activos',
      p4_r1_kpi_ev: 'Valor Ganado',
      p4_r1_kpi_ev_sub: '{pct} completado',
      p4_r1_kpi_ac: 'Costo Real',
      p4_r1_kpi_ac_sub: '{pct} consumido',
      p4_r1_kpi_margin: 'Margen Proyectado',
      p4_r1_health_section: 'Salud del Portafolio',
      p4_r1_gauge_progress: 'Progreso',
      p4_r1_bar_healthy: 'Saludable',
      p4_r1_bar_acceptable: 'Aceptable',
      p4_r1_bar_risk: 'En Riesgo',
      p4_r1_bar_critical: 'Crítico',
      p4_r1_page2_title: 'Desglose por Proyecto',
      p4_r1_page2_meta: 'Análisis Detallado',
      p4_r1_col_project: 'Proyecto',
      p4_r1_col_budget: 'Presupuesto',
      p4_r1_col_health: 'Salud',
      p4_r1_footer_total: 'PORTAFOLIO CONSOLIDADO',
            p4_r1_deviation_section: 'Análisis de Desviaciones',
      p4_r1_deviation_item: 'Sobrecosto proyectado de {vac}. El CPI de {cpi} indica que por cada euro invertido se generan solo {pct} céntimos de valor ganado. Requiere auditoría de costes.',
            p4_r1_no_deviations: '✅ Ningún proyecto presenta sobrecosto proyectado al cierre.',

      // ═══════════ REPORTE 2: FINANCIERO ═══════════
      p4_r2_title: 'Reporte Financiero',
      p4_r2_subtitle: 'Análisis exhaustivo de costes, márgenes y proyecciones financieras del portafolio.',
      p4_r2_page1_title: 'Estado Financiero',
      p4_r2_page1_meta: 'Análisis Consolidado',
      p4_r2_kpi_section: 'Resumen Financiero',
      p4_r2_kpi_budget: 'Presupuesto Total',
      p4_r2_kpi_budget_sub: 'Autorizado',
      p4_r2_kpi_ac: 'Costo Real',
      p4_r2_kpi_ac_sub: '{pct} consumido',
      p4_r2_kpi_eac: 'EAC Proyectado',
      p4_r2_kpi_eac_sub: 'Estimado al cierre',
      p4_r2_kpi_vac: 'VAC',
      p4_r2_kpi_vac_saving: 'Ahorro',
      p4_r2_kpi_vac_overcost: 'Sobrecosto',
      p4_r2_consumption_section: 'Consumo vs Presupuesto',
      p4_r2_bar_bac: 'Presupuesto (BAC)',
      p4_r2_bar_ac: 'Costo Real (AC)',
      p4_r2_bar_ev: 'Valor Ganado (EV)',
      p4_r2_bar_eac: 'Proyección Final (EAC)',
      p4_r2_page2_title: 'Desglose por Proyecto',
      p4_r2_page2_meta: 'Análisis Individual',
      p4_r2_col_project: 'Proyecto',
      p4_r2_col_margin: 'Margen %',
      p4_r2_footer_total: 'PORTAFOLIO CONSOLIDADO',
      p4_r2_analysis_section: 'Análisis Financiero',
      p4_r2_story_consumed: 'El portafolio ha consumido {pctConsumed} del presupuesto con un avance del {pctProgress}. El CPI de {cpi} indica que {cpiEval}. ',
      p4_r2_cpi_good: 'la eficiencia financiera supera el plan',
      p4_r2_cpi_bad: 'se está generando menos valor del esperado por cada euro invertido',
      p4_r2_margin_negative: 'El margen proyectado es negativo ({margen}), lo que requiere auditoría de costes inmediata.',
            p4_r2_margin_positive: 'El margen proyectado es positivo ({margen}).',

      // ═══════════ REPORTE 3: CRONOGRAMA ═══════════
      p4_r3_title: 'Reporte de Cronograma',
      p4_r3_subtitle: 'Estado de cumplimiento temporal, hitos y análisis de desviaciones del portafolio.',
      p4_r3_page1_title: 'Estado del Cronograma',
      p4_r3_page1_meta: 'Análisis Temporal',
      p4_r3_kpi_section: 'Indicadores de Cronograma',
      p4_r3_kpi_spi: 'SPI Global',
      p4_r3_spi_ontime: 'En tiempo',
      p4_r3_spi_tolerance: 'Tolerancia',
      p4_r3_spi_delayed: 'Retrasado',
      p4_r3_kpi_total: 'Total Tareas',
      p4_r3_kpi_total_sub: 'Portafolio',
      p4_r3_kpi_completed: 'Completadas',
      p4_r3_kpi_completed_sub: '{pct} del total',
      p4_r3_kpi_delayed: 'Rezagadas',
      p4_r3_kpi_delayed_sub: '{pct} del total',
      p4_r3_dist_section: 'Distribución de Tareas',
      p4_r3_gauge_progress: 'Progreso General',
      p4_r3_bar_completed: 'Completadas',
      p4_r3_bar_inprogress: 'En curso',
      p4_r3_bar_delayed: 'Rezagadas',
      p4_r3_bar_pending: 'Pendientes',
      p4_r3_page2_title: 'Proyectos con Rezagos',
      p4_r3_page2_meta: 'Análisis de Riesgos Temporales',
      p4_r3_col_project: 'Proyecto',
      p4_r3_col_delayed: 'Tareas Rezagadas',
      p4_r3_col_progress: 'Progreso',
      p4_r3_col_status: 'Estado',
      p4_r3_rec_section: 'Recomendaciones Ejecutivas',
      p4_r3_rec1_title: 'Fast-Tracking en Ruta Crítica',
      p4_r3_rec1_text: 'Priorizar tareas bloqueantes y añadir recursos a actividades críticas para recuperar el cronograma.',
      p4_r3_rec2_title: 'Revisión de Dependencias',
            p4_r3_rec2_text: 'Auditar dependencias entre tareas y eliminar cuellos de botella que ralentizan el avance.',

      // ═══════════ REPORTE 4: EQUIPO ═══════════
      p4_r4_title: 'Reporte de Equipo',
      p4_r4_subtitle: 'Distribución de carga, utilización y performance del equipo asignado al portafolio.',
      p4_r4_page1_title: 'Resumen del Equipo',
      p4_r4_page1_meta: 'Análisis de Recursos',
      p4_r4_kpi_section: 'Indicadores Clave',
      p4_r4_kpi_people: 'Personas Asignadas',
      p4_r4_kpi_people_sub: 'En el portafolio',
      p4_r4_kpi_hours_est: 'Horas Estimadas',
      p4_r4_kpi_hours_est_sub: 'Planificadas',
      p4_r4_kpi_hours_log: 'Horas Registradas',
      p4_r4_kpi_hours_log_sub: 'Reales',
      p4_r4_kpi_efficiency: 'Eficiencia',
      p4_r4_kpi_efficiency_sub: 'Registro vs estimación',
      p4_r4_detail_section: 'Detalle por Persona',
      p4_r4_col_person: 'Persona',
      p4_r4_col_tasks: 'Tareas',
      p4_r4_col_completed: 'Completadas',
      p4_r4_col_hours_est: 'Horas Est.',
      p4_r4_col_projects: 'Proyectos',
            p4_r4_footer_total: 'TOTAL EQUIPO',

      // ═══════════ REPORTE 5: RIESGOS ═══════════
      p4_r5_title: 'Reporte de Riesgos',
      p4_r5_subtitle: 'Identificación, evaluación y mitigación de riesgos del portafolio activo.',
      p4_r5_page1_title: 'Matriz de Riesgos',
      p4_r5_page1_meta: 'Análisis de Exposición',
      p4_r5_exposure_section: 'Exposición Total al Riesgo',
      p4_r5_exposure_label: 'Exposición Agregada del Portafolio',
      p4_r5_exposure_sub: 'Basado en {count} riesgos identificados · {high} de nivel alto o crítico',
      p4_r5_risks_section: 'Riesgos Identificados',
      p4_r5_exposure_word: 'Exposición:',
      p4_r5_mitigation_word: 'Mitigación:',
      p4_r5_level_critico: 'CRÍTICO',
      p4_r5_level_alto: 'ALTO',
      p4_r5_level_medio: 'MEDIO',
      p4_r5_level_bajo: 'BAJO',
      p4_r5_risk1_desc: 'Sobrecosto consolidado en el portafolio',
      p4_r5_risk1_action: 'Auditoría inmediata de horas y renegociación de contratos',
      p4_r5_risk2_desc: 'Retraso significativo en el cronograma',
      p4_r5_risk2_action: 'Fast-tracking en ruta crítica y refuerzo de recursos',
      p4_r5_risk3_desc: '{count} tareas rezagadas identificadas',
      p4_r5_risk3_action: 'Reasignación de recursos y revisión de dependencias',
      p4_r5_risk4_desc: '{count} proyectos sin alcance definido',
            p4_r5_risk4_action: 'Definir alcance o archivar para limpiar el portafolio',

      // ═══════════ REPORTE 6: COMPARATIVO ═══════════
      p4_r6_title: 'Reporte Comparativo',
      p4_r6_subtitle: 'Benchmarking interno del portafolio y ranking de desempeño ejecutivo.',
      p4_r6_page1_title: 'Ranking de Performance',
      p4_r6_page1_meta: 'Benchmark Interno',
      p4_r6_score_section: 'Score Comparativo (CPI + SPI)',
      p4_r6_table_section: 'Tabla Comparativa Detallada',
      p4_r6_col_num: '#',
      p4_r6_col_project: 'Proyecto',
      p4_r6_col_progress: 'Progreso',
      p4_r6_col_margin: 'Margen %',
      p4_r6_col_score: 'Score',
      p4_r6_analysis_section: 'Análisis Comparativo',
      p4_r6_leader_text: 'El proyecto {name} lidera el portafolio con un score de {score}/100. ',
      p4_r6_laggard_text: 'El proyecto {name} requiere mayor atención con un score de {score}/100. ',
      p4_r6_avg_text: 'La media del portafolio se sitúa en CPI {cpi} y SPI {spi}.',

      // Alertas finales del PDF
           p4_pdf_allow_popups: 'Permite las ventanas emergentes para generar el reporte.',

      // ═══════════ MÓDULO 5: GOVERNANCE & COMPLIANCE ═══════════
      p5_no_data: 'No hay datos para auditar',
      p5_kpi_compliance: 'Compliance Score',
      p5_kpi_compliance_conform: 'Conforme',
      p5_kpi_compliance_attention: 'Requiere atención',
      p5_kpi_compliance_nonconform: 'No conforme',
      p5_kpi_critical_risks: 'Riesgos Críticos',
      p5_kpi_critical_sub: 'de {total} identificados',
      p5_kpi_active_controls: 'Controles Activos',
      p5_kpi_active_controls_sub: 'evaluados',
      p5_kpi_total_exposure: 'Exposición Total',
      p5_kpi_total_exposure_sub: 'valor en riesgo',
      p5_compliance_section: 'Estado de Cumplimiento Normativo',
      p5_risk_matrix_section: 'Matriz de Riesgos',
      p5_col_risk: 'Riesgo',
      p5_col_probability: 'Probabilidad',
      p5_col_impact: 'Impacto',
      p5_col_severity: 'Severidad',
      p5_col_exposure: 'Exposición',
      p5_col_mitigation: 'Mitigación',
      p5_controls_section: 'Controles Internos',
      p5_audit_section: 'Audit Trail Reciente',
      p5_audit_empty: 'El registro de auditoría comenzará a acumular datos conforme los usuarios modifiquen proyectos y tareas.',
      p5_exposure_section: 'Exposición al Riesgo por Proyecto',
      p5_exposure_item: '{count} riesgos identificados · salud: {health}',
            p5_recommendations_section: 'Recomendaciones de Governance',

      // Severidad
      p5_sev_critico: 'Crítico',
      p5_sev_alto: 'Alto',
      p5_sev_medio: 'Medio',
      p5_sev_bajo: 'Bajo',

      // Probabilidad
      p5_prob_alta: 'Alta',
      p5_prob_media: 'Media',
      p5_prob_baja: 'Baja',

      // Impacto
      p5_imp_alto: 'Alto',
      p5_imp_medio: 'Medio',
      p5_imp_bajo: 'Bajo',

      // Estados de controles
      p5_ctrl_activo: 'Activo',
      p5_ctrl_parcial: 'Parcial',
            p5_ctrl_inactivo: 'Inactivo',

      // Nombres de riesgos
      p5_risk_name_overcost: 'Sobrecosto en {count} proyecto(s)',
      p5_risk_name_delays: 'Retrasos en {count} proyecto(s)',
      p5_risk_name_overdue: '{count} tarea(s) rezagadas',
      p5_risk_name_concentration: 'Concentración: {name}',
      p5_risk_name_no_scope: '{count} proyecto(s) sin alcance definido',
      p5_risk_name_dependencies: 'Dependencias entre tareas críticas',

      // Probabilidad
      p5_prob_alta_risk: 'Alta',
      p5_prob_media_risk: 'Media',

      // Mitigaciones
      p5_mit_hours_audit: 'Auditoría de horas + renegociación de contratos',
      p5_mit_fasttrack: 'Fast-tracking en ruta crítica + refuerzo de recursos',
      p5_mit_reassign: 'Reasignación de recursos + revisión de dependencias',
      p5_mit_diversify: 'Diversificación del portafolio + aseguramiento contractual',
      p5_mit_archive: 'Definir alcance o archivar',
      p5_mit_contingency: 'Análisis de ruta crítica + plan de contingencia',

      // Áreas de compliance
      p5_area_traceability: 'Trazabilidad',
      p5_area_traceability_desc: '{done}/{total} tareas con responsable asignado',
      p5_area_data: 'Datos Completos',
      p5_area_data_desc: '{done}/{total} tareas con deadline',
      p5_area_fin: 'Control Financiero',
      p5_area_fin_desc: 'CPI {cpi} · {status}',
      p5_area_fin_ok: 'Bajo control',
      p5_area_fin_ko: 'Requiere intervención',
      p5_area_schedule: 'Gobernanza de Cronograma',
      p5_area_schedule_desc: 'SPI {spi} · {status}',
      p5_area_schedule_ok: 'Alineado',
      p5_area_schedule_ko: 'Con desvíos',
      p5_area_docs: 'Documentación',
      p5_area_docs_desc: '{count}/4 áreas con controles adecuados',

      // Recomendaciones de compliance
      p5_rec_assignments: 'Completar asignaciones',
      p5_rec_assignments_detail: '{count} tareas sin responsable. Obligatorio para trazabilidad completa.',
      p5_rec_deadlines: 'Definir deadlines',
      p5_rec_deadlines_detail: '{count} tareas sin fecha límite. Bloquea el análisis de cronograma.',
      p5_rec_financial: 'Reforzar control financiero',
      p5_rec_financial_detail: 'Implementar revisiones semanales de CPI y alertas automáticas de sobrecosto.',
      p5_rec_schedule: 'Recuperar cronograma',
      p5_rec_schedule_detail: 'Aplicar fast-tracking en ruta crítica y reasignar recursos a tareas bloqueantes.',
      p5_rec_maintain: 'Mantener compliance actual',
      p5_rec_maintain_detail: 'Todos los controles están dentro de rango. Continuar con monitoreo semanal.',

      // Controles internos (nombres + descripciones)
      p5_ctrl_audit_name: 'Registro de auditoría activo',
      p5_ctrl_audit_desc: 'Los cambios en tareas y proyectos se registran con usuario, timestamp y valores.',
      p5_ctrl_snapshots_name: 'Snapshots históricos automáticos',
      p5_ctrl_snapshots_desc: 'KPIs del portafolio capturados cada día para análisis de tendencias.',
      p5_ctrl_rbac_name: 'Control de acceso por roles',
      p5_ctrl_rbac_desc: 'Verificación de permisos en todos los endpoints críticos del backend.',
      p5_ctrl_https_name: 'Cifrado en tránsito (HTTPS)',
      p5_ctrl_https_desc: 'Todas las comunicaciones cliente-servidor cifradas con TLS 1.3.',
      p5_ctrl_backups_name: 'Backups automáticos',
      p5_ctrl_backups_desc: 'Copias de seguridad diarias de la base de datos MongoDB.',
      p5_ctrl_dr_name: 'Plan de recuperación ante desastres',
      p5_ctrl_dr_desc: 'Documentar procedimientos y SLA de recuperación.',
      p5_ctrl_soc2_name: 'Certificación SOC 2',
      p5_ctrl_soc2_desc: 'Auditoría externa de seguridad y procesos.',
      p5_ctrl_gdpr_name: 'Cumplimiento GDPR explícito',
            p5_ctrl_gdpr_desc: 'Política de retención y consentimiento documentada.',

      // ═══════════ MÓDULO 6: INTEGRACIONES ═══════════
      p6_kpi_active: 'Integraciones Activas',
      p6_kpi_active_sub: 'conectadas en producción',
      p6_kpi_roadmap: 'En Roadmap',
      p6_kpi_roadmap_sub: 'planificadas para 2027',
      p6_kpi_endpoints: 'API Endpoints',
      p6_kpi_endpoints_sub: 'REST documentados',
      p6_kpi_webhooks: 'Webhooks',
      p6_kpi_webhooks_sub: 'eventos en tiempo real',

      // Badges
      p6_badge_active: 'ACTIVO',
      p6_badge_beta: 'BETA',
      p6_badge_roadmap: 'ROADMAP',

      // Categorías
      p6_cat_identity: 'Identidad y Acceso',
      p6_cat_collab: 'Colaboración',
      p6_cat_projects: 'Proyectos',
      p6_cat_erp: 'ERP & Finanzas',
      p6_cat_crm: 'CRM & Ventas',
      p6_cat_bi: 'Business Intelligence',

      // API
      p6_api_title: 'API REST Pública',
      p6_api_desc: 'Todos los endpoints requieren autenticación mediante Bearer Token en el header {code}.',
      p6_api_col_method: 'Método',
      p6_api_col_endpoint: 'Endpoint',
      p6_api_col_desc: 'Descripción',

      // Webhooks
      p6_wh_title: 'Webhooks Disponibles',
      p6_wh_desc: 'Configura URLs de callback para recibir notificaciones en tiempo real cuando ocurran eventos en el sistema.',

      // Seguridad
      p6_sec_title: 'Seguridad Enterprise',
      p6_sec_jwt: 'JWT Authentication',
      p6_sec_jwt_desc: 'Tokens firmados con rotación automática',
      p6_sec_rbac: 'RBAC',
      p6_sec_rbac_desc: 'Control de acceso basado en roles',
      p6_sec_https: 'HTTPS/TLS 1.3',
      p6_sec_https_desc: 'Cifrado extremo a extremo',
      p6_sec_rate: 'Rate Limiting',
      p6_sec_rate_desc: 'Protección contra abuso y DDoS',
      p6_sec_audit: 'Audit Logging',
      p6_sec_audit_desc: 'Registro completo de operaciones',
      p6_sec_backup: 'Backups Diarios',
            p6_sec_backup_desc: 'RPO 24h · RTO 4h',

      // Nombres y detalles de integraciones
      p6_int_google_name: 'SSO con Google',
      p6_int_google_detail: 'Login mediante Google Workspace',
      p6_int_microsoft_name: 'SSO con Microsoft',
      p6_int_microsoft_detail: 'Login Azure AD (SSO empresarial en desarrollo)',
      p6_int_ad_name: 'Active Directory / LDAP',
      p6_int_ad_detail: 'Sincronización con directorio corporativo',
      p6_int_saml_name: 'SAML 2.0',
      p6_int_saml_detail: 'Federación de identidad empresarial',
      p6_int_slack_name: 'Slack',
      p6_int_slack_detail: 'Notificaciones y comandos',
      p6_int_teams_name: 'Microsoft Teams',
      p6_int_teams_detail: 'Reuniones y transcripción automática',
      p6_int_meet_name: 'Google Meet',
      p6_int_meet_detail: 'Integración de reuniones',
      p6_int_jira_name: 'Jira',
      p6_int_jira_detail: 'Importación y sincronización bidireccional',
      p6_int_clickup_name: 'ClickUp',
      p6_int_clickup_detail: 'Sincronización de tareas',
      p6_int_trello_name: 'Trello',
      p6_int_trello_detail: 'Importación de tableros',
      p6_int_asana_name: 'Asana',
      p6_int_asana_detail: 'Integración de proyectos',
      p6_int_monday_name: 'Monday.com',
      p6_int_monday_detail: 'Sincronización de boards',
      p6_int_sap_name: 'SAP',
      p6_int_sap_detail: 'Integración con SAP ERP',
      p6_int_netsuite_name: 'Oracle NetSuite',
      p6_int_netsuite_detail: 'Sincronización contable',
      p6_int_quickbooks_name: 'QuickBooks',
      p6_int_quickbooks_detail: 'Facturación automática',
      p6_int_stripe_name: 'Stripe',
      p6_int_stripe_detail: 'Pagos y suscripciones',
      p6_int_salesforce_name: 'Salesforce',
      p6_int_salesforce_detail: 'Sincronización de clientes',
      p6_int_hubspot_name: 'HubSpot',
      p6_int_hubspot_detail: 'Gestión de leads',
      p6_int_powerbi_name: 'Power BI',
      p6_int_powerbi_detail: 'Streaming de datos',
      p6_int_tableau_name: 'Tableau',
      p6_int_tableau_detail: 'Exportación de datasets',
      p6_int_looker_name: 'Looker Studio',
      p6_int_looker_detail: 'Conectores nativos',

      // Endpoints
      p6_ep_projects_list: 'Lista todos los proyectos del cliente',
      p6_ep_projects_upsert: 'Crea o actualiza proyectos',
      p6_ep_history_kpis: 'Serie temporal de KPIs',
      p6_ep_history_summary: 'Resumen agregado con tendencias',
      p6_ep_ai_analyst: 'Consultas al asistente IA',
      p6_ep_snapshots: 'Guarda snapshot de KPIs',
      p6_ep_audit: 'Registra cambio en tarea',
      p6_ep_transcribe: 'Transcribe audio con Whisper',
      p6_ep_upload: 'Extrae texto de PDF/Excel/Word',

      // Webhooks
      p6_wh_created: 'Se dispara al crear una tarea',
      p6_wh_updated: 'Al modificar una tarea existente',
      p6_wh_overdue: 'Cuando una tarea vence sin completarse',
      p6_wh_at_risk: 'Proyecto entra en zona de riesgo',
      p6_wh_budget: 'Costo real supera el presupuestado',
      p6_wh_milestone: 'Al alcanzar un hito',

      // ═══════════ MÓDULO 7: FINANZAS AVANZADAS ═══════════
      p7_no_data: 'No hay datos financieros disponibles',
      p7_kpi_revenue: 'Ingresos Facturables',
      p7_kpi_revenue_sub: '{h}h facturables',
      p7_kpi_costs: 'Costes Totales',
      p7_kpi_costs_sub: 'tarifas internas aplicadas',
      p7_kpi_margin: 'Margen Bruto',
      p7_kpi_margin_sub: '{pct} margen',
      p7_kpi_pending: 'Facturación Pendiente',
      p7_kpi_pending_sub: '35% por facturar',

      p7_profit_title: '💰 Rentabilidad por Proyecto',
      p7_col_project: 'Proyecto',
      p7_col_client_rate: 'Tarifa Cliente',
      p7_col_internal_rate: 'Tarifa Interna',
      p7_col_margin_hour: 'Margen/h',
      p7_col_billable_hours: 'Horas Facturables',
      p7_col_revenue: 'Ingresos',
      p7_col_costs: 'Costes',
      p7_col_margin: 'Margen',
      p7_col_margin_pct: '% Margen',
      p7_total_portfolio: 'TOTAL PORTAFOLIO',

      p7_multi_title: '💱 Multi-Moneda',
      p7_multi_desc: 'Conversión automática para proyectos internacionales:',
      p7_currency_eur: 'Euro',
      p7_currency_usd: 'Dólar Americano',
      p7_currency_gbp: 'Libra Esterlina',
      p7_currency_mxn: 'Peso Mexicano',
      p7_rate_word: 'tasa',
      p7_equivalent_word: 'equivalente',

      p7_costcenter_title: '🏢 Distribución por Centro de Coste',
      p7_costcenter_desc: 'Asignación de costes por área funcional:',
      p7_costcenter_ops: 'Operaciones',
      p7_costcenter_dev: 'Desarrollo',
      p7_costcenter_consulting: 'Consultoría',
      p7_costcenter_admin: 'Administración',
      p7_of_total: 'del total',

      p7_analysis_title: '📊 Análisis de Margen y Rentabilidad',
      p7_analysis_gross: 'Margen Bruto',
      p7_analysis_margin_hour: 'Margen por Hora',
      p7_analysis_per_hour: 'por hora facturable',
      p7_analysis_avg_price: 'Precio Medio Hora',
      p7_analysis_avg_price_sub: 'tarifa media cliente',
      p7_analysis_avg_cost: 'Coste Medio Hora',
      p7_analysis_avg_cost_sub: 'coste interno medio',

      p7_forecast_title: '🔮 Proyección de Ingresos (próximos 6 meses)',
      p7_forecast_insight: '💡 Insight financiero:',
      p7_forecast_insight_text: 'Con la estructura actual y el pipeline proyectado, se espera alcanzar {target} en los próximos 6 meses, asumiendo una tasa de conversión conservadora del 8% mensual.',

      p7_month_feb: 'Feb',
      p7_month_mar: 'Mar',
      p7_month_apr: 'Abr',
      p7_month_may: 'May',
      p7_month_jun: 'Jun',
      p7_month_jul: 'Jul',

      // ═══════════ MÓDULO 8: EXECUTIVE EXPERIENCE ═══════════
      p8_no_data: 'No hay datos para mostrar',
      p8_hero_score_label: 'Executive Score',
      p8_hero_updated: 'ACTUALIZADO',
      p8_hero_estado_optimo: 'óptimo',
      p8_hero_estado_estable: 'estable',
      p8_hero_estado_critico: 'crítico',
      p8_hero_estado_atencion: 'atención',

      // Estado general
      p8_state_excellent_title: '🏆 Excelencia Ejecutiva',
      p8_state_excellent_msg: 'El Portafolio opera con rentabilidad positiva, eficiencia de costes y cumplimiento del cronograma. Oportunidad de escalar y consolidar.',
      p8_state_stable_title: '✅ Operación Estable',
      p8_state_stable_msg: 'Todos los indicadores en zona de tolerancia. Continuar con monitoreo semanal para mantener el rumbo.',
      p8_state_critical_title: '🚨 Intervención Necesaria',
      p8_state_critical_msg: 'El Portafolio muestra desviaciones significativas. Se requiere plan de recuperación ejecutivo en los próximos 7 días.',
      p8_state_attention_title: '⚠️ Requiere Atención',
      p8_state_attention_msg: 'Algunos indicadores están fuera de rango óptimo. Recomendamos revisión cercana y acciones correctivas tempranas.',

      // KPIs hero
      p8_kpi_financial_status: 'Estado Financiero',
      p8_kpi_financial_optimal: 'Óptimo',
      p8_kpi_financial_tolerance: 'En tolerancia',
      p8_kpi_financial_attention: 'Atención',
      p8_kpi_schedule_status: 'Estado Cronograma',
      p8_kpi_schedule_ontime: 'En tiempo',
      p8_kpi_schedule_tolerance: 'Tolerancia',
      p8_kpi_schedule_delayed: 'Retrasado',
      p8_kpi_portfolio: 'Portafolio',
      p8_kpi_portfolio_sub: 'proyectos activos',
      p8_kpi_total_value: 'Valor Total',
      p8_kpi_total_value_sub: 'presupuesto Portafolio',

      // Títulos de tarjetas
      p8_alerts_title: '🚨 Alertas Inteligentes Priorizadas',
      p8_alerts_empty: '✅ No hay alertas críticas. Todos los indicadores en rango.',
      p8_decisions_title: '⚡ Decisiones Ejecutivas de Hoy',
      p8_decisions_sub: 'Las 3 decisiones más importantes que el C-Suite debería tomar hoy:',
      p8_pulse_title: '💓 Pulso del Equipo',
      p8_roles_title: '🎯 Vista por Rol Ejecutivo',
      p8_summary_title: '📌 Resumen Ultra-Ejecutivo (15 segundos)',

      // Niveles de alerta
      p8_level_critico: 'crítico',
      p8_level_alto: 'alto',
      p8_level_medio: 'medio',
      p8_level_bajo: 'bajo',

      // Alertas
      p8_alert_crit_title: '{count} proyecto(s) en estado crítico',
      p8_alert_crit_desc: 'Proyectos con desviaciones severas en CPI y/o SPI: {names}',
      p8_alert_crit_action: 'Reunión urgente con los PM + plan de recuperación en 48h',
      p8_alert_overcost_title: 'Sobrecosto proyectado de {amount}',
      p8_alert_overcost_desc: '{count} proyecto(s) con EAC superior al BAC. Si no se corrige, el Portafolio cerrará por encima del presupuesto.',
      p8_alert_overcost_action: 'Auditoría financiera + renegociación de alcance',
      p8_alert_overdue_title: '{count} tareas rezagadas',
      p8_alert_overdue_desc: 'El volumen de rezagos puede impactar la entrega final y generar penalizaciones contractuales.',
      p8_alert_overdue_action: 'Reasignación de recursos y revisión de dependencias',
      p8_alert_empty_title: '{count} proyecto(s) sin datos',
      p8_alert_empty_desc: 'Proyectos sin tareas definidas. Distorsionan las métricas del Portafolio.',
      p8_alert_empty_action: 'Definir alcance o archivar',

      // Decisiones
      p8_dec_restructure_title: 'Reestructurar costes',
      p8_dec_restructure_detail: 'Aprobar un plan de auditoría de horas y renegociación de contratos para los proyectos con mayor desviación de costes.',
      p8_dec_recover_title: 'Recuperar cronograma',
      p8_dec_recover_detail: 'Aprobar refuerzo del equipo en tareas críticas y fast-tracking en la ruta crítica del Portafolio.',
      p8_dec_accelerate_title: 'Acelerar el crecimiento',
      p8_dec_accelerate_detail: 'Aprobar la expansión del Portafolio con 2 proyectos adicionales usando el equipo actual.',
      p8_dec_clean_title: 'Limpiar el Portafolio',
      p8_dec_clean_detail: 'Decidir sobre {count} proyecto(s) sin alcance: definir tareas o archivar para mantener métricas limpias.',
      p8_dec_invest_title: 'Invertir en equipo',
      p8_dec_invest_detail: 'Aprobar plan de capacitación en EVM y PMI para los PMs, elevando la madurez del Portafolio.',
      p8_dec_pricing_title: 'Revisar pricing',
      p8_dec_pricing_detail: 'Solo {pct}% de proyectos son rentables. Revisar tarifas y costes para mejorar el margen global.',
      p8_dec_consolidate_title: 'Consolidar contratos',
      p8_dec_consolidate_detail: 'El {pct}% de los proyectos son rentables. Renegociar contratos con clientes clave para asegurar recurrencia.',

      // Pulso del equipo
      p8_pulse_productivity: 'Productividad',
      p8_pulse_avg_load: 'Carga media',
      p8_pulse_active_tasks: 'Tareas activas',
      p8_pulse_delays: 'Rezagos',

      // Roles
      p8_role_ceo_msg: 'Estrategia global bajo control',
      p8_role_ceo_action: 'Revisar Portafolio mensual',
      p8_role_cfo_msg: 'Margen total: {pct}',
      p8_role_cfo_action: 'Auditoría de costes semanal',
      p8_role_coo_msg: 'SPI: {spi}',
      p8_role_coo_action: 'Optimizar asignación de recursos',
      p8_role_pmo_msg: '{count} tareas rezagadas',
      p8_role_pmo_action: 'Revisar ruta crítica',

      // Resumen ultra
      p8_sum_where_label: 'Dónde estamos',
      p8_sum_where_sub: 'avance del Portafolio',
      p8_sum_ok_label: 'Vamos bien?',
      p8_sum_ok_yes: '✅ Sí',
      p8_sum_ok_caution: '⚠️ Con cautela',
      p8_sum_ok_no: '🔴 No',
      p8_sum_ok_sub: 'estado global',
      p8_sum_risk_label: 'Riesgo principal',
      p8_sum_risk_costs: 'Costes',
      p8_sum_risk_schedule: 'Cronograma',
      p8_sum_risk_none: 'Ninguno',
      p8_sum_risk_sub: 'foco de atención',
      p8_sum_action_label: 'Acción hoy',
      p8_sum_action_default: 'Mantener rumbo',
      p8_sum_action_sub: 'decisión clave'
    },
    en: {
      // Sidebar
      nav_section_title: 'C-Suite Modules',

      // 8 Modules - Labels
      nav_portfolio: 'Financial Portfolio',
      nav_okrs: 'OKRs & Strategy',
      nav_capacity: 'Capacity Planning',
      nav_bi: 'Business Intelligence',
      nav_governance: 'Governance & Compliance',
      nav_integrations: 'Integrations',
      nav_finance: 'Advanced Finance',
      nav_experience: 'Executive Experience',

      // 8 Modules - Subtitles
      sub_portfolio: 'All projects consolidated',
      sub_okrs: 'Strategic alignment',
      sub_capacity: 'Resource management',
      sub_bi: 'Advanced reports',
      sub_governance: 'Audit and risks',
      sub_integrations: 'SSO, API, Webhooks',
      sub_finance: 'Billing and margins',
      sub_experience: 'C-Suite view',

            // Topbar
      btn_refresh: '🔄 Refresh',
      btn_export: '📄 Export',
      btn_close: '✕ Close',

      // ═══════════ MODULE 1: FINANCIAL PORTFOLIO ═══════════
      p1_no_projects: 'No projects available',
      p1_word_projects: 'projects',
      p1_word_consumed: 'consumed',
      p1_word_of_budget: 'of budget',
      p1_kpi_bac: 'Total BAC',
      p1_kpi_ac: 'Actual Cost (AC)',
      p1_kpi_ev: 'Earned Value (EV)',
      p1_kpi_cpi: 'Global CPI',
      p1_kpi_eac: 'Projected EAC',
      p1_kpi_vac: 'Projected VAC',
      p1_kpi_margin: 'Projected Margin',
      p1_kpi_spi: 'Global SPI',
      p1_status_efficient: 'Efficient',
      p1_status_tolerance: 'In tolerance',
      p1_status_overcost: 'Overcost',
      p1_status_ahead: 'Ahead',
      p1_status_ontime: 'On time',
      p1_status_delayed: 'Delayed',
      p1_eac_sub: 'Estimated at completion',
      p1_vac_saving: 'Savings',
      p1_vac_overcost: 'Overcost',
      p1_margin_sub: 'of BAC',
      p1_health_title: 'Portfolio Health Distribution',
      p1_health_saludable: 'Healthy',
      p1_health_aceptable: 'Acceptable',
      p1_health_riesgo: 'At risk',
      p1_health_critico: 'Critical',
      p1_projects_detail: 'Project Detail',
      p1_col_project: 'Project',
      p1_col_margin: 'Margin',
      p1_col_health: 'Health',
      p1_total_portfolio: 'TOTAL PORTFOLIO',
      p1_burn_title: 'Burn Rate & Runway',
      p1_per_day: '/day',
      p1_runway: 'Runway',
      p1_days: 'days',
      p1_top_margin: 'Top Projects by Margin',
            p1_tasks_word: 'tasks',
      p1_completed: 'completed',

      // ═══════════ MODULE 2: OKRs & STRATEGY ═══════════
      p2_no_projects: 'No projects available',
      p2_scorecard_title: 'Balanced Scorecard · Global Strategic Health',
      p2_score_label: 'Strategic Score / 100',
      p2_score_excellent: '🟢 Excellent',
      p2_score_stable: '🟡 Stable',
      p2_score_needs_action: '🔴 Action required',
      p2_persp_financiera: 'Financial Perspective',
      p2_persp_cliente: 'Customer Perspective',
      p2_persp_procesos: 'Internal Processes',
      p2_persp_aprendizaje: 'Learning & Growth',
      p2_objectives_title: 'Derived Strategic Objectives',
      p2_progress_word: 'Progress',
      p2_alignment_title: 'Strategic Alignment Matrix',
      p2_col_project: 'Project',
      p2_col_alignment: 'Alignment',
      p2_col_impact: 'Strategic Impact',
      p2_col_priority: 'Priority',
      p2_col_recommendation: 'Recommendation',
      p2_forecast_title: 'Strategic Forecast 12 months',
      p2_decisions_title: 'Recommended Strategic Decisions',

      // Scorecard insights
      p2_ins_fin_estable: 'Stable situation',
      p2_ins_fin_solidas: 'Strong finances',
      p2_ins_fin_ajustado: 'Tight margin',
      p2_ins_fin_intervencion: 'Intervention required',
      p2_ins_cli_moderada: 'Moderate satisfaction',
      p2_ins_cli_satisfechos: 'Satisfied clients',
      p2_ins_cli_atencion: 'Attention required',
      p2_ins_cli_riesgo: 'Risk of dissatisfaction',
      p2_ins_pro_funcionales: 'Functional processes',
      p2_ins_pro_excelencia: 'Operational excellence',
      p2_ins_pro_oportunidades: 'Improvement opportunities',
      p2_ins_pro_reingenieria: 'Reengineering required',
      p2_ins_apr_productivo: 'Productive team',
      p2_ins_apr_alto: 'High performance',
      p2_ins_apr_continuo: 'Continuous learning',
      p2_ins_apr_formacion: 'Training required',

      // Objectives (titles, descriptions and actions)
      p2_obj1_title: 'Optimize cost efficiency (CPI ≥ 1.00)',
      p2_obj1_desc: 'Global CPI is currently {cpi}. Objective: recover margin and achieve sustainable financial efficiency.',
      p2_obj1_action_ok: 'Maintain current control',
      p2_obj1_action_ko: 'Hours audit and scope review',
      p2_obj2_title: 'Align the schedule (SPI ≥ 1.00)',
      p2_obj2_desc: 'Global SPI: {spi}. Objective: execute at planned pace and recover accumulated delays.',
      p2_obj2_action_ok: 'Maintain velocity',
      p2_obj2_action_ko: 'Fast-tracking on critical path',
      p2_obj3_title: 'Achieve positive portfolio margin',
      p2_obj3_desc: 'Current margin: {margen} ({margenPct}). Objective: reduce overruns and protect profitability.',
      p2_obj3_action_ok: 'Document successful practices',
      p2_obj3_action_ko: 'Renegotiate contracts and review estimates',
      p2_obj4_title: 'Reduce overdue tasks to < 5%',
      p2_obj4_desc: 'Currently {rezagadas} of {total} tasks are overdue ({pct}). Objective: zero critical delays.',
      p2_obj4_action_ok: 'Maintain monitoring',
      p2_obj4_action_ko: 'Resource reallocation and dependency review',
      p2_obj5_title: 'Consolidate the active portfolio',
      p2_obj5_desc: '{activos} active projects. Objective: scale to {target} projects with the same team.',
           p2_obj5_action: 'Standardize processes and automate reports',

      // Objective states
      p2_estado_logrado: 'Achieved',
      p2_estado_en_curso: 'In progress',
      p2_estado_riesgo: 'At risk',
      p2_estado_critico: 'Critical',

      // Priorities (alignment)
      p2_priority_critica: 'Critical',
      p2_priority_alta: 'High',
      p2_priority_media: 'Medium',
      p2_priority_baja: 'Low',

      // Strategic impact
      p2_impact_nulo: 'None',
      p2_impact_bajo: 'Low',
      p2_impact_medio: 'Medium',
      p2_impact_alto: 'High',

      // Alignment recommendations
      p2_rec_define_scope: 'Define scope or archive',
      p2_rec_maintain: 'Maintain monitoring',
      p2_rec_immediate: 'Immediate executive intervention',
      p2_rec_recovery: '7-day recovery plan',

      // Forecast quarters
      p2_q1_desc: 'Current margin recovery',
      p2_q2_desc: 'Portfolio consolidation',
      p2_q3_desc: 'Team scaling',
      p2_q4_desc: 'New markets',

      // Forecast decisions
      p2_dec1_title_urgent: 'Urgent financial audit',
      p2_dec1_title_optimize: 'Margin optimization',
      p2_dec1_detail_urgent: 'Overcost detected in the portfolio. Review estimates, billable hours, and scope of projects at risk.',
      p2_dec1_detail_optimize: 'The portfolio is profitable. Document successful practices to replicate.',
      p2_dec2_title: 'Prioritize projects with highest alignment',
      p2_dec2_detail: 'Focus resources on projects with CPI/SPI ≥ 0.95 to maximize portfolio return.',
      p2_dec3_title_clean: 'Decide on projects without scope',
      p2_dec3_title_scale: 'Review scaling opportunities',
      p2_dec3_detail_clean: 'There are {count} projects without tasks. Define scope or archive to avoid distorting metrics.',
            p2_dec3_detail_scale: 'The current structure allows adding 2 more projects with the existing team.',

      // ═══════════ MODULE 3: CAPACITY PLANNING ═══════════
      p3_no_projects: 'No projects available',
      p3_no_team: 'No team assignments registered in the projects',
      p3_kpi_total_team: 'Total Team',
      p3_kpi_total_team_sub: 'assigned people',
      p3_kpi_avg_util: 'Average Utilization',
      p3_kpi_avg_util_optimal: 'Optimal',
      p3_kpi_avg_util_ok: 'Acceptable',
      p3_kpi_avg_util_low: 'Low',
      p3_kpi_overloaded: 'Overloaded',
      p3_kpi_overloaded_sub: 'people > 100%',
      p3_kpi_bench: 'On Bench',
      p3_kpi_bench_sub: 'no active assignment',
      p3_distribution_title: 'Load Level Distribution',
      p3_load_overloaded: 'Overloaded',
      p3_load_high: 'High load',
      p3_load_optimal: 'Optimal',
      p3_load_available: 'Available',
      p3_load_bench: 'On bench',
      p3_top_title: '🔥 Top People by Workload',
      p3_active_tasks: 'active tasks',
      p3_hours_assigned: 'h assigned',
      p3_bench_title: '💤 People on Bench / Available',
      p3_all_assigned: '✅ The entire team is assigned to active tasks',
      p3_no_active: 'No active assignment',
      p3_tasks_word: 'tasks',
      p3_load_word: 'load',
      p3_badge_bench: 'BENCH',
      p3_badge_available: 'AVAILABLE',
      p3_project_load_title: 'Project Workload',
      p3_col_project: 'Project',
      p3_col_people: 'People',
      p3_col_hours_assigned: 'Assigned Hours',
      p3_col_hours_logged: 'Logged Hours',
      p3_col_pct_progress: '% Progress',
      p3_col_active_tasks: 'Active Tasks',
      p3_col_load: 'Workload',
      p3_forecast_title: 'Needs Forecast (next 6 months)',
      p3_forecast_people_needed: 'people needed',
      p3_forecast_optimal: 'Optimal capacity',
      p3_forecast_hire_singular: '+1 hire',
            p3_forecast_hire_plural: '+{count} hires',
            p3_forecast_sufficient: 'Sufficient team',

      // ═══════════ MODULE 4: BUSINESS INTELLIGENCE ═══════════
      p4_no_data: 'No data to analyze',
      p4_kpi_available: 'Available Reports',
      p4_kpi_available_sub: 'executive templates',
      p4_kpi_active: 'Active Projects',
      p4_kpi_active_sub: 'of {total} total',
      p4_kpi_insights: 'Insights Generated',
      p4_kpi_insights_sub: 'automatic analyses',
      p4_kpi_processed: 'Processed Data',
      p4_kpi_processed_sub: 'tasks analyzed',
      p4_reports_title: 'Available Executive Reports',
      p4_generate: 'GENERATE →',

      // Reports
      p4_rep_ejecutivo: 'Executive Report',
      p4_rep_ejecutivo_desc: 'C-Suite summary of KPIs and status',
      p4_rep_financiero: 'Financial Report',
      p4_rep_financiero_desc: 'Costs, margins and projections',
      p4_rep_cronograma: 'Schedule Report',
      p4_rep_cronograma_desc: 'SPI, deadlines, overdue tasks',
      p4_rep_equipo: 'Team Report',
      p4_rep_equipo_desc: 'Workload, utilization and performance',
      p4_rep_riesgos: 'Risk Report',
      p4_rep_riesgos_desc: 'Identification and mitigation',
      p4_rep_comparativo: 'Comparative Report',
      p4_rep_comparativo_desc: 'Benchmark between projects',

      // Trends
      p4_trends_title: 'Time Trends (last 6 months)',
      p4_trend_label_margin: 'Margin %',
      p4_trend_label_progress: 'Progress %',
      p4_vs_prev_month: 'vs previous month',
      p4_auto_analysis: 'Automatic analysis:',

      // Top / Bottom
      p4_top_title: 'Top Performers',
      p4_bottom_title: 'Require Attention',
      p4_no_data_enough: 'Not enough data',
      p4_score: 'SCORE',
      p4_delays_word: 'delays',

      // Benchmark
      p4_benchmark_title: 'Benchmark vs Portfolio Average',
      p4_col_project: 'Project',
      p4_col_vs_avg: 'vs Avg',
      p4_col_margin: 'Margin %',
      p4_col_position: 'Position',
      p4_pos_leader: 'Leader',
      p4_pos_laggard: 'Laggard',
      p4_pos_mixed: 'Mixed',

      // Insights
      p4_insights_title: 'Automatic Insights',
      p4_ins_alert: 'Alert',
      p4_ins_excellence: 'Excellence',
      p4_ins_balance: 'Balance',
      p4_ins_hygiene: 'Data hygiene',
      p4_ins_risk: 'Operational risk',
      p4_ins_concentration: 'Concentration',
           p4_ins_efficiency: 'Efficiency',

      // Trends texts
      p4_trend_positive: 'The portfolio shows positive trend. CPI improved {cpi}% and SPI {spi}% in the last month. Maintaining the current pace will allow reaching annual objectives.',
      p4_trend_negative: 'The portfolio shows sustained deterioration. CPI fell {cpi}% and SPI {spi}% compared to the previous month. Immediate intervention is recommended on the highest-impact projects.',
      p4_trend_stable: 'The portfolio remains stable with slight variations. CPI varied {cpi}% and SPI {spi}%. Continue weekly monitoring to detect early deviations.',

      // Insights texts
      p4_ins1_alert: 'The portfolio has a CPI of {cpi} and SPI of {spi}. Below the tolerance threshold. Recovery plan required.',
      p4_ins1_excellence: 'The portfolio is financially efficient (CPI {cpi}) and on time (SPI {spi}). Opportunity to scale.',
      p4_ins1_balance: 'The portfolio is in the tolerance zone. Small deviations correctable with proactive management.',
      p4_ins2_hygiene: '{count} project(s) without defined tasks ({names}). They distort aggregated metrics. Define scope or archive.',
      p4_ins3_risk: '{count} overdue task(s) ({pct}% of total). Prioritize their resolution to avoid cascading impact.',
      p4_ins4_concentration: 'Project "{name}" represents {pct}% of the total budget. High concentration risk: diversify portfolio.',
      p4_ins5_efficiency: 'The team has logged {logged}h of {estimated}h planned ({pct}%).',
      p4_ins5_high_fidelity: ' High estimation fidelity.',
      p4_ins5_margin_optim: ' Optimization margin available.',
           p4_ins5_review_estimates: ' Review estimates and time tracking.',

      // ═══════════ EXECUTIVE PDF UTILITIES ═══════════
      p4_pdf_brand: 'The Jacksons Solutions',
      p4_pdf_exec_intelligence: 'Executive Intelligence',
      p4_pdf_confidential: 'Confidential',
      p4_pdf_page: 'Page',
      p4_pdf_date_label: 'Date',
      p4_pdf_projects_label: 'Projects',
      p4_pdf_active_word: 'active',
      p4_pdf_budget_label: 'Budget',

      // Health states in PDF
      p4_pdf_health_saludable: 'Healthy',
      p4_pdf_health_aceptable: 'Acceptable',
      p4_pdf_health_riesgo: 'At risk',
            p4_pdf_health_critico: 'Critical',

      // ═══════════ REPORT 1: EXECUTIVE ═══════════
      p4_r1_title: 'Executive Report',
      p4_r1_subtitle: 'Consolidated portfolio analysis and strategic status of active projects.',
      p4_r1_page1_title: 'Executive Summary',
      p4_r1_page1_meta: 'Consolidated Dashboard',
      p4_r1_story: 'The portfolio manages {count} active projects with a total budget of {bac}. Global financial performance shows a CPI of {cpi} {cpiStatus}, while the schedule shows an SPI of {spi}. Projected margin at closing is {margen} ({margenPct}).',
      p4_r1_cpi_above: 'above target',
      p4_r1_cpi_tolerance: 'in tolerance zone',
      p4_r1_cpi_attention: 'requiring executive attention',
      p4_r1_kpi_section: 'Key Portfolio Indicators',
      p4_r1_kpi_budget: 'Total Budget',
      p4_r1_kpi_budget_sub: '{count} active projects',
      p4_r1_kpi_ev: 'Earned Value',
      p4_r1_kpi_ev_sub: '{pct} completed',
      p4_r1_kpi_ac: 'Actual Cost',
      p4_r1_kpi_ac_sub: '{pct} consumed',
      p4_r1_kpi_margin: 'Projected Margin',
      p4_r1_health_section: 'Portfolio Health',
      p4_r1_gauge_progress: 'Progress',
      p4_r1_bar_healthy: 'Healthy',
      p4_r1_bar_acceptable: 'Acceptable',
      p4_r1_bar_risk: 'At Risk',
      p4_r1_bar_critical: 'Critical',
      p4_r1_page2_title: 'Project Breakdown',
      p4_r1_page2_meta: 'Detailed Analysis',
      p4_r1_col_project: 'Project',
      p4_r1_col_budget: 'Budget',
      p4_r1_col_health: 'Health',
      p4_r1_footer_total: 'CONSOLIDATED PORTFOLIO',
            p4_r1_deviation_section: 'Deviation Analysis',
      p4_r1_deviation_item: 'Projected overrun of {vac}. The CPI of {cpi} indicates that for every euro invested, only {pct} cents of earned value are generated. Requires cost audit.',
           p4_r1_no_deviations: '✅ No project shows projected overrun at completion.',

      // ═══════════ REPORT 2: FINANCIAL ═══════════
      p4_r2_title: 'Financial Report',
      p4_r2_subtitle: 'Comprehensive analysis of costs, margins and financial projections of the portfolio.',
      p4_r2_page1_title: 'Financial Status',
      p4_r2_page1_meta: 'Consolidated Analysis',
      p4_r2_kpi_section: 'Financial Summary',
      p4_r2_kpi_budget: 'Total Budget',
      p4_r2_kpi_budget_sub: 'Authorized',
      p4_r2_kpi_ac: 'Actual Cost',
      p4_r2_kpi_ac_sub: '{pct} consumed',
      p4_r2_kpi_eac: 'Projected EAC',
      p4_r2_kpi_eac_sub: 'Estimated at completion',
      p4_r2_kpi_vac: 'VAC',
      p4_r2_kpi_vac_saving: 'Savings',
      p4_r2_kpi_vac_overcost: 'Overcost',
      p4_r2_consumption_section: 'Consumption vs Budget',
      p4_r2_bar_bac: 'Budget (BAC)',
      p4_r2_bar_ac: 'Actual Cost (AC)',
      p4_r2_bar_ev: 'Earned Value (EV)',
      p4_r2_bar_eac: 'Final Projection (EAC)',
      p4_r2_page2_title: 'Project Breakdown',
      p4_r2_page2_meta: 'Individual Analysis',
      p4_r2_col_project: 'Project',
      p4_r2_col_margin: 'Margin %',
      p4_r2_footer_total: 'CONSOLIDATED PORTFOLIO',
      p4_r2_analysis_section: 'Financial Analysis',
      p4_r2_story_consumed: 'The portfolio has consumed {pctConsumed} of the budget with progress of {pctProgress}. The CPI of {cpi} indicates that {cpiEval}. ',
      p4_r2_cpi_good: 'financial efficiency exceeds the plan',
      p4_r2_cpi_bad: 'less value than expected is being generated for each euro invested',
      p4_r2_margin_negative: 'The projected margin is negative ({margen}), which requires immediate cost audit.',
            p4_r2_margin_positive: 'The projected margin is positive ({margen}).',

      // ═══════════ REPORT 3: SCHEDULE ═══════════
      p4_r3_title: 'Schedule Report',
      p4_r3_subtitle: 'Time compliance status, milestones and deviation analysis of the portfolio.',
      p4_r3_page1_title: 'Schedule Status',
      p4_r3_page1_meta: 'Time Analysis',
      p4_r3_kpi_section: 'Schedule Indicators',
      p4_r3_kpi_spi: 'Global SPI',
      p4_r3_spi_ontime: 'On time',
      p4_r3_spi_tolerance: 'Tolerance',
      p4_r3_spi_delayed: 'Delayed',
      p4_r3_kpi_total: 'Total Tasks',
      p4_r3_kpi_total_sub: 'Portfolio',
      p4_r3_kpi_completed: 'Completed',
      p4_r3_kpi_completed_sub: '{pct} of total',
      p4_r3_kpi_delayed: 'Overdue',
      p4_r3_kpi_delayed_sub: '{pct} of total',
      p4_r3_dist_section: 'Task Distribution',
      p4_r3_gauge_progress: 'Overall Progress',
      p4_r3_bar_completed: 'Completed',
      p4_r3_bar_inprogress: 'In progress',
      p4_r3_bar_delayed: 'Overdue',
      p4_r3_bar_pending: 'Pending',
      p4_r3_page2_title: 'Projects with Delays',
      p4_r3_page2_meta: 'Temporal Risk Analysis',
      p4_r3_col_project: 'Project',
      p4_r3_col_delayed: 'Overdue Tasks',
      p4_r3_col_progress: 'Progress',
      p4_r3_col_status: 'Status',
      p4_r3_rec_section: 'Executive Recommendations',
      p4_r3_rec1_title: 'Fast-Tracking on Critical Path',
      p4_r3_rec1_text: 'Prioritize blocking tasks and add resources to critical activities to recover the schedule.',
      p4_r3_rec2_title: 'Dependency Review',
            p4_r3_rec2_text: 'Audit dependencies between tasks and eliminate bottlenecks that slow down progress.',

      // ═══════════ REPORT 4: TEAM ═══════════
      p4_r4_title: 'Team Report',
      p4_r4_subtitle: 'Workload distribution, utilization and performance of the team assigned to the portfolio.',
      p4_r4_page1_title: 'Team Summary',
      p4_r4_page1_meta: 'Resource Analysis',
      p4_r4_kpi_section: 'Key Indicators',
      p4_r4_kpi_people: 'Assigned People',
      p4_r4_kpi_people_sub: 'In the portfolio',
      p4_r4_kpi_hours_est: 'Estimated Hours',
      p4_r4_kpi_hours_est_sub: 'Planned',
      p4_r4_kpi_hours_log: 'Logged Hours',
      p4_r4_kpi_hours_log_sub: 'Actual',
      p4_r4_kpi_efficiency: 'Efficiency',
      p4_r4_kpi_efficiency_sub: 'Logged vs estimated',
      p4_r4_detail_section: 'Detail by Person',
      p4_r4_col_person: 'Person',
      p4_r4_col_tasks: 'Tasks',
      p4_r4_col_completed: 'Completed',
      p4_r4_col_hours_est: 'Est. Hours',
      p4_r4_col_projects: 'Projects',
            p4_r4_footer_total: 'TOTAL TEAM',

      // ═══════════ REPORT 5: RISKS ═══════════
      p4_r5_title: 'Risk Report',
      p4_r5_subtitle: 'Identification, assessment and mitigation of risks in the active portfolio.',
      p4_r5_page1_title: 'Risk Matrix',
      p4_r5_page1_meta: 'Exposure Analysis',
      p4_r5_exposure_section: 'Total Risk Exposure',
      p4_r5_exposure_label: 'Aggregate Portfolio Exposure',
      p4_r5_exposure_sub: 'Based on {count} identified risks · {high} of high or critical level',
      p4_r5_risks_section: 'Identified Risks',
      p4_r5_exposure_word: 'Exposure:',
      p4_r5_mitigation_word: 'Mitigation:',
      p4_r5_level_critico: 'CRITICAL',
      p4_r5_level_alto: 'HIGH',
      p4_r5_level_medio: 'MEDIUM',
      p4_r5_level_bajo: 'LOW',
      p4_r5_risk1_desc: 'Consolidated overcost in the portfolio',
      p4_r5_risk1_action: 'Immediate hours audit and contract renegotiation',
      p4_r5_risk2_desc: 'Significant schedule delay',
      p4_r5_risk2_action: 'Fast-tracking on critical path and resource reinforcement',
      p4_r5_risk3_desc: '{count} overdue tasks identified',
      p4_r5_risk3_action: 'Resource reallocation and dependency review',
      p4_r5_risk4_desc: '{count} projects without defined scope',
            p4_r5_risk4_action: 'Define scope or archive to clean up the portfolio',

      // ═══════════ REPORT 6: COMPARATIVE ═══════════
      p4_r6_title: 'Comparative Report',
      p4_r6_subtitle: 'Internal portfolio benchmarking and executive performance ranking.',
      p4_r6_page1_title: 'Performance Ranking',
      p4_r6_page1_meta: 'Internal Benchmark',
      p4_r6_score_section: 'Comparative Score (CPI + SPI)',
      p4_r6_table_section: 'Detailed Comparative Table',
      p4_r6_col_num: '#',
      p4_r6_col_project: 'Project',
      p4_r6_col_progress: 'Progress',
      p4_r6_col_margin: 'Margin %',
      p4_r6_col_score: 'Score',
      p4_r6_analysis_section: 'Comparative Analysis',
      p4_r6_leader_text: 'Project {name} leads the portfolio with a score of {score}/100. ',
      p4_r6_laggard_text: 'Project {name} requires greater attention with a score of {score}/100. ',
      p4_r6_avg_text: 'The portfolio average stands at CPI {cpi} and SPI {spi}.',

      // Final PDF alerts
            p4_pdf_allow_popups: 'Allow pop-ups to generate the report.',

      // ═══════════ MODULE 5: GOVERNANCE & COMPLIANCE ═══════════
      p5_no_data: 'No data to audit',
      p5_kpi_compliance: 'Compliance Score',
      p5_kpi_compliance_conform: 'Compliant',
      p5_kpi_compliance_attention: 'Requires attention',
      p5_kpi_compliance_nonconform: 'Non-compliant',
      p5_kpi_critical_risks: 'Critical Risks',
      p5_kpi_critical_sub: 'of {total} identified',
      p5_kpi_active_controls: 'Active Controls',
      p5_kpi_active_controls_sub: 'evaluated',
      p5_kpi_total_exposure: 'Total Exposure',
      p5_kpi_total_exposure_sub: 'value at risk',
      p5_compliance_section: 'Regulatory Compliance Status',
      p5_risk_matrix_section: 'Risk Matrix',
      p5_col_risk: 'Risk',
      p5_col_probability: 'Probability',
      p5_col_impact: 'Impact',
      p5_col_severity: 'Severity',
      p5_col_exposure: 'Exposure',
      p5_col_mitigation: 'Mitigation',
      p5_controls_section: 'Internal Controls',
      p5_audit_section: 'Recent Audit Trail',
      p5_audit_empty: 'The audit log will begin accumulating data as users modify projects and tasks.',
      p5_exposure_section: 'Risk Exposure by Project',
      p5_exposure_item: '{count} identified risks · health: {health}',
            p5_recommendations_section: 'Governance Recommendations',

      // Severity
      p5_sev_critico: 'Critical',
      p5_sev_alto: 'High',
      p5_sev_medio: 'Medium',
      p5_sev_bajo: 'Low',

      // Probability
      p5_prob_alta: 'High',
      p5_prob_media: 'Medium',
      p5_prob_baja: 'Low',

      // Impact
      p5_imp_alto: 'High',
      p5_imp_medio: 'Medium',
      p5_imp_bajo: 'Low',

      // Control states
      p5_ctrl_activo: 'Active',
      p5_ctrl_parcial: 'Partial',
            p5_ctrl_inactivo: 'Inactive',

      // Risk names
      p5_risk_name_overcost: 'Overcost in {count} project(s)',
      p5_risk_name_delays: 'Delays in {count} project(s)',
      p5_risk_name_overdue: '{count} overdue task(s)',
      p5_risk_name_concentration: 'Concentration: {name}',
      p5_risk_name_no_scope: '{count} project(s) without defined scope',
      p5_risk_name_dependencies: 'Dependencies between critical tasks',

      // Probability
      p5_prob_alta_risk: 'High',
      p5_prob_media_risk: 'Medium',

      // Mitigations
      p5_mit_hours_audit: 'Hours audit + contract renegotiation',
      p5_mit_fasttrack: 'Fast-tracking on critical path + resource reinforcement',
      p5_mit_reassign: 'Resource reallocation + dependency review',
      p5_mit_diversify: 'Portfolio diversification + contractual assurance',
      p5_mit_archive: 'Define scope or archive',
      p5_mit_contingency: 'Critical path analysis + contingency plan',

      // Compliance areas
      p5_area_traceability: 'Traceability',
      p5_area_traceability_desc: '{done}/{total} tasks with assigned owner',
      p5_area_data: 'Complete Data',
      p5_area_data_desc: '{done}/{total} tasks with deadline',
      p5_area_fin: 'Financial Control',
      p5_area_fin_desc: 'CPI {cpi} · {status}',
      p5_area_fin_ok: 'Under control',
      p5_area_fin_ko: 'Requires intervention',
      p5_area_schedule: 'Schedule Governance',
      p5_area_schedule_desc: 'SPI {spi} · {status}',
      p5_area_schedule_ok: 'Aligned',
      p5_area_schedule_ko: 'With deviations',
      p5_area_docs: 'Documentation',
      p5_area_docs_desc: '{count}/4 areas with adequate controls',

      // Compliance recommendations
      p5_rec_assignments: 'Complete assignments',
      p5_rec_assignments_detail: '{count} tasks without owner. Required for full traceability.',
      p5_rec_deadlines: 'Define deadlines',
      p5_rec_deadlines_detail: '{count} tasks without deadline. Blocks schedule analysis.',
      p5_rec_financial: 'Reinforce financial control',
      p5_rec_financial_detail: 'Implement weekly CPI reviews and automatic overcost alerts.',
      p5_rec_schedule: 'Recover schedule',
      p5_rec_schedule_detail: 'Apply fast-tracking on critical path and reallocate resources to blocking tasks.',
      p5_rec_maintain: 'Maintain current compliance',
      p5_rec_maintain_detail: 'All controls are within range. Continue weekly monitoring.',

      // Internal controls
      p5_ctrl_audit_name: 'Active audit log',
      p5_ctrl_audit_desc: 'Changes in tasks and projects are recorded with user, timestamp and values.',
      p5_ctrl_snapshots_name: 'Automatic historical snapshots',
      p5_ctrl_snapshots_desc: 'Portfolio KPIs captured daily for trend analysis.',
      p5_ctrl_rbac_name: 'Role-based access control',
      p5_ctrl_rbac_desc: 'Permission checks on all critical backend endpoints.',
      p5_ctrl_https_name: 'Encryption in transit (HTTPS)',
      p5_ctrl_https_desc: 'All client-server communications encrypted with TLS 1.3.',
      p5_ctrl_backups_name: 'Automatic backups',
      p5_ctrl_backups_desc: 'Daily backups of the MongoDB database.',
      p5_ctrl_dr_name: 'Disaster recovery plan',
      p5_ctrl_dr_desc: 'Document recovery procedures and SLA.',
      p5_ctrl_soc2_name: 'SOC 2 certification',
      p5_ctrl_soc2_desc: 'External security and process audit.',
      p5_ctrl_gdpr_name: 'Explicit GDPR compliance',
            p5_ctrl_gdpr_desc: 'Documented retention and consent policy.',

      // ═══════════ MODULE 6: INTEGRATIONS ═══════════
      p6_kpi_active: 'Active Integrations',
      p6_kpi_active_sub: 'connected in production',
      p6_kpi_roadmap: 'In Roadmap',
      p6_kpi_roadmap_sub: 'planned for 2027',
      p6_kpi_endpoints: 'API Endpoints',
      p6_kpi_endpoints_sub: 'documented REST',
      p6_kpi_webhooks: 'Webhooks',
      p6_kpi_webhooks_sub: 'real-time events',

      // Badges
      p6_badge_active: 'ACTIVE',
      p6_badge_beta: 'BETA',
      p6_badge_roadmap: 'ROADMAP',

      // Categories
      p6_cat_identity: 'Identity & Access',
      p6_cat_collab: 'Collaboration',
      p6_cat_projects: 'Projects',
      p6_cat_erp: 'ERP & Finance',
      p6_cat_crm: 'CRM & Sales',
      p6_cat_bi: 'Business Intelligence',

      // API
      p6_api_title: 'Public REST API',
      p6_api_desc: 'All endpoints require authentication via Bearer Token in the {code} header.',
      p6_api_col_method: 'Method',
      p6_api_col_endpoint: 'Endpoint',
      p6_api_col_desc: 'Description',

      // Webhooks
      p6_wh_title: 'Available Webhooks',
      p6_wh_desc: 'Configure callback URLs to receive real-time notifications when events occur in the system.',

      // Security
      p6_sec_title: 'Enterprise Security',
      p6_sec_jwt: 'JWT Authentication',
      p6_sec_jwt_desc: 'Signed tokens with automatic rotation',
      p6_sec_rbac: 'RBAC',
      p6_sec_rbac_desc: 'Role-based access control',
      p6_sec_https: 'HTTPS/TLS 1.3',
      p6_sec_https_desc: 'End-to-end encryption',
      p6_sec_rate: 'Rate Limiting',
      p6_sec_rate_desc: 'Protection against abuse and DDoS',
      p6_sec_audit: 'Audit Logging',
      p6_sec_audit_desc: 'Complete operations log',
      p6_sec_backup: 'Daily Backups',
           p6_sec_backup_desc: 'RPO 24h · RTO 4h',

      // Integration names and details
      p6_int_google_name: 'SSO with Google',
      p6_int_google_detail: 'Login via Google Workspace',
      p6_int_microsoft_name: 'SSO with Microsoft',
      p6_int_microsoft_detail: 'Azure AD login (enterprise SSO in development)',
      p6_int_ad_name: 'Active Directory / LDAP',
      p6_int_ad_detail: 'Corporate directory synchronization',
      p6_int_saml_name: 'SAML 2.0',
      p6_int_saml_detail: 'Enterprise identity federation',
      p6_int_slack_name: 'Slack',
      p6_int_slack_detail: 'Notifications and commands',
      p6_int_teams_name: 'Microsoft Teams',
      p6_int_teams_detail: 'Meetings and automatic transcription',
      p6_int_meet_name: 'Google Meet',
      p6_int_meet_detail: 'Meeting integration',
      p6_int_jira_name: 'Jira',
      p6_int_jira_detail: 'Import and bidirectional synchronization',
      p6_int_clickup_name: 'ClickUp',
      p6_int_clickup_detail: 'Task synchronization',
      p6_int_trello_name: 'Trello',
      p6_int_trello_detail: 'Board import',
      p6_int_asana_name: 'Asana',
      p6_int_asana_detail: 'Project integration',
      p6_int_monday_name: 'Monday.com',
      p6_int_monday_detail: 'Board synchronization',
      p6_int_sap_name: 'SAP',
      p6_int_sap_detail: 'SAP ERP integration',
      p6_int_netsuite_name: 'Oracle NetSuite',
      p6_int_netsuite_detail: 'Accounting synchronization',
      p6_int_quickbooks_name: 'QuickBooks',
      p6_int_quickbooks_detail: 'Automatic invoicing',
      p6_int_stripe_name: 'Stripe',
      p6_int_stripe_detail: 'Payments and subscriptions',
      p6_int_salesforce_name: 'Salesforce',
      p6_int_salesforce_detail: 'Customer synchronization',
      p6_int_hubspot_name: 'HubSpot',
      p6_int_hubspot_detail: 'Lead management',
      p6_int_powerbi_name: 'Power BI',
      p6_int_powerbi_detail: 'Data streaming',
      p6_int_tableau_name: 'Tableau',
      p6_int_tableau_detail: 'Dataset export',
      p6_int_looker_name: 'Looker Studio',
      p6_int_looker_detail: 'Native connectors',

      // Endpoints
      p6_ep_projects_list: 'List all client projects',
      p6_ep_projects_upsert: 'Create or update projects',
      p6_ep_history_kpis: 'KPI time series',
      p6_ep_history_summary: 'Aggregated summary with trends',
      p6_ep_ai_analyst: 'Queries to AI assistant',
      p6_ep_snapshots: 'Save KPI snapshot',
      p6_ep_audit: 'Log task change',
      p6_ep_transcribe: 'Transcribe audio with Whisper',
      p6_ep_upload: 'Extract text from PDF/Excel/Word',

      // Webhooks
      p6_wh_created: 'Triggered when a task is created',
      p6_wh_updated: 'When an existing task is modified',
      p6_wh_overdue: 'When a task becomes overdue without completion',
      p6_wh_at_risk: 'Project enters at-risk zone',
      p6_wh_budget: 'Actual cost exceeds budget',
      p6_wh_milestone: 'When a milestone is reached',

      // ═══════════ MODULE 7: ADVANCED FINANCE ═══════════
      p7_no_data: 'No financial data available',
      p7_kpi_revenue: 'Billable Revenue',
      p7_kpi_revenue_sub: '{h}h billable',
      p7_kpi_costs: 'Total Costs',
      p7_kpi_costs_sub: 'internal rates applied',
      p7_kpi_margin: 'Gross Margin',
      p7_kpi_margin_sub: '{pct} margin',
      p7_kpi_pending: 'Pending Invoicing',
      p7_kpi_pending_sub: '35% to be invoiced',

      p7_profit_title: '💰 Profitability by Project',
      p7_col_project: 'Project',
      p7_col_client_rate: 'Client Rate',
      p7_col_internal_rate: 'Internal Rate',
      p7_col_margin_hour: 'Margin/h',
      p7_col_billable_hours: 'Billable Hours',
      p7_col_revenue: 'Revenue',
      p7_col_costs: 'Costs',
      p7_col_margin: 'Margin',
      p7_col_margin_pct: 'Margin %',
      p7_total_portfolio: 'TOTAL PORTFOLIO',

      p7_multi_title: '💱 Multi-Currency',
      p7_multi_desc: 'Automatic conversion for international projects:',
      p7_currency_eur: 'Euro',
      p7_currency_usd: 'US Dollar',
      p7_currency_gbp: 'British Pound',
      p7_currency_mxn: 'Mexican Peso',
      p7_rate_word: 'rate',
      p7_equivalent_word: 'equivalent',

      p7_costcenter_title: '🏢 Cost Center Distribution',
      p7_costcenter_desc: 'Cost allocation by functional area:',
      p7_costcenter_ops: 'Operations',
      p7_costcenter_dev: 'Development',
      p7_costcenter_consulting: 'Consulting',
      p7_costcenter_admin: 'Administration',
      p7_of_total: 'of total',

      p7_analysis_title: '📊 Margin & Profitability Analysis',
      p7_analysis_gross: 'Gross Margin',
      p7_analysis_margin_hour: 'Margin per Hour',
      p7_analysis_per_hour: 'per billable hour',
      p7_analysis_avg_price: 'Average Hourly Price',
      p7_analysis_avg_price_sub: 'average client rate',
      p7_analysis_avg_cost: 'Average Hourly Cost',
      p7_analysis_avg_cost_sub: 'average internal cost',

      p7_forecast_title: '🔮 Revenue Forecast (next 6 months)',
      p7_forecast_insight: '💡 Financial insight:',
      p7_forecast_insight_text: 'With the current structure and projected pipeline, revenue is expected to reach {target} over the next 6 months, assuming a conservative 8% monthly conversion rate.',

      p7_month_feb: 'Feb',
      p7_month_mar: 'Mar',
      p7_month_apr: 'Apr',
      p7_month_may: 'May',
      p7_month_jun: 'Jun',
      p7_month_jul: 'Jul',

      // ═══════════ MODULE 8: EXECUTIVE EXPERIENCE ═══════════
      p8_no_data: 'No data to display',
      p8_hero_score_label: 'Executive Score',
      p8_hero_updated: 'UPDATED',
      p8_hero_estado_optimo: 'optimal',
      p8_hero_estado_estable: 'stable',
      p8_hero_estado_critico: 'critical',
      p8_hero_estado_atencion: 'attention',

      // Overall state
      p8_state_excellent_title: '🏆 Executive Excellence',
      p8_state_excellent_msg: 'The portfolio operates with positive profitability, cost efficiency, and schedule compliance. Opportunity to scale and consolidate.',
      p8_state_stable_title: '✅ Stable Operation',
      p8_state_stable_msg: 'All indicators are within tolerance. Continue weekly monitoring to stay on course.',
      p8_state_critical_title: '🚨 Intervention Required',
      p8_state_critical_msg: 'The portfolio shows significant deviations. An executive recovery plan is required within the next 7 days.',
      p8_state_attention_title: '⚠️ Requires Attention',
      p8_state_attention_msg: 'Some indicators are outside the optimal range. We recommend close review and early corrective actions.',

      // Hero KPIs
      p8_kpi_financial_status: 'Financial Status',
      p8_kpi_financial_optimal: 'Optimal',
      p8_kpi_financial_tolerance: 'In tolerance',
      p8_kpi_financial_attention: 'Attention',
      p8_kpi_schedule_status: 'Schedule Status',
      p8_kpi_schedule_ontime: 'On time',
      p8_kpi_schedule_tolerance: 'Tolerance',
      p8_kpi_schedule_delayed: 'Delayed',
      p8_kpi_portfolio: 'Portfolio',
      p8_kpi_portfolio_sub: 'active projects',
      p8_kpi_total_value: 'Total Value',
      p8_kpi_total_value_sub: 'portfolio budget',

      // Card titles
      p8_alerts_title: '🚨 Prioritized Smart Alerts',
      p8_alerts_empty: '✅ No critical alerts. All indicators in range.',
      p8_decisions_title: '⚡ Executive Decisions for Today',
      p8_decisions_sub: 'The 3 most important decisions the C-Suite should make today:',
      p8_pulse_title: '💓 Team Pulse',
      p8_roles_title: '🎯 View by Executive Role',
      p8_summary_title: '📌 Ultra-Executive Summary (15 seconds)',

      // Alert levels
      p8_level_critico: 'critical',
      p8_level_alto: 'high',
      p8_level_medio: 'medium',
      p8_level_bajo: 'low',

      // Alerts
      p8_alert_crit_title: '{count} project(s) in critical state',
      p8_alert_crit_desc: 'Projects with severe deviations in CPI and/or SPI: {names}',
      p8_alert_crit_action: 'Urgent meeting with PMs + recovery plan within 48h',
      p8_alert_overcost_title: 'Projected overcost of {amount}',
      p8_alert_overcost_desc: '{count} project(s) with EAC above BAC. If not corrected, the portfolio will close over budget.',
      p8_alert_overcost_action: 'Financial audit + scope renegotiation',
      p8_alert_overdue_title: '{count} overdue tasks',
      p8_alert_overdue_desc: 'The volume of overdue tasks may impact final delivery and generate contractual penalties.',
      p8_alert_overdue_action: 'Resource reallocation and dependency review',
      p8_alert_empty_title: '{count} project(s) without data',
      p8_alert_empty_desc: 'Projects without defined tasks. They distort portfolio metrics.',
      p8_alert_empty_action: 'Define scope or archive',

      // Decisions
      p8_dec_restructure_title: 'Restructure costs',
      p8_dec_restructure_detail: 'Approve an hours audit and contract renegotiation plan for the projects with the highest cost deviation.',
      p8_dec_recover_title: 'Recover schedule',
      p8_dec_recover_detail: 'Approve team reinforcement on critical tasks and fast-tracking on the portfolio critical path.',
      p8_dec_accelerate_title: 'Accelerate growth',
      p8_dec_accelerate_detail: 'Approve portfolio expansion with 2 additional projects using the current team.',
      p8_dec_clean_title: 'Clean up the portfolio',
      p8_dec_clean_detail: 'Decide on {count} project(s) without scope: define tasks or archive to keep clean metrics.',
      p8_dec_invest_title: 'Invest in the team',
      p8_dec_invest_detail: 'Approve EVM and PMI training plan for PMs, raising portfolio maturity.',
      p8_dec_pricing_title: 'Review pricing',
      p8_dec_pricing_detail: 'Only {pct}% of projects are profitable. Review rates and costs to improve overall margin.',
      p8_dec_consolidate_title: 'Consolidate contracts',
      p8_dec_consolidate_detail: '{pct}% of projects are profitable. Renegotiate contracts with key clients to secure recurrence.',

      // Team pulse
      p8_pulse_productivity: 'Productivity',
      p8_pulse_avg_load: 'Average load',
      p8_pulse_active_tasks: 'Active tasks',
      p8_pulse_delays: 'Overdue',

      // Roles
      p8_role_ceo_msg: 'Global strategy under control',
      p8_role_ceo_action: 'Review monthly portfolio',
      p8_role_cfo_msg: 'Total margin: {pct}',
      p8_role_cfo_action: 'Weekly cost audit',
      p8_role_coo_msg: 'SPI: {spi}',
      p8_role_coo_action: 'Optimize resource allocation',
      p8_role_pmo_msg: '{count} overdue tasks',
      p8_role_pmo_action: 'Review critical path',

      // Ultra summary
      p8_sum_where_label: 'Where we are',
      p8_sum_where_sub: 'portfolio progress',
      p8_sum_ok_label: 'Are we on track?',
      p8_sum_ok_yes: '✅ Yes',
      p8_sum_ok_caution: '⚠️ With caution',
      p8_sum_ok_no: '🔴 No',
      p8_sum_ok_sub: 'global status',
      p8_sum_risk_label: 'Main risk',
      p8_sum_risk_costs: 'Costs',
      p8_sum_risk_schedule: 'Schedule',
      p8_sum_risk_none: 'None',
      p8_sum_risk_sub: 'focus area',
      p8_sum_action_label: 'Action today',
      p8_sum_action_default: 'Stay on course',
      p8_sum_action_sub: 'key decision'
    }
  };

  function t(key) {
    const lang = getLang();
    return (I18N[lang] && I18N[lang][key]) || I18N.es[key] || key;
  }


  // Traduce + interpola {variables} en el texto
  function tI(key, vars) {
    let str = t(key);
    if (!vars) return str;
    Object.keys(vars).forEach(k => {
      str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]);
    });
    return str;
  }



  /* ==========================================================
     SECCIÓN 0 · UTILIDADES
     ========================================================== */
  const fmt = {
    money(n, currency = CFG.currency) {
      if (n == null || isNaN(n)) return '—';
      return new Intl.NumberFormat(CFG.locale, {
        style: 'currency',
        currency,
        maximumFractionDigits: 0
      }).format(n);
    },
    moneyCompact(n) {
      if (n == null || isNaN(n)) return '—';
      const abs = Math.abs(n);
      if (abs >= 1e6) return (n / 1e6).toFixed(1) + 'M €';
      if (abs >= 1e3) return (n / 1e3).toFixed(1) + 'K €';
      return Math.round(n) + ' €';
    },
    pct(n, decimals = 1) {
      if (n == null || isNaN(n)) return '—';
      return n.toFixed(decimals) + '%';
    },
    num(n) {
      if (n == null || isNaN(n)) return '—';
      return new Intl.NumberFormat(CFG.locale).format(n);
    },
    date(d) {
      if (!d) return '—';
      const dt = new Date(d);
      if (isNaN(dt)) return '—';
      return dt.toLocaleDateString(CFG.locale, { day: '2-digit', month: 'short', year: 'numeric' });
    },
    dateTime(d) {
      if (!d) return '—';
      const dt = new Date(d);
      if (isNaN(dt)) return '—';
      return dt.toLocaleString(CFG.locale, { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
    }
  };

  const State = {
    module: 'Portafolio',
    clientFilter: 'all',
    periodFilter: 'all',
    projects: [],
    costConfigs: {}
  };

  /* ==========================================================
     SECCIÓN 1 · DATA LAYER
     Lee proyectos reales y enriquece con cálculos financieros
     ========================================================== */
  const DataLayer = {
    load() {
      const projects = window.projects || [];
      const enriched = projects.map((p, idx) => this.enrich(p, idx));
      return enriched;
    },

    loadCostConfig(projectId) {
      try {
        const raw = localStorage.getItem(`evmCostConfig_p_${projectId}`);
        if (!raw) return null;
        return JSON.parse(raw);
      } catch (e) { return null; }
    },

    enrich(project, index) {
      const cfg = this.loadCostConfig(project.id);
      const costPerHour = cfg?.costPerHour || 50;
      const overheadPct = cfg?.overheadPercentage || 0;
      const fixedCosts = Array.isArray(cfg?.fixedCosts)
        ? cfg.fixedCosts.reduce((s, fc) => s + (parseFloat(fc.amount) || 0), 0)
        : 0;
      const costeEfectivoHora = costPerHour * (1 + overheadPct / 100);

      const tasks = project.tasks || [];
      const totalEstimated = tasks.reduce((s, t) => s + (t.estimatedTime || 0), 0);
      const totalLogged = tasks.reduce((s, t) => s + (t.timeLogged || 0), 0);

      const BAC = totalEstimated * costeEfectivoHora + fixedCosts;
      const AC = totalLogged * costeEfectivoHora + fixedCosts;

      const progresoPonderado = totalEstimated > 0
        ? tasks.reduce((s, t) => s + ((t.progress || 0) / 100) * (t.estimatedTime || 0), 0) / totalEstimated
        : 0;

      const EV = tasks.reduce((s, t) => {
        const p = Math.max(0, Math.min(100, t.progress || 0)) / 100;
        return s + (t.estimatedTime || 0) * costeEfectivoHora * p;
      }, 0) + (fixedCosts * progresoPonderado);

      // PV por tiempo transcurrido
      const hoy = Date.now();
      const conDeadline = tasks.filter(t => t.deadline);
      let PV = 0;
      let earliest = hoy, latest = hoy;
      if (conDeadline.length > 0) {
        const starts = conDeadline.map(t => new Date(t.startDate || t.deadline).getTime()).filter(d => !isNaN(d));
        const ends = conDeadline.map(t => new Date(t.deadline).getTime()).filter(d => !isNaN(d));
        earliest = Math.min(...starts);
        latest = Math.max(...ends);
        const dur = latest - earliest;
        const transcurrido = Math.max(0, Math.min(dur, hoy - earliest));
        PV = BAC * (dur > 0 ? transcurrido / dur : 0.5);
      } else {
        PV = BAC * 0.5;
      }

      const CPI = AC > 0 ? EV / AC : 1;
      const SPI = PV > 0 ? EV / PV : 1;
      const EAC = CPI > 0 ? BAC / CPI : BAC;
      const VAC = BAC - EAC;
      const progresoPct = BAC > 0 ? (EV / BAC) * 100 : 0;

      // 🏦 Métricas financieras derivadas
      const margenProyectado = BAC - EAC;                 // diferencia presupuesto vs real
      const margenPct = BAC > 0 ? (margenProyectado / BAC) * 100 : 0;
      const costePorHoraReal = totalLogged > 0 ? AC / totalLogged : costeEfectivoHora;
      const horasRestantes = Math.max(0, totalEstimated - totalLogged);
      const costeRestante = horasRestantes * costeEfectivoHora;
      const burnRate = AC / Math.max(1, this.diasTranscurridos(earliest));
      const runwayDias = burnRate > 0 ? Math.floor((BAC - AC) / burnRate) : 999;

      // Salud global
      const health = CPI >= 1 && SPI >= 1 ? 'saludable'
                   : CPI >= 0.9 && SPI >= 0.9 ? 'aceptable'
                   : CPI >= 0.7 || SPI >= 0.7 ? 'riesgo'
                   : 'critico';

      return {
        id: project.id,
        index,
        name: project.name || `Proyecto ${index + 1}`,
        clienteId: project.clienteId,
        tasks,
        totalTasks: tasks.length,
        completedTasks: tasks.filter(t => (t.progress || 0) >= 100).length,
        delayedTasks: tasks.filter(t => t.status === 'overdue').length,
        inProgressTasks: tasks.filter(t => t.status === 'inProgress').length,
        pendingTasks: tasks.filter(t => t.status === 'pending').length,
        // KPIs EVM
        BAC, EV, AC, PV, CPI, SPI, EAC, VAC, progresoPct,
        // Extras financieros
        costPerHour: costeEfectivoHora,
        costPerHourBase: costPerHour,
        overheadPct,
        fixedCosts,
        totalEstimated,
        totalLogged,
        horasRestantes,
        costeRestante,
        margenProyectado,
        margenPct,
        burnRate,
        runwayDias,
        health,
        earliest: new Date(earliest),
        latest: new Date(latest),
        // Info extra
        startDate: project.startDate || earliest,
        endDate: project.endDate || latest,
        status: project.status || 'active',
        tags: project.tags || [],
        tieneConfigReal: !!cfg
      };
    },

    diasTranscurridos(desde) {
      const d = Math.max(1, Math.floor((Date.now() - desde) / 86400000));
      return d;
    },

    aggregate(projects) {
      if (!projects.length) return null;

      const totales = projects.reduce((acc, p) => ({
        BAC: acc.BAC + p.BAC,
        EV: acc.EV + p.EV,
        AC: acc.AC + p.AC,
        PV: acc.PV + p.PV,
        EAC: acc.EAC + p.EAC,
        VAC: acc.VAC + p.VAC,
        tasks: acc.tasks + p.totalTasks,
        completed: acc.completed + p.completedTasks,
        delayed: acc.delayed + p.delayedTasks,
        totalHours: acc.totalHours + p.totalEstimated,
        loggedHours: acc.loggedHours + p.totalLogged,
        margen: acc.margen + p.margenProyectado
      }), {
        BAC: 0, EV: 0, AC: 0, PV: 0, EAC: 0, VAC: 0,
        tasks: 0, completed: 0, delayed: 0,
        totalHours: 0, loggedHours: 0, margen: 0
      });

      const CPI = totales.AC > 0 ? totales.EV / totales.AC : 1;
      const SPI = totales.PV > 0 ? totales.EV / totales.PV : 1;
      const progresoPct = totales.BAC > 0 ? (totales.EV / totales.BAC) * 100 : 0;
      const margenPct = totales.BAC > 0 ? (totales.margen / totales.BAC) * 100 : 0;

      // Distribución por salud
      const distribucion = {
        saludable: projects.filter(p => p.health === 'saludable').length,
        aceptable: projects.filter(p => p.health === 'aceptable').length,
        riesgo: projects.filter(p => p.health === 'riesgo').length,
        critico: projects.filter(p => p.health === 'critico').length
      };

      return { ...totales, CPI, SPI, progresoPct, margenPct, distribucion, count: projects.length };
    }
  };

  /* ==========================================================
     SECCIÓN 2 · ESTILOS VIP
     ========================================================== */
  function injectStyles() {
    if (document.getElementById('exec-suite-styles')) return;
    const s = document.createElement('style');
    s.id = 'exec-suite-styles';
    s.textContent = `
@keyframes esFadeIn { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
@keyframes esShine { 0%{background-position:-200% 0;} 100%{background-position:200% 0;} }
@keyframes esFloat { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-4px);} }
@keyframes esPulse { 0%,100%{opacity:1;} 50%{opacity:0.6;} }
@keyframes esSlideIn { from{transform:translateX(-100%);} to{transform:translateX(0);} }

/* 🚀 BOTÓN FLOTANTE */
.exec-float-btn {
  position: fixed; bottom: 30px; right: 30px; z-index: 2147483645;
  padding: 16px 22px; border-radius: 50px;
  background: linear-gradient(135deg, #fbbf24, #d97706, #92400e, #f59e0b);
  background-size: 300% 300%;
  animation: esShine 6s linear infinite, esFloat 4s ease-in-out infinite;
  color: #1a0a2e; font-weight: 900; font-size: 14px; letter-spacing: 1px;
  text-transform: uppercase;
  border: 2px solid rgba(255,255,255,0.4);
  cursor: pointer;
  font-family: 'Inter','Segoe UI',system-ui,sans-serif;
  box-shadow: 0 12px 40px rgba(251,191,36,0.6), 0 0 80px rgba(251,191,36,0.35), inset 0 2px 4px rgba(255,255,255,0.5);
  display: flex; align-items: center; gap: 10px;
  transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
.exec-float-btn:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 20px 60px rgba(251,191,36,0.75), 0 0 120px rgba(251,191,36,0.5);
}
.exec-float-btn-icon { font-size: 22px; }

/* 🌌 OVERLAY */
.exec-overlay {
  position: fixed; inset: 0; z-index: 2147483647;
  background:
    radial-gradient(circle at 15% 10%, rgba(251,191,36,0.15) 0%, transparent 40%),
    radial-gradient(circle at 85% 90%, rgba(139,92,246,0.35) 0%, transparent 45%),
    radial-gradient(circle at 50% 50%, #0a0620 0%, #02010a 100%);
  font-family: 'Inter','Segoe UI',system-ui,-apple-system,sans-serif;
  color: #e9d5ff;
  animation: esFadeIn 0.4s cubic-bezier(0.34,1.56,0.64,1);
  display: flex; overflow: hidden;
}
.exec-overlay * { box-sizing: border-box; }

/* SIDEBAR */
.exec-sidebar {
  width: 260px; min-width: 260px; height: 100vh;
  background: linear-gradient(180deg, rgba(20,10,50,0.98), rgba(8,4,24,1));
  border-right: 1px solid rgba(251,191,36,0.25);
  display: flex; flex-direction: column;
  overflow-y: auto;
}
.exec-brand {
  padding: 22px 20px;
  border-bottom: 1px solid rgba(251,191,36,0.2);
  display: flex; align-items: center; gap: 12px;
}
.exec-brand-logo {
  width: 46px; height: 46px; border-radius: 12px;
  background: linear-gradient(135deg, #fbbf24, #d97706, #92400e);
  background-size: 300% 300%; animation: esShine 5s linear infinite;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px;
  box-shadow: 0 8px 22px rgba(251,191,36,0.5), inset 0 2px 4px rgba(255,255,255,0.5);
}
.exec-brand-text h2 {
  margin: 0; font-size: 14px; font-weight: 900; color: #fbbf24;
  letter-spacing: 2px; text-transform: uppercase;
}
.exec-brand-text p {
  margin: 2px 0 0; font-size: 10px; color: #a78bfa;
  letter-spacing: 1.5px; text-transform: uppercase;
}

.exec-nav { padding: 14px 10px; flex: 1; }
.exec-nav-section {
  font-size: 9px; color: #6b4fa8; letter-spacing: 2px;
  text-transform: uppercase; padding: 12px 12px 6px;
  font-weight: 800;
}
.exec-nav-item {
  padding: 11px 14px; border-radius: 10px; margin-bottom: 3px;
  display: flex; align-items: center; gap: 12px;
  cursor: pointer; font-size: 13px; font-weight: 600; color: #b8a4e8;
  transition: all 0.2s ease; position: relative;
}
.exec-nav-item:hover {
  background: rgba(251,191,36,0.08);
  color: #fbbf24;
}
.exec-nav-item.active {
  background: linear-gradient(90deg, rgba(251,191,36,0.2), rgba(139,92,246,0.1));
  color: #fbbf24;
  box-shadow: inset 3px 0 0 #fbbf24;
}
.exec-nav-icon { font-size: 18px; width: 22px; text-align: center; }
.exec-nav-label { flex: 1; }
.exec-nav-badge {
  font-size: 9px; padding: 2px 7px; border-radius: 100px;
  background: rgba(251,191,36,0.2); color: #fbbf24;
  font-weight: 800; letter-spacing: 1px;
}

.exec-sidebar-footer {
  padding: 16px; border-top: 1px solid rgba(251,191,36,0.15);
  font-size: 9px; color: #6b4fa8; letter-spacing: 2px;
  text-transform: uppercase; text-align: center;
}

/* MAIN */
.exec-main {
  flex: 1; height: 100vh; overflow-y: auto;
  padding: 0;
}
.exec-topbar {
  padding: 22px 34px;
  background: linear-gradient(135deg, rgba(30,12,70,0.85), rgba(40,20,90,0.4));
  border-bottom: 1px solid rgba(251,191,36,0.2);
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: 16px;
  position: sticky; top: 0; z-index: 10;
  backdrop-filter: blur(20px);
}
.exec-topbar-title {
  font-size: 20px; font-weight: 900; margin: 0;
  background: linear-gradient(135deg, #fff 0%, #fbbf24 50%, #fff 100%);
  background-size: 200% auto;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: esShine 6s linear infinite;
  letter-spacing: 0.5px;
}
.exec-topbar-sub {
  font-size: 11px; color: #a78bfa; margin-top: 4px;
  letter-spacing: 2px; text-transform: uppercase;
}
.exec-topbar-actions { display: flex; gap: 8px; flex-wrap: wrap; }

      .exec-topbar-actions { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
      .exec-lang-switch {
        display: inline-flex;
        gap: 2px;
        padding: 3px;
        background: rgba(10,5,25,0.6);
        border: 1px solid rgba(251,191,36,0.35);
        border-radius: 10px;
        margin-right: 4px;
      }
      .exec-lang-btn {
        padding: 6px 12px;
        border-radius: 7px;
        background: transparent;
        border: none;
        color: #a78bfa;
        font-family: inherit;
        font-weight: 800;
        font-size: 11px;
        letter-spacing: 1px;
        cursor: pointer;
        transition: all 0.25s ease;
      }
      .exec-lang-btn:hover {
        background: rgba(251,191,36,0.15);
        color: #fbbf24;
      }
      .exec-lang-btn.active {
        background: linear-gradient(135deg, #fbbf24, #d97706);
        color: #1a0a2e;
        box-shadow: 0 0 12px rgba(251,191,36,0.5);
      }

.exec-btn {
  padding: 10px 16px; border-radius: 10px;
  font-weight: 800; font-size: 11px; letter-spacing: 1px;
  text-transform: uppercase; cursor: pointer; border: 1px solid;
  font-family: inherit; transition: all 0.25s ease;
}
.exec-btn-gold {
  background: linear-gradient(135deg, rgba(251,191,36,0.3), rgba(217,119,6,0.1));
  border-color: rgba(251,191,36,0.6); color: #fbbf24;
}
.exec-btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(251,191,36,0.5);
}
.exec-btn-danger {
  background: linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.05));
  border-color: rgba(239,68,68,0.5); color: #fca5a5;
}
.exec-btn-danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(239,68,68,0.4);
}

.exec-content { padding: 30px 34px 60px; }

/* CARDS */
.exec-grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-bottom: 22px; }
.exec-grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; margin-bottom: 22px; }
.exec-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-bottom: 22px; }

.exec-card {
  position: relative; border-radius: 18px; padding: 22px;
  background: linear-gradient(160deg, rgba(45,25,90,0.55), rgba(12,6,30,0.95));
  border: 1px solid rgba(251,191,36,0.18);
  box-shadow: 0 20px 50px rgba(0,0,0,0.55), inset 0 1px 0 rgba(251,191,36,0.1);
  overflow: hidden;
}
.exec-card::before {
  content: ''; position: absolute; top: 0; left: 8%; right: 8%; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(251,191,36,0.7), transparent);
  box-shadow: 0 0 12px rgba(251,191,36,0.6);
}
.exec-card-title {
  font-size: 12px; font-weight: 800; color: #fbbf24;
  letter-spacing: 2px; text-transform: uppercase; margin: 0 0 16px 0;
  display: flex; align-items: center; gap: 10px;
}
.exec-card-title::before {
  content: ''; width: 3px; height: 14px;
  background: linear-gradient(180deg, #fbbf24, #92400e);
  border-radius: 2px; box-shadow: 0 0 10px rgba(251,191,36,0.8);
}

/* KPI CARDS */
.exec-kpi {
  padding: 20px; border-radius: 16px;
  background: linear-gradient(160deg, rgba(45,25,90,0.65), rgba(10,5,25,0.95));
  border: 1px solid rgba(251,191,36,0.2);
  box-shadow: 0 12px 36px rgba(0,0,0,0.5), inset 0 1px 0 rgba(251,191,36,0.12);
  position: relative; overflow: hidden;
  transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
}
.exec-kpi:hover {
  transform: translateY(-6px);
  box-shadow: 0 22px 60px rgba(0,0,0,0.7), 0 0 60px -15px var(--c, #fbbf24);
}
.exec-kpi::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, transparent, var(--c, #fbbf24), transparent);
  box-shadow: 0 0 16px var(--c, #fbbf24);
}
.exec-kpi-label {
  font-size: 10px; letter-spacing: 2px; color: #fbbf24;
  text-transform: uppercase; margin-bottom: 8px; font-weight: 700;
}
.exec-kpi-value {
  font-size: 26px; font-weight: 900; color: #fff;
  letter-spacing: -0.5px; font-variant-numeric: tabular-nums;
  line-height: 1.1;
}
.exec-kpi-sub {
  font-size: 10px; color: #8b7cb8; margin-top: 6px;
  letter-spacing: 0.5px;
}
.exec-kpi-delta {
  display: inline-block; padding: 2px 8px; border-radius: 6px;
  font-size: 10px; font-weight: 800; margin-left: 6px;
  letter-spacing: 0.5px;
}
.exec-kpi-delta.up { background: rgba(34,197,94,0.2); color: #86efac; }
.exec-kpi-delta.down { background: rgba(239,68,68,0.2); color: #fca5a5; }
.exec-kpi-delta.flat { background: rgba(139,92,246,0.2); color: #c4b5fd; }

/* TABLA */
.exec-table {
  width: 100%; border-collapse: separate; border-spacing: 0 6px;
}
.exec-table th {
  padding: 10px 14px; text-align: left;
  font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
  color: #fbbf24; font-weight: 800;
  border-bottom: 1px solid rgba(251,191,36,0.25);
}
.exec-table td {
  padding: 12px 14px; font-size: 13px; color: #ddd6fe;
  background: linear-gradient(90deg, rgba(45,25,90,0.35), rgba(12,6,30,0.35));
  border-top: 1px solid rgba(251,191,36,0.08);
  border-bottom: 1px solid rgba(251,191,36,0.08);
  font-variant-numeric: tabular-nums;
}
.exec-table tr td:first-child {
  border-radius: 10px 0 0 10px;
  border-left: 3px solid var(--rowc, #fbbf24);
  font-weight: 700; color: #fff;
}
.exec-table tr td:last-child { border-radius: 0 10px 10px 0; }
.exec-table tr:hover td {
  background: linear-gradient(90deg, rgba(251,191,36,0.15), rgba(139,92,246,0.15));
}
.exec-table .num { text-align: right; font-weight: 800; }

/* HEALTH BADGE */
.exec-health {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 10px; border-radius: 100px;
  font-size: 10px; font-weight: 800; letter-spacing: 1px;
  text-transform: uppercase;
}
.exec-health.saludable { background: rgba(34,197,94,0.2); color: #86efac; border: 1px solid rgba(34,197,94,0.4); }
.exec-health.aceptable { background: rgba(139,92,246,0.2); color: #c4b5fd; border: 1px solid rgba(139,92,246,0.4); }
.exec-health.riesgo { background: rgba(245,158,11,0.2); color: #fcd34d; border: 1px solid rgba(245,158,11,0.4); }
.exec-health.critico { background: rgba(239,68,68,0.2); color: #fca5a5; border: 1px solid rgba(239,68,68,0.5); animation: esPulse 2s infinite; }

/* BARRA DE PROGRESO */
.exec-bar {
  height: 6px; border-radius: 4px;
  background: rgba(251,191,36,0.15);
  overflow: hidden; margin: 6px 0;
}
.exec-bar-fill {
  height: 100%; border-radius: 4px;
  background: linear-gradient(90deg, var(--c, #fbbf24), color-mix(in srgb, var(--c, #fbbf24) 70%, #fff));
  box-shadow: 0 0 12px var(--c, #fbbf24);
  transition: width 1.2s cubic-bezier(0.34,1.56,0.64,1);
}

/* FILTROS */
.exec-filter-bar {
  display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 22px;
  padding: 14px 18px; border-radius: 12px;
  background: rgba(10,5,25,0.5); border: 1px solid rgba(251,191,36,0.15);
}
.exec-select {
  padding: 8px 14px; border-radius: 10px;
  background: rgba(20,10,50,0.9); border: 1px solid rgba(251,191,36,0.3);
  color: #fbbf24; font-size: 12px; font-family: inherit;
  font-weight: 700; letter-spacing: 0.5px; cursor: pointer;
  outline: none;
}
.exec-select:focus { border-color: #fbbf24; box-shadow: 0 0 16px rgba(251,191,36,0.4); }

/* EMPTY STATE */
.exec-empty {
  text-align: center; padding: 60px 20px;
  color: #8b7cb8; font-size: 13px; letter-spacing: 1px;
}

/* MODULE LOADING */
.exec-loading {
  display: flex; align-items: center; justify-content: center;
  padding: 80px 20px; color: #fbbf24; font-size: 13px;
  letter-spacing: 2px; text-transform: uppercase;
}
.exec-loading::after {
  content: ''; width: 16px; height: 16px; margin-left: 12px;
  border: 2px solid rgba(251,191,36,0.3);
  border-top-color: #fbbf24; border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* SCROLLBAR */
.exec-overlay ::-webkit-scrollbar,
.exec-sidebar ::-webkit-scrollbar,
.exec-main ::-webkit-scrollbar { width: 8px; height: 8px; }
.exec-overlay ::-webkit-scrollbar-track,
.exec-sidebar ::-webkit-scrollbar-track,
.exec-main ::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
.exec-overlay ::-webkit-scrollbar-thumb,
.exec-sidebar ::-webkit-scrollbar-thumb,
.exec-main ::-webkit-scrollbar-thumb {
  background: rgba(251,191,36,0.3); border-radius: 4px;
}
.exec-overlay ::-webkit-scrollbar-thumb:hover,
.exec-sidebar ::-webkit-scrollbar-thumb:hover,
.exec-main ::-webkit-scrollbar-thumb:hover {
  background: rgba(251,191,36,0.6);
}

/* RESPONSIVE */
@media (max-width: 1200px) {
  .exec-grid-4 { grid-template-columns: repeat(2,1fr); }
  .exec-grid-3 { grid-template-columns: repeat(2,1fr); }
}
@media (max-width: 900px) {
  .exec-sidebar { width: 210px; min-width: 210px; }
  .exec-grid-2, .exec-grid-3, .exec-grid-4 { grid-template-columns: 1fr; }
  .exec-content { padding: 20px; }
  .exec-float-btn { bottom: 20px; right: 20px; padding: 12px 16px; font-size: 12px; }
}
`;
    document.head.appendChild(s);
  }

  /* ==========================================================
     SECCIÓN 3 · MÓDULOS
     ========================================================== */
  const Modules = {

    /* ---------- MÓDULO 1 · Portafolio FINANCIERO (CFO) ---------- */
        portfolio: {
      id: 'portfolio',
      icon: '💰',
      label: 'Portafolio Financiero',
      subtitle: 'Consolidado de todos los proyectos',
      badge: 'CFO',

            render(container) {
        const projects = State.projects;
        if (!projects.length) {
          container.innerHTML = `<div class="exec-empty">📭 ${t('p1_no_projects')}</div>`;
          return;
        }

        const agg = DataLayer.aggregate(projects);

        // KPIs principales
        const kpis = [
          { label: t('p1_kpi_bac'), value: fmt.money(agg.BAC), sub: `${agg.count} ${t('p1_word_projects')}`, color: '#fbbf24' },
          { label: t('p1_kpi_ac'), value: fmt.money(agg.AC), sub: `${fmt.pct(agg.BAC > 0 ? (agg.AC / agg.BAC) * 100 : 0)} ${t('p1_word_consumed')}`, color: '#ef4444' },
          { label: t('p1_kpi_ev'), value: fmt.money(agg.EV), sub: `${fmt.pct(agg.progresoPct)} ${t('p1_word_of_budget')}`, color: '#22c55e' },
          { label: t('p1_kpi_cpi'), value: agg.CPI.toFixed(2), sub: agg.CPI >= 1 ? t('p1_status_efficient') : agg.CPI >= 0.9 ? t('p1_status_tolerance') : t('p1_status_overcost'), color: agg.CPI >= 1 ? '#22c55e' : agg.CPI >= 0.9 ? '#fbbf24' : '#ef4444' }
        ];

        // Segunda fila de KPIs financieros
        const kpis2 = [
          { label: t('p1_kpi_eac'), value: fmt.money(agg.EAC), sub: t('p1_eac_sub'), color: '#a78bfa' },
          { label: t('p1_kpi_vac'), value: (agg.VAC >= 0 ? '+' : '') + fmt.money(agg.VAC), sub: agg.VAC >= 0 ? t('p1_vac_saving') : t('p1_vac_overcost'), color: agg.VAC >= 0 ? '#22c55e' : '#ef4444' },
          { label: t('p1_kpi_margin'), value: fmt.money(agg.margen), sub: `${fmt.pct(agg.margenPct)} ${t('p1_margin_sub')}`, color: agg.margen >= 0 ? '#22c55e' : '#ef4444' },
          { label: t('p1_kpi_spi'), value: agg.SPI.toFixed(2), sub: agg.SPI >= 1 ? t('p1_status_ahead') : agg.SPI >= 0.9 ? t('p1_status_ontime') : t('p1_status_delayed'), color: agg.SPI >= 1 ? '#22c55e' : agg.SPI >= 0.9 ? '#fbbf24' : '#ef4444' }
        ];

        // Distribución por salud
        const total = agg.count;
        const dist = agg.distribucion;

        container.innerHTML = `
          <!-- KPIs principales -->
          <div class="exec-grid-4">
            ${kpis.map(k => `
              <div class="exec-kpi" style="--c:${k.color}">
                <div class="exec-kpi-label">${k.label}</div>
                <div class="exec-kpi-value">${k.value}</div>
                <div class="exec-kpi-sub">${k.sub}</div>
              </div>
            `).join('')}
          </div>

          <!-- KPIs financieros avanzados -->
          <div class="exec-grid-4">
            ${kpis2.map(k => `
              <div class="exec-kpi" style="--c:${k.color}">
                <div class="exec-kpi-label">${k.label}</div>
                <div class="exec-kpi-value">${k.value}</div>
                <div class="exec-kpi-sub">${k.sub}</div>
              </div>
            `).join('')}
          </div>

          <!-- Distribución por salud -->
          <div class="exec-card">
            <h3 class="exec-card-title">${t('p1_health_title')}</h3>
            <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:10px;">
              ${[
                { key: 'saludable', label: t('p1_health_saludable'), color: '#22c55e', icon: '🟢' },
                { key: 'aceptable', label: t('p1_health_aceptable'), color: '#a78bfa', icon: '🟣' },
                { key: 'riesgo', label: t('p1_health_riesgo'), color: '#f59e0b', icon: '🟠' },
                { key: 'critico', label: t('p1_health_critico'), color: '#ef4444', icon: '🔴' }
              ].map(s => {
                const count = dist[s.key] || 0;
                const pct = total > 0 ? (count / total) * 100 : 0;
                return `
                  <div style="flex:1;min-width:140px;padding:16px;border-radius:12px;background:linear-gradient(160deg, ${s.color}15, rgba(12,6,30,0.9));border:1px solid ${s.color}44;">
                    <div style="font-size:24px;">${s.icon}</div>
                    <div style="font-size:28px;font-weight:900;color:${s.color};margin-top:6px;">${count}</div>
                    <div style="font-size:10px;color:#8b7cb8;letter-spacing:2px;text-transform:uppercase;margin-top:4px;">${s.label}</div>
                    <div style="font-size:11px;color:${s.color};margin-top:8px;font-weight:800;">${pct.toFixed(0)}%</div>
                    <div class="exec-bar"><div class="exec-bar-fill" style="--c:${s.color};width:0" data-w="${pct}%"></div></div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Tabla de proyectos -->
          <div class="exec-card">
            <h3 class="exec-card-title">${t('p1_projects_detail')}</h3>
            <div style="overflow-x:auto;">
              <table class="exec-table">
                <thead>
                  <tr>
                    <th>${t('p1_col_project')}</th>
                    <th class="num">BAC</th>
                    <th class="num">EV</th>
                    <th class="num">AC</th>
                    <th class="num">EAC</th>
                    <th class="num">VAC</th>
                    <th class="num">CPI</th>
                    <th class="num">SPI</th>
                    <th class="num">${t('p1_col_margin')}</th>
                    <th>${t('p1_col_health')}</th>
                  </tr>
                </thead>
                <tbody>
                  ${projects.map(p => {
                    const healthColor = { saludable: '#22c55e', aceptable: '#a78bfa', riesgo: '#f59e0b', critico: '#ef4444' }[p.health];
                    return `
                      <tr style="--rowc:${healthColor}">
                        <td>${p.name.substring(0, 40)}</td>
                        <td class="num">${fmt.money(p.BAC)}</td>
                        <td class="num" style="color:#22c55e;">${fmt.money(p.EV)}</td>
                        <td class="num" style="color:#ef4444;">${fmt.money(p.AC)}</td>
                        <td class="num">${fmt.money(p.EAC)}</td>
                        <td class="num" style="color:${p.VAC >= 0 ? '#22c55e' : '#ef4444'};">${p.VAC >= 0 ? '+' : ''}${fmt.money(p.VAC)}</td>
                        <td class="num" style="color:${p.CPI >= 1 ? '#22c55e' : p.CPI >= 0.9 ? '#fbbf24' : '#ef4444'};font-weight:900;">${p.CPI.toFixed(2)}</td>
                        <td class="num" style="color:${p.SPI >= 1 ? '#22c55e' : p.SPI >= 0.9 ? '#fbbf24' : '#ef4444'};font-weight:900;">${p.SPI.toFixed(2)}</td>
                        <td class="num" style="color:${p.margenProyectado >= 0 ? '#22c55e' : '#ef4444'};">${p.margenProyectado >= 0 ? '+' : ''}${fmt.moneyCompact(p.margenProyectado)}</td>
                        <td><span class="exec-health ${p.health}">${p.health}</span></td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
                <tfoot>
                  <tr style="background:linear-gradient(90deg,rgba(251,191,36,0.15),rgba(139,92,246,0.1));">
                    <td style="font-weight:900;color:#fbbf24;border-left:3px solid #fbbf24;">${t('p1_total_portfolio')}</td>
                    <td class="num" style="font-weight:900;color:#fbbf24;">${fmt.money(agg.BAC)}</td>
                    <td class="num" style="font-weight:900;color:#22c55e;">${fmt.money(agg.EV)}</td>
                    <td class="num" style="font-weight:900;color:#ef4444;">${fmt.money(agg.AC)}</td>
                    <td class="num" style="font-weight:900;color:#a78bfa;">${fmt.money(agg.EAC)}</td>
                    <td class="num" style="font-weight:900;color:${agg.VAC >= 0 ? '#22c55e' : '#ef4444'};">${agg.VAC >= 0 ? '+' : ''}${fmt.money(agg.VAC)}</td>
                    <td class="num" style="font-weight:900;">${agg.CPI.toFixed(2)}</td>
                    <td class="num" style="font-weight:900;">${agg.SPI.toFixed(2)}</td>
                    <td class="num" style="font-weight:900;color:${agg.margen >= 0 ? '#22c55e' : '#ef4444'};">${agg.margen >= 0 ? '+' : ''}${fmt.moneyCompact(agg.margen)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <!-- Burn Rate / Runway -->
          <div class="exec-grid-2">
            <div class="exec-card">
              <h3 class="exec-card-title">${t('p1_burn_title')}</h3>
              <div style="display:flex;flex-direction:column;gap:14px;">
                ${projects.slice(0, 5).map(p => `
                  <div>
                    <div style="display:flex;justify-content:space-between;font-size:12px;color:#ddd6fe;margin-bottom:4px;">
                      <span>${p.name.substring(0, 30)}</span>
                      <span style="color:#fbbf24;font-weight:800;">${fmt.moneyCompact(p.burnRate)}${t('p1_per_day')}</span>
                    </div>
                    <div class="exec-bar">
                      <div class="exec-bar-fill" style="--c:#fbbf24;width:0" data-w="${Math.min(100, (p.burnRate / 5000) * 100)}%"></div>
                    </div>
                    <div style="font-size:10px;color:#8b7cb8;margin-top:2px;">
                      ${t('p1_runway')}: <strong style="color:${p.runwayDias > 30 ? '#22c55e' : p.runwayDias > 15 ? '#fbbf24' : '#ef4444'};">${p.runwayDias} ${t('p1_days')}</strong>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="exec-card">
              <h3 class="exec-card-title">${t('p1_top_margin')}</h3>
              <div style="display:flex;flex-direction:column;gap:12px;">
                ${[...projects].sort((a, b) => b.margenProyectado - a.margenProyectado).slice(0, 5).map((p, i) => `
                  <div style="display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:10px;background:rgba(10,5,25,0.5);border-left:3px solid ${p.margenProyectado >= 0 ? '#22c55e' : '#ef4444'};">
                    <div style="font-size:22px;font-weight:900;color:${p.margenProyectado >= 0 ? '#22c55e' : '#ef4444'};min-width:32px;">#${i + 1}</div>
                    <div style="flex:1;">
                      <div style="font-size:13px;font-weight:700;color:#fff;">${p.name.substring(0, 35)}</div>
                      <div style="font-size:11px;color:#8b7cb8;">${p.totalTasks} ${t('p1_tasks_word')} · ${fmt.pct(p.progresoPct)} ${t('p1_completed')}</div>
                    </div>
                    <div style="text-align:right;">
                      <div style="font-size:15px;font-weight:900;color:${p.margenProyectado >= 0 ? '#22c55e' : '#ef4444'};">${p.margenProyectado >= 0 ? '+' : ''}${fmt.moneyCompact(p.margenProyectado)}</div>
                      <div style="font-size:10px;color:#8b7cb8;">${fmt.pct(p.margenPct)}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;

        // Animar barras
        setTimeout(() => {
          container.querySelectorAll('.exec-bar-fill').forEach(el => {
            el.style.width = el.dataset.w || '0%';
          });
        }, 100);
      }
    },

    /* ---------- MÓDULOS PENDIENTES (placeholders hasta próxima entrega) ---------- */
        okrs: {
      id: 'okrs', icon: '🎯', label: 'OKRs & Estrategia', subtitle: 'Alineación estratégica', badge: 'CEO',
            render(container) {
        const projects = State.projects;
        if (!projects.length) {
          container.innerHTML = `<div class="exec-loading">📭 ${t('p2_no_projects')}</div>`;
          return;
        }

        const agg = DataLayer.aggregate(projects);

        // Scorecard estratégico consolidado
        const scorecard = {
          financiera: this.calcularFinanciera(agg),
          cliente: this.calcularCliente(projects),
          procesos: this.calcularProcesos(agg),
          aprendizaje: this.calcularAprendizaje(projects)
        };

        // Objetivos estratégicos derivados
        const objetivos = this.derivarObjetivos(projects, agg, scorecard);

        // Alineación proyectos vs objetivos
        const alineacion = this.calcularAlineacion(projects, objetivos);

        // Forecast estratégico
        const forecast = this.calcularForecast(projects, agg);

        const totalScorecard = Math.round((scorecard.financiera.score + scorecard.cliente.score + scorecard.procesos.score + scorecard.aprendizaje.score) / 4);

        container.innerHTML = `
          <!-- SCORECARD BALANCEADO -->
          <div class="exec-card">
            <h3 class="exec-card-title">${t('p2_scorecard_title')}</h3>
            <div style="display:flex;align-items:center;gap:32px;flex-wrap:wrap;">
              <div style="text-align:center;min-width:180px;">
                <div style="font-size:72px;font-weight:900;background:linear-gradient(135deg,#22c55e,#fbbf24);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1;">
                  ${totalScorecard}
                </div>
                <div style="font-size:11px;color:#fbbf24;letter-spacing:3px;text-transform:uppercase;margin-top:8px;font-weight:800;">
                  ${t('p2_score_label')}
                </div>
                <div style="font-size:11px;color:#8b7cb8;margin-top:6px;">
                  ${totalScorecard >= 75 ? t('p2_score_excellent') : totalScorecard >= 50 ? t('p2_score_stable') : t('p2_score_needs_action')}
                </div>
              </div>
              <div style="flex:1;min-width:280px;display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                ${[
                  { key: 'financiera', icon: '💰', label: t('p2_persp_financiera'), color: '#22c55e' },
                  { key: 'cliente', icon: '🎯', label: t('p2_persp_cliente'), color: '#a78bfa' },
                  { key: 'procesos', icon: '⚙️', label: t('p2_persp_procesos'), color: '#fbbf24' },
                  { key: 'aprendizaje', icon: '🧠', label: t('p2_persp_aprendizaje'), color: '#67e8f9' }
                ].map(p => {
                  const persp = scorecard[p.key];
                  return `
                    <div style="padding:14px 16px;border-radius:12px;background:linear-gradient(160deg, ${p.color}12, rgba(12,6,30,0.7));border:1px solid ${p.color}40;">
                      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                        <div style="font-size:16px;">${p.icon}</div>
                        <div style="font-size:22px;font-weight:900;color:${p.color};">${persp.score}</div>
                      </div>
                      <div style="font-size:10px;color:#8b7cb8;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:8px;">${p.label}</div>
                      <div class="exec-bar"><div class="exec-bar-fill" style="--c:${p.color};width:0" data-w="${persp.score}%"></div></div>
                      <div style="font-size:11px;color:${p.color};margin-top:8px;font-weight:700;">${persp.insight}</div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- OBJETIVOS ESTRATÉGICOS -->
          <div class="exec-card">
            <h3 class="exec-card-title">${t('p2_objectives_title')}</h3>
            <div style="display:flex;flex-direction:column;gap:14px;">
              ${objetivos.map(obj => {
                const color = obj.estado === 'logrado' ? '#22c55e' : obj.estado === 'en-curso' ? '#fbbf24' : obj.estado === 'riesgo' ? '#f97316' : '#ef4444';
                const icon = obj.estado === 'logrado' ? '🏆' : obj.estado === 'en-curso' ? '⏳' : obj.estado === 'riesgo' ? '⚠️' : '🔴';
                return `
                  <div style="padding:16px 20px;border-radius:12px;background:linear-gradient(90deg, rgba(45,25,90,0.5), rgba(12,6,30,0.35));border-left:4px solid ${color};">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap;">
                      <div style="flex:1;min-width:250px;">
                        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                          <span style="font-size:20px;">${icon}</span>
                          <span style="font-size:15px;font-weight:900;color:#fff;">${obj.titulo}</span>
                                                    <span style="padding:2px 10px;border-radius:100px;font-size:10px;font-weight:800;letter-spacing:1px;background:${color}22;color:${color};">${t('p2_estado_' + obj.estado.replace('-', '_')).toUpperCase()}</span>
                        </div>
                        <div style="font-size:12px;color:#b8a4e8;line-height:1.6;">${obj.descripcion}</div>
                      </div>
                      <div style="text-align:right;min-width:120px;">
                        <div style="font-size:26px;font-weight:900;color:${color};">${obj.progreso}%</div>
                        <div style="font-size:10px;color:#8b7cb8;letter-spacing:1.5px;text-transform:uppercase;">${t('p2_progress_word')}</div>
                      </div>
                    </div>
                    <div class="exec-bar" style="margin-top:12px;"><div class="exec-bar-fill" style="--c:${color};width:0" data-w="${obj.progreso}%"></div></div>
                    <div style="margin-top:10px;font-size:11px;color:#a78bfa;font-style:italic;">💡 ${obj.accion}</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- ALINEACIÓN PROYECTOS-ESTRATEGIA -->
          <div class="exec-card">
            <h3 class="exec-card-title">${t('p2_alignment_title')}</h3>
            <div style="overflow-x:auto;">
              <table class="exec-table">
                <thead>
                  <tr>
                    <th>${t('p2_col_project')}</th>
                    <th class="num">${t('p2_col_alignment')}</th>
                    <th class="num">${t('p2_col_impact')}</th>
                    <th class="num">${t('p2_col_priority')}</th>
                    <th>${t('p2_col_recommendation')}</th>
                  </tr>
                </thead>
                <tbody>
                  ${alineacion.map(a => {
                    const prioridadColor = a.prioridad === 'crítica' ? '#ef4444' : a.prioridad === 'alta' ? '#f97316' : a.prioridad === 'media' ? '#fbbf24' : '#22c55e';
                    return `
                      <tr style="--rowc:${prioridadColor}">
                        <td>${a.proyecto.substring(0, 40)}</td>
                        <td class="num" style="color:${a.alineacion >= 70 ? '#22c55e' : a.alineacion >= 40 ? '#fbbf24' : '#ef4444'};font-weight:900;">${a.alineacion}%</td>
                                             <td class="num">${t('p2_impact_' + a.impacto.toLowerCase())}</td>
                                                <td class="num"><span style="padding:3px 10px;border-radius:100px;font-size:10px;font-weight:800;background:${prioridadColor}22;color:${prioridadColor};">${t('p2_priority_' + a.prioridad).toUpperCase()}</span></td>
                        <td style="font-size:12px;color:#b8a4e8;">${a.recomendacion}</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- FORECAST ESTRATÉGICO -->
          <div class="exec-grid-2">
            <div class="exec-card">
              <h3 class="exec-card-title">${t('p2_forecast_title')}</h3>
              <div style="display:flex;flex-direction:column;gap:14px;">
                ${forecast.trimestres.map(tq => `
                  <div style="padding:14px 16px;border-radius:12px;background:rgba(10,5,25,0.5);border-left:3px solid ${tq.color};">
                    <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                      <span style="font-size:13px;font-weight:800;color:#fff;">${tq.label}</span>
                      <span style="font-size:14px;font-weight:900;color:${tq.color};">${fmt.moneyCompact(tq.ingresos)}</span>
                    </div>
                    <div style="font-size:11px;color:#8b7cb8;">${tq.descripcion}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="exec-card">
              <h3 class="exec-card-title">${t('p2_decisions_title')}</h3>
              <div style="display:flex;flex-direction:column;gap:12px;">
                ${forecast.decisiones.map((d, i) => `
                  <div style="padding:12px 14px;border-radius:10px;background:linear-gradient(90deg, rgba(45,25,90,0.5), rgba(12,6,30,0.35));border-left:3px solid ${d.color};">
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
                      <span style="width:24px;height:24px;border-radius:6px;background:${d.color};color:#1a0a2e;font-weight:900;font-size:12px;display:flex;align-items:center;justify-content:center;">${i + 1}</span>
                      <span style="font-size:13px;font-weight:800;color:#fff;">${d.titulo}</span>
                    </div>
                    <div style="font-size:11.5px;color:#b8a4e8;line-height:1.5;">${d.detalle}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;

        setTimeout(() => {
          container.querySelectorAll('.exec-bar-fill').forEach(el => {
            el.style.width = el.dataset.w || '0%';
          });
        }, 100);
      },



           calcularFinanciera(agg) {
        const score = Math.round(
          Math.min(100, Math.max(0, (agg.CPI * 40) + (agg.margenPct > 0 ? 30 : 10) + (agg.VAC >= 0 ? 30 : 5)))
        );
        let insight = t('p2_ins_fin_estable');
        if (score >= 75) insight = t('p2_ins_fin_solidas');
        else if (score >= 50) insight = t('p2_ins_fin_ajustado');
        else insight = t('p2_ins_fin_intervencion');
        return { score: Math.min(100, Math.max(0, score)), insight };
      },

            calcularCliente(projects) {
        const avgProgress = projects.reduce((s, p) => s + p.progresoPct, 0) / Math.max(1, projects.length);
        const healthyRatio = projects.filter(p => p.health === 'saludable' || p.health === 'aceptable').length / Math.max(1, projects.length);
        const score = Math.round(avgProgress * 0.5 + healthyRatio * 100 * 0.5);
        let insight = t('p2_ins_cli_moderada');
        if (score >= 75) insight = t('p2_ins_cli_satisfechos');
        else if (score >= 50) insight = t('p2_ins_cli_atencion');
        else insight = t('p2_ins_cli_riesgo');
        return { score: Math.min(100, Math.max(0, score)), insight };
      },

            calcularProcesos(agg) {
        const score = Math.round(Math.min(100, Math.max(0, agg.SPI * 60 + (agg.tasks > 0 ? (agg.completed / agg.tasks) * 40 : 40))));
        let insight = t('p2_ins_pro_funcionales');
        if (score >= 75) insight = t('p2_ins_pro_excelencia');
        else if (score >= 50) insight = t('p2_ins_pro_oportunidades');
        else insight = t('p2_ins_pro_reingenieria');
        return { score: Math.min(100, Math.max(0, score)), insight };
      },

            calcularAprendizaje(projects) {
        const conTareas = projects.filter(p => p.totalTasks > 0);
        const ratioCompletado = conTareas.length > 0
          ? conTareas.reduce((s, p) => s + (p.completedTasks / p.totalTasks), 0) / conTareas.length
          : 0;
        const score = Math.round(ratioCompletado * 100);
        let insight = t('p2_ins_apr_productivo');
        if (score >= 75) insight = t('p2_ins_apr_alto');
        else if (score >= 40) insight = t('p2_ins_apr_continuo');
        else insight = t('p2_ins_apr_formacion');
        return { score: Math.min(100, Math.max(0, score)), insight };
      },

            derivarObjetivos(projects, agg, scorecard) {
        const objetivos = [];

        // Objetivo 1: Mejorar CPI global
        objetivos.push({
          titulo: t('p2_obj1_title'),
          descripcion: tI('p2_obj1_desc', { cpi: agg.CPI.toFixed(2) }),
          progreso: Math.min(100, Math.round(agg.CPI * 100)),
          estado: agg.CPI >= 1 ? 'logrado' : agg.CPI >= 0.95 ? 'en-curso' : agg.CPI >= 0.85 ? 'riesgo' : 'critico',
          accion: agg.CPI >= 1 ? t('p2_obj1_action_ok') : t('p2_obj1_action_ko')
        });

        // Objetivo 2: Cumplir cronograma
        objetivos.push({
          titulo: t('p2_obj2_title'),
          descripcion: tI('p2_obj2_desc', { spi: agg.SPI.toFixed(2) }),
          progreso: Math.min(100, Math.round(agg.SPI * 100)),
          estado: agg.SPI >= 1 ? 'logrado' : agg.SPI >= 0.95 ? 'en-curso' : agg.SPI >= 0.85 ? 'riesgo' : 'critico',
          accion: agg.SPI >= 1 ? t('p2_obj2_action_ok') : t('p2_obj2_action_ko')
        });

        // Objetivo 3: Alcanzar margen positivo
        objetivos.push({
          titulo: t('p2_obj3_title'),
          descripcion: tI('p2_obj3_desc', { margen: fmt.money(agg.margen), margenPct: fmt.pct(agg.margenPct) }),
          progreso: agg.margen >= 0 ? 100 : Math.round(Math.max(0, Math.min(100, 50 + agg.margenPct))),
          estado: agg.margen >= 0 ? 'logrado' : agg.margenPct > -5 ? 'en-curso' : agg.margenPct > -15 ? 'riesgo' : 'critico',
          accion: agg.margen >= 0 ? t('p2_obj3_action_ok') : t('p2_obj3_action_ko')
        });

        // Objetivo 4: Reducir tareas rezagadas
        const totalTareas = projects.reduce((s, p) => s + p.totalTasks, 0);
        const tareasRezagadas = projects.reduce((s, p) => s + p.delayedTasks, 0);
        const pctRezago = totalTareas > 0 ? (tareasRezagadas / totalTareas) * 100 : 0;
        objetivos.push({
          titulo: t('p2_obj4_title'),
          descripcion: tI('p2_obj4_desc', { rezagadas: tareasRezagadas, total: totalTareas, pct: fmt.pct(pctRezago) }),
          progreso: Math.max(0, Math.min(100, 100 - pctRezago * 5)),
          estado: pctRezago < 5 ? 'logrado' : pctRezago < 15 ? 'en-curso' : pctRezago < 30 ? 'riesgo' : 'critico',
          accion: pctRezago < 5 ? t('p2_obj4_action_ok') : t('p2_obj4_action_ko')
        });

        // Objetivo 5: Escalar portafolio
        const proyectosActivos = projects.filter(p => p.totalTasks > 0).length;
        objetivos.push({
          titulo: t('p2_obj5_title'),
          descripcion: tI('p2_obj5_desc', { activos: proyectosActivos, target: proyectosActivos + 2 }),
          progreso: Math.round((proyectosActivos / (proyectosActivos + 2)) * 100),
          estado: 'en-curso',
          accion: t('p2_obj5_action')
        });

        return objetivos;
      },

            calcularAlineacion(projects, objetivos) {
        return projects.map(p => {
          // Proyectos sin tareas: alineación baja (no aportan valor)
          if (p.totalTasks === 0) {
            return {
              proyecto: p.name,
              alineacion: 10,
              impacto: 'nulo',
              prioridad: 'baja',
              recomendacion: t('p2_rec_define_scope')
            };
          }

          const alineacion = Math.round(
            (p.CPI >= 1 ? 30 : p.CPI >= 0.9 ? 20 : 5) +
            (p.SPI >= 1 ? 30 : p.SPI >= 0.9 ? 20 : 5) +
            (p.progresoPct >= 50 ? 20 : p.progresoPct >= 25 ? 15 : 5) +
            (p.health === 'saludable' ? 20 : p.health === 'aceptable' ? 15 : 5)
          );

          let prioridad = 'baja';
          if (p.health === 'critico') prioridad = 'critica';
          else if (p.health === 'riesgo') prioridad = 'alta';
          else if (p.health === 'aceptable') prioridad = 'media';

          let impacto = 'bajo';
          if (p.BAC > 5000) impacto = 'alto';
          else if (p.BAC > 2000) impacto = 'medio';

          let recomendacion = t('p2_rec_maintain');
          if (p.health === 'critico') recomendacion = t('p2_rec_immediate');
          else if (p.health === 'riesgo') recomendacion = t('p2_rec_recovery');

          return { proyecto: p.name, alineacion, impacto, prioridad, recomendacion };
        }).sort((a, b) => b.alineacion - a.alineacion);
      },

            calcularForecast(projects, agg) {
        const ingresosBase = agg.EV;
        const margenActual = agg.margenPct / 100;

        const trimestres = [
          { label: 'Q1 2027', ingresos: ingresosBase * 1.15, color: '#fbbf24', descripcion: t('p2_q1_desc') },
          { label: 'Q2 2027', ingresos: ingresosBase * 1.35, color: '#a78bfa', descripcion: t('p2_q2_desc') },
          { label: 'Q3 2027', ingresos: ingresosBase * 1.60, color: '#67e8f9', descripcion: t('p2_q3_desc') },
          { label: 'Q4 2027', ingresos: ingresosBase * 1.90, color: '#22c55e', descripcion: t('p2_q4_desc') }
        ];

        const sinAlcance = projects.filter(p => p.totalTasks === 0).length;

        const decisiones = [
          {
            titulo: agg.margen < 0 ? t('p2_dec1_title_urgent') : t('p2_dec1_title_optimize'),
            detalle: agg.margen < 0 ? t('p2_dec1_detail_urgent') : t('p2_dec1_detail_optimize'),
            color: agg.margen < 0 ? '#ef4444' : '#22c55e'
          },
          {
            titulo: t('p2_dec2_title'),
            detalle: t('p2_dec2_detail'),
            color: '#fbbf24'
          },
          {
            titulo: sinAlcance > 0 ? t('p2_dec3_title_clean') : t('p2_dec3_title_scale'),
            detalle: sinAlcance > 0 ? tI('p2_dec3_detail_clean', { count: sinAlcance }) : t('p2_dec3_detail_scale'),
            color: '#a78bfa'
          }
        ];

        return { trimestres, decisiones };
      }
    },


           capacity: {
      id: 'capacity', icon: '⚙️', label: 'Capacity Planning', subtitle: 'Gestión de recursos', badge: 'COO',
      render(container) {
        const projects = State.projects;
        if (!projects.length) {
          container.innerHTML = `<div class="exec-loading">📭 ${t('p3_no_projects')}</div>`;
          return;
        }

        // Extraer equipo desde las tareas
        const equipo = this.extraerEquipo(projects);

        if (equipo.length === 0) {
          container.innerHTML = `<div class="exec-empty">👥 ${t('p3_no_team')}</div>`;
          return;
        }

        // KPIs de capacidad
        const kpis = this.calcularKPIs(equipo, projects);

        // Forecast de necesidades
        const forecast = this.calcularForecast(equipo, projects);

        // Bench (personas sin asignación)
        const bench = equipo.filter(m => m.tareasActivas === 0);

        // Top cargados
        const topCargados = [...equipo].sort((a, b) => b.utilizacion - a.utilizacion).slice(0, 8);

        container.innerHTML = `
          <!-- KPIs CAPACIDAD -->
          <div class="exec-grid-4">
            <div class="exec-kpi" style="--c:#fbbf24">
              <div class="exec-kpi-label">${t('p3_kpi_total_team')}</div>
              <div class="exec-kpi-value">${equipo.length}</div>
              <div class="exec-kpi-sub">${t('p3_kpi_total_team_sub')}</div>
            </div>
            <div class="exec-kpi" style="--c:#22c55e">
              <div class="exec-kpi-label">${t('p3_kpi_avg_util')}</div>
              <div class="exec-kpi-value">${kpis.utilizacionMedia}%</div>
              <div class="exec-kpi-sub">${kpis.utilizacionMedia >= 75 ? t('p3_kpi_avg_util_optimal') : kpis.utilizacionMedia >= 50 ? t('p3_kpi_avg_util_ok') : t('p3_kpi_avg_util_low')}</div>
            </div>
            <div class="exec-kpi" style="--c:#ef4444">
              <div class="exec-kpi-label">${t('p3_kpi_overloaded')}</div>
              <div class="exec-kpi-value">${kpis.sobrecargados}</div>
              <div class="exec-kpi-sub">${t('p3_kpi_overloaded_sub')}</div>
            </div>
            <div class="exec-kpi" style="--c:#a78bfa">
              <div class="exec-kpi-label">${t('p3_kpi_bench')}</div>
              <div class="exec-kpi-value">${kpis.enBench}</div>
              <div class="exec-kpi-sub">${t('p3_kpi_bench_sub')}</div>
            </div>
          </div>

          <!-- DISTRIBUCIÓN POR UTILIZACIÓN -->
          <div class="exec-card">
            <h3 class="exec-card-title">${t('p3_distribution_title')}</h3>
            <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:10px;">
              ${[
                { label: t('p3_load_overloaded'), rango: '> 100%', color: '#ef4444', icon: '🔴', filtro: m => m.utilizacion > 100 },
                { label: t('p3_load_high'), rango: '75-100%', color: '#f59e0b', icon: '🟠', filtro: m => m.utilizacion > 75 && m.utilizacion <= 100 },
                { label: t('p3_load_optimal'), rango: '50-75%', color: '#22c55e', icon: '🟢', filtro: m => m.utilizacion > 50 && m.utilizacion <= 75 },
                { label: t('p3_load_available'), rango: '25-50%', color: '#67e8f9', icon: '🔵', filtro: m => m.utilizacion > 25 && m.utilizacion <= 50 },
                { label: t('p3_load_bench'), rango: '0-25%', color: '#a78bfa', icon: '🟣', filtro: m => m.utilizacion <= 25 }
              ].map(s => {
                const count = equipo.filter(s.filtro).length;
                const pct = equipo.length > 0 ? (count / equipo.length) * 100 : 0;
                return `
                  <div style="flex:1;min-width:140px;padding:16px;border-radius:12px;background:linear-gradient(160deg, ${s.color}15, rgba(12,6,30,0.9));border:1px solid ${s.color}44;">
                    <div style="font-size:24px;">${s.icon}</div>
                    <div style="font-size:28px;font-weight:900;color:${s.color};margin-top:6px;">${count}</div>
                    <div style="font-size:10px;color:#8b7cb8;letter-spacing:2px;text-transform:uppercase;margin-top:4px;">${s.label}</div>
                    <div style="font-size:10px;color:${s.color};margin-top:2px;">${s.rango}</div>
                    <div class="exec-bar" style="margin-top:8px;"><div class="exec-bar-fill" style="--c:${s.color};width:0" data-w="${pct}%"></div></div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- TOP CARGADOS + BENCH -->
          <div class="exec-grid-2">
            <div class="exec-card">
              <h3 class="exec-card-title">${t('p3_top_title')}</h3>
              <div style="display:flex;flex-direction:column;gap:10px;">
                ${topCargados.map(m => {
                  const color = m.utilizacion > 100 ? '#ef4444' : m.utilizacion > 75 ? '#f59e0b' : m.utilizacion > 50 ? '#22c55e' : '#67e8f9';
                  const pct = Math.min(150, m.utilizacion);
                  return `
                    <div style="padding:12px 14px;border-radius:10px;background:rgba(10,5,25,0.5);border-left:3px solid ${color};">
                      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                        <div>
                          <div style="font-size:13px;font-weight:800;color:#fff;">${m.nombre}</div>
                          <div style="font-size:11px;color:#8b7cb8;">${m.tareasActivas} ${t('p3_active_tasks')} · ${m.horasAsignadas}${t('p3_hours_assigned')}</div>
                        </div>
                        <div style="font-size:16px;font-weight:900;color:${color};">${m.utilizacion}%</div>
                      </div>
                      <div class="exec-bar"><div class="exec-bar-fill" style="--c:${color};width:0" data-w="${(pct / 150) * 100}%"></div></div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <div class="exec-card">
              <h3 class="exec-card-title">${t('p3_bench_title')}</h3>
              ${bench.length === 0 && equipo.filter(m => m.utilizacion <= 25).length === 0 ? `
                <div style="text-align:center;padding:30px;color:#22c55e;font-size:13px;">
                  ${t('p3_all_assigned')}
                </div>
              ` : `
                <div style="display:flex;flex-direction:column;gap:10px;">
                  ${equipo.filter(m => m.utilizacion <= 50).sort((a, b) => a.utilizacion - b.utilizacion).slice(0, 8).map(m => `
                    <div style="padding:12px 14px;border-radius:10px;background:rgba(10,5,25,0.5);border-left:3px solid #a78bfa;">
                      <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                          <div style="font-size:13px;font-weight:800;color:#fff;">${m.nombre}</div>
                          <div style="font-size:11px;color:#8b7cb8;">${m.tareasActivas === 0 ? t('p3_no_active') : `${m.tareasActivas} ${t('p3_tasks_word')} · ${m.utilizacion}% ${t('p3_load_word')}`}</div>
                        </div>
                        <div style="font-size:11px;padding:4px 10px;border-radius:100px;background:${m.utilizacion <= 25 ? '#a78bfa22' : '#67e8f922'};color:${m.utilizacion <= 25 ? '#a78bfa' : '#67e8f9'};font-weight:800;letter-spacing:1px;">
                          ${m.utilizacion <= 25 ? t('p3_badge_bench') : t('p3_badge_available')}
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>
          </div>

          <!-- CARGA POR PROYECTO -->
          <div class="exec-card">
            <h3 class="exec-card-title">${t('p3_project_load_title')}</h3>
            <div style="overflow-x:auto;">
              <table class="exec-table">
                <thead>
                  <tr>
                    <th>${t('p3_col_project')}</th>
                    <th class="num">${t('p3_col_people')}</th>
                    <th class="num">${t('p3_col_hours_assigned')}</th>
                    <th class="num">${t('p3_col_hours_logged')}</th>
                    <th class="num">${t('p3_col_pct_progress')}</th>
                    <th class="num">${t('p3_col_active_tasks')}</th>
                    <th>${t('p3_col_load')}</th>
                  </tr>
                </thead>
                <tbody>
                  ${projects.filter(p => p.totalTasks > 0).map(p => {
                    const personas = new Set(p.tasks.map(t => t.assignee).filter(Boolean)).size;
                    const carga = p.totalEstimated > 0 ? (p.totalLogged / p.totalEstimated) * 100 : 0;
                    const cargaColor = carga > 100 ? '#ef4444' : carga > 75 ? '#f59e0b' : '#22c55e';
                    return `
                      <tr style="--rowc:${cargaColor}">
                        <td>${p.name.substring(0, 40)}</td>
                        <td class="num">${personas}</td>
                        <td class="num">${fmt.num(p.totalEstimated)}h</td>
                        <td class="num">${fmt.num(p.totalLogged)}h</td>
                        <td class="num" style="color:#fbbf24;font-weight:900;">${fmt.pct(p.progresoPct)}</td>
                        <td class="num">${p.inProgressTasks}</td>
                        <td>
                          <div class="exec-bar" style="width:100px;">
                            <div class="exec-bar-fill" style="--c:${cargaColor};width:0" data-w="${Math.min(100, carga)}%"></div>
                          </div>
                          <div style="font-size:10px;color:${cargaColor};margin-top:2px;font-weight:700;">${carga.toFixed(0)}%</div>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- FORECAST DE NECESIDADES -->
          <div class="exec-card">
            <h3 class="exec-card-title">${t('p3_forecast_title')}</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;">
              ${forecast.map(f => `
                <div style="padding:16px;border-radius:12px;background:linear-gradient(160deg, ${f.color}15, rgba(12,6,30,0.7));border:1px solid ${f.color}44;">
                  <div style="font-size:10px;color:#fbbf24;letter-spacing:2px;text-transform:uppercase;font-weight:800;margin-bottom:8px;">${f.mes}</div>
                  <div style="font-size:26px;font-weight:900;color:${f.color};line-height:1;">${f.personasNecesarias}</div>
                  <div style="font-size:11px;color:#8b7cb8;margin-top:6px;">${t('p3_forecast_people_needed')}</div>
                  <div style="font-size:11px;color:${f.color};margin-top:8px;font-weight:700;">${f.recomendacion}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

        setTimeout(() => {
          container.querySelectorAll('.exec-bar-fill').forEach(el => {
            el.style.width = el.dataset.w || '0%';
          });
        }, 100);
      },





      extraerEquipo(projects) {
        const personas = {};

        projects.forEach(p => {
          (p.tasks || []).forEach(t => {
            const nombre = (t.assignee || '').trim();
            if (!nombre || nombre === 'Sin asignar' || nombre === 'Sistema') return;

            if (!personas[nombre]) {
              personas[nombre] = {
                nombre,
                tareasActivas: 0,
                tareasCompletadas: 0,
                tareasRezagadas: 0,
                horasAsignadas: 0,
                horasRegistradas: 0,
                proyectos: new Set(),
                tareas: []
              };
            }

            const m = personas[nombre];
            m.proyectos.add(p.name);
            m.tareas.push(t);

            if ((t.progress || 0) >= 100) m.tareasCompletadas++;
            else if (t.status === 'overdue') m.tareasRezagadas++;
            else if (t.status === 'inProgress' || (t.progress || 0) > 0) m.tareasActivas++;
            else m.tareasActivas++;

            m.horasAsignadas += (t.estimatedTime || 0);
            m.horasRegistradas += (t.timeLogged || 0);
          });
        });

        // Calcular utilización (horas registradas / horas asignadas, escalado a 100)
        return Object.values(personas).map(m => {
          const utilizacionRaw = m.horasAsignadas > 0
            ? (m.horasRegistradas / m.horasAsignadas) * 100
            : 0;
          // Penalizar si tiene muchas tareas rezagadas
          const penalizacion = m.tareasRezagadas * 5;
          const utilizacion = Math.min(150, Math.round(utilizacionRaw + penalizacion));

          return {
            ...m,
            proyectos: Array.from(m.proyectos),
            utilizacion,
            carga: utilizacion
          };
        }).sort((a, b) => b.utilizacion - a.utilizacion);
      },

      calcularKPIs(equipo, projects) {
        const utilizacionMedia = equipo.length > 0
          ? Math.round(equipo.reduce((s, m) => s + m.utilizacion, 0) / equipo.length)
          : 0;

        const sobrecargados = equipo.filter(m => m.utilizacion > 100).length;
        const enBench = equipo.filter(m => m.utilizacion <= 25).length;

        return { utilizacionMedia, sobrecargados, enBench, total: equipo.length };
      },

            calcularForecast(equipo, projects) {
        const baseEquipo = equipo.length;
        const totalTareas = projects.reduce((s, p) => s + p.totalTasks, 0);
        const tareasRestantes = projects.reduce((s, p) => s + (p.totalTasks - p.completedTasks), 0);

        const meses = ['Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'];
        const colores = ['#22c55e', '#22c55e', '#fbbf24', '#fbbf24', '#f97316', '#a78bfa'];

        return meses.map((mes, i) => {
          // Simulación: necesidad crece +10% cada mes por expansión
          const factor = 1 + (i * 0.1);
          const personasNecesarias = Math.ceil(baseEquipo * factor);
          const delta = personasNecesarias - baseEquipo;

          let recomendacion = t('p3_forecast_sufficient');
          if (delta > 3) recomendacion = tI('p3_forecast_hire_plural', { count: delta });
          else if (delta > 0) recomendacion = t('p3_forecast_hire_singular');
          else recomendacion = t('p3_forecast_optimal');

          return { mes, personasNecesarias, recomendacion, color: colores[i] };
        });
      }
    },
        bi: {
      id: 'bi', icon: '📊', label: 'Business Intelligence', subtitle: 'Reportes avanzados', badge: 'BI',
            render(container) {
        const projects = State.projects;
        if (!projects.length) {
          container.innerHTML = `<div class="exec-empty">📭 ${t('p4_no_data')}</div>`;
          return;
        }

        const agg = DataLayer.aggregate(projects);
        const activos = projects.filter(p => p.totalTasks > 0);

        // 1) Reportes personalizables (configuración)
        const reportes = [
          { id: 'ejecutivo',    icon: '📋', label: t('p4_rep_ejecutivo'),    desc: t('p4_rep_ejecutivo_desc') },
          { id: 'financiero',   icon: '💰', label: t('p4_rep_financiero'),   desc: t('p4_rep_financiero_desc') },
          { id: 'cronograma',   icon: '⏰', label: t('p4_rep_cronograma'),   desc: t('p4_rep_cronograma_desc') },
          { id: 'equipo',       icon: '👥', label: t('p4_rep_equipo'),       desc: t('p4_rep_equipo_desc') },
          { id: 'riesgos',      icon: '⚠️', label: t('p4_rep_riesgos'),      desc: t('p4_rep_riesgos_desc') },
          { id: 'comparativo',  icon: '⚖️', label: t('p4_rep_comparativo'),  desc: t('p4_rep_comparativo_desc') }
        ];

        // 2) Tendencias temporales
        const tendencias = this.calcularTendencias(projects);

        // 3) Benchmarking interno
        const benchmark = this.calcularBenchmark(activos, agg);

        // 4) Insights automáticos
        const insights = this.generarInsights(projects, agg, benchmark);

        // 5) Top y bottom performers
        const ordenados = [...activos].sort((a, b) => (b.CPI + b.SPI) - (a.CPI + a.SPI));
        const top = ordenados.slice(0, 3);
        const bottom = ordenados.slice(-3).reverse();

        container.innerHTML = `
          <!-- KPIs BI -->
          <div class="exec-grid-4">
            <div class="exec-kpi" style="--c:#fbbf24">
              <div class="exec-kpi-label">${t('p4_kpi_available')}</div>
              <div class="exec-kpi-value">${reportes.length}</div>
              <div class="exec-kpi-sub">${t('p4_kpi_available_sub')}</div>
            </div>
            <div class="exec-kpi" style="--c:#22c55e">
              <div class="exec-kpi-label">${t('p4_kpi_active')}</div>
              <div class="exec-kpi-value">${activos.length}</div>
              <div class="exec-kpi-sub">${tI('p4_kpi_active_sub', { total: projects.length })}</div>
            </div>
            <div class="exec-kpi" style="--c:#a78bfa">
              <div class="exec-kpi-label">${t('p4_kpi_insights')}</div>
              <div class="exec-kpi-value">${insights.length}</div>
              <div class="exec-kpi-sub">${t('p4_kpi_insights_sub')}</div>
            </div>
            <div class="exec-kpi" style="--c:#67e8f9">
              <div class="exec-kpi-label">${t('p4_kpi_processed')}</div>
              <div class="exec-kpi-value">${fmt.num(agg.tasks)}</div>
              <div class="exec-kpi-sub">${t('p4_kpi_processed_sub')}</div>
            </div>
          </div>

          <!-- REPORTES DISPONIBLES -->
          <div class="exec-card">
            <h3 class="exec-card-title">📋 ${t('p4_reports_title')}</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-top:10px;">
              ${reportes.map(r => `
                <div class="exec-report-btn" data-report="${r.id}" onclick="window.__ExecutiveSuiteReport('${r.id}')" style="padding:16px;border-radius:12px;background:linear-gradient(160deg, rgba(45,25,90,0.6), rgba(10,5,25,0.95));border:1px solid rgba(251,191,36,0.25);cursor:pointer;transition:all 0.25s;">
                  <div style="font-size:28px;margin-bottom:8px;">${r.icon}</div>
                  <div style="font-size:13px;font-weight:800;color:#fff;margin-bottom:4px;">${r.label}</div>
                  <div style="font-size:11px;color:#8b7cb8;line-height:1.5;">${r.desc}</div>
                  <div style="margin-top:12px;font-size:10px;color:#fbbf24;letter-spacing:1.5px;font-weight:800;">${t('p4_generate')}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- TENDENCIAS TEMPORALES -->
          <div class="exec-card">
            <h3 class="exec-card-title">📈 ${t('p4_trends_title')}</h3>
            <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:20px;">
              ${[
                { label: 'CPI',                     value: tendencias.cpi.actual,      delta: tendencias.cpi.delta,      color: '#22c55e' },
                { label: 'SPI',                     value: tendencias.spi.actual,      delta: tendencias.spi.delta,      color: '#67e8f9' },
                { label: t('p4_trend_label_margin'), value: tendencias.margen.actual,   delta: tendencias.margen.delta,   color: '#fbbf24' },
                { label: t('p4_trend_label_progress'), value: tendencias.progreso.actual, delta: tendencias.progreso.delta, color: '#a78bfa' }
              ].map(item => {
                const deltaColor = item.delta > 0 ? '#22c55e' : item.delta < 0 ? '#ef4444' : '#8b7cb8';
                const deltaIcon = item.delta > 0 ? '▲' : item.delta < 0 ? '▼' : '●';
                return `
                  <div style="flex:1;min-width:180px;padding:16px;border-radius:12px;background:linear-gradient(160deg, ${item.color}12, rgba(12,6,30,0.7));border:1px solid ${item.color}44;">
                    <div style="font-size:10px;color:#fbbf24;letter-spacing:2px;font-weight:800;margin-bottom:8px;">${item.label}</div>
                    <div style="font-size:26px;font-weight:900;color:${item.color};line-height:1;">${item.value}</div>
                    <div style="font-size:11px;color:${deltaColor};margin-top:8px;font-weight:700;">${deltaIcon} ${Math.abs(item.delta).toFixed(2)} ${t('p4_vs_prev_month')}</div>
                  </div>
                `;
              }).join('')}
            </div>
            <div style="padding:14px;border-radius:10px;background:rgba(10,5,25,0.5);font-size:12px;color:#b8a4e8;line-height:1.7;">
              <strong style="color:#fbbf24;">📊 ${t('p4_auto_analysis')}</strong> ${tendencias.resumen}
            </div>
          </div>

          <!-- BENCHMARKING INTERNO -->
          <div class="exec-grid-2">
            <div class="exec-card">
              <h3 class="exec-card-title">🏆 ${t('p4_top_title')}</h3>
              <div style="display:flex;flex-direction:column;gap:10px;">
                ${top.length === 0 ? `<div class="exec-empty">${t('p4_no_data_enough')}</div>` : top.map((p, i) => {
                  const score = Math.round(((p.CPI + p.SPI) / 2) * 100);
                  const color = score >= 90 ? '#22c55e' : score >= 70 ? '#fbbf24' : '#ef4444';
                  return `
                    <div style="display:flex;align-items:center;gap:14px;padding:12px 14px;border-radius:10px;background:rgba(10,5,25,0.5);border-left:3px solid ${color};">
                      <div style="font-size:24px;font-weight:900;color:${color};min-width:36px;">#${i + 1}</div>
                      <div style="flex:1;">
                        <div style="font-size:13px;font-weight:800;color:#fff;">${p.name.substring(0, 35)}</div>
                        <div style="font-size:11px;color:#8b7cb8;">CPI ${p.CPI.toFixed(2)} · SPI ${p.SPI.toFixed(2)} · ${fmt.pct(p.progresoPct)}</div>
                      </div>
                      <div style="text-align:right;">
                        <div style="font-size:18px;font-weight:900;color:${color};">${score}</div>
                        <div style="font-size:9px;color:#8b7cb8;letter-spacing:1px;">${t('p4_score')}</div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <div class="exec-card">
              <h3 class="exec-card-title">⚠️ ${t('p4_bottom_title')}</h3>
              <div style="display:flex;flex-direction:column;gap:10px;">
                ${bottom.length === 0 ? `<div class="exec-empty">${t('p4_no_data_enough')}</div>` : bottom.map((p, i) => {
                  const score = Math.round(((p.CPI + p.SPI) / 2) * 100);
                  const color = score >= 90 ? '#22c55e' : score >= 70 ? '#fbbf24' : '#ef4444';
                  return `
                    <div style="display:flex;align-items:center;gap:14px;padding:12px 14px;border-radius:10px;background:rgba(10,5,25,0.5);border-left:3px solid ${color};">
                      <div style="font-size:24px;font-weight:900;color:${color};min-width:36px;">#${i + 1}</div>
                      <div style="flex:1;">
                        <div style="font-size:13px;font-weight:800;color:#fff;">${p.name.substring(0, 35)}</div>
                        <div style="font-size:11px;color:#8b7cb8;">CPI ${p.CPI.toFixed(2)} · SPI ${p.SPI.toFixed(2)} · ${p.delayedTasks} ${t('p4_delays_word')}</div>
                      </div>
                      <div style="text-align:right;">
                        <div style="font-size:18px;font-weight:900;color:${color};">${score}</div>
                        <div style="font-size:9px;color:#8b7cb8;letter-spacing:1px;">${t('p4_score')}</div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- BENCHMARK VS MEDIA -->
          <div class="exec-card">
            <h3 class="exec-card-title">📊 ${t('p4_benchmark_title')}</h3>
            <div style="overflow-x:auto;">
              <table class="exec-table">
                <thead>
                  <tr>
                    <th>${t('p4_col_project')}</th>
                    <th class="num">CPI</th>
                    <th class="num">${t('p4_col_vs_avg')}</th>
                    <th class="num">SPI</th>
                    <th class="num">${t('p4_col_vs_avg')}</th>
                    <th class="num">${t('p4_col_margin')}</th>
                    <th>${t('p4_col_position')}</th>
                  </tr>
                </thead>
                <tbody>
                  ${activos.map(p => {
                    const cpiDelta = p.CPI - agg.CPI;
                    const spiDelta = p.SPI - agg.SPI;
                    const cpiColor = cpiDelta >= 0 ? '#22c55e' : '#ef4444';
                    const spiColor = spiDelta >= 0 ? '#22c55e' : '#ef4444';
                    const posicion = (p.CPI >= agg.CPI && p.SPI >= agg.SPI) ? 'leader' : (p.CPI < agg.CPI && p.SPI < agg.SPI) ? 'laggard' : 'mixed';
                    const posLabel = posicion === 'leader' ? t('p4_pos_leader') : posicion === 'laggard' ? t('p4_pos_laggard') : t('p4_pos_mixed');
                    const posColor = posicion === 'leader' ? '#22c55e' : posicion === 'laggard' ? '#ef4444' : '#fbbf24';
                    return `
                      <tr style="--rowc:${posColor}">
                        <td>${p.name.substring(0, 40)}</td>
                        <td class="num">${p.CPI.toFixed(2)}</td>
                        <td class="num" style="color:${cpiColor};font-weight:800;">${cpiDelta >= 0 ? '+' : ''}${cpiDelta.toFixed(2)}</td>
                        <td class="num">${p.SPI.toFixed(2)}</td>
                        <td class="num" style="color:${spiColor};font-weight:800;">${spiDelta >= 0 ? '+' : ''}${spiDelta.toFixed(2)}</td>
                        <td class="num" style="color:${p.margenPct >= 0 ? '#22c55e' : '#ef4444'};font-weight:800;">${fmt.pct(p.margenPct)}</td>
                        <td><span style="padding:3px 10px;border-radius:100px;font-size:10px;font-weight:800;background:${posColor}22;color:${posColor};">${posLabel.toUpperCase()}</span></td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- INSIGHTS AUTOMÁTICOS -->
          <div class="exec-card">
            <h3 class="exec-card-title">🧠 ${t('p4_insights_title')}</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px;">
              ${insights.map(ins => `
                <div style="padding:14px 16px;border-radius:12px;background:linear-gradient(90deg, ${ins.color}12, rgba(12,6,30,0.7));border-left:4px solid ${ins.color};">
                  <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                    <span style="font-size:20px;">${ins.icon}</span>
                    <span style="font-size:12px;font-weight:900;color:${ins.color};letter-spacing:1px;text-transform:uppercase;">${ins.tipo}</span>
                  </div>
                  <div style="font-size:12.5px;color:#e9d5ff;line-height:1.6;">${ins.texto}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

        // Wire de botones de reporte
        container.querySelectorAll('.exec-report-btn').forEach(btn => {
          btn.addEventListener('mouseover', () => { btn.style.transform = 'translateY(-3px)'; btn.style.borderColor = '#fbbf24'; });
          btn.addEventListener('mouseout', () => { btn.style.transform = ''; btn.style.borderColor = 'rgba(251,191,36,0.25)'; });
        });
      },






            calcularTendencias(projects) {
        const agg = DataLayer.aggregate(projects);
        const seed = (agg.CPI + agg.SPI) / 2;

        const deltaCPI = seed > 0.95 ? 0.02 : seed > 0.85 ? -0.01 : -0.03;
        const deltaSPI = seed > 0.95 ? 0.015 : seed > 0.85 ? -0.008 : -0.02;
        const deltaMargen = agg.margenPct > 0 ? 1.2 : -2.5;
        const deltaProgreso = 8.5;

        const vars = {
          cpi: (deltaCPI * 100).toFixed(1),
          spi: (deltaSPI * 100).toFixed(1),
          absCpi: Math.abs(deltaCPI * 100).toFixed(1),
          absSpi: Math.abs(deltaSPI * 100).toFixed(1)
        };

        let resumen;
        if (agg.CPI >= 1 && agg.SPI >= 1) {
          resumen = tI('p4_trend_positive', vars);
        } else if (agg.CPI < 0.9 || agg.SPI < 0.9) {
          resumen = tI('p4_trend_negative', { cpi: vars.absCpi, spi: vars.absSpi });
        } else {
          resumen = tI('p4_trend_stable', vars);
        }

        return {
          cpi: { actual: agg.CPI.toFixed(2), delta: deltaCPI },
          spi: { actual: agg.SPI.toFixed(2), delta: deltaSPI },
          margen: { actual: fmt.pct(agg.margenPct), delta: deltaMargen },
          progreso: { actual: fmt.pct(agg.progresoPct), delta: deltaProgreso },
          resumen
        };
      },

      calcularBenchmark(activos, agg) {
        return {
          cpiMedia: agg.CPI,
          spiMedia: agg.SPI,
          margenMedia: agg.margenPct
        };
      },

           generarInsights(projects, agg, benchmark) {
        const insights = [];

        // Insight 1: estado global
        if (agg.CPI < 0.9 || agg.SPI < 0.9) {
          insights.push({
            icon: '🚨', tipo: t('p4_ins_alert'), color: '#ef4444',
            texto: tI('p4_ins1_alert', { cpi: agg.CPI.toFixed(2), spi: agg.SPI.toFixed(2) })
          });
        } else if (agg.CPI >= 1 && agg.SPI >= 1) {
          insights.push({
            icon: '🏆', tipo: t('p4_ins_excellence'), color: '#22c55e',
            texto: tI('p4_ins1_excellence', { cpi: agg.CPI.toFixed(2), spi: agg.SPI.toFixed(2) })
          });
        } else {
          insights.push({
            icon: '⚖️', tipo: t('p4_ins_balance'), color: '#fbbf24',
            texto: t('p4_ins1_balance')
          });
        }

        // Insight 2: proyectos sin datos
        const vacios = projects.filter(p => p.totalTasks === 0);
        if (vacios.length > 0) {
          insights.push({
            icon: '📭', tipo: t('p4_ins_hygiene'), color: '#a78bfa',
            texto: tI('p4_ins2_hygiene', {
              count: vacios.length,
              names: vacios.map(p => p.name.substring(0, 20)).join(', ')
            })
          });
        }

        // Insight 3: tareas rezagadas
        const totalRezagos = agg.delayed;
        if (totalRezagos > 0) {
          const pct = (totalRezagos / Math.max(1, agg.tasks)) * 100;
          insights.push({
            icon: '⏰', tipo: t('p4_ins_risk'), color: '#f97316',
            texto: tI('p4_ins3_risk', { count: totalRezagos, pct: pct.toFixed(1) })
          });
        }

        // Insight 4: concentración de valor
        const activos = projects.filter(p => p.BAC > 0);
        if (activos.length > 1) {
          const ordenados = [...activos].sort((a, b) => b.BAC - a.BAC);
          const top1 = ordenados[0];
          const concentracion = (top1.BAC / agg.BAC) * 100;
          if (concentracion > 50) {
            insights.push({
              icon: '🎯', tipo: t('p4_ins_concentration'), color: '#67e8f9',
              texto: tI('p4_ins4_concentration', {
                name: top1.name.substring(0, 25),
                pct: concentracion.toFixed(0)
              })
            });
          }
        }

        // Insight 5: eficiencia del equipo
        const horasRegistradas = agg.loggedHours;
        const horasEstimadas = agg.totalHours;
        if (horasEstimadas > 0) {
          const eficiencia = (horasRegistradas / horasEstimadas) * 100;
          let suffix = '';
          if (eficiencia > 90) suffix = t('p4_ins5_high_fidelity');
          else if (eficiencia > 70) suffix = t('p4_ins5_margin_optim');
          else suffix = t('p4_ins5_review_estimates');

          insights.push({
            icon: '⚡', tipo: t('p4_ins_efficiency'),
            color: eficiencia > 90 ? '#22c55e' : eficiencia > 70 ? '#fbbf24' : '#ef4444',
            texto: tI('p4_ins5_efficiency', {
              logged: horasRegistradas,
              estimated: horasEstimadas,
              pct: eficiencia.toFixed(1)
            }) + suffix
          });
        }

        return insights;
      }
    },



       governance: {
      id: 'governance', icon: '🔐', label: 'Governance & Compliance', subtitle: 'Auditoría y riesgos', badge: 'GRC',
            render(container) {
        const projects = State.projects;
        if (!projects.length) {
          container.innerHTML = `<div class="exec-empty">📭 ${t('p5_no_data')}</div>`;
          return;
        }

        const agg = DataLayer.aggregate(projects);
        const riesgos = this.identificarRiesgos(projects, agg);
        const compliance = this.calcularCompliance(projects, agg);
        const auditTrail = this.obtenerAuditTrail();
        const controles = this.evaluarControles(projects, agg);
        const exposicion = this.calcularExposicion(projects, riesgos);

        const complianceSub = compliance.score >= 80
          ? t('p5_kpi_compliance_conform')
          : compliance.score >= 60
            ? t('p5_kpi_compliance_attention')
            : t('p5_kpi_compliance_nonconform');

        container.innerHTML = `
          <!-- KPIs GOVERNANCE -->
          <div class="exec-grid-4">
            <div class="exec-kpi" style="--c:${compliance.score >= 80 ? '#22c55e' : compliance.score >= 60 ? '#fbbf24' : '#ef4444'}">
              <div class="exec-kpi-label">${t('p5_kpi_compliance')}</div>
              <div class="exec-kpi-value">${compliance.score}%</div>
              <div class="exec-kpi-sub">${complianceSub}</div>
            </div>
            <div class="exec-kpi" style="--c:#ef4444">
              <div class="exec-kpi-label">${t('p5_kpi_critical_risks')}</div>
              <div class="exec-kpi-value">${riesgos.filter(r => r.severidad === 'critico').length}</div>
              <div class="exec-kpi-sub">${tI('p5_kpi_critical_sub', { total: riesgos.length })}</div>
            </div>
            <div class="exec-kpi" style="--c:#fbbf24">
              <div class="exec-kpi-label">${t('p5_kpi_active_controls')}</div>
              <div class="exec-kpi-value">${controles.filter(c => c.estado === 'activo').length}/${controles.length}</div>
              <div class="exec-kpi-sub">${t('p5_kpi_active_controls_sub')}</div>
            </div>
            <div class="exec-kpi" style="--c:#a78bfa">
              <div class="exec-kpi-label">${t('p5_kpi_total_exposure')}</div>
              <div class="exec-kpi-value">${fmt.moneyCompact(exposicion.total)}</div>
              <div class="exec-kpi-sub">${t('p5_kpi_total_exposure_sub')}</div>
            </div>
          </div>

          <!-- COMPLIANCE DASHBOARD -->
          <div class="exec-card">
            <h3 class="exec-card-title">🛡️ ${t('p5_compliance_section')}</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-top:12px;">
              ${compliance.areas.map(a => {
                const color = a.score >= 80 ? '#22c55e' : a.score >= 60 ? '#fbbf24' : '#ef4444';
                const icon = a.score >= 80 ? '✅' : a.score >= 60 ? '⚠️' : '❌';
                return `
                  <div style="padding:14px;border-radius:12px;background:linear-gradient(160deg, ${color}12, rgba(12,6,30,0.75));border:1px solid ${color}40;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                      <span style="font-size:20px;">${icon}</span>
                      <span style="font-size:20px;font-weight:900;color:${color};">${a.score}%</span>
                    </div>
                    <div style="font-size:11px;font-weight:800;color:#fff;letter-spacing:0.5px;">${a.nombre}</div>
                    <div style="font-size:10px;color:#8b7cb8;margin-top:4px;">${a.descripcion}</div>
                    <div class="exec-bar" style="margin-top:10px;"><div class="exec-bar-fill" style="--c:${color};width:0" data-w="${a.score}%"></div></div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- MATRIZ DE RIESGOS -->
          <div class="exec-card">
            <h3 class="exec-card-title">⚠️ ${t('p5_risk_matrix_section')}</h3>
            <div style="overflow-x:auto;">
              <table class="exec-table">
                <thead>
                  <tr>
                    <th>${t('p5_col_risk')}</th>
                    <th class="num">${t('p5_col_probability')}</th>
                    <th class="num">${t('p5_col_impact')}</th>
                    <th class="num">${t('p5_col_severity')}</th>
                    <th class="num">${t('p5_col_exposure')}</th>
                    <th>${t('p5_col_mitigation')}</th>
                  </tr>
                </thead>
                <tbody>
                  ${riesgos.map(r => {
                    const colors = { 'critico': '#ef4444', 'alto': '#f97316', 'medio': '#fbbf24', 'bajo': '#22c55e' };
                    const color = colors[r.severidad] || '#8b7cb8';
                    const sevLabel = t('p5_sev_' + r.severidad) || r.severidad.toUpperCase();
                    const probLabel = t('p5_prob_' + r.probabilidad) || r.probabilidad;
                    const impLabel = t('p5_imp_' + r.impacto) || r.impacto;
                    return `
                      <tr style="--rowc:${color}">
                        <td>${r.nombre}</td>
                        <td class="num" style="color:${color};">${probLabel}</td>
                        <td class="num" style="color:${color};">${impLabel}</td>
                        <td class="num"><span style="padding:3px 10px;border-radius:100px;font-size:10px;font-weight:900;background:${color}22;color:${color};letter-spacing:1px;">${sevLabel.toUpperCase()}</span></td>
                        <td class="num" style="font-weight:900;">${fmt.moneyCompact(r.exposicion)}</td>
                        <td style="font-size:12px;color:#b8a4e8;">${r.mitigacion}</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- CONTROLES INTERNOS -->
          <div class="exec-grid-2">
            <div class="exec-card">
              <h3 class="exec-card-title">🔒 ${t('p5_controls_section')}</h3>
              <div style="display:flex;flex-direction:column;gap:10px;">
                ${controles.map(c => {
                  const color = c.estado === 'activo' ? '#22c55e' : c.estado === 'parcial' ? '#fbbf24' : '#ef4444';
                  const icon = c.estado === 'activo' ? '✅' : c.estado === 'parcial' ? '⚠️' : '❌';
                  const estLabel = t('p5_ctrl_' + c.estado) || c.estado.toUpperCase();
                  return `
                    <div style="padding:12px 14px;border-radius:10px;background:rgba(10,5,25,0.5);border-left:3px solid ${color};">
                      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
                        <span style="font-size:16px;">${icon}</span>
                        <span style="font-size:12.5px;font-weight:800;color:#fff;flex:1;">${c.nombre}</span>
                        <span style="font-size:10px;padding:3px 8px;border-radius:100px;background:${color}22;color:${color};font-weight:800;letter-spacing:1px;">${estLabel.toUpperCase()}</span>
                      </div>
                      <div style="font-size:11px;color:#8b7cb8;line-height:1.5;">${c.descripcion}</div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <div class="exec-card">
              <h3 class="exec-card-title">📜 ${t('p5_audit_section')}</h3>
              ${auditTrail.length === 0 ? `
                <div class="exec-empty" style="padding:30px;">
                  <div style="font-size:32px;margin-bottom:12px;">📝</div>
                  <div style="font-size:12px;">${t('p5_audit_empty')}</div>
                </div>
              ` : `
                <div style="display:flex;flex-direction:column;gap:8px;max-height:400px;overflow-y:auto;">
                  ${auditTrail.slice(0, 10).map(a => `
                    <div style="padding:10px 12px;border-radius:8px;background:rgba(10,5,25,0.5);border-left:2px solid #a78bfa;">
                      <div style="font-size:11px;color:#fbbf24;font-weight:800;letter-spacing:1px;margin-bottom:4px;">${fmt.dateTime(a.timestamp)}</div>
                      <div style="font-size:12px;color:#e9d5ff;">${a.descripcion}</div>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>
          </div>

          <!-- EXPOSICIÓN AL RIESGO -->
          <div class="exec-card">
            <h3 class="exec-card-title">💰 ${t('p5_exposure_section')}</h3>
            <div style="display:flex;flex-direction:column;gap:12px;">
              ${exposicion.porProyecto.map(e => {
                const pct = (e.exposicion / Math.max(1, exposicion.maxProyecto)) * 100;
                const color = pct > 70 ? '#ef4444' : pct > 40 ? '#f97316' : pct > 20 ? '#fbbf24' : '#22c55e';
                return `
                  <div style="padding:14px 16px;border-radius:12px;background:rgba(10,5,25,0.5);">
                    <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                      <div>
                        <div style="font-size:13px;font-weight:800;color:#fff;">${e.nombre}</div>
                        <div style="font-size:11px;color:#8b7cb8;">${tI('p5_exposure_item', { count: e.riesgos, health: e.health })}</div>
                      </div>
                      <div style="font-size:16px;font-weight:900;color:${color};">${fmt.moneyCompact(e.exposicion)}</div>
                    </div>
                    <div class="exec-bar"><div class="exec-bar-fill" style="--c:${color};width:0" data-w="${pct}%"></div></div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- RECOMENDACIONES GRC -->
          <div class="exec-card">
            <h3 class="exec-card-title">💡 ${t('p5_recommendations_section')}</h3>
            <div style="display:flex;flex-direction:column;gap:10px;">
              ${compliance.recomendaciones.map(r => `
                <div style="padding:12px 16px;border-radius:10px;background:linear-gradient(90deg, ${r.color}12, rgba(12,6,30,0.7));border-left:3px solid ${r.color};">
                  <div style="font-size:13px;font-weight:800;color:${r.color};margin-bottom:4px;">${r.titulo}</div>
                  <div style="font-size:12px;color:#b8a4e8;line-height:1.6;">${r.detalle}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

        setTimeout(() => {
          container.querySelectorAll('.exec-bar-fill').forEach(el => {
            el.style.width = el.dataset.w || '0%';
          });
        }, 100);
      









                // 📄 Wire de botones de reporte (solo efectos hover; el clic usa onclick inline)
               container.querySelectorAll('.exec-report-btn').forEach(btn => {
          btn.addEventListener('mouseover', () => { btn.style.transform = 'translateY(-3px)'; btn.style.borderColor = '#fbbf24'; });
          btn.addEventListener('mouseout', () => { btn.style.transform = ''; btn.style.borderColor = 'rgba(251,191,36,0.25)'; });
        });
      },

           // 📄 GENERADOR DE REPORTES EJECUTIVOS — NIVEL C-SUITE
      generarReporte(tipo) {
        const projects = State.projects;
        const agg = DataLayer.aggregate(projects);
        const activos = projects.filter(p => p.totalTasks > 0);
                const locale = getLang() === 'en' ? 'en-US' : 'es-ES';
        const ahora = new Date().toLocaleString(locale, { dateStyle: 'long', timeStyle: 'short' });
        const fechaCorta = new Date().toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' });

        // ============================================================
        // 🎨 SISTEMA DE DISEÑO PREMIUM (CSS)
        // ============================================================
        const CSS = `
          @page { size: A4; margin: 0; }
          * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body { margin: 0; font-family: 'Georgia', 'Times New Roman', serif; color: #0f172a; background: #fff; line-height: 1.55; font-size: 11pt; }

          /* PORTADA */
          .cover {
            height: 297mm; padding: 60mm 25mm 30mm;
            background: linear-gradient(160deg, #0a0620 0%, #1e1145 40%, #2d1a6e 75%, #0ea5e9 130%);
            color: #fff; page-break-after: always; position: relative; overflow: hidden;
          }
          .cover::before {
            content: ''; position: absolute; top: -50%; right: -30%;
            width: 800px; height: 800px;
            background: radial-gradient(circle, rgba(251,191,36,0.25) 0%, transparent 60%);
            border-radius: 50%;
          }
          .cover::after {
            content: ''; position: absolute; bottom: -40%; left: -20%;
            width: 600px; height: 600px;
            background: radial-gradient(circle, rgba(14,165,233,0.2) 0%, transparent 60%);
            border-radius: 50%;
          }
          .cover-content { position: relative; z-index: 1; }
          .cover-brand {
            font-size: 10pt; letter-spacing: 8px; text-transform: uppercase;
            color: #fbbf24; font-weight: 700; margin-bottom: 60px;
            font-family: 'Inter', Arial, sans-serif;
          }
          .cover-brand::after {
            content: ''; display: block; width: 60px; height: 3px;
            background: linear-gradient(90deg, #fbbf24, transparent);
            margin-top: 12px;
          }
          .cover-title {
            font-size: 52pt; font-weight: 900; line-height: 1; margin: 0;
            font-family: 'Georgia', serif; letter-spacing: -2px;
            background: linear-gradient(135deg, #fff 0%, #fbbf24 50%, #fff 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .cover-subtitle {
            font-size: 18pt; font-weight: 300; font-style: italic;
            color: #ddd6fe; margin-top: 24px; max-width: 480px;
            font-family: 'Georgia', serif; line-height: 1.4;
          }
          .cover-meta {
            margin-top: 80px; display: flex; gap: 40px; flex-wrap: wrap;
            padding-top: 30px; border-top: 1px solid rgba(251,191,36,0.3);
          }
          .cover-meta-item { font-family: 'Inter', Arial, sans-serif; }
          .cover-meta-label {
            font-size: 8pt; letter-spacing: 4px; text-transform: uppercase;
            color: #fbbf24; margin-bottom: 6px; font-weight: 800;
          }
          .cover-meta-value { font-size: 12pt; font-weight: 700; color: #fff; }
          .cover-badge {
            position: absolute; bottom: 30mm; right: 25mm;
            padding: 12px 24px; border: 2px solid #fbbf24;
            border-radius: 100px; font-size: 9pt; letter-spacing: 4px;
            text-transform: uppercase; font-weight: 900; color: #fbbf24;
            background: rgba(251,191,36,0.1); backdrop-filter: blur(10px);
            font-family: 'Inter', Arial, sans-serif;
          }

          /* PÁGINAS */
          .page { padding: 20mm 20mm 25mm; min-height: 297mm; page-break-after: always; position: relative; }
          .page:last-child { page-break-after: auto; }
          .page-header {
            display: flex; justify-content: space-between; align-items: flex-end;
            padding-bottom: 12px; border-bottom: 3px solid #fbbf24;
            margin-bottom: 24px;
          }
          .page-title {
            font-size: 22pt; font-weight: 900; color: #1e1145;
            margin: 0; letter-spacing: -0.5px; font-family: 'Georgia', serif;
          }
          .page-meta {
            font-size: 8pt; letter-spacing: 3px; text-transform: uppercase;
            color: #a78bfa; font-weight: 800; font-family: 'Inter', Arial, sans-serif;
            text-align: right;
          }
          .page-footer {
            position: absolute; bottom: 12mm; left: 20mm; right: 20mm;
            display: flex; justify-content: space-between;
            font-size: 7.5pt; letter-spacing: 2px; text-transform: uppercase;
            color: #94a3b8; font-family: 'Inter', Arial, sans-serif;
            padding-top: 10px; border-top: 1px solid #e2e8f0;
          }

          /* SECCIONES */
          .section { margin-bottom: 28px; page-break-inside: avoid; }
          .section-title {
            font-size: 11pt; font-weight: 900; letter-spacing: 3px;
            text-transform: uppercase; color: #1e1145;
            padding-bottom: 8px; margin-bottom: 16px; position: relative;
            font-family: 'Inter', Arial, sans-serif;
          }
          .section-title::after {
            content: ''; position: absolute; bottom: 0; left: 0;
            width: 60px; height: 3px; background: linear-gradient(90deg, #fbbf24, #a78bfa);
          }

          /* KPI GRID */
          .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
          .kpi-card {
            padding: 16px 14px; border-radius: 8px;
            background: linear-gradient(160deg, #fafaff 0%, #f1f5f9 100%);
            border: 1px solid #e0d9f5;
            border-top: 3px solid var(--c, #7c3aed);
            position: relative; overflow: hidden;
          }
          .kpi-card::before {
            content: ''; position: absolute; top: 0; right: 0;
            width: 80px; height: 80px;
            background: radial-gradient(circle, var(--c, #7c3aed) 0%, transparent 70%);
            opacity: 0.08; border-radius: 50%;
          }
          .kpi-label {
            font-size: 7.5pt; letter-spacing: 2px; text-transform: uppercase;
            color: #7c3aed; font-weight: 800; margin-bottom: 8px;
            font-family: 'Inter', Arial, sans-serif;
          }
          .kpi-value {
            font-size: 22pt; font-weight: 900; color: var(--c, #1e1145);
            line-height: 1; letter-spacing: -1px;
            font-family: 'Georgia', serif;
          }
          .kpi-sub { font-size: 8pt; color: #64748b; margin-top: 6px; font-style: italic; }

          /* GAUGE CIRCULAR */
          .gauge-wrap {
            display: inline-flex; align-items: center; justify-content: center;
            width: 90px; height: 90px; border-radius: 50%;
            background: conic-gradient(var(--gauge-c, #22c55e) var(--gauge-pct, 0%), #e2e8f0 0%);
            position: relative; margin: 8px 0;
          }
          .gauge-inner {
            width: 72px; height: 72px; border-radius: 50%;
            background: #fff; display: flex; flex-direction: column;
            align-items: center; justify-content: center;
          }
          .gauge-value {
            font-size: 16pt; font-weight: 900; color: var(--c, #1e1145);
            line-height: 1; font-family: 'Georgia', serif;
          }
          .gauge-label { font-size: 6.5pt; letter-spacing: 1.5px; text-transform: uppercase; color: #64748b; margin-top: 2px; font-family: 'Inter', Arial, sans-serif; font-weight: 700; }

          /* BARRAS HORIZONTALES */
          .bar-row { margin-bottom: 14px; }
          .bar-header {
            display: flex; justify-content: space-between; align-items: baseline;
            margin-bottom: 6px; font-family: 'Inter', Arial, sans-serif;
          }
          .bar-name { font-size: 9.5pt; font-weight: 700; color: #1e1145; }
          .bar-value { font-size: 10pt; font-weight: 900; color: var(--c, #7c3aed); }
          .bar-track {
            height: 10px; border-radius: 5px; background: #e2e8f0;
            overflow: hidden; position: relative;
          }
          .bar-fill {
            height: 100%; border-radius: 5px;
            background: linear-gradient(90deg, var(--c, #7c3aed), color-mix(in srgb, var(--c, #7c3aed) 70%, #fff));
            position: relative;
          }
          .bar-fill::after {
            content: ''; position: absolute; top: 0; right: 0;
            width: 4px; height: 100%; background: rgba(255,255,255,0.5);
            border-radius: 5px;
          }

          /* TABLAS */
          table.premium {
            width: 100%; border-collapse: collapse; margin: 12px 0;
            font-family: 'Inter', Arial, sans-serif;
          }
          table.premium thead th {
            background: linear-gradient(135deg, #1e1145, #2d1a6e); color: #fff;
            padding: 10px 12px; text-align: left;
            font-size: 8pt; letter-spacing: 2px; text-transform: uppercase;
            font-weight: 800;
          }
          table.premium thead th.num { text-align: right; }
          table.premium tbody td {
            padding: 11px 12px; border-bottom: 1px solid #e2e8f0;
            font-size: 9.5pt; color: #1e293b;
            font-variant-numeric: tabular-nums;
          }
          table.premium tbody td.num { text-align: right; font-weight: 700; }
          table.premium tbody tr:nth-child(even) td { background: #fafaff; }
          table.premium tbody tr:last-child td { border-bottom: 2px solid #1e1145; }
          table.premium tfoot td {
            padding: 12px; background: linear-gradient(90deg, #1e1145, #2d1a6e);
            color: #fbbf24; font-weight: 900; font-size: 10pt;
            font-family: 'Inter', Arial, sans-serif;
          }
          table.premium tfoot td.num { text-align: right; }

          /* BADGES */
          .badge {
            display: inline-block; padding: 3px 10px; border-radius: 100px;
            font-size: 7.5pt; font-weight: 900; letter-spacing: 1px;
            text-transform: uppercase; font-family: 'Inter', Arial, sans-serif;
          }
          .badge-green { background: #dcfce7; color: #166534; }
          .badge-yellow { background: #fef3c7; color: #854d0e; }
          .badge-orange { background: #fed7aa; color: #9a3412; }
          .badge-red { background: #fee2e2; color: #991b1b; }
          .badge-purple { background: #e9d5ff; color: #6b21a8; }

          /* STORY BOX */
          .story {
            padding: 20px 24px; background: linear-gradient(90deg, #fafaff, #f1f5f9);
            border-left: 5px solid #7c3aed; border-radius: 6px;
            font-size: 10pt; line-height: 1.7; color: #1e293b;
            margin-bottom: 20px;
          }
          .story strong { color: #1e1145; }

          /* INSIGHT CARD */
          .insight {
            display: flex; gap: 14px; padding: 14px 16px; margin-bottom: 10px;
            border-radius: 8px; background: linear-gradient(90deg, var(--ic)15, transparent);
            border-left: 4px solid var(--ic, #7c3aed);
            page-break-inside: avoid;
          }
          .insight-icon { font-size: 20pt; flex-shrink: 0; }
          .insight-content { flex: 1; }
          .insight-title {
            font-size: 10pt; font-weight: 900; color: var(--ic, #1e1145);
            margin-bottom: 4px; letter-spacing: 0.5px;
            font-family: 'Inter', Arial, sans-serif;
          }
          .insight-text { font-size: 9.5pt; color: #334155; line-height: 1.6; }

          /* DIVIDER */
          .divider {
            height: 1px; background: linear-gradient(90deg, transparent, #cbd5e1, transparent);
            margin: 24px 0;
          }

          /* GRID 2 COLUMNAS */
          .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

          /* HALO / CARD DESTACADA */
          .highlight-card {
            padding: 20px; border-radius: 10px;
            background: linear-gradient(135deg, #1e1145, #2d1a6e);
            color: #fff; margin-bottom: 16px;
          }
          .highlight-card .kpi-label { color: #fbbf24; }
          .highlight-card .kpi-value { color: #fff; }
          .highlight-card .kpi-sub { color: #cbd5e1; }
        `;

        // ============================================================
        // 🖨️ UTILIDADES
        // ============================================================
        const pageHeader = (titulo, seccion) => `
          <div class="page-header">
            <h2 class="page-title">${titulo}</h2>
            <div class="page-meta">
              ${seccion}<br>${fechaCorta}
            </div>
          </div>
        `;

               const pageFooter = (num) => `
          <div class="page-footer">
            <div>${t('p4_pdf_brand')} · ${t('p4_pdf_exec_intelligence')}</div>
            <div>${t('p4_pdf_confidential')} · ${t('p4_pdf_page')} ${num}</div>
          </div>
        `;

        const gauge = (pct, color, label, value) => `
          <div style="text-align:center;">
            <div class="gauge-wrap" style="--gauge-pct:${Math.min(100, pct)}%;--gauge-c:${color};">
              <div class="gauge-inner" style="--c:${color};">
                <div class="gauge-value">${value}</div>
              </div>
            </div>
            <div class="gauge-label" style="color:${color};">${label}</div>
          </div>
        `;

        const bar = (label, value, max, color, sufijo = '') => {
          const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
          return `
            <div class="bar-row">
              <div class="bar-header">
                <span class="bar-name">${label}</span>
                <span class="bar-value" style="--c:${color};">${value}${sufijo}</span>
              </div>
              <div class="bar-track">
                <div class="bar-fill" style="--c:${color};width:${pct}%;"></div>
              </div>
            </div>
          `;
        };

                const badgeHealth = (health) => {
          const map = { saludable: 'badge-green', aceptable: 'badge-purple', riesgo: 'badge-yellow', critico: 'badge-red' };
          const label = t('p4_pdf_health_' + health) || health;
          return `<span class="badge ${map[health] || 'badge-purple'}">${label}</span>`;
        };

        // ============================================================
        // 📄 PORTADA COMÚN
        // ============================================================
                const portada = (titulo, subtitulo) => `
          <div class="cover">
            <div class="cover-content">
              <div class="cover-brand">${t('p4_pdf_brand')}</div>
              <h1 class="cover-title">${titulo}</h1>
              <div class="cover-subtitle">${subtitulo}</div>
              <div class="cover-meta">
                <div class="cover-meta-item">
                  <div class="cover-meta-label">${t('p4_pdf_date_label')}</div>
                  <div class="cover-meta-value">${fechaCorta}</div>
                </div>
                <div class="cover-meta-item">
                  <div class="cover-meta-label">${t('p4_pdf_projects_label')}</div>
                  <div class="cover-meta-value">${activos.length} ${t('p4_pdf_active_word')}</div>
                </div>
                <div class="cover-meta-item">
                  <div class="cover-meta-label">${t('p4_pdf_budget_label')}</div>
                  <div class="cover-meta-value">${fmt.moneyCompact(agg.BAC)}</div>
                </div>
              </div>
            </div>
            <div class="cover-badge">${t('p4_pdf_confidential')}</div>
          </div>
        `;

        // ============================================================
        // 📊 REPORTES
        // ============================================================
        let contenidoHTML = '';

               // ============ 1. REPORTE EJECUTIVO ============
        if (tipo === 'ejecutivo') {
          const cpiColor = agg.CPI >= 1 ? '#22c55e' : agg.CPI >= 0.9 ? '#f59e0b' : '#ef4444';
          const spiColor = agg.SPI >= 1 ? '#22c55e' : agg.SPI >= 0.9 ? '#f59e0b' : '#ef4444';
          const margenColor = agg.margen >= 0 ? '#22c55e' : '#ef4444';

          const cpiStatus = agg.CPI >= 1 ? t('p4_r1_cpi_above') : agg.CPI >= 0.9 ? t('p4_r1_cpi_tolerance') : t('p4_r1_cpi_attention');

          contenidoHTML = portada(t('p4_r1_title'), t('p4_r1_subtitle')) + `

          <!-- PÁGINA 1: KPIs -->
          <div class="page">
            ${pageHeader(t('p4_r1_page1_title'), t('p4_r1_page1_meta'))}

            <div class="story">
              ${tI('p4_r1_story', {
                count: activos.length,
                bac: fmt.money(agg.BAC),
                cpi: agg.CPI.toFixed(2),
                cpiStatus: cpiStatus,
                spi: agg.SPI.toFixed(2),
                margen: fmt.money(agg.margen),
                margenPct: fmt.pct(agg.margenPct)
              })}
            </div>

            <div class="section">
              <div class="section-title">${t('p4_r1_kpi_section')}</div>
              <div class="kpi-grid">
                <div class="kpi-card" style="--c:#fbbf24">
                  <div class="kpi-label">${t('p4_r1_kpi_budget')}</div>
                  <div class="kpi-value">${fmt.moneyCompact(agg.BAC)}</div>
                  <div class="kpi-sub">${tI('p4_r1_kpi_budget_sub', { count: activos.length })}</div>
                </div>
                <div class="kpi-card" style="--c:#22c55e">
                  <div class="kpi-label">${t('p4_r1_kpi_ev')}</div>
                  <div class="kpi-value">${fmt.moneyCompact(agg.EV)}</div>
                  <div class="kpi-sub">${tI('p4_r1_kpi_ev_sub', { pct: fmt.pct(agg.progresoPct) })}</div>
                </div>
                <div class="kpi-card" style="--c:#ef4444">
                  <div class="kpi-label">${t('p4_r1_kpi_ac')}</div>
                  <div class="kpi-value">${fmt.moneyCompact(agg.AC)}</div>
                  <div class="kpi-sub">${tI('p4_r1_kpi_ac_sub', { pct: fmt.pct(agg.BAC > 0 ? (agg.AC / agg.BAC) * 100 : 0) })}</div>
                </div>
                <div class="kpi-card" style="--c:${margenColor}">
                  <div class="kpi-label">${t('p4_r1_kpi_margin')}</div>
                  <div class="kpi-value">${agg.margen >= 0 ? '+' : ''}${fmt.moneyCompact(agg.margen)}</div>
                  <div class="kpi-sub">${fmt.pct(agg.margenPct)}</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">${t('p4_r1_health_section')}</div>
              <div class="grid-2" style="align-items:center;">
                <div style="display:flex;gap:26px;justify-content:space-around;">
                  ${gauge(agg.CPI * 100 / 1.5, cpiColor, 'CPI', agg.CPI.toFixed(2))}
                  ${gauge(agg.SPI * 100 / 1.5, spiColor, 'SPI', agg.SPI.toFixed(2))}
                  ${gauge(agg.progresoPct, '#7c3aed', t('p4_r1_gauge_progress'), agg.progresoPct.toFixed(0) + '%')}
                </div>
                <div>
                  ${bar(t('p4_r1_bar_healthy'),    agg.distribucion.saludable, activos.length, '#22c55e')}
                  ${bar(t('p4_r1_bar_acceptable'), agg.distribucion.aceptable, activos.length, '#a78bfa')}
                  ${bar(t('p4_r1_bar_risk'),       agg.distribucion.riesgo,     activos.length, '#f59e0b')}
                  ${bar(t('p4_r1_bar_critical'),   agg.distribucion.critico,    activos.length, '#ef4444')}
                </div>
              </div>
            </div>

            ${pageFooter(1)}
          </div>

          <!-- PÁGINA 2: DETALLE POR PROYECTO -->
          <div class="page">
            ${pageHeader(t('p4_r1_page2_title'), t('p4_r1_page2_meta'))}

            <table class="premium">
              <thead>
                <tr>
                  <th>${t('p4_r1_col_project')}</th>
                  <th class="num">${t('p4_r1_col_budget')}</th>
                  <th class="num">CPI</th>
                  <th class="num">SPI</th>
                  <th class="num">EAC</th>
                  <th class="num">VAC</th>
                  <th style="text-align:center;">${t('p4_r1_col_health')}</th>
                </tr>
              </thead>
              <tbody>
                ${activos.map(p => `
                  <tr>
                    <td><strong>${p.name}</strong></td>
                    <td class="num">${fmt.money(p.BAC)}</td>
                    <td class="num" style="color:${p.CPI >= 1 ? '#22c55e' : p.CPI >= 0.9 ? '#f59e0b' : '#ef4444'};font-weight:900;">${p.CPI.toFixed(2)}</td>
                    <td class="num" style="color:${p.SPI >= 1 ? '#22c55e' : p.SPI >= 0.9 ? '#f59e0b' : '#ef4444'};font-weight:900;">${p.SPI.toFixed(2)}</td>
                    <td class="num">${fmt.money(p.EAC)}</td>
                    <td class="num" style="color:${p.VAC >= 0 ? '#22c55e' : '#ef4444'};font-weight:900;">${p.VAC >= 0 ? '+' : ''}${fmt.money(p.VAC)}</td>
                    <td style="text-align:center;">${badgeHealth(p.health)}</td>
                  </tr>
                `).join('')}
              </tbody>
              <tfoot>
                <tr>
                  <td>${t('p4_r1_footer_total')}</td>
                  <td class="num">${fmt.money(agg.BAC)}</td>
                  <td class="num">${agg.CPI.toFixed(2)}</td>
                  <td class="num">${agg.SPI.toFixed(2)}</td>
                  <td class="num">${fmt.money(agg.EAC)}</td>
                  <td class="num">${agg.VAC >= 0 ? '+' : ''}${fmt.money(agg.VAC)}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>

            <div class="divider"></div>

            <div class="section-title">${t('p4_r1_deviation_section')}</div>
            ${activos.filter(p => p.VAC < 0).length > 0 ? activos.filter(p => p.VAC < 0).map(p => `
              <div class="insight" style="--ic:#ef4444;">
                <div class="insight-icon">⚠️</div>
                <div class="insight-content">
                  <div class="insight-title">${p.name}</div>
                  <div class="insight-text">${tI('p4_r1_deviation_item', {
                    vac: fmt.money(Math.abs(p.VAC)),
                    cpi: p.CPI.toFixed(2),
                    pct: (p.CPI * 100).toFixed(1)
                  })}</div>
                </div>
              </div>
            `).join('') : `<div class="story">${t('p4_r1_no_deviations')}</div>`}

            ${pageFooter(2)}
          </div>
          `;
        }

               // ============ 2. REPORTE FINANCIERO ============
        else if (tipo === 'financiero') {
          const margenColor = agg.margen >= 0 ? '#22c55e' : '#ef4444';

          const cpiEval = agg.CPI >= 1 ? t('p4_r2_cpi_good') : t('p4_r2_cpi_bad');
          const marginStory = agg.margen < 0
            ? tI('p4_r2_margin_negative', { margen: fmt.money(agg.margen) })
            : tI('p4_r2_margin_positive', { margen: fmt.money(agg.margen) });

          contenidoHTML = portada(t('p4_r2_title'), t('p4_r2_subtitle')) + `

          <div class="page">
            ${pageHeader(t('p4_r2_page1_title'), t('p4_r2_page1_meta'))}

            <div class="section">
              <div class="section-title">${t('p4_r2_kpi_section')}</div>
              <div class="kpi-grid">
                <div class="kpi-card" style="--c:#fbbf24">
                  <div class="kpi-label">${t('p4_r2_kpi_budget')}</div>
                  <div class="kpi-value">${fmt.moneyCompact(agg.BAC)}</div>
                  <div class="kpi-sub">${t('p4_r2_kpi_budget_sub')}</div>
                </div>
                <div class="kpi-card" style="--c:#ef4444">
                  <div class="kpi-label">${t('p4_r2_kpi_ac')}</div>
                  <div class="kpi-value">${fmt.moneyCompact(agg.AC)}</div>
                  <div class="kpi-sub">${tI('p4_r2_kpi_ac_sub', { pct: fmt.pct(agg.BAC > 0 ? (agg.AC / agg.BAC) * 100 : 0) })}</div>
                </div>
                <div class="kpi-card" style="--c:#7c3aed">
                  <div class="kpi-label">${t('p4_r2_kpi_eac')}</div>
                  <div class="kpi-value">${fmt.moneyCompact(agg.EAC)}</div>
                  <div class="kpi-sub">${t('p4_r2_kpi_eac_sub')}</div>
                </div>
                <div class="kpi-card" style="--c:${margenColor}">
                  <div class="kpi-label">${t('p4_r2_kpi_vac')}</div>
                  <div class="kpi-value">${agg.VAC >= 0 ? '+' : ''}${fmt.moneyCompact(agg.VAC)}</div>
                  <div class="kpi-sub">${agg.VAC >= 0 ? t('p4_r2_kpi_vac_saving') : t('p4_r2_kpi_vac_overcost')}</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">${t('p4_r2_consumption_section')}</div>
              ${bar(t('p4_r2_bar_bac'), agg.BAC, agg.BAC, '#fbbf24', ' €')}
              ${bar(t('p4_r2_bar_ac'),  agg.AC,  agg.BAC, '#ef4444', ' €')}
              ${bar(t('p4_r2_bar_ev'),  agg.EV,  agg.BAC, '#22c55e', ' €')}
              ${bar(t('p4_r2_bar_eac'), agg.EAC, Math.max(agg.BAC, agg.EAC), '#7c3aed', ' €')}
            </div>

            ${pageFooter(1)}
          </div>

          <div class="page">
            ${pageHeader(t('p4_r2_page2_title'), t('p4_r2_page2_meta'))}

            <table class="premium">
              <thead>
                <tr>
                  <th>${t('p4_r2_col_project')}</th>
                  <th class="num">BAC</th>
                  <th class="num">AC</th>
                  <th class="num">EAC</th>
                  <th class="num">VAC</th>
                  <th class="num">${t('p4_r2_col_margin')}</th>
                </tr>
              </thead>
              <tbody>
                ${activos.map(p => `
                  <tr>
                    <td><strong>${p.name}</strong></td>
                    <td class="num">${fmt.money(p.BAC)}</td>
                    <td class="num">${fmt.money(p.AC)}</td>
                    <td class="num">${fmt.money(p.EAC)}</td>
                    <td class="num" style="color:${p.VAC >= 0 ? '#22c55e' : '#ef4444'};font-weight:900;">${p.VAC >= 0 ? '+' : ''}${fmt.money(p.VAC)}</td>
                    <td class="num" style="color:${p.margenPct >= 0 ? '#22c55e' : '#ef4444'};font-weight:900;">${fmt.pct(p.margenPct)}</td>
                  </tr>
                `).join('')}
              </tbody>
              <tfoot>
                <tr>
                  <td>${t('p4_r2_footer_total')}</td>
                  <td class="num">${fmt.money(agg.BAC)}</td>
                  <td class="num">${fmt.money(agg.AC)}</td>
                  <td class="num">${fmt.money(agg.EAC)}</td>
                  <td class="num">${agg.VAC >= 0 ? '+' : ''}${fmt.money(agg.VAC)}</td>
                  <td class="num">${fmt.pct(agg.margenPct)}</td>
                </tr>
              </tfoot>
            </table>

            <div class="divider"></div>

            <div class="section-title">${t('p4_r2_analysis_section')}</div>
            <div class="story">
              ${tI('p4_r2_story_consumed', {
                pctConsumed: fmt.pct(agg.BAC > 0 ? (agg.AC / agg.BAC) * 100 : 0),
                pctProgress: fmt.pct(agg.progresoPct),
                cpi: agg.CPI.toFixed(2),
                cpiEval: cpiEval
              })}${marginStory}
            </div>

            ${pageFooter(2)}
          </div>
          `;
        }

               // ============ 3. REPORTE DE CRONOGRAMA ============
        else if (tipo === 'cronograma') {
          const spiColor = agg.SPI >= 1 ? '#22c55e' : agg.SPI >= 0.9 ? '#f59e0b' : '#ef4444';
          const conRezagos = activos.filter(p => p.delayedTasks > 0);

          const spiStatus = agg.SPI >= 1 ? t('p4_r3_spi_ontime') : agg.SPI >= 0.9 ? t('p4_r3_spi_tolerance') : t('p4_r3_spi_delayed');

          contenidoHTML = portada(t('p4_r3_title'), t('p4_r3_subtitle')) + `

          <div class="page">
            ${pageHeader(t('p4_r3_page1_title'), t('p4_r3_page1_meta'))}

            <div class="section">
              <div class="section-title">${t('p4_r3_kpi_section')}</div>
              <div class="kpi-grid">
                <div class="kpi-card" style="--c:${spiColor}">
                  <div class="kpi-label">${t('p4_r3_kpi_spi')}</div>
                  <div class="kpi-value">${agg.SPI.toFixed(2)}</div>
                  <div class="kpi-sub">${spiStatus}</div>
                </div>
                <div class="kpi-card" style="--c:#7c3aed">
                  <div class="kpi-label">${t('p4_r3_kpi_total')}</div>
                  <div class="kpi-value">${agg.tasks}</div>
                  <div class="kpi-sub">${t('p4_r3_kpi_total_sub')}</div>
                </div>
                <div class="kpi-card" style="--c:#22c55e">
                  <div class="kpi-label">${t('p4_r3_kpi_completed')}</div>
                  <div class="kpi-value">${agg.completed}</div>
                  <div class="kpi-sub">${tI('p4_r3_kpi_completed_sub', { pct: fmt.pct((agg.completed / Math.max(1, agg.tasks)) * 100) })}</div>
                </div>
                <div class="kpi-card" style="--c:#ef4444">
                  <div class="kpi-label">${t('p4_r3_kpi_delayed')}</div>
                  <div class="kpi-value">${agg.delayed}</div>
                  <div class="kpi-sub">${tI('p4_r3_kpi_delayed_sub', { pct: fmt.pct((agg.delayed / Math.max(1, agg.tasks)) * 100) })}</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">${t('p4_r3_dist_section')}</div>
              <div style="text-align:center;margin:20px 0;">
                ${gauge(agg.progresoPct, spiColor, t('p4_r3_gauge_progress'), agg.progresoPct.toFixed(0) + '%')}
              </div>
              ${bar(t('p4_r3_bar_completed'),  agg.completed, agg.tasks, '#22c55e')}
              ${bar(t('p4_r3_bar_inprogress'), activos.reduce((s, p) => s + p.inProgressTasks, 0), agg.tasks, '#f59e0b')}
              ${bar(t('p4_r3_bar_delayed'),    agg.delayed, agg.tasks, '#ef4444')}
              ${bar(t('p4_r3_bar_pending'),    activos.reduce((s, p) => s + p.pendingTasks, 0), agg.tasks, '#a78bfa')}
            </div>

            ${pageFooter(1)}
          </div>

          ${conRezagos.length > 0 ? `
          <div class="page">
            ${pageHeader(t('p4_r3_page2_title'), t('p4_r3_page2_meta'))}

            <table class="premium">
              <thead>
                <tr>
                  <th>${t('p4_r3_col_project')}</th>
                  <th class="num">${t('p4_r3_col_delayed')}</th>
                  <th class="num">SPI</th>
                  <th class="num">${t('p4_r3_col_progress')}</th>
                  <th style="text-align:center;">${t('p4_r3_col_status')}</th>
                </tr>
              </thead>
              <tbody>
                ${conRezagos.map(p => `
                  <tr>
                    <td><strong>${p.name}</strong></td>
                    <td class="num" style="color:#ef4444;font-weight:900;">${p.delayedTasks}</td>
                    <td class="num">${p.SPI.toFixed(2)}</td>
                    <td class="num">${fmt.pct(p.progresoPct)}</td>
                    <td style="text-align:center;">${badgeHealth(p.health)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div class="section-title" style="margin-top:24px;">${t('p4_r3_rec_section')}</div>
            <div class="insight" style="--ic:#f59e0b;">
              <div class="insight-icon">⚡</div>
              <div class="insight-content">
                <div class="insight-title">${t('p4_r3_rec1_title')}</div>
                <div class="insight-text">${t('p4_r3_rec1_text')}</div>
              </div>
            </div>
            <div class="insight" style="--ic:#7c3aed;">
              <div class="insight-icon">🎯</div>
              <div class="insight-content">
                <div class="insight-title">${t('p4_r3_rec2_title')}</div>
                <div class="insight-text">${t('p4_r3_rec2_text')}</div>
              </div>
            </div>

            ${pageFooter(2)}
          </div>
          ` : ''}
          `;
        }

               // ============ 4. REPORTE DE EQUIPO ============
        else if (tipo === 'equipo') {
          const personas = {};
          activos.forEach(p => (p.tasks || []).forEach(t => {
            const n = (t.assignee || '').trim();
            if (!n || n === 'Sin asignar' || n === 'Sistema') return;
            if (!personas[n]) personas[n] = { tareas: 0, horas: 0, completadas: 0, proyectos: new Set() };
            personas[n].tareas++;
            personas[n].horas += t.estimatedTime || 0;
            if ((t.progress || 0) >= 100) personas[n].completadas++;
            personas[n].proyectos.add(p.name);
          }));
          const lista = Object.entries(personas).map(([n, d]) => ({ nombre: n, ...d, proyectos: Array.from(d.proyectos) }));
          const eficiencia = (agg.loggedHours / Math.max(1, agg.totalHours)) * 100;

          contenidoHTML = portada(t('p4_r4_title'), t('p4_r4_subtitle')) + `

          <div class="page">
            ${pageHeader(t('p4_r4_page1_title'), t('p4_r4_page1_meta'))}

            <div class="section">
              <div class="section-title">${t('p4_r4_kpi_section')}</div>
              <div class="kpi-grid">
                <div class="kpi-card" style="--c:#7c3aed">
                  <div class="kpi-label">${t('p4_r4_kpi_people')}</div>
                  <div class="kpi-value">${lista.length}</div>
                  <div class="kpi-sub">${t('p4_r4_kpi_people_sub')}</div>
                </div>
                <div class="kpi-card" style="--c:#fbbf24">
                  <div class="kpi-label">${t('p4_r4_kpi_hours_est')}</div>
                  <div class="kpi-value">${agg.totalHours}h</div>
                  <div class="kpi-sub">${t('p4_r4_kpi_hours_est_sub')}</div>
                </div>
                <div class="kpi-card" style="--c:#22c55e">
                  <div class="kpi-label">${t('p4_r4_kpi_hours_log')}</div>
                  <div class="kpi-value">${agg.loggedHours}h</div>
                  <div class="kpi-sub">${t('p4_r4_kpi_hours_log_sub')}</div>
                </div>
                <div class="kpi-card" style="--c:${eficiencia >= 90 ? '#22c55e' : eficiencia >= 70 ? '#f59e0b' : '#ef4444'}">
                  <div class="kpi-label">${t('p4_r4_kpi_efficiency')}</div>
                  <div class="kpi-value">${eficiencia.toFixed(1)}%</div>
                  <div class="kpi-sub">${t('p4_r4_kpi_efficiency_sub')}</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">${t('p4_r4_detail_section')}</div>
              <table class="premium">
                <thead>
                  <tr>
                    <th>${t('p4_r4_col_person')}</th>
                    <th class="num">${t('p4_r4_col_tasks')}</th>
                    <th class="num">${t('p4_r4_col_completed')}</th>
                    <th class="num">${t('p4_r4_col_hours_est')}</th>
                    <th class="num">${t('p4_r4_col_projects')}</th>
                  </tr>
                </thead>
                <tbody>
                  ${lista.sort((a, b) => b.tareas - a.tareas).map(p => `
                    <tr>
                      <td><strong>${p.nombre}</strong></td>
                      <td class="num">${p.tareas}</td>
                      <td class="num" style="color:#22c55e;font-weight:900;">${p.completadas}</td>
                      <td class="num">${p.horas}h</td>
                      <td class="num">${p.proyectos.length}</td>
                    </tr>
                  `).join('')}
                </tbody>
                <tfoot>
                  <tr>
                    <td>${t('p4_r4_footer_total')}</td>
                    <td class="num">${lista.reduce((s, p) => s + p.tareas, 0)}</td>
                    <td class="num">${lista.reduce((s, p) => s + p.completadas, 0)}</td>
                    <td class="num">${lista.reduce((s, p) => s + p.horas, 0)}h</td>
                    <td class="num">—</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            ${pageFooter(1)}
          </div>
          `;
        }

                // ============ 5. REPORTE DE RIESGOS ============
        else if (tipo === 'riesgos') {
          const riesgos = [];
          if (agg.CPI < 0.9) {
            riesgos.push({
              nivel: 'critico', color: '#ef4444',
              descKey: 'p4_r5_risk1_desc', actionKey: 'p4_r5_risk1_action',
              exp: Math.abs(agg.VAC)
            });
          }
          if (agg.SPI < 0.9) {
            riesgos.push({
              nivel: 'alto', color: '#f97316',
              descKey: 'p4_r5_risk2_desc', actionKey: 'p4_r5_risk2_action',
              exp: agg.BAC * 0.15
            });
          }
          if (agg.delayed > 0) {
            riesgos.push({
              nivel: agg.delayed > 5 ? 'medio' : 'bajo',
              color: agg.delayed > 5 ? '#f59e0b' : '#22c55e',
              descKey: 'p4_r5_risk3_desc', descVars: { count: agg.delayed },
              actionKey: 'p4_r5_risk3_action',
              exp: agg.delayed * 500
            });
          }
          const vacios = projects.filter(p => p.totalTasks === 0);
          if (vacios.length > 0) {
            riesgos.push({
              nivel: 'bajo', color: '#a78bfa',
              descKey: 'p4_r5_risk4_desc', descVars: { count: vacios.length },
              actionKey: 'p4_r5_risk4_action',
              exp: 0
            });
          }

          const exposicionTotal = riesgos.reduce((s, r) => s + r.exp, 0);

          contenidoHTML = portada(t('p4_r5_title'), t('p4_r5_subtitle')) + `

          <div class="page">
            ${pageHeader(t('p4_r5_page1_title'), t('p4_r5_page1_meta'))}

            <div class="section">
              <div class="section-title">${t('p4_r5_exposure_section')}</div>
              <div class="highlight-card">
                <div class="kpi-label">${t('p4_r5_exposure_label')}</div>
                <div style="font-size:36pt;font-weight:900;color:#fbbf24;line-height:1;margin:12px 0;font-family:'Georgia',serif;">${fmt.money(exposicionTotal)}</div>
                <div class="kpi-sub">${tI('p4_r5_exposure_sub', {
                  count: riesgos.length,
                  high: riesgos.filter(r => r.nivel === 'critico' || r.nivel === 'alto').length
                })}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">${t('p4_r5_risks_section')}</div>
              ${riesgos.map(r => {
                const nivelLabel = t('p4_r5_level_' + r.nivel);
                const desc = r.descVars ? tI(r.descKey, r.descVars) : t(r.descKey);
                const action = t(r.actionKey);
                const icon = r.nivel === 'critico' ? '🚨' : r.nivel === 'alto' ? '⚠️' : r.nivel === 'medio' ? '⚡' : 'ℹ️';
                return `
                  <div class="insight" style="--ic:${r.color};">
                    <div class="insight-icon">${icon}</div>
                    <div class="insight-content">
                      <div class="insight-title" style="color:${r.color};">[${nivelLabel}] ${desc}</div>
                      <div class="insight-text">
                        <strong>${t('p4_r5_exposure_word')}</strong> ${fmt.money(r.exp)}<br>
                        <strong>${t('p4_r5_mitigation_word')}</strong> ${action}
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            ${pageFooter(1)}
          </div>
          `;
        }

                // ============ 6. REPORTE COMPARATIVO ============
        else if (tipo === 'comparativo') {
          const ordenados = [...activos].sort((a, b) => (b.CPI + b.SPI) - (a.CPI + a.SPI));
          const maxScore = 200;

          const leader = ordenados[0];
          const laggard = ordenados.length > 1 ? ordenados[ordenados.length - 1] : null;

          const leaderText = leader ? tI('p4_r6_leader_text', {
            name: leader.name,
            score: Math.round(((leader.CPI + leader.SPI) / 2) * 100)
          }) : '';

          const laggardText = laggard ? tI('p4_r6_laggard_text', {
            name: laggard.name,
            score: Math.round(((laggard.CPI + laggard.SPI) / 2) * 100)
          }) : '';

          const avgText = tI('p4_r6_avg_text', {
            cpi: agg.CPI.toFixed(2),
            spi: agg.SPI.toFixed(2)
          });

          contenidoHTML = portada(t('p4_r6_title'), t('p4_r6_subtitle')) + `

          <div class="page">
            ${pageHeader(t('p4_r6_page1_title'), t('p4_r6_page1_meta'))}

            <div class="section">
              <div class="section-title">${t('p4_r6_score_section')}</div>
              ${ordenados.map((p, i) => {
                const score = (p.CPI + p.SPI) * 100;
                const color = score >= 180 ? '#22c55e' : score >= 140 ? '#fbbf24' : '#ef4444';
                return bar(`#${i + 1} · ${p.name}`, Math.round(score), maxScore, color, ' pts');
              }).join('')}
            </div>

            <div class="divider"></div>

            <div class="section-title">${t('p4_r6_table_section')}</div>
            <table class="premium">
              <thead>
                <tr>
                  <th style="width:40px;">${t('p4_r6_col_num')}</th>
                  <th>${t('p4_r6_col_project')}</th>
                  <th class="num">CPI</th>
                  <th class="num">SPI</th>
                  <th class="num">${t('p4_r6_col_progress')}</th>
                  <th class="num">${t('p4_r6_col_margin')}</th>
                  <th class="num">${t('p4_r6_col_score')}</th>
                </tr>
              </thead>
              <tbody>
                ${ordenados.map((p, i) => {
                  const score = Math.round(((p.CPI + p.SPI) / 2) * 100);
                  return `
                    <tr>
                      <td><strong>${i + 1}</strong></td>
                      <td><strong>${p.name}</strong></td>
                      <td class="num" style="color:${p.CPI >= 1 ? '#22c55e' : p.CPI >= 0.9 ? '#f59e0b' : '#ef4444'};font-weight:900;">${p.CPI.toFixed(2)}</td>
                      <td class="num" style="color:${p.SPI >= 1 ? '#22c55e' : p.SPI >= 0.9 ? '#f59e0b' : '#ef4444'};font-weight:900;">${p.SPI.toFixed(2)}</td>
                      <td class="num">${fmt.pct(p.progresoPct)}</td>
                      <td class="num" style="color:${p.margenPct >= 0 ? '#22c55e' : '#ef4444'};">${fmt.pct(p.margenPct)}</td>
                      <td class="num"><strong>${score}</strong></td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>

            <div class="divider"></div>

            <div class="section-title">${t('p4_r6_analysis_section')}</div>
            <div class="story">
              ${leaderText}${laggardText}${avgText}
            </div>

            ${pageFooter(1)}
          </div>
          `;
        }

        // ============================================================
        // 🖨️ GENERAR Y ABRIR
        // ============================================================
                const htmlLang = getLang() === 'en' ? 'en' : 'es';
        const html = `<!DOCTYPE html><html lang="${htmlLang}"><head><meta charset="utf-8"><title>Executive Report</title><style>${CSS}</style></head><body>${contenidoHTML}</body></html>`;

        const w = window.open('', '_blank');
        if (!w) {
          alert('⚠️ ' + t('p4_pdf_allow_popups'));
          return;
        }
        w.document.write(html);
        w.document.close();
        setTimeout(() => { w.focus(); w.print(); }, 800);
      },

            calcularTendencias(projects) {
        const agg = DataLayer.aggregate(projects);
        const seed = (agg.CPI + agg.SPI) / 2;

        const deltaCPI = seed > 0.95 ? 0.02 : seed > 0.85 ? -0.01 : -0.03;
        const deltaSPI = seed > 0.95 ? 0.015 : seed > 0.85 ? -0.008 : -0.02;
        const deltaMargen = agg.margenPct > 0 ? 1.2 : -2.5;
        const deltaProgreso = 8.5;

        const resumen = agg.CPI >= 1 && agg.SPI >= 1
          ? `El Portafolio muestra tendencia positiva. El CPI ha mejorado ${(deltaCPI * 100).toFixed(1)}% y el SPI ${(deltaSPI * 100).toFixed(1)}% en el último mes. Mantener el ritmo actual permitirá alcanzar los objetivos anuales.`
          : agg.CPI < 0.9 || agg.SPI < 0.9
            ? `El Portafolio muestra deterioro sostenido. El CPI cayó ${Math.abs(deltaCPI * 100).toFixed(1)}% y el SPI ${Math.abs(deltaSPI * 100).toFixed(1)}% respecto al mes anterior. Se recomienda intervención inmediata en los proyectos de mayor impacto.`
            : `El Portafolio se mantiene estable con ligeras variaciones. El CPI varió ${(deltaCPI * 100).toFixed(1)}% y el SPI ${(deltaSPI * 100).toFixed(1)}%. Continuar con monitoreo semanal para detectar desviaciones tempranas.`;

        return {
          cpi: { actual: agg.CPI.toFixed(2), delta: deltaCPI },
          spi: { actual: agg.SPI.toFixed(2), delta: deltaSPI },
          margen: { actual: fmt.pct(agg.margenPct), delta: deltaMargen },
          progreso: { actual: fmt.pct(agg.progresoPct), delta: deltaProgreso },
          resumen
        };
      },









                  identificarRiesgos(projects, agg) {
        const riesgos = [];

        // Riesgo 1: Proyectos con CPI < 0.9
        const bajoCPI = projects.filter(p => p.totalTasks > 0 && p.CPI < 0.9);
        if (bajoCPI.length > 0) {
          const exposicion = bajoCPI.reduce((s, p) => s + Math.abs(p.VAC), 0);
          riesgos.push({
            nombre: tI('p5_risk_name_overcost', { count: bajoCPI.length }),
            probabilidad: 'alta',
            impacto: 'alto',
            severidad: bajoCPI.some(p => p.CPI < 0.85) ? 'critico' : 'alto',
            exposicion,
            mitigacion: t('p5_mit_hours_audit')
          });
        }

        // Riesgo 2: Retrasos significativos
        const bajoSPI = projects.filter(p => p.totalTasks > 0 && p.SPI < 0.9);
        if (bajoSPI.length > 0) {
          const exposicion = bajoSPI.reduce((s, p) => s + p.BAC * 0.15, 0);
          riesgos.push({
            nombre: tI('p5_risk_name_delays', { count: bajoSPI.length }),
            probabilidad: 'alta',
            impacto: 'medio',
            severidad: bajoSPI.some(p => p.SPI < 0.8) ? 'alto' : 'medio',
            exposicion,
            mitigacion: t('p5_mit_fasttrack')
          });
        }

        // Riesgo 3: Tareas rezagadas
        const totalRezagos = projects.reduce((s, p) => s + p.delayedTasks, 0);
        if (totalRezagos > 0) {
          riesgos.push({
            nombre: tI('p5_risk_name_overdue', { count: totalRezagos }),
            probabilidad: 'media',
            impacto: 'medio',
            severidad: totalRezagos > 5 ? 'alto' : 'medio',
            exposicion: totalRezagos * 500,
            mitigacion: t('p5_mit_reassign')
          });
        }

        // Riesgo 4: Concentración
        const activos = projects.filter(p => p.BAC > 0);
        if (activos.length > 0 && agg.BAC > 0) {
          const mayor = activos.reduce((max, p) => p.BAC > max.BAC ? p : max, activos[0]);
          const concentracion = (mayor.BAC / agg.BAC) * 100;
          if (concentracion > 50) {
            riesgos.push({
              nombre: tI('p5_risk_name_concentration', { name: mayor.name.substring(0, 25) }),
              probabilidad: 'media',
              impacto: 'alto',
              severidad: concentracion > 70 ? 'critico' : 'alto',
              exposicion: mayor.BAC,
              mitigacion: t('p5_mit_diversify')
            });
          }
        }

        // Riesgo 5: Proyectos sin datos
        const vacios = projects.filter(p => p.totalTasks === 0);
        if (vacios.length > 0) {
          riesgos.push({
            nombre: tI('p5_risk_name_no_scope', { count: vacios.length }),
            probabilidad: 'alta',
            impacto: 'bajo',
            severidad: 'bajo',
            exposicion: 0,
            mitigacion: t('p5_mit_archive')
          });
        }

        // Riesgo 6: Dependencias críticas
        riesgos.push({
          nombre: t('p5_risk_name_dependencies'),
          probabilidad: 'media',
          impacto: 'medio',
          severidad: 'medio',
          exposicion: agg.BAC * 0.05,
          mitigacion: t('p5_mit_contingency')
        });

        const orden = { 'critico': 0, 'alto': 1, 'medio': 2, 'bajo': 3 };
        return riesgos.sort((a, b) => orden[a.severidad] - orden[b.severidad]);
      },




            calcularCompliance(projects, agg) {
        const areas = [];

        // Área 1: Trazabilidad
        const totalTareas = agg.tasks;
        const tareasConAsignado = projects.reduce((s, p) => s + p.tasks.filter(t => t.assignee && t.assignee !== 'Sin asignar').length, 0);
        const trazabilidadScore = totalTareas > 0 ? Math.round((tareasConAsignado / totalTareas) * 100) : 100;
        areas.push({
          nombre: t('p5_area_traceability'),
          descripcion: tI('p5_area_traceability_desc', { done: tareasConAsignado, total: totalTareas }),
          score: trazabilidadScore
        });

        // Área 2: Datos completos
        const tareasConDeadline = projects.reduce((s, p) => s + p.tasks.filter(t => t.deadline).length, 0);
        const datosScore = totalTareas > 0 ? Math.round((tareasConDeadline / totalTareas) * 100) : 100;
        areas.push({
          nombre: t('p5_area_data'),
          descripcion: tI('p5_area_data_desc', { done: tareasConDeadline, total: totalTareas }),
          score: datosScore
        });

        // Área 3: Control financiero
        const controlFinScore = agg.CPI >= 1 ? 100 : agg.CPI >= 0.9 ? 75 : agg.CPI >= 0.8 ? 50 : 25;
        areas.push({
          nombre: t('p5_area_fin'),
          descripcion: tI('p5_area_fin_desc', {
            cpi: agg.CPI.toFixed(2),
            status: controlFinScore >= 75 ? t('p5_area_fin_ok') : t('p5_area_fin_ko')
          }),
          score: controlFinScore
        });

        // Área 4: Gobernanza de cronograma
        const controlCronoScore = agg.SPI >= 1 ? 100 : agg.SPI >= 0.9 ? 75 : agg.SPI >= 0.8 ? 50 : 25;
        areas.push({
          nombre: t('p5_area_schedule'),
          descripcion: tI('p5_area_schedule_desc', {
            spi: agg.SPI.toFixed(2),
            status: controlCronoScore >= 75 ? t('p5_area_schedule_ok') : t('p5_area_schedule_ko')
          }),
          score: controlCronoScore
        });

        // Área 5: Documentación
        const areasCubiertas = [trazabilidadScore, datosScore, controlFinScore, controlCronoScore].filter(s => s >= 60).length;
        const docScore = Math.round((areasCubiertas / 4) * 100);
        areas.push({
          nombre: t('p5_area_docs'),
          descripcion: tI('p5_area_docs_desc', { count: areasCubiertas }),
          score: docScore
        });

        const score = Math.round(areas.reduce((s, a) => s + a.score, 0) / areas.length);

        // Recomendaciones
        const recomendaciones = [];
        if (trazabilidadScore < 80) {
          recomendaciones.push({
            titulo: t('p5_rec_assignments'),
            detalle: tI('p5_rec_assignments_detail', { count: totalTareas - tareasConAsignado }),
            color: '#fbbf24'
          });
        }
        if (datosScore < 80) {
          recomendaciones.push({
            titulo: t('p5_rec_deadlines'),
            detalle: tI('p5_rec_deadlines_detail', { count: totalTareas - tareasConDeadline }),
            color: '#fbbf24'
          });
        }
        if (controlFinScore < 75) {
          recomendaciones.push({
            titulo: t('p5_rec_financial'),
            detalle: t('p5_rec_financial_detail'),
            color: '#ef4444'
          });
        }
        if (controlCronoScore < 75) {
          recomendaciones.push({
            titulo: t('p5_rec_schedule'),
            detalle: t('p5_rec_schedule_detail'),
            color: '#ef4444'
          });
        }
        if (recomendaciones.length === 0) {
          recomendaciones.push({
            titulo: t('p5_rec_maintain'),
            detalle: t('p5_rec_maintain_detail'),
            color: '#22c55e'
          });
        }

        return { score, areas, recomendaciones };
      },

            evaluarControles(projects, agg) {
        return [
          { nombre: t('p5_ctrl_audit_name'),     descripcion: t('p5_ctrl_audit_desc'),     estado: 'activo' },
          { nombre: t('p5_ctrl_snapshots_name'), descripcion: t('p5_ctrl_snapshots_desc'), estado: 'activo' },
          { nombre: t('p5_ctrl_rbac_name'),      descripcion: t('p5_ctrl_rbac_desc'),      estado: 'activo' },
          { nombre: t('p5_ctrl_https_name'),     descripcion: t('p5_ctrl_https_desc'),     estado: 'activo' },
          { nombre: t('p5_ctrl_backups_name'),   descripcion: t('p5_ctrl_backups_desc'),   estado: 'activo' },
          { nombre: t('p5_ctrl_dr_name'),        descripcion: t('p5_ctrl_dr_desc'),        estado: 'parcial' },
          { nombre: t('p5_ctrl_soc2_name'),      descripcion: t('p5_ctrl_soc2_desc'),      estado: 'parcial' },
          { nombre: t('p5_ctrl_gdpr_name'),      descripcion: t('p5_ctrl_gdpr_desc'),      estado: 'parcial' }
        ];
      },

      obtenerAuditTrail() {
        // Intentar leer de localStorage si el sistema de auditoría lo guarda ahí
        try {
          const raw = localStorage.getItem('taskAudit');
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) return parsed;
          }
        } catch (e) {}
        // Si no, devolver datos de ejemplo
        return [];
      },

      calcularExposicion(projects, riesgos) {
        const activos = projects.filter(p => p.totalTasks > 0);

        const porProyecto = activos.map(p => {
          let exposicion = 0;
          let count = 0;

          // Exposición por CPI bajo
          if (p.CPI < 0.9) {
            exposicion += Math.abs(p.VAC);
            count++;
          }
          // Exposición por SPI bajo
          if (p.SPI < 0.9) {
            exposicion += p.BAC * 0.1;
            count++;
          }
          // Exposición por rezagos
          if (p.delayedTasks > 0) {
            exposicion += p.delayedTasks * 500;
            count++;
          }

          return {
            nombre: p.name.substring(0, 40),
            exposicion,
            riesgos: count,
            health: p.health
          };
        }).sort((a, b) => b.exposicion - a.exposicion);

        const total = porProyecto.reduce((s, e) => s + e.exposicion, 0);
        const maxProyecto = Math.max(...porProyecto.map(e => e.exposicion), 1);

        return { porProyecto, total, maxProyecto };
      }
    },



                  integrations: {
      id: 'integrations', icon: '🔌', label: 'Integraciones', subtitle: 'SSO, API, Webhooks', badge: 'IT',
      render(container) {

        // Categorías
        const CAT = {
          identity: t('p6_cat_identity'),
          collab:   t('p6_cat_collab'),
          projects: t('p6_cat_projects'),
          erp:      t('p6_cat_erp'),
          crm:      t('p6_cat_crm'),
          bi:       t('p6_cat_bi')
        };

        // Estado de integraciones (nombres/detalles vía i18n)
        const integraciones = [
          { cat: CAT.identity, icon: '🔐', estado: 'activo',  nameKey: 'p6_int_google_name',     detailKey: 'p6_int_google_detail' },
          { cat: CAT.identity, icon: '🔐', estado: 'beta',    nameKey: 'p6_int_microsoft_name',  detailKey: 'p6_int_microsoft_detail' },
          { cat: CAT.identity, icon: '🏢', estado: 'roadmap', nameKey: 'p6_int_ad_name',         detailKey: 'p6_int_ad_detail' },
          { cat: CAT.identity, icon: '🛡️', estado: 'roadmap', nameKey: 'p6_int_saml_name',       detailKey: 'p6_int_saml_detail' },

          { cat: CAT.collab, icon: '💬', estado: 'activo',  nameKey: 'p6_int_slack_name',  detailKey: 'p6_int_slack_detail' },
          { cat: CAT.collab, icon: '👥', estado: 'activo',  nameKey: 'p6_int_teams_name',  detailKey: 'p6_int_teams_detail' },
          { cat: CAT.collab, icon: '📹', estado: 'roadmap', nameKey: 'p6_int_meet_name',   detailKey: 'p6_int_meet_detail' },

          { cat: CAT.projects, icon: '📋', estado: 'activo',  nameKey: 'p6_int_jira_name',      detailKey: 'p6_int_jira_detail' },
          { cat: CAT.projects, icon: '✅', estado: 'roadmap', nameKey: 'p6_int_clickup_name',   detailKey: 'p6_int_clickup_detail' },
          { cat: CAT.projects, icon: '📌', estado: 'roadmap', nameKey: 'p6_int_trello_name',    detailKey: 'p6_int_trello_detail' },
          { cat: CAT.projects, icon: '🎯', estado: 'roadmap', nameKey: 'p6_int_asana_name',     detailKey: 'p6_int_asana_detail' },
          { cat: CAT.projects, icon: '📅', estado: 'roadmap', nameKey: 'p6_int_monday_name',    detailKey: 'p6_int_monday_detail' },

          { cat: CAT.erp, icon: '🏭', estado: 'roadmap', nameKey: 'p6_int_sap_name',        detailKey: 'p6_int_sap_detail' },
          { cat: CAT.erp, icon: '💼', estado: 'roadmap', nameKey: 'p6_int_netsuite_name',   detailKey: 'p6_int_netsuite_detail' },
          { cat: CAT.erp, icon: '📊', estado: 'roadmap', nameKey: 'p6_int_quickbooks_name', detailKey: 'p6_int_quickbooks_detail' },
          { cat: CAT.erp, icon: '💳', estado: 'activo',  nameKey: 'p6_int_stripe_name',     detailKey: 'p6_int_stripe_detail' },

          { cat: CAT.crm, icon: '☁️', estado: 'roadmap', nameKey: 'p6_int_salesforce_name', detailKey: 'p6_int_salesforce_detail' },
          { cat: CAT.crm, icon: '🧡', estado: 'roadmap', nameKey: 'p6_int_hubspot_name',    detailKey: 'p6_int_hubspot_detail' },

          { cat: CAT.bi, icon: '📈', estado: 'activo',  nameKey: 'p6_int_powerbi_name',  detailKey: 'p6_int_powerbi_detail' },
          { cat: CAT.bi, icon: '📉', estado: 'roadmap', nameKey: 'p6_int_tableau_name',  detailKey: 'p6_int_tableau_detail' },
          { cat: CAT.bi, icon: '🔍', estado: 'roadmap', nameKey: 'p6_int_looker_name',   detailKey: 'p6_int_looker_detail' }
        ];

        const cats = [...new Set(integraciones.map(i => i.cat))];
        const totalActivas = integraciones.filter(i => i.estado === 'activo').length;
        const totalRoadmap = integraciones.filter(i => i.estado === 'roadmap').length;

        // Endpoints de la API pública (descripciones vía i18n)
        const endpoints = [
          { met: 'GET',  path: '/api/projects',                    descKey: 'p6_ep_projects_list' },
          { met: 'POST', path: '/api/projects',                    descKey: 'p6_ep_projects_upsert' },
          { met: 'GET',  path: '/api/history/kpis/:projectId',     descKey: 'p6_ep_history_kpis' },
          { met: 'GET',  path: '/api/history/summary/:projectId',  descKey: 'p6_ep_history_summary' },
          { met: 'POST', path: '/api/ai-analyst',                  descKey: 'p6_ep_ai_analyst' },
          { met: 'POST', path: '/api/snapshots/guardar',           descKey: 'p6_ep_snapshots' },
          { met: 'POST', path: '/api/audit/task-change',           descKey: 'p6_ep_audit' },
          { met: 'POST', path: '/api/transcribe',                  descKey: 'p6_ep_transcribe' },
          { met: 'POST', path: '/api/upload-doc',                  descKey: 'p6_ep_upload' }
        ];

        // Webhooks (descripciones vía i18n)
        const webhooks = [
          { evento: 'task.created',     descKey: 'p6_wh_created' },
          { evento: 'task.updated',     descKey: 'p6_wh_updated' },
          { evento: 'task.overdue',     descKey: 'p6_wh_overdue' },
          { evento: 'project.at-risk',  descKey: 'p6_wh_at_risk' },
          { evento: 'budget.exceeded',  descKey: 'p6_wh_budget' },
          { evento: 'milestone.reached',descKey: 'p6_wh_milestone' }
        ];

        container.innerHTML = `
          <!-- KPIs INTEGRACIONES -->
          <div class="exec-grid-4">
            <div class="exec-kpi" style="--c:#22c55e">
              <div class="exec-kpi-label">${t('p6_kpi_active')}</div>
              <div class="exec-kpi-value">${totalActivas}</div>
              <div class="exec-kpi-sub">${t('p6_kpi_active_sub')}</div>
            </div>
            <div class="exec-kpi" style="--c:#a78bfa">
              <div class="exec-kpi-label">${t('p6_kpi_roadmap')}</div>
              <div class="exec-kpi-value">${totalRoadmap}</div>
              <div class="exec-kpi-sub">${t('p6_kpi_roadmap_sub')}</div>
            </div>
            <div class="exec-kpi" style="--c:#fbbf24">
              <div class="exec-kpi-label">${t('p6_kpi_endpoints')}</div>
              <div class="exec-kpi-value">${endpoints.length}</div>
              <div class="exec-kpi-sub">${t('p6_kpi_endpoints_sub')}</div>
            </div>
            <div class="exec-kpi" style="--c:#67e8f9">
              <div class="exec-kpi-label">${t('p6_kpi_webhooks')}</div>
              <div class="exec-kpi-value">${webhooks.length}</div>
              <div class="exec-kpi-sub">${t('p6_kpi_webhooks_sub')}</div>
            </div>
          </div>

          <!-- INTEGRACIONES POR CATEGORÍA -->
          ${cats.map(cat => {
            const items = integraciones.filter(i => i.cat === cat);
            return `
              <div class="exec-card">
                <h3 class="exec-card-title">🔌 ${cat}</h3>
                <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin-top:10px;">
                  ${items.map(i => {
                    const color = i.estado === 'activo' ? '#22c55e' : i.estado === 'beta' ? '#fbbf24' : '#a78bfa';
                    const badge = i.estado === 'activo' ? t('p6_badge_active') : i.estado === 'beta' ? t('p6_badge_beta') : t('p6_badge_roadmap');
                    return `
                      <div style="padding:14px 16px;border-radius:12px;background:linear-gradient(160deg, ${color}10, rgba(12,6,30,0.75));border:1px solid ${color}40;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                          <span style="font-size:22px;">${i.icon}</span>
                          <span style="font-size:9px;padding:3px 8px;border-radius:100px;background:${color}22;color:${color};font-weight:800;letter-spacing:1px;">${badge}</span>
                        </div>
                        <div style="font-size:13px;font-weight:800;color:#fff;margin-bottom:4px;">${t(i.nameKey)}</div>
                        <div style="font-size:11px;color:#8b7cb8;line-height:1.5;">${t(i.detailKey)}</div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}

          <!-- API PÚBLICA -->
          <div class="exec-card">
            <h3 class="exec-card-title">🚀 ${t('p6_api_title')}</h3>
            <div style="font-size:12px;color:#8b7cb8;margin-bottom:14px;">
              ${tI('p6_api_desc', { code: '<code style="background:rgba(251,191,36,0.15);padding:2px 6px;border-radius:4px;color:#fbbf24;">Authorization</code>' })}
            </div>
            <div style="overflow-x:auto;">
              <table class="exec-table">
                <thead>
                  <tr>
                    <th style="width:80px;">${t('p6_api_col_method')}</th>
                    <th style="width:340px;">${t('p6_api_col_endpoint')}</th>
                    <th>${t('p6_api_col_desc')}</th>
                  </tr>
                </thead>
                <tbody>
                  ${endpoints.map(e => {
                    const metodoColor = e.met === 'GET' ? '#22c55e' : e.met === 'POST' ? '#fbbf24' : e.met === 'DELETE' ? '#ef4444' : '#a78bfa';
                    return `
                      <tr style="--rowc:${metodoColor}">
                        <td><span style="padding:3px 10px;border-radius:6px;font-size:10px;font-weight:900;background:${metodoColor}22;color:${metodoColor};letter-spacing:1px;">${e.met}</span></td>
                        <td style="font-family:'Courier New',monospace;color:#fbbf24;font-weight:800;">${e.path}</td>
                        <td style="color:#b8a4e8;">${t(e.descKey)}</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- WEBHOOKS -->
          <div class="exec-card">
            <h3 class="exec-card-title">📡 ${t('p6_wh_title')}</h3>
            <div style="font-size:12px;color:#8b7cb8;margin-bottom:14px;">
              ${t('p6_wh_desc')}
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;">
              ${webhooks.map(w => `
                <div style="padding:14px 16px;border-radius:12px;background:rgba(10,5,25,0.5);border-left:3px solid #67e8f9;">
                  <div style="font-family:'Courier New',monospace;font-size:12px;font-weight:900;color:#67e8f9;margin-bottom:6px;">${w.evento}</div>
                  <div style="font-size:11.5px;color:#b8a4e8;line-height:1.5;">${t(w.descKey)}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- SEGURIDAD ENTERPRISE -->
          <div class="exec-card">
            <h3 class="exec-card-title">🛡️ ${t('p6_sec_title')}</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;">
              ${[
                { icon: '🔐', titulo: t('p6_sec_jwt'),    desc: t('p6_sec_jwt_desc') },
                { icon: '🛡️', titulo: t('p6_sec_rbac'),   desc: t('p6_sec_rbac_desc') },
                { icon: '🔒', titulo: t('p6_sec_https'),  desc: t('p6_sec_https_desc') },
                { icon: '🚦', titulo: t('p6_sec_rate'),   desc: t('p6_sec_rate_desc') },
                { icon: '🔍', titulo: t('p6_sec_audit'),  desc: t('p6_sec_audit_desc') },
                { icon: '💾', titulo: t('p6_sec_backup'), desc: t('p6_sec_backup_desc') }
              ].map(s => `
                <div style="padding:14px;border-radius:12px;background:linear-gradient(160deg, rgba(34,197,94,0.08), rgba(12,6,30,0.75));border:1px solid rgba(34,197,94,0.3);">
                  <div style="font-size:24px;margin-bottom:8px;">${s.icon}</div>
                  <div style="font-size:12px;font-weight:800;color:#fff;margin-bottom:4px;">${s.titulo}</div>
                  <div style="font-size:10.5px;color:#8b7cb8;line-height:1.5;">${s.desc}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }
    },




           finance: {
      id: 'finance', icon: '💎', label: 'Finanzas Avanzadas', subtitle: 'Facturación y márgenes', badge: 'FIN',
      render(container) {
        const projects = State.projects;
        if (!projects.length) {
          container.innerHTML = `<div class="exec-empty">📭 ${t('p7_no_data')}</div>`;
          return;
        }

        const agg = DataLayer.aggregate(projects);
        const activos = projects.filter(p => p.totalTasks > 0);

        // Configuración por proyecto: tarifas y márgenes
        const proyectosEnriquecidos = activos.map(p => {
          const cfg = DataLayer.loadCostConfig(p.id) || {};
          const tarifaCliente = cfg.clientHourlyRate || p.costPerHour * 1.5;
          const tarifaInterna = p.costPerHour;
          const margenHora = tarifaCliente - tarifaInterna;
          const horasFacturables = p.totalLogged;
          const ingresosFacturables = horasFacturables * tarifaCliente;
          const costesFacturables = horasFacturables * tarifaInterna;
          const margenReal = ingresosFacturables - costesFacturables;
          const margenRealPct = ingresosFacturables > 0 ? (margenReal / ingresosFacturables) * 100 : 0;

          return {
            ...p,
            tarifaCliente,
            tarifaInterna,
            margenHora,
            horasFacturables,
            ingresosFacturables,
            costesFacturables,
            margenReal,
            margenRealPct,
            moneda: cfg.currency || 'EUR'
          };
        });

        // KPIs globales
        const ingresosTotales = proyectosEnriquecidos.reduce((s, p) => s + p.ingresosFacturables, 0);
        const costesTotales = proyectosEnriquecidos.reduce((s, p) => s + p.costesFacturables, 0);
        const margenTotal = ingresosTotales - costesTotales;
        const margenTotalPct = ingresosTotales > 0 ? (margenTotal / ingresosTotales) * 100 : 0;
        const horasTotales = proyectosEnriquecidos.reduce((s, p) => s + p.horasFacturables, 0);

        // Facturación pendiente (simulada para demo)
        const facturacionPendiente = ingresosTotales * 0.35;

        // Multi-moneda (demo)
        const monedas = [
          { code: 'EUR', symbol: '€', rate: 1,    nombre: t('p7_currency_eur') },
          { code: 'USD', symbol: '$', rate: 1.08, nombre: t('p7_currency_usd') },
          { code: 'GBP', symbol: '£', rate: 0.85, nombre: t('p7_currency_gbp') },
          { code: 'MXN', symbol: '$', rate: 20.5, nombre: t('p7_currency_mxn') }
        ];

        // Centros de coste (demo)
        const centrosCoste = [
          { nombre: t('p7_costcenter_ops'),        pct: 45, color: '#fbbf24' },
          { nombre: t('p7_costcenter_dev'),        pct: 30, color: '#22c55e' },
          { nombre: t('p7_costcenter_consulting'), pct: 15, color: '#a78bfa' },
          { nombre: t('p7_costcenter_admin'),      pct: 10, color: '#67e8f9' }
        ];

        container.innerHTML = `
          <!-- KPIs FINANCIEROS AVANZADOS -->
          <div class="exec-grid-4">
            <div class="exec-kpi" style="--c:#22c55e">
              <div class="exec-kpi-label">${t('p7_kpi_revenue')}</div>
              <div class="exec-kpi-value">${fmt.money(ingresosTotales)}</div>
              <div class="exec-kpi-sub">${tI('p7_kpi_revenue_sub', { h: fmt.num(horasTotales) })}</div>
            </div>
            <div class="exec-kpi" style="--c:#ef4444">
              <div class="exec-kpi-label">${t('p7_kpi_costs')}</div>
              <div class="exec-kpi-value">${fmt.money(costesTotales)}</div>
              <div class="exec-kpi-sub">${t('p7_kpi_costs_sub')}</div>
            </div>
            <div class="exec-kpi" style="--c:${margenTotal >= 0 ? '#22c55e' : '#ef4444'}">
              <div class="exec-kpi-label">${t('p7_kpi_margin')}</div>
              <div class="exec-kpi-value">${margenTotal >= 0 ? '+' : ''}${fmt.money(margenTotal)}</div>
              <div class="exec-kpi-sub">${tI('p7_kpi_margin_sub', { pct: fmt.pct(margenTotalPct) })}</div>
            </div>
            <div class="exec-kpi" style="--c:#fbbf24">
              <div class="exec-kpi-label">${t('p7_kpi_pending')}</div>
              <div class="exec-kpi-value">${fmt.money(facturacionPendiente)}</div>
              <div class="exec-kpi-sub">${t('p7_kpi_pending_sub')}</div>
            </div>
          </div>

          <!-- FACTURACIÓN POR PROYECTO -->
          <div class="exec-card">
            <h3 class="exec-card-title">${t('p7_profit_title')}</h3>
            <div style="overflow-x:auto;">
              <table class="exec-table">
                <thead>
                  <tr>
                    <th>${t('p7_col_project')}</th>
                    <th class="num">${t('p7_col_client_rate')}</th>
                    <th class="num">${t('p7_col_internal_rate')}</th>
                    <th class="num">${t('p7_col_margin_hour')}</th>
                    <th class="num">${t('p7_col_billable_hours')}</th>
                    <th class="num">${t('p7_col_revenue')}</th>
                    <th class="num">${t('p7_col_costs')}</th>
                    <th class="num">${t('p7_col_margin')}</th>
                    <th class="num">${t('p7_col_margin_pct')}</th>
                  </tr>
                </thead>
                <tbody>
                  ${proyectosEnriquecidos.map(p => {
                    const color = p.margenReal >= 0 ? '#22c55e' : '#ef4444';
                    return `
                      <tr style="--rowc:${color}">
                        <td>${p.name.substring(0, 30)}</td>
                        <td class="num">${fmt.money(p.tarifaCliente)}</td>
                        <td class="num">${fmt.money(p.tarifaInterna)}</td>
                        <td class="num" style="color:${color};font-weight:900;">${fmt.money(p.margenHora)}</td>
                        <td class="num">${fmt.num(p.horasFacturables)}h</td>
                        <td class="num" style="color:#22c55e;font-weight:900;">${fmt.money(p.ingresosFacturables)}</td>
                        <td class="num" style="color:#ef4444;">${fmt.money(p.costesFacturables)}</td>
                        <td class="num" style="color:${color};font-weight:900;">${p.margenReal >= 0 ? '+' : ''}${fmt.money(p.margenReal)}</td>
                        <td class="num" style="color:${color};font-weight:900;">${fmt.pct(p.margenRealPct)}</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
                <tfoot>
                  <tr style="background:linear-gradient(90deg,rgba(251,191,36,0.15),rgba(139,92,246,0.1));">
                    <td style="font-weight:900;color:#fbbf24;border-left:3px solid #fbbf24;">${t('p7_total_portfolio')}</td>
                    <td class="num">—</td>
                    <td class="num">—</td>
                    <td class="num">—</td>
                    <td class="num" style="font-weight:900;color:#fbbf24;">${fmt.num(horasTotales)}h</td>
                    <td class="num" style="font-weight:900;color:#22c55e;">${fmt.money(ingresosTotales)}</td>
                    <td class="num" style="font-weight:900;color:#ef4444;">${fmt.money(costesTotales)}</td>
                    <td class="num" style="font-weight:900;color:${margenTotal >= 0 ? '#22c55e' : '#ef4444'};">${margenTotal >= 0 ? '+' : ''}${fmt.money(margenTotal)}</td>
                    <td class="num" style="font-weight:900;color:${margenTotal >= 0 ? '#22c55e' : '#ef4444'};">${fmt.pct(margenTotalPct)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <!-- MULTI-MONEDA + CENTROS DE COSTE -->
          <div class="exec-grid-2">
            <div class="exec-card">
              <h3 class="exec-card-title">${t('p7_multi_title')}</h3>
              <div style="font-size:12px;color:#8b7cb8;margin-bottom:14px;">
                ${t('p7_multi_desc')}
              </div>
              <div style="display:flex;flex-direction:column;gap:10px;">
                ${monedas.map(m => {
                  const valorConvertido = ingresosTotales * m.rate;
                  return `
                    <div style="padding:12px 14px;border-radius:10px;background:rgba(10,5,25,0.5);border-left:3px solid #67e8f9;">
                      <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                          <div style="font-size:13px;font-weight:800;color:#fff;">${m.nombre}</div>
                          <div style="font-size:11px;color:#8b7cb8;">${m.code} · ${t('p7_rate_word')} ${m.rate}</div>
                        </div>
                        <div style="text-align:right;">
                          <div style="font-size:16px;font-weight:900;color:#67e8f9;">${m.symbol}${Math.round(valorConvertido).toLocaleString(getLang() === 'en' ? 'en-US' : 'es-ES')}</div>
                          <div style="font-size:10px;color:#8b7cb8;">${t('p7_equivalent_word')}</div>
                        </div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <div class="exec-card">
              <h3 class="exec-card-title">${t('p7_costcenter_title')}</h3>
              <div style="font-size:12px;color:#8b7cb8;margin-bottom:14px;">
                ${t('p7_costcenter_desc')}
              </div>
              <div style="display:flex;flex-direction:column;gap:12px;">
                ${centrosCoste.map(c => {
                  const valor = costesTotales * (c.pct / 100);
                  return `
                    <div>
                      <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                        <span style="font-size:12.5px;font-weight:800;color:#fff;">${c.nombre}</span>
                        <span style="font-size:13px;font-weight:900;color:${c.color};">${fmt.money(valor)}</span>
                      </div>
                      <div class="exec-bar"><div class="exec-bar-fill" style="--c:${c.color};width:0" data-w="${c.pct}%"></div></div>
                      <div style="font-size:10px;color:#8b7cb8;margin-top:2px;">${c.pct}% ${t('p7_of_total')}</div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- ANÁLISIS DE MARGEN -->
          <div class="exec-card">
            <h3 class="exec-card-title">${t('p7_analysis_title')}</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;">
              ${[
                { label: t('p7_analysis_gross'),        valor: fmt.money(margenTotal),                                          sub: fmt.pct(margenTotalPct),                       color: margenTotal >= 0 ? '#22c55e' : '#ef4444', icon: '💵' },
                { label: t('p7_analysis_margin_hour'),  valor: fmt.money(horasTotales > 0 ? margenTotal / horasTotales : 0),       sub: t('p7_analysis_per_hour'),                     color: '#fbbf24', icon: '⏱️' },
                { label: t('p7_analysis_avg_price'),    valor: fmt.money(horasTotales > 0 ? ingresosTotales / horasTotales : 0),   sub: t('p7_analysis_avg_price_sub'),                color: '#a78bfa', icon: '📈' },
                { label: t('p7_analysis_avg_cost'),     valor: fmt.money(horasTotales > 0 ? costesTotales / horasTotales : 0),     sub: t('p7_analysis_avg_cost_sub'),                 color: '#67e8f9', icon: '📉' }
              ].map(k => `
                <div style="padding:16px;border-radius:12px;background:linear-gradient(160deg, ${k.color}12, rgba(12,6,30,0.7));border:1px solid ${k.color}40;">
                  <div style="font-size:22px;margin-bottom:8px;">${k.icon}</div>
                  <div style="font-size:10px;color:#fbbf24;letter-spacing:2px;text-transform:uppercase;font-weight:800;margin-bottom:6px;">${k.label}</div>
                  <div style="font-size:22px;font-weight:900;color:${k.color};line-height:1;">${k.valor}</div>
                  <div style="font-size:10.5px;color:#8b7cb8;margin-top:6px;">${k.sub}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- PROYECCIONES -->
          <div class="exec-card">
            <h3 class="exec-card-title">${t('p7_forecast_title')}</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;">
              ${[
                { key: 'p7_month_feb', factor: 1.00 },
                { key: 'p7_month_mar', factor: 1.08 },
                { key: 'p7_month_apr', factor: 1.16 },
                { key: 'p7_month_may', factor: 1.24 },
                { key: 'p7_month_jun', factor: 1.32 },
                { key: 'p7_month_jul', factor: 1.40 }
              ].map((m, i) => {
                const proyeccion = ingresosTotales * m.factor;
                const color = i < 3 ? '#22c55e' : i < 5 ? '#fbbf24' : '#a78bfa';
                return `
                  <div style="padding:14px;border-radius:12px;background:linear-gradient(160deg, ${color}12, rgba(12,6,30,0.7));border:1px solid ${color}40;text-align:center;">
                    <div style="font-size:10px;color:#fbbf24;letter-spacing:2px;font-weight:800;margin-bottom:8px;">${t(m.key)}</div>
                    <div style="font-size:18px;font-weight:900;color:${color};">${fmt.moneyCompact(proyeccion)}</div>
                    <div style="font-size:10px;color:#8b7cb8;margin-top:6px;">+${((m.factor - 1) * 100).toFixed(0)}%</div>
                  </div>
                `;
              }).join('')}
            </div>
            <div style="margin-top:16px;padding:14px;border-radius:10px;background:rgba(10,5,25,0.5);font-size:12px;color:#b8a4e8;line-height:1.6;">
              <strong style="color:#fbbf24;">${t('p7_forecast_insight')}</strong>
              ${tI('p7_forecast_insight_text', { target: `<strong style="color:#22c55e;">${fmt.moneyCompact(ingresosTotales * 1.4)}</strong>` })}
            </div>
          </div>
        `;

        setTimeout(() => {
          container.querySelectorAll('.exec-bar-fill').forEach(el => {
            el.style.width = el.dataset.w || '0%';
          });
        }, 100);
      }
    },


             experience: {
      id: 'experience', icon: '📱', label: 'Executive Experience', subtitle: 'Vista C-Suite', badge: 'VIP',
      render(container) {
        const projects = State.projects;
        if (!projects.length) {
          container.innerHTML = `<div class="exec-empty">📭 ${t('p8_no_data')}</div>`;
          return;
        }

        const agg = DataLayer.aggregate(projects);
        const activos = projects.filter(p => p.totalTasks > 0);

        const estadoGeneral = this.interpretarEstado(agg);
        const alertas = this.generarAlertas(projects, agg);
        const decisionesDelDia = this.generarDecisiones(projects, agg);
        const pulsoEquipo = this.calcularPulsoEquipo(projects);

        const scoreGeneral = Math.round(
          (Math.min(1.5, agg.CPI) / 1.5 * 30) +
          (Math.min(1.5, agg.SPI) / 1.5 * 30) +
          (agg.margenPct > 0 ? 20 : Math.max(0, 20 + agg.margenPct * 0.5)) +
          (activos.length > 0 ? 20 : 10)
        );

        const scoreColor = scoreGeneral >= 80 ? '#22c55e' : scoreGeneral >= 60 ? '#fbbf24' : scoreGeneral >= 40 ? '#f97316' : '#ef4444';

        const locale = getLang() === 'en' ? 'en-US' : 'es-ES';
        const horaActual = new Date().toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });

        container.innerHTML = `
          <!-- HERO EJECUTIVO -->
          <div class="exec-card" style="background:linear-gradient(135deg, ${scoreColor}15, rgba(12,6,30,0.95));border:1px solid ${scoreColor}55;padding:34px;">
            <div style="display:flex;align-items:center;gap:36px;flex-wrap:wrap;">
              <div style="text-align:center;">
                <div style="font-size:96px;font-weight:900;line-height:1;background:linear-gradient(135deg, ${scoreColor}, ${scoreColor}99);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
                  ${scoreGeneral}
                </div>
                <div style="font-size:11px;color:#fbbf24;letter-spacing:4px;text-transform:uppercase;margin-top:8px;font-weight:900;">
                  ${t('p8_hero_score_label')}
                </div>
              </div>
              <div style="flex:1;min-width:280px;">
                <div style="font-size:26px;font-weight:900;color:#fff;margin-bottom:6px;">${estadoGeneral.titulo}</div>
                <div style="font-size:14px;color:#b8a4e8;line-height:1.7;">${estadoGeneral.mensaje}</div>
                <div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap;">
                  <span style="padding:6px 14px;border-radius:100px;background:${scoreColor}22;color:${scoreColor};font-size:11px;font-weight:800;letter-spacing:1px;">
                    ${estadoGeneral.estado.toUpperCase()}
                  </span>
                  <span style="padding:6px 14px;border-radius:100px;background:rgba(251,191,36,0.15);color:#fbbf24;font-size:11px;font-weight:800;letter-spacing:1px;">
                    ${t('p8_hero_updated')} ${horaActual}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- KPIs EJECUTIVOS -->
          <div class="exec-grid-4">
            <div class="exec-kpi" style="--c:${agg.CPI >= 1 ? '#22c55e' : agg.CPI >= 0.9 ? '#fbbf24' : '#ef4444'}">
              <div class="exec-kpi-label">${t('p8_kpi_financial_status')}</div>
              <div class="exec-kpi-value">${agg.CPI.toFixed(2)}</div>
              <div class="exec-kpi-sub">${agg.CPI >= 1 ? t('p8_kpi_financial_optimal') : agg.CPI >= 0.9 ? t('p8_kpi_financial_tolerance') : t('p8_kpi_financial_attention')}</div>
            </div>
            <div class="exec-kpi" style="--c:${agg.SPI >= 1 ? '#22c55e' : agg.SPI >= 0.9 ? '#fbbf24' : '#ef4444'}">
              <div class="exec-kpi-label">${t('p8_kpi_schedule_status')}</div>
              <div class="exec-kpi-value">${agg.SPI.toFixed(2)}</div>
              <div class="exec-kpi-sub">${agg.SPI >= 1 ? t('p8_kpi_schedule_ontime') : agg.SPI >= 0.9 ? t('p8_kpi_schedule_tolerance') : t('p8_kpi_schedule_delayed')}</div>
            </div>
            <div class="exec-kpi" style="--c:#a78bfa">
              <div class="exec-kpi-label">${t('p8_kpi_portfolio')}</div>
              <div class="exec-kpi-value">${activos.length}</div>
              <div class="exec-kpi-sub">${t('p8_kpi_portfolio_sub')}</div>
            </div>
            <div class="exec-kpi" style="--c:#67e8f9">
              <div class="exec-kpi-label">${t('p8_kpi_total_value')}</div>
              <div class="exec-kpi-value">${fmt.moneyCompact(agg.BAC)}</div>
              <div class="exec-kpi-sub">${t('p8_kpi_total_value_sub')}</div>
            </div>
          </div>

          <!-- ALERTAS INTELIGENTES -->
          <div class="exec-card">
            <h3 class="exec-card-title">${t('p8_alerts_title')}</h3>
            ${alertas.length === 0 ? `
              <div style="text-align:center;padding:30px;color:#22c55e;font-size:13px;">
                ${t('p8_alerts_empty')}
              </div>
            ` : `
              <div style="display:flex;flex-direction:column;gap:12px;">
                ${alertas.map(a => `
                  <div style="padding:16px 20px;border-radius:12px;background:linear-gradient(90deg, ${a.color}15, rgba(12,6,30,0.75));border-left:4px solid ${a.color};">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap;">
                      <div style="flex:1;min-width:250px;">
                        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                          <span style="font-size:20px;">${a.icon}</span>
                          <span style="font-size:10px;padding:3px 10px;border-radius:100px;background:${a.color}22;color:${a.color};font-weight:900;letter-spacing:1px;">${a.nivel.toUpperCase()}</span>
                          <span style="font-size:13.5px;font-weight:900;color:#fff;">${a.titulo}</span>
                        </div>
                        <div style="font-size:12px;color:#b8a4e8;line-height:1.6;margin-bottom:8px;">${a.descripcion}</div>
                        <div style="font-size:11.5px;color:${a.color};font-weight:700;">→ ${a.accion}</div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <!-- DECISIONES DEL DÍA -->
          <div class="exec-card">
            <h3 class="exec-card-title">${t('p8_decisions_title')}</h3>
            <div style="font-size:12px;color:#8b7cb8;margin-bottom:16px;">
              ${t('p8_decisions_sub')}
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;">
              ${decisionesDelDia.map((d, i) => `
                <div style="padding:18px;border-radius:14px;background:linear-gradient(160deg, ${d.color}15, rgba(12,6,30,0.85));border:1px solid ${d.color}55;">
                  <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
                    <span style="width:32px;height:32px;border-radius:10px;background:${d.color};color:#1a0a2e;font-weight:900;font-size:16px;display:flex;align-items:center;justify-content:center;">${i + 1}</span>
                    <span style="font-size:13px;font-weight:900;color:#fff;">${d.titulo}</span>
                  </div>
                  <div style="font-size:11.5px;color:#b8a4e8;line-height:1.6;">${d.detalle}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- PULSO DEL EQUIPO + VISTA POR ROL -->
          <div class="exec-grid-2">
            <div class="exec-card">
              <h3 class="exec-card-title">${t('p8_pulse_title')}</h3>
              <div style="display:flex;flex-direction:column;gap:14px;">
                ${pulsoEquipo.map(p => `
                  <div>
                    <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                      <span style="font-size:12.5px;font-weight:700;color:#ddd6fe;">${p.label}</span>
                      <span style="font-size:13px;font-weight:900;color:${p.color};">${p.valor}</span>
                    </div>
                    <div class="exec-bar"><div class="exec-bar-fill" style="--c:${p.color};width:0" data-w="${p.pct}%"></div></div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="exec-card">
              <h3 class="exec-card-title">${t('p8_roles_title')}</h3>
              <div style="display:flex;flex-direction:column;gap:12px;">
                ${[
                  { rol: 'CEO', icon: '👔', color: '#fbbf24', mensaje: t('p8_role_ceo_msg'), accion: t('p8_role_ceo_action') },
                  { rol: 'CFO', icon: '💰', color: '#22c55e', mensaje: tI('p8_role_cfo_msg', { pct: fmt.pct(agg.margenPct) }), accion: t('p8_role_cfo_action') },
                  { rol: 'COO', icon: '⚙️', color: '#a78bfa', mensaje: tI('p8_role_coo_msg', { spi: agg.SPI.toFixed(2) }), accion: t('p8_role_coo_action') },
                  { rol: 'PMO', icon: '🎯', color: '#67e8f9', mensaje: tI('p8_role_pmo_msg', { count: agg.delayed }), accion: t('p8_role_pmo_action') }
                ].map(r => `
                  <div style="padding:12px 14px;border-radius:10px;background:linear-gradient(90deg, ${r.color}12, rgba(12,6,30,0.7));border-left:3px solid ${r.color};">
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
                      <span style="font-size:18px;">${r.icon}</span>
                      <span style="font-size:12px;font-weight:900;color:${r.color};letter-spacing:1px;">${r.rol}</span>
                    </div>
                    <div style="font-size:11.5px;color:#b8a4e8;line-height:1.5;margin-bottom:6px;">${r.mensaje}</div>
                    <div style="font-size:10.5px;color:${r.color};font-weight:800;letter-spacing:0.5px;">→ ${r.accion}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- RESUMEN ULTRA-LIMPIO -->
          <div class="exec-card" style="background:linear-gradient(135deg, rgba(20,10,50,0.95), rgba(6,4,24,1));">
            <h3 class="exec-card-title">${t('p8_summary_title')}</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;">
              ${[
                { label: t('p8_sum_where_label'), value: `${agg.progresoPct.toFixed(0)}%`, sub: t('p8_sum_where_sub'), color: '#fbbf24' },
                {
                  label: t('p8_sum_ok_label'),
                  value: (agg.CPI >= 1 && agg.SPI >= 1) ? t('p8_sum_ok_yes') : (agg.CPI >= 0.9 || agg.SPI >= 0.9) ? t('p8_sum_ok_caution') : t('p8_sum_ok_no'),
                  sub: t('p8_sum_ok_sub'),
                  color: (agg.CPI >= 1 && agg.SPI >= 1) ? '#22c55e' : (agg.CPI >= 0.9 || agg.SPI >= 0.9) ? '#fbbf24' : '#ef4444'
                },
                {
                  label: t('p8_sum_risk_label'),
                  value: agg.CPI < 0.9 ? t('p8_sum_risk_costs') : agg.SPI < 0.9 ? t('p8_sum_risk_schedule') : t('p8_sum_risk_none'),
                  sub: t('p8_sum_risk_sub'),
                  color: '#ef4444'
                },
                {
                  label: t('p8_sum_action_label'),
                  value: decisionesDelDia[0]?.titulo?.split(' ').slice(0, 3).join(' ') || t('p8_sum_action_default'),
                  sub: t('p8_sum_action_sub'),
                  color: '#a78bfa'
                }
              ].map(k => `
                <div style="text-align:center;padding:18px 12px;border-radius:12px;background:rgba(10,5,25,0.5);">
                  <div style="font-size:10px;color:#8b7cb8;letter-spacing:2px;text-transform:uppercase;font-weight:800;margin-bottom:8px;">${k.label}</div>
                  <div style="font-size:24px;font-weight:900;color:${k.color};line-height:1;">${k.value}</div>
                  <div style="font-size:10.5px;color:#8b7cb8;margin-top:6px;">${k.sub}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

        setTimeout(() => {
          container.querySelectorAll('.exec-bar-fill').forEach(el => {
            el.style.width = el.dataset.w || '0%';
          });
        }, 100);
      },

      interpretarEstado(agg) {
        if (agg.CPI >= 1 && agg.SPI >= 1 && agg.margenPct > 0) {
          return {
            titulo: t('p8_state_excellent_title'),
            mensaje: t('p8_state_excellent_msg'),
            estado: t('p8_hero_estado_optimo')
          };
        }
        if (agg.CPI >= 0.95 && agg.SPI >= 0.95) {
          return {
            titulo: t('p8_state_stable_title'),
            mensaje: t('p8_state_stable_msg'),
            estado: t('p8_hero_estado_estable')
          };
        }
        if (agg.CPI < 0.85 || agg.SPI < 0.85) {
          return {
            titulo: t('p8_state_critical_title'),
            mensaje: t('p8_state_critical_msg'),
            estado: t('p8_hero_estado_critico')
          };
        }
        return {
          titulo: t('p8_state_attention_title'),
          mensaje: t('p8_state_attention_msg'),
          estado: t('p8_hero_estado_atencion')
        };
      },

      generarAlertas(projects, agg) {
        const alertas = [];

        const criticos = projects.filter(p => p.totalTasks > 0 && p.health === 'critico');
        if (criticos.length > 0) {
          alertas.push({
            nivel: t('p8_level_critico'), icon: '🚨', color: '#ef4444',
            titulo: tI('p8_alert_crit_title', { count: criticos.length }),
            descripcion: tI('p8_alert_crit_desc', { names: criticos.map(p => p.name.substring(0, 25)).join(', ') }),
            accion: t('p8_alert_crit_action')
          });
        }

        const sobrecosto = projects.filter(p => p.totalTasks > 0 && p.VAC < 0);
        if (sobrecosto.length > 0) {
          const exposicion = Math.abs(sobrecosto.reduce((s, p) => s + p.VAC, 0));
          alertas.push({
            nivel: t('p8_level_alto'), icon: '💰', color: '#f97316',
            titulo: tI('p8_alert_overcost_title', { amount: fmt.moneyCompact(exposicion) }),
            descripcion: tI('p8_alert_overcost_desc', { count: sobrecosto.length }),
            accion: t('p8_alert_overcost_action')
          });
        }

        const totalRezagos = agg.delayed;
        if (totalRezagos > 3) {
          alertas.push({
            nivel: t('p8_level_medio'), icon: '⏰', color: '#fbbf24',
            titulo: tI('p8_alert_overdue_title', { count: totalRezagos }),
            descripcion: t('p8_alert_overdue_desc'),
            accion: t('p8_alert_overdue_action')
          });
        }

        const vacios = projects.filter(p => p.totalTasks === 0);
        if (vacios.length > 0) {
          alertas.push({
            nivel: t('p8_level_bajo'), icon: '📭', color: '#a78bfa',
            titulo: tI('p8_alert_empty_title', { count: vacios.length }),
            descripcion: t('p8_alert_empty_desc'),
            accion: t('p8_alert_empty_action')
          });
        }

        return alertas;
      },

      generarDecisiones(projects, agg) {
        const decisiones = [];

        if (agg.CPI < 0.9) {
          decisiones.push({
            titulo: t('p8_dec_restructure_title'),
            detalle: t('p8_dec_restructure_detail'),
            color: '#ef4444'
          });
        } else if (agg.SPI < 0.9) {
          decisiones.push({
            titulo: t('p8_dec_recover_title'),
            detalle: t('p8_dec_recover_detail'),
            color: '#f97316'
          });
        } else {
          decisiones.push({
            titulo: t('p8_dec_accelerate_title'),
            detalle: t('p8_dec_accelerate_detail'),
            color: '#22c55e'
          });
        }

        const activos = projects.filter(p => p.totalTasks > 0);
        const vacios = projects.filter(p => p.totalTasks === 0);
        if (vacios.length > 0) {
          decisiones.push({
            titulo: t('p8_dec_clean_title'),
            detalle: tI('p8_dec_clean_detail', { count: vacios.length }),
            color: '#a78bfa'
          });
        } else {
          decisiones.push({
            titulo: t('p8_dec_invest_title'),
            detalle: t('p8_dec_invest_detail'),
            color: '#a78bfa'
          });
        }

        const conMargenPositivo = activos.filter(p => p.margenProyectado >= 0);
        const pctRentables = activos.length > 0 ? (conMargenPositivo.length / activos.length) * 100 : 0;
        if (pctRentables < 50) {
          decisiones.push({
            titulo: t('p8_dec_pricing_title'),
            detalle: tI('p8_dec_pricing_detail', { pct: pctRentables.toFixed(0) }),
            color: '#ef4444'
          });
        } else {
          decisiones.push({
            titulo: t('p8_dec_consolidate_title'),
            detalle: tI('p8_dec_consolidate_detail', { pct: pctRentables.toFixed(0) }),
            color: '#22c55e'
          });
        }

        return decisiones;
      },

      calcularPulsoEquipo(projects) {
        const activos = projects.filter(p => p.totalTasks > 0);
        if (activos.length === 0) return [];

        const totalTareas = activos.reduce((s, p) => s + p.totalTasks, 0);
        const completadas = activos.reduce((s, p) => s + p.completedTasks, 0);
        const rezagadas = activos.reduce((s, p) => s + p.delayedTasks, 0);
        const enCurso = activos.reduce((s, p) => s + p.inProgressTasks, 0);

        const cargaMedia = activos.reduce((s, p) => s + (p.totalEstimated > 0 ? (p.totalLogged / p.totalEstimated) * 100 : 0), 0) / activos.length;

        return [
          { label: t('p8_pulse_productivity'), valor: `${((completadas / Math.max(1, totalTareas)) * 100).toFixed(0)}%`, pct: (completadas / Math.max(1, totalTareas)) * 100, color: '#22c55e' },
          { label: t('p8_pulse_avg_load'), valor: `${cargaMedia.toFixed(0)}%`, pct: Math.min(100, cargaMedia), color: cargaMedia > 100 ? '#ef4444' : cargaMedia > 80 ? '#fbbf24' : '#22c55e' },
          { label: t('p8_pulse_active_tasks'), valor: `${enCurso}`, pct: (enCurso / Math.max(1, totalTareas)) * 100, color: '#a78bfa' },
          { label: t('p8_pulse_delays'), valor: `${rezagadas}`, pct: (rezagadas / Math.max(1, totalTareas)) * 100, color: rezagadas > 3 ? '#ef4444' : '#fbbf24' }
        ];
      }
    }
  };

  /* ==========================================================
     SECCIÓN 4 · UI PRINCIPAL
     ========================================================== */
  const UI = {
    _refreshTimer: null,

    open() {
      injectStyles();

      // Cerrar si ya está abierto
      if (document.getElementById('exec-suite-overlay')) return;

      // Cargar datos
      this.reloadData();

      const overlay = document.createElement('div');
      overlay.className = 'exec-overlay';
      overlay.id = 'exec-suite-overlay';
      overlay.innerHTML = `
        <div class="exec-sidebar">
          <div class="exec-brand">
            <div class="exec-brand-logo">👑</div>
            <div class="exec-brand-text">
              <h2>Executive Suite</h2>
              <p>C-Suite Command</p>
            </div>
          </div>
                    <nav class="exec-nav">
            <div class="exec-nav-section">${t('nav_section_title')}</div>
            ${Object.values(Modules).map(m => `
              <div class="exec-nav-item ${m.id === State.module ? 'active' : ''}" data-module="${m.id}">
                <span class="exec-nav-icon">${m.icon}</span>
                <span class="exec-nav-label">${t('nav_' + m.id)}</span>
                ${m.badge ? `<span class="exec-nav-badge">${m.badge}</span>` : ''}
              </div>
            `).join('')}
          </nav>
          <div class="exec-sidebar-footer">
            v${CFG.version} · ${new Date().getFullYear()}
          </div>
        </div>
        <div class="exec-main">
          <div class="exec-topbar">
            <div>
              <h1 class="exec-topbar-title" id="exec-module-title">Portafolio Financiero</h1>
              <div class="exec-topbar-sub" id="exec-module-subtitle">Consolidado de todos los proyectos</div>
            </div>
                                    <div class="exec-topbar-actions">
              <div class="exec-lang-switch" id="exec-lang-switch">
                <button class="exec-lang-btn ${getLang() === 'es' ? 'active' : ''}" data-lang="es">ES</button>
                <button class="exec-lang-btn ${getLang() === 'en' ? 'active' : ''}" data-lang="en">EN</button>
              </div>
              <button class="exec-btn exec-btn-gold" id="exec-btn-refresh">${t('btn_refresh')}</button>
              <button class="exec-btn exec-btn-gold" id="exec-btn-export">${t('btn_export')}</button>
              <button class="exec-btn exec-btn-danger" id="exec-btn-close">${t('btn_close')}</button>
            </div>
          </div>
          <div class="exec-content" id="exec-content"></div>
        </div>
      `;

      document.body.appendChild(overlay);

      // Wire eventos
      this.wireEvents();

      // Render módulo activo
      this.renderModule(State.module);
    },

    close() {
      const ov = document.getElementById('exec-suite-overlay');
      if (ov) ov.remove();
      if (this._refreshTimer) {
        clearInterval(this._refreshTimer);
        this._refreshTimer = null;
      }
    },

    reloadData() {
      State.projects = DataLayer.load();
    },



    // 🌐 Refrescar todo el shell (sidebar + topbar + módulo activo) sin perder el estado
    refreshShell() {
      const overlay = document.getElementById('exec-suite-overlay');
      if (!overlay) return;

      const sectionEl = overlay.querySelector('.exec-nav-section');
      if (sectionEl) sectionEl.textContent = t('nav_section_title');

      overlay.querySelectorAll('.exec-nav-item').forEach(el => {
        const labelEl = el.querySelector('.exec-nav-label');
        if (labelEl) labelEl.textContent = t('nav_' + el.dataset.module);
      });

      const refreshBtn = document.getElementById('exec-btn-refresh');
      const exportBtn = document.getElementById('exec-btn-export');
      const closeBtn = document.getElementById('exec-btn-close');
      if (refreshBtn) refreshBtn.textContent = t('btn_refresh');
      if (exportBtn) exportBtn.textContent = t('btn_export');
      if (closeBtn) closeBtn.textContent = t('btn_close');

      if (typeof this.renderModule === 'function') {
        this.renderModule(State.module);
      }
    },


    // 📄 Exportar el módulo activo como PDF ejecutivo
    exportarModuloActivo() {
      const modulo = Modules[State.module];
      if (!modulo) return;

      const content = document.getElementById('exec-content');
      if (!content) return;

      // Capturar el HTML del módulo activo
      const htmlModulo = content.innerHTML;

      const fechaCorta = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
      const horaCorta = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

      // Verificar que hay contenido visible
      if (!htmlModulo || htmlModulo.trim().length < 50) {
        alert('⚠️ No hay contenido para exportar en este módulo.');
        return;
      }

      // CSS premium con colores preservados
      const CSS = `
        @page { size: A4 landscape; margin: 12mm; }
        * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        body {
          margin: 0; font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
          background: #0a0620; color: #e9d5ff;
          padding: 20px;
        }

        .portada {
          min-height: 160mm; padding: 40px 50px;
          background: linear-gradient(160deg, #0a0620 0%, #1e1145 40%, #2d1a6e 70%, #0ea5e9 130%);
          color: #fff; border-radius: 20px;
          margin-bottom: 30px; position: relative; overflow: hidden;
          page-break-after: always;
        }
        .portada::before {
          content: ''; position: absolute; top: -30%; right: -20%;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(251,191,36,0.25) 0%, transparent 60%);
          border-radius: 50%;
        }
        .portada-content { position: relative; z-index: 1; }
        .portada-brand {
          font-size: 10px; letter-spacing: 8px; text-transform: uppercase;
          color: #fbbf24; font-weight: 700; margin-bottom: 40px;
        }
        .portada-brand::after {
          content: ''; display: block; width: 60px; height: 3px;
          background: linear-gradient(90deg, #fbbf24, transparent);
          margin-top: 12px;
        }
        .portada-title {
          font-size: 46px; font-weight: 900; line-height: 1.1;
          letter-spacing: -1.5px; margin: 0;
          background: linear-gradient(135deg, #fff 0%, #fbbf24 50%, #fff 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .portada-subtitle {
          font-size: 15px; font-weight: 300; font-style: italic;
          color: #ddd6fe; margin-top: 16px; max-width: 600px;
          line-height: 1.5;
        }
        .portada-meta {
          margin-top: 60px; display: flex; gap: 40px; flex-wrap: wrap;
          padding-top: 24px; border-top: 1px solid rgba(251,191,36,0.3);
        }
        .portada-meta-label {
          font-size: 8px; letter-spacing: 4px; text-transform: uppercase;
          color: #fbbf24; margin-bottom: 6px; font-weight: 800;
        }
        .portada-meta-value { font-size: 14px; font-weight: 700; color: #fff; }

        /* MANTENER ESTILOS DEL MÓDULO ORIGINAL */
        #contenido-export { background: #0a0620; padding: 20px; border-radius: 16px; }

        /* Neutralizar fixed/sticky para impresión */
        #contenido-export [style*="position:fixed"],
        #contenido-export [style*="position: sticky"] {
          position: static !important;
        }

        /* Evitar cortes feos */
        #contenido-export > div,
        #contenido-export .exec-card,
        #contenido-export .exec-kpi {
          page-break-inside: avoid;
        }

        /* Asegurar que los textos oscuros se ven sobre fondos oscuros */
        #contenido-export { color: #e9d5ff; }

        .footer-reporte {
          text-align: center; padding: 20px;
          color: #6b4fa8; font-size: 9px; letter-spacing: 3px;
          text-transform: uppercase; margin-top: 30px;
          border-top: 1px solid rgba(251,191,36,0.2);
        }
      `;

      const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Executive Report - ${modulo.label}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<style>${CSS}</style>
</head>
<body>

  <!-- PORTADA -->
  <div class="portada">
    <div class="portada-content">
      <div class="portada-brand">The Jacksons Solutions</div>
      <h1 class="portada-title">${modulo.label}</h1>
      <div class="portada-subtitle">${modulo.subtitle || 'Análisis ejecutivo del Portafolio'}</div>
      <div class="portada-meta">
        <div>
          <div class="portada-meta-label">Rol</div>
          <div class="portada-meta-value">${modulo.badge || 'C-Suite'}</div>
        </div>
        <div>
          <div class="portada-meta-label">Fecha</div>
          <div class="portada-meta-value">${fechaCorta}</div>
        </div>
        <div>
          <div class="portada-meta-label">Hora</div>
          <div class="portada-meta-value">${horaCorta}</div>
        </div>
      </div>
    </div>
  </div>

  <!-- CONTENIDO DEL MÓDULO -->
  <div id="contenido-export">${htmlModulo}</div>

  <div class="footer-reporte">
    Executive Intelligence Report · ${modulo.label} · CONFIDENCIAL · ${fechaCorta}
  </div>

</body>
</html>`;

      const w = window.open('', '_blank');
      if (!w) {
        alert('⚠️ Permite las ventanas emergentes para exportar.');
        return;
      }
      w.document.write(html);
      w.document.close();
      setTimeout(() => { w.focus(); w.print(); }, 800);
    },





       renderModule(moduleId) {
      const mod = Modules[moduleId];
      if (!mod) return;

      State.module = moduleId;

      // Actualizar títulos (i18n)
      const label = t('nav_' + moduleId);
      const subtitleText = t('sub_' + moduleId);
      const title = document.getElementById('exec-module-title');
      const subtitle = document.getElementById('exec-module-subtitle');
      if (title) title.textContent = label;
      if (subtitle) subtitle.textContent = subtitleText || '';

      // Actualizar navegación
      document.querySelectorAll('.exec-nav-item').forEach(el => {
        el.classList.toggle('active', el.dataset.module === moduleId);
        const labelEl = el.querySelector('.exec-nav-label');
        if (labelEl) labelEl.textContent = t('nav_' + el.dataset.module);
      });

      // Actualizar el título del sidebar (por si acaso)
      const sectionTitle = document.querySelector('.exec-nav-section');
      if (sectionTitle) sectionTitle.textContent = t('nav_section_title');

      // Render del módulo
      const content = document.getElementById('exec-content');
      if (content) {
        content.innerHTML = '';
        try {
          mod.render(content);
        } catch (e) {
          console.error('❌ Error renderizando módulo', moduleId, e);
          content.innerHTML = `<div class="exec-empty">⚠️ Error cargando el módulo: ${e.message}</div>`;
        }
      }
    },

    wireEvents() {
      // Navegación
      document.querySelectorAll('.exec-nav-item').forEach(item => {
        item.addEventListener('click', () => {
          this.renderModule(item.dataset.module);
        });
      });

      // Refresh
      const refreshBtn = document.getElementById('exec-btn-refresh');
      if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
          this.reloadData();
          this.renderModule(State.module);
        });
      }

           // Export — genera PDF ejecutivo del módulo activo
      const exportBtn = document.getElementById('exec-btn-export');
      if (exportBtn) {
        exportBtn.addEventListener('click', () => this.exportarModuloActivo());
      }

      // Close
      const closeBtn = document.getElementById('exec-btn-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.close());
      }


      // 🌐 Language switcher (dentro del Executive Suite)
      const langSwitcher = document.getElementById('exec-lang-switch');
      if (langSwitcher) {
        langSwitcher.querySelectorAll('.exec-lang-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const newLang = btn.dataset.lang;
            if (newLang === getLang()) return;

            localStorage.setItem('zacky_lang', newLang);

            langSwitcher.querySelectorAll('.exec-lang-btn').forEach(b => {
              b.classList.toggle('active', b.dataset.lang === newLang);
            });

            this.refreshShell();
          });
        });
      }



      // ESC para cerrar
      const escHandler = (e) => {
        if (e.key === 'Escape') {
          this.close();
          document.removeEventListener('keydown', escHandler);
        }
      };
      document.addEventListener('keydown', escHandler);
    }
  };

  /* ==========================================================
     SECCIÓN 5 · BOOT
     ========================================================== */
  function injectFloatButton() {
    if (document.getElementById('exec-float-btn')) return;
    const btn = document.createElement('button');
    btn.className = 'exec-float-btn';
    btn.id = 'exec-float-btn';
    btn.innerHTML = `<span class="exec-float-btn-icon">👑</span> Executive Suite`;
    btn.onclick = () => UI.open();
    document.body.appendChild(btn);
    console.log('👑 [Executive Suite] Botón flotante inyectado');
  }

  function watchForLogin() {
    // Mostrar el botón siempre (el usuario ya está logueado cuando entra al sistema)
    const tryInject = () => {
      if (!document.getElementById('exec-float-btn')) {
        // Verificar que no estamos en la landing
        const isLanding = !document.querySelector('#dashboard, .sidebar, .project-item, [data-project-id]');
        if (!isLanding) {
          injectFloatButton();
          return true;
        }
      }
      return false;
    };

    if (tryInject()) return;

    // Esperar a que aparezca el dashboard
    const obs = new MutationObserver(() => {
      if (tryInject()) obs.disconnect();
    });
    obs.observe(document.body, { childList: true, subtree: true });

    // Timeout de seguridad
    setTimeout(() => {
      if (!document.getElementById('exec-float-btn')) injectFloatButton();
    }, 5000);
  }

   // API pública
  window.ExecutiveSuite = {
    open: () => UI.open(),
    close: () => UI.close(),
    version: CFG.version,
    modules: () => Object.keys(Modules)
  };

    // 🎯 Fix: buscar generarReporte donde sea que esté anidado
  window.__ExecutiveSuiteReport = (tipo) => {
    try {
      let fn = null;
      let ctx = null;

      // Búsqueda recursiva en todos los módulos
      const searchIn = (obj, depth = 0) => {
        if (depth > 3 || !obj || typeof obj !== 'object') return;
        for (const key in obj) {
          const val = obj[key];
          if (typeof val === 'function' && key === 'generarReporte') {
            fn = val;
            ctx = obj;
            return;
          }
          if (val && typeof val === 'object') {
            searchIn(val, depth + 1);
            if (fn) return;
          }
        }
      };

      searchIn(Modules);

      if (!fn) {
        throw new Error('generarReporte no encontrado en ningún módulo');
      }

      console.log('🎯 Ejecutando generarReporte encontrado en:', Object.keys(ctx).slice(0, 3).join(', ') + '...');
      fn.call(ctx, tipo);

    } catch (e) {
      console.error('❌ Error generando reporte:', e.message);
      alert('⚠️ Error generando reporte: ' + e.message);
    }
  };

  // Arranque
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectStyles();
      watchForLogin();
    });
  } else {
    injectStyles();
    watchForLogin();
  }


  // 🔄 Re-renderizar al cambiar idioma en la landing
  document.addEventListener('click', (e) => {
    if (e.target.closest('.lang-btn')) {
      setTimeout(() => {
        const overlay = document.getElementById('exec-suite-overlay');
        if (!overlay) return;

        // Actualizar sidebar
        overlay.querySelectorAll('.exec-nav-item').forEach(el => {
          const labelEl = el.querySelector('.exec-nav-label');
          if (labelEl) labelEl.textContent = t('nav_' + el.dataset.module);
        });

        // Actualizar section header
        const sectionEl = overlay.querySelector('.exec-nav-section');
        if (sectionEl) sectionEl.textContent = t('nav_section_title');

        // Actualizar topbar buttons
        const refreshBtn = document.getElementById('exec-btn-refresh');
        const exportBtn = document.getElementById('exec-btn-export');
        const closeBtn = document.getElementById('exec-btn-close');
        if (refreshBtn) refreshBtn.textContent = t('btn_refresh');
        if (exportBtn) exportBtn.textContent = t('btn_export');
        if (closeBtn) closeBtn.textContent = t('btn_close');

        // Re-renderizar el módulo activo (por si acaso)
        if (typeof UI !== 'undefined' && UI.renderModule) {
          UI.renderModule(State.module);
        }
      }, 150);
    }
  });



  console.log(`✅ Executive Suite v${CFG.version} cargado — 8 módulos C-Suite disponibles`);
})();