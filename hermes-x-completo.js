// ============================================
// 🚀 OPTIMIZAR AHORA - VERSIÓN CORREGIDA Y MEJORADA
// Detecta correctamente fechas y acciones automáticas
// ============================================

(function() {
    console.log('%c🎯 Creando "OPTIMIZAR AHORA" con checkboxes (VERSIÓN CORREGIDA)...', 'color: #3b82f6; font-size: 14px;');
    
    // ========== 1. FUNCIÓN QUE ANALIZA Y DETECTA ACCIONES (CORREGIDA) ==========
    function analizarAcciones() {
        const proyecto = projects[currentProjectIndex];
        if (!proyecto) return null;
        
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);  // Normalizar a inicio del día
        
        console.log('📅 Fecha actual (normalizada):', hoy.toISOString().split('T')[0]);
        
        const acciones = {
            asignar: [],
            moverAProgreso: [],
            subirPrioridad: [],
            completar: [],
            marcarRezagada: []
        };
        
        // Calcular carga para asignaciones
        const miembrosConCarga = {};
        proyecto.tasks.forEach(t => {
            if (t.assignee && t.assignee !== '' && t.assignee !== 'Sin asignar' && t.status !== 'completed') {
                miembrosConCarga[t.assignee] = (miembrosConCarga[t.assignee] || 0) + 1;
            }
        });
        
        const MIEMBROS_POR_DEFECTO = ['Angel', 'Carlos', 'Maria', 'Juan', 'Ana'];
        let miembrosDisponibles = Object.keys(miembrosConCarga);
        if (miembrosDisponibles.length === 0) {
            miembrosDisponibles = [...MIEMBROS_POR_DEFECTO];
        }
        
        for (const t of proyecto.tasks) {
            if (t.status === 'completed') continue;
            
            // DEBUG: Mostrar tareas con deadline
            if (t.deadline) {
                const deadlineDate = new Date(t.deadline);
                deadlineDate.setHours(0, 0, 0, 0);
                const diffTime = deadlineDate - hoy;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                console.log(`📌 Tarea: "${t.name}", Deadline: ${t.deadline}, Días restantes: ${diffDays}, Prioridad: ${t.priority || 'media'}`);
            }
            
            // 1. DETECTAR TAREAS SIN ASIGNAR
            if (!t.assignee || t.assignee === '' || t.assignee === 'Sin asignar') {
                if (miembrosDisponibles.length > 0) {
                    let menosCargado = miembrosDisponibles[0];
                    let menorCarga = Infinity;
                    for (const m of miembrosDisponibles) {
                        const cargaActual = miembrosConCarga[m] || 0;
                        if (cargaActual < menorCarga) {
                            menorCarga = cargaActual;
                            menosCargado = m;
                        }
                    }
                    acciones.asignar.push({
                        tarea: t,
                        nombre: t.name,
                        asignadoA: menosCargado
                    });
                }
            }
            
            // 2. DETECTAR TAREAS PARA MOVER A EN PROGRESO (CORREGIDO)
            if (t.status === 'pending') {
                let razon = '';
                
                // Verificar fecha de inicio
                if (t.startDate) {
                    const startDate = new Date(t.startDate);
                    startDate.setHours(0, 0, 0, 0);
                    if (startDate <= hoy) {
                        razon = `fecha inicio ${t.startDate}`;
                    }
                }
                
                // Verificar prioridad alta (sin razon aún)
                if (!razon && t.priority === 'alta') {
                    razon = `prioridad ALTA`;
                }
                
                // Verificar deadline cercano (CORREGIDO: incluye hoy y hasta 3 días)
                if (!razon && t.deadline) {
                    const deadlineDate = new Date(t.deadline);
                    deadlineDate.setHours(0, 0, 0, 0);
                    const diffTime = deadlineDate - hoy;
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    
                    // CORRECCIÓN: Incluye días 0,1,2,3 (hoy, mañana, pasado, 3 días)
                    if (diffDays <= 3 && diffDays >= 0) {
                        razon = `vence en ${diffDays} días (${t.deadline})`;
                    } else if (diffDays < 0) {
                        razon = `YA VENCIDA (hace ${Math.abs(diffDays)} días)`;
                    }
                }
                
                if (razon) {
                    acciones.moverAProgreso.push({
                        tarea: t,
                        nombre: t.name,
                        razon: razon
                    });
                    console.log(`  ✅ Mover a progreso: "${t.name}" - ${razon}`);
                }
            }
            
            // 3. DETECTAR TAREAS PARA SUBIR PRIORIDAD (CORREGIDO)
            if (t.deadline && t.priority !== 'alta') {
                const deadlineDate = new Date(t.deadline);
                deadlineDate.setHours(0, 0, 0, 0);
                const diffTime = deadlineDate - hoy;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                // CORRECCIÓN: Subir prioridad si vence en 3 días o menos (incluye hoy)
                if (diffDays <= 3 && diffDays >= 0) {
                    acciones.subirPrioridad.push({
                        tarea: t,
                        nombre: t.name,
                        prioridadActual: t.priority || 'media',
                        dias: diffDays
                    });
                    console.log(`  🔥 Subir prioridad: "${t.name}" - vence en ${diffDays} días (actual: ${t.priority || 'media'})`);
                }
            }
            
            // 4. DETECTAR TAREAS PARA COMPLETAR
            if (t.status === 'inProgress') {
                let razon = '';
                if (t.progress >= 100) {
                    razon = 'progreso 100%';
                } else if (t.estimatedTime && t.timeLogged && t.timeLogged >= t.estimatedTime) {
                    razon = `horas completadas (${t.timeLogged}/${t.estimatedTime})`;
                }
                if (razon) {
                    acciones.completar.push({
                        tarea: t,
                        nombre: t.name,
                        razon: razon
                    });
                    console.log(`  ✅ Completar: "${t.name}" - ${razon}`);
                }
            }
            
            // 5. DETECTAR TAREAS REZAGADAS (CORREGIDO)
            if (t.deadline && t.status !== 'overdue' && t.status !== 'completed') {
                const deadlineDate = new Date(t.deadline);
                deadlineDate.setHours(0, 0, 0, 0);
                if (deadlineDate < hoy) {
                    acciones.marcarRezagada.push({
                        tarea: t,
                        nombre: t.name,
                        razon: `deadline ${t.deadline} (pasado hace ${Math.ceil((hoy - deadlineDate) / (1000 * 60 * 60 * 24))} días)`
                    });
                    console.log(`  ⚠️ Marcar rezagada: "${t.name}" - deadline pasado`);
                }
            }
            
            // Tareas en progreso con poco avance (CORREGIDO)
            if (t.status === 'inProgress' && t.status !== 'overdue' && t.startDate) {
                const startDate = new Date(t.startDate);
                startDate.setHours(0, 0, 0, 0);
                const diasEnProgreso = Math.ceil((hoy - startDate) / (1000 * 60 * 60 * 24));
                
                if (diasEnProgreso > 7 && (t.progress || 0) < 30) {
                    acciones.marcarRezagada.push({
                        tarea: t,
                        nombre: t.name,
                        dias: diasEnProgreso,
                        progreso: t.progress || 0,
                        razon: `${diasEnProgreso} días y solo ${t.progress || 0}% completado`
                    });
                    console.log(`  ⚠️ Marcar rezagada (progreso lento): "${t.name}" - ${diasEnProgreso} días, ${t.progress || 0}%`);
                }
            }
        }
        
        // Mostrar resumen en consola
        console.log('📊 RESUMEN DE ACCIONES DETECTADAS:');
        console.log(`  - Asignar: ${acciones.asignar.length}`);
        console.log(`  - Mover a progreso: ${acciones.moverAProgreso.length}`);
        console.log(`  - Subir prioridad: ${acciones.subirPrioridad.length}`);
        console.log(`  - Completar: ${acciones.completar.length}`);
        console.log(`  - Marcar rezagada: ${acciones.marcarRezagada.length}`);
        
        return acciones;
    }
    
    // ========== 2. FUNCIÓN QUE EJECUTA SOLO LO SELECCIONADO ==========
    function ejecutarSeleccion(seleccion) {
        const proyecto = projects[currentProjectIndex];
        if (!proyecto) return 0;
        
        let cambios = 0;
        let accionesRealizadas = [];
        
        // Asignar tareas
        if (seleccion.asignar && seleccion.asignar.length > 0) {
            for (const item of seleccion.asignar) {
                item.tarea.assignee = item.asignadoA;
                accionesRealizadas.push(`👤 "${item.nombre}" → ASIGNADO a ${item.asignadoA}`);
                cambios++;
            }
        }
        
        // Mover a EN PROGRESO
        if (seleccion.moverAProgreso && seleccion.moverAProgreso.length > 0) {
            for (const item of seleccion.moverAProgreso) {
                item.tarea.status = 'inProgress';
                if (!item.tarea.progress) item.tarea.progress = 10;
                accionesRealizadas.push(`🚀 "${item.nombre}" → EN PROGRESO (${item.razon})`);
                cambios++;
            }
        }
        
        // Subir prioridad
        if (seleccion.subirPrioridad && seleccion.subirPrioridad.length > 0) {
            for (const item of seleccion.subirPrioridad) {
                item.tarea.priority = 'alta';
                accionesRealizadas.push(`🔥 "${item.nombre}" → PRIORIDAD ALTA (vence en ${item.dias} días)`);
                cambios++;
            }
        }
        
        // Completar
        if (seleccion.completar && seleccion.completar.length > 0) {
            for (const item of seleccion.completar) {
                item.tarea.status = 'completed';
                item.tarea.progress = 100;
                accionesRealizadas.push(`✅ "${item.nombre}" → COMPLETADA (${item.razon})`);
                cambios++;
            }
        }
        
        // Marcar rezagada
        if (seleccion.marcarRezagada && seleccion.marcarRezagada.length > 0) {
            for (const item of seleccion.marcarRezagada) {
                item.tarea.status = 'overdue';
                const razon = item.dias ? `${item.dias} días y solo ${item.progreso}%` : item.razon;
                accionesRealizadas.push(`⚠️ "${item.nombre}" → REZAGADA (${razon})`);
                cambios++;
            }
        }
        
        if (cambios > 0) {
            if (typeof updateLocalStorage === 'function') updateLocalStorage();
            else localStorage.setItem('projects', JSON.stringify(projects));
            if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
            
            // Mostrar resumen bonito
            const mensaje = `✅ OPTIMIZACIÓN COMPLETADA\n\n${accionesRealizadas.join('\n')}\n\n📊 Total: ${cambios} acción(es) ejecutada(s)`;
            alert(mensaje);
        } else {
            alert('✅ No se seleccionaron acciones para ejecutar');
        }
        
        return cambios;
    }
    
    // ========== 3. MOSTRAR PANEL CON CHECKBOXES ==========
    function mostrarPanel() {
        const acciones = analizarAcciones();
        if (!acciones) {
            alert('❌ No hay proyecto seleccionado');
            return;
        }
        
        const totalAcciones = 
            acciones.asignar.length +
            acciones.moverAProgreso.length +
            acciones.subirPrioridad.length +
            acciones.completar.length +
            acciones.marcarRezagada.length;
        
        if (totalAcciones === 0) {
            alert('✅ No se detectaron acciones pendientes.\n\nTodo está en orden.');
            return;
        }
        
        // Crear modal
        const modal = document.createElement('div');
        modal.id = 'optimizar-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.85);
            backdrop-filter: blur(10px);
            z-index: 10000000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: system-ui, sans-serif;
        `;
        
        let html = `
            <div style="
                background: linear-gradient(135deg, #0f172a, #1e293b);
                border-radius: 24px;
                width: 600px;
                max-width: 90vw;
                max-height: 85vh;
                overflow-y: auto;
                border: 2px solid #3b82f6;
                padding: 25px;
                color: #e2e8f0;
            ">
                <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                    <h2 style="margin: 0; color: #3b82f6;">🔍 OPTIMIZACIÓN DETECTADA</h2>
                    <button id="cerrar-modal-opt" style="background: none; border: none; color: #ef4444; font-size: 24px; cursor: pointer;">✕</button>
                </div>
                
                <p style="margin-bottom: 20px; color: #94a3b8;">Se encontraron <strong style="color: #3b82f6;">${totalAcciones}</strong> acciones pendientes. Selecciona las que quieres aplicar:</p>
        `;
        
        // ASIGNAR
        if (acciones.asignar.length > 0) {
            html += `
                <div style="margin-bottom: 20px; border-left: 3px solid #10b981; padding-left: 15px;">
                    <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                        <input type="checkbox" id="select-all-asignar" style="width: 18px; height: 18px; cursor: pointer;">
                        <strong style="color: #10b981;">👤 ASIGNAR TAREAS SIN DUEÑO (${acciones.asignar.length})</strong>
                    </label>
                    <div id="lista-asignar" style="margin-left: 25px;">
                        ${acciones.asignar.map((a, idx) => `
                            <label style="display: flex; align-items: center; gap: 8px; margin: 8px 0; cursor: pointer;">
                                <input type="checkbox" class="accion-asignar" data-idx="${idx}" style="width: 16px; height: 16px; cursor: pointer;">
                                <span>📌 "${a.nombre.substring(0, 40)}" → <strong style="color: #10b981;">${a.asignadoA}</strong></span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        // MOVER A PROGRESO
        if (acciones.moverAProgreso.length > 0) {
            html += `
                <div style="margin-bottom: 20px; border-left: 3px solid #3b82f6; padding-left: 15px;">
                    <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                        <input type="checkbox" id="select-all-progreso" style="width: 18px; height: 18px; cursor: pointer;">
                        <strong style="color: #3b82f6;">🚀 MOVER A EN PROGRESO (${acciones.moverAProgreso.length})</strong>
                    </label>
                    <div id="lista-progreso" style="margin-left: 25px;">
                        ${acciones.moverAProgreso.map((a, idx) => `
                            <label style="display: flex; align-items: center; gap: 8px; margin: 8px 0; cursor: pointer;">
                                <input type="checkbox" class="accion-progreso" data-idx="${idx}" style="width: 16px; height: 16px; cursor: pointer;">
                                <span>📌 "${a.nombre.substring(0, 40)}" → <span style="color: #3b82f6;">${a.razon}</span></span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        // SUBIR PRIORIDAD
        if (acciones.subirPrioridad.length > 0) {
            html += `
                <div style="margin-bottom: 20px; border-left: 3px solid #f59e0b; padding-left: 15px;">
                    <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                        <input type="checkbox" id="select-all-prioridad" style="width: 18px; height: 18px; cursor: pointer;">
                        <strong style="color: #f59e0b;">🔥 SUBIR PRIORIDAD A ALTA (${acciones.subirPrioridad.length})</strong>
                    </label>
                    <div id="lista-prioridad" style="margin-left: 25px;">
                        ${acciones.subirPrioridad.map((a, idx) => `
                            <label style="display: flex; align-items: center; gap: 8px; margin: 8px 0; cursor: pointer;">
                                <input type="checkbox" class="accion-prioridad" data-idx="${idx}" style="width: 16px; height: 16px; cursor: pointer;">
                                <span>📌 "${a.nombre.substring(0, 40)}" → <span style="color: #f59e0b;">${a.prioridadActual} → ALTA (vence en ${a.dias} días)</span></span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        // COMPLETAR
        if (acciones.completar.length > 0) {
            html += `
                <div style="margin-bottom: 20px; border-left: 3px solid #10b981; padding-left: 15px;">
                    <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                        <input type="checkbox" id="select-all-completar" style="width: 18px; height: 18px; cursor: pointer;">
                        <strong style="color: #10b981;">✅ COMPLETAR TAREAS (${acciones.completar.length})</strong>
                    </label>
                    <div id="lista-completar" style="margin-left: 25px;">
                        ${acciones.completar.map((a, idx) => `
                            <label style="display: flex; align-items: center; gap: 8px; margin: 8px 0; cursor: pointer;">
                                <input type="checkbox" class="accion-completar" data-idx="${idx}" style="width: 16px; height: 16px; cursor: pointer;">
                                <span>📌 "${a.nombre.substring(0, 40)}" → <span style="color: #10b981;">${a.razon}</span></span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        // REZAGADAS
        if (acciones.marcarRezagada.length > 0) {
            html += `
                <div style="margin-bottom: 20px; border-left: 3px solid #ef4444; padding-left: 15px;">
                    <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; cursor: pointer;">
                        <input type="checkbox" id="select-all-rezagada" style="width: 18px; height: 18px; cursor: pointer;">
                        <strong style="color: #ef4444;">⚠️ MARCAR COMO REZAGADAS (${acciones.marcarRezagada.length})</strong>
                    </label>
                    <div id="lista-rezagada" style="margin-left: 25px;">
                        ${acciones.marcarRezagada.map((a, idx) => `
                            <label style="display: flex; align-items: center; gap: 8px; margin: 8px 0; cursor: pointer;">
                                <input type="checkbox" class="accion-rezagada" data-idx="${idx}" style="width: 16px; height: 16px; cursor: pointer;">
                                <span>📌 "${a.nombre.substring(0, 40)}" → <span style="color: #ef4444;">${a.razon || (a.dias ? `${a.dias} días y solo ${a.progreso}%` : '')}</span></span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        html += `
                <div style="display: flex; gap: 15px; justify-content: center; margin-top: 25px; padding-top: 15px; border-top: 1px solid #334155;">
                    <button id="aplicar-seleccion" style="background: #10b981; border: none; color: white; padding: 12px 25px; border-radius: 40px; cursor: pointer; font-weight: bold;">✅ APLICAR SELECCIÓN</button>
                    <button id="cancelar-seleccion" style="background: #475569; border: none; color: white; padding: 12px 25px; border-radius: 40px; cursor: pointer; font-weight: bold;">CANCELAR</button>
                </div>
            </div>
        `;
        
        modal.innerHTML = html;
        document.body.appendChild(modal);
        
        // Seleccionar/deseleccionar todo
        if (document.getElementById('select-all-asignar')) {
            document.getElementById('select-all-asignar').onclick = (e) => {
                document.querySelectorAll('.accion-asignar').forEach(cb => cb.checked = e.target.checked);
            };
        }
        if (document.getElementById('select-all-progreso')) {
            document.getElementById('select-all-progreso').onclick = (e) => {
                document.querySelectorAll('.accion-progreso').forEach(cb => cb.checked = e.target.checked);
            };
        }
        if (document.getElementById('select-all-prioridad')) {
            document.getElementById('select-all-prioridad').onclick = (e) => {
                document.querySelectorAll('.accion-prioridad').forEach(cb => cb.checked = e.target.checked);
            };
        }
        if (document.getElementById('select-all-completar')) {
            document.getElementById('select-all-completar').onclick = (e) => {
                document.querySelectorAll('.accion-completar').forEach(cb => cb.checked = e.target.checked);
            };
        }
        if (document.getElementById('select-all-rezagada')) {
            document.getElementById('select-all-rezagada').onclick = (e) => {
                document.querySelectorAll('.accion-rezagada').forEach(cb => cb.checked = e.target.checked);
            };
        }
        
        document.getElementById('aplicar-seleccion').onclick = () => {
            const seleccion = {
                asignar: [],
                moverAProgreso: [],
                subirPrioridad: [],
                completar: [],
                marcarRezagada: []
            };
            
            document.querySelectorAll('.accion-asignar:checked').forEach(cb => {
                const idx = parseInt(cb.dataset.idx);
                if (!isNaN(idx) && acciones.asignar[idx]) seleccion.asignar.push(acciones.asignar[idx]);
            });
            document.querySelectorAll('.accion-progreso:checked').forEach(cb => {
                const idx = parseInt(cb.dataset.idx);
                if (!isNaN(idx) && acciones.moverAProgreso[idx]) seleccion.moverAProgreso.push(acciones.moverAProgreso[idx]);
            });
            document.querySelectorAll('.accion-prioridad:checked').forEach(cb => {
                const idx = parseInt(cb.dataset.idx);
                if (!isNaN(idx) && acciones.subirPrioridad[idx]) seleccion.subirPrioridad.push(acciones.subirPrioridad[idx]);
            });
            document.querySelectorAll('.accion-completar:checked').forEach(cb => {
                const idx = parseInt(cb.dataset.idx);
                if (!isNaN(idx) && acciones.completar[idx]) seleccion.completar.push(acciones.completar[idx]);
            });
            document.querySelectorAll('.accion-rezagada:checked').forEach(cb => {
                const idx = parseInt(cb.dataset.idx);
                if (!isNaN(idx) && acciones.marcarRezagada[idx]) seleccion.marcarRezagada.push(acciones.marcarRezagada[idx]);
            });
            
            modal.remove();
            ejecutarSeleccion(seleccion);
        };
        
        document.getElementById('cancelar-seleccion').onclick = () => modal.remove();
        document.getElementById('cerrar-modal-opt').onclick = () => modal.remove();
    }
    
    // ========== 4. FUNCIÓN DE DIAGNÓSTICO (Útil para pruebas) ==========
    window.diagnosticarFechas = function() {
        const proyecto = projects[currentProjectIndex];
        if (!proyecto) return console.log('%c❌ No hay proyecto seleccionado', 'color: #ef4444;');
        
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        
        console.log('%c=== DIAGNÓSTICO DE FECHAS ===', 'color: #8b5cf6; font-size: 14px; font-weight: bold;');
        console.log('Fecha actual:', hoy.toISOString().split('T')[0]);
        
        let encontradas = 0;
        proyecto.tasks.forEach(t => {
            if (t.deadline && t.status !== 'completed') {
                const deadline = new Date(t.deadline);
                deadline.setHours(0, 0, 0, 0);
                const diffDays = Math.ceil((deadline - hoy) / (1000 * 60 * 60 * 24));
                
                console.log(`%c📌 "${t.name}"`, 'color: #f59e0b;');
                console.log(`   Deadline: ${t.deadline}`);
                console.log(`   Días restantes: ${diffDays}`);
                console.log(`   Prioridad actual: ${t.priority || 'media'}`);
                console.log(`   Estado: ${t.status}`);
                console.log(`   ¿Debería subir prioridad? ${diffDays <= 3 && diffDays >= 0 && t.priority !== 'alta' ? '✅ SÍ' : '❌ NO'}`);
                console.log('---');
                encontradas++;
            }
        });
        
        if (encontradas === 0) {
            console.log('✅ No se encontraron tareas con deadline');
        }
        
        return { total: encontradas };
    };
    
    // ========== 5. CREAR BOTÓN EN HEADER ==========
    const oldBtn = document.getElementById('optimizar-ahora-btn');
    if (oldBtn) oldBtn.remove();
    
    const optimizarBtn = document.createElement('button');
    optimizarBtn.id = 'optimizar-ahora-btn';
    optimizarBtn.innerHTML = '⚡ OPTIMIZAR AHORA';
    optimizarBtn.title = 'Analizar proyecto y seleccionar qué optimizar';
    optimizarBtn.style.cssText = `
        background: linear-gradient(135deg, #2563EB, #1E40AF) !important;
        color: white !important;
        border: none !important;
        border-radius: 50px !important;
        padding: 12px 28px !important;
        font-size: 16px !important;
        font-weight: bold !important;
        cursor: pointer !important;
        transition: all 0.3s ease !important;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3) !important;
        font-family: system-ui, 'Segoe UI', sans-serif !important;
        letter-spacing: 0.5px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 8px !important;
        margin-left: 10px !important;
    `;
    
    optimizarBtn.onmouseenter = () => {
        optimizarBtn.style.transform = 'translateY(-2px)';
        optimizarBtn.style.boxShadow = '0 8px 20px rgba(37, 99, 235, 0.5)';
    };
    optimizarBtn.onmouseleave = () => {
        optimizarBtn.style.transform = 'translateY(0)';
        optimizarBtn.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
    };
    
    optimizarBtn.onclick = () => {
        mostrarPanel();
    };
    
    // Insertar en header
    function encontrarYBotonPmVirtual() {
        let pmBtn = document.getElementById('boardUltimateBtn');
        if (!pmBtn) {
            const botones = document.querySelectorAll('button');
            for (const btn of botones) {
                if (btn.textContent.includes('PM Virtual') || btn.textContent.includes('PM IA')) {
                    pmBtn = btn;
                    break;
                }
            }
        }
        return pmBtn;
    }
    
    const pmBtn = encontrarYBotonPmVirtual();
    if (pmBtn && pmBtn.parentNode) {
        pmBtn.parentNode.insertBefore(optimizarBtn, pmBtn.nextSibling);
        console.log('✅ Botón "OPTIMIZAR AHORA" agregado al lado de PM Virtual');
    } else {
        const header = document.querySelector('header, .header, #header, .main-header');
        if (header) {
            header.appendChild(optimizarBtn);
            console.log('✅ Botón agregado en el header');
        } else {
            document.body.appendChild(optimizarBtn);
        }
    }
    
    console.log('%c✅ "OPTIMIZAR AHORA" con checkboxes - VERSIÓN CORREGIDA - Listo!', 'color: #10b981; font-size: 14px;');
    console.log('%c💡 Para diagnosticar fechas, escribe: diagnosticarFechas()', 'color: #8b5cf6; font-size: 12px;');
})();