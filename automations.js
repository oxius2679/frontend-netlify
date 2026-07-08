// ============================================
// 🤖 SISTEMA DE AUTOMATIZACIÓN PREMIUM - VERSIÓN DEFINITIVA
// TODAS LAS REGLAS USAN data-task-id Y NO SE REPITEN
// ============================================
(function() {
    'use strict';

    // ============================================================
    // 1. SISTEMA DE TRADUCCIÓN (COMPLETO)
    // ============================================================
    const translations = {
        es: {
            titulo_centro: 'Centro de Automatización Premium',
            subtitulo_centro: 'Gestiona reglas y monitorea ejecuciones',
            btn_sidebar: '⚙️ Automatización Premium',
            kpi_reglas_activas: 'Reglas Activas',
            kpi_ejecuciones: 'Ejecuciones',
            kpi_ahorro: 'Ahorro Estimado',
            kpi_horas: 'h',
            cerrar: '✕',
            tab_reglas: '📋 Reglas',
            tab_crear: '✨ Crear Regla',
            tab_historial: '📜 Historial',
            tab_triggers: '🔌 Triggers',
            reglas_configuradas: 'Reglas Configuradas',
            reglas_count: 'reglas',
            reglas_activas_count: 'activas',
            reglas_ejecuciones: 'ejecuciones',
            nueva_regla: '+ Nueva Regla',
            crear_titulo: 'Crear Nueva Regla',
            crear_nombre: '📝 Nombre',
            crear_trigger: '⚡ Trigger',
            crear_mensaje: '💬 Mensaje',
            crear_icono: '🎨 Icono',
            crear_color: '🎨 Color',
            crear_guardar: '✅ Guardar',
            crear_cancelar: 'Cancelar',
            crear_placeholder_nombre: 'Ej: Notificar tarea crítica',
            crear_placeholder_mensaje: 'Variables: {{task}}, {{description}}',
            crear_select_trigger: 'Seleccionar...',
            crear_completar_campos: 'Completa todos los campos',
            historial_titulo: '📜 Historial',
            historial_eventos: 'eventos',
            historial_limpiar: 'Limpiar',
            historial_vacio: '📭 No hay eventos',
            triggers_titulo: '🔌 Triggers Disponibles',
            triggers_usar: 'Usar →',
            notif_regla_creada: '📝 Regla Creada',
            notif_regla_eliminada: '🗑️ Regla Eliminada',
            notif_regla_actualizada: '🔄 Regla Actualizada',
            notif_regla_creada_detalle: 'Se creó la regla: {nombre}',
            notif_regla_eliminada_detalle: 'Se eliminó: {nombre}',
            notif_regla_actualizada_detalle: '{nombre} → {estado}',
            notif_activada: 'Activada',
            notif_desactivada: 'Desactivada',
            notif_confirmar_eliminar: '¿Eliminar esta regla?',
            notif_confirmar_limpiar: '¿Limpiar historial?',
            notif_sistema_reiniciado: '🔄 Sistema Reiniciado',
            notif_sistema_reiniciado_detalle: 'Todas las notificaciones reseteadas',
            regla_completada_nombre: '✅ Tarea Completada',
            regla_completada_mensaje: 'La tarea {{task}} ha sido completada',
            regla_ceo_nombre: '👑 Escalamiento CEO',
            regla_ceo_mensaje: '⚠️ Tarea crítica atrasada: {{task}}',
            regla_alta_nombre: '🎯 Alta Prioridad',
            regla_alta_mensaje: '🎯 Tarea de alta prioridad: {{task}}',
            regla_riesgo_nombre: '⚠️ Riesgo Detectado',
            regla_riesgo_mensaje: '⚠️ Riesgo detectado: {{description}}',
            trigger_completada: '✅ Tarea Completada',
            trigger_completada_desc: 'Cuando se completa una tarea',
            trigger_critica: '👑 Crítica Atrasada',
            trigger_critica_desc: 'Tarea crítica atrasada',
            trigger_alta: '🎯 Alta Prioridad',
            trigger_alta_desc: 'Tarea de alta prioridad',
            trigger_riesgo: '⚠️ Riesgo',
            trigger_riesgo_desc: 'Palabras de riesgo detectadas',
            console_stats: '\n📊 ESTADÍSTICAS DE AUTOMATIZACIÓN:',
            console_completada: '   ✅ Tareas Completadas: {count}',
            console_alta: '   🎯 Alta Prioridad: {count}',
            console_ceo: '   👑 Escalamiento CEO: {count}',
            console_riesgo: '   ⚠️ Riesgo Detectado: {count}',
            console_notificadas: '   📋 Tareas notificadas: {count}',
            console_reset: '✅ Sistema reiniciado completamente',
            console_comandos: '💡 Comandos disponibles:',
            console_autoStats: '   autoStatsFinal() - Ver estadísticas',
            console_resetAuto: '   resetAutoFinal() - Reiniciar todo',
            console_open: '   openAutomationCenter() - Abrir panel premium',
            console_header: '╔════════════════════════════════════════════════╗',
            console_header2: '║     ✅ SISTEMA DE AUTOMATIZACIÓN PREMIUM      ║',
            console_header3: '║         VERSIÓN DEFINITIVA CORREGIDA         ║',
            console_header4: '╠════════════════════════════════════════════════╣',
            console_reglas: '║   📊 Reglas activas:                          ║',
            console_regla1: '║      ✅ Tarea Completada                      ║',
            console_regla2: '║      👑 Escalamiento CEO                      ║',
            console_regla3: '║      🎯 Alta Prioridad                        ║',
            console_regla4: '║      ⚠️ Riesgo Detectado                      ║',
            console_footer: '╚════════════════════════════════════════════════╝',
            console_sistema: '🚀 Sistema Definitivo',
            console_reglas_activas: 'Todas las reglas están activas'
        },
        en: {
            titulo_centro: 'Premium Automation Center',
            subtitulo_centro: 'Manage rules and monitor executions',
            btn_sidebar: '⚙️ Premium Automation',
            kpi_reglas_activas: 'Active Rules',
            kpi_ejecuciones: 'Executions',
            kpi_ahorro: 'Estimated Savings',
            cerrar: '✕',
            kpi_horas: 'h',
            tab_reglas: '📋 Rules',
            tab_crear: '✨ Create Rule',
            tab_historial: '📜 History',
            tab_triggers: '🔌 Triggers',
            reglas_configuradas: 'Configured Rules',
            reglas_count: 'rules',
            reglas_activas_count: 'active',
            reglas_ejecuciones: 'executions',
            nueva_regla: '+ New Rule',
            crear_titulo: 'Create New Rule',
            crear_nombre: '📝 Name',
            crear_trigger: '⚡ Trigger',
            crear_mensaje: '💬 Message',
            crear_icono: '🎨 Icon',
            crear_color: '🎨 Color',
            crear_guardar: '✅ Save',
            crear_cancelar: 'Cancel',
            crear_placeholder_nombre: 'e.g. Notify critical task',
            crear_placeholder_mensaje: 'Variables: {{task}}, {{description}}',
            crear_select_trigger: 'Select...',
            crear_completar_campos: 'Please fill all fields',
            historial_titulo: '📜 History',
            historial_eventos: 'events',
            historial_limpiar: 'Clear',
            historial_vacio: '📭 No events',
            triggers_titulo: '🔌 Available Triggers',
            triggers_usar: 'Use →',
            notif_regla_creada: '📝 Rule Created',
            notif_regla_eliminada: '🗑️ Rule Deleted',
            notif_regla_actualizada: '🔄 Rule Updated',
            notif_regla_creada_detalle: 'Rule created: {nombre}',
            notif_regla_eliminada_detalle: 'Deleted: {nombre}',
            notif_regla_actualizada_detalle: '{nombre} → {estado}',
            notif_activada: 'Activated',
            notif_desactivada: 'Deactivated',
            notif_confirmar_eliminar: 'Delete this rule?',
            notif_confirmar_limpiar: 'Clear history?',
            notif_sistema_reiniciado: '🔄 System Reset',
            notif_sistema_reiniciado_detalle: 'All notifications reset',
            regla_completada_nombre: '✅ Task Completed',
            regla_completada_mensaje: 'Task {{task}} has been completed',
            regla_ceo_nombre: '👑 CEO Escalation',
            regla_ceo_mensaje: '⚠️ Critical overdue task: {{task}}',
            regla_alta_nombre: '🎯 High Priority',
            regla_alta_mensaje: '🎯 High priority task: {{task}}',
            regla_riesgo_nombre: '⚠️ Risk Detected',
            regla_riesgo_mensaje: '⚠️ Risk detected: {{description}}',
            trigger_completada: '✅ Task Completed',
            trigger_completada_desc: 'When a task is completed',
            trigger_critica: '👑 Critical Overdue',
            trigger_critica_desc: 'Critical task overdue',
            trigger_alta: '🎯 High Priority',
            trigger_alta_desc: 'High priority task',
            trigger_riesgo: '⚠️ Risk',
            trigger_riesgo_desc: 'Risk keywords detected',
            console_stats: '\n📊 AUTOMATION STATISTICS:',
            console_completada: '   ✅ Tasks Completed: {count}',
            console_alta: '   🎯 High Priority: {count}',
            console_ceo: '   👑 CEO Escalations: {count}',
            console_riesgo: '   ⚠️ Risk Detected: {count}',
            console_notificadas: '   📋 Notified tasks: {count}',
            console_reset: '✅ System fully reset',
            console_comandos: '💡 Available commands:',
            console_autoStats: '   autoStatsFinal() - View statistics',
            console_resetAuto: '   resetAutoFinal() - Reset everything',
            console_open: '   openAutomationCenter() - Open premium panel',
            console_header: '╔════════════════════════════════════════════════╗',
            console_header2: '║     ✅ PREMIUM AUTOMATION SYSTEM             ║',
            console_header3: '║         DEFINITIVE FIXED VERSION             ║',
            console_header4: '╠════════════════════════════════════════════════╣',
            console_reglas: '║   📊 Active rules:                          ║',
            console_regla1: '║      ✅ Task Completed                      ║',
            console_regla2: '║      👑 CEO Escalation                      ║',
            console_regla3: '║      🎯 High Priority                        ║',
            console_regla4: '║      ⚠️ Risk Detected                        ║',
            console_footer: '╚════════════════════════════════════════════════╝',
            console_sistema: '🚀 Definitive System',
            console_reglas_activas: 'All rules are active'
        }
    };

    function t(key) {
        if (!key) return key;
        const lang = localStorage.getItem('preferredLanguage') || 'es';
        const keys = key.split('.');
        let value = translations[lang];
        for (const k of keys) {
            if (value && value[k] !== undefined) value = value[k];
            else return key;
        }
        return value || key;
    }

    window.t = t;

    // ============================================================
    // 2. FUNCIÓN PARA OBTENER EL PROYECTO ACTUAL
    // ============================================================
    function getCurrentProject() {
        try {
            if (typeof window.projects !== 'undefined' && typeof window.currentProjectIndex !== 'undefined') {
                return window.projects[window.currentProjectIndex];
            }
            if (typeof projects !== 'undefined' && typeof currentProjectIndex !== 'undefined') {
                return projects[currentProjectIndex];
            }
            return null;
        } catch(e) {
            return null;
        }
    }

    // ============================================================
    // 3. FUNCIÓN PARA OBTENER TÍTULO DESDE ID
    // ============================================================
    function obtenerTituloDesdeId(taskId) {
        if (!taskId) return null;
        const project = getCurrentProject();
        if (!project || !project.tasks) return null;
        const tarea = project.tasks.find(t => String(t.id) === String(taskId));
        return tarea ? (tarea.name || tarea.title || null) : null;
    }

    // ============================================================
    // 4. DATOS PERSISTENTES
    // ============================================================
    let automationRules = JSON.parse(localStorage.getItem('automationRules_premium') || '[]');
    let executionHistory = JSON.parse(localStorage.getItem('automationHistory_premium') || '[]');
    let tareasNotificadas = new Set();
    let ejecuciones = { completada: 0, altaPrioridad: 0, ceo: 0, riesgo: 0 };

    // Sets separados para cada regla (usando localStorage)
    let notificadasAlta = new Set(JSON.parse(localStorage.getItem('autoNotificadasAlta') || '[]'));
    let notificadasCEO = new Set(JSON.parse(localStorage.getItem('autoNotificadasCEO') || '[]'));
    let notificadasRiesgo = new Set(JSON.parse(localStorage.getItem('autoNotificadasRiesgo') || '[]'));

    function guardarSet(setName, set) {
        localStorage.setItem(setName, JSON.stringify([...set]));
    }

    const savedNotif = localStorage.getItem('autoNotificadasFinal');
    const savedStats = localStorage.getItem('autoStatsFinal');

    if (savedNotif) {
        try { tareasNotificadas = new Set(JSON.parse(savedNotif)); } catch(e) {}
    }
    if (savedStats) {
        try { ejecuciones = JSON.parse(savedStats); } catch(e) {}
    }

    // Crear reglas por defecto si no existen
    if (automationRules.length === 0) {
        automationRules = [
            { id: 1, name: t('regla_completada_nombre'), trigger: "task_completed", action: "notification", message: t('regla_completada_mensaje'), active: true, icon: "✅", color: "#10b981", executions: 0 },
            { id: 2, name: t('regla_ceo_nombre'), trigger: "critical_overdue", action: "notification", message: t('regla_ceo_mensaje'), active: true, icon: "👑", color: "#ef4444", executions: 0 },
            { id: 3, name: t('regla_alta_nombre'), trigger: "high_priority", action: "notification", message: t('regla_alta_mensaje'), active: true, icon: "🎯", color: "#8b5cf6", executions: 0 },
            { id: 4, name: t('regla_riesgo_nombre'), trigger: "risk", action: "notification", message: t('regla_riesgo_mensaje'), active: true, icon: "⚠️", color: "#f97316", executions: 0 }
        ];
        localStorage.setItem('automationRules_premium', JSON.stringify(automationRules));
    }

    function guardarEstadoPersistente() {
        localStorage.setItem('autoNotificadasFinal', JSON.stringify([...tareasNotificadas]));
        localStorage.setItem('autoStatsFinal', JSON.stringify(ejecuciones));
        guardarSet('autoNotificadasAlta', notificadasAlta);
        guardarSet('autoNotificadasCEO', notificadasCEO);
        guardarSet('autoNotificadasRiesgo', notificadasRiesgo);
    }

    function guardarDatos() {
        localStorage.setItem('automationRules_premium', JSON.stringify(automationRules));
        localStorage.setItem('automationHistory_premium', JSON.stringify(executionHistory));
        guardarEstadoPersistente();
    }

    // ============================================================
    // 5. NOTIFICACIONES VISUALES
    // ============================================================
    function mostrarNotificacion(titulo, mensaje, color = '#10b981', icono = '✅') {
        const anteriores = document.querySelectorAll('.notificacion-flotante');
        anteriores.forEach(el => el.remove());

        const notif = document.createElement('div');
        notif.className = 'notificacion-flotante';
        notif.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(135deg, #1e293b, #0f172a);
            border-left: 4px solid ${color};
            border-radius: 12px;
            padding: 14px 20px;
            color: white;
            z-index: 1000002;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            animation: slideInNotif 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            max-width: 380px;
            font-family: system-ui, sans-serif;
            border: 1px solid rgba(255,255,255,0.05);
        `;
        notif.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 12px;">
                <div style="font-size: 28px; line-height: 1;">${icono}</div>
                <div style="flex: 1;">
                    <div style="font-weight: bold; color: ${color}; font-size: 14px; margin-bottom: 4px;">${titulo}</div>
                    <div style="font-size: 12px; color: #94a3b8; line-height: 1.4;">${mensaje}</div>
                    <div style="font-size: 10px; color: #64748b; margin-top: 6px;">${new Date().toLocaleTimeString()}</div>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" style="background:none;border:none;color:#64748b;cursor:pointer;font-size:16px;">✕</button>
            </div>
        `;
        document.body.appendChild(notif);
        setTimeout(() => { if (notif.parentElement) notif.remove(); }, 5000);

        executionHistory.unshift({
            id: Date.now(),
            rule: titulo,
            detail: mensaje,
            icon: icono,
            date: new Date().toLocaleString(),
            timestamp: Date.now()
        });
        if (executionHistory.length > 100) executionHistory.pop();
        guardarDatos();
    }

    if (!document.getElementById('notifStylesFinal')) {
        const style = document.createElement('style');
        style.id = 'notifStylesFinal';
        style.textContent = `
            @keyframes slideInNotif {
                from { transform: translateX(120%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notificacion-flotante {
                animation: slideInNotif 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================================
    // 6. FUNCIÓN PARA OBTENER TÍTULO (FALLBACK)
    // ============================================================
    function obtenerTituloFromDOM(tarea) {
        const el = tarea.querySelector('.task-title, h4');
        if (el) {
            let titulo = el.innerText.trim();
            titulo = titulo.replace(/^[✅📌🎯⭐⚠️🔴🟢🟡🔄⏳📋]\s*/, '').trim();
            return titulo || 'Tarea';
        }
        return 'Tarea';
    }

    // ============================================================
    // 7. GENERAR ID (FALLBACK)
    // ============================================================
    function generarIdFallback(tarea) {
        const titulo = obtenerTituloFromDOM(tarea);
        return 'fallback_' + titulo.replace(/[^a-zA-Z0-9]/g, '_');
    }

    // ============================================================
    // 8. DETECTOR DE TAREA COMPLETADA (CON ID)
    // ============================================================
    let ultimaEjecucionCompletada = 0;

    function detectarTareaCompletada() {
        const ahora = Date.now();
        if (ahora - ultimaEjecucionCompletada < 2000) return;
        ultimaEjecucionCompletada = ahora;

        const columna = document.querySelector('#completedList');
        if (!columna) return;

        const tareas = columna.querySelectorAll('.task-card');
        if (tareas.length === 0) return;

        const idsActuales = new Set();
        tareas.forEach(t => {
            const id = t.getAttribute('data-task-id') || generarIdFallback(t);
            idsActuales.add(id);
        });

        let limpiadas = 0;
        for (const id of tareasNotificadas) {
            if (!idsActuales.has(id)) {
                tareasNotificadas.delete(id);
                limpiadas++;
            }
        }
        if (limpiadas > 0) {
            console.log(`🧹 Limpiadas ${limpiadas} tareas completadas que ya no están`);
            guardarEstadoPersistente();
        }

        const rule = automationRules.find(r => r.trigger === 'task_completed' && r.active);
        if (!rule) return;

        let notificadas = 0;

        tareas.forEach(tarea => {
            const taskId = tarea.getAttribute('data-task-id') || generarIdFallback(tarea);
            if (tareasNotificadas.has(taskId)) return;

            let titulo = obtenerTituloDesdeId(taskId);
            if (!titulo) titulo = obtenerTituloFromDOM(tarea);

            console.log(`✅ Completada: "${titulo}" (ID: ${taskId})`);

            ejecuciones.completada++;
            guardarEstadoPersistente();

            const mensaje = rule.message.replace('{{task}}', titulo.substring(0, 40));
            mostrarNotificacion(rule.name, mensaje, rule.color, rule.icon);
            rule.executions = (rule.executions || 0) + 1;
            guardarDatos();

            tareasNotificadas.add(taskId);
            guardarEstadoPersistente();

            setTimeout(() => {
                tareasNotificadas.delete(taskId);
                guardarEstadoPersistente();
            }, 3600000);

            notificadas++;
        });

        if (notificadas > 0) {
            console.log(`📊 Se notificaron ${notificadas} tarea(s) completadas`);
        }
    }

    // ============================================================
    // 9. DETECTOR DE ALTA PRIORIDAD (CON ID Y SET SEPARADO)
    // ============================================================
    let ultimaEjecucionAlta = 0;

    function detectarAltaPrioridad() {
        const ahora = Date.now();
        if (ahora - ultimaEjecucionAlta < 3000) return;
        ultimaEjecucionAlta = ahora;

        const tareas = document.querySelectorAll('.task-card');
        const rule = automationRules.find(r => r.trigger === 'high_priority' && r.active);
        if (!rule) return;

        tareas.forEach(tarea => {
            const taskId = tarea.getAttribute('data-task-id') || generarIdFallback(tarea);
            if (notificadasAlta.has(taskId)) return;

            const texto = tarea.innerText.toLowerCase();
            const tieneAlta = texto.includes('alta') || texto.includes('priority-alta') || texto.includes('🔴');

            if (tieneAlta) {
                let titulo = obtenerTituloDesdeId(taskId);
                if (!titulo) titulo = obtenerTituloFromDOM(tarea);

                console.log(`🎯 Alta prioridad: "${titulo}" (ID: ${taskId})`);

                ejecuciones.altaPrioridad++;
                guardarEstadoPersistente();

                const mensaje = rule.message.replace('{{task}}', titulo.substring(0, 40));
                mostrarNotificacion(rule.name, mensaje, rule.color, rule.icon);
                rule.executions = (rule.executions || 0) + 1;
                guardarDatos();

                notificadasAlta.add(taskId);
                guardarSet('autoNotificadasAlta', notificadasAlta);

                setTimeout(() => {
                    notificadasAlta.delete(taskId);
                    guardarSet('autoNotificadasAlta', notificadasAlta);
                }, 3600000);
            }
        });
    }

    // ============================================================
    // 10. DETECTOR DE CEO (CRÍTICA + ATRASADA)
    // ============================================================
    let ultimaEjecucionCEO = 0;

    function detectarCEO() {
        const ahora = Date.now();
        if (ahora - ultimaEjecucionCEO < 5000) return;
        ultimaEjecucionCEO = ahora;

        const tareas = document.querySelectorAll('.task-card');
        const rule = automationRules.find(r => r.trigger === 'critical_overdue' && r.active);
        if (!rule) return;

        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        tareas.forEach(tarea => {
            const taskId = tarea.getAttribute('data-task-id') || generarIdFallback(tarea);
            if (notificadasCEO.has(taskId)) return;

            const texto = tarea.innerText.toLowerCase();
            const esCritica = texto.includes('crítica') || texto.includes('critica') || texto.includes('critical');

            const fechaMatch = texto.match(/(\d{2})\/(\d{2})\/(\d{4})/);
            let estaAtrasada = false;
            if (fechaMatch) {
                const fechaTarea = new Date(fechaMatch[3], fechaMatch[2] - 1, fechaMatch[1]);
                estaAtrasada = fechaTarea < hoy && !texto.includes('completada');
            }

            if (esCritica && estaAtrasada) {
                let titulo = obtenerTituloDesdeId(taskId);
                if (!titulo) titulo = obtenerTituloFromDOM(tarea);

                console.log(`👑 CEO detectado: "${titulo}" (ID: ${taskId})`);

                ejecuciones.ceo++;
                guardarEstadoPersistente();

                const mensaje = rule.message.replace('{{task}}', titulo.substring(0, 40));
                mostrarNotificacion(rule.name, mensaje, rule.color, rule.icon);
                rule.executions = (rule.executions || 0) + 1;
                guardarDatos();

                notificadasCEO.add(taskId);
                guardarSet('autoNotificadasCEO', notificadasCEO);

                setTimeout(() => {
                    notificadasCEO.delete(taskId);
                    guardarSet('autoNotificadasCEO', notificadasCEO);
                }, 3600000);
            }
        });
    }

    // ============================================================
    // 11. DETECTOR DE RIESGO
    // ============================================================
    let ultimaEjecucionRiesgo = 0;

    function detectarRiesgo() {
        const ahora = Date.now();
        if (ahora - ultimaEjecucionRiesgo < 3000) return;
        ultimaEjecucionRiesgo = ahora;

        const tareas = document.querySelectorAll('.task-card');
        const rule = automationRules.find(r => r.trigger === 'risk' && r.active);
        if (!rule) return;

        const palabrasRiesgo = ['riesgo', 'problema', 'retraso', 'peligro', 'alerta', 'dependencia', 'bloqueo', 'crítico', 'urgente'];

        tareas.forEach(tarea => {
            const taskId = tarea.getAttribute('data-task-id') || generarIdFallback(tarea);
            if (notificadasRiesgo.has(taskId)) return;

            const texto = tarea.innerText.toLowerCase();
            const tieneRiesgo = palabrasRiesgo.some(p => texto.includes(p));

            if (tieneRiesgo) {
                let titulo = obtenerTituloDesdeId(taskId);
                if (!titulo) titulo = obtenerTituloFromDOM(tarea);

                console.log(`⚠️ Riesgo detectado: "${titulo}" (ID: ${taskId})`);

                ejecuciones.riesgo++;
                guardarEstadoPersistente();

                const mensaje = rule.message.replace('{{description}}', titulo.substring(0, 40));
                mostrarNotificacion(rule.name, mensaje, rule.color, rule.icon);
                rule.executions = (rule.executions || 0) + 1;
                guardarDatos();

                notificadasRiesgo.add(taskId);
                guardarSet('autoNotificadasRiesgo', notificadasRiesgo);

                setTimeout(() => {
                    notificadasRiesgo.delete(taskId);
                    guardarSet('autoNotificadasRiesgo', notificadasRiesgo);
                }, 3600000);
            }
        });
    }

    // ============================================================
    // 12. INTERCEPTAR CREACIÓN/EDICIÓN DE TAREAS
    // ============================================================
    if (typeof window.createNewTask === 'function') {
        const originalCreate = window.createNewTask;
        window.createNewTask = function(e) {
            const result = originalCreate(e);
            setTimeout(() => {
                setTimeout(() => {
                    detectarAltaPrioridad();
                    detectarCEO();
                    detectarRiesgo();
                }, 800);
            }, 500);
            return result;
        };
    }

    if (typeof window.saveTaskChanges === 'function') {
        const originalSave = window.saveTaskChanges;
        window.saveTaskChanges = function(taskId) {
            const result = originalSave(taskId);
            setTimeout(() => {
                detectarAltaPrioridad();
                detectarCEO();
                detectarRiesgo();
            }, 500);
            return result;
        };
    }

    // ============================================================
    // 13. CONFIGURAR INTERVALOS (CONTROLADOS)
    // ============================================================
    // Guardar referencias para poder detenerlos desde consola
    window._intervalosAutomation = [];

    const intervalos = [
        { name: 'completadas', fn: detectarTareaCompletada, time: 3000 },
        { name: 'alta', fn: detectarAltaPrioridad, time: 3000 },
        { name: 'ceo', fn: detectarCEO, time: 5000 },
        { name: 'riesgo', fn: detectarRiesgo, time: 3000 }
    ];

    intervalos.forEach(({ name, fn, time }) => {
        const id = setInterval(fn, time);
        window._intervalosAutomation.push({ name, id });
    });

    // MutationObserver para detectar cambios en el DOM
    let timeoutObserver;
    const observer = new MutationObserver(() => {
        if (timeoutObserver) clearTimeout(timeoutObserver);
        timeoutObserver = setTimeout(() => {
            detectarTareaCompletada();
            detectarAltaPrioridad();
            detectarCEO();
            detectarRiesgo();
        }, 500);
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    // ============================================================
    // 14. FUNCIONES DE GESTIÓN DE REGLAS (TRADUCIDAS)
    // ============================================================
    function addToHistory(ruleNameKey, detailKey, icon = '⚙️') {
        const ruleName = t(ruleNameKey);
        const detail = t(detailKey);
        mostrarNotificacion(ruleName, detail, '#3b82f6', icon);
    }

    function createRule(data) {
        const newRule = { id: Date.now(), ...data, active: true, executions: 0 };
        automationRules.push(newRule);
        guardarDatos();
        addToHistory('notif_regla_creada', 'notif_regla_creada_detalle'.replace('{nombre}', data.name), '✨');
        return newRule;
    }

    function deleteRule(id) {
        const rule = automationRules.find(r => r.id === id);
        automationRules = automationRules.filter(r => r.id !== id);
        guardarDatos();
        addToHistory('notif_regla_eliminada', 'notif_regla_eliminada_detalle'.replace('{nombre}', rule?.name || 'Desconocida'), '🗑️');
    }

    function toggleRule(id) {
        const rule = automationRules.find(r => r.id === id);
        if (rule) {
            rule.active = !rule.active;
            guardarDatos();
            const estado = rule.active ? t('notif_activada') : t('notif_desactivada');
            const detalle = t('notif_regla_actualizada_detalle').replace('{nombre}', rule.name).replace('{estado}', estado);
            mostrarNotificacion('🔄 Regla Actualizada', detalle, '#3b82f6', '🔄');
        }
    }

    // ============================================================
    // 15. REINICIO COMPLETO DEL SISTEMA
    // ============================================================
    window.resetAutoFinal = function() {
        // Limpiar todos los Sets
        tareasNotificadas.clear();
        notificadasAlta.clear();
        notificadasCEO.clear();
        notificadasRiesgo.clear();
        ejecuciones = { completada: 0, altaPrioridad: 0, ceo: 0, riesgo: 0 };

        // Guardar estado
        guardarEstadoPersistente();
        guardarDatos();

        console.log(t('console_reset'));
        mostrarNotificacion('🔄 Sistema Reiniciado', 'Todas las notificaciones reseteadas', '#3b82f6', '🔄');
        return ejecuciones;
    };

    // ============================================================
    // 16. ESFERA 3D
    // ============================================================
    function loadThreeJS() {
        return new Promise((resolve) => {
            if (window.THREE) { resolve(); return; }
            const s = document.createElement('script');
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
            s.onload = resolve;
            document.head.appendChild(s);
        });
    }

    function create3DSphere(container) {
        if (!window.THREE || !container) return;
        const w = 280, h = 280;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, w/h, 0.1, 1000);
        camera.position.z = 3;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(w, h);
        renderer.setClearColor(0x000000, 0);
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        const geometry = new THREE.SphereGeometry(0.9, 64, 64);
        const material = new THREE.MeshStandardMaterial({ color: 0x3b82f6, emissive: 0x1e3a8a, roughness: 0.3, metalness: 0.7, emissiveIntensity: 0.5 });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        const rings = [
            { color: 0xef4444, radius: 1.3, speed: 0.01 },
            { color: 0x10b981, radius: 1.4, speed: -0.008 },
            { color: 0xf59e0b, radius: 1.5, speed: 0.012 },
            { color: 0x8b5cf6, radius: 1.45, speed: -0.01 },
            { color: 0x06b6d4, radius: 1.55, speed: 0.009 },
            { color: 0xec4899, radius: 1.6, speed: -0.011 }
        ];
        const ringMeshes = [];
        rings.forEach(r => {
            const torus = new THREE.Mesh(new THREE.TorusGeometry(r.radius, 0.05, 64, 200), new THREE.MeshStandardMaterial({ color: r.color, emissive: r.color, emissiveIntensity: 0.3 }));
            scene.add(torus);
            ringMeshes.push({ mesh: torus, speed: r.speed });
        });

        const particleCount = 300;
        const particleGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const radius = 1.8;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            positions[i*3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i*3+1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i*3+2] = radius * Math.cos(phi);
        }
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particles = new THREE.Points(particleGeo, new THREE.PointsMaterial({ color: 0x8b5cf6, size: 0.03 }));
        scene.add(particles);

        const ambient = new THREE.AmbientLight(0x404060);
        scene.add(ambient);
        const light1 = new THREE.PointLight(0x3b82f6, 1);
        light1.position.set(2, 2, 2);
        scene.add(light1);
        const light2 = new THREE.PointLight(0x8b5cf6, 0.8);
        light2.position.set(-2, 1, 3);
        scene.add(light2);

        let time = 0;
        function animate() {
            requestAnimationFrame(animate);
            time += 0.01;
            sphere.rotation.y = time * 0.2;
            sphere.rotation.x = time * 0.1;
            ringMeshes.forEach(r => { r.mesh.rotation.x += r.speed; r.mesh.rotation.y += r.speed * 0.8; });
            particles.rotation.y = time * 0.05;
            camera.position.x = Math.sin(time * 0.2) * 0.2;
            camera.position.y = Math.cos(time * 0.3) * 0.15;
            camera.lookAt(0, 0, 0);
            renderer.render(scene, camera);
        }
        animate();
    }

    // ============================================================
    // 17. MODAL PRINCIPAL (TRADUCIDO)
    // ============================================================
    window.openAutomationCenter = async function() {
        const existing = document.getElementById('automationPremiumModal');
        if (existing) existing.remove();

        await loadThreeJS();

        const modal = document.createElement('div');
        modal.id = 'automationPremiumModal';
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);backdrop-filter:blur(15px);z-index:10000000;display:flex;align-items:center;justify-content:center;';

        const titulo = t('titulo_centro');
        const subtitulo = t('subtitulo_centro');
        const kpiReglas = t('kpi_reglas_activas');
        const kpiEjecuciones = t('kpi_ejecuciones');
        const kpiAhorro = t('kpi_ahorro');
        const kpiHoras = t('kpi_horas');
        const tabReglas = t('tab_reglas');
        const tabCrear = t('tab_crear');
        const tabHistorial = t('tab_historial');
        const tabTriggers = t('tab_triggers');
        const cerrar = t('cerrar') || '✕';

        modal.innerHTML = `
            <div style="background:linear-gradient(135deg,#0f172a,#1e293b);border-radius:32px;width:1300px;max-width:95vw;height:85vh;display:flex;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.5);border:1px solid rgba(59,130,246,0.3);">
                <div style="width:320px;background:linear-gradient(180deg,#0f172a,#1e293b);border-right:1px solid rgba(59,130,246,0.2);padding:25px;display:flex;flex-direction:column;">
                    <div id="sphereContainer" style="width:280px;height:280px;margin:0 auto 20px;border-radius:50%;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.5);"></div>
                    <div style="margin-top:10px;">
                        <h3 style="color:#94a3b8;font-size:12px;margin-bottom:15px;text-transform:uppercase;letter-spacing:2px;">📊 KPIs</h3>
                        <div style="background:rgba(59,130,246,0.1);border-radius:16px;padding:15px;margin-bottom:12px;">
                            <div style="display:flex;justify-content:space-between;">
                                <span style="color:#94a3b8;font-size:12px;">${kpiReglas}</span>
                                <span id="kpiActiveRules" style="color:#10b981;font-size:28px;font-weight:700;">${automationRules.filter(r => r.active).length}</span>
                            </div>
                        </div>
                        <div style="background:rgba(16,185,129,0.1);border-radius:16px;padding:15px;margin-bottom:12px;">
                            <div style="display:flex;justify-content:space-between;">
                                <span style="color:#94a3b8;font-size:12px;">${kpiEjecuciones}</span>
                                <span id="kpiTotalExecutions" style="color:#f59e0b;font-size:28px;font-weight:700;">${executionHistory.length}</span>
                            </div>
                        </div>
                        <div style="background:rgba(139,92,246,0.1);border-radius:16px;padding:15px;">
                            <div style="display:flex;justify-content:space-between;">
                                <span style="color:#94a3b8;font-size:12px;">${kpiAhorro}</span>
                                <span style="color:#10b981;font-size:28px;font-weight:700;">${executionHistory.length * 15}${kpiHoras}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;">
                    <div style="padding:20px 25px;border-bottom:1px solid rgba(59,130,246,0.2);display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <h2 style="margin:0;color:white;font-size:22px;">${titulo}</h2>
                            <p style="margin:4px 0 0 0;color:#94a3b8;">${subtitulo}</p>
                        </div>
                        <button id="closePremiumModal" style="background:rgba(239,68,68,0.2);border:1px solid #ef4444;color:#ef4444;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;">${cerrar}</button>
                    </div>
                    <div style="display:flex;gap:5px;padding:0 25px;border-bottom:1px solid rgba(59,130,246,0.1);">
                        <button class="premium-tab active" data-tab="rules" style="background:none;border:none;padding:12px 24px;color:white;cursor:pointer;font-weight:500;border-bottom:2px solid #3b82f6;">${tabReglas}</button>
                        <button class="premium-tab" data-tab="create" style="background:none;border:none;padding:12px 24px;color:#94a3b8;cursor:pointer;">${tabCrear}</button>
                        <button class="premium-tab" data-tab="history" style="background:none;border:none;padding:12px 24px;color:#94a3b8;cursor:pointer;">${tabHistorial}</button>
                        <button class="premium-tab" data-tab="triggers" style="background:none;border:none;padding:12px 24px;color:#94a3b8;cursor:pointer;">${tabTriggers}</button>
                    </div>
                    <div id="premiumTabContent" style="flex:1;overflow-y:auto;padding:25px;"></div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        setTimeout(() => {
            const container = document.getElementById('sphereContainer');
            if (container) create3DSphere(container);
        }, 100);

        const TRIGGERS = [
            { value: "task_completed", label: t('trigger_completada'), desc: t('trigger_completada_desc'), color: "#10b981" },
            { value: "critical_overdue", label: t('trigger_critica'), desc: t('trigger_critica_desc'), color: "#ef4444" },
            { value: "high_priority", label: t('trigger_alta'), desc: t('trigger_alta_desc'), color: "#8b5cf6" },
            { value: "risk", label: t('trigger_riesgo'), desc: t('trigger_riesgo_desc'), color: "#f97316" }
        ];

        function renderRules() {
            const container = document.getElementById('premiumTabContent');
            const activas = automationRules.filter(r => r.active);
            const inactivas = automationRules.filter(r => !r.active);
            const reglasConfig = t('reglas_configuradas');
            const reglasCount = t('reglas_count');
            const reglasActivas = t('reglas_activas_count');
            const nuevaRegla = t('nueva_regla');
            const ejecucionesLabel = t('reglas_ejecuciones');

            container.innerHTML = `
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;">
                    <div><h3 style="color:white;margin:0;">${reglasConfig}</h3><p style="color:#94a3b8;margin:4px 0 0;">${automationRules.length} ${reglasCount} (${activas.length} ${reglasActivas})</p></div>
                    <button id="createRuleBtn" style="background:linear-gradient(135deg,#3b82f6,#8b5cf6);border:none;color:white;padding:10px 24px;border-radius:40px;cursor:pointer;">${nuevaRegla}</button>
                </div>
                ${activas.map(r => `
                    <div style="background:linear-gradient(135deg,rgba(30,41,59,0.8),rgba(15,23,42,0.8));border-radius:16px;padding:18px;margin-bottom:12px;border-left:4px solid ${r.color};">
                        <div style="display:flex;justify-content:space-between;align-items:center;">
                            <div style="display:flex;gap:15px;flex:1;">
                                <div style="font-size:36px;">${r.icon}</div>
                                <div>
                                    <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
                                        <h4 style="color:white;margin:0;">${r.name}</h4>
                                        <span style="background:${r.color}20;color:${r.color};padding:2px 10px;border-radius:20px;font-size:11px;">${r.trigger}</span>
                                        <span style="background:#1e293b;color:#64748b;padding:2px 8px;border-radius:20px;font-size:10px;">${r.executions || 0} ${ejecucionesLabel}</span>
                                    </div>
                                    <p style="color:#94a3b8;margin:8px 0 0;font-size:13px;">${r.message}</p>
                                </div>
                            </div>
                            <div style="display:flex;gap:12px;">
                                <label style="position:relative;display:inline-block;width:50px;height:26px;">
                                    <input type="checkbox" class="toggleRule" data-id="${r.id}" ${r.active ? 'checked' : ''} style="opacity:0;width:0;height:0;">
                                    <span style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:${r.active ? r.color : '#334155'};border-radius:34px;"></span>
                                    <span style="position:absolute;height:20px;width:20px;left:3px;bottom:3px;background-color:white;border-radius:50%;transition:0.3s;transform:${r.active ? 'translateX(24px)' : 'none'};"></span>
                                </label>
                                <button class="deleteRule" data-id="${r.id}" style="background:rgba(239,68,68,0.2);border:none;color:#ef4444;width:32px;height:32px;border-radius:8px;cursor:pointer;">🗑️</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
                ${inactivas.map(r => `
                    <div style="background:rgba(30,41,59,0.3);border-radius:16px;padding:18px;margin-bottom:12px;border-left:4px solid #475569;opacity:0.7;">
                        <div style="display:flex;justify-content:space-between;align-items:center;">
                            <div style="display:flex;gap:15px;flex:1;">
                                <div style="font-size:36px;opacity:0.5;">${r.icon}</div>
                                <div>
                                    <h4 style="color:#94a3b8;margin:0;">${r.name}</h4>
                                    <p style="color:#64748b;margin:8px 0 0;font-size:13px;">${r.message}</p>
                                </div>
                            </div>
                            <div style="display:flex;gap:12px;">
                                <label style="position:relative;display:inline-block;width:50px;height:26px;">
                                    <input type="checkbox" class="toggleRule" data-id="${r.id}" ${r.active ? 'checked' : ''} style="opacity:0;width:0;height:0;">
                                    <span style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#334155;border-radius:34px;"></span>
                                    <span style="position:absolute;height:20px;width:20px;left:3px;bottom:3px;background-color:white;border-radius:50%;"></span>
                                </label>
                                <button class="deleteRule" data-id="${r.id}" style="background:rgba(239,68,68,0.2);border:none;color:#ef4444;width:32px;height:32px;border-radius:8px;cursor:pointer;">🗑️</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            `;
            document.querySelectorAll('.toggleRule').forEach(t => t.onclick = (e) => { toggleRule(parseInt(t.dataset.id)); renderRules(); updateKPIs(); });
            document.querySelectorAll('.deleteRule').forEach(b => b.onclick = (e) => { if(confirm(t('notif_confirmar_eliminar'))){ deleteRule(parseInt(b.dataset.id)); renderRules(); updateKPIs(); } });
            document.getElementById('createRuleBtn').onclick = () => document.querySelector('[data-tab="create"]').click();
        }

        function renderCreate() {
            const container = document.getElementById('premiumTabContent');
            const titulo = t('crear_titulo');
            const nombre = t('crear_nombre');
            const trigger = t('crear_trigger');
            const mensaje = t('crear_mensaje');
            const icono = t('crear_icono');
            const color = t('crear_color');
            const guardar = t('crear_guardar');
            const cancelar = t('crear_cancelar');
            const placeholderNombre = t('crear_placeholder_nombre');
            const placeholderMensaje = t('crear_placeholder_mensaje');
            const selectTrigger = t('crear_select_trigger');

            container.innerHTML = `
                <div style="max-width:600px;margin:0 auto;">
                    <div style="text-align:center;margin-bottom:25px;">
                        <div style="font-size:48px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);width:80px;height:80px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 15px;">✨</div>
                        <h3 style="color:white;margin:0;">${titulo}</h3>
                    </div>
                    <div style="background:rgba(0,0,0,0.3);border-radius:24px;padding:25px;">
                        <div style="margin-bottom:15px;">
                            <label style="color:#e2e8f0;margin-bottom:5px;display:block;">${nombre}</label>
                            <input type="text" id="newRuleName" placeholder="${placeholderNombre}" style="width:100%;background:#1e293b;border:1px solid #334155;border-radius:12px;padding:12px;color:white;">
                        </div>
                        <div style="margin-bottom:15px;">
                            <label style="color:#e2e8f0;margin-bottom:5px;display:block;">${trigger}</label>
                            <select id="newRuleTrigger" style="width:100%;background:#1e293b;border:1px solid #334155;border-radius:12px;padding:12px;color:white;">
                                <option value="">${selectTrigger}</option>
                                ${TRIGGERS.map(t => `<option value="${t.value}">${t.label} - ${t.desc}</option>`).join('')}
                            </select>
                        </div>
                        <div style="margin-bottom:15px;">
                            <label style="color:#e2e8f0;margin-bottom:5px;display:block;">${mensaje}</label>
                            <textarea id="newRuleMessage" rows="3" placeholder="${placeholderMensaje}" style="width:100%;background:#1e293b;border:1px solid #334155;border-radius:12px;padding:12px;color:white;"></textarea>
                        </div>
                        <div style="display:flex;gap:15px;margin-bottom:15px;">
                            <div style="flex:1;">
                                <label style="color:#e2e8f0;margin-bottom:5px;display:block;">${icono}</label>
                                <input type="text" id="newRuleIcon" value="⚙️" style="width:100%;background:#1e293b;border:1px solid #334155;border-radius:12px;padding:10px;text-align:center;font-size:24px;">
                            </div>
                            <div style="flex:1;">
                                <label style="color:#e2e8f0;margin-bottom:5px;display:block;">${color}</label>
                                <input type="color" id="newRuleColor" value="#3b82f6" style="width:100%;height:48px;border-radius:12px;">
                            </div>
                        </div>
                        <div style="display:flex;gap:15px;">
                            <button id="saveRuleBtn" style="flex:1;background:linear-gradient(135deg,#10b981,#059669);border:none;color:white;padding:14px;border-radius:12px;cursor:pointer;">${guardar}</button>
                            <button id="cancelCreateBtn" style="flex:1;background:#334155;border:none;color:white;padding:14px;border-radius:12px;cursor:pointer;">${cancelar}</button>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('saveRuleBtn').onclick = () => {
                const name = document.getElementById('newRuleName').value.trim();
                const trigger = document.getElementById('newRuleTrigger').value;
                const message = document.getElementById('newRuleMessage').value.trim();
                const icon = document.getElementById('newRuleIcon').value.trim() || '⚙️';
                const color = document.getElementById('newRuleColor').value;
                if(!name || !trigger || !message) { alert(t('crear_completar_campos')); return; }
                createRule({ name, trigger, action: 'notification', message, icon, color });
                renderRules();
                updateKPIs();
                document.querySelector('[data-tab="rules"]').click();
            };
            document.getElementById('cancelCreateBtn').onclick = () => document.querySelector('[data-tab="rules"]').click();
        }

        function renderHistory() {
            const container = document.getElementById('premiumTabContent');
            const history = executionHistory.slice(0, 30);
            const titulo = t('historial_titulo');
            const eventos = t('historial_eventos');
            const limpiar = t('historial_limpiar');
            const vacio = t('historial_vacio');

            container.innerHTML = `
                <div style="display:flex;justify-content:space-between;margin-bottom:20px;">
                    <div><h3 style="color:white;margin:0;">${titulo}</h3><p style="color:#94a3b8;margin:4px 0 0;">${history.length} ${eventos}</p></div>
                    <button id="clearHistoryBtn" style="background:rgba(239,68,68,0.2);border:1px solid #ef4444;color:#ef4444;padding:8px 20px;border-radius:8px;cursor:pointer;">${limpiar}</button>
                </div>
                ${history.length === 0 ? `<div style="text-align:center;padding:40px;color:#94a3b8;">${vacio}</div>` : 
                    history.map(h => `
                        <div style="background:rgba(30,41,59,0.5);border-radius:12px;padding:14px;margin-bottom:10px;border-left:3px solid #3b82f6;">
                            <div style="display:flex;justify-content:space-between;align-items:center;">
                                <div style="display:flex;align-items:center;gap:12px;">
                                    <span style="font-size:24px;">${h.icon || '⚙️'}</span>
                                    <div><div style="color:white;font-weight:500;">${h.rule}</div><div style="color:#94a3b8;font-size:12px;">${h.detail}</div></div>
                                </div>
                                <div style="color:#64748b;font-size:11px;">${h.date}</div>
                            </div>
                        </div>
                    `).join('')}
            `;
            document.getElementById('clearHistoryBtn')?.addEventListener('click', () => { if(confirm(t('notif_confirmar_limpiar'))){ executionHistory = []; guardarDatos(); renderHistory(); updateKPIs(); } });
        }

        function renderTriggers() {
            const container = document.getElementById('premiumTabContent');
            const titulo = t('triggers_titulo');
            const usar = t('triggers_usar');

            container.innerHTML = `
                <div><h3 style="color:white;margin:0 0 15px;">${titulo}</h3>
                ${TRIGGERS.map(t => `
                    <div style="background:rgba(30,41,59,0.5);border-radius:14px;padding:16px;margin-bottom:12px;border-left:4px solid ${t.color};display:flex;align-items:center;gap:15px;">
                        <div style="font-size:32px;">${t.label.split(' ')[0]}</div>
                        <div style="flex:1;"><h4 style="color:white;margin:0;">${t.label}</h4><p style="color:#94a3b8;margin:5px 0 0;">${t.desc}</p></div>
                        <button class="useTrigger" data-trigger="${t.value}" style="background:${t.color}20;border:1px solid ${t.color};color:${t.color};padding:8px 20px;border-radius:40px;cursor:pointer;">${usar}</button>
                    </div>
                `).join('')}</div>
            `;
            document.querySelectorAll('.useTrigger').forEach(btn => btn.onclick = () => {
                document.querySelector('[data-tab="create"]').click();
                setTimeout(() => { const s = document.getElementById('newRuleTrigger'); if(s) s.value = btn.dataset.trigger; }, 100);
            });
        }

        function updateKPIs() {
            const kpi = document.getElementById('kpiActiveRules');
            const kpiEx = document.getElementById('kpiTotalExecutions');
            if(kpi) kpi.textContent = automationRules.filter(r => r.active).length;
            if(kpiEx) kpiEx.textContent = executionHistory.length;
        }

        document.querySelectorAll('.premium-tab').forEach(tab => {
            tab.onclick = () => {
                document.querySelectorAll('.premium-tab').forEach(t => { t.classList.remove('active'); t.style.color = '#94a3b8'; t.style.borderBottom = 'none'; });
                tab.classList.add('active'); tab.style.color = 'white'; tab.style.borderBottom = '2px solid #3b82f6';
                const t = tab.dataset.tab;
                if(t === 'rules') renderRules();
                else if(t === 'create') renderCreate();
                else if(t === 'history') renderHistory();
                else if(t === 'triggers') renderTriggers();
            };
        });

        document.getElementById('closePremiumModal').onclick = () => modal.remove();
        modal.onclick = (e) => { if(e.target === modal) modal.remove(); };

        renderRules();
        updateKPIs();
    };

    // ============================================================
    // 18. BOTÓN EN EL MENÚ LATERAL
    // ============================================================
    function agregarBotonAlSidebar() {
        const sidebar = document.querySelector('aside, #sidebar, .sidebar, .side-menu');
        if (!sidebar) {
            setTimeout(agregarBotonAlSidebar, 500);
            return;
        }
        if (document.getElementById('autoBlueSidebar')) return;

        const btn = document.createElement('button');
        btn.id = 'autoBlueSidebar';
        btn.innerHTML = t('btn_sidebar');
        btn.style.cssText = `
            width: calc(100% - 24px) !important;
            background: linear-gradient(135deg, #2563eb, #1e40af) !important;
            border: none !important;
            color: white !important;
            padding: 12px 16px !important;
            border-radius: 12px !important;
            cursor: pointer !important;
            font-weight: 600 !important;
            font-size: 14px !important;
            margin: 10px 12px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 8px !important;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3) !important;
            transition: all 0.3s ease !important;
        `;

        btn.onmouseenter = () => btn.style.transform = 'translateY(-2px)';
        btn.onmouseleave = () => btn.style.transform = 'translateY(0)';
        btn.onclick = () => {
            if (typeof window.openAutomationCenter === 'function') {
                window.openAutomationCenter();
            }
        };

        sidebar.appendChild(btn);
        console.log('✅ Botón de automatización agregado al menú lateral');
    }

    document.addEventListener('languageChanged', function() {
        const btn = document.getElementById('autoBlueSidebar');
        if (btn) {
            btn.innerHTML = t('btn_sidebar');
        }
    });

    // ============================================================
    // 19. COMANDOS DE CONSOLA (TRADUCIDOS)
    // ============================================================
    window.autoStatsFinal = function() {
        console.log(t('console_stats'));
        console.log(t('console_completada').replace('{count}', ejecuciones.completada));
        console.log(t('console_alta').replace('{count}', ejecuciones.altaPrioridad));
        console.log(t('console_ceo').replace('{count}', ejecuciones.ceo));
        console.log(t('console_riesgo').replace('{count}', ejecuciones.riesgo));
        console.log(t('console_notificadas').replace('{count}', tareasNotificadas.size));
        return ejecuciones;
    };

    // ============================================================
    // 20. INICIALIZACIÓN
    // ============================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', agregarBotonAlSidebar);
    } else {
        agregarBotonAlSidebar();
    }

    const observerSidebar = new MutationObserver(function() {
        const sidebar = document.querySelector('aside, #sidebar, .sidebar, .side-menu');
        const btn = document.getElementById('autoBlueSidebar');
        if (sidebar && !btn) agregarBotonAlSidebar();
    });
    observerSidebar.observe(document.body, { childList: true, subtree: true });

    console.log(t('console_header'));
    console.log(t('console_header2'));
    console.log(t('console_header3'));
    console.log(t('console_header4'));
    console.log(t('console_reglas'));
    console.log(t('console_regla1'));
    console.log(t('console_regla2'));
    console.log(t('console_regla3'));
    console.log(t('console_regla4'));
    console.log(t('console_footer'));

    mostrarNotificacion('🚀 Sistema Definitivo', 'Todas las reglas están activas', '#3b82f6', '🔧');

    console.log(t('console_comandos'));
    console.log(t('console_autoStats'));
    console.log(t('console_resetAuto'));
    console.log(t('console_open'));

    // Limpiar notificaciones antiguas al inicio
    if (tareasNotificadas.size > 30) {
        console.log('🧹 Limpiando tareas notificadas antiguas...');
        tareasNotificadas.clear();
        guardarEstadoPersistente();
    }

})();