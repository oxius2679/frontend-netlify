// ============================================================
// 🆘 SISTEMA DE AYUDA EJECUTIVO ULTIMATE v3.4 (TODAS LAS SECCIONES)
// ============================================================
// ✅ Todas las secciones en español e inglés
// ✅ Botones responsivos (incluido engrane) en una línea
// ✅ Búsqueda, feedback, tickets, atajos, etc.
// ============================================================

(function() {
    'use strict';

    // ============================================================
    // 1. TRADUCCIONES COMPLETAS (TODAS LAS SECCIONES)
    // ============================================================
    const HELP_DATA = {
        es: {
            title: 'Centro de Ayuda Ejecutivo',
            subtitle: 'Guía completa para maximizar tu productividad',
            searchPlaceholder: '🔍 Buscar ayuda...',
            noResults: 'No se encontraron resultados para "{{query}}"',
            categories: {
                all: 'Todas',
                gettingStarted: 'Primeros pasos',
                coreFeatures: 'Funcionalidades principales',
                advanced: 'Herramientas avanzadas',
                collaboration: 'Colaboración',
                ai: 'Inteligencia Artificial',
                settings: 'Configuración',
                troubleshooting: 'Solución de problemas'
            },
            sections: [
                {
                    id: 'inicio',
                    category: 'gettingStarted',
                    icon: '🏠',
                    title: 'Centro de Comando IA 4D',
                    content: `
                        <p>El <strong>Centro de Comando IA 4D</strong> es tu punto de entrada principal al sistema. Desde aquí tienes una visión global de todos tus proyectos y accesos directos a las herramientas más poderosas.</p>
                        <h4>📊 KPIs Globales</h4>
                        <ul>
                            <li><strong>Proyectos:</strong> Número total de proyectos activos</li>
                            <li><strong>Tareas:</strong> Total de tareas en todos los proyectos</li>
                            <li><strong>Completadas:</strong> Tareas finalizadas con éxito</li>
                            <li><strong>Alertas:</strong> Tareas atrasadas o críticas que requieren atención</li>
                        </ul>
                        <h4>🤖 Agentes de IA</h4>
                        <ul>
                            <li><strong>PM IA Élite:</strong> Análisis ejecutivo completo con KPIs estratégicos, matriz de riesgos y forecasting</li>
                            <li><strong>Transcriptor IA:</strong> Grabación y análisis inteligente de reuniones con resumen automático</li>
                            <li><strong>Analista IA:</strong> Business Intelligence con métricas globales y recomendaciones</li>
                            <li><strong>Asistente Personal:</strong> Chat interactivo 24/7 para consultas rápidas</li>
                        </ul>
                        <h4>📋 Proyectos Activos</h4>
                        <p>Visualiza los proyectos más recientes con su progreso y estado. Haz clic en cualquier proyecto para abrirlo directamente.</p>
                        <div class="help-tip">💡 Tip: Usa el botón "Generar" para crear nuevos proyectos desde una descripción en lenguaje natural.</div>
                    `
                },
                {
                    id: 'kanban',
                    category: 'coreFeatures',
                    icon: '📋',
                    title: 'Tablero Kanban Ejecutivo',
                    content: `
                        <p>El <strong>Tablero Kanban</strong> te permite gestionar el flujo de trabajo de tus tareas de forma visual e intuitiva.</p>
                        <h4>📌 Columnas</h4>
                        <ul>
                            <li><span style="color:#f1c40f;">⬤</span> <strong>Pendiente:</strong> Tareas por iniciar</li>
                            <li><span style="color:#008090;">⬤</span> <strong>En Progreso:</strong> Tareas en ejecución</li>
                            <li><span style="color:#2ecc71;">⬤</span> <strong>Completado:</strong> Tareas finalizadas</li>
                            <li><span style="color:#e74c3c;">⬤</span> <strong>Rezagado:</strong> Tareas fuera de plazo</li>
                        </ul>
                        <h4>🖱️ Interacciones</h4>
                        <ul>
                            <li><strong>Arrastrar y soltar:</strong> Cambia el estado de una tarea moviéndola entre columnas</li>
                            <li><strong>Hacer clic:</strong> Abre el panel de edición detallada de la tarea</li>
                            <li><strong>Menú contextual (⋮):</strong> Accede a opciones rápidas como editar o eliminar</li>
                            <li><strong>Botones ↑↓:</strong> Reordena tareas dentro de la misma columna</li>
                        </ul>
                        <h4>🎯 Prioridades</h4>
                        <ul>
                            <li><span style="color:#e74c3c;">🔴 Alta:</span> Urgente, requiere atención inmediata</li>
                            <li><span style="color:#f39c12;">🟡 Media:</span> Importante, planificar con prioridad</li>
                            <li><span style="color:#2ecc71;">🟢 Baja:</span> Puede esperar</li>
                        </ul>
                        <div class="help-tip">💡 Tip: Las tareas críticas se marcan automáticamente con un borde rojo y una etiqueta "CRÍTICA".</div>
                    `
                },
                {
                    id: 'lista',
                    category: 'coreFeatures',
                    icon: '📄',
                    title: 'Vista Lista',
                    content: `
                        <p>La <strong>Vista Lista</strong> proporciona una tabla detallada con todas las tareas del proyecto, ideal para análisis rápidos y exportación de datos.</p>
                        <h4>📊 Columnas</h4>
                        <ul>
                            <li><strong>Tarea:</strong> Nombre de la tarea</li>
                            <li><strong>Fecha Inicio:</strong> Fecha planificada de inicio</li>
                            <li><strong>Fecha Límite:</strong> Fecha de entrega</li>
                            <li><strong>Estado:</strong> Pendiente, En Progreso, Completado, Rezagado</li>
                            <li><strong>Asignado:</strong> Persona responsable</li>
                            <li><strong>Prioridad:</strong> Alta, Media, Baja</li>
                        </ul>
                        <h4>🔍 Filtros</h4>
                        <ul>
                            <li><strong>Por asignado:</strong> Filtra tareas de un miembro específico</li>
                            <li><strong>Por prioridad:</strong> Muestra solo tareas de cierta prioridad</li>
                            <li><strong>Por estado:</strong> Filtra por estado de la tarea</li>
                            <li><strong>Por fechas:</strong> Rango de inicio y fin</li>
                        </ul>
                        <div class="help-tip">💡 Tip: Haz clic en cualquier fila para abrir la edición rápida de la tarea.</div>
                    `
                },
                {
                    id: 'calendario',
                    category: 'coreFeatures',
                    icon: '📅',
                    title: 'Calendario Integrado',
                    content: `
                        <p>El <strong>Calendario</strong> te permite visualizar tus tareas en una línea de tiempo mensual, semanal o diaria.</p>
                        <h4>📆 Vistas</h4>
                        <ul>
                            <li><strong>Mes:</strong> Visión general de todo el mes</li>
                            <li><strong>Semana:</strong> Detalle de la semana actual</li>
                            <li><strong>Día:</strong> Vista detallada por horas</li>
                        </ul>
                        <h4>🖱️ Interacciones</h4>
                        <ul>
                            <li><strong>Hacer clic en un evento:</strong> Abre la tarea para edición</li>
                            <li><strong>Arrastrar evento:</strong> Cambia la fecha de la tarea</li>
                            <li><strong>Hacer clic en un día:</strong> Abre el formulario de nueva tarea con esa fecha preestablecida</li>
                            <li><strong>Hover:</strong> Muestra un tooltip con información detallada</li>
                        </ul>
                        <h4>🎨 Colores por Estado</h4>
                        <ul>
                            <li><span style="background:#f1c40f; padding:2px 8px; border-radius:4px;">Amarillo</span> Pendiente</li>
                            <li><span style="background:#008090; padding:2px 8px; border-radius:4px; color:white;">Teal</span> En Progreso</li>
                            <li><span style="background:#2ecc71; padding:2px 8px; border-radius:4px;">Verde</span> Completado</li>
                            <li><span style="background:#e74c3c; padding:2px 8px; border-radius:4px; color:white;">Rojo</span> Rezagado</li>
                        </ul>
                        <div class="help-tip">💡 Tip: Los tooltips en el calendario muestran información clave como responsable, progreso y días restantes.</div>
                    `
                },
                {
                    id: 'gantt',
                    category: 'advanced',
                    icon: '📊',
                    title: 'Gantt Ejecutivo Premium',
                    content: `
                        <p>El <strong>Gantt Ejecutivo</strong> es una herramienta de planificación profesional que muestra la línea de tiempo de todas las tareas con sus dependencias y ruta crítica.</p>
                        <h4>📈 Componentes</h4>
                        <ul>
                            <li><strong>Barras de tareas:</strong> Representan la duración de cada tarea. Colores según estado.</li>
                            <li><strong>Línea HOY:</strong> Indica la fecha actual en el timeline</li>
                            <li><strong>Ruta Crítica:</strong> Tareas que determinan la duración total del proyecto (marcadas en rojo)</li>
                            <li><strong>Dependencias:</strong> Líneas con flechas que muestran relaciones entre tareas</li>
                        </ul>
                        <h4>🎯 Filtros Ejecutivos</h4>
                        <ul>
                            <li><strong>Críticas:</strong> Muestra solo tareas críticas</li>
                            <li><strong>Atrasadas:</strong> Tareas que han superado su fecha límite</li>
                            <li><strong>Por equipo:</strong> Filtra por miembro del equipo</li>
                            <li><strong>Por presupuesto:</strong> Filtra por rango de horas estimadas</li>
                        </ul>
                        <h4>📊 KPIs en el panel lateral</h4>
                        <ul>
                            <li><strong>Progreso general:</strong> Porcentaje de avance del proyecto</li>
                            <li><strong>Dependencias:</strong> Número de relaciones entre tareas</li>
                            <li><strong>Ruta crítica:</strong> Cantidad de tareas críticas</li>
                            <li><strong>Predicción IA:</strong> Fecha estimada de finalización</li>
                        </ul>
                        <div class="help-tip">💡 Tip: El botón "IA Predictor" abre un análisis profundo con predicciones y recomendaciones.</div>
                    `
                },
                {
                    id: 'evm',
                    category: 'advanced',
                    icon: '📈',
                    title: 'Valor Ganado (EVM)',
                    content: `
                        <p>El <strong>Análisis de Valor Ganado (EVM)</strong> es una metodología estándar de PMI para medir el desempeño del proyecto en términos de costo y cronograma.</p>
                        <h4>📊 Métricas Clave</h4>
                        <ul>
                            <li><strong>PV (Valor Planificado):</strong> Trabajo presupuestado hasta la fecha</li>
                            <li><strong>EV (Valor Ganado):</strong> Valor del trabajo realmente completado</li>
                            <li><strong>AC (Costo Real):</strong> Costo incurrido hasta la fecha</li>
                            <li><strong>BAC (Presupuesto al Terminar):</strong> Presupuesto total del proyecto</li>
                        </ul>
                        <h4>📈 Índices de Desempeño</h4>
                        <ul>
                            <li><strong>SPI (Schedule Performance Index):</strong> EV/PV → &gt;1 = adelantado, &lt;1 = retrasado</li>
                            <li><strong>CPI (Cost Performance Index):</strong> EV/AC → &gt;1 = bajo presupuesto, &lt;1 = sobrecosto</li>
                        </ul>
                        <h4>🔮 Pronósticos</h4>
                        <ul>
                            <li><strong>EAC (Estimate at Completion):</strong> Costo total proyectado</li>
                            <li><strong>ETC (Estimate to Complete):</strong> Costo necesario para terminar</li>
                            <li><strong>VAC (Variance at Completion):</strong> Variación final proyectada</li>
                        </ul>
                        <div class="help-tip">💡 Tip: El dashboard EVM incluye gráficos interactivos y recomendaciones automáticas.</div>
                    `
                },
                {
                    id: 'costos',
                    category: 'advanced',
                    icon: '💰',
                    title: 'Control de Costos',
                    content: `
                        <p>El <strong>Módulo de Costos</strong> te permite configurar y monitorear todos los aspectos financieros de tu proyecto.</p>
                        <h4>⚙️ Configuración</h4>
                        <ul>
                            <li><strong>Costo por hora base:</strong> Tarifa estándar</li>
                            <li><strong>Roles:</strong> Define tarifas específicas por rol (ej. Desarrollador Senior: 75€/h)</li>
                            <li><strong>Costos fijos:</strong> Gastos independientes de horas (licencias, servidores, etc.)</li>
                            <li><strong>Overhead:</strong> Porcentaje adicional para gastos generales</li>
                        </ul>
                        <h4>📊 Dashboard Financiero</h4>
                        <ul>
                            <li><strong>BAC:</strong> Presupuesto total</li>
                            <li><strong>AC:</strong> Costo real acumulado</li>
                            <li><strong>Varianza de costo:</strong> Diferencia entre valor ganado y costo real</li>
                            <li><strong>Proyección EAC:</strong> Costo estimado al finalizar</li>
                        </ul>
                        <div class="help-tip">💡 Tip: Los costos se calculan automáticamente a partir de las horas registradas y la configuración de tarifas.</div>
                    `
                },
                {
                    id: 'colaboracion',
                    category: 'collaboration',
                    icon: '👥',
                    title: 'Colaboración en Tiempo Real',
                    content: `
                        <p>El sistema permite la <strong>colaboración en tiempo real</strong> entre múltiples usuarios mediante invitaciones y WebSockets.</p>
                        <h4>📧 Invitaciones</h4>
                        <ul>
                            <li>Envía invitaciones por email desde el Centro de Comando</li>
                            <li>Define el rol del invitado: <strong>Visualizador</strong>, <strong>Editor</strong> o <strong>Admin</strong></li>
                            <li>El invitado recibe un enlace único para unirse al proyecto</li>
                        </ul>
                        <h4>🔄 Sincronización en Vivo</h4>
                        <ul>
                            <li><strong>Creación de tareas:</strong> Todos los usuarios ven la nueva tarea instantáneamente</li>
                            <li><strong>Actualizaciones:</strong> Cambios en estado, asignado o fechas se sincronizan</li>
                            <li><strong>Eliminación:</strong> Las tareas eliminadas desaparecen para todos</li>
                            <li><strong>Movimientos:</strong> Arrastrar entre columnas actualiza la vista de todos</li>
                        </ul>
                        <div class="help-tip">💡 Tip: Los cambios se guardan automáticamente y se reflejan en todas las pestañas abiertas.</div>
                    `
                },
                {
                    id: 'ia',
                    category: 'ai',
                    icon: '🤖',
                    title: 'Inteligencia Artificial Integrada',
                    content: `
                        <p>El sistema incorpora <strong>cuatro agentes de IA</strong> diseñados para potenciar tu productividad y toma de decisiones.</p>
                        <h4>🎯 PM IA Élite</h4>
                        <ul>
                            <li>Análisis completo del proyecto con KPIs estratégicos</li>
                            <li>Matriz de riesgos y tareas críticas</li>
                            <li>Forecast de finalización y tendencias</li>
                            <li>Evaluación de desempeño del equipo</li>
                        </ul>
                        <h4>📝 Transcriptor IA</h4>
                        <ul>
                            <li>Grabación de reuniones con micrófono</li>
                            <li>Transcripción automática en tiempo real</li>
                            <li>Resumen ejecutivo, acciones, puntos clave y decisiones</li>
                            <li>Historial con búsqueda y exportación</li>
                        </ul>
                        <h4>📊 Analista IA</h4>
                        <ul>
                            <li>Business Intelligence con métricas globales</li>
                            <li>Recomendaciones estratégicas</li>
                            <li>Alertas tempranas de desviaciones</li>
                        </ul>
                        <h4>💬 Asistente Personal</h4>
                        <ul>
                            <li>Chat interactivo con lenguaje natural</li>
                            <li>Consultas sobre proyectos, tareas, riesgos y equipo</li>
                            <li>Comandos rápidos predefinidos</li>
                            <li>Exportación de conversaciones</li>
                        </ul>
                        <div class="help-tip">💡 Tip: Todos los agentes están disponibles desde el Centro de Comando y desde el menú lateral.</div>
                    `
                },
                {
                    id: 'configuracion',
                    category: 'settings',
                    icon: '⚙️',
                    title: 'Configuración y Personalización',
                    content: `
                        <p>El <strong>panel de configuración</strong> te permite adaptar el sistema a tus necesidades y preferencias.</p>
                        <h4>🔐 Licencias</h4>
                        <ul>
                            <li><strong>Free:</strong> Funcionalidades básicas para empezar</li>
                            <li><strong>Professional:</strong> Gantt ejecutivo, EVM, dashboard 4D</li>
                            <li><strong>Premium:</strong> Colaboración avanzada, IA, integraciones</li>
                        </ul>
                        <h4>🔄 Modo de Trabajo</h4>
                        <ul>
                            <li><strong>Ágil:</strong> Enfoque en entregas rápidas y flexibilidad</li>
                            <li><strong>Tradicional:</strong> Enfoque en planificación y control estricto</li>
                            <li><strong>Híbrido:</strong> Combina lo mejor de ambos mundos</li>
                        </ul>
                        <h4>🌐 Idioma</h4>
                        <ul>
                            <li>Español (ES)</li>
                            <li>Inglés (EN)</li>
                            <li>Cambio instantáneo con el botón ES/EN</li>
                        </ul>
                        <div class="help-tip">💡 Tip: El modo Híbrido es el más recomendado para la mayoría de los proyectos.</div>
                    `
                },
                {
                    id: 'teclado',
                    category: 'troubleshooting',
                    icon: '⌨️',
                    title: 'Atajos de Teclado',
                    content: `
                        <p>Utiliza estos atajos de teclado para navegar más rápido por el sistema:</p>
                        <table style="width:100%; border-collapse:collapse; margin:12px 0;">
                            <tr style="border-bottom:1px solid rgba(255,255,255,0.1);">
                                <th style="text-align:left; padding:8px; color:#8b5cf6;">Atajo</th>
                                <th style="text-align:left; padding:8px; color:#8b5cf6;">Acción</th>
                            </tr>
                            <tr><td style="padding:8px;"><kbd>Ctrl</kbd> + <kbd>Espacio</kbd></td><td style="padding:8px;">Abrir/cerrar el asistente personal</td></tr>
                            <tr><td style="padding:8px;"><kbd>?</kbd> o <kbd>F1</kbd></td><td style="padding:8px;">Abrir este centro de ayuda</td></tr>
                            <tr><td style="padding:8px;"><kbd>Esc</kbd></td><td style="padding:8px;">Cerrar modales y ventanas</td></tr>
                            <tr><td style="padding:8px;"><kbd>Ctrl</kbd> + <kbd>N</kbd></td><td style="padding:8px;">Nueva tarea</td></tr>
                            <tr><td style="padding:8px;"><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd></td><td style="padding:8px;">Nuevo proyecto</td></tr>
                            <tr><td style="padding:8px;"><kbd>Ctrl</kbd> + <kbd>1-4</kbd></td><td style="padding:8px;">Cambiar a vista Kanban, Lista, Calendario, Gantt</td></tr>
                        </table>
                        <div class="help-tip">💡 Tip: Estos atajos funcionan en todas las vistas del sistema.</div>
                    `
                }
            ],
            footer: 'Sistema de Ayuda Ejecutivo v3.4 • Documentación completa en el repositorio'
        },
        en: {
            title: 'Executive Help Center',
            subtitle: 'Complete guide to maximize your productivity',
            searchPlaceholder: '🔍 Search help...',
            noResults: 'No results found for "{{query}}"',
            categories: {
                all: 'All',
                gettingStarted: 'Getting Started',
                coreFeatures: 'Core Features',
                advanced: 'Advanced Tools',
                collaboration: 'Collaboration',
                ai: 'Artificial Intelligence',
                settings: 'Settings',
                troubleshooting: 'Troubleshooting'
            },
            sections: [
                {
                    id: 'inicio',
                    category: 'gettingStarted',
                    icon: '🏠',
                    title: 'IA 4D Command Center',
                    content: `
                        <p>The <strong>IA 4D Command Center</strong> is your main entry point to the system. From here you have a global view of all your projects and shortcuts to the most powerful tools.</p>
                        <h4>📊 Global KPIs</h4>
                        <ul>
                            <li><strong>Projects:</strong> Total number of active projects</li>
                            <li><strong>Tasks:</strong> Total tasks across all projects</li>
                            <li><strong>Completed:</strong> Successfully finished tasks</li>
                            <li><strong>Alerts:</strong> Overdue or critical tasks requiring attention</li>
                        </ul>
                        <h4>🤖 AI Agents</h4>
                        <ul>
                            <li><strong>PM AI Elite:</strong> Full executive analysis with strategic KPIs, risk matrix, and forecasting</li>
                            <li><strong>Transcriber AI:</strong> Meeting recording and intelligent analysis with automatic summary</li>
                            <li><strong>Analyst AI:</strong> Business Intelligence with global metrics and recommendations</li>
                            <li><strong>Personal Assistant:</strong> Interactive 24/7 chat for quick queries</li>
                        </ul>
                        <h4>📋 Active Projects</h4>
                        <p>View your most recent projects with their progress and status. Click any project to open it directly.</p>
                        <div class="help-tip">💡 Tip: Use the "Generate" button to create new projects from natural language descriptions.</div>
                    `
                },
                {
                    id: 'kanban',
                    category: 'coreFeatures',
                    icon: '📋',
                    title: 'Executive Kanban Board',
                    content: `
                        <p>The <strong>Kanban Board</strong> lets you manage your workflow visually and intuitively.</p>
                        <h4>📌 Columns</h4>
                        <ul>
                            <li><span style="color:#f1c40f;">⬤</span> <strong>Pending:</strong> Tasks not yet started</li>
                            <li><span style="color:#008090;">⬤</span> <strong>In Progress:</strong> Tasks being executed</li>
                            <li><span style="color:#2ecc71;">⬤</span> <strong>Completed:</strong> Finished tasks</li>
                            <li><span style="color:#e74c3c;">⬤</span> <strong>Overdue:</strong> Tasks past deadline</li>
                        </ul>
                        <h4>🖱️ Interactions</h4>
                        <ul>
                            <li><strong>Drag and drop:</strong> Change a task's status by moving it between columns</li>
                            <li><strong>Click:</strong> Opens the detailed task editing panel</li>
                            <li><strong>Context menu (⋮):</strong> Quick actions like edit or delete</li>
                            <li><strong>↑↓ Buttons:</strong> Reorder tasks within the same column</li>
                        </ul>
                        <h4>🎯 Priorities</h4>
                        <ul>
                            <li><span style="color:#e74c3c;">🔴 High:</span> Urgent, requires immediate attention</li>
                            <li><span style="color:#f39c12;">🟡 Medium:</span> Important, plan with priority</li>
                            <li><span style="color:#2ecc71;">🟢 Low:</span> Can wait</li>
                        </ul>
                        <div class="help-tip">💡 Tip: Critical tasks are automatically marked with a red border and a "CRITICAL" label.</div>
                    `
                },
                {
                    id: 'lista',
                    category: 'coreFeatures',
                    icon: '📄',
                    title: 'List View',
                    content: `
                        <p>The <strong>List View</strong> provides a detailed table with all project tasks, ideal for quick analysis and data export.</p>
                        <h4>📊 Columns</h4>
                        <ul>
                            <li><strong>Task:</strong> Task name</li>
                            <li><strong>Start Date:</strong> Planned start date</li>
                            <li><strong>Deadline:</strong> Due date</li>
                            <li><strong>Status:</strong> Pending, In Progress, Completed, Overdue</li>
                            <li><strong>Assignee:</strong> Responsible person</li>
                            <li><strong>Priority:</strong> High, Medium, Low</li>
                        </ul>
                        <h4>🔍 Filters</h4>
                        <ul>
                            <li><strong>By assignee:</strong> Filter tasks of a specific member</li>
                            <li><strong>By priority:</strong> Show only tasks of certain priority</li>
                            <li><strong>By status:</strong> Filter by task status</li>
                            <li><strong>By dates:</strong> Start and end date range</li>
                        </ul>
                        <div class="help-tip">💡 Tip: Click any row to open quick task editing.</div>
                    `
                },
                {
                    id: 'calendario',
                    category: 'coreFeatures',
                    icon: '📅',
                    title: 'Integrated Calendar',
                    content: `
                        <p>The <strong>Calendar</strong> lets you visualize your tasks on a monthly, weekly, or daily timeline.</p>
                        <h4>📆 Views</h4>
                        <ul>
                            <li><strong>Month:</strong> Overview of the entire month</li>
                            <li><strong>Week:</strong> Detail of the current week</li>
                            <li><strong>Day:</strong> Hourly detailed view</li>
                        </ul>
                        <h4>🖱️ Interactions</h4>
                        <ul>
                            <li><strong>Click an event:</strong> Opens the task for editing</li>
                            <li><strong>Drag event:</strong> Changes the task date</li>
                            <li><strong>Click a day:</strong> Opens new task form with that date preset</li>
                            <li><strong>Hover:</strong> Shows a detailed tooltip</li>
                        </ul>
                        <h4>🎨 Status Colors</h4>
                        <ul>
                            <li><span style="background:#f1c40f; padding:2px 8px; border-radius:4px;">Yellow</span> Pending</li>
                            <li><span style="background:#008090; padding:2px 8px; border-radius:4px; color:white;">Teal</span> In Progress</li>
                            <li><span style="background:#2ecc71; padding:2px 8px; border-radius:4px;">Green</span> Completed</li>
                            <li><span style="background:#e74c3c; padding:2px 8px; border-radius:4px; color:white;">Red</span> Overdue</li>
                        </ul>
                        <div class="help-tip">💡 Tip: Calendar tooltips show key info like assignee, progress, and days remaining.</div>
                    `
                },
                {
                    id: 'gantt',
                    category: 'advanced',
                    icon: '📊',
                    title: 'Premium Executive Gantt',
                    content: `
                        <p>The <strong>Executive Gantt</strong> is a professional planning tool showing the timeline of all tasks with dependencies and critical path.</p>
                        <h4>📈 Components</h4>
                        <ul>
                            <li><strong>Task bars:</strong> Represent each task's duration. Colors by status.</li>
                            <li><strong>TODAY line:</strong> Marks the current date on the timeline</li>
                            <li><strong>Critical Path:</strong> Tasks that determine project duration (marked in red)</li>
                            <li><strong>Dependencies:</strong> Arrow lines showing task relationships</li>
                        </ul>
                        <h4>🎯 Executive Filters</h4>
                        <ul>
                            <li><strong>Critical:</strong> Shows only critical tasks</li>
                            <li><strong>Overdue:</strong> Tasks past their deadline</li>
                            <li><strong>By team:</strong> Filter by team member</li>
                            <li><strong>By budget:</strong> Filter by estimated hours range</li>
                        </ul>
                        <h4>📊 Sidebar KPIs</h4>
                        <ul>
                            <li><strong>Overall progress:</strong> Project completion percentage</li>
                            <li><strong>Dependencies:</strong> Number of task relationships</li>
                            <li><strong>Critical path:</strong> Count of critical tasks</li>
                            <li><strong>AI prediction:</strong> Estimated completion date</li>
                        </ul>
                        <div class="help-tip">💡 Tip: The "AI Predictor" button opens an in-depth analysis with forecasts and recommendations.</div>
                    `
                },
                {
                    id: 'evm',
                    category: 'advanced',
                    icon: '📈',
                    title: 'Earned Value Management (EVM)',
                    content: `
                        <p><strong>Earned Value Management (EVM)</strong> is a PMI-standard methodology for measuring project performance in terms of cost and schedule.</p>
                        <h4>📊 Key Metrics</h4>
                        <ul>
                            <li><strong>PV (Planned Value):</strong> Budgeted work to date</li>
                            <li><strong>EV (Earned Value):</strong> Value of work actually completed</li>
                            <li><strong>AC (Actual Cost):</strong> Cost incurred to date</li>
                            <li><strong>BAC (Budget at Completion):</strong> Total project budget</li>
                        </ul>
                        <h4>📈 Performance Indices</h4>
                        <ul>
                            <li><strong>SPI (Schedule Performance Index):</strong> EV/PV → &gt;1 = ahead, &lt;1 = behind</li>
                            <li><strong>CPI (Cost Performance Index):</strong> EV/AC → &gt;1 = under budget, &lt;1 = over budget</li>
                        </ul>
                        <h4>🔮 Forecasts</h4>
                        <ul>
                            <li><strong>EAC (Estimate at Completion):</strong> Projected total cost</li>
                            <li><strong>ETC (Estimate to Complete):</strong> Cost needed to finish</li>
                            <li><strong>VAC (Variance at Completion):</strong> Projected final variance</li>
                        </ul>
                        <div class="help-tip">💡 Tip: The EVM dashboard includes interactive charts and automatic recommendations.</div>
                    `
                },
                {
                    id: 'costos',
                    category: 'advanced',
                    icon: '💰',
                    title: 'Cost Control',
                    content: `
                        <p>The <strong>Cost Module</strong> lets you configure and monitor all financial aspects of your project.</p>
                        <h4>⚙️ Configuration</h4>
                        <ul>
                            <li><strong>Base hourly cost:</strong> Standard rate</li>
                            <li><strong>Roles:</strong> Define role-specific rates (e.g., Senior Developer: €75/h)</li>
                            <li><strong>Fixed costs:</strong> Independent expenses (licenses, servers, etc.)</li>
                            <li><strong>Overhead:</strong> Additional percentage for general expenses</li>
                        </ul>
                        <h4>📊 Financial Dashboard</h4>
                        <ul>
                            <li><strong>BAC:</strong> Total budget</li>
                            <li><strong>AC:</strong> Accumulated actual cost</li>
                            <li><strong>Cost variance:</strong> Difference between earned value and actual cost</li>
                            <li><strong>EAC projection:</strong> Estimated cost at completion</li>
                        </ul>
                        <div class="help-tip">💡 Tip: Costs are automatically calculated from logged hours and rate configuration.</div>
                    `
                },
                {
                    id: 'colaboracion',
                    category: 'collaboration',
                    icon: '👥',
                    title: 'Real-Time Collaboration',
                    content: `
                        <p>The system enables <strong>real-time collaboration</strong> between multiple users via invitations and WebSockets.</p>
                        <h4>📧 Invitations</h4>
                        <ul>
                            <li>Send email invitations from the Command Center</li>
                            <li>Define the invitee's role: <strong>Viewer</strong>, <strong>Editor</strong>, or <strong>Admin</strong></li>
                            <li>The invitee receives a unique link to join the project</li>
                        </ul>
                        <h4>🔄 Live Sync</h4>
                        <ul>
                            <li><strong>Task creation:</strong> All users see the new task instantly</li>
                            <li><strong>Updates:</strong> Status, assignee, or date changes sync</li>
                            <li><strong>Deletion:</strong> Removed tasks disappear for everyone</li>
                            <li><strong>Movements:</strong> Dragging between columns updates everyone's view</li>
                        </ul>
                        <div class="help-tip">💡 Tip: Changes are automatically saved and reflected across all open tabs.</div>
                    `
                },
                {
                    id: 'ia',
                    category: 'ai',
                    icon: '🤖',
                    title: 'Integrated Artificial Intelligence',
                    content: `
                        <p>The system incorporates <strong>four AI agents</strong> designed to boost your productivity and decision-making.</p>
                        <h4>🎯 PM AI Elite</h4>
                        <ul>
                            <li>Complete project analysis with strategic KPIs</li>
                            <li>Risk matrix and critical tasks</li>
                            <li>Completion forecast and trends</li>
                            <li>Team performance evaluation</li>
                        </ul>
                        <h4>📝 Transcriber AI</h4>
                        <ul>
                            <li>Meeting recording with microphone</li>
                            <li>Automatic real-time transcription</li>
                            <li>Executive summary, actions, key points, and decisions</li>
                            <li>Searchable history with export</li>
                        </ul>
                        <h4>📊 Analyst AI</h4>
                        <ul>
                            <li>Business Intelligence with global metrics</li>
                            <li>Strategic recommendations</li>
                            <li>Early deviation alerts</li>
                        </ul>
                        <h4>💬 Personal Assistant</h4>
                        <ul>
                            <li>Interactive natural language chat</li>
                            <li>Queries about projects, tasks, risks, and team</li>
                            <li>Predefined quick commands</li>
                            <li>Conversation export</li>
                        </ul>
                        <div class="help-tip">💡 Tip: All agents are available from the Command Center and the sidebar menu.</div>
                    `
                },
                {
                    id: 'configuracion',
                    category: 'settings',
                    icon: '⚙️',
                    title: 'Settings & Customization',
                    content: `
                        <p>The <strong>settings panel</strong> lets you adapt the system to your needs and preferences.</p>
                        <h4>🔐 Licenses</h4>
                        <ul>
                            <li><strong>Free:</strong> Basic features to get started</li>
                            <li><strong>Professional:</strong> Executive Gantt, EVM, 4D dashboard</li>
                            <li><strong>Premium:</strong> Advanced collaboration, AI, integrations</li>
                        </ul>
                        <h4>🔄 Work Mode</h4>
                        <ul>
                            <li><strong>Agile:</strong> Focus on fast delivery and flexibility</li>
                            <li><strong>Traditional:</strong> Focus on planning and strict control</li>
                            <li><strong>Hybrid:</strong> Best of both worlds</li>
                        </ul>
                        <h4>🌐 Language</h4>
                        <ul>
                            <li>Spanish (ES)</li>
                            <li>English (EN)</li>
                            <li>Instant switch with the ES/EN button</li>
                        </ul>
                        <div class="help-tip">💡 Tip: Hybrid mode is the most recommended for most projects.</div>
                    `
                },
                {
                    id: 'teclado',
                    category: 'troubleshooting',
                    icon: '⌨️',
                    title: 'Keyboard Shortcuts',
                    content: `
                        <p>Use these keyboard shortcuts to navigate the system faster:</p>
                        <table style="width:100%; border-collapse:collapse; margin:12px 0;">
                            <tr style="border-bottom:1px solid rgba(255,255,255,0.1);">
                                <th style="text-align:left; padding:8px; color:#8b5cf6;">Shortcut</th>
                                <th style="text-align:left; padding:8px; color:#8b5cf6;">Action</th>
                            </tr>
                            <tr><td style="padding:8px;"><kbd>Ctrl</kbd> + <kbd>Space</kbd></td><td style="padding:8px;">Open/close personal assistant</td></tr>
                            <tr><td style="padding:8px;"><kbd>?</kbd> or <kbd>F1</kbd></td><td style="padding:8px;">Open this help center</td></tr>
                            <tr><td style="padding:8px;"><kbd>Esc</kbd></td><td style="padding:8px;">Close modals and windows</td></tr>
                            <tr><td style="padding:8px;"><kbd>Ctrl</kbd> + <kbd>N</kbd></td><td style="padding:8px;">New task</td></tr>
                            <tr><td style="padding:8px;"><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd></td><td style="padding:8px;">New project</td></tr>
                            <tr><td style="padding:8px;"><kbd>Ctrl</kbd> + <kbd>1-4</kbd></td><td style="padding:8px;">Switch to Kanban, List, Calendar, Gantt</td></tr>
                        </table>
                        <div class="help-tip">💡 Tip: These shortcuts work across all system views.</div>
                    `
                }
            ],
            footer: 'Executive Help System v3.4 • Full documentation in the repository'
        }
    };

    // ============================================================
    // 2. TIPS CONTEXTUALES (bilingües)
    // ============================================================
    const TIPS = {
        es: [
            '💡 Puedes arrastrar tareas entre columnas para cambiar su estado',
            '💡 Usa el botón "Generar" para crear proyectos desde lenguaje natural',
            '💡 El modo Híbrido combina lo mejor de Ágil y Tradicional',
            '💡 Los agentes IA están disponibles en el Centro de Comando',
            '💡 Presiona F1 o ? para abrir esta ayuda en cualquier momento',
            '💡 Haz clic en el ícono de engranaje ⚙️ para acceder a configuración',
            '💡 El Gantt ejecutivo muestra la ruta crítica en rojo',
            '💡 Puedes exportar reportes a PDF desde la vista de Reportes'
        ],
        en: [
            '💡 You can drag tasks between columns to change their status',
            '💡 Use the "Generate" button to create projects from natural language',
            '💡 Hybrid mode combines the best of Agile and Traditional',
            '💡 AI agents are available in the Command Center',
            '💡 Press F1 or ? to open this help anytime',
            '💡 Click the gear icon ⚙️ to access settings',
            '💡 The executive Gantt shows the critical path in red',
            '💡 You can export reports to PDF from the Reports view'
        ]
    };

    // ============================================================
    // 3. FUNCIONES AUXILIARES
    // ============================================================
    function getCurrentLanguage() {
        return localStorage.getItem('preferredLanguage') || 'es';
    }

    function escapeHtml(text) {
        if (!text) return '';
        return String(text).replace(/[&<>"]/g, function(m) {
            if (m === '&') return '&amp;';
            if (m === '<') return '&lt;';
            if (m === '>') return '&gt;';
            if (m === '"') return '&quot;';
            return m;
        });
    }

    // ============================================================
    // 4. SISTEMA DE FEEDBACK (¿Te fue útil?)
    // ============================================================
    window.voteHelpful = function(sectionId, isYes) {
        const key = `help_votes_${sectionId}`;
        const votes = JSON.parse(localStorage.getItem(key) || '{"yes":0,"no":0}');
        if (isYes) votes.yes++; else votes.no++;
        localStorage.setItem(key, JSON.stringify(votes));
        openHelpModal();
    };

    // ============================================================
    // 5. SISTEMA DE TICKETS DE SOPORTE
    // ============================================================
    window.abrirTicketSoporte = function() {
        const lang = getCurrentLanguage();
        const isEs = lang === 'es';
        const asunto = prompt(isEs ? '📝 Asunto del problema:' : '📝 Issue subject:');
        if (!asunto) return;
        const descripcion = prompt(isEs ? '📄 Descripción detallada:' : '📄 Detailed description:');
        if (!descripcion) return;
        const prioridad = prompt(isEs ? '⚡ Prioridad (baja/media/alta):' : '⚡ Priority (low/medium/high):') || 'media';
        const ticket = {
            id: Date.now(),
            asunto: asunto.trim(),
            descripcion: descripcion.trim(),
            prioridad: prioridad.toLowerCase(),
            estado: 'abierto',
            fecha: new Date().toISOString()
        };
        const tickets = JSON.parse(localStorage.getItem('helpTickets') || '[]');
        tickets.push(ticket);
        localStorage.setItem('helpTickets', JSON.stringify(tickets));
        alert(isEs ? `✅ Ticket #${ticket.id} creado. Te contactaremos pronto.` : `✅ Ticket #${ticket.id} created. We will contact you soon.`);
        if (window.SlackNotifier && typeof window.SlackNotifier.send === 'function') {
            window.SlackNotifier.send(`🎫 Nuevo ticket de soporte: ${ticket.asunto} (Prioridad: ${ticket.prioridad})`, 'warning');
        }
    };

    // ============================================================
    // 6. NOTIFICACIONES CONTEXTUALES (tips emergentes)
    // ============================================================
    function showHelpTip() {
        const lang = getCurrentLanguage();
        const tips = TIPS[lang] || TIPS.es;
        const shown = JSON.parse(localStorage.getItem('help_tips_shown') || '[]');
        const available = tips.filter((_, i) => !shown.includes(i));
        if (available.length === 0) return;
        const randomTip = available[Math.floor(Math.random() * available.length)];
        const idx = tips.indexOf(randomTip);
        shown.push(idx);
        localStorage.setItem('help_tips_shown', JSON.stringify(shown));

        const notif = document.createElement('div');
        notif.textContent = randomTip;
        notif.style.cssText = `
            position: fixed; bottom: 180px; right: 30px;
            background: rgba(15,23,42,0.95); border: 1px solid #8b5cf6;
            color: #e2e8f0; padding: 14px 20px; border-radius: 12px;
            max-width: 350px; z-index: 999999;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            animation: helpSlideUp 0.3s ease;
            font-size: 14px;
            backdrop-filter: blur(8px);
            border-left: 4px solid #8b5cf6;
        `;
        document.body.appendChild(notif);
        setTimeout(() => {
            if (notif.parentNode) notif.remove();
        }, 10000);
    }

    // ============================================================
    // 7. CREAR BOTÓN DE AYUDA EN EL HEADER + MOVER ENGRANE
    // ============================================================
    function createHelpButtonInHeader() {

        if (document.getElementById('helpHeaderButton')) return;

        let header = document.querySelector('header, .header, #header, .main-header, .navbar, .top-bar');
        if (!header) {
            header = document.createElement('div');
            header.className = 'help-header-placeholder';
            header.style.cssText = 'display: flex; justify-content: flex-end; padding: 10px 20px; background: rgba(0,0,0,0.2); flex-wrap: nowrap; gap: 8px;';
            document.body.insertBefore(header, document.body.firstChild);
        }

        let actionsContainer = header.querySelector('.header-actions, .actions-container, .header-buttons');
        if (!actionsContainer) {
            actionsContainer = document.createElement('div');
            actionsContainer.className = 'header-actions';
            actionsContainer.style.cssText = `
                display: flex;
                align-items: center;
                gap: 8px;
                flex-wrap: nowrap !important;
                margin-left: auto;
            `;
            header.appendChild(actionsContainer);
        }

        // Buscar y mover el botón de engrane
        const gearSelectors = [
            'button[id*="settings" i]', 'button[id*="gear" i]', 'button[id*="config" i]',
            'button[class*="settings" i]', 'button[class*="gear" i]', 'button[class*="config" i]',
            'button[title*="Configuración" i]', 'button[title*="Settings" i]', 'button[title*="Gear" i]',
            'a[id*="settings" i]', 'a[class*="settings" i]',
            'button:has(> .fa-gear)', 'button:has(> .fa-cog)', 'button:has(> svg[viewBox*="gear"])'
        ];
        let gearButton = null;
        for (const sel of gearSelectors) {
            const found = header.querySelector(sel);
            if (found && !actionsContainer.contains(found)) {
                gearButton = found;
                break;
            }
        }
        if (!gearButton) {
            const allButtons = header.querySelectorAll('button, a');
            for (const btn of allButtons) {
                const text = btn.textContent.trim().toLowerCase();
                if ((text.includes('engrane') || text.includes('configuración') || text.includes('settings') || text.includes('⚙️') || text.includes('gear')) && !actionsContainer.contains(btn)) {
                    gearButton = btn;
                    break;
                }
            }
        }
        if (gearButton) {
            gearButton.classList.add('help-gear-btn');
            gearButton.style.marginLeft = '0';
            gearButton.style.marginRight = '0';
            actionsContainer.appendChild(gearButton);
            console.log('⚙️ Botón de engrane movido al contenedor de acciones');
        } else {
            console.warn('⚠️ No se encontró el botón de engrane para moverlo.');
        }

        // Crear botón de ayuda
        const button = document.createElement('button');
        button.id = 'helpHeaderButton';
        button.innerHTML = '❓';
        button.title = 'Ayuda / Help (F1)';
        button.style.cssText = `
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(59,130,246,0.3);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        `;
        button.addEventListener('click', openHelpModal);

        actionsContainer.appendChild(button);

        applyResponsiveStyles(header, actionsContainer);

        console.log('✅ Botón de ayuda "?" añadido al header (responsivo)');
    }

    // ============================================================
    // 8. ESTILOS RESPONSIVOS PARA BOTONES DEL HEADER
    // ============================================================
    function applyResponsiveStyles(header, container) {
        if (!document.getElementById('helpResponsiveStyles')) {
            const style = document.createElement('style');
            style.id = 'helpResponsiveStyles';
            style.textContent = `
                .header-actions, .actions-container, .header-buttons,
                header, .header, #header, .main-header, .navbar, .top-bar {
                    flex-wrap: nowrap !important;
                }
                .header-actions button,
                .header-actions .btn,
                .header-actions a.btn,
                .header-actions input[type="button"],
                .header-actions input[type="submit"] {
                    flex-shrink: 1 !important;
                    min-width: 0 !important;
                    white-space: nowrap !important;
                }
                @media (max-width: 1024px) {
                    .header-actions button, .header-actions .btn, .header-actions a.btn {
                        font-size: 12px !important;
                        padding: 5px 10px !important;
                        min-height: 32px !important;
                        min-width: 32px !important;
                        border-radius: 6px !important;
                        width: auto !important;
                        height: auto !important;
                    }
                    #helpHeaderButton { width: 34px !important; height: 34px !important; font-size: 16px !important; }
                    #boardUltimateBtn, #optimizar-ahora-btn, .help-gear-btn {
                        font-size: 12px !important;
                        padding: 5px 10px !important;
                        min-height: 32px !important;
                    }
                }
                @media (max-width: 768px) {
                    .header-actions { gap: 4px !important; }
                    .header-actions button, .header-actions .btn, .header-actions a.btn {
                        font-size: 10px !important;
                        padding: 4px 7px !important;
                        min-height: 28px !important;
                        min-width: 28px !important;
                        border-radius: 4px !important;
                        width: auto !important;
                        height: auto !important;
                    }
                    #helpHeaderButton { width: 28px !important; height: 28px !important; font-size: 13px !important; }
                    #boardUltimateBtn, #optimizar-ahora-btn, .help-gear-btn {
                        font-size: 10px !important;
                        padding: 4px 7px !important;
                        min-height: 28px !important;
                    }
                }
                @media (max-width: 480px) {
                    .header-actions button, .header-actions .btn, .header-actions a.btn {
                        font-size: 9px !important;
                        padding: 2px 4px !important;
                        min-height: 22px !important;
                        min-width: 22px !important;
                        border-radius: 4px !important;
                    }
                    #helpHeaderButton { width: 22px !important; height: 22px !important; font-size: 11px !important; }
                    #boardUltimateBtn span, #boardUltimateBtn .btn-text,
                    #optimizar-ahora-btn span, #optimizar-ahora-btn .btn-text,
                    .help-gear-btn span, .help-gear-btn .btn-text {
                        display: none !important;
                    }
                    #boardUltimateBtn::before { content: "📊" !important; font-size: 14px !important; }
                    #optimizar-ahora-btn::before { content: "⚡" !important; font-size: 14px !important; }
                    .help-gear-btn::before { content: "⚙️" !important; font-size: 14px !important; }
                    #boardUltimateBtn:has(.fa)::before,
                    #optimizar-ahora-btn:has(.fa)::before,
                    .help-gear-btn:has(.fa)::before {
                        content: "" !important;
                    }
                }
            `;
            document.head.appendChild(style);
            console.log('✅ Estilos responsivos inyectados');
        }
    }

    // ============================================================
    // 9. ABRIR MODAL DE AYUDA (CON TODAS LAS SECCIONES)
    // ============================================================
    function openHelpModal() {
        const existing = document.getElementById('helpModal');
        if (existing) {
            existing.remove();
            return;
        }

        const lang = getCurrentLanguage();
        const data = HELP_DATA[lang] || HELP_DATA.es;
        const allSections = data.sections;
        const categories = data.categories;

        const categoryKeys = ['all', ...new Set(allSections.map(s => s.category))];
        const categoryNames = categoryKeys.map(key => ({
            key,
            label: key === 'all' ? categories.all : categories[key] || key
        }));

        const overlay = document.createElement('div');
        overlay.id = 'helpModal';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(12px);
            z-index: 10000000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            animation: helpFadeIn 0.3s ease;
        `;

        if (!document.getElementById('helpAnimations')) {
            const style = document.createElement('style');
            style.id = 'helpAnimations';
            style.textContent = `
                @keyframes helpFadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes helpSlideUp { from { opacity: 0; transform: translateY(40px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
                .help-modal-content { animation: helpSlideUp 0.4s cubic-bezier(0.16,1,0.3,1); }
                .help-section { transition: all 0.2s ease; cursor: pointer; }
                .help-section:hover { background: rgba(255,255,255,0.06); transform: translateX(6px); border-left: 3px solid #8b5cf6; }
                .help-section.active { background: rgba(139,92,246,0.15); border-left: 3px solid #8b5cf6; }
                .help-tip { background: rgba(59,130,246,0.08); border-left: 3px solid #3b82f6; }
                .help-tip:hover { background: rgba(59,130,246,0.15); }
                .help-category-btn { transition: all 0.2s; }
                .help-category-btn:hover { background: rgba(139,92,246,0.2); transform: translateX(4px); }
                .help-category-btn.active { background: rgba(139,92,246,0.25); color: #c4b5fd; }
                kbd { background: #1e293b; padding: 2px 8px; border-radius: 4px; border: 1px solid #475569; font-size: 12px; font-family: monospace; color: #e2e8f0; }
                .help-search-input:focus { border-color: #8b5cf6; box-shadow: 0 0 0 3px rgba(139,92,246,0.3); }
                .help-content { scroll-behavior: smooth; }
                .help-content::-webkit-scrollbar { width: 6px; }
                .help-content::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
                .help-content::-webkit-scrollbar-thumb { background: #8b5cf6; border-radius: 3px; }
                .help-content::-webkit-scrollbar-thumb:hover { background: #a78bfa; }
                .feedback-bar { transition: all 0.2s; }
                .feedback-bar:hover { background: rgba(255,255,255,0.05); }
                .whatsapp-btn:hover { transform: scale(1.05); }
            `;
            document.head.appendChild(style);
        }

        overlay.innerHTML = `
            <div class="help-modal-content" style="
                background: linear-gradient(145deg, #0f172a, #1e293b);
                border-radius: 28px;
                width: 100%;
                max-width: 1100px;
                max-height: 90vh;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                border: 1px solid rgba(59,130,246,0.3);
                box-shadow: 0 30px 60px rgba(0,0,0,0.7);
            ">
                <div style="padding: 20px 30px; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.2); flex-shrink: 0;">
                    <div>
                        <h2 style="margin: 0; color: white; font-size: 24px; display: flex; align-items: center; gap: 12px;">
                            <span style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">❓</span>
                            ${data.title}
                        </h2>
                        <p style="margin: 2px 0 0 0; color: #94a3b8; font-size: 14px;">${data.subtitle}</p>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <button onclick="document.getElementById('help-section-teclado').scrollIntoView({behavior:'smooth'})" style="background: rgba(139,92,246,0.15); border: 1px solid #8b5cf6; color: #a78bfa; padding: 8px 14px; border-radius: 20px; cursor: pointer; font-size: 13px; display: flex; align-items: center; gap: 6px; transition: all 0.2s;" onmouseover="this.style.background='rgba(139,92,246,0.3)'" onmouseout="this.style.background='rgba(139,92,246,0.15)'">⌨️ Shortcuts</button>
                        <button onclick="window.abrirTicketSoporte()" style="background: rgba(239,68,68,0.15); border: 1px solid #ef4444; color: #f87171; padding: 8px 14px; border-radius: 20px; cursor: pointer; font-size: 13px; transition: all 0.2s;" onmouseover="this.style.background='rgba(239,68,68,0.3)'" onmouseout="this.style.background='rgba(239,68,68,0.15)'">🎫 Ticket</button>
                        <a href="https://wa.me/34634122273" target="_blank" style="background: rgba(37,211,102,0.15); border: 1px solid #25d366; color: #25d366; padding: 8px 14px; border-radius: 20px; cursor: pointer; font-size: 13px; display: flex; align-items: center; gap: 6px; text-decoration: none; transition: all 0.2s;" onmouseover="this.style.background='rgba(37,211,102,0.3)'" onmouseout="this.style.background='rgba(37,211,102,0.15)'">💬 WhatsApp</a>
                        <span style="color: #94a3b8; font-size: 12px; background: rgba(255,255,255,0.05); padding: 4px 12px; border-radius: 20px;"><kbd>F1</kbd> / <kbd>?</kbd></span>
                        <button id="closeHelpModal" style="background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3); color: #f87171; width: 44px; height: 44px; border-radius: 50%; cursor: pointer; font-size: 20px; transition: all 0.2s; display: flex; align-items: center; justify-content: center;" onmouseover="this.style.background='rgba(239,68,68,0.3)'" onmouseout="this.style.background='rgba(239,68,68,0.15)'">✕</button>
                    </div>
                </div>
                <div style="flex: 1; display: flex; overflow: hidden; min-height: 0;">
                    <div style="width: 280px; background: rgba(0,0,0,0.2); border-right: 1px solid rgba(255,255,255,0.06); padding: 20px 16px; overflow-y: auto; flex-shrink: 0;">
                        <div style="margin-bottom: 20px;">
                            <input type="text" id="helpSearchInput" class="help-search-input" placeholder="${data.searchPlaceholder}" style="width: 100%; padding: 12px 16px; background: rgba(255,255,255,0.06); border: 2px solid rgba(255,255,255,0.1); border-radius: 12px; color: white; font-size: 14px; outline: none; transition: all 0.2s;">
                        </div>
                        <div style="margin-bottom: 16px;">
                            <h4 style="margin: 0 0 12px 0; color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">${lang === 'es' ? 'Categorías' : 'Categories'}</h4>
                            <div id="helpCategoryList">
                                ${categoryNames.map(cat => `
                                    <button class="help-category-btn ${cat.key === 'all' ? 'active' : ''}" data-category="${cat.key}" style="display: block; width: 100%; text-align: left; padding: 8px 14px; margin-bottom: 4px; border: none; border-radius: 8px; background: ${cat.key === 'all' ? 'rgba(139,92,246,0.2)' : 'transparent'}; color: ${cat.key === 'all' ? '#c4b5fd' : '#94a3b8'}; cursor: pointer; font-size: 13px; transition: all 0.2s; font-family: inherit;">
                                        ${cat.label}
                                        <span style="float: right; color: #64748b; font-size: 11px;">${cat.key === 'all' ? allSections.length : allSections.filter(s => s.category === cat.key).length}</span>
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                        <div style="margin-top: 16px; padding: 12px 16px; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.06);">
                            <div style="color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">${lang === 'es' ? 'Atajos rápidos' : 'Quick shortcuts'}</div>
                            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                                <span style="background: #1e293b; padding: 2px 10px; border-radius: 12px; font-size: 11px; color: #94a3b8;"><kbd>F1</kbd> ${lang === 'es' ? 'Ayuda' : 'Help'}</span>
                                <span style="background: #1e293b; padding: 2px 10px; border-radius: 12px; font-size: 11px; color: #94a3b8;"><kbd>Esc</kbd> ${lang === 'es' ? 'Cerrar' : 'Close'}</span>
                            </div>
                        </div>
                    </div>
                    <div id="helpContentContainer" style="flex: 1; padding: 24px 30px 30px 30px; overflow-y: auto; background: rgba(0,0,0,0.1);"></div>
                </div>
                <div style="padding: 12px 30px; border-top: 1px solid rgba(255,255,255,0.05); background: rgba(0,0,0,0.15); display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; flex-wrap: wrap; gap: 10px;">
                    <span style="color: #64748b; font-size: 12px;">${data.footer}</span>
                    <div style="display: flex; align-items: center; gap: 16px;">
                        <a href="https://wa.me/34634122273" target="_blank" style="background: rgba(37,211,102,0.15); border: 1px solid #25d366; color: #25d366; padding: 6px 16px; border-radius: 20px; text-decoration: none; font-size: 13px; display: flex; align-items: center; gap: 6px; transition: all 0.2s;" onmouseover="this.style.background='rgba(37,211,102,0.3)'" onmouseout="this.style.background='rgba(37,211,102,0.15)'">💬 WhatsApp</a>
                        <span style="color: #475569; font-size: 11px;">${lang === 'es' ? 'Versión' : 'Version'} 3.4 • © ${new Date().getFullYear()}</span>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // ============================================================
        // 10. LÓGICA DE FILTRADO, BÚSQUEDA Y RENDER
        // ============================================================
        const searchInput = document.getElementById('helpSearchInput');
        const categoryBtns = overlay.querySelectorAll('.help-category-btn');
        const contentContainer = document.getElementById('helpContentContainer');

        let currentCategory = 'all';
        let currentSearch = '';

        function renderSections(category, search) {
            let filtered = allSections;

            if (category !== 'all') {
                filtered = filtered.filter(s => s.category === category);
            }

            if (search.trim().length > 0) {
                const query = search.toLowerCase().trim();
                filtered = filtered.filter(s =>
                    s.title.toLowerCase().includes(query) ||
                    s.content.toLowerCase().includes(query) ||
                    (s.id && s.id.toLowerCase().includes(query))
                );
            }

            if (filtered.length === 0) {
                const noResultsMsg = data.noResults.replace('{{query}}', search);
                contentContainer.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #94a3b8; text-align: center; padding: 40px 20px;">
                        <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
                        <h3 style="color: #e2e8f0; margin: 0 0 8px 0;">${noResultsMsg}</h3>
                        <p style="font-size: 14px; margin: 0;">${lang === 'es' ? 'Intenta con otras palabras o revisa las categorías' : 'Try different words or check categories'}</p>
                    </div>
                `;
                return;
            }

            let html = '';
            filtered.forEach(s => {
                let content = s.content;
                if (search.trim().length > 0) {
                    const terms = search.trim().split(/\s+/).filter(t => t.length > 2);
                    terms.forEach(term => {
                        const regex = new RegExp(`(${term})`, 'gi');
                        content = content.replace(regex, '<mark style="background: #f59e0b; color: #0f172a; padding: 0 4px; border-radius: 4px;">$1</mark>');
                    });
                }

                const sectionId = s.id;
                const votes = JSON.parse(localStorage.getItem(`help_votes_${sectionId}`) || '{"yes":0,"no":0}');
                const total = votes.yes + votes.no;
                const percent = total ? Math.round((votes.yes / total) * 100) : 0;

                html += `
                    <div class="help-section" id="help-section-${sectionId}" style="padding: 20px 24px; border-radius: 14px; border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 8px; background: rgba(255,255,255,0.02);">
                        <div style="display: flex; gap: 16px; align-items: flex-start;">
                            <div style="font-size: 32px; flex-shrink: 0; margin-top: 4px;">${s.icon}</div>
                            <div style="flex: 1; min-width: 0;">
                                <h3 style="margin: 0 0 8px 0; color: #e2e8f0; font-size: 20px; font-weight: 600; display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                                    ${s.title}
                                    <span style="background: rgba(139,92,246,0.15); color: #a78bfa; font-size: 10px; padding: 2px 10px; border-radius: 20px; font-weight: 500;">${categories[s.category] || s.category}</span>
                                </h3>
                                <div style="color: #cbd5e1; font-size: 14px; line-height: 1.7; overflow-wrap: break-word;">${content}</div>
                                <div class="feedback-bar" style="margin-top: 16px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
                                    <span style="color: #94a3b8; font-size: 13px;">${lang === 'es' ? '¿Te fue útil esta sección?' : 'Was this section helpful?'}</span>
                                    <button onclick="window.voteHelpful('${sectionId}', true)" style="background: rgba(16,185,129,0.15); border: 1px solid #10b981; color: #34d399; padding: 4px 14px; border-radius: 20px; cursor: pointer; font-size: 12px; transition: all 0.2s;" onmouseover="this.style.background='rgba(16,185,129,0.3)'" onmouseout="this.style.background='rgba(16,185,129,0.15)'">${lang === 'es' ? '👍 Sí' : '👍 Yes'}</button>
                                    <button onclick="window.voteHelpful('${sectionId}', false)" style="background: rgba(239,68,68,0.15); border: 1px solid #ef4444; color: #f87171; padding: 4px 14px; border-radius: 20px; cursor: pointer; font-size: 12px;" onmouseover="this.style.background='rgba(239,68,68,0.3)'" onmouseout="this.style.background='rgba(239,68,68,0.15)'">${lang === 'es' ? '👎 No' : '👎 No'}</button>
                                    ${total > 0 ? `<span style="color: #64748b; font-size: 12px;">${percent}% ${lang === 'es' ? 'de utilidad' : 'useful'} (${total} ${lang === 'es' ? 'votos' : 'votes'})</span>` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            contentContainer.innerHTML = html;
        }

        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            renderSections(currentCategory, currentSearch);
        });

        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => {
                    b.classList.remove('active');
                    b.style.background = 'transparent';
                    b.style.color = '#94a3b8';
                });
                btn.classList.add('active');
                btn.style.background = 'rgba(139,92,246,0.2)';
                btn.style.color = '#c4b5fd';
                currentCategory = btn.dataset.category;
                renderSections(currentCategory, currentSearch);
            });
        });

        renderSections('all', '');

        // ============================================================
        // 11. CIERRE Y LIMPIEZA
        // ============================================================
        function closeModal() {
            if (overlay.parentNode) overlay.remove();
            document.removeEventListener('keydown', escHandler);
            document.removeEventListener('languageChanged', langUpdateHandler);
        }

        const closeBtn = document.getElementById('closeHelpModal');
        closeBtn.addEventListener('click', closeModal);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });

        const escHandler = (e) => {
            if (e.key === 'Escape') closeModal();
        };
        document.addEventListener('keydown', escHandler);

        const langUpdateHandler = () => {
            const newLang = getCurrentLanguage();
            if (newLang !== lang) {
                closeModal();
                setTimeout(openHelpModal, 100);
            }
        };
        document.addEventListener('languageChanged', langUpdateHandler);

        overlay._cleanup = () => {
            document.removeEventListener('languageChanged', langUpdateHandler);
            document.removeEventListener('keydown', escHandler);
        };
    }

    // ============================================================
    // 12. INICIALIZACIÓN
    // ============================================================
    function initHelpSystem() {

        console.log('🆘 Inicializando sistema de ayuda ULTIMATE v3.4 (todas las secciones)...');
        createHelpButtonInHeader();

        document.addEventListener('keydown', (e) => {
            if (e.key === 'F1' || (e.key === '?' && e.shiftKey)) {
                e.preventDefault();
                openHelpModal();
            }
        });

        setTimeout(() => showHelpTip(), 4000);
        setInterval(() => showHelpTip(), 30000);

        console.log('✅ Sistema de ayuda ULTIMATE v3.4 listo.');
        console.log('📱 Todos los botones del header se encogen y se mantienen en una línea.');
        console.log('💡 Para probar: testHelpSystemUltimate()');
    }

    window.testHelpSystemUltimate = function() {
        console.log('🧪 Probando sistema de ayuda...');
        openHelpModal();
        return '✅ Prueba completada.';
    };

    window.openHelpModal = openHelpModal;
    window.showHelpTip = showHelpTip;
    window.__helpData = HELP_DATA;
    window.__helpTips = TIPS;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHelpSystem);
    } else {
        initHelpSystem();
    }

})();

// ============================================================
// 🚫 BLOQUEO PERMANENTE DE AYUDA EN PANTALLA DE LOGIN
// ============================================================
(function() {
    'use strict';
    
    console.log('🛡️ Inicializando bloqueo permanente de ayuda en login...');
    
    // 1. Función para detectar si estamos en la pantalla de login
    function esPantallaLogin() {
        const loginForm = document.getElementById('loginForm') || 
                         document.getElementById('authFormContainer') ||
                         document.querySelector('.login-container') ||
                         document.querySelector('.login-box');
        const authToken = localStorage.getItem('authToken');
        
        // Si existe el formulario de login y NO hay token, es la pantalla de login
        return (loginForm && !authToken);
    }
    
    // 2. Función para limpiar cualquier rastro de ayuda en el login
    function limpiarAyudaEnLogin() {
        if (!esPantallaLogin()) return;
        
        // Eliminar botón de ayuda
        const helpBtn = document.getElementById('helpHeaderButton');
        if (helpBtn) {
            helpBtn.remove();
            console.log('✅ Botón de ayuda eliminado del login');
        }
        
        // Eliminar modal de ayuda si existe
        const helpModal = document.getElementById('helpModal');
        if (helpModal) helpModal.remove();
        
        // Eliminar placeholders o contenedores vacíos de ayuda
        const helpPlaceholders = document.querySelectorAll('.help-header-placeholder');
        helpPlaceholders.forEach(el => {
            if (!el.closest('#authFormContainer') && !el.closest('.login-container')) {
                el.remove();
            }
        });
    }
    
    // 3. Interceptamos la creación del botón para que NUNCA se ejecute en login
    if (typeof window.createHelpButtonInHeader === 'function') {
        const originalCreateHelpButton = window.createHelpButtonInHeader;
        window.createHelpButtonInHeader = function() {
            if (esPantallaLogin()) {
                console.log('🚫 Creación de botón de ayuda bloqueada (estamos en login)');
                return;
            }
            return originalCreateHelpButton.apply(this, arguments);
        };
        console.log('✅ Función createHelpButtonInHeader interceptada exitosamente');
    }
    
    // 4. Observer para detectar cambios en el DOM (cuando se muestra/oculta el login dinámicamente)
    const observer = new MutationObserver(() => {
        limpiarAyudaEnLogin();
        
        // Si acabamos de salir del login, restauramos el botón
        if (!esPantallaLogin()) {
            const helpBtn = document.getElementById('helpHeaderButton');
            if (!helpBtn && typeof window.createHelpButtonInHeader === 'function') {
                setTimeout(() => {
                    if (!document.getElementById('helpHeaderButton')) {
                        window.createHelpButtonInHeader();
                    }
                }, 300);
            }
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
    });
    
    // 5. Ejecución inmediata al cargar
    limpiarAyudaEnLogin();
    
    // 6. CSS de respaldo para forzar ocultamiento (doble seguridad)
    if (!document.getElementById('login-help-block-styles')) {
        const style = document.createElement('style');
        style.id = 'login-help-block-styles';
        style.textContent = `
            /* Forzar ocultamiento de elementos de ayuda en contextos de login */
            body:has(#loginForm) #helpHeaderButton,
            body:has(.login-container) #helpHeaderButton,
            body:has(.login-box) #helpHeaderButton,
            body.show-login #helpHeaderButton,
            body:has(#loginForm) .help-header-placeholder,
            body:has(.login-container) .help-header-placeholder {
                display: none !important;
                visibility: hidden !important;
                pointer-events: none !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('✅ Sistema de bloqueo de ayuda en login activado permanentemente.');
})();