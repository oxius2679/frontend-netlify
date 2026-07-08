// ============================================
// 🚀 OPTIMIZAR AHORA - VERSIÓN CON DICCIONARIO INTERNO
// ============================================

(function() {
    'use strict';

    console.log('%c🎯 Iniciando "OPTIMIZAR AHORA" con diccionario interno...', 'color: #3b82f6; font-size: 14px;');

    // ============================================================
    // 1. DICCIONARIO DE TRADUCCIONES INTERNO (NO DEPENDE DE window.translations)
    // ============================================================
    const TRADUCCIONES = {
        es: {
            opt_boton: '⚡ OPTIMIZAR AHORA',
            opt_titulo: '🔍 OPTIMIZACIÓN DETECTADA',
            opt_acciones_encontradas: 'Se encontraron <strong style="color: #3b82f6;">{total}</strong> acciones pendientes. Selecciona las que quieres aplicar:',
            opt_asignar_titulo: '👤 ASIGNAR TAREAS SIN DUEÑO ({count})',
            opt_mover_progreso_titulo: '🚀 MOVER A EN PROGRESO ({count})',
            opt_subir_prioridad_titulo: '🔥 SUBIR PRIORIDAD A ALTA ({count})',
            opt_completar_titulo: '✅ COMPLETAR TAREAS ({count})',
            opt_rezagadas_titulo: '⚠️ MARCAR COMO REZAGADAS ({count})',
            opt_btn_aplicar: '✅ APLICAR SELECCIÓN',
            opt_btn_cancelar: 'CANCELAR',
            opt_cerrar: '✕',
            opt_mensaje_no_proyecto: '❌ No hay proyecto seleccionado',
            opt_mensaje_sin_acciones: '✅ No se detectaron acciones pendientes.\n\nTodo está en orden.',
            opt_mensaje_acciones_aplicadas: '✅ OPTIMIZACIÓN COMPLETADA\n\n{acciones}\n\n📊 Total: {total} acción(es) ejecutada(s)',
            opt_mensaje_no_seleccion: '✅ No se seleccionaron acciones para ejecutar',
            opt_accion_asignar: '👤 "{nombre}" → ASIGNADO a {asignado}',
            opt_accion_progreso: '🚀 "{nombre}" → EN PROGRESO ({razon})',
            opt_accion_prioridad: '🔥 "{nombre}" → PRIORIDAD ALTA (vence en {dias} días)',
            opt_accion_completar: '✅ "{nombre}" → COMPLETADA ({razon})',
            opt_accion_rezagada: '⚠️ "{nombre}" → REZAGADA ({razon})',
            opt_razon_fecha_inicio: 'fecha inicio {fecha}',
            opt_razon_prioridad_alta: 'prioridad ALTA',
            opt_razon_vence_en: 'vence en {dias} días ({fecha})',
            opt_razon_ya_vencida: 'YA VENCIDA (hace {dias} días)',
            opt_razon_horas_completadas: 'horas completadas ({registradas}/{estimadas})',
            opt_razon_deadline_pasado: 'deadline {fecha} (pasado hace {dias} días)',
            opt_razon_dias_progreso: '{dias} días y solo {progreso}% completado',
            opt_prioridad_media: 'media'
        },
        en: {
            opt_boton: '⚡ OPTIMIZE NOW',
            opt_titulo: '🔍 OPTIMIZATION DETECTED',
            opt_acciones_encontradas: '<strong style="color: #3b82f6;">{total}</strong> pending actions found. Select the ones you want to apply:',
            opt_asignar_titulo: '👤 ASSIGN UNASSIGNED TASKS ({count})',
            opt_mover_progreso_titulo: '🚀 MOVE TO IN PROGRESS ({count})',
            opt_subir_prioridad_titulo: '🔥 RAISE PRIORITY TO HIGH ({count})',
            opt_completar_titulo: '✅ COMPLETE TASKS ({count})',
            opt_rezagadas_titulo: '⚠️ MARK AS OVERDUE ({count})',
            opt_btn_aplicar: '✅ APPLY SELECTION',
            opt_btn_cancelar: 'CANCEL',
            opt_cerrar: '✕',
            opt_mensaje_no_proyecto: '❌ No project selected',
            opt_mensaje_sin_acciones: '✅ No pending actions detected.\n\nEverything is in order.',
            opt_mensaje_acciones_aplicadas: '✅ OPTIMIZATION COMPLETED\n\n{acciones}\n\n📊 Total: {total} action(s) executed',
            opt_mensaje_no_seleccion: '✅ No actions were selected to execute',
            opt_accion_asignar: '👤 "{nombre}" → ASSIGNED to {asignado}',
            opt_accion_progreso: '🚀 "{nombre}" → IN PROGRESS ({razon})',
            opt_accion_prioridad: '🔥 "{nombre}" → HIGH PRIORITY (due in {dias} days)',
            opt_accion_completar: '✅ "{nombre}" → COMPLETED ({razon})',
            opt_accion_rezagada: '⚠️ "{nombre}" → OVERDUE ({razon})',
            opt_razon_fecha_inicio: 'start date {fecha}',
            opt_razon_prioridad_alta: 'HIGH priority',
            opt_razon_vence_en: 'due in {dias} days ({fecha})',
            opt_razon_ya_vencida: 'ALREADY OVERDUE ({dias} days ago)',
            opt_razon_horas_completadas: 'hours completed ({registradas}/{estimadas})',
            opt_razon_deadline_pasado: 'deadline {fecha} (passed {dias} days ago)',
            opt_razon_dias_progreso: '{dias} days and only {progreso}% completed',
            opt_prioridad_media: 'medium'
        }
    };

    // ============================================================
    // 2. FUNCIÓN DE TRADUCCIÓN (usa el diccionario interno)
    // ============================================================
    function _t(key) {
        const lang = localStorage.getItem('preferredLanguage') || 'es';
        const translations = TRADUCCIONES[lang];
        if (translations && translations[key] !== undefined) {
            return translations[key];
        }
        // Fallback: intentar en el otro idioma
        const fallbackLang = lang === 'es' ? 'en' : 'es';
        const fallbackTranslations = TRADUCCIONES[fallbackLang];
        if (fallbackTranslations && fallbackTranslations[key] !== undefined) {
            return fallbackTranslations[key];
        }
        console.warn(`⚠️ Traducción no encontrada: ${key} (${lang})`);
        return key;
    }

    // ============================================================
    // 3. FUNCIONES DE ANÁLISIS (sin cambios, pero usando _t() donde corresponde)
    // ============================================================
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

            if (t.status === 'pending') {
                let razon = '';
                if (t.startDate) {
                    const startDate = new Date(t.startDate);
                    startDate.setHours(0, 0, 0, 0);
                    if (startDate <= hoy) {
                        razon = _t('opt_razon_fecha_inicio').replace('{fecha}', t.startDate);
                    }
                }
                if (!razon && t.priority === 'alta') {
                    razon = _t('opt_razon_prioridad_alta');
                }
                if (!razon && t.deadline) {
                    const deadlineDate = new Date(t.deadline);
                    deadlineDate.setHours(0, 0, 0, 0);
                    const diffDays = Math.ceil((deadlineDate - hoy) / (1000 * 60 * 60 * 24));
                    if (diffDays <= 3 && diffDays >= 0) {
                        razon = _t('opt_razon_vence_en').replace('{dias}', diffDays).replace('{fecha}', t.deadline);
                    } else if (diffDays < 0) {
                        razon = _t('opt_razon_ya_vencida').replace('{dias}', Math.abs(diffDays));
                    }
                }
                if (razon) {
                    acciones.moverAProgreso.push({ tarea: t, nombre: t.name, razon: razon });
                }
            }

            if (t.deadline && t.priority !== 'alta') {
                const deadlineDate = new Date(t.deadline);
                deadlineDate.setHours(0, 0, 0, 0);
                const diffDays = Math.ceil((deadlineDate - hoy) / (1000 * 60 * 60 * 24));
                if (diffDays <= 3 && diffDays >= 0) {
                    acciones.subirPrioridad.push({
                        tarea: t,
                        nombre: t.name,
                        prioridadActual: t.priority || _t('opt_prioridad_media'),
                        dias: diffDays
                    });
                }
            }

            if (t.status === 'inProgress') {
                let razon = '';
                if (t.progress >= 100) {
                    razon = 'progreso 100%';
                } else if (t.estimatedTime && t.timeLogged && t.timeLogged >= t.estimatedTime) {
                    razon = _t('opt_razon_horas_completadas').replace('{registradas}', t.timeLogged).replace('{estimadas}', t.estimatedTime);
                }
                if (razon) {
                    acciones.completar.push({ tarea: t, nombre: t.name, razon: razon });
                }
            }

            if (t.deadline && t.status !== 'overdue' && t.status !== 'completed') {
                const deadlineDate = new Date(t.deadline);
                deadlineDate.setHours(0, 0, 0, 0);
                if (deadlineDate < hoy) {
                    const diffDays = Math.ceil((hoy - deadlineDate) / (1000 * 60 * 60 * 24));
                    acciones.marcarRezagada.push({
                        tarea: t,
                        nombre: t.name,
                        razon: _t('opt_razon_deadline_pasado').replace('{fecha}', t.deadline).replace('{dias}', diffDays)
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
                        razon: _t('opt_razon_dias_progreso').replace('{dias}', diasEnProgreso).replace('{progreso}', t.progress || 0)
                    });
                }
            }
        }

        return acciones;
    }

    function ejecutarSeleccion(seleccion) {
        const proyecto = projects[currentProjectIndex];
        if (!proyecto) return 0;

        let cambios = 0;
        let accionesRealizadas = [];

        if (seleccion.asignar && seleccion.asignar.length > 0) {
            for (const item of seleccion.asignar) {
                item.tarea.assignee = item.asignadoA;
                const txt = _t('opt_accion_asignar').replace('{nombre}', item.nombre).replace('{asignado}', item.asignadoA);
                accionesRealizadas.push(txt);
                cambios++;
            }
        }

        if (seleccion.moverAProgreso && seleccion.moverAProgreso.length > 0) {
            for (const item of seleccion.moverAProgreso) {
                item.tarea.status = 'inProgress';
                if (!item.tarea.progress) item.tarea.progress = 10;
                const txt = _t('opt_accion_progreso').replace('{nombre}', item.nombre).replace('{razon}', item.razon);
                accionesRealizadas.push(txt);
                cambios++;
            }
        }

        if (seleccion.subirPrioridad && seleccion.subirPrioridad.length > 0) {
            for (const item of seleccion.subirPrioridad) {
                item.tarea.priority = 'alta';
                const txt = _t('opt_accion_prioridad').replace('{nombre}', item.nombre).replace('{dias}', item.dias);
                accionesRealizadas.push(txt);
                cambios++;
            }
        }

        if (seleccion.completar && seleccion.completar.length > 0) {
            for (const item of seleccion.completar) {
                item.tarea.status = 'completed';
                item.tarea.progress = 100;
                const txt = _t('opt_accion_completar').replace('{nombre}', item.nombre).replace('{razon}', item.razon);
                accionesRealizadas.push(txt);
                cambios++;
            }
        }

        if (seleccion.marcarRezagada && seleccion.marcarRezagada.length > 0) {
            for (const item of seleccion.marcarRezagada) {
                item.tarea.status = 'overdue';
                const razon = item.dias ? _t('opt_razon_dias_progreso').replace('{dias}', item.dias).replace('{progreso}', item.progreso) : item.razon;
                const txt = _t('opt_accion_rezagada').replace('{nombre}', item.nombre).replace('{razon}', razon);
                accionesRealizadas.push(txt);
                cambios++;
            }
        }

        if (cambios > 0) {
            if (typeof updateLocalStorage === 'function') updateLocalStorage();
            else localStorage.setItem('projects', JSON.stringify(projects));
            if (typeof renderKanbanTasks === 'function') renderKanbanTasks();

            const accionesStr = accionesRealizadas.join('\n');
            const mensaje = _t('opt_mensaje_acciones_aplicadas').replace('{acciones}', accionesStr).replace('{total}', cambios);
            alert(mensaje);

            setTimeout(agregarContadoresColumnas, 500);
        } else {
            alert(_t('opt_mensaje_no_seleccion'));
        }

        return cambios;
    }

    function agregarContadoresColumnas() {
        const columnas = document.querySelectorAll('.column');
        let totalColumnas = 0;
        let totalTareas = 0;

        columnas.forEach(col => {
            const titulo = col.querySelector('h3');
            if (titulo) {
                const tasksContainer = col.querySelector('.tasks');
                if (tasksContainer) {
                    const tasksWidth = tasksContainer.offsetWidth;
                    const tasksStyle = window.getComputedStyle(tasksContainer);
                    const tasksPaddingLeft = parseFloat(tasksStyle.paddingLeft) || 0;
                    const tasksPaddingRight = parseFloat(tasksStyle.paddingRight) || 0;
                    const tasksPaddingTotal = tasksPaddingLeft + tasksPaddingRight;
                    const tituloWidth = tasksWidth - tasksPaddingTotal;

                    titulo.style.width = tituloWidth + 'px';
                    titulo.style.maxWidth = '100%';
                    titulo.style.display = 'block';
                    titulo.style.boxSizing = 'border-box';
                    titulo.style.marginLeft = '0';
                    titulo.style.marginRight = '0';
                    titulo.style.paddingLeft = '0';
                    titulo.style.paddingRight = '0';

                    const tasks = tasksContainer.querySelectorAll('.task-card');
                    const count = tasks.length;
                    totalTareas += count;

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
    }

    // ============================================================
    // 4. MOSTRAR PANEL (CON TRADUCCIONES DEL DICCIONARIO INTERNO)
    // ============================================================
    function mostrarPanel() {
        const acciones = analizarAcciones();
        if (!acciones) {
            alert(_t('opt_mensaje_no_proyecto'));
            return;
        }

        const totalAcciones =
            acciones.asignar.length +
            acciones.moverAProgreso.length +
            acciones.subirPrioridad.length +
            acciones.completar.length +
            acciones.marcarRezagada.length;

        if (totalAcciones === 0) {
            alert(_t('opt_mensaje_sin_acciones'));
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
                    <h2 style="margin: 0; color: #3b82f6; font-size: 26px;">${_t('opt_titulo')}</h2>
                    <button id="cerrar-modal-opt" style="background: none; border: none; color: #ef4444; font-size: 30px; cursor: pointer; padding: 0 15px;">${_t('opt_cerrar')}</button>
                </div>

                <p style="margin-bottom: 25px; color: #94a3b8; width: 100%; font-size: 17px;">${_t('opt_acciones_encontradas').replace('{total}', totalAcciones)}</p>
        `;

        // ASIGNAR
        if (acciones.asignar.length > 0) {
            html += `
                <div style="margin-bottom: 22px; border-left: 4px solid #10b981; padding-left: 18px; width: 100%; box-sizing: border-box;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px; width: 100%;">
                        <input type="checkbox" id="select-all-asignar" style="width: 20px; height: 20px; cursor: pointer; flex-shrink: 0;">
                        <strong style="color: #10b981; font-size: 17px; flex: 1;">${_t('opt_asignar_titulo').replace('{count}', acciones.asignar.length)}</strong>
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
                        <strong style="color: #3b82f6; font-size: 17px; flex: 1;">${_t('opt_mover_progreso_titulo').replace('{count}', acciones.moverAProgreso.length)}</strong>
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
                        <strong style="color: #f59e0b; font-size: 17px; flex: 1;">${_t('opt_subir_prioridad_titulo').replace('{count}', acciones.subirPrioridad.length)}</strong>
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
                        <strong style="color: #10b981; font-size: 17px; flex: 1;">${_t('opt_completar_titulo').replace('{count}', acciones.completar.length)}</strong>
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
                        <strong style="color: #ef4444; font-size: 17px; flex: 1;">${_t('opt_rezagadas_titulo').replace('{count}', acciones.marcarRezagada.length)}</strong>
                    </div>
                    <div style="width: 100%; padding-left: 32px; box-sizing: border-box;">
                        ${acciones.marcarRezagada.map((a, idx) => `
                            <div style="display: flex; align-items: flex-start; gap: 10px; margin: 7px 0; width: 100%;">
                                <input type="checkbox" class="accion-rezagada" data-idx="${idx}" style="width: 18px; height: 18px; cursor: pointer; flex-shrink: 0; margin-top: 2px;">
                                <span style="font-size: 15px; flex: 1;">📌 "${a.nombre}" → <span style="color: #ef4444;">${a.razon || (a.dias ? _t('opt_razon_dias_progreso').replace('{dias}', a.dias).replace('{progreso}', a.progreso) : '')}</span></span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        html += `
                <div style="display: flex; gap: 15px; justify-content: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #334155; width: 100%;">
                    <button id="aplicar-seleccion" style="background: #10b981; border: none; color: white; padding: 14px 40px; border-radius: 40px; cursor: pointer; font-weight: bold; font-size: 17px;">${_t('opt_btn_aplicar')}</button>
                    <button id="cancelar-seleccion" style="background: #475569; border: none; color: white; padding: 14px 40px; border-radius: 40px; cursor: pointer; font-weight: bold; font-size: 17px;">${_t('opt_btn_cancelar')}</button>
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

    // ============================================================
    // 5. CREAR BOTÓN EN HEADER
    // ============================================================
    function crearBotonOptimizar() {
        const oldBtn = document.getElementById('optimizar-ahora-btn');
        if (oldBtn) oldBtn.remove();

        const optimizarBtn = document.createElement('button');
        optimizarBtn.id = 'optimizar-ahora-btn';
        optimizarBtn.textContent = _t('opt_boton');
        optimizarBtn.title = _t('opt_boton');
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

        const pmBtn = document.getElementById('boardUltimateBtn') || document.querySelector('button[onclick*="abrirModalPM"]');
        if (pmBtn && pmBtn.parentNode) {
            pmBtn.parentNode.insertBefore(optimizarBtn, pmBtn.nextSibling);
        } else {
            const header = document.querySelector('header, .header, #header, .main-header');
            if (header) {
                header.appendChild(optimizarBtn);
            } else {
                document.body.appendChild(optimizarBtn);
            }
        }
        return optimizarBtn;
    }

    let botonOptimizar = crearBotonOptimizar();

    // ============================================================
    // 6. ESCUCHAR CAMBIO DE IDIOMA (actualiza el botón)
    // ============================================================
    document.addEventListener('languageChanged', function() {
        const btn = document.getElementById('optimizar-ahora-btn');
        if (btn) {
            btn.textContent = _t('opt_boton');
            btn.title = _t('opt_boton');
        }
    });

    // ============================================================
    // 7. INTERCEPTAR renderKanbanTasks
    // ============================================================
    if (typeof renderKanbanTasks === 'function') {
        const originalRender = renderKanbanTasks;
        renderKanbanTasks = function() {
            originalRender();
            setTimeout(agregarContadoresColumnas, 300);
        };
    }

    // ============================================================
    // 8. INICIALIZAR
    // ============================================================
    setTimeout(agregarContadoresColumnas, 500);

    console.log('%c✅ OPTIMIZAR AHORA con diccionario interno - Lista!', 'color: #10b981; font-size: 16px; font-weight: bold;');
    console.log('%c🌐 No depende de window.translations, usa su propio diccionario', 'color: #8b5cf6; font-size: 13px;');
})();