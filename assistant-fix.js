// ============================================
// 🔧 FIX ASISTENTE BILINGÜE
// ============================================

(function fixAssistant() {
    console.log('🔥 Aplicando fix al asistente...');

    // Esperar a que el DOM y el asistente estén listos
    function aplicarFix() {
        // Verificar si el asistente ya existe
        if (!document.getElementById('systemAssistant')) {
            console.log('⏳ Asistente no encontrado, reintentando...');
            setTimeout(aplicarFix, 500);
            return;
        }

        console.log('✅ Asistente encontrado, aplicando fix...');

        // === 1. CREAR VoiceCommandSystem si no existe ===
        if (!window.VoiceCommandSystem) {
            window.VoiceCommandSystem = {
                showResponse: function(text) {
                    const chat = document.getElementById('chatMessages');
                    if (!chat) return;
                    const div = document.createElement('div');
                    div.style.cssText = `
                        margin-bottom: 10px;
                        padding: 10px 14px;
                        border-radius: 14px;
                        max-width: 85%;
                        word-wrap: break-word;
                        background: #2d3748;
                        color: #e2e8f0;
                        border-left: 4px solid #8b5cf6;
                        font-size: 14px;
                        line-height: 1.5;
                    `;
                    div.textContent = text;
                    chat.appendChild(div);
                    chat.scrollTop = chat.scrollHeight;
                }
            };
        }

        // === 2. processCommand BILINGÜE ===
        window.VoiceCommandSystem.processCommand = function(command) {
            const cmd = command.toLowerCase().trim();
            console.log('🎯 Procesando comando:', cmd);

            const lang = localStorage.getItem('preferredLanguage') || 'es';
            const errorMsg = lang === 'en' 
                ? "❌ Command not recognized. Type **'help'** to see available commands."
                : "❌ Comando no reconocido. Escribe **'ayuda'** para ver los comandos disponibles.";

            // --- SALUDOS ---
            if (cmd.includes('hola') || cmd.includes('hello') || cmd.includes('hi') || cmd.includes('hey')) {
                const saludo = lang === 'en' 
                    ? "Hey! I'm Oxi! 🚀 Ready to do awesome things today?"
                    : "¡Hey! ¡Soy Oxi! 🚀 ¿Listo para hacer cosas increíbles hoy?";
                this.showResponse(saludo);
                return;
            }

            // --- AYUDA ---
            if (cmd.includes('ayuda') || cmd.includes('help')) {
                this.showHelp();
                return;
            }

            // --- CREAR TAREA ---
            if (cmd.includes('crear tarea') || cmd.includes('nueva tarea') || 
                cmd.includes('create task') || cmd.includes('new task')) {
                let taskName = cmd.replace(/crear tarea|nueva tarea|create task|new task/gi, '').trim();
                if (!taskName) {
                    const msg = lang === 'en' 
                        ? "✅ Please say: **'create task [name]'**"
                        : "✅ Por favor di: **'crear tarea [nombre]'**";
                    this.showResponse(msg);
                    return;
                }
                const msg = lang === 'en' 
                    ? `✅ Task "${taskName}" created successfully!`
                    : `✅ Tarea "${taskName}" creada exitosamente!`;
                this.showResponse(msg);
                if (window.voiceAssistant && typeof window.voiceAssistant.createTaskByVoice === 'function') {
                    window.voiceAssistant.createTaskByVoice(command);
                }
                return;
            }

            // --- ESTADÍSTICAS ---
            if (cmd.includes('estadísticas') || cmd.includes('estadisticas') || 
                cmd.includes('statistics') || cmd.includes('stats')) {
                this.showStatistics();
                return;
            }

            // --- NAVEGACIÓN ---
            if (cmd.includes('dashboard') || cmd.includes('ver dashboard') || cmd.includes('mostrar dashboard') || cmd.includes('show dashboard')) {
                if (typeof showView === 'function') showView('dashboard');
                this.showResponse(lang === 'en' ? "🔊 Showing dashboard" : "🔊 Mostrando dashboard");
                return;
            }

            if (cmd.includes('tablero') || cmd.includes('kanban') || cmd.includes('board') || 
                cmd.includes('mostrar tablero') || cmd.includes('ver tablero') || cmd.includes('show board')) {
                if (typeof showView === 'function') showView('board');
                this.showResponse(lang === 'en' ? "🔊 Showing board view" : "🔊 Mostrando vista de tablero");
                return;
            }

            if (cmd.includes('lista') || cmd.includes('list') || 
                cmd.includes('mostrar lista') || cmd.includes('ver lista') || cmd.includes('show list')) {
                if (typeof showView === 'function') showView('list');
                this.showResponse(lang === 'en' ? "🔊 Showing list view" : "🔊 Mostrando vista de lista");
                return;
            }

            if (cmd.includes('calendario') || cmd.includes('calendar') || 
                cmd.includes('mostrar calendario') || cmd.includes('ver calendario') || cmd.includes('show calendar')) {
                if (typeof showView === 'function') showView('calendar');
                this.showResponse(lang === 'en' ? "🔊 Showing calendar" : "🔊 Mostrando calendario");
                return;
            }

            if (cmd.includes('reportes') || cmd.includes('reports') || 
                cmd.includes('mostrar reportes') || cmd.includes('ver reportes') || cmd.includes('show reports')) {
                if (typeof showView === 'function') showView('reports');
                this.showResponse(lang === 'en' ? "🔊 Showing reports" : "🔊 Mostrando reportes");
                return;
            }

            // --- GENERAR REPORTE ---
            if (cmd.includes('generar reporte') || cmd.includes('generate report') || cmd.includes('report')) {
                this.showResponse(lang === 'en' 
                    ? "📊 Generating PDF report... This may take a few seconds."
                    : "📊 Generando reporte PDF... Esto puede tomar unos segundos.");
                if (typeof generateStatusReportPDF === 'function') {
                    setTimeout(() => {
                        try { generateStatusReportPDF(); } catch(e) {}
                    }, 2000);
                }
                return;
            }

            // --- CREAR PROYECTO ---
            if (cmd.includes('nuevo proyecto') || cmd.includes('crear proyecto') || 
                cmd.includes('new project') || cmd.includes('create project')) {
                if (typeof createNewProject === 'function') {
                    createNewProject();
                    this.showResponse(lang === 'en' ? "🔊 Creating new project" : "🔊 Creando nuevo proyecto");
                }
                return;
            }

            // --- LIMPIAR FILTROS ---
            if (cmd.includes('limpiar filtros') || cmd.includes('clear filters')) {
                if (typeof aplicarFiltros === 'function') {
                    ['filterAssignee', 'filterPriority', 'filterStatus', 'filterStartDate', 'filterEndDate'].forEach(id => {
                        const el = document.getElementById(id);
                        if (el) el.value = '';
                    });
                    aplicarFiltros();
                    this.showResponse(lang === 'en' ? "🔊 Filters cleared" : "🔊 Filtros limpiados");
                }
                return;
            }

            // --- CAMBIAR VISTA ---
            if (cmd.includes('cambiar vista') || cmd.includes('change view')) {
                const viewNames = lang === 'en' 
                    ? 'board, list, calendar, dashboard, reports'
                    : 'tablero, lista, calendario, dashboard, reportes';
                this.showResponse(lang === 'en' 
                    ? `🔍 Available views: **${viewNames}**. Type e.g. "show board"`
                    : `🔍 Vistas disponibles: **${viewNames}**. Ej: "mostrar tablero"`);
                return;
            }

            this.showResponse(errorMsg);
        };

        // === 3. showHelp ===
        window.VoiceCommandSystem.showHelp = function() {
            const lang = localStorage.getItem('preferredLanguage') || 'es';
            const helpText = lang === 'en' ? 
                '🎯 **AVAILABLE COMMANDS:**\n\n📋 CREATE:\n"create task [name]" - New task\n"new project" - Create project\n\n🧭 NAVIGATE:\n"show board" - Kanban view\n"show list" - List view\n"show calendar" - Calendar view\n"show dashboard" - Dashboard view\n"show reports" - Reports view\n"change view" - See available views\n\n📊 INFORMATION:\n"statistics" - Project progress\n"generate report" - Generate PDF report\n\n⚡ ACTIONS:\n"clear filters" - Remove all filters\n"hello" - Greeting\n"help" - Show this list\n"stop" - Stop listening'
                :
                '🎯 **COMANDOS DISPONIBLES:**\n\n📋 CREAR:\n"crear tarea [nombre]" - Nueva tarea\n"nuevo proyecto" - Crear proyecto\n\n🧭 NAVEGAR:\n"mostrar tablero" - Vista Kanban\n"mostrar lista" - Vista lista\n"mostrar calendario" - Vista calendario\n"mostrar dashboard" - Vista dashboard\n"mostrar reportes" - Vista reportes\n"cambiar vista" - Ver vistas disponibles\n\n📊 INFORMACIÓN:\n"estadísticas" - Progreso del proyecto\n"generar reporte" - Generar reporte PDF\n\n⚡ ACCIONES:\n"limpiar filtros" - Remover filtros\n"hola" - Saludo\n"ayuda" - Ver esta lista\n"detener" - Parar escucha';
            this.showResponse(helpText);
        };

        // === 4. showStatistics ===
        window.VoiceCommandSystem.showStatistics = function() {
            const lang = localStorage.getItem('preferredLanguage') || 'es';
            const project = window.projects && window.currentProjectIndex !== undefined ? window.projects[window.currentProjectIndex] : null;
            if (!project) {
                this.showResponse(lang === 'en' ? '❌ No project selected' : '❌ No hay proyecto seleccionado');
                return;
            }
            const tasks = project.tasks || [];
            const total = tasks.length;
            const completed = tasks.filter(t => t.status === 'completed').length;
            const pending = tasks.filter(t => t.status === 'pending').length;
            const inProgress = tasks.filter(t => t.status === 'inProgress').length;
            const overdue = tasks.filter(t => t.status === 'overdue').length;
            const progress = total ? Math.round((completed / total) * 100) : 0;
            this.showResponse(lang === 'en'
                ? `📊 **Project Statistics:**\n• Total: ${total}\n• Pending: ${pending}\n• In Progress: ${inProgress}\n• Completed: ${completed}\n• Overdue: ${overdue}\n• Progress: ${progress}%`
                : `📊 **Estadísticas del Proyecto:**\n• Total: ${total}\n• Pendientes: ${pending}\n• En Progreso: ${inProgress}\n• Completados: ${completed}\n• Rezagados: ${overdue}\n• Avance: ${progress}%`);
        };

        // === 5. Redirigir SystemAssistant.sendMessage ===
        if (window.SystemAssistant) {
            window.SystemAssistant.sendMessage = function() {
                const input = document.getElementById('assistantInput');
                const msg = input ? input.value.trim() : '';
                if (!msg) return;
                if (window.SystemAssistant && typeof window.SystemAssistant.addMessage === 'function') {
                    window.SystemAssistant.addMessage('user', msg);
                }
                if (input) input.value = '';
                if (window.VoiceCommandSystem && typeof window.VoiceCommandSystem.processCommand === 'function') {
                    window.VoiceCommandSystem.processCommand(msg);
                }
            };
            window.SystemAssistant.processMessage = function() { return; };
        }

        // === 6. Desactivar voiceAssistant ===
        if (window.voiceAssistant) {
            window.voiceAssistant.handleCommand = function() { return; };
        }

        // === 7. Conectar input y botón ===
        const input = document.getElementById('assistantInput');
        if (input) {
            const newInput = input.cloneNode(true);
            input.parentNode.replaceChild(newInput, input);
            newInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if (window.SystemAssistant && typeof window.SystemAssistant.sendMessage === 'function') {
                        window.SystemAssistant.sendMessage();
                    }
                }
            });
        }

        const btn = document.querySelector('#systemAssistant button[style*="background: #3b82f6"]');
        if (btn) {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (window.SystemAssistant && typeof window.SystemAssistant.sendMessage === 'function') {
                    window.SystemAssistant.sendMessage();
                }
            });
        }

        // === 8. Bloquear showNotification para errores ===
        const originalNotify = window.showNotification || function() {};
        window.showNotification = function(msg) {
            if (typeof msg === 'string' && 
                (msg.toLowerCase().includes('comando no reconocido') || 
                 msg.toLowerCase().includes('command not recognized'))) {
                console.log('🚫 Error bloqueado:', msg);
                return;
            }
            originalNotify(msg);
        };

        console.log('✅ Fix aplicado correctamente. El asistente ahora es bilingüe.');
    }

    // Esperar a que el DOM esté listo y luego aplicar el fix
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(aplicarFix, 1000);
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(aplicarFix, 1000);
        });
    }
})();

