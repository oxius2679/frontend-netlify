// ===================================================
// ✅ SLACK INTEGRATION - VERSIÓN CON VARIABLES DE ENTORNO
// ===================================================

// Obtener webhook desde variable de entorno (Vite)
const SLACK_WEBHOOK_URL = import.meta.env.VITE_SLACK_WEBHOOK_URL || "";

// Sistema de cola
let messageQueue = [];
let isProcessing = false;

// ===================================================
// 🚀 Función principal
// ===================================================
async function sendSlackMessage(text, options = {}) {
  const channel = options.channel || "#general";
  const color = options.color || "#36a64f";
  const username = options.username || "Sistema de Gestión";
  const emoji = options.emoji || ":robot_face:";

  console.log(`📨 [Slack] ${text.substring(0, 50)}...`);

  // Si no hay webhook, solo simular
  if (!SLACK_WEBHOOK_URL) {
    console.log("🔄 [SIMULACIÓN] Mensaje a Slack:", { text, options });
    return { simulated: true };
  }

  try {
    const payload = {
      channel,
      username,
      icon_emoji: emoji,
      attachments: [{
        color,
        text,
        footer: 'Sistema de Gestión',
        ts: Math.floor(Date.now() / 1000)
      }]
    };

    if (options.title) {
      payload.attachments[0].pretext = options.title;
    }

    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    console.log("✅ Mensaje enviado a Slack");
    return { success: true };
  } catch (error) {
    console.error("❌ Error:", error.message);
    messageQueue.push({ text, options });
    if (!isProcessing) processMessageQueue();
    return { success: false, error: error.message };
  }
}

// ===================================================
// 🗃️ Procesar cola
// ===================================================
async function processMessageQueue() {
  if (messageQueue.length === 0 || isProcessing) return;
  isProcessing = true;
  
  while (messageQueue.length > 0) {
    const msg = messageQueue.shift();
    await sendSlackMessage(msg.text, msg.options);
    await new Promise(r => setTimeout(r, 1000));
  }
  
  isProcessing = false;
}

// ===================================================
// 📊 NOTIFICACIONES
// ===================================================

// Tarea creada
async function notifyTaskCreated(task, projectName) {
  const text = `📝 *Tarea Creada*\n• *Tarea:* ${task.name}\n• *Proyecto:* ${projectName}\n• *Responsable:* ${task.assignee || 'Sin asignar'}`;
  return sendSlackMessage(text, {
    title: '✅ Nueva Tarea',
    color: '#3498db',
    emoji: ':sparkles:'
  });
}

// Tarea completada
async function notifyTaskCompleted(task, projectName) {
  const text = `✅ *Tarea Completada*\n• *Tarea:* ${task.name}\n• *Proyecto:* ${projectName}\n• *Responsable:* ${task.assignee || 'No asignado'}`;
  return sendSlackMessage(text, {
    title: '🎉 ¡Felicidades!',
    color: '#2ecc71',
    emoji: ':tada:'
  });
}

// Tarea actualizada
async function notifyTaskUpdated(task, projectName, changes) {
  const text = `🔄 *Tarea Actualizada*\n• *Tarea:* ${task.name}\n• *Proyecto:* ${projectName}\n• *Cambios:* ${changes}`;
  return sendSlackMessage(text, {
    title: '📋 Actualización',
    color: '#f39c12',
    emoji: ':pencil:'
  });
}

// Tarea eliminada
async function notifyTaskDeleted(taskName, projectName) {
  const text = `🗑️ *Tarea Eliminada*\n• *Tarea:* ${taskName}\n• *Proyecto:* ${projectName}`;
  return sendSlackMessage(text, {
    title: '❌ Eliminación',
    color: '#e74c3c',
    emoji: ':wastebasket:'
  });
}

// Tarea movida
async function notifyTaskMoved(task, fromStatus, toStatus, projectName) {
  const statusNames = {
    'pending': '⏳ Pendiente',
    'inProgress': '🔄 En Progreso',
    'completed': '✅ Completada',
    'overdue': '⚠️ Rezagada'
  };
  
  const text = `🎯 *Tarea Movida*\n• *Tarea:* ${task.name}\n• *De:* ${statusNames[fromStatus] || fromStatus}\n• *A:* ${statusNames[toStatus] || toStatus}\n• *Proyecto:* ${projectName}`;
  return sendSlackMessage(text, {
    title: '🔄 Cambio de Estado',
    color: '#9b59b6',
    emoji: ':arrows_counterclockwise:'
  });
}

// Proyecto creado
async function notifyProjectCreated(project) {
  const text = `🚀 *Nuevo Proyecto*\n• *Nombre:* ${project.name}\n• *Tareas:* ${project.tasks?.length || 0}`;
  return sendSlackMessage(text, {
    title: '✨ Proyecto Iniciado',
    color: '#1abc9c',
    emoji: ':rocket:'
  });
}

// Reporte generado
async function notifyReportGenerated(projectName, reportType) {
  const text = `📊 *Reporte Generado*\n• *Proyecto:* ${projectName}\n• *Tipo:* ${reportType}`;
  return sendSlackMessage(text, {
    title: '📈 Nuevo Reporte',
    color: '#34495e',
    emoji: ':bar_chart:'
  });
}

// Tareas atrasadas
async function notifyOverdueTasks(overdueTasks, projectName) {
  const taskList = overdueTasks.map(t => `• *${t.name}*`).join('\n');
  const text = `⚠️ *Tareas Atrasadas*\n📋 *Proyecto:* ${projectName}\n📌 *Total:* ${overdueTasks.length} tareas\n\n${taskList}`;
  return sendSlackMessage(text, {
    title: '🚨 Alerta',
    color: '#e67e22',
    emoji: ':warning:'
  });
}

// Riesgo agregado
async function notifyRiskAdded(risk, projectName) {
  const text = `⚠️ *Nuevo Riesgo*\n• *Proyecto:* ${projectName}\n• *Riesgo:* ${risk.texto || risk}`;
  return sendSlackMessage(text, {
    title: '🛡️ Riesgo',
    color: '#e74c3c',
    emoji: ':sos:'
  });
}

// ===================================================
// 🔧 Utilidades
// ===================================================

// Probar conexión
async function testSlackConnection() {
  console.log('🧪 Probando Slack...');
  return await sendSlackMessage(
    '🔄 *Prueba de conexión*\nSistema conectado a Slack.\n📅 ' + new Date().toLocaleString(),
    { title: '✅ Conexión Exitosa', color: '#2ecc71', emoji: ':white_check_mark:' }
  );
}

// Activar/Desactivar
function setSlackEnabled(enabled) {
  window.__slackEnabled = enabled;
}

// Ver estado
function getSlackStatus() {
  return {
    enabled: window.__slackEnabled !== false,
    webhookUrl: SLACK_WEBHOOK_URL ? "✓ Configurado" : "✗ No configurado",
    queueLength: messageQueue.length,
    simulateLocal: !SLACK_WEBHOOK_URL
  };
}

// ===================================================
// 🚀 Exportar
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
  setEnabled: setSlackEnabled,
  getStatus: getSlackStatus
};

console.log('✅ Slack cargado. Webhook:', SLACK_WEBHOOK_URL ? "✓" : "✗ (modo simulación)");