// ============================================================
// 🔄 SISTEMA DE SINCRONIZACIÓN EN TIEMPO REAL
// Basado en el código que funcionaba
// ============================================================

(function() {
    'use strict';
    
    console.log('🔄 Iniciando sistema de sincronización en tiempo real...');
    
    // ============================================
    // 1. CONFIGURACIÓN
    // ============================================
    const SYNC_KEY = '_sync_timestamp';
    const PROJECTS_KEY = 'projects';
    let ultimoSync = localStorage.getItem(SYNC_KEY) || '0';
    let sincronizacionActiva = true;
    
    // ============================================
    // 2. FUNCIONES DE SINCRONIZACIÓN
    // ============================================
    
    // Guardar con timestamp
    function guardarConTimestamp() {
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(window.projects));
        localStorage.setItem(SYNC_KEY, Date.now().toString());
        console.log('💾 Datos guardados con timestamp');
    }
    
    // Verificar y sincronizar cambios
    function verificarCambios() {
        const nuevoSync = localStorage.getItem(SYNC_KEY) || '0';
        
        if (nuevoSync !== ultimoSync) {
            console.log('🔄 Cambios detectados, sincronizando...');
            ultimoSync = nuevoSync;
            
            const proyectosGuardados = localStorage.getItem(PROJECTS_KEY);
            if (proyectosGuardados) {
                try {
                    const nuevosProyectos = JSON.parse(proyectosGuardados);
                    
                    // Verificar si hay cambios reales
                    if (JSON.stringify(window.projects) !== JSON.stringify(nuevosProyectos)) {
                        console.log('📥 Actualizando proyectos desde localStorage...');
                        
                        // Actualizar proyectos
                        window.projects.length = 0;
                        window.projects.push(...nuevosProyectos);
                        
                        // Renderizar vistas
                        if (typeof renderProjects === 'function') {
                            renderProjects();
                        }
                        if (typeof renderKanbanTasks === 'function') {
                            renderKanbanTasks();
                        }
                        if (typeof updateStatistics === 'function') {
                            updateStatistics();
                        }
                        if (typeof updateProjectProgress === 'function') {
                            updateProjectProgress();
                        }
                        
                        mostrarNotificacion('🔄 Proyectos sincronizados automáticamente');
                        console.log('✅ Sincronización completada');
                    }
                } catch(error) {
                    console.error('❌ Error sincronizando:', error);
                }
            }
        }
    }
    
    // ============================================
    // 3. INTERCEPTAR FUNCIONES DE TAREAS
    // ============================================
    
    function interceptarFunciones() {
        console.log('🔍 Interceptando funciones de tareas...');
        
        const funciones = [
            { nombre: 'createNewTask', original: window.createNewTask },
            { nombre: 'deleteTask', original: window.deleteTask },
            { nombre: 'saveTaskChanges', original: window.saveTaskChanges },
            { nombre: 'handleDrop', original: window.handleDrop },
            { nombre: 'updateTaskStatus', original: window.updateTaskStatus }
        ];
        
        funciones.forEach(({ nombre, original }) => {
            if (typeof original === 'function') {
                window[nombre] = function(...args) {
                    console.log(`📤 ${nombre} ejecutado`);
                    
                    // Ejecutar función original
                    const result = original.apply(this, args);
                    
                    // Guardar con timestamp
                    setTimeout(() => {
                        guardarConTimestamp();
                        console.log(`✅ ${nombre} sincronizado`);
                    }, 100);
                    
                    return result;
                };
                console.log(`✅ ${nombre} interceptado`);
            } else {
                console.warn(`⚠️ ${nombre} no encontrada`);
            }
        });
    }
    
    // ============================================
    // 4. INTERCEPTAR safeSave
    // ============================================
    
    function interceptarSafeSave() {
        const originalSafeSave = window.safeSave;
        if (typeof originalSafeSave === 'function') {
            window.safeSave = async function(clienteId) {
                console.log('💾 safeSave interceptado');
                
                // Guardar en localStorage
                guardarConTimestamp();
                
                // Ejecutar original
                if (typeof originalSafeSave === 'function') {
                    await originalSafeSave(clienteId);
                }
                
                // Renderizar
                if (typeof renderProjects === 'function') renderProjects();
                if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
                
                console.log('✅ safeSave completado');
                return true;
            };
            console.log('✅ safeSave interceptado');
        }
    }
    
    // ============================================
    // 5. NOTIFICACIONES
    // ============================================
    
    function mostrarNotificacion(mensaje) {
        const existing = document.getElementById('syncNotification');
        if (existing) existing.remove();
        
        const notif = document.createElement('div');
        notif.id = 'syncNotification';
        notif.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 90px;
            background: #10b981;
            color: white;
            padding: 8px 16px;
            border-radius: 8px;
            z-index: 999999;
            font-family: Arial, sans-serif;
            font-size: 13px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;
        notif.textContent = mensaje;
        document.body.appendChild(notif);
        
        setTimeout(() => {
            notif.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }
    
    // ============================================
    // 6. DETECTAR CAMBIOS EN OTRAS PESTAÑAS
    // ============================================
    
    window.addEventListener('storage', function(e) {
        if (e.key === PROJECTS_KEY && e.newValue) {
            console.log('📥 Cambio detectado en otra pestaña');
            try {
                const nuevosProyectos = JSON.parse(e.newValue);
                if (Array.isArray(nuevosProyectos) && nuevosProyectos.length > 0) {
                    window.projects.length = 0;
                    window.projects.push(...nuevosProyectos);
                    
                    if (typeof renderProjects === 'function') renderProjects();
                    if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
                    if (typeof updateStatistics === 'function') updateStatistics();
                    
                    mostrarNotificacion('🔄 Datos actualizados desde otra pestaña');
                }
            } catch(error) {
                console.error('❌ Error sincronizando:', error);
            }
        }
        
        if (e.key === SYNC_KEY) {
            console.log('⏱️ Timestamp actualizado');
            ultimoSync = e.newValue || '0';
        }
    });
    
    // ============================================
    // 7. POLLING DE SINCRONIZACIÓN
    // ============================================
    
    function iniciarPolling() {
        console.log('🔄 Iniciando polling de sincronización (cada 3 segundos)...');
        
        setInterval(function() {
            if (!sincronizacionActiva) return;
            verificarCambios();
        }, 3000);
        
        console.log('✅ Polling activado');
    }
    
    // ============================================
    // 8. FUNCIÓN PARA FORZAR SINCRONIZACIÓN
    // ============================================
    
    window.forzarSincronizacion = function() {
        console.log('🔄 Forzando sincronización manual...');
        guardarConTimestamp();
        verificarCambios();
        console.log('✅ Sincronización forzada completada');
    };
    
    // ============================================
    // 9. INICIALIZACIÓN
    // ============================================
    
    function init() {
        console.log('🚀 Inicializando sistema de sincronización...');
        
        // Interceptar funciones
        setTimeout(interceptarFunciones, 500);
        setTimeout(interceptarSafeSave, 1000);
        
        // Iniciar polling
        iniciarPolling();
        
        // Sincronización inicial
        setTimeout(() => {
            guardarConTimestamp();
            verificarCambios();
        }, 2000);
        
        console.log('✅ Sistema de sincronización listo');
        console.log('💡 Para forzar sincronización usa: forzarSincronizacion()');
    }
    
    // Ejecutar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 500);
    }
    
})();