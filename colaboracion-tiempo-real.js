// ═══════════════════════════════════════════════════════════════
// 🏛️ COLABORACIÓN EN TIEMPO REAL v5.1 — CORREGIDA
// Cambio ÚNICO: sección 2 (el "portero" ahora filtra, no bloquea todo)
// Todo lo demás (secciones 1,3,4,5,6,7) queda IDÉNTICO al original.
// ═══════════════════════════════════════════════════════════════
(function ColaboracionTiempoRealV5() {
  'use strict';

  if (window.__COLAB_V5_FINAL) {
    console.log('⚠️ Colab v5 ya está activa.');
    return;
  }
  window.__COLAB_V5_FINAL = true;

  console.log('%c🏛️ Colab v5.1 CORREGIDA Iniciada', 'color:#10b981;font-weight:bold;background:#000;padding:6px 12px;font-size:14px;');

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
  // 2. PROTEGER PROYECTOS COLABORATIVOS (v5.1)
  //    ANTES: bloqueaba TODO si el proyecto actual era ajeno.
  //    AHORA: solo filtra lo ajeno del guardado; lo propio SÍ se guarda.
  // ─────────────────────────────────────────────
  const getGlobalProjects = () => {
    try {
      return (typeof projects !== 'undefined' && Array.isArray(projects)) ? projects : null;
    } catch (e) { return null; }
  };

  // Une window.projects + el array global 'projects' (evita el desync Kanban/menú)
  const unifyProjects = () => {
    const wp = Array.isArray(window.projects) ? window.projects : [];
    const gp = getGlobalProjects();
    if (!gp || gp === wp) return wp;
    const ids = new Set(wp.map(p => String(p && p.id)));
    const merged = wp.slice();
    gp.forEach(p => {
      if (p && !ids.has(String(p.id))) { merged.push(p); ids.add(String(p.id)); }
    });
    return merged;
  };

  const syncArrays = (arr) => {
    try { window.projects = arr; } catch (e) {}
    const gp = getGlobalProjects();
    if (gp && gp !== arr) { gp.length = 0; gp.push(...arr); }
    try { localStorage.setItem('projects', JSON.stringify(arr)); } catch (e) {}
  };

  const esMio = (p) => {
    if (!p) return false;
    if (p.esColaborativo || p.isCollaborative) return false;
    const yo = String(localStorage.getItem('clienteId') || '');
    return String(p.clienteId || p.clienteIdOrigen || yo) === yo;
  };

  const disableConflictingSystems = () => {
    // 2.1. safeSave: guarda local TODO; al backend SOLO lo propio
    window.safeSave = async function (clienteId) {
      const yo = String(localStorage.getItem('clienteId') || '');
      const all = unifyProjects();

      // Sellar clienteId en proyectos propios nuevos que no lo tengan
      all.forEach(p => {
        if (p && !p.clienteId && !p.esColaborativo && !p.isCollaborative) p.clienteId = yo;
      });

      syncArrays(all);

      const mios = all.filter(esMio);
      const token = localStorage.getItem('authToken');
      if (token && yo) {
        try {
          const res = await fetch('https://mi-sistema-proyectos-backend-4.onrender.com/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({
              projects: mios,
              currentProjectIndex: window.currentProjectIndex || 0,
              clienteId: yo
            })
          });
          if (res.ok) console.log('✅ [v5.1] Guardado en backend: ' + mios.length + ' proyecto(s) propio(s)');
          else console.warn('⚠️ [v5.1] Backend respondió ' + res.status);
        } catch (e) {
          console.warn('⚠️ [v5.1] Sin conexión — guardado local OK');
        }
      }
      return true;
    };

    // 2.2. forceRefreshFromBackend: NUNCA se bloquea (un GET solo lee).
    //      Tras refrescar, sincroniza window.projects con el array del polling.
    const origForceRefresh = window.forceRefreshFromBackend;
    window.forceRefreshFromBackend = async function () {
      const r = await origForceRefresh?.apply(this, arguments);
      const gp = getGlobalProjects();
      if (gp && Array.isArray(gp)) {
        const wp = Array.isArray(window.projects) ? window.projects : [];
        const ids = new Set(gp.map(p => String(p && p.id)));
        const pendientes = wp.filter(p => p && !ids.has(String(p.id)) && esMio(p));
        syncArrays([...gp, ...pendientes]);
      }
      return r;
    };

    // 2.3. updateLocalStorage: lo local NUNCA se bloquea (ya no se envuelve).

    console.log('✅ [v5.1] Protección colaborativa: filtro por dueño (no bloqueo total)');
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

    task.status = newStatus;
    task.history = task.history || [];
    task.history.push({ from: oldStatus, to: newStatus, date: new Date().toISOString() });
    if (newStatus === 'completed') task.progress = 100;
    else if (newStatus === 'pending') task.progress = 0;

    localStorage.setItem('projects', JSON.stringify(window.projects));
    if (typeof window.renderKanbanTasks === 'function') window.renderKanbanTasks();

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

  console.log('%c✅ COLABORACIÓN v5.1 CORREGIDA ACTIVA', 'color:#10b981;font-weight:bold;font-size:14px;background:#000;padding:6px 12px;');
})();