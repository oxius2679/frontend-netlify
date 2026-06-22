// ============================================
// 🚀 OPTIMIZAR AHORA - VERSIÓN FINAL DEFINITIVA
// Títulos con el mismo ancho exacto que las tareas
// ============================================

(function() {
    console.log('%c🎯 Creando "OPTIMIZAR AHORA" VERSIÓN FINAL DEFINITIVA...', 'color: #3b82f6; font-size: 14px;');
    
    // ========== 1. FUNCIÓN QUE ANALIZA Y DETECTA ACCIONES ==========
    function analizarAcciones() {
        const proyecto = projects[currentProjectIndex];
        if (!proyecto) return null;
        
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        
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
            
            // 2. DETECTAR TAREAS PARA MOVER A EN PROGRESO
            if (t.status === 'pending') {
                let razon = '';
                
                if (t.startDate) {
                    const startDate = new Date(t.startDate);
                    startDate.setHours(0, 0, 0, 0);
                    if (startDate <= hoy) {
                        razon = `fecha inicio ${t.startDate}`;
                    }
                }
                
                if (!razon && t.priority === 'alta') {
                    razon = `prioridad ALTA`;
                }
                
                if (!razon && t.deadline) {
                    const deadlineDate = new Date(t.deadline);
                    deadlineDate.setHours(0, 0, 0, 0);
                    const diffTime = deadlineDate - hoy;
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    
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
                }
            }
            
            // 3. DETECTAR TAREAS PARA SUBIR PRIORIDAD
            if (t.deadline && t.priority !== 'alta') {
                const deadlineDate = new Date(t.deadline);
                deadlineDate.setHours(0, 0, 0, 0);
                const diffTime = deadlineDate - hoy;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                if (diffDays <= 3 && diffDays >= 0) {
                    acciones.subirPrioridad.push({
                        tarea: t,
                        nombre: t.name,
                        prioridadActual: t.priority || 'media',
                        dias: diffDays
                    });
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
                }
            }
            
            // 5. DETECTAR TAREAS REZAGADAS
            if (t.deadline && t.status !== 'overdue' && t.status !== 'completed') {
                const deadlineDate = new Date(t.deadline);
                deadlineDate.setHours(0, 0, 0, 0);
                if (deadlineDate < hoy) {
                    acciones.marcarRezagada.push({
                        tarea: t,
                        nombre: t.name,
                        razon: `deadline ${t.deadline} (pasado hace ${Math.ceil((hoy - deadlineDate) / (1000 * 60 * 60 * 24))} días)`
                    });
                }
            }
            
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
                }
            }
        }
        
        return acciones;
    }
    
    // ========== 2. FUNCIÓN QUE EJECUTA SOLO LO SELECCIONADO ==========
    function ejecutarSeleccion(seleccion) {
        const proyecto = projects[currentProjectIndex];
        if (!proyecto) return 0;
        
        let cambios = 0;
        let accionesRealizadas = [];
        
        if (seleccion.asignar && seleccion.asignar.length > 0) {
            for (const item of seleccion.asignar) {
                item.tarea.assignee = item.asignadoA;
                accionesRealizadas.push(`👤 "${item.nombre}" → ASIGNADO a ${item.asignadoA}`);
                cambios++;
            }
        }
        
        if (seleccion.moverAProgreso && seleccion.moverAProgreso.length > 0) {
            for (const item of seleccion.moverAProgreso) {
                item.tarea.status = 'inProgress';
                if (!item.tarea.progress) item.tarea.progress = 10;
                accionesRealizadas.push(`🚀 "${item.nombre}" → EN PROGRESO (${item.razon})`);
                cambios++;
            }
        }
        
        if (seleccion.subirPrioridad && seleccion.subirPrioridad.length > 0) {
            for (const item of seleccion.subirPrioridad) {
                item.tarea.priority = 'alta';
                accionesRealizadas.push(`🔥 "${item.nombre}" → PRIORIDAD ALTA (vence en ${item.dias} días)`);
                cambios++;
            }
        }
        
        if (seleccion.completar && seleccion.completar.length > 0) {
            for (const item of seleccion.completar) {
                item.tarea.status = 'completed';
                item.tarea.progress = 100;
                accionesRealizadas.push(`✅ "${item.nombre}" → COMPLETADA (${item.razon})`);
                cambios++;
            }
        }
        
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
            
            const mensaje = `✅ OPTIMIZACIÓN COMPLETADA\n\n${accionesRealizadas.join('\n')}\n\n📊 Total: ${cambios} acción(es) ejecutada(s)`;
            alert(mensaje);
            
            setTimeout(agregarContadoresColumnas, 500);
        } else {
            alert('✅ No se seleccionaron acciones para ejecutar');
        }
        
        return cambios;
    }
    
    // ========== 3. FUNCIÓN PARA AGREGAR CONTADORES Y AJUSTAR TÍTULOS ==========
    function agregarContadoresColumnas() {
        console.log('🔄 Actualizando contadores y ajustando títulos...');
        
        const columnas = document.querySelectorAll('.column');
        let totalColumnas = 0;
        let totalTareas = 0;
        
        columnas.forEach(col => {
            const titulo = col.querySelector('h3');
            if (titulo) {
                const tasksContainer = col.querySelector('.tasks');
                if (tasksContainer) {
                    // Obtener el ancho REAL del contenedor de tareas (incluyendo padding)
                    const tasksWidth = tasksContainer.offsetWidth;
                    
                    // Obtener el padding del contenedor de tareas para ajustar exactamente
                    const tasksStyle = window.getComputedStyle(tasksContainer);
                    const tasksPaddingLeft = parseFloat(tasksStyle.paddingLeft) || 0;
                    const tasksPaddingRight = parseFloat(tasksStyle.paddingRight) || 0;
                    const tasksPaddingTotal = tasksPaddingLeft + tasksPaddingRight;
                    
                    // Calcular el ancho exacto que debe tener el título
                    // Debe ser el ancho del contenedor menos el padding
                    const tituloWidth = tasksWidth - tasksPaddingTotal;
                    
                    // Aplicar el ancho exacto al título
                    titulo.style.width = tituloWidth + 'px';
                    titulo.style.maxWidth = '100%';
                    titulo.style.display = 'block';
                    titulo.style.boxSizing = 'border-box';
                    
                    // Asegurar que el título no tenga margen que afecte el ancho
                    titulo.style.marginLeft = '0';
                    titulo.style.marginRight = '0';
                    titulo.style.paddingLeft = '0';
                    titulo.style.paddingRight = '0';
                    
                    // Mantener el margen inferior original para la altura
                    // No modificamos marginBottom para mantener la altura original
                    
                    const tasks = tasksContainer.querySelectorAll('.task-card');
                    const count = tasks.length;
                    totalTareas += count;
                    
                    // Buscar o crear el contador
                    let contador = col.querySelector('.task-counter');
                    if (!contador) {
                        contador = document.createElement('span');
                        contador.className = 'task-counter';
                        contador.style.cssText = `
                            margin-left: 12px;
                            background: rgba(59, 130, 246, 0.2);
                            padding: 2px 12px;
                            border-radius: 20px;
                            font-size: 13px;
                            color: #94a3b8;
                            font-weight: 600;
                            border: 1px solid rgba(59, 130, 246, 0.2);
                            display: inline-block;
                        `;
                        titulo.appendChild(contador);
                    }
                    
                    contador.textContent = `(${count})`;
                    totalColumnas++;
                }
            }
        });
        
        if (totalColumnas === 0) {
            console.log('⚠️ No se encontraron columnas. Reintentando...');
            setTimeout(agregarContadoresColumnas, 1000);
        } else {
            console.log(`✅ Contadores actualizados: ${totalTareas} tareas en ${totalColumnas} columnas`);
        }
    }
    
    // ========== 4. MOSTRAR PANEL CON CHECKBOXES ==========
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
        
        const modal = document.createElement('div');
        modal.id = 'optimizar-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.85);
            backdrop-filter: blur(10px);
            z-index: 10000000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: system-ui, sans-serif;
            padding: 20px;
            box-sizing: border-box;
        `;
        
        let html = `
            <div style="
                background: linear-gradient(135deg, #0f172a, #1e293b);
                border-radius: 24px;
                width: 100%;
                max-width: 950px;
                max-height: 85vh;
                overflow-y: auto;
                border: 2px solid #3b82f6;
                padding: 35px 40px;
                color: #e2e8f0;
                box-sizing: border-box;
                margin: 0 auto;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; width: 100%;">
                    <h2 style="margin: 0; color: #3b82f6; font-size: 26px;">🔍 OPTIMIZACIÓN DETECTADA</h2>
                    <button id="cerrar-modal-opt" style="background: none; border: none; color: #ef4444; font-size: 30px; cursor: pointer; padding: 0 15px;">✕</button>
                </div>
                
                <p style="margin-bottom: 25px; color: #94a3b8; width: 100%; font-size: 17px;">Se encontraron <strong style="color: #3b82f6;">${totalAcciones}</strong> acciones pendientes. Selecciona las que quieres aplicar:</p>
        `;
        
        // ASIGNAR
        if (acciones.asignar.length > 0) {
            html += `
                <div style="margin-bottom: 22px; border-left: 4px solid #10b981; padding-left: 18px; width: 100%; box-sizing: border-box;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; width: 100%;">
                        <input type="checkbox" id="select-all-asignar" style="width: 20px; height: 20px; cursor: pointer; flex-shrink: 0;">
                        <strong style="color: #10b981; font-size: 17px; flex: 1;">👤 ASIGNAR TAREAS SIN DUEÑO (${acciones.asignar.length})</strong>
                    </div>
                    <div style="width: 100%; padding-left: 32px; box-sizing: border-box;">
                        ${acciones.asignar.map((a, idx) => `
                            <div style="display: flex; align-items: flex-start; gap: 10px; margin: 7px 0; width: 100%;">
                                <input type="checkbox" class="accion-asignar" data-idx="${idx}" style="width: 18px; height: 18px; cursor: pointer; flex-shrink: 0; margin-top: 2px;">
                                <span style="font-size: 15px; flex: 1;">📌 "${a.nombre}" → <strong style="color: #10b981;">${a.asignadoA}</strong></span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        // MOVER A PROGRESO
        if (acciones.moverAProgreso.length > 0) {
            html += `
                <div style="margin-bottom: 22px; border-left: 4px solid #3b82f6; padding-left: 18px; width: 100%; box-sizing: border-box;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; width: 100%;">
                        <input type="checkbox" id="select-all-progreso" style="width: 20px; height: 20px; cursor: pointer; flex-shrink: 0;">
                        <strong style="color: #3b82f6; font-size: 17px; flex: 1;">🚀 MOVER A EN PROGRESO (${acciones.moverAProgreso.length})</strong>
                    </div>
                    <div style="width: 100%; padding-left: 32px; box-sizing: border-box;">
                        ${acciones.moverAProgreso.map((a, idx) => `
                            <div style="display: flex; align-items: flex-start; gap: 10px; margin: 7px 0; width: 100%;">
                                <input type="checkbox" class="accion-progreso" data-idx="${idx}" style="width: 18px; height: 18px; cursor: pointer; flex-shrink: 0; margin-top: 2px;">
                                <span style="font-size: 15px; flex: 1;">📌 "${a.nombre}" → <span style="color: #3b82f6;">${a.razon}</span></span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        // SUBIR PRIORIDAD
        if (acciones.subirPrioridad.length > 0) {
            html += `
                <div style="margin-bottom: 22px; border-left: 4px solid #f59e0b; padding-left: 18px; width: 100%; box-sizing: border-box;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; width: 100%;">
                        <input type="checkbox" id="select-all-prioridad" style="width: 20px; height: 20px; cursor: pointer; flex-shrink: 0;">
                        <strong style="color: #f59e0b; font-size: 17px; flex: 1;">🔥 SUBIR PRIORIDAD A ALTA (${acciones.subirPrioridad.length})</strong>
                    </div>
                    <div style="width: 100%; padding-left: 32px; box-sizing: border-box;">
                        ${acciones.subirPrioridad.map((a, idx) => `
                            <div style="display: flex; align-items: flex-start; gap: 10px; margin: 7px 0; width: 100%;">
                                <input type="checkbox" class="accion-prioridad" data-idx="${idx}" style="width: 18px; height: 18px; cursor: pointer; flex-shrink: 0; margin-top: 2px;">
                                <span style="font-size: 15px; flex: 1;">📌 "${a.nombre}" → <span style="color: #f59e0b;">${a.prioridadActual} → ALTA (vence en ${a.dias} días)</span></span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        // COMPLETAR
        if (acciones.completar.length > 0) {
            html += `
                <div style="margin-bottom: 22px; border-left: 4px solid #10b981; padding-left: 18px; width: 100%; box-sizing: border-box;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; width: 100%;">
                        <input type="checkbox" id="select-all-completar" style="width: 20px; height: 20px; cursor: pointer; flex-shrink: 0;">
                        <strong style="color: #10b981; font-size: 17px; flex: 1;">✅ COMPLETAR TAREAS (${acciones.completar.length})</strong>
                    </div>
                    <div style="width: 100%; padding-left: 32px; box-sizing: border-box;">
                        ${acciones.completar.map((a, idx) => `
                            <div style="display: flex; align-items: flex-start; gap: 10px; margin: 7px 0; width: 100%;">
                                <input type="checkbox" class="accion-completar" data-idx="${idx}" style="width: 18px; height: 18px; cursor: pointer; flex-shrink: 0; margin-top: 2px;">
                                <span style="font-size: 15px; flex: 1;">📌 "${a.nombre}" → <span style="color: #10b981;">${a.razon}</span></span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        // REZAGADAS
        if (acciones.marcarRezagada.length > 0) {
            html += `
                <div style="margin-bottom: 22px; border-left: 4px solid #ef4444; padding-left: 18px; width: 100%; box-sizing: border-box;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; width: 100%;">
                        <input type="checkbox" id="select-all-rezagada" style="width: 20px; height: 20px; cursor: pointer; flex-shrink: 0;">
                        <strong style="color: #ef4444; font-size: 17px; flex: 1;">⚠️ MARCAR COMO REZAGADAS (${acciones.marcarRezagada.length})</strong>
                    </div>
                    <div style="width: 100%; padding-left: 32px; box-sizing: border-box;">
                        ${acciones.marcarRezagada.map((a, idx) => `
                            <div style="display: flex; align-items: flex-start; gap: 10px; margin: 7px 0; width: 100%;">
                                <input type="checkbox" class="accion-rezagada" data-idx="${idx}" style="width: 18px; height: 18px; cursor: pointer; flex-shrink: 0; margin-top: 2px;">
                                <span style="font-size: 15px; flex: 1;">📌 "${a.nombre}" → <span style="color: #ef4444;">${a.razon || (a.dias ? `${a.dias} días y solo ${a.progreso}%` : '')}</span></span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        html += `
                <div style="display: flex; gap: 15px; justify-content: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #334155; width: 100%;">
                    <button id="aplicar-seleccion" style="background: #10b981; border: none; color: white; padding: 14px 40px; border-radius: 40px; cursor: pointer; font-weight: bold; font-size: 17px;">✅ APLICAR SELECCIÓN</button>
                    <button id="cancelar-seleccion" style="background: #475569; border: none; color: white; padding: 14px 40px; border-radius: 40px; cursor: pointer; font-weight: bold; font-size: 17px;">CANCELAR</button>
                </div>
            </div>
        `;
        
        modal.innerHTML = html;
        document.body.appendChild(modal);
        
        // Eventos para seleccionar/deseleccionar todo
        ['asignar', 'progreso', 'prioridad', 'completar', 'rezagada'].forEach(tipo => {
            const selectAll = document.getElementById(`select-all-${tipo}`);
            if (selectAll) {
                selectAll.onclick = (e) => {
                    document.querySelectorAll(`.accion-${tipo}`).forEach(cb => cb.checked = e.target.checked);
                };
            }
        });
        
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
        setTimeout(agregarContadoresColumnas, 300);
    };
    
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
        console.log('✅ Botón "OPTIMIZAR AHORA" agregado');
    } else {
        const header = document.querySelector('header, .header, #header, .main-header');
        if (header) {
            header.appendChild(optimizarBtn);
        } else {
            document.body.appendChild(optimizarBtn);
        }
    }
    
    // Agregar contadores automáticamente al cargar
    setTimeout(agregarContadoresColumnas, 500);
    
    // Interceptar renderKanbanTasks para actualizar contadores
    if (typeof renderKanbanTasks === 'function') {
        const originalRender = renderKanbanTasks;
        renderKanbanTasks = function() {
            originalRender();
            setTimeout(agregarContadoresColumnas, 300);
        };
    }
    
    console.log('%c✅ VERSIÓN FINAL DEFINITIVA - Lista!', 'color: #10b981; font-size: 16px; font-weight: bold;');
    console.log('%c📊 Los contadores se actualizan automáticamente', 'color: #3b82f6; font-size: 13px;');
    console.log('%c💡 Los títulos tienen el mismo ancho exacto que las tareas', 'color: #3b82f6; font-size: 13px;');
})();