// ============================================================
// 🛡️ SISTEMA DE ROLES Y PERMISOS - VERSIÓN CON ÍNDICES
// ============================================================

(function() {
    'use strict';

    // ---------- CONFIGURACIÓN ----------
    const ADMIN_EMAIL = 'ajackson2672@gmail.com';

    // ---------- UTILIDADES ----------
    function getCurrentUserEmail() {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            return user.email || null;
        } catch { return null; }
    }

    // ---------- MOSTRAR MODAL ----------
    function showRolesManagement() {
        const email = getCurrentUserEmail();
        if (email !== ADMIN_EMAIL) {
            showNotification('❌ No tienes permisos para gestionar roles.');
            return;
        }

        // Eliminar modal anterior
        const oldOverlay = document.getElementById('rolesManagementOverlay');
        if (oldOverlay) oldOverlay.remove();

        const overlay = document.createElement('div');
        overlay.id = 'rolesManagementOverlay';
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85); backdrop-filter: blur(10px);
            z-index: 1000000; display: flex; align-items: center; justify-content: center;
            padding: 20px;
        `;

        const modal = document.createElement('div');
        modal.style.cssText = `
            background: linear-gradient(135deg, #0f172a, #1e293b);
            border-radius: 24px; padding: 30px; max-width: 800px; width: 100%;
            max-height: 90vh; overflow-y: auto; border: 1px solid rgba(139,92,246,0.3);
            color: white;
            position: relative;
        `;

        let html = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin:0; color: #8b5cf6;">👑 Gestión de Roles y Permisos</h2>
                <button onclick="document.getElementById('rolesManagementOverlay').remove()" style="background: #ef4444; border: none; color: white; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; font-size: 18px;">✕</button>
            </div>
            <p style="color: #94a3b8; margin-bottom: 20px;">Asigna roles a los usuarios en cada proyecto.</p>
            <hr style="border-color: #334155; margin: 20px 0;">
        `;

        // Recorrer proyectos por ÍNDICE
        projects.forEach((project, index) => {
            const members = project.members || [];
            html += `
                <div style="margin-bottom: 30px; background: rgba(255,255,255,0.03); border-radius: 16px; padding: 20px; border: 1px solid rgba(255,255,255,0.05);">
                    <h3 style="margin:0 0 15px 0; color: #f1f5f9;">📁 ${project.name}</h3>
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-bottom: 15px;">
                        <input type="email" id="userEmail_${index}" placeholder="Email del usuario" style="flex:1; min-width: 200px; padding: 10px; border-radius: 8px; border: 1px solid #3b82f6; background: #0f172a; color: white;">
                        <select id="userRole_${index}" style="padding: 10px; border-radius: 8px; border: 1px solid #3b82f6; background: #0f172a; color: white;">
                            <option value="project_manager">Project Manager</option>
                            <option value="member" selected>Member</option>
                            <option value="viewer">Viewer</option>
                        </select>
                        <button onclick="addMemberToProjectByIndex(${index})" style="background: #10b981; border: none; padding: 10px 20px; border-radius: 8px; color: white; cursor: pointer; display: flex; align-items: center; gap: 5px;">➕ Agregar</button>
                    </div>
                    <div id="membersList_${index}" style="margin-top: 10px;">
                        ${members.length === 0 ? '<div style="color: #94a3b8; font-style: italic; font-size: 13px;">Sin miembros asignados</div>' : ''}
                        ${members.map(m => `
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: rgba(255,255,255,0.05); border-radius: 8px; margin-bottom: 5px;">
                                <span>${m.email} <span style="color: #8b5cf6; font-size: 12px;">(${m.role})</span></span>
                                <button onclick="removeMemberFromProjectByIndex(${index}, '${m.email}')" style="background: #ef4444; border: none; color: white; padding: 4px 12px; border-radius: 6px; cursor: pointer;">🗑️</button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });

        html += `
            <div style="display: flex; justify-content: flex-end; gap: 15px; margin-top: 20px;">
                <button onclick="document.getElementById('rolesManagementOverlay').remove()" style="background: #475569; border: none; padding: 10px 25px; border-radius: 8px; color: white; cursor: pointer;">Cerrar</button>
            </div>
        `;

        modal.innerHTML = html;
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // ---------- FUNCIONES GLOBALES POR ÍNDICE ----------
        window.addMemberToProjectByIndex = function(index) {
            console.log('🔄 addMemberToProjectByIndex llamado para índice:', index);

            const emailInput = document.getElementById(`userEmail_${index}`);
            const roleSelect = document.getElementById(`userRole_${index}`);
            const email = emailInput ? emailInput.value.trim() : '';
            const role = roleSelect ? roleSelect.value : 'member';

            console.log('📧 Email:', email);
            console.log('🎯 Rol:', role);

            if (!email) {
                showNotification('⚠️ Ingresa un email válido.');
                return;
            }

            // Obtener proyecto por índice
            const project = projects[index];
            if (!project) {
                const msg = `❌ Proyecto en índice ${index} no encontrado.`;
                console.error(msg);
                showNotification(msg);
                return;
            }

            // Inicializar members
            if (!project.members) project.members = [];

            // Verificar duplicado
            if (project.members.find(m => m.email === email)) {
                showNotification(`⚠️ El usuario ${email} ya tiene un rol en este proyecto.`);
                return;
            }

            // Agregar
            project.members.push({ email, role });
            console.log(`✅ Miembro agregado: ${email} -> ${role}`);

            // Guardar
            if (typeof updateLocalStorage === 'function') {
                updateLocalStorage();
            } else {
                localStorage.setItem('projects', JSON.stringify(projects));
            }
            showNotification(`✅ Usuario ${email} agregado como ${role}.`);

            // Actualizar lista sin cerrar modal
            updateMembersListByIndex(index);
        };

        window.removeMemberFromProjectByIndex = function(index, email) {
            console.log('🗑️ removeMemberFromProjectByIndex:', index, email);
            if (!confirm(`¿Eliminar a ${email} de este proyecto?`)) return;

            const project = projects[index];
            if (!project) {
                showNotification('❌ Proyecto no encontrado.');
                return;
            }

            project.members = project.members.filter(m => m.email !== email);
            if (typeof updateLocalStorage === 'function') {
                updateLocalStorage();
            } else {
                localStorage.setItem('projects', JSON.stringify(projects));
            }
            showNotification(`🗑️ Usuario ${email} eliminado.`);
            updateMembersListByIndex(index);
        };

        function updateMembersListByIndex(index) {
            const project = projects[index];
            const container = document.getElementById(`membersList_${index}`);
            if (!container) return;

            const members = project?.members || [];
            if (members.length === 0) {
                container.innerHTML = '<div style="color: #94a3b8; font-style: italic; font-size: 13px;">Sin miembros asignados</div>';
                return;
            }

            container.innerHTML = members.map(m => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: rgba(255,255,255,0.05); border-radius: 8px; margin-bottom: 5px;">
                    <span>${m.email} <span style="color: #8b5cf6; font-size: 12px;">(${m.role})</span></span>
                    <button onclick="removeMemberFromProjectByIndex(${index}, '${m.email}')" style="background: #ef4444; border: none; color: white; padding: 4px 12px; border-radius: 6px; cursor: pointer;">🗑️</button>
                </div>
            `).join('');
            console.log(`✅ Lista actualizada para proyecto ${index}`);
        }
    }

    // ---------- BOTÓN EN SIDEBAR ----------
    function addRolesButton() {
        if (document.getElementById('rolesManagerBtn')) return;

        const sidebar = document.querySelector('aside, #sidebar');
        if (!sidebar) {
            setTimeout(addRolesButton, 500);
            return;
        }

        const btn = document.createElement('button');
        btn.id = 'rolesManagerBtn';
        btn.innerHTML = '👑 Roles y Permisos';
        btn.style.cssText = `
            width: calc(100% - 24px);
            margin: 10px 12px;
            padding: 12px 16px;
            background: linear-gradient(135deg, #8b5cf6, #6d28d9);
            border: none;
            border-radius: 12px;
            color: white;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
            transition: all 0.3s;
        `;
        btn.onclick = showRolesManagement;
        sidebar.appendChild(btn);
        console.log('✅ Botón "Roles y Permisos" agregado.');
    }

    // ---------- INICIALIZACIÓN ----------
    function init() {
        // Asegurar que todos los proyectos tengan campo members
        projects.forEach(p => {
            if (!p.members) p.members = [];
        });
        if (typeof updateLocalStorage === 'function') {
            updateLocalStorage();
        } else {
            localStorage.setItem('projects', JSON.stringify(projects));
        }

        addRolesButton();
        console.log('✅ Sistema de Roles y Permisos cargado (con índices).');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Exponer para uso externo
    window.showRolesManagement = showRolesManagement;

})();