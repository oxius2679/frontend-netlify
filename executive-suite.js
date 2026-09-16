/**
 * ============================================================
 *  👑 EXECUTIVE SUITE — C-SUITE COMMAND CENTER v1.0
 * ============================================================
 *  8 módulos ejecutivos de nivel enterprise:
 *  1. Portfolio Financiero (CFO)
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
    module: 'portfolio',
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

    /* ---------- MÓDULO 1 · PORTFOLIO FINANCIERO (CFO) ---------- */
    portfolio: {
      id: 'portfolio',
      icon: '💰',
      label: 'Portfolio Financiero',
      subtitle: 'Consolidado de todos los proyectos',
      badge: 'CFO',

      render(container) {
        const projects = State.projects;
        if (!projects.length) {
          container.innerHTML = `<div class="exec-empty">📭 No hay proyectos disponibles</div>`;
          return;
        }

        const agg = DataLayer.aggregate(projects);

        // KPIs principales
        const kpis = [
          { label: 'BAC Total', value: fmt.money(agg.BAC), sub: `${agg.count} proyectos`, color: '#fbbf24' },
          { label: 'Costo Real (AC)', value: fmt.money(agg.AC), sub: `${fmt.pct(agg.BAC > 0 ? (agg.AC / agg.BAC) * 100 : 0)} consumido`, color: '#ef4444' },
          { label: 'Valor Ganado (EV)', value: fmt.money(agg.EV), sub: `${fmt.pct(agg.progresoPct)} del presupuesto`, color: '#22c55e' },
          { label: 'CPI Global', value: agg.CPI.toFixed(2), sub: agg.CPI >= 1 ? 'Eficiente' : agg.CPI >= 0.9 ? 'En tolerancia' : 'Sobrecosto', color: agg.CPI >= 1 ? '#22c55e' : agg.CPI >= 0.9 ? '#fbbf24' : '#ef4444' }
        ];

        // Segunda fila de KPIs financieros
        const kpis2 = [
          { label: 'EAC Proyectado', value: fmt.money(agg.EAC), sub: 'Estimado al cierre', color: '#a78bfa' },
          { label: 'VAC Proyectado', value: (agg.VAC >= 0 ? '+' : '') + fmt.money(agg.VAC), sub: agg.VAC >= 0 ? 'Ahorro' : 'Sobrecosto', color: agg.VAC >= 0 ? '#22c55e' : '#ef4444' },
          { label: 'Margen Proyectado', value: fmt.money(agg.margen), sub: `${fmt.pct(agg.margenPct)} del BAC`, color: agg.margen >= 0 ? '#22c55e' : '#ef4444' },
          { label: 'SPI Global', value: agg.SPI.toFixed(2), sub: agg.SPI >= 1 ? 'Adelantado' : agg.SPI >= 0.9 ? 'En tiempo' : 'Retrasado', color: agg.SPI >= 1 ? '#22c55e' : agg.SPI >= 0.9 ? '#fbbf24' : '#ef4444' }
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
            <h3 class="exec-card-title">Distribución por Salud del Portfolio</h3>
            <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:10px;">
              ${[
                { key: 'saludable', label: 'Saludable', color: '#22c55e', icon: '🟢' },
                { key: 'aceptable', label: 'Aceptable', color: '#a78bfa', icon: '🟣' },
                { key: 'riesgo', label: 'En riesgo', color: '#f59e0b', icon: '🟠' },
                { key: 'critico', label: 'Crítico', color: '#ef4444', icon: '🔴' }
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
            <h3 class="exec-card-title">Detalle por Proyecto</h3>
            <div style="overflow-x:auto;">
              <table class="exec-table">
                <thead>
                  <tr>
                    <th>Proyecto</th>
                    <th class="num">BAC</th>
                    <th class="num">EV</th>
                    <th class="num">AC</th>
                    <th class="num">EAC</th>
                    <th class="num">VAC</th>
                    <th class="num">CPI</th>
                    <th class="num">SPI</th>
                    <th class="num">Margen</th>
                    <th>Salud</th>
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
                    <td style="font-weight:900;color:#fbbf24;border-left:3px solid #fbbf24;">TOTAL PORTFOLIO</td>
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
              <h3 class="exec-card-title">Burn Rate & Runway</h3>
              <div style="display:flex;flex-direction:column;gap:14px;">
                ${projects.slice(0, 5).map(p => `
                  <div>
                    <div style="display:flex;justify-content:space-between;font-size:12px;color:#ddd6fe;margin-bottom:4px;">
                      <span>${p.name.substring(0, 30)}</span>
                      <span style="color:#fbbf24;font-weight:800;">${fmt.moneyCompact(p.burnRate)}/día</span>
                    </div>
                    <div class="exec-bar">
                      <div class="exec-bar-fill" style="--c:#fbbf24;width:0" data-w="${Math.min(100, (p.burnRate / 5000) * 100)}%"></div>
                    </div>
                    <div style="font-size:10px;color:#8b7cb8;margin-top:2px;">
                      Runway: <strong style="color:${p.runwayDias > 30 ? '#22c55e' : p.runwayDias > 15 ? '#fbbf24' : '#ef4444'};">${p.runwayDias} días</strong>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="exec-card">
              <h3 class="exec-card-title">Top Proyectos por Margen</h3>
              <div style="display:flex;flex-direction:column;gap:12px;">
                ${[...projects].sort((a, b) => b.margenProyectado - a.margenProyectado).slice(0, 5).map((p, i) => `
                  <div style="display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:10px;background:rgba(10,5,25,0.5);border-left:3px solid ${p.margenProyectado >= 0 ? '#22c55e' : '#ef4444'};">
                    <div style="font-size:22px;font-weight:900;color:${p.margenProyectado >= 0 ? '#22c55e' : '#ef4444'};min-width:32px;">#${i + 1}</div>
                    <div style="flex:1;">
                      <div style="font-size:13px;font-weight:700;color:#fff;">${p.name.substring(0, 35)}</div>
                      <div style="font-size:11px;color:#8b7cb8;">${p.totalTasks} tareas · ${fmt.pct(p.progresoPct)} completado</div>
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
        container.innerHTML = `<div class="exec-loading">Módulo disponible en la siguiente entrega</div>`;
      }
    },
    capacity: {
      id: 'capacity', icon: '⚙️', label: 'Capacity Planning', subtitle: 'Gestión de recursos', badge: 'COO',
      render(container) {
        container.innerHTML = `<div class="exec-loading">Módulo disponible en la siguiente entrega</div>`;
      }
    },
    bi: {
      id: 'bi', icon: '📊', label: 'Business Intelligence', subtitle: 'Reportes avanzados', badge: 'BI',
      render(container) {
        container.innerHTML = `<div class="exec-loading">Módulo disponible en la siguiente entrega</div>`;
      }
    },
    governance: {
      id: 'governance', icon: '🔐', label: 'Governance & Compliance', subtitle: 'Auditoría y riesgos', badge: 'GRC',
      render(container) {
        container.innerHTML = `<div class="exec-loading">Módulo disponible en la siguiente entrega</div>`;
      }
    },
    integrations: {
      id: 'integrations', icon: '🔌', label: 'Integraciones', subtitle: 'SSO, API, Webhooks', badge: 'IT',
      render(container) {
        container.innerHTML = `<div class="exec-loading">Módulo disponible en la siguiente entrega</div>`;
      }
    },
    finance: {
      id: 'finance', icon: '💎', label: 'Finanzas Avanzadas', subtitle: 'Facturación y márgenes', badge: 'FIN',
      render(container) {
        container.innerHTML = `<div class="exec-loading">Módulo disponible en la siguiente entrega</div>`;
      }
    },
    experience: {
      id: 'experience', icon: '📱', label: 'Executive Experience', subtitle: 'Vista C-Suite', badge: 'VIP',
      render(container) {
        container.innerHTML = `<div class="exec-loading">Módulo disponible en la siguiente entrega</div>`;
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
            <div class="exec-nav-section">C-Suite Modules</div>
            ${Object.values(Modules).map(m => `
              <div class="exec-nav-item ${m.id === State.module ? 'active' : ''}" data-module="${m.id}">
                <span class="exec-nav-icon">${m.icon}</span>
                <span class="exec-nav-label">${m.label}</span>
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
              <h1 class="exec-topbar-title" id="exec-module-title">Portfolio Financiero</h1>
              <div class="exec-topbar-sub" id="exec-module-subtitle">Consolidado de todos los proyectos</div>
            </div>
            <div class="exec-topbar-actions">
              <button class="exec-btn exec-btn-gold" id="exec-btn-refresh">🔄 Actualizar</button>
              <button class="exec-btn exec-btn-gold" id="exec-btn-export">📄 Exportar</button>
              <button class="exec-btn exec-btn-danger" id="exec-btn-close">✕ Cerrar</button>
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

    renderModule(moduleId) {
      const mod = Modules[moduleId];
      if (!mod) return;

      State.module = moduleId;

      // Actualizar títulos
      const title = document.getElementById('exec-module-title');
      const subtitle = document.getElementById('exec-module-subtitle');
      if (title) title.textContent = mod.label;
      if (subtitle) subtitle.textContent = mod.subtitle || '';

      // Actualizar navegación
      document.querySelectorAll('.exec-nav-item').forEach(el => {
        el.classList.toggle('active', el.dataset.module === moduleId);
      });

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

      // Export (placeholder para próxima entrega)
      const exportBtn = document.getElementById('exec-btn-export');
      if (exportBtn) {
        exportBtn.addEventListener('click', () => {
          alert('📄 Exportación ejecutiva disponible en la próxima entrega.');
        });
      }

      // Close
      const closeBtn = document.getElementById('exec-btn-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.close());
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

  console.log(`✅ Executive Suite v${CFG.version} cargado — 8 módulos C-Suite disponibles`);
})();