// ============================================================
// 🗺️ ZACKY + USYNCRO - CORREDOR DIGITAL MAPA 3D PREMIUM
// Versión 4.1.3 - SIN PÁGINAS VACÍAS EN GRÁFICAS
// ============================================================

(function() {
    'use strict';

    const CONFIG = {
        CORRIDOR_ID: 'EU-MA-UK-US-MX-2026',
        CORRIDOR_NOMBRE: 'Corredor Digital Multi-Continente',
        CENTRO_MAPA: [25, -50],
        ZOOM_MAPA: 3
    };

    const CORREDOR = {
        nombre: CONFIG.CORRIDOR_NOMBRE,
        paises: [
            { id: 'UK', nombre: 'Reino Unido', lat: 54.0, lon: -2.0, color: '#3b82f6', activo: true, hitos: 3, flag: '🇬🇧', continente: 'Europa' },
            { id: 'ES', nombre: 'España', lat: 40.4, lon: -3.7, color: '#f59e0b', activo: true, hitos: 5, flag: '🇪🇸', continente: 'Europa' },
            { id: 'MA', nombre: 'Marruecos', lat: 31.8, lon: -7.1, color: '#10b981', activo: true, hitos: 4, flag: '🇲🇦', continente: 'África' },
            { id: 'US', nombre: 'Estados Unidos', lat: 39.8, lon: -98.5, color: '#ef4444', activo: true, hitos: 4, flag: '🇺🇸', continente: 'América' },
            { id: 'MX', nombre: 'México', lat: 23.6, lon: -102.5, color: '#f97316', activo: true, hitos: 3, flag: '🇽', continente: 'América' }
        ],
        conexiones: [
            { from: 'UK', to: 'ES', tipo: 'marítimo', estado: 'activo', color: '#10b981' },
            { from: 'ES', to: 'MA', tipo: 'marítimo', estado: 'activo', color: '#10b981' },
            { from: 'UK', to: 'US', tipo: 'aéreo', estado: 'activo', color: '#3b82f6' },
            { from: 'US', to: 'MX', tipo: 'terrestre', estado: 'activo', color: '#f97316' },
            { from: 'ES', to: 'MX', tipo: 'marítimo', estado: 'planificado', color: '#f59e0b' }
        ],
        etapas: [
            { id: 'E1', nombre: 'Recepción de documentos UK', pais: 'UK', estado: 'completed', fechaInicio: '2026-08-20', fechaFinReal: '2026-08-22', duracionEstimada: 2, progress: 100, responsable: 'Logistics UK', prioridad: 'alta' },
            { id: 'E2', nombre: 'Validación aduanera Londres', pais: 'UK', estado: 'completed', fechaInicio: '2026-08-21', fechaFinReal: '2026-08-23', duracionEstimada: 2, progress: 100, responsable: 'Customs UK', prioridad: 'media' },
            { id: 'E3', nombre: 'Embarque en Algeciras', pais: 'ES', estado: 'inProgress', fechaInicio: '2026-08-24', fechaFinEstimada: '2026-08-27', duracionEstimada: 3, progress: 65, responsable: 'Shipping ES', prioridad: 'alta' },
            { id: 'E4', nombre: 'Capacitación de usuarios ES', pais: 'ES', estado: 'pending', fechaInicio: null, fechaFinEstimada: '2026-09-05', duracionEstimada: 2, progress: 0, responsable: 'Training Team', prioridad: 'media' },
            { id: 'E5', nombre: 'Validación aduanera Tánger Med', pais: 'MA', estado: 'inProgress', fechaInicio: '2026-08-23', fechaFinEstimada: '2026-08-26', duracionEstimada: 3, retraso: 2, progress: 70, responsable: 'Customs MA', prioridad: 'critica' },
            { id: 'E6', nombre: 'Llegada y distribución Casablanca', pais: 'MA', estado: 'pending', fechaInicio: null, fechaFinEstimada: '2026-08-30', duracionEstimada: 2, progress: 0, responsable: 'Distribution MA', prioridad: 'media' },
            { id: 'E7', nombre: 'Integración con sistemas locales MA', pais: 'MA', estado: 'pending', fechaInicio: null, fechaFinEstimada: '2026-09-02', duracionEstimada: 3, progress: 0, responsable: 'IT Integration', prioridad: 'alta' },
            { id: 'E8', nombre: 'Procesamiento en Nueva York', pais: 'US', estado: 'completed', fechaInicio: '2026-08-19', fechaFinReal: '2026-08-21', duracionEstimada: 2, progress: 100, responsable: 'Operations US', prioridad: 'alta' },
            { id: 'E9', nombre: 'Distribución regional US', pais: 'US', estado: 'inProgress', fechaInicio: '2026-08-22', fechaFinEstimada: '2026-08-28', duracionEstimada: 4, progress: 55, responsable: 'Logistics US', prioridad: 'media' },
            { id: 'E10', nombre: 'Coordinación aduanera CDMX', pais: 'MX', estado: 'inProgress', fechaInicio: '2026-08-23', fechaFinEstimada: '2026-08-27', duracionEstimada: 3, progress: 60, responsable: 'Customs MX', prioridad: 'alta' },
            { id: 'E11', nombre: 'Integración plataforma Usyncro MX', pais: 'MX', estado: 'pending', fechaInicio: null, fechaFinEstimada: '2026-09-01', duracionEstimada: 3, progress: 0, responsable: 'IT Mexico', prioridad: 'alta' },
            { id: 'E12', nombre: 'Capacitación equipo local MX', pais: 'MX', estado: 'pending', fechaInicio: null, fechaFinEstimada: '2026-09-04', duracionEstimada: 2, progress: 0, responsable: 'Training MX', prioridad: 'media' }
        ],
        metricas: {
            totalShipments: 1847,
            onTime: 89,
            delayed: 10,
            avgTransitTime: 3.5,
            complianceRate: 95,
            costEfficiency: 91,
            customerSatisfaction: 4.8
        },
        riesgos: [
            { id: 'R1', descripcion: 'Retraso en validación aduanera en Tánger', impacto: 'alto', probabilidad: 'media', mitigacion: 'Asignar recurso adicional en aduanas' },
            { id: 'R2', descripcion: 'Posibles huelgas en puertos de Algeciras', impacto: 'alto', probabilidad: 'baja', mitigacion: 'Planificar rutas alternativas' },
            { id: 'R3', descripcion: 'Cambios regulatorios en Reino Unido post-Brexit', impacto: 'medio', probabilidad: 'media', mitigacion: 'Monitoreo legislativo continuo' },
            { id: 'R4', descripcion: 'Falta de integración de sistemas en Marruecos', impacto: 'alto', probabilidad: 'alta', mitigacion: 'Desarrollar adaptadores específicos' },
            { id: 'R5', descripcion: 'Retrasos en frontera US-MX por inspecciones', impacto: 'medio', probabilidad: 'media', mitigacion: 'Pre-validación de documentación' },
            { id: 'R6', descripcion: 'Variabilidad cambiaria USD/MXN', impacto: 'medio', probabilidad: 'alta', mitigacion: 'Contratos con tipo de cambio fijo' }
        ],
        sugerencias: [
            { id: 'S1', texto: 'Acelerar la validación aduanera con personal adicional en Tánger y CDMX', prioridad: 'alta' },
            { id: 'S2', texto: 'Establecer reuniones de seguimiento diarias con equipos de Marruecos y México', prioridad: 'alta' },
            { id: 'S3', texto: 'Revisar los acuerdos de nivel de servicio con transportistas transatlánticos', prioridad: 'media' },
            { id: 'S4', texto: 'Capacitar al personal local en el uso de la plataforma Usyncro en todos los países', prioridad: 'media' },
            { id: 'S5', texto: 'Implementar tracking en tiempo real para rutas US-MX', prioridad: 'alta' }
        ]
    };

    const EVM_DATA = {
        BAC: 180,
        PV: 108,
        EV: 92,
        AC: 78,
        SPI: 0.85,
        CPI: 1.18,
        EAC: 152.5,
        ETC: 74.5,
        VAC: 27.5,
        CV: 14,
        SV: -16
    };

    // ============================================================
    // ESTILOS
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
    flex: 1;
    width: 100%;
    height: 100%;
    min-height: 0;
    border-radius: 16px;
    overflow: auto; /* Barras de desplazamiento si el mapa es más grande */
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

    // ============================================================
    // BOTÓN FLOTANTE
    // ============================================================
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
        btn.title = 'Abrir Corredor Digital Premium';
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
        console.log('✅ Botón Corredor Digital Premium creado');
    }

    // ============================================================
    // ABRIR CORREDOR
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
        modal.innerHTML = `
            <div class="zacky-corredor-header">
                <div class="zacky-corredor-header-left">
                    <div class="icon">🌍</div>
                    <div class="zacky-corredor-header-title">
                        <h1>Corredor Digital · Multi-Continente</h1>
                        <p>${CONFIG.CORRIDOR_NOMBRE} · ${CORREDOR.paises.filter(p => p.activo).length} países activos (🇬🇧 🇪 🇲🇦 🇺 🇲🇽)</p>
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
                <div style="text-align:center; padding:40px; color:#94a3b8;">Cargando dashboard...</div>
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
       setTimeout(agregarSeccionesOperativas, 600); // espera a que el DOM esté listo
    }

    // ============================================================
    // VOCES
    // ============================================================
    function cargarVoces() {
        const selector = document.getElementById('zackyVoiceSelector');
        if (!selector) return;
        if (!window.speechSynthesis) {
            selector.innerHTML = '<option value="default">🔊 Voz no disponible</option>';
            return;
        }
        const actualizarVoces = () => {
            const voces = window.speechSynthesis.getVoices();
            const vocesEspanol = voces.filter(v => v.lang.startsWith('es'));
            const otrasVoces = voces.filter(v => !v.lang.startsWith('es'));
            const vocesMostrar = [...vocesEspanol, ...otrasVoces].slice(0, 15);
            selector.innerHTML = '<option value="default">🔊 Voz por defecto</option>';
            vocesMostrar.forEach(v => {
                const opt = document.createElement('option');
                opt.value = v.name;
                opt.textContent = `${v.lang} · ${v.name}`;
                if (v.lang.startsWith('es')) opt.textContent = '🇪 ' + opt.textContent;
                selector.appendChild(opt);
            });
            if (vocesEspanol.length > 0) selector.value = vocesEspanol[0].name;
        };
        if (window.speechSynthesis.getVoices().length > 0) {
            actualizarVoces();
        } else {
            window.speechSynthesis.onvoiceschanged = actualizarVoces;
            setTimeout(actualizarVoces, 2000);
        }
    }

    function getVozSeleccionada() {
        const selector = document.getElementById('zackyVoiceSelector');
        if (!selector || selector.value === 'default') return null;
        const voces = window.speechSynthesis.getVoices();
        return voces.find(v => v.name === selector.value) || null;
    }

    // ============================================================
    // RENDERIZAR DASHBOARD
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
                    <div class="mapa-titulo">🗺️ Corredor Digital · 5 Países Activos</div>
                    <div id="zackyMapContainer"></div>
                </div>
                <div class="zacky-corredor-right">
                    <div class="zacky-corredor-card">
                        <div class="zacky-corredor-card-title">📊 Métricas del Corredor (5 países)</div>
                        <div class="zacky-corredor-kpis">
                            <div class="zacky-corredor-kpi"><div class="valor" style="color:#8b5cf6;">${total}</div><div class="label">Total Tareas</div></div>
                            <div class="zacky-corredor-kpi"><div class="valor" style="color:#10b981;">${completadas}</div><div class="label">✅ Completadas</div></div>
                            <div class="zacky-corredor-kpi"><div class="valor" style="color:#f59e0b;">${progreso}%</div><div class="label">📈 Progreso</div></div>
                            <div class="zacky-corredor-kpi"><div class="valor" style="color:#f59e0b;">${enProgreso}</div><div class="label">🔄 En Progreso</div></div>
                            <div class="zacky-corredor-kpi"><div class="valor" style="color:#ef4444;">${criticas}</div><div class="label">🔥 Críticas</div></div>
                            <div class="zacky-corredor-kpi"><div class="valor" style="color:#06b6d4;">${retrasos}</div><div class="label">️ Días retraso</div></div>
                        </div>
                        <div style="margin-top:12px; padding-top:10px; border-top:1px solid rgba(255,255,255,0.05); font-size:11px; color:#94a3b8;">
                            <strong style="color:#a78bfa;">Países activos:</strong> 
                            🇬🇧 Reino Unido · 🇪🇸 España · 🇲🇦 Marruecos · 🇺 EE.UU. · 🇲🇽 México
                        </div>
                    </div>
                    <div class="zacky-corredor-card">
                        <div class="zacky-corredor-card-title">📈 Valor Ganado (EVM) · Explicado</div>
                        <div style="font-size:12px; color:#94a3b8; margin-bottom:8px;">
                            <strong>¿Qué es EVM?</strong> Mide el desempeño combinando alcance, tiempo y costo.
                        </div>
                        <div class="zacky-corredor-evm">
                            <div class="zacky-corredor-evm-item"><div class="evm-valor" style="color:#3b82f6;">${evm.PV}h</div><div class="evm-label">📋 PV</div><div class="evm-desc">Planificado</div><span class="evm-badge evm-badge-blue">Base</span></div>
                            <div class="zacky-corredor-evm-item"><div class="evm-valor" style="color:#10b981;">${evm.EV}h</div><div class="evm-label">✅ EV</div><div class="evm-desc">Ganado</div><span class="evm-badge evm-badge-green">Progreso</span></div>
                            <div class="zacky-corredor-evm-item"><div class="evm-valor" style="color:#ef4444;">${evm.AC}h</div><div class="evm-label"> AC</div><div class="evm-desc">Real</div><span class="evm-badge evm-badge-red">Costo</span></div>
                            <div class="zacky-corredor-evm-item"><div class="evm-valor" style="color:${evm.SPI >= 1 ? '#10b981' : '#f59e0b'};">${evm.SPI.toFixed(2)}</div><div class="evm-label">⏱️ SPI</div><div class="evm-desc">${evm.SPI >= 1 ? 'Adelantado' : 'Retraso'}</div><span class="evm-badge ${evm.SPI >= 1 ? 'evm-badge-green' : 'evm-badge-yellow'}">${evm.SPI >= 1 ? 'Bueno' : 'Atención'}</span></div>
                            <div class="zacky-corredor-evm-item"><div class="evm-valor" style="color:${evm.CPI >= 1 ? '#10b981' : '#ef4444'};">${evm.CPI.toFixed(2)}</div><div class="evm-label">💵 CPI</div><div class="evm-desc">${evm.CPI >= 1 ? 'Eficiente' : 'Sobrecosto'}</div><span class="evm-badge ${evm.CPI >= 1 ? 'evm-badge-green' : 'evm-badge-red'}">${evm.CPI >= 1 ? 'Eficiente' : 'Alerta'}</span></div>
                            <div class="zacky-corredor-evm-item"><div class="evm-valor" style="color:#8b5cf6;">${evm.EAC.toFixed(1)}h</div><div class="evm-label">🔮 EAC</div><div class="evm-desc">Estimado final</div><span class="evm-badge evm-badge-blue">Pronóstico</span></div>
                            <div class="zacky-corredor-evm-item"><div class="evm-valor" style="color:#f59e0b;">${evm.ETC.toFixed(1)}h</div><div class="evm-label">📌 ETC</div><div class="evm-desc">Por completar</div><span class="evm-badge evm-badge-yellow">Restante</span></div>
                            <div class="zacky-corredor-evm-item"><div class="evm-valor" style="color:${evm.VAC >= 0 ? '#10b981' : '#ef4444'};">${evm.VAC >= 0 ? '+' : ''}${evm.VAC.toFixed(1)}h</div><div class="evm-label">📊 VAC</div><div class="evm-desc">${evm.VAC >= 0 ? 'Ahorro' : 'Sobrecosto'}</div><span class="evm-badge ${evm.VAC >= 0 ? 'evm-badge-green' : 'evm-badge-red'}">${evm.VAC >= 0 ? 'Bueno' : 'Atención'}</span></div>
                        </div>
                        <div style="margin-top:10px; font-size:11px; color:#94a3b8; text-align:center; border-top:1px solid rgba(255,255,255,0.05); padding-top:8px;">
                            <strong>Resumen:</strong> SPI ${evm.SPI.toFixed(2)} · CPI ${evm.CPI.toFixed(2)} · 
                            <span style="color:${evm.VAC >= 0 ? '#10b981' : '#ef4444'};">VAC ${evm.VAC >= 0 ? '+' : ''}${evm.VAC.toFixed(1)}h</span>
                        </div>
                    </div>
                    <div class="zacky-corredor-card">
                        <div class="zacky-corredor-card-title">️ Riesgos Identificados</div>
                        ${riesgos.map(r => `
                            <div style="display:flex; align-items:flex-start; gap:10px; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.04); font-size:13px; color:#cbd5e1; line-height:1.4;">
                                <span style="font-size:18px; flex-shrink:0;">${r.impacto === 'alto' ? '🔴' : r.impacto === 'medio' ? '' : '🟢'}</span>
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
                    <div class="zacky-corredor-card">
                        <div class="zacky-corredor-card-title"> Sugerencias Estratégicas</div>
                        ${sugerencias.map(s => `
                            <div style="display:flex; align-items:flex-start; gap:10px; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.04); font-size:13px; color:#cbd5e1; line-height:1.4;">
                                <span style="font-size:18px; flex-shrink:0;">${s.prioridad === 'alta' ? '🔴' : ''}</span>
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
                <div class="zacky-corredor-chart-card"><div class="chart-title">📊 Distribución de Tareas por Estado</div><canvas id="zackyChartDist"></canvas></div>
                <div class="zacky-corredor-chart-card"><div class="chart-title">📈 EVM · PV vs EV vs AC</div><canvas id="zackyChartEVM"></canvas></div>
                <div class="zacky-corredor-chart-card"><div class="chart-title">📉 Burndown · Progreso vs Ideal</div><canvas id="zackyChartBurndown"></canvas></div>
                <div class="zacky-corredor-chart-card"><div class="chart-title">🌍 Rendimiento por País (5 países)</div><canvas id="zackyChartPaises"></canvas></div>
            </div>
            <div class="zacky-corredor-card" style="margin-bottom:20px;">
                <div class="zacky-corredor-card-title">📋 Detalle Ejecutivo de Tareas (🇧🇪🇸🇦🇺🇸🇽)</div>
                <div class="zacky-corredor-table-wrap">
                    <table class="zacky-corredor-table">
                        <thead><tr><th>ID</th><th>Tarea</th><th>País</th><th>Responsable</th><th>Estado</th><th>Progreso</th><th>Estimado</th><th>Retraso</th></tr></thead>
                        <tbody>
                            ${etapas.map(e => {
                                const estadoMap = { 'completed': { clase: 'badge-success', texto: '✅ Completada' }, 'inProgress': { clase: 'badge-warning', texto: '🔄 En Progreso' }, 'pending': { clase: 'badge-info', texto: ' Pendiente' } };
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
    // MAPA
    // ============================================================
function inicializarMapa() {
    const container = document.getElementById('zackyMapContainer');
    if (!container) {
        console.error('❌ Contenedor #zackyMapContainer no encontrado');
        return;
    }

    // Configurar contenedor
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.minHeight = '500px';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.background = 'transparent';

    // Mostrar mensaje de carga
    container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#94a3b8;font-family:Inter,sans-serif;font-size:14px;">🔄 Cargando mapa 3D...</div>';

    // Cargar MapLibre GL JS
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
            center: [-50, 25],
            zoom: 2.5,
            pitch: 45,
            bearing: -20,
            antialias: true,
            attributionControl: false,
            interactive: true,
            dragPan: { inertia: 0.8, ease: 0.1 },
            dragRotate: true,
            scrollZoom: true,
            doubleClickZoom: true,
            touchZoomRotate: true,
            touchPitch: true,
            boxZoom: true,
            keyboard: true,
            pitchWithRotate: true,
            fadeDuration: 100
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

        mapaInstance.on('error', (e) => {
            console.warn('⚠️ Advertencia en MapLibre:', e);
        });

        mapaInstance.on('load', function() {
            console.log('✅ Mapa 3D cargado correctamente');
            const paises = CORREDOR.paises.filter(p => p.activo);
            const conexiones = CORREDOR.conexiones;

            // --- 1. RUTAS ---
            const rutasActivas = [];
            const rutasPlanificadas = [];

            conexiones.forEach(conn => {
                const from = CORREDOR.paises.find(p => p.id === conn.from);
                const to = CORREDOR.paises.find(p => p.id === conn.to);
                if (!from || !to) return;

                const start = [from.lon, from.lat];
                const end = [to.lon, to.lat];
                const midLon = (from.lon + to.lon) / 2;
                const midLat = (from.lat + to.lat) / 2 + 5;

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

            // --- 2. PAÍSES (CÍRCULOS) ---
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

                // ============================================================
                // 🆕 POPUPS MEJORADOS (AQUÍ ESTÁ LA MAGIA)
                // ============================================================
                console.log('🔧 Configurando popups...');

                // Cambiar cursor al pasar por círculo
                mapaInstance.on('mouseenter', 'paises-circles', function() {
                    mapaInstance.getCanvas().style.cursor = 'pointer';
                });
                mapaInstance.on('mouseleave', 'paises-circles', function() {
                    mapaInstance.getCanvas().style.cursor = '';
                });

                // Evento click en los círculos
                mapaInstance.on('click', 'paises-circles', function(e) {
                    console.log('🖱️ Clic en círculo de país');
                    const props = e.features[0].properties;
                    if (!props || !props.id) {
                        console.warn('⚠️ No se encontraron propiedades del país');
                        return;
                    }
                    mostrarPopupPais(props.id, e.lngLat);
                });

                // También permitir clic en cualquier parte del mapa (por si no da justo en el círculo)
                mapaInstance.on('click', function(e) {
                    // Si ya se manejó en la capa, no hacer nada (evita duplicados)
                    const features = mapaInstance.queryRenderedFeatures(e.point, {
                        layers: ['paises-circles']
                    });
                    if (features && features.length > 0) {
                        // Ya se maneja en el evento anterior
                        return;
                    }
                    // Buscar por proximidad
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
                        console.log('🖱️ Clic cerca de país:', paisCercano.nombre);
                        mostrarPopupPais(paisCercano.id, e.lngLat);
                    }
                });

                // Función para mostrar popup (definida dentro del closure)
               function mostrarPopupPais(paisId, lngLat) {
    console.log('📌 mostrarPopupPais llamado con ID:', paisId);

    const pais = CORREDOR.paises.find(p => p.id === paisId);
    if (!pais) {
        console.warn('❌ País no encontrado para ID:', paisId);
        return;
    }

    console.log('✅ País encontrado:', pais);

    // Filtrar tareas del país
    const tareasPais = CORREDOR.etapas.filter(e => e.pais === pais.id);
    console.log(`📋 Tareas para ${pais.nombre}:`, tareasPais);

    const total = tareasPais.length;
    const completadas = tareasPais.filter(e => e.estado === 'completed').length;
    const enProgreso = tareasPais.filter(e => e.estado === 'inProgress').length;
    const pendientes = tareasPais.filter(e => e.estado === 'pending').length;
    const criticas = tareasPais.filter(e => e.prioridad === 'critica').length;
    const progreso = total > 0 ? Math.round((completadas / total) * 100) : 0;
    const retrasos = tareasPais.reduce((sum, e) => sum + (e.retraso || 0), 0);

    console.log(`📊 Datos calculados: total=${total}, completadas=${completadas}, progreso=${progreso}%`);

    // Cerrar popup anterior si existe
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
                📋 <strong>Total tareas:</strong> ${total}<br>
                ✅ <strong>Completadas:</strong> ${completadas}<br>
                🔄 <strong>En progreso:</strong> ${enProgreso}<br>
                ⏳ <strong>Pendientes:</strong> ${pendientes}<br>
                🔥 <strong>Críticas:</strong> ${criticas}<br>
                ⏰ <strong>Retrasos:</strong> ${retrasos} días<br>
                📊 <strong>Progreso:</strong> ${progreso}%
            </div>
            <div style="margin-top:8px;padding-top:6px;border-top:1px solid rgba(255,255,255,0.1);font-size:11px;color:${pais.activo ? '#10b981' : '#94a3b8'};">
                ${pais.activo ? '✅ País activo en el corredor' : '⏸️ País inactivo'}
            </div>
        </div>
    `;

    // Asegurarse de que el popup se muestre con tamaño adecuado
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

    // Cerrar popup al hacer clic fuera
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

                // --- 3. ETIQUETAS DE TEXTO (marcadores) ---
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
                        pointer-events: auto;  /* Permitir clic */
                        cursor: pointer;
                        text-shadow: 0 1px 3px rgba(0,0,0,0.5);
                        transition: transform 0.2s;
                    `;
                    // Añadir evento de clic directamente al marcador
                    el.addEventListener('click', function(e) {
                        e.stopPropagation();
                        console.log('🖱️ Clic en marcador de:', p.nombre);
                        const lngLat = new maplibregl.LngLat(p.lon, p.lat);
                        mostrarPopupPais(p.id, lngLat);
                    });
                    // Efecto hover
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

            // --- AJUSTAR VISTA ---
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
                    duration: 1500,
                    easing: (t) => t * t * (3 - 2 * t)
                });
            }

            // --- LEYENDA ---
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
                        <span>Ruta activa</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:6px;margin:2px 0;">
                        <span style="width:16px;height:2px;background:#f59e0b;border-radius:2px;border-top:2px dashed #f59e0b;display:inline-block;"></span>
                        <span>Planificado</span>
                    </div>
                </div>
            `;
            container.appendChild(legendEl);

            console.log('✅ Mapa completamente funcional con popups');
        });

        // Redimensionar al cambiar el tamaño
        window.addEventListener('resize', function() {
            if (mapaInstance) mapaInstance.resize();
        });

        // Ayuda visual
        setTimeout(() => {
            const ayuda = document.createElement('div');
            ayuda.style.cssText = `
                position: absolute;
                bottom: 80px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 5;
                background: rgba(0,0,0,0.6);
                color: #94a3b8;
                padding: 6px 16px;
                border-radius: 30px;
                font-size: 11px;
                font-family: 'Inter', sans-serif;
                backdrop-filter: blur(4px);
                border: 1px solid rgba(255,255,255,0.05);
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.5s ease;
                white-space: nowrap;
            `;
            ayuda.textContent = '🖱️ Haz clic en cualquier país o su bandera para ver detalles';
            container.appendChild(ayuda);
            setTimeout(() => { ayuda.style.opacity = '0.8'; }, 100);
            setTimeout(() => { ayuda.style.opacity = '0'; }, 8000);
        }, 1500);

    } catch (error) {
        console.error('❌ Error al inicializar MapLibre:', error);
        container.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#ef4444;font-family:Inter,sans-serif;font-size:14px;padding:20px;text-align:center;">
            ❌ Error al iniciar el mapa.<br>
            <span style="font-size:12px;color:#94a3b8;">${error.message}</span>
        </div>`;
    }
}

    // ============================================================
    // GRÁFICAS
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
                data: { labels: ['Completadas', 'En Progreso', 'Pendientes', 'Críticas'], datasets: [{ data: [completadas, enProgreso, pendientes, criticas], backgroundColor: ['#10b981', '#f59e0b', '#94a3b8', '#ef4444'], borderWidth: 0, hoverOffset: 10 }] },
                options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 10 }, usePointStyle: true, padding: 14 } }, tooltip: { backgroundColor: 'rgba(15,23,42,0.9)', titleColor: '#e2e8f0', bodyColor: '#e2e8f0', borderColor: 'rgba(139,92,246,0.2)', borderWidth: 1, callbacks: { label: function(ctx) { const total = ctx.dataset.data.reduce((a,b) => a+b, 0); const pct = total > 0 ? Math.round((ctx.raw / total) * 100) : 0; return ctx.label + ': ' + ctx.raw + ' (' + pct + '%)'; } } } }, cutout: '65%' }
            });
        }

        const ctxEVM = document.getElementById('zackyChartEVM');
        if (ctxEVM) {
            chartInstances.evm = new Chart(ctxEVM.getContext('2d'), {
                type: 'bar',
                data: { labels: ['PV', 'EV', 'AC'], datasets: [{ label: 'Horas', data: [evm.PV, evm.EV, evm.AC], backgroundColor: ['#3b82f6', '#10b981', '#ef4444'], borderRadius: 6, barPercentage: 0.6 }] },
                options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgba(15,23,42,0.9)', titleColor: '#e2e8f0', bodyColor: '#e2e8f0', borderColor: 'rgba(139,92,246,0.2)', borderWidth: 1, callbacks: { label: function(ctx) { return ctx.dataset.label + ': ' + ctx.raw + 'h'; } } } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8', callback: function(v) { return v + 'h'; } } }, x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { weight: 'bold' } } } }, animation: { duration: 1000, easing: 'easeOutQuart' } }
            });
        }

        const ctxBurn = document.getElementById('zackyChartBurndown');
        if (ctxBurn) {
            const total = evm.BAC;
            const ideal = [total, total * 0.75, total * 0.5, total * 0.25, 0];
            const real = [total, total * 0.7, total * 0.55, total * 0.4, total - evm.EV];
            chartInstances.burn = new Chart(ctxBurn.getContext('2d'), {
                type: 'line',
                data: { labels: ['Inicio', 'Sem 1', 'Sem 2', 'Sem 3', 'Actual'], datasets: [{ label: 'Ideal', data: ideal, borderColor: '#8b5cf6', borderWidth: 2, borderDash: [5,5], fill: false, pointRadius: 0, tension: 0.1 }, { label: 'Real', data: real, borderColor: '#f59e0b', borderWidth: 3, fill: true, backgroundColor: 'rgba(245,158,11,0.06)', tension: 0.2, pointRadius: 4, pointBackgroundColor: '#f59e0b', pointBorderColor: 'white', pointBorderWidth: 1 }] },
                options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'top', labels: { color: '#94a3b8', font: { size: 10 }, usePointStyle: true } }, tooltip: { backgroundColor: 'rgba(15,23,42,0.9)', titleColor: '#e2e8f0', bodyColor: '#e2e8f0', borderColor: 'rgba(139,92,246,0.2)', borderWidth: 1, callbacks: { label: function(ctx) { return ctx.dataset.label + ': ' + ctx.raw.toFixed(1) + 'h'; } } } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8', callback: function(v) { return v + 'h'; } } }, x: { grid: { display: false }, ticks: { color: '#94a3b8' } } }, animation: { duration: 1200, easing: 'easeOutQuart' } }
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
                data: { labels: labels, datasets: [{ label: 'Completadas', data: completadasPorPais, backgroundColor: 'rgba(16,185,129,0.7)', borderRadius: 4, barPercentage: 0.35 }, { label: 'Eficiencia (%)', data: eficiencia, backgroundColor: 'rgba(139,92,246,0.6)', borderRadius: 4, barPercentage: 0.35 }] },
                options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'top', labels: { color: '#94a3b8', font: { size: 10 }, usePointStyle: true } }, tooltip: { backgroundColor: 'rgba(15,23,42,0.9)', titleColor: '#e2e8f0', bodyColor: '#e2e8f0', borderColor: 'rgba(139,92,246,0.2)', borderWidth: 1 } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } }, x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { weight: '500' } } } }, animation: { duration: 1000, easing: 'easeOutQuart' } }
            });
        }
        console.log('✅ Gráficas inicializadas');
    }

    function destruirGraficas() {
        Object.keys(chartInstances).forEach(key => { if (chartInstances[key]) { chartInstances[key].destroy(); chartInstances[key] = null; } });
        chartInstances = {};
        if (mapaInstance) { mapaInstance.remove(); mapaInstance = null; }
    }

    // ============================================================
    // STORYTELLING Y VOZ
    // ============================================================
  function generarStorytelling(etapas, riesgos, progreso) {
    const completadas = etapas.filter(e => e.estado === 'completed').length;
    const total = etapas.length;
    const enProgreso = etapas.filter(e => e.estado === 'inProgress').length;
    const criticas = etapas.filter(e => e.prioridad === 'critica').length;
    const riesgosAltos = riesgos.filter(r => r.impacto === 'alto').length;
    const paisesActivos = CORREDOR.paises.filter(p => p.activo).map(p => p.nombre).join(', ');
    let texto = `Análisis Ejecutivo del Corredor Digital Multi-Continente. Este corredor está en plena operación con ${total} tareas distribuidas en 5 países: ${paisesActivos}. Hasta la fecha, se han completado ${completadas} tareas, representando el ${progreso} del total, con ${enProgreso} en progreso y ${criticas} críticas que requieren atención inmediata. `;
    if (riesgosAltos > 0) {
        texto += `Se han identificado ${riesgosAltos} riesgos de alto impacto, incluyendo retrasos aduaneros en Tánger y posibles huelgas portuarias en Algeciras. Se recomienda activar los planes de contingencia y mantener comunicación constante con los equipos locales en todos los países. `;
    } else {
        texto += `Los riesgos están bajo control. El equipo ha demostrado una gestión proactiva de las contingencias. `;
    }
    texto += `La eficiencia general del corredor es del ${CORREDOR.metricas.costEfficiency} con un tiempo de tránsito promedio de ${CORREDOR.metricas.avgTransitTime} días. La satisfacción del cliente se mantiene en ${CORREDOR.metricas.customerSatisfaction} de 5. Se recomienda mantener el ritmo actual y fortalecer la colaboración con los socios locales en Reino Unido, España, Marruecos, Estados Unidos y México para asegurar el éxito del proyecto.`;
    return texto;
}

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
            btn.textContent = '️ Pausar';
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
    // REPORTE PDF - CORREGIDO: SIN PÁGINAS VACÍAS
    // ============================================================
    function generarReportePDF() {
        const btn = document.getElementById('zackyPdfBtn');
        if (!btn) { console.error('Botón PDF no encontrado'); return; }
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

                const drawHeaderLine = (yPos) => { doc.setDrawColor(212, 175, 55); doc.setLineWidth(0.8); doc.line(margin, yPos, pageWidth - margin, yPos); };
                const drawThinLine = (yPos) => { doc.setDrawColor(60, 60, 80); doc.setLineWidth(0.3); doc.line(margin, yPos, pageWidth - margin, yPos); };
                const addPageBackground = () => { doc.setFillColor(10, 12, 20); doc.rect(0, 0, pageWidth, pageHeight, 'F'); };
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
                const addJustifiedText = (text, fontSize = 9, color = [180, 180, 200]) => {
                    doc.setFontSize(fontSize);
                    doc.setTextColor(color[0], color[1], color[2]);
                    doc.setFont('helvetica', 'normal');
                    const words = text.split(' ');
                    let line = '';
                    const lineHeight = fontSize * 0.5;
                    for (let i = 0; i < words.length; i++) {
                        const testLine = line + words[i] + ' ';
                        const testWidth = doc.getTextWidth(testLine);
                        if (testWidth > maxWidth - 6 && line !== '') {
                            if (y > pageHeight - 15) { doc.addPage(); y = 15; addPageBackground(); }
                            doc.text(line.trim(), margin + 3, y);
                            line = words[i] + ' ';
                            y += lineHeight;
                        } else { line = testLine; }
                    }
                    if (line.trim() !== '') {
                        if (y > pageHeight - 15) { doc.addPage(); y = 15; addPageBackground(); }
                        doc.text(line.trim(), margin + 3, y);
                        y += lineHeight;
                    }
                    y += 2;
                };
                const drawTableHeader = (headers, colWidths, startY) => {
                    doc.setFillColor(30, 35, 50);
                    doc.rect(margin, startY - 4, maxWidth, 7, 'F');
                    doc.setTextColor(212, 175, 55);
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(8);
                    let xPos = margin + 2;
                    headers.forEach((header, i) => { doc.text(header, xPos, startY); xPos += colWidths[i]; });
                    drawThinLine(startY + 4);
                    return startY + 6;
                };
                const drawTableRow = (data, colWidths, startY, isEven = false) => {
                    if (isEven) { doc.setFillColor(18, 20, 30); doc.rect(margin, startY - 3, maxWidth, 12, 'F'); }
                    doc.setTextColor(200, 200, 210);
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(7.5);
                    let xPos = margin + 2;
                    data.forEach((cell, i) => { doc.text(cell, xPos, startY); xPos += colWidths[i]; });
                    drawThinLine(startY + 6);
                    return startY + 12;
                };
                const drawProgressBar = (percentage, xPos, yPos, width = 20) => {
                    const height = 3;
                    doc.setFillColor(40, 45, 60);
                    doc.rect(xPos, yPos - 2, width, height, 'F');
                    const barColor = percentage >= 75 ? [16, 185, 129] : percentage >= 50 ? [245, 158, 11] : [239, 68, 68];
                    doc.setFillColor(barColor[0], barColor[1], barColor[2]);
                    doc.rect(xPos, yPos - 2, (width * percentage) / 100, height, 'F');
                    doc.setTextColor(200, 200, 210);
                    doc.setFontSize(7);
                    doc.text(percentage + '%', xPos + width + 2, yPos);
                };
                const drawStatusBadge = (status, xPos, yPos) => {
                    const statusColors = { 'completed': [16, 185, 129], 'inProgress': [245, 158, 11], 'pending': [59, 130, 246] };
                    const statusText = { 'completed': 'Completada', 'inProgress': 'En Progreso', 'pending': 'Pendiente' };
                    const color = statusColors[status] || [150, 150, 150];
                    doc.setFillColor(color[0], color[1], color[2]);
                    doc.roundedRect(xPos, yPos - 3, 14, 5, 1, 1, 'F');
                    doc.setTextColor(255, 255, 255);
                    doc.setFontSize(6);
                    doc.setFont('helvetica', 'bold');
                    doc.text(statusText[status] || status, xPos + 1, yPos);
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
                doc.text('REPORTE EJECUTIVO', pageWidth / 2, 42, { align: 'center' });
                doc.setTextColor(200, 200, 210);
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(13);
                doc.text(CONFIG.CORRIDOR_NOMBRE, pageWidth / 2, 52, { align: 'center' });
                doc.setTextColor(150, 150, 170);
                doc.setFontSize(9);
                doc.text('Corredor Digital Multi-Continente | 5 Paises Activos', pageWidth / 2, 60, { align: 'center' });
                y = 78;

                // INFORMACION DEL REPORTE
                doc.setFillColor(25, 28, 42);
                doc.rect(margin, y, maxWidth, 32, 'F');
                doc.setTextColor(212, 175, 55);
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(10);
                doc.text('INFORMACION DEL REPORTE', margin + 5, y + 6);
                doc.setTextColor(180, 180, 200);
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(8);
                const infoData = [
                    ['Fecha de generacion:', new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })],
                    ['ID del Corredor:', CONFIG.CORRIDOR_ID],
                    ['Paises participantes:', 'Reino Unido, Espana, Marruecos, Estados Unidos, Mexico'],
                    ['Preparado para:', 'Vicepresidencia Internacional'],
                    ['Clasificacion:', 'Confidencial - Uso Interno']
                ];
                let infoY = y + 12;
                const labelWidth = 55;
                const valueStartX = margin + 5 + labelWidth;
                const valueMaxWidth = maxWidth - labelWidth - 10;
                infoData.forEach(([label, value]) => {
                    doc.setTextColor(150, 150, 170);
                    doc.text(label, margin + 5, infoY);
                    doc.setTextColor(220, 220, 230);
                    doc.setFont('helvetica', 'bold');
                    const valueLines = doc.splitTextToSize(value, valueMaxWidth);
                    doc.text(valueLines, valueStartX, infoY);
                    doc.setFont('helvetica', 'normal');
                    infoY += 4.5 * valueLines.length;
                });
                y += 38;

                // METRICAS CLAVE
                addSectionHeader('METRICAS CLAVE DEL CORREDOR', 'Resumen ejecutivo de indicadores principales');
                const kpis = [
                    { label: 'Total de Tareas', value: CORREDOR.etapas.length.toString(), color: [139, 92, 246] },
                    { label: 'Tareas Completadas', value: CORREDOR.etapas.filter(e => e.estado === 'completed').length.toString(), color: [16, 185, 129] },
                    { label: 'Progreso General', value: Math.round((CORREDOR.etapas.filter(e => e.estado === 'completed').length / CORREDOR.etapas.length) * 100) + '%', color: [245, 158, 11] },
                    { label: 'En Progreso', value: CORREDOR.etapas.filter(e => e.estado === 'inProgress').length.toString(), color: [59, 130, 246] },
                    { label: 'Tareas Criticas', value: CORREDOR.etapas.filter(e => e.prioridad === 'critica').length.toString(), color: [239, 68, 68] },
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

                // PAISES
                addSectionHeader('PAISES DEL CORREDOR DIGITAL', 'Distribucion geografica y estado de operaciones');
                const paisesHeaders = ['Codigo', 'Pais', 'Continente', 'Hitos', 'Tareas', 'Completadas', 'Progreso', 'Estado'];
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
                addSectionHeader('ANALISIS DE VALOR GANADO (EVM)', 'Metricas de desempeno del proyecto');
                const evm = EVM_DATA;
                const evmHeaders = ['Metrica', 'Valor', 'Descripcion', 'Estado'];
                const evmColWidths = [30, 40, 80, 50];
                tableY = drawTableHeader(evmHeaders, evmColWidths, y);
                const evmData = [
                    ['BAC', evm.BAC + ' horas', 'Presupuesto al completar', 'Base'],
                    ['PV', evm.PV + ' horas', 'Valor planificado', 'Objetivo'],
                    ['EV', evm.EV + ' horas', 'Valor ganado', 'Progreso real'],
                    ['AC', evm.AC + ' horas', 'Costo actual', 'Inversion'],
                    ['SPI', evm.SPI.toFixed(2), evm.SPI >= 1 ? 'Adelantado al cronograma' : 'Retraso en cronograma', evm.SPI >= 1 ? 'Favorable' : 'Atencion'],
                    ['CPI', evm.CPI.toFixed(2), evm.CPI >= 1 ? 'Eficiente en costos' : 'Sobrecosto', evm.CPI >= 1 ? 'Favorable' : 'Alerta'],
                    ['EAC', evm.EAC.toFixed(1) + ' horas', 'Estimado al completar', 'Proyeccion'],
                    ['ETC', evm.ETC.toFixed(1) + ' horas', 'Estimado por completar', 'Restante'],
                    ['VAC', (evm.VAC >= 0 ? '+' : '') + evm.VAC.toFixed(1) + ' horas', evm.VAC >= 0 ? 'Ahorro proyectado' : 'Sobrecosto proyectado', evm.VAC >= 0 ? 'Favorable' : 'Atencion'],
                    ['CV', (evm.CV >= 0 ? '+' : '') + evm.CV.toFixed(1) + ' horas', 'Variacion de costo', 'Diferencia'],
                    ['SV', (evm.SV >= 0 ? '+' : '') + evm.SV.toFixed(1) + ' horas', 'Variacion de cronograma', 'Diferencia']
                ];
                evmData.forEach((row, i) => { tableY = drawTableRow(row, evmColWidths, tableY, i % 2 === 0); });
                y = tableY + 5;

                // ETAPAS
                addSectionHeader('DETALLE DE ETAPAS Y TAREAS', 'Seguimiento individual de actividades por pais');
                const etapasHeaders = ['ID', 'Tarea', 'Pais', 'Responsable', 'Estado', 'Progreso', 'Duracion', 'Retraso'];
                const etapasColWidths = [8, 45, 28, 32, 25, 32, 20, 15];
                tableY = drawTableHeader(etapasHeaders, etapasColWidths, y);
                CORREDOR.etapas.forEach((etapa, i) => {
                    const pais = CORREDOR.paises.find(p => p.id === etapa.pais);
                    const retraso = etapa.retraso || 0;
                    const rowStartY = tableY;
                    const data = [etapa.id, etapa.nombre.substring(0, 16), pais ? pais.nombre.substring(0, 12) : etapa.pais, etapa.responsable.substring(0, 12), etapa.estado, etapa.progress + '%', (etapa.duracionEstimada * 4) + 'h', retraso > 0 ? retraso + 'd' : 'Ninguno'];
                    tableY = drawTableRow(data, etapasColWidths, tableY, i % 2 === 0);
                    const rowCenterY = rowStartY + 3.5;
                    drawStatusBadge(etapa.estado, margin + 132, rowCenterY);
                    drawProgressBar(etapa.progress, margin + 160, rowCenterY, 18);
                    drawProgressBar(etapa.progress, margin + 190, rowCenterY, 14);
                });
                y = tableY + 5;

                // ============================================================
                // GRÁFICAS - CORRECCIÓN DEFINITIVA: SOLO PÁGINAS CON CONTENIDO
                // ============================================================
                const charts = [
                    { id: 'zackyChartDist', title: 'Distribucion de Tareas por Estado' },
                    { id: 'zackyChartEVM', title: 'EVM: PV vs EV vs AC' },
                    { id: 'zackyChartBurndown', title: 'Burndown: Progreso vs Ideal' },
                    { id: 'zackyChartPaises', title: 'Rendimiento por Pais' }
                ];

                const chartImages = [];
                charts.forEach(ch => {
                    const canvas = document.getElementById(ch.id);
                    if (canvas && canvas.toDataURL) {
                        try {
                            const dataUrl = canvas.toDataURL('image/png');
                            if (dataUrl && dataUrl.length > 1000) { // filtro de imagen válida
                                chartImages.push({ img: dataUrl, title: ch.title });
                            }
                        } catch(e) { /* ignorar */ }
                    }
                });

                // Solo si hay imágenes válidas
                if (chartImages.length > 0) {
                    // Datos de tablas auxiliares (copiados de antes)
                    const chartValues = [
                        {
                            headers: ['Categoria', 'Cant', '%'],
                            colWidths: [50, 25, 25],
                            data: [
                                ['Completadas', CORREDOR.etapas.filter(e=>e.estado==='completed').length.toString(), Math.round((CORREDOR.etapas.filter(e=>e.estado==='completed').length/CORREDOR.etapas.length)*100)+'%'],
                                ['En Progreso', CORREDOR.etapas.filter(e=>e.estado==='inProgress').length.toString(), Math.round((CORREDOR.etapas.filter(e=>e.estado==='inProgress').length/CORREDOR.etapas.length)*100)+'%'],
                                ['Pendientes', CORREDOR.etapas.filter(e=>e.estado==='pending').length.toString(), Math.round((CORREDOR.etapas.filter(e=>e.estado==='pending').length/CORREDOR.etapas.length)*100)+'%'],
                                ['Criticas', CORREDOR.etapas.filter(e=>e.prioridad==='critica').length.toString(), Math.round((CORREDOR.etapas.filter(e=>e.prioridad==='critica').length/CORREDOR.etapas.length)*100)+'%']
                            ]
                        },
                        {
                            headers: ['Metrica', 'Valor', 'Descripcion'],
                            colWidths: [25, 30, 45],
                            data: [
                                ['PV', EVM_DATA.PV + 'h', 'Valor Planificado'],
                                ['EV', EVM_DATA.EV + 'h', 'Valor Ganado'],
                                ['AC', EVM_DATA.AC + 'h', 'Costo Actual']
                            ]
                        },
                        {
                            headers: ['Periodo', 'Ideal', 'Real'],
                            colWidths: [30, 35, 35],
                            data: [
                                ['Inicio', EVM_DATA.BAC + 'h', EVM_DATA.BAC + 'h'],
                                ['Sem 1', Math.round(EVM_DATA.BAC*0.75) + 'h', Math.round(EVM_DATA.BAC*0.7) + 'h'],
                                ['Sem 2', Math.round(EVM_DATA.BAC*0.5) + 'h', Math.round(EVM_DATA.BAC*0.55) + 'h'],
                                ['Sem 3', Math.round(EVM_DATA.BAC*0.25) + 'h', Math.round(EVM_DATA.BAC*0.4) + 'h'],
                                ['Actual', '0h', (EVM_DATA.BAC - EVM_DATA.EV) + 'h']
                            ]
                        },
                        {
                            headers: ['Pais', 'Completadas', 'Eficiencia'],
                            colWidths: [50, 25, 25],
                            data: CORREDOR.paises.filter(p=>p.activo).map(p => {
                                const tp = CORREDOR.etapas.filter(e=>e.pais===p.id);
                                const cp = tp.filter(e=>e.estado==='completed').length;
                                const ef = tp.length>0 ? Math.round((cp/tp.length)*100) : 0;
                                return [p.nombre, cp.toString(), ef+'%'];
                            })
                        }
                    ];

                    let firstPageDone = false;
                    for (let i = 0; i < chartImages.length; i += 2) {
                        const chunk = chartImages.slice(i, i + 2);
                        const chunkValues = chartValues.slice(i, i + 2);
                        const chartWidth = (maxWidth - 15) / 2;
                        const chartHeight = chartWidth * 0.65;
                        const containerHeight = chartHeight + 25;
                        const maxTableRows = Math.max(...chunkValues.map(cv => cv.data.length));
                        const tableHeight = 10 + (maxTableRows * 7) + 5;
                        const totalBlockHeight = containerHeight + tableHeight + 15;

                        // Si no cabe o es la primera página, creamos una nueva con título
                        if (!firstPageDone || y + totalBlockHeight > pageHeight - 15) {
                            if (firstPageDone) {
                                doc.addPage();
                            }
                            y = 15;
                            addPageBackground();
                            addSectionHeader('GRAFICAS DE DESEMPEÑO', 'Visualizacion de metricas clave');
                            firstPageDone = true;
                        }

                        // Dibujar gráficas
                        chunk.forEach((chart, idx) => {
                            const xPos = margin + idx * (chartWidth + 15);
                            doc.setFillColor(25, 28, 42);
                            doc.roundedRect(xPos, y, chartWidth, containerHeight, 2, 2, 'F');
                            doc.setDrawColor(212, 175, 55);
                            doc.setLineWidth(0.5);
                            doc.roundedRect(xPos, y, chartWidth, containerHeight, 2, 2, 'S');
                            doc.setFillColor(15, 18, 30);
                            doc.roundedRect(xPos + 2, y + 2, chartWidth - 4, containerHeight - 4, 2, 2, 'F');
                            if (chart.img) {
                                const imgY = y + ((containerHeight - chartHeight) / 2);
                                doc.addImage(chart.img, 'PNG', xPos + 4, imgY, chartWidth - 8, chartHeight);
                            }
                            doc.setTextColor(212, 175, 55);
                            doc.setFont('helvetica', 'bold');
                            doc.setFontSize(8.5);
                            doc.text(chart.title, xPos + chartWidth / 2, y + containerHeight - 6, { align: 'center' });
                        });

                        // Tablas auxiliares debajo
                        chunkValues.forEach((cv, idx) => {
                            const xPos = margin + idx * (chartWidth + 15);
                            const tableY = y + containerHeight + 8;
                            // Header
                            doc.setFillColor(30, 35, 50);
                            doc.roundedRect(xPos, tableY, chartWidth, 6, 1, 1, 'F');
                            doc.setTextColor(212, 175, 55);
                            doc.setFont('helvetica', 'bold');
                            doc.setFontSize(7);
                            let xCell = xPos + 2;
                            cv.headers.forEach((h, hi) => { doc.text(h, xCell, tableY + 4); xCell += cv.colWidths[hi]; });
                            // Filas
                            let dataY = tableY + 8;
                            cv.data.forEach((row, ri) => {
                                if (ri % 2 === 0) { doc.setFillColor(18, 20, 30); doc.rect(xPos, dataY - 3, chartWidth, 6, 'F'); }
                                doc.setTextColor(200, 200, 210);
                                doc.setFont('helvetica', 'normal');
                                doc.setFontSize(7);
                                xCell = xPos + 2;
                                row.forEach((cell, ci) => { doc.text(cell, xCell, dataY); xCell += cv.colWidths[ci]; });
                                drawThinLine(dataY + 3);
                                dataY += 6;
                            });
                        });

                        y += totalBlockHeight;
                    }
                }

// Agregar secciones operativas de Usyncro
y = agregarSeccionesOperativasPDF(doc, y);



                // RIESGOS
                doc.addPage();
                y = 15;
                addPageBackground();
                addSectionHeader('RIESGOS IDENTIFICADOS', 'Analisis de riesgos y estrategias de mitigacion');
                CORREDOR.riesgos.forEach((riesgo, i) => {
                    if (y > pageHeight - 35) { doc.addPage(); y = 15; addPageBackground(); addSectionHeader('Riesgos Identificados (continuacion)'); }
                    doc.setFillColor(25, 28, 42);
                    doc.rect(margin, y, maxWidth, 24, 'F');
                    const impactoColor = riesgo.impacto === 'alto' ? [239, 68, 68] : riesgo.impacto === 'medio' ? [245, 158, 11] : [16, 185, 129];
                    doc.setFillColor(impactoColor[0], impactoColor[1], impactoColor[2]);
                    doc.rect(margin, y, 4, 24, 'F');
                    doc.setTextColor(212, 175, 55);
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(9);
                    doc.text(`${riesgo.id}. ${riesgo.descripcion}`, margin + 8, y + 5);
                    doc.setTextColor(180, 180, 200);
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(8);
                    doc.text(`Impacto: ${riesgo.impacto.toUpperCase()} | Probabilidad: ${riesgo.probabilidad.toUpperCase()}`, margin + 8, y + 11);
                    doc.setTextColor(150, 150, 170);
                    doc.text(`Mitigacion: ${riesgo.mitigacion}`, margin + 8, y + 18);
                    y += 27;
                });

                // SUGERENCIAS
                doc.addPage();
                y = 15;
                addPageBackground();
                addSectionHeader('SUGERENCIAS ESTRATEGICAS', 'Recomendaciones para optimizacion del corredor');
                CORREDOR.sugerencias.forEach((sugerencia, i) => {
                    if (y > pageHeight - 25) { doc.addPage(); y = 15; addPageBackground(); addSectionHeader('Sugerencias Estrategicas (continuacion)'); }
                    doc.setFillColor(25, 28, 42);
                    doc.rect(margin, y, maxWidth, 16, 'F');
                    const prioridadColor = sugerencia.prioridad === 'alta' ? [239, 68, 68] : [245, 158, 11];
                    doc.setFillColor(prioridadColor[0], prioridadColor[1], prioridadColor[2]);
                    doc.rect(margin, y, 4, 16, 'F');
                    doc.setTextColor(220, 220, 230);
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(8.5);
                    doc.text(`${sugerencia.id}. ${sugerencia.texto}`, margin + 8, y + 5);
                    doc.setTextColor(150, 150, 170);
                    doc.setFontSize(7.5);
                    doc.text(`Prioridad: ${sugerencia.prioridad.toUpperCase()}`, margin + 8, y + 11);
                    y += 19;
                });

                // ANALISIS EJECUTIVO
                doc.addPage();
                y = 15;
                addPageBackground();
                addSectionHeader('ANALISIS EJECUTIVO', 'Narrativa integral del estado del corredor');
                const storyText = generarStorytelling(CORREDOR.etapas, CORREDOR.riesgos, Math.round((CORREDOR.etapas.filter(e => e.estado === 'completed').length / CORREDOR.etapas.length) * 100));
                const cleanStory = storyText.replace(/[^\w\sáéíóúñÑ.,:;()\-]/g, '').trim();
                addJustifiedText(cleanStory, 9.5, [200, 200, 210]);

                // PIE DE PAGINA
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
                    doc.text('Zacky + Usyncro | Corredor Digital Multi-Continente', margin, pageHeight - 6);
                    doc.setTextColor(212, 175, 55);
                    doc.text(new Date().toLocaleDateString('es-ES'), pageWidth / 2, pageHeight - 6, { align: 'center' });
                    doc.setTextColor(150, 150, 170);
                    doc.text(`Pagina ${i} de ${totalPages}`, pageWidth - margin, pageHeight - 6, { align: 'right' });
                }

                doc.save(`Reporte_Ejecutivo_Corredor_Digital_${new Date().toISOString().split('T')[0]}.pdf`);
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
    // INICIALIZACIÓN
    // ============================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', crearBotonFlotante);
    } else {
        crearBotonFlotante();
    }

    window.abrirCorredorDigital = abrirCorredorDigital;
    console.log('🗺️ Corredor Digital Premium v4.1.3 cargado - SIN PÁGINAS VACÍAS');
})();

// ============================================================
// 🚢 SECCIONES OPERATIVAS - USYNCRO (sin modificar el demo actual)
// ============================================================
function agregarSeccionesOperativas() {
    const body = document.getElementById('zackyCorredorBody');
    if (!body) return;

    // --- Datos operativos simulados (coherentes con el corredor) ---
    const envios = [
        { id: 'US-2026-001', origen: 'Londres (UK)', destino: 'Nueva York (US)', estado: 'En tránsito', fechaEst: '2026-08-28', hash: '0x7f3a...b9e2', documento: 'BL-UK-001' },
        { id: 'US-2026-002', origen: 'Algeciras (ES)', destino: 'Tánger (MA)', estado: 'En aduana', fechaEst: '2026-08-26', hash: '0x2c4d...a1f8', documento: 'Factura-ES-002' },
        { id: 'US-2026-003', origen: 'Casablanca (MA)', destino: 'CDMX (MX)', estado: 'Retrasado', fechaEst: '2026-08-30', hash: '0x8e5b...c3d0', documento: 'BL-MA-003' },
        { id: 'US-2026-004', origen: 'Houston (US)', destino: 'Monterrey (MX)', estado: 'Entregado', fechaEst: '2026-08-24', hash: '0x1a2b...4e5f', documento: 'Factura-US-004' },
        { id: 'US-2026-005', origen: 'Barcelona (ES)', destino: 'Miami (US)', estado: 'En tránsito', fechaEst: '2026-08-29', hash: '0x9d0c...f7e1', documento: 'BL-ES-005' }
    ];

    const alertas = [
        { tipo: '(DI)', mensaje: 'Documentación incompleta en aduana de Tánger (Envío US-2026-002)', fecha: '2026-08-25 14:30' },
        { tipo: '(RS)', mensaje: 'Retraso en salida de Algeciras por condiciones climáticas (Envío US-2026-003)', fecha: '2026-08-24 09:15' },
        { tipo: '(VA)', mensaje: 'Validación aduanera completada en Nueva York (Envío US-2026-001)', fecha: '2026-08-23 18:00' },
        { tipo: '(RS)', mensaje: 'Nuevo requisito sanitario para importación en México (aplicable a partir del 01/09)', fecha: '2026-08-26 11:45' }
    ];

    const documentos = [
        { nombre: 'Factura proforma', envio: 'US-2026-001', estado: 'Validado', hash: '0xa1b2...c3d4' },
        { nombre: 'Conocimiento de embarque (BL)', envio: 'US-2026-002', estado: 'Pendiente firma', hash: '0xe5f6...g7h8' },
        { nombre: 'Certificado de origen', envio: 'US-2026-003', estado: 'Validado', hash: '0x9i0j...k1l2' },
        { nombre: 'Manifiesto de carga', envio: 'US-2026-004', estado: 'Archivado', hash: '0xm3n4...o5p6' }
    ];

    const actores = [
        { nombre: 'Agente de carga UK', pais: 'Reino Unido', contacto: 'logistics@uk.com', rol: 'Coordinación' },
        { nombre: 'Aduana España', pais: 'España', contacto: 'customs@es.com', rol: 'Validación' },
        { nombre: 'Naviera Transatlántica', pais: 'EE.UU.', contacto: 'shipping@us.com', rol: 'Transporte marítimo' },
        { nombre: 'Agente local MA', pais: 'Marruecos', contacto: 'agent@ma.com', rol: 'Distribución' },
        { nombre: 'Aduana México', pais: 'México', contacto: 'customs@mx.com', rol: 'Inspección' }
    ];

    // --- Construir HTML adicional ---
    let html = `
        <div style="margin-top: 40px; border-top: 2px solid rgba(139,92,246,0.2); padding-top: 20px;">
            <h2 style="color: #a78bfa; font-size: 22px; font-weight: 700; letter-spacing: -0.3px; margin-bottom: 20px;">
                🚢 Operaciones Logísticas · Usyncro
            </h2>
            <p style="color: #94a3b8; font-size: 14px; margin-bottom: 20px;">
                Trazabilidad en tiempo real, documentación digital y red de actores para el Corredor Multi-Continente.
            </p>
        </div>
    `;

    // --- KPIs Operativos ---
    const totalEnvios = envios.length;
    const entregados = envios.filter(e => e.estado === 'Entregado').length;
    const enTransito = envios.filter(e => e.estado === 'En tránsito').length;
    const retrasados = envios.filter(e => e.estado === 'Retrasado').length;
    const cumplimiento = totalEnvios > 0 ? Math.round((entregados / totalEnvios) * 100) : 0;

    html += `
        <div class="zacky-corredor-card" style="margin-bottom: 20px;">
            <div class="zacky-corredor-card-title"> KPIs Operativos</div>
            <div class="zacky-corredor-kpis">
                <div class="zacky-corredor-kpi"><div class="valor" style="color:#8b5cf6;">${totalEnvios}</div><div class="label">Total Envíos</div></div>
                <div class="zacky-corredor-kpi"><div class="valor" style="color:#10b981;">${entregados}</div><div class="label">✅ Entregados</div></div>
                <div class="zacky-corredor-kpi"><div class="valor" style="color:#3b82f6;">${enTransito}</div><div class="label">🚚 En Tránsito</div></div>
                <div class="zacky-corredor-kpi"><div class="valor" style="color:#ef4444;">${retrasados}</div><div class="label">⏰ Retrasados</div></div>
                <div class="zacky-corredor-kpi"><div class="valor" style="color:#f59e0b;">${cumplimiento}%</div><div class="label">📈 Cumplimiento</div></div>
                <div class="zacky-corredor-kpi"><div class="valor" style="color:#06b6d4;">3.2</div><div class="label">⏱️ Tiempo promedio (días)</div></div>
            </div>
        </div>
    `;

    // --- Tabla de Envíos ---
    html += `
        <div class="zacky-corredor-card" style="margin-bottom: 20px;">
            <div class="zacky-corredor-card-title"> Envíos Activos · Trazabilidad Blockchain</div>
            <div class="zacky-corredor-table-wrap">
                <table class="zacky-corredor-table">
                    <thead><tr><th>ID Envío</th><th>Origen</th><th>Destino</th><th>Estado</th><th>F. Estimada</th><th>Hash Blockchain</th><th>Documento</th></tr></thead>
                    <tbody>
                        ${envios.map(e => {
                            const estadoClase = e.estado === 'Entregado' ? 'badge-success' : e.estado === 'Retrasado' ? 'badge-danger' : 'badge-warning';
                            return `<tr>
                                <td><strong style="color:#8b5cf6;">${e.id}</strong></td>
                                <td>${e.origen}</td>
                                <td>${e.destino}</td>
                                <td><span class="zacky-corredor-badge ${estadoClase}">${e.estado}</span></td>
                                <td>${e.fechaEst}</td>
                                <td style="font-size:10px; color:#94a3b8; font-family: monospace;">${e.hash}</td>
                                <td><span style="color:#f59e0b;">📄 ${e.documento}</span></td>
                            </tr>`;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    // --- Alertas Automáticas ---
    html += `
        <div class="zacky-corredor-card" style="margin-bottom: 20px;">
            <div class="zacky-corredor-card-title"> Alertas Automáticas · Tiempo Real</div>
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

    // --- Documentos Digitales ---
    html += `
        <div class="zacky-corredor-card" style="margin-bottom: 20px;">
            <div class="zacky-corredor-card-title">📄 Documentos Digitales · Verificación Blockchain</div>
            <div class="zacky-corredor-table-wrap">
                <table class="zacky-corredor-table">
                    <thead><tr><th>Documento</th><th>Envío Asociado</th><th>Estado</th><th>Hash</th></tr></thead>
                    <tbody>
                        ${documentos.map(d => `
                            <tr>
                                <td><strong>${d.nombre}</strong></td>
                                <td>${d.envio}</td>
                                <td><span class="zacky-corredor-badge ${d.estado === 'Validado' ? 'badge-success' : d.estado === 'Archivado' ? 'badge-info' : 'badge-warning'}">${d.estado}</span></td>
                                <td style="font-size:10px; color:#94a3b8; font-family: monospace;">${d.hash}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    // --- Red de Actores ---
    html += `
        <div class="zacky-corredor-card" style="margin-bottom: 20px;">
            <div class="zacky-corredor-card-title">🤝 Red de Actores del Corredor</div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px,1fr)); gap: 12px;">
                ${actores.map(a => `
                    <div style="background: rgba(0,0,0,0.2); border-radius: 12px; padding: 12px; border: 1px solid rgba(255,255,255,0.05);">
                        <div style="font-weight: 600; color: #e2e8f0; font-size: 14px;">${a.nombre}</div>
                        <div style="font-size: 11px; color: #94a3b8;">${a.pais} · ${a.rol}</div>
                        <div style="font-size: 10px; color: #64748b; margin-top: 4px;">📧 ${a.contacto}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Inyectar el HTML al final del body
    body.insertAdjacentHTML('beforeend', html);
}


// ============================================================
// 🚢 GENERAR SECCIONES OPERATIVAS EN PDF (USYNCRO)
// ============================================================
function agregarSeccionesOperativasPDF(doc, y) {
    // Definir variables necesarias (se pasan como parámetros)
    const margin = 12;
    const pageWidth = 297;
    const pageHeight = 210;
    const maxWidth = pageWidth - 2 * margin;

    // Funciones auxiliares (copiadas del contexto de generarReportePDF)
    const addPageBackground = () => {
        doc.setFillColor(10, 12, 20);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');
    };
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
        doc.setDrawColor(212, 175, 55);
        doc.setLineWidth(0.8);
        doc.line(margin, y + (subtitle ? 12 : 7), pageWidth - margin, y + (subtitle ? 12 : 7));
        y += (subtitle ? 16 : 11);
        return y;
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

    // --- Datos (igual que antes) ---
    const envios = [
        { id: 'US-2026-001', origen: 'Londres (UK)', destino: 'Nueva York (US)', estado: 'En tránsito', fechaEst: '2026-08-28', hash: '0x7f3a...b9e2', documento: 'BL-UK-001' },
        { id: 'US-2026-002', origen: 'Algeciras (ES)', destino: 'Tánger (MA)', estado: 'En aduana', fechaEst: '2026-08-26', hash: '0x2c4d...a1f8', documento: 'Factura-ES-002' },
        { id: 'US-2026-003', origen: 'Casablanca (MA)', destino: 'CDMX (MX)', estado: 'Retrasado', fechaEst: '2026-08-30', hash: '0x8e5b...c3d0', documento: 'BL-MA-003' },
        { id: 'US-2026-004', origen: 'Houston (US)', destino: 'Monterrey (MX)', estado: 'Entregado', fechaEst: '2026-08-24', hash: '0x1a2b...4e5f', documento: 'Factura-US-004' },
        { id: 'US-2026-005', origen: 'Barcelona (ES)', destino: 'Miami (US)', estado: 'En tránsito', fechaEst: '2026-08-29', hash: '0x9d0c...f7e1', documento: 'BL-ES-005' }
    ];

    const totalEnvios = envios.length;
    const entregados = envios.filter(e => e.estado === 'Entregado').length;
    const enTransito = envios.filter(e => e.estado === 'En tránsito').length;
    const retrasados = envios.filter(e => e.estado === 'Retrasado').length;
    const cumplimiento = totalEnvios > 0 ? Math.round((entregados / totalEnvios) * 100) : 0;

    // --- Página nueva ---
    doc.addPage();
    y = 15;
    addPageBackground();
    y = addSectionHeader('OPERACIONES LOGÍSTICAS · USYNCRO', 'Trazabilidad en tiempo real, documentación digital y red de actores');

    // --- KPIs Operativos ---
    doc.setFillColor(25, 28, 42);
    doc.rect(margin, y, maxWidth, 32, 'F');
    doc.setTextColor(212, 175, 55);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(' KPIs Operativos', margin + 5, y + 6);

    const kpisOperativos = [
        ['Total Envíos', totalEnvios.toString(), '#8b5cf6'],
        ['Entregados', entregados.toString(), '#10b981'],
        ['En Tránsito', enTransito.toString(), '#3b82f6'],
        ['Retrasados', retrasados.toString(), '#ef4444'],
        ['Cumplimiento', cumplimiento + '%', '#f59e0b'],
        ['Tiempo promedio', '3.2 días', '#06b6d4']
    ];

    const colsKpi = 3;
    const anchoKpi = maxWidth / colsKpi;
    const altoKpi = 16;
    kpisOperativos.forEach((kpi, i) => {
        const col = i % colsKpi;
        const row = Math.floor(i / colsKpi);
        const xPos = margin + col * anchoKpi;
        const yPos = y + 12 + row * (altoKpi + 4);
        doc.setFillColor(15, 18, 30);
        doc.rect(xPos, yPos, anchoKpi - 2, altoKpi, 'F');
        const color = kpi[2].replace('#', '');
        const r = parseInt(color.substr(0,2), 16);
        const g = parseInt(color.substr(2,2), 16);
        const b = parseInt(color.substr(4,2), 16);
        doc.setFillColor(r, g, b);
        doc.rect(xPos, yPos, 3, altoKpi, 'F');
        doc.setTextColor(150, 150, 170);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.text(kpi[0], xPos + 6, yPos + 5);
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text(kpi[1], xPos + 6, yPos + 13);
    });
    y += 12 + 2 * (altoKpi + 4) + 5;

    // --- Envíos Activos ---
    if (y > pageHeight - 40) { doc.addPage(); y = 15; addPageBackground(); }
    y = addSectionHeader(' Envíos Activos · Trazabilidad Blockchain', 'Estado y seguimiento de cada envío');
    const enviosHeaders = ['ID', 'Origen', 'Destino', 'Estado', 'F. Estimada', 'Hash', 'Documento'];
    const enviosColWidths = [20, 35, 35, 25, 25, 45, 35];
    let tableY = drawTableHeader(enviosHeaders, enviosColWidths, y);
    envios.forEach((envio, i) => {
        const data = [envio.id, envio.origen, envio.destino, envio.estado, envio.fechaEst, envio.hash, envio.documento];
        tableY = drawTableRow(data, enviosColWidths, tableY, i % 2 === 0);
    });
    y = tableY + 5;

    // --- Alertas Automáticas ---
    if (y > pageHeight - 40) { doc.addPage(); y = 15; addPageBackground(); }
    y = addSectionHeader(' Alertas Automáticas · Tiempo Real', 'Incidencias y notificaciones del sistema');
    const alertas = [
        { tipo: '(DI)', mensaje: 'Documentación incompleta en aduana de Tánger (Envío US-2026-002)', fecha: '2026-08-25 14:30' },
        { tipo: '(RS)', mensaje: 'Retraso en salida de Algeciras por condiciones climáticas (Envío US-2026-003)', fecha: '2026-08-24 09:15' },
        { tipo: '(VA)', mensaje: 'Validación aduanera completada en Nueva York (Envío US-2026-001)', fecha: '2026-08-23 18:00' },
        { tipo: '(RS)', mensaje: 'Nuevo requisito sanitario para importación en México (aplicable a partir del 01/09)', fecha: '2026-08-26 11:45' }
    ];
    alertas.forEach((alerta) => {
        if (y > pageHeight - 25) { doc.addPage(); y = 15; addPageBackground(); y = addSectionHeader('Alertas Automáticas (continuación)'); }
        doc.setFillColor(25, 28, 42);
        doc.rect(margin, y, maxWidth, 14, 'F');
        doc.setTextColor(212, 175, 55);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text(alerta.tipo + ' ' + alerta.mensaje.substring(0, 60) + (alerta.mensaje.length > 60 ? '...' : ''), margin + 5, y + 5);
        doc.setTextColor(150, 150, 170);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.text('📅 ' + alerta.fecha, margin + 5, y + 11);
        y += 17;
    });

    // --- Documentos Digitales ---
    if (y > pageHeight - 40) { doc.addPage(); y = 15; addPageBackground(); }
    y = addSectionHeader(' Documentos Digitales · Verificación Blockchain', 'Documentos vinculados a cada envío');
    const documentos = [
        { nombre: 'Factura proforma', envio: 'US-2026-001', estado: 'Validado', hash: '0xa1b2...c3d4' },
        { nombre: 'Conocimiento de embarque (BL)', envio: 'US-2026-002', estado: 'Pendiente firma', hash: '0xe5f6...g7h8' },
        { nombre: 'Certificado de origen', envio: 'US-2026-003', estado: 'Validado', hash: '0x9i0j...k1l2' },
        { nombre: 'Manifiesto de carga', envio: 'US-2026-004', estado: 'Archivado', hash: '0xm3n4...o5p6' }
    ];
    const docsHeaders = ['Documento', 'Envío', 'Estado', 'Hash'];
    const docsColWidths = [45, 30, 30, 55];
    tableY = drawTableHeader(docsHeaders, docsColWidths, y);
    documentos.forEach((doc, i) => {
        const data = [doc.nombre, doc.envio, doc.estado, doc.hash];
        tableY = drawTableRow(data, docsColWidths, tableY, i % 2 === 0);
    });
    y = tableY + 5;

    // --- Red de Actores ---
    if (y > pageHeight - 40) { doc.addPage(); y = 15; addPageBackground(); }
    y = addSectionHeader('🤝 Red de Actores del Corredor', 'Participantes clave y sus roles');
    const actores = [
        { nombre: 'Agente de carga UK', pais: 'Reino Unido', rol: 'Coordinación', contacto: 'logistics@uk.com' },
        { nombre: 'Aduana España', pais: 'España', rol: 'Validación', contacto: 'customs@es.com' },
        { nombre: 'Naviera Transatlántica', pais: 'EE.UU.', rol: 'Transporte marítimo', contacto: 'shipping@us.com' },
        { nombre: 'Agente local MA', pais: 'Marruecos', rol: 'Distribución', contacto: 'agent@ma.com' },
        { nombre: 'Aduana México', pais: 'México', rol: 'Inspección', contacto: 'customs@mx.com' }
    ];
    const actoresHeaders = ['Nombre', 'País', 'Rol', 'Contacto'];
    const actoresColWidths = [50, 40, 50, 60];
    tableY = drawTableHeader(actoresHeaders, actoresColWidths, y);
    actores.forEach((actor, i) => {
        const data = [actor.nombre, actor.pais, actor.rol, actor.contacto];
        tableY = drawTableRow(data, actoresColWidths, tableY, i % 2 === 0);
    });
    y = tableY + 5;

    // Asegurar espacio para la siguiente sección (riesgos)
    if (y > pageHeight - 30) {
        doc.addPage();
        y = 15;
        addPageBackground();
    }

    return y; // devolver la nueva posición y
}