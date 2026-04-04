// plugins/powerbi.js - Integración con Power BI (versión persistente)
(function() {
  console.log('🔌 [PowerBI] Plugin iniciado (versión persistente)');

  // Configuración de la URL
  let powerBiReportUrl = localStorage.getItem('powerbi_report_url');

  if (!powerBiReportUrl) {
    setTimeout(() => {
      const url = prompt(
        '📊 ¿Quieres mostrar un informe de Power BI?\n\n' +
        'Introduce la URL del informe (pública o de Power BI Embedded):\n\n' +
        'Ejemplo: https://app.powerbi.com/view?r=...\n\n' +
        '(Si no quieres, deja vacío y pulsa Cancelar)'
      );
      if (url && url.trim()) {
        localStorage.setItem('powerbi_report_url', url.trim());
        powerBiReportUrl = url.trim();
        alert('✅ Power BI configurado. El botón aparecerá automáticamente.');
        // Forzar a que aparezca el botón ahora
        tryAddButton();
      }
    }, 3000);
  }

  function showPowerBIReport() {
    if (!powerBiReportUrl) {
      alert('❌ Power BI no configurado. Recarga la página y configura la URL.');
      return;
    }

    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      backdrop-filter: blur(10px);
      z-index: 1000000;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    const content = document.createElement('div');
    content.style.cssText = `
      width: 90vw;
      height: 85vh;
      background: white;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    `;

    content.innerHTML = `
      <div style="
        padding: 15px 20px;
        background: #1e293b;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
      ">
        <h3 style="margin:0;">📊 Panel Power BI</h3>
        <button id="close-powerbi" style="
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
        ">×</button>
      </div>
      <iframe
        src="${powerBiReportUrl}"
        style="width:100%; height:100%; border:none;"
        allowfullscreen="true"
      ></iframe>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    document.getElementById('close-powerbi').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
  }

  function addButtonToHeader(header) {
    if (!header) return false;
    if (header.querySelector('#powerbi-btn')) return true; // ya existe

    const btn = document.createElement('button');
    btn.id = 'powerbi-btn';
    btn.innerHTML = '📊 Power BI';
    btn.style.cssText = `
      background: linear-gradient(135deg, #f3b33d, #e68a2e);
      border: none;
      color: white;
      padding: 10px 20px;
      border-radius: 40px;
      font-weight: bold;
      cursor: pointer;
      font-size: 14px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-left: 15px;
      transition: all 0.3s;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;
    btn.onclick = showPowerBIReport;
    btn.onmouseenter = () => btn.style.transform = 'translateY(-2px)';
    btn.onmouseleave = () => btn.style.transform = 'translateY(0)';

    header.appendChild(btn);
    console.log('✅ [PowerBI] Botón añadido al header');
    return true;
  }

  function tryAddButton() {
    const header = document.querySelector('#boardView .kanban-header');
    if (header && !header.querySelector('#powerbi-btn')) {
      addButtonToHeader(header);
    }
  }

  // Observador permanente para cuando el header se crea o se modifica
  const observer = new MutationObserver((mutations) => {
    // Buscar si el header aparece o cambia su contenido
    const header = document.querySelector('#boardView .kanban-header');
    if (header && !header.querySelector('#powerbi-btn')) {
      addButtonToHeader(header);
    }
  });

  // Iniciar el observador cuando boardView exista
  function startObserving() {
    const boardView = document.getElementById('boardView');
    if (boardView) {
      observer.observe(boardView, { childList: true, subtree: true });
      console.log('👀 [PowerBI] Observador activado en boardView');
      // Intentar añadir el botón inmediatamente si ya existe el header
      tryAddButton();
    } else {
      // Esperar a que boardView aparezca
      const bodyObserver = new MutationObserver(() => {
        const boardView2 = document.getElementById('boardView');
        if (boardView2) {
          bodyObserver.disconnect();
          startObserving();
        }
      });
      bodyObserver.observe(document.body, { childList: true, subtree: true });
    }
  }

  // También escuchar cambios de vista (por si se alterna entre vistas)
  const viewObserver = new MutationObserver(() => {
    if (document.getElementById('boardView')?.classList.contains('active')) {
      tryAddButton();
    }
  });
  viewObserver.observe(document.body, { attributes: true, attributeFilter: ['class'], subtree: true });

  startObserving();
})();