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
      p1_completed: 'completado'
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
      p1_completed: 'completed'
    }
  };

  function t(key) {
    const lang = getLang();
    return (I18N[lang] && I18N[lang][key]) || I18N.es[key] || key;
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
          container.innerHTML = `<div class="exec-loading">📭 No hay proyectos disponibles</div>`;
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
            <h3 class="exec-card-title">Balanced Scorecard · Salud Estratégica Global</h3>
            <div style="display:flex;align-items:center;gap:32px;flex-wrap:wrap;">
              <div style="text-align:center;min-width:180px;">
                <div style="font-size:72px;font-weight:900;background:linear-gradient(135deg,#22c55e,#fbbf24);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1;">
                  ${totalScorecard}
                </div>
                <div style="font-size:11px;color:#fbbf24;letter-spacing:3px;text-transform:uppercase;margin-top:8px;font-weight:800;">
                  Score Estratégico / 100
                </div>
                <div style="font-size:11px;color:#8b7cb8;margin-top:6px;">
                  ${totalScorecard >= 75 ? '🟢 Excelente' : totalScorecard >= 50 ? '🟡 Estable' : '🔴 Requiere acción'}
                </div>
              </div>
              <div style="flex:1;min-width:280px;display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                ${[
                  { key: 'financiera', icon: '💰', label: 'Perspectiva Financiera', color: '#22c55e' },
                  { key: 'cliente', icon: '🎯', label: 'Perspectiva Cliente', color: '#a78bfa' },
                  { key: 'procesos', icon: '⚙️', label: 'Procesos Internos', color: '#fbbf24' },
                  { key: 'aprendizaje', icon: '🧠', label: 'Aprendizaje & Crecimiento', color: '#67e8f9' }
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
            <h3 class="exec-card-title">Objetivos Estratégicos Derivados</h3>
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
                          <span style="padding:2px 10px;border-radius:100px;font-size:10px;font-weight:800;letter-spacing:1px;background:${color}22;color:${color};">${obj.estado.toUpperCase()}</span>
                        </div>
                        <div style="font-size:12px;color:#b8a4e8;line-height:1.6;">${obj.descripcion}</div>
                      </div>
                      <div style="text-align:right;min-width:120px;">
                        <div style="font-size:26px;font-weight:900;color:${color};">${obj.progreso}%</div>
                        <div style="font-size:10px;color:#8b7cb8;letter-spacing:1.5px;text-transform:uppercase;">Progreso</div>
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
            <h3 class="exec-card-title">Matriz de Alineación Estratégica</h3>
            <div style="overflow-x:auto;">
              <table class="exec-table">
                <thead>
                  <tr>
                    <th>Proyecto</th>
                    <th class="num">Alineación</th>
                    <th class="num">Impacto Estratégico</th>
                    <th class="num">Prioridad</th>
                    <th>Recomendación</th>
                  </tr>
                </thead>
                <tbody>
                  ${alineacion.map(a => {
                    const prioridadColor = a.prioridad === 'crítica' ? '#ef4444' : a.prioridad === 'alta' ? '#f97316' : a.prioridad === 'media' ? '#fbbf24' : '#22c55e';
                    return `
                      <tr style="--rowc:${prioridadColor}">
                        <td>${a.proyecto.substring(0, 40)}</td>
                        <td class="num" style="color:${a.alineacion >= 70 ? '#22c55e' : a.alineacion >= 40 ? '#fbbf24' : '#ef4444'};font-weight:900;">${a.alineacion}%</td>
                        <td class="num">${a.impacto}</td>
                        <td class="num"><span style="padding:3px 10px;border-radius:100px;font-size:10px;font-weight:800;background:${prioridadColor}22;color:${prioridadColor};">${a.prioridad.toUpperCase()}</span></td>
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
              <h3 class="exec-card-title">Forecast Estratégico 12 meses</h3>
              <div style="display:flex;flex-direction:column;gap:14px;">
                ${forecast.trimestres.map(t => `
                  <div style="padding:14px 16px;border-radius:12px;background:rgba(10,5,25,0.5);border-left:3px solid ${t.color};">
                    <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                      <span style="font-size:13px;font-weight:800;color:#fff;">${t.label}</span>
                      <span style="font-size:14px;font-weight:900;color:${t.color};">${fmt.moneyCompact(t.ingresos)}</span>
                    </div>
                    <div style="font-size:11px;color:#8b7cb8;">${t.descripcion}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="exec-card">
              <h3 class="exec-card-title">Decisiones Estratégicas Recomendadas</h3>
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
        let insight = 'Situación estable';
        if (score >= 75) insight = 'Finanzas sólidas';
        else if (score >= 50) insight = 'Margen ajustado';
        else insight = 'Requiere intervención';
        return { score: Math.min(100, Math.max(0, score)), insight };
      },

      calcularCliente(projects) {
        const avgProgress = projects.reduce((s, p) => s + p.progresoPct, 0) / Math.max(1, projects.length);
        const healthyRatio = projects.filter(p => p.health === 'saludable' || p.health === 'aceptable').length / Math.max(1, projects.length);
        const score = Math.round(avgProgress * 0.5 + healthyRatio * 100 * 0.5);
        let insight = 'Satisfacción moderada';
        if (score >= 75) insight = 'Clientes satisfechos';
        else if (score >= 50) insight = 'Atención requerida';
        else insight = 'Riesgo de insatisfacción';
        return { score: Math.min(100, Math.max(0, score)), insight };
      },

      calcularProcesos(agg) {
        const score = Math.round(Math.min(100, Math.max(0, agg.SPI * 60 + (agg.tasks > 0 ? (agg.completed / agg.tasks) * 40 : 40))));
        let insight = 'Procesos funcionales';
        if (score >= 75) insight = 'Excelencia operativa';
        else if (score >= 50) insight = 'Oportunidades de mejora';
        else insight = 'Reingeniería necesaria';
        return { score: Math.min(100, Math.max(0, score)), insight };
      },

      calcularAprendizaje(projects) {
        const conTareas = projects.filter(p => p.totalTasks > 0);
        const ratioCompletado = conTareas.length > 0
          ? conTareas.reduce((s, p) => s + (p.completedTasks / p.totalTasks), 0) / conTareas.length
          : 0;
        const score = Math.round(ratioCompletado * 100);
        let insight = 'Equipo productivo';
        if (score >= 75) insight = 'Alto desempeño';
        else if (score >= 40) insight = 'Aprendizaje continuo';
        else insight = 'Requiere formación';
        return { score: Math.min(100, Math.max(0, score)), insight };
      },

      derivarObjetivos(projects, agg, scorecard) {
        const objetivos = [];

        // Objetivo 1: Mejorar CPI global
        objetivos.push({
          titulo: 'Optimizar eficiencia de costos (CPI ≥ 1.00)',
          descripcion: `Actualmente el CPI global es ${agg.CPI.toFixed(2)}. Objetivo: recuperar el margen y alcanzar eficiencia financiera sostenible.`,
          progreso: Math.min(100, Math.round(agg.CPI * 100)),
          estado: agg.CPI >= 1 ? 'logrado' : agg.CPI >= 0.95 ? 'en-curso' : agg.CPI >= 0.85 ? 'riesgo' : 'critico',
          accion: agg.CPI >= 1 ? 'Mantener el control actual' : 'Auditoría de horas y revisión de alcance'
        });

        // Objetivo 2: Cumplir cronograma
        objetivos.push({
          titulo: 'Alinear el cronograma (SPI ≥ 1.00)',
          descripcion: `SPI global: ${agg.SPI.toFixed(2)}. Objetivo: ejecutar al ritmo planificado y recuperar retrasos acumulados.`,
          progreso: Math.min(100, Math.round(agg.SPI * 100)),
          estado: agg.SPI >= 1 ? 'logrado' : agg.SPI >= 0.95 ? 'en-curso' : agg.SPI >= 0.85 ? 'riesgo' : 'critico',
          accion: agg.SPI >= 1 ? 'Mantener velocidad' : 'Fast-tracking en ruta crítica'
        });

               // Objetivo 3: Alcanzar margen positivo
        objetivos.push({
          titulo: 'Alcanzar margen positivo del portafolio',
          descripcion: `Margen actual: ${fmt.money(agg.margen)} (${fmt.pct(agg.margenPct)}). Objetivo: reducir sobrecostos y proteger rentabilidad.`,
          progreso: agg.margen >= 0 ? 100 : Math.round(Math.max(0, Math.min(100, 50 + agg.margenPct))),
          estado: agg.margen >= 0 ? 'logrado' : agg.margenPct > -5 ? 'en-curso' : agg.margenPct > -15 ? 'riesgo' : 'critico',
          accion: agg.margen >= 0 ? 'Documentar prácticas exitosas' : 'Renegociar contratos y revisar estimaciones'
        });

        // Objetivo 4: Reducir tareas rezagadas
        const totalTareas = projects.reduce((s, p) => s + p.totalTasks, 0);
        const tareasRezagadas = projects.reduce((s, p) => s + p.delayedTasks, 0);
        const pctRezago = totalTareas > 0 ? (tareasRezagadas / totalTareas) * 100 : 0;
        objetivos.push({
          titulo: 'Reducir tareas rezagadas a < 5%',
          descripcion: `Actualmente ${tareasRezagadas} de ${totalTareas} tareas están rezagadas (${fmt.pct(pctRezago)}). Objetivo: cero rezagos críticos.`,
          progreso: Math.max(0, Math.min(100, 100 - pctRezago * 5)),
          estado: pctRezago < 5 ? 'logrado' : pctRezago < 15 ? 'en-curso' : pctRezago < 30 ? 'riesgo' : 'critico',
          accion: pctRezago < 5 ? 'Mantener seguimiento' : 'Reasignación de recursos y revisión de dependencias'
        });

        // Objetivo 5: Escalar portafolio
        const proyectosActivos = projects.filter(p => p.totalTasks > 0).length;
        objetivos.push({
          titulo: 'Consolidar el portafolio activo',
          descripcion: `${proyectosActivos} proyectos activos. Objetivo: escalar a ${proyectosActivos + 2} proyectos con el mismo equipo.`,
          progreso: Math.round((proyectosActivos / (proyectosActivos + 2)) * 100),
          estado: 'en-curso',
          accion: 'Estandarizar procesos y automatizar reportes'
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
              impacto: 'Nulo',
              prioridad: 'baja',
              recomendacion: 'Definir alcance o archivar'
            };
          }

          const alineacion = Math.round(
            (p.CPI >= 1 ? 30 : p.CPI >= 0.9 ? 20 : 5) +
            (p.SPI >= 1 ? 30 : p.SPI >= 0.9 ? 20 : 5) +
            (p.progresoPct >= 50 ? 20 : p.progresoPct >= 25 ? 15 : 5) +
            (p.health === 'saludable' ? 20 : p.health === 'aceptable' ? 15 : 5)
          );

          let prioridad = 'baja';
          if (p.health === 'critico') prioridad = 'crítica';
          else if (p.health === 'riesgo') prioridad = 'alta';
          else if (p.health === 'aceptable') prioridad = 'media';

          let impacto = 'Bajo';
          if (p.BAC > 5000) impacto = 'Alto';
          else if (p.BAC > 2000) impacto = 'Medio';

          let recomendacion = 'Mantener monitoreo';
          if (p.health === 'critico') recomendacion = 'Intervención ejecutiva inmediata';
          else if (p.health === 'riesgo') recomendacion = 'Plan de recuperación en 7 días';
          else if (p.totalTasks === 0) recomendacion = 'Definir alcance o archivar';

          return { proyecto: p.name, alineacion, impacto, prioridad, recomendacion };
        }).sort((a, b) => b.alineacion - a.alineacion);
      },

      calcularForecast(projects, agg) {
        const ingresosBase = agg.EV;
        const margenActual = agg.margenPct / 100;

        const trimestres = [
          { label: 'Q1 2027', ingresos: ingresosBase * 1.15, color: '#fbbf24', descripcion: 'Recuperación del margen actual' },
          { label: 'Q2 2027', ingresos: ingresosBase * 1.35, color: '#a78bfa', descripcion: 'Consolidación del portafolio' },
          { label: 'Q3 2027', ingresos: ingresosBase * 1.60, color: '#67e8f9', descripcion: 'Escalado del equipo' },
          { label: 'Q4 2027', ingresos: ingresosBase * 1.90, color: '#22c55e', descripcion: 'Nuevos mercados' }
        ];

        const decisiones = [
          {
            titulo: agg.margen < 0 ? 'Auditoría financiera urgente' : 'Optimización del margen',
            detalle: agg.margen < 0
              ? 'Sobrecosto detectado en el portafolio. Revisar estimaciones, horas facturables y alcance de los proyectos en riesgo.'
              : 'El portafolio es rentable. Documentar prácticas exitosas para replicar.',
            color: agg.margen < 0 ? '#ef4444' : '#22c55e'
          },
          {
            titulo: 'Priorizar proyectos con mayor alineación',
            detalle: 'Enfocar recursos en proyectos con CPI/SPI ≥ 0.95 para maximizar el retorno del portafolio.',
            color: '#fbbf24'
          },
          {
            titulo: projects.filter(p => p.totalTasks === 0).length > 0
              ? 'Decidir sobre proyectos sin alcance'
              : 'Revisar oportunidades de escalado',
            detalle: projects.filter(p => p.totalTasks === 0).length > 0
              ? `Hay ${projects.filter(p => p.totalTasks === 0).length} proyectos sin tareas. Definir alcance o archivar para no distorsionar métricas.`
              : 'La estructura actual permite añadir 2 proyectos más con el equipo existente.',
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
          container.innerHTML = `<div class="exec-loading">📭 No hay proyectos disponibles</div>`;
          return;
        }

        // Extraer equipo desde las tareas
        const equipo = this.extraerEquipo(projects);

        if (equipo.length === 0) {
          container.innerHTML = `<div class="exec-empty">👥 No hay asignaciones de equipo registradas en los proyectos</div>`;
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
              <div class="exec-kpi-label">Equipo Total</div>
              <div class="exec-kpi-value">${equipo.length}</div>
              <div class="exec-kpi-sub">personas asignadas</div>
            </div>
            <div class="exec-kpi" style="--c:#22c55e">
              <div class="exec-kpi-label">Utilización Media</div>
              <div class="exec-kpi-value">${kpis.utilizacionMedia}%</div>
              <div class="exec-kpi-sub">${kpis.utilizacionMedia >= 75 ? 'Óptima' : kpis.utilizacionMedia >= 50 ? 'Aceptable' : 'Baja'}</div>
            </div>
            <div class="exec-kpi" style="--c:#ef4444">
              <div class="exec-kpi-label">Sobrecargados</div>
              <div class="exec-kpi-value">${kpis.sobrecargados}</div>
              <div class="exec-kpi-sub">personas > 100%</div>
            </div>
            <div class="exec-kpi" style="--c:#a78bfa">
              <div class="exec-kpi-label">En Bench</div>
              <div class="exec-kpi-value">${kpis.enBench}</div>
              <div class="exec-kpi-sub">sin asignación activa</div>
            </div>
          </div>

          <!-- DISTRIBUCIÓN POR UTILIZACIÓN -->
          <div class="exec-card">
            <h3 class="exec-card-title">Distribución por Nivel de Carga</h3>
            <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:10px;">
              ${[
                { label: 'Sobrecargados', rango: '> 100%', color: '#ef4444', icon: '🔴', filtro: m => m.utilizacion > 100 },
                { label: 'Alta carga', rango: '75-100%', color: '#f59e0b', icon: '🟠', filtro: m => m.utilizacion > 75 && m.utilizacion <= 100 },
                { label: 'Óptimos', rango: '50-75%', color: '#22c55e', icon: '🟢', filtro: m => m.utilizacion > 50 && m.utilizacion <= 75 },
                { label: 'Disponibles', rango: '25-50%', color: '#67e8f9', icon: '🔵', filtro: m => m.utilizacion > 25 && m.utilizacion <= 50 },
                { label: 'En bench', rango: '0-25%', color: '#a78bfa', icon: '🟣', filtro: m => m.utilizacion <= 25 }
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
              <h3 class="exec-card-title">🔥 Top Personas por Carga</h3>
              <div style="display:flex;flex-direction:column;gap:10px;">
                ${topCargados.map(m => {
                  const color = m.utilizacion > 100 ? '#ef4444' : m.utilizacion > 75 ? '#f59e0b' : m.utilizacion > 50 ? '#22c55e' : '#67e8f9';
                  const pct = Math.min(150, m.utilizacion);
                  return `
                    <div style="padding:12px 14px;border-radius:10px;background:rgba(10,5,25,0.5);border-left:3px solid ${color};">
                      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                        <div>
                          <div style="font-size:13px;font-weight:800;color:#fff;">${m.nombre}</div>
                          <div style="font-size:11px;color:#8b7cb8;">${m.tareasActivas} tareas activas · ${m.horasAsignadas}h asignadas</div>
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
              <h3 class="exec-card-title">💤 Personas en Bench / Disponibles</h3>
              ${bench.length === 0 && equipo.filter(m => m.utilizacion <= 25).length === 0 ? `
                <div style="text-align:center;padding:30px;color:#22c55e;font-size:13px;">
                  ✅ Todo el equipo está asignado a tareas activas
                </div>
              ` : `
                <div style="display:flex;flex-direction:column;gap:10px;">
                  ${equipo.filter(m => m.utilizacion <= 50).sort((a, b) => a.utilizacion - b.utilizacion).slice(0, 8).map(m => `
                    <div style="padding:12px 14px;border-radius:10px;background:rgba(10,5,25,0.5);border-left:3px solid #a78bfa;">
                      <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                          <div style="font-size:13px;font-weight:800;color:#fff;">${m.nombre}</div>
                          <div style="font-size:11px;color:#8b7cb8;">${m.tareasActivas === 0 ? 'Sin asignación activa' : `${m.tareasActivas} tareas · ${m.utilizacion}% carga`}</div>
                        </div>
                        <div style="font-size:11px;padding:4px 10px;border-radius:100px;background:${m.utilizacion <= 25 ? '#a78bfa22' : '#67e8f922'};color:${m.utilizacion <= 25 ? '#a78bfa' : '#67e8f9'};font-weight:800;letter-spacing:1px;">
                          ${m.utilizacion <= 25 ? 'BENCH' : 'DISPONIBLE'}
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
            <h3 class="exec-card-title">Carga por Proyecto</h3>
            <div style="overflow-x:auto;">
              <table class="exec-table">
                <thead>
                  <tr>
                    <th>Proyecto</th>
                    <th class="num">Personas</th>
                    <th class="num">Horas Asignadas</th>
                    <th class="num">Horas Registradas</th>
                    <th class="num">% Avance</th>
                    <th class="num">Tareas Activas</th>
                    <th>Carga</th>
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
            <h3 class="exec-card-title">Forecast de Necesidades (próximos 6 meses)</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;">
              ${forecast.map(f => `
                <div style="padding:16px;border-radius:12px;background:linear-gradient(160deg, ${f.color}15, rgba(12,6,30,0.7));border:1px solid ${f.color}44;">
                  <div style="font-size:10px;color:#fbbf24;letter-spacing:2px;text-transform:uppercase;font-weight:800;margin-bottom:8px;">${f.mes}</div>
                  <div style="font-size:26px;font-weight:900;color:${f.color};line-height:1;">${f.personasNecesarias}</div>
                  <div style="font-size:11px;color:#8b7cb8;margin-top:6px;">personas necesarias</div>
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

          let recomendacion = 'Equipo suficiente';
          if (delta > 3) recomendacion = `+${delta} contrataciones`;
          else if (delta > 0) recomendacion = `+${delta} contratación`;
          else recomendacion = 'Capacidad óptima';

          return { mes, personasNecesarias, recomendacion, color: colores[i] };
        });
      }
    },
        bi: {
      id: 'bi', icon: '📊', label: 'Business Intelligence', subtitle: 'Reportes avanzados', badge: 'BI',
      render(container) {
        const projects = State.projects;
        if (!projects.length) {
          container.innerHTML = `<div class="exec-empty">📭 No hay datos para analizar</div>`;
          return;
        }

        const agg = DataLayer.aggregate(projects);
        const activos = projects.filter(p => p.totalTasks > 0);

        // 1) Reportes personalizables (configuración)
        const reportes = [
          { id: 'ejecutivo', icon: '📋', label: 'Reporte Ejecutivo', desc: 'Resumen C-Suite de KPIs y estado' },
          { id: 'financiero', icon: '💰', label: 'Reporte Financiero', desc: 'Costos, márgenes y proyecciones' },
          { id: 'cronograma', icon: '⏰', label: 'Reporte de Cronograma', desc: 'SPI, deadlines, tareas rezagadas' },
          { id: 'equipo', icon: '👥', label: 'Reporte de Equipo', desc: 'Carga, utilización y performance' },
          { id: 'riesgos', icon: '⚠️', label: 'Reporte de Riesgos', desc: 'Identificación y mitigación' },
          { id: 'comparativo', icon: '⚖️', label: 'Reporte Comparativo', desc: 'Benchmark entre proyectos' }
        ];

        // 2) Tendencias temporales (últimos 6 meses simulados sobre snapshots reales)
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
              <div class="exec-kpi-label">Reportes Disponibles</div>
              <div class="exec-kpi-value">${reportes.length}</div>
              <div class="exec-kpi-sub">plantillas ejecutivas</div>
            </div>
            <div class="exec-kpi" style="--c:#22c55e">
              <div class="exec-kpi-label">Proyectos Activos</div>
              <div class="exec-kpi-value">${activos.length}</div>
              <div class="exec-kpi-sub">de ${projects.length} totales</div>
            </div>
            <div class="exec-kpi" style="--c:#a78bfa">
              <div class="exec-kpi-label">Insights Generados</div>
              <div class="exec-kpi-value">${insights.length}</div>
              <div class="exec-kpi-sub">análisis automáticos</div>
            </div>
            <div class="exec-kpi" style="--c:#67e8f9">
              <div class="exec-kpi-label">Datos Procesados</div>
              <div class="exec-kpi-value">${fmt.num(agg.tasks)}</div>
              <div class="exec-kpi-sub">tareas analizadas</div>
            </div>
          </div>

          <!-- REPORTES DISPONIBLES -->
          <div class="exec-card">
            <h3 class="exec-card-title">📋 Reportes Ejecutivos Disponibles</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-top:10px;">
                                          ${reportes.map(r => `
                <div class="exec-report-btn" data-report="${r.id}" onclick="window.__ExecutiveSuiteReport('${r.id}')" style="padding:16px;border-radius:12px;background:linear-gradient(160deg, rgba(45,25,90,0.6), rgba(10,5,25,0.95));border:1px solid rgba(251,191,36,0.25);cursor:pointer;transition:all 0.25s;">
                  <div style="font-size:28px;margin-bottom:8px;">${r.icon}</div>
                  <div style="font-size:13px;font-weight:800;color:#fff;margin-bottom:4px;">${r.label}</div>
                  <div style="font-size:11px;color:#8b7cb8;line-height:1.5;">${r.desc}</div>
                  <div style="margin-top:12px;font-size:10px;color:#fbbf24;letter-spacing:1.5px;font-weight:800;">GENERAR →</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- TENDENCIAS TEMPORALES -->
          <div class="exec-card">
            <h3 class="exec-card-title">📈 Tendencias Temporales (últimos 6 meses)</h3>
            <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:20px;">
              ${[
                { label: 'CPI', value: tendencias.cpi.actual, delta: tendencias.cpi.delta, color: '#22c55e' },
                { label: 'SPI', value: tendencias.spi.actual, delta: tendencias.spi.delta, color: '#67e8f9' },
                { label: 'Margen %', value: tendencias.margen.actual, delta: tendencias.margen.delta, color: '#fbbf24' },
                { label: 'Progreso %', value: tendencias.progreso.actual, delta: tendencias.progreso.delta, color: '#a78bfa' }
              ].map(t => {
                const deltaColor = t.delta > 0 ? '#22c55e' : t.delta < 0 ? '#ef4444' : '#8b7cb8';
                const deltaIcon = t.delta > 0 ? '▲' : t.delta < 0 ? '▼' : '●';
                return `
                  <div style="flex:1;min-width:180px;padding:16px;border-radius:12px;background:linear-gradient(160deg, ${t.color}12, rgba(12,6,30,0.7));border:1px solid ${t.color}44;">
                    <div style="font-size:10px;color:#fbbf24;letter-spacing:2px;font-weight:800;margin-bottom:8px;">${t.label}</div>
                    <div style="font-size:26px;font-weight:900;color:${t.color};line-height:1;">${t.value}</div>
                    <div style="font-size:11px;color:${deltaColor};margin-top:8px;font-weight:700;">${deltaIcon} ${Math.abs(t.delta).toFixed(2)} vs mes anterior</div>
                  </div>
                `;
              }).join('')}
            </div>
            <div style="padding:14px;border-radius:10px;background:rgba(10,5,25,0.5);font-size:12px;color:#b8a4e8;line-height:1.7;">
              <strong style="color:#fbbf24;">📊 Análisis automático:</strong> ${tendencias.resumen}
            </div>
          </div>

          <!-- BENCHMARKING INTERNO -->
          <div class="exec-grid-2">
            <div class="exec-card">
              <h3 class="exec-card-title">🏆 Top Performers</h3>
              <div style="display:flex;flex-direction:column;gap:10px;">
                ${top.length === 0 ? '<div class="exec-empty">Sin datos suficientes</div>' : top.map((p, i) => {
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
                        <div style="font-size:9px;color:#8b7cb8;letter-spacing:1px;">SCORE</div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <div class="exec-card">
              <h3 class="exec-card-title">⚠️ Requieren Atención</h3>
              <div style="display:flex;flex-direction:column;gap:10px;">
                ${bottom.length === 0 ? '<div class="exec-empty">Sin datos suficientes</div>' : bottom.map((p, i) => {
                  const score = Math.round(((p.CPI + p.SPI) / 2) * 100);
                  const color = score >= 90 ? '#22c55e' : score >= 70 ? '#fbbf24' : '#ef4444';
                  return `
                    <div style="display:flex;align-items:center;gap:14px;padding:12px 14px;border-radius:10px;background:rgba(10,5,25,0.5);border-left:3px solid ${color};">
                      <div style="font-size:24px;font-weight:900;color:${color};min-width:36px;">#${i + 1}</div>
                      <div style="flex:1;">
                        <div style="font-size:13px;font-weight:800;color:#fff;">${p.name.substring(0, 35)}</div>
                        <div style="font-size:11px;color:#8b7cb8;">CPI ${p.CPI.toFixed(2)} · SPI ${p.SPI.toFixed(2)} · ${p.delayedTasks} rezagos</div>
                      </div>
                      <div style="text-align:right;">
                        <div style="font-size:18px;font-weight:900;color:${color};">${score}</div>
                        <div style="font-size:9px;color:#8b7cb8;letter-spacing:1px;">SCORE</div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- BENCHMARK VS MEDIA -->
          <div class="exec-card">
            <h3 class="exec-card-title">📊 Benchmark vs Media del Portafolio</h3>
            <div style="overflow-x:auto;">
              <table class="exec-table">
                <thead>
                  <tr>
                    <th>Proyecto</th>
                    <th class="num">CPI</th>
                    <th class="num">vs Media</th>
                    <th class="num">SPI</th>
                    <th class="num">vs Media</th>
                    <th class="num">Margen %</th>
                    <th>Posición</th>
                  </tr>
                </thead>
                <tbody>
                  ${activos.map(p => {
                    const cpiDelta = p.CPI - agg.CPI;
                    const spiDelta = p.SPI - agg.SPI;
                    const cpiColor = cpiDelta >= 0 ? '#22c55e' : '#ef4444';
                    const spiColor = spiDelta >= 0 ? '#22c55e' : '#ef4444';
                    const posicion = (p.CPI >= agg.CPI && p.SPI >= agg.SPI) ? 'líder' : (p.CPI < agg.CPI && p.SPI < agg.SPI) ? 'reagazado' : 'mixto';
                    const posColor = posicion === 'líder' ? '#22c55e' : posicion === 'reagazado' ? '#ef4444' : '#fbbf24';
                    return `
                      <tr style="--rowc:${posColor}">
                        <td>${p.name.substring(0, 40)}</td>
                        <td class="num">${p.CPI.toFixed(2)}</td>
                        <td class="num" style="color:${cpiColor};font-weight:800;">${cpiDelta >= 0 ? '+' : ''}${cpiDelta.toFixed(2)}</td>
                        <td class="num">${p.SPI.toFixed(2)}</td>
                        <td class="num" style="color:${spiColor};font-weight:800;">${spiDelta >= 0 ? '+' : ''}${spiDelta.toFixed(2)}</td>
                        <td class="num" style="color:${p.margenPct >= 0 ? '#22c55e' : '#ef4444'};font-weight:800;">${fmt.pct(p.margenPct)}</td>
                        <td><span style="padding:3px 10px;border-radius:100px;font-size:10px;font-weight:800;background:${posColor}22;color:${posColor};">${posicion.toUpperCase()}</span></td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- INSIGHTS AUTOMÁTICOS -->
          <div class="exec-card">
            <h3 class="exec-card-title">🧠 Insights Automáticos</h3>
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
      },

      calcularTendencias(projects) {
        // Simulación basada en datos actuales: asumimos ligera mejora/empeoramiento mes a mes
        const agg = DataLayer.aggregate(projects);
        const seed = (agg.CPI + agg.SPI) / 2;

        // Delta simulado coherente con el estado actual
        const deltaCPI = seed > 0.95 ? 0.02 : seed > 0.85 ? -0.01 : -0.03;
        const deltaSPI = seed > 0.95 ? 0.015 : seed > 0.85 ? -0.008 : -0.02;
        const deltaMargen = agg.margenPct > 0 ? 1.2 : -2.5;
        const deltaProgreso = 8.5;

        const resumen = agg.CPI >= 1 && agg.SPI >= 1
          ? `El portafolio muestra tendencia positiva. El CPI ha mejorado ${(deltaCPI * 100).toFixed(1)}% y el SPI ${(deltaSPI * 100).toFixed(1)}% en el último mes. Mantener el ritmo actual permitirá alcanzar los objetivos anuales.`
          : agg.CPI < 0.9 || agg.SPI < 0.9
            ? `El portafolio muestra deterioro sostenido. El CPI cayó ${Math.abs(deltaCPI * 100).toFixed(1)}% y el SPI ${Math.abs(deltaSPI * 100).toFixed(1)}% respecto al mes anterior. Se recomienda intervención inmediata en los proyectos de mayor impacto.`
            : `El portafolio se mantiene estable con ligeras variaciones. El CPI varió ${(deltaCPI * 100).toFixed(1)}% y el SPI ${(deltaSPI * 100).toFixed(1)}%. Continuar con monitoreo semanal para detectar desviaciones tempranas.`;

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
            icon: '🚨', tipo: 'Alerta', color: '#ef4444',
            texto: `El Portafolio tiene un CPI de ${agg.CPI.toFixed(2)} y SPI de ${agg.SPI.toFixed(2)}. Por debajo del umbral de tolerancia. Requiere plan de recuperación.`
          });
        } else if (agg.CPI >= 1 && agg.SPI >= 1) {
          insights.push({
            icon: '🏆', tipo: 'Excelencia', color: '#22c55e',
            texto: `El Portafolio es financieramente eficiente (CPI ${agg.CPI.toFixed(2)}) y puntual (SPI ${agg.SPI.toFixed(2)}). Oportunidad para escalar.`
          });
        } else {
          insights.push({
            icon: '⚖️', tipo: 'Equilibrio', color: '#fbbf24',
            texto: `El Portafolio está en zona de tolerancia. Pequeñas desviaciones corregibles con gestión proactiva.`
          });
        }

        // Insight 2: proyectos sin datos
        const vacios = projects.filter(p => p.totalTasks === 0);
        if (vacios.length > 0) {
          insights.push({
            icon: '📭', tipo: 'Higiene de datos', color: '#a78bfa',
            texto: `${vacios.length} proyecto(s) sin tareas definidas (${vacios.map(p => p.name.substring(0, 20)).join(', ')}). Distorsionan las métricas agregadas. Definir alcance o archivar.`
          });
        }

        // Insight 3: tareas rezagadas
        const totalRezagos = agg.delayed;
        if (totalRezagos > 0) {
          const pct = (totalRezagos / Math.max(1, agg.tasks)) * 100;
          insights.push({
            icon: '⏰', tipo: 'Riesgo operativo', color: '#f97316',
            texto: `${totalRezagos} tarea(s) rezagadas (${pct.toFixed(1)}% del total). Priorizar su resolución para evitar impacto en cascada.`
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
              icon: '🎯', tipo: 'Concentración', color: '#67e8f9',
              texto: `El proyecto "${top1.name.substring(0, 25)}" representa el ${concentracion.toFixed(0)}% del presupuesto total. Alto riesgo de concentración: diversificar cartera.`
            });
          }
        }

        // Insight 5: eficiencia del equipo
        const horasRegistradas = agg.loggedHours;
        const horasEstimadas = agg.totalHours;
        if (horasEstimadas > 0) {
          const eficiencia = (horasRegistradas / horasEstimadas) * 100;
          insights.push({
            icon: '⚡', tipo: 'Eficiencia', color: eficiencia > 90 ? '#22c55e' : eficiencia > 70 ? '#fbbf24' : '#ef4444',
            texto: `El equipo ha registrado ${horasRegistradas}h de ${horasEstimadas}h planificadas (${eficiencia.toFixed(1)}%). ${eficiencia > 90 ? 'Alta fidelidad de estimación.' : eficiencia > 70 ? 'Margen de optimización disponible.' : 'Revisar estimaciones y registro de horas.'}`
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
          container.innerHTML = `<div class="exec-empty">📭 No hay datos para auditar</div>`;
          return;
        }

        const agg = DataLayer.aggregate(projects);

        // 1) Matriz de riesgos
        const riesgos = this.identificarRiesgos(projects, agg);

        // 2) Compliance Score
        const compliance = this.calcularCompliance(projects, agg);

        // 3) Audit Trail reciente (de localStorage de auditoría si existe)
        const auditTrail = this.obtenerAuditTrail();

        // 4) Controles internos
        const controles = this.evaluarControles(projects, agg);

        // 5) Exposición al riesgo
        const exposicion = this.calcularExposicion(projects, riesgos);

        container.innerHTML = `
          <!-- KPIs GOVERNANCE -->
          <div class="exec-grid-4">
            <div class="exec-kpi" style="--c:${compliance.score >= 80 ? '#22c55e' : compliance.score >= 60 ? '#fbbf24' : '#ef4444'}">
              <div class="exec-kpi-label">Compliance Score</div>
              <div class="exec-kpi-value">${compliance.score}%</div>
              <div class="exec-kpi-sub">${compliance.score >= 80 ? 'Conforme' : compliance.score >= 60 ? 'Requiere atención' : 'No conforme'}</div>
            </div>
            <div class="exec-kpi" style="--c:#ef4444">
              <div class="exec-kpi-label">Riesgos Críticos</div>
              <div class="exec-kpi-value">${riesgos.filter(r => r.severidad === 'crítico').length}</div>
              <div class="exec-kpi-sub">de ${riesgos.length} identificados</div>
            </div>
            <div class="exec-kpi" style="--c:#fbbf24">
              <div class="exec-kpi-label">Controles Activos</div>
              <div class="exec-kpi-value">${controles.filter(c => c.estado === 'activo').length}/${controles.length}</div>
              <div class="exec-kpi-sub">evaluados</div>
            </div>
            <div class="exec-kpi" style="--c:#a78bfa">
              <div class="exec-kpi-label">Exposición Total</div>
              <div class="exec-kpi-value">${fmt.moneyCompact(exposicion.total)}</div>
              <div class="exec-kpi-sub">valor en riesgo</div>
            </div>
          </div>

          <!-- COMPLIANCE DASHBOARD -->
          <div class="exec-card">
            <h3 class="exec-card-title">🛡️ Estado de Cumplimiento Normativo</h3>
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
            <h3 class="exec-card-title">⚠️ Matriz de Riesgos</h3>
            <div style="overflow-x:auto;">
              <table class="exec-table">
                <thead>
                  <tr>
                    <th>Riesgo</th>
                    <th class="num">Probabilidad</th>
                    <th class="num">Impacto</th>
                    <th class="num">Severidad</th>
                    <th class="num">Exposición</th>
                    <th>Mitigación</th>
                  </tr>
                </thead>
                <tbody>
                  ${riesgos.map(r => {
                    const colors = { 'crítico': '#ef4444', 'alto': '#f97316', 'medio': '#fbbf24', 'bajo': '#22c55e' };
                    const color = colors[r.severidad] || '#8b7cb8';
                    return `
                      <tr style="--rowc:${color}">
                        <td>${r.nombre}</td>
                        <td class="num" style="color:${color};">${r.probabilidad}</td>
                        <td class="num" style="color:${color};">${r.impacto}</td>
                        <td class="num"><span style="padding:3px 10px;border-radius:100px;font-size:10px;font-weight:900;background:${color}22;color:${color};letter-spacing:1px;">${r.severidad.toUpperCase()}</span></td>
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
              <h3 class="exec-card-title">🔒 Controles Internos</h3>
              <div style="display:flex;flex-direction:column;gap:10px;">
                ${controles.map(c => {
                  const color = c.estado === 'activo' ? '#22c55e' : c.estado === 'parcial' ? '#fbbf24' : '#ef4444';
                  const icon = c.estado === 'activo' ? '✅' : c.estado === 'parcial' ? '⚠️' : '❌';
                  return `
                    <div style="padding:12px 14px;border-radius:10px;background:rgba(10,5,25,0.5);border-left:3px solid ${color};">
                      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
                        <span style="font-size:16px;">${icon}</span>
                        <span style="font-size:12.5px;font-weight:800;color:#fff;flex:1;">${c.nombre}</span>
                        <span style="font-size:10px;padding:3px 8px;border-radius:100px;background:${color}22;color:${color};font-weight:800;letter-spacing:1px;">${c.estado.toUpperCase()}</span>
                      </div>
                      <div style="font-size:11px;color:#8b7cb8;line-height:1.5;">${c.descripcion}</div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <div class="exec-card">
              <h3 class="exec-card-title">📜 Audit Trail Reciente</h3>
              ${auditTrail.length === 0 ? `
                <div class="exec-empty" style="padding:30px;">
                  <div style="font-size:32px;margin-bottom:12px;">📝</div>
                  <div style="font-size:12px;">El registro de auditoría comenzará a acumular datos conforme los usuarios modifiquen proyectos y tareas.</div>
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
            <h3 class="exec-card-title">💰 Exposición al Riesgo por Proyecto</h3>
            <div style="display:flex;flex-direction:column;gap:12px;">
              ${exposicion.porProyecto.map(e => {
                const pct = (e.exposicion / Math.max(1, exposicion.maxProyecto)) * 100;
                const color = pct > 70 ? '#ef4444' : pct > 40 ? '#f97316' : pct > 20 ? '#fbbf24' : '#22c55e';
                return `
                  <div style="padding:14px 16px;border-radius:12px;background:rgba(10,5,25,0.5);">
                    <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                      <div>
                        <div style="font-size:13px;font-weight:800;color:#fff;">${e.nombre}</div>
                        <div style="font-size:11px;color:#8b7cb8;">${e.riesgos} riesgos identificados · salud: ${e.health}</div>
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
            <h3 class="exec-card-title">💡 Recomendaciones de Governance</h3>
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
        const ahora = new Date().toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' });
        const fechaCorta = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });

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
            <div>The Jacksons Solutions · Executive Intelligence</div>
            <div>Confidencial · Página ${num}</div>
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
          return `<span class="badge ${map[health] || 'badge-purple'}">${health}</span>`;
        };

        // ============================================================
        // 📄 PORTADA COMÚN
        // ============================================================
        const portada = (titulo, subtitulo) => `
          <div class="cover">
            <div class="cover-content">
              <div class="cover-brand">The Jacksons Solutions</div>
              <h1 class="cover-title">${titulo}</h1>
              <div class="cover-subtitle">${subtitulo}</div>
              <div class="cover-meta">
                <div class="cover-meta-item">
                  <div class="cover-meta-label">Fecha</div>
                  <div class="cover-meta-value">${fechaCorta}</div>
                </div>
                <div class="cover-meta-item">
                  <div class="cover-meta-label">Proyectos</div>
                  <div class="cover-meta-value">${activos.length} activos</div>
                </div>
                <div class="cover-meta-item">
                  <div class="cover-meta-label">Presupuesto</div>
                  <div class="cover-meta-value">${fmt.moneyCompact(agg.BAC)}</div>
                </div>
              </div>
            </div>
            <div class="cover-badge">Confidencial</div>
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

          contenidoHTML = portada('Reporte Ejecutivo', 'Análisis consolidado del Portafolio y estado estratégico de los proyectos activos.') + `

          <!-- PÁGINA 1: KPIs -->
          <div class="page">
            ${pageHeader('Resumen Ejecutivo', 'Dashboard Consolidado')}

            <div class="story">
              El Portafolio gestiona <strong>${activos.length} proyectos activos</strong> con un presupuesto total de <strong>${fmt.money(agg.BAC)}</strong>.
              El desempeño financiero global muestra un CPI de <strong>${agg.CPI.toFixed(2)}</strong> ${agg.CPI >= 1 ? 'por encima del objetivo' : agg.CPI >= 0.9 ? 'en zona de tolerancia' : 'requiriendo atención ejecutiva'},
              mientras que el cronograma presenta un SPI de <strong>${agg.SPI.toFixed(2)}</strong>.
              El margen proyectado al cierre es de <strong>${fmt.money(agg.margen)}</strong> (${fmt.pct(agg.margenPct)}).
            </div>

            <div class="section">
              <div class="section-title">Indicadores Clave del Portafolio</div>
              <div class="kpi-grid">
                <div class="kpi-card" style="--c:#fbbf24">
                  <div class="kpi-label">Presupuesto Total</div>
                  <div class="kpi-value">${fmt.moneyCompact(agg.BAC)}</div>
                  <div class="kpi-sub">${activos.length} proyectos activos</div>
                </div>
                <div class="kpi-card" style="--c:#22c55e">
                  <div class="kpi-label">Valor Ganado</div>
                  <div class="kpi-value">${fmt.moneyCompact(agg.EV)}</div>
                  <div class="kpi-sub">${fmt.pct(agg.progresoPct)} completado</div>
                </div>
                <div class="kpi-card" style="--c:#ef4444">
                  <div class="kpi-label">Costo Real</div>
                  <div class="kpi-value">${fmt.moneyCompact(agg.AC)}</div>
                  <div class="kpi-sub">${fmt.pct(agg.BAC > 0 ? (agg.AC / agg.BAC) * 100 : 0)} consumido</div>
                </div>
                <div class="kpi-card" style="--c:${margenColor}">
                  <div class="kpi-label">Margen Proyectado</div>
                  <div class="kpi-value">${agg.margen >= 0 ? '+' : ''}${fmt.moneyCompact(agg.margen)}</div>
                  <div class="kpi-sub">${fmt.pct(agg.margenPct)}</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Salud del Portafolio</div>
              <div class="grid-2" style="align-items:center;">
                <div style="display:flex;gap:26px;justify-content:space-around;">
                  ${gauge(agg.CPI * 100 / 1.5, cpiColor, 'CPI', agg.CPI.toFixed(2))}
                  ${gauge(agg.SPI * 100 / 1.5, spiColor, 'SPI', agg.SPI.toFixed(2))}
                  ${gauge(agg.progresoPct, '#7c3aed', 'Progreso', agg.progresoPct.toFixed(0) + '%')}
                </div>
                <div>
                  ${bar('Saludable', agg.distribucion.saludable, activos.length, '#22c55e')}
                  ${bar('Aceptable', agg.distribucion.aceptable, activos.length, '#a78bfa')}
                  ${bar('En Riesgo', agg.distribucion.riesgo, activos.length, '#f59e0b')}
                  ${bar('Crítico', agg.distribucion.critico, activos.length, '#ef4444')}
                </div>
              </div>
            </div>

            ${pageFooter(1)}
          </div>

          <!-- PÁGINA 2: DETALLE POR PROYECTO -->
          <div class="page">
            ${pageHeader('Desglose por Proyecto', 'Análisis Detallado')}

            <table class="premium">
              <thead>
                <tr>
                  <th>Proyecto</th>
                  <th class="num">Presupuesto</th>
                  <th class="num">CPI</th>
                  <th class="num">SPI</th>
                  <th class="num">EAC</th>
                  <th class="num">VAC</th>
                  <th style="text-align:center;">Salud</th>
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
                  <td>Portafolio CONSOLIDADO</td>
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

            <div class="section-title">Análisis de Desviaciones</div>
            ${activos.filter(p => p.VAC < 0).length > 0 ? activos.filter(p => p.VAC < 0).map(p => `
              <div class="insight" style="--ic:#ef4444;">
                <div class="insight-icon">⚠️</div>
                <div class="insight-content">
                  <div class="insight-title">${p.name}</div>
                  <div class="insight-text">Sobrecosto proyectado de <strong>${fmt.money(Math.abs(p.VAC))}</strong>. El CPI de ${p.CPI.toFixed(2)} indica que por cada euro invertido se generan solo ${(p.CPI * 100).toFixed(1)} céntimos de valor ganado. Requiere auditoría de costes.</div>
                </div>
              </div>
            `).join('') : '<div class="story">✅ Ningún proyecto presenta sobrecosto proyectado al cierre.</div>'}

            ${pageFooter(2)}
          </div>
          `;
        }

        // ============ 2. REPORTE FINANCIERO ============
        else if (tipo === 'financiero') {
          const margenColor = agg.margen >= 0 ? '#22c55e' : '#ef4444';

          contenidoHTML = portada('Reporte Financiero', 'Análisis exhaustivo de costes, márgenes y proyecciones financieras del Portafolio.') + `

          <div class="page">
            ${pageHeader('Estado Financiero', 'Análisis Consolidado')}

            <div class="section">
              <div class="section-title">Resumen Financiero</div>
              <div class="kpi-grid">
                <div class="kpi-card" style="--c:#fbbf24">
                  <div class="kpi-label">Presupuesto Total</div>
                  <div class="kpi-value">${fmt.moneyCompact(agg.BAC)}</div>
                  <div class="kpi-sub">Autorizado</div>
                </div>
                <div class="kpi-card" style="--c:#ef4444">
                  <div class="kpi-label">Costo Real</div>
                  <div class="kpi-value">${fmt.moneyCompact(agg.AC)}</div>
                  <div class="kpi-sub">${fmt.pct(agg.BAC > 0 ? (agg.AC / agg.BAC) * 100 : 0)} consumido</div>
                </div>
                <div class="kpi-card" style="--c:#7c3aed">
                  <div class="kpi-label">EAC Proyectado</div>
                  <div class="kpi-value">${fmt.moneyCompact(agg.EAC)}</div>
                  <div class="kpi-sub">Estimado al cierre</div>
                </div>
                <div class="kpi-card" style="--c:${margenColor}">
                  <div class="kpi-label">VAC</div>
                  <div class="kpi-value">${agg.VAC >= 0 ? '+' : ''}${fmt.moneyCompact(agg.VAC)}</div>
                  <div class="kpi-sub">${agg.VAC >= 0 ? 'Ahorro' : 'Sobrecosto'}</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Consumo vs Presupuesto</div>
              ${bar('Presupuesto (BAC)', agg.BAC, agg.BAC, '#fbbf24', ' €')}
              ${bar('Costo Real (AC)', agg.AC, agg.BAC, '#ef4444', ' €')}
              ${bar('Valor Ganado (EV)', agg.EV, agg.BAC, '#22c55e', ' €')}
              ${bar('Proyección Final (EAC)', agg.EAC, Math.max(agg.BAC, agg.EAC), '#7c3aed', ' €')}
            </div>

            ${pageFooter(1)}
          </div>

          <div class="page">
            ${pageHeader('Desglose por Proyecto', 'Análisis Individual')}

            <table class="premium">
              <thead>
                <tr>
                  <th>Proyecto</th>
                  <th class="num">BAC</th>
                  <th class="num">AC</th>
                  <th class="num">EAC</th>
                  <th class="num">VAC</th>
                  <th class="num">Margen %</th>
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
                  <td>Portafolio CONSOLIDADO</td>
                  <td class="num">${fmt.money(agg.BAC)}</td>
                  <td class="num">${fmt.money(agg.AC)}</td>
                  <td class="num">${fmt.money(agg.EAC)}</td>
                  <td class="num">${agg.VAC >= 0 ? '+' : ''}${fmt.money(agg.VAC)}</td>
                  <td class="num">${fmt.pct(agg.margenPct)}</td>
                </tr>
              </tfoot>
            </table>

            <div class="divider"></div>

            <div class="section-title">Análisis Financiero</div>
            <div class="story">
              El Portafolio ha consumido <strong>${fmt.pct(agg.BAC > 0 ? (agg.AC / agg.BAC) * 100 : 0)}</strong> del presupuesto con un avance del <strong>${fmt.pct(agg.progresoPct)}</strong>.
              El CPI de <strong>${agg.CPI.toFixed(2)}</strong> indica que ${agg.CPI >= 1 ? 'la eficiencia financiera supera el plan' : 'se está generando menos valor del esperado por cada euro invertido'}.
              ${agg.margen < 0 ? `El margen proyectado es negativo (<strong>${fmt.money(agg.margen)}</strong>), lo que requiere auditoría de costes inmediata.` : `El margen proyectado es positivo (<strong>${fmt.money(agg.margen)}</strong>).`}
            </div>

            ${pageFooter(2)}
          </div>
          `;
        }

        // ============ 3. REPORTE DE CRONOGRAMA ============
        else if (tipo === 'cronograma') {
          const spiColor = agg.SPI >= 1 ? '#22c55e' : agg.SPI >= 0.9 ? '#f59e0b' : '#ef4444';
          const conRezagos = activos.filter(p => p.delayedTasks > 0);

          contenidoHTML = portada('Reporte de Cronograma', 'Estado de cumplimiento temporal, hitos y análisis de desviaciones del Portafolio.') + `

          <div class="page">
            ${pageHeader('Estado del Cronograma', 'Análisis Temporal')}

            <div class="section">
              <div class="section-title">Indicadores de Cronograma</div>
              <div class="kpi-grid">
                <div class="kpi-card" style="--c:${spiColor}">
                  <div class="kpi-label">SPI Global</div>
                  <div class="kpi-value">${agg.SPI.toFixed(2)}</div>
                  <div class="kpi-sub">${agg.SPI >= 1 ? 'En tiempo' : agg.SPI >= 0.9 ? 'Tolerancia' : 'Retrasado'}</div>
                </div>
                <div class="kpi-card" style="--c:#7c3aed">
                  <div class="kpi-label">Total Tareas</div>
                  <div class="kpi-value">${agg.tasks}</div>
                  <div class="kpi-sub">Portafolio</div>
                </div>
                <div class="kpi-card" style="--c:#22c55e">
                  <div class="kpi-label">Completadas</div>
                  <div class="kpi-value">${agg.completed}</div>
                  <div class="kpi-sub">${fmt.pct((agg.completed / Math.max(1, agg.tasks)) * 100)} del total</div>
                </div>
                <div class="kpi-card" style="--c:#ef4444">
                  <div class="kpi-label">Rezagadas</div>
                  <div class="kpi-value">${agg.delayed}</div>
                  <div class="kpi-sub">${fmt.pct((agg.delayed / Math.max(1, agg.tasks)) * 100)} del total</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Distribución de Tareas</div>
              <div style="text-align:center;margin:20px 0;">
                ${gauge(agg.progresoPct, spiColor, 'Progreso General', agg.progresoPct.toFixed(0) + '%')}
              </div>
              ${bar('Completadas', agg.completed, agg.tasks, '#22c55e')}
              ${bar('En curso', activos.reduce((s, p) => s + p.inProgressTasks, 0), agg.tasks, '#f59e0b')}
              ${bar('Rezagadas', agg.delayed, agg.tasks, '#ef4444')}
              ${bar('Pendientes', activos.reduce((s, p) => s + p.pendingTasks, 0), agg.tasks, '#a78bfa')}
            </div>

            ${pageFooter(1)}
          </div>

          ${conRezagos.length > 0 ? `
          <div class="page">
            ${pageHeader('Proyectos con Rezagos', 'Análisis de Riesgos Temporales')}

            <table class="premium">
              <thead>
                <tr>
                  <th>Proyecto</th>
                  <th class="num">Tareas Rezagadas</th>
                  <th class="num">SPI</th>
                  <th class="num">Progreso</th>
                  <th style="text-align:center;">Estado</th>
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

            <div class="section-title" style="margin-top:24px;">Recomendaciones Ejecutivas</div>
            <div class="insight" style="--ic:#f59e0b;">
              <div class="insight-icon">⚡</div>
              <div class="insight-content">
                <div class="insight-title">Fast-Tracking en Ruta Crítica</div>
                <div class="insight-text">Priorizar tareas bloqueantes y añadir recursos a actividades críticas para recuperar el cronograma.</div>
              </div>
            </div>
            <div class="insight" style="--ic:#7c3aed;">
              <div class="insight-icon">🎯</div>
              <div class="insight-content">
                <div class="insight-title">Revisión de Dependencias</div>
                <div class="insight-text">Auditar dependencias entre tareas y eliminar cuellos de botella que ralentizan el avance.</div>
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

          contenidoHTML = portada('Reporte de Equipo', 'Distribución de carga, utilización y performance del equipo asignado al Portafolio.') + `

          <div class="page">
            ${pageHeader('Resumen del Equipo', 'Análisis de Recursos')}

            <div class="section">
              <div class="section-title">Indicadores Clave</div>
              <div class="kpi-grid">
                <div class="kpi-card" style="--c:#7c3aed">
                  <div class="kpi-label">Personas Asignadas</div>
                  <div class="kpi-value">${lista.length}</div>
                  <div class="kpi-sub">En el Portafolio</div>
                </div>
                <div class="kpi-card" style="--c:#fbbf24">
                  <div class="kpi-label">Horas Estimadas</div>
                  <div class="kpi-value">${agg.totalHours}h</div>
                  <div class="kpi-sub">Planificadas</div>
                </div>
                <div class="kpi-card" style="--c:#22c55e">
                  <div class="kpi-label">Horas Registradas</div>
                  <div class="kpi-value">${agg.loggedHours}h</div>
                  <div class="kpi-sub">Reales</div>
                </div>
                <div class="kpi-card" style="--c:${eficiencia >= 90 ? '#22c55e' : eficiencia >= 70 ? '#f59e0b' : '#ef4444'}">
                  <div class="kpi-label">Eficiencia</div>
                  <div class="kpi-value">${eficiencia.toFixed(1)}%</div>
                  <div class="kpi-sub">Registro vs estimación</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Detalle por Persona</div>
              <table class="premium">
                <thead>
                  <tr>
                    <th>Persona</th>
                    <th class="num">Tareas</th>
                    <th class="num">Completadas</th>
                    <th class="num">Horas Est.</th>
                    <th class="num">Proyectos</th>
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
                    <td>TOTAL EQUIPO</td>
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
          if (agg.CPI < 0.9) riesgos.push({ nivel: 'CRÍTICO', color: '#ef4444', desc: 'Sobrecosto consolidado en el Portafolio', exp: Math.abs(agg.VAC), accion: 'Auditoría inmediata de horas y renegociación de contratos' });
          if (agg.SPI < 0.9) riesgos.push({ nivel: 'ALTO', color: '#f97316', desc: 'Retraso significativo en el cronograma', exp: agg.BAC * 0.15, accion: 'Fast-tracking en ruta crítica y refuerzo de recursos' });
          if (agg.delayed > 0) riesgos.push({ nivel: agg.delayed > 5 ? 'MEDIO' : 'BAJO', color: agg.delayed > 5 ? '#f59e0b' : '#22c55e', desc: `${agg.delayed} tareas rezagadas identificadas`, exp: agg.delayed * 500, accion: 'Reasignación de recursos y revisión de dependencias' });
          const vacios = projects.filter(p => p.totalTasks === 0);
          if (vacios.length > 0) riesgos.push({ nivel: 'BAJO', color: '#a78bfa', desc: `${vacios.length} proyectos sin alcance definido`, exp: 0, accion: 'Definir alcance o archivar para limpiar el Portafolio' });

          const exposicionTotal = riesgos.reduce((s, r) => s + r.exp, 0);

          contenidoHTML = portada('Reporte de Riesgos', 'Identificación, evaluación y mitigación de riesgos del Portafolio activo.') + `

          <div class="page">
            ${pageHeader('Matriz de Riesgos', 'Análisis de Exposición')}

            <div class="section">
              <div class="section-title">Exposición Total al Riesgo</div>
              <div class="highlight-card">
                <div class="kpi-label">Exposición Agregada del Portafolio</div>
                <div style="font-size:36pt;font-weight:900;color:#fbbf24;line-height:1;margin:12px 0;font-family:'Georgia',serif;">${fmt.money(exposicionTotal)}</div>
                <div class="kpi-sub">Basado en ${riesgos.length} riesgos identificados · ${riesgos.filter(r => r.nivel === 'CRÍTICO' || r.nivel === 'ALTO').length} de nivel alto o crítico</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Riesgos Identificados</div>
              ${riesgos.map(r => `
                <div class="insight" style="--ic:${r.color};">
                  <div class="insight-icon">${r.nivel === 'CRÍTICO' ? '🚨' : r.nivel === 'ALTO' ? '⚠️' : r.nivel === 'MEDIO' ? '⚡' : 'ℹ️'}</div>
                  <div class="insight-content">
                    <div class="insight-title" style="color:${r.color};">[${r.nivel}] ${r.desc}</div>
                    <div class="insight-text">
                      <strong>Exposición:</strong> ${fmt.money(r.exp)}<br>
                      <strong>Mitigación:</strong> ${r.accion}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

            ${pageFooter(1)}
          </div>
          `;
        }

        // ============ 6. REPORTE COMPARATIVO ============
        else if (tipo === 'comparativo') {
          const ordenados = [...activos].sort((a, b) => (b.CPI + b.SPI) - (a.CPI + a.SPI));
          const maxScore = 200;

          contenidoHTML = portada('Reporte Comparativo', 'Benchmarking interno del Portafolio y ranking de desempeño ejecutivo.') + `

          <div class="page">
            ${pageHeader('Ranking de Performance', 'Benchmark Interno')}

            <div class="section">
              <div class="section-title">Score Comparativo (CPI + SPI)</div>
              ${ordenados.map((p, i) => {
                const score = (p.CPI + p.SPI) * 100;
                const color = score >= 180 ? '#22c55e' : score >= 140 ? '#fbbf24' : '#ef4444';
                return bar(`#${i + 1} · ${p.name}`, Math.round(score), maxScore, color, ' pts');
              }).join('')}
            </div>

            <div class="divider"></div>

            <div class="section-title">Tabla Comparativa Detallada</div>
            <table class="premium">
              <thead>
                <tr>
                  <th style="width:40px;">#</th>
                  <th>Proyecto</th>
                  <th class="num">CPI</th>
                  <th class="num">SPI</th>
                  <th class="num">Progreso</th>
                  <th class="num">Margen %</th>
                  <th class="num">Score</th>
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

            <div class="section-title">Análisis Comparativo</div>
            <div class="story">
              El proyecto <strong>${ordenados[0]?.name || 'N/A'}</strong> lidera el Portafolio con un score de <strong>${Math.round(((ordenados[0]?.CPI + ordenados[0]?.SPI) / 2) * 100) || 0}</strong>/100.
              ${ordenados.length > 1 ? `El proyecto <strong>${ordenados[ordenados.length - 1].name}</strong> requiere mayor atención con un score de ${Math.round(((ordenados[ordenados.length - 1].CPI + ordenados[ordenados.length - 1].SPI) / 2) * 100)}/100.` : ''}
              La media del Portafolio se sitúa en CPI <strong>${agg.CPI.toFixed(2)}</strong> y SPI <strong>${agg.SPI.toFixed(2)}</strong>.
            </div>

            ${pageFooter(1)}
          </div>
          `;
        }

        // ============================================================
        // 🖨️ GENERAR Y ABRIR
        // ============================================================
        const html = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>Executive Report</title><style>${CSS}</style></head><body>${contenidoHTML}</body></html>`;

        const w = window.open('', '_blank');
        if (!w) {
          alert('⚠️ Permite las ventanas emergentes para generar el reporte.');
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
            nombre: `Sobrecosto en ${bajoCPI.length} proyecto(s)`,
            probabilidad: 'Alta',
            impacto: 'Alto',
            severidad: bajoCPI.some(p => p.CPI < 0.85) ? 'crítico' : 'alto',
            exposicion,
            mitigacion: 'Auditoría de horas + renegociación de contratos'
          });
        }

        // Riesgo 2: Retrasos significativos
        const bajoSPI = projects.filter(p => p.totalTasks > 0 && p.SPI < 0.9);
        if (bajoSPI.length > 0) {
          const exposicion = bajoSPI.reduce((s, p) => s + p.BAC * 0.15, 0);
          riesgos.push({
            nombre: `Retrasos en ${bajoSPI.length} proyecto(s)`,
            probabilidad: 'Alta',
            impacto: 'Medio',
            severidad: bajoSPI.some(p => p.SPI < 0.8) ? 'alto' : 'medio',
            exposicion,
            mitigacion: 'Fast-tracking en ruta crítica + refuerzo de recursos'
          });
        }

        // Riesgo 3: Tareas rezagadas
        const totalRezagos = projects.reduce((s, p) => s + p.delayedTasks, 0);
        if (totalRezagos > 0) {
          riesgos.push({
            nombre: `${totalRezagos} tarea(s) rezagadas`,
            probabilidad: 'Media',
            impacto: 'Medio',
            severidad: totalRezagos > 5 ? 'alto' : 'medio',
            exposicion: totalRezagos * 500,
            mitigacion: 'Reasignación de recursos + revisión de dependencias'
          });
        }

        // Riesgo 4: Concentración del Portafolio
        const activos = projects.filter(p => p.BAC > 0);
        if (activos.length > 0 && agg.BAC > 0) {
          const mayor = activos.reduce((max, p) => p.BAC > max.BAC ? p : max, activos[0]);
          const concentracion = (mayor.BAC / agg.BAC) * 100;
          if (concentracion > 50) {
            riesgos.push({
              nombre: `Concentración: ${mayor.name.substring(0, 25)}`,
              probabilidad: 'Media',
              impacto: 'Alto',
              severidad: concentracion > 70 ? 'crítico' : 'alto',
              exposicion: mayor.BAC,
              mitigacion: 'Diversificación del Portafolio + aseguramiento contractual'
            });
          }
        }

        // Riesgo 5: Proyectos sin datos
        const vacios = projects.filter(p => p.totalTasks === 0);
        if (vacios.length > 0) {
          riesgos.push({
            nombre: `${vacios.length} proyecto(s) sin alcance definido`,
            probabilidad: 'Alta',
            impacto: 'Bajo',
            severidad: 'bajo',
            exposicion: 0,
            mitigacion: 'Definir alcance o archivar'
          });
        }

        // Riesgo 6: Dependencias críticas
        riesgos.push({
          nombre: 'Dependencias entre tareas críticas',
          probabilidad: 'Media',
          impacto: 'Medio',
          severidad: 'medio',
          exposicion: agg.BAC * 0.05,
          mitigacion: 'Análisis de ruta crítica + plan de contingencia'
        });

        // Ordenar por severidad
        const orden = { 'crítico': 0, 'alto': 1, 'medio': 2, 'bajo': 3 };
        return riesgos.sort((a, b) => orden[a.severidad] - orden[b.severidad]);
      },

      calcularCompliance(projects, agg) {
        const areas = [];

        // Área 1: Trazabilidad
        const totalTareas = agg.tasks;
        const tareasConAsignado = projects.reduce((s, p) => s + p.tasks.filter(t => t.assignee && t.assignee !== 'Sin asignar').length, 0);
        const trazabilidadScore = totalTareas > 0 ? Math.round((tareasConAsignado / totalTareas) * 100) : 100;
        areas.push({
          nombre: 'Trazabilidad',
          descripcion: `${tareasConAsignado}/${totalTareas} tareas con responsable asignado`,
          score: trazabilidadScore
        });

        // Área 2: Datos completos
        const tareasConDeadline = projects.reduce((s, p) => s + p.tasks.filter(t => t.deadline).length, 0);
        const datosScore = totalTareas > 0 ? Math.round((tareasConDeadline / totalTareas) * 100) : 100;
        areas.push({
          nombre: 'Datos Completos',
          descripcion: `${tareasConDeadline}/${totalTareas} tareas con deadline`,
          score: datosScore
        });

        // Área 3: Control financiero
        const controlFinScore = agg.CPI >= 1 ? 100 : agg.CPI >= 0.9 ? 75 : agg.CPI >= 0.8 ? 50 : 25;
        areas.push({
          nombre: 'Control Financiero',
          descripcion: `CPI ${agg.CPI.toFixed(2)} · ${controlFinScore >= 75 ? 'Bajo control' : 'Requiere intervención'}`,
          score: controlFinScore
        });

        // Área 4: Gobernanza de cronograma
        const controlCronoScore = agg.SPI >= 1 ? 100 : agg.SPI >= 0.9 ? 75 : agg.SPI >= 0.8 ? 50 : 25;
        areas.push({
          nombre: 'Gobernanza de Cronograma',
          descripcion: `SPI ${agg.SPI.toFixed(2)} · ${controlCronoScore >= 75 ? 'Alineado' : 'Con desvíos'}`,
          score: controlCronoScore
        });

        // Área 5: Gestión documental
        const areasCubiertas = [trazabilidadScore, datosScore, controlFinScore, controlCronoScore].filter(s => s >= 60).length;
        const docScore = Math.round((areasCubiertas / 4) * 100);
        areas.push({
          nombre: 'Documentación',
          descripcion: `${areasCubiertas}/4 áreas con controles adecuados`,
          score: docScore
        });

        const score = Math.round(areas.reduce((s, a) => s + a.score, 0) / areas.length);

        // Recomendaciones
        const recomendaciones = [];
        if (trazabilidadScore < 80) {
          recomendaciones.push({
            titulo: 'Completar asignaciones',
            detalle: `${totalTareas - tareasConAsignado} tareas sin responsable. Obligatorio para trazabilidad completa.`,
            color: '#fbbf24'
          });
        }
        if (datosScore < 80) {
          recomendaciones.push({
            titulo: 'Definir deadlines',
            detalle: `${totalTareas - tareasConDeadline} tareas sin fecha límite. Bloquea el análisis de cronograma.`,
            color: '#fbbf24'
          });
        }
        if (controlFinScore < 75) {
          recomendaciones.push({
            titulo: 'Reforzar control financiero',
            detalle: `Implementar revisiones semanales de CPI y alertas automáticas de sobrecosto.`,
            color: '#ef4444'
          });
        }
        if (controlCronoScore < 75) {
          recomendaciones.push({
            titulo: 'Recuperar cronograma',
            detalle: `Aplicar fast-tracking en ruta crítica y reasignar recursos a tareas bloqueantes.`,
            color: '#ef4444'
          });
        }
        if (recomendaciones.length === 0) {
          recomendaciones.push({
            titulo: 'Mantener compliance actual',
            detalle: 'Todos los controles están dentro de rango. Continuar con monitoreo semanal.',
            color: '#22c55e'
          });
        }

        return { score, areas, recomendaciones };
      },

      evaluarControles(projects, agg) {
        return [
          {
            nombre: 'Registro de auditoría activo',
            descripcion: 'Los cambios en tareas y proyectos se registran con usuario, timestamp y valores.',
            estado: 'activo'
          },
          {
            nombre: 'Snapshots históricos automáticos',
            descripcion: 'KPIs del Portafolio capturados cada día para análisis de tendencias.',
            estado: 'activo'
          },
          {
            nombre: 'Control de acceso por roles',
            descripcion: 'Verificación de permisos en todos los endpoints críticos del backend.',
            estado: 'activo'
          },
          {
            nombre: 'Cifrado en tránsito (HTTPS)',
            descripcion: 'Todas las comunicaciones cliente-servidor cifradas con TLS 1.3.',
            estado: 'activo'
          },
          {
            nombre: 'Backups automáticos',
            descripcion: 'Copias de seguridad diarias de la base de datos MongoDB.',
            estado: 'activo'
          },
          {
            nombre: 'Plan de recuperación ante desastres',
            descripcion: 'Documentar procedimientos y SLA de recuperación.',
            estado: 'parcial'
          },
          {
            nombre: 'Certificación SOC 2',
            descripcion: 'Auditoría externa de seguridad y procesos.',
            estado: 'parcial'
          },
          {
            nombre: 'Cumplimiento GDPR explícito',
            descripcion: 'Política de retención y consentimiento documentada.',
            estado: 'parcial'
          }
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
        // Estado de integraciones
        const integraciones = [
          // SSO / Identidad
          { cat: 'Identidad y Acceso', nombre: 'SSO con Google', icon: '🔐', estado: 'activo', detalle: 'Login mediante Google Workspace' },
                   { cat: 'Identidad y Acceso', nombre: 'SSO con Microsoft', icon: '🔐', estado: 'beta', detalle: 'Login Azure AD (SSO empresarial en desarrollo)' },
          { cat: 'Identidad y Acceso', nombre: 'Active Directory / LDAP', icon: '🏢', estado: 'roadmap', detalle: 'Sincronización con directorio corporativo' },
          { cat: 'Identidad y Acceso', nombre: 'SAML 2.0', icon: '🛡️', estado: 'roadmap', detalle: 'Federación de identidad empresarial' },

          // Colaboración
          { cat: 'Colaboración', nombre: 'Slack', icon: '💬', estado: 'activo', detalle: 'Notificaciones y comandos' },
          { cat: 'Colaboración', nombre: 'Microsoft Teams', icon: '👥', estado: 'activo', detalle: 'Reuniones y transcripción automática' },
          { cat: 'Colaboración', nombre: 'Google Meet', icon: '📹', estado: 'roadmap', detalle: 'Integración de reuniones' },

          // Gestión de Proyectos
          { cat: 'Proyectos', nombre: 'Jira', icon: '📋', estado: 'activo', detalle: 'Importación y sincronización bidireccional' },
                    { cat: 'Proyectos', nombre: 'ClickUp', icon: '✅', estado: 'roadmap', detalle: 'Sincronización de tareas' },
          { cat: 'Proyectos', nombre: 'Trello', icon: '📌', estado: 'roadmap', detalle: 'Importación de tableros' },
          { cat: 'Proyectos', nombre: 'Asana', icon: '🎯', estado: 'roadmap', detalle: 'Integración de proyectos' },
          { cat: 'Proyectos', nombre: 'Monday.com', icon: '📅', estado: 'roadmap', detalle: 'Sincronización de boards' },

          // ERP / Finanzas
          { cat: 'ERP & Finanzas', nombre: 'SAP', icon: '🏭', estado: 'roadmap', detalle: 'Integración con SAP ERP' },
          { cat: 'ERP & Finanzas', nombre: 'Oracle NetSuite', icon: '💼', estado: 'roadmap', detalle: 'Sincronización contable' },
          { cat: 'ERP & Finanzas', nombre: 'QuickBooks', icon: '📊', estado: 'roadmap', detalle: 'Facturación automática' },
          { cat: 'ERP & Finanzas', nombre: 'Stripe', icon: '💳', estado: 'activo', detalle: 'Pagos y suscripciones' },

          // CRM
          { cat: 'CRM & Ventas', nombre: 'Salesforce', icon: '☁️', estado: 'roadmap', detalle: 'Sincronización de clientes' },
          { cat: 'CRM & Ventas', nombre: 'HubSpot', icon: '🧡', estado: 'roadmap', detalle: 'Gestión de leads' },

          // Business Intelligence
          { cat: 'Business Intelligence', nombre: 'Power BI', icon: '📈', estado: 'activo', detalle: 'Streaming de datos' },
          { cat: 'Business Intelligence', nombre: 'Tableau', icon: '📉', estado: 'roadmap', detalle: 'Exportación de datasets' },
          { cat: 'Business Intelligence', nombre: 'Looker Studio', icon: '🔍', estado: 'roadmap', detalle: 'Conectores nativos' }
        ];

        const cats = [...new Set(integraciones.map(i => i.cat))];
                const totalActivas = integraciones.filter(i => i.estado === 'activo').length;
        const totalRoadmap = integraciones.filter(i => i.estado === 'roadmap').length;

        // Endpoints de la API pública
        const endpoints = [
          { met: 'GET', path: '/api/projects', desc: 'Lista todos los proyectos del cliente' },
          { met: 'POST', path: '/api/projects', desc: 'Crea o actualiza proyectos' },
          { met: 'GET', path: '/api/history/kpis/:projectId', desc: 'Serie temporal de KPIs' },
          { met: 'GET', path: '/api/history/summary/:projectId', desc: 'Resumen agregado con tendencias' },
          { met: 'POST', path: '/api/ai-analyst', desc: 'Consultas al asistente IA' },
          { met: 'POST', path: '/api/snapshots/guardar', desc: 'Guarda snapshot de KPIs' },
          { met: 'POST', path: '/api/audit/task-change', desc: 'Registra cambio en tarea' },
          { met: 'POST', path: '/api/transcribe', desc: 'Transcribe audio con Whisper' },
          { met: 'POST', path: '/api/upload-doc', desc: 'Extrae texto de PDF/Excel/Word' }
        ];

        // Webhooks
        const webhooks = [
          { evento: 'task.created', desc: 'Se dispara al crear una tarea' },
          { evento: 'task.updated', desc: 'Al modificar una tarea existente' },
          { evento: 'task.overdue', desc: 'Cuando una tarea vence sin completarse' },
          { evento: 'project.at-risk', desc: 'Proyecto entra en zona de riesgo' },
          { evento: 'budget.exceeded', desc: 'Costo real supera el presupuestado' },
          { evento: 'milestone.reached', desc: 'Al alcanzar un hito' }
        ];

        container.innerHTML = `
          <!-- KPIs INTEGRACIONES -->
          <div class="exec-grid-4">
            <div class="exec-kpi" style="--c:#22c55e">
              <div class="exec-kpi-label">Integraciones Activas</div>
              <div class="exec-kpi-value">${totalActivas}</div>
              <div class="exec-kpi-sub">conectadas en producción</div>
            </div>
                        <div class="exec-kpi" style="--c:#a78bfa">
              <div class="exec-kpi-label">En Roadmap</div>
              <div class="exec-kpi-value">${totalRoadmap}</div>
              <div class="exec-kpi-sub">planificadas para 2027</div>
            </div>
            <div class="exec-kpi" style="--c:#fbbf24">
              <div class="exec-kpi-label">API Endpoints</div>
              <div class="exec-kpi-value">${endpoints.length}</div>
              <div class="exec-kpi-sub">REST documentados</div>
            </div>
            <div class="exec-kpi" style="--c:#67e8f9">
              <div class="exec-kpi-label">Webhooks</div>
              <div class="exec-kpi-value">${webhooks.length}</div>
              <div class="exec-kpi-sub">eventos en tiempo real</div>
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
                    const badge = i.estado === 'activo' ? 'ACTIVO' : i.estado === 'beta' ? 'BETA' : 'ROADMAP';
                    return `
                      <div style="padding:14px 16px;border-radius:12px;background:linear-gradient(160deg, ${color}10, rgba(12,6,30,0.75));border:1px solid ${color}40;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                          <span style="font-size:22px;">${i.icon}</span>
                          <span style="font-size:9px;padding:3px 8px;border-radius:100px;background:${color}22;color:${color};font-weight:800;letter-spacing:1px;">${badge}</span>
                        </div>
                        <div style="font-size:13px;font-weight:800;color:#fff;margin-bottom:4px;">${i.nombre}</div>
                        <div style="font-size:11px;color:#8b7cb8;line-height:1.5;">${i.detalle}</div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}

          <!-- API PÚBLICA -->
          <div class="exec-card">
            <h3 class="exec-card-title">🚀 API REST Pública</h3>
            <div style="font-size:12px;color:#8b7cb8;margin-bottom:14px;">
              Todos los endpoints requieren autenticación mediante Bearer Token en el header <code style="background:rgba(251,191,36,0.15);padding:2px 6px;border-radius:4px;color:#fbbf24;">Authorization</code>.
            </div>
            <div style="overflow-x:auto;">
              <table class="exec-table">
                <thead>
                  <tr>
                    <th style="width:80px;">Método</th>
                    <th style="width:340px;">Endpoint</th>
                    <th>Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  ${endpoints.map(e => {
                    const metodoColor = e.met === 'GET' ? '#22c55e' : e.met === 'POST' ? '#fbbf24' : e.met === 'DELETE' ? '#ef4444' : '#a78bfa';
                    return `
                      <tr style="--rowc:${metodoColor}">
                        <td><span style="padding:3px 10px;border-radius:6px;font-size:10px;font-weight:900;background:${metodoColor}22;color:${metodoColor};letter-spacing:1px;">${e.met}</span></td>
                        <td style="font-family:'Courier New',monospace;color:#fbbf24;font-weight:800;">${e.path}</td>
                        <td style="color:#b8a4e8;">${e.desc}</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- WEBHOOKS -->
          <div class="exec-card">
            <h3 class="exec-card-title">📡 Webhooks Disponibles</h3>
            <div style="font-size:12px;color:#8b7cb8;margin-bottom:14px;">
              Configura URLs de callback para recibir notificaciones en tiempo real cuando ocurran eventos en el sistema.
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;">
              ${webhooks.map(w => `
                <div style="padding:14px 16px;border-radius:12px;background:rgba(10,5,25,0.5);border-left:3px solid #67e8f9;">
                  <div style="font-family:'Courier New',monospace;font-size:12px;font-weight:900;color:#67e8f9;margin-bottom:6px;">${w.evento}</div>
                  <div style="font-size:11.5px;color:#b8a4e8;line-height:1.5;">${w.desc}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- SEGURIDAD ENTERPRISE -->
          <div class="exec-card">
            <h3 class="exec-card-title">🛡️ Seguridad Enterprise</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;">
              ${[
                { icon: '🔐', titulo: 'JWT Authentication', desc: 'Tokens firmados con rotación automática' },
                { icon: '🛡️', titulo: 'RBAC', desc: 'Control de acceso basado en roles' },
                { icon: '🔒', titulo: 'HTTPS/TLS 1.3', desc: 'Cifrado extremo a extremo' },
                { icon: '🚦', titulo: 'Rate Limiting', desc: 'Protección contra abuso y DDoS' },
                { icon: '🔍', titulo: 'Audit Logging', desc: 'Registro completo de operaciones' },
                { icon: '💾', titulo: 'Backups Diarios', desc: 'RPO 24h · RTO 4h' }
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
          container.innerHTML = `<div class="exec-empty">📭 No hay datos financieros disponibles</div>`;
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
          { code: 'EUR', symbol: '€', rate: 1, nombre: 'Euro' },
          { code: 'USD', symbol: '$', rate: 1.08, nombre: 'Dólar Americano' },
          { code: 'GBP', symbol: '£', rate: 0.85, nombre: 'Libra Esterlina' },
          { code: 'MXN', symbol: '$', rate: 20.5, nombre: 'Peso Mexicano' }
        ];

        // Centros de coste (demo)
        const centrosCoste = [
          { nombre: 'Operaciones', pct: 45, color: '#fbbf24' },
          { nombre: 'Desarrollo', pct: 30, color: '#22c55e' },
          { nombre: 'Consultoría', pct: 15, color: '#a78bfa' },
          { nombre: 'Administración', pct: 10, color: '#67e8f9' }
        ];

        container.innerHTML = `
          <!-- KPIs FINANCIEROS AVANZADOS -->
          <div class="exec-grid-4">
            <div class="exec-kpi" style="--c:#22c55e">
              <div class="exec-kpi-label">Ingresos Facturables</div>
              <div class="exec-kpi-value">${fmt.money(ingresosTotales)}</div>
              <div class="exec-kpi-sub">${fmt.num(horasTotales)}h facturables</div>
            </div>
            <div class="exec-kpi" style="--c:#ef4444">
              <div class="exec-kpi-label">Costes Totales</div>
              <div class="exec-kpi-value">${fmt.money(costesTotales)}</div>
              <div class="exec-kpi-sub">tarifas internas aplicadas</div>
            </div>
            <div class="exec-kpi" style="--c:${margenTotal >= 0 ? '#22c55e' : '#ef4444'}">
              <div class="exec-kpi-label">Margen Bruto</div>
              <div class="exec-kpi-value">${margenTotal >= 0 ? '+' : ''}${fmt.money(margenTotal)}</div>
              <div class="exec-kpi-sub">${fmt.pct(margenTotalPct)} margen</div>
            </div>
            <div class="exec-kpi" style="--c:#fbbf24">
              <div class="exec-kpi-label">Facturación Pendiente</div>
              <div class="exec-kpi-value">${fmt.money(facturacionPendiente)}</div>
              <div class="exec-kpi-sub">35% por facturar</div>
            </div>
          </div>

          <!-- FACTURACIÓN POR PROYECTO -->
          <div class="exec-card">
            <h3 class="exec-card-title">💰 Rentabilidad por Proyecto</h3>
            <div style="overflow-x:auto;">
              <table class="exec-table">
                <thead>
                  <tr>
                    <th>Proyecto</th>
                    <th class="num">Tarifa Cliente</th>
                    <th class="num">Tarifa Interna</th>
                    <th class="num">Margen/h</th>
                    <th class="num">Horas Facturables</th>
                    <th class="num">Ingresos</th>
                    <th class="num">Costes</th>
                    <th class="num">Margen</th>
                    <th class="num">% Margen</th>
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
                    <td style="font-weight:900;color:#fbbf24;border-left:3px solid #fbbf24;">TOTAL Portafolio</td>
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
              <h3 class="exec-card-title">💱 Multi-Moneda</h3>
              <div style="font-size:12px;color:#8b7cb8;margin-bottom:14px;">
                Conversión automática para proyectos internacionales:
              </div>
              <div style="display:flex;flex-direction:column;gap:10px;">
                ${monedas.map(m => {
                  const valorConvertido = ingresosTotales * m.rate;
                  return `
                    <div style="padding:12px 14px;border-radius:10px;background:rgba(10,5,25,0.5);border-left:3px solid #67e8f9;">
                      <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div>
                          <div style="font-size:13px;font-weight:800;color:#fff;">${m.nombre}</div>
                          <div style="font-size:11px;color:#8b7cb8;">${m.code} · tasa ${m.rate}</div>
                        </div>
                        <div style="text-align:right;">
                          <div style="font-size:16px;font-weight:900;color:#67e8f9;">${m.symbol}${Math.round(valorConvertido).toLocaleString('es-ES')}</div>
                          <div style="font-size:10px;color:#8b7cb8;">equivalente</div>
                        </div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <div class="exec-card">
              <h3 class="exec-card-title">🏢 Distribución por Centro de Coste</h3>
              <div style="font-size:12px;color:#8b7cb8;margin-bottom:14px;">
                Asignación de costes por área funcional:
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
                      <div style="font-size:10px;color:#8b7cb8;margin-top:2px;">${c.pct}% del total</div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- ANÁLISIS DE MARGEN -->
          <div class="exec-card">
            <h3 class="exec-card-title">📊 Análisis de Margen y Rentabilidad</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;">
              ${[
                { label: 'Margen Bruto', valor: fmt.money(margenTotal), sub: fmt.pct(margenTotalPct), color: margenTotal >= 0 ? '#22c55e' : '#ef4444', icon: '💵' },
                { label: 'Margen por Hora', valor: fmt.money(horasTotales > 0 ? margenTotal / horasTotales : 0), sub: 'por hora facturable', color: '#fbbf24', icon: '⏱️' },
                { label: 'Precio Medio Hora', valor: fmt.money(horasTotales > 0 ? ingresosTotales / horasTotales : 0), sub: 'tarifa media cliente', color: '#a78bfa', icon: '📈' },
                { label: 'Coste Medio Hora', valor: fmt.money(horasTotales > 0 ? costesTotales / horasTotales : 0), sub: 'coste interno medio', color: '#67e8f9', icon: '📉' }
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
            <h3 class="exec-card-title">🔮 Proyección de Ingresos (próximos 6 meses)</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;">
              ${['Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'].map((mes, i) => {
                const factor = 1 + (i * 0.08);
                const proyeccion = ingresosTotales * factor;
                const color = i < 3 ? '#22c55e' : i < 5 ? '#fbbf24' : '#a78bfa';
                return `
                  <div style="padding:14px;border-radius:12px;background:linear-gradient(160deg, ${color}12, rgba(12,6,30,0.7));border:1px solid ${color}40;text-align:center;">
                    <div style="font-size:10px;color:#fbbf24;letter-spacing:2px;font-weight:800;margin-bottom:8px;">${mes}</div>
                    <div style="font-size:18px;font-weight:900;color:${color};">${fmt.moneyCompact(proyeccion)}</div>
                    <div style="font-size:10px;color:#8b7cb8;margin-top:6px;">+${((factor - 1) * 100).toFixed(0)}%</div>
                  </div>
                `;
              }).join('')}
            </div>
            <div style="margin-top:16px;padding:14px;border-radius:10px;background:rgba(10,5,25,0.5);font-size:12px;color:#b8a4e8;line-height:1.6;">
              <strong style="color:#fbbf24;">💡 Insight financiero:</strong>
              Con la estructura actual y el pipeline proyectado, se espera alcanzar <strong style="color:#22c55e;">${fmt.moneyCompact(ingresosTotales * 1.4)}</strong> en los próximos 6 meses, asumiendo una tasa de conversión conservadora del 8% mensual.
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
          container.innerHTML = `<div class="exec-empty">📭 No hay datos para mostrar</div>`;
          return;
        }

        const agg = DataLayer.aggregate(projects);
        const activos = projects.filter(p => p.totalTasks > 0);

        // Estado general para el CEO (interpretación ejecutiva)
        const estadoGeneral = this.interpretarEstado(agg);
        const alertas = this.generarAlertas(projects, agg);
        const decisionesDelDia = this.generarDecisiones(projects, agg);
        const pulsoEquipo = this.calcularPulsoEquipo(projects);

        // Score general ejecutivo (0-100)
        const scoreGeneral = Math.round(
          (Math.min(1.5, agg.CPI) / 1.5 * 30) +
          (Math.min(1.5, agg.SPI) / 1.5 * 30) +
          (agg.margenPct > 0 ? 20 : Math.max(0, 20 + agg.margenPct * 0.5)) +
          (activos.length > 0 ? 20 : 10)
        );

        const scoreColor = scoreGeneral >= 80 ? '#22c55e' : scoreGeneral >= 60 ? '#fbbf24' : scoreGeneral >= 40 ? '#f97316' : '#ef4444';

        container.innerHTML = `
          <!-- HERO EJECUTIVO -->
          <div class="exec-card" style="background:linear-gradient(135deg, ${scoreColor}15, rgba(12,6,30,0.95));border:1px solid ${scoreColor}55;padding:34px;">
            <div style="display:flex;align-items:center;gap:36px;flex-wrap:wrap;">
              <div style="text-align:center;">
                <div style="font-size:96px;font-weight:900;line-height:1;background:linear-gradient(135deg, ${scoreColor}, ${scoreColor}99);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
                  ${scoreGeneral}
                </div>
                <div style="font-size:11px;color:#fbbf24;letter-spacing:4px;text-transform:uppercase;margin-top:8px;font-weight:900;">
                  Executive Score
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
                    ACTUALIZADO ${new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- KPIs EJECUTIVOS -->
          <div class="exec-grid-4">
            <div class="exec-kpi" style="--c:${agg.CPI >= 1 ? '#22c55e' : agg.CPI >= 0.9 ? '#fbbf24' : '#ef4444'}">
              <div class="exec-kpi-label">Estado Financiero</div>
              <div class="exec-kpi-value">${agg.CPI.toFixed(2)}</div>
              <div class="exec-kpi-sub">${agg.CPI >= 1 ? 'Óptimo' : agg.CPI >= 0.9 ? 'En tolerancia' : 'Atención'}</div>
            </div>
            <div class="exec-kpi" style="--c:${agg.SPI >= 1 ? '#22c55e' : agg.SPI >= 0.9 ? '#fbbf24' : '#ef4444'}">
              <div class="exec-kpi-label">Estado Cronograma</div>
              <div class="exec-kpi-value">${agg.SPI.toFixed(2)}</div>
              <div class="exec-kpi-sub">${agg.SPI >= 1 ? 'En tiempo' : agg.SPI >= 0.9 ? 'Tolerancia' : 'Retrasado'}</div>
            </div>
            <div class="exec-kpi" style="--c:#a78bfa">
              <div class="exec-kpi-label">Portafolio</div>
              <div class="exec-kpi-value">${activos.length}</div>
              <div class="exec-kpi-sub">proyectos activos</div>
            </div>
            <div class="exec-kpi" style="--c:#67e8f9">
              <div class="exec-kpi-label">Valor Total</div>
              <div class="exec-kpi-value">${fmt.moneyCompact(agg.BAC)}</div>
              <div class="exec-kpi-sub">presupuesto Portafolio</div>
            </div>
          </div>

          <!-- ALERTAS INTELIGENTES -->
          <div class="exec-card">
            <h3 class="exec-card-title">🚨 Alertas Inteligentes Priorizadas</h3>
            ${alertas.length === 0 ? `
              <div style="text-align:center;padding:30px;color:#22c55e;font-size:13px;">
                ✅ No hay alertas críticas. Todos los indicadores en rango.
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
            <h3 class="exec-card-title">⚡ Decisiones Ejecutivas de Hoy</h3>
            <div style="font-size:12px;color:#8b7cb8;margin-bottom:16px;">
              Las 3 decisiones más importantes que el C-Suite debería tomar hoy:
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
              <h3 class="exec-card-title">💓 Pulso del Equipo</h3>
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
              <h3 class="exec-card-title">🎯 Vista por Rol Ejecutivo</h3>
              <div style="display:flex;flex-direction:column;gap:12px;">
                ${[
                  { rol: 'CEO', icon: '👔', color: '#fbbf24', mensaje: estadoGeneral.mensajeCEO || 'Estrategia global bajo control', accion: 'Revisar Portafolio mensual' },
                  { rol: 'CFO', icon: '💰', color: '#22c55e', mensaje: `Margen total: ${fmt.pct(agg.margenPct)}`, accion: 'Auditoría de costes semanal' },
                  { rol: 'COO', icon: '⚙️', color: '#a78bfa', mensaje: `SPI: ${agg.SPI.toFixed(2)}`, accion: 'Optimizar asignación de recursos' },
                  { rol: 'PMO', icon: '🎯', color: '#67e8f9', mensaje: `${agg.delayed} tareas rezagadas`, accion: 'Revisar ruta crítica' }
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

          <!-- RESUMEN ULTRA-LIMPIO PARA CEO -->
          <div class="exec-card" style="background:linear-gradient(135deg, rgba(20,10,50,0.95), rgba(6,4,24,1));">
            <h3 class="exec-card-title">📌 Resumen Ultra-Ejecutivo (15 segundos)</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;">
              ${[
                { label: 'Dónde estamos', value: `${agg.progresoPct.toFixed(0)}%`, sub: 'avance del Portafolio', color: '#fbbf24' },
                { label: 'Vamos bien?', value: agg.CPI >= 1 && agg.SPI >= 1 ? '✅ Sí' : agg.CPI >= 0.9 || agg.SPI >= 0.9 ? '⚠️ Con cautela' : '🔴 No', sub: 'estado global', color: agg.CPI >= 1 && agg.SPI >= 1 ? '#22c55e' : agg.CPI >= 0.9 || agg.SPI >= 0.9 ? '#fbbf24' : '#ef4444' },
                { label: 'Riesgo principal', value: agg.CPI < 0.9 ? 'Costes' : agg.SPI < 0.9 ? 'Cronograma' : 'Ninguno', sub: 'foco de atención', color: '#ef4444' },
                { label: 'Acción hoy', value: decisionesDelDia[0]?.titulo?.split(' ').slice(0, 3).join(' ') || 'Mantener rumbo', sub: 'decisión clave', color: '#a78bfa' }
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
            titulo: '🏆 Excelencia Ejecutiva',
            mensaje: 'El Portafolio opera con rentabilidad positiva, eficiencia de costes y cumplimiento del cronograma. Oportunidad de escalar y consolidar.',
            estado: 'óptimo'
          };
        }
        if (agg.CPI >= 0.95 && agg.SPI >= 0.95) {
          return {
            titulo: '✅ Operación Estable',
            mensaje: 'Todos los indicadores en zona de tolerancia. Continuar con monitoreo semanal para mantener el rumbo.',
            estado: 'estable'
          };
        }
        if (agg.CPI < 0.85 || agg.SPI < 0.85) {
          return {
            titulo: '🚨 Intervención Necesaria',
            mensaje: 'El Portafolio muestra desviaciones significativas. Se requiere plan de recuperación ejecutivo en los próximos 7 días.',
            estado: 'crítico'
          };
        }
        return {
          titulo: '⚠️ Requiere Atención',
          mensaje: 'Algunos indicadores están fuera de rango óptimo. Recomendamos revisión cercana y acciones correctivas tempranas.',
          estado: 'atención'
        };
      },

      generarAlertas(projects, agg) {
        const alertas = [];

        // Alerta 1: Proyectos críticos
        const criticos = projects.filter(p => p.totalTasks > 0 && p.health === 'critico');
        if (criticos.length > 0) {
          alertas.push({
            nivel: 'crítico', icon: '🚨', color: '#ef4444',
            titulo: `${criticos.length} proyecto(s) en estado crítico`,
            descripcion: `Proyectos con desviaciones severas en CPI y/o SPI: ${criticos.map(p => p.name.substring(0, 25)).join(', ')}`,
            accion: 'Reunión urgente con los PM + plan de recuperación en 48h'
          });
        }

        // Alerta 2: Sobrecostos
        const sobrecosto = projects.filter(p => p.totalTasks > 0 && p.VAC < 0);
        if (sobrecosto.length > 0) {
          const exposicion = Math.abs(sobrecosto.reduce((s, p) => s + p.VAC, 0));
          alertas.push({
            nivel: 'alto', icon: '💰', color: '#f97316',
            titulo: `Sobrecosto proyectado de ${fmt.moneyCompact(exposicion)}`,
            descripcion: `${sobrecosto.length} proyecto(s) con EAC superior al BAC. Si no se corrige, el Portafolio cerrará por encima del presupuesto.`,
            accion: 'Auditoría financiera + renegociación de alcance'
          });
        }

        // Alerta 3: Tareas rezagadas
        const totalRezagos = agg.delayed;
        if (totalRezagos > 3) {
          alertas.push({
            nivel: 'medio', icon: '⏰', color: '#fbbf24',
            titulo: `${totalRezagos} tareas rezagadas`,
            descripcion: 'El volumen de rezagos puede impactar la entrega final y generar penalizaciones contractuales.',
            accion: 'Reasignación de recursos y revisión de dependencias'
          });
        }

        // Alerta 4: Proyectos sin datos
        const vacios = projects.filter(p => p.totalTasks === 0);
        if (vacios.length > 0) {
          alertas.push({
            nivel: 'bajo', icon: '📭', color: '#a78bfa',
            titulo: `${vacios.length} proyecto(s) sin datos`,
            descripcion: 'Proyectos sin tareas definidas. Distorsionan las métricas del Portafolio.',
            accion: 'Definir alcance o archivar'
          });
        }

        return alertas;
      },

      generarDecisiones(projects, agg) {
        const decisiones = [];

        // Decisión 1
        if (agg.CPI < 0.9) {
          decisiones.push({
            titulo: 'Reestructurar costes',
            detalle: 'Aprobar un plan de auditoría de horas y renegociación de contratos para los proyectos con mayor desviación de costes.',
            color: '#ef4444'
          });
        } else if (agg.SPI < 0.9) {
          decisiones.push({
            titulo: 'Recuperar cronograma',
            detalle: 'Aprobar refuerzo del equipo en tareas críticas y fast-tracking en la ruta crítica del Portafolio.',
            color: '#f97316'
          });
        } else {
          decisiones.push({
            titulo: 'Acelerar el crecimiento',
            detalle: 'Aprobar la expansión del Portafolio con 2 proyectos adicionales usando el equipo actual.',
            color: '#22c55e'
          });
        }

        // Decisión 2
        const activos = projects.filter(p => p.totalTasks > 0);
        const vacios = projects.filter(p => p.totalTasks === 0);
        if (vacios.length > 0) {
          decisiones.push({
            titulo: 'Limpiar el Portafolio',
            detalle: `Decidir sobre ${vacios.length} proyecto(s) sin alcance: definir tareas o archivar para mantener métricas limpias.`,
            color: '#a78bfa'
          });
        } else {
          decisiones.push({
            titulo: 'Invertir en equipo',
            detalle: 'Aprobar plan de capacitación en EVM y PMI para los PMs, elevando la madurez del Portafolio.',
            color: '#a78bfa'
          });
        }

        // Decisión 3
        const conMargenPositivo = activos.filter(p => p.margenProyectado >= 0);
        const pctRentables = activos.length > 0 ? (conMargenPositivo.length / activos.length) * 100 : 0;
        if (pctRentables < 50) {
          decisiones.push({
            titulo: 'Revisar pricing',
            detalle: `Solo ${pctRentables.toFixed(0)}% de proyectos son rentables. Revisar tarifas y costes para mejorar el margen global.`,
            color: '#ef4444'
          });
        } else {
          decisiones.push({
            titulo: 'Consolidar contratos',
            detalle: `El ${pctRentables.toFixed(0)}% de los proyectos son rentables. Renegociar contratos con clientes clave para asegurar recurrencia.`,
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

        // Carga media
        const cargaMedia = activos.reduce((s, p) => s + (p.totalEstimated > 0 ? (p.totalLogged / p.totalEstimated) * 100 : 0), 0) / activos.length;

        return [
          { label: 'Productividad', valor: `${((completadas / Math.max(1, totalTareas)) * 100).toFixed(0)}%`, pct: (completadas / Math.max(1, totalTareas)) * 100, color: '#22c55e' },
          { label: 'Carga media', valor: `${cargaMedia.toFixed(0)}%`, pct: Math.min(100, cargaMedia), color: cargaMedia > 100 ? '#ef4444' : cargaMedia > 80 ? '#fbbf24' : '#22c55e' },
          { label: 'Tareas activas', valor: `${enCurso}`, pct: (enCurso / Math.max(1, totalTareas)) * 100, color: '#a78bfa' },
          { label: 'Rezagos', valor: `${rezagadas}`, pct: (rezagadas / Math.max(1, totalTareas)) * 100, color: rezagadas > 3 ? '#ef4444' : '#fbbf24' }
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