// ============================================
// 🎯 CENTRO DE CONTROL PM - VERSIÓN DEFINITIVA v11.7
// ============================================

(function() {
    'use strict';
    
    console.log('🎯 [QUANTUM] v11.7 - Todos los textos en blanco corregidos');
    
    function getCurrentProject() {
        try {
            let savedIndex = localStorage.getItem('currentProjectIndex');
            if (savedIndex !== null) savedIndex = parseInt(savedIndex);
            
            if (typeof window.projects === 'undefined' || !Array.isArray(window.projects) || window.projects.length === 0) {
                const savedProjects = localStorage.getItem('projects');
                if (savedProjects) window.projects = JSON.parse(savedProjects);
                else return null;
            }
            
            let targetIndex = savedIndex;
            if (targetIndex === null || targetIndex === undefined) {
                if (typeof window.currentProjectIndex !== 'undefined' && window.currentProjectIndex !== null) {
                    targetIndex = window.currentProjectIndex;
                }
            }
            
            if (targetIndex !== null && targetIndex !== undefined && window.projects[targetIndex]) {
                window.currentProjectIndex = targetIndex;
                localStorage.setItem('currentProjectIndex', targetIndex);
                return window.projects[targetIndex];
            }
            
            const clienteId = localStorage.getItem('clienteId');
            if (clienteId) {
                const projectByCliente = window.projects.find(p => p.clienteId === clienteId);
                if (projectByCliente) {
                    const idx = window.projects.indexOf(projectByCliente);
                    window.currentProjectIndex = idx;
                    localStorage.setItem('currentProjectIndex', idx);
                    return projectByCliente;
                }
            }
            
            window.currentProjectIndex = 0;
            localStorage.setItem('currentProjectIndex', 0);
            return window.projects[0];
        } catch(e) {
            console.error('[QUANTUM] Error:', e);
            return null;
        }
    }
    
    function loadThreeJS() {
        return new Promise((resolve) => {
            if (typeof THREE !== 'undefined') { resolve(); return; }
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
            if (container) container.innerHTML = '<div style="color:#3b82f6; text-align:center; padding:40px;">🎮 3D cargando...</div>';
            return;
        }
        
        if (cubeRenderer) {
            if (cubeAnimationId) cancelAnimationFrame(cubeAnimationId);
            if (cubeRenderer.dispose) cubeRenderer.dispose();
        }
        
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        cubeScene = new THREE.Scene();
        cubeScene.background = new THREE.Color(0x0f111a);
        
        cubeCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        cubeCamera.position.set(0, 2, 6);
        
        cubeRenderer = new THREE.WebGLRenderer({ antialias: true });
        cubeRenderer.setSize(width, height);
        container.innerHTML = '';
        container.appendChild(cubeRenderer.domElement);
        
        const ambientLight = new THREE.AmbientLight(0x222222);
        cubeScene.add(ambientLight);
        
        const light1 = new THREE.PointLight(0x3b82f6, 1);
        light1.position.set(2, 3, 4);
        cubeScene.add(light1);
        
        const light2 = new THREE.PointLight(0x1d4ed8, 0.8);
        light2.position.set(-2, 1, 3);
        cubeScene.add(light2);
        
        const colors = [0x3b82f6, 0x1d4ed8, 0x60a5fa, 0x2563eb, 0x10b981, 0x06b6d4];
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
        const particlesMaterial = new THREE.PointsMaterial({ color: 0x3b82f6, size: 0.06 });
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        cubeScene.add(particles);
        
        const ringGeo = new THREE.TorusGeometry(2.2, 0.05, 64, 200);
        const ringMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8 });
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
    
    function calcularProgresoReal(task) {
        if (!task) return 0;
        if (task.status === 'completed') return 100;
        
        const horasRegistradas = task.timeLogged || 0;
        const horasEstimadas = task.estimatedTime || 0;
        
        if (horasEstimadas > 0) {
            let progreso = (horasRegistradas / horasEstimadas) * 100;
            return Math.min(100, Math.max(0, Math.round(progreso)));
        }
        
        return task.progress || 0;
    }
    
    function calculateRisk(task) {
        if (!task) return 0;
        if (task.status === 'completed') return 0;
        
        const progresoReal = calcularProgresoReal(task);
        
        let riesgo = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (task.deadline) {
            const deadline = new Date(task.deadline);
            deadline.setHours(0, 0, 0, 0);
            const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
            
            if (daysLeft < 0) {
                const daysOverdue = Math.abs(daysLeft);
                riesgo += Math.min(50, 40 + (daysOverdue * 3));
            } else if (daysLeft === 0) {
                riesgo += 40;
            } else if (daysLeft <= 2) {
                riesgo += 35;
            } else if (daysLeft <= 5) {
                riesgo += 25;
            } else if (daysLeft <= 10) {
                riesgo += 15;
            } else {
                riesgo += 8;
            }
        } else {
            riesgo += 15;
        }
        
        if (task.status === 'overdue') {
            if (progresoReal >= 80) riesgo += 10;
            else if (progresoReal >= 60) riesgo += 20;
            else if (progresoReal >= 40) riesgo += 30;
            else if (progresoReal >= 20) riesgo += 35;
            else riesgo += 40;
        } 
        else if (task.status === 'inProgress') {
            if (progresoReal < 20) riesgo += 35;
            else if (progresoReal < 40) riesgo += 25;
            else if (progresoReal < 60) riesgo += 15;
            else riesgo += 5;
        } 
        else if (task.status === 'pending') {
            riesgo += 25;
            if (task.deadline) {
                const deadline = new Date(task.deadline);
                const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
                if (daysLeft <= 2) riesgo += 15;
                else if (daysLeft <= 5) riesgo += 10;
                else if (daysLeft <= 10) riesgo += 5;
            }
        }
        
        if (task.priority === 'alta' || task.priority === 'high') {
            riesgo += 10;
        } else if (task.priority === 'media' || task.priority === 'medium') {
            riesgo += 5;
        } else if (task.priority === 'baja' || task.priority === 'low') {
            riesgo += 2;
        }
        
        if (task.dependencies && task.dependencies.length > 0) {
            riesgo += Math.min(5, task.dependencies.length * 2);
        }
        
        return Math.min(100, Math.max(0, Math.round(riesgo)));
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
                allComments.push({
                    text: task.description,
                    taskName: task.name,
                    taskId: task.id,
                    status: task.status
                });
            }
        });
        
        if (allComments.length === 0) {
            return { 
                label: 'neutral', intensity: 0, color: '#888', emoji: '😐', 
                positiveCount: 0, negativeCount: 0, totalComments: 0,
                sample: 'No hay comentarios en las tareas.',
                positiveWords: [], negativeWords: [], negativePercent: 0, positivePercent: 0,
                recommendations: 'Agrega comentarios a las tareas para obtener análisis de sentimiento',
                taskAnalysis: []
            };
        }
        
        const positiveWords = ['excelente', 'bueno', 'genial', 'perfecto', 'rápido', 'eficiente', 'logro', 'éxito', 'bien', 'completado', 'avance', 'cumplido', 'óptimo', 'calidad'];
        const negativeWords = ['problema', 'error', 'retraso', 'bloqueo', 'difícil', 'complicado', 'urgente', 'crítico', 'mal', 'fallo', 'atraso', 'incumplido', 'pésimo', 'grave', 'urge'];
        
        let totalPositiveCount = 0, totalNegativeCount = 0;
        const foundPositiveWords = new Set();
        const foundNegativeWords = new Set();
        
        const taskAnalysis = allComments.map(comment => {
            let positiveCount = 0, negativeCount = 0;
            const commentText = comment.text.toLowerCase();
            
            positiveWords.forEach(w => {
                const regex = new RegExp(w, 'gi');
                const matches = commentText.match(regex);
                if (matches) {
                    positiveCount += matches.length;
                    foundPositiveWords.add(w);
                }
            });
            
            negativeWords.forEach(w => {
                const regex = new RegExp(w, 'gi');
                const matches = commentText.match(regex);
                if (matches) {
                    negativeCount += matches.length;
                    foundNegativeWords.add(w);
                }
            });
            
            totalPositiveCount += positiveCount;
            totalNegativeCount += negativeCount;
            
            const total = positiveCount + negativeCount;
            let sentiment = 'neutral';
            if (total > 0) {
                const score = (positiveCount - negativeCount) / total;
                if (score > 0.2) sentiment = 'positivo';
                else if (score < -0.2) sentiment = 'negativo';
            }
            
            return {
                taskName: comment.taskName,
                taskId: comment.taskId,
                status: comment.status,
                comment: comment.text.substring(0, 100),
                positiveCount, negativeCount, sentiment,
                score: total > 0 ? (positiveCount - negativeCount) / total : 0
            };
        });
        
        const total = totalPositiveCount + totalNegativeCount;
        const negativePercent = total > 0 ? Math.round((totalNegativeCount / total) * 100) : 0;
        const positivePercent = total > 0 ? Math.round((totalPositiveCount / total) * 100) : 0;
        
        let label = 'neutral', color = '#888', emoji = '😐', recommendations = '';
        
        if (positivePercent > 60) { label = 'muy positivo'; color = '#10b981'; emoji = '😊✨'; recommendations = '✅ El equipo está motivado. Sigue así.'; }
        else if (positivePercent > 40) { label = 'positivo'; color = '#34d399'; emoji = '😊'; recommendations = '👍 Buen ambiente general.'; }
        else if (negativePercent > 60) { label = 'muy negativo'; color = '#ef4444'; emoji = '😫💔'; recommendations = '🔴 ¡ALERTA! Reúnete urgentemente con el equipo.'; }
        else if (negativePercent > 40) { label = 'negativo'; color = '#f87171'; emoji = '😞'; recommendations = '⚠️ Agenda una retrospectiva para abordar problemas.'; }
        else if (negativePercent > 20) { label = 'levemente negativo'; color = '#fbbf24'; emoji = '😕'; recommendations = '📌 Monitorea las tareas con comentarios negativos.'; }
        else if (positivePercent > 20) { label = 'levemente positivo'; color = '#6ee7b7'; emoji = '🙂'; recommendations = '💪 Buen rumbo. Sigue reforzando lo positivo.'; }
        else { recommendations = '📊 Sentimiento neutral. Fomenta más feedback.'; }
        
        const intensity = Math.min(100, Math.round((total / 30) * 100));
        let sample = 'Sin ejemplo destacado';
        const negativeComments = taskAnalysis.filter(t => t.sentiment === 'negativo');
        if (negativeComments.length > 0) sample = negativeComments[0].comment;
        else if (taskAnalysis.length > 0) sample = taskAnalysis[0].comment;
        
        return { 
            label, intensity, color, emoji, positiveCount: totalPositiveCount, negativeCount: totalNegativeCount,
            totalComments: allComments.length, sample, positiveWords: Array.from(foundPositiveWords),
            negativeWords: Array.from(foundNegativeWords), negativePercent, positivePercent, recommendations,
            taskAnalysis: taskAnalysis.sort((a,b) => Math.abs(b.score) - Math.abs(a.score)).slice(0,5)
        };
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
        if (document.getElementById('quantum-v11-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'quantum-v11-styles';
        styles.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&display=swap');
            
            .quantum-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #0a0c15;
                z-index: 10000000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .quantum-dashboard {
                width: 95vw;
                max-width: 1500px;
                height: 90vh;
                background: #0f111a;
                border: 1px solid #1e2433;
                border-radius: 20px;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            }
            
            .quantum-header {
                background: #0c0e16;
                padding: 16px 28px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #1a1f2e;
                flex-wrap: wrap;
            }
            
            .quantum-logo { display: flex; align-items: center; gap: 12px; }
            
            .quantum-icon {
                width: 44px;
                height: 44px;
                background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 22px;
            }
            
            .quantum-title h1 {
                margin: 0;
                font-size: 16px;
                font-weight: 600;
                letter-spacing: 0.5px;
                color: #ffffff;
            }
            
            .quantum-title p {
                margin: 4px 0 0;
                font-size: 11px;
                color: #94a3b8;
            }
            
            .quantum-badge {
                background: #1a1f2e;
                border: 1px solid #2d3748;
                padding: 4px 12px;
                font-size: 10px;
                font-weight: 500;
                color: #60a5fa;
                border-radius: 6px;
            }
            
            .quantum-close {
                background: #1a1f2e;
                border: 1px solid #2d3748;
                color: #94a3b8;
                width: 34px;
                height: 34px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                transition: all 0.2s ease;
            }
            
            .quantum-close:hover {
                background: #ef4444;
                border-color: #ef4444;
                color: white;
                transform: rotate(90deg);
            }
            
            .quantum-content {
                flex: 1;
                padding: 20px 24px;
                overflow-y: auto;
            }
            
            .quantum-kpi-grid {
                display: grid;
                grid-template-columns: repeat(6, 1fr);
                gap: 12px;
                margin-bottom: 24px;
            }
            
            .quantum-kpi {
                text-align: center;
                padding: 14px 8px;
                background: #0c0e16;
                border: 1px solid #1a1f2e;
                border-radius: 12px;
                transition: all 0.2s ease;
            }
            
            .quantum-kpi:hover {
                border-color: #3b82f6;
                background: #0f111a;
                transform: translateY(-1px);
            }
            
            .quantum-kpi-value {
                font-size: 28px;
                font-weight: 700;
            }
            
            .quantum-kpi-label {
                font-size: 10px;
                font-weight: 500;
                letter-spacing: 0.5px;
                text-transform: uppercase;
                color: #ffffff !important;
                margin-top: 6px;
            }
            
            .quantum-grid-2 {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 16px;
                margin-bottom: 16px;
            }
            
            .quantum-card {
                background: #0c0e16;
                border: 1px solid #1a1f2e;
                border-radius: 12px;
                overflow: hidden;
                transition: border-color 0.2s ease;
                position: relative;
            }
            
            .quantum-card:hover {
                border-color: #2d3748;
            }
            
            .quantum-card-header {
                padding: 12px 16px;
                background: #0a0c14;
                border-bottom: 1px solid #1a1f2e;
                display: flex;
                justify-content: space-between;
                font-size: 11px;
            }
            
            .quantum-card-header span:first-child {
                color: #ffffff !important;
                font-weight: 600;
                letter-spacing: 0.5px;
                text-transform: uppercase;
            }
            
            .quantum-card-header span:last-child {
                color: #60a5fa;
                font-weight: 500;
            }
            
            .quantum-card-body {
                padding: 16px;
            }
            
            .quantum-3d-container {
                height: 280px;
                background: #0a0c14;
                border-radius: 8px;
                overflow: hidden;
                border: 1px solid #1a1f2e;
            }
            
            .quantum-mc-grid {
                display: flex;
                gap: 16px;
                justify-content: space-between;
                margin-bottom: 16px;
            }
            
            .quantum-mc-card {
                flex: 1;
                text-align: center;
                padding: 12px 8px;
                background: #0a0c14;
                border: 1px solid #1a1f2e;
                border-radius: 8px;
            }
            
            .quantum-mc-value {
                font-size: 22px;
                font-weight: 700;
                color: #60a5fa;
            }
            
            .quantum-mc-label {
                font-size: 9px;
                color: #ffffff !important;
                margin-top: 8px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .quantum-progress {
                background: #1a1f2e;
                border-radius: 2px;
                height: 4px;
                overflow: hidden;
            }
            
            .quantum-progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #3b82f6, #1d4ed8);
                border-radius: 2px;
                transition: width 0.5s;
            }
            
            .quantum-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 12px;
            }
            
            .quantum-table th {
                text-align: left;
                padding: 12px 12px;
                color: #5b6e8c;
                font-size: 10px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                border-bottom: 1px solid #1a1f2e;
                background: #0a0c14;
            }
            
            .quantum-table td {
                padding: 12px 12px;
                color: #cbd5e1;
                border-bottom: 1px solid #131722;
            }
            
            .quantum-table tr {
                transition: all 0.15s ease;
            }
            
            .quantum-table tr:hover {
                background: rgba(59, 130, 246, 0.05);
            }
            
            .quantum-matrix {
    font-family: monospace;
    color: #4ade80;              /* ← VERDE MÁS BRILLANTE */
    background: #0a0c14;
    padding: 8px;
    font-size: 7px;
    height: 50px;
    overflow-y: auto;
    border-radius: 6px;
    margin-bottom: 12px;
    opacity: 1;
    border: 1px solid #4ade8030;
    text-shadow: 0 0 5px #4ade80;
}
            
            .sentiment-stats {
                display: flex;
                gap: 12px;
                margin-bottom: 12px;
            }
            
            .sentiment-stat {
                flex: 1;
                text-align: center;
                padding: 10px;
                background: #0a0c14;
                border: 1px solid #1a1f2e;
                border-radius: 8px;
            }
            
            .sentiment-stat div:first-child {
                font-size: 20px;
                font-weight: 700;
            }
            
            .sentiment-stat div:last-child {
                font-size: 8px;
                color: #ffffff !important;
                margin-top: 4px;
            }
            
            .sentiment-word-badge {
                display: inline-block;
                background: #1a1f2e;
                border: 1px solid #2d3748;
                padding: 2px 8px;
                border-radius: 4px;
                margin: 2px;
                font-size: 9px;
            }
            
            .recommendation-box {
                background: #0a0c14;
                border-left: 3px solid #3b82f6;
                padding: 10px;
                margin-top: 12px;
                border-radius: 6px;
                font-size: 10px;
            }
            
            .task-sentiment-item {
                padding: 8px;
                border-bottom: 1px solid #1a1f2e;
                font-size: 10px;
            }
            
            .sentiment-bar-container {
                background: #1a1f2e;
                border-radius: 2px;
                height: 20px;
                overflow: hidden;
                margin: 8px 0;
                display: flex;
            }
            
            .sentiment-bar-positive {
                background: #10b981;
                height: 100%;
                transition: width 0.5s;
            }
            
            .sentiment-bar-negative {
                background: #ef4444;
                height: 100%;
                transition: width 0.5s;
            }
            
            .explanation-beautiful {
                background: #0a0c14;
                border: 1px solid #1e293b;
                padding: 14px;
                margin-top: 16px;
                border-radius: 8px;
                color: #cbd5e1;
                font-size: 11px;
            }
            
            .quantum-voice {
                position: fixed;
                bottom: 24px;
                right: 24px;
                width: 48px;
                height: 48px;
                background: #1a1f2e;
                border: 1px solid #2d3748;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 10000001;
                font-size: 20px;
                transition: all 0.2s ease;
            }
            
            .quantum-voice:hover {
                background: #3b82f6;
                border-color: #3b82f6;
                transform: scale(1.05);
            }
            
            .quantum-content::-webkit-scrollbar {
                width: 4px;
            }
            
            .quantum-content::-webkit-scrollbar-track {
                background: #0a0c14;
            }
            
            .quantum-content::-webkit-scrollbar-thumb {
                background: #2d3748;
                border-radius: 4px;
            }
            
            .quantum-content::-webkit-scrollbar-thumb:hover {
                background: #3b82f6;
            }
        `;
        document.head.appendChild(styles);
    }
    
    async function showQuantumDashboard() {
        console.log('[QUANTUM] Abriendo dashboard v11.7...');
        
        const project = getCurrentProject();
        if (!project) { alert('❌ No hay proyectos disponibles'); return; }
        
        const tasks = project.tasks || [];
        if (tasks.length === 0) { alert(`El proyecto "${project.name}" no tiene tareas`); return; }
        
        tasks.forEach(task => {
            const progresoReal = calcularProgresoReal(task);
            task.progress = progresoReal;
        });
        
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
        const healthScore = Math.max(0, Math.min(100, Math.round(completionRate - (overdue / tasks.length) * 50)));
        
        const monteCarlo = monteCarloSimulation(tasks);
        const sentiment = analyzeSentiment(tasks);
        const tasksWithRisk = tasks.map(t => ({ ...t, risk: calculateRisk(t) }));
        
        const kpiColors = {
            total: '#f1f5f9',
            completed: '#10b981',
            inProgress: '#3b82f6',
            pending: '#8b5cf6',
            overdue: '#ef4444',
            completion: '#f59e0b'
        };
        
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
                        <div class="quantum-kpi"><div class="quantum-kpi-value" style="color:${kpiColors.total};">${tasks.length}</div><div class="quantum-kpi-label">TOTAL</div></div>
                        <div class="quantum-kpi"><div class="quantum-kpi-value" style="color:${kpiColors.completed};">${completed}</div><div class="quantum-kpi-label">COMPLETADAS</div></div>
                        <div class="quantum-kpi"><div class="quantum-kpi-value" style="color:${kpiColors.inProgress};">${inProgress}</div><div class="quantum-kpi-label">EN PROGRESO</div></div>
                        <div class="quantum-kpi"><div class="quantum-kpi-value" style="color:${kpiColors.pending};">${pending}</div><div class="quantum-kpi-label">PENDIENTES</div></div>
                        <div class="quantum-kpi"><div class="quantum-kpi-value" style="color:${kpiColors.overdue};">${overdue}</div><div class="quantum-kpi-label">ATRASADAS</div></div>
                        <div class="quantum-kpi"><div class="quantum-kpi-value" style="color:${kpiColors.completion};">${completionRate}%</div><div class="quantum-kpi-label">COMPLETADO</div></div>
                    </div>
                    
                    <div class="quantum-grid-2">
                        <div class="quantum-card">
                            <div class="quantum-card-header"><span>🌐 HOLOGRAPHIC CUBE</span><span>${completionRate}% completado</span></div>
                            <div class="quantum-card-body"><div id="quantum3dContainer" class="quantum-3d-container"></div></div>
                        </div>
                        <div class="quantum-card">
    <div class="quantum-card-header"><span>🔮 MONTE CARLO SIMULATION</span><span>${monteCarlo.confidence}% confianza</span></div>
    <div class="quantum-card-body" style="padding-top: 24px;">
        <div class="quantum-mc-grid" style="margin-top: 8px;">
            <div class="quantum-mc-card"><div class="quantum-mc-value">${monteCarlo.optimistic}</div><div class="quantum-mc-label">OPTIMISTA</div></div>
            <div class="quantum-mc-card"><div class="quantum-mc-value">${monteCarlo.median}</div><div class="quantum-mc-label">MEDIANO</div></div>
            <div class="quantum-mc-card"><div class="quantum-mc-value">${monteCarlo.pessimistic}</div><div class="quantum-mc-label">PESIMISTA</div></div>
        </div>
        <div style="padding:12px 10px; background:#0a0c14; border-radius:6px; font-family:monospace; font-size:9px; color:#ffffff; border:1px solid #1a1f2e; margin-top: 12px;">
            > 500 iteraciones simuladas<br>
            > Velocidad: ${(completed / Math.max(1,30)).toFixed(2)} tareas/día
        </div>
    </div>
</div>
                    </div>
                    
                    <div class="quantum-card">
                        <div class="quantum-card-header"><span>⚡ EXECUTIVE METRICS</span><span>CPI / SPI</span></div>
                        <div class="quantum-card-body">
                            <div style="display:flex; gap:30px; justify-content:center; margin-bottom:16px;">
                                <div style="text-align:center;">
                                    <div style="font-size:36px; font-weight:700; color:${cpi>=1?'#10b981':'#ef4444'};">${cpi.toFixed(2)}</div>
                                    <div style="font-size:11px; color:#ffffff; margin-top:4px;">Cost Performance Index</div>
                                    <div style="font-size:9px; color:${cpi>=1?'#10b981':'#ef4444'}; margin-top:2px;">${cpi>=1 ? '✅ EFICIENTE' : '⚠️ SOBRE COSTO'}</div>
                                </div>
                                <div style="text-align:center;">
                                    <div style="font-size:36px; font-weight:700; color:${spi>=1?'#10b981':'#ef4444'};">${spi.toFixed(2)}</div>
                                    <div style="font-size:11px; color:#ffffff; margin-top:4px;">Schedule Performance Index</div>
                                    <div style="font-size:9px; color:${spi>=1?'#10b981':'#ef4444'}; margin-top:2px;">${spi>=1 ? '✅ A TIEMPO' : '⚠️ RETRASO'}</div>
                                </div>
                                <div style="text-align:center;">
                                    <div style="font-size:36px; font-weight:700; color:${healthScore>=70?'#10b981':healthScore>=40?'#f59e0b':'#ef4444'};">${healthScore}%</div>
                                    <div style="font-size:11px; color:#ffffff; margin-top:4px;">Health Score</div>
                                    <div style="font-size:9px; color:${healthScore>=70?'#10b981':healthScore>=40?'#f59e0b':'#ef4444'}; margin-top:2px;">${healthScore>=70 ? 'ÓPTIMO' : healthScore>=40 ? 'EN RIESGO' : 'CRÍTICO'}</div>
                                </div>
                            </div>
                            <div class="quantum-progress"><div class="quantum-progress-fill" style="width: ${healthScore}%;"></div></div>
                            
                            <div class="explanation-beautiful">
                                <div style="text-align:center; margin-bottom:12px; color:#60a5fa; font-weight:600; font-size:12px; letter-spacing:1px;">📊 INTERPRETACIÓN DE MÉTRICAS</div>
                                <div style="margin-bottom:10px; padding:8px; background:#0c0e16; border-radius:6px; border-left:3px solid ${cpi>=1?'#10b981':'#ef4444'};">
                                    <strong style="color:#e2e8f0;">CPI = ${cpi.toFixed(2)}</strong>
                                    <div style="color:#94a3b8; font-size:10px; margin-top:4px;">${cpi >= 1 ? '✅ Eficiencia de costos positiva: gastas menos de lo planeado' : '⚠️ Alerta de costos: estás gastando más de lo presupuestado'}</div>
                                </div>
                                <div style="margin-bottom:10px; padding:8px; background:#0c0e16; border-radius:6px; border-left:3px solid ${spi>=1?'#10b981':'#ef4444'};">
                                    <strong style="color:#e2e8f0;">SPI = ${spi.toFixed(2)}</strong>
                                    <div style="color:#94a3b8; font-size:10px; margin-top:4px;">${spi >= 1 ? '✅ Cronograma saludable: vas adelantado o a tiempo' : '⚠️ Retraso en cronograma: necesitas acelerar el ritmo'}</div>
                                </div>
                                <div style="padding:8px; background:#0c0e16; border-radius:6px; border-left:3px solid ${healthScore>=70?'#10b981':healthScore>=40?'#f59e0b':'#ef4444'};">
                                    <strong style="color:#e2e8f0;">HEALTH SCORE = ${healthScore}%</strong>
                                    <div style="color:#94a3b8; font-size:10px; margin-top:4px;">${healthScore >= 70 ? '🟢 Salud excelente' : healthScore >= 40 ? '🟡 Atención requerida' : '🔴 Estado crítico - acción inmediata'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="quantum-grid-2">
                        <div class="quantum-card">
                            <div class="quantum-card-header"><span>💬 SENTIMENT ANALYSIS</span><span style="color:${sentiment.color};">${sentiment.label.toUpperCase()} ${sentiment.emoji}</span></div>
                            <div class="quantum-card-body">
                                <div id="quantumMatrix" class="quantum-matrix">${generateMatrixText()}</div>
                                <div class="sentiment-stats">
                                    <div class="sentiment-stat"><div style="color:#10b981;">${sentiment.positiveCount}</div><div style="color:#ffffff;">POSITIVAS</div></div>
                                    <div class="sentiment-stat"><div style="color:#ef4444;">${sentiment.negativeCount}</div><div style="color:#ffffff;">NEGATIVAS</div></div>
                                    <div class="sentiment-stat"><div style="color:#60a5fa;">${sentiment.totalComments}</div><div style="color:#ffffff;">COMENTARIOS</div></div>
                                </div>
                                <div style="margin-bottom:8px;">
                                    <div class="sentiment-bar-container">
                                        <div class="sentiment-bar-positive" style="width: ${sentiment.positivePercent}%;"></div>
                                        <div class="sentiment-bar-negative" style="width: ${sentiment.negativePercent}%;"></div>
                                    </div>
                                </div>
                                ${sentiment.negativeWords.length > 0 ? `
                                <div style="margin-bottom:8px;">
                                    <div style="font-size:9px; color:#ef4444; margin-bottom:4px;">⚠️ PALABRAS CLAVE NEGATIVAS:</div>
                                    <div style="font-size:8px;">${sentiment.negativeWords.slice(0,5).map(w => `<span class="sentiment-word-badge">${w}</span>`).join('')}</div>
                                </div>
                                ` : ''}
                                <div class="recommendation-box">
                                    <div style="color:#60a5fa; font-weight:600; margin-bottom:4px; font-size:10px;">💡 RECOMENDACIÓN</div>
                                    <div style="font-size:9px; color:#94a3b8;">${sentiment.recommendations}</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="quantum-card">
                            <div class="quantum-card-header"><span>⚠️ CRITICAL RISK MATRIX</span><span>🔴 ${tasksWithRisk.filter(t => t.risk >= 80 && t.status !== 'completed').length} críticos | 🎉 ${tasksWithRisk.filter(t => t.status === 'completed').length} completadas</span></div>
                            <div class="quantum-card-body">
                                <div style="overflow-x:auto; max-height:280px; overflow-y:auto;">
                                    <table class="quantum-table">
                                        <thead>
                                            <tr><th>Tarea</th><th>Asignado</th><th>Progreso</th><th>Estado</th><th>Riesgo</th></tr>
                                        </thead>
                                        <tbody>
                                            ${tasksWithRisk.sort((a,b) => b.risk - a.risk).slice(0,20).map(t => {
                                                const progresoMostrar = calcularProgresoReal(t);
                                                
                                                if (t.status === 'completed') {
                                                    return `<tr style="background: #0a1a0a; border-left: 3px solid #10b981;">
                                                        <td><strong>🎉 ${(t.name || 'Sin nombre').substring(0,30)}</strong> <span style="color:#10b981;">✓ COMPLETADA</span></td>
                                                        <td style="color:#10b981;">${t.assignee || '—'}</td>
                                                        <td><div style="width:70px; background:#1a1f2e; border-radius:4px; height:4px;"><div style="width:100%; height:100%; background:#10b981; border-radius:4px;"></div></div> 100%</div></td>
                                                        <td><span style="background:#10b98120; color:#10b981; padding:2px 8px; border-radius:4px;">✅ COMPLETADA</span></div></td>
                                                        <td><span style="background:#0a2e1a; color:#10b981; padding:4px 10px; border-radius:4px;">✓ 0%</span></div></td>
                                                    </tr>`;
                                                }
                                                
                                                let riskColor = '', riskBg = '', riskDisplay = '';
                                                if (t.risk >= 80) { riskColor = '#ef4444'; riskBg = '#2a0a0a'; riskDisplay = `🔴 ${t.risk}%`; }
                                                else if (t.risk >= 60) { riskColor = '#f97316'; riskBg = '#2a1a0a'; riskDisplay = `🟠 ${t.risk}%`; }
                                                else if (t.risk >= 40) { riskColor = '#f59e0b'; riskBg = '#2a2a0a'; riskDisplay = `🟡 ${t.risk}%`; }
                                                else { riskColor = '#10b981'; riskBg = '#0a2e1a'; riskDisplay = `🟢 ${t.risk}%`; }
                                                
                                                let statusIcon = '', statusText = '', statusColor = '';
                                                if (t.status === 'overdue') { statusIcon = '🔴'; statusText = 'ATRASADA'; statusColor = '#ef4444'; }
                                                else if (t.status === 'inProgress') { statusIcon = '🔄'; statusText = 'EN PROGRESO'; statusColor = '#3b82f6'; }
                                                else { statusIcon = '⏳'; statusText = 'PENDIENTE'; statusColor = '#f59e0b'; }
                                                
                                                let daysLeftText = '';
                                                if (t.deadline && t.status !== 'completed') {
                                                    const deadline = new Date(t.deadline);
                                                    const today = new Date();
                                                    const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
                                                    if (daysLeft < 0) daysLeftText = ` ⚠️ HACE ${Math.abs(daysLeft)} DÍAS`;
                                                    else if (daysLeft === 0) daysLeftText = ` 🔴 VENCE HOY`;
                                                    else if (daysLeft <= 3) daysLeftText = ` 🟡 ${daysLeft} DÍAS`;
                                                    else daysLeftText = ` 🟢 ${daysLeft} DÍAS`;
                                                }
                                                
                                                let progresoColor = riskColor;
                                                if (progresoMostrar >= 80) progresoColor = '#10b981';
                                                else if (progresoMostrar >= 60) progresoColor = '#22c55e';
                                                else if (progresoMostrar >= 40) progresoColor = '#f59e0b';
                                                else if (progresoMostrar >= 20) progresoColor = '#f97316';
                                                else progresoColor = '#ef4444';
                                                
                                                return `<tr style="background: ${riskBg}; border-left: 3px solid ${riskColor};">
                                                    <td><strong style="color:${riskColor};">${statusIcon} ${(t.name || 'Sin nombre').substring(0,30)}${daysLeftText}</strong></td>
                                                    <td style="color:#94a3b8;">${t.assignee || '—'}</td>
                                                    <td><div style="width:70px; background:#1a1f2e; border-radius:4px; height:4px;"><div style="width:${progresoMostrar}%; height:100%; background:${progresoColor}; border-radius:4px;"></div></div> ${progresoMostrar}%</div></td>
                                                    <td><span style="background:${statusColor}20; color:${statusColor}; padding:2px 8px; border-radius:4px;">${statusIcon} ${statusText}</span></div></td>
                                                    <td><span style="background:${riskBg}; color:${riskColor}; padding:4px 10px; border-radius:4px; font-weight:500;">${riskDisplay}</span></div></td>
                                                </tr>`;
                                            }).join('')}
                                        </tbody>
                                    </table>
                                </div>
                                <div style="margin-top:12px; display:flex; gap:16px; justify-content:center; font-size:9px; color:#ffffff; padding:8px; border-top:1px solid #1a1f2e;">
                                    <span>🔴 80-100% → CRÍTICO</span>
                                    <span>🟠 60-79% → ALTO</span>
                                    <span>🟡 40-59% → MEDIO</span>
                                    <span>🟢 0-39% → BAJO</span>
                                </div>
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
        
        document.querySelectorAll('.quantum-table tr').forEach(row => {
            const taskId = row.dataset.taskId;
            if (taskId) {
                row.onclick = () => {
                    const task = tasks.find(t => t.id == taskId);
                    if (task && typeof window.showTaskDetails === 'function') {
                        dashboard.remove();
                        setTimeout(() => window.showTaskDetails(task), 100);
                    }
                };
            }
        });
        
        startMatrixAnimation();
        
        const voiceBtn = document.getElementById('quantumVoiceBtn');
        if (voiceBtn) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                let recognition = null, isListening = false;
                voiceBtn.onclick = () => {
                    if (isListening) {
                        if (recognition) recognition.stop();
                        isListening = false;
                    } else {
                        recognition = new SpeechRecognition();
                        recognition.lang = 'es-ES';
                        recognition.onstart = () => { isListening = true; };
                        recognition.onend = () => { isListening = false; };
                        recognition.onresult = (event) => {
                            const command = event.results[0][0].transcript.toLowerCase();
                            if (command.includes('cerrar')) dashboard.remove();
                            else if (command.includes('estado')) alert(`📊 ${project.name}\n✅ Progreso: ${completionRate}%\n📋 Tareas: ${completed}/${tasks.length}\n⚠️ Riesgo: ${tasksWithRisk.filter(t => t.risk >= 80).length} tareas críticas`);
                            else alert(`🎤 Comando: "${command}"`);
                        };
                        recognition.start();
                    }
                };
            }
        }
    }
    
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
                    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                    border: none;
                    color: white;
                    padding: 14px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    display: block;
                    font-size: 12px;
                    transition: all 0.2s ease;
                    font-family: 'Inter', sans-serif;
                `;
                btn.onmouseenter = () => {
                    btn.style.transform = 'translateY(-2px)';
                    btn.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                };
                btn.onmouseleave = () => {
                    btn.style.transform = 'translateY(0)';
                    btn.style.boxShadow = 'none';
                };
                btn.onclick = () => showQuantumDashboard();
                sidebar.appendChild(btn);
                clearInterval(interval);
            }
        }, 500);
    }
    
    window.showQuantumDashboard = showQuantumDashboard;
    window.QuantumExecutive = { 
        show: showQuantumDashboard, 
        version: '11.7',
        getCurrentProject: getCurrentProject,
        calculateRisk: calculateRisk,
        calcularProgresoReal: calcularProgresoReal
    };
    
    function init() {
        createSidebarButton();
        console.log('✅ CENTRO DE CONTROL PM v11.7 - TODOS LOS TEXTOS EN BLANCO');
        console.log('   • KPIs de Sentiment Analysis: etiquetas BLANCO');
        console.log('   • Executive Metrics: Cost Performance Index, Schedule Performance Index, Health Score → BLANCO');
        console.log('   • Critical Risk Matrix: leyenda BLANCO');
        console.log('   • Diseño ejecutivo premium completo');
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();