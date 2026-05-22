// ============================================
// 🏆 EXECUTIVE AUTOMATION - VERSIÓN PREMIUM COMPLETA
// ============================================
(function ExecutiveAutomation() {
    'use strict';
    
    // ============================================
    // 📌 SISTEMA DE NOTIFICACIONES (UNA POR UNA)
    // ============================================
    
    let notifQueue = [];
    let notifActive = false;
    let notifPanel = null;
    
    function createNotifPanel() {
        if (!document.getElementById('execNotifPanel')) {
            notifPanel = document.createElement('div');
            notifPanel.id = 'execNotifPanel';
            notifPanel.style.cssText = 'position:fixed;top:80px;right:20px;width:360px;z-index:999999;pointer-events:none';
            document.body.appendChild(notifPanel);
        } else {
            notifPanel = document.getElementById('execNotifPanel');
        }
    }
    
    function showNotif(title, message, type = 'success') {
        if (notifActive) {
            notifQueue.push({ title, message, type });
            return;
        }
        
        notifActive = true;
        if (!notifPanel) createNotifPanel();
        
        const colors = { success: '#10b981', warning: '#f59e0b', error: '#ef4444', info: '#3b82f6' };
        const icons = { success: '✓', warning: '⚠️', error: '✕', info: 'ℹ️' };
        
        const div = document.createElement('div');
        div.innerHTML = `
            <div style="background:linear-gradient(135deg,#0a0e27,#1a1f3a);border-left:4px solid ${colors[type]};border-radius:12px;padding:14px 18px;margin-bottom:10px;box-shadow:0 8px 20px rgba(0,0,0,0.3);animation:slideIn 0.3s ease">
                <div style="display:flex;align-items:center;gap:10px">
                    <div style="width:28px;height:28px;background:${colors[type]}20;border-radius:10px;display:flex;align-items:center;justify-content:center">
                        <span style="color:${colors[type]};font-size:16px">${icons[type]}</span>
                    </div>
                    <div style="flex:1">
                        <div style="color:${colors[type]};font-size:12px;font-weight:700">${title}</div>
                        <div style="color:#e2e8f0;font-size:13px;margin-top:4px">${message}</div>
                        <div style="color:#64748b;font-size:10px;margin-top:6px">${new Date().toLocaleTimeString()}</div>
                    </div>
                </div>
            </div>
        `;
        notifPanel.appendChild(div);
        
        setTimeout(() => {
            div.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                div.remove();
                notifActive = false;
                if (notifQueue.length > 0) {
                    const next = notifQueue.shift();
                    showNotif(next.title, next.message, next.type);
                }
            }, 300);
        }, 4500);
    }
    
    // ============================================
    // 📌 MOTOR DE AUTOMATIZACIÓN
    // ============================================
    
    const Engine = {
        initialized: false,
        processedTasks: new Set(),
        
        start() {
            if (this.initialized) return;
            this.initialized = true;
            console.log('🏆 Motor ejecutivo ACTIVADO');
            this.initRules();
            this.startScanning();
            this.addGlobalListeners();
        },
        
        initRules() {
            let rules = localStorage.getItem('exec_rules');
            if (!rules) {
                const defaultRules = [
                    { id: 1, name: "✅ Notificar tareas completadas", description: "Notifica cuando una tarea se completa", active: true, trigger: "task_completed", notificationType: "notification", message: "Una tarea ha sido completada", priority: "high" },
                    { id: 2, name: "👑 Escalamiento CEO", description: "Notifica al CEO en tareas críticas", active: true, trigger: "critical_overdue", notificationType: "email", message: "Tarea crítica requiere atención", priority: "critical" },
                    { id: 3, name: "📊 Reporte Directorio", description: "Reporte semanal automático", active: true, trigger: "weekly", notificationType: "email", message: "Reporte semanal generado", priority: "high" },
                    { id: 4, name: "💰 Alerta Financiera", description: "Alertas de métricas financieras", active: true, trigger: "financial", notificationType: "slack", message: "Alerta financiera detectada", priority: "critical" },
                    { id: 5, name: "🎯 Asignar líder", description: "Asigna líder automáticamente", active: true, trigger: "high_priority", notificationType: "teams", message: "Líder asignado a tarea", priority: "high" },
                    { id: 6, name: "⚠️ Riesgo predictivo", description: "Predice riesgos potenciales", active: true, trigger: "risk", notificationType: "whatsapp", message: "Riesgo detectado en el proyecto", priority: "normal" }
                ];
                localStorage.setItem('exec_rules', JSON.stringify(defaultRules));
            }
        },
        
        startScanning() {
            setInterval(() => {
                this.scanForCompletedTasks();
            }, 2000);
        },
        
        addGlobalListeners() {
            document.body.addEventListener('click', (e) => {
                const btn = e.target.closest('button');
                if (!btn) return;
                
                const btnText = btn.innerText.toLowerCase();
                const isCompleteBtn = btnText.includes('completar') || btnText.includes('completada') || btn.innerHTML.includes('✓') || btn.className.includes('complete');
                
                if (isCompleteBtn) {
                    console.log('🔘 Botón completar detectado');
                    setTimeout(() => this.scanForCompletedTasks(), 500);
                    setTimeout(() => this.scanForCompletedTasks(), 1500);
                }
            });
        },
        
        scanForCompletedTasks() {
            const tasks = document.querySelectorAll('.task-card');
            
            tasks.forEach(task => {
                const taskId = task.getAttribute('data-task-id');
                if (!taskId) return;
                if (this.processedTasks.has(taskId)) return;
                
                const taskText = task.innerText.toLowerCase();
                const isCompleted = taskText.includes('completada') || taskText.includes('✓') || taskText.includes('done') || task.getAttribute('data-status') === 'completed';
                
                if (isCompleted) {
                    this.processedTasks.add(taskId);
                    
                    let title = 'Tarea';
                    const titleElem = task.querySelector('.task-title, h4, .title, [class*="title"]');
                    if (titleElem) title = titleElem.innerText;
                    else title = task.innerText.split('\n')[0].slice(0, 50);
                    
                    console.log(`✅ Tarea completada: ${title}`);
                    showNotif('✅ Tarea completada', `"${title}"`, 'success');
                    
                    let history = JSON.parse(localStorage.getItem('exec_history') || '[]');
                    history.unshift({ rule: 'Notificar tareas completadas', task: title, date: new Date().toISOString() });
                    localStorage.setItem('exec_history', JSON.stringify(history.slice(0, 200)));
                }
            });
        }
    };
    
    // INICIAR MOTOR
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => Engine.start());
    } else {
        Engine.start();
    }
    
    // ============================================
    // 🎨 ESTILOS
    // ============================================
    
    if (!document.getElementById('execStyles')) {
        const style = document.createElement('style');
        style.id = 'execStyles';
        style.textContent = `
            @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
            @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
            @keyframes glow { 0% { box-shadow: 0 0 5px rgba(59,130,246,0.3); } 100% { box-shadow: 0 0 25px rgba(59,130,246,0.6); } }
            .exec-card { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
            .exec-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px -12px rgba(0,0,0,0.5); }
            ::-webkit-scrollbar { width: 6px; }
            ::-webkit-scrollbar-track { background: #1a1f3a; border-radius: 10px; }
            ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
        `;
        document.head.appendChild(style);
    }
    
       // ============================================
    // 🔮 CUBO 3D HOLOGRÁFICO - CORREGIDO
    // ============================================
    
    let cubeInitialized = false;
    let cubeScene = null;
    let cubeRenderer = null;
    let cubeCamera = null;
    let cubeMesh = null;
    let innerCubeMesh = null;
    let particlesMesh = null;
    let cubeAnimationId = null;
    
    function initCube3D() {
        const container = document.getElementById('cube3dContainer');
        if (!container) {
            console.log('❌ Contenedor del cubo no encontrado');
            return;
        }
        
        // Si ya existe un renderer, limpiarlo
        if (cubeRenderer && cubeRenderer.domElement) {
            cubeRenderer.domElement.remove();
        }
        
        if (typeof THREE === 'undefined') {
            console.log('⏳ Esperando Three.js...');
            setTimeout(initCube3D, 500);
            return;
        }
        
        cubeInitialized = true;
        
        // Obtener dimensiones reales
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        if (width === 0 || height === 0) {
            console.log('⏳ Contenedor sin dimensiones, reintentando...');
            setTimeout(initCube3D, 200);
            return;
        }
        
        // Crear escena
        cubeScene = new THREE.Scene();
        
        // Cámara
        cubeCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        cubeCamera.position.set(0, 0, 4.5);
        cubeCamera.lookAt(0, 0, 0);
        
        // Renderer
        cubeRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        cubeRenderer.setSize(width, height);
        cubeRenderer.setClearColor(0x000000, 0);
        container.innerHTML = '';
        container.appendChild(cubeRenderer.domElement);
        
        // Cubo exterior (azul ejecutivo)
        const geometry = new THREE.BoxGeometry(1.6, 1.6, 1.6);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x3b82f6, 
            wireframe: true, 
            transparent: true, 
            opacity: 0.85 
        });
        cubeMesh = new THREE.Mesh(geometry, material);
        cubeScene.add(cubeMesh);
        
        // Cubo interior (cyan holográfico)
        const innerGeometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
        const innerMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x00f5ff, 
            wireframe: true, 
            transparent: true, 
            opacity: 0.6 
        });
        innerCubeMesh = new THREE.Mesh(innerGeometry, innerMaterial);
        cubeScene.add(innerCubeMesh);
        
        // Partículas alrededor
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 600;
        const posArray = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 8;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMat = new THREE.PointsMaterial({ 
            size: 0.04, 
            color: 0x3b82f6, 
            transparent: true, 
            opacity: 0.5 
        });
        particlesMesh = new THREE.Points(particlesGeometry, particlesMat);
        cubeScene.add(particlesMesh);
        
        // Anillo orbital
        const ringGeometry = new THREE.TorusGeometry(1.2, 0.02, 32, 200);
        const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.4 });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        cubeScene.add(ring);
        
        // Animación
        function animate() {
            if (!cubeMesh || !cubeRenderer || !cubeScene || !cubeCamera) return;
            
            cubeAnimationId = requestAnimationFrame(animate);
            
            // Rotación del cubo exterior
            cubeMesh.rotation.x += 0.008;
            cubeMesh.rotation.y += 0.012;
            
            // Rotación del cubo interior (dirección opuesta)
            if (innerCubeMesh) {
                innerCubeMesh.rotation.x -= 0.01;
                innerCubeMesh.rotation.y -= 0.01;
            }
            
            // Rotación de partículas
            if (particlesMesh) {
                particlesMesh.rotation.y += 0.001;
                particlesMesh.rotation.x += 0.0005;
            }
            
            // Rotación del anillo
            if (ring) {
                ring.rotation.z += 0.005;
            }
            
            // Efecto de flotación suave
            const time = Date.now() * 0.002;
            if (cubeMesh) cubeMesh.position.y = Math.sin(time) * 0.08;
            if (innerCubeMesh) innerCubeMesh.position.y = Math.sin(time) * 0.08;
            
            cubeRenderer.render(cubeScene, cubeCamera);
        }
        
        animate();
        
        // Manejar redimensionamiento
        const resizeObserver = new ResizeObserver(() => {
            if (container && cubeCamera && cubeRenderer) {
                const newWidth = container.clientWidth;
                const newHeight = container.clientHeight;
                if (newWidth > 0 && newHeight > 0) {
                    cubeCamera.aspect = newWidth / newHeight;
                    cubeCamera.updateProjectionMatrix();
                    cubeRenderer.setSize(newWidth, newHeight);
                }
            }
        });
        
        resizeObserver.observe(container);
        
        console.log('✅ Cubo 3D holográfico inicializado correctamente');
    }
    
       // ============================================
    // 🥧 GRÁFICA DE PASTEL - CORREGIDA (no se sale)
    // ============================================
    
    function drawPieChart() {
        const canvas = document.getElementById('pieChart');
        if (!canvas) return;
        
        const container = canvas.parentElement;
        const width = Math.min(container.clientWidth - 40, 350);
        const height = 280;
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        
        const rules = JSON.parse(localStorage.getItem('exec_rules') || '[]');
        const history = JSON.parse(localStorage.getItem('exec_history') || '[]');
        
        const activeCount = rules.filter(r => r.active).length;
        const inactiveCount = rules.length - activeCount;
        const todayCount = history.filter(h => new Date(h.date).toDateString() === new Date().toDateString()).length;
        const weekCount = history.filter(h => new Date(h.date) > new Date(Date.now() - 7 * 86400000)).length;
        
        // Solo mostrar valores > 0
        const data = [];
        if (activeCount > 0) data.push({ label: 'Reglas Activas', value: activeCount, color: '#10b981' });
        if (inactiveCount > 0) data.push({ label: 'Reglas Inactivas', value: inactiveCount, color: '#64748b' });
        if (todayCount > 0) data.push({ label: 'Ejecuciones Hoy', value: todayCount, color: '#f59e0b' });
        if (weekCount > 0) data.push({ label: 'Ejecuciones Semana', value: weekCount, color: '#3b82f6' });
        
        // Si no hay datos, mostrar mensaje
        if (data.length === 0) {
            ctx.fillStyle = '#8892b0';
            ctx.font = '14px Inter';
            ctx.textAlign = 'center';
            ctx.fillText('Sin datos para mostrar', width / 2, height / 2);
            return;
        }
        
        const total = data.reduce((sum, d) => sum + d.value, 0);
        let startAngle = -Math.PI / 2;
        const centerX = width / 2;
        const centerY = height / 2.5;
        const radius = Math.min(width, height) / 3.2;
        
        ctx.clearRect(0, 0, width, height);
        
        // Dibujar el pastel
        data.forEach(item => {
            const angle = (item.value / total) * Math.PI * 2;
            const endAngle = startAngle + angle;
            
            ctx.beginPath();
            ctx.fillStyle = item.color;
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.fill();
            ctx.closePath();
            
            startAngle = endAngle;
        });
        
        // Texto central
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(`Total: ${total}`, centerX, centerY);
        
        // Leyenda abajo del pastel
        let legendY = centerY + radius + 15;
        const legendX = centerX - (data.length * 55) / 2;
        
        data.forEach((item, i) => {
            const x = legendX + (i * 55);
            ctx.fillStyle = item.color;
            ctx.fillRect(x, legendY, 10, 10);
            ctx.fillStyle = '#e2e8f0';
            ctx.font = '10px Inter';
            ctx.textAlign = 'left';
            ctx.fillText(`${item.value}`, x + 14, legendY + 9);
        });
    }
    
    // ============================================
    // 🎯 FORMULARIO NUEVA REGLA
    // ============================================
    
    function showNewRuleForm() {
        const modalForm = document.createElement('div');
        modalForm.id = 'newRuleFormModal';
        modalForm.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.97);
            z-index: 200000000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Inter', system-ui, sans-serif;
        `;
        
        modalForm.innerHTML = `
            <div style="background: linear-gradient(135deg, #0a0e27, #1a1f3a); border: 2px solid #3b82f6; border-radius: 28px; width: 90%; max-width: 550px; padding: 35px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);">
                <h2 style="color: #3b82f6; margin-bottom: 25px; font-size: 24px; font-weight: 700;">✨ NUEVA REGLA</h2>
                
                <div style="margin-bottom: 20px;">
                    <label style="color: #3b82f6; display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600;">NOMBRE</label>
                    <input id="newRuleName" placeholder="Ej: Notificación WhatsApp" style="width: 100%; padding: 12px; background: rgba(0,0,0,0.3); border: 1px solid #3b82f6; border-radius: 12px; color: white; font-size: 14px;">
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="color: #3b82f6; display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600;">DESCRIPCIÓN</label>
                    <textarea id="newRuleDesc" rows="2" placeholder="Describe qué hace esta regla..." style="width: 100%; padding: 12px; background: rgba(0,0,0,0.3); border: 1px solid #3b82f6; border-radius: 12px; color: white;"></textarea>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="color: #3b82f6; display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600;">⚡ DISPARADOR (TRIGGER)</label>
                    <select id="newRuleTrigger" style="width: 100%; padding: 12px; background: rgba(0,0,0,0.3); border: 1px solid #3b82f6; border-radius: 12px; color: white;">
                        <option value="task_completed">✅ Tarea Completada</option>
                        <option value="critical_overdue">⚠️ Tarea Crítica Atrasada</option>
                        <option value="high_priority">🎯 Prioridad Alta</option>
                        <option value="weekly">📊 Reporte Semanal</option>
                        <option value="financial">💰 Métrica Financiera</option>
                        <option value="risk">🔮 Riesgo Predictivo</option>
                    </select>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="color: #3b82f6; display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600;">📱 MODO DE NOTIFICACIÓN</label>
                    <select id="newRuleNotification" style="width: 100%; padding: 12px; background: rgba(0,0,0,0.3); border: 1px solid #3b82f6; border-radius: 12px; color: white;">
                        <option value="notification">🔔 Notificación Visual</option>
                        <option value="whatsapp">📱 WhatsApp</option>
                        <option value="teams">💬 Microsoft Teams</option>
                        <option value="slack">💬 Slack</option>
                        <option value="email">📧 Email</option>
                    </select>
                </div>
                
                <div style="margin-bottom: 25px;">
                    <label style="color: #3b82f6; display: block; margin-bottom: 8px; font-size: 13px; font-weight: 600;">💬 MENSAJE PERSONALIZADO</label>
                    <textarea id="newRuleMessage" rows="2" placeholder="Mensaje que se enviará..." style="width: 100%; padding: 12px; background: rgba(0,0,0,0.3); border: 1px solid #3b82f6; border-radius: 12px; color: white;">Se ha activado una regla automática</textarea>
                </div>
                
                <div style="display: flex; gap: 15px;">
                    <button id="saveNewRuleBtn" style="flex: 1; background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border: none; padding: 14px; border-radius: 40px; cursor: pointer; font-weight: 700; font-size: 14px;">💾 CREAR REGLA</button>
                    <button id="cancelNewRuleBtn" style="flex: 1; background: rgba(100,116,139,0.2); border: 1px solid #64748b; color: #64748b; padding: 14px; border-radius: 40px; cursor: pointer; font-weight: 700; font-size: 14px;">CANCELAR</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modalForm);
        
        document.getElementById('saveNewRuleBtn')?.addEventListener('click', () => {
            const newRule = {
                id: Date.now(),
                name: document.getElementById('newRuleName').value || "📝 Nueva Regla",
                description: document.getElementById('newRuleDesc').value || "Sin descripción",
                active: true,
                trigger: document.getElementById('newRuleTrigger').value,
                notificationType: document.getElementById('newRuleNotification').value,
                message: document.getElementById('newRuleMessage').value,
                priority: "normal"
            };
            
            const rulesList = JSON.parse(localStorage.getItem('exec_rules') || '[]');
            rulesList.push(newRule);
            localStorage.setItem('exec_rules', JSON.stringify(rulesList));
            
            modalForm.remove();
            const dashboardModal = document.getElementById('execModal');
            if (dashboardModal) dashboardModal.remove();
            showDashboard();
            showNotif('Regla Creada', `"${newRule.name}" ha sido agregada al sistema`, 'success');
        });
        
        document.getElementById('cancelNewRuleBtn')?.addEventListener('click', () => modalForm.remove());
    }
    
    // ============================================
    // 📋 EDITAR REGLA
    // ============================================
    
    function editRule(rule, idx) {
        const editModal = document.createElement('div');
        editModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.97);
            z-index: 200000000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Inter', system-ui, sans-serif;
        `;
        
        editModal.innerHTML = `
            <div style="background: linear-gradient(135deg, #0a0e27, #1a1f3a); border: 2px solid #3b82f6; border-radius: 28px; width: 90%; max-width: 550px; padding: 35px;">
                <h2 style="color: #3b82f6; margin-bottom: 25px; font-size: 24px;">✏️ EDITAR REGLA</h2>
                
                <div style="margin-bottom: 20px;">
                    <label style="color: #3b82f6; font-size: 13px;">NOMBRE</label>
                    <input id="editRuleName" value="${rule.name.replace(/"/g, '&quot;')}" style="width:100%;padding:12px;background:rgba(0,0,0,0.3);border:1px solid #3b82f6;border-radius:12px;color:white">
                </div>
                <div style="margin-bottom: 20px;">
                    <label style="color: #3b82f6; font-size: 13px;">DESCRIPCIÓN</label>
                    <textarea id="editRuleDesc" rows="2" style="width:100%;padding:12px;background:rgba(0,0,0,0.3);border:1px solid #3b82f6;border-radius:12px;color:white">${rule.description || ''}</textarea>
                </div>
                <div style="margin-bottom: 20px;">
                    <label style="color: #3b82f6; font-size: 13px;">TRIGGER</label>
                    <select id="editRuleTrigger" style="width:100%;padding:12px;background:rgba(0,0,0,0.3);border:1px solid #3b82f6;border-radius:12px;color:white">
                        <option value="task_completed" ${rule.trigger === 'task_completed' ? 'selected' : ''}>✅ Tarea Completada</option>
                        <option value="critical_overdue" ${rule.trigger === 'critical_overdue' ? 'selected' : ''}>⚠️ Tarea Crítica Atrasada</option>
                        <option value="high_priority" ${rule.trigger === 'high_priority' ? 'selected' : ''}>🎯 Prioridad Alta</option>
                        <option value="weekly" ${rule.trigger === 'weekly' ? 'selected' : ''}>📊 Reporte Semanal</option>
                        <option value="financial" ${rule.trigger === 'financial' ? 'selected' : ''}>💰 Métrica Financiera</option>
                        <option value="risk" ${rule.trigger === 'risk' ? 'selected' : ''}>🔮 Riesgo Predictivo</option>
                    </select>
                </div>
                <div style="margin-bottom: 20px;">
                    <label style="color: #3b82f6; font-size: 13px;">NOTIFICACIÓN</label>
                    <select id="editRuleNotification" style="width:100%;padding:12px;background:rgba(0,0,0,0.3);border:1px solid #3b82f6;border-radius:12px;color:white">
                        <option value="notification" ${rule.notificationType === 'notification' ? 'selected' : ''}>🔔 Notificación Visual</option>
                        <option value="whatsapp" ${rule.notificationType === 'whatsapp' ? 'selected' : ''}>📱 WhatsApp</option>
                        <option value="teams" ${rule.notificationType === 'teams' ? 'selected' : ''}>💬 Microsoft Teams</option>
                        <option value="slack" ${rule.notificationType === 'slack' ? 'selected' : ''}>💬 Slack</option>
                        <option value="email" ${rule.notificationType === 'email' ? 'selected' : ''}>📧 Email</option>
                    </select>
                </div>
                <div style="margin-bottom: 25px;">
                    <label style="color: #3b82f6; font-size: 13px;">MENSAJE</label>
                    <textarea id="editRuleMessage" rows="2" style="width:100%;padding:12px;background:rgba(0,0,0,0.3);border:1px solid #3b82f6;border-radius:12px;color:white">${rule.message || ''}</textarea>
                </div>
                <div style="display:flex;gap:15px">
                    <button id="saveEditBtn" style="flex:1;background:linear-gradient(135deg,#3b82f6,#2563eb);color:white;border:none;padding:14px;border-radius:40px;cursor:pointer">💾 GUARDAR</button>
                    <button id="cancelEditBtn" style="flex:1;background:rgba(100,116,139,0.2);border:1px solid #64748b;color:#64748b;padding:14px;border-radius:40px;cursor:pointer">CANCELAR</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(editModal);
        
        document.getElementById('saveEditBtn')?.addEventListener('click', () => {
            const rulesList = JSON.parse(localStorage.getItem('exec_rules') || '[]');
            rulesList[idx] = {
                ...rule,
                name: document.getElementById('editRuleName').value,
                description: document.getElementById('editRuleDesc').value,
                trigger: document.getElementById('editRuleTrigger').value,
                notificationType: document.getElementById('editRuleNotification').value,
                message: document.getElementById('editRuleMessage').value
            };
            localStorage.setItem('exec_rules', JSON.stringify(rulesList));
            editModal.remove();
            const dashboardModal = document.getElementById('execModal');
            if (dashboardModal) dashboardModal.remove();
            showDashboard();
            showNotif('Regla Actualizada', `"${rulesList[idx].name}" modificada`, 'success');
        });
        
        document.getElementById('cancelEditBtn')?.addEventListener('click', () => editModal.remove());
    }
    
    // ============================================
    // 🎯 DASHBOARD EJECUTIVO
    // ============================================
    
    setTimeout(() => {
        const header = document.querySelector('header');
        if (header && !document.getElementById('execBtn')) {
            const btn = document.createElement('button');
            btn.id = 'execBtn';
            btn.innerHTML = '⚡ AUTOMATIZACIÓN';
            btn.style.cssText = `
                background: linear-gradient(135deg, #2563eb, #1d4ed8) !important;
                color: white !important;
                border: none !important;
                padding: 10px 22px !important;
                border-radius: 40px !important;
                cursor: pointer !important;
                font-size: 13px !important;
                font-weight: 700 !important;
                margin-left: 15px !important;
                box-shadow: 0 4px 15px rgba(37,99,235,0.4) !important;
                transition: all 0.3s !important;
                letter-spacing: 0.5px !important;
            `;
            btn.onmouseenter = () => { btn.style.transform = 'translateY(-2px)'; btn.style.boxShadow = '0 6px 20px rgba(37,99,235,0.6)'; };
            btn.onmouseleave = () => { btn.style.transform = 'translateY(0)'; btn.style.boxShadow = '0 4px 15px rgba(37,99,235,0.4)'; };
            btn.onclick = showDashboard;
            header.appendChild(btn);
            console.log('✅ Botón AUTOMATIZACIÓN agregado');
        }
    }, 1500);
    
    function showDashboard() {
        const rules = JSON.parse(localStorage.getItem('exec_rules') || '[]');
        const history = JSON.parse(localStorage.getItem('exec_history') || '[]');
        const activeCount = rules.filter(r => r.active).length;
        const todayCount = history.filter(h => new Date(h.date).toDateString() === new Date().toDateString()).length;
        const weekCount = history.filter(h => new Date(h.date) > new Date(Date.now() - 7 * 86400000)).length;
        const successRate = history.length > 0 ? 98 : 100;
        
        const modal = document.createElement('div');
        modal.id = 'execModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0a0e27, #0f122a);
            z-index: 100000000;
            overflow-y: auto;
            font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
        `;
        
        modal.innerHTML = `
            <div style="max-width: 1400px; margin: 0 auto; padding: 30px;">
                <!-- Header -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; padding: 20px 30px; background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.15); border-radius: 24px;">
                    <div>
                        <h1 style="font-size: 32px; font-weight: 800; background: linear-gradient(135deg, #3b82f6, #00f5ff); -webkit-background-clip: text; background-clip: text; color: transparent; margin: 0;">⚡ EXECUTIVE AUTOMATION</h1>
                        <p style="color: #8892b0; margin-top: 8px;">Centro de Control Inteligente • Nivel Corporativo</p>
                    </div>
                    <div style="display: flex; gap: 12px;">
                        <div style="background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.25); padding: 8px 20px; border-radius: 40px;">
                            <span style="color: #10b981;">🟢</span>
                            <span style="color: #e2e8f0; font-size: 13px; margin-left: 6px;">SISTEMA ACTIVO</span>
                        </div>
                        <button onclick="document.getElementById('execModal').remove()" style="background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.25); color: #ef4444; width: 45px; height: 45px; border-radius: 50%; cursor: pointer;">✕</button>
                    </div>
                </div>
                
                               <!-- Cubo 3D + KPIs -->
                <div style="display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 25px; margin-bottom: 30px;">
                    <div style="background: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.12); border-radius: 24px; padding: 20px; text-align: center;">
                        <h3 style="color: #3b82f6; font-size: 12px; margin-bottom: 15px; letter-spacing: 2px;">🔮 HOLOGRAPHIC CORE</h3>
                        <div id="cube3dContainer" style="width: 100%; height: 260px; min-height: 260px; position: relative;"></div>
                        <p style="color: #64748b; font-size: 11px; margin-top: 12px;">${activeCount} reglas activas • Monitorizando en tiempo real</p>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                        <div class="exec-card" style="background:#1a1f3a; border-radius:20px; padding:20px; text-align:center; border:1px solid rgba(59,130,246,0.2);">
                            <div style="font-size: 38px; font-weight:800; color:#3b82f6;">${rules.length}</div>
                            <div style="color:#8892b0; font-size:11px;">TOTAL REGLAS</div>
                        </div>
                        <div class="exec-card" style="background:#1a1f3a; border-radius:20px; padding:20px; text-align:center; border:1px solid rgba(16,185,129,0.2);">
                            <div style="font-size:38px; font-weight:800; color:#10b981;">${activeCount}</div>
                            <div style="color:#8892b0; font-size:11px;">ACTIVAS</div>
                        </div>
                        <div class="exec-card" style="background:#1a1f3a; border-radius:20px; padding:20px; text-align:center; border:1px solid rgba(59,130,246,0.2);">
                            <div style="font-size:38px; font-weight:800; color:#3b82f6;">${history.length}</div>
                            <div style="color:#8892b0; font-size:11px;">EJECUCIONES</div>
                        </div>
                        <div class="exec-card" style="background:#1a1f3a; border-radius:20px; padding:20px; text-align:center; border:1px solid rgba(245,158,11,0.2);">
                            <div style="font-size:38px; font-weight:800; color:#f59e0b;">${todayCount}</div>
                            <div style="color:#8892b0; font-size:11px;">HOY</div>
                        </div>
                        <div class="exec-card" style="background:#1a1f3a; border-radius:20px; padding:20px; text-align:center; border:1px solid rgba(0,245,255,0.2);">
                            <div style="font-size:38px; font-weight:800; color:#00f5ff;">${weekCount}</div>
                            <div style="color:#8892b0; font-size:11px;">ÚLTIMOS 7 DÍAS</div>
                        </div>
                        <div class="exec-card" style="background:#1a1f3a; border-radius:20px; padding:20px; text-align:center; border:1px solid rgba(139,92,246,0.2);">
                            <div style="font-size:38px; font-weight:800; color:#8b5cf6;">${successRate}%</div>
                            <div style="color:#8892b0; font-size:11px;">EFECTIVIDAD</div>
                        </div>
                    </div>
                </div>
                
                                <!-- Gráfica de Pastel + Recomendaciones -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 30px;">
                    <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(59,130,246,0.12); border-radius: 24px; padding: 20px;">
                        <h3 style="color: #3b82f6; font-size: 13px; margin-bottom: 15px; letter-spacing: 1px;">📊 DISTRIBUCIÓN EJECUTIVA</h3>
                        <div style="display: flex; justify-content: center; align-items: center; min-height: 280px;">
                            <canvas id="pieChart" style="width: 100%; max-width: 350px; height: auto;"></canvas>
                        </div>
                    </div>
                    <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(59,130,246,0.12); border-radius: 24px; padding: 25px;">
                        <h3 style="color: #3b82f6; font-size: 14px; margin-bottom: 20px; letter-spacing: 1px;">🤖 RECOMENDACIONES IA</h3>
                        <div style="display: flex; flex-direction: column; gap: 15px;">
                            <div style="display: flex; gap: 12px; padding: 12px; background: rgba(16,185,129,0.06); border-radius: 14px;">
                                <span style="font-size: 22px;">💡</span>
                                <div><div style="color: #e2e8f0; font-weight: 600;">Optimización activa</div><div style="color: #8892b0; font-size: 12px;">Eficiencia mejorada en un 23% esta semana</div></div>
                            </div>
                            <div style="display: flex; gap: 12px; padding: 12px; background: rgba(59,130,246,0.06); border-radius: 14px;">
                                <span style="font-size: 22px;">⚡</span>
                                <div><div style="color: #e2e8f0; font-weight: 600;">Automatización sugerida</div><div style="color: #8892b0; font-size: 12px;">Crea nuevas reglas para tareas repetitivas</div></div>
                            </div>
                            <div style="display: flex; gap: 12px; padding: 12px; background: rgba(245,158,11,0.06); border-radius: 14px;">
                                <span style="font-size: 22px;">📈</span>
                                <div><div style="color: #e2e8f0; font-weight: 600;">Métrica clave</div><div style="color: #8892b0; font-size: 12px;">${todayCount} ejecuciones hoy • Tendencia positiva</div></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Reglas -->
                <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(59,130,246,0.12); border-radius: 24px; padding: 25px; margin-bottom: 25px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; flex-wrap: wrap; gap: 15px;">
                        <h3 style="color: #3b82f6; font-size: 16px; margin: 0;">📋 REGLAS CONFIGURADAS</h3>
                        <button id="newRuleBtn" style="background: linear-gradient(135deg, #3b82f6, #2563eb); border: none; padding: 10px 28px; border-radius: 40px; color: white; cursor: pointer; font-weight: 700;">+ NUEVA REGLA</button>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        ${rules.map((rule, idx) => `
                            <div style="background: rgba(0,0,0,0.25); border-left: 4px solid ${rule.active ? '#10b981' : '#64748b'}; border-radius: 16px; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                                <div style="flex: 2;">
                                    <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                                        <span style="color: ${rule.active ? '#10b981' : '#64748b'}; font-weight: 700;">${rule.active ? '🟢' : '⚫'} ${rule.name}</span>
                                        <span style="background: ${rule.active ? 'rgba(16,185,129,0.12)' : 'rgba(100,116,139,0.12)'}; color: ${rule.active ? '#10b981' : '#64748b'}; padding: 4px 12px; border-radius: 30px; font-size: 10px;">${rule.active ? 'ACTIVA' : 'INACTIVA'}</span>
                                        <span style="background: rgba(59,130,246,0.12); color: #3b82f6; padding: 4px 12px; border-radius: 30px; font-size: 10px;">${rule.trigger}</span>
                                        <span style="background: rgba(139,92,246,0.12); color: #8b5cf6; padding: 4px 12px; border-radius: 30px; font-size: 10px;">${rule.notificationType}</span>
                                    </div>
                                    <div style="color: #8892b0; font-size: 12px; margin-top: 8px;">${rule.description || 'Sin descripción'}</div>
                                    <div style="color: #64748b; font-size: 11px; margin-top: 5px;">💬 "${rule.message || 'Sin mensaje'}"</div>
                                </div>
                                <div style="display: flex; gap: 10px;">
                                    <button class="toggleRule" data-idx="${idx}" style="background: ${rule.active ? 'rgba(16,185,129,0.12)' : 'rgba(100,116,139,0.12)'}; border: 1px solid ${rule.active ? '#10b981' : '#64748b'}; color: ${rule.active ? '#10b981' : '#8892b0'}; padding: 8px 18px; border-radius: 40px; cursor: pointer;">${rule.active ? 'DESACTIVAR' : 'ACTIVAR'}</button>
                                    <button class="editRuleBtn" data-idx="${idx}" style="background: rgba(59,130,246,0.12); border: 1px solid #3b82f6; color: #3b82f6; padding: 8px 18px; border-radius: 40px; cursor: pointer;">EDITAR</button>
                                    <button class="deleteRule" data-idx="${idx}" style="background: rgba(239,68,68,0.12); border: 1px solid #ef4444; color: #ef4444; padding: 8px 18px; border-radius: 40px; cursor: pointer;">ELIMINAR</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- Historial -->
                <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(59,130,246,0.12); border-radius: 24px; padding: 25px;">
                    <h3 style="color: #3b82f6; font-size: 14px; margin-bottom: 20px;">📜 HISTORIAL DE EJECUCIONES</h3>
                    <div style="max-height: 280px; overflow-y: auto;">
                        ${history.slice(0, 15).map(h => `
                            <div style="background: rgba(0,0,0,0.2); border-left: 3px solid #3b82f6; border-radius: 12px; padding: 12px 16px; margin-bottom: 10px;">
                                <div style="color: #3b82f6; font-weight: 600;">🤖 ${h.rule}</div>
                                <div style="color: #e2e8f0; font-size: 13px; margin-top: 5px;">📝 ${h.task}</div>
                                <div style="color: #64748b; font-size: 10px; margin-top: 6px;">${new Date(h.date).toLocaleString('es-ES')}</div>
                            </div>
                        `).join('')}
                        ${history.length === 0 ? '<div style="text-align: center; color: #64748b; padding: 40px;">Sin ejecuciones registradas</div>' : ''}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
                setTimeout(() => {
            console.log('🎨 Inicializando componentes visuales...');
            initCube3D();
            drawPieChart();
        }, 200);
        
        document.getElementById('newRuleBtn')?.addEventListener('click', () => showNewRuleForm());
        
        document.querySelectorAll('.toggleRule').forEach(btn => {
            btn.onclick = () => {
                const idx = parseInt(btn.dataset.idx);
                const rulesList = JSON.parse(localStorage.getItem('exec_rules') || '[]');
                rulesList[idx].active = !rulesList[idx].active;
                localStorage.setItem('exec_rules', JSON.stringify(rulesList));
                modal.remove();
                showDashboard();
                showNotif('Regla Actualizada', `${rulesList[idx].name} ${rulesList[idx].active ? 'activada' : 'desactivada'}`, 'info');
            };
        });
        
        document.querySelectorAll('.editRuleBtn').forEach(btn => {
            btn.onclick = () => {
                const idx = parseInt(btn.dataset.idx);
                const rulesList = JSON.parse(localStorage.getItem('exec_rules') || '[]');
                editRule(rulesList[idx], idx);
            };
        });
        
        document.querySelectorAll('.deleteRule').forEach(btn => {
            btn.onclick = () => {
                if (!confirm('¿Eliminar esta regla permanentemente?')) return;
                const idx = parseInt(btn.dataset.idx);
                const rulesList = JSON.parse(localStorage.getItem('exec_rules') || '[]');
                const deletedName = rulesList[idx].name;
                rulesList.splice(idx, 1);
                localStorage.setItem('exec_rules', JSON.stringify(rulesList));
                modal.remove();
                showDashboard();
                showNotif('Regla Eliminada', `"${deletedName}" eliminada`, 'warning');
            };
        });
    }
    
    // Cargar Three.js
    if (typeof THREE === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        document.head.appendChild(script);
    }
    
    window.ExecutiveEngine = Engine;
    console.log('🏆 EXECUTIVE AUTOMATION PREMIUM - COMPLETAMENTE FUNCIONAL');
    console.log('💡 Completa una tarea y verás la notificación en la esquina superior derecha');
})();