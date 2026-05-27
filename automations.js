// ============================================
// 🤖 SISTEMA DE AUTOMATIZACIÓN PREMIUM - VERSIÓN COMPLETA
// ============================================
(function() {
    'use strict';
    
    // ============================================
    // DATOS
    // ============================================
    let automationRules = JSON.parse(localStorage.getItem('automationRules_premium') || '[]');
    let executionHistory = JSON.parse(localStorage.getItem('automationHistory_premium') || '[]');
    
    if (automationRules.length === 0) {
        automationRules = [
            { id: 1, name: "✅ Tarea Completada", trigger: "task_completed", action: "notification", message: "La tarea {{task}} ha sido completada", active: true, icon: "✅", color: "#10b981", executions: 0 },
            { id: 2, name: "👑 Escalamiento CEO", trigger: "critical_overdue", action: "notification", message: "⚠️ Tarea crítica atrasada: {{task}}", active: true, icon: "👑", color: "#ef4444", executions: 0 },
            { id: 3, name: "🎯 Alta Prioridad", trigger: "high_priority", action: "notification", message: "🎯 Tarea de alta prioridad: {{task}}", active: true, icon: "🎯", color: "#8b5cf6", executions: 0 },
            { id: 4, name: "⚠️ Riesgo Detectado", trigger: "risk", action: "notification", message: "⚠️ Riesgo detectado: {{description}}", active: true, icon: "⚠️", color: "#f97316", executions: 0 }
        ];
        localStorage.setItem('automationRules_premium', JSON.stringify(automationRules));
    }
    
    // ============================================
    // FUNCIONES BASE
    // ============================================
    function saveData() {
        localStorage.setItem('automationRules_premium', JSON.stringify(automationRules));
        localStorage.setItem('automationHistory_premium', JSON.stringify(executionHistory));
    }
    
    function addToHistory(ruleName, detail, icon = '⚙️') {
        executionHistory.unshift({
            id: Date.now(),
            rule: ruleName,
            detail: detail,
            icon: icon,
            date: new Date().toLocaleString(),
            timestamp: Date.now()
        });
        if (executionHistory.length > 100) executionHistory.pop();
        saveData();
        mostrarNotificacion(ruleName, detail, icon);
    }
    
    function createRule(data) {
        const newRule = { id: Date.now(), ...data, active: true, executions: 0 };
        automationRules.push(newRule);
        saveData();
        addToHistory("📝 Regla Creada", `Se creó la regla: ${data.name}`, "✨");
        return newRule;
    }
    
    function deleteRule(id) {
        const rule = automationRules.find(r => r.id === id);
        automationRules = automationRules.filter(r => r.id !== id);
        saveData();
        addToHistory("🗑️ Regla Eliminada", `Se eliminó: ${rule?.name || 'Desconocida'}`, "🗑️");
    }
    
    function toggleRule(id) {
        const rule = automationRules.find(r => r.id === id);
        if (rule) {
            rule.active = !rule.active;
            saveData();
            addToHistory("🔄 Regla Actualizada", `${rule.name} → ${rule.active ? 'Activada' : 'Desactivada'}`, "🔄");
        }
    }
    
    // ============================================
    // NOTIFICACIONES SUPERIOR DERECHA
    // ============================================
    let colaNotificaciones = [];
    let notificacionActiva = false;
    
    function mostrarNotificacion(ruleName, detail, icon) {
        colaNotificaciones.push({ ruleName, detail, icon });
        if (notificacionActiva) return;
        
        function procesar() {
            if (colaNotificaciones.length === 0) { notificacionActiva = false; return; }
            notificacionActiva = true;
            const n = colaNotificaciones.shift();
            
            let container = document.getElementById('autoNotifContainer');
            if (!container) {
                container = document.createElement('div');
                container.id = 'autoNotifContainer';
                container.style.cssText = 'position:fixed;top:70px;right:20px;z-index:10000001;display:flex;flex-direction:column;gap:10px;max-width:360px;';
                document.body.appendChild(container);
            }
            
            const div = document.createElement('div');
            div.style.cssText = 'background:linear-gradient(135deg,#1e293b,#0f172a);border-left:4px solid #3b82f6;border-radius:12px;padding:12px 16px;color:white;box-shadow:0 10px 25px rgba(0,0,0,0.3);animation:slideDownAuto 0.3s ease;margin-bottom:10px;';
            div.innerHTML = `
                <div style="display:flex;align-items:center;gap:12px;">
                    <div style="font-size:24px;">${n.icon || '⚙️'}</div>
                    <div style="flex:1;">
                        <div style="font-weight:bold;color:#3b82f6;font-size:13px;">${n.ruleName}</div>
                        <div style="font-size:12px;color:#94a3b8;">${n.detail}</div>
                        <div style="font-size:10px;color:#64748b;margin-top:4px;">${new Date().toLocaleTimeString()}</div>
                    </div>
                    <button class="closeNotif" style="background:none;border:none;color:#64748b;cursor:pointer;">✕</button>
                </div>
            `;
            div.querySelector('.closeNotif').onclick = () => { div.remove(); procesar(); };
            container.appendChild(div);
            setTimeout(() => { if(div.parentNode) div.remove(); procesar(); }, 4500);
            setTimeout(procesar, 500);
        }
        procesar();
    }
    
    // ============================================
    // MOTOR DE AUTOMATIZACIÓN
    // ============================================
    let estadoAnterior = new Map();
    let notificadas = new Set();
    
    function detectarCambios() {
        const tareas = document.querySelectorAll('.task-card, [class*="task-card"], [draggable="true"]');
        tareas.forEach(tarea => {
            let id = tarea.getAttribute('data-task-id');
            if (!id) {
                const title = tarea.querySelector('.task-title, h4');
                id = title ? title.innerText : tarea.innerText.slice(0, 50);
            }
            
            let estado = 'pending';
            const txt = tarea.innerText.toLowerCase();
            if (txt.includes('completada') || txt.includes('✅')) estado = 'completed';
            else if (txt.includes('progreso')) estado = 'inProgress';
            else if (txt.includes('atrasada')) estado = 'overdue';
            
            const anterior = estadoAnterior.get(id);
            if (anterior && anterior !== 'completed' && estado === 'completed') {
                const key = `comp_${id}_${Date.now()}`;
                if (!notificadas.has(key)) {
                    notificadas.add(key);
                    const rule = automationRules.find(r => r.trigger === 'task_completed' && r.active);
                    if (rule) {
                        let nombre = id;
                        const nameEl = tarea.querySelector('.task-title, h4');
                        if (nameEl) nombre = nameEl.innerText;
                        addToHistory(rule.name, rule.message.replace('{{task}}', nombre), rule.icon);
                        rule.executions = (rule.executions || 0) + 1;
                        saveData();
                    }
                    setTimeout(() => notificadas.delete(key), 5000);
                }
            }
            estadoAnterior.set(id, estado);
        });
    }
    
    function cargarEstadoInicial() {
        document.querySelectorAll('.task-card').forEach(t => {
            let id = t.getAttribute('data-task-id');
            if (!id) { const h = t.querySelector('.task-title, h4'); if(h) id = h.innerText; }
            let estado = 'pending';
            if (t.innerText.toLowerCase().includes('completada')) estado = 'completed';
            estadoAnterior.set(id, estado);
        });
    }
    
    setTimeout(cargarEstadoInicial, 2000);
    setInterval(detectarCambios, 1000);
    new MutationObserver(detectarCambios).observe(document.body, { childList: true, subtree: true, attributes: true });
    
    // ============================================
    // ESFERA 3D
    // ============================================
    function loadThreeJS() {
        return new Promise((resolve) => {
            if (window.THREE) { resolve(); return; }
            const s = document.createElement('script');
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
            s.onload = resolve;
            document.head.appendChild(s);
        });
    }
    
    function create3DSphere(container) {
        if (!window.THREE || !container) return;
        const w = 280, h = 280;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, w/h, 0.1, 1000);
        camera.position.z = 3;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(w, h);
        renderer.setClearColor(0x000000, 0);
        container.innerHTML = '';
        container.appendChild(renderer.domElement);
        
        const geometry = new THREE.SphereGeometry(0.9, 64, 64);
        const material = new THREE.MeshStandardMaterial({ color: 0x3b82f6, emissive: 0x1e3a8a, roughness: 0.3, metalness: 0.7, emissiveIntensity: 0.5 });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        
        const rings = [
            { color: 0xef4444, radius: 1.3, speed: 0.01 },
            { color: 0x10b981, radius: 1.4, speed: -0.008 },
            { color: 0xf59e0b, radius: 1.5, speed: 0.012 },
            { color: 0x8b5cf6, radius: 1.45, speed: -0.01 },
            { color: 0x06b6d4, radius: 1.55, speed: 0.009 },
            { color: 0xec4899, radius: 1.6, speed: -0.011 }
        ];
        const ringMeshes = [];
        rings.forEach(r => {
            const torus = new THREE.Mesh(new THREE.TorusGeometry(r.radius, 0.05, 64, 200), new THREE.MeshStandardMaterial({ color: r.color, emissive: r.color, emissiveIntensity: 0.3 }));
            scene.add(torus);
            ringMeshes.push({ mesh: torus, speed: r.speed });
        });
        
        const particleCount = 300;
        const particleGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const radius = 1.8;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            positions[i*3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i*3+1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i*3+2] = radius * Math.cos(phi);
        }
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particles = new THREE.Points(particleGeo, new THREE.PointsMaterial({ color: 0x8b5cf6, size: 0.03 }));
        scene.add(particles);
        
        const ambient = new THREE.AmbientLight(0x404060);
        scene.add(ambient);
        const light1 = new THREE.PointLight(0x3b82f6, 1);
        light1.position.set(2, 2, 2);
        scene.add(light1);
        const light2 = new THREE.PointLight(0x8b5cf6, 0.8);
        light2.position.set(-2, 1, 3);
        scene.add(light2);
        
        let time = 0;
        function animate() {
            requestAnimationFrame(animate);
            time += 0.01;
            sphere.rotation.y = time * 0.2;
            sphere.rotation.x = time * 0.1;
            ringMeshes.forEach(r => { r.mesh.rotation.x += r.speed; r.mesh.rotation.y += r.speed * 0.8; });
            particles.rotation.y = time * 0.05;
            camera.position.x = Math.sin(time * 0.2) * 0.2;
            camera.position.y = Math.cos(time * 0.3) * 0.15;
            camera.lookAt(0, 0, 0);
            renderer.render(scene, camera);
        }
        animate();
    }
    
    // ============================================
    // MODAL PRINCIPAL
    // ============================================
    window.openAutomationCenter = async function() {
        const existing = document.getElementById('automationPremiumModal');
        if (existing) existing.remove();
        
        await loadThreeJS();
        
        const modal = document.createElement('div');
        modal.id = 'automationPremiumModal';
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);backdrop-filter:blur(15px);z-index:10000000;display:flex;align-items:center;justify-content:center;';
        
        modal.innerHTML = `
            <div style="background:linear-gradient(135deg,#0f172a,#1e293b);border-radius:32px;width:1300px;max-width:95vw;height:85vh;display:flex;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.5);border:1px solid rgba(59,130,246,0.3);">
                <div style="width:320px;background:linear-gradient(180deg,#0f172a,#1e293b);border-right:1px solid rgba(59,130,246,0.2);padding:25px;display:flex;flex-direction:column;">
                    <div id="sphereContainer" style="width:280px;height:280px;margin:0 auto 20px;border-radius:50%;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.5);"></div>
                    <div style="margin-top:10px;">
                        <h3 style="color:#94a3b8;font-size:12px;margin-bottom:15px;text-transform:uppercase;letter-spacing:2px;">📊 KPIs</h3>
                        <div style="background:rgba(59,130,246,0.1);border-radius:16px;padding:15px;margin-bottom:12px;">
                            <div style="display:flex;justify-content:space-between;">
                                <span style="color:#94a3b8;font-size:12px;">Reglas Activas</span>
                                <span id="kpiActiveRules" style="color:#10b981;font-size:28px;font-weight:700;">${automationRules.filter(r => r.active).length}</span>
                            </div>
                        </div>
                        <div style="background:rgba(16,185,129,0.1);border-radius:16px;padding:15px;margin-bottom:12px;">
                            <div style="display:flex;justify-content:space-between;">
                                <span style="color:#94a3b8;font-size:12px;">Ejecuciones</span>
                                <span id="kpiTotalExecutions" style="color:#f59e0b;font-size:28px;font-weight:700;">${executionHistory.length}</span>
                            </div>
                        </div>
                        <div style="background:rgba(139,92,246,0.1);border-radius:16px;padding:15px;">
                            <div style="display:flex;justify-content:space-between;">
                                <span style="color:#94a3b8;font-size:12px;">Ahorro Estimado</span>
                                <span style="color:#10b981;font-size:28px;font-weight:700;">${executionHistory.length * 15}h</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;">
                    <div style="padding:20px 25px;border-bottom:1px solid rgba(59,130,246,0.2);display:flex;justify-content:space-between;align-items:center;">
                        <div>
                            <h2 style="margin:0;color:white;font-size:22px;">Centro de Automatización Premium</h2>
                            <p style="margin:4px 0 0 0;color:#94a3b8;">Gestiona reglas y monitorea ejecuciones</p>
                        </div>
                        <button id="closePremiumModal" style="background:rgba(239,68,68,0.2);border:1px solid #ef4444;color:#ef4444;width:38px;height:38px;border-radius:50%;cursor:pointer;">✕</button>
                    </div>
                    <div style="display:flex;gap:5px;padding:0 25px;border-bottom:1px solid rgba(59,130,246,0.1);">
                        <button class="premium-tab active" data-tab="rules" style="background:none;border:none;padding:12px 24px;color:white;cursor:pointer;font-weight:500;border-bottom:2px solid #3b82f6;">📋 Reglas</button>
                        <button class="premium-tab" data-tab="create" style="background:none;border:none;padding:12px 24px;color:#94a3b8;cursor:pointer;">✨ Crear Regla</button>
                        <button class="premium-tab" data-tab="history" style="background:none;border:none;padding:12px 24px;color:#94a3b8;cursor:pointer;">📜 Historial</button>
                        <button class="premium-tab" data-tab="triggers" style="background:none;border:none;padding:12px 24px;color:#94a3b8;cursor:pointer;">🔌 Triggers</button>
                    </div>
                    <div id="premiumTabContent" style="flex:1;overflow-y:auto;padding:25px;"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        setTimeout(() => {
            const container = document.getElementById('sphereContainer');
            if (container) create3DSphere(container);
        }, 100);
        
        // TRIGGERS
        const TRIGGERS = [
            { value: "task_completed", label: "✅ Tarea Completada", desc: "Cuando se completa una tarea", color: "#10b981" },
            { value: "critical_overdue", label: "👑 Crítica Atrasada", desc: "Tarea crítica atrasada", color: "#ef4444" },
            { value: "high_priority", label: "🎯 Alta Prioridad", desc: "Tarea de alta prioridad", color: "#8b5cf6" },
            { value: "risk", label: "⚠️ Riesgo", desc: "Palabras de riesgo detectadas", color: "#f97316" }
        ];
        
        const ACTIONS = [
            { value: "notification", label: "🔔 Notificación", desc: "Notificación en pantalla" }
        ];
        
        function renderRules() {
            const container = document.getElementById('premiumTabContent');
            const activas = automationRules.filter(r => r.active);
            const inactivas = automationRules.filter(r => !r.active);
            container.innerHTML = `
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;">
                    <div><h3 style="color:white;margin:0;">Reglas Configuradas</h3><p style="color:#94a3b8;margin:4px 0 0;">${automationRules.length} reglas (${activas.length} activas)</p></div>
                    <button id="createRuleBtn" style="background:linear-gradient(135deg,#3b82f6,#8b5cf6);border:none;color:white;padding:10px 24px;border-radius:40px;cursor:pointer;">+ Nueva Regla</button>
                </div>
                ${activas.map(r => `
                    <div style="background:linear-gradient(135deg,rgba(30,41,59,0.8),rgba(15,23,42,0.8));border-radius:16px;padding:18px;margin-bottom:12px;border-left:4px solid ${r.color};">
                        <div style="display:flex;justify-content:space-between;align-items:center;">
                            <div style="display:flex;gap:15px;flex:1;">
                                <div style="font-size:36px;">${r.icon}</div>
                                <div>
                                    <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
                                        <h4 style="color:white;margin:0;">${r.name}</h4>
                                        <span style="background:${r.color}20;color:${r.color};padding:2px 10px;border-radius:20px;font-size:11px;">${r.trigger}</span>
                                        <span style="background:#1e293b;color:#64748b;padding:2px 8px;border-radius:20px;font-size:10px;">${r.executions || 0} ejecuciones</span>
                                    </div>
                                    <p style="color:#94a3b8;margin:8px 0 0;font-size:13px;">${r.message}</p>
                                </div>
                            </div>
                            <div style="display:flex;gap:12px;">
                                <label style="position:relative;display:inline-block;width:50px;height:26px;">
                                    <input type="checkbox" class="toggleRule" data-id="${r.id}" ${r.active ? 'checked' : ''} style="opacity:0;width:0;height:0;">
                                    <span style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:${r.active ? r.color : '#334155'};border-radius:34px;"></span>
                                    <span style="position:absolute;height:20px;width:20px;left:3px;bottom:3px;background-color:white;border-radius:50%;transition:0.3s;transform:${r.active ? 'translateX(24px)' : 'none'};"></span>
                                </label>
                                <button class="deleteRule" data-id="${r.id}" style="background:rgba(239,68,68,0.2);border:none;color:#ef4444;width:32px;height:32px;border-radius:8px;cursor:pointer;">🗑️</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
                ${inactivas.map(r => `
                    <div style="background:rgba(30,41,59,0.3);border-radius:16px;padding:18px;margin-bottom:12px;border-left:4px solid #475569;opacity:0.7;">
                        <div style="display:flex;justify-content:space-between;align-items:center;">
                            <div style="display:flex;gap:15px;flex:1;">
                                <div style="font-size:36px;opacity:0.5;">${r.icon}</div>
                                <div>
                                    <h4 style="color:#94a3b8;margin:0;">${r.name}</h4>
                                    <p style="color:#64748b;margin:8px 0 0;font-size:13px;">${r.message}</p>
                                </div>
                            </div>
                            <div style="display:flex;gap:12px;">
                                <label style="position:relative;display:inline-block;width:50px;height:26px;">
                                    <input type="checkbox" class="toggleRule" data-id="${r.id}" ${r.active ? 'checked' : ''} style="opacity:0;width:0;height:0;">
                                    <span style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#334155;border-radius:34px;"></span>
                                    <span style="position:absolute;height:20px;width:20px;left:3px;bottom:3px;background-color:white;border-radius:50%;"></span>
                                </label>
                                <button class="deleteRule" data-id="${r.id}" style="background:rgba(239,68,68,0.2);border:none;color:#ef4444;width:32px;height:32px;border-radius:8px;cursor:pointer;">🗑️</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            `;
            document.querySelectorAll('.toggleRule').forEach(t => t.onclick = (e) => { toggleRule(parseInt(t.dataset.id)); renderRules(); updateKPIs(); });
            document.querySelectorAll('.deleteRule').forEach(b => b.onclick = (e) => { if(confirm('¿Eliminar?')){ deleteRule(parseInt(b.dataset.id)); renderRules(); updateKPIs(); } });
            document.getElementById('createRuleBtn').onclick = () => document.querySelector('[data-tab="create"]').click();
        }
        
        function renderCreate() {
            const container = document.getElementById('premiumTabContent');
            container.innerHTML = `
                <div style="max-width:600px;margin:0 auto;">
                    <div style="text-align:center;margin-bottom:25px;">
                        <div style="font-size:48px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);width:80px;height:80px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 15px;">✨</div>
                        <h3 style="color:white;margin:0;">Crear Nueva Regla</h3>
                    </div>
                    <div style="background:rgba(0,0,0,0.3);border-radius:24px;padding:25px;">
                        <div style="margin-bottom:15px;">
                            <label style="color:#e2e8f0;margin-bottom:5px;display:block;">📝 Nombre</label>
                            <input type="text" id="newRuleName" style="width:100%;background:#1e293b;border:1px solid #334155;border-radius:12px;padding:12px;color:white;">
                        </div>
                        <div style="margin-bottom:15px;">
                            <label style="color:#e2e8f0;margin-bottom:5px;display:block;">⚡ Trigger</label>
                            <select id="newRuleTrigger" style="width:100%;background:#1e293b;border:1px solid #334155;border-radius:12px;padding:12px;color:white;">
                                <option value="">Seleccionar...</option>
                                ${TRIGGERS.map(t => `<option value="${t.value}">${t.label} - ${t.desc}</option>`).join('')}
                            </select>
                        </div>
                        <div style="margin-bottom:15px;">
                            <label style="color:#e2e8f0;margin-bottom:5px;display:block;">💬 Mensaje</label>
                            <textarea id="newRuleMessage" rows="3" style="width:100%;background:#1e293b;border:1px solid #334155;border-radius:12px;padding:12px;color:white;" placeholder="Variables: {{task}}, {{description}}"></textarea>
                        </div>
                        <div style="display:flex;gap:15px;margin-bottom:15px;">
                            <div style="flex:1;">
                                <label style="color:#e2e8f0;margin-bottom:5px;display:block;">🎨 Icono</label>
                                <input type="text" id="newRuleIcon" value="⚙️" style="width:100%;background:#1e293b;border:1px solid #334155;border-radius:12px;padding:10px;text-align:center;font-size:24px;">
                            </div>
                            <div style="flex:1;">
                                <label style="color:#e2e8f0;margin-bottom:5px;display:block;">🎨 Color</label>
                                <input type="color" id="newRuleColor" value="#3b82f6" style="width:100%;height:48px;border-radius:12px;">
                            </div>
                        </div>
                        <div style="display:flex;gap:15px;">
                            <button id="saveRuleBtn" style="flex:1;background:linear-gradient(135deg,#10b981,#059669);border:none;color:white;padding:14px;border-radius:12px;cursor:pointer;">✅ Guardar</button>
                            <button id="cancelCreateBtn" style="flex:1;background:#334155;border:none;color:white;padding:14px;border-radius:12px;cursor:pointer;">Cancelar</button>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('saveRuleBtn').onclick = () => {
                const name = document.getElementById('newRuleName').value.trim();
                const trigger = document.getElementById('newRuleTrigger').value;
                const message = document.getElementById('newRuleMessage').value.trim();
                const icon = document.getElementById('newRuleIcon').value.trim() || '⚙️';
                const color = document.getElementById('newRuleColor').value;
                if(!name || !trigger || !message) { alert('Completa todos los campos'); return; }
                createRule({ name, trigger, action: 'notification', message, icon, color });
                renderRules();
                updateKPIs();
                document.querySelector('[data-tab="rules"]').click();
            };
            document.getElementById('cancelCreateBtn').onclick = () => document.querySelector('[data-tab="rules"]').click();
        }
        
        function renderHistory() {
            const container = document.getElementById('premiumTabContent');
            const history = executionHistory.slice(0, 30);
            container.innerHTML = `
                <div style="display:flex;justify-content:space-between;margin-bottom:20px;">
                    <div><h3 style="color:white;margin:0;">📜 Historial</h3><p style="color:#94a3b8;margin:4px 0 0;">${history.length} eventos</p></div>
                    <button id="clearHistoryBtn" style="background:rgba(239,68,68,0.2);border:1px solid #ef4444;color:#ef4444;padding:8px 20px;border-radius:8px;cursor:pointer;">Limpiar</button>
                </div>
                ${history.length === 0 ? '<div style="text-align:center;padding:40px;color:#94a3b8;">📭 No hay eventos</div>' : 
                    history.map(h => `
                        <div style="background:rgba(30,41,59,0.5);border-radius:12px;padding:14px;margin-bottom:10px;border-left:3px solid #3b82f6;">
                            <div style="display:flex;justify-content:space-between;align-items:center;">
                                <div style="display:flex;align-items:center;gap:12px;">
                                    <span style="font-size:24px;">${h.icon || '⚙️'}</span>
                                    <div><div style="color:white;font-weight:500;">${h.rule}</div><div style="color:#94a3b8;font-size:12px;">${h.detail}</div></div>
                                </div>
                                <div style="color:#64748b;font-size:11px;">${h.date}</div>
                            </div>
                        </div>
                    `).join('')}
            `;
            document.getElementById('clearHistoryBtn')?.addEventListener('click', () => { if(confirm('¿Limpiar historial?')){ executionHistory = []; saveData(); renderHistory(); updateKPIs(); } });
        }
        
        function renderTriggers() {
            const container = document.getElementById('premiumTabContent');
            container.innerHTML = `
                <div><h3 style="color:white;margin:0 0 15px;">🔌 Triggers Disponibles</h3>
                ${TRIGGERS.map(t => `
                    <div style="background:rgba(30,41,59,0.5);border-radius:14px;padding:16px;margin-bottom:12px;border-left:4px solid ${t.color};display:flex;align-items:center;gap:15px;">
                        <div style="font-size:32px;">${t.label.split(' ')[0]}</div>
                        <div style="flex:1;"><h4 style="color:white;margin:0;">${t.label}</h4><p style="color:#94a3b8;margin:5px 0 0;">${t.desc}</p></div>
                        <button class="useTrigger" data-trigger="${t.value}" style="background:${t.color}20;border:1px solid ${t.color};color:${t.color};padding:8px 20px;border-radius:40px;cursor:pointer;">Usar →</button>
                    </div>
                `).join('')}</div>
            `;
            document.querySelectorAll('.useTrigger').forEach(btn => btn.onclick = () => {
                document.querySelector('[data-tab="create"]').click();
                setTimeout(() => { const s = document.getElementById('newRuleTrigger'); if(s) s.value = btn.dataset.trigger; }, 100);
            });
        }
        
        function updateKPIs() {
            const kpi = document.getElementById('kpiActiveRules');
            const kpiEx = document.getElementById('kpiTotalExecutions');
            if(kpi) kpi.textContent = automationRules.filter(r => r.active).length;
            if(kpiEx) kpiEx.textContent = executionHistory.length;
        }
        
        document.querySelectorAll('.premium-tab').forEach(tab => {
            tab.onclick = () => {
                document.querySelectorAll('.premium-tab').forEach(t => { t.classList.remove('active'); t.style.color = '#94a3b8'; t.style.borderBottom = 'none'; });
                tab.classList.add('active'); tab.style.color = 'white'; tab.style.borderBottom = '2px solid #3b82f6';
                const t = tab.dataset.tab;
                if(t === 'rules') renderRules();
                else if(t === 'create') renderCreate();
                else if(t === 'history') renderHistory();
                else if(t === 'triggers') renderTriggers();
            };
        });
        
        document.getElementById('closePremiumModal').onclick = () => modal.remove();
        modal.onclick = (e) => { if(e.target === modal) modal.remove(); };
        
        renderRules();
        updateKPIs();
    };
    
    // ============================================
    // BOTÓN AZUL EN EL HEADER
    // ============================================
    function agregarBoton() {
        const interval = setInterval(() => {
            const header = document.querySelector('header, .header, #mainHeader');
            if (header) {
                clearInterval(interval);
                if (document.getElementById('autoBlueFinal')) return;
                const btn = document.createElement('button');
                btn.id = 'autoBlueFinal';
                btn.innerHTML = '⚙️ Automatización';
                btn.style.cssText = 'background:#3b82f6!important;border:none!important;color:white!important;padding:8px 18px!important;border-radius:8px!important;cursor:pointer!important;font-weight:600!important;font-size:14px!important;margin-left:12px!important;display:inline-flex!important;align-items:center!important;gap:8px!important;';
                btn.onmouseenter = () => btn.style.background = '#2563eb';
                btn.onmouseleave = () => btn.style.background = '#3b82f6';
                btn.onclick = () => window.openAutomationCenter();
                header.appendChild(btn);
                console.log('✅ Botón azul agregado');
            }
        }, 500);
    }
    
    // Estilos de animación
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `@keyframes slideDownAuto{from{opacity:0;transform:translateX(50px);}to{opacity:1;transform:translateX(0);}}@keyframes slideUpAuto{from{opacity:1;transform:translateX(0);}to{opacity:0;transform:translateX(50px);}}`;
    document.head.appendChild(styleSheet);
    
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', agregarBoton);
    else agregarBoton();
    
    addToHistory('🚀 Sistema Iniciado', 'Motor de automatización activo', '⚙️');
    console.log('✅ SISTEMA COMPLETO - Botón azul + Modal elegante + Motor funcionando');
})();





