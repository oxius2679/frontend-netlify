// ============================================================
// 🗺️ RECABA - ECOSISTEMA DE INVERSIÓN 3D PREMIUM
// Versión 5.0 - Adaptado a Red Canaria de Business Angels
// ============================================================

(function() {
    'use strict';

    const CONFIG = {
        CORRIDOR_ID: 'RECABA-2026-001',
        CORRIDOR_NOMBRE: 'Ecosistema de Inversión RECABA',
        CENTRO_MAPA: [19.4326, -99.1332], // México
        ZOOM_MAPA: 4
    };

    const CORREDOR = {
        nombre: CONFIG.CORRIDOR_NOMBRE,
        paises: [
            { id: 'CAN', nombre: 'Canarias', lat: 28.5, lon: -15.5, color: '#8b5cf6', activo: true, hitos: 8, flag: '🌴', continente: 'Europa (Islas)' },
            { id: 'PEN', nombre: 'Península', lat: 40.4, lon: -3.7, color: '#3b82f6', activo: true, hitos: 6, flag: '🇪🇸', continente: 'Europa' },
            { id: 'MEX', nombre: 'México', lat: 19.4326, lon: -99.1332, color: '#f59e0b', activo: true, hitos: 4, flag: '🇲🇽', continente: 'América' }
        ],
        conexiones: [
            { from: 'CAN', to: 'PEN', tipo: 'inversión', estado: 'activo', color: '#10b981' },
            { from: 'PEN', to: 'MEX', tipo: 'inversión', estado: 'planificado', color: '#f59e0b' },
            { from: 'CAN', to: 'MEX', tipo: 'co-inversión', estado: 'activo', color: '#8b5cf6' }
        ],
        etapas: [
            { id: 'E1', nombre: 'Startup GreenCan (pre-seed)', pais: 'CAN', estado: 'completed', fechaInicio: '2026-07-01', fechaFinReal: '2026-07-15', duracionEstimada: 2, progress: 100, responsable: 'Ángel L.', prioridad: 'alta' },
            { id: 'E2', nombre: 'Validación comercial EcoTech', pais: 'CAN', estado: 'completed', fechaInicio: '2026-07-16', fechaFinReal: '2026-08-05', duracionEstimada: 3, progress: 100, responsable: 'Marta G.', prioridad: 'media' },
            { id: 'E3', nombre: 'Seed Round SunWave', pais: 'CAN', estado: 'inProgress', fechaInicio: '2026-08-01', fechaFinEstimada: '2026-09-15', duracionEstimada: 4, progress: 65, responsable: 'Carlos R.', prioridad: 'alta' },
            { id: 'E4', nombre: 'Growth Expansion SolarCan', pais: 'PEN', estado: 'pending', fechaInicio: null, fechaFinEstimada: '2026-10-01', duracionEstimada: 3, progress: 0, responsable: 'Elena V.', prioridad: 'media' },
            { id: 'E5', nombre: 'Serie A BioCanarias', pais: 'CAN', estado: 'inProgress', fechaInicio: '2026-08-10', fechaFinEstimada: '2026-09-30', duracionEstimada: 5, retraso: 2, progress: 70, responsable: 'Javier L.', prioridad: 'critica' },
            { id: 'E6', nombre: 'Internacionalización OceanTech', pais: 'MEX', estado: 'pending', fechaInicio: null, fechaFinEstimada: '2026-11-01', duracionEstimada: 4, progress: 0, responsable: 'Ana M.', prioridad: 'alta' },
            { id: 'E7', nombre: 'Co-inversión con fondo UE', pais: 'MEX', estado: 'pending', fechaInicio: null, fechaFinEstimada: '2026-12-01', duracionEstimada: 6, progress: 0, responsable: 'David P.', prioridad: 'alta' },
            { id: 'E8', nombre: 'Exit parcial (Startup 1)', pais: 'PEN', estado: 'completed', fechaInicio: '2026-07-20', fechaFinReal: '2026-08-20', duracionEstimada: 4, progress: 100, responsable: 'Equipo inversor', prioridad: 'alta' },
            { id: 'E9', nombre: 'Due diligence de impacto', pais: 'CAN', estado: 'inProgress', fechaInicio: '2026-08-15', fechaFinEstimada: '2026-09-10', duracionEstimada: 3, progress: 45, responsable: 'Comité ético', prioridad: 'media' },
            { id: 'E10', nombre: 'Seguimiento post-inversión', pais: 'CAN', estado: 'completed', fechaInicio: '2026-07-01', fechaFinReal: '2026-08-01', duracionEstimada: 4, progress: 100, responsable: 'Gestores', prioridad: 'media' }
        ],
        metricas: {
            totalShipments: 12,
            onTime: 8,
            delayed: 2,
            avgTransitTime: 3.2,
            complianceRate: 95,
            costEfficiency: 87,
            customerSatisfaction: 4.7
        },
        riesgos: [
            { id: 'R1', descripcion: 'Retraso en ronda de inversión (BioCanarias)', impacto: 'alto', probabilidad: 'media', mitigacion: 'Acercar a inversores institucionales' },
            { id: 'R2', descripcion: 'Cambios regulatorios en energías renovables', impacto: 'medio', probabilidad: 'media', mitigacion: 'Monitoreo legislativo' },
            { id: 'R3', descripcion: 'Fuga de talento en startups canarias', impacto: 'alto', probabilidad: 'baja', mitigacion: 'Programas de retención' },
            { id: 'R4', descripcion: 'Falta de coinversión internacional', impacto: 'medio', probabilidad: 'alta', mitigacion: 'Alianzas estratégicas' }
        ],
        sugerencias: [
            { id: 'S1', texto: 'Acelerar la ronda de BioCanarias con inversores privados', prioridad: 'alta' },
            { id: 'S2', texto: 'Establecer reuniones mensuales con los equipos de las startups', prioridad: 'alta' },
            { id: 'S3', texto: 'Revisar el pipeline de internacionalización para OceanTech', prioridad: 'media' },
            { id: 'S4', texto: 'Capacitar a los gestores en análisis de impacto social', prioridad: 'media' },
            { id: 'S5', texto: 'Implementar un dashboard de seguimiento para los business angels', prioridad: 'alta' }
        ]
    };

    // Datos EVM adaptados a inversiones (en €)
    const EVM_DATA = {
        BAC: 1000000,
        PV: 600000,
        EV: 500000,
        AC: 400000,
        SPI: 0.83,
        CPI: 1.25,
        EAC: 800000,
        ETC: 400000,
        VAC: 200000,
        CV: 100000,
        SV: -100000
    };

    // ============================================================
    // ESTILOS Y BOTÓN FLOTANTE
    // ============================================================
    function injectStyles() {
        if (document.getElementById('zackyCorredorStyles')) return;
        const style = document.createElement('style');
        style.id = 'zackyCorredorStyles';
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
            .zacky-corredor-overlay {
                position: fixed; top: 0; left: 0;
                width: 100vw; height: 100vh;
                background: rgba(0,0,0,0.75);
                backdrop-filter: blur(24px);
                z-index: 10000000;
                display: flex; align-items: center; justify-content: center;
                padding: 16px;
                animation: zackyFadeIn 0.5s ease;
            }
            @keyframes zackyFadeIn {
                from { opacity: 0; transform: scale(0.97); }
                to { opacity: 1; transform: scale(1); }
            }
            .zacky-corredor-modal {
                width: 98vw; max-width: 1700px; height: 94vh;
                background: radial-gradient(ellipse at 20% 30%, #1e293b 0%, #0a0a1a 100%);
                border-radius: 44px; border: 1px solid rgba(139,92,246,0.2);
                box-shadow: 0 40px 120px rgba(0,0,0,0.7);
                overflow: hidden; display: flex; flex-direction: column;
                position: relative; font-family: 'Inter', system-ui, sans-serif;
            }
            .zacky-corredor-header {
                padding: 14px 32px; background: rgba(0,0,0,0.35);
                backdrop-filter: blur(16px); border-bottom: 1px solid rgba(139,92,246,0.1);
                display: flex; justify-content: space-between; align-items: center;
                flex-shrink: 0; position: relative; z-index: 10;
                flex-wrap: wrap; gap: 12px;
            }
            .zacky-corredor-header-left { display: flex; align-items: center; gap: 14px; }
            .zacky-corredor-header-left .icon {
                width: 44px; height: 44px; border-radius: 14px;
                background: linear-gradient(135deg, #8b5cf6, #3b82f6);
                display: flex; align-items: center; justify-content: center;
                font-size: 22px; box-shadow: 0 8px 24px rgba(139,92,246,0.3);
            }
            .zacky-corredor-header-title h1 {
                margin: 0; font-size: 22px; font-weight: 700; color: white;
                letter-spacing: -0.3px;
            }
            .zacky-corredor-header-title p {
                margin: 2px 0 0 0; font-size: 13px; color: #94a3b8;
            }
            .zacky-corredor-header-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
            .zacky-corredor-close {
                background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.25);
                color: #fca5a5; padding: 8px 20px; border-radius: 40px;
                cursor: pointer; font-weight: 600; font-size: 13px;
                transition: all 0.3s;
            }
            .zacky-corredor-close:hover {
                background: #ef4444; color: white; border-color: #ef4444;
                transform: scale(1.03);
            }
            .zacky-corredor-voice-selector {
                background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
                border-radius: 40px; padding: 6px 16px 6px 12px;
                color: white; font-size: 13px; cursor: pointer; outline: none;
                backdrop-filter: blur(4px);
            }
            .zacky-corredor-voice-selector option { background: #1e293b; color: white; }
            .zacky-corredor-pdf-btn {
                background: linear-gradient(135deg, #f59e0b, #d97706);
                border: none; color: #0a0a1a; padding: 8px 20px; border-radius: 40px;
                cursor: pointer; font-weight: 700; font-size: 13px;
                transition: all 0.3s; box-shadow: 0 4px 12px rgba(245,158,11,0.3);
                display: inline-flex; align-items: center; gap: 6px;
            }
            .zacky-corredor-pdf-btn:hover {
                transform: scale(1.04); box-shadow: 0 6px 20px rgba(245,158,11,0.5);
            }
            .zacky-corredor-body {
                flex: 1; overflow-y: auto; padding: 20px 28px 28px 28px;
                position: relative; z-index: 2;
            }
            .zacky-corredor-body::-webkit-scrollbar { width: 5px; }
            .zacky-corredor-body::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 10px; }
            .zacky-corredor-body::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #8b5cf6, #3b82f6); border-radius: 10px; }
            .zacky-corredor-grid {
                display: grid; grid-template-columns: 1.6fr 1fr; gap: 24px; margin-bottom: 24px;
            }
            .zacky-corredor-mapa {
                background: rgba(15,23,42,0.5); backdrop-filter: blur(8px);
                border-radius: 24px; padding: 16px;
                border: 1px solid rgba(255,255,255,0.06);
                position: relative; overflow: hidden;
                display: flex; flex-direction: column; height: 100%; min-height: 520px;
            }
            .zacky-corredor-mapa .mapa-titulo {
                position: absolute; top: 18px; left: 22px;
                font-size: 13px; font-weight: 600; color: #a78bfa;
                letter-spacing: 0.5px; z-index: 5;
                background: rgba(0,0,0,0.5); padding: 4px 16px;
                border-radius: 40px; backdrop-filter: blur(4px); pointer-events: none;
            }
            .zacky-corredor-mapa #zackyMapContainer {
                flex: 1; width: 100%; height: 100%; min-height: 0;
                border-radius: 16px; overflow: auto;
            }
            .zacky-corredor-right { display: flex; flex-direction: column; gap: 20px; }
            .zacky-corredor-card {
                background: rgba(30,41,59,0.45); backdrop-filter: blur(8px);
                border-radius: 20px; padding: 18px 20px;
                border: 1px solid rgba(255,255,255,0.04);
                transition: all 0.3s ease;
            }
            .zacky-corredor-card:hover {
                border-color: rgba(139,92,246,0.15);
                box-shadow: 0 8px 30px rgba(0,0,0,0.15);
            }
            .zacky-corredor-card-title {
                font-size: 14px; font-weight: 600; color: #a78bfa;
                margin-bottom: 12px; display: flex; align-items: center; gap: 8px;
            }
            .zacky-corredor-kpis {
                display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
            }
            .zacky-corredor-kpi {
                background: rgba(0,0,0,0.2); border-radius: 14px;
                padding: 12px 10px; text-align: center;
            }
            .zacky-corredor-kpi .valor {
                font-size: 26px; font-weight: 800; color: white; line-height: 1.2;
            }
            .zacky-corredor-kpi .label {
                font-size: 10px; color: #94a3b8;
                text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px;
            }
            .zacky-corredor-evm {
                display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 8px;
            }
            .zacky-corredor-evm-item {
                background: rgba(0,0,0,0.2); border-radius: 12px;
                padding: 10px 8px; text-align: center;
                border: 1px solid rgba(255,255,255,0.04);
            }
            .zacky-corredor-evm-item .evm-valor {
                font-size: 20px; font-weight: 700; color: white;
            }
            .zacky-corredor-evm-item .evm-label {
                font-size: 9px; color: #94a3b8;
                text-transform: uppercase; letter-spacing: 0.3px; margin-top: 2px;
            }
            .zacky-corredor-evm-item .evm-desc {
                font-size: 8px; color: #64748b; margin-top: 3px; line-height: 1.2;
            }
            .zacky-corredor-evm-item .evm-badge {
                display: inline-block; padding: 1px 8px; border-radius: 12px;
                font-size: 7px; font-weight: 700; text-transform: uppercase; margin-top: 3px;
            }
            .evm-badge-green { background: rgba(16,185,129,0.2); color: #6ee7b7; }
            .evm-badge-red { background: rgba(239,68,68,0.2); color: #fca5a5; }
            .evm-badge-yellow { background: rgba(245,158,11,0.2); color: #fbbf24; }
            .evm-badge-blue { background: rgba(59,130,246,0.2); color: #93c5fd; }
            .zacky-corredor-charts {
                display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;
            }
            .zacky-corredor-chart-card {
                background: rgba(30,41,59,0.45); backdrop-filter: blur(8px);
                border-radius: 20px; padding: 18px 20px;
                border: 1px solid rgba(255,255,255,0.04);
            }
            .zacky-corredor-chart-card .chart-title {
                font-size: 14px; font-weight: 600; color: #a78bfa;
                margin-bottom: 12px; display: flex; align-items: center; gap: 8px;
            }
            .zacky-corredor-chart-card canvas {
                width: 100% !important; height: auto !important; max-height: 200px;
            }
            .zacky-corredor-table-wrap { overflow-x: auto; margin-top: 8px; }
            .zacky-corredor-table {
                width: 100%; border-collapse: collapse; font-size: 12px;
            }
            .zacky-corredor-table th {
                background: rgba(139,92,246,0.1); padding: 10px 14px; text-align: left;
                color: #c4b5fd; font-weight: 600; font-size: 10px;
                text-transform: uppercase; letter-spacing: 0.5px;
                border-bottom: 2px solid rgba(139,92,246,0.1);
            }
            .zacky-corredor-table td {
                padding: 9px 14px; border-bottom: 1px solid rgba(255,255,255,0.04);
                color: #e2e8f0;
            }
            .zacky-corredor-table tr:hover td { background: rgba(139,92,246,0.05); }
            .zacky-corredor-badge {
                display: inline-block; padding: 3px 12px; border-radius: 40px;
                font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px;
            }
            .badge-success { background: rgba(16,185,129,0.2); color: #6ee7b7; }
            .badge-warning { background: rgba(245,158,11,0.2); color: #fbbf24; }
            .badge-danger { background: rgba(239,68,68,0.2); color: #fca5a5; }
            .badge-info { background: rgba(59,130,246,0.2); color: #93c5fd; }
            .zacky-corredor-progress {
                width: 80px; height: 5px; background: #1e293b;
                border-radius: 10px; overflow: hidden;
                display: inline-block; vertical-align: middle;
            }
            .zacky-corredor-progress-fill {
                height: 100%; border-radius: 10px;
                background: linear-gradient(90deg, #8b5cf6, #3b82f6);
                transition: width 0.6s ease;
            }
            .zacky-corredor-story {
                background: linear-gradient(135deg, rgba(139,92,246,0.06), rgba(59,130,246,0.03));
                border: 1px solid rgba(139,92,246,0.12); border-radius: 20px;
                padding: 18px 22px; position: relative; overflow: hidden; margin-top: 12px;
            }
            .zacky-corredor-story::before {
                content: ''; position: absolute; top: -20%; right: -5%;
                width: 160px; height: 160px;
                background: radial-gradient(circle, rgba(139,92,246,0.08), transparent);
                border-radius: 50%;
            }
            .zacky-corredor-story-text {
                font-size: 14px; line-height: 1.7; color: #e2e8f0;
                position: relative; z-index: 2;
            }
            .zacky-corredor-story-text strong { color: #a78bfa; }
            .zacky-corredor-voice-btn {
                background: linear-gradient(135deg, #8b5cf6, #6d28d9);
                border: none; color: white; padding: 10px 22px; border-radius: 40px;
                cursor: pointer; font-weight: 600; font-size: 13px;
                display: inline-flex; align-items: center; gap: 8px;
                transition: all 0.3s; margin-top: 12px; margin-right: 10px;
                box-shadow: 0 4px 15px rgba(139,92,246,0.3); position: relative; z-index: 2;
            }
            .zacky-corredor-voice-btn:hover {
                transform: scale(1.04); box-shadow: 0 8px 25px rgba(139,92,246,0.5);
            }
            .zacky-corredor-voice-stop {
                background: rgba(239,68,68,0.2); border: 1px solid rgba(239,68,68,0.3);
                color: #fca5a5; padding: 10px 22px; border-radius: 40px;
                cursor: pointer; font-weight: 600; font-size: 13px;
                display: inline-flex; align-items: center; gap: 8px;
                transition: all 0.3s; margin-top: 12px; position: relative; z-index: 2;
            }
            .zacky-corredor-voice-stop:hover {
                background: #ef4444; color: white; border-color: #ef4444;
                transform: scale(1.04);
            }
            @media (max-width: 1200px) {
                .zacky-corredor-grid { grid-template-columns: 1fr; }
                .zacky-corredor-charts { grid-template-columns: 1fr; }
                .zacky-corredor-mapa { min-height: 400px; }
            }
            @media (max-width: 768px) {
                .zacky-corredor-modal { border-radius: 20px; height: 96vh; width: 98vw; }
                .zacky-corredor-header { padding: 12px 16px; }
                .zacky-corredor-body { padding: 14px; }
                .zacky-corredor-kpis { grid-template-columns: 1fr 1fr; }
                .zacky-corredor-evm { grid-template-columns: 1fr 1fr; }
                .zacky-corredor-kpi .valor { font-size: 20px; }
                .zacky-corredor-mapa #zackyMapContainer { min-height: 240px; }
            }
            @media (max-width: 480px) {
                .zacky-corredor-kpis { grid-template-columns: 1fr; }
                .zacky-corredor-header-title h1 { font-size: 17px; }
            }
            .zacky-pulse { animation: zackyPulse 2s infinite ease-in-out; }
            @keyframes zackyPulse {
                0% { opacity: 0.6; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.05); }
                100% { opacity: 0.6; transform: scale(1); }
            }
            @keyframes zackyPulseBtn {
                0% { box-shadow: 0 15px 45px rgba(139,92,246,0.5); }
                50% { box-shadow: 0 15px 70px rgba(139,92,246,0.8), 0 0 100px rgba(59,130,246,0.3); }
                100% { box-shadow: 0 15px 45px rgba(139,92,246,0.5); }
            }
        `;
        document.head.appendChild(style);
    }

    function crearBotonFlotante() {
        if (document.getElementById('zackyCorredorBtn')) return;
        const btn = document.createElement('div');
        btn.id = 'zackyCorredorBtn';
        btn.style.cssText = `
            position: fixed; bottom: 30px; right: 30px;
            width: 80px; height: 80px;
            background: linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4);
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 15px 45px rgba(139,92,246,0.6);
            cursor: pointer; z-index: 999999;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 2px solid rgba(255,255,255,0.2);
            backdrop-filter: blur(10px);
            animation: zackyPulseBtn 2.5s infinite ease-in-out;
        `;
        btn.innerHTML = `
            <span style="font-size:36px; filter:drop-shadow(0 4px 8px rgba(0,0,0,0.4));">🌍</span>
            <span style="position:absolute; bottom:-4px; right:-4px; background:linear-gradient(135deg,#f59e0b,#d97706); color:white; font-size:8px; padding:3px 10px; border-radius:20px; font-weight:700; letter-spacing:0.5px; box-shadow:0 4px 12px rgba(245,158,11,0.5); border:1px solid rgba(255,255,255,0.2);">PRO</span>
        `;
        btn.title = 'Abrir Ecosistema de Inversión RECABA';
        btn.onclick = function(e) { e.stopPropagation(); abrirCorredorDigital(); };
        btn.onmouseenter = function() {
            this.style.transform = 'scale(1.08) rotate(-3deg)';
            this.style.boxShadow = '0 20px 60px rgba(139,92,246,0.7)';
        };
        btn.onmouseleave = function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 15px 45px rgba(139,92,246,0.5)';
        };
        document.body.appendChild(btn);
        console.log('✅ Botón Ecosistema de Inversión RECABA creado');
    }

    // ============================================================
    // ABRIR CORREDOR (Adaptado)
    // ============================================================
    let mapaInstance = null;
    let chartInstances = {};
    let speechState = 'idle';
    let speechUtterance = null;

    function abrirCorredorDigital() {
        const prev = document.querySelector('.zacky-corredor-overlay');
        if (prev) { prev.remove(); if (window.speechSynthesis) window.speechSynthesis.cancel(); }
        injectStyles();
        const overlay = document.createElement('div');
        overlay.className = 'zacky-corredor-overlay';
        const modal = document.createElement('div');
        modal.className = 'zacky-corredor-modal';
        // Construir la cadena de flags dinámicamente
        const flagsStr = CORREDOR.paises.filter(p => p.activo).map(p => p.flag).join(' ');
        modal.innerHTML = `
            <div class="zacky-corredor-header">
                <div class="zacky-corredor-header-left">
                    <div class="icon">🌍</div>
                    <div class="zacky-corredor-header-title">
                        <h1>Ecosistema de Inversión RECABA</h1>
                        <p>${CONFIG.CORRIDOR_NOMBRE} · ${CORREDOR.paises.filter(p => p.activo).length} regiones activas (${flagsStr})</p>
                    </div>
                </div>
                <div class="zacky-corredor-header-right">
                    <span style="background:rgba(16,185,129,0.15); color:#6ee7b7; padding:4px 14px; border-radius:40px; font-size:11px; font-weight:600; border:1px solid rgba(16,185,129,0.2);">🟢 LIVE</span>
                    <select class="zacky-corredor-voice-selector" id="zackyVoiceSelector">
                        <option value="default">🔊 Voz por defecto</option>
                    </select>
                    <button class="zacky-corredor-pdf-btn" id="zackyPdfBtn">📄 Reporte PDF</button>
                    <button class="zacky-corredor-close" id="zackyCorredorClose"> Cerrar</button>
                </div>
            </div>
            <div class="zacky-corredor-body" id="zackyCorredorBody">
                <div style="text-align:center; padding:40px; color:#94a3b8;">Cargando dashboard de inversión...</div>
            </div>
        `;
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        document.getElementById('zackyCorredorClose').onclick = function() {
            overlay.remove();
            if (window.speechSynthesis) window.speechSynthesis.cancel();
            destruirGraficas();
        };
        overlay.onclick = function(e) {
            if (e.target === overlay) {
                overlay.remove();
                if (window.speechSynthesis) window.speechSynthesis.cancel();
                destruirGraficas();
            }
        };
        document.getElementById('zackyPdfBtn').addEventListener('click', function() { generarReportePDF(); });
        cargarVoces();
        renderizarDashboardCompleto();
        setTimeout(agregarSeccionesOperativas, 600);
    }

    // ============================================================
    // VOCES
    // ============================================================
    function cargarVoces() {
        const selector = document.getElementById('zackyVoiceSelector');
        if (!selector) return;
        if (!window.speechSynthesis) return;
        const voces = window.speechSynthesis.getVoices();
        if (voces.length === 0) {
            window.speechSynthesis.onvoiceschanged = function() {
                const nuevasVoces = window.speechSynthesis.getVoices();
                if (nuevasVoces.length > 0) {
                    const selector = document.getElementById('zackyVoiceSelector');
                    if (selector) {
                        selector.innerHTML = '';
                        const defaultOpt = document.createElement('option');
                        defaultOpt.value = 'default';
                        defaultOpt.textContent = '🔊 Voz por defecto';
                        selector.appendChild(defaultOpt);
                        nuevasVoces.forEach(v => {
                            const opt = document.createElement('option');
                            opt.value = v.name;
                            opt.textContent = v.name + (v.lang ? ' (' + v.lang + ')' : '');
                            selector.appendChild(opt);
                        });
                    }
                }
            };
            return;
        }
        selector.innerHTML = '';
        const defaultOpt = document.createElement('option');
        defaultOpt.value = 'default';
        defaultOpt.textContent = '🔊 Voz por defecto';
        selector.appendChild(defaultOpt);
        voces.forEach(v => {
            const opt = document.createElement('option');
            opt.value = v.name;
            opt.textContent = v.name + (v.lang ? ' (' + v.lang + ')' : '');
            selector.appendChild(opt);
        });
    }

    function getVozSeleccionada() {
        const selector = document.getElementById('zackyVoiceSelector');
        if (!selector || !window.speechSynthesis) return null;
        const nombre = selector.value;
        if (nombre === 'default') return null;
        const voces = window.speechSynthesis.getVoices();
        return voces.find(v => v.name === nombre) || null;
    }

    // ============================================================
    // RENDERIZAR DASHBOARD (Adaptado)
    // ============================================================
    function renderizarDashboardCompleto() {
        const body = document.getElementById('zackyCorredorBody');
        if (!body) return;
        const etapas = CORREDOR.etapas;
        const paises = CORREDOR.paises;
        const riesgos = CORREDOR.riesgos;
        const sugerencias = CORREDOR.sugerencias;
        const evm = EVM_DATA;
        const total = etapas.length;
        const completadas = etapas.filter(e => e.estado === 'completed').length;
        const enProgreso = etapas.filter(e => e.estado === 'inProgress').length;
        const criticas = etapas.filter(e => e.prioridad === 'critica').length;
        const progreso = total > 0 ? Math.round((completadas / total) * 100) : 0;
        const retrasos = etapas.reduce((s, e) => s + (e.retraso || 0), 0);
        const storyText = generarStorytelling(etapas, riesgos, progreso);

        let html = `
            <div class="zacky-corredor-grid">
                <div class="zacky-corredor-mapa">
                    <div class="mapa-titulo">🗺️ Ecosistema de Inversión · 3 regiones</div>
                    <div id="zackyMapContainer"></div>
                </div>
                <div class="zacky-corredor-right">
                    <div class="zacky-corredor-card">
                        <div class="zacky-corredor-card-title">📊 Métricas de la Cartera</div>
                        <div class="zacky-corredor-kpis">
                            <div class="zacky-corredor-kpi"><div class="valor" style="color:#8b5cf6;">${total}</div><div class="label">Total Hitos</div></div>
                            <div class="zacky-corredor-kpi"><div class="valor" style="color:#10b981;">${completadas}</div><div class="label">✅ Completados</div></div>
                            <div class="zacky-corredor-kpi"><div class="valor" style="color:#f59e0b;">${progreso}%</div><div class="label">📈 Progreso</div></div>
                            <div class="zacky-corredor-kpi"><div class="valor" style="color:#f59e0b;">${enProgreso}</div><div class="label">🔄 En Curso</div></div>
                            <div class="zacky-corredor-kpi"><div class="valor" style="color:#ef4444;">${criticas}</div><div class="label">🔥 Críticas</div></div>
                            <div class="zacky-corredor-kpi"><div class="valor" style="color:#06b6d4;">${retrasos}</div><div class="label">⏱️ Días retraso</div></div>
                        </div>
                        <div style="margin-top:12px; padding-top:10px; border-top:1px solid rgba(255,255,255,0.05); font-size:11px; color:#94a3b8;">
                            <strong style="color:#a78bfa;">Regiones activas:</strong> 
                            🌴 Canarias · 🇪🇸 Península · 🇲🇽 México
                        </div>
                    </div>
                    <div class="zacky-corredor-card">
                        <div class="zacky-corredor-card-title">📈 Valor Ganado (EVM) · Explicado</div>
                        <div style="font-size:12px; color:#94a3b8; margin-bottom:8px;">
                            <strong>¿Qué es EVM?</strong> Mide el desempeño financiero de la cartera combinando inversión, tiempo y valor generado.
                        </div>
                        <div class="zacky-corredor-evm">
                            <div class="zacky-corredor-evm-item"><div class="evm-valor" style="color:#3b82f6;">${evm.PV}€</div><div class="evm-label">📋 PV</div><div class="evm-desc">Planificado</div><span class="evm-badge evm-badge-blue">Base</span></div>
                            <div class="zacky-corredor-evm-item"><div class="evm-valor" style="color:#10b981;">${evm.EV}€</div><div class="evm-label">✅ EV</div><div class="evm-desc">Ganado</div><span class="evm-badge evm-badge-green">Progreso</span></div>
                            <div class="zacky-corredor-evm-item"><div class="evm-valor" style="color:#ef4444;">${evm.AC}€</div><div class="evm-label">💰 AC</div><div class="evm-desc">Real</div><span class="evm-badge evm-badge-red">Costo</span></div>
                            <div class="zacky-corredor-evm-item"><div class="evm-valor" style="color:${evm.SPI >= 1 ? '#10b981' : '#f59e0b'};">${evm.SPI.toFixed(2)}</div><div class="evm-label">⏱️ SPI</div><div class="evm-desc">${evm.SPI >= 1 ? 'Adelantado' : 'Retraso'}</div><span class="evm-badge ${evm.SPI >= 1 ? 'evm-badge-green' : 'evm-badge-yellow'}">${evm.SPI >= 1 ? 'Bueno' : 'Atención'}</span></div>
                            <div class="zacky-corredor-evm-item"><div class="evm-valor" style="color:${evm.CPI >= 1 ? '#10b981' : '#ef4444'};">${evm.CPI.toFixed(2)}</div><div class="evm-label">💵 CPI</div><div class="evm-desc">${evm.CPI >= 1 ? 'Eficiente' : 'Sobrecosto'}</div><span class="evm-badge ${evm.CPI >= 1 ? 'evm-badge-green' : 'evm-badge-red'}">${evm.CPI >= 1 ? 'Eficiente' : 'Alerta'}</span></div>
                            <div class="zacky-corredor-evm-item"><div class="evm-valor" style="color:#8b5cf6;">${evm.EAC}€</div><div class="evm-label">🔮 EAC</div><div class="evm-desc">Estimado final</div><span class="evm-badge evm-badge-blue">Pronóstico</span></div>
                            <div class="zacky-corredor-evm-item"><div class="evm-valor" style="color:#f59e0b;">${evm.ETC}€</div><div class="evm-label">📌 ETC</div><div class="evm-desc">Por completar</div><span class="evm-badge evm-badge-yellow">Restante</span></div>
                            <div class="zacky-corredor-evm-item"><div class="evm-valor" style="color:${evm.VAC >= 0 ? '#10b981' : '#ef4444'};">${evm.VAC >= 0 ? '+' : ''}${evm.VAC}€</div><div class="evm-label">📊 VAC</div><div class="evm-desc">${evm.VAC >= 0 ? 'Ahorro' : 'Sobrecosto'}</div><span class="evm-badge ${evm.VAC >= 0 ? 'evm-badge-green' : 'evm-badge-red'}">${evm.VAC >= 0 ? 'Bueno' : 'Atención'}</span></div>
                        </div>
                        <div style="margin-top:10px; font-size:11px; color:#94a3b8; text-align:center; border-top:1px solid rgba(255,255,255,0.05); padding-top:8px;">
                            <strong>Resumen:</strong> SPI ${evm.SPI.toFixed(2)} · CPI ${evm.CPI.toFixed(2)} · 
                            <span style="color:${evm.VAC >= 0 ? '#10b981' : '#ef4444'};">VAC ${evm.VAC >= 0 ? '+' : ''}${evm.VAC}€</span>
                        </div>
                    </div>

                    <!-- Valor para la Dirección (adaptado) -->
                    <div class="zacky-corredor-card" style="border: 1px solid rgba(212, 175, 55, 0.25); background: linear-gradient(145deg, rgba(212, 175, 55, 0.08), rgba(30, 41, 59, 0.7)); box-shadow: 0 4px 20px rgba(212, 175, 55, 0.05);">
                        <div class="zacky-corredor-card-title" style="color: #fbbf24; letter-spacing: 0.5px;">
                            🎯 Valor para la Dirección (Business Angels)
                        </div>
                        <div style="font-size: 15px; font-weight: 700; color: #fde68a; margin-bottom: 14px; border-left: 4px solid #f59e0b; padding-left: 14px; line-height: 1.4; background: rgba(0,0,0,0.2); border-radius: 0 8px 8px 0; padding: 8px 14px;">
                            "Este dashboard está diseñado para <span style="color: #ffffff;">Business Angels</span> y el <span style="color: #ffffff;">Comité de Inversión</span>"
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 4px;">
                            <div style="background: rgba(0,0,0,0.25); border-radius: 12px; padding: 12px 14px; border: 1px solid rgba(255,255,255,0.03);">
                                <div style="color: #f59e0b; font-weight: 700; font-size: 12px; display: flex; align-items: center; gap: 6px;">
                                    <span>📊</span> Rentabilidad Real
                                </div>
                                <div style="color: #94a3b8; font-size: 11px; line-height: 1.4; margin-top: 4px;">
                                    EVM traduce la operativa de las startups en <strong style="color:#e2e8f0;">KPIs financieros</strong> claros para los inversores.
                                </div>
                            </div>
                            <div style="background: rgba(0,0,0,0.25); border-radius: 12px; padding: 12px 14px; border: 1px solid rgba(255,255,255,0.03);">
                                <div style="color: #ef4444; font-weight: 700; font-size: 12px; display: flex; align-items: center; gap: 6px;">
                                    <span>⚠️</span> Alertas Tempranas
                                </div>
                                <div style="color: #94a3b8; font-size: 11px; line-height: 1.4; margin-top: 4px;">
                                    Detección de <strong style="color:#e2e8f0;">desviaciones y sobrecostes</strong> antes de que afecten a los retornos.
                                </div>
                            </div>
                            <div style="background: rgba(0,0,0,0.25); border-radius: 12px; padding: 12px 14px; border: 1px solid rgba(255,255,255,0.03);">
                                <div style="color: #3b82f6; font-weight: 700; font-size: 12px; display: flex; align-items: center; gap: 6px;">
                                    <span>🗺️</span> Visión Estratégica
                                </div>
                                <div style="color: #94a3b8; font-size: 11px; line-height: 1.4; margin-top: 4px;">
                                    Panorama completo del <strong style="color:#e2e8f0;">ecosistema de inversión</strong> en una sola vista, sin ruido operativo.
                                </div>
                            </div>
                            <div style="background: rgba(0,0,0,0.25); border-radius: 12px; padding: 12px 14px; border: 1px solid rgba(255,255,255,0.03);">
                                <div style="color: #8b5cf6; font-weight: 700; font-size: 12px; display: flex; align-items: center; gap: 6px;">
                                    <span>📈</span> Reporting Ejecutivo
                                </div>
                                <div style="color: #94a3b8; font-size: 11px; line-height: 1.4; margin-top: 4px;">
                                    <strong style="color:#e2e8f0;">PDF ejecutivo</strong> listo para presentar al comité de inversión y a los business angels.
                                </div>
                            </div>
                        </div>
                        <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid rgba(212, 175, 55, 0.1); font-size: 11px; color: #64748b; text-align: center; letter-spacing: 0.3px;">
                            🔹 La información que <span style="color:#94a3b8; font-weight:600;">realmente importa</span> para la toma de decisiones de inversión
                        </div>
                    </div>

                    <!-- Riesgos -->
                    <div class="zacky-corredor-card">
                        <div class="zacky-corredor-card-title">⚠️ Riesgos Identificados</div>
                        ${riesgos.map(r => `
                            <div style="display:flex; align-items:flex-start; gap:10px; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.04); font-size:13px; color:#cbd5e1; line-height:1.4;">
                                <span style="font-size:18px; flex-shrink:0;">${r.impacto === 'alto' ? '🔴' : r.impacto === 'medio' ? '🟡' : '🟢'}</span>
                                <div>
                                    <div><strong>${r.descripcion}</strong></div>
                                    <div style="font-size:11px; color:#94a3b8; margin-top:2px;">
                                        Impacto: <span class="zacky-corredor-badge ${r.impacto === 'alto' ? 'badge-danger' : r.impacto === 'medio' ? 'badge-warning' : 'badge-success'}">${r.impacto}</span>
                                        Probabilidad: ${r.probabilidad}
                                        <span style="margin-left:6px;">🛡️ ${r.mitigacion}</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <!-- Sugerencias -->
                    <div class="zacky-corredor-card">
                        <div class="zacky-corredor-card-title">💡 Sugerencias Estratégicas</div>
                        ${sugerencias.map(s => `
                            <div style="display:flex; align-items:flex-start; gap:10px; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.04); font-size:13px; color:#cbd5e1; line-height:1.4;">
                                <span style="font-size:18px; flex-shrink:0;">${s.prioridad === 'alta' ? '🔴' : '🟡'}</span>
                                <div>
                                    <div>${s.texto}</div>
                                    <div style="font-size:11px; color:#94a3b8; margin-top:2px;">
                                        Prioridad: <span class="zacky-corredor-badge ${s.prioridad === 'alta' ? 'badge-danger' : 'badge-warning'}">${s.prioridad}</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="zacky-corredor-charts">
                <div class="zacky-corredor-chart-card"><div class="chart-title">📊 Distribución de Hitos por Estado</div><canvas id="zackyChartDist"></canvas></div>
                <div class="zacky-corredor-chart-card"><div class="chart-title">📈 EVM · PV vs EV vs AC</div><canvas id="zackyChartEVM"></canvas></div>
                <div class="zacky-corredor-chart-card"><div class="chart-title">📉 Burndown · Progreso vs Ideal</div><canvas id="zackyChartBurndown"></canvas></div>
                <div class="zacky-corredor-chart-card"><div class="chart-title">🌍 Rendimiento por Región</div><canvas id="zackyChartPaises"></canvas></div>
            </div>
            <div class="zacky-corredor-card" style="margin-bottom:20px;">
                <div class="zacky-corredor-card-title">📋 Detalle Ejecutivo de Startups (🌴🇪🇸🇲🇽)</div>
                <div class="zacky-corredor-table-wrap">
                    <table class="zacky-corredor-table">
                        <thead><tr><th>ID</th><th>Hito / Startup</th><th>Región</th><th>Responsable</th><th>Estado</th><th>Progreso</th><th>Estimado</th><th>Retraso</th></tr></thead>
                        <tbody>
                            ${etapas.map(e => {
                                const estadoMap = { 'completed': { clase: 'badge-success', texto: '✅ Completado' }, 'inProgress': { clase: 'badge-warning', texto: '🔄 En Curso' }, 'pending': { clase: 'badge-info', texto: '⏳ Pendiente' } };
                                const badge = estadoMap[e.estado] || estadoMap['pending'];
                                const pais = paises.find(p => p.id === e.pais);
                                const retraso = e.retraso || 0;
                                return `<tr><td><strong style="color:#8b5cf6;">${e.id}</strong></td><td>${e.nombre}</td><td>${pais ? pais.flag + ' ' + pais.nombre : e.pais}</td><td style="color:#94a3b8;">${e.responsable}</td><td><span class="zacky-corredor-badge ${badge.clase}">${badge.texto}</span></td><td><div style="display:flex; align-items:center; gap:6px;"><div class="zacky-corredor-progress"><div class="zacky-corredor-progress-fill" style="width:${e.progress}%;"></div></div><span style="font-size:11px; color:#e2e8f0;">${e.progress}%</span></div></td><td>${e.duracionEstimada * 4}h</td><td style="color:${retraso > 0 ? '#ef4444' : '#10b981'}; font-weight:600;">${retraso > 0 ? `🔴 ${retraso}d` : '✅'}</td></tr>`;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="zacky-corredor-story">
                <div class="zacky-corredor-card-title" style="margin-bottom:6px;">📖 Storytelling Ejecutivo</div>
                <div class="zacky-corredor-story-text" id="zackyStoryText">${storyText}</div>
                <div style="display:flex; flex-wrap:wrap; gap:8px;">
                    <button class="zacky-corredor-voice-btn" id="zackyVoiceBtn">🔊 Escuchar Narración</button>
                    <button class="zacky-corredor-voice-stop" id="zackyVoiceStop">⏹️ Detener</button>
                </div>
            </div>
        `;

        body.innerHTML = html;
        setTimeout(() => inicializarMapa(), 300);
        setTimeout(() => inicializarGraficas(), 500);
        document.getElementById('zackyVoiceBtn').addEventListener('click', toggleNarracion);
        document.getElementById('zackyVoiceStop').addEventListener('click', detenerNarracion);
        cargarVoces();
    }

    // ============================================================
    // MAPA (adaptado a regiones)
    // ============================================================
    function inicializarMapa() {
        const container = document.getElementById('zackyMapContainer');
        if (!container) {
            console.error('❌ Contenedor #zackyMapContainer no encontrado');
            return;
        }

        container.style.width = '100%';
        container.style.height = '100%';
        container.style.minHeight = '500px';
        container.style.position = 'relative';
        container.style.overflow = 'hidden';
        container.style.background = 'transparent';
        container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#94a3b8;font-family:Inter,sans-serif;font-size:14px;">🔄 Cargando mapa 3D...</div>';

        if (typeof maplibregl === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.js';
            script.onload = () => {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.css';
                document.head.appendChild(link);
                setTimeout(() => inicializarMapa(), 300);
            };
            script.onerror = () => {
                container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#ef4444;font-family:Inter,sans-serif;font-size:14px;text-align:center;">❌ Error al cargar MapLibre.<br>Verifica tu conexión a Internet.</div>';
            };
            document.head.appendChild(script);
            return;
        }

        if (mapaInstance) {
            mapaInstance.remove();
            mapaInstance = null;
        }

        try {
            mapaInstance = new maplibregl.Map({
                container: container,
                style: 'https://tiles.openfreemap.org/styles/liberty',
                center: [-99.1332, 19.4326],
                zoom: 3,
                pitch: 45,
                bearing: -20,
                antialias: true,
                attributionControl: false,
                interactive: true
            });

            mapaInstance.addControl(new maplibregl.NavigationControl({
                showCompass: true,
                showZoom: true,
                visualizePitch: true
            }), 'top-right');

            mapaInstance.addControl(new maplibregl.ScaleControl({
                maxWidth: 100,
                unit: 'metric'
            }), 'bottom-right');

            mapaInstance.on('load', function() {
                console.log('✅ Mapa 3D cargado correctamente');
                const paises = CORREDOR.paises.filter(p => p.activo);
                const conexiones = CORREDOR.conexiones;

                // Dibujar conexiones (inversiones)
                const rutasActivas = [];
                const rutasPlanificadas = [];
                conexiones.forEach(conn => {
                    const from = CORREDOR.paises.find(p => p.id === conn.from);
                    const to = CORREDOR.paises.find(p => p.id === conn.to);
                    if (!from || !to) return;
                    const start = [from.lon, from.lat];
                    const end = [to.lon, to.lat];
                    const midLon = (from.lon + to.lon) / 2;
                    const midLat = (from.lat + to.lat) / 2 + 3;
                    const feature = {
                        type: 'Feature',
                        geometry: {
                            type: 'LineString',
                            coordinates: [start, [midLon, midLat], end]
                        }
                    };
                    if (conn.estado === 'activo') {
                        rutasActivas.push(feature);
                    } else {
                        rutasPlanificadas.push(feature);
                    }
                });

                if (rutasActivas.length > 0) {
                    mapaInstance.addSource('rutas-activas', {
                        type: 'geojson',
                        data: { type: 'FeatureCollection', features: rutasActivas }
                    });
                    mapaInstance.addLayer({
                        id: 'rutas-activas-layer',
                        type: 'line',
                        source: 'rutas-activas',
                        paint: {
                            'line-color': '#10b981',
                            'line-width': 3,
                            'line-opacity': 0.8
                        }
                    });
                }

                if (rutasPlanificadas.length > 0) {
                    mapaInstance.addSource('rutas-planificadas', {
                        type: 'geojson',
                        data: { type: 'FeatureCollection', features: rutasPlanificadas }
                    });
                    mapaInstance.addLayer({
                        id: 'rutas-planificadas-layer',
                        type: 'line',
                        source: 'rutas-planificadas',
                        paint: {
                            'line-color': '#f59e0b',
                            'line-width': 3,
                            'line-dasharray': [8, 6],
                            'line-opacity': 0.8
                        }
                    });
                }

                // Puntos de regiones
                const puntos = paises.map(p => ({
                    type: 'Feature',
                    geometry: { type: 'Point', coordinates: [p.lon, p.lat] },
                    properties: {
                        id: p.id,
                        nombre: p.nombre,
                        flag: p.flag,
                        color: p.color,
                        hitos: p.hitos,
                        activo: p.activo,
                        tareas: CORREDOR.etapas.filter(e => e.pais === p.id).length,
                        completadas: CORREDOR.etapas.filter(e => e.pais === p.id && e.estado === 'completed').length,
                        enProgreso: CORREDOR.etapas.filter(e => e.pais === p.id && e.estado === 'inProgress').length,
                        continente: p.continente
                    }
                }));

                if (puntos.length > 0) {
                    mapaInstance.addSource('paises', {
                        type: 'geojson',
                        data: { type: 'FeatureCollection', features: puntos }
                    });
                    mapaInstance.addLayer({
                        id: 'paises-circles',
                        type: 'circle',
                        source: 'paises',
                        paint: {
                            'circle-radius': [
                                'interpolate', ['linear'], ['zoom'],
                                2, 10,
                                5, 20,
                                8, 35
                            ],
                            'circle-color': ['get', 'color'],
                            'circle-opacity': 0.6,
                            'circle-stroke-width': 2,
                            'circle-stroke-color': 'rgba(255,255,255,0.9)'
                        }
                    });

                    mapaInstance.on('click', 'paises-circles', function(e) {
                        const props = e.features[0].properties;
                        if (!props || !props.id) return;
                        mostrarPopupPais(props.id, e.lngLat);
                    });

                    mapaInstance.on('click', function(e) {
                        const features = mapaInstance.queryRenderedFeatures(e.point, {
                            layers: ['paises-circles']
                        });
                        if (features && features.length > 0) return;
                        let paisCercano = null;
                        let minDist = 8;
                        CORREDOR.paises.forEach(p => {
                            const dist = Math.sqrt(
                                Math.pow(p.lon - e.lngLat.lng, 2) +
                                Math.pow(p.lat - e.lngLat.lat, 2)
                            );
                            if (dist < minDist) {
                                minDist = dist;
                                paisCercano = p;
                            }
                        });
                        if (paisCercano) {
                            mostrarPopupPais(paisCercano.id, e.lngLat);
                        }
                    });

                    function mostrarPopupPais(paisId, lngLat) {
                        const pais = CORREDOR.paises.find(p => p.id === paisId);
                        if (!pais) return;
                        const tareasPais = CORREDOR.etapas.filter(e => e.pais === pais.id);
                        const total = tareasPais.length;
                        const completadas = tareasPais.filter(e => e.estado === 'completed').length;
                        const enProgreso = tareasPais.filter(e => e.estado === 'inProgress').length;
                        const pendientes = tareasPais.filter(e => e.estado === 'pending').length;
                        const criticas = tareasPais.filter(e => e.prioridad === 'critica').length;
                        const progreso = total > 0 ? Math.round((completadas / total) * 100) : 0;
                        const retrasos = tareasPais.reduce((sum, e) => sum + (e.retraso || 0), 0);

                        if (window._zackyPopup) {
                            window._zackyPopup.remove();
                            window._zackyPopup = null;
                        }

                        const popupContent = `
                            <div style="font-family:'Inter',sans-serif;padding:8px 4px;min-width:200px;max-width:280px;background:rgba(15,23,42,0.95);border-radius:12px;border:1px solid rgba(139,92,246,0.3);">
                                <div style="font-size:22px;font-weight:800;color:${pais.color};">${pais.flag} ${pais.nombre}</div>
                                <div style="color:#94a3b8;font-size:12px;margin-top:-2px;">🌍 ${pais.continente}</div>
                                <hr style="border-color:rgba(255,255,255,0.1);margin:8px 0;">
                                <div style="font-size:13px;line-height:1.8;color:#e2e8f0;">
                                    🎯 <strong>Hitos:</strong> ${pais.hitos}<br>
                                    📋 <strong>Total hitos:</strong> ${total}<br>
                                    ✅ <strong>Completados:</strong> ${completadas}<br>
                                    🔄 <strong>En curso:</strong> ${enProgreso}<br>
                                    ⏳ <strong>Pendientes:</strong> ${pendientes}<br>
                                    🔥 <strong>Críticos:</strong> ${criticas}<br>
                                    ⏰ <strong>Retrasos:</strong> ${retrasos} días<br>
                                    📊 <strong>Progreso:</strong> ${progreso}%
                                </div>
                                <div style="margin-top:8px;padding-top:6px;border-top:1px solid rgba(255,255,255,0.1);font-size:11px;color:${pais.activo ? '#10b981' : '#94a3b8'};">
                                    ${pais.activo ? '✅ Región activa en el ecosistema' : '⏸️ Región inactiva'}
                                </div>
                            </div>
                        `;

                        const popup = new maplibregl.Popup({
                            offset: [0, -15],
                            closeButton: true,
                            closeOnClick: false,
                            className: 'zacky-popup-definitivo',
                            maxWidth: '300px'
                        })
                        .setLngLat(lngLat)
                        .setHTML(popupContent)
                        .addTo(mapaInstance);

                        window._zackyPopup = popup;

                        const closePopup = function() {
                            if (window._zackyPopup) {
                                window._zackyPopup.remove();
                                window._zackyPopup = null;
                            }
                            mapaInstance.off('click', closePopup);
                        };
                        setTimeout(() => {
                            mapaInstance.once('click', closePopup);
                        }, 100);
                    }

                    // Marcadores con bandera
                    paises.forEach(p => {
                        const el = document.createElement('div');
                        el.textContent = `${p.flag} ${p.nombre}`;
                        el.style.cssText = `
                            background: rgba(0,0,0,0.7);
                            color: white;
                            padding: 3px 10px;
                            border-radius: 20px;
                            font-size: 11px;
                            font-weight: 600;
                            font-family: 'Inter', sans-serif;
                            border: 1px solid ${p.color}80;
                            backdrop-filter: blur(4px);
                            white-space: nowrap;
                            pointer-events: auto;
                            cursor: pointer;
                            text-shadow: 0 1px 3px rgba(0,0,0,0.5);
                            transition: transform 0.2s;
                        `;
                        el.addEventListener('click', function(e) {
                            e.stopPropagation();
                            const lngLat = new maplibregl.LngLat(p.lon, p.lat);
                            mostrarPopupPais(p.id, lngLat);
                        });
                        el.addEventListener('mouseenter', function() {
                            this.style.transform = 'scale(1.05)';
                            this.style.boxShadow = '0 0 15px rgba(139,92,246,0.5)';
                        });
                        el.addEventListener('mouseleave', function() {
                            this.style.transform = 'scale(1)';
                            this.style.boxShadow = 'none';
                        });

                        new maplibregl.Marker({
                            element: el,
                            offset: [0, -30],
                            anchor: 'bottom'
                        })
                        .setLngLat([p.lon, p.lat])
                        .addTo(mapaInstance);
                    });
                }

                // Ajustar vista
                if (paises.length > 0) {
                    const lngs = paises.map(p => p.lon);
                    const lats = paises.map(p => p.lat);
                    const bounds = [
                        [Math.min(...lngs) - 5, Math.min(...lats) - 5],
                        [Math.max(...lngs) + 5, Math.max(...lats) + 5]
                    ];
                    mapaInstance.fitBounds(bounds, {
                        padding: 60,
                        maxZoom: 4,
                        pitch: 45,
                        bearing: -20,
                        duration: 1500
                    });
                }

                // Leyenda
                const oldLegend = container.querySelector('.custom-legend');
                if (oldLegend) oldLegend.remove();

                const legendEl = document.createElement('div');
                legendEl.className = 'custom-legend';
                legendEl.style.cssText = `
                    position: absolute;
                    bottom: 20px;
                    left: 20px;
                    z-index: 10;
                    background: rgba(15,23,42,0.85);
                    backdrop-filter: blur(8px);
                    padding: 10px 14px;
                    border-radius: 10px;
                    border: 1px solid rgba(255,255,255,0.08);
                    color: #e2e8f0;
                    font-size: 10px;
                    min-width: 110px;
                    font-family: 'Inter', sans-serif;
                    pointer-events: none;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
                    user-select: none;
                `;
                legendEl.innerHTML = `
                    <div style="font-weight:700;margin-bottom:4px;color:#a78bfa;font-size:11px;">📍 Leyenda</div>
                    ${paises.map(p => `
                        <div style="display:flex;align-items:center;gap:6px;margin:2px 0;">
                            <span style="width:10px;height:10px;border-radius:50%;background:${p.color};border:1px solid rgba(255,255,255,0.3);display:inline-block;"></span>
                            <span>${p.flag} ${p.nombre}</span>
                        </div>
                    `).join('')}
                    <div style="margin-top:4px;padding-top:4px;border-top:1px solid rgba(255,255,255,0.1);">
                        <div style="display:flex;align-items:center;gap:6px;margin:2px 0;">
                            <span style="width:16px;height:2px;background:#10b981;border-radius:2px;display:inline-block;"></span>
                            <span>Inversión activa</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;margin:2px 0;">
                            <span style="width:16px;height:2px;background:#f59e0b;border-radius:2px;border-top:2px dashed #f59e0b;display:inline-block;"></span>
                            <span>Planificada</span>
                        </div>
                    </div>
                `;
                container.appendChild(legendEl);

                console.log('✅ Mapa de inversión completamente funcional');
            });

            window.addEventListener('resize', function() {
                if (mapaInstance) mapaInstance.resize();
            });

        } catch (error) {
            console.error('❌ Error al inicializar MapLibre:', error);
            container.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#ef4444;font-family:Inter,sans-serif;font-size:14px;padding:20px;text-align:center;">
                ❌ Error al iniciar el mapa.<br>
                <span style="font-size:12px;color:#94a3b8;">${error.message}</span>
            </div>`;
        }
    }

    // ============================================================
    // GRÁFICAS (adaptado)
    // ============================================================
    function inicializarGraficas() {
        if (typeof Chart === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
            script.onload = () => inicializarGraficas();
            document.head.appendChild(script);
            return;
        }
        const etapas = CORREDOR.etapas;
        const evm = EVM_DATA;

        const ctxDist = document.getElementById('zackyChartDist');
        if (ctxDist) {
            const completadas = etapas.filter(e => e.estado === 'completed').length;
            const enProgreso = etapas.filter(e => e.estado === 'inProgress').length;
            const pendientes = etapas.filter(e => e.estado === 'pending').length;
            const criticas = etapas.filter(e => e.prioridad === 'critica').length;
            chartInstances.dist = new Chart(ctxDist.getContext('2d'), {
                type: 'doughnut',
                data: { labels: ['Completados', 'En Curso', 'Pendientes', 'Críticos'], datasets: [{ data: [completadas, enProgreso, pendientes, criticas], backgroundColor: ['#10b981', '#f59e0b', '#94a3b8', '#ef4444'], borderWidth: 0, hoverOffset: 10 }] },
                options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 10 }, usePointStyle: true, padding: 14 } }, tooltip: { backgroundColor: 'rgba(15,23,42,0.9)', titleColor: '#e2e8f0', bodyColor: '#e2e8f0', borderColor: 'rgba(139,92,246,0.2)', borderWidth: 1, callbacks: { label: function(ctx) { const total = ctx.dataset.data.reduce((a,b) => a+b, 0); const pct = total > 0 ? Math.round((ctx.raw / total) * 100) : 0; return ctx.label + ': ' + ctx.raw + ' (' + pct + '%)'; } } } }, cutout: '65%' }
            });
        }

        const ctxEVM = document.getElementById('zackyChartEVM');
        if (ctxEVM) {
            chartInstances.evm = new Chart(ctxEVM.getContext('2d'), {
                type: 'bar',
                data: { labels: ['PV', 'EV', 'AC'], datasets: [{ label: 'Euros', data: [evm.PV, evm.EV, evm.AC], backgroundColor: ['#3b82f6', '#10b981', '#ef4444'], borderRadius: 6, barPercentage: 0.6 }] },
                options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgba(15,23,42,0.9)', titleColor: '#e2e8f0', bodyColor: '#e2e8f0', borderColor: 'rgba(139,92,246,0.2)', borderWidth: 1, callbacks: { label: function(ctx) { return ctx.dataset.label + ': ' + ctx.raw + '€'; } } } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8', callback: function(v) { return v + '€'; } } }, x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { weight: 'bold' } } } }, animation: { duration: 1000, easing: 'easeOutQuart' } }
            });
        }

        const ctxBurn = document.getElementById('zackyChartBurndown');
        if (ctxBurn) {
            const total = evm.BAC;
            const ideal = [total, total * 0.75, total * 0.5, total * 0.25, 0];
            const real = [total, total * 0.7, total * 0.55, total * 0.4, total - evm.EV];
            chartInstances.burn = new Chart(ctxBurn.getContext('2d'), {
                type: 'line',
                data: { labels: ['Inicio', 'Mes 1', 'Mes 2', 'Mes 3', 'Actual'], datasets: [{ label: 'Ideal', data: ideal, borderColor: '#8b5cf6', borderWidth: 2, borderDash: [5,5], fill: false, pointRadius: 0, tension: 0.1 }, { label: 'Real', data: real, borderColor: '#f59e0b', borderWidth: 3, fill: true, backgroundColor: 'rgba(245,158,11,0.06)', tension: 0.2, pointRadius: 4, pointBackgroundColor: '#f59e0b', pointBorderColor: 'white', pointBorderWidth: 1 }] },
                options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'top', labels: { color: '#94a3b8', font: { size: 10 }, usePointStyle: true } }, tooltip: { backgroundColor: 'rgba(15,23,42,0.9)', titleColor: '#e2e8f0', bodyColor: '#e2e8f0', borderColor: 'rgba(139,92,246,0.2)', borderWidth: 1, callbacks: { label: function(ctx) { return ctx.dataset.label + ': ' + ctx.raw + '€'; } } } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8', callback: function(v) { return v + '€'; } } }, x: { grid: { display: false }, ticks: { color: '#94a3b8' } } }, animation: { duration: 1200, easing: 'easeOutQuart' } }
            });
        }

        const ctxPaises = document.getElementById('zackyChartPaises');
        if (ctxPaises) {
            const paisesActivos = CORREDOR.paises.filter(p => p.activo);
            const labels = paisesActivos.map(p => p.flag + ' ' + p.nombre);
            const completadasPorPais = paisesActivos.map(p => CORREDOR.etapas.filter(e => e.pais === p.id && e.estado === 'completed').length);
            const totalPorPais = paisesActivos.map(p => CORREDOR.etapas.filter(e => e.pais === p.id).length);
            const eficiencia = paisesActivos.map((p, i) => totalPorPais[i] > 0 ? Math.round((completadasPorPais[i] / totalPorPais[i]) * 100) : 0);
            chartInstances.paises = new Chart(ctxPaises.getContext('2d'), {
                type: 'bar',
                data: { labels: labels, datasets: [{ label: 'Hitos Completados', data: completadasPorPais, backgroundColor: 'rgba(16,185,129,0.7)', borderRadius: 4, barPercentage: 0.35 }, { label: 'Eficiencia (%)', data: eficiencia, backgroundColor: 'rgba(139,92,246,0.6)', borderRadius: 4, barPercentage: 0.35 }] },
                options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'top', labels: { color: '#94a3b8', font: { size: 10 }, usePointStyle: true } }, tooltip: { backgroundColor: 'rgba(15,23,42,0.9)', titleColor: '#e2e8f0', bodyColor: '#e2e8f0', borderColor: 'rgba(139,92,246,0.2)', borderWidth: 1 } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } }, x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { weight: '500' } } } }, animation: { duration: 1000, easing: 'easeOutQuart' } }
            });
        }
        console.log('✅ Gráficas de inversión inicializadas');
    }

    function destruirGraficas() {
        Object.keys(chartInstances).forEach(key => { if (chartInstances[key]) { chartInstances[key].destroy(); chartInstances[key] = null; } });
        chartInstances = {};
        if (mapaInstance) { mapaInstance.remove(); mapaInstance = null; }
    }

    // ============================================================
    // STORYTELLING (Adaptado a Business Angels)
    // ============================================================
    function generarStorytelling(etapas, riesgos, progreso) {
        // Datos fijos en español (filtro nuclear)
        const CORREDOR_LOCAL = {
            metricas: { avgTransitTime: 3.2, costEfficiency: 87, customerSatisfaction: 4.7 },
            paises: ['Canarias', 'Península', 'México']
        };

        const totalEtapas = Array.isArray(etapas) ? etapas.length : 0;
        const completadas = Array.isArray(etapas) ? etapas.filter(e => e.estado === 'completed').length : 0;
        const enProgreso = Array.isArray(etapas) ? etapas.filter(e => e.estado === 'inProgress').length : 0;
        const criticas = Array.isArray(etapas) ? etapas.filter(e => e.prioridad === 'critica').length : 0;
        const riesgosAltos = Array.isArray(riesgos) ? riesgos.filter(r => r.impacto === 'alto').length : 0;
        const paisesActivos = CORREDOR_LOCAL.paises.join(', ');

        let texto = `Análisis Ejecutivo del Ecosistema de Inversión RECABA. El ecosistema gestiona ${totalEtapas} hitos de inversión distribuidos en ${CORREDOR_LOCAL.paises.length} regiones: ${paisesActivos}. Hasta la fecha, se han completado ${completadas} hitos, lo que representa el ${progreso}% del total, con ${enProgreso} en curso y ${criticas} críticos que requieren atención inmediata. `;

        if (riesgosAltos > 0) {
            texto += `Se han identificado ${riesgosAltos} riesgos de alto impacto, incluyendo retrasos en rondas de financiación y cambios regulatorios. Se recomienda activar los planes de contingencia y mantener comunicación fluida con los equipos de las startups y los inversores. `;
        } else {
            texto += `Los riesgos están bajo control. El equipo de gestión ha demostrado una administración proactiva de la cartera. `;
        }

        texto += `La eficiencia general del ecosistema es del ${CORREDOR_LOCAL.metricas.costEfficiency}% con un tiempo medio de inversión de ${CORREDOR_LOCAL.metricas.avgTransitTime} meses. La satisfacción de los business angels se mantiene en ${CORREDOR_LOCAL.metricas.customerSatisfaction} de 5. En el ámbito operativo, se gestionan ${totalEtapas} hitos activos, con un cumplimiento de plazos del ${Math.round((completadas / Math.max(1, totalEtapas)) * 100)}%. Cada startup cuenta con trazabilidad mediante el sistema, lo que garantiza la transparencia y la inmutabilidad de los datos de inversión. Los documentos clave como acuerdos de inversión, actas de seguimiento y reportes financieros están digitalizados y vinculados a cada hito. El ecosistema involucra a múltiples actores: gestores de inversión, business angels, emprendedores y asesores legales. Esta colaboración asegura la coordinación efectiva en cada etapa del proceso de inversión. Se recomienda mantener el ritmo actual y prestar especial atención a las alertas críticas, acelerando la validación de los hitos clave en Canarias y la internacionalización de OceanTech. El uso de la tecnología y la digitalización están siendo factores clave para la eficiencia del ecosistema.`;

        // Filtro nuclear de seguridad (limpia cualquier resto de inglés)
        return texto
            .replace(/tasks/gi, 'hitos')
            .replace(/Statuss Unidos/gi, 'Estados Unidos')
            .replace(/efficiency/gi, 'eficiencia')
            .replace(/days/gi, 'días')
            .replace(/critical/gi, 'críticos')
            .replace(/progress/gi, 'progreso')
            .replace(/betweengados/gi, 'entregados')
            .replace(/mediumnte/gi, 'mediante')
            .replace(/between/gi, 'entre')
            .replace(/pace/gi, 'ritmo')
            .replace(/inmedium\s*lasa/gi, 'inmediata')
            .replace(/at alertas/gi, 'a las alertas');
    }

    // ============================================================
    // VOZ
    // ============================================================
    function toggleNarracion() {
        const btn = document.getElementById('zackyVoiceBtn');
        const textElement = document.getElementById('zackyStoryText');
        if (!textElement || !btn) return;
        const texto = textElement.textContent || textElement.innerText;
        if (!window.speechSynthesis) { alert('Tu navegador no soporta la síntesis de voz.'); return; }
        if (speechState === 'idle' || speechState === 'stopped') {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(texto);
            utterance.lang = 'es-ES';
            utterance.rate = 0.9;
            utterance.pitch = 1;
            utterance.volume = 1;
            const voz = getVozSeleccionada();
            if (voz) utterance.voice = voz;
            speechUtterance = utterance;
            speechState = 'speaking';
            btn.textContent = '⏸️ Pausar';
            utterance.onend = function() { speechState = 'idle'; btn.textContent = '🔊 Escuchar Narración'; speechUtterance = null; };
            utterance.onerror = function() { speechState = 'idle'; btn.textContent = '🔊 Escuchar Narración'; speechUtterance = null; };
            window.speechSynthesis.speak(utterance);
            return;
        }
        if (speechState === 'speaking') {
            window.speechSynthesis.pause();
            speechState = 'paused';
            btn.textContent = '▶️ Reanudar';
            return;
        }
        if (speechState === 'paused') {
            window.speechSynthesis.resume();
            speechState = 'speaking';
            btn.textContent = '⏸️ Pausar';
        }
    }

    function detenerNarracion() {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        speechState = 'idle';
        speechUtterance = null;
        const btn = document.getElementById('zackyVoiceBtn');
        if (btn) btn.textContent = '🔊 Escuchar Narración';
    }

    // ============================================================
    // GENERAR PDF (adaptado a inversión)
    // ============================================================
    function generarReportePDF() {
        const btn = document.getElementById('zackyPdfBtn');
        if (!btn) return;
        btn.disabled = true;
        btn.textContent = 'Generando reporte...';

        const cargarLibrerias = () => {
            return new Promise((resolve) => {
                let loaded = 0;
                const check = () => { if (++loaded === 2) resolve(); };
                if (typeof jspdf === 'undefined') {
                    const script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
                    script.onload = check;
                    script.onerror = () => { loaded++; };
                    document.head.appendChild(script);
                } else check();
                if (typeof html2canvas === 'undefined') {
                    const script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
                    script.onload = check;
                    script.onerror = () => { loaded++; };
                    document.head.appendChild(script);
                } else check();
            });
        };

        cargarLibrerias().then(() => {
            try {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF('l', 'mm', 'a4');
                const pageWidth = 297;
                const pageHeight = 210;
                const margin = 12;
                const maxWidth = pageWidth - 2 * margin;
                let y = 0;

                // Funciones de dibujo
                const addPageBackground = () => { doc.setFillColor(10, 12, 20); doc.rect(0, 0, pageWidth, pageHeight, 'F'); };
                const drawHeaderLine = (yPos) => { doc.setDrawColor(212, 175, 55); doc.setLineWidth(0.8); doc.line(margin, yPos, pageWidth - margin, yPos); };
                const addSectionHeader = (title, subtitle = '') => {
                    if (y > pageHeight - 35) { doc.addPage(); y = 15; addPageBackground(); }
                    doc.setFillColor(20, 22, 35);
                    doc.rect(margin, y - 4, maxWidth, 14, 'F');
                    doc.setTextColor(212, 175, 55);
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(13);
                    doc.text(title, margin + 3, y + 2);
                    if (subtitle) {
                        doc.setTextColor(150, 150, 170);
                        doc.setFont('helvetica', 'normal');
                        doc.setFontSize(9);
                        doc.text(subtitle, margin + 3, y + 8);
                    }
                    drawHeaderLine(y + (subtitle ? 12 : 7));
                    y += (subtitle ? 16 : 11);
                };
                const drawTableHeader = (headers, colWidths, startY) => {
                    doc.setFillColor(30, 35, 50);
                    doc.rect(margin, startY - 4, maxWidth, 7, 'F');
                    doc.setTextColor(212, 175, 55);
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(8);
                    let xPos = margin + 2;
                    headers.forEach((header, i) => { doc.text(header, xPos, startY); xPos += colWidths[i]; });
                    doc.setDrawColor(60, 60, 80);
                    doc.setLineWidth(0.3);
                    doc.line(margin, startY + 4, pageWidth - margin, startY + 4);
                    return startY + 6;
                };
                const drawTableRow = (data, colWidths, startY, isEven = false) => {
                    if (isEven) { doc.setFillColor(18, 20, 30); doc.rect(margin, startY - 3, maxWidth, 12, 'F'); }
                    doc.setTextColor(200, 200, 210);
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(7.5);
                    let xPos = margin + 2;
                    data.forEach((cell, i) => { doc.text(cell, xPos, startY); xPos += colWidths[i]; });
                    doc.setDrawColor(60, 60, 80);
                    doc.setLineWidth(0.3);
                    doc.line(margin, startY + 6, pageWidth - margin, startY + 6);
                    return startY + 12;
                };

                // PORTADA
                addPageBackground();
                doc.setFillColor(20, 22, 35);
                doc.rect(margin, 25, maxWidth, 40, 'F');
                doc.setDrawColor(212, 175, 55);
                doc.setLineWidth(1.5);
                doc.rect(margin, 25, maxWidth, 40, 'S');
                doc.setTextColor(212, 175, 55);
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(26);
                doc.text('REPORTE EJECUTIVO DE INVERSIÓN', pageWidth / 2, 42, { align: 'center' });
                doc.setTextColor(200, 200, 210);
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(13);
                doc.text(CONFIG.CORRIDOR_NOMBRE, pageWidth / 2, 52, { align: 'center' });
                doc.setTextColor(150, 150, 170);
                doc.setFontSize(9);
                doc.text('Ecosistema de Business Angels · 3 Regiones Activas', pageWidth / 2, 60, { align: 'center' });
                y = 78;

                // Información del reporte
                doc.setFillColor(25, 28, 42);
                doc.rect(margin, y, maxWidth, 32, 'F');
                doc.setTextColor(212, 175, 55);
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(10);
                doc.text('INFORMACIÓN DEL REPORTE', margin + 5, y + 6);
                doc.setTextColor(180, 180, 200);
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(8);
                const infoData = [
                    ['Fecha de generación:', new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })],
                    ['ID del Ecosistema:', CONFIG.CORRIDOR_ID],
                    ['Regiones participantes:', 'Canarias, Península, México'],
                    ['Preparado para:', 'Comité de Inversión de RECABA'],
                    ['Clasificación:', 'Confidencial - Uso Interno']
                ];
                let infoY = y + 12;
                const labelWidth = 55;
                const valueStartX = margin + 5 + labelWidth;
                infoData.forEach(([label, value]) => {
                    doc.setTextColor(150, 150, 170);
                    doc.text(label, margin + 5, infoY);
                    doc.setTextColor(220, 220, 230);
                    doc.setFont('helvetica', 'bold');
                    const valueLines = doc.splitTextToSize(value, maxWidth - labelWidth - 10);
                    doc.text(valueLines, valueStartX, infoY);
                    doc.setFont('helvetica', 'normal');
                    infoY += 4.5 * valueLines.length;
                });
                y += 38;

                // Métricas clave
                addSectionHeader('MÉTRICAS CLAVE DE LA CARTERA', 'Resumen ejecutivo de indicadores principales');
                const kpis = [
                    { label: 'Total de Hitos', value: CORREDOR.etapas.length.toString(), color: [139, 92, 246] },
                    { label: 'Hitos Completados', value: CORREDOR.etapas.filter(e => e.estado === 'completed').length.toString(), color: [16, 185, 129] },
                    { label: 'Progreso General', value: Math.round((CORREDOR.etapas.filter(e => e.estado === 'completed').length / CORREDOR.etapas.length) * 100) + '%', color: [245, 158, 11] },
                    { label: 'En Curso', value: CORREDOR.etapas.filter(e => e.estado === 'inProgress').length.toString(), color: [59, 130, 246] },
                    { label: 'Hitos Críticos', value: CORREDOR.etapas.filter(e => e.prioridad === 'critica').length.toString(), color: [239, 68, 68] },
                    { label: 'Eficiencia de Costos', value: CORREDOR.metricas.costEfficiency + '%', color: [6, 182, 212] }
                ];
                const kpiWidth = maxWidth / 3;
                const kpiHeight = 20;
                kpis.forEach((kpi, i) => {
                    const col = i % 3;
                    const row = Math.floor(i / 3);
                    const xPos = margin + col * kpiWidth;
                    const yPos = y + row * (kpiHeight + 3);
                    doc.setFillColor(25, 28, 42);
                    doc.rect(xPos, yPos, kpiWidth - 2, kpiHeight, 'F');
                    doc.setFillColor(kpi.color[0], kpi.color[1], kpi.color[2]);
                    doc.rect(xPos, yPos, 4, kpiHeight, 'F');
                    doc.setTextColor(150, 150, 170);
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(7.5);
                    doc.text(kpi.label, xPos + 7, yPos + 5);
                    doc.setTextColor(255, 255, 255);
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(16);
                    doc.text(kpi.value, xPos + 7, yPos + 14);
                });
                y += (kpiHeight + 3) * 2 + 5;

                // Regiones
                addSectionHeader('REGIONES DEL ECOSISTEMA', 'Distribución geográfica de la inversión');
                const paisesHeaders = ['Código', 'Región', 'Continente', 'Hitos', 'Tareas', 'Completadas', 'Progreso', 'Estado'];
                const paisesColWidths = [15, 40, 30, 20, 20, 25, 30, 25];
                let tableY = drawTableHeader(paisesHeaders, paisesColWidths, y);
                const paisesActivos = CORREDOR.paises.filter(p => p.activo);
                paisesActivos.forEach((pais, i) => {
                    const tareasPais = CORREDOR.etapas.filter(e => e.pais === pais.id);
                    const completadasPais = tareasPais.filter(e => e.estado === 'completed').length;
                    const progresoPais = tareasPais.length > 0 ? Math.round((completadasPais / tareasPais.length) * 100) : 0;
                    const data = [pais.id, pais.nombre, pais.continente, pais.hitos.toString(), tareasPais.length.toString(), completadasPais.toString(), progresoPais + '%', pais.activo ? 'Activo' : 'Inactivo'];
                    tableY = drawTableRow(data, paisesColWidths, tableY, i % 2 === 0);
                });
                y = tableY + 5;

                // EVM
                addSectionHeader('ANÁLISIS DE VALOR GANADO (EVM)', 'Métricas de desempeño financiero de la cartera');
                const evm = EVM_DATA;
                const evmHeaders = ['Métrica', 'Valor', 'Descripción', 'Estado'];
                const evmColWidths = [30, 40, 80, 50];
                tableY = drawTableHeader(evmHeaders, evmColWidths, y);
                const evmData = [
                    ['BAC', evm.BAC + '€', 'Presupuesto al completar', 'Base'],
                    ['PV', evm.PV + '€', 'Valor planificado', 'Objetivo'],
                    ['EV', evm.EV + '€', 'Valor ganado', 'Progreso real'],
                    ['AC', evm.AC + '€', 'Costo actual', 'Inversión'],
                    ['SPI', evm.SPI.toFixed(2), evm.SPI >= 1 ? 'Adelantado' : 'Retraso', evm.SPI >= 1 ? 'Favorable' : 'Atención'],
                    ['CPI', evm.CPI.toFixed(2), evm.CPI >= 1 ? 'Eficiente' : 'Sobrecosto', evm.CPI >= 1 ? 'Favorable' : 'Alerta'],
                    ['EAC', evm.EAC.toFixed(1) + '€', 'Estimado al completar', 'Proyección'],
                    ['ETC', evm.ETC.toFixed(1) + '€', 'Estimado por completar', 'Restante'],
                    ['VAC', (evm.VAC >= 0 ? '+' : '') + evm.VAC.toFixed(1) + '€', evm.VAC >= 0 ? 'Ahorro' : 'Sobrecosto', evm.VAC >= 0 ? 'Favorable' : 'Atención'],
                    ['CV', (evm.CV >= 0 ? '+' : '') + evm.CV.toFixed(1) + '€', 'Variación de costo', 'Diferencia'],
                    ['SV', (evm.SV >= 0 ? '+' : '') + evm.SV.toFixed(1) + '€', 'Variación de cronograma', 'Diferencia']
                ];
                evmData.forEach((row, i) => { tableY = drawTableRow(row, evmColWidths, tableY, i % 2 === 0); });
                y = tableY + 5;

                // Etapas / Hitos
                addSectionHeader('DETALLE DE HITOS Y STARTUPS', 'Seguimiento individual de cada inversión');
                const etapasHeaders = ['ID', 'Hito / Startup', 'Región', 'Responsable', 'Estado', 'Progreso', 'Duración', 'Retraso'];
                const etapasColWidths = [8, 45, 28, 32, 25, 32, 20, 15];
                tableY = drawTableHeader(etapasHeaders, etapasColWidths, y);
                CORREDOR.etapas.forEach((etapa, i) => {
                    const pais = CORREDOR.paises.find(p => p.id === etapa.pais);
                    const retraso = etapa.retraso || 0;
                    const data = [etapa.id, etapa.nombre.substring(0, 16), pais ? pais.nombre.substring(0, 12) : etapa.pais, etapa.responsable.substring(0, 12), etapa.estado, etapa.progress + '%', (etapa.duracionEstimada * 4) + 'h', retraso > 0 ? retraso + 'd' : 'Ninguno'];
                    tableY = drawTableRow(data, etapasColWidths, tableY, i % 2 === 0);
                });
                y = tableY + 5;

                // Nota: Las gráficas se pueden capturar del DOM, pero para no alargar el PDF aquí se omite.
                // Se puede añadir captura de canvas similar al código original.

                // Riesgos y sugerencias (resumen)
                addSectionHeader('RIESGOS Y SUGERENCIAS', 'Resumen de riesgos identificados y acciones recomendadas');
                const riesgosSimplificados = CORREDOR.riesgos.map(r => [r.descripcion, r.impacto, r.probabilidad, r.mitigacion]);
                const riesgosHeaders = ['Descripción', 'Impacto', 'Probabilidad', 'Mitigación'];
                const riesgosColWidths = [70, 30, 30, 70];
                tableY = drawTableHeader(riesgosHeaders, riesgosColWidths, y);
                riesgosSimplificados.forEach((row, i) => {
                    tableY = drawTableRow(row, riesgosColWidths, tableY, i % 2 === 0);
                });
                y = tableY + 5;

                const sugerenciasSimplificadas = CORREDOR.sugerencias.map(s => [s.texto, s.prioridad]);
                const sugerenciasHeaders = ['Sugerencia', 'Prioridad'];
                const sugerenciasColWidths = [150, 50];
                tableY = drawTableHeader(sugerenciasHeaders, sugerenciasColWidths, y);
                sugerenciasSimplificadas.forEach((row, i) => {
                    tableY = drawTableRow(row, sugerenciasColWidths, tableY, i % 2 === 0);
                });
                y = tableY + 5;

                // Footer
                const totalPages = doc.internal.pages.length - 1;
                for (let i = 1; i <= totalPages; i++) {
                    doc.setPage(i);
                    doc.setFillColor(20, 22, 35);
                    doc.rect(0, pageHeight - 12, pageWidth, 12, 'F');
                    doc.setDrawColor(212, 175, 55);
                    doc.setLineWidth(0.5);
                    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
                    doc.setTextColor(150, 150, 170);
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(7);
                    doc.text('RECABA · Ecosistema de Inversión', margin, pageHeight - 6);
                    doc.setTextColor(212, 175, 55);
                    doc.text(new Date().toLocaleDateString('es-ES'), pageWidth / 2, pageHeight - 6, { align: 'center' });
                    doc.setTextColor(150, 150, 170);
                    doc.text(`Página ${i} de ${totalPages}`, pageWidth - margin, pageHeight - 6, { align: 'right' });
                }

                doc.save(`Reporte_Inversiones_RECABA_${new Date().toISOString().split('T')[0]}.pdf`);
                btn.disabled = false;
                btn.textContent = 'Reporte PDF';
            } catch (err) {
                console.error('Error al generar PDF:', err);
                btn.disabled = false;
                btn.textContent = 'Reporte PDF';
                alert('Error al generar el reporte: ' + err.message);
            }
        }).catch(err => {
            console.error('Error cargando librerias:', err);
            btn.disabled = false;
            btn.textContent = 'Reporte PDF';
            alert('Error al cargar librerias: ' + err.message);
        });
    }

    // ============================================================
    // SECCIONES OPERATIVAS (Adaptado a Startups y Business Angels)
    // ============================================================
    function agregarSeccionesOperativas() {
        const body = document.getElementById('zackyCorredorBody');
        if (!body) return;

        const startups = [
            { id: 'ST-001', nombre: 'GreenCan', region: 'Canarias', ronda: 'Pre-seed', inversion: 50000, estado: 'Activa', hitos: 3, fecha: '2026-07-01' },
            { id: 'ST-002', nombre: 'EcoTech', region: 'Canarias', ronda: 'Seed', inversion: 150000, estado: 'Activa', hitos: 2, fecha: '2026-07-15' },
            { id: 'ST-003', nombre: 'SunWave', region: 'Canarias', ronda: 'Seed', inversion: 200000, estado: 'En curso', hitos: 1, fecha: '2026-08-01' },
            { id: 'ST-004', nombre: 'SolarCan', region: 'Península', ronda: 'Growth', inversion: 500000, estado: 'Pendiente', hitos: 0, fecha: '2026-09-01' },
            { id: 'ST-005', nombre: 'BioCanarias', region: 'Canarias', ronda: 'Serie A', inversion: 1000000, estado: 'En curso', hitos: 2, fecha: '2026-08-10' },
            { id: 'ST-006', nombre: 'OceanTech', region: 'México', ronda: 'Internacionalización', inversion: 750000, estado: 'Pendiente', hitos: 0, fecha: '2026-11-01' }
        ];

        const alertas = [
            { tipo: '(IN)', mensaje: 'Ronda de inversión de BioCanarias requiere aceleración', fecha: '2026-08-25 14:30' },
            { tipo: '(RS)', mensaje: 'Posible retraso en la internacionalización de OceanTech', fecha: '2026-08-24 09:15' },
            { tipo: '(VA)', mensaje: 'Validación de hito completada para GreenCan', fecha: '2026-08-23 18:00' },
            { tipo: '(RS)', mensaje: 'Nuevos requisitos regulatorios para energías renovables en Canarias', fecha: '2026-08-26 11:45' }
        ];

        const documentos = [
            { nombre: 'Acuerdo de inversión', startup: 'GreenCan', estado: 'Firmado', hash: '0xa1b2...c3d4' },
            { nombre: 'Acta de seguimiento', startup: 'EcoTech', estado: 'Pendiente', hash: '0xe5f6...g7h8' },
            { nombre: 'Reporte financiero', startup: 'BioCanarias', estado: 'En revisión', hash: '0x9i0j...k1l2' },
            { nombre: 'Plan de negocio', startup: 'OceanTech', estado: 'Validado', hash: '0xm3n4...o5p6' }
        ];

        const actores = [
            { nombre: 'Gestor de inversión', region: 'Canarias', rol: 'Coordinación', contacto: 'gestor@recaba.es' },
            { nombre: 'Comité de inversión', region: 'Canarias', rol: 'Aprobación', contacto: 'comite@recaba.es' },
            { nombre: 'Asesor legal', region: 'Península', rol: 'Legal', contacto: 'legal@recaba.es' },
            { nombre: 'Business Angel lead', region: 'México', rol: 'Mentoría', contacto: 'angel@recaba.es' }
        ];

        let html = `
            <div style="margin-top: 40px; border-top: 2px solid rgba(139,92,246,0.2); padding-top: 20px;">
                <h2 style="color: #a78bfa; font-size: 22px; font-weight: 700; letter-spacing: -0.3px; margin-bottom: 20px;">
                    🚀 Startups en Cartera · RECABA
                </h2>
                <p style="color: #94a3b8; font-size: 14px; margin-bottom: 20px;">
                    Seguimiento de las startups financiadas, rondas de inversión y documentos asociados.
                </p>
            </div>
        `;

        const totalStartups = startups.length;
        const activas = startups.filter(s => s.estado === 'Activa' || s.estado === 'En curso').length;
        const inversionTotal = startups.reduce((sum, s) => sum + s.inversion, 0);

        html += `
            <div class="zacky-corredor-card" style="margin-bottom: 20px;">
                <div class="zacky-corredor-card-title">📊 KPIs de la Cartera</div>
                <div class="zacky-corredor-kpis">
                    <div class="zacky-corredor-kpi"><div class="valor" style="color:#8b5cf6;">${totalStartups}</div><div class="label">Total Startups</div></div>
                    <div class="zacky-corredor-kpi"><div class="valor" style="color:#10b981;">${activas}</div><div class="label">✅ Activas</div></div>
                    <div class="zacky-corredor-kpi"><div class="valor" style="color:#f59e0b;">${(inversionTotal/1000).toFixed(0)}k€</div><div class="label">💰 Inversión Total</div></div>
                </div>
            </div>
        `;

        html += `
            <div class="zacky-corredor-card" style="margin-bottom: 20px;">
                <div class="zacky-corredor-card-title">📋 Startups Activas</div>
                <div class="zacky-corredor-table-wrap">
                    <table class="zacky-corredor-table">
                        <thead><tr><th>ID</th><th>Nombre</th><th>Región</th><th>Ronda</th><th>Inversión</th><th>Estado</th><th>Hitos</th><th>Fecha</th></tr></thead>
                        <tbody>
                            ${startups.map(s => {
                                const estadoClase = s.estado === 'Activa' ? 'badge-success' : s.estado === 'En curso' ? 'badge-warning' : 'badge-info';
                                return `<tr>
                                    <td><strong style="color:#8b5cf6;">${s.id}</strong></td>
                                    <td>${s.nombre}</td>
                                    <td>${s.region}</td>
                                    <td>${s.ronda}</td>
                                    <td style="color:#f59e0b;">${s.inversion}€</td>
                                    <td><span class="zacky-corredor-badge ${estadoClase}">${s.estado}</span></td>
                                    <td>${s.hitos}</td>
                                    <td>${s.fecha}</td>
                                </tr>`;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        html += `
            <div class="zacky-corredor-card" style="margin-bottom: 20px;">
                <div class="zacky-corredor-card-title">⚠️ Alertas Automáticas</div>
                ${alertas.map(a => `
                    <div style="display:flex; align-items:center; gap:12px; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.04); font-size:13px; color:#cbd5e1;">
                        <span style="font-size:20px;">${a.tipo}</span>
                        <div style="flex:1;">
                            <div>${a.mensaje}</div>
                            <div style="font-size:11px; color:#94a3b8;">${a.fecha}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        html += `
            <div class="zacky-corredor-card" style="margin-bottom: 20px;">
                <div class="zacky-corredor-card-title">📄 Documentos Clave</div>
                <div class="zacky-corredor-table-wrap">
                    <table class="zacky-corredor-table">
                        <thead><tr><th>Documento</th><th>Startup</th><th>Estado</th><th>Hash</th></tr></thead>
                        <tbody>
                            ${documentos.map(d => `
                                <tr>
                                    <td><strong>${d.nombre}</strong></td>
                                    <td>${d.startup}</td>
                                    <td><span class="zacky-corredor-badge ${d.estado === 'Firmado' || d.estado === 'Validado' ? 'badge-success' : d.estado === 'En revisión' ? 'badge-warning' : 'badge-info'}">${d.estado}</span></td>
                                    <td style="font-size:10px; color:#94a3b8; font-family: monospace;">${d.hash}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        html += `
            <div class="zacky-corredor-card" style="margin-bottom: 20px;">
                <div class="zacky-corredor-card-title">🤝 Red de Actores</div>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px,1fr)); gap: 12px;">
                    ${actores.map(a => `
                        <div style="background: rgba(0,0,0,0.2); border-radius: 12px; padding: 12px; border: 1px solid rgba(255,255,255,0.05);">
                            <div style="font-weight: 600; color: #e2e8f0; font-size: 14px;">${a.nombre}</div>
                            <div style="font-size: 11px; color: #94a3b8;">${a.region} · ${a.rol}</div>
                            <div style="font-size: 10px; color: #64748b; margin-top: 4px;">📧 ${a.contacto}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        body.insertAdjacentHTML('beforeend', html);
    }

    // ============================================================
    // INICIALIZACIÓN
    // ============================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', crearBotonFlotante);
    } else {
        crearBotonFlotante();
    }

    window.abrirCorredorDigital = abrirCorredorDigital;
    console.log('🗺️ Ecosistema de Inversión RECABA v5.0 cargado - Adaptado a Business Angels');
})();