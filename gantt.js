console.log("📊 GANTT CHART V3 - SISTEMA NUEVO");

// ================================================
// 1. INICIALIZACIÓN DEL GANTT CHART
// ================================================
function renderGanttChart(tasks = null) {
    console.log("🚀 Iniciando renderGanttChart - Versión Nueva");
    
    const ganttContainer = document.getElementById('ganttContainer');
    if (!ganttContainer) {
        console.error("❌ No se encuentra #ganttContainer");
        return;
    }

    // Limpiar contenedor
    ganttContainer.innerHTML = '';
    ganttContainer.className = 'gantt-chart-container';
    
    // Obtener tareas
    const project = projects[currentProjectIndex];
    if (!project || !project.tasks || project.tasks.length === 0) {
        ganttContainer.innerHTML = `
            <div class="no-tasks-gantt">
                <i class="fas fa-chart-gantt"></i>
                <h3>No hay tareas para mostrar</h3>
                <p>Crea tareas con fechas para ver el diagrama Gantt</p>
            </div>
        `;
        return;
    }

    const tasksToRender = tasks || project.tasks.filter(task => task.startDate || task.deadline);
    
    if (tasksToRender.length === 0) {
        ganttContainer.innerHTML = `
            <div class="no-tasks-gantt">
                <i class="fas fa-calendar-times"></i>
                <h3>No hay tareas con fechas</h3>
                <p>Agrega fechas de inicio y fin a las tareas</p>
            </div>
        `;
        return;
    }

    // Calcular fechas mínima y máxima
    const dates = [];
    tasksToRender.forEach(task => {
        if (task.startDate) dates.push(new Date(task.startDate));
        if (task.deadline) dates.push(new Date(task.deadline));
    });

    if (dates.length === 0) return;

    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    
    // Extender el rango un poco
    minDate.setDate(minDate.getDate() - 2);
    maxDate.setDate(maxDate.getDate() + 2);
    
    const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24));
    
    // Crear estructura del Gantt
    createGanttStructure(ganttContainer, minDate, maxDate, totalDays);
    
    // Añadir filas de tareas
    tasksToRender.forEach((task, index) => {
        addGanttTaskRow(ganttContainer, task, minDate, maxDate, totalDays, index);
    });

    // Calcular y mostrar ruta crítica
    const criticalTasks = calculateCriticalPath(tasksToRender);
    highlightCriticalPath(ganttContainer, criticalTasks);

    console.log(`✅ Gantt renderizado: ${tasksToRender.length} tareas`);
}

// ================================================
// 2. ESTRUCTURA DEL GANTT
// ================================================
function createGanttStructure(container, minDate, maxDate, totalDays) {
    // Contenedor principal
    const ganttElement = document.createElement('div');
    ganttElement.className = 'gantt-main';
    
    // Encabezado con timeline
    const header = createGanttHeader(minDate, maxDate, totalDays);
    ganttElement.appendChild(header);
    
    // Área de tareas
    const tasksArea = document.createElement('div');
    tasksArea.className = 'gantt-tasks-area';
    ganttElement.appendChild(tasksArea);
    
    container.appendChild(ganttElement);
}

function createGanttHeader(minDate, maxDate, totalDays) {
    const header = document.createElement('div');
    header.className = 'gantt-header';
    
    // Celda vacía para alinear con nombres de tareas
    const taskLabel = document.createElement('div');
    taskLabel.className = 'gantt-header-task';
    taskLabel.textContent = 'Tarea';
    header.appendChild(taskLabel);
    
    // Timeline
    const timeline = document.createElement('div');
    timeline.className = 'gantt-timeline';
    
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    
    for (let i = 0; i <= totalDays; i++) {
        const currentDate = new Date(minDate);
        currentDate.setDate(currentDate.getDate() + i);
        
        const dayElement = document.createElement('div');
        dayElement.className = 'gantt-day';
        
        // Marcar fines de semana
        if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
            dayElement.classList.add('weekend');
        }
        
        // Marcar hoy
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const checkDate = new Date(currentDate);
        checkDate.setHours(0, 0, 0, 0);
        if (checkDate.getTime() === today.getTime()) {
            dayElement.classList.add('today');
        }
        
        // Contenido del día
        const dayNum = currentDate.getDate();
        const dayName = dayNames[currentDate.getDay()];
        const monthName = monthNames[currentDate.getMonth()];
        
        // Solo mostrar mes cada 7 días o en el primer día
        if (i === 0 || dayNum === 1 || i % 7 === 0) {
            dayElement.innerHTML = `
                <div class="day-month">${monthName}</div>
                <div class="day-number">${dayNum}</div>
                <div class="day-name">${dayName}</div>
            `;
        } else {
            dayElement.innerHTML = `
                <div class="day-number">${dayNum}</div>
                <div class="day-name">${dayName}</div>
            `;
        }
        
        // Tooltip con fecha completa
        dayElement.title = currentDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        timeline.appendChild(dayElement);
    }
    
    header.appendChild(timeline);
    return header;
}

