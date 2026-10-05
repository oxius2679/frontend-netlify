// ═══════════════════════════════════════════════════════════════
// 🏛️ COLABORACIÓN EN TIEMPO REAL v5 — DEFINITIVA
// Reemplaza TODOS los sistemas anteriores de colaboración
// ═══════════════════════════════════════════════════════════════
(function ColaboracionTiempoRealV5() {
  'use strict';
  
  if (window.__COLAB_V5_FINAL) {
    console.log('⚠️ Colab v5 ya está activa.');
    return;
  }
  window.__COLAB_V5_FINAL = true;

  console.log('%c🏛️ Colab v5 DEFINITIVA Iniciada', 'color:#10b981;font-weight:bold;background:#000;padding:6px 12px;font-size:14px;');

  // ─────────────────────────────────────────────
  // 1. HELPERS
  // ─────────────────────────────────────────────
  const getClientId   = () => localStorage.getItem('clienteId') || 'default';
  const getUserEmail  = () => localStorage.getItem('userEmail') || 'Usuario';
  const getSocket     = () => window.tiempoRealSocket;
  
  const getCanonicalProjectId = () => {
    const p = window.projects?.[window.currentProjectIndex];
    return p?.id ? String(p.id) : null;
  };

  const getProject = () => window.projects?.[window.currentProjectIndex];
  const cloneDeep  = o => JSON.parse(JSON.stringify(o));

  // ─────────────────────────────────────────────
  // 2. DESACTIVAR SISTEMAS CONFLICTIVOS (La clave del éxito)
  // ─────────────────────────────────────────────
  const disableConflictingSystems = () => {
    // 2.1. Bloquear safeSave para proyectos colaborativos
    const origSafeSave = window.safeSave;
    window.safeSave = async function(clienteId) {
      const currentClienteId = localStorage.getItem('clienteId');
      const proj = getProject();
      
      // Si el proyecto NO es mío (es colaborativo), NO guardar en backend
      if (proj && String(proj.clienteId) !== String(currentClienteId)) {
        console.log('🛡️ [v5] safeSave bloqueado: proyecto colaborativo, solo Socket.IO');
        // Solo guardar en localStorage, NO en backend
        localStorage.setItem('projects', JSON.stringify(window.projects));
        return true;
      }
      
      // Si es mi proyecto, usar la función original
      return origSafeSave?.apply(this, arguments);
    };

    // 2.2. Bloquear forceRefreshFromBackend para proyectos colaborativos
    const origForceRefresh = window.forceRefreshFromBackend;
    window.forceRefreshFromBackend = async function() {
      const currentClienteId = localStorage.getItem('clienteId');
      const proj = getProject();
      
      // Si el proyecto NO es mío, NO consultar al backend
      if (proj && String(proj.clienteId) !== String(currentClienteId)) {
        console.log('🛡️ [v5] forceRefreshFromBackend bloqueado: proyecto colaborativo');
        // Solo refrescar la vista local
        if (typeof window.renderKanbanTasks === 'function') window.renderKanbanTasks();
        if (typeof window.renderProjects === 'function') window.renderProjects();
        return;
      }
      
      // Si es mi proyecto, usar la función original
      return origForceRefresh?.apply(this, arguments);
    };

    // 2.3. Bloquear updateLocalStorage para proyectos colaborativos
    const origUpdateLS = window.updateLocalStorage;
    window.updateLocalStorage = function() {
      const currentClienteId = localStorage.getItem('clienteId');
      const proj = getProject();
      
      if (proj && String(proj.clienteId) !== String(currentClienteId)) {
        console.log('🛡️ [v5] updateLocalStorage bloqueado: proyecto colaborativo');
        localStorage.setItem('projects', JSON.stringify(window.projects));
        return;
      }
      
      return origUpdateLS?.apply(this, arguments);
    };

    console.log('✅ [v5] Sistemas conflictivos desactivados para proyectos colaborativos');
  };

  disableConflictingSystems();

  // ─────────────────────────────────────────────
  // 3. EMISOR SEGURO (Sanitiza y fuerza el ID canónico)
  // ─────────────────────────────────────────────
  const emitSafe = (event, data) => {
    const s = getSocket();
    if (!s) return;

    const canonicalId = getCanonicalProjectId();
    if (!canonicalId) {
      console.warn('🚫 [v5] No hay ID canónico del proyecto.');
      return;
    }

    const payload = {
      ...data,
      projectId: canonicalId,      
      projectDbId: canonicalId,    
      clienteId: getClientId(),
      userName: getUserEmail(),
      timestamp: new Date().toISOString()
    };

    if (s.connected) {
      s.emit(event, payload);
    } else {
      s.once('connect', () => s.emit(event, payload));
    }
  };

  // ─────────────────────────────────────────────
  // 4. GESTIÓN DE SALAS
  // ─────────────────────────────────────────────
  const joinCanonicalRoom = () => {
    const s = getSocket();
    if (!s || !s.connected) return;
    
    const canonicalId = getCanonicalProjectId();
    if (!canonicalId) return;

    s.emit('join-project', canonicalId);
    console.log(`🚪 [v5] Unido a sala: project-${canonicalId}`);
  };

  const s = getSocket();
  if (s) {
    s.on('connect', () => {
      setTimeout(joinCanonicalRoom, 300);
    });
    
    if (s.connected) joinCanonicalRoom();
    setInterval(joinCanonicalRoom, 5000);
  }

  const _origSelectProject = window.selectProject;
  if (typeof _origSelectProject === 'function') {
    window.selectProject = function(idx) {
      const r = _origSelectProject.apply(this, arguments);
      setTimeout(joinCanonicalRoom, 400);
      return r;
    };
  }

  // ─────────────────────────────────────────────
  // 5. FILTRO DE RECEPCIÓN
  // ─────────────────────────────────────────────
  const isSameProject = (data) => {
    const currentId = getCanonicalProjectId();
    if (!currentId) return false;
    const receivedId = String(data.projectDbId || data.projectId);
    return receivedId === currentId;
  };

  const reloadUI = () => {
    if (typeof window.renderKanbanTasks === 'function') window.renderKanbanTasks();
    if (typeof window.renderProjects === 'function') window.renderProjects();
    if (typeof window.updateStatistics === 'function') window.updateStatistics();
  };

  // ─────────────────────────────────────────────
  // 6. LISTENERS DE EVENTOS
  // ─────────────────────────────────────────────
  if (s) {
    // ELIMINAR listeners antiguos para evitar duplicados
    s.off('task-created');
    s.off('task-updated');
    s.off('task-moved');
    s.off('task-deleted');
    s.off('project-created');
    s.off('project-updated');

    s.on('task-created', (data) => {
      if (!isSameProject(data) || !data.task) return;
      const proj = getProject();
      if (!proj) return;
      if (proj.tasks.some(t => String(t.id) === String(data.task.id))) return;
      
      proj.tasks.push(data.task);
      localStorage.setItem('projects', JSON.stringify(window.projects));
      reloadUI();
      console.log(`✅ [v5] Tarea creada remotamente: ${data.task.name}`);
    });

    s.on('task-updated', (data) => {
      if (!isSameProject(data)) return;
      const proj = getProject();
      if (!proj) return;
      
      const taskId = String(data.taskId || data.task?.id);
      const idx = proj.tasks.findIndex(t => String(t.id) === taskId);
      
      if (idx !== -1) {
        if (data.task) proj.tasks[idx] = data.task;
        else if (data.changes) Object.assign(proj.tasks[idx], data.changes);
        
        localStorage.setItem('projects', JSON.stringify(window.projects));
        reloadUI();
        console.log(`✅ [v5] Tarea actualizada remotamente: ID ${taskId}`);
      }
    });

    s.on('task-moved', (data) => {
      if (!isSameProject(data)) return;
      const proj = getProject();
      if (!proj) return;
      
      const task = proj.tasks.find(t => String(t.id) === String(data.taskId));
      if (task && task.status !== data.newStatus) {
        task.status = data.newStatus;
        if (data.newStatus === 'completed') task.progress = 100;
        else if (data.newStatus === 'pending') task.progress = 0;
        
        localStorage.setItem('projects', JSON.stringify(window.projects));
        reloadUI();
        console.log(`✅ [v5] Tarea movida remotamente: ${data.taskId} -> ${data.newStatus}`);
      }
    });

    s.on('task-deleted', (data) => {
      if (!isSameProject(data)) return;
      const proj = getProject();
      if (!proj) return;
      
      const idx = proj.tasks.findIndex(t => String(t.id) === String(data.taskId));
      if (idx !== -1) {
        proj.tasks.splice(idx, 1);
        localStorage.setItem('projects', JSON.stringify(window.projects));
        reloadUI();
        console.log(`✅ [v5] Tarea eliminada remotamente`);
      }
    });

    s.on('project-created', (data) => {
      if (!data.project) return;
      if (data.clienteId && data.clienteId !== getClientId()) return;
      if (window.projects.some(p => String(p.id) === String(data.project.id))) return;
      
      window.projects.push(data.project);
      localStorage.setItem('projects', JSON.stringify(window.projects));
      if (typeof window.renderProjects === 'function') window.renderProjects();
    });

    s.on('project-updated', (data) => {
      if (!data.project) return;
      if (data.clienteId && data.clienteId !== getClientId()) return;
      
      const idx = window.projects.findIndex(p => String(p.id) === String(data.project.id));
      if (idx !== -1) {
        window.projects[idx] = data.project;
        localStorage.setItem('projects', JSON.stringify(window.projects));
        reloadUI();
      }
    });
  }

  // ─────────────────────────────────────────────
  // 7. INTERCEPTORES DE ACCIONES LOCALES
  // ─────────────────────────────────────────────
  
  // 7.1. Drag & Drop (Kanban)
  window.handleDrop = function (e) {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = '';

    const taskId = e.dataTransfer.getData('taskId') || e.dataTransfer.getData('text/plain');
    const map = { pendingList: 'pending', inProgressList: 'inProgress', completedList: 'completed', overdueList: 'overdue' };
    const newStatus = map[e.currentTarget.id];
    const proj = getProject();
    
    if (!proj || !newStatus) return;

    const task = proj.tasks.find(t => String(t.id) === String(taskId));
    if (!task) return;

    const oldStatus = task.status;
    if (oldStatus === newStatus) return;

    // Actualización local
    task.status = newStatus;
    task.history = task.history || [];
    task.history.push({ from: oldStatus, to: newStatus, date: new Date().toISOString() });
    if (newStatus === 'completed') task.progress = 100;
    else if (newStatus === 'pending') task.progress = 0;

    localStorage.setItem('projects', JSON.stringify(window.projects));
    if (typeof window.renderKanbanTasks === 'function') window.renderKanbanTasks();

    // Emisión a la red
    emitSafe('task-moved', {
        taskId: task.id,
        taskName: task.name,
        oldStatus,
        newStatus,
        targetStatus: newStatus
    });

    emitSafe('task-updated', {
        taskId: task.id,
        task: cloneDeep(task),
        taskName: task.name
    });
  };

  const registerDropZones = () => {
    document.querySelectorAll('#pendingList, #inProgressList, #completedList, #overdueList').forEach(col => {
      if (!col.__dropRegistered) {
        col.__dropRegistered = true;
        col.addEventListener('drop', window.handleDrop, true);
      }
    });
  };
  registerDropZones();
  setInterval(registerDropZones, 2000);

  // 7.2. Parcheo de funciones globales
  const patchGlobalFunction = (funcName, emitEvent, payloadBuilder) => {
    const orig = window[funcName];
    if (typeof orig !== 'function' || orig.__patchedV5) return;
    
    window[funcName] = function (...args) {
      const result = orig.apply(this, args);
      setTimeout(() => {
        const payload = payloadBuilder ? payloadBuilder(args) : {};
        emitSafe(emitEvent, payload);
      }, 300);
      return result;
    };
    window[funcName].__patchedV5 = true;
  };

  patchGlobalFunction('deleteTaskById', 'task-deleted', (args) => {
    const taskId = args[0];
    const proj = getProject();
    const task = proj?.tasks?.find(t => String(t.id) === String(taskId));
    return { taskId, taskName: task?.name || 'Desconocida' };
  });

  patchGlobalFunction('saveTaskChanges', 'task-updated', (args) => {
    const taskId = args[0];
    const proj = getProject();
    const task = proj?.tasks?.find(t => String(t.id) === String(taskId));
    return task ? { taskId: task.id, task: cloneDeep(task), taskName: task.name } : {};
  });

  patchGlobalFunction('createNewTask', 'task-created', () => {
    const proj = getProject();
    const task = proj?.tasks?.[proj.tasks.length - 1];
    return task ? { task: cloneDeep(task), projectName: proj.name } : {};
  });

  patchGlobalFunction('createNewProject', 'project-created', () => {
    const proj = window.projects?.[window.projects.length - 1];
    return proj ? { project: cloneDeep(proj), projectName: proj.name } : {};
  });

  console.log('%c✅ COLABORACIÓN v5 DEFINITIVA ACTIVA', 'color:#10b981;font-weight:bold;font-size:14px;background:#000;padding:6px 12px;');
})();