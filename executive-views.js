// ============================================================
// 🧠 EXECUTIVE VIEWS 4D – PANEL DE CONTROL (MODAL FLOTANTE)
// Versión: 3.2 – WHITEBOARD PROFESIONAL + MAPA FUNCIONAL
// ============================================================
(function() {
    'use strict';

    // ============================================================
    // 🎯 CONFIGURACIÓN DE VISTAS NATIVAS (¡PERSONALIZA AQUÍ!)
    // ============================================================
    const NATIVE_VIEW_MAP = {
        board: 'showView',
        list: 'showView',
        calendar: 'showView',
        gantt: 'showExecutiveGantt',
        reports: 'showView',
        dashboard: 'showView',
        profitability: 'showView',
        timeAllocation: 'showView',
        dashboard4d: 'showDashboard4DView'
    };

    // ============================================================
    // 1. IDIOMA – TEXTOS BILINGÜES
    // ============================================================
    const LANG = {
        es: {
            title: '🧠 Executive Views 4D',
            subtitle: 'Panel de control avanzado · Selecciona una vista para desplegarla',
            closeView: '✕ Cerrar vista',
            selectView: 'Selecciona una vista del panel superior.',
            categories: {
                'Gestión': 'Gestión',
                'Planificación': 'Planificación',
                'Análisis': 'Análisis',
                'Recursos': 'Recursos',
                'Colaboración': 'Colaboración',
                'Geolocalización': 'Geolocalización',
                'Inserciones': 'Inserciones'
            },
            views: {
                board: { name: 'Tablero Kanban', desc: 'Gestión ágil de tareas por columnas' },
                list: { name: 'Lista', desc: 'Vista detallada en tabla' },
                calendar: { name: 'Calendario', desc: 'Planifica y programa tareas' },
                gantt: { name: 'Gantt', desc: 'Dependencias y cronograma' },
                reports: { name: 'Reportes', desc: 'Métricas y análisis ejecutivo' },
                dashboard: { name: 'Dashboard', desc: 'Panorama general del proyecto' },
                profitability: { name: 'Rentabilidad', desc: 'Análisis financiero' },
                timeAllocation: { name: 'Carga de Trabajo', desc: 'Capacidad y distribución del equipo' },
                dashboard4d: { name: 'Dashboard 4D', desc: 'Visión global de todos los proyectos' },
                whiteboard: { name: 'Whiteboard', desc: 'Lluvia de ideas y colaboración visual' },
                mindmap: { name: 'Mapa Mental', desc: 'Organiza ideas jerárquicamente' },
                activity: { name: 'Actividad', desc: 'Canal de eventos en tiempo real' },
                team: { name: 'Equipo', desc: 'Supervisión del trabajo del equipo' },
                map: { name: 'Mapa', desc: 'Visualización geográfica de tareas' },
                website: { name: 'Sitio Web', desc: 'Inserta cualquier página web' },
                googleSheets: { name: 'Google Sheets', desc: 'Sincroniza hojas de cálculo' },
                googleDocs: { name: 'Google Docs', desc: 'Sincroniza documentos' },
                googleCalendar: { name: 'Google Calendar', desc: 'Sincroniza eventos de calendario' },
                googleMaps: { name: 'Google Maps', desc: 'Encuentra el camino' },
                youtube: { name: 'YouTube', desc: 'Busca y comparte vídeos' },
                figma: { name: 'Figma', desc: 'Contempla tus diseños' },
                form: { name: 'Formulario', desc: 'Recopila datos y genera informes' }
            }
        },
        en: {
            title: '🧠 Executive Views 4D',
            subtitle: 'Advanced control panel · Select a view to display it',
            closeView: '✕ Close view',
            selectView: 'Select a view from the panel above.',
            categories: {
                'Gestión': 'Management',
                'Planificación': 'Planning',
                'Análisis': 'Analysis',
                'Recursos': 'Resources',
                'Colaboración': 'Collaboration',
                'Geolocalización': 'Geolocation',
                'Inserciones': 'Embed'
            },
            views: {
                board: { name: 'Kanban Board', desc: 'Agile task management by columns' },
                list: { name: 'List', desc: 'Detailed table view' },
                calendar: { name: 'Calendar', desc: 'Plan and schedule tasks' },
                gantt: { name: 'Gantt', desc: 'Dependencies and timeline' },
                reports: { name: 'Reports', desc: 'Metrics and executive analysis' },
                dashboard: { name: 'Dashboard', desc: 'Project overview' },
                profitability: { name: 'Profitability', desc: 'Financial analysis' },
                timeAllocation: { name: 'Workload', desc: 'Team capacity and distribution' },
                dashboard4d: { name: 'Dashboard 4D', desc: 'Global view of all projects' },
                whiteboard: { name: 'Whiteboard', desc: 'Brainstorming and visual collaboration' },
                mindmap: { name: 'Mind Map', desc: 'Organize ideas hierarchically' },
                activity: { name: 'Activity', desc: 'Real-time event feed' },
                team: { name: 'Team', desc: 'Monitor team work' },
                map: { name: 'Map', desc: 'Geographic visualization of tasks' },
                website: { name: 'Website', desc: 'Embed any web page' },
                googleSheets: { name: 'Google Sheets', desc: 'Sync spreadsheets' },
                googleDocs: { name: 'Google Docs', desc: 'Sync documents' },
                googleCalendar: { name: 'Google Calendar', desc: 'Sync calendar events' },
                googleMaps: { name: 'Google Maps', desc: 'Find the way' },
                youtube: { name: 'YouTube', desc: 'Search and share videos' },
                figma: { name: 'Figma', desc: 'View your amazing designs' },
                form: { name: 'Form', desc: 'Collect data and generate reports' }
            }
        }
    };

    // ============================================================
    // 2. CONFIGURACIÓN DE VISTAS (CATÁLOGO)
    // ============================================================
    const VIEWS = {
        board: { id: 'board', icon: '📋', category: 'Gestión', action: 'native' },
        list: { id: 'list', icon: '📄', category: 'Gestión', action: 'native' },
        calendar: { id: 'calendar', icon: '📅', category: 'Planificación', action: 'native' },
        gantt: { id: 'gantt', icon: '📊', category: 'Planificación', action: 'native' },
        reports: { id: 'reports', icon: '📈', category: 'Análisis', action: 'native' },
        dashboard: { id: 'dashboard', icon: '🎯', category: 'Análisis', action: 'native' },
        profitability: { id: 'profitability', icon: '💰', category: 'Análisis', action: 'native' },
        timeAllocation: { id: 'timeAllocation', icon: '⏱️', category: 'Recursos', action: 'native' },
        dashboard4d: { id: 'dashboard4d', icon: '🌐', category: 'Análisis', action: 'native' },
        whiteboard: { id: 'whiteboard', icon: '✏️', category: 'Colaboración', action: 'renderWhiteboard' },
        mindmap: { id: 'mindmap', icon: '🧠', category: 'Colaboración', action: 'renderMindmap' },
        activity: { id: 'activity', icon: '📡', category: 'Colaboración', action: 'renderActivity' },
        team: { id: 'team', icon: '👥', category: 'Recursos', action: 'renderTeam' },
        map: { id: 'map', icon: '🗺️', category: 'Geolocalización', action: 'renderMap' },
        website: { id: 'website', icon: '🌍', category: 'Inserciones', action: 'embed', embedUrl: '' },
        googleSheets: { id: 'googleSheets', icon: '📊', category: 'Inserciones', action: 'embed', embedUrl: '' },
        googleDocs: { id: 'googleDocs', icon: '📝', category: 'Inserciones', action: 'embed', embedUrl: '' },
        googleCalendar: { id: 'googleCalendar', icon: '📅', category: 'Inserciones', action: 'embed', embedUrl: '' },
        googleMaps: { id: 'googleMaps', icon: '📍', category: 'Inserciones', action: 'embed', embedUrl: '' },
        youtube: { id: 'youtube', icon: '🎬', category: 'Inserciones', action: 'embedYoutube' },
        figma: { id: 'figma', icon: '🎨', category: 'Inserciones', action: 'embed', embedUrl: '' },
        form: { id: 'form', icon: '📝', category: 'Inserciones', action: 'embed', embedUrl: '' }
    };

    // ============================================================
    // 3. INYECCIÓN DE ESTILOS
    // ============================================================
    function injectStyles() {
        if (document.getElementById('ev-styles')) return;
        const style = document.createElement('style');
        style.id = 'ev-styles';
        style.textContent = `
            :root {
                --ev-bg-primary: #0f172a;
                --ev-bg-secondary: #1e293b;
                --ev-border-glow: rgba(139, 92, 246, 0.3);
                --ev-text-primary: #e2e8f0;
                --ev-text-secondary: #94a3b8;
                --ev-accent: #8b5cf6;
                --ev-accent-gradient: linear-gradient(135deg, #8b5cf6, #ec4899);
            }
            .executive-views-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.85);
                backdrop-filter: blur(20px);
                z-index: 10000000;
                display: none;
                align-items: center;
                justify-content: center;
                padding: 20px;
                animation: evFadeIn 0.4s cubic-bezier(0.22, 1, 0.36, 1);
            }
            .executive-views-overlay.active { display: flex; }
            .executive-views-panel {
                background: linear-gradient(145deg, #0f172a, #1e293b);
                border: 1px solid var(--ev-border-glow);
                border-radius: 40px;
                width: 100%;
                max-width: 1400px;
                max-height: 90vh;
                overflow-y: auto;
                padding: 40px 45px;
                box-shadow: 0 50px 100px rgba(0,0,0,0.7), 0 0 0 2px rgba(139,92,246,0.15);
                position: relative;
                scrollbar-width: thin;
                scrollbar-color: #8b5cf6 #1e293b;
            }
            .executive-views-panel::-webkit-scrollbar { width: 8px; }
            .executive-views-panel::-webkit-scrollbar-track { background: #1e293b; border-radius: 10px; }
            .executive-views-panel::-webkit-scrollbar-thumb { background: #8b5cf6; border-radius: 10px; }

            .ev-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 30px;
                border-bottom: 2px solid rgba(139,92,246,0.2);
                padding-bottom: 20px;
                flex-wrap: wrap;
                gap: 15px;
            }
            .ev-header-left h2 {
                margin: 0;
                font-size: 28px;
                font-weight: 700;
                background: var(--ev-accent-gradient);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                letter-spacing: -0.5px;
            }
            .ev-header-left p {
                color: var(--ev-text-secondary);
                margin: 6px 0 0 0;
                font-size: 14px;
            }
            .ev-header-right {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            .ev-lang-toggle {
                background: rgba(255,255,255,0.05);
                border: 1px solid #334155;
                color: var(--ev-text-primary);
                padding: 8px 16px;
                border-radius: 30px;
                cursor: pointer;
                font-size: 13px;
                transition: all 0.2s;
            }
            .ev-lang-toggle:hover {
                border-color: var(--ev-accent);
                background: rgba(139,92,246,0.15);
            }
            .ev-close-btn {
                background: rgba(239,68,68,0.15);
                border: 1px solid rgba(239,68,68,0.3);
                color: #f87171;
                width: 48px;
                height: 48px;
                border-radius: 30px;
                font-size: 24px;
                cursor: pointer;
                transition: all 0.3s;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .ev-close-btn:hover {
                background: rgba(239,68,68,0.3);
                transform: rotate(90deg);
            }

            .ev-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                gap: 18px;
            }
            .ev-card {
                background: rgba(255,255,255,0.03);
                border: 1px solid rgba(255,255,255,0.06);
                border-radius: 24px;
                padding: 22px 16px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
                backdrop-filter: blur(4px);
                position: relative;
                overflow: hidden;
            }
            .ev-card::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 60%);
                opacity: 0;
                transition: opacity 0.4s;
            }
            .ev-card:hover {
                transform: translateY(-8px) scale(1.03);
                border-color: rgba(139,92,246,0.5);
                box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(139,92,246,0.1);
                background: rgba(139,92,246,0.08);
            }
            .ev-card:hover::before { opacity: 1; }
            .ev-card .ev-icon { font-size: 36px; margin-bottom: 12px; display: block; }
            .ev-card .ev-name { font-size: 15px; font-weight: 600; color: var(--ev-text-primary); }
            .ev-card .ev-desc { font-size: 11px; color: var(--ev-text-secondary); margin-top: 6px; line-height: 1.4; }
            .ev-card .ev-badge {
                position: absolute;
                top: 10px;
                right: 10px;
                background: var(--ev-accent-gradient);
                color: white;
                font-size: 8px;
                padding: 2px 8px;
                border-radius: 20px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .ev-category { margin-top: 30px; margin-bottom: 12px; }
            .ev-category h3 {
                font-size: 16px;
                color: #a78bfa;
                font-weight: 600;
                letter-spacing: 0.5px;
                border-left: 4px solid var(--ev-accent);
                padding-left: 16px;
                margin: 0 0 16px 0;
            }

            .ev-view-container {
                margin-top: 30px;
                border-top: 1px solid rgba(139,92,246,0.15);
                padding-top: 25px;
                display: none;
            }
            .ev-view-container.active { display: block; }
            .ev-view-container .ev-view-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                flex-wrap: wrap;
                gap: 10px;
            }
            .ev-view-container .ev-view-header h3 {
                margin: 0;
                color: white;
                font-size: 22px;
                font-weight: 600;
            }
            .ev-view-container .ev-view-header button {
                background: rgba(255,255,255,0.05);
                border: 1px solid #334155;
                color: var(--ev-text-secondary);
                padding: 8px 20px;
                border-radius: 30px;
                cursor: pointer;
                transition: all 0.2s;
                font-size: 13px;
            }
            .ev-view-container .ev-view-header button:hover {
                background: rgba(139,92,246,0.15);
                border-color: var(--ev-accent);
                color: white;
            }
            .ev-view-content {
                background: rgba(0,0,0,0.3);
                border-radius: 24px;
                padding: 30px;
                min-height: 300px;
                border: 1px solid rgba(255,255,255,0.05);
                color: #cbd5e1;
                font-size: 14px;
            }
            .ev-view-content iframe {
                width: 100%;
                height: 500px;
                border: none;
                border-radius: 16px;
                background: white;
            }
            .ev-view-content canvas {
                width: 100%;
                height: 400px;
                border-radius: 16px;
                background: #0f172a;
            }

            .executive-views-trigger {
                background: linear-gradient(135deg, #1e293b, #0f172a) !important;
                border: 1px solid rgba(139, 92, 246, 0.4) !important;
                color: #e2e8f0 !important;
                padding: 14px 18px !important;
                border-radius: 16px !important;
                cursor: pointer !important;
                transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1) !important;
                margin: 12px 12px !important;
                display: flex !important;
                align-items: center !important;
                gap: 14px !important;
                box-shadow: 0 8px 20px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.1) !important;
                backdrop-filter: blur(4px) !important;
                width: calc(100% - 24px) !important;
            }
            .executive-views-trigger:hover {
                transform: translateY(-3px) scale(1.02) !important;
                border-color: #8b5cf6 !important;
                box-shadow: 0 16px 40px rgba(139,92,246,0.3) !important;
            }
            .executive-views-trigger i { font-size: 22px; color: #8b5cf6; }
            .executive-views-trigger .badge-3d {
                background: var(--ev-accent-gradient);
                padding: 2px 12px;
                border-radius: 40px;
                font-size: 10px;
                font-weight: 700;
                color: white;
                margin-left: auto;
                letter-spacing: 0.5px;
                box-shadow: 0 0 20px rgba(139,92,246,0.3);
            }

            .embed-toolbar {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
                margin-bottom: 16px;
            }
            .embed-toolbar input {
                flex: 1;
                padding: 10px 14px;
                background: #1e293b;
                border: 1px solid #334155;
                border-radius: 10px;
                color: white;
                font-size: 14px;
                min-width: 200px;
            }
            .embed-toolbar button {
                background: var(--ev-accent);
                border: none;
                color: white;
                padding: 10px 20px;
                border-radius: 30px;
                cursor: pointer;
                font-weight: 600;
                transition: 0.2s;
            }
            .embed-toolbar button:hover {
                transform: scale(1.05);
                box-shadow: 0 0 20px rgba(139,92,246,0.4);
            }
            .whiteboard-tools { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 12px; align-items: center; }
            .wb-color-btn { width: 30px; height: 30px; border-radius: 50%; border: 2px solid white; cursor: pointer; transition: transform 0.2s; }
            .wb-color-btn:hover { transform: scale(1.15); }
            .wb-action-btn {
                background: var(--ev-bg-secondary);
                border: 1px solid #334155;
                color: var(--ev-text-primary);
                padding: 6px 16px;
                border-radius: 30px;
                cursor: pointer;
                font-size: 13px;
                transition: all 0.2s;
            }
            .wb-action-btn:hover { background: rgba(139,92,246,0.2); border-color: var(--ev-accent); }
            
            /* NUEVO: Estilo para herramienta activa en Whiteboard */
            .wb-action-btn.active-tool {
                background: rgba(139,92,246,0.3) !important;
                border-color: var(--ev-accent) !important;
                color: white !important;
                box-shadow: 0 0 10px rgba(139,92,246,0.3);
            }

            .wb-size-btn {
                background: #1e293b;
                border: 1px solid #334155;
                color: white;
                padding: 4px 10px;
                border-radius: 30px;
                cursor: pointer;
                font-size: 12px;
                transition: 0.2s;
            }
            .wb-size-btn.active { border-color: var(--ev-accent); background: rgba(139,92,246,0.2); }
            .wb-color-picker { width: 36px; height: 36px; border: none; padding: 0; border-radius: 50%; cursor: pointer; background: none; }
            .activity-feed {
                max-height: 400px;
                overflow-y: auto;
                background: #0f172a;
                border-radius: 16px;
                padding: 16px;
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .activity-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 10px;
                background: rgba(255,255,255,0.03);
                border-radius: 12px;
                border-left: 3px solid var(--ev-accent);
            }
            .team-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
            .team-card {
                background: rgba(255,255,255,0.03);
                border: 1px solid #334155;
                border-radius: 20px;
                padding: 20px;
                text-align: center;
            }
            .mindmap-input-row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 12px; }
            .mindmap-input-row input { flex: 1; padding: 10px; background: #1e293b; border: 1px solid #334155; border-radius: 10px; color: white; min-width: 150px; }

            @media (max-width: 768px) {
                .executive-views-panel { padding: 20px 16px; max-height: 95vh; }
                .ev-grid { grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px; }
                .ev-card { padding: 16px 10px; }
                .ev-card .ev-icon { font-size: 28px; }
                .ev-header-left h2 { font-size: 22px; }
            }
            @keyframes evFadeIn {
                from { opacity: 0; transform: scale(0.96); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================================
    // 4. RENDERIZADORES DE VISTAS
    // ============================================================

  
    // 4.1 Whiteboard (VERSIÓN PROFESIONAL CON OBJETOS, ARRASTRE Y PLANTILLAS)
    function renderWhiteboard(container) {
        container.style.position = 'relative';
        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:12px; height: 100%;">
                <div class="wb-toolbar">
                    <button class="wb-tool-btn active" data-tool="select" title="Seleccionar y Mover">🖱️ Seleccionar</button>
                    <button class="wb-tool-btn" data-tool="hand" title="Mover Lienzo">✋ Mano</button>
                    <div style="width:1px; height:24px; background:#475569; margin:0 4px;"></div>
                    <button class="wb-tool-btn" data-tool="pen" title="Lápiz">✏️ Lápiz</button>
                    <button class="wb-tool-btn" data-tool="rect" title="Rectángulo">⬜ Rect</button>
                    <button class="wb-tool-btn" data-tool="circle" title="Círculo">⬤ Círculo</button>
                    <button class="wb-tool-btn" data-tool="text" title="Texto">T Texto</button>
                    <button class="wb-tool-btn" data-tool="note" title="Nota Adhesiva">📌 Nota</button>
                    <div style="width:1px; height:24px; background:#475569; margin:0 4px;"></div>
                    <button class="wb-tool-btn" data-tool="templates" title="Plantillas Profesionales">📋 Plantillas</button>
                    <div style="width:1px; height:24px; background:#475569; margin:0 4px;"></div>
                    <button class="wb-tool-btn" id="wbUndo" title="Deshacer">↩️</button>
                    <button class="wb-tool-btn" id="wbClear" title="Limpiar Todo" style="color:#f87171;">🗑️</button>
                    <div style="width:1px; height:24px; background:#475569; margin:0 8px;"></div>
                    <div style="display:flex; gap:6px; align-items:center;">
                        <!-- CORRECCIÓN: Se añadió !important al background para forzar el color brillante -->
                        <button class="wb-color-btn active" data-color="#ffffff" style="background: #ffffff !important;"></button>
                        <button class="wb-color-btn" data-color="#f87171" style="background: #f87171 !important;"></button>
                        <button class="wb-color-btn" data-color="#60a5fa" style="background: #60a5fa !important;"></button>
                        <button class="wb-color-btn" data-color="#34d399" style="background: #34d399 !important;"></button>
                        <button class="wb-color-btn" data-color="#fbbf24" style="background: #fbbf24 !important;"></button>
                        <button class="wb-color-btn" data-color="#a78bfa" style="background: #a78bfa !important;"></button>
                        <button class="wb-color-btn" data-color="#1e293b" style="background: #1e293b !important;"></button>
                        <input type="color" id="wbColorPicker" value="#ffffff" style="width:28px; height:28px; border: 2px solid rgba(255,255,255,0.6); border-radius:50%; cursor:pointer; background:none; padding:0;">
                    </div>
                </div>
                <canvas id="whiteboardCanvas" style="width:100%; height:550px; background:#0f172a; border-radius:16px; cursor:default; border:1px solid #334155; touch-action:none;"></canvas>
            </div>
            
            <div id="wbTemplatesModal" style="display:none; position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); background:#1e293b; border:1px solid #334155; border-radius:16px; padding:24px; z-index:100; box-shadow:0 25px 60px rgba(0,0,0,0.8); width:340px;">
                <h4 style="color:white; margin:0 0 16px 0; font-size:16px; font-weight:600;">📋 Seleccionar Plantilla</h4>
                <div style="display:grid; gap:10px;">
                    <button class="wb-tpl-btn" data-tpl="kanban">📊 Tablero Kanban (Estilo ClickUp)</button>
                    <button class="wb-tpl-btn" data-tpl="flowchart">🔀 Diagrama de Flujo</button>
                    <button class="wb-tpl-btn" data-tpl="asana">✅ Lista de Tareas (Estilo Asana)</button>
                    <button class="wb-tpl-btn" data-tpl="mindmap">🧠 Mapa Mental Básico</button>
                </div>
                <button id="wbCloseTpl" style="margin-top:16px; width:100%; padding:10px; background:#334155; color:white; border:none; border-radius:8px; cursor:pointer; font-weight:500; transition:0.2s;">Cancelar</button>
            </div>
        `;

        const canvas = document.getElementById('whiteboardCanvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        
        let elements = [];
        let history = [];
        let panX = 0, panY = 0;
        let currentTool = 'select';
        let currentColor = '#ffffff';
        let currentSize = 3;
        
        let isDragging = false, dragTarget = null, dragOffsetX = 0, dragOffsetY = 0, dragStartX = 0, dragStartY = 0;
        let isPanning = false, panStartX = 0, panStartY = 0;
        let isDrawing = false, currentElement = null;

        function resizeCanvas() {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            render();
        }
        setTimeout(resizeCanvas, 50);
        window.addEventListener('resize', resizeCanvas);

        function saveHistory() {
            history.push(JSON.parse(JSON.stringify(elements)));
            if (history.length > 25) history.shift();
        }

        function render() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.save();
            ctx.translate(panX, panY);
            
            elements.forEach(el => drawElement(ctx, el));
            
            if (isDrawing && currentElement) {
                drawElement(ctx, currentElement);
            }
            
            ctx.restore();
        }

        function drawElement(ctx, el) {
            ctx.lineWidth = el.size || 3;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            if (el.type === 'rect') {
                ctx.fillStyle = el.color + '33';
                ctx.fillRect(el.x, el.y, el.w, el.h);
                ctx.strokeStyle = el.color;
                ctx.strokeRect(el.x, el.y, el.w, el.h);
            } else if (el.type === 'circle') {
                ctx.beginPath();
                ctx.arc(el.x, el.y, el.r, 0, Math.PI * 2);
                ctx.fillStyle = el.color + '33';
                ctx.fill();
                ctx.strokeStyle = el.color;
                ctx.stroke();
            } else if (el.type === 'text') {
                ctx.font = `bold ${el.size}px sans-serif`;
                ctx.fillStyle = el.color;
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                ctx.fillText(el.text, el.x, el.y);
            } else if (el.type === 'note') {
                ctx.shadowColor = 'rgba(0,0,0,0.5)';
                ctx.shadowBlur = 10;
                ctx.fillStyle = '#fbbf24';
                ctx.fillRect(el.x, el.y, el.w, el.h);
                ctx.shadowBlur = 0;
                ctx.strokeStyle = '#d97706';
                ctx.lineWidth = 2;
                ctx.strokeRect(el.x, el.y, el.w, el.h);
                ctx.fillStyle = '#1e293b';
                ctx.font = '14px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                const lines = el.text.split('\n');
                lines.forEach((line, i) => {
                    ctx.fillText(line, el.x + el.w/2, el.y + el.h/2 - (lines.length-1)*10 + i*20);
                });
            } else if (el.type === 'path') {
                if (el.points.length < 2) return;
                ctx.beginPath();
                ctx.strokeStyle = el.color;
                ctx.lineWidth = el.size;
                ctx.moveTo(el.points[0].x, el.points[0].y);
                for (let i = 1; i < el.points.length; i++) {
                    ctx.lineTo(el.points[i].x, el.points[i].y);
                }
                ctx.stroke();
            }
        }

        function getPos(e) {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: (clientX - rect.left) * (canvas.width / rect.width) - panX,
                y: (clientY - rect.top) * (canvas.height / rect.height) - panY
            };
        }

        function hitTest(x, y, el) {
            if (el.type === 'rect') return x >= el.x && x <= el.x + el.w && y >= el.y && y <= el.y + el.h;
            if (el.type === 'circle') return Math.sqrt(Math.pow(x - el.x, 2) + Math.pow(y - el.y, 2)) <= el.r;
            if (el.type === 'text') {
                const w = el.text.length * (el.size * 0.6);
                return x >= el.x && x <= el.x + w && y >= el.y && y <= el.y + el.size;
            }
            if (el.type === 'note') return x >= el.x && x <= el.x + el.w && y >= el.y && y <= el.y + el.h;
            if (el.type === 'path') {
                let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
                el.points.forEach(p => {
                    if (p.x < minX) minX = p.x; if (p.x > maxX) maxX = p.x;
                    if (p.y < minY) minY = p.y; if (p.y > maxY) maxY = p.y;
                });
                return x >= minX && x <= maxX && y >= minY && y <= maxY;
            }
            return false;
        }

        function setTool(tool, btn) {
            currentTool = tool;
            document.querySelectorAll('.wb-tool-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            canvas.style.cursor = tool === 'select' ? 'default' : tool === 'hand' ? 'grab' : 'crosshair';
        }

        // --- Event Listeners ---
        document.querySelectorAll('.wb-tool-btn[data-tool]').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.tool === 'templates') {
                    document.getElementById('wbTemplatesModal').style.display = 'block';
                    return;
                }
                setTool(btn.dataset.tool, btn);
            });
        });

        document.getElementById('wbCloseTpl').addEventListener('click', () => {
            document.getElementById('wbTemplatesModal').style.display = 'none';
        });

        document.querySelectorAll('.wb-tpl-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                loadTemplate(btn.dataset.tpl);
                document.getElementById('wbTemplatesModal').style.display = 'none';
                setTool('select', document.querySelector('[data-tool="select"]'));
            });
        });

        document.getElementById('wbUndo').addEventListener('click', () => {
            if (history.length <= 1) {
                elements = [];
                render();
                return;
            }
            history.pop();
            elements = JSON.parse(JSON.stringify(history[history.length - 1]));
            render();
        });

        document.getElementById('wbClear').addEventListener('click', () => {
            if (confirm('¿Limpiar todo el lienzo?')) {
                elements = [];
                saveHistory();
                render();
            }
        });

        document.querySelectorAll('.wb-color-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                currentColor = btn.dataset.color;
                document.querySelectorAll('.wb-color-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById('wbColorPicker').value = currentColor;
            });
        });

        document.getElementById('wbColorPicker').addEventListener('input', (e) => {
            currentColor = e.target.value;
            document.querySelectorAll('.wb-color-btn').forEach(b => b.classList.remove('active'));
        });

        // --- Mouse/Touch Events ---
        function onStart(e) {
            e.preventDefault();
            const pos = getPos(e);
            
            if (currentTool === 'select') {
                for (let i = elements.length - 1; i >= 0; i--) {
                    if (hitTest(pos.x, pos.y, elements[i])) {
                        dragTarget = elements[i];
                        isDragging = true;
                        dragStartX = pos.x;
                        dragStartY = pos.y;
                        if (dragTarget.type === 'rect' || dragTarget.type === 'note') {
                            dragOffsetX = pos.x - dragTarget.x;
                            dragOffsetY = pos.y - dragTarget.y;
                        } else if (dragTarget.type === 'circle') {
                            dragOffsetX = pos.x - dragTarget.x;
                            dragOffsetY = pos.y - dragTarget.y;
                        } else if (dragTarget.type === 'text') {
                            dragOffsetX = pos.x - dragTarget.x;
                            dragOffsetY = pos.y - dragTarget.y;
                        } else if (dragTarget.type === 'path') {
                            dragOffsetX = 0; dragOffsetY = 0; // Calculado en move
                        }
                        // Move to top
                        elements.splice(i, 1);
                        elements.push(dragTarget);
                        render();
                        return;
                    }
                }
            } else if (currentTool === 'hand') {
                isPanning = true;
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;
                panStartX = clientX - panX;
                panStartY = clientY - panY;
                canvas.style.cursor = 'grabbing';
                return;
            } else if (currentTool === 'text') {
                const text = prompt('Escribe el texto:');
                if (text) {
                    elements.push({ type: 'text', x: pos.x, y: pos.y, text: text, color: currentColor, size: currentSize * 5 + 14 });
                    saveHistory();
                    render();
                }
                setTool('select', document.querySelector('[data-tool="select"]'));
                return;
            } else if (currentTool === 'note') {
                const text = prompt('Escribe el texto de la nota:');
                if (text) {
                    elements.push({ type: 'note', x: pos.x - 70, y: pos.y - 50, w: 140, h: 100, text: text });
                    saveHistory();
                    render();
                }
                setTool('select', document.querySelector('[data-tool="select"]'));
                return;
            }

            isDrawing = true;
            if (currentTool === 'pen') {
                currentElement = { type: 'path', points: [{x: pos.x, y: pos.y}], color: currentColor, size: currentSize };
            } else if (currentTool === 'rect') {
                currentElement = { type: 'rect', x: pos.x, y: pos.y, w: 0, h: 0, color: currentColor };
            } else if (currentTool === 'circle') {
                currentElement = { type: 'circle', x: pos.x, y: pos.y, r: 0, color: currentColor };
            }
        }

        function onMove(e) {
            e.preventDefault();
            const pos = getPos(e);
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            if (isDragging && dragTarget) {
                if (dragTarget.type === 'path') {
                    const dx = pos.x - dragStartX;
                    const dy = pos.y - dragStartY;
                    dragTarget.points = dragTarget.points.map(p => ({ x: p.x + dx, y: p.y + dy }));
                    dragStartX = pos.x;
                    dragStartY = pos.y;
                } else {
                    dragTarget.x = pos.x - dragOffsetX;
                    dragTarget.y = pos.y - dragOffsetY;
                }
                render();
            } else if (isPanning) {
                panX = clientX - panStartX;
                panY = clientY - panStartY;
                render();
            } else if (isDrawing && currentElement) {
                if (currentElement.type === 'path') {
                    currentElement.points.push({x: pos.x, y: pos.y});
                } else if (currentElement.type === 'rect') {
                    currentElement.w = pos.x - currentElement.x;
                    currentElement.h = pos.y - currentElement.y;
                } else if (currentElement.type === 'circle') {
                    currentElement.r = Math.sqrt(Math.pow(pos.x - currentElement.x, 2) + Math.pow(pos.y - currentElement.y, 2));
                }
                render();
            }
        }

        function onEnd(e) {
            if (isDragging) {
                isDragging = false;
                dragTarget = null;
                saveHistory();
            }
            if (isPanning) {
                isPanning = false;
                canvas.style.cursor = 'grab';
            }
            if (isDrawing) {
                isDrawing = false;
                if (currentElement) {
                    if (currentElement.type === 'rect' && Math.abs(currentElement.w) < 5) currentElement.w = 20;
                    if (currentElement.type === 'rect' && Math.abs(currentElement.h) < 5) currentElement.h = 20;
                    if (currentElement.type === 'circle' && currentElement.r < 5) currentElement.r = 20;
                    elements.push(currentElement);
                    saveHistory();
                    currentElement = null;
                    render();
                }
            }
        }

        canvas.addEventListener('mousedown', onStart);
        canvas.addEventListener('mousemove', onMove);
        canvas.addEventListener('mouseup', onEnd);
        canvas.addEventListener('mouseleave', onEnd);
        canvas.addEventListener('touchstart', onStart, { passive: false });
        canvas.addEventListener('touchmove', onMove, { passive: false });
        canvas.addEventListener('touchend', onEnd, { passive: false });

        // --- Plantillas Profesionales ---
        function loadTemplate(type) {
            elements = [];
            panX = 0; panY = 0;
            
            if (type === 'kanban') {
                const cols = [
                    { title: '📝 Por Hacer', x: 50, color: '#f87171' },
                    { title: '⚙️ En Progreso', x: 300, color: '#fbbf24' },
                    { title: '✅ Hecho', x: 550, color: '#34d399' }
                ];
                cols.forEach(col => {
                    elements.push({ type: 'rect', x: col.x, y: 50, w: 200, h: 400, color: col.color });
                    elements.push({ type: 'text', x: col.x + 15, y: 70, text: col.title, color: '#ffffff', size: 18 });
                });
                elements.push({ type: 'note', x: 70, y: 120, w: 160, h: 90, text: 'Tarea de ejemplo 1' });
                elements.push({ type: 'note', x: 70, y: 230, w: 160, h: 90, text: 'Tarea de ejemplo 2' });
                elements.push({ type: 'note', x: 320, y: 120, w: 160, h: 90, text: 'Desarrollando feature' });
            } else if (type === 'flowchart') {
                elements.push({ type: 'circle', x: 150, y: 100, r: 40, color: '#34d399' });
                elements.push({ type: 'text', x: 125, y: 90, text: 'Inicio', color: '#ffffff', size: 16 });
                
                elements.push({ type: 'path', points: [{x:150,y:140}, {x:150,y:200}], color: '#94a3b8', size: 3 });
                elements.push({ type: 'path', points: [{x:145,y:190}, {x:150,y:200}, {x:155,y:190}], color: '#94a3b8', size: 3 });
                
                elements.push({ type: 'rect', x: 75, y: 200, w: 150, h: 60, color: '#60a5fa' });
                elements.push({ type: 'text', x: 90, y: 220, text: 'Procesar Datos', color: '#ffffff', size: 16 });
                
                elements.push({ type: 'path', points: [{x:150,y:260}, {x:150,y:320}], color: '#94a3b8', size: 3 });
                elements.push({ type: 'path', points: [{x:145,y:310}, {x:150,y:320}, {x:155,y:310}], color: '#94a3b8', size: 3 });
                
                elements.push({ type: 'circle', x: 150, y: 380, r: 40, color: '#f87171' });
                elements.push({ type: 'text', x: 130, y: 370, text: 'Fin', color: '#ffffff', size: 16 });
            } else if (type === 'asana') {
                elements.push({ type: 'text', x: 50, y: 50, text: '🎯 Sprint 1: Objetivos Principales', color: '#a78bfa', size: 24 });
                const tasks = ['Diseñar mockups de la app', 'Configurar base de datos', 'Revisión de código con el equipo', 'Despliegue en entorno de pruebas'];
                tasks.forEach((task, i) => {
                    elements.push({ type: 'rect', x: 50, y: 100 + (i * 70), w: 500, h: 50, color: '#334155' });
                    elements.push({ type: 'text', x: 70, y: 115 + (i * 70), text: '⬜ ' + task, color: '#e2e8f0', size: 16 });
                });
            } else if (type === 'mindmap') {
                elements.push({ type: 'circle', x: 400, y: 250, r: 60, color: '#8b5cf6' });
                elements.push({ type: 'text', x: 360, y: 240, text: 'Proyecto', color: '#ffffff', size: 20 });
                
                const branches = [
                    { x: 200, y: 150, text: 'Ideas', color: '#f87171' },
                    { x: 200, y: 350, text: 'Recursos', color: '#60a5fa' },
                    { x: 600, y: 150, text: 'Tareas', color: '#34d399' },
                    { x: 600, y: 350, text: 'Fechas', color: '#fbbf24' }
                ];
                branches.forEach(b => {
                    elements.push({ type: 'path', points: [{x:400,y:250}, {x:b.x, y:b.y}], color: '#475569', size: 4 });
                    elements.push({ type: 'circle', x: b.x, y: b.y, r: 45, color: b.color });
                    elements.push({ type: 'text', x: b.x - 30, y: b.y - 10, text: b.text, color: '#ffffff', size: 16 });
                });
            }
            saveHistory();
            render();
        }

        saveHistory();
        render();
    }

    // 4.2 Mapa Mental
    function renderMindmap(container) {
        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:16px;">
                <div class="mindmap-input-row">
                    <input type="text" id="mindmapInput" placeholder="Nueva idea..." />
                    <button class="wb-action-btn" id="mindmapAdd">➕ Agregar</button>
                    <button class="wb-action-btn" id="mindmapReset" style="color:#f87171;">🗑️ Reiniciar</button>
                </div>
                <canvas id="mindmapCanvas" style="width:100%; height:400px; background:#0f172a; border-radius:16px;"></canvas>
            </div>
        `;
        const canvas = document.getElementById('mindmapCanvas');
        const ctx = canvas.getContext('2d');
        let nodes = [{ text: 'Proyecto', x: 0.5, y: 0.2, children: [] }];

        function resizeCanvas() {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            drawMindmap();
        }
        window.addEventListener('resize', resizeCanvas);

        function drawMindmap() {
            const w = canvas.width, h = canvas.height;
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, w, h);

            function drawNode(node, x, y, depth) {
                const radius = 30 + Math.max(0, 10 - depth * 2);
                const color = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'][depth % 5];
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.shadowColor = color;
                ctx.shadowBlur = 20;
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.fillStyle = 'white';
                ctx.font = '14px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                let text = node.text;
                const maxWidth = radius * 1.6;
                if (ctx.measureText(text).width > maxWidth) {
                    while (ctx.measureText(text + '…').width > maxWidth && text.length > 2) {
                        text = text.slice(0, -1);
                    }
                    text += '…';
                }
                ctx.fillText(text, x, y);

                if (node.children) {
                    const angleStep = (Math.PI * 1.8) / Math.max(1, node.children.length);
                    let startAngle = -Math.PI / 2 + (node.children.length - 1) * angleStep / 2;
                    const childRadius = 120;
                    node.children.forEach((child, i) => {
                        const angle = startAngle + i * angleStep;
                        const cx = x + childRadius * Math.cos(angle);
                        const cy = y + childRadius * Math.sin(angle);
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(cx, cy);
                        ctx.strokeStyle = '#334155';
                        ctx.lineWidth = 2;
                        ctx.stroke();
                        drawNode(child, cx, cy, depth + 1);
                    });
                }
            }

            if (nodes.length) {
                drawNode(nodes[0], w * nodes[0].x, h * nodes[0].y, 0);
            }
        }

        function addChild(parentText, childText) {
            function findNode(node) {
                if (node.text === parentText) return node;
                for (let child of node.children) {
                    const found = findNode(child);
                    if (found) return found;
                }
                return null;
            }
            const parent = findNode(nodes[0]);
            if (parent) {
                parent.children.push({ text: childText, children: [] });
                drawMindmap();
            } else {
                alert('Nodo padre no encontrado');
            }
        }

        document.getElementById('mindmapAdd').addEventListener('click', () => {
            const input = document.getElementById('mindmapInput');
            const text = input.value.trim();
            if (!text) return;
            const parentText = prompt('Nodo padre (deja vacío para raíz):') || nodes[0].text;
            addChild(parentText, text);
            input.value = '';
        });
        document.getElementById('mindmapReset').addEventListener('click', () => {
            nodes = [{ text: 'Proyecto', x: 0.5, y: 0.2, children: [] }];
            drawMindmap();
        });

        canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            const mx = (e.clientX - rect.left) / rect.width;
            const my = (e.clientY - rect.top) / rect.height;
            alert('Nodo seleccionado (simulación): ' + nodes[0].text);
        });

        resizeCanvas();
    }

    // 4.3 Actividad
    function renderActivity(container) {
        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:16px;">
                <div style="display:flex; gap:12px; flex-wrap:wrap;">
                    <button class="wb-action-btn" id="activityAdd">➕ Simular evento</button>
                    <button class="wb-action-btn" id="activityClear" style="color:#f87171;">🗑️ Limpiar</button>
                </div>
                <div class="activity-feed" id="activityFeed">
                    <div style="color:#94a3b8; text-align:center; padding:20px;">No hay actividad reciente</div>
                </div>
            </div>
        `;
        const feed = document.getElementById('activityFeed');
        const events = [
            { icon: '📌', text: 'Tarea "Diseño UI" completada por Ana', time: 'hace 2 min' },
            { icon: '🔄', text: 'Juan movió "Backend API" a En Progreso', time: 'hace 15 min' },
            { icon: '➕', text: 'Nueva tarea "Testing" creada por Carlos', time: 'hace 1 h' },
        ];

        function addEvent(icon, text) {
            const div = document.createElement('div');
            div.className = 'activity-item';
            div.innerHTML = `
                <span style="font-size:20px;">${icon}</span>
                <span style="flex:1; color:#e2e8f0;">${text}</span>
                <span style="color:#94a3b8; font-size:11px;">${new Date().toLocaleTimeString()}</span>
            `;
            feed.prepend(div);
            if (feed.children.length > 20) feed.removeChild(feed.lastChild);
        }

        events.forEach(e => addEvent(e.icon, e.text));

        document.getElementById('activityAdd').addEventListener('click', () => {
            const icons = ['📌', '🔄', '➕', '✅', '⚠️', '💬', '📋', '🔥'];
            const texts = [
                'Tarea actualizada por usuario',
                'Nuevo comentario en "Revisión"',
                'Hito alcanzado: Sprint 2',
                'Riesgo identificado en dependencias',
                'Documentación actualizada',
                'Reunión programada para mañana',
                'Versión 1.2 desplegada',
                'Feedback recibido del cliente'
            ];
            const icon = icons[Math.floor(Math.random() * icons.length)];
            const text = texts[Math.floor(Math.random() * texts.length)];
            addEvent(icon, text);
        });
        document.getElementById('activityClear').addEventListener('click', () => {
            feed.innerHTML = '<div style="color:#94a3b8; text-align:center; padding:20px;">Actividad limpiada</div>';
        });
    }

    // 4.4 Equipo
    function renderTeam(container) {
        let members = {};
        if (window.projects && window.currentProjectIndex !== undefined) {
            const project = window.projects[window.currentProjectIndex];
            if (project && project.tasks) {
                project.tasks.forEach(t => {
                    if (t.assignee) {
                        if (!members[t.assignee]) members[t.assignee] = { tasks: 0, completed: 0 };
                        members[t.assignee].tasks++;
                        if (t.status === 'completed') members[t.assignee].completed++;
                    }
                });
            }
        }
        const entries = Object.entries(members);
        if (entries.length === 0) {
            container.innerHTML = `<div style="color:#94a3b8; text-align:center; padding:40px;">No hay miembros asignados en este proyecto.</div>`;
            return;
        }
        let html = `<div class="team-grid">`;
        entries.forEach(([name, data]) => {
            const pct = data.tasks > 0 ? Math.round((data.completed / data.tasks) * 100) : 0;
            html += `
                <div class="team-card">
                    <div style="font-size:48px; margin-bottom:8px;">👤</div>
                    <div style="font-weight:600; color:white; font-size:16px;">${name}</div>
                    <div style="color:#94a3b8; font-size:13px;">${data.completed}/${data.tasks} tareas</div>
                    <div style="margin-top:10px; background:#1e293b; height:6px; border-radius:10px; overflow:hidden;">
                        <div style="width:${pct}%; height:100%; background:linear-gradient(90deg,#8b5cf6,#ec4899); border-radius:10px;"></div>
                    </div>
                    <div style="color:#a78bfa; font-size:12px; margin-top:6px;">${pct}% eficiencia</div>
                </div>
            `;
        });
        html += '</div>';
        container.innerHTML = html;
    }

    // 4.5 Mapa (CORREGIDO – Búsqueda 100% funcional con Google Maps Embed)
    function renderMap(container) {
        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:12px;">
                <div style="display:flex; gap:8px;">
                    <input type="text" id="mapSearch" placeholder="Buscar ubicación (ej: Madrid, Torre Eiffel)..." style="flex:1; padding:12px; background:#1e293b; border:1px solid #334155; border-radius:10px; color:white; font-size:14px;">
                    <button class="wb-action-btn" id="mapGo" style="padding: 12px 24px; font-weight:600;">🔍 Buscar</button>
                </div>
                <iframe id="mapFrame" style="width:100%; height:500px; border:none; border-radius:16px; border: 1px solid #334155;" src="https://maps.google.com/maps?q=Madrid&z=15&output=embed"></iframe>
            </div>
        `;
        const mapGo = document.getElementById('mapGo');
        const mapSearch = document.getElementById('mapSearch');
        const mapFrame = document.getElementById('mapFrame');

        function updateMap() {
            const query = mapSearch.value.trim();
            if (!query) return;
            // El formato output=embed de Google Maps sí responde correctamente al parámetro ?q= para centrar el mapa
            const url = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
            mapFrame.src = url;
        }

        mapGo.addEventListener('click', updateMap);
        mapSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                updateMap();
            }
        });
    }

    // 4.6 Embed genérico
    function renderEmbed(container, view) {
        const id = view.id;
        const placeholder = (id === 'googleSheets') ? 'URL de Google Sheets...' :
                            (id === 'googleDocs') ? 'URL de Google Docs...' :
                            (id === 'googleCalendar') ? 'URL de Google Calendar...' :
                            (id === 'googleMaps') ? 'URL de Google Maps...' :
                            (id === 'figma') ? 'URL de Figma...' :
                            (id === 'form') ? 'URL de Formulario...' :
                            'Pega aquí la URL...';
        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:16px;">
                <div class="embed-toolbar">
                    <input type="text" id="embedUrlInput_${id}" placeholder="${placeholder}" style="flex:1; padding:10px; background:#1e293b; border:1px solid #334155; border-radius:10px; color:white; min-width:200px;">
                    <button id="embedLoadBtn_${id}">🚀 Cargar</button>
                </div>
                <iframe id="embedFrame_${id}" style="width:100%; height:500px; border:none; border-radius:16px; background:white;" src="about:blank"></iframe>
            </div>
        `;
        document.getElementById(`embedLoadBtn_${id}`).addEventListener('click', () => {
            const url = document.getElementById(`embedUrlInput_${id}`).value.trim();
            if (!url) return;
            let finalUrl = url;
            if (!/^https?:\/\//i.test(url)) {
                finalUrl = 'https://' + url;
            }
            document.getElementById(`embedFrame_${id}`).src = finalUrl;
        });
        document.getElementById(`embedUrlInput_${id}`).addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById(`embedLoadBtn_${id}`).click();
            }
        });
    }

    // 4.7 YouTube
    function renderEmbedYoutube(container) {
        container.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:16px;">
                <div class="embed-toolbar">
                    <input type="text" id="youtubeSearchInput" placeholder="Buscar en YouTube..." style="flex:1; padding:10px; background:#1e293b; border:1px solid #334155; border-radius:10px; color:white; min-width:200px;">
                    <button id="youtubeSearchBtn">🔍 Buscar</button>
                    <span style="color:#94a3b8; font-size:13px;">o pega una URL de YouTube</span>
                </div>
                <div class="embed-toolbar" style="margin-top:-6px;">
                    <input type="text" id="youtubeUrlInput" placeholder="URL de YouTube (ej: https://www.youtube.com/watch?v=...)" style="flex:2; padding:10px; background:#1e293b; border:1px solid #334155; border-radius:10px; color:white; min-width:200px;">
                    <button id="youtubeLoadUrlBtn">📺 Cargar</button>
                </div>
                <iframe id="youtubeFrame" style="width:100%; height:500px; border:none; border-radius:16px; background:white;" src="about:blank"></iframe>
            </div>
        `;
        document.getElementById('youtubeSearchBtn').addEventListener('click', () => {
            const query = document.getElementById('youtubeSearchInput').value.trim();
            if (!query) return;
            const embedUrl = `https://www.youtube.com/embed?listType=search&search_query=${encodeURIComponent(query)}`;
            document.getElementById('youtubeFrame').src = embedUrl;
        });
        document.getElementById('youtubeLoadUrlBtn').addEventListener('click', () => {
            let url = document.getElementById('youtubeUrlInput').value.trim();
            if (!url) return;
            let embedUrl = url;
            const watchMatch = url.match(/watch\?v=([^&]+)/);
            if (watchMatch) {
                embedUrl = `https://www.youtube.com/embed/${watchMatch[1]}`;
            } else if (url.includes('youtu.be/')) {
                const id = url.split('youtu.be/')[1]?.split('?')[0];
                if (id) embedUrl = `https://www.youtube.com/embed/${id}`;
            } else if (!url.includes('embed')) {
                const idMatch = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
                if (idMatch) embedUrl = `https://www.youtube.com/embed/${idMatch[1]}`;
            }
            document.getElementById('youtubeFrame').src = embedUrl;
        });
        document.getElementById('youtubeSearchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') document.getElementById('youtubeSearchBtn').click();
        });
        document.getElementById('youtubeUrlInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') document.getElementById('youtubeLoadUrlBtn').click();
        });
    }

    // 4.8 Dashboard 4D (fallback)
    function renderDashboard4D(container) {
        container.innerHTML = `<p style="color:#94a3b8;">Usando la vista nativa de Dashboard 4D.</p>`;
    }

    // ============================================================
    // 5. LÓGICA PRINCIPAL DEL PANEL
    // ============================================================

    let currentLang = localStorage.getItem('evLang') || 'es';

    function createPanelStructure() {
        if (document.getElementById('executiveViewsOverlay')) return;
        const overlay = document.createElement('div');
        overlay.id = 'executiveViewsOverlay';
        overlay.className = 'executive-views-overlay';
        overlay.innerHTML = `
            <div class="executive-views-panel">
                <div class="ev-header">
                    <div class="ev-header-left">
                        <h2 id="evTitle">🧠 Executive Views 4D</h2>
                        <p id="evSubtitle">Panel de control avanzado · Selecciona una vista para desplegarla</p>
                    </div>
                    <div class="ev-header-right">
                        <button class="ev-lang-toggle" id="evLangToggle">🌐 ES / EN</button>
                        <button class="ev-close-btn" id="evClosePanel">✕</button>
                    </div>
                </div>
                <div id="evCategoriesContainer"></div>
                <div class="ev-view-container" id="evViewContainer">
                    <div class="ev-view-header">
                        <h3 id="evViewTitle">Vista seleccionada</h3>
                        <button id="evCloseView">✕ Cerrar vista</button>
                    </div>
                    <div class="ev-view-content" id="evViewContent">
                        <p style="color:#94a3b8; text-align:center; padding:40px;">Selecciona una vista del panel superior.</p>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    function updateLanguage() {
        const langData = LANG[currentLang] || LANG.es;
        const title = document.getElementById('evTitle');
        const subtitle = document.getElementById('evSubtitle');
        const closeView = document.getElementById('evCloseView');
        if (title) title.textContent = langData.title;
        if (subtitle) subtitle.textContent = langData.subtitle;
        if (closeView) closeView.textContent = langData.closeView;
        renderCategories();
    }

    function groupViews() {
        const groups = {};
        const langData = LANG[currentLang] || LANG.es;
        const viewNames = langData.views || {};
        const catNames = langData.categories || {};
        Object.values(VIEWS).forEach(v => {
            const catKey = v.category;
            const catDisplay = catNames[catKey] || catKey;
            if (!groups[catDisplay]) groups[catDisplay] = [];
            const viewInfo = viewNames[v.id] || { name: v.id, desc: '' };
            groups[catDisplay].push({
                ...v,
                displayName: viewInfo.name,
                displayDesc: viewInfo.desc
            });
        });
        return groups;
    }

    function renderCategories() {
        const container = document.getElementById('evCategoriesContainer');
        if (!container) return;
        const groups = groupViews();
        container.innerHTML = '';
        Object.keys(groups).forEach(cat => {
            const section = document.createElement('div');
            section.className = 'ev-category';
            section.innerHTML = `<h3>${cat}</h3><div class="ev-grid" data-category="${cat}"></div>`;
            container.appendChild(section);
            const grid = section.querySelector('.ev-grid');
            groups[cat].forEach(view => {
                const card = document.createElement('div');
                card.className = 'ev-card';
                card.dataset.viewId = view.id;
                card.innerHTML = `
                    <span class="ev-icon">${view.icon}</span>
                    <div class="ev-name">${view.displayName}</div>
                    <div class="ev-desc">${view.displayDesc}</div>
                    ${view.action === 'native' ? '<span class="ev-badge">✓</span>' : ''}
                `;
                card.addEventListener('click', () => openView(view.id));
                grid.appendChild(card);
            });
        });
    }

    function openView(viewId) {
        const view = VIEWS[viewId];
        if (!view) return;

        if (view.action === 'native') {
            closePanel();
            const funcName = NATIVE_VIEW_MAP[viewId];
            if (!funcName) {
                alert(`La vista "${viewId}" no tiene una función mapeada en NATIVE_VIEW_MAP.`);
                return;
            }
            if (typeof window[funcName] !== 'function') {
                alert(`La función "${funcName}" no existe en el sistema. Verifica el NATIVE_VIEW_MAP.`);
                return;
            }
            if (funcName === 'showView') {
                window[funcName](viewId);
            } else {
                window[funcName]();
            }
            return;
        }

        const container = document.getElementById('evViewContainer');
        const title = document.getElementById('evViewTitle');
        const content = document.getElementById('evViewContent');
        if (!container || !title || !content) return;

        container.classList.add('active');
        const langData = LANG[currentLang] || LANG.es;
        const viewNames = langData.views || {};
        const vInfo = viewNames[viewId] || { name: viewId, desc: '' };
        title.textContent = `${view.icon} ${vInfo.name}`;

        const renderFn = getRenderer(view);
        content.innerHTML = '';
        if (renderFn) {
            renderFn(content, view);
        } else {
            content.innerHTML = `<p style="color:#94a3b8;">Vista no implementada aún.</p>`;
        }
    }

    function getRenderer(view) {
        switch (view.action) {
            case 'renderWhiteboard': return renderWhiteboard;
            case 'renderMindmap': return renderMindmap;
            case 'renderActivity': return renderActivity;
            case 'renderTeam': return renderTeam;
            case 'renderMap': return renderMap;
            case 'renderDashboard4D': return renderDashboard4D;
            case 'embed': return renderEmbed;
            case 'embedYoutube': return renderEmbedYoutube;
            default: return null;
        }
    }

    function closePanel() {
        const overlay = document.getElementById('executiveViewsOverlay');
        const container = document.getElementById('evViewContainer');
        const content = document.getElementById('evViewContent');
        if (overlay) overlay.classList.remove('active');
        if (container) container.classList.remove('active');
        if (content) {
            const langData = LANG[currentLang] || LANG.es;
            content.innerHTML = `<p style="color:#94a3b8; text-align:center; padding:40px;">${langData.selectView}</p>`;
        }
    }

    function openPanel() {
        const overlay = document.getElementById('executiveViewsOverlay');
        if (overlay) {
            overlay.classList.add('active');
            updateLanguage();
        } else {
            createPanelStructure();
            setTimeout(() => {
                const ov = document.getElementById('executiveViewsOverlay');
                if (ov) ov.classList.add('active');
                updateLanguage();
            }, 50);
        }
    }

    // ============================================================
    // 6. INYECTAR BOTÓN EN EL SIDEBAR
    // ============================================================
    function injectSidebarButton() {
        const sidebar = document.querySelector('aside, #sidebar, .sidebar');
        if (!sidebar) {
            setTimeout(injectSidebarButton, 500);
            return;
        }
        if (document.getElementById('executiveViewsBtn')) return;

        const btn = document.createElement('button');
        btn.id = 'executiveViewsBtn';
        btn.className = 'executive-views-trigger';
        btn.innerHTML = `
            <i class="fas fa-cubes"></i>
            <span style="flex:1; font-weight:600;">Executive Views</span>
            <span class="badge-3d">4D</span>
        `;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openPanel();
        });
        const firstItem = sidebar.querySelector('li, .menu-item, .project-item, button');
        if (firstItem) {
            sidebar.insertBefore(btn, firstItem);
        } else {
            sidebar.appendChild(btn);
        }
        console.log('✅ Botón Executive Views añadido al sidebar.');
    }

    // ============================================================
    // 7. INICIALIZACIÓN
    // ============================================================
    document.addEventListener('DOMContentLoaded', function() {
        injectStyles();
        createPanelStructure();

        const closePanelBtn = document.getElementById('evClosePanel');
        const closeViewBtn = document.getElementById('evCloseView');
        const langToggle = document.getElementById('evLangToggle');
        const overlay = document.getElementById('executiveViewsOverlay');

        if (closePanelBtn) closePanelBtn.addEventListener('click', closePanel);
        if (closeViewBtn) {
            closeViewBtn.addEventListener('click', () => {
                const container = document.getElementById('evViewContainer');
                const content = document.getElementById('evViewContent');
                if (container) container.classList.remove('active');
                if (content) {
                    const langData = LANG[currentLang] || LANG.es;
                    content.innerHTML = `<p style="color:#94a3b8; text-align:center; padding:40px;">${langData.selectView}</p>`;
                }
            });
        }
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                currentLang = currentLang === 'es' ? 'en' : 'es';
                localStorage.setItem('evLang', currentLang);
                updateLanguage();
                const container = document.getElementById('evViewContainer');
                if (container && container.classList.contains('active')) {
                    const activeCard = document.querySelector('.ev-card');
                    if (activeCard) openView(activeCard.dataset.viewId);
                }
            });
        }
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closePanel();
            });
        }

        injectSidebarButton();
        updateLanguage();

        console.log('🧠 Executive Views 4D cargado (versión configurable).');
        console.log('📌 Para cambiar Gantt o Dashboard 4D, edita NATIVE_VIEW_MAP en el script.');
    });

    // Exponer API global
    window.executiveViews = {
        openPanel,
        closePanel,
        openView,
        VIEWS,
        setLanguage: (lang) => {
            if (LANG[lang]) { currentLang = lang; localStorage.setItem('evLang', lang); updateLanguage(); }
        }
    };

})();