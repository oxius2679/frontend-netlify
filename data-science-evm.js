/**
 * ============================================================
 *  🧠 DATA SCIENCE EVM — VIP EXECUTIVE ANALYTICS ENGINE v1.0
 * ============================================================
 *  Archivo externo 100% autocontenido.
 *  NO modifica tu código existente. NO toca el dashboard EVM.
 *  Solo añade un botón "🧠 IA Analytics" y un overlay aparte.
 *
 *  Uso en index.html (antes de </body>):
 *      <script src="data-science-evm.js"></script>
 * ============================================================
 */
(function () {
  'use strict';

  /* ==========================================================
     SECCIÓN 0 · CONFIGURACIÓN
     ========================================================== */
    const CFG = {
    name: 'EVM Data Science VIP',
    version: '1.0.0',
    mcIterations: 500,
    nnEpochs: 800,
    nnLearningRate: 0.08,
    kClusters: 3,
    autoOpenAfterMs: 0,
    defaultRole: 'PMO'
  };

  // Rol activo (persiste durante la sesión del overlay)
  let ROL_ACTIVO = CFG.defaultRole;

  /* ==========================================================
     SECCIÓN 1 · ESTILOS VIP (autoinyectados)
     ========================================================== */
  function injectStyles() {
    if (document.getElementById('ds-evm-styles')) return;
    const style = document.createElement('style');
    style.id = 'ds-evm-styles';
    style.textContent = `
      @keyframes dsFadeIn { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
      @keyframes dsPulse  { 0%,100%{transform:scale(1);} 50%{transform:scale(1.06);} }
      @keyframes dsShine  { 0%{background-position:-200% 0;} 100%{background-position:200% 0;} }
      @keyframes dsGlow   { 0%,100%{box-shadow:0 0 20px rgba(139,92,246,0.5);} 50%{box-shadow:0 0 40px rgba(139,92,246,0.85);} }
      @keyframes dsTyping { 0%,60%,100%{opacity:0.3;} 30%{opacity:1;} }

      .ds-btn-ia {
        padding: 10px 20px; border-radius: 12px; font-weight: 800; font-size: 12px;
        cursor: pointer; letter-spacing: 1px; text-transform: uppercase;
        transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
        border: 1px solid rgba(167,139,250,0.7);
        background: linear-gradient(135deg, rgba(139,92,246,0.35), rgba(88,28,135,0.15));
        color: #ddd6fe; font-family: inherit;
        box-shadow: 0 4px 18px rgba(139,92,246,0.4), inset 0 1px 0 rgba(255,255,255,0.15);
      }
      .ds-btn-ia:hover { transform: translateY(-2px) scale(1.04); box-shadow: 0 12px 32px rgba(139,92,246,0.7); }

      .ds-overlay {
        position: fixed; inset: 0; z-index: 2147483647;
        background:
          radial-gradient(circle at 15% 10%, rgba(139,92,246,0.40) 0%, transparent 45%),
          radial-gradient(circle at 85% 90%, rgba(14,165,233,0.30) 0%, transparent 45%),
          radial-gradient(circle at 50% 50%, #0a0620 0%, #02010a 100%);
        padding: 22px; overflow-y: auto;
        font-family: 'Inter','Segoe UI',system-ui,-apple-system,sans-serif;
        color: #e9d5ff;
        animation: dsFadeIn 0.55s cubic-bezier(0.34,1.56,0.64,1);
      }
      .ds-overlay * { box-sizing: border-box; }

      .ds-shell {
        max-width: 1480px; margin: 0 auto;
        background: linear-gradient(145deg, rgba(24,16,60,0.94), rgba(6,4,24,0.98));
        border: 1px solid rgba(167,139,250,0.35);
        border-radius: 28px;
        box-shadow: 0 30px 90px rgba(0,0,0,0.85), 0 0 130px rgba(139,92,246,0.25), inset 0 1px 0 rgba(196,181,253,0.2);
        overflow: hidden; backdrop-filter: blur(20px);
      }
           .ds-header {
        padding: 22px 34px;
        background: linear-gradient(135deg, rgba(30,12,70,0.95), rgba(40,20,90,0.55));
        border-bottom: 1px solid rgba(167,139,250,0.22);
        display: flex; flex-direction: column;
        gap: 16px;
      }
      .ds-header-top {
        display: flex; justify-content: space-between; align-items: center;
        flex-wrap: wrap; gap: 16px;
      }
      .ds-header-bottom {
        display: flex; justify-content: center; align-items: center;
        padding-top: 14px;
        border-top: 1px solid rgba(167,139,250,0.15);
      }
      .ds-header-brand { display: flex; align-items: center; gap: 18px; }
      .ds-logo {
        width: 62px; height: 62px; border-radius: 18px;
        background: linear-gradient(135deg, #a78bfa, #7c3aed, #4c1d95, #0ea5e9);
        background-size: 300% 300%;
        animation: dsShine 5s linear infinite, dsGlow 3s ease-in-out infinite;
        display: flex; align-items: center; justify-content: center;
        font-size: 30px;
        box-shadow: 0 10px 30px rgba(139,92,246,0.65), inset 0 2px 4px rgba(255,255,255,0.5);
      }
      .ds-title {
        font-size: 22px; font-weight: 900; letter-spacing: 2px; margin: 0;
        background: linear-gradient(135deg, #ffffff 0%, #ddd6fe 45%, #ffffff 100%);
        background-size: 200% auto;
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        background-clip: text; animation: dsShine 6s linear infinite;
      }
      .ds-subtitle { color: #a78bfa; font-size: 11px; margin-top: 5px; letter-spacing: 3px; text-transform: uppercase; }
          .ds-header-actions {
        display: flex; gap: 8px; flex-wrap: wrap;
        justify-content: flex-end;
      }
      .ds-btn {
        padding: 10px 18px; border-radius: 12px; font-weight: 800; font-size: 12px;
        cursor: pointer; letter-spacing: 1px; text-transform: uppercase;
        transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
        border: 1px solid; font-family: inherit;
      }
      .ds-btn-primary { background: linear-gradient(135deg, rgba(139,92,246,0.35), rgba(88,28,135,0.1)); border-color: rgba(167,139,250,0.7); color: #ddd6fe; }
      .ds-btn-primary:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 12px 32px rgba(139,92,246,0.7); }
      .ds-btn-danger { background: linear-gradient(135deg, rgba(239,68,68,0.22), rgba(239,68,68,0.04)); border-color: rgba(239,68,68,0.6); color: #fca5a5; }
      .ds-btn-danger:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 10px 28px rgba(239,68,68,0.5); }

      .ds-body { padding: 30px 34px; }
      .ds-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-bottom: 22px; }
      .ds-grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; margin-bottom: 22px; }
      .ds-grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-bottom: 22px; }

      .ds-card {
        position: relative; border-radius: 20px; padding: 24px;
        background: linear-gradient(160deg, rgba(45,25,90,0.55), rgba(12,6,30,0.95));
        border: 1px solid rgba(167,139,250,0.22);
        box-shadow: 0 22px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(196,181,253,0.12);
        overflow: hidden;
      }
      .ds-card::before {
        content: ''; position: absolute; top: 0; left: 8%; right: 8%; height: 1px;
        background: linear-gradient(90deg, transparent, rgba(167,139,250,0.8), transparent);
        box-shadow: 0 0 12px rgba(167,139,250,0.7);
      }
      .ds-card-title {
        font-size: 13px; font-weight: 800; color: #ddd6fe; letter-spacing: 2px;
        text-transform: uppercase; margin: 0 0 18px 0;
        display: flex; align-items: center; gap: 10px;
      }
      .ds-card-title::before {
        content: ''; width: 4px; height: 16px;
        background: linear-gradient(180deg, #c4b5fd, #7c3aed);
        border-radius: 2px; box-shadow: 0 0 12px rgba(167,139,250,0.9);
      }

      .ds-kpi {
        padding: 20px 18px; border-radius: 16px;
        background: linear-gradient(160deg, rgba(45,25,90,0.6), rgba(10,5,25,0.95));
        border: 1px solid rgba(167,139,250,0.2);
        box-shadow: 0 12px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(196,181,253,0.12);
        position: relative; overflow: hidden;
        transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
      }
      .ds-kpi:hover { transform: translateY(-6px); box-shadow: 0 22px 60px rgba(0,0,0,0.7), 0 0 50px -10px var(--c, #a78bfa); }
      .ds-kpi::before {
        content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
        background: linear-gradient(90deg, transparent, var(--c, #a78bfa), transparent);
        box-shadow: 0 0 16px var(--c, #a78bfa);
      }
      .ds-kpi-label { font-size: 10px; letter-spacing: 2.5px; color: #a78bfa; text-transform: uppercase; margin-bottom: 8px; }
      .ds-kpi-value { font-size: 26px; font-weight: 900; color: #fff; letter-spacing: -0.5px; font-variant-numeric: tabular-nums; line-height: 1.1; }
      .ds-kpi-sub { font-size: 10px; color: #8b7cb8; margin-top: 6px; letter-spacing: 0.8px; }

      .ds-story {
        padding: 26px 30px; border-radius: 18px;
        background: linear-gradient(135deg, rgba(139,92,246,0.15), rgba(30,12,70,0.5));
        border-left: 4px solid #a78bfa;
        margin-bottom: 24px; font-size: 15px; line-height: 1.75; color: #e9d5ff;
        box-shadow: inset 0 1px 0 rgba(196,181,253,0.15), 0 12px 40px rgba(0,0,0,0.4);
      }
      .ds-story strong { color: #c4b5fd; }
      .ds-story em { color: #67e8f9; font-style: normal; font-weight: 700; }

      .ds-rec {
        padding: 16px 18px; border-radius: 12px; margin-bottom: 10px;
        background: linear-gradient(90deg, rgba(45,25,90,0.5), rgba(12,6,30,0.35));
        border-left: 3px solid var(--c, #a78bfa);
        display: flex; gap: 14px; align-items: flex-start;
        transition: all 0.3s ease;
      }
      .ds-rec:hover { transform: translateX(4px); background: linear-gradient(90deg, rgba(139,92,246,0.35), rgba(30,12,70,0.5)); }
      .ds-rec-badge {
        flex-shrink: 0; width: 32px; height: 32px; border-radius: 10px;
        display: flex; align-items: center; justify-content: center;
        font-weight: 900; font-size: 13px;
        background: linear-gradient(135deg, var(--c, #a78bfa), color-mix(in srgb, var(--c, #a78bfa) 60%, black));
        color: #1a0a2e; box-shadow: 0 0 16px var(--c, #a78bfa);
      }
      .ds-rec-text { flex: 1; font-size: 13px; line-height: 1.6; color: #ddd6fe; }
      .ds-rec-title { font-weight: 800; color: #fff; margin-bottom: 4px; font-size: 13.5px; }
      .ds-rec-detail { color: #b8a4e8; font-size: 12px; }

      .ds-heat { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px,1fr)); gap: 8px; }
      .ds-heat-cell {
        padding: 14px 10px; border-radius: 10px; text-align: center;
        font-size: 11px; font-weight: 700; letter-spacing: 0.5px;
        background: var(--bg); color: #fff;
        border: 1px solid var(--bd); box-shadow: 0 0 20px -6px var(--bd);
      }
      .ds-heat-cell small { display: block; font-size: 9px; opacity: 0.85; margin-top: 3px; font-weight: 500; }

      .ds-chat-wrap { display: flex; flex-direction: column; height: 480px; }
      .ds-chat-log {
        flex: 1; overflow-y: auto; padding: 16px;
        background: rgba(10,5,25,0.6); border-radius: 14px; margin-bottom: 14px;
        border: 1px solid rgba(167,139,250,0.15);
      }
      .ds-chat-msg { margin-bottom: 14px; animation: dsFadeIn 0.3s ease; }
      .ds-chat-msg.user { text-align: right; }
      .ds-chat-bubble {
        display: inline-block; max-width: 85%; padding: 11px 15px; border-radius: 14px;
        font-size: 13.5px; line-height: 1.6; text-align: left;
      }
      .ds-chat-msg.user .ds-chat-bubble {
        background: linear-gradient(135deg, #7c3aed, #4c1d95); color: #fff;
        border-bottom-right-radius: 4px;
      }
      .ds-chat-msg.bot .ds-chat-bubble {
        background: rgba(45,25,90,0.7); color: #e9d5ff;
        border: 1px solid rgba(167,139,250,0.25);
        border-bottom-left-radius: 4px;
      }
      .ds-chat-input-row { display: flex; gap: 10px; }
      .ds-chat-input {
        flex: 1; padding: 12px 16px; border-radius: 12px;
        background: rgba(10,5,25,0.75); border: 1px solid rgba(167,139,250,0.3);
        color: #fff; font-size: 13.5px; font-family: inherit; outline: none;
      }
      .ds-chat-input:focus { border-color: #a78bfa; box-shadow: 0 0 20px rgba(167,139,250,0.4); }

      .ds-btn-mic {
        padding: 12px 16px; border-radius: 12px;
        border: 1px solid rgba(167,139,250,0.5);
        background: linear-gradient(135deg, rgba(139,92,246,0.2), rgba(88,28,135,0.1));
        color: #ddd6fe; font-size: 18px; cursor: pointer;
        transition: all 0.25s ease; font-family: inherit;
        min-width: 50px;
      }
      .ds-btn-mic:hover {
        background: linear-gradient(135deg, rgba(139,92,246,0.4), rgba(88,28,135,0.25));
        box-shadow: 0 0 20px rgba(139,92,246,0.5);
      }
      .ds-btn-mic.ds-recording {
        background: linear-gradient(135deg, #ef4444, #991b1b);
        border-color: #ef4444; color: #fff;
        animation: dsMicPulse 1s ease-in-out infinite;
      }
      @keyframes dsMicPulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.7); }
        50% { box-shadow: 0 0 0 12px rgba(239,68,68,0); }
      }
      .ds-mic-status {
        padding: 8px 14px; border-radius: 10px; margin-bottom: 10px;
        background: rgba(239,68,68,0.15); border-left: 3px solid #ef4444;
        color: #fca5a5; font-size: 12px; font-weight: 700;
        display: none;
      }
      .ds-mic-status.ds-active { display: block; }

      .ds-chat-send {
        padding: 12px 22px; border-radius: 12px; font-weight: 800; font-size: 12px;
        cursor: pointer; letter-spacing: 1px; text-transform: uppercase;
        border: 1px solid rgba(167,139,250,0.7);
        background: linear-gradient(135deg, #7c3aed, #4c1d95); color: #fff;
        font-family: inherit;
      }
      .ds-chat-send:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(139,92,246,0.6); }
      .ds-chat-suggest { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
      .ds-chat-chip {
        padding: 6px 12px; border-radius: 100px; font-size: 11px; font-weight: 600;
        background: rgba(139,92,246,0.18); border: 1px solid rgba(167,139,250,0.4);
        color: #ddd6fe; cursor: pointer; transition: all 0.25s;
      }
      .ds-chat-chip:hover { background: rgba(139,92,246,0.4); transform: translateY(-1px); }

      .ds-cluster { display: flex; gap: 12px; flex-wrap: wrap; }
      .ds-cluster-item {
        flex: 1; min-width: 140px; padding: 16px; border-radius: 12px;
        background: var(--bg); border: 1px solid var(--bd);
        text-align: center;
      }
      .ds-cluster-item strong { display: block; font-size: 22px; color: var(--c); }
      .ds-cluster-item span { font-size: 11px; color: #a78bfa; letter-spacing: 1.5px; text-transform: uppercase; }

      .ds-bar { height: 8px; border-radius: 4px; background: rgba(167,139,250,0.15); overflow: hidden; margin-top: 10px; }
      .ds-bar-fill { height: 100%; border-radius: 4px; background: linear-gradient(90deg, var(--c, #a78bfa), color-mix(in srgb, var(--c, #a78bfa) 70%, #fff)); box-shadow: 0 0 12px var(--c, #a78bfa); transition: width 1.2s cubic-bezier(0.34,1.56,0.64,1); }

      .ds-anomaly {
        padding: 12px 14px; border-radius: 10px; margin-bottom: 8px;
        background: linear-gradient(90deg, rgba(239,68,68,0.15), rgba(12,6,30,0.4));
        border-left: 3px solid #ef4444; font-size: 12.5px; color: #fecaca;
      }
      .ds-anomaly strong { color: #fca5a5; }



      .ds-role-selector {
        display: flex; gap: 4px; padding: 4px;
        background: rgba(10,5,25,0.6);
        border: 1px solid rgba(167,139,250,0.3);
        border-radius: 12px;
      }
      .ds-role-btn {
        padding: 8px 12px; border-radius: 8px; font-size: 11px; font-weight: 700;
        cursor: pointer; transition: all 0.25s ease;
        background: transparent; border: none; color: #a78bfa;
        font-family: inherit; letter-spacing: 0.5px; white-space: nowrap;
      }
      .ds-role-btn:hover {
        background: rgba(139,92,246,0.15); color: #ddd6fe;
      }
      .ds-role-btn.ds-role-active {
        background: linear-gradient(135deg, #7c3aed, #4c1d95); color: #fff;
        box-shadow: 0 0 16px rgba(139,92,246,0.6);
      }
      .ds-role-badge {
        display: inline-block; padding: 2px 8px; border-radius: 6px;
        font-size: 10px; font-weight: 800; letter-spacing: 1px;
        background: rgba(139,92,246,0.25); color: #ddd6fe;
        margin-left: 8px;
      }



      /* ⚖️ PANEL DE COMPARATIVA */
      .ds-comparison-panel {
        position: fixed; inset: 40px; z-index: 2147483647;
        background: linear-gradient(145deg, rgba(24,16,60,0.99), rgba(6,4,24,1));
        border: 1px solid rgba(167,139,250,0.4);
        border-radius: 22px;
        box-shadow: 0 40px 100px rgba(0,0,0,0.8), 0 0 120px rgba(139,92,246,0.2);
        display: flex; flex-direction: column;
        overflow: hidden;
        animation: dsFadeIn 0.4s cubic-bezier(0.34,1.56,0.64,1);
      }
      .ds-comparison-header {
        padding: 22px 28px;
        background: linear-gradient(135deg, rgba(30,12,70,0.95), rgba(40,20,90,0.55));
        border-bottom: 1px solid rgba(167,139,250,0.25);
        display: flex; justify-content: space-between; align-items: center;
      }
      .ds-comparison-title {
        font-size: 16pt; font-weight: 900; color: #ddd6fe;
        letter-spacing: 2px; text-transform: uppercase;
        display: flex; align-items: center; gap: 12px;
      }
      .ds-comparison-body {
        flex: 1; overflow-y: auto; padding: 26px 30px;
      }
      .ds-comparison-selector {
        display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 22px;
        padding: 14px 18px; border-radius: 12px;
        background: rgba(10,5,25,0.5); border: 1px solid rgba(167,139,250,0.2);
      }
      .ds-comparison-chip {
        padding: 8px 14px; border-radius: 100px; font-size: 12px; font-weight: 700;
        background: rgba(139,92,246,0.15); border: 1px solid rgba(167,139,250,0.4);
        color: #ddd6fe; cursor: pointer; transition: all 0.25s;
      }
      .ds-comparison-chip:hover { background: rgba(139,92,246,0.4); }
      .ds-comparison-chip.ds-comparison-selected {
        background: linear-gradient(135deg, #7c3aed, #4c1d95); color: #fff;
        box-shadow: 0 0 16px rgba(139,92,246,0.6);
      }
      .ds-comparison-grid {
        display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 16px; margin-bottom: 24px;
      }
      .ds-comparison-card {
        padding: 20px; border-radius: 16px;
        background: linear-gradient(160deg, rgba(45,25,90,0.6), rgba(10,5,25,0.95));
        border: 1px solid rgba(167,139,250,0.25);
        position: relative; overflow: hidden;
      }
      .ds-comparison-card::before {
        content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
        background: linear-gradient(90deg, transparent, var(--c, #a78bfa), transparent);
        box-shadow: 0 0 16px var(--c, #a78bfa);
      }
      .ds-comparison-card-name {
        font-size: 14px; font-weight: 900; color: #fff; margin-bottom: 4px;
        letter-spacing: 0.5px;
      }
      .ds-comparison-card-rank {
        display: inline-block; padding: 3px 10px; border-radius: 100px;
        background: var(--c, #a78bfa); color: #1a0a2e;
        font-size: 10px; font-weight: 900; letter-spacing: 1px; margin-bottom: 12px;
      }
      .ds-comparison-card-metrics {
        display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px;
      }
      .ds-comparison-metric {
        padding: 10px 12px; border-radius: 10px;
        background: rgba(10,5,25,0.6);
      }
      .ds-comparison-metric-label {
        font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
        color: #a78bfa; margin-bottom: 4px;
      }
      .ds-comparison-metric-value {
        font-size: 16px; font-weight: 900; color: #fff;
        font-variant-numeric: tabular-nums;
      }
      .ds-comparison-table {
        width: 100%; border-collapse: collapse; margin-bottom: 24px;
        background: rgba(10,5,25,0.4); border-radius: 12px; overflow: hidden;
      }
      .ds-comparison-table th {
        padding: 12px 14px; text-align: left;
        font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
        color: #a78bfa; font-weight: 800;
        border-bottom: 1px solid rgba(167,139,250,0.25);
      }
      .ds-comparison-table td {
        padding: 12px 14px; font-size: 13px; color: #ddd6fe;
        border-bottom: 1px solid rgba(167,139,250,0.1);
        font-variant-numeric: tabular-nums;
      }
      .ds-comparison-table td:first-child { font-weight: 700; color: #fff; }
      .ds-comparison-table .ds-col-value { text-align: right; font-weight: 800; }
      .ds-comparison-analysis {
        padding: 20px 24px; border-radius: 14px; margin-top: 8px;
        background: linear-gradient(135deg, rgba(139,92,246,0.12), rgba(30,12,70,0.4));
        border-left: 4px solid #a78bfa;
        font-size: 13.5px; line-height: 1.7; color: #e9d5ff;
      }
      .ds-comparison-analysis strong { color: #c4b5fd; }
      .ds-comparison-empty {
        text-align: center; padding: 40px 20px;
        color: #8b7cb8; font-size: 13px; letter-spacing: 1px;
      }



      /* 📚 PANEL DE HISTORIAL */
      .ds-history-panel {
        position: fixed; top: 0; right: 0; bottom: 0; width: 520px; max-width: 100vw;
        background: linear-gradient(160deg, rgba(24,16,60,0.99), rgba(6,4,24,1));
        border-left: 1px solid rgba(167,139,250,0.4);
        box-shadow: -20px 0 60px rgba(0,0,0,0.7);
        z-index: 2147483647;
        display: flex; flex-direction: column;
        animation: dsSlideIn 0.35s cubic-bezier(0.34,1.56,0.64,1);
      }
      @keyframes dsSlideIn {
        from { transform: translateX(100%); opacity: 0; }
        to   { transform: translateX(0); opacity: 1; }
      }
      .ds-history-header {
        padding: 20px 24px;
        border-bottom: 1px solid rgba(167,139,250,0.25);
        display: flex; justify-content: space-between; align-items: center;
      }
      .ds-history-title {
        font-size: 16px; font-weight: 900; color: #ddd6fe;
        letter-spacing: 2px; text-transform: uppercase;
        display: flex; align-items: center; gap: 10px;
      }
      .ds-history-search {
        padding: 12px 24px; border-bottom: 1px solid rgba(167,139,250,0.15);
        display: flex; gap: 8px;
      }
      .ds-history-input {
        flex: 1; padding: 10px 14px; border-radius: 10px;
        background: rgba(10,5,25,0.75); border: 1px solid rgba(167,139,250,0.3);
        color: #fff; font-size: 13px; font-family: inherit; outline: none;
      }
      .ds-history-input:focus { border-color: #a78bfa; box-shadow: 0 0 16px rgba(167,139,250,0.4); }
      .ds-history-list {
        flex: 1; overflow-y: auto; padding: 16px 20px;
      }
      .ds-history-item {
        padding: 14px 16px; border-radius: 12px; margin-bottom: 10px;
        background: linear-gradient(90deg, rgba(45,25,90,0.5), rgba(12,6,30,0.35));
        border-left: 3px solid #a78bfa;
        cursor: pointer; transition: all 0.25s ease;
        position: relative;
      }
      .ds-history-item:hover {
        background: linear-gradient(90deg, rgba(139,92,246,0.35), rgba(30,12,70,0.5));
        transform: translateX(-3px);
      }
      .ds-history-item-meta {
        display: flex; justify-content: space-between; align-items: center;
        font-size: 10px; color: #a78bfa; letter-spacing: 1.5px;
        margin-bottom: 6px; text-transform: uppercase;
      }
      .ds-history-item-rol {
        padding: 2px 8px; border-radius: 6px;
        background: rgba(139,92,246,0.3); color: #ddd6fe;
        font-weight: 800;
      }
      .ds-history-item-question {
        font-size: 13px; font-weight: 700; color: #fff;
        margin-bottom: 4px; line-height: 1.4;
      }
      .ds-history-item-answer {
        font-size: 11.5px; color: #b8a4e8; line-height: 1.5;
        display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .ds-history-item-delete {
        position: absolute; top: 8px; right: 8px;
        width: 22px; height: 22px; border-radius: 6px;
        background: rgba(239,68,68,0.2); border: 1px solid rgba(239,68,68,0.4);
        color: #fca5a5; font-size: 11px; font-weight: 800;
        cursor: pointer; display: none; align-items: center; justify-content: center;
      }
      .ds-history-item:hover .ds-history-item-delete { display: flex; }
      .ds-history-empty {
        text-align: center; padding: 60px 20px;
        color: #6b4fa8; font-size: 13px; letter-spacing: 1px;
      }
      .ds-history-loading {
        text-align: center; padding: 40px 20px;
        color: #a78bfa; font-size: 13px;
      }


      .ds-footer {
        text-align: center; padding: 18px;
        color: #6b4fa8; font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
        border-top: 1px solid rgba(167,139,250,0.15); margin-top: 20px;
      }

      @media (max-width: 900px) {
        .ds-grid-2, .ds-grid-3, .ds-grid-4 { grid-template-columns: 1fr; }
      }
    `;
    document.head.appendChild(style);
  }

  /* ==========================================================
     SECCIÓN 2 · DATA EXTRACTOR
     Lee el dashboard EVM abierto + window.projects
     ========================================================== */
  const DataExtractor = {
    extract() {
      const overlay = document.querySelector('.vip-blue-overlay');
      if (!overlay) return null;

      // KPIs desde el DOM (los valores ya renderizados)
      const getVal = (labelText) => {
        const kpis = overlay.querySelectorAll('.vip-blue-kpi');
        for (const k of kpis) {
          const label = k.querySelector('.vip-blue-kpi-label')?.textContent || '';
          if (label.toUpperCase().includes(labelText)) {
            const v = k.querySelector('.vip-blue-kpi-value')?.textContent || '0';
            return parseFloat(v.replace(/[^\d.-]/g, '')) || 0;
          }
        }
        return 0;
      };

      const BAC = getVal('BAC');
      const PV  = getVal('PV');
      const EV  = getVal('EV');
      const AC  = getVal('AC');

      // Proyecto activo
      const gantt = document.getElementById('premiumExecutiveGantt');
      const pIdx = parseInt(gantt?.dataset?.projectIndex) || window.currentProjectIndex || 0;
      const project = window.projects?.[pIdx] || null;
      const tasks = project?.tasks || [];

      // Estados desde tabla del dashboard
      const statuses = [];
      overlay.querySelectorAll('.vip-blue-table tbody tr').forEach(tr => {
        const tds = tr.querySelectorAll('td');
        if (tds.length >= 4) {
          statuses.push({
            name: tds[0].textContent.trim(),
            progress: parseFloat(tds[1].textContent.replace(/[^\d.-]/g, '')) || 0,
            status: tds[2].textContent.trim(),
            hours: parseFloat(tds[3].textContent.replace(/[^\d.-]/g, '')) || 0
          });
        }
      });

      return { BAC, PV, EV, AC, project, tasks, statuses, projectIndex: pIdx };
    }
  };

  /* ==========================================================
     SECCIÓN 3 · STATISTICS ENGINE
     ========================================================== */
  const Stats = {
    mean(a) { return a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0; },
    std(a) {
      if (a.length < 2) return 0;
      const m = this.mean(a);
      return Math.sqrt(a.reduce((s, v) => s + (v - m) ** 2, 0) / (a.length - 1));
    },
    median(a) {
      if (!a.length) return 0;
      const s = [...a].sort((x, y) => x - y);
      const mid = Math.floor(s.length / 2);
      return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
    },
    percentile(a, p) {
      if (!a.length) return 0;
      const s = [...a].sort((x, y) => x - y);
      const idx = (s.length - 1) * p;
      const lo = Math.floor(idx), hi = Math.ceil(idx);
      return lo === hi ? s[lo] : s[lo] + (s[hi] - s[lo]) * (idx - lo);
    },
    correlation(x, y) {
      const n = Math.min(x.length, y.length);
      if (n < 2) return 0;
      const mx = this.mean(x.slice(0, n)), my = this.mean(y.slice(0, n));
      let num = 0, dx = 0, dy = 0;
      for (let i = 0; i < n; i++) {
        const a = x[i] - mx, b = y[i] - my;
        num += a * b; dx += a * a; dy += b * b;
      }
      return dx && dy ? num / Math.sqrt(dx * dy) : 0;
    },
    linearRegression(x, y) {
      const n = x.length;
      if (n < 2) return { slope: 0, intercept: y[0] || 0, r2: 0 };
      const mx = this.mean(x), my = this.mean(y);
      let num = 0, den = 0;
      for (let i = 0; i < n; i++) { num += (x[i] - mx) * (y[i] - my); den += (x[i] - mx) ** 2; }
      const slope = den ? num / den : 0;
      const intercept = my - slope * mx;
      // R²
      const yhat = x.map(v => slope * v + intercept);
      const ssRes = y.reduce((s, v, i) => s + (v - yhat[i]) ** 2, 0);
      const ssTot = y.reduce((s, v) => s + (v - my) ** 2, 0);
      const r2 = ssTot ? 1 - ssRes / ssTot : 0;
      return { slope, intercept, r2 };
    },
    zScores(a) {
      const m = this.mean(a), s = this.std(a);
      return s ? a.map(v => (v - m) / s) : a.map(() => 0);
    }
  };

  /* ==========================================================
     SECCIÓN 4 · FORECASTER (Holt-Winters + Monte Carlo)
     ========================================================== */
  const Forecaster = {
    // Suavizado exponencial simple (para series cortas de EVM)
    exponentialSmoothing(series, alpha = 0.4, periods = 3) {
      if (!series.length) return [];
      let level = series[0];
      const fitted = [level];
      for (let i = 1; i < series.length; i++) {
        level = alpha * series[i] + (1 - alpha) * level;
        fitted.push(level);
      }
      const forecast = [];
      for (let i = 0; i < periods; i++) forecast.push(level);
      return forecast;
    },

    // Monte Carlo para simular EAC (Estimate At Completion)
    monteCarloEAC(BAC, AC, EV, iterations = 500) {
      const baseCPI = AC > 0 ? EV / AC : 1;
      const results = [];
      for (let i = 0; i < iterations; i++) {
        // Ruido triangular (±20% sobre el CPI)
        const noise = (Math.random() - 0.5) * 0.4;
        const cpiSim = Math.max(0.3, baseCPI + noise);
        const eacSim = BAC / cpiSim;
        results.push(eacSim);
      }
      results.sort((a, b) => a - b);
      return {
        p10: Stats.percentile(results, 0.10),
        p50: Stats.percentile(results, 0.50),
        p90: Stats.percentile(results, 0.90),
        mean: Stats.mean(results),
        std: Stats.std(results),
        min: results[0],
        max: results[results.length - 1],
        probabilityOverBudget: results.filter(v => v > BAC).length / results.length
      };
    },

    // Predicción de fecha de finalización basada en velocidad actual
    predictCompletionDate(EV, BAC, projectTasks) {
      if (EV <= 0 || BAC <= 0) return null;
      const remaining = BAC - EV;
      // Velocidad histórica aproximada (asumimos ritmo constante)
      const daysElapsed = this.estimateDaysElapsed(projectTasks);
      if (daysElapsed <= 0) return null;
      const velocity = EV / daysElapsed; // € ganados por día
      const daysNeeded = velocity > 0 ? remaining / velocity : Infinity;
      if (!isFinite(daysNeeded)) return null;
      const eta = new Date(Date.now() + daysNeeded * 86400000);
      return { daysNeeded, eta, velocity };
    },

    estimateDaysElapsed(tasks) {
      if (!tasks?.length) return 90;
      const today = new Date();
      const starts = tasks.map(t => new Date(t.startDate || t.deadline)).filter(d => !isNaN(d));
      if (!starts.length) return 90;
      const earliest = new Date(Math.min(...starts));
      return Math.max(1, Math.round((today - earliest) / 86400000));
    }
  };

  /* ==========================================================
     SECCIÓN 5 · CLUSTER ENGINE (K-means 1D sobre progreso)
     ========================================================== */
  const Cluster = {
    kmeans1D(values, k = 3, maxIter = 50) {
      if (values.length < k) return values.map(v => ({ value: v, cluster: 0 }));
      // Init: percentiles
      let centroids = [
        Stats.percentile(values, 0.2),
        Stats.percentile(values, 0.5),
        Stats.percentile(values, 0.8)
      ];
      let assignments = new Array(values.length).fill(0);

      for (let iter = 0; iter < maxIter; iter++) {
        let changed = false;
        for (let i = 0; i < values.length; i++) {
          let best = 0, bestDist = Infinity;
          for (let c = 0; c < k; c++) {
            const d = Math.abs(values[i] - centroids[c]);
            if (d < bestDist) { bestDist = d; best = c; }
          }
          if (assignments[i] !== best) { assignments[i] = best; changed = true; }
        }
        // Recalcular centroides
        for (let c = 0; c < k; c++) {
          const group = values.filter((_, i) => assignments[i] === c);
          if (group.length) centroids[c] = Stats.mean(group);
        }
        if (!changed) break;
      }
      return values.map((v, i) => ({ value: v, cluster: assignments[i] }));
    },

    analyzeTasks(tasks) {
      if (!tasks.length) return null;
      const progresses = tasks.map(t => Math.max(0, Math.min(100, t.progress || 0)));
      const clustered = this.kmeans1D(progresses, 3);

      // Etiquetar clusters por su centroide (orden ascendente)
      const centroids = [0, 1, 2].map(c => {
        const g = clustered.filter(x => x.cluster === c).map(x => x.value);
        return { cluster: c, centroid: Stats.mean(g), count: g.length };
      }).sort((a, b) => a.centroid - b.centroid);

      const labels = ['🔴 Críticas', '🟡 En desarrollo', '🟢 Saludables'];
      const colors = ['#ef4444', '#facc15', '#22c55e'];
      return centroids.map((c, i) => ({
        label: labels[i],
        color: colors[i],
        count: c.count,
        centroid: c.centroid.toFixed(1),
        tasks: clustered.filter(x => x.cluster === c.cluster).map((x, idx) => tasks[clustered.findIndex(y => y === x)]).filter(Boolean)
      }));
    }
  };

  /* ==========================================================
     SECCIÓN 6 · ANOMALY DETECTOR (Z-score)
     ========================================================== */
  const Anomalies = {
    detect(tasks) {
      if (!tasks.length) return [];
      const progresses = tasks.map(t => t.progress || 0);
      const zs = Stats.zScores(progresses);
      const found = [];
      zs.forEach((z, i) => {
        if (Math.abs(z) > 1.8) {
          found.push({
            task: tasks[i].name || `Tarea ${i}`,
            z: z.toFixed(2),
            progress: tasks[i].progress,
            type: z < 0 ? 'atrasada' : 'adelantada'
          });
        }
      });
      // Anomalía adicional: tareas con deadline vencido y progress < 100
      const hoy = new Date(); hoy.setHours(0,0,0,0);
      tasks.forEach(t => {
        const dl = t.deadline ? new Date(t.deadline) : null;
        if (dl && dl < hoy && (t.progress || 0) < 100) {
          if (!found.some(f => f.task === t.name)) {
            found.push({ task: t.name, z: 'deadline', progress: t.progress, type: 'vencida' });
          }
        }
      });
      return found;
    }
  };

  /* ==========================================================
     SECCIÓN 7 · NEURAL NETWORK (Perceptrón multicapa con backprop)
     3 capas: input(4) → hidden(5) → output(1)
     Predice: % de progreso esperado según horas, prioridad, deadline
     ========================================================== */
  class NeuralNet {
    constructor(inputSize = 4, hiddenSize = 5, lr = 0.08) {
      this.lr = lr;
      // Inicialización Xavier
      this.W1 = this._init(inputSize, hiddenSize);
      this.b1 = new Array(hiddenSize).fill(0);
      this.W2 = this._init(hiddenSize, 1);
      this.b2 = [0];
    }
    _init(rows, cols) {
      const scale = Math.sqrt(2 / rows);
      return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => (Math.random() - 0.5) * 2 * scale)
      );
    }
    _sigmoid(x) { return 1 / (1 + Math.exp(-Math.max(-500, Math.min(500, x)))); }
    _sigmoidDeriv(y) { return y * (1 - y); }

    forward(x) {
      const h = x.map((_, j) => {
        let s = this.b1[j];
        for (let i = 0; i < x.length; i++) s += x[i] * this.W1[i][j];
        return this._sigmoid(s);
      });
      let o = this.b2[0];
      for (let j = 0; j < h.length; j++) o += h[j] * this.W2[j][0];
      return { h, o: this._sigmoid(o) };
    }

    train(X, Y, epochs = 800) {
      for (let e = 0; e < epochs; e++) {
        for (let n = 0; n < X.length; n++) {
          const { h, o } = this.forward(X[n]);
          const err = Y[n] - o;
          const dOut = err * this._sigmoidDeriv(o);
          // Corrección: recomputar dH correctamente
          for (let j = 0; j < h.length; j++) {
            const dHj = dOut * this.W2[j][0] * this._sigmoidDeriv(h[j]);
            this.W2[j][0] += this.lr * dOut * h[j];
            for (let i = 0; i < X[n].length; i++) {
              this.W1[i][j] += this.lr * dHj * X[n][i];
            }
            this.b1[j] += this.lr * dHj;
          }
          this.b2[0] += this.lr * dOut;
        }
      }
    }

    predict(x) { return this.forward(x).o; }
  }

  const NNEngine = {
    trainAndPredict(tasks) {
      if (tasks.length < 3) return null;

      // Features: [progress/100, estimatedHours/100, priority?, deadlineDays/365]
      const hoy = Date.now();
      const X = tasks.map(t => [
        (t.progress || 0) / 100,
        Math.min((t.estimatedTime || 0) / 100, 1),
        t.priority === 'alta' ? 1 : t.priority === 'media' ? 0.5 : 0.1,
        t.deadline ? Math.max(0, Math.min(1, (new Date(t.deadline).getTime() - hoy) / (365 * 86400000))) : 0.5
      ]);

      // Target: probabilidad de completarse en plazo (0-1)
      const Y = tasks.map(t => {
        if (!t.deadline) return 0.5;
        const dl = new Date(t.deadline).getTime();
        const prox = (t.progress || 0) / 100;
        const timeLeft = (dl - hoy) / (30 * 86400000); // meses
        return Math.max(0, Math.min(1, prox * 0.6 + Math.min(1, timeLeft / 6) * 0.4));
      });

      const nn = new NeuralNet(4, 5, CFG.nnLearningRate);
      nn.train(X, Y, CFG.nnEpochs);

      // Predecir confianza global del proyecto
      const globalInput = [
        Stats.mean(X.map(x => x[0])),
        Stats.mean(X.map(x => x[1])),
        Stats.mean(X.map(x => x[2])),
        Stats.mean(X.map(x => x[3]))
      ];
      const confidence = nn.predict(globalInput);

      // Predicciones por tarea (top riesgosas)
      const perTask = tasks.map((t, i) => ({
        name: t.name,
        risk: 1 - nn.predict(X[i]),
        progress: t.progress
      })).sort((a, b) => b.risk - a.risk).slice(0, 5);

      return { confidence, perTask, trainedEpochs: CFG.nnEpochs };
    }
  };

  /* ==========================================================
     SECCIÓN 8 · RECOMMENDATION ENGINE
     ========================================================== */
  const Recommender = {
    generate(data, metrics) {
      const recs = [];
      const { BAC, PV, EV, AC } = data;
      const CPI = AC > 0 ? EV / AC : 1;
      const SPI = PV > 0 ? EV / PV : 1;
      const pctComp = BAC > 0 ? (EV / BAC) * 100 : 0;

      // Prioridad 1: Críticas
      if (CPI < 0.85) {
        recs.push({
          p: 1, c: '#ef4444', title: '🚨 Control de costos urgente',
          detail: `CPI = ${CPI.toFixed(2)}. Estás gastando ${(100 - CPI * 100).toFixed(1)}% más de lo que ganas. Implementar: auditoría de horas, congelar gastos no críticos, revisar alcance.`
        });
      }
      if (SPI < 0.85) {
        recs.push({
          p: 1, c: '#ef4444', title: '🚨 Recuperar cronograma',
          detail: `SPI = ${SPI.toFixed(2)}. Retraso significativo. Acción: fast-tracking en ruta crítica, añadir recursos en tareas bloqueantes, revisar dependencias.`
        });
      }
      if (metrics.monteCarlo?.probabilityOverBudget > 0.6) {
        recs.push({
          p: 1, c: '#f97316', title: '⚠️ Alta probabilidad de sobrecosto',
          detail: `${(metrics.monteCarlo.probabilityOverBudget * 100).toFixed(0)}% de probabilidad de exceder presupuesto. Reserva de contingencia recomendada.`
        });
      }

      // Prioridad 2: Optimización
      if (CPI >= 0.95 && CPI < 1.05) {
        recs.push({
          p: 2, c: '#f59e0b', title: '📊 Eficiencia en zona de tolerancia',
          detail: 'CPI en rango aceptable. Recomendación: mantener control semanal y detectar tempranamente desviaciones > 5%.'
        });
      }
      if (SPI >= 0.95 && SPI < 1.05) {
        recs.push({
          p: 2, c: '#f59e0b', title: '📅 Cronograma estable',
          detail: 'SPI en rango. Revisar holguras de tareas no críticas para optimizar recursos.'
        });
      }
      if (pctComp < 30) {
        recs.push({
          p: 2, c: '#a78bfa', title: '🚀 Proyecto en fase temprana',
          detail: `Solo ${pctComp.toFixed(1)}% completado. Oportunidad de corregir rumbo sin impacto grande. Establecer hitos semanales.`
        });
      }

      // Prioridad 3: Excelencia
      if (CPI > 1.08) {
        recs.push({
          p: 3, c: '#22c55e', title: '🏆 Excelencia financiera',
          detail: `CPI = ${CPI.toFixed(2)}. Ahorro respecto al plan. Considerar: ampliar alcance, adelantar entregas, documentar prácticas exitosas.`
        });
      }
      if (SPI > 1.08) {
        recs.push({
          p: 3, c: '#22c55e', title: '⚡ Velocidad sobresaliente',
          detail: `SPI = ${SPI.toFixed(2)}. Ritmo superior al plan. Liberar holgura, considerar adelantar hitos y reasignar equipo.`
        });
      }
      if (metrics.clusters) {
        const criticas = metrics.clusters.find(c => c.label.includes('Críticas'));
        if (criticas && criticas.count > 0) {
          recs.push({
            p: 2, c: '#f59e0b', title: `🎯 ${criticas.count} tarea(s) en cluster crítico`,
            detail: 'Tareas con progreso significativamente inferior. Priorizar revisión individual y apoyo del equipo.'
          });
        }
      }

      if (!recs.length) {
        recs.push({
          p: 3, c: '#22c55e', title: '✅ Proyecto bajo control',
          detail: 'Todos los indicadores están dentro de tolerancia. Mantener monitoreo semanal y enfoque en prevención.'
        });
      }

      return recs.sort((a, b) => a.p - b.p);
    }
  };

  /* ==========================================================
     SECCIÓN 9 · STORYTELLER
     Genera narrativa ejecutiva dinámica
     ========================================================== */
  const Storyteller = {
    generate(data, metrics) {
      const { BAC, EV, AC, PV, project } = data;
      const CPI = AC > 0 ? EV / AC : 1;
      const SPI = PV > 0 ? EV / PV : 1;
      const pctComp = BAC > 0 ? (EV / BAC) * 100 : 0;
      const projectName = project?.name || 'el proyecto';

      const health = CPI >= 1 && SPI >= 1 ? 'saludable' :
                     CPI >= 1 || SPI >= 1 ? 'con desviaciones controlables' :
                     'en situación crítica';

      const tone = CPI >= 1 && SPI >= 1 ? 'positivo' :
                   (CPI < 0.85 || SPI < 0.85) ? 'alerta' : 'cauteloso';

      let story = `<strong>📖 Reporte Ejecutivo — ${projectName}</strong><br><br>`;

      if (tone === 'positivo') {
        story += `El estado general del proyecto es <em>${health}</em>. Con un avance de <strong>${pctComp.toFixed(1)}%</strong> sobre un presupuesto de <strong>${fmtMoney(BAC)}</strong>, el equipo demuestra una ejecución disciplinada. El <strong>CPI de ${CPI.toFixed(2)}</strong> indica que por cada euro invertido se genera más valor que el planificado, mientras que el <strong>SPI de ${SPI.toFixed(2)}</strong> confirma que el ritmo de ejecución supera o iguala el cronograma. `;
      } else if (tone === 'alerta') {
        story += `El proyecto se encuentra <em>${health}</em>. Con un avance de <strong>${pctComp.toFixed(1)}%</strong>, se han consumido <strong>${fmtMoney(AC)}</strong> frente a un valor ganado de <strong>${fmtMoney(EV)}</strong>. El <strong>CPI de ${CPI.toFixed(2)}</strong> ${CPI < 0.85 ? 'indica sobrecosto significativo' : 'está al límite inferior de tolerancia'}, y el <strong>SPI de ${SPI.toFixed(2)}</strong> ${SPI < 0.85 ? 'evidencia retraso crítico en la ejecución' : 'refleja leve retraso en el cronograma'}. `;
      } else {
        story += `El proyecto avanza <em>${health}</em>. El avance acumulado es de <strong>${pctComp.toFixed(1)}%</strong>, con un valor ganado de <strong>${fmtMoney(EV)}</strong> sobre un costo real de <strong>${fmtMoney(AC)}</strong>. El <strong>CPI de ${CPI.toFixed(2)}</strong> y el <strong>SPI de ${SPI.toFixed(2)}</strong> sitúan la ejecución dentro de los rangos aceptables, aunque exigen monitoreo cercano. `;
      }

      // Monte Carlo
      if (metrics.monteCarlo) {
        const mc = metrics.monteCarlo;
        story += `<br><br>Según <strong>${CFG.mcIterations} simulaciones Monte Carlo</strong>, el costo final estimado (EAC) tiene una probabilidad del <em>${(mc.probabilityOverBudget * 100).toFixed(0)}%</em> de exceder el presupuesto. El escenario optimista (P10) proyecta <strong>${fmtMoney(mc.p10)}</strong>, el escenario base (P50) <strong>${fmtMoney(mc.p50)}</strong>, y el pesimista (P90) <strong>${fmtMoney(mc.p90)}</strong>. `;
      }

      // Fecha estimada
      if (metrics.eta) {
        story += `Con la velocidad actual, la finalización se proyecta para el <em>${metrics.eta.eta.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</em>, en aproximadamente <strong>${Math.round(metrics.eta.daysNeeded)} días</strong>. `;
      }

      // Red neuronal
      if (metrics.nn) {
        const conf = (metrics.nn.confidence * 100).toFixed(1);
        story += `<br><br>El modelo de <strong>red neuronal entrenado localmente</strong> (${metrics.nn.trainedEpochs} épocas) proyecta una probabilidad de cumplimiento global del <strong>${conf}%</strong>. Las tareas con mayor riesgo predictivo identificadas son: <em>${metrics.nn.perTask.slice(0, 3).map(t => t.name?.substring(0, 30)).join(', ')}</em>.`;
      }

      return story;
    }
  };

  const fmtMoney = n => '€' + Math.round(n || 0).toLocaleString('es-ES');

  /* ==========================================================
     SECCIÓN 10 · ASSISTANT ENGINE
     Motor de respuesta: LLM real vía backend proxy (OpenAI GPT-4o mini)
     ========================================================== */
  const Assistant = {
    kb: null, // knowledge base built from data

    buildKB(data, metrics) {
      const { BAC, EV, AC, PV, project, tasks } = data;
      const CPI = AC > 0 ? EV / AC : 1;
      const SPI = PV > 0 ? EV / PV : 1;
      const EAC = CPI > 0 ? BAC / CPI : BAC;
      const VAC = BAC - EAC;
      const pctComp = BAC > 0 ? (EV / BAC) * 100 : 0;

      this.kb = {
        project: project?.name || 'Proyecto',
        BAC, EV, AC, PV, CPI, SPI, EAC, VAC, pctComp,
        taskCount: tasks.length,
        completedTasks: tasks.filter(t => (t.progress || 0) >= 100).length,
        delayedTasks: tasks.filter(t => t.status === 'overdue').length,
        pendingTasks: tasks.filter(t => t.status === 'pending').length,
        inProgressTasks: tasks.filter(t => t.status === 'inProgress').length,
        metrics
      };
    },

        async respond(question) {
      const k = this.kb;
      if (!k) return '⚠️ Aún no hay datos. Abre primero el dashboard EVM y pulsa 🧠 IA Analytics.';

      // Indicador visual
      const log = document.getElementById('ds-chat-log');
      const thinkingId = 'thinking-' + Date.now();
      if (log) {
        log.insertAdjacentHTML('beforeend', `
          <div class="ds-chat-msg bot" id="${thinkingId}">
            <div class="ds-chat-bubble">🧠 Analizando datos del proyecto...</div>
          </div>
        `);
        log.scrollTop = log.scrollHeight;
      }

      // Detectar si la pregunta es sobre el pasado
      const esPreguntaHistorica = /pasado|histórico|historico|evolución|evolucion|tendencia|cambi|ayer|anterior|últimos|ultimos|semana pasada|mes pasado|antes|progreso.*día|comparar.*antes|qué cambió|que cambio|había|habia|estaba|era antes/i.test(question);

      // Si es histórica, traer contexto del backend
      let historicalContext = null;
      if (esPreguntaHistorica) {
        if (log) {
          const thinkEl = document.getElementById(thinkingId);
          if (thinkEl) thinkEl.querySelector('.ds-chat-bubble').textContent = '📚 Consultando histórico...';
        }
        historicalContext = await this.fetchHistoricalContext();
      }

      // Empaquetar datos actuales
      const projectData = {
        nombre: k.project,
        BAC: k.BAC,
        PV: k.PV,
        EV: k.EV,
        AC: k.AC,
        CPI: parseFloat(k.CPI.toFixed(3)),
        SPI: parseFloat(k.SPI.toFixed(3)),
        EAC: Math.round(k.EAC),
        VAC: Math.round(k.VAC),
        progresoPct: parseFloat(k.pctComp.toFixed(1)),
        tareas: {
          total: k.taskCount,
          completadas: k.completedTasks,
          enCurso: k.inProgressTasks,
          rezagadas: k.delayedTasks,
          pendientes: k.pendingTasks
        },
        predicciones: {
          probabilidadSobrecosto: k.metrics?.monteCarlo
            ? parseFloat((k.metrics.monteCarlo.probabilityOverBudget * 100).toFixed(1))
            : null,
          eacP10: k.metrics?.monteCarlo ? Math.round(k.metrics.monteCarlo.p10) : null,
          eacP50: k.metrics?.monteCarlo ? Math.round(k.metrics.monteCarlo.p50) : null,
          eacP90: k.metrics?.monteCarlo ? Math.round(k.metrics.monteCarlo.p90) : null,
          fechaEstimadaFin: k.metrics?.eta?.eta?.toISOString?.() || null,
          confianzaRedNeuronal: k.metrics?.nn
            ? parseFloat((k.metrics.nn.confidence * 100).toFixed(1))
            : null
        },
        tareasDetalle: (k.tasks || []).slice(0, 15).map(t => ({
          nombre: t.name,
          estado: t.status,
          progreso: t.progress,
          horasRegistradas: t.timeLogged,
          horasEstimadas: t.estimatedTime,
          deadline: t.deadline
        })),
        recomendacionesActuales: (k.metrics?.recommendations || []).map(r => ({
          prioridad: r.p,
          titulo: r.title,
          detalle: r.detail
        }))
      };

      const token = localStorage.getItem('token') || localStorage.getItem('authToken');
      const API_URL = window.API_URL || 'https://mi-sistema-proyectos-backend-4.onrender.com';

      try {
                const payload = { question, projectData, role: ROL_ACTIVO };
        if (historicalContext) payload.historicalContext = historicalContext;

        const response = await fetch(`${API_URL}/api/ai-analyst`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

                document.getElementById(thinkingId)?.remove();

        if (!data.success) {
          return `⚠️ ${data.error || 'No se pudo obtener respuesta del asistente.'}`;
        }

        // 💬 Guardar conversación en MongoDB (silencioso, no bloquea UX)
        this.guardarConversacion(question, data.answer, data.usage?.total_tokens);

        return data.answer;

      } catch (error) {
        document.getElementById(thinkingId)?.remove();
        console.error('❌ Error consultando IA:', error);
        return '⚠️ Error de conexión con el asistente IA. Verifica tu conexión e intenta de nuevo.';
      }
    },


    // 💬 Guarda la conversación en MongoDB (silencioso, errores no rompen la UX)
    async guardarConversacion(pregunta, respuesta, tokens) {
      try {
        const token = localStorage.getItem('token') || localStorage.getItem('authToken');
        const clienteId = localStorage.getItem('clienteId');
        const pIdx = window.currentProjectIndex || 0;
        const project = window.projects?.[pIdx];

        if (!token || !clienteId || !project) {
          console.log('💬 Chat no guardado: faltan datos (token/clienteId/project)');
          return;
        }

        const API_URL = window.API_URL || 'https://mi-sistema-proyectos-backend-4.onrender.com';

        await fetch(`${API_URL}/api/chat-history/guardar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            clienteId,
            projectId: project.id,
            projectName: project.name || 'Sin nombre',
            rol: ROL_ACTIVO,
            pregunta,
            respuesta,
            tokens: tokens || null
          })
        });

        console.log(`💬 Chat guardado: "${pregunta.substring(0, 40)}..."`);

      } catch (error) {
        // Silencioso: no rompe la UX si falla el guardado
        console.warn('💬 Chat no guardado:', error.message);
      }
    },




    // 📚 Trae el contexto histórico (KPIs últimos 30 días + cambios recientes)
    async fetchHistoricalContext() {
      try {
        const token = localStorage.getItem('token') || localStorage.getItem('authToken');
        const clienteId = localStorage.getItem('clienteId');
        const projectId = this.kb?.projectId || 
                         window.projects?.[window.currentProjectIndex || 0]?.id;

        if (!token || !clienteId || !projectId) {
          console.log('📚 Histórico: faltan datos para consultar');
          return null;
        }

        const API_URL = window.API_URL || 'https://mi-sistema-proyectos-backend-4.onrender.com';

        // Fetch en paralelo: KPIs + resumen + auditoría reciente
        const [kpisRes, summaryRes, tasksRes] = await Promise.all([
          fetch(`${API_URL}/api/history/kpis/${projectId}?clienteId=${clienteId}&days=30`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }).then(r => r.json()).catch(() => null),
          fetch(`${API_URL}/api/history/summary/${projectId}?clienteId=${clienteId}&days=30`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }).then(r => r.json()).catch(() => null),
          fetch(`${API_URL}/api/history/tasks/${projectId}?clienteId=${clienteId}&limit=50`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }).then(r => r.json()).catch(() => null)
        ]);

        const contexto = {};

        if (kpisRes?.success && kpisRes.series?.length) {
          contexto.serieKPIs = kpisRes.series;
          contexto.diasConDatos = kpisRes.count;
        }

        if (summaryRes?.success && summaryRes.agregados) {
          contexto.agregados = summaryRes.agregados;
          contexto.rango = summaryRes.rango;
        }

        if (tasksRes?.success && tasksRes.cambios?.length) {
          contexto.cambiosRecientes = tasksRes.cambios.slice(0, 20);
        }

        const tieneDatos = Object.keys(contexto).length > 0;
        if (!tieneDatos) {
          console.log('📚 Histórico: sin datos todavía (los snapshots se acumulan día a día)');
          return { sinDatos: true, mensaje: 'Aún no hay suficiente histórico. Se empezará a acumular a partir de hoy.' };
        }

        console.log('📚 Histórico cargado:', Object.keys(contexto));
        return contexto;

      } catch (error) {
        console.warn('📚 Error cargando histórico:', error.message);
        return null;
      }
    },
 }; 


  /* ==========================================================
     SECCIÓN 11 · UI RENDERER
     ========================================================== */
  const UI = {
       async open() {
      const data = DataExtractor.extract();
      if (!data) {
        alert('⚠️ Abre primero el dashboard EVM (Costos) para poder analizarlo.');
        return;
      }

      injectStyles();

      // Calcular métricas
      const metrics = this.computeMetrics(data);

      // Pasar a Assistant
      Assistant.buildKB(data, metrics);
      Assistant.kb.tasks = data.tasks;

      // 📸 Guardar snapshot histórico (silencioso, no bloquea el render)
      this.guardarSnapshot(data, metrics);

      // Render
      const html = this.buildHTML(data, metrics);
      document.body.insertAdjacentHTML('beforeend', html);

      // Post-render: animaciones
      setTimeout(() => {
        document.querySelectorAll('.ds-bar-fill').forEach(el => {
          el.style.width = el.dataset.w || '0%';
        });
      }, 100);

      // Wire eventos
      this.wireEvents();
    },

    // 📸 Envía snapshot al backend (no bloquea UI, errores silenciosos)
    async guardarSnapshot(data, metrics) {
      try {
        const token = localStorage.getItem('token') || localStorage.getItem('authToken');
        if (!token) {
          console.log('📸 Snapshot: sin token, omitiendo');
          return;
        }

        const clienteId = localStorage.getItem('clienteId') ||
                          localStorage.getItem('userClienteId') ||
                          window.userClienteId;

        if (!clienteId) {
          console.log('📸 Snapshot: sin clienteId, omitiendo');
          return;
        }

        const { BAC, PV, EV, AC, projectIndex } = data;
        const CPI = AC > 0 ? EV / AC : 1;
        const SPI = PV > 0 ? EV / PV : 1;
        const EAC = CPI > 0 ? BAC / CPI : BAC;
        const VAC = BAC - EAC;
        const progresoPct = BAC > 0 ? (EV / BAC) * 100 : 0;

        const API_URL = window.API_URL || 'https://mi-sistema-proyectos-backend-4.onrender.com';

        const response = await fetch(`${API_URL}/api/snapshots/guardar`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            clienteId,
            projectIndex: projectIndex || 0,
            kpis: {
              BAC: Math.round(BAC),
              PV: Math.round(PV),
              EV: Math.round(EV),
              AC: Math.round(AC),
              CPI: parseFloat(CPI.toFixed(3)),
              SPI: parseFloat(SPI.toFixed(3)),
              EAC: Math.round(EAC),
              VAC: Math.round(VAC),
              progresoPct: parseFloat(progresoPct.toFixed(1))
            }
          })
        });

        const result = await response.json();

        if (result.success) {
          console.log(`📸 Snapshot guardado: ${result.snapshots?.length || 0} proyectos`);
        } else {
          console.warn('📸 Snapshot error:', result.error);
        }
      } catch (error) {
        // Silencioso: no rompe la UX si el snapshot falla
        console.warn('📸 Snapshot no guardado (silencioso):', error.message);
      }
    },

    computeMetrics(data) {
      const { BAC, PV, EV, AC, tasks } = data;

      // Clustering
      const clusters = Cluster.analyzeTasks(tasks);

      // Monte Carlo
      const monteCarlo = Forecaster.monteCarloEAC(BAC, AC, EV, CFG.mcIterations);

      // Predicción de fecha
      const eta = Forecaster.predictCompletionDate(EV, BAC, tasks);

      // Anomalías
      const anomalies = Anomalies.detect(tasks);

      // Red neuronal
      const nn = NNEngine.trainAndPredict(tasks);

      // Recomendaciones
      const preMetrics = { monteCarlo, clusters };
      const recommendations = Recommender.generate(data, preMetrics);

      return { clusters, monteCarlo, eta, anomalies, nn, recommendations };
    },

    buildHTML(data, metrics) {
      const { BAC, PV, EV, AC, project } = data;
      const EAC = metrics.monteCarlo.p50;
      const VAC = BAC - EAC;

      const story = Storyteller.generate(data, metrics);

      return `
        <div class="ds-overlay" id="ds-ia-overlay">
          <div class="ds-shell">

            <!-- HEADER -->
                        <div class="ds-header">
              <div class="ds-header-top">
                <div class="ds-header-brand">
                  <div class="ds-logo">🧠</div>
                  <div>
                    <h1 class="ds-title">IA EXECUTIVE ANALYTICS</h1>
                    <div class="ds-subtitle">Machine Learning · Deep Learning · Predictive Suite</div>
                  </div>
                </div>
                <div class="ds-header-actions">
                  <button class="ds-btn ds-btn-primary" onclick="window.EVMAI.openHistory()">📚 Historial</button>
                  <button class="ds-btn ds-btn-primary" onclick="window.EVMAI.openComparison()">⚖️ Comparar</button>
                  <button class="ds-btn ds-btn-primary" onclick="window.EVMAI.exportReport()">📄 Exportar Reporte</button>
                  <button class="ds-btn ds-btn-danger" onclick="window.EVMAI.close()">✕ Cerrar</button>
                </div>
              </div>
              <div class="ds-header-bottom">
                <div class="ds-role-selector" id="ds-role-selector">
                  <button class="ds-role-btn" data-role="CFO" title="Chief Financial Officer">💰 CFO</button>
                  <button class="ds-role-btn" data-role="CEO" title="Chief Executive Officer">👔 CEO</button>
                  <button class="ds-role-btn" data-role="COO" title="Chief Operating Officer">⚙️ COO</button>
                  <button class="ds-role-btn ds-role-active" data-role="PMO" title="Project Management Officer">🎯 PMO</button>
                  <button class="ds-role-btn" data-role="Auditor" title="Auditor Senior">🔍 Auditor</button>
                </div>
              </div>
            </div>

            <!-- BODY -->
            <div class="ds-body">

              <!-- STORY -->
              <div class="ds-story">${story}</div>

              <!-- KPI PREDICTIVOS -->
              <div class="ds-grid-4">
                <div class="ds-kpi" style="--c:#a78bfa">
                  <div class="ds-kpi-label">EAC · Proyección P50</div>
                  <div class="ds-kpi-value">${fmtMoney(EAC)}</div>
                  <div class="ds-kpi-sub">Escenario base Monte Carlo</div>
                </div>
                <div class="ds-kpi" style="--c:${VAC >= 0 ? '#22c55e' : '#ef4444'}">
                  <div class="ds-kpi-label">VAC · Variación Final</div>
                  <div class="ds-kpi-value">${VAC >= 0 ? '+' : '-'}${fmtMoney(Math.abs(VAC))}</div>
                  <div class="ds-kpi-sub">${VAC >= 0 ? 'Ahorro proyectado' : 'Sobrecosto proyectado'}</div>
                </div>
                <div class="ds-kpi" style="--c:#67e8f9">
                  <div class="ds-kpi-label">Probabilidad de Sobrecosto</div>
                  <div class="ds-kpi-value">${(metrics.monteCarlo.probabilityOverBudget * 100).toFixed(0)}%</div>
                  <div class="ds-kpi-sub">${CFG.mcIterations} simulaciones</div>
                </div>
                <div class="ds-kpi" style="--c:${metrics.nn ? (metrics.nn.confidence >= 0.7 ? '#22c55e' : metrics.nn.confidence >= 0.4 ? '#f59e0b' : '#ef4444') : '#a78bfa'}">
                  <div class="ds-kpi-label">Confianza Red Neuronal</div>
                  <div class="ds-kpi-value">${metrics.nn ? (metrics.nn.confidence * 100).toFixed(1) + '%' : 'N/A'}</div>
                  <div class="ds-kpi-sub">MLP 4-5-1 entrenada local</div>
                </div>
              </div>

              <!-- MONTE CARLO + ETA -->
              <div class="ds-grid-2">
                <div class="ds-card">
                  <h3 class="ds-card-title">🎲 Simulación Monte Carlo</h3>
                  <div style="display:flex;flex-direction:column;gap:14px;">
                    ${['p10', 'p50', 'p90'].map((k, i) => {
                      const labels = ['Optimista (P10)', 'Base (P50)', 'Pesimista (P90)'];
                      const colors = ['#22c55e', '#a78bfa', '#ef4444'];
                      const val = metrics.monteCarlo[k];
                      const pct = (val / metrics.monteCarlo.p90) * 100;
                      return `
                        <div>
                          <div style="display:flex;justify-content:space-between;font-size:12px;color:#ddd6fe;margin-bottom:4px;">
                            <span>${labels[i]}</span>
                            <strong style="color:${colors[i]}">${fmtMoney(val)}</strong>
                          </div>
                          <div class="ds-bar"><div class="ds-bar-fill" style="--c:${colors[i]};width:0" data-w="${pct}%"></div></div>
                        </div>`;
                    }).join('')}
                  </div>
                </div>

                <div class="ds-card">
                  <h3 class="ds-card-title">📅 Proyección Temporal</h3>
                  ${metrics.eta ? `
                    <div style="font-size:14px;line-height:1.8;color:#ddd6fe;">
                      <div style="margin-bottom:12px;">Con la velocidad actual, el proyecto finalizará el:</div>
                      <div style="font-size:22px;font-weight:900;color:#67e8f9;margin-bottom:16px;">
                        ${metrics.eta.eta.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      <div style="display:flex;gap:20px;font-size:12px;">
                        <div>
                          <div style="color:#a78bfa;font-size:10px;letter-spacing:2px;">DÍAS RESTANTES</div>
                          <div style="font-size:20px;font-weight:800;color:#fff;margin-top:4px;">${Math.round(metrics.eta.daysNeeded)}</div>
                        </div>
                        <div>
                          <div style="color:#a78bfa;font-size:10px;letter-spacing:2px;">VELOCIDAD</div>
                          <div style="font-size:20px;font-weight:800;color:#fff;margin-top:4px;">${fmtMoney(metrics.eta.velocity)}/día</div>
                        </div>
                      </div>
                    </div>
                  ` : `<div style="color:#a78bfa;font-size:13px;">No hay suficientes datos temporales para proyectar la fecha de finalización.</div>`}
                </div>
              </div>

              <!-- CLUSTERING + ANOMALÍAS -->
              <div class="ds-grid-2">
                <div class="ds-card">
                  <h3 class="ds-card-title">🧬 Clustering de Tareas (K-means)</h3>
                  <div class="ds-cluster">
                    ${(metrics.clusters || []).map(c => `
                      <div class="ds-cluster-item" style="--c:${c.color};--bd:${c.color}44;--bg:linear-gradient(160deg, ${c.color}22, rgba(12,6,30,0.9));">
                        <div style="font-size:24px;margin-bottom:6px;">${c.label.split(' ')[0]}</div>
                        <strong style="color:${c.color}">${c.count}</strong>
                        <span>${c.label.split(' ').slice(1).join(' ')}</span>
                        <div style="font-size:10px;color:#a78bfa;margin-top:6px;">Prog. medio: ${c.centroid}%</div>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <div class="ds-card">
                  <h3 class="ds-card-title">🚨 Anomalías Detectadas</h3>
                  ${metrics.anomalies.length ? `
                    ${metrics.anomalies.slice(0, 6).map(a => `
                      <div class="ds-anomaly">
                        <strong>${a.task?.substring(0, 45)}</strong><br>
                        Progreso ${a.progress}% · Z-score: ${a.z} · <em>${a.type}</em>
                      </div>
                    `).join('')}
                  ` : `<div style="color:#22c55e;font-size:13px;">✅ No se detectaron anomalías estadísticas.</div>`}
                </div>
              </div>

              <!-- RED NEURONAL -->
              ${metrics.nn ? `
                <div class="ds-card">
                  <h3 class="ds-card-title">🧠 Predicción Red Neuronal (MLP 4-5-1)</h3>
                  <div style="display:grid;grid-template-columns:1fr 2fr;gap:24px;align-items:center;">
                    <div style="text-align:center;">
                      <div style="font-size:56px;font-weight:900;color:${metrics.nn.confidence >= 0.7 ? '#22c55e' : metrics.nn.confidence >= 0.4 ? '#f59e0b' : '#ef4444'};text-shadow:0 0 30px currentColor;">
                        ${(metrics.nn.confidence * 100).toFixed(0)}%
                      </div>
                      <div style="font-size:11px;color:#a78bfa;letter-spacing:2px;text-transform:uppercase;margin-top:6px;">Confianza de Cumplimiento</div>
                    </div>
                    <div>
                      <div style="font-size:12px;color:#a78bfa;letter-spacing:2px;margin-bottom:10px;">TAREAS CON MAYOR RIESGO PREDICTIVO</div>
                      ${metrics.nn.perTask.map(t => `
                        <div style="margin-bottom:10px;">
                          <div style="display:flex;justify-content:space-between;font-size:12px;color:#ddd6fe;margin-bottom:4px;">
                            <span>${(t.name || '').substring(0, 45)}</span>
                            <strong style="color:${t.risk > 0.6 ? '#ef4444' : t.risk > 0.3 ? '#f59e0b' : '#22c55e'}">${(t.risk * 100).toFixed(0)}%</strong>
                          </div>
                          <div class="ds-bar"><div class="ds-bar-fill" style="--c:${t.risk > 0.6 ? '#ef4444' : t.risk > 0.3 ? '#f59e0b' : '#22c55e'};width:0" data-w="${t.risk * 100}%"></div></div>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                </div>
              ` : ''}

              <!-- RECOMENDACIONES -->
              <div class="ds-card">
                <h3 class="ds-card-title">💡 Recomendaciones Priorizadas</h3>
                ${metrics.recommendations.map(r => `
                  <div class="ds-rec" style="--c:${r.c};">
                    <div class="ds-rec-badge">${r.p}</div>
                    <div class="ds-rec-text">
                      <div class="ds-rec-title">${r.title}</div>
                      <div class="ds-rec-detail">${r.detail}</div>
                    </div>
                  </div>
                `).join('')}
              </div>

              <!-- ASISTENTE IA -->
              <div class="ds-card">
                <h3 class="ds-card-title">🤖 Asistente IA Ejecutivo</h3>
                <div class="ds-chat-wrap">
                  <div class="ds-chat-suggest">
                    <span class="ds-chat-chip" data-q="¿Cuál es el CPI?">CPI</span>
                    <span class="ds-chat-chip" data-q="¿Cuándo termina el proyecto?">Fecha fin</span>
                    <span class="ds-chat-chip" data-q="¿Qué debo hacer?">Recomendaciones</span>
                    <span class="ds-chat-chip" data-q="¿Cuál es la probabilidad de sobrecosto?">Monte Carlo</span>
                    <span class="ds-chat-chip" data-q="¿Qué anomalías detectaste?">Anomalías</span>
                    <span class="ds-chat-chip" data-q="ayuda">Ayuda</span>
                  </div>
                  <div class="ds-chat-log" id="ds-chat-log">
                    <div class="ds-chat-msg bot">
                      <div class="ds-chat-bubble">👋 Hola. Soy tu analista ejecutivo IA. Puedo responder sobre finanzas, cronograma, tareas, predicciones, anomalías y recomendaciones del proyecto <strong>${project?.name || ''}</strong>. ¿Qué quieres saber?</div>
                    </div>
                  </div>
                                    <div class="ds-mic-status" id="ds-mic-status">🎤 Grabando... Habla con claridad y vuelve a pulsar el micrófono para transcribir.</div>
                  <div class="ds-chat-input-row">
                    <input class="ds-chat-input" id="ds-chat-input" placeholder="Escribe tu pregunta o usa el micrófono..." />
                    <button class="ds-btn-mic" id="ds-btn-mic" title="Grabar pregunta por voz">🎤</button>
                    <button class="ds-chat-send" id="ds-chat-send">Enviar</button>
                  </div>
                </div>
              </div>

            </div>

            <div class="ds-footer">
              Reporte generado ${new Date().toLocaleString('es-ES')} · IA Executive Analytics · CONFIDENCIAL
            </div>
          </div>
        </div>
      `;
    },


    // ⚖️ Abrir panel de comparativa multi-proyecto
    async openComparison() {
      if (document.getElementById('ds-comparison-panel')) {
        document.getElementById('ds-comparison-panel').remove();
        return;
      }

      const projects = window.projects || [];
      if (projects.length < 2) {
        alert('⚠️ Necesitas al menos 2 proyectos para usar la comparativa.');
        return;
      }

      const panel = document.createElement('div');
      panel.className = 'ds-comparison-panel';
      panel.id = 'ds-comparison-panel';
      panel.innerHTML = `
        <div class="ds-comparison-header">
          <div class="ds-comparison-title">⚖️ Comparativa de Proyectos</div>
          <button class="ds-btn ds-btn-danger" onclick="document.getElementById('ds-comparison-panel').remove()">✕ Cerrar</button>
        </div>
        <div class="ds-comparison-body" id="ds-comparison-body">
          <div class="ds-comparison-empty">Selecciona 2 o más proyectos para comparar:</div>
          <div class="ds-comparison-selector" id="ds-comparison-selector">
            ${projects.map((p, i) => `
              <div class="ds-comparison-chip" data-index="${i}">${p.name}</div>
            `).join('')}
          </div>
          <div id="ds-comparison-content"></div>
        </div>
      `;
      document.body.appendChild(panel);

      // Seleccionar automáticamente los 2 primeros
      const chips = panel.querySelectorAll('.ds-comparison-chip');
      if (chips[0]) chips[0].classList.add('ds-comparison-selected');
      if (chips[1]) chips[1].classList.add('ds-comparison-selected');

      // Wire chips
      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          chip.classList.toggle('ds-comparison-selected');
          this.renderComparison();
        });
      });

      // Render inicial
      await this.renderComparison();
    },

        // ⚖️ Calcula KPIs de un proyecto usando la CONFIG REAL de costes
    calcularKPIsProyecto(project) {
      // 1) Leer config de costes real desde localStorage
      let costPerHour = 50;
      let overheadPct = 0;
      let fixedCostsTotal = 0;

      try {
        const cfgRaw = localStorage.getItem(`evmCostConfig_p_${project.id}`);
        if (cfgRaw) {
          const cfg = JSON.parse(cfgRaw);
          if (typeof cfg.costPerHour === 'number' && cfg.costPerHour > 0) costPerHour = cfg.costPerHour;
          if (typeof cfg.overheadPercentage === 'number') overheadPct = cfg.overheadPercentage;
          if (Array.isArray(cfg.fixedCosts)) {
            fixedCostsTotal = cfg.fixedCosts.reduce((s, fc) => s + (parseFloat(fc.amount) || 0), 0);
          }
        }
      } catch (e) {
        console.warn('Config de costes no disponible para', project.name);
      }

      // 2) Coste por hora efectivo (con overhead)
      const costeEfectivoHora = costPerHour * (1 + overheadPct / 100);

      const tasks = project.tasks || [];

      // 3) Cálculos con config real
      const totalEstimated = tasks.reduce((s, t) => s + (t.estimatedTime || 0), 0);
      const totalLogged = tasks.reduce((s, t) => s + (t.timeLogged || 0), 0);

      // BAC = horas estimadas × coste efectivo + costes fijos
      const BAC = totalEstimated * costeEfectivoHora + fixedCostsTotal;

      // AC = horas registradas × coste efectivo + costes fijos incurridos
      const AC = totalLogged * costeEfectivoHora + fixedCostsTotal;

      // EV = progreso ponderado de tareas + porción de costes fijos según avance
      const progresoPonderado = totalEstimated > 0
        ? tasks.reduce((s, t) => s + ((t.progress || 0) / 100) * (t.estimatedTime || 0), 0) / totalEstimated
        : 0;
      const EV = tasks.reduce((s, t) => {
        const p = Math.max(0, Math.min(100, t.progress || 0)) / 100;
        return s + (t.estimatedTime || 0) * costeEfectivoHora * p;
      }, 0) + (fixedCostsTotal * progresoPonderado);

      // PV aproximado por tiempo transcurrido
      const hoy = Date.now();
      const conDeadline = tasks.filter(t => t.deadline);
      let PV = 0;
      if (conDeadline.length > 0) {
        const starts = conDeadline.map(t => new Date(t.startDate || t.deadline).getTime()).filter(d => !isNaN(d));
        const ends = conDeadline.map(t => new Date(t.deadline).getTime()).filter(d => !isNaN(d));
        const earliest = Math.min(...starts);
        const latest = Math.max(...ends);
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

      // Score 0-100 ponderado
      const scoreCPI = Math.min(1.5, CPI) / 1.5 * 50;
      const scoreSPI = Math.min(1.5, SPI) / 1.5 * 50;
      const score = Math.round(scoreCPI + scoreSPI);

      return {
        BAC: Math.round(BAC),
        PV: Math.round(PV),
        EV: Math.round(EV),
        AC: Math.round(AC),
        CPI: parseFloat(CPI.toFixed(3)),
        SPI: parseFloat(SPI.toFixed(3)),
        EAC: Math.round(EAC),
        VAC: Math.round(VAC),
        progresoPct: parseFloat(progresoPct.toFixed(1)),
        score,
        taskCount: tasks.length,
        completedTasks: tasks.filter(t => (t.progress || 0) >= 100).length,
        delayedTasks: tasks.filter(t => t.status === 'overdue').length,
        costPerHour: parseFloat(costeEfectivoHora.toFixed(2)),
        fixedCosts: fixedCostsTotal,
        tieneConfigReal: costPerHour !== 50 || fixedCostsTotal > 0
      };
    },

    // ⚖️ Renderiza la comparativa
    async renderComparison() {
      const panel = document.getElementById('ds-comparison-panel');
      if (!panel) return;

      const chips = panel.querySelectorAll('.ds-comparison-chip.ds-comparison-selected');
      const selectedIndices = [...chips].map(c => parseInt(c.dataset.index));
      const content = document.getElementById('ds-comparison-content');

      if (selectedIndices.length < 2) {
        content.innerHTML = `<div class="ds-comparison-empty">⚠️ Selecciona al menos 2 proyectos para comparar.</div>`;
        return;
      }

      const projects = window.projects || [];
      const projectData = selectedIndices.map(i => ({
        index: i,
        project: projects[i],
        kpis: this.calcularKPIsProyecto(projects[i])
      }));

      // Ranking por score descendente
      const ranking = [...projectData].sort((a, b) => b.kpis.score - a.kpis.score);
      const rankMap = new Map();
      ranking.forEach((p, i) => rankMap.set(p.index, i + 1));

      const colors = ['#22c55e', '#a78bfa', '#67e8f9', '#f59e0b', '#ef4444'];

      // Construir HTML
      let html = `<div class="ds-comparison-grid">`;
      projectData.forEach(p => {
        const rank = rankMap.get(p.index);
        const c = colors[(rank - 1) % colors.length];
        html += `
          <div class="ds-comparison-card" style="--c:${c};">
            <div class="ds-comparison-card-name">${p.project.name}</div>
            <div class="ds-comparison-card-rank" style="background:${c};">RANKING #${rank}</div>
            <div style="font-size:36px;font-weight:900;color:${c};margin-top:8px;text-shadow:0 0 20px ${c};">${p.kpis.score}<span style="font-size:16px;color:#8b7cb8;">/100</span></div>
            <div style="font-size:10px;color:#a78bfa;letter-spacing:2px;text-transform:uppercase;margin-top:4px;">Score de Salud</div>
            <div class="ds-comparison-card-metrics">
              <div class="ds-comparison-metric">
                <div class="ds-comparison-metric-label">CPI</div>
                <div class="ds-comparison-metric-value" style="color:${p.kpis.CPI >= 1 ? '#22c55e' : p.kpis.CPI >= 0.95 ? '#f59e0b' : '#ef4444'};">${p.kpis.CPI.toFixed(2)}</div>
              </div>
              <div class="ds-comparison-metric">
                <div class="ds-comparison-metric-label">SPI</div>
                <div class="ds-comparison-metric-value" style="color:${p.kpis.SPI >= 1 ? '#22c55e' : p.kpis.SPI >= 0.95 ? '#f59e0b' : '#ef4444'};">${p.kpis.SPI.toFixed(2)}</div>
              </div>
              <div class="ds-comparison-metric">
                <div class="ds-comparison-metric-label">Progreso</div>
                <div class="ds-comparison-metric-value">${p.kpis.progresoPct}%</div>
              </div>
              <div class="ds-comparison-metric">
                <div class="ds-comparison-metric-label">Tareas</div>
                <div class="ds-comparison-metric-value">${p.kpis.taskCount}</div>
              </div>
            </div>
          </div>
        `;
      });
      html += `</div>`;

      // Tabla comparativa
      html += `
        <table class="ds-comparison-table">
          <thead>
            <tr>
              <th>Métrica</th>
              ${projectData.map(p => `<th class="ds-col-value">${p.project.name.substring(0, 25)}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            <tr><td>BAC</td>${projectData.map(p => `<td class="ds-col-value">${fmtMoney(p.kpis.BAC)}</td>`).join('')}</tr>
            <tr><td>PV</td>${projectData.map(p => `<td class="ds-col-value">${fmtMoney(p.kpis.PV)}</td>`).join('')}</tr>
            <tr><td>EV</td>${projectData.map(p => `<td class="ds-col-value">${fmtMoney(p.kpis.EV)}</td>`).join('')}</tr>
            <tr><td>AC</td>${projectData.map(p => `<td class="ds-col-value">${fmtMoney(p.kpis.AC)}</td>`).join('')}</tr>
            <tr><td>EAC</td>${projectData.map(p => `<td class="ds-col-value">${fmtMoney(p.kpis.EAC)}</td>`).join('')}</tr>
            <tr><td>VAC</td>${projectData.map(p => `<td class="ds-col-value" style="color:${p.kpis.VAC >= 0 ? '#22c55e' : '#ef4444'};">${p.kpis.VAC >= 0 ? '+' : '-'}${fmtMoney(Math.abs(p.kpis.VAC))}</td>`).join('')}</tr>
            <tr><td>Progreso</td>${projectData.map(p => `<td class="ds-col-value">${p.kpis.progresoPct}%</td>`).join('')}</tr>
            <tr><td>Tareas Completadas</td>${projectData.map(p => `<td class="ds-col-value">${p.kpis.completedTasks} / ${p.kpis.taskCount}</td>`).join('')}</tr>
            <tr><td>Tareas Rezagadas</td>${projectData.map(p => `<td class="ds-col-value" style="color:${p.kpis.delayedTasks > 0 ? '#ef4444' : '#22c55e'};">${p.kpis.delayedTasks}</td>`).join('')}</tr>
            <tr><td><strong>Score Global</strong></td>${projectData.map(p => `<td class="ds-col-value" style="color:${colors[(rankMap.get(p.index) - 1) % colors.length]};"><strong>${p.kpis.score}/100</strong></td>`).join('')}</tr>
          </tbody>
        </table>
      `;

      // Análisis del LLM (async)
      html += `
        <div id="ds-comparison-analysis-block">
          <div class="ds-comparison-analysis" id="ds-comparison-analysis">
            🧠 Generando análisis comparativo ejecutivo...
          </div>
        </div>
      `;

      content.innerHTML = html;

      // Llamar al LLM para el análisis comparativo
      try {
        const token = localStorage.getItem('token') || localStorage.getItem('authToken');
        const clienteId = localStorage.getItem('clienteId');
        const API_URL = window.API_URL || 'https://mi-sistema-proyectos-backend-4.onrender.com';

        const pregunta = `Compara estos ${projectData.length} proyectos y dime cuál tiene mejor salud ejecutiva, cuál requiere más atención y qué acciones concretas recomiendas. Sé conciso y ejecutivo.`;

        const projectDataPayload = projectData.map(p => ({
          nombre: p.project.name,
          CPI: p.kpis.CPI,
          SPI: p.kpis.SPI,
          BAC: p.kpis.BAC,
          EV: p.kpis.EV,
          AC: p.kpis.AC,
          EAC: p.kpis.EAC,
          VAC: p.kpis.VAC,
          progresoPct: p.kpis.progresoPct,
          tareas: { total: p.kpis.taskCount, completadas: p.kpis.completedTasks, rezagadas: p.kpis.delayedTasks },
          score: p.kpis.score
        }));

        const r = await fetch(`${API_URL}/api/ai-analyst`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            question: pregunta,
            projectData: { proyectos: projectDataPayload, modo: 'comparativa' },
            role: ROL_ACTIVO
          })
        });
        const data = await r.json();

        const analysisEl = document.getElementById('ds-comparison-analysis');
        if (analysisEl) {
          if (data.success) {
            analysisEl.innerHTML = data.answer.replace(/\n/g, '<br>');
          } else {
            analysisEl.innerHTML = `⚠️ ${data.error || 'No se pudo generar el análisis.'}`;
          }
        }
      } catch (error) {
        console.error('❌ Error comparando:', error);
        const analysisEl = document.getElementById('ds-comparison-analysis');
        if (analysisEl) analysisEl.innerHTML = '⚠️ Error de conexión con el asistente IA.';
      }
    },




    // 📚 Abrir panel de historial
    async openHistory() {
      // Cerrar si ya está abierto
      if (document.getElementById('ds-history-panel')) {
        document.getElementById('ds-history-panel').remove();
        return;
      }

      const panel = document.createElement('div');
      panel.className = 'ds-history-panel';
      panel.id = 'ds-history-panel';
      panel.innerHTML = `
        <div class="ds-history-header">
          <div class="ds-history-title">📚 Historial de Conversaciones</div>
          <button class="ds-btn ds-btn-danger" onclick="document.getElementById('ds-history-panel').remove()">✕</button>
        </div>
        <div class="ds-history-search">
          <input type="text" class="ds-history-input" id="ds-history-search" placeholder="Buscar en el historial..." />
          <button class="ds-btn ds-btn-primary" id="ds-history-clear" title="Borrar todo el historial del proyecto">🗑️</button>
        </div>
        <div class="ds-history-list" id="ds-history-list">
          <div class="ds-history-loading">⏳ Cargando historial...</div>
        </div>
      `;
      document.body.appendChild(panel);

      // Cargar conversaciones
      await this.loadHistory();

      // Wire búsqueda con debounce
      let debounceTimer;
      const input = document.getElementById('ds-history-search');
      input.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => this.loadHistory(input.value), 400);
      });

      // Wire borrar todo
      document.getElementById('ds-history-clear').addEventListener('click', async () => {
        if (!confirm('¿Borrar TODO el historial de este proyecto? Esta acción no se puede deshacer.')) return;
        await this.clearHistory();
      });
    },

    // 📚 Cargar historial desde el backend
    async loadHistory(search = '') {
      const list = document.getElementById('ds-history-list');
      if (!list) return;

      try {
        const token = localStorage.getItem('token') || localStorage.getItem('authToken');
        const clienteId = localStorage.getItem('clienteId');
        const pIdx = window.currentProjectIndex || 0;
        const project = window.projects?.[pIdx];

        if (!token || !clienteId || !project) {
          list.innerHTML = `<div class="ds-history-empty">⚠️ No se pudo cargar el historial</div>`;
          return;
        }

        const API_URL = window.API_URL || 'https://mi-sistema-proyectos-backend-4.onrender.com';
        const params = new URLSearchParams({ clienteId, limit: 50 });
        if (search) params.append('search', search);

        const r = await fetch(`${API_URL}/api/chat-history/${project.id}?${params}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await r.json();

        if (!data.success || !data.conversaciones?.length) {
          list.innerHTML = `<div class="ds-history-empty">${search ? '🔍 Sin resultados para tu búsqueda' : '📭 Aún no hay conversaciones guardadas'}</div>`;
          return;
        }

        list.innerHTML = data.conversaciones.map(c => `
          <div class="ds-history-item" data-id="${c.id}">
            <div class="ds-history-item-delete" data-delete="${c.id}">✕</div>
            <div class="ds-history-item-meta">
              <span class="ds-history-item-rol">${c.rol || 'PMO'}</span>
              <span>${new Date(c.timestamp).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}</span>
            </div>
            <div class="ds-history-item-question">❓ ${this.escapeHtml(c.pregunta)}</div>
            <div class="ds-history-item-answer">💬 ${this.escapeHtml(c.respuesta)}</div>
          </div>
        `).join('');

        // Wire click en cada item (mostrar en el chat principal)
        list.querySelectorAll('.ds-history-item').forEach(item => {
          item.addEventListener('click', (e) => {
            if (e.target.dataset.delete) return; // ignorar si hizo clic en borrar
            const id = item.dataset.id;
            const conv = data.conversaciones.find(x => String(x.id) === id);
            if (conv) this.mostrarConversacionEnChat(conv);
          });
        });

        // Wire borrar individual
        list.querySelectorAll('.ds-history-item-delete').forEach(btn => {
          btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const id = btn.dataset.delete;
            if (!confirm('¿Eliminar esta conversación?')) return;
            await this.deleteHistoryItem(id);
            await this.loadHistory(search);
          });
        });

      } catch (error) {
        console.error('❌ Error cargando historial:', error);
        list.innerHTML = `<div class="ds-history-empty">❌ Error cargando historial</div>`;
      }
    },

    // 📚 Mostrar una conversación del historial en el chat principal
    mostrarConversacionEnChat(conv) {
      const log = document.getElementById('ds-chat-log');
      if (!log) return;

      // Limpiar y mostrar contexto
      log.innerHTML = `
        <div class="ds-chat-msg bot">
          <div class="ds-chat-bubble">
            📚 <strong>Conversación recuperada del historial</strong><br>
            <span style="font-size: 11px; opacity: 0.7;">Rol: ${conv.rol || 'PMO'} · ${new Date(conv.timestamp).toLocaleString('es-ES')}</span>
          </div>
        </div>
        <div class="ds-chat-msg user">
          <div class="ds-chat-bubble">${this.escapeHtml(conv.pregunta)}</div>
        </div>
        <div class="ds-chat-msg bot">
          <div class="ds-chat-bubble">${conv.respuesta}</div>
        </div>
      `;
      log.scrollTop = log.scrollHeight;

      // Cerrar panel
      document.getElementById('ds-history-panel')?.remove();
    },

    // 📚 Borrar un item
    async deleteHistoryItem(id) {
      try {
        const token = localStorage.getItem('token') || localStorage.getItem('authToken');
        const API_URL = window.API_URL || 'https://mi-sistema-proyectos-backend-4.onrender.com';

        await fetch(`${API_URL}/api/chat-history/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (error) {
        console.warn('Error borrando item:', error);
      }
    },

    // 📚 Borrar todo el historial del proyecto
    async clearHistory() {
      try {
        const token = localStorage.getItem('token') || localStorage.getItem('authToken');
        const clienteId = localStorage.getItem('clienteId');
        const pIdx = window.currentProjectIndex || 0;
        const project = window.projects?.[pIdx];

        if (!project) return;

        const API_URL = window.API_URL || 'https://mi-sistema-proyectos-backend-4.onrender.com';
        await fetch(`${API_URL}/api/chat-history/clear/${project.id}?clienteId=${clienteId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        await this.loadHistory();
      } catch (error) {
        console.warn('Error borrando historial:', error);
      }
    },


              // 🎤 Estado de la grabación
    _voiceRecorder: null,
    _voiceChunks: [],
    _voiceStream: null,
    _isRecording: false,
    _voiceTimer: null,
    _voiceStartTime: 0,

            // 🎤 Manejar clic del micrófono (start/stop toggle)
    async handleMicClick() {
      const btn = document.getElementById('ds-btn-mic');
      const status = document.getElementById('ds-mic-status');
      if (!btn) return;

      if (this._isRecording) {
        return this.stopVoiceRecording();
      }

      if (!navigator.mediaDevices || !window.MediaRecorder) {
        alert('⚠️ Tu navegador no soporta grabación de voz. Prueba con Chrome, Edge o Safari.');
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            channelCount: 1,
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            sampleRate: 16000
          }
        });

        this._voiceStream = stream;
        this._voiceChunks = [];

        const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
          ? 'audio/webm;codecs=opus'
          : MediaRecorder.isTypeSupported('audio/mp4')
            ? 'audio/mp4'
            : 'audio/webm';

        this._voiceRecorder = new MediaRecorder(stream, {
          mimeType,
          audioBitsPerSecond: 24000
        });

        this._voiceRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) this._voiceChunks.push(e.data);
        };

        this._voiceRecorder.onstop = () => this.processVoiceRecording();

        this._voiceRecorder.start(250);

        this._isRecording = true;
        this._voiceStartTime = Date.now();

        btn.classList.add('ds-recording');
        btn.textContent = '⏹️';
        btn.title = 'Detener y transcribir';
        if (status) {
          status.classList.add('ds-active');
          status.textContent = '🎤 Grabando... 0s (máx 30s)';
        }

        this._voiceTimer = setInterval(() => {
          const seg = Math.floor((Date.now() - this._voiceStartTime) / 1000);
          if (status) status.textContent = `🎤 Grabando... ${seg}s (máx 30s)`;
          if (seg >= 30) {
            console.log('🎤 Auto-stop: 30 seg alcanzados');
            this.stopVoiceRecording();
          }
        }, 1000);

      } catch (err) {
        console.error('❌ Error accediendo al micrófono:', err);
        this._isRecording = false;
        alert('⚠️ No se pudo acceder al micrófono. Verifica los permisos del navegador.');
      }
    },

           // 🎤 Detener grabación
    async stopVoiceRecording() {
      // 🔧 FIX: parar timer primero
      if (this._voiceTimer) {
        clearInterval(this._voiceTimer);
        this._voiceTimer = null;
      }

      // 🔧 FIX: marcar como NO grabando para que el próximo clic no la reinicie
      this._isRecording = false;

      if (this._voiceRecorder && this._voiceRecorder.state !== 'inactive') {
        try { this._voiceRecorder.stop(); } catch(e) { console.warn(e); }
      }
    },

    // 🔧 FIX: reactivar botón del micrófono (por si algún flujo lo dejó deshabilitado)
    reactivarBotonMic() {
      const btn = document.getElementById('ds-btn-mic');
      if (btn) {
        btn.disabled = false;
        btn.classList.remove('ds-recording');
        btn.textContent = '🎤';
        btn.title = 'Grabar pregunta por voz';
      }
    },

           // 🎤 Procesar audio → transcribir → validar → AUTO-ENVIAR
    async processVoiceRecording() {
      const btn = document.getElementById('ds-btn-mic');
      const status = document.getElementById('ds-mic-status');
      const input = document.getElementById('ds-chat-input');

      const duracion = this._voiceStartTime ? Math.round((Date.now() - this._voiceStartTime) / 1000) : 0;

      if (this._voiceStream) {
        this._voiceStream.getTracks().forEach(t => t.stop());
        this._voiceStream = null;
      }

      if (btn) {
        btn.classList.remove('ds-recording');
        btn.textContent = '🎤';
        btn.title = 'Grabar pregunta por voz';
        btn.disabled = true;
      }

      if (duracion < 1) {
        if (status) status.classList.remove('ds-active');
        if (btn) btn.disabled = false;
        return;
      }

      if (status) {
        status.textContent = `🧠 Transcribiendo ${duracion}s de audio...`;
        status.style.background = 'rgba(167,139,250,0.15)';
        status.style.borderLeftColor = '#a78bfa';
        status.style.color = '#ddd6fe';
      }

      try {
        const blob = new Blob(this._voiceChunks, {
          type: this._voiceRecorder?.mimeType || 'audio/webm'
        });

        if (blob.size < 2000) {
          throw new Error('Audio demasiado corto. Habla al menos 1 segundo.');
        }

        const token = localStorage.getItem('token') || localStorage.getItem('authToken');
        const API_URL = window.API_URL || 'https://mi-sistema-proyectos-backend-4.onrender.com';

        const formData = new FormData();
        formData.append('audio', blob, 'recording.webm');

        const r = await fetch(`${API_URL}/api/transcribe`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData
        });

        const data = await r.json();

        if (!data.success) {
          throw new Error(data.error || 'Error desconocido en la transcripción');
        }

        const texto = (data.text || '').trim();
        console.log('🎤 Texto crudo de Whisper:', texto);

        // 🔍 VALIDACIÓN ROBUSTA DEL TEXTO (sin tocar el audio)
        const esPreguntaValida = this.validarPreguntaVoz(texto);

        if (!esPreguntaValida.valida) {
          console.warn('🎤 Rechazado:', esPreguntaValida.razon);
          if (status) {
            status.textContent = `⚠️ ${esPreguntaValida.razon}`;
            status.style.background = 'rgba(239,68,68,0.15)';
            status.style.borderLeftColor = '#ef4444';
            status.style.color = '#fca5a5';
            setTimeout(() => status.classList.remove('ds-active'), 4000);
          }
          if (btn) btn.disabled = false;
          return;
        }

               const textoLimpio = esPreguntaValida.textoLimpio;
        console.log('🎤 Pregunta validada:', textoLimpio);

        // 🔧 FIX: reactivar botón antes de auto-enviar
        if (btn) btn.disabled = false;

        if (input) {
          input.value = textoLimpio;
          input.focus();
        }

        if (status) {
          status.textContent = '✅ Pregunta lista — enviando...';
          status.style.background = 'rgba(34,197,94,0.15)';
          status.style.borderLeftColor = '#22c55e';
          status.style.color = '#86efac';
          setTimeout(() => status.classList.remove('ds-active'), 1500);
        }

        setTimeout(() => {
          const sendBtn = document.getElementById('ds-chat-send');
          if (sendBtn) sendBtn.click();
        }, 400);

      } catch (err) {
        console.error('❌ Error transcribiendo voz:', err);
        if (status) {
          status.textContent = `❌ ${err.message}`;
          status.style.background = 'rgba(239,68,68,0.15)';
          status.style.borderLeftColor = '#ef4444';
          status.style.color = '#fca5a5';
          setTimeout(() => status.classList.remove('ds-active'), 4000);
        }
        if (btn) btn.disabled = false;
      }
    },

    // 🔍 Validar si el texto de Whisper es una pregunta real (filtro anti-alucinaciones)
    validarPreguntaVoz(texto) {
      if (!texto || texto.trim().length === 0) {
        return { valida: false, razon: 'No se detectó voz. Intenta de nuevo.' };
      }

      let limpio = texto;

      // 1) Eliminar frases típicas de YouTube/streaming (Whisper aprende de videos)
      const patronesAlucinacion = [
        /no pregunté, perdón.*/gi,
        /gracias por ver.*/gi,
        /subtítulos.*(por|hecho por).*/gi,
        /suscríbete.*/gi,
        /amara\.org.*/gi,
        /quería ser un flagrante.*/gi,
        /la formación en brave.*/gi,
        /como en que un.*/gi,
        /thanks for watching.*/gi,
        /subscribe.*/gi,
        /subtitles by.*/gi,
        /www\..*\.com/gi,
        /^\s*[\.,\s\?¡¿!\-]*$/,
        /^[\s\.\,\?\!\-]+$/
      ];
      patronesAlucinacion.forEach(p => { limpio = limpio.replace(p, ''); });
      limpio = limpio.trim();

      // 2) Longitud mínima
      if (limpio.length < 5) {
        return { valida: false, razon: 'No se detectó voz clara. Habla más cerca del micrófono.' };
      }

      // 3) Al menos 2 palabras reales (con 2+ letras cada una)
      const palabrasReales = limpio.split(/\s+/).filter(p => /[a-záéíóúñü]{2,}/i.test(p));
      if (palabrasReales.length < 2) {
        return { valida: false, razon: 'No se detectó una pregunta clara. Intenta de nuevo.' };
      }

      // 4) Al menos una vocal (evita cadenas de números/símbolos)
      if (!/[aeiouáéíóúñ]/i.test(limpio)) {
        return { valida: false, razon: 'No se detectó voz comprensible.' };
      }

      // 5) Al menos un indicio de pregunta (interrogativo, verbo, o palabra clave)
      const tieneIndicadorPregunta = 
        /\?/.test(limpio) ||
        /\b(qué|que|cómo|como|cuál|cual|cuándo|cuando|dónde|donde|por qué|porque|quién|quien|cuánto|cuanto|cuánta|cuanta|hay|está|esta|están|estan|puede|puedes|debe|debes|tiene|tienes|dime|dame|muestra|explícame|explicame|resume|analiza|compara|calcula|evalúa|evalua)\b/i.test(limpio);

      if (!tieneIndicadorPregunta) {
        return { valida: false, razon: 'No se detectó una pregunta. Intenta decir algo como "¿Cuál es el CPI?"' };
      }

      return { valida: true, textoLimpio: limpio };
    },


    // Helper: escapar HTML para evitar XSS
    escapeHtml(text) {
      if (!text) return '';
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    },




    wireEvents() {
      const input = document.getElementById('ds-chat-input');
      const send = document.getElementById('ds-chat-send');
      const log = document.getElementById('ds-chat-log');

      const ask = async (question) => {
        if (!question.trim()) return;
        log.insertAdjacentHTML('beforeend', `<div class="ds-chat-msg user"><div class="ds-chat-bubble">${question}</div></div>`);
        log.scrollTop = log.scrollHeight;

        try {
          const answer = await Assistant.respond(question);
          log.insertAdjacentHTML('beforeend', `<div class="ds-chat-msg bot"><div class="ds-chat-bubble">${answer}</div></div>`);
          log.scrollTop = log.scrollHeight;
        } catch (e) {
          console.error('❌ Error en chat:', e);
          log.insertAdjacentHTML('beforeend', `<div class="ds-chat-msg bot"><div class="ds-chat-bubble">⚠️ Error inesperado. Intenta de nuevo.</div></div>`);
        }
      };

      send.addEventListener('click', () => { ask(input.value); input.value = ''; });
      // 🎤 Botón de micrófono
      const micBtn = document.getElementById('ds-btn-mic');
      if (micBtn) {
        micBtn.addEventListener('click', () => this.handleMicClick());
      }
      input.addEventListener('keypress', e => {
        if (e.key === 'Enter') { ask(input.value); input.value = ''; }
      });



      // Selector de rol
      document.querySelectorAll('.ds-role-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const role = btn.dataset.role;
          ROL_ACTIVO = role;

          // Actualizar UI
          document.querySelectorAll('.ds-role-btn').forEach(b => b.classList.remove('ds-role-active'));
          btn.classList.add('ds-role-active');

          // Confirmar en el chat
          const log = document.getElementById('ds-chat-log');
          if (log) {
            log.insertAdjacentHTML('beforeend', `
              <div class="ds-chat-msg bot">
                <div class="ds-chat-bubble">
                  ✅ Rol cambiado a <strong>${role}</strong>. A partir de ahora mis respuestas tendrán enfoque de ${role === 'CFO' ? 'director financiero' : role === 'CEO' ? 'dirección ejecutiva' : role === 'COO' ? 'dirección de operaciones' : role === 'PMO' ? 'gestión de proyectos' : 'auditoría y compliance'}.
                </div>
              </div>
            `);
            log.scrollTop = log.scrollHeight;
          }
        });
      });



      document.querySelectorAll('.ds-chat-chip').forEach(chip => {
        chip.addEventListener('click', () => ask(chip.dataset.q));
      });
    }
  };

  /* ==========================================================
     SECCIÓN 12 · BOOT — Auto-detección e inyección del botón
     ========================================================== */
  function injectButton(overlay) {
    if (overlay.querySelector('.ds-btn-ia')) return;
    const headerActions = overlay.querySelector('.vip-blue-header > div:last-child') || overlay.querySelector('.vip-blue-header');
    if (!headerActions) return;
    const btn = document.createElement('button');
    btn.className = 'ds-btn-ia';
    btn.innerHTML = '🧠 IA Analytics';
    btn.onclick = () => UI.open();
    headerActions.insertBefore(btn, headerActions.firstChild);
    console.log('🧠 [DataScience] Botón IA inyectado');
  }

  function watchForDashboard() {
    // Ya está abierto
    const existing = document.querySelector('.vip-blue-overlay');
    if (existing) injectButton(existing);

    // Observar cambios
    const obs = new MutationObserver(() => {
      const ov = document.querySelector('.vip-blue-overlay');
      if (ov && !ov.querySelector('.ds-btn-ia')) injectButton(ov);
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  // === API PÚBLICA ===
      window.EVMAI = {
    open: () => UI.open(),
    openHistory: () => UI.openHistory(),
    openComparison: () => UI.openComparison(),
    close: () => {
      const ov = document.getElementById('ds-ia-overlay');
      if (ov) ov.remove();
            const hp = document.getElementById('ds-history-panel');
      if (hp) hp.remove();
      const cp = document.getElementById('ds-comparison-panel');
      if (cp) cp.remove();
    },
        exportReport: async () => {
      const overlay = document.getElementById('ds-ia-overlay');
      if (!overlay) {
        alert('⚠️ Abre primero el análisis IA.');
        return;
      }

      // Recolectar datos actuales
      const data = DataExtractor.extract();
      if (!data) {
        alert('⚠️ No hay datos disponibles para exportar.');
        return;
      }

      const metrics = UI.computeMetrics(data);
      Assistant.buildKB(data, metrics);
      Assistant.kb.tasks = data.tasks;

      const k = Assistant.kb;
      const story = Storyteller.generate(data, metrics);
      const recomendaciones = metrics.recommendations || [];

      // Últimas 5 conversaciones (si el panel está abierto, usarlas; si no, fetch del backend)
      let conversaciones = [];
      try {
        const token = localStorage.getItem('token') || localStorage.getItem('authToken');
        const clienteId = localStorage.getItem('clienteId');
        const pIdx = window.currentProjectIndex || 0;
        const project = window.projects?.[pIdx];

        if (token && clienteId && project) {
          const API_URL = window.API_URL || 'https://mi-sistema-proyectos-backend-4.onrender.com';
          const r = await fetch(`${API_URL}/api/chat-history/${project.id}?clienteId=${clienteId}&limit=5`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const histData = await r.json();
          if (histData.success && histData.conversaciones) {
            conversaciones = histData.conversaciones;
          }
        }
      } catch (e) {
        console.warn('No se pudo cargar el histórico de conversaciones para el PDF:', e);
      }

      // Construir HTML del reporte
      const fechaGeneracion = new Date().toLocaleString('es-ES', {
        day: '2-digit', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });

      const cpiColor = k.CPI >= 1 ? '#22c55e' : k.CPI >= 0.95 ? '#f59e0b' : '#ef4444';
      const spiColor = k.SPI >= 1 ? '#22c55e' : k.SPI >= 0.95 ? '#f59e0b' : '#ef4444';
      const vacColor = k.VAC >= 0 ? '#22c55e' : '#ef4444';
      const probSobrecosto = metrics.monteCarlo?.probabilityOverBudget ?? 0;
      const probColor = probSobrecosto < 0.3 ? '#22c55e' : probSobrecosto < 0.7 ? '#f59e0b' : '#ef4444';

      const htmlReporte = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Reporte Ejecutivo IA — ${k.project}</title>
<style>
  @page { size: A4; margin: 18mm 16mm; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body {
    margin: 0; padding: 0;
    font-family: 'Georgia', 'Times New Roman', serif;
    color: #1a1a2e; background: #fff; line-height: 1.55; font-size: 11pt;
  }
  .cover {
    page-break-after: always; height: 100vh;
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 30mm 20mm;
    background: linear-gradient(160deg, #0a0620 0%, #1e1145 50%, #2d1a6e 100%);
    color: #fff;
  }
  .cover-top { }
  .cover-brand {
    font-size: 10pt; letter-spacing: 6px; text-transform: uppercase;
    color: #a78bfa; font-weight: 700; margin-bottom: 40px;
  }
  .cover-title {
    font-size: 42pt; font-weight: 900; letter-spacing: -1px; line-height: 1.1;
    margin: 0 0 20px 0;
    background: linear-gradient(135deg, #fff 0%, #c4b5fd 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .cover-subtitle {
    font-size: 13pt; color: #ddd6fe; font-weight: 300; font-style: italic;
    letter-spacing: 1px; max-width: 500px;
  }
  .cover-divider {
    width: 80px; height: 3px; background: #a78bfa; margin: 30px 0;
  }
  .cover-project {
    font-size: 20pt; font-weight: 700; color: #fff; margin-top: 20px;
  }
  .cover-project-label {
    font-size: 9pt; letter-spacing: 4px; text-transform: uppercase;
    color: #a78bfa; margin-bottom: 8px; font-weight: 700;
  }
  .cover-bottom {
    border-top: 1px solid rgba(167,139,250,0.3);
    padding-top: 20px; display: flex; justify-content: space-between;
    font-size: 9pt; color: #b8a4e8; letter-spacing: 1px;
  }
  .cover-status {
    display: inline-block; padding: 8px 18px; border-radius: 100px;
    background: rgba(167,139,250,0.15); border: 1px solid rgba(167,139,250,0.5);
    font-size: 9pt; letter-spacing: 3px; text-transform: uppercase;
    color: #ddd6fe; font-weight: 700; margin-top: 20px;
  }

  .page {
    padding: 0; page-break-after: always;
  }
  .page:last-child { page-break-after: auto; }

  .page-header {
    border-bottom: 2px solid #2d1a6e;
    padding-bottom: 12px; margin-bottom: 24px;
    display: flex; justify-content: space-between; align-items: flex-end;
  }
  .page-header-title {
    font-size: 18pt; font-weight: 900; color: #2d1a6e; letter-spacing: -0.5px;
    margin: 0;
  }
  .page-header-meta {
    font-size: 8pt; color: #666; letter-spacing: 2px; text-transform: uppercase;
  }

  .section { margin-bottom: 26px; }
  .section-title {
    font-size: 12pt; font-weight: 900; color: #2d1a6e;
    letter-spacing: 2px; text-transform: uppercase;
    padding-bottom: 6px; border-bottom: 1px solid #c4b5fd; margin-bottom: 14px;
  }

  .story-block {
    padding: 18px 22px; background: #f8f5ff;
    border-left: 4px solid #7c3aed; font-size: 11pt; line-height: 1.7;
    color: #1a1a2e; font-style: italic;
  }
  .story-block strong { color: #2d1a6e; font-style: normal; }
  .story-block em { color: #7c3aed; font-style: normal; font-weight: 700; }

  .kpi-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
    margin-bottom: 20px;
  }
  .kpi-box {
    padding: 14px 16px; border: 1px solid #e0d9f5; border-radius: 8px;
    background: #fafaff;
  }
  .kpi-box-label {
    font-size: 8pt; letter-spacing: 2px; text-transform: uppercase;
    color: #7c3aed; font-weight: 700; margin-bottom: 6px;
  }
  .kpi-box-value {
    font-size: 20pt; font-weight: 900; color: #1a1a2e; letter-spacing: -1px;
    line-height: 1; margin-bottom: 4px;
    font-variant-numeric: tabular-nums;
  }
  .kpi-box-desc { font-size: 8.5pt; color: #666; font-style: italic; }

  .data-table {
    width: 100%; border-collapse: collapse; font-size: 10pt;
  }
  .data-table th {
    background: #2d1a6e; color: #fff; padding: 10px 12px;
    text-align: left; font-size: 8.5pt; letter-spacing: 1.5px;
    text-transform: uppercase; font-weight: 700;
  }
  .data-table td {
    padding: 10px 12px; border-bottom: 1px solid #e0d9f5;
  }
  .data-table tr:last-child td { border-bottom: 2px solid #2d1a6e; }
  .data-table .value-col { text-align: right; font-weight: 700; font-variant-numeric: tabular-nums; }

  .rec-item {
    display: flex; gap: 14px; padding: 14px 18px; margin-bottom: 10px;
    background: #fafaff; border-left: 4px solid #7c3aed; border-radius: 4px;
    page-break-inside: avoid;
  }
  .rec-badge {
    flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%;
    background: #7c3aed; color: #fff; font-weight: 900; font-size: 13pt;
    display: flex; align-items: center; justify-content: center;
  }
  .rec-content { flex: 1; }
  .rec-title { font-size: 11pt; font-weight: 900; color: #2d1a6e; margin-bottom: 4px; }
  .rec-detail { font-size: 9.5pt; color: #444; line-height: 1.55; }

  .chat-item {
    padding: 14px 18px; margin-bottom: 12px;
    border-left: 3px solid #c4b5fd; background: #fafaff;
    page-break-inside: avoid;
  }
  .chat-meta {
    font-size: 8pt; color: #7c3aed; letter-spacing: 2px;
    text-transform: uppercase; font-weight: 700; margin-bottom: 6px;
  }
  .chat-q { font-size: 10.5pt; font-weight: 700; color: #1a1a2e; margin-bottom: 6px; }
  .chat-a { font-size: 10pt; color: #333; line-height: 1.55; }

  .footer-note {
    text-align: center; font-size: 8pt; color: #888;
    letter-spacing: 3px; text-transform: uppercase;
    margin-top: 30px; padding-top: 16px; border-top: 1px solid #e0d9f5;
  }

  @media print {
    .cover { height: 297mm; }
    .page { page-break-after: always; }
    .page:last-child { page-break-after: auto; }
    body { font-size: 10.5pt; }
  }
</style>
</head>
<body>

<!-- PORTADA -->
<div class="cover">
  <div class="cover-top">
    <div class="cover-brand">Executive Intelligence Report</div>
    <h1 class="cover-title">Análisis Ejecutivo<br>de Proyecto</h1>
    <div class="cover-divider"></div>
    <div class="cover-subtitle">
      Informe confidencial preparado con análisis predictivo,<br>
      inteligencia artificial y evaluación de valor ganado (EVM).
    </div>
    <div class="cover-status">Confidencial</div>
  </div>
  <div class="cover-bottom-block">
    <div class="cover-project-label">Proyecto</div>
    <div class="cover-project">${k.project}</div>
    <div class="cover-bottom" style="margin-top: 40px;">
      <div>ROL ACTIVO · ${ROL_ACTIVO}</div>
      <div>GENERADO · ${fechaGeneracion}</div>
    </div>
  </div>
</div>

<!-- PÁGINA 1: RESUMEN EJECUTIVO -->
<div class="page">
  <div class="page-header">
    <h2 class="page-header-title">Resumen Ejecutivo</h2>
    <div class="page-header-meta">${k.project}</div>
  </div>

  <div class="section">
    <div class="story-block">${story}</div>
  </div>

  <div class="section">
    <h3 class="section-title">Indicadores Clave del Proyecto</h3>
    <div class="kpi-grid">
      <div class="kpi-box">
        <div class="kpi-box-label">CPI · Eficiencia Costos</div>
        <div class="kpi-box-value" style="color: ${cpiColor};">${k.CPI.toFixed(2)}</div>
        <div class="kpi-box-desc">${k.CPI >= 1 ? 'Óptimo' : k.CPI >= 0.95 ? 'En tolerancia' : 'Requiere atención'}</div>
      </div>
      <div class="kpi-box">
        <div class="kpi-box-label">SPI · Eficiencia Cronograma</div>
        <div class="kpi-box-value" style="color: ${spiColor};">${k.SPI.toFixed(2)}</div>
        <div class="kpi-box-desc">${k.SPI >= 1 ? 'Adelantado' : k.SPI >= 0.95 ? 'En tiempo' : 'Retrasado'}</div>
      </div>
      <div class="kpi-box">
        <div class="kpi-box-label">VAC · Variación Final</div>
        <div class="kpi-box-value" style="color: ${vacColor};">${k.VAC >= 0 ? '+' : '-'}${fmtMoney(Math.abs(k.VAC))}</div>
        <div class="kpi-box-desc">${k.VAC >= 0 ? 'Ahorro proyectado' : 'Sobrecosto proyectado'}</div>
      </div>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>Métrica</th>
          <th class="value-col">Valor</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>BAC</strong> · Presupuesto Total</td><td class="value-col">${fmtMoney(k.BAC)}</td><td>Monto autorizado del proyecto</td></tr>
        <tr><td><strong>PV</strong> · Valor Planificado</td><td class="value-col">${fmtMoney(k.PV)}</td><td>Trabajo planificado a la fecha</td></tr>
        <tr><td><strong>EV</strong> · Valor Ganado</td><td class="value-col">${fmtMoney(k.EV)}</td><td>Trabajo realmente completado</td></tr>
        <tr><td><strong>AC</strong> · Costo Real</td><td class="value-col">${fmtMoney(k.AC)}</td><td>Costo incurrido a la fecha</td></tr>
        <tr><td><strong>EAC</strong> · Estimación al Cierre</td><td class="value-col">${fmtMoney(k.EAC)}</td><td>Proyección total del proyecto</td></tr>
        <tr><td><strong>Progreso Actual</strong></td><td class="value-col">${k.pctComp.toFixed(1)}%</td><td>Avance sobre el presupuesto</td></tr>
      </tbody>
    </table>
  </div>

  <div class="footer-note">Executive Intelligence Report · ${k.project}</div>
</div>

<!-- PÁGINA 2: ANÁLISIS PREDICTIVO -->
<div class="page">
  <div class="page-header">
    <h2 class="page-header-title">Análisis Predictivo</h2>
    <div class="page-header-meta">${k.project}</div>
  </div>

  <div class="section">
    <h3 class="section-title">Simulación Monte Carlo (${CFG.mcIterations} iteraciones)</h3>
    <table class="data-table">
      <thead>
        <tr>
          <th>Escenario</th>
          <th class="value-col">EAC Proyectado</th>
          <th>Interpretación</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>Optimista (P10)</strong></td><td class="value-col" style="color:#22c55e;">${fmtMoney(metrics.monteCarlo.p10)}</td><td>Mejor caso con 10% de probabilidad</td></tr>
        <tr><td><strong>Base (P50)</strong></td><td class="value-col" style="color:#7c3aed;">${fmtMoney(metrics.monteCarlo.p50)}</td><td>Escenario más probable</td></tr>
        <tr><td><strong>Pesimista (P90)</strong></td><td class="value-col" style="color:#ef4444;">${fmtMoney(metrics.monteCarlo.p90)}</td><td>Peor caso con 10% de probabilidad</td></tr>
        <tr><td><strong>Probabilidad Sobrecosto</strong></td><td class="value-col" style="color:${probColor};">${(probSobrecosto * 100).toFixed(0)}%</td><td>Riesgo de exceder el presupuesto</td></tr>
      </tbody>
    </table>
  </div>

  ${metrics.eta ? `
  <div class="section">
    <h3 class="section-title">Proyección Temporal</h3>
    <table class="data-table">
      <thead>
        <tr>
          <th>Indicador</th>
          <th class="value-col">Valor</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Fecha estimada de finalización</td><td class="value-col">${metrics.eta.eta.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</td></tr>
        <tr><td>Días restantes estimados</td><td class="value-col">${Math.round(metrics.eta.daysNeeded)} días</td></tr>
        <tr><td>Velocidad actual de ejecución</td><td class="value-col">${fmtMoney(metrics.eta.velocity)} / día</td></tr>
      </tbody>
    </table>
  </div>` : ''}

  ${metrics.nn ? `
  <div class="section">
    <h3 class="section-title">Modelo Predictivo · Red Neuronal (MLP 4-5-1)</h3>
    <div class="kpi-box" style="margin-bottom: 14px;">
      <div class="kpi-box-label">Confianza Global de Cumplimiento</div>
      <div class="kpi-box-value" style="color: ${metrics.nn.confidence >= 0.7 ? '#22c55e' : metrics.nn.confidence >= 0.4 ? '#f59e0b' : '#ef4444'};">${(metrics.nn.confidence * 100).toFixed(1)}%</div>
      <div class="kpi-box-desc">Modelo entrenado con ${metrics.nn.trainedEpochs} épocas sobre los datos del proyecto</div>
    </div>
    <table class="data-table">
      <thead>
        <tr>
          <th>Tarea con Mayor Riesgo</th>
          <th class="value-col">Nivel de Riesgo</th>
        </tr>
      </thead>
      <tbody>
        ${metrics.nn.perTask.slice(0, 5).map(t => `
          <tr>
            <td>${(t.name || '').substring(0, 60)}</td>
            <td class="value-col" style="color:${t.risk > 0.6 ? '#ef4444' : t.risk > 0.3 ? '#f59e0b' : '#22c55e'};">${(t.risk * 100).toFixed(0)}%</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>` : ''}

  <div class="footer-note">Executive Intelligence Report · ${k.project}</div>
</div>

<!-- PÁGINA 3: RECOMENDACIONES -->
<div class="page">
  <div class="page-header">
    <h2 class="page-header-title">Recomendaciones Ejecutivas</h2>
    <div class="page-header-meta">${k.project}</div>
  </div>

  <div class="section">
    <h3 class="section-title">Plan de Acción Priorizado</h3>
    ${recomendaciones.map(r => `
      <div class="rec-item">
        <div class="rec-badge" style="background: ${r.c};">${r.p}</div>
        <div class="rec-content">
          <div class="rec-title">${r.title}</div>
          <div class="rec-detail">${r.detail}</div>
        </div>
      </div>
    `).join('')}
  </div>

  ${conversaciones.length > 0 ? `
  <div class="section">
    <h3 class="section-title">Consultas Clave al Asistente IA</h3>
    ${conversaciones.map(c => `
      <div class="chat-item">
        <div class="chat-meta">${c.rol || 'PMO'} · ${new Date(c.timestamp).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}</div>
        <div class="chat-q">❓ ${c.pregunta}</div>
        <div class="chat-a">${c.respuesta.replace(/<[^>]*>/g, '').substring(0, 500)}${c.respuesta.length > 500 ? '...' : ''}</div>
      </div>
    `).join('')}
  </div>` : ''}

  <div class="footer-note">Executive Intelligence Report · ${k.project} · CONFIDENCIAL</div>
</div>

</body>
</html>`;

      // Abrir en nueva pestaña y lanzar impresión
      const w = window.open('', '_blank');
      if (!w) {
        alert('⚠️ Permite las ventanas emergentes para exportar el reporte.');
        return;
      }
      w.document.write(htmlReporte);
      w.document.close();

      // Esperar a que se renderice antes de imprimir
      setTimeout(() => {
        w.focus();
        w.print();
      }, 600);
    },
    version: CFG.version,
    analyze: () => {
      const data = DataExtractor.extract();
      if (!data) return null;
      const metrics = UI.computeMetrics(data);
      return { data, metrics };
    }
  };

  // === ARRANQUE ===
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectStyles();
      watchForDashboard();
    });
  } else {
    injectStyles();
    watchForDashboard();
  }

  console.log(`✅ ${CFG.name} v${CFG.version} cargado — listo para analizar dashboards EVM`);

})();