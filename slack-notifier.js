// ===================================================
// ✅ SLACK-NOTIFIER.JS - VERSIÓN CORREGIDA
// ===================================================

// Usar window para evitar doble declaración
window.SLACK_WEBHOOK_URL = window.SLACK_WEBHOOK_URL || "https://hooks.slack.com/services/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";
const SLACK_WEBHOOK_URL = window.SLACK_WEBHOOK_URL;

async function sendSlackMessage(text, options = {}) {
  console.log(`📨 [Slack] ${text.substring(0, 50)}...`);

  const token = localStorage.getItem('authToken');
  if (!token) {
    console.log("🔄 [SIMULACIÓN] No hay token");
    return { simulated: true };
  }

  try {
    // 🔥 ENVIAR TAMBIÉN EL WEBHOOK_URL
    const response = await fetch(`${window.API_URL}/api/slack-notify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        webhookUrl: SLACK_WEBHOOK_URL,  // ← ESTO ES LO QUE FALTABA
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

// El resto de funciones (taskCreated, taskCompleted, etc.) IGUAL



// Funciones auxiliares que necesita SlackNotifier
async function testSlackConnection() {
  console.log('🧪 Probando Slack vía backend...');
  return await sendSlackMessage(
    '🔄 *Prueba de conexión*\nSistema conectado a Slack vía backend.\n📅 ' + new Date().toLocaleString(),
    { title: '✅ Conexión Exitosa', color: '#2ecc71', emoji: ':white_check_mark:' }
  );
}

function getSlackStatus() {
  return {
    enabled: true,
    usando: 'Backend en Render',
    token: localStorage.getItem('authToken') ? '✓ Token presente' : '✗ Sin token'
  };
}

// Funciones de notificación (si no existen, créalas)
async function notifyTaskCreated(task, projectName) {
  const text = `📝 *Tarea Creada*\n• *Tarea:* ${task.name}\n• *Proyecto:* ${projectName}\n• *Responsable:* ${task.assignee || 'Sin asignar'}`;
  return sendSlackMessage(text, { title: '✅ Nueva Tarea', color: '#3498db', emoji: ':sparkles:' });
}

// ... (similar para las demás funciones)

// ===================================================
// 🚀 EXPORTAR FUNCIONES (ESTO ES LO QUE FALTABA)
// ===================================================
window.SlackNotifier = {
  send: sendSlackMessage,
  taskCreated: notifyTaskCreated,
  taskCompleted: notifyTaskCompleted,
  taskUpdated: notifyTaskUpdated,
  taskDeleted: notifyTaskDeleted,
  taskMoved: notifyTaskMoved,
  projectCreated: notifyProjectCreated,
  reportGenerated: notifyReportGenerated,
  overdueTasks: notifyOverdueTasks,
  riskAdded: notifyRiskAdded,
  test: testSlackConnection,
  getStatus: getSlackStatus
};

console.log('✅ SlackNotifier CARGADO CORRECTAMENTE');
console.log('📊 Funciones disponibles:', Object.keys(window.SlackNotifier));
