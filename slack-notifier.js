// ===================================================
// ✅ SLACK-NOTIFIER.JS - VERSIÓN ULTRA SIMPLE
// ===================================================

async function sendSlackMessage(text, options = {}) {
  console.log(`📨 [Slack] ${text.substring(0, 50)}...`);

  const token = localStorage.getItem('authToken');
  if (!token) {
    console.log("🔄 [SIMULACIÓN] No hay token");
    return { simulated: true };
  }

  try {
    // USAR EL ENDPOINT CORRECTO
    const response = await fetch('https://mi-sistema-proyectos-backend-4.onrender.com/api/slack-notify-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        mensaje: text,
        tipo: options.color === '#2ecc71' ? 'success' : 
               options.color === '#f39c12' ? 'warning' : 
               options.color === '#e74c3c' ? 'error' : 'info',
        color: options.color || '#3498db'
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Mensaje enviado a Slack');
      return { success: true };
    } else {
      console.error('❌ Error del servidor:', data);
      return { success: false, error: data.error || 'Error desconocido' };
    }
  } catch (error) {
    console.error('❌ Error de red:', error);
    return { success: false, error: error.message };
  }
}

async function testSlackConnection() {
  console.log('🧪 Probando Slack...');
  return await sendSlackMessage(
    '🔄 *Prueba de conexión*\nSistema conectado a Slack.\n📅 ' + new Date().toLocaleString(),
    { title: '✅ Prueba', color: '#2ecc71' }
  );
}

// Exportar funciones
window.SlackNotifier = {
  send: sendSlackMessage,
  test: testSlackConnection
};

console.log('✅ SlackNotifier listo (versión ultra simple)');