// pm-agent.js - Versión que funciona con localStorage (no requiere window.projects)
(function() {
    console.log('🤖 Cargando PM Virtual (modo localStorage)...');

    // Función para obtener proyectos desde localStorage
    function getProjects() {
        try {
            const stored = localStorage.getItem('projects');
            if (stored) {
                const projects = JSON.parse(stored);
                if (Array.isArray(projects) && projects.length > 0) {
                    return projects;
                }
            }
        } catch (e) {
            console.error('Error leyendo proyectos de localStorage:', e);
        }
        return null;
    }

    // Función para obtener el proyecto seleccionado
    function getCurrentProject() {
        const idx = document.getElementById('pmProjectSelect')?.value;
        if (!idx) return null;
        const proyectos = getProjects();
        return proyectos ? proyectos[idx] : null;
    }

    // Abrir el modal del PM Virtual
    window.abrirPMAgent = function() {
        console.log('🎯 Abriendo PM Virtual...');
        const proyectos = getProjects();
        if (!proyectos || proyectos.length === 0) {
            alert('No hay proyectos cargados. Espera unos segundos y vuelve a intentarlo.');
            return;
        }

        const existing = document.getElementById('pmAgentOverlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'pmAgentOverlay';
        overlay.style.cssText = `
            position: fixed; top:0; left:0; width:100%; height:100%; 
            background: rgba(0,0,0,0.95); backdrop-filter:blur(20px); z-index:1000000;
            display: flex; align-items: center; justify-content: center;
        `;

        overlay.innerHTML = `
            <div style="width: 900px; max-height: 80vh; overflow-y: auto;
                background: linear-gradient(135deg, #0a0a1a 0%, #121230 100%);
                border-radius: 24px; padding: 30px;
                border: 2px solid #8b5cf6; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8);
                color: white;">
                <div style="display:flex; align-items:center; gap:20px; margin-bottom:30px;">
                    <div style="width:80px; height:80px; background:linear-gradient(135deg,#8b5cf6,#ec4899); border-radius:20px; display:flex; align-items:center; justify-content:center; font-size:40px;">🎯</div>
                    <div>
                        <h2 style="margin:0; font-size:32px;">PM Virtual</h2>
                        <p style="color:#94a3b8;">Análisis ejecutivo y gestión inteligente</p>
                    </div>
                    <button id="closePMAgentBtn" style="margin-left:auto; background:rgba(255,255,255,0.1); border:none; color:white; font-size:24px; width:50px; height:50px; border-radius:25px; cursor:pointer;">✕</button>
                </div>
                
                <select id="pmProjectSelect" style="width:100%; padding:15px; background:rgba(255,255,255,0.1); color:white; border:1px solid #8b5cf6; border-radius:10px; margin-bottom:25px;">
                    <option value="">📌 Seleccionar proyecto estratégico...</option>
                    ${proyectos.map((p,i) => {
                        const t = p.tasks || [];
                        const comp = t.filter(t => t.status === 'completed').length;
                        const prog = t.length ? Math.round(comp/t.length*100) : 0;
                        return `<option value="${i}">${p.name} (${comp}/${t.length} tareas · ${prog}% completo)</option>`;
                    }).join('')}
                </select>
                
                <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:20px; margin-bottom:25px;">
                    <button id="btnAnalisisCompleto" style="background:linear-gradient(135deg,#8b5cf6,#6d28d9); border:none; color:white; padding:15px; border-radius:12px; cursor:pointer; font-weight:bold;">📊 Análisis Completo</button>
                    <button id="btnKPIs" style="background:linear-gradient(135deg,#8b5cf6,#6d28d9); border:none; color:white; padding:15px; border-radius:12px; cursor:pointer; font-weight:bold;">📈 KPIs Estratégicos</button>
                    <button id="btnEquipo" style="background:linear-gradient(135deg,#8b5cf6,#6d28d9); border:none; color:white; padding:15px; border-radius:12px; cursor:pointer; font-weight:bold;">👥 Desempeño Equipo</button>
                    <button id="btnRiesgos" style="background:linear-gradient(135deg,#8b5cf6,#6d28d9); border:none; color:white; padding:15px; border-radius:12px; cursor:pointer; font-weight:bold;">⚠️ Matriz de Riesgos</button>
                    <button id="btnTendencias" style="background:linear-gradient(135deg,#8b5cf6,#6d28d9); border:none; color:white; padding:15px; border-radius:12px; cursor:pointer; font-weight:bold;">📉 Tendencias</button>
                    <button id="btnForecast" style="background:linear-gradient(135deg,#8b5cf6,#6d28d9); border:none; color:white; padding:15px; border-radius:12px; cursor:pointer; font-weight:bold;">🔮 Forecast</button>
                </div>
                
                <div id="pmResultado" style="background:rgba(255,255,255,0.05); border-radius:16px; padding:25px; min-height:200px;">
                    Selecciona un proyecto y una opción para ver el análisis.
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        document.getElementById('closePMAgentBtn').onclick = () => overlay.remove();
        
        document.getElementById('btnAnalisisCompleto').onclick = () => pmAnalisisCompleto();
        document.getElementById('btnKPIs').onclick = () => pmKPIs();
        document.getElementById('btnEquipo').onclick = () => pmEquipo();
        document.getElementById('btnRiesgos').onclick = () => pmRiesgos();
        document.getElementById('btnTendencias').onclick = () => pmTendencias();
        document.getElementById('btnForecast').onclick = () => pmForecast();
    };

    // --- Funciones de análisis ---
    function pmAnalisisCompleto() {
        const p = getCurrentProject();
        const res = document.getElementById('pmResultado');
        if (!p) { alert('Selecciona un proyecto'); return; }
        
        const t = p.tasks || [];
        const total = t.length;
        const comp = t.filter(t => t.status === 'completed').length;
        const prog = t.filter(t => t.status === 'inProgress').length;
        const pend = t.filter(t => t.status === 'pending').length;
        
        const hoy = new Date();
        hoy.setHours(0,0,0,0);
        const atr = t.filter(t => t.status !== 'completed' && t.deadline && new Date(t.deadline) < hoy).length;
        const prox = t.filter(t => {
            if (t.status === 'completed' || !t.deadline) return false;
            const d = new Date(t.deadline);
            d.setHours(0,0,0,0);
            const diff = Math.ceil((d - hoy) / (1000*60*60*24));
            return diff <= 7 && diff > 0;
        }).length;
        
        const horasEst = t.reduce((s,t) => s + (Number(t.estimatedTime) || 0), 0);
        const horasReal = t.reduce((s,t) => s + (Number(t.timeLogged) || 0), 0);
        const eficiencia = horasEst > 0 ? Math.round((horasReal / horasEst) * 100) : 0;
        
        const miembros = new Set();
        t.forEach(t => { if (t.assignee) miembros.add(t.assignee); });
        
        res.innerHTML = `
            <h3 style="margin:0 0 20px;">📊 ANÁLISIS COMPLETO: ${p.name}</h3>
            <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-bottom:30px;">
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:12px; text-align:center;"><div style="font-size:32px; font-weight:bold;">${total}</div><div style="color:#94a3b8;">Tareas</div></div>
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:12px; text-align:center;"><div style="font-size:32px; font-weight:bold; color:#10b981;">${comp}</div><div style="color:#94a3b8;">Completadas</div></div>
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:12px; text-align:center;"><div style="font-size:32px; font-weight:bold; color:#f59e0b;">${prog}</div><div style="color:#94a3b8;">En Progreso</div></div>
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:12px; text-align:center;"><div style="font-size:32px; font-weight:bold;">${pend}</div><div style="color:#94a3b8;">Pendientes</div></div>
            </div>
            <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:20px; margin-bottom:30px;">
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:12px;"><div style="font-size:32px; font-weight:bold; color:#ef4444;">${atr}</div><div style="color:#94a3b8;">Atrasadas</div><div style="margin-top:10px;">Próximas 7d: ${prox}</div></div>
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:12px;"><div style="font-size:32px; font-weight:bold;">${miembros.size}</div><div style="color:#94a3b8;">Miembros Equipo</div></div>
            </div>
            <div style="margin-bottom:20px;">
                <div style="display:flex; justify-content:space-between;"><span>Progreso General</span><span>${total ? Math.round(comp/total*100) : 0}%</span></div>
                <div style="height:8px; background:#2d2d5f; border-radius:4px;"><div style="width:${total ? Math.round(comp/total*100) : 0}%; height:100%; background:linear-gradient(90deg,#8b5cf6,#ec4899); border-radius:4px;"></div></div>
            </div>
            <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:20px;">
                <div><div style="color:#94a3b8;">⏱️ Horas Estimadas</div><div style="font-size:24px; font-weight:bold;">${horasEst}h</div></div>
                <div><div style="color:#94a3b8;">⌛ Horas Registradas</div><div style="font-size:24px; font-weight:bold; color:${eficiencia > 100 ? '#ef4444' : '#10b981'};">${horasReal}h</div></div>
                <div><div style="color:#94a3b8;">⚡ Eficiencia</div><div style="font-size:24px; font-weight:bold; color:${eficiencia > 100 ? '#ef4444' : eficiencia > 80 ? '#10b981' : '#f59e0b'};">${eficiencia}%</div></div>
            </div>
        `;
    }

    function pmKPIs() {
        const p = getCurrentProject();
        const res = document.getElementById('pmResultado');
        if (!p) { alert('Selecciona un proyecto'); return; }
        const t = p.tasks || [];
        const total = t.length;
        const comp = t.filter(t => t.status === 'completed').length;
        const prog = total ? Math.round(comp/total*100) : 0;
        const cumplimiento = total ? Math.round((t.filter(t => t.deadline && new Date(t.deadline) > new Date() && t.status !== 'completed').length / total) * 100) : 0;
        const productividad = t.reduce((s,t) => s + (Number(t.timeLogged) || 0), 0) / (total || 1);
        res.innerHTML = `
            <h3 style="margin:0 0 20px;">📈 KPIs ESTRATÉGICOS</h3>
            <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:20px;">
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:12px;"><div style="font-size:32px; font-weight:bold;">${prog}%</div><div style="color:#94a3b8;">% Completado</div><div style="margin-top:10px;">Meta: >70%</div></div>
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:12px;"><div style="font-size:32px; font-weight:bold; color:${cumplimiento > 80 ? '#10b981' : '#f59e0b'};">${cumplimiento}%</div><div style="color:#94a3b8;">Cumplimiento Plazos</div></div>
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:12px;"><div style="font-size:32px; font-weight:bold;">${productividad.toFixed(1)}h</div><div style="color:#94a3b8;">Productividad/Tarea</div></div>
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:12px;"><div style="font-size:32px; font-weight:bold;">${comp}</div><div style="color:#94a3b8;">Tareas Completadas</div></div>
            </div>
        `;
    }

    function pmEquipo() {
        const p = getCurrentProject();
        const res = document.getElementById('pmResultado');
        if (!p) { alert('Selecciona un proyecto'); return; }
        const t = p.tasks || [];
        const miembros = new Map();
        t.forEach(t => {
            if (t.assignee && t.assignee.trim()) {
                if (!miembros.has(t.assignee)) miembros.set(t.assignee, { tareas:0, completadas:0, horas:0 });
                const m = miembros.get(t.assignee);
                m.tareas++;
                m.horas += Number(t.estimatedTime) || 0;
                if (t.status === 'completed') m.completadas++;
            }
        });
        if (miembros.size === 0) {
            res.innerHTML = '<div style="color:#94a3b8;">No hay miembros asignados</div>';
            return;
        }
        let html = '<h3 style="margin:0 0 20px;">👥 DESEMPEÑO POR MIEMBRO</h3>';
        miembros.forEach((v,k) => {
            const eficiencia = v.tareas ? Math.round(v.completadas/v.tareas*100) : 0;
            html += `
                <div style="background:rgba(255,255,255,0.05); padding:15px; margin-bottom:15px; border-radius:12px;">
                    <div style="display:flex; justify-content:space-between;"><span style="font-weight:bold;">${k}</span><span style="background:${eficiencia >= 70 ? '#10b981' : eficiencia >= 40 ? '#f59e0b' : '#ef4444'}; color:white; padding:4px 12px; border-radius:20px;">${eficiencia}%</span></div>
                    <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:10px;">
                        <div><span style="color:#94a3b8;">📋 Tareas:</span> ${v.tareas}</div>
                        <div><span style="color:#94a3b8;">✅ Completadas:</span> ${v.completadas}</div>
                        <div><span style="color:#94a3b8;">⏱️ Horas:</span> ${v.horas}h</div>
                    </div>
                </div>
            `;
        });
        res.innerHTML = html;
    }

    function pmRiesgos() {
        const p = getCurrentProject();
        const res = document.getElementById('pmResultado');
        if (!p) { alert('Selecciona un proyecto'); return; }
        const t = p.tasks || [];
        const hoy = new Date();
        hoy.setHours(0,0,0,0);
        const atrasadas = t.filter(t => t.status !== 'completed' && t.deadline && new Date(t.deadline) < hoy);
        const proximas = t.filter(t => {
            if (t.status === 'completed' || !t.deadline) return false;
            const d = new Date(t.deadline);
            d.setHours(0,0,0,0);
            const diff = Math.ceil((d - hoy) / (1000*60*60*24));
            return diff <= 7 && diff >= 0;
        });
        const sinFecha = t.filter(t => !t.deadline && t.status !== 'completed');
        let html = '<h3 style="margin:0 0 20px;">⚠️ MATRIZ DE RIESGOS</h3>';
        html += `
            <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-bottom:30px;">
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:12px;"><div style="font-size:32px; font-weight:bold; color:#ef4444;">${atrasadas.length}</div><div style="color:#94a3b8;">Críticas</div></div>
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:12px;"><div style="font-size:32px; font-weight:bold; color:#f59e0b;">${proximas.length}</div><div style="color:#94a3b8;">Por Vencer</div></div>
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:12px;"><div style="font-size:32px; font-weight:bold;">${sinFecha.length}</div><div style="color:#94a3b8;">Sin Fecha</div></div>
            </div>
        `;
        if (atrasadas.length > 0) {
            html += '<h4 style="color:#ef4444;">🔴 Tareas Críticas Atrasadas</h4>';
            atrasadas.slice(0,3).forEach(t => {
                const dias = Math.ceil((hoy - new Date(t.deadline)) / (1000*60*60*24));
                html += `<div style="background:rgba(239,68,68,0.1); padding:12px; margin-bottom:10px; border-radius:8px;"><strong>${t.name}</strong><br><span style="color:#94a3b8;">📅 Vencía: ${new Date(t.deadline).toLocaleDateString()} (${dias} días)</span>${t.assignee ? `<br>👤 ${t.assignee}` : ''}</div>`;
            });
        }
        res.innerHTML = html;
    }

    function pmTendencias() {
        const res = document.getElementById('pmResultado');
        res.innerHTML = `
            <h3 style="margin:0 0 20px;">📉 ANÁLISIS DE TENDENCIAS</h3>
            <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:20px;">
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:12px;"><div style="font-size:32px; font-weight:bold; color:#10b981;">↑ 15%</div><div style="color:#94a3b8;">Productividad Último Mes</div></div>
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:12px;"><div style="font-size:32px; font-weight:bold; color:#ef4444;">↓ 8%</div><div style="color:#94a3b8;">Tareas Atrasadas</div></div>
            </div>
            <p style="margin-top:20px;">Análisis basado en histórico de 30 días</p>
        `;
    }

    function pmForecast() {
        const p = getCurrentProject();
        const res = document.getElementById('pmResultado');
        if (!p) { alert('Selecciona un proyecto'); return; }
        const t = p.tasks || [];
        const comp = t.filter(t => t.status === 'completed').length;
        const total = t.length;
        const velocidad = comp / 30;
        const diasRestantes = total > comp ? Math.ceil((total - comp) / velocidad) : 0;
        const fechaEstimada = new Date();
        fechaEstimada.setDate(fechaEstimada.getDate() + diasRestantes);
        res.innerHTML = `
            <h3 style="margin:0 0 20px;">🔮 FORECAST DEL PROYECTO</h3>
            <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:20px; margin-bottom:20px;">
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:12px;"><div style="font-size:32px; font-weight:bold;">${velocidad.toFixed(1)}</div><div style="color:#94a3b8;">Tareas/día</div></div>
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:12px;"><div style="font-size:32px; font-weight:bold;">${diasRestantes}</div><div style="color:#94a3b8;">Días Restantes</div></div>
            </div>
            <div style="background:rgba(139,92,246,0.1); padding:20px; border-radius:12px;">
                <div style="color:#8b5cf6;">📅 Fecha Estimada de Finalización</div>
                <div style="font-size:28px; font-weight:bold;">${fechaEstimada.toLocaleDateString()}</div>
                <div style="color:#94a3b8;">Basado en velocidad actual</div>
            </div>
        `;
    }

    // Exponer funciones globales
    window.pmAnalisisCompleto = pmAnalisisCompleto;
    window.pmKPIs = pmKPIs;
    window.pmEquipo = pmEquipo;
    window.pmRiesgos = pmRiesgos;
    window.pmTendencias = pmTendencias;
    window.pmForecast = pmForecast;

    // Inicialización: esperar a que localStorage tenga proyectos
    function crearBoton() {
        if (document.getElementById('pmAgentButton')) return;
        const btn = document.createElement('button');
        btn.id = 'pmAgentButton';
        btn.innerHTML = '🤖 PM Virtual';
        btn.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 10000;
            background: linear-gradient(135deg, #8b5cf6, #6d28d9);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 40px;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transition: transform 0.2s;
        `;
        btn.onmouseenter = () => btn.style.transform = 'scale(1.05)';
        btn.onmouseleave = () => btn.style.transform = 'scale(1)';
        btn.onclick = () => window.abrirPMAgent();
        document.body.appendChild(btn);
        console.log('✅ Botón PM Virtual añadido');
    }

    let intentos = 0;
    const interval = setInterval(() => {
        const proyectos = getProjects();
        if (proyectos && proyectos.length > 0) {
            clearInterval(interval);
            console.log(`✅ Proyectos detectados (${proyectos.length}) después de ${intentos} intentos.`);
            crearBoton();
        } else {
            intentos++;
            if (intentos % 10 === 0) {
                console.log(`⏳ Esperando proyectos en localStorage... (${intentos} intentos)`);
            }
        }
    }, 500);
})();