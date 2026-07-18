// ============================================
// SOLUCIÓN UNIFICADA COMPLETA - CON GRÁFICAS Y SPI
// Dashboard EVM Costos + Valor Ganado + Cronograma
// ============================================
(function() {
    console.log('🚀 EVM UNIFICADO COMPLETO - Iniciando...');
    
    // Guardar funciones originales
    const originalCostos = window.openEVMDashboardCosts;
    const originalValorGanado = window.openEVMDashboard;
    const originalCrear = window.crearDashboardEVMCompleto;
    
    let modoActual = 'hours';
    
    // ========== 1. FUNCIÓN COSTOS ==========
    window.openEVMDashboardCosts = function() {
        console.log('💰 Abriendo DASHBOARD DE COSTOS');
        modoActual = 'costs';
        if (typeof originalCostos === 'function') {
            originalCostos();
        }
    };
    
    // ========== 2. FUNCIÓN VALOR GANADO ==========
    window.openEVMDashboard = function() {
        console.log('📊 Abriendo DASHBOARD DE VALOR GANADO (horas)');
        modoActual = 'hours';
        if (typeof originalValorGanado === 'function') {
            originalValorGanado();
        }
    };
    
    // ========== 3. INTERCEPTAR CREACIÓN ==========
    window.crearDashboardEVMCompleto = function() {
        if (modoActual === 'costs' && window.lastEVMPreviewData) {
            console.log('💰 Generando dashboard de COSTOS con gráficas y SPI');
            mostrarDashboardCostosCompleto(window.lastEVMPreviewData);
            return;
        }
        if (typeof originalCrear === 'function') {
            return originalCrear.apply(this, arguments);
        }
    };
    
    // ========== 4. FUNCIÓN PARA CALCULAR SPI ==========
    function calcularSPI(evm, tasks) {
        // PV (Planificado) ya está en evm.PV o evm.BAC
        const PV = evm.PV || evm.BAC;
        const EV = evm.EV;
        
        if (PV === 0) return { spi: 1, interpretacion: 'Sin datos suficientes', estado: 'neutral' };
        
        const spi = EV / PV;
        
        let interpretacion = '';
        let estado = '';
        let color = '';
        
        if (spi >= 1.05) {
            interpretacion = '🚀 ADELANTADO - Vas más rápido de lo planeado';
            estado = 'excelente';
            color = '#10b981';
        } else if (spi >= 0.95) {
            interpretacion = '✅ EN TIEMPO - El cronograma está bajo control';
            estado = 'bueno';
            color = '#3b82f6';
        } else if (spi >= 0.85) {
            interpretacion = '⚠️ LIGERO RETRASO - Requiere monitoreo';
            estado = 'atencion';
            color = '#f59e0b';
        } else if (spi >= 0.7) {
            interpretacion = '🔴 RETRASO SIGNIFICATIVO - Se requiere acción';
            estado = 'riesgo';
            color = '#f97316';
        } else {
            interpretacion = '💀 RETRASO CRÍTICO - Intervención urgente';
            estado = 'critico';
            color = '#ef4444';
        }
        
        return { spi: spi.toFixed(2), interpretacion, estado, color };
    }
    
    // ========== 5. DASHBOARD COMPLETO CON SPI ==========
    function mostrarDashboardCostosCompleto(evm) {
        console.log('📊 Generando dashboard de COSTOS completo con SPI...');
        
        const existing = document.getElementById('dashboard-evm-custom');
        if (existing) existing.remove();
        
        const ganttContainer = document.getElementById('premiumExecutiveGantt');
        if (!ganttContainer) {
            alert('❌ Abre el Gantt Ejecutivo primero');
            return;
        }
        
        // Obtener tareas para calcular SPI real
        const projectIndex = parseInt(ganttContainer.dataset.projectIndex) || window.currentProjectIndex || 0;
        const tasks = window.projects?.[projectIndex]?.tasks || [];
        
        // Calcular fechas del proyecto para SPI
        let fechaInicio = null;
        let fechaFin = null;
        let hoy = new Date();
        
        tasks.forEach(task => {
            if (task.startDate) {
                const start = new Date(task.startDate);
                if (!fechaInicio || start < fechaInicio) fechaInicio = start;
            }
            if (task.deadline) {
                const end = new Date(task.deadline);
                if (!fechaFin || end > fechaFin) fechaFin = end;
            }
        });
        
        // Calcular progreso temporal esperado vs real
        let tiempoTranscurrido = 0;
        let tiempoTotal = 1;
        let progresoTemporal = 0;
        
        if (fechaInicio && fechaFin) {
            tiempoTotal = Math.max(1, (fechaFin - fechaInicio) / (1000 * 60 * 60 * 24));
            tiempoTranscurrido = Math.max(0, (hoy - fechaInicio) / (1000 * 60 * 60 * 24));
            progresoTemporal = Math.min(100, (tiempoTranscurrido / tiempoTotal) * 100);
        }
        
        const BAC = evm.BAC;
        const EV = evm.EV;
        const AC = evm.AC;
        const CPI = evm.CPI;
        const PV = evm.PV || BAC;
        
        // Calcular SPI
        const spiData = calcularSPI(evm, tasks);
        const SPI = spiData.spi;
        
        const EAC = BAC / CPI;
        const ETC = EAC - AC;
        const VAC = BAC - EAC;
        const porcentajeCompletado = BAC > 0 ? ((EV / BAC) * 100).toFixed(1) : 0;
        const eficiencia = (CPI * 100).toFixed(1);
        
        // Determinar estado de costos
        let estadoTexto = '';
        let estadoColor = '';
        let estadoIcono = '';
        
        if (CPI >= 1.05) {
            estadoTexto = 'EXCELENTE';
            estadoColor = '#10b981';
            estadoIcono = '🏆';
        } else if (CPI >= 1.0) {
            estadoTexto = 'BUENO';
            estadoColor = '#3b82f6';
            estadoIcono = '✅';
        } else if (CPI >= 0.95) {
            estadoTexto = 'ATENCIÓN';
            estadoColor = '#f59e0b';
            estadoIcono = '⚠️';
        } else if (CPI >= 0.85) {
            estadoTexto = 'RIESGO';
            estadoColor = '#f97316';
            estadoIcono = '🔴';
        } else {
            estadoTexto = 'CRÍTICO';
            estadoColor = '#ef4444';
            estadoIcono = '💀';
        }
        
        // Recomendaciones (incluyendo SPI)
        let recomendaciones = [];
        
        if (CPI < 0.95) {
            recomendaciones.push('🔴 Revisar urgentemente horas registradas vs planificadas');
            recomendaciones.push('📊 Implementar control semanal de avance vs presupuesto');
        } else if (CPI < 1.0) {
            recomendaciones.push('🟡 Realizar seguimiento más estricto de las horas');
            recomendaciones.push('📋 Revisar estimaciones de tareas pendientes');
        } else if (CPI >= 1.1) {
            recomendaciones.push('🏆 Reconocer al equipo por la eficiencia lograda');
            recomendaciones.push('💰 Considerar aumentar alcance con el ahorro');
        } else {
            recomendaciones.push('✅ Mantener el ritmo actual de ejecución');
        }
        
        if (SPI < 0.95) {
            recomendaciones.push('⏰ Acelerar el ritmo de trabajo - Hay retraso en cronograma');
            recomendaciones.push('🎯 Priorizar tareas de la ruta crítica');
        } else if (SPI > 1.05) {
            recomendaciones.push('🚀 Excelente velocidad - Considerar adelantar entregas');
        } else {
            recomendaciones.push('📅 El cronograma está bajo control');
        }
        
        recomendaciones.push('📊 Continuar con monitoreo semanal de costos y tiempo');
        
        // Análisis combinado
        let analisisTexto = '';
        if (CPI >= 1.0 && SPI >= 0.95) {
            analisisTexto = '✅ PROYECTO SALUDABLE: Costos y cronograma bajo control. Excelente gestión.';
        } else if (CPI >= 1.0 && SPI < 0.95) {
            analisisTexto = '⚠️ ATENCIÓN CRONOGRAMA: Los costos están bien pero vas retrasado. Acelera el ritmo.';
        } else if (CPI < 1.0 && SPI >= 0.95) {
            analisisTexto = '⚠️ ATENCIÓN COSTOS: Vas en tiempo pero hay sobrecosto. Controla los gastos.';
        } else {
            analisisTexto = '🔴 ALERTA GENERAL: Tanto costos como cronograma están fuera de control. Intervención urgente.';
        }
        
        const dashboardId = 'dashboard-evm-custom-' + Date.now();
        
        const html = `
            <div id="${dashboardId}" style="
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.94);
                backdrop-filter: blur(10px);
                z-index: 1000000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                overflow-y: auto;
            ">
                <div style="
                    width: 95vw;
                    max-width: 1100px;
                    max-height: 90vh;
                    background: linear-gradient(135deg, #0a0a1a 0%, #121230 100%);
                    border-radius: 24px;
                    border: 2px solid ${estadoColor};
                    overflow-y: auto;
                ">
                    <!-- HEADER -->
                    <div style="
                        background: linear-gradient(90deg, #0a0a1a, #1a1a3a);
                        padding: 20px 30px;
                        border-bottom: 1px solid ${estadoColor}40;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        flex-wrap: wrap;
                        gap: 15px;
                    ">
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <div style="
                                background: linear-gradient(135deg, #f59e0b, #d97706);
                                width: 55px;
                                height: 55px;
                                border-radius: 16px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 28px;
                            ">💰</div>
                            <div>
                                <h2 style="margin: 0; color: white; font-size: 24px;">DASHBOARD EVM - COSTOS</h2>
                                <p style="margin: 5px 0 0 0; color: #94a3b8;">Análisis de Valor Ganado en Euros</p>
                            </div>
                        </div>
                        <div style="display: flex; gap: 12px;">
                            <button onclick="window.print()" style="
                                background: rgba(59,130,246,0.2);
                                border: 1px solid #3b82f6;
                                color: #3b82f6;
                                padding: 8px 18px;
                                border-radius: 8px;
                                cursor: pointer;
                                font-weight: bold;
                            ">🖨️ Imprimir</button>
                            <button onclick="document.getElementById('${dashboardId}').remove()" style="
                                background: rgba(231,76,60,0.2);
                                border: 1px solid #e74c3c;
                                color: #e74c3c;
                                padding: 8px 18px;
                                border-radius: 8px;
                                cursor: pointer;
                                font-weight: bold;
                            ">✕ Cerrar</button>
                        </div>
                    </div>
                    
                    <!-- CONTENIDO -->
                    <div style="padding: 30px;">
                        
                        <!-- ESTADO GENERAL (COSTOS + CRONOGRAMA) -->
                        <div style="
                            background: ${estadoColor}15;
                            border: 2px solid ${estadoColor};
                            border-radius: 16px;
                            padding: 20px;
                            margin-bottom: 30px;
                            text-align: center;
                        ">
                            <div style="font-size: 40px; margin-bottom: 5px;">${estadoIcono}</div>
                            <div style="font-size: 22px; font-weight: bold; color: ${estadoColor};">ESTADO COSTOS: ${estadoTexto}</div>
                            <div style="color: #cbd5e1; margin-top: 8px; font-size: 13px;">
                                CPI = ${CPI.toFixed(2)} · ${CPI >= 1 ? 'Eficiencia financiera' : 'Sobrecosto detectado'}
                            </div>
                            <div style="color: #cbd5e1; margin-top: 5px; font-size: 13px;">
                                SPI = ${SPI} · ${spiData.interpretacion}
                            </div>
                            <div style="margin-top: 12px; padding: 10px; background: rgba(0,0,0,0.2); border-radius: 10px;">
                                <span style="color: ${spiData.color};">${spiData.interpretacion}</span>
                            </div>
                        </div>
                        
                        <!-- ANÁLISIS COMBINADO -->
                        <div style="
                            background: rgba(139,92,246,0.1);
                            border-radius: 12px;
                            padding: 15px;
                            margin-bottom: 30px;
                            text-align: center;
                            border-left: 4px solid ${spiData.color};
                        ">
                            <div style="color: #c4b5fd; font-size: 12px;">📊 ANÁLISIS EJECUTIVO</div>
                            <div style="color: white; font-size: 14px; margin-top: 5px;">${analisisTexto}</div>
                        </div>
                        
                        <!-- KPIS PRINCIPALES -->
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 30px;">
                            <div style="background: rgba(59,130,246,0.15); border-radius: 12px; padding: 18px; text-align: center; border-left: 3px solid #3b82f6;">
                                <div style="color: #93c5fd; font-size: 11px;">BAC</div>
                                <div style="font-size: 28px; font-weight: bold; color: white;">€${BAC.toFixed(2)}</div>
                                <div style="color: #64748b; font-size: 10px;">Presupuesto Total</div>
                            </div>
                            <div style="background: rgba(16,185,129,0.15); border-radius: 12px; padding: 18px; text-align: center; border-left: 3px solid #10b981;">
                                <div style="color: #a7f3d0; font-size: 11px;">EV</div>
                                <div style="font-size: 28px; font-weight: bold; color: white;">€${EV.toFixed(2)}</div>
                                <div style="color: #64748b; font-size: 10px;">Valor Ganado</div>
                            </div>
                            <div style="background: rgba(239,68,68,0.15); border-radius: 12px; padding: 18px; text-align: center; border-left: 3px solid #ef4444;">
                                <div style="color: #fca5a5; font-size: 11px;">AC</div>
                                <div style="font-size: 28px; font-weight: bold; color: white;">€${AC.toFixed(2)}</div>
                                <div style="color: #64748b; font-size: 10px;">Costo Real</div>
                            </div>
                            <div style="background: rgba(139,92,246,0.15); border-radius: 12px; padding: 18px; text-align: center; border-left: 3px solid #8b5cf6;">
                                <div style="color: #c4b5fd; font-size: 11px;">CPI</div>
                                <div style="font-size: 28px; font-weight: bold; color: white;">${CPI.toFixed(2)}</div>
                                <div style="color: #64748b; font-size: 10px;">Índice de Costo</div>
                            </div>
                        </div>
                        
                        <!-- GRÁFICA 1: BARRAS EVM -->
                        <div style="
                            background: rgba(255,255,255,0.03);
                            border-radius: 16px;
                            padding: 20px;
                            margin-bottom: 30px;
                            border: 1px solid rgba(139,92,246,0.3);
                        ">
                            <h3 style="color: white; margin: 0 0 15px 0; font-size: 16px; display: flex; align-items: center; gap: 8px;">
                                <span style="color: #8b5cf6;">📊</span> Comparativa EVM (PV vs EV vs AC)
                            </h3>
                            <div style="height: 250px;">
                                <canvas id="evmChartCostos_${dashboardId}"></canvas>
                            </div>
                            <div style="display: flex; justify-content: center; gap: 25px; margin-top: 15px; flex-wrap: wrap;">
                                <div style="display: flex; align-items: center; gap: 6px;"><span style="width: 14px; height: 14px; background: #3b82f6; border-radius: 3px;"></span><span style="color: #94a3b8; font-size: 12px;">PV (€${PV.toFixed(2)})</span></div>
                                <div style="display: flex; align-items: center; gap: 6px;"><span style="width: 14px; height: 14px; background: #10b981; border-radius: 3px;"></span><span style="color: #94a3b8; font-size: 12px;">EV (€${EV.toFixed(2)})</span></div>
                                <div style="display: flex; align-items: center; gap: 6px;"><span style="width: 14px; height: 14px; background: #ef4444; border-radius: 3px;"></span><span style="color: #94a3b8; font-size: 12px;">AC (€${AC.toFixed(2)})</span></div>
                            </div>
                        </div>
                        
                        <!-- GRÁFICA 2: PROGRESO (DONA) -->
                        <div style="
                            background: rgba(255,255,255,0.03);
                            border-radius: 16px;
                            padding: 20px;
                            margin-bottom: 30px;
                            border: 1px solid rgba(139,92,246,0.3);
                        ">
                            <h3 style="color: white; margin: 0 0 15px 0; font-size: 16px; display: flex; align-items: center; gap: 8px;">
                                <span style="color: #10b981;">📈</span> Progreso del Presupuesto
                            </h3>
                            <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; align-items: center;">
                                <div style="width: 200px; height: 200px;">
                                    <canvas id="progressDonaCostos_${dashboardId}"></canvas>
                                </div>
                                <div style="display: flex; flex-direction: column; gap: 12px;">
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <span style="width: 16px; height: 16px; background: #10b981; border-radius: 50%;"></span>
                                        <span style="color: white;">Valor Ganado: <strong style="color: #10b981;">${porcentajeCompletado}%</strong></span>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <span style="width: 16px; height: 16px; background: #ef4444; border-radius: 50%;"></span>
                                        <span style="color: white;">Restante: <strong style="color: #ef4444;">${(100 - porcentajeCompletado).toFixed(1)}%</strong></span>
                                    </div>
                                    <div style="margin-top: 10px; padding: 12px; background: rgba(0,0,0,0.3); border-radius: 10px;">
                                        <div style="color: #94a3b8; font-size: 11px;">Eficiencia financiera</div>
                                        <div style="font-size: 22px; font-weight: bold; color: ${CPI >= 1 ? '#10b981' : '#ef4444'};">${eficiencia}%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- PRONÓSTICO -->
                        <div style="
                            background: rgba(139,92,246,0.1);
                            border-radius: 16px;
                            padding: 20px;
                            margin-bottom: 30px;
                            border: 1px solid rgba(139,92,246,0.3);
                        ">
                            <h3 style="color: #c4b5fd; margin: 0 0 15px 0; font-size: 16px; display: flex; align-items: center; gap: 8px;">
                                <span>🔮</span> Pronóstico del Proyecto
                            </h3>
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; text-align: center;">
                                <div style="background: rgba(59,130,246,0.15); border-radius: 10px; padding: 15px;">
                                    <div style="color: #93c5fd; font-size: 11px;">EAC</div>
                                    <div style="font-size: 22px; font-weight: bold; color: white;">€${EAC.toFixed(2)}</div>
                                    <div style="color: #64748b; font-size: 10px;">Estimado Final</div>
                                </div>
                                <div style="background: rgba(245,158,11,0.15); border-radius: 10px; padding: 15px;">
                                    <div style="color: #fde68a; font-size: 11px;">ETC</div>
                                    <div style="font-size: 22px; font-weight: bold; color: white;">€${ETC.toFixed(2)}</div>
                                    <div style="color: #64748b; font-size: 10px;">Para Completar</div>
                                </div>
                                <div style="background: ${VAC >= 0 ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'}; border-radius: 10px; padding: 15px;">
                                    <div style="color: ${VAC >= 0 ? '#a7f3d0' : '#fca5a5'}; font-size: 11px;">VAC</div>
                                    <div style="font-size: 22px; font-weight: bold; color: ${VAC >= 0 ? '#10b981' : '#ef4444'};">${VAC >= 0 ? '+' : '-'}€${Math.abs(VAC).toFixed(2)}</div>
                                    <div style="color: #64748b; font-size: 10px;">${VAC >= 0 ? 'Ahorro' : 'Sobrecosto'}</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- ANÁLISIS Y RECOMENDACIONES -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
                            <!-- Análisis -->
                            <div style="
                                background: rgba(255,255,255,0.03);
                                border-radius: 16px;
                                padding: 20px;
                                border: 1px solid rgba(139,92,246,0.3);
                            ">
                                <h3 style="color: #f59e0b; margin: 0 0 15px 0; font-size: 16px; display: flex; align-items: center; gap: 8px;">
                                    <span>📋</span> Análisis Detallado
                                </h3>
                                <div style="color: #cbd5e1; font-size: 13px; line-height: 1.7;">
                                    <p><strong>💰 Situación financiera:</strong> Presupuesto €${BAC.toFixed(2)} · Valor ganado €${EV.toFixed(2)} · Costo real €${AC.toFixed(2)}</p>
                                    <p><strong>⏰ Situación de tiempo:</strong> SPI = ${SPI} · ${spiData.interpretacion}</p>
                                    <p><strong>📊 Progreso:</strong> ${porcentajeCompletado}% del presupuesto completado</p>
                                    <p><strong>⚡ Eficiencia:</strong> ${eficiencia}% ${CPI >= 1 ? 'por debajo del presupuesto' : 'por encima del presupuesto'}</p>
                                    ${VAC < 0 ? `<p><strong>⚠️ Alerta:</strong> Sobrecosto estimado de <strong>€${Math.abs(VAC).toFixed(2)}</strong></p>` : `<p><strong>✅ Buenas noticias:</strong> Ahorro estimado de <strong>€${VAC.toFixed(2)}</strong></p>`}
                                </div>
                            </div>
                            
                            <!-- Recomendaciones -->
                            <div style="
                                background: rgba(255,255,255,0.03);
                                border-radius: 16px;
                                padding: 20px;
                                border: 1px solid rgba(139,92,246,0.3);
                            ">
                                <h3 style="color: #10b981; margin: 0 0 15px 0; font-size: 16px; display: flex; align-items: center; gap: 8px;">
                                    <span>💡</span> Recomendaciones
                                </h3>
                                <ul style="color: #cbd5e1; font-size: 13px; line-height: 1.7; margin: 0; padding-left: 20px;">
                                    ${recomendaciones.map(rec => `<li style="margin-bottom: 8px;">${rec}</li>`).join('')}
                                </ul>
                                <div style="margin-top: 15px; padding: 12px; background: rgba(0,0,0,0.2); border-radius: 10px;">
                                    <div style="color: #94a3b8; font-size: 11px;">📅 Próxima revisión</div>
                                    <div style="color: white; font-size: 13px;">${new Date(Date.now() + 7*86400000).toLocaleDateString('es-ES')}</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- PIE -->
                        <div style="margin-top: 25px; padding: 15px; background: rgba(0,0,0,0.2); border-radius: 10px; text-align: center;">
                            <p style="color: #64748b; font-size: 10px; margin: 0;">
                                Reporte generado automáticamente · Datos de configuración de costos<br>
                                ${new Date().toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        ganttContainer.insertAdjacentHTML('beforeend', html);
        
        // Inicializar gráficas
        setTimeout(() => {
            const ctx1 = document.getElementById(`evmChartCostos_${dashboardId}`)?.getContext('2d');
            if (ctx1 && typeof Chart !== 'undefined') {
                new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ['PV', 'EV', 'AC'],
        datasets: [{
            label: 'Euros (€)',
            data: [PV, EV, AC],  // ✅ AHORA USA LA VARIABLE PV CORRECTA
            backgroundColor: ['#3b82f6', '#10b981', AC > EV ? '#ef4444' : '#f59e0b'],
            borderRadius: 8,
            barPercentage: 0.6
        }]
    },

                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: { legend: { display: false } },
                        scales: {
                            y: { beginAtZero: true, ticks: { callback: (v) => '€' + v.toFixed(0) } }
                        }
                    }
                });
            }
            
            const ctx2 = document.getElementById(`progressDonaCostos_${dashboardId}`)?.getContext('2d');
            if (ctx2 && typeof Chart !== 'undefined') {
                new Chart(ctx2, {
                    type: 'doughnut',
                    data: {
                        labels: ['Valor Ganado', 'Restante'],
                        datasets: [{
                            data: [porcentajeCompletado, 100 - porcentajeCompletado],
                            backgroundColor: ['#10b981', '#ef4444'],
                            borderWidth: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        cutout: '65%',
                        plugins: { legend: { display: false } }
                    }
                });
            }
        }, 100);
        
        console.log('✅ Dashboard de COSTOS con gráficas y SPI cargado');
    }
    
    // ========== 6. OBSERVADOR DE SEGURIDAD ==========
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
    
    console.log('✅ SISTEMA COMPLETO LISTO - CON SPI Y CRONOGRAMA');
    console.log('   Ahora puedes ver el estado de COSTOS y CRONOGRAMA en un solo dashboard');
})();