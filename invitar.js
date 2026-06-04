/**
 * Módulo de Colaboración de Proyectos (Externo y Aislado)
 * No sobrescribe variables ni funciones globales existentes.
 */
const ProjectCollaborator = (function() {
    const API_URL = 'https://mi-sistema-proyectos-backend-4.onrender.com';
    
    let state = {
        isInitialized: false,
        currentProject: null,
        currentUser: null
    };

    /**
     * Inicializa la UI de invitación en un contenedor específico.
     * @param {string} containerId - ID del div donde se pintará el formulario.
     * @param {Object} project - Objeto del proyecto { index: 0, name: 'Nombre', id: 123 }.
     * @param {Object} user - Objeto del usuario { email: 'tu@email.com' }.
     */
    function init(containerId, project, user) {
        if (state.isInitialized) return;
        
        state.currentProject = project;
        state.currentUser = user;
        state.isInitialized = true;

        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`[Collaborator] Contenedor '${containerId}' no encontrado.`);
            return;
        }

        container.innerHTML = `
            <div style="font-family: system-ui, sans-serif; padding: 15px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 15px;">
                <h3 style="margin-top: 0; color: #1e293b; font-size: 16px;">Invitar Colaborador</h3>
                <p style="font-size: 13px; color: #64748b; margin-bottom: 15px;">
                    Proyecto: <strong>${project.name}</strong>
                </p>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <input type="email" id="collab-email" placeholder="Correo electrónico del colaborador" 
                           style="padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px;">
                    <select id="collab-role" style="padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px;">
                        <option value="Editor">Editor (Puede editar tareas)</option>
                        <option value="Viewer">Espectador (Solo lectura)</option>
                    </select>
                    <button id="collab-send-btn" style="padding: 10px; background: #3b82f6; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 14px;">
                        Enviar Invitación
                    </button>
                </div>
                <div id="collab-message" style="margin-top: 10px; font-size: 13px; display: none;"></div>
            </div>
        `;

        // Configurar eventos
        const sendBtn = container.querySelector('#collab-send-btn');
        const emailInput = container.querySelector('#collab-email');
        const roleSelect = container.querySelector('#collab-role');
        const messageDiv = container.querySelector('#collab-message');

        sendBtn.addEventListener('click', async () => {
            const email = emailInput.value.trim();
            const role = roleSelect.value;

            if (!email || !email.includes('@')) {
                showMessage(messageDiv, 'Ingresa un correo válido.', 'error');
                return;
            }

            showMessage(messageDiv, 'Enviando...', 'info');
            sendBtn.disabled = true;

            try {
                const token = localStorage.getItem('authToken');
                if (!token) throw new Error('No hay sesión activa.');

                const response = await fetch(`${API_URL}/api/invitations`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        email: email,
                        proyectoIndex: project.index, // Asegúrate de pasar el índice o ID correcto
                        proyectoNombre: project.name,
                        rol: role
                    })
                });

                const data = await response.json();
                if (response.ok && data.success) {
                    showMessage(messageDiv, `¡Enviado a ${email}!`, 'success');
                    emailInput.value = '';
                } else {
                    throw new Error(data.error || 'Error al enviar.');
                }
            } catch (error) {
                console.error('[Collaborator] Error:', error);
                showMessage(messageDiv, error.message, 'error');
            } finally {
                sendBtn.disabled = false;
            }
        });
    }

    function showMessage(element, text, type) {
        element.textContent = text;
        element.style.display = 'block';
        element.style.color = type === 'error' ? '#ef4444' : (type === 'success' ? '#10b981' : '#3b82f6');
        if (type === 'success') setTimeout(() => { element.style.display = 'none'; }, 4000);
    }

    /**
     * Función para que el INVITADO procese su enlace al cargar la página.
     * @returns {Promise<Object>} Resultado de la operación.
     */
    async function processInvitationForGuest() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (!token) {
            return { success: false, message: 'No hay token en la URL.' };
        }

        try {
            // 1. Validar
            const validateRes = await fetch(`${API_URL}/api/invitations/validate?token=${token}`);
            const validateData = await validateRes.json();
            if (!validateRes.ok || !validateData.success) {
                return { success: false, message: validateData.error || 'Invitación inválida.' };
            }

            // 2. Aceptar
            const acceptRes = await fetch(`${API_URL}/api/invitations/accept`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: token })
            });

            const acceptData = await acceptRes.json();
            if (acceptRes.ok && acceptData.success) {
                // Guardar datos para que tu sistema principal los use al cargar
                localStorage.setItem('clienteId', acceptData.clienteId);
                localStorage.setItem('userEmail', acceptData.email);
                localStorage.setItem('userRole', acceptData.rol);
                
                // Limpiar URL
                window.history.replaceState({}, document.title, window.location.pathname);

                return { success: true, message: '¡Invitación aceptada!', data: acceptData };
            } else {
                return { success: false, message: acceptData.error || 'Error al aceptar.' };
            }
        } catch (error) {
            return { success: false, message: 'Error de conexión.' };
        }
    }

    return { init, processInvitationForGuest };
})();