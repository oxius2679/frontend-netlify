// plugins/load-plugins.js
(function() {
  // Lista de plugins que quieres cargar
  const plugins = [
     // 'slack.js',   // Comenta esta línea
    'github.js'
    // Aquí añadirás más adelante: 'jira.js', 'powerbi.js', etc.
    'powerbi.js'     // ← nuevo
  ];

  plugins.forEach(plugin => {
    const script = document.createElement('script');
    script.src = `plugins/${plugin}`;
    script.async = false;  // Carga en orden
    document.head.appendChild(script);
  });

  console.log('🚀 Plugins cargados correctamente');
})();