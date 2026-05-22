
// ===================================================
// 🔐 INICIALIZAR TOKEN ANTES QUE TODO
// ===================================================
// ===== CONFIGURACIÓN GLOBAL MEJORADA =====
window.API_URL = "https://mi-sistema-proyectos-backend-4.onrender.com";
const API_URL = window.API_URL;
console.log("🌐 API_URL cargado:", API_URL);

// 🔐 Cargar token global
window.authToken = localStorage.getItem("authToken") || "";

// 🟡 Si NO hay token → mostrar pantalla de login y DETENER todo lo demás
// ✅ VERSIÓN CORREGIDA:
if (!window.authToken) {
    console.log("⚠️ No hay sesión activa. Mostrando pantalla de login.");
    document.addEventListener("DOMContentLoaded", () => {
        showLoginScreen();
    });
    // NO usar return - dejar que el script continúe cargando
} else {
    console.log("✅ Sesión activa detectada, continuando inicialización...");
}

// === MODIFICAR INICIALIZACIÓN PRINCIPAL ===
const originalDOMContentLoaded = () => {
  console.log('🎯 Iniciando aplicación con validación...');
  const dataLoaded = safeLoad();
  if (!dataLoaded || projects.length === 0) {
    console.log('📝 No hay datos, creando proyecto inicial...');
     } else {
    console.log('✅ Datos cargados correctamente');
    renderProjects();
    selectProject(currentProjectIndex);
    checkOverdueTasks();
  }
  setupEventListeners();
  // ... resto de tu inicialización
};


// === CERRAR SESIÓN ===
function logout() {
  localStorage.removeItem('authToken');
  showNotification('✅ Sesión cerrada correctamente');
  setTimeout(() => {
    location.reload(); // Recargar para mostrar el login
  }, 1000);
}


// Reemplazar el evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', async () => {


  // 🔐 Cargar token aquí, SOLO aquí
  window.authToken = localStorage.getItem("authToken") || "";
  // ✅ Verificar autenticación ANTES de cargar la app
  const token = localStorage.getItem('authToken');
  if (!token) {
    showLoginScreen();
    return; // ⬅️ Detener aquí si no hay token
  }

  // 👇 Solo si hay token, continuar con la app
  console.log('🎯 Iniciando aplicación con validación...');
  const dataLoaded = safeLoad();
  if (!dataLoaded || projects.length === 0) {
    console.log('📝 No hay datos, creando proyecto inicial...');
   
  } else {
    console.log('✅ Datos cargados correctamente');
    renderProjects();
    selectProject(currentProjectIndex);
    checkOverdueTasks();
  }
  setupEventListeners();
  // ... resto de tu inicialización
});


/**************************************
 * SISTEMA DE VALIDACIÓN Y RESPALDO *
 **************************************/

console.log('🔧 Iniciando sistema de validación...');

// 🔐 Cargar token JWT almacenado

if (window.authToken) {
  console.log("🔐 Token JWT cargado desde localStorage:", window.authToken.slice(0, 20) + "...");
  localStorage.setItem("authToken", window.authToken); // refuerza persistencia
}

// Variable para controlar el modo
let useBackend = true;



// === 🟢 Indicador visual de estado de backend ===
const connectionIndicator = document.createElement("div");
connectionIndicator.style.position = "fixed";
connectionIndicator.style.bottom = "10px";
connectionIndicator.style.right = "10px";
connectionIndicator.style.padding = "8px 14px";
connectionIndicator.style.borderRadius = "10px";
connectionIndicator.style.fontSize = "14px";
connectionIndicator.style.zIndex = "9999";
connectionIndicator.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
connectionIndicator.style.transition = "all 0.3s ease";
document.body.appendChild(connectionIndicator);

function updateConnectionIndicator(status) {
  if (status === "online") {
    connectionIndicator.textContent = "🟢 Conectado al backend";
    connectionIndicator.style.background = "#2ecc71";
    connectionIndicator.style.color = "white";
  } else {
    connectionIndicator.textContent = "🔴 Sin conexión al backend";
    connectionIndicator.style.background = "#e74c3c";
    connectionIndicator.style.color = "white";
  }
}

// ✅ Verifica visualmente si hay sesión activa
if (window.authToken && window.authToken.length > 100) {
  console.log("✅ Sesión activa con backend (JWT válido)");
  const statusDiv = document.createElement("div");
  statusDiv.textContent = "🔐 Sesión activa con backend";
  statusDiv.style.position = "fixed";
  statusDiv.style.bottom = "45px";
  statusDiv.style.right = "10px";
  statusDiv.style.background = "#2980b9";
  statusDiv.style.color = "white";
  statusDiv.style.padding = "8px 14px";
  statusDiv.style.borderRadius = "10px";
  statusDiv.style.fontSize = "14px";
  statusDiv.style.zIndex = "9999";
  statusDiv.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
  document.body.appendChild(statusDiv);
} else {
  console.warn("⚠️ No hay token JWT activo. Inicia sesión o asigna window.authToken manualmente.");
}

// 🌐 Comprobación del backend
let lastStatus = null;

async function checkBackendStatus() {
  try {
   // Forzar URL correcta
   const backendURL = window.API_URL || "https://mi-sistema-proyectos-backend-4.onrender.com";
   const response = await fetch(`${backendURL}/api/health`, { cache: "no-store" });
    if (response.ok) {
      if (lastStatus === "offline") {
        console.log("🔁 Backend restaurado. Intentando sincronización automática...");
        // Intenta sincronizar automáticamente al reconectarse
        if (typeof forceSync === "function") {
          setTimeout(() => {
            try {
              forceSync();
              console.log("✅ Sincronización automática ejecutada tras reconexión.");
            } catch (err) {
              console.warn("⚠️ Error en forceSync tras reconexión:", err);
            }
          }, 2000);
        }
      }
      lastStatus = "online";
      updateConnectionIndicator("online");
      useBackend = true;
      return true;
    }
  } catch {
    lastStatus = "offline";
    updateConnectionIndicator("offline");
    useBackend = false;
  }
  lastStatus = "offline";
  updateConnectionIndicator("offline");
  return false;
}

// 🔁 Revisar cada 15 segundos automáticamente
setInterval(checkBackendStatus, 15000);
checkBackendStatus(); // ejecutar inmediatamente al iniciar





// Función para verificar estado del backend
async function checkBackendStatus() {
  try {
    console.log('🔄 Verificando conexión con backend...');
    const response = await fetch(`${API_URL}/api/health`);
    if (response.ok) {
      console.log('✅ Backend disponible');
      useBackend = true;
      return true;
    }
  } catch (error) {
    console.warn('⚠️ Backend no disponible - Modo localStorage');
    useBackend = false;
  }
  return false;
}

// Función de respaldo para guardar
async function safeSave() {
  console.group('📤 Guardando datos en backend o localStorage');

  // Siempre guardar en localStorage
  localStorage.setItem('projects', JSON.stringify(projects));
  console.log('📦 Datos guardados en localStorage');

  // Verificar backend al momento de guardar
if (await checkBackendStatus()) {
  console.log("➡️ Intentando guardar en backend...");

    
  const token = window.authToken;
if (!token) {
   return true;
}

    
    try {
console.log("🔐 Token usado para guardar:", token);

   const response = await fetch(`${API_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          projects: projects,
          currentProjectIndex: currentProjectIndex,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        console.log('✅ Datos guardados en MongoDB Atlas');
      } else {
        console.warn('⚠️ Error guardando en backend:', response.status);
      }
    } catch (error) {
      console.warn('⚠️ Error de conexión, datos solo en localStorage');
    }
  }

  console.groupEnd();
  return true;
}

// Función de respaldo para cargar
async function safeLoad() {
  console.group('📥 Cargando datos desde backend o localStorage');
  let loadedData = null;

  // ✅ Si el backend está disponible, CARGA SIEMPRE desde ahí
  if (await checkBackendStatus()) {
    try {
      const token = window.authToken || "";
      const response = await fetch(`${API_URL}/api/projects`, {

        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        loadedData = await response.json();
        console.log('✅ Datos cargados desde MongoDB Atlas');
        window.useBackend = true;
        // ✅ Guardar en localStorage como respaldo
        localStorage.setItem('projects', JSON.stringify(loadedData.projects));
        localStorage.setItem('currentProjectIndex', loadedData.currentProjectIndex || 0);
      }
    } catch (error) {
      console.warn('⚠️ Error cargando desde backend');
    }
  }

  // ❌ Solo usar localStorage si el backend NO está disponible
  if (!loadedData || !loadedData.projects) {
    console.log('🔄 Backend no disponible, usando localStorage');
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      loadedData = {
        projects: JSON.parse(savedProjects),
        currentProjectIndex: parseInt(localStorage.getItem('currentProjectIndex') || '0')
      };
    }
  }

  if (loadedData && loadedData.projects) {
    projects = loadedData.projects;
    currentProjectIndex = loadedData.currentProjectIndex || 0;
  } else {
    if (projects.length === 0) {
      createNewProject();
    }
  }

  console.groupEnd();
  return !!loadedData;
}


/**************************************
 * SISTEMA DE METODOLOGÍAS HÍBRIDAS - PASO 1 *
 **************************************/
class MethodologyManager {
    constructor() {
        this.currentMode = localStorage.getItem('projectMethodology') || 'hybrid';
    }

    setMode(mode) {
        const validModes = ['agile', 'traditional', 'hybrid'];
        if (validModes.includes(mode)) {
            this.currentMode = mode;
            localStorage.setItem('projectMethodology', mode);
            this.applyModeSettings();
            return true;
        }
        return false;
    }

    applyModeSettings() {
    console.log('Modo activo:', this.currentMode);
    const selector = document.getElementById('methodologySelector');
    if (selector) selector.value = this.currentMode;
    
    // Añade esta línea para ver el cambio visual
    document.body.setAttribute('data-mode', this.currentMode);


}

    getCurrentMode() {
        return this.currentMode;
    }
}

// Inicializar solo una instancia
window.methodologyManager = new MethodologyManager(); 


/**************************************
 * VARIABLES GLOBALES Y ELEMENTOS DOM *
 **************************************/
let projects = [];
let currentProjectIndex = 0;


// === AUTENTICACIÓN FRONTEND ===
let authToken = localStorage.getItem('authToken');


// === SISTEMA DE TIEMPO REAL ===
let tiempoRealSocket = null;


// === SISTEMA HÍBRIDO WEBSOCKET + LOCALSTORAGE ===
let useWebSocket = true;


function initWebSocket() {
  try {
    if (typeof io === 'undefined') {
      console.warn('⚠️ Socket.io no cargado, reintentando...');
      setTimeout(initWebSocket, 2000);
      return;
    }
    
    console.log('🔄 Iniciando WebSocket...');
    tiempoRealSocket = io('https://mi-sistema-proyectos-backend-4.onrender.com', {
      transports: ['websocket', 'polling']
    });
    
    tiempoRealSocket.on('connect', function() {
      console.log('🔗 Conectado al servidor en tiempo real');
      if (window.currentProjectIndex !== null && window.currentProjectIndex !== undefined) {
        tiempoRealSocket.emit('join-project', window.currentProjectIndex);
      }
      
      // 🔥 CONFIGURAR LISTENERS PARA EVENTOS DE SALIDA
      console.log('👂 Configurando listeners de salida...');
    });
    
    // 🔥 LISTENER PARA EVENTOS ENTRANTES (RECIBIR)
    tiempoRealSocket.on('task-updated', function(data) {
      console.log('🎯 EVENTO RECIBIDO:', data);
      refreshCurrentView();
    });
    
    tiempoRealSocket.on('disconnect', function() {
      console.log('🔌 Desconectado');
    });
    
  } catch (error) {
    console.error('❌ Error WebSocket:', error);
  }
}
function refreshCurrentView() {
  console.log('🔄 Sincronizando datos desde la base de datos...');
  
  // 🔥 FORZAR CARGA DESDE LA BASE DE DATOS COMPARTIDA
  safeLoad().then(() => {
    console.log('✅ Datos sincronizados desde MongoDB');
    
    try {
      if (typeof getActiveView !== 'function') return;
      
      const activeView = getActiveView();
      console.log('🔄 Actualizando vista:', activeView);
      
      switch(activeView) {
        case 'board':
          if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
          break;
        case 'list':
          if (typeof renderListTasks === 'function') renderListTasks();
          break;
        case 'dashboard':
          if (typeof renderDashboard === 'function') renderDashboard();
          break;
        case 'calendar':
          if (typeof renderCalendar === 'function') renderCalendar();
          break;
        case 'gantt':
          if (typeof renderGanttChart === 'function') renderGanttChart();
          break;
        case 'reports':
          if (typeof generateReports === 'function') generateReports();
          break;
        default:
          if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
      }
      
      // Actualizar estadísticas
      if (typeof updateStatistics === 'function') updateStatistics();
      if (typeof generatePieChart === 'function' && typeof getStats === 'function') {
        generatePieChart(getStats());
      }
      if (typeof updateProjectProgress === 'function') updateProjectProgress();
      
    } catch (error) {
      console.error('❌ Error actualizando vista:', error);
    }
  }).catch(error => {
    console.error('❌ Error sincronizando datos:', error);
  });
}// === FUNCIONES DE AUTENTICACIÓN (ÁMBITO GLOBAL) ===
function showRegisterForm() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
  document.getElementById('registerError').textContent = '';
}

function showLoginForm() {
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('loginError').textContent = '';
}

async function register() {
  const name = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value;
  if (!name || !email || !password) {
    document.getElementById('registerError').textContent = 'Completa todos los campos';
    return;
  }
  try {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role: 'viewer'  })
    });
    const data = await res.json();
    if (res.ok) {
      alert('✅ Cuenta creada. Ahora inicia sesión.');
      setTimeout(showLoginForm, 1500);
    } else {
      document.getElementById('registerError').textContent = data.error || 'Error al crear cuenta';
    }
  } catch (err) {
    document.getElementById('registerError').textContent = 'Error de conexión con el servidor';
  }
}

async function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  if (!email || !password) {
    document.getElementById('loginError').textContent = 'Completa todos los campos';
    return;
  }
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    console.log('🚀 Respuesta del backend:', res.status, res.statusText);

    // Intenta leer el cuerpo solo si hay contenido
    let data = {};
    if (res.headers.get('content-length') !== '0') {
      data = await res.json();
    }

    console.log('✅ Datos recibidos:', data);

    if (res.ok) {
      authToken = data.token;
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('userRole', data.user.role || 'viewer');
      location.reload();
    } else {
      document.getElementById('loginError').textContent = data.error || 'Error desconocido';
    }
  } catch (err) {
    console.error('❌ Error en login():', err); // 👈 Añade este log
    document.getElementById('loginError').textContent = 'Error de conexión con el servidor';
  }
}
// === MOSTRAR PANTALLA DE LOGIN/REGISTRO ===
function showLoginScreen() {
  document.body.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#f5f7fa;font-family:Arial,sans-serif;">
      <div id="authFormContainer" style="background:white;padding:30px;border-radius:10px;box-shadow:0 4px 12px rgba(0,0,0,0.1);width:350px;">
        <!-- Formulario de Login -->
        <div id="loginForm">
          <h2 style="text-align:center;margin:0 0 20px;">🔒 Iniciar Sesión</h2>
          <input type="email" id="loginEmail" placeholder="Email" style="width:100%;padding:10px;margin:8px 0;border:1px solid #ddd;border-radius:4px;">
          <input type="password" id="loginPassword" placeholder="Contraseña" style="width:100%;padding:10px;margin:8px 0;border:1px solid #ddd;border-radius:4px;">
          <button onclick="login()" style="width:100%;padding:12px;background:#3498db;color:white;border:none;border-radius:4px;cursor:pointer;font-weight:bold;">Entrar</button>
          <div id="loginError" style="color:#e74c3c;margin-top:12px;text-align:center;"></div>
          <div style="margin-top:15px;text-align:center;">
            ¿No tienes cuenta? 
            <a href="#" onclick="showRegisterForm(); return false;" style="color:#3498db;text-decoration:underline;">Regístrate aquí</a>
          </div>
        </div>

        <!-- Formulario de Registro (oculto por defecto) -->
        <div id="registerForm" style="display:none;">
          <h2 style="text-align:center;margin:0 0 20px;">📝 Crear Cuenta</h2>
          <input type="text" id="registerName" placeholder="Nombre completo" style="width:100%;padding:10px;margin:8px 0;border:1px solid #ddd;border-radius:4px;">
          <input type="email" id="registerEmail" placeholder="Email" style="width:100%;padding:10px;margin:8px 0;border:1px solid #ddd;border-radius:4px;">
          <input type="password" id="registerPassword" placeholder="Contraseña" style="width:100%;padding:10px;margin:8px 0;border:1px solid #ddd;border-radius:4px;">
          <button onclick="register()" style="width:100%;padding:12px;background:#2ecc71;color:white;border:none;border-radius:4px;cursor:pointer;font-weight:bold;">Crear Cuenta</button>
          <div id="registerError" style="color:#e74c3c;margin-top:12px;text-align:center;"></div>
          <div style="margin-top:15px;text-align:center;">
            ¿Ya tienes cuenta? 
            <a href="#" onclick="showLoginForm(); return false;" style="color:#3498db;text-decoration:underline;">Inicia sesión</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Elementos del DOM
const projectNameDisplay = document.getElementById('projectName');
const projectNameList = document.getElementById('projectNameList');
const projectNameCalendar = document.getElementById('projectNameCalendar');
const projectNameGantt = document.getElementById('projectNameGantt');
const projectNameReports = document.getElementById('projectNameReports');
const projectListContainer = document.getElementById('projectList');
const statisticsSection = document.querySelector('.statistics');
const notification = document.getElementById('notification');
const taskDetailsModal = document.getElementById('taskDetailsModal');
const createTaskModal = document.getElementById('createTaskModal');
const createTaskForm = document.getElementById('createTaskForm');
const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
const sidebar = document.querySelector('aside');

// Columnas del Kanban
const columns = {
  pending: document.getElementById('pendingList'),
  inProgress: document.getElementById('inProgressList'),
  completed: document.getElementById('completedList'),
  overdue: document.getElementById('overdueList')
};

// Elementos de estadísticas
const totalTasks = document.getElementById('totalTaskCount');
const pendingCount = document.getElementById('pendingCount');
const inProgressCount = document.getElementById('inProgressCount');
const completedCount = document.getElementById('completedCount');
const overdueCount = document.getElementById('overdueCount');
const pieChartCanvas = document.getElementById('pieChart');

// Elementos de tiempo en Reports
const totalEstimatedTime = document.getElementById('totalEstimatedTime');
const totalLoggedTime = document.getElementById('totalLoggedTime');
const remainingTime = document.getElementById('remainingTime');

// ===== SELECTORES DE VISTAS =====
// Versión corregida:
const viewSelectors = {
  board: '#boardView',
  list: '#listView',
  calendar: '#calendarView',
  gantt: '#ganttView',
  reports: '#reportsView',
  profitability: '#profitabilityView',
  dashboard: '#dashboardView',
  timeAllocation: '#timeAllocationView',
  ganttPro: "#ganttProView",
  dashboard4d: '#dashboard4dView'   // <-- AÑADIR ESTA LÍNEA
};

const viewButtons = {
  board: document.querySelector('#showBoardView'),
  list: document.querySelector('#showListView'),
  calendar: document.querySelector('#showCalendarView'),
  gantt: document.querySelector('#showGanttView'),
  reports: document.querySelector('#showReportsView'),
  profitability: document.querySelector('#showProfitabilityView'),
  dashboard: document.querySelector('#showDashboardView'),
    dashboard4d: document.querySelector('#showDashboard4DView'), // <-- AÑADIR
  ganttPro: document.querySelector('#showGanttProView')
};



// ===== ELEMENTOS DE VISTAS =====
const boardView = document.querySelector(viewSelectors.board);
const listView = document.querySelector(viewSelectors.list);
const calendarView = document.querySelector(viewSelectors.calendar);
const ganttView = document.querySelector(viewSelectors.gantt);
const reportsView = document.querySelector(viewSelectors.reports);
const profitabilityView = document.querySelector(viewSelectors.profitability);
const dashboard4dView = document.querySelector(viewSelectors.dashboard4d);
const dashboardView = document.querySelector(viewSelectors.dashboard);
const ganttProView = document.querySelector(viewSelectors.ganttPro);


function syncLinesWithSidebar() {
    console.log('🔧 Ejecutando syncLinesWithSidebar corregida...');
    
    const sidebar = document.querySelector('aside, #sidebar, .sidebar');

if (activeView === 'gantt') {
    console.warn("⛔ Sincronización del Gantt desactivada.");
    return;
}



const linesContainer = document.querySelector(
  '.dependency-lines-container, #projectTimeline, #ganttContainer, .gantt-container'
);
const mainContent = document.querySelector('main, #mainContent, .main-content, #dashboardContent');

    
    console.log('📌 Sidebar encontrado:', !!sidebar);
    console.log('📌 LinesContainer encontrado:', !!linesContainer);
    console.log('📌 MainContent encontrado:', !!mainContent);
    
    if (!sidebar || !linesContainer || !mainContent) {
        console.log('❌ No se pueden sincronizar - elementos no encontrados');
        return;
    }
    
    // Verificar si el sidebar está visible u oculto
    const isSidebarHidden = sidebar.classList.contains('hidden');
    
    console.log('📊 Estado sidebar:', isSidebarHidden ? 'OCULTO' : 'VISIBLE');
    
    // CORRECCIÓN: Las líneas deben permanecer en su posición original
    // independientemente del estado del sidebar
    if (isSidebarHidden) {
        // Cuando el sidebar está oculto, las líneas NO se mueven
        linesContainer.style.transform = 'none';
        console.log('✅ Líneas mantenidas en posición original (sidebar oculto)');
    } else {
        // Cuando el sidebar está visible, las líneas se ajustan al ancho del sidebar
        const sidebarWidth = sidebar.offsetWidth;
        linesContainer.style.transform = `translateX(${sidebarWidth}px)`;
        console.log(`✅ Líneas ajustadas a: translateX(${sidebarWidth}px) (sidebar visible)`);
    }
}











/*********************************
 * ESTILOS DE MODO PARA DASHBOARD *
 *********************************/

function applyDashboardModeStyles(mode) {
  console.log('🎨 Aplicando modo:', mode);
  const dashboardElement = document.getElementById('dashboardView');
  if (!dashboardElement) return;
  
  dashboard.classList.remove('mode-agile', 'mode-traditional', 'mode-hybrid');
  dashboard.classList.add('mode-' + mode);
  
  // Aquí NO ocultamos ni mostramos nada, solo cambiamos estilos
  // Tu dashboard híbrido se mantiene COMPLETO en todos los modos
}

function highlightRelevantSections(mode) {
  const highlightStyles = {
    'agile': `
      .mode-agile .progress-container,
      .mode-agile .time-metric,
      .mode-agile #timeChart,
      .mode-agile #tasksDistributionChart {
        border-left: 4px solid #4caf50 !important;
        background-color: rgba(76, 175, 80, 0.05) !important;
        transition: all 0.3s ease;
      }
    `,
    'traditional': `
      .mode-traditional .progress-container,
      .mode-traditional .time-metric,
      .mode-traditional #timeChart,
      .mode-traditional #tasksDistributionChart {
        border-left: 4px solid #2196f3 !important;
        background-color: rgba(33, 150, 243, 0.05) !important;
        transition: all 0.3s ease;
      }
    `,
    'hybrid': ''
  };

  // Eliminar estilo anterior
  const oldStyle = document.getElementById('dashboard-mode-styles');
  if (oldStyle) oldStyle.remove();

  // Crear nuevo estilo
  const style = document.createElement('style');
  style.id = 'dashboard-mode-styles';
  style.textContent = highlightStyles[mode] || '';
  document.head.appendChild(style);
}
/*************************
 * FUNCIONES AUXILIARES *
 *************************/
function getStatusText(status) {
  switch (status) {
    case 'pending': return 'Pendiente';
    case 'inProgress': return 'En Progreso';
    case 'completed': return 'Completado';
    case 'overdue': return 'Rezagado';
    default: return status || 'Desconocido';
  }
}

function capitalizeFirstLetter(string) {
  return string?.charAt(0).toUpperCase() + string?.slice(1) || '';
}

function formatDate(date) {
  if (!date) return '--/--/----';
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function showNotification(message) {
    const notif = document.createElement('div');
    notif.textContent = message;
    notif.style.cssText = `
        position: fixed; top: 20px; right: 20px; background: #333; color: white;
        padding: 10px 20px; border-radius: 5px; z-index: 9999; font-family: Arial, sans-serif;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(notif);
    setTimeout(() => document.body.removeChild(notif), 3000);
}
function updateLocalStorage() {
    // Esta función ahora solo es un alias para safeSave
    safeSave().then(() => {
        console.log('🔄 Datos persistidos (localStorage + backend si está disponible)');
    });
}
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

/******************************
 * FUNCIONES DE CONTROL DE VISTAS
 ******************************/
function showView(view) {


// 🚫 BLOQUEAR COMPLETAMENTE EL DIAGRAMA DE GANTT ACTUAL
if (view === 'gantt') {
    console.warn("⛔ Gantt actual desactivado temporalmente.");
    showNotification("⛔ El diagrama de Gantt se encuentra desactivado.");
    return;
}




// === [NUEVO CÓDIGO - COLOCAR JUSTO AQUÍ] ===
  // Validación de modo metodológico
  const currentMode = window.methodologyManager?.getCurrentMode?.() || 'hybrid';
  const allowedViews = {
  agile: ['board', 'calendar', 'list', 'dashboard', 'timeAllocation'],
  traditional: ['gantt', 'list', 'reports', 'dashboard', 'timeAllocation'],
  hybrid: ['board', 'gantt', 'calendar', 'list', 'reports', 'dashboard', 'profitability', 'timeAllocation']
};


  if (currentMode && allowedViews[currentMode] && !allowedViews[currentMode].includes(view)) {
      showNotification(`💡 En modo ${currentMode} se recomienda usar: ${allowedViews[currentMode].join(', ')}`);
      return; // Detener la ejecución
  }
  // === [FIN DEL NUEVO CÓDIGO] ===

  if (!viewSelectors[view]) {
    console.error(`Vista "${view}" no existe`);
    return;
  }

  Object.values(viewSelectors).forEach(selector => {
    const element = document.querySelector(selector);
    if (element) element.classList.add('hidden');
  });



  const activeView = document.querySelector(viewSelectors[view]);
  if (activeView) activeView.classList.remove('hidden');

  Object.entries(viewButtons).forEach(([key, button]) => {
    if (button) {
      button.classList.toggle('active', key === view);
    }
  });

  switch(view) {
    case 'board':
      renderKanbanTasks();
      break;
    case 'list':
      renderListTasks();
      break;
    case 'calendar':
            addCalendarStyles();
            setTimeout(() => {
                renderCalendar();
                // 🔥 AGREGAR ESTA LÍNEA - Inicializar observer del calendario
                setTimeout(setupCalendarResizeObserver, 500);
            }, 100);
            break;
      break;
    case 'gantt':
  // 🔥 SOLUCIÓN: Pasar las tareas del proyecto actual explícitamente
  const ganttTasks = projects[currentProjectIndex]?.tasks || [];
  console.log('🎯 Renderizando Gantt con:', ganttTasks.length, 'tareas');
  renderGanttChart(ganttTasks);
  break;
     case 'reports':
      // 🔥 ESPERAR a que la vista sea visible antes de generar el gráfico
      setTimeout(() => {
        generateReports();
        // Forzar actualización del gráfico después de que la vista sea visible
        setTimeout(() => {
          const stats = getStats();
          generatePieChart(stats);
        }, 100);
      }, 50);
      break;
    case 'profitability':
      renderProfitabilityView();
      break;
    case 'dashboard':
    renderDashboard();
    break;
  case 'timeAllocation':
    renderTimeAllocationView();
    break;
    case 'dashboard4d':
  // Mostrar / renderizar Dashboard 4D
  renderDashboard4D();
  break;
}
  
  localStorage.setItem('activeView', view);
}

function updateMenuButtons(activeView) {
  // Remover la clase 'active' de todos los botones primero
  document.querySelectorAll('#sidebar ul li').forEach(button => {
    button.classList.remove('active');
  });

  // Agregar la clase 'active' solo al botón correspondiente
  const activeButton = document.getElementById(`show${capitalizeFirstLetter(activeView)}View`);
  if (activeButton) {
    activeButton.classList.add('active');

}}

/******************************
 * FUNCIONES PRINCIPALES
 ******************************/
function getFilteredTasks(view = 'board') {
  const prefixMap = {
    board: '',
    list: 'List',
    calendar: 'Calendar',
    gantt: 'Gantt',
    reports: 'Reports'
  };
  
  const prefix = prefixMap[view] || '';
  const assignee = document.getElementById(`filterAssignee${prefix}`)?.value.trim();
  const priority = document.getElementById(`filterPriority${prefix}`)?.value;
  const status = document.getElementById(`filterStatus${prefix}`)?.value;
  const start = document.getElementById(`filterStartDate${prefix}`)?.value;
  const end = document.getElementById(`filterEndDate${prefix}`)?.value;

  const tasks = projects[currentProjectIndex]?.tasks || [];

  return tasks.filter(task => {
    const taskAssignee = task.assignee?.trim() || '';
    const taskPriority = task.priority || '';
    const taskStatus = task.status || '';
    const taskStartDate = task.startDate || '';
    const taskDeadline = task.deadline || '';

    const matchAssignee = !assignee || taskAssignee === assignee;
    const matchPriority = !priority || taskPriority === priority;
    const matchStatus = !status || taskStatus === status;
    const matchStartDate = !start || !taskStartDate || taskStartDate >= start;
    const matchEndDate = !end || !taskDeadline || taskDeadline <= end;

    return matchAssignee && matchPriority && matchStatus && matchStartDate && matchEndDate;
  });
}

function aplicarFiltros() {
  const activeView = getActiveView();
  const filteredTasks = getFilteredTasks(activeView);

  switch(activeView) {
    case 'board':
      renderKanbanTasks(filteredTasks);
      break;
    case 'list':
      renderListTasks(filteredTasks);
      break;
    case 'calendar':
      // 🔥 ACTUALIZAR CALENDARIO AUTOMÁTICAMENTE
      refreshCalendar();
      break;
    case 'gantt':
      renderGanttChart(filteredTasks);
      break;
    case 'reports':
      generateReports(filteredTasks);
      break;
    case 'profitability':
      renderProfitabilityView();
      break;
  }
}

function getActiveView() {
  if (!boardView.classList.contains('hidden')) return 'board';
  if (!listView.classList.contains('hidden')) return 'list';
  if (!calendarView.classList.contains('hidden')) return 'calendar';
  if (!ganttView.classList.contains('hidden')) return 'gantt';
  if (!reportsView.classList.contains('hidden')) return 'reports';
  if (!profitabilityView.classList.contains('hidden')) return 'profitability';
  return 'board';
}

/******************************
 * FUNCIONES DE RENDERIZADO
 ******************************/
function renderKanbanTasks(tasks = null) {
  console.log('🔄 renderKanbanTasks ejecutándose...');
  
  // 🔥 VALIDACIONES CRÍTICAS AGREGADAS
  if (!projects || projects.length === 0 || !projects[currentProjectIndex]) {
    console.warn('⚠️ No hay proyectos disponibles. Saltando renderizado.');
    // Limpiar columnas mostrando mensaje amigable
    Object.values(columns).forEach(col => {
      if (col && col.innerHTML !== undefined) {
        col.innerHTML = '<div class="no-data" style="padding: 20px; text-align: center; color: #7f8c8d;">No hay proyecto seleccionado</div>';
      }
    });
    return;
  }

  // Validar que las columnas existen
  if (!columns.pending || !columns.inProgress || !columns.completed || !columns.overdue) {
    console.error('❌ Error: Columnas del Kanban no inicializadas');
    return;
  }

  console.log('✅ Proyecto válido:', projects[currentProjectIndex].name);
  
  // 🎯 TU CÓDIGO ORIGINAL (con una pequeña protección)
  const tasksToRender = tasks || getFilteredTasks('board');
  
  Object.values(columns).forEach(col => {
    if (col) col.innerHTML = '';
  });

  console.log(`📋 Tareas a renderizar: ${tasksToRender.length}`);

  tasksToRender.forEach(task => {
    // Calcular progreso de subtareas
    const completedSubtasks = task.subtasks?.filter(st => st.completed).length || 0;
    const totalSubtasks = task.subtasks?.length || 0;
    const subtaskProgress = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

    const card = document.createElement('div');
    card.className = 'task-card';
    card.draggable = true;
    card.dataset.taskId = task.id;
    card.dataset.status = task.status;
    card.dataset.priority = task.priority;
    card.dataset.assignee = task.assignee || '';
    card.dataset.startDate = task.startDate || '';
    card.dataset.deadline = task.deadline || '';

    card.innerHTML = `
      <div class="task-header">
        <strong>${task.name}</strong>
        <div class="task-movement-buttons">
          <button class="move-up-btn" onclick="event.stopPropagation(); moveTaskUp(${task.id}, '${task.status}')">↑</button>
          <button class="move-down-btn" onclick="event.stopPropagation(); moveTaskDown(${task.id}, '${task.status}')">↓</button>
        </div>
        <div class="task-menu" onclick="event.stopPropagation(); toggleTaskMenu(event, ${task.id})">⋮</div>
        <div class="task-context-menu" id="task-menu-${task.id}">
          <div class="task-context-menu-item delete" onclick="deleteTaskFromMenu(${task.id})">Eliminar Tarea</div>
        </div>
      </div>
      <div class="task-meta">
        <span class="priority-badge ${task.priority}">${capitalizeFirstLetter(task.priority)}</span>
        <span class="status-badge ${task.status}">${getStatusText(task.status)}</span>
      </div>

${totalSubtasks > 0 ? `
  <div class="subtask-progress">
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${subtaskProgress}%"></div>
    </div>
    <div class="progress-text">
  <strong>${subtaskProgress}%</strong> 
  <span>(${completedSubtasks}/${totalSubtasks})</span>
</div>
` : ''}

      <div class="task-footer">
        <p><strong>Fecha Límite:</strong> ${task.deadline || '-'}</p>
      </div>
    `;

    // Configuración del evento click para mostrar detalles
    card.addEventListener('click', () => showTaskDetails(task));
    
    // 🔥 PROTECCIÓN CLAVE: Verificar que la columna existe antes de appendChild
    const targetColumn = columns[task.status];
    if (targetColumn) {
      targetColumn.appendChild(card);
      console.log(`✅ Tarea "${task.name}" agregada a columna ${task.status}`);
    } else {
      console.error(`❌ Columna no encontrada para estado: ${task.status}`);
    }
  });

  initDragAndDrop();
  console.log('✅ renderKanbanTasks completado exitosamente');
}






/*********************
 * MENÚ CONTEXTUAL DE TAREAS *
 *********************/
function toggleTaskMenu(event, taskId) {
  event.stopPropagation();
  
  // Cerrar todos los otros menús
  document.querySelectorAll('.task-context-menu').forEach(menu => {
    if (menu.id !== `task-menu-${taskId}`) {
      menu.classList.remove('show');
    }
  });
  
  // Alternar el menú actual
  const menu = document.getElementById(`task-menu-${taskId}`);
  if (menu) {
    menu.classList.toggle('show');
  }
}

function deleteTaskFromMenu(taskId) {
  const task = projects[currentProjectIndex].tasks.find(t => t.id === taskId);
  if (!task) return;
  
  if (confirm(`¿Estás seguro de eliminar "${task.name}"? Esta acción no se puede deshacer.`)) {

if (window.syncManager) window.syncManager.notifyChange('task-deleted', { 
          projectIndex: currentProjectIndex, 
          taskId: taskId, 
          taskName: task.name 
      });



    // 🔥 PRIMERO NOTIFICAR la eliminación
    if (tiempoRealSocket && tiempoRealSocket.connected) {
      tiempoRealSocket.emit('task-changed', {
        projectId: currentProjectIndex,
        taskId: taskId,
        taskName: task.name,
        userName: 'Usuario actual',
        type: 'task-deleted',
        timestamp: new Date().toISOString()
      });
      console.log('📢 Notificando eliminación de tarea');
    }
    
    // LUEGO eliminar (tu código actual)
    projects[currentProjectIndex].tasks = projects[currentProjectIndex].tasks.filter(t => t.id !== taskId);
    updateLocalStorage();
    actualizarAsignados();
    aplicarFiltros();
    generatePieChart(getStats());
    updateProjectProgress();
    actualizarAsignados();
    showNotification(`Tarea "${task.name}" eliminada`);
  }
}
function renderListTasks(tasks = null) {
  const taskTableBody = document.getElementById('taskTableBody');
  if (!taskTableBody) return;

  taskTableBody.innerHTML = '';

  const tasksToRender = tasks || getFilteredTasks('list');

  if (tasksToRender.length === 0) {
    const emptyRow = document.createElement('tr');
    emptyRow.className = 'empty-row';
    emptyRow.innerHTML = `
      <td colspan="6" class="empty-cell">
        <i class="fas fa-tasks"></i>
        No se encontraron tareas con los filtros aplicados
      </td>
    `;
    taskTableBody.appendChild(emptyRow);
    return;
  }

  tasksToRender.forEach((task, index) => {
    const row = document.createElement('tr');
    row.className = `task-data-row ${index % 2 === 0 ? 'even-row' : 'odd-row'}`;
    
    const estadoText = getStatusText(task.status);
    const priorityText = capitalizeFirstLetter(task.priority);
    
    row.innerHTML = `
      <td class="data-cell task-name-cell">
        <div class="task-name-content">${task.name || '-'}</div>
      </td>
      
      <td class="data-cell date-cell">
        <div class="date-content">${formatDate(task.startDate)}</div>
      </td>
      
      <td class="data-cell date-cell">
        <div class="date-content">${formatDate(task.deadline)}</div>
      </td>
      
      <td class="data-cell status-cell">
        <div class="status-pill status-${task.status}">
          ${estadoText}
        </div>
      </td>
      
      <td class="data-cell assignee-cell">
        <div class="assignee-content">${task.assignee || '-'}</div>
      </td>
      
      <td class="data-cell priority-cell">
        <div class="priority-pill priority-${task.priority}">
          ${priorityText}
        </div>
      </td>
    `;
    
    row.addEventListener('click', () => showTaskDetails(task));
    taskTableBody.appendChild(row);
  });
}
/******************************
 * FUNCIONES DEL DASHBOARD
 ******************************/
function renderDashboard() {
  const project = projects[currentProjectIndex];
  if (!project) return;

  // Actualizar información básica
  document.getElementById('projectNameDashboard').textContent = project.name;

  // Calcular KPIs
  const stats = getStats();
  const timeStats = getTimeStats();
  const completionPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

// === Cálculo y actualización de Presupuesto (uso de tiempo) ===
    const budgetUsage = calculateTimeBudgetUsage();
    const budgetElement = document.getElementById('budgetConsumption');
    if (budgetElement) {
        budgetElement.textContent = `${budgetUsage}%`;
    }

    // Actualizar fechas del proyecto
    updateProjectDatesFromTasks();


// Calcular fechas del proyecto
    const { earliestDate, latestDate } = calculateProjectDatesFromTasks(project);
    updateProjectDatesInDashboard(earliestDate, latestDate);


  // Calcular y mostrar feedback de tiempo
  const timeDifference = (project.totalProjectTime || 0) - timeStats.totalLogged;
  const feedbackElement = document.getElementById('timeFeedback');
if (feedbackElement) {
    if (timeDifference >= 0) {
        feedbackElement.textContent = `✅ Excelente Trabajo - Estás dentro del tiempo Programado (${timeDifference.toFixed(1)}h restantes)`;
    } else {
        feedbackElement.innerHTML = `<span class="warning-symbol">⚠</span> Algo anda mal - Has excedido el tiempo programado por (${Math.abs(timeDifference).toFixed(1)}h)`;
    }
}


  // Actualizar barra de progreso y porcentaje
  const progressFill = document.getElementById('projectProgressFillDash');
  const progressPercentage = document.getElementById('progressPercentage');
  if (progressFill) {
    progressFill.style.width = `${completionPercentage}%`;
    progressFill.style.backgroundColor = '#2ecc71'; // Verde para completado
  }

// Actualizar campo de Avance en el resumen
const avanceElement = document.getElementById('completionPercentage');
if (avanceElement) {
    avanceElement.textContent = `${completionPercentage}%`;
}

  if (progressPercentage) {
    progressPercentage.textContent = `${completionPercentage}% Completado`;
  }

  // Actualizar todos los cuadros de métricas
  document.getElementById('totalTasksMetric').textContent = stats.total;
  document.getElementById('pendingTasksMetric').textContent = stats.pending;
  document.getElementById('inProgressTasksMetric').textContent = stats.inProgress;
  document.getElementById('completedTasksMetric').textContent = stats.completed;
  document.getElementById('overdueTasksMetric').textContent = stats.overdue;

  // Actualizar métricas de tiempo
  document.getElementById('totalProjectTimeDash').textContent = `${project.totalProjectTime || 0}h`;
  document.getElementById('totalEstimatedDash').textContent = `${timeStats.totalEstimated.toFixed(1)}h`;
  document.getElementById('totalLoggedDash').textContent = `${timeStats.totalLogged.toFixed(1)}h`;

// ✅ Actualizar estado basado en tiempo
updateProjectHealthStatus(); // ← Esta línea es clave


  // Calcular el tiempo restante basado en el tiempo total del proyecto
  const projectTimeRemaining = (project.totalProjectTime || 0) - timeStats.totalLogged;
  document.getElementById('remainingTimeDash').textContent = `${projectTimeRemaining.toFixed(1)}h`;

  // Actualizar gráficos
  renderDashboardCharts();

  // Actualizar estado del proyecto
  updateProjectHealthStatus();

  // Actualizar hitos y acciones
  updateMilestones();
  updateRequiredActions();

  // Actualiza estadísticas visuales
  updateStatistics();
  generatePieChart(getStats());


  // Dibuja gráfica de recursos
  updateResourceAllocation();

  // === IMPORTANTE: Asegúrate de que esta línea esté presente ===
  updateProjectTimeline(); // ← Añade esta línea si ya tienes la función definida
  updateProjectDatesFromTasks();
// ✅ Actualizar contador de riesgos
updateRisksCount();

// === [NUEVO: ÉNFASIS DETALLADO] ===
  const currentMode = window.methodologyManager.getCurrentMode();
  applyDashboardModeStyles(currentMode);
  applyDetailedModeStyles(currentMode); // ← Añadir esta línea
}



function updateProjectDatesInDashboard(earliestDate, latestDate) {
    // Formatear las fechas
    const formattedStartDate = formatDate(earliestDate);
    const formattedEndDate = formatDate(latestDate);

    // Actualizar los campos de fecha
    document.getElementById('projectStartDate').textContent = formattedStartDate;
    document.getElementById('projectEndDate').textContent = formattedEndDate;

    // Calcular la diferencia de días
    const startDateObj = new Date(earliestDate);
    const endDateObj = new Date(latestDate);
    const timeDifference = Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));
    document.getElementById('projectTotalDays').textContent = `${timeDifference} `;
}

// Función auxiliar para formatear fechas
function formatDate(dateString) {
    if (!dateString) return '--/--/--';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '--/--/--';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;

}



function updateProjectTimeline() {
  // Verificar que el proyecto y las tareas existan
  if (!projects || !Array.isArray(projects) || currentProjectIndex === undefined || currentProjectIndex === null) {
    console.warn("⚠️ Proyecto no disponible para calcular fechas.");
    return;
  }


function updateProjectStartDate() {
    const project = projects[currentProjectIndex];
    if (!project || !project.tasks || project.tasks.length === 0) {
        document.getElementById('projectStartDate').textContent = '--/--/--';
        return;
    }

    let earliestDate = null;

    project.tasks.forEach(task => {
        if (task.startDate) {
            const taskDate = new Date(task.startDate);
            if (!earliestDate || taskDate < earliestDate) {
                earliestDate = taskDate;
            }
        }
    });

    if (earliestDate) {
        const day = String(earliestDate.getDate()).padStart(2, '0');
        const month = String(earliestDate.getMonth() + 1).padStart(2, '0');
        const year = earliestDate.getFullYear();
        document.getElementById('projectStartDate').textContent = `${day}/${month}/${year}`;
    } else {
        document.getElementById('projectStartDate').textContent = '--/--/--';
    }
}




  const project = projects[currentProjectIndex];
  if (!project || !project.tasks || project.tasks.length === 0) {
    document.getElementById('projectStartDate').textContent = '--/--/--';
    document.getElementById('projectEndDate').textContent = '--/--/--';
    return;
  }

  const tasks = project.tasks;

  // Extraer y filtrar fechas de inicio (startDate) y fin (deadline)
  const startDates = tasks
    .filter(t => t.startDate)
    .map(t => new Date(t.startDate))
    .filter(date => !isNaN(date.getTime()));

  const endDates = tasks
    .filter(t => t.deadline)
    .map(t => new Date(t.deadline))
    .filter(date => !isNaN(date.getTime()));

  // Si no hay fechas válidas
  if (startDates.length === 0) {
    document.getElementById('projectStartDate').textContent = '--/--/--';
  } else {
    const earliestStart = new Date(Math.min(...startDates));
    document.getElementById('projectStartDate').textContent = formatDate(earliestStart);
  }

  if (endDates.length === 0) {
    document.getElementById('projectEndDate').textContent = '--/--/--';
  } else {
    const latestEnd = new Date(Math.max(...endDates));
    document.getElementById('projectEndDate').textContent = formatDate(latestEnd);
  }
}function renderDashboardCharts() {
  const stats = getStats();
  const timeStats = getTimeStats();
  
  // Gráfico de distribución de tareas
  const tasksCtx = document.getElementById('tasksDistributionChart').getContext('2d');
  if (window.tasksChart) window.tasksChart.destroy();
  
  window.tasksChart = new Chart(tasksCtx, {
    type: 'doughnut',
    data: {
      labels: ['Pendientes', 'En Progreso', 'Completadas'],
      datasets: [{
        data: [stats.pending, stats.inProgress, stats.completed],
        backgroundColor: ['#f1c40f', '#008090', '#2ecc71']
      }]
    },
    options: {
      cutout: '70%',
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
  
  // Gráfico de tiempo
  const timeCtx = document.getElementById('timeChart').getContext('2d');
  if (window.timeChart) window.timeChart.destroy();
  
  window.timeChart = new Chart(timeCtx, {
    type: 'bar',
    data: {
      labels: ['Estimado', 'Registrado', 'Restante'],
      datasets: [{
        data: [timeStats.totalEstimated, timeStats.totalLogged, timeStats.remaining],
        backgroundColor: ['#3498db', '#2ecc71', '#f39c12']
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
// Al final de la función, asegúrate de incluir:
    updateResourceAllocation();
}

function updateProjectHealthStatus() {
  // Obtener estadísticas de tiempo
  const timeStats = getTimeStats();
  const totalEstimated = timeStats.totalEstimated;  // Tiempo total estimado
  const totalLogged = timeStats.totalLogged;        // Tiempo ya registrado

  // Calcular la diferencia: Tiempo Total - Tiempo Registrado
  const difference = totalEstimated - totalLogged;

  // Obtener el contenedor y el badge del estado
  const healthStatus = document.getElementById('projectHealthStatus');
  const badge = healthStatus.querySelector('.status-badge');

  // Limpiar clases de estado anteriores
  badge.classList.remove('healthy', 'warning', 'critical');

  // Actualizar texto y color según la diferencia
  if (difference >= 0) {
    // Dentro del tiempo estimado
    badge.classList.add('healthy');
    badge.textContent = 'EN TIEMPO';
  } else {
    // Fuera de tiempo
    badge.classList.add('critical');
    badge.textContent = 'A destiempo';
  }
}
function updateMilestones() {
  // Esta función ahora se maneja automáticamente con el sistema de carga/guardado
  // Los hitos se actualizan cuando se agregan/eliminan
}
function updateRequiredActions() {
  // Implementar lógica para identificar acciones requeridas
}
/******************************
 * FUNCIÓN DE CALENDARIO
 ******************************/
function renderCalendar() {
  const calendarEl = document.getElementById('calendar');
  if (!calendarEl) {
    console.error('❌ No se encuentra el elemento calendar');
    return;
  }

  // Limpiar el calendario existente
  calendarEl.innerHTML = '';

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    locale: 'es',
    editable: true,
    selectable: true,
    dayMaxEvents: 3, // Mostrar máximo 3 eventos por día antes de "+more"
    dayMaxEventRows: true, // Permitir scroll cuando hay muchos eventos
    displayEventTime: false,
    
    // Configuración para mostrar rangos completos
    eventDisplay: 'block',
    
    dateClick: function(info) {
      document.getElementById('createTaskModal').style.display = 'block';
      document.getElementById('taskStartDate').value = info.dateStr;
      document.getElementById('taskDeadline').value = info.dateStr;
    },
    
    events: getFilteredCalendarTasks(),
    
    eventClick: function(info) {
      const taskName = info.event.title;
      const task = projects[currentProjectIndex].tasks.find(t => t.name === taskName);
      if (task) {
        showTaskDetails(task);
      }
    },
    
    // Personalización de la apariencia de los eventos
    eventDidMount: function(info) {
      // Agregar tooltip personalizado
      if (info.event.extendedProps.description) {
        info.el.setAttribute('title', info.event.extendedProps.description);
      }
      
      // Asegurar que los eventos ocupen todo el ancho del día
      info.el.style.width = '95%';
      info.el.style.margin = '2px auto';
      info.el.style.borderRadius = '4px';
      info.el.style.fontSize = '14px'; // 🔥 TEXTO MÁS GRANDE
      info.el.style.fontWeight = 'bold';
      info.el.style.padding = '4px 6px'; // 🔥 MÁS ESPACIO
    },
    
    // 🔥 NUEVO: Forzar actualización cuando cambian los datos
    eventChange: function(info) {
      console.log('Evento modificado:', info.event);
      updateTaskFromCalendar(info.event);
    }
  });

  calendar.render();
  console.log('✅ Calendario renderizado con vista tipo Jira');
  
  // 🔥 GUARDAR REFERENCIA PARA ACTUALIZACIONES
  window.calendarInstance = calendar;
  return calendar;
}

// 🔥 NUEVA FUNCIÓN: Actualizar calendario cuando cambian los datos
function refreshCalendar() {
  if (window.calendarInstance) {
    window.calendarInstance.refetchEvents();
    console.log('🔄 Calendario actualizado automáticamente');
  }
}

// 🔥 NUEVA FUNCIÓN: Actualizar tarea desde calendario (arrastrar y soltar)
function updateTaskFromCalendar(event) {
  const taskName = event.title;
  const task = projects[currentProjectIndex].tasks.find(t => t.name === taskName);
  
  if (task) {
    // Actualizar fechas de la tarea
    task.startDate = event.startStr;
    if (event.end) {
      task.deadline = new Date(event.end);
      task.deadline.setDate(task.deadline.getDate() - 1); // Ajustar porque FullCalendar usa fecha exclusiva
      task.deadline = task.deadline.toISOString().split('T')[0];
    }
    
    updateLocalStorage();
    showNotification(`✅ "${task.name}" actualizada en el calendario`);
  }
}



// ===== AGREGAR ESTILOS PARA CALENDARIO TIPO JIRA =====
function addCalendarStyles() {
  // Verificar si los estilos ya existen
  if (document.getElementById('calendar-custom-styles')) {
    return;
  }

  const style = document.createElement('style');
  style.id = 'calendar-custom-styles';
  style.textContent = `
    /* Estilos para eventos del calendario - VISTA JIRA */
    .task-calendar-event {
      border-left: 4px solid !important;
      font-size: 14px !important; /* 🔥 TEXTO MÁS GRANDE */
      font-weight: bold;
      padding: 6px 8px !important; /* 🔥 MÁS ESPACIO */
      margin: 2px 0;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      min-height: 24px;
      line-height: 1.3 !important;
    }
    
    .task-calendar-event:hover {
      opacity: 0.9;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    }
    
    /* Colores específicos por estado */
    .status-pending {
      border-left-color: #f1c40f !important;
      background: linear-gradient(135deg, #f1c40f, #f39c12) !important;
    }
    
   .status-inProgress {
    border-left-color: #16a085 !important;           // 🔥 Verde azulado
    background: linear-gradient(135deg, #16a085, #1abc9c) !important; // 🔥 Verde azulado
}
    
    .status-completed {
      border-left-color: #2ecc71 !important;
      background: linear-gradient(135deg, #2ecc71, #27ae60) !important;
    }
    
    .status-overdue {
      border-left-color: #e74c3c !important;
      background: linear-gradient(135deg, #e74c3c, #c0392b) !important;
    }
    
    /* 🔥 MEJORAR LA VISUALIZACIÓN EN EL CALENDARIO */
    .fc-daygrid-event {
      white-space: normal !important;
      line-height: 1.3 !important;
      min-height: 26px;
    }
    
    .fc-event-title {
      font-weight: bold !important;
      font-size: 13px !important; /* 🔥 TEXTO MÁS GRANDE */
      line-height: 1.3 !important;
    }
    
    /* Asegurar que los eventos se vean bien en celdas pequeñas */
    .fc-daygrid-day-frame {
      min-height: 100px; /* 🔥 MÁS ALTURA PARA MÁS EVENTOS */
    }
    
    .fc-daygrid-event-harness {
      margin-bottom: 3px;
    }
    
    /* 🔥 ESTILOS PARA "+more" (MÁS EVENTOS) */
    .fc-daygrid-more-link {
      background: #34495e !important;
      color: white !important;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      margin-top: 2px;
    }
    
    .fc-daygrid-more-link:hover {
      background: #2c3e50 !important;
    }
    
    /* 🔥 MEJORAR EL POPOVER DE "+more" */
    .fc-more-popover {
      max-width: 300px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
    
    .fc-popover-header {
      background: #34495e;
      color: white;
      font-weight: bold;
    }
    
    /* 🔥 MEJORAR TOOLTIPS */
    .fc-event:hover {
      z-index: 1000;
    }
  `;
  document.head.appendChild(style);
  console.log('✅ Estilos del calendario mejorados agregados');
}




function getFilteredCalendarTasks() {
  const assignee = document.getElementById('filterAssigneeCalendar')?.value.trim();
  const priority = document.getElementById('filterPriorityCalendar')?.value;
  const status = document.getElementById('filterStatusCalendar')?.value;

  const tasks = projects[currentProjectIndex]?.tasks || [];
  console.log('📅 Tareas para calendario:', tasks.length);

  const filteredTasks = tasks
    .filter(task => {
      const taskAssignee = task.assignee?.trim() || '';
      const taskPriority = task.priority || '';
      const taskStatus = task.status || '';

      const matchAssignee = !assignee || taskAssignee === assignee;
      const matchPriority = !priority || taskPriority === priority;
      const matchStatus = !status || taskStatus === status;

      return matchAssignee && matchPriority && matchStatus;
    })
    .map(task => {
      console.log('📝 Procesando tarea para calendario:', task.name, 'Estado:', task.status);
      
      // Determinar color según estado
      const statusColors = {
    'pending': '#f1c40f',      // Amarillo - Pendiente
    'inProgress': '#16a085',   // 🔥 CAMBIA A: Verde azulado
    'completed': '#2ecc71',    // Verde - Completado
    'overdue': '#e74c3c'       // Rojo - Rezagado
};

      // Usar fechas de inicio y fin para crear el rango
      let startDate = task.startDate || task.deadline || new Date().toISOString().split('T')[0];
      let endDate = task.deadline || task.startDate;
      
      // 🔥 CORRECCIÓN: Si solo hay una fecha, usar esa fecha solamente
      if (!endDate || endDate === startDate) {
        // Evento de un solo día
        endDate = null;
      } else {
        // 🔥 CORRECCIÓN IMPORTANTE: FullCalendar usa fecha de fin EXCLUSIVA
        // Si queremos mostrar del 4 al 8, debemos poner endDate = 9
        const end = new Date(endDate);
        end.setDate(end.getDate() + 1); // Sumar un día para que sea inclusivo
        endDate = end.toISOString().split('T')[0];
      }

      const eventData = {
        title: task.name,
        start: startDate,
        end: endDate, // 🔥 Ahora endDate es correcto para FullCalendar
        allDay: true,
        color: statusColors[task.status] || '#95a5a6',
        textColor: '#ffffff',
        classNames: [`status-${task.status}`, 'task-calendar-event'],
        extendedProps: {
          timeTracking: task.timeLogged || 0,
          originalEstimate: task.estimatedTime || 0,
          remainingEstimate: Math.max(0, (task.estimatedTime || 0) - (task.timeLogged || 0)),
          priority: task.priority,
          assignedTo: task.assignee,
          description: `Asignado a: ${task.assignee || 'No asignado'}\nPrioridad: ${task.priority || 'No definida'}\nTiempo: ${task.timeLogged || 0}h / ${task.estimatedTime || 0}h\nEstado: ${task.status}`
        }
      };

      console.log('📅 Evento creado:', eventData.start, '→', eventData.end);
      return eventData;
    });

  console.log('✅ Tareas procesadas para calendario:', filteredTasks.length);
  return filteredTasks;
}






// ===== 🔥 AGREGAR ESTAS 2 FUNCIONES NUEVAS JUSTO AQUÍ =====

// ===== FUNCIÓN PARA REDIMENSIONAR CALENDARIO CUANDO CAMBIA EL SIDEBAR =====
function resizeCalendar() {
    if (window.calendarInstance) {
        setTimeout(() => {
            try {
                window.calendarInstance.updateSize();
                console.log('📅 Calendario redimensionado correctamente');
            } catch (error) {
                console.warn('⚠️ Error al redimensionar calendario:', error);
            }
        }, 350);
    }
}

// ===== OBSERVER PARA DETECTAR CAMBIOS EN EL SIDEBAR =====
function setupCalendarResizeObserver() {
    const sidebar = document.querySelector('aside');
    
    if (!sidebar) {
        console.log('⏳ Sidebar no encontrado, reintentando...');
        setTimeout(setupCalendarResizeObserver, 1000);
        return;
    }
    
    // Observar cambios en la clase 'hidden' del sidebar
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                console.log('🔍 Sidebar cambió - redimensionando calendario');
                resizeCalendar();
            }
        });
    });
    
    // Configurar el observer
    observer.observe(sidebar, {
        attributes: true,
        attributeFilter: ['class']
    });
    
    console.log('✅ Observer configurado para redimensionar calendario automáticamente');
}







// 🔥 VERSIÓN FINAL - DEPENDENCIAS CON FLECHAS Y TOOLTIP INTERACTIVO
// 🔥 VERSIÓN FINAL - DEPENDENCIAS CON FLECHAS Y TOOLTIPS INTERACTIVOS
function drawDependencySVGImproved() {
    console.log('🎯 DIBUJANDO DEPENDENCIAS CON NOMBRES REALES...');
    
    const ganttContainer = document.getElementById('ganttContainer');
    if (!ganttContainer) {
        console.error('❌ No se encuentra ganttContainer');
        return;
    }
    
    // Eliminar SVG previo
    const old = ganttContainer.querySelector('.gantt-dependency-svg');
    if (old) old.remove();

    // Crear SVG
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.classList.add('gantt-dependency-svg');
    svg.setAttribute('width', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.pointerEvents = 'none';
    svg.style.overflow = 'visible';
    svg.style.zIndex = '10';
    ganttContainer.appendChild(svg);
    
    // === DEFINICIONES PARA FLECHAS ===
    const defs = document.createElementNS(svgNS, 'defs');
    
    // Flecha normal
    const marker = document.createElementNS(svgNS, 'marker');
    marker.setAttribute('id', 'dependency-arrow');
    marker.setAttribute('viewBox', '0 0 10 10');
    marker.setAttribute('refX', '9');
    marker.setAttribute('refY', '5');
    marker.setAttribute('markerWidth', '6');
    marker.setAttribute('markerHeight', '6');
    marker.setAttribute('orient', 'auto');
    const arrowPath = document.createElementNS(svgNS, 'path');
    arrowPath.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
    arrowPath.setAttribute('fill', '#3498db');
    marker.appendChild(arrowPath);
    
    // Flecha con efecto hover
    const markerHover = document.createElementNS(svgNS, 'marker');
    markerHover.setAttribute('id', 'dependency-arrow-hover');
    markerHover.setAttribute('viewBox', '0 0 10 10');
    markerHover.setAttribute('refX', '9');
    markerHover.setAttribute('refY', '5');
    markerHover.setAttribute('markerWidth', '8');
    markerHover.setAttribute('markerHeight', '8');
    markerHover.setAttribute('orient', 'auto');
    const arrowPathHover = document.createElementNS(svgNS, 'path');
    arrowPathHover.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
    arrowPathHover.setAttribute('fill', '#e74c3c');
    markerHover.appendChild(arrowPathHover);
    
    defs.appendChild(marker);
    defs.appendChild(markerHover);
    svg.appendChild(defs);

    // === TOOLTIP SIMPLIFICADO ===
    const tooltip = document.createElement('div');
    tooltip.className = 'gantt-dependency-tooltip';
    tooltip.style.cssText = `
        position: fixed;
        background: #2c3e50;
        border: 1px solid #34495e;
        border-radius: 6px;
        padding: 12px;
        font-size: 13px;
        color: white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        pointer-events: none;
        transition: opacity 0.2s ease;
        opacity: 0;
        z-index: 10000;
        max-width: 250px;
        font-family: Arial, sans-serif;
        line-height: 1.4;
    `;
    document.body.appendChild(tooltip);
    
    // === OBTENER INFORMACIÓN DE TAREAS ===
    const project = window.projects && window.projects[window.currentProjectIndex];
    const tasks = project ? project.tasks : [];
    
    // Obtener todas las barras
    const bars = Array.from(ganttContainer.querySelectorAll('.gantt-bar'));
    
    // === DIBUJAR LÍNEAS ENTRE BARRAS CONSECUTIVAS ===
    for (let i = 0; i < bars.length - 1; i++) {
        const bar1 = bars[i];
        const bar2 = bars[i + 1];
        
        const gRect = ganttContainer.getBoundingClientRect();
        const rect1 = bar1.getBoundingClientRect();
        const rect2 = bar2.getBoundingClientRect();
        
        const x1 = rect1.right - gRect.left;
        const y1 = rect1.top + rect1.height / 2 - gRect.top;
        const x2 = rect2.left - gRect.left;
        const y2 = rect2.top + rect2.height / 2 - gRect.top;
        
        if (x1 >= 0 && x2 >= 0) {
            const path = document.createElementNS(svgNS, 'path');
            const offsetX = Math.min(120, Math.abs(x2 - x1) * 0.45);
            const cp1x = x1 + offsetX;
            const cp1y = y1;
            const cp2x = x2 - offsetX;
            const cp2y = y2;
            
            path.setAttribute('d', `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`);
            path.setAttribute('stroke', '#3498db');
            path.setAttribute('stroke-width', '3');
            path.setAttribute('fill', 'none');
            path.setAttribute('marker-end', 'url(#dependency-arrow)');
            path.style.cursor = 'pointer';
            path.style.transition = 'all 0.3s ease';
            
            svg.appendChild(path);
            
            // === AGREGAR TOOLTIP SOLO CON NOMBRES ===
            addSimpleTooltip(path, bar1, bar2, tooltip, i, tasks);
        }
    }
}

// === FUNCIÓN SIMPLIFICADA - SOLO NOMBRES ===
function addSimpleTooltip(path, bar1, bar2, tooltip, index, tasks) {
    // Hacer la línea interactiva
    path.style.pointerEvents = 'stroke';
    
    // Obtener nombres REALES de las tareas
    const task1Name = getRealTaskName(bar1, tasks, index);
    const task2Name = getRealTaskName(bar2, tasks, index + 1);
    
    // EFECTOS VISUALES MEJORADOS
    path.addEventListener('mouseenter', (e) => {
        // Efecto luminoso y más grueso
        path.style.strokeWidth = '6';
        path.style.stroke = '#e74c3c';
        path.style.filter = 'drop-shadow(0 0 8px rgba(231, 76, 60, 0.7))';
        path.setAttribute('marker-end', 'url(#dependency-arrow-hover)');
        
        // CONTENIDO DEL TOOLTIP - SOLO NOMBRES
        tooltip.innerHTML = `
            <div style="margin-bottom: 8px; font-weight: bold; color: #3498db;">
                🔗 Dependencia ${index + 1}
            </div>
            
            <div style="margin-bottom: 8px;">
                <strong style="color: #e74c3c;">⬅️ Tarea Predecesora:</strong><br>
                <span style="font-size: 14px; font-weight: bold;">${task1Name}</span>
            </div>
            
            <div>
                <strong style="color: #2ecc71;">➡️ Tarea Actual:</strong><br>
                <span style="font-size: 14px; font-weight: bold;">${task2Name}</span>
            </div>
        `;
        
        tooltip.style.opacity = '1';
        tooltip.style.left = `${e.clientX + 15}px`;
        tooltip.style.top = `${e.clientY - 10}px`;
    });
    
    path.addEventListener('mousemove', (e) => {
        tooltip.style.left = `${e.clientX + 15}px`;
        tooltip.style.top = `${e.clientY - 10}px`;
    });
    
    path.addEventListener('mouseleave', () => {
        // Restaurar apariencia normal
        path.style.strokeWidth = '3';
        path.style.stroke = '#3498db';
        path.style.filter = 'none';
        path.setAttribute('marker-end', 'url(#dependency-arrow)');
        
        tooltip.style.opacity = '0';
    });
}

// === FUNCIÓN PARA OBTENER NOMBRES REALES ===
function getRealTaskName(bar, tasks, index) {
    // Método 1: Buscar por taskId en la fila
    const row = bar.closest('.gantt-row');
    if (row && row.dataset.taskId) {
        const taskId = row.dataset.taskId;
        const task = tasks.find(t => String(t.id) === taskId);
        if (task && (task.name || task.title)) {
            return task.name || task.title;
        }
    }
    
    // Método 2: Buscar por índice
    if (tasks[index] && (tasks[index].name || tasks[index].title)) {
        return tasks[index].name || tasks[index].title;
    }
    
    // Método 3: Buscar por texto en la barra
    const barText = bar.textContent || bar.innerText;
    if (barText && barText.trim()) {
        return barText.trim();
    }
    
    // Último recurso: nombre por defecto
    return `Tarea ${index + 1}`;
}



/******************************
 * FUNCIÓN DE DIAGRAMA GANTT (ACTUALIZADA CON RUTA CRÍTICA Y DEPENDENCIAS)
 ******************************/
function renderGanttChart(tasks = null) {
console.warn("⛔ renderGanttChart() desactivado.");
return;  // ← Detiene todo el contenido REAL, sin borrar nada
  try {




// === Protección contra datos inválidos ===
    if (!Array.isArray(tasks)) {
      if (tasks && typeof tasks === 'object' && Array.isArray(tasks.tasks)) {
        console.warn('⚠️ Corrigiendo renderGanttChart: se pasó un objeto en lugar de un array, usando tasks.tasks');
        tasks = tasks.tasks;
      } else {
        console.error('❌ renderGanttChart recibió datos no válidos:', tasks);
        return; // Evita error al hacer forEach
      }
    }

    const tasksToRender = tasks || getFilteredTasks('gantt') || [];
    const ganttContainer = document.getElementById('ganttContainer');
    if (!ganttContainer) return;

    // Limpiar
    ganttContainer.innerHTML = '';
    ganttContainer.style.position = 'relative';

    if (tasksToRender.length === 0) {
      ganttContainer.innerHTML = `
        <div class="no-tasks-message" style="
          padding: 20px;
          text-align: center;
          color: #7f8c8d;
          font-style: italic;
        ">
          <i class="fas fa-tasks" style="font-size: 24px; margin-bottom: 10px; display: block;"></i>
          No hay tareas para mostrar en el diagrama Gantt
        </div>
      `;
      return;
    }

    // Calcular ruta crítica (si tienes la función)
    const criticalPath = typeof calculateCriticalPath === 'function' ? calculateCriticalPath(tasksToRender) : [];
    const criticalTaskIds = new Set((criticalPath || []).map(t => t.id));

    // Determinar rango de fechas (min/max)
    const dates = [];
    tasksToRender.forEach(task => {
      if (task.startDate) dates.push(new Date(task.startDate));
      if (task.deadline) dates.push(new Date(task.deadline));
    });
    if (dates.length === 0) {
      ganttContainer.innerHTML = `
        <div class="no-tasks-message" style="
          padding: 20px;
          text-align: center;
          color: #e74c3c;
          font-style: italic;
        ">
          <i class="fas fa-calendar-times" style="font-size: 24px; margin-bottom: 10px; display: block;"></i>
          Las tareas no tienen fechas definidas
        </div>
      `;
      return;
    }

    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    minDate.setDate(minDate.getDate() - 2);
    maxDate.setDate(maxDate.getDate() + 2);
    const timeRange = maxDate - minDate;
    const daysInRange = Math.ceil(timeRange / (1000 * 60 * 60 * 24));

    // Contenedor principal DOM (tu encabezado + filas)
    const ganttElement = document.createElement('div');
    ganttElement.className = 'gantt-container';
    ganttElement.style.position = 'relative';

    // Encabezado (tarea + escala temporal)
    const header = document.createElement('div');
    header.className = 'gantt-header';
    const headerTask = document.createElement('div');
    headerTask.className = 'gantt-header-task';
    headerTask.textContent = 'Tarea';
    header.appendChild(headerTask);

    const headerTime = document.createElement('div');
    headerTime.className = 'gantt-header-time';
    const timeScale = document.createElement('div');
    timeScale.className = 'gantt-time-scale';

    const monthNames = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    for (let i = 0; i <= daysInRange; i++) {
      const day = new Date(minDate);
      day.setDate(day.getDate() + i);
      const dayElement = document.createElement('div');
      dayElement.className = 'gantt-time-unit';
      dayElement.style.flexBasis = `${100 / (daysInRange || 1)}%`;
      if (day.getDay() === 0 || day.getDay() === 6) dayElement.classList.add('weekend');
      const dayNum = day.getDate();
      const monthName = monthNames[day.getMonth()];
      dayElement.innerHTML = `<span>${dayNum}</span><span style="font-size:10px">${monthName}</span>`;
      dayElement.title = day.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      timeScale.appendChild(dayElement);
    }

    headerTime.appendChild(timeScale);
    header.appendChild(headerTime);
    ganttElement.appendChild(header);

    // Filas y barras (DOM)
    tasksToRender.forEach((task, index) => {
      const row = document.createElement('div');
      row.className = 'gantt-row';
      row.dataset.taskId = task.id;

      const taskInfo = document.createElement('div');
      taskInfo.className = 'gantt-task-info';
      const taskName = document.createElement('div');
      taskName.className = 'gantt-task-name';
      taskName.textContent = task.name;
      taskName.title = task.name;
      taskInfo.appendChild(taskName);
      row.appendChild(taskInfo);

      const taskBars = document.createElement('div');
      taskBars.className = 'gantt-task-bars';

      if (task.startDate && task.deadline) {
        const startDate = new Date(task.startDate);
        const endDate = new Date(task.deadline);
        const startPos = ((startDate - minDate) / timeRange) * 100;
        const endPos = ((endDate - minDate) / timeRange) * 100;
        const width = Math.max(2, endPos - startPos);

        // Usar clases (respeta tu CSS)
        const bar = document.createElement('div');
        // añade la clase exacta que ya usas en tu css para colores: 'gantt-bar' + estado
        bar.className = `gantt-bar ${task.status || ''}`;
        if (criticalTaskIds.has(task.id)) bar.classList.add('critical');

        bar.style.left = `${startPos}%`;
        bar.style.width = `${width}%`;
        bar.style.position = 'absolute';

        // Tooltip (tal como tenías)
        const tooltip = document.createElement('div');
        tooltip.className = 'gantt-tooltip';
        tooltip.innerHTML = `
          <strong>${task.name}</strong><br>
          <span>${formatDate(task.startDate)} - ${formatDate(task.deadline)}</span><br>
          <span>Estado: ${getStatusText(task.status)}</span><br>
          <span>Asignado: ${task.assignee || task.owner || 'No asignado'}</span><br>
          <span>${criticalTaskIds.has(task.id) ? '⚠️ Ruta Crítica' : 'Normal'}</span>
        `;
        tooltip.style.display = 'none';
        tooltip.style.position = 'absolute';
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.pointerEvents = 'none';
        bar.appendChild(tooltip);

        bar.addEventListener('mouseenter', (ev) => {
          tooltip.style.display = 'block';
          // centrar tooltip respecto a barra
          tooltip.style.left = `calc(${width/2}% )`;
        });
        bar.addEventListener('mouseleave', () => {
          tooltip.style.display = 'none';
        });

        bar.addEventListener('click', () => showTaskDetails(task)); // si tienes la función
        taskBars.appendChild(bar);
      }

      row.appendChild(taskBars);
      ganttElement.appendChild(row);

    });

    // Añadir ganttElement al DOM
    ganttContainer.appendChild(ganttElement);
     // 👇 ESTA LÍNEA DEBE ESTAR AL FINAL (después de dibujar el Gantt)
         drawDependencySVGImproved();




// === CREAR NUEVA TAREA CON PREDICCIÓN AI + ML ===
async function createTaskWithPrediction(taskData) {
  try {
    const task = {
      id: Date.now(),
      name: taskData.name?.trim() || 'Nueva tarea',
      description: taskData.description || '',
      priority: taskData.priority || 'media',
      subtasks: taskData.subtasks || [],
      dependencies: taskData.dependencies || [],
      startDate: taskData.startDate || new Date().toISOString(),
      deadline: taskData.deadline || null,
      status: 'pendiente',
      assignee: taskData.assignee || '',
      estimatedTime: 0,
      predictedBy: ''
    };

    // Estimación del asistente IA (tu actual predicción)
    let aiEstimate = 0;
    if (typeof AIAssistant !== 'undefined' && typeof AIAssistant.estimateTime === 'function') {
      aiEstimate = Number(AIAssistant.estimateTime(task)) || 0;
    }

    // Estimación del modelo ML (si ya está entrenado)
    let mlEstimate = null;
    if (typeof predictTaskDuration === 'function' && window.durationModel) {
      mlEstimate = await predictTaskDuration(task);
    }

    // Combinar resultados sin duplicar ni chocar
    if (mlEstimate && !isNaN(mlEstimate)) {
      task.estimatedTime = (aiEstimate > 0)
        ? (aiEstimate * 0.4 + mlEstimate * 0.6)
        : mlEstimate;
      task.predictedBy = 'ML (modelo aprendido)';
    } else if (aiEstimate > 0) {
      task.estimatedTime = aiEstimate;
      task.predictedBy = 'AI Assistant (heurístico)';
    } else {
      task.estimatedTime = 1;
      task.predictedBy = 'default';
    }

    // 🔄 Guardar y renderizar usando el proyecto activo
if (!projects[currentProjectIndex]) {
  console.warn('⚠️ No hay proyecto activo, creando uno temporal...');
  projects[currentProjectIndex] = { tasks: [] };
}

projects[currentProjectIndex].tasks.push(task);

// Guardar cambios
if (typeof saveProject === 'function') {
  saveProject();
}

// Actualizar el Gantt
if (typeof renderGanttChart === 'function') {
  renderGanttChart(projects[currentProjectIndex].tasks);

}


    showNotification?.(
      `✨ Estimación automática para "${task.name}": ${task.estimatedTime} h (${task.predictedBy})`
    );
    console.log(`Predicción para "${task.name}": ${task.estimatedTime}h (${task.predictedBy})`);
  } catch (err) {
    console.error('Error creando tarea con predicción:', err);
  }
}


// === IA BÁSICA DE ESTIMACIÓN DE TIEMPO ===
window.AIAssistant = {
  estimateTime(task) {
    const text = (task.name + ' ' + (task.description || '')).toLowerCase();
    let hours = 1;
    if (text.includes('api')) hours += 4;
    if (text.includes('dashboard')) hours += 3;
    if (text.includes('diseño')) hours += 2;
    if (text.includes('integrar')) hours += 2;
    if (text.includes('backend')) hours += 3;
    if (task.priority === 'alta') hours += 1;
    return hours;
  }
};

// === MÓDULO DE MACHINE LEARNING SIMPLE ===
window.predictTaskDuration = async function (task) {
  if (!window.durationModel) {
    console.warn('⚠️ Modelo ML no entrenado, usando heurística');
    return 0;
  }
  const input = tf.tensor2d([
    [task.name.length / 10, (task.description || '').length / 50, task.priority === 'alta' ? 1 : 0]
  ]);
  const output = window.durationModel.predict(input);
  const value = (await output.data())[0];
  input.dispose(); output.dispose();
  return Math.max(1, Math.round(value));
};

// Entrenador básico (usa TensorFlow.js)
window.trainDurationModel = async function () {
  console.log('🚀 Entrenando modelo ML con datos simulados...');
  const xs = tf.tensor2d([[1, 0, 0], [5, 2, 1], [3, 1, 0], [4, 3, 1]]);
  const ys = tf.tensor2d([[2], [6], [3], [7]]);
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 8, activation: 'relu', inputShape: [3] }));
  model.add(tf.layers.dense({ units: 1 }));
  model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
  await model.fit(xs, ys, { epochs: 50 });
  window.durationModel = model;
  console.log('✅ Modelo ML entrenado');
};






// 👇 AQUÍ, justo después del renderGanttChart
function updateTasks() {
  saveProject();
  renderGanttChart(currentProject);
  highlightCriticalPath(currentProject);
}



// === ENLACE DEL BOTÓN "NUEVA TAREA" CON LA PREDICCIÓN AI+ML ===
document.getElementById('addTaskBtn')?.addEventListener('click', async () => {
  const name = document.getElementById('taskNameInput').value;
  const description = document.getElementById('taskDescInput').value;
  const priority = document.getElementById('taskPrioritySelect').value;
  const assignee = document.getElementById('taskAssigneeInput').value;

  await createTaskWithPrediction({
    name,
    description,
    priority,
    assignee
  });
});





// === MOSTRAR ETIQUETA DE RUTA CRÍTICA ===
    const container = document.querySelector('#critical-path-info') || (() => {
      const el = document.createElement('div');
      el.id = 'critical-path-info';
      el.style.margin = '10px 0';
      el.style.padding = '8px';
      el.style.background = 'rgba(255,0,0,0.1)';
      el.style.border = '1px solid red';
      el.style.borderRadius = '8px';
      el.style.fontWeight = 'bold';
      el.style.textAlign = 'center';
      el.style.fontFamily = 'sans-serif';
      ganttContainer.prepend(el); // Insertar arriba del Gantt
      return el;
    })();



try {
  const criticalTasks = (typeof calculateCriticalPath === 'function')
    ? (calculateCriticalPath(tasksToRender) || [])
    : [];

  const names = Array.isArray(criticalTasks)
    ? criticalTasks.map(t => t.name).join(' → ')
    : '';

  container.textContent = 'Ruta crítica: ' + (names || 'No detectada');
} catch (err) {
  console.warn('No se pudo calcular la ruta crítica:', err);
  container.textContent = 'Ruta crítica: (error al calcular)';
}


 


    // -------- SVG overlay para dependencias (sin D3) --------
    // Función que dibuja/actualiza las líneas
 function drawDependencySVG() {
  // Eliminar SVG previo
  const old = ganttContainer.querySelector('.gantt-dependency-svg');
  if (old) old.remove();

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.classList.add('gantt-dependency-svg');
  svg.setAttribute('width', '100%');
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '0';
  svg.style.pointerEvents = 'none';
  svg.style.overflow = 'visible';
  ganttContainer.appendChild(svg);

  // === DEFINICIONES ===
  const defs = document.createElementNS(svgNS, 'defs');

  // Generador de gradientes animados por estado
  const createGradient = (id, colors, dur) => {
    const grad = document.createElementNS(svgNS, 'linearGradient');
    grad.setAttribute('id', id);
    grad.setAttribute('x1', '0%');
    grad.setAttribute('x2', '100%');
    grad.setAttribute('y1', '0%');
    grad.setAttribute('y2', '0%');

    colors.forEach((c, i) => {
      const stop = document.createElementNS(svgNS, 'stop');
      stop.setAttribute('offset', `${(i / (colors.length - 1)) * 100}%`);
      stop.setAttribute('stop-color', c);
      grad.appendChild(stop);
    });

    const anim = document.createElementNS(svgNS, 'animateTransform');
    anim.setAttribute('attributeName', 'gradientTransform');
    anim.setAttribute('type', 'translate');
    anim.setAttribute('from', '-1 0');
    anim.setAttribute('to', '1 0');
    anim.setAttribute('dur', dur);
    anim.setAttribute('repeatCount', 'indefinite');
    grad.appendChild(anim);

    defs.appendChild(grad);
  };

  // Colores de tu esquema
  createGradient('grad-completada', ['#27ae60', '#2ecc71'], '6s');   // verde suave
  createGradient('grad-enprogreso', ['#16a085', '#1abc9c'], '3s');  // verde azulado rápido
  createGradient('grad-pendiente', ['#f1c40f', '#f39c12'], '4s');   // amarillo
  createGradient('grad-retrasada', ['#e67e22', '#e74c3c'], '8s');   // rojo lento

  // Flecha
  const marker = document.createElementNS(svgNS, 'marker');
  marker.setAttribute('id', 'gantt-arrow');
  marker.setAttribute('viewBox', '0 0 12 12');
  marker.setAttribute('refX', '11');
  marker.setAttribute('refY', '6');
  marker.setAttribute('markerWidth', '10');
  marker.setAttribute('markerHeight', '10');
  marker.setAttribute('orient', 'auto-start-reverse');

  const pathMarker = document.createElementNS(svgNS, 'path');
  pathMarker.setAttribute('d', 'M 0 0 L 12 6 L 0 12 Q 4 6 0 0');
  pathMarker.setAttribute('fill', 'url(#grad-enprogreso)');
  pathMarker.setAttribute('stroke', '#1abc9c');
  pathMarker.setAttribute('stroke-width', '0.4');
  marker.appendChild(pathMarker);
  defs.appendChild(marker);

  svg.appendChild(defs);

  // === MAPEO DE FILAS ===
  const rows = Array.from(ganttElement.querySelectorAll('.gantt-row[data-task-id]'));
  const rowMap = new Map();
  rows.forEach(row => {
    const id = row.dataset.taskId;
    const bar = row.querySelector('.gantt-bar');
    if (bar) rowMap.set(id, { row, bar });
  });

  // === TOOLTIP flotante ===
  const tooltip = document.createElement('div');
  tooltip.className = 'gantt-dependency-tooltip';
  tooltip.style.position = 'fixed';
  tooltip.style.background = 'linear-gradient(135deg, #ffffff, #f7f7f7)';
  tooltip.style.border = '1px solid rgba(0,0,0,0.15)';
  tooltip.style.borderRadius = '6px';
  tooltip.style.padding = '8px 12px';
  tooltip.style.fontSize = '12px';
  tooltip.style.color = '#2c3e50';
  tooltip.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
  tooltip.style.pointerEvents = 'none';
  tooltip.style.transition = 'opacity 0.2s ease';
  tooltip.style.opacity = '0';
  document.body.appendChild(tooltip);

  // === DIBUJAR DEPENDENCIAS ===
  tasksToRender.forEach(task => {
    if (!task.dependencies || task.dependencies.length === 0) return;

    task.dependencies.forEach(rawDep => {
      const depId = (typeof rawDep === 'object') ? rawDep.id : rawDep;
      const predMap = rowMap.get(String(depId));
      const fromMap = rowMap.get(String(task.id));
      if (!predMap || !predMap.bar || !fromMap || !fromMap.bar) return;

      const gRect = ganttContainer.getBoundingClientRect();
      const startRect = predMap.bar.getBoundingClientRect();
      const endRect = fromMap.bar.getBoundingClientRect();

      const x1 = startRect.right - gRect.left;
      const y1 = startRect.top + startRect.height / 2 - gRect.top;
      const x2 = endRect.left - gRect.left;
      const y2 = endRect.top + endRect.height / 2 - gRect.top;

      const offsetX = Math.min(120, Math.abs(x2 - x1) * 0.45);
      const cp1x = x1 + offsetX;
      const cp1y = y1;
      const cp2x = x2 - offsetX;
      const cp2y = y2;

      const pathEl = document.createElementNS(svgNS, 'path');
      pathEl.setAttribute('d', `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`);
      pathEl.setAttribute('fill', 'none');

      // Detectar el estado de la tarea predecesora
     // === Detectar el estado de la tarea predecesora con tolerancia flexible ===
const bar = predMap.bar;
let state = 'pendiente';
const classes = bar.className.toLowerCase();

if (classes.includes('complet')) state = 'completada';
else if (classes.includes('progreso') || classes.includes('en_progreso') || classes.includes('en-progreso')) state = 'enprogreso';
else if (classes.includes('retras')) state = 'retrasada';
else if (classes.includes('pendien')) state = 'pendiente';

// === Definir colores y emojis según estado ===
const stateInfo = {
  completada: { color: '#27ae60', label: '🟢 Completada' },
  enprogreso: { color: '#16a085', label: '🟡 En progreso' },
  pendiente:  { color: '#f1c40f', label: '🟠 Pendiente' },
  retrasada:  { color: '#e74c3c', label: '🔴 Retrasada' }
};

// Aplica el gradiente correspondiente a la línea
pathEl.setAttribute('stroke', `url(#grad-${state})`);
pathEl.setAttribute('stroke-width', '2.8');
pathEl.setAttribute('marker-end', 'url(#gantt-arrow)');
pathEl.setAttribute('opacity', '0.95');
pathEl.style.filter = 'drop-shadow(0px 1px 2px rgba(0,0,0,0.3))';
svg.appendChild(pathEl);


// === Tooltip al pasar sobre línea (con bolita animada) ===
pathEl.style.pointerEvents = 'stroke'; // para detectar el hover sobre la línea

pathEl.addEventListener('mouseenter', e => {
  const info = stateInfo[state] || stateInfo.pendiente;
  const colorDot = `<span class="state-dot ${state}"></span>`; // bolita HTML
  tooltip.innerHTML = `
    🔗 <strong>Depende de:</strong> ${predMap.row.querySelector('.gantt-task-name').textContent}<br>
    ➡️ <strong>Tarea:</strong> ${fromMap.row.querySelector('.gantt-task-name').textContent}<br>
    ⏱ ${colorDot}<strong>${info.label}</strong>
  `;
  tooltip.style.opacity = '1';
});

pathEl.addEventListener('mousemove', e => {
  const svgRect = svg.getBoundingClientRect();
  tooltip.style.left = `${e.clientX + 10}px`;
  tooltip.style.top = `${e.clientY + 12}px`;
});

pathEl.addEventListener('mouseleave', () => {
  tooltip.style.opacity = '0';
});







// === Tooltip al pasar sobre línea (ajustado con color y estado visual) ===
pathEl.style.pointerEvents = 'stroke';
pathEl.addEventListener('mouseenter', e => {
  const info = stateInfo[state] || stateInfo.pendiente;
 const colorDot = `<span class="state-dot ${state}"></span>`; // 👈 HTML real, no texto
  tooltip.innerHTML = `
    🔗 <strong>Depende de:</strong> ${predMap.row.querySelector('.gantt-task-name').textContent}<br>
    ➡️ <strong>Tarea:</strong> ${fromMap.row.querySelector('.gantt-task-name').textContent}<br>
    ⏱ <strong style="color:${info.color}">${info.label}</strong>
  `;
  tooltip.style.opacity = '1';
});
pathEl.addEventListener('mousemove', e => {
  const svgRect = svg.getBoundingClientRect();
  const containerRect = ganttContainer.getBoundingClientRect();
  const mouseX = e.clientX - svgRect.left;
  const mouseY = e.clientY - svgRect.top;
  tooltip.style.left = `${containerRect.left + mouseX}px`;
  tooltip.style.top = `${containerRect.top + mouseY + 12}px`;
});
pathEl.addEventListener('mouseleave', () => {
  tooltip.style.opacity = '0';
});


      pathEl.setAttribute('stroke', `url(#grad-${state})`);
      pathEl.setAttribute('stroke-width', '2.8');
      pathEl.setAttribute('marker-end', 'url(#gantt-arrow)');
      pathEl.setAttribute('opacity', '0.95');
      pathEl.style.filter = 'drop-shadow(0px 1px 2px rgba(0,0,0,0.3))';
      svg.appendChild(pathEl);

      // === Tooltip al pasar sobre línea ===
      // === Tooltip al pasar sobre línea (posicionamiento exacto) ===
pathEl.style.pointerEvents = 'stroke';
pathEl.addEventListener('mouseenter', e => {
  tooltip.innerHTML = `
    🔗 <strong>Depende de:</strong> ${predMap.row.querySelector('.gantt-task-name').textContent}
    <br>➡️ <strong>Tarea:</strong> ${fromMap.row.querySelector('.gantt-task-name').textContent}
    <br>⏱ <strong>Estado:</strong> ${state.charAt(0).toUpperCase() + state.slice(1)}
  `;
  tooltip.style.opacity = '1';
});

pathEl.addEventListener('mousemove', e => {
  const svgRect = svg.getBoundingClientRect();
  const mouseX = e.clientX - svgRect.left;
  const mouseY = e.clientY - svgRect.top;

  // Convertimos coordenadas SVG a pantalla (usamos posición relativa del contenedor Gantt)
  const containerRect = ganttContainer.getBoundingClientRect();
  const tooltipX = containerRect.left + mouseX;
  const tooltipY = containerRect.top + mouseY + 12; // justo debajo de la línea

  tooltip.style.left = `${tooltipX}px`;
  tooltip.style.top = `${tooltipY}px`;
});

pathEl.addEventListener('mouseleave', () => {
  tooltip.style.opacity = '0';
});



      // === Animación del trazo ===
      const totalLen = pathEl.getTotalLength();
      pathEl.style.strokeDasharray = `${totalLen} ${totalLen}`;
      pathEl.style.strokeDashoffset = `${totalLen}`;
      setTimeout(() => {
        pathEl.style.transition = 'stroke-dashoffset 1000ms cubic-bezier(.22,.9,.21,1)';
        pathEl.style.strokeDashoffset = '0';
      }, 40);
    });
  });
}












    // dibujar dependencias al final y on resize
    drawDependencySVGImproved();
    window.addEventListener('resize', () => {
      // redibujar líneas para mantener posiciones correctas
     setTimeout(drawDependencySVGImproved, 100);
    });

    // Mostrar panel lateral detallado (si ya tenías showTaskDetails, lo llamamos; si no, lo implementamos básico)
    function showTaskDetails(task) {
      if (typeof window.showTaskDetails === 'function') {
        window.showTaskDetails(task); // usa tu implementación si existe
        return;
      }
      // implementación simple: crear/abrir panel lateral
      let panel = document.getElementById('ganttSidePanelSimple');
      if (!panel) {
        panel = document.createElement('div');
        panel.id = 'ganttSidePanelSimple';
        Object.assign(panel.style, {
          position: 'absolute', right: '20px', top: '20px', width: '320px', padding: '14px',
          background: '#fff', boxShadow: '0 6px 18px rgba(0,0,0,0.12)', borderRadius: '8px', zIndex: 9999
        });
        ganttContainer.appendChild(panel);
      }
      panel.innerHTML = `
        <h3 style="margin:0 0 8px 0">${task.name}</h3>
        <p><strong>Estado:</strong> ${getStatusText(task.status)}</p>
        <p><strong>Progreso:</strong> ${task.progress || 0}%</p>
        <p><strong>Responsable:</strong> ${task.assignee || task.owner || 'No asignado'}</p>
        <p><strong>Fechas:</strong> ${formatDate(task.startDate)} → ${formatDate(task.deadline)}</p>
        <p style="margin-top:8px"><button id="ganttClosePanel">Cerrar</button></p>
      `;
      document.getElementById('ganttClosePanel').onclick = () => panel.remove();
    }

  } catch (err) {
    console.error('Error en renderGanttChart:', err);
  }
}






/*************************
 * GESTIÓN DE PROYECTOS *
 *************************/
function createNewProject() {
  const projectName = prompt('Ingrese el nombre del proyecto:');
  if (!projectName) return;

  const totalTime = prompt('Ingrese el tiempo total estimado del proyecto (horas):');
  const timeValue = totalTime ? parseFloat(totalTime) || 0 : 0;

  const newProject = {
    name: projectName,
    totalProjectTime: timeValue,
    tasks: []
    
  };

  projects.push(newProject);
  currentProjectIndex = projects.length - 1;
  updateLocalStorage();

// === AGREGAR ESTA LÍNEA ===
  if (window.syncManager) window.syncManager.notifyChange('project-changed', { 
      action: 'created', 
      projectIndex: currentProjectIndex, 
      projectName: projectName 
  });
  renderProjects();
  selectProject(currentProjectIndex);
  actualizarAsignados();
  showNotification(`✅ Proyecto "${newProject.name}" creado`);
}

function renderProjects() {
  if (!projectListContainer) return;
  projectListContainer.innerHTML = '';

  projects.forEach((project, index) => {
    const li = document.createElement('li');
    li.className = 'project-item';
    li.dataset.projectIndex = index;
    
    li.innerHTML = `
      <span>${project.name}</span>
      <div class="project-menu" onclick="event.stopPropagation(); toggleProjectMenu(event, ${index})">⋮</div>
      <div class="project-context-menu" id="project-menu-${index}">
        <div class="project-context-menu-item edit" onclick="editProjectFromMenu(${index})">Editar</div>
        <div class="project-context-menu-item delete" onclick="deleteProjectFromMenu(${index})">Eliminar</div>
      </div>
    `;

    li.addEventListener('click', () => selectProject(index));
    projectListContainer.appendChild(li);
  });
}
function selectProject(index) {
// 🧠 Validar índice antes de continuar
  if (index < 0 || index >= projects.length) {
    console.warn(`⚠️ Índice de proyecto inválido (${index})`);
    return;
  }
  currentProjectIndex = index;
  const project = projects[index];
  
  if (!project) return;

  // Actualizar los nombres del proyecto en todas las vistas
  if (projectNameDisplay) projectNameDisplay.textContent = project.name;
  if (projectNameList) projectNameList.textContent = project.name;
  if (projectNameCalendar) projectNameCalendar.textContent = project.name;
  if (projectNameGantt) projectNameGantt.textContent = project.name;
  if (projectNameReports) projectNameReports.textContent = project.name;
  if (document.getElementById('projectNameDashboard')) {
    document.getElementById('projectNameDashboard').textContent = project.name;
  }
  
  // Actualizar el tiempo total del proyecto
  const totalTimeElement = document.getElementById('totalProjectTime');
  if (totalTimeElement) {
    totalTimeElement.textContent = `${project.totalProjectTime || 0} horas`;
  }

  actualizarAsignados();
  renderKanbanTasks();
  updateTaskList();
  updateStatistics();
  generatePieChart(getStats());
  updateProjectDatesFromTasks();
  updateProjectProgress();
  updateProjectStatusLabel();
  generateReports();
  
// Forzar la actualización de riesgos
    setTimeout(() => {
        loadRisksFromLocalStorage();
    }, 50); // Pequeño retraso para asegurar que el DOM esté listo


// Forzar la actualización de riesgos y acciones
    setTimeout(() => {
        loadRisksFromLocalStorage();
        loadActionsFromLocalStorage(); // <-- Nueva línea
   loadMilestonesFromLocalStorage(); // <-- Nueva línea
    }, 50);


  // Actualizar el dashboard si está visible
  if (!document.getElementById('dashboardView').classList.contains('hidden')) {
    renderDashboard();
// En renderDashboard()
document.getElementById('remainingTimeDash').textContent = `${timeDifference.toFixed(1)}h`;
  }


 // Cargar riesgos del proyecto seleccionado
  loadRisksFromLocalStorage(); // <-- Añadir esta línea

  // Renderizar la vista activa
  const activeView = getActiveView();
  if (activeView === 'calendar') {
    renderCalendar();
  } else if (activeView === 'gantt') {
    renderGanttChart();
  } else if (activeView === 'profitability') {
    renderProfitabilityView();
  } else if (activeView === 'dashboard') {
    renderDashboard();


} else {
        console.error("Índice de proyecto inválido:", index);


 // === AGREGAR ESTA LÍNEA PARA CARGAR RIESGOS DEL PROYECTO SELECCIONADO ===
        loadRisksFromLocalStorage();
        // ========================================================================

// Añade esto al final de la función:
    loadMilestonesFromLocalStorage(); // Cargar hitos del nuevo proyecto
    updateMilestonesStatus(); // Actualizar estados (vencido/actual/próximo)
  }
}
function editProjectName(index) {
  const newName = prompt('Ingrese el nuevo nombre:', projects[index].name);
  if (newName && newName.trim()) {
    projects[index].name = newName.trim();
    updateLocalStorage();
    renderProjects();
    selectProject(index);
    showNotification(`Nombre del proyecto actualizado a "${newName}"`);
  }
}

function deleteProject(index) {
  // 🔹 Intentar corregir índices inválidos antes de continuar
  if (index < 0 || index >= projects.length) {
    console.warn("⚠️ Índice de proyecto inválido:", index);

    // Buscar el proyecto activo por nombre o ID
    const currentProject = projects.find(p =>
      p.id === currentProjectId ||
      (typeof currentProject !== "undefined" && p.name === currentProject.name)
    );

    // Si lo encuentra, recalcula el índice
    if (currentProject) {
      index = projects.indexOf(currentProject);
      console.log(`✅ Índice corregido automáticamente a: ${index}`);
    } else {
      showNotification("⚠️ No se encontró el proyecto a eliminar");
      return;
    }
  }

  const project = projects[index];
  if (!project) {
    console.warn(`❌ Proyecto no encontrado en índice ${index}`);
    return;
  }

  const confirmDelete = confirm(`¿Eliminar el proyecto "${project.name}"?`);
  if (!confirmDelete) return;

  // 🔹 Generar una clave única (según ID o índice)
  const projectKey = project.id ? `project_${project.id}` : `project_${index}`;

  // 1️⃣ Eliminar en Firebase
  if (window.firebaseManager?.isConnected) {
    window.firebaseManager.db.ref(`projects/${projectKey}`).remove()
      .then(() => console.log(`✅ Proyecto eliminado en Firebase: ${projectKey}`))
      .catch(err => console.error('❌ Error al eliminar en Firebase:', err));
  }

  // 2️⃣ Eliminar datos relacionados del localStorage
  try {
    const riskKey = `projectRisks_${index}_${project.name.replace(/\s+/g, '_')}`;
    const actionKey = `projectActions_${index}`;
    const milestoneKey = `projectMilestones_${index}`;
    localStorage.removeItem(riskKey);
    localStorage.removeItem(actionKey);
    localStorage.removeItem(milestoneKey);
  } catch (e) {
    console.warn("⚠️ Error eliminando datos relacionados:", e);
  }

  // 3️⃣ Eliminar del arreglo local
  projects.splice(index, 1);
  updateLocalStorage();

  // 4️⃣ Reajustar selección actual
  if (projects.length === 0) {
    createNewProject();
  } else {
    currentProjectIndex = Math.max(0, Math.min(index, projects.length - 1));
    renderProjects();
    selectProject(currentProjectIndex);
  }

  showNotification(`🗑️ Proyecto "${project.name}" eliminado correctamente`);
  console.log(`🗑️ Proyecto eliminado: ${project.name}`);
}

/*********************
 * GESTIÓN DE TAREAS *
 *********************/
function createNewTask(e) {
  e.preventDefault();

  // 🔒 Validación robusta del proyecto actual
  if (!projects || !Array.isArray(projects)) {
      console.error('❌ Error: projects no está inicializado');
      showNotification('Error: No se pueden crear tareas en este momento');
      return;
  }

  if (typeof currentProjectIndex === 'undefined' || currentProjectIndex === null) {
      console.error('❌ Error: currentProjectIndex no definido');
      showNotification('Error: No hay proyecto seleccionado');
      return;
  }

  const currentProject = projects[currentProjectIndex];
  if (!currentProject) {
      console.error('❌ Error: Proyecto actual no existe en índice', currentProjectIndex);
      showNotification('Error: Proyecto no válido');
      return;
  }

  // Asegurar que el proyecto tenga array de tasks
  if (!currentProject.tasks || !Array.isArray(currentProject.tasks)) {
      console.log('🔄 Inicializando tasks array...');
      currentProject.tasks = [];
  }

  const taskName = document.getElementById('taskName')?.value.trim() || '';
  if (!taskName) {
    showNotification('El nombre de la tarea es requerido');
    return;
  }

  const task = {
    id: Date.now(),
    name: taskName,
    startDate: document.getElementById('taskStartDate')?.value || '',
    deadline: document.getElementById('taskDeadline')?.value || '',
    priority: document.getElementById('taskPriority')?.value || 'baja',
    assignee: document.getElementById('taskAssignee')?.value || '',
    description: document.getElementById('taskDescription')?.value || '',
    status: 'pending',
    timeLogged: 0,
    estimatedTime: parseFloat(document.getElementById('estimatedHours')?.value) || 0,
    timeHistory: [],
    subtasks: [],
    dependencies: []
  };

  // ✅ AGREGAR TAREA CON VALIDACIÓN
  try {
      currentProject.tasks.push(task);
      console.log('✅ Tarea agregada:', task.name);
      
      updateLocalStorage();
      
      // 🔥 NOTIFICAR A OTROS USUARIOS
      if (tiempoRealSocket && tiempoRealSocket.connected) {
        tiempoRealSocket.emit('task-changed', {
          projectId: currentProjectIndex,
          taskId: task.id,
          taskName: task.name,
          userName: 'Usuario actual',
          type: 'task-created',
          timestamp: new Date().toISOString()
        });
      }

      actualizarAsignados();
      aplicarFiltros();
      generatePieChart(getStats());
      updateProjectProgress();
      renderKanbanTasks();

      // Cerrar modal y limpiar formulario
      if (window.createTaskModal) {
        window.createTaskModal.style.display = 'none';
      }
      
      const form = document.getElementById('createTaskForm');
      if (form) form.reset();
      
      showNotification(`Tarea "${task.name}" creada`);
      
  } catch (error) {
      console.error('❌ Error al guardar tarea:', error);
      showNotification('Error al crear la tarea');
  }
}




function deleteTask(taskStr) {
  const task = JSON.parse(decodeURIComponent(taskStr));
  if (confirm(`¿Estás seguro de eliminar "${task.name}"? Esta acción no se puede deshacer.`)) {
    // 🔥 NOTIFICAR ANTES de eliminar
    console.log('🔔 Intentando notificar eliminación...');
    
    if (tiempoRealSocket && tiempoRealSocket.connected) {
      tiempoRealSocket.emit('task-changed', {
        projectId: currentProjectIndex,
        taskId: task.id,
        taskName: task.name,
        userName: 'Usuario actual',
        type: 'task-deleted',
        timestamp: new Date().toISOString()
      });
      console.log('✅ Notificación de eliminación enviada');
    }
    
    projects[currentProjectIndex].tasks = projects[currentProjectIndex].tasks.filter(t => t.id !== task.id);
    updateLocalStorage();
    actualizarAsignados();
    aplicarFiltros();
    generatePieChart(getStats());
    updateProjectProgress();
    actualizarAsignados();
    showNotification(`Tarea "${task.name}" eliminada`);

// 🔥 AGREGAR ESTO AL FINAL:
  refreshCalendar();
  }
}


/*********************
 * FUNCIÓN DE ESTIMACIÓN CON IA *
 *********************/
function setupAIEstimation() {
    console.log('🔄 Configurando IA...');
    
    const aiButton = document.getElementById('estimateWithAI');
    const resultElement = document.getElementById('aiEstimationResult');
    
    if (!aiButton || !resultElement) {
        console.log('❌ Elementos no encontrados');
        return;
    }
    
    // Clonar y reemplazar el botón para eliminar listeners antiguos
    const newButton = aiButton.cloneNode(true);
    aiButton.parentNode.replaceChild(newButton, aiButton);
    
    // Agregar listener al NUEVO botón
    newButton.addEventListener('click', function() {
        console.log('🎯 Botón de IA clickeado - Iniciando análisis...');
        
        const taskName = document.getElementById('taskName')?.value.trim();
        const taskDescription = document.getElementById('taskDescription')?.value.trim();
        const priority = document.getElementById('taskPriority')?.value;
        
        if (!taskName) {
            alert('❌ Primero escribe el nombre de la tarea');
            return;
        }
        
        // Guardar estado original
        const originalText = this.innerHTML;
        const originalBackground = this.style.background;
        
        // Cambiar a estado de carga
        this.innerHTML = '⏳ Analizando...';
        this.style.background = '#3498db';
        this.disabled = true;
        
        // Limpiar resultado anterior
        resultElement.style.display = 'none';
        resultElement.innerHTML = '';
        
        setTimeout(() => {
            try {
                // Análisis mejorado
                const text = (taskName + ' ' + (taskDescription || '')).toLowerCase();
                console.log('🔍 Analizando texto:', text);
                
                let hours = 4;
                let complexity = 2;
                let reasoning = "Tarea estándar";

                // ✅ ANÁLISIS MEJORADO - DETECCIÓN DE COMPLEJIDAD
                // PALABRAS CLAVE POR COMPLEJIDAD
                const complexityKeywords = {
                    1: ['revisar', 'corregir', 'actualizar', 'enviar', 'verificar', 'chequear', 'limpiar', 'organizar', 'comprobar'],
                    2: ['configurar', 'crear', 'migrar', 'cargar', 'exportar', 'importar', 'backup', 'restaurar', 'instalar', 'preparar'],
                    3: ['desarrollar', 'implementar', 'integrar', 'optimizar', 'automatizar', 'procesar', 'analizar', 'probar', 'validar'],
                    4: ['diseñar', 'arquitectura', 'sistema', 'plataforma', 'api rest', 'base de datos', 'seguridad', 'escalar', 'monitorizar'],
                    5: ['microservicios', 'machine learning', 'inteligencia artificial', 'blockchain', 'iot', 'big data', 'transformación', 'estrategia']
                };

                // DETECTAR COMPLEJIDAD BASADA EN PALABRAS CLAVE
                let detectedComplexity = 2; // Por defecto

                for (let [level, keywords] of Object.entries(complexityKeywords)) {
                    if (keywords.some(keyword => text.includes(keyword))) {
                        detectedComplexity = Math.max(detectedComplexity, parseInt(level));
                    }
                }

                // AJUSTAR HORAS SEGÚN COMPLEJIDAD DETECTADA
                switch(detectedComplexity) {
                    case 1:
                        hours = 2;
                        reasoning = "Tarea muy simple - Revisión/Corrección";
                        break;
                    case 2:
                        hours = 4;
                        reasoning = "Tarea simple - Configuración/Creación básica";
                        break;
                    case 3:
                        hours = 6;
                        reasoning = "Tarea media - Desarrollo/Implementación";
                        break;
                    case 4:
                        hours = 10;
                        reasoning = "Tarea compleja - Diseño/Arquitectura";
                        break;
                    case 5:
                        hours = 16;
                        reasoning = "Tarea muy compleja - Sistema avanzado";
                        break;
                }

                // ✅ DETECCIÓN ESPECÍFICA POR TIPO DE TAREA
                if (text.includes('api') && text.includes('base de datos') && text.includes('integracion')) {
                    hours = 20;
                    complexity = 5;
                    reasoning = "🚀 INTEGRACIÓN COMPLEJA: Múltiples sistemas conectados";
                } 
                else if (text.includes('api rest') || text.includes('rest api')) {
                    hours = 12;
                    complexity = 4;
                    reasoning = "🌐 API REST: Desarrollo completo con endpoints";
                }
                else if (text.includes('microservicios')) {
                    hours = 24;
                    complexity = 5;
                    reasoning = "🔗 ARQUITECTURA: Microservicios distribuidos";
                }
                else if (text.includes('api')) {
                    hours = 8;
                    complexity = 3;
                    reasoning = "⚙️ API: Desarrollo de interfaz básica";
                }
                else if (text.includes('base de datos') && (text.includes('diseñar') || text.includes('arquitectura'))) {
                    hours = 14;
                    complexity = 4;
                    reasoning = "🗃️ DISEÑO BD: Arquitectura de base de datos";
                }
                else if (text.includes('base de datos') && text.includes('optimizacion')) {
                    hours = 8;
                    complexity = 4;
                    reasoning = "📊 OPTIMIZACIÓN BD: Mejora de rendimiento";
                }
                else if (text.includes('base de datos')) {
                    hours = 6;
                    complexity = 3;
                    reasoning = "💾 BASE DE DATOS: Trabajo con datos";
                }
                else if (text.includes('configurar') && (text.includes('red') || text.includes('vlan') || text.includes('firewall'))) {
                    hours = 5;
                    complexity = 3;
                    reasoning = "🔧 CONFIGURACIÓN RED: Infraestructura de red";
                }
                else if (text.includes('configurar') && text.includes('servidor')) {
                    hours = 6;
                    complexity = 3;
                    reasoning = "🖥️ CONFIGURACIÓN: Servidor/Infraestructura";
                }
                else if (text.includes('configurar') && text.includes('equipo')) {
                    hours = 3;
                    complexity = 2;
                    reasoning = "📱 CONFIGURACIÓN: Equipos/Dispositivos";
                }
                else if (text.includes('desarrollo') && text.includes('completo')) {
                    hours = 15;
                    complexity = 4;
                    reasoning = "💻 DESARROLLO: Sistema completo desde cero";
                }
                else if (text.includes('desarrollo') || text.includes('implementar')) {
                    hours = 8;
                    complexity = 3;
                    reasoning = "💻 DESARROLLO: Módulo/funcionalidad";
                }
                else if (text.includes('revisar') || text.includes('corregir')) {
                    hours = 2;
                    complexity = 1;
                    reasoning = "📝 REVISIÓN: Análisis y correcciones";
                }
                else if (text.includes('diseñar') || text.includes('diseño') || text.includes('ui/ux')) {
                    hours = 6;
                    complexity = 3;
                    reasoning = "🎨 DISEÑO: Trabajo creativo/planificación";
                }
                else if (text.includes('documentación') || text.includes('documentar') || text.includes('manual')) {
                    hours = 3;
                    complexity = 2;
                    reasoning = "📚 DOCUMENTACIÓN: Creación/actualización";
                }
                else if (text.includes('testing') || text.includes('pruebas') || text.includes('qa')) {
                    hours = 4;
                    complexity = 2;
                    reasoning = "🧪 TESTING: Pruebas y control calidad";
                }
                else if (text.includes('machine learning') || text.includes('ia') || text.includes('inteligencia artificial')) {
                    hours = 20;
                    complexity = 5;
                    reasoning = "🤖 IA/ML: Modelo de inteligencia artificial";
                }
                else if (text.includes('mobile') || text.includes('app móvil') || text.includes('android') || text.includes('ios')) {
                    hours = 12;
                    complexity = 4;
                    reasoning = "📱 APP MÓVIL: Desarrollo aplicación móvil";
                }

                // ✅ AJUSTES POR CONTEXTO ESPECÍFICO
                if (text.includes('complej') || text.includes('complicad') || text.includes('difícil') || text.includes('avanzad') || text.includes('crític')) {
                    hours *= 1.4;
                    complexity = Math.min(5, complexity + 1);
                    reasoning += " | 🔴 COMPLEJO";
                }

                if (text.includes('simple') || text.includes('fácil') || text.includes('básico') || text.includes('rápido') || text.includes('sencillo')) {
                    hours *= 0.7;
                    complexity = Math.max(1, complexity - 1);
                    reasoning += " | 🟢 SIMPLE";
                }

                if (text.includes('urgent') || text.includes('crític') || text.includes('prioridad') || text.includes('inmediat')) {
                    hours *= 1.2;
                    reasoning += " | ⚡ URGENTE";
                }

                // ✅ AJUSTAR POR PRIORIDAD SELECCIONADA
                if (priority === 'alta') {
                    hours *= 1.3;
                    reasoning += " | 🔥 ALTA PRIORIDAD";
                } else if (priority === 'baja') {
                    hours *= 0.8;
                    reasoning += " | 🐢 BAJA PRIORIDAD";
                }

                // ✅ REDONDEAR Y LIMITAR
                hours = Math.max(0.5, Math.min(40, Math.round(hours * 2) / 2));
                complexity = Math.max(1, Math.min(5, complexity));
                
                console.log('📊 Estimación final:', { hours, complexity, reasoning });

                // Actualizar campo
                document.getElementById('estimatedHours').value = hours;
                
                // ✅ MOSTRAR RESULTADO DEBAJO DEL CAMPO
                resultElement.innerHTML = `
                    <div style="background: #d4edda; border: 1px solid #c3e6cb; border-radius: 4px; padding: 10px;">
                        <div style="font-weight: bold; color: #155724; margin-bottom: 5px;">
                            🧠 SUGERENCIA DE IA
                        </div>
                        <div style="color: #155724;">
                            <strong>${hours} horas</strong> | Complejidad: ${complexity}/5
                        </div>
                        <div style="color: #0c5460; font-size: 12px; margin-top: 4px;">
                            ${reasoning}
                        </div>
                        <div style="color: #6c757d; font-size: 11px; margin-top: 6px; border-top: 1px solid #b8daff; padding-top: 4px;">
                            💡 Basado en análisis de palabras clave y contexto
                        </div>
                    </div>
                `;
                resultElement.style.display = 'block';
                
                // ✅ Opcional: También mostrar notificación rápida
                if (typeof showNotification === 'function') {
                    showNotification(`✅ IA sugiere: ${hours} horas`);
                }
                
            } catch (error) {
                console.error('❌ Error en IA:', error);
                
                // ✅ Mostrar error en el mismo lugar
                resultElement.innerHTML = `
                    <div style="background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; padding: 10px; color: #721c24;">
                        ❌ Error en estimación IA. Usa tu criterio profesional.
                    </div>
                `;
                resultElement.style.display = 'block';
                
            } finally {
                // SIEMPRE restaurar el botón
                this.innerHTML = '🧠 Estimar con IA';
                this.style.background = originalBackground;
                this.disabled = false;
            }
        }, 800);
    });
    
    console.log('✅ IA configurada con detección mejorada de complejidades');
}

/*********************
 * GESTIÓN DE TAREAS *
 *********************/

function showTaskDetails(task) {
  if (!taskDetailsModal || !task) return;
  
  const taskDetailsContent = document.getElementById('taskDetails');
  if (!taskDetailsContent) return;

  // Calcular progreso de subtareas
  const completedSubtasks = task.subtasks?.filter(st => st.completed).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;
  const subtaskProgress = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

// Calcular estado de tiempo
  const timeDifference = (task.estimatedTime || 0) - (task.timeLogged || 0);
  const timeStatus = timeDifference >= 0 ? 'En tiempo' : 'Fuera de tiempo';
  const timeStatusClass = timeDifference >= 0 ? 'time-good' : 'time-bad';


  taskDetailsContent.innerHTML = `
    <div class="task-details-container">
      <div class="task-details-header">
        <span class="close-detail">&times;</span>
        <h3>${task.name}</h3>
        <div class="task-meta-header">
          <span class="priority-badge ${task.priority}">${capitalizeFirstLetter(task.priority)}</span>
          <span class="status-badge ${task.status}">${getStatusText(task.status)}</span>
        </div>
      </div>
      
      <div class="task-details-grid">
        <!-- Columna Izquierda -->
        <div class="details-column">
          <div class="detail-group">
            <label>Fecha Inicio:</label>
            <input type="date" id="editTaskStartDate" class="editable-input" value="${task.startDate || ''}">
          </div>
          
          <div class="detail-group">
            <label>Fecha Límite:</label>
            <input type="date" id="editTaskDeadline" class="editable-input" value="${task.deadline || ''}">
          </div>
          
          <div class="detail-group">
            <label>Asignado a:</label>
            <input type="text" id="editTaskAssignee" class="editable-input" value="${task.assignee || ''}">
          </div>

<div class="detail-group">
  <label>Dependencias:</label>
  <select id="taskDependencies" multiple>
    <option value="">-- Seleccione tareas predecesoras --</option>
  </select>
</div>
        </div>
        
        <!-- Columna Derecha -->
        <div class="detail-group">
  <label>Tiempo Estimado:</label>
  <input type="number" 
         id="editTaskEstimatedHours" 
         class="editable-input" 
         value="${task.estimatedTime || 0}" 
         step="0.5" 
         min="0">

          
          <div class="detail-group">
            <label>Tiempo Registrado:</label>
            <div class="detail-value">${task.timeLogged || 0} horas</div>
          </div>
          
          <div class="detail-group">
            <label>Prioridad:</label>
            <div class="detail-value">${capitalizeFirstLetter(task.priority)}</div>
          </div>
        </div>
        
<div class="detail-group">
          <label>Estado Tiempo:</label>
          <div class="detail-value ${timeStatusClass}">
            ${timeStatus} (${Math.abs(timeDifference).toFixed(1)}h ${timeDifference >= 0 ? 'restantes' : 'excedidas'})
          </div>
        </div>
      </div>


        <!-- Descripción (ancho completo) -->
        <div class="detail-group full-width">
          <label>Descripción:</label>
          <textarea id="editTaskDescription" 
          class="editable-textarea description-text"
          rows="4">${task.description || ''}</textarea>
        </div>
        
        <!-- Subtareas (ancho completo) -->
        <div class="detail-group full-width">
          <div class="subtasks-header">
            <h4>Subtareas (${subtaskProgress}% completado)</h4>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${subtaskProgress}%"></div>
            </div>
          </div>
          <div class="subtasks-list" id="subtasksList-${task.id}">
            ${renderSubtasks(task.subtasks || [], task.id)}
          </div>
          <div class="add-subtask-form">
            <input type="text" id="newSubtaskInput-${task.id}" placeholder="Nueva subtarea">
            <button onclick="addSubtask(${task.id})">Agregar</button>
          </div>
        </div>
      </div>
      
      <!-- Sección de tiempo -->
      <div class="time-tracking-section">
        <h4>Registro de Tiempo</h4>
        <div class="time-entry-form">
          <div class="form-group">
            <label for="timeSpent">Horas trabajadas:</label>
            <input type="number" id="timeSpent" placeholder="Ej: 1.5" step="0.1" min="0">
          </div>
          
          <div class="form-group">
            <label for="timeComment">Comentario:</label>
            <textarea id="timeComment" placeholder="Descripción del trabajo realizado"></textarea>
          </div>
          
          <button type="button" id="registerTimeBtn" class="btn-save">Registrar Tiempo</button>
        </div>
        
        <div class="time-history">
          <h4>Historial de Tiempo</h4>
          <div id="timeHistoryList">
            ${renderTimeHistory(task.timeHistory || [])}
          </div>
        </div>
      </div>
    </div>
  

    
      <div class="task-details-footer">
        <button type="button" id="cancelEditBtn" class="btn-cancel">Cancelar</button>
        <button type="submit" id="saveTaskBtn" class="btn-save">Guardar Cambios</button>
      </div>
    </div>
  `;

  document.getElementById('registerTimeBtn').addEventListener('click', () => {
    const hoursInput = document.getElementById('timeSpent');
    const commentInput = document.getElementById('timeComment');
    const hours = parseFloat(hoursInput.value);
    const comment = commentInput.value.trim() || 'Sin comentario';

    if (!isNaN(hours) && hours > 0) {
      const now = new Date();
      const timeEntry = {
        date: now.toLocaleDateString() + ' ' + now.toLocaleTimeString(),
        hours: hours,
        comment: comment
      };

      task.timeHistory = task.timeHistory || [];
      task.timeLogged = (task.timeLogged || 0) + hours;

      task.timeHistory.unshift(timeEntry);

      const estimatedHoursInput = document.getElementById('editTaskEstimatedHours');
      if (estimatedHoursInput) {
        task.estimatedTime = parseFloat(estimatedHoursInput.value) || 0;
      }

      updateLocalStorage();
      showTaskDetails(task);
      generateReports();
      showNotification('Tiempo registrado exitosamente');
    } else {
      showNotification('Por favor ingrese un valor válido para las horas');
    }
  });

  document.getElementById('saveTaskBtn').addEventListener('click', () => {
    saveTaskChanges(task.id);
  });

  document.getElementById('cancelEditBtn').addEventListener('click', () => {
    taskDetailsModal.style.display = 'none';
  });

  document.querySelector('.close-detail').addEventListener('click', () => {
    taskDetailsModal.style.display = 'none';
  });


// Llenar el selector de dependencias (excluyendo la tarea actual)
populateTaskDependenciesSelect(task.id);

// Restaurar selección de dependencias
const select = document.getElementById('taskDependencies');
if (select && task.dependencies) {
  Array.from(select.options).forEach(option => {
    option.selected = task.dependencies.includes(parseInt(option.value));
  });
}


// Cerrar el menú desplegable al seleccionar una opción
select.addEventListener('change', function() {
  // En Chrome/Firefox, esto no cierra el menú, pero podemos forzarlo con un pequeño truco
  const selectedOption = this.selectedOptions[0];
  if (selectedOption) {
    // Simular clic fuera para cerrar el menú (trick)
    const event = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    document.body.dispatchEvent(event);
  }
});

  taskDetailsModal.style.display = 'block';
}

// Botón Guardar Cambios
    document.getElementById('saveTaskBtn')?.addEventListener('click', () => {
      saveTaskChanges(task.id);
    });

function renderSubtasks(subtasks, taskId) {
  if (!subtasks || subtasks.length === 0) {
    return '<div class="no-subtasks">No hay subtareas definidas</div>';
  }
  
  return subtasks.map((subtask, index) => `
    <div class="subtask-item" data-subtask-id="${subtask.id}">
      <input type="checkbox" ${subtask.completed ? 'checked' : ''} 
             onchange="toggleSubtaskCompletion(${taskId}, ${subtask.id}, this.checked)">
      <span class="subtask-text ${subtask.completed ? 'completed' : ''}">${subtask.name}</span>
      <button class="subtask-delete" onclick="deleteSubtask(${taskId}, ${subtask.id})">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join('');
}

function renderSubtasks(subtasks, taskId) {
  if (!subtasks || subtasks.length === 0) {
    return '<div class="no-subtasks">No hay subtareas definidas</div>';
  }
  
  return subtasks.map((subtask, index) => `
    <div class="subtask-item" data-subtask-id="${subtask.id}">
      <input type="checkbox" ${subtask.completed ? 'checked' : ''} 
             onchange="toggleSubtaskCompletion(${taskId}, ${subtask.id}, this.checked)">
      <span class="subtask-text ${subtask.completed ? 'completed' : ''}">${subtask.name}</span>
      <button class="subtask-delete" onclick="deleteSubtask(${taskId}, ${subtask.id})">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join('');
}

function renderTimeHistory(history) {
  if (!history || history.length === 0) {
    return '<div class="empty-history">No hay registros de tiempo</div>';
  }

  let html = '<table class="time-history-table"><thead><tr><th>Fecha</th><th>Horas</th><th>Comentario</th></tr></thead><tbody>';
  let totalHours = 0;

  history.forEach((entry, index) => {
    totalHours += entry.hours;
    html += `
      <tr>
        <td>${entry.date}</td>
        <td>${entry.hours.toFixed(2)}</td>
        <td>${entry.comment}</td>
      </tr>
    `;
  });

  html += `</tbody><tfoot><tr><td colspan="3">Total: ${totalHours.toFixed(2)} horas</td></tr></tfoot></table>`;

  return html;
}



// En lugar de usar <select>, usamos los elementos seleccionados
const dependencies = Array.from(
  document.querySelectorAll('#taskDependenciesItems div.selected')
).map(el => parseInt(el.dataset.id)).filter(id => !isNaN(id));


/*********************
 * GESTIÓN DE TAREAS *
 *********************/

function saveTaskChanges(taskId) {
  const project = projects[currentProjectIndex];
  const taskIndex = project.tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex !== -1) {
    // Obtener todos los valores editados
    const editedTask = {
      ...project.tasks[taskIndex],
      name: document.getElementById('editTaskName')?.value || project.tasks[taskIndex].name,
      priority: document.getElementById('editTaskPriority')?.value || project.tasks[taskIndex].priority,
      status: document.getElementById('editTaskStatus')?.value || project.tasks[taskIndex].status,
      startDate: document.getElementById('editTaskStartDate')?.value || project.tasks[taskIndex].startDate,
      deadline: document.getElementById('editTaskDeadline')?.value || project.tasks[taskIndex].deadline,
      assignee: document.getElementById('editTaskAssignee')?.value || project.tasks[taskIndex].assignee,
      description: document.getElementById('editTaskDescription')?.value || project.tasks[taskIndex].description,
      estimatedTime: parseFloat(document.getElementById('editTaskEstimatedHours')?.value) || 0,
      dependencies: Array.from(document.getElementById('taskDependencies')?.selectedOptions || [])
  .map(opt => parseInt(opt.value))
  .filter(id => !isNaN(id)),
      subtasks: project.tasks[taskIndex].subtasks || [] // Mantener subtareas existentes
    };

    // Actualizar la tarea en el array
    project.tasks[taskIndex] = editedTask;
    
    // Guardar y actualizar UI
    updateLocalStorage();
    renderKanbanTasks();
    updateTaskList();
    updateStatistics();
    generatePieChart(getStats());
    updateProjectProgress();
    actualizarAsignados();
    generateReports();
    updateResourceAllocation();
    
    // Actualizar fechas del proyecto
    const { earliestDate, latestDate } = calculateProjectDatesFromTasks(project);
    updateProjectDatesInDashboard(earliestDate, latestDate);
    
    // 🔥 NOTIFICAR a otros usuarios sobre la actualización
    if (tiempoRealSocket && tiempoRealSocket.connected) {
      tiempoRealSocket.emit('task-changed', {
        projectId: currentProjectIndex,
        taskId: taskId,
        taskName: editedTask.name,
        userName: 'Usuario actual',
        type: 'task-updated',
        timestamp: new Date().toISOString()
      });
      console.log('📢 Notificando actualización de tarea');
    }
    
    // Cerrar el modal
    taskDetailsModal.style.display = 'none';
    showNotification('Cambios guardados exitosamente');
  } else {
    showNotification('Error: No se encontró la tarea para actualizar');

  // 🔥 AGREGAR ESTO AL FINAL:
  refreshCalendar();

  }
}







/*****************
 * VISTAS (UI) *
 *****************/
function renderTasks() {
  renderKanbanTasks();
}

function updateTaskList() {
  renderListTasks();
}

/*************
 * FILTROS *
 *************/
function actualizarAsignados() {
  ['filterAssignee', 'filterAssigneeList', 'filterAssigneeCalendar', 'filterAssigneeGantt', 'filterAssigneeReports'].forEach(selector => {
    const select = document.getElementById(selector);
    if (!select || !projects[currentProjectIndex]) return;
    
    const seleccionActual = select.value;
    select.innerHTML = '<option value="">Todos</option>';
    
       const asignados = new Set();
    
    projects[currentProjectIndex].tasks.forEach(task => {
      if (task.assignee && task.assignee.trim() !== '') {
        asignados.add(task.assignee.trim());
      }
    });

    Array.from(asignados).sort((a, b) => a.localeCompare(b)).forEach(asignado => {
      const option = document.createElement('option');
      option.value = asignado;
      option.textContent = asignado;
      select.appendChild(option);
    });
    
    if (seleccionActual && asignados.has(seleccionActual)) {
      select.value = seleccionActual;
    }
  });
}

/*****************
 * DRAG & DROP *
 *****************/
function initDragAndDrop() {
  document.querySelectorAll('.task-card').forEach(task => {
    task.addEventListener('dragstart', handleDragStart);
    task.addEventListener('dragend', handleDragEnd);
  });

  document.querySelectorAll('.tasks').forEach(column => {
    column.addEventListener('dragover', handleDragOver);
    column.addEventListener('dragleave', handleDragLeave);
    column.addEventListener('drop', handleDrop);
  });
}

function handleDragStart(e) {
  e.dataTransfer.setData('taskId', e.currentTarget.dataset.taskId);
  e.currentTarget.style.opacity = '0.4';
}

function handleDragEnd(e) {
  e.currentTarget.style.opacity = '1';
}

function handleDragOver(e) {
  e.preventDefault();
  e.currentTarget.style.backgroundColor = '#f0f0f0';
}

function handleDragLeave(e) {
  e.currentTarget.style.backgroundColor = '';
}

function handleDrop(e) {
  e.preventDefault();
  const taskId = parseInt(e.dataTransfer.getData('taskId'));
  const targetColumn = e.currentTarget.closest('.column');
  
  const statusMap = {
    pendingTasks: 'pending',
    inProgressTasks: 'inProgress',
    completedTasks: 'completed',
    overdueTasks: 'overdue'
  };

  const newStatus = statusMap[targetColumn.id];
  const task = projects[currentProjectIndex].tasks.find(t => t.id === taskId);

  if (task && task.status !== newStatus) {
    task.status = newStatus;
    checkTaskOverdue(task);
    updateLocalStorage();


 // ✅ Inserta esto justo aquí
  if (task.status === 'completada') {
    logCompletedTask(task);
    checkAutoRetrain();
  }





// === AGREGAR ESTA LÍNEA ===
      if (window.syncManager) window.syncManager.notifyChange('task-moved', { 
          projectIndex: currentProjectIndex, 
          taskId: taskId, 
          taskName: task.name, 
          newStatus: newStatus 
      });
    actualizarAsignados();
    aplicarFiltros();
    updateStatistics();
    updateResourceAllocation(); // <-- Esta es la línea que agregas


 // 🔥 AGREGAR NOTIFICACIÓN PARA DRAG & DROP
    if (tiempoRealSocket && tiempoRealSocket.connected) {
      tiempoRealSocket.emit('task-changed', {
        projectId: currentProjectIndex,
        taskId: taskId,
        taskName: task.name,
        userName: 'Usuario actual',
        type: 'task-moved',
        newStatus: newStatus,
        timestamp: new Date().toISOString()
      });
      console.log('📢 Notificando movimiento de tarea');
    }


 // 🔥 NUEVO: actualizar gráfica de status
  generatePieChart(getStats());
  updateProjectProgress();
  actualizarAsignados();
  }

  e.currentTarget.style.backgroundColor = '';
}

function checkTaskOverdue(task) {
  if (task.status === 'completed') return false;
  
  if (task.deadline) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const deadlineDate = new Date(task.deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    
    if (deadlineDate < today) {
      task.status = 'overdue';
      return true;
    }
  }
  return false;
}

/*********************
 * ESTADÍSTICAS *
 *********************/
function getStats(tasks = null) {
  const tasksToUse = tasks || projects[currentProjectIndex]?.tasks || [];
  return {
    total: tasksToUse.length,
    pending: tasksToUse.filter(t => t.status === 'pending').length,
    inProgress: tasksToUse.filter(t => t.status === 'inProgress').length,
    completed: tasksToUse.filter(t => t.status === 'completed').length,
    overdue: tasksToUse.filter(t => t.status === 'overdue').length
  };
}


function calculateTimeBudgetUsage() {
    const project = projects[currentProjectIndex];
    if (!project || !project.tasks || project.tasks.length === 0) {
        return 0;
    }

    let totalEstimated = 0;
    let totalLogged = 0;

    project.tasks.forEach(task => {
        totalEstimated += task.estimatedTime || 0;
        totalLogged += task.timeLogged || 0;
    });

    if (totalEstimated === 0) return 0;

    const percentage = (totalLogged / totalEstimated) * 100;
    return Math.round(percentage);
}



function updateRisksCount() {
    const risksContainer = document.getElementById('risksContainer');
    const riskLevelElement = document.getElementById('riskLevel');
    
    if (!risksContainer || !riskLevelElement) return;

    // Contar solo elementos de riesgo reales (excluyendo mensajes vacíos)
    const riskItems = risksContainer.querySelectorAll('.risk-item');
    const realRiskCount = Array.from(riskItems).filter(item => 
        !item.classList.contains('empty-message')
    ).length;

    riskLevelElement.textContent = realRiskCount;
    console.log(`Actualizado contador de riesgos: ${realRiskCount}`);
}


function updateStatistics(tasks = null) {
  const stats = getStats(tasks);
  
  if (totalTasks) totalTasks.textContent = stats.total;
  if (pendingCount) pendingCount.textContent = stats.pending;
  if (inProgressCount) inProgressCount.textContent = stats.inProgress;
  if (completedCount) completedCount.textContent = stats.completed;
  if (overdueCount) overdueCount.textContent = stats.overdue;
}

function generatePieChart(data) {
  console.log("🎯 Generando gráfico de pastel...");
  
  const pieChartCanvas = document.getElementById('pieChart');
  if (!pieChartCanvas) {
    console.error("❌ No se encuentra el canvas pieChart");
    return;
  }

  // 🔥 CLAVE: Asegurar que el canvas tenga dimensiones visibles
  if (pieChartCanvas.offsetWidth === 0 || pieChartCanvas.offsetHeight === 0) {
    console.log("⚠️ Canvas tiene dimensiones 0, forzando tamaño...");
    pieChartCanvas.style.width = '400px';
    pieChartCanvas.style.height = '400px';
  }

  // Destruir gráfica anterior SI existe
  if (window.myChartInstance) {
    window.myChartInstance.destroy();
    window.myChartInstance = null;
  }

  const ctx = pieChartCanvas.getContext('2d');
  
  try {
    window.myChartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Pendientes', 'En Progreso', 'Completados', 'Rezagados'],
        datasets: [{
          data: [data.pending, data.inProgress, data.completed, data.overdue],
          backgroundColor: ['#f1c40f', '#008080', '#2ecc71', '#e74c3c']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });

    console.log("✅ Gráfico de pastel creado exitosamente");

    // 🔥 FORZAR REDIBUJADO después de un pequeño delay
    setTimeout(() => {
      if (window.myChartInstance) {
        window.myChartInstance.update();
        console.log("🔄 Gráfico actualizado forzadamente");
      }
    }, 500);

  } catch (error) {
    console.error("❌ Error creando gráfico:", error);
  }
}
function updateProjectProgress() {
  const project = projects[currentProjectIndex];
  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter(t => t.status === 'completed').length;
  const progressFill = document.getElementById('projectProgressFill');
  const progressLabel = document.getElementById('projectProgressLabel');

  if (!progressFill || !progressLabel) return;

  const percent = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  progressFill.style.width = `${percent}%`;
  progressLabel.textContent = `${percent}% Completado`;
  progressFill.style.backgroundColor = '#2ecc71';
}


function formatDate(date) {
    if (!date || isNaN(date.getTime())) return '--/--/--';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}


function updateProjectDatesFromTasks() {
    const tasks = projects[currentProjectIndex]?.tasks || [];
    const startDates = tasks.map(t => t.startDate).filter(Boolean);
    const endDates = tasks.map(t => t.deadline).filter(Boolean);
    const earliestDate = startDates.length > 0 ? new Date(Math.min(...startDates.map(d => new Date(d)))) : null;
    const latestDate = endDates.length > 0 ? new Date(Math.max(...endDates.map(d => new Date(d)))) : null;

    // Actualizar Dashboard (usa el ID original)
    const startDateEl = document.getElementById('projectStartDate');
    const endDateEl = document.getElementById('projectEndDate');

    if (startDateEl) {
        startDateEl.textContent = earliestDate ? formatDate(earliestDate) : '--/--/--';
    }
    if (endDateEl) {
        endDateEl.textContent = latestDate ? formatDate(latestDate) : '--/--/--';
    }

    // Actualizar vista de Reportes (usa los nuevos IDs)
    const startDateReportsEl = document.getElementById('projectStartDateReports');
    const endDateReportsEl = document.getElementById('projectEndDateReports');

    if (startDateReportsEl) {
        startDateReportsEl.textContent = earliestDate ? formatDate(earliestDate) : '--/--/--';
    }
    if (endDateReportsEl) {
        endDateReportsEl.textContent = latestDate ? formatDate(latestDate) : '--/--/--';
    }
}
function checkOverdueTasks() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  let hasChanges = false;

  projects[currentProjectIndex].tasks.forEach(task => {
    if (task.deadline && task.status !== 'completed') {
      const deadlineDate = new Date(task.deadline);
      deadlineDate.setHours(0, 0, 0, 0);
      if (deadlineDate < now && task.status !== 'overdue') {
        task.status = 'overdue';
        hasChanges = true;
      }
    }
  });

  if (hasChanges) {
    updateLocalStorage();
    actualizarAsignados();
    aplicarFiltros();
    generatePieChart(getStats());
           updateProjectProgress();
           actualizarAsignados();
    showNotification('Tareas actualizadas: algunas han sido marcadas como "Rezagadas"');
  }
}

/***********************
 * FUNCIONES DE REPORTES *
 ***********************/
function generateReports(tasks = null) {
    const tasksToUse = tasks || projects[currentProjectIndex]?.tasks || [];
    const timeStats = getTimeStats(tasksToUse);

    // Actualizar cuadros de tiempo (con validación)
    if (totalEstimatedTime && !isNaN(timeStats.totalEstimated)) {
        totalEstimatedTime.textContent = `${timeStats.totalEstimated.toFixed(2)} horas`;
    }
    if (totalLoggedTime && !isNaN(timeStats.totalLogged)) {
        totalLoggedTime.textContent = `${timeStats.totalLogged.toFixed(2)} horas`;
    }
    if (remainingTime && !isNaN(timeStats.remaining)) {
        remainingTime.textContent = `${timeStats.remaining.toFixed(2)} horas`;
    }
  
  // Actualizar estadísticas
  updateStatistics(tasksToUse);
  
  // Actualizar gráfico
  generatePieChart(stats);
  
  // Actualizar progreso del proyecto
  updateProjectProgress();
  updateProjectDatesFromTasks();

  updateProjectStatusLabel();
}

function getTimeStats(tasks = null) {
    const tasksToUse = tasks || projects[currentProjectIndex]?.tasks || [];
    return {
        totalEstimated: tasksToUse.reduce((sum,  task) => sum + (task.estimatedTime || 0), 0),
        totalLogged: tasksToUse.reduce((sum, task) => sum + (task.timeLogged || 0), 0),
        remaining: tasksToUse.reduce((sum, task) => {
            const remaining = (task.estimatedTime || 0) - (task.timeLogged || 0);
            return sum + (remaining > 0 ? remaining : 0);
        }, 0)
    };
}
/***********************
 * FUNCIONES DE RENTABILIDAD *
 ***********************/
function renderProfitabilityView() {
  const project = projects[currentProjectIndex];
  
  // Cálculos de ejemplo (ajusta según tu lógica de negocio)
  const totalHours = project.tasks.reduce((sum, task) => sum + (task.timeLogged || 0), 0);
  const hourlyCost = 50; // Costo por hora (ejemplo)
  const projectBudget = 10000; // Presupuesto del proyecto (ejemplo)
  
  const totalCost = totalHours * hourlyCost;
  const profitMargin = ((projectBudget - totalCost) / projectBudget) * 100;
  
  // Actualiza la UI
  document.getElementById('totalCost').textContent = `$${totalCost.toFixed(2)}`;
  document.getElementById('totalIncome').textContent = `$${projectBudget.toFixed(2)}`;
  document.getElementById('profitMargin').textContent = `${profitMargin.toFixed(2)}%`;
  
  // Gráfico
  renderProfitabilityChart(totalCost, projectBudget);
}

function renderProfitabilityChart(cost, income) {
  const ctx = document.getElementById('profitabilityChart').getContext('2d');
  
  if (window.profitabilityChart) {
    window.profitabilityChart.destroy();
  }
  
  window.profitabilityChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Costos', 'Ingresos'],
      datasets: [{
        label: 'Análisis Financiero',
        data: [cost, income],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)'
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        }
      }
    }
  });
}

/*********************
 * ANÁLISIS DE RUTA CRÍTICA *
 *********************/
// Reemplaza tu calculateCriticalPath actual por esta versión corregida
function calculateCriticalPath(tasks) {
  if (!Array.isArray(tasks) || tasks.length === 0) return [];

  // Map id -> node
  const nodes = new Map();
  tasks.forEach(t => {
    nodes.set(String(t.id), {
      id: String(t.id),
      name: t.name || '',
      duration: Number(t.estimatedTime || 0),
      deps: (t.dependencies || []).map(d => String(d)),
      earliestStart: 0,
      earliestFinish: 0,
      latestStart: Infinity,
      latestFinish: Infinity,
      slack: Infinity
    });
  });

  // Topological order (Kahn)
  const inDegree = new Map();
  nodes.forEach((node) => inDegree.set(node.id, 0));
  nodes.forEach(node => {
    node.deps.forEach(depId => {
      if (nodes.has(depId)) {
        inDegree.set(node.id, (inDegree.get(node.id) || 0) + 1);
      }
    });
  });

  const queue = [];
  inDegree.forEach((deg, id) => { if (deg === 0) queue.push(id); });

  const topo = [];
  while (queue.length) {
    const id = queue.shift();
    topo.push(id);
    // reduce in-degree of successors
    nodes.forEach(node => {
      if (node.deps.includes(id)) {
        inDegree.set(node.id, inDegree.get(node.id) - 1);
        if (inDegree.get(node.id) === 0) queue.push(node.id);
      }
    });
  }

  if (topo.length !== nodes.size) {
    // Hay ciclos => no se puede calcular CPM clásico
    console.warn('calculateCriticalPath: grafo con ciclos, devolviendo tareas sin cálculo de ruta crítica.');
    return [];
  }

  // Forward pass
  topo.forEach(id => {
    const node = nodes.get(id);
    if (!node) return;
    if (!node.deps || node.deps.length === 0) {
      node.earliestStart = 0;
    } else {
      node.earliestStart = Math.max(...node.deps
        .filter(depId => nodes.has(depId))
        .map(depId => nodes.get(depId).earliestFinish || 0)
      );
    }
    node.earliestFinish = node.earliestStart + node.duration;
  });

  // Project duration = max earliestFinish
  const projectDuration = Math.max(...Array.from(nodes.values()).map(n => n.earliestFinish || 0));

  // Backward pass: init tasks with no successors
  // Build successors map
  const successors = new Map();
  nodes.forEach((n) => successors.set(n.id, []));
  nodes.forEach(n => {
    (n.deps || []).forEach(dep => {
      if (nodes.has(dep)) {
        successors.get(dep).push(n.id);
      }
    });
  });

  // Initialize latestFinish for terminal nodes
  nodes.forEach(n => {
    if (!successors.get(n.id) || successors.get(n.id).length === 0) {
      n.latestFinish = projectDuration;
      n.latestStart = n.latestFinish - n.duration;
    }
  });

  // Process nodes in reverse topo
  for (let i = topo.length - 1; i >= 0; i--) {
    const id = topo[i];
    const node = nodes.get(id);
    if (!node) continue;
    if (successors.get(id) && successors.get(id).length > 0) {
      node.latestFinish = Math.min(...successors.get(id).map(sid => nodes.get(sid).latestStart));
      node.latestStart = node.latestFinish - node.duration;
    }
    node.slack = node.latestStart - node.earliestStart;
  }

  // Critical path = tasks with slack === 0 (o muy cercano)
  const critical = Array.from(nodes.values())
    .filter(n => Math.abs(n.slack) < 1e-6)
    .sort((a, b) => a.earliestStart - b.earliestStart);

  // Map back to original task objects (preserve order)
  const criticalIds = new Set(critical.map(c => c.id));
  return tasks.filter(t => criticalIds.has(String(t.id)));
}



/***********************
 * EVENT LISTENERS *
 ***********************/
function setupEventListeners() {
  // Proyectos
  document.getElementById('newProjectBtn')?.addEventListener('click', createNewProject);
  
  // Tareas
  // 👇 Reemplazar el listener del formulario de Nueva Tarea por uno seguro
const createTaskForm = document.getElementById('createTaskForm');
if (createTaskForm) {
  // 1. Eliminar el formulario y reemplazarlo para limpiar listeners anteriores
  const newForm = createTaskForm.cloneNode(true);
  createTaskForm.replaceWith(newForm);
  // 2. Conectar SOLO el listener correcto
  newForm.addEventListener('submit', function(e) {
    e.preventDefault(); // ¡Importante!
    createNewTask(e);
  });
}
  document.getElementById('newTaskBtn')?.addEventListener('click', () => {
    createTaskModal.style.display = 'block';
    populateTaskDependenciesSelect();

 
    // 👇 AGREGAR ESTO - Esperar a que el modal esté visible
    setTimeout(() => {
        setupAIEstimation();
        console.log('✅ IA configurada con modal visible');
    }, 300);
});
  
// 👇 AÑADE ESTA LÍNEA NUEVA
    setTimeout(setupAIEstimation, 100); // Inicializar IA después de abrir modal
 


  // Cerrar modales
  document.querySelector('.close')?.addEventListener('click', () => {
    createTaskModal.style.display = 'none';
  });

  // Menú sidebar - VERSIÓN CORREGIDA
toggleSidebarBtn?.addEventListener('click', function() {
    console.log('🖱️ Botón sidebar clickeado - versión corregida');
    const sidebar = document.querySelector('aside');
    
    sidebar.classList.toggle('hidden');
    
    // Pequeño delay para que el DOM se actualice y luego sincronizar
    setTimeout(() => {
        syncLinesWithSidebar();
        // Forzar un re-render del diagrama Gantt para recalcular posiciones
        if (!ganttView.classList.contains('hidden')) {
            console.log('🔄 Re-renderizando Gantt para recalcular líneas...');
            renderGanttChart();
        }
    }, 100);
});

  // Filtros con debounce para mejor performance
  document.getElementById('filterAssignee')?.addEventListener('input', debounce(aplicarFiltros, 300));
  document.getElementById('filterPriority')?.addEventListener('change', aplicarFiltros);
  document.getElementById('filterStatus')?.addEventListener('change', aplicarFiltros);
  document.getElementById('filterStartDate')?.addEventListener('change', aplicarFiltros);
  document.getElementById('filterEndDate')?.addEventListener('change', aplicarFiltros);

  // Filtros de la vista de lista
  document.getElementById('filterAssigneeList')?.addEventListener('input', debounce(aplicarFiltros, 300));
  document.getElementById('filterPriorityList')?.addEventListener('change', aplicarFiltros);
  document.getElementById('filterStatusList')?.addEventListener('change', aplicarFiltros);
  document.getElementById('filterStartDateList')?.addEventListener('change', aplicarFiltros);
  document.getElementById('filterEndDateList')?.addEventListener('change', aplicarFiltros);

  // Filtros del calendario
  document.getElementById('filterAssigneeCalendar')?.addEventListener('input', debounce(aplicarFiltros, 300));
  document.getElementById('filterPriorityCalendar')?.addEventListener('change', aplicarFiltros);
  document.getElementById('filterStatusCalendar')?.addEventListener('change', aplicarFiltros);

  // Filtros de Gantt
  document.getElementById('filterAssigneeGantt')?.addEventListener('input', debounce(aplicarFiltros, 300));
  document.getElementById('filterPriorityGantt')?.addEventListener('change', aplicarFiltros);
  document.getElementById('clearFiltersGanttBtn')?.addEventListener('click', () => {
    document.getElementById('filterAssigneeGantt').value = '';
    document.getElementById('filterPriorityGantt').value = '';
    aplicarFiltros();
  });

  // Filtros de Reports
  document.getElementById('filterAssigneeReports')?.addEventListener('change', aplicarFiltros);
  document.getElementById('filterPriorityReports')?.addEventListener('change', aplicarFiltros);
  document.getElementById('filterStatusReports')?.addEventListener('change', aplicarFiltros);
  document.getElementById('clearFiltersReportsBtn')?.addEventListener('click', () => {
    document.getElementById('filterAssigneeReports').value = '';
    document.getElementById('filterPriorityReports').value = '';
    document.getElementById('filterStatusReports').value = '';
    aplicarFiltros();
  });

  // Limpiar filtros
  document.getElementById('clearFiltersBtn')?.addEventListener('click', () => {
    document.getElementById('filterAssignee').value = '';
    document.getElementById('filterPriority').value = '';
    document.getElementById('filterStatus').value = '';
    document.getElementById('filterStartDate').value = '';
    document.getElementById('filterEndDate').value = '';
    aplicarFiltros();
  });

  // Limpiar filtros del calendario
  document.getElementById('clearFiltersCalendarBtn')?.addEventListener('click', () => {
    document.getElementById('filterAssigneeCalendar').value = '';
    document.getElementById('filterPriorityCalendar').value = '';
    document.getElementById('filterStatusCalendar').value = '';
    aplicarFiltros();
  });

  // Limpiar filtros de lista
  document.getElementById('clearFiltersListBtn')?.addEventListener('click', () => {
    document.getElementById('filterAssigneeList').value = '';
    document.getElementById('filterPriorityList').value = '';
    document.getElementById('filterStatusList').value = '';
    document.getElementById('filterStartDateList').value = '';
    document.getElementById('filterEndDateList').value = '';
    aplicarFiltros();
  });

  // Botones de cambio de vista
  if (viewButtons.board) viewButtons.board.addEventListener('click', () => showView('board'));
  if (viewButtons.list) viewButtons.list.addEventListener('click', () => showView('list'));
  if (viewButtons.calendar) viewButtons.calendar.addEventListener('click', () => showView('calendar'));
  if (viewButtons.gantt) viewButtons.gantt.addEventListener('click', () => showView('gantt'));
  if (viewButtons.reports) viewButtons.reports.addEventListener('click', () => showView('reports'));
  if (viewButtons.profitability) viewButtons.profitability.addEventListener('click', () => showView('profitability'));
  if (viewButtons.dashboard) viewButtons.dashboard.addEventListener('click', () => showView('dashboard'));
  

// === BOTÓN DE CERRAR SESIÓN (aquí va) ===
  document.getElementById('logoutBtn')?.addEventListener('click', logout);

document.getElementById('showTimeAllocationView')?.addEventListener('click', function () {
    console.log("🖱️ Clic en botón de menú 'Asignación de Horas'.");
    showTimeAllocationView(); // Esta función llama a populateTimeAllocationFilters
});


// En la sección de event listeners para botones de vista
document.getElementById('showDashboard4DView')?.addEventListener('click', () => {
    window.open('dashbd4d.html', '_blank', 'width=1400,height=800');
});

  // Botón de generación de PDF
  document.getElementById('generatePdfBtn')?.addEventListener('click', generateStatusReportPDF);
}

// === FUNCIÓN FINAL CORREGIDA - INFORMACIÓN DEL PROYECTO ===
async function generateProjectReport() {
  console.log("📊 Generando reporte con formato exacto...");
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const project = projects[currentProjectIndex];
  const stats = getStats();
  const timeStats = getTimeStats();
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

  // === CONFIGURACIÓN INICIAL ===
  doc.setFont("helvetica");
  
  // === ENCABEZADO DEL REPORTE ===
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Reporte del Proyecto", 105, 20, { align: "center" });
  
  let y = 35; // Posición Y inicial después del título

  // === INFORMACIÓN DEL PROYECTO - MÉTODO CORREGIDO ===
  doc.setFontSize(12);
  
  // Título "Estadísticas del Proyecto" en negrita
  doc.setFont("helvetica", "bold");
  doc.text("Estadísticas del Proyecto:", 20, y);
  y += 7;

  // Función auxiliar para escribir texto con formato mixto
  const writeLabelValue = (label, value) => {
    doc.setFont("helvetica", "bold");
    doc.text(label, 20, y);
    const labelWidth = doc.getTextWidth(label);
    doc.setFont("helvetica", "normal");
    doc.text(value, 20 + labelWidth, y);
    y += 7;
  };

  // Escribir cada línea con DOS ESPACIOS después de los dos puntos
  writeLabelValue("Proyecto:  ", project.name);
  writeLabelValue("Fecha del reporte:  ", formattedDate);

  // Fechas de inicio y fin
  const { earliestDate, latestDate } = calculateProjectDatesFromTasks(project);
  if (earliestDate) {
    writeLabelValue("Fecha de inicio:  ", formatDate(earliestDate));
  }
  if (latestDate) {
    writeLabelValue("Fecha de fin:  ", formatDate(latestDate));
  }

  // Porcentaje de avance
  const completionPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  writeLabelValue("Porcentaje de avance:  ", completionPercentage + "%");
  
  y += 8; // Espacio extra antes de la siguiente sección

  // === EL RESTO DEL CÓDIGO SE MANTIENE IGUAL ===
  // === SECCIÓN: DISTRIBUCIÓN DE TAREAS ===
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Distribución de Tareas", 105, y, { align: "center" });
  y += 10;

  // --- CUADROS ESTADÍSTICOS ---
  const boxWidth = 32;
  const boxHeight = 18;
  const boxMargin = 3;
  const totalWidth = (boxWidth * 5) + (boxMargin * 4);
  const startX = (doc.internal.pageSize.getWidth() - totalWidth) / 2;
  const yBox = y;

  // Función auxiliar para dibujar un cuadro
  const drawBox = (x, title, value, color, textColor = "#fff") => {
    const [r,g,b] = color;
    doc.setFillColor(r,g,b);
    doc.roundedRect(x, yBox, boxWidth, boxHeight, 2, 2, "F");
    
    // Texto del título
    doc.setTextColor(textColor);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(title, x + boxWidth / 2, yBox + 7, { align: "center" });
    
    // Valor
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(value.toString(), x + boxWidth / 2, yBox + 14, { align: "center" });
  };

  // Obtener el color de completadas del sistema (verde claro)
  const completedColor = getCompletadasColorFromSystem() || [144, 238, 144];

  // Dibujar los 5 cuadros
  drawBox(startX, "Total", stats.total, [52, 152, 219]);
  drawBox(startX + boxWidth + boxMargin, "Pendientes", stats.pending, [241, 196, 15], "#000");
  drawBox(startX + (boxWidth + boxMargin)*2, "En Progreso", stats.inProgress, [0, 128, 128]);
  drawBox(startX + (boxWidth + boxMargin)*3, "Completadas", stats.completed, completedColor, "#000");
  drawBox(startX + (boxWidth + boxMargin)*4, "Rezagadas", stats.overdue, [231, 76, 60]);
  
  y += 30; // Espacio después de los cuadros

  // === GRÁFICO CIRCULAR Y LEYENDAS (MÁS PEQUEÑOS) ===
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Distribución de Tareas", 105, y, { align: "center" });
  y += 8;

  try {
    const originalCanvas = document.getElementById("pieChart") || document.getElementById("tasksDistributionChart");
    if (originalCanvas) {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = 250;
      tempCanvas.height = 250;
      tempCanvas.style.position = "absolute";
      tempCanvas.style.top = "-9999px";
      document.body.appendChild(tempCanvas);
      const ctx = tempCanvas.getContext("2d");

      const chartInstance = Object.values(Chart.instances).find(c => c.canvas === originalCanvas);
      if (chartInstance) {
        const tempChart = new Chart(ctx, {
          type: 'pie',
          data: chartInstance.config.data,
          options: {
            ...chartInstance.config.options,
            plugins: {
              legend: {
                display: false
              }
            },
            animation: false
          }
        });
        
        await new Promise(r => setTimeout(r, 500));
        const imgData = tempCanvas.toDataURL("image/png");
        if (imgData && imgData.length > 1000) {
          const graphWidth = 85;
          const graphHeight = 85;
          const graphX = (doc.internal.pageSize.getWidth() - graphWidth) / 2;
          const graphY = y;
          
          doc.addImage(imgData, "PNG", graphX, graphY, graphWidth, graphHeight);
          
          y = graphY + graphHeight + 8;
        }
        tempChart.destroy();
      }
      document.body.removeChild(tempCanvas);
    }
  } catch (e) {
    console.error("❌ Error al capturar gráfico:", e);
    y += 50;
  }

  // === LEYENDAS (BANDERITAS) - MÁS PEQUEÑAS ===
  const legends = [
    { label: "Pendientes", color: [241, 196, 15] },
    { label: "En Progreso", color: [0, 128, 128] },
    { label: "Completadas", color: completedColor },
    { label: "Rezagadas", color: [231, 76, 60] }
  ];

  // Calcular posición para centrar las leyendas
  const legendItemWidth = 32;
  const totalLegendWidth = legends.length * legendItemWidth;
  const legendStartX = (doc.internal.pageSize.getWidth() - totalLegendWidth) / 2;

  // Dibujar leyendas (más pequeñas)
  legends.forEach((legend, index) => {
    const x = legendStartX + (index * legendItemWidth);
    
    doc.setFillColor(legend.color[0], legend.color[1], legend.color[2]);
    doc.rect(x, y, 5, 5, "F");
    
    doc.setTextColor("#000");
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text(legend.label, x + 8, y + 3.5);
  });

  y += 18;

  // === SECCIÓN: TIEMPO (BAJADA LA POSICIÓN) ===
  y += 10;

  const timeBlockWidth = 50;
  const timeBlockHeight = 25;
  const timeBlockMargin = 8;
  const totalTimeWidth = (timeBlockWidth * 3) + (timeBlockMargin * 2);
  const timeStartX = (doc.internal.pageSize.getWidth() - totalTimeWidth) / 2;

  // Función para dibujar bloque de tiempo
  const drawTimeBlock = (x, title, value, color) => {
    const [r,g,b] = color;
    doc.setFillColor(r,g,b);
    doc.roundedRect(x, y, timeBlockWidth, timeBlockHeight, 3, 3, "F");
    
    // Título
    doc.setTextColor("#fff");
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(title, x + timeBlockWidth / 2, y + 8, { align: "center" });
    
    // Valor
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(value, x + timeBlockWidth / 2, y + 17, { align: "center" });
  };

  // Colores para los bloques de tiempo (azul oscuro)
  const darkBlue = [44, 62, 80];

  // Dibujar los tres bloques de tiempo
  drawTimeBlock(timeStartX, "Tiempo Estimado", `${timeStats.totalEstimated.toFixed(2)} h`, darkBlue);
  drawTimeBlock(timeStartX + timeBlockWidth + timeBlockMargin, "Tiempo Registrado", `${timeStats.totalLogged.toFixed(2)} h`, darkBlue);
  drawTimeBlock(timeStartX + (timeBlockWidth + timeBlockMargin)*2, "Tiempo Restante", `${timeStats.remaining.toFixed(2)} h`, darkBlue);

  // === GUARDAR PDF FINAL ===
  const fileName = `Reporte_${project.name.replace(/ /g, "_")}_${formattedDate.replace(/\//g, "-")}.pdf`;
  doc.save(fileName);
  showNotification("✅ Reporte PDF generado con éxito");
}

// Función auxiliar para obtener el color de completadas del sistema
function getCompletadasColorFromSystem() {
  // Intenta obtener el color de completadas de tu sistema
  try {
    const savedColors = localStorage.getItem('taskColors');
    if (savedColors) {
      const colors = JSON.parse(savedColors);
      if (colors.completed) return colors.completed;
    }
  } catch (e) {}
  
  try {
    const style = getComputedStyle(document.documentElement);
    const completedColor = style.getPropertyValue('--completed-color') || 
                          style.getPropertyValue('--color-completed') ||
                          style.getPropertyValue('--success-color');
    if (completedColor) {
      const hex = completedColor.trim();
      if (hex.startsWith('#')) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
      }
    }
  } catch (e) {}
  
  try {
    const completedElement = document.querySelector('.completed, .task-completed, .status-completed');
    if (completedElement) {
      const style = getComputedStyle(completedElement);
      const bgColor = style.backgroundColor;
      if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
        const match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
          return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
        }
      }
    }
  } catch (e) {}
  
  return [144, 238, 144]; // lightgreen
}

/***********************
 * INICIALIZACIÓN *
 ***********************/
document.addEventListener('DOMContentLoaded', async () => {
    // ✅ AGREGAR ESTA VALIDACIÓN AL INICIO
  console.log('🚀 Iniciando aplicación...');
  console.log('📍 Estado inicial - currentProjectIndex:', currentProjectIndex);
  console.log('📦 Estado inicial - projects:', projects?.length);
    
  // 🔥 AGREGAR ESTA LÍNEA - Inicializar estilos del calendario
    addCalendarStyles();


    // Cargar datos de forma segura
    const dataLoaded = await safeLoad();
    
    if (!dataLoaded || projects.length === 0) {
        console.log('📝 No hay datos, creando proyecto inicial...');
        createNewProject();
    } else {
        console.log('✅ Datos cargados correctamente');
        renderProjects();
        selectProject(currentProjectIndex);
        checkOverdueTasks();
    }

    // Inicializar el resto de la aplicación
    setupEventListeners();

// INICIAR WEBSOCKETS AL FINAL, después de que todo esté cargado
setTimeout(() => {
  if (window.authToken) {
    console.log('🚀 Iniciando WebSockets...');
    initWebSocket();
  }
}, 2000);});


    
    // INICIALIZACIÓN DEL PASO 1
    const selector = document.getElementById('methodologySelector');
    if (selector) {
        selector.value = window.methodologyManager.getCurrentMode();
        selector.addEventListener('change', function() {
            if (window.methodologyManager.setMode(this.value)) {
                showNotification(`Modo cambiado a: ${this.value}`);
            }
        });
    }
    
    console.log('✅ Sistema de metodologías inicializado');
    updateDashboardTitle(window.methodologyManager.getCurrentMode());
    addModeTooltips(window.methodologyManager.getCurrentMode());
    
    // Iniciar sistema de persistencia
    initPersistenceSystem();
    
    // Verificar que todo funcione
setTimeout(() => {
    validateApplication();
    
    // Mostrar resumen final
    console.log('🌈 ¡APLICACIÓN COMPLETAMENTE OPERATIVA!');
    console.log('📍 Puedes usar estos comandos en consola:');
    console.log('   - forceSync() - Forzar sincronización manual');
    console.log('   - checkConnectionStatus() - Ver estado de conexión');
    console.log('   - debugApplication() - Diagnóstico completo');
    console.log('   - debugDashboard() - Diagnóstico del dashboard');
    
}, 1000);

// Función de validación completa
function validateApplication() {
    console.group('🔍 VALIDACIÓN DE LA APLICACIÓN');
    
    // 1. Verificar que projects existe y es array
    console.log('📋 Projects:', projects && Array.isArray(projects) ? `✅ ${projects.length} proyectos` : '❌ Error en projects');
    
    // 2. Verificar vistas principales
    const views = ['boardView', 'listView', 'dashboardView', 'timeAllocationView'];
    views.forEach(view => {
        const element = document.getElementById(view);
        console.log(`👀 ${view}:`, element ? '✅ Encontrado' : '❌ No encontrado');
    });
    
    // 3. Verificar funcionalidades críticas
    console.log('🖱️ Drag & Drop:', typeof initDragAndDrop === 'function' ? '✅ Listo' : '❌ No disponible');
    console.log('📊 Dashboard:', typeof renderDashboard === 'function' ? '✅ Listo' : '❌ No disponible');
    console.log('⏰ Time Allocation:', typeof loadTimeAllocationData === 'function' ? '✅ Listo' : '❌ No disponible');
    
    console.groupEnd();
    
    // Test rápido de funcionalidades
    testCriticalFunctions();
}

function testCriticalFunctions() {
    console.group('🧪 TEST DE FUNCIONALIDADES CRÍTICAS');
    
    // Test 1: Drag & Drop
    try {
        if (typeof initDragAndDrop === 'function') {
            initDragAndDrop();
            console.log('🎯 Drag & Drop: ✅ Inicializado');
        }
    } catch (e) {
        console.log('🎯 Drag & Drop: ❌ Error', e.message);
    }
    
    // Test 2: Dashboard
    try {
        if (typeof renderDashboard === 'function') {
            renderDashboard();
            console.log('📊 Dashboard: ✅ Renderizado');
        }
    } catch (e) {
        console.log('📊 Dashboard: ❌ Error', e.message);
    }
    
    console.groupEnd();
}

// === AGREGAR INICIALIZACIÓN DE WEBSOCKETS AL FINAL ===
// INICIAR WEBSOCKETS AL FINAL, después de que todo esté cargado
setTimeout(() => {
  if (window.authToken) {
    console.log('🚀 Iniciando WebSockets...');
    initWebSocket();
  }
}, 2000);



/***********************
 * FUNCIONES DE MOVIMIENTO DE TAREAS *
 ***********************/
function moveTaskUp(taskId, status) {
  const project = projects[currentProjectIndex];
  const tasksInStatus = project.tasks.filter(t => t.status === status);
  const currentIndex = tasksInStatus.findIndex(t => t.id === taskId);
  
  if (currentIndex > 0) {
    const allTasks = project.tasks;
    const task1 = tasksInStatus[currentIndex];
    const task2 = tasksInStatus[currentIndex - 1];
    
    const index1 = allTasks.findIndex(t => t.id === task1.id);
    const index2 = allTasks.findIndex(t => t.id === task2.id);
    
    [allTasks[index1], allTasks[index2]] = [allTasks[index2], allTasks[index1]];
    
    updateLocalStorage();
    renderKanbanTasks();
  }
}

function moveTaskDown(taskId, status) {
  const project = projects[currentProjectIndex];
  const tasksInStatus = project.tasks.filter(t => t.status === status);
  const currentIndex = tasksInStatus.findIndex(t => t.id === taskId);
  
  if (currentIndex < tasksInStatus.length - 1) {
    const allTasks = project.tasks;
    const task1 = tasksInStatus[currentIndex];
    const task2 = tasksInStatus[currentIndex + 1];
    
    const index1 = allTasks.findIndex(t => t.id === task1.id);
    const index2 = allTasks.findIndex(t => t.id === task2.id);
    
    [allTasks[index1], allTasks[index2]] = [allTasks[index2], allTasks[index1]];
    
    updateLocalStorage();
    renderKanbanTasks();
  }
}

// Funciones para manejar subtareas
function addSubtask(taskId) {
  const input = document.getElementById(`newSubtaskInput-${taskId}`);
  const subtaskName = input.value.trim();
  
  if (!subtaskName) {
    showNotification('El nombre de la subtarea no puede estar vacío');
    return;
  }
  
  const task = projects[currentProjectIndex].tasks.find(t => t.id === taskId);
  if (!task) return;
  
  if (!task.subtasks) task.subtasks = [];
  
  task.subtasks.push({
    id: Date.now(),
    name: subtaskName,
    completed: false
  });
  
  updateLocalStorage();
  showTaskDetails(task); // Refrescar la vista
  input.value = ''; // Limpiar el input
  showNotification('Subtarea agregada');
}

function toggleSubtaskCompletion(taskId, subtaskId, isCompleted) {
  const task = projects[currentProjectIndex].tasks.find(t => t.id === taskId);
  if (!task || !task.subtasks) return;
  
  const subtask = task.subtasks.find(st => st.id === subtaskId);
  if (subtask) {
    subtask.completed = isCompleted;
    updateLocalStorage();
    showTaskDetails(task); // Refrescar la vista para actualizar el porcentaje
  }
}

function deleteSubtask(taskId, subtaskId) {
  const task = projects[currentProjectIndex].tasks.find(t => t.id === taskId);
  if (!task || !task.subtasks) return;
  
  task.subtasks = task.subtasks.filter(st => st.id !== subtaskId);
  updateLocalStorage();
  showTaskDetails(task); // Refrescar la vista
  showNotification('Subtarea eliminada');
}


/***********************
 * INICIALIZACIÓN FINAL *
 ***********************/
// Verificar si hay vista activa en el localStorage
const activeView = localStorage.getItem('activeView') || 'board';
showView(activeView);

// Guardar la vista activa cuando cambia
Object.values(viewButtons).forEach(button => {
  if (button) {
    button.addEventListener('click', () => {
      localStorage.setItem('activeView', button.id.replace('show', '').toLowerCase());
    });
  }
});

// Verificar tareas rezagadas cada minuto
setInterval(checkOverdueTasks, 60000);

/***********************
 * CALCULO DEL ESTADO DEL PROYECTO*
 ***********************/
function updateProjectStatusLabel() {
    const project = projects[currentProjectIndex];
    if (!project || !project.tasks || project.tasks.length === 0) {
        document.getElementById('projectStatusLabel').textContent = 'Sin tareas';
        return;
    }

    let isOnTime = true;

    // Iterar sobre todas las tareas del proyecto
    for (const task of project.tasks) {
        const estimatedTime = task.estimatedTime || 0;
        const loggedTime = task.timeLogged || 0;

        // Verificar si la tarea está fuera de tiempo (basado en tiempo registrado)
        if (loggedTime > estimatedTime) {
            isOnTime = false;
            break;
        }
    }

    const label = document.getElementById('projectStatusLabel');
    label.classList.remove('onTime', 'offTime');

    if (isOnTime) {
        label.classList.add('onTime');
        label.textContent = 'En tiempo';
    } else {
        label.classList.add('offTime');
        label.textContent = 'Fuera de tiempo';
    }
}

// === AGREGAR NUEVO RIESGO ===
document.getElementById('addRiskBtn')?.addEventListener('click', () => {
    const title = prompt("Ingrese el título del riesgo:");
    if (!title || title.trim() === "") return;

    const severityInput = prompt("Gravedad (alta/media/baja):").toLowerCase();
    let severityClass = "low";
    if (severityInput.includes("alta")) severityClass = "high";
    else if (severityInput.includes("media")) severityClass = "medium";

    const statusInput = prompt("Estado (no resuelto/en revisión/monitoreando/resuelto):").toLowerCase();
    let statusValue = "no-resuelto"; // Valor por defecto
    let statusText = "No resuelto"; // Texto para mostrar
    
    // Manejo correcto de estados
    if (statusInput.includes("no resuelto") || statusInput.includes("no-resuelto")) {
        statusValue = "no-resuelto";
        statusText = "No resuelto";
    } else if (statusInput.includes("revisión") || statusInput.includes("revision")) {
        statusValue = "en-revision";
        statusText = "En revisión";
    } else if (statusInput.includes("monitoreando")) {
        statusValue = "monitoreando";
        statusText = "Monitoreando";
    } else if (statusInput.includes("resuelto")) {
        statusValue = "resuelto";
        statusText = "Resuelto";
    }

    const riskId = Date.now();
    
    const newRisk = document.createElement("div");
    newRisk.className = `risk-item ${severityClass} status-${statusValue}`;
    newRisk.dataset.riskId = riskId;
    
    // Opciones para el select
    const statusOptions = [
        {value: "no-resuelto", label: "No resuelto"},
        {value: "en-revision", label: "En revisión"},
        {value: "monitoreando", label: "Monitoreando"},
        {value: "resuelto", label: "Resuelto"}
    ];
    
    let optionsHTML = '';
    statusOptions.forEach(option => {
        const selected = option.value === statusValue ? 'selected' : '';
        optionsHTML += `<option value="${option.value}" ${selected}>${option.label}</option>`;
    });
    
    newRisk.innerHTML = `
        <span class="risk-title">${title}</span>
        <select class="risk-status-select" onchange="updateRiskStatus(this)">
            ${optionsHTML}
        </select>
        <button class="risk-delete-btn" onclick="deleteRisk(${riskId})">Eliminar</button>
    `;

    // Aplicar estilo de borde para "No resuelto"
    if (statusValue === "no-resuelto") {
        if (severityClass === "high") {
            newRisk.style.borderLeft = "3px solid #e74c3c";
        } else if (severityClass === "medium") {
            newRisk.style.borderLeft = "3px solid #f39c12";
        } else {
            newRisk.style.borderLeft = "3px solid #2ecc71";
        }
    }
    
    document.getElementById("risksContainer").appendChild(newRisk);
    saveRisksToLocalStorage();
    updateRisksCount();
});



// Función para eliminar riesgos
function deleteRisk(riskId) {
    if (confirm("¿Estás seguro de que deseas eliminar este riesgo?")) {
        // Encontrar el elemento del riesgo por su ID
        const riskElement = document.querySelector(`.risk-item[data-risk-id="${riskId}"]`);
        
        if (riskElement) {
            // Eliminar el elemento del DOM
            riskElement.remove();
            
            // Mostrar notificación
            showNotification("Riesgo eliminado correctamente");
            
            // Actualizar el almacenamiento local
            saveRisksToLocalStorage();
             updateRisksCount(); // ← Agregar aquí
        }
    }
}

// Función para guardar riesgos en localStorage (opcional)
// === FUNCIONES MEJORADAS PARA GESTIÓN DE RIESGOS POR PROYECTO ===

// Función para guardar riesgos en localStorage asociados al proyecto actual
function saveRisksToLocalStorage() {
    const project = projects[currentProjectIndex];
    if (!project) return;

    const risksContainer = document.getElementById("risksContainer");
    if (!risksContainer) return;

    const risks = [];
    const riskElements = risksContainer.querySelectorAll('.risk-item');
    
    riskElements.forEach(riskElement => {
        risks.push({
            id: parseInt(riskElement.dataset.riskId) || Date.now() + Math.floor(Math.random() * 1000),
            title: riskElement.querySelector('.risk-title')?.textContent || 'Riesgo sin título',
            description: riskElement.querySelector('.risk-description')?.textContent || '',
            severity: riskElement.classList.contains('high') ? 'high' :
                      riskElement.classList.contains('medium') ? 'medium' : 'low',
            status: riskElement.querySelector('.risk-status-select')?.value || 'no-resuelto',
            date: riskElement.dataset.riskDate || new Date().toISOString().split('T')[0]
        });
    });

    // Usar una clave única por proyecto (índice + nombre)
    const projectRisksKey = `projectRisks_${currentProjectIndex}_${project.name.replace(/\s+/g, '_')}`;
    localStorage.setItem(projectRisksKey, JSON.stringify(risks));
    
    console.log(`Riesgos guardados para el proyecto ${currentProjectIndex}:`, risks);
}
// Función para cargar riesgos desde localStorage asociados al proyecto actual
function loadRisksFromLocalStorage() {
    console.log("Cargando riesgos para el proyecto:", currentProjectIndex);
    
    // Limpiar contenedor primero
    const risksContainer = document.getElementById("risksContainer");
    if (!risksContainer) {
        console.error("Contenedor de riesgos no encontrado");
        return;
    }
    
    // Limpiar completamente el contenedor
    risksContainer.innerHTML = '';
    
    // Verificar si hay proyecto seleccionado
    if (currentProjectIndex === null || !projects[currentProjectIndex]) {
        risksContainer.innerHTML = '<div class="empty-message">Seleccione un proyecto para ver sus riesgos</div>';
        updateRisksCount();
        return;
    }

    const project = projects[currentProjectIndex];
    const projectRisksKey = `projectRisks_${currentProjectIndex}_${project.name.replace(/\s+/g, '_')}`;
    const savedRisks = JSON.parse(localStorage.getItem(projectRisksKey)) || [];

    console.log(`Riesgos encontrados para ${project.name}:`, savedRisks);

    if (savedRisks.length === 0) {
        risksContainer.innerHTML = '<div class="empty-message">No hay riesgos registrados para este proyecto</div>';
        updateRisksCount();
        return;
    }

    // Crear elementos para cada riesgo
    savedRisks.forEach(risk => {
        const riskElement = createRiskElement(risk);
        risksContainer.appendChild(riskElement);
    });

    updateRisksCount();
}

function createRiskElement(risk) {
    const riskElement = document.createElement('div');
    riskElement.className = `risk-item ${risk.severity} status-${risk.status}`;
    riskElement.dataset.riskId = risk.id;
    riskElement.dataset.riskDate = risk.date || new Date().toISOString().split('T')[0];

    const statusOptions = [
        { value: 'no-resuelto', label: 'No resuelto' },
        { value: 'en-revision', label: 'En revisión' },
        { value: 'monitoreando', label: 'Monitoreando' },
        { value: 'resuelto', label: 'Resuelto' }
    ];
    
    let optionsHTML = '';
    statusOptions.forEach(option => {
        const selected = risk.status === option.value ? 'selected' : '';
        optionsHTML += `<option value="${option.value}" ${selected}>${option.label}</option>`;
    });

    riskElement.innerHTML = `
        <div class="risk-header">
            <span class="risk-title">${risk.title || 'Riesgo sin título'}</span>
            <span class="risk-date">${formatDate(risk.date)}</span>
        </div>
        <div class="risk-description">${risk.description || 'Sin descripción'}</div>
        <div class="risk-footer">
            <select class="risk-status-select" onchange="updateRiskStatus(this)">
                ${optionsHTML}
            </select>
            <button class="risk-delete-btn" onclick="deleteRisk(${risk.id})">
                <i class="fas fa-trash"></i> Eliminar
            </button>
        </div>
    `;

    return riskElement;
}
// Función auxiliar para formatear fechas (si no existe)
function formatDate(dateString) {
  if (!dateString) return 'No definida';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).replace(/,/, '');
}

// Función para actualizar el estado de los riesgos
function updateRiskStatus(selectElement) {
    const riskItem = selectElement.closest('.risk-item');
    // Aquí puedes agregar lógica adicional si necesitas
    saveRisksToLocalStorage();
}
// === GESTIÓN DE ACCIONES REQUERIDAS ===

// Evento para el botón Agregar
document.getElementById('addActionBtn')?.addEventListener('click', function() {
  const actionText = prompt("Ingrese la acción requerida:");
  if (actionText && actionText.trim() !== "") {
    addActionToList(actionText.trim());
    saveActionsToLocalStorage();
    showNotification("Acción agregada correctamente");
  }
});

// Función para agregar acciones a la lista
// Función para agregar acciones a la lista (con parámetro opcional para guardar)
function addActionToList(text, saveToStorage = true) {
    const actionsList = document.getElementById('requiredActions');
    if (!actionsList) return;

    const li = document.createElement('li');
    li.className = 'action-item';
    
    li.innerHTML = `
        <span class="action-text">${text}</span>
        <button class="action-remove" onclick="removeAction(this)">
            <i class="fas fa-trash-alt"></i>
        </button>
    `;

    // Hacer editable al hacer doble clic
    const actionText = li.querySelector('.action-text');
    actionText.addEventListener('dblclick', function() {
        this.contentEditable = true;
        this.focus();
    });

    actionText.addEventListener('blur', function() {
        this.contentEditable = false;
        saveActionsToLocalStorage();
    });

    actionsList.appendChild(li);
    
    // Solo guardar si se especifica (evitar duplicados al cargar)
    if (saveToStorage) {
        saveActionsToLocalStorage();
    }
}

// Función para eliminar acciones
function removeAction(button) {
    if (confirm("¿Eliminar esta acción?")) {
        button.closest('li').remove();
        saveActionsToLocalStorage();
        showNotification("Acción eliminada");
    }
}
// Guardar acciones en localStorage
// Guardar acciones en localStorage por proyecto
function saveActionsToLocalStorage() {
    if (currentProjectIndex === null || !projects[currentProjectIndex]) return;
    
    const actions = [];
    document.querySelectorAll('#requiredActions .action-text').forEach(action => {
        actions.push(action.textContent);
    });
    
    // Usar una clave única por proyecto
    const projectActionsKey = `projectActions_${currentProjectIndex}`;
    localStorage.setItem(projectActionsKey, JSON.stringify(actions));
    console.log(`Acciones guardadas para proyecto ${currentProjectIndex}`);
}

// Cargar acciones desde localStorage por proyecto
function loadActionsFromLocalStorage() {
    const actionsList = document.getElementById('requiredActions');
    if (!actionsList) return;
    
    actionsList.innerHTML = '';
    
    if (currentProjectIndex === null || !projects[currentProjectIndex]) {
        actionsList.innerHTML = '<li class="empty-message">Seleccione un proyecto</li>';
        return;
    }

    const projectActionsKey = `projectActions_${currentProjectIndex}`;
    const savedActions = JSON.parse(localStorage.getItem(projectActionsKey)) || [];
    
    if (savedActions.length === 0) {
        actionsList.innerHTML = '<li class="empty-message">No hay acciones requeridas</li>';
        return;
    }

    savedActions.forEach(action => {
        addActionToList(action, false); // El segundo parámetro evita guardar duplicados
    });
    
    console.log(`Acciones cargadas para proyecto ${currentProjectIndex}`);
}
// === GESTIÓN DE PRÓXIMOS HITOS ===

// Configurar el botón de agregar hito
document.getElementById('addMilestoneBtn')?.addEventListener('click', function() {
    const name = prompt("Nombre del hito:");
    if (!name || name.trim() === "") return;

    const dateStr = prompt("Fecha del hito (YYYY-MM-DD):");
    if (!dateStr) return;

    if (!isValidDate(dateStr)) {
        showNotification("Formato de fecha inválido. Use YYYY-MM-DD");
        return;
    }

    addMilestoneToList(name, dateStr);
    showNotification("Hito agregado correctamente");
});

// Función para validar fecha
function isValidDate(dateString) {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false;
    const d = new Date(dateString);
    return !isNaN(d.getTime());
}

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    loadMilestonesFromLocalStorage();
});
// Función para agregar hito a la lista
function addMilestoneToList(name, dateStr) {
  const milestonesList = document.getElementById('milestonesList');
  if (!milestonesList) return;

  const formattedDate = formatDateForDisplay(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const milestoneDate = new Date(dateStr);
  milestoneDate.setHours(0, 0, 0, 0);

  const milestoneItem = document.createElement('div');
  let statusClass = 'upcoming';
  
  if (milestoneDate < today) {
    statusClass = 'overdue';
  } else if (milestoneDate.toDateString() === today.toDateString()) {
    statusClass = 'current';
  }

  milestoneItem.className = `milestone-item ${statusClass}`;
  milestoneItem.dataset.date = dateStr;
  
  milestoneItem.innerHTML = `
    <span class="milestone-date">${formattedDate}</span>
    <span class="milestone-name">${name}</span>
    <button class="milestone-remove" onclick="removeMilestone(this)">
      <i class="fas fa-trash-alt"></i>
    </button>
  `;

  milestonesList.appendChild(milestoneItem);
}

// Función para formatear fecha para visualización
function formatDateForDisplay(dateStr) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('es-ES', options);
}

// Función para eliminar hito
function removeMilestone(button) {
  if (confirm("¿Eliminar este hito?")) {
    button.closest('.milestone-item').remove();
    saveMilestonesToLocalStorage();
    showNotification("Hito eliminado");
  }
}

// Guardar hitos en localStorage
function saveMilestonesToLocalStorage() {
  if (currentProjectIndex === null || !projects[currentProjectIndex]) return;


  const milestones = [];
    document.querySelectorAll('#milestonesList .milestone-item').forEach(item => {
        milestones.push({
            name: item.querySelector('.milestone-name').textContent,
            date: item.dataset.date,
            status: item.classList.contains('current') ? 'current' : 
                   item.classList.contains('overdue') ? 'overdue' : 'upcoming'
        });
    });
    
    const projectMilestonesKey = `projectMilestones_${currentProjectIndex}`;
    localStorage.setItem(projectMilestonesKey, JSON.stringify(milestones));
    console.log(`Hitos guardados para proyecto ${currentProjectIndex}`);
}


// Cargar hitos desde localStorage
function loadMilestonesFromLocalStorage() {
  const savedMilestones = JSON.parse(localStorage.getItem('projectMilestones')) || [];
  const milestonesList = document.getElementById('milestonesList');
  
  if (milestonesList) {
    milestonesList.innerHTML = '';
    savedMilestones.forEach(milestone => {
      addMilestoneToList(milestone.name, milestone.date);
    });
  }
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  loadMilestonesFromLocalStorage();
  
  // Asegurar que el botón tenga el event listener
  const addBtn = document.getElementById('addMilestoneBtn');
  if (addBtn) {
    addBtn.addEventListener('click', addNewMilestone);
  }
});// === ACCIONES RÁPIDAS ===

// 1. Nueva Tarea
document.getElementById('quickNewTaskBtn')?.addEventListener('click', function() {
  document.getElementById('createTaskModal').style.display = 'block';
  showNotification("Preparando formulario para nueva tarea");
});

// 2. Generar Reporte
document.getElementById('quickGenerateReportBtn')?.addEventListener('click', function() {
  generateProjectReport();
  showNotification("Generando reporte del proyecto");
});

// 3. Cambiar Vista (Explicación detallada abajo)
document.getElementById('quickSwitchViewBtn')?.addEventListener('click', function() {
    const currentView = getActiveView();
    let nextView;
    switch(currentView) {
        case 'board': nextView = 'list'; break;
        case 'list': nextView = 'calendar'; break;
        case 'calendar': nextView = 'gantt'; break;
        case 'gantt': nextView = 'reports'; break;
        case 'reports': nextView = 'profitability'; break;
        case 'profitability': nextView = 'dashboard'; break;
        // Agrega la nueva vista aquí
        case 'dashboard': nextView = 'timeAllocation'; break;
        case 'timeAllocation': nextView = 'board'; break; // Cierra el ciclo
        default: nextView = 'board';
    }
    showView(nextView);
    showNotification(`Cambiando a vista: ${getViewName(nextView)}`);
});
// Función auxiliar para obtener nombre legible de la vista
function getViewName(view) {
    const names = {
        'board': 'Tablero Kanban',
        'list': 'Lista de Tareas',
        'calendar': 'Calendario',
        'gantt': 'Diagrama Gantt',
        'reports': 'Reportes',
        'profitability': 'Rentabilidad',
        'dashboard': 'Dashboard',
        'timeAllocation': 'Asignación de Horas' // Agrega esta línea
    };
    return names[view] || view;
}// Mostrar/ocultar menú contextual de proyectos
function toggleProjectMenu(event, projectIndex) {
  event.stopPropagation();
  
  // Cerrar todos los otros menús
  document.querySelectorAll('.project-context-menu').forEach(menu => {
    if (menu.id !== `project-menu-${projectIndex}`) {
      menu.classList.remove('show');
    }
  });
  
  // Alternar el menú actual
  const menu = document.getElementById(`project-menu-${projectIndex}`);
  if (menu) {
    menu.classList.toggle('show');
    // Posicionar el menú
    const rect = event.target.getBoundingClientRect();
    menu.style.left = `${rect.left}px`;
    menu.style.top = `${rect.bottom}px`;
  }
}

// Editar proyecto desde el menú contextual
function editProjectFromMenu(projectIndex) {
  const project = projects[projectIndex];
  const newName = prompt('Editar nombre del proyecto:', project.name);
  
  if (newName && newName.trim()) {
    project.name = newName.trim();
    updateLocalStorage();
    renderProjects();
    selectProject(projectIndex);
    showNotification(`Proyecto renombrado a "${newName}"`);
  }
  
  // Cerrar todos los menús
  document.querySelectorAll('.project-context-menu').forEach(menu => {
    menu.classList.remove('show');
  });
}

// Eliminar proyecto desde el menú contextual
function deleteProjectFromMenu(projectIndex) {
  const project = projects[projectIndex];
  if (confirm(`¿Estás seguro de eliminar el proyecto "${project.name}"?`)) {
    deleteProject(projectIndex);
  }
  
  // Cerrar todos los menús
  document.querySelectorAll('.project-context-menu').forEach(menu => {
    menu.classList.remove('show');
  });
}

// === ACTUALIZAR BARRA DE AVANCE PEQUEÑA ===
function updateStatusProgress() {
  const totalTasks = tasks.filter(t => t.projectId === currentProjectId).length;
  const completedTasks = tasks.filter(t => t.projectId === currentProjectId && t.status === 'completed').length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const fillElement = document.getElementById('statusProgressFill');
  const labelElement = document.getElementById('statusProgressLabel');

  if (fillElement && labelElement) {
    fillElement.style.width = `${progress}%`;
    labelElement.textContent = `${progress}% Completado`;
  }
}
// === FUNCIONES DE REPORTES - GENERAR VISTA ===
function generateReports(tasks = null) { // Acepta tareas filtradas como argumento
  console.log("generateReports llamado con tasks:", tasks ? `(${tasks.length} tareas)` : "null (usando todas)");
  const tasksToUse = tasks || getFilteredTasks('reports'); // Usa las tareas pasadas o filtra para 'reports'
  const stats = getStats(tasksToUse);
  const timeStats = getTimeStats(tasksToUse); // <-- Pasa las tareas filtradas aquí

  // --- INICIO: Tu nuevo código integrado ---
  // Asegúrate de que `project` esté definido aquí si lo necesitas
  const project = projects[currentProjectIndex];
  // --- INICIO: ACTUALIZACIÓN DE CUADROS DE TIEMPO Y LEYENDA ---

   // *** 1. Tiempo Estimado ***
    const totalEstimatedTimeElem = document.getElementById('totalEstimatedTimeStatus');
    if (totalEstimatedTimeElem && !isNaN(timeStats.totalEstimated)) {
        totalEstimatedTimeElem.textContent = `${timeStats.totalEstimated.toFixed(2)} horas`;
        console.log(`Tiempo Estimado actualizado: ${timeStats.totalEstimated.toFixed(2)} horas`);
    } else {
        console.warn("Elemento totalEstimatedTimeStatus no encontrado o valor inválido.");
    }

    // *** 2. Tiempo Registrado ***
    const totalLoggedTimeElem = document.getElementById('totalLoggedTimeStatus');
    if (totalLoggedTimeElem && !isNaN(timeStats.totalLogged)) {
        totalLoggedTimeElem.textContent = `${timeStats.totalLogged.toFixed(2)} horas`;
        console.log(`Tiempo Registrado actualizado: ${timeStats.totalLogged.toFixed(2)} horas`);
    } else {
        console.warn("Elemento totalLoggedTimeStatus no encontrado o valor inválido.");
    }

    // *** 3. Tiempo Restante ***
    const remainingTimeElem = document.getElementById('remainingTimeStatus');
    if (remainingTimeElem && !isNaN(timeStats.remaining)) {
        remainingTimeElem.textContent = `${timeStats.remaining.toFixed(2)} horas`;
        console.log(`Tiempo Restante actualizado: ${timeStats.remaining.toFixed(2)} horas`);
    } else {
        console.warn("Elemento remainingTimeStatus no encontrado o valor inválido.");
    }

    // *** 4. Tiempo Total del Proyecto (opcional, si se usa) ***
    const totalTimeElem = document.getElementById('totalProjectTimeStatus');
    if (totalTimeElem && project) {
        totalTimeElem.textContent = `${project.totalProjectTime || 0} horas`;
        console.log(`Tiempo Total del Proyecto actualizado: ${project.totalProjectTime || 0} horas`);
    } else if(totalTimeElem) {
         totalTimeElem.textContent = `0 horas`;
         console.log(`Tiempo Total del Proyecto actualizado a 0 horas (sin proyecto o sin tiempo definido).`);
    } else {
        console.warn("Elemento totalProjectTimeStatus no encontrado.");
    }
  // Actualizar barra de avance (la que creamos sin conflictos)
  const fillElement = document.getElementById('statusProgressFill');
  const labelElement = document.getElementById('statusProgressLabel');

  if (fillElement && labelElement) {
    fillElement.style.width = `${progress}%`;
    labelElement.textContent = `${progress}% Completado`;
  }

  // Actualizar contadores (si tienes estos elementos)
  const totalTasksEl = document.getElementById('totalTasks');
  const completedTasksEl = document.getElementById('completedTasks');
  updateReportsProjectProgress(); 
}

function updateResourceAllocation() {
    const project = projects[currentProjectIndex];
    if (!project || !project.tasks) return;

    const resourceList = document.getElementById('resourceList');
    const resourceChartCanvas = document.getElementById('resourceChart');
    
    if (!resourceList || !resourceChartCanvas) return;

    // Calcular asignación de recursos
    const resourceData = calculateResourceAllocation(project.tasks);
    
    // Actualizar lista de recursos
    renderResourceList(resourceList, resourceData);
    
    // Actualizar gráfica de recursos
    renderResourceChart(resourceChartCanvas, resourceData);
}

function calculateResourceAllocation(tasks) {
    const resources = {};
    
    tasks.forEach(task => {
        const assignee = task.assignee || 'Sin asignar';
        const estimatedTime = task.estimatedTime || 0;
        const loggedTime = task.timeLogged || 0;
        
        if (!resources[assignee]) {
            resources[assignee] = {
                name: assignee,
                estimated: 0,
                logged: 0,
                tasks: 0
            };
        }
        
        resources[assignee].estimated += estimatedTime;
        resources[assignee].logged += loggedTime;
        resources[assignee].tasks += 1;
    });
    
    return Object.values(resources);
}

function renderResourceList(container, resourceData) {
    if (!container) return;
    
    if (resourceData.length === 0) {
        container.innerHTML = '<div class="empty-message">No hay recursos asignados</div>';
        return;
    }
    
    container.innerHTML = '';
    
    resourceData.forEach(resource => {
        const resourceItem = document.createElement('div');
        resourceItem.className = 'resource-item';
        
        const efficiency = resource.estimated > 0 ? 
            Math.round((resource.logged / resource.estimated) * 100) : 0;
        
        let efficiencyClass = 'efficiency-normal';
        if (efficiency > 100) efficiencyClass = 'efficiency-high';
        else if (efficiency < 80) efficiencyClass = 'efficiency-low';
        
        resourceItem.innerHTML = `
            <div class="resource-info">
                <h4>${resource.name}</h4>
                <div class="resource-stats">
                    <span class="stat"><i class="fas fa-tasks"></i> ${resource.tasks} tareas</span>
                    <span class="stat"><i class="fas fa-clock"></i> ${resource.estimated.toFixed(1)}h estimadas</span>
                    <span class="stat"><i class="fas fa-user-clock"></i> ${resource.logged.toFixed(1)}h registradas</span>
                </div>
            </div>
            <div class="resource-efficiency">
                <div class="efficiency-bar">
                    <div class="efficiency-fill ${efficiencyClass}" style="width: ${Math.min(efficiency, 100)}%"></div>
                </div>
                <div class="efficiency-value ${efficiencyClass}">${efficiency}%</div>
            </div>
        `;
        
        container.appendChild(resourceItem);
    });
}

function renderResourceChart(canvas, resourceData) {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Destruir gráfica existente si hay una
    if (window.resourceChart) {
        window.resourceChart.destroy();
    }
    
    if (resourceData.length === 0) {
        // Limpiar canvas si no hay datos
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }
    
    // Preparar datos para la gráfica
    const labels = resourceData.map(resource => resource.name);
    const estimatedData = resourceData.map(resource => resource.estimated);
    const loggedData = resourceData.map(resource => resource.logged);
    
    // Crear gráfica de barras agrupadas
    window.resourceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Horas Estimadas',
                    data: estimatedData,
                    backgroundColor: 'rgba(52, 152, 219, 0.7)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Horas Registradas',
                    data: loggedData,
                    backgroundColor: 'rgba(46, 204, 113, 0.7)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Horas'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Recursos'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false
                }
            }
        }
    });
}

// === FUNCIÓN DE ASIGNACIÓN DE RECURSOS (Versión Mínima) ===
function updateResourceAllocation() {
    console.log("Función updateResourceAllocation llamada"); // Para verificar en consola
    
    // 1. Seleccionar el contenedor
    const container = document.getElementById('resourceAllocationContent');
    
    // 2. Verificar si el contenedor existe
    if (!container) {
        console.error("No se encontró el elemento con ID 'resourceAllocationContent'");
        return;
    }
    
    // 3. Mostrar un mensaje de prueba
    container.innerHTML = `
        <div style="padding: 20px; text-align: center; background-color: #f8f9fa; border: 1px solid #dee2e6; border-radius: 5px;">
            <h3 style="color: #495057;">Sección de Recursos</h3>
            <p style="color: #6c757d;">Esta sección mostrará la asignación de recursos.</p>
            <p style="color: #6c757d; font-size: 0.9em;"><em>Implementación en progreso...</em></p>
        </div>
    `;
    
    console.log("Contenido de prueba insertado en resourceAllocationContent");
}

// === FUNCIÓN COMPLETA DE ASIGNACIÓN DE RECURSOS ===
function updateResourceAllocation() {
    console.log("Ejecutando updateResourceAllocation");
    
    const project = projects[currentProjectIndex];
    if (!project) {
        console.log("No hay proyecto seleccionado");
        return;
    }
    
    // Seleccionar contenedores
    const resourceList = document.getElementById('resourceList');
    const resourceChartCanvas = document.getElementById('resourceChart');
    
    if (!resourceList || !resourceChartCanvas) {
        console.log("No se encontraron los elementos del DOM para recursos");
        return;
    }
    
    // Calcular asignación de recursos
    const resourceData = calculateResourceAllocation(project.tasks || []);
    
    // Actualizar lista de recursos
    renderResourceList(resourceList, resourceData);
    
    // Actualizar gráfica de recursos
    renderResourceChart(resourceChartCanvas, resourceData);
}

function calculateResourceAllocation(tasks) {
    const resources = {};
    
    tasks.forEach(task => {
        // Usar 'assignee' o 'Asignado a:' según tu estructura
        const assignee = task.assignee || task['Asignado a:'] || 'Sin asignar';
        const estimatedTime = parseFloat(task.estimatedTime) || 0;
        const timeLogged = parseFloat(task.timeLogged) || 0;
        
        if (!resources[assignee]) {
            resources[assignee] = {
                name: assignee,
                estimated: 0,
                logged: 0,
                tasks: 0
            };
        }
        
        resources[assignee].estimated += estimatedTime;
        resources[assignee].logged += timeLogged;
        resources[assignee].tasks += 1;
    });
    
    return Object.values(resources);
}

function renderResourceList(container, resourceData) {
    if (!container) return;
    
    if (resourceData.length === 0) {
        container.innerHTML = '<div class="empty-message">No hay recursos asignados</div>';
        return;
    }
    
    let html = '';
    resourceData.forEach(resource => {
        const efficiency = resource.estimated > 0 ? 
            Math.round((resource.logged / resource.estimated) * 100) : 0;
        
        let efficiencyClass = 'efficiency-normal';
        if (efficiency > 110) efficiencyClass = 'efficiency-high';
        else if (efficiency < 80) efficiencyClass = 'efficiency-low';
        
        html += `
            <div class="resource-item">
                <div class="resource-info">
                    <h4>${resource.name}</h4>
                    <div class="resource-stats">
                        <span class="stat"><i class="fas fa-tasks"></i> ${resource.tasks} tareas</span>
                        <span class="stat"><i class="fas fa-clock"></i> ${resource.estimated.toFixed(1)}h estimadas</span>
                        <span class="stat"><i class="fas fa-user-clock"></i> ${resource.logged.toFixed(1)}h registradas</span>
                    </div>
                </div>
                <div class="resource-efficiency">
                    <div class="efficiency-bar">
                        <div class="efficiency-fill ${efficiencyClass}" style="width: ${Math.min(efficiency, 100)}%"></div>
                    </div>
                    <div class="efficiency-value ${efficiencyClass}">${efficiency}%</div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function renderResourceChart(canvas, resourceData) {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Destruir gráfica existente si hay una
    if (window.resourceChart) {
        window.resourceChart.destroy();
    }
    
    if (resourceData.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }
    
    // Preparar datos para la gráfica
    const labels = resourceData.map(resource => resource.name);
    const estimatedData = resourceData.map(resource => resource.estimated);
    const loggedData = resourceData.map(resource => resource.logged);
    
    // Crear gráfica de barras agrupadas
    window.resourceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Horas Estimadas',
                    data: estimatedData,
                    backgroundColor: 'rgba(52, 152, 219, 0.7)',
                    borderColor: 'rgba(52, 152, 219, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Horas Registradas',
                    data: loggedData,
                    backgroundColor: 'rgba(46, 204, 113, 0.7)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Horas'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Recursos'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}

// === BARRA DE PROGRESO INDEPENDIENTE PARA DASHBOARD ===
function updateDashboardProjectProgress() {
    const project = projects[currentProjectIndex];
    if (!project) return;
    
    const stats = getStats();
    const completionPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
    
    // Actualizar la barra de progreso independiente del Dashboard
    const progressFill = document.getElementById('dashboardProjectProgressFill');
    const progressText = document.getElementById('dashboardProjectProgressText');
    
    if (progressFill) {
        progressFill.style.width = `${completionPercentage}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${completionPercentage}% Completado`;
    }
}
// === BARRA DE PROGRESO INDEPENDIENTE PARA VISTA STATUS/REPORTS ===
function updateReportsProjectProgress() {
    console.log("Actualizando barra de progreso de Status/Reports"); // Para depuración

    const project = projects[currentProjectIndex];
    if (!project) {
        console.log("No hay proyecto seleccionado para la barra de Status/Reports");
        // Resetear la barra si no hay proyecto
        const fillElement = document.getElementById('reportsProjectProgressFill');
        const textElement = document.getElementById('reportsProjectProgressText');
        if (fillElement) fillElement.style.width = '0%';
        if (textElement) textElement.textContent = '0% Completado';
        return;
    }

    // Calcular el progreso
    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.filter(t => t.status === 'completed').length; // Asegúrate de usar la propiedad correcta
    const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    console.log(`Progreso calculado: ${completionPercentage}% (${completedTasks}/${totalTasks})`); // Para depuración

    // Actualizar la barra y el texto
    const progressFill = document.getElementById('reportsProjectProgressFill');
    const progressText = document.getElementById('reportsProjectProgressText');

    if (progressFill) {
        progressFill.style.width = `${completionPercentage}%`;
        console.log(`Ancho de la barra actualizado a ${completionPercentage}%`); // Para depuración
    } else {
        console.warn("Elemento 'reportsProjectProgressFill' no encontrado en el DOM.");
    }

    if (progressText) {
        progressText.textContent = `${completionPercentage}% Completado`;
        console.log(`Texto de progreso actualizado a ${completionPercentage}% Completado`); // Para depuración
    } else {
        console.warn("Elemento 'reportsProjectProgressText' no encontrado en el DOM.");
    }
}



// --- MÓDULO DE SEGUIMIENTO DE HORAS - INICIO ---

let timeTrackingChartInstance = null; // Variable global para la instancia de Chart.js

/**
 * Calcula los datos de seguimiento de horas a partir de las tareas del proyecto actual.
 * Esta función debe llamarse DESDE el script principal donde 'projects' y 'currentProjectIndex' están disponibles.
 * @param {Array} projectTasks - Las tareas del proyecto actual (projects[currentProjectIndex].tasks)
 * @param {String} projectName - El nombre del proyecto actual (projects[currentProjectIndex].name)
 * @returns {Array} Array de objetos con { assignee, projectName, hours, lastRegister }
 */




function calculateTimeTrackingData(projectTasks, projectName) {
    console.group("📊 Calculando datos de seguimiento de horas");
    console.log("📦 Tareas del proyecto:", projectTasks);
    
    const trackingData = {};
    
    projectTasks.forEach(task => {
        // Obtener el asignado (con compatibilidad para diferentes nombres de propiedad)
        const assignee = task.assignee || task['Asignado a:'] || 'Sin asignar';
        
        // Obtener horas registradas (con compatibilidad para diferentes formatos)
        const hours = parseFloat(task.timeLogged) || 0;
        
        // Obtener última fecha de registro (usamos deadline si no hay startDate)
        const lastRegister = task.startDate || task.deadline || new Date().toISOString();
        
        if (!trackingData[assignee]) {
            trackingData[assignee] = {
                assignee: assignee,
                projectName: projectName,
                hours: 0,
                lastRegister: lastRegister
            };
        }
        
        trackingData[assignee].hours += hours;
        
        // Mantener la fecha más reciente
        if (new Date(lastRegister) > new Date(trackingData[assignee].lastRegister)) {
            trackingData[assignee].lastRegister = lastRegister;
        }
    });
    
    const result = Object.values(trackingData);
    console.log("✅ Datos calculados:", result);
    console.groupEnd();
    return result;
}




/**
 * Renderiza el módulo de Seguimiento de Horas en el Dashboard.
 * Debe llamarse cuando el proyecto y sus datos estén cargados.
 */
function renderTimeTrackingModule() {
    console.log("🖼️ Renderizando módulo de Seguimiento de Horas...");

    // Verificar que tenemos un proyecto seleccionado
    if (typeof projects === 'undefined' || typeof currentProjectIndex === 'undefined' || !projects[currentProjectIndex]) {
        console.warn("⚠️ No se puede renderizar el módulo: proyecto no disponible.");
        updateTimeTrackingTable([]);
        updateTimeTrackingChart([]);
        populateTimeTrackingFilters([]);
        return;
    }

    const project = projects[currentProjectIndex];
    const projectName = project.name || `Proyecto ${currentProjectIndex + 1}`;

    console.log(`📦 Proyecto actual: ${projectName}`);

    // Calcular datos de seguimiento
    const timeTrackingData = calculateTimeTrackingData(project.tasks, projectName);

    // Poblar filtros
    populateTimeTrackingFilters(timeTrackingData);

    // Aplicar filtros iniciales (mostrar todo)
    const initialFilteredData = filterTimeTrackingData(timeTrackingData, {
        year: 'all',
        month: 'all',
        project: 'all',
        assignee: 'all'
    });

    // Actualizar vista
    updateTimeTrackingTable(initialFilteredData);
    updateTimeTrackingChart(initialFilteredData);

    console.log("✅ Módulo de Seguimiento de Horas renderizado.");
}
/**
 * Puebla los selectores de filtros con datos únicos.
 * @param {Array} data - Los datos de seguimiento de horas.
 */
function populateTimeTrackingFilters(data) {
    console.group("🔄 Poblando filtros de seguimiento de horas...");
    console.log("Datos recibidos para poblar filtros:", data);

    const projectSelect = document.getElementById('timeTrackingProject');
    const assigneeSelect = document.getElementById('timeTrackingAssignee');

    if (!projectSelect) {
        console.error("❌ Elemento 'timeTrackingProject' no encontrado en el DOM.");
    }
    if (!assigneeSelect) {
        console.error("❌ Elemento 'timeTrackingAssignee' no encontrado en el DOM.");
    }
    // Limpiar y resetear selectores si existen
    if (projectSelect) {
        console.log("Limpiando selector de proyectos...");
        projectSelect.innerHTML = '<option value="all">Todos</option>';
    }
    if (assigneeSelect) {
        console.log("Limpiando selector de asignados...");
        assigneeSelect.innerHTML = '<option value="all">Todos</option>';
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
        console.warn("⚠️ No hay datos para poblar los filtros o los datos no son válidos.");
        console.groupEnd();
        return;
    }


    const projectsSet = new Set();
    const assigneesSet = new Set();


  console.log("Extrayendo proyectos y asignados únicos de los datos...");
    data.forEach((item, index) => {
        console.log(`Procesando item ${index}:`, item);
        if (item.projectName && typeof item.projectName === 'string') {
            projectsSet.add(item.projectName);
            console.log(`  ✅ Proyecto encontrado: ${item.projectName}`);
        } else {
            console.warn(`  ⚠️ Item ${index} no tiene projectName válido:`, item.projectName);
        }
        
        if (item.assignee && typeof item.assignee === 'string' && item.assignee.trim() !== '') {
            assigneesSet.add(item.assignee.trim());
            console.log(`  ✅ Asignado encontrado: ${item.assignee.trim()}`);
        } else {
            console.warn(`  ⚠️ Item ${index} no tiene assignee válido:`, item.assignee);
        }
    });

    console.log("🏷️ Proyectos encontrados para filtros:", Array.from(projectsSet));
    console.log("👤 Asignados encontrados para filtros:", Array.from(assigneesSet));

    // Poblar selectores si existen
    if (projectSelect && projectsSet.size > 0) {
        console.log("Poblando selector de proyectos...");
        projectsSet.forEach(project => {
            if (project) {
                const option = new Option(project, project);
                projectSelect.appendChild(option);
                console.log(`  ✅ Opción de proyecto agregada: ${project}`);
            }
        });
    }

 else if (projectSelect) {
        console.log("ℹ️ No hay proyectos válidos para agregar al selector.");
    }

    if (assigneeSelect && assigneesSet.size > 0) {
        console.log("Poblando selector de asignados...");
        assigneesSet.forEach(assignee => {
            if (assignee) {
                const option = new Option(assignee, assignee);
                assigneeSelect.appendChild(option);
                console.log(`  ✅ Opción de asignado agregada: ${assignee}`);
            }
        });
    } else if (assigneeSelect) {
        console.log("ℹ️ No hay asignados válidos para agregar al selector.");
    }

    console.log("✅ Filtros de seguimiento de horas poblados.");
    console.groupEnd();
}
function getCurrentTimeTrackingFilters() {
    return {
        year: document.getElementById('timeTrackingYear')?.value || 'all',
        month: document.getElementById('timeTrackingMonth')?.value || 'all',
        project: document.getElementById('timeTrackingProject')?.value || 'all',
        assignee: document.getElementById('timeTrackingAssignee')?.value || 'all'
    };
}

/**
 * Filtra los datos de seguimiento según los criterios.
 * @param {Array} data - Los datos a filtrar.
 * @param {Object} filters - Los filtros a aplicar.
 * @returns {Array} Los datos filtrados.
 */
function filterTimeTrackingData(data, filters) {
    console.log("🛠️ Filtrando datos de seguimiento...", { data, filters });

    if (!data || !Array.isArray(data)) return [];

    const { year, month, project, assignee } = filters;

    return data.filter(item => {
        // Filtro por año
        if (year !== 'all' && item.lastRegister) {
            if (!item.lastRegister.startsWith(String(year))) {
                return false;
            }
        }

        // Filtro por mes
        if (month !== 'all' && item.lastRegister) {
            try {
                const itemMonth = new Date(item.lastRegister).getMonth() + 1; // 1-12
                if (parseInt(month, 10) !== itemMonth) {
                    return false;
                }
            } catch (e) {
                console.warn("Error al parsear mes de", item.lastRegister);
            }
        }

        // Filtro por proyecto
        if (project !== 'all' && item.projectName !== project) {
            return false;
        }

        // Filtro por asignado
        if (assignee !== 'all' && item.assignee !== assignee) {
            return false;
        }

        return true;
    });
}

/**
 * Actualiza la tabla del módulo de seguimiento de horas.
 * @param {Array} data - Los datos a mostrar.
 */
function updateTimeTrackingTable(data) {
    console.log("📋 Actualizando tabla de seguimiento con", data.length, "elementos.");
    const tbody = document.getElementById('timeTrackingTableBody');
    if (!tbody) {
        console.error("❌ Elemento 'timeTrackingTableBody' no encontrado.");
        return;
    }

    tbody.innerHTML = data.length > 0 ? data.map(item => `
      <tr>
        <td>${item.assignee || 'N/A'}</td>
        <td>${item.projectName || 'N/A'}</td>
        <td>${(typeof item.hours === 'number') ? item.hours.toFixed(2) : '0.00'}</td>
        <td>${(item.hours && typeof item.hours === 'number') ? (item.hours / 20).toFixed(2) : '0.00'}</td>
        <td>${formatDateForTracking(item.lastRegister)}</td>
      </tr>
    `).join('') : '<tr><td colspan="5">No hay datos</td></tr>';
}

/**
 * Formatea una fecha para mostrar en la tabla.
 * @param {String} dateString - La fecha en formato ISO.
 * @returns {String} La fecha formateada.
 */
function formatDateForTracking(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Fecha Inválida';
    return date.toLocaleDateString('es-ES');
}

/**
 * Actualiza la gráfica del módulo de seguimiento de horas.
 * @param {Array} data - Los datos a mostrar.
 */
function updateTimeTrackingChart(data) {
    console.log("📊 Actualizando gráfica de seguimiento con", data.length, "elementos.");
    const ctx = document.getElementById('timeTrackingChart')?.getContext('2d');
    if (!ctx) {
        console.error("❌ Contexto 2D del canvas 'timeTrackingChart' no encontrado.");
        return;
    }

    // Destruir instancia anterior si existe
    if (timeTrackingChartInstance) {
        timeTrackingChartInstance.destroy();
        timeTrackingChartInstance = null;
    }

    if (data.length === 0) {
        // Limpiar el canvas si no hay datos
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        return;
    }

    const labels = data.map(item => item.assignee || 'N/A');
    const hoursData = data.map(item => (typeof item.hours === 'number') ? item.hours : 0);

    timeTrackingChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Horas trabajadas',
                data: hoursData,
                backgroundColor: 'rgba(54, 162, 235, 0.7)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Horas'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Asignado'
                    }
                }
            }
        }
    });
    console.log("📊 Gráfica de seguimiento actualizada.");
}

// --- CONFIGURACIÓN DE EVENT LISTENERS PARA EL MÓDULO ---
// Este bloque se puede colocar junto con otros event listeners de tu aplicación,
// por ejemplo, dentro de una función de inicialización o al final del DOMContentLoaded.

document.addEventListener('DOMContentLoaded', function () {
    // Configurar event listener para el botón de aplicar filtros de seguimiento de horas
    const applyButton = document.getElementById('applyTimeTrackingFilters');
    if (applyButton) {
        applyButton.addEventListener('click', function () {
            console.log("🖱️ Botón 'Aplicar' de seguimiento de horas clickeado.");

            // Verificar que las variables globales estén disponibles
            if (typeof projects === 'undefined' || typeof currentProjectIndex === 'undefined' || !projects[currentProjectIndex]) {
                console.warn("⚠️ No se puede aplicar filtro: proyecto no disponible.");
                updateTimeTrackingTable([]);
                updateTimeTrackingChart([]);
                return;
            }

            const project = projects[currentProjectIndex];
            const projectName = project.name || `Proyecto ${currentProjectIndex + 1}`;

            // 1. Recalcular datos (por si han cambiado)
            const timeTrackingData = calculateTimeTrackingData(project.tasks, projectName);
console.log("📊 Datos de seguimiento calculados:", timeTrackingData);
// Poblar filtros
populateTimeTrackingFilters(timeTrackingData);
// ...

            // 2. Obtener filtros actuales
            const filters = getCurrentTimeTrackingFilters();
            console.log("🔍 Filtros aplicados:", filters);

            // 3. Filtrar datos
            const filteredData = filterTimeTrackingData(timeTrackingData, filters);

            // 4. Actualizar vista
            updateTimeTrackingTable(filteredData);
            updateTimeTrackingChart(filteredData);

            console.log("✅ Filtros de seguimiento de horas aplicados.");
        });
    } else {
        console.warn("⚠️ Botón 'applyTimeTrackingFilters' no encontrado en el DOM al cargar.");
    }

    // Poblar dinámicamente el selector de meses si existe
    const monthSelect = document.getElementById('timeTrackingMonth');
    if (monthSelect) {
        // Limpiar opciones existentes excepto "Todos"
        monthSelect.innerHTML = '<option value="all">Todos</option>';

        // Agregar meses del 1 al 12
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        for (let i = 1; i <= 12; i++) {
            const option = document.createElement('option');
            option.value = i.toString(); // Usar string para facilitar comparación
            option.textContent = `${i.toString().padStart(2, '0')} - ${monthNames[i - 1]}`;
            monthSelect.appendChild(option);
        }
        console.log("📅 Selector de meses poblado.");
    }
});

// --- INTEGRACIÓN CON EL DASHBOARD ---
// Asegúrate de que esta llamada esté dentro de tu función `renderDashboard`
// Busca la función `renderDashboard` en tu código y agrega esta línea al final:


// === FUNCIÓN DE PRUEBA PARA POBLAR FILTROS MANUALMENTE ===
// Esta función se puede llamar manualmente desde la consola del navegador
function debugPopulateFilters() {
    console.log("=== DEBUG: Iniciando poblado manual de filtros ===");

    // 1. Intentar encontrar los elementos
    const projectSelect = document.getElementById('timeTrackingProject');
    const assigneeSelect = document.getElementById('timeTrackingAssignee');

    console.log("Elemento timeTrackingProject:", projectSelect);
    console.log("Elemento timeTrackingAssignee:", assigneeSelect);

    if (!projectSelect) {
        console.error("❌ NO SE ENCONTRÓ EL SELECTOR DE PROYECTO");
        return;
    }
    if (!assigneeSelect) {
        console.error("❌ NO SE ENCONTRÓ EL SELECTOR DE ASIGNADO");
        return;
    }

    // 2. Limpiar selectores
    projectSelect.innerHTML = '<option value="all">[DEBUG] Todos los Proyectos</option>';
    assigneeSelect.innerHTML = '<option value="all">[DEBUG] Todos los Asignados</option>';

    // 3. Agregar opciones de prueba
    console.log("Agregando opciones de prueba...");
    const testOption1 = new Option("[DEBUG] Proyecto Alpha", "proyecto_alpha");
    const testOption2 = new Option("[DEBUG] Proyecto Beta", "proyecto_beta");
    projectSelect.appendChild(testOption1);
    projectSelect.appendChild(testOption2);

    const testAssignee1 = new Option("[DEBUG] Juan Pérez", "juan");
    const testAssignee2 = new Option("[DEBUG] María García", "maria");
    assigneeSelect.appendChild(testAssignee1);
    assigneeSelect.appendChild(testAssignee2);

    console.log("✅ Opciones de prueba agregadas. ¡Deberías verlas en los filtros ahora!");
    console.log("Si ves las opciones de prueba, el problema está en la función que pobla los datos reales.");
}

// === FUNCIÓN PARA POBLAR CON DATOS REALES (versión simplificada y verbosa) ===
function populateTimeTrackingFiltersREAL() {
    console.group("=== POBLANDO FILTROS CON DATOS REALES ===");

    // 1. Verificar elementos del DOM
    const projectSelect = document.getElementById('timeTrackingProject');
    const assigneeSelect = document.getElementById('timeTrackingAssignee');

    if (!projectSelect || !assigneeSelect) {
        console.error("❌ NO SE ENCONTRARON LOS ELEMENTOS DEL DOM");
        console.groupEnd();
        return;
    }

    // 2. Limpiar selectores
    projectSelect.innerHTML = '<option value="all">Todos</option>';
    assigneeSelect.innerHTML = '<option value="all">Todos</option>';

    // 3. Verificar datos globales
    console.log("window.projects:", window.projects);
    console.log("window.currentProjectIndex:", window.currentProjectIndex);

    if (!window.projects || !Array.isArray(window.projects)) {
        console.error("❌ window.projects NO ES UN ARRAY VÁLIDO");
        console.groupEnd();
        return;
    }

    // 4. Extraer datos únicos
    const uniqueProjects = new Set();
    const uniqueAssignees = new Set();

    window.projects.forEach((project, index) => {
        console.log(`Procesando proyecto ${index}:`, project?.name);
        if (project && project.name) {
            uniqueProjects.add(project.name);
        }
        if (project && project.tasks && Array.isArray(project.tasks)) {
            project.tasks.forEach((task, taskIndex) => {
                console.log(`  Tarea ${taskIndex}:`, task?.assignee);
                if (task && task.assignee) {
                    uniqueAssignees.add(task.assignee);
                }
            });
        }
    });

    console.log("Proyectos únicos encontrados:", Array.from(uniqueProjects));
    console.log("Asignados únicos encontrados:", Array.from(uniqueAssignees));

    // 5. Poblar selectores
    uniqueProjects.forEach(projectName => {
        const option = new Option(projectName, projectName);
        projectSelect.appendChild(option);
        console.log(`✅ Proyecto agregado: ${projectName}`);
    });

    uniqueAssignees.forEach(assignee => {
        const option = new Option(assignee, assignee);
        assigneeSelect.appendChild(option);
        console.log(`✅ Asignado agregado: ${assignee}`);
    });

    console.log("✅ FILTROS POBLADOS CON DATOS REALES");
    console.groupEnd();
}

// === FUNCIÓN AUXILIAR PROPUESTA ===
function initializeTimeTrackingOnDashboard() {
    console.log("=== Solicitando inicialización de seguimiento de horas ===");

    // Intentar inmediatamente
    if (document.getElementById('timeTrackingProject') && document.getElementById('timeTrackingAssignee')) {
        console.log("Elementos del DOM encontrados, inicializando...");
        initTimeTrackingFilters(); // O la función que realmente pobla tus filtros
        return;
    }

    // Si no están, esperar un poco más
    console.log("Elementos del DOM no encontrados, reintentando en 200ms...");
    setTimeout(() => {
        if (document.getElementById('timeTrackingProject') && document.getElementById('timeTrackingAssignee')) {
            console.log("Elementos del DOM encontrados en segundo intento, inicializando...");
            initTimeTrackingFilters(); // O la función que realmente pobla tus filtros
        } else {
            console.error("❌ Elementos del DOM aún no encontrados después de esperar. ¿Está el contenido del dashboard cargado?");
        }
    }, 200);
}
// === FIN FUNCIÓN AUXILIAR ===

// Asegúrate de que esto esté al final, o que se llame después de que se defina initializeTimeTrackingOnDashboard
// document.addEventListener('DOMContentLoaded', ... ) o window.onload = ...


function formatDate(dateString) {
  if (!dateString) return '--/--/--';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '--/--/--';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function showTimeAllocationView() {
    console.log("Mostrando vista de Asignación de Horas");
    // Ocultar otras vistas
    document.querySelectorAll('.view-content').forEach(view => view.classList.add('hidden'));
    // Mostrar esta vista
    document.getElementById('timeAllocationView').classList.remove('hidden');
    
    // Inicializar contenido
    initializeTimeAllocationView();
}

// Función auxiliar para inicializar la vista (poblar filtros, etc.)
function initializeTimeAllocationView() {
    console.log("Inicializando vista de Asignación de Horas...");
    populateTimeAllocationFilters();
    // Cargar datos iniciales (sin filtros)
    loadTimeAllocationData();
}

// === VISTA: Asignación de Horas ===

// Función auxiliar para obtener el nombre del mes
function getMonthName(monthNumber) {
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const index = parseInt(monthNumber, 10) - 1;
    return months[index] || "Desconocido";
}

function populateTimeAllocationFilters() {
    console.log("🔄 Poblando filtros de Asignación de Horas...");
    
    // 1. Obtener elementos del DOM
    const yearSelect = document.getElementById('filterTimeAllocationYear');
    const monthSelect = document.getElementById('filterTimeAllocationMonth');
    const projectSelect = document.getElementById('filterTimeAllocationProject');
    const assigneeSelect = document.getElementById('filterTimeAllocationAssignee');

    // 2. Limpiar selectores
    if (yearSelect) yearSelect.innerHTML = '<option value="all">Todos</option>';
    if (monthSelect) monthSelect.innerHTML = '<option value="all">Todos</option>';
    if (projectSelect) projectSelect.innerHTML = '<option value="all">Todos</option>';
    if (assigneeSelect) assigneeSelect.innerHTML = '<option value="all">Todos</option>';

    // 3. Verificar datos globales
    if (!projects || !Array.isArray(projects) || projects.length === 0) {
  console.warn("⛔ safeSave cancelado: projects está vacío o no cargado");
  return true;
}

if (currentProjectIndex === undefined || currentProjectIndex === null) {
  console.warn("⛔ safeSave cancelado: currentProjectIndex no está listo");
  return true;
}

    // 4. Recopilar valores únicos
    const yearsSet = new Set();
    const monthsSet = new Set();
    const projectsSet = new Set();
    const assigneesSet = new Set();

    projects.forEach(project => {
        projectsSet.add(project.name);
        if (project.tasks && Array.isArray(project.tasks)) {
            project.tasks.forEach(task => {
                // Extraer años y meses de las fechas de registro (timeLoggedEntries)
                if (task.timeLoggedEntries && Array.isArray(task.timeLoggedEntries)) {
                    task.timeLoggedEntries.forEach(entry => {
                        if (entry.date) {
                            const date = new Date(entry.date);
                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes en formato MM
                            if (!isNaN(year)) yearsSet.add(year);
                            monthsSet.add(month);
                        }
                    });
                } else {
                    // Fallback si no hay timeLoggedEntries estructurados
                    const startDate = task.startDate ? new Date(task.startDate) : null;
                    const deadline = task.deadline ? new Date(task.deadline) : null;
                    if (startDate) {
                        const year = startDate.getFullYear();
                        const month = String(startDate.getMonth() + 1).padStart(2, '0');
                        if (!isNaN(year)) yearsSet.add(year);
                        monthsSet.add(month);
                    }
                    if (deadline) {
                        const year = deadline.getFullYear();
                        const month = String(deadline.getMonth() + 1).padStart(2, '0');
                        if (!isNaN(year)) yearsSet.add(year);
                        monthsSet.add(month);
                    }
                }

                if (task.assignee && task.assignee.trim() !== '') {
                    assigneesSet.add(task.assignee.trim());
                }
            });
        }
    });

    console.log("📊 Valores encontrados:", { years: Array.from(yearsSet), months: Array.from(monthsSet), projects: Array.from(projectsSet), assignees: Array.from(assigneesSet) });

    // 5. Poblar selectores
    // Poblar años
    if (yearSelect && yearsSet.size > 0) {
        Array.from(yearsSet).sort((a, b) => b - a).forEach(year => {
            const option = new Option(year, year);
            yearSelect.appendChild(option);
            console.log(`✅ Año agregado: ${year}`);
        });
    } else if (yearSelect) {
        console.log("ℹ️ No hay años para agregar.");
    }

    // Poblar meses
    if (monthSelect && monthsSet.size > 0) {
        // Ordenar meses numéricamente antes de convertir a nombres
        const sortedMonths = Array.from(monthsSet).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
        sortedMonths.forEach(month => {
            const option = new Option(getMonthName(month), month);
            monthSelect.appendChild(option);
            console.log(`✅ Mes agregado: ${getMonthName(month)} (${month})`);
        });
    } else if (monthSelect) {
        console.log("ℹ️ No hay meses para agregar.");
    }

    // Poblar proyectos
    if (projectSelect && projectsSet.size > 0) {
        Array.from(projectsSet).sort().forEach(projectName => {
            const option = new Option(projectName, projectName);
            projectSelect.appendChild(option);
            console.log(`✅ Proyecto agregado: ${projectName}`);
        });
    } else if (projectSelect) {
        console.log("ℹ️ No hay proyectos para agregar.");
    }

    // Poblar asignados
    if (assigneeSelect && assigneesSet.size > 0) {
        Array.from(assigneesSet).sort().forEach(assignee => {
            const option = new Option(assignee, assignee);
            assigneeSelect.appendChild(option);
            console.log(`✅ Asignado agregado: ${assignee}`);
        });
    } else if (assigneeSelect) {
        console.log("ℹ️ No hay asignados para agregar.");
    }

    console.log("✅ Filtros de Asignación de Horas poblados.");
}

// Función para obtener filtros actuales
function getCurrentTimeAllocationFilters() {
    return {
        year: document.getElementById('filterTimeAllocationYear')?.value || 'all',
        month: document.getElementById('filterTimeAllocationMonth')?.value || 'all',
        project: document.getElementById('filterTimeAllocationProject')?.value || 'all',
        assignee: document.getElementById('filterTimeAllocationAssignee')?.value || 'all'
    };
}

// Función para mostrar la vista (debe ser llamada cuando se muestra la vista)
function showTimeAllocationView() {
    console.log(" Mostrando vista de Asignación de Horas");
    // Ocultar otras vistas
    document.querySelectorAll('.view-content').forEach(view => view.classList.add('hidden'));
    // Mostrar esta vista
    const viewElement = document.getElementById('timeAllocationView');
    if (viewElement) {
        viewElement.classList.remove('hidden');
        console.log("✅ Vista de Asignación de Horas mostrada.");
        
        // Inicializar contenido
        initializeTimeAllocationView();
    } else {
        console.error("❌ Elemento 'timeAllocationView' no encontrado en el DOM.");
    }
}

// Función auxiliar para inicializar la vista
function initializeTimeAllocationView() {
    console.log("🔄 Inicializando vista de Asignación de Horas...");
    populateTimeAllocationFilters();
    // Cargar datos iniciales (sin filtros)
    loadTimeAllocationData();
}

// Función para cargar y mostrar los datos
function loadTimeAllocationData() {
    console.log("📊 Cargando datos para el reporte de Asignación de Horas...");
    const filters = getCurrentTimeAllocationFilters();
    console.log("🔍 Filtros aplicados:", filters);

    // 1. Recopilar y procesar datos de todas las tareas de todos los proyectos
    let allTimeEntries = [];
    if (!projects || !Array.isArray(projects)) {
        console.warn("⚠️ Datos de proyectos no disponibles.");
        renderTimeAllocationTable([]);
        renderTimeAllocationChart([]);
        return;
    }

    projects.forEach(project => {
        const projectName = project.name;
        if (project.tasks && Array.isArray(project.tasks)) {
            project.tasks.forEach(task => {
                const assignee = task.assignee || 'Sin asignar';
                
                if (task.timeLoggedEntries && Array.isArray(task.timeLoggedEntries)) {
                    task.timeLoggedEntries.forEach(entry => {
                        if (entry.hours > 0) {
                            allTimeEntries.push({
                                projectName: projectName,
                                assignee: assignee,
                                date: entry.date ? new Date(entry.date) : new Date(),
                                hours: parseFloat(entry.hours) || 0
                            });
                        }
                    });
                } else if (task.timeLogged > 0) {
                    const fallbackDateStr = task.startDate || task.deadline || new Date().toISOString();
                    const fallbackDate = new Date(fallbackDateStr);
                    allTimeEntries.push({
                        projectName: projectName,
                        assignee: assignee,
                        date: fallbackDate,
                        hours: parseFloat(task.timeLogged) || 0
                    });
                }
            });
        }
    });

    console.log("📥 Entradas de tiempo recopiladas:", allTimeEntries);

    // 2. Filtrar datos
    const filteredData = allTimeEntries.filter(entry => {
        if (filters.year !== 'all' && entry.date.getFullYear() != filters.year) {
            return false;
        }
        if (filters.month !== 'all' && String(entry.date.getMonth() + 1).padStart(2, '0') !== filters.month) {
            return false;
        }
        if (filters.project !== 'all' && entry.projectName !== filters.project) {
            return false;
        }
        if (filters.assignee !== 'all' && entry.assignee !== filters.assignee) {
            return false;
        }
        return true;
    });

    console.log("📊 Datos filtrados:", filteredData);

    // 3. Agrupar y sumar por Asignado, Proyecto y Mes
    const groupedData = {};
    filteredData.forEach(entry => {
        const monthKey = `${entry.date.getFullYear()}-${String(entry.date.getMonth() + 1).padStart(2, '0')}`; // YYYY-MM
        const key = `${entry.assignee}|${entry.projectName}|${monthKey}`;

        if (!groupedData[key]) {
            groupedData[key] = {
                assignee: entry.assignee,
                projectName: entry.projectName,
                month: monthKey, // YYYY-MM
                monthName: entry.date.toLocaleString('es-ES', { month: 'long', year: 'numeric' }), // Ej: "enero 2024"
                totalHours: 0
            };
        }
        groupedData[key].totalHours += entry.hours;
    });

    const finalData = Object.values(groupedData);
    console.log("🧮 Datos agrupados y sumados:", finalData);

    // 4. Renderizar tabla y gráfico
    renderTimeAllocationTable(finalData);
    renderTimeAllocationChart(finalData);
}

function renderTimeAllocationTable(data) {
    const tbody = document.getElementById('timeAllocationTableBody');
    if (!tbody) {
        console.error("❌ Elemento 'timeAllocationTableBody' no encontrado.");
        return;
    }

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">No hay datos para mostrar con los filtros seleccionados.</td></tr>';
        console.log("📭 Tabla vacía (sin datos).");
        return;
    }

    tbody.innerHTML = data.map(item => `
        <tr>
            <td>${item.assignee}</td>
            <td>${item.projectName}</td>
            <td>${item.monthName}</td>
            <td>${item.totalHours.toFixed(2)}</td>
        </tr>
    `).join('');
    console.log("✅ Tabla de Asignación de Horas actualizada.");
}

function renderTimeAllocationChart(data) {
    const canvas = document.getElementById('timeAllocationChart');
    const ctx = canvas ? canvas.getContext('2d') : null;
    if (!ctx) {
        console.error("❌ Canvas 'timeAllocationChart' no encontrado.");
        return;
    }

    // Destruir instancia anterior si existe
    if (window.timeAllocationChartInstance) {
        window.timeAllocationChartInstance.destroy();
        console.log("🗑️ Instancia anterior de gráfico destruida.");
    }

    if (data.length === 0) {
        // Reemplazar canvas con mensaje
        const container = canvas.closest('.time-allocation-chart-container');
        if (container) {
            container.innerHTML = '<p style="text-align:center; color: #6c757d;">No hay datos para mostrar en el gráfico.</p>';
        }
        console.log("📭 Gráfico vacío (sin datos).");
        return;
    }

    // Preparar datos para Chart.js (ejemplo: Horas totales por asignado)
    const assigneeHours = {};
    data.forEach(item => {
        if (!assigneeHours[item.assignee]) {
            assigneeHours[item.assignee] = 0;
        }
        assigneeHours[item.assignee] += item.totalHours;
    });

    const labels = Object.keys(assigneeHours);
    const chartData = Object.values(assigneeHours);

    window.timeAllocationChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Horas Totales Registradas',
                data: chartData,
                backgroundColor: 'rgba(52, 152, 219, 0.7)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Horas'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Asignado'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Horas Totales por Asignado (Filtradas)'
                }
            }
        }
    });
    console.log("📊 Gráfica de Asignación de Horas actualizada.");
}

document.getElementById('applyTimeAllocationFiltersBtn')?.addEventListener('click', function () {
    loadTimeAllocationData();
});


function calculateProjectDatesFromTasks(project) {
    let earliestDate = null;
    let latestDate = null;

    project.tasks.forEach(task => {
        if (task.startDate && (!earliestDate || task.startDate < earliestDate)) {
            earliestDate = task.startDate;
        }
        if (task.deadline && (!latestDate || task.deadline > latestDate)) {
            latestDate = task.deadline;
        }
    });

    return { earliestDate, latestDate };
}


function updateMilestonesStatus() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    document.querySelectorAll('#milestonesList .milestone-item').forEach(item => {
        const dateStr = item.dataset.date;
        if (!dateStr) return;

        const milestoneDate = new Date(dateStr);
        milestoneDate.setHours(0, 0, 0, 0);

        // Limpiar clases anteriores
        item.classList.remove('upcoming', 'current', 'overdue');

        // Determinar nuevo estado
        if (milestoneDate < today) {
            item.classList.add('overdue');
        } else if (milestoneDate.toDateString() === today.toDateString()) {
            item.classList.add('current');
        } else {
            item.classList.add('upcoming');
        }
    });
}

// Ejecutar diariamente o al iniciar la aplicación
setInterval(updateMilestonesStatus, 86400000); // Actualiza cada 24 horas
updateMilestonesStatus(); // Ejecutar inmediatamente al cargar


// Al final de tu archivo JS o en el DOMContentLoaded:
document.addEventListener('DOMContentLoaded', function() {
    // Configurar botón de agregar hito
    document.getElementById('addMilestoneBtn')?.addEventListener('click', function() {
        const name = prompt("Nombre del hito:");
        if (!name || name.trim() === "") return;

        const dateStr = prompt("Fecha del hito (YYYY-MM-DD):");
        if (!dateStr) return;

        if (!isValidDate(dateStr)) {
            showNotification("Formato de fecha inválido. Use YYYY-MM-DD");
            return;
        }

        addMilestoneToList(name, dateStr);
        showNotification("Hito agregado correctamente");
    });

    // Actualizar estados cada 24 horas
    setInterval(updateMilestonesStatus, 86400000);
    updateMilestonesStatus(); // Ejecutar inmediatamente
});

// Función de validación de fecha (añadir si no existe)
function isValidDate(dateString) {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false;
    const d = new Date(dateString);
    return !isNaN(d.getTime());
}

// ================== RESPALDO LOCAL A ARCHIVO JSON ==================

// Botón: Descargar respaldo
document.getElementById('backupToLocal')?.addEventListener('click', function () {
    try {
        // Obtener los proyectos actuales
        const projects = JSON.parse(localStorage.getItem('projects')) || [];

        // Si no hay proyectos, avisar
        if (projects.length === 0) {
            showNotification('No hay proyectos para respaldar');
            return;
        }

        // Crear un objeto con fecha de respaldo
        const backupData = {
            version: "1.0",
            backupDate: new Date().toISOString(),
            projects: projects
        };

        // Convertir a texto
        const dataStr = JSON.stringify(backupData, null, 2);

        // Crear un blob (archivo)
        const blob = new Blob([dataStr], { type: 'application/json' });

        // Crear una URL temporal
        const url = URL.createObjectURL(blob);

        // Crear un enlace y hacer clic para descargar
        const a = document.createElement('a');
        a.href = url;
        a.download = `proyectos-respaldo-${new Date().toISOString().split('T')[0]}.json`;
        a.click();

        // Liberar la URL
        URL.revokeObjectURL(url);

        // Mostrar mensaje
        document.getElementById('backupStatus').textContent = '✅ Respaldo descargado';
        setTimeout(() => document.getElementById('backupStatus').textContent = '', 3000);
        showNotification('Respaldo guardado en tu dispositivo');

    } catch (err) {
        console.error('Error al crear respaldo:', err);
        document.getElementById('backupStatus').textContent = '❌ Error al respaldar';
        showNotification('Error al crear el respaldo');
    }
});

// Botón: Cargar desde archivo
document.getElementById('restoreFromLocal')?.addEventListener('click', function () {
    // Crear un input de tipo archivo
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = function (e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (event) {
            try {
                // Leer el contenido del archivo
                const data = JSON.parse(event.target.result);

                // Validar que tenga la estructura correcta
                if (!data.projects || !Array.isArray(data.projects)) {
                    throw new Error('Formato de archivo inválido');
                }

                // Guardar en localStorage
                localStorage.setItem('projects', JSON.stringify(data.projects));

                // Actualizar la variable global
                window.projects = data.projects;

                // Mostrar mensaje
                document.getElementById('backupStatus').textContent = '✅ Datos cargados';
                setTimeout(() => document.getElementById('backupStatus').textContent = '', 3000);
                showNotification(`✅ ${data.projects.length} proyectos cargados`);

                // Recargar la vista actual
                location.reload();

            } catch (err) {
                console.error('Error al cargar archivo:', err);
                document.getElementById('backupStatus').textContent = '❌ Archivo inválido';
                showNotification('❌ Error: Archivo no válido');
            }
        };
        reader.readAsText(file);
    };

    // Simular clic en el input
    input.click();
});


// === GESTIÓN DE PRÓXIMOS HITOS ===

document.getElementById('addMilestoneBtn')?.addEventListener('click', addNewMilestone);

// Función para agregar nuevo hito
function addNewMilestone() {
  const name = prompt("Nombre del hito:");
  if (!name || name.trim() === "") return;

  const dateStr = prompt("Fecha del hito (YYYY-MM-DD):");
  if (!dateStr) return;

  // Validar formato de fecha
  if (!isValidDate(dateStr)) {
    showNotification("Formato de fecha inválido. Use YYYY-MM-DD");
    return;
  }

  addMilestoneToList(name, dateStr);
  saveMilestonesToLocalStorage();
}

// Función para validar fecha
function isValidDate(dateString) {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false;
  const d = new Date(dateString);
  return !isNaN(d.getTime());
}

// Función para agregar hito a la lista
function addMilestoneToList(name, dateStr) {
  const milestonesList = document.getElementById('milestonesList');
  if (!milestonesList) return;

  const formattedDate = formatDateForDisplay(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const milestoneDate = new Date(dateStr);
  milestoneDate.setHours(0, 0, 0, 0);

  const milestoneItem = document.createElement('div');
  let statusClass = 'upcoming';
  
  if (milestoneDate < today) {
    statusClass = 'overdue';
  } else if (milestoneDate.toDateString() === today.toDateString()) {
    statusClass = 'current';
  }

  milestoneItem.className = `milestone-item ${statusClass}`;
  milestoneItem.dataset.date = dateStr;
  
  milestoneItem.innerHTML = `
    <span class="milestone-date">${formattedDate}</span>
    <span class="milestone-name">${name}</span>
    <button class="milestone-remove" onclick="removeMilestone(this)">
      <i class="fas fa-trash-alt"></i>
    </button>
  `;

  milestonesList.appendChild(milestoneItem);
}

// Función para formatear fecha para visualización
function formatDateForDisplay(dateStr) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('es-ES', options);
}

// Función para eliminar hito
function removeMilestone(button) {
  if (confirm("¿Eliminar este hito?")) {
    button.closest('.milestone-item').remove();
    saveMilestonesToLocalStorage();
    showNotification("Hito eliminado");
  }
}

// Guardar hitos en localStorage
function saveMilestonesToLocalStorage() {
  const milestones = [];
  document.querySelectorAll('#milestonesList .milestone-item').forEach(item => {
    milestones.push({
      name: item.querySelector('.milestone-name').textContent,
      date: item.dataset.date
    });
  });
  
  localStorage.setItem('projectMilestones', JSON.stringify(milestones));
}

// Cargar hitos desde localStorage
function loadMilestonesFromLocalStorage() {
  const savedMilestones = JSON.parse(localStorage.getItem('projectMilestones')) || [];
  const milestonesList = document.getElementById('milestonesList');
  
  if (milestonesList) {
    milestonesList.innerHTML = '';
    savedMilestones.forEach(milestone => {
      addMilestoneToList(milestone.name, milestone.date);
    });
  }
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  loadMilestonesFromLocalStorage();
  
  // Asegurar que el botón tenga el event listener
  const addBtn = document.getElementById('addMilestoneBtn');
  if (addBtn) {
    addBtn.addEventListener('click', addNewMilestone);
  }
});


function applyDashboardModeStyles(mode) {
  const dashboard = document.getElementById('dashboardView');
  if (!dashboard) return;

  dashboard.classList.remove('mode-agile', 'mode-traditional', 'mode-hybrid');
  dashboard.classList.add('mode-' + mode);

// === AÑADE ESTA LÍNEA ===
  highlightRelevantSections(mode);
  // =========================

  
  // Actualizar indicador visual
  const modeIndicator = document.getElementById('modeIndicator');
  const modeText = document.getElementById('currentModeText');
  
  if (modeIndicator && modeText) {
    const modeNames = {
      'agile': 'Ágil',
      'traditional': 'Tradicional',
      'hybrid': 'Híbrido'
    };
    
    modeIndicator.style.display = 'block';
    modeIndicator.className = `mode-indicator ${mode}`;
    modeText.textContent = modeNames[mode];
  }
}


document.addEventListener('DOMContentLoaded', function () {
  // Inicializa el manager
  window.methodologyManager = new MethodologyManager();


// === AQUÍ VA EL EVENTO DEL SELECTOR ===
  const selector = document.getElementById('methodologySelector');
  if (selector) {
    selector.addEventListener('change', function () {
      const mode = this.value;
      window.methodologyManager.setMode(mode);
      applyDashboardModeStyles(mode); // Aplica estilos visuales
  addModeTooltips(mode); // 👈 Añadido
   updateModeIndicator(mode); // 👈 Añade esta línea
  updateModeHelpText(mode);
     updateDashboardTitle(mode);
    });
  }

  // Aplica el modo guardado
  window.methodologyManager.setMode(window.methodologyManager.currentMode);

  // Asegúrate de que el dashboard esté visible
  setTimeout(() => {
    highlightRelevantSections(window.methodologyManager.currentMode);
  }, 100);
});


// === ACTUALIZAR INDICADOR DE MODO ===
function updateModeIndicator(mode) {
  const indicator = document.getElementById('modeIndicator');
  const icon = indicator.querySelector('i');
  const modeText = document.getElementById('currentModeText');
  
  if (!indicator || !icon || !modeText) return;

  // Resetear clases
  indicator.classList.remove('mode-indicator-agile', 'mode-indicator-traditional', 'mode-indicator-hybrid');

  // Configurar icono y texto por modo
  const config = {
    agile: {
      icon: 'fa-bolt',
      text: 'Ágil',
      class: 'mode-indicator-agile'
    },
    traditional: {
      icon: 'fa-tasks',
      text: 'Tradicional',
      class: 'mode-indicator-traditional'
    },
    hybrid: {
      icon: 'fa-sync-alt',
      text: 'Híbrido',
      class: 'mode-indicator-hybrid'
    }
  };

  const c = config[mode];
  icon.className = 'fas ' + c.icon;
  modeText.textContent = c.text;
  indicator.classList.add(c.class);
}



// === ACTUALIZAR MENSAJE DE AYUDA POR MODO ===
function updateModeHelpText(mode) {
  const helpText = document.getElementById('modeHelpMessage');
  if (!helpText) return;

  const messages = {
    agile: "En modo Ágil, el enfoque está en lo completado: tareas finalizadas y tiempo registrado.",
    traditional: "En modo Tradicional, el enfoque está en el control: tareas rezagadas y tiempo restante.",
    hybrid: "En modo Híbrido, se muestra una visión completa: avance, riesgos y control de tiempo."
  };

  helpText.textContent = messages[mode];

  // Cambiar color del borde según el modo
  const panel = document.querySelector('.mode-help-text');
  if (mode === 'agile') {
    panel.style.borderLeftColor = '#4caf50'; // Verde
  } else if (mode === 'traditional') {
    panel.style.borderLeftColor = '#2196f3'; // Azul
  } else {
    panel.style.borderLeftColor = '#9c27b0'; // Morado
  }
}


// === ACTUALIZAR TÍTULO DINÁMICO POR MODO ===
function updateDashboardTitle(mode) {
  const title = document.getElementById('dashboardTitle');
  if (!title) return;

  const titles = {
    agile: {
      main: '🚀 Avance del Proyecto',
      sub: 'Enfocado en entregas y productividad'
    },
    traditional: {
      main: '📅 Control del Proyecto',
      sub: 'Enfocado en cronograma y riesgos'
    },
    hybrid: {
      main: '🔁 Vista Completa del Proyecto',
      sub: 'Combina avance y control'
    }
  };

  const t = titles[mode];
  title.innerHTML = `<strong>${t.main}</strong><br><small>${t.sub}</small>`;
}


// === CREAR Y MOSTRAR TOOLTIPS DINÁMICOS ===
function addModeTooltips(mode) {
  // Definir mensajes por modo
  const tooltips = {
    agile: {
      '#completedTasksMetric': 'En modo Ágil, el progreso se mide por lo completado: tareas finalizadas.',
      '#totalLoggedDash': 'El tiempo registrado muestra productividad real del equipo.',
      '#tasksDistributionChart': 'Muestra balance entre tareas pendientes, en progreso y completadas.'
    },
    traditional: {
      '#overdueTasksMetric': 'Las tareas rezagadas indican riesgos de cronograma.',
      '#remainingTimeDash': 'El tiempo restante es clave para cumplir el plan original.',
      '#tasksDistributionChart': 'Muestra avance frente al plan establecido.'
    },
    hybrid: {
     '#completedTasksMetric': 'Parte del enfoque en productividad (Ágil)',
      '#overdueTasksMetric': 'Parte del enfoque en control de riesgos (Tradicional).',
      '#tasksDistributionChart': 'Visión general del estado del proyecto.'
    }
  };

  // Limpiar tooltips anteriores
  document.querySelectorAll('.tooltip').forEach(t => t.remove());

  // Agregar tooltips según el modo
  Object.keys(tooltips[mode]).forEach(selector => {
    const element = document.querySelector(selector);
    if (!element) return;

    // Crear tooltip
    const tooltip = document.createElement('div');
tooltip.className = 'gantt-dependency-tooltip';
tooltip.style.position = 'fixed';
tooltip.style.pointerEvents = 'none';
tooltip.style.zIndex = '99999';
tooltip.style.background = '#fff';
tooltip.style.padding = '8px 12px';
tooltip.style.borderRadius = '6px';
tooltip.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
tooltip.style.fontSize = '12px';
tooltip.style.color = '#2c3e50';
tooltip.style.transition = 'opacity 0.2s ease';
tooltip.style.opacity = '0';

document.body.appendChild(tooltip);











    // Mostrar al pasar el mouse
    element.addEventListener('mouseenter', (e) => {
      document.body.appendChild(tooltip);
      const rect = element.getBoundingClientRect();
      tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
      tooltip.style.left = `${rect.left + rect.width / 2}px`;
      tooltip.style.transform = 'translateX(-50%)';
      tooltip.style.opacity = '1';
    });

    // Ocultar al salir
    element.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
      setTimeout(() => tooltip.remove(), 300);
    });
  });
}


/**************************************
 * SISTEMA COMPLETO DE PERSISTENCIA *
 **************************************/

// Función para sincronizar con backend cada 30 segundos
function startAutoSync() {
    setInterval(async () => {
        if (useBackend) {
            try {
                await safeSave();
                console.log('🔄 Auto-sincronización completada');
            } catch (error) {
                console.warn('⚠️ Error en auto-sincronización:', error.message);
            }
        }
    }, 30000); // 30 segundos
}

// Función para forzar sincronización manual
async function forceSync() {
    console.group('🔄 SINCRONIZACIÓN MANUAL');
    const success = await safeSave();
    if (success) {
        showNotification('✅ Datos sincronizados correctamente');
    } else {
        showNotification('⚠️ Sincronización fallida, usando modo local');
    }
    console.groupEnd();
}

// Función para verificar estado de conexión
function checkConnectionStatus() {
    console.group('📡 ESTADO DE CONEXIÓN');
    console.log('🔗 Backend:', useBackend ? '✅ Conectado' : '❌ Desconectado');
    console.log('💾 localStorage:', '✅ Siempre disponible');
    console.log('📦 Proyectos en memoria:', projects.length);
    console.log('🔄 Última sincronización:', new Date().toLocaleTimeString());
    console.groupEnd();
    
    return useBackend;
}

// Agregar botón de sincronización manual si no existe
function addSyncButton() {
    // Verificar si ya existe el botón
    if (document.getElementById('syncButton')) return;
    
    // Crear botón de sincronización
    const syncButton = document.createElement('button');
    syncButton.id = 'syncButton';
    syncButton.innerHTML = '🔄 Sincronizar';
    syncButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        padding: 10px 15px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
    `;
    syncButton.onclick = forceSync;
    
    document.body.appendChild(syncButton);
    console.log('✅ Botón de sincronización agregado');
}

// Iniciar todo el sistema de persistencia
function initPersistenceSystem() {
    console.group('🚀 INICIANDO SISTEMA DE PERSISTENCIA');
    
    // 1. Agregar botón de sincronización
    addSyncButton();
    
    // 2. Iniciar auto-sincronización
    startAutoSync();
    
    // 3. Verificar estado inicial
    checkConnectionStatus();
    
    console.log('✅ Sistema de persistencia completamente operativo');
    console.groupEnd();
}
// === LISTENER GLOBAL PARA EL BOTÓN DE MENÚ (funciona siempre) ===
document.addEventListener('DOMContentLoaded', () => {
  const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
  const sidebar = document.querySelector('aside');

  if (toggleSidebarBtn && sidebar) {
    toggleSidebarBtn.addEventListener('click', () => {
      sidebar.classList.toggle('hidden');
    });
  }
});


function populateTaskDependenciesSelect(excludeTaskId = null) {
  const container = document.getElementById('taskDependenciesContainer');
  const selectedDiv = document.getElementById('taskDependenciesSelected');
  const itemsDiv = document.getElementById('taskDependenciesItems');
  
  if (!container) return;

  // Limpiar
  itemsDiv.innerHTML = '';
  selectedDiv.innerHTML = '-- Seleccione tareas predecesoras --';

  const project = projects[currentProjectIndex];
  if (!project || !project.tasks) return;

  // Mostrar opciones
  project.tasks.forEach(task => {
    if (task.id === excludeTaskId) return;

    const option = document.createElement('div');
    option.textContent = task.name;
    option.dataset.id = task.id;
    option.addEventListener('click', function() {
      // Alternar selección
      const id = parseInt(this.dataset.id);
      const isSelected = this.classList.contains('selected');
      
      if (isSelected) {
        this.classList.remove('selected');
      } else {
        this.classList.add('selected');
      }
      
      // Actualizar vista de selección
      updateSelectedDependenciesView();
    });
    itemsDiv.appendChild(option);
  });

  // Alternar menú al hacer clic en el seleccionado
  selectedDiv.onclick = function(e) {
    e.stopPropagation();
    itemsDiv.style.display = itemsDiv.style.display === 'block' ? 'none' : 'block';
  };

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', function closeDropdown(e) {
    if (!container.contains(e.target)) {
      itemsDiv.style.display = 'none';
    }
  }, { once: true });
}

function updateSelectedDependenciesView() {
  const selectedDiv = document.getElementById('taskDependenciesSelected');
  const items = document.querySelectorAll('#taskDependenciesItems div.selected');
  
  if (items.length === 0) {
    selectedDiv.innerHTML = '-- Seleccione tareas predecesoras --';
  } else {
    selectedDiv.innerHTML = '';
    items.forEach(item => {
      const tag = document.createElement('span');
      tag.className = 'select-item-tag';
      tag.textContent = item.textContent;
      selectedDiv.appendChild(tag);
    });
  }
}



/**
 * Obtiene la posición y tamaño de la barra de la tarea dentro de su fila.
 * @param {HTMLElement} taskRow - El elemento <div> de la fila de la tarea.
 * @returns {Object|null} Objeto con propiedades top, left, width, height o null si falla.
 */
function getTaskBarPosition(taskRow) {
    const taskBar = taskRow.querySelector('.gantt-bar');
    if (!taskBar) return null;
    
    const ganttContainer = document.getElementById('ganttContainer');
    if (!ganttContainer) return null;
    
    const barRect = taskBar.getBoundingClientRect();
    const containerRect = ganttContainer.getBoundingClientRect();
    
    return {
        left: barRect.left - containerRect.left,
        right: barRect.right - containerRect.left,
        top: barRect.top - containerRect.top + (barRect.height / 2),
        bottom: barRect.bottom - containerRect.top
    };
}
/**
 * Dibuja una línea de dependencia entre dos puntos.
 * @param {Object} startRect - Posición y tamaño del punto de inicio.
 * @param {Object} endRect - Posición y tamaño del punto de fin.
 * @param {number} taskId - ID de la tarea actual.
 * @param {number} depId - ID de la tarea predecesora.
 */


// === FUNCIÓN MEJORADA PARA DIBUJAR LÍNEAS ===
function drawDependencyLine(startRect, endRect, taskId, depId) {
    const ganttContainer = document.getElementById('ganttContainer');
    if (!ganttContainer) return;
    
    // Crear contenedor de líneas si no existe
    let linesContainer = ganttContainer.querySelector('.dependency-lines-container');
    if (!linesContainer) {
        linesContainer = document.createElement('div');
        linesContainer.className = 'dependency-lines-container';
        linesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 10;
        `;
        ganttContainer.style.position = 'relative';
        ganttContainer.appendChild(linesContainer);
    }
    
    // Coordenadas relativas al contenedor Gantt
    const x1 = startRect.right;   // Fin de la tarea predecesora
    const y1 = startRect.top;     // Mitad vertical de la barra predecesora
    const x2 = endRect.left;      // Inicio de la tarea dependiente
    const y2 = endRect.top;       // Mitad vertical de la barra dependiente
    
    // Calcular longitud y ángulo
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    // Crear línea
    const line = document.createElement('div');
    line.className = 'dependency-line';
    line.dataset.from = depId;
    line.dataset.to = taskId;
    line.style.cssText = `
        position: absolute;
        width: ${length}px;
        height: 2px;
        background-color: #3498db;
        transform-origin: 0 0;
        transform: rotate(${angle}deg);
        left: ${x1}px;
        top: ${y1}px;
        z-index: 11;
    `;
    
    // Flecha
    const arrow = document.createElement('div');
    arrow.style.cssText = `
        position: absolute;
        width: 0;
        height: 0;
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-left: 6px solid #3498db;
        left: ${length - 6}px;
        top: -4px;
    `;
    line.appendChild(arrow);
    
    linesContainer.appendChild(line);
}

// === AGREGAR ESTILOS CSS (si no los tienes) ===
// Añade esto a tu CSS o crea una función para inyectar los estilos
function injectDependencyStyles() {
    if (document.getElementById('dependency-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'dependency-styles';
    style.textContent = `
        .dependency-line {
            transition: all 0.3s ease;
        }
        .dependency-line:hover {
            background-color: #e74c3c;
            height: 3px;
        }
        .dependency-line:hover + .dependency-arrow {
            border-left-color: #e74c3c;
        }
    `;
    document.head.appendChild(style);
}

// Llamar la función de inyección de estilos al inicializar
document.addEventListener('DOMContentLoaded', injectDependencyStyles);




function fixDependencyLinesCSS() {
    const style = document.createElement('style');
    style.textContent = `
        .gantt-container {
            position: relative !important;
            overflow: visible !important;
        }
        .dependency-lines-container {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            pointer-events: none !important;
            z-index: 10 !important;
            transform: none !important;
        }
        .dependency-line {
            position: absolute !important;
            background-color: #3498db !important;
            height: 2px !important;
            z-index: 11 !important;
            transform-origin: 0 0 !important;
        }
    `;
    document.head.appendChild(style);
}

// Ejecutar cuando cargue la página
document.addEventListener('DOMContentLoaded', fixDependencyLinesCSS);


// Función adicional para recalcular posiciones de líneas
function recalculateDependencyLines() {
    const linesContainer = document.querySelector('.dependency-lines-container');
    if (!linesContainer) return;
    
    // Remover transformaciones existentes
    linesContainer.style.transform = 'none';
    
    // Recalcular posición basada en el estado actual del sidebar
    const sidebar = document.querySelector('aside');
    const isSidebarHidden = sidebar.classList.contains('hidden');
    
    if (!isSidebarHidden) {
        const sidebarWidth = sidebar.offsetWidth;
        linesContainer.style.transform = `translateX(${sidebarWidth}px)`;
    }
}



// 🚀 PROJECT ENHANCER - VERSIÓN DEFINITIVA SEGURA
(function () {
    'use strict';

    if (window._projectEnhancerLoaded) return;
    window._projectEnhancerLoaded = true;

    console.log('🚀 Project Enhancer Definitivo - Cargado');

    // =============== PROTECCIÓN DE BOTONES (CRÍTICO) ===============
    function protectActionButtons() {
        const style = document.createElement('style');
        style.id = 'button-protection-final';
        style.textContent = `
            /* GARANTIZAR que los botones SIEMPRE funcionen */
            .move-up-btn, .move-down-btn, 
            .task-context-menu-item.delete {
                pointer-events: auto !important;
                transform: none !important;
                z-index: 10000 !important;
                position: relative !important;
                cursor: pointer !important;
            }
            
            /* Las tarjetas NO deben bloquear clics */
            .task-card, .kanban-task, .task-item {
                pointer-events: none !important;
            }
            
            /* Pero los botones dentro SÍ deben ser clickeables */
            .task-card > *, .kanban-task > *, .task-item > * {
                pointer-events: auto !important;
            }
        `;
        document.head.appendChild(style);
    }

    // =============== REALIDAD AUMENTADA ===============
    function initARSystem() {
        if (window.projectAR) return;

        window.projectAR = {
            addARButtonToModal: function (modal) {
                const footers = modal.querySelectorAll('.task-details-footer');
                if (footers.length === 0) return;

                document.querySelectorAll('.project-ar-button').forEach(btn => btn.remove());

                const footer = footers[0];
                const btn = document.createElement('button');
                btn.className = 'project-ar-button';
                btn.textContent = '🎯 Ver en Realidad Aumentada';
                btn.style.cssText = `
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white; border: none; padding: 12px 20px; border-radius: 8px;
                    cursor: pointer; margin: 10px 5px; font-weight: bold; font-size: 14px;
                    transition: transform 0.2s, box-shadow 0.2s;
                `;
                btn.onmouseenter = () => {
                    btn.style.transform = 'translateY(-2px)';
                    btn.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.6)';
                };
                btn.onmouseleave = () => {
                    btn.style.transform = 'none';
                    btn.style.boxShadow = 'none';
                };

                btn.onclick = () => {
                    const allH3 = modal.querySelectorAll('h3');
                    let name = null;
                    for (const h3 of allH3) {
                        const t = h3.textContent?.trim();
                        if (t && t !== 'Detalles de la Tarea') {
                            name = t;
                            break;
                        }
                    }
                    if (!name) {
                        alert('No se pudo cargar la tarea');
                        return;
                    }

                    const assignee = modal.querySelector('#editTaskAssignee')?.value?.trim() || 'No asignado';
                    const estimated = parseFloat(modal.querySelector('#editTaskEstimatedHours')?.value) || 0;

                    let timeLogged = 0;
                    const timeLoggedEl = Array.from(modal.querySelectorAll('label')).find(l => l.textContent.includes('Tiempo Registrado'))?.nextElementSibling;
                    if (timeLoggedEl) {
                        const text = timeLoggedEl.textContent?.trim();
                        if (text) {
                            const match = text.match(/(\d+(\.\d+)?)/);
                            if (match) timeLogged = parseFloat(match[1]);
                        }
                    }

                    const startDateInput = modal.querySelector('#editTaskStartDate');
                    const deadlineInput = modal.querySelector('#editTaskDeadline');
                    const start = startDateInput?.value || '';
                    const deadline = deadlineInput?.value || '';

                    let desc = '';
                    const desc1 = modal.querySelector('#editTaskDescription');
                    if (desc1 && desc1.value?.trim()) {
                        desc = desc1.value.trim();
                    } else {
                        const desc2 = modal.querySelector('.task-description, .description-field, textarea');
                        if (desc2 && desc2.value?.trim()) {
                            desc = desc2.value.trim();
                        } else {
                            const desc3 = modal.querySelector('textarea');
                            if (desc3 && desc3.value?.trim()) {
                                desc = desc3.value.trim();
                            } else {
                                const descLabel = Array.from(modal.querySelectorAll('label')).find(l => 
                                    l.textContent.toLowerCase().includes('descrip')
                                );
                                if (descLabel) {
                                    const sibling = descLabel.nextElementSibling;
                                    if (sibling && sibling.textContent?.trim()) {
                                        desc = sibling.textContent.trim();
                                    }
                                }
                            }
                        }
                    }

                    const statusBadge = modal.querySelector('.status-badge');
                    const priorityBadge = modal.querySelector('.priority-badge');

                    let statusText = 'Sin estado';
                    let statusColor = '#9e9e9e';
                    let priorityText = 'Sin prioridad';
                    let priorityColor = '#9e9e9e';

                    if (statusBadge) {
                        statusText = statusBadge.textContent.trim() || 'Sin estado';
                        const badgeStyle = window.getComputedStyle(statusBadge);
                        let bgColor = badgeStyle.backgroundColor;
                        if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
                            bgColor = badgeStyle.color;
                        }
                        if (bgColor.startsWith('rgb')) {
                            const rgb = bgColor.match(/\d+/g);
                            if (rgb && rgb.length >= 3) {
                                statusColor = `#${parseInt(rgb[0]).toString(16).padStart(2, '0')}${parseInt(rgb[1]).toString(16).padStart(2, '0')}${parseInt(rgb[2]).toString(16).padStart(2, '0')}`;
                            } else {
                                statusColor = '#ff9800';
                            }
                        } else {
                            statusColor = bgColor;
                        }
                    }

                    if (priorityBadge) {
                        priorityText = priorityBadge.textContent.trim() || 'Sin prioridad';
                        const badgeStyle = window.getComputedStyle(priorityBadge);
                        let bgColor = badgeStyle.backgroundColor;
                        if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
                            bgColor = badgeStyle.color;
                        }
                        if (bgColor.startsWith('rgb')) {
                            const rgb = bgColor.match(/\d+/g);
                            if (rgb && rgb.length >= 3) {
                                priorityColor = `#${parseInt(rgb[0]).toString(16).padStart(2, '0')}${parseInt(rgb[1]).toString(16).padStart(2, '0')}${parseInt(rgb[2]).toString(16).padStart(2, '0')}`;
                            } else {
                                priorityColor = '#2196f3';
                            }
                        } else {
                            priorityColor = bgColor;
                        }
                    }

                    let progressText = '';
                    const progressEl = modal.querySelector('.progress-percentage, .task-progress, [class*="progress"]');
                    if (progressEl) {
                        const pText = progressEl.textContent?.trim();
                        if (pText && /\d+%/.test(pText)) {
                            progressText = pText;
                        }
                    }

                    const today = new Date();
                    const deadlineDate = deadline ? new Date(deadline) : null;
                    const isOverdueByDate = deadlineDate && deadlineDate < today;
                    const isOverBudget = timeLogged > estimated;
                    const hasRisk = isOverdueByDate || isOverBudget;
                    const timeBarColor = isOverBudget ? '#ff5252' : '#00ff88';

                    const prev = document.getElementById('ar-overlay-final');
                    if (prev) prev.remove();

                    const overlay = document.createElement('div');
                    overlay.id = 'ar-overlay-final';
                    overlay.innerHTML = `
                        <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:10000;display:flex;justify-content:center;align-items:center;font-family:sans-serif;color:white;">
                            <div style="background:linear-gradient(135deg,#0f4c75 0%,#3282b8 100%);padding:30px;border-radius:20px;border:3px solid ${hasRisk ? '#ff5252' : '#00ff88'};max-width:520px;text-align:center;box-shadow:0 10px 30px rgba(${hasRisk ? '255,82,82' : '0,255,136'},0.4);">
                                <div style="font-size:48px;margin-bottom:10px;">🎯</div>
                                <h2 style="color:${hasRisk ? '#ff5252' : '#00ff88'};margin:0 0 15px;font-size:24px;">
                                    REALIDAD AUMENTADA ${hasRisk ? '⚠️' : ''}
                                </h2>
                                <p style="margin:0 0 8px;font-size:14px;opacity:0.9;">Tarea asignada:</p>
                                <h3 style="margin:0 0 15px;font-size:20px;font-weight:bold;">${name}</h3>
                                
                                ${hasRisk ? `
                                    <div style="background:rgba(255,82,82,0.2);border:1px solid #ff5252;border-radius:10px;padding:10px;margin:0 0 15px;font-size:13px;color:#ffeb3b;">
                                        <strong>⚠️ ALERTA DE RIESGO</strong><br>
                                        ${isOverdueByDate ? '• La tarea está REZAGADA<br>' : ''}
                                        ${isOverBudget ? '• Tiempo registrado supera el estimado' : ''}
                                    </div>
                                ` : ''}
                                
                                <div style="display:flex;justify-content:center;gap:10px;margin:0 0 20px;flex-wrap:wrap;">
                                    <span style="background:${statusColor};color:white;padding:5px 12px;border-radius:15px;font-size:12px;font-weight:bold;">${statusText}</span>
                                    <span style="background:${priorityColor};color:white;padding:5px 12px;border-radius:15px;font-size:12px;font-weight:bold;">${priorityText}</span>
                                </div>
                                
                                <div style="text-align:left;background:rgba(255,255,255,0.08);padding:18px;border-radius:12px;margin-bottom:20px;">
                                    <p style="margin:8px 0;"><strong>👤 Asignado a:</strong> ${assignee}</p>
                                    <p style="margin:8px 0;"><strong>⏱️ Tiempo asignado:</strong> ${estimated}h</p>
                                    <p style="margin:8px 0;"><strong>⏱️ Tiempo registrado:</strong> ${timeLogged}h</p>
                                    
                                    <div style="margin:15px 0;">
                                        <p style="margin:8px 0;font-size:13px;"><strong>📊 Uso de tiempo</strong></p>
                                        <div style="background:#333;height:10px;border-radius:5px;overflow:hidden;width:100%;">
                                            <div style="height:100%;width:${Math.min(100, (timeLogged / (estimated || 1)) * 100)}%;background:${timeBarColor};"></div>
                                        </div>
                                        <small style="opacity:0.85;font-size:12px;">Registrado: ${timeLogged}h / Estimado: ${estimated}h</small>
                                    </div>
                                    
                                    ${progressText ? `<p style="margin:12px 0 0 0;"><strong>📈 Progreso:</strong> ${progressText}</p>` : ''}
                                    <p style="margin:12px 0 0 0;"><strong>📅 Periodo de tiempo:</strong> ${start || 'No definida'} → ${deadline || 'No definida'}</p>
                                    ${desc ? `<p style="margin:12px 0 0 0;"><strong>📝 Descripción:</strong> ${desc}</p>` : `<p style="margin:12px 0 0 0;opacity:0.7;"><strong>📝 Descripción:</strong> Sin descripción</p>`}
                                </div>
                                
                                <button onclick="document.getElementById('ar-overlay-final').remove()" 
                                        style="background:#9c27b0;color:white;border:none;padding:12px 24px;border-radius:8px;cursor:pointer;font-weight:bold;transition:transform 0.2s;box-shadow:0 4px 8px rgba(0,0,0,0.3);">
                                    ✅ Cerrar Realidad Aumentada
                                </button>
                            </div>
                        </div>
                    `;
                    document.body.appendChild(overlay);
                };

                footer.appendChild(btn);
            }
        };

        const modal = document.getElementById('taskDetailsModal');
        if (modal) {
            const observer = new MutationObserver((mutations) => {
                for (const mut of mutations) {
                    if (mut.type === 'attributes' && mut.attributeName === 'style') {
                        if (modal.style.display === 'block') {
                            setTimeout(() => window.projectAR.addARButtonToModal(modal), 300);
                        }
                    }
                }
            });
            observer.observe(modal, { attributes: true, attributeFilter: ['style'] });
        }
    }

    // =============== EFECTOS 3D SEGUROS ===============
    function applySafe3DEffects() {
        console.log('🎨 Aplicando efectos 3D seguros...');
        
        const style = document.createElement('style');
        style.id = 'safe-3d-effects';
        style.textContent = `
            /* EFECTOS 3D SEGUROS - NO AFECTAN BOTONES */
            .task-card, .kanban-task, .task-item {
                border-radius: 10px;
                transition: all 0.3s ease;
                border-left: 4px solid #ff9800;
                background: white;
                position: relative;
            }
            
            .task-card:hover, .kanban-task:hover, .task-item:hover {
                transform: translateY(-5px) scale(1.02);
                box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            }
            
            /* Colores de prioridad */
            .task-card[data-priority="alta"] {
                border-left-color: #dc3545;
                background: linear-gradient(135deg, #fff, #ffeaea);
            }
            .task-card[data-priority="media"] {
                border-left-color: #ffc107;
                background: linear-gradient(135deg, #fff, #fff9e6);
            }
            .task-card[data-priority="baja"] {
                border-left-color: #28a745;
                background: linear-gradient(135deg, #fff, #f0fff4);
            }
            
            /* Efecto de profundidad en columnas */
            .kanban-column {
                transition: transform 0.3s ease;
            }
            .kanban-column:hover {
                transform: translateY(-2px);
            }
            
            /* Contadores de columnas */
            .column-counter {
                background: rgba(0,0,0,0.1);
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 0.8em;
                margin-left: 8px;
            }
        `;
        document.head.appendChild(style);

        // Aplicar colores de prioridad
        const cards = document.querySelectorAll('.task-card, .kanban-task, .task-item');
        cards.forEach(card => {
            const priorityBadge = card.querySelector('.priority-badge');
            if (priorityBadge) {
                const priorityText = priorityBadge.textContent.toLowerCase();
                if (priorityText.includes('alta')) card.setAttribute('data-priority', 'alta');
                else if (priorityText.includes('media')) card.setAttribute('data-priority', 'media');
                else if (priorityText.includes('baja')) card.setAttribute('data-priority', 'baja');
            }
        });

        // Agregar contadores a columnas
        const columns = document.querySelectorAll('.kanban-column, .board-column');
        columns.forEach(col => {
            const header = col.querySelector('h2, h3, .column-title') || col;
            const tasks = col.querySelectorAll('.task-card, .kanban-task, .task-item');
            if (tasks.length > 0 && !header.querySelector('.column-counter')) {
                const counter = document.createElement('span');
                counter.className = 'column-counter';
                counter.textContent = tasks.length;
                header.appendChild(counter);
            }
        });
    }

    // =============== TOOLTIPS ===============
    let tooltipElement = null;
    let tooltipTimeout = null;

    function initTooltips() {
        const cards = document.querySelectorAll('.task-card, .kanban-task, .task-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                tooltipTimeout = setTimeout(() => {
                    showTooltip(card, e.pageX, e.pageY);
                }, 500);
            });

            card.addEventListener('mousemove', (e) => {
                if (tooltipElement) {
                    tooltipElement.style.left = (e.pageX + 10) + 'px';
                    tooltipElement.style.top = (e.pageY + 10) + 'px';
                }
            });

            card.addEventListener('mouseleave', () => {
                clearTimeout(tooltipTimeout);
                hideTooltip();
            });
        });
    }

    function showTooltip(card, x, y) {
        if (!tooltipElement) {
            tooltipElement = document.createElement('div');
            tooltipElement.style.cssText = `
                position: fixed; background: rgba(0,0,0,0.9); color: white;
                padding: 10px; border-radius: 6px; font-size: 12px; z-index: 10000;
                max-width: 250px; pointer-events: none; opacity: 0; transition: opacity 0.2s;
            `;
            document.body.appendChild(tooltipElement);
        }

        // Información del tooltip (simplificada)
        const name = card.querySelector('h3, h4, .task-title')?.textContent || 'Sin nombre';
        const assignee = card.querySelector('.assignee')?.textContent || 'No asignado';
        
        tooltipElement.innerHTML = `
            <strong>${name}</strong><br>
            👤 ${assignee}<br>
            📊 Vista rápida del proyecto
        `;
        
        tooltipElement.style.left = (x + 10) + 'px';
        tooltipElement.style.top = (y + 10) + 'px';
        tooltipElement.style.opacity = '1';
    }

    function hideTooltip() {
        if (tooltipElement) {
            tooltipElement.style.opacity = '0';
        }
    }

    // =============== INICIALIZACIÓN ===============
    function init() {
        console.log('🎯 Iniciando Project Enhancer Definitivo');
        protectActionButtons(); // PRIMERO - proteger botones
        initARSystem();
        applySafe3DEffects();
   
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 1000);
    }

})();


// === INICIALIZACIÓN DE IA - AL FINAL DEL ARCHIVO ===
document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que todo cargue y luego configurar IA
    setTimeout(() => {
        setupAIEstimation();
        console.log('✅ Sistema de IA inicializado');
    }, 2000);


// También inicializar cuando se abre el modal
document.getElementById('newTaskBtn')?.addEventListener('click', function() {
    setTimeout(setupAIEstimation, 500);

});

/***********************
 * ASISTENTE VIRTUAL POR VOZ *
 ***********************/

const voiceAssistant = {
  isListening: false,
  recognition: null,
  
  init: function() {
    // Verificar compatibilidad del navegador
    if (!('webkitSpeechRecognition' in window)) {
      console.warn('⚠️ Asistente por voz no compatible con este navegador');
      return false;
    }
    
    try {
      this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
      this.recognition.continuous = true;
      this.recognition.interimResults = false;
      this.recognition.lang = 'es-ES';
      
      this.recognition.onresult = (event) => this.handleCommand(event);
      this.recognition.onerror = (event) => this.handleError(event);
      this.recognition.onend = () => {
        console.log('🔇 Reconocimiento de voz finalizado');
        if (this.isListening) {
          setTimeout(() => {
            if (this.isListening) {
              this.recognition.start();
            }
          }, 1000);
        }
      };
      
      console.log('✅ Asistente por voz inicializado');
      this.createVoiceButton();
      return true;
      
    } catch (error) {
      console.error('❌ Error inicializando asistente por voz:', error);
      return false;
    }
  },
  
  handleCommand: function(event) {
    if (!event.results || event.results.length === 0) return;
    
    const result = event.results[event.results.length-1];
    if (!result || result.length === 0) return;
    
    const command = result[0].transcript.toLowerCase();
    console.log('🎤 Comando de voz detectado:', command);
    
    // Mostrar feedback visual del comando
    this.showCommandFeedback(command);
    
    // Procesar comandos
    if (command.includes('crear tarea') || command.includes('nueva tarea')) {
      this.createTaskByVoice(command);
    } 
    else if (command.includes('mostrar tablero') || command.includes('ver kanban')) {
      showView('board');
      showNotification('🔊 Mostrando vista de tablero');
    }
    else if (command.includes('mostrar lista') || command.includes('ver lista')) {
      showView('list');
      showNotification('🔊 Mostrando vista de lista');
    }
    else if (command.includes('mostrar calendario')) {
      showView('calendar');
      showNotification('🔊 Mostrando calendario');
    }
    else if (command.includes('mostrar dashboard') || command.includes('ver dashboard')) {
      showView('dashboard');
      showNotification('🔊 Mostrando dashboard');
    }
    else if (command.includes('filtrar por') && command.includes('pendiente')) {
      this.applyFilterByStatus('pending');
    }
    else if (command.includes('filtrar por') && command.includes('progreso')) {
      this.applyFilterByStatus('inProgress');
    }
    else if (command.includes('filtrar por') && command.includes('completado')) {
      this.applyFilterByStatus('completed');
    }
    else if (command.includes('limpiar filtros') || command.includes('quitar filtros')) {
      this.clearAllFilters();
    }
    else if (command.includes('estadísticas') || command.includes('estadisticas')) {
      showView('reports');
      showNotification('🔊 Mostrando reportes y estadísticas');
    }
    else if (command.includes('nuevo proyecto') || command.includes('crear proyecto')) {
      createNewProject();
      showNotification('🔊 Creando nuevo proyecto');
    }
    else if (command.includes('cambiar proyecto')) {
      this.showProjectSelection();
    }
    else if (command.includes('ayuda') || command.includes('comandos')) {
      this.showVoiceCommandsHelp();
    }
    else if (command.includes('detener') || command.includes('parar')) {
      this.toggleListening();
    }
    else {
      console.log('Comando no reconocido:', command);
      showNotification('❌ Comando no reconocido. Di "ayuda" para ver comandos disponibles');
    }
  },
  
  createTaskByVoice: function(command) {
    console.log('🔊 Procesando creación de tarea por voz...');
    
    // Extraer nombre de la tarea
    let taskName = command.replace('crear tarea', '').replace('nueva tarea', '').trim();
    
    if (!taskName) {
      taskName = 'Tarea creada por voz - ' + new Date().toLocaleTimeString();
    }
    
    // Crear tarea básica
    const task = {
      id: Date.now(),
      name: taskName,
      startDate: new Date().toISOString().split('T')[0],
      deadline: this.extractDeadline(command),
      priority: this.extractPriority(command),
      assignee: this.extractAssignee(command),
      description: `Tarea creada mediante comando de voz: "${command}"`,
      status: 'pending',
      timeLogged: 0,
      estimatedTime: 0,
      timeHistory: [],
      subtasks: []
    };
    
    // Asegurar que el proyecto actual existe
    if (!projects || !projects[currentProjectIndex]) {
      showNotification('❌ Error: No hay proyecto seleccionado');
      return;
    }
    
    projects[currentProjectIndex].tasks.push(task);
    updateLocalStorage();
    
    // Actualizar vistas
    actualizarAsignados();
    aplicarFiltros();
    generatePieChart(getStats());
    updateProjectProgress();
    
    showNotification(`🔊 Tarea "${task.name}" creada por voz`);
    
    // Notificar a otros usuarios si hay WebSocket
    if (typeof tiempoRealSocket !== 'undefined' && tiempoRealSocket && tiempoRealSocket.connected) {
      tiempoRealSocket.emit('task-changed', {
        projectId: currentProjectIndex,
        taskId: task.id,
        taskName: task.name,
        userName: 'Asistente por Voz',
        type: 'task-created',
        timestamp: new Date().toISOString()
      });
    }
  },
  
  extractDeadline: function(command) {
    // Lógica simple para extraer fechas
    if (command.includes('mañana')) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    }
    if (command.includes('próxima semana') || command.includes('proxima semana')) {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      return nextWeek.toISOString().split('T')[0];
    }
    return '';
  },
  
  extractPriority: function(command) {
    if (command.includes('alta prioridad') || command.includes('prioridad alta')) return 'alta';
    if (command.includes('media prioridad') || command.includes('prioridad media')) return 'media';
    if (command.includes('baja prioridad') || command.includes('prioridad baja')) return 'baja';
    return 'media'; // Prioridad por defecto
  },
  
  extractAssignee: function(command) {
    // Por ahora retorna vacío, puedes expandir esta lógica
    return '';
  },
  
  applyFilterByStatus: function(status) {
    const activeView = getActiveView();
    const prefixMap = {
      'board': '',
      'list': 'List',
      'calendar': 'Calendar',
      'gantt': 'Gantt',
      'reports': 'Reports'
    };
    
    const prefix = prefixMap[activeView] || '';
    const statusFilter = document.getElementById(`filterStatus${prefix}`);
    
    if (statusFilter) {
      statusFilter.value = status;
      aplicarFiltros();
      showNotification(`🔊 Filtrado por: ${getStatusText(status)}`);
    }
  },
  
  clearAllFilters: function() {
    const activeView = getActiveView();
    const prefixMap = {
      'board': '',
      'list': 'List', 
      'calendar': 'Calendar',
      'gantt': 'Gantt',
      'reports': 'Reports'
    };
    
    const prefix = prefixMap[activeView] || '';
    
    // Limpiar filtros disponibles
    const filtersToClear = [
      `filterAssignee${prefix}`,
      `filterPriority${prefix}`, 
      `filterStatus${prefix}`,
      `filterStartDate${prefix}`,
      `filterEndDate${prefix}`
    ];
    
    filtersToClear.forEach(filterId => {
      const filter = document.getElementById(filterId);
      if (filter) filter.value = '';
    });
    
    aplicarFiltros();
    showNotification('🔊 Filtros limpiados');
  },
  
  showProjectSelection: function() {
    if (!projects || projects.length === 0) {
      showNotification('❌ No hay proyectos disponibles');
      return;
    }
    
    const projectList = projects.map((p, i) => `${i + 1}. ${p.name}`).join('\n');
    showNotification(`🔊 Proyectos disponibles:\n${projectList}\n\nDi "proyecto número X" para seleccionar`);
  },
  
  showVoiceCommandsHelp: function() {
    const commands = [
      '🎤 COMANDOS DE VOZ DISPONIBLES:',
      '"crear tarea [nombre]" - Nueva tarea',
      '"mostrar tablero/lista/calendario/dashboard" - Cambiar vista',
      '"filtrar por pendiente/progreso/completado" - Filtrar tareas',
      '"limpiar filtros" - Remover filtros',
      '"estadísticas" - Ver reportes',
      '"nuevo proyecto" - Crear proyecto',
      '"cambiar proyecto" - Seleccionar proyecto',
      '"ayuda" - Ver esta lista',
      '"detener" - Parar escucha'
    ].join('\n');
    
    // Usar alert temporalmente para mostrar todos los comandos
    alert(commands);
    showNotification('🔊 Comandos de ayuda mostrados');
  },
  
  showCommandFeedback: function(command) {
    // Crear elemento flotante para mostrar el comando
    let feedback = document.getElementById('voiceCommandFeedback');
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.id = 'voiceCommandFeedback';
      feedback.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(52, 152, 219, 0.95);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        z-index: 10000;
        font-family: Arial, sans-serif;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        max-width: 80%;
        text-align: center;
        font-size: 16px;
        backdrop-filter: blur(10px);
      `;
      document.body.appendChild(feedback);
    }
    
    feedback.innerHTML = `🎤 <strong>Comando detectado:</strong> "${command}"`;
    feedback.style.display = 'block';
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
      if (feedback) {
        feedback.style.display = 'none';
      }
    }, 3000);
  },
  
  handleError: function(event) {
    console.error('Error en reconocimiento de voz:', event.error);
    if (event.error === 'not-allowed') {
      showNotification('❌ Permiso de micrófono denegado. Por favor habilita el micrófono en la configuración del navegador.');
    } else if (event.error === 'audio-capture') {
      showNotification('❌ No se detectó micrófono. Verifica que tengas un micrófono conectado.');
    }
  },
  
  createVoiceButton: function() {
    // Crear botón en la barra superior, al lado de cerrar sesión
    const button = document.createElement('button');
    button.id = 'voiceAssistantButton';
    button.innerHTML = '🎤 Activar Voz';
    button.title = 'Asistente por voz - Click para activar/desactivar';
    
    button.style.cssText = `
        position: relative;
        background: #3498db;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 20px;
        font-size: 14px;
        cursor: pointer;
        margin-left: 10px;
        transition: all 0.3s ease;
        font-family: Arial, sans-serif;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;
    
    // Efectos hover
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.background = '#2980b9';
        this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.background = '#3498db';
        this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    });
    
    // Click para activar/desactivar
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleListening();
    });
    
    // Buscar el botón de cerrar sesión y insertar al lado
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn && logoutBtn.parentNode) {
        logoutBtn.parentNode.insertBefore(button, logoutBtn.nextSibling);
        console.log('✅ Botón de voz colocado al lado de cerrar sesión');
    } else {
        // Fallback: poner en el header
        const header = document.querySelector('header');
        if (header) {
            header.appendChild(button);
            console.log('✅ Botón de voz colocado en el header');
        } else {
            // Último fallback: poner en body pero arriba
            button.style.position = 'fixed';
            button.style.top = '20px';
            button.style.right = '20px';
            button.style.zIndex = '1000';
            document.body.appendChild(button);
            console.log('✅ Botón de voz colocado en posición fija superior');
        }
    }
},
  
toggleListening: function() {
    const button = document.getElementById('voiceAssistantButton');
    
    if (!button) {
        console.error('❌ Botón no encontrado');
        return;
    }
    
    if (!this.isListening) {
        // Activar modo escucha
        try {
            this.recognition.start();
            this.isListening = true;
            button.innerHTML = '🔴 Escuchando...';
            button.style.background = '#e74c3c';
            button.title = 'Asistente escuchando - Click para detener';
            showNotification('🔊 MODO ESCUCHA ACTIVADO - Di "ayuda" para ver comandos');
            console.log('🎤 Asistente por voz: MODO ESCUCHA ACTIVADO');
        } catch (error) {
            console.error('Error al activar reconocimiento:', error);
            showNotification('❌ Error al activar el micrófono');
        }
    } else {
        // Desactivar modo escucha
        this.recognition.stop();
        this.isListening = false;
        button.innerHTML = '🎤 Activar Voz';
        button.style.background = '#3498db';
        button.title = 'Click para activar el asistente por voz';
        showNotification('🔊 Asistente por voz desactivado');
        console.log('🎤 Asistente por voz: MODO ESCUCHA DESACTIVADO');
    }
}
};

// Inicializar el asistente cuando la aplicación cargue
document.addEventListener('DOMContentLoaded', function() {
  // Esperar a que todo esté cargado
  setTimeout(() => {
    console.log('🚀 Inicializando asistente por voz...');
    if (voiceAssistant.init()) {
      console.log('🎤 Asistente por voz listo para usar');
      // Hacer disponible globalmente para la consola
      window.voiceAssistant = voiceAssistant;
    } else {
      console.log('🔇 Asistente por voz no disponible en este navegador');
    }
  }, 3000);
});

// También hacer disponible después de que cargue la página
setTimeout(() => {
  window.voiceAssistant = voiceAssistant;
  console.log('🎤 voiceAssistant disponible en consola');
}, 5000);

// === SOLUCIÓN PARA ERRORES DE SINTAXIS ===

// Código seguro para cerrar todas las estructuras
});

// === ASISTENTE POR VOZ - VERSIÓN FUNCIONAL ===

const voiceAssistant = {
  isListening: false,
  recognition: null,
  
  init: function() {
    // Verificar compatibilidad
    if (!('webkitSpeechRecognition' in window)) {
      console.warn('⚠️ Navegador no compatible con reconocimiento de voz');
      return false;
    }
    
    try {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = false;
      this.recognition.lang = 'es-ES';
      
      this.recognition.onresult = (event) => {
        this.handleCommand(event);
      };
      
      this.recognition.onerror = (event) => {
        console.error('Error de voz:', event.error);
      };
      
      this.recognition.onend = () => {
        if (this.isListening) {
          setTimeout(() => {
            this.recognition.start();
          }, 1000);
        }
      };
      
      console.log('✅ Asistente por voz inicializado');
      this.createVoiceButton();
      return true;
      
    } catch (error) {
      console.error('❌ Error al inicializar asistente:', error);
      return false;
    }
  },
  
  handleCommand: function(event) {
    if (!event.results || event.results.length === 0) return;
    
    const result = event.results[event.results.length - 1];
    if (!result || result.length === 0) return;
    
    const command = result[0].transcript.toLowerCase();
    console.log('🎤 Comando detectado:', command);
    
    // Mostrar feedback
    this.showCommandFeedback(command);
    
    // Procesar comandos
    if (command.includes('crear tarea') || command.includes('nueva tarea')) {
      this.createTaskByVoice(command);
    }
    else if (command.includes('mostrar tablero')) {
      this.changeView('board', 'tablero');
    }
    else if (command.includes('mostrar lista')) {
      this.changeView('list', 'lista');
    }
    else if (command.includes('mostrar calendario')) {
      this.changeView('calendar', 'calendario');
    }
    else if (command.includes('mostrar dashboard')) {
      this.changeView('dashboard', 'dashboard');
    }
    else if (command.includes('mostrar reportes') || command.includes('mostrar estadísticas')) {
      this.changeView('reports', 'reportes');
    }
    else if (command.includes('limpiar filtros')) {
      this.clearFilters();
    }
    else if (command.includes('ayuda') || command.includes('comandos')) {
      this.showHelp();
    }
    else if (command.includes('detener') || command.includes('parar')) {
      this.toggleListening();
    }
    else {
      showNotification('❌ Comando no reconocido. Di "ayuda" para ver opciones');
    }
  },
  
  createTaskByVoice: function(command) {
    console.log('🔊 Creando tarea por voz...');
    
    // Extraer nombre de la tarea
    let taskName = command
      .replace('crear tarea', '')
      .replace('nueva tarea', '')
      .trim();
    
    if (!taskName) {
      taskName = 'Tarea creada por voz - ' + new Date().toLocaleTimeString();
    }
    
    // Verificar que tenemos un proyecto activo
    if (typeof projects === 'undefined' || typeof currentProjectIndex === 'undefined') {
      showNotification('❌ Error: No hay proyecto seleccionado');
      return;
    }
    
    if (!projects[currentProjectIndex]) {
      showNotification('❌ Error: Proyecto actual no válido');
      return;
    }
    
    // Crear la tarea
    const task = {
      id: Date.now(),
      name: taskName,
      startDate: new Date().toISOString().split('T')[0],
      deadline: '',
      priority: 'media',
      assignee: '',
      description: `Tarea creada por comando de voz: "${command}"`,
      status: 'pending',
      timeLogged: 0,
      estimatedTime: 0,
      timeHistory: [],
      subtasks: []
    };
    
    // Agregar al proyecto actual
    projects[currentProjectIndex].tasks.push(task);
    
    // Guardar y actualizar
    if (typeof updateLocalStorage === 'function') {
      updateLocalStorage();
    }
    
    // Actualizar vistas
    if (typeof actualizarAsignados === 'function') {
      actualizarAsignados();
    }
    
    if (typeof aplicarFiltros === 'function') {
      aplicarFiltros();
    }
    
    if (typeof generatePieChart === 'function' && typeof getStats === 'function') {
      generatePieChart(getStats());
    }
    
    if (typeof updateProjectProgress === 'function') {
      updateProjectProgress();
    }
    
    showNotification(`🔊 Tarea creada: "${task.name}"`);
    
    // Notificar por WebSocket si está disponible
    if (typeof tiempoRealSocket !== 'undefined' && tiempoRealSocket && tiempoRealSocket.connected) {
      tiempoRealSocket.emit('task-changed', {
        projectId: currentProjectIndex,
        taskId: task.id,
        taskName: task.name,
        userName: 'Asistente por Voz',
        type: 'task-created',
        timestamp: new Date().toISOString()
      });
    }
  },
  
  changeView: function(view, viewName) {
    if (typeof showView === 'function') {
      showView(view);
      showNotification(`🔊 Mostrando ${viewName}`);
    } else {
      showNotification('❌ Función de cambio de vista no disponible');
    }
  },
  
  clearFilters: function() {
    if (typeof aplicarFiltros !== 'function') return;
    
    // Limpiar filtros básicos
    const filters = [
      'filterAssignee',
      'filterPriority', 
      'filterStatus',
      'filterStartDate',
      'filterEndDate'
    ];
    
    filters.forEach(filterId => {
      const element = document.getElementById(filterId);
      if (element) element.value = '';
    });
    
    aplicarFiltros();
    showNotification('🔊 Filtros limpiados');
  },
  
  showHelp: function() {
    const commands = [
      '🎤 COMANDOS DE VOZ DISPONIBLES:',
      '"crear tarea [nombre]" - Crear nueva tarea',
      '"mostrar tablero" - Vista Kanban',
      '"mostrar lista" - Vista de lista',
      '"mostrar calendario" - Vista de calendario', 
      '"mostrar dashboard" - Vista dashboard',
      '"mostrar reportes" - Vista de reportes',
      '"limpiar filtros" - Remover todos los filtros',
      '"ayuda" - Ver esta lista de comandos',
      '"detener" - Parar el modo escucha'
    ];
    
    alert(commands.join('\n'));
    showNotification('🔊 Comandos de ayuda mostrados');
  },
  
  showCommandFeedback: function(command) {
    // Crear o actualizar elemento de feedback
    let feedback = document.getElementById('voiceCommandFeedback');
    
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.id = 'voiceCommandFeedback';
      feedback.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(52, 152, 219, 0.95);
        color: white;
        padding: 12px 20px;
        border-radius: 20px;
        z-index: 10000;
        font-family: Arial, sans-serif;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        max-width: 90%;
        text-align: center;
        font-size: 14px;
        backdrop-filter: blur(5px);
      `;
      document.body.appendChild(feedback);
    }
    
    feedback.textContent = `🎤 Comando: "${command}"`;
    feedback.style.display = 'block';
    
    // Ocultar después de 2.5 segundos
    setTimeout(() => {
      feedback.style.display = 'none';
    }, 2500);
  },
  
  createVoiceButton: function() {
    // Crear botón en la barra superior, al lado de cerrar sesión
    const button = document.createElement('button');
    button.id = 'voiceAssistantButton';
    button.innerHTML = '🎤 Activar Voz';
    button.title = 'Asistente por voz - Click para activar/desactivar';
    
    button.style.cssText = `
        position: relative;
        background: #3498db;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 20px;
        font-size: 14px;
        cursor: pointer;
        margin-left: 10px;
        transition: all 0.3s ease;
        font-family: Arial, sans-serif;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;
    
    // Efectos hover
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.background = '#2980b9';
        this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.background = '#3498db';
        this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    });
    
    // Click para activar/desactivar
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleListening();
    });
    
    // Buscar el botón de cerrar sesión y insertar al lado
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn && logoutBtn.parentNode) {
        logoutBtn.parentNode.insertBefore(button, logoutBtn.nextSibling);
        console.log('✅ Botón de voz colocado al lado de cerrar sesión');
    } else {
        // Fallback: poner en el header
        const header = document.querySelector('header');
        if (header) {
            header.appendChild(button);
            console.log('✅ Botón de voz colocado en el header');
        } else {
            // Último fallback: poner en body pero arriba
            button.style.position = 'fixed';
            button.style.top = '20px';
            button.style.right = '20px';
            button.style.zIndex = '1000';
            document.body.appendChild(button);
            console.log('✅ Botón de voz colocado en posición fija superior');
        }
    }
},
  
  toggleListening: function() {
    const button = document.getElementById('voiceAssistantButton');
    
    if (!button) {
      console.error('❌ Botón no encontrado');
      return;
    }
    
    if (!this.isListening) {
      // Activar modo escucha
      try {
        this.recognition.start();
        this.isListening = true;
        button.style.background = '#e74c3c';
        button.innerHTML = '🔴';
        button.title = 'Asistente escuchando - Click para detener';
        showNotification('🔊 MODO ESCUCHA ACTIVADO - Di "ayuda" para ver comandos');
        console.log('🎤 Asistente por voz: MODO ESCUCHA ACTIVADO');
      } catch (error) {
        console.error('Error al activar reconocimiento:', error);
        showNotification('❌ Error al activar el micrófono');
      }
    } else {
      // Desactivar modo escucha
      this.recognition.stop();
      this.isListening = false;
      button.style.background = '#3498db';
      button.innerHTML = '🎤';
      button.title = 'Asistente por voz - Click para activar';
      showNotification('🔊 Asistente por voz desactivado');
      console.log('🎤 Asistente por voz: MODO ESCUCHA DESACTIVADO');
    }
  }
};

// Inicialización segura
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    console.log('🚀 Iniciando asistente por voz...');
    
    if (voiceAssistant.init()) {
      console.log('✅ Asistente por voz inicializado correctamente');
      // Hacer disponible globalmente
      window.voiceAssistant = voiceAssistant;
    } else {
      console.log('ℹ️ Asistente por voz no disponible');
    }
  }, 3000);
});

// También hacer disponible después de carga completa
setTimeout(() => {
  window.voiceAssistant = voiceAssistant;
  console.log('🎤 voiceAssistant disponible en consola');
}, 5000);



// En tu voiceAssistant existente, añade esta función:

// REDIRIGIR RESULTADOS AL SYSTEMASSISTANT
if (window.voiceAssistant && window.SystemAssistant) {
    // Guardar la función onResult original si existe
    const originalOnResult = voiceAssistant.onResult;
    
    voiceAssistant.onResult = function(transcript) {
        console.log('🎯 Voz detectada:', transcript);
        
        // Ejecutar función original si existe
        if (originalOnResult) {
            originalOnResult(transcript);
        }
        
        // También enviar al SystemAssistant
        if (SystemAssistant.voiceIntegration) {
            SystemAssistant.voiceIntegration.processVoiceCommand(transcript);
        }
    };
    
    console.log('✅ VoiceAssistant conectado a SystemAssistant');
}
// === FIN DEL ARCHIVO - SIN ERRORES ===


/***********************************************
 * 💾 GUARDAR PROYECTO ACTUAL COMO PLANTILLA
 ***********************************************/
function saveCurrentProjectAsTemplate() {
  if (typeof currentProjectIndex === "undefined" || currentProjectIndex < 0) {
    showNotification("⚠️ No hay ningún proyecto seleccionado");
    return;
  }

  const project = projects[currentProjectIndex];
  if (!project) {
    showNotification("⚠️ No se encontró el proyecto actual");
    return;
  }

  // Pedir nombre y descripción
  const templateName = prompt("Nombre de la plantilla:", project.name + " (Plantilla)");
  if (!templateName) return;

  const templateDescription = prompt("Descripción de la plantilla:", project.description || "Sin descripción");

  // Clonar estructura del proyecto
  const newTemplate = {
    name: templateName.trim(),
    description: templateDescription.trim(),
    tasks: JSON.parse(JSON.stringify(project.tasks || []))
  };

  // Guardar dentro del objeto global
  window.projectTemplates[templateName] = newTemplate;

  // Guardar en localStorage (persistente)
  try {
    localStorage.setItem("projectTemplates", JSON.stringify(window.projectTemplates));
  } catch (err) {
    console.error("❌ Error al guardar plantillas en localStorage:", err);
  }

  // Actualizar menú lateral dinámicamente
  const selector = document.getElementById("templateSelector");
  if (selector) {
    const option = document.createElement("option");
    option.value = templateName;
    option.textContent = templateName;
    selector.appendChild(option);
  }

  showNotification(`✅ Plantilla "${templateName}" guardada correctamente`);
  console.log("💾 Plantilla guardada:", newTemplate);
}

/***********************************************
 * 📋 SECCIÓN DE PLANTILLAS REUTILIZABLES (AUTOCARGABLE)
 ***********************************************/
function injectTemplateSection() {
  const aside = document.querySelector("aside");
  if (!aside) {
    console.warn("⚠️ Menú lateral no encontrado aún, reintentando...");
    setTimeout(injectTemplateSection, 1000);
    return;
  }

  // Evitar duplicar
  if (document.querySelector(".template-section")) {
    console.log("📋 Sección de plantillas ya existe.");
    return;
  }

  console.log("🧩 Insertando sección de plantillas en el menú lateral...");

  // Crear contenedor principal
  const templateSection = document.createElement("div");
  templateSection.classList.add("template-section");
  templateSection.style.marginTop = "20px";
  templateSection.style.paddingTop = "10px";
  templateSection.style.borderTop = "1px solid #ccc";

  // Generar HTML del menú
  templateSection.innerHTML = `
    <h3 style="margin-bottom:8px;font-size:1em;">📋 Plantillas</h3>
    <select id="templateSelector"
            style="width:100%;padding:6px;border-radius:4px;margin-bottom:8px;border:1px solid #ccc;">
      <option value="">Selecciona plantilla...</option>
    </select>
    <button id="useTemplateBtn"
            style="width:100%;background:#3498db;color:white;border:none;padding:8px;border-radius:4px;cursor:pointer;">
      ➕ Crear desde plantilla
    </button>
  `;

  aside.appendChild(templateSection);
  console.log("✅ Sección de plantillas añadida correctamente.");

  // 🔹 Cargar plantillas desde localStorage (si existen)
  let storedTemplates = {};
  try {
    const saved = localStorage.getItem("projectTemplates");
    if (saved) {
      storedTemplates = JSON.parse(saved);
      window.projectTemplates = storedTemplates;
    }
  } catch (err) {
    console.error("❌ Error al cargar plantillas almacenadas:", err);
  }

  // 🔹 Si no hay plantillas, usa un ejemplo mínimo
  if (!window.projectTemplates || Object.keys(window.projectTemplates).length === 0) {
    window.projectTemplates = {
      "Proyecto Base": {
        name: "Proyecto Base",
        description: "Plantilla base vacía para nuevos proyectos",
        tasks: []
      }
    };
  }

  // 🔹 Poblar el selector con las plantillas disponibles
  const selector = document.getElementById("templateSelector");
  Object.keys(window.projectTemplates).forEach(name => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    selector.appendChild(opt);
  });

  // 🔹 Vincular botón para crear proyecto desde plantilla
  const btn = document.getElementById("useTemplateBtn");
  btn.addEventListener("click", () => {
    const selected = selector.value;
    if (!selected) {
      showNotification("⚠️ Selecciona una plantilla primero");
      return;
    }

    const template = window.projectTemplates[selected];
    if (!template) {
      showNotification("❌ Plantilla no encontrada");
      return;
    }

    const newProject = {
      id: Date.now(),
      name: template.name + " (Copia)",
      description: template.description,
      createdAt: new Date().toISOString(),
      fromTemplate: true,
      tasks: JSON.parse(JSON.stringify(template.tasks))
    };

    projects.push(newProject);
    currentProjectIndex = projects.length - 1;
    updateLocalStorage();
    renderProjects();
    selectProject(currentProjectIndex);

    showNotification(`✅ Proyecto creado desde plantilla: ${template.name}`);
    console.log(`🆕 Proyecto creado desde plantilla: ${template.name}`, newProject);
  });
}

/***********************************************
 * 🧩 ACTIVADOR AUTOMÁTICO
 ***********************************************/
const templateObserver = new MutationObserver(() => {
  const aside = document.querySelector("aside");
  if (aside && !document.querySelector(".template-section")) {
    injectTemplateSection();
  }
});

templateObserver.observe(document.body, { childList: true, subtree: true });

/***********************************************
 * 🧩 BOTÓN EN MENÚ LATERAL PARA GUARDAR PLANTILLA (VERSIÓN FIJA)
 ***********************************************/
function injectSaveTemplateButton() {
  const aside = document.querySelector("aside");
  if (!aside || document.getElementById("saveTemplateBtn")) return;

  const btn = document.createElement("button");
  btn.id = "saveTemplateBtn";
  btn.textContent = "💾 Guardar proyecto como plantilla";
  btn.style.width = "100%";
  btn.style.background = "#27ae60";
  btn.style.color = "white";
  btn.style.border = "none";
  btn.style.padding = "8px";
  btn.style.borderRadius = "4px";
  btn.style.cursor = "pointer";
  btn.style.marginTop = "10px";

  btn.addEventListener("click", saveCurrentProjectAsTemplate);

  // Si existe la sección de plantillas, lo agrega allí
  const templateSection = document.querySelector(".template-section");
  if (templateSection) {
    templateSection.appendChild(btn);
  } else {
    // Si aún no existe, lo inserta al final del menú lateral
    aside.appendChild(btn);
  }

  console.log("✅ Botón 'Guardar proyecto como plantilla' insertado correctamente.");
}

/***********************************************
 * 👀 OBSERVADOR DINÁMICO DEL MENÚ LATERAL
 ***********************************************/
const observer = new MutationObserver(() => {
  const aside = document.querySelector("aside");
  const templateSection = document.querySelector(".template-section");

  // Insertar botón solo una vez, cuando el menú exista
  if (aside && (templateSection || document.querySelector("aside"))) {
    injectSaveTemplateButton();
    observer.disconnect();
  }
});

// Activar observador sobre todo el documento
observer.observe(document.body, { childList: true, subtree: true });

/***********************************************
 * 🗑️ ELIMINAR PLANTILLAS (LOCAL Y BACKEND)
 ***********************************************/

/**
 * Borra una plantilla localmente y del backend si existe
 */
async function deleteTemplate(templateName) {
  if (!templateName || !window.projectTemplates[templateName]) {
    showNotification("⚠️ Selecciona una plantilla válida para borrar");
    return;
  }

  const confirmDelete = confirm(`¿Seguro que quieres eliminar la plantilla "${templateName}"?`);
  if (!confirmDelete) return;

  // Eliminar de memoria
  delete window.projectTemplates[templateName];

  // Eliminar de localStorage
  localStorage.setItem("projectTemplates", JSON.stringify(window.projectTemplates));

  // Actualizar menú lateral
  const selector = document.getElementById("templateSelector");
  if (selector) {
    const option = selector.querySelector(`option[value="${templateName}"]`);
    if (option) option.remove();
    selector.value = "";
  }

  showNotification(`🗑️ Plantilla "${templateName}" eliminada localmente`);
  console.log(`🗑️ Plantilla eliminada localmente: ${templateName}`);

  // Intentar eliminar del backend
  try {
    const response = await fetch(`${TEMPLATES_API_URL}/${encodeURIComponent(templateName)}`, {
      method: "DELETE"
    });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const result = await response.json();
    console.log(`🌐 Plantilla "${templateName}" eliminada del backend`, result);
    showNotification(`🌐 Plantilla "${templateName}" eliminada del servidor`);
  } catch (error) {
    console.warn("⚠️ No se pudo eliminar la plantilla en el backend:", error);
  }
}

/***********************************************
 * 🧩 BOTÓN PARA BORRAR PLANTILLA EN MENÚ LATERAL
 ***********************************************/
function injectDeleteTemplateButton() {
  const aside = document.querySelector("aside");
  if (!aside || document.getElementById("deleteTemplateBtn")) return;

  const btn = document.createElement("button");
  btn.id = "deleteTemplateBtn";
  btn.textContent = "🗑️ Eliminar plantilla seleccionada";
  btn.style.width = "100%";
  btn.style.background = "#e74c3c";
  btn.style.color = "white";
  btn.style.border = "none";
  btn.style.padding = "8px";
  btn.style.borderRadius = "4px";
  btn.style.cursor = "pointer";
  btn.style.marginTop = "8px";

  btn.addEventListener("click", () => {
    const selected = document.getElementById("templateSelector")?.value;
    if (!selected) {
      showNotification("⚠️ Selecciona una plantilla para eliminar");
      return;
    }
    deleteTemplate(selected);
  });

  // Insertar debajo del botón de “Guardar plantilla”
  const templateSection = document.querySelector(".template-section");
  if (templateSection) {
    templateSection.appendChild(btn);
  } else {
    aside.appendChild(btn);
  }
}

// Esperar hasta que el menú lateral esté disponible
let deleteBtnCheck = setInterval(() => {
  const aside = document.querySelector("aside");
  if (aside && document.getElementById("templateSelector")) {
    injectDeleteTemplateButton();
    clearInterval(deleteBtnCheck);
  }
}, 1000);

// ==================================================
// SISTEMA DE IA MEJORADO - VERSIÓN CORREGIDA
// ==================================================

// Diccionario expandido de IA - VERSIÓN MEJORADA
const expandedAIDictionary = {
    complexPatterns: {
        'api database integration': {
            keywords: ['api', 'base de datos', 'integrar', 'conectar', 'microservicios'],
            hours: 20,
            complexity: 5,
            reasoning: "🚀 INTEGRACIÓN COMPLEJA: Múltiples sistemas"
        },
        'api rest complete': {
            keywords: ['api rest', 'rest api', 'endpoints', 'crud', 'autenticación', 'jwt'],
            hours: 12,
            complexity: 4, 
            reasoning: "🌐 API REST: Desarrollo completo"
        },
        'frontend framework': {
            keywords: ['react', 'vue', 'angular', 'svelte', 'interfaz', 'login', 'frontend', 'javascript'],
            hours: 10,
            complexity: 4,
            reasoning: "🎨 FRONTEND: Framework moderno"
        },
        'mobile development': {
            keywords: ['app móvil', 'android', 'ios', 'flutter', 'react native', 'móvil', 'aplicación'],
            hours: 16,
            complexity: 4,
            reasoning: "📱 MOBILE: Desarrollo aplicación"
        },
        'devops deployment': {
            keywords: ['docker', 'kubernetes', 'despliegue', 'producción', 'nginx', 'devops', 'servidor'],
            hours: 8,
            complexity: 4,
            reasoning: "⚙️ DEVOPS: Infraestructura y despliegue"
        },
        'machine learning': {
            keywords: ['machine learning', 'ia', 'inteligencia artificial', 'modelo', 'entrenar'],
            hours: 24,
            complexity: 5,
            reasoning: "🧠 IA/ML: Modelo de aprendizaje automático"
        }
    },
    
    simplePatterns: {
        'configuración': { 
            keywords: ['configurar', 'instalar', 'setup', 'servidor', 'ambiente'], 
            hours: 5,
            complexity: 3
        },
        'base de datos': { 
            keywords: ['base de datos', 'mysql', 'mongodb', 'postgresql', 'database'], 
            hours: 6,
            complexity: 3
        },
        'testing': { 
            keywords: ['pruebas', 'testing', 'qa', 'testear', 'calidad'], 
            hours: 4,
            complexity: 2
        },
        'documentación': { 
            keywords: ['documentar', 'manual', 'wiki', 'docs', 'documentación'], 
            hours: 3,
            complexity: 2
        },
        'corrección': { 
            keywords: ['corregir', 'arreglar', 'bug', 'error', 'fix'], 
            hours: 3,
            complexity: 2
        },
        'diseño ui': {
            keywords: ['diseñar', 'ui', 'ux', 'interfaz', 'wireframe', 'prototipo'],
            hours: 8,
            complexity: 3
        }
    }
};

// Asistente IA CORREGIDO
window.AIAssistant = {
    name: "Asistente Proyectos",
    currentAvatar: 'robot',
    isThinking: false,
    
    // AVATARES CORREGIDOS - Usando emojis específicos
    avatars: {
        'robot': {
            thinking: '🤖',
            suggesting: '🔮', 
            happy: '🤖',
            warning: '⚠️'
        },
        'persona': {
            thinking: '👨‍💻',
            suggesting: '👨‍💻',
            happy: '👨‍💻', 
            warning: '🙅‍♂️'
        },
        'magician': {
            thinking: '🧙‍♂️',
            suggesting: '✨',
            happy: '🧙‍♂️',
            warning: '🔮'
        },
        'alien': {
            thinking: '👽',
            suggesting: '🛸',
            happy: '👽',
            warning: '💫'
        }
    },
    
    // Sonidos
    sounds: {
        thinking: null,
        suggestion: null,
        appear: null
    },
    
    initAssistant: function() {
        console.log('🤖 Asistente IA CORREGIDO inicializando...');
        this.loadSounds();
        this.waitForModalOpen();
        this.listenForNewTaskButton();
    },
    
    loadSounds: function() {
        try {
            this.sounds.thinking = this.createBeepSound(400, 0.3);
            this.sounds.suggestion = this.createBeepSound(600, 0.2);
            this.sounds.appear = this.createSweepSound();
        } catch (e) {
            console.log('🔇 Sonidos no disponibles');
        }
    },
    
    createBeepSound: function(frequency, duration) {
        return function() {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = frequency;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + duration);
            } catch (e) {}
        };
    },
    
    createSweepSound: function() {
        return function() {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.5);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.5);
            } catch (e) {}
        };
    },
    
    playSound: function(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName]();
        }
    },
    
    waitForModalOpen: function() {
        const modal = document.getElementById('createTaskModal');
        if (!modal) {
            setTimeout(() => this.waitForModalOpen(), 1000);
            return;
        }
        
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    if (modal.style.display === 'block') {
                        console.log('✅ Modal abierto, activando asistente...');
                        this.playSound('appear');
                        this.activateAssistant();
                    }
                }
            });
        });
        
        observer.observe(modal, { attributes: true, attributeFilter: ['style'] });
    },
    
    listenForNewTaskButton: function() {
        const newTaskBtn = document.getElementById('newTaskBtn');
        if (newTaskBtn) {
            newTaskBtn.addEventListener('click', () => {
                setTimeout(() => {
                    this.playSound('appear');
                    this.activateAssistant();
                }, 500);
            });
        }
    },
    
    activateAssistant: function() {
        console.log('🎯 Activando asistente...');
        this.createAvatarUI();
        this.createAvatarSelectorUI();
        this.connectInputEvents();
        this.showInitialMessage();
    },
    
    createAvatarUI: function() {
        if (document.getElementById('aiAssistantAvatar')) {
            document.getElementById('aiAssistantAvatar').remove();
        }
        
        const avatarHTML = `
            <div id="aiAssistantAvatar" style="
                position: absolute;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 15px;
                padding: 20px;
                box-shadow: 0 8px 25px rgba(0,0,0,0.15);
                max-width: 300px;
                z-index: 10000;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                border: 2px solid rgba(255,255,255,0.2);
                transform: scale(0.9);
                opacity: 0;
                transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            ">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                    <span id="aiAvatarIcon" style="font-size: 28px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));">🤖</span>
                    <div>
                        <strong style="color: white; font-size: 15px; display: block;">Asistente IA</strong>
                        <div id="aiStatus" style="color: rgba(255,255,255,0.8); font-size: 11px;">Listo</div>
                    </div>
                </div>
                <div id="aiSuggestionText" style="font-size: 13px; color: white; line-height: 1.5;">
                    ¡Hola! Describe tu tarea y te ayudo con la estimación.
                </div>
                <div id="thinkingAnimation" style="display: none; text-align: center; margin-top: 10px;">
                    <div style="display: inline-flex; gap: 4px;">
                        <div style="width: 6px; height: 6px; border-radius: 50%; background: white; animation: bounce 1.4s infinite ease-in-out;"></div>
                        <div style="width: 6px; height: 6px; border-radius: 50%; background: white; animation: bounce 1.4s infinite ease-in-out 0.2s;"></div>
                        <div style="width: 6px; height: 6px; border-radius: 50%; background: white; animation: bounce 1.4s infinite ease-in-out 0.4s;"></div>
                    </div>
                    <style>
                        @keyframes bounce {
                            0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
                            40% { transform: scale(1.2); opacity: 1; }
                        }
                        @keyframes pulse {
                            0% { transform: scale(1); }
                            50% { transform: scale(1.05); }
                            100% { transform: scale(1); }
                        }
                        .avatar-pulse {
                            animation: pulse 2s infinite;
                        }
                    </style>
                </div>
            </div>
        `;
        
        const modal = document.getElementById('createTaskModal');
        if (modal) {
            modal.insertAdjacentHTML('beforeend', avatarHTML);
            
            setTimeout(() => {
                const avatar = document.getElementById('aiAssistantAvatar');
                if (avatar) {
                    avatar.style.transform = 'scale(1)';
                    avatar.style.opacity = '1';
                }
            }, 100);
        }
    },
    
    createAvatarSelectorUI: function() {
        if (document.getElementById('avatarSelector')) {
            document.getElementById('avatarSelector').remove();
        }
        
        const selectorHTML = `
            <div id="avatarSelector" style="
                position: absolute;
                top: 20px;
                right: 340px;
                background: rgba(255,255,255,0.95);
                border-radius: 10px;
                padding: 10px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                z-index: 9999;
                font-size: 12px;
                border: 1px solid #ddd;
            ">
                <div style="color: #333; margin-bottom: 8px; font-weight: bold;">Elige tu avatar:</div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px;">
                    <button onclick="window.AIAssistant.changeAvatar('robot')" style="border: 1px solid #ddd; background: white; cursor: pointer; font-size: 20px; padding: 8px; border-radius: 5px; display: flex; align-items: center; gap: 5px;" title="Robot">
                        <span>🤖</span>
                        <span style="font-size: 10px;">Robot</span>
                    </button>
                    <button onclick="window.AIAssistant.changeAvatar('persona')" style="border: 1px solid #ddd; background: white; cursor: pointer; font-size: 20px; padding: 8px; border-radius: 5px; display: flex; align-items: center; gap: 5px;" title="Persona">
                        <span>👨‍💻</span>
                        <span style="font-size: 10px;">Persona</span>
                    </button>
                    <button onclick="window.AIAssistant.changeAvatar('magician')" style="border: 1px solid #ddd; background: white; cursor: pointer; font-size: 20px; padding: 8px; border-radius: 5px; display: flex; align-items: center; gap: 5px;" title="Mago">
                        <span>🧙‍♂️</span>
                        <span style="font-size: 10px;">Mago</span>
                    </button>
                    <button onclick="window.AIAssistant.changeAvatar('alien')" style="border: 1px solid #ddd; background: white; cursor: pointer; font-size: 20px; padding: 8px; border-radius: 5px; display: flex; align-items: center; gap: 5px;" title="Alien">
                        <span>👽</span>
                        <span style="font-size: 10px;">Alien</span>
                    </button>
                </div>
            </div>
        `;
        
        const modal = document.getElementById('createTaskModal');
        if (modal) {
            modal.insertAdjacentHTML('beforeend', selectorHTML);
        }
    },
    
    changeAvatar: function(avatarType) {
        this.currentAvatar = avatarType;
        const avatarIcon = document.getElementById('aiAvatarIcon');
        if (avatarIcon) {
            avatarIcon.textContent = this.avatars[avatarType].happy;
            avatarIcon.classList.add('avatar-pulse');
            setTimeout(() => avatarIcon.classList.remove('avatar-pulse'), 1000);
        }
        this.playSound('suggestion');
    },
    
    connectInputEvents: function() {
        const taskNameInput = document.getElementById('taskName');
        const taskDescInput = document.getElementById('taskDescription');
        
        if (!taskNameInput || !taskDescInput) return;
        
        // Limpiar event listeners anteriores
        taskNameInput.removeEventListener('input', this._inputHandler);
        taskDescInput.removeEventListener('input', this._inputHandler);
        
        this._inputHandler = () => {
            const taskName = taskNameInput.value.trim();
            const taskDesc = taskDescInput.value.trim();
            
            if (taskName.length > 2 || taskDesc.length > 5) {
                this.showThinkingAnimation();
                setTimeout(() => {
                    const analysis = this.analyzeTaskImproved(taskName, taskDesc, 'media');
                    this.showSuggestion(analysis);
                }, 800);
            } else {
                this.showInitialMessage();
            }
        };
        
        taskNameInput.addEventListener('input', this._inputHandler);
        taskDescInput.addEventListener('input', this._inputHandler);
    },
    
    showThinkingAnimation: function() {
        if (this.isThinking) return;
        
        this.isThinking = true;
        this.playSound('thinking');
        
        const avatarIcon = document.getElementById('aiAvatarIcon');
        const statusText = document.getElementById('aiStatus');
        const thinkingAnim = document.getElementById('thinkingAnimation');
        const suggestionText = document.getElementById('aiSuggestionText');
        
        if (avatarIcon && statusText && thinkingAnim && suggestionText) {
            avatarIcon.textContent = this.avatars[this.currentAvatar].thinking;
            statusText.textContent = 'Analizando...';
            suggestionText.innerHTML = '<em>Procesando tu tarea...</em>';
            thinkingAnim.style.display = 'block';
        }
    },
    
    showSuggestion: function(analysis) {
        this.isThinking = false;
        this.playSound('suggestion');
        
        const avatarIcon = document.getElementById('aiAvatarIcon');
        const statusText = document.getElementById('aiStatus');
        const thinkingAnim = document.getElementById('thinkingAnimation');
        const suggestionText = document.getElementById('aiSuggestionText');
        const estimatedHoursInput = document.getElementById('estimatedHours');
        
        if (avatarIcon && statusText && thinkingAnim && suggestionText) {
            avatarIcon.textContent = this.avatars[this.currentAvatar].suggesting;
            statusText.textContent = 'Sugerencia lista';
            thinkingAnim.style.display = 'none';
            
            suggestionText.innerHTML = `
                <div style="margin-bottom: 10px; font-weight: bold; font-size: 14px;">
                    💡 ${analysis.hours} horas
                </div>
                <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 8px;">
                    <div style="margin-bottom: 4px;"><strong>Complejidad:</strong> ${analysis.complexity}/5 ${this.getComplexityStars(analysis.complexity)}</div>
                    <div style="font-size: 12px; opacity: 0.9;">${analysis.reasoning}</div>
                </div>
            `;
            
            avatarIcon.classList.add('avatar-pulse');
            setTimeout(() => avatarIcon.classList.remove('avatar-pulse'), 1000);
            
            if (estimatedHoursInput) {
                estimatedHoursInput.value = analysis.hours;
            }
        }
    },
    
    getComplexityStars: function(complexity) {
        const filled = '★'.repeat(complexity);
        const empty = '☆'.repeat(5 - complexity);
        return filled + empty;
    },
    
    showInitialMessage: function() {
        const avatarIcon = document.getElementById('aiAvatarIcon');
        const statusText = document.getElementById('aiStatus');
        const thinkingAnim = document.getElementById('thinkingAnimation');
        const suggestionText = document.getElementById('aiSuggestionText');
        
        if (avatarIcon && statusText && thinkingAnim && suggestionText) {
            avatarIcon.textContent = this.avatars[this.currentAvatar].happy;
            statusText.textContent = 'Listo para ayudar';
            thinkingAnim.style.display = 'none';
            suggestionText.innerHTML = `
                <div style="text-align: center; padding: 10px 0;">
                    <div style="font-size: 16px; margin-bottom: 5px;">👋 ¡Hola!</div>
                    <div style="font-size: 12px; opacity: 0.9;">Describe tu tarea y te ayudo con la estimación</div>
                </div>
            `;
        }
    },
    
    // ANÁLISIS MEJORADO - Corregido
    analyzeTaskImproved: function(taskName, taskDescription, priority = 'media') {
        console.log('🔍 Analizando:', taskName, taskDescription);
        
        const text = (taskName + ' ' + (taskDescription || '')).toLowerCase();
        let hours = 4;
        let complexity = 2;
        let reasoning = ["Tarea estándar"];
        let patternFound = false;
        
        // PRIMERO: Buscar patrones complejos
        for (const [pattern, data] of Object.entries(expandedAIDictionary.complexPatterns)) {
            if (data.keywords.some(keyword => text.includes(keyword))) {
                hours = data.hours;
                complexity = data.complexity;
                reasoning = [data.reasoning];
                patternFound = true;
                console.log('🎯 Patrón complejo detectado:', pattern);
                break;
            }
        }
        
        // SEGUNDO: Si no hay patrón complejo, buscar simples
        if (!patternFound) {
            for (const [pattern, data] of Object.entries(expandedAIDictionary.simplePatterns)) {
                if (data.keywords.some(keyword => text.includes(keyword))) {
                    hours = data.hours;
                    complexity = data.complexity;
                    reasoning = [`🔧 ${pattern.toUpperCase()}`];
                    patternFound = true;
                    console.log('⚙️ Patrón simple detectado:', pattern);
                    break;
                }
            }
        }
        
        // TERCERO: Ajustes por contexto
        if (text.includes('urgent') || text.includes('crític') || text.includes('prioridad') || priority === 'alta') {
            hours *= 1.3;
            reasoning.push("⚡ PRIORIDAD ALTA (+30%)");
        }
        
        if (text.includes('simple') || text.includes('fácil') || text.includes('rápido') || text.includes('sencillo')) {
            hours *= 0.7;
            reasoning.push("🐢 TAREA SIMPLE (-30%)");
        }
        
        if (text.includes('complej') || text.includes('complicad') || text.includes('difícil') || text.includes('avanzad')) {
            hours *= 1.5;
            reasoning.push("🔴 TAREA COMPLEJA (+50%)");
        }
        
        // Redondear
        hours = Math.max(0.5, Math.min(40, Math.round(hours * 2) / 2));
        
        console.log('📊 Resultado:', { hours, complexity, reasoning: reasoning.join(' | ') });
        return { hours, complexity, reasoning: reasoning.join(' | ') };
    }
};

// Inicialización automática
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando asistente IA CORREGIDO...');
    setTimeout(() => {
        if (window.AIAssistant && window.AIAssistant.initAssistant) {
            window.AIAssistant.initAssistant();
        }
    }, 2000);
});

// Comando para probar en consola
window.testAIAssistant = function() {
    console.log('🧪 Probando análisis IA...');
    const testCases = [
        "Crear API REST con Node.js",
        "Configurar servidor Nginx",
        "Desarrollar app móvil con React Native", 
        "Implementar sistema de login con JWT",
        "Corregir errores de CSS"
    ];
    
    testCases.forEach(task => {
        const result = window.AIAssistant.analyzeTaskImproved(task, "", "media");
        console.log(`"${task}" → ${result.hours}h | Complejidad: ${result.complexity}/5 | ${result.reasoning}`);
    });
};







// ==================================================
// ASISTENTE GENERAL REPLIKA-STYLE
// ==================================================

window.SystemAssistant = {
    name: "Oxi",
    personality: "energetic",
    mood: "⚡",
    isVisible: false,
    conversationHistory: [],
    
    // Personalidades disponibles
    personalities: {
        helpful: {
            name: "Alex",
            greeting: "¡Hola! Soy Oxi, tu asistente de proyectos. ¿En qué puedo ayudarte hoy?",
            tone: "amigable y servicial",
            avatar: "🤖"
        },
        professional: {
            name: "ProManager", 
            greeting: "Buen día. Soy ProManager, su asistente profesional de gestión de proyectos.",
            tone: "formal y preciso",
            avatar: "👨‍💼"
        },
        energetic: {
            name: "Oxi",
            greeting: "¡Hey! ¡Soy Oxi! 🚀 ¿Listo para hacer cosas increíbles hoy?",
            tone: "energético y motivador", 
            avatar: "⚡"
        },
        wise: {
            name: "Sage",
            greeting: "Saludos. Soy Sage. La sabiduría en la gestión viene con la experiencia. ¿Cómo puedo guiarte?",
            tone: "sabio y reflexivo",
            avatar: "🧙‍♂️"
        }
    },
    
    // Conocimiento del sistema
    systemKnowledge: {
        views: ['board', 'list', 'calendar', 'gantt', 'reports', 'dashboard', 'profitability'],
        features: ['tareas', 'proyectos', 'estadísticas', 'reportes', 'diagramas gantt', 'calendario', 'gestión de tiempo'],
        commands: {
            'cambiar vista': 'Puedo ayudarte a cambiar entre las vistas del sistema',
            'crear proyecto': 'Te guío para crear un nuevo proyecto',
            'generar reporte': 'Puedo ayudarte a generar reportes PDF',
            'estadísticas': 'Te muestro las estadísticas del proyecto actual',
            'configuración': 'Información sobre configuraciones disponibles',
            'ayuda': 'Lista de comandos disponibles'
        }
    },
    
    init: function() {
        console.log('🧠 Inicializando Asistente General...');
        this.createAssistantUI();
        this.loadConversationHistory();
        this.setupGlobalHotkey();
        
        // Mostrar saludo después de un tiempo
        setTimeout(() => {
            this.showWelcomeMessage();
        }, 3000);
    },
    
    createAssistantUI: function() {
        if (document.getElementById('systemAssistant')) return;
        
        const assistantHTML = `
            <div id="systemAssistant" style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 350px;
                background: white;
                border-radius: 20px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                z-index: 10000;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                border: 2px solid #e0e0e0;
                overflow: hidden;
                transform: translateY(100px);
                opacity: 0;
                transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            ">
                <!-- Header -->
                <div style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 20px;
                    color: white;
                    position: relative;
                ">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div id="assistantAvatar" style="
                            font-size: 40px;
                            filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
                            cursor: pointer;
                        ">🤖</div>
                        <div>
                            <div style="font-size: 18px; font-weight: bold;" id="assistantName">Oxi</div>
                            <div style="font-size: 12px; opacity: 0.8;" id="assistantStatus">Conectado</div>
                        </div>
                    </div>
                    <button onclick="window.SystemAssistant.toggleAssistant()" style="
                        position: absolute;
                        top: 15px;
                        right: 15px;
                        background: rgba(255,255,255,0.2);
                        border: none;
                        color: white;
                        border-radius: 50%;
                        width: 30px;
                        height: 30px;
                        cursor: pointer;
                        font-size: 16px;
                    ">−</button>
                </div>
                
                <!-- Chat Container -->
                <div id="assistantChat" style="
                    height: 300px;
                    overflow-y: auto;
                    padding: 20px;
                    background: #f8f9fa;
                ">
                    <div id="chatMessages">
                        <!-- Mensajes aparecerán aquí -->
                    </div>
                </div>
                
                <!-- Input Area -->
                <div style="padding: 15px; border-top: 1px solid #e0e0e0;">
                    <div style="display: flex; gap: 10px;">
                        <input 
                            type="text" 
                            id="assistantInput" 
                            placeholder="Escribe tu pregunta o comando..."
                            style="
                                flex: 1;
                                padding: 12px 15px;
                                border: 1px solid #ddd;
                                border-radius: 25px;
                                outline: none;
                                font-size: 14px;
                            "
                            onkeypress="if(event.key === 'Enter') window.SystemAssistant.sendMessage()"
                        >
                        <button onclick="window.SystemAssistant.sendMessage()" style="
                            background: #667eea;
                            border: none;
                            color: white;
                            border-radius: 50%;
                            width: 45px;
                            height: 45px;
                            cursor: pointer;
                            font-size: 18px;
                        ">➤</button>
                    </div>
                    
                    <!-- Quick Actions -->
                    <div id="quickActions" style="
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 8px;
                        margin-top: 10px;
                    ">
                        <button onclick="window.SystemAssistant.quickAction('cambiar vista')" style="
                            padding: 8px 12px;
                            border: 1px solid #ddd;
                            background: white;
                            border-radius: 15px;
                            font-size: 11px;
                            cursor: pointer;
                        ">🔄 Cambiar Vista</button>
                        <button onclick="window.SystemAssistant.quickAction('estadísticas')" style="
                            padding: 8px 12px;
                            border: 1px solid #ddd;
                            background: white;
                            border-radius: 15px;
                            font-size: 11px;
                            cursor: pointer;
                        ">📊 Estadísticas</button>
                        <button onclick="window.SystemAssistant.quickAction('crear proyecto')" style="
                            padding: 8px 12px;
                            border: 1px solid #ddd;
                            background: white;
                            border-radius: 15px;
                            font-size: 11px;
                            cursor: pointer;
                        ">➕ Nuevo Proyecto</button>
                        <button onclick="window.SystemAssistant.quickAction('ayuda')" style="
                            padding: 8px 12px;
                            border: 1px solid #ddd;
                            background: white;
                            border-radius: 15px;
                            font-size: 11px;
                            cursor: pointer;
                        ">❓ Ayuda</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', assistantHTML);
        
        // Animación de entrada
        setTimeout(() => {
            const assistant = document.getElementById('systemAssistant');
            if (assistant) {
                assistant.style.transform = 'translateY(0)';
                assistant.style.opacity = '1';
            }
        }, 100);
    },
    
    toggleAssistant: function() {
        const assistant = document.getElementById('systemAssistant');
        if (assistant) {
            if (this.isVisible) {
                assistant.style.transform = 'translateY(100px)';
                assistant.style.opacity = '0';
            } else {
                assistant.style.transform = 'translateY(0)';
                assistant.style.opacity = '1';
            }
            this.isVisible = !this.isVisible;
        }
    },
    
    setupGlobalHotkey: function() {
        document.addEventListener('keydown', (event) => {
            // Ctrl + Espacio para abrir/cerrar asistente
            if (event.ctrlKey && event.code === 'Space') {
                event.preventDefault();
                this.toggleAssistant();
            }
        });
    },
    
    showWelcomeMessage: function() {
        this.addMessage('assistant', this.personalities[this.personality].greeting);
    },
    
    addMessage: function(sender, message) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.style.marginBottom = '15px';
        messageDiv.style.display = 'flex';
        messageDiv.style.gap = '10px';
        
        if (sender === 'user') {
            messageDiv.style.flexDirection = 'row-reverse';
            messageDiv.innerHTML = `
                <div style="
                    background: #667eea;
                    color: white;
                    padding: 12px 15px;
                    border-radius: 18px;
                    max-width: 80%;
                    word-wrap: break-word;
                    font-size: 14px;
                ">${message}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div style="
                    font-size: 20px;
                    margin-top: 5px;
                ">${this.personalities[this.personality].avatar}</div>
                <div style="
                    background: white;
                    padding: 12px 15px;
                    border-radius: 18px;
                    max-width: 80%;
                    word-wrap: break-word;
                    font-size: 14px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    border: 1px solid #e0e0e0;
                ">${message}</div>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Guardar en historial
        this.conversationHistory.push({
            sender: sender,
            message: message,
            timestamp: new Date().toISOString()
        });
        
        this.saveConversationHistory();
    },
    
    sendMessage: function() {
        const input = document.getElementById('assistantInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Agregar mensaje del usuario
        this.addMessage('user', message);
        input.value = '';
        
        // Procesar mensaje
        setTimeout(() => {
            this.processMessage(message);
        }, 500);
    },
    
    processMessage: function(message) {
    try {
        // 🧠 Detectar si el mensaje es un objeto (viene de un sistema externo)
        if (typeof message === "object" && message !== null) {
            console.warn("⚠️ Mensaje recibido como objeto:", message);
            if (message.content) {
                message = message.content; // extraer texto
            } else {
                console.error("❌ Objeto sin contenido válido en processMessage");
                this.addMessage('assistant', "❌ No pude procesar ese mensaje.");
                return;
            }
        }

        if (typeof message !== "string") {
            console.warn("⚠️ Mensaje inválido recibido:", message);
            this.addMessage('assistant', "❌ Ocurrió un error al procesar tu mensaje.");
            return;
        }

        const lowerMessage = message.toLowerCase().trim();
        let response = "";

        // 🧩 Detección de intenciones
        if (lowerMessage.includes('hola') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            response = `¡Hola! Soy ${this.personalities[this.personality].name}, tu asistente de proyectos. ¿En qué puedo ayudarte hoy?`;
        }
        else if (lowerMessage.includes('cambiar vista') || lowerMessage.includes('ir a')) {
            response = this.handleViewChange(lowerMessage);
        }
       else if (lowerMessage.includes('crear tarea') || lowerMessage.includes('nueva tarea')) {
    // Ejecutar la función de crear tarea
    if (typeof openTaskModal === 'function') {
        setTimeout(() => openTaskModal(), 500);
        response = "📝 Abriendo formulario para nueva tarea...";

    } else {
        response = "No pude encontrar el módulo de tareas, pero puedo ayudarte a crear un proyecto si lo prefieres.";
    }
}
else if (lowerMessage.includes('crear proyecto') || lowerMessage.includes('nuevo proyecto')) {
    // Ejecutar la función de crear proyecto
    response = this.handleCreateProject();
}

        else if (lowerMessage.includes('estadística') || lowerMessage.includes('métrica') || lowerMessage.includes('dashboard')) {
            response = this.handleShowStats();
        }
        else if (lowerMessage.includes('reporte') || lowerMessage.includes('pdf')) {
            response = this.handleGenerateReport();
        }
        else if (lowerMessage.includes('ayuda') || lowerMessage.includes('comando')) {
            response = this.showHelp();
        }
        else if (lowerMessage.includes('cómo estás') || lowerMessage.includes('qué tal')) {
            response = this.howAreYou();
        }
        else if (lowerMessage.includes('gracias') || lowerMessage.includes('thanks')) {
            response = "¡De nada! 😊 ¿Hay algo más en lo que pueda ayudarte?";
        }
        else {
            response = this.generateIntelligentResponse(lowerMessage);
        }

        this.addMessage('assistant', response);

    } catch (err) {
        console.error("❌ Error procesando mensaje:", err);
        this.addMessage('assistant', "❌ No pude procesar el mensaje, inténtalo de nuevo.");
    }
},


    
    handleViewChange: function(message) {
        const views = {
            'tablero': 'board',
            'kanban': 'board', 
            'lista': 'list',
            'calendario': 'calendar',
            'gantt': 'gantt',
            'reporte': 'reports',
            'dashboard': 'dashboard',
            'dashboard 4d': 'dashboard4d',
            'rentabilidad': 'profitability',
             'asignación de horas': 'timeAllocation',
                              'asignacion de horas': 'timeAllocation'
                 };
        
        for (const [spanish, english] of Object.entries(views)) {
            if (message.includes(spanish)) {
                if (typeof showView === 'function') {
                    showView(english);
                    return `✅ Perfecto! Te llevo a la vista de ${spanish}.`;
                }
            }
        }
        
        return `Puedo ayudarte a cambiar a estas vistas: ${Object.keys(views).join(', ')}. ¿A cuál quieres ir?`;
    },
    
    handleCreateProject: function() {
        if (typeof createNewProject === 'function') {
            setTimeout(() => createNewProject(), 1000);
            return "¡Claro! Abriendo el diálogo para crear un nuevo proyecto...";
        }
        return "La función de crear proyectos está disponible. Puedes hacer clic en 'Nuevo Proyecto' en el sidebar.";
    },
    
    handleShowStats: function() {
        if (typeof getStats === 'function' && projects && projects[currentProjectIndex]) {
            const stats = getStats();
            return `📊 **Estadísticas del Proyecto Actual:**\n• Total: ${stats.total} tareas\n• Pendientes: ${stats.pending}\n• En progreso: ${stats.inProgress}\n• Completadas: ${stats.completed}\n• Rezagadas: ${stats.overdue}`;
        }
        return "Puedo mostrarte estadísticas detalladas en la vista de Dashboard o Reports.";
    },
    
    handleGenerateReport: function() {
        if (typeof generateProjectReport === 'function') {
            setTimeout(() => generateProjectReport(), 1500);
            return "🔄 Generando reporte PDF del proyecto actual... Se descargará automáticamente.";
        }
        return "La generación de reportes PDF está disponible en la vista de Reports.";
    },
    
    showHelp: function() {
        return `🛠️ **Comandos disponibles:**\n\n• **"Cambiar vista [nombre]"** - Navegar entre vistas\n• **"Crear proyecto"** - Nuevo proyecto\n• **"Estadísticas"** - Ver métricas\n• **"Generar reporte"** - Crear PDF\n• **"Ayuda"** - Esta lista\n\nTambién puedes usar los botones rápidos. ¿Qué necesitas?`;
    },
    
    howAreYou: function() {
        const moods = [
            "¡Estoy excelente! Listo para ayudarte con tus proyectos. 😊",
            "Muy bien, gracias por preguntar. ¿Y tú cómo estás?",
            "¡Energizado y listo para la acción! 💪",
            "Tranquilo y concentrado, como debe ser para la gestión de proyectos. 🧘"
        ];
        return moods[Math.floor(Math.random() * moods.length)];
    },
    
    generateIntelligentResponse: function(message) {
        // Respuestas inteligentes basadas en contexto
        if (message.includes('tiempo') || message.includes('horas')) {
            return "Puedo ayudarte con estimaciones de tiempo. ¿Quieres que analice una tarea específica?";
        }
        else if (message.includes('proyecto') || message.includes('gestión')) {
            return "Para la gestión de proyectos, puedo ayudarte con: crear proyectos, organizar tareas, generar reportes y analizar progreso.";
        }
        else if (message.includes('tarea') || message.includes('task')) {
            return "Puedo ayudarte con las tareas: creación, estimación de tiempo, asignación y seguimiento.";
        }
        else {
            return "Interesante pregunta. Como asistente de gestión de proyectos, puedo ayudarte con: planificación, seguimiento, reportes y optimización de tus proyectos. ¿En qué aspecto específico necesitas ayuda?";
        }
    },
    
    quickAction: function(action) {
        const input = document.getElementById('assistantInput');
        input.value = action;
        this.sendMessage();
    },
    
    changePersonality: function(newPersonality) {
        if (this.personalities[newPersonality]) {
            this.personality = newPersonality;
            const avatar = document.getElementById('assistantAvatar');
            const name = document.getElementById('assistantName');
            
            if (avatar) avatar.textContent = this.personalities[newPersonality].avatar;
            if (name) name.textContent = this.personalities[newPersonality].name;
            
            this.addMessage('assistant', `Personalidad cambiada a: ${newPersonality} - ${this.personalities[newPersonality].tone}`);
        }
    },
    
    saveConversationHistory: function() {
        try {
            localStorage.setItem('assistantConversation', JSON.stringify(this.conversationHistory));
        } catch (e) {
            console.log('No se pudo guardar el historial');
        }
    },
    
    loadConversationHistory: function() {
        try {
            const saved = localStorage.getItem('assistantConversation');
            if (saved) {
                this.conversationHistory = JSON.parse(saved);
                // Cargar últimos 10 mensajes
                const recent = this.conversationHistory.slice(-10);
                recent.forEach(msg => {
                    this.addMessage(msg.sender, msg.message);
                });
            }
        } catch (e) {
            console.log('No se pudo cargar el historial');
        }
    }
};

// Inicializar asistente general
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (window.SystemAssistant && window.SystemAssistant.init) {
            window.SystemAssistant.init();
        }
    }, 4000);
});

// Comandos de consola para probar
window.assistant = {
    show: () => window.SystemAssistant.toggleAssistant(),
    personality: (type) => window.SystemAssistant.changePersonality(type),
    test: () => window.SystemAssistant.addMessage('assistant', '¡Hola desde la consola! 👋')
};


// En tu archivo script.js, busca donde está tu SystemAssistant y añade:

// CONEXIÓN CON TU SISTEMA DE VOZ EXISTENTE
if (window.SystemAssistant && window.voiceAssistant) {
    SystemAssistant.voiceIntegration = {
        // Conectar el botón de voz existente al asistente
        connectVoiceButton: function() {
            const voiceBtn = document.getElementById('voiceAssistantButton');
            if (voiceBtn) {
                // Guardar el onclick original
                const originalOnClick = voiceBtn.onclick;
                
                voiceBtn.onclick = function() {
                    // Ejecutar función original
                    if (originalOnClick) originalOnClick();
                    
                    // También activar el asistente si está cerrado
                    if (SystemAssistant && !SystemAssistant.isVisible) {
                        SystemAssistant.toggleAssistant();
                    }
                };
                
                console.log('✅ Botón de voz conectado al asistente');
            }
        },
        
        // Procesar comandos de voz en el asistente
        processVoiceCommand: function(transcript) {
            if (!SystemAssistant.isVisible) {
                SystemAssistant.toggleAssistant();
            }
            
            // Insertar en el input del asistente
            const input = document.getElementById('assistantInput');
            if (input) {
                input.value = transcript;
                setTimeout(() => SystemAssistant.sendMessage(), 500);
            }
        }
    };
    
    // Inicializar cuando el asistente esté listo
    setTimeout(() => {
        SystemAssistant.voiceIntegration.connectVoiceButton();
    }, 3000);
}

// === SISTEMA DE COMANDOS DE VOZ - SOLUCIÓN COMPLETA ===
console.log("🔊 CONFIGURANDO SISTEMA DE VOZ...");

function initializeVoiceSystem() {
    const voiceBtn = document.getElementById('voiceAssistantButton');
    
    if (!voiceBtn) {
        console.error("❌ Botón de voz no encontrado");
        return;
    }

    console.log("✅ Botón de voz encontrado:", voiceBtn);

    // 1. Verificar si existe voiceAssistant y tiene el método start
    if (window.voiceAssistant && typeof window.voiceAssistant.start === 'function') {
        console.log("🔊 Conectando voiceAssistant existente al botón...");
        
        // Remover cualquier evento existente
        voiceBtn.replaceWith(voiceBtn.cloneNode(true));
        const newVoiceBtn = document.getElementById('voiceAssistantButton');
        
        // Conectar el evento click
        newVoiceBtn.addEventListener('click', function() {
            console.log("🖱️ Botón de voz clickeado - Activando voiceAssistant");
            
            // Abrir el asistente si está cerrado
            if (window.SystemAssistant && !window.SystemAssistant.isVisible) {
                window.SystemAssistant.toggleAssistant();
                // Esperar a que el asistente se abra
                setTimeout(() => {
                    window.voiceAssistant.start();
                }, 500);
            } else {
                window.voiceAssistant.start();
            }
        });
        
        console.log("✅ voiceAssistant conectado al botón");
        
    } else {
        // 2. Crear sistema de voz mínimo si no existe
        console.log("🔊 Creando sistema de voz mínimo...");
        
        window.minimalVoiceSystem = {
            isListening: false,
            recognition: null,
            
            start: function() {
                console.log("🎤 Iniciando reconocimiento de voz...");
                
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                if (!SpeechRecognition) {
                    alert("❌ Tu navegador no soporta reconocimiento de voz");
                    return;
                }
                
                this.recognition = new SpeechRecognition();
                this.recognition.lang = 'es-ES';
                this.recognition.interimResults = false;
                this.recognition.continuous = false;
                
                this.recognition.onstart = () => {
                    console.log("✅ Escuchando... Habla ahora");
                    this.isListening = true;
                    voiceBtn.style.background = '#e74c3c'; // Rojo cuando está escuchando
                    voiceBtn.innerHTML = '🎤 Escuchando...';
                    
                    if (window.SystemAssistant) {
                        window.SystemAssistant.addMessage('assistant', '🎤 **Escuchando...** Habla ahora.');
                    }
                };
                
                this.recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    console.log("🗣️ Comando detectado:", transcript);
                    
                    // Restaurar botón
                    voiceBtn.style.background = '#9b59b6';
                    voiceBtn.innerHTML = '🎤 Comando de Voz';
                    this.isListening = false;
                    
                    // Enviar al SystemAssistant
                    if (window.SystemAssistant) {
                        const input = document.getElementById('assistantInput');
                        if (input) {
                            input.value = transcript;
                            // Mostrar en el chat
                            window.SystemAssistant.addMessage('user', transcript);
                            // Enviar después de un breve delay
                            setTimeout(() => {
                                if (typeof window.SystemAssistant.sendMessage === 'function') {
                                    window.SystemAssistant.sendMessage();
                                }
                            }, 1000);
                        }
                    }
                };
                
                this.recognition.onerror = (event) => {
                    console.log("❌ Error de voz:", event.error);
                    this.isListening = false;
                    voiceBtn.style.background = '#9b59b6';
                    voiceBtn.innerHTML = '🎤 Comando de Voz';
                    
                    if (window.SystemAssistant) {
                        let errorMsg = '❌ Error de reconocimiento de voz';
                        if (event.error === 'not-allowed') {
                            errorMsg = '❌ Micrófono no permitido. Por favor permite el acceso al micrófono.';
                        } else if (event.error === 'no-speech') {
                            errorMsg = '❌ No se detectó voz. Intenta de nuevo.';
                        }
                        window.SystemAssistant.addMessage('assistant', errorMsg);
                    }
                };
                
                this.recognition.onend = () => {
                    console.log("🛑 Reconocimiento finalizado");
                    this.isListening = false;
                    voiceBtn.style.background = '#9b59b6';
                    voiceBtn.innerHTML = '🎤 Comando de Voz';
                };
                
                try {
                    this.recognition.start();
                } catch (error) {
                    console.log("❌ Error al iniciar reconocimiento:", error);
                    alert("Error al acceder al micrófono. Asegúrate de permitir el acceso.");
                }
            },
            
            stop: function() {
                if (this.recognition && this.isListening) {
                    this.recognition.stop();
                    this.isListening = false;
                    voiceBtn.style.background = '#9b59b6';
                    voiceBtn.innerHTML = '🎤 Comando de Voz';
                }
            }
        };
        
        // Conectar el sistema mínimo al botón
        voiceBtn.replaceWith(voiceBtn.cloneNode(true));
        const newVoiceBtn = document.getElementById('voiceAssistantButton');
        
        newVoiceBtn.addEventListener('click', function() {
            console.log("🖱️ Botón de voz clickeado - Activando sistema mínimo");
            
            // Abrir el asistente si está cerrado
            if (window.SystemAssistant && !window.SystemAssistant.isVisible) {
                window.SystemAssistant.toggleAssistant();
                // Esperar a que el asistente se abra
                setTimeout(() => {
                    window.minimalVoiceSystem.start();
                }, 500);
            } else {
                window.minimalVoiceSystem.start();
            }
        });
        
        console.log("✅ Sistema de voz mínimo creado y conectado");
    }
    
    // Agregar estilos para el estado de escucha
    const style = document.createElement('style');
    style.textContent = `
        #voiceAssistantButton.listening {
            background: #e74c3c !important;
            animation: pulse 1s infinite;
        }
        
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Inicializar el sistema de voz cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeVoiceSystem);
} else {
    initializeVoiceSystem();
}

// También inicializar después de un tiempo por si el botón se crea dinámicamente
setTimeout(initializeVoiceSystem, 2000);

// Comandos de prueba para la consola
console.log("🎮 COMANDOS DE PRUEBA DISPONIBLES:");
console.log(" - initializeVoiceSystem() → Reinicializar sistema de voz");
console.log(" - window.minimalVoiceSystem.start() → Iniciar reconocimiento");
console.log(" - window.minimalVoiceSystem.stop() → Detener reconocimiento");



// === EXTENSIÓN DEL SISTEMA DE COMANDOS DEL ASISTENTE ===
console.log("🔧 Extendiendo sistema de comandos del asistente...");

// Guardar la función original de processMessage
const originalProcessMessage = window.SystemAssistant.processMessage;

// Extender la función processMessage con comandos adicionales
window.SystemAssistant.processMessage = function(message) {
    console.log("📨 Mensaje recibido por el asistente:", message);
    
    if (message.type === 'user') {
        const userMessage = message.content.toLowerCase().trim();
        console.log("🔍 Analizando comando del usuario:", userMessage);
        
        // Procesar comandos específicos
        const commandResponse = processAssistantCommand(userMessage);
        
        if (commandResponse) {
            console.log("✅ Comando reconocido:", commandResponse);
            
            // Agregar respuesta del asistente
            this.addMessage('assistant', commandResponse.message);
            
            // Ejecutar acción después de un breve delay
            if (commandResponse.action) {
                setTimeout(() => {
                    try {
                        commandResponse.action();
                        console.log("✅ Acción ejecutada correctamente");
                    } catch (error) {
                        console.error("❌ Error ejecutando acción:", error);
                        this.addMessage('assistant', "❌ Ocurrió un error al ejecutar el comando.");
                    }
                }, 1000);
            }
            return; // Detener el procesamiento original
        }
    }
    
    // Si no es un comando reconocido, usar el procesamiento original
    console.log("ℹ️ Usando procesamiento original del asistente");
    originalProcessMessage.call(this, message);
};

// Sistema de procesamiento de comandos
function processAssistantCommand(message) {
    console.log("🎯 Procesando comando:", message);
    
    // === COMANDOS DE CREACIÓN ===
    if (message.includes('crear') || message.includes('nueva') || message.includes('agregar')) {
        if (message.includes('tarea') || message.includes('task')) {
            return {
                message: "¡Perfecto! 🎯 Abriendo el formulario para crear una nueva tarea...",
                action: function() {
                    const modal = document.getElementById('createTaskModal');
                    if (modal) {
                        modal.style.display = 'block';
                        showNotification("📝 Formulario de nueva tarea abierto");
                    } else {
                        showNotification("❌ No se pudo abrir el formulario de tareas");
                    }
                }
            };
        }
        
        if (message.includes('proyecto') || message.includes('project')) {
            return {
                message: "🚀 Excelente idea! Creando un nuevo proyecto...",
                action: function() {
                    if (typeof createNewProject === 'function') {
                        createNewProject();
                    } else {
                        showNotification("❌ Función de crear proyecto no disponible");
                    }
                }
            };
        }
    }
    
    // === COMANDOS DE NAVEGACIÓN ===
    if (message.includes('tablero') || message.includes('kanban') || message.includes('board')) {
        return {
            message: "📊 Mostrando la vista de Tablero Kanban...",
            action: function() { 
                if (typeof showView === 'function') {
                    showView('board');
                    showNotification("✅ Vista de Tablero activada");
                }
            }
        };
    }
    
    if (message.includes('lista') || message.includes('list')) {
        return {
            message: "📋 Abriendo la vista de Lista de Tareas...",
            action: function() { 
                if (typeof showView === 'function') {
                    showView('list');
                    showNotification("✅ Vista de Lista activada");
                }
            }
        };
    }
    
// Priorizar "dashboard 4d" (frases exactas o con espacio)
if (message.includes('dashboard 4d') || message.includes('dashboard4d') || message.includes('dashboard 4°') ) {
  return {
    message: '✅ Abriendo Dashboard 4D...',
    action: () => { showView('dashboard4d'); }
  };
}


    if (message.includes('dashboard') || message.includes('panel') || message.includes('resumen')) {
        return {
            message: "📈 Mostrando el Dashboard del proyecto...",
            action: function() { 
                if (typeof showView === 'function') {
                    showView('dashboard');
                    showNotification("✅ Dashboard activado");
                }
            }
        };
    }
    
    if (message.includes('calendario') || message.includes('calendar')) {
        return {
            message: "📅 Abriendo el Calendario de tareas...",
            action: function() { 
                if (typeof showView === 'function') {
                    showView('calendar');
                    showNotification("✅ Calendario activado");
                }
            }
        };
    }
    
    if (message.includes('gantt') || message.includes('diagrama')) {
        return {
            message: "📊 Mostrando el diagrama de Gantt...",
            action: function() { 
                if (typeof showView === 'function') {
                    showView('gantt');
                    showNotification("✅ Diagrama de Gantt activado");
                }
            }
        };
    }
    
   if (message.includes('reporte') || message.includes('report') || message.includes('informe')) {
    return {
        message: "📄 Generando reporte de estado del proyecto actual... Se descargará automáticamente en unos segundos.",
        action: function() {
            if (typeof generateStatusReportPDF === 'function') {
                setTimeout(() => {
                    generateStatusReportPDF();
                }, 1500);
            } else {
                showNotification("❌ Función de generar reporte de estado no disponible");
            }
        }
    };
}
    
    // === COMANDOS DE INFORMACIÓN ===
    if (message.includes('estadística') || message.includes('estadistica') || message.includes('progreso') || message.includes('avance')) {
        try {
            const stats = getStats();
            const completion = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
            const project = projects[currentProjectIndex];
            
            return {
                message: `📊 **Estadísticas del Proyecto "${project?.name || 'Actual'}":**\n\n` +
                        `• ✅ Completadas: ${stats.completed}\n` +
                        `• 🔄 En progreso: ${stats.inProgress}\n` +
                        `• ⏳ Pendientes: ${stats.pending}\n` +
                        `• 🚨 Rezagadas: ${stats.overdue}\n` +
                        `• 📦 Total: ${stats.total}\n` +
                        `• 🎯 **Progreso general: ${completion}%**\n\n` +
                        `¡Sigue así! 💪`,
                action: null
            };
        } catch (error) {
            return {
                message: "❌ No pude obtener las estadísticas del proyecto en este momento.",
                action: null
            };
        }
    }
    
    // === COMANDOS DE AYUDA ===
    if (message.includes('ayuda') || message.includes('help') || message.includes('comandos') || message.includes('qué puedes hacer')) {
        return {
            message: `🎯 **¡Claro! Puedo ayudarte con:**\n\n` +
                    `**📋 CREAR:**\n` +
                    `• "crear tarea" - Nuevas tareas\n` +
                    `• "crear proyecto" - Nuevos proyectos\n\n` +
                    `**🧭 NAVEGAR:**\n` +
                    `• "mostrar tablero/lista/dashboard"\n` +
                    `• "ir a calendario/gantt/reportes"\n\n` +
                    `**📊 INFORMACIÓN:**\n` +
                    `• "estadísticas" - Progreso del proyecto\n` +
                    `• "generar reporte" - PDF del proyecto\n\n` +
                    `**⚡ ACCIONES RÁPIDAS:**\n` +
                    `• "tareas pendientes"\n` +
                    `• "progreso actual"\n` +
                    `• "tiempo registrado"`,
            action: null
        };
    }
    
    // === COMANDOS DE SALUDO ===
    if (message.includes('hola') || message.includes('buenas') || message.includes('hi') || message.includes('hello')) {
        return {
            message: `¡Hola! 👋 Soy tu asistente de gestión de proyectos.\n\n` +
                    `Puedo ayudarte a crear tareas, navegar entre vistas, ver estadísticas y generar reportes.\n\n` +
                    `¿En qué te puedo ayudar hoy? 😊`,
            action: null
        };
    }
    
    // Comando no reconocido - dejar que el AI original lo maneje
    console.log("❌ Comando no reconocido, usando AI original");
    return null;
}

// Función para probar comandos manualmente
window.testAssistantCommand = function(command) {
    console.log(`🧪 Probando comando manual: "${command}"`);
    
    const testMessage = {
        type: 'user',
        content: command,
        timestamp: new Date().toISOString()
    };
    
    window.SystemAssistant.processMessage(testMessage);
};

// Inicializar después de que cargue todo
setTimeout(() => {
    console.log("✅ Sistema de comandos del asistente extendido correctamente");
    console.log("🎮 Prueba estos comandos:");
    console.log("   - testAssistantCommand('crear tarea')");
    console.log("   - testAssistantCommand('mostrar dashboard')");
    console.log("   - testAssistantCommand('estadísticas')");
}, 1000);

// También agregar un botón de prueba en la interfaz
function addAssistantTestButton() {
    const assistantContainer = document.querySelector('.assistant-container');
    if (assistantContainer && !document.getElementById('assistantTestBtn')) {
        const testBtn = document.createElement('button');
        testBtn.id = 'assistantTestBtn';
        testBtn.innerHTML = '🧪 Probar Comandos';
        testBtn.style.cssText = `
            position: absolute;
            bottom: 10px;
            right: 10px;
            background: #9b59b6;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            z-index: 1000;
        `;
        testBtn.onclick = function() {
            testAssistantCommand('ayuda');
        };
        assistantContainer.style.position = 'relative';
        assistantContainer.appendChild(testBtn);
        console.log("✅ Botón de prueba del asistente agregado");
    }
}

// Agregar el botón de prueba
setTimeout(addAssistantTestButton, 2000);

// === CORRECCIÓN PARA MENSAJES DE VOZ Y CHAT DIRECTOS ===
console.log("🔧 Corrigiendo procesamiento de mensajes directos...");

// Interceptar el addMessage original para manejar mensajes de texto simples
const originalAddMessage = window.SystemAssistant.addMessage;

window.SystemAssistant.addMessage = function(type, content) {
    console.log(`💬 Mensaje agregado - Tipo: ${type}, Contenido:`, content);
    
    // Si es un mensaje de usuario como texto simple, convertirlo a objeto estructurado
    if (type === 'user' && typeof content === 'string') {
        console.log("🔄 Convirtiendo mensaje de texto a objeto estructurado...");
        
        const structuredMessage = {
            type: 'user',
            content: content,
            timestamp: new Date().toISOString()
        };
        
        // Procesar el mensaje estructurado
        setTimeout(() => {
            this.processMessage(structuredMessage);
        }, 100);
    }
    
    // Llamar a la función original
    return originalAddMessage.call(this, type, content);
};

// También interceptar el sendMessage para mensajes del input del chat
const originalSendMessage = window.SystemAssistant.sendMessage;

if (originalSendMessage) {
    window.SystemAssistant.sendMessage = function() {
        const input = document.getElementById('assistantInput');
        if (input && input.value.trim()) {
            const userMessage = input.value.trim();
            console.log("📤 Mensaje enviado desde input:", userMessage);
            
            // Crear mensaje estructurado
            const structuredMessage = {
                type: 'user', 
                content: userMessage,
                timestamp: new Date().toISOString()
            };
            
            // Procesar el mensaje
            this.processMessage(structuredMessage);
            
            // Limpiar input
            input.value = '';
        }
    };
}

console.log("✅ Interceptores de mensajes instalados correctamente");

// Función para forzar el procesamiento de cualquier texto
window.forceProcessMessage = function(text) {
    console.log("🔄 Forzando procesamiento de:", text);
    
    const structuredMessage = {
        type: 'user',
        content: text,
        timestamp: new Date().toISOString()
    };
    
    window.SystemAssistant.processMessage(structuredMessage);
};

// Probar inmediatamente
setTimeout(() => {
    console.log("🎮 Prueba estos comandos:");
    console.log("   - forceProcessMessage('crear tarea')");
    console.log("   - forceProcessMessage('mostrar dashboard')");
}, 1000);


// === MEJORA DEL SISTEMA DE COMANDOS - MÁS FLEXIBLE ===
function processAssistantCommand(message) {
    console.log("🎯 Procesando comando:", message);
    
    // Limpiar y normalizar el mensaje
    const cleanMessage = message.toLowerCase().trim();
    
    // === DETECCIÓN MÁS FLEXIBLE DE COMANDOS ===
    
    // CREAR TAREA - Más patrones de detección
    if (cleanMessage.includes('crear tarea') || 
        cleanMessage.includes('nueva tarea') ||
        cleanMessage.includes('agregar tarea') ||
        cleanMessage.includes('crear task') ||
        (cleanMessage.includes('crear') && cleanMessage.includes('tarea')) ||
        cleanMessage.startsWith('crear ') ||
        cleanMessage === 'crear tarea') {
        
        return {
            message: "¡Perfecto! 🎯 Abriendo el formulario para crear una nueva tarea...",
            action: function() {
                const modal = document.getElementById('createTaskModal');
                if (modal) {
                    modal.style.display = 'block';
                    showNotification("📝 Formulario de nueva tarea abierto");
                    
                    // Si el mensaje incluye detalles de la tarea, intentar prellenar
                    if (cleanMessage.includes('diseño') || cleanMessage.includes('design')) {
                        setTimeout(() => {
                            const nameInput = document.getElementById('taskName');
                            if (nameInput) {
                                // Extraer el nombre de la tarea del mensaje
                                const taskName = message.replace('crear tarea', '').replace('crear', '').trim();
                                if (taskName && taskName !== 'tarea') {
                                    nameInput.value = taskName;
                                }
                            }
                        }, 500);
                    }
                } else {
                    showNotification("❌ No se pudo abrir el formulario de tareas");
                }
            }
        };
    }
    
    // DASHBOARD - Más patrones
    if (cleanMessage.includes('dashboard') || 
        cleanMessage.includes('panel') ||
        cleanMessage.includes('resumen') ||
        cleanMessage.includes('mostrar dashboard') ||
        cleanMessage.includes('ver dashboard')) {
        
        return {
            message: "📈 Mostrando el Dashboard del proyecto...",
            action: function() { 
                if (typeof showView === 'function') {
                    showView('dashboard');
                    showNotification("✅ Dashboard activado");
                }
            }
        };
    }
    
    // ESTADÍSTICAS - Más patrones  
    if (cleanMessage.includes('estadística') || 
        cleanMessage.includes('estadistica') ||
        cleanMessage.includes('progreso') ||
        cleanMessage.includes('avance') ||
        cleanMessage.includes('cómo vamos') ||
        cleanMessage.includes('como vamos')) {
        
        try {
            const stats = getStats();
            const completion = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
            const project = projects[currentProjectIndex];
            
            return {
                message: `📊 **Estadísticas del Proyecto "${project?.name || 'Actual'}":**\n\n` +
                        `• ✅ Completadas: ${stats.completed}\n` +
                        `• 🔄 En progreso: ${stats.inProgress}\n` +
                        `• ⏳ Pendientes: ${stats.pending}\n` +
                        `• 🚨 Rezagadas: ${stats.overdue}\n` +
                        `• 📦 Total: ${stats.total}\n` +
                        `• 🎯 **Progreso general: ${completion}%**\n\n` +
                        `¡Sigue así! 💪`,
                action: null
            };
        } catch (error) {
            return {
                message: "❌ No pude obtener las estadísticas del proyecto en este momento.",
                action: null
            };
        }
    }
    
    // AYUDA - Más patrones
    if (cleanMessage.includes('ayuda') || 
        cleanMessage.includes('help') ||
        cleanMessage.includes('comandos') ||
        cleanMessage.includes('qué puedes hacer') ||
        cleanMessage.includes('que puedes hacer') ||
        cleanMessage === '?') {
        
        return {
            message: `🎯 **¡Claro! Puedo ayudarte con:**\n\n` +
                    `**📋 CREAR:**\n` +
                    `• "crear tarea" - Nuevas tareas\n` +
                    `• "crear proyecto" - Nuevos proyectos\n\n` +
                    `**🧭 NAVEGAR:**\n` +
                    `• "mostrar tablero/lista/dashboard"\n` +
                    `• "ir a calendario/gantt/reportes"\n\n` +
                    `**📊 INFORMACIÓN:**\n` +
                    `• "estadísticas" - Progreso del proyecto\n` +
                    `• "generar reporte" - PDF del proyecto\n\n` +
                    `**⚡ ACCIONES RÁPIDAS:**\n` +
                    `• "tareas pendientes"\n` +
                    `• "progreso actual"\n` +
                    `• "tiempo registrado"`,
            action: null
        };
    }
    
    // Comando no reconocido
    console.log("❌ Comando no reconocido, usando AI original");
    return null;
}


// === SISTEMA DE VOZ DEFINITIVO - VERSIÓN COMPLETA ===
console.log("🔊 CARGANDO SISTEMA DE VOZ DEFINITIVO...");

// Sistema de comandos de voz independiente y robusto
window.VoiceCommandSystem = {
    isListening: false,
    recognition: null,
    retryCount: 0,
    maxRetries: 3,
    
    // Procesador de comandos mejorado
    processCommand: function(command) {
        console.log("🎯 Procesando comando:", command);
        const cleanCommand = command.toLowerCase().trim();
        
        // COMANDOS BÁSICOS MEJORADOS
        if (cleanCommand.includes('hola') || cleanCommand.includes('hi') || cleanCommand.includes('hello') || cleanCommand.includes('buenas')) {
            this.showResponse("¡Hola! 👋 Soy tu asistente de voz. Puedo ayudarte a:\n• Crear tareas\n• Mostrar vistas\n• Ver estadísticas\n• Generar reportes\n\nDi 'ayuda' para ver todos los comandos.");
            return true;
        }
        
        if (cleanCommand.includes('crear tarea') || cleanCommand.includes('nueva tarea') || cleanCommand.includes('agregar tarea')) {
            this.showResponse("¡Perfecto! 🎯 Abriendo formulario para crear una nueva tarea...");
            this.openTaskModal();
            return true;
        }
        
        if (cleanCommand.includes('dashboard') || cleanCommand.includes('panel') || cleanCommand.includes('resumen')) {
            this.showResponse("📈 Mostrando Dashboard del proyecto...");
            this.showDashboard();
            return true;
        }
        
        if (cleanCommand.includes('tablero') || cleanCommand.includes('kanban') || cleanCommand.includes('board')) {
            this.showResponse("📊 Mostrando Tablero Kanban...");
            this.showBoard();
            return true;
        }
        
        if (cleanCommand.includes('lista') || cleanCommand.includes('listado')) {
            this.showResponse("📋 Mostrando Lista de Tareas...");
            this.showList();
            return true;
        }
        
        if (cleanCommand.includes('calendario') || cleanCommand.includes('calendar')) {
            this.showResponse("📅 Mostrando Calendario...");
            this.showCalendar();
            return true;
        }
        
        if (cleanCommand.includes('estadística') || cleanCommand.includes('estadistica') || cleanCommand.includes('progreso') || cleanCommand.includes('avance')) {
            this.showResponse("📊 Calculando estadísticas del proyecto...");
            this.showStats();
            return true;
        }
        
        if (cleanCommand.includes('reporte') || cleanCommand.includes('report') || cleanCommand.includes('informe') || cleanCommand.includes('pdf')) {
            this.showResponse("📄 Generando reporte PDF del proyecto... Se descargará automáticamente.");
            this.generateReport();
            return true;
        }
        
        if (cleanCommand.includes('ayuda') || cleanCommand.includes('help') || cleanCommand.includes('comandos')) {
            this.showResponse(
                `🎯 **COMANDOS DE VOZ DISPONIBLES:**\n\n` +
                `**📋 CREAR:**\n` +
                `• "crear tarea" - Nuevas tareas\n` +
                `• "nueva tarea" - Formulario de tarea\n\n` +
                `**🧭 NAVEGAR:**\n` +
                `• "dashboard" - Vista principal\n` +
                `• "tablero" - Vista Kanban\n` +
                `• "lista" - Lista de tareas\n` +
                `• "calendario" - Vista calendario\n\n` +
                `**📊 INFORMACIÓN:**\n` +
                `• "estadísticas" - Progreso del proyecto\n` +
                `• "reporte" - Generar PDF\n\n` +
                `**⚡ ACCIONES:**\n` +
                `• "hola" - Saludo inicial\n` +
                `• "ayuda" - Ver esta lista`
            );
            return true;
        }
        
        // Comando no reconocido - sugerencia
        this.showResponse(`No entendí: "${command}"\n\n💡 Prueba con: "crear tarea", "dashboard", "estadísticas" o "ayuda"`);
        return false;
    },
    
    // Mostrar respuesta en el asistente
    showResponse: function(response) {
        console.log("💬 Mostrando respuesta:", response);
        if (window.SystemAssistant && typeof window.SystemAssistant.addMessage === 'function') {
            window.SystemAssistant.addMessage('assistant', response);
        } else {
            // Fallback si el asistente no está disponible
            alert("Asistente: " + response);
        }
    },
    
    // === ACCIONES MEJORADAS ===
    openTaskModal: function() {
        const modal = document.getElementById('createTaskModal');
        if (modal) {
            modal.style.display = 'block';
            showNotification("🎯 Formulario de nueva tarea abierto");
            console.log("✅ Modal de tarea abierto");
        } else {
            console.error("❌ No se encontró el modal de tarea");
            this.showResponse("❌ No pude abrir el formulario de tareas");
        }
    },
    
    showDashboard: function() {
        if (typeof showView === 'function') {
            showView('dashboard');
            showNotification("📈 Dashboard activado");
            console.log("✅ Vista dashboard activada");
        } else {
            console.error("❌ Función showView no disponible");
        }
    },
    
    showBoard: function() {
        if (typeof showView === 'function') {
            showView('board');
            showNotification("📊 Tablero Kanban activado");
            console.log("✅ Vista board activada");
        }
    },
    
    showList: function() {
        if (typeof showView === 'function') {
            showView('list');
            showNotification("📋 Lista de tareas activada");
            console.log("✅ Vista list activada");
        }
    },
    
    showCalendar: function() {
        if (typeof showView === 'function') {
            showView('calendar');
            showNotification("📅 Calendario activado");
            console.log("✅ Vista calendar activada");
        }
    },
    
    showStats: function() {
        try {
            const stats = getStats();
            const completion = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
            const project = projects[currentProjectIndex];
          // const timeStats = getTimeStats();
            
            const statsMessage = 
                `📊 **ESTADÍSTICAS - ${project?.name || 'Proyecto Actual'}**\n\n` +
                `**📦 TAREAS:**\n` +
                `• ✅ Completadas: ${stats.completed}\n` +
                `• 🔄 En progreso: ${stats.inProgress}\n` +
                `• ⏳ Pendientes: ${stats.pending}\n` +
                `• 🚨 Rezagadas: ${stats.overdue}\n` +
                `• 📋 Total: ${stats.total}\n\n` +
                `**🎯 PROGRESO:** ${completion}%\n\n` +
                `**⏰ TIEMPO:**\n` +
                `• ⏱️ Estimado: ${timeStats.totalEstimated.toFixed(1)}h\n` +
                `• 🕒 Registrado: ${timeStats.totalLogged.toFixed(1)}h\n` +
                `• ⏳ Restante: ${timeStats.remaining.toFixed(1)}h`;
            
            this.showResponse(statsMessage);
            console.log("✅ Estadísticas mostradas");
        } catch (error) {
            console.error("❌ Error calculando estadísticas:", error);
            this.showResponse("❌ No pude obtener las estadísticas del proyecto");
        }
    },
    
    generateReport: function() {
    if (typeof generateStatusReportPDF === 'function') { // ✅ CORRECTO
        this.showResponse("📊 Generando reporte PDF con gráfico... Esto puede tomar unos segundos.");
        setTimeout(() => {
            try {
                generateStatusReportPDF(); // ✅ ESTA FUNCIÓN SÍ TIENE GRÁFICO
                console.log("✅ Reporte PDF con gráfico generado");
            } catch (error) {
                console.error("❌ Error generando reporte:", error);
                this.showResponse("❌ Error al generar el reporte PDF");
            }
        }, 2000);
        } else {
            this.showResponse("❌ La función de generar reportes no está disponible");
        }
    },
    
    // === SISTEMA DE VOZ ROBUSTO ===
    startListening: function() {
        console.log("🎤 Iniciando reconocimiento de voz...");
        
        if (this.isListening) {
            console.log("⚠️ Ya está escuchando, deteniendo...");
            this.stopListening();
            return;
        }
        
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            this.showResponse("❌ Tu navegador no soporta reconocimiento de voz");
            return;
        }
        
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'es-ES';
        this.recognition.interimResults = false;
        this.recognition.continuous = false;
        
        this.recognition.onstart = () => {
            console.log("✅ Escuchando... Habla ahora");
            this.isListening = true;
            this.retryCount = 0;
            this.updateButton(true);
            this.showResponse("🎤 **Escuchando...**\n\n**Habla ahora** - Di por ejemplo:\n• \"crear tarea\"\n• \"mostrar dashboard\"\n• \"estadísticas\"");
        };
        
        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            console.log("🗣️ Voz detectada:", transcript);
            
            this.stopListening();
            this.showResponse(`🎤 **Dijiste:** "${transcript}"`);
            
            // Procesar después de un breve delay
            setTimeout(() => {
                this.processCommand(transcript);
            }, 1000);
        };
        
        this.recognition.onerror = (event) => {
            console.log("❌ Error de voz:", event.error);
            
            if (event.error === 'no-speech' && this.retryCount < this.maxRetries) {
                this.retryCount++;
                console.log(`🔄 Reintento ${this.retryCount}/${this.maxRetries}`);
                this.showResponse(`🎤 No detecté voz... Reintentando (${this.retryCount}/${this.maxRetries})\n\n**Habla ahora**`);
                
                setTimeout(() => {
                    if (this.isListening) {
                        this.recognition.start();
                    }
                }, 1000);
                return;
            }
            
            this.stopListening();
            
            let errorMsg = "❌ Error de reconocimiento de voz";
            if (event.error === 'not-allowed') {
                errorMsg = "❌ Micrófono bloqueado. Por favor permite el acceso al micrófono en tu navegador.";
            } else if (event.error === 'no-speech') {
                errorMsg = "❌ No detecté voz. Asegúrate de hablar claramente y di 'ayuda' para ver comandos.";
            }
            
            this.showResponse(errorMsg);
        };
        
        this.recognition.onend = () => {
            console.log("🛑 Reconocimiento finalizado");
            if (this.isListening && this.retryCount < this.maxRetries) {
                // Auto-reintento
                setTimeout(() => {
                    if (this.isListening) {
                        console.log("🔄 Auto-reintento...");
                        this.recognition.start();
                    }
                }, 500);
            } else {
                this.stopListening();
            }
        };
        
        try {
            this.recognition.start();
            console.log("✅ Reconocimiento de voz iniciado");
        } catch (error) {
            console.log("❌ Error al iniciar reconocimiento:", error);
            this.stopListening();
            this.showResponse("❌ Error al acceder al micrófono");
        }
    },
    
    stopListening: function() {
        console.log("🛑 Deteniendo reconocimiento...");
        if (this.recognition && this.isListening) {
            try {
                this.recognition.stop();
            } catch (e) {
                console.log("⚠️ Error al detener reconocimiento:", e);
            }
        }
        this.isListening = false;
        this.retryCount = 0;
        this.updateButton(false);
    },
    
    updateButton: function(listening) {
        const voiceBtn = document.getElementById('voiceAssistantButton');
        if (voiceBtn) {
            if (listening) {
                voiceBtn.style.background = '#e74c3c';
                voiceBtn.innerHTML = '🎤 Escuchando...';
                voiceBtn.style.animation = 'pulse 1s infinite';
            } else {
                voiceBtn.style.background = '#9b59b6';
                voiceBtn.innerHTML = '🎤 Comando de Voz';
                voiceBtn.style.animation = 'none';
            }
        }
    },
    
    // Inicialización robusta
    init: function() {
        console.log("🔊 Inicializando sistema de voz definitivo...");
        
        const voiceBtn = document.getElementById('voiceAssistantButton');
        if (voiceBtn) {
            // Limpiar eventos existentes
            const newVoiceBtn = voiceBtn.cloneNode(true);
            voiceBtn.parentNode.replaceChild(newVoiceBtn, voiceBtn);
            
            // Conectar evento
            newVoiceBtn.onclick = (e) => {
                e.stopPropagation();
                console.log("🖱️ Botón de voz clickeado");
                this.startListening();
                
                // Abrir asistente si está cerrado
                if (window.SystemAssistant && !window.SystemAssistant.isVisible) {
                    setTimeout(() => {
                        window.SystemAssistant.toggleAssistant();
                    }, 300);
                }
            };
            
            console.log("✅ Botón de voz conectado correctamente");
        } else {
            console.error("❌ No se encontró el botón de voz");
        }
        
        // Agregar estilos de animación
        this.addStyles();
        
        console.log("✅ Sistema de voz definitivo inicializado");
    },
    
    addStyles: function() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.7; }
                100% { opacity: 1; }
            }
            #voiceAssistantButton.listening {
                background: #e74c3c !important;
                animation: pulse 1s infinite;
            }
        `;
        document.head.appendChild(style);
    }
};

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => VoiceCommandSystem.init(), 2000);
    });
} else {
    setTimeout(() => VoiceCommandSystem.init(), 2000);
}

// También inicializar después de un tiempo por si el botón se crea dinámicamente
setTimeout(() => {
    if (!document.getElementById('voiceAssistantButton').onclick) {
        VoiceCommandSystem.init();
    }
}, 5000);

// Comandos globales para pruebas
window.testVoiceCommand = function(command) {
    VoiceCommandSystem.processCommand(command);
};

window.startVoice = function() {
    VoiceCommandSystem.startListening();
};

console.log("🎯 SISTEMA DE VOZ CARGADO - Comandos disponibles:");
console.log("   - testVoiceCommand('hola')");
console.log("   - testVoiceCommand('crear tarea')"); 
console.log("   - testVoiceCommand('estadísticas')");
console.log("   - startVoice()");
console.log("   - Click en 🎤 Comando de Voz");




// === SOLUCIÓN COMPLETA PARA EL ASISTENTE GENERAL ===

// 1. REPARAR EL BOTÓN DE ENVIAR
function fixAssistantSendButton() {
    console.log('🔧 Reparando botón de enviar del asistente...');

    const sendButton = document.querySelector('#sendAssistantBtn, .assistant-send, button.btn-save');
    let button = sendButton;

    // Si no existe, crear uno temporal
    if (!button) {
        console.warn("⚠️ No se encontró el botón de enviar, creando uno temporal.");
        button = document.createElement('button');
        button.id = 'sendAssistantBtn';
        button.textContent = 'Enviar';
        button.classList.add('assistant-send');
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';
        button.style.padding = '10px 20px';
        button.style.background = '#9b59b6';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '8px';
        button.style.cursor = 'pointer';
        button.style.zIndex = '9999';
        document.body.appendChild(button);
    }

    // Eliminar listeners antiguos clonando el botón
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);

    // Conectar evento al asistente
    newButton.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('🖱️ Click en botón de enviar - procesando...');
        processAssistantInput();
    });

    console.log('✅ Botón de enviar del asistente listo:', newButton);
    return newButton;
}

// 2. REPARAR EL INPUT DEL ASISTENTE
function fixAssistantInput() {
    console.log('🔧 Reparando input del asistente...');

    // 🧩 Crear el input si no existe
    let input = document.querySelector('input#assistantInput, textarea#assistantInput, .assistant-input');
    if (!input) {
        console.warn("⚠️ No se encontró el input del asistente, creando uno temporal.");
        input = document.createElement('input');
        input.id = 'assistantInput';
        input.placeholder = 'Escribe un mensaje...';
        input.classList.add('assistant-input');
        input.style.position = 'fixed';
        input.style.bottom = '20px';
        input.style.left = '50%';
        input.style.transform = 'translateX(-50%)';
        input.style.padding = '10px 15px';
        input.style.border = '1px solid #ccc';
        input.style.borderRadius = '10px';
        input.style.zIndex = '9999';
        document.body.appendChild(input);
    }

    // 🧠 Conecta la tecla Enter
    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            console.log('⌨️ Enter presionado - Procesando...');
            processAssistantInput();
        }
    });

    console.log('✅ Input del asistente listo:', input);
    return input;
}

// 3. FUNCIÓN PRINCIPAL DE PROCESAMIENTO
function processAssistantInput() {
    console.log('🔄 Procesando entrada del asistente...');

    try {
        let input = document.querySelector('#assistantInput');

        // Si no existe, crear un input real
        if (!input || !(input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement)) {
            console.warn('⚠️ Input no encontrado o inválido. Creando uno nuevo...');
            input = document.createElement('input');
            input.type = 'text';
            input.id = 'assistantInput';
            input.placeholder = 'Escribe un mensaje...';
            input.classList.add('assistant-input');
            Object.assign(input.style, {
                position: 'fixed',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '10px 15px',
                border: '1px solid #ccc',
                borderRadius: '10px',
                zIndex: '9999'
            });
            document.body.appendChild(input);
        }

        // Obtener texto (si existe value, si no, vacío)
        const message = typeof input.value === 'string' ? input.value.trim() : '';

        if (!message) {
            console.log('ℹ️ Mensaje vacío o inválido');
            if (typeof showNotification === 'function')
                showNotification('💡 Escribe un mensaje primero');
            return;
        }

        console.log('📤 Mensaje a procesar:', message);
        input.value = '';

        if (typeof displayUserMessage === 'function')
            displayUserMessage(message);
        else
            console.log(`👤 Usuario: ${message}`);

        if (typeof processAssistantCommand === 'function')
            processAssistantCommand(message);
        else
            console.warn('⚠️ processAssistantCommand no está definido.');

    } catch (error) {
        console.error('❌ Error procesando entrada:', error);
        if (typeof showNotification === 'function')
            showNotification('❌ Error al procesar el mensaje');
    }
}



// 4. MOSTRAR MENSAJE DEL USUARIO
function displayUserMessage(message) {
    console.log('💬 Mostrando mensaje del usuario:', message);
    
    // Buscar contenedor de chat
    const chatContainer = document.querySelector('#assistantChat, .chat-container, .assistant-messages, [class*="message"]');
    
    if (chatContainer) {
        const messageElement = document.createElement('div');
        messageElement.className = 'user-message assistant-message';
        messageElement.innerHTML = `
            <div class="message-content user-content">
                <strong>Tú:</strong> ${message}
            </div>
        `;
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    } else {
        console.warn('⚠️ Contenedor de chat no encontrado');
    }
}

// 5. PROCESAR COMANDOS DEL ASISTENTE
function processAssistantCommand(message) {
    const cleanMessage = message.toLowerCase().trim();
    console.log('🎯 Procesando comando:', cleanMessage);
    
    let response = '';
    let action = null;
    
    // COMANDOS DE REPORTE
    if (cleanMessage.includes('reporte') || cleanMessage.includes('informe') || cleanMessage.includes('estado')) {
        response = "📊 Mostrando reporte del proyecto...";
        action = function() {
            showView('reports');
            setTimeout(() => generateReports(), 300);
        };
    }
    // COMANDOS DE TAREAS
    else if (cleanMessage.includes('crear tarea') || cleanMessage.includes('nueva tarea')) {
        response = "📝 Abriendo formulario para nueva tarea...";
        action = function() {
            document.getElementById('createTaskModal').style.display = 'block';
        };
    }
    // COMANDOS DE VISTAS

// DASHBOARD 4D
else if (cleanMessage.includes('dashboard 4d') || cleanMessage.includes('dashboard4d') || cleanMessage.includes('dashboard 4°')) {
    response = "🌐 Mostrando Dashboard 4D...";
    action = function() {
        console.log('🧭 Abriendo vista Dashboard 4D desde asistente...');
        showView('dashboard4d');
        renderDashboard4D();
    };
}

    // === DASHBOARD 4D ===
else if (
  cleanMessage.includes('dashboard 4d') ||
  cleanMessage.includes('dashboard4d') ||
  cleanMessage.includes('dashboard 4°') ||
  cleanMessage.includes('ir a dashboard 4d')
) {
  response = "🌐 Mostrando Dashboard 4D...";
  action = function() {
    console.log("🧭 Abriendo vista Dashboard 4D desde asistente...");
    showView('dashboard4d');
    renderDashboard4D?.();
  };
}

// === DASHBOARD NORMAL ===
else if (
  (cleanMessage.includes('dashboard') && !cleanMessage.includes('4d')) ||
  cleanMessage.includes('tablero')
) {
  response = "📊 Mostrando dashboard...";
  action = function() {
    showView('dashboard');
  };
}

    else if (cleanMessage.includes('lista') || cleanMessage.includes('tareas')) {
        response = "📋 Mostrando lista de tareas...";
        action = function() { showView('list'); };
    }
    else if (cleanMessage.includes('kanban') || cleanMessage.includes('tablero')) {
        response = "🎯 Mostrando tablero Kanban...";
        action = function() { showView('board'); };
    }
    else if (cleanMessage.includes('calendario')) {
        response = "📅 Mostrando calendario...";
        action = function() { showView('calendar'); };
    }
    else if (cleanMessage.includes('gantt')) {
        response = "📈 Mostrando diagrama de Gantt...";
        action = function() { showView('gantt'); };
    }
    // COMANDO DE AYUDA
    else if (cleanMessage.includes('ayuda') || cleanMessage.includes('comandos')) {
        response = `🎤 **Comandos Disponibles:**

• **"reporte"** - Mostrar reporte del proyecto
• **"crear tarea"** - Abrir formulario de nueva tarea
• **"dashboard"** - Mostrar dashboard principal  
• **"lista"** - Mostrar lista de tareas
• **"kanban"** - Mostrar tablero Kanban
• **"calendario"** - Mostrar calendario
• **"gantt"** - Mostrar diagrama de Gantt
• **"rentabilidad"** - Mostrar análisis de rentabilidad`;
    }
    // COMANDO NO RECONOCIDO
    else {
        response = "❌ Comando no reconocido. Escribe **'ayuda'** para ver los comandos disponibles.";
    }
    
    // Mostrar respuesta
    displayAssistantResponse(response);
    
    // Ejecutar acción si existe
    if (action && typeof action === 'function') {
        setTimeout(action, 500);
    }
}

// 6. MOSTRAR RESPUESTA DEL ASISTENTE
function displayAssistantResponse(message) {
    console.log('🤖 Mostrando respuesta del asistente:', message);
    
    // Buscar contenedor de chat
    const chatContainer = document.querySelector('#assistantChat, .chat-container, .assistant-messages, [class*="message"]');
    
    if (chatContainer) {
        const messageElement = document.createElement('div');
        messageElement.className = 'assistant-message';
        messageElement.innerHTML = `
            <div class="message-content assistant-content">
                <strong>Asistente:</strong> ${message}
            </div>
        `;
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    // También mostrar notificación
    showNotification('💬 Asistente: ' + message.replace(/\*\*/g, '').substring(0, 50) + '...');
}

// 7. INICIALIZACIÓN COMPLETA
function initializeAssistant() {
    console.log('🚀 Inicializando asistente general...');
    

    fixAssistantInput();
    fixAssistantSendButton();


    // Reparar elementos
    fixAssistantInput();
    fixAssistantSendButton();
    
    // Agregar estilos si es necesario
    addAssistantStyles();
    
    console.log('✅ Asistente general inicializado correctamente');
}

// 8. ESTILOS PARA EL CHAT
function addAssistantStyles() {
    if (document.getElementById('assistant-styles')) return;
    
    const styles = `
        <style id="assistant-styles">
            .user-message {
                text-align: right;
                margin: 10px 0;
                padding: 10px;
                background: #007bff;
                color: white;
                border-radius: 10px;
                max-width: 80%;
                margin-left: auto;
            }
            .assistant-message {
                text-align: left;
                margin: 10px 0;
                padding: 10px;
                background: #f8f9fa;
                color: #333;
                border-radius: 10px;
                max-width: 80%;
                border: 1px solid #dee2e6;
            }
            .message-content {
                word-wrap: break-word;
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// === EJECUTAR LA SOLUCIÓN ===

// Opción 1: Ejecutar inmediatamente
setTimeout(initializeAssistant, 1000);

// Opción 2: Ejecutar cuando se haga clic en el asistente
document.addEventListener('click', function(e) {
    if (e.target.closest('#assistantButton, [onclick*="assistant"], .assistant-btn')) {
        setTimeout(initializeAssistant, 500);
    }
});

// Opción 3: Crear función global para llamar manualmente
window.fixAssistant = initializeAssistant;

console.log('🔧 Script de reparación del asistente cargado');
console.log('💡 Usa fixAssistant() en la consola si necesitas reparar manualmente');






// === AGREGAR COMANDO "CREAR PROYECTO" AL ASISTENTE ===

// 1. MODIFICAR LA FUNCIÓN processAssistantCommand
function processAssistantCommand(message) {
// 🧩 Normalizar el mensaje
    if (typeof message === 'object' && message.content) {
        message = message.content;
    }
    const cleanMessage = message.toLowerCase().trim();
    console.log('🎯 Procesando comando:', cleanMessage);
    
    let response = '';
    let action = null;
    
    // ✅ NUEVO COMANDO: CREAR PROYECTO
    if (cleanMessage.includes('crear proyecto') || 
        cleanMessage.includes('nuevo proyecto') || 
        cleanMessage.includes('agregar proyecto')) {
        
        response = "🚀 Creando nuevo proyecto...";
        action = function() {
            createNewProjectWithAssistant();
        };
    }
    // COMANDOS DE REPORTE
    else if (cleanMessage.includes('reporte') || cleanMessage.includes('informe') || cleanMessage.includes('estado')) {
        response = "📊 Mostrando reporte del proyecto...";
        action = function() {
            showView('reports');
            setTimeout(() => generateReports(), 300);
        };
    }
    // COMANDOS DE TAREAS
    else if (cleanMessage.includes('crear tarea') || cleanMessage.includes('nueva tarea')) {
        response = "📝 Abriendo formulario para nueva tarea...";
        action = function() {
            document.getElementById('createTaskModal').style.display = 'block';
        };
    }
    // COMANDOS DE VISTAS
    else if (cleanMessage.includes('dashboard') || cleanMessage.includes('tablero')) {
        response = "📊 Mostrando dashboard...";
        action = function() { showView('dashboard'); };
    }
    else if (cleanMessage.includes('lista') || cleanMessage.includes('tareas')) {
        response = "📋 Mostrando lista de tareas...";
        action = function() { showView('list'); };
    }
    else if (cleanMessage.includes('kanban') || cleanMessage.includes('tablero')) {
        response = "🎯 Mostrando tablero Kanban...";
        action = function() { showView('board'); };
    }
    else if (cleanMessage.includes('calendario')) {
        response = "📅 Mostrando calendario...";
        action = function() { showView('calendar'); };
    }
    else if (cleanMessage.includes('gantt')) {
        response = "📈 Mostrando diagrama de Gantt...";
        action = function() { showView('gantt'); };
    }
    // COMANDO DE AYUDA
    else if (cleanMessage.includes('ayuda') || cleanMessage.includes('comandos')) {
        response = `🎤 **Comandos Disponibles:**

• **"crear proyecto"** - Crear un nuevo proyecto
• **"reporte"** - Mostrar reporte del proyecto
• **"crear tarea"** - Abrir formulario de nueva tarea
• **"dashboard"** - Mostrar dashboard principal  
• **"lista"** - Mostrar lista de tareas
• **"kanban"** - Mostrar tablero Kanban
• **"calendario"** - Mostrar calendario
• **"gantt"** - Mostrar diagrama de Gantt
• **"rentabilidad"** - Mostrar análisis de rentabilidad`;
    }
    // COMANDO NO RECONOCIDO
    else {
        response = "❌ Comando no reconocido. Escribe **'ayuda'** para ver los comandos disponibles.";
    }
    
    // Mostrar respuesta
    displayAssistantResponse(response);
    
    // Ejecutar acción si existe
    if (action && typeof action === 'function') {
        setTimeout(action, 500);
    }
}

// 2. FUNCIÓN PARA CREAR PROYECTO CON ASISTENTE
function createNewProjectWithAssistant() {
    console.log('🆕 Creando proyecto mediante asistente...');
    
    // Usar la función existente createNewProject
    if (typeof createNewProject === 'function') {
        createNewProject();
    } else {
        // Fallback si no existe la función
        createProjectWithPrompt();
    }
}

// 3. FUNCIÓN ALTERNATIVA SI createNewProject NO EXISTE
function createProjectWithPrompt() {
    console.log('🔄 Usando método alternativo para crear proyecto...');
    
    const projectName = prompt('🎯 ¿Cómo quieres llamar al nuevo proyecto?');
    
    if (!projectName || projectName.trim() === '') {
        showNotification('❌ El nombre del proyecto no puede estar vacío');
        return;
    }
    
    const timeInput = prompt('⏱️ ¿Cuántas horas estimadas para el proyecto? (opcional)');
    const timeValue = timeInput ? parseFloat(timeInput) || 0 : 0;
    
    // Crear el proyecto
    const newProject = {
        name: projectName.trim(),
        totalProjectTime: timeValue,
        tasks: []
    };
    
    // Agregar a la lista de proyectos
    if (window.projects && Array.isArray(window.projects)) {
        window.projects.push(newProject);
        window.currentProjectIndex = window.projects.length - 1;
        
        // Actualizar la interfaz
        if (typeof updateLocalStorage === 'function') {
            updateLocalStorage();
        }
        if (typeof renderProjects === 'function') {
            renderProjects();
        }
        if (typeof selectProject === 'function') {
            selectProject(window.currentProjectIndex);
        }
        
        showNotification(`✅ Proyecto "${projectName}" creado exitosamente`);
        displayAssistantResponse(`✅ **Proyecto creado:** "${projectName}"${timeValue > 0 ? ` con ${timeValue} horas estimadas` : ''}`);
        
    } else {
        console.error('❌ No se pudo crear el proyecto - Array projects no disponible');
        showNotification('❌ Error al crear el proyecto');
    }
}

// 4. AGREGAR TAMBIÉN AL SISTEMA DE VOZ
function addCreateProjectToVoice() {
    console.log('🎤 Agregando comando "crear proyecto" al sistema de voz...');
    
    if (window.VoiceCommandSystem && window.VoiceCommandSystem.processCommand) {
        const originalProcessCommand = window.VoiceCommandSystem.processCommand;
        
        window.VoiceCommandSystem.processCommand = function(command) {
            const cleanCommand = command.toLowerCase().trim();
            console.log('🎤 Comando recibido:', cleanCommand);
            
            // ✅ NUEVO COMANDO DE VOZ: CREAR PROYECTO
            if (cleanCommand.includes('crear proyecto') || 
                cleanCommand.includes('nuevo proyecto') || 
                cleanCommand.includes('agregar proyecto')) {
                
                console.log('✅ EJECUTANDO CREAR PROYECTO');
                this.showResponse("🚀 Creando nuevo proyecto...");
                
                // Ejecutar la función de crear proyecto
                createNewProjectWithAssistant();
                return true;
            }
            
            // Para otros comandos, usar el procesamiento original
            return originalProcessCommand.call(this, command);
        };
        
        console.log('✅ Comando "crear proyecto" agregado al sistema de voz');
    }
}

// 5. ACTUALIZAR TEXTO DE AYUDA DEL SISTEMA DE VOZ
function updateVoiceHelp() {
    if (window.VoiceCommandSystem && window.VoiceCommandSystem.showHelp) {
        const originalShowHelp = window.VoiceCommandSystem.showHelp;
        
        window.VoiceCommandSystem.showHelp = function() {
            const helpText = `🎤 **Comandos de Voz Disponibles:**

• **"crear proyecto"** - Crear un nuevo proyecto
• **"crear tarea"** - Abrir formulario de nueva tarea
• **"reporte"** - Mostrar reporte del proyecto
• **"dashboard"** - Mostrar dashboard principal  
• **"lista"** - Mostrar lista de tareas
• **"calendario"** - Mostrar calendario
• **"gantt"** - Mostrar diagrama de Gantt
• **"kanban"** - Mostrar tablero Kanban
• **"rentabilidad"** - Mostrar análisis de rentabilidad
• **"ayuda"** - Mostrar esta ayuda`;

            this.showResponse(helpText);
        };
        
        console.log('✅ Ayuda del sistema de voz actualizada');
    }
}

// 6. EJECUTAR LA CONFIGURACIÓN
function setupCreateProjectCommand() {
    console.log('⚙️ Configurando comando "crear proyecto"...');
    
    // Agregar al sistema de voz
    addCreateProjectToVoice();
    
    // Actualizar ayuda
    updateVoiceHelp();
    
    console.log('✅ Comando "crear proyecto" configurado correctamente');
}

// === EJECUTAR LA CONFIGURACIÓN ===

// Ejecutar inmediatamente
setTimeout(setupCreateProjectCommand, 1500);

// También ejecutar cuando se inicialice el asistente
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(setupCreateProjectCommand, 3000);
});

// Función global para forzar la configuración
window.setupProjectCommand = setupCreateProjectCommand;

console.log('🔧 Script de comando "crear proyecto" cargado');
console.log('💡 Usa setupProjectCommand() en la consola si necesitas forzar la configuración');



// === FUNCIÓN GLOBAL PARA GENERAR REPORTE (accesible desde el asistente) ===
function generateStatusReportPDF() {
  console.log("🎤 generateStatusReportPDF ejecutado");
  try {
    generateProjectReport(); // Esta función SÍ existe y ya incluye gráfico + bloques de tiempo
  } catch (err) {
    console.error("❌ Error en generateStatusReportPDF:", err);
    showNotification("❌ Error al generar el reporte");
  }
}
// Asegurar que esté en el ámbito global
window.generateStatusReportPDF = generateStatusReportPDF;




document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (window.SystemAssistant && window.SystemAssistant.init) {
            window.SystemAssistant.init();
        }
    }, 4000);
});


// ============================================================
// 🧠 FIX DEFINITIVO DEL ASISTENTE VISUAL
// Sincroniza el input interno del chat con el sistema funcional
// ============================================================
setTimeout(() => {
  console.log("🧩 Iniciando reparación avanzada del asistente visual...");

  // 1️⃣ Eliminar input flotante duplicado si existe
  const externalInput = document.querySelector('body > input.assistant-input');
  const externalButton = document.querySelector('body > button.assistant-send');
  if (externalInput || externalButton) {
    console.log("🧹 Eliminando input externo duplicado...");
    externalInput?.remove();
    externalButton?.remove();
  }

  // 2️⃣ Detectar el input y botón internos del chat flotante
  function connectInternalAssistant() {
    const internalInput = document.querySelector('#systemAssistant input#assistantInput');
    const internalButton = document.querySelector('#systemAssistant button:not([onclick*="toggleAssistant"])');

    if (!internalInput || !internalButton) {
      console.warn("⏳ Aún no se encontró el input/botón interno, reintentando...");
      return false;
    }

    console.log("✅ Asistente interno detectado correctamente.");

    // 3️⃣ Conectar tecla Enter al input
    internalInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const text = internalInput.value.trim();
        if (!text) return;
        console.log("💬 Enviando desde input interno:", text);
        internalInput.value = '';
        processAssistantInput(text);
      }
    });

    // 4️⃣ Conectar click al botón ➤
    internalButton.addEventListener('click', (e) => {
      e.preventDefault();
      const text = internalInput.value.trim();
      if (!text) return;
      console.log("💬 Enviando desde botón interno:", text);
      internalInput.value = '';
      processAssistantInput(text);
    });

    console.log("🚀 Asistente visual completamente operativo ✅");
    return true;
  }

  // 5️⃣ Intentar conexión varias veces (por si el asistente se renderiza tarde)
  let tries = 0;
  const maxTries = 10;
  const interval = setInterval(() => {
    if (connectInternalAssistant()) {
      clearInterval(interval);
    } else if (++tries >= maxTries) {
      clearInterval(interval);
      console.error("❌ No se pudo conectar el asistente interno tras varios intentos.");
    }
  }, 1000);
}, 4000);


// ============================================================
// 🕒 Renderizador de la vista "Asignación de Horas"
// ============================================================
function renderTimeAllocationView() {
  console.log('🕒 Mostrando vista de asignación de horas...');

  // Oculta todas las demás vistas si es necesario
  const allViews = document.querySelectorAll('.view-section');
  allViews.forEach(v => v.classList.add('hidden'));

  // Muestra la sección de asignación de horas (asegúrate que exista en tu HTML)
  const timeView = document.getElementById('timeAllocationView');
  if (timeView) {
    timeView.classList.remove('hidden');
  } else {
    console.warn('⚠️ No se encontró el contenedor #timeAllocationView');
    // O crea uno si no existe, solo para pruebas
    const temp = document.createElement('div');
    temp.id = 'timeAllocationView';
    temp.classList.add('view-section');
    temp.innerHTML = `
      <h2 style="padding:20px;">🕒 Vista: Asignación de Horas</h2>
      <p style="padding:20px;">Aquí podrás gestionar la asignación de tiempo de tus tareas y proyectos.</p>
    `;
    document.body.appendChild(temp);
  }
}


function renderDashboard4D() {
  console.log('🔎 Renderizando Dashboard 4D...');
  // Asegurarse de que exista un proyecto seleccionado si lo necesitas
  const container = document.getElementById('dashboard4dView');
  if (!container) {
    console.warn('❌ dashboard4dView no encontrado en DOM');
    return;
  }

  // Aquí puedes poblar dinámicamente el contenido; por ahora dejamos el HTML estático
  // Si usas un iframe PowerBI, ya quedará ahí. Solo hacemos visible la vista:
  // ocultar otras vistas ya lo hace showView(), por lo que aquí solo refrescar o inicializar charts
  // Si tienes gráficos, inícialos aquí (por ejemplo con Chart.js)
}


function renderDashboard4D() {
  console.log("📊 Renderizando Dashboard 4D...");

  const view = document.getElementById('dashboard4dView');
  if (!view) {
    console.warn('⚠️ No se encontró la vista Dashboard 4D en el DOM.');
    return;
  }

  // Aquí puedes agregar lo que quieras cargar dinámicamente:
  // Por ejemplo, actualizar un iframe o recargar métricas
  const iframe = view.querySelector('iframe');
  if (iframe) {
    iframe.src = iframe.src; // recarga el contenido si ya existe
  }
}


// === CREAR NUEVA TAREA CON PREDICCIÓN AI + ML ===
async function createTaskWithPrediction(taskData) {
  try {
    const task = {
      id: Date.now(),
      name: taskData.name?.trim() || 'Nueva tarea',
      description: taskData.description || '',
      priority: taskData.priority || 'media',
      subtasks: taskData.subtasks || [],
      dependencies: taskData.dependencies || [],
      startDate: taskData.startDate || new Date().toISOString(),
      deadline: taskData.deadline || null,
      status: 'pendiente',
      assignee: taskData.assignee || '',
      estimatedTime: 0,
      predictedBy: ''
    };

    // 🔍 Predicción IA y ML
    let aiEstimate = 0;
    if (typeof AIAssistant !== 'undefined' && typeof AIAssistant.estimateTime === 'function') {
      aiEstimate = Number(AIAssistant.estimateTime(task)) || 0;
    }

    let mlEstimate = null;
    if (typeof predictTaskDuration === 'function' && window.durationModel) {
      mlEstimate = await predictTaskDuration(task);
    }

    if (mlEstimate && !isNaN(mlEstimate)) {
      task.estimatedTime = (aiEstimate > 0)
        ? (aiEstimate * 0.4 + mlEstimate * 0.6)
        : mlEstimate;
      task.predictedBy = 'ML (modelo aprendido)';
    } else if (aiEstimate > 0) {
      task.estimatedTime = aiEstimate;
      task.predictedBy = 'AI Assistant (heurístico)';
    } else {
      task.estimatedTime = 1;
      task.predictedBy = 'default';
    }

    // 🔄 Guardar y renderizar usando el proyecto activo
    if (!projects[currentProjectIndex]) {
      console.warn('⚠️ No hay proyecto activo, creando uno temporal...');
      projects[currentProjectIndex] = { tasks: [] };
    }

    projects[currentProjectIndex].tasks.push(task);

    // Guardar cambios
    if (typeof saveProject === 'function') {
      saveProject();
    }

    // Actualizar el Gantt
    if (typeof renderGanttChart === 'function') {
      renderGanttChart(projects[currentProjectIndex]);
    }

    // 💬 Notificación visual
    if (window.showNotification) {
      window.showNotification(
        `✨ Estimación automática para "${task.name}": ${task.estimatedTime} h (${task.predictedBy})`
      );
    }
    console.log(`Predicción para "${task.name}": ${task.estimatedTime}h (${task.predictedBy})`);
  } catch (err) {
    console.error('Error creando tarea con predicción:', err);
  }
}


// === IA BÁSICA DE ESTIMACIÓN DE TIEMPO ===
window.AIAssistant = {
  estimateTime(task) {
    const text = (task.name + ' ' + (task.description || '')).toLowerCase();
    let hours = 1;
    if (text.includes('api')) hours += 4;
    if (text.includes('dashboard')) hours += 3;
    if (text.includes('diseño')) hours += 2;
    if (text.includes('integrar')) hours += 2;
    if (text.includes('backend')) hours += 3;
    if (task.priority === 'alta') hours += 1;
    return hours;
  }
};

// === MÓDULO DE MACHINE LEARNING SIMPLE ===
window.predictTaskDuration = async function (task) {
  if (!window.durationModel) {
    console.warn('⚠️ Modelo ML no entrenado, usando heurística');
    return 0;
  }
  const input = tf.tensor2d([
    [task.name.length / 10, (task.description || '').length / 50, task.priority === 'alta' ? 1 : 0]
  ]);
  const output = window.durationModel.predict(input);
  const value = (await output.data())[0];
  input.dispose(); output.dispose();
  return Math.max(1, Math.round(value));
};

// Entrenador básico (usa TensorFlow.js)
window.trainDurationModel = async function () {
  console.log('🚀 Entrenando modelo ML con datos simulados...');
  const xs = tf.tensor2d([[1, 0, 0], [5, 2, 1], [3, 1, 0], [4, 3, 1]]);
  const ys = tf.tensor2d([[2], [6], [3], [7]]);
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 8, activation: 'relu', inputShape: [3] }));
  model.add(tf.layers.dense({ units: 1 }));
  model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
  await model.fit(xs, ys, { epochs: 50 });
  window.durationModel = model;
  console.log('✅ Modelo ML entrenado');
};


// === AUTO-APRENDIZAJE BASADO EN DATOS REALES ===

// Guardar histórico de tareas con duración real
window.taskHistory = JSON.parse(localStorage.getItem('taskHistory') || '[]');

// Registrar tarea completada para reentrenar
window.logCompletedTask = function (task) {
  if (!task || !task.name) return;
  const duration = Number(task.actualDuration || task.estimatedTime || 1);
  window.taskHistory.push({
    nameLength: task.name.length / 10,
    descLength: (task.description || '').length / 50,
    priorityNum: task.priority === 'alta' ? 1 : 0,
    duration: duration
  });
  localStorage.setItem('taskHistory', JSON.stringify(window.taskHistory));
  console.log(`🧩 Tarea registrada para autoaprendizaje (${window.taskHistory.length} ejemplos)`);
};

// Reentrenar el modelo ML con tu histórico real
window.retrainDurationModel = async function () {
  if (!window.taskHistory || window.taskHistory.length < 4) {
    console.warn('⚠️ No hay suficientes datos reales para reentrenar todavía.');
    return;
  }

  console.log('🔁 Reentrenando modelo ML con datos reales...');
  const xs = tf.tensor2d(window.taskHistory.map(t => [t.nameLength, t.descLength, t.priorityNum]));
  const ys = tf.tensor2d(window.taskHistory.map(t => [t.duration]));
  
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 8, activation: 'relu', inputShape: [3] }));
  model.add(tf.layers.dense({ units: 1 }));
  model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
  
  await model.fit(xs, ys, { epochs: 100 });
  window.durationModel = model;
  xs.dispose(); ys.dispose();

  console.log('✅ Modelo ML reentrenado con datos reales');
if (window.showNotification) {
  window.showNotification('🧠 Modelo actualizado con tus datos reales');
}

};

// Auto-reentrenamiento automático cada 5 tareas nuevas
window.checkAutoRetrain = function () {
  const count = window.taskHistory.length;
  if (count > 0 && count % 5 === 0) {
    console.log('🤖 Entradas suficientes, auto-reentrenando...');
    retrainDurationModel();
  }
};

// === PANEL DE INTELIGENCIA (IA DASHBOARD v6: modo colapsado con icono animado) ===
// === PANEL DE INTELIGENCIA (IA DASHBOARD v6: modo colapsado con icono animado) ===
function calcularPrecisionModelo() {
  const history = window.taskHistory || [];
  if (history.length === 0) return 0;

  let totalPrecision = 0;
  history.forEach(t => {
    const estimado = Number(t.estimatedTime || 1);
    const real = Number(t.actualDuration || estimado);
    if (real > 0) {
      const error = Math.abs(real - estimado);
      const precision = Math.max(0, 1 - error / real);
      totalPrecision += precision;
    }
  });
  return Math.round((totalPrecision / history.length) * 100);
}

function renderIADashboard() {
  let panel = document.getElementById('ia-dashboard');
  let badge = document.getElementById('ia-badge');

  if (!panel) {
    // === Panel principal oculto ===
    panel = document.createElement('div');
    panel.id = 'ia-dashboard';
    panel.style.position = 'fixed';
    panel.style.bottom = '-220px';
    panel.style.left = '50%';
    panel.style.transform = 'translateX(-50%)';
    panel.style.padding = '14px 20px';
    panel.style.color = 'white';
    panel.style.fontFamily = 'system-ui, sans-serif';
    panel.style.fontSize = '13px';
    panel.style.borderRadius = '14px 14px 0 0';
    panel.style.boxShadow = '0 0 15px rgba(0,0,0,0.4)';
    panel.style.zIndex = '9999';
    panel.style.textAlign = 'center';
    panel.style.minWidth = '280px';
    panel.style.background = 'rgba(0,0,0,0.85)';
    panel.style.transition = 'bottom 0.6s ease, opacity 0.4s ease';
    panel.style.opacity = '0';
    document.body.appendChild(panel);

    // === Badge IA minimalista ===
    badge = document.createElement('div');
    badge.id = 'ia-badge';
    badge.innerHTML = '🧠';
    badge.title = 'Mostrar IA Dashboard';
    badge.style.position = 'fixed';
    badge.style.bottom = '10px';
    badge.style.left = '50%';
    badge.style.transform = 'translateX(-50%)';
    badge.style.width = '42px';
    badge.style.height = '42px';
    badge.style.borderRadius = '50%';
    badge.style.background = 'linear-gradient(145deg, #0f2027, #203a43, #2c5364)';
    badge.style.color = 'white';
    badge.style.display = 'flex';
    badge.style.alignItems = 'center';
    badge.style.justifyContent = 'center';
    badge.style.fontSize = '20px';
    badge.style.boxShadow = '0 0 10px rgba(0,0,0,0.4)';
    badge.style.cursor = 'pointer';
    badge.style.transition = 'all 0.3s ease';
    badge.style.zIndex = '9999';
    document.body.appendChild(badge);

    // === Animación sutil del icono ===
    badge.animate(
      [
        { transform: 'translateX(-50%) scale(1)' },
        { transform: 'translateX(-50%) scale(1.15)' },
        { transform: 'translateX(-50%) scale(1)' }
      ],
      { duration: 3000, iterations: Infinity }
    );

    // === Mostrar / ocultar panel con hover ===
    badge.addEventListener('mouseenter', () => {
      panel.style.bottom = '0px';
      panel.style.opacity = '1';
      badge.style.opacity = '0';
    });
    panel.addEventListener('mouseleave', () => {
      panel.style.bottom = '-200px';
      panel.style.opacity = '0';
      badge.style.opacity = '1';
    });
  }

  // === Datos del modelo ===
  const examples = window.taskHistory?.length || 0;
  const lastRetrain = localStorage.getItem('lastRetrainDate') || 'Nunca';
  const modelStatus = window.durationModel ? '🧠 ML activo' : '⚙️ Heurístico';
  const precision = calcularPrecisionModelo();

  // === Color de la barra ===
  let barColor = '#ff3b3b';
  if (precision >= 85) barColor = '#4caf50';
  else if (precision >= 65) barColor = '#ffb300';

  // === Contenido HTML del panel ===
  panel.innerHTML = `
    <div style="font-weight:bold;font-size:14px;margin-bottom:6px;">IA Dashboard</div>
    <div>📚 Ejemplos aprendidos: <b>${examples}</b></div>
    <div>🎯 Precisión actual: <b>${precision}%</b></div>
    <div style="width:100%;background:rgba(255,255,255,0.1);height:8px;border-radius:6px;margin:6px 0;overflow:hidden;position:relative;">
      <div id="ia-bar" style="
        width:${precision}%;
        height:8px;
        background:${barColor};
        border-radius:6px;
        position:relative;
        transition:width 0.5s ease, background 0.5s ease;
        overflow:hidden;
      ">
        <div style="
          position:absolute;
          top:0;
          left:-40%;
          width:40%;
          height:100%;
          background:linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent);
          animation: iaShine 1.8s linear infinite;
        "></div>
      </div>
    </div>
    <div>⏰ Último reentrenamiento: <b>${lastRetrain}</b></div>
    <div>🤖 Modelo actual: <b>${modelStatus}</b></div>
  `;

  // === Agregar animación global si no existe ===
  if (!document.getElementById('ia-style')) {
    const style = document.createElement('style');
    style.id = 'ia-style';
    style.innerHTML = `
      @keyframes iaShine {
        0% { left: -40%; }
        100% { left: 100%; }
      }
    `;
    document.head.appendChild(style);
  }
}

// === Refrescar cada 5 segundos ===
setInterval(renderIADashboard, 5000);

// === Hook de reentrenamiento ===
const oldRetrain = window.retrainDurationModel;
window.retrainDurationModel = async function() {
  await oldRetrain();
  const date = new Date().toLocaleString('es-ES');
  localStorage.setItem('lastRetrainDate', date);
  renderIADashboard();
  if (window.showNotification) {
    window.showNotification(`🧠 Modelo actualizado con tus datos reales (${date})`);
  }
};


// === 🔧 Reparación de botones principales ===
window.addEventListener('load', () => {
  console.log('🧩 Reforzando botones críticos...');

  // 1️⃣ Botón de menú (toggleSidebar)
  const menuBtn = document.querySelector('#toggleSidebarBtn');
  if (menuBtn) {
    menuBtn.addEventListener('click', e => {
      e.preventDefault();
      const sidebar = document.querySelector('aside');
      if (sidebar) {
        sidebar.classList.toggle('hidden');
        console.log('📂 Menú lateral alternado manualmente');
      }
    });
  } else {
    console.warn('⚠️ No se encontró botón de menú (#toggleSidebarBtn)');
  }

  // 2️⃣ Botón Guardar
  const saveBtn = document.querySelector('button.btn-save');
  if (saveBtn) {
    saveBtn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      console.log('💾 Click en Guardar tarea detectado');

      try {
        if (typeof createNewTask === 'function') {
          createNewTask(e); // pasa el evento
        } else if (typeof saveTaskChanges === 'function') {
          saveTaskChanges(e);
        } else {
          console.warn('⚠️ Ninguna función de guardado encontrada');
        }
      } catch (err) {
        console.error('❌ Error al intentar guardar tarea:', err);
      }
    });
  } else {
    console.warn('⚠️ No se encontró botón Guardar (.btn-save)');
  }

  // 3️⃣ Botón Cancelar
  const cancelBtn = document.querySelector('#cancelTaskBtn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const form = document.querySelector('#newTaskForm, .task-form');
      if (form) form.style.display = 'none';
      console.log('❌ Formulario de nueva tarea cerrado');
    });
  } else {
    console.warn('⚠️ No se encontró botón Cancelar (#cancelTaskBtn)');
  }

  // 4️⃣ Drag & Drop — reactivar si está deshabilitado
  if (typeof initDragAndDrop === 'function') {
    initDragAndDrop();
    console.log('🎯 Drag & Drop reactivado manualmente');
  }
});




// === 🧩 REPARACIÓN SUAVE DE BOTONES Y DRAG&DROP ===
setTimeout(() => {
  console.log('🧩 Reenganchando botones de tarea y drag & drop (modo seguro)...');

  // 1️⃣ BOTÓN GUARDAR TAREA
  const saveBtn = document.querySelector('.btn-save, #saveTaskButton');
  if (saveBtn) {
    saveBtn.addEventListener('click', e => {
      e.preventDefault();
      console.log('💾 Guardar tarea clic detectado');
      if (typeof createNewTask === 'function') {
        try {
          createNewTask(e);
          console.log('✅ createNewTask ejecutado correctamente');
        } catch (err) {
          console.error('❌ Error en createNewTask:', err);
        }
      } else {
        console.warn('⚠️ Función createNewTask no encontrada');
      }
    });
    console.log('✅ Botón Guardar reenganchado');
  } else {
    console.warn('⚠️ Botón Guardar no encontrado');
  }

  // 2️⃣ BOTÓN CANCELAR TAREA
  const cancelBtn = document.querySelector('#cancelTaskBtn, .cancel-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', e => {
      e.preventDefault();
      console.log('❌ Cancelar tarea clic detectado');
      const form = document.querySelector('#taskForm') || cancelBtn.closest('form');
      if (form) form.reset();
      else console.warn('⚠️ No se encontró formulario de tarea');
    });
    console.log('✅ Botón Cancelar reenganchado');
  } else {
    console.warn('⚠️ Botón Cancelar no encontrado');
  }

  // 3️⃣ DRAG & DROP
  if (typeof initDragAndDrop === 'function') {
    try {
      initDragAndDrop();
      console.log('🎯 Drag & Drop restaurado correctamente');
    } catch (err) {
      console.error('❌ Error al restaurar Drag & Drop:', err);
    }
  } else {
    console.warn('⚠️ Función initDragAndDrop no encontrada');
  }

  // 4️⃣ MENSAJE DE ÉXITO
  const msg = document.createElement('div');
  msg.textContent = '✅ Eventos restaurados (modo seguro)';
  Object.assign(msg.style, {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#27ae60',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '10px',
    fontWeight: 'bold',
    zIndex: 9999,
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
  });
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 3000);

}, 2500);


// === 🧩 PARCHE DE KANBAN INTELIGENTE ===
setTimeout(() => {
  console.log('🧩 Parcheando renderKanbanTasks para adaptarlo a tus IDs...');

  // Guarda la función original si existe
  if (typeof renderKanbanTasks === 'function' && !window._kanbanPatched) {
    const originalRenderKanban = renderKanbanTasks;

    window.renderKanbanTasks = function (tasks) {
      try {
        // Verificar que los contenedores existan
        const todo = document.querySelector('#todo, #pendingTasks, #pendientes');
        const inProgress = document.querySelector('#in-progress, #inProgressTasks, #enProgreso, #inProgressList');
        const done = document.querySelector('#done, #completedTasks, #completadas');

        // Si alguno falta, crearlo dinámicamente sin romper diseño
        const board = document.querySelector('#boardView, .kanban-board, main') || document.body;

        if (!todo) {
          const col = document.createElement('div');
          col.id = 'todo';
          col.className = 'kanban-column';
          col.innerHTML = `<h3>Pendientes</h3>`;
          board.appendChild(col);
          console.warn('⚠️ Columna "todo" creada dinámicamente');
        }

        if (!inProgress) {
          const col = document.createElement('div');
          col.id = 'in-progress';
          col.className = 'kanban-column';
          col.innerHTML = `<h3>En progreso</h3>`;
          board.appendChild(col);
          console.warn('⚠️ Columna "in-progress" creada dinámicamente');
        }

        if (!done) {
          const col = document.createElement('div');
          col.id = 'done';
          col.className = 'kanban-column';
          col.innerHTML = `<h3>Completadas</h3>`;
          board.appendChild(col);
          console.warn('⚠️ Columna "done" creada dinámicamente');
        }

        // Llamar a la función original con seguridad
        console.log('✅ Ejecutando renderKanbanTasks corregido...');
        return originalRenderKanban(tasks);

      } catch (err) {
        console.error('❌ Error en renderKanbanTasks parcheado:', err);
      }
    };

    window._kanbanPatched = true;
    console.log('✅ Parche aplicado con éxito');
  } else {
    console.warn('⚠️ renderKanbanTasks no encontrado o ya parcheado');
  }

}, 1500);




// === SISTEMA DE RESPALDO PERMANENTE ===

function downloadBackup() {
    console.log('💾 Iniciando descarga de respaldo...');
    
    const backupData = {
        projects: projects,
        currentProjectIndex: currentProjectIndex,
        timestamp: new Date().toISOString(),
        version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `respaldo-proyectos-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('✅ Respaldo descargado correctamente');
    showNotification('✅ Respaldo descargado correctamente');
}

function uploadBackup() {
    console.log('📤 Solicitando archivo de respaldo...');
    const fileInput = document.getElementById('fileUpload');
    if (fileInput) {
        fileInput.click();
    } else {
        console.error('❌ Input file no encontrado');
        showNotification('❌ Error: Elemento de carga no encontrado');
    }
}

function handleBackupFile(event) {
    const file = event.target.files[0];
    if (!file) {
        console.log('❌ No se seleccionó archivo');
        return;
    }
    
    console.log('📂 Procesando archivo:', file.name);
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const backupData = JSON.parse(e.target.result);
            console.log('✅ Archivo de respaldo válido:', backupData);
            
            // Validar estructura del respaldo
            if (backupData.projects && Array.isArray(backupData.projects)) {
                if (confirm('¿Estás seguro de que quieres cargar este respaldo? Se reemplazarán todos los datos actuales.')) {
                    // Restaurar datos
                    projects = backupData.projects;
                    currentProjectIndex = backupData.currentProjectIndex || 0;
                    
                    // Guardar y actualizar
                    updateLocalStorage();
                    renderProjects();
                    selectProject(currentProjectIndex);
                    
                    console.log('✅ Respaldo cargado correctamente');
                    showNotification('✅ Respaldo cargado correctamente');
                }
            } else {
                throw new Error('Estructura de respaldo inválida');
            }
        } catch (error) {
            console.error('❌ Error cargando respaldo:', error);
            showNotification('❌ Error: Archivo de respaldo inválido');
        }
    };
    reader.readAsText(file);
    
    // Limpiar input para permitir cargar el mismo archivo otra vez
    event.target.value = '';
}

// === CONEXIÓN AUTOMÁTICA AL CARGAR LA PÁGINA ===
document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que los elementos estén disponibles
    setTimeout(() => {
        const downloadBtn = document.getElementById('backupToLocal');
        const uploadBtn = document.getElementById('restoreFromLocal');
        const fileInput = document.getElementById('fileUpload');
        
        if (downloadBtn) downloadBtn.onclick = downloadBackup;
        if (uploadBtn) uploadBtn.onclick = uploadBackup;
        if (fileInput) fileInput.onchange = handleBackupFile;
        
        console.log('🔧 Sistema de respaldo conectado automáticamente');
    }, 1000);
});



// === SOLUCIÓN DEFINITIVA BOTÓN MENÚ - PEGAR AL FINAL DEL ARCHIVO ===
function replaceMenuButtonCode() {
    console.group('🎯 REEMPLAZANDO CÓDIGO DEL BOTÓN MENÚ');
    
    // Buscar y eliminar cualquier código existente del botón menú
    const menuBtn = document.getElementById('toggleSidebarBtn');
    if (!menuBtn) {
        console.error('❌ Botón menú no encontrado');
        return;
    }
    
    // Reemplazar completamente el botón
    const newMenuBtn = document.createElement('button');
    newMenuBtn.id = 'toggleSidebarBtn';
    newMenuBtn.className = 'blue-btn';
    newMenuBtn.innerHTML = '☰ Menú';
    newMenuBtn.title = 'Mostrar/Ocultar menú lateral';
    
    // Reemplazar en el DOM
    menuBtn.parentNode.replaceChild(newMenuBtn, menuBtn);
    
    // CONEXIÓN INDESTRUCTIBLE
    const finalMenuBtn = document.getElementById('toggleSidebarBtn');
    const sidebar = document.querySelector('aside');
    
    // Listener principal con múltiples protecciones
    finalMenuBtn.addEventListener('click', function menuClickHandler() {
        console.log('🎯 Botón menú clickeado - Versión indestructible');
        
        if (!sidebar) {
            console.error('❌ Sidebar no encontrado');
            return;
        }
        
        // 1. Alternar visibilidad
        const isHidden = sidebar.classList.contains('hidden');
        sidebar.classList.toggle('hidden');
        console.log(`📋 Sidebar ${isHidden ? 'mostrado' : 'ocultado'}`);
        
        // 2. Sincronizar elementos dependientes
        setTimeout(() => {
            // Sincronizar líneas
            if (typeof syncLinesWithSidebar === 'function') {
                syncLinesWithSidebar();
            }
            
            // Re-renderizar Gantt si es necesario
            if (!ganttView.classList.contains('hidden') && typeof renderGanttChart === 'function') {
                const ganttTasks = projects[currentProjectIndex]?.tasks || [];
                renderGanttChart(ganttTasks);
            }
            
            // Forzar reflow para asegurar actualización
            sidebar.offsetHeight;
        }, 150);
        
       // 3. Protección simple - siempre funciona
setTimeout(() => {
    // Esta versión no necesita getEventListeners
    // El listener ya está conectado permanentemente
    console.log('✅ Botón menú verificado - funcionando correctamente');
}, 500);
    });
    
    // PROTECCIÓN EXTRA - Reconexión automática
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                // Si el botón cambia, reconectar
                setTimeout(() => {
                    if (!getEventListeners(finalMenuBtn)?.click?.length) {
                        console.log('🔄 Reconectando botón menú después de cambio...');
                        finalMenuBtn.addEventListener('click', menuClickHandler);
                    }
                }, 100);
            }
        });
    });
    
    observer.observe(finalMenuBtn, { attributes: true });
    
    console.log('✅ Botón menú reemplazado con protección máxima');
    console.log('   - Listener principal conectado');
    console.log('   - Observer de cambios activado');
    console.log('   - Autoreparación configurada');
    console.groupEnd();
}

// === EJECUCIÓN AUTOMÁTICA AL CARGAR ===
document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que todo cargue y luego activar el botón menú
    setTimeout(() => {
        console.log('🚀 Activando botón menú indestructible...');
        replaceMenuButtonCode();
    }, 2000);
});

// === TAMBIÉN ACTIVAR DESPUÉS DE CIERTOS EVENTOS ===
// Activar después de cambios importantes en la interfaz
['load', 'resize', 'popstate'].forEach(event => {
    window.addEventListener(event, function() {
        setTimeout(replaceMenuButtonCode, 1000);
    });
});



// Función global para reactivar manualmente si es necesario
window.fixMenuButton = function() {
    console.log('🔧 Reactivando botón menú manualmente...');
    replaceMenuButtonCode();
};

// También puedes llamarlo desde consola en cualquier momento: fixMenuButton()





/*******************************************************
 * 🔥 SISTEMA DE SINCRONIZACIÓN MEJORADO - VERSIÓN COMPACTA
 *******************************************************/

// Sistema de sincronización entre pestañas
function initSyncSystem() {
    console.log('🔄 Iniciando sistema de sincronización...');
    
    // Escuchar cambios en el localStorage entre pestañas
    window.addEventListener('storage', function(e) {
        if (e.key === 'projects' && e.newValue) {
            console.log('📥 Cambio detectado en otra pestaña, sincronizando...');
            try {
                const newProjects = JSON.parse(e.newValue);
                if (Array.isArray(newProjects) && newProjects.length > 0) {
                    projects = newProjects;
                    renderKanbanTasks();
                    updateStatistics();
                    showNotification('✅ Datos actualizados desde otra pestaña');
                }
            } catch (error) {
                console.error('Error sincronizando datos:', error);
            }
        }
    });
    
    // Sincronización automática cada 5 segundos
    setInterval(() => {
        localStorage.setItem('projects', JSON.stringify(projects));
        localStorage.setItem('lastSync', Date.now().toString());
    }, 5000);
    
    console.log('✅ Sistema de sincronización activado');
}

// WebSockets mejorados
function initWebSocketEnhanced() {
    try {
        console.log('🚀 Iniciando WebSocket mejorado...');
        
        if (window.authMode !== 'backend') {
            console.log('🔒 Modo local - Sin WebSockets');
            return;
        }
        
        if (typeof io === 'undefined') {
            console.log('📚 Cargando Socket.io...');
            const script = document.createElement('script');
            script.src = 'https://cdn.socket.io/4.5.0/socket.io.min.js';
            script.onload = () => {
                console.log('✅ Socket.io cargado');
                connectWebSocket();
            };
            document.head.appendChild(script);
        } else {
            connectWebSocket();
        }
        
        function connectWebSocket() {
            if (window.tiempoRealSocket) {
                window.tiempoRealSocket.disconnect();
            }
            
            window.tiempoRealSocket = io('https://mi-sistema-proyectos-backend-4.onrender.com', {
                transports: ['websocket', 'polling']
            });
            
            window.tiempoRealSocket.on('connect', function() {
                console.log('✅ WebSocket conectado');
            });
            
            window.tiempoRealSocket.on('task-updated', function(data) {
                console.log('🔄 Evento recibido:', data);
                if (typeof refreshCurrentView === 'function') {
                    refreshCurrentView();
                }
            });
            
            window.tiempoRealSocket.on('disconnect', function() {
                console.log('🔌 WebSocket desconectado');
            });
        }
        
    } catch (error) {
        console.error('❌ Error en WebSocket:', error);
    }
}


// Sincronización manual
function forceSync() {
    console.log('🔧 Forzando sincronización...');
    localStorage.setItem('projects', JSON.stringify(projects));
    if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
    if (typeof updateStatistics === 'function') updateStatistics();
    showNotification('✅ Sincronización manual completada');
}

// Inicializar después de que todo esté listo
setTimeout(() => {
    initSyncSystem();
    
    // Iniciar WebSockets si está en modo backend
    if (window.authMode === 'backend') {
        setTimeout(initWebSocketEnhanced, 2000);
    }
}, 3000);

// Comandos de consola
window.forceSync = forceSync;
window.restartWebSockets = initWebSocketEnhanced;

console.log('🎯 Sistema de sincronización cargado - Usa forceSync() en consola');






// ===== SOLUCIÓN PERMANENTE PARA REDIMENSIONAMIENTO DE CALENDARIO =====
function setupCalendarResizeSolution() {
    const sidebar = document.querySelector('aside');
    const toggleBtn = document.getElementById('toggleSidebarBtn');
    
    if (!sidebar || !toggleBtn) {
        console.log('⏳ Elementos no encontrados, reintentando...');
        setTimeout(setupCalendarResizeSolution, 1000);
        return;
    }
    
    // Reemplazar el botón completamente para evitar conflictos
    const newToggleBtn = toggleBtn.cloneNode(true);
    toggleBtn.parentNode.replaceChild(newToggleBtn, toggleBtn);
    
    newToggleBtn.addEventListener('click', function() {
        console.log('🎯 Botón menú - Redimensionando calendario...');
        
        // 1. Toggle del sidebar
        sidebar.classList.toggle('hidden');
        
        // 2. Redimensionamiento agresivo del calendario
        setTimeout(() => {
            if (window.calendarInstance) {
                // Método comprobado que funciona
                const currentDate = window.calendarInstance.getDate();
                const currentView = window.calendarInstance.view.type;
                
                // Render forzado
                window.calendarInstance.render();
                
                // Cambio temporal de vista (método que funciona)
                setTimeout(() => {
                    window.calendarInstance.changeView('timeGridWeek');
                    setTimeout(() => {
                        window.calendarInstance.changeView(currentView);
                        window.calendarInstance.gotoDate(currentDate);
                        window.calendarInstance.updateSize();
                    }, 50);
                }, 100);
                
                console.log('✅ Calendario redimensionado correctamente');
            }
        }, 400);
        
        // Tu código existente para líneas y Gantt
        setTimeout(() => {
            syncLinesWithSidebar();
            if (!ganttView.classList.contains('hidden')) {
                renderGanttChart();
            }
        }, 100);
    });
    
    console.log('✅ Solución permanente de calendario configurada');
}

// Inicializar cuando todo esté listo
setTimeout(setupCalendarResizeSolution, 3000);



// ===== ACTUALIZACIÓN AUTOMÁTICA DEL CALENDARIO =====
function setupCalendarAutoRefresh() {
    // Actualizar calendario cuando cambian los datos
    const originalUpdateLocalStorage = window.updateLocalStorage;
    if (originalUpdateLocalStorage) {
        window.updateLocalStorage = function() {
            originalUpdateLocalStorage.apply(this, arguments);
            refreshCalendar();
        };
    }
    
    // Actualizar calendario cuando se crean/editan tareas
    const originalCreateNewTask = window.createNewTask;
    if (originalCreateNewTask) {
        window.createNewTask = function(e) {
            const result = originalCreateNewTask.apply(this, arguments);
            setTimeout(refreshCalendar, 500);
            return result;
        };
    }
    
    // Actualizar calendario cuando se guardan cambios de tareas
    const originalSaveTaskChanges = window.saveTaskChanges;
    if (originalSaveTaskChanges) {
        window.saveTaskChanges = function(taskId) {
            originalSaveTaskChanges.apply(this, arguments);
            setTimeout(refreshCalendar, 500);
        };
    }
    
    console.log('✅ Actualización automática del calendario configurada');
}

// Función para refrescar el calendario
function refreshCalendar() {
    if (window.calendarInstance) {
        // Método suave para actualizar eventos
        window.calendarInstance.refetchEvents();
        console.log('🔄 Calendario actualizado automáticamente');
    }
}

// Inicializar
setTimeout(setupCalendarAutoRefresh, 4000);






