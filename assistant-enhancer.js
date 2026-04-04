// assistant-enhancer.js
(function() {
    // Solo mejorar si existe SystemAssistant
    if (typeof window.SystemAssistant !== 'object') {
        console.warn('SystemAssistant no encontrado, no se aplican mejoras');
        return;
    }

    // Guardar referencia al método original
    const originalProcessMessage = window.SystemAssistant.processMessage;

    // Nuevo método mejorado
    window.SystemAssistant.processMessage = function(message) {
        // Si el mensaje es string, convertimos a objeto (como espera original)
        const structuredMessage = typeof message === 'string' ? { type: 'user', content: message } : message;

        // Procesar comandos avanzados (sin duplicar lógica)
        const text = (structuredMessage.content || '').toLowerCase();

        // Detectar comandos para generar documentación
        if (text.includes('acta constitutiva') || text.includes('project charter')) {
            this.addMessage('assistant', '📄 Generando acta constitutiva del proyecto...');
            if (typeof window.generateProjectCharter === 'function') {
                setTimeout(() => window.generateProjectCharter(), 1000);
            } else {
                this.addMessage('assistant', '❌ Función de generación no disponible aún.');
            }
            return;
        }
        if (text.includes('acta de cierre') || text.includes('cierre')) {
            this.addMessage('assistant', '📄 Generando acta de cierre del proyecto...');
            if (typeof window.generateClosureReport === 'function') {
                setTimeout(() => window.generateClosureReport(), 1000);
            } else {
                this.addMessage('assistant', '❌ Función de generación no disponible aún.');
            }
            return;
        }

        // Detectar comandos del agente PM virtual
        if (text.includes('pm virtual') || text.includes('administrar proyecto')) {
            if (typeof window.showPMAgent === 'function') {
                window.showPMAgent();
                this.addMessage('assistant', '🖥️ Abriendo panel de PM Virtual.');
            } else {
                this.addMessage('assistant', 'PM Virtual aún no está listo.');
            }
            return;
        }

        // Si no es un comando especial, llamamos al método original
        return originalProcessMessage.call(this, structuredMessage);
    };

    console.log('✅ Asistente mejorado (generación de documentos y PM Virtual)');
})();