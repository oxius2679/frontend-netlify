// plugins/slack.js - Usa tu SlackNotifier existente
(function() {
  // Esperar a que el SlackNotifier esté disponible
  const checkSlackNotifier = setInterval(() => {
    if (window.SlackNotifier && typeof window.SlackNotifier.send === 'function') {
      clearInterval(checkSlackNotifier);
      console.log('✅ Plugin Slack conectado al SlackNotifier existente');

      // Escuchar el evento de tarea creada
      document.addEventListener('taskCreated', () => {
        const project = projects[currentProjectIndex];
        if (!project || !project.tasks.length) return;
        const lastTask = project.tasks[project.tasks.length - 1];
        if (lastTask) {
          const mensaje = `📌 *Nueva tarea*: ${lastTask.name}\n📂 Proyecto: ${project.name}\n👤 Asignada a: ${lastTask.assignee || 'Sin asignar'}`;
          window.SlackNotifier.send(mensaje, 'info');
        }
      });

      // También puedes escuchar tareas completadas si quieres
      // document.addEventListener('taskMoved', () => { ... });
    }
  }, 500);
})();