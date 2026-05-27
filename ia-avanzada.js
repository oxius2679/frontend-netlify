// ============================================
// 🎯 CENTRO DE CONTROL PM - VERSIÓN CORREGIDA (PROYECTO SELECCIONADO)
// ============================================

(function() {
    'use strict';
    
    console.log('🎯 [QUANTUM] v10.4 - Proyecto seleccionado correctamente');
    
    // ============================================
    // FUNCIÓN CORREGIDA - OBTIENE PROYECTO SELECCIONADO
    // ============================================
    
    function getCurrentProject() {
        try {
            console.log('[QUANTUM] 🔍 Buscando proyecto actual...');
            
            // 1. FORZAR sincronización desde localStorage PRIMERO
            let savedIndex = localStorage.getItem('currentProjectIndex');
            if (savedIndex !== null) {
                savedIndex = parseInt(savedIndex);
                console.log(`[QUANTUM] 📍 Índice desde localStorage: ${savedIndex}`);
            } else {
                console.log('[QUANTUM] ⚠️ No hay índice guardado en localStorage');
            }
            
            // 2. Cargar projects desde localStorage si es necesario
            if (typeof window.projects === 'undefined' || !Array.isArray(window.projects) || window.projects.length === 0) {
                const savedProjects = localStorage.getItem('projects');
                if (savedProjects) {
                    window.projects = JSON.parse(savedProjects);
                    console.log(`[QUANTUM] ✅ Cargados ${window.projects.length} proyectos desde localStorage`);
                } else {
                    console.log('[QUANTUM] ❌ No hay proyectos guardados');
                    return null;
                }
            }
            
            // 3. Mostrar proyectos disponibles
            console.log('[QUANTUM] 📋 Proyectos disponibles:');
            window.projects.forEach((p, i) => console.log(`   ${i}: ${p.name}`));
            
            // 4. Intentar usar el índice guardado PRIMERO
            let targetIndex = savedIndex;
            
            // 5. Si no hay índice guardado, intentar usar window.currentProjectIndex
            if (targetIndex === null || targetIndex === undefined) {
                if (typeof window.currentProjectIndex !== 'undefined' && window.currentProjectIndex !== null) {
                    targetIndex = window.currentProjectIndex;
                    console.log(`[QUANTUM] 📍 Usando window.currentProjectIndex: ${targetIndex}`);
                } else {
                    console.log('[QUANTUM] ⚠️ No hay índice disponible');
                }
            }
            
            // 6. Validar que el índice sea válido
            if (targetIndex !== null && targetIndex !== undefined && window.projects[targetIndex]) {
                console.log(`[QUANTUM] ✅ Proyecto encontrado por índice: "${window.projects[targetIndex].name}"`);
                // Sincronizar ambas variables
                window.currentProjectIndex = targetIndex;
                localStorage.setItem('currentProjectIndex', targetIndex);
                return window.projects[targetIndex];
            }
            
            // 7. BUSCAR POR NOMBRE (si el índice no funciona)
            if (typeof window.currentProjectName !== 'undefined') {
                const projectByName = window.projects.find(p => p.name === window.currentProjectName);
                if (projectByName) {
                    const idx = window.projects.indexOf(projectByName);
                    console.log(`[QUANTUM] ✅ Proyecto encontrado por nombre: "${projectByName.name}" (índice: ${idx})`);
                    window.currentProjectIndex = idx;
                    localStorage.setItem('currentProjectIndex', idx);
                    return projectByName;
                }
            }
            
            // 8. BUSCAR POR CLIENTEID
            const clienteId = localStorage.getItem('clienteId');
            if (clienteId) {
                const projectByCliente = window.projects.find(p => p.clienteId === clienteId);
                if (projectByCliente) {
                    const idx = window.projects.indexOf(projectByCliente);
                    console.log(`[QUANTUM] ✅ Proyecto encontrado por clienteId: "${projectByCliente.name}"`);
                    window.currentProjectIndex = idx;
                    localStorage.setItem('currentProjectIndex', idx);
                    return projectByCliente;
                }
            }
            
            // 9. FALLBACK: Usar el PRIMER proyecto
            console.log(`[QUANTUM] ⚠️ Usando primer proyecto como fallback: "${window.projects[0].name}"`);
            window.currentProjectIndex = 0;
            localStorage.setItem('currentProjectIndex', 0);
            return window.projects[0];
            
        } catch(e) {
            console.error('[QUANTUM] Error:', e);
            return null;
        }
    }
    
    // ============================================
    // RESTO DE FUNCIONES (ThreeJS, Riesgo, Monte Carlo, etc.)
    // ============================================
    
    function loadThreeJS() {
        return new Promise((resolve) => {
            if (typeof THREE !== 'undefined') {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
            script.onload = resolve;
            script.onerror = resolve;
            document.head.appendChild(script);
        });
    }
    
    let cubeScene = null, cubeCamera = null, cubeRenderer = null, cubeMesh = null, cubeAnimationId = null;
    
    function init3DCube(containerId, completionRate) {
        const container = document.getElementById(containerId);
        if (!container || typeof THREE === 'undefined') {
            if (container) container.innerHTML = '<div style="color:#00ffff; text-align:center; padding:40px;">🎮 3D cargando...</div>';
            return;
        }
        
        if (cubeRenderer) {
            if (cubeAnimationId) cancelAnimationFrame(cubeAnimationId);
            if (cubeRenderer.dispose) cubeRenderer.dispose();
        }
        
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        cubeScene = new THREE.Scene();
        cubeScene.background = new THREE.Color(0x010108);
        
        cubeCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        cubeCamera.position.set(0, 2, 6);
        
        cubeRenderer = new THREE.WebGLRenderer({ antialias: true });
        cubeRenderer.setSize(width, height);
        container.innerHTML = '';
        container.appendChild(cubeRenderer.domElement);
        
        const ambientLight = new THREE.AmbientLight(0x222222);
        cubeScene.add(ambientLight);
        
        const light1 = new THREE.PointLight(0x00ffff, 1);
        light1.position.set(2, 3, 4);
        cubeScene.add(light1);
        
        const light2 = new THREE.PointLight(0xff00ff, 0.8);
        light2.position.set(-2, 1, 3);
        cubeScene.add(light2);
        
        const colors = [0xff00ff, 0x00ffff, 0x8b5cf6, 0xec4899, 0x10b981, 0xf59e0b];
        const materials = colors.map(c => new THREE.MeshStandardMaterial({ color: c, metalness: 0.7, roughness: 0.3 }));
        const geometry = new THREE.BoxGeometry(1.8, 1.8, 1.8);
        cubeMesh = new THREE.Mesh(geometry, materials);
        cubeScene.add(cubeMesh);
        
        const particleCount = 600;
        const particlesGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            positions[i*3] = (Math.random() - 0.5) * 25;
            positions[i*3+1] = (Math.random() - 0.5) * 18;
            positions[i*3+2] = (Math.random() - 0.5) * 18 - 8;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particlesMaterial = new THREE.PointsMaterial({ color: 0x00ffff, size: 0.06 });
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        cubeScene.add(particles);
        
        const ringGeo = new THREE.TorusGeometry(2.2, 0.05, 64, 200);
        const ringMat = new THREE.MeshStandardMaterial({ color: 0xff00ff });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        cubeScene.add(ring);
        
        function animate() {
            cubeAnimationId = requestAnimationFrame(animate);
            if (cubeMesh) {
                cubeMesh.rotation.x += 0.008;
                cubeMesh.rotation.y += 0.012;
            }
            if (particles) particles.rotation.y += 0.002;
            if (ring) ring.rotation.z += 0.005;
            if (cubeCamera) {
                const time = Date.now() * 0.001;
                cubeCamera.position.x = Math.sin(time * 0.15) * 0.8;
                cubeCamera.position.y = 2 + Math.sin(time * 0.25) * 0.3;
                cubeCamera.lookAt(0, 0, 0);
            }
            if (cubeRenderer) cubeRenderer.render(cubeScene, cubeCamera);
        }
        animate();
        
        window.addEventListener('resize', () => {
            if (container && cubeCamera && cubeRenderer) {
                const w = container.clientWidth, h = container.clientHeight;
                cubeCamera.aspect = w / h;
                cubeCamera.updateProjectionMatrix();
                cubeRenderer.setSize(w, h);
            }
        });
    }
    
    function calculateRisk(task) {
        if (!task) return 0;
        if (task.status === 'completed') return 0;
        
        let risk = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (task.deadline) {
            const deadline = new Date(task.deadline);
            deadline.setHours(0, 0, 0, 0);
            const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
            
            if (daysLeft < 0) risk += 80;
            else if (daysLeft === 0) risk += 70;
            else if (daysLeft <= 3) risk += 50;
            else if (daysLeft <= 7) risk += 30;
            else if (daysLeft <= 14) risk += 15;
            else risk += 5;
        } else {
            risk += 20;
        }
        
        if (task.priority === 'alta' || task.priority === 'high') risk += 25;
        else if (task.priority === 'media' || task.priority === 'medium') risk += 10;
        
        if (task.dependencies && task.dependencies.length > 2) risk += 15;
        else if (task.dependencies && task.dependencies.length > 0) risk += 5;
        
        if (task.status !== 'completed') {
            const progress = task.progress || 0;
            if (progress < 20 && task.deadline) risk += 20;
            else if (progress < 50 && task.deadline) risk += 10;
        }
        
        if (task.status === 'overdue') risk += 30;
        
        return Math.min(100, Math.max(0, risk));
    }
    
    function monteCarloSimulation(tasks, iterations = 500) {
        const totalTasks = tasks.length;
        const completed = tasks.filter(t => t.status === 'completed').length;
        const remaining = totalTasks - completed;
        if (remaining === 0) return { optimistic: 0, pessimistic: 0, median: 0, confidence: 100 };
        const dailyRate = completed / Math.max(1, 30);
        if (dailyRate === 0) return { optimistic: 999, pessimistic: 999, median: 999, confidence: 0 };
        const results = [];
        for (let i = 0; i < iterations; i++) {
            const variation = 0.7 + Math.random() * 0.6;
            const days = Math.ceil(remaining / Math.max(0.01, dailyRate * variation));
            results.push(Math.min(365, days));
        }
        results.sort((a, b) => a - b);
        return {
            optimistic: results[Math.floor(results.length * 0.1)],
            pessimistic: results[Math.floor(results.length * 0.9)],
            median: results[Math.floor(results.length * 0.5)],
            confidence: Math.round((results.filter(d => d <= (results[Math.floor(results.length * 0.5)] || 0) + 7).length / iterations) * 100)
        };
    }
    
    function analyzeSentiment(tasks) {
        const allComments = [];
        tasks.forEach(task => {
            if (task.description && task.description.trim().length > 0) {
                allComments.push(task.description);
            }
        });
        
        if (allComments.length === 0) {
            return { 
                label: 'neutral', intensity: 0, color: '#888', emoji: '😐', 
                positiveCount: 0, negativeCount: 0, totalComments: 0,
                sample: 'No hay comentarios en las tareas.'
            };
        }
        
        const positiveWords = ['excelente', 'bueno', 'genial', 'perfecto', 'rápido', 'eficiente', 'logro', 'éxito', 'bien', 'completado', 'avance'];
        const negativeWords = ['problema', 'error', 'retraso', 'bloqueo', 'difícil', 'complicado', 'urgente', 'crítico', 'mal', 'fallo', 'atraso'];
        
        let positiveCount = 0, negativeCount = 0;
        let allText = allComments.join(' ').toLowerCase();
        
        positiveWords.forEach(w => { const matches = allText.match(new RegExp(w, 'gi')); if (matches) positiveCount += matches.length; });
        negativeWords.forEach(w => { const matches = allText.match(new RegExp(w, 'gi')); if (matches) negativeCount += matches.length; });
        
        const total = positiveCount + negativeCount;
        if (total === 0) {
            return { 
                label: 'neutral', intensity: 0, color: '#888', emoji: '😐', 
                positiveCount: 0, negativeCount: 0, totalComments: allComments.length,
                sample: 'Comentarios neutrales'
            };
        }
        
        const score = (positiveCount - negativeCount) / total;
        let label = 'neutral', color = '#888', emoji = '😐';
        if (score > 0.2) { label = 'positivo'; color = '#00ff00'; emoji = '😊'; }
        else if (score < -0.2) { label = 'negativo'; color = '#ff4444'; emoji = '😞'; }
        
        const intensity = Math.min(100, Math.round((total / 20) * 100));
        
        let sample = 'Sin ejemplo destacado';
        const sentences = allText.split(/[.!?]+/);
        for (const s of sentences) {
            if (s.includes('excelente') || s.includes('problema') || s.includes('error') || s.includes('bueno')) {
                sample = s.trim().substring(0, 60);
                break;
            }
        }
        
        return { label, color, emoji, intensity, positiveCount, negativeCount, totalComments: allComments.length, sample };
    }
    
    let matrixInterval = null;
    function generateMatrixText() {
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        let text = '';
        for (let i = 0; i < 120; i++) {
            text += chars[Math.floor(Math.random() * chars.length)];
            if (i % 30 === 29) text += '\n';
        }
        return text;
    }
    
    function startMatrixAnimation() {
        if (matrixInterval) clearInterval(matrixInterval);
        const matrixEl = document.getElementById('quantumMatrix');
        if (!matrixEl) return;
        matrixInterval = setInterval(() => {
            if (matrixEl && document.body.contains(matrixEl)) {
                matrixEl.innerHTML = generateMatrixText();
                matrixEl.scrollTop = matrixEl.scrollHeight;
            }
        }, 150);
    }
    
    function injectStyles() {
        if (document.getElementById('quantum-v10-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'quantum-v10-styles';
        styles.textContent = `
            .quantum-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(ellipse at 20% 30%, #010108, #000000);
                z-index: 10000000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .quantum-dashboard {
                width: 95vw;
                max-width: 1500px;
                height: 90vh;
                background: linear-gradient(135deg, rgba(1,1,8,0.95), rgba(5,5,20,0.98));
                border: 1px solid #00ffff;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                border-radius: 12px;
            }
            .quantum-header {
                background: rgba(0,0,0,0.8);
                padding: 12px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #00ffff;
                flex-wrap: wrap;
            }
            .quantum-logo { display: flex; align-items: center; gap: 12px; }
            .quantum-icon {
                width: 42px; height: 42px;
                background: linear-gradient(135deg, #00ffff, #ff00ff);
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 22px;
            }
            .quantum-title h1 { margin: 0; font-size: 16px; color: #00ffff; letter-spacing: 2px; }
            .quantum-title p { margin: 3px 0 0; color: #00ffff88; font-size: 9px; }
            .quantum-badge {
                background: rgba(0,255,255,0.1);
                border: 1px solid #00ffff;
                padding: 4px 12px;
                font-size: 9px;
                color: #00ffff;
            }
            .quantum-close {
                background: rgba(255,0,255,0.2);
                border: 1px solid #ff00ff;
                color: #ff00ff;
                width: 36px;
                height: 36px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 16px;
            }
            .quantum-content { flex: 1; padding: 15px; overflow-y: auto; }
            .quantum-kpi-grid {
                display: grid;
                grid-template-columns: repeat(6, 1fr);
                gap: 10px;
                margin-bottom: 15px;
            }
            .quantum-kpi {
                text-align: center;
                padding: 12px;
                background: rgba(0,0,0,0.6);
                border: 1px solid rgba(0,255,255,0.3);
                border-radius: 8px;
            }
            .quantum-kpi-value { font-size: 28px; font-weight: 700; background: linear-gradient(135deg, #fff, #00ffff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .quantum-kpi-label { font-size: 8px; color: #00ffff88; margin-top: 4px; letter-spacing: 1px; }
            .quantum-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px; }
            .quantum-card {
                background: rgba(0,0,0,0.6);
                border: 1px solid rgba(0,255,255,0.2);
                border-radius: 8px;
                overflow: hidden;
            }
            .quantum-card-header {
                padding: 10px 12px;
                background: rgba(0,0,0,0.8);
                border-bottom: 1px solid rgba(0,255,255,0.2);
                display: flex;
                justify-content: space-between;
                font-size: 11px;
                color: #00ffff;
            }
            .quantum-card-body { padding: 12px; }
            .quantum-3d-container { height: 280px; background: #000; border-radius: 6px; overflow: hidden; }
            .quantum-matrix {
                font-family: monospace;
                color: #00ff00;
                background: #000;
                padding: 8px;
                font-size: 8px;
                height: 80px;
                overflow-y: auto;
                border-radius: 4px;
            }
            .quantum-progress { background: #1a1a2e; border-radius: 10px; height: 5px; overflow: hidden; }
            .quantum-progress-fill { height: 100%; background: linear-gradient(90deg, #00ffff, #ff00ff); transition: width 0.5s; }
            .quantum-mc-grid { display: flex; gap: 12px; margin-bottom: 12px; }
            .quantum-mc-card { flex: 1; text-align: center; padding: 10px; background: rgba(0,0,0,0.4); border: 1px solid rgba(0,255,255,0.2); }
            .quantum-mc-value { font-size: 22px; font-weight: 700; color: #00ffff; }
            .quantum-mc-label { font-size: 8px; color: #666; margin-top: 4px; }
            .quantum-table { width: 100%; border-collapse: collapse; font-size: 10px; }
            .quantum-table th { text-align: left; padding: 8px; color: #00ffff; border-bottom: 1px solid rgba(0,255,255,0.3); }
            .quantum-table td { padding: 8px; border-bottom: 1px solid rgba(0,255,255,0.1); color: #ccc; }
            .quantum-table tr:hover { background: rgba(0,255,255,0.05); cursor: pointer; }
            .quantum-voice {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #00ffff, #ff00ff);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 10000001;
                font-size: 22px;
            }
            @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }
            .quantum-content::-webkit-scrollbar { width: 4px; }
            .quantum-content::-webkit-scrollbar-track { background: #111; }
            .quantum-content::-webkit-scrollbar-thumb { background: #00ffff; }
        `;
        document.head.appendChild(styles);
    }
    
    // ============================================
    // DASHBOARD PRINCIPAL
    // ============================================
    
    async function showQuantumDashboard() {
        console.log('[QUANTUM] Abriendo dashboard...');
        
        const project = getCurrentProject();
        if (!project) { 
            alert('❌ No hay proyectos disponibles');
            return; 
        }
        
        console.log(`[QUANTUM] 📊 Proyecto SELECCIONADO: "${project.name}"`);
        
        const tasks = project.tasks || [];
        if (tasks.length === 0) { 
            alert(`📭 El proyecto "${project.name}" no tiene tareas`);
            return; 
        }
        
        await loadThreeJS();
        injectStyles();
        
        const completed = tasks.filter(t => t.status === 'completed').length;
        const inProgress = tasks.filter(t => t.status === 'inProgress').length;
        const pending = tasks.filter(t => t.status === 'pending').length;
        const overdue = tasks.filter(t => t.status === 'overdue').length;
        const completionRate = Math.round((completed / tasks.length) * 100);
        
        let pv = 0, ev = 0, ac = 0;
        tasks.forEach(t => {
            const est = t.estimatedTime || 0;
            pv += est;
            ac += t.timeLogged || 0;
            if (t.status === 'completed') ev += est;
            else if (t.status === 'inProgress') ev += est * ((t.progress || 0) / 100);
        });
        const cpi = ac > 0 ? ev / ac : 1;
        const spi = pv > 0 ? ev / pv : 1;
        const healthScore = Math.round(completionRate - (overdue / tasks.length) * 50);
        
        const monteCarlo = monteCarloSimulation(tasks);
        const sentiment = analyzeSentiment(tasks);
        const tasksWithRisk = tasks.map(t => ({ ...t, risk: calculateRisk(t) }));
        
        const existing = document.getElementById('quantumV10Dashboard');
        if (existing) existing.remove();
        
        const dashboard = document.createElement('div');
        dashboard.id = 'quantumV10Dashboard';
        dashboard.className = 'quantum-overlay';
        
        dashboard.innerHTML = `
            <div class="quantum-dashboard">
                <div class="quantum-header">
                    <div class="quantum-logo">
                        <div class="quantum-icon">🎯</div>
                        <div class="quantum-title">
                            <h1>CENTRO DE CONTROL PM</h1>
                            <p>${project.name} · ${new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div class="quantum-badge">⚡ 3D ACTIVE</div>
                    <button class="quantum-close" id="quantumCloseBtn">✕</button>
                </div>
                <div class="quantum-content">
                    <div class="quantum-kpi-grid">
                        <div class="quantum-kpi"><div class="quantum-kpi-value">${tasks.length}</div><div class="quantum-kpi-label">TOTAL</div></div>
                        <div class="quantum-kpi"><div class="quantum-kpi-value" style="color:#0f0;">${completed}</div><div class="quantum-kpi-label">COMPL</div></div>
                        <div class="quantum-kpi"><div class="quantum-kpi-value" style="color:#0ff;">${inProgress}</div><div class="quantum-kpi-label">PROG</div></div>
                        <div class="quantum-kpi"><div class="quantum-kpi-value" style="color:#f0f;">${pending}</div><div class="quantum-kpi-label">PEND</div></div>
                        <div class="quantum-kpi"><div class="quantum-kpi-value" style="color:#f44;">${overdue}</div><div class="quantum-kpi-label">ATRAS</div></div>
                        <div class="quantum-kpi"><div class="quantum-kpi-value">${completionRate}%</div><div class="quantum-kpi-label">%</div></div>
                    </div>
                    <div class="quantum-grid-2">
                        <div class="quantum-card"><div class="quantum-card-header"><span>🌐 HOLOGRAPHIC CUBE</span><span>${completionRate}% completado</span></div><div class="quantum-card-body"><div id="quantum3dContainer" class="quantum-3d-container"></div></div></div>
                        <div class="quantum-card"><div class="quantum-card-header"><span>🔮 MONTE CARLO</span><span>${monteCarlo.confidence}% confianza</span></div><div class="quantum-card-body">
                            <div class="quantum-mc-grid">
                                <div class="quantum-mc-card"><div class="quantum-mc-value">${monteCarlo.optimistic}</div><div class="quantum-mc-label">OPTIMISTA</div></div>
                                <div class="quantum-mc-card"><div class="quantum-mc-value">${monteCarlo.median}</div><div class="quantum-mc-label">MEDIANO</div></div>
                                <div class="quantum-mc-card"><div class="quantum-mc-value">${monteCarlo.pessimistic}</div><div class="quantum-mc-label">PESIMISTA</div></div>
                            </div>
                            <div style="padding:8px; background:#000; border-radius:4px; font-family:monospace; font-size:9px; color:#0f0;">
                                > 500 iteraciones simuladas<br>
                                > Velocidad: ${(completed / Math.max(1,30)).toFixed(2)} tareas/día
                            </div>
                        </div></div>
                    </div>
                    <div class="quantum-grid-2">
                        <div class="quantum-card"><div class="quantum-card-header"><span>💬 SENTIMENT ANALYSIS</span><span style="color:${sentiment.color};">${sentiment.label.toUpperCase()} ${sentiment.emoji}</span></div><div class="quantum-card-body">
                            <div id="quantumMatrix" class="quantum-matrix">${generateMatrixText()}</div>
                            <div style="margin-top:8px;">
                                <div class="quantum-progress"><div class="quantum-progress-fill" style="width: ${sentiment.intensity}%;"></div></div>
                                <div style="display:flex; justify-content:space-between; margin-top:5px; font-size:8px;">
                                    <span>👍 Positivos: ${sentiment.positiveCount}</span>
                                    <span>👎 Negativos: ${sentiment.negativeCount}</span>
                                    <span>📝 Comentarios: ${sentiment.totalComments}</span>
                                </div>
                                <div style="margin-top:8px; padding:6px; background:#111; border-radius:4px; font-size:8px; color:#aaa;">
                                    💬 "${sentiment.sample}"
                                </div>
                            </div>
                        </div></div>
                        <div class="quantum-card"><div class="quantum-card-header"><span>⚡ EXECUTIVE METRICS</span><span>CPI / SPI</span></div><div class="quantum-card-body">
                            <div style="display:flex; gap:20px; justify-content:center; margin-bottom:12px;">
                                <div style="text-align:center;"><div style="font-size:32px; font-weight:700; color:${cpi>=1?'#0f0':'#f44'};">${cpi.toFixed(2)}</div><div style="font-size:9px;">CPI</div></div>
                                <div style="text-align:center;"><div style="font-size:32px; font-weight:700; color:${spi>=1?'#0f0':'#f44'};">${spi.toFixed(2)}</div><div style="font-size:9px;">SPI</div></div>
                                <div style="text-align:center;"><div style="font-size:32px; font-weight:700; color:${healthScore>=70?'#0f0':healthScore>=40?'#ff0':'#f44'};">${healthScore}%</div><div style="font-size:9px;">HEALTH</div></div>
                            </div>
                            <div class="quantum-progress"><div class="quantum-progress-fill" style="width: ${healthScore}%;"></div></div>
                        </div></div>
                    </div>
                    <div class="quantum-card">
                        <div class="quantum-card-header"><span>⚠️ CRITICAL RISK MATRIX</span><span>🔴 ${tasksWithRisk.filter(t => t.risk >= 80 && t.status !== 'completed').length} críticos | 🎉 ${tasksWithRisk.filter(t => t.status === 'completed').length} completadas</span></div>
                        <div class="quantum-card-body">
                            <div style="overflow-x:auto; max-height:250px; overflow-y:auto;">
                                <table class="quantum-table"><thead><tr><th>Tarea</th><th>Asignado</th><th>Progreso</th><th>Estado</th><th>Riesgo</th></tr></thead>
                                <tbody>${tasksWithRisk.sort((a,b) => b.risk - a.risk).slice(0,20).map(t => {
                                    if (t.status === 'completed') {
                                        return `<tr data-task-id="${t.id}" style="background: linear-gradient(90deg, #0a2e1a, #0a1a0a); border-left: 4px solid #00ff00;">
                                            <td><strong>🎉✨ ${(t.name || 'Sin nombre').substring(0,30)} ✨🎉</strong> <span style="color:#00ff00;">✓ COMPLETADA</span></td>
                                            <td style="color:#00ff00;">${t.assignee || '—'} 👏</td>
                                            <td><div style="width:80px; background:#1a3a2a; border-radius:10px; height:6px;"><div style="width:100%; height:100%; background:#00ff00; border-radius:10px;"></div></div> 100% ✅</td>
                                            <td><span style="background:#00ff00; color:#000; padding:3px 10px; border-radius:20px;">🎉 TRIUNFO 🎉</span></td>
                                            <td><span style="background:#00ff00; color:#000; padding:5px 12px; border-radius:20px;">✨ 0% ✨</span></td>
                                        </table>`;
                                    }
                                    let riskColor = '#00ff00', riskBg = '#0a2e1a', riskDisplay = `🟢 ${t.risk}%`;
                                    if (t.risk >= 100) { riskColor = '#ff0000'; riskBg = '#2a0000'; riskDisplay = `🔴 ${t.risk}% CRÍTICO 🔴`; }
                                    else if (t.risk >= 80) { riskColor = '#ff4444'; riskBg = '#2a0a0a'; riskDisplay = `🔴 ${t.risk}%`; }
                                    else if (t.risk >= 60) { riskColor = '#ff8800'; riskBg = '#2a1a0a'; riskDisplay = `🟠 ${t.risk}%`; }
                                    else if (t.risk >= 30) { riskColor = '#ffff00'; riskBg = '#2a2a0a'; riskDisplay = `🟡 ${t.risk}%`; }
                                    
                                    let statusIcon = '', statusText = '', statusColor = '';
                                    if (t.status === 'overdue') { statusIcon = '🔴'; statusText = 'ATRASADA'; statusColor = '#ff4444'; }
                                    else if (t.status === 'inProgress') { statusIcon = '🔄'; statusText = 'EN PROGRESO'; statusColor = '#00ffff'; }
                                    else { statusIcon = '⏳'; statusText = 'PENDIENTE'; statusColor = '#ffff00'; }
                                    
                                    let daysLeftText = '';
                                    if (t.deadline && t.status !== 'completed') {
                                        const deadline = new Date(t.deadline);
                                        const today = new Date();
                                        const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
                                        if (daysLeft < 0) daysLeftText = ` ⚠️ VENCE HACE ${Math.abs(daysLeft)} DÍAS`;
                                        else if (daysLeft === 0) daysLeftText = ` 🔴 VENCE HOY`;
                                        else if (daysLeft <= 3) daysLeftText = ` 🟡 VENCE EN ${daysLeft} DÍAS`;
                                    }
                                    
                                    return `<tr data-task-id="${t.id}" style="background: ${riskBg}; border-left: 4px solid ${riskColor};">
                                        <td><strong style="color:${riskColor};">${statusIcon} ${(t.name || 'Sin nombre').substring(0,35)}${daysLeftText}</strong></td>
                                        <td>${t.assignee || '—'}</td>
                                        <td><div style="width:80px; background:#1a1a2a; border-radius:10px; height:6px;"><div style="width:${t.progress || 0}%; height:100%; background:${riskColor}; border-radius:10px;"></div></div> ${t.progress || 0}%</td>
                                        <td><span style="background:${statusColor}33; color:${statusColor}; padding:3px 10px; border-radius:20px;">${statusIcon} ${statusText}</span></td>
                                        <td><span style="background:${riskColor}22; color:${riskColor}; padding:5px 12px; border-radius:20px; font-weight:bold;">${riskDisplay}</span></td>
                                    </tr>`;
                                }).join('')}</tbody>
                                </table>
                            </div>
                            <div style="margin-top:10px; display:flex; justify-content:space-between; font-size:8px; color:#888; padding:5px;">
                                <div>🔴 Riesgo 100% → ROJO</div>
                                <div>🟡 Riesgo medio → AMARILLO</div>
                                <div>🟢 Riesgo bajo → VERDE</div>
                                <div>🎉 Completadas → CELEBRACIÓN 🏆✨</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="quantumVoiceBtn" class="quantum-voice">🎙️</div>
        `;
        
        document.body.appendChild(dashboard);
        
        document.getElementById('quantumCloseBtn').onclick = () => dashboard.remove();
        dashboard.onclick = (e) => { if (e.target === dashboard) dashboard.remove(); };
        
        setTimeout(() => init3DCube('quantum3dContainer', completionRate), 200);
        
        document.querySelectorAll('.quantum-table tr[data-task-id]').forEach(row => {
            row.onclick = () => {
                const taskId = row.dataset.taskId;
                const task = tasks.find(t => t.id == taskId);
                if (task && typeof window.showTaskDetails === 'function') {
                    dashboard.remove();
                    setTimeout(() => window.showTaskDetails(task), 100);
                }
            };
        });
        
        startMatrixAnimation();
        
        const voiceBtn = document.getElementById('quantumVoiceBtn');
        if (voiceBtn) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                let recognition = null, isListening = false;
                voiceBtn.onclick = () => {
                    if (isListening) { if (recognition) recognition.stop(); voiceBtn.classList.remove('listening'); isListening = false; }
                    else {
                        recognition = new SpeechRecognition();
                        recognition.lang = 'es-ES';
                        recognition.onstart = () => { isListening = true; voiceBtn.classList.add('listening'); };
                        recognition.onend = () => { isListening = false; voiceBtn.classList.remove('listening'); };
                        recognition.onresult = (event) => {
                            const command = event.results[0][0].transcript.toLowerCase();
                            if (command.includes('cerrar')) dashboard.remove();
                            else if (command.includes('estado')) alert(`📊 ${project.name}\n✅ Progreso: ${completionRate}%\n📋 Tareas: ${completed}/${tasks.length}\n⚠️ Riesgo: ${tasksWithRisk.filter(t => t.risk >= 80).length} tareas críticas`);
                            else alert(`🎤 Comando: "${command}"`);
                        };
                        recognition.start();
                    }
                };
            } else {
                voiceBtn.style.opacity = '0.5';
                voiceBtn.title = 'Voz no soportada';
            }
        }
    }
    
    // ============================================
    // CREAR BOTÓN EN SIDEBAR
    // ============================================
    
    function createSidebarButton() {
        if (document.getElementById('quantumV10Btn')) return;
        
        const interval = setInterval(() => {
            const sidebar = document.querySelector('aside, #sidebar, .sidebar');
            if (sidebar && !document.getElementById('quantumV10Btn')) {
                const btn = document.createElement('button');
                btn.id = 'quantumV10Btn';
                btn.innerHTML = '🎯 CENTRO DE CONTROL PM';
                btn.style.cssText = `
                    width: 90%;
                    margin: 15px auto;
                    background: linear-gradient(135deg, #00ffff, #ff00ff);
                    border: none;
                    color: white;
                    padding: 14px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: bold;
                    display: block;
                    font-size: 12px;
                    box-shadow: 0 0 15px rgba(0,255,255,0.3);
                    transition: all 0.3s ease;
                `;
                
                btn.onmouseenter = () => {
                    btn.style.transform = 'translateY(-2px)';
                    btn.style.boxShadow = '0 0 25px rgba(0,255,255,0.5)';
                };
                btn.onmouseleave = () => {
                    btn.style.transform = 'translateY(0)';
                    btn.style.boxShadow = '0 0 15px rgba(0,255,255,0.3)';
                };
                
                btn.onclick = () => showQuantumDashboard();
                sidebar.appendChild(btn);
                clearInterval(interval);
            }
        }, 500);
    }
    
    // ============================================
    // EXPONER FUNCIONES GLOBALMENTE
    // ============================================
    
    window.showQuantumDashboard = showQuantumDashboard;
    window.QuantumExecutive = { 
        show: showQuantumDashboard, 
        version: '10.4',
        getCurrentProject: getCurrentProject
    };
    
    // ============================================
    // INICIALIZACIÓN
    // ============================================
    
    function init() {
        createSidebarButton();
        console.log('✅ CENTRO DE CONTROL PM - CORREGIDO');
        console.log('   - Función global: window.showQuantumDashboard');
        console.log('   - Objeto global: window.QuantumExecutive');
        console.log('   - Botón en sidebar');
        console.log('   - Proyecto seleccionado correctamente');
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();