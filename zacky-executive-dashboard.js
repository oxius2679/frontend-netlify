/**
 * ============================================================
 * ZACKY EXECUTIVE DASHBOARD · v2.0
 * The Jackson's Solutions · 2026
 * Dashboard de clase mundial para ejecutivos internacionales
 * ============================================================
 */

(function() {
    'use strict';

    // ============================================================
    // CONFIGURACIÓN
    // ============================================================
    const CONFIG = {
        containerId: 'zacky-executive-dashboard',
        title: 'Executive Command Center',
        subtitle: 'Usyncro + Zacky · Global Corridor Intelligence',
        version: 'v2.0 · 2026',
        mapCenter: [30, 0],
        mapZoom: 2,
        refreshInterval: 30000 // ms
    };

    // ============================================================
    // DATOS ESTRATÉGICOS
    // ============================================================
    const DATA = {
        corridors: [
            { id: 'uk-morocco', name: 'UK-Morocco', countries: ['UK', 'Morocco'], status: 'active', progress: 78, risk: 'medium' },
            { id: 'spain-europe', name: 'Spain-Europe', countries: ['Spain', 'Portugal', 'France'], status: 'completed', progress: 100, risk: 'low' },
            { id: 'mexico-latam', name: 'Mexico-LATAM', countries: ['Mexico', 'Colombia', 'Chile'], status: 'developing', progress: 42, risk: 'high' },
            { id: 'usa-east', name: 'USA East Coast', countries: ['USA', 'Canada'], status: 'developing', progress: 35, risk: 'medium' },
            { id: 'gulf-region', name: 'Gulf Region', countries: ['UAE', 'Saudi Arabia'], status: 'pending', progress: 12, risk: 'high' }
        ],
        metrics: {
            totalCorridors: 5,
            activeCorridors: 2,
            developingCorridors: 2,
            pendingCorridors: 1,
            completionRate: 78,
            co2Saved: 1240,
            paperReduction: 84,
            digitalFiles: 312,
            emissionsReduction: 26,
            budgetTotal: 2500000,
            budgetUsed: 1620000,
            teamTotal: 26,
            teamByRegion: { 'USA': 8, 'Europe': 12, 'LATAM': 6 }
        },
        timeline: [
            { quarter: 'Q4 2026', event: 'Miami Office Launch', status: 'active' },
            { quarter: 'Q1 2027', event: 'Mexico Expansion', status: 'upcoming' },
            { quarter: 'Q2 2027', event: 'Colombia & Chile', status: 'upcoming' },
            { quarter: 'Q3 2027', event: 'Full LATAM Operation', status: 'upcoming' },
            { quarter: 'Q4 2027', event: 'Global Corridor Network', status: 'upcoming' }
        ],
        milestones: [
            { country: '🇪🇸 Spain', corridor: 'Europe', status: 'completed', risk: 'low', date: '2026-08-15' },
            { country: '🇲🇦 Morocco', corridor: 'UK-Morocco', status: 'in_progress', risk: 'medium', date: '2026-09-30' },
            { country: '🇬🇧 UK', corridor: 'UK-Morocco', status: 'pending', risk: 'high', date: '2026-11-15' },
            { country: '🇲🇽 Mexico', corridor: 'LATAM', status: 'in_progress', risk: 'medium', date: '2026-12-10' },
            { country: '🇨🇴 Colombia', corridor: 'LATAM', status: 'pending', risk: 'medium', date: '2027-02-15' },
            { country: '🇨🇱 Chile', corridor: 'LATAM', status: 'pending', risk: 'low', date: '2027-04-01' },
            { country: '🇺🇸 USA', corridor: 'USA East', status: 'in_progress', risk: 'high', date: '2027-01-15' },
            { country: '🇦🇪 UAE', corridor: 'Gulf Region', status: 'pending', risk: 'high', date: '2027-06-01' }
        ],
        esgData: {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            co2Saved: [120, 180, 250, 340, 420, 540],
            paperReduction: [40, 55, 65, 72, 78, 84]
        },
        budgetData: {
            regions: ['USA', 'Europe', 'LATAM'],
            budget: [850, 650, 450],
            actual: [620, 480, 320]
        },
        teamData: {
            categories: ['Strategy', 'DevOps', 'Logistics', 'Legal', 'Sales', 'Finance'],
            current: [5, 3, 4, 2, 4, 3],
            required: [8, 6, 7, 4, 6, 5]
        },
        portfolioData: {
            labels: ['Execution', 'Planning', 'Closure', 'On Hold'],
            values: [42, 33, 18, 7]
        }
    };

    // ============================================================
    // ESTILOS EMBEBIDOS
    // ============================================================
    const STYLES = `
        /* Reset y base */
        .zacky-dash * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        .zacky-dash {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #070a14;
            color: #e8edf5;
            padding: 20px 24px;
            line-height: 1.5;
            min-height: 100vh;
            width: 100%;
            background-image: 
                radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 90% 80%, rgba(139, 92, 246, 0.06) 0%, transparent 50%);
        }
        .zacky-dash .container {
            max-width: 1500px;
            margin: 0 auto;
        }

        /* Efectos 3D */
        .zacky-dash .scene-3d {
            perspective: 1200px;
            transform-style: preserve-3d;
        }
        .zacky-dash .card-3d {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform-style: preserve-3d;
            will-change: transform;
            backface-visibility: hidden;
        }
        .zacky-dash .card-3d:hover {
            transform: rotateY(2deg) rotateX(2deg) scale(1.02) translateY(-6px);
            box-shadow: 0 25px 50px -8px rgba(99, 102, 241, 0.4), 0 0 0 1px rgba(99, 102, 241, 0.3);
        }
        .zacky-dash .glass-3d {
            background: rgba(20, 29, 51, 0.65);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.06);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        /* Animaciones */
        @keyframes zacky-float-3d {
            0% { transform: translateY(0px) rotateX(0deg); }
            50% { transform: translateY(-8px) rotateX(2deg); }
            100% { transform: translateY(0px) rotateX(0deg); }
        }
        @keyframes zacky-pulse-dot {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.3); }
            100% { opacity: 1; transform: scale(1); }
        }
        @keyframes zacky-slide-up {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .zacky-dash .float-3d {
            animation: zacky-float-3d 6s ease-in-out infinite;
        }
        .zacky-dash .slide-up {
            animation: zacky-slide-up 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        /* Header */
        .zacky-dash .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
            margin-bottom: 30px;
            padding: 18px 28px;
            background: rgba(11, 15, 26, 0.8);
            backdrop-filter: blur(16px);
            border-radius: 24px;
            border: 1px solid rgba(99, 102, 241, 0.15);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            transform-style: preserve-3d;
            perspective: 800px;
        }
        .zacky-dash .header-left {
            display: flex;
            align-items: center;
            gap: 20px;
        }
        .zacky-dash .logo-icon {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            width: 60px;
            height: 60px;
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            color: white;
            box-shadow: 0 10px 30px rgba(99, 102, 241, 0.5);
            transform: rotateY(-5deg) rotateX(5deg);
            transition: 0.3s;
        }
        .zacky-dash .logo-icon:hover {
            transform: rotateY(0deg) rotateX(0deg) scale(1.05);
        }
        .zacky-dash .header-left h1 {
            font-size: 26px;
            font-weight: 700;
            background: linear-gradient(135deg, #f8fafc, #a5b4fc);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -0.5px;
        }
        .zacky-dash .header-left .sub {
            font-size: 14px;
            color: #94a3b8;
            margin-top: 2px;
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
        }
        .zacky-dash .header-right {
            display: flex;
            align-items: center;
            gap: 16px;
            background: rgba(30, 41, 59, 0.4);
            padding: 8px 24px;
            border-radius: 60px;
            border: 1px solid rgba(99, 102, 241, 0.15);
            backdrop-filter: blur(8px);
        }
        .zacky-dash .badge {
            background: #10b981;
            color: white;
            font-size: 10px;
            font-weight: 700;
            padding: 4px 16px;
            border-radius: 40px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }
        .zacky-dash .badge-warning {
            background: #f59e0b;
            color: #0b1120;
        }
        .zacky-dash .live-dot {
            display: inline-block;
            width: 10px;
            height: 10px;
            background: #10b981;
            border-radius: 50%;
            box-shadow: 0 0 20px #10b981;
            animation: zacky-pulse-dot 2s infinite;
        }

        /* Secciones */
        .zacky-dash .section-title {
            display: flex;
            align-items: center;
            gap: 16px;
            margin: 40px 0 16px 0;
        }
        .zacky-dash .section-title h2 {
            font-size: 22px;
            font-weight: 700;
            background: linear-gradient(135deg, #f8fafc, #a5b4fc);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -0.3px;
        }
        .zacky-dash .section-title .line {
            flex: 1;
            height: 2px;
            background: linear-gradient(90deg, rgba(99, 102, 241, 0.3), transparent);
        }
        .zacky-dash .subtext {
            color: #94a3b8;
            font-size: 14px;
            margin-top: -4px;
            margin-bottom: 22px;
            padding-left: 4px;
            font-weight: 300;
        }

        /* Grids */
        .zacky-dash .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 30px; }
        .zacky-dash .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 30px; }
        .zacky-dash .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }

        /* Cards */
        .zacky-dash .card {
            background: linear-gradient(145deg, #141d33, #0f172a);
            border-radius: 24px;
            padding: 24px 22px;
            border: 1px solid rgba(99, 102, 241, 0.08);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform-style: preserve-3d;
            position: relative;
            overflow: hidden;
        }
        .zacky-dash .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.03), transparent 60%);
            pointer-events: none;
            z-index: 0;
        }
        .zacky-dash .card > * { position: relative; z-index: 1; }
        .zacky-dash .card:hover {
            transform: translateY(-6px) rotateX(2deg) rotateY(2deg) scale(1.01);
            border-color: rgba(99, 102, 241, 0.35);
            box-shadow: 0 25px 50px -8px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(99, 102, 241, 0.15);
        }
        .zacky-dash .card-header {
            display: flex;
            align-items: center;
            gap: 14px;
            margin-bottom: 16px;
        }
        .zacky-dash .card-header .icon {
            width: 44px;
            height: 44px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            flex-shrink: 0;
            background: rgba(99, 102, 241, 0.15);
            color: #a5b4fc;
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        .zacky-dash .card h3 {
            font-size: 17px;
            font-weight: 700;
            color: #f1f5f9;
        }
        .zacky-dash .card .tag {
            font-size: 10px;
            color: #94a3b8;
            background: rgba(255, 255, 255, 0.05);
            padding: 2px 14px;
            border-radius: 40px;
            display: inline-block;
            margin-bottom: 6px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .zacky-dash .card p { color: #cbd5e1; font-size: 13px; line-height: 1.6; }
        .zacky-dash .card ul { list-style: none; margin-top: 12px; }
        .zacky-dash .card ul li {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            font-size: 13px;
            color: #cbd5e1;
            padding: 8px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }
        .zacky-dash .card ul li i {
            color: #6366f1;
            font-size: 14px;
            margin-top: 3px;
            flex-shrink: 0;
        }

        /* KPIs */
        .zacky-dash .kpi-value {
            font-size: 38px;
            font-weight: 800;
            color: #f1f5f9;
            line-height: 1.1;
            background: linear-gradient(135deg, #f8fafc, #a5b4fc);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .zacky-dash .kpi-label {
            font-size: 11px;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            margin-top: 6px;
            font-weight: 600;
        }
        .zacky-dash .progress-bar-3d {
            height: 6px;
            background: #1e293b;
            border-radius: 10px;
            margin-top: 12px;
            overflow: hidden;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4);
        }
        .zacky-dash .progress-fill-3d {
            height: 100%;
            border-radius: 10px;
            background: linear-gradient(90deg, #6366f1, #8b5cf6);
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
            width: 0%;
        }

        /* Mapa */
        .zacky-dash #zacky-map {
            height: 280px;
            border-radius: 16px;
            border: 1px solid rgba(99, 102, 241, 0.1);
            margin-top: 8px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            transform: perspective(800px) rotateX(2deg);
            transition: 0.4s;
        }
        .zacky-dash #zacky-map:hover {
            transform: perspective(800px) rotateX(0deg) scale(1.01);
        }

        /* Tabla */
        .zacky-dash .table-wrap { overflow-x: auto; margin-top: 12px; }
        .zacky-dash table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .zacky-dash th {
            text-align: left;
            padding: 10px 12px;
            color: #94a3b8;
            font-weight: 600;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.5px;
        }
        .zacky-dash td {
            padding: 10px 12px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.03);
            color: #e2e8f0;
        }
        .zacky-dash .status-badge {
            padding: 3px 14px;
            border-radius: 40px;
            font-size: 11px;
            font-weight: 600;
            display: inline-block;
        }
        .zacky-dash .status-green { background: rgba(16,185,129,0.2); color: #34d399; }
        .zacky-dash .status-yellow { background: rgba(245,158,11,0.2); color: #fbbf24; }
        .zacky-dash .status-red { background: rgba(239,68,68,0.2); color: #f87171; }
        .zacky-dash .status-blue { background: rgba(59,130,246,0.2); color: #60a5fa; }

        /* Gráficos */
        .zacky-dash .chart-container { height: 210px; position: relative; margin-top: 10px; }
        .zacky-dash .chart-container-sm { height: 140px; position: relative; margin-top: 10px; }

        /* Value Box */
        .zacky-dash .value-box {
            margin-top: 16px;
            background: rgba(99, 102, 241, 0.06);
            padding: 12px 16px;
            border-radius: 12px;
            border-left: 4px solid #6366f1;
            backdrop-filter: blur(4px);
        }
        .zacky-dash .value-box span { color: #93c5fd; font-size: 13px; }
        .zacky-dash .value-box strong { color: #e2e8f0; }

        /* Footer */
        .zacky-dash .footer-note {
            margin-top: 40px;
            padding: 20px 0;
            border-top: 1px solid rgba(99, 102, 241, 0.08);
            text-align: center;
            color: #64748b;
            font-size: 13px;
        }
        .zacky-dash .footer-note strong { color: #a78bfa; }

        /* Responsive */
        @media (max-width: 1200px) { .zacky-dash .grid-4 { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 1024px) { .zacky-dash .grid-2 { grid-template-columns: 1fr; } }
        @media (max-width: 700px) {
            .zacky-dash .grid-4 { grid-template-columns: 1fr; }
            .zacky-dash .header { flex-direction: column; align-items: flex-start; }
            .zacky-dash .grid-3 { grid-template-columns: 1fr; }
        }
    `;

    // ============================================================
    // FUNCIONES PRINCIPALES
    // ============================================================

    function createDashboardHTML() {
        const m = DATA.metrics;
        return `
            <div class="zacky-dash" id="${CONFIG.containerId}">
                <div class="container">

                    <!-- HEADER -->
                    <div class="header scene-3d">
                        <div class="header-left">
                            <div class="logo-icon"><i class="fas fa-rocket"></i></div>
                            <div>
                                <h1>${CONFIG.title}</h1>
                                <div class="sub">
                                    <span><i class="fas fa-globe-americas" style="color:#6366f1;"></i> ${CONFIG.subtitle}</span>
                                    <span><span class="live-dot"></span> Live</span>
                                    <span><i class="far fa-calendar-alt"></i> ${new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>
                        <div class="header-right">
                            <span class="badge"><i class="fas fa-check-circle"></i> Strategic Alliance</span>
                            <span class="badge badge-warning"><i class="fas fa-lightbulb"></i> Usyncro</span>
                            <span style="color:#94a3b8; font-size:13px;"><i class="fas fa-user-tie"></i> Executive Command Center</span>
                        </div>
                    </div>

                    <!-- KPIs GLOBALES -->
                    <div class="grid-4 scene-3d">
                        <div class="card card-3d glass-3d" style="border-left:4px solid #6366f1;">
                            <div class="kpi-value">${m.completionRate}%</div>
                            <div class="kpi-label">Corridor Activation</div>
                            <div class="progress-bar-3d"><div class="progress-fill-3d" style="width:${m.completionRate}%;"></div></div>
                        </div>
                        <div class="card card-3d glass-3d" style="border-left:4px solid #10b981;">
                            <div class="kpi-value">${m.totalCorridors}</div>
                            <div class="kpi-label">Active Corridors</div>
                            <div style="margin-top:8px; font-size:14px; color:#34d399; font-weight:600;">${m.activeCorridors} active · ${m.developingCorridors} developing</div>
                        </div>
                        <div class="card card-3d glass-3d" style="border-left:4px solid #f59e0b;">
                            <div class="kpi-value">${m.co2Saved}</div>
                            <div class="kpi-label">kg CO₂ Saved</div>
                            <div style="margin-top:8px; font-size:14px; color:#fbbf24; font-weight:600;">${m.paperReduction}% Paper Reduction</div>
                        </div>
                        <div class="card card-3d glass-3d" style="border-left:4px solid #8b5cf6;">
                            <div class="kpi-value">${m.teamTotal}</div>
                            <div class="kpi-label">Team Members</div>
                            <div style="margin-top:8px; font-size:14px; color:#a78bfa; font-weight:600;">Global · 3 Regions</div>
                        </div>
                    </div>

                    <!-- SECCIÓN 1: MAPA Y CORREDORES -->
                    <div class="section-title">
                        <h2>🌍 1. Digital Corridors · Global Intelligence</h2>
                        <div class="line"></div>
                    </div>
                    <div class="subtext">Zacky como cuadro de mando ejecutivo para los corredores digitales de Usyncro</div>

                    <div class="grid-2 scene-3d">
                        <div class="card card-3d">
                            <div class="card-header">
                                <div class="icon"><i class="fas fa-globe-americas"></i></div>
                                <div><h3>Global Corridor Map</h3><span class="tag">${m.totalCorridors} corridors · 16 countries</span></div>
                            </div>
                            <div id="zacky-map"></div>
                            <div style="display:flex; gap:20px; margin-top:14px; flex-wrap:wrap; font-size:12px; color:#94a3b8;">
                                <span><span style="display:inline-block; width:12px; height:12px; background:#10b981; border-radius:50%;"></span> Active</span>
                                <span><span style="display:inline-block; width:12px; height:12px; background:#f59e0b; border-radius:50%;"></span> Developing</span>
                                <span><span style="display:inline-block; width:12px; height:12px; background:#ef4444; border-radius:50%;"></span> Pending</span>
                            </div>
                        </div>

                        <div class="card card-3d">
                            <div class="card-header">
                                <div class="icon"><i class="fas fa-chart-line"></i></div>
                                <div><h3>Corridor Performance · UK-Morocco</h3><span class="tag">SPI · Activation · Efficiency</span></div>
                            </div>
                            <div class="chart-container">
                                <canvas id="zacky-chart-corredor"></canvas>
                            </div>
                            <div class="value-box">
                                <span><i class="fas fa-gem"></i> <strong>Real-time visibility:</strong> SPI/CPI metrics for strategic decision making.</span>
                            </div>
                        </div>
                    </div>

                    <!-- Tabla de hitos -->
                    <div class="card card-3d" style="margin-bottom:30px;">
                        <div class="card-header">
                            <div class="icon"><i class="fas fa-flag-checkered"></i></div>
                            <div><h3>Project Milestones & Risk Matrix</h3><span class="tag">16 countries · ALACAT</span></div>
                        </div>
                        <div class="table-wrap">
                            <table>
                                <thead><tr><th>Country</th><th>Corridor</th><th>Status</th><th>Risk</th><th>Estimated Date</th></tr></thead>
                                <tbody>
                                    ${DATA.milestones.map(m => `
                                        <tr>
                                            <td>${m.country}</td>
                                            <td>${m.corridor}</td>
                                            <td><span class="status-badge status-${m.status === 'completed' ? 'green' : m.status === 'in_progress' ? 'blue' : 'yellow'}">${m.status === 'completed' ? 'Completed' : m.status === 'in_progress' ? 'In Progress' : 'Pending'}</span></td>
                                            <td style="color:${m.risk === 'high' ? '#f87171' : m.risk === 'medium' ? '#fbbf24' : '#94a3b8'};">${m.risk.charAt(0).toUpperCase() + m.risk.slice(1)}</td>
                                            <td>${new Date(m.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- SECCIÓN 2: PORTFOLIO Y TIMELINE -->
                    <div class="section-title">
                        <h2>📊 2. Project Portfolio · Strategic Initiatives</h2>
                        <div class="line"></div>
                    </div>
                    <div class="subtext">Distribución estratégica y estado de los proyectos de expansión y transformación digital</div>

                    <div class="grid-2 scene-3d">
                        <div class="card card-3d">
                            <div class="card-header">
                                <div class="icon"><i class="fas fa-chart-pie"></i></div>
                                <div><h3>Portfolio Distribution</h3><span class="tag">Execution · Planning · Closure</span></div>
                            </div>
                            <div class="chart-container">
                                <canvas id="zacky-chart-portfolio"></canvas>
                            </div>
                            <div style="display:flex; justify-content:center; gap:15px; margin-top:8px; font-size:11px; color:#94a3b8; flex-wrap:wrap;">
                                ${DATA.portfolioData.labels.map((l, i) => `
                                    <span><span style="display:inline-block; width:10px; height:10px; background:${['#3b82f6','#f59e0b','#10b981','#94a3b8'][i]}; border-radius:4px;"></span> ${l} (${DATA.portfolioData.values[i]}%)</span>
                                `).join('')}
                            </div>
                        </div>
                        <div class="card card-3d">
                            <div class="card-header">
                                <div class="icon"><i class="fas fa-timeline"></i></div>
                                <div><h3>Strategic Timeline · 2026-2027</h3><span class="tag">Roadmap · Key Milestones</span></div>
                            </div>
                            <div style="display:flex; flex-direction:column; gap:10px; margin-top:8px;">
                                ${DATA.timeline.map((t, i) => `
                                    <div style="display:flex; align-items:center; gap:12px; background:rgba(${i === 0 ? '59,130,246' : '255,255,255'},0.06); padding:10px 14px; border-radius:12px; border-left:4px solid ${i === 0 ? '#3b82f6' : '#334155'};">
                                        <span style="font-size:12px; color:${i === 0 ? '#60a5fa' : '#94a3b8'}; font-weight:600; min-width:60px;">${t.quarter}</span>
                                        <span style="font-size:13px; color:${i === 0 ? '#e2e8f0' : '#94a3b8'};">${t.event}</span>
                                        ${i === 0 ? '<span style="margin-left:auto; font-size:10px; background:#10b981; color:white; padding:2px 10px; border-radius:20px;">Active</span>' : ''}
                                    </div>
                                `).join('')}
                            </div>
                            <div class="value-box" style="margin-top:12px;">
                                <span><i class="fas fa-gem"></i> <strong>Valor:</strong> Visibilidad ejecutiva del roadmap global de expansión.</span>
                            </div>
                        </div>
                    </div>

                    <!-- SECCIÓN 3: ESG -->
                    <div class="section-title">
                        <h2>🌱 3. ESG Impact Measurement</h2>
                        <div class="line"></div>
                    </div>
                    <div class="subtext">Sostenibilidad · Reporting · ODS13</div>

                    <div class="grid-2 scene-3d">
                        <div class="card card-3d">
                            <div class="card-header">
                                <div class="icon" style="background:rgba(139,92,246,0.15); color:#a78bfa;"><i class="fas fa-leaf"></i></div>
                                <div><h3>ESG Key Indicators</h3></div>
                            </div>
                            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:8px;">
                                <div><div class="kpi-value" style="font-size:30px; color:#34d399;">${m.co2Saved}</div><div class="kpi-label">kg CO₂ saved</div></div>
                                <div><div class="kpi-value" style="font-size:30px; color:#60a5fa;">${m.paperReduction}%</div><div class="kpi-label">Paper eliminated</div></div>
                                <div><div class="kpi-value" style="font-size:30px; color:#fbbf24;">${m.digitalFiles}</div><div class="kpi-label">Digital files</div></div>
                                <div><div class="kpi-value" style="font-size:30px; color:#a78bfa;">${m.emissionsReduction}%</div><div class="kpi-label">Emissions reduction</div></div>
                            </div>
                            <div class="chart-container-sm"><canvas id="zacky-chart-esg"></canvas></div>
                        </div>
                        <div class="card card-3d">
                            <div class="card-header">
                                <div class="icon" style="background:rgba(139,92,246,0.15); color:#a78bfa;"><i class="fas fa-file-alt"></i></div>
                                <div><h3>Executive ESG Reporting</h3></div>
                            </div>
                            <ul>
                                <li><i class="fas fa-chevron-right"></i> Executive summary for investors</li>
                                <li><i class="fas fa-chevron-right"></i> Monthly evolution charts</li>
                                <li><i class="fas fa-chevron-right"></i> ODS13 & ODS8 alignment</li>
                                <li><i class="fas fa-chevron-right"></i> One-click PDF export</li>
                            </ul>
                            <div class="value-box"><span><i class="fas fa-gem"></i> <strong>Valor:</strong> Zacky como <strong>herramienta de reporting ESG</strong></span></div>
                        </div>
                    </div>

                    <!-- SECCIÓN 4: FINANZAS Y RECURSOS -->
                    <div class="section-title">
                        <h2>💰 4. Financial Health & Resource Allocation</h2>
                        <div class="line"></div>
                    </div>
                    <div class="subtext">Control de presupuesto · EVM · Eficiencia del equipo</div>

                    <div class="grid-2 scene-3d">
                        <div class="card card-3d">
                            <div class="card-header">
                                <div class="icon" style="background:rgba(245,158,11,0.15); color:#fbbf24;"><i class="fas fa-coins"></i></div>
                                <div><h3>Budget vs Actual (€K)</h3><span class="tag">Multicurrency · Real-time</span></div>
                            </div>
                            <div class="chart-container">
                                <canvas id="zacky-chart-budget"></canvas>
                            </div>
                            <div class="value-box">
                                <span><i class="fas fa-gem"></i> <strong>Valor:</strong> Control presupuestario avanzado para la expansión internacional.</span>
                            </div>
                        </div>
                        <div class="card card-3d">
                            <div class="card-header">
                                <div class="icon" style="background:rgba(59,130,246,0.15); color:#60a5fa;"><i class="fas fa-users"></i></div>
                                <div><h3>Team Capacity & Gaps</h3><span class="tag">Current vs Required</span></div>
                            </div>
                            <div class="chart-container">
                                <canvas id="zacky-chart-team"></canvas>
                            </div>
                            <div style="display:flex; justify-content:space-between; margin-top:12px; font-size:12px; color:#94a3b8; flex-wrap:wrap;">
                                <span>👥 <strong style="color:#e2e8f0;">${m.teamByRegion.USA}</strong> USA</span>
                                <span>👥 <strong style="color:#e2e8f0;">${m.teamByRegion.Europe}</strong> Europe</span>
                                <span>👥 <strong style="color:#e2e8f0;">${m.teamByRegion.LATAM}</strong> LATAM</span>
                                <span>📊 <strong style="color:#e2e8f0;">${m.teamTotal}</strong> Total</span>
                            </div>
                        </div>
                    </div>

                    <!-- FOOTER -->
                    <div class="footer-note">
                        <strong>Zacky Gantt Executive Pro</strong> · The Jackson's Solutions · <i class="fas fa-rocket" style="color:#6366f1;"></i> IA + EVM híbrido + Control de proyectos en tiempo real
                        <br><span style="font-size:12px;">Executive Command Center · ${CONFIG.version} · ${new Date().toLocaleString('es-ES')}</span>
                    </div>

                </div>
            </div>
        `;
    }

    // ============================================================
    // INICIALIZACIÓN DE GRÁFICOS
    // ============================================================
    function initCharts() {
        // 1. Corredor
        const ctx1 = document.getElementById('zacky-chart-corredor');
        if (ctx1) {
            new Chart(ctx1.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
                    datasets: [
                        { label: 'Activation %', data: [20, 35, 50, 65, 72, 78], borderColor: '#60a5fa', tension: 0.3, pointBackgroundColor: '#60a5fa', borderWidth: 3 },
                        { label: 'Efficiency (SPI)', data: [0.80, 0.85, 0.90, 0.95, 0.98, 1.02], borderColor: '#34d399', tension: 0.3, borderDash: [5, 5], pointBackgroundColor: '#34d399', borderWidth: 2 }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { labels: { color: '#94a3b8', font: { size: 10 } } } },
                    scales: { y: { ticks: { color: '#94a3b8', font: { size: 9 } } }, x: { ticks: { color: '#94a3b8', font: { size: 9 } } } }
                }
            });
        }

        // 2. ESG
        const ctx2 = document.getElementById('zacky-chart-esg');
        if (ctx2) {
            new Chart(ctx2.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: DATA.esgData.months,
                    datasets: [
                        { label: 'CO₂ saved (kg)', data: DATA.esgData.co2Saved, backgroundColor: 'rgba(16,185,129,0.7)', borderRadius: 6 },
                        { label: 'Paper reduction %', data: DATA.esgData.paperReduction, backgroundColor: 'rgba(59,130,246,0.7)', borderRadius: 6 }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { labels: { color: '#94a3b8', font: { size: 9 } } } },
                    scales: { y: { beginAtZero: true, ticks: { color: '#94a3b8', font: { size: 8 } } }, x: { ticks: { color: '#94a3b8', font: { size: 8 } } } }
                }
            });
        }

        // 3. Portfolio
        const ctx3 = document.getElementById('zacky-chart-portfolio');
        if (ctx3) {
            new Chart(ctx3.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: DATA.portfolioData.labels,
                    datasets: [{ data: DATA.portfolioData.values, backgroundColor: ['#3b82f6', '#f59e0b', '#10b981', '#94a3b8'], borderWidth: 0 }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    cutout: '65%',
                    plugins: { legend: { display: false } }
                }
            });
        }

        // 4. Budget
        const ctx4 = document.getElementById('zacky-chart-budget');
        if (ctx4) {
            new Chart(ctx4.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: DATA.budgetData.regions,
                    datasets: [
                        { label: 'Budget (€K)', data: DATA.budgetData.budget, backgroundColor: 'rgba(99,102,241,0.7)', borderRadius: 6 },
                        { label: 'Actual (€K)', data: DATA.budgetData.actual, backgroundColor: 'rgba(16,185,129,0.7)', borderRadius: 6 }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { labels: { color: '#94a3b8', font: { size: 9 } } } },
                    scales: { y: { beginAtZero: true, ticks: { color: '#94a3b8' } }, x: { ticks: { color: '#94a3b8' } } }
                }
            });
        }

        // 5. Team
        const ctx5 = document.getElementById('zacky-chart-team');
        if (ctx5) {
            new Chart(ctx5.getContext('2d'), {
                type: 'radar',
                data: {
                    labels: DATA.teamData.categories,
                    datasets: [
                        { label: 'Current Team', data: DATA.teamData.current, borderColor: '#6366f1', backgroundColor: 'rgba(99,102,241,0.2)', pointBackgroundColor: '#6366f1' },
                        { label: 'Required Q4', data: DATA.teamData.required, borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.15)', pointBackgroundColor: '#f59e0b' }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    scales: { r: { beginAtZero: true, ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } } },
                    plugins: { legend: { labels: { color: '#94a3b8', font: { size: 9 } } } }
                }
            });
        }
    }

    // ============================================================
    // MAPA (LEAFLET)
    // ============================================================
    function initMap() {
        const mapContainer = document.getElementById('zacky-map');
        if (!mapContainer) return;

        if (typeof L === 'undefined') {
            // Cargar Leaflet si no está disponible
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);

            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.onload = function() { initMap(); };
            document.head.appendChild(script);
            return;
        }

        const map = L.map('zacky-map', {
            center: CONFIG.mapCenter,
            zoom: CONFIG.mapZoom,
            zoomControl: true,
            scrollWheelZoom: false,
            attributionControl: false
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            subdomains: 'abcd',
            minZoom: 1,
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        const iconColors = { active: '#10b981', developing: '#f59e0b', pending: '#ef4444' };
        const corridorPositions = {
            'UK-Morocco': { lat: 33.5731, lng: -7.5898 },
            'Spain-Europe': { lat: 40.4168, lng: -3.7038 },
            'Mexico-LATAM': { lat: 19.4326, lng: -99.1332 },
            'USA East': { lat: 25.7617, lng: -80.1918 },
            'Gulf Region': { lat: 25.2048, lng: 55.2708 }
        };

        DATA.corridors.forEach(c => {
            const pos = corridorPositions[c.id] || { lat: 0, lng: 0 };
            const color = iconColors[c.status] || '#94a3b8';
            const circle = L.circleMarker([pos.lat, pos.lng], {
                radius: 9,
                fillColor: color,
                color: 'white',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.9
            }).addTo(map);
            circle.bindTooltip(`${c.name} · ${c.status} · ${c.progress}%`, {
                permanent: false,
                direction: 'top',
                className: 'custom-tooltip'
            });
        });

        // Ajustar tamaño del mapa al contenedor
        setTimeout(() => map.invalidateSize(), 300);
    }

    // ============================================================
    // FUNCIÓN PRINCIPAL DE CARGA
    // ============================================================
    function loadDashboard() {
        // Crear contenedor
        const container = document.getElementById(CONFIG.containerId);
        if (!container) {
            console.warn('🟡 No se encontró el contenedor para el dashboard. Creándolo...');
            const newContainer = document.createElement('div');
            newContainer.id = CONFIG.containerId;
            document.body.prepend(newContainer);
            // Reintentar
            setTimeout(loadDashboard, 100);
            return;
        }

        // Insertar estilos si no existen
        if (!document.getElementById('zacky-dash-styles')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'zacky-dash-styles';
            styleEl.textContent = STYLES;
            document.head.appendChild(styleEl);
        }

        // Cargar Font Awesome si no está
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const fa = document.createElement('link');
            fa.rel = 'stylesheet';
            fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
            document.head.appendChild(fa);
        }

        // Cargar Chart.js si no está
        if (typeof Chart === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
            script.onload = function() { loadDashboard(); };
            document.head.appendChild(script);
            return;
        }

        // Generar HTML
        container.innerHTML = createDashboardHTML();

        // Inicializar componentes
        setTimeout(() => {
            initMap();
            initCharts();
            console.log('🚀 Zacky Executive Dashboard cargado correctamente.');
        }, 300);
    }

    // ============================================================
    // EXPOSICIÓN GLOBAL
    // ============================================================
    window.ZackyExecutiveDashboard = {
        load: loadDashboard,
        refresh: function() {
            const container = document.getElementById(CONFIG.containerId);
            if (container) {
                container.innerHTML = '';
                loadDashboard();
            }
        },
        config: CONFIG,
        data: DATA
    };

    // ============================================================
    // CARGA AUTOMÁTICA
    // ============================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadDashboard);
    } else {
        // Esperar un tick para que el DOM esté listo
        setTimeout(loadDashboard, 50);
    }

})();