// ================================================
// 3. AGREGAR FILAS DE TAREAS
// ================================================
function addGanttTaskRow(container, task, minDate, maxDate, totalDays, index) {
    const tasksArea = container.querySelector('.gantt-tasks-area');
    if (!tasksArea) return;
    
    const row = document.createElement('div');
    row.className = 'gantt-task-row';
    row.dataset.taskId = task.id;
    
    // Información de la tarea (lado izquierdo)
    const taskInfo = document.createElement('div');
    taskInfo.className = 'gantt-task-info';
    taskInfo.innerHTML = `
        <div class="task-name">${task.name || 'Sin nombre'}</div>
        <div class="task-meta">
            <span class="task-assignee">👤 ${task.assignee || 'No asignado'}</span>
            <span class="task-status status-${task.status}">${getStatusText(task.status)}</span>
        </div>
    `;
    
    taskInfo.addEventListener('click', () => showTaskDetails(task));
    row.appendChild(taskInfo);
    
    // Timeline de la tarea (lado derecho)
    const taskTimeline = document.createElement('div');
    taskTimeline.className = 'gantt-task-timeline';
    
    // Crear barras para cada día
    for (let i = 0; i <= totalDays; i++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'gantt-day-cell';
        
        // Verificar si este día está dentro del rango de la tarea
        if (task.startDate && task.deadline) {
            const currentDate = new Date(minDate);
            currentDate.setDate(currentDate.getDate() + i);
            currentDate.setHours(0, 0, 0, 0);
            
            const startDate = new Date(task.startDate);
            startDate.setHours(0, 0, 0, 0);
            
            const endDate = new Date(task.deadline);
            endDate.setHours(0, 0, 0, 0);
            
            if (currentDate >= startDate && currentDate <= endDate) {
                dayCell.classList.add('task-bar');
                dayCell.classList.add(`status-${task.status}`);
                
                // Primer día de la tarea
                if (currentDate.getTime() === startDate.getTime()) {
                    dayCell.classList.add('task-start');
                }
                
                // Último día de la tarea
                if (currentDate.getTime() === endDate.getTime()) {
                    dayCell.classList.add('task-end');
                }
                
                // Tooltip con información de la tarea
                const progressPercent = task.timeLogged && task.estimatedTime 
                    ? Math.round((task.timeLogged / task.estimatedTime) * 100) 
                    : 0;
                
                dayCell.title = `
                    ${task.name}
                    ${formatDate(task.startDate)} → ${formatDate(task.deadline)}
                    ${task.timeLogged || 0}h / ${task.estimatedTime || 0}h (${progressPercent}%)
                    ${task.assignee ? `👤 ${task.assignee}` : ''}
                `.trim();
                
                dayCell.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showTaskDetails(task);
                });
            }
        }
        
        taskTimeline.appendChild(dayCell);
    }
    
    // Barra de progreso continua (opcional)
    if (task.startDate && task.deadline) {
        const startDate = new Date(task.startDate);
        const endDate = new Date(task.deadline);
        
        const startOffset = Math.max(0, Math.ceil((startDate - minDate) / (1000 * 60 * 60 * 24)));
        const duration = Math.max(1, Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1);
        
        if (startOffset <= totalDays && duration > 0) {
            const progressBar = document.createElement('div');
            progressBar.className = 'gantt-progress-bar';
            progressBar.style.left = `${(startOffset / totalDays) * 100}%`;
            progressBar.style.width = `${(duration / totalDays) * 100}%`;
            progressBar.classList.add(`status-${task.status}`);
            
            // Indicador de progreso dentro de la barra
            if (task.timeLogged && task.estimatedTime && task.estimatedTime > 0) {
                const progressPercent = Math.min(100, (task.timeLogged / task.estimatedTime) * 100);
                const progressIndicator = document.createElement('div');
                progressIndicator.className = 'gantt-progress-indicator';
                progressIndicator.style.width = `${progressPercent}%`;
                progressBar.appendChild(progressIndicator);
            }
            
            taskTimeline.appendChild(progressBar);
        }
    }
    
    row.appendChild(taskTimeline);
    tasksArea.appendChild(row);
}

