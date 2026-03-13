// ===================================================
// ✅ SLACK-NOTIFIER.JS - VERSIÓN COMPLETA CON TODOS LOS EVENTOS
// ===================================================


// Sistema de cola para no sobrecargar
let messageQueue = [];
let isProcessing = false;

// ===================================================
// 🚀 Función principal de envío
// ===================================================
// CAMBIA la función sendSlackMessage para usar /api/slack-notify-user

async function sendSlackMessage(text, options = {}) {
  console.log(`📨 [Slack] ${text.substring(0, 50)}...`);

  const token = localStorage.getItem('authToken');
  if (!token) {
    console.log("🔄 [SIMULACIÓN] No hay token");
    return { simulated: true };
  }

  try {
    // ✅ Usa el nuevo endpoint por usuario
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
    
    if (response.status === 404 && data.error?.includes('no tiene Slack')) {
      console.log('⚠️ Usuario no tiene Slack configurado');
      return { notConfigured: true };
    }
    
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
// 📊 NOTIFICACIONES POR TIPO DE EVENTO
// ===================================================

// 🆕 Tarea creada
async function notifyTaskCreated(task, projectName) {
  const text = `📝 *Tarea Creada*\n• *Tarea:* ${task.name}\n• *Proyecto:* ${projectName}\n• *Responsable:* ${task.assignee || 'Sin asignar'}\n• *Prioridad:* ${task.priority || 'media'}`;
  return sendSlackMessage(text, {
    title: '✅ Nueva Tarea',
    color: '#3498db',
    emoji: ':sparkles:'
  });
}

// ✅ Tarea completada
async function notifyTaskCompleted(task, projectName) {
  const text = `✅ *Tarea Completada*\n• *Tarea:* ${task.name}\n• *Proyecto:* ${projectName}\n• *Responsable:* ${task.assignee || 'No asignado'}`;
  return sendSlackMessage(text, {
    title: '🎉 ¡Felicidades!',
    color: '#2ecc71',
    emoji: ':tada:'
  });
}

// 🔄 Tarea actualizada
async function notifyTaskUpdated(task, projectName, changes) {
  const text = `🔄 *Tarea Actualizada*\n• *Tarea:* ${task.name}\n• *Proyecto:* ${projectName}\n• *Cambios:* ${changes}`;
  return sendSlackMessage(text, {
    title: '📋 Actualización',
    color: '#f39c12',
    emoji: ':pencil:'
  });
}

// 🗑️ Tarea eliminada
async function notifyTaskDeleted(taskName, projectName) {
  const text = `🗑️ *Tarea Eliminada*\n• *Tarea:* ${taskName}\n• *Proyecto:* ${projectName}`;
  return sendSlackMessage(text, {
    title: '❌ Eliminación',
    color: '#e74c3c',
    emoji: ':wastebasket:'
  });
}

// 🎯 Tarea movida (drag & drop)
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

// 🚀 Proyecto creado
async function notifyProjectCreated(project) {
  const text = `🚀 *Nuevo Proyecto*\n• *Nombre:* ${project.name}\n• *Tareas:* ${project.tasks?.length || 0}`;
  return sendSlackMessage(text, {
    title: '✨ Proyecto Iniciado',
    color: '#1abc9c',
    emoji: ':rocket:'
  });
}

// 📊 Reporte generado
async function notifyReportGenerated(projectName, reportType) {
  const text = `📊 *Reporte Generado*\n• *Proyecto:* ${projectName}\n• *Tipo:* ${reportType}`;
  return sendSlackMessage(text, {
    title: '📈 Nuevo Reporte',
    color: '#34495e',
    emoji: ':bar_chart:'
  });
}

// ⚠️ Tareas atrasadas
async function notifyOverdueTasks(overdueTasks, projectName) {
  const taskList = overdueTasks.map(t => `• *${t.name}*`).join('\n');
  const text = `⚠️ *Tareas Atrasadas*\n📋 *Proyecto:* ${projectName}\n📌 *Total:* ${overdueTasks.length} tareas\n\n${taskList}`;
  return sendSlackMessage(text, {
    title: '🚨 Alerta de Riesgo',
    color: '#e67e22',
    emoji: ':warning:'
  });
}

// 🛡️ Riesgo agregado
async function notifyRiskAdded(risk, projectName) {
  const text = `⚠️ *Nuevo Riesgo*\n• *Proyecto:* ${projectName}\n• *Riesgo:* ${risk.texto || risk}`;
  return sendSlackMessage(text, {
    title: '🛡️ Riesgo Identificado',
    color: '#e74c3c',
    emoji: ':sos:'
  });
}

// 🔧 Utilidades
async function testSlackConnection() {
  console.log('🧪 Probando Slack...');
  return await sendSlackMessage(
    '🔄 *Prueba de conexión*\nSistema conectado a Slack.\n📅 ' + new Date().toLocaleString(),
    { title: '✅ Conexión Exitosa', color: '#2ecc71', emoji: ':white_check_mark:' }
  );
}

function getSlackStatus() {
  return {
    enabled: true,
    usando: 'Backend en Render',
    token: localStorage.getItem('authToken') ? '✓ Token presente' : '✗ Sin token',
    queueLength: messageQueue.length
  };
}

// ===================================================
// 🚀 EXPORTAR FUNCIONES
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

console.log('✅ SlackNotifier CARGADO - Todas las notificaciones automáticas listas');
console.log('📊 Eventos disponibles:', Object.keys(window.SlackNotifier));