// ============================================
// 🔵 FORZAR BOTÓN AZUL - VERSIÓN EXTREMA
// ============================================
(function forzarBotonAzulExtremo() {
    // Crear un intervalo que se ejecuta cada 200ms
    const intervalo = setInterval(function() {
        // Buscar el botón por cualquier selector posible
        const btn = document.getElementById('autoBlueFinal') || 
                    document.querySelector('button[id*="autoBlue"]') ||
                    document.querySelector('button:contains("Automatización")') ||
                    Array.from(document.querySelectorAll('button')).find(b => 
                        b.textContent.includes('Automatización') || 
                        b.innerHTML.includes('⚙️')
                    );
        
        if (btn) {
            // Aplicar estilos de forma agresiva
            btn.style.cssText = `
                background: #2563eb !important;
                background-color: #2563eb !important;
                border: none !important;
                color: white !important;
                padding: 8px 18px !important;
                border-radius: 8px !important;
                cursor: pointer !important;
                font-weight: 600 !important;
                font-size: 14px !important;
                margin-left: 12px !important;
                display: inline-flex !important;
                align-items: center !important;
                gap: 8px !important;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2) !important;
            `;
            
            // Forzar con setAttribute
            btn.setAttribute('style', `
                background: #2563eb !important;
                background-color: #2563eb !important;
                border: none !important;
                color: white !important;
                padding: 8px 18px !important;
                border-radius: 8px !important;
                cursor: pointer !important;
                font-weight: 600 !important;
                font-size: 14px !important;
                margin-left: 12px !important;
                display: inline-flex !important;
                align-items: center !important;
                gap: 8px !important;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2) !important;
            `);
        }
    }, 200);
    
    console.log('✅ Forzado extremo de botón azul activado');
})();