// ================================================
// 4. RUTA CRÍTICA
// ================================================
function calculateCriticalPath(tasks) {
    if (!Array.isArray(tasks) || tasks.length === 0) return [];
    
    // Implementación simplificada
    // En un sistema real, aquí usarías el algoritmo CPM o PERT
    const criticalTasks = tasks.filter(task => {
        // Tareas con alta prioridad y sin margen de tiempo
        return task.priority === 'alta' || task.status === 'inProgress';
    });
    
    return criticalTasks.slice(0, 3); // Limitar a 3 tareas críticas para ejemplo
}

function highlightCriticalPath(container, criticalTasks) {
    const criticalTaskIds = new Set(criticalTasks.map(t => t.id));
    
    container.querySelectorAll('.gantt-task-row').forEach(row => {
        const taskId = parseInt(row.dataset.taskId);
        if (criticalTaskIds.has(taskId)) {
            row.classList.add('critical-path');
        }
    });
}

// ================================================
// 5. FILTROS PARA GANTT
// ================================================
function setupGanttFilters() {
    const filterBtn = document.getElementById('filterGanttBtn');
    const clearBtn = document.getElementById('clearGanttFilters');
    const assigneeFilter = document.getElementById('filterAssigneeGantt');
    const priorityFilter = document.getElementById('filterPriorityGantt');
    const statusFilter = document.getElementById('filterStatusGantt');
    
    if (filterBtn) {
        filterBtn.addEventListener('click', applyGanttFilters);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearGanttFilters);
    }
    
    if (assigneeFilter) {
        assigneeFilter.addEventListener('change', applyGanttFilters);
    }
    
    if (priorityFilter) {
        priorityFilter.addEventListener('change', applyGanttFilters);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', applyGanttFilters);
    }
}

function applyGanttFilters() {
    const assignee = document.getElementById('filterAssigneeGantt')?.value;
    const priority = document.getElementById('filterPriorityGantt')?.value;
    const status = document.getElementById('filterStatusGantt')?.value;
    
    const project = projects[currentProjectIndex];
    if (!project) return;
    
    let filteredTasks = project.tasks;
    
    if (assignee) {
        filteredTasks = filteredTasks.filter(task => task.assignee === assignee);
    }
    
    if (priority) {
        filteredTasks = filteredTasks.filter(task => task.priority === priority);
    }
    
    if (status) {
        filteredTasks = filteredTasks.filter(task => task.status === status);
    }
    
    renderGanttChart(filteredTasks);
}

function clearGanttFilters() {
    const assigneeFilter = document.getElementById('filterAssigneeGantt');
    const priorityFilter = document.getElementById('filterPriorityGantt');
    const statusFilter = document.getElementById('filterStatusGantt');
    
    if (assigneeFilter) assigneeFilter.value = '';
    if (priorityFilter) priorityFilter.value = '';
    if (statusFilter) statusFilter.value = '';
    
    renderGanttChart();
}

// ================================================
// 6. FUNCIONES AUXILIARES
// ================================================
function formatDate(dateString) {
    if (!dateString) return '--/--/----';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } catch {
        return '--/--/----';
    }
}

