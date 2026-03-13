// ===================================================
// ✅ SLACK INTEGRATION - VERSIÓN CON BACKEND (RENDER)
// ===================================================

const API_URL = "https://mi-sistema-proyectos-backend-4.onrender.com";

async function sendSlackMessage(text, options = {}) {
  console.log(`📨 [Slack] Enviando mensaje vía backend...`);

  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      console.log('🔄 [SIMULACIÓN] No hay token, simulando mensaje:', text);
      return { simulated: true };
    }

    const response = await fetch(`${API_URL}/api/slack-notify`, {
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
        titulo: options.title
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Mensaje enviado a Slack vía backend');
      return { success: true };
    } else {
      throw new Error(data.error || 'Error desconocido');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    return { success: false, error: error.message };
  }
}

// EL RESTO DE FUNCIONES (notifyTaskCreated, etc.) IGUAL