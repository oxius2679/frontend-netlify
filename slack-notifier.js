// ===================================================
// ✅ SLACK-NOTIFIER.JS - VERSIÓN CORREGIDA
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