function getStatusText(status) {
    const statusMap = {
        'pending': 'Pendiente',
        'inProgress': 'En Progreso',
        'completed': 'Completado',
        'overdue': 'Rezagado'
    };
    return statusMap[status] || status || 'Desconocido';
}

// ================================================
// 7. INICIALIZACIÓN
// ================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('📊 Gantt Chart inicializado');
    
    // Inicializar filtros
    setupGanttFilters();
    
    // Asegurar que el selector de vista Gantt esté configurado
    const ganttViewBtn = document.getElementById('showGanttView');
    if (ganttViewBtn) {
        ganttViewBtn.addEventListener('click', function() {
            console.log('🔄 Mostrando vista Gantt');
            renderGanttChart();
        });
    }
    
    // Agregar estilos CSS si no existen
    addGanttStyles();
});

// ================================================
// 8. ESTILOS CSS PARA EL GANTT
// ================================================
function addGanttStyles() {
    if (document.getElementById('gantt-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'gantt-styles';
    style.textContent = `
        /* Contenedor principal del Gantt */
        .gantt-chart-container {
            width: 100%;
            overflow-x: auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            font-family: Arial, sans-serif;
        }
        
        .no-tasks-gantt {
            text-align: center;
            padding: 40px 20px;
            color: #7f8c8d;
        }
        
        .no-tasks-gantt i {
            font-size: 48px;
            margin-bottom: 15px;
            opacity: 0.5;
        }
        
        .no-tasks-gantt h3 {
            margin: 10px 0;
            color: #34495e;
        }
        
        /* Estructura principal */
        .gantt-main {
            min-width: 800px;
        }
        
        /* Encabezado */
        .gantt-header {
            display: flex;
            border-bottom: 2px solid #ecf0f1;
            background: #f8f9fa;
            position: sticky;
            top: 0;
            z-index: 10;
        }
        
        .gantt-header-task {
            width: 200px;
            min-width: 200px;
            padding: 12px 15px;
            font-weight: bold;
            color: #2c3e50;
            border-right: 1px solid #ddd;
            display: flex;
            align-items: center;
        }
        
        .gantt-timeline {
            display: flex;
            flex: 1;
            min-width: 600px;
        }
        
        .gantt-day {
            flex: 1;
            min-width: 40px;
            max-width: 60px;
            padding: 8px 4px;
            text-align: center;
            border-right: 1px solid #ecf0f1;
            font-size: 11px;
        }
        
        .gantt-day.weekend {
            background-color: #f8f9fa;
        }
        
        .gantt-day.today {
            background-color: #e3f2fd;
            font-weight: bold;
        }
        
        .day-month {
            font-weight: bold;
            color: #3498db;
            font-size: 10px;
            margin-bottom: 2px;
        }
        
        .day-number {
            font-size: 14px;
            font-weight: bold;
            margin: 2px 0;
        }
        
        .day-name {
            color: #7f8c8d;
            font-size: 10px;
        }
        
        /* Filas de tareas */
        .gantt-tasks-area {
            max-height: 500px;
            overflow-y: auto;
        }
        
        .gantt-task-row {
            display: flex;
            border-bottom: 1px solid #ecf0f1;
            transition: background-color 0.2s;
        }
        
        .gantt-task-row:hover {
            background-color: #f8f9fa;
        }
        
        .gantt-task-row.critical-path {
            background-color: #fff8e1;
            border-left: 3px solid #ff9800;
        }
        
        .gantt-task-info {
            width: 200px;
            min-width: 200px;
            padding: 12px 15px;
            border-right: 1px solid #ddd;
            cursor: pointer;
        }
        
        .gantt-task-info:hover {
            background-color: #e3f2fd;
        }
        
        .task-name {
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        
        .task-meta {
            display: flex;
            gap: 8px;
            font-size: 11px;
            color: #7f8c8d;
        }
        
        .task-assignee {
            background: #e3f2fd;
            padding: 2px 6px;
            border-radius: 3px;
        }
        
        .task-status {
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 10px;
            font-weight: bold;
        }
        
        .status-pending {
            background: #fff3cd;
            color: #856404;
        }
        
        .status-inProgress {
            background: #d1ecf1;
            color: #0c5460;
        }
        
        .status-completed {
            background: #d4edda;
            color: #155724;
        }
        
        .status-overdue {
            background: #f8d7da;
            color: #721c24;
        }
        
        /* Timeline de tareas */
        .gantt-task-timeline {
            display: flex;
            flex: 1;
            min-width: 600px;
            position: relative;
        }
        
        .gantt-day-cell {
            flex: 1;
            min-width: 40px;
            max-width: 60px;
            height: 100%;
            border-right: 1px solid #ecf0f1;
        }
        
        .gantt-day-cell.task-bar {
            background-color: rgba(52, 152, 219, 0.2);
            position: relative;
        }
        
        .gantt-day-cell.task-bar.status-pending {
            background-color: rgba(255, 193, 7, 0.2);
        }
        
        .gantt-day-cell.task-bar.status-inProgress {
            background-color: rgba(23, 162, 184, 0.2);
        }
        
        .gantt-day-cell.task-bar.status-completed {
            background-color: rgba(40, 167, 69, 0.2);
        }
        
        .gantt-day-cell.task-bar.status-overdue {
            background-color: rgba(220, 53, 69, 0.2);
        }
        
        .gantt-day-cell.task-start {
            border-left: 2px solid #3498db;
        }
        
        .gantt-day-cell.task-end {
            border-right: 2px solid #3498db;
        }
        
        /* Barra de progreso continua */
        .gantt-progress-bar {
            position: absolute;
            top: 25%;
            height: 50%;
            border-radius: 4px;
            opacity: 0.7;
            z-index: 1;
        }
        
        .gantt-progress-bar.status-pending {
            background-color: #ffc107;
        }
        
        .gantt-progress-bar.status-inProgress {
            background-color: #17a2b8;
        }
        
        .gantt-progress-bar.status-completed {
            background-color: #28a745;
        }
        
        .gantt-progress-bar.status-overdue {
            background-color: #dc3545;
        }
        
        .gantt-progress-indicator {
            height: 100%;
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 4px;
        }
        
        /* Filtros */
        .gantt-filters {
            display: flex;
            gap: 10px;
            padding: 15px;
            background: #f8f9fa;
            border-bottom: 1px solid #ddd;
            flex-wrap: wrap;
        }
        
        .gantt-filter-group {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .gantt-filter-group label {
            font-size: 12px;
            font-weight: bold;
            color: #495057;
        }
        
        .gantt-filter-group select {
            padding: 6px 10px;
            border: 1px solid #ced4da;
            border-radius: 4px;
            font-size: 12px;
        }
        
        /* Botones */
        .gantt-btn {
            padding: 6px 12px;
            border: none;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .gantt-btn-primary {
            background: #007bff;
            color: white;
        }
        
        .gantt-btn-primary:hover {
            background: #0056b3;
        }
        
        .gantt-btn-secondary {
            background: #6c757d;
            color: white;
        }
        
        .gantt-btn-secondary:hover {
            background: #545b62;
        }
        
        /* Leyenda */
        .gantt-legend {
            display: flex;
            gap: 15px;
            padding: 10px 15px;
            background: #f8f9fa;
            border-top: 1px solid #ddd;
            flex-wrap: wrap;
        }
        
        .legend-item {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 11px;
        }
        
        .legend-color {
            width: 12px;
            height: 12px;
            border-radius: 2px;
        }
        
        .legend-critical {
            border-left: 3px solid #ff9800;
            padding-left: 8px;
        }
    `;
    
    document.head.appendChild(style);
    console.log('🎨 Estilos Gantt agregados');
}

// ================================================
// 9. FUNCIONES PÚBLICAS PARA INTEGRACIÓN
// ================================================
window.GanttChart = {
    render: renderGanttChart,
    applyFilters: applyGanttFilters,
    clearFilters: clearGanttFilters,
    refresh: function() {
        renderGanttChart();
    }
};

console.log("✅ Gantt Chart Module Cargado");