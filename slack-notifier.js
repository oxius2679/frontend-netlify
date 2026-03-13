// ===================================================
// ✅ SLACK-NOTIFIER.JS - VERSIÓN FUNCIONAL
// ===================================================

const SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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";

async function sendSlackMessage(text, options = {}) {
  console.log(`📨 [Slack] ${text.substring(0, 50)}...`);

  const token = localStorage.getItem('authToken');
  if (!token) {
    console.log("🔄 [SIMULACIÓN] No hay token");
    return { simulated: true };
  }

  try {
    const response = await fetch(`${window.API_URL}/api/slack-notify-user`, {
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
      throw new Error(data.error || 'Error desconocido');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    return { success: false, error: error.message };
  }
}

// Funciones de notificación
async function notifyTaskCreated(task, projectName) {
  const text = `📝 *Tarea Creada*\n• *Tarea:* ${task.name}\n• *Proyecto:* ${projectName}`;
  return sendSlackMessage(text, { title: '✅ Nueva Tarea', color: '#3498db' });
}

async function notifyTaskCompleted(task, projectName) {
  const text = `✅ *Tarea Completada*\n• *Tarea:* ${task.name}\n• *Proyecto:* ${projectName}`;
  return sendSlackMessage(text, { title: '🎉 Completada', color: '#2ecc71' });
}

async function testSlackConnection() {
  return sendSlackMessage('🔄 *Prueba de conexión*\nSistema conectado a Slack.\n📅 ' + new Date().toLocaleString(), 
    { title: '✅ Conexión Exitosa', color: '#2ecc71' });
}

// Exportar
window.SlackNotifier = {
  send: sendSlackMessage,
  taskCreated: notifyTaskCreated,
  taskCompleted: notifyTaskCompleted,
  test: testSlackConnection
};

console.log('✅ SlackNotifier listo');