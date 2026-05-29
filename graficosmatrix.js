<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Gestión de Proyectos - EVM Quantum Analytics</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        /* Contenedor principal */
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }

        /* Header */
        .header {
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .header h1 {
            color: #333;
            margin-bottom: 10px;
        }

        .header p {
            color: #666;
        }

        /* Grid de estadísticas */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }

        .stat-card {
            background: white;
            border-radius: 12px;
            padding: 15px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .stat-card h3 {
            color: #666;
            font-size: 14px;
            margin-bottom: 10px;
        }

        .stat-card .value {
            font-size: 28px;
            font-weight: bold;
            color: #667eea;
        }

        /* Layout principal */
        .main-layout {
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 20px;
        }

        /* Sidebar */
        .sidebar {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .sidebar-section {
            margin-bottom: 25px;
        }

        .sidebar-section h3 {
            color: #333;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #667eea;
        }

        .project-item {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 10px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .project-item:hover {
            background: #e9ecef;
            transform: translateX(5px);
        }

        .project-item.active {
            background: #667eea;
            color: white;
        }

        .project-item h4 {
            font-size: 14px;
            margin-bottom: 5px;
        }

        .project-item p {
            font-size: 12px;
            opacity: 0.8;
        }

        /* Contenido principal */
        .content {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        /* Gráficos EVM */
        .evm-graphics {
            margin-bottom: 30px;
        }

        .evm-graphics canvas {
            width: 100%;
            height: 300px;
            margin-bottom: 20px;
        }

        /* Lista de tareas */
        .tasks-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e9ecef;
        }

        .task-item {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
            transition: all 0.3s;
        }

        .task-item:hover {
            transform: translateX(5px);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .task-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }

        .task-header h4 {
            color: #333;
        }

        .priority {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
        }

        .priority.high { background: #dc3545; color: white; }
        .priority.medium { background: #ffc107; color: #333; }
        .priority.low { background: #28a745; color: white; }

        .status {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            background: #6c757d;
            color: white;
        }

        .status.completed { background: #28a745; }
        .status.in_progress { background: #ffc107; color: #333; }
        .status.pending { background: #dc3545; }

        .progress {
            font-weight: bold;
            color: #667eea;
        }

        /* Botones */
        button {
            background: #667eea;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s;
        }

        button:hover {
            background: #5a67d8;
            transform: translateY(-2px);
        }

        button.danger {
            background: #dc3545;
        }

        button.danger:hover {
            background: #c82333;
        }

        /* Botón flotante */
        .floating-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            transition: all 0.3s;
            z-index: 1000;
        }

        .floating-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }

        /* Panel flotante */
        .floating-panel {
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 400px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            z-index: 999;
            display: none;
            animation: slideIn 0.3s ease;
        }

        .floating-panel.show {
            display: block;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .panel-header {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 15px;
            border-radius: 12px 12px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .panel-header h3 {
            margin: 0;
        }

        .close-panel {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
        }

        .panel-body {
            padding: 20px;
            max-height: 500px;
            overflow-y: auto;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            color: #333;
            font-weight: 500;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
        }

        .form-group textarea {
            resize: vertical;
            min-height: 60px;
        }

        .btn-primary {
            width: 100%;
            padding: 10px;
            background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .empty-state {
            text-align: center;
            padding: 40px;
            color: #999;
        }

        /* Gráficos Canvas */
        .graph-container {
            margin-bottom: 30px;
        }

        .graph-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #333;
        }

        canvas {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 EVM QUANTUM ANALYTICS (PMI)</h1>
            <p>Sistema avanzado de gestión de proyectos con análisis de valor ganado</p>
        </div>

        <div class="stats-grid" id="statsGrid">
            <div class="stat-card"><h3>Total Tareas</h3><div class="value" id="totalTasks">0</div></div>
            <div class="stat-card"><h3>Completadas</h3><div class="value" id="completedTasks">0</div></div>
            <div class="stat-card"><h3>En Progreso</h3><div class="value" id="inProgressTasks">0</div></div>
            <div class="stat-card"><h3>Pendientes</h3><div class="value" id="pendingTasks">0</div></div>
            <div class="stat-card"><h3>Atrasadas</h3><div class="value" id="overdueTasks">0</div></div>
            <div class="stat-card"><h3>Progreso</h3><div class="value" id="averageProgress">0%</div></div>
        </div>

        <div class="main-layout">
            <div class="sidebar">
                <div class="sidebar-section">
                    <h3>📁 Proyectos</h3>
                    <button onclick="showCreateProjectPanel()" style="width:100%; margin-bottom:15px;">+ Nuevo Proyecto</button>
                    <div id="projectsList"></div>
                </div>
                <div class="sidebar-section">
                    <h3>👥 Equipo</h3>
                    <button onclick="showAddMemberPanel()" style="width:100%; margin-bottom:15px;">+ Agregar Miembro</button>
                    <div id="teamMembersList"></div>
                </div>
            </div>

            <div class="content">
                <div class="evm-graphics">
                    <div class="graph-container">
                        <div class="graph-title">📈 Curvas de Valor Ganado (EVM)</div>
                        <canvas id="evmCanvas" width="800" height="300"></canvas>
                    </div>
                    <div class="graph-container">
                        <div class="graph-title">📉 Índices de Desempeño (CPI / SPI)</div>
                        <canvas id="indicesCanvas" width="800" height="300"></canvas>
                    </div>
                </div>

                <div class="tasks-header">
                    <h3>📋 Tareas del Proyecto</h3>
                    <button onclick="showCreateTaskPanel()">+ Nueva Tarea</button>
                </div>
                <div id="tasksList"></div>
            </div>
        </div>
    </div>

    <!-- Botón flotante -->
    <button class="floating-btn" onclick="toggleFloatingPanel()">⚡</button>

    <!-- Panel flotante -->
    <div id="floatingPanel" class="floating-panel">
        <div class="panel-header">
            <h3>⚡ Acción Rápida</h3>
            <button class="close-panel" onclick="toggleFloatingPanel()">×</button>
        </div>
        <div class="panel-body">
            <button onclick="showCreateProjectPanel()" style="width:100%; margin-bottom:10px;">📁 Crear Proyecto</button>
            <button onclick="showCreateTaskPanel()" style="width:100%; margin-bottom:10px;">✅ Crear Tarea</button>
            <button onclick="showAddMemberPanel()" style="width:100%; margin-bottom:10px;">👥 Agregar Miembro</button>
            <button onclick="exportData()" style="width:100%; margin-bottom:10px; background:#28a745;">💾 Exportar Datos</button>
            <button onclick="importDataPrompt()" style="width:100%; background:#17a2b8;">📥 Importar Datos</button>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        // ============================================
        // SISTEMA DE GESTIÓN DE PROYECTOS - CORE
        // ============================================

        class ProjectManagementSystem {
            constructor() {
                this.projects = this.loadFromStorage('projects') || [];
                this.currentProjectIndex = parseInt(this.loadFromStorage('currentProjectIndex')) || 0;
                this.teamMembers = this.loadFromStorage('teamMembers') || [];
                this.evmChart = null;
                this.indicesChart = null;
                this.initialize();
            }

            loadFromStorage(key) {
                try {
                    const data = localStorage.getItem(key);
                    return data ? JSON.parse(data) : null;
                } catch (error) {
                    console.error(`Error loading ${key}:`, error);
                    return null;
                }
            }

            saveToStorage(key, data) {
                try {
                    localStorage.setItem(key, JSON.stringify(data));
                    return true;
                } catch (error) {
                    console.error(`Error saving ${key}:`, error);
                    return false;
                }
            }

            initialize() {
                if (this.projects.length === 0) {
                    this.createSampleProject();
                }
                this.renderProjects();
                this.renderTeamMembers();
                this.renderCurrentProject();
                this.updateStatistics();
                this.renderEVCharts();
            }

            createSampleProject() {
                const sampleProject = {
                    id: Date.now(),
                    name: 'Proyecto Demo EVM',
                    description: 'Proyecto de ejemplo para visualización de métricas',
                    clientName: 'Cliente Demo',
                    startDate: '2024-01-01',
                    endDate: '2024-12-31',
                    budget: 100000,
                    status: 'active',
                    tasks: [
                        { id: Date.now() + 1, name: 'Análisis de requisitos', status: 'completed', priority: 'high', progress: 100, estimatedHours: 40, actualHours: 45, deadline: '2024-02-01' },
                        { id: Date.now() + 2, name: 'Diseño de arquitectura', status: 'completed', priority: 'high', progress: 100, estimatedHours: 60, actualHours: 55, deadline: '2024-03-01' },
                        { id: Date.now() + 3, name: 'Desarrollo backend', status: 'in_progress', priority: 'high', progress: 65, estimatedHours: 120, actualHours: 80, deadline: '2024-05-01' },
                        { id: Date.now() + 4, name: 'Desarrollo frontend', status: 'in_progress', priority: 'medium', progress: 45, estimatedHours: 100, actualHours: 50, deadline: '2024-06-01' },
                        { id: Date.now() + 5, name: 'Pruebas QA', status: 'pending', priority: 'medium', progress: 0, estimatedHours: 80, actualHours: 0, deadline: '2024-07-01' }
                    ],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                this.projects.push(sampleProject);
                this.saveToStorage('projects', this.projects);
            }

            createProject(projectData) {
                const project = {
                    id: Date.now(),
                    name: projectData.name || 'Proyecto sin nombre',
                    description: projectData.description || '',
                    clientName: projectData.clientName || '',
                    startDate: projectData.startDate || new Date().toISOString(),
                    endDate: projectData.endDate || '',
                    budget: parseFloat(projectData.budget) || 0,
                    status: 'active',
                    tasks: [],
                    teamMembers: projectData.teamMembers || [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                this.projects.push(project);
                this.saveToStorage('projects', this.projects);
                this.renderProjects();
                this.selectProject(this.projects.length - 1);
                return project;
            }

            selectProject(index) {
                if (!this.projects[index]) return false;
                this.currentProjectIndex = index;
                this.saveToStorage('currentProjectIndex', index);
                this.renderCurrentProject();
                this.updateStatistics();
                this.renderEVCharts();
                return true;
            }

            deleteProject(index) {
                if (!this.projects[index]) return false;
                this.projects.splice(index, 1);
                this.saveToStorage('projects', this.projects);
                if (this.currentProjectIndex >= this.projects.length) {
                    this.currentProjectIndex = Math.max(0, this.projects.length - 1);
                }
                this.saveToStorage('currentProjectIndex', this.currentProjectIndex);
                this.renderProjects();
                if (this.projects.length > 0) this.renderCurrentProject();
                return true;
            }

            getCurrentProject() {
                return this.projects[this.currentProjectIndex] || null;
            }

            createTask(taskData) {
                const project = this.getCurrentProject();
                if (!project) return null;
                const task = {
                    id: Date.now(),
                    name: taskData.name || 'Tarea sin nombre',
                    description: taskData.description || '',
                    status: taskData.status || 'pending',
                    priority: taskData.priority || 'medium',
                    assignedTo: taskData.assignedTo || '',
                    startDate: taskData.startDate || '',
                    deadline: taskData.deadline || '',
                    estimatedHours: parseFloat(taskData.estimatedHours) || 0,
                    actualHours: parseFloat(taskData.actualHours) || 0,
                    progress: parseInt(taskData.progress) || 0,
                    tags: taskData.tags || [],
                    dependencies: taskData.dependencies || [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                project.tasks.push(task);
                project.updatedAt = new Date().toISOString();
                this.saveToStorage('projects', this.projects);
                this.renderTasks();
                this.updateStatistics();
                this.renderEVCharts();
                return task;
            }

            updateTask(taskId, updates) {
                const project = this.getCurrentProject();
                if (!project) return false;
                const taskIndex = project.tasks.findIndex(t => t.id === taskId);
                if (taskIndex === -1) return false;
                project.tasks[taskIndex] = { ...project.tasks[taskIndex], ...updates, updatedAt: new Date().toISOString() };
                project.updatedAt = new Date().toISOString();
                this.saveToStorage('projects', this.projects);
                this.renderTasks();
                this.updateStatistics();
                this.renderEVCharts();
                return true;
            }

            deleteTask(taskId) {
                const project = this.getCurrentProject();
                if (!project) return false;
                const taskIndex = project.tasks.findIndex(t => t.id === taskId);
                if (taskIndex === -1) return false;
                project.tasks.splice(taskIndex, 1);
                project.updatedAt = new Date().toISOString();
                this.saveToStorage('projects', this.projects);
                this.renderTasks();
                this.updateStatistics();
                this.renderEVCharts();
                return true;
            }

            addTeamMember(memberData) {
                const member = {
                    id: Date.now(),
                    name: memberData.name || '',
                    email: memberData.email || '',
                    role: memberData.role || '',
                    skills: memberData.skills || [],
                    hourlyRate: parseFloat(memberData.hourlyRate) || 0,
                    isActive: true,
                    joinedAt: new Date().toISOString()
                };
                this.teamMembers.push(member);
                this.saveToStorage('teamMembers', this.teamMembers);
                this.renderTeamMembers();
                return member;
            }

            removeTeamMember(memberId) {
                const memberIndex = this.teamMembers.findIndex(m => m.id === memberId);
                if (memberIndex === -1) return false;
                this.teamMembers.splice(memberIndex, 1);
                this.saveToStorage('teamMembers', this.teamMembers);
                this.renderTeamMembers();
                return true;
            }

            calculateProjectStatistics() {
                const project = this.getCurrentProject();
                if (!project) return null;
                const tasks = project.tasks;
                const totalTasks = tasks.length;
                const completedTasks = tasks.filter(t => t.status === 'completed').length;
                const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
                const pendingTasks = tasks.filter(t => t.status === 'pending').length;
                const overdueTasks = tasks.filter(t => {
                    if (!t.deadline || t.status === 'completed') return false;
                    return new Date(t.deadline) < new Date();
                }).length;
                const totalEstimatedHours = tasks.reduce((sum, t) => sum + (t.estimatedHours || 0), 0);
                const totalActualHours = tasks.reduce((sum, t) => sum + (t.actualHours || 0), 0);
                const averageProgress = totalTasks > 0 ? tasks.reduce((sum, t) => sum + (t.progress || 0), 0) / totalTasks : 0;
                const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
                const efficiencyRate = totalEstimatedHours > 0 ? (totalEstimatedHours / totalActualHours) * 100 : 100;
                return {
                    totalTasks, completedTasks, inProgressTasks, pendingTasks, overdueTasks,
                    totalEstimatedHours, totalActualHours, averageProgress: Math.round(averageProgress),
                    completionRate: Math.round(completionRate), efficiencyRate: Math.round(efficiencyRate),
                    budget: project.budget || 0
                };
            }

            calculateEVMMetrics() {
                const project = this.getCurrentProject();
                if (!project || project.tasks.length === 0) return null;
                
                // Simular fechas para el gráfico (últimos 12 meses)
                const dates = [];
                const pv = []; // Planned Value
                const ev = []; // Earned Value
                const ac = []; // Actual Cost
                
                const today = new Date();
                for (let i = 11; i >= 0; i--) {
                    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
                    dates.push(date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }));
                    
                    // Simular valores basados en progreso real de tareas
                    const progressFactor = i / 11;
                    const totalBudget = project.budget || 100000;
                    const totalProgress = project.tasks.reduce((sum, t) => sum + (t.progress || 0), 0) / (project.tasks.length * 100);
                    
                    pv.push(Math.round(totalBudget * progressFactor));
                    ev.push(Math.round(totalBudget * totalProgress * progressFactor));
                    ac.push(Math.round(totalBudget * totalProgress * progressFactor * 1.1));
                }
                
                return { dates, pv, ev, ac, bac: project.budget || 100000 };
            }

            renderEVCharts() {
                const metrics = this.calculateEVMMetrics();
                if (!metrics) return;
                
                const ctx1 = document.getElementById('evmCanvas').getContext('2d');
                const ctx2 = document.getElementById('indicesCanvas').getContext('2d');
                
                if (this.evmChart) this.evmChart.destroy();
                if (this.indicesChart) this.indicesChart.destroy();
                
                this.evmChart = new Chart(ctx1, {
                    type: 'line',
                    data: {
                        labels: metrics.dates,
                        datasets: [
                            { label: 'PV (Plan Value)', data: metrics.pv, borderColor: '#3498db', backgroundColor: 'transparent', tension: 0.4, fill: false },
                            { label: 'EV (Earned Value)', data: metrics.ev, borderColor: '#2ecc71', backgroundColor: 'transparent', tension: 0.4, fill: false },
                            { label: 'AC (Actual Cost)', data: metrics.ac, borderColor: '#e74c3c', backgroundColor: 'transparent', tension: 0.4, fill: false },
                            { label: 'BAC', data: Array(metrics.dates.length).fill(metrics.bac), borderColor: '#34495e', borderDash: [5, 5], backgroundColor: 'transparent', fill: false }
                        ]
                    },
                    options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'top' } } }
                });
                
                const cpi = metrics.ev.map((v, i) => v / (metrics.ac[i] || 1));
                const spi = metrics.ev.map((v, i) => v / (metrics.pv[i] || 1));
                
                this.indicesChart = new Chart(ctx2, {
                    type: 'line',
                    data: {
                        labels: metrics.dates,
                        datasets: [
                            { label: 'CPI', data: cpi, borderColor: '#1abc9c', backgroundColor: 'transparent', tension: 0.4, fill: false },
                            { label: 'SPI', data: spi, borderColor: '#9b59b6', backgroundColor: 'transparent', tension: 0.4, fill: false }
                        ]
                    },
                    options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'top' } } }
                });
            }

            updateStatistics() {
                const stats = this.calculateProjectStatistics();
                if (!stats) return;
                document.getElementById('totalTasks').textContent = stats.totalTasks;
                document.getElementById('completedTasks').textContent = stats.completedTasks;
                document.getElementById('inProgressTasks').textContent = stats.inProgressTasks;
                document.getElementById('pendingTasks').textContent = stats.pendingTasks;
                document.getElementById('overdueTasks').textContent = stats.overdueTasks;
                document.getElementById('averageProgress').textContent = `${stats.averageProgress}%`;
            }

            renderProjects() {
                const container = document.getElementById('projectsList');
                if (!container) return;
                if (this.projects.length === 0) {
                    container.innerHTML = '<div class="empty-state">No hay proyectos</div>';
                    return;
                }
                container.innerHTML = this.projects.map((project, index) => `
                    <div class="project-item ${index === this.currentProjectIndex ? 'active' : ''}" onclick="system.selectProject(${index})">
                        <div class="project-info">
                            <h4>${this.escapeHtml(project.name)}</h4>
                            <p>${project.tasks.length} tareas</p>
                        </div>
                        <div class="project-actions" style="margin-top:10px;">
                            <button onclick="event.stopPropagation(); system.deleteProject(${index})" class="danger" style="font-size:12px;">Eliminar</button>
                        </div>
                    </div>
                `).join('');
            }

            renderTasks() {
                const container = document.getElementById('tasksList');
                if (!container) return;
                const project = this.getCurrentProject();
                if (!project || project.tasks.length === 0) {
                    container.innerHTML = '<div class="empty-state">No hay tareas</div>';
                    return;
                }
                container.innerHTML = project.tasks.map(task => `
                    <div class="task-item ${task.status}">
                        <div class="task-header">
                            <h4>${this.escapeHtml(task.name)}</h4>
                            <span class="priority ${task.priority}">${task.priority}</span>
                        </div>
                        <div class="task-meta" style="margin-bottom:10px;">
                            <span class="status ${task.status}">${task.status}</span>
                            <span class="progress">${task.progress}%</span>
                            ${task.deadline ? `<span>📅 ${task.deadline}</span>` : ''}
                        </div>
                        <div class="task-actions">
                            <button onclick="updateTaskProgress(${task.id})">Actualizar Progreso</button>
                            <button onclick="system.deleteTask(${task.id})" class="danger">Eliminar</button>
                        </div>
                    </div>
                `).join('');
            }

            renderTeamMembers() {
                const container = document.getElementById('teamMembersList');
                if (!container) return;
                if (this.teamMembers.length === 0) {
                    container.innerHTML = '<div class="empty-state">No hay miembros</div>';
                    return;
                }
                container.innerHTML = this.teamMembers.map(member => `
                    <div class="project-item">
                        <div class="member-info">
                            <h4>${this.escapeHtml(member.name)}</h4>
                            <p>${this.escapeHtml(member.role)}</p>
                        </div>
                        <div class="member-actions" style="margin-top:10px;">
                            <button onclick="system.removeTeamMember(${member.id})" class="danger" style="font-size:12px;">Eliminar</button>
                        </div>
                    </div>
                `).join('');
            }

            renderCurrentProject() {
                this.renderTasks();
                this.updateStatistics();
                this.renderEVCharts();
            }

            escapeHtml(text) {
                if (!text) return '';
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            }

            exportData() {
                const data = { projects: this.projects, teamMembers: this.teamMembers, exportDate: new Date().toISOString() };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `backup-proyectos-${new Date().toISOString().split('T')[0]}.json`;
                a.click();
                URL.revokeObjectURL(url);
            }

            importData(file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);
                        if (data.projects) { this.projects = data.projects; this.saveToStorage('projects', this.projects); }
                        if (data.teamMembers) { this.teamMembers = data.teamMembers; this.saveToStorage('teamMembers', this.teamMembers); }
                        this.initialize();
                        alert('Datos importados correctamente');
                    } catch (error) { alert('Error al importar datos'); }
                };
                reader.readAsText(file);
            }
        }

        // Funciones globales UI
        let system;

        function toggleFloatingPanel() {
            const panel = document.getElementById('floatingPanel');
            panel.classList.toggle('show');
        }

        function showCreateProjectPanel() {
            const name = prompt('Nombre del proyecto:');
            if (name) system.createProject({ name, budget: prompt('Presupuesto:', '100000') });
            toggleFloatingPanel();
        }

        function showCreateTaskPanel() {
            const name = prompt('Nombre de la tarea:');
            if (name) system.createTask({ name, priority: prompt('Prioridad (high/medium/low):', 'medium'), estimatedHours: prompt('Horas estimadas:', '40') });
            toggleFloatingPanel();
        }

        function showAddMemberPanel() {
            const name = prompt('Nombre del miembro:');
            if (name) system.addTeamMember({ name, role: prompt('Rol:', 'Desarrollador'), email: prompt('Email:', '') });
            toggleFloatingPanel();
        }

        function updateTaskProgress(taskId) {
            const progress = prompt('Nuevo porcentaje de progreso (0-100):', '50');
            if (progress !== null) system.updateTask(taskId, { progress: parseInt(progress), status: parseInt(progress) === 100 ? 'completed' : 'in_progress' });
        }

        function exportData() { system.exportData(); }
        
        function importDataPrompt() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = (e) => { if (e.target.files[0]) system.importData(e.target.files[0]); };
            input.click();
            toggleFloatingPanel();
        }

        document.addEventListener('DOMContentLoaded', () => {
            system = new ProjectManagementSystem();
            window.system = system;
            window.updateTaskProgress = updateTaskProgress;
            window.exportData = exportData;
            window.importDataPrompt = importDataPrompt;
            window.showCreateProjectPanel = showCreateProjectPanel;
            window.showCreateTaskPanel = showCreateTaskPanel;
            window.showAddMemberPanel = showAddMemberPanel;
            window.toggleFloatingPanel = toggleFloatingPanel;
        });
    </script>
</body>
</html>