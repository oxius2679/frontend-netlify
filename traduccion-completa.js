// ============================================================
// PM VIRTUAL - TRADUCCIÓN COMPLETA AL INGLÉS
// TODAS LAS PESTAÑAS Y DOCUMENTOS
// ============================================================
(function() {
  // ========== 1. TRADUCCIONES COMPLETAS ==========
  if (typeof window.translations === 'undefined') window.translations = {};
  var t = window.translations;

  // ============================================================
// TRADUCCIONES COMPLETAS (INGLÉS) - VERSIÓN CON I18N
// (No usa 'translations' para evitar conflicto)
// ============================================================
window.I18N = {
  // Modal y pestañas
  modalTitle: '📊 PM Virtual Executive',
  closeButton: '✕ Close',
  tabDashboard: '📊 Dashboard',
  tabDocuments: '📄 Documents',
  tabControl: '⚙️ Control',
  tabMeetings: '🗓️ Meetings',
  tabGantt: '📅 Gantt',
  tabResources: '👥 Resources',
  tabCosts: '💰 Costs',
  tabChanges: '🔄 Changes',
  tabMilestones: '🎯 Milestones',
  tabReports: '📧 Reports',
  tabPerformance: '📊 Performance',
  tabSkills: '🧠 Skills',
  tabRecognition: '🏆 Recognition',
  tabRiskMatrix: '⚠️ Risk Matrix',
  tabPreventiveActions: '🛡️ Preventive Actions',
  tabQuality: '📊 Quality',
  tabSurveys: '📝 Surveys',
  tabPortal: '🌐 Portal',
  tabChecklist: '✅ Checklist',
  tabArchive: '📁 Archive',
  tabTransfer: '🔄 Transfer',
  tabScrum: '📊 Scrum',

  // Documentos
  documentsTitle: '📄 Document Generation',
  docKickoff: '🚀 Kickoff Meeting',
  docCharter: '📑 Project Charter',
  docStakeholders: '👥 Stakeholder Register',
  docPlan: '📅 Project Plan (Gantt)',
  docWBS: '📋 WBS',
  docRACI: '📊 RACI Matrix',
  docRisks: '⚠️ Risk Plan',
  docQuality: '✅ Quality Plan',
  docCommunications: '📢 Communications Plan',
  docLessons: '📝 Lessons Learned',
  docClosure: '🔚 Closure Report',
  docFinal: '📊 Final Report',
  docBusinessCase: '📊 Business Case',
  docStatusReport: '📈 Status Report',
  docIssueLog: '⚠️ Issue Log',
  docDecisionLog: '📝 Decision Log',
  docResourcePlan: '👥 Resource Plan',
  docProcurement: '📦 Procurement Plan',
  docChangeMgmt: '🔄 Change Management',
  docBenefits: '🏆 Benefits Plan',

  // Dashboard (PM Virtual Stats)
  statsTitle: '📊 Project Statistics (PM Virtual)',
  statsProject: 'Project',
  statsTotalTasks: 'Total tasks',
  statsCompleted: 'Completed',
  statsPending: 'Pending',
  statsOverdue: 'Overdue',
  statsProgress: 'Progress',
  statsTimeControl: '⏱️ Time control',
  statsEstimated: 'Estimated',
  statsLogged: 'Logged',
  statsBudget: 'Budget',
  statsConsumption: 'Consumption',
  statsStart: 'Start',
  statsEnd: 'End',
  statsDays: 'Days',
  statsStatus: 'Status',
  statsOnTime: 'On time',
  statsBehind: 'Behind schedule',

  // Mensajes comunes
  noProject: '⚠️ No project selected',
  docNotImplemented: 'Function not implemented for: ',
  errorGenerating: 'Error generating document: ',
  alertNoProject: 'No project selected'
};

// ============================================================
// FUNCIONES SOBRESCRITAS (usando window.I18N)
// ============================================================

// 1. abrirPanelCompleto
window.abrirPanelCompleto = function() {
  const proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
  if (!proyecto) {
    alert(window.I18N.noProject);
    return;
  }

  const overlay = document.createElement('div');
  overlay.id = 'pmVirtualPanel';
  overlay.style.cssText = `position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); backdrop-filter:blur(10px); z-index:100000; display:flex; justify-content:center; align-items:center;`;

  const panel = document.createElement('div');
  panel.style.cssText = `width:1300px; max-width:95vw; height:85vh; background:linear-gradient(135deg,#0f172a,#1e293b); border-radius:24px; border:1px solid #3b82f6; display:flex; flex-direction:column; overflow:hidden; color:white; font-family:system-ui;`;

  const tabs = [
    { id: 'dashboard', label: window.I18N.tabDashboard },
    { id: 'documentos', label: window.I18N.tabDocuments },
    { id: 'control', label: window.I18N.tabControl },
    { id: 'reuniones', label: window.I18N.tabMeetings },
    { id: 'gantt', label: window.I18N.tabGantt },
    { id: 'recursos', label: window.I18N.tabResources },
    { id: 'costos', label: window.I18N.tabCosts },
    { id: 'cambios', label: window.I18N.tabChanges },
    { id: 'hitos', label: window.I18N.tabMilestones },
    { id: 'reportes', label: window.I18N.tabReports },
    { id: 'desempeno', label: window.I18N.tabPerformance },
    { id: 'habilidades', label: window.I18N.tabSkills },
    { id: 'reconocimientos', label: window.I18N.tabRecognition },
    { id: 'riesgosMatriz', label: window.I18N.tabRiskMatrix },
    { id: 'acciones', label: window.I18N.tabPreventiveActions },
    { id: 'calidad', label: window.I18N.tabQuality },
    { id: 'encuestas', label: window.I18N.tabSurveys },
    { id: 'portal', label: window.I18N.tabPortal },
    { id: 'checklist', label: window.I18N.tabChecklist },
    { id: 'archivo', label: window.I18N.tabArchive },
    { id: 'transferencia', label: window.I18N.tabTransfer },
    { id: 'scrum', label: window.I18N.tabScrum }
  ];

  let activeTab = 'dashboard';

  const header = document.createElement('div');
  header.style.cssText = `display:flex; justify-content:space-between; align-items:center; padding:15px 25px; background:rgba(0,0,0,0.3); border-bottom:1px solid #3b82f6; flex-wrap:wrap; gap:10px;`;

  const tabsContainer = document.createElement('div');
  tabsContainer.style.display = 'flex';
  tabsContainer.style.flexWrap = 'wrap';
  tabsContainer.style.gap = '10px';

  tabs.forEach(tab => {
    const btn = document.createElement('button');
    btn.textContent = tab.label;
    btn.style.cssText = `background:none; border:none; color:${activeTab===tab.id?'#3b82f6':'#94a3b8'}; font-size:12px; font-weight:bold; cursor:pointer; padding:6px 12px; border-radius:8px; transition:0.2s;`;
    btn.onclick = () => {
      activeTab = tab.id;
      document.querySelectorAll('.pm-tab-btn').forEach(b => b.style.color = '#94a3b8');
      btn.style.color = '#3b82f6';
      cargarContenido(tab.id);
    };
    btn.classList.add('pm-tab-btn');
    tabsContainer.appendChild(btn);
  });

  header.appendChild(tabsContainer);

  const closeBtn = document.createElement('button');
  closeBtn.textContent = window.I18N.closeButton;
  closeBtn.style.cssText = `background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#ef4444; padding:8px 16px; border-radius:8px; cursor:pointer;`;
  closeBtn.onclick = () => overlay.remove();
  header.appendChild(closeBtn);

  panel.appendChild(header);

  const contentDiv = document.createElement('div');
  contentDiv.id = 'pmContent';
  contentDiv.style.cssText = `flex:1; overflow-y:auto; padding:25px;`;
  panel.appendChild(contentDiv);
  overlay.appendChild(panel);
  document.body.appendChild(overlay);

  function cargarContenido(tabId) {
    if (tabId === 'dashboard') window.renderPmVirtualStats(contentDiv);
    else if (tabId === 'documentos') window.renderDocumentos(contentDiv);
    else if (tabId === 'control') window.renderControl && window.renderControl(contentDiv);
    else if (tabId === 'reuniones') window.renderReuniones && window.renderReuniones(contentDiv);
    else if (tabId === 'gantt') window.renderGantt && window.renderGantt(contentDiv);
    else if (tabId === 'recursos') window.renderAsignacionRecursos && window.renderAsignacionRecursos(contentDiv);
    else if (tabId === 'costos') window.renderLineaBaseCostos && window.renderLineaBaseCostos(contentDiv);
    else if (tabId === 'cambios') window.renderGestionCambios && window.renderGestionCambios(contentDiv);
    else if (tabId === 'hitos') window.renderSeguimientoHitos && window.renderSeguimientoHitos(contentDiv);
    else if (tabId === 'reportes') window.renderReportesAutomaticos && window.renderReportesAutomaticos(contentDiv);
    else if (tabId === 'desempeno') window.renderEvaluacionDesempeno && window.renderEvaluacionDesempeno(contentDiv);
    else if (tabId === 'habilidades') window.renderMatrizHabilidades && window.renderMatrizHabilidades(contentDiv);
    else if (tabId === 'reconocimientos') window.renderReconocimientos && window.renderReconocimientos(contentDiv);
    else if (tabId === 'riesgosMatriz') window.renderMatrizRiesgos && window.renderMatrizRiesgos(contentDiv);
    else if (tabId === 'acciones') window.renderAccionesPreventivas && window.renderAccionesPreventivas(contentDiv);
    else if (tabId === 'calidad') window.renderIndicadoresCalidad && window.renderIndicadoresCalidad(contentDiv);
    else if (tabId === 'encuestas') window.renderEncuestas && window.renderEncuestas(contentDiv);
    else if (tabId === 'portal') window.renderPortalProyecto && window.renderPortalProyecto(contentDiv);
    else if (tabId === 'checklist') window.renderChecklistCierre && window.renderChecklistCierre(contentDiv);
    else if (tabId === 'archivo') window.renderArchivoDocumentos && window.renderArchivoDocumentos(contentDiv);
    else if (tabId === 'transferencia') window.renderTransferencia && window.renderTransferencia(contentDiv);
    else if (tabId === 'scrum') window.renderScrum && window.renderScrum(contentDiv);
  }

  cargarContenido(activeTab);
};

// 2. renderDocumentos
window.renderDocumentos = function(container) {
  if (!container) return;
  container.innerHTML = `
    <h2>${window.I18N.documentsTitle}</h2>
    <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:15px;">
        <button class="doc-btn" data-doc="kickoff">${window.I18N.docKickoff}</button>
        <button class="doc-btn" data-doc="charter">${window.I18N.docCharter}</button>
        <button class="doc-btn" data-doc="stakeholders">${window.I18N.docStakeholders}</button>
        <button class="doc-btn" data-doc="plan">${window.I18N.docPlan}</button>
        <button class="doc-btn" data-doc="wbs">${window.I18N.docWBS}</button>
        <button class="doc-btn" data-doc="raci">${window.I18N.docRACI}</button>
        <button class="doc-btn" data-doc="risks">${window.I18N.docRisks}</button>
        <button class="doc-btn" data-doc="quality">${window.I18N.docQuality}</button>
        <button class="doc-btn" data-doc="communications">${window.I18N.docCommunications}</button>
        <button class="doc-btn" data-doc="lessons">${window.I18N.docLessons}</button>
        <button class="doc-btn" data-doc="closure">${window.I18N.docClosure}</button>
        <button class="doc-btn" data-doc="final">${window.I18N.docFinal}</button>
        <button class="doc-btn" data-doc="businesscase">${window.I18N.docBusinessCase}</button>
        <button class="doc-btn" data-doc="statusreport">${window.I18N.docStatusReport}</button>
        <button class="doc-btn" data-doc="issuelog">${window.I18N.docIssueLog}</button>
        <button class="doc-btn" data-doc="decisionlog">${window.I18N.docDecisionLog}</button>
        <button class="doc-btn" data-doc="resourceplan">${window.I18N.docResourcePlan}</button>
        <button class="doc-btn" data-doc="procurement">${window.I18N.docProcurement}</button>
        <button class="doc-btn" data-doc="changemgmt">${window.I18N.docChangeMgmt}</button>
        <button class="doc-btn" data-doc="benefits">${window.I18N.docBenefits}</button>
    </div>`;

  let style = container.querySelector('style');
  if (!style) {
    style = document.createElement('style');
    style.textContent = `.doc-btn{ background:linear-gradient(135deg,#3b82f6,#1e40af); border:none; padding:12px; border-radius:40px; color:white; cursor:pointer; font-weight:bold; transition:0.2s; } .doc-btn:hover{ transform:translateY(-2px); }`;
    container.appendChild(style);
  }

  container.querySelectorAll('.doc-btn').forEach(btn => {
    const doc = btn.dataset.doc;
    btn.onclick = () => {
      try {
        const map = {
          'charter': window.generarActaConstitutiva,
          'stakeholders': window.generarRegistroStakeholders,
          'plan': window.generarPlanProyecto,
          'wbs': window.generarWBS,
          'raci': window.generarMatrizRACI,
          'risks': window.generarPlanRiesgos,
          'quality': window.generarPlanCalidad,
          'communications': window.generarPlanComunicaciones,
          'lessons': window.generarLeccionesAprendidas,
          'closure': window.generarActaCierre,
          'final': window.generarInformeFinal,
          'kickoff': window.generarKickoffDocument,
          'businesscase': window.generarBusinessCase,
          'statusreport': window.generarStatusReport,
          'issuelog': window.generarIssueLog,
          'decisionlog': window.generarDecisionLog,
          'resourceplan': window.generarResourcePlan,
          'procurement': window.generarProcurementPlan,
          'changemgmt': window.generarChangeManagementPlan,
          'benefits': window.generarBenefitsPlan
        };
        if (map[doc]) map[doc]();
        else {
          console.warn('Document not implemented:', doc);
          alert(window.I18N.docNotImplemented + doc);
        }
      } catch (error) {
        console.error('Error in document button:', error);
        alert(window.I18N.errorGenerating + error.message);
      }
    };
  });
};

// 3. renderPmVirtualStats
window.renderPmVirtualStats = function(container) {
  if (!container) return;
  const project = window.projects && window.currentProjectIndex !== undefined ? window.projects[window.currentProjectIndex] : null;
  if (!project) {
    container.innerHTML = `<div class="error">${window.I18N.noProject}</div>`;
    return;
  }

  const tasks = project.tasks || [];
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const inProgress = tasks.filter(t => t.status === 'inProgress').length;
  const pending = tasks.filter(t => t.status === 'pending').length;
  const overdue = tasks.filter(t => t.status === 'overdue').length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  const totalEstimated = tasks.reduce((sum, t) => sum + (t.estimatedTime || 0), 0);
  const totalLogged = tasks.reduce((sum, t) => sum + (t.timeLogged || 0), 0);
  const projectBudget = project.totalProjectTime || 0;
  const budgetUsage = projectBudget > 0 ? Math.round((totalLogged / projectBudget) * 100) : 0;

  let startDate = '—', endDate = '—', totalDays = 0;
  const startDates = tasks.map(t => t.startDate).filter(Boolean);
  const endDates = tasks.map(t => t.deadline).filter(Boolean);
  if (startDates.length) {
    const min = new Date(Math.min(...startDates.map(d => new Date(d))));
    startDate = min.toLocaleDateString('en-US');
  }
  if (endDates.length) {
    const max = new Date(Math.max(...endDates.map(d => new Date(d))));
    endDate = max.toLocaleDateString('en-US');
    if (startDates.length) {
      totalDays = Math.ceil((max - new Date(Math.min(...startDates.map(d => new Date(d))))) / (1000*60*60*24));
    }
  }

  const isOnTime = totalLogged <= (totalEstimated || projectBudget);
  const statusColor = isOnTime ? '#10b981' : '#ef4444';
  const statusText = isOnTime ? window.I18N.statsOnTime : window.I18N.statsBehind;

  const html = `
    <div style="padding: 20px; background: #1e1e2f; color: #e2e8f0; border-radius: 16px;">
      <h2 style="margin: 0 0 20px 0;">${window.I18N.statsTitle}</h2>
      <p><strong>${window.I18N.statsProject}:</strong> ${project.name}</p>
      <hr style="border-color: #334155;">
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin: 20px 0;">
        <div style="background: #2d2d5f; padding: 15px; border-radius: 12px; text-align: center;">
          <div style="font-size: 28px; font-weight: bold;">${total}</div>
          <div>${window.I18N.statsTotalTasks}</div>
        </div>
        <div style="background: #2d2d5f; padding: 15px; border-radius: 12px; text-align: center;">
          <div style="font-size: 28px; font-weight: bold;">${completed}</div>
          <div>${window.I18N.statsCompleted}</div>
        </div>
        <div style="background: #2d2d5f; padding: 15px; border-radius: 12px; text-align: center;">
          <div style="font-size: 28px; font-weight: bold;">${pending}</div>
          <div>${window.I18N.statsPending}</div>
        </div>
        <div style="background: #2d2d5f; padding: 15px; border-radius: 12px; text-align: center;">
          <div style="font-size: 28px; font-weight: bold;">${overdue}</div>
          <div>${window.I18N.statsOverdue}</div>
        </div>
      </div>
      <div style="margin: 20px 0;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <span>${window.I18N.statsProgress}</span>
          <span>${progress}%</span>
        </div>
        <div style="height: 10px; background: #3b3b5f; border-radius: 5px;">
          <div style="width: ${progress}%; height: 100%; background: #10b981; border-radius: 5px;"></div>
        </div>
      </div>
      <div style="background: #2d2d5f; border-radius: 12px; padding: 15px; margin: 20px 0;">
        <h3 style="margin: 0 0 10px 0;">${window.I18N.statsTimeControl}</h3>
        <p><strong>${window.I18N.statsEstimated}:</strong> ${totalEstimated.toFixed(1)} h</p>
        <p><strong>${window.I18N.statsLogged}:</strong> ${totalLogged.toFixed(1)} h</p>
        <p><strong>${window.I18N.statsBudget}:</strong> ${projectBudget} h</p>
        <p><strong>${window.I18N.statsConsumption}:</strong> ${budgetUsage}%</p>
        <div style="height: 8px; background: #3b3b5f; border-radius: 4px;">
          <div style="width: ${Math.min(100, budgetUsage)}%; height: 100%; background: #8b5cf6; border-radius: 4px;"></div>
        </div>
      </div>
      <div style="display: flex; gap: 20px; background: #2d2d5f; border-radius: 12px; padding: 15px;">
        <div><strong>${window.I18N.statsStart}:</strong> ${startDate}</div>
        <div><strong>${window.I18N.statsEnd}:</strong> ${endDate}</div>
        <div><strong>${window.I18N.statsDays}:</strong> ${totalDays}</div>
      </div>
      <div style="padding: 12px; background: ${statusColor}20; border-left: 4px solid ${statusColor}; border-radius: 8px; margin-top: 20px;">
        ${window.I18N.statsStatus}: <strong style="color: ${statusColor};">${statusText}</strong>
      </div>
    </div>
  `;

  container.innerHTML = html;
};

console.log('✅ Traducción al inglés cargada correctamente (usando window.I18N).');
console.log('🔧 Ahora escribe: abrirPanelCompleto()  para abrir el modal en inglés.');