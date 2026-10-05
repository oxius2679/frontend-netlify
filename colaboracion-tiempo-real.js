// ═══════════════════════════════════════════════════════════════
// 🔄 COLABORACIÓN EN TIEMPO REAL v3 — CROSS-MACHINE
// ═══════════════════════════════════════════════════════════════
(function colaboracionTiempoRealV3() {
  'use strict';
  if (window.__COLAB_V3) return;
  window.__COLAB_V3 = true;

  console.log('%c🔄 Colab v3 cargada', 'color:#10b981;font-weight:bold;background:#000;padding:4px 8px');

  // ─────────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────────
  const userEmail   = () => localStorage.getItem('userEmail') || 'Usuario';
  const clienteId   = () => localStorage.getItem('clienteId') || 'default';
  const getProject  = () => window.projects?.[window.currentProjectIndex];
  const getSock     = () => window.tiempoRealSocket;
  const getProjKey  = () => {
    const p = getProject();
    return p?.id ? `p_${p.id}` : `idx_${window.currentProjectIndex}`;
  };
  const cloneDeep   = o => JSON.parse(JSON.stringify(o));

  const emitSafe = (event, data) => {
    const s = getSock();
    if (!s) return;
    const payload = {
      ...data,
      // 🔑 SIEMPRE incluir AMBOS identificadores + clienteId
      projectId: window.currentProjectIndex,
      projectDbId: getProject()?.id,
      clienteId: clienteId(),
      userName: userEmail(),
      timestamp: new Date().toISOString()
    };
    if (s.connected) {
      s.emit(event, payload);
    } else {
      s.once('connect', () => s.emit(event, payload));
    }
  };

  const broadcastLocal = (reason) => {
    try {
      window.__colabBC?.postMessage({
        type: 'STATE',
        payload: {
          projects: cloneDeep(window.projects || []),
          currentProjectIndex: window.currentProjectIndex
        },
        reason
      });
    } catch (e) {}
  };

  // ─────────────────────────────────────────────
  // 1) JOIN AL ROOM CORRECTO (por índice Y por DB ID)
  // ─────────────────────────────────────────────
  const joinRoom = () => {
    const s = getSock();
    if (!s || !s.connected) return;
    const idx = window.currentProjectIndex;
    const dbId = getProject()?.id;
    const cId = clienteId();

    // Emitir TODOS los joins posibles (el servidor usará el que reconozca)
    s.emit('join-project', idx);
    if (dbId) s.emit('join-project', dbId);
    if (dbId) s.emit('join-project', `p_${dbId}`);
    s.emit('join-cliente', cId);
    console.log(`🚪 [v3] join → idx=${idx}, dbId=${dbId}, cliente=${cId}`);
  };

  const s = getSock();
  if (s) {
    // Cada vez que conecta, unirse al room
    s.on('connect', () => {
      console.log('🔗 [v3] socket conectado, haciendo join...');
      setTimeout(joinRoom, 200);
    });
    // Join inicial si ya está conectado
    if (s.connected) joinRoom();
    // Reintentar cada 5s (por si el proyecto cambia)
    setInterval(joinRoom, 5000);
  }

  // También emitir join cuando cambia el proyecto (interceptando selectProject)
  const _selProj = window.selectProject;
  if (typeof _selProj === 'function') {
    window.selectProject = function(idx) {
      const r = _selProj.apply(this, arguments);
      setTimeout(joinRoom, 300);
      return r;
    };
  }

  // ─────────────────────────────────────────────
  // 2) LISTENERS DE RECEPCIÓN (aplican cambios)
  // ─────────────────────────────────────────────
  const sameProject = (data) => {
    // 🔑 Aceptar si coincide índice, DB ID, o cliente
    const idx = window.currentProjectIndex;
    const dbId = getProject()?.id;
    if (data.projectId != null && Number(data.projectId) === Number(idx)) return true;
    if (data.projectDbId != null && dbId != null && String(data.projectDbId) === String(dbId)) return true;
    if (data.clienteId && data.clienteId === clienteId()) return true;
    return false;
  };

  const reloadFromMemory = () => {
    if (typeof window.renderKanbanTasks === 'function') window.renderKanbanTasks();
    if (typeof window.renderProjects === 'function') window.renderProjects();
    if (typeof window.updateStatistics === 'function') window.updateStatistics();
  };

  if (s) {
    // task-created
    s.on('task-created', (data) => {
      console.log('📥 [v3] task-created', data);
      if (!sameProject(data) || !data.task) return;
      const proj = getProject();
      if (!proj) return;
      if (proj.tasks.some(t => String(t.id) === String(data.task.id))) return;
      proj.tasks.push(data.task);
      localStorage.setItem('projects', JSON.stringify(window.projects));
      reloadFromMemory();
    });

    // task-updated
    s.on('task-updated', (data) => {
      console.log('📥 [v3] task-updated', data);
      if (!sameProject(data)) return;
      const proj = getProject();
      if (!proj) return;
      const taskId = data.taskId ?? data.task?.id;
      const idx = proj.tasks.findIndex(t => String(t.id) === String(taskId));
      if (idx !== -1 && data.task) {
        proj.tasks[idx] = data.task;
      } else if (idx !== -1) {
        // Merge parcial
        Object.assign(proj.tasks[idx], data.changes || data);
      }
      localStorage.setItem('projects', JSON.stringify(window.projects));
      reloadFromMemory();
    });

    // task-moved
    s.on('task-moved', (data) => {
      console.log('📥 [v3] task-moved', data);
      if (!sameProject(data)) return;
      const proj = getProject();
      if (!proj) return;
      const task = proj.tasks.find(t => String(t.id) === String(data.taskId));
      if (task && task.status !== data.newStatus) {
        task.status = data.newStatus;
        if (data.newStatus === 'completed') task.progress = 100;
        else if (data.newStatus === 'pending') task.progress = 0;
        localStorage.setItem('projects', JSON.stringify(window.projects));
        reloadFromMemory();
      }
    });

    // task-deleted
    s.on('task-deleted', (data) => {
      console.log('📥 [v3] task-deleted', data);
      if (!sameProject(data)) return;
      const proj = getProject();
      if (!proj) return;
      const idx = proj.tasks.findIndex(t => String(t.id) === String(data.taskId));
      if (idx !== -1) {
        proj.tasks.splice(idx, 1);
        localStorage.setItem('projects', JSON.stringify(window.projects));
        reloadFromMemory();
      }
    });

    // project-created
    s.on('project-created', (data) => {
      console.log('📥 [v3] project-created', data);
      if (!data.project) return;
      // Si es de otro cliente, ignorar
      if (data.clienteId && data.clienteId !== clienteId()) return;
      if (window.projects.some(p => String(p.id) === String(data.project.id))) return;
      window.projects.push(data.project);
      localStorage.setItem('projects', JSON.stringify(window.projects));
      if (typeof window.renderProjects === 'function') window.renderProjects();
      console.log('✅ [v3] Proyecto añadido:', data.project.name);
    });

    // project-updated
    s.on('project-updated', (data) => {
      console.log('📥 [v3] project-updated', data);
      if (!data.project) return;
      if (data.clienteId && data.clienteId !== clienteId()) return;
      const idx = window.projects.findIndex(p => String(p.id) === String(data.project.id));
      if (idx !== -1) {
        window.projects[idx] = data.project;
        localStorage.setItem('projects', JSON.stringify(window.projects));
        reloadFromMemory();
      }
    });
  }

  // ─────────────────────────────────────────────
  // 3) PATHS DE EMISIÓN (drag&drop, guardar, borrar, crear)
  // ─────────────────────────────────────────────
  window.handleDrop = function (e) {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = '';
    const taskId = e.dataTransfer.getData('taskId') || e.dataTransfer.getData('text/plain');
    const map = { pendingList:'pending', inProgressList:'inProgress', completedList:'completed', overdueList:'overdue' };
    const newStatus = map[e.currentTarget.id];
    const proj = getProject(); if (!proj || !newStatus) return;
    const task = proj.tasks.find(t => String(t.id) === String(taskId)); if (!task) return;
    const oldStatus = task.status; if (oldStatus === newStatus) return;
    task.status = newStatus;
    task.history = task.history || [];
    task.history.push({ from: oldStatus, to: newStatus, date: new Date().toISOString() });
    if (newStatus === 'completed') task.progress = 100;
    else if (newStatus === 'pending') task.progress = 0;
    localStorage.setItem('projects', JSON.stringify(window.projects));
    if (typeof updateLocalStorage === 'function') updateLocalStorage();
    if (typeof safeSave === 'function') safeSave();
    if (typeof renderKanbanTasks === 'function') renderKanbanTasks();
    emitSafe('task-moved', { taskId: task.id, taskName: task.name, oldStatus, newStatus });
    emitSafe('task-updated', { taskId: task.id, task: cloneDeep(task), taskName: task.name });
    broadcastLocal('handleDrop');
  };
  const regDrop = () => document.querySelectorAll('#pendingList,#inProgressList,#completedList,#overdueList')
    .forEach(c => { if (!c.__reg) { c.__reg = true; c.addEventListener('drop', window.handleDrop, true); } });
  regDrop(); setInterval(regDrop, 1500);

  const patch = (name, emitFn) => {
    const orig = window[name];
    if (typeof orig !== 'function' || orig.__v3) return;
    window[name] = function () {
      const r = orig.apply(this, arguments);
      setTimeout(() => emitFn.apply(this, arguments), 400);
      return r;
    };
    window[name].__v3 = true;
  };

  patch('deleteTaskById', function (taskId) {
    emitSafe('task-deleted', { taskId, taskName: getProject()?.tasks?.find(t=>String(t.id)===String(taskId))?.name || '' });
    broadcastLocal('deleteTask');
  });

  patch('saveTaskChanges', function (taskId) {
    const t = getProject()?.tasks?.find(x => String(x.id) === String(taskId));
    if (!t) return;
    emitSafe('task-updated', { taskId: t.id, task: cloneDeep(t), taskName: t.name });
    broadcastLocal('saveTaskChanges');
  });

  patch('createNewTask', function () {
    const proj = getProject();
    const t = proj?.tasks?.[proj.tasks.length - 1];
    if (!t) return;
    emitSafe('task-created', { task: cloneDeep(t), projectName: proj.name });
    broadcastLocal('createNewTask');
  });

  patch('createNewProject', function () {
    const p = window.projects?.[window.projects.length - 1];
    if (!p) return;
    emitSafe('project-created', { project: cloneDeep(p), projectName: p.name });
    broadcastLocal('createNewProject');
  });

  setInterval(() => {
    patch('deleteTaskById', window.deleteTaskById?.__v3 ? null : function(taskId){
      emitSafe('task-deleted', { taskId });
    });
    patch('saveTaskChanges', function(taskId){
      const t = getProject()?.tasks?.find(x => String(x.id) === String(taskId));
      if (t) emitSafe('task-updated', { taskId: t.id, task: cloneDeep(t), taskName: t.name });
    });
    patch('createNewTask', function(){
      const proj = getProject();
      const t = proj?.tasks?.[proj.tasks.length - 1];
      if (t) emitSafe('task-created', { task: cloneDeep(t), projectName: proj.name });
    });
    patch('createNewProject', function(){
      const p = window.projects?.[window.projects.length - 1];
      if (p) emitSafe('project-created', { project: cloneDeep(p), projectName: p.name });
    });
  }, 2000);

  console.log('%c✅ Colab v3 ACTIVA — cross-machine habilitado', 'color:#10b981;font-weight:bold;font-size:14px;background:#000;padding:4px 10px');
})();