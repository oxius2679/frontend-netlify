// ============================================================
// ASISTENTE GENERAL REPLIKA‑STYLE – VERSIÓN DEFINITIVA
// ============================================================
// Dependencias externas (deben existir en el ámbito global):
//   - projects, currentProjectIndex, showView(viewId),
//   - createNewProject(), getStats(), generateProjectReport(),
//   - openTaskModal (o el modal de creación de tareas),
//   - updateTranslations(), showNotification()
// ============================================================

(function() {
    'use strict';

    // ---------- CONFIGURACIÓN ----------
    const CONFIG = {
        storageKey: 'assistantConversation',
        maxHistory: 50,
        welcomeDelay: 3000,
        voiceLang: 'es-ES',
        maxVoiceRetries: 3
    };

    // ---------- OBJETO PRINCIPAL ----------
    window.SystemAssistant = {
        _welcomeShown: false,
        name: 'Oxi',
        personality: 'energetic',
        mood: '⚡',
        isVisible: false,
        conversationHistory: [],

        // Personalidades
        personalities: {
            helpful: {
                name: 'Alex',
                greeting: '¡Hola! Soy Oxi, tu asistente de proyectos. ¿En qué puedo ayudarte hoy?',
                tone: 'amigable y servicial',
                avatar: '🤖'
            },
            professional: {
                name: 'ProManager',
                greeting: 'Buen día. Soy ProManager, su asistente profesional de gestión de proyectos.',
                tone: 'formal y preciso',
                avatar: '👨‍💼'
            },
            energetic: {
                name: 'Oxi',
                greeting: '¡Hey! ¡Soy Oxi! 🚀 ¿Listo para hacer cosas increíbles hoy?',
                tone: 'energético y motivador',
                avatar: '⚡'
            },
            wise: {
                name: 'Sage',
                greeting: 'Saludos. Soy Sage. La sabiduría en la gestión viene con la experiencia. ¿Cómo puedo guiarte?',
                tone: 'sabio y reflexivo',
                avatar: '🧙‍♂️'
            }
        },

        // Conocimiento del sistema (para referencia)
        systemKnowledge: {
            views: ['board', 'list', 'calendar', 'gantt', 'reports', 'dashboard', 'profitability', 'dashboard4d'],
            features: ['tareas', 'proyectos', 'estadísticas', 'reportes', 'diagramas gantt', 'calendario', 'gestión de tiempo'],
            commands: {
                'cambiar vista': 'Puedo ayudarte a cambiar entre las vistas del sistema',
                'crear proyecto': 'Te guío para crear un nuevo proyecto',
                'generar reporte': 'Puedo ayudarte a generar reportes PDF',
                'estadísticas': 'Te muestro las estadísticas del proyecto actual',
                'configuración': 'Información sobre configuraciones disponibles',
                'ayuda': 'Lista de comandos disponibles'
            }
        },

        // ---------- INICIALIZACIÓN ----------
        init: function() {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.log('🔒 Asistente desactivado - No hay sesión activa');
                return;
            }
            console.log('🧠 Inicializando Asistente General...');
            this.createAssistantUI();
            this.loadConversationHistory();
            this.setupGlobalHotkey();
            // Mostrar bienvenida tras un breve retraso
            setTimeout(() => this.showWelcomeMessage(), CONFIG.welcomeDelay);
            // Conectar sistema de voz
            VoiceCommandSystem.init();
        },

        // ---------- CREAR INTERFAZ ----------
        createAssistantUI: function() {
            if (document.getElementById('systemAssistant')) return;

            const html = `
                <div id="systemAssistant" style="
                    position: fixed; bottom: 20px; right: 20px;
                    width: 350px; background: #0f172a; border-radius: 20px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.5); z-index: 10000;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    border: 2px solid #3b82f6; overflow: hidden;
                    transform: translateY(100px); opacity: 0;
                    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                ">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
                                padding: 20px; color: white; position: relative;">
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <div id="assistantAvatar" style="font-size: 40px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2)); cursor: pointer;">🤖</div>
                            <div>
                                <div id="assistantName" style="font-size: 18px; font-weight: bold;">Oxi</div>
                                <div id="assistantStatus" style="font-size: 12px; opacity: 0.8;" data-i18n="assistantStatus">Conectado</div>
                            </div>
                        </div>
                        <button onclick="window.SystemAssistant.toggleAssistant()" style="
                            position: absolute; top: 15px; right: 15px;
                            background: rgba(255,255,255,0.2); border: none; color: white;
                            border-radius: 50%; width: 30px; height: 30px;
                            cursor: pointer; font-size: 16px;
                        ">−</button>
                    </div>

                    <!-- Chat -->
                    <div id="assistantChat" style="height: 300px; overflow-y: auto; padding: 20px; background: #0a0a1a;">
                        <div id="chatMessages"></div>
                    </div>

                    <!-- Input y acciones rápidas -->
                    <div style="padding: 15px; border-top: 1px solid #334155;">
                        <div style="display: flex; gap: 10px;">
                            <input type="text" id="assistantInput"
                                data-i18n-placeholder="assistantPlaceholder"
                                placeholder="Escribe tu pregunta o comando..."
                                style="flex:1; padding:12px 15px; border:1px solid #3b82f6; border-radius:25px;
                                       outline:none; font-size:14px; background:#1e293b; color:#e2e8f0;">
                            <button id="assistantSendBtn" style="
                                background: #3b82f6; border: none; color: white;
                                border-radius: 50%; width: 45px; height: 45px;
                                cursor: pointer; font-size: 18px;
                            ">➤</button>
                        </div>
                        <div id="quickActions" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 10px;">
                            <button onclick="window.SystemAssistant.quickAction('cambiar vista')" style="padding:8px 12px; border:1px solid #3b82f6; background:#1e293b; color:#e2e8f0; border-radius:15px; font-size:11px; cursor:pointer;" data-i18n="assistantChangeView">🔄 Cambiar Vista</button>
                            <button onclick="window.SystemAssistant.quickAction('estadísticas')" style="padding:8px 12px; border:1px solid #3b82f6; background:#1e293b; color:#e2e8f0; border-radius:15px; font-size:11px; cursor:pointer;" data-i18n="assistantStatistics">📊 Estadísticas</button>
                            <button onclick="window.SystemAssistant.quickAction('crear proyecto')" style="padding:8px 12px; border:1px solid #3b82f6; background:#1e293b; color:#e2e8f0; border-radius:15px; font-size:11px; cursor:pointer;" data-i18n="assistantNewProject">➕ Nuevo Proyecto</button>
                            <button onclick="window.SystemAssistant.quickAction('ayuda')" style="padding:8px 12px; border:1px solid #3b82f6; background:#1e293b; color:#e2e8f0; border-radius:15px; font-size:11px; cursor:pointer;" data-i18n="assistantHelp">❓ Ayuda</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', html);

            // Conectar eventos internos
            this._bindEvents();

            // Animación de entrada
            setTimeout(() => {
                const el = document.getElementById('systemAssistant');
                if (el) { el.style.transform = 'translateY(0)'; el.style.opacity = '1'; }
            }, 100);

            // Actualizar traducciones si existe la función global
            if (typeof updateTranslations === 'function') {
                updateTranslations();
                console.log('✅ Traducciones actualizadas para el asistente');
            }
        },

        _bindEvents: function() {
            const input = document.getElementById('assistantInput');
            const sendBtn = document.getElementById('assistantSendBtn');
            if (input && sendBtn) {
                // Enviar con Enter
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        this.sendMessage();
                    }
                });
                // Enviar con botón
                sendBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.sendMessage();
                });
            }
        },

        // ---------- MOSTRAR / OCULTAR ----------
        toggleAssistant: function() {
            const el = document.getElementById('systemAssistant');
            if (!el) return;
            if (this.isVisible) {
                el.style.transform = 'translateY(100px)';
                el.style.opacity = '0';
            } else {
                el.style.transform = 'translateY(0)';
                el.style.opacity = '1';
            }
            this.isVisible = !this.isVisible;
        },

        setupGlobalHotkey: function() {
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.code === 'Space') {
                    e.preventDefault();
                    this.toggleAssistant();
                }
            });
        },

        // ---------- MENSAJES ----------
        showWelcomeMessage: function() {
            if (this._welcomeShown) return;
            const lang = localStorage.getItem('preferredLanguage') || 'es';
            const saludo = lang === 'en'
                ? "Hey! I'm Oxi! 🚀 Ready to do awesome things today?"
                : "¡Hey! ¡Soy Oxi! 🚀 ¿Listo para hacer cosas increíbles hoy?";
            this.addMessage('assistant', saludo);
            this._welcomeShown = true;
        },

        addMessage: function(sender, message) {
            const chat = document.getElementById('chatMessages');
            if (!chat) return;

            const div = document.createElement('div');
            div.style.marginBottom = '15px';
            div.style.display = 'flex';
            div.style.gap = '10px';

            if (sender === 'user') {
                div.style.flexDirection = 'row-reverse';
                div.innerHTML = `<div style="background:#667eea; color:white; padding:12px 15px; border-radius:18px; max-width:80%; word-wrap:break-word; font-size:14px;">${message}</div>`;
            } else {
                const avatar = this.personalities[this.personality].avatar;
                div.innerHTML = `
                    <div style="font-size:20px; margin-top:5px;">${avatar}</div>
                    <div style="background:#1e293b; padding:12px 15px; border-radius:18px; max-width:80%; word-wrap:break-word; font-size:14px; box-shadow:0 2px 8px rgba(0,0,0,0.1); border:1px solid #e0e0e0;">${message}</div>
                `;
            }

            chat.appendChild(div);
            chat.scrollTop = chat.scrollHeight;

            // Guardar historial
            this.conversationHistory.push({
                sender: sender,
                message: message,
                timestamp: new Date().toISOString()
            });
            if (this.conversationHistory.length > CONFIG.maxHistory) {
                this.conversationHistory = this.conversationHistory.slice(-CONFIG.maxHistory);
            }
            this.saveConversationHistory();
        },

        sendMessage: function() {
            const input = document.getElementById('assistantInput');
            if (!input) return;
            const message = input.value.trim();
            if (!message) return;

            this.addMessage('user', message);
            input.value = '';

            // Procesar después de un breve delay
            setTimeout(() => {
                this.processMessage(message);
            }, 500);
        },

        // ---------- PROCESADOR PRINCIPAL DE MENSAJES ----------
        processMessage: function(message) {
            // Normalizar si es objeto (p.ej. desde voz)
            let msgText = message;
            if (typeof message === 'object' && message !== null) {
                msgText = message.content || '';
                if (!msgText) {
                    this.addMessage('assistant', '❌ No pude procesar ese mensaje.');
                    return;
                }
            }
            if (typeof msgText !== 'string') {
                this.addMessage('assistant', '❌ Ocurrió un error al procesar tu mensaje.');
                return;
            }

            const lower = msgText.toLowerCase().trim();

            // Intentar reconocer comando
            const result = this._recognizeCommand(lower, msgText);
            if (result) {
                this.addMessage('assistant', result.message);
                if (result.action) {
                    setTimeout(result.action, 800);
                }
                return;
            }

            // Si no es comando, usar respuesta inteligente genérica
            const fallback = this._generateIntelligentResponse(lower);
            this.addMessage('assistant', fallback);
        },

        // ---------- RECONOCIMIENTO DE COMANDOS ----------
        _recognizeCommand: function(lower, original) {
            // Comandos disponibles
            const commands = {
                // Saludar
                saludar: {
                    patterns: ['hola', 'hi', 'hey', 'buenas', 'hello'],
                    response: () => {
                        const name = this.personalities[this.personality].name;
                        return `¡Hola! Soy ${name}, tu asistente de proyectos. ¿En qué puedo ayudarte hoy?`;
                    }
                },
                // Crear tarea
                crearTarea: {
                    patterns: ['crear tarea', 'nueva tarea', 'agregar tarea', 'create task', 'new task'],
                    response: () => '📝 Abriendo formulario para nueva tarea...',
                    action: () => {
                        const modal = document.getElementById('createTaskModal');
                        if (modal) {
                            modal.style.display = 'block';
                            if (typeof showNotification === 'function') {
                                showNotification('📝 Formulario de nueva tarea abierto');
                            }
                        } else {
                            if (typeof showNotification === 'function') {
                                showNotification('❌ No se pudo abrir el formulario de tareas');
                            }
                        }
                    }
                },
                // Crear proyecto
                crearProyecto: {
                    patterns: ['crear proyecto', 'nuevo proyecto', 'agregar proyecto', 'create project', 'new project'],
                    response: () => '🚀 Creando nuevo proyecto...',
                    action: () => {
                        if (typeof createNewProject === 'function') {
                            createNewProject();
                        } else {
                            // Fallback con prompt
                            const name = prompt('🎯 Nombre del nuevo proyecto:');
                            if (name && name.trim()) {
                                const proj = { id: Date.now(), name: name.trim(), tasks: [] };
                                if (window.projects && Array.isArray(window.projects)) {
                                    window.projects.push(proj);
                                    window.currentProjectIndex = window.projects.length - 1;
                                    if (typeof updateLocalStorage === 'function') updateLocalStorage();
                                    if (typeof renderProjects === 'function') renderProjects();
                                    if (typeof selectProject === 'function') selectProject(window.currentProjectIndex);
                                    if (typeof showNotification === 'function') {
                                        showNotification(`✅ Proyecto "${name.trim()}" creado`);
                                    }
                                }
                            }
                        }
                    }
                },
                // Estadísticas
                estadisticas: {
                    patterns: ['estadísticas', 'estadisticas', 'progreso', 'avance', 'stats', 'statistics', 'cómo vamos', 'como vamos'],
                    response: () => {
                        try {
                            const stats = typeof getStats === 'function' ? getStats() : { total: 0, completed: 0, inProgress: 0, pending: 0, overdue: 0 };
                            const total = stats.total || 0;
                            const completion = total > 0 ? Math.round((stats.completed / total) * 100) : 0;
                            const project = (window.projects && window.projects[window.currentProjectIndex]) || { name: 'Actual' };
                            // Obtener tiempo si existe getTimeStats
                            let timeStats = { totalEstimated: 0, totalLogged: 0, remaining: 0 };
                            if (typeof getTimeStats === 'function') timeStats = getTimeStats();
                            return `📊 **Estadísticas del Proyecto "${project.name || 'Actual'}":**\n\n` +
                                   `• ✅ Completadas: ${stats.completed || 0}\n` +
                                   `• 🔄 En progreso: ${stats.inProgress || 0}\n` +
                                   `• ⏳ Pendientes: ${stats.pending || 0}\n` +
                                   `• 🚨 Rezagadas: ${stats.overdue || 0}\n` +
                                   `• 📦 Total: ${total}\n` +
                                   `• 🎯 **Progreso general: ${completion}%**\n\n` +
                                   `⏰ Tiempo: Estimado ${timeStats.totalEstimated.toFixed(1)}h | Registrado ${timeStats.totalLogged.toFixed(1)}h | Restante ${timeStats.remaining.toFixed(1)}h`;
                        } catch(e) {
                            return '❌ No pude obtener las estadísticas del proyecto en este momento.';
                        }
                    }
                },
                // Cambiar vista - se maneja con un subprocesamiento
                cambiarVista: {
                    patterns: ['cambiar vista', 'ir a', 'mostrar', 'ver', 'show', 'go to'],
                    response: (lower, original) => {
                        const viewMap = {
                            'tablero': 'board', 'kanban': 'board', 'board': 'board',
                            'lista': 'list', 'list': 'list',
                            'calendario': 'calendar', 'calendar': 'calendar',
                            'gantt': 'gantt',
                            'reporte': 'reports', 'reportes': 'reports', 'reports': 'reports',
                            'dashboard': 'dashboard',
                            'dashboard 4d': 'dashboard4d', 'dashboard4d': 'dashboard4d'
                        };
                        let targetView = null;
                        for (const [key, val] of Object.entries(viewMap)) {
                            if (lower.includes(key)) {
                                targetView = val;
                                break;
                            }
                        }
                        if (targetView && typeof showView === 'function') {
                            return {
                                message: `✅ Cambiando a vista ${targetView}...`,
                                action: () => { showView(targetView); }
                            };
                        }
                        return {
                            message: `Puedo ayudarte a cambiar a estas vistas: ${Object.keys(viewMap).join(', ')}. ¿A cuál quieres ir?`
                        };
                    }
                },
                // Reporte
                reporte: {
                    patterns: ['reporte', 'informe', 'pdf', 'generate report', 'generar reporte'],
                    response: () => '📊 Generando reporte PDF con gráfico... Esto puede tomar unos segundos.',
                    action: () => {
                        if (typeof generateStatusReportPDF === 'function') {
                            generateStatusReportPDF();
                        } else if (typeof generateProjectReport === 'function') {
                            generateProjectReport();
                        } else {
                            if (typeof showNotification === 'function') {
                                showNotification('❌ La función de generar reportes no está disponible');
                            }
                        }
                    }
                },
                // Ayuda
                ayuda: {
                    patterns: ['ayuda', 'help', 'comandos', 'qué puedes hacer', 'que puedes hacer', '?'],
                    response: () => `🎯 **Comandos disponibles:**\n\n` +
                                    `**📋 CREAR:**\n• "crear tarea" - Nueva tarea\n• "crear proyecto" - Nuevo proyecto\n\n` +
                                    `**🧭 NAVEGAR:**\n• "mostrar tablero/lista/dashboard/gantt/calendario/reportes"\n\n` +
                                    `**📊 INFORMACIÓN:**\n• "estadísticas" - Progreso del proyecto\n• "generar reporte" - PDF con gráfico\n\n` +
                                    `**⚡ ACCIONES RÁPIDAS:**\n• Usa los botones de abajo\n• "hola" - Saludo\n• "ayuda" - Esta lista`
                },
                // Agradecimiento
                gracias: {
                    patterns: ['gracias', 'thanks', 'thank you'],
                    response: () => '¡De nada! 😊 ¿Hay algo más en lo que pueda ayudarte?'
                }
            };

            // Detectar comando
            for (const [key, cmd] of Object.entries(commands)) {
                for (const pattern of cmd.patterns) {
                    if (lower.includes(pattern)) {
                        // Si es cambiarVista, necesita procesar el destino
                        if (key === 'cambiarVista') {
                            const result = cmd.response(lower, original);
                            if (typeof result === 'object' && result.message) {
                                return result;
                            }
                            return { message: result };
                        }
                        // Para otros comandos
                        let message = typeof cmd.response === 'function' ? cmd.response(lower, original) : cmd.response;
                        const action = cmd.action || null;
                        return { message, action };
                    }
                }
            }
            return null; // No reconocido
        },

        // ---------- RESPUESTAS INTELIGENTES (FALLBACK) ----------
        _generateIntelligentResponse: function(lower) {
            if (lower.includes('tiempo') || lower.includes('horas')) {
                return 'Puedo ayudarte con estimaciones de tiempo. ¿Quieres que analice una tarea específica?';
            } else if (lower.includes('proyecto') || lower.includes('gestión')) {
                return 'Para la gestión de proyectos, puedo ayudarte con: crear proyectos, organizar tareas, generar reportes y analizar progreso.';
            } else if (lower.includes('tarea') || lower.includes('task')) {
                return 'Puedo ayudarte con las tareas: creación, estimación de tiempo, asignación y seguimiento.';
            } else {
                return 'Interesante pregunta. Como asistente de gestión de proyectos, puedo ayudarte con: planificación, seguimiento, reportes y optimización de tus proyectos. ¿En qué aspecto específico necesitas ayuda?';
            }
        },

        // ---------- ACCIONES RÁPIDAS ----------
        quickAction: function(action) {
            const input = document.getElementById('assistantInput');
            if (input) {
                input.value = action;
                this.sendMessage();
            }
        },

        // ---------- CAMBIAR PERSONALIDAD ----------
        changePersonality: function(newPersonality) {
            if (!this.personalities[newPersonality]) return;
            this.personality = newPersonality;
            const avatar = document.getElementById('assistantAvatar');
            const name = document.getElementById('assistantName');
            if (avatar) avatar.textContent = this.personalities[newPersonality].avatar;
            if (name) name.textContent = this.personalities[newPersonality].name;
            this.addMessage('assistant', `Personalidad cambiada a: ${newPersonality} - ${this.personalities[newPersonality].tone}`);
        },

        // ---------- HISTORIAL ----------
        saveConversationHistory: function() {
            try {
                localStorage.setItem(CONFIG.storageKey, JSON.stringify(this.conversationHistory));
            } catch(e) { /* ignore */ }
        },

        loadConversationHistory: function() {
            try {
                const saved = localStorage.getItem(CONFIG.storageKey);
                if (saved) {
                    this.conversationHistory = JSON.parse(saved);
                    const recent = this.conversationHistory.slice(-10);
                    for (const msg of recent) {
                        this.addMessage(msg.sender, msg.message);
                    }
                }
            } catch(e) { /* ignore */ }
        }
    }; // Fin de SystemAssistant

    // ============================================================
    // SISTEMA DE VOZ – Módulo independiente pero integrado
    // ============================================================
    window.VoiceCommandSystem = {
        isListening: false,
        recognition: null,
        retryCount: 0,

        init: function() {
            console.log('🔊 Inicializando sistema de voz...');
            const voiceBtn = document.getElementById('voiceAssistantButton');
            if (!voiceBtn) {
                console.warn('⚠️ Botón de voz no encontrado, se creará uno automáticamente.');
                this.createVoiceButton();
                return;
            }
            this._connectButton(voiceBtn);
        },

        createVoiceButton: function() {
            const btn = document.createElement('button');
            btn.id = 'voiceAssistantButton';
            btn.innerHTML = '🎤 Comando de Voz';
            Object.assign(btn.style, {
                position: 'fixed',
                bottom: '90px',
                right: '20px',
                background: '#9b59b6',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                padding: '12px 20px',
                cursor: 'pointer',
                zIndex: '9999',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                fontSize: '14px',
                fontWeight: 'bold'
            });
            document.body.appendChild(btn);
            this._connectButton(btn);
            console.log('✅ Botón de voz creado automáticamente.');
        },

        _connectButton: function(btn) {
            // Remover listeners antiguos clonando
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            newBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                console.log('🖱️ Botón de voz clickeado');
                // Abrir asistente si está cerrado
                if (window.SystemAssistant && !window.SystemAssistant.isVisible) {
                    window.SystemAssistant.toggleAssistant();
                    setTimeout(() => this.startListening(), 500);
                } else {
                    this.startListening();
                }
            });

            // Añadir estilos para estado de escucha
            const style = document.createElement('style');
            style.textContent = `
                #voiceAssistantButton.listening {
                    background: #e74c3c !important;
                    animation: pulse 1s infinite;
                }
                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.7; }
                    100% { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
            console.log('✅ Botón de voz conectado.');
        },

        startListening: function() {
            if (this.isListening) {
                this.stopListening();
                return;
            }

            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                if (typeof showNotification === 'function') {
                    showNotification('❌ Tu navegador no soporta reconocimiento de voz');
                } else {
                    alert('❌ Tu navegador no soporta reconocimiento de voz');
                }
                return;
            }

            this.recognition = new SpeechRecognition();
            this.recognition.lang = CONFIG.voiceLang;
            this.recognition.interimResults = false;
            this.recognition.continuous = false;

            this.recognition.onstart = () => {
                console.log('✅ Escuchando...');
                this.isListening = true;
                this.retryCount = 0;
                this._updateButton(true);
                if (window.SystemAssistant) {
                    window.SystemAssistant.addMessage('assistant', '🎤 **Escuchando...** Habla ahora.');
                }
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                console.log('🗣️ Voz detectada:', transcript);
                this.stopListening();
                // Enviar al asistente
                if (window.SystemAssistant) {
                    window.SystemAssistant.addMessage('user', transcript);
                    setTimeout(() => {
                        window.SystemAssistant.processMessage(transcript);
                    }, 500);
                }
            };

            this.recognition.onerror = (event) => {
                console.log('❌ Error de voz:', event.error);
                if (event.error === 'no-speech' && this.retryCount < CONFIG.maxVoiceRetries) {
                    this.retryCount++;
                    console.log(`🔄 Reintento ${this.retryCount}/${CONFIG.maxVoiceRetries}`);
                    setTimeout(() => {
                        if (this.isListening) {
                            try { this.recognition.start(); } catch(e) {}
                        }
                    }, 1000);
                    return;
                }
                this.stopListening();
                let errorMsg = '❌ Error de reconocimiento de voz';
                if (event.error === 'not-allowed') {
                    errorMsg = '❌ Micrófono bloqueado. Permite el acceso al micrófono.';
                } else if (event.error === 'no-speech') {
                    errorMsg = '❌ No detecté voz. Intenta de nuevo.';
                }
                if (window.SystemAssistant) {
                    window.SystemAssistant.addMessage('assistant', errorMsg);
                }
            };

            this.recognition.onend = () => {
                console.log('🛑 Reconocimiento finalizado');
                if (this.isListening && this.retryCount < CONFIG.maxVoiceRetries) {
                    // Auto-reintento
                    setTimeout(() => {
                        if (this.isListening) {
                            try { this.recognition.start(); } catch(e) {}
                        }
                    }, 500);
                } else {
                    this.stopListening();
                }
            };

            try {
                this.recognition.start();
                console.log('✅ Reconocimiento iniciado');
            } catch (error) {
                console.error('❌ Error al iniciar reconocimiento:', error);
                this.stopListening();
                if (window.SystemAssistant) {
                    window.SystemAssistant.addMessage('assistant', '❌ Error al acceder al micrófono.');
                }
            }
        },

        stopListening: function() {
            if (this.recognition && this.isListening) {
                try { this.recognition.stop(); } catch(e) {}
            }
            this.isListening = false;
            this.retryCount = 0;
            this._updateButton(false);
        },

        _updateButton: function(listening) {
            const btn = document.getElementById('voiceAssistantButton');
            if (!btn) return;
            if (listening) {
                btn.classList.add('listening');
                btn.innerHTML = '🎤 Escuchando...';
            } else {
                btn.classList.remove('listening');
                btn.innerHTML = '🎤 Comando de Voz';
            }
        }
    };

    // ============================================================
    // FUNCIONES GLOBALES DE APOYO (para comandos)
    // ============================================================

    // Función para generar reporte con gráfico (si no existe, se define)
    if (typeof generateStatusReportPDF !== 'function') {
        window.generateStatusReportPDF = function() {
            console.log('📊 Generando reporte PDF con gráfico...');
            if (typeof generateProjectReport === 'function') {
                generateProjectReport();
            } else {
                console.error('❌ generateProjectReport no está definida');
                if (typeof showNotification === 'function') {
                    showNotification('❌ La función de generar reportes no está disponible');
                }
            }
        };
    }

    // Función para crear proyecto con asistente (si no existe)
    if (typeof createNewProjectWithAssistant !== 'function') {
        window.createNewProjectWithAssistant = function() {
            console.log('🆕 Creando proyecto mediante asistente...');
            if (typeof createNewProject === 'function') {
                createNewProject();
            } else {
                // Fallback
                const name = prompt('🎯 Nombre del nuevo proyecto:');
                if (name && name.trim()) {
                    const proj = { id: Date.now(), name: name.trim(), tasks: [] };
                    if (window.projects && Array.isArray(window.projects)) {
                        window.projects.push(proj);
                        window.currentProjectIndex = window.projects.length - 1;
                        if (typeof updateLocalStorage === 'function') updateLocalStorage();
                        if (typeof renderProjects === 'function') renderProjects();
                        if (typeof selectProject === 'function') selectProject(window.currentProjectIndex);
                        if (typeof showNotification === 'function') {
                            showNotification(`✅ Proyecto "${name.trim()}" creado`);
                        }
                    }
                }
            }
        };
    }

    // ============================================================
    // INICIALIZACIÓN AUTOMÁTICA
    // ============================================================

    document.addEventListener('DOMContentLoaded', function() {
        // Inicializar el asistente después de un pequeño retraso
        setTimeout(() => {
            if (window.SystemAssistant && window.SystemAssistant.init) {
                window.SystemAssistant.init();
            }
        }, 4000);
    });

    // Exponer algunas funciones de utilidad en la consola
    window.assistant = {
        show: () => window.SystemAssistant.toggleAssistant(),
        personality: (type) => window.SystemAssistant.changePersonality(type),
        test: (cmd) => {
            if (window.SystemAssistant) {
                window.SystemAssistant.processMessage(cmd);
            }
        }
    };

    console.log('✅ Asistente General cargado y listo.');
})();