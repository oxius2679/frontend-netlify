// ============================================================
// 🔔 CENTRO DE NOTIFICACIONES - MÓDULO EXTERNO
// ============================================================

(function() {
    'use strict';

    // ---------- CONFIGURACIÓN ----------
    const STORAGE_KEY = 'notifications';
    const MAX_NOTIFICATIONS = 100;

    // ---------- ESTRUCTURA ----------
    let notifications = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    let unreadCount = notifications.filter(n => !n.read).length;

    // ---------- FUNCIONES BÁSICAS ----------
    function saveNotifications() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
        updateBadge();
    }

    function addNotification(text, type = 'info', link = null) {
        const newNotif = {
            id: Date.now(),
            text,
            type, // 'info', 'success', 'warning', 'error'
            link,
            timestamp: new Date().toISOString(),
            read: false
        };
        notifications.unshift(newNotif);
        if (notifications.length > MAX_NOTIFICATIONS) {
            notifications = notifications.slice(0, MAX_NOTIFICATIONS);
        }
        saveNotifications();
        // Mostrar notificación emergente (opcional)
        showToast(text, type);
        // Emitir evento para que otros módulos se enteren
        document.dispatchEvent(new CustomEvent('newNotification', { detail: newNotif }));
    }

    function markAsRead(id) {
        const notif = notifications.find(n => n.id === id);
        if (notif) {
            notif.read = true;
            saveNotifications();
        }
    }

    function markAllAsRead() {
        notifications.forEach(n => n.read = true);
        saveNotifications();
    }

    function clearAll() {
        notifications = [];
        saveNotifications();
    }

    function updateBadge() {
        unreadCount = notifications.filter(n => !n.read).length;
        const badge = document.getElementById('notificationBadge');
        if (badge) {
            if (unreadCount > 0) {
                badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        }
    }

    // ---------- TOAST EMERGENTE ----------
    function showToast(text, type) {
        const colors = {
            info: '#3b82f6',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444'
        };
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed; bottom: 20px; right: 20px;
            background: ${colors[type] || colors.info}; color: white;
            padding: 12px 20px; border-radius: 12px;
            font-weight: 500; z-index: 9999999;
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
            animation: slideUp 0.3s ease;
            max-width: 350px;
            font-family: 'Segoe UI', sans-serif;
        `;
        toast.textContent = text;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // ---------- PANEL DE NOTIFICACIONES ----------
    function toggleNotificationPanel() {
        let panel = document.getElementById('notificationPanel');
        if (panel) {
            panel.remove();
            return;
        }

        panel = document.createElement('div');
        panel.id = 'notificationPanel';
        panel.style.cssText = `
            position: fixed; top: 70px; right: 20px;
            width: 380px; max-height: 70vh;
            background: linear-gradient(135deg, #0f172a, #1e293b);
            border-radius: 16px; border: 1px solid rgba(139,92,246,0.3);
            box-shadow: 0 20px 50px rgba(0,0,0,0.6);
            z-index: 9999998;
            display: flex; flex-direction: column;
            overflow: hidden;
            color: white;
            font-family: 'Segoe UI', sans-serif;
        `;

        const header = document.createElement('div');
        header.style.cssText = `
            padding: 15px 20px; background: rgba(0,0,0,0.3);
            border-bottom: 1px solid rgba(139,92,246,0.2);
            display: flex; justify-content: space-between; align-items: center;
        `;
        header.innerHTML = `
            <span style="font-weight: 600; font-size: 16px;">🔔 Notificaciones</span>
            <div style="display: flex; gap: 10px;">
                <button id="markAllReadBtn" style="background: none; border: none; color: #8b5cf6; cursor: pointer; font-size: 12px;">Marcar todas leídas</button>
                <button id="clearAllNotifBtn" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 12px;">Borrar todas</button>
                <button id="closeNotifPanel" style="background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 18px;">✕</button>
            </div>
        `;

        const list = document.createElement('div');
        list.id = 'notificationList';
        list.style.cssText = `
            flex: 1; overflow-y: auto; padding: 10px 0;
            max-height: 400px;
        `;

        function renderList() {
            const unread = notifications.filter(n => !n.read);
            const read = notifications.filter(n => n.read);
            const sorted = [...unread, ...read];
            if (sorted.length === 0) {
                list.innerHTML = `<div style="text-align: center; padding: 40px; color: #94a3b8;">📭 No hay notificaciones</div>`;
                return;
            }
            list.innerHTML = sorted.map(n => {
                const color = {
                    info: '#3b82f6',
                    success: '#10b981',
                    warning: '#f59e0b',
                    error: '#ef4444'
                }[n.type] || '#3b82f6';
                return `
                    <div class="notif-item" data-id="${n.id}" style="
                        padding: 12px 20px; border-left: 4px solid ${color};
                        background: ${n.read ? 'rgba(255,255,255,0.02)' : 'rgba(139,92,246,0.05)'};
                        margin-bottom: 4px; cursor: pointer;
                        transition: background 0.2s;
                        display: flex; justify-content: space-between; align-items: center;
                    ">
                        <div style="flex:1;">
                            <div style="font-size: 13px;">${n.text}</div>
                            <div style="font-size: 10px; color: #94a3b8; margin-top: 4px;">
                                ${new Date(n.timestamp).toLocaleString()}
                                ${n.link ? `<a href="${n.link}" style="color: #8b5cf6; margin-left: 8px;">Ver</a>` : ''}
                            </div>
                        </div>
                        ${!n.read ? `<span style="width: 8px; height: 8px; background: ${color}; border-radius: 50%; flex-shrink: 0;"></span>` : ''}
                    </div>
                `;
            }).join('');
        }

        renderList();
        panel.appendChild(header);
        panel.appendChild(list);
        document.body.appendChild(panel);

        // Eventos
        document.getElementById('closeNotifPanel').onclick = () => panel.remove();
        document.getElementById('markAllReadBtn').onclick = () => {
            markAllAsRead();
            renderList();
        };
        document.getElementById('clearAllNotifBtn').onclick = () => {
            if (confirm('¿Borrar todas las notificaciones?')) {
                clearAll();
                renderList();
                panel.remove();
            }
        };

        // Marcar como leída al hacer clic en una notificación
        list.addEventListener('click', (e) => {
            const item = e.target.closest('.notif-item');
            if (item) {
                const id = parseInt(item.dataset.id);
                markAsRead(id);
                renderList();
                // Si tiene link, redirigir
                const notif = notifications.find(n => n.id === id);
                if (notif && notif.link) {
                    window.location.href = notif.link;
                }
            }
        });

        // Cerrar al hacer clic fuera
        document.addEventListener('click', function closePanel(e) {
            if (!panel.contains(e.target) && e.target.id !== 'notificationBell') {
                panel.remove();
                document.removeEventListener('click', closePanel);
            }
        });
    }

    // ---------- BADGE EN LA BARRA LATERAL ----------
    function addNotificationBell() {
        if (document.getElementById('notificationBell')) return;

        const sidebar = document.querySelector('aside, #sidebar');
        if (!sidebar) {
            setTimeout(addNotificationBell, 500);
            return;
        }

        const container = document.createElement('div');
        container.style.cssText = `
            position: relative;
            margin: 10px 12px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        const bell = document.createElement('button');
        bell.id = 'notificationBell';
        bell.innerHTML = '🔔';
        bell.style.cssText = `
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 50%;
            width: 48px; height: 48px;
            font-size: 22px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
            color: white;
            position: relative;
        `;
        bell.onclick = toggleNotificationPanel;

        const badge = document.createElement('span');
        badge.id = 'notificationBadge';
        badge.style.cssText = `
            position: absolute; top: -4px; right: -4px;
            background: #ef4444; color: white;
            border-radius: 50%; min-width: 20px; height: 20px;
            font-size: 11px; font-weight: 700;
            display: none; align-items: center; justify-content: center;
            padding: 0 5px;
            border: 2px solid #0f172a;
        `;
        container.appendChild(bell);
        container.appendChild(badge);
        sidebar.appendChild(container);

        updateBadge();
        console.log('✅ Centro de Notificaciones agregado.');
    }

    // ---------- INTERCEPTAR EVENTOS DEL SISTEMA ----------
    function interceptSystemEvents() {
        // Creación de tarea
        const originalCreate = window.createNewTask;
        if (originalCreate) {
            window.createNewTask = function(e) {
                const result = originalCreate(e);
                const project = projects[currentProjectIndex];
                if (project) {
                    const taskName = project.tasks?.[project.tasks.length - 1]?.name || 'Tarea';
                    addNotification(`✅ Nueva tarea "${taskName}" creada en "${project.name}"`, 'success');
                }
                return result;
            };
        }

        // Eliminar tarea
        const originalDelete = window.deleteTask;
        if (originalDelete) {
            window.deleteTask = function(task) {
                const name = task?.name || 'Tarea';
                const result = originalDelete(task);
                addNotification(`🗑️ Tarea "${name}" eliminada`, 'warning');
                return result;
            };
        }

        // Guardar cambios (editar)
        const originalSave = window.saveTaskChanges;
        if (originalSave) {
            window.saveTaskChanges = function(taskId) {
                const project = projects[currentProjectIndex];
                const task = project?.tasks?.find(t => t.id === taskId);
                const name = task?.name || 'Tarea';
                const result = originalSave(taskId);
                addNotification(`✏️ Tarea "${name}" actualizada`, 'info');
                return result;
            };
        }

        // Mover tarea (drag & drop)
        document.addEventListener('drop', function(e) {
            const taskId = e.dataTransfer?.getData('taskId') || e.dataTransfer?.getData('text/plain');
            if (taskId) {
                const project = projects[currentProjectIndex];
                const task = project?.tasks?.find(t => String(t.id) === String(taskId));
                if (task) {
                    const targetColumn = e.target.closest('.kanban-column, #pendingList, #inProgressList, #completedList, #overdueList');
                    if (targetColumn) {
                        const statusMap = {
                            'pendingList': 'pending',
                            'inProgressList': 'inProgress',
                            'completedList': 'completed',
                            'overdueList': 'overdue'
                        };
                        const newStatus = statusMap[targetColumn.id];
                        if (newStatus && task.status !== newStatus) {
                            addNotification(`🔄 Tarea "${task.name}" movida a ${newStatus}`, 'warning');
                        }
                    }
                }
            }
        }, true);

        // Cambio de proyecto
        document.addEventListener('projectChanged', function() {
            const project = projects[currentProjectIndex];
            if (project) {
                addNotification(`📂 Cambiado al proyecto "${project.name}"`, 'info');
            }
        });

        // WebSocket (si existe)
        if (window.tiempoRealSocket) {
            window.tiempoRealSocket.on('task-created', function(data) {
                if (data.projectId === currentProjectIndex) {
                    addNotification(`📡 Nueva tarea "${data.task?.name || 'Tarea'}" creada por otro usuario`, 'info');
                }
            });
            window.tiempoRealSocket.on('task-updated', function(data) {
                if (data.projectId === currentProjectIndex) {
                    addNotification(`📡 Tarea "${data.task?.name || 'Tarea'}" actualizada por otro usuario`, 'info');
                }
            });
            window.tiempoRealSocket.on('task-deleted', function(data) {
                if (data.projectId === currentProjectIndex) {
                    addNotification(`📡 Tarea eliminada por otro usuario`, 'warning');
                }
            });
        }
    }

    // ---------- NOTIFICACIONES MANUALES ----------
    window.addNotification = addNotification;

    // ---------- INICIALIZACIÓN ----------
    function init() {
        addNotificationBell();
        interceptSystemEvents();
        // Notificación de bienvenida
        setTimeout(() => {
            addNotification('👋 Bienvenido al Centro de Notificaciones', 'info');
        }, 1500);
        console.log('✅ Centro de Notificaciones cargado.');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();