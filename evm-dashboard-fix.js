// ============================================
// 📊 FIX COMPLETO PARA DASHBOARD EVM (VERSIÓN DEFINITIVA)
// ============================================

(function() {
    console.log('🔧 Aplicando fix para Dashboard EVM...');
    
    let graficoInicializado = false;
    
    // ========== 1. FUNCIÓN PARA CREAR/ACTUALIZAR GRÁFICO ==========
    function actualizarGraficoEVMDashboard() {
        const canvas = document.getElementById('evmChartCanvas');
        if (!canvas) return;
        
        // Obtener valores actuales
        const pvEl = document.getElementById('pvValue');
        const evEl = document.getElementById('evValue');
        const acEl = document.getElementById('acValue');
        
        let PV = 124, EV = 85.03, AC = 85;
        if (pvEl) PV = parseFloat(pvEl.textContent) || 124;
        if (evEl) EV = parseFloat(evEl.textContent) || 85.03;
        if (acEl) AC = parseFloat(acEl.textContent) || 85;
        
        const maxVal = Math.max(PV, EV, AC, 100);
        
        // Si el gráfico ya existe, solo actualizar datos
        if (window.evmChartInstance && graficoInicializado) {
            window.evmChartInstance.data.datasets[0].data = [PV, EV, AC];
            window.evmChartInstance.options.scales.y.max = maxVal;
            window.evmChartInstance.update();
            return;
        }
        
        // Configurar canvas SOLO UNA VEZ
        if (!graficoInicializado) {
            const container = canvas.parentElement;
            if (container) {
                container.style.cssText = `width:100%; min-height:280px; max-height:320px; overflow:visible; text-align:center; padding:10px 0;`;
            }
            canvas.style.cssText = `width:90% !important; max-width:500px !important; height:240px !important; display:block !important; margin:0 auto !important;`;
            canvas.width = 480;
            canvas.height = 240;
        }
        
        // Destruir anterior si existe
        if (window.evmChartInstance) {
            try { window.evmChartInstance.destroy(); } catch(e) {}
        }
        
        // Crear nuevo gráfico
        const ctx = canvas.getContext('2d');
        window.evmChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['PV', 'EV', 'AC'],
                datasets: [{
                    label: 'Horas',
                    data: [PV, EV, AC],
                    backgroundColor: ['rgba(59,130,246,0.8)', 'rgba(16,185,129,0.8)', AC > EV ? 'rgba(239,68,68,0.8)' : 'rgba(245,158,11,0.8)'],
                    borderRadius: 6,
                    barPercentage: 0.65
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: true,
                plugins: { legend: { position: 'top', labels: { font: { size: 11 } } } },
                scales: {
                    y: { beginAtZero: true, max: maxVal, ticks: { stepSize: Math.ceil(maxVal/5), callback: v => v + 'h' } }
                }
            }
        });
        
        graficoInicializado = true;
        console.log('✅ Gráfico EVM creado');
    }
    
    // ========== 2. FUNCIÓN PRINCIPAL DE ACTUALIZACIÓN ==========
    window.actualizarDashboardEVMCompleto = function() {
        const project = projects[currentProjectIndex];
        if (!project) return;
        
        const tasks = project.tasks || [];
        if (tasks.length === 0) return;
        
        // Calcular métricas
        let BAC = 0, AC = 0, EV = 0, PV = 0;
        
        tasks.forEach(task => {
            const estimado = Number(task.estimatedTime) || 0;
            const registrado = Number(task.timeLogged) || 0;
            const progress = Number(task.progress) || 0;
            const status = task.status || 'pending';
            
            BAC += estimado;
            AC += registrado;
            PV += estimado;
            
            let evProgreso = 0;
            if (progress > 0) evProgreso = progress / 100;
            else if (status === 'completed') evProgreso = 1;
            else if (status === 'inProgress') evProgreso = 0.5;
            EV += estimado * evProgreso;
        });
        
        const CPI = AC > 0 ? EV / AC : 1;
        const SPI = PV > 0 ? EV / PV : 1;
        const CV = EV - AC;
        const SV = EV - PV;
        const EAC = CPI > 0 ? BAC / CPI : BAC;
        const ETC = Math.max(0, EAC - AC);
        const VAC = BAC - EAC;
        
        // Actualizar elementos del DOM
        const elementos = {
            pv: document.getElementById('pvValue'),
            ev: document.getElementById('evValue'),
            ac: document.getElementById('acValue'),
            bac: document.getElementById('bacValue'),
            cpi: document.getElementById('cpiValue'),
            spi: document.getElementById('spiValue'),
            cv: document.getElementById('cvValue'),
            sv: document.getElementById('svValue'),
            eac: document.getElementById('eacValue') || document.getElementById('eacForecastValue'),
            etc: document.getElementById('etcValue') || document.getElementById('etcForecastValue'),
            vac: document.getElementById('vacValue') || document.getElementById('vacForecastValue'),
            narrative: document.getElementById('forecastNarrative')
        };
        
        if (elementos.pv) elementos.pv.textContent = `${PV.toFixed(2)} h`;
        if (elementos.ev) elementos.ev.textContent = `${EV.toFixed(2)} h`;
        if (elementos.ac) elementos.ac.textContent = `${AC.toFixed(2)} h`;
        if (elementos.bac) elementos.bac.textContent = `${BAC.toFixed(2)} h`;
        if (elementos.cpi) elementos.cpi.textContent = CPI.toFixed(2);
        if (elementos.spi) elementos.spi.textContent = SPI.toFixed(2);
        if (elementos.cv) elementos.cv.textContent = `${CV >= 0 ? '+' : ''}${CV.toFixed(2)} h`;
        if (elementos.sv) elementos.sv.textContent = `${SV >= 0 ? '+' : ''}${SV.toFixed(2)} h`;
        if (elementos.eac) elementos.eac.textContent = `${EAC.toFixed(2)} h`;
        if (elementos.etc) elementos.etc.textContent = `${ETC.toFixed(2)} h`;
        if (elementos.vac) elementos.vac.textContent = `${VAC >= 0 ? '+' : ''}${VAC.toFixed(2)} h`;
        if (elementos.narrative) {
            elementos.narrative.textContent = VAC < 0 ? '⚠️ El proyecto presenta riesgo de sobreconsumo de horas.' : '✅ El proyecto se mantiene dentro del plan de horas.';
        }
        
        // Actualizar elementos con "—"
        document.querySelectorAll('*').forEach(el => {
            if (el.textContent === '—') {
                const parent = el.parentElement;
                const txt = parent ? parent.innerText : '';
                if (txt.includes('EAC')) el.textContent = `${EAC.toFixed(2)} h`;
                else if (txt.includes('ETC')) el.textContent = `${ETC.toFixed(2)} h`;
                else if (txt.includes('VAC')) el.textContent = `${VAC >= 0 ? '+' : ''}${VAC.toFixed(2)} h`;
                else if (txt.includes('PV')) el.textContent = `${PV.toFixed(2)} h`;
                else if (txt.includes('EV')) el.textContent = `${EV.toFixed(2)} h`;
                else if (txt.includes('AC')) el.textContent = `${AC.toFixed(2)} h`;
            }
        });
        
        // Semáforo
        const banner = document.getElementById('evmStatusBanner');
        if (banner) {
            const color = SPI < 1 ? '#ef4444' : (CPI < 1 ? '#f59e0b' : '#10b981');
            banner.style.border = `2px solid ${color}`;
            banner.style.background = `${color}20`;
            banner.textContent = SPI < 1 ? '🔴 PROYECTO EN RIESGO · Requiere acción inmediata' : (CPI < 1 ? '🟡 PROYECTO CON OBSERVACIONES' : '🟢 PROYECTO SALUDABLE');
        }
        
        // Recomendaciones
        const recommendationsDiv = document.getElementById('evmRecommendations');
        if (recommendationsDiv) {
            recommendationsDiv.innerHTML = `<ul style="margin:0; padding-left:20px;"><li>📊 CPI: ${CPI.toFixed(2)} ${CPI >= 1 ? '✅ Eficiente' : '⚠️ Sobre costo'}</li><li>📈 SPI: ${SPI.toFixed(2)} ${SPI >= 1 ? '✅ Adelantado' : '⚠️ Retrasado'}</li><li>💡 Recomendación: ${SPI >= 1 && CPI >= 1 ? 'Mantener ritmo' : 'Priorizar tareas críticas'}</li></ul>`;
        }
        
        // Actualizar gráfico
        setTimeout(actualizarGraficoEVMDashboard, 50);
    };
    
    // ========== 3. CONECTAR CON EL BOTÓN ==========
    const originalOpenEVM = window.openEVMDashboard;
    if (originalOpenEVM) {
        window.openEVMDashboard = function() {
            originalOpenEVM();
            setTimeout(() => window.actualizarDashboardEVMCompleto(), 500);
            setTimeout(() => window.actualizarDashboardEVMCompleto(), 1000);
        };
    }
    
    // ========== 4. OBSERVADOR ==========
    const observer = new MutationObserver(() => {
        if (document.querySelector('#eacValue, [class*="EAC"]')) {
            setTimeout(window.actualizarDashboardEVMCompleto, 300);
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    
    console.log('✅ Fix para Dashboard EVM aplicado');
})();