// ===================================================
// ✅ SLACK INTEGRATION - VERSIÓN COMPLETA AUTOMATIZADA
// ===================================================

// Configuración
const SLACK_CONFIG = {
  webhookUrl: "https://hooks.slack.com/services/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",
  channel: "#general",
  enabled: true,
  simulateLocal: true
};

// Sistema de cola para no sobrecargar
let messageQueue = [];
let isProcessing = false;

// ===================================================
// 🚀 Función principal mejorada
// ===================================================
async function sendSlackMessage(text, options = {}) {
  const channel = options.channel || SLACK_CONFIG.channel;
  const color = options.color || '#36a64f';
  const username = options.username || 'Sistema de Gestión';
  const emoji = options.emoji || ':robot_face:';

  console.log(`📨 [Slack] Preparando mensaje: ${text.substring(0, 50)}...`);

  if (!SLACK_CONFIG.enabled) {
    console.log('ℹ️ Slack deshabilitado, mensaje no enviado');
    return { success: false, reason: 'disabled' };
  }

  // Construir payload con formato más elaborado
  const payload = {
    channel,
    username,
    icon_emoji: emoji,
    attachments: [{
      color,
      text,
      footer: 'Sistema de Gestión de Proyectos',
      ts: Math.floor(Date.now() / 1000)
    }]
  };

  // Si hay un título, agregarlo como pretext
  if (options.title) {
    payload.attachments[0].pretext = options.title;
  }

  try {
    // Modo simulación para desarrollo local
    if (location.origin.includes("localhost") || location.protocol === "file:") {
      if (SLACK_CONFIG.simulateLocal) {
        console.log("🔄 [SIMULACIÓN] Mensaje a Slack:", payload);
        return { simulated: true, payload };
      }
    }

    const response = await fetch(SLACK_CONFIG.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    console.log("✅ Mensaje enviado a Slack");
    return { success: true };
  } catch (error) {
    console.error("❌ Error enviando a Slack:", error.message);
    
    // Agregar a cola para reintento
    messageQueue.push({ text, options });
    
    // Procesar cola si no está en proceso
    if (!isProcessing) {
      processMessageQueue();
    }
    
    return { success: false, error: error.message };
  }
}

// ===================================================
// 🗃️ Procesamiento de cola de mensajes
// ===================================================
async function processMessageQueue() {
  if (messageQueue.length === 0 || isProcessing) return;
  
  isProcessing = true;
  console.log(`🔄 Procesando cola de ${messageQueue.length} mensajes...`);
  
  while (messageQueue.length > 0) {
    const msg = messageQueue.shift();
    try {
      await sendSlackMessage(msg.text, msg.options);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1s
    } catch (e) {
      console.error('Error en cola:', e);
    }
  }
  
  isProcessing = false;
  console.log('✅ Cola de mensajes procesada');
}

// ===================================================
// 📊 NOTIFICACIONES POR TIPO DE EVENTO
// ===================================================

// Tarea creada
async function notifyTaskCreated(task, projectName) {
  const text = `📝 *Tarea Creada*\n• *Tarea:* ${task.name}\n• *Proyecto:* ${projectName}\n• *Responsable:* ${task.assignee || 'Sin asignar'}\n• *Prioridad:* ${task.priority || 'media'}`;
  return sendSlackMessage(text, {
    title: '✅ Nueva Tarea',
    color: '#3498db',
    emoji: ':sparkles:'
  });
}

// Tarea completada
async function notifyTaskCompleted(task, projectName) {
  const hours = task.estimatedTime ? `(${task.estimatedTime}h estimadas)` : '';
  const text = `✅ *Tarea Completada*\n• *Tarea:* ${task.name}\n• *Proyecto:* ${projectName}\n• *Responsable:* ${task.assignee || 'No asignado'}\n• *Tiempo:* ${task.timeLogged || 0}h registradas ${hours}`;
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

// Tarea movida (drag & drop)
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
  const taskCount = project.tasks?.length || 0;
  const text = `🚀 *Nuevo Proyecto*\n• *Nombre:* ${project.name}\n• *Tareas:* ${taskCount}\n• *Tiempo total:* ${project.totalProjectTime || 0}h`;
  return sendSlackMessage(text, {
    title: '✨ Proyecto Iniciado',
    color: '#1abc9c',
    emoji: ':rocket:'
  });
}

// Reporte generado
async function notifyReportGenerated(projectName, reportType) {
  const text = `📊 *Reporte Generado*\n• *Proyecto:* ${projectName}\n• *Tipo:* ${reportType}\n• *Usuario:* ${localStorage.getItem('userEmail') || 'Sistema'}`;
  return sendSlackMessage(text, {
    title: '📈 Nuevo Reporte',
    color: '#34495e',
    emoji: ':bar_chart:'
  });
}

// Alerta de tareas atrasadas
async function notifyOverdueTasks(overdueTasks, projectName) {
  const taskList = overdueTasks.map(t => `• *${t.name}* (vence: ${new Date(t.deadline).toLocaleDateString()})`).join('\n');
  const text = `⚠️ *Tareas Atrasadas*\n📋 *Proyecto:* ${projectName}\n📌 *Total:* ${overdueTasks.length} tareas\n\n${taskList}`;
  return sendSlackMessage(text, {
    title: '🚨 Alerta de Riesgo',
    color: '#e67e22',
    emoji: ':warning:'
  });
}

// Riesgo agregado
async function notifyRiskAdded(risk, projectName) {
  const text = `⚠️ *Nuevo Riesgo*\n• *Proyecto:* ${projectName}\n• *Riesgo:* ${risk.texto || risk}\n• *Fecha:* ${new Date().toLocaleDateString()}`;
  return sendSlackMessage(text, {
    title: '🛡️ Riesgo Identificado',
    color: '#e74c3c',
    emoji: ':sos:'
  });
}

// ===================================================
// 🔧 Funciones de utilidad
// ===================================================

// Probar conexión
async function testSlackConnection() {
  console.log('🧪 Probando conexión a Slack...');
  const result = await sendSlackMessage(
    '🔄 *Prueba de conexión*\nSistema de Gestión conectado correctamente a Slack.\n📅 ' + new Date().toLocaleString(),
    {
      title: '✅ Conexión Exitosa',
      color: '#2ecc71',
      emoji: ':white_check_mark:'
    }
  );
  
  if (result.success || result.simulated) {
    console.log('✅ Slack configurado correctamente');
    return true;
  } else {
    console.error('❌ Error en configuración de Slack');
    return false;
  }
}

// Activar/Desactivar Slack
function setSlackEnabled(enabled) {
  SLACK_CONFIG.enabled = enabled;
  console.log(`🔔 Slack ${enabled ? 'activado' : 'desactivado'}`);
}

// Ver estado
function getSlackStatus() {
  return {
    enabled: SLACK_CONFIG.enabled,
    webhookUrl: SLACK_CONFIG.webhookUrl,
    channel: SLACK_CONFIG.channel,
    queueLength: messageQueue.length,
    simulateLocal: SLACK_CONFIG.simulateLocal
  };
}

// ===================================================
// 🚀 Exportar funciones
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

console.log('✅ Sistema de Slack automatizado cargado');
console.log('📊 Para probar, usa: SlackNotifier.test()');