// plugins/github.js - Crear issues en GitHub
(function() {
  // 1. Configuración
  let githubToken = localStorage.getItem('github_token');
  let githubRepo = localStorage.getItem('github_repo');

  if (!githubToken || !githubRepo) {
    setTimeout(() => {
      const token = prompt(
        '🔧 ¿Quieres vincular con GitHub?\n\n' +
        '1. Ve a https://github.com/settings/tokens\n' +
        '2. Genera un token con permisos "repo"\n' +
        '3. Copia el token y pégalo aquí:\n\n' +
        '(Si no quieres, deja vacío y pulsa Cancelar)'
      );
      if (token && token.trim()) {
        const repo = prompt('Repositorio (formato: usuario/nombre):');
        if (repo && repo.includes('/')) {
          localStorage.setItem('github_token', token);
          localStorage.setItem('github_repo', repo);
          githubToken = token;
          githubRepo = repo;
          alert('✅ GitHub conectado. Las nuevas tareas crearán issues.');
        }
      }
    }, 2000);
  }

  // 2. Función para crear issue
  async function createGithubIssue(title, body) {
    if (!githubToken || !githubRepo) return;
    const url = `https://api.github.com/repos/${githubRepo}/issues`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, body })
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const issue = await response.json();
      console.log(`✅ Issue creado: ${issue.html_url}`);
    } catch (e) {
      console.warn('❌ Error creando issue en GitHub:', e);
    }
  }

  // 3. Escuchar el evento de tarea creada
  document.addEventListener('taskCreated', () => {
    const project = projects[currentProjectIndex];
    if (!project || !project.tasks.length) return;
    const lastTask = project.tasks[project.tasks.length - 1];
    if (lastTask) {
      const titulo = lastTask.name;
      const cuerpo = `${lastTask.description || ''}\n\n**Proyecto:** ${project.name}\n**Prioridad:** ${lastTask.priority || 'media'}\n**Fecha límite:** ${lastTask.deadline || 'No definida'}\n**Creado desde:** Sistema de Gestión de Proyectos`;
      createGithubIssue(titulo, cuerpo);
    }
  });

  console.log('✅ Plugin GitHub activado');
})();