// ============================================
// 🔧 TRADUCIR MENSAJES DE VOZ (sobrescritura)
// ============================================

(function traducirMensajesVoz() {
    console.log('🔧 Aplicando traducción a mensajes de voz...');

    function aplicar() {
        const va = window.voiceAssistant;
        if (!va || !va.recognition) {
            console.log('⏳ voiceAssistant no disponible, reintentando...');
            setTimeout(aplicar, 500);
            return;
        }

        const lang = localStorage.getItem('preferredLanguage') || 'es';

        // 1. onstart
        const originalOnStart = va.recognition.onstart;
        va.recognition.onstart = function() {
            console.log("✅ Escuchando... Habla ahora");
            va.isListening = true;
            va.retryCount = 0;
            if (typeof va.updateButton === 'function') va.updateButton(true);
            const msg = lang === 'en' 
                ? "🎤 **Listening...**\n\n**Speak now** - Say for example:\n• \"create task\"\n• \"show dashboard\"\n• \"statistics\""
                : "🎤 **Escuchando...**\n\n**Habla ahora** - Di por ejemplo:\n• \"crear tarea\"\n• \"mostrar dashboard\"\n• \"estadísticas\"";
            if (typeof va.showResponse === 'function') va.showResponse(msg);
        };
        console.log('✅ onstart sobrescrito');

        // 2. onerror
        const originalOnError = va.recognition.onerror;
        va.recognition.onerror = function(event) {
            console.log("❌ Error de voz:", event.error);
            if (event.error === 'no-speech' && va.retryCount < va.maxRetries) {
                va.retryCount++;
                const msg = lang === 'en' 
                    ? `🎤 No voice detected... Retrying (${va.retryCount}/${va.maxRetries})\n\n**Speak now**`
                    : `🎤 No detecté voz... Reintentando (${va.retryCount}/${va.maxRetries})\n\n**Habla ahora**`;
                if (typeof va.showResponse === 'function') va.showResponse(msg);
                setTimeout(() => {
                    if (va.isListening && va.recognition) {
                        try { va.recognition.start(); } catch(e) {}
                    }
                }, 1000);
                return;
            }
            if (typeof va.stopListening === 'function') va.stopListening();
            let errorMsg = lang === 'en' ? "❌ Voice recognition error" : "❌ Error de reconocimiento de voz";
            if (event.error === 'not-allowed') {
                errorMsg = lang === 'en' 
                    ? "❌ Microphone blocked. Please allow microphone access."
                    : "❌ Micrófono bloqueado. Por favor permite el acceso al micrófono.";
            } else if (event.error === 'no-speech') {
                errorMsg = lang === 'en' 
                    ? "❌ No speech detected. Speak clearly and say 'help' for commands."
                    : "❌ No detecté voz. Asegúrate de hablar claramente y di 'ayuda' para ver comandos.";
            }
            if (typeof va.showResponse === 'function') va.showResponse(errorMsg);
        };
        console.log('✅ onerror sobrescrito');

        // 3. onresult
        const originalOnResult = va.recognition.onresult;
        va.recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            console.log("🗣️ Voz detectada:", transcript);
            if (typeof va.stopListening === 'function') va.stopListening();
            const msg = lang === 'en' 
                ? `🎤 **You said:** "${transcript}"`
                : `🎤 **Dijiste:** "${transcript}"`;
            if (typeof va.showResponse === 'function') va.showResponse(msg);
            setTimeout(() => {
                if (typeof va.processCommand === 'function') {
                    va.processCommand(transcript);
                } else if (window.VoiceCommandSystem && typeof window.VoiceCommandSystem.processCommand === 'function') {
                    window.VoiceCommandSystem.processCommand(transcript);
                }
            }, 1000);
        };
        console.log('✅ onresult sobrescrito');

        // 4. showResponse (para filtrar errores genéricos)
        if (typeof va.showResponse === 'function') {
            const originalShowResponse = va.showResponse;
            va.showResponse = function(msg) {
                if (typeof msg === 'string') {
                    if (msg.includes('Comando no reconocido') || msg.includes('Command not recognized')) {
                        msg = lang === 'en' 
                            ? "❌ Command not recognized. Type **'help'** to see available commands."
                            : "❌ Comando no reconocido. Escribe **'ayuda'** para ver los comandos disponibles.";
                    }
                }
                originalShowResponse.call(this, msg);
            };
            console.log('✅ showResponse sobrescrito');
        }

        console.log('✅ Mensajes de voz traducidos al inglés.');
    }

    // Esperar a que voiceAssistant esté disponible
    if (window.voiceAssistant && window.voiceAssistant.recognition) {
        aplicar();
    } else {
        let intentos = 0;
        const maxIntentos = 20;
        const interval = setInterval(() => {
            intentos++;
            if (window.voiceAssistant && window.voiceAssistant.recognition) {
                clearInterval(interval);
                aplicar();
            } else if (intentos >= maxIntentos) {
                clearInterval(interval);
                console.warn('⚠️ No se encontró voiceAssistant después de varios intentos');
            }
        }, 500);
    }
})();