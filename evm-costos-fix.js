// ============================================
// SOLUCIÓN UNIFICADA COMPLETA - VIP BLUE EXECUTIVE
// Dashboard EVM Costos + Valor Ganado + Cronograma + SPI
// Paleta: Azul Ejecutivo + Efectos 3D
// ============================================
(function() {
    console.log('🚀 EVM VIP BLUE EXECUTIVE - Iniciando...');

    // Guardar funciones originales
    const originalCostos = window.openEVMDashboardCosts;
    const originalValorGanado = window.openEVMDashboard;
    const originalCrear = window.crearDashboardEVMCompleto;

    let modoActual = 'hours';

    // ========== 0. INYECTAR ESTILOS VIP (una sola vez) ==========
    function injectVipBlueStyles() {
        if (document.getElementById('vip-blue-styles')) return;
        const s = document.createElement('style');
        s.id = 'vip-blue-styles';
        s.textContent = `
@keyframes vipBlueFadeIn { from{opacity:0;transform:translateY(30px) scale(0.96);} to{opacity:1;transform:translateY(0) scale(1);} }
@keyframes vipBlueShine { 0%{background-position:-200% 0;} 100%{background-position:200% 0;} }
@keyframes vipBlueFloat { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-6px);} }
@keyframes vipBluePulse { 0%,100%{box-shadow:0 0 0 0 var(--c);} 50%{box-shadow:0 0 0 8px transparent;} }
@keyframes vipBlueGrid { from{background-position:0 0;} to{background-position:60px 60px;} }

.vip-blue-overlay, .vip-blue-overlay * { box-sizing: border-box; }
.vip-blue-overlay {
    position: fixed; inset: 0;
    background:
      radial-gradient(circle at 12% 8%, rgba(37,99,235,0.45) 0%, transparent 42%),
      radial-gradient(circle at 88% 92%, rgba(14,165,233,0.35) 0%, transparent 45%),
      radial-gradient(circle at 50% 50%, #0a1535 0%, #030818 100%);
    z-index: 2147483647;
    padding: 22px;
    overflow-y: auto;
    font-family: 'Inter','Segoe UI',system-ui,-apple-system,sans-serif;
    animation: vipBlueFadeIn 0.6s cubic-bezier(0.34,1.56,0.64,1);
}
.vip-blue-overlay::before {
    content:''; position:fixed; inset:0; pointer-events:none; opacity:0.35;
    background-image:
      linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px);
    background-size: 60px 60px;
    animation: vipBlueGrid 22s linear infinite;
    z-index: 0;
}
.vip-blue-shell {
    position: relative; z-index: 1;
    max-width: 1380px; margin: 0 auto;
    background: linear-gradient(145deg, rgba(15,25,60,0.92), rgba(6,12,32,0.98));
    border: 1px solid rgba(96,165,250,0.35);
    border-radius: 28px;
    box-shadow:
      0 0 0 1px rgba(96,165,250,0.1),
      0 30px 80px rgba(0,0,0,0.8),
      0 0 130px rgba(37,99,235,0.22),
      inset 0 1px 0 rgba(147,197,253,0.15);
    overflow: hidden;
    backdrop-filter: blur(18px);
}
.vip-blue-shell::before {
    content:''; position:absolute; top:0; left:0; right:0; height:1px;
    background: linear-gradient(90deg, transparent, rgba(96,165,250,0.95), transparent);
    box-shadow: 0 0 18px rgba(96,165,250,0.7);
}
.vip-blue-header {
    padding: 24px 32px;
    background: linear-gradient(135deg, rgba(10,20,50,0.95), rgba(20,35,80,0.6));
    border-bottom: 1px solid rgba(96,165,250,0.22);
    display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;
    position: relative;
}
.vip-blue-header::after {
    content:''; position:absolute; bottom:-1px; left:8%; right:8%; height:1px;
    background: linear-gradient(90deg, transparent, rgba(59,130,246,0.85), transparent);
    box-shadow: 0 0 16px rgba(59,130,246,0.75);
}
.vip-blue-logo {
    width: 60px; height: 60px; border-radius: 18px;
    background: linear-gradient(135deg, #60a5fa, #2563eb, #1e3a8a, #0ea5e9);
    background-size: 300% 300%;
    animation: vipBlueShine 5s linear infinite;
    display:flex; align-items:center; justify-content:center;
    font-size: 28px;
    box-shadow:
      0 10px 26px rgba(37,99,235,0.65),
      0 0 32px rgba(96,165,250,0.5),
      inset 0 2px 4px rgba(255,255,255,0.55),
      inset 0 -3px 8px rgba(0,0,0,0.55);
}
.vip-blue-title {
    font-size: 23px; font-weight: 900; letter-spacing: 2px; margin: 0;
    background: linear-gradient(135deg, #ffffff 0%, #93c5fd 45%, #ffffff 100%);
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; animation: vipBlueShine 6s linear infinite;
    text-shadow: 0 0 40px rgba(96,165,250,0.35);
}
.vip-blue-subtitle {
    color:#7ea7d6; font-size: 11px; margin-top: 5px;
    letter-spacing: 3px; text-transform: uppercase;
}
.vip-blue-btn {
    padding: 10px 20px; border-radius: 12px; font-weight: 800; font-size: 12px;
    cursor: pointer; letter-spacing: 1px; text-transform: uppercase;
    transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
    border: 1px solid; font-family: inherit;
}
.vip-blue-btn-primary {
    background: linear-gradient(135deg, rgba(59,130,246,0.3), rgba(37,99,235,0.08));
    border-color: rgba(96,165,250,0.65); color:#bfdbfe;
    box-shadow: 0 4px 18px rgba(59,130,246,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
}
.vip-blue-btn-primary:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 12px 32px rgba(59,130,246,0.6), inset 0 1px 0 rgba(255,255,255,0.25);
}
.vip-blue-btn-danger {
    background: linear-gradient(135deg, rgba(239,68,68,0.22), rgba(239,68,68,0.04));
    border-color: rgba(239,68,68,0.55); color:#fca5a5;
}
.vip-blue-btn-danger:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 10px 28px rgba(239,68,68,0.5);
}
.vip-blue-body { padding: 28px 32px; }

/* STATUS CARDS */
.vip-blue-status { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom: 24px; }
.vip-blue-status-card {
    position: relative; border-radius: 20px; padding: 22px 24px;
    background: linear-gradient(145deg, rgba(30,58,138,0.35), rgba(15,25,60,0.75));
    border: 1px solid color-mix(in srgb, var(--c) 55%, transparent);
    box-shadow:
      0 0 55px -15px var(--c),
      inset 0 1px 0 rgba(255,255,255,0.1),
      inset 0 -1px 0 rgba(0,0,0,0.4);
    overflow: hidden;
    transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.5s;
}
.vip-blue-status-card:hover {
    transform: translateY(-6px) perspective(900px) rotateX(4deg);
    box-shadow:
      0 25px 70px -20px var(--c),
      0 0 70px -15px var(--c),
      inset 0 1px 0 rgba(255,255,255,0.15);
}
.vip-blue-status-card::after {
    content:''; position: absolute; top: -60%; right: -60%; width: 120%; height: 120%;
    background: radial-gradient(circle, var(--c) 0%, transparent 65%);
    opacity: 0.22; pointer-events: none;
    animation: vipBlueFloat 6s ease-in-out infinite;
}
.vip-blue-status-icon { font-size: 34px; margin-bottom: 6px; filter: drop-shadow(0 0 14px var(--c)); }
.vip-blue-status-label {
    color:#93c5fd; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 6px;
}
.vip-blue-status-value {
    font-size: 26px; font-weight: 900; color: var(--c); letter-spacing: 0.5px;
    text-shadow: 0 0 26px var(--c), 0 2px 6px rgba(0,0,0,0.7);
}
.vip-blue-status-desc { color:#b4c6e7; font-size: 12px; margin-top: 8px; line-height: 1.55; }

/* ANÁLISIS */
.vip-blue-analysis {
    padding: 16px 22px; border-radius: 16px;
    background: linear-gradient(90deg, rgba(59,130,246,0.22), rgba(30,64,175,0.04));
    border-left: 4px solid #60a5fa;
    margin-bottom: 26px;
    display: flex; align-items: center; gap: 14px;
    box-shadow: inset 0 1px 0 rgba(147,197,253,0.15), 0 12px 32px rgba(0,0,0,0.4);
}
.vip-blue-analysis-icon { font-size: 26px; animation: vipBlueFloat 3s ease-in-out infinite; }
.vip-blue-analysis-text { color:#e0f2fe; font-size: 14px; font-weight: 500; letter-spacing: 0.3px; }

/* KPIs */
.vip-blue-kpi-grid { display:grid; grid-template-columns: repeat(4,1fr); gap:16px; margin-bottom: 26px; }
.vip-blue-kpi {
    position: relative; padding: 20px 18px; border-radius: 18px;
    background: linear-gradient(160deg, rgba(30,58,138,0.55), rgba(10,20,50,0.95));
    border: 1px solid rgba(96,165,250,0.18);
    box-shadow:
      0 14px 40px rgba(0,0,0,0.55),
      inset 0 1px 0 rgba(147,197,253,0.15),
      inset 0 -2px 4px rgba(0,0,0,0.55);
    transition: all 0.5s cubic-bezier(0.34,1.56,0.64,1);
    overflow: hidden;
}
.vip-blue-kpi::before {
    content:''; position:absolute; top:0; left:0; right:0; height: 3px;
    background: linear-gradient(90deg, transparent, var(--c), transparent);
    box-shadow: 0 0 16px var(--c);
}
.vip-blue-kpi::after {
    content:''; position:absolute; bottom:-50%; right:-50%; width: 150%; height: 100%;
    background: radial-gradient(circle, var(--c) 0%, transparent 70%);
    opacity: 0.12; pointer-events: none;
}
.vip-blue-kpi:hover {
    transform: translateY(-8px) perspective(900px) rotateX(5deg);
    box-shadow:
      0 26px 70px rgba(0,0,0,0.7),
      0 0 60px -12px var(--c),
      inset 0 1px 0 rgba(255,255,255,0.2),
      inset 0 -2px 4px rgba(0,0,0,0.55);
    border-color: color-mix(in srgb, var(--c) 60%, transparent);
}
.vip-blue-kpi-label {
    font-size: 10px; letter-spacing: 2.5px; color:#93c5fd; text-transform: uppercase;
    margin-bottom: 10px; display:flex; align-items:center; gap:8px;
}
.vip-blue-kpi-label::before {
    content:''; width:6px; height:6px; border-radius:50%;
    background: var(--c); box-shadow: 0 0 12px var(--c);
}
.vip-blue-kpi-value {
    font-size: 26px; font-weight: 900; color:#fff; letter-spacing: -0.5px;
    font-variant-numeric: tabular-nums;
    text-shadow: 0 2px 16px rgba(96,165,250,0.5);
    line-height: 1.1;
}
.vip-blue-kpi-sub { font-size: 10px; color:#7ea7d6; margin-top: 6px; letter-spacing: 0.8px; }

/* CARDS */
.vip-blue-card {
    position: relative;
    background: linear-gradient(160deg, rgba(20,40,90,0.75), rgba(8,15,40,0.95));
    border: 1px solid rgba(96,165,250,0.22);
    border-radius: 22px; padding: 24px 26px; margin-bottom: 24px;
    box-shadow:
      0 22px 60px rgba(0,0,0,0.6),
      inset 0 1px 0 rgba(147,197,253,0.1);
    overflow: hidden;
}
.vip-blue-card::before {
    content:''; position:absolute; top:0; left:8%; right:8%; height:1px;
    background: linear-gradient(90deg, transparent, rgba(96,165,250,0.75), transparent);
    box-shadow: 0 0 12px rgba(96,165,250,0.7);
}
.vip-blue-card-title {
    font-size: 14px; font-weight: 800; color:#dbeafe; letter-spacing: 2px;
    text-transform: uppercase; margin: 0 0 20px 0;
    display:flex; align-items:center; gap: 12px;
}
.vip-blue-card-title::before {
    content:''; width: 4px; height: 18px;
    background: linear-gradient(180deg, #93c5fd, #2563eb);
    border-radius: 2px; box-shadow: 0 0 14px rgba(96,165,250,0.9);
}

/* BARRAS 3D */
.vip-blue-bars-wrap {
    display:flex; justify-content: space-around; align-items: flex-end;
    height: 320px; padding: 30px; gap: 22px;
}
.vip-blue-bar-col {
    display:flex; flex-direction:column; align-items:center; gap:14px;
    flex:1; max-width: 180px;
}
.vip-blue-bar-value {
    font-size: 17px; font-weight: 900; color: var(--c);
    letter-spacing: 0.5px;
    text-shadow: 0 0 22px var(--c), 0 2px 6px rgba(0,0,0,0.85);
    font-variant-numeric: tabular-nums;
}
.vip-blue-bar {
    width: 92px; min-height: 24px;
    border-radius: 10px 10px 0 0;
    position: relative;
    background: linear-gradient(135deg, var(--c1), var(--c2));
    box-shadow:
      inset 0 3px 8px rgba(255,255,255,0.5),
      inset 0 -8px 18px rgba(0,0,0,0.55),
      6px 6px 0 var(--c3),
      12px 12px 0 rgba(0,0,0,0.4),
      15px 25px 50px rgba(0,0,0,0.75),
      0 0 60px -20px var(--c1);
    transition: height 1.3s cubic-bezier(0.34,1.56,0.64,1);
}
.vip-blue-bar::after {
    content:''; position:absolute; top:0; left:0; right:0; height: 42%;
    background: linear-gradient(180deg, rgba(255,255,255,0.45), transparent);
    border-radius: 10px 10px 0 0; pointer-events: none;
}
.vip-blue-bar-label {
    font-size: 12px; color:#bfdbfe; font-weight: 800; letter-spacing: 3px;
    text-shadow: 0 0 12px rgba(96,165,250,0.6);
}

/* TABLA */
.vip-blue-table { width: 100%; border-collapse: separate; border-spacing: 0 6px; }
.vip-blue-table th {
    text-align:left; padding: 10px 16px; font-size: 10px; letter-spacing: 2.5px;
    text-transform: uppercase; color:#93c5fd; font-weight: 800;
    border-bottom: 1px solid rgba(96,165,250,0.2);
}
.vip-blue-table td {
    padding: 13px 16px;
    background: linear-gradient(90deg, rgba(30,58,138,0.35), rgba(15,25,60,0.35));
    color:#dbeafe; font-size: 13px;
    border-top: 1px solid rgba(147,197,253,0.06);
    border-bottom: 1px solid rgba(147,197,253,0.06);
    transition: all 0.3s ease;
}
.vip-blue-table tr td:first-child {
    border-radius: 10px 0 0 10px;
    border-left: 3px solid var(--rowc, #60a5fa);
    font-weight: 700; color:#fff;
}
.vip-blue-table tr td:last-child { border-radius: 0 10px 10px 0; text-align: right; }
.vip-blue-table tr:hover td {
    background: linear-gradient(90deg, rgba(59,130,246,0.35), rgba(30,64,175,0.25));
    transform: translateX(2px);
}

/* PRONÓSTICO */
.vip-blue-forecast-grid { display:grid; grid-template-columns: repeat(3,1fr); gap: 12px; }
.vip-blue-forecast {
    padding: 18px 14px; border-radius: 14px;
    background: linear-gradient(160deg, rgba(30,58,138,0.55), rgba(10,20,50,0.9));
    border: 1px solid rgba(96,165,250,0.22);
    text-align: center;
    box-shadow:
      0 12px 32px rgba(0,0,0,0.5),
      inset 0 1px 0 rgba(147,197,253,0.15);
    transition: transform 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.45s;
}
.vip-blue-forecast:hover {
    transform: translateY(-5px) perspective(700px) rotateX(4deg);
    box-shadow:
      0 22px 55px rgba(0,0,0,0.65),
      0 0 45px -12px var(--c);
}
.vip-blue-forecast-label {
    font-size: 10px; color:#93c5fd; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px;
}
.vip-blue-forecast-value {
    font-size: 22px; font-weight: 900; color: var(--c);
    text-shadow: 0 0 20px var(--c); letter-spacing: -0.5px;
    font-variant-numeric: tabular-nums;
}
.vip-blue-forecast-sub { font-size: 10px; color:#7ea7d6; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px; }

/* RECOMENDACIONES */
.vip-blue-recommend { display:grid; grid-template-columns: 1fr 1fr; gap: 12px 24px; }
.vip-blue-rec-item {
    display:flex; align-items: flex-start; gap: 12px;
    padding: 10px 0; color:#cbd5e1; font-size: 13px; line-height: 1.55;
}
.vip-blue-rec-icon {
    flex-shrink: 0; width: 24px; height: 24px; border-radius: 8px;
    background: linear-gradient(135deg, rgba(96,165,250,0.5), rgba(37,99,235,0.15));
    border: 1px solid rgba(147,197,253,0.6);
    display:flex; align-items:center; justify-content:center;
    font-size: 11px; color:#dbeafe; font-weight: 900;
    box-shadow: 0 0 14px rgba(96,165,250,0.5);
}

/* ANÁLISIS DETALLADO */
.vip-blue-detail-grid { display:grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.vip-blue-detail-item {
    padding: 14px 16px; border-radius: 12px; margin-bottom: 10px;
    background: linear-gradient(90deg, rgba(30,58,138,0.35), rgba(15,25,60,0.2));
    border-left: 3px solid #60a5fa;
    color:#dbeafe; font-size: 13px; line-height: 1.6;
    transition: all 0.35s ease;
}
.vip-blue-detail-item:hover {
    background: linear-gradient(90deg, rgba(59,130,246,0.45), rgba(30,64,175,0.25));
    transform: translateX(3px);
}
.vip-blue-detail-item strong { color: #93c5fd; }

/* FOOTER */
.vip-blue-footer {
    text-align:center; padding: 18px; color:#5b7bab; font-size: 10px;
    letter-spacing: 2.5px; text-transform: uppercase;
    border-top: 1px solid rgba(96,165,250,0.15); margin-top: 16px;
}

/* ═══════════════════════════════════════════════════════════
   PRINT FIX — Reporte con VALORES REALES (texto plano legible)
   Evita: overlay fijo repetido, valores en €0, barras en 0px,
          texto claro sobre fondo claro, sombras/gradientes raros
   ═══════════════════════════════════════════════════════════ */
@media print {
    @page { size: A4; margin: 10mm; }

    /* 0) Color exacto en TODO el documento al imprimir */
    html, body, .vip-blue-overlay, .vip-blue-overlay * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
    }

    /* 1) Ocultar TODO excepto el overlay cuando se imprime */
    body.vip-blue-printing > *:not(.vip-blue-overlay) {
        display: none !important;
    }

    /* 2) Overlay a flujo normal (no fixed, sin animaciones) */
    .vip-blue-overlay {
        position: static !important;
        inset: auto !important;
        width: 100% !important;
        max-width: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
        background: #ffffff !important;
        overflow: visible !important;
        animation: none !important;
        z-index: auto !important;
        backdrop-filter: none !important;
        filter: none !important;
        transform: none !important;
    }
    .vip-blue-overlay::before { display: none !important; }

    /* 3) Shell sin decoraciones */
    .vip-blue-shell {
        max-width: 100% !important;
        width: 100% !important;
        margin: 0 !important;
        border-radius: 0 !important;
        border: none !important;
        box-shadow: none !important;
        background: #ffffff !important;
        backdrop-filter: none !important;
        filter: none !important;
        overflow: visible !important;
    }
    .vip-blue-shell::before { display: none !important; }

    /* 4) Header con color corporativo pero texto legible */
    .vip-blue-header {
        background: linear-gradient(135deg, #1e3a8a, #1e40af) !important;
        border-bottom: 2px solid #2563eb !important;
        padding: 18px 22px !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
    }
    .vip-blue-header::after { display: none !important; }
    .vip-blue-logo {
        animation: none !important;
        background: linear-gradient(135deg, #60a5fa, #2563eb) !important;
        box-shadow: none !important;
    }
    .vip-blue-title {
        -webkit-text-fill-color: #ffffff !important;
        color: #ffffff !important;
        background: none !important;
        animation: none !important;
        text-shadow: none !important;
    }
    .vip-blue-subtitle { color: #bfdbfe !important; }

    .vip-blue-body { padding: 18px 22px !important; }

    /* 5) Cards planas, con borde sutil, sin pseudo-decoraciones */
    .vip-blue-card,
    .vip-blue-status-card,
    .vip-blue-kpi,
    .vip-blue-forecast {
        background: #f8fafc !important;
        border: 1px solid #cbd5e1 !important;
        box-shadow: none !important;
        filter: none !important;
        transform: none !important;
        page-break-inside: avoid;
        break-inside: avoid;
        overflow: visible !important;
    }
    .vip-blue-card::before,
    .vip-blue-card::after,
    .vip-blue-status-card::after,
    .vip-blue-kpi::before,
    .vip-blue-kpi::after,
    .vip-blue-forecast::before,
    .vip-blue-forecast::after { display: none !important; }

    .vip-blue-card-title { color: #1e293b !important; }
    .vip-blue-card-title::before { background: #2563eb !important; box-shadow: none !important; }

    /* 6) TODOS los valores numéricos → texto oscuro sobre fondo claro */
    .vip-blue-kpi-value,
    .vip-blue-status-value,
    .vip-blue-forecast-value,
    .vip-blue-bar-value {
        color: #0f172a !important;
        text-shadow: none !important;
        background: none !important;
        -webkit-text-fill-color: #0f172a !important;
    }
    .vip-blue-kpi-sub,
    .vip-blue-status-desc,
    .vip-blue-forecast-sub,
    .vip-blue-forecast-label,
    .vip-blue-status-label,
    .vip-blue-kpi-label {
        color: #475569 !important;
        text-shadow: none !important;
    }
    .vip-blue-kpi-label::before {
        background: #2563eb !important;
        box-shadow: none !important;
    }

    /* 7) Análisis ejecutivo */
    .vip-blue-analysis {
        background: #eff6ff !important;
        border-left: 4px solid #2563eb !important;
        box-shadow: none !important;
    }
    .vip-blue-analysis-icon {
        animation: none !important;
        filter: none !important;
    }
    .vip-blue-analysis-text { color: #0f172a !important; }

    /* 8) Detalle / análisis detallado */
    .vip-blue-detail-item {
        background: #f1f5f9 !important;
        color: #1e293b !important;
        border-left: 3px solid #2563eb !important;
        transform: none !important;
    }
    .vip-blue-detail-item strong { color: #1e40af !important; }

    /* 9) Recomendaciones */
    .vip-blue-rec-item { color: #1e293b !important; }
    .vip-blue-rec-icon {
        background: #dbeafe !important;
        color: #1e40af !important;
        border-color: #2563eb !important;
        box-shadow: none !important;
    }

    /* 10) Tabla de tareas legible */
    .vip-blue-table { border-spacing: 0 2px !important; }
    .vip-blue-table th {
        color: #1e40af !important;
        border-bottom: 2px solid #2563eb !important;
    }
    .vip-blue-table td {
        background: #ffffff !important;
        color: #1e293b !important;
        border-top: 1px solid #e2e8f0 !important;
        border-bottom: 1px solid #e2e8f0 !important;
        transform: none !important;
    }
    .vip-blue-table tr td:first-child {
        color: #0f172a !important;
        border-left: 3px solid #2563eb !important;
    }

    /* 11) Barras 3D — aplanar pero mantener altura real */
    .vip-blue-bars-wrap { height: auto !important; padding: 10px !important; gap: 14px !important; }
    .vip-blue-bar {
        box-shadow: none !important;
        background: linear-gradient(180deg, #60a5fa, #1e40af) !important;
        border: 1px solid #1e40af !important;
        transition: none !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
    }
    .vip-blue-bar::after { display: none !important; }
    .vip-blue-bar-label { color: #1e40af !important; text-shadow: none !important; }

    /* 12) Footer */
    .vip-blue-footer { color: #64748b !important; border-top: 1px solid #cbd5e1 !important; }

    /* 13) Ocultar botones */
    .vip-blue-btn { display: none !important; }

    /* 14) Evitar cortes feos dentro de bloques grandes */
    .vip-blue-card,
    .vip-blue-status,
    .vip-blue-kpi-grid,
    .vip-blue-forecast-grid,
    .vip-blue-detail-grid,
    .vip-blue-analysis { page-break-inside: avoid; break-inside: avoid; }
}

@media (max-width: 980px) {
    .vip-blue-kpi-grid { grid-template-columns: repeat(2,1fr); }
    .vip-blue-status { grid-template-columns: 1fr; }
    .vip-blue-detail-grid { grid-template-columns: 1fr; }
    .vip-blue-recommend { grid-template-columns: 1fr; }
    .vip-blue-forecast-grid { grid-template-columns: 1fr; }
    .vip-blue-bars-wrap { height: 260px; }
}
        `;
        document.head.appendChild(s);
    }

    // ========== 1. FUNCIÓN COSTOS ==========
    window.openEVMDashboardCosts = function() {
        console.log('💰 Abriendo DASHBOARD DE COSTOS (VIP BLUE)');
        modoActual = 'costs';
        if (typeof originalCostos === 'function') originalCostos();
    };

    // ========== 2. FUNCIÓN VALOR GANADO ==========
    window.openEVMDashboard = function() {
        console.log('📊 Abriendo DASHBOARD DE VALOR GANADO (horas)');
        modoActual = 'hours';
        if (typeof originalValorGanado === 'function') originalValorGanado();
    };

    // ========== 3. INTERCEPTAR CREACIÓN ==========
    window.crearDashboardEVMCompleto = function() {
        if (modoActual === 'costs' && window.lastEVMPreviewData) {
            console.log('💰 Generando dashboard de COSTOS VIP BLUE');
            mostrarDashboardCostosCompleto(window.lastEVMPreviewData);
            return;
        }
        if (typeof originalCrear === 'function') return originalCrear.apply(this, arguments);
    };

    // ========== 4. CALCULAR SPI ==========
    function calcularSPI(evm) {
        const PV = evm.PV || evm.BAC;
        const EV = evm.EV;
        if (PV === 0) return { spi: 1, interpretacion: 'Sin datos suficientes', estado: 'neutral', color: '#93c5fd' };

        const spi = EV / PV;
        let interpretacion, estado, color;

        if (spi >= 1.05)      { interpretacion = '🚀 ADELANTADO - Vas más rápido de lo planeado';  estado='excelente'; color='#22d3ee'; }
        else if (spi >= 0.95) { interpretacion = '✅ EN TIEMPO - El cronograma está bajo control'; estado='bueno';     color='#60a5fa'; }
        else if (spi >= 0.85) { interpretacion = '⚠️ LIGERO RETRASO - Requiere monitoreo';         estado='atencion';  color='#f59e0b'; }
        else if (spi >= 0.7)  { interpretacion = '🔴 RETRASO SIGNIFICATIVO - Se requiere acción';  estado='riesgo';    color='#f97316'; }
        else                  { interpretacion = '💀 RETRASO CRÍTICO - Intervención urgente';       estado='critico';   color='#ef4444'; }

        return { spi: spi.toFixed(2), interpretacion, estado, color };
    }

    // ========== 5. HELPERS ==========
    const fmtMoney = n => '€' + Math.round(n).toLocaleString('es-ES');

    function stateOf(v, t) {
        if (v >= t.excelente) return { t:'EXCELENTE', c:'#22d3ee', i:'🏆' };
        if (v >= t.bueno)     return { t:'ÓPTIMO',    c:'#60a5fa', i:'✅' };
        if (v >= t.atencion)  return { t:'ATENCIÓN',  c:'#f59e0b', i:'⚠️' };
        if (v >= t.riesgo)    return { t:'RIESGO',    c:'#f97316', i:'🔴' };
        return                       { t:'CRÍTICO',   c:'#ef4444', i:'💀' };
    }

    function render3DBar(label, value, max, c1, c2, c3) {
        const h = Math.max(24, (value / max) * 230);
        return `
          <div class="vip-blue-bar-col">
            <div class="vip-blue-bar-value" style="--c:${c1}">${fmtMoney(value)}</div>
            <div class="vip-blue-bar" data-h="${h}" style="--c1:${c1};--c2:${c2};--c3:${c3};height:0;"></div>
            <div class="vip-blue-bar-label">${label}</div>
          </div>`;
    }

    function ensureChart(cb) {
        if (typeof Chart !== 'undefined') return cb();
        console.log('⏳ Cargando Chart.js...');
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
        s.onload = cb;
        document.head.appendChild(s);
    }

    // ========== HELPER: finalizar animaciones antes de imprimir ==========
    // Fuerza contadores KPI y barras 3D a su valor FINAL para que el
    // reporte impreso muestre los CÁLCULOS REALES y no valores iniciales.
    function vipBlueFinalizeForPrint() {
        // 1) Contadores KPI (BAC, PV, EV, AC) → valor numérico final formateado
        document.querySelectorAll('.vip-blue-overlay [data-count]').forEach(el => {
            const target = parseFloat(el.dataset.count) || 0;
            el.textContent = fmtMoney(target);
        });

        // 2) Barras 3D → altura final (evita barras en 0px)
        document.querySelectorAll('.vip-blue-overlay .vip-blue-bar').forEach(bar => {
            if (bar.dataset.h) bar.style.height = bar.dataset.h + 'px';
        });

        // 3) Redibujar cualquier Chart.js pendiente (doughnut)
        try {
            if (typeof Chart !== 'undefined' && Chart.instances) {
                Object.values(Chart.instances).forEach(ch => {
                    try { ch.resize(); ch.update('none'); } catch(e) {}
                });
            }
        } catch(e) {}
    }

    // ========== HELPER: impresión limpia ==========
    function printVipDashboard() {
        const overlay = document.querySelector('.vip-blue-overlay');
        if (!overlay) { window.print(); return; }

        // 🔑 CLAVE: asegurar que TODOS los valores reales estén pintados
        vipBlueFinalizeForPrint();

        // Guardar posición original (por si estaba dentro del Gantt)
        const originalParent = overlay.parentNode;
        const originalNext = overlay.nextSibling;

        // Mover a body para que `body > *:not(.vip-blue-overlay)` funcione
        document.body.appendChild(overlay);

        // Activar flag de impresión
        document.body.classList.add('vip-blue-printing');

        // Pequeño delay para que el navegador recalcule layout
        setTimeout(() => {
            // Reforzar por si algo se reinició al mover el nodo
            vipBlueFinalizeForPrint();

            window.print();

            // Restaurar tras cerrar el diálogo
            const cleanup = () => {
                document.body.classList.remove('vip-blue-printing');
                if (originalParent && originalParent !== document.body) {
                    if (originalNext && originalNext.parentNode === originalParent) {
                        originalParent.insertBefore(overlay, originalNext);
                    } else {
                        originalParent.appendChild(overlay);
                    }
                }
                window.removeEventListener('afterprint', cleanup);
            };
            window.addEventListener('afterprint', cleanup);
            // Fallback por si afterprint no dispara (Safari viejo)
            setTimeout(cleanup, 2000);
        }, 120);
    }
    window.__vipBluePrint = printVipDashboard;

    // ========== 6. DASHBOARD VIP BLUE ==========
    function mostrarDashboardCostosCompleto(evm) {
        console.log('💎 Generando VIP BLUE dashboard de COSTOS...');
        injectVipBlueStyles();

        const existing = document.querySelector('.vip-blue-overlay');
        if (existing) existing.remove();
        const existing2 = document.getElementById('dashboard-evm-custom');
        if (existing2) existing2.remove();

        const ganttContainer = document.getElementById('premiumExecutiveGantt');
        if (!ganttContainer) {
            // Fallback: overlay fijo aunque no exista el Gantt
            console.warn('⚠️ Gantt no encontrado, usando overlay fijo');
        }

        // --- Tareas ---
        const projectIndex = parseInt(ganttContainer?.dataset?.projectIndex) || window.currentProjectIndex || 0;
        const tasks = window.projects?.[projectIndex]?.tasks || [];

        // --- Normalizar EVM ---
        const BAC = +evm.BAC || 1;
        const EV  = +evm.EV  || 0;
        const AC  = +evm.AC  || 0;
        const PV  = +evm.PV  || BAC;
        const CPI = +evm.CPI || (AC > 0 ? EV / AC : 1);
        const SPI_num = PV > 0 ? EV / PV : 1;

        const EAC = CPI > 0 ? BAC / CPI : BAC;
        const ETC = Math.max(0, EAC - AC);
        const VAC = BAC - EAC;
        const pctComplete = BAC > 0 ? (EV / BAC) * 100 : 0;
        const eficiencia = (CPI * 100).toFixed(1);

        // --- Estados ---
        const spiData  = calcularSPI(evm);
        const cpiState = stateOf(CPI, { excelente:1.05, bueno:1.0, atencion:0.95, riesgo:0.85 });
        const spiState = stateOf(SPI_num, { excelente:1.05, bueno:0.95, atencion:0.85, riesgo:0.7 });

        // --- Análisis ejecutivo ---
        let analysis = '';
        if (CPI >= 1 && SPI_num >= 0.95)     analysis = '✅ PROYECTO EN ÓPTIMO ESTADO — Costos y cronograma bajo control ejecutivo.';
        else if (CPI >= 1 && SPI_num < 0.95) analysis = '⚠️ ATENCIÓN CRONOGRAMA — Finanzas sanas, el cronograma requiere aceleración táctica.';
        else if (CPI < 1 && SPI_num >= 0.95) analysis = '⚠️ ATENCIÓN COSTOS — Cronograma en tiempo, sobrecosto detectado. Control presupuestario requerido.';
        else                                  analysis = '🔴 ALERTA EJECUTIVA — Desviación crítica en costos y cronograma. Intervención inmediata.';

        // --- Recomendaciones ---
        const recomendaciones = [];
        if (CPI < 0.85) { recomendaciones.push('Revisar urgentemente la asignación de recursos y horas registradas.'); recomendaciones.push('Implementar control diario de gastos vs presupuesto.'); }
        else if (CPI < 0.95) { recomendaciones.push('Aplicar seguimiento más estricto de horas y estimaciones pendientes.'); recomendaciones.push('Revisar productividad y eliminar cuellos de botella.'); }
        else if (CPI >= 1.1) { recomendaciones.push('Reconocer al equipo por la eficiencia y evaluar ampliación de alcance.'); recomendaciones.push('Documentar las prácticas exitosas para replicarlas.'); }
        else { recomendaciones.push('Mantener el ritmo actual y control semanal de costos.'); }

        if (SPI_num < 0.85) { recomendaciones.push('Priorizar tareas de la ruta crítica y añadir recursos a actividades clave.'); recomendaciones.push('Revisar dependencias y eliminar bloqueos del cronograma.'); }
        else if (SPI_num < 0.95) { recomendaciones.push('Acelerar el ritmo en tareas con holgura disponible.'); recomendaciones.push('Revalidar estimaciones de duración y fechas comprometidas.'); }
        else if (SPI_num > 1.05) { recomendaciones.push('Excelente velocidad — considerar adelantar entregas y liberar holgura.'); }
        else { recomendaciones.push('Cronograma bajo control — continuar monitoreo semanal.'); }

        recomendaciones.push('Convocar reunión ejecutiva de revisión en los próximos 7 días.');

        const maxBar = Math.max(BAC, AC, EV, PV);

        // --- HTML ---
        const html = `
        <div class="vip-blue-overlay">
          <div class="vip-blue-shell">
            <div class="vip-blue-header">
              <div style="display:flex;align-items:center;gap:18px;">
                <div class="vip-blue-logo">💰</div>
                <div>
                  <h1 class="vip-blue-title">EVM EXECUTIVE DASHBOARD</h1>
                  <div class="vip-blue-subtitle">Análisis de Valor Ganado · Nivel Ejecutivo</div>
                </div>
              </div>
              <div style="display:flex;gap:10px;">
                <button class="vip-blue-btn vip-blue-btn-primary" onclick="window.__vipBluePrint()">🖨️ Imprimir</button>
                <button class="vip-blue-btn vip-blue-btn-danger" onclick="document.querySelector('.vip-blue-overlay').remove()">✕ Cerrar</button>
              </div>
            </div>

            <div class="vip-blue-body">

              <div class="vip-blue-status">
                <div class="vip-blue-status-card" style="--c:${cpiState.c}">
                  <div class="vip-blue-status-icon">${cpiState.i}</div>
                  <div class="vip-blue-status-label">Estado Costos · CPI</div>
                  <div class="vip-blue-status-value">${cpiState.t} · ${CPI.toFixed(2)}</div>
                  <div class="vip-blue-status-desc">${CPI >= 1 ? 'Eficiencia financiera — gastando menos de lo ganado.' : 'Sobrecosto detectado — gastando más de lo ganado.'}</div>
                </div>
                <div class="vip-blue-status-card" style="--c:${spiState.c}">
                  <div class="vip-blue-status-icon">${spiState.i}</div>
                  <div class="vip-blue-status-label">Estado Cronograma · SPI</div>
                  <div class="vip-blue-status-value">${spiState.t} · ${spiData.spi}</div>
                  <div class="vip-blue-status-desc">${SPI_num >= 0.95 ? 'Cronograma bajo control — ritmo adecuado.' : 'Retraso detectado — acelerar ejecución.'}</div>
                </div>
              </div>

              <div class="vip-blue-analysis">
                <div class="vip-blue-analysis-icon">🎯</div>
                <div class="vip-blue-analysis-text">${analysis}</div>
              </div>

              <div class="vip-blue-kpi-grid">
                <div class="vip-blue-kpi" style="--c:#60a5fa">
                  <div class="vip-blue-kpi-label">BAC · Presupuesto</div>
                  <div class="vip-blue-kpi-value" data-count="${BAC}">€0</div>
                  <div class="vip-blue-kpi-sub">Presupuesto total autorizado</div>
                </div>
                <div class="vip-blue-kpi" style="--c:#22d3ee">
                  <div class="vip-blue-kpi-label">PV · Valor Planificado</div>
                  <div class="vip-blue-kpi-value" data-count="${PV}">€0</div>
                  <div class="vip-blue-kpi-sub">Trabajo programado a la fecha</div>
                </div>
                <div class="vip-blue-kpi" style="--c:#34d399">
                  <div class="vip-blue-kpi-label">EV · Valor Ganado</div>
                  <div class="vip-blue-kpi-value" data-count="${EV}">€0</div>
                  <div class="vip-blue-kpi-sub">Trabajo realmente completado</div>
                </div>
                <div class="vip-blue-kpi" style="--c:#f87171">
                  <div class="vip-blue-kpi-label">AC · Costo Real</div>
                  <div class="vip-blue-kpi-value" data-count="${AC}">€0</div>
                  <div class="vip-blue-kpi-sub">Costo incurrido real</div>
                </div>
              </div>

              <div class="vip-blue-card">
                <h3 class="vip-blue-card-title">Comparativa PV · EV · AC · BAC</h3>
                <div class="vip-blue-bars-wrap">
                  ${render3DBar('PV',  PV,  maxBar, '#60a5fa', '#1e40af', '#0d1f4d')}
                  ${render3DBar('EV',  EV,  maxBar, '#34d399', '#065f46', '#04361e')}
                  ${render3DBar('AC',  AC,  maxBar, '#f87171', '#991b1b', '#4d0d0d')}
                  ${render3DBar('BAC', BAC, maxBar, '#93c5fd', '#2563eb', '#0c1f4a')}
                </div>
              </div>

              <div class="vip-blue-card">
                <h3 class="vip-blue-card-title">Progreso del Presupuesto</h3>
                <div style="display:flex;justify-content:center;align-items:center;gap:30px;flex-wrap:wrap;">
                  <div style="width:220px;height:220px;position:relative;">
                    <canvas id="vipBlue-doughnut"></canvas>
                    <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none;">
                      <div style="font-size:32px;font-weight:900;color:#fff;text-shadow:0 0 28px rgba(96,165,250,0.85);font-variant-numeric:tabular-nums;">${pctComplete.toFixed(1)}%</div>
                      <div style="font-size:10px;color:#93c5fd;letter-spacing:3px;text-transform:uppercase;margin-top:4px;">Completado</div>
                    </div>
                  </div>
                  <div style="display:flex;flex-direction:column;gap:14px;min-width:200px;">
                    <div style="display:flex;align-items:center;gap:10px;color:#dbeafe;font-size:13px;">
                      <span style="width:14px;height:14px;border-radius:4px;background:linear-gradient(135deg,#60a5fa,#1e40af);box-shadow:0 0 12px #60a5fa;"></span>
                      Ganado <strong style="color:#60a5fa;margin-left:auto;font-variant-numeric:tabular-nums;">${pctComplete.toFixed(1)}%</strong>
                    </div>
                    <div style="display:flex;align-items:center;gap:10px;color:#dbeafe;font-size:13px;">
                      <span style="width:14px;height:14px;border-radius:4px;background:linear-gradient(135deg,#93c5fd,#1e3a8a);box-shadow:0 0 12px #3b82f6;"></span>
                      Restante <strong style="color:#93c5fd;margin-left:auto;font-variant-numeric:tabular-nums;">${(100-pctComplete).toFixed(1)}%</strong>
                    </div>
                    <div style="margin-top:8px;padding:14px;background:linear-gradient(135deg,rgba(30,58,138,0.5),rgba(15,25,60,0.8));border-radius:12px;border:1px solid rgba(96,165,250,0.28);">
                      <div style="color:#93c5fd;font-size:10px;letter-spacing:2px;text-transform:uppercase;">Eficiencia Financiera</div>
                      <div style="font-size:24px;font-weight:900;color:${CPI>=1?'#34d399':'#f87171'};text-shadow:0 0 20px ${CPI>=1?'#34d399':'#f87171'};font-variant-numeric:tabular-nums;">${eficiencia}%</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="vip-blue-card">
                <h3 class="vip-blue-card-title">Pronóstico Financiero</h3>
                <div class="vip-blue-forecast-grid">
                  <div class="vip-blue-forecast" style="--c:#60a5fa">
                    <div class="vip-blue-forecast-label">EAC · Estimado Final</div>
                    <div class="vip-blue-forecast-value">${fmtMoney(EAC)}</div>
                    <div class="vip-blue-forecast-sub">Costo proyectado al cierre</div>
                  </div>
                  <div class="vip-blue-forecast" style="--c:#22d3ee">
                    <div class="vip-blue-forecast-label">ETC · Restante</div>
                    <div class="vip-blue-forecast-value">${fmtMoney(ETC)}</div>
                    <div class="vip-blue-forecast-sub">Falta por gastar</div>
                  </div>
                  <div class="vip-blue-forecast" style="--c:${VAC>=0?'#34d399':'#f87171'}">
                    <div class="vip-blue-forecast-label">VAC · Variación</div>
                    <div class="vip-blue-forecast-value">${VAC>=0?'+':'-'}${fmtMoney(Math.abs(VAC))}</div>
                    <div class="vip-blue-forecast-sub">${VAC>=0?'Ahorro proyectado':'Sobrecosto proyectado'}</div>
                  </div>
                </div>
              </div>

              ${tasks.length > 0 ? `
              <div class="vip-blue-card">
                <h3 class="vip-blue-card-title">Detalle de Tareas</h3>
                <table class="vip-blue-table">
                  <thead>
                    <tr><th>Tarea</th><th style="width:34%">Progreso</th><th>Estado</th><th style="text-align:right;">Horas</th></tr>
                  </thead>
                  <tbody>
                    ${tasks.slice(0,8).map(t => {
                      const prog = Math.max(0, Math.min(100, t.progress || 0));
                      const c = prog >= 100 ? '#34d399' : prog > 0 ? '#f59e0b' : '#93c5fd';
                      const st = prog >= 100 ? 'Completada' : prog > 0 ? 'En curso' : 'Pendiente';
                      return `
                        <tr style="--rowc:${c}">
                          <td>${(t.name || 'Tarea').substring(0,50)}</td>
                          <td>
                            <div style="display:flex;align-items:center;gap:10px;">
                              <div style="flex:1;height:6px;background:rgba(147,197,253,0.12);border-radius:3px;overflow:hidden;box-shadow:inset 0 1px 2px rgba(0,0,0,0.55);">
                                <div style="width:${prog}%;height:100%;background:linear-gradient(90deg,${c},${c}aa);box-shadow:0 0 12px ${c};border-radius:3px;transition:width 1s ease;"></div>
                              </div>
                              <span style="color:${c};font-weight:800;font-size:12px;font-variant-numeric:tabular-nums;">${prog}%</span>
                            </div>
                          </td>
                          <td style="color:${c};font-weight:700;">${st}</td>
                          <td style="font-variant-numeric:tabular-nums;">${(t.estimatedHours||0)}h</td>
                        </tr>`;
                    }).join('')}
                  </tbody>
                </table>
              </div>` : ''}

              <div class="vip-blue-detail-grid">
                <div class="vip-blue-card" style="margin-bottom:0;">
                  <h3 class="vip-blue-card-title">Análisis Detallado</h3>
                  <div class="vip-blue-detail-item"><strong>💰 Situación financiera:</strong> Presupuesto ${fmtMoney(BAC)} · Valor ganado ${fmtMoney(EV)} · Costo real ${fmtMoney(AC)}</div>
                  <div class="vip-blue-detail-item"><strong>⏰ Situación de tiempo:</strong> SPI = ${spiData.spi} · ${spiData.interpretacion}</div>
                  <div class="vip-blue-detail-item"><strong>📊 Progreso:</strong> ${pctComplete.toFixed(1)}% del presupuesto completado</div>
                  <div class="vip-blue-detail-item"><strong>⚡ Eficiencia:</strong> ${eficiencia}% ${CPI >= 1 ? 'por debajo del presupuesto' : 'por encima del presupuesto'}</div>
                  <div class="vip-blue-detail-item" style="border-left-color:${VAC>=0?'#34d399':'#f87171'};">
                    <strong>${VAC>=0?'✅ Buenas noticias':'⚠️ Alerta'}:</strong> ${VAC>=0?'Ahorro estimado de ':'Sobrecosto estimado de '}${fmtMoney(Math.abs(VAC))}
                  </div>
                </div>

                <div class="vip-blue-card" style="margin-bottom:0;">
                  <h3 class="vip-blue-card-title">Recomendaciones Ejecutivas</h3>
                  <div class="vip-blue-recommend" style="grid-template-columns:1fr;">
                    ${recomendaciones.map((r,i) => `
                      <div class="vip-blue-rec-item">
                        <div class="vip-blue-rec-icon">${i+1}</div>
                        <div>${r}</div>
                      </div>`).join('')}
                  </div>
                  <div style="margin-top:16px;padding:14px;background:linear-gradient(135deg,rgba(30,58,138,0.5),rgba(15,25,60,0.8));border-radius:12px;border:1px solid rgba(96,165,250,0.28);">
                    <div style="color:#93c5fd;font-size:10px;letter-spacing:2px;text-transform:uppercase;">📅 Próxima revisión ejecutiva</div>
                    <div style="color:#fff;font-size:14px;font-weight:700;margin-top:4px;">${new Date(Date.now() + 7*86400000).toLocaleDateString('es-ES')}</div>
                  </div>
                </div>
              </div>

            </div>

            <div class="vip-blue-footer">
              Reporte generado ${new Date().toLocaleString('es-ES')} · Sistema EVM Ejecutivo · CONFIDENCIAL
            </div>
          </div>
        </div>`;

        // Insertar (en el Gantt si existe, si no, en body)
        if (ganttContainer) ganttContainer.insertAdjacentHTML('beforeend', html);
        else document.body.insertAdjacentHTML('beforeend', html);

        // --- Animaciones KPI ---
        setTimeout(() => {
            document.querySelectorAll('.vip-blue-overlay [data-count]').forEach(el => {
                const target = parseFloat(el.dataset.count) || 0;
                const dur = 1400, start = performance.now();
                (function tick(now){
                    const p = Math.min(1, (now - start) / dur);
                    const e = 1 - Math.pow(1 - p, 3);
                    el.textContent = fmtMoney(target * e);
                    if (p < 1) requestAnimationFrame(tick);
                })(performance.now());
            });
        }, 200);

        // --- Animación barras 3D ---
        setTimeout(() => {
            document.querySelectorAll('.vip-blue-overlay .vip-blue-bar').forEach((bar, i) => {
                setTimeout(() => { bar.style.height = bar.dataset.h + 'px'; }, i * 120);
            });
        }, 300);

        // --- Doughnut Chart ---
        ensureChart(() => {
            const cv = document.getElementById('vipBlue-doughnut');
            if (!cv) return;
            const ctx = cv.getContext('2d');
            const gBlue = ctx.createLinearGradient(0, 0, 0, 220);
            gBlue.addColorStop(0, '#60a5fa'); gBlue.addColorStop(1, '#1e3a8a');
            const gDark = ctx.createLinearGradient(0, 0, 0, 220);
            gDark.addColorStop(0, '#1e40af'); gDark.addColorStop(1, '#0a1535');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Completado', 'Restante'],
                    datasets: [{
                        data: [pctComplete, 100 - pctComplete],
                        backgroundColor: [gBlue, gDark],
                        borderWidth: 0,
                        hoverOffset: 12
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    cutout: '74%',
                    animation: { animateRotate: true, duration: 1600, easing: 'easeOutQuart' },
                    plugins: { legend: { display: false }, tooltip: { enabled: false } }
                }
            });
        });

        console.log('✅ VIP BLUE Dashboard de COSTOS cargado');
    }

    // ========== 7. OBSERVER DE SEGURIDAD ==========
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.id === 'dashboard-evm-premium' && modoActual === 'costs' && window.lastEVMPreviewData) {
                        console.log('🔧 Corrección automática aplicada');
                        setTimeout(() => {
                            const dashboard = document.getElementById('dashboard-evm-premium');
                            if (dashboard) {
                                dashboard.remove();
                                mostrarDashboardCostosCompleto(window.lastEVMPreviewData);
                            }
                        }, 50);
                    }
                });
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // ========== 8. FALLBACK CTRL+P DIRECTO ==========
    window.addEventListener('beforeprint', () => {
        if (document.querySelector('.vip-blue-overlay')) {
            // 🔑 CLAVE: forzar valores reales antes de que el navegador capture
            vipBlueFinalizeForPrint();

            document.body.classList.add('vip-blue-printing');
            const overlay = document.querySelector('.vip-blue-overlay');
            if (overlay.parentNode !== document.body) {
                window.__vipBluePrintOriginalParent = overlay.parentNode;
                document.body.appendChild(overlay);
            }
        }
    });
    window.addEventListener('afterprint', () => {
        document.body.classList.remove('vip-blue-printing');
        const overlay = document.querySelector('.vip-blue-overlay');
        if (overlay && window.__vipBluePrintOriginalParent && overlay.parentNode === document.body) {
            window.__vipBluePrintOriginalParent.appendChild(overlay);
            window.__vipBluePrintOriginalParent = null;
        }
    });

    console.log('✅ SISTEMA VIP BLUE LISTO — EVM Ejecutivo con SPI y Cronograma');
})();