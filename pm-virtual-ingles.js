// ============================================================
// BOTÓN FLOTANTE PM VIRTUAL - DESBLOQUEADO PARA FREE
// ============================================================
(function ultimateFloatingButton(){
function spawn() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.log('PM Virtual solo disponible con sesión activa');
        return;
    }
    
    let btn = document.getElementById("boardUltimateBtn");
    if (!btn) {
        btn = document.createElement("button");
        btn.id = "boardUltimateBtn";
        btn.textContent = "PM Virtual";
        btn.title = "Abrir PM Virtual";
        btn.style.cssText = `
            position: static !important;
            bottom: auto !important;
            left: auto !important;
            transform: none !important;
            width: auto !important;
            height: auto !important;
            margin-left: 10px !important;
            padding: 12px 28px !important;
            border-radius: 50px !important;
            background: linear-gradient(135deg, #2563EB, #1E40AF) !important;
            color: white !important;
            font-size: 16px !important;
            font-weight: bold !important;
            border: none !important;
            cursor: pointer !important;
            z-index: 99999999999999 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 8px !important;
            box-shadow: 0 8px 20px rgba(0,0,0,0.25) !important;
            transition: all 0.3s ease !important;
            font-family: system-ui, 'Segoe UI', sans-serif !important;
            letter-spacing: 0.5px !important;
        `;
        btn.onclick = () => {
            console.log("✔ Botón Ultimate presionado");
            if (typeof abrirPanelCompleto === "function") {
                abrirPanelCompleto();
            } else {
                alert("abrirPanelCompleto no existe todavía");
            }
        };
        let header = document.querySelector('header, header#mainHeader, .main-header');
        if (header) { header.appendChild(btn); }
        else { document.body.appendChild(btn); }
        console.log("✔ Botón Ultimate generado (desbloqueado para FREE)");
    }
}
document.addEventListener("DOMContentLoaded", spawn);
setInterval(spawn, 800);
})();        


// ============================================================
// FUNCIÓN PARA OBTENER PROYECTO ACTUAL (FALLBACK)
// ============================================================
if (typeof window.obtenerProyectoActual !== 'function') {
    window.obtenerProyectoActual = function() {
        // Si hay un proyecto seleccionado por índice
        if (window.currentProjectIndex !== undefined && window.projects && window.projects[window.currentProjectIndex]) {
            return window.projects[window.currentProjectIndex];
        }
        // Si hay una variable global proyectoActual
        if (window.proyectoActual) {
            return window.proyectoActual;
        }
        // Si hay una lista de proyectos, tomar el primero
        if (window.projects && window.projects.length > 0) {
            return window.projects[0];
        }
        // Si no hay nada, devolver null
        return null;
    };
}



// ============================================================
// FUNCIONES SOBRESCRITAS (usando window.translations)
// ============================================================

// 1. abrirPanelCompleto
window.abrirPanelCompleto = function() {
    const proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
        alert(window.translations.noProject);
        return;
    }

    const overlay = document.createElement('div');
    overlay.id = 'pmVirtualPanel';
    overlay.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); backdrop-filter:blur(10px); z-index:100000; display:flex; justify-content:center; align-items:center;';

    const panel = document.createElement('div');
    panel.style.cssText = 'width:1300px; max-width:95vw; height:85vh; background:linear-gradient(135deg,#0f172a,#1e293b); border-radius:24px; border:1px solid #3b82f6; display:flex; flex-direction:column; overflow:hidden; color:white; font-family:system-ui;';

    const tabs = [
        { id: 'dashboard', label: window.translations.tabDashboard },
        { id: 'documentos', label: window.translations.tabDocuments },
        { id: 'control', label: window.translations.tabControl },
        { id: 'reuniones', label: window.translations.tabMeetings },
        { id: 'gantt', label: window.translations.tabGantt },
        { id: 'recursos', label: window.translations.tabResources },
        { id: 'costos', label: window.translations.tabCosts },
        { id: 'cambios', label: window.translations.tabChanges },
        { id: 'hitos', label: window.translations.tabMilestones },
        { id: 'reportes', label: window.translations.tabReports },
        { id: 'desempeno', label: window.translations.tabPerformance },
        { id: 'habilidades', label: window.translations.tabSkills },
        { id: 'reconocimientos', label: window.translations.tabRecognition },
        { id: 'riesgosMatriz', label: window.translations.tabRiskMatrix },
        { id: 'acciones', label: window.translations.tabPreventiveActions },
        { id: 'calidad', label: window.translations.tabQuality },
        { id: 'encuestas', label: window.translations.tabSurveys },
        { id: 'portal', label: window.translations.tabPortal },
        { id: 'checklist', label: window.translations.tabChecklist },
        { id: 'archivo', label: window.translations.tabArchive },
        { id: 'transferencia', label: window.translations.tabTransfer },
        { id: 'scrum', label: window.translations.tabScrum }
    ];

    let activeTab = 'dashboard';

    const header = document.createElement('div');
    header.style.cssText = 'display:flex; justify-content:space-between; align-items:center; padding:15px 25px; background:rgba(0,0,0,0.3); border-bottom:1px solid #3b82f6; flex-wrap:wrap; gap:10px;';

    const tabsContainer = document.createElement('div');
    tabsContainer.style.display = 'flex';
    tabsContainer.style.flexWrap = 'wrap';
    tabsContainer.style.gap = '10px';

    tabs.forEach(tab => {
        const btn = document.createElement('button');
        btn.textContent = tab.label;
        btn.style.cssText = 'background:none; border:none; color:' + (activeTab === tab.id ? '#3b82f6' : '#94a3b8') + '; font-size:12px; font-weight:bold; cursor:pointer; padding:6px 12px; border-radius:8px; transition:0.2s;';
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
    closeBtn.textContent = window.translations.closeButton;
    closeBtn.style.cssText = 'background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#ef4444; padding:8px 16px; border-radius:8px; cursor:pointer;';
    closeBtn.onclick = () => overlay.remove();
    header.appendChild(closeBtn);

    panel.appendChild(header);

    const contentDiv = document.createElement('div');
    contentDiv.id = 'pmContent';
    contentDiv.style.cssText = 'flex:1; overflow-y:auto; padding:25px;';
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

// 2. renderDocumentos (con window.translations)
window.renderDocumentos = function(container) {
  if (!container) return;
  container.innerHTML = `
    <h2>${window.translations.documentsTitle}</h2>
    <div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:15px;">
        <button class="doc-btn" data-doc="kickoff">${window.translations.docKickoff}</button>
        <button class="doc-btn" data-doc="charter">${window.translations.docCharter}</button>
        <button class="doc-btn" data-doc="stakeholders">${window.translations.docStakeholders}</button>
        <button class="doc-btn" data-doc="plan">${window.translations.docPlan}</button>
        <button class="doc-btn" data-doc="wbs">${window.translations.docWBS}</button>
        <button class="doc-btn" data-doc="raci">${window.translations.docRACI}</button>
        <button class="doc-btn" data-doc="risks">${window.translations.docRisks}</button>
        <button class="doc-btn" data-doc="quality">${window.translations.docQuality}</button>
        <button class="doc-btn" data-doc="communications">${window.translations.docCommunications}</button>
        <button class="doc-btn" data-doc="lessons">${window.translations.docLessons}</button>
        <button class="doc-btn" data-doc="closure">${window.translations.docClosure}</button>
        <button class="doc-btn" data-doc="final">${window.translations.docFinal}</button>
        <button class="doc-btn" data-doc="businesscase">${window.translations.docBusinessCase}</button>
        <button class="doc-btn" data-doc="statusreport">${window.translations.docStatusReport}</button>
        <button class="doc-btn" data-doc="issuelog">${window.translations.docIssueLog}</button>
        <button class="doc-btn" data-doc="decisionlog">${window.translations.docDecisionLog}</button>
        <button class="doc-btn" data-doc="resourceplan">${window.translations.docResourcePlan}</button>
        <button class="doc-btn" data-doc="procurement">${window.translations.docProcurement}</button>
        <button class="doc-btn" data-doc="changemgmt">${window.translations.docChangeMgmt}</button>
        <button class="doc-btn" data-doc="benefits">${window.translations.docBenefits}</button>
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
          alert(window.translations.docNotImplemented + doc);
        }
      } catch (error) {
        console.error('Error in document button:', error);
        alert(window.translations.errorGenerating + error.message);
      }
    };
  });
};

// 3. renderPmVirtualStats (con window.translations)
window.renderPmVirtualStats = function(container) {
  if (!container) return;
  const project = window.projects && window.currentProjectIndex !== undefined ? window.projects[window.currentProjectIndex] : null;
  if (!project) {
    container.innerHTML = `<div class="error">${window.translations.noProject}</div>`;
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
  const statusText = isOnTime ? window.translations.statsOnTime : window.translations.statsBehind;

  const html = `
    <div style="padding: 20px; background: #1e1e2f; color: #e2e8f0; border-radius: 16px;">
      <h2 style="margin: 0 0 20px 0;">${window.translations.statsTitle}</h2>
      <p><strong>${window.translations.statsProject}:</strong> ${project.name}</p>
      <hr style="border-color: #334155;">
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin: 20px 0;">
        <div style="background: #2d2d5f; padding: 15px; border-radius: 12px; text-align: center;">
          <div style="font-size: 28px; font-weight: bold;">${total}</div>
          <div>${window.translations.statsTotalTasks}</div>
        </div>
        <div style="background: #2d2d5f; padding: 15px; border-radius: 12px; text-align: center;">
          <div style="font-size: 28px; font-weight: bold;">${completed}</div>
          <div>${window.translations.statsCompleted}</div>
        </div>
        <div style="background: #2d2d5f; padding: 15px; border-radius: 12px; text-align: center;">
          <div style="font-size: 28px; font-weight: bold;">${pending}</div>
          <div>${window.translations.statsPending}</div>
        </div>
        <div style="background: #2d2d5f; padding: 15px; border-radius: 12px; text-align: center;">
          <div style="font-size: 28px; font-weight: bold;">${overdue}</div>
          <div>${window.translations.statsOverdue}</div>
        </div>
      </div>
      <div style="margin: 20px 0;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <span>${window.translations.statsProgress}</span>
          <span>${progress}%</span>
        </div>
        <div style="height: 10px; background: #3b3b5f; border-radius: 5px;">
          <div style="width: ${progress}%; height: 100%; background: #10b981; border-radius: 5px;"></div>
        </div>
      </div>
      <div style="background: #2d2d5f; border-radius: 12px; padding: 15px; margin: 20px 0;">
        <h3 style="margin: 0 0 10px 0;">${window.translations.statsTimeControl}</h3>
        <p><strong>${window.translations.statsEstimated}:</strong> ${totalEstimated.toFixed(1)} h</p>
        <p><strong>${window.translations.statsLogged}:</strong> ${totalLogged.toFixed(1)} h</p>
        <p><strong>${window.translations.statsBudget}:</strong> ${projectBudget} h</p>
        <p><strong>${window.translations.statsConsumption}:</strong> ${budgetUsage}%</p>
        <div style="height: 8px; background: #3b3b5f; border-radius: 4px;">
          <div style="width: ${Math.min(100, budgetUsage)}%; height: 100%; background: #8b5cf6; border-radius: 4px;"></div>
        </div>
      </div>
      <div style="display: flex; gap: 20px; background: #2d2d5f; border-radius: 12px; padding: 15px;">
        <div><strong>${window.translations.statsStart}:</strong> ${startDate}</div>
        <div><strong>${window.translations.statsEnd}:</strong> ${endDate}</div>
        <div><strong>${window.translations.statsDays}:</strong> ${totalDays}</div>
      </div>
      <div style="padding: 12px; background: ${statusColor}20; border-left: 4px solid ${statusColor}; border-radius: 8px; margin-top: 20px;">
        ${window.translations.statsStatus}: <strong style="color: ${statusColor};">${statusText}</strong>
      </div>
    </div>
  `;

  container.innerHTML = html;
};

console.log('✅ Traducción unificada cargada. Usa window.translations en todas partes.');
console.log('🔧 Ahora escribe: abrirPanelCompleto()  para abrir el modal.');


// ============================================================
// TRADUCCIONES COMPLETAS - UNIFICADO (TODAS LAS PESTAÑAS)
// ============================================================
window.translations = {

  // ========== INTERFAZ PRINCIPAL Y PESTAÑAS ==========
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

  // ========== DOCUMENTOS ==========
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

  // ========== DASHBOARD ==========
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

  noProject: '⚠️ No project selected',
  docNotImplemented: 'Function not implemented for: ',
  errorGenerating: 'Error generating document: ',
  alertNoProject: 'No project selected',

  // ========== CONTROL ==========
  controlTitle: '⚙️ Executive Control Panel',
  controlUpdated: 'Updated',
  controlTotalTasks: 'Total Tasks',
  controlCompleted: 'Completed',
  controlOverdue: 'Overdue',
  controlCritical: 'Critical',
  controlEVM: '📊 EVM Indicators',
  controlSPI: 'SPI (Schedule)',
  controlCPI: 'CPI (Cost)',
  controlEstimated: 'Estimated',
  controlEfficiency: 'Efficiency',
  controlAlerts: '🚨 Operational Alerts',
  controlRecommendations: '💡 Recommendations',
  controlResourceLoad: '👥 Resource Load',
  controlQuickActions: '⚡ Quick Actions',
  controlApply: '✅ Apply',
  controlExportReport: '📄 Export Report',
  controlAlertTeam: '📢 Alert Team',
  controlReviewSchedule: '📅 Review Schedule',
  controlOptimizeResources: '⚖️ Optimize Resources',
  controlNoProject: '⚠️ No project selected',
  controlTasksReprogrammed: (count) => `✅ ${count} task(s) rescheduled (+7 days).`,
  controlAlertSent: '📢 Alert sent to team about critical tasks.',
  controlScheduleAnalysis: (overdue, total) =>
    `📅 Schedule Analysis\n━━━━━━━━━━\n🔴 Overdue: ${overdue}\n📊 Total with date: ${total}\n\n✅ Review critical path and resources.`,
  controlCostAnalysis: (est, reg, diff) =>
    `💰 Cost Analysis\n━━━━━━━━━━\n📊 Estimated: ${est}h\n💵 Logged: ${reg}h\n📈 Variance: ${diff >= 0 ? '+' : ''}${diff}h\n\n✅ Controls applied: hour limits, required approvals.`,
  controlWIPLimit: (count) => `✅ ${count} task(s) moved to pending.\n🎯 Focus efforts to complete faster.`,
  controlReassigned: (count) => `✅ ${count} task(s) reassigned to balance workload.`,
  controlReportCopied: '✅ Report copied to clipboard.',
  controlNoAlerts: '✅ No pending alerts.',
  controlOptimization: (analysis) =>
    `⚖️ Resource Optimization\n━━━━━━━━━━\n${analysis}\n\n✅ Load analyzed. Redistribute if necessary.`,
  controlNoResources: 'No available resources',

  // ========== COSTOS ==========
  costsTitle: '💰 Financial Intelligence Dashboard',
  costsSubtitle: 'Earned Value Management · Real-time Cost Control',
  costsNoProject: '⚠️ No project selected',
  costsNoTasks: '📭 No tasks registered',
  costsNoTasksMessage: 'Add tasks to the project to view financial metrics.',
  costsExportPDF: '📄 Export as PDF',
  costsPrint: '🖨️ Print Report',
  costsBAC: 'BAC (Budget at Completion)',
  costsAC: 'AC (Actual Cost)',
  costsEV: 'EV (Earned Value)',
  costsCV: 'CV (Cost Variance)',
  costsUnderBudget: 'Under budget',
  costsOverBudget: 'Over budget',
  costsEVM: 'Earned Value Management (EVM) Analysis',
  costsEVMSubtitle: 'Quantitative performance metrics following PMI standards',
  costsMetric: 'Metric',
  costsFormula: 'Formula',
  costsValue: 'Value',
  costsInterpretation: 'Interpretation',
  costsStatus: 'Status',
  costsSPI: 'SPI (Schedule Performance Index)',
  costsCPI: 'CPI (Cost Performance Index)',
  costsEAC: 'EAC (Estimate at Completion)',
  costsETC: 'ETC (Estimate to Complete)',
  costsVAC: 'VAC (Variance at Completion)',
  costsTCPI: 'TCPI (To-Complete Performance Index)',
  costsAheadSchedule: 'Ahead of schedule',
  costsSlightDelay: 'Slight delay',
  costsSignificantDelay: 'Significant delay',
  costsOnTrack: '✅ On Track',
  costsWatch: '⚠️ Watch',
  costsCritical: '🔴 Critical',
  costsEfficient: '✅ Efficient',
  costsOverrun: '🔴 Overrun',
  costsCostPerformance: 'Cost Performance Analysis',
  costsPV: 'PV (Planned Value)',
  costsEVLabel: 'EV (Earned Value)',
  costsACLabel: 'AC (Actual Cost)',
  costsFinancialForecast: 'Financial Forecast & Projections',
  costsOptimistic: 'Optimistic Scenario',
  costsMostLikely: 'Most Likely (EAC)',
  costsPessimistic: 'Pessimistic Scenario',
  costsContingency: 'Contingency margin recommended',
  costsExecutiveRecommendation: 'Executive Financial Recommendation',
  costsActionPlan: '📋 Strategic Action Plan:',
  costsImmediateActions: 'Immediate Actions',
  costsMitigationPlan: 'Mitigation Plan',
  costsNextReview: 'Next Review',
  costsConfidential: '🔒 CONFIDENTIAL - For executive use only',
  costsMethodology: 'Methodology: PMI EVM Standards · CPI = EV/AC · SPI = EV/PV · EAC = BAC/CPI',
  costsGenerated: 'Generated',
  costsSource: 'Source: PM Virtual Executive Platform',

  // ========== REUNIONES ==========
  meetingsTitle: '🗓️ Executive Meeting Management',
  meetingsProject: 'Project',
  meetingsTotal: 'Total Meetings',
  meetingsUpcoming: 'Upcoming',
  meetingsPendingAgreements: 'Pending Agreements',
  meetingsLastMeeting: 'Last Meeting',
  meetingsNoMeetings: '📭 No meetings registered yet. Schedule the first one using the button above.',
  meetingsNewMeeting: '+ Schedule Meeting',
  meetingsTranscriptor: '🎙️ AI Transcriber',
  meetingsExport: '📄 Export History',
  meetingsAgenda: 'Agenda',
  meetingsParticipants: 'Participants',
  meetingsAgreements: 'Agreements',
  meetingsStatus: 'Status',
  meetingsActions: 'Actions',
  meetingsViewAgenda: '📄 View Minutes',
  meetingsEdit: '✏️ Edit',
  meetingsDelete: '🗑️ Delete',
  meetingsCompleted: 'Completed',
  meetingsPending: 'Pending',
  meetingsType: 'Meeting Type',
  meetingsDate: 'Date & Time',
  meetingsResponsible: 'Responsible',
  meetingsFormat: 'Format',
  meetingsFrequency: 'Frequency',
  meetingsContent: 'Content / Information Type',
  meetingsInfluence: 'Influence Level',
  meetingsInterest: 'Interest Level',
  meetingsChannel: 'Channel',
  meetingsSave: '💾 Save & Schedule',
  meetingsCancel: '❌ Cancel',
  meetingsConfirmDelete: 'Delete this meeting?',
  meetingsConfirmDeleteAll: 'Delete all meetings?',
  meetingsDeleted: '✅ Meeting deleted',
  meetingsUpdated: '✅ Meeting updated successfully',
  meetingsCreated: '✅ Meeting scheduled successfully',
  meetingsExportSuccess: '✅ Meeting history copied to clipboard',
  meetingsNoMeetingsToExport: '📭 No meetings to export',
  meetingsStakeholder: 'Stakeholder',
  meetingsSelectTemplate: 'Select agenda template...',
  meetingsTemplateFollowUp: '🔄 Project Follow-up',
  meetingsTemplateKickoff: '🚀 Kick-off',
  meetingsTemplateReview: '📊 Performance Review',
  meetingsTemplateClosure: '✅ Phase Closure',
  meetingsTemplateCustom: '✏️ Custom',
  meetingsPlaceholderTitle: 'e.g., Sprint #3 Review',
  meetingsPlaceholderAgenda: '1. Item 1\n2. Item 2\n3. Item 3',
  meetingsPlaceholderParticipants: 'e.g., PM, Sponsor, Team (comma separated)',
  meetingsPlaceholderStakeholder: 'e.g., IT Director, Client, Executive Committee',
  meetingsPlaceholderContent: 'e.g., Weekly progress, Risk alerts, Strategic decisions',
  meetingsMinuteTitle: 'Meeting Minutes',
  meetingsMinuteSubtitle: 'MEETING MINUTES - EXECUTIVE DOCUMENT',
  meetingsAgendaTitle: '📋 Agenda',
  meetingsAgreementsTitle: '✅ Agreements & Actions',
  meetingsNextSteps: '🎯 Next Steps',
  meetingsFooter: 'CONFIDENTIAL - For internal project use only',
  meetingsGenerated: 'Generated automatically by PM Virtual Executive',

  // ========== GANTT ==========
  ganttTitle: '📈 Executive Gantt Chart',
  ganttSubtitle: 'Programmatic Timeline · Critical Path Analysis · Executive Dashboard',
  ganttNoProject: '⚠️ No project selected',
  ganttNoTasks: '📭 No tasks to display',
  ganttTotalTasks: 'Total Tasks',
  ganttCompleted: 'Completed',
  ganttInProgress: 'In Progress',
  ganttPending: 'Pending',
  ganttOverdue: 'Overdue',
  ganttCritical: 'Critical',
  ganttMilestones: 'Milestones',
  ganttSPI: 'SPI',
  ganttProgress: 'Progress',
  ganttRiskLevel: 'Risk Level',
  ganttExportPDF: '📄 Export as PDF',
  ganttPrint: '🖨️ Print Report',
  ganttTimeline: 'Programmatic Timeline',
  ganttTask: 'TASK',
  ganttEndDate: 'END DATE',
  ganttLegendCompleted: 'Completed',
  ganttLegendInProgress: 'In Progress',
  ganttLegendPending: 'Pending',
  ganttLegendOverdue: 'Overdue / Critical',
  ganttLegendMilestone: 'Milestone',
  ganttLegendToday: 'Today',
  ganttFilterAll: '📌 All statuses',
  ganttFilterCompleted: '✅ Completed',
  ganttFilterInProgress: '🔄 In Progress',
  ganttFilterPending: '⏳ Pending',
  ganttClearFilters: '🗑️ Clear',
  ganttTaskDetail: '📋 TASK DETAIL',
  ganttAssignedTo: 'Assigned to',
  ganttStart: 'Start',
  ganttEnd: 'End',
  ganttStatus: 'Status',
  ganttPriorityHigh: 'High',
  ganttPriorityMedium: 'Medium',
  ganttPriorityLow: 'Low',
  ganttStatusCompleted: '✅ Completed',
  ganttStatusInProgress: '🔄 In Progress',
  ganttStatusPending: '⏳ Pending',
  ganttStatusOverdue: '⚠️ Overdue',
  ganttRiskExtreme: 'EXTREME',
  ganttRiskCritical: 'CRITICAL',
  ganttRiskHigh: 'HIGH',
  ganttRiskMedium: 'MEDIUM',
  ganttRiskLow: 'LOW',
  ganttUrgentImportant: 'URGENT + IMPORTANT',
  ganttImportantNotUrgent: 'IMPORTANT + NOT URGENT',
  ganttUrgentNotImportant: 'URGENT + NOT IMPORTANT',
  ganttNeither: 'NEITHER',
  ganttPriorityAction: 'Attend immediately',
  ganttPriorityPlan: 'Plan execution',
  ganttPriorityDelegate: 'Delegate or automate',
  ganttPrioritySchedule: 'Schedule or eliminate',
  ganttFinancialProjection: '💰 Financial Projection',
  ganttEstimatedCost: 'Estimated Cost',
  ganttActualCost: 'Actual Cost',
  ganttVariance: 'Variance',
  ganttWithinBudget: '✅ The project is within budget',
  ganttOverBudget: '⚠️ The project is over budget. Review estimates recommended.',
  ganttStrategicRecommendation: '💡 Strategic Recommendation',
  ganttRecommendationText: (overdue, critical, spi) => {
    let text = 'Based on quantitative analysis of SPI (' + spi + '), overdue tasks (' + overdue + '), and risk level, the following is recommended:';
    let items = [];
    if (overdue > 0) items.push('🔴 Prioritize recovery of overdue tasks through resource reallocation');
    if (critical > 0) items.push('⚠️ Establish daily follow-up on critical path tasks');
    if (spi < 0.9) items.push('📉 Implement acceleration plan (fast-tracking/crashing) to recover schedule');
    items.push('📊 Schedule weekly progress review with the team');
    items.push('📅 Next executive review scheduled for ' + new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-US'));
    return text + '\n' + items.join('\n');
  },
  ganttConfidential: '🔒 CONFIDENTIAL - For executive use only',
  ganttMethodology: 'Methodology: Critical Path Method (CPM) · Schedule Performance Index (SPI) · Earned Value Management (EVM)',
  ganttGenerated: 'Generated',
  ganttSource: 'Source: PM Virtual Executive Platform',

  // ========== RECURSOS ==========
  resourcesTitle: '👥 Resource Intelligence Report',
  resourcesSubtitle: 'Capacity Analysis, Productivity & Resource Optimization',
  resourcesNoProject: '⚠️ No project selected',
  resourcesNoTasks: '📭 No tasks to display',
  resourcesExecutiveSummary: '📋 Executive Summary',
  resourcesKeyFindings: '📊 Key Findings',
  resourcesRecommendations: '💡 Strategic Recommendations',
  resourcesProductivity: 'Productivity',
  resourcesEfficiency: 'Efficiency',
  resourcesSuccessRate: 'Success Rate',
  resourcesFinancialImpact: 'Financial Impact',
  resourcesWorkloadDistribution: '📊 Workload Distribution by Resource',
  resourcesProductivityEfficiency: '📈 Productivity vs Efficiency Matrix',
  resourcesRegister: '📋 Resource Performance Register',
  resourcesResource: 'Resource',
  resourcesTasks: 'Tasks',
  resourcesCompleted: 'Completed',
  resourcesInProgress: 'In Progress',
  resourcesPending: 'Pending',
  resourcesOverdue: 'Overdue',
  resourcesStatus: 'Status',
  resourcesOverloaded: 'Overloaded',
  resourcesWithDelays: 'With Delays',
  resourcesAvailable: 'Available',
  resourcesNormal: 'Normal',
  resourcesImmediateActions: '🎯 Immediate Actions (72h)',
  resourcesShortTerm: '📅 Short Term (2 weeks)',
  resourcesLongTerm: '🏆 Long Term (Quarterly)',
  resourcesConfidential: '🔒 CONFIDENTIAL - For executive use only',
  resourcesMethodology: 'Methodology: Quantitative analysis based on historical productivity data. Complies with PMI standards.',
  resourcesGenerated: 'Generated',
  resourcesSource: 'Source: PM Virtual Executive Platform',
  resourcesAvgProductivity: 'Average productivity of the team',
  resourcesEfficiencyCost: 'Real vs estimated hours',
  resourcesOnTimeDelivery: 'Deliveries on time',
  resourcesSavingOverrun: (value) => `${value >= 0 ? 'Projected savings' : 'Overrun'}`,
  resourcesHighSuccess: 'High success rate',
  resourcesModerateSuccess: 'Moderate success rate',
  resourcesLowSuccess: 'Low success rate',
  resourcesOverloadedResources: (count) => `${count} resource(s) with critical overload`,
  resourcesOverdueTasks: (count) => `${count} overdue tasks`,
  resourcesEfficiencyPercent: (pct) => `Cost efficiency: ${pct}%`,
  resourcesRecommendImmediate: (count) => `Immediate reassignment of ${count} resources`,
  resourcesReviewPriorities: 'Review priorities on overdue tasks',
  resourcesAdjustEstimates: 'Adjust estimates for next phases',

  // ========== CALIDAD ==========
  qualityTitle: '📊 Quality Performance Report',
  qualitySubtitle: 'Quality Metrics & Operational Excellence',
  qualityNoProject: '⚠️ No project selected',
  qualityNoTasks: '📭 No tasks registered',
  qualityNoTasksMessage: 'Add tasks to the project to view quality indicators.',
  qualityExportPDF: '📄 Export as PDF',
  qualityPrint: '🖨️ Print Report',
  qualityTasksCompleted: 'TASKS COMPLETED',
  qualityDefects: 'DEFECTS / REWORK',
  qualityCustomerSatisfaction: 'CUSTOMER SATISFACTION',
  qualityOverdueTasks: 'OVERDUE TASKS',
  qualityKPI: '📈 Strategic KPIs',
  qualityMetricsAnalysis: 'Quality Metrics Analysis',
  qualityActualVsTarget: 'Actual vs Target performance',
  qualityTrend: 'Trend',
  qualityPositive: 'Positive',
  qualityStable: 'Stable',
  qualityNegative: 'Negative',
  qualityForecast: '📈 Quality Forecast',
  qualityProjectedEvolution: 'Projected quality evolution · 30/60/90 days',
  qualityTaskStatusDistribution: 'Task Status Distribution',
  qualityCompleted: 'Completed',
  qualityInProgress: 'In Progress',
  qualityPending: 'Pending',
  qualityOverdue: 'Overdue',
  qualityExecutiveAssessment: 'Executive Quality Assessment',
  qualityStrategicActionPlan: '📋 Strategic Action Plan:',
  qualityImmediateActions: 'Immediate Actions',
  qualityContinuousImprovement: 'Continuous Improvement',
  qualityNextReview: 'Next Review',
  qualityConfidential: '🔒 CONFIDENTIAL - For executive use only',
  qualityMethodology: 'Methodology: ISO 9001 Quality Management Standards · QPI = (Success Rate × 0.5) + (Satisfaction × 0.3) + (Punctuality × 0.2)',
  qualityGenerated: 'Generated',
  qualitySource: 'Source: PM Virtual Executive Platform',
  qualityExcellent: 'EXCELLENT',
  qualityGood: 'GOOD',
  qualityAcceptable: 'ACCEPTABLE',
  qualityNeedsImprovement: 'NEEDS IMPROVEMENT',
  qualityAchieved: 'Achieved',
  qualityAtRisk: 'At Risk',
  qualityImprovementNeeded: 'Improvement needed',

  // ========== DESEMPEÑO ==========
  performanceTitle: '📊 Performance Intelligence Report',
  performanceSubtitle: 'Corporate Analytics Dashboard',
  performanceNoProject: '⚠️ No project selected',
  performanceTeamCapacity: 'TEAM CAPACITY',
  performanceAvgEfficiency: 'AVG EFFICIENCY',
  performanceTopPerformers: 'TOP PERFORMERS',
  performanceRiskIndicators: 'RISK INDICATORS',
  performanceActiveResources: 'Active resources',
  performanceRequireAttention: 'Require attention',
  performanceRisksControlled: 'Risks controlled',
  performanceScoreChart: '📈 Performance Score by Resource',
  performanceMaxScore: 'Max score: 100 points',
  performanceCompletionEfficiency: '✅ Completion vs Efficiency Analysis',
  performanceTopResources: 'Top 8 resources',
  performanceCompletionRate: '🎯 Completion Rate by Resource',
  performanceTimeEfficiency: '⚡ Time Efficiency Analysis',
  performanceRegister: '📋 Resource Performance Register',
  performanceResourcesTracked: 'resources tracked',
  performanceResource: 'Resource',
  performanceTasks: 'Tasks',
  performanceCompletion: 'Completion',
  performanceEfficiency: 'Efficiency',
  performanceQuality: 'Quality',
  performanceScore: 'Score',
  performanceRating: 'Rating',
  performanceHighPriority: 'high priority tasks',
  performanceTopPerformersRecognition: '🏆 TOP PERFORMERS RECOGNITION',
  performanceConsiderLeadership: '⭐ Consider for leadership opportunities and special recognition',
  performanceRiskAttention: '⚠️ RISK & ATTENTION REQUIRED',
  performanceCoachingSessions: '📈 Schedule coaching sessions and improvement plans',
  performanceRecommendations: '💡 Executive Recommendations & Action Plan',
  performanceStrategicPriorities: '🎯 Strategic Priorities',
  performanceImproveCompletion: 'Improve completion rate',
  performanceReduceOverdue: 'Reduce overdue tasks',
  performanceBalanceWorkload: 'Balance workload across team',
  performanceResourceActions: '📊 Resource Actions',
  performanceRecognitionRetention: 'Recognition & retention',
  performanceImprovementPlans: 'Performance improvement plans',
  performanceReviewDistribution: 'Review pending tasks distribution',
  performanceNextSteps: '📅 Next Steps',
  performanceScheduleReviews: 'Schedule 1:1 reviews with critical resources',
  performanceWeeklyTracking: 'Weekly performance tracking meeting',
  performanceGenerateNext: 'Generate next report in 30 days',
  performanceConfidential: '🔒 CONFIDENTIAL - For executive use only',
  performanceMethodology: 'Methodology: Weighted scoring (Completion 40% | Efficiency 25% | Quality 20% | Productivity 15%)',
  performanceGenerated: 'Generated',
  performanceSource: 'Source: PM Virtual Executive Platform',
  performanceExcelente: 'Excelente',
  performanceSatisfactorio: 'Satisfactorio',
  performanceEnDesarrollo: 'En Desarrollo',
  performanceCritico: 'Crítico',
  performanceScoreValue: (score) => `${score} pts`,
  performanceTasksCompleted: 'Tasks completed',
  performanceEfficiencyPercent: (eff) => `${eff}%`,
  performanceQualityPercent: (qual) => `${qual}%`,
  performanceProductivity: 'Productivity',

  // ========== HITOS ==========
  milestonesTitle: '🎯 Executive Milestone Dashboard',
  milestonesSubtitle: 'Strategic Milestone Tracking',
  milestonesNoProject: '⚠️ No project selected',
  milestonesNoMilestones: '📭 No milestones selected. Click "Select Milestones" to begin tracking.',
  milestonesTotal: 'Total Milestones',
  milestonesCompleted: 'Completed',
  milestonesInProgress: 'In Progress',
  milestonesPending: 'Pending',
  milestonesOverdue: 'Overdue',
  milestonesCritical: 'Critical',
  milestonesCompletionRate: 'Completion Rate',
  milestonesDueSoon: 'Due ≤3 Days',
  milestonesTimeline: '🗓️ Executive Milestone Timeline',
  milestonesRegister: '📋 Milestone Register (International Format)',
  milestonesGovernance: '👥 Milestone Governance',
  milestonesOwner: '🎯 Milestone Owner',
  milestonesReview: '📊 Review Cadence',
  milestonesTimezone: '🌐 Timezone',
  milestonesSelect: '🎯 Select Milestones',
  milestonesExport: '📄 Export Executive Report',
  milestonesShare: '🌐 Share with Stakeholders',
  milestonesID: 'ID',
  milestonesName: 'Milestone',
  milestonesCategory: 'Category',
  milestonesDueDate: 'Due Date (UTC)',
  milestonesStatus: 'Status',
  milestonesDaysLeft: 'Days Left',
  milestonesHealth: 'Health',
  milestonesActions: 'Actions',
  milestonesView: '👁️',
  milestonesComplete: '✅',
  milestonesStrategic: '🎯 Strategic',
  milestonesTactical: '📋 Tactical',
  milestonesOperational: '⚙️ Operational',
  milestonesOnTrack: '✅ On Track',
  milestonesAtRisk: '🟠 At Risk',
  milestonesDelayed: '🔴 Delayed',
  milestonesDueSoonLabel: '🟡 Due Soon',
  milestonesOnSchedule: '🟢 On Schedule',
  milestonesAlert: '🚨 Executive Alert: Critical Milestones Requiring Attention',
  milestonesActionRequired: '🔴 Action Required',
  milestonesGovernanceDesc: 'Project Manager • Responsible for milestone delivery and stakeholder communication',
  milestonesReviewDesc: 'Weekly status updates • Monthly executive review • Quarterly strategic alignment',
  milestonesTimezoneDesc: 'All dates displayed in UTC • Local time conversion available in export',
  milestonesConfidential: '🔒 Governance: All milestones follow PMI standards with documented approval and audit trail.',
  milestonesInternational: '🌍 International: Dates in UTC format • Multi-language support • Compliance-ready reporting.',
  milestonesCompliance: '✅ Compliance: This module supports SOX, ISO 21500, and PRINCE2 milestone governance.',
  milestonesGenerated: 'Generated',
  milestonesSource: 'Source: PM Virtual Executive Platform',
  milestonesSelectTitle: '🎯 Select Executive Milestones',
  milestonesSelectProject: 'Project',
  milestonesAvailableTasks: '📋 Available Tasks',
  milestonesSaveSelection: '💾 Save Selection',
  milestonesCancel: '❌ Cancel',
  milestonesSaved: (count) => `✅ ${count} milestone(s) saved for executive tracking.\n\n📊 Dashboard updated with selected milestones.`,
  milestonesNoTasks: 'No tasks available',
  milestonesCompletedStatus: '✅ Completed',
  milestonesInProgressStatus: '🔄 In Progress',
  milestonesPendingStatus: '⏳ Pending',
  milestonesOverdueStatus: '🔴 Overdue',
  milestonesHealthOnTrack: '✅ On Track',
  milestonesHealthAtRisk: '🟠 At Risk',
  milestonesHealthDelayed: '🔴 Delayed',
  milestonesHealthDueSoon: '🟡 Due Soon',
  milestonesHealthOnSchedule: '🟢 On Schedule',

  // ========== REPORTES ==========
  reportsTitle: '📊 Executive Reporting Center',
  reportsSubtitle: 'Project',
  reportsNoProject: '⚠️ No project selected',
  reportsNoTasks: '📭 No tasks to display',
  reportsAddTasks: 'Add tasks to the project to visualize reports.',
  reportsTotalTasks: 'Total Tasks',
  reportsCompleted: 'Completed',
  reportsInProgress: 'In Progress',
  reportsOverdue: 'Overdue',
  reportsSPI: 'SPI (Schedule)',
  reportsCPI: 'CPI (Cost)',
  reportsTaskDistribution: '📊 TASK DISTRIBUTION BY STATUS',
  reportsTimeControl: '⏱️ TIME CONTROL (HOURS)',
  reportsBurndown: '📉 BURNDOWN CHART - HOURS PROGRESS',
  reportsGenerator: '📋 EXECUTIVE REPORT GENERATOR',
  reportsHistory: '📋 Report History',
  reportsClearHistory: '🗑️ Clear',
  reportsNoHistory: '📭 No reports generated',
  reportsFrequency: '📅 Frequency',
  reportsFormat: '📄 Format',
  reportsNow: '🚀 Now',
  reportsWeekly: '🗓️ Weekly',
  reportsMonthly: '📆 Monthly',
  reportsHTML: '🌐 HTML Executive',
  reportsJSON: '🔧 JSON Data',
  reportsGenerate: '📊 GENERATE',
  reportsCancel: 'Cancel',
  reportsExecutive: '👔 Executive Summary',
  reportsStatus: '📈 Status Report',
  reportsFinancial: '💰 Financial Report',
  reportsMilestone: '🎯 Milestone Report',
  reportsDescExecutive: 'Executive report with EVM metrics',
  reportsDescStatus: 'Detailed status report',
  reportsDescFinancial: 'Financial performance analysis',
  reportsDescMilestone: 'Milestone tracking report',
  reportsExportPDF: '📄 Export as PDF',
  reportsPrint: '🖨️ Print Report',
  reportsConfidential: '🔒 CONFIDENTIAL - For executive use only',
  reportsGenerated: 'Generated',
  reportsSource: 'Source: PM Virtual Executive Platform',
  reportsKPI: '📈 Strategic KPIs',
  reportsOverallProgress: 'Overall Progress',
  reportsEfficiency: 'Efficiency',
  reportsQuality: 'Quality',
  reportsTasksCompleted: 'Tasks Completed',
  reportsPendingTasks: 'Pending Tasks',
  reportsOverdueTasks: 'Overdue Tasks',
  reportsOnTrack: '✅ On Track',
  reportsAtRisk: '⚠️ At Risk',
  reportsCritical: '🔴 Critical',

  // ========== HABILIDADES ==========
  skillsTitle: '🧠 Multi-Skills Matrix Report',
  skillsSubtitle: 'Multi-competency assessment & gap analysis',
  skillsNoProject: '⚠️ No project selected',
  skillsNoMembers: '👥 No members assigned in project tasks.',
  skillsNoMembersMessage: 'Assign tasks to members to visualize their skills.',
  skillsTeamMembers: 'TEAM MEMBERS',
  skillsTotalSkills: 'TOTAL SKILLS',
  skillsAdvanced: 'ADVANCED SKILLS',
  skillsIntermediate: 'INTERMEDIATE',
  skillsBasic: 'BASIC',
  skillsCompetency: 'Competency Distribution',
  skillsDominant: 'Dominant',
  skillsRegister: 'Register at least 1 skill',
  skillsConsiderTraining: 'Consider advanced training',
  skillsMaintain: 'Maintain level',
  skillsAddSkill: '+ Add skill',
  skillsRemove: '🗑️',
  skillsName: 'Skill name',
  skillsLevel: 'Level',
  skillsBasicLabel: '🌱 Basic',
  skillsIntermediateLabel: '📈 Intermediate',
  skillsAdvancedLabel: '🏆 Advanced',
  skillsGapAnalysis: '📋 Skills Gap Analysis',
  skillsTeamMember: 'Team Member',
  skillsSkillsCount: 'Skills Count',
  skillsAvgLevel: 'Avg Level',
  skillsStatus: 'Status',
  skillsRecommendation: 'Recommendation',
  skillsTopTalent: '🏆 Top Talent & Strengths',
  skillsDevelopment: '📈 Development Opportunities',
  skillsStrategicRecommendations: '💡 Strategic Recommendations',
  skillsImmediateActions: 'Immediate Actions',
  skillsDevelopmentPlan: 'Development Plan',
  skillsSuccessMetrics: 'Success Metrics',
  skillsConfidential: '🔒 CONFIDENTIAL - For executive use only',
  skillsGenerated: 'Generated',
  skillsSource: 'Source: PM Virtual Executive Platform',
  skillsNoSkills: 'No skills registered',
  skillsMissing: '⚠️ Missing',
  skillsStrong: '✅ Strong',
  skillsDeveloping: '📈 Developing',

  // ========== RECONOCIMIENTOS ==========
  recognitionTitle: '🏆 Executive Recognition',
  recognitionSubtitle: 'Celebrating team excellence',
  recognitionNoProject: '⚠️ No project selected',
  recognitionCompletedTasks: 'tasks completed',
  recognitionMilestones: 'milestones achieved',
  recognitionElite: '🏆 ELITE TEAM!',
  recognitionExcellence: '🥇 OPERATIONAL EXCELLENCE',
  recognitionSignificant: '🎯 SIGNIFICANT ACHIEVEMENT',
  recognitionMilestone: '🏅 PROJECT MILESTONE',
  recognitionOnTrack: '🚀 ON TRACK FOR SUCCESS',
  recognitionPlatinum: 'Platinum',
  recognitionGold: 'Gold',
  recognitionSilver: 'Silver',
  recognitionBronze: 'Bronze',
  recognitionActive: '✨ Recognition active',
  recognitionNextTask: 'tasks for next recognition',
  recognitionFirstTask: 'tasks for first recognition',
  recognitionAchievement: 'Achievement unlocked!',
  recognitionCompleted: 'Completed',
  recognitionInProgress: 'In Progress',
  recognitionPending: 'Pending',
  recognitionOverdue: 'Overdue',
  recognitionCritical: 'Critical',
  recognitionProgress: 'Progress',
  recognitionTasksDone: 'Tasks Done',
  recognitionOverdueTasks: 'Overdue',
  recognitionQuickActions: '⚡ Quick Actions',
  recognitionExport: '📄 Export',
  recognitionSchedule: '📅 Schedule',
  recognitionNotify: '🔔 Notify',
  recognitionDashboard: '📊 Dashboard',
  recognitionReportCopied: '✅ Report copied to clipboard',
  recognitionNotificationCopied: '✅ Notification copied to clipboard',
  recognitionReviewScheduled: '📅 Executive Review scheduled for',
  recognitionFullDashboard: '📊 Full Dashboard',
  recognitionFeatureSoon: 'Feature coming soon!',
  recognitionConfidential: '🔒 CONFIDENTIAL - For executive use only',
  recognitionGenerated: 'Generated',

  // ========== MATRIZ DE RIESGOS ==========
  riskMatrixTitle: '⚠️ Risk Assessment Matrix',
  riskMatrixSubtitle: 'Enterprise Risk Management · Quantitative Analysis',
  riskMatrixNoProject: '⚠️ No project selected',
  riskMatrixNoRisks: '🛡️ No active risks detected',
  riskMatrixNoRisksMessage: 'All tasks are within deadline or have been completed.',
  riskMatrixOptimal: '✅ Optimal project health status',
  riskMatrixTotalRisks: 'TOTAL RISKS',
  riskMatrixExtremeCritical: 'EXTREME + CRITICAL',
  riskMatrixHighMedium: 'HIGH + MEDIUM',
  riskMatrixFinancialImpact: 'EST. FINANCIAL IMPACT',
  riskMatrixHeatMap: 'Risk Heat Map',
  riskMatrixLegend: 'Legend: Score = Impact × Probability',
  riskMatrixRegister: 'Risk Register',
  riskMatrixRiskID: 'Risk ID',
  riskMatrixRiskDescription: 'Risk Description',
  riskMatrixImpact: 'Impact',
  riskMatrixProbability: 'Probability',
  riskMatrixScore: 'Score',
  riskMatrixLevel: 'Level',
  riskMatrixDaysOverdue: 'Days Overdue',
  riskMatrixActionPlan: 'Action Plan',
  riskMatrixOwner: 'Owner',
  riskMatrixExtremeAction: '🔴 Escalate to Board',
  riskMatrixCriticalAction: '🟠 Crisis meeting in 24h',
  riskMatrixHighAction: '🟡 Contingency plan',
  riskMatrixMediumAction: '📌 Weekly monitoring',
  riskMatrixLowAction: '🟢 Regular follow-up',
  riskMatrixExecutiveRecommendation: 'Executive Recommendation',
  riskMatrixActionPlanLabel: '📋 Action Plan:',
  riskMatrixImmediateActions: 'Immediate Actions',
  riskMatrixMitigationPlan: 'Mitigation Plan',
  riskMatrixNextReview: 'Next Review',
  riskMatrixConfidential: '🔒 CONFIDENTIAL - For executive use only',
  riskMatrixMethodology: 'Methodology: ISO 31000 Risk Management Standard · Score = Impact × Probability (1-5 each)',
  riskMatrixGenerated: 'Generated',
  riskMatrixSource: 'Source: PM Virtual Executive Platform',
  riskMatrixExtreme: 'Extreme',
  riskMatrixCritical: 'Critical',
  riskMatrixHigh: 'High',
  riskMatrixMedium: 'Medium',
  riskMatrixLow: 'Low',

  // ========== ACCIONES PREVENTIVAS ==========
  preventiveTitle: '🛡️ Preventive Actions',
  preventiveSubtitle: 'Proactive risk mitigation · Contingency plan',
  preventiveNoProject: '⚠️ No project selected',
  preventiveTotal: 'Total',
  preventiveAddAction: '➕ Add Action',
  preventiveAddPlaceholder: 'e.g., Perform weekly milestone audit, Train team in risk management...',
  preventiveSearch: '🔍 Search preventive action...',
  preventiveExport: '🖨️ Export action list',
  preventiveNoActions: '📋 No preventive actions registered',
  preventiveFirstAction: 'Add the first action to mitigate risks',
  preventiveActionAdded: '✅ Preventive action added successfully',
  preventiveActionDeleted: '🗑️ Action deleted',
  preventiveNoActionsToExport: '📋 No actions to export',
  preventiveExportSuccess: '✅ Preventive actions copied to clipboard',
  preventiveConfirmDelete: 'Delete this action?',
  preventiveConfirmDeleteAll: 'Delete all actions?',
  preventiveDeletedAll: 'All actions deleted',
  preventiveAlertEmpty: '⚠️ Please enter a description for the preventive action',

  // ========== ENCUESTAS ==========
  surveysTitle: '📝 Executive Evaluation',
  surveysSubtitle: 'Strategic evaluation based on stakeholder feedback.',
  surveysGeneralScore: 'Overall Score',
  surveysWeightedAverage: 'Weighted average (scale 1-10)',
  surveysTotalEvaluations: 'Total Evaluations',
  surveysLastEvaluation: 'Last Evaluation',
  surveysNoEvaluations: 'No evaluations registered',
  surveysRegister: '+ Register Evaluation',
  surveysModalTitle: 'Executive Evaluation',
  surveysScoreLabel: 'Score (1-10)',
  surveysCommentLabel: 'Strategic comment',
  surveysCommentPlaceholder: 'Relevant comments for management',
  surveysCancel: 'Cancel',
  surveysSave: 'Save',
  surveysScoreError: 'Score must be between 1 and 10',
  surveysSaved: '✅ Evaluation saved successfully',
  surveysNoProject: '⚠️ No project selected',

  // ========== PORTAL ==========
  portalTitle: '🌐 Executive Portal',
  portalNoProject: '⚠️ No project selected',
  portalProgress: 'Progress',
  portalTasksDone: 'Tasks Done',
  portalOverdue: 'Overdue',
  portalQuickActions: '⚡ Quick Actions',
  portalExport: '📄 Export',
  portalSchedule: '📅 Schedule',
  portalNotify: '🔔 Notify',
  portalDashboard: '📊 Dashboard',
  portalReportCopied: '✅ Report copied to clipboard',
  portalNotificationCopied: '✅ Notification copied to clipboard',
  portalReviewScheduled: (project) => '📅 Executive Review scheduled for: ' + project + '\n\nDate: Next week\nDuration: 30 min',
  portalFullDashboard: '📊 Full Dashboard',
  portalFeatureSoon: 'Feature coming soon!',
  portalConfidential: '🔒 CONFIDENTIAL - For executive use only',
  portalStatusOnTrack: 'On Track',
  portalStatusMonitoring: 'Monitoring',
  portalStatusAtRisk: 'At Risk',

  // ========== CHECKLIST ==========
  checklistTitle: '✅ Project Closure Checklist',
  checklistNoProject: '⚠️ No project selected',
  checklistNewItem: 'New item',
  checklistAddItem: 'Add',
  checklistNoItems: 'No items',
  checklistGenerateClosure: '📄 Generate Closure Report from checklist',
  checklistAllItemsCompleted: '✅ All items are marked as completed.',
  checklistNotAllCompleted: '⚠️ Not all items are checked.',
  checklistItemCompleted: 'Completed',
  checklistItemPending: 'Pending',
  checklistConfirmDelete: 'Delete this item?',
  checklistDeleted: 'Item deleted',
  checklistClosureGenerated: '✅ Closure report generated successfully.',

  // ========== ARCHIVO ==========
  archiveTitle: '📁 Document Archive',
  archiveNoProject: '⚠️ No project selected',
  archiveNoDocuments: '📭 No documents in this archive',
  archiveFolder: 'Folder',
  archiveRoot: 'Root',
  archiveCreateFolder: '+ Create folder',
  archiveUpload: 'Upload document',
  archiveChooseFile: 'Choose File',
  archiveNoFileSelected: 'No file selected',
  archiveName: 'Name',
  archiveDate: 'Date',
  archiveFolderCol: 'Folder',
  archiveActions: 'Actions',
  archiveDownload: 'Download',
  archiveDelete: '🗑️',
  archiveDeleteConfirm: 'Delete this document?',
  archiveFolderCreated: (name) => '✅ Folder "' + name + '" created.',
  archiveUploadSuccess: '✅ Document uploaded successfully',
  archiveNoFile: '⚠️ Please select a file',
  archiveFileTooLarge: '⚠️ File is too large (max 10MB)',
  archiveConfirmDeleteAll: 'Delete all documents?',
  archiveDeletedAll: 'All documents deleted',
  archiveConfidential: '🔒 CONFIDENTIAL - For internal use only',
  archiveGenerated: 'Generated',

  // ========== TRANSFERENCIA ==========
  transferTitle: '🔄 Transfer to Operations Plan',
  transferNoProject: '⚠️ No project selected',
  transferPlanLabel: 'Maintenance plan:',
  transferResponsibleLabel: 'Responsible:',
  transferDateLabel: 'Planned date:',
  transferSave: 'Save plan',
  transferGenerateDoc: 'Generate document',
  transferSaved: '✅ Transfer plan saved',
  transferDocTitle: 'Transfer to Operations Plan',
  transferProject: 'Project',
  transferPlan: 'Maintenance Plan',
  transferResponsible: 'Responsible',
  transferDate: 'Planned Date',
  transferConfidential: '🔒 CONFIDENTIAL - Transfer plan for operations',
  transferGenerated: 'Generated',

  // ========== SCRUM ==========
  scrumTitle: 'VPI PLATINUM MASTER',
  scrumSubtitle: 'Executive Scrum Dashboard',
  scrumNoProject: '⚠️ No project selected',
  scrumTotalPoints: 'TOTAL POINTS',
  scrumDonePoints: 'POINTS DONE',
  scrumPendingPoints: 'PENDING POINTS',
  scrumEfficiency: 'EFFICIENCY',
  scrumKanban: 'Kanban Board',
  scrumTodo: 'TODO',
  scrumDoing: 'DOING',
  scrumDone: 'DONE',
  scrumOverdue: 'OVERDUE',
  scrumAddStory: '+ Story',
  scrumAddSprint: '+ Sprint',
  scrumExportPDF: '📄 Export BI PDF',
  scrumBacklogHealth: 'Backlog Health',
  scrumVelocity: 'Velocity by Sprint',
  scrumTeamPerformance: 'Team Performance',
  scrumBurndown: 'Burndown Chart',
  scrumSprintManagement: 'Sprint Management & Velocity',
  scrumSprintName: 'Sprint',
  scrumPlanned: 'Planned',
  scrumCompleted: 'Completed',
  scrumVelocityLabel: 'Velocity',
  scrumEfficiencyLabel: 'Efficiency',
  scrumAction: 'Action',
  scrumDelete: 'Delete',
  scrumControlMatrix: 'Requirement Control Matrix',
  scrumID: 'ID',
  scrumTitleLabel: 'Title',
  scrumStatus: 'Status',
  scrumPoints: 'Points',
  scrumDelivery: 'Delivery',
  scrumSprint: 'Sprint',
  scrumResponsible: 'Responsible',
  scrumActions: 'Actions',
  scrumAssignSprint: 'Sprint',
  scrumDeleteStory: '✕',
  scrumStoryTitle: 'Story Title',
  scrumStoryPoints: 'Story Points',
  scrumResponsibleLabel: 'Assigned to',
  scrumEndDate: 'End Date',
  scrumSprintNameLabel: 'Sprint Name',
  scrumConfirmDelete: 'Delete this task?',
  scrumConfirmDeleteSprint: 'Delete this Sprint? Associated tasks will be unlinked.',
  scrumStoryAdded: '✅ Story added successfully',
  scrumSprintAdded: '✅ Sprint added successfully',
  scrumStoryDeleted: '✅ Story deleted',
  scrumSprintDeleted: '✅ Sprint deleted',
  scrumStoryUpdated: '✅ Story updated',
  scrumExporting: '📊 Generating Executive Report...',
  scrumExportSuccess: '✅ Executive Report generated successfully',
  scrumExportError: 'Error generating report. Check console.',
  scrumConfidential: '🔒 CONFIDENTIAL - For executive use only',
  scrumGenerated: 'Generated',
  scrumSource: 'Source: PM Virtual Executive Platform',
  scrumNoData: 'No data available',
  scrumPointsPerDay: 'SP/D',
  scrumIdeal: 'Ideal',
  scrumReal: 'Real',
  scrumBurndownIdeal: 'Ideal Line',
  scrumBurndownReal: 'Actual Progress',
  scrumHealthChart: 'Health of the Backlog',
  scrumHealthDesc: 'Percentage representation of project maturity. Analyzes how many requirements are stuck versus completed.',
  scrumVelocityDesc: 'Historical performance metric. Evaluates the team\'s actual delivery capacity in each iteration based on empirical evidence.',
  scrumTeamDesc: 'Productivity audit by responsible party. Identifies workload and compliance of each technical cell.',
  scrumBurndownDesc: 'Predictive daily control. Compares the ideal trajectory of remaining work against actual execution of the current sprint.',
  scrumRadarMetrics: 'HEALTH METRICS',
  scrumRadarInterpretation: 'INTERPRETATION',
  scrumRadarEfficiency: 'Efficiency',
  scrumRadarVelocity: 'Velocity',
  scrumRadarQuality: 'Quality',
  scrumRadarCoverage: 'Coverage',
  scrumRadarPredictability: 'Predictability',
  scrumRadarBacklogHealth: 'Backlog Health',
  scrumRadarDesc1: 'The radar evaluates 6 key dimensions:',
  scrumRadarDesc2: '• Efficiency: SP completed / total',
  scrumRadarDesc3: '• Velocity: average SP per sprint',
  scrumRadarDesc4: '• Quality: % of non-overdue tasks',
  scrumRadarDesc5: '• Coverage: % of assigned tasks',
  scrumRadarDesc6: '• Predictability: sprint accuracy',
  scrumRadarDesc7: '• Backlog Health: % of pending tasks',
  scrumStatusDistribution: 'PROJECT STATUS DISTRIBUTION',
  scrumAnalysis: 'ANALYSIS',
  scrumAnalysisDesc1: 'This chart shows the current distribution of tasks in the workflow.',
  scrumAnalysisDesc2: 'A high percentage in "Completed" indicates healthy progress.',
  scrumAnalysisDesc3: 'Overdue items require immediate attention.',
  scrumVelocityConclusion: 'VELOCITY CONCLUSIONS',
  scrumVelocityConclusion1: 'Velocity measures the team\'s delivery capacity per sprint.',
  scrumVelocityConclusion2: 'Consistent values indicate predictable performance.',
  scrumVelocityConclusion3: 'Compare actual vs planned to assess accuracy.',
  scrumBurndownInterpretation: 'BURNDOWN INTERPRETATION',
  scrumBurndownDesc1: 'The burndown chart tracks remaining work over time.',
  scrumBurndownDesc2: 'The ideal line shows expected progress.',
  scrumBurndownDesc3: 'If the real line is above ideal, the team is delayed.',
  scrumBurndownDesc4: 'Below indicates progress ahead of schedule.',
  scrumBurndownDesc5: 'Use it to adjust sprint planning.',
  scrumTeamPerformanceTitle: 'TEAM PERFORMANCE',
  scrumTopPerformers: 'TOP PERFORMERS',
  scrumTeamChartDesc: 'This chart shows total Story Points completed by each team member.',

  // ========== CAMBIOS ==========
  changesTitle: '🔄 Change Control System',
  changesSubtitle: 'PMI/ITIL Change Management',
  changesNoProject: '⚠️ No project selected',
  changesTotal: 'Total',
  changesApproved: 'Approved',
  changesPending: 'Pending',
  changesRejected: 'Rejected',
  changesImplemented: 'Implemented',
  changesSuccessRate: 'SUCCESS RATE',
  changesNewRequest: '➕ New Change Request',
  changesExportReport: '📄 Export Report',
  changesExportAudit: '📄 Export Audit Log',
  changesFilter: 'Filter by status',
  changesAllStatuses: 'All statuses',
  changesRegistered: 'Registered',
  changesUnderEvaluation: 'Under Evaluation',
  changesApprovedStatus: 'Approved',
  changesRejectedStatus: 'Rejected',
  changesImplementedStatus: 'Implemented',
  changesID: 'ID',
  changesRequest: 'Request',
  changesType: 'Type',
  changesImpact: 'Impact',
  changesStatus: 'Status',
  changesDate: 'Date',
  changesActions: 'Actions',
  changesView: 'View',
  changesEvaluate: 'Evaluate',
  changesApprove: 'Approve',
  changesRejectAction: 'Reject',
  changesImplement: 'Implement',
  changesNewRequestTitle: 'New Change Request',
  changesTitleLabel: 'Title',
  changesDescription: 'Description',
  changesTypeLabel: 'Type',
  changesStandard: 'Standard',
  changesNormal: 'Normal',
  changesMajor: 'Major',
  changesEmergency: 'Emergency',
  changesImpactLabel: 'Impact',
  changesLow: 'Low',
  changesMedium: 'Medium',
  changesHigh: 'High',
  changesCritical: 'Critical',
  changesRequester: 'Requester',
  changesSave: '💾 Save',
  changesCancel: '❌ Cancel',
  changesConfirmDelete: 'Are you sure you want to delete this request?',
  changesRequestDeleted: 'Request deleted',
  changesConfirmStartEvaluation: 'Start evaluation of this request?',
  changesEvaluationStarted: 'Evaluation started',
  changesConfirmApprove: 'Approve this request?',
  changesRequestApproved: 'Request approved',
  changesRejectReason: 'Reason for rejection:',
  changesRequestRejected: 'Request rejected',
  changesConfirmImplement: 'Mark as implemented?',
  changesRequestImplemented: 'Request implemented',
  changesDetailsTitle: 'REQUEST DETAILS',
  changesNoRequests: '📭 No change requests registered.',
  changesConfidential: '🔒 CONFIDENTIAL - Change Control System PMI/ITIL',
};

console.log('✅ TRADUCCIONES COMPLETAS CARGADAS - Todas las pestañas');


// Si existe window.I18N, fusionarlo
if (window.I18N) {
    window.translations = Object.assign({}, window.I18N, window.translations);
}





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
// TRADUCCIONES COMPLETAS - UNIFICADO (TODAS LAS PESTAÑAS)
// ============================================================
window.translations = {

  // ========== INTERFAZ PRINCIPAL Y PESTAÑAS ==========
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

  // ========== DOCUMENTOS ==========
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

  // ========== DASHBOARD ==========
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

  noProject: '⚠️ No project selected',
  docNotImplemented: 'Function not implemented for: ',
  errorGenerating: 'Error generating document: ',
  alertNoProject: 'No project selected',

  // ========== CONTROL ==========
  controlTitle: '⚙️ Executive Control Panel',
  controlUpdated: 'Updated',
  controlTotalTasks: 'Total Tasks',
  controlCompleted: 'Completed',
  controlOverdue: 'Overdue',
  controlCritical: 'Critical',
  controlEVM: '📊 EVM Indicators',
  controlSPI: 'SPI (Schedule)',
  controlCPI: 'CPI (Cost)',
  controlEstimated: 'Estimated',
  controlEfficiency: 'Efficiency',
  controlAlerts: '🚨 Operational Alerts',
  controlRecommendations: '💡 Recommendations',
  controlResourceLoad: '👥 Resource Load',
  controlQuickActions: '⚡ Quick Actions',
  controlApply: '✅ Apply',
  controlExportReport: '📄 Export Report',
  controlAlertTeam: '📢 Alert Team',
  controlReviewSchedule: '📅 Review Schedule',
  controlOptimizeResources: '⚖️ Optimize Resources',
  controlNoProject: '⚠️ No project selected',
  controlTasksReprogrammed: (count) => `✅ ${count} task(s) rescheduled (+7 days).`,
  controlAlertSent: '📢 Alert sent to team about critical tasks.',
  controlScheduleAnalysis: (overdue, total) =>
    `📅 Schedule Analysis\n━━━━━━━━━━\n🔴 Overdue: ${overdue}\n📊 Total with date: ${total}\n\n✅ Review critical path and resources.`,
  controlCostAnalysis: (est, reg, diff) =>
    `💰 Cost Analysis\n━━━━━━━━━━\n📊 Estimated: ${est}h\n💵 Logged: ${reg}h\n📈 Variance: ${diff >= 0 ? '+' : ''}${diff}h\n\n✅ Controls applied: hour limits, required approvals.`,
  controlWIPLimit: (count) => `✅ ${count} task(s) moved to pending.\n🎯 Focus efforts to complete faster.`,
  controlReassigned: (count) => `✅ ${count} task(s) reassigned to balance workload.`,
  controlReportCopied: '✅ Report copied to clipboard.',
  controlNoAlerts: '✅ No pending alerts.',
  controlOptimization: (analysis) =>
    `⚖️ Resource Optimization\n━━━━━━━━━━\n${analysis}\n\n✅ Load analyzed. Redistribute if necessary.`,
  controlNoResources: 'No available resources',

  // ========== COSTOS ==========
  costsTitle: '💰 Financial Intelligence Dashboard',
  costsSubtitle: 'Earned Value Management · Real-time Cost Control',
  costsNoProject: '⚠️ No project selected',
  costsNoTasks: '📭 No tasks registered',
  costsNoTasksMessage: 'Add tasks to the project to view financial metrics.',
  costsExportPDF: '📄 Export as PDF',
  costsPrint: '🖨️ Print Report',
  costsBAC: 'BAC (Budget at Completion)',
  costsAC: 'AC (Actual Cost)',
  costsEV: 'EV (Earned Value)',
  costsCV: 'CV (Cost Variance)',
  costsUnderBudget: 'Under budget',
  costsOverBudget: 'Over budget',
  costsEVM: 'Earned Value Management (EVM) Analysis',
  costsEVMSubtitle: 'Quantitative performance metrics following PMI standards',
  costsMetric: 'Metric',
  costsFormula: 'Formula',
  costsValue: 'Value',
  costsInterpretation: 'Interpretation',
  costsStatus: 'Status',
  costsSPI: 'SPI (Schedule Performance Index)',
  costsCPI: 'CPI (Cost Performance Index)',
  costsEAC: 'EAC (Estimate at Completion)',
  costsETC: 'ETC (Estimate to Complete)',
  costsVAC: 'VAC (Variance at Completion)',
  costsTCPI: 'TCPI (To-Complete Performance Index)',
  costsAheadSchedule: 'Ahead of schedule',
  costsSlightDelay: 'Slight delay',
  costsSignificantDelay: 'Significant delay',
  costsOnTrack: '✅ On Track',
  costsWatch: '⚠️ Watch',
  costsCritical: '🔴 Critical',
  costsEfficient: '✅ Efficient',
  costsOverrun: '🔴 Overrun',
  costsCostPerformance: 'Cost Performance Analysis',
  costsPV: 'PV (Planned Value)',
  costsEVLabel: 'EV (Earned Value)',
  costsACLabel: 'AC (Actual Cost)',
  costsFinancialForecast: 'Financial Forecast & Projections',
  costsOptimistic: 'Optimistic Scenario',
  costsMostLikely: 'Most Likely (EAC)',
  costsPessimistic: 'Pessimistic Scenario',
  costsContingency: 'Contingency margin recommended',
  costsExecutiveRecommendation: 'Executive Financial Recommendation',
  costsActionPlan: '📋 Strategic Action Plan:',
  costsImmediateActions: 'Immediate Actions',
  costsMitigationPlan: 'Mitigation Plan',
  costsNextReview: 'Next Review',
  costsConfidential: '🔒 CONFIDENTIAL - For executive use only',
  costsMethodology: 'Methodology: PMI EVM Standards · CPI = EV/AC · SPI = EV/PV · EAC = BAC/CPI',
  costsGenerated: 'Generated',
  costsSource: 'Source: PM Virtual Executive Platform',

  // ========== REUNIONES ==========
  meetingsTitle: '🗓️ Executive Meeting Management',
  meetingsProject: 'Project',
  meetingsTotal: 'Total Meetings',
  meetingsUpcoming: 'Upcoming',
  meetingsPendingAgreements: 'Pending Agreements',
  meetingsLastMeeting: 'Last Meeting',
  meetingsNoMeetings: '📭 No meetings registered yet. Schedule the first one using the button above.',
  meetingsNewMeeting: '+ Schedule Meeting',
  meetingsTranscriptor: '🎙️ AI Transcriber',
  meetingsExport: '📄 Export History',
  meetingsAgenda: 'Agenda',
  meetingsParticipants: 'Participants',
  meetingsAgreements: 'Agreements',
  meetingsStatus: 'Status',
  meetingsActions: 'Actions',
  meetingsViewAgenda: '📄 View Minutes',
  meetingsEdit: '✏️ Edit',
  meetingsDelete: '🗑️ Delete',
  meetingsCompleted: 'Completed',
  meetingsPending: 'Pending',
  meetingsType: 'Meeting Type',
  meetingsDate: 'Date & Time',
  meetingsResponsible: 'Responsible',
  meetingsFormat: 'Format',
  meetingsFrequency: 'Frequency',
  meetingsContent: 'Content / Information Type',
  meetingsInfluence: 'Influence Level',
  meetingsInterest: 'Interest Level',
  meetingsChannel: 'Channel',
  meetingsSave: '💾 Save & Schedule',
  meetingsCancel: '❌ Cancel',
  meetingsConfirmDelete: 'Delete this meeting?',
  meetingsConfirmDeleteAll: 'Delete all meetings?',
  meetingsDeleted: '✅ Meeting deleted',
  meetingsUpdated: '✅ Meeting updated successfully',
  meetingsCreated: '✅ Meeting scheduled successfully',
  meetingsExportSuccess: '✅ Meeting history copied to clipboard',
  meetingsNoMeetingsToExport: '📭 No meetings to export',
  meetingsStakeholder: 'Stakeholder',
  meetingsSelectTemplate: 'Select agenda template...',
  meetingsTemplateFollowUp: '🔄 Project Follow-up',
  meetingsTemplateKickoff: '🚀 Kick-off',
  meetingsTemplateReview: '📊 Performance Review',
  meetingsTemplateClosure: '✅ Phase Closure',
  meetingsTemplateCustom: '✏️ Custom',
  meetingsPlaceholderTitle: 'e.g., Sprint #3 Review',
  meetingsPlaceholderAgenda: '1. Item 1\n2. Item 2\n3. Item 3',
  meetingsPlaceholderParticipants: 'e.g., PM, Sponsor, Team (comma separated)',
  meetingsPlaceholderStakeholder: 'e.g., IT Director, Client, Executive Committee',
  meetingsPlaceholderContent: 'e.g., Weekly progress, Risk alerts, Strategic decisions',
  meetingsMinuteTitle: 'Meeting Minutes',
  meetingsMinuteSubtitle: 'MEETING MINUTES - EXECUTIVE DOCUMENT',
  meetingsAgendaTitle: '📋 Agenda',
  meetingsAgreementsTitle: '✅ Agreements & Actions',
  meetingsNextSteps: '🎯 Next Steps',
  meetingsFooter: 'CONFIDENTIAL - For internal project use only',
  meetingsGenerated: 'Generated automatically by PM Virtual Executive',

  // ========== GANTT ==========
  ganttTitle: '📈 Executive Gantt Chart',
  ganttSubtitle: 'Programmatic Timeline · Critical Path Analysis · Executive Dashboard',
  ganttNoProject: '⚠️ No project selected',
  ganttNoTasks: '📭 No tasks to display',
  ganttTotalTasks: 'Total Tasks',
  ganttCompleted: 'Completed',
  ganttInProgress: 'In Progress',
  ganttPending: 'Pending',
  ganttOverdue: 'Overdue',
  ganttCritical: 'Critical',
  ganttMilestones: 'Milestones',
  ganttSPI: 'SPI',
  ganttProgress: 'Progress',
  ganttRiskLevel: 'Risk Level',
  ganttExportPDF: '📄 Export as PDF',
  ganttPrint: '🖨️ Print Report',
  ganttTimeline: 'Programmatic Timeline',
  ganttTask: 'TASK',
  ganttEndDate: 'END DATE',
  ganttLegendCompleted: 'Completed',
  ganttLegendInProgress: 'In Progress',
  ganttLegendPending: 'Pending',
  ganttLegendOverdue: 'Overdue / Critical',
  ganttLegendMilestone: 'Milestone',
  ganttLegendToday: 'Today',
  ganttFilterAll: '📌 All statuses',
  ganttFilterCompleted: '✅ Completed',
  ganttFilterInProgress: '🔄 In Progress',
  ganttFilterPending: '⏳ Pending',
  ganttClearFilters: '🗑️ Clear',
  ganttTaskDetail: '📋 TASK DETAIL',
  ganttAssignedTo: 'Assigned to',
  ganttStart: 'Start',
  ganttEnd: 'End',
  ganttStatus: 'Status',
  ganttPriorityHigh: 'High',
  ganttPriorityMedium: 'Medium',
  ganttPriorityLow: 'Low',
  ganttStatusCompleted: '✅ Completed',
  ganttStatusInProgress: '🔄 In Progress',
  ganttStatusPending: '⏳ Pending',
  ganttStatusOverdue: '⚠️ Overdue',
  ganttRiskExtreme: 'EXTREME',
  ganttRiskCritical: 'CRITICAL',
  ganttRiskHigh: 'HIGH',
  ganttRiskMedium: 'MEDIUM',
  ganttRiskLow: 'LOW',
  ganttUrgentImportant: 'URGENT + IMPORTANT',
  ganttImportantNotUrgent: 'IMPORTANT + NOT URGENT',
  ganttUrgentNotImportant: 'URGENT + NOT IMPORTANT',
  ganttNeither: 'NEITHER',
  ganttPriorityAction: 'Attend immediately',
  ganttPriorityPlan: 'Plan execution',
  ganttPriorityDelegate: 'Delegate or automate',
  ganttPrioritySchedule: 'Schedule or eliminate',
  ganttFinancialProjection: '💰 Financial Projection',
  ganttEstimatedCost: 'Estimated Cost',
  ganttActualCost: 'Actual Cost',
  ganttVariance: 'Variance',
  ganttWithinBudget: '✅ The project is within budget',
  ganttOverBudget: '⚠️ The project is over budget. Review estimates recommended.',
  ganttStrategicRecommendation: '💡 Strategic Recommendation',
  ganttRecommendationText: (overdue, critical, spi) => {
    let text = 'Based on quantitative analysis of SPI (' + spi + '), overdue tasks (' + overdue + '), and risk level, the following is recommended:';
    let items = [];
    if (overdue > 0) items.push('🔴 Prioritize recovery of overdue tasks through resource reallocation');
    if (critical > 0) items.push('⚠️ Establish daily follow-up on critical path tasks');
    if (spi < 0.9) items.push('📉 Implement acceleration plan (fast-tracking/crashing) to recover schedule');
    items.push('📊 Schedule weekly progress review with the team');
    items.push('📅 Next executive review scheduled for ' + new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-US'));
    return text + '\n' + items.join('\n');
  },
  ganttConfidential: '🔒 CONFIDENTIAL - For executive use only',
  ganttMethodology: 'Methodology: Critical Path Method (CPM) · Schedule Performance Index (SPI) · Earned Value Management (EVM)',
  ganttGenerated: 'Generated',
  ganttSource: 'Source: PM Virtual Executive Platform',

  // ========== RECURSOS ==========
  resourcesTitle: '👥 Resource Intelligence Report',
  resourcesSubtitle: 'Capacity Analysis, Productivity & Resource Optimization',
  resourcesNoProject: '⚠️ No project selected',
  resourcesNoTasks: '📭 No tasks to display',
  resourcesExecutiveSummary: '📋 Executive Summary',
  resourcesKeyFindings: '📊 Key Findings',
  resourcesRecommendations: '💡 Strategic Recommendations',
  resourcesProductivity: 'Productivity',
  resourcesEfficiency: 'Efficiency',
  resourcesSuccessRate: 'Success Rate',
  resourcesFinancialImpact: 'Financial Impact',
  resourcesWorkloadDistribution: '📊 Workload Distribution by Resource',
  resourcesProductivityEfficiency: '📈 Productivity vs Efficiency Matrix',
  resourcesRegister: '📋 Resource Performance Register',
  resourcesResource: 'Resource',
  resourcesTasks: 'Tasks',
  resourcesCompleted: 'Completed',
  resourcesInProgress: 'In Progress',
  resourcesPending: 'Pending',
  resourcesOverdue: 'Overdue',
  resourcesStatus: 'Status',
  resourcesOverloaded: 'Overloaded',
  resourcesWithDelays: 'With Delays',
  resourcesAvailable: 'Available',
  resourcesNormal: 'Normal',
  resourcesImmediateActions: '🎯 Immediate Actions (72h)',
  resourcesShortTerm: '📅 Short Term (2 weeks)',
  resourcesLongTerm: '🏆 Long Term (Quarterly)',
  resourcesConfidential: '🔒 CONFIDENTIAL - For executive use only',
  resourcesMethodology: 'Methodology: Quantitative analysis based on historical productivity data. Complies with PMI standards.',
  resourcesGenerated: 'Generated',
  resourcesSource: 'Source: PM Virtual Executive Platform',
  resourcesAvgProductivity: 'Average productivity of the team',
  resourcesEfficiencyCost: 'Real vs estimated hours',
  resourcesOnTimeDelivery: 'Deliveries on time',
  resourcesSavingOverrun: (value) => `${value >= 0 ? 'Projected savings' : 'Overrun'}`,
  resourcesHighSuccess: 'High success rate',
  resourcesModerateSuccess: 'Moderate success rate',
  resourcesLowSuccess: 'Low success rate',
  resourcesOverloadedResources: (count) => `${count} resource(s) with critical overload`,
  resourcesOverdueTasks: (count) => `${count} overdue tasks`,
  resourcesEfficiencyPercent: (pct) => `Cost efficiency: ${pct}%`,
  resourcesRecommendImmediate: (count) => `Immediate reassignment of ${count} resources`,
  resourcesReviewPriorities: 'Review priorities on overdue tasks',
  resourcesAdjustEstimates: 'Adjust estimates for next phases',

  // ========== CALIDAD ==========
  qualityTitle: '📊 Quality Performance Report',
  qualitySubtitle: 'Quality Metrics & Operational Excellence',
  qualityNoProject: '⚠️ No project selected',
  qualityNoTasks: '📭 No tasks registered',
  qualityNoTasksMessage: 'Add tasks to the project to view quality indicators.',
  qualityExportPDF: '📄 Export as PDF',
  qualityPrint: '🖨️ Print Report',
  qualityTasksCompleted: 'TASKS COMPLETED',
  qualityDefects: 'DEFECTS / REWORK',
  qualityCustomerSatisfaction: 'CUSTOMER SATISFACTION',
  qualityOverdueTasks: 'OVERDUE TASKS',
  qualityKPI: '📈 Strategic KPIs',
  qualityMetricsAnalysis: 'Quality Metrics Analysis',
  qualityActualVsTarget: 'Actual vs Target performance',
  qualityTrend: 'Trend',
  qualityPositive: 'Positive',
  qualityStable: 'Stable',
  qualityNegative: 'Negative',
  qualityForecast: '📈 Quality Forecast',
  qualityProjectedEvolution: 'Projected quality evolution · 30/60/90 days',
  qualityTaskStatusDistribution: 'Task Status Distribution',
  qualityCompleted: 'Completed',
  qualityInProgress: 'In Progress',
  qualityPending: 'Pending',
  qualityOverdue: 'Overdue',
  qualityExecutiveAssessment: 'Executive Quality Assessment',
  qualityStrategicActionPlan: '📋 Strategic Action Plan:',
  qualityImmediateActions: 'Immediate Actions',
  qualityContinuousImprovement: 'Continuous Improvement',
  qualityNextReview: 'Next Review',
  qualityConfidential: '🔒 CONFIDENTIAL - For executive use only',
  qualityMethodology: 'Methodology: ISO 9001 Quality Management Standards · QPI = (Success Rate × 0.5) + (Satisfaction × 0.3) + (Punctuality × 0.2)',
  qualityGenerated: 'Generated',
  qualitySource: 'Source: PM Virtual Executive Platform',
  qualityExcellent: 'EXCELLENT',
  qualityGood: 'GOOD',
  qualityAcceptable: 'ACCEPTABLE',
  qualityNeedsImprovement: 'NEEDS IMPROVEMENT',
  qualityAchieved: 'Achieved',
  qualityAtRisk: 'At Risk',
  qualityImprovementNeeded: 'Improvement needed',

  // ========== DESEMPEÑO ==========
  performanceTitle: '📊 Performance Intelligence Report',
  performanceSubtitle: 'Corporate Analytics Dashboard',
  performanceNoProject: '⚠️ No project selected',
  performanceTeamCapacity: 'TEAM CAPACITY',
  performanceAvgEfficiency: 'AVG EFFICIENCY',
  performanceTopPerformers: 'TOP PERFORMERS',
  performanceRiskIndicators: 'RISK INDICATORS',
  performanceActiveResources: 'Active resources',
  performanceRequireAttention: 'Require attention',
  performanceRisksControlled: 'Risks controlled',
  performanceScoreChart: '📈 Performance Score by Resource',
  performanceMaxScore: 'Max score: 100 points',
  performanceCompletionEfficiency: '✅ Completion vs Efficiency Analysis',
  performanceTopResources: 'Top 8 resources',
  performanceCompletionRate: '🎯 Completion Rate by Resource',
  performanceTimeEfficiency: '⚡ Time Efficiency Analysis',
  performanceRegister: '📋 Resource Performance Register',
  performanceResourcesTracked: 'resources tracked',
  performanceResource: 'Resource',
  performanceTasks: 'Tasks',
  performanceCompletion: 'Completion',
  performanceEfficiency: 'Efficiency',
  performanceQuality: 'Quality',
  performanceScore: 'Score',
  performanceRating: 'Rating',
  performanceHighPriority: 'high priority tasks',
  performanceTopPerformersRecognition: '🏆 TOP PERFORMERS RECOGNITION',
  performanceConsiderLeadership: '⭐ Consider for leadership opportunities and special recognition',
  performanceRiskAttention: '⚠️ RISK & ATTENTION REQUIRED',
  performanceCoachingSessions: '📈 Schedule coaching sessions and improvement plans',
  performanceRecommendations: '💡 Executive Recommendations & Action Plan',
  performanceStrategicPriorities: '🎯 Strategic Priorities',
  performanceImproveCompletion: 'Improve completion rate',
  performanceReduceOverdue: 'Reduce overdue tasks',
  performanceBalanceWorkload: 'Balance workload across team',
  performanceResourceActions: '📊 Resource Actions',
  performanceRecognitionRetention: 'Recognition & retention',
  performanceImprovementPlans: 'Performance improvement plans',
  performanceReviewDistribution: 'Review pending tasks distribution',
  performanceNextSteps: '📅 Next Steps',
  performanceScheduleReviews: 'Schedule 1:1 reviews with critical resources',
  performanceWeeklyTracking: 'Weekly performance tracking meeting',
  performanceGenerateNext: 'Generate next report in 30 days',
  performanceConfidential: '🔒 CONFIDENTIAL - For executive use only',
  performanceMethodology: 'Methodology: Weighted scoring (Completion 40% | Efficiency 25% | Quality 20% | Productivity 15%)',
  performanceGenerated: 'Generated',
  performanceSource: 'Source: PM Virtual Executive Platform',
  performanceExcelente: 'Excelente',
  performanceSatisfactorio: 'Satisfactorio',
  performanceEnDesarrollo: 'En Desarrollo',
  performanceCritico: 'Crítico',
  performanceScoreValue: (score) => `${score} pts`,
  performanceTasksCompleted: 'Tasks completed',
  performanceEfficiencyPercent: (eff) => `${eff}%`,
  performanceQualityPercent: (qual) => `${qual}%`,
  performanceProductivity: 'Productivity',

  // ========== HITOS ==========
  milestonesTitle: '🎯 Executive Milestone Dashboard',
  milestonesSubtitle: 'Strategic Milestone Tracking',
  milestonesNoProject: '⚠️ No project selected',
  milestonesNoMilestones: '📭 No milestones selected. Click "Select Milestones" to begin tracking.',
  milestonesTotal: 'Total Milestones',
  milestonesCompleted: 'Completed',
  milestonesInProgress: 'In Progress',
  milestonesPending: 'Pending',
  milestonesOverdue: 'Overdue',
  milestonesCritical: 'Critical',
  milestonesCompletionRate: 'Completion Rate',
  milestonesDueSoon: 'Due ≤3 Days',
  milestonesTimeline: '🗓️ Executive Milestone Timeline',
  milestonesRegister: '📋 Milestone Register (International Format)',
  milestonesGovernance: '👥 Milestone Governance',
  milestonesOwner: '🎯 Milestone Owner',
  milestonesReview: '📊 Review Cadence',
  milestonesTimezone: '🌐 Timezone',
  milestonesSelect: '🎯 Select Milestones',
  milestonesExport: '📄 Export Executive Report',
  milestonesShare: '🌐 Share with Stakeholders',
  milestonesID: 'ID',
  milestonesName: 'Milestone',
  milestonesCategory: 'Category',
  milestonesDueDate: 'Due Date (UTC)',
  milestonesStatus: 'Status',
  milestonesDaysLeft: 'Days Left',
  milestonesHealth: 'Health',
  milestonesActions: 'Actions',
  milestonesView: '👁️',
  milestonesComplete: '✅',
  milestonesStrategic: '🎯 Strategic',
  milestonesTactical: '📋 Tactical',
  milestonesOperational: '⚙️ Operational',
  milestonesOnTrack: '✅ On Track',
  milestonesAtRisk: '🟠 At Risk',
  milestonesDelayed: '🔴 Delayed',
  milestonesDueSoonLabel: '🟡 Due Soon',
  milestonesOnSchedule: '🟢 On Schedule',
  milestonesAlert: '🚨 Executive Alert: Critical Milestones Requiring Attention',
  milestonesActionRequired: '🔴 Action Required',
  milestonesGovernanceDesc: 'Project Manager • Responsible for milestone delivery and stakeholder communication',
  milestonesReviewDesc: 'Weekly status updates • Monthly executive review • Quarterly strategic alignment',
  milestonesTimezoneDesc: 'All dates displayed in UTC • Local time conversion available in export',
  milestonesConfidential: '🔒 Governance: All milestones follow PMI standards with documented approval and audit trail.',
  milestonesInternational: '🌍 International: Dates in UTC format • Multi-language support • Compliance-ready reporting.',
  milestonesCompliance: '✅ Compliance: This module supports SOX, ISO 21500, and PRINCE2 milestone governance.',
  milestonesGenerated: 'Generated',
  milestonesSource: 'Source: PM Virtual Executive Platform',
  milestonesSelectTitle: '🎯 Select Executive Milestones',
  milestonesSelectProject: 'Project',
  milestonesAvailableTasks: '📋 Available Tasks',
  milestonesSaveSelection: '💾 Save Selection',
  milestonesCancel: '❌ Cancel',
  milestonesSaved: (count) => `✅ ${count} milestone(s) saved for executive tracking.\n\n📊 Dashboard updated with selected milestones.`,
  milestonesNoTasks: 'No tasks available',
  milestonesCompletedStatus: '✅ Completed',
  milestonesInProgressStatus: '🔄 In Progress',
  milestonesPendingStatus: '⏳ Pending',
  milestonesOverdueStatus: '🔴 Overdue',
  milestonesHealthOnTrack: '✅ On Track',
  milestonesHealthAtRisk: '🟠 At Risk',
  milestonesHealthDelayed: '🔴 Delayed',
  milestonesHealthDueSoon: '🟡 Due Soon',
  milestonesHealthOnSchedule: '🟢 On Schedule',

  // ========== REPORTES ==========
  reportsTitle: '📊 Executive Reporting Center',
  reportsSubtitle: 'Project',
  reportsNoProject: '⚠️ No project selected',
  reportsNoTasks: '📭 No tasks to display',
  reportsAddTasks: 'Add tasks to the project to visualize reports.',
  reportsTotalTasks: 'Total Tasks',
  reportsCompleted: 'Completed',
  reportsInProgress: 'In Progress',
  reportsOverdue: 'Overdue',
  reportsSPI: 'SPI (Schedule)',
  reportsCPI: 'CPI (Cost)',
  reportsTaskDistribution: '📊 TASK DISTRIBUTION BY STATUS',
  reportsTimeControl: '⏱️ TIME CONTROL (HOURS)',
  reportsBurndown: '📉 BURNDOWN CHART - HOURS PROGRESS',
  reportsGenerator: '📋 EXECUTIVE REPORT GENERATOR',
  reportsHistory: '📋 Report History',
  reportsClearHistory: '🗑️ Clear',
  reportsNoHistory: '📭 No reports generated',
  reportsFrequency: '📅 Frequency',
  reportsFormat: '📄 Format',
  reportsNow: '🚀 Now',
  reportsWeekly: '🗓️ Weekly',
  reportsMonthly: '📆 Monthly',
  reportsHTML: '🌐 HTML Executive',
  reportsJSON: '🔧 JSON Data',
  reportsGenerate: '📊 GENERATE',
  reportsCancel: 'Cancel',
  reportsExecutive: '👔 Executive Summary',
  reportsStatus: '📈 Status Report',
  reportsFinancial: '💰 Financial Report',
  reportsMilestone: '🎯 Milestone Report',
  reportsDescExecutive: 'Executive report with EVM metrics',
  reportsDescStatus: 'Detailed status report',
  reportsDescFinancial: 'Financial performance analysis',
  reportsDescMilestone: 'Milestone tracking report',
  reportsExportPDF: '📄 Export as PDF',
  reportsPrint: '🖨️ Print Report',
  reportsConfidential: '🔒 CONFIDENTIAL - For executive use only',
  reportsGenerated: 'Generated',
  reportsSource: 'Source: PM Virtual Executive Platform',
  reportsKPI: '📈 Strategic KPIs',
  reportsOverallProgress: 'Overall Progress',
  reportsEfficiency: 'Efficiency',
  reportsQuality: 'Quality',
  reportsTasksCompleted: 'Tasks Completed',
  reportsPendingTasks: 'Pending Tasks',
  reportsOverdueTasks: 'Overdue Tasks',
  reportsOnTrack: '✅ On Track',
  reportsAtRisk: '⚠️ At Risk',
  reportsCritical: '🔴 Critical',

  // ========== HABILIDADES ==========
  skillsTitle: '🧠 Multi-Skills Matrix Report',
  skillsSubtitle: 'Multi-competency assessment & gap analysis',
  skillsNoProject: '⚠️ No project selected',
  skillsNoMembers: '👥 No members assigned in project tasks.',
  skillsNoMembersMessage: 'Assign tasks to members to visualize their skills.',
  skillsTeamMembers: 'TEAM MEMBERS',
  skillsTotalSkills: 'TOTAL SKILLS',
  skillsAdvanced: 'ADVANCED SKILLS',
  skillsIntermediate: 'INTERMEDIATE',
  skillsBasic: 'BASIC',
  skillsCompetency: 'Competency Distribution',
  skillsDominant: 'Dominant',
  skillsRegister: 'Register at least 1 skill',
  skillsConsiderTraining: 'Consider advanced training',
  skillsMaintain: 'Maintain level',
  skillsAddSkill: '+ Add skill',
  skillsRemove: '🗑️',
  skillsName: 'Skill name',
  skillsLevel: 'Level',
  skillsBasicLabel: '🌱 Basic',
  skillsIntermediateLabel: '📈 Intermediate',
  skillsAdvancedLabel: '🏆 Advanced',
  skillsGapAnalysis: '📋 Skills Gap Analysis',
  skillsTeamMember: 'Team Member',
  skillsSkillsCount: 'Skills Count',
  skillsAvgLevel: 'Avg Level',
  skillsStatus: 'Status',
  skillsRecommendation: 'Recommendation',
  skillsTopTalent: '🏆 Top Talent & Strengths',
  skillsDevelopment: '📈 Development Opportunities',
  skillsStrategicRecommendations: '💡 Strategic Recommendations',
  skillsImmediateActions: 'Immediate Actions',
  skillsDevelopmentPlan: 'Development Plan',
  skillsSuccessMetrics: 'Success Metrics',
  skillsConfidential: '🔒 CONFIDENTIAL - For executive use only',
  skillsGenerated: 'Generated',
  skillsSource: 'Source: PM Virtual Executive Platform',
  skillsNoSkills: 'No skills registered',
  skillsMissing: '⚠️ Missing',
  skillsStrong: '✅ Strong',
  skillsDeveloping: '📈 Developing',

  // ========== RECONOCIMIENTOS ==========
  recognitionTitle: '🏆 Executive Recognition',
  recognitionSubtitle: 'Celebrating team excellence',
  recognitionNoProject: '⚠️ No project selected',
  recognitionCompletedTasks: 'tasks completed',
  recognitionMilestones: 'milestones achieved',
  recognitionElite: '🏆 ELITE TEAM!',
  recognitionExcellence: '🥇 OPERATIONAL EXCELLENCE',
  recognitionSignificant: '🎯 SIGNIFICANT ACHIEVEMENT',
  recognitionMilestone: '🏅 PROJECT MILESTONE',
  recognitionOnTrack: '🚀 ON TRACK FOR SUCCESS',
  recognitionPlatinum: 'Platinum',
  recognitionGold: 'Gold',
  recognitionSilver: 'Silver',
  recognitionBronze: 'Bronze',
  recognitionActive: '✨ Recognition active',
  recognitionNextTask: 'tasks for next recognition',
  recognitionFirstTask: 'tasks for first recognition',
  recognitionAchievement: 'Achievement unlocked!',
  recognitionCompleted: 'Completed',
  recognitionInProgress: 'In Progress',
  recognitionPending: 'Pending',
  recognitionOverdue: 'Overdue',
  recognitionCritical: 'Critical',
  recognitionProgress: 'Progress',
  recognitionTasksDone: 'Tasks Done',
  recognitionOverdueTasks: 'Overdue',
  recognitionQuickActions: '⚡ Quick Actions',
  recognitionExport: '📄 Export',
  recognitionSchedule: '📅 Schedule',
  recognitionNotify: '🔔 Notify',
  recognitionDashboard: '📊 Dashboard',
  recognitionReportCopied: '✅ Report copied to clipboard',
  recognitionNotificationCopied: '✅ Notification copied to clipboard',
  recognitionReviewScheduled: '📅 Executive Review scheduled for',
  recognitionFullDashboard: '📊 Full Dashboard',
  recognitionFeatureSoon: 'Feature coming soon!',
  recognitionConfidential: '🔒 CONFIDENTIAL - For executive use only',
  recognitionGenerated: 'Generated',

  // ========== MATRIZ DE RIESGOS ==========
  riskMatrixTitle: '⚠️ Risk Assessment Matrix',
  riskMatrixSubtitle: 'Enterprise Risk Management · Quantitative Analysis',
  riskMatrixNoProject: '⚠️ No project selected',
  riskMatrixNoRisks: '🛡️ No active risks detected',
  riskMatrixNoRisksMessage: 'All tasks are within deadline or have been completed.',
  riskMatrixOptimal: '✅ Optimal project health status',
  riskMatrixTotalRisks: 'TOTAL RISKS',
  riskMatrixExtremeCritical: 'EXTREME + CRITICAL',
  riskMatrixHighMedium: 'HIGH + MEDIUM',
  riskMatrixFinancialImpact: 'EST. FINANCIAL IMPACT',
  riskMatrixHeatMap: 'Risk Heat Map',
  riskMatrixLegend: 'Legend: Score = Impact × Probability',
  riskMatrixRegister: 'Risk Register',
  riskMatrixRiskID: 'Risk ID',
  riskMatrixRiskDescription: 'Risk Description',
  riskMatrixImpact: 'Impact',
  riskMatrixProbability: 'Probability',
  riskMatrixScore: 'Score',
  riskMatrixLevel: 'Level',
  riskMatrixDaysOverdue: 'Days Overdue',
  riskMatrixActionPlan: 'Action Plan',
  riskMatrixOwner: 'Owner',
  riskMatrixExtremeAction: '🔴 Escalate to Board',
  riskMatrixCriticalAction: '🟠 Crisis meeting in 24h',
  riskMatrixHighAction: '🟡 Contingency plan',
  riskMatrixMediumAction: '📌 Weekly monitoring',
  riskMatrixLowAction: '🟢 Regular follow-up',
  riskMatrixExecutiveRecommendation: 'Executive Recommendation',
  riskMatrixActionPlanLabel: '📋 Action Plan:',
  riskMatrixImmediateActions: 'Immediate Actions',
  riskMatrixMitigationPlan: 'Mitigation Plan',
  riskMatrixNextReview: 'Next Review',
  riskMatrixConfidential: '🔒 CONFIDENTIAL - For executive use only',
  riskMatrixMethodology: 'Methodology: ISO 31000 Risk Management Standard · Score = Impact × Probability (1-5 each)',
  riskMatrixGenerated: 'Generated',
  riskMatrixSource: 'Source: PM Virtual Executive Platform',
  riskMatrixExtreme: 'Extreme',
  riskMatrixCritical: 'Critical',
  riskMatrixHigh: 'High',
  riskMatrixMedium: 'Medium',
  riskMatrixLow: 'Low',

  // ========== ACCIONES PREVENTIVAS ==========
  preventiveTitle: '🛡️ Preventive Actions',
  preventiveSubtitle: 'Proactive risk mitigation · Contingency plan',
  preventiveNoProject: '⚠️ No project selected',
  preventiveTotal: 'Total',
  preventiveAddAction: '➕ Add Action',
  preventiveAddPlaceholder: 'e.g., Perform weekly milestone audit, Train team in risk management...',
  preventiveSearch: '🔍 Search preventive action...',
  preventiveExport: '🖨️ Export action list',
  preventiveNoActions: '📋 No preventive actions registered',
  preventiveFirstAction: 'Add the first action to mitigate risks',
  preventiveActionAdded: '✅ Preventive action added successfully',
  preventiveActionDeleted: '🗑️ Action deleted',
  preventiveNoActionsToExport: '📋 No actions to export',
  preventiveExportSuccess: '✅ Preventive actions copied to clipboard',
  preventiveConfirmDelete: 'Delete this action?',
  preventiveConfirmDeleteAll: 'Delete all actions?',
  preventiveDeletedAll: 'All actions deleted',
  preventiveAlertEmpty: '⚠️ Please enter a description for the preventive action',

  // ========== ENCUESTAS ==========
  surveysTitle: '📝 Executive Evaluation',
  surveysSubtitle: 'Strategic evaluation based on stakeholder feedback.',
  surveysGeneralScore: 'Overall Score',
  surveysWeightedAverage: 'Weighted average (scale 1-10)',
  surveysTotalEvaluations: 'Total Evaluations',
  surveysLastEvaluation: 'Last Evaluation',
  surveysNoEvaluations: 'No evaluations registered',
  surveysRegister: '+ Register Evaluation',
  surveysModalTitle: 'Executive Evaluation',
  surveysScoreLabel: 'Score (1-10)',
  surveysCommentLabel: 'Strategic comment',
  surveysCommentPlaceholder: 'Relevant comments for management',
  surveysCancel: 'Cancel',
  surveysSave: 'Save',
  surveysScoreError: 'Score must be between 1 and 10',
  surveysSaved: '✅ Evaluation saved successfully',
  surveysNoProject: '⚠️ No project selected',

  // ========== PORTAL ==========
  portalTitle: '🌐 Executive Portal',
  portalNoProject: '⚠️ No project selected',
  portalProgress: 'Progress',
  portalTasksDone: 'Tasks Done',
  portalOverdue: 'Overdue',
  portalQuickActions: '⚡ Quick Actions',
  portalExport: '📄 Export',
  portalSchedule: '📅 Schedule',
  portalNotify: '🔔 Notify',
  portalDashboard: '📊 Dashboard',
  portalReportCopied: '✅ Report copied to clipboard',
  portalNotificationCopied: '✅ Notification copied to clipboard',
  portalReviewScheduled: (project) => '📅 Executive Review scheduled for: ' + project + '\n\nDate: Next week\nDuration: 30 min',
  portalFullDashboard: '📊 Full Dashboard',
  portalFeatureSoon: 'Feature coming soon!',
  portalConfidential: '🔒 CONFIDENTIAL - For executive use only',
  portalStatusOnTrack: 'On Track',
  portalStatusMonitoring: 'Monitoring',
  portalStatusAtRisk: 'At Risk',

  // ========== CHECKLIST ==========
  checklistTitle: '✅ Project Closure Checklist',
  checklistNoProject: '⚠️ No project selected',
  checklistNewItem: 'New item',
  checklistAddItem: 'Add',
  checklistNoItems: 'No items',
  checklistGenerateClosure: '📄 Generate Closure Report from checklist',
  checklistAllItemsCompleted: '✅ All items are marked as completed.',
  checklistNotAllCompleted: '⚠️ Not all items are checked.',
  checklistItemCompleted: 'Completed',
  checklistItemPending: 'Pending',
  checklistConfirmDelete: 'Delete this item?',
  checklistDeleted: 'Item deleted',
  checklistClosureGenerated: '✅ Closure report generated successfully.',

  // ========== ARCHIVO ==========
  archiveTitle: '📁 Document Archive',
  archiveNoProject: '⚠️ No project selected',
  archiveNoDocuments: '📭 No documents in this archive',
  archiveFolder: 'Folder',
  archiveRoot: 'Root',
  archiveCreateFolder: '+ Create folder',
  archiveUpload: 'Upload document',
  archiveChooseFile: 'Choose File',
  archiveNoFileSelected: 'No file selected',
  archiveName: 'Name',
  archiveDate: 'Date',
  archiveFolderCol: 'Folder',
  archiveActions: 'Actions',
  archiveDownload: 'Download',
  archiveDelete: '🗑️',
  archiveDeleteConfirm: 'Delete this document?',
  archiveFolderCreated: (name) => '✅ Folder "' + name + '" created.',
  archiveUploadSuccess: '✅ Document uploaded successfully',
  archiveNoFile: '⚠️ Please select a file',
  archiveFileTooLarge: '⚠️ File is too large (max 10MB)',
  archiveConfirmDeleteAll: 'Delete all documents?',
  archiveDeletedAll: 'All documents deleted',
  archiveConfidential: '🔒 CONFIDENTIAL - For internal use only',
  archiveGenerated: 'Generated',

  // ========== TRANSFERENCIA ==========
  transferTitle: '🔄 Transfer to Operations Plan',
  transferNoProject: '⚠️ No project selected',
  transferPlanLabel: 'Maintenance plan:',
  transferResponsibleLabel: 'Responsible:',
  transferDateLabel: 'Planned date:',
  transferSave: 'Save plan',
  transferGenerateDoc: 'Generate document',
  transferSaved: '✅ Transfer plan saved',
  transferDocTitle: 'Transfer to Operations Plan',
  transferProject: 'Project',
  transferPlan: 'Maintenance Plan',
  transferResponsible: 'Responsible',
  transferDate: 'Planned Date',
  transferConfidential: '🔒 CONFIDENTIAL - Transfer plan for operations',
  transferGenerated: 'Generated',

  // ========== SCRUM ==========
  scrumTitle: 'VPI PLATINUM MASTER',
  scrumSubtitle: 'Executive Scrum Dashboard',
  scrumNoProject: '⚠️ No project selected',
  scrumTotalPoints: 'TOTAL POINTS',
  scrumDonePoints: 'POINTS DONE',
  scrumPendingPoints: 'PENDING POINTS',
  scrumEfficiency: 'EFFICIENCY',
  scrumKanban: 'Kanban Board',
  scrumTodo: 'TODO',
  scrumDoing: 'DOING',
  scrumDone: 'DONE',
  scrumOverdue: 'OVERDUE',
  scrumAddStory: '+ Story',
  scrumAddSprint: '+ Sprint',
  scrumExportPDF: '📄 Export BI PDF',
  scrumBacklogHealth: 'Backlog Health',
  scrumVelocity: 'Velocity by Sprint',
  scrumTeamPerformance: 'Team Performance',
  scrumBurndown: 'Burndown Chart',
  scrumSprintManagement: 'Sprint Management & Velocity',
  scrumSprintName: 'Sprint',
  scrumPlanned: 'Planned',
  scrumCompleted: 'Completed',
  scrumVelocityLabel: 'Velocity',
  scrumEfficiencyLabel: 'Efficiency',
  scrumAction: 'Action',
  scrumDelete: 'Delete',
  scrumControlMatrix: 'Requirement Control Matrix',
  scrumID: 'ID',
  scrumTitleLabel: 'Title',
  scrumStatus: 'Status',
  scrumPoints: 'Points',
  scrumDelivery: 'Delivery',
  scrumSprint: 'Sprint',
  scrumResponsible: 'Responsible',
  scrumActions: 'Actions',
  scrumAssignSprint: 'Sprint',
  scrumDeleteStory: '✕',
  scrumStoryTitle: 'Story Title',
  scrumStoryPoints: 'Story Points',
  scrumResponsibleLabel: 'Assigned to',
  scrumEndDate: 'End Date',
  scrumSprintNameLabel: 'Sprint Name',
  scrumConfirmDelete: 'Delete this task?',
  scrumConfirmDeleteSprint: 'Delete this Sprint? Associated tasks will be unlinked.',
  scrumStoryAdded: '✅ Story added successfully',
  scrumSprintAdded: '✅ Sprint added successfully',
  scrumStoryDeleted: '✅ Story deleted',
  scrumSprintDeleted: '✅ Sprint deleted',
  scrumStoryUpdated: '✅ Story updated',
  scrumExporting: '📊 Generating Executive Report...',
  scrumExportSuccess: '✅ Executive Report generated successfully',
  scrumExportError: 'Error generating report. Check console.',
  scrumConfidential: '🔒 CONFIDENTIAL - For executive use only',
  scrumGenerated: 'Generated',
  scrumSource: 'Source: PM Virtual Executive Platform',
  scrumNoData: 'No data available',
  scrumPointsPerDay: 'SP/D',
  scrumIdeal: 'Ideal',
  scrumReal: 'Real',
  scrumBurndownIdeal: 'Ideal Line',
  scrumBurndownReal: 'Actual Progress',
  scrumHealthChart: 'Health of the Backlog',
  scrumHealthDesc: 'Percentage representation of project maturity. Analyzes how many requirements are stuck versus completed.',
  scrumVelocityDesc: 'Historical performance metric. Evaluates the team\'s actual delivery capacity in each iteration based on empirical evidence.',
  scrumTeamDesc: 'Productivity audit by responsible party. Identifies workload and compliance of each technical cell.',
  scrumBurndownDesc: 'Predictive daily control. Compares the ideal trajectory of remaining work against actual execution of the current sprint.',
  scrumRadarMetrics: 'HEALTH METRICS',
  scrumRadarInterpretation: 'INTERPRETATION',
  scrumRadarEfficiency: 'Efficiency',
  scrumRadarVelocity: 'Velocity',
  scrumRadarQuality: 'Quality',
  scrumRadarCoverage: 'Coverage',
  scrumRadarPredictability: 'Predictability',
  scrumRadarBacklogHealth: 'Backlog Health',
  scrumRadarDesc1: 'The radar evaluates 6 key dimensions:',
  scrumRadarDesc2: '• Efficiency: SP completed / total',
  scrumRadarDesc3: '• Velocity: average SP per sprint',
  scrumRadarDesc4: '• Quality: % of non-overdue tasks',
  scrumRadarDesc5: '• Coverage: % of assigned tasks',
  scrumRadarDesc6: '• Predictability: sprint accuracy',
  scrumRadarDesc7: '• Backlog Health: % of pending tasks',
  scrumStatusDistribution: 'PROJECT STATUS DISTRIBUTION',
  scrumAnalysis: 'ANALYSIS',
  scrumAnalysisDesc1: 'This chart shows the current distribution of tasks in the workflow.',
  scrumAnalysisDesc2: 'A high percentage in "Completed" indicates healthy progress.',
  scrumAnalysisDesc3: 'Overdue items require immediate attention.',
  scrumVelocityConclusion: 'VELOCITY CONCLUSIONS',
  scrumVelocityConclusion1: 'Velocity measures the team\'s delivery capacity per sprint.',
  scrumVelocityConclusion2: 'Consistent values indicate predictable performance.',
  scrumVelocityConclusion3: 'Compare actual vs planned to assess accuracy.',
  scrumBurndownInterpretation: 'BURNDOWN INTERPRETATION',
  scrumBurndownDesc1: 'The burndown chart tracks remaining work over time.',
  scrumBurndownDesc2: 'The ideal line shows expected progress.',
  scrumBurndownDesc3: 'If the real line is above ideal, the team is delayed.',
  scrumBurndownDesc4: 'Below indicates progress ahead of schedule.',
  scrumBurndownDesc5: 'Use it to adjust sprint planning.',
  scrumTeamPerformanceTitle: 'TEAM PERFORMANCE',
  scrumTopPerformers: 'TOP PERFORMERS',
  scrumTeamChartDesc: 'This chart shows total Story Points completed by each team member.',

  // ========== CAMBIOS ==========
  changesTitle: '🔄 Change Control System',
  changesSubtitle: 'PMI/ITIL Change Management',
  changesNoProject: '⚠️ No project selected',
  changesTotal: 'Total',
  changesApproved: 'Approved',
  changesPending: 'Pending',
  changesRejected: 'Rejected',
  changesImplemented: 'Implemented',
  changesSuccessRate: 'SUCCESS RATE',
  changesNewRequest: '➕ New Change Request',
  changesExportReport: '📄 Export Report',
  changesExportAudit: '📄 Export Audit Log',
  changesFilter: 'Filter by status',
  changesAllStatuses: 'All statuses',
  changesRegistered: 'Registered',
  changesUnderEvaluation: 'Under Evaluation',
  changesApprovedStatus: 'Approved',
  changesRejectedStatus: 'Rejected',
  changesImplementedStatus: 'Implemented',
  changesID: 'ID',
  changesRequest: 'Request',
  changesType: 'Type',
  changesImpact: 'Impact',
  changesStatus: 'Status',
  changesDate: 'Date',
  changesActions: 'Actions',
  changesView: 'View',
  changesEvaluate: 'Evaluate',
  changesApprove: 'Approve',
  changesRejectAction: 'Reject',
  changesImplement: 'Implement',
  changesNewRequestTitle: 'New Change Request',
  changesTitleLabel: 'Title',
  changesDescription: 'Description',
  changesTypeLabel: 'Type',
  changesStandard: 'Standard',
  changesNormal: 'Normal',
  changesMajor: 'Major',
  changesEmergency: 'Emergency',
  changesImpactLabel: 'Impact',
  changesLow: 'Low',
  changesMedium: 'Medium',
  changesHigh: 'High',
  changesCritical: 'Critical',
  changesRequester: 'Requester',
  changesSave: '💾 Save',
  changesCancel: '❌ Cancel',
  changesConfirmDelete: 'Are you sure you want to delete this request?',
  changesRequestDeleted: 'Request deleted',
  changesConfirmStartEvaluation: 'Start evaluation of this request?',
  changesEvaluationStarted: 'Evaluation started',
  changesConfirmApprove: 'Approve this request?',
  changesRequestApproved: 'Request approved',
  changesRejectReason: 'Reason for rejection:',
  changesRequestRejected: 'Request rejected',
  changesConfirmImplement: 'Mark as implemented?',
  changesRequestImplemented: 'Request implemented',
  changesDetailsTitle: 'REQUEST DETAILS',
  changesNoRequests: '📭 No change requests registered.',
  changesConfidential: '🔒 CONFIDENTIAL - Change Control System PMI/ITIL',
};

console.log('✅ TRADUCCIONES COMPLETAS CARGADAS - Todas las pestañas');


// Si existe window.I18N, fusionarlo
if (window.I18N) {
    window.translations = Object.assign({}, window.I18N, window.translations);
}




// ============================================================
// FUNCIONES SOBRESCRITAS (usando window.I18N)
// ============================================================

// 1. abrirPanelCompleto
// Dentro de cargarIngles, después de definir window.I18N y las demás funciones:

window.abrirPanelCompleto = function() {
    const proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
        alert(window.I18N.noProject);
        return;
    }

    const overlay = document.createElement('div');
    overlay.id = 'pmVirtualPanel';
    overlay.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); backdrop-filter:blur(10px); z-index:100000; display:flex; justify-content:center; align-items:center;';

    const panel = document.createElement('div');
    panel.style.cssText = 'width:1300px; max-width:95vw; height:85vh; background:linear-gradient(135deg,#0f172a,#1e293b); border-radius:24px; border:1px solid #3b82f6; display:flex; flex-direction:column; overflow:hidden; color:white; font-family:system-ui;';

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
    header.style.cssText = 'display:flex; justify-content:space-between; align-items:center; padding:15px 25px; background:rgba(0,0,0,0.3); border-bottom:1px solid #3b82f6; flex-wrap:wrap; gap:10px;';

    const tabsContainer = document.createElement('div');
    tabsContainer.style.display = 'flex';
    tabsContainer.style.flexWrap = 'wrap';
    tabsContainer.style.gap = '10px';

    tabs.forEach(tab => {
        const btn = document.createElement('button');
        btn.textContent = tab.label;
        btn.style.cssText = 'background:none; border:none; color:' + (activeTab === tab.id ? '#3b82f6' : '#94a3b8') + '; font-size:12px; font-weight:bold; cursor:pointer; padding:6px 12px; border-radius:8px; transition:0.2s;';
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
    closeBtn.style.cssText = 'background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#ef4444; padding:8px 16px; border-radius:8px; cursor:pointer;';
    closeBtn.onclick = () => overlay.remove();
    header.appendChild(closeBtn);

    panel.appendChild(header);

    const contentDiv = document.createElement('div');
    contentDiv.id = 'pmContent';
    contentDiv.style.cssText = 'flex:1; overflow-y:auto; padding:25px;';
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

// ============================================================
// AMPLIAR TRADUCCIONES PARA LA PESTAÑA CONTROL
// ============================================================
window.translations = Object.assign(window.translations || {}, {
  // Títulos y etiquetas de Control
  controlTitle: '⚙️ Executive Control Panel',
  controlUpdated: 'Updated',
  controlTotalTasks: 'Total Tasks',
  controlCompleted: 'Completed',
  controlOverdue: 'Overdue',
  controlCritical: 'Critical',
  controlEVM: '📊 EVM Indicators',
  controlSPI: 'SPI (Schedule)',
  controlCPI: 'CPI (Cost)',
  controlEstimated: 'Estimated',
  controlEfficiency: 'Efficiency',
  controlAlerts: '🚨 Operational Alerts',
  controlRecommendations: '💡 Recommendations',
  controlResourceLoad: '👥 Resource Load',
  controlQuickActions: '⚡ Quick Actions',
  controlApply: '✅ Apply',
  controlExportReport: '📄 Export Report',
  controlAlertTeam: '📢 Alert Team',
  controlReviewSchedule: '📅 Review Schedule',
  controlOptimizeResources: '⚖️ Optimize Resources',
  controlNoProject: '⚠️ No project selected',
  controlTasksReprogrammed: (count) => `✅ ${count} task(s) rescheduled (+7 days).`,
  controlAlertSent: '📢 Alert sent to team about critical tasks.',
  controlScheduleAnalysis: (overdue, total) =>
    `📅 Schedule Analysis\n━━━━━━━━━━\n🔴 Overdue: ${overdue}\n📊 Total with date: ${total}\n\n✅ Review critical path and resources.`,
  controlCostAnalysis: (est, reg, diff) =>
    `💰 Cost Analysis\n━━━━━━━━━━\n📊 Estimated: ${est}h\n💵 Logged: ${reg}h\n📈 Variance: ${diff >= 0 ? '+' : ''}${diff}h\n\n✅ Controls applied: hour limits, required approvals.`,
  controlWIPLimit: (count) => `✅ ${count} task(s) moved to pending.\n🎯 Focus efforts to complete faster.`,
  controlReassigned: (count) => `✅ ${count} task(s) reassigned to balance workload.`,
  controlReportCopied: '✅ Report copied to clipboard.',
  controlNoAlerts: '✅ No pending alerts.',
  controlOptimization: (analysis) =>
    `⚖️ Resource Optimization\n━━━━━━━━━━\n${analysis}\n\n✅ Load analyzed. Redistribute if necessary.`,
  controlNoResources: 'No available resources',
});

// ============================================================
// RENDER CONTROL - VERSIÓN INGLESA (SIN ALIAS, SIN REDECLARACIONES)
// ============================================================

// Funciones auxiliares (traducidas)
function reprogramarTareas(cantidad) {
  const proyecto = obtenerProyectoActual();
  let cont = 0;
  proyecto.tasks.forEach(function(tarea) {
    if (tarea.deadline && new Date(tarea.deadline) < new Date() && tarea.status !== 'completed' && cont < cantidad) {
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + 7);
      tarea.deadline = newDate.toISOString().split('T')[0];
      cont++;
    }
  });
  guardarProyectos(obtenerProyectos());
  alert(window.translations.controlTasksReprogrammed(cont));
}

function alertarTareasCriticas(cantidad) {
  const proyecto = obtenerProyectoActual();
  const criticas = proyecto.tasks.filter(function(tarea) {
    return tarea.priority === 'high' && tarea.status !== 'completed';
  });
  const mensaje = '🔔 ALERT: ' + cantidad + ' critical tasks in ' + proyecto.name + '\n\n' +
    criticas.map(function(tarea) { return '• ' + tarea.name + ' - Responsible: ' + (tarea.assignee || 'N/A'); }).join('\n');
  console.log('📢 Alert:', mensaje);
  alert(window.translations.controlAlertSent);
}

function revisarCronograma() {
  const proyecto = obtenerProyectoActual();
  const tareasConFecha = proyecto.tasks.filter(function(tarea) { return tarea.deadline; });
  const atrasadas = tareasConFecha.filter(function(tarea) {
    return new Date(tarea.deadline) < new Date() && tarea.status !== 'completed';
  });
  alert(window.translations.controlScheduleAnalysis(atrasadas.length, tareasConFecha.length));
}

function controlarSobrecosto() {
  const proyecto = obtenerProyectoActual();
  const horasEst = proyecto.tasks.reduce(function(s, tarea) { return s + (Number(tarea.estimatedTime) || 0); }, 0);
  const horasReg = proyecto.tasks.reduce(function(s, tarea) { return s + (Number(tarea.timeLogged) || 0); }, 0);
  const desviacion = horasReg - horasEst;
  alert(window.translations.controlCostAnalysis(horasEst, horasReg, desviacion));
}

function limitarWIP() {
  const proyecto = obtenerProyectoActual();
  const inProgress = proyecto.tasks.filter(function(tarea) { return tarea.status === 'inProgress'; });
  const toMove = inProgress.slice(Math.floor(inProgress.length / 2));
  toMove.forEach(function(tarea) { tarea.status = 'pending'; });
  guardarProyectos(obtenerProyectos());
  alert(window.translations.controlWIPLimit(toMove.length));
}

function reasignarTareas(sobrecargados) {
  const proyecto = obtenerProyectoActual();
  const todos = [...new Set(proyecto.tasks.map(function(tarea) { return tarea.assignee; }).filter(Boolean))];
  const descargados = todos.filter(function(r) {
    return !sobrecargados.some(function(entry) { return entry[0] === r; });
  });
  if (!descargados.length) {
    alert(window.translations.controlNoResources);
    return;
  }
  let reasignadas = 0;
  sobrecargados.forEach(function(entry) {
    const nombre = entry[0];
    const tareas = proyecto.tasks.filter(function(tarea) { return tarea.assignee === nombre && tarea.status === 'inProgress'; });
    const aReasignar = tareas.slice(0, Math.ceil(tareas.length / 2));
    aReasignar.forEach(function(tarea, i) {
      tarea.assignee = descargados[i % descargados.length];
      reasignadas++;
    });
  });
  guardarProyectos(obtenerProyectos());
  alert(window.translations.controlReassigned(reasignadas));
}

function exportarReporteControl() {
  const proyecto = obtenerProyectoActual();
  const reporte = '📊 CONTROL REPORT\n━━━━━━━━━━\nProject: ' + proyecto.name +
    '\nDate: ' + new Date().toLocaleDateString('en-US') +
    '\nTotal: ' + proyecto.tasks.length +
    '\nCompleted: ' + proyecto.tasks.filter(function(tarea) { return tarea.status === 'completed'; }).length +
    '\nOverdue: ' + proyecto.tasks.filter(function(tarea) {
      return tarea.deadline && new Date(tarea.deadline) < new Date() && tarea.status !== 'completed';
    }).length;
  navigator.clipboard?.writeText(reporte).then(function() {
    alert(window.translations.controlReportCopied);
  }).catch(function() {
    alert('📋 Report:\n\n' + reporte);
  });
}

function generarAlertaEquipo() {
  const proyecto = obtenerProyectoActual();
  const atrasadas = proyecto.tasks.filter(function(tarea) {
    return tarea.deadline && new Date(tarea.deadline) < new Date() && tarea.status !== 'completed';
  });
  if (atrasadas.length === 0) {
    alert(window.translations.controlNoAlerts);
    return;
  }
  const mensaje = '🔔 ALERT: ' + proyecto.name + '\n🔴 ' + atrasadas.length + ' overdue tasks:\n' +
    atrasadas.map(function(tarea) { return '• ' + tarea.name; }).join('\n');
  alert('📢 Alert sent:\n\n' + mensaje);
}

function optimizarRecursos() {
  const proyecto = obtenerProyectoActual();
  const recursos = {};
  proyecto.tasks.forEach(function(tarea) {
    if (tarea.assignee) {
      if (!recursos[tarea.assignee]) recursos[tarea.assignee] = { tareas: 0, horas: 0 };
      recursos[tarea.assignee].tareas++;
      recursos[tarea.assignee].horas += Number(tarea.estimatedTime) || 0;
    }
  });
  const analisis = Object.entries(recursos).map(function(entry) {
    const nombre = entry[0];
    const datos = entry[1];
    return nombre + ': ' + datos.tareas + ' tasks, ' + datos.horas + 'h';
  }).join('\n');
  alert(window.translations.controlOptimization(analisis));
}

// ============================================================
// FUNCIÓN PRINCIPAL renderControl (TRADUCIDA)
// ============================================================
window.renderControl = function(container) {
  const proyecto = obtenerProyectoActual();
  if (!proyecto) {
    container.innerHTML = '<p style="color:#94a3b8; text-align:center; padding:40px;">⚠️ ' + window.translations.controlNoProject + '</p>';
    return;
  }

  const tasks = proyecto?.tasks || [];
  const total = tasks.length;
  const completadas = tasks.filter(function(t) { return t.status === 'completed'; }).length;
  const enProgreso = tasks.filter(function(t) { return t.status === 'inProgress'; }).length;
  const pendientes = tasks.filter(function(t) { return t.status === 'pending'; }).length;
  const atrasadas = tasks.filter(function(t) {
    return t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed';
  }).length;
  const criticas = tasks.filter(function(t) {
    return t.priority === 'high' && t.status !== 'completed';
  }).length;

  const horasEst = tasks.reduce(function(s, t) { return s + (Number(t.estimatedTime) || 0); }, 0);
  const horasReg = tasks.reduce(function(s, t) { return s + (Number(t.timeLogged) || 0); }, 0);
  const eficiencia = horasEst > 0 ? Math.round((horasEst / horasReg) * 100) : 100;
  const porcentajeAvance = total > 0 ? Math.round(completadas / total * 100) : 0;

  const PV = horasEst;
  const EV = horasEst * (completadas / Math.max(total, 1));
  const AC = horasReg;
  const SPI = PV > 0 ? EV / PV : 1;
  const CPI = AC > 0 ? EV / AC : 1;

  const recursos = {};
  tasks.forEach(function(t) {
    if (t.assignee) {
      if (!recursos[t.assignee]) recursos[t.assignee] = { total: 0, completadas: 0, enProgreso: 0, horas: 0 };
      recursos[t.assignee].total++;
      recursos[t.assignee].horas += Number(t.estimatedTime) || 0;
      if (t.status === 'completed') recursos[t.assignee].completadas++;
      if (t.status === 'inProgress') recursos[t.assignee].enProgreso++;
    }
  });
  const sobrecargados = Object.entries(recursos).filter(function(entry) {
    return entry[1].enProgreso > 2;
  });

  const recomendaciones = [];
  if (atrasadas > 0) {
    recomendaciones.push({
      titulo: '🔴 Reschedule overdue tasks',
      desc: atrasadas + ' overdue tasks impacting schedule.',
      color: '#ef4444',
      accion: function() { reprogramarTareas(atrasadas); window.renderControl(container); }
    });
  }
  if (criticas > 0) {
    recomendaciones.push({
      titulo: '🔥 Prioritize critical tasks',
      desc: criticas + ' high-priority tasks pending require attention.',
      color: '#f97316',
      accion: function() { alertarTareasCriticas(criticas); }
    });
  }
  if (SPI < 0.9) {
    recomendaciones.push({
      titulo: '⏱️ Review schedule',
      desc: 'SPI=' + SPI.toFixed(2) + ' indicates delay. Adjust dates or resources.',
      color: '#f59e0b',
      accion: function() { revisarCronograma(); }
    });
  }
  if (CPI < 0.9) {
    recomendaciones.push({
      titulo: '💰 Control overrun',
      desc: 'CPI=' + CPI.toFixed(2) + ' indicates spending more than planned.',
      color: '#f59e0b',
      accion: function() { controlarSobrecosto(); }
    });
  }
  if (sobrecargados.length > 0) {
    recomendaciones.push({
      titulo: '⚖️ Reassign resources',
      desc: sobrecargados.length + ' resource(s) with excessive load.',
      color: '#8b5cf6',
      accion: function() { reasignarTareas(sobrecargados); window.renderControl(container); }
    });
  }
  if (enProgreso > total * 0.6 && pendientes > 0) {
    recomendaciones.push({
      titulo: '🔄 Limit work in progress',
      desc: 'Too many tasks in progress reduce efficiency.',
      color: '#3b82f6',
      accion: function() { limitarWIP(); window.renderControl(container); }
    });
  }
  if (recomendaciones.length === 0) {
    recomendaciones.push({
      titulo: '✅ Project on track',
      desc: 'All metrics within acceptable parameters.',
      color: '#10b981',
      accion: function() { alert('✅ All under control. Continue planned execution.'); }
    });
  }

  let html = '';
  html += '<div style="background:linear-gradient(135deg,#1e293b,#0f172a); padding:20px; border-radius:12px; margin-bottom:20px; border:1px solid #3b82f6;">';
  html += '<h2 style="color:#ffffff; margin:0 0 10px 0; font-size:20px;">' + window.translations.controlTitle + '</h2>';
  html += '<p style="color:#94a3b8; margin:0; font-size:13px;">' + proyecto.name + ' • ' + window.translations.controlUpdated + ': ' + new Date().toLocaleTimeString('en-US') + '</p>';
  html += '</div>';

  html += '<div style="display:grid; grid-template-columns:repeat(4,1fr); gap:15px; margin-bottom:25px;">';
  html += '<div style="background:rgba(59,130,246,0.15); padding:20px; border-radius:12px; border-left:4px solid #3b82f6;">';
  html += '<div style="font-size:28px; font-weight:bold; color:#60a5fa;">' + total + '</div>';
  html += '<div style="font-size:12px; color:#94a3b8; margin-top:5px;">' + window.translations.controlTotalTasks + '</div>';
  html += '<div style="font-size:11px; color:#64748b; margin-top:8px;">📊 Progress: ' + porcentajeAvance + '%</div>';
  html += '</div>';
  html += '<div style="background:rgba(16,185,129,0.15); padding:20px; border-radius:12px; border-left:4px solid #10b981;">';
  html += '<div style="font-size:28px; font-weight:bold; color:#34d399;">' + completadas + '</div>';
  html += '<div style="font-size:12px; color:#94a3b8; margin-top:5px;">✅ ' + window.translations.controlCompleted + '</div>';
  html += '<div style="font-size:11px; color:#64748b; margin-top:8px;">📈 ' + Math.round(completadas/total*100) + '% of total</div>';
  html += '</div>';
  html += '<div style="background:rgba(245,158,11,0.15); padding:20px; border-radius:12px; border-left:4px solid #f59e0b;">';
  html += '<div style="font-size:28px; font-weight:bold; color:#fbbf24;">' + atrasadas + '</div>';
  html += '<div style="font-size:12px; color:#94a3b8; margin-top:5px;">🔴 ' + window.translations.controlOverdue + '</div>';
  html += '<div style="font-size:11px; color:#64748b; margin-top:8px;">⚠️ Require attention</div>';
  html += '</div>';
  html += '<div style="background:rgba(239,68,68,0.15); padding:20px; border-radius:12px; border-left:4px solid #ef4444;">';
  html += '<div style="font-size:28px; font-weight:bold; color:#f87171;">' + criticas + '</div>';
  html += '<div style="font-size:12px; color:#94a3b8; margin-top:5px;">🔥 ' + window.translations.controlCritical + '</div>';
  html += '<div style="font-size:11px; color:#64748b; margin-top:8px;">🎯 High priority</div>';
  html += '</div>';
  html += '</div>';

  html += '<div style="background:rgba(0,0,0,0.2); padding:20px; border-radius:12px; margin-bottom:25px;">';
  html += '<h3 style="color:#94a3b8; margin:0 0 15px 0; font-size:15px; border-bottom:1px solid #3b82f6; padding-bottom:10px;">' + window.translations.controlEVM + '</h3>';
  html += '<div style="display:grid; grid-template-columns:repeat(4,1fr); gap:15px;">';
  html += '<div style="text-align:center; padding:15px; background:rgba(0,0,0,0.2); border-radius:8px;">';
  html += '<div style="font-size:24px; font-weight:bold; color:' + (SPI>=1?'#34d399':'#f87171') + ';">' + SPI.toFixed(2) + '</div>';
  html += '<div style="font-size:11px; color:#94a3b8;">' + window.translations.controlSPI + '</div>';
  html += '<div style="font-size:10px; color:#64748b; margin-top:5px;">' + (SPI>=1?'✅ On time':'🔴 Delayed') + '</div>';
  html += '</div>';
  html += '<div style="text-align:center; padding:15px; background:rgba(0,0,0,0.2); border-radius:8px;">';
  html += '<div style="font-size:24px; font-weight:bold; color:' + (CPI>=1?'#34d399':'#f87171') + ';">' + CPI.toFixed(2) + '</div>';
  html += '<div style="font-size:11px; color:#94a3b8;">' + window.translations.controlCPI + '</div>';
  html += '<div style="font-size:10px; color:#64748b; margin-top:5px;">' + (CPI>=1?'✅ Efficient':'🔴 Overrun') + '</div>';
  html += '</div>';
  html += '<div style="text-align:center; padding:15px; background:rgba(0,0,0,0.2); border-radius:8px;">';
  html += '<div style="font-size:24px; font-weight:bold; color:#60a5fa;">' + horasEst + 'h</div>';
  html += '<div style="font-size:11px; color:#94a3b8;">' + window.translations.controlEstimated + '</div>';
  html += '<div style="font-size:10px; color:#64748b; margin-top:5px;">Budget base</div>';
  html += '</div>';
  html += '<div style="text-align:center; padding:15px; background:rgba(0,0,0,0.2); border-radius:8px;">';
  html += '<div style="font-size:24px; font-weight:bold; color:' + (eficiencia>=90?'#34d399':'#fbbf24') + ';">' + eficiencia + '%</div>';
  html += '<div style="font-size:11px; color:#94a3b8;">' + window.translations.controlEfficiency + '</div>';
  html += '<div style="font-size:10px; color:#64748b; margin-top:5px;">Actual vs plan</div>';
  html += '</div>';
  html += '</div>';
  html += '</div>';

  if (atrasadas > 0 || criticas > 0) {
    html += '<div style="background:rgba(239,68,68,0.15); padding:20px; border-radius:12px; margin-bottom:25px; border:1px solid #ef4444;">';
    html += '<h3 style="color:#f87171; margin:0 0 15px 0; font-size:15px;">' + window.translations.controlAlerts + '</h3>';
    html += '<div style="display:flex; flex-wrap:wrap; gap:10px;">';
    if (atrasadas > 0) html += '<span style="background:#ef4444; color:white; padding:6px 12px; border-radius:20px; font-size:12px; font-weight:bold;">' + atrasadas + ' overdue tasks</span>';
    if (criticas > 0) html += '<span style="background:#dc2626; color:white; padding:6px 12px; border-radius:20px; font-size:12px; font-weight:bold;">' + criticas + ' critical tasks</span>';
    if (SPI < 0.9) html += '<span style="background:#f97316; color:white; padding:6px 12px; border-radius:20px; font-size:12px; font-weight:bold;">Schedule delay</span>';
    if (CPI < 0.9) html += '<span style="background:#f97316; color:white; padding:6px 12px; border-radius:20px; font-size:12px; font-weight:bold;">Cost overrun</span>';
    html += '</div></div>';
  }

  html += '<div style="background:rgba(0,0,0,0.2); padding:20px; border-radius:12px; margin-bottom:25px;">';
  html += '<h3 style="color:#94a3b8; margin:0 0 15px 0; font-size:15px; border-bottom:1px solid #3b82f6; padding-bottom:10px;">' + window.translations.controlRecommendations + '</h3>';
  recomendaciones.forEach(function(rec, idx) {
    html += '<div style="background:rgba(16,185,129,0.1); padding:15px; border-radius:10px; margin-bottom:12px; border-left:4px solid ' + rec.color + ';">';
    html += '<div style="display:flex; justify-content:space-between; align-items:start; gap:15px;">';
    html += '<div style="flex:1;">';
    html += '<div style="font-weight:600; color:#e2e8f0; margin-bottom:8px;">' + rec.titulo + '</div>';
    html += '<p style="color:#94a3b8; font-size:13px; margin:0 0 10px 0; line-height:1.5;">' + rec.desc + '</p>';
    html += '</div>';
    html += '<button data-idx="' + idx + '" class="btn-aplicar-rec" style="background:#10b981; border:none; padding:8px 16px; border-radius:6px; color:white; cursor:pointer; font-size:12px; font-weight:bold;">' + window.translations.controlApply + '</button>';
    html += '</div></div>';
  });
  html += '</div>';

  html += '<div style="background:rgba(0,0,0,0.2); padding:20px; border-radius:12px; margin-bottom:25px;">';
  html += '<h3 style="color:#94a3b8; margin:0 0 15px 0; font-size:15px; border-bottom:1px solid #3b82f6; padding-bottom:10px;">' + window.translations.controlResourceLoad + '</h3>';
  html += '<div style="display:grid; grid-template-columns:repeat(2,1fr); gap:12px;">';
  Object.entries(recursos).forEach(function(entry) {
    const nombre = entry[0];
    const datos = entry[1];
    const carga = Math.round((datos.enProgreso / Math.max(1, Object.keys(recursos).length)) * 100);
    const colorCarga = carga > 66 ? '#ef4444' : (carga > 33 ? '#f59e0b' : '#22c55e');
    html += '<div style="background:rgba(0,0,0,0.2); padding:15px; border-radius:10px;">';
    html += '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">';
    html += '<span style="font-weight:600; color:#e2e8f0; font-size:13px;">' + nombre + '</span>';
    html += '<span style="background:' + colorCarga + '; color:white; padding:3px 10px; border-radius:12px; font-size:10px; font-weight:bold;">' + datos.enProgreso + ' active</span>';
    html += '</div>';
    html += '<div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:11px; color:#94a3b8; margin-bottom:10px;">';
    html += '<span>✅ ' + datos.completadas + ' completed</span>';
    html += '<span>⏳ ' + (datos.total - datos.completadas - datos.enProgreso) + ' pending</span>';
    html += '</div>';
    html += '<div style="background:#334155; height:6px; border-radius:3px; overflow:hidden;">';
    html += '<div style="background:linear-gradient(90deg,#10b981,#3b82f6); height:100%; width:' + Math.min(100, carga) + '%; border-radius:3px;"></div>';
    html += '</div>';
    html += '<div style="font-size:10px; color:#64748b; margin-top:5px; text-align:right;">Load: ' + carga + '%</div>';
    html += '</div>';
  });
  html += '</div></div>';

  html += '<div style="background:rgba(0,0,0,0.2); padding:20px; border-radius:12px; margin-bottom:25px;">';
  html += '<h3 style="color:#94a3b8; margin:0 0 15px 0; font-size:15px; border-bottom:1px solid #3b82f6; padding-bottom:10px;">' + window.translations.controlQuickActions + '</h3>';
  html += '<div style="display:grid; grid-template-columns:repeat(2,1fr); gap:12px;">';
  html += '<button data-action="exportar" class="btn-accion-rapida" style="background:rgba(59,130,246,0.2); border:1px solid #3b82f6; padding:12px; border-radius:8px; color:#60a5fa; cursor:pointer; font-size:13px;">' + window.translations.controlExportReport + '</button>';
  html += '<button data-action="alertar" class="btn-accion-rapida" style="background:rgba(245,158,11,0.2); border:1px solid #f59e0b; padding:12px; border-radius:8px; color:#fbbf24; cursor:pointer; font-size:13px;">' + window.translations.controlAlertTeam + '</button>';
  html += '<button data-action="cronograma" class="btn-accion-rapida" style="background:rgba(16,185,129,0.2); border:1px solid #10b981; padding:12px; border-radius:8px; color:#34d399; cursor:pointer; font-size:13px;">' + window.translations.controlReviewSchedule + '</button>';
  html += '<button data-action="optimizar" class="btn-accion-rapida" style="background:rgba(139,92,246,0.2); border:1px solid #8b5cf6; padding:12px; border-radius:8px; color:#a78bfa; cursor:pointer; font-size:13px;">' + window.translations.controlOptimizeResources + '</button>';
  html += '</div></div>';

  container.innerHTML = html;

  // Event listeners
  document.querySelectorAll('.btn-aplicar-rec').forEach(function(btn) {
    btn.onclick = function() {
      const idx = parseInt(btn.dataset.idx);
      if (recomendaciones[idx] && recomendaciones[idx].accion) {
        recomendaciones[idx].accion();
      }
    };
  });

  document.querySelectorAll('.btn-accion-rapida').forEach(function(btn) {
    btn.onclick = function() {
      const action = btn.dataset.action;
      if (action === 'exportar') exportarReporteControl();
      else if (action === 'alertar') generarAlertaEquipo();
      else if (action === 'cronograma') revisarCronograma();
      else if (action === 'optimizar') optimizarRecursos();
    };
  });
};

console.log('✅ renderControl traducido al inglés (sin alias). Abre el modal y ve a la pestaña Control para probar.');

// ============================================================
// AMPLIAR TRADUCCIONES PARA LA PESTAÑA REUNIONES
// ============================================================
window.translations = Object.assign(window.translations || {}, {
  // Títulos y etiquetas de Reuniones
  meetingsTitle: '🗓️ Executive Meeting Management',
  meetingsProject: 'Project',
  meetingsTotal: 'Total Meetings',
  meetingsUpcoming: 'Upcoming',
  meetingsPendingAgreements: 'Pending Agreements',
  meetingsLastMeeting: 'Last Meeting',
  meetingsNoMeetings: '📭 No meetings registered yet. Schedule the first one using the button above.',
  meetingsNewMeeting: '+ Schedule Meeting',
  meetingsTranscriptor: '🎙️ AI Transcriber',
  meetingsExport: '📄 Export History',
  meetingsAgenda: 'Agenda',
  meetingsParticipants: 'Participants',
  meetingsAgreements: 'Agreements',
  meetingsStatus: 'Status',
  meetingsActions: 'Actions',
  meetingsViewAgenda: '📄 View Minutes',
  meetingsEdit: '✏️ Edit',
  meetingsDelete: '🗑️ Delete',
  meetingsCompleted: 'Completed',
  meetingsPending: 'Pending',
  meetingsType: 'Meeting Type',
  meetingsDate: 'Date & Time',
  meetingsResponsible: 'Responsible',
  meetingsFormat: 'Format',
  meetingsFrequency: 'Frequency',
  meetingsContent: 'Content / Information Type',
  meetingsInfluence: 'Influence Level',
  meetingsInterest: 'Interest Level',
  meetingsChannel: 'Channel',
  meetingsSave: '💾 Save & Schedule',
  meetingsCancel: '❌ Cancel',
  meetingsConfirmDelete: 'Delete this meeting?',
  meetingsConfirmDeleteAll: 'Delete all meetings?',
  meetingsDeleted: '✅ Meeting deleted',
  meetingsUpdated: '✅ Meeting updated successfully',
  meetingsCreated: '✅ Meeting scheduled successfully',
  meetingsExportSuccess: '✅ Meeting history copied to clipboard',
  meetingsNoMeetingsToExport: '📭 No meetings to export',
  meetingsStakeholder: 'Stakeholder',
  meetingsSelectTemplate: 'Select agenda template...',
  meetingsTemplateFollowUp: '🔄 Project Follow-up',
  meetingsTemplateKickoff: '🚀 Kick-off',
  meetingsTemplateReview: '📊 Performance Review',
  meetingsTemplateClosure: '✅ Phase Closure',
  meetingsTemplateCustom: '✏️ Custom',
  meetingsPlaceholderTitle: 'e.g., Sprint #3 Review',
  meetingsPlaceholderAgenda: '1. Item 1\n2. Item 2\n3. Item 3',
  meetingsPlaceholderParticipants: 'e.g., PM, Sponsor, Team (comma separated)',
  meetingsPlaceholderStakeholder: 'e.g., IT Director, Client, Executive Committee',
  meetingsPlaceholderContent: 'e.g., Weekly progress, Risk alerts, Strategic decisions',
  meetingsMinuteTitle: 'Meeting Minutes',
  meetingsMinuteSubtitle: 'MEETING MINUTES - EXECUTIVE DOCUMENT',
  meetingsAgendaTitle: '📋 Agenda',
  meetingsAgreementsTitle: '✅ Agreements & Actions',
  meetingsNextSteps: '🎯 Next Steps',
  meetingsFooter: 'CONFIDENTIAL - For internal project use only',
  meetingsGenerated: 'Generated automatically by PM Virtual Executive',
});


// ============================================================
// RENDER REUNIONES - VERSIÓN INGLESA
// ============================================================

// Funciones auxiliares (traducidas)
function convocarReunionEjecutiva(callback) {
  const proyecto = obtenerProyectoActual();
  const modal = document.createElement('div');
  modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:100002; display:flex; align-items:center; justify-content:center;';

  const content = document.createElement('div');
  content.style.cssText = 'background:linear-gradient(135deg,#1e293b,#0f172a); padding:30px; border-radius:20px; width:700px; max-width:95vw; max-height:90vh; color:white; border:1px solid #3b82f6; overflow-y:auto;';

  content.innerHTML = `
    <h2 style="color:#ffffff; margin:0 0 20px 0; text-align:center; font-size:22px;">${window.translations.meetingsNewMeeting}</h2>
    <p style="color:#94a3b8; margin:0 0 25px 0; text-align:center; font-size:13px;">${window.translations.meetingsProject}: <strong>${proyecto.name}</strong></p>

    <div style="background:rgba(0,0,0,0.3); padding:20px; border-radius:12px; margin-bottom:20px;">
      <h3 style="color:#3b82f6; margin:0 0 15px 0; font-size:16px; border-bottom:1px solid #3b82f6; padding-bottom:10px;">📋 ${window.translations.meetingsAgenda}</h3>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
        <div>
          <label style="display:block; margin-bottom:5px; color:#94a3b8; font-size:12px;">${window.translations.meetingsTitle}:</label>
          <input type="text" id="reunionTitulo" placeholder="${window.translations.meetingsPlaceholderTitle}" style="width:100%; padding:10px; border-radius:8px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px;">
        </div>
        <div>
          <label style="display:block; margin-bottom:5px; color:#94a3b8; font-size:12px;">${window.translations.meetingsDate}:</label>
          <input type="datetime-local" id="reunionFecha" style="width:100%; padding:10px; border-radius:8px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px;">
        </div>
        <div style="grid-column: span 2;">
          <label style="display:block; margin-bottom:5px; color:#94a3b8; font-size:12px;">${window.translations.meetingsType}:</label>
          <select id="reunionTipo" style="width:100%; padding:10px; border-radius:8px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px;">
            <option value="">${window.translations.meetingsSelectTemplate}</option>
            <option value="seguimiento">${window.translations.meetingsTemplateFollowUp}</option>
            <option value="kickoff">${window.translations.meetingsTemplateKickoff}</option>
            <option value="revision">${window.translations.meetingsTemplateReview}</option>
            <option value="cierre">${window.translations.meetingsTemplateClosure}</option>
            <option value="personalizada">${window.translations.meetingsTemplateCustom}</option>
          </select>
        </div>
        <div style="grid-column: span 2;">
          <label style="display:block; margin-bottom:5px; color:#94a3b8; font-size:12px;">${window.translations.meetingsAgenda}:</label>
          <textarea id="reunionAgenda" rows="4" placeholder="${window.translations.meetingsPlaceholderAgenda}" style="width:100%; padding:10px; border-radius:8px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px; resize:vertical;"></textarea>
        </div>
        <div style="grid-column: span 2;">
          <label style="display:block; margin-bottom:5px; color:#94a3b8; font-size:12px;">${window.translations.meetingsParticipants}:</label>
          <input type="text" id="reunionParticipantes" placeholder="${window.translations.meetingsPlaceholderParticipants}" style="width:100%; padding:10px; border-radius:8px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px;">
        </div>
      </div>
    </div>

    <div style="display:flex; gap:15px; justify-content:center;">
      <button id="guardarReunionBtn" style="background:#10b981; border:none; padding:12px 30px; border-radius:8px; color:white; cursor:pointer; font-weight:bold; font-size:14px;">${window.translations.meetingsSave}</button>
      <button id="cancelarReunionBtn" style="background:#ef4444; border:none; padding:12px 30px; border-radius:8px; color:white; cursor:pointer; font-weight:bold; font-size:14px;">${window.translations.meetingsCancel}</button>
    </div>
  `;

  modal.appendChild(content);
  document.body.appendChild(modal);

  // Cargar agenda según plantilla
  const plantillasAgenda = {
    seguimiento: ['1. Review progress', '2. Blockers and risks', '3. Next milestones', '4. Agreements and actions'],
    kickoff: ['1. Team introduction', '2. Objectives and scope', '3. Timeline and responsibilities', '4. Communication and follow-up'],
    revision: ['1. Performance metrics', '2. Deviation analysis', '3. Corrective plan', '4. Commitments'],
    cierre: ['1. Results vs objectives', '2. Lessons learned', '3. Formal delivery', '4. Next steps']
  };
  document.getElementById('reunionTipo').onchange = function() {
    const tipo = this.value;
    const textarea = document.getElementById('reunionAgenda');
    if (plantillasAgenda[tipo]) {
      textarea.value = plantillasAgenda[tipo].join('\n');
    } else if (tipo === 'personalizada') {
      textarea.value = '';
      textarea.placeholder = window.translations.meetingsPlaceholderAgenda;
    }
  };

  // Guardar reunión
  document.getElementById('guardarReunionBtn').onclick = function() {
    const titulo = document.getElementById('reunionTitulo').value.trim();
    const fecha = document.getElementById('reunionFecha').value;
    const agenda = document.getElementById('reunionAgenda').value.trim();
    const participantes = document.getElementById('reunionParticipantes').value.trim();

    if (!titulo || !fecha) { alert('⚠️ Title and date are required'); return; }

    const nuevaReunion = {
      id: Date.now(),
      proyectoId: proyecto.name,
      titulo: titulo,
      fecha: fecha,
      fechaLocal: new Date(fecha).toLocaleString('en-US'),
      tipo: document.getElementById('reunionTipo').value,
      agenda: agenda,
      participantes: participantes.split(',').map(function(p) { return p.trim(); }).filter(Boolean),
      acuerdos: [],
      creada: new Date().toISOString()
    };

    let meetings = JSON.parse(localStorage.getItem('pmMeetings') || '[]');
    meetings.push(nuevaReunion);
    localStorage.setItem('pmMeetings', JSON.stringify(meetings));

    modal.remove();
    alert(window.translations.meetingsCreated + '\n\n📅 ' + nuevaReunion.fechaLocal + '\n👥 ' + (participantes || window.translations.meetingsParticipants));
    if (callback) callback(container);
  };

  document.getElementById('cancelarReunionBtn').onclick = function() { modal.remove(); };

  // Set default date: tomorrow 10 AM
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 1);
  defaultDate.setHours(10, 0, 0, 0);
  document.getElementById('reunionFecha').value = defaultDate.toISOString().slice(0, 16);
}

function generarActaReunionEjecutiva(reunion) {
  const proyecto = obtenerProyectoActual();
  const acuerdosCompletados = reunion.acuerdos?.filter(function(a) { return a.completado; }).length || 0;
  const acuerdosPendientes = reunion.acuerdos?.filter(function(a) { return !a.completado; }).length || 0;

  const acuerdosHTML = (reunion.acuerdos || []).map(function(a) {
    const statusColor = a.completado ? '#10b981' : '#f59e0b';
    const statusIcon = a.completado ? '✅' : '⏳';
    return '<tr style="background:#f8fafc;"><td style="padding:12px; border:1px solid #e2e8f0; color:#1e293b;">' + statusIcon + ' ' + a.texto + '</td><td style="padding:12px; border:1px solid #e2e8f0; text-align:center; color:#64748b;">' + (a.responsable || '-') + '</td><td style="padding:12px; border:1px solid #e2e8f0; text-align:center; color:#64748b;">' + (a.fecha || '-') + '</td><td style="padding:12px; border:1px solid #e2e8f0; text-align:center;"><span style="background:' + statusColor + '; color:white; padding:4px 12px; border-radius:12px; font-size:11px; font-weight:bold;">' + (a.completado ? window.translations.meetingsCompleted : window.translations.meetingsPending) + '</span></td></tr>';
  }).join('');

  const contenido = `
    <!-- Header Ejecutivo -->
    <div style="background:linear-gradient(135deg,#1e3a8a,#3b82f6); color:white; padding:30px; border-radius:16px 16px 0 0; text-align:center;">
      <h1 style="margin:0; font-size:26px; font-weight:bold;">📋 ${window.translations.meetingsMinuteTitle}</h1>
      <p style="margin:10px 0 0 0; opacity:0.9; font-size:14px;">${window.translations.meetingsMinuteSubtitle}</p>
    </div>

    <!-- Info Principal -->
    <div style="background:#f8fafc; padding:25px; border-bottom:3px solid #3b82f6;">
      <table style="width:100%; border:none; font-size:13px;">
        <tr>
          <td style="border:none; padding:8px;"><strong>🏢 ${window.translations.meetingsProject}:</strong> ${proyecto.name}</td>
          <td style="border:none; padding:8px;"><strong>📅 ${window.translations.meetingsDate}:</strong> ${reunion.fechaLocal}</td>
          <td style="border:none; padding:8px;"><strong>📝 ${window.translations.meetingsType}:</strong> ${reunion.tipo || 'Custom'}</td>
        </tr>
        <tr>
          <td style="border:none; padding:8px;" colspan="3"><strong>👥 ${window.translations.meetingsParticipants}:</strong> ${reunion.participantes?.join(', ') || window.translations.meetingsParticipants}</td>
        </tr>
      </table>
    </div>

    <div style="padding:30px;">

      <!-- Agenda -->
      <h2 style="color:#1e3a8a; border-left:5px solid #3b82f6; padding-left:15px; margin:0 0 20px 0; font-size:18px;">${window.translations.meetingsAgendaTitle}</h2>
      <ol style="line-height:2; color:#374151; padding-left:20px; margin-bottom:30px;">
        ${(reunion.agenda || 'No agenda registered').split('\n').map(function(item) { return '<li>' + item + '</li>'; }).join('')}
      </ol>

      <!-- Resumen de Acuerdos -->
      <h2 style="color:#1e3a8a; border-left:5px solid #3b82f6; padding-left:15px; margin:40px 0 20px 0; font-size:18px;">${window.translations.meetingsAgreementsTitle}</h2>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:20px;">
        <div style="background:#dcfce7; padding:15px; border-radius:10px; text-align:center;">
          <div style="font-size:24px; font-weight:bold; color:#166534;">${acuerdosCompletados}</div>
          <div style="font-size:12px; color:#64748b;">✅ ${window.translations.meetingsCompleted}</div>
        </div>
        <div style="background:#fef3c7; padding:15px; border-radius:10px; text-align:center;">
          <div style="font-size:24px; font-weight:bold; color:#92400e;">${acuerdosPendientes}</div>
          <div style="font-size:12px; color:#64748b;">⏳ ${window.translations.meetingsPending}</div>
        </div>
      </div>

      <table style="width:100%; border-collapse:collapse; margin-bottom:30px;">
        <thead>
          <tr style="background:#dbeafe;">
            <th style="padding:12px; text-align:left; border:1px solid #bfdbfe; color:#1e40af; font-weight:600;">${window.translations.meetingsAgreements}</th>
            <th style="padding:12px; text-align:center; border:1px solid #bfdbfe; color:#1e40af; font-weight:600;">${window.translations.meetingsResponsible}</th>
            <th style="padding:12px; text-align:center; border:1px solid #bfdbfe; color:#1e40af; font-weight:600;">${window.translations.meetingsDate}</th>
            <th style="padding:12px; text-align:center; border:1px solid #bfdbfe; color:#1e40af; font-weight:600;">${window.translations.meetingsStatus}</th>
          </tr>
        </thead>
        <tbody>
          ${acuerdosHTML || '<tr><td colspan="4" style="padding:15px; text-align:center; color:#64748b;">No agreements registered</td></tr>'}
        </tbody>
      </table>

      <!-- Próximos Pasos -->
      <h2 style="color:#1e3a8a; border-left:5px solid #3b82f6; padding-left:15px; margin:40px 0 20px 0; font-size:18px;">${window.translations.meetingsNextSteps}</h2>
      <ul style="line-height:2; color:#374151;">
        <li>Follow up on pending agreements before ${new Date(Date.now() + 7*24*3600*1000).toLocaleDateString('en-US')}</li>
        <li>Update status in the management system</li>
        <li>Communicate progress to key stakeholders</li>
      </ul>

      <!-- Footer -->
      <div style="margin-top:50px; padding:25px; background:#f8fafc; border-radius:12px; text-align:center; border-top:3px solid #3b82f6;">
        <p style="color:#64748b; font-size:12px; margin:0;">
          <strong>${window.translations.meetingsFooter}</strong><br>
          <em>${window.translations.meetingsGenerated} • ${new Date().toLocaleDateString('en-US')}</em>
        </p>
      </div>

    </div>
  `;

  const html = generarHTML(window.translations.meetingsMinuteTitle + ': ' + reunion.titulo, contenido);
  abrirVentanaDocumento(html, 'Minutes_' + reunion.titulo.replace(/\s+/g, '_'));
}

function editarReunion(reunion, callback) {
  const modal = document.createElement('div');
  modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:100002; display:flex; align-items:center; justify-content:center;';

  const content = document.createElement('div');
  content.style.cssText = 'background:linear-gradient(135deg,#1e293b,#0f172a); padding:30px; border-radius:20px; width:700px; max-width:95vw; max-height:90vh; color:white; border:1px solid #3b82f6; overflow-y:auto;';

  content.innerHTML = `
    <h2 style="color:#ffffff; margin:0 0 20px 0; text-align:center; font-size:22px;">✏️ ${window.translations.meetingsEdit}</h2>
    <div style="background:rgba(0,0,0,0.3); padding:20px; border-radius:12px; margin-bottom:20px;">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
        <div>
          <label style="display:block; margin-bottom:5px; color:#94a3b8; font-size:12px;">${window.translations.meetingsTitle}:</label>
          <input type="text" id="editTitulo" value="${reunion.titulo}" style="width:100%; padding:10px; border-radius:8px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px;">
        </div>
        <div>
          <label style="display:block; margin-bottom:5px; color:#94a3b8; font-size:12px;">${window.translations.meetingsDate}:</label>
          <input type="datetime-local" id="editFecha" value="${new Date(reunion.fecha).toISOString().slice(0,16)}" style="width:100%; padding:10px; border-radius:8px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px;">
        </div>
        <div style="grid-column: span 2;">
          <label style="display:block; margin-bottom:5px; color:#94a3b8; font-size:12px;">${window.translations.meetingsAgenda}:</label>
          <textarea id="editAgenda" rows="3" style="width:100%; padding:10px; border-radius:8px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px;">${reunion.agenda || ''}</textarea>
        </div>
        <div style="grid-column: span 2;">
          <label style="display:block; margin-bottom:5px; color:#94a3b8; font-size:12px;">${window.translations.meetingsParticipants}:</label>
          <input type="text" id="editParticipantes" value="${reunion.participantes?.join(', ') || ''}" style="width:100%; padding:10px; border-radius:8px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px;">
        </div>
      </div>
    </div>
    <div style="display:flex; gap:15px; justify-content:center;">
      <button id="actualizarReunionBtn" style="background:#3b82f6; border:none; padding:12px 30px; border-radius:8px; color:white; cursor:pointer; font-weight:bold;">${window.translations.meetingsSave}</button>
      <button id="cancelarEdicionBtn" style="background:#ef4444; border:none; padding:12px 30px; border-radius:8px; color:white; cursor:pointer; font-weight:bold;">${window.translations.meetingsCancel}</button>
    </div>
  `;

  modal.appendChild(content);
  document.body.appendChild(modal);

  document.getElementById('actualizarReunionBtn').onclick = function() {
    reunion.titulo = document.getElementById('editTitulo').value.trim();
    reunion.fecha = document.getElementById('editFecha').value;
    reunion.fechaLocal = new Date(reunion.fecha).toLocaleString('en-US');
    reunion.agenda = document.getElementById('editAgenda').value.trim();
    reunion.participantes = document.getElementById('editParticipantes').value.split(',').map(function(p) { return p.trim(); }).filter(Boolean);

    let meetings = JSON.parse(localStorage.getItem('pmMeetings') || '[]');
    const idx = meetings.findIndex(function(m) { return m.id === reunion.id; });
    if (idx !== -1) { meetings[idx] = reunion; localStorage.setItem('pmMeetings', JSON.stringify(meetings)); }

    modal.remove();
    alert(window.translations.meetingsUpdated);
    if (callback) callback(container);
  };

  document.getElementById('cancelarEdicionBtn').onclick = function() { modal.remove(); };
}

function exportarHistorialReuniones() {
  const proyecto = obtenerProyectoActual();
  const meetings = JSON.parse(localStorage.getItem('pmMeetings') || '[]').filter(function(m) { return m.proyectoId === proyecto.name; });

  if (meetings.length === 0) { alert(window.translations.meetingsNoMeetingsToExport); return; }

  const reporte = '📊 MEETING HISTORY - ' + proyecto.name + '\n' +
    '━━━━━━━━━━━━━━━━━━━━━━\nDate: ' + new Date().toLocaleDateString('en-US') + '\n\n' +
    meetings.map(function(m) {
      return '🗓️ ' + m.titulo + '\n   📅 ' + m.fechaLocal + '\n   👥 ' + (m.participantes?.join(', ') || 'N/A') + '\n   ✅ Agreements: ' + (m.acuerdos?.filter(function(a){return a.completado;}).length || 0) + '/' + (m.acuerdos?.length || 0) + '\n';
    }).join('\n');

  navigator.clipboard?.writeText(reporte).then(function() {
    alert(window.translations.meetingsExportSuccess + '\n\n📄 Ready to paste into email or document.');
  }).catch(function() {
    alert('📋 Report:\n\n' + reporte);
  });
}

// ============================================================
// FUNCIÓN PRINCIPAL renderReuniones (TRADUCIDA)
// ============================================================
window.renderReuniones = function(container) {
  const proyecto = obtenerProyectoActual();
  if (!proyecto) {
    container.innerHTML = '<p style="color:#94a3b8; text-align:center; padding:40px;">⚠️ ' + window.translations.controlNoProject + '</p>';
    return;
  }

  let meetings = JSON.parse(localStorage.getItem('pmMeetings') || '[]').filter(function(m) { return m.proyectoId === proyecto.name; });

  const totalReuniones = meetings.length;
  const proximas = meetings.filter(function(m) { return new Date(m.fecha) > new Date(); }).length;
  const pendientes = meetings.reduce(function(acc, m) { return acc + (m.acuerdos?.filter(function(a) { return !a.completado; }).length || 0); }, 0);
  const ultimaReunion = meetings.length > 0 ? meetings[meetings.length-1] : null;

  let html = '';

  // Header ejecutivo
  html += '<div style="background:linear-gradient(135deg,#1e293b,#0f172a); padding:20px; border-radius:12px; margin-bottom:20px; border:1px solid #3b82f6;">';
  html += '<h2 style="color:#ffffff; margin:0 0 10px 0; font-size:20px; display:flex; align-items:center; gap:10px;">';
  html += '<span>🗓️</span> ' + window.translations.meetingsTitle;
  html += '</h2>';
  html += '<p style="color:#94a3b8; margin:0; font-size:13px;">' + proyecto.name + ' • ' + new Date().toLocaleDateString('en-US') + '</p>';
  html += '</div>';

  // Dashboard de métricas
  html += '<div style="display:grid; grid-template-columns:repeat(4,1fr); gap:15px; margin-bottom:25px;">';
  html += '<div style="background:rgba(59,130,246,0.15); padding:20px; border-radius:12px; border-left:4px solid #3b82f6;">';
  html += '<div style="font-size:28px; font-weight:bold; color:#60a5fa;">' + totalReuniones + '</div>';
  html += '<div style="font-size:12px; color:#94a3b8; margin-top:5px;">' + window.translations.meetingsTotal + '</div>';
  html += '</div>';
  html += '<div style="background:rgba(16,185,129,0.15); padding:20px; border-radius:12px; border-left:4px solid #10b981;">';
  html += '<div style="font-size:28px; font-weight:bold; color:#34d399;">' + proximas + '</div>';
  html += '<div style="font-size:12px; color:#94a3b8; margin-top:5px;">' + window.translations.meetingsUpcoming + '</div>';
  html += '</div>';
  html += '<div style="background:rgba(245,158,11,0.15); padding:20px; border-radius:12px; border-left:4px solid #f59e0b;">';
  html += '<div style="font-size:28px; font-weight:bold; color:#fbbf24;">' + pendientes + '</div>';
  html += '<div style="font-size:12px; color:#94a3b8; margin-top:5px;">' + window.translations.meetingsPendingAgreements + '</div>';
  html += '</div>';
  html += '<div style="background:rgba(139,92,246,0.15); padding:20px; border-radius:12px; border-left:4px solid #8b5cf6;">';
  html += '<div style="font-size:28px; font-weight:bold; color:#a78bfa;">' + (ultimaReunion ? new Date(ultimaReunion.fecha).toLocaleDateString('en-US') : 'N/A') + '</div>';
  html += '<div style="font-size:12px; color:#94a3b8; margin-top:5px;">' + window.translations.meetingsLastMeeting + '</div>';
  html += '</div>';
  html += '</div>';

  // Botones de acción rápida
  html += '<div style="display:flex; gap:12px; margin-bottom:25px; flex-wrap:wrap;">';
  html += '<button id="nuevaReunionBtn" style="background:#3b82f6; border:none; padding:12px 24px; border-radius:8px; color:white; cursor:pointer; font-weight:500; display:flex; align-items:center; gap:8px;">';
  html += '<span>+</span> ' + window.translations.meetingsNewMeeting;
  html += '</button>';
  html += '<button id="transcriptorBtn" style="background:linear-gradient(135deg,#8b5cf6,#7c3aed); border:none; padding:12px 24px; border-radius:8px; color:white; cursor:pointer; font-weight:500; display:flex; align-items:center; gap:8px;">';
  html += '<span>🎙️</span> ' + window.translations.meetingsTranscriptor;
  html += '</button>';
  html += '<button id="exportarReunionesBtn" style="background:rgba(16,185,129,0.2); border:1px solid #10b981; padding:12px 24px; border-radius:8px; color:#34d399; cursor:pointer; font-weight:500; display:flex; align-items:center; gap:8px;">';
  html += '<span>📄</span> ' + window.translations.meetingsExport;
  html += '</button>';
  html += '</div>';

  // Lista de reuniones
  html += '<div style="background:rgba(0,0,0,0.2); padding:20px; border-radius:12px;">';
  html += '<h3 style="color:#94a3b8; margin:0 0 15px 0; font-size:15px; border-bottom:1px solid #3b82f6; padding-bottom:10px;">📋 Meeting History</h3>';
  html += '<div id="listaReuniones">';
  if (meetings.length === 0) {
    html += '<p style="color:#64748b; text-align:center; padding:30px;">' + window.translations.meetingsNoMeetings + '</p>';
  } else {
    meetings.slice().reverse().forEach(function(m) {
      const esProxima = new Date(m.fecha) > new Date();
      const acuerdosPendientes = m.acuerdos?.filter(function(a) { return !a.completado; }).length || 0;
      html += '<div style="background:rgba(0,0,0,0.2); padding:15px; border-radius:10px; margin-bottom:12px; border-left:4px solid ' + (esProxima ? '#3b82f6' : '#10b981') + ';">';
      html += '<div style="display:flex; justify-content:space-between; align-items:start; gap:15px;">';
      html += '<div style="flex:1;">';
      html += '<div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">';
      html += '<span style="font-weight:600; color:#e2e8f0; font-size:14px;">' + m.titulo + '</span>';
      if (esProxima) html += '<span style="background:#3b82f6; color:white; padding:3px 10px; border-radius:12px; font-size:10px; font-weight:bold;">' + window.translations.meetingsUpcoming + '</span>';
      if (acuerdosPendientes > 0) html += '<span style="background:#f59e0b; color:white; padding:3px 10px; border-radius:12px; font-size:10px; font-weight:bold;">' + acuerdosPendientes + ' pending</span>';
      html += '</div>';
      html += '<div style="font-size:12px; color:#94a3b8; margin-bottom:8px;">📅 ' + new Date(m.fecha).toLocaleString('en-US') + '</div>';
      if (m.agenda) {
        html += '<div style="font-size:12px; color:#64748b; margin-bottom:8px;">';
        html += '<strong>' + window.translations.meetingsAgenda + ':</strong> ' + m.agenda.split('\n').slice(0,2).join(' • ') + (m.agenda.split('\n').length > 2 ? '...' : '');
        html += '</div>';
      }
      if (m.acuerdos && m.acuerdos.length > 0) {
        html += '<div style="font-size:11px; color:#64748b;">';
        html += '✅ ' + m.acuerdos.filter(function(a){return a.completado;}).length + ' completed / ';
        html += '⏳ ' + acuerdosPendientes + ' pending';
        html += '</div>';
      }
      html += '</div>';
      html += '<div style="display:flex; flex-direction:column; gap:8px; flex-shrink:0;">';
      html += '<button data-id="' + m.id + '" class="verActaBtn" style="background:#10b981; border:none; padding:8px 16px; border-radius:6px; color:white; cursor:pointer; font-size:12px;">' + window.translations.meetingsViewAgenda + '</button>';
      if (esProxima) {
        html += '<button data-id="' + m.id + '" class="editarReunionBtn" style="background:rgba(59,130,246,0.2); border:1px solid #3b82f6; padding:8px 16px; border-radius:6px; color:#60a5fa; cursor:pointer; font-size:12px;">' + window.translations.meetingsEdit + '</button>';
      }
      html += '</div>';
      html += '</div></div>';
    });
  }
  html += '</div></div>';

  container.innerHTML = html;

  // Event listeners
  document.getElementById('nuevaReunionBtn').onclick = function() { convocarReunionEjecutiva(window.renderReuniones.bind(null, container)); };
  document.getElementById('transcriptorBtn').onclick = function() {
    if (typeof abrirTranscriptorAgent === 'function') { abrirTranscriptorAgent(); }
    else { alert('🎙️ AI Transcriber: Feature in development. Coming soon.'); }
  };
  document.getElementById('exportarReunionesBtn').onclick = function() { exportarHistorialReuniones(); };

  document.querySelectorAll('.verActaBtn').forEach(function(btn) {
    btn.onclick = function() {
      const meeting = meetings.find(function(m) { return m.id == btn.dataset.id; });
      if (meeting) { generarActaReunionEjecutiva(meeting); }
    };
  });

  document.querySelectorAll('.editarReunionBtn').forEach(function(btn) {
    btn.onclick = function() {
      const meeting = meetings.find(function(m) { return m.id == btn.dataset.id; });
      if (meeting) { editarReunion(meeting, window.renderReuniones.bind(null, container)); }
    };
  });
};

console.log('✅ renderReuniones traducido al inglés. Abre el modal y ve a la pestaña Reuniones para probar.');

// ============================================================
// AMPLIAR TRADUCCIONES PARA LA PESTAÑA GANTT
// ============================================================
window.translations = Object.assign(window.translations || {}, {
  // Títulos y etiquetas de Gantt
  ganttTitle: '📈 Executive Gantt Chart',
  ganttSubtitle: 'Programmatic Timeline · Critical Path Analysis · Executive Dashboard',
  ganttNoProject: '⚠️ No project selected',
  ganttNoTasks: '📭 No tasks to display',
  ganttTotalTasks: 'Total Tasks',
  ganttCompleted: 'Completed',
  ganttInProgress: 'In Progress',
  ganttPending: 'Pending',
  ganttOverdue: 'Overdue',
  ganttCritical: 'Critical',
  ganttMilestones: 'Milestones',
  ganttSPI: 'SPI',
  ganttProgress: 'Progress',
  ganttRiskLevel: 'Risk Level',
  ganttExportPDF: '📄 Export as PDF',
  ganttPrint: '🖨️ Print Report',
  ganttTimeline: 'Programmatic Timeline',
  ganttTask: 'TASK',
  ganttEndDate: 'END DATE',
  ganttLegendCompleted: 'Completed',
  ganttLegendInProgress: 'In Progress',
  ganttLegendPending: 'Pending',
  ganttLegendOverdue: 'Overdue / Critical',
  ganttLegendMilestone: 'Milestone',
  ganttLegendToday: 'Today',
  ganttFilterAll: '📌 All statuses',
  ganttFilterCompleted: '✅ Completed',
  ganttFilterInProgress: '🔄 In Progress',
  ganttFilterPending: '⏳ Pending',
  ganttClearFilters: '🗑️ Clear',
  ganttTaskDetail: '📋 TASK DETAIL',
  ganttAssignedTo: 'Assigned to',
  ganttStart: 'Start',
  ganttEnd: 'End',
  ganttStatus: 'Status',
  ganttPriorityHigh: 'High',
  ganttPriorityMedium: 'Medium',
  ganttPriorityLow: 'Low',
  ganttStatusCompleted: '✅ Completed',
  ganttStatusInProgress: '🔄 In Progress',
  ganttStatusPending: '⏳ Pending',
  ganttStatusOverdue: '⚠️ Overdue',
  ganttRiskExtreme: 'EXTREME',
  ganttRiskCritical: 'CRITICAL',
  ganttRiskHigh: 'HIGH',
  ganttRiskMedium: 'MEDIUM',
  ganttRiskLow: 'LOW',
  ganttUrgentImportant: 'URGENT + IMPORTANT',
  ganttImportantNotUrgent: 'IMPORTANT + NOT URGENT',
  ganttUrgentNotImportant: 'URGENT + NOT IMPORTANT',
  ganttNeither: 'NEITHER',
  ganttPriorityAction: 'Attend immediately',
  ganttPriorityPlan: 'Plan execution',
  ganttPriorityDelegate: 'Delegate or automate',
  ganttPrioritySchedule: 'Schedule or eliminate',
  ganttFinancialProjection: '💰 Financial Projection',
  ganttEstimatedCost: 'Estimated Cost',
  ganttActualCost: 'Actual Cost',
  ganttVariance: 'Variance',
  ganttWithinBudget: '✅ The project is within budget',
  ganttOverBudget: '⚠️ The project is over budget. Review estimates recommended.',
  ganttStrategicRecommendation: '💡 Strategic Recommendation',
  ganttRecommendationText: (overdue, critical, spi) => {
    let text = 'Based on quantitative analysis of SPI (' + spi + '), overdue tasks (' + overdue + '), and risk level, the following is recommended:';
    let items = [];
    if (overdue > 0) items.push('🔴 Prioritize recovery of overdue tasks through resource reallocation');
    if (critical > 0) items.push('⚠️ Establish daily follow-up on critical path tasks');
    if (spi < 0.9) items.push('📉 Implement acceleration plan (fast-tracking/crashing) to recover schedule');
    items.push('📊 Schedule weekly progress review with the team');
    items.push('📅 Next executive review scheduled for ' + new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-US'));
    return text + '\n' + items.join('\n');
  },
  ganttConfidential: '🔒 CONFIDENTIAL - For executive use only',
  ganttMethodology: 'Methodology: Critical Path Method (CPM) · Schedule Performance Index (SPI) · Earned Value Management (EVM)',
  ganttGenerated: 'Generated',
  ganttSource: 'Source: PM Virtual Executive Platform',
});

// ============================================================
// RENDER GANTT - VERSIÓN CORREGIDA CON FALLBACKS
// ============================================================
window.renderGantt = function(container) {
  // Función auxiliar para escapar HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  // ========== FALLBACKS PARA TODAS LAS TRADUCCIONES DE GANTT ==========
  const fallback = {
    ganttNoProject: '⚠️ No project selected',
    ganttNoTasks: '📭 No tasks to display',
    ganttTitle: '📈 Executive Gantt Chart',
    ganttSubtitle: 'Programmatic Timeline · Critical Path Analysis · Executive Dashboard',
    ganttTotalTasks: 'Total Tasks',
    ganttCompleted: 'Completed',
    ganttInProgress: 'In Progress',
    ganttPending: 'Pending',
    ganttOverdue: 'Overdue',
    ganttCritical: 'Critical',
    ganttMilestones: 'Milestones',
    ganttSPI: 'SPI',
    ganttProgress: 'Progress',
    ganttRiskLevel: 'Risk Level',
    ganttExportPDF: '📄 Export as PDF',
    ganttPrint: '🖨️ Print Report',
    ganttTimeline: 'Programmatic Timeline',
    ganttTask: 'TASK',
    ganttEndDate: 'END DATE',
    ganttLegendCompleted: 'Completed',
    ganttLegendInProgress: 'In Progress',
    ganttLegendPending: 'Pending',
    ganttLegendOverdue: 'Overdue / Critical',
    ganttLegendMilestone: 'Milestone',
    ganttLegendToday: 'Today',
    ganttFilterAll: '📌 All statuses',
    ganttFilterCompleted: '✅ Completed',
    ganttFilterInProgress: '🔄 In Progress',
    ganttFilterPending: '⏳ Pending',
    ganttClearFilters: '🗑️ Clear',
    ganttTaskDetail: '📋 TASK DETAIL',
    ganttAssignedTo: 'Assigned to',
    ganttStart: 'Start',
    ganttEnd: 'End',
    ganttStatus: 'Status',
    ganttPriorityHigh: 'High',
    ganttPriorityMedium: 'Medium',
    ganttPriorityLow: 'Low',
    ganttStatusCompleted: '✅ Completed',
    ganttStatusInProgress: '🔄 In Progress',
    ganttStatusPending: '⏳ Pending',
    ganttStatusOverdue: '⚠️ Overdue',
    ganttRiskExtreme: 'EXTREME',
    ganttRiskCritical: 'CRITICAL',
    ganttRiskHigh: 'HIGH',
    ganttRiskMedium: 'MEDIUM',
    ganttRiskLow: 'LOW',
    ganttUrgentImportant: 'URGENT + IMPORTANT',
    ganttImportantNotUrgent: 'IMPORTANT + NOT URGENT',
    ganttUrgentNotImportant: 'URGENT + NOT IMPORTANT',
    ganttNeither: 'NEITHER',
    ganttPriorityAction: 'Attend immediately',
    ganttPriorityPlan: 'Plan execution',
    ganttPriorityDelegate: 'Delegate or automate',
    ganttPrioritySchedule: 'Schedule or eliminate',
    ganttFinancialProjection: '💰 Financial Projection',
    ganttEstimatedCost: 'Estimated Cost',
    ganttActualCost: 'Actual Cost',
    ganttVariance: 'Variance',
    ganttWithinBudget: '✅ The project is within budget',
    ganttOverBudget: '⚠️ The project is over budget. Review estimates recommended.',
    ganttStrategicRecommendation: '💡 Strategic Recommendation',
    ganttRecommendationText: (overdue, critical, spi) => {
      let text = 'Based on quantitative analysis of SPI (' + spi + '), overdue tasks (' + overdue + '), and risk level, the following is recommended:';
      let items = [];
      if (overdue > 0) items.push('🔴 Prioritize recovery of overdue tasks through resource reallocation');
      if (critical > 0) items.push('⚠️ Establish daily follow-up on critical path tasks');
      if (spi < 0.9) items.push('📉 Implement acceleration plan (fast-tracking/crashing) to recover schedule');
      items.push('📊 Schedule weekly progress review with the team');
      items.push('📅 Next executive review scheduled for ' + new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-US'));
      return text + '\n' + items.join('\n');
    },
    ganttConfidential: '🔒 CONFIDENTIAL - For executive use only',
    ganttMethodology: 'Methodology: Critical Path Method (CPM) · Schedule Performance Index (SPI) · Earned Value Management (EVM)',
    ganttGenerated: 'Generated',
    ganttSource: 'Source: PM Virtual Executive Platform'
  };

  // Función segura de traducción
  function getTranslation(key, ...args) {
    let val = window.translations && window.translations[key];
    if (val === undefined || val === null) {
      val = fallback[key];
    }
    if (typeof val === 'function') {
      return val(...args);
    }
    return val !== undefined && val !== null ? String(val) : '';
  }

  // ========== PROYECTO Y TAREAS ==========
  const proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
  if (!proyecto) {
    container.innerHTML = '<div style="text-align:center; padding:60px; color:#94a3b8;">' + getTranslation('ganttNoProject') + '</div>';
    return;
  }

  const tasks = proyecto.tasks || [];
  if (tasks.length === 0) {
    container.innerHTML = '<div style="text-align:center; padding:60px; color:#94a3b8;">' + getTranslation('ganttNoTasks') + '</div>';
    return;
  }

  // ========== MÉTRICAS (igual que antes, sin cambios) ==========
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const totalTareas = tasks.length;
  const completadas = tasks.filter(function(t) { return t.status === 'completed'; }).length;
  const enProgreso = tasks.filter(function(t) { return t.status === 'inProgress'; }).length;
  const pendientes = tasks.filter(function(t) { return t.status === 'pending'; }).length;
  const rezagadas = tasks.filter(function(t) {
    if (!t.deadline) return false;
    const deadline = new Date(t.deadline);
    deadline.setHours(0, 0, 0, 0);
    return deadline < hoy && t.status !== 'completed';
  }).length;
  const criticas = tasks.filter(function(t) { return t.priority === 'high' && t.status !== 'completed'; }).length;
  const porcentajeAvance = totalTareas > 0 ? Math.round((completadas / totalTareas) * 100) : 0;

  const pv = tasks.reduce(function(s, t) { return s + (Number(t.estimatedTime) || 0); }, 0);
  let ev = 0;
  tasks.forEach(function(t) {
    if (t.status === 'completed') ev += Number(t.estimatedTime) || 0;
    else if (t.status === 'inProgress') ev += (Number(t.estimatedTime) || 0) * 0.5;
  });
  const spi = pv > 0 ? (ev / pv).toFixed(2) : 1;
  const spiValue = parseFloat(spi);

  const diasRetrasoEstimados = spiValue < 1 ? Math.round((1 - spiValue) * (totalTareas * 2)) : 0;
  const riesgoNivel = rezagadas > 3 ? getTranslation('ganttRiskExtreme') : (rezagadas > 0 ? getTranslation('ganttRiskCritical') : (criticas > 2 ? getTranslation('ganttRiskHigh') : getTranslation('ganttRiskMedium')));
  const riesgoColor = riesgoNivel === getTranslation('ganttRiskExtreme') ? '#dc2626' : (riesgoNivel === getTranslation('ganttRiskCritical') ? '#f97316' : (riesgoNivel === getTranslation('ganttRiskHigh') ? '#f59e0b' : '#10b981'));

  let minDate = new Date();
  let maxDate = new Date();
  tasks.forEach(function(t) {
    if (t.startDate) { const d = new Date(t.startDate); if (d < minDate) minDate = d; if (d > maxDate) maxDate = d; }
    if (t.deadline) { const d = new Date(t.deadline); if (d < minDate) minDate = d; if (d > maxDate) maxDate = d; }
  });

  const start = new Date(minDate);
  start.setDate(start.getDate() - 7);
  const end = new Date(maxDate);
  end.setDate(end.getDate() + 14);
  const totalDays = Math.ceil((end - start) / (1000 * 3600 * 24));

  const startNormalized = new Date(start);
  startNormalized.setHours(0, 0, 0, 0);
  const todayOffset = Math.max(0, Math.floor((hoy - startNormalized) / (1000 * 3600 * 24)));
  const todayPercent = totalDays > 0 ? Math.min(100, Math.max(0, (todayOffset / totalDays) * 100)) : 0;

  const hitos = tasks.filter(function(t) { return t.isMilestone || (t.startDate && t.deadline && new Date(t.startDate).getTime() === new Date(t.deadline).getTime()); });
  const rutaCritica = tasks.filter(function(t) { return t.priority === 'high' && t.status !== 'completed'; });

  const chartDataStatus = [completadas, enProgreso, pendientes, rezagadas];
  const chartLabelsStatus = [getTranslation('ganttCompleted'), getTranslation('ganttInProgress'), getTranslation('ganttPending'), getTranslation('ganttOverdue')];
  const chartColorsStatus = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  const prioridadAlta = tasks.filter(function(t) { return t.priority === 'high'; }).length;
  const prioridadMedia = tasks.filter(function(t) { return t.priority === 'medium'; }).length;
  const prioridadBaja = tasks.filter(function(t) { return t.priority === 'low'; }).length;

  function getTaskStatusColor(task) {
    if (task.status === 'completed') return { bg: '#10b981', light: 'rgba(16,185,129,0.15)' };
    if (task.deadline && new Date(task.deadline) < hoy && task.status !== 'completed') return { bg: '#ef4444', light: 'rgba(239,68,68,0.15)' };
    if (task.status === 'inProgress') return { bg: '#3b82f6', light: 'rgba(59,130,246,0.15)' };
    if (task.priority === 'high' && task.status !== 'completed') return { bg: '#ef4444', light: 'rgba(239,68,68,0.15)' };
    return { bg: '#f59e0b', light: 'rgba(245,158,11,0.15)' };
  }

  // ========== GENERAR HTML (usando getTranslation en TODAS las etiquetas) ==========
  let timelineDatesHtml = '';
  for (let i = 0; i <= totalDays; i += 7) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    const leftPercent = (i / totalDays) * 100;
    timelineDatesHtml += '<div style="position: absolute; left: ' + leftPercent + '%; border-left: 1px solid #334155; height: 40px; bottom: 0;">';
    timelineDatesHtml += '<span style="position: absolute; bottom: -30px; left: -20px; font-size: 10px; color: #94a3b8; white-space: nowrap;">' + date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) + '</span>';
    timelineDatesHtml += '</div>';
  }

  let ganttRowsHtml = '';
  const tasksSorted = [...tasks].sort(function(a, b) {
    const dateA = a.startDate ? new Date(a.startDate) : new Date(0);
    const dateB = b.startDate ? new Date(b.startDate) : new Date(0);
    return dateA - dateB;
  });

  for (let i = 0; i < tasksSorted.length; i++) {
    const t = tasksSorted[i];
    let startOffset = 10;
    let duration = 5;
    if (t.startDate) {
      const taskStart = new Date(t.startDate);
      startOffset = Math.max(0, Math.floor((taskStart - start) / (1000 * 3600 * 24)));
    }
    if (t.deadline && t.startDate) {
      const taskEnd = new Date(t.deadline);
      duration = Math.max(1, Math.floor((taskEnd - new Date(t.startDate)) / (1000 * 3600 * 24)));
    }
    const leftPercent = Math.min(92, (startOffset / totalDays) * 100);
    const widthPercent = Math.min(92 - leftPercent, (duration / totalDays) * 100);
    const colors = getTaskStatusColor(t);
    const isMilestone = t.isMilestone || (t.startDate && t.deadline && new Date(t.startDate).getTime() === new Date(t.deadline).getTime()) || duration <= 1;

    let priorityBadge = '';
    if (t.priority === 'high') priorityBadge = '<span style="background:#dc2626; color:white; padding:2px 8px; border-radius:20px; font-size:9px;">🔴 ' + getTranslation('ganttPriorityHigh') + '</span>';
    else if (t.priority === 'medium') priorityBadge = '<span style="background:#f59e0b; color:white; padding:2px 8px; border-radius:20px; font-size:9px;">🟡 ' + getTranslation('ganttPriorityMedium') + '</span>';
    else priorityBadge = '<span style="background:#10b981; color:white; padding:2px 8px; border-radius:20px; font-size:9px;">🟢 ' + getTranslation('ganttPriorityLow') + '</span>';

    const statusText = t.status === 'completed' ? getTranslation('ganttStatusCompleted') : (t.status === 'inProgress' ? getTranslation('ganttStatusInProgress') : getTranslation('ganttStatusPending'));
    const isOverdue = t.deadline && new Date(t.deadline) < hoy && t.status !== 'completed';
    const overdueBadge = isOverdue ? '<span style="background:#ef4444; color:white; padding:2px 6px; border-radius:20px; font-size:8px; margin-left:6px;">' + getTranslation('ganttStatusOverdue') + '</span>' : '';

    ganttRowsHtml += '<div class="gantt-row" data-task="' + escapeHtml(t.name) + '" data-start="' + (t.startDate || 'N/A') + '" data-end="' + (t.deadline || 'N/A') + '" data-assignee="' + (t.assignee || getTranslation('ganttAssignedTo') + '?') + '" data-status="' + t.status + '">';
    ganttRowsHtml += '<div class="gantt-task-col">';
    ganttRowsHtml += '<div style="font-weight: 600; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">' + escapeHtml(t.name) + ' ' + priorityBadge + overdueBadge + '</div>';
    ganttRowsHtml += '<div style="font-size: 10px; color: #94a3b8; margin-top: 4px;">' + (t.assignee || getTranslation('ganttAssignedTo') + '?') + ' • ' + statusText + '</div>';
    ganttRowsHtml += '</div>';
    ganttRowsHtml += '<div class="gantt-bar-container">';

    if (isMilestone) {
      ganttRowsHtml += '<div class="gantt-milestone" style="left: calc(' + leftPercent + '% - 12px);" title="' + escapeHtml(t.name) + ' | ' + (t.startDate || 'N/A') + '">⭐</div>';
    } else {
      ganttRowsHtml += '<div class="gantt-bar" style="left: ' + leftPercent + '%; width: ' + Math.max(2, widthPercent) + '%; background: ' + colors.bg + ';" title="' + escapeHtml(t.name) + ' | ' + (t.startDate || 'N/A') + ' → ' + (t.deadline || 'N/A') + '">';
      ganttRowsHtml += '<span class="gantt-bar-label">' + duration + 'd</span>';
      ganttRowsHtml += '</div>';
    }

    ganttRowsHtml += '</div>';
    ganttRowsHtml += '<div class="gantt-end-col">' + (t.deadline ? new Date(t.deadline).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : 'N/D') + '</div>';
    ganttRowsHtml += '</div>';
  }

  let tasksTableHtml = '';
  for (let i = 0; i < tasksSorted.slice(0, 15).length; i++) {
    const t = tasksSorted[i];
    const statusColor = t.status === 'completed' ? '#10b981' : (t.status === 'inProgress' ? '#3b82f6' : '#f59e0b');
    const isOverdue = t.deadline && new Date(t.deadline) < hoy && t.status !== 'completed';
    tasksTableHtml += '<tr style="border-bottom: 1px solid #e2e8f0;">';
    tasksTableHtml += '<td style="padding: 12px;"><strong>' + escapeHtml(t.name) + '</strong></td>';
    tasksTableHtml += '<td style="padding: 12px;">' + (t.assignee || 'N/A') + '</td>';
    tasksTableHtml += '<td style="padding: 12px;"><span style="background: ' + statusColor + '20; color: ' + statusColor + '; padding: 4px 12px; border-radius: 20px; font-size: 11px;">' + (t.status === 'completed' ? getTranslation('ganttStatusCompleted') : (t.status === 'inProgress' ? getTranslation('ganttStatusInProgress') : getTranslation('ganttStatusPending'))) + '</span>' + (isOverdue ? ' <span style="background:#ef4444; color:white; padding:2px 8px; border-radius:12px; font-size:9px;">' + getTranslation('ganttStatusOverdue') + '</span>' : '') + '</td>';
    tasksTableHtml += '<td style="padding: 12px;">' + (t.priority === 'high' ? '🔴 ' + getTranslation('ganttPriorityHigh') : (t.priority === 'medium' ? '🟡 ' + getTranslation('ganttPriorityMedium') : '🟢 ' + getTranslation('ganttPriorityLow'))) + '</td>';
    tasksTableHtml += '<td style="padding: 12px;">' + (t.startDate ? new Date(t.startDate).toLocaleDateString('en-US') : 'N/D') + '</td>';
    tasksTableHtml += '<td style="padding: 12px;">' + (t.deadline ? new Date(t.deadline).toLocaleDateString('en-US') : 'N/D') + '</td>';
    tasksTableHtml += '</tr>';
  }

  let recommendationsHtml = '';
  if (rezagadas > 0) {
    recommendationsHtml += '<div class="recommendation-item urgent"><div class="rec-icon">🚨</div><div><strong>Immediate Action Required</strong><br>' + rezagadas + ' overdue tasks. Recommended:<br>• Reassign resources to critical tasks<br>• Review root causes of delay<br>• Notify affected stakeholders</div></div>';
  }
  if (criticas > 0 && rezagadas === 0) {
    recommendationsHtml += '<div class="recommendation-item warning"><div class="rec-icon">⚠️</div><div><strong>Intensive Monitoring</strong><br>' + criticas + ' critical tasks in progress. Recommendations:<br>• Daily progress tracking<br>• Identify potential blockers early<br>• Maintain communication with assigned team</div></div>';
  }
  if (spiValue < 0.85) {
    recommendationsHtml += '<div class="recommendation-item urgent"><div class="rec-icon">📉</div><div><strong>Significant Schedule Delay</strong><br>SPI = ' + spiValue + '. Estimated ' + diasRetrasoEstimados + ' days delay. Suggested actions:<br>• Evaluate additional resources<br>• Review critical dependencies<br>• Consider fast-tracking or crashing</div></div>';
  } else if (spiValue < 0.95) {
    recommendationsHtml += '<div class="recommendation-item warning"><div class="rec-icon">📊</div><div><strong>Minor Delay Detected</strong><br>SPI = ' + spiValue + '. Recommended:<br>• Adjust weekly work plan<br>• Prioritize critical path tasks<br>• Review pending estimates</div></div>';
  } else {
    recommendationsHtml += '<div class="recommendation-item success"><div class="rec-icon">✅</div><div><strong>Healthy Schedule</strong><br>SPI = ' + spiValue + '. Project is on track. Recommendations:<br>• Maintain current practices<br>• Document lessons learned<br>• Celebrate milestones achieved</div></div>';
  }
  if (riesgoNivel === getTranslation('ganttRiskExtreme') || riesgoNivel === getTranslation('ganttRiskCritical')) {
    recommendationsHtml += '<div class="recommendation-item urgent"><div class="rec-icon">🎯</div><div><strong>Risk Mitigation Plan</strong><br>Risk level: ' + riesgoNivel + '. Immediate actions:<br>• Activate contingency plan<br>• Extraordinary committee meeting<br>• Evaluate impact on scope and budget</div></div>';
  }
  if (rutaCritica.length > 0) {
    recommendationsHtml += '<div class="recommendation-item warning"><div class="rec-icon">🔗</div><div><strong>Critical Path - Priority Attention</strong><br>' + rutaCritica.length + ' tasks on critical path require special follow-up:<br>• ' + rutaCritica.slice(0, 3).map(function(t) { return escapeHtml(t.name); }).join('<br>• ') + (rutaCritica.length > 3 ? '<br>• +' + (rutaCritica.length - 3) + ' more' : '') + '</div></div>';
  }
  if (recommendationsHtml === '') {
    recommendationsHtml = '<div class="recommendation-item info"><div class="rec-icon">ℹ️</div><div><strong>Normal Status</strong><br>The project is within expected parameters. Continue regular monitoring and maintain team communication.</div></div>';
  }

  const priorizacionHtml = `
    <div class="priority-matrix">
      <div class="priority-cell urgent-important" style="background: linear-gradient(135deg, #dc2626, #b91c1c);">
        <div class="priority-title">${getTranslation('ganttUrgentImportant')}</div>
        <div class="priority-count">${criticas > 0 ? criticas : 0} tasks</div>
        <div class="priority-action">${getTranslation('ganttPriorityAction')}</div>
      </div>
      <div class="priority-cell important-not-urgent" style="background: linear-gradient(135deg, #f59e0b, #d97706);">
        <div class="priority-title">${getTranslation('ganttImportantNotUrgent')}</div>
        <div class="priority-count">${rutaCritica.length - criticas > 0 ? rutaCritica.length - criticas : 0} tasks</div>
        <div class="priority-action">${getTranslation('ganttPriorityPlan')}</div>
      </div>
      <div class="priority-cell urgent-not-important" style="background: linear-gradient(135deg, #3b82f6, #2563eb);">
        <div class="priority-title">${getTranslation('ganttUrgentNotImportant')}</div>
        <div class="priority-count">${rezagadas - criticas > 0 ? rezagadas - criticas : 0} tasks</div>
        <div class="priority-action">${getTranslation('ganttPriorityDelegate')}</div>
      </div>
      <div class="priority-cell neither" style="background: linear-gradient(135deg, #10b981, #059669);">
        <div class="priority-title">${getTranslation('ganttNeither')}</div>
        <div class="priority-count">${pendientes - (rezagadas - criticas) > 0 ? pendientes - (rezagadas - criticas) : 0} tasks</div>
        <div class="priority-action">${getTranslation('ganttPrioritySchedule')}</div>
      </div>
    </div>
  `;

  const costoHora = 50;
  const horasEstimadas = tasks.reduce(function(s, t) { return s + (Number(t.estimatedTime) || 0); }, 0);
  const horasRegistradas = tasks.reduce(function(s, t) { return s + (Number(t.timeLogged) || 0); }, 0);
  const costoEstimado = horasEstimadas * costoHora;
  const costoReal = horasRegistradas * costoHora;
  const variacionCosto = costoReal - costoEstimado;

  // ========== HTML COMPLETO (con getTranslation en todas las etiquetas) ==========
  const fullHtml = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Executive Gantt Chart | ${escapeHtml(proyecto.name)}</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%);
        padding: 40px;
        color: #1e293b;
      }
      .report-container { max-width: 1600px; margin: 0 auto; }
      .btn-group { display: flex; gap: 16px; justify-content: flex-end; margin-bottom: 24px; }
      .btn-pdf, .btn-print {
        border: none; padding: 12px 28px; border-radius: 40px;
        color: white; font-weight: 600; font-size: 13px;
        cursor: pointer; display: inline-flex; align-items: center; gap: 10px;
        transition: all 0.2s;
      }
      .btn-pdf { background: linear-gradient(135deg, #dc2626, #b91c1c); }
      .btn-print { background: linear-gradient(135deg, #3b82f6, #2563eb); }
      .btn-pdf:hover, .btn-print:hover { transform: translateY(-2px); }
      .corporate-header {
        background: linear-gradient(135deg, #0a0f2a 0%, #0f172a 40%, #1e1b4b 100%);
        border-radius: 32px;
        padding: 48px;
        margin-bottom: 32px;
        position: relative;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
      }
      .corporate-header::before {
        content: '';
        position: absolute;
        top: -30%;
        right: -10%;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(139,92,246,0.15), transparent);
        border-radius: 50%;
      }
      .kpi-grid {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 16px;
        margin-bottom: 32px;
      }
      .kpi-card {
        background: white;
        border-radius: 20px;
        padding: 20px;
        text-align: center;
        box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        border: 1px solid #e2e8f0;
        transition: all 0.2s;
      }
      .kpi-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -8px rgba(0,0,0,0.15); }
      .kpi-value { font-size: 28px; font-weight: 800; line-height: 1.2; margin: 8px 0 4px; }
      .kpi-label { font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
      .two-columns {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
        margin-bottom: 32px;
      }
      .card {
        background: white;
        border-radius: 24px;
        padding: 24px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        border: 1px solid #e2e8f0;
      }
      .card-title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 20px;
        padding-bottom: 12px;
        border-bottom: 2px solid #f1f5f9;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .gantt-container {
        background: white;
        border-radius: 24px;
        padding: 24px;
        margin-bottom: 32px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        border: 1px solid #e2e8f0;
        overflow-x: auto;
      }
      .gantt-wrapper { min-width: 1000px; position: relative; }
      .gantt-header {
        display: flex;
        border-bottom: 2px solid #e2e8f0;
        padding-bottom: 16px;
        margin-bottom: 16px;
        font-weight: 600;
        color: #475569;
      }
      .gantt-task-header { width: 280px; min-width: 280px; }
      .gantt-timeline-header { flex: 1; position: relative; height: 60px; }
      .gantt-row {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        padding: 8px 0;
        border-bottom: 1px solid #f1f5f9;
        transition: background 0.2s;
        cursor: pointer;
      }
      .gantt-row:hover { background: #f8fafc; border-radius: 12px; }
      .gantt-task-col { width: 280px; min-width: 280px; padding-right: 16px; }
      .gantt-bar-container { flex: 1; position: relative; height: 36px; }
      .gantt-bar {
        position: absolute;
        height: 28px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 10px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      }
      .gantt-bar:hover { transform: scaleY(1.05); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
      .gantt-bar-label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 0 8px; }
      .gantt-milestone {
        position: absolute;
        width: 28px;
        height: 28px;
        background: #f59e0b;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        top: 4px;
        box-shadow: 0 2px 8px rgba(245,158,11,0.4);
        cursor: pointer;
      }
      .gantt-end-col { width: 80px; text-align: right; font-size: 11px; color: #64748b; }
      .today-line-container {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 2px;
        background: #f59e0b;
        z-index: 20;
        pointer-events: none;
      }
      .today-line-container::before {
        content: '📅 ${getTranslation('ganttLegendToday')}';
        position: absolute;
        top: -28px;
        left: -28px;
        background: #f59e0b;
        color: white;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 10px;
        font-weight: 700;
        white-space: nowrap;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        z-index: 25;
      }
      .today-line-container::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 2px;
        background: #f59e0b;
        box-shadow: 0 0 8px rgba(245,158,11,0.5);
      }
      .legend {
        display: flex;
        gap: 24px;
        margin-top: 24px;
        padding-top: 20px;
        border-top: 1px solid #e2e8f0;
        flex-wrap: wrap;
      }
      .legend-item { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #475569; }
      .legend-color { width: 16px; height: 16px; border-radius: 4px; }
      .legend-circle { width: 12px; height: 12px; border-radius: 50%; background: #f59e0b; }
      .recommendations-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 20px;
        margin-bottom: 32px;
      }
      .recommendation-item {
        background: white;
        border-radius: 20px;
        padding: 20px;
        display: flex;
        gap: 16px;
        align-items: flex-start;
        border-left: 4px solid;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      }
      .recommendation-item.urgent { border-left-color: #dc2626; background: linear-gradient(135deg, #fff, #fef2f2); }
      .recommendation-item.warning { border-left-color: #f59e0b; background: linear-gradient(135deg, #fff, #fffbeb); }
      .recommendation-item.success { border-left-color: #10b981; background: linear-gradient(135deg, #fff, #ecfdf5); }
      .recommendation-item.info { border-left-color: #3b82f6; background: linear-gradient(135deg, #fff, #eff6ff); }
      .rec-icon { font-size: 32px; }
      .priority-matrix {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2px;
        background: #e2e8f0;
        border-radius: 16px;
        overflow: hidden;
        margin-bottom: 24px;
      }
      .priority-cell {
        padding: 20px;
        color: white;
        text-align: center;
      }
      .priority-title { font-size: 12px; font-weight: 600; margin-bottom: 12px; opacity: 0.9; }
      .priority-count { font-size: 28px; font-weight: 800; margin-bottom: 8px; }
      .priority-action { font-size: 10px; opacity: 0.8; }
      .tasks-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
      }
      .tasks-table th {
        text-align: left;
        padding: 12px;
        background: #f8fafc;
        font-weight: 600;
        border-bottom: 2px solid #e2e8f0;
      }
      .tasks-table td {
        padding: 10px 12px;
        border-bottom: 1px solid #e2e8f0;
      }
      .footer {
        background: white;
        border-radius: 20px;
        padding: 24px;
        text-align: center;
        border: 1px solid #e2e8f0;
        margin-top: 32px;
      }
      @media print {
        body { padding: 20px; background: white; }
        .no-print { display: none !important; }
        .gantt-row { break-inside: avoid; }
        .corporate-header { break-inside: avoid; }
      }
    </style>
  </head>
  <body>
    <div class="report-container">
      <div class="btn-group no-print">
        <button class="btn-pdf" id="btnExportPDF">${getTranslation('ganttExportPDF')}</button>
        <button class="btn-print" id="btnPrint">${getTranslation('ganttPrint')}</button>
      </div>

      <!-- HEADER CORPORATIVO -->
      <div class="corporate-header">
        <div style="position: relative; z-index: 2;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
            <div>
              <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
                <div style="background: linear-gradient(135deg, #8b5cf6, #3b82f6); width: 60px; height: 60px; border-radius: 20px; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 32px;">📊</span>
                </div>
                <div>
                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: white;">${getTranslation('ganttTitle')}</h1>
                  <p style="margin: 8px 0 0 0; color: #94a3b8;">${getTranslation('ganttSubtitle')}</p>
                </div>
              </div>
              <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                <div style="background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); padding: 6px 20px; border-radius: 40px;">
                  <span style="color: #cbd5e1;">🎯 ${escapeHtml(proyecto.name)}</span>
                </div>
                <div style="background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); padding: 6px 20px; border-radius: 40px;">
                  <span style="color: #cbd5e1;">📅 ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div style="background: rgba(239,68,68,0.2); backdrop-filter: blur(10px); padding: 6px 20px; border-radius: 40px;">
                  <span style="color: #f87171;">⚠️ ${getTranslation('ganttRiskLevel')}: ${riesgoNivel}</span>
                </div>
              </div>
            </div>
            <div style="background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border-radius: 28px; padding: 20px 32px; text-align: center;">
              <div style="font-size: 11px; color: #94a3b8; letter-spacing: 1px;">${getTranslation('ganttProgress')}</div>
              <div style="font-size: 48px; font-weight: 800; background: linear-gradient(135deg, #8b5cf6, #60a5fa); -webkit-background-clip: text; background-clip: text; color: transparent;">${porcentajeAvance}%</div>
              <div style="background: #334155; height: 6px; border-radius: 10px; width: 150px; margin-top: 8px; overflow: hidden;">
                <div style="width: ${porcentajeAvance}%; height: 100%; background: ${porcentajeAvance >= 80 ? '#10b981' : (porcentajeAvance >= 50 ? '#f59e0b' : '#ef4444')}; border-radius: 10px;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- KPIs EJECUTIVOS (8 tarjetas) -->
      <div class="kpi-grid">
        <div class="kpi-card"><div class="kpi-value">${totalTareas}</div><div class="kpi-label">${getTranslation('ganttTotalTasks')}</div></div>
        <div class="kpi-card"><div class="kpi-value" style="color:#10b981;">${completadas}</div><div class="kpi-label">✅ ${getTranslation('ganttCompleted')}</div></div>
        <div class="kpi-card"><div class="kpi-value" style="color:#3b82f6;">${enProgreso}</div><div class="kpi-label">🔄 ${getTranslation('ganttInProgress')}</div></div>
        <div class="kpi-card"><div class="kpi-value" style="color:#f59e0b;">${pendientes}</div><div class="kpi-label">⏳ ${getTranslation('ganttPending')}</div></div>
        <div class="kpi-card"><div class="kpi-value" style="color:#ef4444;">${rezagadas}</div><div class="kpi-label">🔴 ${getTranslation('ganttOverdue')}</div></div>
        <div class="kpi-card"><div class="kpi-value" style="color:#f97316;">${criticas}</div><div class="kpi-label">⚠️ ${getTranslation('ganttCritical')}</div></div>
        <div class="kpi-card"><div class="kpi-value" style="color:#f59e0b;">${hitos.length}</div><div class="kpi-label">⭐ ${getTranslation('ganttMilestones')}</div></div>
        <div class="kpi-card"><div class="kpi-value" style="color:#8b5cf6;">${spi}</div><div class="kpi-label">📈 ${getTranslation('ganttSPI')}</div></div>
      </div>

      <!-- GRÁFICOS Y ANÁLISIS -->
      <div class="two-columns">
        <div class="card">
          <div class="card-title"><span>📊</span> Task Distribution by Status</div>
          <canvas id="statusChart" style="height: 240px;"></canvas>
        </div>
        <div class="card">
          <div class="card-title"><span>📈</span> Performance Analysis</div>
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <div><div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>SPI (Schedule Performance Index)</span><span style="font-weight:700; color:${spiValue >= 1 ? '#10b981' : '#ef4444'};">${spi}</span></div><div style="background:#e2e8f0; height: 8px; border-radius: 10px; overflow:hidden;"><div style="width: ${Math.min(100, spiValue * 100)}%; height:100%; background: ${spiValue >= 1 ? '#10b981' : '#ef4444'}; border-radius:10px;"></div></div></div>
            <div><div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>${getTranslation('ganttProgress')} vs Plan</span><span style="font-weight:700;">${porcentajeAvance}%</span></div><div style="background:#e2e8f0; height: 8px; border-radius: 10px; overflow:hidden;"><div style="width: ${porcentajeAvance}%; height:100%; background: #3b82f6; border-radius:10px;"></div></div></div>
            <div><div style="display: flex; justify-content: space-between; margin-bottom: 8px;"><span>Priority Distribution</span></div><div style="display: flex; gap: 8px; margin-top: 8px;"><div style="flex:${prioridadAlta}; background:#dc2626; height: 8px; border-radius: 4px;"></div><div style="flex:${prioridadMedia}; background:#f59e0b; height: 8px; border-radius: 4px;"></div><div style="flex:${prioridadBaja}; background:#10b981; height: 8px; border-radius: 4px;"></div></div><div style="display: flex; justify-content: space-between; margin-top: 8px;"><span style="font-size:10px;">🔴 ${getTranslation('ganttPriorityHigh')}: ${prioridadAlta}</span><span style="font-size:10px;">🟡 ${getTranslation('ganttPriorityMedium')}: ${prioridadMedia}</span><span style="font-size:10px;">🟢 ${getTranslation('ganttPriorityLow')}: ${prioridadBaja}</span></div></div>
            ${diasRetrasoEstimados > 0 ? '<div style="background:#fef2f2; padding: 12px; border-radius: 12px; margin-top: 8px;"><span style="color:#dc2626;">⚠️ Estimated delay: ' + diasRetrasoEstimados + ' days at current pace</span></div>' : ''}
          </div>
        </div>
      </div>

      <!-- MATRIZ DE PRIORIZACIÓN -->
      <div class="card" style="margin-bottom: 32px;">
        <div class="card-title"><span>🎯</span> Priority Matrix (Urgent vs Important)</div>
        ${priorizacionHtml}
      </div>

      <!-- GANTT CHART -->
      <div class="gantt-container">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div><h3 style="margin:0;">📈 ${getTranslation('ganttTimeline')}</h3><p style="margin:4px 0 0; font-size:12px; color:#64748b;">Detailed schedule with critical path</p></div>
          <div class="no-print">
            <select id="filterStatusGantt" style="padding:8px 16px; border-radius:40px; border:1px solid #e2e8f0; background:white;">
              <option value="all">${getTranslation('ganttFilterAll')}</option>
              <option value="completed">${getTranslation('ganttFilterCompleted')}</option>
              <option value="inProgress">${getTranslation('ganttFilterInProgress')}</option>
              <option value="pending">${getTranslation('ganttFilterPending')}</option>
            </select>
            <button id="resetFiltersGantt" style="padding:8px 16px; border-radius:40px; border:1px solid #e2e8f0; background:white; margin-left:8px; cursor:pointer;">${getTranslation('ganttClearFilters')}</button>
          </div>
        </div>
        <div class="gantt-wrapper" id="ganttWrapper">
          <div class="gantt-header">
            <div class="gantt-task-header">${getTranslation('ganttTask')}</div>
            <div class="gantt-timeline-header" id="timelineHeader">${timelineDatesHtml}</div>
            <div style="width:80px; text-align:right;">${getTranslation('ganttEndDate')}</div>
          </div>
          <div id="ganttRowsContainer" style="position: relative;">
            ${ganttRowsHtml}
            <!-- Línea de HOY -->
            <div id="todayLine" class="today-line-container" style="left: ${todayPercent}%;"></div>
          </div>
        </div>
        <div class="legend">
          <div class="legend-item"><div class="legend-color" style="background:#10b981;"></div><span>${getTranslation('ganttLegendCompleted')}</span></div>
          <div class="legend-item"><div class="legend-color" style="background:#3b82f6;"></div><span>${getTranslation('ganttLegendInProgress')}</span></div>
          <div class="legend-item"><div class="legend-color" style="background:#f59e0b;"></div><span>${getTranslation('ganttLegendPending')}</span></div>
          <div class="legend-item"><div class="legend-color" style="background:#ef4444;"></div><span>${getTranslation('ganttLegendOverdue')}</span></div>
          <div class="legend-item"><div class="legend-circle"></div><span>${getTranslation('ganttMilestones')}</span></div>
          <div class="legend-item"><div style="width:2px; height:16px; background:#f59e0b;"></div><span>${getTranslation('ganttLegendToday')}</span></div>
        </div>
      </div>

      <!-- TABLA EJECUTIVA DE TAREAS -->
      <div class="card" style="margin-bottom: 32px;">
        <div class="card-title"><span>📋</span> Executive Task Detail</div>
        <div style="overflow-x: auto;">
          <table class="tasks-table">
            <thead>
              <tr><th>${getTranslation('ganttTask')}</th><th>${getTranslation('ganttAssignedTo')}</th><th>${getTranslation('ganttStatus')}</th><th>${getTranslation('ganttPriorityMedium')}</th><th>${getTranslation('ganttStart')}</th><th>${getTranslation('ganttEnd')}</th></tr>
            </thead>
            <tbody>
              ${tasksTableHtml}
            </tbody>
          </table>
        </div>
      </div>

      <!-- RECOMENDACIONES EJECUTIVAS -->
      <div class="recommendations-grid">
        ${recommendationsHtml}
      </div>

      <!-- PROYECCIÓN FINANCIERA -->
      <div class="two-columns">
        <div class="card">
          <div class="card-title"><span>💰</span> ${getTranslation('ganttFinancialProjection')}</div>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; justify-content: space-between;"><span>${getTranslation('ganttEstimatedCost')}</span><span style="font-weight:700;">$${costoEstimado.toLocaleString()} USD</span></div>
            <div style="display: flex; justify-content: space-between;"><span>${getTranslation('ganttActualCost')}</span><span style="font-weight:700; color:${variacionCosto <= 0 ? '#10b981' : '#ef4444'};">$${costoReal.toLocaleString()} USD</span></div>
            <div style="display: flex; justify-content: space-between;"><span>${getTranslation('ganttVariance')}</span><span style="font-weight:700; color:${variacionCosto <= 0 ? '#10b981' : '#ef4444'};">${variacionCosto <= 0 ? '+' : '-'}$${Math.abs(variacionCosto).toLocaleString()} USD</span></div>
            <div style="background:#f8fafc; padding: 12px; border-radius: 12px; margin-top: 8px;">
              <span style="font-size: 11px; color: #64748b;">${variacionCosto <= 0 ? getTranslation('ganttWithinBudget') : getTranslation('ganttOverBudget')}</span>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-title"><span>💡</span> ${getTranslation('ganttStrategicRecommendation')}</div>
          <div style="background: linear-gradient(135deg, ${riesgoColor}10, ${riesgoColor}05); border-radius: 16px; padding: 20px; border-left: 4px solid ${riesgoColor};">
            <p style="font-size: 14px; margin-bottom: 16px;">${getTranslation('ganttRecommendationText', rezagadas, criticas, spiValue.toFixed(2))}</p>
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <div class="footer">
        <p style="color: #64748b; font-size: 11px;">
          <strong>${getTranslation('ganttConfidential')}</strong><br>
          ${getTranslation('ganttMethodology')}<br>
          ${getTranslation('ganttGenerated')}: ${new Date().toLocaleString('en-US')} | ${getTranslation('ganttSource')}
        </p>
      </div>
    </div>

    <script>
      new Chart(document.getElementById('statusChart'), {
        type: 'doughnut',
        data: {
          labels: ${JSON.stringify(chartLabelsStatus)},
          datasets: [{
            data: ${JSON.stringify(chartDataStatus)},
            backgroundColor: ${JSON.stringify(chartColorsStatus)},
            borderWidth: 0,
            cutout: '65%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { position: 'bottom', labels: { font: { size: 10 } } }
          }
        }
      });

      document.querySelectorAll('.gantt-row').forEach(function(row) {
        row.addEventListener('click', function() {
          const task = this.getAttribute('data-task') || '';
          const start = this.getAttribute('data-start') || '';
          const end = this.getAttribute('data-end') || '';
          const assignee = this.getAttribute('data-assignee') || '';
          const status = this.getAttribute('data-status') || '';
          alert('📋 TASK DETAIL\\n\\n📌 Task: ' + task + '\\n👤 ' + getTranslation('ganttAssignedTo') + ': ' + assignee + '\\n📅 ' + getTranslation('ganttStart') + ': ' + start + '\\n📅 ' + getTranslation('ganttEnd') + ': ' + end + '\\n📊 ' + getTranslation('ganttStatus') + ': ' + status);
        });
      });

      document.getElementById('btnExportPDF').addEventListener('click', function() { window.print(); });
      document.getElementById('btnPrint').addEventListener('click', function() { window.print(); });
      document.getElementById('resetFiltersGantt').addEventListener('click', function() {
        const select = document.getElementById('filterStatusGantt');
        if (select) select.value = 'all';
        location.reload();
      });
    <\/script>
  </body>
  </html>`;

  const ventana = window.open('', '_blank');
  if (!ventana) {
    alert('⚠️ Please allow popup windows to view the Gantt chart.');
    return;
  }
  ventana.document.write(fullHtml);
  ventana.document.close();
};

console.log('✅ renderGantt corregido con fallbacks para todas las traducciones.');
// ============================================================
// AMPLIAR TRADUCCIONES PARA LA PESTAÑA RECURSOS
// ============================================================
window.translations = Object.assign(window.translations || {}, {
  // Títulos y etiquetas de Recursos
  resourcesTitle: '👥 Resource Intelligence Report',
  resourcesSubtitle: 'Capacity Analysis, Productivity & Resource Optimization',
  resourcesNoProject: '⚠️ No project selected',
  resourcesNoTasks: '📭 No tasks to display',
  resourcesExecutiveSummary: '📋 Executive Summary',
  resourcesKeyFindings: '📊 Key Findings',
  resourcesRecommendations: '💡 Strategic Recommendations',
  resourcesProductivity: 'Productivity',
  resourcesEfficiency: 'Efficiency',
  resourcesSuccessRate: 'Success Rate',
  resourcesFinancialImpact: 'Financial Impact',
  resourcesWorkloadDistribution: '📊 Workload Distribution by Resource',
  resourcesProductivityEfficiency: '📈 Productivity vs Efficiency Matrix',
  resourcesRegister: '📋 Resource Performance Register',
  resourcesResource: 'Resource',
  resourcesTasks: 'Tasks',
  resourcesCompleted: 'Completed',
  resourcesInProgress: 'In Progress',
  resourcesPending: 'Pending',
  resourcesOverdue: 'Overdue',
  resourcesStatus: 'Status',
  resourcesOverloaded: 'Overloaded',
  resourcesWithDelays: 'With Delays',
  resourcesAvailable: 'Available',
  resourcesNormal: 'Normal',
  resourcesImmediateActions: '🎯 Immediate Actions (72h)',
  resourcesShortTerm: '📅 Short Term (2 weeks)',
  resourcesLongTerm: '🏆 Long Term (Quarterly)',
  resourcesConfidential: '🔒 CONFIDENTIAL - For executive use only',
  resourcesMethodology: 'Methodology: Quantitative analysis based on historical productivity data. Complies with PMI standards.',
  resourcesGenerated: 'Generated',
  resourcesSource: 'Source: PM Virtual Executive Platform',
  resourcesAvgProductivity: 'Average productivity of the team',
  resourcesEfficiencyCost: 'Real vs estimated hours',
  resourcesOnTimeDelivery: 'Deliveries on time',
  resourcesSavingOverrun: (value) => `${value >= 0 ? 'Projected savings' : 'Overrun'}`,
  resourcesHighSuccess: 'High success rate',
  resourcesModerateSuccess: 'Moderate success rate',
  resourcesLowSuccess: 'Low success rate',
  resourcesOverloadedResources: (count) => `${count} resource(s) with critical overload`,
  resourcesOverdueTasks: (count) => `${count} overdue tasks`,
  resourcesEfficiencyPercent: (pct) => `Cost efficiency: ${pct}%`,
  resourcesRecommendImmediate: (count) => `Immediate reassignment of ${count} resources`,
  resourcesReviewPriorities: 'Review priorities on overdue tasks',
  resourcesAdjustEstimates: 'Adjust estimates for next phases',
});

// ============================================================
// RENDER ASIGNACION RECURSOS - VERSIÓN CORREGIDA CON FALLBACKS
// ============================================================
window.renderAsignacionRecursos = function(container) {
  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  // Traducciones de respaldo (fallback) en caso de que window.translations falte
  const fallback = {
    resourcesConfidential: '🔒 CONFIDENTIAL - For executive use only',
    resourcesTitle: '👥 Resource Intelligence Report',
    resourcesSubtitle: 'Capacity Analysis, Productivity & Resource Optimization',
    resourcesExecutiveSummary: '📋 Executive Summary',
    resourcesKeyFindings: '📊 Key Findings',
    resourcesHighSuccess: 'High success rate',
    resourcesModerateSuccess: 'Moderate success rate',
    resourcesLowSuccess: 'Low success rate',
    resourcesRecommendations: '💡 Strategic Recommendations',
    resourcesReviewPriorities: 'Review priorities on overdue tasks',
    resourcesAdjustEstimates: 'Adjust estimates for next phases',
    resourcesProductivity: 'Productivity',
    resourcesAvgProductivity: 'Average productivity of the team',
    resourcesEfficiency: 'Efficiency',
    resourcesEfficiencyCost: 'Real vs estimated hours',
    resourcesSuccessRate: 'Success Rate',
    resourcesOnTimeDelivery: 'Deliveries on time',
    resourcesFinancialImpact: 'Financial Impact',
    resourcesWorkloadDistribution: '📊 Workload Distribution by Resource',
    resourcesProductivityEfficiency: '📈 Productivity vs Efficiency Matrix',
    resourcesResource: 'Resource',
    resourcesTasks: 'Tasks',
    resourcesCompleted: 'Completed',
    resourcesInProgress: 'In Progress',
    resourcesPending: 'Pending',
    resourcesOverdue: 'Overdue',
    resourcesStatus: 'Status',
    resourcesOverloaded: 'Overloaded',
    resourcesWithDelays: 'With Delays',
    resourcesAvailable: 'Available',
    resourcesNormal: 'Normal',
    resourcesImmediateActions: '🎯 Immediate Actions (72h)',
    resourcesShortTerm: '📅 Short Term (2 weeks)',
    resourcesLongTerm: '🏆 Long Term (Quarterly)',
    resourcesMethodology: 'Methodology: Quantitative analysis based on historical productivity data. Complies with PMI standards.',
    resourcesGenerated: 'Generated',
    resourcesSource: 'Source: PM Virtual Executive Platform',
    // Funciones también con fallback
    resourcesOverloadedResources: (count) => `${count} resource(s) with critical overload`,
    resourcesOverdueTasks: (count) => `${count} overdue tasks`,
    resourcesEfficiencyPercent: (pct) => `Cost efficiency: ${pct}%`,
    resourcesRecommendImmediate: (count) => `Immediate reassignment of ${count} resources`,
    resourcesSavingOverrun: (value) => `${value >= 0 ? 'Projected savings' : 'Overrun'}`
  };

  // Función segura para obtener cualquier traducción
  function getTranslation(key, ...args) {
    // Primero intentar desde window.translations
    let val = window.translations && window.translations[key];
    // Si no existe, usar fallback
    if (val === undefined || val === null) {
      val = fallback[key];
    }
    // Si es función, ejecutarla con argumentos
    if (typeof val === 'function') {
      return val(...args);
    }
    // Si es string o número, devolverlo
    return val !== undefined && val !== null ? String(val) : '';
  }

  const proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
  if (!proyecto) {
    container.innerHTML = '<div style="text-align:center; padding:60px;">' + getTranslation('resourcesNoProject') + '</div>';
    return;
  }

  const tasks = proyecto.tasks || [];
  const hoy = new Date();

  // ... (resto del código de análisis igual) ...

  const recursos = {};
  tasks.forEach(function(t) {
    if (t.assignee) {
      if (!recursos[t.assignee]) {
        recursos[t.assignee] = {
          nombre: t.assignee,
          total: 0,
          completadas: 0,
          enProgreso: 0,
          pendientes: 0,
          atrasadas: 0,
          horasEst: 0,
          horasReal: 0,
          prioridadAlta: 0
        };
      }
      recursos[t.assignee].total++;
      recursos[t.assignee].horasEst += Number(t.estimatedTime) || 0;
      recursos[t.assignee].horasReal += Number(t.timeLogged) || 0;
      if (t.priority === 'high') recursos[t.assignee].prioridadAlta++;
      if (t.status === 'completed') recursos[t.assignee].completadas++;
      else if (t.status === 'inProgress') { recursos[t.assignee].enProgreso++; }
      else { recursos[t.assignee].pendientes++; }
      if (t.deadline && new Date(t.deadline) < hoy && t.status !== 'completed') {
        recursos[t.assignee].atrasadas++;
      }
    }
  });

  const totalRecursos = Object.keys(recursos).length;
  const totalTareas = tasks.length;
  const tareasCompletadas = tasks.filter(function(t) { return t.status === 'completed'; }).length;
  const tareasAtrasadas = tasks.filter(function(t) { return t.deadline && new Date(t.deadline) < hoy && t.status !== 'completed'; }).length;
  const tasaExito = totalTareas > 0 ? Math.round((tareasCompletadas / totalTareas) * 100) : 0;
  const horasTotalesEst = tasks.reduce(function(s, t) { return s + (Number(t.estimatedTime) || 0); }, 0);
  const horasTotalesReal = tasks.reduce(function(s, t) { return s + (Number(t.timeLogged) || 0); }, 0);
  const eficienciaCosto = horasTotalesEst > 0 ? Math.round((horasTotalesReal / horasTotalesEst) * 100) : 100;
  const costoEstimadoUSD = horasTotalesEst * 50;
  const costoRealUSD = horasTotalesReal * 50;
  const ahorroOverrun = costoRealUSD - costoEstimadoUSD;

  const recursosSobrecargados = Object.values(recursos).filter(function(r) { return r.enProgreso > 2; }).length;
  const productividadPromedio = totalRecursos > 0 ? Math.round(Object.values(recursos).reduce(function(s, r) { return s + ((r.completadas / Math.max(r.total,1)) * 100); }, 0) / totalRecursos) : 0;

  const saludColor = tasaExito >= 80 ? '#10b981' : tasaExito >= 60 ? '#f59e0b' : '#ef4444';
  const eficienciaColor = eficienciaCosto <= 105 ? '#10b981' : eficienciaCosto <= 115 ? '#f59e0b' : '#ef4444';

  // ========== GENERAR HTML ==========
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Executive Resource Report - ${escapeHtml(proyecto.name)}</title>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>
      <style>
        @media print { body { margin: 0; padding: 20px; } .no-print { display: none; } }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
          background: #eef2f6;
          padding: 40px;
          color: #1a2c3e;
        }
        .report { max-width: 1200px; margin: 0 auto; }
        .cover {
          background: linear-gradient(135deg, #0a2540, #1a4a6f);
          border-radius: 32px;
          padding: 60px;
          margin-bottom: 40px;
          text-align: center;
          color: white;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        .cover h1 { font-size: 42px; margin-bottom: 16px; letter-spacing: -1px; }
        .cover .date { font-size: 14px; opacity: 0.8; margin-bottom: 40px; }
        .cover-badge {
          background: rgba(255,255,255,0.15);
          display: inline-block;
          padding: 8px 24px;
          border-radius: 40px;
          font-size: 12px;
        }
        .executive-summary {
          background: white;
          border-radius: 24px;
          padding: 32px;
          margin-bottom: 32px;
          border-left: 6px solid #f5a623;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }
        .kpi-card {
          background: white;
          border-radius: 20px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .kpi-value { font-size: 36px; font-weight: 800; margin: 12px 0 4px; }
        .chart-card {
          background: white;
          border-radius: 20px;
          padding: 28px;
          margin-bottom: 32px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .resource-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .resource-table th, .resource-table td {
          padding: 14px 16px;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }
        .resource-table th { background: #f8fafc; font-weight: 600; }
        .footer {
          margin-top: 40px;
          padding: 24px;
          text-align: center;
          font-size: 11px;
          color: #94a3b8;
          border-top: 1px solid #e2e8f0;
        }
        .btn-print {
          background: #1a4a6f;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 40px;
          cursor: pointer;
          font-weight: 600;
          margin-bottom: 20px;
          float: right;
        }
        .badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="report">
        <button class="btn-print no-print" onclick="window.print()">📄 ${getTranslation('resourcesConfidential')}</button>
        <div style="clear:both"></div>

        <!-- PORTADA EJECUTIVA -->
        <div class="cover">
          <span class="cover-badge">🔒 ${getTranslation('resourcesConfidential')}</span>
          <h1>${getTranslation('resourcesTitle')}</h1>
          <p>${getTranslation('resourcesSubtitle')}</p>
          <div class="date">${escapeHtml(proyecto.name)} · ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          <div style="margin-top: 40px;">Prepared for the Executive Committee</div>
        </div>

        <!-- RESUMEN EJECUTIVO -->
        <div class="executive-summary">
          <h2 style="margin-bottom: 16px; color: #f5a623;">📋 ${getTranslation('resourcesExecutiveSummary')}</h2>
          <p style="line-height: 1.6; margin-bottom: 20px;">This report analyzes the performance and utilization of resources for project <strong>${escapeHtml(proyecto.name)}</strong>. Below are the key findings and strategic recommendations for the Executive Committee.</p>
          <div style="background: #f8fafc; padding: 20px; border-radius: 16px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div><strong>📊 ${getTranslation('resourcesKeyFindings')}</strong><br>• ${tasaExito >= 80 ? getTranslation('resourcesHighSuccess') : tasaExito >= 60 ? getTranslation('resourcesModerateSuccess') : getTranslation('resourcesLowSuccess')}: ${tasaExito}%<br>• ${getTranslation('resourcesOverloadedResources', recursosSobrecargados)}<br>• ${getTranslation('resourcesOverdueTasks', tareasAtrasadas)}<br>• ${getTranslation('resourcesEfficiencyPercent', eficienciaCosto)}</div>
              <div><strong>${getTranslation('resourcesRecommendations')}</strong><br>• ${recursosSobrecargados > 0 ? getTranslation('resourcesRecommendImmediate', recursosSobrecargados) : 'Maintain current load'}<br>• ${getTranslation('resourcesReviewPriorities')}<br>• ${getTranslation('resourcesAdjustEstimates')}</div>
            </div>
          </div>
        </div>

        <!-- KPI DASHBOARD -->
        <div class="kpi-grid">
          <div class="kpi-card"><div style="color:#64748b;">${getTranslation('resourcesProductivity')}</div><div class="kpi-value" style="color:#10b981;">${productividadPromedio}%</div><div>${getTranslation('resourcesAvgProductivity')}</div></div>
          <div class="kpi-card"><div style="color:#64748b;">${getTranslation('resourcesEfficiency')}</div><div class="kpi-value" style="color:${eficienciaColor};">${eficienciaCosto}%</div><div>${getTranslation('resourcesEfficiencyCost')}</div></div>
          <div class="kpi-card"><div style="color:#64748b;">${getTranslation('resourcesSuccessRate')}</div><div class="kpi-value" style="color:${saludColor};">${tasaExito}%</div><div>${getTranslation('resourcesOnTimeDelivery')}</div></div>
          <div class="kpi-card"><div style="color:#64748b;">${getTranslation('resourcesFinancialImpact')}</div><div class="kpi-value" style="color:${ahorroOverrun <= 0 ? '#10b981' : '#ef4444'};">${ahorroOverrun >= 0 ? '+' : '-'}$${Math.abs(Math.round(ahorroOverrun)).toLocaleString()}</div><div>${getTranslation('resourcesSavingOverrun', ahorroOverrun)}</div></div>
        </div>

        <!-- GRÁFICOS -->
        <div class="chart-card">
          <h3 style="margin-bottom: 20px;">${getTranslation('resourcesWorkloadDistribution')}</h3>
          <div style="display: flex; justify-content: center; align-items: center;">
            <div style="width: 100%; max-width: 700px; height: 300px;">
              <canvas id="workloadChart"></canvas>
            </div>
          </div>
        </div>

        <div class="chart-card">
          <h3 style="margin-bottom: 20px;">${getTranslation('resourcesProductivityEfficiency')}</h3>
          <div style="display: flex; justify-content: center; align-items: center;">
            <div style="width: 100%; max-width: 500px; height: 350px;">
              <canvas id="productivityChart"></canvas>
            </div>
          </div>
        </div>

        <!-- TABLA EJECUTIVA -->
        <div style="overflow-x: auto; margin-bottom: 32px;">
          <table class="resource-table">
            <thead><tr><th>${getTranslation('resourcesResource')}</th><th>${getTranslation('resourcesTasks')}</th><th>✅ ${getTranslation('resourcesCompleted')}</th><th>🔄 ${getTranslation('resourcesInProgress')}</th><th>⏳ ${getTranslation('resourcesPending')}</th><th>🔴 ${getTranslation('resourcesOverdue')}</th><th>${getTranslation('resourcesProductivity')}</th><th>${getTranslation('resourcesStatus')}</th></tr></thead>
            <tbody>
              ${Object.values(recursos).sort(function(a, b) { return b.enProgreso - a.enProgreso; }).map(function(r) {
                const prod = Math.round((r.completadas / Math.max(r.total,1)) * 100);
                let status = '';
                let statusColor = '';
                if (r.enProgreso > 2) { status = getTranslation('resourcesOverloaded'); statusColor = '#ef4444'; }
                else if (r.atrasadas > 0) { status = getTranslation('resourcesWithDelays'); statusColor = '#f97316'; }
                else if (r.enProgreso === 0 && r.pendientes > 0) { status = getTranslation('resourcesAvailable'); statusColor = '#10b981'; }
                else { status = getTranslation('resourcesNormal'); statusColor = '#3b82f6'; }
                return `<tr><td><strong>${escapeHtml(r.nombre)}</strong></td><td>${r.total}</td><td style="color:#10b981;">${r.completadas}</td><td style="color:#3b82f6;">${r.enProgreso}</td><td style="color:#f59e0b;">${r.pendientes}</td><td style="color:#ef4444;">${r.atrasadas}</td><td><div class="badge" style="background:${prod >= 80 ? '#10b98120' : '#f59e0b20'}; color:${prod >= 80 ? '#10b981' : '#f59e0b'};">${prod}%</div></td><td><span class="badge" style="background:${statusColor}20; color:${statusColor};">${status}</span></td></tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>

        <!-- RECOMENDACIONES ESTRATÉGICAS -->
        <div class="executive-summary" style="border-left-color: #10b981;">
          <h2 style="margin-bottom: 16px; color: #10b981;">💡 ${getTranslation('resourcesRecommendations')}</h2>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
            <div><strong>${getTranslation('resourcesImmediateActions')}</strong><br><br>• ${recursosSobrecargados > 0 ? 'Reassign tasks from ' + Object.values(recursos).filter(function(r) { return r.enProgreso > 2; }).map(function(r) { return r.nombre; }).join(', ') : 'Overloaded resources to available ones'}<br>• Review priority of ${tareasAtrasadas} overdue tasks</div>
            <div><strong>${getTranslation('resourcesShortTerm')}</strong><br><br>• Adjust time estimates<br>• Implement daily standups<br>• Training in workload management</div>
            <div><strong>${getTranslation('resourcesLongTerm')}</strong><br><br>• Review team structure<br>• Plan hires<br>• Implement OKRs per resource</div>
          </div>
        </div>

        <div class="footer">
          <p>${getTranslation('resourcesConfidential')}</p>
          <p>${getTranslation('resourcesMethodology')}</p>
          <p>${getTranslation('resourcesGenerated')}: ${new Date().toLocaleString('en-US')} | ${getTranslation('resourcesSource')}</p>
        </div>
      </div>

      <script>
        const recursosNames = ${JSON.stringify(Object.values(recursos).map(function(r) { return r.nombre.split(' ')[0]; }))};
        const workloadData = ${JSON.stringify(Object.values(recursos).map(function(r) { return Math.min(100, (r.enProgreso / 4) * 100); }))};
        const productivityData = ${JSON.stringify(Object.values(recursos).map(function(r) { return Math.round((r.completadas / Math.max(r.total,1)) * 100); }))};

        new Chart(document.getElementById('workloadChart'), {
          type: 'bar',
          data: { labels: recursosNames, datasets: [{ label: 'Workload (%)', data: workloadData, backgroundColor: '#f5a623', borderRadius: 8 }] },
          options: { responsive: true, maintainAspectRatio: true, scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: 'Workload (%)' } } } }
        });

        new Chart(document.getElementById('productivityChart'), {
          type: 'radar',
          data: { labels: recursosNames, datasets: [{ label: 'Productivity (%)', data: productivityData, backgroundColor: 'rgba(16,185,129,0.2)', borderColor: '#10b981', pointBackgroundColor: '#10b981' }] },
          options: { responsive: true, maintainAspectRatio: true, scales: { r: { beginAtZero: true, max: 100, ticks: { stepSize: 20 } } } }
        });
      <\/script>
    </body>
    </html>
  `;

  const ventana = window.open('', '_blank');
  if (!ventana) {
    alert('⚠️ Please allow popup windows to view the Resource Report.');
    return;
  }
  ventana.document.write(html);
  ventana.document.close();
};

console.log('✅ renderAsignacionRecursos corregido con fallbacks para todas las traducciones.');

// ============================================================
// AMPLIAR TRADUCCIONES PARA LA PESTAÑA COSTOS
// ============================================================
window.translations = Object.assign(window.translations || {}, {
  // Títulos y etiquetas de Costos
  costsTitle: '💰 Financial Intelligence Dashboard',
  costsSubtitle: 'Earned Value Management · Real-time Cost Control',
  costsNoProject: '⚠️ No project selected',
  costsNoTasks: '📭 No tasks registered',
  costsNoTasksMessage: 'Add tasks to the project to view financial metrics.',
  costsExportPDF: '📄 Export as PDF',
  costsPrint: '🖨️ Print Report',
  costsBAC: 'BAC (Budget at Completion)',
  costsAC: 'AC (Actual Cost)',
  costsEV: 'EV (Earned Value)',
  costsCV: 'CV (Cost Variance)',
  costsUnderBudget: 'Under budget',
  costsOverBudget: 'Over budget',
  costsEVM: 'Earned Value Management (EVM) Analysis',
  costsEVMSubtitle: 'Quantitative performance metrics following PMI standards',
  costsMetric: 'Metric',
  costsFormula: 'Formula',
  costsValue: 'Value',
  costsInterpretation: 'Interpretation',
  costsStatus: 'Status',
  costsSPI: 'SPI (Schedule Performance Index)',
  costsCPI: 'CPI (Cost Performance Index)',
  costsEAC: 'EAC (Estimate at Completion)',
  costsETC: 'ETC (Estimate to Complete)',
  costsVAC: 'VAC (Variance at Completion)',
  costsTCPI: 'TCPI (To-Complete Performance Index)',
  costsAheadSchedule: 'Ahead of schedule',
  costsSlightDelay: 'Slight delay',
  costsSignificantDelay: 'Significant delay',
  costsOnTrack: '✅ On Track',
  costsWatch: '⚠️ Watch',
  costsCritical: '🔴 Critical',
  costsEfficient: '✅ Efficient',
  costsOverrun: '🔴 Overrun',
  costsCostPerformance: 'Cost Performance Analysis',
  costsPV: 'PV (Planned Value)',
  costsEVLabel: 'EV (Earned Value)',
  costsACLabel: 'AC (Actual Cost)',
  costsFinancialForecast: 'Financial Forecast & Projections',
  costsOptimistic: 'Optimistic Scenario',
  costsMostLikely: 'Most Likely (EAC)',
  costsPessimistic: 'Pessimistic Scenario',
  costsContingency: 'Contingency margin recommended',
  costsExecutiveRecommendation: 'Executive Financial Recommendation',
  costsActionPlan: '📋 Strategic Action Plan:',
  costsImmediateActions: 'Immediate Actions',
  costsMitigationPlan: 'Mitigation Plan',
  costsNextReview: 'Next Review',
  costsConfidential: '🔒 CONFIDENTIAL - For executive use only',
  costsMethodology: 'Methodology: PMI EVM Standards · CPI = EV/AC · SPI = EV/PV · EAC = BAC/CPI',
  costsGenerated: 'Generated',
  costsSource: 'Source: PM Virtual Executive Platform',
});

// ============================================================
// RENDER COSTOS - VERSIÓN INGLESA
// ============================================================
window.renderLineaBaseCostos = function(container) {
  // Función auxiliar para escapar HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  // Obtener proyecto actual
  const proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
  if (!proyecto) {
    container.innerHTML = '<div style="text-align:center; padding:60px; background:#f8fafc; border-radius:32px;"><p style="color:#64748b;">' + window.translations.costsNoProject + '</p></div>';
    return;
  }

  const tasks = proyecto.tasks || [];
  const total = tasks.length;

  if (total === 0) {
    container.innerHTML = `
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 32px; padding: 60px; text-align: center;">
        <div style="font-size: 64px; margin-bottom: 20px;">💰</div>
        <h3 style="margin: 0; color: #e2e8f0; font-size: 24px;">${window.translations.costsNoTasks}</h3>
        <p style="color: #94a3b8; margin-top: 12px;">${window.translations.costsNoTasksMessage}</p>
      </div>
    `;
    return;
  }

  // ========== MÉTRICAS FINANCIERAS AVANZADAS ==========
  const presupuesto = tasks.reduce(function(s, t) { return s + (Number(t.estimatedTime) || 0); }, 0);
  const gastado = tasks.reduce(function(s, t) { return s + (Number(t.timeLogged) || 0); }, 0);
  const desviacion = presupuesto - gastado;
  const porcentajeEjecucion = presupuesto > 0 ? (gastado / presupuesto) * 100 : 0;

  const completadas = tasks.filter(function(t) { return t.status === 'completed'; }).length;
  const enProgreso = tasks.filter(function(t) { return t.status === 'inProgress'; }).length;
  const pendientes = tasks.filter(function(t) { return t.status === 'pending'; }).length;
  const rezagadas = tasks.filter(function(t) { return t.status === 'overdue' || t.status === 'rezagado'; }).length;

  // ========== CÁLCULOS EVM CORRECTOS ==========
  const PV = presupuesto;

  let EV = 0;
  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    var estimado = Number(task.estimatedTime) || 0;
    var registrado = Number(task.timeLogged) || 0;

    if (task.status === 'completed') {
      EV += estimado;
    } else if (task.status === 'inProgress' || task.status === 'rezagado' || task.status === 'overdue') {
      var progreso = Math.min(1, registrado / (estimado || 1));
      EV += estimado * progreso;
    }
  }

  const AC = gastado;
  const SV = EV - PV;
  const CV = EV - AC;
  const SPI = PV > 0 ? EV / PV : 1;
  const CPI = AC > 0 ? EV / AC : 1;
  const EAC = CPI > 0 ? PV / CPI : PV;
  const ETC = Math.max(0, EAC - AC);
  const VAC = PV - EAC;
  const TCPI = (PV - EV) / Math.max((PV - AC), 0.01);
  const porcentajeAvance = total > 0 ? (completadas / total) * 100 : 0;

  // ========== ESTADO FINANCIERO ==========
  var estadoFinanciero = {};
  if (CPI >= 0.95 && SPI >= 0.95) {
    estadoFinanciero = { nivel: 'EXCELLENT', color: '#10b981', bg: 'rgba(16,185,129,0.15)', icono: '🏆' };
  } else if (CPI >= 0.85 && SPI >= 0.85) {
    estadoFinanciero = { nivel: 'WATCH', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', icono: '⚠️' };
  } else if (CPI >= 0.7 && SPI >= 0.7) {
    estadoFinanciero = { nivel: 'ATTENTION', color: '#f97316', bg: 'rgba(249,115,22,0.15)', icono: '🔴' };
  } else {
    estadoFinanciero = { nivel: 'CRITICAL', color: '#ef4444', bg: 'rgba(239,68,68,0.15)', icono: '💀' };
  }

  // ========== PROYECCIONES FINANCIERAS ==========
  var proyeccionOptimista = EAC * 0.9;
  var proyeccionPesimista = EAC * 1.2;
  var margenContingencia = (proyeccionPesimista - EAC) / EAC * 100;

  // ========== FORMATO DE MONEDA ==========
  var formatMoney = function(h) {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(h) + ' hrs';
  };

  var formatPercent = function(p) {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(p) + '%';
  };

  var formatCurrency = function(usd) {
    return 'USD ' + new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(usd);
  };

  // Conversión a USD (estimado 50/hora)
  var presupuestoUSD = presupuesto * 50;
  var gastadoUSD = gastado * 50;
  var evUSD = EV * 50;
  var eacUSD = EAC * 50;

  // ========== HTML DEL REPORTE ==========
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Financial Dashboard - ${escapeHtml(proyecto.name)}</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>
    <style>
      @media print {
        body { margin: 0; padding: 20px; }
        .no-print { display: none !important; }
        .page-break { page-break-before: always; }
        .kpi-card, .chart-container, .financial-card { break-inside: avoid; }
      }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
        background: #f0f4f8;
        padding: 40px;
        color: #1e293b;
      }
      .report-container {
        max-width: 1400px;
        margin: 0 auto;
      }
      .btn-group {
        display: flex;
        gap: 16px;
        justify-content: flex-end;
        margin-bottom: 24px;
      }
      .btn-pdf, .btn-print {
        border: none;
        padding: 12px 28px;
        border-radius: 40px;
        color: white;
        font-weight: 600;
        font-size: 13px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        transition: transform 0.2s;
      }
      .btn-pdf { background: linear-gradient(135deg, #dc2626, #b91c1c); }
      .btn-print { background: linear-gradient(135deg, #3b82f6, #2563eb); }
      .btn-pdf:hover, .btn-print:hover { transform: scale(1.02); }
      .corporate-header {
        background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
        border-radius: 32px;
        padding: 48px;
        margin-bottom: 32px;
        position: relative;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
      }
      .corporate-header::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -20%;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(139,92,246,0.15), transparent);
        border-radius: 50%;
      }
      .kpi-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
        margin-bottom: 32px;
      }
      .kpi-card {
        background: white;
        border-radius: 24px;
        padding: 24px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        border: 1px solid #e2e8f0;
        transition: all 0.2s;
      }
      .kpi-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -8px rgba(0,0,0,0.15); }
      .kpi-value {
        font-size: 42px;
        font-weight: 800;
        line-height: 1.2;
        margin: 12px 0 4px 0;
      }
      .progress-bar-bg {
        background: #e2e8f0;
        height: 8px;
        border-radius: 10px;
        overflow: hidden;
      }
      .progress-bar-fill {
        height: 100%;
        border-radius: 10px;
        transition: width 0.3s;
      }
      .chart-container {
        background: white;
        border-radius: 24px;
        padding: 28px;
        margin-bottom: 32px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        border: 1px solid #e2e8f0;
      }
      .financial-table {
        width: 100%;
        border-collapse: collapse;
      }
      .financial-table th, .financial-table td {
        padding: 14px 16px;
        text-align: left;
        border-bottom: 1px solid #e2e8f0;
      }
      .financial-table th {
        background: #f8fafc;
        font-weight: 600;
        color: #1e293b;
      }
      .metric-badge {
        display: inline-block;
        padding: 6px 16px;
        border-radius: 40px;
        font-size: 12px;
        font-weight: 600;
      }
      .footer {
        background: white;
        border-radius: 20px;
        padding: 24px;
        text-align: center;
        border: 1px solid #e2e8f0;
        margin-top: 32px;
      }
      .evm-indicator {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 4px;
        margin-right: 8px;
      }
    </style>
  </head>
  <body>
    <div class="report-container">
      <div class="btn-group no-print">
        <button class="btn-pdf" id="btnExportPDF">${window.translations.costsExportPDF}</button>
        <button class="btn-print" id="btnPrint">${window.translations.costsPrint}</button>
      </div>

      <!-- HEADER CORPORATE -->
      <div class="corporate-header">
        <div style="position: relative; z-index: 2;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
            <div>
              <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
                <div style="background: linear-gradient(135deg, #10b981, #059669); width: 60px; height: 60px; border-radius: 20px; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 32px;">💰</span>
                </div>
                <div>
                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: white; letter-spacing: -0.5px;">${window.translations.costsTitle}</h1>
                  <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 14px;">${window.translations.costsSubtitle}</p>
                </div>
              </div>
              <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                <div style="background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); padding: 8px 24px; border-radius: 40px;">
                  <span style="color: #10b981;">🎯</span>
                  <span style="color: #cbd5e1;">${escapeHtml(proyecto.name)}</span>
                </div>
                <div style="background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); padding: 8px 24px; border-radius: 40px;">
                  <span style="color: #3b82f6;">📅</span>
                  <span style="color: #cbd5e1;">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </div>
            <div style="background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border-radius: 28px; padding: 20px 32px; text-align: center; border: 1px solid rgba(255,255,255,0.1);">
              <div style="font-size: 11px; color: #94a3b8; letter-spacing: 1.5px;">FINANCIAL HEALTH RATING</div>
              <div style="font-size: 56px; font-weight: 800; color: ${estadoFinanciero.color};">${CPI.toFixed(2)}</div>
              <div style="font-size: 12px; color: ${estadoFinanciero.color};">CPI Score · ${estadoFinanciero.nivel}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- KPI EXECUTIVE DASHBOARD -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div style="display: flex; justify-content: space-between;">
            <span style="font-size: 13px; color: #64748b; font-weight: 500;">${window.translations.costsBAC}</span>
            <span style="font-size: 24px;">📋</span>
          </div>
          <div class="kpi-value" style="color: #0f172a;">${formatMoney(presupuesto)}</div>
          <div style="margin-top: 8px; font-size: 12px; color: #64748b;">${formatCurrency(presupuestoUSD)}</div>
        </div>
        <div class="kpi-card">
          <div style="display: flex; justify-content: space-between;">
            <span style="font-size: 13px; color: #64748b; font-weight: 500;">${window.translations.costsAC}</span>
            <span style="font-size: 24px;">💰</span>
          </div>
          <div class="kpi-value" style="color: ${gastado > presupuesto ? '#ef4444' : '#0f172a'};">${formatMoney(gastado)}</div>
          <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${Math.min(100, porcentajeEjecucion)}%; background: ${gastado > presupuesto ? '#ef4444' : '#10b981'};"></div></div>
        </div>
        <div class="kpi-card">
          <div style="display: flex; justify-content: space-between;">
            <span style="font-size: 13px; color: #64748b; font-weight: 500;">${window.translations.costsEV}</span>
            <span style="font-size: 24px;">✨</span>
          </div>
          <div class="kpi-value" style="color: #059669;">${formatMoney(EV)}</div>
          <div style="margin-top: 8px; font-size: 12px; color: #64748b;">${formatPercent(porcentajeAvance)} of work completed</div>
        </div>
        <div class="kpi-card">
          <div style="display: flex; justify-content: space-between;">
            <span style="font-size: 13px; color: #64748b; font-weight: 500;">${window.translations.costsCV}</span>
            <span style="font-size: 24px;">${CV >= 0 ? '🟢' : '🔴'}</span>
          </div>
          <div class="kpi-value" style="color: ${CV >= 0 ? '#059669' : '#dc2626'};">${CV >= 0 ? '+' : ''}${formatMoney(CV)}</div>
          <div style="margin-top: 8px; font-size: 12px; color: ${CV >= 0 ? '#10b981' : '#ef4444'};">${CV >= 0 ? window.translations.costsUnderBudget : window.translations.costsOverBudget}</div>
        </div>
      </div>

      <!-- EARNED VALUE MANAGEMENT TABLE -->
      <div class="chart-container">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <h3 style="margin: 0; font-size: 18px; font-weight: 700;">${window.translations.costsEVM}</h3>
            <p style="margin: 8px 0 0 0; font-size: 13px; color: #64748b;">${window.translations.costsEVMSubtitle}</p>
          </div>
        </div>
        <div style="overflow-x: auto;">
          <table class="financial-table">
            <thead>
              <tr><th>${window.translations.costsMetric}</th><th>${window.translations.costsFormula}</th><th>${window.translations.costsValue}</th><th>${window.translations.costsInterpretation}</th><th>${window.translations.costsStatus}</th></tr>
            </thead>
            <tbody>
              <tr><td style="font-weight:600;">${window.translations.costsSPI}</td><td style="font-family:monospace;">EV / PV</td><td style="font-weight:700;">${SPI.toFixed(2)}</td><td>${SPI >= 1 ? window.translations.costsAheadSchedule : SPI >= 0.9 ? window.translations.costsSlightDelay : window.translations.costsSignificantDelay}</td><td><span class="metric-badge" style="background:${SPI >= 1 ? '#10b98120' : SPI >= 0.9 ? '#f59e0b20' : '#ef444420'}; color:${SPI >= 1 ? '#10b981' : SPI >= 0.9 ? '#f59e0b' : '#ef4444'};">${SPI >= 1 ? window.translations.costsOnTrack : SPI >= 0.9 ? window.translations.costsWatch : window.translations.costsCritical}</span></td></tr>
              <tr style="background:#f8fafc;"><td style="font-weight:600;">${window.translations.costsCPI}</td><td style="font-family:monospace;">EV / AC</td><td style="font-weight:700;">${CPI.toFixed(2)}</td><td>${CPI >= 1 ? window.translations.costsUnderBudget : CPI >= 0.9 ? 'Slight overrun' : 'Significant overrun'}</td><td><span class="metric-badge" style="background:${CPI >= 1 ? '#10b98120' : CPI >= 0.9 ? '#f59e0b20' : '#ef444420'}; color:${CPI >= 1 ? '#10b981' : CPI >= 0.9 ? '#f59e0b' : '#ef4444'};">${CPI >= 1 ? window.translations.costsEfficient : CPI >= 0.9 ? window.translations.costsWatch : window.translations.costsCritical}</span></td></tr>
              <tr><td style="font-weight:600;">${window.translations.costsEAC}</td><td style="font-family:monospace;">BAC / CPI</td><td style="font-weight:700;">${formatMoney(EAC)}</td><td colspan="2">Projected total cost at completion</td></tr>
              <tr style="background:#f8fafc;"><td style="font-weight:600;">${window.translations.costsETC}</td><td style="font-family:monospace;">EAC - AC</td><td style="font-weight:700;">${formatMoney(ETC)}</td><td colspan="2">Budget required to finish remaining work</td></tr>
              <tr><td style="font-weight:600;">${window.translations.costsVAC}</td><td style="font-family:monospace;">BAC - EAC</td><td style="font-weight:700; color:${VAC >= 0 ? '#059669' : '#dc2626'};">${VAC >= 0 ? '+' : ''}${formatMoney(VAC)}</td><td colspan="2">${VAC >= 0 ? 'Projected savings' : 'Projected overrun'}</td></tr>
              <tr style="background:#f8fafc;"><td style="font-weight:600;">${window.translations.costsTCPI}</td><td style="font-family:monospace;">(BAC-EV)/(BAC-AC)</td><td style="font-weight:700;">${TCPI.toFixed(2)}</td><td colspan="2">${TCPI <= 1 ? 'Achievable with current efficiency' : TCPI <= 1.2 ? 'Requires increased efficiency' : 'Very challenging to achieve'}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- COMPARATIVE CHART PV vs EV vs AC -->
      <div class="chart-container">
        <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 700;">${window.translations.costsCostPerformance}</h3>
        <div style="display: flex; justify-content: center; align-items: center; min-height: 350px;">
          <div style="width: 100%; max-width: 800px; height: 300px;">
            <canvas id="evmChart"></canvas>
          </div>
        </div>
        <div style="display: flex; justify-content: center; gap: 32px; margin-top: 24px; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 8px;"><span style="width: 16px; height: 16px; background: #3b82f6; border-radius: 4px;"></span><span style="font-size: 12px;">${window.translations.costsPV}</span></div>
          <div style="display: flex; align-items: center; gap: 8px;"><span style="width: 16px; height: 16px; background: #10b981; border-radius: 4px;"></span><span style="font-size: 12px;">${window.translations.costsEVLabel}</span></div>
          <div style="display: flex; align-items: center; gap: 8px;"><span style="width: 16px; height: 16px; background: #ef4444; border-radius: 4px;"></span><span style="font-size: 12px;">${window.translations.costsACLabel}</span></div>
        </div>
      </div>

      <!-- FORECAST & PROJECTIONS -->
      <div class="chart-container">
        <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 700;">${window.translations.costsFinancialForecast}</h3>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
          <div style="text-align: center; padding: 20px; background: #f8fafc; border-radius: 20px;">
            <div style="font-size: 13px; color: #64748b;">${window.translations.costsOptimistic}</div>
            <div style="font-size: 32px; font-weight: 800; color: #10b981;">${formatMoney(proyeccionOptimista)}</div>
            <div style="font-size: 12px; margin-top: 8px;">-10% vs EAC</div>
          </div>
          <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #8b5cf6, #6d28d9); border-radius: 20px; color: white;">
            <div style="font-size: 13px; opacity: 0.8;">${window.translations.costsMostLikely}</div>
            <div style="font-size: 32px; font-weight: 800;">${formatMoney(EAC)}</div>
            <div style="font-size: 12px; margin-top: 8px;">Current CPI trend</div>
          </div>
          <div style="text-align: center; padding: 20px; background: #f8fafc; border-radius: 20px;">
            <div style="font-size: 13px; color: #64748b;">${window.translations.costsPessimistic}</div>
            <div style="font-size: 32px; font-weight: 800; color: #ef4444;">${formatMoney(proyeccionPesimista)}</div>
            <div style="font-size: 12px; margin-top: 8px;">+20% vs EAC</div>
          </div>
        </div>
        <div style="margin-top: 24px; padding: 16px; background: #f8fafc; border-radius: 16px; text-align: center;">
          <span style="font-size: 12px; color: #64748b;">📊 ${window.translations.costsContingency}: ${margenContingencia.toFixed(1)}% of EAC</span>
        </div>
      </div>

      <!-- EXECUTIVE RECOMMENDATION -->
      <div class="chart-container" style="background: linear-gradient(135deg, ${estadoFinanciero.color}10, ${estadoFinanciero.color}05); border: 1px solid ${estadoFinanciero.color}30;">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
          <div style="font-size: 40px;">${estadoFinanciero.icono}</div>
          <div>
            <h3 style="margin: 0; font-size: 18px; font-weight: 700; color: ${estadoFinanciero.color};">${window.translations.costsExecutiveRecommendation}</h3>
            <p style="margin: 8px 0 0 0; color: #475569;">Based on EVM quantitative analysis</p>
          </div>
        </div>
        <p style="font-size: 16px; font-weight: 500; margin-bottom: 16px;">
          ${CPI >= 0.95 && SPI >= 0.95 ? '✅ Project financial health is EXCELLENT. Maintain current trajectory and document best practices.' :
            CPI >= 0.85 && SPI >= 0.85 ? '⚠️ Financial performance requires WATCH. Implement cost control measures and review estimates.' :
            CPI >= 0.7 && SPI >= 0.7 ? '🔴 Executive ATTENTION needed. Cost overrun detected. Immediate mitigation plan required.' :
            '💀 CRITICAL financial state. Board notification required. Consider project restructuring.'}
        </p>
        <div style="background: white; border-radius: 16px; padding: 16px; margin-top: 16px;">
          <strong>${window.translations.costsActionPlan}</strong>
          ${CPI < 0.85 ? ' • Implement cost reduction measures • Re-negotiate vendor contracts • Freeze non-critical spending' : ''}
          ${SPI < 0.85 ? ' • Accelerate critical path activities • Add resources to delayed tasks • Adjust baseline schedule' : ''}
          ${CV < 0 ? ' • Review time estimates • Improve resource productivity • Weekly financial review' : ' • Maintain efficiency • Recognize team performance'}
        </div>
      </div>

      <!-- STRATEGIC RECOMMENDATIONS -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 32px;">
        <div style="background: white; border-radius: 20px; padding: 20px; border: 1px solid #e2e8f0;">
          <div style="font-size: 32px; margin-bottom: 12px;">🎯</div>
          <div style="font-weight: 700; margin-bottom: 8px;">${window.translations.costsImmediateActions}</div>
          <ul style="margin-left: 20px; color: #475569; font-size: 12px; line-height: 1.6;">
            <li>${CPI < 0.9 ? '🔴 Activate cost contingency plan' : '✅ Maintain current efficiency'}</li>
            <li>${SPI < 0.9 ? '⚠️ Expedite delayed milestones' : '📌 Monitor schedule variance'}</li>
            <li>Review remaining budget allocation</li>
          </ul>
        </div>
        <div style="background: white; border-radius: 20px; padding: 20px; border: 1px solid #e2e8f0;">
          <div style="font-size: 32px; margin-bottom: 12px;">📊</div>
          <div style="font-weight: 700; margin-bottom: 8px;">${window.translations.costsMitigationPlan}</div>
          <ul style="margin-left: 20px; color: #475569; font-size: 12px; line-height: 1.6;">
            <li>${ETC > 0 ? 'Reserve ' + formatMoney(ETC * 0.15) + ' for contingency' : 'No additional contingency needed'}</li>
            <li>Bi-weekly financial steering committee</li>
            <li>Real-time EVM dashboard monitoring</li>
          </ul>
        </div>
        <div style="background: white; border-radius: 20px; padding: 20px; border: 1px solid #e2e8f0;">
          <div style="font-size: 32px; margin-bottom: 12px;">📅</div>
          <div style="font-weight: 700; margin-bottom: 8px;">${window.translations.costsNextReview}</div>
          <ul style="margin-left: 20px; color: #475569; font-size: 12px; line-height: 1.6;">
            <li>Financial Committee: ${new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-US')}</li>
            <li>Monthly Board Report due</li>
            <li>Annual budget reforecast: Q4</li>
          </ul>
        </div>
      </div>

      <!-- FOOTER -->
      <div class="footer">
        <p style="color: #64748b; font-size: 11px; margin: 0;">
          <strong>${window.translations.costsConfidential}</strong><br>
          ${window.translations.costsMethodology}<br>
          ${window.translations.costsGenerated}: ${new Date().toLocaleString('en-US')} | ${window.translations.costsSource}
        </p>
      </div>
    </div>

    <script>
      new Chart(document.getElementById('evmChart'), {
        type: 'bar',
        data: {
          labels: ['PV (Planned)', 'EV (Earned)', 'AC (Actual)'],
          datasets: [{
            label: 'Hours',
            data: [${PV}, ${EV}, ${AC}],
            backgroundColor: ['#3b82f6', '#10b981', '#ef4444'],
            borderRadius: 8,
            barPercentage: 0.6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: function(ctx) { return ctx.dataset.label + ': ' + ctx.raw.toFixed(1) + ' hrs'; } } }
          },
          scales: {
            y: { beginAtZero: true, title: { display: true, text: 'Hours', font: { size: 11 } } },
            x: { ticks: { font: { size: 12, weight: 'bold' } } }
          }
        }
      });

      document.getElementById('btnExportPDF').onclick = function() { window.print(); };
      document.getElementById('btnPrint').onclick = function() { window.print(); };
    <\/script>
  </body>
  </html>`;

  const ventana = window.open('', '_blank');
  if (!ventana) {
    alert('⚠️ Please allow popup windows to view the financial report.');
    return;
  }
  ventana.document.write(html);
  ventana.document.close();
};

console.log('✅ renderLineaBaseCostos traducido al inglés. Abre el modal y ve a la pestaña Costos para probar.');

// ============================================================
// AMPLIAR TRADUCCIONES PARA LA PESTAÑA CAMBIOS
// ============================================================
window.translations = Object.assign(window.translations || {}, {
  // Títulos y etiquetas de Cambios
  changesTitle: '🔄 Change Control System',
  changesSubtitle: 'PMI/ITIL Change Management',
  changesNoProject: '⚠️ No project selected',
  changesTotal: 'Total',
  changesApproved: 'Approved',
  changesPending: 'Pending',
  changesRejected: 'Rejected',
  changesImplemented: 'Implemented',
  changesSuccessRate: 'SUCCESS RATE',
  changesNewRequest: '➕ New Change Request',
  changesExportReport: '📄 Export Report',
  changesExportAudit: '📄 Export Audit Log',
  changesFilter: 'Filter by status',
  changesAllStatuses: 'All statuses',
  changesRegistered: 'Registered',
  changesUnderEvaluation: 'Under Evaluation',
  changesApprovedStatus: 'Approved',
  changesRejectedStatus: 'Rejected',
  changesImplementedStatus: 'Implemented',
  changesID: 'ID',
  changesRequest: 'Request',
  changesType: 'Type',
  changesImpact: 'Impact',
  changesStatus: 'Status',
  changesDate: 'Date',
  changesActions: 'Actions',
  changesView: 'View',
  changesEvaluate: 'Evaluate',
  changesApprove: 'Approve',
  changesRejectAction: 'Reject',
  changesImplement: 'Implement',
  changesNewRequestTitle: 'New Change Request',
  changesTitleLabel: 'Title',
  changesDescription: 'Description',
  changesTypeLabel: 'Type',
  changesStandard: 'Standard',
  changesNormal: 'Normal',
  changesMajor: 'Major',
  changesEmergency: 'Emergency',
  changesImpactLabel: 'Impact',
  changesLow: 'Low',
  changesMedium: 'Medium',
  changesHigh: 'High',
  changesCritical: 'Critical',
  changesRequester: 'Requester',
  changesSave: '💾 Save',
  changesCancel: '❌ Cancel',
  changesConfirmDelete: 'Are you sure you want to delete this request?',
  changesRequestDeleted: 'Request deleted',
  changesConfirmStartEvaluation: 'Start evaluation of this request?',
  changesEvaluationStarted: 'Evaluation started',
  changesConfirmApprove: 'Approve this request?',
  changesRequestApproved: 'Request approved',
  changesRejectReason: 'Reason for rejection:',
  changesRequestRejected: 'Request rejected',
  changesConfirmImplement: 'Mark as implemented?',
  changesRequestImplemented: 'Request implemented',
  changesDetailsTitle: 'REQUEST DETAILS',
  changesNoRequests: '📭 No change requests registered.',
  changesConfidential: '🔒 CONFIDENTIAL - Change Control System PMI/ITIL',
});

// ============================================================
// RENDER GESTION CAMBIOS - VERSIÓN INGLESA
// ============================================================

// Variables globales (usando las existentes)
window.solicitudesCambioMaster = window.solicitudesCambioMaster || JSON.parse(localStorage.getItem('solicitudesCambio') || '[]');
window.auditoriaCambiosMaster = window.auditoriaCambiosMaster || JSON.parse(localStorage.getItem('auditoriaCambios') || '[]');
window.renderGestionCambios = function(container) {
  // Función para escapar HTML
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  const proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
  if (!proyecto) {
    container.innerHTML = '<div style="text-align:center; padding:40px; color:#94a3b8;">' + window.translations.changesNoProject + '</div>';
    return;
  }

  // Recargar datos
  let solicitudesGlobal = JSON.parse(localStorage.getItem('solicitudesCambio') || '[]');
  let auditoriaGlobal = JSON.parse(localStorage.getItem('auditoriaCambios') || '[]');

  let cambiosProyecto = solicitudesGlobal.filter(function(s) { return s.proyectoId === proyecto.name; });
  let auditoriaProyecto = auditoriaGlobal.filter(function(a) { return a.proyectoId === proyecto.name; });

  function guardarTodo() {
    localStorage.setItem('solicitudesCambio', JSON.stringify(solicitudesGlobal));
    localStorage.setItem('auditoriaCambios', JSON.stringify(auditoriaGlobal));
  }

  function agregarAuditoria(cambioId, accion, detalles) {
    auditoriaGlobal.push({
      id: Date.now(),
      proyectoId: proyecto.name,
      cambioId: cambioId,
      accion: accion,
      detalles: detalles,
      usuario: 'Change Manager',
      fecha: new Date().toISOString()
    });
    guardarTodo();
  }

  function getColorImpacto(impacto) {
    if (impacto === window.translations.changesCritical) return '#dc2626';
    if (impacto === window.translations.changesHigh) return '#f97316';
    if (impacto === window.translations.changesMedium) return '#f59e0b';
    return '#10b981';
  }

  function getColorEstado(estado) {
    if (estado === window.translations.changesApprovedStatus) return '#10b981';
    if (estado === window.translations.changesRejectedStatus) return '#ef4444';
    if (estado === window.translations.changesImplementedStatus) return '#8b5cf6';
    if (estado === window.translations.changesUnderEvaluation) return '#3b82f6';
    if (estado === window.translations.changesRegistered) return '#f59e0b';
    return '#f59e0b';
  }

  function getIconoTipo(tipo) {
    if (tipo === window.translations.changesEmergency) return '🚨';
    if (tipo === window.translations.changesMajor) return '⚠️';
    if (tipo === window.translations.changesNormal) return '📋';
    return '✅';
  }

  // Abrir modal nueva solicitud
  function abrirModalNuevo() {
    let modalDiv = document.createElement('div');
    modalDiv.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:100000; display:flex; align-items:center; justify-content:center;';

    modalDiv.innerHTML = `
      <div style="background:#1e293b; border-radius:24px; padding:32px; width:600px; max-width:90vw; max-height:85vh; overflow-y:auto; border-top:4px solid #ea580c;">
        <h2 style="color:white; margin:0 0 20px 0; text-align:center;">${window.translations.changesNewRequestTitle}</h2>
        <div style="margin-bottom:15px;"><label style="color:#94a3b8; font-size:12px; display:block; margin-bottom:5px;">${window.translations.changesTitleLabel}</label><input type="text" id="modalTitulo" style="width:100%; padding:12px; border-radius:8px; border:1px solid #ea580c; background:#0f172a; color:white;"></div>
        <div style="margin-bottom:15px;"><label style="color:#94a3b8; font-size:12px; display:block; margin-bottom:5px;">${window.translations.changesDescription}</label><textarea id="modalDescripcion" rows="3" style="width:100%; padding:12px; border-radius:8px; border:1px solid #ea580c; background:#0f172a; color:white;"></textarea></div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
          <div><label style="color:#94a3b8; font-size:12px; display:block; margin-bottom:5px;">${window.translations.changesTypeLabel}</label><select id="modalTipo" style="width:100%; padding:10px; border-radius:8px; background:#0f172a; color:white; border:1px solid #ea580c;"><option>${window.translations.changesStandard}</option><option>${window.translations.changesNormal}</option><option>${window.translations.changesMajor}</option><option>${window.translations.changesEmergency}</option></select></div>
          <div><label style="color:#94a3b8; font-size:12px; display:block; margin-bottom:5px;">${window.translations.changesImpactLabel}</label><select id="modalImpacto" style="width:100%; padding:10px; border-radius:8px; background:#0f172a; color:white; border:1px solid #ea580c;"><option>${window.translations.changesLow}</option><option>${window.translations.changesMedium}</option><option>${window.translations.changesHigh}</option><option>${window.translations.changesCritical}</option></select></div>
        </div>
        <div style="margin-bottom:20px;"><label style="color:#94a3b8; font-size:12px; display:block; margin-bottom:5px;">${window.translations.changesRequester}</label><input type="text" id="modalSolicitante" style="width:100%; padding:12px; border-radius:8px; border:1px solid #ea580c; background:#0f172a; color:white;"></div>
        <div style="display:flex; gap:15px; justify-content:center;"><button id="modalGuardar" style="background:#10b981; border:none; padding:10px 25px; border-radius:40px; color:white; cursor:pointer;">${window.translations.changesSave}</button><button id="modalCancelar" style="background:#ef4444; border:none; padding:10px 25px; border-radius:40px; color:white; cursor:pointer;">${window.translations.changesCancel}</button></div>
      </div>
    `;

    document.body.appendChild(modalDiv);

    document.getElementById('modalGuardar').onclick = function() {
      let titulo = document.getElementById('modalTitulo').value.trim();
      let descripcion = document.getElementById('modalDescripcion').value.trim();
      if (!titulo || !descripcion) {
        alert('⚠️ ' + window.translations.changesTitleLabel + ' and ' + window.translations.changesDescription + ' are required');
        return;
      }

      let nuevoCambio = {
        id: Date.now(),
        proyectoId: proyecto.name,
        titulo: titulo,
        descripcion: descripcion,
        tipo: document.getElementById('modalTipo').value,
        impacto: document.getElementById('modalImpacto').value,
        solicitante: document.getElementById('modalSolicitante').value.trim() || 'Anonymous',
        estado: window.translations.changesRegistered,
        fecha: new Date().toISOString()
      };

      solicitudesGlobal.push(nuevoCambio);
      guardarTodo();
      agregarAuditoria(nuevoCambio.id, 'CREATION', 'Request created: ' + titulo);
      modalDiv.remove();
      window.renderGestionCambios(container);
    };

    document.getElementById('modalCancelar').onclick = function() { modalDiv.remove(); };
  }

  // Ver detalle
  function verDetalle(idx) {
    let c = cambiosProyecto[idx];
    alert(
      window.translations.changesDetailsTitle + '\n\n' +
      window.translations.changesTitleLabel + ': ' + c.titulo + '\n' +
      window.translations.changesDescription + ': ' + (c.descripcion || 'N/A') + '\n' +
      window.translations.changesTypeLabel + ': ' + c.tipo + '\n' +
      window.translations.changesImpactLabel + ': ' + c.impacto + '\n' +
      window.translations.changesStatus + ': ' + c.estado + '\n' +
      window.translations.changesRequester + ': ' + (c.solicitante || 'N/A') + '\n' +
      window.translations.changesDate + ': ' + new Date(c.fecha).toLocaleString()
    );
  }

  function iniciarEvaluacion(idx) {
    if (confirm(window.translations.changesConfirmStartEvaluation)) {
      let globalIdx = solicitudesGlobal.findIndex(function(s) { return s.id === cambiosProyecto[idx].id; });
      solicitudesGlobal[globalIdx].estado = window.translations.changesUnderEvaluation;
      guardarTodo();
      agregarAuditoria(cambiosProyecto[idx].id, 'EVALUATION', 'Evaluation started');
      window.renderGestionCambios(container);
    }
  }

  function aprobarCambio(idx) {
    if (confirm(window.translations.changesConfirmApprove)) {
      let globalIdx = solicitudesGlobal.findIndex(function(s) { return s.id === cambiosProyecto[idx].id; });
      solicitudesGlobal[globalIdx].estado = window.translations.changesApprovedStatus;
      guardarTodo();
      agregarAuditoria(cambiosProyecto[idx].id, 'APPROVAL', 'Request approved');
      window.renderGestionCambios(container);
    }
  }

  function rechazarCambio(idx) {
    let motivo = prompt(window.translations.changesRejectReason);
    if (motivo !== null) {
      let globalIdx = solicitudesGlobal.findIndex(function(s) { return s.id === cambiosProyecto[idx].id; });
      solicitudesGlobal[globalIdx].estado = window.translations.changesRejectedStatus;
      guardarTodo();
      agregarAuditoria(cambiosProyecto[idx].id, 'REJECTION', 'Reason: ' + motivo);
      window.renderGestionCambios(container);
    }
  }

  function marcarImplementada(idx) {
    if (confirm(window.translations.changesConfirmImplement)) {
      let globalIdx = solicitudesGlobal.findIndex(function(s) { return s.id === cambiosProyecto[idx].id; });
      solicitudesGlobal[globalIdx].estado = window.translations.changesImplementedStatus;
      guardarTodo();
      agregarAuditoria(cambiosProyecto[idx].id, 'IMPLEMENTATION', 'Change implemented');
      window.renderGestionCambios(container);
    }
  }

  function exportarReporte() {
    let texto = 'CHANGE REPORT - ' + proyecto.name + '\n';
    texto += 'Date: ' + new Date().toLocaleString() + '\n';
    texto += 'Total: ' + cambiosProyecto.length + '\n';
    texto += window.translations.changesApproved + ': ' + cambiosProyecto.filter(function(c) { return c.estado === window.translations.changesApprovedStatus; }).length + '\n';
    texto += window.translations.changesPending + ': ' + cambiosProyecto.filter(function(c) { return c.estado === window.translations.changesRegistered || c.estado === window.translations.changesUnderEvaluation; }).length + '\n\n';
    for (var i = 0; i < cambiosProyecto.length; i++) {
      texto += (i+1) + '. ' + cambiosProyecto[i].titulo + ' | ' + cambiosProyecto[i].estado + ' | ' + cambiosProyecto[i].impacto + '\n';
    }
    navigator.clipboard.writeText(texto).then(function() { alert('✅ Report copied to clipboard'); });
  }

  function exportarAuditoria() {
    let texto = 'AUDIT LOG - ' + proyecto.name + '\n';
    for (var i = 0; i < auditoriaProyecto.length; i++) {
      texto += new Date(auditoriaProyecto[i].fecha).toLocaleString() + ' | ' + auditoriaProyecto[i].accion + ' | ' + auditoriaProyecto[i].detalles + '\n';
    }
    navigator.clipboard.writeText(texto).then(function() { alert('✅ Audit log copied to clipboard'); });
  }

  // Construir tabla
  function construirTabla() {
    let filtro = document.getElementById('filtroEstado') ? document.getElementById('filtroEstado').value : 'all';
    let filtered = cambiosProyecto.filter(function(c) {
      return filtro === 'all' || c.estado === filtro;
    });

    if (filtered.length === 0) {
      return '<tr><td colspan="8" style="text-align:center; padding:40px;">' + window.translations.changesNoRequests + '</td></tr>';
    }

    let filas = '';
    for (var i = 0; i < filtered.length; i++) {
      var c = filtered[i];
      var idxOriginal = cambiosProyecto.indexOf(c);
      var colorImpacto = getColorImpacto(c.impacto);
      var colorEstado = getColorEstado(c.estado);

      filas += '<tr style="border-bottom:1px solid #e2e8f0;">';
      filas += '<td style="padding:12px;">#' + (c.id % 10000) + '</td>';
      filas += '<td style="padding:12px;"><strong>' + escapeHtml(c.titulo) + '</strong><br><span style="font-size:11px; color:#64748b;">' + (c.descripcion ? c.descripcion.substring(0,50) : '') + '</span></td>';
      filas += '<td style="padding:12px;"><span style="background:#3b82f620; padding:4px 10px; border-radius:20px; font-size:11px;">' + getIconoTipo(c.tipo) + ' ' + c.tipo + '</span></td>';
      filas += '<td style="padding:12px;"><span style="background:' + colorImpacto + '20; color:' + colorImpacto + '; padding:4px 10px; border-radius:20px; font-size:11px;">' + c.impacto + '</span></td>';
      filas += '<td style="padding:12px;"><span style="background:' + colorEstado + '20; color:' + colorEstado + '; padding:4px 10px; border-radius:20px; font-size:11px;">' + c.estado + '</span></td>';
      filas += '<td style="padding:12px;">' + new Date(c.fecha).toLocaleDateString() + '</td>';
      filas += '<td style="padding:12px; white-space:nowrap;">';
      filas += '<button onclick="window.verDetalleTemp(' + idxOriginal + ')" style="background:none; border:none; cursor:pointer; font-size:16px;" title="' + window.translations.changesView + '">👁️</button>';
      if (c.estado === window.translations.changesRegistered) {
        filas += '<button onclick="window.iniciarEvalTemp(' + idxOriginal + ')" style="background:#3b82f6; border:none; padding:4px 8px; border-radius:8px; color:white; cursor:pointer; margin-left:5px; font-size:11px;">' + window.translations.changesEvaluate + '</button>';
      }
      if (c.estado === window.translations.changesUnderEvaluation) {
        filas += '<button onclick="window.aprobarTemp(' + idxOriginal + ')" style="background:#10b981; border:none; padding:4px 8px; border-radius:8px; color:white; cursor:pointer; margin-left:5px; font-size:11px;">' + window.translations.changesApprove + '</button>';
        filas += '<button onclick="window.rechazarTemp(' + idxOriginal + ')" style="background:#ef4444; border:none; padding:4px 8px; border-radius:8px; color:white; cursor:pointer; margin-left:5px; font-size:11px;">' + window.translations.changesRejectAction + '</button>';
      }
      if (c.estado === window.translations.changesApprovedStatus) {
        filas += '<button onclick="window.implementarTemp(' + idxOriginal + ')" style="background:#8b5cf6; border:none; padding:4px 8px; border-radius:8px; color:white; cursor:pointer; font-size:11px;">' + window.translations.changesImplement + '</button>';
      }
      filas += '</td></tr>';
    }
    return filas;
  }

  function renderizarTabla() {
    let tbody = document.getElementById('tablaCambiosBody');
    if (tbody) tbody.innerHTML = construirTabla();
  }

  // Exponer funciones globales
  window.verDetalleTemp = verDetalle;
  window.iniciarEvalTemp = iniciarEvaluacion;
  window.aprobarTemp = aprobarCambio;
  window.rechazarTemp = rechazarCambio;
  window.implementarTemp = marcarImplementada;
  window.exportarReporteTemp = exportarReporte;
  window.exportarAuditoriaTemp = exportarAuditoria;
  window.abrirModalTemp = abrirModalNuevo;

  // HTML completo
  let htmlCompleto = `
  <div style="font-family: system-ui, sans-serif;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0f172a,#1e1b4b); border-radius:24px; padding:30px; margin-bottom:24px; color:white;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap;">
        <div>
          <h1 style="margin:0 0 8px 0;">${window.translations.changesTitle}</h1>
          <p style="margin:0; opacity:0.8;">${window.translations.changesSubtitle}</p>
          <p style="margin:4px 0 0; opacity:0.6; font-size:13px;">${escapeHtml(proyecto.name)}</p>
        </div>
        <div style="background:rgba(255,255,255,0.1); padding:10px 20px; border-radius:40px; text-align:center;">
          <div style="font-size:11px;">${window.translations.changesSuccessRate}</div>
          <div style="font-size:28px; font-weight:800;">${cambiosProyecto.length > 0 ? ((cambiosProyecto.filter(c => c.estado === window.translations.changesImplementedStatus || c.estado === window.translations.changesApprovedStatus).length / cambiosProyecto.length)*100).toFixed(0) : 0}%</div>
        </div>
      </div>
    </div>

    <!-- KPIs -->
    <div style="display:grid; grid-template-columns:repeat(5,1fr); gap:15px; margin-bottom:24px;">
      <div style="background:white; border-radius:16px; padding:15px; text-align:center; border:1px solid #e2e8f0;"><div style="font-size:28px; font-weight:800; color:#3b82f6;">${cambiosProyecto.length}</div><div style="color:#64748b;">${window.translations.changesTotal}</div></div>
      <div style="background:white; border-radius:16px; padding:15px; text-align:center; border:1px solid #e2e8f0;"><div style="font-size:28px; font-weight:800; color:#10b981;">${cambiosProyecto.filter(c => c.estado === window.translations.changesApprovedStatus).length}</div><div style="color:#64748b;">${window.translations.changesApproved}</div></div>
      <div style="background:white; border-radius:16px; padding:15px; text-align:center; border:1px solid #e2e8f0;"><div style="font-size:28px; font-weight:800; color:#f59e0b;">${cambiosProyecto.filter(c => c.estado === window.translations.changesUnderEvaluation || c.estado === window.translations.changesRegistered).length}</div><div style="color:#64748b;">${window.translations.changesPending}</div></div>
      <div style="background:white; border-radius:16px; padding:15px; text-align:center; border:1px solid #e2e8f0;"><div style="font-size:28px; font-weight:800; color:#ef4444;">${cambiosProyecto.filter(c => c.estado === window.translations.changesRejectedStatus).length}</div><div style="color:#64748b;">${window.translations.changesRejected}</div></div>
      <div style="background:white; border-radius:16px; padding:15px; text-align:center; border:1px solid #e2e8f0;"><div style="font-size:28px; font-weight:800; color:#8b5cf6;">${cambiosProyecto.filter(c => c.estado === window.translations.changesImplementedStatus).length}</div><div style="color:#64748b;">${window.translations.changesImplemented}</div></div>
    </div>

    <!-- Botones y filtros -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
      <div>
        <button id="btnNuevo" style="background:linear-gradient(135deg,#ea580c,#c2410c); border:none; padding:10px 24px; border-radius:40px; color:white; cursor:pointer; font-weight:600;">${window.translations.changesNewRequest}</button>
        <button id="btnExportar" style="background:#f1f5f9; border:1px solid #e2e8f0; padding:10px 20px; border-radius:40px; cursor:pointer;">${window.translations.changesExportReport}</button>
        <button id="btnExportarAud" style="background:#f1f5f9; border:1px solid #e2e8f0; padding:10px 20px; border-radius:40px; cursor:pointer;">${window.translations.changesExportAudit}</button>
      </div>
      <div>
        <select id="filtroEstado" style="background:white; border:1px solid #e2e8f0; padding:8px 16px; border-radius:40px;">
          <option value="all">${window.translations.changesAllStatuses}</option>
          <option value="${window.translations.changesRegistered}">${window.translations.changesRegistered}</option>
          <option value="${window.translations.changesUnderEvaluation}">${window.translations.changesUnderEvaluation}</option>
          <option value="${window.translations.changesApprovedStatus}">${window.translations.changesApprovedStatus}</option>
          <option value="${window.translations.changesRejectedStatus}">${window.translations.changesRejectedStatus}</option>
          <option value="${window.translations.changesImplementedStatus}">${window.translations.changesImplementedStatus}</option>
        </select>
      </div>
    </div>

    <!-- Tabla -->
    <div style="background:white; border-radius:20px; padding:20px; border:1px solid #e2e8f0; overflow-x:auto;">
      <table style="width:100%; border-collapse:collapse;">
        <thead>
          <tr style="border-bottom:2px solid #e2e8f0;">
            <th style="text-align:left; padding:12px;">${window.translations.changesID}</th>
            <th style="text-align:left; padding:12px;">${window.translations.changesRequest}</th>
            <th style="text-align:left; padding:12px;">${window.translations.changesType}</th>
            <th style="text-align:left; padding:12px;">${window.translations.changesImpact}</th>
            <th style="text-align:left; padding:12px;">${window.translations.changesStatus}</th>
            <th style="text-align:left; padding:12px;">${window.translations.changesDate}</th>
            <th style="text-align:left; padding:12px;">${window.translations.changesActions}</th>
          </tr>
        </thead>
        <tbody id="tablaCambiosBody">
          ${construirTabla()}
        </tbody>
      </table>
    </div>

    <!-- Footer -->
    <div style="margin-top:24px; padding:16px; text-align:center; font-size:11px; color:#64748b; background:white; border-radius:16px;">
      ${window.translations.changesConfidential}
    </div>
  </div>
  `;

  container.innerHTML = htmlCompleto;

  // Conectar eventos
  document.getElementById('btnNuevo').onclick = function() { abrirModalNuevo(); };
  document.getElementById('btnExportar').onclick = function() { exportarReporte(); };
  document.getElementById('btnExportarAud').onclick = function() { exportarAuditoria(); };
  document.getElementById('filtroEstado').onchange = function() { renderizarTabla(); };
};

console.log('✅ renderGestionCambios traducido al inglés. Abre el modal y ve a la pestaña Cambios para probar.');

// ============================================================
// AMPLIAR TRADUCCIONES PARA LA PESTAÑA HITOS
// ============================================================
window.translations = Object.assign(window.translations || {}, {
  // Títulos y etiquetas de Hitos
  milestonesTitle: '🎯 Executive Milestone Dashboard',
  milestonesSubtitle: 'Strategic Milestone Tracking',
  milestonesNoProject: '⚠️ No project selected',
  milestonesNoMilestones: '📭 No milestones selected. Click "Select Milestones" to begin tracking.',
  milestonesTotal: 'Total Milestones',
  milestonesCompleted: 'Completed',
  milestonesInProgress: 'In Progress',
  milestonesPending: 'Pending',
  milestonesOverdue: 'Overdue',
  milestonesCritical: 'Critical',
  milestonesCompletionRate: 'Completion Rate',
  milestonesDueSoon: 'Due ≤3 Days',
  milestonesTimeline: '🗓️ Executive Milestone Timeline',
  milestonesRegister: '📋 Milestone Register (International Format)',
  milestonesGovernance: '👥 Milestone Governance',
  milestonesOwner: '🎯 Milestone Owner',
  milestonesReview: '📊 Review Cadence',
  milestonesTimezone: '🌐 Timezone',
  milestonesSelect: '🎯 Select Milestones',
  milestonesExport: '📄 Export Executive Report',
  milestonesShare: '🌐 Share with Stakeholders',
  milestonesID: 'ID',
  milestonesName: 'Milestone',
  milestonesCategory: 'Category',
  milestonesDueDate: 'Due Date (UTC)',
  milestonesStatus: 'Status',
  milestonesDaysLeft: 'Days Left',
  milestonesHealth: 'Health',
  milestonesActions: 'Actions',
  milestonesView: '👁️',
  milestonesComplete: '✅',
  milestonesStrategic: '🎯 Strategic',
  milestonesTactical: '📋 Tactical',
  milestonesOperational: '⚙️ Operational',
  milestonesOnTrack: '✅ On Track',
  milestonesAtRisk: '🟠 At Risk',
  milestonesDelayed: '🔴 Delayed',
  milestonesDueSoonLabel: '🟡 Due Soon',
  milestonesOnSchedule: '🟢 On Schedule',
  milestonesAlert: '🚨 Executive Alert: Critical Milestones Requiring Attention',
  milestonesActionRequired: '🔴 Action Required',
  milestonesGovernanceDesc: 'Project Manager • Responsible for milestone delivery and stakeholder communication',
  milestonesReviewDesc: 'Weekly status updates • Monthly executive review • Quarterly strategic alignment',
  milestonesTimezoneDesc: 'All dates displayed in UTC • Local time conversion available in export',
  milestonesConfidential: '🔒 Governance: All milestones follow PMI standards with documented approval and audit trail.',
  milestonesInternational: '🌍 International: Dates in UTC format • Multi-language support • Compliance-ready reporting.',
  milestonesCompliance: '✅ Compliance: This module supports SOX, ISO 21500, and PRINCE2 milestone governance.',
  milestonesGenerated: 'Generated',
  milestonesSource: 'Source: PM Virtual Executive Platform',
  milestonesSelectTitle: '🎯 Select Executive Milestones',
  milestonesSelectProject: 'Project',
  milestonesAvailableTasks: '📋 Available Tasks',
  milestonesSaveSelection: '💾 Save Selection',
  milestonesCancel: '❌ Cancel',
  milestonesSaved: (count) => `✅ ${count} milestone(s) saved for executive tracking.\n\n📊 Dashboard updated with selected milestones.`,
  milestonesNoTasks: 'No tasks available',
  milestonesCompletedStatus: '✅ Completed',
  milestonesInProgressStatus: '🔄 In Progress',
  milestonesPendingStatus: '⏳ Pending',
  milestonesOverdueStatus: '🔴 Overdue',
  milestonesHealthOnTrack: '✅ On Track',
  milestonesHealthAtRisk: '🟠 At Risk',
  milestonesHealthDelayed: '🔴 Delayed',
  milestonesHealthDueSoon: '🟡 Due Soon',
  milestonesHealthOnSchedule: '🟢 On Schedule',
});

// ============================================================
// RENDER HITOS - VERSIÓN INGLESA
// ============================================================
window.renderSeguimientoHitos = function(container) {
  // Función auxiliar para escapar HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  // Obtener proyecto actual
  const proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
  if (!proyecto) {
    container.innerHTML = '<p style="color:#94a3b8; text-align:center; padding:40px;">⚠️ ' + window.translations.milestonesNoProject + '</p>';
    return;
  }

  const tasks = proyecto.tasks || [];

  // Cargar hitos guardados
  let hitos = JSON.parse(localStorage.getItem('hitos') || '[]');

  // Filtrar hitos del proyecto actual
  const hitosGuardados = hitos.filter(function(h) { return h.projectId === proyecto.name; }).map(function(h) {
    const task = tasks.find(function(t) { return t.id === h.taskId; });
    return task ? { ...h, task } : null;
  }).filter(Boolean);

  // ========== MÉTRICAS EJECUTIVAS ==========
  const totalHitos = hitosGuardados.length;
  const completados = hitosGuardados.filter(function(h) { return h.task.status === 'completed'; }).length;
  const enCurso = hitosGuardados.filter(function(h) { return h.task.status === 'inProgress'; }).length;
  const pendientes = hitosGuardados.filter(function(h) { return h.task.status === 'pending'; }).length;
  const criticos = hitosGuardados.filter(function(h) { return h.task.priority === 'high' && h.task.status !== 'completed'; }).length;
  const proximos3Dias = hitosGuardados.filter(function(h) {
    if (!h.task.deadline || h.task.status === 'completed') return false;
    const diff = Math.ceil((new Date(h.task.deadline) - new Date()) / (1000*3600*24));
    return diff >= 0 && diff <= 3;
  }).length;

  const porcentajeAvanceHitos = totalHitos > 0 ? Math.round((completados / totalHitos) * 100) : 0;

  // ========== COLORES PERSONALIZADOS ==========
  const statusColors = {
    completed: { bg: '#86efac', border: '#22c55e', text: '#166534', label: '✅ ' + window.translations.milestonesCompletedStatus },
    inProgress: { bg: '#2dd4bf', border: '#14b8a6', text: '#134e4a', label: '🔄 ' + window.translations.milestonesInProgressStatus },
    pending: { bg: '#fde047', border: '#ca8a04', text: '#713f12', label: '⏳ ' + window.translations.milestonesPendingStatus },
    overdue: { bg: '#ef4444', border: '#dc2626', text: '#7f1d1d', label: '🔴 ' + window.translations.milestonesOverdueStatus }
  };

  // ========== GENERAR HTML ==========
  let html = '';

  // Header ejecutivo
  html += '<div style="background:linear-gradient(135deg,#1e3a8a,#3b82f6,#60a5fa); color:white; padding:25px; border-radius:16px; margin-bottom:25px; position:relative; overflow:hidden;">';
  html += '<div style="position:absolute; top:-30px; right:-30px; width:100px; height:100px; background:rgba(255,255,255,0.1); border-radius:50%;"></div>';
  html += '<div style="position:relative; z-index:1;">';
  html += '<h2 style="margin:0 0 8px 0; font-size:22px; font-weight:700; display:flex; align-items:center; gap:10px;">';
  html += '<span>🎯</span> ' + window.translations.milestonesTitle;
  html += '</h2>';
  html += '<p style="margin:0 0 15px 0; opacity:0.95; font-size:14px;">' + proyecto.name + ' • ' + window.translations.milestonesSubtitle + '</p>';
  html += '<div style="display:flex; gap:10px; flex-wrap:wrap;">';
  html += '<span style="background:rgba(255,255,255,0.2); padding:6px 14px; border-radius:20px; font-size:12px;">🌍 ' + new Date().toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric' }) + '</span>';
  html += '<span style="background:rgba(134,239,172,0.3); padding:6px 14px; border-radius:20px; font-size:12px; color:#166534;">✅ ' + completados + '/' + totalHitos + ' ' + window.translations.milestonesCompleted + '</span>';
  html += '<span style="background:rgba(253,224,71,0.3); padding:6px 14px; border-radius:20px; font-size:12px; color:#713f12;">⏳ ' + proximos3Dias + ' ' + window.translations.milestonesDueSoon + '</span>';
  html += '<span style="background:rgba(239,68,68,0.3); padding:6px 14px; border-radius:20px; font-size:12px; color:#7f1d1d;">🔴 ' + criticos + ' ' + window.translations.milestonesCritical + '</span>';
  html += '</div>';
  html += '</div>';
  html += '</div>';

  // Dashboard de KPIs
  html += '<div style="display:grid; grid-template-columns:repeat(5,1fr); gap:12px; margin-bottom:30px;">';
  html += '<div style="background:rgba(255,255,255,0.95); padding:18px; border-radius:12px; border-left:5px solid #3b82f6; box-shadow:0 4px 12px rgba(0,0,0,0.08); text-align:center;">';
  html += '<div style="font-size:26px; font-weight:700; color:#1e40af;">' + totalHitos + '</div>';
  html += '<div style="font-size:11px; color:#64748b; margin-top:4px;">' + window.translations.milestonesTotal + '</div>';
  html += '</div>';
  html += '<div style="background:rgba(134,239,172,0.15); padding:18px; border-radius:12px; border-left:5px solid #86efac; text-align:center;">';
  html += '<div style="font-size:26px; font-weight:700; color:#166534;">' + completados + '</div>';
  html += '<div style="font-size:11px; color:#64748b; margin-top:4px;">✅ ' + window.translations.milestonesCompleted + '</div>';
  html += '</div>';
  html += '<div style="background:rgba(45,212,191,0.15); padding:18px; border-radius:12px; border-left:5px solid #2dd4bf; text-align:center;">';
  html += '<div style="font-size:26px; font-weight:700; color:#134e4a;">' + enCurso + '</div>';
  html += '<div style="font-size:11px; color:#64748b; margin-top:4px;">🔄 ' + window.translations.milestonesInProgress + '</div>';
  html += '</div>';
  html += '<div style="background:rgba(253,224,71,0.15); padding:18px; border-radius:12px; border-left:5px solid #fde047; text-align:center;">';
  html += '<div style="font-size:26px; font-weight:700; color:#713f12;">' + proximos3Dias + '</div>';
  html += '<div style="font-size:11px; color:#64748b; margin-top:4px;">⚠️ ' + window.translations.milestonesDueSoon + '</div>';
  html += '</div>';
  html += '<div style="background:rgba(255,255,255,0.95); padding:18px; border-radius:12px; border-left:5px solid #8b5cf6; box-shadow:0 4px 12px rgba(0,0,0,0.08); text-align:center;">';
  html += '<div style="font-size:26px; font-weight:700; color:#6d28d9;">' + porcentajeAvanceHitos + '%</div>';
  html += '<div style="font-size:11px; color:#64748b; margin-top:4px;">📊 ' + window.translations.milestonesCompletionRate + '</div>';
  html += '</div>';
  html += '</div>';

  // Barra de progreso
  html += '<div style="background:rgba(255,255,255,0.95); padding:20px; border-radius:12px; margin-bottom:25px; box-shadow:0 4px 12px rgba(0,0,0,0.08);">';
  html += '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">';
  html += '<h3 style="margin:0; color:#1e293b; font-size:15px; font-weight:600;">📈 Milestone Completion Progress</h3>';
  html += '<span style="background:' + (porcentajeAvanceHitos >= 80 ? '#86efac' : porcentajeAvanceHitos >= 50 ? '#fde047' : '#ef4444') + '; color:' + (porcentajeAvanceHitos >= 80 ? '#166534' : '#713f12') + '; padding:6px 16px; border-radius:20px; font-weight:600; font-size:13px;">';
  html += porcentajeAvanceHitos + '% Complete';
  html += '</span>';
  html += '</div>';
  html += '<div style="background:#e2e8f0; height:16px; border-radius:8px; overflow:hidden;">';
  html += '<div style="background:linear-gradient(90deg,#86efac,#2dd4bf); height:100%; width:' + porcentajeAvanceHitos + '%; border-radius:8px; transition:width 0.5s ease;"></div>';
  html += '</div>';
  html += '<div style="display:flex; justify-content:space-between; margin-top:8px; font-size:11px; color:#64748b;">';
  const minDate = tasks.length > 0 ? new Date(Math.min(...tasks.map(t => new Date(t.startDate||Date.now())))) : new Date();
  const maxDate = tasks.length > 0 ? new Date(Math.max(...tasks.map(t => new Date(t.deadline||Date.now())))) : new Date();
  html += '<span>Start: ' + minDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + '</span>';
  html += '<span>Target: ' + maxDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + '</span>';
  html += '</div>';
  html += '</div>';

  // Botones de acción
  html += '<div style="display:flex; gap:12px; margin-bottom:25px; flex-wrap:wrap;">';
  html += '<button id="seleccionarHitosBtn" style="background:#3b82f6; border:none; padding:12px 24px; border-radius:8px; color:white; cursor:pointer; font-weight:500; display:flex; align-items:center; gap:8px; font-size:13px;">';
  html += '<span>+</span> ' + window.translations.milestonesSelect;
  html += '</button>';
  html += '<button id="exportarHitosBtn" style="background:rgba(134,239,172,0.2); border:1px solid #22c55e; padding:12px 24px; border-radius:8px; color:#166534; cursor:pointer; font-weight:500; display:flex; align-items:center; gap:8px; font-size:13px;">';
  html += '<span>📄</span> ' + window.translations.milestonesExport;
  html += '</button>';
  html += '<button id="compartirHitosBtn" style="background:rgba(139,92,246,0.2); border:1px solid #8b5cf6; padding:12px 24px; border-radius:8px; color:#a78bfa; cursor:pointer; font-weight:500; display:flex; align-items:center; gap:8px; font-size:13px;">';
  html += '<span>🌐</span> ' + window.translations.milestonesShare;
  html += '</button>';
  html += '</div>';

  // Timeline visual de hitos
  html += '<div style="background:rgba(255,255,255,0.95); padding:20px; border-radius:12px; margin-bottom:25px; box-shadow:0 4px 12px rgba(0,0,0,0.08);">';
  html += '<h3 style="color:#1e293b; margin:0 0 15px 0; font-size:15px; font-weight:600; border-bottom:1px solid #e2e8f0; padding-bottom:10px;">' + window.translations.milestonesTimeline + '</h3>';
  html += '<div style="overflow-x:auto; padding:10px 0;">';
  html += '<div style="min-width:1400px; position:relative; padding:40px 20px;">';
  html += '<div style="position:absolute; top:50%; left:20px; right:20px; height:4px; background:linear-gradient(90deg,#e2e8f0,#cbd5e1,#e2e8f0); transform:translateY(-50%); border-radius:2px;"></div>';

  // Ordenar hitos por fecha
  const hitosOrdenados = [...hitosGuardados].sort(function(a, b) {
    return new Date(a.task.deadline||0) - new Date(b.task.deadline||0);
  });

  // Calcular rango de fechas para distribución proporcional
  const fechasValidas = hitosOrdenados.map(function(h) { return h.task.deadline; }).filter(Boolean).map(function(d) { return new Date(d).getTime(); });
  const minFecha = fechasValidas.length > 0 ? Math.min.apply(null, fechasValidas) : Date.now();
  const maxFecha = fechasValidas.length > 0 ? Math.max.apply(null, fechasValidas) : Date.now() + 30*24*3600*1000;
  const rangoDias = Math.max(1, (maxFecha - minFecha) / (1000*3600*24));

  hitosOrdenados.forEach(function(h, idx) {
    const task = h.task;
    const diff = task.deadline ? Math.ceil((new Date(task.deadline) - new Date()) / (1000*3600*24)) : null;
    const isCompleted = task.status === 'completed';
    const isOverdue = diff !== null && diff < 0 && !isCompleted;
    const isCritical = task.priority === 'high' && !isCompleted;

    const puntoColor = isCompleted ? '#86efac' :
                      (isOverdue ? '#ef4444' :
                      (isCritical ? '#f97316' :
                      (task.status === 'inProgress' ? '#2dd4bf' : '#fde047')));

    const estadoIcon = isCompleted ? '✓' : (isOverdue ? '🔴' : (isCritical ? '⚠️' : (diff !== null && diff >= 0 && diff <= 7 ? '📅' : '⏳')));

    let posicionPercent = 5;
    if (task.deadline) {
      const taskTime = new Date(task.deadline).getTime();
      posicionPercent = 20 + Math.min(75, Math.max(0, ((taskTime - minFecha) / (maxFecha - minFecha || 1)) * 75));
    }

    html += '<div style="position:absolute; left:' + posicionPercent + '%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; z-index:10; width:140px;">';
    html += '<div style="width:32px; height:32px; background:' + puntoColor + '; border:4px solid white; border-radius:50%; box-shadow:0 4px 12px rgba(0,0,0,0.25); display:flex; align-items:center; justify-content:center; color:white; font-weight:bold; font-size:14px; cursor:pointer; transition:transform 0.2s;" title="' + task.name + '" onmouseover="this.style.transform=\'scale(1.1)\'" onmouseout="this.style.transform=\'scale(1)\'">';
    html += isCompleted ? '✓' : (idx+1);
    html += '</div>';
    html += '<div style="margin-top:45px; text-align:center; background:white; padding:8px 12px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1); width:100%; border-left:3px solid ' + puntoColor + ';">';
    html += '<div style="font-size:12px; font-weight:600; color:#1e293b; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">' + escapeHtml(task.name) + '</div>';
    html += '<div style="font-size:10px; color:#64748b; margin-top:4px; font-weight:500;">' + (task.deadline ? new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD') + '</div>';
    html += '<div style="font-size:10px; color:' + puntoColor + '; margin-top:2px; font-weight:600;">' + estadoIcon + ' ' + (diff !== null ? (diff < 0 ? Math.abs(diff) + 'd late' : (diff === 0 ? 'Today' : '+' + diff + 'd')) : '') + '</div>';
    html += '</div>';
    html += '</div>';
  });

  html += '</div></div>';

  // Leyenda
  html += '<div style="display:flex; justify-content:center; gap:25px; margin-top:25px; flex-wrap:wrap; padding:0 20px;">';
  html += '<div style="display:flex; align-items:center; gap:8px; font-size:11px; color:#64748b;">';
  html += '<span style="width:14px; height:14px; background:#86efac; border:2px solid #22c55e; border-radius:50%;"></span> ✅ ' + window.translations.milestonesCompleted;
  html += '</div>';
  html += '<div style="display:flex; align-items:center; gap:8px; font-size:11px; color:#64748b;">';
  html += '<span style="width:14px; height:14px; background:#2dd4bf; border:2px solid #14b8a6; border-radius:50%;"></span> 🔄 ' + window.translations.milestonesInProgress;
  html += '</div>';
  html += '<div style="display:flex; align-items:center; gap:8px; font-size:11px; color:#64748b;">';
  html += '<span style="width:14px; height:14px; background:#fde047; border:2px solid #ca8a04; border-radius:50%;"></span> ⏳ ' + window.translations.milestonesPending;
  html += '</div>';
  html += '<div style="display:flex; align-items:center; gap:8px; font-size:11px; color:#64748b;">';
  html += '<span style="width:14px; height:14px; background:#ef4444; border:2px solid #dc2626; border-radius:50%;"></span> 🔴 ' + window.translations.milestonesOverdue;
  html += '</div>';
  html += '</div>';
  html += '</div>';

  // Tabla ejecutiva de hitos
  html += '<div style="background:rgba(255,255,255,0.95); padding:20px; border-radius:12px; margin-bottom:25px; box-shadow:0 4px 12px rgba(0,0,0,0.08);">';
  html += '<h3 style="color:#1e293b; margin:0 0 15px 0; font-size:15px; font-weight:600; border-bottom:1px solid #e2e8f0; padding-bottom:10px;">' + window.translations.milestonesRegister + '</h3>';
  html += '<div style="overflow-x:auto;">';
  html += '<table style="width:100%; border-collapse:collapse; font-size:13px;">';
  html += '<thead>';
  html += '<tr style="background:#f1f5f9;">';
  html += '<th style="padding:12px; text-align:left; border:1px solid #e2e8f0; color:#1e293b; font-weight:600;">' + window.translations.milestonesID + '</th>';
  html += '<th style="padding:12px; text-align:left; border:1px solid #e2e8f0; color:#1e293b; font-weight:600;">' + window.translations.milestonesName + '</th>';
  html += '<th style="padding:12px; text-align:center; border:1px solid #e2e8f0; color:#1e293b; font-weight:600;">' + window.translations.milestonesCategory + '</th>';
  html += '<th style="padding:12px; text-align:center; border:1px solid #e2e8f0; color:#1e293b; font-weight:600;">' + window.translations.milestonesDueDate + '</th>';
  html += '<th style="padding:12px; text-align:center; border:1px solid #e2e8f0; color:#1e293b; font-weight:600;">' + window.translations.milestonesStatus + '</th>';
  html += '<th style="padding:12px; text-align:center; border:1px solid #e2e8f0; color:#1e293b; font-weight:600;">' + window.translations.milestonesDaysLeft + '</th>';
  html += '<th style="padding:12px; text-align:center; border:1px solid #e2e8f0; color:#1e293b; font-weight:600;">' + window.translations.milestonesHealth + '</th>';
  html += '<th style="padding:12px; text-align:center; border:1px solid #e2e8f0; color:#1e293b; font-weight:600;">' + window.translations.milestonesActions + '</th>';
  html += '</tr>';
  html += '</thead>';
  html += '<tbody>';

  if (hitosGuardados.length === 0) {
    html += '<tr><td colspan="8" style="padding:20px; text-align:center; color:#64748b;">' + window.translations.milestonesNoMilestones + '</td></tr>';
  } else {
    hitosGuardados.slice().sort(function(a, b) {
      return new Date(a.task.deadline||0) - new Date(b.task.deadline||0);
    }).forEach(function(h, idx) {
      const task = h.task;
      const diff = task.deadline ? Math.ceil((new Date(task.deadline) - new Date()) / (1000*3600*24)) : null;
      const isCompleted = task.status === 'completed';
      const isCritical = task.priority === 'high' && !isCompleted;
      const isOverdue = diff !== null && diff < 0 && !isCompleted;
      const isUpcoming = diff !== null && diff >= 0 && diff <= 3 && !isCompleted;

      let statusColor, statusLabel, healthBg, healthColor;
      if (isCompleted) {
        statusColor = statusColors.completed.text;
        statusLabel = statusColors.completed.label;
        healthBg = statusColors.completed.bg;
        healthColor = statusColors.completed.text;
      } else if (isOverdue) {
        statusColor = statusColors.overdue.text;
        statusLabel = '🔴 ' + window.translations.milestonesOverdue;
        healthBg = statusColors.overdue.bg;
        healthColor = statusColors.overdue.text;
      } else if (task.status === 'inProgress') {
        statusColor = statusColors.inProgress.text;
        statusLabel = statusColors.inProgress.label;
        healthBg = statusColors.inProgress.bg;
        healthColor = statusColors.inProgress.text;
      } else {
        statusColor = statusColors.pending.text;
        statusLabel = statusColors.pending.label;
        healthBg = statusColors.pending.bg;
        healthColor = statusColors.pending.text;
      }

      const fechaFormateada = task.deadline ? new Date(task.deadline).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'
      }) + ' UTC' : 'TBD';

      const categoria = task.priority === 'high' ? window.translations.milestonesStrategic :
                        (task.priority === 'medium' ? window.translations.milestonesTactical : window.translations.milestonesOperational);

      const healthStatus = isOverdue ? window.translations.milestonesHealthDelayed :
                          (isCompleted ? window.translations.milestonesHealthOnTrack :
                          (isCritical ? window.translations.milestonesHealthAtRisk :
                          (isUpcoming ? window.translations.milestonesHealthDueSoon : window.translations.milestonesHealthOnSchedule)));

      html += '<tr style="background:#f8fafc;">';
      html += '<td style="padding:12px; border:1px solid #e2e8f0; font-weight:600; color:#1e293b;">#M-' + (task.id || idx+1) + '</td>';
      html += '<td style="padding:12px; border:1px solid #e2e8f0;">';
      html += '<div style="font-weight:500; color:#1e293b;">' + escapeHtml(task.name) + '</div>';
      html += '<div style="font-size:11px; color:#64748b; margin-top:4px;">' + (task.description ? escapeHtml(task.description.substring(0, 40)) : 'No description') + (task.description && task.description.length > 40 ? '...' : '') + '</div>';
      html += '</td>';
      html += '<td style="padding:12px; border:1px solid #e2e8f0; text-align:center;">';
      html += '<span style="background:rgba(59,130,246,0.15); color:#3b82f6; padding:4px 10px; border-radius:12px; font-size:10px; font-weight:500;">' + categoria + '</span>';
      html += '</td>';
      html += '<td style="padding:12px; border:1px solid #e2e8f0; text-align:center; color:#64748b; font-size:12px;">' + fechaFormateada + '</td>';
      html += '<td style="padding:12px; border:1px solid #e2e8f0; text-align:center;">';
      html += '<span style="background:rgba(0,0,0,0.1); color:' + statusColor + '; padding:4px 10px; border-radius:12px; font-size:10px; font-weight:500;">' + statusLabel + '</span>';
      html += '</td>';
      html += '<td style="padding:12px; border:1px solid #e2e8f0; text-align:center; font-weight:600; color:' + (diff !== null ? (diff < 0 ? statusColors.overdue.text : (diff <= 3 ? statusColors.pending.text : statusColors.completed.text)) : '#64748b') + ';">';
      html += diff !== null ? (diff < 0 ? diff + 'd overdue' : (diff === 0 ? 'Today' : '+' + diff + 'd')) : 'N/A';
      html += '</td>';
      html += '<td style="padding:12px; border:1px solid #e2e8f0; text-align:center;">';
      html += '<span style="background:' + healthBg + '; color:' + healthColor + '; padding:4px 10px; border-radius:12px; font-size:10px; font-weight:500;">' + healthStatus + '</span>';
      html += '</td>';
      html += '<td style="padding:12px; border:1px solid #e2e8f0; text-align:center;">';
      html += '<button data-idx="' + hitos.indexOf(h) + '" class="btn-ver-hito" style="background:rgba(59,130,246,0.15); border:1px solid #3b82f6; padding:6px 12px; border-radius:6px; color:#3b82f6; cursor:pointer; font-size:11px; margin-right:4px;">' + window.translations.milestonesView + '</button>';
      if (!isCompleted) {
        html += '<button data-idx="' + hitos.indexOf(h) + '" class="btn-marcar-completado" style="background:rgba(134,239,172,0.2); border:1px solid #22c55e; padding:6px 12px; border-radius:6px; color:#166534; cursor:pointer; font-size:11px;">' + window.translations.milestonesComplete + '</button>';
      }
      html += '</td>';
      html += '</tr>';
    });
  }

  html += '</tbody></table></div></div>';

  // Alertas ejecutivas
  const hitosCriticos = hitosGuardados.filter(function(h) {
    const task = h.task;
    const diff = task.deadline ? Math.ceil((new Date(task.deadline) - new Date()) / (1000*3600*24)) : null;
    return (task.priority === 'high' && task.status !== 'completed') || (diff !== null && diff < 0 && task.status !== 'completed');
  });

  if (hitosCriticos.length > 0) {
    html += '<div style="background:rgba(239,68,68,0.1); padding:20px; border-radius:12px; margin-bottom:25px; border:1px solid #ef4444;">';
    html += '<h4 style="color:#ef4444; margin:0 0 15px 0; font-size:15px; font-weight:600; display:flex; align-items:center; gap:8px;">';
    html += '<span>🚨</span> ' + window.translations.milestonesAlert;
    html += '</h4>';
    html += '<div style="display:grid; grid-template-columns:repeat(2,1fr); gap:12px;">';
    hitosCriticos.slice(0, 4).forEach(function(h) {
      const task = h.task;
      const diff = task.deadline ? Math.ceil((new Date(task.deadline) - new Date()) / (1000*3600*24)) : null;
      html += '<div style="background:white; padding:12px; border-radius:8px; border-left:4px solid #ef4444;">';
      html += '<div style="font-weight:600; color:#1e293b; font-size:13px; margin-bottom:4px;">' + escapeHtml(task.name) + '</div>';
      html += '<div style="font-size:11px; color:#64748b;">Due: ' + (task.deadline ? new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'TBD');
      html += diff !== null ? ' • ' + (diff < 0 ? Math.abs(diff) + ' days overdue' : '+' + diff + ' days') : '' + '</div>';
      html += '<div style="font-size:10px; color:#ef4444; margin-top:4px; font-weight:500;">' + window.translations.milestonesActionRequired + '</div>';
      html += '</div>';
    });
    if (hitosCriticos.length > 4) {
      html += '<div style="text-align:center; padding:12px; color:#64748b; font-size:12px;">+ ' + (hitosCriticos.length - 4) + ' more critical milestones</div>';
    }
    html += '</div>';
    html += '</div>';
  }

  // Panel de gobernanza
  html += '<div style="background:rgba(255,255,255,0.95); padding:20px; border-radius:12px; margin-bottom:25px; box-shadow:0 4px 12px rgba(0,0,0,0.08);">';
  html += '<h3 style="color:#1e293b; margin:0 0 15px 0; font-size:15px; font-weight:600; border-bottom:1px solid #e2e8f0; padding-bottom:10px;">' + window.translations.milestonesGovernance + '</h3>';
  html += '<div style="display:grid; grid-template-columns:repeat(3,1fr); gap:15px;">';
  html += '<div style="background:#f8fafc; padding:15px; border-radius:10px; border-left:4px solid #3b82f6;">';
  html += '<div style="font-weight:600; color:#1e293b; margin-bottom:8px;">' + window.translations.milestonesOwner + '</div>';
  html += '<div style="font-size:12px; color:#64748b;">' + window.translations.milestonesGovernanceDesc + '</div>';
  html += '</div>';
  html += '<div style="background:#f8fafc; padding:15px; border-radius:10px; border-left:4px solid #86efac;">';
  html += '<div style="font-weight:600; color:#1e293b; margin-bottom:8px;">' + window.translations.milestonesReview + '</div>';
  html += '<div style="font-size:12px; color:#64748b;">' + window.translations.milestonesReviewDesc + '</div>';
  html += '</div>';
  html += '<div style="background:#f8fafc; padding:15px; border-radius:10px; border-left:4px solid #8b5cf6;">';
  html += '<div style="font-weight:600; color:#1e293b; margin-bottom:8px;">' + window.translations.milestonesTimezone + '</div>';
  html += '<div style="font-size:12px; color:#64748b;">' + window.translations.milestonesTimezoneDesc + '</div>';
  html += '</div>';
  html += '</div>';
  html += '</div>';

  // Footer
  html += '<div style="margin-top:25px; padding:20px; background:rgba(255,255,255,0.95); border-radius:12px; text-align:center; box-shadow:0 4px 12px rgba(0,0,0,0.08);">';
  html += '<p style="color:#64748b; font-size:12px; margin:0; line-height:1.8;">';
  html += '<strong>🔒 ' + window.translations.milestonesConfidential + '</strong><br>';
  html += '<strong>🌍 ' + window.translations.milestonesInternational + '</strong><br>';
  html += '<strong>✅ ' + window.translations.milestonesCompliance + '</strong><br><br>';
  html += '<em>' + window.translations.milestonesGenerated + ': ' + new Date().toLocaleDateString('en-US', { timeZone: 'UTC' }) + ' ' + new Date().toLocaleTimeString('en-US', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' }) + ' UTC</em>';
  html += '</p>';
  html += '</div>';

  container.innerHTML = html;

  // ========== FUNCIONES AUXILIARES PARA SELECTOR DE HITOS ==========
  function seleccionarHitosEjecutivo() {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:100002; display:flex; align-items:center; justify-content:center;';

    const content = document.createElement('div');
    content.style.cssText = 'background:linear-gradient(135deg,#1e293b,#0f172a); padding:30px; border-radius:20px; width:600px; max-width:95vw; max-height:90vh; color:white; border:1px solid #3b82f6; overflow-y:auto;';

    content.innerHTML = `
      <h2 style="color:#ffffff; margin:0 0 20px 0; text-align:center; font-size:22px;">${window.translations.milestonesSelectTitle}</h2>
      <p style="color:#94a3b8; margin:0 0 25px 0; text-align:center; font-size:13px;">${window.translations.milestonesSelectProject}: <strong>` + proyecto.name + `</strong></p>
      <div style="background:rgba(0,0,0,0.3); padding:20px; border-radius:12px; margin-bottom:20px;">
        <h3 style="color:#3b82f6; margin:0 0 15px 0; font-size:16px; border-bottom:1px solid #3b82f6; padding-bottom:10px;">${window.translations.milestonesAvailableTasks}</h3>
        <div style="max-height:300px; overflow-y:auto;">
          ` + tasks.map(function(t) {
            const isCompleted = t.status === 'completed';
            const isInProgress = t.status === 'inProgress';
            const isOverdue = t.deadline && new Date(t.deadline) < new Date() && !isCompleted;
            const borderColor = isCompleted ? '#22c55e' : (isInProgress ? '#14b8a6' : (isOverdue ? '#dc2626' : '#ca8a04'));
            const bgColor = isCompleted ? '#86efac' : (isInProgress ? '#2dd4bf' : (isOverdue ? '#ef4444' : '#fde047'));

            return `
              <div style="display:flex; align-items:center; gap:10px; padding:10px; background:rgba(0,0,0,0.2); border-radius:8px; margin-bottom:8px;">
                <input type="checkbox" id="task-${t.id}" value="${t.id}" ` + (hitos.some(function(h2) { return h2.taskId === t.id; }) ? 'checked' : '') + ` style="width:16px; height:16px; accent-color:${borderColor};">
                <label for="task-${t.id}" style="flex:1; cursor:pointer;">
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span style="width:10px; height:10px; background:${bgColor}; border:2px solid ${borderColor}; border-radius:50%; display:inline-block;"></span>
                    <div>
                      <div style="font-weight:500; color:#e2e8f0;">` + escapeHtml(t.name) + `</div>
                      <div style="font-size:11px; color:#94a3b8;">
                        ` + (t.deadline ? '📅 ' + new Date(t.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No date') +
                        ` • ` + (t.priority === 'high' ? '🔴 High Priority' : t.priority === 'medium' ? '🟡 Medium' : '🟢 Low') + `
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            `;
          }).join('') + `
        </div>
      </div>
      <div style="display:flex; gap:15px; justify-content:center;">
        <button id="guardarHitosEjecutivo" style="background:#10b981; border:none; padding:12px 30px; border-radius:8px; color:white; cursor:pointer; font-weight:bold; font-size:14px;">${window.translations.milestonesSaveSelection}</button>
        <button id="cancelarHitos" style="background:#ef4444; border:none; padding:12px 30px; border-radius:8px; color:white; cursor:pointer; font-weight:bold; font-size:14px;">${window.translations.milestonesCancel}</button>
      </div>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    document.getElementById('guardarHitosEjecutivo').onclick = function() {
      const seleccionados = Array.from(content.querySelectorAll('input:checked')).map(function(cb) {
        return {
          taskId: parseInt(cb.value),
          projectId: proyecto.name,
          selectedAt: new Date().toISOString()
        };
      });

      // Actualizar array global de hitos
      const otrosProyectos = hitos.filter(function(h) { return h.projectId !== proyecto.name; });
      hitos.length = 0;
      hitos.push.apply(hitos, otrosProyectos);
      hitos.push.apply(hitos, seleccionados);
      localStorage.setItem('hitos', JSON.stringify(hitos));

      modal.remove();
      alert(window.translations.milestonesSaved(seleccionados.length));
      window.renderSeguimientoHitos(container);
    };

    document.getElementById('cancelarHitos').onclick = function() { modal.remove(); };
  }

  // ========== FUNCIONES AUXILIARES PARA EXPORTAR Y COMPARTIR ==========
  function exportarReporteHitosEjecutivo() {
    if (hitosGuardados.length === 0) {
      alert('📭 No milestones to export');
      return;
    }

    const completadosExport = hitosGuardados.filter(function(h) { return h.task.status === 'completed'; }).length;
    const porcentajeExport = hitosGuardados.length > 0 ? Math.round((completadosExport / hitosGuardados.length) * 100) : 0;

    const reporte = '🎯 EXECUTIVE MILESTONE REPORT - ' + proyecto.name + '\n' +
      '━━━━━━━━━━━━━━━━━━━━━━\n' +
      'Generated: ' + new Date().toLocaleString('en-US', { timeZone: 'UTC' }) + ' UTC\n' +
      'Total Milestones: ' + hitosGuardados.length + '\n' +
      'Completed: ' + completadosExport + ' (' + porcentajeExport + '%)\n' +
      'In Progress: ' + hitosGuardados.filter(function(h) { return h.task.status === 'inProgress'; }).length + '\n' +
      'Pending: ' + hitosGuardados.filter(function(h) { return h.task.status === 'pending'; }).length + '\n' +
      'Critical/Overdue: ' + hitosGuardados.filter(function(h) { return h.task.priority === 'high' && h.task.status !== 'completed'; }).length + '\n\n' +
      '📋 MILESTONE DETAILS:\n' +
      hitosGuardados.sort(function(a, b) {
        return new Date(a.task.deadline||0) - new Date(b.task.deadline||0);
      }).map(function(h) {
        const task = h.task;
        const diff = task.deadline ? Math.ceil((new Date(task.deadline) - new Date()) / (1000*3600*24)) : null;
        const statusIcon = task.status === 'completed' ? '✅' : (task.status === 'inProgress' ? '🔄' : (diff !== null && diff < 0 ? '🔴' : '⏳'));
        const priority = task.priority === 'high' ? '🔴' : (task.priority === 'medium' ? '🟡' : '🟢');
        return priority + ' ' + statusIcon + ' #' + (task.id||'N/A') + ' ' + task.name +
          ' | Due: ' + (task.deadline ? new Date(task.deadline).toLocaleDateString('en-US', { timeZone: 'UTC' }) : 'TBD') +
          ' | ' + (diff !== null ? (diff < 0 ? Math.abs(diff) + 'd OVERDUE' : '+' + diff + 'd') : 'N/A') +
          ' | ' + (task.assignee || 'Unassigned');
      }).join('\n') + '\n\n' +
      '━━━━━━━━━━━━━━━━━━━━━━\n' +
      'Generated by PM Virtual Executive • PMI/ISO 21500 Compliant';

    navigator.clipboard?.writeText(reporte).then(function() {
      alert('✅ Executive Milestone Report copied to clipboard.\n\n📄 Ready to paste in email, PowerPoint, or executive briefing.');
    }).catch(function() {
      alert('📋 Executive Report:\n\n' + reporte);
    });
  }

  function compartirHitosStakeholders() {
    if (hitosGuardados.length === 0) {
      alert('📭 No milestones to share');
      return;
    }

    const mensaje = '🌐 MILESTONE UPDATE - ' + proyecto.name + '\n' +
      '━━━━━━━━━━━━━━━━━━━━━━\n' +
      'Dear Stakeholder,\n\n' +
      'Please find below the current status of key project milestones:\n\n' +
      '📊 Completion Rate: ' + Math.round((hitosGuardados.filter(function(h) { return h.task.status === 'completed'; }).length / hitosGuardados.length) * 100) + '%\n' +
      '✅ Completed: ' + hitosGuardados.filter(function(h) { return h.task.status === 'completed'; }).length + '\n' +
      '🔄 In Progress: ' + hitosGuardados.filter(function(h) { return h.task.status === 'inProgress'; }).length + '\n' +
      '⏳ Pending: ' + hitosGuardados.filter(function(h) { return h.task.status === 'pending'; }).length + '\n\n' +
      '🔴 Upcoming Critical Milestones (Next 7 Days):\n' +
      hitosGuardados.filter(function(h) {
        const diff = h.task.deadline ? Math.ceil((new Date(h.task.deadline) - new Date()) / (1000*3600*24)) : null;
        return diff !== null && diff >= 0 && diff <= 7 && h.task.status !== 'completed';
      }).map(function(h) {
        return '• ' + h.task.name + ' • Due: ' + new Date(h.task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }) + ' UTC';
      }).join('\n') + '\n\n' +
      'For detailed milestone tracking, please access the PM Virtual Executive dashboard.\n\n' +
      'Best regards,\nProject Management Office\n' + new Date().toLocaleDateString('en-US', { timeZone: 'UTC' }) + ' UTC';

    navigator.clipboard?.writeText(mensaje).then(function() {
      alert('✅ Stakeholder update copied to clipboard.\n\n📧 Ready to send via email, Slack, or Teams to international stakeholders.');
    }).catch(function() {
      alert('📋 Stakeholder Update:\n\n' + mensaje);
    });
  }

  // ========== EVENT LISTENERS ==========
  document.getElementById('seleccionarHitosBtn').onclick = seleccionarHitosEjecutivo;
  document.getElementById('exportarHitosBtn').onclick = exportarReporteHitosEjecutivo;
  document.getElementById('compartirHitosBtn').onclick = compartirHitosStakeholders;

  // Ver detalle de hito
  document.querySelectorAll('.btn-ver-hito').forEach(function(btn) {
    btn.onclick = function() {
      const idx = parseInt(btn.dataset.idx);
      const h = hitos[idx];
      if (!h || !h.task) return;
      const task = h.task;
      const diff = task.deadline ? Math.ceil((new Date(task.deadline) - new Date()) / (1000*3600*24)) : null;

      const statusDisplay = task.status === 'completed' ? '✅ Completed (Green)' :
                            (task.status === 'inProgress' ? '🔄 In Progress (Teal)' :
                            (diff !== null && diff < 0 ? '🔴 Overdue (Red)' : '⏳ Pending (Yellow)'));

      alert('🎯 Milestone Details #' + (task.id || 'N/A') + '\n\n' +
        '📝 Title: ' + task.name + '\n' +
        '📄 Description: ' + (task.description || 'No description') + '\n' +
        '🎯 Category: ' + (task.priority === 'high' ? '🎯 Strategic' : task.priority === 'medium' ? '📋 Tactical' : '⚙️ Operational') + '\n' +
        '📅 Due Date (UTC): ' + (task.deadline ? new Date(task.deadline).toLocaleString('en-US', { timeZone: 'UTC' }) : 'TBD') + '\n' +
        '⏱️ Days Remaining: ' + (diff !== null ? (diff < 0 ? Math.abs(diff) + ' days OVERDUE ⚠️' : (diff === 0 ? 'DUE TODAY 🔴' : '+' + diff + ' days')) : 'N/A') + '\n' +
        '👤 Assignee: ' + (task.assignee || 'Unassigned') + '\n' +
        '📊 Status: ' + statusDisplay + '\n' +
        '🔴 Priority: ' + (task.priority === 'high' ? 'High - Executive Visibility' : task.priority === 'medium' ? 'Medium' : 'Low') + '\n' +
        '⏱️ Estimated: ' + (task.estimatedTime || 0) + 'h • Logged: ' + (task.timeLogged || 0) + 'h');
    };
  });

  // Marcar como completado
  document.querySelectorAll('.btn-marcar-completado').forEach(function(btn) {
    btn.onclick = function() {
      const idx = parseInt(btn.dataset.idx);
      if (confirm('✅ Mark milestone as completed?\n\nThis will update project progress and notify stakeholders.')) {
        const h = hitos[idx];
        if (h && h.task) {
          h.task.status = 'completed';
          window.guardarProyectos(window.obtenerProyectos());

          // Notificación
          if (window.SlackNotifier && typeof window.SlackNotifier.send === 'function') {
            window.SlackNotifier.send('✅ Milestone COMPLETED in *' + proyecto.name + '*:\n*' + h.task.name + '*\nCompleted: ' + new Date().toISOString());
          }

          alert('✅ Milestone marked as completed.\n\n📧 Stakeholders notified of completion.');
          window.renderSeguimientoHitos(container);
        }
      }
    };
  });
};

console.log('✅ renderSeguimientoHitos traducido al inglés. Abre el modal y ve a la pestaña Hitos para probar.');

// ============================================================
// AMPLIAR TRADUCCIONES PARA LA PESTAÑA REPORTES
// ============================================================
window.translations = Object.assign(window.translations || {}, {
  // Títulos y etiquetas de Reportes
  reportsTitle: '📊 Executive Reporting Center',
  reportsSubtitle: 'Project',
  reportsNoProject: '⚠️ No project selected',
  reportsNoTasks: '📭 No tasks to display',
  reportsAddTasks: 'Add tasks to the project to visualize reports.',
  reportsTotalTasks: 'Total Tasks',
  reportsCompleted: 'Completed',
  reportsInProgress: 'In Progress',
  reportsOverdue: 'Overdue',
  reportsSPI: 'SPI (Schedule)',
  reportsCPI: 'CPI (Cost)',
  reportsTaskDistribution: '📊 TASK DISTRIBUTION BY STATUS',
  reportsTimeControl: '⏱️ TIME CONTROL (HOURS)',
  reportsBurndown: '📉 BURNDOWN CHART - HOURS PROGRESS',
  reportsGenerator: '📋 EXECUTIVE REPORT GENERATOR',
  reportsHistory: '📋 Report History',
  reportsClearHistory: '🗑️ Clear',
  reportsNoHistory: '📭 No reports generated',
  reportsFrequency: '📅 Frequency',
  reportsFormat: '📄 Format',
  reportsNow: '🚀 Now',
  reportsWeekly: '🗓️ Weekly',
  reportsMonthly: '📆 Monthly',
  reportsHTML: '🌐 HTML Executive',
  reportsJSON: '🔧 JSON Data',
  reportsGenerate: '📊 GENERATE',
  reportsCancel: 'Cancel',
  reportsExecutive: '👔 Executive Summary',
  reportsStatus: '📈 Status Report',
  reportsFinancial: '💰 Financial Report',
  reportsMilestone: '🎯 Milestone Report',
  reportsDescExecutive: 'Executive report with EVM metrics',
  reportsDescStatus: 'Detailed status report',
  reportsDescFinancial: 'Financial performance analysis',
  reportsDescMilestone: 'Milestone tracking report',
  reportsExportPDF: '📄 Export as PDF',
  reportsPrint: '🖨️ Print Report',
  reportsConfidential: '🔒 CONFIDENTIAL - For executive use only',
  reportsGenerated: 'Generated',
  reportsSource: 'Source: PM Virtual Executive Platform',
  reportsKPI: '📈 Strategic KPIs',
  reportsOverallProgress: 'Overall Progress',
  reportsEfficiency: 'Efficiency',
  reportsQuality: 'Quality',
  reportsTasksCompleted: 'Tasks Completed',
  reportsPendingTasks: 'Pending Tasks',
  reportsOverdueTasks: 'Overdue Tasks',
  reportsOnTrack: '✅ On Track',
  reportsAtRisk: '⚠️ At Risk',
  reportsCritical: '🔴 Critical',
});

// ============================================================
// RENDER REPORTES - VERSIÓN INGLESA
// ============================================================
window.renderReportesAutomaticos = function(container) {
  // Función auxiliar para escapar HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  // Obtener proyecto actual
  const proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
  if (!proyecto) {
    container.innerHTML = '<div style="text-align:center; padding:60px; color:#94a3b8;">' + window.translations.reportsNoProject + '</div>';
    return;
  }

  const tasks = proyecto.tasks || [];
  const total = tasks.length;

  if (total === 0) {
    container.innerHTML = `
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 32px; padding: 60px; text-align: center;">
        <div style="font-size: 64px; margin-bottom: 20px;">📊</div>
        <h3 style="margin: 0; color: #e2e8f0; font-size: 24px;">${window.translations.reportsNoTasks}</h3>
        <p style="color: #94a3b8; margin-top: 12px;">${window.translations.reportsAddTasks}</p>
      </div>
    `;
    return;
  }

  // ========== CÁLCULOS DE MÉTRICAS ==========
  const completadas = tasks.filter(function(t) { return t.status === 'completed'; }).length;
  const enProgreso = tasks.filter(function(t) { return t.status === 'inProgress'; }).length;
  const pendientes = tasks.filter(function(t) { return t.status === 'pending'; }).length;
  const rezagadas = tasks.filter(function(t) { return t.status === 'overdue' || t.status === 'rezagado'; }).length;

  const horasEstimadas = tasks.reduce(function(s, t) { return s + (Number(t.estimatedTime) || 0); }, 0);
  const horasRegistradas = tasks.reduce(function(s, t) { return s + (Number(t.timeLogged) || 0); }, 0);
  const horasRestantes = horasEstimadas - horasRegistradas;
  const eficiencia = horasEstimadas > 0 ? Math.round((horasRegistradas / horasEstimadas) * 100) : 0;
  const porcentajeAvance = total > 0 ? Math.round((completadas / total) * 100) : 0;

  // Calcular EVM correctamente
  var EV = 0;
  tasks.forEach(function(task) {
    var estimado = Number(task.estimatedTime) || 0;
    var registrado = Number(task.timeLogged) || 0;
    if (task.status === 'completed') {
      EV += estimado;
    } else if (task.status === 'inProgress' || task.status === 'rezagado' || task.status === 'overdue') {
      var progreso = Math.min(1, registrado / (estimado || 1));
      EV += estimado * progreso;
    }
  });
  var SPI = horasEstimadas > 0 ? EV / horasEstimadas : 1;
  var CPI = horasRegistradas > 0 ? EV / horasRegistradas : 1;

  // Datos para gráficos
  var chartStatusData = [completadas, enProgreso, pendientes, rezagadas];
  var chartTiempoData = [horasEstimadas, horasRegistradas, horasRestantes];

  // Tipos de reporte
  var tiposReporte = [
    { id: 'executive', nombre: window.translations.reportsExecutive, desc: window.translations.reportsDescExecutive, icono: '👔', color: '#8b5cf6' },
    { id: 'status', nombre: window.translations.reportsStatus, desc: window.translations.reportsDescStatus, icono: '📈', color: '#3b82f6' },
    { id: 'financial', nombre: window.translations.reportsFinancial, desc: window.translations.reportsDescFinancial, icono: '💰', color: '#10b981' },
    { id: 'milestone', nombre: window.translations.reportsMilestone, desc: window.translations.reportsDescMilestone, icono: '🎯', color: '#f59e0b' }
  ];

  var formatosExportacion = [
    { id: 'html', nombre: window.translations.reportsHTML, icono: '🌐' },
    { id: 'json', nombre: window.translations.reportsJSON, icono: '🔧' }
  ];

  // ========== GENERAR HTML ==========
  var html = '';

  // HEADER
  html += '<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 24px; padding: 30px; margin-bottom: 25px;">';
  html += '<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">';
  html += '<div><div style="display: flex; align-items: center; gap: 15px;">';
  html += '<div style="background: linear-gradient(135deg, #8b5cf6, #3b82f6); width: 55px; height: 55px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 26px;">📊</div>';
  html += '<div><h1 style="margin: 0; font-size: 28px; color: white;">' + window.translations.reportsTitle + '</h1>';
  html += '<p style="margin: 5px 0 0 0; color: #94a3b8;">' + proyecto.name + ' • ' + new Date().toLocaleString('en-US') + '</p></div></div></div>';
  html += '<div style="display: flex; gap: 12px;"><div style="background: rgba(16,185,129,0.15); border: 1px solid #10b981; border-radius: 40px; padding: 8px 20px;"><span style="color: #10b981;">📈 ' + porcentajeAvance + '%</span></div>';
  html += '<div style="background: rgba(239,68,68,0.15); border: 1px solid #ef4444; border-radius: 40px; padding: 8px 20px;"><span style="color: #f87171;">⚠️ ' + rezagadas + '</span></div></div></div></div>';

  // KPIs
  html += '<div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 15px; margin-bottom: 25px;">';
  html += '<div style="background: white; border-radius: 16px; padding: 18px; text-align: center; border-top: 4px solid #3b82f6;"><div style="font-size: 28px; font-weight: 700; color: #000000;">' + total + '</div><div style="font-size: 11px; color: #000000; font-weight: 500;">' + window.translations.reportsTotalTasks + '</div></div>';
  html += '<div style="background: white; border-radius: 16px; padding: 18px; text-align: center; border-top: 4px solid #10b981;"><div style="font-size: 28px; font-weight: 700; color: #000000;">' + completadas + '</div><div style="font-size: 11px; color: #000000; font-weight: 500;">' + window.translations.reportsCompleted + '</div></div>';
  html += '<div style="background: white; border-radius: 16px; padding: 18px; text-align: center; border-top: 4px solid #f59e0b;"><div style="font-size: 28px; font-weight: 700; color: #000000;">' + enProgreso + '</div><div style="font-size: 11px; color: #000000; font-weight: 500;">' + window.translations.reportsInProgress + '</div></div>';
  html += '<div style="background: white; border-radius: 16px; padding: 18px; text-align: center; border-top: 4px solid #ef4444;"><div style="font-size: 28px; font-weight: 700; color: #000000;">' + rezagadas + '</div><div style="font-size: 11px; color: #000000; font-weight: 500;">' + window.translations.reportsOverdue + '</div></div>';
  html += '<div style="background: white; border-radius: 16px; padding: 18px; text-align: center; border-top: 4px solid #8b5cf6;"><div style="font-size: 28px; font-weight: 700; color: #000000;">' + SPI.toFixed(2) + '</div><div style="font-size: 11px; color: #000000; font-weight: 500;">' + window.translations.reportsSPI + '</div></div>';
  html += '<div style="background: white; border-radius: 16px; padding: 18px; text-align: center; border-top: 4px solid #ec4899;"><div style="font-size: 28px; font-weight: 700; color: #000000;">' + CPI.toFixed(2) + '</div><div style="font-size: 11px; color: #000000; font-weight: 500;">' + window.translations.reportsCPI + '</div></div></div>';

  // GRÁFICA 1 - Distribución de tareas
  html += '<div style="background: white; border-radius: 20px; padding: 20px; margin-bottom: 20px; border: 1px solid #e2e8f0;">';
  html += '<h3 style="margin: 0 0 15px 0; font-size: 16px; color: #000000 !important; font-weight: 700;">' + window.translations.reportsTaskDistribution + '</h3>';
  html += '<div style="height: 250px; position: relative;"><canvas id="distChartPanel" style="width:100%; height:100%;"></canvas></div>';
  html += '<div style="display: flex; justify-content: center; gap: 20px; margin-top: 15px; flex-wrap: wrap; padding-top: 15px; border-top: 1px solid #e2e8f0;">';
  html += '<div style="display: flex; align-items: center; gap: 8px;"><span style="width: 12px; height: 12px; background: #10b981; border-radius: 50%;"></span><span style="font-size: 12px; color: #475569;"><strong>' + window.translations.reportsCompleted + ':</strong> ' + completadas + ' (' + Math.round(completadas/total*100) + '%)</span></div>';
  html += '<div style="display: flex; align-items: center; gap: 8px;"><span style="width: 12px; height: 12px; background: #f59e0b; border-radius: 50%;"></span><span style="font-size: 12px; color: #475569;"><strong>' + window.translations.reportsInProgress + ':</strong> ' + enProgreso + ' (' + Math.round(enProgreso/total*100) + '%)</span></div>';
  html += '<div style="display: flex; align-items: center; gap: 8px;"><span style="width: 12px; height: 12px; background: #94a3b8; border-radius: 50%;"></span><span style="font-size: 12px; color: #475569;"><strong>' + window.translations.reportsPendingTasks + ':</strong> ' + pendientes + ' (' + Math.round(pendientes/total*100) + '%)</span></div>';
  html += '<div style="display: flex; align-items: center; gap: 8px;"><span style="width: 12px; height: 12px; background: #ef4444; border-radius: 50%;"></span><span style="font-size: 12px; color: #475569;"><strong>' + window.translations.reportsOverdueTasks + ':</strong> ' + rezagadas + ' (' + Math.round(rezagadas/total*100) + '%)</span></div></div></div>';

  // GRÁFICA 2 - Control de tiempo
  html += '<div style="background: white; border-radius: 20px; padding: 20px; margin-bottom: 20px; border: 1px solid #e2e8f0;">';
  html += '<h3 style="margin: 0 0 15px 0; font-size: 16px; color: #000000 !important; font-weight: 700;">' + window.translations.reportsTimeControl + '</h3>';
  html += '<div style="height: 250px; position: relative;"><canvas id="timeChartPanel" style="width:100%; height:100%;"></canvas></div>';
  html += '<div style="display: flex; justify-content: center; gap: 25px; margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0;">';
  html += '<div style="text-align: center;"><span style="display: inline-block; width: 12px; height: 12px; background: #3b82f6; border-radius: 2px; margin-right: 6px;"></span><span style="font-size: 12px; color: #475569;"><strong>Estimated:</strong> ' + horasEstimadas + 'h</span></div>';
  html += '<div style="text-align: center;"><span style="display: inline-block; width: 12px; height: 12px; background: #10b981; border-radius: 2px; margin-right: 6px;"></span><span style="font-size: 12px; color: #475569;"><strong>Logged:</strong> ' + horasRegistradas + 'h</span></div>';
  html += '<div style="text-align: center;"><span style="display: inline-block; width: 12px; height: 12px; background: #f59e0b; border-radius: 2px; margin-right: 6px;"></span><span style="font-size: 12px; color: #475569;"><strong>Remaining:</strong> ' + horasRestantes + 'h</span></div>';
  html += '<div style="text-align: center;"><span style="display: inline-block; width: 12px; height: 12px; background: #8b5cf6; border-radius: 2px; margin-right: 6px;"></span><span style="font-size: 12px; color: #475569;"><strong>Efficiency:</strong> ' + eficiencia + '%</span></div></div></div>';

  // GRÁFICA 3 - Burndown
  html += '<div style="background: white; border-radius: 20px; padding: 20px; margin-bottom: 25px; border: 1px solid #e2e8f0;">';
  html += '<h3 style="margin: 0 0 15px 0; font-size: 16px; color: #000000 !important; font-weight: 700;">' + window.translations.reportsBurndown + '</h3>';
  html += '<div style="height: 250px; position: relative;"><canvas id="burndownChartPanel" style="width:100%; height:100%;"></canvas></div>';
  html += '<div style="display: flex; justify-content: center; gap: 30px; margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0;">';
  html += '<div><span style="display: inline-block; width: 20px; height: 3px; background: #8b5cf6; margin-right: 8px;"></span><span style="font-size: 12px; color: #475569;">Ideal Line (Base Plan)</span></div>';
  html += '<div><span style="display: inline-block; width: 20px; height: 3px; background: #ef4444; margin-right: 8px;"></span><span style="font-size: 12px; color: #475569;">Actual Progress</span></div>';
  html += '<div><span style="font-size: 12px; color: #64748b;">⚡ Current speed: ' + Math.round(horasRegistradas / (total || 1)) + 'h/task</span></div></div></div>';

  // GENERADOR DE REPORTES
  html += '<div style="background: white; border-radius: 20px; padding: 20px; margin-bottom: 25px; border: 1px solid #e2e8f0;">';
  html += '<h3 style="margin: 0 0 20px 0; font-size: 16px; color: #000000 !important; font-weight: 700;">' + window.translations.reportsGenerator + '</h3>';
  html += '<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 20px;">';
  for (var i = 0; i < tiposReporte.length; i++) {
    var tipo = tiposReporte[i];
    html += '<div data-tipo="' + tipo.id + '" class="btn-tipo-reporte" style="background: ' + tipo.color + '10; border: 2px solid ' + tipo.color + '30; border-radius: 16px; padding: 15px; cursor: pointer; text-align: center;">';
    html += '<div style="font-size: 32px; margin-bottom: 8px;">' + tipo.icono + '</div>';
    html += '<div style="font-weight: 700; color: #1e293b;">' + tipo.nombre + '</div>';
    html += '<div style="font-size: 11px; color: #64748b; margin-top: 5px;">' + tipo.desc + '</div></div>';
  }
  html += '</div><div id="panelConfigReporte" style="display: none; background: #f8fafc; border-radius: 16px; padding: 20px; margin-top: 15px;">';
  html += '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">';
  html += '<div><label style="display: block; margin-bottom: 5px; color: #64748b;">' + window.translations.reportsFrequency + '</label>';
  html += '<select id="reporteFrecuencia" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #e2e8f0;"><option value="now">' + window.translations.reportsNow + '</option><option value="weekly">' + window.translations.reportsWeekly + '</option><option value="monthly">' + window.translations.reportsMonthly + '</option></select></div>';
  html += '<div><label style="display: block; margin-bottom: 5px; color: #64748b;">' + window.translations.reportsFormat + '</label>';
  html += '<select id="reporteFormato" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #e2e8f0;">';
  for (var j = 0; j < formatosExportacion.length; j++) {
    var fmt = formatosExportacion[j];
    html += '<option value="' + fmt.id + '">' + fmt.icono + ' ' + fmt.nombre + '</option>';
  }
  html += '</select></div></div>';
  html += '<div style="display: flex; justify-content: flex-end; gap: 15px; margin-top: 20px;">';
  html += '<button id="btnCancelarConfig" style="background: #f1f5f9; border: none; padding: 8px 20px; border-radius: 8px; cursor: pointer;">' + window.translations.reportsCancel + '</button>';
  html += '<button id="btnGenerarReporte" style="background: linear-gradient(135deg, #8b5cf6, #6d28d9); color: white; border: none; padding: 8px 25px; border-radius: 8px; cursor: pointer;">' + window.translations.reportsGenerate + '</button></div></div></div>';

  // HISTORIAL
  html += '<div style="background: white; border-radius: 20px; padding: 20px; border: 1px solid #e2e8f0;">';
  html += '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;"><h3 style="margin: 0; font-size: 16px; color: #000000; font-weight: 700;">' + window.translations.reportsHistory + '</h3>';
  html += '<button id="limpiarHistorialBtn" style="background: none; border: none; color: #ef4444; cursor: pointer;">' + window.translations.reportsClearHistory + '</button></div>';
  html += '<div id="listaHistorialReportes" style="max-height: 250px; overflow-y: auto;"><div style="text-align: center; padding: 30px; color: #94a3b8;">' + window.translations.reportsNoHistory + '</div></div></div>';
  html += '<div style="margin-top: 20px; padding: 15px; background: #f8fafc; border-radius: 16px; text-align: center;"><p style="color: #64748b; font-size: 11px;">' + window.translations.reportsConfidential + '<br>' + window.translations.reportsGenerated + ': ' + new Date().toLocaleDateString('en-US') + '</p></div>';

  container.innerHTML = html;

  // ========== INICIALIZAR GRÁFICAS ==========
  if (window.panelCharts) {
    if (window.panelCharts.dist) window.panelCharts.dist.destroy();
    if (window.panelCharts.time) window.panelCharts.time.destroy();
    if (window.panelCharts.burn) window.panelCharts.burn.destroy();
  }

  setTimeout(function() {
    var ctxDist = document.getElementById('distChartPanel');
    var ctxTime = document.getElementById('timeChartPanel');
    var ctxBurn = document.getElementById('burndownChartPanel');

    window.panelCharts = {};

    if (ctxDist) {
      window.panelCharts.dist = new Chart(ctxDist.getContext('2d'), {
        type: 'doughnut',
        data: { labels: [window.translations.reportsCompleted, window.translations.reportsInProgress, window.translations.reportsPendingTasks, window.translations.reportsOverdueTasks], datasets: [{ data: chartStatusData, backgroundColor: ['#10b981', '#f59e0b', '#94a3b8', '#ef4444'], borderWidth: 0 }] },
        options: { responsive: true, maintainAspectRatio: false, cutout: '60%', plugins: { legend: { display: false }, tooltip: { callbacks: { label: function(ctx) { return ctx.label + ': ' + ctx.raw + ' tasks (' + Math.round(ctx.raw/total*100) + '%)'; } } } } }
      });
    }

    if (ctxTime) {
      window.panelCharts.time = new Chart(ctxTime.getContext('2d'), {
        type: 'bar',
        data: { labels: ['Estimated', 'Logged', 'Remaining'], datasets: [{ label: 'Hours', data: chartTiempoData, backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'], borderRadius: 8 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: function(ctx) { return ctx.dataset.label + ': ' + ctx.raw + 'h'; } } } }, scales: { y: { beginAtZero: true, title: { display: true, text: 'Hours', color: '#64748b' }, ticks: { callback: function(v) { return v + 'h'; } } } } }
      });
    }

    if (ctxBurn) {
      var semanas = ['Start', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Current'];
      var ideal = [horasEstimadas, horasEstimadas * 0.8, horasEstimadas * 0.6, horasEstimadas * 0.4, horasEstimadas * 0.2, 0];
      var real = [horasEstimadas, horasRegistradas * 0.5, horasRegistradas * 0.75, horasRegistradas, horasRegistradas + (horasRestantes * 0.5), horasRestantes];
      window.panelCharts.burn = new Chart(ctxBurn.getContext('2d'), {
        type: 'line',
        data: { labels: semanas, datasets: [{ label: 'Ideal Line', data: ideal, borderColor: '#8b5cf6', borderWidth: 3, borderDash: [5, 5], fill: false }, { label: 'Actual Progress', data: real, borderColor: '#ef4444', borderWidth: 3, backgroundColor: 'rgba(239,68,68,0.05)', fill: true }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { tooltip: { callbacks: { label: function(ctx) { return ctx.dataset.label + ': ' + ctx.raw.toFixed(1) + ' hours'; } } } }, scales: { y: { title: { display: true, text: 'Remaining Hours', color: '#64748b' }, ticks: { callback: function(v) { return v + 'h'; } } } } }
      });
    }
  }, 100);

  // ========== FUNCIONES DE HISTORIAL ==========
  function cargarHistorialReportes() {
    var historial = JSON.parse(localStorage.getItem('historialReportes') || '[]');
    var historialProyecto = [];
    for (var i = 0; i < historial.length; i++) {
      if (historial[i].proyectoId === proyecto.name) {
        historialProyecto.push(historial[i]);
      }
    }
    var listaDiv = document.getElementById('listaHistorialReportes');
    if (!listaDiv) return;
    if (historialProyecto.length === 0) {
      listaDiv.innerHTML = '<div style="text-align: center; padding: 30px; color: #94a3b8;">' + window.translations.reportsNoHistory + '</div>';
    } else {
      var htmlList = '';
      for (var i = 0; i < Math.min(historialProyecto.length, 10); i++) {
        var r = historialProyecto[i];
        htmlList += '<div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px solid #e2e8f0;"><div><strong style="color: #1e293b;">' + r.tipo + '</strong><br><span style="font-size: 10px; color: #64748b;">' + new Date(r.fecha).toLocaleString('en-US') + '</span></div><div><span style="background: #e2e8f0; padding: 2px 10px; border-radius: 12px; font-size: 11px; color: #475569;">' + r.formato.toUpperCase() + '</span></div></div>';
      }
      listaDiv.innerHTML = htmlList;
    }
  }

  cargarHistorialReportes();

  // ========== EVENT LISTENERS ==========
  var botonesTipos = document.querySelectorAll('.btn-tipo-reporte');
  for (var i = 0; i < botonesTipos.length; i++) {
    botonesTipos[i].onclick = function() {
      for (var j = 0; j < botonesTipos.length; j++) {
        botonesTipos[j].style.opacity = '0.6';
      }
      this.style.opacity = '1';
      document.getElementById('panelConfigReporte').style.display = 'block';
      this.dataset.selected = this.dataset.tipo;
    };
  }

  var btnCancelar = document.getElementById('btnCancelarConfig');
  if (btnCancelar) {
    btnCancelar.onclick = function() {
      document.getElementById('panelConfigReporte').style.display = 'none';
    };
  }

  var btnGenerar = document.getElementById('btnGenerarReporte');
  if (btnGenerar) {
    btnGenerar.onclick = function() {
      var tipoElem = document.querySelector('.btn-tipo-reporte[data-selected]');
      var tipo = tipoElem ? tipoElem.dataset.tipo : 'executive';
      var formato = document.getElementById('reporteFormato') ? document.getElementById('reporteFormato').value : 'html';
      generarReporteEjecutivo(tipo, formato, proyecto, tasks, {
        horasEstimadas: horasEstimadas,
        horasRegistradas: horasRegistradas,
        EV: EV,
        SPI: SPI,
        CPI: CPI,
        porcentajeAvance: porcentajeAvance,
        completadas: completadas,
        totalTareas: total,
        rezagadas: rezagadas,
        enProgreso: enProgreso,
        pendientes: pendientes
      });
    };
  }

  var limpiarBtn = document.getElementById('limpiarHistorialBtn');
  if (limpiarBtn) {
    limpiarBtn.onclick = function() {
      if (confirm('Clear history?')) {
        localStorage.setItem('historialReportes', JSON.stringify([]));
        cargarHistorialReportes();
      }
    };
  }

  // ========== FUNCIÓN GENERAR REPORTE ==========
  function generarReporteEjecutivo(tipo, formato, proyecto, tasks, metrics) {
    var total = tasks.length;
    var completadasCount = 0, enProgresoCount = 0, pendientesCount = 0, rezagadasCount = 0;
    for (var i = 0; i < tasks.length; i++) {
      var t = tasks[i];
      if (t.status === 'completed') completadasCount++;
      else if (t.status === 'inProgress') enProgresoCount++;
      else if (t.status === 'pending') pendientesCount++;
      else if (t.status === 'overdue' || t.status === 'rezagado') rezagadasCount++;
    }
    var statusData = [completadasCount, enProgresoCount, pendientesCount, rezagadasCount];
    var tiempoData = [metrics.horasEstimadas, metrics.horasRegistradas, metrics.horasEstimadas - metrics.horasRegistradas];

    // Calcular progreso correcto para cada tarea
    var tareasConProgreso = [];
    for (var i = 0; i < tasks.length; i++) {
      var task = tasks[i];
      var progresoCalculado = task.progress || 0;
      if (task.status === 'completed') {
        progresoCalculado = 100;
      } else if (task.status === 'inProgress' && task.estimatedTime > 0) {
        progresoCalculado = Math.min(99, Math.round((task.timeLogged / task.estimatedTime) * 100));
      } else if (task.status === 'rezagado' && task.estimatedTime > 0) {
        progresoCalculado = Math.min(99, Math.round((task.timeLogged / task.estimatedTime) * 100));
      }
      tareasConProgreso.push({
        nombre: task.name,
        estado: task.status,
        progreso: progresoCalculado,
        estimado: task.estimatedTime || 0,
        registrado: task.timeLogged || 0
      });
    }

    var htmlReporte = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Executive Report - ' + proyecto.name + '</title>';
    htmlReporte += '<script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>';
    htmlReporte += '<style>';
    htmlReporte += '*{margin:0;padding:0;box-sizing:border-box;}';
    htmlReporte += 'body{font-family:"Segoe UI","Inter",system-ui,sans-serif;margin:0;padding:40px;background:#f0f2f5;}';
    htmlReporte += '.container{max-width:1200px;margin:0 auto;background:white;border-radius:24px;box-shadow:0 20px 40px rgba(0,0,0,0.1);overflow:hidden;}';
    htmlReporte += '.header{background:linear-gradient(135deg,#0f172a,#1e293b);color:white;padding:40px;text-align:center;}';
    htmlReporte += '.header h1{font-size:32px;margin-bottom:10px;letter-spacing:-0.5px;}';
    htmlReporte += '.header p{opacity:0.85;font-size:14px;}';
    htmlReporte += '.content{padding:40px;}';
    htmlReporte += '.section{margin-bottom:45px;}';
    htmlReporte += '.section-title{font-size:20px;font-weight:600;color:#1e293b;border-left:5px solid #8b5cf6;padding-left:18px;margin-bottom:25px;}';
    htmlReporte += '.kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:35px;}';
    htmlReporte += '.kpi-card{background:#f8fafc;padding:25px;border-radius:20px;text-align:center;border-top:4px solid #8b5cf6;}';
    htmlReporte += '.kpi-value{font-size:36px;font-weight:800;color:#1e293b;}';
    htmlReporte += '.kpi-label{font-size:13px;color:#64748b;margin-top:8px;text-transform:uppercase;letter-spacing:0.5px;}';
    htmlReporte += '.chart-card{background:#ffffff;border:1px solid #e2e8f0;border-radius:20px;padding:25px;margin-bottom:30px;}';
    htmlReporte += '.chart-card h3{font-size:18px;font-weight:600;color:#1e293b;margin-bottom:20px;display:flex;align-items:center;gap:8px;}';
    htmlReporte += '.chart-card h3::before{content:"";width:8px;height:8px;border-radius:50%;display:inline-block;}';
    htmlReporte += '.legend{display:flex;justify-content:center;gap:25px;margin-top:20px;padding-top:15px;border-top:1px solid #e2e8f0;flex-wrap:wrap;}';
    htmlReporte += '.legend-item{display:flex;align-items:center;gap:8px;font-size:12px;color:#475569;}';
    htmlReporte += 'table{width:100%;border-collapse:collapse;margin-top:20px;border-radius:12px;overflow:hidden;}';
    htmlReporte += 'th,td{padding:14px 16px;text-align:left;border-bottom:1px solid #e2e8f0;}';
    htmlReporte += 'th{background:#f8fafc;font-weight:600;color:#1e293b;font-size:14px;}';
    htmlReporte += 'td{font-size:13px;color:#475569;}';
    htmlReporte += 'tr:hover{background:#faf5ff;}';
    htmlReporte += '.status-badge{display:inline-block;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:600;}';
    htmlReporte += '.status-completed{background:#d1fae5;color:#065f46;}';
    htmlReporte += '.status-progress{background:#fef3c7;color:#92400e;}';
    htmlReporte += '.status-pending{background:#f1f5f9;color:#475569;}';
    htmlReporte += '.status-overdue{background:#fee2e2;color:#991b1b;}';
    htmlReporte += '.progress-bar{width:80px;height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;}';
    htmlReporte += '.progress-fill{height:100%;background:#8b5cf6;border-radius:3px;}';
    htmlReporte += '.footer{background:#f8fafc;padding:25px;text-align:center;color:#64748b;font-size:12px;border-top:1px solid #e2e8f0;}';
    htmlReporte += 'canvas{max-height:260px;width:100%;}';
    htmlReporte += '</style></head><body>';
    htmlReporte += '<div class="container"><div class="header"><h1>📊 ' + (tipo === 'executive' ? 'EXECUTIVE SUMMARY' : tipo === 'status' ? 'STATUS REPORT' : tipo === 'financial' ? 'FINANCIAL REPORT' : 'MILESTONE REPORT') + '</h1>';
    htmlReporte += '<p>' + proyecto.name + '</p><p>' + window.translations.reportsGenerated + ': ' + new Date().toLocaleString('en-US') + '</p></div><div class="content">';

    // KPIs
    htmlReporte += '<div class="section"><h2 class="section-title">📈 ' + window.translations.reportsKPI + '</h2><div class="kpi-grid">';
    htmlReporte += '<div class="kpi-card"><div class="kpi-value">' + metrics.porcentajeAvance + '%</div><div class="kpi-label">' + window.translations.reportsOverallProgress + '</div></div>';
    htmlReporte += '<div class="kpi-card"><div class="kpi-value">' + metrics.SPI.toFixed(2) + '</div><div class="kpi-label">' + window.translations.reportsSPI + '</div></div>';
    htmlReporte += '<div class="kpi-card"><div class="kpi-value">' + metrics.CPI.toFixed(2) + '</div><div class="kpi-label">' + window.translations.reportsCPI + '</div></div>';
    htmlReporte += '<div class="kpi-card"><div class="kpi-value">' + metrics.rezagadas + '</div><div class="kpi-label">' + window.translations.reportsOverdueTasks + '</div></div></div></div>';

    // GRÁFICA 1
    htmlReporte += '<div class="chart-card"><h3 style="color:#1e293b;"><span style="background:#3b82f6;width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>📊 ' + window.translations.reportsTaskDistribution + '</h3><canvas id="reportDistChart"></canvas>';
    htmlReporte += '<div class="legend"><div class="legend-item"><span style="width:12px;height:12px;background:#10b981;border-radius:50%;"></span> ' + window.translations.reportsCompleted + ' (' + completadasCount + ')</div>';
    htmlReporte += '<div class="legend-item"><span style="width:12px;height:12px;background:#f59e0b;border-radius:50%;"></span> ' + window.translations.reportsInProgress + ' (' + enProgresoCount + ')</div>';
    htmlReporte += '<div class="legend-item"><span style="width:12px;height:12px;background:#94a3b8;border-radius:50%;"></span> ' + window.translations.reportsPendingTasks + ' (' + pendientesCount + ')</div>';
    htmlReporte += '<div class="legend-item"><span style="width:12px;height:12px;background:#ef4444;border-radius:50%;"></span> ' + window.translations.reportsOverdueTasks + ' (' + rezagadasCount + ')</div></div></div>';

    // GRÁFICA 2
    htmlReporte += '<div class="chart-card"><h3 style="color:#1e293b;"><span style="background:#10b981;width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>⏱️ ' + window.translations.reportsTimeControl + '</h3><canvas id="reportTimeChart"></canvas>';
    htmlReporte += '<div class="legend"><div class="legend-item"><span style="width:12px;height:12px;background:#3b82f6;border-radius:2px;"></span> Estimated: ' + metrics.horasEstimadas + 'h</div>';
    htmlReporte += '<div class="legend-item"><span style="width:12px;height:12px;background:#10b981;border-radius:2px;"></span> Logged: ' + metrics.horasRegistradas + 'h</div>';
    htmlReporte += '<div class="legend-item"><span style="width:12px;height:12px;background:#f59e0b;border-radius:2px;"></span> Remaining: ' + (metrics.horasEstimadas - metrics.horasRegistradas) + 'h</div></div></div>';

    // GRÁFICA 3
    htmlReporte += '<div class="chart-card"><h3 style="color:#1e293b;"><span style="background:#ec4899;width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>📉 ' + window.translations.reportsBurndown + '</h3><canvas id="reportBurndownChart"></canvas>';
    htmlReporte += '<div class="legend"><div class="legend-item"><span style="width:20px;height:3px;background:#8b5cf6;"></span> Ideal Line</div>';
    htmlReporte += '<div class="legend-item"><span style="width:20px;height:3px;background:#ef4444;"></span> Actual Progress</div></div></div>';

    // TABLA DE TAREAS
    htmlReporte += '<div class="section"><h2 class="section-title">📋 TASK DETAIL</h2>';
    htmlReporte += '<div style="overflow-x:auto;">';
    htmlReporte += '<table style="width:100%; border-collapse:collapse;">';
    htmlReporte += '<thead>';
    htmlReporte += '<tr style="background:#f8fafc; border-bottom:2px solid #e2e8f0;">';
    htmlReporte += '<th style="padding:14px 16px; text-align:left; font-weight:600;">Task</th>';
    htmlReporte += '<th style="padding:14px 16px; text-align:left; font-weight:600;">Status</th>';
    htmlReporte += '<th style="padding:14px 16px; text-align:center; font-weight:600;">Progress</th>';
    htmlReporte += '<th style="padding:14px 16px; text-align:center; font-weight:600;">Estimated</th>';
    htmlReporte += '<th style="padding:14px 16px; text-align:center; font-weight:600;">Logged</th>';
    htmlReporte += '</tr></thead><tbody>';

    for (var i = 0; i < tareasConProgreso.length; i++) {
      var t = tareasConProgreso[i];
      var estadoClass = '';
      var estadoTexto = '';
      if (t.estado === 'completed') { estadoClass = 'status-completed'; estadoTexto = '✅ ' + window.translations.reportsCompleted; }
      else if (t.estado === 'inProgress') { estadoClass = 'status-progress'; estadoTexto = '🔄 ' + window.translations.reportsInProgress; }
      else if (t.estado === 'pending') { estadoClass = 'status-pending'; estadoTexto = '⏳ ' + window.translations.reportsPendingTasks; }
      else { estadoClass = 'status-overdue'; estadoTexto = '⚠️ ' + window.translations.reportsOverdueTasks; }

      htmlReporte += '<tr style="border-bottom:1px solid #e2e8f0;">';
      htmlReporte += '<td style="padding:14px 16px;"><strong>' + escapeHtml(t.nombre) + '</strong></td>';
      htmlReporte += '<td style="padding:14px 16px;"><span class="status-badge ' + estadoClass + '">' + estadoTexto + '</span></td>';
      htmlReporte += '<td style="padding:14px 16px; text-align:center;"><div style="display:flex; align-items:center; gap:8px; justify-content:center;"><div class="progress-bar"><div class="progress-fill" style="width:' + t.progreso + '%;"></div></div><span style="font-size:12px;">' + t.progreso + '%</span></div></td>';
      htmlReporte += '<td style="padding:14px 16px; text-align:center;">' + t.estimado + 'h</td>';
      htmlReporte += '<td style="padding:14px 16px; text-align:center;">' + t.registrado + 'h</td>';
      htmlReporte += '</tr>';
    }

    htmlReporte += '</tbody></table></div></div>';
    htmlReporte += '<div class="footer"><p><strong>🔒 ' + window.translations.reportsConfidential + '</strong></p><p>' + window.translations.reportsGenerated + ': ' + new Date().toLocaleString('en-US') + '</p></div></div></div>';

    htmlReporte += '<script>';
    htmlReporte += 'setTimeout(function(){';
    htmlReporte += 'new Chart(document.getElementById("reportDistChart"),{type:"doughnut",data:{labels:["' + window.translations.reportsCompleted + '","' + window.translations.reportsInProgress + '","' + window.translations.reportsPendingTasks + '","' + window.translations.reportsOverdueTasks + '"],datasets:[{data:' + JSON.stringify(statusData) + ',backgroundColor:["#10b981","#f59e0b","#94a3b8","#ef4444"],borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,cutout:"60%",plugins:{legend:{display:false},tooltip:{callbacks:{label:function(ctx){return ctx.label+": "+ctx.raw+" tasks ("+Math.round(ctx.raw/' + total + '*100)+"%)";}}}}}});';
    htmlReporte += 'new Chart(document.getElementById("reportTimeChart"),{type:"bar",data:{labels:["Estimated","Logged","Remaining"],datasets:[{label:"Hours",data:' + JSON.stringify(tiempoData) + ',backgroundColor:["#3b82f6","#10b981","#f59e0b"],borderRadius:8}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{callback:function(v){return v+"h";}}}}}});';
    htmlReporte += 'var semanas=["Start","Week 1","Week 2","Week 3","Week 4","Current"];';
    htmlReporte += 'var ideal=[' + metrics.horasEstimadas + ',' + (metrics.horasEstimadas * 0.8) + ',' + (metrics.horasEstimadas * 0.6) + ',' + (metrics.horasEstimadas * 0.4) + ',' + (metrics.horasEstimadas * 0.2) + ',0];';
    htmlReporte += 'var real=[' + metrics.horasEstimadas + ',' + (metrics.horasRegistradas * 0.5) + ',' + (metrics.horasRegistradas * 0.75) + ',' + metrics.horasRegistradas + ',' + (metrics.horasRegistradas + (metrics.horasEstimadas - metrics.horasRegistradas) * 0.5) + ',' + (metrics.horasEstimadas - metrics.horasRegistradas) + '];';
    htmlReporte += 'new Chart(document.getElementById("reportBurndownChart"),{type:"line",data:{labels:semanas,datasets:[{label:"Ideal Line",data:ideal,borderColor:"#8b5cf6",borderWidth:3,borderDash:[5,5],fill:false},{label:"Actual Progress",data:real,borderColor:"#ef4444",borderWidth:3,backgroundColor:"rgba(239,68,68,0.05)",fill:true}]},options:{responsive:true,maintainAspectRatio:false,plugins:{tooltip:{callbacks:{label:function(ctx){return ctx.dataset.label+": "+ctx.raw.toFixed(1)+" hours";}}}}}});';
    htmlReporte += '},200);<\/script></body></html>';

    if (formato === 'html') {
      var win = window.open('', '_blank');
      win.document.write(htmlReporte);
      win.document.close();
      alert('✅ HTML report generated with professional charts.');
    } else if (formato === 'json') {
      var dataStr = JSON.stringify({ tipo: tipo, proyecto: proyecto.name, fecha: new Date().toISOString(), metrics: metrics, tasks: tasks }, null, 2);
      var blob = new Blob([dataStr], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'report_' + proyecto.name.replace(/\s/g, '_') + '_' + Date.now() + '.json';
      a.click();
      URL.revokeObjectURL(url);
      alert('✅ JSON report generated.');
    }

    var historial = JSON.parse(localStorage.getItem('historialReportes') || '[]');
    historial.unshift({ id: Date.now(), proyectoId: proyecto.name, tipo: tipo, formato: formato, fecha: new Date().toISOString() });
    if (historial.length > 50) historial.pop();
    localStorage.setItem('historialReportes', JSON.stringify(historial));
    cargarHistorialReportes();
  }
};

console.log('✅ renderReportesAutomaticos traducido al inglés. Abre el modal y ve a la pestaña Reportes para probar.');

// ============================================================
// AMPLIAR TRADUCCIONES PARA LA PESTAÑA DESEMPEÑO
// ============================================================
window.translations = Object.assign(window.translations || {}, {
  // Títulos y etiquetas de Desempeño
  performanceTitle: '📊 Performance Intelligence Report',
  performanceSubtitle: 'Corporate Analytics Dashboard',
  performanceNoProject: '⚠️ No project selected',
  performanceTeamCapacity: 'TEAM CAPACITY',
  performanceAvgEfficiency: 'AVG EFFICIENCY',
  performanceTopPerformers: 'TOP PERFORMERS',
  performanceRiskIndicators: 'RISK INDICATORS',
  performanceActiveResources: 'Active resources',
  performanceRequireAttention: 'Require attention',
  performanceRisksControlled: 'Risks controlled',
  performanceScoreChart: '📈 Performance Score by Resource',
  performanceMaxScore: 'Max score: 100 points',
  performanceCompletionEfficiency: '✅ Completion vs Efficiency Analysis',
  performanceTopResources: 'Top 8 resources',
  performanceCompletionRate: '🎯 Completion Rate by Resource',
  performanceTimeEfficiency: '⚡ Time Efficiency Analysis',
  performanceRegister: '📋 Resource Performance Register',
  performanceResourcesTracked: 'resources tracked',
  performanceResource: 'Resource',
  performanceTasks: 'Tasks',
  performanceCompletion: 'Completion',
  performanceEfficiency: 'Efficiency',
  performanceQuality: 'Quality',
  performanceScore: 'Score',
  performanceRating: 'Rating',
  performanceHighPriority: 'high priority tasks',
  performanceTopPerformersRecognition: '🏆 TOP PERFORMERS RECOGNITION',
  performanceConsiderLeadership: '⭐ Consider for leadership opportunities and special recognition',
  performanceRiskAttention: '⚠️ RISK & ATTENTION REQUIRED',
  performanceCoachingSessions: '📈 Schedule coaching sessions and improvement plans',
  performanceRecommendations: '💡 Executive Recommendations & Action Plan',
  performanceStrategicPriorities: '🎯 Strategic Priorities',
  performanceImproveCompletion: 'Improve completion rate',
  performanceReduceOverdue: 'Reduce overdue tasks',
  performanceBalanceWorkload: 'Balance workload across team',
  performanceResourceActions: '📊 Resource Actions',
  performanceRecognitionRetention: 'Recognition & retention',
  performanceImprovementPlans: 'Performance improvement plans',
  performanceReviewDistribution: 'Review pending tasks distribution',
  performanceNextSteps: '📅 Next Steps',
  performanceScheduleReviews: 'Schedule 1:1 reviews with critical resources',
  performanceWeeklyTracking: 'Weekly performance tracking meeting',
  performanceGenerateNext: 'Generate next report in 30 days',
  performanceConfidential: '🔒 CONFIDENTIAL - For executive use only',
  performanceMethodology: 'Methodology: Weighted scoring (Completion 40% | Efficiency 25% | Quality 20% | Productivity 15%)',
  performanceGenerated: 'Generated',
  performanceSource: 'Source: PM Virtual Executive Platform',
  performanceExcelente: 'Excelente',
  performanceSatisfactorio: 'Satisfactorio',
  performanceEnDesarrollo: 'En Desarrollo',
  performanceCritico: 'Crítico',
  performanceScoreValue: (score) => `${score} pts`,
  performanceTasksCompleted: 'Tasks completed',
  performanceEfficiencyPercent: (eff) => `${eff}%`,
  performanceQualityPercent: (qual) => `${qual}%`,
  performanceProductivity: 'Productivity',
});

// ============================================================
// RENDER DESEMPEÑO - VERSIÓN INGLESA
// ============================================================
window.renderEvaluacionDesempeno = function(container) {
  // Función auxiliar para escapar HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  // Obtener proyecto actual
  const proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
  if (!proyecto) {
    container.innerHTML = '<div style="text-align:center; padding:80px; background:linear-gradient(135deg,#f8fafc,#f1f5f9); border-radius:32px;"><span style="font-size:64px;">📊</span><p style="color:#64748b; margin-top:20px; font-size:16px;">' + window.translations.performanceNoProject + '</p></div>';
    return;
  }

  const tasks = proyecto.tasks || [];

  // ========== ANÁLISIS AVANZADO DE DESEMPEÑO ==========
  const desempeno = {};
  tasks.forEach(function(t) {
    if (t.assignee) {
      if (!desempeno[t.assignee]) {
        desempeno[t.assignee] = {
          nombre: t.assignee,
          total: 0,
          completadas: 0,
          enProgreso: 0,
          pendientes: 0,
          atrasadas: 0,
          horasEstimadas: 0,
          horasRegistradas: 0,
          prioridadAlta: 0,
          prioridadMedia: 0,
          prioridadBaja: 0,
          tareasComplejas: 0
        };
      }
      desempeno[t.assignee].total++;
      desempeno[t.assignee].horasEstimadas += Number(t.estimatedTime) || 0;
      desempeno[t.assignee].horasRegistradas += Number(t.timeLogged) || 0;
      if (t.priority === 'high') desempeno[t.assignee].prioridadAlta++;
      if (t.priority === 'medium') desempeno[t.assignee].prioridadMedia++;
      if (t.priority === 'low') desempeno[t.assignee].prioridadBaja++;
      if ((t.estimatedTime || 0) > 20) desempeno[t.assignee].tareasComplejas++;
      if (t.status === 'completed') {
        desempeno[t.assignee].completadas++;
      } else if (t.status === 'inProgress') {
        desempeno[t.assignee].enProgreso++;
      } else {
        desempeno[t.assignee].pendientes++;
      }
      if (t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed') {
        desempeno[t.assignee].atrasadas++;
      }
    }
  });

  // Calcular métricas ejecutivas
  Object.values(desempeno).forEach(function(d) {
    d.tasaCompletitud = d.total > 0 ? (d.completadas / d.total) : 0;
    // Código CORREGIDO - solo usa horas de tareas completadas
    const horasEstimadasCompletadas = tasks.filter(function(t) { return t.assignee === d.nombre && t.status === 'completed'; }).reduce(function(s, t) { return s + (Number(t.estimatedTime) || 0); }, 0);
    const horasRealesCompletadas = tasks.filter(function(t) { return t.assignee === d.nombre && t.status === 'completed'; }).reduce(function(s, t) { return s + (Number(t.timeLogged) || 0); }, 0);
    d.eficienciaHoras = horasEstimadasCompletadas > 0 ? Math.min(1.5, horasEstimadasCompletadas / horasRealesCompletadas) : 1;
    d.calidadEjecucion = d.atrasadas > 0 ? Math.max(0, 1 - (d.atrasadas / d.total)) : 1;
    d.productividad = d.horasRegistradas > 0 ? (d.completadas / d.horasRegistradas) * 40 : 0;

    // Score ejecutivo ponderado
    d.puntajeDesempeno = Math.round(
      (d.tasaCompletitud * 40) +
      (d.eficienciaHoras * 25) +
      (d.calidadEjecucion * 20) +
      (Math.min(1, d.productividad / 10) * 15)
    );

    d.nivelRendimiento = d.puntajeDesempeno >= 90 ? window.translations.performanceExcelente :
                          d.puntajeDesempeno >= 75 ? window.translations.performanceSatisfactorio :
                          d.puntajeDesempeno >= 60 ? window.translations.performanceEnDesarrollo : window.translations.performanceCritico;

    d.colorNivel = d.puntajeDesempeno >= 90 ? '#10b981' :
                   d.puntajeDesempeno >= 75 ? '#3b82f6' :
                   d.puntajeDesempeno >= 60 ? '#f59e0b' : '#ef4444';
  });

  // Métricas globales
  const totalRecursos = Object.keys(desempeno).length;
  const promedioScore = totalRecursos > 0 ? Math.round(Object.values(desempeno).reduce(function(s, d) { return s + d.puntajeDesempeno; }, 0) / totalRecursos) : 0;
  const eficienciaGlobal = totalRecursos > 0 ? Math.round(Object.values(desempeno).reduce(function(s, d) { return s + d.eficienciaHoras; }, 0) / totalRecursos * 100) : 0;
  const recursosExcelentes = Object.values(desempeno).filter(function(d) { return d.puntajeDesempeno >= 85; }).length;
  const recursosCriticos = Object.values(desempeno).filter(function(d) { return d.puntajeDesempeno < 60; }).length;
  const tareasPendientesGlobal = tasks.filter(function(t) { return t.status !== 'completed'; }).length;
  const completadasGlobal = tasks.filter(function(t) { return t.status === 'completed'; }).length;
  const atrasadasGlobal = tasks.filter(function(t) { return t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed'; }).length;

  // Preparar datos para gráficos
  const recursosOrdenados = Object.values(desempeno).sort(function(a, b) { return b.puntajeDesempeno - a.puntajeDesempeno; });
  const chartLabels = recursosOrdenados.slice(0, 8).map(function(d) { return d.nombre.split(' ')[0]; });
  const chartScores = recursosOrdenados.slice(0, 8).map(function(d) { return d.puntajeDesempeno; });
  const chartColors = recursosOrdenados.slice(0, 8).map(function(d) { return d.colorNivel; });
  const chartCompletion = recursosOrdenados.slice(0, 8).map(function(d) { return Math.round(d.tasaCompletitud * 100); });
  const chartEfficiency = recursosOrdenados.slice(0, 8).map(function(d) { return Math.round(d.eficienciaHoras * 100); });

  // ========== GENERAR HTML ==========
  const containerId = 'perf-chart-' + Date.now();

  let html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Executive Performance Report - ${escapeHtml(proyecto.name)}</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"><\/script>
    <style>
      @media print {
        body { margin: 0; padding: 20px; }
        .no-print { display: none; }
        .page-break { page-break-before: always; }
        .kpi-card, .chart-container, .table-container { break-inside: avoid; }
      }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
        background: #f0f4f8;
        padding: 40px;
        color: #1e293b;
      }
      .report-container {
        max-width: 1400px;
        margin: 0 auto;
      }
      .corporate-header {
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
        border-radius: 32px;
        padding: 48px;
        margin-bottom: 32px;
        position: relative;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
      }
      .corporate-header::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -20%;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(139,92,246,0.15), transparent);
        border-radius: 50%;
      }
      .corporate-header::after {
        content: '';
        position: absolute;
        bottom: -40%;
        left: -15%;
        width: 350px;
        height: 350px;
        background: radial-gradient(circle, rgba(59,130,246,0.1), transparent);
        border-radius: 50%;
      }
      .kpi-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
        margin-bottom: 32px;
      }
      .kpi-card {
        background: white;
        border-radius: 24px;
        padding: 24px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        border: 1px solid #e2e8f0;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .kpi-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px -8px rgba(0,0,0,0.15);
      }
      .kpi-value {
        font-size: 42px;
        font-weight: 800;
        line-height: 1.2;
        margin: 12px 0 8px 0;
      }
      .chart-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
        margin-bottom: 32px;
      }
      .chart-card {
        background: white;
        border-radius: 24px;
        padding: 28px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        border: 1px solid #e2e8f0;
      }
      .chart-title {
        font-size: 16px;
        font-weight: 700;
        color: #0f172a;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        padding-bottom: 12px;
        border-bottom: 2px solid #e2e8f0;
      }
      .chart-container {
        position: relative;
        height: 300px;
        margin-top: 20px;
      }
      .table-container {
        background: white;
        border-radius: 24px;
        padding: 28px;
        margin-bottom: 32px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        border: 1px solid #e2e8f0;
        overflow-x: auto;
      }
      .executive-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 13px;
      }
      .executive-table th {
        text-align: left;
        padding: 16px 12px;
        background: #f8fafc;
        font-weight: 600;
        color: #1e293b;
        border-bottom: 2px solid #e2e8f0;
      }
      .executive-table td {
        padding: 14px 12px;
        border-bottom: 1px solid #f1f5f9;
        vertical-align: middle;
      }
      .executive-table tr:hover {
        background: #f8fafc;
      }
      .score-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        padding: 6px 12px;
        border-radius: 40px;
        font-weight: 700;
        font-size: 13px;
      }
      .progress-bar-bg {
        background: #e2e8f0;
        height: 8px;
        border-radius: 10px;
        overflow: hidden;
        width: 100px;
      }
      .progress-bar-fill {
        height: 100%;
        border-radius: 10px;
        transition: width 0.3s;
      }
      .insights-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
        margin-bottom: 32px;
      }
      .insight-card {
        border-radius: 24px;
        padding: 28px;
        color: white;
      }
      .insight-card h4 {
        font-size: 14px;
        font-weight: 500;
        opacity: 0.9;
        margin-bottom: 16px;
      }
      .insight-card ul {
        list-style: none;
        margin-top: 16px;
      }
      .insight-card li {
        padding: 8px 0;
        border-bottom: 1px solid rgba(255,255,255,0.2);
        display: flex;
        justify-content: space-between;
      }
      .btn-group {
        display: flex;
        gap: 16px;
        justify-content: flex-end;
        margin-bottom: 24px;
      }
      .btn-pdf {
        background: linear-gradient(135deg, #dc2626, #b91c1c);
        border: none;
        padding: 12px 28px;
        border-radius: 40px;
        color: white;
        font-weight: 600;
        font-size: 13px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        transition: transform 0.2s;
      }
      .btn-pdf:hover {
        transform: scale(1.02);
      }
      .btn-print {
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        border: none;
        padding: 12px 28px;
        border-radius: 40px;
        color: white;
        font-weight: 600;
        font-size: 13px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 10px;
      }
      .footer {
        background: white;
        border-radius: 20px;
        padding: 24px;
        text-align: center;
        border: 1px solid #e2e8f0;
        margin-top: 32px;
      }
      .avatar {
        width: 36px;
        height: 36px;
        border-radius: 12px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 14px;
        color: white;
      }
    </style>
  </head>
  <body>
    <div class="report-container">
      <div class="btn-group no-print">
        <button class="btn-pdf" id="btnExportPDF">${window.translations.performanceExportPDF || '📄 Export as PDF'}</button>
        <button class="btn-print" id="btnPrint">${window.translations.performancePrint || '🖨️ Print Report'}</button>
      </div>

      <!-- HEADER CORPORATE -->
      <div class="corporate-header">
        <div style="position: relative; z-index: 2;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
            <div>
              <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
                <div style="background: linear-gradient(135deg, #8b5cf6, #3b82f6); width: 60px; height: 60px; border-radius: 20px; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 32px;">📊</span>
                </div>
                <div>
                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: white; letter-spacing: -0.5px;">${window.translations.performanceTitle}</h1>
                  <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 14px;">${window.translations.performanceSubtitle}</p>
                </div>
              </div>
              <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                <div style="background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); padding: 8px 24px; border-radius: 40px;">
                  <span style="color: #8b5cf6;">🎯</span>
                  <span style="color: #cbd5e1; font-size: 13px;">${escapeHtml(proyecto.name)}</span>
                </div>
                <div style="background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); padding: 8px 24px; border-radius: 40px;">
                  <span style="color: #3b82f6;">📅</span>
                  <span style="color: #cbd5e1; font-size: 13px;">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </div>
            <div style="background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border-radius: 28px; padding: 20px 32px; text-align: center; border: 1px solid rgba(255,255,255,0.1);">
              <div style="font-size: 11px; color: #94a3b8; letter-spacing: 1.5px;">GLOBAL PERFORMANCE INDEX</div>
              <div style="font-size: 56px; font-weight: 800; background: linear-gradient(135deg, #8b5cf6, #60a5fa); -webkit-background-clip: text; background-clip: text; color: transparent;">${promedioScore}</div>
              <div style="font-size: 12px; color: ${promedioScore >= 75 ? '#10b981' : promedioScore >= 60 ? '#f59e0b' : '#ef4444'};">/100 points</div>
            </div>
          </div>
        </div>
      </div>

      <!-- KPI EXECUTIVE DASHBOARD -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 13px; color: #64748b; font-weight: 500;">${window.translations.performanceTeamCapacity}</span>
            <span style="font-size: 28px;">👥</span>
          </div>
          <div class="kpi-value" style="color: #0f172a;">${totalRecursos}</div>
          <div style="margin-top: 12px; font-size: 12px; color: #10b981;">✅ ${window.translations.performanceActiveResources}</div>
        </div>
        <div class="kpi-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 13px; color: #64748b; font-weight: 500;">${window.translations.performanceAvgEfficiency}</span>
            <span style="font-size: 28px;">⚡</span>
          </div>
          <div class="kpi-value" style="color: ${eficienciaGlobal >= 85 ? '#10b981' : eficienciaGlobal >= 70 ? '#f59e0b' : '#ef4444'};">${eficienciaGlobal}%</div>
          <div class="progress-bar-bg" style="margin-top: 12px;"><div class="progress-bar-fill" style="width: ${eficienciaGlobal}%; background: ${eficienciaGlobal >= 85 ? '#10b981' : eficienciaGlobal >= 70 ? '#f59e0b' : '#ef4444'};"></div></div>
        </div>
        <div class="kpi-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 13px; color: #64748b; font-weight: 500;">${window.translations.performanceTopPerformers}</span>
            <span style="font-size: 28px;">🏆</span>
          </div>
          <div class="kpi-value" style="color: #8b5cf6;">${recursosExcelentes}</div>
          <div style="margin-top: 12px; font-size: 12px; color: #64748b;">Excelentes (85+ pts)</div>
        </div>
        <div class="kpi-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 13px; color: #64748b; font-weight: 500;">${window.translations.performanceRiskIndicators}</span>
            <span style="font-size: 28px;">⚠️</span>
          </div>
          <div class="kpi-value" style="color: ${recursosCriticos > 0 ? '#ef4444' : '#10b981'};">${recursosCriticos}</div>
          <div style="margin-top: 12px; font-size: 12px; color: ${recursosCriticos > 0 ? '#ef4444' : '#10b981'};">${recursosCriticos > 0 ? window.translations.performanceRequireAttention : window.translations.performanceRisksControlled}</div>
        </div>
      </div>

      <!-- GRÁFICOS PREMIUM -->
      <div class="chart-grid">
        <div class="chart-card">
          <div class="chart-title">
            <span>📈</span> ${window.translations.performanceScoreChart}
            <span style="margin-left: auto; font-size: 11px; color: #64748b;">${window.translations.performanceMaxScore}</span>
          </div>
          <div class="chart-container">
            <canvas id="scoreChart"></canvas>
          </div>
        </div>
        <div class="chart-card">
          <div class="chart-title">
            <span>✅</span> ${window.translations.performanceCompletionEfficiency}
            <span style="margin-left: auto; font-size: 11px; color: #64748b;">${window.translations.performanceTopResources}</span>
          </div>
          <div style="display: flex; justify-content: center; align-items: center; min-height: 320px;">
            <canvas id="radarChart" style="max-width: 380px; max-height: 300px; width: 100%; height: auto;"></canvas>
          </div>
        </div>
      </div>

      <div class="chart-grid">
        <div class="chart-card">
          <div class="chart-title">
            <span>🎯</span> ${window.translations.performanceCompletionRate}
          </div>
          <div class="chart-container">
            <canvas id="completionChart"></canvas>
          </div>
        </div>
        <div class="chart-card">
          <div class="chart-title">
            <span>⚡</span> ${window.translations.performanceTimeEfficiency}
          </div>
          <div class="chart-container">
            <canvas id="efficiencyChart"></canvas>
          </div>
        </div>
      </div>

      <!-- TABLA EJECUTIVA -->
      <div class="table-container">
        <div class="chart-title" style="margin-bottom: 20px;">
          <span>📋</span> ${window.translations.performanceRegister}
          <span style="margin-left: auto; font-size: 11px; color: #64748b;">${totalRecursos} ${window.translations.performanceResourcesTracked}</span>
        </div>
        <table class="executive-table">
          <thead>
            <tr>
              <th>${window.translations.performanceResource}</th>
              <th style="text-align: center;">${window.translations.performanceTasks}</th>
              <th style="text-align: center;">${window.translations.performanceCompletion}</th>
              <th style="text-align: center;">${window.translations.performanceEfficiency}</th>
              <th style="text-align: center;">${window.translations.performanceQuality}</th>
              <th style="text-align: center;">${window.translations.performanceScore}</th>
              <th style="text-align: center;">${window.translations.performanceRating}</th>
            </tr>
          </thead>
          <tbody>`;

  Object.values(desempeno).sort(function(a, b) { return b.puntajeDesempeno - a.puntajeDesempeno; }).forEach(function(d) {
    const iniciales = d.nombre.split(' ').map(function(n) { return n.charAt(0); }).join('').toUpperCase().substring(0,2);
    html += `
            <tr>
              <td>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div class="avatar" style="background: linear-gradient(135deg, ${d.colorNivel}, ${d.colorNivel}cc);">${iniciales}</div>
                  <div>
                    <div style="font-weight: 600;">${escapeHtml(d.nombre)}</div>
                    <div style="font-size: 10px; color: #64748b;">${d.prioridadAlta} ${window.translations.performanceHighPriority}</div>
                  </div>
                </div>
              </td>
              <td style="text-align: center;">
                <span style="font-weight: 700;">${d.completadas}</span>
                <span style="color: #64748b;">/${d.total}</span>
              </td>
              <td style="text-align: center;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                  <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${Math.round(d.tasaCompletitud * 100)}%; background: #10b981;"></div></div>
                  <span style="font-size: 12px;">${Math.round(d.tasaCompletitud * 100)}%</span>
                </div>
              </td>
              <td style="text-align: center;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                  <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${Math.round(d.eficienciaHoras * 100)}%; background: #3b82f6;"></div></div>
                  <span style="font-size: 12px;">${Math.round(d.eficienciaHoras * 100)}%</span>
                </div>
              </td>
              <td style="text-align: center;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                  <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${Math.round(d.calidadEjecucion * 100)}%; background: #8b5cf6;"></div></div>
                  <span style="font-size: 12px;">${Math.round(d.calidadEjecucion * 100)}%</span>
                </div>
              </td>
              <td style="text-align: center;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                  <div class="progress-bar-bg" style="width: 60px;"><div class="progress-bar-fill" style="width: ${d.puntajeDesempeno}%; background: ${d.colorNivel};"></div></div>
                  <span style="font-weight: 700; color: ${d.colorNivel};">${d.puntajeDesempeno}</span>
                </div>
              </td>
              <td style="text-align: center;">
                <span class="score-badge" style="background: ${d.colorNivel}20; color: ${d.colorNivel};">${d.nivelRendimiento}</span>
              </td>
            </tr>`;
  });

  html += `
          </tbody>
        </table>
      </div>

      <!-- INSIGHTS EJECUTIVOS -->
      <div class="insights-grid">
        <div class="insight-card" style="background: linear-gradient(135deg, #1e3a8a, #1e40af);">
          <h4>${window.translations.performanceTopPerformersRecognition}</h4>
          <ul>
            ${Object.values(desempeno).filter(function(d) { return d.puntajeDesempeno >= 85; }).slice(0, 4).map(function(d) { return `<li><span>${escapeHtml(d.nombre)}</span><span>${window.translations.performanceScoreValue(d.puntajeDesempeno)}</span></li>`; }).join('')}
            ${recursosExcelentes === 0 ? '<li style="opacity:0.7;">No top performers identified this period</li>' : ''}
          </ul>
          <p style="margin-top: 16px; font-size: 12px; opacity: 0.8;">${window.translations.performanceConsiderLeadership}</p>
        </div>
        <div class="insight-card" style="background: linear-gradient(135deg, ${recursosCriticos > 0 ? '#991b1b, #dc2626' : '#065f46, #10b981'});">
          <h4>${window.translations.performanceRiskAttention}</h4>
          <ul>
            ${Object.values(desempeno).filter(function(d) { return d.puntajeDesempeno < 60; }).slice(0, 4).map(function(d) { return `<li><span>${escapeHtml(d.nombre)}</span><span>${window.translations.performanceScoreValue(d.puntajeDesempeno)}</span></li>`; }).join('')}
            ${recursosCriticos === 0 ? '<li style="opacity:0.7;">All resources performing adequately</li>' : ''}
          </ul>
          <p style="margin-top: 16px; font-size: 12px; opacity: 0.8;">${window.translations.performanceCoachingSessions}</p>
        </div>
      </div>

      <!-- RECOMENDACIONES EJECUTIVAS -->
      <div class="table-container">
        <div class="chart-title" style="margin-bottom: 20px;">
          <span>💡</span> ${window.translations.performanceRecommendations}
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
          <div style="background: #f8fafc; border-radius: 20px; padding: 20px;">
            <div style="font-size: 28px; margin-bottom: 12px;">🎯</div>
            <div style="font-weight: 700; margin-bottom: 8px;">${window.translations.performanceStrategicPriorities}</div>
            <ul style="margin-left: 20px; color: #475569; font-size: 12px; line-height: 1.6;">
              <li>${window.translations.performanceImproveCompletion} (current: ${Math.round(completadasGlobal / (tasks.length || 1) * 100)}%)</li>
              <li>${window.translations.performanceReduceOverdue} (${atrasadasGlobal} pending)</li>
              <li>${window.translations.performanceBalanceWorkload}</li>
            </ul>
          </div>
          <div style="background: #f8fafc; border-radius: 20px; padding: 20px;">
            <div style="font-size: 28px; margin-bottom: 12px;">📊</div>
            <div style="font-weight: 700; margin-bottom: 8px;">${window.translations.performanceResourceActions}</div>
            <ul style="margin-left: 20px; color: #475569; font-size: 12px; line-height: 1.6;">
              <li>${recursosExcelentes} resources: ${window.translations.performanceRecognitionRetention}</li>
              <li>${recursosCriticos} resources: ${window.translations.performanceImprovementPlans}</li>
              <li>${window.translations.performanceReviewDistribution} (${tareasPendientesGlobal} pending)</li>
            </ul>
          </div>
          <div style="background: #f8fafc; border-radius: 20px; padding: 20px;">
            <div style="font-size: 28px; margin-bottom: 12px;">📅</div>
            <div style="font-weight: 700; margin-bottom: 8px;">${window.translations.performanceNextSteps}</div>
            <ul style="margin-left: 20px; color: #475569; font-size: 12px; line-height: 1.6;">
              <li>${window.translations.performanceScheduleReviews}</li>
              <li>${window.translations.performanceWeeklyTracking}</li>
              <li>${window.translations.performanceGenerateNext}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <div class="footer">
        <p style="color: #64748b; font-size: 11px; margin: 0;">
          <strong>${window.translations.performanceConfidential}</strong><br>
          ${window.translations.performanceMethodology}<br>
          ${window.translations.performanceGenerated}: ${new Date().toLocaleString('en-US')} | ${window.translations.performanceSource}
        </p>
      </div>
    </div>

    <script>
      // Inicializar gráficos
      new Chart(document.getElementById('scoreChart'), {
        type: 'bar',
        data: {
          labels: ${JSON.stringify(chartLabels)},
          datasets: [{
            label: 'Performance Score',
            data: ${JSON.stringify(chartScores)},
            backgroundColor: ${JSON.stringify(chartColors)},
            borderRadius: 8,
            barPercentage: 0.65
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (ctx) => \`Score: \${ctx.raw} / 100\` } }
          },
          scales: {
            y: { beginAtZero: true, max: 100, title: { display: true, text: 'Score (0-100)', font: { size: 11 } } },
            x: { ticks: { font: { size: 11 } } }
          }
        }
      });

      new Chart(document.getElementById('completionChart'), {
        type: 'bar',
        data: {
          labels: ${JSON.stringify(chartLabels)},
          datasets: [{
            label: 'Completion Rate (%)',
            data: ${JSON.stringify(chartCompletion)},
            backgroundColor: '#10b981',
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: { legend: { position: 'top' } },
          scales: { y: { beginAtZero: true, max: 100, title: { display: true, text: 'Completion %' } } }
        }
      });

      new Chart(document.getElementById('efficiencyChart'), {
        type: 'bar',
        data: {
          labels: ${JSON.stringify(chartLabels)},
          datasets: [{
            label: 'Time Efficiency (%)',
            data: ${JSON.stringify(chartEfficiency)},
            backgroundColor: '#3b82f6',
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: { legend: { position: 'top' } },
          scales: { y: { beginAtZero: true, max: 150, title: { display: true, text: 'Efficiency %' } } }
        }
      });

      new Chart(document.getElementById('radarChart'), {
        type: 'radar',
        data: {
          labels: ${JSON.stringify(chartLabels)},
          datasets: [
            { label: 'Completion Rate', data: ${JSON.stringify(chartCompletion)}, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', fill: true },
            { label: 'Efficiency', data: ${JSON.stringify(chartEfficiency)}, borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)', fill: true }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: { r: { beginAtZero: true, max: 100, ticks: { stepSize: 20 } } }
        }
      });

      // Exportar a PDF
      document.getElementById('btnExportPDF').onclick = function() { window.print(); };
      document.getElementById('btnPrint').onclick = function() { window.print(); };
    <\/script>
  </body>
  </html>`;

  // Abrir en ventana nueva para impresión
  const ventana = window.open('', '_blank');
  if (!ventana) {
    alert('⚠️ Please allow popup windows to view the performance report.');
    return;
  }
  ventana.document.write(html);
  ventana.document.close();
};

console.log('✅ renderEvaluacionDesempeno traducido al inglés. Abre el modal y ve a la pestaña Desempeño para probar.');

// ============================================================
// AMPLIAR TRADUCCIONES PARA LA PESTAÑA HABILIDADES
// ============================================================
window.translations = Object.assign(window.translations || {}, {
  // Títulos y etiquetas de Habilidades
  skillsTitle: '🧠 Multi-Skills Matrix Report',
  skillsSubtitle: 'Multi-competency assessment & gap analysis',
  skillsNoProject: '⚠️ No project selected',
  skillsNoMembers: '👥 No members assigned in project tasks.',
  skillsNoMembersMessage: 'Assign tasks to members to visualize their skills.',
  skillsTeamMembers: 'TEAM MEMBERS',
  skillsTotalSkills: 'TOTAL SKILLS',
  skillsAdvanced: 'ADVANCED SKILLS',
  skillsIntermediate: 'INTERMEDIATE',
  skillsBasic: 'BASIC',
  skillsCompetency: 'Competency Distribution',
  skillsDominant: 'Dominant',
  skillsRegister: 'Register at least 1 skill',
  skillsConsiderTraining: 'Consider advanced training',
  skillsMaintain: 'Maintain level',
  skillsAddSkill: '+ Add skill',
  skillsRemove: '🗑️',
  skillsName: 'Skill name',
  skillsLevel: 'Level',
  skillsBasicLabel: '🌱 Basic',
  skillsIntermediateLabel: '📈 Intermediate',
  skillsAdvancedLabel: '🏆 Advanced',
  skillsGapAnalysis: '📋 Skills Gap Analysis',
  skillsTeamMember: 'Team Member',
  skillsSkillsCount: 'Skills Count',
  skillsAvgLevel: 'Avg Level',
  skillsStatus: 'Status',
  skillsRecommendation: 'Recommendation',
  skillsTopTalent: '🏆 Top Talent & Strengths',
  skillsDevelopment: '📈 Development Opportunities',
  skillsStrategicRecommendations: '💡 Strategic Recommendations',
  skillsImmediateActions: 'Immediate Actions',
  skillsDevelopmentPlan: 'Development Plan',
  skillsSuccessMetrics: 'Success Metrics',
  skillsConfidential: '🔒 CONFIDENTIAL - For executive use only',
  skillsGenerated: 'Generated',
  skillsSource: 'Source: PM Virtual Executive Platform',
  skillsNoSkills: 'No skills registered',
  skillsMissing: '⚠️ Missing',
  skillsStrong: '✅ Strong',
  skillsDeveloping: '📈 Developing',
});


// ============================================================
// RENDER HABILIDADES - VERSIÓN INGLESA
// ============================================================
window.renderMatrizHabilidades = function(container) {
  // Función auxiliar para escapar HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  // Asegurar que window.habilidades existe
  if (typeof window.habilidades === 'undefined') {
    window.habilidades = JSON.parse(localStorage.getItem('habilidades') || '[]');
  }

  // Obtener proyecto actual
  const proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
  if (!proyecto) {
    container.innerHTML = '<div style="text-align:center; padding:60px; background:#f8fafc; border-radius:32px;"><p style="color:#64748b;">' + window.translations.skillsNoProject + '</p></div>';
    return;
  }

  // Obtener miembros del proyecto (de las tareas)
  const miembros = [...new Set((proyecto.tasks || []).map(function(t) { return t.assignee; }).filter(Boolean))];
  if (miembros.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:60px; background:linear-gradient(135deg,#f8fafc,#f1f5f9); border-radius:32px;">
        <span style="font-size:48px;">👥</span>
        <p style="color:#64748b; margin-top:16px;">${window.translations.skillsNoMembers}</p>
        <p style="color:#94a3b8; font-size:13px;">${window.translations.skillsNoMembersMessage}</p>
      </div>
    `;
    return;
  }

  // Cargar habilidades guardadas
  const habilidadesGuardadas = window.habilidades.filter(function(h) { return h.projectId === proyecto.name; });
  const habilidadesMap = new Map();
  habilidadesGuardadas.forEach(function(h) {
    habilidadesMap.set(h.miembro, h.habilidades || []);
  });

  const nivelesValor = { 'Basic': 1, 'Intermediate': 2, 'Advanced': 3 };
  const nivelesColor = { 'Basic': '#f97316', 'Intermediate': '#facc15', 'Advanced': '#10b981' };
  const nivelesIcono = { 'Basic': '🌱', 'Intermediate': '📈', 'Advanced': '🏆' };

  // Calcular estadísticas avanzadas
  let totalHabilidades = 0;
  let nivelSum = 0;
  let nivelesCount = { 'Basic': 0, 'Intermediate': 0, 'Advanced': 0 };

  miembros.forEach(function(m) {
    const habilidadesMiembro = habilidadesMap.get(m) || [];
    totalHabilidades += habilidadesMiembro.length;
    habilidadesMiembro.forEach(function(h) {
      nivelSum += nivelesValor[h.nivel] || 1;
      nivelesCount[h.nivel]++;
    });
  });

  const avgLevel = totalHabilidades > 0 ? (nivelSum / totalHabilidades).toFixed(1) : 0;
  const nivelDominante = nivelesCount['Advanced'] >= nivelesCount['Intermediate'] && nivelesCount['Advanced'] >= nivelesCount['Basic'] ? 'Advanced' :
                         nivelesCount['Intermediate'] >= nivelesCount['Basic'] ? 'Intermediate' : 'Basic';
  const miembrosConHabilidades = Array.from(habilidadesMap.entries()).filter(function(entry) { return entry[1].length > 0; }).length;

  // ========== GENERAR HTML ==========
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Multi-Skills Matrix Report - ${escapeHtml(proyecto.name)}</title>
    <style>
      @media print {
        body { margin: 0; padding: 20px; }
        .no-print { display: none !important; }
        .skill-card, .kpi-card { break-inside: avoid; }
      }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
        background: #f0f4f8;
        padding: 40px;
        color: #1e293b;
      }
      .report-container {
        max-width: 1400px;
        margin: 0 auto;
      }
      .btn-group {
        display: flex;
        gap: 16px;
        justify-content: flex-end;
        margin-bottom: 24px;
      }
      .btn-pdf, .btn-print {
        border: none;
        padding: 12px 28px;
        border-radius: 40px;
        color: white;
        font-weight: 600;
        font-size: 13px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 10px;
      }
      .btn-pdf { background: linear-gradient(135deg, #dc2626, #b91c1c); }
      .btn-print { background: linear-gradient(135deg, #3b82f6, #2563eb); }
      .corporate-header {
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
        border-radius: 32px;
        padding: 48px;
        margin-bottom: 32px;
        position: relative;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
      }
      .corporate-header::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -20%;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(139,92,246,0.15), transparent);
        border-radius: 50%;
      }
      .kpi-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 20px;
        margin-bottom: 32px;
      }
      .kpi-card {
        background: white;
        border-radius: 24px;
        padding: 20px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        border: 1px solid #e2e8f0;
      }
      .kpi-value {
        font-size: 36px;
        font-weight: 800;
        margin: 12px 0 8px 0;
      }
      .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: 24px;
        margin-bottom: 32px;
      }
      .skill-card {
        background: white;
        border-radius: 24px;
        padding: 24px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        border: 1px solid #e2e8f0;
      }
      .skill-list {
        list-style: none;
        margin-top: 16px;
      }
      .skill-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px;
        background: #f8fafc;
        border-radius: 16px;
        margin-bottom: 8px;
      }
      .skill-name {
        flex: 1;
        font-weight: 500;
      }
      .skill-level {
        margin: 0 12px;
      }
      .btn-add-skill {
        width: 100%;
        margin-top: 16px;
        padding: 12px;
        background: #f1f5f9;
        border: 2px dashed #cbd5e1;
        border-radius: 16px;
        cursor: pointer;
        color: #475569;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: all 0.2s;
      }
      .btn-add-skill:hover {
        background: #e2e8f0;
        border-color: #8b5cf6;
        color: #8b5cf6;
      }
      .btn-remove-skill {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #ef4444;
        padding: 4px 8px;
        border-radius: 8px;
      }
      .btn-remove-skill:hover {
        background: #fee2e2;
      }
      .level-btn {
        background: #f1f5f9;
        border: none;
        border-radius: 40px;
        padding: 4px 12px;
        font-size: 11px;
        cursor: pointer;
        transition: all 0.2s;
      }
      .level-btn.active {
        color: white;
        font-weight: 600;
      }
      .progress-bar-bg {
        background: #e2e8f0;
        height: 6px;
        border-radius: 10px;
        overflow: hidden;
        width: 80px;
      }
      .progress-bar-fill {
        height: 100%;
        border-radius: 10px;
      }
      .gaps-table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border-radius: 24px;
        overflow: hidden;
      }
      .gaps-table th, .gaps-table td {
        padding: 14px 16px;
        text-align: left;
        border-bottom: 1px solid #e2e8f0;
      }
      .gaps-table th {
        background: #f8fafc;
        font-weight: 600;
      }
      .insight-card {
        border-radius: 24px;
        padding: 28px;
        color: white;
      }
      .footer {
        background: white;
        border-radius: 20px;
        padding: 24px;
        text-align: center;
        margin-top: 32px;
      }
    </style>
  </head>
  <body>
    <div class="report-container">
      <div class="btn-group no-print">
        <button class="btn-pdf" id="btnExportPDF">📄 ${window.translations.skillsExportPDF || 'Export as PDF'}</button>
        <button class="btn-print" id="btnPrint">🖨️ ${window.translations.skillsPrint || 'Print Report'}</button>
      </div>

      <div class="corporate-header">
        <div style="position: relative; z-index: 2;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
            <div>
              <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
                <div style="background: linear-gradient(135deg, #8b5cf6, #3b82f6); width: 60px; height: 60px; border-radius: 20px; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 32px;">🧠</span>
                </div>
                <div>
                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: white;">${window.translations.skillsTitle}</h1>
                  <p style="margin: 8px 0 0 0; color: #94a3b8;">${window.translations.skillsSubtitle}</p>
                </div>
              </div>
              <div style="display: flex; gap: 16px;">
                <div style="background: rgba(255,255,255,0.08); padding: 8px 24px; border-radius: 40px;">
                  <span style="color: #cbd5e1;">🎯 ${escapeHtml(proyecto.name)}</span>
                </div>
                <div style="background: rgba(255,255,255,0.08); padding: 8px 24px; border-radius: 40px;">
                  <span style="color: #cbd5e1;">📅 ${new Date().toLocaleDateString('en-US')}</span>
                </div>
              </div>
            </div>
            <div style="background: rgba(255,255,255,0.05); border-radius: 28px; padding: 20px 32px; text-align: center;">
              <div style="font-size: 11px; color: #94a3b8;">SKILLS MATURITY INDEX</div>
              <div style="font-size: 56px; font-weight: 800; background: linear-gradient(135deg, #8b5cf6, #60a5fa); -webkit-background-clip: text; background-clip: text; color: transparent;">${avgLevel}</div>
              <div style="font-size: 12px; color: ${parseFloat(avgLevel) >= 2.5 ? '#10b981' : parseFloat(avgLevel) >= 1.5 ? '#f59e0b' : '#ef4444'};">/3.0 points</div>
            </div>
          </div>
        </div>
      </div>

      <div class="kpi-grid">
        <div class="kpi-card"><div style="color:#64748b; font-size:13px;">${window.translations.skillsTeamMembers}</div><div class="kpi-value">${miembros.length}</div><div style="font-size:11px; color:#10b981;">✅ Active</div></div>
        <div class="kpi-card"><div style="color:#64748b; font-size:13px;">${window.translations.skillsTotalSkills}</div><div class="kpi-value">${totalHabilidades}</div><div class="progress-bar-bg" style="width:100%;"><div class="progress-bar-fill" style="width: ${(totalHabilidades/(miembros.length*3))*100}%; background:#10b981;"></div></div></div>
        <div class="kpi-card"><div style="color:#64748b; font-size:13px;">${window.translations.skillsAdvanced}</div><div class="kpi-value" style="color:#10b981;">${nivelesCount['Advanced']}</div></div>
        <div class="kpi-card"><div style="color:#64748b; font-size:13px;">${window.translations.skillsIntermediate}</div><div class="kpi-value" style="color:#facc15;">${nivelesCount['Intermediate']}</div></div>
        <div class="kpi-card"><div style="color:#64748b; font-size:13px;">${window.translations.skillsBasic}</div><div class="kpi-value" style="color:#f97316;">${nivelesCount['Basic']}</div></div>
      </div>

      <div style="background: white; border-radius: 24px; padding: 24px; margin-bottom: 32px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
          <span><strong>${window.translations.skillsCompetency}</strong></span>
          <span>${window.translations.skillsDominant}: ${nivelDominante} ${nivelesIcono[nivelDominante]}</span>
        </div>
        <div style="display: flex; gap: 8px; height: 12px; border-radius: 20px; overflow: hidden;">
          <div style="width: ${(nivelesCount['Basic']/totalHabilidades)*100 || 0}%; background: #f97316; height: 100%;"></div>
          <div style="width: ${(nivelesCount['Intermediate']/totalHabilidades)*100 || 0}%; background: #facc15; height: 100%;"></div>
          <div style="width: ${(nivelesCount['Advanced']/totalHabilidades)*100 || 0}%; background: #10b981; height: 100%;"></div>
        </div>
      </div>

      <div class="skills-grid" id="skillsGrid">
        ${miembros.map(function(m) {
          const habilidadesMiembro = habilidadesMap.get(m) || [];
          const iniciales = m.split(' ').map(function(n) { return n.charAt(0); }).join('').toUpperCase().substring(0,2);
          const nivelPromedio = habilidadesMiembro.length > 0 ? (habilidadesMiembro.reduce(function(sum, h) { return sum + nivelesValor[h.nivel]; }, 0) / habilidadesMiembro.length) : 0;
          const colorPromedio = nivelPromedio >= 2.5 ? '#10b981' : nivelPromedio >= 1.5 ? '#facc15' : '#f97316';

          return `
            <div class="skill-card" data-miembro="${m}">
              <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
                <div style="width: 50px; height: 50px; background: linear-gradient(135deg, ${colorPromedio}, ${colorPromedio}cc); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: bold; color: white;">${iniciales}</div>
                <div>
                  <h3 style="margin: 0; font-size: 18px; font-weight: 700;">${escapeHtml(m)}</h3>
                  <p style="margin: 4px 0 0; color: #64748b; font-size: 11px;">${habilidadesMiembro.length} skill(s) registered</p>
                </div>
              </div>
              <div class="skills-list" id="skills-list-${m.replace(/\s/g, '_')}">
                ${habilidadesMiembro.map(function(skill, idx) {
                  return `
                    <div class="skill-item" data-skill-index="${idx}">
                      <input type="text" class="skill-name-input" value="${escapeHtml(skill.nombre)}" placeholder="Skill name" style="flex:1; background:transparent; border:none; font-weight:500; padding:4px 0;">
                      <div class="skill-level">
                        <button class="level-btn ${skill.nivel === 'Basic' ? 'active' : ''}" data-nivel="Basic" style="background: ${skill.nivel === 'Basic' ? '#f97316' : '#e2e8f0'}; color: ${skill.nivel === 'Basic' ? 'white' : '#475569'};">🌱 Basic</button>
                        <button class="level-btn ${skill.nivel === 'Intermediate' ? 'active' : ''}" data-nivel="Intermediate" style="background: ${skill.nivel === 'Intermediate' ? '#facc15' : '#e2e8f0'}; color: ${skill.nivel === 'Intermediate' ? 'white' : '#475569'};">📈 Intermediate</button>
                        <button class="level-btn ${skill.nivel === 'Advanced' ? 'active' : ''}" data-nivel="Advanced" style="background: ${skill.nivel === 'Advanced' ? '#10b981' : '#e2e8f0'}; color: ${skill.nivel === 'Advanced' ? 'white' : '#475569'};">🏆 Advanced</button>
                      </div>
                      <button class="btn-remove-skill">🗑️</button>
                    </div>
                  `;
                }).join('')}
              </div>
              <button class="btn-add-skill">+ ${window.translations.skillsAddSkill}</button>
            </div>
          `;
        }).join('')}
      </div>

      <div style="background: white; border-radius: 24px; padding: 24px; margin-bottom: 32px;">
        <h3>📋 ${window.translations.skillsGapAnalysis}</h3>
        <table class="gaps-table">
          <thead><tr><th>${window.translations.skillsTeamMember}</th><th>${window.translations.skillsSkillsCount}</th><th>${window.translations.skillsAvgLevel}</th><th>${window.translations.skillsStatus}</th><th>${window.translations.skillsRecommendation}</th></tr></thead>
          <tbody>
            ${miembros.map(function(m) {
              const habilidadesMiembro = habilidadesMap.get(m) || [];
              const avgSkill = habilidadesMiembro.length > 0 ? (habilidadesMiembro.reduce(function(sum, h) { return sum + nivelesValor[h.nivel]; }, 0) / habilidadesMiembro.length).toFixed(1) : 0;
              const status = habilidadesMiembro.length === 0 ? window.translations.skillsMissing : avgSkill >= 2.5 ? window.translations.skillsStrong : avgSkill >= 1.5 ? window.translations.skillsDeveloping : window.translations.skillsBasic;
              const statusColor = habilidadesMiembro.length === 0 ? '#ef4444' : avgSkill >= 2.5 ? '#10b981' : avgSkill >= 1.5 ? '#facc15' : '#f97316';
              const recommendation = habilidadesMiembro.length === 0 ? window.translations.skillsRegister : avgSkill < 2 ? window.translations.skillsConsiderTraining : window.translations.skillsMaintain;
              return `<tr><td><strong>${escapeHtml(m)}</strong></td><td>${habilidadesMiembro.length}</td><td>${avgSkill}/3.0</td><td><span style="background:${statusColor}20; color:${statusColor}; padding:4px 12px; border-radius:20px; font-size:12px;">${status}</span></td><td>${recommendation}</td></tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-bottom: 32px;">
        <div class="insight-card" style="background: linear-gradient(135deg, #1e3a8a, #1e40af);">
          <h4>${window.translations.skillsTopTalent}</h4>
          <ul style="margin-top: 16px; list-style: none;">
            ${Array.from(habilidadesMap.entries()).map(function(entry) {
              var m = entry[0];
              var skills = entry[1];
              var advancedSkills = skills.filter(function(s) { return s.nivel === 'Advanced'; });
              if (advancedSkills.length > 0) {
                return `<li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.2);"><strong>${escapeHtml(m)}</strong>: ${advancedSkills.map(function(s) { return s.nombre; }).join(', ')}</li>`;
              }
              return '';
            }).filter(function(l) { return l; }).join('') || '<li>' + window.translations.skillsNoSkills + '</li>'}
          </ul>
        </div>
        <div class="insight-card" style="background: linear-gradient(135deg, #991b1b, #dc2626);">
          <h4>${window.translations.skillsDevelopment}</h4>
          <ul style="margin-top: 16px; list-style: none;">
            ${Array.from(habilidadesMap.entries()).map(function(entry) {
              var m = entry[0];
              var skills = entry[1];
              var basicSkills = skills.filter(function(s) { return s.nivel === 'Basic'; });
              if (basicSkills.length > 0) {
                return `<li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.2);"><strong>${escapeHtml(m)}</strong>: Training needed in ${basicSkills.map(function(s) { return s.nombre; }).join(', ')}</li>`;
              }
              return '';
            }).filter(function(l) { return l; }).join('') || '<li>All skills at adequate level</li>'}
          </ul>
        </div>
      </div>

      <div style="background: #f8fafc; border-radius: 24px; padding: 24px; margin-bottom: 32px;">
        <h3>💡 ${window.translations.skillsStrategicRecommendations}</h3>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 20px;">
          <div style="background: white; border-radius: 16px; padding: 16px;">
            <div style="font-size: 24px;">🎯</div>
            <strong>${window.translations.skillsImmediateActions}</strong>
            <ul style="margin-top: 12px; font-size: 12px;"><li>Complete missing skills (${miembros.length - miembrosConHabilidades} pending)</li><li>Validate competencies with leads</li></ul>
          </div>
          <div style="background: white; border-radius: 16px; padding: 16px;">
            <div style="font-size: 24px;">📊</div>
            <strong>${window.translations.skillsDevelopmentPlan}</strong>
            <ul style="margin-top: 12px; font-size: 12px;"><li>Training for ${nivelesCount['Basic']} basic skills</li><li>Mentorship program</li></ul>
          </div>
          <div style="background: white; border-radius: 16px; padding: 16px;">
            <div style="font-size: 24px;">📅</div>
            <strong>${window.translations.skillsSuccessMetrics}</strong>
            <ul style="margin-top: 12px; font-size: 12px;"><li>Target: 3+ skills per person</li><li>Next review: 30 days</li></ul>
          </div>
        </div>
      </div>

      <div class="footer">
        <p style="color:#64748b; font-size:11px;">${window.translations.skillsConfidential}<br>${window.translations.skillsGenerated}: ${new Date().toLocaleString('en-US')}</p>
      </div>
    </div>

    <script>
      function guardarTodasHabilidades() {
        const nuevasHabilidades = [];
        const cards = document.querySelectorAll('.skill-card');
        for (let i = 0; i < cards.length; i++) {
          const card = cards[i];
          const miembro = card.getAttribute('data-miembro');
          const habilidades = [];
          const skillItems = card.querySelectorAll('.skill-item');
          for (let j = 0; j < skillItems.length; j++) {
            const item = skillItems[j];
            const nombreInput = item.querySelector('.skill-name-input');
            const nombre = nombreInput ? nombreInput.value.trim() : '';
            if (!nombre) continue;
            let nivel = 'Basic';
            const levelBtns = item.querySelectorAll('.level-btn');
            for (let k = 0; k < levelBtns.length; k++) {
              if (levelBtns[k].classList.contains('active')) {
                const nivelText = levelBtns[k].textContent.replace(/[🌱📈🏆]/g, '').trim();
                if (nivelText === 'Basic') nivel = 'Basic';
                else if (nivelText === 'Intermediate') nivel = 'Intermediate';
                else if (nivelText === 'Advanced') nivel = 'Advanced';
                break;
              }
            }
            habilidades.push({ nombre: nombre, nivel: nivel });
          }
          if (habilidades.length > 0) {
            nuevasHabilidades.push({ projectId: '${proyecto.name}', miembro: miembro, habilidades: habilidades });
          }
        }
        window.habilidades = window.habilidades.filter(function(h) { return h.projectId !== '${proyecto.name}'; });
        window.habilidades.push.apply(window.habilidades, nuevasHabilidades);
        localStorage.setItem('habilidades', JSON.stringify(window.habilidades));
      }

      function agregarHabilidad(miembro, card) {
        const skillsList = card.querySelector('.skills-list');
        const nuevoIndex = skillsList.children.length;
        const newSkillHtml = \`
          <div class="skill-item" data-skill-index="\${nuevoIndex}">
            <input type="text" class="skill-name-input" value="" placeholder="Ej: Python, Liderazgo, SQL" style="flex:1; background:transparent; border:none; font-weight:500; padding:4px 0;">
            <div class="skill-level">
              <button class="level-btn active" data-nivel="Basic" style="background:#f97316; color:white;">🌱 Basic</button>
              <button class="level-btn" data-nivel="Intermediate" style="background:#e2e8f0; color:#475569;">📈 Intermediate</button>
              <button class="level-btn" data-nivel="Advanced" style="background:#e2e8f0; color:#475569;">🏆 Advanced</button>
            </div>
            <button class="btn-remove-skill">🗑️</button>
          </div>
        \`;
        skillsList.insertAdjacentHTML('beforeend', newSkillHtml);
        const newItem = skillsList.lastElementChild;
        newItem.querySelector('.skill-name-input').addEventListener('change', guardarTodasHabilidades);
        const levelBtns = newItem.querySelectorAll('.level-btn');
        for (let i = 0; i < levelBtns.length; i++) {
          levelBtns[i].addEventListener('click', function() {
            const parent = this.closest('.skill-item');
            const btns = parent.querySelectorAll('.level-btn');
            for (let j = 0; j < btns.length; j++) {
              btns[j].classList.remove('active');
              btns[j].style.background = '#e2e8f0';
              btns[j].style.color = '#475569';
            }
            this.classList.add('active');
            this.style.background = this.getAttribute('data-nivel') === 'Basic' ? '#f97316' : (this.getAttribute('data-nivel') === 'Intermediate' ? '#facc15' : '#10b981');
            this.style.color = 'white';
            guardarTodasHabilidades();
          });
        }
        newItem.querySelector('.btn-remove-skill').addEventListener('click', function() {
          this.closest('.skill-item').remove();
          guardarTodasHabilidades();
        });
        guardarTodasHabilidades();
      }

      // Inicializar eventos
      const cards = document.querySelectorAll('.skill-card');
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const miembro = card.getAttribute('data-miembro');
        const addBtn = card.querySelector('.btn-add-skill');
        addBtn.addEventListener('click', function() { agregarHabilidad(miembro, card); });
        const skillItems = card.querySelectorAll('.skill-item');
        for (let j = 0; j < skillItems.length; j++) {
          const item = skillItems[j];
          item.querySelector('.skill-name-input').addEventListener('change', guardarTodasHabilidades);
          const levelBtns = item.querySelectorAll('.level-btn');
          for (let k = 0; k < levelBtns.length; k++) {
            levelBtns[k].addEventListener('click', function() {
              const parent = this.closest('.skill-item');
              const btns = parent.querySelectorAll('.level-btn');
              for (let l = 0; l < btns.length; l++) {
                btns[l].classList.remove('active');
                btns[l].style.background = '#e2e8f0';
                btns[l].style.color = '#475569';
              }
              this.classList.add('active');
              this.style.background = this.getAttribute('data-nivel') === 'Basic' ? '#f97316' : (this.getAttribute('data-nivel') === 'Intermediate' ? '#facc15' : '#10b981');
              this.style.color = 'white';
              guardarTodasHabilidades();
            });
          }
          item.querySelector('.btn-remove-skill').addEventListener('click', function() {
            this.closest('.skill-item').remove();
            guardarTodasHabilidades();
          });
        }
      }

      document.getElementById('btnExportPDF').onclick = function() { window.print(); };
      document.getElementById('btnPrint').onclick = function() { window.print(); };
    <\/script>
  </body>
  </html>`;

  const ventana = window.open('', '_blank');
  if (!ventana) {
    alert('⚠️ Please allow popup windows to view the skills matrix.');
    return;
  }
  ventana.document.write(html);
  ventana.document.close();
};

console.log('✅ renderMatrizHabilidades traducido al inglés. Abre el modal y ve a la pestaña Habilidades para probar.');

// ============================================================
// AMPLIAR TRADUCCIONES PARA LA PESTAÑA RECONOCIMIENTOS
// ============================================================
window.translations = Object.assign(window.translations || {}, {
  // Títulos y etiquetas de Reconocimientos
  recognitionTitle: '🏆 Executive Recognition',
  recognitionSubtitle: 'Celebrating team excellence',
  recognitionNoProject: '⚠️ No project selected',
  recognitionCompletedTasks: 'tasks completed',
  recognitionMilestones: 'milestones achieved',
  recognitionElite: '🏆 ELITE TEAM!',
  recognitionExcellence: '🥇 OPERATIONAL EXCELLENCE',
  recognitionSignificant: '🎯 SIGNIFICANT ACHIEVEMENT',
  recognitionMilestone: '🏅 PROJECT MILESTONE',
  recognitionOnTrack: '🚀 ON TRACK FOR SUCCESS',
  recognitionPlatinum: 'Platinum',
  recognitionGold: 'Gold',
  recognitionSilver: 'Silver',
  recognitionBronze: 'Bronze',
  recognitionActive: '✨ Recognition active',
  recognitionNextTask: 'tasks for next recognition',
  recognitionFirstTask: 'tasks for first recognition',
  recognitionAchievement: 'Achievement unlocked!',
  recognitionCompleted: 'Completed',
  recognitionInProgress: 'In Progress',
  recognitionPending: 'Pending',
  recognitionOverdue: 'Overdue',
  recognitionCritical: 'Critical',
  recognitionProgress: 'Progress',
  recognitionTasksDone: 'Tasks Done',
  recognitionOverdueTasks: 'Overdue',
  recognitionQuickActions: '⚡ Quick Actions',
  recognitionExport: '📄 Export',
  recognitionSchedule: '📅 Schedule',
  recognitionNotify: '🔔 Notify',
  recognitionDashboard: '📊 Dashboard',
  recognitionReportCopied: '✅ Report copied to clipboard',
  recognitionNotificationCopied: '✅ Notification copied to clipboard',
  recognitionReviewScheduled: '📅 Executive Review scheduled for',
  recognitionFullDashboard: '📊 Full Dashboard',
  recognitionFeatureSoon: 'Feature coming soon!',
  recognitionConfidential: '🔒 CONFIDENTIAL - For executive use only',
  recognitionGenerated: 'Generated',
});


// ============================================================
// RENDER RECONOCIMIENTOS - VERSIÓN INGLESA
// ============================================================
window.renderReconocimientos = function(container) {
  // Función auxiliar para escapar HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  // Obtener proyecto actual
  const proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
  if (!proyecto) {
    container.innerHTML = '<div class="error">' + window.translations.recognitionNoProject + '</div>';
    return;
  }

  // Datos del proyecto
  const tasks = proyecto.tasks || [];
  const completadas = tasks.filter(function(t) { return t.status === 'completed'; }).length;
  const totalTareas = tasks.length;
  const hitos = JSON.parse(localStorage.getItem('hitos') || '[]');
  const hitosDelProyecto = hitos.filter(function(h) { return h.projectId === proyecto.name; });
  const hitosCompletados = hitosDelProyecto.filter(function(h) {
    const task = tasks.find(function(t) { return t.id === h.taskId; });
    return task && task.status === 'completed';
  }).length;
  const totalHitos = hitosDelProyecto.length;

  // Calcular próximos reconocimientos
  const tareasParaProximoReconocimiento = completadas % 5 === 0 ? 0 : 5 - (completadas % 5);
  const hitosRestantes = totalHitos - hitosCompletados;
  const tieneReconocimiento = completadas > 0 && completadas % 5 === 0;
  const tieneHitoReconocimiento = hitosCompletados > 0 && (hitosCompletados !== hitosDelProyecto.length || hitosCompletados > 0);

  // Generar mensaje principal según logros
  let mensajePrincipal = '';
  let mensajeDetalle = '';
  let nivelLogro = 'bronce';

  if (completadas >= 20) {
    nivelLogro = 'platino';
    mensajePrincipal = window.translations.recognitionElite;
    mensajeDetalle = 'They have completed ' + completadas + ' tasks, an outstanding record.';
  } else if (completadas >= 10) {
    nivelLogro = 'oro';
    mensajePrincipal = window.translations.recognitionExcellence;
    mensajeDetalle = completadas + ' tasks completed. Team efficiency is remarkable.';
  } else if (completadas >= 5) {
    nivelLogro = 'plata';
    mensajePrincipal = window.translations.recognitionSignificant;
    mensajeDetalle = 'Team has surpassed ' + completadas + ' tasks. Keep the momentum.';
  } else if (completadas > 0 && completadas % 5 === 0) {
    nivelLogro = 'bronce';
    mensajePrincipal = '🎉 MILESTONE REACHED';
    mensajeDetalle = 'Excellent! You have completed ' + completadas + ' tasks.';
  } else if (hitosCompletados > 0) {
    nivelLogro = 'bronce';
    mensajePrincipal = window.translations.recognitionMilestone;
    mensajeDetalle = hitosCompletados + ' out of ' + totalHitos + ' milestones completed. Strategic progress.';
  } else {
    mensajePrincipal = window.translations.recognitionOnTrack;
    mensajeDetalle = tareasParaProximoReconocimiento + ' tasks or ' + hitosRestantes + ' milestones needed for the next recognition.';
  }

  // Colores según nivel
  const colores = {
    platino: { bg: '#e5e7eb', text: '#1e293b', accent: '#a0a0a0', glow: '#cbd5e1' },
    oro: { bg: '#fef3c7', text: '#78350f', accent: '#f59e0b', glow: '#fcd34d' },
    plata: { bg: '#f1f5f9', text: '#1e293b', accent: '#94a3b8', glow: '#cbd5e1' },
    bronce: { bg: '#ffedd5', text: '#7c2d12', accent: '#b45309', glow: '#fed7aa' }
  };
  const color = colores[nivelLogro];

  // Calcular porcentaje de avance hacia el próximo reconocimiento por tareas
  let progresoReconocimiento = 0;
  let metaTexto = '';
  if (completadas > 0) {
    const modulo = completadas % 5;
    if (modulo === 0 && completadas > 0) {
      progresoReconocimiento = 100;
      metaTexto = window.translations.recognitionAchievement;
    } else {
      const completadasCiclo = completadas - (Math.floor(completadas / 5) * 5);
      progresoReconocimiento = (completadasCiclo / 5) * 100;
      metaTexto = (5 - completadasCiclo) + ' ' + window.translations.recognitionNextTask;
    }
  } else {
    metaTexto = '5 ' + window.translations.recognitionFirstTask;
  }

  // ========== GENERAR HTML ==========
  const html = `
    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 32px; padding: 28px; margin-bottom: 30px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">

      <!-- Encabezado ejecutivo -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; margin-bottom: 32px;">
        <div>
          <h2 style="margin: 0; font-size: 28px; font-weight: 700; background: linear-gradient(135deg, #fff, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            ${window.translations.recognitionTitle}
          </h2>
          <p style="margin: 8px 0 0 0; color: #94a3b8;">${window.translations.recognitionSubtitle} · ${escapeHtml(proyecto.name)}</p>
        </div>
        <div style="background: rgba(139,92,246,0.2); border-radius: 40px; padding: 8px 20px;">
          <span style="color: #a78bfa; font-weight: 500;">📈 ${completadas} ${window.translations.recognitionCompletedTasks}</span>
        </div>
      </div>

      <!-- Tarjeta de reconocimiento principal -->
      <div style="background: ${color.bg}; border-radius: 28px; padding: 28px; margin-bottom: 32px; transition: all 0.3s; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2);">
        <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
          <div style="font-size: 64px;">${nivelLogro === 'platino' ? '🏆' : nivelLogro === 'oro' ? '🥇' : nivelLogro === 'plata' ? '🥈' : '🥉'}</div>
          <div style="flex: 1;">
            <h3 style="margin: 0; font-size: 24px; font-weight: 700; color: ${color.text};">${mensajePrincipal}</h3>
            <p style="margin: 8px 0 0; font-size: 16px; color: ${color.text}80;">${mensajeDetalle}</p>
          </div>
          ${tieneReconocimiento || tieneHitoReconocimiento ? `
            <div style="background: ${color.accent}20; border-radius: 40px; padding: 8px 20px; border-left: 3px solid ${color.accent};">
              <span style="color: ${color.accent}; font-weight: bold;">${window.translations.recognitionActive}</span>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Indicadores de progreso (tarjetas gemelas) -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px;">
        <!-- Progreso hacia próximo reconocimiento por tareas -->
        <div style="background: #1e293b; border-radius: 24px; padding: 20px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
            <span style="color: #94a3b8;">📋 Next recognition (tasks)</span>
            <span style="color: #e2e8f0; font-weight: bold;">${Math.floor(completadas / 5)} achievements</span>
          </div>
          <div style="height: 12px; background: #0f172a; border-radius: 20px; overflow: hidden; margin-bottom: 12px;">
            <div style="width: ${progresoReconocimiento}%; height: 100%; background: linear-gradient(90deg, #10b981, #34d399); border-radius: 20px; transition: width 0.5s;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; margin-top: 8px;">
            <span style="font-size: 14px; color: #94a3b8;">${metaTexto}</span>
            <span style="font-size: 14px; font-weight: 500; color: #10b981;">${Math.round(progresoReconocimiento)}%</span>
          </div>
        </div>

        <!-- Progreso de hitos -->
        <div style="background: #1e293b; border-radius: 24px; padding: 20px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
            <span style="color: #94a3b8;">🎯 Project milestones</span>
            <span style="color: #e2e8f0; font-weight: bold;">${hitosCompletados}/${totalHitos}</span>
          </div>
          <div style="height: 12px; background: #0f172a; border-radius: 20px; overflow: hidden; margin-bottom: 12px;">
            <div style="width: ${totalHitos ? (hitosCompletados / totalHitos) * 100 : 0}%; height: 100%; background: linear-gradient(90deg, #8b5cf6, #a78bfa); border-radius: 20px; transition: width 0.5s;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; margin-top: 8px;">
            <span style="font-size: 14px; color: #94a3b8;">${hitosRestantes} milestones remaining</span>
            <span style="font-size: 14px; font-weight: 500; color: #a78bfa;">${totalHitos ? Math.round((hitosCompletados / totalHitos) * 100) : 0}%</span>
          </div>
        </div>
      </div>

      <!-- Logros adicionales: badges de reconocimientos recientes -->
      <div style="border-top: 1px solid #334155; padding-top: 24px; margin-top: 8px;">
        <h4 style="margin: 0 0 16px 0; font-size: 16px; color: #cbd5e1;">🏅 Recent achievements</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 12px;">
          ${completadas >= 5 ? `<div style="background: #0f172a; border-radius: 40px; padding: 8px 20px; display: flex; align-items: center; gap: 8px;"><span>🎉</span><span>+5 tasks completed</span></div>` : ''}
          ${completadas >= 10 ? `<div style="background: #0f172a; border-radius: 40px; padding: 8px 20px; display: flex; align-items: center; gap: 8px;"><span>🌟</span><span>Double digit tasks</span></div>` : ''}
          ${completadas >= 20 ? `<div style="background: #0f172a; border-radius: 40px; padding: 8px 20px; display: flex; align-items: center; gap: 8px;"><span>🏆</span><span>Elite 20+ tasks</span></div>` : ''}
          ${hitosCompletados > 0 ? `<div style="background: #0f172a; border-radius: 40px; padding: 8px 20px; display: flex; align-items: center; gap: 8px;"><span>🏅</span><span>Milestone achieved</span></div>` : ''}
          ${hitosCompletados === totalHitos && totalHitos > 0 ? `<div style="background: #0f172a; border-radius: 40px; padding: 8px 20px; display: flex; align-items: center; gap: 8px;"><span>🚀</span><span>All milestones completed</span></div>` : ''}
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Si se acaba de alcanzar un reconocimiento, mostrar notificación elegante (opcional)
  if (tieneReconocimiento || (hitosCompletados > 0 && hitosCompletados === totalHitos)) {
    mostrarNotificacionEjecutiva(mensajePrincipal, color.accent);
  }

  function mostrarNotificacionEjecutiva(mensaje, color) {
    const notif = document.createElement('div');
    notif.innerHTML = `
      <div style="background: ${color}; color: white; padding: 16px 24px; border-radius: 40px; font-weight: 600; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.3); display: flex; align-items: center; gap: 12px;">
        <span>🎉</span> ${mensaje}
      </div>
    `;
    notif.style.position = 'fixed';
    notif.style.bottom = '20px';
    notif.style.right = '20px';
    notif.style.zIndex = '10000';
    notif.style.transition = 'opacity 0.3s';
    document.body.appendChild(notif);
    setTimeout(function() {
      notif.style.opacity = '0';
      setTimeout(function() { notif.remove(); }, 500);
    }, 4000);
  }
};

console.log('✅ renderReconocimientos traducido al inglés. Abre el modal y ve a la pestaña Reconocimientos para probar.');

// ============================================================
// AMPLIAR TRADUCCIONES PARA LA PESTAÑA MATRIZ DE RIESGOS
// ============================================================
window.translations = Object.assign(window.translations || {}, {
  // Títulos y etiquetas de Matriz de Riesgos
  riskMatrixTitle: '⚠️ Risk Assessment Matrix',
  riskMatrixSubtitle: 'Enterprise Risk Management · Quantitative Analysis',
  riskMatrixNoProject: '⚠️ No project selected',
  riskMatrixNoRisks: '🛡️ No active risks detected',
  riskMatrixNoRisksMessage: 'All tasks are within deadline or have been completed.',
  riskMatrixOptimal: '✅ Optimal project health status',
  riskMatrixTotalRisks: 'TOTAL RISKS',
  riskMatrixExtremeCritical: 'EXTREME + CRITICAL',
  riskMatrixHighMedium: 'HIGH + MEDIUM',
  riskMatrixFinancialImpact: 'EST. FINANCIAL IMPACT',
  riskMatrixHeatMap: 'Risk Heat Map',
  riskMatrixLegend: 'Legend: Score = Impact × Probability',
  riskMatrixRegister: 'Risk Register',
  riskMatrixRiskID: 'Risk ID',
  riskMatrixRiskDescription: 'Risk Description',
  riskMatrixImpact: 'Impact',
  riskMatrixProbability: 'Probability',
  riskMatrixScore: 'Score',
  riskMatrixLevel: 'Level',
  riskMatrixDaysOverdue: 'Days Overdue',
  riskMatrixActionPlan: 'Action Plan',
  riskMatrixOwner: 'Owner',
  riskMatrixExtremeAction: '🔴 Escalate to Board',
  riskMatrixCriticalAction: '🟠 Crisis meeting in 24h',
  riskMatrixHighAction: '🟡 Contingency plan',
  riskMatrixMediumAction: '📌 Weekly monitoring',
  riskMatrixLowAction: '🟢 Regular follow-up',
  riskMatrixExecutiveRecommendation: 'Executive Recommendation',
  riskMatrixActionPlanLabel: '📋 Action Plan:',
  riskMatrixImmediateActions: 'Immediate Actions',
  riskMatrixMitigationPlan: 'Mitigation Plan',
  riskMatrixNextReview: 'Next Review',
  riskMatrixConfidential: '🔒 CONFIDENTIAL - For executive use only',
  riskMatrixMethodology: 'Methodology: ISO 31000 Risk Management Standard · Score = Impact × Probability (1-5 each)',
  riskMatrixGenerated: 'Generated',
  riskMatrixSource: 'Source: PM Virtual Executive Platform',
  riskMatrixExtreme: 'Extreme',
  riskMatrixCritical: 'Critical',
  riskMatrixHigh: 'High',
  riskMatrixMedium: 'Medium',
  riskMatrixLow: 'Low',
});

// ============================================================
// RENDER MATRIZ RIESGOS - VERSIÓN INGLESA
// ============================================================
window.renderMatrizRiesgos = function(container) {
  // Función auxiliar para escapar HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  // Obtener proyecto actual
  const proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
  if (!proyecto) {
    container.innerHTML = '<div style="text-align:center; padding:60px; background:#f8fafc; border-radius:32px;"><p style="color:#64748b;">' + window.translations.riskMatrixNoProject + '</p></div>';
    return;
  }

  const tasks = proyecto.tasks || [];
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  // Identificar riesgos: tareas con deadline pasado y no completadas
  const riesgos = tasks.filter(function(t) {
    if (!t.deadline) return false;
    const deadline = new Date(t.deadline);
    deadline.setHours(0, 0, 0, 0);
    return deadline < hoy && t.status !== 'completed';
  });

  if (riesgos.length === 0) {
    container.innerHTML = `
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 32px; padding: 60px; text-align: center;">
        <div style="font-size: 64px; margin-bottom: 20px;">🛡️</div>
        <h3 style="margin: 0; color: #e2e8f0; font-size: 24px;">${window.translations.riskMatrixNoRisks}</h3>
        <p style="color: #94a3b8; margin-top: 12px;">${window.translations.riskMatrixNoRisksMessage}</p>
        <div style="margin-top: 24px; background: rgba(16,185,129,0.15); display: inline-block; padding: 8px 24px; border-radius: 40px;">
          <span style="color: #10b981;">${window.translations.riskMatrixOptimal}</span>
        </div>
      </div>
    `;
    return;
  }

  // ========== CALCULAR MÉTRICAS DE RIESGOS ==========
  const riesgosConMetricas = riesgos.map(function(t, idx) {
    const deadline = new Date(t.deadline);
    const diasAtraso = Math.max(0, Math.floor((hoy - deadline) / (1000 * 60 * 60 * 24)));
    const horasEstimadas = t.estimatedTime || 0;
    const prioridad = t.priority || 'medium';

    // Impacto (1-5)
    let impacto = 2;
    if (diasAtraso >= 14) impacto = 5;
    else if (diasAtraso >= 7) impacto = 4;
    else if (diasAtraso >= 3) impacto = 3;
    else if (diasAtraso >= 1) impacto = 2;

    if (horasEstimadas > 80) impacto = Math.min(5, impacto + 1);
    else if (horasEstimadas > 40) impacto = Math.min(5, impacto);
    if (prioridad === 'high') impacto = Math.min(5, impacto + 1);

    impacto = Math.min(5, Math.max(1, impacto));

    // Probabilidad (1-5)
    let probabilidad = 3;
    if (t.status === 'pending') probabilidad = 5;
    else if (t.status === 'inProgress') probabilidad = 4;
    else if (t.status === 'overdue' || t.status === 'rezagado') probabilidad = 4;

    if (diasAtraso > 10) probabilidad = Math.min(5, probabilidad + 1);
    probabilidad = Math.min(5, Math.max(1, probabilidad));

    const riesgoScore = impacto * probabilidad;
    let nivel = '';
    let colorNivel = '';
    let bgColorNivel = '';
    let icono = '';
    let riesgoId = 'R-' + (idx+1).toString().padStart(3, '0');

    if (riesgoScore >= 20) {
      nivel = window.translations.riskMatrixExtreme;
      colorNivel = '#7f1d1d';
      bgColorNivel = 'rgba(127,29,29,0.15)';
      icono = '🔴';
    } else if (riesgoScore >= 15) {
      nivel = window.translations.riskMatrixCritical;
      colorNivel = '#dc2626';
      bgColorNivel = 'rgba(220,38,38,0.15)';
      icono = '🟠';
    } else if (riesgoScore >= 10) {
      nivel = window.translations.riskMatrixHigh;
      colorNivel = '#f97316';
      bgColorNivel = 'rgba(249,115,22,0.15)';
      icono = '🟡';
    } else if (riesgoScore >= 5) {
      nivel = window.translations.riskMatrixMedium;
      colorNivel = '#facc15';
      bgColorNivel = 'rgba(250,204,21,0.15)';
      icono = '📌';
    } else {
      nivel = window.translations.riskMatrixLow;
      colorNivel = '#10b981';
      bgColorNivel = 'rgba(16,185,129,0.15)';
      icono = '✅';
    }

    return {
      id: riesgoId,
      ...t,
      impacto: impacto,
      probabilidad: probabilidad,
      riesgoScore: riesgoScore,
      nivel: nivel,
      colorNivel: colorNivel,
      bgColorNivel: bgColorNivel,
      icono: icono,
      diasAtraso: diasAtraso,
      horasEstimadas: horasEstimadas
    };
  });

  // Ordenar por nivel de riesgo (mayor a menor)
  riesgosConMetricas.sort(function(a, b) { return b.riesgoScore - a.riesgoScore; });

  // Estadísticas para resumen ejecutivo
  const totalRiesgos = riesgosConMetricas.length;
  const riesgoPromedio = (riesgosConMetricas.reduce(function(s, r) { return s + r.riesgoScore; }, 0) / totalRiesgos).toFixed(1);
  const riesgosExtremos = riesgosConMetricas.filter(function(r) { return r.nivel === window.translations.riskMatrixExtreme; }).length;
  const riesgosCriticos = riesgosConMetricas.filter(function(r) { return r.nivel === window.translations.riskMatrixCritical; }).length;
  const riesgosAltos = riesgosConMetricas.filter(function(r) { return r.nivel === window.translations.riskMatrixHigh; }).length;
  const riesgosMedios = riesgosConMetricas.filter(function(r) { return r.nivel === window.translations.riskMatrixMedium; }).length;
  const riesgosBajos = riesgosConMetricas.filter(function(r) { return r.nivel === window.translations.riskMatrixLow; }).length;

  const scorePromedioColor = parseFloat(riesgoPromedio) >= 15 ? '#dc2626' : parseFloat(riesgoPromedio) >= 10 ? '#f97316' : parseFloat(riesgoPromedio) >= 5 ? '#facc15' : '#10b981';

  // Impacto financiero estimado
  const impactoFinanciero = Math.round(riesgosConMetricas.reduce(function(s, r) { return s + (r.horasEstimadas * 50 * r.impacto); }, 0));

  // Recomendación ejecutiva
  let recomendacion = '';
  let recomendacionColor = '';
  let planAccion = '';

  if (riesgosExtremos > 0) {
    recomendacion = '🔴 MAXIMUM ALERT: Extreme risks detected. Immediate Board intervention required.';
    recomendacionColor = '#dc2626';
    planAccion = 'Call crisis meeting within 24 hours. Evaluate structural changes to the project.';
  } else if (riesgosCriticos > 0) {
    recomendacion = '🟠 PRIORITY ATTENTION: Critical risks require executive action within 48 hours.';
    recomendacionColor = '#f97316';
    planAccion = 'Review allocated resources. Reassign key personnel. Escalate to project sponsor.';
  } else if (riesgosAltos > 0) {
    recomendacion = '🟡 INTENSIVE MONITORING: High risks under active follow-up. Contingency plan activated.';
    recomendacionColor = '#facc15';
    planAccion = 'Weekly follow-up meeting. Adjust schedule. Validate with stakeholders.';
  } else {
    recomendacion = '🟢 RISKS CONTROLLED: The project is within acceptable parameters.';
    recomendacionColor = '#10b981';
    planAccion = 'Maintain regular monitoring. Document lessons learned.';
  }

  // ========== GENERAR HTML ==========
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Risk Matrix Report - ${escapeHtml(proyecto.name)}</title>
    <style>
      @media print {
        body { margin: 0; padding: 20px; }
        .no-print { display: none !important; }
        .page-break { page-break-before: always; }
        .risk-card, .kpi-card, .matriz-container { break-inside: avoid; }
      }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
        background: #f0f4f8;
        padding: 40px;
        color: #1e293b;
      }
      .report-container {
        max-width: 1400px;
        margin: 0 auto;
      }
      .btn-group {
        display: flex;
        gap: 16px;
        justify-content: flex-end;
        margin-bottom: 24px;
      }
      .btn-pdf, .btn-print {
        border: none;
        padding: 12px 28px;
        border-radius: 40px;
        color: white;
        font-weight: 600;
        font-size: 13px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        transition: transform 0.2s;
      }
      .btn-pdf { background: linear-gradient(135deg, #dc2626, #b91c1c); }
      .btn-print { background: linear-gradient(135deg, #3b82f6, #2563eb); }
      .btn-pdf:hover, .btn-print:hover { transform: scale(1.02); }
      .corporate-header {
        background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
        border-radius: 32px;
        padding: 48px;
        margin-bottom: 32px;
        position: relative;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
      }
      .corporate-header::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -20%;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(239,68,68,0.15), transparent);
        border-radius: 50%;
      }
      .kpi-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
        margin-bottom: 32px;
      }
      .kpi-card {
        background: white;
        border-radius: 24px;
        padding: 24px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        border: 1px solid #e2e8f0;
        transition: all 0.2s;
      }
      .kpi-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -8px rgba(0,0,0,0.15); }
      .kpi-value {
        font-size: 42px;
        font-weight: 800;
        line-height: 1.2;
        margin: 12px 0 4px 0;
      }
      .matriz-container {
        background: white;
        border-radius: 24px;
        padding: 28px;
        margin-bottom: 32px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        border: 1px solid #e2e8f0;
      }
      .celda-riesgo {
        height: 70px;
        margin: 4px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }
      .celda-riesgo:hover { transform: scale(1.02); z-index: 10; }
      .risk-badge {
        width: 50px;
        height: 50px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        font-size: 11px;
        font-weight: 700;
        text-align: center;
        line-height: 1.2;
        word-break: break-word;
      }
      .risk-badge:hover {
        transform: scale(1.15);
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      }
      .risks-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }
      .risks-table th, .risks-table td {
        padding: 14px 16px;
        text-align: left;
        border-bottom: 1px solid #e2e8f0;
      }
      .risks-table th {
        background: #f8fafc;
        font-weight: 600;
        color: #1e293b;
      }
      .risk-level-badge {
        display: inline-block;
        padding: 6px 16px;
        border-radius: 40px;
        font-size: 12px;
        font-weight: 600;
      }
      .progress-bar {
        background: #e2e8f0;
        height: 8px;
        border-radius: 10px;
        overflow: hidden;
      }
      .insight-card {
        border-radius: 24px;
        padding: 28px;
        margin-bottom: 32px;
      }
      .footer {
        background: white;
        border-radius: 20px;
        padding: 24px;
        text-align: center;
        border: 1px solid #e2e8f0;
        margin-top: 32px;
      }
      .tooltip-hover {
        position: relative;
      }
    </style>
  </head>
  <body>
    <div class="report-container">
      <div class="btn-group no-print">
        <button class="btn-pdf" id="btnExportPDF">📄 ${window.translations.riskMatrixExportPDF || 'Export as PDF'}</button>
        <button class="btn-print" id="btnPrint">🖨️ ${window.translations.riskMatrixPrint || 'Print Report'}</button>
      </div>

      <!-- HEADER CORPORATE -->
      <div class="corporate-header">
        <div style="position: relative; z-index: 2;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
            <div>
              <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
                <div style="background: linear-gradient(135deg, #ef4444, #dc2626); width: 60px; height: 60px; border-radius: 20px; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 32px;">⚠️</span>
                </div>
                <div>
                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: white; letter-spacing: -0.5px;">${window.translations.riskMatrixTitle}</h1>
                  <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 14px;">${window.translations.riskMatrixSubtitle}</p>
                </div>
              </div>
              <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                <div style="background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); padding: 8px 24px; border-radius: 40px;">
                  <span style="color: #ef4444;">🎯</span>
                  <span style="color: #cbd5e1;">${escapeHtml(proyecto.name)}</span>
                </div>
                <div style="background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); padding: 8px 24px; border-radius: 40px;">
                  <span style="color: #3b82f6;">📅</span>
                  <span style="color: #cbd5e1;">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </div>
            <div style="background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border-radius: 28px; padding: 20px 32px; text-align: center; border: 1px solid rgba(255,255,255,0.1);">
              <div style="font-size: 11px; color: #94a3b8; letter-spacing: 1.5px;">RISK EXPOSURE INDEX</div>
              <div style="font-size: 56px; font-weight: 800; color: ${scorePromedioColor};">${riesgoPromedio}</div>
              <div style="font-size: 12px; color: #94a3b8;">/25 points</div>
            </div>
          </div>
        </div>
      </div>

      <!-- KPI EXECUTIVE DASHBOARD -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div style="display: flex; justify-content: space-between;">
            <span style="font-size: 13px; color: #64748b;">${window.translations.riskMatrixTotalRisks}</span>
            <span style="font-size: 24px;">⚠️</span>
          </div>
          <div class="kpi-value" style="color: #ef4444;">${totalRiesgos}</div>
          <div class="progress-bar"><div class="progress-bar-fill" style="width: ${Math.min(100, totalRiesgos * 10)}%; background: #ef4444; height: 100%;"></div></div>
        </div>
        <div class="kpi-card">
          <div style="display: flex; justify-content: space-between;">
            <span style="font-size: 13px; color: #64748b;">${window.translations.riskMatrixExtremeCritical}</span>
            <span style="font-size: 24px;">🔴</span>
          </div>
          <div class="kpi-value" style="color: #dc2626;">${riesgosExtremos + riesgosCriticos}</div>
          <div style="font-size: 12px; color: #64748b;">Require immediate action</div>
        </div>
        <div class="kpi-card">
          <div style="display: flex; justify-content: space-between;">
            <span style="font-size: 13px; color: #64748b;">${window.translations.riskMatrixHighMedium}</span>
            <span style="font-size: 24px;">🟡</span>
          </div>
          <div class="kpi-value" style="color: #facc15;">${riesgosAltos + riesgosMedios}</div>
          <div style="font-size: 12px; color: #64748b;">Intensive monitoring</div>
        </div>
        <div class="kpi-card">
          <div style="display: flex; justify-content: space-between;">
            <span style="font-size: 13px; color: #64748b;">${window.translations.riskMatrixFinancialImpact}</span>
            <span style="font-size: 24px;">💰</span>
          </div>
          <div class="kpi-value" style="color: #10b981;">$${(impactoFinanciero / 1000).toFixed(1)}K</div>
          <div style="font-size: 12px; color: #64748b;">Potential overrun</div>
        </div>
      </div>

      <!-- HEAT MAP MATRIX 5x5 -->
      <div class="matriz-container">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <h3 style="margin: 0; font-size: 18px; font-weight: 700;">${window.translations.riskMatrixHeatMap}</h3>
            <p style="margin: 8px 0 0 0; font-size: 13px; color: #64748b;">Impact vs Probability Matrix · Hover over each badge to see details</p>
          </div>
          <div style="background: #f8fafc; border-radius: 40px; padding: 8px 20px;">
            <span style="font-size: 12px;">🎯 ${window.translations.riskMatrixLegend}</span>
          </div>
        </div>
        <div style="overflow-x: auto;">
          <div style="min-width: 550px;">
            <div style="display: flex; margin-bottom: 12px;">
              <div style="width: 80px;"></div>
              ${[1,2,3,4,5].map(function(p) { return '<div style="flex:1; text-align:center; font-weight:600; color:#475569;">P=' + p + '</div>'; }).join('')}
            </div>
            ${[5,4,3,2,1].map(function(impacto) {
              return '<div style="display: flex; align-items: center; margin-bottom: 8px;">' +
                '<div style="width: 80px; font-weight:600; color:#475569;">I=' + impacto + '</div>' +
                [1,2,3,4,5].map(function(probabilidad) {
                  const riesgosCelda = riesgosConMetricas.filter(function(r) { return r.impacto === impacto && r.probabilidad === probabilidad; });
                  let bgColor = '#f1f5f9';
                  if (impacto * probabilidad >= 20) { bgColor = '#7f1d1d'; }
                  else if (impacto * probabilidad >= 15) { bgColor = '#dc2626'; }
                  else if (impacto * probabilidad >= 10) { bgColor = '#f97316'; }
                  else if (impacto * probabilidad >= 5) { bgColor = '#facc15'; }
                  else if (impacto * probabilidad > 0) { bgColor = '#10b981'; }

                  return '<div class="celda-riesgo" style="background: ' + bgColor + '20; border: 1px solid ' + bgColor + '40;">' +
                    riesgosCelda.map(function(r) {
                      return '<div class="risk-badge" style="background: ' + r.colorNivel + '; color: white; font-size: 10px; font-weight: bold;" ' +
                        'title="📌 ' + escapeHtml(r.name) + ' | Score: ' + r.riesgoScore + ' | Impacto: ' + r.impacto + '/5 | Prob: ' + r.probabilidad + '/5 | Owner: ' + escapeHtml(r.assignee || 'Unassigned') + ' | Overdue: ' + r.diasAtraso + ' days">' +
                        r.id +
                      '</div>';
                    }).join('') +
                  '</div>';
                }).join('') +
              '</div>';
            }).join('')}
          </div>
        </div>
        <div style="display: flex; justify-content: center; gap: 24px; margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
          <div><span style="background: #10b981; width: 14px; height: 14px; display: inline-block; border-radius: 4px;"></span> <span style="font-size: 11px;">${window.translations.riskMatrixLow} (1-4)</span></div>
          <div><span style="background: #facc15; width: 14px; height: 14px; display: inline-block; border-radius: 4px;"></span> <span style="font-size: 11px;">${window.translations.riskMatrixMedium} (5-9)</span></div>
          <div><span style="background: #f97316; width: 14px; height: 14px; display: inline-block; border-radius: 4px;"></span> <span style="font-size: 11px;">${window.translations.riskMatrixHigh} (10-14)</span></div>
          <div><span style="background: #dc2626; width: 14px; height: 14px; display: inline-block; border-radius: 4px;"></span> <span style="font-size: 11px;">${window.translations.riskMatrixCritical} (15-19)</span></div>
          <div><span style="background: #7f1d1d; width: 14px; height: 14px; display: inline-block; border-radius: 4px;"></span> <span style="font-size: 11px;">${window.translations.riskMatrixExtreme} (20-25)</span></div>
        </div>
        <div style="margin-top: 16px; text-align: center; font-size: 11px; color: #64748b;">
          💡 Badges show risk ID. Hover over each for full details.
        </div>
      </div>

      <!-- DETAILED RISKS TABLE -->
      <div class="matriz-container">
        <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 700;">${window.translations.riskMatrixRegister}</h3>
        <div style="overflow-x: auto;">
          <table class="risks-table">
            <thead>
              <tr><th>${window.translations.riskMatrixRiskID}</th><th>${window.translations.riskMatrixRiskDescription}</th><th>${window.translations.riskMatrixImpact}</th><th>${window.translations.riskMatrixProbability}</th><th>${window.translations.riskMatrixScore}</th><th>${window.translations.riskMatrixLevel}</th><th>${window.translations.riskMatrixDaysOverdue}</th><th>${window.translations.riskMatrixActionPlan}</th><th>${window.translations.riskMatrixOwner}</th></tr>
            </thead>
            <tbody>
              ${riesgosConMetricas.map(function(r) {
                let actionPlan = '';
                if (r.nivel === window.translations.riskMatrixExtreme) actionPlan = window.translations.riskMatrixExtremeAction;
                else if (r.nivel === window.translations.riskMatrixCritical) actionPlan = window.translations.riskMatrixCriticalAction;
                else if (r.nivel === window.translations.riskMatrixHigh) actionPlan = window.translations.riskMatrixHighAction;
                else if (r.nivel === window.translations.riskMatrixMedium) actionPlan = window.translations.riskMatrixMediumAction;
                else actionPlan = window.translations.riskMatrixLowAction;

                return '<tr>' +
                  '<td style="font-family: monospace; font-weight: bold;">' + r.id + '</td>' +
                  '<td><strong>' + escapeHtml(r.name) + '</strong><br><span style="font-size: 11px; color: #64748b;">Assigned to: ' + escapeHtml(r.assignee || 'Unassigned') + '</span></td>' +
                  '<td style="text-align: center;">' + r.impacto + '/5</td>' +
                  '<td style="text-align: center;">' + r.probabilidad + '/5</td>' +
                  '<td style="text-align: center; font-weight: 700;">' + r.riesgoScore + '</td>' +
                  '<td><span class="risk-level-badge" style="background: ' + r.bgColorNivel + '; color: ' + r.colorNivel + ';">' + r.icono + ' ' + r.nivel + '</span></td>' +
                  '<td style="text-align: center;">' + r.diasAtraso + '</td>' +
                  '<td style="font-size: 12px;">' + actionPlan + '</td>' +
                  '<td>' + escapeHtml(r.assignee || 'To assign') + '</td>' +
                '</tr>';
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- EXECUTIVE INSIGHTS -->
      <div class="insight-card" style="background: linear-gradient(135deg, ${recomendacionColor}15, ${recomendacionColor}05); border: 1px solid ${recomendacionColor}30;">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
          <div style="font-size: 40px;">📊</div>
          <div>
            <h3 style="margin: 0; font-size: 18px; font-weight: 700; color: ${recomendacionColor};">${window.translations.riskMatrixExecutiveRecommendation}</h3>
            <p style="margin: 8px 0 0 0; color: #475569;">Based on quantitative risk analysis</p>
          </div>
        </div>
        <p style="font-size: 16px; font-weight: 500; margin-bottom: 16px;">${recomendacion}</p>
        <div style="background: white; border-radius: 16px; padding: 16px; margin-top: 16px;">
          <strong>${window.translations.riskMatrixActionPlanLabel}</strong> ${planAccion}
        </div>
      </div>

      <!-- STRATEGIC RECOMMENDATIONS -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 32px;">
        <div style="background: white; border-radius: 20px; padding: 20px; border: 1px solid #e2e8f0;">
          <div style="font-size: 32px; margin-bottom: 12px;">🚨</div>
          <div style="font-weight: 700; margin-bottom: 8px;">${window.translations.riskMatrixImmediateActions}</div>
          <ul style="margin-left: 20px; color: #475569; font-size: 12px; line-height: 1.6;">
            <li>${riesgosExtremos + riesgosCriticos > 0 ? 'Attend ' + (riesgosExtremos + riesgosCriticos) + ' extreme/critical risk(s)' : 'No critical risks'}</li>
            <li>Reassign resources to delayed tasks</li>
            <li>Notify affected stakeholders</li>
          </ul>
        </div>
        <div style="background: white; border-radius: 20px; padding: 20px; border: 1px solid #e2e8f0;">
          <div style="font-size: 32px; margin-bottom: 12px;">📋</div>
          <div style="font-weight: 700; margin-bottom: 8px;">${window.translations.riskMatrixMitigationPlan}</div>
          <ul style="margin-left: 20px; color: #475569; font-size: 12px; line-height: 1.6;">
            <li>Establish contingency plan</li>
            <li>Review time estimates</li>
            <li>Adjust baseline schedule</li>
          </ul>
        </div>
        <div style="background: white; border-radius: 20px; padding: 20px; border: 1px solid #e2e8f0;">
          <div style="font-size: 32px; margin-bottom: 12px;">📅</div>
          <div style="font-weight: 700; margin-bottom: 8px;">${window.translations.riskMatrixNextReview}</div>
          <ul style="margin-left: 20px; color: #475569; font-size: 12px; line-height: 1.6;">
            <li>Daily follow-up: ${riesgosExtremos + riesgosCriticos > 0 ? 'Yes' : 'No'}</li>
            <li>Weekly risk committee meeting</li>
            <li>Monthly executive dashboard update</li>
          </ul>
        </div>
      </div>

      <!-- FOOTER -->
      <div class="footer">
        <p style="color: #64748b; font-size: 11px; margin: 0;">
          <strong>${window.translations.riskMatrixConfidential}</strong><br>
          ${window.translations.riskMatrixMethodology}<br>
          ${window.translations.riskMatrixGenerated}: ${new Date().toLocaleString('en-US')} | ${window.translations.riskMatrixSource}
        </p>
      </div>
    </div>

    <script>
      document.getElementById('btnExportPDF').onclick = function() { window.print(); };
      document.getElementById('btnPrint').onclick = function() { window.print(); };
    <\/script>
  </body>
  </html>`;

  const ventana = window.open('', '_blank');
  if (!ventana) {
    alert('⚠️ Please allow popup windows to view the risk matrix.');
    return;
  }
  ventana.document.write(html);
  ventana.document.close();
};

console.log('✅ renderMatrizRiesgos traducido al inglés. Abre el modal y ve a la pestaña Matriz de Riesgos para probar.');


// ============================================================
// AMPLIAR TRADUCCIONES PARA LA PESTAÑA ACCIONES PREVENTIVAS
// ============================================================
window.translations = Object.assign(window.translations || {}, {
  // Títulos y etiquetas de Acciones Preventivas
  preventiveTitle: '🛡️ Preventive Actions',
  preventiveSubtitle: 'Proactive risk mitigation · Contingency plan',
  preventiveNoProject: '⚠️ No project selected',
  preventiveTotal: 'Total',
  preventiveAddAction: '➕ Add Action',
  preventiveAddPlaceholder: 'e.g., Perform weekly milestone audit, Train team in risk management...',
  preventiveSearch: '🔍 Search preventive action...',
  preventiveExport: '🖨️ Export action list',
  preventiveNoActions: '📋 No preventive actions registered',
  preventiveFirstAction: 'Add the first action to mitigate risks',
  preventiveActionAdded: '✅ Preventive action added successfully',
  preventiveActionDeleted: '🗑️ Action deleted',
  preventiveNoActionsToExport: '📋 No actions to export',
  preventiveExportSuccess: '✅ Preventive actions copied to clipboard',
  preventiveConfirmDelete: 'Delete this action?',
  preventiveConfirmDeleteAll: 'Delete all actions?',
  preventiveDeletedAll: 'All actions deleted',
  preventiveAlertEmpty: '⚠️ Please enter a description for the preventive action',
});

// ============================================================
// RENDER ACCIONES PREVENTIVAS - VERSIÓN INGLESA
// ============================================================
window.renderAccionesPreventivas = function(container) {
  // Función auxiliar para escapar HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  // Obtener proyecto actual
  const proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
  if (!proyecto) {
    container.innerHTML = '<p style="color:#94a3b8; text-align:center; padding:40px;">⚠️ ' + window.translations.preventiveNoProject + '</p>';
    return;
  }

  // Cargar acciones desde localStorage
  let accionesPreventivas = JSON.parse(localStorage.getItem('accionesPreventivas') || '[]');

  // Función para mostrar la lista (reutilizable)
  const mostrarLista = (filtro) => {
    const listaDiv = document.getElementById('listaAccionesPreventivas');
    if (!listaDiv) return;

    let accionesFiltradas = accionesPreventivas;
    if (filtro && filtro.trim()) {
      accionesFiltradas = accionesPreventivas.filter(function(a) {
        return a.texto.toLowerCase().includes(filtro.toLowerCase());
      });
    }

    if (accionesFiltradas.length === 0) {
      listaDiv.innerHTML = `
        <div style="text-align: center; padding: 40px; background: rgba(30,41,59,0.5); border-radius: 24px;">
          <p style="font-size: 1.1rem; color: #94a3b8;">${window.translations.preventiveNoActions}</p>
          <p style="font-size: 0.9rem; color: #64748b;">${window.translations.preventiveFirstAction}</p>
        </div>
      `;
      return;
    }

    listaDiv.innerHTML = accionesFiltradas.map(function(accion, idx) {
      return `
        <div style="background: #1e293b; border-radius: 16px; padding: 16px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; transition: all 0.2s; border-left: 4px solid #8b5cf6;">
          <div style="flex: 1; display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 20px;">🛡️</span>
            <span style="color: #e2e8f0; font-size: 15px;">${escapeHtml(accion.texto)}</span>
          </div>
          <button onclick="window.eliminarAccionPreventiva(${idx})"
                  style="background: #ef4444; border: none; color: white; width: 32px; height: 32px; border-radius: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
            <span style="font-size: 16px;">🗑️</span>
          </button>
        </div>
      `;
    }).join('');
  };

  // Actualizar contador
  const actualizarContador = function() {
    const contadorSpan = document.getElementById('totalAccionesPreventivas');
    if (contadorSpan) contadorSpan.textContent = accionesPreventivas.length;
  };

  // Función para agregar nueva acción
  const agregarNuevaAccion = function() {
    const input = document.getElementById('nuevaAccionPreventiva');
    const texto = input.value.trim();
    if (texto === '') {
      mostrarNotificacion(window.translations.preventiveAlertEmpty, '#f59e0b');
      return;
    }
    accionesPreventivas.push({ texto: texto });
    localStorage.setItem('accionesPreventivas', JSON.stringify(accionesPreventivas));
    input.value = '';
    const filtro = document.getElementById('filtroAcciones') ? document.getElementById('filtroAcciones').value : '';
    mostrarLista(filtro);
    actualizarContador();
    mostrarNotificacion(window.translations.preventiveActionAdded, '#10b981');
  };

  // Función para eliminar acción (global para poder llamarla desde el botón)
  window.eliminarAccionPreventiva = function(index) {
    if (confirm(window.translations.preventiveConfirmDelete)) {
      accionesPreventivas.splice(index, 1);
      localStorage.setItem('accionesPreventivas', JSON.stringify(accionesPreventivas));
      const filtro = document.getElementById('filtroAcciones') ? document.getElementById('filtroAcciones').value : '';
      mostrarLista(filtro);
      actualizarContador();
      mostrarNotificacion(window.translations.preventiveActionDeleted, '#ef4444');
    }
  };

  // Función para imprimir
  const imprimirAcciones = function() {
    if (accionesPreventivas.length === 0) {
      mostrarNotificacion(window.translations.preventiveNoActionsToExport, '#f59e0b');
      return;
    }
    const html = window.generarHTML(
      window.translations.preventiveTitle,
      '<ul style="list-style: none; padding: 0;">' +
        accionesPreventivas.map(function(a) {
          return '<li style="margin-bottom: 12px; padding: 8px; border-left: 4px solid #8b5cf6;">🛡️ ' + escapeHtml(a.texto) + '</li>';
        }).join('') +
      '</ul>'
    );
    window.abrirVentanaDocumento(html, 'Preventive_Actions');
  };

  // Función para notificaciones elegantes
  function mostrarNotificacion(mensaje, color) {
    const notif = document.createElement('div');
    notif.textContent = mensaje;
    notif.style.cssText = `
      position: fixed; bottom: 20px; right: 20px; background: ${color}; color: white;
      padding: 12px 24px; border-radius: 40px; font-weight: 500; z-index: 10000;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3); transition: opacity 0.3s;
    `;
    document.body.appendChild(notif);
    setTimeout(function() {
      notif.style.opacity = '0';
      setTimeout(function() { notif.remove(); }, 500);
    }, 3000);
  }

  // ========== CONSTRUIR HTML PRINCIPAL ==========
  const html = `
    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 32px; padding: 28px; margin-bottom: 30px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">

      <!-- Cabecera ejecutiva -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; margin-bottom: 28px;">
        <div>
          <h2 style="margin: 0; font-size: 28px; font-weight: 700; background: linear-gradient(135deg, #fff, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            ${window.translations.preventiveTitle}
          </h2>
          <p style="margin: 8px 0 0 0; color: #94a3b8;">${window.translations.preventiveSubtitle}</p>
        </div>
        <div style="background: rgba(139,92,246,0.2); border-radius: 40px; padding: 8px 20px;">
          <span style="color: #a78bfa; font-weight: 500;">${window.translations.preventiveTotal}: <span id="totalAccionesPreventivas">${accionesPreventivas.length}</span></span>
        </div>
      </div>

      <!-- Formulario de nueva acción -->
      <div style="display: flex; gap: 12px; margin-bottom: 28px; flex-wrap: wrap;">
        <div style="flex: 1;">
          <input type="text" id="nuevaAccionPreventiva"
                 placeholder="${window.translations.preventiveAddPlaceholder}"
                 style="width: 100%; background: #0f172a; border: 1px solid #334155; border-radius: 40px; padding: 14px 20px; color: #e2e8f0; font-size: 14px; transition: all 0.2s;">
        </div>
        <button id="agregarAccionPreventivaBtn"
                style="background: linear-gradient(135deg, #8b5cf6, #6d28d9); border: none; color: white; padding: 14px 28px; border-radius: 40px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;">
          <span>+</span> ${window.translations.preventiveAddAction}
        </button>
      </div>

      <!-- Filtro de búsqueda -->
      <div style="margin-bottom: 20px;">
        <input type="text" id="filtroAcciones" placeholder="${window.translations.preventiveSearch}"
               style="width: 100%; background: #0f172a; border: 1px solid #334155; border-radius: 40px; padding: 10px 20px; color: #e2e8f0; font-size: 14px;">
      </div>

      <!-- Lista de acciones -->
      <div id="listaAccionesPreventivas" style="margin-bottom: 24px; max-height: 400px; overflow-y: auto;">
        <!-- Se llenará dinámicamente -->
      </div>

      <!-- Botón imprimir -->
      <div style="display: flex; justify-content: flex-end;">
        <button id="imprimirAccionesPreventivasBtn"
                style="background: #1e293b; border: 1px solid #8b5cf6; color: #e2e8f0; padding: 12px 28px; border-radius: 40px; font-weight: 500; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s;">
          ${window.translations.preventiveExport}
        </button>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // ========== ASIGNAR EVENTOS ==========
  document.getElementById('agregarAccionPreventivaBtn').onclick = agregarNuevaAccion;
  document.getElementById('nuevaAccionPreventiva').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') agregarNuevaAccion();
  });
  document.getElementById('imprimirAccionesPreventivasBtn').onclick = imprimirAcciones;

  const filtroInput = document.getElementById('filtroAcciones');
  filtroInput.addEventListener('input', function(e) {
    mostrarLista(e.target.value);
  });

  // Mostrar la lista inicial
  mostrarLista('');
  actualizarContador();
};

console.log('✅ renderAccionesPreventivas traducido al inglés. Abre el modal y ve a la pestaña Acciones Preventivas para probar.');

// ============================================================
// AMPLIAR TRADUCCIONES PARA LA PESTAÑA CALIDAD
// ============================================================
window.translations = Object.assign(window.translations || {}, {
  // Títulos y etiquetas de Calidad
  qualityTitle: '📊 Quality Performance Report',
  qualitySubtitle: 'Quality Metrics & Operational Excellence',
  qualityNoProject: '⚠️ No project selected',
  qualityNoTasks: '📭 No tasks registered',
  qualityNoTasksMessage: 'Add tasks to the project to view quality indicators.',
  qualityExportPDF: '📄 Export as PDF',
  qualityPrint: '🖨️ Print Report',
  qualityTasksCompleted: 'TASKS COMPLETED',
  qualityDefects: 'DEFECTS / REWORK',
  qualityCustomerSatisfaction: 'CUSTOMER SATISFACTION',
  qualityOverdueTasks: 'OVERDUE TASKS',
  qualityKPI: '📈 Strategic KPIs',
  qualityMetricsAnalysis: 'Quality Metrics Analysis',
  qualityActualVsTarget: 'Actual vs Target performance',
  qualityTrend: 'Trend',
  qualityPositive: 'Positive',
  qualityStable: 'Stable',
  qualityNegative: 'Negative',
  qualityForecast: '📈 Quality Forecast',
  qualityProjectedEvolution: 'Projected quality evolution · 30/60/90 days',
  qualityTaskStatusDistribution: 'Task Status Distribution',
  qualityCompleted: 'Completed',
  qualityInProgress: 'In Progress',
  qualityPending: 'Pending',
  qualityOverdue: 'Overdue',
  qualityExecutiveAssessment: 'Executive Quality Assessment',
  qualityStrategicActionPlan: '📋 Strategic Action Plan:',
  qualityImmediateActions: 'Immediate Actions',
  qualityContinuousImprovement: 'Continuous Improvement',
  qualityNextReview: 'Next Review',
  qualityConfidential: '🔒 CONFIDENTIAL - For executive use only',
  qualityMethodology: 'Methodology: ISO 9001 Quality Management Standards · QPI = (Success Rate × 0.5) + (Satisfaction × 0.3) + (Punctuality × 0.2)',
  qualityGenerated: 'Generated',
  qualitySource: 'Source: PM Virtual Executive Platform',
  qualityExcellent: 'EXCELLENT',
  qualityGood: 'GOOD',
  qualityImprovement: 'IMPROVEMENT NEEDED',
  qualityCritical: 'CRITICAL',
  qualityAchieved: 'Achieved',
  qualityAtRisk: 'At Risk',
  qualityImprovementNeeded: 'Improvement needed',
});

// ============================================================
// RENDER CALIDAD - VERSIÓN INGLESA
// ============================================================
window.renderIndicadoresCalidad = function(container) {
  // Función auxiliar para escapar HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  // Obtener proyecto actual
  const proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
  if (!proyecto) {
    container.innerHTML = '<div style="text-align:center; padding:60px; background:#f8fafc; border-radius:32px;"><p style="color:#64748b;">' + window.translations.qualityNoProject + '</p></div>';
    return;
  }

  const tasks = proyecto.tasks || [];
  const total = tasks.length;

  if (total === 0) {
    container.innerHTML = `
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 32px; padding: 60px; text-align: center;">
        <div style="font-size: 64px; margin-bottom: 20px;">📊</div>
        <h3 style="margin: 0; color: #e2e8f0; font-size: 24px;">${window.translations.qualityNoTasks}</h3>
        <p style="color: #94a3b8; margin-top: 12px;">${window.translations.qualityNoTasksMessage}</p>
      </div>
    `;
    return;
  }

  // ========== CÁLCULOS AVANZADOS DE CALIDAD ==========
  const completadas = tasks.filter(function(t) { return t.status === 'completed'; }).length;
  const enProgreso = tasks.filter(function(t) { return t.status === 'inProgress'; }).length;
  const pendientes = tasks.filter(function(t) { return t.status === 'pending'; }).length;
  const rezagadas = tasks.filter(function(t) { return t.status === 'overdue' || t.status === 'rezagado'; }).length;

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  // Defectos: tareas atrasadas no completadas
  const defectos = tasks.filter(function(t) {
    if (!t.deadline) return false;
    var deadline = new Date(t.deadline);
    deadline.setHours(0, 0, 0, 0);
    return deadline < hoy && t.status !== 'completed';
  }).length;

  // Cálculo de calidad real (ponderado)
  var tasaExito = total > 0 ? (completadas / total) * 100 : 0;
  var tasaRezagadas = total > 0 ? (rezagadas / total) * 100 : 0;
  var tasaProgreso = total > 0 ? (enProgreso / total) * 100 : 0;
  var indiceCalidad = Math.max(0, Math.min(100, tasaExito - (tasaRezagadas * 0.5) - (defectos * 2)));

  // Satisfacción del cliente (basada en métricas de calidad)
  var satisfaccion = Math.round(Math.max(0, Math.min(100, (tasaExito * 0.6) + (100 - (defectos * 5)) - (tasaRezagadas * 0.4))));

  // Índice de desempeño de calidad (QPI - Quality Performance Index)
  var qpi = Math.round((tasaExito * 0.5) + (satisfaccion * 0.3) + ((100 - tasaRezagadas) * 0.2));

  // Proyecciones a 30, 60, 90 días
  var tendenciaHistorica = Math.min(20, Math.max(-20, (tasaExito - 50) / 5));
  var proyeccion30 = Math.min(100, Math.max(0, tasaExito + tendenciaHistorica * 1));
  var proyeccion60 = Math.min(100, Math.max(0, proyeccion30 + tendenciaHistorica * 0.8));
  var proyeccion90 = Math.min(100, Math.max(0, proyeccion60 + tendenciaHistorica * 0.6));

  // Objetivos estratégicos
  var objetivos = {
    tasaExito: 85,
    defectos: 5,
    satisfaccion: 85,
    qpi: 80
  };

  // Estados de cumplimiento
  var cumplimientoExito = tasaExito >= objetivos.tasaExito ? 'Achieved' : 'At Risk';
  var colorExito = tasaExito >= objetivos.tasaExito ? '#10b981' : '#ef4444';
  var cumplimientoDefectos = defectos <= objetivos.defectos ? 'Achieved' : 'At Risk';
  var colorDefectos = defectos <= objetivos.defectos ? '#10b981' : '#ef4444';
  var cumplimientoSatisfaccion = satisfaccion >= objetivos.satisfaccion ? 'Achieved' : 'Improvement needed';
  var colorSatisfaccion = satisfaccion >= objetivos.satisfaccion ? '#10b981' : '#f59e0b';
  var cumplimientoQPI = qpi >= objetivos.qpi ? 'Excellent' : qpi >= 65 ? 'Good' : 'Critical';
  var colorQPI = qpi >= 80 ? '#10b981' : qpi >= 65 ? '#f59e0b' : '#ef4444';

  // Recomendación ejecutiva
  var recomendacion = '';
  var recomendacionColor = '';
  var planAccion = '';

  if (tasaExito >= 85 && defectos <= 5) {
    recomendacion = '🟢 OPERATIONAL EXCELLENCE: The project maintains optimal quality standards.';
    recomendacionColor = '#10b981';
    planAccion = 'Maintain current practices. Document lessons learned. Recognize the team.';
  } else if (tasaExito >= 70 && defectos <= 10) {
    recomendacion = '🟡 ACCEPTABLE QUALITY: Minor deviations detected. Continuous improvement recommended.';
    recomendacionColor = '#f59e0b';
    planAccion = 'Review critical processes. Train in opportunity areas. Weekly monitoring.';
  } else if (tasaExito >= 50) {
    recomendacion = '🟠 ATTENTION REQUIRED: Multiple quality deviations detected.';
    recomendacionColor = '#f97316';
    planAccion = 'Process audit. Reassign resources. Implement improvement plan in 30 days.';
  } else {
    recomendacion = '🔴 QUALITY ALERT: The project presents serious deviations. Executive intervention required.';
    recomendacionColor = '#ef4444';
    planAccion = 'Crisis meeting immediately. Review methodology. Consider team restructuring.';
  }

  // Datos para gráficos
  var chartLabels = ['Success Rate', 'Defects', 'Satisfaction', 'QPI'];
  var chartValues = [tasaExito, Math.min(100, defectos * 5), satisfaccion, qpi];
  var chartObjectives = [objetivos.tasaExito, objetivos.defectos * 5, objetivos.satisfaccion, objetivos.qpi];
  var chartColors = ['#10b981', '#ef4444', '#f59e0b', '#8b5cf6'];

  var tendenciaIcono = tasaExito >= 70 ? '📈' : (tasaExito >= 50 ? '➡️' : '📉');
  var tendenciaTexto = tasaExito >= 70 ? window.translations.qualityPositive : (tasaExito >= 50 ? window.translations.qualityStable : window.translations.qualityNegative);

  // ========== GENERAR HTML ==========
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Quality Performance Report - ${escapeHtml(proyecto.name)}</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>
    <style>
      @media print {
        body { margin: 0; padding: 20px; }
        .no-print { display: none !important; }
        .page-break { page-break-before: always; }
        .kpi-card, .chart-container, .quality-card { break-inside: avoid; }
      }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
        background: #f0f4f8;
        padding: 40px;
        color: #1e293b;
      }
      .report-container {
        max-width: 1400px;
        margin: 0 auto;
      }
      .btn-group {
        display: flex;
        gap: 16px;
        justify-content: flex-end;
        margin-bottom: 24px;
      }
      .btn-pdf, .btn-print {
        border: none;
        padding: 12px 28px;
        border-radius: 40px;
        color: white;
        font-weight: 600;
        font-size: 13px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        transition: transform 0.2s;
      }
      .btn-pdf { background: linear-gradient(135deg, #dc2626, #b91c1c); }
      .btn-print { background: linear-gradient(135deg, #3b82f6, #2563eb); }
      .btn-pdf:hover, .btn-print:hover { transform: scale(1.02); }
      .corporate-header {
        background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
        border-radius: 32px;
        padding: 48px;
        margin-bottom: 32px;
        position: relative;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
      }
      .corporate-header::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -20%;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(139,92,246,0.15), transparent);
        border-radius: 50%;
      }
      .kpi-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
        margin-bottom: 32px;
      }
      .kpi-card {
        background: white;
        border-radius: 24px;
        padding: 24px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        border: 1px solid #e2e8f0;
        transition: all 0.2s;
      }
      .kpi-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -8px rgba(0,0,0,0.15); }
      .kpi-value {
        font-size: 42px;
        font-weight: 800;
        line-height: 1.2;
        margin: 12px 0 4px 0;
      }
      .progress-bar-bg {
        background: #e2e8f0;
        height: 8px;
        border-radius: 10px;
        overflow: hidden;
      }
      .progress-bar-fill {
        height: 100%;
        border-radius: 10px;
        transition: width 0.3s;
      }
      .chart-container {
        background: white;
        border-radius: 24px;
        padding: 28px;
        margin-bottom: 32px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        border: 1px solid #e2e8f0;
      }
      .projection-card {
        background: white;
        border-radius: 24px;
        padding: 24px;
        margin-bottom: 32px;
        border: 1px solid #e2e8f0;
      }
      .insight-card {
        border-radius: 24px;
        padding: 28px;
        margin-bottom: 32px;
        color: white;
      }
      .metric-badge {
        display: inline-block;
        padding: 6px 16px;
        border-radius: 40px;
        font-size: 12px;
        font-weight: 600;
      }
      .footer {
        background: white;
        border-radius: 20px;
        padding: 24px;
        text-align: center;
        border: 1px solid #e2e8f0;
        margin-top: 32px;
      }
    </style>
  </head>
  <body>
    <div class="report-container">
      <div class="btn-group no-print">
        <button class="btn-pdf" id="btnExportPDF">${window.translations.qualityExportPDF}</button>
        <button class="btn-print" id="btnPrint">${window.translations.qualityPrint}</button>
      </div>

      <!-- HEADER CORPORATE -->
      <div class="corporate-header">
        <div style="position: relative; z-index: 2;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
            <div>
              <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
                <div style="background: linear-gradient(135deg, #8b5cf6, #3b82f6); width: 60px; height: 60px; border-radius: 20px; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 32px;">📊</span>
                </div>
                <div>
                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: white; letter-spacing: -0.5px;">${window.translations.qualityTitle}</h1>
                  <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 14px;">${window.translations.qualitySubtitle}</p>
                </div>
              </div>
              <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                <div style="background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); padding: 8px 24px; border-radius: 40px;">
                  <span style="color: #8b5cf6;">🎯</span>
                  <span style="color: #cbd5e1;">${escapeHtml(proyecto.name)}</span>
                </div>
                <div style="background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); padding: 8px 24px; border-radius: 40px;">
                  <span style="color: #3b82f6;">📅</span>
                  <span style="color: #cbd5e1;">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </div>
            <div style="background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border-radius: 28px; padding: 20px 32px; text-align: center; border: 1px solid rgba(255,255,255,0.1);">
              <div style="font-size: 11px; color: #94a3b8; letter-spacing: 1.5px;">QUALITY PERFORMANCE INDEX</div>
              <div style="font-size: 56px; font-weight: 800; background: linear-gradient(135deg, #8b5cf6, #60a5fa); -webkit-background-clip: text; background-clip: text; color: transparent;">${qpi}</div>
              <div style="font-size: 12px; color: ${colorQPI};">/100 points · ${cumplimientoQPI}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- KPI EXECUTIVE DASHBOARD -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div style="display: flex; justify-content: space-between;">
            <span style="font-size: 13px; color: #64748b; font-weight: 500;">${window.translations.qualityTasksCompleted}</span>
            <span style="font-size: 24px;">✅</span>
          </div>
          <div class="kpi-value" style="color: ${colorExito};">${completadas}<span style="font-size: 20px;">/${total}</span></div>
          <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${tasaExito}%; background: ${colorExito};"></div></div>
          <div style="margin-top: 12px; display: flex; justify-content: space-between;">
            <span style="font-size: 12px;">Target: ${objetivos.tasaExito}%</span>
            <span class="metric-badge" style="background: ${colorExito}20; color: ${colorExito};">${cumplimientoExito}</span>
          </div>
        </div>
        <div class="kpi-card">
          <div style="display: flex; justify-content: space-between;">
            <span style="font-size: 13px; color: #64748b; font-weight: 500;">${window.translations.qualityDefects}</span>
            <span style="font-size: 24px;">🐛</span>
          </div>
          <div class="kpi-value" style="color: ${colorDefectos};">${defectos}</div>
          <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${Math.min(100, (defectos / objetivos.defectos) * 100)}%; background: ${colorDefectos};"></div></div>
          <div style="margin-top: 12px; display: flex; justify-content: space-between;">
            <span style="font-size: 12px;">Target: ≤${objetivos.defectos}</span>
            <span class="metric-badge" style="background: ${colorDefectos}20; color: ${colorDefectos};">${cumplimientoDefectos}</span>
          </div>
        </div>
        <div class="kpi-card">
          <div style="display: flex; justify-content: space-between;">
            <span style="font-size: 13px; color: #64748b; font-weight: 500;">${window.translations.qualityCustomerSatisfaction}</span>
            <span style="font-size: 24px;">😊</span>
          </div>
          <div class="kpi-value" style="color: ${colorSatisfaccion};">${satisfaccion}<span style="font-size: 20px;">%</span></div>
          <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${satisfaccion}%; background: ${colorSatisfaccion};"></div></div>
          <div style="margin-top: 12px; display: flex; justify-content: space-between;">
            <span style="font-size: 12px;">Target: ${objetivos.satisfaccion}%</span>
            <span class="metric-badge" style="background: ${colorSatisfaccion}20; color: ${colorSatisfaccion};">${cumplimientoSatisfaccion}</span>
          </div>
        </div>
        <div class="kpi-card">
          <div style="display: flex; justify-content: space-between;">
            <span style="font-size: 13px; color: #64748b; font-weight: 500;">${window.translations.qualityOverdueTasks}</span>
            <span style="font-size: 24px;">⚠️</span>
          </div>
          <div class="kpi-value" style="color: #f97316;">${rezagadas}</div>
          <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${Math.min(100, (rezagadas / total) * 100)}%; background: #f97316;"></div></div>
          <div style="margin-top: 12px; font-size: 12px;">${((rezagadas / total) * 100).toFixed(1)}% of total</div>
        </div>
      </div>

      <!-- COMPARATIVE CHART -->
      <div class="chart-container">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <h3 style="margin: 0; font-size: 18px; font-weight: 700;">${window.translations.qualityMetricsAnalysis}</h3>
            <p style="margin: 8px 0 0 0; font-size: 13px; color: #64748b;">${window.translations.qualityActualVsTarget}</p>
          </div>
          <div style="background: #f8fafc; border-radius: 40px; padding: 8px 20px;">
            <span style="font-size: 12px;">📈 ${window.translations.qualityTrend}: ${tendenciaTexto}</span>
          </div>
        </div>
        <div style="display: flex; justify-content: center; align-items: center; min-height: 400px;">
          <div style="width: 100%; max-width: 800px; height: 350px;">
            <canvas id="qualityChart"></canvas>
          </div>
        </div>
      </div>

      <!-- PROJECTION FORECAST -->
      <div class="projection-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <h3 style="margin: 0; font-size: 18px; font-weight: 700;">${window.translations.qualityForecast}</h3>
            <p style="margin: 8px 0 0 0; font-size: 13px; color: #64748b;">${window.translations.qualityProjectedEvolution}</p>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
          <div style="text-align: center;">
            <div style="font-size: 13px; color: #64748b;">30 Days</div>
            <div style="font-size: 36px; font-weight: 800; color: ${proyeccion30 >= objetivos.tasaExito ? '#10b981' : '#f59e0b'};">${proyeccion30.toFixed(0)}%</div>
            <div class="progress-bar-bg" style="margin-top: 8px;"><div class="progress-bar-fill" style="width: ${proyeccion30}%; background: ${proyeccion30 >= objetivos.tasaExito ? '#10b981' : '#f59e0b'};"></div></div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 13px; color: #64748b;">60 Days</div>
            <div style="font-size: 36px; font-weight: 800; color: ${proyeccion60 >= objetivos.tasaExito ? '#10b981' : '#f59e0b'};">${proyeccion60.toFixed(0)}%</div>
            <div class="progress-bar-bg" style="margin-top: 8px;"><div class="progress-bar-fill" style="width: ${proyeccion60}%; background: ${proyeccion60 >= objetivos.tasaExito ? '#10b981' : '#f59e0b'};"></div></div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 13px; color: #64748b;">90 Days</div>
            <div style="font-size: 36px; font-weight: 800; color: ${proyeccion90 >= objetivos.tasaExito ? '#10b981' : '#f59e0b'};">${proyeccion90.toFixed(0)}%</div>
            <div class="progress-bar-bg" style="margin-top: 8px;"><div class="progress-bar-fill" style="width: ${proyeccion90}%; background: ${proyeccion90 >= objetivos.tasaExito ? '#10b981' : '#f59e0b'};"></div></div>
          </div>
        </div>
        <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-radius: 16px; text-align: center;">
          <span style="font-size: 12px; color: #64748b;">📊 Projection based on historical trend and current metrics</span>
        </div>
      </div>

      <!-- TASK STATUS DISTRIBUTION -->
      <div class="chart-container">
        <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 700;">${window.translations.qualityTaskStatusDistribution}</h3>
        <div style="display: flex; gap: 24px; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 200px;">
            <canvas id="statusChart" style="max-height: 250px;"></canvas>
          </div>
          <div style="flex: 1;">
            <div style="margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span><span style="background: #10b981; width: 12px; height: 12px; display: inline-block; border-radius: 4px;"></span> ${window.translations.qualityCompleted}</span>
                <span><strong>${completadas}</strong> (${tasaExito.toFixed(1)}%)</span>
              </div>
              <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${tasaExito}%; background: #10b981;"></div></div>
            </div>
            <div style="margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span><span style="background: #f59e0b; width: 12px; height: 12px; display: inline-block; border-radius: 4px;"></span> ${window.translations.qualityInProgress}</span>
                <span><strong>${enProgreso}</strong> (${tasaProgreso.toFixed(1)}%)</span>
              </div>
              <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${tasaProgreso}%; background: #f59e0b;"></div></div>
            </div>
            <div style="margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span><span style="background: #94a3b8; width: 12px; height: 12px; display: inline-block; border-radius: 4px;"></span> ${window.translations.qualityPending}</span>
                <span><strong>${pendientes}</strong> (${((pendientes / total) * 100).toFixed(1)}%)</span>
              </div>
              <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${(pendientes / total) * 100}%; background: #94a3b8;"></div></div>
            </div>
            <div style="margin-bottom: 16px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span><span style="background: #ef4444; width: 12px; height: 12px; display: inline-block; border-radius: 4px;"></span> ${window.translations.qualityOverdue}</span>
                <span><strong>${rezagadas}</strong> (${tasaRezagadas.toFixed(1)}%)</span>
              </div>
              <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: ${tasaRezagadas}%; background: #ef4444;"></div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- EXECUTIVE INSIGHT -->
      <div class="insight-card" style="background: linear-gradient(135deg, ${recomendacionColor}15, ${recomendacionColor}05); border: 1px solid ${recomendacionColor}30; color: #1e293b;">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
          <div style="font-size: 40px;">📋</div>
          <div>
            <h3 style="margin: 0; font-size: 18px; font-weight: 700; color: ${recomendacionColor};">${window.translations.qualityExecutiveAssessment}</h3>
            <p style="margin: 8px 0 0 0; color: #475569;">Based on quantitative quality metrics</p>
          </div>
        </div>
        <p style="font-size: 16px; font-weight: 500; margin-bottom: 16px; color: #1e293b;">${recomendacion}</p>
        <div style="background: white; border-radius: 16px; padding: 16px; margin-top: 16px;">
          <strong>${window.translations.qualityStrategicActionPlan}</strong> ${planAccion}
        </div>
      </div>

      <!-- STRATEGIC RECOMMENDATIONS -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 32px;">
        <div style="background: white; border-radius: 20px; padding: 20px; border: 1px solid #e2e8f0;">
          <div style="font-size: 32px; margin-bottom: 12px;">🎯</div>
          <div style="font-weight: 700; margin-bottom: 8px;">${window.translations.qualityImmediateActions}</div>
          <ul style="margin-left: 20px; color: #475569; font-size: 12px; line-height: 1.6;">
            <li>${defectos > objetivos.defectos ? '🔴 Resolve ' + defectos + ' priority defects' : '✅ No critical defects'}</li>
            <li>${rezagadas > 0 ? '⚠️ Address ' + rezagadas + ' overdue tasks' : '📌 Maintain current pace'}</li>
            <li>Validate critical deliverables</li>
          </ul>
        </div>
        <div style="background: white; border-radius: 20px; padding: 20px; border: 1px solid #e2e8f0;">
          <div style="font-size: 32px; margin-bottom: 12px;">📊</div>
          <div style="font-weight: 700; margin-bottom: 8px;">${window.translations.qualityContinuousImprovement}</div>
          <ul style="margin-left: 20px; color: #475569; font-size: 12px; line-height: 1.6;">
            <li>Implement peer reviews</li>
            <li>Automate quality testing</li>
            <li>ISO standards training</li>
          </ul>
        </div>
        <div style="background: white; border-radius: 20px; padding: 20px; border: 1px solid #e2e8f0;">
          <div style="font-size: 32px; margin-bottom: 12px;">📅</div>
          <div style="font-weight: 700; margin-bottom: 8px;">${window.translations.qualityNextReview}</div>
          <ul style="margin-left: 20px; color: #475569; font-size: 12px; line-height: 1.6;">
            <li>Quality audit: ${new Date(Date.now() + 14 * 86400000).toLocaleDateString('en-US')}</li>
            <li>Customer satisfaction survey</li>
            <li>Process improvement workshop</li>
          </ul>
        </div>
      </div>

      <!-- FOOTER -->
      <div class="footer">
        <p style="color: #64748b; font-size: 11px; margin: 0;">
          <strong>${window.translations.qualityConfidential}</strong><br>
          ${window.translations.qualityMethodology}<br>
          ${window.translations.qualityGenerated}: ${new Date().toLocaleString('en-US')} | ${window.translations.qualitySource}
        </p>
      </div>
    </div>

    <script>
      new Chart(document.getElementById('qualityChart'), {
        type: 'bar',
        data: {
          labels: ${JSON.stringify(chartLabels)},
          datasets: [
            {
              label: 'Actual Performance',
              data: ${JSON.stringify(chartValues)},
              backgroundColor: ${JSON.stringify(chartColors)},
              borderRadius: 8,
              barPercentage: 0.6
            },
            {
              label: 'Target Objective',
              data: ${JSON.stringify(chartObjectives)},
              type: 'line',
              borderColor: '#8b5cf6',
              borderWidth: 3,
              borderDash: [5, 5],
              fill: false,
              pointRadius: 4,
              pointBackgroundColor: '#8b5cf6',
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { position: 'top', labels: { font: { size: 11 } } },
            tooltip: { callbacks: { label: function(ctx) { return ctx.dataset.label + ': ' + ctx.raw.toFixed(1); } } }
          },
          scales: {
            y: { beginAtZero: true, max: 100, title: { display: true, text: 'Score (0-100)', font: { size: 11 } } },
            x: { ticks: { font: { size: 11 } } }
          }
        }
      });

      new Chart(document.getElementById('statusChart'), {
        type: 'doughnut',
        data: {
          labels: ['${window.translations.qualityCompleted}', '${window.translations.qualityInProgress}', '${window.translations.qualityPending}', '${window.translations.qualityOverdue}'],
          datasets: [{
            data: [${completadas}, ${enProgreso}, ${pendientes}, ${rezagadas}],
            backgroundColor: ['#10b981', '#f59e0b', '#94a3b8', '#ef4444'],
            borderWidth: 0,
            cutout: '60%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { position: 'bottom', labels: { font: { size: 10 } } },
            tooltip: { callbacks: { label: function(ctx) { return ctx.label + ': ' + ctx.raw + ' (' + ((ctx.raw / ${total}) * 100).toFixed(1) + '%)'; } } }
          }
        }
      });

      document.getElementById('btnExportPDF').onclick = function() { window.print(); };
      document.getElementById('btnPrint').onclick = function() { window.print(); };
    <\/script>
  </body>
  </html>`;

  const ventana = window.open('', '_blank');
  if (!ventana) {
    alert('⚠️ Please allow popup windows to view the quality report.');
    return;
  }
  ventana.document.write(html);
  ventana.document.close();
};

console.log('✅ renderIndicadoresCalidad traducido al inglés. Abre el modal y ve a la pestaña Calidad para probar.');


// ============================================================
// PORTAL - VERSIÓN INGLESA
// ============================================================
(function() {
  // Asegurar que window.translations existe
  if (typeof window.translations === 'undefined') {
    window.translations = {};
  }

  // Ampliar traducciones con las claves de Portal
  window.translations = Object.assign(window.translations, {
    portalTitle: '🌐 Executive Portal',
    portalNoProject: '⚠️ No project selected',
    portalProgress: 'Progress',
    portalTasksDone: 'Tasks Done',
    portalOverdue: 'Overdue',
    portalQuickActions: '⚡ Quick Actions',
    portalExport: '📄 Export',
    portalSchedule: '📅 Schedule',
    portalNotify: '🔔 Notify',
    portalDashboard: '📊 Dashboard',
    portalReportCopied: '✅ Report copied to clipboard',
    portalNotificationCopied: '✅ Notification copied to clipboard',
    portalReviewScheduled: (project) => '📅 Executive Review scheduled for: ' + project + '\n\nDate: Next week\nDuration: 30 min',
    portalFullDashboard: '📊 Full Dashboard',
    portalFeatureSoon: 'Feature coming soon!',
    portalConfidential: '🔒 CONFIDENTIAL - For executive use only',
    portalStatusOnTrack: 'On Track',
    portalStatusMonitoring: 'Monitoring',
    portalStatusAtRisk: 'At Risk'
  });

  // Alias local para no repetir
  var t = window.translations;

  // ========== FUNCIÓN PORTAL TRADUCIDA ==========
  window.renderPortalProyecto = function(container) {
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      container.innerHTML = '<div style="text-align:center; padding:60px 20px; color:#64748b;">' + t.portalNoProject + '</div>';
      return;
    }

    var tasks = proyecto.tasks || [];
    var totalTareas = tasks.length;
    var completadas = tasks.filter(function(t) { return t.status === 'completed'; }).length;
    var atrasadas = tasks.filter(function(t) {
      return t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed';
    }).length;
    var porcentajeAvance = totalTareas > 0 ? Math.round((completadas / totalTareas) * 100) : 0;

    // Estado del proyecto
    var estadoProyecto = t.portalStatusOnTrack;
    var colorEstado = '#10b981';
    if (atrasadas > totalTareas * 0.2) {
      estadoProyecto = t.portalStatusAtRisk;
      colorEstado = '#ef4444';
    } else if (atrasadas > 0) {
      estadoProyecto = t.portalStatusMonitoring;
      colorEstado = '#f59e0b';
    }

    // ========== HTML ==========
    var html = '';

    // Header
    html += '<div style="background:linear-gradient(135deg,#0f172a,#1e293b); color:white; padding:28px; border-radius:20px; margin-bottom:24px;">';
    html += '<h2 style="margin:0; font-size:22px;">' + t.portalTitle + '</h2>';
    html += '<p style="margin:6px 0 0 0; opacity:0.85;">' + proyecto.name + '</p>';
    html += '<div style="margin-top:12px;">';
    html += '<span style="background:' + colorEstado + '20; color:' + colorEstado + '; padding:6px 16px; border-radius:12px; font-size:13px; font-weight:600;">';
    html += estadoProyecto + '</span>';
    html += '</div>';
    html += '</div>';

    // KPIs Grid
    html += '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:12px; margin-bottom:24px;">';

    // Progress
    html += '<div style="background:white; padding:16px; border-radius:16px; box-shadow:0 4px 16px rgba(0,0,0,0.08);">';
    html += '<div style="font-size:24px; font-weight:700; color:#1e293b;">' + porcentajeAvance + '%</div>';
    html += '<div style="font-size:12px; color:#64748b;">' + t.portalProgress + '</div>';
    html += '<div style="background:#e2e8f0; height:4px; border-radius:2px; margin-top:8px;">';
    html += '<div style="background:#3b82f6; height:100%; width:' + porcentajeAvance + '%; border-radius:2px;"></div>';
    html += '</div>';
    html += '</div>';

    // Tasks
    html += '<div style="background:white; padding:16px; border-radius:16px; box-shadow:0 4px 16px rgba(0,0,0,0.08);">';
    html += '<div style="font-size:24px; font-weight:700; color:#1e293b;">' + completadas + '/' + totalTareas + '</div>';
    html += '<div style="font-size:12px; color:#64748b;">' + t.portalTasksDone + '</div>';
    html += '</div>';

    // Risk
    html += '<div style="background:white; padding:16px; border-radius:16px; box-shadow:0 4px 16px rgba(0,0,0,0.08);">';
    html += '<div style="font-size:24px; font-weight:700; color:' + (atrasadas > 0 ? '#ef4444' : '#10b981') + ';">' + atrasadas + '</div>';
    html += '<div style="font-size:12px; color:#64748b;">' + t.portalOverdue + '</div>';
    html += '</div>';

    html += '</div>';

    // Quick Actions - usando data attributes
    html += '<div style="background:white; padding:20px; border-radius:16px; box-shadow:0 4px 16px rgba(0,0,0,0.08);">';
    html += '<h3 style="margin:0 0 16px 0; color:#1e293b; font-size:16px;">' + t.portalQuickActions + '</h3>';
    html += '<div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">';

    html += '<button class="portal-action" data-action="export" data-project="' + proyecto.name + '" style="background:#3b82f6; color:white; border:none; padding:12px; border-radius:12px; font-size:13px; font-weight:600; cursor:pointer;">' + t.portalExport + '</button>';
    html += '<button class="portal-action" data-action="schedule" data-project="' + proyecto.name + '" style="background:#10b981; color:white; border:none; padding:12px; border-radius:12px; font-size:13px; font-weight:600; cursor:pointer;">' + t.portalSchedule + '</button>';
    html += '<button class="portal-action" data-action="notify" data-project="' + proyecto.name + '" style="background:#8b5cf6; color:white; border:none; padding:12px; border-radius:12px; font-size:13px; font-weight:600; cursor:pointer;">' + t.portalNotify + '</button>';
    html += '<button class="portal-action" data-action="dashboard" data-project="' + proyecto.name + '" style="background:#f59e0b; color:white; border:none; padding:12px; border-radius:12px; font-size:13px; font-weight:600; cursor:pointer;">' + t.portalDashboard + '</button>';

    html += '</div>';
    html += '</div>';

    container.innerHTML = html;

    // ========== EVENT LISTENERS ==========
    container.querySelectorAll('.portal-action').forEach(function(btn) {
      btn.onclick = function() {
        var action = this.dataset.action;
        var project = this.dataset.project;

        if (action === 'export') {
          var reporte = '📊 EXECUTIVE REPORT - ' + project + '\n';
          reporte += '━━━━━━━━━━\n';
          reporte += 'Generated: ' + new Date().toLocaleString() + '\n';
          reporte += 'Status: ' + estadoProyecto + '\n';
          reporte += 'Progress: ' + porcentajeAvance + '%\n';
          reporte += '\n' + t.portalConfidential;
          navigator.clipboard?.writeText(reporte).then(function() {
            alert(t.portalReportCopied);
          }).catch(function() {
            alert('📋 Report:\n\n' + reporte);
          });
        }
        else if (action === 'schedule') {
          alert(t.portalReviewScheduled(project));
        }
        else if (action === 'notify') {
          var msg = '📢 Project Update - ' + project + '\n\nStatus: ' + estadoProyecto + '\nProgress: ' + porcentajeAvance + '%\n\nFor details, access the Executive Portal.';
          navigator.clipboard?.writeText(msg).then(function() {
            alert(t.portalNotificationCopied);
            if (window.SlackNotifier && typeof window.SlackNotifier.send === 'function') {
              window.SlackNotifier.send('📢 *Project Update: ' + project + '*\nStatus: ' + estadoProyecto);
            }
          }).catch(function() {
            alert('📋 Notification:\n\n' + msg);
          });
        }
        else if (action === 'dashboard') {
          alert(t.portalFullDashboard + '\n\nProject: ' + project + '\n\n' + t.portalFeatureSoon);
        }
      };
    });
  };

  console.log('✅ renderPortalProyecto traducido al inglés.');
})();

// ============================================================
// AMPLIAR TRADUCCIONES PARA LA PESTAÑA CHECKLIST
// ============================================================
(function() {
  if (typeof window.translations === 'undefined') {
    window.translations = {};
  }

  window.translations = Object.assign(window.translations, {
    checklistTitle: '✅ Project Closure Checklist',
    checklistNoProject: '⚠️ No project selected',
    checklistNewItem: 'New item',
    checklistAddItem: 'Add',
    checklistNoItems: 'No items',
    checklistGenerateClosure: '📄 Generate Closure Report from checklist',
    checklistAllItemsCompleted: '✅ All items are marked as completed.',
    checklistNotAllCompleted: '⚠️ Not all items are checked.',
    checklistItemCompleted: 'Completed',
    checklistItemPending: 'Pending',
    checklistConfirmDelete: 'Delete this item?',
    checklistDeleted: 'Item deleted',
    checklistClosureGenerated: '✅ Closure report generated successfully.'
  });
})();

// ============================================================
// RENDER CHECKLIST - VERSIÓN INGLESA
// ============================================================
(function() {
  if (typeof window.translations === 'undefined') {
    window.translations = {};
  }

  var t = window.translations;

  // Asegurar que checklistCierre existe
  if (typeof window.checklistCierre === 'undefined') {
    window.checklistCierre = JSON.parse(localStorage.getItem('checklistCierre') || '[]');
  }

  window.renderChecklistCierre = function(container) {
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      container.innerHTML = '<p style="color:#94a3b8; text-align:center; padding:40px;">' + t.checklistNoProject + '</p>';
      return;
    }

    var itemsProyecto = window.checklistCierre.filter(function(i) { return i.projectId === proyecto.name; });

    function renderList() {
      var listDiv = document.getElementById('checklistItems');
      if (!listDiv) return;

      if (itemsProyecto.length === 0) {
        listDiv.innerHTML = '<div style="text-align:center; color:#64748b; padding:20px;">' + t.checklistNoItems + '</div>';
        return;
      }

      var html = '';
      itemsProyecto.forEach(function(item, idx) {
        var checked = item.completado ? 'checked' : '';
        html += '<div style="display:flex; align-items:center; gap:10px; padding:8px 0; border-bottom:1px solid #334155;">';
        html += '<input type="checkbox" ' + checked + ' data-idx="' + idx + '" style="width:18px; height:18px; accent-color:#3b82f6;">';
        html += '<span style="flex:1; color:#e2e8f0;">' + item.texto + '</span>';
        html += '<button class="btn-eliminar-checklist" data-idx="' + idx + '" style="background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#ef4444; padding:4px 12px; border-radius:6px; cursor:pointer; font-size:11px;">🗑️</button>';
        html += '</div>';
      });
      listDiv.innerHTML = html;

      // Event listeners para checkboxes
      listDiv.querySelectorAll('input[type="checkbox"]').forEach(function(cb) {
        cb.onchange = function() {
          var idx = parseInt(this.dataset.idx);
          itemsProyecto[idx].completado = this.checked;
          localStorage.setItem('checklistCierre', JSON.stringify(window.checklistCierre));
          renderList();
        };
      });

      // Event listeners para eliminar
      listDiv.querySelectorAll('.btn-eliminar-checklist').forEach(function(btn) {
        btn.onclick = function() {
          if (confirm(t.checklistConfirmDelete)) {
            var idx = parseInt(this.dataset.idx);
            itemsProyecto.splice(idx, 1);
            localStorage.setItem('checklistCierre', JSON.stringify(window.checklistCierre));
            renderList();
          }
        };
      });
    }

    // ========== HTML PRINCIPAL ==========
    var html = `
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 32px; padding: 28px; margin-bottom: 30px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">

        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; margin-bottom: 28px;">
          <div>
            <h2 style="margin: 0; font-size: 28px; font-weight: 700; background: linear-gradient(135deg, #fff, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
              ${t.checklistTitle}
            </h2>
            <p style="margin: 8px 0 0 0; color: #94a3b8;">${proyecto.name}</p>
          </div>
          <div style="background: rgba(139,92,246,0.2); border-radius: 40px; padding: 8px 20px;">
            <span style="color: #a78bfa; font-weight: 500;">${itemsProyecto.filter(i => i.completado).length}/${itemsProyecto.length} ${t.checklistItemCompleted}</span>
          </div>
        </div>

        <div style="display: flex; gap: 12px; margin-bottom: 24px;">
          <input type="text" id="nuevoChecklist" placeholder="${t.checklistNewItem}" style="flex:1; background: #0f172a; border: 1px solid #334155; border-radius: 40px; padding: 12px 20px; color: #e2e8f0; font-size: 14px;">
          <button id="agregarChecklist" style="background: linear-gradient(135deg, #3b82f6, #2563eb); border: none; padding: 12px 24px; border-radius: 40px; color: white; font-weight: 600; cursor: pointer;">${t.checklistAddItem}</button>
        </div>

        <div id="checklistItems" style="background: rgba(0,0,0,0.2); border-radius: 12px; padding: 16px; margin-bottom: 24px;">
          ${itemsProyecto.length === 0 ? '<div style="text-align:center; color:#64748b; padding:20px;">' + t.checklistNoItems + '</div>' : ''}
        </div>

        <button id="generarActaCierreChecklist" style="background: linear-gradient(135deg, #10b981, #059669); border: none; padding: 14px 28px; border-radius: 40px; color: white; font-weight: 600; cursor: pointer; width: 100%;">
          ${t.checklistGenerateClosure}
        </button>
      </div>
    `;

    container.innerHTML = html;

    // ========== EVENT LISTENERS ==========
    document.getElementById('agregarChecklist').onclick = function() {
      var input = document.getElementById('nuevoChecklist');
      var texto = input.value.trim();
      if (texto) {
        window.checklistCierre.push({ projectId: proyecto.name, texto: texto, completado: false });
        localStorage.setItem('checklistCierre', JSON.stringify(window.checklistCierre));
        input.value = '';
        window.renderChecklistCierre(container);
      }
    };

    document.getElementById('nuevoChecklist').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        document.getElementById('agregarChecklist').click();
      }
    });

    document.getElementById('generarActaCierreChecklist').onclick = function() {
      var todosCompletados = itemsProyecto.every(function(i) { return i.completado; });
      if (!todosCompletados) {
        alert(t.checklistNotAllCompleted);
        return;
      }
      // Si existe la función generarActaCierre, la llamamos
      if (typeof window.generarActaCierre === 'function') {
        window.generarActaCierre();
        alert(t.checklistClosureGenerated);
      } else {
        alert('⚠️ ' + t.checklistGenerateClosure + ' (function not found)');
      }
    };

    // Renderizar la lista inicial
    renderList();
  };

  console.log('✅ renderChecklistCierre traducido al inglés.');
})();


// ============================================================
// ARCHIVO - VERSIÓN INGLESA CON BOTÓN PERSONALIZADO
// ============================================================
(function() {
  if (typeof window.translations === 'undefined') {
    window.translations = {};
  }

  window.translations = Object.assign(window.translations, {
    archiveTitle: '📁 Document Archive',
    archiveNoProject: '⚠️ No project selected',
    archiveNoDocuments: '📭 No documents in this archive',
    archiveFolder: 'Folder',
    archiveRoot: 'Root',
    archiveCreateFolder: '+ Create folder',
    archiveUpload: 'Upload document',
    archiveChooseFile: 'Choose File',
    archiveNoFileSelected: 'No file selected',
    archiveName: 'Name',
    archiveDate: 'Date',
    archiveFolderCol: 'Folder',
    archiveActions: 'Actions',
    archiveDownload: 'Download',
    archiveDelete: '🗑️',
    archiveDeleteConfirm: 'Delete this document?',
    archiveFolderCreated: (name) => '✅ Folder "' + name + '" created.',
    archiveUploadSuccess: '✅ Document uploaded successfully',
    archiveNoFile: '⚠️ Please select a file',
    archiveFileTooLarge: '⚠️ File is too large (max 10MB)',
    archiveConfirmDeleteAll: 'Delete all documents?',
    archiveDeletedAll: 'All documents deleted',
    archiveConfidential: '🔒 CONFIDENTIAL - For internal use only',
    archiveGenerated: 'Generated'
  });

  var t = window.translations;

  window.renderArchivoDocumentos = function(container) {
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      container.innerHTML = '<div style="text-align:center; padding:60px; color:#64748b;">' + t.archiveNoProject + '</div>';
      return;
    }

    var documentosArchivo = JSON.parse(localStorage.getItem('documentosArchivo') || '[]');
    var archivos = documentosArchivo.filter(function(d) { return d.projectId === proyecto.name; });
    var carpetas = [...new Set(archivos.map(function(a) { return a.carpeta; }).filter(Boolean))];

    function mostrar(carpetaSeleccionada) {
      carpetaSeleccionada = carpetaSeleccionada || '';
      var filtrados = carpetaSeleccionada ? archivos.filter(function(a) { return a.carpeta === carpetaSeleccionada; }) : archivos;

      var listDiv = document.getElementById('listaArchivos');
      if (!listDiv) return;

      if (filtrados.length === 0) {
        listDiv.innerHTML = '<div style="text-align:center; padding:40px; color:#94a3b8;">' + t.archiveNoDocuments + '</div>';
        return;
      }

      var html = '<table style="width:100%; border-collapse:collapse; margin-top:20px;">';
      html += '<thead><tr style="border-bottom:2px solid #334155;">';
      html += '<th style="padding:12px; text-align:left;">' + t.archiveName + '</th>';
      html += '<th style="padding:12px; text-align:left;">' + t.archiveDate + '</th>';
      html += '<th style="padding:12px; text-align:left;">' + t.archiveFolderCol + '</th>';
      html += '<th style="padding:12px; text-align:center;">' + t.archiveActions + '</th>';
      html += '</tr></thead><tbody>';

      filtrados.forEach(function(doc, idx) {
        html += '<tr style="border-bottom:1px solid #1e293b;">';
        html += '<td style="padding:12px;">' + doc.nombre + '</td>';
        html += '<td style="padding:12px;">' + doc.fecha + '</td>';
        html += '<td style="padding:12px;">' + (doc.carpeta || t.archiveRoot) + '</td>';
        html += '<td style="padding:12px; text-align:center;">';
        html += '<button data-idx="' + idx + '" class="descargarArchivo" style="background:#3b82f6; border:none; padding:4px 12px; border-radius:6px; color:white; cursor:pointer; margin-right:8px;">' + t.archiveDownload + '</button>';
        html += '<button data-idx="' + idx + '" class="eliminarArchivo" style="background:#ef4444; border:none; padding:4px 12px; border-radius:6px; color:white; cursor:pointer;">' + t.archiveDelete + '</button>';
        html += '</td></tr>';
      });

      html += '</tbody></table>';
      listDiv.innerHTML = html;

      listDiv.querySelectorAll('.descargarArchivo').forEach(function(btn) {
        btn.onclick = function() {
          var idx = parseInt(this.dataset.idx);
          var doc = filtrados[idx];
          if (doc && doc.contenido) {
            var a = document.createElement('a');
            a.href = doc.contenido;
            a.download = doc.nombre;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          } else {
            alert('⚠️ File not available');
          }
        };
      });

      listDiv.querySelectorAll('.eliminarArchivo').forEach(function(btn) {
        btn.onclick = function() {
          var idx = parseInt(this.dataset.idx);
          if (confirm(t.archiveDeleteConfirm)) {
            var doc = filtrados[idx];
            var globalIdx = documentosArchivo.findIndex(function(d) { return d === doc; });
            if (globalIdx !== -1) {
              documentosArchivo.splice(globalIdx, 1);
              localStorage.setItem('documentosArchivo', JSON.stringify(documentosArchivo));
              window.renderArchivoDocumentos(container);
            }
          }
        };
      });
    }

    // ========== HTML PRINCIPAL ==========
    var html = '';
    html += '<div style="background:linear-gradient(135deg,#0f172a,#1e293b); padding:20px; border-radius:16px; margin-bottom:20px;">';
    html += '<h2 style="margin:0; color:white; font-size:22px;">' + t.archiveTitle + '</h2>';
    html += '<p style="margin:6px 0 0 0; color:#94a3b8;">' + proyecto.name + '</p>';
    html += '</div>';

    // Controles
    html += '<div style="display:flex; gap:12px; margin-bottom:20px; flex-wrap:wrap; align-items:center;">';
    html += '<div><label style="color:#94a3b8; margin-right:8px;">' + t.archiveFolder + ':</label>';
    html += '<select id="carpetaSelect" style="background:#0f172a; border:1px solid #3b82f6; border-radius:8px; padding:8px; color:white;">';
    html += '<option value="">' + t.archiveRoot + '</option>';
    carpetas.forEach(function(c) {
      html += '<option value="' + c + '">' + c + '</option>';
    });
    html += '</select></div>';

    html += '<button id="crearCarpetaBtn" style="background:rgba(59,130,246,0.2); border:1px solid #3b82f6; padding:8px 16px; border-radius:8px; color:#60a5fa; cursor:pointer;">' + t.archiveCreateFolder + '</button>';
    html += '</div>';

    // Subir archivo con input personalizado
    html += '<div style="display:flex; gap:12px; margin-bottom:20px; flex-wrap:wrap; align-items:center;">';
    html += '<div style="position:relative; overflow:hidden; display:inline-block;">';
    html += '<button id="customFileBtn" style="background:#3b82f6; border:none; padding:8px 20px; border-radius:8px; color:white; cursor:pointer;">' + t.archiveChooseFile + '</button>';
    html += '<input type="file" id="subirArchivo" style="position:absolute; left:0; top:0; opacity:0; width:100%; height:100%; cursor:pointer;">';
    html += '</div>';
    html += '<span id="fileNameDisplay" style="color:#94a3b8; font-size:13px;">' + t.archiveNoFileSelected + '</span>';
    html += '<button id="cargarArchivo" style="background:#10b981; border:none; padding:8px 20px; border-radius:8px; color:white; cursor:pointer;">' + t.archiveUpload + '</button>';
    html += '</div>';

    // Lista
    html += '<div id="listaArchivos" style="background:rgba(0,0,0,0.2); border-radius:12px; padding:16px; max-height:400px; overflow-y:auto;">';
    html += '<div style="text-align:center; padding:40px; color:#94a3b8;">' + t.archiveNoDocuments + '</div>';
    html += '</div>';

    html += '<div style="margin-top:20px; padding:12px; text-align:center; font-size:11px; color:#64748b;">';
    html += t.archiveConfidential + ' · ' + t.archiveGenerated + ': ' + new Date().toLocaleDateString('en-US');
    html += '</div>';

    container.innerHTML = html;

    // ========== EVENTOS ==========
    var carpetaSelect = document.getElementById('carpetaSelect');
    carpetaSelect.onchange = function() {
      mostrar(this.value);
    };

    document.getElementById('crearCarpetaBtn').onclick = function() {
      var nombre = prompt('Folder name:', 'New Folder');
      if (nombre && nombre.trim()) {
        var nombreTrim = nombre.trim();
        if (!carpetas.includes(nombreTrim)) {
          carpetas.push(nombreTrim);
          var opt = document.createElement('option');
          opt.value = nombreTrim;
          opt.textContent = nombreTrim;
          carpetaSelect.appendChild(opt);
          alert(t.archiveFolderCreated(nombreTrim));
        } else {
          alert('⚠️ Folder already exists');
        }
      }
    };

    // Mostrar nombre del archivo seleccionado
    var fileInput = document.getElementById('subirArchivo');
    var fileNameDisplay = document.getElementById('fileNameDisplay');
    fileInput.onchange = function() {
      if (this.files && this.files.length > 0) {
        fileNameDisplay.textContent = this.files[0].name;
      } else {
        fileNameDisplay.textContent = t.archiveNoFileSelected;
      }
    };

    // Subir archivo
    document.getElementById('cargarArchivo').onclick = function() {
      var file = fileInput.files[0];
      if (!file) {
        alert(t.archiveNoFile);
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert(t.archiveFileTooLarge);
        return;
      }

      var carpeta = carpetaSelect.value || 'Root';
      var reader = new FileReader();
      reader.onload = function(e) {
        documentosArchivo.push({
          projectId: proyecto.name,
          nombre: file.name,
          contenido: e.target.result,
          fecha: new Date().toLocaleString('en-US'),
          carpeta: carpeta
        });
        localStorage.setItem('documentosArchivo', JSON.stringify(documentosArchivo));
        alert(t.archiveUploadSuccess);
        // Resetear input y display
        fileInput.value = '';
        fileNameDisplay.textContent = t.archiveNoFileSelected;
        window.renderArchivoDocumentos(container);
      };
      reader.readAsDataURL(file);
    };

    mostrar('');
  };

  console.log('✅ renderArchivoDocumentos actualizado con botón personalizado en inglés.');
})();


// ============================================================
// TRANSFERENCIA - VERSIÓN INGLESA
// ============================================================
(function() {
  if (typeof window.translations === 'undefined') {
    window.translations = {};
  }

  window.translations = Object.assign(window.translations, {
    transferTitle: '🔄 Transfer to Operations Plan',
    transferNoProject: '⚠️ No project selected',
    transferPlanLabel: 'Maintenance plan:',
    transferResponsibleLabel: 'Responsible:',
    transferDateLabel: 'Planned date:',
    transferSave: 'Save plan',
    transferGenerateDoc: 'Generate document',
    transferSaved: '✅ Transfer plan saved',
    transferDocTitle: 'Transfer to Operations Plan',
    transferProject: 'Project',
    transferPlan: 'Maintenance Plan',
    transferResponsible: 'Responsible',
    transferDate: 'Planned Date',
    transferConfidential: '🔒 CONFIDENTIAL - Transfer plan for operations',
    transferGenerated: 'Generated'
  });

  var t = window.translations;

  // ========== FUNCIÓN TRANSFERENCIA TRADUCIDA ==========
  window.renderTransferencia = function(container) {
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      container.innerHTML = '<div style="text-align:center; padding:60px; color:#64748b;">' + t.transferNoProject + '</div>';
      return;
    }

    var transferenciaData = JSON.parse(localStorage.getItem('transferenciaData') || '{}');
    var data = transferenciaData[proyecto.name] || { plan: '', responsable: '', fecha: '' };

    var guardar = function() {
      transferenciaData[proyecto.name] = {
        plan: document.getElementById('planTransferencia').value,
        responsable: document.getElementById('responsableTransferencia').value,
        fecha: document.getElementById('fechaTransferencia').value
      };
      localStorage.setItem('transferenciaData', JSON.stringify(transferenciaData));
      alert(t.transferSaved);
      window.renderTransferencia(container);
    };

    var generarDocumento = function() {
      var html = window.generarHTML(t.transferDocTitle, 
        '<p><strong>' + t.transferProject + ':</strong> ' + proyecto.name + '</p>' +
        '<p><strong>' + t.transferPlan + ':</strong> ' + (data.plan || '') + '</p>' +
        '<p><strong>' + t.transferResponsible + ':</strong> ' + (data.responsable || '') + '</p>' +
        '<p><strong>' + t.transferDate + ':</strong> ' + (data.fecha || '') + '</p>' +
        '<p style="margin-top:30px; font-size:12px; color:#64748b;">' + t.transferConfidential + '</p>'
      );
      window.abrirVentanaDocumento(html, 'Transfer_' + proyecto.name);
    };

    var html = '';
    html += '<div style="background:linear-gradient(135deg,#0f172a,#1e293b); padding:20px; border-radius:16px; margin-bottom:20px;">';
    html += '<h2 style="margin:0; color:white; font-size:22px;">' + t.transferTitle + '</h2>';
    html += '<p style="margin:6px 0 0 0; color:#94a3b8;">' + proyecto.name + '</p>';
    html += '</div>';

    html += '<div style="background:rgba(0,0,0,0.2); padding:20px; border-radius:12px;">';
    html += '<div style="margin-bottom:15px;">';
    html += '<label style="display:block; color:#94a3b8; margin-bottom:5px;">' + t.transferPlanLabel + '</label>';
    html += '<textarea id="planTransferencia" rows="3" style="width:100%; background:#0f172a; color:white; border:1px solid #3b82f6; border-radius:8px; padding:8px;">' + (data.plan || '') + '</textarea>';
    html += '</div>';

    html += '<div style="margin-bottom:15px;">';
    html += '<label style="display:block; color:#94a3b8; margin-bottom:5px;">' + t.transferResponsibleLabel + '</label>';
    html += '<input type="text" id="responsableTransferencia" value="' + (data.responsable || '') + '" style="width:100%; background:#0f172a; color:white; border:1px solid #3b82f6; border-radius:8px; padding:8px;">';
    html += '</div>';

    html += '<div style="margin-bottom:15px;">';
    html += '<label style="display:block; color:#94a3b8; margin-bottom:5px;">' + t.transferDateLabel + '</label>';
    html += '<input type="date" id="fechaTransferencia" value="' + (data.fecha || '') + '" style="width:100%; background:#0f172a; color:white; border:1px solid #3b82f6; border-radius:8px; padding:8px;">';
    html += '</div>';

    html += '<div style="display:flex; gap:12px; flex-wrap:wrap;">';
    html += '<button id="guardarTransferencia" style="background:#10b981; border:none; padding:10px 24px; border-radius:8px; color:white; cursor:pointer;">' + t.transferSave + '</button>';
    html += '<button id="generarDocumentoTransferencia" style="background:#3b82f6; border:none; padding:10px 24px; border-radius:8px; color:white; cursor:pointer;">' + t.transferGenerateDoc + '</button>';
    html += '</div>';
    html += '</div>';

    container.innerHTML = html;

    document.getElementById('guardarTransferencia').onclick = guardar;
    document.getElementById('generarDocumentoTransferencia').onclick = generarDocumento;
  };

  console.log('✅ renderTransferencia traducido al inglés.');
})();


// ============================================================
// SCRUM - VERSIÓN INGLESA
// ============================================================
(function() {
  // Asegurar que window.translations existe
  if (typeof window.translations === 'undefined') {
    window.translations = {};
  }

  // Ampliar traducciones con las claves de Scrum
  window.translations = Object.assign(window.translations, {
    scrumTitle: 'VPI PLATINUM MASTER',
    scrumSubtitle: 'Executive Scrum Dashboard',
    scrumNoProject: '⚠️ No project selected',
    scrumTotalPoints: 'TOTAL POINTS',
    scrumDonePoints: 'POINTS DONE',
    scrumPendingPoints: 'PENDING POINTS',
    scrumEfficiency: 'EFFICIENCY',
    scrumKanban: 'Kanban Board',
    scrumTodo: 'TODO',
    scrumDoing: 'DOING',
    scrumDone: 'DONE',
    scrumOverdue: 'OVERDUE',
    scrumAddStory: '+ Story',
    scrumAddSprint: '+ Sprint',
    scrumExportPDF: '📄 Export BI PDF',
    scrumBacklogHealth: 'Backlog Health',
    scrumVelocity: 'Velocity by Sprint',
    scrumTeamPerformance: 'Team Performance',
    scrumBurndown: 'Burndown Chart',
    scrumSprintManagement: 'Sprint Management & Velocity',
    scrumSprintName: 'Sprint',
    scrumPlanned: 'Planned',
    scrumCompleted: 'Completed',
    scrumVelocityLabel: 'Velocity',
    scrumEfficiencyLabel: 'Efficiency',
    scrumAction: 'Action',
    scrumDelete: 'Delete',
    scrumControlMatrix: 'Requirement Control Matrix',
    scrumID: 'ID',
    scrumTitleLabel: 'Title',
    scrumStatus: 'Status',
    scrumPoints: 'Points',
    scrumDelivery: 'Delivery',
    scrumSprint: 'Sprint',
    scrumResponsible: 'Responsible',
    scrumActions: 'Actions',
    scrumAssignSprint: 'Sprint',
    scrumDeleteStory: '✕',
    scrumStoryTitle: 'Story Title',
    scrumStoryPoints: 'Story Points',
    scrumResponsibleLabel: 'Assigned to',
    scrumEndDate: 'End Date',
    scrumSprintNameLabel: 'Sprint Name',
    scrumConfirmDelete: 'Delete this task?',
    scrumConfirmDeleteSprint: 'Delete this Sprint? Associated tasks will be unlinked.',
    scrumStoryAdded: '✅ Story added successfully',
    scrumSprintAdded: '✅ Sprint added successfully',
    scrumStoryDeleted: '✅ Story deleted',
    scrumSprintDeleted: '✅ Sprint deleted',
    scrumStoryUpdated: '✅ Story updated',
    scrumExporting: '📊 Generating Executive Report...',
    scrumExportSuccess: '✅ Executive Report generated successfully',
    scrumExportError: 'Error generating report. Check console.',
    scrumConfidential: '🔒 CONFIDENTIAL - For executive use only',
    scrumGenerated: 'Generated',
    scrumSource: 'Source: PM Virtual Executive Platform',
    scrumNoData: 'No data available',
    scrumPointsPerDay: 'SP/D',
    scrumIdeal: 'Ideal',
    scrumReal: 'Real',
    scrumBurndownIdeal: 'Ideal Line',
    scrumBurndownReal: 'Actual Progress',
    scrumHealthChart: 'Health of the Backlog',
    scrumHealthDesc: 'Percentage representation of project maturity. Analyzes how many requirements are stuck versus completed.',
    scrumVelocityDesc: 'Historical performance metric. Evaluates the team\'s actual delivery capacity in each iteration based on empirical evidence.',
    scrumTeamDesc: 'Productivity audit by responsible party. Identifies workload and compliance of each technical cell.',
    scrumBurndownDesc: 'Predictive daily control. Compares the ideal trajectory of remaining work against actual execution of the current sprint.',
    scrumRadarMetrics: 'HEALTH METRICS',
    scrumRadarInterpretation: 'INTERPRETATION',
    scrumRadarEfficiency: 'Efficiency',
    scrumRadarVelocity: 'Velocity',
    scrumRadarQuality: 'Quality',
    scrumRadarCoverage: 'Coverage',
    scrumRadarPredictability: 'Predictability',
    scrumRadarBacklogHealth: 'Backlog Health',
    scrumRadarDesc1: 'The radar evaluates 6 key dimensions:',
    scrumRadarDesc2: '• Efficiency: SP completed / total',
    scrumRadarDesc3: '• Velocity: average SP per sprint',
    scrumRadarDesc4: '• Quality: % of non-overdue tasks',
    scrumRadarDesc5: '• Coverage: % of assigned tasks',
    scrumRadarDesc6: '• Predictability: sprint accuracy',
    scrumRadarDesc7: '• Backlog Health: % of pending tasks',
    scrumStatusDistribution: 'PROJECT STATUS DISTRIBUTION',
    scrumAnalysis: 'ANALYSIS',
    scrumAnalysisDesc1: 'This chart shows the current distribution of tasks in the workflow.',
    scrumAnalysisDesc2: 'A high percentage in "Completed" indicates healthy progress.',
    scrumAnalysisDesc3: 'Overdue items require immediate attention.',
    scrumVelocityConclusion: 'VELOCITY CONCLUSIONS',
    scrumVelocityConclusion1: 'Velocity measures the team\'s delivery capacity per sprint.',
    scrumVelocityConclusion2: 'Consistent values indicate predictable performance.',
    scrumVelocityConclusion3: 'Compare actual vs planned to assess accuracy.',
    scrumBurndownInterpretation: 'BURNDOWN INTERPRETATION',
    scrumBurndownDesc1: 'The burndown chart tracks remaining work over time.',
    scrumBurndownDesc2: 'The ideal line shows expected progress.',
    scrumBurndownDesc3: 'If the real line is above ideal, the team is delayed.',
    scrumBurndownDesc4: 'Below indicates progress ahead of schedule.',
    scrumBurndownDesc5: 'Use it to adjust sprint planning.',
    scrumTeamPerformanceTitle: 'TEAM PERFORMANCE',
    scrumTopPerformers: 'TOP PERFORMERS',
    scrumTeamChartDesc: 'This chart shows total Story Points completed by each team member.'
  });

  var t = window.translations;

  // ========== FUNCIÓN SCRUM TRADUCIDA ==========
  window.renderScrum = function(container) {
    // Verificar proyecto
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      container.innerHTML = '<div style="text-align:center; padding:60px; color:#94a3b8;">' + t.scrumNoProject + '</div>';
      return;
    }

    container.setAttribute('style', 'background:#020617!important; color:#f8fafc!important; font-family:"Inter",sans-serif; width:100%; height:100%; overflow-y:auto; padding:0;');

    var storageKey = 'vpi_master_v21_final';
    var scrumData = JSON.parse(localStorage.getItem(storageKey)) || { requirements: [], sprintsHistory: [] };

    var save = function() {
      localStorage.setItem(storageKey, JSON.stringify(scrumData));
      render();
    };

    var colors = { todo: '#fde047', doing: '#0d9488', done: '#10b981', overdue: '#ef4444', ideal: '#3b82f6' };

    // ========== FUNCIONES GLOBALES ==========
    window.deleteStory = function(id) {
      if (confirm(t.scrumConfirmDelete)) {
        scrumData.requirements = scrumData.requirements.filter(function(r) { return r.id !== id; });
        save();
      }
    };

    window.deleteSprint = function(id) {
      if (confirm(t.scrumConfirmDeleteSprint)) {
        scrumData.sprintsHistory = scrumData.sprintsHistory.filter(function(s) { return s.id !== id; });
        save();
      }
    };

    window.addStory = function() {
      var title = prompt(t.scrumStoryTitle + ':');
      if (!title) return;
      var sp = parseInt(prompt(t.scrumStoryPoints + ':', '5')) || 0;
      var resp = prompt(t.scrumResponsibleLabel + ':', 'Unassigned');
      var dEnd = prompt(t.scrumEndDate + ':', '31/12/2026');
      scrumData.requirements.push({
        id: 'REQ-' + Date.now().toString().slice(-4),
        title: title,
        status: 'todo',
        storyPoints: sp,
        responsible: resp,
        endDate: dEnd,
        sprint: 'Backlog'
      });
      save();
    };

    window.addSprint = function() {
      var name = prompt(t.scrumSprintNameLabel + ':');
      if (!name) return;
      scrumData.sprintsHistory.push({ id: Date.now(), name: name, planned: 30 });
      save();
    };

    window.assignSprintToTask = function(id) {
      var opts = scrumData.sprintsHistory.map(function(s) { return s.name; }).join(' | ');
      var target = prompt('Assign to Sprint (' + opts + '):');
      var r = scrumData.requirements.find(function(x) { return x.id === id; });
      if (r && target) { r.sprint = target; save(); }
    };

    window.updateStatus = function(id, newStatus) {
      var r = scrumData.requirements.find(function(x) { return x.id === id; });
      if (r) { r.status = newStatus; save(); }
    };

    // ========== FUNCIÓN DE RENDERIZADO ==========
    function render() {
      var totalSP = scrumData.requirements.reduce(function(acc, r) { return acc + r.storyPoints; }, 0);
      var doneSP = scrumData.requirements.filter(function(r) { return r.status === 'done'; }).reduce(function(acc, r) { return acc + r.storyPoints; }, 0);

      var sprintStats = scrumData.sprintsHistory.map(function(s) {
        var completed = scrumData.requirements.filter(function(r) { return r.sprint === s.name && r.status === 'done'; }).reduce(function(acc, curr) { return acc + curr.storyPoints; }, 0);
        return { id: s.id, name: s.name, planned: s.planned, completed: completed };
      });

      var teamData = {};
      scrumData.requirements.forEach(function(r) {
        if (r.status === 'done') {
          teamData[r.responsible] = (teamData[r.responsible] || 0) + r.storyPoints;
        }
      });

      var html = '';
      html += '<style>';
      html += '#vpi-root { padding: 40px; background: #020617; max-width: 1500px; margin: 0 auto; }';
      html += '.vpi-navbar { background: rgba(15, 23, 42, 0.95); border: 1px solid #1e293b; padding: 25px 40px; border-radius: 20px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; position: sticky; top: 10px; z-index: 1000; backdrop-filter: blur(10px); }';
      html += '.kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 40px; }';
      html += '.kpi-card { background: #0f172a; border: 1px solid #1e293b; padding: 30px; border-radius: 20px; text-align: center; }';
      html += '.exec-section { background: #0f172a; border: 1px solid #1e293b; border-radius: 24px; padding: 40px; margin-bottom: 40px; }';
      html += '.chart-layout { display: grid; grid-template-columns: 1.3fr 0.7fr; gap: 50px; align-items: center; }';
      html += '.kanban-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }';
      html += '.kanban-col { background: #020617; border-radius: 12px; padding: 15px; border: 1px solid #1e293b; min-height: 350px; }';
      html += '.story-card { background: #1e293b; padding: 15px; border-radius: 12px; margin-bottom: 12px; border-left: 5px solid #3b82f6; position: relative; }';
      html += '.delete-btn { position: absolute; top: 8px; right: 8px; color: #ef4444; cursor: pointer; font-size: 14px; opacity: 0.5; }';
      html += '.delete-btn:hover { opacity: 1; }';
      html += '.vpi-table { width: 100%; border-collapse: collapse; }';
      html += '.vpi-table th { background: #1e293b; padding: 18px; text-align: left; font-size: 11px; color: #64748b; text-transform: uppercase; }';
      html += '.vpi-table td { padding: 18px; border-bottom: 1px solid #1e293b; color: #cbd5e1; font-size: 14px; }';
      html += '.btn-vpi { background: #3b82f6; color: #fff; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 800; cursor: pointer; }';
      html += '</style>';

      html += '<div id="vpi-root">';
      html += '<div class="vpi-navbar">';
      html += '<h2 style="margin:0; letter-spacing:-1px;">' + t.scrumTitle + ' <span style="color:#3b82f6">' + t.scrumSubtitle + '</span></h2>';
      html += '<div style="display:flex; gap:15px;">';
      html += '<button class="btn-vpi" onclick="addStory()">+ ' + t.scrumAddStory + '</button>';
      html += '<button class="btn-vpi" onclick="addSprint()">+ ' + t.scrumAddSprint + '</button>';
      html += '<button class="btn-vpi" style="background:#10b981" onclick="window.exportExecutivePDF && window.exportExecutivePDF()">' + t.scrumExportPDF + '</button>';
      html += '</div></div>';

      html += '<div class="kpi-row">';
      html += '<div class="kpi-card"><span style="color:#64748b; font-size:12px;">' + t.scrumTotalPoints + '</span><div style="font-size:32px; font-weight:900;">' + totalSP + '</div></div>';
      html += '<div class="kpi-card"><span style="color:#10b981; font-size:12px;">' + t.scrumDonePoints + '</span><div style="font-size:32px; font-weight:900;">' + doneSP + '</div></div>';
      html += '<div class="kpi-card"><span style="color:#fde047; font-size:12px;">' + t.scrumPendingPoints + '</span><div style="font-size:32px; font-weight:900;">' + (totalSP - doneSP) + '</div></div>';
      html += '<div class="kpi-card"><span style="color:#3b82f6; font-size:12px;">' + t.scrumEfficiency + '</span><div style="font-size:32px; font-weight:900;">' + (totalSP > 0 ? Math.round((doneSP/totalSP)*100) : 0) + '%</div></div>';
      html += '</div>';

      // KANBAN
      html += '<div class="exec-section">';
      html += '<h3 style="margin:0 0 25px 0;">' + t.scrumKanban + '</h3>';
      html += '<div class="kanban-grid">';
      ['todo', 'doing', 'done', 'overdue'].forEach(function(s) {
        var label = s === 'todo' ? t.scrumTodo : (s === 'doing' ? t.scrumDoing : (s === 'done' ? t.scrumDone : t.scrumOverdue));
        html += '<div class="kanban-col">';
        html += '<div style="font-size:11px; color:#64748b; font-weight:900; text-align:center; margin-bottom:15px;">' + label + '</div>';
        html += '<div id="list-' + s + '" style="min-height:300px;">';
        scrumData.requirements.filter(function(r) { return r.status === s; }).forEach(function(r) {
          html += '<div class="story-card" data-id="' + r.id + '" style="border-left-color:' + colors[s] + '">';
          html += '<span class="delete-btn" onclick="deleteStory(\'' + r.id + '\')">✕</span>';
          html += '<div style="font-weight:700; font-size:14px;">' + r.title + '</div>';
          html += '<div style="font-size:10px; color:#64748b; margin-top:8px;">' + r.id + ' | ' + r.responsible + '</div>';
          html += '</div>';
        });
        html += '</div></div>';
      });
      html += '</div></div>';

      // GRÁFICOS
      var statusCounts = {
        todo: scrumData.requirements.filter(function(r) { return r.status === 'todo'; }).length,
        doing: scrumData.requirements.filter(function(r) { return r.status === 'doing'; }).length,
        done: scrumData.requirements.filter(function(r) { return r.status === 'done'; }).length,
        overdue: scrumData.requirements.filter(function(r) { return r.status === 'overdue'; }).length
      };
      var statusLabels = [t.scrumTodo, t.scrumDoing, t.scrumDone, t.scrumOverdue];
      var statusData = [statusCounts.todo, statusCounts.doing, statusCounts.done, statusCounts.overdue];

      html += '<div class="exec-section chart-layout" id="pdf-health">';
      html += '<div style="height:400px;"><canvas id="chartHealth"></canvas></div>';
      html += '<div style="border-left:4px solid #3b82f6; padding-left:35px;">';
      html += '<h3>' + t.scrumHealthChart + '</h3>';
      html += '<p>' + t.scrumHealthDesc + '</p>';
      html += '</div></div>';

      html += '<div class="exec-section chart-layout" id="pdf-velocity">';
      html += '<div style="height:400px;"><canvas id="chartVelocity"></canvas></div>';
      html += '<div style="border-left:4px solid #3b82f6; padding-left:35px;">';
      html += '<h3>' + t.scrumVelocity + '</h3>';
      html += '<p>' + t.scrumVelocityDesc + '</p>';
      html += '</div></div>';

      html += '<div class="exec-section chart-layout" id="pdf-team">';
      html += '<div style="height:400px;"><canvas id="chartTeam"></canvas></div>';
      html += '<div style="border-left:4px solid #3b82f6; padding-left:35px;">';
      html += '<h3>' + t.scrumTeamPerformance + '</h3>';
      html += '<p>' + t.scrumTeamDesc + '</p>';
      html += '</div></div>';

      html += '<div class="exec-section chart-layout" id="pdf-burndown">';
      html += '<div style="height:400px;"><canvas id="chartBurndown"></canvas></div>';
      html += '<div style="border-left:4px solid #3b82f6; padding-left:35px;">';
      html += '<h3>' + t.scrumBurndown + '</h3>';
      html += '<p>' + t.scrumBurndownDesc + '</p>';
      html += '</div></div>';

      // SPRINT MANAGEMENT
      html += '<div class="exec-section">';
      html += '<h3>' + t.scrumSprintManagement + '</h3>';
      html += '<table class="vpi-table">';
      html += '<thead><tr><th>' + t.scrumSprintName + '</th><th>' + t.scrumPlanned + '</th><th>' + t.scrumCompleted + '</th><th>' + t.scrumVelocityLabel + '</th><th>' + t.scrumEfficiencyLabel + '</th><th>' + t.scrumAction + '</th></tr></thead>';
      html += '<tbody>';
      sprintStats.forEach(function(s) {
        html += '<tr>';
        html += '<td><strong>' + s.name + '</strong></td>';
        html += '<td>' + s.planned + ' SP</td>';
        html += '<td>' + s.completed + ' SP</td>';
        html += '<td style="color:#3b82f6;">' + (s.completed/5).toFixed(1) + ' ' + t.scrumPointsPerDay + '</td>';
        html += '<td>' + (s.planned > 0 ? Math.round((s.completed/s.planned)*100) : 0) + '%</td>';
        html += '<td><button onclick="deleteSprint(' + s.id + ')" style="background:none; border:none; color:#ef4444; cursor:pointer;">' + t.scrumDelete + '</button></td>';
        html += '</tr>';
      });
      html += '</tbody></table></div>';

      // CONTROL MATRIX
      html += '<div class="exec-section">';
      html += '<h3>' + t.scrumControlMatrix + '</h3>';
      html += '<table class="vpi-table">';
      html += '<thead><tr><th>' + t.scrumID + '</th><th>' + t.scrumTitleLabel + '</th><th>' + t.scrumStatus + '</th><th>' + t.scrumPoints + '</th><th>' + t.scrumDelivery + '</th><th>' + t.scrumSprint + '</th><th>' + t.scrumResponsible + '</th><th>' + t.scrumActions + '</th></tr></thead>';
      html += '<tbody>';
      scrumData.requirements.forEach(function(r) {
        var statusColor = r.status === 'todo' ? '#fde047' : (r.status === 'doing' ? '#0d9488' : (r.status === 'done' ? '#10b981' : '#ef4444'));
        html += '<tr>';
        html += '<td style="color:#3b82f6; font-family:monospace;">' + r.id + '</td>';
        html += '<td><strong>' + r.title + '</strong></td>';
        html += '<td><span style="color:' + statusColor + '; font-weight:800; font-size:10px;">' + r.status.toUpperCase() + '</span></td>';
        html += '<td>' + r.storyPoints + ' SP</td>';
        html += '<td style="color:#fde047;">' + r.endDate + '</td>';
        html += '<td style="color:#3b82f6;">' + r.sprint + '</td>';
        html += '<td><strong>' + r.responsible + '</strong></td>';
        html += '<td style="display:flex; gap:10px;">';
        html += '<button class="btn-vpi" style="font-size:9px; padding:5px;" onclick="assignSprintToTask(\'' + r.id + '\')">' + t.scrumAssignSprint + '</button>';
        html += '<button onclick="deleteStory(\'' + r.id + '\')" style="background:none; border:none; color:#ef4444; cursor:pointer;">' + t.scrumDeleteStory + '</button>';
        html += '</td></tr>';
      });
      html += '</tbody></table></div>';

      html += '</div>'; // end vpi-root

      container.innerHTML = html;

      // Inicializar gráficos
      setTimeout(function() {
        var sC = ['todo', 'doing', 'done', 'overdue'].map(function(s) {
          return scrumData.requirements.filter(function(r) { return r.status === s; }).length;
        });
        new Chart(document.getElementById('chartHealth'), {
          type: 'doughnut',
          data: {
            labels: ['Todo (' + sC[0] + ')', 'Doing (' + sC[1] + ')', 'Done (' + sC[2] + ')', 'Overdue (' + sC[3] + ')'],
            datasets: [{ data: sC, backgroundColor: ['#fde047', '#0d9488', '#10b981', '#ef4444'], borderWidth: 0 }]
          },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { color: '#94a3b8' } } } }
        });

        var sprintLabels = sprintStats.map(function(s) { return s.name; });
        var sprintData = sprintStats.map(function(s) { return s.completed; });
        new Chart(document.getElementById('chartVelocity'), {
          type: 'bar',
          data: { labels: sprintLabels.length ? sprintLabels : ['N/A'], datasets: [{ label: 'Points Completed', data: sprintData.length ? sprintData : [0], backgroundColor: '#0d9488' }] },
          options: { responsive: true, maintainAspectRatio: false }
        });

        var teamLabels = Object.keys(teamData).length ? Object.keys(teamData) : ['N/A'];
        var teamValues = Object.values(teamData).length ? Object.values(teamData) : [0];
        new Chart(document.getElementById('chartTeam'), {
          type: 'bar',
          data: { labels: teamLabels, datasets: [{ label: 'SP Completed', data: teamValues, backgroundColor: '#3b82f6' }] },
          options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false }
        });

        var ideal = [totalSP, totalSP * 0.5, 0];
        var real = [totalSP, totalSP - doneSP, 0];
        new Chart(document.getElementById('chartBurndown'), {
          type: 'line',
          data: { labels: ['Day 1', 'Day 3', 'Day 5'], datasets: [{ label: t.scrumIdeal, data: ideal, borderColor: '#3b82f6', borderDash: [5, 5] }, { label: t.scrumReal, data: real, borderColor: '#10b981', fill: true, backgroundColor: '#10b98111' }] },
          options: { responsive: true, maintainAspectRatio: false }
        });
      }, 200);

      // Sortable
      if (typeof Sortable !== 'undefined') {
        ['todo', 'doing', 'done', 'overdue'].forEach(function(s) {
          var el = document.getElementById('list-' + s);
          if (el) {
            new Sortable(el, {
              group: 'vpi',
              animation: 200,
              onEnd: function(e) {
                window.updateStatus(e.item.getAttribute('data-id'), e.to.id.replace('list-', ''));
              }
            });
          }
        });
      }
    }

    render();
  };

  console.log('✅ renderScrum traducido al inglés.');
})();


// ============================================================
// ENCUESTAS (SURVEYS) - VERSIÓN CORREGIDA Y TRADUCIDA
// ============================================================
(function() {
  if (typeof window.translations === 'undefined') {
    window.translations = {};
  }

  window.translations = Object.assign(window.translations, {
    surveysTitle: '📝 Executive Evaluation',
    surveysSubtitle: 'Strategic evaluation based on stakeholder feedback.',
    surveysGeneralScore: 'Overall Score',
    surveysWeightedAverage: 'Weighted average (scale 1-10)',
    surveysTotalEvaluations: 'Total Evaluations',
    surveysLastEvaluation: 'Last Evaluation',
    surveysNoEvaluations: 'No evaluations registered',
    surveysRegister: '+ Register Evaluation',
    surveysModalTitle: 'Executive Evaluation',
    surveysScoreLabel: 'Score (1-10)',
    surveysCommentLabel: 'Strategic comment',
    surveysCommentPlaceholder: 'Relevant comments for management',
    surveysCancel: 'Cancel',
    surveysSave: 'Save',
    surveysScoreError: 'Score must be between 1 and 10',
    surveysSaved: '✅ Evaluation saved successfully',
    surveysNoProject: '⚠️ No project selected'
  });

  var t = window.translations;

  window.renderEncuestas = function(container) {
    function escapeHtml(str) {
      if (!str) return '';
      return String(str).replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
      });
    }

    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      container.innerHTML = '<p style="color:#94a3b8; text-align:center; padding:40px;">' + t.surveysNoProject + '</p>';
      return;
    }

    var encuestas = JSON.parse(localStorage.getItem('encuestas') || '[]');
    var encuestasProyecto = encuestas.filter(function(e) { return e.projectId === proyecto.name; });
    var puntuaciones = encuestasProyecto.map(function(e) { return e.puntuacion; });

    var promedio = puntuaciones.length
      ? (puntuaciones.reduce(function(a, b) { return a + b; }, 0) / puntuaciones.length).toFixed(1)
      : '—';

    var ultima = encuestasProyecto.length ? encuestasProyecto[encuestasProyecto.length - 1] : null;

    var html = '';
    html += '<div style="padding: 20px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 32px; color: #e2e8f0;">';
    html += '<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; margin-bottom: 28px;">';
    html += '<div><h2 style="margin: 0; font-size: 28px; font-weight: 700; background: linear-gradient(135deg, #fff, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">' + t.surveysTitle + '</h2>';
    html += '<p style="margin: 8px 0 0 0; color: #94a3b8;">' + t.surveysSubtitle + '</p></div>';
    html += '<div style="background: rgba(139,92,246,0.2); border-radius: 40px; padding: 8px 20px;"><span style="color: #a78bfa; font-weight: 500;">' + t.surveysTotalEvaluations + ': ' + encuestasProyecto.length + '</span></div></div>';

    html += '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 25px;">';
    html += '<div style="background: #1e293b; border-radius: 16px; padding: 20px; text-align: center; border-top: 4px solid #8b5cf6;">';
    html += '<div style="font-size: 13px; color: #94a3b8;">' + t.surveysGeneralScore + '</div>';
    html += '<div style="font-size: 48px; font-weight: 800; color: ' + (promedio !== '—' && parseFloat(promedio) >= 7 ? '#10b981' : '#f59e0b') + ';">' + promedio + '</div>';
    html += '<div style="font-size: 11px; color: #64748b;">' + t.surveysWeightedAverage + '</div></div>';

    html += '<div style="background: #1e293b; border-radius: 16px; padding: 20px; text-align: center; border-top: 4px solid #3b82f6;">';
    html += '<div style="font-size: 13px; color: #94a3b8;">' + t.surveysTotalEvaluations + '</div>';
    html += '<div style="font-size: 48px; font-weight: 800; color: #60a5fa;">' + encuestasProyecto.length + '</div>';
    html += '<div style="font-size: 11px; color: #64748b;">' + t.surveysWeightedAverage + '</div></div>';

    html += '<div style="background: #1e293b; border-radius: 16px; padding: 20px; text-align: center; border-top: 4px solid #f59e0b;">';
    html += '<div style="font-size: 13px; color: #94a3b8;">' + t.surveysLastEvaluation + '</div>';
    if (ultima) {
      html += '<div style="font-size: 36px; font-weight: 800; color: ' + (ultima.puntuacion >= 7 ? '#10b981' : '#ef4444') + ';">' + ultima.puntuacion + '/10</div>';
      html += '<div style="font-size: 12px; color: #94a3b8; margin-top: 8px;">“' + escapeHtml(ultima.comentario || 'No comment') + '”</div>';
      html += '<div style="font-size: 10px; color: #64748b; margin-top: 5px;">' + new Date(ultima.fecha).toLocaleString('en-US') + '</div>';
    } else {
      html += '<div style="font-size: 20px; color: #94a3b8; padding: 20px 0;">' + t.surveysNoEvaluations + '</div>';
    }
    html += '</div></div>';

    html += '<button id="encuestaBtn" style="background: linear-gradient(135deg, #8b5cf6, #6d28d9); border: none; color: white; padding: 12px 28px; border-radius: 40px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; font-size: 14px;">';
    html += '<span>+</span> ' + t.surveysRegister + '</button>';

    // MODAL
    html += '<div id="modalEncuesta" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 100000; justify-content: center; align-items: center;">';
    html += '<div style="background: #1e293b; border-radius: 24px; padding: 40px; max-width: 500px; width: 90%; border: 1px solid #8b5cf6;">';
    html += '<h3 style="margin: 0 0 20px 0; color: white; font-size: 22px; text-align: center;">' + t.surveysModalTitle + '</h3>';
    html += '<label style="display: block; color: #94a3b8; font-size: 13px; margin-bottom: 6px;">' + t.surveysScoreLabel + '</label>';
    html += '<input id="encPuntuacion" type="number" min="1" max="10" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #8b5cf6; background: #0f172a; color: white; font-size: 16px; margin-bottom: 20px;">';
    html += '<label style="display: block; color: #94a3b8; font-size: 13px; margin-bottom: 6px;">' + t.surveysCommentLabel + '</label>';
    html += '<textarea id="encComentario" rows="3" placeholder="' + t.surveysCommentPlaceholder + '" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #8b5cf6; background: #0f172a; color: white; font-size: 14px; resize: vertical; margin-bottom: 25px;"></textarea>';
    html += '<div style="display: flex; gap: 15px; justify-content: flex-end;">';
    html += '<button id="cancelModalBtn" style="background: #475569; border: none; padding: 10px 24px; border-radius: 40px; color: white; font-weight: 500; cursor: pointer;">' + t.surveysCancel + '</button>';
    html += '<button id="saveModalBtn" style="background: #10b981; border: none; padding: 10px 24px; border-radius: 40px; color: white; font-weight: 500; cursor: pointer;">' + t.surveysSave + '</button>';
    html += '</div></div></div>';

    html += '</div>';
    container.innerHTML = html;

    // ========== OBTENER REFERENCIAS ==========
    var modal = document.getElementById('modalEncuesta');
    var encuestaBtn = document.getElementById('encuestaBtn');
    var cancelBtn = document.getElementById('cancelModalBtn');
    var saveBtn = document.getElementById('saveModalBtn');
    var puntuacionInput = document.getElementById('encPuntuacion');
    var comentarioInput = document.getElementById('encComentario');

    // ========== FUNCIONES ==========
    function openModal() {
      if (modal) {
        modal.style.display = 'flex';
        puntuacionInput.value = '';
        comentarioInput.value = '';
      }
    }

    function closeModal() {
      if (modal) modal.style.display = 'none';
    }

    function saveEvaluation() {
      var puntuacion = parseInt(puntuacionInput.value);
      var comentario = comentarioInput.value.trim();

      if (!puntuacion || puntuacion < 1 || puntuacion > 10) {
        alert(t.surveysScoreError);
        return;
      }

      var proyectoActual = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
      if (!proyectoActual) {
        alert(t.surveysNoProject);
        return;
      }

      var encuestas = JSON.parse(localStorage.getItem('encuestas') || '[]');
      encuestas.push({
        projectId: proyectoActual.name,
        puntuacion: puntuacion,
        comentario: comentario,
        fecha: new Date().toISOString()
      });
      localStorage.setItem('encuestas', JSON.stringify(encuestas));

      alert(t.surveysSaved);
      closeModal();
      window.renderEncuestas(container);
    }

    // ========== ASIGNAR EVENTOS ==========
    if (encuestaBtn) encuestaBtn.onclick = openModal;
    if (cancelBtn) cancelBtn.onclick = closeModal;
    if (saveBtn) saveBtn.onclick = saveEvaluation;

    // Cerrar modal al hacer clic fuera
    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
      });
    }
  };

  console.log('✅ renderEncuestas corregido y traducido al inglés.');
})();


// ============================================================
// KICKOFF MEETING - SIN ALERTA (CARGA AUTOMÁTICA)
// ============================================================
(function() {
  if (typeof window.translations === 'undefined') {
    window.translations = {};
  }

  window.translations = Object.assign(window.translations, {
    kickoffTitle: '🚀 Kickoff Meeting Configuration',
    kickoffProjectName: 'Project Name:',
    kickoffSponsor: 'Sponsor / Patron:',
    kickoffPM: 'Project Manager:',
    kickoffStartDate: 'Start Date:',
    kickoffEndDate: 'Estimated End Date:',
    kickoffObjective: 'SMART Objective:',
    kickoffIncludes: 'Includes (Scope):',
    kickoffExcludes: 'Excludes (Out of Scope):',
    kickoffEquipment: '🖥️ TECHNICAL EQUIPMENT / DEVICES',
    kickoffStakeholders: '👥 Key Stakeholders',
    kickoffMilestones: '📅 Project Milestones',
    kickoffRisks: '⚠️ Risks and Mitigation',
    kickoffNextSteps: '📌 Next Steps',
    kickoffAddDevice: '+ Add device',
    kickoffAddStakeholder: '+ Add stakeholder',
    kickoffAddMilestone: '+ Add milestone',
    kickoffAddRisk: '+ Add risk',
    kickoffAddAction: '+ Add action',
    kickoffCancel: 'Cancel',
    kickoffGenerate: '✅ Generate Kickoff Document',
    kickoffClose: '✕',
    kickoffPlaceholderSponsor: 'e.g., VP of Operations',
    kickoffPlaceholderPM: 'e.g., John Doe',
    kickoffPlaceholderObjective: 'e.g., Complete the project within budget and timeline.',
    kickoffPlaceholderIncludes: '- Full project management\n- Executive documentation\n- Follow-up meetings',
    kickoffPlaceholderExcludes: '- Post-implementation maintenance\n- Mass training\n- Unapproved changes',
    kickoffPlaceholderEquipment: 'Family (e.g., Networks)',
    kickoffPlaceholderDevice: 'Device name',
    kickoffPlaceholderModel: 'Model',
    kickoffPlaceholderQty: 'Qty',
    kickoffPlaceholderLocation: 'Location',
    kickoffPlaceholderStakeholderName: 'Name',
    kickoffPlaceholderStakeholderRole: 'Role',
    kickoffPlaceholderMilestone: 'Milestone',
    kickoffPlaceholderResponsible: 'Responsible',
    kickoffPlaceholderRiskDesc: 'Risk description',
    kickoffPlaceholderRiskMitigation: 'Mitigation plan',
    kickoffPlaceholderAction: 'Action',
    kickoffPlaceholderDate: 'Date',
    kickoffCode: 'Code'
  });

  var t = window.translations;

  window.generarKickoffDocument = function() {
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      alert('⚠️ No project selected');
      return;
    }

    var tasks = proyecto.tasks || [];
    var hoy = new Date();
    var fechaActual = hoy.toISOString().split('T')[0];

    var defaultSponsor = proyecto.sponsor || 'To be defined';
    var defaultPM = proyecto.pm || 'User';
    var defaultInicio = tasks.length && tasks[0].startDate ? tasks[0].startDate : fechaActual;
    var defaultFin = tasks.length && tasks[tasks.length-1].deadline ? tasks[tasks.length-1].deadline : new Date(hoy.getTime() + 30*24*3600*1000).toISOString().split('T')[0];
    var defaultObjetivo = proyecto.description || 'Complete the project "' + proyecto.name + '" within budget and timeline.';

    // ========== MODAL ==========
    var modalHTML = `
    <div id="kickoffModal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); backdrop-filter:blur(10px); z-index:1000000; display:flex; align-items:center; justify-content:center; overflow-y:auto; padding:20px;">
      <div style="background:linear-gradient(135deg,#0f172a,#1e293b); border-radius:24px; width:1100px; max-width:95vw; max-height:90vh; overflow-y:auto; color:white; border:1px solid #8b5cf6; padding:30px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:25px;">
          <h2 style="margin:0; font-size:24px;">${t.kickoffTitle}</h2>
          <button id="closeKickoffModal" style="background:#ef4444; border:none; color:white; width:40px; height:40px; border-radius:20px; cursor:pointer;">${t.kickoffClose}</button>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
          <div>
            <label>${t.kickoffProjectName}</label>
            <input type="text" id="kickoffNombre" value="${proyecto.name.replace(/"/g, '&quot;')}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #3b82f6; border-radius:8px; color:white;">

            <label>${t.kickoffSponsor}</label>
            <input type="text" id="kickoffSponsor" value="${defaultSponsor}" placeholder="${t.kickoffPlaceholderSponsor}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #3b82f6; border-radius:8px; color:white;">

            <label>${t.kickoffPM}</label>
            <input type="text" id="kickoffPM" value="${defaultPM}" placeholder="${t.kickoffPlaceholderPM}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #3b82f6; border-radius:8px; color:white;">

            <label>${t.kickoffStartDate}</label>
            <input type="date" id="kickoffInicio" value="${defaultInicio}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #3b82f6; border-radius:8px; color:white;">

            <label>${t.kickoffEndDate}</label>
            <input type="date" id="kickoffFin" value="${defaultFin}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #3b82f6; border-radius:8px; color:white;">
          </div>
          <div>
            <label>${t.kickoffObjective}</label>
            <textarea id="kickoffObjetivo" rows="4" style="width:100%; padding:8px; background:#0f172a; border:1px solid #3b82f6; border-radius:8px; color:white;">${defaultObjetivo}</textarea>

            <label>${t.kickoffIncludes}</label>
            <textarea id="kickoffIncluye" rows="3" placeholder="${t.kickoffPlaceholderIncludes}" style="width:100%; padding:8px; background:#0f172a; border:1px solid #3b82f6; border-radius:8px; color:white;">- Full project management\n- Executive documentation\n- Follow-up meetings</textarea>

            <label>${t.kickoffExcludes}</label>
            <textarea id="kickoffExcluye" rows="3" placeholder="${t.kickoffPlaceholderExcludes}" style="width:100%; padding:8px; background:#0f172a; border:1px solid #3b82f6; border-radius:8px; color:white;">- Post-implementation maintenance\n- Mass training\n- Unapproved changes</textarea>
          </div>
        </div>

        <hr style="margin:20px 0; border-color:#334155;">

        <h3>${t.kickoffEquipment}</h3>
        <div id="equipamientoContainer" style="margin-top:10px;">
          <div class="equipo-row" style="display:flex; gap:8px; margin-bottom:8px;">
            <input type="text" class="equipo-familia" placeholder="${t.kickoffPlaceholderEquipment}" style="flex:1; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
            <input type="text" class="equipo-nombre" placeholder="${t.kickoffPlaceholderDevice}" style="flex:1.5; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
            <input type="text" class="equipo-modelo" placeholder="${t.kickoffPlaceholderModel}" style="flex:1.5; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
            <input type="text" class="equipo-cantidad" placeholder="${t.kickoffPlaceholderQty}" style="flex:0.7; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
            <input type="text" class="equipo-ubicacion" placeholder="${t.kickoffPlaceholderLocation}" style="flex:1.3; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
            <button type="button" class="remove-equipo" style="background:#ef4444; color:white; border:none; border-radius:4px; width:30px; cursor:pointer;">✕</button>
          </div>
        </div>
        <button id="addEquipoRow" style="background:#3b82f6; border:none; color:white; padding:6px 12px; border-radius:6px; margin-top:10px; cursor:pointer;">${t.kickoffAddDevice}</button>

        <hr style="margin:20px 0; border-color:#334155;">

        <h3>${t.kickoffStakeholders}</h3>
        <div id="stakeholdersContainer" style="margin-top:10px;">
          <div class="stakeholder-row" style="display:flex; gap:10px; margin-bottom:8px;">
            <input type="text" class="stakeholder-nombre" placeholder="${t.kickoffPlaceholderStakeholderName}" style="flex:2; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
            <input type="text" class="stakeholder-rol" placeholder="${t.kickoffPlaceholderStakeholderRole}" style="flex:2; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
            <select class="stakeholder-influencia" style="flex:1; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;"><option>High</option><option selected>Medium</option><option>Low</option></select>
            <select class="stakeholder-interes" style="flex:1; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;"><option selected>High</option><option>Medium</option><option>Low</option></select>
            <button type="button" class="remove-row" style="background:#ef4444; color:white; border:none; border-radius:4px; width:30px; cursor:pointer;">✕</button>
          </div>
        </div>
        <button id="addStakeholderRow" style="background:#3b82f6; border:none; color:white; padding:6px 12px; border-radius:6px; margin-top:10px; cursor:pointer;">${t.kickoffAddStakeholder}</button>

        <h3 style="margin-top:20px;">${t.kickoffMilestones}</h3>
        <div id="hitosContainer" style="margin-top:10px;">
          <div class="hito-row" style="display:flex; gap:10px; margin-bottom:8px;">
            <input type="text" class="hito-nombre" placeholder="${t.kickoffPlaceholderMilestone}" style="flex:3; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
            <input type="date" class="hito-fecha" style="flex:1; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
            <input type="text" class="hito-responsable" placeholder="${t.kickoffPlaceholderResponsible}" style="flex:2; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
            <button type="button" class="remove-row" style="background:#ef4444; color:white; border:none; border-radius:4px; width:30px; cursor:pointer;">✕</button>
          </div>
        </div>
        <button id="addHitoRow" style="background:#3b82f6; border:none; color:white; padding:6px 12px; border-radius:6px; margin-top:10px; cursor:pointer;">${t.kickoffAddMilestone}</button>

        <h3 style="margin-top:20px;">${t.kickoffRisks}</h3>
        <div id="riesgosContainer" style="margin-top:10px;">
          <div class="riesgo-row" style="display:flex; gap:10px; margin-bottom:8px;">
            <input type="text" class="riesgo-desc" placeholder="${t.kickoffPlaceholderRiskDesc}" style="flex:3; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
            <select class="riesgo-impacto" style="flex:1; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;"><option>High</option><option>Medium</option><option selected>Low</option></select>
            <input type="text" class="riesgo-mitigacion" placeholder="${t.kickoffPlaceholderRiskMitigation}" style="flex:3; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
            <button type="button" class="remove-row" style="background:#ef4444; color:white; border:none; border-radius:4px; width:30px; cursor:pointer;">✕</button>
          </div>
        </div>
        <button id="addRiesgoRow" style="background:#3b82f6; border:none; color:white; padding:6px 12px; border-radius:6px; margin-top:10px; cursor:pointer;">${t.kickoffAddRisk}</button>

        <h3 style="margin-top:20px;">${t.kickoffNextSteps}</h3>
        <div id="pasosContainer" style="margin-top:10px;">
          <div class="paso-row" style="display:flex; gap:10px; margin-bottom:8px;">
            <input type="text" class="paso-accion" placeholder="${t.kickoffPlaceholderAction}" style="flex:3; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
            <input type="date" class="paso-fecha" style="flex:1; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
            <input type="text" class="paso-responsable" placeholder="${t.kickoffPlaceholderResponsible}" style="flex:2; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
            <button type="button" class="remove-row" style="background:#ef4444; color:white; border:none; border-radius:4px; width:30px; cursor:pointer;">✕</button>
          </div>
        </div>
        <button id="addPasoRow" style="background:#3b82f6; border:none; color:white; padding:6px 12px; border-radius:6px; margin-top:10px; cursor:pointer;">${t.kickoffAddAction}</button>

        <div style="display:flex; justify-content:flex-end; gap:15px; margin-top:30px;">
          <button id="cancelKickoffBtn" style="background:#475569; border:none; color:white; padding:12px 24px; border-radius:8px; cursor:pointer;">${t.kickoffCancel}</button>
          <button id="generateKickoffBtn" style="background:#10b981; border:none; color:white; padding:12px 24px; border-radius:8px; cursor:pointer;">${t.kickoffGenerate}</button>
        </div>
      </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    var modal = document.getElementById('kickoffModal');

    // Funciones de filas dinámicas
    function addRow(containerId, templateFn) {
      var container = document.getElementById(containerId);
      var newRow = templateFn();
      container.insertAdjacentHTML('beforeend', newRow);
      attachRemoveEvents(container);
    }

    function attachRemoveEvents(container) {
      container.querySelectorAll('.remove-row, .remove-equipo').forEach(function(btn) {
        btn.removeEventListener('click', removeHandler);
        btn.addEventListener('click', removeHandler);
      });
    }

    function removeHandler(e) {
      e.target.closest('.stakeholder-row, .hito-row, .riesgo-row, .paso-row, .equipo-row').remove();
    }

    var equipoTemplate = function() {
      return `<div class="equipo-row" style="display:flex; gap:8px; margin-bottom:8px;">
        <input type="text" class="equipo-familia" placeholder="${t.kickoffPlaceholderEquipment}" style="flex:1; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
        <input type="text" class="equipo-nombre" placeholder="${t.kickoffPlaceholderDevice}" style="flex:1.5; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
        <input type="text" class="equipo-modelo" placeholder="${t.kickoffPlaceholderModel}" style="flex:1.5; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
        <input type="text" class="equipo-cantidad" placeholder="${t.kickoffPlaceholderQty}" style="flex:0.7; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
        <input type="text" class="equipo-ubicacion" placeholder="${t.kickoffPlaceholderLocation}" style="flex:1.3; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
        <button type="button" class="remove-equipo" style="background:#ef4444; color:white; border:none; border-radius:4px; width:30px; cursor:pointer;">✕</button>
      </div>`;
    };

    var stakeholderTemplate = function() {
      return `<div class="stakeholder-row" style="display:flex; gap:10px; margin-bottom:8px;">
        <input type="text" class="stakeholder-nombre" placeholder="${t.kickoffPlaceholderStakeholderName}" style="flex:2; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
        <input type="text" class="stakeholder-rol" placeholder="${t.kickoffPlaceholderStakeholderRole}" style="flex:2; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
        <select class="stakeholder-influencia" style="flex:1; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;"><option>High</option><option selected>Medium</option><option>Low</option></select>
        <select class="stakeholder-interes" style="flex:1; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;"><option selected>High</option><option>Medium</option><option>Low</option></select>
        <button type="button" class="remove-row" style="background:#ef4444; color:white; border:none; border-radius:4px; width:30px; cursor:pointer;">✕</button>
      </div>`;
    };

    var hitoTemplate = function() {
      return `<div class="hito-row" style="display:flex; gap:10px; margin-bottom:8px;">
        <input type="text" class="hito-nombre" placeholder="${t.kickoffPlaceholderMilestone}" style="flex:3; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
        <input type="date" class="hito-fecha" style="flex:1; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
        <input type="text" class="hito-responsable" placeholder="${t.kickoffPlaceholderResponsible}" style="flex:2; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
        <button type="button" class="remove-row" style="background:#ef4444; color:white; border:none; border-radius:4px; width:30px; cursor:pointer;">✕</button>
      </div>`;
    };

    var riesgoTemplate = function() {
      return `<div class="riesgo-row" style="display:flex; gap:10px; margin-bottom:8px;">
        <input type="text" class="riesgo-desc" placeholder="${t.kickoffPlaceholderRiskDesc}" style="flex:3; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
        <select class="riesgo-impacto" style="flex:1; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;"><option>High</option><option>Medium</option><option selected>Low</option></select>
        <input type="text" class="riesgo-mitigacion" placeholder="${t.kickoffPlaceholderRiskMitigation}" style="flex:3; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
        <button type="button" class="remove-row" style="background:#ef4444; color:white; border:none; border-radius:4px; width:30px; cursor:pointer;">✕</button>
      </div>`;
    };

    var pasoTemplate = function() {
      return `<div class="paso-row" style="display:flex; gap:10px; margin-bottom:8px;">
        <input type="text" class="paso-accion" placeholder="${t.kickoffPlaceholderAction}" style="flex:3; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
        <input type="date" class="paso-fecha" style="flex:1; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
        <input type="text" class="paso-responsable" placeholder="${t.kickoffPlaceholderResponsible}" style="flex:2; padding:6px; background:#0f172a; border:1px solid #3b82f6; border-radius:6px; color:white;">
        <button type="button" class="remove-row" style="background:#ef4444; color:white; border:none; border-radius:4px; width:30px; cursor:pointer;">✕</button>
      </div>`;
    };

    document.getElementById('addEquipoRow').onclick = function() { addRow('equipamientoContainer', equipoTemplate); };
    document.getElementById('addStakeholderRow').onclick = function() { addRow('stakeholdersContainer', stakeholderTemplate); };
    document.getElementById('addHitoRow').onclick = function() { addRow('hitosContainer', hitoTemplate); };
    document.getElementById('addRiesgoRow').onclick = function() { addRow('riesgosContainer', riesgoTemplate); };
    document.getElementById('addPasoRow').onclick = function() { addRow('pasosContainer', pasoTemplate); };

    attachRemoveEvents(document.getElementById('equipamientoContainer'));
    attachRemoveEvents(document.getElementById('stakeholdersContainer'));
    attachRemoveEvents(document.getElementById('hitosContainer'));
    attachRemoveEvents(document.getElementById('riesgosContainer'));
    attachRemoveEvents(document.getElementById('pasosContainer'));

    var closeModal = function() { modal.remove(); };
    document.getElementById('closeKickoffModal').onclick = closeModal;
    document.getElementById('cancelKickoffBtn').onclick = closeModal;

    // ========== GENERAR DOCUMENTO ==========
    document.getElementById('generateKickoffBtn').onclick = function() {
      var nombre = document.getElementById('kickoffNombre').value.trim();
      var sponsor = document.getElementById('kickoffSponsor').value.trim() || 'Not defined';
      var pm = document.getElementById('kickoffPM').value.trim() || 'User';
      var fechaInicio = document.getElementById('kickoffInicio').value;
      var fechaFin = document.getElementById('kickoffFin').value;
      var objetivo = document.getElementById('kickoffObjetivo').value.trim();
      var incluye = document.getElementById('kickoffIncluye').value.trim().split('\n').filter(function(l) { return l.trim(); });
      var excluye = document.getElementById('kickoffExcluye').value.trim().split('\n').filter(function(l) { return l.trim(); });

      var equipamiento = [];
      document.querySelectorAll('#equipamientoContainer .equipo-row').forEach(function(row) {
        var familia = row.querySelector('.equipo-familia')?.value.trim();
        var equipo = row.querySelector('.equipo-nombre')?.value.trim();
        var modelo = row.querySelector('.equipo-modelo')?.value.trim();
        var cantidad = row.querySelector('.equipo-cantidad')?.value.trim();
        var ubicacion = row.querySelector('.equipo-ubicacion')?.value.trim();
        if (equipo) equipamiento.push({ familia: familia || '-', equipo: equipo, modelo: modelo || '-', cantidad: cantidad || '1', ubicacion: ubicacion || '-' });
      });

      var stakeholders = [];
      document.querySelectorAll('#stakeholdersContainer .stakeholder-row').forEach(function(row) {
        var nombreS = row.querySelector('.stakeholder-nombre')?.value.trim();
        var rol = row.querySelector('.stakeholder-rol')?.value.trim();
        var influencia = row.querySelector('.stakeholder-influencia')?.value;
        var interes = row.querySelector('.stakeholder-interes')?.value;
        if (nombreS) stakeholders.push({ nombre: nombreS, rol: rol || '-', influencia: influencia || 'Medium', interes: interes || 'Medium' });
      });

      var hitos = [];
      document.querySelectorAll('#hitosContainer .hito-row').forEach(function(row) {
        var nombreH = row.querySelector('.hito-nombre')?.value.trim();
        var fecha = row.querySelector('.hito-fecha')?.value;
        var responsable = row.querySelector('.hito-responsable')?.value.trim();
        if (nombreH) hitos.push({ nombre: nombreH, fecha: fecha || '', responsable: responsable || '-' });
      });

      var riesgos = [];
      document.querySelectorAll('#riesgosContainer .riesgo-row').forEach(function(row) {
        var desc = row.querySelector('.riesgo-desc')?.value.trim();
        var impacto = row.querySelector('.riesgo-impacto')?.value;
        var mitigacion = row.querySelector('.riesgo-mitigacion')?.value.trim();
        if (desc) riesgos.push({ descripcion: desc, impacto: impacto || 'Medium', mitigacion: mitigacion || '-' });
      });

      var pasos = [];
      document.querySelectorAll('#pasosContainer .paso-row').forEach(function(row) {
        var accion = row.querySelector('.paso-accion')?.value.trim();
        var fecha = row.querySelector('.paso-fecha')?.value;
        var responsable = row.querySelector('.paso-responsable')?.value.trim();
        if (accion) pasos.push({ accion: accion, fecha: fecha || '', responsable: responsable || '-' });
      });

      if (!nombre) {
        alert('⚠️ Project name is required');
        return;
      }

      var fechaEmision = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      var codigoKickoff = 'KO-' + Date.now().toString().slice(-6);

      // ========== CONTENIDO DEL DOCUMENTO ==========
      var contenido = `
      <div style="background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%); color:white; padding:40px; border-radius:24px 24px 0 0; text-align:center;">
        <div style="font-size:64px;">🚀</div>
        <h1 style="margin:0; font-size:36px;">KICKOFF MEETING</h1>
        <p style="margin:10px 0 0;">Project Initiation Document</p>
        <div style="margin-top:30px; display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
          <div style="background:rgba(255,255,255,0.1); padding:12px 24px; border-radius:16px;"><div>${t.kickoffCode}</div><div style="font-weight:bold;">${codigoKickoff}</div></div>
          <div style="background:rgba(255,255,255,0.1); padding:12px 24px; border-radius:16px;"><div>Date</div><div style="font-weight:bold;">${fechaEmision}</div></div>
          <div style="background:rgba(255,255,255,0.1); padding:12px 24px; border-radius:16px;"><div>Version</div><div style="font-weight:bold;">1.0</div></div>
        </div>
      </div>
      <div style="padding:40px; background:#ffffff; color:#1e293b;">
        <div style="margin-bottom:40px;">
          <h2 style="color:#1e3a8a; border-left:6px solid #3b82f6; padding-left:20px;">📋 Executive Summary</h2>
          <p>This document formalizes the start of the project <strong>${nombre}</strong>. It defines strategic objectives, scope, deliverables, key stakeholders, high-level timeline, main risks, and governance agreements.</p>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:40px;">
          <div style="background:#f8fafc; padding:20px; border-radius:16px;"><div style="color:#64748b;">🏢 Project</div><div style="font-size:20px; font-weight:700;">${nombre}</div></div>
          <div style="background:#f8fafc; padding:20px; border-radius:16px;"><div style="color:#64748b;">👤 Project Manager</div><div style="font-size:20px; font-weight:700;">${pm}</div></div>
          <div style="background:#f8fafc; padding:20px; border-radius:16px;"><div style="color:#64748b;">💼 Sponsor</div><div style="font-size:20px; font-weight:700;">${sponsor}</div></div>
          <div style="background:#f8fafc; padding:20px; border-radius:16px;"><div style="color:#64748b;">📅 Period</div><div style="font-size:20px; font-weight:700;">${fechaInicio} → ${fechaFin || 'To be defined'}</div></div>
        </div>
        <div style="margin-bottom:40px;">
          <h2 style="color:#1e3a8a; border-left:6px solid #3b82f6; padding-left:20px;">🎯 SMART Objective</h2>
          <div style="background:#f0f9ff; padding:25px; border-radius:16px; border-left:4px solid #0284c7;">${objetivo}</div>
        </div>
        <div style="margin-bottom:40px;">
          <h2 style="color:#1e3a8a; border-left:6px solid #3b82f6; padding-left:20px;">📐 Scope</h2>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
            <div style="background:#f0fdf4; padding:20px; border-radius:16px;"><strong style="color:#166534;">✅ INCLUDES</strong><ul>${incluye.map(function(i) { return '<li>' + i + '</li>'; }).join('')}</ul></div>
            <div style="background:#fef2f2; padding:20px; border-radius:16px;"><strong style="color:#991b1b;">❌ EXCLUDES</strong><ul>${excluye.map(function(e) { return '<li>' + e + '</li>'; }).join('')}</ul></div>
          </div>
        </div>
        <div style="margin-bottom:40px;">
          <h2 style="color:#1e3a8a; border-left:6px solid #3b82f6; padding-left:20px;">🖥️ TECHNICAL EQUIPMENT / DEVICES</h2>
          <div style="overflow-x:auto;">
            <table style="width:100%; border-collapse:collapse;">
              <thead><tr style="background:#1e3a8a; color:white;"><th style="padding:10px;">Family</th><th>Equipment</th><th>Model</th><th>Qty</th><th>Location</th></tr></thead>
              <tbody>${equipamiento.map(function(e) { return '<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">' + e.familia + '</td><td style="padding:8px;">' + e.equipo + '</td><td style="padding:8px;">' + e.modelo + '</td><td style="text-align:center;">' + e.cantidad + '</td><td style="padding:8px;">' + e.ubicacion + '</td></tr>'; }).join('')}</tbody>
            </table>
          </div>
        </div>
        <div style="margin-bottom:40px;">
          <h2 style="color:#1e3a8a; border-left:6px solid #3b82f6; padding-left:20px;">👥 Key Stakeholders</h2>
          <table style="width:100%; border-collapse:collapse;">
            <thead><tr style="background:#e2e8f0;"><th>Stakeholder</th><th>Role</th><th>Influence</th><th>Interest</th></tr></thead>
            <tbody>${stakeholders.map(function(s) { return '<tr><td style="padding:8px;">' + s.nombre + '</td><td style="padding:8px;">' + s.rol + '</td><td style="text-align:center;">' + s.influencia + '</td><td style="text-align:center;">' + s.interes + '</td></tr>'; }).join('')}</tbody>
          </table>
        </div>
        <div style="margin-bottom:40px;">
          <h2 style="color:#1e3a8a; border-left:6px solid #3b82f6; padding-left:20px;">📅 Project Milestones</h2>
          <table style="width:100%; border-collapse:collapse;">
            <thead><tr style="background:#e2e8f0;"><th>Milestone</th><th>Date</th><th>Responsible</th></tr></thead>
            <tbody>${hitos.map(function(h) { return '<tr><td style="padding:8px;">⭐ ' + h.nombre + '</td><td style="padding:8px;">' + (h.fecha || 'To be defined') + '</td><td style="padding:8px;">' + h.responsable + '</td></tr>'; }).join('')}</tbody>
          </table>
        </div>
        <div style="margin-bottom:40px;">
          <h2 style="color:#1e3a8a; border-left:6px solid #3b82f6; padding-left:20px;">⚠️ Risks and Mitigation</h2>
          <table style="width:100%; border-collapse:collapse;">
            <thead><tr style="background:#e2e8f0;"><th>Risk</th><th>Impact</th><th>Mitigation</th></tr></thead>
            <tbody>${riesgos.map(function(r) { return '<tr><td style="padding:8px;">' + r.descripcion + '</td><td style="text-align:center;"><span style="background:' + (r.impacto==='High'?'#fee2e2':r.impacto==='Medium'?'#fef3c7':'#dcfce7') + '; padding:4px 12px; border-radius:20px;">' + r.impacto + '</span></td><td style="padding:8px;">' + r.mitigacion + '</td></tr>'; }).join('')}</tbody>
          </table>
        </div>
        <div style="margin-bottom:40px;">
          <h2 style="color:#1e3a8a; border-left:6px solid #3b82f6; padding-left:20px;">📌 Next Steps</h2>
          <table style="width:100%; border-collapse:collapse;">
            <thead><tr style="background:#e2e8f0;"><th>Action</th><th>Due Date</th><th>Responsible</th></tr></thead>
            <tbody>${pasos.map(function(p) { return '<tr><td style="padding:8px;">' + p.accion + '</td><td style="padding:8px;">' + (p.fecha || 'To be defined') + '</td><td style="padding:8px;">' + p.responsable + '</td></tr>'; }).join('')}</tbody>
          </table>
        </div>
        <div style="margin-top:50px; padding:30px; background:#f8fafc; border-radius:16px; text-align:center;">
          <h3>✍️ Approval & Commitment</h3>
          <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:20px;">
            <div><div style="height:60px; border-bottom:2px solid #cbd5e1;"></div><strong>Sponsor</strong><br>${sponsor}</div>
            <div><div style="height:60px; border-bottom:2px solid #cbd5e1;"></div><strong>Project Manager</strong><br>${pm}</div>
            <div><div style="height:60px; border-bottom:2px solid #cbd5e1;"></div><strong>Client</strong><br>_________________</div>
          </div>
          <p style="margin-top:30px; color:#64748b; font-size:12px;">This document is official and marks the formal start of the project.</p>
        </div>
      </div>`;

      // ========== HTML COMPLETO ==========
      var htmlCompleto = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Kickoff Meeting - ${nombre}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body {
            font-family: 'Inter', 'Segoe UI', sans-serif !important;
            margin: 0;
            padding: 20px;
            background: #f1f5f9;
          }
          .document-container {
            max-width: 1100px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          @media print {
            body { background: white; padding: 0; }
            .document-container { box-shadow: none; margin: 0; max-width: 100%; }
            button[onclick*="print"] { display: none !important; }
          }
        </style>
      </head>
      <body>
        <div class="document-container">${contenido}</div>
        <div style="position:fixed; bottom:20px; right:20px; z-index:1000;">
          <button onclick="window.print();" style="background:#3b82f6; border:none; padding:12px 24px; border-radius:40px; color:white; font-weight:bold; box-shadow:0 4px 12px rgba(0,0,0,0.2); cursor:pointer; display:flex; align-items:center; gap:8px;">
            🖨️ Print Kickoff
          </button>
        </div>
      </body>
      </html>`;

      // ========== ABRIR VENTANA (SIN ALERTA) ==========
      var ventana = window.open('', '_blank');
      if (!ventana) {
        alert('⚠️ Please allow popup windows to view the document.');
        return;
      }

      ventana.document.write(htmlCompleto);
      ventana.document.close();
      ventana.document.title = 'Kickoff_' + nombre.replace(/\s+/g, '_');

      // Guardar historial (solo en consola)
      var kickoffs = JSON.parse(localStorage.getItem('kickoffDocumentos') || '[]');
      kickoffs.push({ proyecto: nombre, fecha: new Date().toISOString(), codigo: codigoKickoff });
      localStorage.setItem('kickoffDocumentos', JSON.stringify(kickoffs));

      // Mostrar código en consola (no alert)
      console.log('✅ Kickoff document generated successfully. Code:', codigoKickoff);

      // Cerrar modal
      closeModal();
    };
  };

  console.log('✅ Kickoff Meeting actualizado: ahora genera el documento sin alertas bloqueantes.');
})();


// ============================================================
// PROJECT CHARTER - SIN ALERTA (CARGA AUTOMÁTICA)
// ============================================================
(function() {
  if (typeof window.translations === 'undefined') {
    window.translations = {};
  }

  window.translations = Object.assign(window.translations, {
    charterTitle: '📑 Project Charter',
    charterSubtitle: 'PROJECT CHARTER - EXECUTIVE DOCUMENT',
    charterMethod: 'Select Method:',
    charterManual: '✏️ Manual',
    charterFile: '📁 File Upload',
    charterProjectName: 'Project Name:',
    charterObjective: 'Main Objective (SMART):',
    charterScope: 'Scope (Includes/Excludes):',
    charterEquipment: 'Equipment to install:',
    charterStakeholders: 'Key Stakeholders:',
    charterBudget: 'Estimated Budget (€):',
    charterSponsor: 'Sponsor / Patron:',
    charterClient: 'Sponsor / Client:',
    charterPM: 'Project Manager:',
    charterStartDate: 'Start Date:',
    charterEndDate: 'Estimated End Date:',
    charterSuccess: 'Success Criteria:',
    charterRisks: 'Main Risks:',
    charterGenerate: '✅ Generate Charter',
    charterCancel: '❌ Cancel',
    charterUpload: 'Upload a file and the system will extract information.',
    charterAnalyzing: '🔄 Analyzing...',
    charterFileInfo: 'File info',
    charterDocumentAnalyzed: '✅ Document analyzed. Review auto-filled fields.',
    charterConfidential: 'CONFIDENTIAL: This document is property of the organization and distribution is restricted.',
    charterAutoGenerated: 'Automatically generated by PM Virtual Executive',
    charterCode: 'Code',
    charterVersion: 'Version',
    charterEmissionDate: 'Emission Date',
    charterSponsorRole: 'Sponsor / Approver',
    charterPMRole: 'Project Manager',
    charterClientRole: 'Sponsor / Client',
    charterPMORole: 'PMO Director'
  });

  var t = window.translations;

  // ========== FUNCIÓN CHARTER CORREGIDA ==========
  window.generarActaConstitutiva = function() {
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      alert('⚠️ No project selected');
      return;
    }

    // ========== MODAL ==========
    var modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:100002; display:flex; align-items:center; justify-content:center;';

    var content = document.createElement('div');
    content.style.cssText = 'background:linear-gradient(135deg,#1e293b,#0f172a); padding:25px; border-radius:16px; width:550px; max-width:90vw; max-height:85vh; color:white; border:1px solid #3b82f6; overflow-y:auto; display:flex; flex-direction:column;';

    content.innerHTML = `
      <h2 style="color:#3b82f6; margin:0 0 20px 0; text-align:center; font-size:18px;">${t.charterTitle}</h2>
      <p style="margin:0 0 20px 0; text-align:center; color:#94a3b8; font-size:13px;">${t.charterMethod}</p>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:20px;">
        <button id="metodoManual" style="background:#3b82f6; border:none; padding:15px; border-radius:10px; color:white; cursor:pointer; font-size:13px; font-weight:bold;">${t.charterManual}</button>
        <button id="metodoArchivo" style="background:#8b5cf6; border:none; padding:15px; border-radius:10px; color:white; cursor:pointer; font-size:13px; font-weight:bold;">${t.charterFile}</button>
      </div>
      <div id="formularioManual" style="display:block; flex:1; overflow-y:auto;">
        <label style="display:block; margin-bottom:5px; color:#94a3b8; font-size:12px;">${t.charterProjectName}</label>
        <input type="text" id="actaNombre" value="${proyecto.name}" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; margin-bottom:12px; font-size:13px;">

        <label style="display:block; margin-bottom:5px; color:#94a3b8; font-size:12px;">${t.charterObjective}</label>
        <textarea id="actaObjetivo" rows="2" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; margin-bottom:12px; font-size:13px;">${proyecto.description || ''}</textarea>

        <label style="display:block; margin-bottom:5px; color:#94a3b8; font-size:12px;">${t.charterScope}</label>
        <textarea id="actaAlcance" rows="2" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; margin-bottom:12px; font-size:13px;"></textarea>

        <label style="display:block; margin-bottom:5px; color:#94a3b8; font-size:12px;">${t.charterEquipment}</label>
        <textarea id="actaEquipamiento" rows="3" placeholder="e.g., Servers (42U rack), switches (telecom cabinet), workstations (3rd floor office)..." style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; margin-bottom:12px; font-size:13px;"></textarea>

        <label style="display:block; margin-bottom:5px; color:#94a3b8; font-size:12px;">${t.charterStakeholders}</label>
        <input type="text" id="actaStakeholders" placeholder="e.g., CEO, IT Director..." style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; margin-bottom:12px; font-size:13px;">

        <label style="display:block; margin-bottom:5px; color:#94a3b8; font-size:12px;">${t.charterBudget}</label>
        <input type="text" id="actaPresupuesto" placeholder="e.g., 500,000" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; margin-bottom:12px; font-size:13px;">

        <label style="display:block; margin-bottom:5px; color:#94a3b8; font-size:12px;">${t.charterSponsor}</label>
        <input type="text" id="actaSponsor" placeholder="Full name" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; margin-bottom:12px; font-size:13px;">

        <label style="display:block; margin-bottom:5px; color:#94a3b8; font-size:12px;">${t.charterClient}</label>
        <input type="text" id="actaSponsorCliente" placeholder="Client or sponsor name" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; margin-bottom:12px; font-size:13px;">

        <label style="display:block; margin-bottom:5px; color:#94a3b8; font-size:12px;">${t.charterPM}</label>
        <input type="text" id="actaPM" value="User" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; margin-bottom:12px; font-size:13px;">

        <label style="display:block; margin-bottom:5px; color:#94a3b8; font-size:12px;">${t.charterStartDate}</label>
        <input type="date" id="actaFechaInicio" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; margin-bottom:12px; font-size:13px;">

        <label style="display:block; margin-bottom:5px; color:#94a3b8; font-size:12px;">${t.charterEndDate}</label>
        <input type="date" id="actaFechaFin" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; margin-bottom:12px; font-size:13px;">

        <label style="display:block; margin-bottom:5px; color:#94a3b8; font-size:12px;">${t.charterSuccess}</label>
        <textarea id="actaExito" rows="2" placeholder="e.g., ROI > 20%..." style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; margin-bottom:12px; font-size:13px;"></textarea>

        <label style="display:block; margin-bottom:5px; color:#94a3b8; font-size:12px;">${t.charterRisks}</label>
        <textarea id="actaRiesgos" rows="2" placeholder="e.g., Scope changes..." style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; margin-bottom:12px; font-size:13px;"></textarea>
      </div>

      <div id="formularioArchivo" style="display:none; flex:1; overflow-y:auto;">
        <h3 style="color:#f59e0b; margin:0 0 10px 0; font-size:14px;">📁 ${t.charterFile}</h3>
        <p style="color:#94a3b8; margin:0 0 15px 0; font-size:12px;">${t.charterUpload}</p>
        <input type="file" id="archivoActa" accept=".txt,.pdf,.doc,.docx" style="width:100%; padding:10px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; margin-bottom:10px; font-size:13px;">
        <div id="analisisProgreso" style="display:none; color:#10b981; margin-bottom:10px; font-size:12px;">${t.charterAnalyzing}</div>
        <div id="archivoInfo" style="color:#94a3b8; font-size:11px;"></div>
      </div>

      <div style="display:flex; gap:10px; justify-content:center; margin-top:20px; padding-top:15px; border-top:1px solid #3b82f6; flex-shrink:0;">
        <button id="generarActaBtn" style="background:#10b981; border:none; padding:12px 30px; border-radius:8px; color:white; cursor:pointer; font-size:14px; font-weight:bold;">${t.charterGenerate}</button>
        <button id="cancelarActaBtn" style="background:#ef4444; border:none; padding:12px 30px; border-radius:8px; color:white; cursor:pointer; font-size:14px; font-weight:bold;">${t.charterCancel}</button>
      </div>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // Mostrar/ocultar formularios
    document.getElementById('metodoManual').onclick = function() {
      document.getElementById('formularioManual').style.display = 'block';
      document.getElementById('formularioArchivo').style.display = 'none';
    };

    document.getElementById('metodoArchivo').onclick = function() {
      document.getElementById('formularioManual').style.display = 'none';
      document.getElementById('formularioArchivo').style.display = 'block';
    };

    // Procesar archivo
    document.getElementById('archivoActa').onchange = function(e) {
      var file = e.target.files[0];
      if (file) {
        document.getElementById('archivoInfo').textContent = '📄 ' + file.name + ' (' + (file.size/1024).toFixed(2) + ' KB)';
        document.getElementById('analisisProgreso').style.display = 'block';

        var reader = new FileReader();
        reader.onload = function(event) {
          var texto = event.target.result;
          analizarDocumento(texto);
          document.getElementById('analisisProgreso').style.display = 'none';
        };
        reader.readAsText(file);
      }
    };

    function analizarDocumento(texto) {
      var patrones = {
        objetivo: /(objetivo|meta|propósito|objective|goal)[:\s]+([^.]+)/i,
        alcance: /(alcance|scope)[:\s]+([^.]+)/i,
        presupuesto: /(\d+[,.]?\d*)\s*(€|EUR|euros|dólares|USD)/i,
        sponsor: /(sponsor|patrocinador)[:\s]+([^.]+)/i,
        gerente: /(gerente|director|pm|project manager)[:\s]+([^.]+)/i,
        fecha: /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i
      };

      Object.keys(patrones).forEach(function(campo) {
        var match = texto.match(patrones[campo]);
        if (match && match[2]) {
          var inputId = 'acta' + campo.charAt(0).toUpperCase() + campo.slice(1);
          var input = document.getElementById(inputId);
          if (input) input.value = match[2].trim();
        }
      });

      alert(t.charterDocumentAnalyzed); // Esta alerta es informativa, no bloquea la generación
    }

    // ========== GENERAR ACTA ==========
    document.getElementById('generarActaBtn').onclick = function() {
      var datos = {
        nombre: document.getElementById('actaNombre').value || proyecto.name,
        objetivo: document.getElementById('actaObjetivo').value || 'Not specified',
        alcance: document.getElementById('actaAlcance').value || 'Not specified',
        equipamiento: document.getElementById('actaEquipamiento').value || 'Not specified',
        stakeholders: document.getElementById('actaStakeholders').value || 'Not specified',
        presupuesto: document.getElementById('actaPresupuesto').value || 'Not specified',
        sponsor: document.getElementById('actaSponsor').value || 'Not specified',
        sponsorCliente: document.getElementById('actaSponsorCliente').value || 'Not specified',
        pm: document.getElementById('actaPM').value || 'User',
        fechaInicio: document.getElementById('actaFechaInicio').value || new Date().toISOString().split('T')[0],
        fechaFin: document.getElementById('actaFechaFin').value || '',
        exito: document.getElementById('actaExito').value || 'Delivery within approved budget and schedule',
        riesgos: document.getElementById('actaRiesgos').value || 'To be defined during planning phase'
      };

      generarActaEjecutiva(datos, proyecto);
      modal.remove();
    };

    document.getElementById('cancelarActaBtn').onclick = function() { modal.remove(); };
  };

  // ========== FUNCIÓN AUXILIAR PARA GENERAR EL ACTA EJECUTIVA ==========
  function generarActaEjecutiva(datos, proyecto) {
    var fechaEmision = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    var version = '1.0';
    var codigoProyecto = 'PRJ-' + Date.now().toString().slice(-6);

    var contenidoDocumento = `
      <div style="background:linear-gradient(135deg,#1e3a8a,#3b82f6); color:white; padding:40px; border-radius:16px 16px 0 0; text-align:center;">
        <h1 style="margin:0; font-size:32px; font-weight:bold; color:#ffffff !important;">📑 PROJECT CHARTER</h1>
        <p style="margin:10px 0 0 0; opacity:0.9; font-size:14px;">${t.charterSubtitle}</p>
      </div>
      <div style="background:#f8fafc; padding:25px; border-bottom:3px solid #3b82f6;">
        <table style="width:100%; border:none;">
          <tr>
            <td style="border:none; padding:8px;"><strong>📋 ${t.charterCode}:</strong> ${codigoProyecto}</td>
            <td style="border:none; padding:8px;"><strong>📅 ${t.charterEmissionDate}:</strong> ${fechaEmision}</td>
            <td style="border:none; padding:8px;"><strong>📝 ${t.charterVersion}:</strong> ${version}</td>
          </tr>
          <tr>
            <td style="border:none; padding:8px;"><strong>🏢 Project:</strong> ${datos.nombre}</td>
            <td style="border:none; padding:8px;"><strong>👤 ${t.charterPM}:</strong> ${datos.pm}</td>
            <td style="border:none; padding:8px;"><strong>💼 ${t.charterSponsor}:</strong> ${datos.sponsor}</td>
          </tr>
        </table>
      </div>
      <div style="padding:30px;">
        <h2 style="color:#1e3a8a; border-left:5px solid #3b82f6; padding-left:15px; margin-top:30px;">🎯 1. OBJECTIVE AND JUSTIFICATION</h2>
        <p style="line-height:1.8; color:#374151;">${datos.objetivo}</p>
        <h2 style="color:#1e3a8a; border-left:5px solid #3b82f6; padding-left:15px; margin-top:30px;">📐 2. PROJECT SCOPE</h2>
        <div style="background:#f1f5f9; padding:20px; border-radius:10px; margin-top:15px;">
          <strong style="color:#10b981;">✅ INCLUDES:</strong>
          <ul style="line-height:1.8; color:#374151;">
            <li>${datos.alcance.split('\n')[0] || 'Main project deliverables'}</li>
            <li>Full documentation and approvals</li>
            <li>Training and knowledge transfer</li>
          </ul>
          <strong style="color:#ef4444;">❌ EXCLUDES:</strong>
          <ul style="line-height:1.8; color:#374151;">
            <li>Post-implementation maintenance (subject to separate contract)</li>
            <li>Activities not specified in this document</li>
          </ul>
        </div>
        <h2 style="color:#1e3a8a; border-left:5px solid #3b82f6; padding-left:15px; margin-top:30px;">🖥️ 2.1 EQUIPMENT TO INSTALL</h2>
        <div style="background:#f1f5f9; padding:20px; border-radius:10px; margin-top:15px;">
          ${datos.equipamiento.split('\n').map(function(line) { return '<p style="margin:5px 0; color:#374151;">• ' + line + '</p>'; }).join('') || '<p style="color:#374151;">Not specified</p>'}
        </div>
        <h2 style="color:#1e3a8a; border-left:5px solid #3b82f6; padding-left:15px; margin-top:30px;">👥 3. KEY STAKEHOLDERS</h2>
        <table style="width:100%; border-collapse:collapse; margin-top:15px;">
          <thead><tr style="background:#3b82f6; color:white;"><th style="padding:12px; text-align:left;">Role</th><th style="padding:12px; text-align:left;">Responsibility</th><th style="padding:12px; text-align:left;">Influence Level</th></tr></thead>
          <tbody>
            <tr style="background:#f8fafc;"><td style="padding:12px; border-bottom:1px solid #e2e8f0;">${datos.sponsor}</td><td style="padding:12px; border-bottom:1px solid #e2e8f0;">Sponsor / Approver</td><td style="padding:12px; border-bottom:1px solid #e2e8f0;">🔴 High</td></tr>
            <tr style="background:white;"><td style="padding:12px; border-bottom:1px solid #e2e8f0;">${datos.pm}</td><td style="padding:12px; border-bottom:1px solid #e2e8f0;">Project Manager</td><td style="padding:12px; border-bottom:1px solid #e2e8f0;">🟡 Medium</td></tr>
            <tr style="background:#f8fafc;"><td style="padding:12px; border-bottom:1px solid #e2e8f0;">${datos.stakeholders}</td><td style="padding:12px; border-bottom:1px solid #e2e8f0;">Interested / Users</td><td style="padding:12px; border-bottom:1px solid #e2e8f0;">🟢 Variable</td></tr>
          </tbody>
        </table>
        <h2 style="color:#1e3a8a; border-left:5px solid #3b82f6; padding-left:15px; margin-top:30px;">💰 4. BUDGET AND RESOURCES</h2>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:15px;">
          <div style="background:#f0fdf4; padding:20px; border-radius:10px; border-left:4px solid #10b981;">
            <strong style="color:#166534; font-size:18px;">💵 Estimated Budget</strong>
            <p style="font-size:28px; color:#10b981; margin:10px 0;">${datos.presupuesto !== 'Not specified' ? '€ ' + datos.presupuesto : 'To be defined'}</p>
          </div>
          <div style="background:#fef3c7; padding:20px; border-radius:10px; border-left:4px solid #f59e0b;">
            <strong style="color:#92400e; font-size:18px;">📅 Estimated Duration</strong>
            <p style="font-size:28px; color:#f59e0b; margin:10px 0;">${datos.fechaInicio && datos.fechaFin ? Math.ceil((new Date(datos.fechaFin) - new Date(datos.fechaInicio)) / (1000*3600*24)) + ' days' : 'To be defined'}</p>
          </div>
        </div>
        <h2 style="color:#1e3a8a; border-left:5px solid #3b82f6; padding-left:15px; margin-top:30px;">📊 5. SUCCESS CRITERIA</h2>
        <ul style="line-height:2; color:#374151;">
          ${datos.exito.split('\n').map(function(c) { return '<li>' + (c || '• SMART objectives achieved') + '</li>'; }).join('')}
        </ul>
        <h2 style="color:#1e3a8a; border-left:5px solid #3b82f6; padding-left:15px; margin-top:30px;">⚠️ 6. MAIN RISKS</h2>
        <div style="background:#fef2f2; padding:20px; border-radius:10px; border-left:4px solid #ef4444; margin-top:15px;">
          ${datos.riesgos.split('\n').map(function(r) { return '<p style="margin:5px 0; color:#991b1b;">⚠️ ' + (r || 'Risks to be identified during planning phase') + '</p>'; }).join('')}
        </div>
        <h2 style="color:#1e3a8a; border-left:5px solid #3b82f6; padding-left:15px; margin-top:30px;">📅 7. MAIN SCHEDULE</h2>
        <table style="width:100%; border-collapse:collapse; margin-top:15px;">
          <tr style="background:#3b82f6; color:white;"><th style="padding:12px; text-align:left;">Milestone</th><th style="padding:12px; text-align:left;">Estimated Date</th></tr>
          <tr><td style="padding:12px; border-bottom:1px solid #e2e8f0;">🚀 Project Start</td><td style="padding:12px; border-bottom:1px solid #e2e8f0;">${datos.fechaInicio}</td></tr>
          <tr><td style="padding:12px; border-bottom:1px solid #e2e8f0;">📋 Planning Completed</td><td style="padding:12px; border-bottom:1px solid #e2e8f0;">${datos.fechaInicio ? new Date(new Date(datos.fechaInicio).setDate(new Date(datos.fechaInicio).getDate() + 15)).toISOString().split('T')[0] : 'TBD'}</td></tr>
          <tr><td style="padding:12px; border-bottom:1px solid #e2e8f0;">✅ Final Delivery</td><td style="padding:12px; border-bottom:1px solid #e2e8f0;">${datos.fechaFin || 'To be defined'}</td></tr>
        </table>
        <h2 style="color:#1e3a8a; border-left:5px solid #3b82f6; padding-left:15px; margin-top:30px;">✍️ 8. APPROVALS</h2>
        <p style="color:#6b7280; margin-bottom:20px;">The following signatures indicate formal approval to start the project:</p>
        <table style="width:100%; border-collapse:collapse; margin-top:15px;">
          <thead><tr style="background:#1e3a8a; color:white;"><th style="padding:15px; text-align:left;">Role</th><th style="padding:15px; text-align:left;">Name</th><th style="padding:15px; text-align:left;">Signature</th><th style="padding:15px; text-align:left;">Date</th></tr></thead>
          <tbody>
            <tr style="background:#f8fafc;"><td style="padding:15px; border-bottom:2px solid #3b82f6;">Sponsor / Patron</td><td style="padding:15px; border-bottom:2px solid #3b82f6;">${datos.sponsor}</td><td style="padding:15px; border-bottom:2px solid #3b82f6; height:50px;"></td><td style="padding:15px; border-bottom:2px solid #3b82f6;">${fechaEmision}</td></tr>
            <tr style="background:white;"><td style="padding:15px; border-bottom:2px solid #3b82f6;">Project Manager</td><td style="padding:15px; border-bottom:2px solid #3b82f6;">${datos.pm}</td><td style="padding:15px; border-bottom:2px solid #3b82f6; height:50px;"></td><td style="padding:15px; border-bottom:2px solid #3b82f6;">${fechaEmision}</td></tr>
            <tr style="background:#f8fafc;"><td style="padding:15px; border-bottom:2px solid #3b82f6;">Sponsor / Client</td><td style="padding:15px; border-bottom:2px solid #3b82f6;">${datos.sponsorCliente}</td><td style="padding:15px; border-bottom:2px solid #3b82f6; height:50px;"></td><td style="padding:15px; border-bottom:2px solid #3b82f6;">${fechaEmision}</td></tr>
          </tbody>
        </table>
        <div style="margin-top:40px; padding:20px; background:#f8fafc; border-radius:10px; text-align:center;">
          <p style="color:#6b7280; font-size:12px; margin:0;">
            <strong>${t.charterConfidential}</strong><br>
            ${t.charterAutoGenerated} - ${fechaEmision}
          </p>
        </div>
      </div>
    `;

    // ========== BOTÓN FLOTANTE DE IMPRESIÓN ==========
    var botonImpresion = `
      <div style="position:fixed; bottom:20px; right:20px; z-index:1000;">
        <button onclick="window.print();" style="background:#3b82f6; border:none; padding:12px 24px; border-radius:40px; color:white; font-weight:bold; box-shadow:0 4px 12px rgba(0,0,0,0.2); cursor:pointer; display:flex; align-items:center; gap:8px;">
          🖨️ Print Charter
        </button>
      </div>
    `;

    // ========== HTML COMPLETO ==========
    var htmlCompleto = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Project Charter - ${datos.nombre}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body { font-family: 'Inter', 'Segoe UI', sans-serif !important; margin: 0; padding: 20px; background: #e2e8f0; }
          .document-container { max-width: 1100px; margin: 0 auto; background: white; border-radius: 16px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); overflow: hidden; }
          @media print { body { background: white; padding: 0; } .document-container { box-shadow: none; margin: 0; max-width: 100%; } button[onclick*="print"] { display: none !important; } }
        </style>
      </head>
      <body>
        <div class="document-container">${contenidoDocumento}</div>
        ${botonImpresion}
      </body>
      </html>
    `;

    // ========== ABRIR VENTANA (SIN ALERTA) ==========
    var ventana = window.open('', '_blank');
    if (!ventana) {
      alert('⚠️ Please allow popup windows to view the document.');
      return;
    }

    ventana.document.write(htmlCompleto);
    ventana.document.close();
    ventana.document.title = 'Project_Charter_' + datos.nombre.replace(/\s+/g, '_');

    // Guardar historial (solo en consola)
    var actasGuardadas = JSON.parse(localStorage.getItem('actasConstitutivas') || '[]');
    actasGuardadas.push({ proyecto: datos.nombre, fecha: new Date().toISOString(), version: version, codigo: codigoProyecto });
    localStorage.setItem('actasConstitutivas', JSON.stringify(actasGuardadas));

    console.log('✅ Project Charter generated successfully. Code:', codigoProyecto);
  }

  console.log('✅ Project Charter actualizado: ahora genera el documento sin alertas bloqueantes.');
})();


// ============================================================
// STAKEHOLDER REGISTER - SIN ALERTA
// ============================================================
(function() {
  if (typeof window.translations === 'undefined') {
    window.translations = {};
  }

  window.translations = Object.assign(window.translations, {
    stakeholderTitle: '👥 Stakeholder Register',
    stakeholderSubtitle: 'STAKEHOLDER REGISTER - EXECUTIVE DOCUMENT',
    stakeholderProject: 'Project',
    stakeholderCode: 'Code',
    stakeholderDate: 'Date',
    stakeholderTotal: 'Total Stakeholders',
    stakeholderHighInfluence: 'High Influence',
    stakeholderHighInterest: 'High Interest',
    stakeholderName: 'Name / Role',
    stakeholderInfluence: 'Influence',
    stakeholderInterest: 'Interest',
    stakeholderExpectations: 'Expectations',
    stakeholderStrategy: 'Strategy',
    stakeholderFrequency: 'Frequency',
    stakeholderChannel: 'Channel',
    stakeholderRegisterNew: '+ Register Stakeholder',
    stakeholderNamePlaceholder: 'e.g., IT Director, Client...',
    stakeholderInfluenceHigh: '🔴 High',
    stakeholderInfluenceMedium: '🟡 Medium',
    stakeholderInfluenceLow: '🟢 Low',
    stakeholderInterestHigh: '🔴 High',
    stakeholderInterestMedium: '🟡 Medium',
    stakeholderInterestLow: '🟢 Low',
    stakeholderStrategyManage: '🔴 Manage closely',
    stakeholderStrategyInform: '🟡 Keep informed',
    stakeholderStrategySatisfy: '🔵 Keep satisfied',
    stakeholderStrategyMonitor: '🟢 Monitor',
    stakeholderFrequencyDaily: 'Daily',
    stakeholderFrequencyWeekly: 'Weekly',
    stakeholderFrequencyBiweekly: 'Biweekly',
    stakeholderFrequencyMonthly: 'Monthly',
    stakeholderFrequencyAsNeeded: 'As needed',
    stakeholderChannelEmail: 'Email',
    stakeholderChannelMeeting: 'In-person meeting',
    stakeholderChannelVideo: 'Video conference',
    stakeholderChannelChat: 'Chat/Slack',
    stakeholderChannelReport: 'Written report',
    stakeholderExpectationsPlaceholder: 'What does this stakeholder expect from the project?',
    stakeholderCancel: 'Cancel',
    stakeholderGenerate: '✅ Generate Register',
    stakeholderClose: '✕',
    stakeholderNoStakeholders: 'No stakeholders registered',
    stakeholderAddFirst: 'Add the first stakeholder using the form above.',
    stakeholderSaved: '✅ Stakeholder saved successfully',
    stakeholderConfirmDelete: 'Delete this stakeholder?',
    stakeholderDeleted: '✅ Stakeholder deleted',
    stakeholderGenerated: '✅ Stakeholder Register generated successfully.',
    stakeholderConfidential: 'CONFIDENTIAL - For executive use only',
    stakeholderMethodology: 'Methodology: Stakeholder analysis based on influence and interest levels.',
    stakeholderAutoGenerated: 'Automatically generated by PM Virtual Executive'
  });

  var t = window.translations;

  window.generarRegistroStakeholders = function() {
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      alert('⚠️ No project selected');
      return;
    }

    // Cargar stakeholders existentes
    var stakeholdersData = JSON.parse(localStorage.getItem('stakeholdersData') || '[]');
    var stakeholders = stakeholdersData.filter(function(s) { return s.proyectoId === proyecto.name; });

    // ========== MODAL ==========
    var modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:100002; display:flex; align-items:center; justify-content:center;';

    var content = document.createElement('div');
    content.style.cssText = 'background:linear-gradient(135deg,#1e293b,#0f172a); padding:25px; border-radius:16px; width:700px; max-width:90vw; max-height:85vh; color:white; border:1px solid #3b82f6; overflow-y:auto; display:flex; flex-direction:column;';

    content.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
        <h2 style="color:#3b82f6; margin:0; font-size:18px;">${t.stakeholderTitle}</h2>
        <span style="color:#94a3b8; font-size:12px;">${stakeholders.length} ${t.stakeholderTotal}</span>
      </div>
      <p style="margin:0 0 15px 0; color:#94a3b8; font-size:13px;">${t.stakeholderSubtitle}</p>

      <!-- Formulario para agregar stakeholder -->
      <div style="background:rgba(0,0,0,0.3); padding:15px; border-radius:12px; margin-bottom:15px;">
        <h3 style="color:#10b981; margin:0 0 10px 0; font-size:14px;">${t.stakeholderRegisterNew}</h3>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="grid-column: span 2;">
            <input type="text" id="stkNombre" placeholder="${t.stakeholderNamePlaceholder}" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px;">
          </div>
          <div>
            <select id="stkInfluencia" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px;">
              <option value="Alta">${t.stakeholderInfluenceHigh}</option>
              <option value="Media" selected>${t.stakeholderInfluenceMedium}</option>
              <option value="Baja">${t.stakeholderInfluenceLow}</option>
            </select>
          </div>
          <div>
            <select id="stkInteres" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px;">
              <option value="Alto" selected>${t.stakeholderInterestHigh}</option>
              <option value="Medio">${t.stakeholderInterestMedium}</option>
              <option value="Bajo">${t.stakeholderInterestLow}</option>
            </select>
          </div>
          <div style="grid-column: span 2;">
            <textarea id="stkExpectativas" rows="2" placeholder="${t.stakeholderExpectationsPlaceholder}" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px; resize:vertical;"></textarea>
          </div>
          <div>
            <select id="stkEstrategia" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px;">
              <option value="Gestionar de cerca">${t.stakeholderStrategyManage}</option>
              <option value="Mantener informado">${t.stakeholderStrategyInform}</option>
              <option value="Mantener satisfecho">${t.stakeholderStrategySatisfy}</option>
              <option value="Monitorear">${t.stakeholderStrategyMonitor}</option>
            </select>
          </div>
          <div>
            <select id="stkFrecuencia" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px;">
              <option>${t.stakeholderFrequencyDaily}</option>
              <option selected>${t.stakeholderFrequencyWeekly}</option>
              <option>${t.stakeholderFrequencyBiweekly}</option>
              <option>${t.stakeholderFrequencyMonthly}</option>
              <option>${t.stakeholderFrequencyAsNeeded}</option>
            </select>
          </div>
          <div style="grid-column: span 2;">
            <select id="stkCanal" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px;">
              <option>${t.stakeholderChannelEmail}</option>
              <option>${t.stakeholderChannelMeeting}</option>
              <option>${t.stakeholderChannelVideo}</option>
              <option>${t.stakeholderChannelChat}</option>
              <option>${t.stakeholderChannelReport}</option>
            </select>
          </div>
        </div>
        <button id="agregarStakeholder" style="margin-top:10px; background:#3b82f6; border:none; padding:8px 20px; border-radius:8px; color:white; cursor:pointer; font-weight:bold; font-size:13px;">💾 ${t.stakeholderRegisterNew}</button>
      </div>

      <!-- Lista de stakeholders -->
      <div id="listaStakeholders" style="flex:1; overflow-y:auto; margin-bottom:10px; max-height:250px;">
        ${stakeholders.length === 0 ? '<p style="text-align:center; color:#94a3b8; padding:20px;">' + t.stakeholderNoStakeholders + '<br><span style="font-size:12px;">' + t.stakeholderAddFirst + '</span></p>' :
          stakeholders.map(function(s, idx) {
            var colorInf = s.influencia === 'Alta' ? '#ef4444' : (s.influencia === 'Media' ? '#f59e0b' : '#22c55e');
            return '<div style="background:rgba(0,0,0,0.2); padding:10px; border-radius:8px; margin-bottom:6px; display:flex; justify-content:space-between; align-items:center; border-left:3px solid ' + colorInf + ';">' +
              '<div><strong>' + s.nombre + '</strong> <span style="font-size:11px; color:#94a3b8;">' + (s.rol || '') + '</span><br><span style="font-size:10px; color:#64748b;">' + s.estrategia + ' · ' + s.frecuencia + '</span></div>' +
              '<button data-idx="' + idx + '" class="btn-eliminar-stk" style="background:#ef4444; border:none; padding:4px 10px; border-radius:4px; color:white; cursor:pointer; font-size:11px;">🗑️</button></div>';
          }).join('')
        }
      </div>

      <div style="display:flex; gap:10px; justify-content:center; padding-top:15px; border-top:1px solid #3b82f6; flex-shrink:0;">
        <button id="generarStkBtn" style="background:#10b981; border:none; padding:10px 25px; border-radius:8px; color:white; cursor:pointer; font-size:14px; font-weight:bold;">${t.stakeholderGenerate}</button>
        <button id="cancelarStkBtn" style="background:#ef4444; border:none; padding:10px 25px; border-radius:8px; color:white; cursor:pointer; font-size:14px; font-weight:bold;">${t.stakeholderCancel}</button>
      </div>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // ========== FUNCIONES ==========
    function actualizarLista() {
      var lista = document.getElementById('listaStakeholders');
      var nuevosStakeholders = stakeholdersData.filter(function(s) { return s.proyectoId === proyecto.name; });
      if (nuevosStakeholders.length === 0) {
        lista.innerHTML = '<p style="text-align:center; color:#94a3b8; padding:20px;">' + t.stakeholderNoStakeholders + '<br><span style="font-size:12px;">' + t.stakeholderAddFirst + '</span></p>';
      } else {
        lista.innerHTML = nuevosStakeholders.map(function(s, idx) {
          var colorInf = s.influencia === 'Alta' ? '#ef4444' : (s.influencia === 'Media' ? '#f59e0b' : '#22c55e');
          return '<div style="background:rgba(0,0,0,0.2); padding:10px; border-radius:8px; margin-bottom:6px; display:flex; justify-content:space-between; align-items:center; border-left:3px solid ' + colorInf + ';">' +
            '<div><strong>' + s.nombre + '</strong> <span style="font-size:11px; color:#94a3b8;">' + (s.rol || '') + '</span><br><span style="font-size:10px; color:#64748b;">' + s.estrategia + ' · ' + s.frecuencia + '</span></div>' +
            '<button data-idx="' + idx + '" class="btn-eliminar-stk" style="background:#ef4444; border:none; padding:4px 10px; border-radius:4px; color:white; cursor:pointer; font-size:11px;">🗑️</button></div>';
        }).join('');
        lista.querySelectorAll('.btn-eliminar-stk').forEach(function(btn) {
          btn.onclick = function() {
            var idx = parseInt(this.dataset.idx);
            var stk = nuevosStakeholders[idx];
            if (confirm(t.stakeholderConfirmDelete)) {
              var globalIdx = stakeholdersData.indexOf(stk);
              if (globalIdx !== -1) {
                stakeholdersData.splice(globalIdx, 1);
                localStorage.setItem('stakeholdersData', JSON.stringify(stakeholdersData));
                actualizarLista();
              }
            }
          };
        });
      }
    }

    // Agregar stakeholder
    document.getElementById('agregarStakeholder').onclick = function() {
      var nombre = document.getElementById('stkNombre').value.trim();
      if (!nombre) { alert('⚠️ Name is required'); return; }

      var nuevo = {
        id: Date.now(),
        proyectoId: proyecto.name,
        nombre: nombre,
        influencia: document.getElementById('stkInfluencia').value,
        interes: document.getElementById('stkInteres').value,
        expectativas: document.getElementById('stkExpectativas').value.trim(),
        estrategia: document.getElementById('stkEstrategia').value,
        frecuencia: document.getElementById('stkFrecuencia').value,
        canal: document.getElementById('stkCanal').value,
        fecha: new Date().toISOString()
      };

      stakeholdersData.push(nuevo);
      localStorage.setItem('stakeholdersData', JSON.stringify(stakeholdersData));

      document.getElementById('stkNombre').value = '';
      document.getElementById('stkExpectativas').value = '';
      actualizarLista();
      alert(t.stakeholderSaved);
    };

    // ========== GENERAR DOCUMENTO ==========
    document.getElementById('generarStkBtn').onclick = function() {
      var stakeholdersActuales = stakeholdersData.filter(function(s) { return s.proyectoId === proyecto.name; });
      if (stakeholdersActuales.length === 0) {
        alert('⚠️ ' + t.stakeholderNoStakeholders);
        return;
      }

      var fechaEmision = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      var codigo = 'STK-' + Date.now().toString().slice(-6);

      // ========== CONTENIDO DEL DOCUMENTO ==========
      var filas = stakeholdersActuales.map(function(s) {
        var colorInf = s.influencia === 'Alta' ? '#ef4444' : (s.influencia === 'Media' ? '#f59e0b' : '#22c55e');
        var colorInt = s.interes === 'Alto' ? '#ef4444' : (s.interes === 'Medio' ? '#f59e0b' : '#22c55e');
        return '<tr>' +
          '<td style="padding:10px; border:1px solid #e2e8f0;"><strong>' + s.nombre + '</strong></td>' +
          '<td style="padding:10px; border:1px solid #e2e8f0; text-align:center;"><span style="background:' + colorInf + '; color:white; padding:2px 10px; border-radius:12px; font-size:11px;">' + s.influencia + '</span></td>' +
          '<td style="padding:10px; border:1px solid #e2e8f0; text-align:center;"><span style="background:' + colorInt + '; color:white; padding:2px 10px; border-radius:12px; font-size:11px;">' + s.interes + '</span></td>' +
          '<td style="padding:10px; border:1px solid #e2e8f0;">' + (s.expectativas || '-') + '</td>' +
          '<td style="padding:10px; border:1px solid #e2e8f0; text-align:center;">' + s.estrategia + '</td>' +
          '<td style="padding:10px; border:1px solid #e2e8f0; text-align:center;">' + s.frecuencia + '</td>' +
          '<td style="padding:10px; border:1px solid #e2e8f0; text-align:center;">' + s.canal + '</td></tr>';
      }).join('');

      var contenido = `
      <div style="background:linear-gradient(135deg,#7c3aed,#8b5cf6); color:white; padding:30px; border-radius:16px 16px 0 0; text-align:center;">
        <h1 style="margin:0; font-size:24px;">👥 ${t.stakeholderTitle}</h1>
        <p style="margin:8px 0 0 0; opacity:0.9;">${t.stakeholderSubtitle}</p>
        <div style="margin-top:15px; display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
          <div style="background:rgba(255,255,255,0.15); padding:8px 16px; border-radius:8px;">${t.stakeholderCode}: ${codigo}</div>
          <div style="background:rgba(255,255,255,0.15); padding:8px 16px; border-radius:8px;">${t.stakeholderDate}: ${fechaEmision}</div>
          <div style="background:rgba(255,255,255,0.15); padding:8px 16px; border-radius:8px;">${t.stakeholderProject}: ${proyecto.name}</div>
        </div>
      </div>
      <div style="padding:30px; background:white; color:#1e293b;">
        <h2 style="color:#1e3a8a; border-left:5px solid #8b5cf6; padding-left:15px;">📋 ${t.stakeholderTitle}</h2>
        <p style="line-height:1.8; color:#374151;">Total: <strong>${stakeholdersActuales.length}</strong> stakeholders</p>
        <table style="width:100%; border-collapse:collapse; margin-top:20px; font-size:13px;">
          <thead>
            <tr style="background:#ede9fe;">
              <th style="padding:10px; border:1px solid #ddd6fe; text-align:left;">${t.stakeholderName}</th>
              <th style="padding:10px; border:1px solid #ddd6fe; text-align:center;">${t.stakeholderInfluence}</th>
              <th style="padding:10px; border:1px solid #ddd6fe; text-align:center;">${t.stakeholderInterest}</th>
              <th style="padding:10px; border:1px solid #ddd6fe; text-align:left;">${t.stakeholderExpectations}</th>
              <th style="padding:10px; border:1px solid #ddd6fe; text-align:center;">${t.stakeholderStrategy}</th>
              <th style="padding:10px; border:1px solid #ddd6fe; text-align:center;">${t.stakeholderFrequency}</th>
              <th style="padding:10px; border:1px solid #ddd6fe; text-align:center;">${t.stakeholderChannel}</th>
            </tr>
          </thead>
          <tbody>${filas}</tbody>
        </table>
        <div style="margin-top:30px; padding:20px; background:#f8fafc; border-radius:12px; text-align:center;">
          <p style="color:#64748b; font-size:12px;"><strong>${t.stakeholderConfidential}</strong><br>${t.stakeholderMethodology}<br>${t.stakeholderAutoGenerated} - ${fechaEmision}</p>
        </div>
      </div>`;

      var htmlCompleto = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Stakeholder Register - ${proyecto.name}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body { font-family: 'Inter', 'Segoe UI', sans-serif !important; margin:0; padding:20px; background:#f1f5f9; }
          .document-container { max-width:1200px; margin:0 auto; background:white; border-radius:16px; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1); overflow:hidden; }
          @media print { body { background:white; padding:0; } .document-container { box-shadow:none; margin:0; max-width:100%; } button[onclick*="print"] { display:none !important; } }
        </style>
      </head>
      <body>
        <div class="document-container">${contenido}</div>
        <div style="position:fixed; bottom:20px; right:20px; z-index:1000;">
          <button onclick="window.print();" style="background:#3b82f6; border:none; padding:12px 24px; border-radius:40px; color:white; font-weight:bold; box-shadow:0 4px 12px rgba(0,0,0,0.2); cursor:pointer; display:flex; align-items:center; gap:8px;">🖨️ Print Register</button>
        </div>
      </body>
      </html>`;

      var ventana = window.open('', '_blank');
      if (!ventana) {
        alert('⚠️ Please allow popup windows to view the document.');
        return;
      }

      ventana.document.write(htmlCompleto);
      ventana.document.close();
      ventana.document.title = 'Stakeholder_Register_' + proyecto.name.replace(/\s+/g, '_');

      // Guardar historial
      var registros = JSON.parse(localStorage.getItem('stakeholderRegistros') || '[]');
      registros.push({ proyecto: proyecto.name, fecha: new Date().toISOString(), codigo: codigo, total: stakeholdersActuales.length });
      localStorage.setItem('stakeholderRegistros', JSON.stringify(registros));

      console.log('✅ Stakeholder Register generated successfully. Code:', codigo);
      modal.remove();
    };

    document.getElementById('cancelarStkBtn').onclick = function() { modal.remove(); };
    actualizarLista();
  };

  console.log('✅ Stakeholder Register actualizado: ahora genera el documento sin alertas bloqueantes.');
})();


// ============================================================
// PROJECT PLAN (con Gantt) - VERSIÓN CORREGIDA Y SIN ALERTA
// ============================================================
(function() {
  if (typeof window.translations === 'undefined') {
    window.translations = {};
  }

  // Agregar/sobrescribir traducciones específicas para este documento
  window.translations = Object.assign(window.translations, {
    planTitle: '📅 Project Plan with Gantt',
    planSubtitle: 'PROJECT PLAN & TIMELINE - EXECUTIVE DOCUMENT',
    planProject: 'Project',
    planCode: 'Code',
    planDate: 'Date',
    planTotalTasks: 'Total Tasks',
    planCompleted: 'Completed',
    planInProgress: 'In Progress',
    planOverdue: 'Overdue',
    planDuration: 'Duration',
    planProgress: 'Progress',
    planEVM: 'EVM Indicators',
    planSPI: 'SPI (Schedule)',
    planCPI: 'CPI (Cost)',
    planEstimatedHours: 'Estimated Hours',
    planEfficiency: 'Efficiency',
    planExecutiveSummary: 'Executive Summary',
    planSummaryText: (name) => `This Project Plan provides a comprehensive view of the schedule, critical milestones, and resource allocation for the project "${name}". This document is designed to facilitate strategic decision-making, progress tracking, and early risk identification. The Gantt diagram visualizes the sequence of activities, dependencies, and key dates, enabling proactive time and deliverable management.`,
    planKeyDates: 'Key Project Dates',
    planStartDate: 'Start Date',
    planEndDate: 'End Date',
    planTotalDays: 'Total Days',
    planGanttChart: 'Gantt Chart - Visual Timeline',
    planGanttLegend: 'Legend',
    planGanttCompleted: '✅ Completed',
    planGanttInProgress: '🔄 In Progress',
    planGanttPending: '⏳ Pending',
    planGanttOverdue: '🔴 Overdue/Delayed',
    planCriticalMilestones: 'Critical Milestones - Priority Attention',
    planDetailedSchedule: 'Detailed Activity Schedule',
    planTask: 'Task',
    planAssignee: 'Assignee',
    planStart: 'Start',
    planEnd: 'End',
    planHours: 'Hours',
    planStatus: 'Status',
    planResourceLoad: 'Workload by Assignee',
    planResourceTotal: 'Assigned Tasks',
    planResourceHours: 'Estimated Hours',
    planResourceCompleted: 'Completed',
    planResourceLoadPercent: 'Load',
    planConfidential: '🔒 CONFIDENTIAL: This document contains strategic schedule information and distribution must be controlled.',
    planUpdate: '📋 UPDATE: This plan should be reviewed weekly and updated upon significant scope or schedule changes.',
    planFollowUp: '✅ FOLLOW-UP: Actual progress must be compared against this baseline to identify early deviations.',
    planAutoGenerated: 'Automatically generated by PM Virtual Executive',
    planCancel: 'Cancel',
    planGenerate: '✅ Generate Plan',
    planClose: '✕',
    planNoTasks: '⚠️ No tasks found in this project. Please add tasks first.',
    planGenerated: '✅ Project Plan with Gantt generated successfully.',
    planCodeLabel: 'Code:'
  });

  var t = window.translations;

  // ========== FUNCIÓN PRINCIPAL ==========
  window.generarPlanProyecto = function() {
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      alert('⚠️ No project selected');
      return;
    }

    var tasks = proyecto.tasks || [];
    if (tasks.length === 0) {
      alert(t.planNoTasks);
      return;
    }

    // ========== CÁLCULOS Y MÉTRICAS ==========
    var total = tasks.length;
    var completadas = tasks.filter(function(t) { return t.status === 'completed'; }).length;
    var enProgreso = tasks.filter(function(t) { return t.status === 'inProgress'; }).length;
    var pendientes = tasks.filter(function(t) { return t.status === 'pending'; }).length;
    var atrasadas = tasks.filter(function(t) {
      return t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed';
    }).length;
    var horasEst = tasks.reduce(function(s, t) { return s + (Number(t.estimatedTime) || 0); }, 0);
    var horasReg = tasks.reduce(function(s, t) { return s + (Number(t.timeLogged) || 0); }, 0);
    var porcentajeAvance = total > 0 ? Math.round(completadas / total * 100) : 0;

    // EVM
    var PV = horasEst;
    var EV = horasEst * (completadas / Math.max(total, 1));
    var AC = horasReg;
    var SPI = PV > 0 ? EV / PV : 1;
    var CPI = AC > 0 ? EV / AC : 1;

    // Fechas
    var minDate = new Date(), maxDate = new Date();
    tasks.forEach(function(t) {
      if (t.startDate) { var d = new Date(t.startDate); if (d < minDate) minDate = d; if (d > maxDate) maxDate = d; }
      if (t.deadline) { var d = new Date(t.deadline); if (d < minDate) minDate = d; if (d > maxDate) maxDate = d; }
    });
    var start = new Date(minDate);
    start.setDate(start.getDate() - 2);
    var end = new Date(maxDate);
    end.setDate(end.getDate() + 2);
    var totalDays = Math.ceil((end - start) / (1000 * 3600 * 24));
    var duracionDias = Math.ceil((new Date(maxDate) - new Date(minDate)) / (1000 * 3600 * 24));

    // Hitos críticos
    var hitosCriticos = tasks.filter(function(t) {
      return t.priority === 'high' || (t.deadline && new Date(t.deadline) < new Date(Date.now() + 7 * 24 * 3600 * 1000) && t.status !== 'completed');
    });

    // ========== GENERAR CONTENIDO DEL DOCUMENTO ==========
    var fechaEmision = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    var codigoPlan = 'PP-' + Date.now().toString().slice(-6);

    // Generar filas del Gantt (simplificado para el ejemplo, pero funcional)
    var ganttRows = tasks.map(function(t) {
      var startOffset = 0, duration = 3;
      if (t.startDate) startOffset = Math.max(0, Math.floor((new Date(t.startDate) - start) / (1000 * 3600 * 24)));
      if (t.deadline && t.startDate) duration = Math.max(1, Math.floor((new Date(t.deadline) - new Date(t.startDate)) / (1000 * 3600 * 24)));
      var leftPercent = Math.min(95, (startOffset / totalDays) * 100);
      var widthPercent = Math.min(95 - leftPercent, (duration / totalDays) * 100);

      var isOverdue = t.status === 'overdue' || t.status === 'rezagado' ||
                      (t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed');

      var baseColor = '';
      if (t.status === 'completed') baseColor = '#10b981';
      else if (t.status === 'inProgress') baseColor = '#2dd4bf';
      else if (isOverdue) baseColor = '#ef4444';
      else baseColor = '#fde047';

      var borderColor = isOverdue ? '#dc2626' :
                        (t.status === 'completed' ? '#059669' :
                        (t.status === 'inProgress' ? '#14b8a6' : '#ca8a04'));

      var priorityBadge = t.priority === 'high' ? '<span style="background:#ef4444; color:white; padding:2px 8px; border-radius:10px; font-size:9px; font-weight:bold; margin-left:8px;">🔴 High</span>' :
                          (t.priority === 'medium' ? '<span style="background:#f59e0b; color:white; padding:2px 8px; border-radius:10px; font-size:9px; font-weight:bold; margin-left:8px;">🟡 Medium</span>' :
                          '<span style="background:#22c55e; color:white; padding:2px 8px; border-radius:10px; font-size:9px; font-weight:bold; margin-left:8px;">🟢 Low</span>');

      var statusBadge = t.status === 'completed' ? '✅' : (t.status === 'inProgress' ? '🔄' : '⏳');

      return '<div style="margin-bottom: 14px; padding: 8px 0; border-bottom: 1px dashed #e2e8f0;">' +
        '<div style="display: flex; align-items: center; gap: 12px;">' +
        '<div style="width: 200px; min-width: 200px;">' +
        '<div style="display: flex; align-items: center; gap: 6px;">' +
        '<span style="font-size: 13px; font-weight: 600; color: #1e293b;">' + t.name + '</span>' +
        priorityBadge +
        '</div>' +
        '<div style="font-size: 11px; color: #64748b; margin-top: 2px;">' + (t.assignee || 'Unassigned') + ' ' + statusBadge + '</div>' +
        '</div>' +
        '<div style="flex: 1; position: relative; height: 28px; background: #f1f5f9; border-radius: 6px; overflow: hidden;">' +
        '<div style="position: absolute; left: ' + leftPercent + '%; width: ' + widthPercent + '%; height: 100%; background: ' + baseColor + '; border: 2px solid ' + borderColor + '; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">' +
        duration + 'd ' + (isOverdue ? '⚠️' : '') +
        '</div>' +
        '</div>' +
        '<div style="width: 80px; text-align: right; font-size: 11px; color: #64748b;">' +
        (t.deadline ? new Date(t.deadline).toLocaleDateString('en-US', {day: 'numeric', month: 'short'}) : 'N/D') +
        '</div>' +
        '</div></div>';
    }).join('');

    // Cronograma detallado
    var cronograma = tasks.map(function(t) {
      var isDelayed = t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed';
      var isOverdue = t.status === 'overdue' || t.status === 'rezagado' || isDelayed;

      var statusColor = '';
      var statusText = '';
      if (t.status === 'completed') {
        statusColor = '#10b981';
        statusText = '✅ Completed';
      } else if (t.status === 'inProgress') {
        statusColor = '#2dd4bf';
        statusText = '🔄 In Progress';
      } else if (isOverdue) {
        statusColor = '#ef4444';
        statusText = '🔴 Overdue';
      } else {
        statusColor = '#fde047';
        statusText = '⏳ Pending';
      }

      return '<tr style="background:#f8fafc;">' +
        '<td style="padding:12px; border:1px solid #e2e8f0; font-weight:500; color:#1e293b;">' + t.name + '</td>' +
        '<td style="padding:12px; border:1px solid #e2e8f0; text-align:center; color:#64748b;">' + (t.assignee || '-') + '</td>' +
        '<td style="padding:12px; border:1px solid #e2e8f0; text-align:center; color:#64748b;">' + (t.startDate ? new Date(t.startDate).toLocaleDateString('en-US') : 'N/D') + '</td>' +
        '<td style="padding:12px; border:1px solid #e2e8f0; text-align:center; color:#64748b;">' + (t.deadline ? new Date(t.deadline).toLocaleDateString('en-US') : 'N/D') + '</td>' +
        '<td style="padding:12px; border:1px solid #e2e8f0; text-align:center; font-weight:bold; color:#1e40af;">' + (t.estimatedTime || 0) + 'h</td>' +
        '<td style="padding:12px; border:1px solid #e2e8f0; text-align:center;">' +
        '<span style="background:' + statusColor + '; color:' + (statusColor === '#fde047' ? '#1e293b' : 'white') + '; padding:4px 12px; border-radius:12px; font-size:11px; font-weight:bold;">' +
        statusText +
        '</span></td></tr>';
    }).join('');

    // Carga de recursos
    var recursos = {};
    tasks.forEach(function(t) {
      if (t.assignee) {
        if (!recursos[t.assignee]) recursos[t.assignee] = { total: 0, horas: 0, completadas: 0 };
        recursos[t.assignee].total++;
        recursos[t.assignee].horas += Number(t.estimatedTime) || 0;
        if (t.status === 'completed') recursos[t.assignee].completadas++;
      }
    });
    var recursosRows = Object.entries(recursos).map(function(entry) {
      var nombre = entry[0];
      var datos = entry[1];
      var carga = Math.round((datos.total / Math.max(1, Object.keys(recursos).length)) * 100);
      return '<tr style="background:#f8fafc;">' +
        '<td style="padding:12px; border:1px solid #e2e8f0; font-weight:500; color:#1e293b;">' + nombre + '</td>' +
        '<td style="padding:12px; border:1px solid #e2e8f0; text-align:center; color:#64748b;">' + datos.total + '</td>' +
        '<td style="padding:12px; border:1px solid #e2e8f0; text-align:center; font-weight:bold; color:#1e40af;">' + datos.horas + 'h</td>' +
        '<td style="padding:12px; border:1px solid #e2e8f0; text-align:center; color:#166534;">' + datos.completadas + '</td>' +
        '<td style="padding:12px; border:1px solid #e2e8f0; text-align:center;">' +
        '<div style="background:#e2e8f0; height:8px; border-radius:4px; display:inline-block; width:80px; overflow:hidden;">' +
        '<div style="background:linear-gradient(90deg,#10b981,#3b82f6); height:100%; width:' + Math.min(100, carga) + '%; border-radius:4px;"></div>' +
        '</div>' +
        '<span style="margin-left:8px; font-size:11px; color:#64748b;">' + carga + '%</span>' +
        '</td></tr>';
    }).join('');

    // Hitos críticos
    var hitosHTML = hitosCriticos.length > 0 ?
      '<div style="background:#fee2e2; padding:20px; border-radius:12px; margin-bottom:30px;">' +
      hitosCriticos.map(function(t) {
        return '<div style="display:flex; align-items:start; gap:12px; padding:12px 0; border-bottom:1px solid #fecaca; ' + (hitosCriticos.indexOf(t) === hitosCriticos.length-1 ? 'border-bottom:none' : '') + '">' +
          '<span style="background:#ef4444; color:white; width:24px; height:24px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:bold; flex-shrink:0;">!</span>' +
          '<div>' +
          '<div style="font-weight:600; color:#991b1b; margin-bottom:4px;">' + t.name + '</div>' +
          '<div style="font-size:13px; color:#64748b;">' +
          (t.deadline ? '📅 Due: ' + new Date(t.deadline).toLocaleDateString('en-US') : '') +
          (t.assignee ? ' • 👤 ' + t.assignee : '') +
          (t.estimatedTime ? ' • ⏱️ ' + t.estimatedTime + 'h' : '') +
          '</div></div></div>';
      }).join('') +
      '</div>' : '';

    // ========== CONTENIDO DEL DOCUMENTO ==========
    var contenido = `
    <div style="background:linear-gradient(135deg,#1e3a8a,#3b82f6,#60a5fa); color:white; padding:30px; border-radius:16px 16px 0 0; text-align:center;">
      <h1 style="margin:0; font-size:24px;">📅 ${t.planTitle}</h1>
      <p style="margin:8px 0 0 0; opacity:0.95; font-size:13px;">${t.planSubtitle}</p>
      <div style="margin-top:15px; display:flex; justify-content:center; gap:20px; flex-wrap:wrap;">
        <div style="background:rgba(255,255,255,0.15); padding:10px 18px; border-radius:8px;">
          <div style="font-size:18px; font-weight:bold;">${proyecto.name}</div>
          <div style="font-size:10px; opacity:0.9;">${t.planProject}</div>
        </div>
        <div style="background:rgba(255,255,255,0.15); padding:10px 18px; border-radius:8px;">
          <div style="font-size:18px; font-weight:bold;">${codigoPlan}</div>
          <div style="font-size:10px; opacity:0.9;">${t.planCode}</div>
        </div>
        <div style="background:rgba(255,255,255,0.15); padding:10px 18px; border-radius:8px;">
          <div style="font-size:18px; font-weight:bold;">${fechaEmision}</div>
          <div style="font-size:10px; opacity:0.9;">${t.planDate}</div>
        </div>
      </div>
    </div>

    <div style="background:#f8fafc; padding:25px 30px; border-bottom:3px solid #3b82f6;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <h3 style="margin:0; color:#1e3a8a; font-size:16px;">📊 ${t.planProgress}</h3>
        <span style="background:${porcentajeAvance>=80?'#10b981':(porcentajeAvance>=50?'#3b82f6':'#ef4444')}; color:white; padding:8px 20px; border-radius:20px; font-weight:bold; font-size:14px;">${porcentajeAvance}% Complete</span>
      </div>
      <div style="background:#e2e8f0; height:16px; border-radius:8px; overflow:hidden;">
        <div style="background:linear-gradient(90deg,#10b981,#3b82f6); height:100%; width:${porcentajeAvance}%; border-radius:8px;"></div>
      </div>
      <div style="display:grid; grid-template-columns:repeat(5,1fr); gap:15px; margin-top:20px; text-align:center;">
        <div style="background:#dbeafe; padding:15px; border-radius:10px;">
          <div style="font-size:24px; font-weight:bold; color:#1e40af;">${total}</div>
          <div style="font-size:11px; color:#64748b;">${t.planTotalTasks}</div>
        </div>
        <div style="background:#dcfce7; padding:15px; border-radius:10px;">
          <div style="font-size:24px; font-weight:bold; color:#166534;">${completadas}</div>
          <div style="font-size:11px; color:#64748b;">✅ ${t.planCompleted}</div>
        </div>
        <div style="background:#fef3c7; padding:15px; border-radius:10px;">
          <div style="font-size:24px; font-weight:bold; color:#92400e;">${enProgreso}</div>
          <div style="font-size:11px; color:#64748b;">🔄 ${t.planInProgress}</div>
        </div>
        <div style="background:#fee2e2; padding:15px; border-radius:10px;">
          <div style="font-size:24px; font-weight:bold; color:#991b1b;">${atrasadas}</div>
          <div style="font-size:11px; color:#64748b;">🔴 ${t.planOverdue}</div>
        </div>
        <div style="background:#f3f4f6; padding:15px; border-radius:10px;">
          <div style="font-size:24px; font-weight:bold; color:#374151;">${duracionDias}d</div>
          <div style="font-size:11px; color:#64748b;">${t.planDuration}</div>
        </div>
      </div>
    </div>

    <div style="padding:30px;">
      <h2 style="color:#1e3a8a; border-left:6px solid #3b82f6; padding-left:20px; margin:0 0 25px 0; font-size:20px;">📋 ${t.planExecutiveSummary}</h2>
      <p style="line-height:1.9; color:#374151; text-align:justify; font-size:14px; margin-bottom:35px;">${t.planSummaryText(proyecto.name)}</p>

      <h2 style="color:#1e3a8a; border-left:6px solid #3b82f6; padding-left:20px; margin:40px 0 25px 0; font-size:20px;">📅 ${t.planKeyDates}</h2>
      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-bottom:30px;">
        <div style="background:#ecfdf5; padding:20px; border-radius:12px; border-left:5px solid #10b981;">
          <h4 style="margin:0; color:#065f46; font-size:15px;">🚀 ${t.planStartDate}</h4>
          <div style="font-size:20px; font-weight:bold; color:#065f46;">${minDate.toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })}</div>
        </div>
        <div style="background:#fef3c7; padding:20px; border-radius:12px; border-left:5px solid #f59e0b;">
          <h4 style="margin:0; color:#92400e; font-size:15px;">🎯 ${t.planEndDate}</h4>
          <div style="font-size:20px; font-weight:bold; color:#92400e;">${maxDate.toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })}</div>
        </div>
        <div style="background:#dbeafe; padding:20px; border-radius:12px; border-left:5px solid #3b82f6;">
          <h4 style="margin:0; color:#1e40af; font-size:15px;">⏱️ ${t.planTotalDays}</h4>
          <div style="font-size:20px; font-weight:bold; color:#1e40af;">${duracionDias} days • ${horasEst}h estimated</div>
        </div>
      </div>

      <h2 style="color:#1e3a8a; border-left:6px solid #3b82f6; padding-left:20px; margin:40px 0 25px 0; font-size:20px;">📊 ${t.planGanttChart}</h2>
      <div style="background:#f8fafc; padding:20px; border-radius:12px; margin-bottom:30px; overflow-x:auto;">
        <div style="min-width: 800px;">
          <div style="display:flex; gap:20px; margin-bottom:20px; flex-wrap:wrap;">
            <div style="display:flex; align-items:center; gap:6px; font-size:12px; color:#64748b;">
              <span style="width:16px; height:16px; background:#10b981; border:2px solid #059669; border-radius:4px;"></span> ✅ ${t.planGanttCompleted}
            </div>
            <div style="display:flex; align-items:center; gap:6px; font-size:12px; color:#64748b;">
              <span style="width:16px; height:16px; background:#2dd4bf; border:2px solid #14b8a6; border-radius:4px;"></span> 🔄 ${t.planGanttInProgress}
            </div>
            <div style="display:flex; align-items:center; gap:6px; font-size:12px; color:#64748b;">
              <span style="width:16px; height:16px; background:#fde047; border:2px solid #ca8a04; border-radius:4px;"></span> ⏳ ${t.planGanttPending}
            </div>
            <div style="display:flex; align-items:center; gap:6px; font-size:12px; color:#64748b;">
              <span style="width:16px; height:16px; background:#ef4444; border:2px solid #dc2626; border-radius:4px;"></span> 🔴 ${t.planGanttOverdue}
            </div>
          </div>
          ${ganttRows}
        </div>
      </div>

      ${hitosHTML}

      <h2 style="color:#1e3a8a; border-left:6px solid #3b82f6; padding-left:20px; margin:40px 0 25px 0; font-size:20px;">📋 ${t.planDetailedSchedule}</h2>
      <table style="width:100%; border-collapse:collapse; margin-bottom:30px;">
        <thead>
          <tr style="background:#dbeafe;">
            <th style="padding:12px; text-align:left; border:1px solid #bfdbfe; color:#1e40af; font-weight:600; font-size:13px;">${t.planTask}</th>
            <th style="padding:12px; text-align:center; border:1px solid #bfdbfe; color:#1e40af; font-weight:600; font-size:13px;">${t.planAssignee}</th>
            <th style="padding:12px; text-align:center; border:1px solid #bfdbfe; color:#1e40af; font-weight:600; font-size:13px;">${t.planStart}</th>
            <th style="padding:12px; text-align:center; border:1px solid #bfdbfe; color:#1e40af; font-weight:600; font-size:13px;">${t.planEnd}</th>
            <th style="padding:12px; text-align:center; border:1px solid #bfdbfe; color:#1e40af; font-weight:600; font-size:13px;">${t.planHours}</th>
            <th style="padding:12px; text-align:center; border:1px solid #bfdbfe; color:#1e40af; font-weight:600; font-size:13px;">${t.planStatus}</th>
          </tr>
        </thead>
        <tbody>${cronograma}</tbody>
      </table>

      <h2 style="color:#1e3a8a; border-left:6px solid #3b82f6; padding-left:20px; margin:40px 0 25px 0; font-size:20px;">👥 ${t.planResourceLoad}</h2>
      <table style="width:100%; border-collapse:collapse; margin-bottom:30px;">
        <thead>
          <tr style="background:#dbeafe;">
            <th style="padding:12px; text-align:left; border:1px solid #bfdbfe; color:#1e40af; font-weight:600; font-size:13px;">${t.planAssignee}</th>
            <th style="padding:12px; text-align:center; border:1px solid #bfdbfe; color:#1e40af; font-weight:600; font-size:13px;">${t.planResourceTotal}</th>
            <th style="padding:12px; text-align:center; border:1px solid #bfdbfe; color:#1e40af; font-weight:600; font-size:13px;">${t.planResourceHours}</th>
            <th style="padding:12px; text-align:center; border:1px solid #bfdbfe; color:#1e40af; font-weight:600; font-size:13px;">${t.planResourceCompleted}</th>
            <th style="padding:12px; text-align:center; border:1px solid #bfdbfe; color:#1e40af; font-weight:600; font-size:13px;">${t.planResourceLoadPercent}</th>
          </tr>
        </thead>
        <tbody>${recursosRows}</tbody>
      </table>

      <div style="margin-top:50px; padding:25px; background:linear-gradient(135deg,#f8fafc,#e2e8f0); border-radius:12px; text-align:center; border-top:4px solid #3b82f6;">
        <p style="color:#64748b; font-size:12px; margin:0 0 15px 0; line-height:1.8;">
          <strong>${t.planConfidential}</strong><br>
          <strong>${t.planUpdate}</strong><br>
          <strong>${t.planFollowUp}</strong><br><br>
          <em>${t.planAutoGenerated} • ${t.planCodeLabel} ${codigoPlan} • ${fechaEmision}</em>
        </p>
      </div>
    </div>`;

    // ========== HTML COMPLETO ==========
    var htmlCompleto = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Project Plan - ${proyecto.name}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        body { font-family: 'Inter', 'Segoe UI', sans-serif !important; margin:0; padding:20px; background:#f1f5f9; }
        .document-container { max-width:1400px; margin:0 auto; background:white; border-radius:16px; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1); overflow:hidden; }
        @media print { body { background:white; padding:0; } .document-container { box-shadow:none; margin:0; max-width:100%; } button[onclick*="print"] { display:none !important; } }
        table { font-size: 13px; }
        th, td { padding: 8px; text-align: left; }
        .gantt-row { display: flex; align-items: center; }
      </style>
    </head>
    <body>
      <div class="document-container">${contenido}</div>
      <div style="position:fixed; bottom:20px; right:20px; z-index:1000;">
        <button onclick="window.print();" style="background:#3b82f6; border:none; padding:12px 24px; border-radius:40px; color:white; font-weight:bold; box-shadow:0 4px 12px rgba(0,0,0,0.2); cursor:pointer; display:flex; align-items:center; gap:8px;">🖨️ Print Plan</button>
      </div>
    </body>
    </html>`;

    // ========== ABRIR VENTANA ==========
    var ventana = window.open('', '_blank');
    if (!ventana) {
      alert('⚠️ Please allow popup windows to view the document.');
      return;
    }

    ventana.document.write(htmlCompleto);
    ventana.document.close();
    ventana.document.title = 'Project_Plan_' + proyecto.name.replace(/\s+/g, '_');

    // Guardar historial
    var planes = JSON.parse(localStorage.getItem('planesProyecto') || '[]');
    planes.push({ proyecto: proyecto.name, fecha: new Date().toISOString(), codigo: codigoPlan, totalTareas: total, avance: porcentajeAvance });
    localStorage.setItem('planesProyecto', JSON.stringify(planes));

    console.log('✅ Project Plan with Gantt generated successfully. Code:', codigoPlan);
  };

  console.log('✅ Project Plan (con Gantt) actualizado: ahora genera el documento sin alertas bloqueantes.');
})();


(function() {
  // Forzar traducciones
  if (typeof window.translations === 'undefined') window.translations = {};
  var t = window.translations;

  var claves = {
    wbsTitle: 'WORK BREAKDOWN STRUCTURE',
    wbsSubtitle: 'WORK BREAKDOWN STRUCTURE - EXECUTIVE DOCUMENT',
    wbsProject: 'Project',
    wbsCode: 'Code',
    wbsDate: 'Date',
    wbsTotalTasks: 'Total Tasks',
    wbsCompleted: 'Completed',
    wbsInProgress: 'In Progress',
    wbsPending: 'Pending',
    wbsOverdue: 'Overdue',
    wbsTotalHours: 'Total Hours',
    wbsPhase: 'Phase',
    wbsTasks: 'Tasks',
    wbsHours: 'Hours',
    wbsHigh: 'High',
    wbsMedium: 'Medium',
    wbsLow: 'Low',
    wbsCompletedStatus: 'Completed',
    wbsInProgressStatus: 'In Progress',
    wbsPendingStatus: 'Pending',
    wbsOverdueStatus: 'Overdue',
    wbsLegend: 'Legend',
    wbsStatusLegend: 'Task Status',
    wbsPriorityLegend: 'Priority Levels',
    wbsConfidential: 'CONFIDENTIAL - For executive use only',
    wbsMethodology: 'Methodology: Work Breakdown Structure (WBS) following PMI standards',
    wbsAutoGenerated: 'Automatically generated by PM Virtual Executive',
    wbsNoTasks: 'No tasks to display',
    wbsUnassigned: 'Unassigned',
    wbsNA: 'N/A'
  };

  Object.keys(claves).forEach(function(k) {
    if (!t[k]) t[k] = claves[k];
  });

  window.generarWBS = function() {
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) { alert('No project selected'); return; }

    var tasks = proyecto.tasks || [];
    if (tasks.length === 0) { alert(t.wbsNoTasks); return; }

    var total = tasks.length;
    var completadas = tasks.filter(function(x) { return x.status === 'completed'; }).length;
    var enProgreso = tasks.filter(function(x) { return x.status === 'inProgress'; }).length;
    var pendientes = tasks.filter(function(x) { return x.status === 'pending'; }).length;
    var atrasadas = tasks.filter(function(x) {
      return x.deadline && new Date(x.deadline) < new Date() && x.status !== 'completed';
    }).length;
    var horas = tasks.reduce(function(s, x) { return s + (Number(x.estimatedTime) || 0); }, 0);

    var fases = [...new Set(tasks.map(function(x) { return x.fase || 'General'; }).filter(Boolean))];
    if (!fases.length) fases = ['General'];

    var codigo = 'WBS-' + Date.now().toString().slice(-6);
    var fecha = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    function buildPhaseCards() {
      return fases.map(function(f) {
        var ft = tasks.filter(function(x) { return (x.fase || 'General') === f; });
        var comp = ft.filter(function(x) { return x.status === 'completed'; }).length;
        var hrs = ft.reduce(function(s, x) { return s + (Number(x.estimatedTime) || 0); }, 0);
        var pct = ft.length ? Math.round((comp / ft.length) * 100) : 0;
        return '<div style="background:#f8fafc;padding:20px;border-radius:12px;border-left:5px solid #3b82f6;">' +
          '<h3 style="margin:0 0 10px 0;color:#1e3a8a;font-size:16px;">' + f + '</h3>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">' +
            '<div style="background:white;padding:10px;border-radius:8px;text-align:center;"><div style="font-size:20px;font-weight:bold;color:#1e40af;">' + ft.length + '</div><div style="font-size:10px;color:#64748b;">' + t.wbsTasks + '</div></div>' +
            '<div style="background:white;padding:10px;border-radius:8px;text-align:center;"><div style="font-size:20px;font-weight:bold;color:#166534;">' + hrs + 'h</div><div style="font-size:10px;color:#64748b;">' + t.wbsHours + '</div></div>' +
          '</div>' +
          '<div style="margin-top:10px;background:#e2e8f0;height:6px;border-radius:3px;"><div style="width:' + pct + '%;background:linear-gradient(90deg,#10b981,#3b82f6);height:100%;border-radius:3px;"></div></div>' +
        '</div>';
      }).join('');
    }

    function buildTree() {
      return fases.map(function(f, idx) {
        var ft = tasks.filter(function(x) { return (x.fase || 'General') === f; });
        var children = ft.map(function(task) {
          var statusColor = task.status === 'completed' ? '#10b981' : (task.status === 'inProgress' ? '#3b82f6' : '#f59e0b');
          var priorityColor = task.priority === 'high' ? '#ef4444' : (task.priority === 'medium' ? '#f59e0b' : '#22c55e');
          var isOverdue = task.deadline && new Date(task.deadline) < new Date() && task.status !== 'completed';
          var displayColor = isOverdue ? '#ef4444' : statusColor;

          var pLabel = task.priority === 'high' ? t.wbsHigh : (task.priority === 'medium' ? t.wbsMedium : (task.priority === 'low' ? t.wbsLow : t.wbsMedium));
          var sLabel = task.status === 'completed' ? t.wbsCompletedStatus :
                       (task.status === 'inProgress' ? t.wbsInProgressStatus :
                       (isOverdue ? t.wbsOverdueStatus : t.wbsPendingStatus));
          var assignee = task.assignee || t.wbsUnassigned;
          var est = task.estimatedTime || 0;
          var date = task.deadline ? new Date(task.deadline).toLocaleDateString('en-US') : t.wbsNA;

          return '<div style="background:white;padding:12px 15px;border-radius:8px;margin-bottom:8px;border-left:4px solid ' + displayColor + ';box-shadow:0 2px 8px rgba(0,0,0,0.06);">' +
            '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">' +
              '<span style="font-weight:bold;color:#1e293b;">' + task.name + '</span>' +
              '<span style="background:' + priorityColor + ';color:white;padding:2px 10px;border-radius:12px;font-size:10px;font-weight:bold;">' + pLabel + '</span>' +
              '<span style="background:' + displayColor + ';color:white;padding:2px 10px;border-radius:12px;font-size:10px;">' + sLabel + '</span>' +
            '</div>' +
            '<div style="font-size:11px;color:#64748b;margin-top:5px;">👤 ' + assignee + ' · ⏱️ ' + est + 'h · 📅 ' + date + '</div>' +
          '</div>';
        }).join('');

        return '<div style="margin-bottom:20px;">' +
          '<div style="background:#475569;color:white;padding:12px 16px;border-radius:8px;margin-bottom:10px;">' +
            '<div style="font-weight:bold;">' + (idx+1) + '. ' + f + '</div>' +
            '<div style="font-size:10px;opacity:0.9;">' + ft.length + ' tasks</div>' +
          '</div>' +
          '<div style="margin-left:15px;border-left:2px solid #e2e8f0;padding-left:15px;">' + children + '</div>' +
        '</div>';
      }).join('');
    }

    var contenido = `
    <div style="background:linear-gradient(135deg,#1e3a8a,#3b82f6);color:white;padding:30px;border-radius:16px 16px 0 0;text-align:center;">
      <h1 style="margin:0;font-size:28px;">📊 ${t.wbsTitle}</h1>
      <p style="margin:8px 0 0 0;opacity:0.9;">${t.wbsSubtitle}</p>
      <div style="margin-top:15px;display:flex;justify-content:center;gap:20px;flex-wrap:wrap;">
        <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.wbsCode}: ${codigo}</div>
        <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.wbsDate}: ${fecha}</div>
        <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.wbsProject}: ${proyecto.name}</div>
      </div>
    </div>
    <div style="padding:30px;background:white;color:#1e293b;">
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:15px;margin-bottom:30px;">
        <div style="background:#f8fafc;padding:15px;border-radius:12px;text-align:center;border-top:4px solid #3b82f6;">
          <div style="font-size:28px;font-weight:bold;color:#1e40af;">${total}</div>
          <div style="font-size:11px;color:#64748b;">${t.wbsTotalTasks}</div>
        </div>
        <div style="background:#f8fafc;padding:15px;border-radius:12px;text-align:center;border-top:4px solid #10b981;">
          <div style="font-size:28px;font-weight:bold;color:#166534;">${completadas}</div>
          <div style="font-size:11px;color:#64748b;">✅ ${t.wbsCompleted}</div>
        </div>
        <div style="background:#f8fafc;padding:15px;border-radius:12px;text-align:center;border-top:4px solid #f59e0b;">
          <div style="font-size:28px;font-weight:bold;color:#92400e;">${enProgreso}</div>
          <div style="font-size:11px;color:#64748b;">🔄 ${t.wbsInProgress}</div>
        </div>
        <div style="background:#f8fafc;padding:15px;border-radius:12px;text-align:center;border-top:4px solid #ef4444;">
          <div style="font-size:28px;font-weight:bold;color:#991b1b;">${atrasadas}</div>
          <div style="font-size:11px;color:#64748b;">🔴 ${t.wbsOverdue}</div>
        </div>
        <div style="background:#f8fafc;padding:15px;border-radius:12px;text-align:center;border-top:4px solid #8b5cf6;">
          <div style="font-size:28px;font-weight:bold;color:#6d28d9;">${horas}h</div>
          <div style="font-size:11px;color:#64748b;">${t.wbsTotalHours}</div>
        </div>
      </div>

      <h2 style="color:#1e3a8a;border-left:6px solid #3b82f6;padding-left:20px;margin:30px 0 20px 0;">📊 ${t.wbsPhase} Metrics</h2>
      <div style="display:grid;grid-template-columns:repeat(${Math.min(fases.length, 3)},1fr);gap:20px;margin-bottom:30px;">
        ${buildPhaseCards()}
      </div>

      <h2 style="color:#1e3a8a;border-left:6px solid #3b82f6;padding-left:20px;margin:30px 0 20px 0;">🌳 Hierarchical Structure</h2>
      <div style="background:#f8fafc;padding:20px;border-radius:12px;margin-bottom:30px;">
        <div style="background:linear-gradient(135deg,#1e3a8a,#3b82f6);color:white;padding:15px 20px;border-radius:8px;margin-bottom:15px;">
          <div style="font-size:18px;font-weight:bold;">${proyecto.name}</div>
          <div style="font-size:11px;opacity:0.9;">Level 1 · Project · ${total} tasks</div>
        </div>
        <div style="margin-left:20px;border-left:2px dashed #cbd5e1;padding-left:20px;">
          ${buildTree()}
        </div>
      </div>

      <h2 style="color:#1e3a8a;border-left:6px solid #3b82f6;padding-left:20px;margin:30px 0 20px 0;">${t.wbsLegend}</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:30px;">
        <div style="background:#f8fafc;padding:20px;border-radius:12px;">
          <h4 style="margin:0 0 10px 0;">${t.wbsStatusLegend}</h4>
          <div><span style="display:inline-block;width:14px;height:14px;background:#10b981;border-radius:4px;"></span> ✅ ${t.wbsCompletedStatus}</div>
          <div><span style="display:inline-block;width:14px;height:14px;background:#3b82f6;border-radius:4px;"></span> 🔄 ${t.wbsInProgressStatus}</div>
          <div><span style="display:inline-block;width:14px;height:14px;background:#f59e0b;border-radius:4px;"></span> ⏳ ${t.wbsPendingStatus}</div>
          <div><span style="display:inline-block;width:14px;height:14px;background:#ef4444;border-radius:4px;"></span> 🔴 ${t.wbsOverdueStatus}</div>
        </div>
        <div style="background:#f8fafc;padding:20px;border-radius:12px;">
          <h4 style="margin:0 0 10px 0;">${t.wbsPriorityLegend}</h4>
          <div><span style="display:inline-block;width:14px;height:14px;background:#ef4444;border-radius:4px;"></span> 🔴 ${t.wbsHigh}</div>
          <div><span style="display:inline-block;width:14px;height:14px;background:#f59e0b;border-radius:4px;"></span> 🟡 ${t.wbsMedium}</div>
          <div><span style="display:inline-block;width:14px;height:14px;background:#22c55e;border-radius:4px;"></span> 🟢 ${t.wbsLow}</div>
        </div>
      </div>

      <div style="margin-top:40px;padding:20px;background:#f8fafc;border-radius:12px;text-align:center;">
        <p style="color:#64748b;font-size:12px;">
          <strong>${t.wbsConfidential}</strong><br>
          ${t.wbsMethodology}<br>
          ${t.wbsAutoGenerated} - ${fecha}
        </p>
      </div>
    </div>`;

    var html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>WBS - ${proyecto.name}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        body { font-family: 'Inter','Segoe UI',sans-serif; margin:0; padding:20px; background:#f1f5f9; }
        .document-container { max-width:1200px; margin:0 auto; background:white; border-radius:16px; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1); overflow:hidden; }
        @media print { body { background:white; padding:0; } .document-container { box-shadow:none; margin:0; max-width:100%; } button[onclick*="print"] { display:none !important; } }
      </style>
    </head>
    <body>
      <div class="document-container">${contenido}</div>
      <div style="position:fixed;bottom:20px;right:20px;z-index:1000;">
        <button onclick="window.print();" style="background:#3b82f6;border:none;padding:12px 24px;border-radius:40px;color:white;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.2);cursor:pointer;display:flex;align-items:center;gap:8px;">🖨️ Print WBS</button>
      </div>
    </body>
    </html>`;

    var win = window.open('', '_blank');
    if (!win) { alert('Please allow popup windows.'); return; }
    win.document.write(html);
    win.document.close();
    win.document.title = 'WBS_' + proyecto.name.replace(/\s+/g, '_');

    var hist = JSON.parse(localStorage.getItem('wbsGeneradas') || '[]');
    hist.push({ proyecto: proyecto.name, fecha: new Date().toISOString(), codigo: codigo, totalTareas: total });
    localStorage.setItem('wbsGeneradas', JSON.stringify(hist));

    console.log('✅ WBS generated. Code:', codigo);
  };

  console.log('✅ WBS cargado correctamente (sin errores de sintaxis).');
})();


// ============================================================
// RACI MATRIX - DEFINITIVO (SIN ERRORES, SIN ALERTAS)
// ============================================================
(function() {
  // Forzar traducciones
  if (typeof window.translations === 'undefined') window.translations = {};
  var t = window.translations;

  var clavesRaci = {
    raciTitle: '📊 RACI Matrix',
    raciSubtitle: 'RACI MATRIX - EXECUTIVE DOCUMENT',
    raciProject: 'Project',
    raciCode: 'Code',
    raciDate: 'Date',
    raciTask: 'Task',
    raciResponsible: 'Responsible',
    raciAccountable: 'Accountable',
    raciConsulted: 'Consulted',
    raciInformed: 'Informed',
    raciLegend: 'Legend',
    raciR: 'R = Responsible (executes)',
    raciA: 'A = Accountable (approves)',
    raciC: 'C = Consulted (opinion)',
    raciI: 'I = Informed (receives updates)',
    raciNoTasks: 'No tasks available',
    raciNoResources: 'No resources assigned to tasks',
    raciAddResources: 'Assign resources to tasks first',
    raciCancel: 'Cancel',
    raciGenerate: '✅ Generate RACI Matrix',
    raciClose: '✕',
    raciGenerated: '✅ RACI Matrix generated successfully.',
    raciConfidential: '🔒 CONFIDENTIAL - For executive use only',
    raciMethodology: 'Methodology: RACI Matrix following PMI standards for responsibility assignment',
    raciAutoGenerated: 'Automatically generated by PM Virtual Executive'
  };

  Object.keys(clavesRaci).forEach(function(k) {
    if (!t[k]) t[k] = clavesRaci[k];
  });

  // ========== FUNCIÓN PRINCIPAL ==========
  window.generarMatrizRACI = function() {
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      alert('⚠️ No project selected');
      return;
    }

    var tasks = proyecto.tasks || [];
    if (tasks.length === 0) {
      alert('⚠️ ' + t.raciNoTasks);
      return;
    }

    // Obtener recursos (assignees) de las tareas
    var roles = [...new Set(tasks.map(function(t) { return t.assignee; }).filter(Boolean))];
    if (roles.length === 0) {
      alert('⚠️ ' + t.raciNoResources + '. ' + t.raciAddResources);
      return;
    }

    // Cargar datos RACI desde localStorage
    var raciData = JSON.parse(localStorage.getItem('raciData') || '{}');
    var projectKey = proyecto.name;
    if (!raciData[projectKey]) raciData[projectKey] = {};

    // Inicializar valores por defecto
    tasks.forEach(function(task) {
      if (!raciData[projectKey][task.id]) raciData[projectKey][task.id] = {};
      roles.forEach(function(role) {
        if (!raciData[projectKey][task.id][role]) raciData[projectKey][task.id][role] = '';
      });
    });

    // ========== CONSTRUIR MODAL ==========
    var modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:100002; display:flex; align-items:center; justify-content:center;';

    var content = document.createElement('div');
    content.style.cssText = 'background:#1e293b; padding:25px; border-radius:16px; width:95%; max-width:900px; max-height:85vh; color:white; overflow:auto; border:1px solid #3b82f6;';

    var html = '<h3 style="margin:0 0 20px 0; color:#3b82f6; text-align:center;">' + t.raciTitle + ' - ' + proyecto.name + '</h3>';
    html += '<table border="1" cellpadding="10" style="width:100%; border-collapse:collapse; font-size:13px;">';
    html += '<thead><tr style="background:#334155;"><th style="padding:12px; text-align:left; border:1px solid #475569;">' + t.raciTask + '</th>';
    roles.forEach(function(r) {
      html += '<th style="padding:12px; text-align:center; border:1px solid #475569; background:#475569;">' + r + '</th>';
    });
    html += '</tr></thead><tbody>';

    tasks.forEach(function(task) {
      html += '<tr><td style="padding:12px; border:1px solid #475569; font-weight:bold;">' + (task.name || 'Sin nombre') + '</td>';
      roles.forEach(function(r) {
        var val = raciData[projectKey][task.id] ? raciData[projectKey][task.id][r] || '' : '';
        html += '<td style="padding:8px; border:1px solid #475569; text-align:center;">';
        html += '<select data-task="' + task.id + '" data-rol="' + r + '" class="raci-select" style="width:100%; padding:6px; border-radius:4px; border:1px solid #3b82f6; background:#0f172a; color:white;">';
        html += '<option value="" ' + (val === '' ? 'selected' : '') + '>-</option>';
        html += '<option value="R" ' + (val === 'R' ? 'selected' : '') + '>R</option>';
        html += '<option value="A" ' + (val === 'A' ? 'selected' : '') + '>A</option>';
        html += '<option value="C" ' + (val === 'C' ? 'selected' : '') + '>C</option>';
        html += '<option value="I" ' + (val === 'I' ? 'selected' : '') + '>I</option>';
        html += '</select></td>';
      });
      html += '</tr>';
    });

    html += '</tbody></table>';
    html += '<div style="margin-top:20px; text-align:center; color:#94a3b8; font-size:12px;">';
    html += '<strong>R</strong>=Responsible · <strong>A</strong>=Accountable · <strong>C</strong>=Consulted · <strong>I</strong>=Informed';
    html += '</div>';
    html += '<div style="display:flex; gap:15px; justify-content:center; margin-top:25px;">';
    html += '<button id="guardarRACI" style="background:#10b981; border:none; padding:12px 30px; border-radius:8px; color:white; cursor:pointer; font-weight:bold;">' + t.raciGenerate + '</button>';
    html += '<button id="cancelarRACI" style="background:#ef4444; border:none; padding:12px 30px; border-radius:8px; color:white; cursor:pointer; font-weight:bold;">' + t.raciCancel + '</button>';
    html += '</div>';

    content.innerHTML = html;
    modal.appendChild(content);
    document.body.appendChild(modal);

    // ========== EVENTO GUARDAR ==========
    document.getElementById('guardarRACI').onclick = function() {
      try {
        // Recoger datos del formulario
        document.querySelectorAll('.raci-select').forEach(function(sel) {
          var taskId = parseInt(sel.dataset.task);
          var rol = sel.dataset.rol;
          var valor = sel.value;

          if (!raciData[projectKey]) raciData[projectKey] = {};
          if (!raciData[projectKey][taskId]) raciData[projectKey][taskId] = {};
          raciData[projectKey][taskId][rol] = valor;
        });

        localStorage.setItem('raciData', JSON.stringify(raciData));
        modal.remove();

        // ========== GENERAR DOCUMENTO ==========
        var filas = tasks.map(function(task) {
          var taskRaci = raciData[projectKey][task.id] || {};
          return '<tr><td style="padding:12px; border:1px solid #e2e8f0;">' + task.name + '</td>' +
            roles.map(function(r) {
              var val = taskRaci[r] || '-';
              return '<td style="padding:12px; border:1px solid #e2e8f0; text-align:center; font-weight:bold;">' + val + '</td>';
            }).join('') +
            '</tr>';
        }).join('');

        var fecha = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        var codigo = 'RACI-' + Date.now().toString().slice(-6);

        var contenido = `
        <div style="background:linear-gradient(135deg,#1e3a8a,#3b82f6);color:white;padding:30px;border-radius:16px 16px 0 0;text-align:center;">
          <h1 style="margin:0;font-size:28px;">${t.raciTitle}</h1>
          <p style="margin:8px 0 0 0;opacity:0.9;">${t.raciSubtitle}</p>
          <div style="margin-top:15px;display:flex;justify-content:center;gap:20px;flex-wrap:wrap;">
            <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.raciCode}: ${codigo}</div>
            <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.raciDate}: ${fecha}</div>
            <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.raciProject}: ${proyecto.name}</div>
          </div>
        </div>
        <div style="padding:30px;background:white;color:#1e293b;">
          <h2 style="color:#1e3a8a;border-left:6px solid #3b82f6;padding-left:20px;">📋 ${t.raciTitle}</h2>
          <p style="line-height:1.8;color:#374151;">Total tasks: <strong>${tasks.length}</strong> · Total resources: <strong>${roles.length}</strong></p>
          <table style="width:100%;border-collapse:collapse;margin-top:20px;font-size:13px;">
            <thead>
              <tr style="background:#dbeafe;">
                <th style="padding:12px;border:1px solid #bfdbfe;text-align:left;">${t.raciTask}</th>
                ${roles.map(function(r) { return '<th style="padding:12px;border:1px solid #bfdbfe;text-align:center;">' + r + '</th>'; }).join('')}
              </tr>
            </thead>
            <tbody>${filas}</tbody>
          </table>
          <div style="margin-top:30px;padding:20px;background:#f8fafc;border-radius:12px;text-align:center;font-size:13px;color:#475569;">
            <strong>${t.raciLegend}</strong><br>
            ${t.raciR} · ${t.raciA} · ${t.raciC} · ${t.raciI}
          </div>
          <div style="margin-top:40px;padding:20px;background:#f8fafc;border-radius:12px;text-align:center;">
            <p style="color:#64748b;font-size:12px;">
              <strong>${t.raciConfidential}</strong><br>
              ${t.raciMethodology}<br>
              ${t.raciAutoGenerated} - ${fecha}
            </p>
          </div>
        </div>`;

        var htmlCompleto = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>RACI Matrix - ${proyecto.name}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
            body { font-family: 'Inter','Segoe UI',sans-serif; margin:0; padding:20px; background:#f1f5f9; }
            .document-container { max-width:1200px; margin:0 auto; background:white; border-radius:16px; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1); overflow:hidden; }
            @media print { body { background:white; padding:0; } .document-container { box-shadow:none; margin:0; max-width:100%; } button[onclick*="print"] { display:none !important; } }
          </style>
        </head>
        <body>
          <div class="document-container">${contenido}</div>
          <div style="position:fixed;bottom:20px;right:20px;z-index:1000;">
            <button onclick="window.print();" style="background:#3b82f6;border:none;padding:12px 24px;border-radius:40px;color:white;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.2);cursor:pointer;display:flex;align-items:center;gap:8px;">🖨️ Print RACI</button>
          </div>
        </body>
        </html>`;

        var win = window.open('', '_blank');
        if (!win) { alert('⚠️ Please allow popup windows to view the document.'); return; }
        win.document.write(htmlCompleto);
        win.document.close();
        win.document.title = 'RACI_' + proyecto.name.replace(/\s+/g, '_');

        console.log('✅ ' + t.raciGenerated + ' Code:', codigo);

      } catch (e) {
        console.error('Error saving RACI:', e);
        alert('Error: ' + e.message);
      }
    };

    document.getElementById('cancelarRACI').onclick = function() {
      modal.remove();
      console.log('❌ RACI Matrix cancelled');
    };
  };

  console.log('✅ RACI Matrix cargado correctamente.');
})();


// ============================================================
// RISK PLAN - DEFINITIVO (SIN ERRORES, SIN ALERTAS)
// ============================================================
(function() {
  // Forzar traducciones
  if (typeof window.translations === 'undefined') window.translations = {};
  var t = window.translations;

  var clavesRisk = {
    riskTitle: '⚠️ Risk Management Plan',
    riskSubtitle: 'RISK MANAGEMENT PLAN - EXECUTIVE DOCUMENT',
    riskProject: 'Project',
    riskCode: 'Code',
    riskDate: 'Date',
    riskTotalRisks: 'Total Risks',
    riskCritical: 'Critical',
    riskHigh: 'High',
    riskMedium: 'Medium',
    riskLow: 'Low',
    riskExtreme: 'Extreme',
    riskImpact: 'Impact',
    riskProbability: 'Probability',
    riskLevel: 'Level',
    riskCategory: 'Category',
    riskPhase: 'Phase',
    riskStrategy: 'Strategy',
    riskMitigation: 'Mitigation Plan',
    riskResponsible: 'Responsible',
    riskDeadline: 'Deadline',
    riskRegisterNew: '+ Register New Risk',
    riskDescription: 'Risk Description',
    riskSelectCategory: 'Category',
    riskSelectPhase: 'Project Phase',
    riskSelectImpact: 'Impact (1-5)',
    riskSelectProbability: 'Probability (1-5)',
    riskSelectStrategy: 'Response Strategy',
    riskPlaceholderDescription: 'e.g., Delay in key supplier delivery...',
    riskPlaceholderMitigation: 'Actions to reduce the risk...',
    riskPlaceholderResponsible: 'e.g., PM, Technical Team...',
    riskCancel: 'Cancel',
    riskGenerate: '✅ Generate Risk Plan',
    riskClose: '✕',
    riskNoRisks: 'No risks registered',
    riskAddFirst: 'Add the first risk using the form above.',
    riskSaved: '✅ Risk saved successfully',
    riskConfirmDelete: 'Delete this risk?',
    riskDeleted: '✅ Risk deleted',
    riskGenerated: '✅ Risk Plan generated successfully.',
    riskConfidential: '🔒 CONFIDENTIAL - For executive use only',
    riskMethodology: 'Methodology: Risk analysis based on impact and probability (1-5 scale) following PMI standards',
    riskAutoGenerated: 'Automatically generated by PM Virtual Executive',
    riskVeryLow: 'Very Low',
    riskLowLabel: 'Low',
    riskMediumLabel: 'Medium',
    riskHighLabel: 'High',
    riskVeryHigh: 'Very High',
    riskAvoid: 'Avoid',
    riskMitigate: 'Mitigate',
    riskTransfer: 'Transfer',
    riskAccept: 'Accept',
    riskExploit: 'Exploit',
    riskShare: 'Share',
    riskInitiation: 'Initiation',
    riskPlanning: 'Planning',
    riskExecution: 'Execution',
    riskMonitoring: 'Monitoring',
    riskClosure: 'Closure'
  };

  Object.keys(clavesRisk).forEach(function(k) {
    if (!t[k]) t[k] = clavesRisk[k];
  });

  // ========== FUNCIÓN PRINCIPAL ==========
  window.generarPlanRiesgos = function() {
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      alert('⚠️ No project selected');
      return;
    }

    // Cargar riesgos existentes
    var riesgosData = JSON.parse(localStorage.getItem('riesgosData') || '[]');
    var riesgos = riesgosData.filter(function(r) { return r.proyectoId === proyecto.name; });

    // ========== FUNCIONES AUXILIARES ==========
    function calcularNivel(impacto, probabilidad) {
      var nivel = impacto * probabilidad;
      if (nivel >= 20) return { nivel: t.riskExtreme, color: '#ef4444', prioridad: 1 };
      if (nivel >= 12) return { nivel: t.riskHigh, color: '#f97316', prioridad: 2 };
      if (nivel >= 6) return { nivel: t.riskMedium, color: '#eab308', prioridad: 3 };
      return { nivel: t.riskLow, color: '#22c55e', prioridad: 4 };
    }

    function renderLista() {
      var container = document.getElementById('listaRiesgos');
      if (!container) return;
      var riesgosProyecto = riesgosData.filter(function(r) { return r.proyectoId === proyecto.name; });
      if (riesgosProyecto.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#94a3b8;padding:20px;">' + t.riskNoRisks + '<br><span style="font-size:12px;">' + t.riskAddFirst + '</span></p>';
        return;
      }
      var html = '';
      riesgosProyecto.forEach(function(r, idx) {
        var info = calcularNivel(parseInt(r.impacto), parseInt(r.probabilidad));
        html += '<div style="background:rgba(0,0,0,0.2);padding:12px;border-radius:8px;margin-bottom:8px;border-left:4px solid ' + info.color + ';display:flex;justify-content:space-between;align-items:center;">';
        html += '<div><strong>' + r.descripcion + '</strong> <span style="font-size:11px;color:' + info.color + ';font-weight:bold;">' + info.nivel + '</span><br><span style="font-size:10px;color:#64748b;">' + r.categoria + ' · ' + r.estrategia + ' · ' + (r.responsable || 'Unassigned') + '</span></div>';
        html += '<button data-idx="' + idx + '" class="btn-eliminar-riesgo" style="background:#ef4444;border:none;padding:4px 10px;border-radius:4px;color:white;cursor:pointer;font-size:11px;">🗑️</button></div>';
      });
      container.innerHTML = html;
      container.querySelectorAll('.btn-eliminar-riesgo').forEach(function(btn) {
        btn.onclick = function() {
          var idx = parseInt(this.dataset.idx);
          var riesgosProyecto = riesgosData.filter(function(r) { return r.proyectoId === proyecto.name; });
          var r = riesgosProyecto[idx];
          if (confirm(t.riskConfirmDelete)) {
            var globalIdx = riesgosData.indexOf(r);
            if (globalIdx !== -1) {
              riesgosData.splice(globalIdx, 1);
              localStorage.setItem('riesgosData', JSON.stringify(riesgosData));
              renderLista();
              renderMatriz();
            }
          }
        };
      });
    }

    function renderMatriz() {
      var container = document.getElementById('matrizRiesgos');
      if (!container) return;
      var riesgosProyecto = riesgosData.filter(function(r) { return r.proyectoId === proyecto.name; });
      if (riesgosProyecto.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#94a3b8;padding:20px;">No risks to display in matrix</p>';
        return;
      }
      var counts = { extreme: 0, high: 0, medium: 0, low: 0 };
      riesgosProyecto.forEach(function(r) {
        var info = calcularNivel(parseInt(r.impacto), parseInt(r.probabilidad));
        if (info.nivel === t.riskExtreme) counts.extreme++;
        else if (info.nivel === t.riskHigh) counts.high++;
        else if (info.nivel === t.riskMedium) counts.medium++;
        else counts.low++;
      });
      container.innerHTML = '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;">' +
        '<div style="background:rgba(239,68,68,0.2);padding:15px;border-radius:8px;text-align:center;"><div style="font-size:24px;font-weight:bold;color:#ef4444;">' + counts.extreme + '</div><div style="font-size:11px;color:#94a3b8;">' + t.riskExtreme + '</div></div>' +
        '<div style="background:rgba(249,115,22,0.2);padding:15px;border-radius:8px;text-align:center;"><div style="font-size:24px;font-weight:bold;color:#f97316;">' + counts.high + '</div><div style="font-size:11px;color:#94a3b8;">' + t.riskHigh + '</div></div>' +
        '<div style="background:rgba(234,179,8,0.2);padding:15px;border-radius:8px;text-align:center;"><div style="font-size:24px;font-weight:bold;color:#eab308;">' + counts.medium + '</div><div style="font-size:11px;color:#94a3b8;">' + t.riskMedium + '</div></div>' +
        '<div style="background:rgba(34,197,94,0.2);padding:15px;border-radius:8px;text-align:center;"><div style="font-size:24px;font-weight:bold;color:#22c55e;">' + counts.low + '</div><div style="font-size:11px;color:#94a3b8;">' + t.riskLow + '</div></div>' +
      '</div>';
    }

    // ========== MODAL ==========
    var modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:100002; display:flex; align-items:center; justify-content:center;';

    var content = document.createElement('div');
    content.style.cssText = 'background:linear-gradient(135deg,#1e293b,#0f172a); padding:25px; border-radius:16px; width:700px; max-width:90vw; max-height:85vh; color:white; border:1px solid #3b82f6; overflow-y:auto; display:flex; flex-direction:column;';

    var categorias = ['Technical', 'Management', 'Organizational', 'External', 'Financial', 'Legal', 'Resources', 'Schedule', 'Quality'];
    var fases = [t.riskInitiation, t.riskPlanning, t.riskExecution, t.riskMonitoring, t.riskClosure];
    var estrategias = [t.riskAvoid, t.riskMitigate, t.riskTransfer, t.riskAccept, t.riskExploit, t.riskShare];

    content.innerHTML = `
      <h2 style="color:#ffffff; margin:0 0 10px 0; text-align:center; font-size:20px;">${t.riskTitle}</h2>
      <p style="margin:0 0 20px 0; text-align:center; color:#94a3b8; font-size:13px;">${t.riskProject}: <strong>${proyecto.name}</strong></p>

      <div style="background:rgba(0,0,0,0.3); padding:15px; border-radius:12px; margin-bottom:15px;">
        <h3 style="color:#ef4444; margin:0 0 10px 0; font-size:15px; border-bottom:1px solid #ef4444; padding-bottom:8px;">${t.riskRegisterNew}</h3>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div style="grid-column: span 2;">
            <input type="text" id="riesgoDescripcion" placeholder="${t.riskPlaceholderDescription}" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px;">
          </div>
          <div>
            <select id="riesgoCategoria" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px;">
              ${categorias.map(function(c) { return '<option value="' + c + '">' + c + '</option>'; }).join('')}
            </select>
          </div>
          <div>
            <select id="riesgoFase" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px;">
              ${fases.map(function(f) { return '<option value="' + f + '">' + f + '</option>'; }).join('')}
            </select>
          </div>
          <div>
            <select id="riesgoImpacto" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px;">
              <option value="1">1 - ${t.riskVeryLow}</option><option value="2">2 - ${t.riskLowLabel}</option><option value="3" selected>3 - ${t.riskMediumLabel}</option><option value="4">4 - ${t.riskHighLabel}</option><option value="5">5 - ${t.riskVeryHigh}</option>
            </select>
          </div>
          <div>
            <select id="riesgoProbabilidad" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px;">
              <option value="1">1 - ${t.riskVeryLow}</option><option value="2">2 - ${t.riskLowLabel}</option><option value="3" selected>3 - ${t.riskMediumLabel}</option><option value="4">4 - ${t.riskHighLabel}</option><option value="5">5 - ${t.riskVeryHigh}</option>
            </select>
          </div>
          <div style="grid-column: span 2;">
            <select id="riesgoEstrategia" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px;">
              ${estrategias.map(function(e) { return '<option value="' + e + '">' + e + '</option>'; }).join('')}
            </select>
          </div>
          <div style="grid-column: span 2;">
            <textarea id="riesgoMitigacion" rows="2" placeholder="${t.riskPlaceholderMitigation}" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px; resize:vertical;"></textarea>
          </div>
          <div>
            <input type="text" id="riesgoResponsable" placeholder="${t.riskPlaceholderResponsible}" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px;">
          </div>
          <div>
            <input type="date" id="riesgoFechaLimite" style="width:100%; padding:8px; border-radius:6px; border:1px solid #3b82f6; background:#0f172a; color:white; font-size:13px;">
          </div>
        </div>
        <button id="agregarRiesgo" style="margin-top:10px; background:#ef4444; border:none; padding:8px 20px; border-radius:8px; color:white; cursor:pointer; font-weight:bold; font-size:13px;">💾 ${t.riskRegisterNew}</button>
      </div>

      <div id="matrizRiesgos" style="background:rgba(0,0,0,0.3); padding:15px; border-radius:12px; margin-bottom:15px;"></div>

      <div id="listaRiesgos" style="flex:1; overflow-y:auto; margin-bottom:15px; max-height:200px;"></div>

      <div style="display:flex; gap:10px; justify-content:center; padding-top:15px; border-top:1px solid #3b82f6; flex-shrink:0;">
        <button id="generarPlanRiesgosBtn" style="background:#3b82f6; border:none; padding:10px 25px; border-radius:8px; color:white; cursor:pointer; font-size:14px; font-weight:bold;">${t.riskGenerate}</button>
        <button id="cancelarRiesgosBtn" style="background:#ef4444; border:none; padding:10px 25px; border-radius:8px; color:white; cursor:pointer; font-size:14px; font-weight:bold;">${t.riskCancel}</button>
      </div>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // ========== AGREGAR RIESGO ==========
    document.getElementById('agregarRiesgo').onclick = function() {
      var descripcion = document.getElementById('riesgoDescripcion').value.trim();
      if (!descripcion) { alert('⚠️ Risk description is required'); return; }
      var nuevoRiesgo = {
        id: Date.now(),
        proyectoId: proyecto.name,
        descripcion: descripcion,
        categoria: document.getElementById('riesgoCategoria').value,
        fase: document.getElementById('riesgoFase').value,
        impacto: document.getElementById('riesgoImpacto').value,
        probabilidad: document.getElementById('riesgoProbabilidad').value,
        estrategia: document.getElementById('riesgoEstrategia').value,
        mitigacion: document.getElementById('riesgoMitigacion').value.trim(),
        responsable: document.getElementById('riesgoResponsable').value.trim(),
        fechaLimite: document.getElementById('riesgoFechaLimite').value,
        fecha: new Date().toISOString()
      };
      riesgosData.push(nuevoRiesgo);
      localStorage.setItem('riesgosData', JSON.stringify(riesgosData));
      document.getElementById('riesgoDescripcion').value = '';
      document.getElementById('riesgoMitigacion').value = '';
      document.getElementById('riesgoResponsable').value = '';
      document.getElementById('riesgoFechaLimite').value = '';
      renderLista();
      renderMatriz();
      alert(t.riskSaved);
    };

    // ========== GENERAR DOCUMENTO ==========
    document.getElementById('generarPlanRiesgosBtn').onclick = function() {
      var riesgosProyecto = riesgosData.filter(function(r) { return r.proyectoId === proyecto.name; });
      if (riesgosProyecto.length === 0) {
        alert('⚠️ ' + t.riskNoRisks);
        return;
      }

      var fecha = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      var codigo = 'PR-' + Date.now().toString().slice(-6);

      // Ordenar por nivel de riesgo
      riesgosProyecto.sort(function(a, b) {
        var na = calcularNivel(parseInt(a.impacto), parseInt(a.probabilidad));
        var nb = calcularNivel(parseInt(b.impacto), parseInt(b.probabilidad));
        return na.prioridad - nb.prioridad;
      });

      var filas = riesgosProyecto.map(function(r) {
        var info = calcularNivel(parseInt(r.impacto), parseInt(r.probabilidad));
        return '<tr>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;">' + r.descripcion + '</td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;">' + r.categoria + '</td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;">' + r.impacto + '/5</td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;">' + r.probabilidad + '/5</td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;background:' + info.color + ';color:white;font-weight:bold;">' + info.nivel + '</td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;">' + r.estrategia + '</td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;">' + (r.mitigacion || '-') + '</td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;">' + (r.responsable || '-') + '</td>' +
        '</tr>';
      }).join('');

      var contenido = `
      <div style="background:linear-gradient(135deg,#991b1b,#ef4444);color:white;padding:30px;border-radius:16px 16px 0 0;text-align:center;">
        <h1 style="margin:0;font-size:28px;">⚠️ ${t.riskTitle}</h1>
        <p style="margin:8px 0 0 0;opacity:0.9;">${t.riskSubtitle}</p>
        <div style="margin-top:15px;display:flex;justify-content:center;gap:20px;flex-wrap:wrap;">
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.riskCode}: ${codigo}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.riskDate}: ${fecha}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.riskProject}: ${proyecto.name}</div>
        </div>
      </div>
      <div style="padding:30px;background:white;color:#1e293b;">
        <h2 style="color:#1e3a8a;border-left:6px solid #ef4444;padding-left:20px;">📋 Executive Summary</h2>
        <p style="line-height:1.8;color:#374151;">Total risks identified: <strong>${riesgosProyecto.length}</strong></p>

        <h2 style="color:#1e3a8a;border-left:6px solid #ef4444;padding-left:20px;margin-top:30px;">📊 Risk Matrix</h2>
        <table style="width:100%;border-collapse:collapse;margin-top:20px;font-size:13px;">
          <thead>
            <tr style="background:#fee2e2;">
              <th style="padding:10px;border:1px solid #fecaca;text-align:left;">${t.riskDescription}</th>
              <th style="padding:10px;border:1px solid #fecaca;text-align:center;">${t.riskCategory}</th>
              <th style="padding:10px;border:1px solid #fecaca;text-align:center;">${t.riskImpact}</th>
              <th style="padding:10px;border:1px solid #fecaca;text-align:center;">${t.riskProbability}</th>
              <th style="padding:10px;border:1px solid #fecaca;text-align:center;">${t.riskLevel}</th>
              <th style="padding:10px;border:1px solid #fecaca;text-align:center;">${t.riskStrategy}</th>
              <th style="padding:10px;border:1px solid #fecaca;text-align:left;">${t.riskMitigation}</th>
              <th style="padding:10px;border:1px solid #fecaca;text-align:center;">${t.riskResponsible}</th>
            </tr>
          </thead>
          <tbody>${filas}</tbody>
        </table>

        <div style="margin-top:30px;display:grid;grid-template-columns:repeat(4,1fr);gap:15px;">
          <div style="background:#fee2e2;padding:15px;border-radius:10px;text-align:center;border-left:4px solid #ef4444;">
            <div style="font-size:28px;font-weight:bold;color:#991b1b;">${riesgosProyecto.filter(function(r){var info=calcularNivel(parseInt(r.impacto),parseInt(r.probabilidad));return info.nivel===t.riskExtreme;}).length}</div>
            <div style="font-size:11px;color:#64748b;">🔴 ${t.riskExtreme}</div>
          </div>
          <div style="background:#ffedd5;padding:15px;border-radius:10px;text-align:center;border-left:4px solid #f97316;">
            <div style="font-size:28px;font-weight:bold;color:#9a3412;">${riesgosProyecto.filter(function(r){var info=calcularNivel(parseInt(r.impacto),parseInt(r.probabilidad));return info.nivel===t.riskHigh;}).length}</div>
            <div style="font-size:11px;color:#64748b;">🟠 ${t.riskHigh}</div>
          </div>
          <div style="background:#fef3c7;padding:15px;border-radius:10px;text-align:center;border-left:4px solid #eab308;">
            <div style="font-size:28px;font-weight:bold;color:#92400e;">${riesgosProyecto.filter(function(r){var info=calcularNivel(parseInt(r.impacto),parseInt(r.probabilidad));return info.nivel===t.riskMedium;}).length}</div>
            <div style="font-size:11px;color:#64748b;">🟡 ${t.riskMedium}</div>
          </div>
          <div style="background:#dcfce7;padding:15px;border-radius:10px;text-align:center;border-left:4px solid #22c55e;">
            <div style="font-size:28px;font-weight:bold;color:#166534;">${riesgosProyecto.filter(function(r){var info=calcularNivel(parseInt(r.impacto),parseInt(r.probabilidad));return info.nivel===t.riskLow;}).length}</div>
            <div style="font-size:11px;color:#64748b;">🟢 ${t.riskLow}</div>
          </div>
        </div>

        <div style="margin-top:40px;padding:20px;background:#f8fafc;border-radius:12px;text-align:center;">
          <p style="color:#64748b;font-size:12px;">
            <strong>${t.riskConfidential}</strong><br>
            ${t.riskMethodology}<br>
            ${t.riskAutoGenerated} - ${fecha}
          </p>
        </div>
      </div>`;

      var htmlCompleto = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Risk Plan - ${proyecto.name}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body { font-family: 'Inter','Segoe UI',sans-serif; margin:0; padding:20px; background:#f1f5f9; }
          .document-container { max-width:1200px; margin:0 auto; background:white; border-radius:16px; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1); overflow:hidden; }
          @media print { body { background:white; padding:0; } .document-container { box-shadow:none; margin:0; max-width:100%; } button[onclick*="print"] { display:none !important; } }
        </style>
      </head>
      <body>
        <div class="document-container">${contenido}</div>
        <div style="position:fixed;bottom:20px;right:20px;z-index:1000;">
          <button onclick="window.print();" style="background:#3b82f6;border:none;padding:12px 24px;border-radius:40px;color:white;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.2);cursor:pointer;display:flex;align-items:center;gap:8px;">🖨️ Print Risk Plan</button>
        </div>
      </body>
      </html>`;

      var win = window.open('', '_blank');
      if (!win) { alert('⚠️ Please allow popup windows to view the document.'); return; }
      win.document.write(htmlCompleto);
      win.document.close();
      win.document.title = 'Risk_Plan_' + proyecto.name.replace(/\s+/g, '_');

      var planes = JSON.parse(localStorage.getItem('planesRiesgos') || '[]');
      planes.push({ proyecto: proyecto.name, fecha: new Date().toISOString(), codigo: codigo, totalRiesgos: riesgosProyecto.length });
      localStorage.setItem('planesRiesgos', JSON.stringify(planes));

      console.log('✅ ' + t.riskGenerated + ' Code:', codigo);
      modal.remove();
    };

    document.getElementById('cancelarRiesgosBtn').onclick = function() { modal.remove(); };

    renderLista();
    renderMatriz();
  };

  console.log('✅ Risk Plan cargado correctamente.');
})();


// ============================================================
// QUALITY PLAN - DEFINITIVO (SIN ERRORES, SIN ALERTAS)
// ============================================================
(function() {
  if (typeof window.translations === 'undefined') window.translations = {};
  var t = window.translations;

  var clavesQuality = {
    qualityTitle: '✅ Quality Management Plan',
    qualitySubtitle: 'QUALITY MANAGEMENT PLAN - EXECUTIVE DOCUMENT',
    qualityProject: 'Project',
    qualityCode: 'Code',
    qualityDate: 'Date',
    qualityTotalTasks: 'Total Tasks',
    qualityCompleted: 'Completed',
    qualityInProgress: 'In Progress',
    qualityPending: 'Pending',
    qualityOverdue: 'Overdue',
    qualityDefects: 'Defects',
    qualityEfficiency: 'Efficiency',
    qualitySatisfaction: 'Satisfaction',
    qualityScore: 'Quality Score',
    qualityLevel: 'Quality Level',
    qualityExcellent: 'Excellent',
    qualityGood: 'Good',
    qualityAcceptable: 'Acceptable',
    qualityNeedsImprovement: 'Needs Improvement',
    qualityKPI: 'Key Quality Indicators',
    qualityMetric: 'Metric',
    qualityCurrentValue: 'Current Value',
    qualityTarget: 'Target',
    qualityThreshold: 'Threshold',
    qualityStatus: 'Status',
    qualityCompliance: 'Compliance',
    qualityAtRisk: 'At Risk',
    qualityNonCompliant: 'Non-Compliant',
    qualityStandards: 'Quality Standards Applied',
    qualityStandardISO: 'ISO 9001:2015',
    qualityStandardPMI: 'PMI - PMBOK Guide',
    qualityStandardReviews: 'Weekly Reviews',
    qualityStandardChecklists: 'Verification Checklists',
    qualityControls: 'Quality Control Processes',
    qualityProcessReview: 'Deliverable Review',
    qualityProcessMetrics: 'Performance Metrics',
    qualityProcessCorrective: 'Corrective Actions',
    qualityProcessAudit: 'Quality Audits',
    qualityContinuousImprovement: 'Continuous Improvement Plan',
    qualityImprovementArea: 'Improvement Area',
    qualityActionProposed: 'Action Proposed',
    qualityPriority: 'Priority',
    qualityDeadline: 'Deadline',
    qualityHigh: 'High',
    qualityMedium: 'Medium',
    qualityLow: 'Low',
    qualityConfidential: '🔒 CONFIDENTIAL - For executive use only',
    qualityMethodology: 'Methodology: Quality Management following ISO 9001 and PMI standards',
    qualityAutoGenerated: 'Automatically generated by PM Virtual Executive',
    qualityGenerated: '✅ Quality Plan generated successfully.',
    qualityNoTasks: 'No tasks to display',
    qualityNoTasksMessage: 'Add tasks to the project to generate the Quality Plan.'
  };

  Object.keys(clavesQuality).forEach(function(k) {
    if (!t[k]) t[k] = clavesQuality[k];
  });

  window.generarPlanCalidad = function() {
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      alert('⚠️ No project selected');
      return;
    }

    var tasks = proyecto.tasks || [];
    if (tasks.length === 0) {
      alert('⚠️ ' + t.qualityNoTasks);
      return;
    }

    // ========== CÁLCULOS DE CALIDAD ==========
    var total = tasks.length;
    var completadas = tasks.filter(function(t) { return t.status === 'completed'; }).length;
    var enProgreso = tasks.filter(function(t) { return t.status === 'inProgress'; }).length;
    var pendientes = tasks.filter(function(t) { return t.status === 'pending'; }).length;
    var atrasadas = tasks.filter(function(t) {
      return t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed';
    }).length;

    var horasEst = tasks.reduce(function(s, t) { return s + (Number(t.estimatedTime) || 0); }, 0);
    var horasReg = tasks.reduce(function(s, t) { return s + (Number(t.timeLogged) || 0); }, 0);
    var eficiencia = horasEst > 0 ? Math.round((horasReg / horasEst) * 100) : 100;
    var defectos = atrasadas;
    var satisfaccion = total > 0 ? Math.round((completadas / total) * 100) : 0;

    var scoreCalidad = Math.round(
      (satisfaccion * 0.4) +
      ((100 - Math.min(defectos * 10, 100)) * 0.3) +
      ((eficiencia > 100 ? 100 : eficiencia) * 0.3)
    );

    var nivelCalidad = scoreCalidad >= 90 ? t.qualityExcellent :
                       scoreCalidad >= 75 ? t.qualityGood :
                       scoreCalidad >= 60 ? t.qualityAcceptable : t.qualityNeedsImprovement;
    var colorNivel = scoreCalidad >= 90 ? '#10b981' :
                     scoreCalidad >= 75 ? '#3b82f6' :
                     scoreCalidad >= 60 ? '#f59e0b' : '#ef4444';

    var codigo = 'QLT-' + Date.now().toString().slice(-6);
    var fecha = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // ========== CONTENIDO DEL DOCUMENTO ==========
    var contenido = `
    <div style="background:linear-gradient(135deg,#059669,#10b981);color:white;padding:30px;border-radius:16px 16px 0 0;text-align:center;">
      <h1 style="margin:0;font-size:28px;">${t.qualityTitle}</h1>
      <p style="margin:8px 0 0 0;opacity:0.9;">${t.qualitySubtitle}</p>
      <div style="margin-top:15px;display:flex;justify-content:center;gap:20px;flex-wrap:wrap;">
        <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.qualityCode}: ${codigo}</div>
        <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.qualityDate}: ${fecha}</div>
        <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.qualityProject}: ${proyecto.name}</div>
      </div>
    </div>
    <div style="padding:30px;background:white;color:#1e293b;">
      <!-- Score General -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;background:#f8fafc;padding:20px;border-radius:12px;">
        <div>
          <h2 style="margin:0;color:#1e3a8a;font-size:18px;">📊 ${t.qualityScore}</h2>
          <p style="margin:5px 0 0 0;color:#64748b;font-size:13px;">${t.qualityLevel}: <strong style="color:${colorNivel};">${nivelCalidad}</strong></p>
        </div>
        <div style="text-align:center;">
          <div style="font-size:48px;font-weight:bold;color:${colorNivel};">${scoreCalidad}%</div>
          <div style="background:#e2e8f0;height:8px;width:150px;border-radius:4px;margin-top:5px;">
            <div style="width:${scoreCalidad}%;height:100%;background:${colorNivel};border-radius:4px;"></div>
          </div>
        </div>
      </div>

      <!-- KPIs -->
      <h2 style="color:#1e3a8a;border-left:6px solid #10b981;padding-left:20px;margin:30px 0 20px 0;">📋 ${t.qualityKPI}</h2>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin-bottom:30px;">
        <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #3b82f6;">
          <div style="font-size:28px;font-weight:bold;color:#1e40af;">${total}</div>
          <div style="font-size:11px;color:#64748b;">${t.qualityTotalTasks}</div>
        </div>
        <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #10b981;">
          <div style="font-size:28px;font-weight:bold;color:#166534;">${completadas}</div>
          <div style="font-size:11px;color:#64748b;">✅ ${t.qualityCompleted}</div>
        </div>
        <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #ef4444;">
          <div style="font-size:28px;font-weight:bold;color:#991b1b;">${defectos}</div>
          <div style="font-size:11px;color:#64748b;">🐛 ${t.qualityDefects}</div>
        </div>
        <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #8b5cf6;">
          <div style="font-size:28px;font-weight:bold;color:#6d28d9;">${eficiencia}%</div>
          <div style="font-size:11px;color:#64748b;">⚡ ${t.qualityEfficiency}</div>
        </div>
      </div>

      <!-- Métricas detalladas -->
      <table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:13px;">
        <thead>
          <tr style="background:#ecfdf5;">
            <th style="padding:12px;border:1px solid #a7f3d0;text-align:left;">${t.qualityMetric}</th>
            <th style="padding:12px;border:1px solid #a7f3d0;text-align:center;">${t.qualityCurrentValue}</th>
            <th style="padding:12px;border:1px solid #a7f3d0;text-align:center;">${t.qualityTarget}</th>
            <th style="padding:12px;border:1px solid #a7f3d0;text-align:center;">${t.qualityThreshold}</th>
            <th style="padding:12px;border:1px solid #a7f3d0;text-align:center;">${t.qualityStatus}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding:12px;border:1px solid #e2e8f0;">📈 ${t.qualityCompleted} Rate</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;font-weight:bold;">${Math.round(completadas/total*100)}%</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">>80%</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">70%</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">
                <span style="background:${(completadas/total*100) >= 80 ? '#10b981' : (completadas/total*100) >= 70 ? '#f59e0b' : '#ef4444'}20;color:${(completadas/total*100) >= 80 ? '#10b981' : (completadas/total*100) >= 70 ? '#f59e0b' : '#ef4444'};padding:4px 12px;border-radius:12px;font-size:11px;font-weight:bold;">
                  ${(completadas/total*100) >= 80 ? t.qualityCompliance : (completadas/total*100) >= 70 ? t.qualityAtRisk : t.qualityNonCompliant}
                </span>
              </td>
          </tr>
          <tr><td style="padding:12px;border:1px solid #e2e8f0;">⚠️ ${t.qualityDefects}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;font-weight:bold;">${defectos}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;"><5</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">10</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">
                <span style="background:${defectos < 5 ? '#10b981' : defectos < 10 ? '#f59e0b' : '#ef4444'}20;color:${defectos < 5 ? '#10b981' : defectos < 10 ? '#f59e0b' : '#ef4444'};padding:4px 12px;border-radius:12px;font-size:11px;font-weight:bold;">
                  ${defectos < 5 ? t.qualityCompliance : defectos < 10 ? t.qualityAtRisk : t.qualityNonCompliant}
                </span>
              </td>
          </tr>
          <tr><td style="padding:12px;border:1px solid #e2e8f0;">😊 ${t.qualitySatisfaction}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;font-weight:bold;">${satisfaccion}%</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">>85%</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">75%</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">
                <span style="background:${satisfaccion >= 85 ? '#10b981' : satisfaccion >= 75 ? '#f59e0b' : '#ef4444'}20;color:${satisfaccion >= 85 ? '#10b981' : satisfaccion >= 75 ? '#f59e0b' : '#ef4444'};padding:4px 12px;border-radius:12px;font-size:11px;font-weight:bold;">
                  ${satisfaccion >= 85 ? t.qualityCompliance : satisfaccion >= 75 ? t.qualityAtRisk : t.qualityNonCompliant}
                </span>
              </td>
          </tr>
          <tr><td style="padding:12px;border:1px solid #e2e8f0;">⚡ ${t.qualityEfficiency}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;font-weight:bold;">${eficiencia}%</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">>90%</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">80%</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">
                <span style="background:${eficiencia >= 90 ? '#10b981' : eficiencia >= 80 ? '#f59e0b' : '#ef4444'}20;color:${eficiencia >= 90 ? '#10b981' : eficiencia >= 80 ? '#f59e0b' : '#ef4444'};padding:4px 12px;border-radius:12px;font-size:11px;font-weight:bold;">
                  ${eficiencia >= 90 ? t.qualityCompliance : eficiencia >= 80 ? t.qualityAtRisk : t.qualityNonCompliant}
                </span>
              </td>
          </tr>
        </tbody>
      </table>

      <!-- Estándares -->
      <h2 style="color:#1e3a8a;border-left:6px solid #10b981;padding-left:20px;margin:30px 0 20px 0;">📐 ${t.qualityStandards}</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:30px;">
        <div style="background:#ecfdf5;padding:20px;border-radius:12px;border-left:5px solid #10b981;">
          <h4 style="margin:0 0 10px 0;color:#065f46;">🏆 ${t.qualityStandardISO}</h4>
          <p style="margin:0;color:#374151;font-size:13px;line-height:1.6;">Quality Management System ensuring consistency and continuous improvement.</p>
        </div>
        <div style="background:#ecfdf5;padding:20px;border-radius:12px;border-left:5px solid #10b981;">
          <h4 style="margin:0 0 10px 0;color:#065f46;">📚 ${t.qualityStandardPMI}</h4>
          <p style="margin:0;color:#374151;font-size:13px;line-height:1.6;">Standard project management practices for quality deliverables.</p>
        </div>
        <div style="background:#ecfdf5;padding:20px;border-radius:12px;border-left:5px solid #10b981;">
          <h4 style="margin:0 0 10px 0;color:#065f46;">🔄 ${t.qualityStandardReviews}</h4>
          <p style="margin:0;color:#374151;font-size:13px;line-height:1.6;">Periodic progress evaluations for early deviation identification.</p>
        </div>
        <div style="background:#ecfdf5;padding:20px;border-radius:12px;border-left:5px solid #10b981;">
          <h4 style="margin:0 0 10px 0;color:#065f46;">✅ ${t.qualityStandardChecklists}</h4>
          <p style="margin:0;color:#374151;font-size:13px;line-height:1.6;">Verification checklists for each deliverable ensuring acceptance criteria.</p>
        </div>
      </div>

      <!-- Control de Calidad -->
      <h2 style="color:#1e3a8a;border-left:6px solid #10b981;padding-left:20px;margin:30px 0 20px 0;">🔍 ${t.qualityControls}</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:30px;font-size:13px;">
        <thead>
          <tr style="background:#ecfdf5;">
            <th style="padding:12px;border:1px solid #a7f3d0;text-align:left;">Process</th>
            <th style="padding:12px;border:1px solid #a7f3d0;text-align:left;">Description</th>
            <th style="padding:12px;border:1px solid #a7f3d0;text-align:center;">Frequency</th>
            <th style="padding:12px;border:1px solid #a7f3d0;text-align:center;">Responsible</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding:12px;border:1px solid #e2e8f0;">📋 ${t.qualityProcessReview}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;">Verification against acceptance criteria</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">Per deliverable</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">PM / QA</td>
          </tr>
          <tr><td style="padding:12px;border:1px solid #e2e8f0;">📊 ${t.qualityProcessMetrics}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;">Quality KPI tracking</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">Weekly</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">PM</td>
          </tr>
          <tr><td style="padding:12px;border:1px solid #e2e8f0;">🔧 ${t.qualityProcessCorrective}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;">Corrective measures for deviations</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">As needed</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">Team</td>
          </tr>
          <tr><td style="padding:12px;border:1px solid #e2e8f0;">📝 ${t.qualityProcessAudit}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;">Independent process evaluation</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">Monthly</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">QA / PMO</td>
          </tr>
        </tbody>
      </table>

      <!-- Mejora Continua -->
      <h2 style="color:#1e3a8a;border-left:6px solid #10b981;padding-left:20px;margin:30px 0 20px 0;">🔄 ${t.qualityContinuousImprovement}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr style="background:#ecfdf5;">
            <th style="padding:12px;border:1px solid #a7f3d0;text-align:left;">${t.qualityImprovementArea}</th>
            <th style="padding:12px;border:1px solid #a7f3d0;text-align:left;">${t.qualityActionProposed}</th>
            <th style="padding:12px;border:1px solid #a7f3d0;text-align:center;">${t.qualityPriority}</th>
            <th style="padding:12px;border:1px solid #a7f3d0;text-align:center;">${t.qualityDeadline}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding:12px;border:1px solid #e2e8f0;">${defectos >= 5 ? '🔴 Defect Reduction' : '🟢 Quality Maintenance'}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;">${defectos >= 5 ? 'Implement code reviews and automated testing' : 'Continue current verification practices'}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;"><span style="background:${defectos >= 5 ? '#ef4444' : '#22c55e'};color:white;padding:4px 10px;border-radius:10px;font-size:10px;font-weight:bold;">${defectos >= 5 ? t.qualityHigh : t.qualityLow}</span></td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">${defectos >= 5 ? '2 weeks' : 'Continuous'}</td>
          </tr>
          <tr><td style="padding:12px;border:1px solid #e2e8f0;">📚 Documentation</td>
              <td style="padding:12px;border:1px solid #e2e8f0;">Keep documentation updated and accessible for the team</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;"><span style="background:#f59e0b;color:white;padding:4px 10px;border-radius:10px;font-size:10px;font-weight:bold;">${t.qualityMedium}</span></td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">Continuous</td>
          </tr>
          <tr><td style="padding:12px;border:1px solid #e2e8f0;">🎯 Customer Satisfaction</td>
              <td style="padding:12px;border:1px solid #e2e8f0;">Periodic surveys and feedback meetings with stakeholders</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;"><span style="background:#ef4444;color:white;padding:4px 10px;border-radius:10px;font-size:10px;font-weight:bold;">${t.qualityHigh}</span></td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">Monthly</td>
          </tr>
        </tbody>
      </table>

      <!-- Footer -->
      <div style="margin-top:40px;padding:20px;background:#f8fafc;border-radius:12px;text-align:center;">
        <p style="color:#64748b;font-size:12px;">
          <strong>${t.qualityConfidential}</strong><br>
          ${t.qualityMethodology}<br>
          ${t.qualityAutoGenerated} - ${fecha}
        </p>
      </div>
    </div>`;

    var htmlCompleto = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Quality Plan - ${proyecto.name}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        body { font-family: 'Inter','Segoe UI',sans-serif; margin:0; padding:20px; background:#f1f5f9; }
        .document-container { max-width:1200px; margin:0 auto; background:white; border-radius:16px; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1); overflow:hidden; }
        @media print { body { background:white; padding:0; } .document-container { box-shadow:none; margin:0; max-width:100%; } button[onclick*="print"] { display:none !important; } }
      </style>
    </head>
    <body>
      <div class="document-container">${contenido}</div>
      <div style="position:fixed;bottom:20px;right:20px;z-index:1000;">
        <button onclick="window.print();" style="background:#3b82f6;border:none;padding:12px 24px;border-radius:40px;color:white;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.2);cursor:pointer;display:flex;align-items:center;gap:8px;">🖨️ Print Quality Plan</button>
      </div>
    </body>
    </html>`;

    var win = window.open('', '_blank');
    if (!win) { alert('⚠️ Please allow popup windows to view the document.'); return; }
    win.document.write(htmlCompleto);
    win.document.close();
    win.document.title = 'Quality_Plan_' + proyecto.name.replace(/\s+/g, '_');

    var hist = JSON.parse(localStorage.getItem('planesCalidad') || '[]');
    hist.push({ proyecto: proyecto.name, fecha: new Date().toISOString(), codigo: codigo, scoreCalidad: scoreCalidad, nivel: nivelCalidad });
    localStorage.setItem('planesCalidad', JSON.stringify(hist));

    console.log('✅ ' + t.qualityGenerated + ' Code:', codigo);
  };

  console.log('✅ Quality Plan cargado correctamente.');
})();


// ============================================================
// COMMUNICATIONS PLAN - DEFINITIVO (SIN ERRORES, SIN ALERTAS)
// ============================================================
(function() {
  if (typeof window.translations === 'undefined') window.translations = {};
  var t = window.translations;

  var clavesComm = {
    commTitle: '📢 Communications Management Plan',
    commSubtitle: 'COMMUNICATIONS MANAGEMENT PLAN - EXECUTIVE DOCUMENT',
    commProject: 'Project',
    commCode: 'Code',
    commDate: 'Date',
    commStakeholder: 'Stakeholder',
    commInfluence: 'Influence',
    commInterest: 'Interest',
    commFrequency: 'Frequency',
    commChannel: 'Channel',
    commContent: 'Content',
    commResponsible: 'Responsible',
    commFormat: 'Format',
    commStrategy: 'Strategy',
    commManageClosely: 'Manage Closely',
    commKeepSatisfied: 'Keep Satisfied',
    commKeepInformed: 'Keep Informed',
    commMonitor: 'Monitor',
    commDaily: 'Daily',
    commWeekly: 'Weekly',
    commBiweekly: 'Biweekly',
    commMonthly: 'Monthly',
    commQuarterly: 'Quarterly',
    commAsNeeded: 'As Needed',
    commEmail: 'Email',
    commMeeting: 'In-person Meeting',
    commVideo: 'Video Conference',
    commChat: 'Chat/Slack',
    commReport: 'Written Report',
    commPortal: 'Project Portal',
    commStandup: 'Daily Stand-up',
    commNewsletter: 'Newsletter',
    commExecutiveSummary: 'Executive Summary',
    commDetailedReport: 'Detailed Report',
    commDashboard: 'Visual Dashboard',
    commPresentation: 'Presentation',
    commMinutes: 'Meeting Minutes',
    commAlert: 'Quick Alert',
    commAddCommunication: '+ Add Communication',
    commSave: '💾 Save Communication',
    commGenerate: '📄 Generate Communications Plan',
    commCancel: '❌ Cancel',
    commNoCommunications: 'No communications registered',
    commAddFirst: 'Add the first communication using the form above.',
    commSaved: '✅ Communication saved successfully',
    commConfirmDelete: 'Delete this communication?',
    commDeleted: '✅ Communication deleted',
    commGenerated: '✅ Communications Plan generated successfully.',
    commConfidential: '🔒 CONFIDENTIAL - For internal use only',
    commMethodology: 'Methodology: Communications Management following PMI PMBOK standards',
    commAutoGenerated: 'Automatically generated by PM Virtual Executive',
    commPlaceholderStakeholder: 'e.g., IT Director, Client, Executive Committee',
    commPlaceholderContent: 'e.g., Weekly progress, Risk alerts, Strategic decisions'
  };

  Object.keys(clavesComm).forEach(function(k) {
    if (!t[k]) t[k] = clavesComm[k];
  });

  window.generarPlanComunicaciones = function() {
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      alert('⚠️ No project selected');
      return;
    }

    // Cargar comunicaciones existentes
    var commData = JSON.parse(localStorage.getItem('comunicacionesData') || '[]');
    var comunicaciones = commData.filter(function(c) { return c.proyectoId === proyecto.name; });

    // ========== MODAL ==========
    var modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:100002; display:flex; align-items:center; justify-content:center;';

    var content = document.createElement('div');
    content.style.cssText = 'background:linear-gradient(135deg,#1e293b,#0f172a); padding:25px; border-radius:16px; width:800px; max-width:90vw; max-height:85vh; color:white; border:1px solid #3b82f6; overflow-y:auto; display:flex; flex-direction:column;';

    content.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;">
        <h2 style="color:#3b82f6;margin:0;font-size:18px;">${t.commTitle}</h2>
        <span style="color:#94a3b8;font-size:12px;">${comunicaciones.length} communications</span>
      </div>
      <p style="margin:0 0 15px 0;color:#94a3b8;font-size:13px;">${t.commSubtitle}</p>

      <!-- Formulario para agregar comunicación -->
      <div style="background:rgba(0,0,0,0.3);padding:15px;border-radius:12px;margin-bottom:15px;">
        <h3 style="color:#10b981;margin:0 0 10px 0;font-size:14px;">${t.commAddCommunication}</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div style="grid-column:span 2;">
            <input type="text" id="commInteresado" placeholder="${t.commPlaceholderStakeholder}" style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;">
          </div>
          <div>
            <select id="commInfluencia" style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;">
              <option value="Alta">🔴 ${t.commInfluence} High</option>
              <option value="Media" selected>🟡 ${t.commInfluence} Medium</option>
              <option value="Baja">🟢 ${t.commInfluence} Low</option>
            </select>
          </div>
          <div>
            <select id="commInteres" style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;">
              <option value="Alto" selected>🔴 ${t.commInterest} High</option>
              <option value="Medio">🟡 ${t.commInterest} Medium</option>
              <option value="Bajo">🟢 ${t.commInterest} Low</option>
            </select>
          </div>
          <div>
            <select id="commFrecuencia" style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;">
              <option>${t.commDaily}</option>
              <option selected>${t.commWeekly}</option>
              <option>${t.commBiweekly}</option>
              <option>${t.commMonthly}</option>
              <option>${t.commQuarterly}</option>
              <option>${t.commAsNeeded}</option>
            </select>
          </div>
          <div>
            <select id="commCanal" style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;">
              <option>${t.commEmail}</option>
              <option>${t.commMeeting}</option>
              <option>${t.commVideo}</option>
              <option>${t.commChat}</option>
              <option>${t.commReport}</option>
              <option>${t.commPortal}</option>
              <option>${t.commStandup}</option>
              <option>${t.commNewsletter}</option>
            </select>
          </div>
          <div style="grid-column:span 2;">
            <textarea id="commContenido" rows="2" placeholder="${t.commPlaceholderContent}" style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;resize:vertical;"></textarea>
          </div>
          <div>
            <select id="commResponsable" style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;">
              <option>PM</option>
              <option>Sponsor</option>
              <option>Technical Team</option>
              <option>Communications</option>
              <option>Stakeholder</option>
              <option>Steering Committee</option>
            </select>
          </div>
          <div>
            <select id="commFormato" style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;">
              <option>${t.commExecutiveSummary}</option>
              <option>${t.commDetailedReport}</option>
              <option>${t.commDashboard}</option>
              <option>${t.commPresentation}</option>
              <option>${t.commMinutes}</option>
              <option>${t.commAlert}</option>
            </select>
          </div>
        </div>
        <button id="agregarComm" style="margin-top:10px;background:#3b82f6;border:none;padding:8px 20px;border-radius:8px;color:white;cursor:pointer;font-weight:bold;font-size:13px;">${t.commSave}</button>
      </div>

      <!-- Lista de comunicaciones -->
      <div id="listaComms" style="flex:1;overflow-y:auto;margin-bottom:10px;max-height:250px;">
        ${comunicaciones.length === 0 ? '<p style="text-align:center;color:#94a3b8;padding:20px;">' + t.commNoCommunications + '<br><span style="font-size:12px;">' + t.commAddFirst + '</span></p>' :
          comunicaciones.map(function(c, idx) {
            var colorInf = c.influencia === 'Alta' ? '#ef4444' : (c.influencia === 'Media' ? '#f59e0b' : '#22c55e');
            return '<div style="background:rgba(0,0,0,0.2);padding:10px;border-radius:8px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;border-left:3px solid ' + colorInf + ';">' +
              '<div><strong>' + c.interesado + '</strong> <span style="font-size:11px;color:#94a3b8;">' + c.frecuencia + ' · ' + c.canal + '</span><br><span style="font-size:10px;color:#64748b;">' + c.contenido || '' + '</span></div>' +
              '<button data-idx="' + idx + '" class="btn-eliminar-comm" style="background:#ef4444;border:none;padding:4px 10px;border-radius:4px;color:white;cursor:pointer;font-size:11px;">🗑️</button></div>';
          }).join('')
        }
      </div>

      <div style="display:flex;gap:10px;justify-content:center;padding-top:15px;border-top:1px solid #3b82f6;flex-shrink:0;">
        <button id="generarCommBtn" style="background:#10b981;border:none;padding:10px 25px;border-radius:8px;color:white;cursor:pointer;font-size:14px;font-weight:bold;">${t.commGenerate}</button>
        <button id="cancelarCommBtn" style="background:#ef4444;border:none;padding:10px 25px;border-radius:8px;color:white;cursor:pointer;font-size:14px;font-weight:bold;">${t.commCancel}</button>
      </div>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // ========== FUNCIONES ==========
    function actualizarLista() {
      var lista = document.getElementById('listaComms');
      var nuevas = commData.filter(function(c) { return c.proyectoId === proyecto.name; });
      if (nuevas.length === 0) {
        lista.innerHTML = '<p style="text-align:center;color:#94a3b8;padding:20px;">' + t.commNoCommunications + '<br><span style="font-size:12px;">' + t.commAddFirst + '</span></p>';
      } else {
        lista.innerHTML = nuevas.map(function(c, idx) {
          var colorInf = c.influencia === 'Alta' ? '#ef4444' : (c.influencia === 'Media' ? '#f59e0b' : '#22c55e');
          return '<div style="background:rgba(0,0,0,0.2);padding:10px;border-radius:8px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;border-left:3px solid ' + colorInf + ';">' +
            '<div><strong>' + c.interesado + '</strong> <span style="font-size:11px;color:#94a3b8;">' + c.frecuencia + ' · ' + c.canal + '</span><br><span style="font-size:10px;color:#64748b;">' + (c.contenido || '') + '</span></div>' +
            '<button data-idx="' + idx + '" class="btn-eliminar-comm" style="background:#ef4444;border:none;padding:4px 10px;border-radius:4px;color:white;cursor:pointer;font-size:11px;">🗑️</button></div>';
        }).join('');
        lista.querySelectorAll('.btn-eliminar-comm').forEach(function(btn) {
          btn.onclick = function() {
            var idx = parseInt(this.dataset.idx);
            var c = nuevas[idx];
            if (confirm(t.commConfirmDelete)) {
              var globalIdx = commData.indexOf(c);
              if (globalIdx !== -1) {
                commData.splice(globalIdx, 1);
                localStorage.setItem('comunicacionesData', JSON.stringify(commData));
                actualizarLista();
              }
            }
          };
        });
      }
    }

    // Agregar comunicación
    document.getElementById('agregarComm').onclick = function() {
      var interesado = document.getElementById('commInteresado').value.trim();
      if (!interesado) { alert('⚠️ Stakeholder is required'); return; }

      var nueva = {
        id: Date.now(),
        proyectoId: proyecto.name,
        interesado: interesado,
        influencia: document.getElementById('commInfluencia').value,
        interes: document.getElementById('commInteres').value,
        frecuencia: document.getElementById('commFrecuencia').value,
        canal: document.getElementById('commCanal').value,
        contenido: document.getElementById('commContenido').value.trim(),
        responsable: document.getElementById('commResponsable').value,
        formato: document.getElementById('commFormato').value,
        fecha: new Date().toISOString()
      };

      commData.push(nueva);
      localStorage.setItem('comunicacionesData', JSON.stringify(commData));

      document.getElementById('commInteresado').value = '';
      document.getElementById('commContenido').value = '';
      actualizarLista();
      alert(t.commSaved);
    };

    // ========== GENERAR DOCUMENTO ==========
    document.getElementById('generarCommBtn').onclick = function() {
      var comunicacionesActuales = commData.filter(function(c) { return c.proyectoId === proyecto.name; });
      if (comunicacionesActuales.length === 0) {
        alert('⚠️ ' + t.commNoCommunications);
        return;
      }

      var fecha = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      var codigo = 'COM-' + Date.now().toString().slice(-6);

      // ========== CONTENIDO DEL DOCUMENTO ==========
      var filas = comunicacionesActuales.map(function(c) {
        var colorInf = c.influencia === 'Alta' ? '#ef4444' : (c.influencia === 'Media' ? '#f59e0b' : '#22c55e');
        var colorInt = c.interes === 'Alto' ? '#ef4444' : (c.interes === 'Medio' ? '#f59e0b' : '#22c55e');
        return '<tr>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;"><strong>' + c.interesado + '</strong></td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;"><span style="background:' + colorInf + ';color:white;padding:2px 10px;border-radius:12px;font-size:11px;">' + c.influencia + '</span></td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;"><span style="background:' + colorInt + ';color:white;padding:2px 10px;border-radius:12px;font-size:11px;">' + c.interes + '</span></td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;">' + c.frecuencia + '</td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;">' + c.canal + '</td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;">' + (c.contenido || '-') + '</td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;">' + c.responsable + '</td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;">' + c.formato + '</td></tr>';
      }).join('');

      var contenido = `
      <div style="background:linear-gradient(135deg,#7c3aed,#8b5cf6);color:white;padding:30px;border-radius:16px 16px 0 0;text-align:center;">
        <h1 style="margin:0;font-size:28px;">${t.commTitle}</h1>
        <p style="margin:8px 0 0 0;opacity:0.9;">${t.commSubtitle}</p>
        <div style="margin-top:15px;display:flex;justify-content:center;gap:20px;flex-wrap:wrap;">
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.commCode}: ${codigo}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.commDate}: ${fecha}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.commProject}: ${proyecto.name}</div>
        </div>
      </div>
      <div style="padding:30px;background:white;color:#1e293b;">
        <h2 style="color:#1e3a8a;border-left:6px solid #8b5cf6;padding-left:20px;">📋 ${t.commTitle}</h2>
        <p style="line-height:1.8;color:#374151;">Total communications: <strong>${comunicacionesActuales.length}</strong></p>
        <table style="width:100%;border-collapse:collapse;margin-top:20px;font-size:12px;">
          <thead>
            <tr style="background:#ede9fe;">
              <th style="padding:10px;border:1px solid #ddd6fe;text-align:left;">${t.commStakeholder}</th>
              <th style="padding:10px;border:1px solid #ddd6fe;text-align:center;">${t.commInfluence}</th>
              <th style="padding:10px;border:1px solid #ddd6fe;text-align:center;">${t.commInterest}</th>
              <th style="padding:10px;border:1px solid #ddd6fe;text-align:center;">${t.commFrequency}</th>
              <th style="padding:10px;border:1px solid #ddd6fe;text-align:center;">${t.commChannel}</th>
              <th style="padding:10px;border:1px solid #ddd6fe;text-align:left;">${t.commContent}</th>
              <th style="padding:10px;border:1px solid #ddd6fe;text-align:center;">${t.commResponsible}</th>
              <th style="padding:10px;border:1px solid #ddd6fe;text-align:center;">${t.commFormat}</th>
            </tr>
          </thead>
          <tbody>${filas}</tbody>
        </table>
        <div style="margin-top:30px;padding:20px;background:#f8fafc;border-radius:12px;text-align:center;">
          <p style="color:#64748b;font-size:12px;"><strong>${t.commConfidential}</strong><br>${t.commMethodology}<br>${t.commAutoGenerated} - ${fecha}</p>
        </div>
      </div>`;

      var htmlCompleto = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Communications Plan - ${proyecto.name}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body { font-family: 'Inter','Segoe UI',sans-serif; margin:0; padding:20px; background:#f1f5f9; }
          .document-container { max-width:1200px; margin:0 auto; background:white; border-radius:16px; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1); overflow:hidden; }
          @media print { body { background:white; padding:0; } .document-container { box-shadow:none; margin:0; max-width:100%; } button[onclick*="print"] { display:none !important; } }
        </style>
      </head>
      <body>
        <div class="document-container">${contenido}</div>
        <div style="position:fixed;bottom:20px;right:20px;z-index:1000;">
          <button onclick="window.print();" style="background:#3b82f6;border:none;padding:12px 24px;border-radius:40px;color:white;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.2);cursor:pointer;display:flex;align-items:center;gap:8px;">🖨️ Print Communications Plan</button>
        </div>
      </body>
      </html>`;

      var win = window.open('', '_blank');
      if (!win) { alert('⚠️ Please allow popup windows.'); return; }
      win.document.write(htmlCompleto);
      win.document.close();
      win.document.title = 'Communications_Plan_' + proyecto.name.replace(/\s+/g, '_');

      var hist = JSON.parse(localStorage.getItem('planesComunicaciones') || '[]');
      hist.push({ proyecto: proyecto.name, fecha: new Date().toISOString(), codigo: codigo, totalComunicaciones: comunicacionesActuales.length });
      localStorage.setItem('planesComunicaciones', JSON.stringify(hist));

      console.log('✅ ' + t.commGenerated + ' Code:', codigo);
      modal.remove();
    };

    document.getElementById('cancelarCommBtn').onclick = function() { modal.remove(); };
    actualizarLista();
  };

  console.log('✅ Communications Plan cargado correctamente.');
})();


// ============================================================
// LESSONS LEARNED - DEFINITIVO (SIN ERRORES, SIN ALERTAS)
// ============================================================
(function() {
  if (typeof window.translations === 'undefined') window.translations = {};
  var t = window.translations;

  var clavesLessons = {
    lessonsTitle: '🎓 Lessons Learned',
    lessonsSubtitle: 'PROJECT LESSONS LEARNED - EXECUTIVE DOCUMENT',
    lessonsProject: 'Project',
    lessonsCode: 'Code',
    lessonsDate: 'Date',
    lessonsTotal: 'Total Lessons',
    lessonsPositive: 'What Worked Well',
    lessonsImprovement: 'Areas for Improvement',
    lessonsNegative: 'Problems Identified',
    lessonsType: 'Type',
    lessonsCategory: 'Category',
    lessonsPhase: 'Phase',
    lessonsImpact: 'Impact',
    lessonsDescription: 'Description',
    lessonsRecommendation: 'Recommendation',
    lessonsResponsible: 'Responsible',
    lessonsAdd: '+ Add Lesson',
    lessonsCancel: 'Cancel',
    lessonsGenerate: '📄 Generate Lessons Learned Document',
    lessonsClose: '✕',
    lessonsPositiveLabel: '✅ What worked well',
    lessonsImprovementLabel: '⚠️ Area for improvement',
    lessonsNegativeLabel: '❌ Problem identified',
    lessonsPlaceholderDesc: 'Describe what happened and why it matters...',
    lessonsPlaceholderRecommendation: 'What would you do differently next time?',
    lessonsPlaceholderResponsible: 'e.g., PM, Team, Organization...',
    lessonsSaved: '✅ Lesson saved successfully',
    lessonsConfirmDelete: 'Delete this lesson?',
    lessonsDeleted: '✅ Lesson deleted',
    lessonsGenerated: '✅ Lessons Learned document generated successfully.',
    lessonsNoLessons: 'No lessons registered',
    lessonsAddFirst: 'Add the first lesson using the form above.',
    lessonsConfidential: '🔒 CONFIDENTIAL - For internal use only',
    lessonsMethodology: 'Methodology: Lessons Learned following PMI standards for knowledge management',
    lessonsAutoGenerated: 'Automatically generated by PM Virtual Executive'
  };

  Object.keys(clavesLessons).forEach(function(k) {
    if (!t[k]) t[k] = clavesLessons[k];
  });

  window.generarLeccionesAprendidas = function() {
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      alert('⚠️ No project selected');
      return;
    }

    var lessons = JSON.parse(localStorage.getItem('leccionesAprendidas') || '[]');
    var lessonsProyecto = lessons.filter(function(l) { return l.proyectoId === proyecto.name; });

    // ========== CATEGORÍAS ==========
    var categorias = [
      'Scope', 'Schedule', 'Cost', 'Quality', 'Resources',
      'Communications', 'Risks', 'Procurement', 'Stakeholders', 'Technology'
    ];

    var tipos = [
      { valor: 'positiva', label: t.lessonsPositiveLabel, color: '#10b981' },
      { valor: 'mejora', label: t.lessonsImprovementLabel, color: '#f59e0b' },
      { valor: 'negativa', label: t.lessonsNegativeLabel, color: '#ef4444' }
    ];

    // ========== MODAL ==========
    var modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:100002; display:flex; align-items:center; justify-content:center;';

    var content = document.createElement('div');
    content.style.cssText = 'background:linear-gradient(135deg,#1e293b,#0f172a); padding:25px; border-radius:16px; width:750px; max-width:90vw; max-height:85vh; color:white; border:1px solid #3b82f6; overflow-y:auto; display:flex; flex-direction:column;';

    content.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;">
        <h2 style="color:#3b82f6;margin:0;font-size:18px;">${t.lessonsTitle}</h2>
        <span style="color:#94a3b8;font-size:12px;">${lessonsProyecto.length} ${t.lessonsTotal}</span>
      </div>
      <p style="margin:0 0 15px 0;color:#94a3b8;font-size:13px;">${t.lessonsSubtitle}</p>

      <!-- Formulario para agregar lección -->
      <div style="background:rgba(0,0,0,0.3);padding:15px;border-radius:12px;margin-bottom:15px;">
        <h3 style="color:#10b981;margin:0 0 10px 0;font-size:14px;">${t.lessonsAdd}</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div>
            <select id="lessonTipo" style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;">
              ${tipos.map(function(tp) { return '<option value="' + tp.valor + '" style="color:' + tp.color + ';">' + tp.label + '</option>'; }).join('')}
            </select>
          </div>
          <div>
            <select id="lessonCategoria" style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;">
              ${categorias.map(function(c) { return '<option value="' + c + '">' + c + '</option>'; }).join('')}
            </select>
          </div>
          <div>
            <select id="lessonFase" style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;">
              <option>Initiation</option><option>Planning</option><option>Execution</option><option>Monitoring</option><option>Closure</option>
            </select>
          </div>
          <div>
            <select id="lessonImpacto" style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;">
              <option>Low</option><option selected>Medium</option><option>High</option><option>Critical</option>
            </select>
          </div>
          <div style="grid-column:span 2;">
            <textarea id="lessonDescripcion" rows="2" placeholder="${t.lessonsPlaceholderDesc}" style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;resize:vertical;"></textarea>
          </div>
          <div style="grid-column:span 2;">
            <textarea id="lessonRecomendacion" rows="2" placeholder="${t.lessonsPlaceholderRecommendation}" style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;resize:vertical;"></textarea>
          </div>
          <div style="grid-column:span 2;">
            <input type="text" id="lessonResponsable" placeholder="${t.lessonsPlaceholderResponsible}" style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;">
          </div>
        </div>
        <button id="agregarLesson" style="margin-top:10px;background:#3b82f6;border:none;padding:8px 20px;border-radius:8px;color:white;cursor:pointer;font-weight:bold;font-size:13px;">💾 ${t.lessonsAdd}</button>
      </div>

      <!-- Lista de lecciones -->
      <div id="listaLessons" style="flex:1;overflow-y:auto;margin-bottom:10px;max-height:250px;">
        ${lessonsProyecto.length === 0 ? '<p style="text-align:center;color:#94a3b8;padding:20px;">' + t.lessonsNoLessons + '<br><span style="font-size:12px;">' + t.lessonsAddFirst + '</span></p>' :
          lessonsProyecto.map(function(l, idx) {
            var tipoInfo = tipos.find(function(tp) { return tp.valor === l.tipo; });
            var color = tipoInfo ? tipoInfo.color : '#64748b';
            return '<div style="background:rgba(0,0,0,0.2);padding:10px;border-radius:8px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;border-left:3px solid ' + color + ';">' +
              '<div><strong>' + l.descripcion.substring(0, 60) + (l.descripcion.length > 60 ? '...' : '') + '</strong> <span style="font-size:10px;color:#94a3b8;">' + l.categoria + ' · ' + l.fase + '</span></div>' +
              '<button data-id="' + l.id + '" class="btn-eliminar-lesson" style="background:#ef4444;border:none;padding:4px 10px;border-radius:4px;color:white;cursor:pointer;font-size:11px;">🗑️</button></div>';
          }).join('')
        }
      </div>

      <div style="display:flex;gap:10px;justify-content:center;padding-top:15px;border-top:1px solid #3b82f6;flex-shrink:0;">
        <button id="generarLessonsBtn" style="background:#10b981;border:none;padding:10px 25px;border-radius:8px;color:white;cursor:pointer;font-size:14px;font-weight:bold;">${t.lessonsGenerate}</button>
        <button id="cancelarLessonsBtn" style="background:#ef4444;border:none;padding:10px 25px;border-radius:8px;color:white;cursor:pointer;font-size:14px;font-weight:bold;">${t.lessonsCancel}</button>
      </div>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // ========== FUNCIONES ==========
    function actualizarLista() {
      var lista = document.getElementById('listaLessons');
      var nuevas = lessons.filter(function(l) { return l.proyectoId === proyecto.name; });
      if (nuevas.length === 0) {
        lista.innerHTML = '<p style="text-align:center;color:#94a3b8;padding:20px;">' + t.lessonsNoLessons + '<br><span style="font-size:12px;">' + t.lessonsAddFirst + '</span></p>';
      } else {
        lista.innerHTML = nuevas.map(function(l, idx) {
          var tipoInfo = tipos.find(function(tp) { return tp.valor === l.tipo; });
          var color = tipoInfo ? tipoInfo.color : '#64748b';
          return '<div style="background:rgba(0,0,0,0.2);padding:10px;border-radius:8px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;border-left:3px solid ' + color + ';">' +
            '<div><strong>' + (l.descripcion ? l.descripcion.substring(0, 60) : '') + (l.descripcion && l.descripcion.length > 60 ? '...' : '') + '</strong> <span style="font-size:10px;color:#94a3b8;">' + (l.categoria || '') + ' · ' + (l.fase || '') + '</span></div>' +
            '<button data-id="' + l.id + '" class="btn-eliminar-lesson" style="background:#ef4444;border:none;padding:4px 10px;border-radius:4px;color:white;cursor:pointer;font-size:11px;">🗑️</button></div>';
        }).join('');
        lista.querySelectorAll('.btn-eliminar-lesson').forEach(function(btn) {
          btn.onclick = function() {
            var id = parseInt(this.dataset.id);
            if (confirm(t.lessonsConfirmDelete)) {
              var globalIdx = lessons.findIndex(function(l) { return l.id === id; });
              if (globalIdx !== -1) {
                lessons.splice(globalIdx, 1);
                localStorage.setItem('leccionesAprendidas', JSON.stringify(lessons));
                actualizarLista();
              }
            }
          };
        });
      }
    }

    // Agregar lección
    document.getElementById('agregarLesson').onclick = function() {
      var descripcion = document.getElementById('lessonDescripcion').value.trim();
      if (!descripcion) { alert('⚠️ Description is required'); return; }

      var nueva = {
        id: Date.now(),
        proyectoId: proyecto.name,
        tipo: document.getElementById('lessonTipo').value,
        categoria: document.getElementById('lessonCategoria').value,
        fase: document.getElementById('lessonFase').value,
        impacto: document.getElementById('lessonImpacto').value,
        descripcion: descripcion,
        recomendacion: document.getElementById('lessonRecomendacion').value.trim(),
        responsable: document.getElementById('lessonResponsable').value.trim(),
        fecha: new Date().toISOString()
      };

      lessons.push(nueva);
      localStorage.setItem('leccionesAprendidas', JSON.stringify(lessons));

      document.getElementById('lessonDescripcion').value = '';
      document.getElementById('lessonRecomendacion').value = '';
      document.getElementById('lessonResponsable').value = '';
      actualizarLista();
      alert(t.lessonsSaved);
    };

    // ========== GENERAR DOCUMENTO ==========
    document.getElementById('generarLessonsBtn').onclick = function() {
      var lessonsActuales = lessons.filter(function(l) { return l.proyectoId === proyecto.name; });
      if (lessonsActuales.length === 0) {
        alert('⚠️ ' + t.lessonsNoLessons);
        return;
      }

      var fecha = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      var codigo = 'LSN-' + Date.now().toString().slice(-6);

      // Agrupar por tipo
      var positivas = lessonsActuales.filter(function(l) { return l.tipo === 'positiva'; });
      var mejoras = lessonsActuales.filter(function(l) { return l.tipo === 'mejora'; });
      var negativas = lessonsActuales.filter(function(l) { return l.tipo === 'negativa'; });

      function generarFilas(lista) {
        return lista.map(function(l) {
          var tipoInfo = tipos.find(function(tp) { return tp.valor === l.tipo; });
          var color = tipoInfo ? tipoInfo.color : '#64748b';
          return '<tr>' +
            '<td style="padding:10px;border:1px solid #e2e8f0;"><span style="background:' + color + ';color:white;padding:2px 10px;border-radius:12px;font-size:10px;">' + l.categoria + '</span></td>' +
            '<td style="padding:10px;border:1px solid #e2e8f0;">' + l.descripcion + '</td>' +
            '<td style="padding:10px;border:1px solid #e2e8f0;">' + (l.recomendacion || '-') + '</td>' +
            '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;">' + (l.responsable || '-') + '</td>' +
            '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;"><span style="background:' + (l.impacto === 'Critical' ? '#ef4444' : l.impacto === 'High' ? '#f97316' : l.impacto === 'Medium' ? '#f59e0b' : '#22c55e') + ';color:white;padding:2px 10px;border-radius:12px;font-size:10px;">' + l.impacto + '</span></td></tr>';
        }).join('');
      }

      var contenido = `
      <div style="background:linear-gradient(135deg,#1e3a8a,#3b82f6);color:white;padding:30px;border-radius:16px 16px 0 0;text-align:center;">
        <h1 style="margin:0;font-size:28px;">${t.lessonsTitle}</h1>
        <p style="margin:8px 0 0 0;opacity:0.9;">${t.lessonsSubtitle}</p>
        <div style="margin-top:15px;display:flex;justify-content:center;gap:20px;flex-wrap:wrap;">
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.lessonsCode}: ${codigo}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.lessonsDate}: ${fecha}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.lessonsProject}: ${proyecto.name}</div>
        </div>
      </div>
      <div style="padding:30px;background:white;color:#1e293b;">
        <h2 style="color:#1e3a8a;border-left:6px solid #3b82f6;padding-left:20px;">📋 ${t.lessonsTitle}</h2>
        <p style="line-height:1.8;color:#374151;">Total lessons: <strong>${lessonsActuales.length}</strong> · Positive: ${positivas.length} · Improvements: ${mejoras.length} · Problems: ${negativas.length}</p>

        ${positivas.length > 0 ? `
          <h3 style="color:#10b981;margin:30px 0 10px 0;">✅ ${t.lessonsPositive}</h3>
          <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:20px;">
            <thead><tr style="background:#dcfce7;">
              <th style="padding:10px;border:1px solid #bbf7d0;">${t.lessonsCategory}</th>
              <th style="padding:10px;border:1px solid #bbf7d0;">${t.lessonsDescription}</th>
              <th style="padding:10px;border:1px solid #bbf7d0;">${t.lessonsRecommendation}</th>
              <th style="padding:10px;border:1px solid #bbf7d0;text-align:center;">${t.lessonsResponsible}</th>
              <th style="padding:10px;border:1px solid #bbf7d0;text-align:center;">${t.lessonsImpact}</th>
            </tr></thead>
            <tbody>${generarFilas(positivas)}</tbody>
          </table>
        ` : ''}

        ${mejoras.length > 0 ? `
          <h3 style="color:#f59e0b;margin:30px 0 10px 0;">⚠️ ${t.lessonsImprovement}</h3>
          <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:20px;">
            <thead><tr style="background:#fef3c7;">
              <th style="padding:10px;border:1px solid #fde68a;">${t.lessonsCategory}</th>
              <th style="padding:10px;border:1px solid #fde68a;">${t.lessonsDescription}</th>
              <th style="padding:10px;border:1px solid #fde68a;">${t.lessonsRecommendation}</th>
              <th style="padding:10px;border:1px solid #fde68a;text-align:center;">${t.lessonsResponsible}</th>
              <th style="padding:10px;border:1px solid #fde68a;text-align:center;">${t.lessonsImpact}</th>
            </tr></thead>
            <tbody>${generarFilas(mejoras)}</tbody>
          </table>
        ` : ''}

        ${negativas.length > 0 ? `
          <h3 style="color:#ef4444;margin:30px 0 10px 0;">❌ ${t.lessonsNegative}</h3>
          <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:20px;">
            <thead><tr style="background:#fee2e2;">
              <th style="padding:10px;border:1px solid #fecaca;">${t.lessonsCategory}</th>
              <th style="padding:10px;border:1px solid #fecaca;">${t.lessonsDescription}</th>
              <th style="padding:10px;border:1px solid #fecaca;">${t.lessonsRecommendation}</th>
              <th style="padding:10px;border:1px solid #fecaca;text-align:center;">${t.lessonsResponsible}</th>
              <th style="padding:10px;border:1px solid #fecaca;text-align:center;">${t.lessonsImpact}</th>
            </tr></thead>
            <tbody>${generarFilas(negativas)}</tbody>
          </table>
        ` : ''}

        <div style="margin-top:30px;padding:20px;background:#f8fafc;border-radius:12px;text-align:center;">
          <p style="color:#64748b;font-size:12px;"><strong>${t.lessonsConfidential}</strong><br>${t.lessonsMethodology}<br>${t.lessonsAutoGenerated} - ${fecha}</p>
        </div>
      </div>`;

      var htmlCompleto = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Lessons Learned - ${proyecto.name}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body { font-family: 'Inter','Segoe UI',sans-serif; margin:0; padding:20px; background:#f1f5f9; }
          .document-container { max-width:1200px; margin:0 auto; background:white; border-radius:16px; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1); overflow:hidden; }
          @media print { body { background:white; padding:0; } .document-container { box-shadow:none; margin:0; max-width:100%; } button[onclick*="print"] { display:none !important; } }
        </style>
      </head>
      <body>
        <div class="document-container">${contenido}</div>
        <div style="position:fixed;bottom:20px;right:20px;z-index:1000;">
          <button onclick="window.print();" style="background:#3b82f6;border:none;padding:12px 24px;border-radius:40px;color:white;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.2);cursor:pointer;display:flex;align-items:center;gap:8px;">🖨️ Print Lessons Learned</button>
        </div>
      </body>
      </html>`;

      var win = window.open('', '_blank');
      if (!win) { alert('⚠️ Please allow popup windows.'); return; }
      win.document.write(htmlCompleto);
      win.document.close();
      win.document.title = 'Lessons_Learned_' + proyecto.name.replace(/\s+/g, '_');

      console.log('✅ ' + t.lessonsGenerated + ' Code:', codigo);
      modal.remove();
    };

    document.getElementById('cancelarLessonsBtn').onclick = function() { modal.remove(); };
    actualizarLista();
  };

  console.log('✅ Lessons Learned cargado correctamente.');
})();


// ============================================================
// FINAL REPORT - DEFINITIVO (SIN ERRORES, SIN ALERTAS)
// ============================================================
(function() {
  if (typeof window.translations === 'undefined') window.translations = {};
  var t = window.translations;

  var clavesFinal = {
    finalTitle: '📊 Final Project Report',
    finalSubtitle: 'PROJECT FINAL REPORT - EXECUTIVE DOCUMENT',
    finalProject: 'Project',
    finalCode: 'Code',
    finalDate: 'Date',
    finalTotalTasks: 'Total Tasks',
    finalCompleted: 'Completed',
    finalInProgress: 'In Progress',
    finalPending: 'Pending',
    finalOverdue: 'Overdue',
    finalEfficiency: 'Efficiency',
    finalProgress: 'Progress',
    finalScore: 'Project Score',
    finalStatus: 'Status',
    finalExcellent: '✅ Successful',
    finalAcceptable: '🟢 Acceptable',
    finalObservations: '⚠️ With Observations',
    finalCritical: '🔴 Requires Review',
    finalKPI: 'Key Performance Indicators',
    finalMetric: 'Metric',
    finalValue: 'Value',
    finalTarget: 'Target',
    finalDeviation: 'Deviation',
    finalSPI: 'SPI (Schedule)',
    finalCPI: 'CPI (Cost)',
    finalCompletionRate: 'Completion Rate',
    finalOverdueRate: 'Overdue Rate',
    finalEfficiencyRate: 'Efficiency Rate',
    finalFinancial: '💰 Financial Analysis',
    finalEstimatedBudget: 'Estimated Budget',
    finalActualCost: 'Actual Cost',
    finalVariance: 'Variance',
    finalUnderBudget: 'Under Budget',
    finalOverBudget: 'Over Budget',
    finalLessonsLearned: '🎓 Key Lessons Learned',
    finalWhatWorked: '✅ What Worked Well',
    finalWhatImprove: '⚠️ Areas for Improvement',
    finalRecommendations: '💡 Strategic Recommendations',
    finalRecommendation1: 'Implement formal scope change management process',
    finalRecommendation2: 'Establish mandatory bi-weekly quality reviews',
    finalRecommendation3: 'Train team in agile estimation techniques',
    finalRecommendation4: 'Document lessons learned at each phase',
    finalRecommendationDesc1: 'Reduce scope deviations by 40%',
    finalRecommendationDesc2: 'Improve deliverable quality by 25%',
    finalRecommendationDesc3: 'Improve estimation accuracy by 30%',
    finalRecommendationDesc4: 'Organizational continuous improvement',
    finalConclusion: '✅ Conclusion and Formal Approval',
    finalConclusionText: 'Based on comprehensive analysis of project results, the project has achieved a performance level of ',
    finalConclusionText2: 'with an overall score of ',
    finalConclusionText3: '%. Formal acceptance of deliverables and administrative closure is recommended, subject to implementation of identified continuous improvement actions.',
    finalConfidential: '🔒 CONFIDENTIAL - For executive use only',
    finalMethodology: 'Methodology: Comprehensive project performance analysis following PMI standards',
    finalAutoGenerated: 'Automatically generated by PM Virtual Executive',
    finalGenerated: '✅ Final Report generated successfully.',
    finalNoTasks: 'No tasks to display',
    finalNoTasksMessage: 'Add tasks to the project to generate the Final Report.'
  };

  Object.keys(clavesFinal).forEach(function(k) {
    if (!t[k]) t[k] = clavesFinal[k];
  });

  window.generarInformeFinal = function() {
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      alert('⚠️ No project selected');
      return;
    }

    var tasks = proyecto.tasks || [];
    if (tasks.length === 0) {
      alert('⚠️ ' + t.finalNoTasks);
      return;
    }

    // ========== CÁLCULOS ==========
    var total = tasks.length;
    var completadas = tasks.filter(function(t) { return t.status === 'completed'; }).length;
    var enProgreso = tasks.filter(function(t) { return t.status === 'inProgress'; }).length;
    var pendientes = tasks.filter(function(t) { return t.status === 'pending'; }).length;
    var atrasadas = tasks.filter(function(t) {
      return t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed';
    }).length;

    var horasEst = tasks.reduce(function(s, t) { return s + (Number(t.estimatedTime) || 0); }, 0);
    var horasReg = tasks.reduce(function(s, t) { return s + (Number(t.timeLogged) || 0); }, 0);
    var eficiencia = horasEst > 0 ? Math.round((horasEst / horasReg) * 100) : 100;
    var porcentajeAvance = total > 0 ? Math.round((completadas / total) * 100) : 0;

    var SPI = horasEst > 0 ? (horasReg / horasEst) : 0;
    var CPI = horasEst > 0 ? (horasReg / horasEst) : 0;
    var tasaExito = total > 0 ? ((completadas - atrasadas) / total) * 100 : 0;

    var scoreProyecto = Math.round(
      (porcentajeAvance * 0.4) +
      ((100 - Math.min(atrasadas * 10, 100)) * 0.3) +
      ((eficiencia > 100 ? 100 : eficiencia) * 0.3)
    );

    var estadoProyecto = scoreProyecto >= 90 ? t.finalExcellent :
                         scoreProyecto >= 75 ? t.finalAcceptable :
                         scoreProyecto >= 60 ? t.finalObservations : t.finalCritical;
    var colorEstado = scoreProyecto >= 90 ? '#10b981' :
                      scoreProyecto >= 75 ? '#3b82f6' :
                      scoreProyecto >= 60 ? '#f59e0b' : '#ef4444';

    var codigo = 'FNL-' + Date.now().toString().slice(-6);
    var fecha = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // ========== CONTENIDO DEL DOCUMENTO ==========
    var contenido = `
    <div style="background:linear-gradient(135deg,#1e3a8a,#3b82f6);color:white;padding:30px;border-radius:16px 16px 0 0;text-align:center;">
      <h1 style="margin:0;font-size:28px;">${t.finalTitle}</h1>
      <p style="margin:8px 0 0 0;opacity:0.9;">${t.finalSubtitle}</p>
      <div style="margin-top:15px;display:flex;justify-content:center;gap:20px;flex-wrap:wrap;">
        <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.finalCode}: ${codigo}</div>
        <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.finalDate}: ${fecha}</div>
        <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.finalProject}: ${proyecto.name}</div>
      </div>
    </div>
    <div style="padding:30px;background:white;color:#1e293b;">
      <!-- Score General -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;background:#f8fafc;padding:20px;border-radius:12px;">
        <div>
          <h2 style="margin:0;color:#1e3a8a;font-size:18px;">${t.finalScore}</h2>
          <p style="margin:5px 0 0 0;color:#64748b;font-size:13px;">${t.finalStatus}: <strong style="color:${colorEstado};">${estadoProyecto}</strong></p>
        </div>
        <div style="text-align:center;">
          <div style="font-size:48px;font-weight:bold;color:${colorEstado};">${scoreProyecto}%</div>
          <div style="background:#e2e8f0;height:8px;width:150px;border-radius:4px;margin-top:5px;">
            <div style="width:${scoreProyecto}%;height:100%;background:${colorEstado};border-radius:4px;"></div>
          </div>
        </div>
      </div>

      <!-- KPIs -->
      <h2 style="color:#1e3a8a;border-left:6px solid #3b82f6;padding-left:20px;margin:30px 0 20px 0;">📊 ${t.finalKPI}</h2>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin-bottom:30px;">
        <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #3b82f6;">
          <div style="font-size:28px;font-weight:bold;color:#1e40af;">${total}</div>
          <div style="font-size:11px;color:#64748b;">${t.finalTotalTasks}</div>
        </div>
        <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #10b981;">
          <div style="font-size:28px;font-weight:bold;color:#166534;">${completadas}</div>
          <div style="font-size:11px;color:#64748b;">✅ ${t.finalCompleted}</div>
        </div>
        <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #ef4444;">
          <div style="font-size:28px;font-weight:bold;color:#991b1b;">${atrasadas}</div>
          <div style="font-size:11px;color:#64748b;">🔴 ${t.finalOverdue}</div>
        </div>
        <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #8b5cf6;">
          <div style="font-size:28px;font-weight:bold;color:#6d28d9;">${eficiencia}%</div>
          <div style="font-size:11px;color:#64748b;">⚡ ${t.finalEfficiency}</div>
        </div>
      </div>

      <!-- Métricas detalladas -->
      <table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:13px;">
        <thead>
          <tr style="background:#dbeafe;">
            <th style="padding:12px;border:1px solid #bfdbfe;text-align:left;">${t.finalMetric}</th>
            <th style="padding:12px;border:1px solid #bfdbfe;text-align:center;">${t.finalValue}</th>
            <th style="padding:12px;border:1px solid #bfdbfe;text-align:center;">${t.finalTarget}</th>
            <th style="padding:12px;border:1px solid #bfdbfe;text-align:center;">${t.finalDeviation}</th>
            <th style="padding:12px;border:1px solid #bfdbfe;text-align:center;">${t.finalStatus}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding:12px;border:1px solid #e2e8f0;">📈 ${t.finalCompletionRate}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;font-weight:bold;">${porcentajeAvance}%</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">100%</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;color:${100-porcentajeAvance>10?'#ef4444':'#10b981'};">${100-porcentajeAvance > 0 ? '-'+(100-porcentajeAvance)+'%' : '✅'}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">
                <span style="background:${porcentajeAvance >= 90 ? '#10b981' : porcentajeAvance >= 75 ? '#3b82f6' : '#ef4444'}20;color:${porcentajeAvance >= 90 ? '#10b981' : porcentajeAvance >= 75 ? '#3b82f6' : '#ef4444'};padding:4px 12px;border-radius:12px;font-size:11px;font-weight:bold;">
                  ${porcentajeAvance >= 90 ? '✅ Excellent' : porcentajeAvance >= 75 ? 'Good' : 'Needs Improvement'}
                </span>
              </td>
          </tr>
          <tr><td style="padding:12px;border:1px solid #e2e8f0;">🔴 ${t.finalOverdueRate}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;font-weight:bold;">${Math.round(atrasadas/total*100) || 0}%</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">0%</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;color:${atrasadas > 0 ? '#ef4444' : '#10b981'};">${atrasadas > 0 ? '+ '+atrasadas : '✅ Zero'}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">
                <span style="background:${atrasadas === 0 ? '#10b981' : '#ef4444'}20;color:${atrasadas === 0 ? '#10b981' : '#ef4444'};padding:4px 12px;border-radius:12px;font-size:11px;font-weight:bold;">
                  ${atrasadas === 0 ? '✅ Optimal' : 'Attention'}
                </span>
              </td>
          </tr>
          <tr><td style="padding:12px;border:1px solid #e2e8f0;">⚡ ${t.finalEfficiencyRate}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;font-weight:bold;">${eficiencia}%</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">100%</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;color:${eficiencia < 90 ? '#ef4444' : '#10b981'};">${eficiencia < 100 ? (100-eficiencia).toFixed(0)+'%' : '✅'}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">
                <span style="background:${eficiencia >= 95 ? '#10b981' : eficiencia >= 85 ? '#3b82f6' : '#f59e0b'}20;color:${eficiencia >= 95 ? '#10b981' : eficiencia >= 85 ? '#3b82f6' : '#f59e0b'};padding:4px 12px;border-radius:12px;font-size:11px;font-weight:bold;">
                  ${eficiencia >= 95 ? '✅ Excellent' : eficiencia >= 85 ? 'Good' : 'Needs Improvement'}
                </span>
              </td>
          </tr>
          <tr><td style="padding:12px;border:1px solid #e2e8f0;">📊 ${t.finalSPI}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;font-weight:bold;">${SPI.toFixed(2)}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">1.0</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;color:${SPI < 1 ? '#ef4444' : '#10b981'};">${SPI < 1 ? '-'+(1-SPI).toFixed(2) : '+'+ (SPI-1).toFixed(2)}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">
                <span style="background:${SPI >= 1 ? '#10b981' : '#ef4444'}20;color:${SPI >= 1 ? '#10b981' : '#ef4444'};padding:4px 12px;border-radius:12px;font-size:11px;font-weight:bold;">
                  ${SPI >= 1 ? '✅ On Time' : 'Delayed'}
                </span>
              </td>
          </tr>
          <tr><td style="padding:12px;border:1px solid #e2e8f0;">💰 ${t.finalCPI}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;font-weight:bold;">${CPI.toFixed(2)}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">1.0</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;color:${CPI < 1 ? '#ef4444' : '#10b981'};">${CPI < 1 ? '-'+(1-CPI).toFixed(2) : '+'+ (CPI-1).toFixed(2)}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">
                <span style="background:${CPI >= 1 ? '#10b981' : '#ef4444'}20;color:${CPI >= 1 ? '#10b981' : '#ef4444'};padding:4px 12px;border-radius:12px;font-size:11px;font-weight:bold;">
                  ${CPI >= 1 ? '✅ Under Budget' : 'Over Budget'}
                </span>
              </td>
          </tr>
        </tbody>
      </table>

      <!-- Análisis Financiero -->
      <h2 style="color:#1e3a8a;border-left:6px solid #3b82f6;padding-left:20px;margin:30px 0 20px 0;">${t.finalFinancial}</h2>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:30px;">
        <div style="background:#fef3c7;padding:20px;border-radius:12px;text-align:center;border-left:5px solid #f59e0b;">
          <div style="font-size:13px;color:#92400e;">${t.finalEstimatedBudget}</div>
          <div style="font-size:28px;font-weight:bold;color:#92400e;">${horasEst}h</div>
        </div>
        <div style="background:#fee2e2;padding:20px;border-radius:12px;text-align:center;border-left:5px solid #ef4444;">
          <div style="font-size:13px;color:#991b1b;">${t.finalActualCost}</div>
          <div style="font-size:28px;font-weight:bold;color:#991b1b;">${horasReg}h</div>
        </div>
        <div style="background:${horasReg <= horasEst ? '#dcfce7' : '#fee2e2'};padding:20px;border-radius:12px;text-align:center;border-left:5px solid ${horasReg <= horasEst ? '#10b981' : '#ef4444'};">
          <div style="font-size:13px;color:${horasReg <= horasEst ? '#166534' : '#991b1b'};">${t.finalVariance}</div>
          <div style="font-size:28px;font-weight:bold;color:${horasReg <= horasEst ? '#166534' : '#991b1b'};">${horasEst - horasReg >= 0 ? '+' : ''}${horasEst - horasReg}h</div>
          <div style="font-size:11px;color:#64748b;">${horasReg <= horasEst ? t.finalUnderBudget : t.finalOverBudget}</div>
        </div>
      </div>

      <!-- Lecciones Aprendidas -->
      <h2 style="color:#1e3a8a;border-left:6px solid #3b82f6;padding-left:20px;margin:30px 0 20px 0;">${t.finalLessonsLearned}</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:30px;">
        <div style="background:#dcfce7;padding:20px;border-radius:12px;border-left:5px solid #10b981;">
          <h4 style="margin:0 0 10px 0;color:#166534;">${t.finalWhatWorked}</h4>
          <ul style="margin:0;padding-left:20px;color:#374151;font-size:13px;line-height:1.8;">
            <li>Team commitment and effective collaboration</li>
            <li>Regular communication with key stakeholders</li>
            <li>Use of project management tools</li>
            <li>Early identification of critical risks</li>
          </ul>
        </div>
        <div style="background:#fef3c7;padding:20px;border-radius:12px;border-left:5px solid #f59e0b;">
          <h4 style="margin:0 0 10px 0;color:#92400e;">${t.finalWhatImprove}</h4>
          <ul style="margin:0;padding-left:20px;color:#374151;font-size:13px;line-height:1.8;">
            <li>${atrasadas > 0 ? 'More accurate estimation of deadlines and dependencies' : 'Maintain current planning practices'}</li>
            <li>More detailed initial requirements documentation</li>
            <li>Better scope change management</li>
            <li>Increase frequency of quality reviews</li>
          </ul>
        </div>
      </div>

      <!-- Recomendaciones -->
      <h2 style="color:#1e3a8a;border-left:6px solid #3b82f6;padding-left:20px;margin:30px 0 20px 0;">${t.finalRecommendations}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:30px;">
        <thead>
          <tr style="background:#dbeafe;">
            <th style="padding:12px;border:1px solid #bfdbfe;">#</th>
            <th style="padding:12px;border:1px solid #bfdbfe;text-align:left;">${t.finalRecommendations}</th>
            <th style="padding:12px;border:1px solid #bfdbfe;text-align:center;">Priority</th>
            <th style="padding:12px;border:1px solid #bfdbfe;text-align:center;">Expected Impact</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">1</td>
              <td style="padding:12px;border:1px solid #e2e8f0;">${t.finalRecommendation1}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;"><span style="background:#ef4444;color:white;padding:4px 10px;border-radius:10px;font-size:10px;font-weight:bold;">High</span></td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">${t.finalRecommendationDesc1}</td>
          </tr>
          <tr><td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">2</td>
              <td style="padding:12px;border:1px solid #e2e8f0;">${t.finalRecommendation2}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;"><span style="background:#f59e0b;color:white;padding:4px 10px;border-radius:10px;font-size:10px;font-weight:bold;">Medium</span></td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">${t.finalRecommendationDesc2}</td>
          </tr>
          <tr><td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">3</td>
              <td style="padding:12px;border:1px solid #e2e8f0;">${t.finalRecommendation3}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;"><span style="background:#f59e0b;color:white;padding:4px 10px;border-radius:10px;font-size:10px;font-weight:bold;">Medium</span></td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">${t.finalRecommendationDesc3}</td>
          </tr>
          <tr><td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">4</td>
              <td style="padding:12px;border:1px solid #e2e8f0;">${t.finalRecommendation4}</td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;"><span style="background:#22c55e;color:white;padding:4px 10px;border-radius:10px;font-size:10px;font-weight:bold;">Low</span></td>
              <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">${t.finalRecommendationDesc4}</td>
          </tr>
        </tbody>
      </table>

      <!-- Conclusión -->
      <h2 style="color:#1e3a8a;border-left:6px solid #3b82f6;padding-left:20px;margin:30px 0 20px 0;">${t.finalConclusion}</h2>
      <div style="background:#f8fafc;padding:25px;border-radius:12px;margin-bottom:30px;">
        <p style="line-height:1.8;color:#374151;font-size:14px;margin:0 0 20px 0;">
          ${t.finalConclusionText} <strong style="color:${colorEstado};">${estadoProyecto}</strong>
          ${t.finalConclusionText2} <strong>${scoreProyecto}%</strong>.
          ${t.finalConclusionText3}
        </p>
        <div style="display:flex;justify-content:center;gap:30px;margin-top:25px;">
          <div style="text-align:center;">
            <div style="width:150px;height:60px;border:2px solid #1e3a8a;border-radius:8px;margin:0 auto 10px 0;"></div>
            <div style="font-size:12px;color:#64748b;">${t.finalPMRole}</div>
            <div style="font-size:11px;color:#94a3b8;">${fecha}</div>
          </div>
          <div style="text-align:center;">
            <div style="width:150px;height:60px;border:2px solid #1e3a8a;border-radius:8px;margin:0 auto 10px 0;"></div>
            <div style="font-size:12px;color:#64748b;">${t.finalSponsorRole}</div>
            <div style="font-size:11px;color:#94a3b8;">${fecha}</div>
          </div>
          <div style="text-align:center;">
            <div style="width:150px;height:60px;border:2px solid #1e3a8a;border-radius:8px;margin:0 auto 10px 0;"></div>
            <div style="font-size:12px;color:#64748b;">${t.finalPMORole}</div>
            <div style="font-size:11px;color:#94a3b8;">${fecha}</div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div style="margin-top:40px;padding:20px;background:#f8fafc;border-radius:12px;text-align:center;">
        <p style="color:#64748b;font-size:12px;">
          <strong>${t.finalConfidential}</strong><br>
          ${t.finalMethodology}<br>
          ${t.finalAutoGenerated} - ${fecha}
        </p>
      </div>
    </div>`;

    var htmlCompleto = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Final Report - ${proyecto.name}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        body { font-family: 'Inter','Segoe UI',sans-serif; margin:0; padding:20px; background:#f1f5f9; }
        .document-container { max-width:1200px; margin:0 auto; background:white; border-radius:16px; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1); overflow:hidden; }
        @media print { body { background:white; padding:0; } .document-container { box-shadow:none; margin:0; max-width:100%; } button[onclick*="print"] { display:none !important; } }
      </style>
    </head>
    <body>
      <div class="document-container">${contenido}</div>
      <div style="position:fixed;bottom:20px;right:20px;z-index:1000;">
        <button onclick="window.print();" style="background:#3b82f6;border:none;padding:12px 24px;border-radius:40px;color:white;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.2);cursor:pointer;display:flex;align-items:center;gap:8px;">🖨️ Print Final Report</button>
      </div>
    </body>
    </html>`;

    var win = window.open('', '_blank');
    if (!win) { alert('⚠️ Please allow popup windows.'); return; }
    win.document.write(htmlCompleto);
    win.document.close();
    win.document.title = 'Final_Report_' + proyecto.name.replace(/\s+/g, '_');

    var hist = JSON.parse(localStorage.getItem('informesFinales') || '[]');
    hist.push({ proyecto: proyecto.name, fecha: new Date().toISOString(), codigo: codigo, scoreProyecto: scoreProyecto, estado: estadoProyecto });
    localStorage.setItem('informesFinales', JSON.stringify(hist));

    console.log('✅ ' + t.finalGenerated + ' Code:', codigo);
  };

  console.log('✅ Final Report cargado correctamente.');
})();


// ============================================================
// CLOSURE REPORT - CORRECCIÓN (VALORES EN INGLÉS)
// ============================================================
(function() {
  // Asegurar traducciones
  if (typeof window.translations === 'undefined') window.translations = {};
  var t = window.translations;

  // Asegurar claves necesarias
  var clavesClosure = {
    closureTitle: '🔚 Project Closure Report',
    closureSubtitle: 'PROJECT CLOSURE REPORT - EXECUTIVE DOCUMENT',
    closureProject: 'Project',
    closureCode: 'Code',
    closureDate: 'Date',
    closureStatus: 'Status',
    closureCompleted: 'Completed',
    closureCompletedObs: 'Completed with Observations',
    closureCancelled: 'Cancelled',
    closureSuspended: 'Suspended',
    closureStartDate: 'Start Date',
    closureEndDate: 'End Date',
    closureDuration: 'Duration',
    closureTotalTasks: 'Total Tasks',
    closureCompletedTasks: 'Completed',
    closureInProgress: 'In Progress',
    closurePending: 'Pending',
    closureOverdue: 'Overdue',
    closureFinalProgress: 'Final Progress',
    closureEstimatedHours: 'Estimated Hours',
    closureActualHours: 'Actual Hours',
    closureDeviationScope: 'Scope Deviation',
    closureDeviationTime: 'Time Deviation',
    closureDeviationCost: 'Cost Deviation',
    closureWhatWorked: '✅ What Worked Well',
    closureWhatImprove: '⚠️ What Could Be Improved',
    closureAcceptance: '✅ Formal Acceptance',
    closureAccepted: '✅ Yes, fully',
    closurePartial: '⚠️ Partially',
    closureNotAccepted: '❌ No',
    closureApprovals: '✍️ Approval Signatures',
    closureSponsorRole: 'Sponsor / Patron',
    closurePMRole: 'Project Manager',
    closureClientRole: 'Client / End User',
    closurePMORole: 'PMO Director',
    closureChecklist: '✅ Closure Checklist',
    closureChecklist1: 'All deliverables were accepted',
    closureChecklist2: 'Complete documentation archived',
    closureChecklist3: 'Resources released and reassigned',
    closureChecklist4: 'Vendor contracts closed',
    closureChecklist5: 'Lessons learned documented',
    closureChecklist6: 'Closure report signed',
    closureCancel: 'Cancel',
    closureGenerate: '✅ Generate Closure Report',
    closureClose: '✕',
    closureNoTasks: 'No tasks to display',
    closureGenerating: '✅ Closure Report generated successfully.',
    closureConfidential: '🔒 CONFIDENTIAL - For internal use only',
    closureMethodology: 'Methodology: Project closure following PMI standards',
    closureAutoGenerated: 'Automatically generated by PM Virtual Executive',
    closurePlaceholderSponsor: 'Sponsor name',
    closurePlaceholderPM: 'Project Manager name',
    closurePlaceholderClient: 'Client name',
    closureStatusLabel: 'Final Status',
    closureAcceptanceLabel: 'Deliverables Accepted?',
    closureVersion: 'Version'
  };

  Object.keys(clavesClosure).forEach(function(k) {
    if (!t[k]) t[k] = clavesClosure[k];
  });

  // ========== REEMPLAZAR LA FUNCIÓN ==========
  window.generarActaCierre = function() {
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      alert('⚠️ No project selected');
      return;
    }

    var tasks = proyecto.tasks || [];
    if (tasks.length === 0) {
      alert('⚠️ ' + t.closureNoTasks);
      return;
    }

    // ========== CÁLCULOS ==========
    var total = tasks.length;
    var completadas = tasks.filter(function(t) { return t.status === 'completed'; }).length;
    var enProgreso = tasks.filter(function(t) { return t.status === 'inProgress'; }).length;
    var pendientes = tasks.filter(function(t) { return t.status === 'pending'; }).length;
    var atrasadas = tasks.filter(function(t) {
      return t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed';
    }).length;
    var horasEst = tasks.reduce(function(s, t) { return s + (Number(t.estimatedTime) || 0); }, 0);
    var horasReg = tasks.reduce(function(s, t) { return s + (Number(t.timeLogged) || 0); }, 0);
    var porcentajeAvance = total > 0 ? Math.round((completadas / total) * 100) : 0;

    // Fechas
    var fechasInicio = tasks.map(function(t) { return t.startDate; }).filter(Boolean);
    var fechasFin = tasks.map(function(t) { return t.deadline; }).filter(Boolean);
    var fechaInicio = fechasInicio.length ? new Date(Math.min.apply(null, fechasInicio.map(function(d) { return new Date(d); }))).toLocaleDateString('en-US') : 'N/D';
    var fechaFin = fechasFin.length ? new Date(Math.max.apply(null, fechasFin.map(function(d) { return new Date(d); }))).toLocaleDateString('en-US') : 'N/D';
    var duracion = fechasInicio.length && fechasFin.length ?
      Math.ceil((new Date(Math.max.apply(null, fechasFin.map(function(d) { return new Date(d); }))) -
                 new Date(Math.min.apply(null, fechasInicio.map(function(d) { return new Date(d); })))) / (1000*3600*24)) + ' days' : 'N/D';

    // ========== MODAL ==========
    var modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:100002; display:flex; align-items:center; justify-content:center;';

    var content = document.createElement('div');
    content.style.cssText = 'background:linear-gradient(135deg,#1e293b,#0f172a); padding:25px; border-radius:16px; width:650px; max-width:90vw; max-height:85vh; color:white; border:1px solid #3b82f6; overflow-y:auto; display:flex; flex-direction:column;';

    // ========== SELECTS CON VALORES EN INGLÉS ==========
    content.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;">
        <h2 style="color:#3b82f6;margin:0;font-size:18px;">${t.closureTitle}</h2>
        <button id="closeClosureModal" style="background:#ef4444;border:none;color:white;width:30px;height:30px;border-radius:15px;cursor:pointer;font-size:16px;">${t.closureClose}</button>
      </div>
      <p style="margin:0 0 15px 0;color:#94a3b8;font-size:13px;">${t.closureSubtitle}</p>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div>
          <label style="color:#94a3b8;font-size:12px;">${t.closureStartDate}</label>
          <input type="date" id="cierreFechaInicio" value="${tasks[0]?.startDate || ''}" style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;">
        </div>
        <div>
          <label style="color:#94a3b8;font-size:12px;">${t.closureEndDate}</label>
          <input type="date" id="cierreFechaFin" value="${new Date().toISOString().split('T')[0]}" style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;">
        </div>
        <div>
          <label style="color:#94a3b8;font-size:12px;">${t.closurePMRole}</label>
          <input type="text" id="cierrePM" value="${proyecto.pm || 'User'}" style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;">
        </div>
        <div>
          <label style="color:#94a3b8;font-size:12px;">${t.closureSponsorRole}</label>
          <input type="text" id="cierreSponsor" placeholder="${t.closurePlaceholderSponsor}" style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;">
        </div>
        <div style="grid-column:span 2;">
          <label style="color:#94a3b8;font-size:12px;">${t.closureAcceptanceLabel}</label>
          <select id="cierreAceptacion" style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;">
            <option value="Yes">${t.closureAccepted}</option>
            <option value="Partial">${t.closurePartial}</option>
            <option value="No">${t.closureNotAccepted}</option>
          </select>
        </div>
        <div style="grid-column:span 2;">
          <label style="color:#94a3b8;font-size:12px;">${t.closureStatusLabel}</label>
          <select id="cierreEstado" style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;">
            <option value="Completed">${t.closureCompleted}</option>
            <option value="Completed with Observations">${t.closureCompletedObs}</option>
            <option value="Cancelled">${t.closureCancelled}</option>
            <option value="Suspended">${t.closureSuspended}</option>
          </select>
        </div>
        <div style="grid-column:span 2;">
          <label style="color:#94a3b8;font-size:12px;">${t.closureWhatWorked}</label>
          <textarea id="cierreExito" rows="2" placeholder="e.g., Effective communication, milestone compliance..." style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;resize:vertical;"></textarea>
        </div>
        <div style="grid-column:span 2;">
          <label style="color:#94a3b8;font-size:12px;">${t.closureWhatImprove}</label>
          <textarea id="cierreMejora" rows="2" placeholder="e.g., Time estimation, risk management..." style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;resize:vertical;"></textarea>
        </div>
        <div style="grid-column:span 2;">
          <label style="color:#94a3b8;font-size:12px;">${t.closureDeviationScope}</label>
          <textarea id="cierreAlcance" rows="1" placeholder="Unplanned changes, scope creep..." style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;resize:vertical;"></textarea>
        </div>
        <div style="grid-column:span 2;">
          <label style="color:#94a3b8;font-size:12px;">${t.closureDeviationTime}</label>
          <textarea id="cierreTiempo" rows="1" placeholder="Delays, extensions..." style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;resize:vertical;"></textarea>
        </div>
        <div style="grid-column:span 2;">
          <label style="color:#94a3b8;font-size:12px;">${t.closureDeviationCost}</label>
          <textarea id="cierreCosto" rows="1" placeholder="Overruns, savings, variations..." style="width:100%;padding:8px;border-radius:6px;border:1px solid #3b82f6;background:#0f172a;color:white;font-size:13px;resize:vertical;"></textarea>
        </div>
      </div>

      <div style="display:flex;gap:10px;justify-content:center;padding-top:15px;border-top:1px solid #3b82f6;margin-top:15px;flex-shrink:0;">
        <button id="generarClosureBtn" style="background:#10b981;border:none;padding:10px 25px;border-radius:8px;color:white;cursor:pointer;font-size:14px;font-weight:bold;">${t.closureGenerate}</button>
        <button id="cancelarClosureBtn" style="background:#ef4444;border:none;padding:10px 25px;border-radius:8px;color:white;cursor:pointer;font-size:14px;font-weight:bold;">${t.closureCancel}</button>
      </div>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // Cerrar modal
    document.getElementById('closeClosureModal').onclick = function() { modal.remove(); };
    document.getElementById('cancelarClosureBtn').onclick = function() { modal.remove(); };

    // ========== GENERAR DOCUMENTO ==========
    document.getElementById('generarClosureBtn').onclick = function() {
      var datos = {
        fechaInicio: document.getElementById('cierreFechaInicio').value || 'N/D',
        fechaFin: document.getElementById('cierreFechaFin').value || new Date().toLocaleDateString('en-US'),
        pm: document.getElementById('cierrePM').value || 'User',
        sponsor: document.getElementById('cierreSponsor').value || 'Not specified',
        exito: document.getElementById('cierreExito').value || 'Not registered',
        mejora: document.getElementById('cierreMejora').value || 'Not registered',
        alcance: document.getElementById('cierreAlcance').value || 'No deviations',
        tiempo: document.getElementById('cierreTiempo').value || 'No deviations',
        costo: document.getElementById('cierreCosto').value || 'No deviations',
        aceptacion: document.getElementById('cierreAceptacion').value,
        estado: document.getElementById('cierreEstado').value
      };

      var fecha = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      var codigo = 'CL-' + Date.now().toString().slice(-6);

      var estadoColor = datos.estado === 'Completed' ? '#10b981' :
                        datos.estado === 'Completed with Observations' ? '#f59e0b' :
                        datos.estado === 'Cancelled' ? '#ef4444' : '#94a3b8';

      // ========== CONTENIDO DEL DOCUMENTO (con valores en inglés) ==========
      var contenido = `
      <div style="background:linear-gradient(135deg,#1e3a8a,#3b82f6);color:white;padding:30px;border-radius:16px 16px 0 0;text-align:center;">
        <h1 style="margin:0;font-size:28px;">${t.closureTitle}</h1>
        <p style="margin:8px 0 0 0;opacity:0.9;">${t.closureSubtitle}</p>
        <div style="margin-top:15px;display:flex;justify-content:center;gap:20px;flex-wrap:wrap;">
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.closureCode}: ${codigo}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.closureDate}: ${fecha}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.closureProject}: ${proyecto.name}</div>
        </div>
      </div>
      <div style="padding:30px;background:white;color:#1e293b;">
        <!-- Resumen -->
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;background:#f8fafc;padding:20px;border-radius:12px;">
          <div>
            <h2 style="margin:0;color:#1e3a8a;font-size:18px;">📋 ${t.closureStatus}</h2>
            <p style="margin:5px 0 0 0;color:#64748b;font-size:13px;">${t.closureFinalProgress}: <strong>${porcentajeAvance}%</strong></p>
          </div>
          <div style="text-align:center;">
            <div style="font-size:20px;font-weight:bold;color:${estadoColor};">${datos.estado}</div>
            <div style="background:#e2e8f0;height:8px;width:150px;border-radius:4px;margin-top:5px;">
              <div style="width:${porcentajeAvance}%;height:100%;background:${estadoColor};border-radius:4px;"></div>
            </div>
          </div>
        </div>

        <!-- Cronograma -->
        <h2 style="color:#1e3a8a;border-left:6px solid #3b82f6;padding-left:20px;margin:30px 0 20px 0;">📅 ${t.closureStartDate}</h2>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:30px;">
          <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #3b82f6;">
            <div style="font-size:13px;color:#64748b;">${t.closureStartDate}</div>
            <div style="font-size:24px;font-weight:bold;color:#1e40af;">${datos.fechaInicio}</div>
          </div>
          <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #3b82f6;">
            <div style="font-size:13px;color:#64748b;">${t.closureEndDate}</div>
            <div style="font-size:24px;font-weight:bold;color:#1e40af;">${datos.fechaFin}</div>
          </div>
          <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #8b5cf6;">
            <div style="font-size:13px;color:#64748b;">${t.closureDuration}</div>
            <div style="font-size:24px;font-weight:bold;color:#6d28d9;">${duracion}</div>
          </div>
        </div>

        <!-- Métricas -->
        <h2 style="color:#1e3a8a;border-left:6px solid #3b82f6;padding-left:20px;margin:30px 0 20px 0;">📊 ${t.closureTotalTasks}</h2>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin-bottom:30px;">
          <div style="background:#f8fafc;padding:15px;border-radius:12px;text-align:center;border-top:4px solid #3b82f6;">
            <div style="font-size:24px;font-weight:bold;color:#1e40af;">${total}</div>
            <div style="font-size:11px;color:#64748b;">${t.closureTotalTasks}</div>
          </div>
          <div style="background:#dcfce7;padding:15px;border-radius:12px;text-align:center;border-top:4px solid #10b981;">
            <div style="font-size:24px;font-weight:bold;color:#166534;">${completadas}</div>
            <div style="font-size:11px;color:#64748b;">✅ ${t.closureCompletedTasks}</div>
          </div>
          <div style="background:#fef3c7;padding:15px;border-radius:12px;text-align:center;border-top:4px solid #f59e0b;">
            <div style="font-size:24px;font-weight:bold;color:#92400e;">${enProgreso}</div>
            <div style="font-size:11px;color:#64748b;">🔄 ${t.closureInProgress}</div>
          </div>
          <div style="background:#fee2e2;padding:15px;border-radius:12px;text-align:center;border-top:4px solid #ef4444;">
            <div style="font-size:24px;font-weight:bold;color:#991b1b;">${atrasadas}</div>
            <div style="font-size:11px;color:#64748b;">🔴 ${t.closureOverdue}</div>
          </div>
        </div>

        <!-- Horas -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:30px;">
          <div style="background:#fef3c7;padding:20px;border-radius:12px;text-align:center;border-left:5px solid #f59e0b;">
            <div style="font-size:13px;color:#92400e;">${t.closureEstimatedHours}</div>
            <div style="font-size:28px;font-weight:bold;color:#92400e;">${horasEst}h</div>
          </div>
          <div style="background:#fee2e2;padding:20px;border-radius:12px;text-align:center;border-left:5px solid #ef4444;">
            <div style="font-size:13px;color:#991b1b;">${t.closureActualHours}</div>
            <div style="font-size:28px;font-weight:bold;color:#991b1b;">${horasReg}h</div>
          </div>
        </div>

        <!-- Desviaciones -->
        <h2 style="color:#1e3a8a;border-left:6px solid #ef4444;padding-left:20px;margin:30px 0 20px 0;">⚠️ ${t.closureStatus}</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:30px;font-size:13px;">
          <thead>
            <tr style="background:#fee2e2;">
              <th style="padding:12px;border:1px solid #fecaca;text-align:left;">Type</th>
              <th style="padding:12px;border:1px solid #fecaca;text-align:left;">Description</th>
              <th style="padding:12px;border:1px solid #fecaca;text-align:center;">Impact</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding:12px;border:1px solid #e2e8f0;font-weight:bold;">📐 Scope</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">${datos.alcance}</td>
                <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">${datos.alcance !== 'No deviations' ? '🔴 High' : '🟢 None'}</td>
            </tr>
            <tr><td style="padding:12px;border:1px solid #e2e8f0;font-weight:bold;">📅 Time</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">${datos.tiempo}</td>
                <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">${datos.tiempo !== 'No deviations' ? '🟡 Medium' : '🟢 None'}</td>
            </tr>
            <tr><td style="padding:12px;border:1px solid #e2e8f0;font-weight:bold;">💰 Cost</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">${datos.costo}</td>
                <td style="padding:12px;border:1px solid #e2e8f0;text-align:center;">${datos.costo !== 'No deviations' ? '🔴 High' : '🟢 None'}</td>
            </tr>
          </tbody>
        </table>

        <!-- Lecciones -->
        <h2 style="color:#1e3a8a;border-left:6px solid #3b82f6;padding-left:20px;margin:30px 0 20px 0;">${t.closureWhatWorked}</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:30px;">
          <div style="background:#dcfce7;padding:20px;border-radius:12px;border-left:5px solid #10b981;">
            <h4 style="margin:0 0 10px 0;color:#166534;">${t.closureWhatWorked}</h4>
            <p style="color:#374151;font-size:13px;line-height:1.6;margin:0;">${datos.exito}</p>
          </div>
          <div style="background:#fef3c7;padding:20px;border-radius:12px;border-left:5px solid #f59e0b;">
            <h4 style="margin:0 0 10px 0;color:#92400e;">${t.closureWhatImprove}</h4>
            <p style="color:#374151;font-size:13px;line-height:1.6;margin:0;">${datos.mejora}</p>
          </div>
        </div>

        <!-- Aceptación -->
        <h2 style="color:#1e3a8a;border-left:6px solid #10b981;padding-left:20px;margin:30px 0 20px 0;">${t.closureAcceptance}</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:30px;">
          <tr><td style="padding:15px;border:1px solid #e2e8f0;background:#f8fafc;width:30%;"><strong>${t.closureAcceptanceLabel}</strong></td>
              <td style="padding:15px;border:1px solid #e2e8f0;font-weight:bold;color:${datos.aceptacion === 'Yes' ? '#166534' : datos.aceptacion === 'Partial' ? '#92400e' : '#991b1b'};">${datos.aceptacion}</td>
          </tr>
          <tr><td style="padding:15px;border:1px solid #e2e8f0;background:#f8fafc;"><strong>${t.closureStatusLabel}</strong></td>
              <td style="padding:15px;border:1px solid #e2e8f0;font-weight:bold;color:${estadoColor};">${datos.estado}</td>
          </tr>
        </table>

        <!-- Checklist -->
        <h2 style="color:#1e3a8a;border-left:6px solid #10b981;padding-left:20px;margin:30px 0 20px 0;">${t.closureChecklist}</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:10px;border:1px solid #e2e8f0;background:#dcfce7;color:#166534;">✅ ${t.closureChecklist1}</td>
              <td style="padding:10px;border:1px solid #e2e8f0;background:#dcfce7;color:#166534;">✅ ${t.closureChecklist2}</td></tr>
          <tr><td style="padding:10px;border:1px solid #e2e8f0;background:#dcfce7;color:#166534;">✅ ${t.closureChecklist3}</td>
              <td style="padding:10px;border:1px solid #e2e8f0;background:#dcfce7;color:#166534;">✅ ${t.closureChecklist4}</td></tr>
          <tr><td style="padding:10px;border:1px solid #e2e8f0;background:#dcfce7;color:#166534;">✅ ${t.closureChecklist5}</td>
              <td style="padding:10px;border:1px solid #e2e8f0;background:#dcfce7;color:#166534;">✅ ${t.closureChecklist6}</td></tr>
        </table>

        <!-- Firmas -->
        <h2 style="color:#1e3a8a;border-left:6px solid #3b82f6;padding-left:20px;margin:30px 0 20px 0;">${t.closureApprovals}</h2>
        <p style="color:#64748b;margin-bottom:20px;font-size:13px;">The following signatures indicate formal acceptance of project closure:</p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <thead><tr style="background:#1e3a8a;color:white;"><th style="padding:15px;text-align:left;">Role</th><th style="padding:15px;text-align:left;">Name</th><th style="padding:15px;text-align:left;">Signature</th><th style="padding:15px;text-align:left;">Date</th></tr></thead>
          <tbody>
            <tr style="background:#f8fafc;"><td style="padding:15px;border:1px solid #e2e8f0;">${t.closureSponsorRole}</td>
                <td style="padding:15px;border:1px solid #e2e8f0;">${datos.sponsor}</td>
                <td style="padding:15px;border:1px solid #e2e8f0;height:50px;"></td>
                <td style="padding:15px;border:1px solid #e2e8f0;">${fecha}</td>
            </tr>
            <tr style="background:white;"><td style="padding:15px;border:1px solid #e2e8f0;">${t.closurePMRole}</td>
                <td style="padding:15px;border:1px solid #e2e8f0;">${datos.pm}</td>
                <td style="padding:15px;border:1px solid #e2e8f0;height:50px;"></td>
                <td style="padding:15px;border:1px solid #e2e8f0;">${fecha}</td>
            </tr>
            <tr style="background:#f8fafc;"><td style="padding:15px;border:1px solid #e2e8f0;">${t.closureClientRole}</td>
                <td style="padding:15px;border:1px solid #e2e8f0;">_________________</td>
                <td style="padding:15px;border:1px solid #e2e8f0;height:50px;"></td>
                <td style="padding:15px;border:1px solid #e2e8f0;">${fecha}</td>
            </tr>
            <tr style="background:white;"><td style="padding:15px;border:1px solid #e2e8f0;">${t.closurePMORole}</td>
                <td style="padding:15px;border:1px solid #e2e8f0;">_________________</td>
                <td style="padding:15px;border:1px solid #e2e8f0;height:50px;"></td>
                <td style="padding:15px;border:1px solid #e2e8f0;">${fecha}</td>
            </tr>
          </tbody>
        </table>

        <!-- Footer -->
        <div style="margin-top:40px;padding:20px;background:#f8fafc;border-radius:12px;text-align:center;">
          <p style="color:#64748b;font-size:12px;">
            <strong>${t.closureConfidential}</strong><br>
            ${t.closureMethodology}<br>
            ${t.closureAutoGenerated} - ${fecha}
          </p>
        </div>
      </div>`;

      var htmlCompleto = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Closure Report - ${proyecto.name}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body { font-family: 'Inter','Segoe UI',sans-serif; margin:0; padding:20px; background:#f1f5f9; }
          .document-container { max-width:1200px; margin:0 auto; background:white; border-radius:16px; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1); overflow:hidden; }
          @media print { body { background:white; padding:0; } .document-container { box-shadow:none; margin:0; max-width:100%; } button[onclick*="print"] { display:none !important; } }
        </style>
      </head>
      <body>
        <div class="document-container">${contenido}</div>
        <div style="position:fixed;bottom:20px;right:20px;z-index:1000;">
          <button onclick="window.print();" style="background:#3b82f6;border:none;padding:12px 24px;border-radius:40px;color:white;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.2);cursor:pointer;display:flex;align-items:center;gap:8px;">🖨️ Print Closure Report</button>
        </div>
      </body>
      </html>`;

      var win = window.open('', '_blank');
      if (!win) { alert('⚠️ Please allow popup windows.'); return; }
      win.document.write(htmlCompleto);
      win.document.close();
      win.document.title = 'Closure_Report_' + proyecto.name.replace(/\s+/g, '_');

      var hist = JSON.parse(localStorage.getItem('actasCierre') || '[]');
      hist.push({ proyecto: proyecto.name, fecha: new Date().toISOString(), codigo: codigo, estado: datos.estado });
      localStorage.setItem('actasCierre', JSON.stringify(hist));

      console.log('✅ ' + t.closureGenerating + ' Code:', codigo);
      modal.remove();
    };
  };

  console.log('✅ Closure Report corregido: valores en inglés para estado y aceptación.');
})();


// ============================================================
// BUSINESS CASE - DEFINITIVO (SIN ERRORES, SIN ALERTAS)
// ============================================================
(function() {
  if (typeof window.translations === 'undefined') window.translations = {};
  var t = window.translations;

  var clavesBC = {
    bcTitle: '📊 Business Case',
    bcSubtitle: 'BUSINESS CASE - EXECUTIVE DOCUMENT',
    bcProject: 'Project',
    bcCode: 'Code',
    bcDate: 'Date',
    bcInvestment: 'Estimated Investment',
    bcBenefit: 'Estimated Benefit',
    bcVAN: 'NPV (Net Present Value)',
    bcTIR: 'IRR (Internal Rate of Return)',
    bcROI: 'ROI (Return on Investment)',
    bcPayback: 'Payback Period',
    bcJustification: 'Strategic Alignment / Justification',
    bcConclusion: 'Conclusion',
    bcRecommended: 'The project is financially viable and recommended for approval.',
    bcReviewNeeded: 'Review of financial assumptions required.',
    bcCancel: 'Cancel',
    bcGenerate: '✅ Generate Business Case',
    bcClose: '✕',
    bcPlaceholderJustification: 'Alignment with business objectives...',
    bcGenerated: '✅ Business Case generated successfully.',
    bcConfidential: '🔒 CONFIDENTIAL - For executive use only',
    bcMethodology: 'Methodology: Financial analysis following PMI standards for business case development',
    bcAutoGenerated: 'Automatically generated by PM Virtual Executive'
  };

  Object.keys(clavesBC).forEach(function(k) {
    if (!t[k]) t[k] = clavesBC[k];
  });

  window.generarBusinessCase = function() {
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      alert('⚠️ No project selected');
      return;
    }

    var tasks = proyecto.tasks || [];
    var totalHoras = tasks.reduce(function(s, t) { return s + (Number(t.estimatedTime) || 0); }, 0);
    var costoHora = 50;
    var costoTotal = totalHoras * costoHora;

    var defaultInversion = costoTotal;
    var defaultBeneficio = Math.round(costoTotal * 1.5);
    var defaultVAN = defaultBeneficio - defaultInversion;
    var defaultTIR = 18;
    var defaultROI = ((defaultBeneficio - defaultInversion) / defaultInversion) * 100;

    // ========== MODAL ==========
    var modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); backdrop-filter:blur(10px); z-index:1000000; display:flex; align-items:center; justify-content:center; overflow-y:auto; padding:20px;';

    var content = document.createElement('div');
    content.style.cssText = 'background:linear-gradient(135deg,#0f172a,#1e293b); border-radius:24px; width:700px; max-width:95vw; max-height:90vh; overflow-y:auto; color:white; border:1px solid #f59e0b; padding:30px;';

    content.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:25px;">
        <h2 style="margin:0;">${t.bcTitle}</h2>
        <button id="closeBCModal" style="background:#ef4444; border:none; color:white; width:40px; height:40px; border-radius:20px; cursor:pointer;">${t.bcClose}</button>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
        <div>
          <label>${t.bcProject}</label>
          <input type="text" id="bcNombre" value="${proyecto.name.replace(/"/g, '&quot;')}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #f59e0b; border-radius:8px; color:white;">
          <label>${t.bcInvestment}</label>
          <input type="number" id="bcInversion" value="${defaultInversion}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #f59e0b; border-radius:8px; color:white;">
          <label>${t.bcBenefit}</label>
          <input type="number" id="bcBeneficio" value="${defaultBeneficio}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #f59e0b; border-radius:8px; color:white;">
          <label>${t.bcVAN}</label>
          <input type="number" id="bcVAN" value="${defaultVAN}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #f59e0b; border-radius:8px; color:white;">
        </div>
        <div>
          <label>${t.bcTIR}</label>
          <input type="number" id="bcTIR" value="${defaultTIR}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #f59e0b; border-radius:8px; color:white;">
          <label>${t.bcROI}</label>
          <input type="number" id="bcROI" value="${defaultROI.toFixed(1)}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #f59e0b; border-radius:8px; color:white;">
          <label>${t.bcPayback}</label>
          <input type="number" id="bcPayback" value="12" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #f59e0b; border-radius:8px; color:white;">
          <label>${t.bcJustification}</label>
          <textarea id="bcJustificacion" rows="3" placeholder="${t.bcPlaceholderJustification}" style="width:100%; padding:8px; background:#0f172a; border:1px solid #f59e0b; border-radius:8px; color:white;"></textarea>
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:15px; margin-top:30px;">
        <button id="cancelBCBtn" style="background:#475569; border:none; color:white; padding:10px 20px; border-radius:8px;">${t.bcCancel}</button>
        <button id="generateBCBtn" style="background:#f59e0b; border:none; color:white; padding:10px 20px; border-radius:8px;">${t.bcGenerate}</button>
      </div>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // Cerrar modal
    document.getElementById('closeBCModal').onclick = function() { modal.remove(); };
    document.getElementById('cancelBCBtn').onclick = function() { modal.remove(); };

    // ========== GENERAR DOCUMENTO ==========
    document.getElementById('generateBCBtn').onclick = function() {
      var nombre = document.getElementById('bcNombre').value.trim();
      var inversion = parseFloat(document.getElementById('bcInversion').value) || 0;
      var beneficio = parseFloat(document.getElementById('bcBeneficio').value) || 0;
      var van = parseFloat(document.getElementById('bcVAN').value) || 0;
      var tir = parseFloat(document.getElementById('bcTIR').value) || 0;
      var roi = parseFloat(document.getElementById('bcROI').value) || 0;
      var payback = parseFloat(document.getElementById('bcPayback').value) || 0;
      var justificacion = document.getElementById('bcJustificacion').value.trim() || 'No justification provided.';

      var fecha = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      var codigo = 'BC-' + Date.now().toString().slice(-6);

      var esViable = van > 0 && tir > 12;

      // ========== CONTENIDO DEL DOCUMENTO ==========
      var contenido = `
      <div style="background:linear-gradient(135deg,#0f172a,#1e293b); color:white; padding:30px; border-radius:16px 16px 0 0; text-align:center;">
        <div style="font-size:48px;">📊</div>
        <h1 style="margin:0;font-size:28px;">${t.bcTitle}</h1>
        <p style="margin:8px 0 0 0;opacity:0.9;">${t.bcSubtitle}</p>
        <div style="margin-top:15px;display:flex;justify-content:center;gap:20px;flex-wrap:wrap;">
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.bcCode}: ${codigo}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.bcDate}: ${fecha}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.bcProject}: ${nombre}</div>
        </div>
      </div>
      <div style="padding:30px;background:white;color:#1e293b;">
        <h2 style="color:#1e3a8a;border-left:6px solid #f59e0b;padding-left:20px;">📋 Executive Summary</h2>
        <p style="line-height:1.8;color:#374151;">This Business Case justifies the investment in the project <strong>${nombre}</strong>. Financial and strategic analyses supporting its execution are presented below.</p>

        <h2 style="color:#1e3a8a;border-left:6px solid #f59e0b;padding-left:20px;margin-top:30px;">💰 Financial Analysis</h2>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin:20px 0;">
          <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #3b82f6;">
            <div style="font-size:13px;color:#64748b;">${t.bcInvestment}</div>
            <div style="font-size:28px;font-weight:bold;color:#1e40af;">€ ${inversion.toLocaleString()}</div>
          </div>
          <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #10b981;">
            <div style="font-size:13px;color:#64748b;">${t.bcBenefit}</div>
            <div style="font-size:28px;font-weight:bold;color:#166534;">€ ${beneficio.toLocaleString()}</div>
          </div>
          <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #8b5cf6;">
            <div style="font-size:13px;color:#64748b;">${t.bcVAN}</div>
            <div style="font-size:28px;font-weight:bold;color:${van >= 0 ? '#6d28d9' : '#991b1b'};">€ ${van.toLocaleString()}</div>
          </div>
          <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #f59e0b;">
            <div style="font-size:13px;color:#64748b;">${t.bcTIR}</div>
            <div style="font-size:28px;font-weight:bold;color:#92400e;">${tir}%</div>
          </div>
          <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #ec4899;">
            <div style="font-size:13px;color:#64748b;">${t.bcROI}</div>
            <div style="font-size:28px;font-weight:bold;color:#be185d;">${roi.toFixed(1)}%</div>
          </div>
          <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #06b6d4;">
            <div style="font-size:13px;color:#64748b;">${t.bcPayback}</div>
            <div style="font-size:28px;font-weight:bold;color:#0891b2;">${payback} months</div>
          </div>
        </div>

        <h2 style="color:#1e3a8a;border-left:6px solid #f59e0b;padding-left:20px;margin-top:30px;">🎯 Strategic Alignment</h2>
        <div style="background:#fef3c7;padding:20px;border-radius:12px;border-left:4px solid #f59e0b;color:#374151;line-height:1.8;">${justificacion}</div>

        <h2 style="color:#1e3a8a;border-left:6px solid #f59e0b;padding-left:20px;margin-top:30px;">${t.bcConclusion}</h2>
        <div style="background:${esViable ? '#dcfce7' : '#fee2e2'};padding:20px;border-radius:12px;border-left:4px solid ${esViable ? '#10b981' : '#ef4444'};color:#374151;">
          <p style="margin:0;font-weight:bold;color:${esViable ? '#166534' : '#991b1b'};">${esViable ? t.bcRecommended : t.bcReviewNeeded}</p>
        </div>

        <div style="margin-top:40px;padding:20px;background:#f8fafc;border-radius:12px;text-align:center;">
          <p style="color:#64748b;font-size:12px;">
            <strong>${t.bcConfidential}</strong><br>
            ${t.bcMethodology}<br>
            ${t.bcAutoGenerated} - ${fecha}
          </p>
        </div>
      </div>`;

      var htmlCompleto = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Business Case - ${nombre}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body { font-family: 'Inter','Segoe UI',sans-serif; margin:0; padding:20px; background:#f1f5f9; }
          .document-container { max-width:1200px; margin:0 auto; background:white; border-radius:16px; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1); overflow:hidden; }
          @media print { body { background:white; padding:0; } .document-container { box-shadow:none; margin:0; max-width:100%; } button[onclick*="print"] { display:none !important; } }
        </style>
      </head>
      <body>
        <div class="document-container">${contenido}</div>
        <div style="position:fixed;bottom:20px;right:20px;z-index:1000;">
          <button onclick="window.print();" style="background:#3b82f6;border:none;padding:12px 24px;border-radius:40px;color:white;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.2);cursor:pointer;display:flex;align-items:center;gap:8px;">🖨️ Print Business Case</button>
        </div>
      </body>
      </html>`;

      var win = window.open('', '_blank');
      if (!win) { alert('⚠️ Please allow popup windows.'); return; }
      win.document.write(htmlCompleto);
      win.document.close();
      win.document.title = 'Business_Case_' + nombre.replace(/\s+/g, '_');

      var hist = JSON.parse(localStorage.getItem('businessCases') || '[]');
      hist.push({ proyecto: nombre, fecha: new Date().toISOString(), codigo: codigo, van: van, tir: tir });
      localStorage.setItem('businessCases', JSON.stringify(hist));

      console.log('✅ ' + t.bcGenerated + ' Code:', codigo);
      modal.remove();
    };
  };

  console.log('✅ Business Case cargado correctamente.');
})();


// ============================================================
// STATUS REPORT - DEFINITIVO (SIN ERRORES, SIN ALERTAS)
// ============================================================
(function() {
  if (typeof window.translations === 'undefined') window.translations = {};
  var t = window.translations;

  var clavesSR = {
    srTitle: '📊 Status Report',
    srSubtitle: 'STATUS REPORT - EXECUTIVE DOCUMENT',
    srProject: 'Project',
    srCode: 'Code',
    srDate: 'Date',
    srPeriod: 'Period',
    srPeriodPlaceholder: 'e.g., Week 12, March 2025',
    srKeyAchievements: 'Key Achievements',
    srNextSteps: 'Next Steps',
    srRisksIssues: 'Risks / Issues',
    srCorrectiveActions: 'Corrective Actions',
    srProgress: 'Progress',
    srSPI: 'SPI',
    srCPI: 'CPI',
    srOverdueTasks: 'Overdue Tasks',
    srCompletedTasks: 'Completed Tasks',
    srTotalTasks: 'Total Tasks',
    srOnTrack: '✅ On Track',
    srObservations: '⚠️ With Observations',
    srAttention: '🔴 Requires Attention',
    srNoTasks: 'No tasks to display',
    srNoTasksMessage: 'Add tasks to generate the report.',
    srCancel: 'Cancel',
    srGenerate: '✅ Generate Status Report',
    srClose: '✕',
    srGenerated: '✅ Status Report generated successfully.',
    srConfidential: '🔒 CONFIDENTIAL - For executive use only',
    srMethodology: 'Methodology: Status reporting following PMI standards for project monitoring',
    srAutoGenerated: 'Automatically generated by PM Virtual Executive',
    srPlaceholderAchievements: 'e.g., Architecture design completed...',
    srPlaceholderNext: 'e.g., Module X development...',
    srPlaceholderRisks: 'e.g., Resource constraints...',
    srPlaceholderActions: 'e.g., Reassign resources...',
    srGeneralStatus: 'General Status'
  };

  Object.keys(clavesSR).forEach(function(k) {
    if (!t[k]) t[k] = clavesSR[k];
  });

  window.generarStatusReport = function() {
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      alert('⚠️ No project selected');
      return;
    }

    var tasks = proyecto.tasks || [];
    if (tasks.length === 0) {
      alert('⚠️ ' + t.srNoTasks);
      return;
    }

    // ========== CÁLCULOS ==========
    var total = tasks.length;
    var completadas = tasks.filter(function(t) { return t.status === 'completed'; }).length;
    var enProgreso = tasks.filter(function(t) { return t.status === 'inProgress'; }).length;
    var pendientes = tasks.filter(function(t) { return t.status === 'pending'; }).length;
    var atrasadas = tasks.filter(function(t) {
      return t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed';
    }).length;
    var horasEst = tasks.reduce(function(s, t) { return s + (Number(t.estimatedTime) || 0); }, 0);
    var horasReg = tasks.reduce(function(s, t) { return s + (Number(t.timeLogged) || 0); }, 0);
    var progreso = total > 0 ? Math.round((completadas / total) * 100) : 0;

    var SPI = horasEst > 0 ? (horasReg / horasEst) : 1;
    var CPI = horasEst > 0 ? (horasReg / horasEst) : 1;

    var estadoGeneral = (SPI >= 0.9 && CPI >= 0.9) ? t.srOnTrack :
                        (SPI >= 0.8 || CPI >= 0.8) ? t.srObservations : t.srAttention;
    var colorEstado = (SPI >= 0.9 && CPI >= 0.9) ? '#10b981' :
                      (SPI >= 0.8 || CPI >= 0.8) ? '#f59e0b' : '#ef4444';

    // ========== MODAL ==========
    var modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); backdrop-filter:blur(10px); z-index:1000000; display:flex; align-items:center; justify-content:center; overflow-y:auto; padding:20px;';

    var content = document.createElement('div');
    content.style.cssText = 'background:linear-gradient(135deg,#0f172a,#1e293b); border-radius:24px; width:700px; max-width:95vw; max-height:90vh; overflow-y:auto; color:white; border:1px solid #10b981; padding:30px;';

    // Calcular semana aproximada
    var startDate = tasks.length && tasks[0].startDate ? new Date(tasks[0].startDate) : new Date();
    var weekNumber = Math.floor((new Date() - startDate) / (7 * 24 * 3600 * 1000)) + 1;
    var defaultPeriod = 'Week ' + weekNumber + ', ' + new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    content.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:25px;">
        <h2 style="margin:0;">${t.srTitle}</h2>
        <button id="closeSRModal" style="background:#ef4444; border:none; color:white; width:40px; height:40px; border-radius:20px; cursor:pointer;">${t.srClose}</button>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
        <div style="grid-column:span 2;">
          <label>${t.srPeriod}</label>
          <input type="text" id="srPeriodo" value="${defaultPeriod}" placeholder="${t.srPeriodPlaceholder}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #10b981; border-radius:8px; color:white;">
        </div>
        <div style="grid-column:span 2;">
          <label>${t.srKeyAchievements}</label>
          <textarea id="srLogros" rows="3" placeholder="${t.srPlaceholderAchievements}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #10b981; border-radius:8px; color:white;"></textarea>
        </div>
        <div style="grid-column:span 2;">
          <label>${t.srNextSteps}</label>
          <textarea id="srProximos" rows="3" placeholder="${t.srPlaceholderNext}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #10b981; border-radius:8px; color:white;"></textarea>
        </div>
        <div style="grid-column:span 2;">
          <label>${t.srRisksIssues}</label>
          <textarea id="srRiesgos" rows="2" placeholder="${t.srPlaceholderRisks}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #10b981; border-radius:8px; color:white;"></textarea>
        </div>
        <div style="grid-column:span 2;">
          <label>${t.srCorrectiveActions}</label>
          <textarea id="srAcciones" rows="2" placeholder="${t.srPlaceholderActions}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #10b981; border-radius:8px; color:white;"></textarea>
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:15px; margin-top:30px;">
        <button id="cancelSRBtn" style="background:#475569; border:none; color:white; padding:10px 20px; border-radius:8px;">${t.srCancel}</button>
        <button id="generateSRBtn" style="background:#10b981; border:none; color:white; padding:10px 20px; border-radius:8px;">${t.srGenerate}</button>
      </div>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // Cerrar modal
    document.getElementById('closeSRModal').onclick = function() { modal.remove(); };
    document.getElementById('cancelSRBtn').onclick = function() { modal.remove(); };

    // ========== GENERAR DOCUMENTO ==========
    document.getElementById('generateSRBtn').onclick = function() {
      var periodo = document.getElementById('srPeriodo').value.trim() || defaultPeriod;
      var logros = document.getElementById('srLogros').value.trim() || 'No specific achievements recorded.';
      var proximos = document.getElementById('srProximos').value.trim() || 'To be defined.';
      var riesgos = document.getElementById('srRiesgos').value.trim() || 'No new risks identified.';
      var acciones = document.getElementById('srAcciones').value.trim() || 'No corrective actions.';

      var fecha = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      var codigo = 'SR-' + Date.now().toString().slice(-6);

      // ========== CONTENIDO DEL DOCUMENTO ==========
      var contenido = `
      <div style="background:linear-gradient(135deg,#0f172a,#1e293b); color:white; padding:30px; border-radius:16px 16px 0 0; text-align:center;">
        <div style="font-size:48px;">📊</div>
        <h1 style="margin:0;font-size:28px;">${t.srTitle}</h1>
        <p style="margin:8px 0 0 0;opacity:0.9;">${t.srSubtitle}</p>
        <div style="margin-top:15px;display:flex;justify-content:center;gap:20px;flex-wrap:wrap;">
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.srCode}: ${codigo}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.srDate}: ${fecha}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.srProject}: ${proyecto.name}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.srPeriod}: ${periodo}</div>
        </div>
      </div>
      <div style="padding:30px;background:white;color:#1e293b;">
        <!-- Estado General -->
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;background:#f8fafc;padding:20px;border-radius:12px;border-left:4px solid ${colorEstado};">
          <div>
            <h2 style="margin:0;color:#1e3a8a;font-size:18px;">📋 ${t.srGeneralStatus}</h2>
            <p style="margin:5px 0 0 0;color:#64748b;font-size:13px;">${t.srProgress}: <strong>${progreso}%</strong></p>
          </div>
          <div style="text-align:center;">
            <div style="font-size:24px;font-weight:bold;color:${colorEstado};">${estadoGeneral}</div>
            <div style="background:#e2e8f0;height:8px;width:150px;border-radius:4px;margin-top:5px;">
              <div style="width:${progreso}%;height:100%;background:${colorEstado};border-radius:4px;"></div>
            </div>
          </div>
        </div>

        <!-- KPIs -->
        <h2 style="color:#1e3a8a;border-left:6px solid #10b981;padding-left:20px;margin:30px 0 20px 0;">📊 Key Performance Indicators</h2>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin-bottom:30px;">
          <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #3b82f6;">
            <div style="font-size:24px;font-weight:bold;color:#1e40af;">${progreso}%</div>
            <div style="font-size:11px;color:#64748b;">${t.srProgress}</div>
          </div>
          <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #8b5cf6;">
            <div style="font-size:24px;font-weight:bold;color:#6d28d9;">${SPI.toFixed(2)}</div>
            <div style="font-size:11px;color:#64748b;">${t.srSPI}</div>
          </div>
          <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #ec4899;">
            <div style="font-size:24px;font-weight:bold;color:#be185d;">${CPI.toFixed(2)}</div>
            <div style="font-size:11px;color:#64748b;">${t.srCPI}</div>
          </div>
          <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #ef4444;">
            <div style="font-size:24px;font-weight:bold;color:#991b1b;">${atrasadas}</div>
            <div style="font-size:11px;color:#64748b;">${t.srOverdueTasks}</div>
          </div>
        </div>

        <!-- Logros -->
        <h2 style="color:#1e3a8a;border-left:6px solid #10b981;padding-left:20px;margin:30px 0 20px 0;">✅ ${t.srKeyAchievements}</h2>
        <div style="background:#f0fdf4;padding:20px;border-radius:12px;border-left:4px solid #10b981;color:#374151;line-height:1.8;">${logros}</div>

        <!-- Próximos Pasos -->
        <h2 style="color:#1e3a8a;border-left:6px solid #f59e0b;padding-left:20px;margin:30px 0 20px 0;">📌 ${t.srNextSteps}</h2>
        <div style="background:#fef3c7;padding:20px;border-radius:12px;border-left:4px solid #f59e0b;color:#374151;line-height:1.8;">${proximos}</div>

        <!-- Riesgos -->
        <h2 style="color:#1e3a8a;border-left:6px solid #ef4444;padding-left:20px;margin:30px 0 20px 0;">⚠️ ${t.srRisksIssues}</h2>
        <div style="background:#fee2e2;padding:20px;border-radius:12px;border-left:4px solid #ef4444;color:#374151;line-height:1.8;">${riesgos}</div>

        <!-- Acciones Correctivas -->
        <h2 style="color:#1e3a8a;border-left:6px solid #3b82f6;padding-left:20px;margin:30px 0 20px 0;">🛠️ ${t.srCorrectiveActions}</h2>
        <div style="background:#e0f2fe;padding:20px;border-radius:12px;border-left:4px solid #3b82f6;color:#374151;line-height:1.8;">${acciones}</div>

        <!-- Resumen de tareas -->
        <h2 style="color:#1e3a8a;border-left:6px solid #3b82f6;padding-left:20px;margin:30px 0 20px 0;">📋 Task Summary</h2>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin-bottom:20px;">
          <div style="background:#dcfce7;padding:15px;border-radius:12px;text-align:center;">
            <div style="font-size:20px;font-weight:bold;color:#166534;">${completadas}</div>
            <div style="font-size:11px;color:#64748b;">✅ ${t.srCompletedTasks}</div>
          </div>
          <div style="background:#fef3c7;padding:15px;border-radius:12px;text-align:center;">
            <div style="font-size:20px;font-weight:bold;color:#92400e;">${enProgreso}</div>
            <div style="font-size:11px;color:#64748b;">🔄 ${t.srNextSteps}</div>
          </div>
          <div style="background:#f1f5f9;padding:15px;border-radius:12px;text-align:center;">
            <div style="font-size:20px;font-weight:bold;color:#475569;">${pendientes}</div>
            <div style="font-size:11px;color:#64748b;">⏳ Pending</div>
          </div>
          <div style="background:#fee2e2;padding:15px;border-radius:12px;text-align:center;">
            <div style="font-size:20px;font-weight:bold;color:#991b1b;">${atrasadas}</div>
            <div style="font-size:11px;color:#64748b;">🔴 ${t.srOverdueTasks}</div>
          </div>
        </div>

        <!-- Footer -->
        <div style="margin-top:40px;padding:20px;background:#f8fafc;border-radius:12px;text-align:center;">
          <p style="color:#64748b;font-size:12px;">
            <strong>${t.srConfidential}</strong><br>
            ${t.srMethodology}<br>
            ${t.srAutoGenerated} - ${fecha}
          </p>
        </div>
      </div>`;

      var htmlCompleto = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Status Report - ${proyecto.name}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body { font-family: 'Inter','Segoe UI',sans-serif; margin:0; padding:20px; background:#f1f5f9; }
          .document-container { max-width:1200px; margin:0 auto; background:white; border-radius:16px; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1); overflow:hidden; }
          @media print { body { background:white; padding:0; } .document-container { box-shadow:none; margin:0; max-width:100%; } button[onclick*="print"] { display:none !important; } }
        </style>
      </head>
      <body>
        <div class="document-container">${contenido}</div>
        <div style="position:fixed;bottom:20px;right:20px;z-index:1000;">
          <button onclick="window.print();" style="background:#3b82f6;border:none;padding:12px 24px;border-radius:40px;color:white;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.2);cursor:pointer;display:flex;align-items:center;gap:8px;">🖨️ Print Status Report</button>
        </div>
      </body>
      </html>`;

      var win = window.open('', '_blank');
      if (!win) { alert('⚠️ Please allow popup windows.'); return; }
      win.document.write(htmlCompleto);
      win.document.close();
      win.document.title = 'Status_Report_' + proyecto.name.replace(/\s+/g, '_');

      var hist = JSON.parse(localStorage.getItem('statusReports') || '[]');
      hist.push({ proyecto: proyecto.name, fecha: new Date().toISOString(), codigo: codigo, periodo: periodo });
      localStorage.setItem('statusReports', JSON.stringify(hist));

      console.log('✅ ' + t.srGenerated + ' Code:', codigo);
      modal.remove();
    };
  };

  console.log('✅ Status Report cargado correctamente.');
})();


// ============================================================
// ISSUE LOG - DEFINITIVO (SIN ERRORES, SIN ALERTAS)
// ============================================================
(function() {
  if (typeof window.translations === 'undefined') window.translations = {};
  var t = window.translations;

  var clavesIL = {
    ilTitle: '⚠️ Issue Log',
    ilSubtitle: 'ISSUE LOG - EXECUTIVE DOCUMENT',
    ilProject: 'Project',
    ilCode: 'Code',
    ilDate: 'Date',
    ilTotal: 'Total Issues',
    ilOpen: 'Open',
    ilInProgress: 'In Progress',
    ilClosed: 'Closed',
    ilID: 'ID',
    ilDescription: 'Description',
    ilImpact: 'Impact',
    ilResponsible: 'Responsible',
    ilDateCreated: 'Date Created',
    ilDateResolved: 'Date Resolved',
    ilStatus: 'Status',
    ilActions: 'Actions',
    ilAddIssue: '+ Add Issue',
    ilDelete: 'Delete',
    ilCancel: 'Cancel',
    ilGenerate: '✅ Generate Issue Log',
    ilClose: '✕',
    ilPlaceholderDesc: 'Issue description',
    ilPlaceholderResponsible: 'Responsible person',
    ilPlaceholderResolved: 'Resolution date',
    ilNoIssues: 'No issues registered',
    ilAddFirst: 'Add the first issue using the form above.',
    ilSaved: '✅ Issue saved successfully',
    ilConfirmDelete: 'Delete this issue?',
    ilDeleted: '✅ Issue deleted',
    ilGenerated: '✅ Issue Log generated successfully.',
    ilConfidential: '🔒 CONFIDENTIAL - For internal use only',
    ilMethodology: 'Methodology: Issue tracking following PMI standards for project monitoring',
    ilAutoGenerated: 'Automatically generated by PM Virtual Executive'
  };

  Object.keys(clavesIL).forEach(function(k) {
    if (!t[k]) t[k] = clavesIL[k];
  });

  window.generarIssueLog = function() {
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      alert('⚠️ No project selected');
      return;
    }

    var issues = JSON.parse(localStorage.getItem('issueLog') || '[]');
    var issuesProyecto = issues.filter(function(i) { return i.projectId === proyecto.name; });

    // ========== MODAL ==========
    var modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); backdrop-filter:blur(10px); z-index:1000000; display:flex; align-items:center; justify-content:center; overflow-y:auto; padding:20px;';

    var content = document.createElement('div');
    content.style.cssText = 'background:linear-gradient(135deg,#0f172a,#1e293b); border-radius:24px; width:850px; max-width:95vw; max-height:90vh; overflow-y:auto; color:white; border:1px solid #ef4444; padding:30px;';

    content.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
        <h2 style="margin:0;">${t.ilTitle}</h2>
        <span style="color:#94a3b8;font-size:12px;">${issuesProyecto.length} ${t.ilTotal}</span>
      </div>
      <p style="margin:0 0 15px 0;color:#94a3b8;font-size:13px;">${t.ilSubtitle}</p>

      <!-- Formulario para agregar issue -->
      <div style="background:rgba(0,0,0,0.3);padding:15px;border-radius:12px;margin-bottom:15px;">
        <h3 style="color:#ef4444;margin:0 0 10px 0;font-size:14px;">${t.ilAddIssue}</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div style="grid-column:span 2;">
            <input type="text" id="issueDesc" placeholder="${t.ilPlaceholderDesc}" style="width:100%;padding:8px;border-radius:6px;border:1px solid #ef4444;background:#0f172a;color:white;font-size:13px;">
          </div>
          <div>
            <select id="issueImpacto" style="width:100%;padding:8px;border-radius:6px;border:1px solid #ef4444;background:#0f172a;color:white;font-size:13px;">
              <option>Low</option>
              <option selected>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
          <div>
            <input type="text" id="issueResponsable" placeholder="${t.ilPlaceholderResponsible}" style="width:100%;padding:8px;border-radius:6px;border:1px solid #ef4444;background:#0f172a;color:white;font-size:13px;">
          </div>
          <div style="grid-column:span 2;">
            <input type="date" id="issueFechaSol" placeholder="${t.ilPlaceholderResolved}" style="width:100%;padding:8px;border-radius:6px;border:1px solid #ef4444;background:#0f172a;color:white;font-size:13px;">
          </div>
        </div>
        <button id="addIssueBtn" style="margin-top:10px;background:#3b82f6;border:none;padding:8px 20px;border-radius:8px;color:white;cursor:pointer;font-weight:bold;font-size:13px;">${t.ilAddIssue}</button>
      </div>

      <!-- Lista de issues -->
      <div id="issueList" style="flex:1;overflow-y:auto;margin-bottom:10px;max-height:250px;">
        ${issuesProyecto.length === 0 ? '<p style="text-align:center;color:#94a3b8;padding:20px;">' + t.ilNoIssues + '<br><span style="font-size:12px;">' + t.ilAddFirst + '</span></p>' :
          issuesProyecto.map(function(issue, idx) {
            var statusColor = issue.estado === 'Closed' ? '#10b981' : (issue.estado === 'In Progress' ? '#f59e0b' : '#ef4444');
            return '<div style="background:rgba(0,0,0,0.2);padding:10px;border-radius:8px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;border-left:3px solid ' + statusColor + ';">' +
              '<div><strong>#' + issue.id + '</strong> ' + issue.descripcion.substring(0, 50) + (issue.descripcion.length > 50 ? '...' : '') +
              ' <span style="font-size:10px;color:#94a3b8;">' + issue.estado + ' · ' + issue.impacto + '</span></div>' +
              '<div><select data-id="' + issue.id + '" class="issue-status" style="background:#0f172a;border:1px solid #ef4444;border-radius:4px;padding:2px;color:white;font-size:11px;">' +
                '<option ' + (issue.estado === 'Open' ? 'selected' : '') + '>Open</option>' +
                '<option ' + (issue.estado === 'In Progress' ? 'selected' : '') + '>In Progress</option>' +
                '<option ' + (issue.estado === 'Closed' ? 'selected' : '') + '>Closed</option>' +
              '</select>' +
              '<button data-id="' + issue.id + '" class="delete-issue" style="background:#ef4444;border:none;padding:2px 8px;border-radius:4px;color:white;cursor:pointer;font-size:11px;margin-left:5px;">🗑️</button></div></div>';
          }).join('')
        }
      </div>

      <div style="display:flex;gap:10px;justify-content:center;padding-top:15px;border-top:1px solid #ef4444;flex-shrink:0;">
        <button id="generateILBtn" style="background:#10b981;border:none;padding:10px 25px;border-radius:8px;color:white;cursor:pointer;font-size:14px;font-weight:bold;">${t.ilGenerate}</button>
        <button id="cancelILBtn" style="background:#ef4444;border:none;padding:10px 25px;border-radius:8px;color:white;cursor:pointer;font-size:14px;font-weight:bold;">${t.ilCancel}</button>
      </div>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // ========== FUNCIONES ==========
    function actualizarLista() {
      var lista = document.getElementById('issueList');
      var nuevas = issues.filter(function(i) { return i.projectId === proyecto.name; });
      if (nuevas.length === 0) {
        lista.innerHTML = '<p style="text-align:center;color:#94a3b8;padding:20px;">' + t.ilNoIssues + '<br><span style="font-size:12px;">' + t.ilAddFirst + '</span></p>';
      } else {
        lista.innerHTML = nuevas.map(function(issue, idx) {
          var statusColor = issue.estado === 'Closed' ? '#10b981' : (issue.estado === 'In Progress' ? '#f59e0b' : '#ef4444');
          return '<div style="background:rgba(0,0,0,0.2);padding:10px;border-radius:8px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;border-left:3px solid ' + statusColor + ';">' +
            '<div><strong>#' + issue.id + '</strong> ' + (issue.descripcion ? issue.descripcion.substring(0, 50) : '') + (issue.descripcion && issue.descripcion.length > 50 ? '...' : '') +
            ' <span style="font-size:10px;color:#94a3b8;">' + issue.estado + ' · ' + issue.impacto + '</span></div>' +
            '<div><select data-id="' + issue.id + '" class="issue-status" style="background:#0f172a;border:1px solid #ef4444;border-radius:4px;padding:2px;color:white;font-size:11px;">' +
              '<option ' + (issue.estado === 'Open' ? 'selected' : '') + '>Open</option>' +
              '<option ' + (issue.estado === 'In Progress' ? 'selected' : '') + '>In Progress</option>' +
              '<option ' + (issue.estado === 'Closed' ? 'selected' : '') + '>Closed</option>' +
            '</select>' +
            '<button data-id="' + issue.id + '" class="delete-issue" style="background:#ef4444;border:none;padding:2px 8px;border-radius:4px;color:white;cursor:pointer;font-size:11px;margin-left:5px;">🗑️</button></div></div>';
        }).join('');

        // Eventos de cambio de estado
        lista.querySelectorAll('.issue-status').forEach(function(sel) {
          sel.onchange = function() {
            var id = parseInt(this.dataset.id);
            var newStatus = this.value;
            var globalIdx = issues.findIndex(function(i) { return i.id === id; });
            if (globalIdx !== -1) {
              issues[globalIdx].estado = newStatus;
              localStorage.setItem('issueLog', JSON.stringify(issues));
              actualizarLista();
            }
          };
        });

        // Eventos de eliminación
        lista.querySelectorAll('.delete-issue').forEach(function(btn) {
          btn.onclick = function() {
            var id = parseInt(this.dataset.id);
            if (confirm(t.ilConfirmDelete)) {
              var globalIdx = issues.findIndex(function(i) { return i.id === id; });
              if (globalIdx !== -1) {
                issues.splice(globalIdx, 1);
                localStorage.setItem('issueLog', JSON.stringify(issues));
                actualizarLista();
              }
            }
          };
        });
      }
    }

    // ========== AGREGAR ISSUE ==========
    document.getElementById('addIssueBtn').onclick = function() {
      var desc = document.getElementById('issueDesc').value.trim();
      if (!desc) { alert('⚠️ Description is required'); return; }

      var nuevo = {
        id: Date.now(),
        projectId: proyecto.name,
        descripcion: desc,
        impacto: document.getElementById('issueImpacto').value,
        responsable: document.getElementById('issueResponsable').value.trim() || 'Unassigned',
        fecha: new Date().toLocaleDateString('en-US'),
        fechaSolucion: document.getElementById('issueFechaSol').value || '',
        estado: 'Open'
      };

      issues.push(nuevo);
      localStorage.setItem('issueLog', JSON.stringify(issues));

      document.getElementById('issueDesc').value = '';
      document.getElementById('issueResponsable').value = '';
      document.getElementById('issueFechaSol').value = '';
      actualizarLista();
      alert(t.ilSaved);
    };

    // ========== GENERAR DOCUMENTO ==========
    document.getElementById('generateILBtn').onclick = function() {
      var issuesActuales = issues.filter(function(i) { return i.projectId === proyecto.name; });
      if (issuesActuales.length === 0) {
        alert('⚠️ ' + t.ilNoIssues);
        return;
      }

      var fecha = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      var codigo = 'IL-' + Date.now().toString().slice(-6);

      var abiertas = issuesActuales.filter(function(i) { return i.estado !== 'Closed'; }).length;
      var cerradas = issuesActuales.filter(function(i) { return i.estado === 'Closed'; }).length;

      // ========== CONTENIDO DEL DOCUMENTO ==========
      var filas = issuesActuales.map(function(issue) {
        var statusColor = issue.estado === 'Closed' ? '#10b981' : (issue.estado === 'In Progress' ? '#f59e0b' : '#ef4444');
        return '<tr>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;font-family:monospace;">' + issue.id + '</td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;">' + issue.descripcion + '</td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;"><span style="background:' + (issue.impacto === 'Critical' ? '#ef4444' : issue.impacto === 'High' ? '#f97316' : issue.impacto === 'Medium' ? '#f59e0b' : '#22c55e') + ';color:white;padding:2px 10px;border-radius:12px;font-size:10px;">' + issue.impacto + '</span></td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;">' + (issue.responsable || '-') + '</td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;">' + issue.fecha + '</td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;">' + (issue.fechaSolucion || '-') + '</td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;"><span style="background:' + statusColor + ';color:white;padding:2px 10px;border-radius:12px;font-size:10px;">' + issue.estado + '</span></td></tr>';
      }).join('');

      var contenido = `
      <div style="background:linear-gradient(135deg,#0f172a,#1e293b); color:white; padding:30px; border-radius:16px 16px 0 0; text-align:center;">
        <div style="font-size:48px;">⚠️</div>
        <h1 style="margin:0;font-size:28px;">${t.ilTitle}</h1>
        <p style="margin:8px 0 0 0;opacity:0.9;">${t.ilSubtitle}</p>
        <div style="margin-top:15px;display:flex;justify-content:center;gap:20px;flex-wrap:wrap;">
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.ilCode}: ${codigo}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.ilDate}: ${fecha}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.ilProject}: ${proyecto.name}</div>
        </div>
      </div>
      <div style="padding:30px;background:white;color:#1e293b;">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:30px;">
          <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #3b82f6;">
            <div style="font-size:28px;font-weight:bold;color:#1e40af;">${issuesActuales.length}</div>
            <div style="font-size:11px;color:#64748b;">${t.ilTotal}</div>
          </div>
          <div style="background:#fee2e2;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #ef4444;">
            <div style="font-size:28px;font-weight:bold;color:#991b1b;">${abiertas}</div>
            <div style="font-size:11px;color:#64748b;">${t.ilOpen}</div>
          </div>
          <div style="background:#dcfce7;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #10b981;">
            <div style="font-size:28px;font-weight:bold;color:#166534;">${cerradas}</div>
            <div style="font-size:11px;color:#64748b;">✅ ${t.ilClosed}</div>
          </div>
        </div>

        <table style="width:100%;border-collapse:collapse;font-size:12px;">
          <thead>
            <tr style="background:#fee2e2;">
              <th style="padding:10px;border:1px solid #fecaca;text-align:center;">${t.ilID}</th>
              <th style="padding:10px;border:1px solid #fecaca;text-align:left;">${t.ilDescription}</th>
              <th style="padding:10px;border:1px solid #fecaca;text-align:center;">${t.ilImpact}</th>
              <th style="padding:10px;border:1px solid #fecaca;text-align:center;">${t.ilResponsible}</th>
              <th style="padding:10px;border:1px solid #fecaca;text-align:center;">${t.ilDateCreated}</th>
              <th style="padding:10px;border:1px solid #fecaca;text-align:center;">${t.ilDateResolved}</th>
              <th style="padding:10px;border:1px solid #fecaca;text-align:center;">${t.ilStatus}</th>
            </tr>
          </thead>
          <tbody>${filas}</tbody>
        </table>

        <div style="margin-top:30px;padding:20px;background:#f8fafc;border-radius:12px;text-align:center;">
          <p style="color:#64748b;font-size:12px;">
            <strong>${t.ilConfidential}</strong><br>
            ${t.ilMethodology}<br>
            ${t.ilAutoGenerated} - ${fecha}
          </p>
        </div>
      </div>`;

      var htmlCompleto = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Issue Log - ${proyecto.name}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body { font-family: 'Inter','Segoe UI',sans-serif; margin:0; padding:20px; background:#f1f5f9; }
          .document-container { max-width:1200px; margin:0 auto; background:white; border-radius:16px; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1); overflow:hidden; }
          @media print { body { background:white; padding:0; } .document-container { box-shadow:none; margin:0; max-width:100%; } button[onclick*="print"] { display:none !important; } }
        </style>
      </head>
      <body>
        <div class="document-container">${contenido}</div>
        <div style="position:fixed;bottom:20px;right:20px;z-index:1000;">
          <button onclick="window.print();" style="background:#3b82f6;border:none;padding:12px 24px;border-radius:40px;color:white;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.2);cursor:pointer;display:flex;align-items:center;gap:8px;">🖨️ Print Issue Log</button>
        </div>
      </body>
      </html>`;

      var win = window.open('', '_blank');
      if (!win) { alert('⚠️ Please allow popup windows.'); return; }
      win.document.write(htmlCompleto);
      win.document.close();
      win.document.title = 'Issue_Log_' + proyecto.name.replace(/\s+/g, '_');

      var hist = JSON.parse(localStorage.getItem('issueLogs') || '[]');
      hist.push({ proyecto: proyecto.name, fecha: new Date().toISOString(), codigo: codigo, total: issuesActuales.length });
      localStorage.setItem('issueLogs', JSON.stringify(hist));

      console.log('✅ ' + t.ilGenerated + ' Code:', codigo);
      modal.remove();
    };

    document.getElementById('cancelILBtn').onclick = function() { modal.remove(); };
    actualizarLista();
  };

  console.log('✅ Issue Log cargado correctamente.');
})();


// ============================================================
// DECISION LOG - DEFINITIVO (SIN ERRORES, SIN ALERTAS)
// ============================================================
(function() {
  if (typeof window.translations === 'undefined') window.translations = {};
  var t = window.translations;

  var clavesDL = {
    dlTitle: '📝 Decision Log',
    dlSubtitle: 'DECISION LOG - EXECUTIVE DOCUMENT',
    dlProject: 'Project',
    dlCode: 'Code',
    dlDate: 'Date',
    dlTotal: 'Total Decisions',
    dlID: 'ID',
    dlDecision: 'Decision',
    dlJustification: 'Justification',
    dlResponsible: 'Responsible',
    dlDateMade: 'Date Made',
    dlActions: 'Actions',
    dlAddDecision: '+ Add Decision',
    dlDelete: 'Delete',
    dlCancel: 'Cancel',
    dlGenerate: '✅ Generate Decision Log',
    dlClose: '✕',
    dlPlaceholderDecision: 'Decision taken',
    dlPlaceholderJustification: 'Justification for the decision',
    dlPlaceholderResponsible: 'Responsible person',
    dlNoDecisions: 'No decisions registered',
    dlAddFirst: 'Add the first decision using the form above.',
    dlSaved: '✅ Decision saved successfully',
    dlConfirmDelete: 'Delete this decision?',
    dlDeleted: '✅ Decision deleted',
    dlGenerated: '✅ Decision Log generated successfully.',
    dlConfidential: '🔒 CONFIDENTIAL - For internal use only',
    dlMethodology: 'Methodology: Decision tracking following PMI standards for project governance',
    dlAutoGenerated: 'Automatically generated by PM Virtual Executive'
  };

  Object.keys(clavesDL).forEach(function(k) {
    if (!t[k]) t[k] = clavesDL[k];
  });

  window.generarDecisionLog = function() {
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      alert('⚠️ No project selected');
      return;
    }

    var decisions = JSON.parse(localStorage.getItem('decisionLog') || '[]');
    var decisionsProyecto = decisions.filter(function(d) { return d.projectId === proyecto.name; });

    // ========== MODAL ==========
    var modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); backdrop-filter:blur(10px); z-index:1000000; display:flex; align-items:center; justify-content:center; overflow-y:auto; padding:20px;';

    var content = document.createElement('div');
    content.style.cssText = 'background:linear-gradient(135deg,#0f172a,#1e293b); border-radius:24px; width:750px; max-width:95vw; max-height:90vh; overflow-y:auto; color:white; border:1px solid #8b5cf6; padding:30px;';

    content.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
        <h2 style="margin:0;">${t.dlTitle}</h2>
        <span style="color:#94a3b8;font-size:12px;">${decisionsProyecto.length} ${t.dlTotal}</span>
      </div>
      <p style="margin:0 0 15px 0;color:#94a3b8;font-size:13px;">${t.dlSubtitle}</p>

      <!-- Formulario para agregar decisión -->
      <div style="background:rgba(0,0,0,0.3);padding:15px;border-radius:12px;margin-bottom:15px;">
        <h3 style="color:#8b5cf6;margin:0 0 10px 0;font-size:14px;">${t.dlAddDecision}</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div style="grid-column:span 2;">
            <input type="text" id="decisionDesc" placeholder="${t.dlPlaceholderDecision}" style="width:100%;padding:8px;border-radius:6px;border:1px solid #8b5cf6;background:#0f172a;color:white;font-size:13px;">
          </div>
          <div style="grid-column:span 2;">
            <input type="text" id="decisionJust" placeholder="${t.dlPlaceholderJustification}" style="width:100%;padding:8px;border-radius:6px;border:1px solid #8b5cf6;background:#0f172a;color:white;font-size:13px;">
          </div>
          <div style="grid-column:span 2;">
            <input type="text" id="decisionResp" placeholder="${t.dlPlaceholderResponsible}" style="width:100%;padding:8px;border-radius:6px;border:1px solid #8b5cf6;background:#0f172a;color:white;font-size:13px;">
          </div>
        </div>
        <button id="addDecisionBtn" style="margin-top:10px;background:#3b82f6;border:none;padding:8px 20px;border-radius:8px;color:white;cursor:pointer;font-weight:bold;font-size:13px;">${t.dlAddDecision}</button>
      </div>

      <!-- Lista de decisiones -->
      <div id="decisionList" style="flex:1;overflow-y:auto;margin-bottom:10px;max-height:250px;">
        ${decisionsProyecto.length === 0 ? '<p style="text-align:center;color:#94a3b8;padding:20px;">' + t.dlNoDecisions + '<br><span style="font-size:12px;">' + t.dlAddFirst + '</span></p>' :
          decisionsProyecto.map(function(dec, idx) {
            return '<div style="background:rgba(0,0,0,0.2);padding:10px;border-radius:8px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;border-left:3px solid #8b5cf6;">' +
              '<div><strong>#' + dec.id + '</strong> ' + dec.decision.substring(0, 40) + (dec.decision.length > 40 ? '...' : '') +
              ' <span style="font-size:10px;color:#94a3b8;">' + dec.responsable + ' · ' + dec.fecha + '</span></div>' +
              '<button data-id="' + dec.id + '" class="delete-decision" style="background:#ef4444;border:none;padding:2px 8px;border-radius:4px;color:white;cursor:pointer;font-size:11px;">🗑️</button></div>';
          }).join('')
        }
      </div>

      <div style="display:flex;gap:10px;justify-content:center;padding-top:15px;border-top:1px solid #8b5cf6;flex-shrink:0;">
        <button id="generateDLBtn" style="background:#10b981;border:none;padding:10px 25px;border-radius:8px;color:white;cursor:pointer;font-size:14px;font-weight:bold;">${t.dlGenerate}</button>
        <button id="cancelDLBtn" style="background:#ef4444;border:none;padding:10px 25px;border-radius:8px;color:white;cursor:pointer;font-size:14px;font-weight:bold;">${t.dlCancel}</button>
      </div>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // ========== FUNCIONES ==========
    function actualizarLista() {
      var lista = document.getElementById('decisionList');
      var nuevas = decisions.filter(function(d) { return d.projectId === proyecto.name; });
      if (nuevas.length === 0) {
        lista.innerHTML = '<p style="text-align:center;color:#94a3b8;padding:20px;">' + t.dlNoDecisions + '<br><span style="font-size:12px;">' + t.dlAddFirst + '</span></p>';
      } else {
        lista.innerHTML = nuevas.map(function(dec, idx) {
          return '<div style="background:rgba(0,0,0,0.2);padding:10px;border-radius:8px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;border-left:3px solid #8b5cf6;">' +
            '<div><strong>#' + dec.id + '</strong> ' + (dec.decision ? dec.decision.substring(0, 40) : '') + (dec.decision && dec.decision.length > 40 ? '...' : '') +
            ' <span style="font-size:10px;color:#94a3b8;">' + dec.responsable + ' · ' + dec.fecha + '</span></div>' +
            '<button data-id="' + dec.id + '" class="delete-decision" style="background:#ef4444;border:none;padding:2px 8px;border-radius:4px;color:white;cursor:pointer;font-size:11px;">🗑️</button></div>';
        }).join('');

        lista.querySelectorAll('.delete-decision').forEach(function(btn) {
          btn.onclick = function() {
            var id = parseInt(this.dataset.id);
            if (confirm(t.dlConfirmDelete)) {
              var globalIdx = decisions.findIndex(function(d) { return d.id === id; });
              if (globalIdx !== -1) {
                decisions.splice(globalIdx, 1);
                localStorage.setItem('decisionLog', JSON.stringify(decisions));
                actualizarLista();
              }
            }
          };
        });
      }
    }

    // ========== AGREGAR DECISIÓN ==========
    document.getElementById('addDecisionBtn').onclick = function() {
      var decision = document.getElementById('decisionDesc').value.trim();
      if (!decision) { alert('⚠️ Decision is required'); return; }

      var nuevo = {
        id: Date.now(),
        projectId: proyecto.name,
        decision: decision,
        justificacion: document.getElementById('decisionJust').value.trim() || 'No justification',
        responsable: document.getElementById('decisionResp').value.trim() || 'Unassigned',
        fecha: new Date().toLocaleDateString('en-US')
      };

      decisions.push(nuevo);
      localStorage.setItem('decisionLog', JSON.stringify(decisions));

      document.getElementById('decisionDesc').value = '';
      document.getElementById('decisionJust').value = '';
      document.getElementById('decisionResp').value = '';
      actualizarLista();
      alert(t.dlSaved);
    };

    // ========== GENERAR DOCUMENTO ==========
    document.getElementById('generateDLBtn').onclick = function() {
      var decisionsActuales = decisions.filter(function(d) { return d.projectId === proyecto.name; });
      if (decisionsActuales.length === 0) {
        alert('⚠️ ' + t.dlNoDecisions);
        return;
      }

      var fecha = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      var codigo = 'DL-' + Date.now().toString().slice(-6);

      // ========== CONTENIDO DEL DOCUMENTO ==========
      var filas = decisionsActuales.map(function(dec) {
        return '<tr>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;font-family:monospace;">' + dec.id + '</td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;">' + dec.decision + '</td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;">' + (dec.justificacion || '-') + '</td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;">' + (dec.responsable || '-') + '</td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;">' + dec.fecha + '</td></tr>';
      }).join('');

      var contenido = `
      <div style="background:linear-gradient(135deg,#0f172a,#1e293b); color:white; padding:30px; border-radius:16px 16px 0 0; text-align:center;">
        <div style="font-size:48px;">📝</div>
        <h1 style="margin:0;font-size:28px;">${t.dlTitle}</h1>
        <p style="margin:8px 0 0 0;opacity:0.9;">${t.dlSubtitle}</p>
        <div style="margin-top:15px;display:flex;justify-content:center;gap:20px;flex-wrap:wrap;">
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.dlCode}: ${codigo}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.dlDate}: ${fecha}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.dlProject}: ${proyecto.name}</div>
        </div>
      </div>
      <div style="padding:30px;background:white;color:#1e293b;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:30px;">
          <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #8b5cf6;">
            <div style="font-size:28px;font-weight:bold;color:#6d28d9;">${decisionsActuales.length}</div>
            <div style="font-size:11px;color:#64748b;">${t.dlTotal}</div>
          </div>
          <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #3b82f6;">
            <div style="font-size:28px;font-weight:bold;color:#1e40af;">${new Date().toLocaleDateString('en-US')}</div>
            <div style="font-size:11px;color:#64748b;">${t.dlDateMade}</div>
          </div>
        </div>

        <table style="width:100%;border-collapse:collapse;font-size:12px;">
          <thead>
            <tr style="background:#ede9fe;">
              <th style="padding:10px;border:1px solid #ddd6fe;text-align:center;">${t.dlID}</th>
              <th style="padding:10px;border:1px solid #ddd6fe;text-align:left;">${t.dlDecision}</th>
              <th style="padding:10px;border:1px solid #ddd6fe;text-align:left;">${t.dlJustification}</th>
              <th style="padding:10px;border:1px solid #ddd6fe;text-align:center;">${t.dlResponsible}</th>
              <th style="padding:10px;border:1px solid #ddd6fe;text-align:center;">${t.dlDateMade}</th>
            </tr>
          </thead>
          <tbody>${filas}</tbody>
        </table>

        <div style="margin-top:30px;padding:20px;background:#f8fafc;border-radius:12px;text-align:center;">
          <p style="color:#64748b;font-size:12px;">
            <strong>${t.dlConfidential}</strong><br>
            ${t.dlMethodology}<br>
            ${t.dlAutoGenerated} - ${fecha}
          </p>
        </div>
      </div>`;

      var htmlCompleto = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Decision Log - ${proyecto.name}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body { font-family: 'Inter','Segoe UI',sans-serif; margin:0; padding:20px; background:#f1f5f9; }
          .document-container { max-width:1200px; margin:0 auto; background:white; border-radius:16px; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1); overflow:hidden; }
          @media print { body { background:white; padding:0; } .document-container { box-shadow:none; margin:0; max-width:100%; } button[onclick*="print"] { display:none !important; } }
        </style>
      </head>
      <body>
        <div class="document-container">${contenido}</div>
        <div style="position:fixed;bottom:20px;right:20px;z-index:1000;">
          <button onclick="window.print();" style="background:#3b82f6;border:none;padding:12px 24px;border-radius:40px;color:white;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.2);cursor:pointer;display:flex;align-items:center;gap:8px;">🖨️ Print Decision Log</button>
        </div>
      </body>
      </html>`;

      var win = window.open('', '_blank');
      if (!win) { alert('⚠️ Please allow popup windows.'); return; }
      win.document.write(htmlCompleto);
      win.document.close();
      win.document.title = 'Decision_Log_' + proyecto.name.replace(/\s+/g, '_');

      var hist = JSON.parse(localStorage.getItem('decisionLogs') || '[]');
      hist.push({ proyecto: proyecto.name, fecha: new Date().toISOString(), codigo: codigo, total: decisionsActuales.length });
      localStorage.setItem('decisionLogs', JSON.stringify(hist));

      console.log('✅ ' + t.dlGenerated + ' Code:', codigo);
      modal.remove();
    };

    document.getElementById('cancelDLBtn').onclick = function() { modal.remove(); };
    actualizarLista();
  };

  console.log('✅ Decision Log cargado correctamente.');
})();


// ============================================================
// RESOURCE PLAN - DEFINITIVO (SIN ERRORES, SIN ALERTAS)
// ============================================================
(function() {
  if (typeof window.translations === 'undefined') window.translations = {};
  var t = window.translations;

  var clavesRP = {
    rpTitle: '👥 Resource Management Plan',
    rpSubtitle: 'RESOURCE MANAGEMENT PLAN - EXECUTIVE DOCUMENT',
    rpProject: 'Project',
    rpCode: 'Code',
    rpDate: 'Date',
    rpAcquisition: 'Resource Acquisition Strategy',
    rpTraining: 'Training Plan',
    rpRecognition: 'Recognition and Retention Plan',
    rpTeam: 'Team Structure',
    rpKeySkills: 'Key Skills',
    rpNoSkills: 'No skills registered',
    rpMember: 'Member',
    rpSkill: 'Skill',
    rpLevel: 'Level',
    rpReview: 'This plan will be reviewed quarterly.',
    rpCancel: 'Cancel',
    rpGenerate: '✅ Generate Resource Plan',
    rpClose: '✕',
    rpPlaceholderAcquisition: 'e.g., Internal IT staff + specialized consulting for AI module...',
    rpPlaceholderTraining: 'e.g., Scrum training and project management tools...',
    rpPlaceholderRecognition: 'e.g., Performance bonuses, public recognition, growth opportunities...',
    rpGenerated: '✅ Resource Management Plan generated successfully.',
    rpConfidential: '🔒 CONFIDENTIAL - For internal use only',
    rpMethodology: 'Methodology: Resource management following PMI standards for team development',
    rpAutoGenerated: 'Automatically generated by PM Virtual Executive'
  };

  Object.keys(clavesRP).forEach(function(k) {
    if (!t[k]) t[k] = clavesRP[k];
  });

  window.generarResourcePlan = function() {
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      alert('⚠️ No project selected');
      return;
    }

    var tasks = proyecto.tasks || [];
    var miembros = [...new Set(tasks.map(function(t) { return t.assignee; }).filter(Boolean))];
    var habilidades = JSON.parse(localStorage.getItem('habilidades') || '[]').filter(function(h) { return h.projectId === proyecto.name; });

    // ========== MODAL ==========
    var modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); backdrop-filter:blur(10px); z-index:1000000; display:flex; align-items:center; justify-content:center; overflow-y:auto; padding:20px;';

    var content = document.createElement('div');
    content.style.cssText = 'background:linear-gradient(135deg,#0f172a,#1e293b); border-radius:24px; width:700px; max-width:95vw; max-height:90vh; overflow-y:auto; color:white; border:1px solid #10b981; padding:30px;';

    content.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:20px;">
        <h2 style="margin:0;">${t.rpTitle}</h2>
        <button id="closeRPModal" style="background:#ef4444; border:none; color:white; width:40px; height:40px; border-radius:20px; cursor:pointer;">${t.rpClose}</button>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
        <div style="grid-column:span 2;">
          <label>${t.rpAcquisition}</label>
          <textarea id="rpAdquisicion" rows="2" placeholder="${t.rpPlaceholderAcquisition}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #10b981; border-radius:8px; color:white;">Internal IT staff + specialized consulting for AI module.</textarea>
        </div>
        <div style="grid-column:span 2;">
          <label>${t.rpTraining}</label>
          <textarea id="rpCapacitacion" rows="2" placeholder="${t.rpPlaceholderTraining}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #10b981; border-radius:8px; color:white;">Scrum training and project management tools.</textarea>
        </div>
        <div style="grid-column:span 2;">
          <label>${t.rpRecognition}</label>
          <textarea id="rpReconocimiento" rows="2" placeholder="${t.rpPlaceholderRecognition}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #10b981; border-radius:8px; color:white;">Performance bonuses, public recognition, growth opportunities.</textarea>
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:15px; margin-top:20px;">
        <button id="cancelRPBtn" style="background:#475569; border:none; color:white; padding:10px 20px; border-radius:8px;">${t.rpCancel}</button>
        <button id="generateRPBtn" style="background:#10b981; border:none; color:white; padding:10px 20px; border-radius:8px;">${t.rpGenerate}</button>
      </div>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // Cerrar modal
    document.getElementById('closeRPModal').onclick = function() { modal.remove(); };
    document.getElementById('cancelRPBtn').onclick = function() { modal.remove(); };

    // ========== GENERAR DOCUMENTO ==========
    document.getElementById('generateRPBtn').onclick = function() {
      var adquisicion = document.getElementById('rpAdquisicion').value.trim() || 'Not defined';
      var capacitacion = document.getElementById('rpCapacitacion').value.trim() || 'Not defined';
      var reconocimiento = document.getElementById('rpReconocimiento').value.trim() || 'Not defined';

      var fecha = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      var codigo = 'RP-' + Date.now().toString().slice(-6);

      // ========== CONTENIDO DEL DOCUMENTO ==========
      var habilidadesHTML = habilidades.length > 0 ?
        '<ul style="margin:10px 0 0 0;color:#374151;">' +
          habilidades.map(function(h) {
            return '<li><strong>' + h.miembro + '</strong> - ' + h.habilidad + ' (' + h.nivel + ')</li>';
          }).join('') +
        '</ul>' :
        '<p style="color:#64748b;">' + t.rpNoSkills + '</p>';

      var miembrosHTML = miembros.length > 0 ?
        '<ul style="margin:10px 0 0 0;color:#374151;">' +
          miembros.map(function(m) { return '<li>' + m + '</li>'; }).join('') +
        '</ul>' :
        '<p style="color:#64748b;">No members assigned</p>';

      var contenido = `
      <div style="background:linear-gradient(135deg,#0f172a,#1e293b); color:white; padding:30px; border-radius:16px 16px 0 0; text-align:center;">
        <div style="font-size:48px;">👥</div>
        <h1 style="margin:0;font-size:28px;">${t.rpTitle}</h1>
        <p style="margin:8px 0 0 0;opacity:0.9;">${t.rpSubtitle}</p>
        <div style="margin-top:15px;display:flex;justify-content:center;gap:20px;flex-wrap:wrap;">
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.rpCode}: ${codigo}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.rpDate}: ${fecha}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.rpProject}: ${proyecto.name}</div>
        </div>
      </div>
      <div style="padding:30px;background:white;color:#1e293b;">
        <h2 style="color:#1e3a8a;border-left:6px solid #10b981;padding-left:20px;">📋 ${t.rpTeam}</h2>
        ${miembrosHTML}

        <h2 style="color:#1e3a8a;border-left:6px solid #10b981;padding-left:20px;margin-top:30px;">📊 ${t.rpKeySkills}</h2>
        ${habilidadesHTML}

        <h2 style="color:#1e3a8a;border-left:6px solid #10b981;padding-left:20px;margin-top:30px;">🛠️ ${t.rpAcquisition}</h2>
        <div style="background:#f8fafc;padding:20px;border-radius:12px;border-left:4px solid #10b981;color:#374151;line-height:1.8;">${adquisicion}</div>

        <h2 style="color:#1e3a8a;border-left:6px solid #10b981;padding-left:20px;margin-top:30px;">🎓 ${t.rpTraining}</h2>
        <div style="background:#f8fafc;padding:20px;border-radius:12px;border-left:4px solid #10b981;color:#374151;line-height:1.8;">${capacitacion}</div>

        <h2 style="color:#1e3a8a;border-left:6px solid #10b981;padding-left:20px;margin-top:30px;">🏆 ${t.rpRecognition}</h2>
        <div style="background:#f8fafc;padding:20px;border-radius:12px;border-left:4px solid #10b981;color:#374151;line-height:1.8;">${reconocimiento}</div>

        <div style="margin-top:40px;padding:20px;background:#f8fafc;border-radius:12px;text-align:center;">
          <p style="color:#64748b;font-size:12px;">${t.rpReview}</p>
          <p style="color:#64748b;font-size:12px;margin-top:10px;">
            <strong>${t.rpConfidential}</strong><br>
            ${t.rpMethodology}<br>
            ${t.rpAutoGenerated} - ${fecha}
          </p>
        </div>
      </div>`;

      var htmlCompleto = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Resource Plan - ${proyecto.name}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body { font-family: 'Inter','Segoe UI',sans-serif; margin:0; padding:20px; background:#f1f5f9; }
          .document-container { max-width:1200px; margin:0 auto; background:white; border-radius:16px; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1); overflow:hidden; }
          @media print { body { background:white; padding:0; } .document-container { box-shadow:none; margin:0; max-width:100%; } button[onclick*="print"] { display:none !important; } }
        </style>
      </head>
      <body>
        <div class="document-container">${contenido}</div>
        <div style="position:fixed;bottom:20px;right:20px;z-index:1000;">
          <button onclick="window.print();" style="background:#3b82f6;border:none;padding:12px 24px;border-radius:40px;color:white;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.2);cursor:pointer;display:flex;align-items:center;gap:8px;">🖨️ Print Resource Plan</button>
        </div>
      </body>
      </html>`;

      var win = window.open('', '_blank');
      if (!win) { alert('⚠️ Please allow popup windows.'); return; }
      win.document.write(htmlCompleto);
      win.document.close();
      win.document.title = 'Resource_Plan_' + proyecto.name.replace(/\s+/g, '_');

      var hist = JSON.parse(localStorage.getItem('resourcePlans') || '[]');
      hist.push({ proyecto: proyecto.name, fecha: new Date().toISOString(), codigo: codigo });
      localStorage.setItem('resourcePlans', JSON.stringify(hist));

      console.log('✅ ' + t.rpGenerated + ' Code:', codigo);
      modal.remove();
    };
  };

  console.log('✅ Resource Plan cargado correctamente.');
})();


// ============================================================
// PROCUREMENT PLAN - DEFINITIVO (SIN ERRORES, SIN ALERTAS)
// ============================================================
(function() {
  if (typeof window.translations === 'undefined') window.translations = {};
  var t = window.translations;

  var clavesPP = {
    ppTitle: '📦 Procurement Management Plan',
    ppSubtitle: 'PROCUREMENT MANAGEMENT PLAN - EXECUTIVE DOCUMENT',
    ppProject: 'Project',
    ppCode: 'Code',
    ppDate: 'Date',
    ppTotal: 'Total Procurements',
    ppTotalBudget: 'Total Budget',
    ppItem: 'Item',
    ppSupplier: 'Supplier',
    ppAmount: 'Amount',
    ppDateNeeded: 'Date Needed',
    ppStatus: 'Status',
    ppActions: 'Actions',
    ppStatusPending: 'Pending',
    ppStatusQuoting: 'Quoting',
    ppStatusAwarded: 'Awarded',
    ppStatusDelivered: 'Delivered',
    ppAddProcurement: '+ Add Procurement',
    ppDelete: 'Delete',
    ppCancel: 'Cancel',
    ppGenerate: '✅ Generate Procurement Plan',
    ppClose: '✕',
    ppPlaceholderItem: 'Item description',
    ppPlaceholderSupplier: 'Supplier name',
    ppPlaceholderAmount: 'Amount (€)',
    ppNoProcurements: 'No procurements registered',
    ppAddFirst: 'Add the first procurement using the form above.',
    ppSaved: '✅ Procurement saved successfully',
    ppConfirmDelete: 'Delete this procurement?',
    ppDeleted: '✅ Procurement deleted',
    ppGenerated: '✅ Procurement Plan generated successfully.',
    ppConfidential: '🔒 CONFIDENTIAL - For internal use only',
    ppMethodology: 'Methodology: Procurement management following PMI standards for acquisitions',
    ppAutoGenerated: 'Automatically generated by PM Virtual Executive'
  };

  Object.keys(clavesPP).forEach(function(k) {
    if (!t[k]) t[k] = clavesPP[k];
  });

  window.generarProcurementPlan = function() {
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      alert('⚠️ No project selected');
      return;
    }

    var procurements = JSON.parse(localStorage.getItem('procurementItems') || '[]');
    var procProyecto = procurements.filter(function(p) { return p.projectId === proyecto.name; });

    // ========== MODAL ==========
    var modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); backdrop-filter:blur(10px); z-index:1000000; display:flex; align-items:center; justify-content:center; overflow-y:auto; padding:20px;';

    var content = document.createElement('div');
    content.style.cssText = 'background:linear-gradient(135deg,#0f172a,#1e293b); border-radius:24px; width:850px; max-width:95vw; max-height:90vh; overflow-y:auto; color:white; border:1px solid #f59e0b; padding:30px;';

    content.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
        <h2 style="margin:0;">${t.ppTitle}</h2>
        <span style="color:#94a3b8;font-size:12px;">${procProyecto.length} ${t.ppTotal}</span>
      </div>
      <p style="margin:0 0 15px 0;color:#94a3b8;font-size:13px;">${t.ppSubtitle}</p>

      <!-- Formulario para agregar adquisición -->
      <div style="background:rgba(0,0,0,0.3);padding:15px;border-radius:12px;margin-bottom:15px;">
        <h3 style="color:#f59e0b;margin:0 0 10px 0;font-size:14px;">${t.ppAddProcurement}</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div style="grid-column:span 2;">
            <input type="text" id="procNombre" placeholder="${t.ppPlaceholderItem}" style="width:100%;padding:8px;border-radius:6px;border:1px solid #f59e0b;background:#0f172a;color:white;font-size:13px;">
          </div>
          <div>
            <input type="text" id="procProveedor" placeholder="${t.ppPlaceholderSupplier}" style="width:100%;padding:8px;border-radius:6px;border:1px solid #f59e0b;background:#0f172a;color:white;font-size:13px;">
          </div>
          <div>
            <input type="number" id="procMonto" placeholder="${t.ppPlaceholderAmount}" style="width:100%;padding:8px;border-radius:6px;border:1px solid #f59e0b;background:#0f172a;color:white;font-size:13px;">
          </div>
          <div>
            <input type="date" id="procFecha" style="width:100%;padding:8px;border-radius:6px;border:1px solid #f59e0b;background:#0f172a;color:white;font-size:13px;">
          </div>
          <div>
            <select id="procEstado" style="width:100%;padding:8px;border-radius:6px;border:1px solid #f59e0b;background:#0f172a;color:white;font-size:13px;">
              <option>${t.ppStatusPending}</option>
              <option>${t.ppStatusQuoting}</option>
              <option>${t.ppStatusAwarded}</option>
              <option>${t.ppStatusDelivered}</option>
            </select>
          </div>
        </div>
        <button id="addProcBtn" style="margin-top:10px;background:#3b82f6;border:none;padding:8px 20px;border-radius:8px;color:white;cursor:pointer;font-weight:bold;font-size:13px;">${t.ppAddProcurement}</button>
      </div>

      <!-- Lista de adquisiciones -->
      <div id="procList" style="flex:1;overflow-y:auto;margin-bottom:10px;max-height:250px;">
        ${procProyecto.length === 0 ? '<p style="text-align:center;color:#94a3b8;padding:20px;">' + t.ppNoProcurements + '<br><span style="font-size:12px;">' + t.ppAddFirst + '</span></p>' :
          procProyecto.map(function(item, idx) {
            var statusColor = item.estado === 'Delivered' ? '#10b981' : (item.estado === 'Awarded' ? '#3b82f6' : (item.estado === 'Quoting' ? '#f59e0b' : '#94a3b8'));
            return '<div style="background:rgba(0,0,0,0.2);padding:10px;border-radius:8px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;border-left:3px solid ' + statusColor + ';">' +
              '<div><strong>' + item.nombre + '</strong> <span style="font-size:11px;color:#94a3b8;">' + item.proveedor + ' · €' + (item.monto || 0).toLocaleString() + '</span><br><span style="font-size:10px;color:#64748b;">' + item.estado + '</span></div>' +
              '<button data-id="' + item.id + '" class="delete-proc" style="background:#ef4444;border:none;padding:2px 8px;border-radius:4px;color:white;cursor:pointer;font-size:11px;">🗑️</button></div>';
          }).join('')
        }
      </div>

      <div style="display:flex;gap:10px;justify-content:center;padding-top:15px;border-top:1px solid #f59e0b;flex-shrink:0;">
        <button id="generateProcBtn" style="background:#10b981;border:none;padding:10px 25px;border-radius:8px;color:white;cursor:pointer;font-size:14px;font-weight:bold;">${t.ppGenerate}</button>
        <button id="cancelProcBtn" style="background:#ef4444;border:none;padding:10px 25px;border-radius:8px;color:white;cursor:pointer;font-size:14px;font-weight:bold;">${t.ppCancel}</button>
      </div>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // ========== FUNCIONES ==========
    function actualizarLista() {
      var lista = document.getElementById('procList');
      var nuevas = procurements.filter(function(p) { return p.projectId === proyecto.name; });
      if (nuevas.length === 0) {
        lista.innerHTML = '<p style="text-align:center;color:#94a3b8;padding:20px;">' + t.ppNoProcurements + '<br><span style="font-size:12px;">' + t.ppAddFirst + '</span></p>';
      } else {
        lista.innerHTML = nuevas.map(function(item, idx) {
          var statusColor = item.estado === 'Delivered' ? '#10b981' : (item.estado === 'Awarded' ? '#3b82f6' : (item.estado === 'Quoting' ? '#f59e0b' : '#94a3b8'));
          return '<div style="background:rgba(0,0,0,0.2);padding:10px;border-radius:8px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;border-left:3px solid ' + statusColor + ';">' +
            '<div><strong>' + item.nombre + '</strong> <span style="font-size:11px;color:#94a3b8;">' + item.proveedor + ' · €' + (item.monto || 0).toLocaleString() + '</span><br><span style="font-size:10px;color:#64748b;">' + item.estado + '</span></div>' +
            '<button data-id="' + item.id + '" class="delete-proc" style="background:#ef4444;border:none;padding:2px 8px;border-radius:4px;color:white;cursor:pointer;font-size:11px;">🗑️</button></div>';
        }).join('');

        lista.querySelectorAll('.delete-proc').forEach(function(btn) {
          btn.onclick = function() {
            var id = parseInt(this.dataset.id);
            if (confirm(t.ppConfirmDelete)) {
              var globalIdx = procurements.findIndex(function(p) { return p.id === id; });
              if (globalIdx !== -1) {
                procurements.splice(globalIdx, 1);
                localStorage.setItem('procurementItems', JSON.stringify(procurements));
                actualizarLista();
              }
            }
          };
        });
      }
    }

    // ========== AGREGAR ADQUISICIÓN ==========
    document.getElementById('addProcBtn').onclick = function() {
      var nombre = document.getElementById('procNombre').value.trim();
      if (!nombre) { alert('⚠️ Item is required'); return; }

      var nuevo = {
        id: Date.now(),
        projectId: proyecto.name,
        nombre: nombre,
        proveedor: document.getElementById('procProveedor').value.trim() || 'Not defined',
        monto: parseFloat(document.getElementById('procMonto').value) || 0,
        fecha: document.getElementById('procFecha').value || new Date().toISOString().split('T')[0],
        estado: document.getElementById('procEstado').value
      };

      procurements.push(nuevo);
      localStorage.setItem('procurementItems', JSON.stringify(procurements));

      document.getElementById('procNombre').value = '';
      document.getElementById('procProveedor').value = '';
      document.getElementById('procMonto').value = '';
      actualizarLista();
      alert(t.ppSaved);
    };

    // ========== GENERAR DOCUMENTO ==========
    document.getElementById('generateProcBtn').onclick = function() {
      var itemsActuales = procurements.filter(function(p) { return p.projectId === proyecto.name; });
      if (itemsActuales.length === 0) {
        alert('⚠️ ' + t.ppNoProcurements);
        return;
      }

      var fecha = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      var codigo = 'PP-' + Date.now().toString().slice(-6);
      var total = itemsActuales.reduce(function(s, i) { return s + (i.monto || 0); }, 0);

      // ========== CONTENIDO DEL DOCUMENTO ==========
      var filas = itemsActuales.map(function(item) {
        var statusColor = item.estado === 'Delivered' ? '#10b981' : (item.estado === 'Awarded' ? '#3b82f6' : (item.estado === 'Quoting' ? '#f59e0b' : '#94a3b8'));
        return '<tr>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;">' + item.nombre + '</td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;">' + (item.proveedor || '-') + '</td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;">€' + (item.monto || 0).toLocaleString() + '</td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;">' + item.fecha + '</td>' +
          '<td style="padding:10px;border:1px solid #e2e8f0;text-align:center;"><span style="background:' + statusColor + ';color:white;padding:2px 10px;border-radius:12px;font-size:10px;">' + item.estado + '</span></td></tr>';
      }).join('');

      var contenido = `
      <div style="background:linear-gradient(135deg,#0f172a,#1e293b); color:white; padding:30px; border-radius:16px 16px 0 0; text-align:center;">
        <div style="font-size:48px;">📦</div>
        <h1 style="margin:0;font-size:28px;">${t.ppTitle}</h1>
        <p style="margin:8px 0 0 0;opacity:0.9;">${t.ppSubtitle}</p>
        <div style="margin-top:15px;display:flex;justify-content:center;gap:20px;flex-wrap:wrap;">
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.ppCode}: ${codigo}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.ppDate}: ${fecha}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.ppProject}: ${proyecto.name}</div>
        </div>
      </div>
      <div style="padding:30px;background:white;color:#1e293b;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:30px;">
          <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #f59e0b;">
            <div style="font-size:28px;font-weight:bold;color:#92400e;">${itemsActuales.length}</div>
            <div style="font-size:11px;color:#64748b;">${t.ppTotal}</div>
          </div>
          <div style="background:#f8fafc;padding:20px;border-radius:12px;text-align:center;border-top:4px solid #10b981;">
            <div style="font-size:28px;font-weight:bold;color:#166534;">€${total.toLocaleString()}</div>
            <div style="font-size:11px;color:#64748b;">${t.ppTotalBudget}</div>
          </div>
        </div>

        <table style="width:100%;border-collapse:collapse;font-size:12px;">
          <thead>
            <tr style="background:#fef3c7;">
              <th style="padding:10px;border:1px solid #fde68a;text-align:left;">${t.ppItem}</th>
              <th style="padding:10px;border:1px solid #fde68a;text-align:center;">${t.ppSupplier}</th>
              <th style="padding:10px;border:1px solid #fde68a;text-align:center;">${t.ppAmount}</th>
              <th style="padding:10px;border:1px solid #fde68a;text-align:center;">${t.ppDateNeeded}</th>
              <th style="padding:10px;border:1px solid #fde68a;text-align:center;">${t.ppStatus}</th>
            </tr>
          </thead>
          <tbody>${filas}</tbody>
        </table>

        <div style="margin-top:30px;padding:20px;background:#f8fafc;border-radius:12px;text-align:center;">
          <p style="color:#64748b;font-size:12px;">
            <strong>${t.ppConfidential}</strong><br>
            ${t.ppMethodology}<br>
            ${t.ppAutoGenerated} - ${fecha}
          </p>
        </div>
      </div>`;

      var htmlCompleto = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Procurement Plan - ${proyecto.name}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body { font-family: 'Inter','Segoe UI',sans-serif; margin:0; padding:20px; background:#f1f5f9; }
          .document-container { max-width:1200px; margin:0 auto; background:white; border-radius:16px; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1); overflow:hidden; }
          @media print { body { background:white; padding:0; } .document-container { box-shadow:none; margin:0; max-width:100%; } button[onclick*="print"] { display:none !important; } }
        </style>
      </head>
      <body>
        <div class="document-container">${contenido}</div>
        <div style="position:fixed;bottom:20px;right:20px;z-index:1000;">
          <button onclick="window.print();" style="background:#3b82f6;border:none;padding:12px 24px;border-radius:40px;color:white;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.2);cursor:pointer;display:flex;align-items:center;gap:8px;">🖨️ Print Procurement Plan</button>
        </div>
      </body>
      </html>`;

      var win = window.open('', '_blank');
      if (!win) { alert('⚠️ Please allow popup windows.'); return; }
      win.document.write(htmlCompleto);
      win.document.close();
      win.document.title = 'Procurement_Plan_' + proyecto.name.replace(/\s+/g, '_');

      var hist = JSON.parse(localStorage.getItem('procurementPlans') || '[]');
      hist.push({ proyecto: proyecto.name, fecha: new Date().toISOString(), codigo: codigo, total: itemsActuales.length });
      localStorage.setItem('procurementPlans', JSON.stringify(hist));

      console.log('✅ ' + t.ppGenerated + ' Code:', codigo);
      modal.remove();
    };

    document.getElementById('cancelProcBtn').onclick = function() { modal.remove(); };
    actualizarLista();
  };

  console.log('✅ Procurement Plan cargado correctamente.');
})();


// ============================================================
// CHANGE MANAGEMENT PLAN - DEFINITIVO (SIN ERRORES, SIN ALERTAS)
// ============================================================
(function() {
  if (typeof window.translations === 'undefined') window.translations = {};
  var t = window.translations;

  var clavesCMP = {
    cmpTitle: '🔄 Change Management Plan',
    cmpSubtitle: 'CHANGE MANAGEMENT PLAN - EXECUTIVE DOCUMENT',
    cmpProject: 'Project',
    cmpCode: 'Code',
    cmpDate: 'Date',
    cmpProcess: 'Change Request Process',
    cmpCCB: 'Change Control Board (CCB) Composition',
    cmpDeadlines: 'Response Deadlines',
    cmpPlaceholderProcess: '1. Requester completes change form.\n2. PM evaluates impact and cost.\n3. CCB reviews and approves/rejects.\n4. Decision communicated and documentation updated.',
    cmpPlaceholderCCB: 'Sponsor, Project Manager, Technical Lead, Business Representative.',
    cmpPlaceholderDeadlines: 'Minor changes: 48 hours. Major changes: 5 business days.',
    cmpCancel: 'Cancel',
    cmpGenerate: '✅ Generate Change Management Plan',
    cmpClose: '✕',
    cmpGenerated: '✅ Change Management Plan generated successfully.',
    cmpConfidential: '🔒 CONFIDENTIAL - For internal use only',
    cmpMethodology: 'Methodology: Change management following PMI standards for integrated change control',
    cmpAutoGenerated: 'Automatically generated by PM Virtual Executive'
  };

  Object.keys(clavesCMP).forEach(function(k) {
    if (!t[k]) t[k] = clavesCMP[k];
  });

  window.generarChangeManagementPlan = function() {
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      alert('⚠️ No project selected');
      return;
    }

    // ========== MODAL ==========
    var modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); backdrop-filter:blur(10px); z-index:1000000; display:flex; align-items:center; justify-content:center; overflow-y:auto; padding:20px;';

    var content = document.createElement('div');
    content.style.cssText = 'background:linear-gradient(135deg,#0f172a,#1e293b); border-radius:24px; width:700px; max-width:95vw; max-height:90vh; overflow-y:auto; color:white; border:1px solid #ec4899; padding:30px;';

    content.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:20px;">
        <h2 style="margin:0;">${t.cmpTitle}</h2>
        <button id="closeCMPModal" style="background:#ef4444; border:none; color:white; width:40px; height:40px; border-radius:20px; cursor:pointer;">${t.cmpClose}</button>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
        <div style="grid-column:span 2;">
          <label>${t.cmpProcess}</label>
          <textarea id="cmpProceso" rows="4" placeholder="${t.cmpPlaceholderProcess}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #ec4899; border-radius:8px; color:white;">1. Requester completes change form.\n2. PM evaluates impact and cost.\n3. CCB reviews and approves/rejects.\n4. Decision communicated and documentation updated.</textarea>
        </div>
        <div style="grid-column:span 2;">
          <label>${t.cmpCCB}</label>
          <textarea id="cmpCCB" rows="2" placeholder="${t.cmpPlaceholderCCB}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #ec4899; border-radius:8px; color:white;">Sponsor, Project Manager, Technical Lead, Business Representative.</textarea>
        </div>
        <div style="grid-column:span 2;">
          <label>${t.cmpDeadlines}</label>
          <textarea id="cmpPlazos" rows="2" placeholder="${t.cmpPlaceholderDeadlines}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #ec4899; border-radius:8px; color:white;">Minor changes: 48 hours. Major changes: 5 business days.</textarea>
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:15px; margin-top:20px;">
        <button id="cancelCMPBtn" style="background:#475569; border:none; color:white; padding:10px 20px; border-radius:8px;">${t.cmpCancel}</button>
        <button id="generateCMPBtn" style="background:#10b981; border:none; color:white; padding:10px 20px; border-radius:8px;">${t.cmpGenerate}</button>
      </div>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // Cerrar modal
    document.getElementById('closeCMPModal').onclick = function() { modal.remove(); };
    document.getElementById('cancelCMPBtn').onclick = function() { modal.remove(); };

    // ========== GENERAR DOCUMENTO ==========
    document.getElementById('generateCMPBtn').onclick = function() {
      var proceso = document.getElementById('cmpProceso').value.trim() || 'Not defined';
      var ccb = document.getElementById('cmpCCB').value.trim() || 'Not defined';
      var plazos = document.getElementById('cmpPlazos').value.trim() || 'Not defined';

      var fecha = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      var codigo = 'CMP-' + Date.now().toString().slice(-6);

      // ========== CONTENIDO DEL DOCUMENTO ==========
      var contenido = `
      <div style="background:linear-gradient(135deg,#0f172a,#1e293b); color:white; padding:30px; border-radius:16px 16px 0 0; text-align:center;">
        <div style="font-size:48px;">🔄</div>
        <h1 style="margin:0;font-size:28px;">${t.cmpTitle}</h1>
        <p style="margin:8px 0 0 0;opacity:0.9;">${t.cmpSubtitle}</p>
        <div style="margin-top:15px;display:flex;justify-content:center;gap:20px;flex-wrap:wrap;">
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.cmpCode}: ${codigo}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.cmpDate}: ${fecha}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.cmpProject}: ${proyecto.name}</div>
        </div>
      </div>
      <div style="padding:30px;background:white;color:#1e293b;">
        <h2 style="color:#1e3a8a;border-left:6px solid #ec4899;padding-left:20px;">📋 ${t.cmpProcess}</h2>
        <div style="background:#f8fafc;padding:20px;border-radius:12px;border-left:4px solid #ec4899;color:#374151;line-height:1.8;white-space:pre-line;">${proceso}</div>

        <h2 style="color:#1e3a8a;border-left:6px solid #ec4899;padding-left:20px;margin-top:30px;">👥 ${t.cmpCCB}</h2>
        <div style="background:#f8fafc;padding:20px;border-radius:12px;border-left:4px solid #ec4899;color:#374151;line-height:1.8;white-space:pre-line;">${ccb}</div>

        <h2 style="color:#1e3a8a;border-left:6px solid #ec4899;padding-left:20px;margin-top:30px;">⏱️ ${t.cmpDeadlines}</h2>
        <div style="background:#f8fafc;padding:20px;border-radius:12px;border-left:4px solid #ec4899;color:#374151;line-height:1.8;white-space:pre-line;">${plazos}</div>

        <div style="margin-top:40px;padding:20px;background:#f8fafc;border-radius:12px;text-align:center;">
          <p style="color:#64748b;font-size:12px;">This plan applies to all change requests for the project.</p>
          <p style="color:#64748b;font-size:12px;margin-top:10px;">
            <strong>${t.cmpConfidential}</strong><br>
            ${t.cmpMethodology}<br>
            ${t.cmpAutoGenerated} - ${fecha}
          </p>
        </div>
      </div>`;

      var htmlCompleto = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Change Management Plan - ${proyecto.name}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body { font-family: 'Inter','Segoe UI',sans-serif; margin:0; padding:20px; background:#f1f5f9; }
          .document-container { max-width:1200px; margin:0 auto; background:white; border-radius:16px; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1); overflow:hidden; }
          @media print { body { background:white; padding:0; } .document-container { box-shadow:none; margin:0; max-width:100%; } button[onclick*="print"] { display:none !important; } }
        </style>
      </head>
      <body>
        <div class="document-container">${contenido}</div>
        <div style="position:fixed;bottom:20px;right:20px;z-index:1000;">
          <button onclick="window.print();" style="background:#3b82f6;border:none;padding:12px 24px;border-radius:40px;color:white;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.2);cursor:pointer;display:flex;align-items:center;gap:8px;">🖨️ Print Change Management Plan</button>
        </div>
      </body>
      </html>`;

      var win = window.open('', '_blank');
      if (!win) { alert('⚠️ Please allow popup windows.'); return; }
      win.document.write(htmlCompleto);
      win.document.close();
      win.document.title = 'Change_Management_Plan_' + proyecto.name.replace(/\s+/g, '_');

      var hist = JSON.parse(localStorage.getItem('changeManagementPlans') || '[]');
      hist.push({ proyecto: proyecto.name, fecha: new Date().toISOString(), codigo: codigo });
      localStorage.setItem('changeManagementPlans', JSON.stringify(hist));

      console.log('✅ ' + t.cmpGenerated + ' Code:', codigo);
      modal.remove();
    };
  };

  console.log('✅ Change Management Plan cargado correctamente.');
})();



// ============================================================
// BENEFITS PLAN - DEFINITIVO (SIN ERRORES, SIN ALERTAS)
// ============================================================
(function() {
  if (typeof window.translations === 'undefined') window.translations = {};
  var t = window.translations;

  var clavesBP = {
    bpTitle: '🏆 Benefits Realization Plan',
    bpSubtitle: 'BENEFITS REALIZATION PLAN - EXECUTIVE DOCUMENT',
    bpProject: 'Project',
    bpCode: 'Code',
    bpDate: 'Date',
    bpExpectedBenefits: 'Expected Benefits',
    bpKPIs: 'Measurement Indicators (KPIs)',
    bpMeasurementDates: 'Post-Project Measurement Dates',
    bpPlaceholderBenefits: 'e.g., 20% reduction in processing time, improved customer satisfaction...',
    bpPlaceholderKPIs: 'e.g., Average response time, NPS, ROI...',
    bpPlaceholderDates: 'e.g., 3 months after closure, 6 months, 12 months...',
    bpCancel: 'Cancel',
    bpGenerate: '✅ Generate Benefits Plan',
    bpClose: '✕',
    bpGenerated: '✅ Benefits Realization Plan generated successfully.',
    bpConfidential: '🔒 CONFIDENTIAL - For internal use only',
    bpMethodology: 'Methodology: Benefits realization following PMI standards for value delivery',
    bpAutoGenerated: 'Automatically generated by PM Virtual Executive',
    bpExecutedBy: 'This plan will be executed by the Project Management Office (PMO).'
  };

  Object.keys(clavesBP).forEach(function(k) {
    if (!t[k]) t[k] = clavesBP[k];
  });

  window.generarBenefitsPlan = function() {
    var proyecto = window.obtenerProyectoActual ? window.obtenerProyectoActual() : null;
    if (!proyecto) {
      alert('⚠️ No project selected');
      return;
    }

    // ========== MODAL ==========
    var modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); backdrop-filter:blur(10px); z-index:1000000; display:flex; align-items:center; justify-content:center; overflow-y:auto; padding:20px;';

    var content = document.createElement('div');
    content.style.cssText = 'background:linear-gradient(135deg,#0f172a,#1e293b); border-radius:24px; width:700px; max-width:95vw; max-height:90vh; overflow-y:auto; color:white; border:1px solid #2dd4bf; padding:30px;';

    content.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:20px;">
        <h2 style="margin:0;">${t.bpTitle}</h2>
        <button id="closeBPModal" style="background:#ef4444; border:none; color:white; width:40px; height:40px; border-radius:20px; cursor:pointer;">${t.bpClose}</button>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
        <div style="grid-column:span 2;">
          <label>${t.bpExpectedBenefits}</label>
          <textarea id="bpBeneficios" rows="3" placeholder="${t.bpPlaceholderBenefits}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #2dd4bf; border-radius:8px; color:white;">20% reduction in processing time, improved customer satisfaction.</textarea>
        </div>
        <div style="grid-column:span 2;">
          <label>${t.bpKPIs}</label>
          <textarea id="bpKPIs" rows="2" placeholder="${t.bpPlaceholderKPIs}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #2dd4bf; border-radius:8px; color:white;">Average response time, NPS, ROI</textarea>
        </div>
        <div style="grid-column:span 2;">
          <label>${t.bpMeasurementDates}</label>
          <textarea id="bpFechas" rows="2" placeholder="${t.bpPlaceholderDates}" style="width:100%; padding:8px; margin-bottom:10px; background:#0f172a; border:1px solid #2dd4bf; border-radius:8px; color:white;">3 months after closure, 6 months, 12 months.</textarea>
        </div>
      </div>
      <div style="display:flex; justify-content:flex-end; gap:15px; margin-top:20px;">
        <button id="cancelBPBtn" style="background:#475569; border:none; color:white; padding:10px 20px; border-radius:8px;">${t.bpCancel}</button>
        <button id="generateBPBtn" style="background:#10b981; border:none; color:white; padding:10px 20px; border-radius:8px;">${t.bpGenerate}</button>
      </div>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // Cerrar modal
    document.getElementById('closeBPModal').onclick = function() { modal.remove(); };
    document.getElementById('cancelBPBtn').onclick = function() { modal.remove(); };

    // ========== GENERAR DOCUMENTO ==========
    document.getElementById('generateBPBtn').onclick = function() {
      var beneficios = document.getElementById('bpBeneficios').value.trim() || 'Not defined';
      var kpis = document.getElementById('bpKPIs').value.trim() || 'Not defined';
      var fechas = document.getElementById('bpFechas').value.trim() || 'Not defined';

      var fecha = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      var codigo = 'BP-' + Date.now().toString().slice(-6);

      // ========== CONTENIDO DEL DOCUMENTO ==========
      var contenido = `
      <div style="background:linear-gradient(135deg,#0f172a,#1e293b); color:white; padding:30px; border-radius:16px 16px 0 0; text-align:center;">
        <div style="font-size:48px;">🏆</div>
        <h1 style="margin:0;font-size:28px;">${t.bpTitle}</h1>
        <p style="margin:8px 0 0 0;opacity:0.9;">${t.bpSubtitle}</p>
        <div style="margin-top:15px;display:flex;justify-content:center;gap:20px;flex-wrap:wrap;">
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.bpCode}: ${codigo}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.bpDate}: ${fecha}</div>
          <div style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:8px;">${t.bpProject}: ${proyecto.name}</div>
        </div>
      </div>
      <div style="padding:30px;background:white;color:#1e293b;">
        <h2 style="color:#1e3a8a;border-left:6px solid #2dd4bf;padding-left:20px;">🎯 ${t.bpExpectedBenefits}</h2>
        <div style="background:#f8fafc;padding:20px;border-radius:12px;border-left:4px solid #2dd4bf;color:#374151;line-height:1.8;">${beneficios}</div>

        <h2 style="color:#1e3a8a;border-left:6px solid #2dd4bf;padding-left:20px;margin-top:30px;">📊 ${t.bpKPIs}</h2>
        <div style="background:#f8fafc;padding:20px;border-radius:12px;border-left:4px solid #2dd4bf;color:#374151;line-height:1.8;">${kpis}</div>

        <h2 style="color:#1e3a8a;border-left:6px solid #2dd4bf;padding-left:20px;margin-top:30px;">📅 ${t.bpMeasurementDates}</h2>
        <div style="background:#f8fafc;padding:20px;border-radius:12px;border-left:4px solid #2dd4bf;color:#374151;line-height:1.8;">${fechas}</div>

        <div style="margin-top:40px;padding:20px;background:#f8fafc;border-radius:12px;text-align:center;">
          <p style="color:#64748b;font-size:12px;">${t.bpExecutedBy}</p>
          <p style="color:#64748b;font-size:12px;margin-top:10px;">
            <strong>${t.bpConfidential}</strong><br>
            ${t.bpMethodology}<br>
            ${t.bpAutoGenerated} - ${fecha}
          </p>
        </div>
      </div>`;

      var htmlCompleto = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Benefits Plan - ${proyecto.name}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          body { font-family: 'Inter','Segoe UI',sans-serif; margin:0; padding:20px; background:#f1f5f9; }
          .document-container { max-width:1200px; margin:0 auto; background:white; border-radius:16px; box-shadow:0 20px 25px -5px rgba(0,0,0,0.1); overflow:hidden; }
          @media print { body { background:white; padding:0; } .document-container { box-shadow:none; margin:0; max-width:100%; } button[onclick*="print"] { display:none !important; } }
        </style>
      </head>
      <body>
        <div class="document-container">${contenido}</div>
        <div style="position:fixed;bottom:20px;right:20px;z-index:1000;">
          <button onclick="window.print();" style="background:#3b82f6;border:none;padding:12px 24px;border-radius:40px;color:white;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.2);cursor:pointer;display:flex;align-items:center;gap:8px;">🖨️ Print Benefits Plan</button>
        </div>
      </body>
      </html>`;

      var win = window.open('', '_blank');
      if (!win) { alert('⚠️ Please allow popup windows.'); return; }
      win.document.write(htmlCompleto);
      win.document.close();
      win.document.title = 'Benefits_Plan_' + proyecto.name.replace(/\s+/g, '_');

      var hist = JSON.parse(localStorage.getItem('benefitsPlans') || '[]');
      hist.push({ proyecto: proyecto.name, fecha: new Date().toISOString(), codigo: codigo });
      localStorage.setItem('benefitsPlans', JSON.stringify(hist));

      console.log('✅ ' + t.bpGenerated + ' Code:', codigo);
      modal.remove();
    };
  };

  console.log('✅ Benefits Plan cargado correctamente.');
})();


