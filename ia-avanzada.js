// ============================================
// 🎯 CENTRO DE CONTROL PM - v12.2 - DEFINITIVO FUNCIONAL
// ============================================

(function() {
    'use strict';

    // ============================================================
    // 1. SISTEMA DE TRADUCCIÓN (COMPLETO)
    // ============================================================
    const translations = {
        es: {
            tituloDashboard: 'CENTRO DE CONTROL PM',
            subtituloDashboard: 'Panel ejecutivo de control de proyectos',
            badge3d: '⚡ 3D ACTIVE',
            cerrar: '✕',
            kpi_total: 'TOTAL',
            kpi_completadas: 'COMPLETADAS',
            kpi_enProgreso: 'EN PROGRESO',
            kpi_pendientes: 'PENDIENTES',
            kpi_atrasadas: 'ATRASADAS',
            kpi_completado: 'COMPLETADO',
            card_cubo: '🌐 HOLOGRAPHIC CUBE',
            card_montecarlo: '🔮 MONTE CARLO SIMULATION',
            card_optimista: 'OPTIMISTA',
            card_mediano: 'MEDIANO',
            card_pesimista: 'PESIMISTA',
            card_executive: '⚡ EXECUTIVE METRICS',
            card_sentiment: '💬 SENTIMENT ANALYSIS',
            card_riesgos: '⚠️ CRITICAL RISK MATRIX',
            metric_cpi: 'Cost Performance Index',
            metric_spi: 'Schedule Performance Index',
            metric_health: 'Health Score',
            metric_cpi_eficiente: '✅ EFICIENTE',
            metric_cpi_sobrecosto: '⚠️ SOBRE COSTO',
            metric_spi_tiempo: '✅ A TIEMPO',
            metric_spi_retraso: '⚠️ RETRASO',
            metric_health_optimo: 'ÓPTIMO',
            metric_health_riesgo: 'EN RIESGO',
            metric_health_critico: 'CRÍTICO',
            interpretacion_titulo: '📊 INTERPRETACIÓN DE MÉTRICAS',
            interpretacion_cpi_positivo: '✅ Eficiencia de costos positiva: gastas menos de lo planeado',
            interpretacion_cpi_negativo: '⚠️ Alerta de costos: estás gastando más de lo presupuestado',
            interpretacion_spi_positivo: '✅ Cronograma saludable: vas adelantado o a tiempo',
            interpretacion_spi_negativo: '⚠️ Retraso en cronograma: necesitas acelerar el ritmo',
            interpretacion_health_excelente: '🟢 Salud excelente',
            interpretacion_health_atencion: '🟡 Atención requerida',
            interpretacion_health_critico: '🔴 Estado crítico - acción inmediata',
            sentiment_positivas: 'POSITIVAS',
            sentiment_negativas: 'NEGATIVAS',
            sentiment_comentarios: 'COMENTARIOS',
            sentiment_recomendacion: '💡 RECOMENDACIÓN',
            sentiment_palabras_negativas: '⚠️ PALABRAS CLAVE NEGATIVAS:',
            sentiment_label_muy_positivo: 'MUY POSITIVO',
            sentiment_label_positivo: 'POSITIVO',
            sentiment_label_muy_negativo: 'MUY NEGATIVO',
            sentiment_label_negativo: 'NEGATIVO',
            sentiment_label_levemente_negativo: 'LEVEMENTE NEGATIVO',
            sentiment_label_levemente_positivo: 'LEVEMENTE POSITIVO',
            sentiment_label_neutral: 'NEUTRAL',
            riesgo_tarea: 'Tarea',
            riesgo_asignado: 'Asignado',
            riesgo_progreso: 'Progreso',
            riesgo_estado: 'Estado',
            riesgo_riesgo: 'Riesgo',
            riesgo_completada: 'COMPLETADA',
            riesgo_atrasada: 'ATRASADA',
            riesgo_en_progreso: 'EN PROGRESO',
            riesgo_pendiente: 'PENDIENTE',
            riesgo_leyenda_critico: '🔴 80-100% → CRÍTICO',
            riesgo_leyenda_alto: '🟠 60-79% → ALTO',
            riesgo_leyenda_medio: '🟡 40-59% → MEDIO',
            riesgo_leyenda_bajo: '🟢 0-39% → BAJO',
            riesgo_criticos: 'críticos',
            riesgo_completadas: 'completadas',
            riesgo_hace_dias: 'HACE {días} DÍAS',
            riesgo_vence_hoy: 'VENCE HOY',
            riesgo_dias_restantes: '{días} DÍAS',
            sentiment_recomendacion_muy_positivo: '✅ El equipo está motivado. Sigue así.',
            sentiment_recomendacion_positivo: '👍 Buen ambiente general.',
            sentiment_recomendacion_muy_negativo: '🔴 ¡ALERTA! Reúnete urgentemente con el equipo.',
            sentiment_recomendacion_negativo: '⚠️ Agenda una retrospectiva para abordar problemas.',
            sentiment_recomendacion_levemente_negativo: '📌 Monitorea las tareas con comentarios negativos.',
            sentiment_recomendacion_levemente_positivo: '💪 Buen rumbo. Sigue reforzando lo positivo.',
            sentiment_recomendacion_neutral: '📊 Sentimiento neutral. Fomenta más feedback.',
            montecarlo_confianza: 'confianza',
            montecarlo_iteraciones: 'iteraciones simuladas',
            montecarlo_velocidad: 'velocidad',
            montecarlo_tareas_dia: 'tareas/día',
            sidebar_boton: '🎯 CENTRO DE CONTROL PM',
            voz_cerrar: 'cerrar',
            voz_estado: 'estado',
            alert_no_proyectos: '❌ No hay proyectos disponibles',
            alert_sin_tareas: 'El proyecto "{nombre}" no tiene tareas',
            alert_comando: '🎤 Comando: "{comando}"',
            alert_estado: '📊 {nombre}\n✅ Progreso: {completado}%\n📋 Tareas: {completadas}/{total}\n⚠️ Riesgo: {criticas} tareas críticas',
            alert_agrega_comentarios: 'Agrega comentarios a las tareas para obtener análisis de sentimiento'
        },
        en: {
            tituloDashboard: 'PM CONTROL CENTER',
            subtituloDashboard: 'Executive project control dashboard',
            badge3d: '⚡ 3D ACTIVE',
            cerrar: '✕',
            kpi_total: 'TOTAL',
            kpi_completadas: 'COMPLETED',
            kpi_enProgreso: 'IN PROGRESS',
            kpi_pendientes: 'PENDING',
            kpi_atrasadas: 'OVERDUE',
            kpi_completado: 'COMPLETED',
            card_cubo: '🌐 HOLOGRAPHIC CUBE',
            card_montecarlo: '🔮 MONTE CARLO SIMULATION',
            card_optimista: 'OPTIMISTIC',
            card_mediano: 'MEDIAN',
            card_pesimista: 'PESSIMISTIC',
            card_executive: '⚡ EXECUTIVE METRICS',
            card_sentiment: '💬 SENTIMENT ANALYSIS',
            card_riesgos: '⚠️ CRITICAL RISK MATRIX',
            metric_cpi: 'Cost Performance Index',
            metric_spi: 'Schedule Performance Index',
            metric_health: 'Health Score',
            metric_cpi_eficiente: '✅ EFFICIENT',
            metric_cpi_sobrecosto: '⚠️ OVER COST',
            metric_spi_tiempo: '✅ ON TIME',
            metric_spi_retraso: '⚠️ DELAYED',
            metric_health_optimo: 'OPTIMAL',
            metric_health_riesgo: 'AT RISK',
            metric_health_critico: 'CRITICAL',
            interpretacion_titulo: '📊 METRICS INTERPRETATION',
            interpretacion_cpi_positivo: '✅ Positive cost efficiency: you spend less than planned',
            interpretacion_cpi_negativo: '⚠️ Cost alert: you are spending more than budgeted',
            interpretacion_spi_positivo: '✅ Healthy schedule: you are ahead or on time',
            interpretacion_spi_negativo: '⚠️ Schedule delay: you need to speed up',
            interpretacion_health_excelente: '🟢 Excellent health',
            interpretacion_health_atencion: '🟡 Attention required',
            interpretacion_health_critico: '🔴 Critical state - immediate action',
            sentiment_positivas: 'POSITIVE',
            sentiment_negativas: 'NEGATIVE',
            sentiment_comentarios: 'COMMENTS',
            sentiment_recomendacion: '💡 RECOMMENDATION',
            sentiment_palabras_negativas: '⚠️ NEGATIVE KEYWORDS:',
            sentiment_label_muy_positivo: 'VERY POSITIVE',
            sentiment_label_positivo: 'POSITIVE',
            sentiment_label_muy_negativo: 'VERY NEGATIVE',
            sentiment_label_negativo: 'NEGATIVE',
            sentiment_label_levemente_negativo: 'SLIGHTLY NEGATIVE',
            sentiment_label_levemente_positivo: 'SLIGHTLY POSITIVE',
            sentiment_label_neutral: 'NEUTRAL',
            riesgo_tarea: 'Task',
            riesgo_asignado: 'Assignee',
            riesgo_progreso: 'Progress',
            riesgo_estado: 'Status',
            riesgo_riesgo: 'Risk',
            riesgo_completada: 'COMPLETED',
            riesgo_atrasada: 'OVERDUE',
            riesgo_en_progreso: 'IN PROGRESS',
            riesgo_pendiente: 'PENDING',
            riesgo_leyenda_critico: '🔴 80-100% → CRITICAL',
            riesgo_leyenda_alto: '🟠 60-79% → HIGH',
            riesgo_leyenda_medio: '🟡 40-59% → MEDIUM',
            riesgo_leyenda_bajo: '🟢 0-39% → LOW',
            riesgo_criticos: 'critical',
            riesgo_completadas: 'completed',
            riesgo_hace_dias: '{días} DAYS AGO',
            riesgo_vence_hoy: 'DUE TODAY',
            riesgo_dias_restantes: '{días} DAYS',
            sentiment_recomendacion_muy_positivo: '✅ Team is motivated. Keep it up.',
            sentiment_recomendacion_positivo: '👍 Good general environment.',
            sentiment_recomendacion_muy_negativo: '🔴 ALERT! Meet urgently with the team.',
            sentiment_recomendacion_negativo: '⚠️ Schedule a retrospective to address issues.',
            sentiment_recomendacion_levemente_negativo: '📌 Monitor tasks with negative comments.',
            sentiment_recomendacion_levemente_positivo: '💪 Good direction. Keep reinforcing the positive.',
            sentiment_recomendacion_neutral: '📊 Neutral sentiment. Encourage more feedback.',
            montecarlo_confianza: 'confidence',
            montecarlo_iteraciones: 'simulated iterations',
            montecarlo_velocidad: 'speed',
            montecarlo_tareas_dia: 'tasks/day',
            sidebar_boton: '🎯 PM CONTROL CENTER',
            voz_cerrar: 'close',
            voz_estado: 'status',
            alert_no_proyectos: '❌ No projects available',
            alert_sin_tareas: 'Project "{nombre}" has no tasks',
            alert_comando: '🎤 Command: "{comando}"',
            alert_estado: '📊 {nombre}\n✅ Progress: {completado}%\n📋 Tasks: {completadas}/{total}\n⚠️ Risk: {criticas} critical tasks',
            alert_agrega_comentarios: 'Add comments to tasks to get sentiment analysis'
        }
    };

    // Función de traducción
    function t(key) {
        if (!key) return key;
        const lang = localStorage.getItem('preferredLanguage') || 'es';
        const langCode = lang.split('-')[0];
        const keys = key.split('.');
        let value = translations[langCode];
        for (const k of keys) {
            if (value && value[k] !== undefined) value = value[k];
            else return key;
        }
        return value || key;
    }

    window.t = t;

    document.addEventListener('languageChanged', function() {
        const btn = document.getElementById('quantumV10Btn');
        if (btn) btn.innerHTML = t('sidebar_boton');
    });

    // ============================================================
    // 2. FUNCIONES AUXILIARES (COMPLETAS)
    // ============================================================

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
                label: t('sentiment_label_neutral'),
                intensity: 0,
                color: '#888',
                emoji: '😐',
                positiveCount: 0,
                negativeCount: 0,
                totalComments: 0,
                sample: 'No hay comentarios en las tareas.',
                positiveWords: [],
                negativeWords: [],
                negativePercent: 0,
                positivePercent: 0,
                recommendations: t('alert_agrega_comentarios'),
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
        
        let labelKey = 'neutral';
        let color = '#888', emoji = '😐';
        if (positivePercent > 60) { labelKey = 'muy_positivo'; color = '#10b981'; emoji = '😊✨'; }
        else if (positivePercent > 40) { labelKey = 'positivo'; color = '#34d399'; emoji = '😊'; }
        else if (negativePercent > 60) { labelKey = 'muy_negativo'; color = '#ef4444'; emoji = '😫💔'; }
        else if (negativePercent > 40) { labelKey = 'negativo'; color = '#f87171'; emoji = '😞'; }
        else if (negativePercent > 20) { labelKey = 'levemente_negativo'; color = '#fbbf24'; emoji = '😕'; }
        else if (positivePercent > 20) { labelKey = 'levemente_positivo'; color = '#6ee7b7'; emoji = '🙂'; }
        
        const label = t('sentiment_label_' + labelKey);
        
        let recommendations = '';
        if (labelKey === 'muy_positivo') recommendations = t('sentiment_recomendacion_muy_positivo');
        else if (labelKey === 'positivo') recommendations = t('sentiment_recomendacion_positivo');
        else if (labelKey === 'muy_negativo') recommendations = t('sentiment_recomendacion_muy_negativo');
        else if (labelKey === 'negativo') recommendations = t('sentiment_recomendacion_negativo');
        else if (labelKey === 'levemente_negativo') recommendations = t('sentiment_recomendacion_levemente_negativo');
        else if (labelKey === 'levemente_positivo') recommendations = t('sentiment_recomendacion_levemente_positivo');
        else recommendations = t('sentiment_recomendacion_neutral');
        
        const intensity = Math.min(100, Math.round((total / 30) * 100));
        let sample = 'Sin ejemplo destacado';
        const negativeComments = taskAnalysis.filter(t => t.sentiment === 'negativo');
        if (negativeComments.length > 0) sample = negativeComments[0].comment;
        else if (taskAnalysis.length > 0) sample = taskAnalysis[0].comment;
        
        return { 
            label,
            intensity,
            color,
            emoji,
            positiveCount: totalPositiveCount,
            negativeCount: totalNegativeCount,
            totalComments: allComments.length,
            sample,
            positiveWords: Array.from(foundPositiveWords),
            negativeWords: Array.from(foundNegativeWords),
            negativePercent,
            positivePercent,
            recommendations,
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
                color: #4ade80;
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

    // ============================================================
    // 3. DASHBOARD
    // ============================================================
    async function showQuantumDashboard() {
        console.log('[QUANTUM] Abriendo dashboard v12.2...');
        
        const project = getCurrentProject();
        if (!project) {
            alert(t('alert_no_proyectos'));
            return;
        }
        
        const tasks = project.tasks || [];
        if (tasks.length === 0) {
            alert(t('alert_sin_tareas').replace('{nombre}', project.name));
            return;
        }
        
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
        
        // ---- OBTENER TODAS LAS TRADUCCIONES ----
        const titulo = t('tituloDashboard');
        const badge3d = t('badge3d');
        const cerrar = t('cerrar');
        const kpiTotal = t('kpi_total');
        const kpiCompletadas = t('kpi_completadas');
        const kpiEnProgreso = t('kpi_enProgreso');
        const kpiPendientes = t('kpi_pendientes');
        const kpiAtrasadas = t('kpi_atrasadas');
        const kpiCompletado = t('kpi_completado');
        const cardCubo = t('card_cubo');
        const cardMontecarlo = t('card_montecarlo');
        const cardOptimista = t('card_optimista');
        const cardMediano = t('card_mediano');
        const cardPesimista = t('card_pesimista');
        const cardExecutive = t('card_executive');
        const cardSentiment = t('card_sentiment');
        const cardRiesgos = t('card_riesgos');
        const metricCpi = t('metric_cpi');
        const metricSpi = t('metric_spi');
        const metricHealth = t('metric_health');
        const metricCpiEficiente = t('metric_cpi_eficiente');
        const metricCpiSobrecosto = t('metric_cpi_sobrecosto');
        const metricSpiTiempo = t('metric_spi_tiempo');
        const metricSpiRetraso = t('metric_spi_retraso');
        const metricHealthOptimo = t('metric_health_optimo');
        const metricHealthRiesgo = t('metric_health_riesgo');
        const metricHealthCritico = t('metric_health_critico');
        const interpretacionTitulo = t('interpretacion_titulo');
        const interpretacionCpiPositivo = t('interpretacion_cpi_positivo');
        const interpretacionCpiNegativo = t('interpretacion_cpi_negativo');
        const interpretacionSpiPositivo = t('interpretacion_spi_positivo');
        const interpretacionSpiNegativo = t('interpretacion_spi_negativo');
        const interpretacionHealthExcelente = t('interpretacion_health_excelente');
        const interpretacionHealthAtencion = t('interpretacion_health_atencion');
        const interpretacionHealthCritico = t('interpretacion_health_critico');
        const sentimentPositivas = t('sentiment_positivas');
        const sentimentNegativas = t('sentiment_negativas');
        const sentimentComentarios = t('sentiment_comentarios');
        const sentimentRecomendacion = t('sentiment_recomendacion');
        const sentimentPalabrasNegativas = t('sentiment_palabras_negativas');
        const riesgoTarea = t('riesgo_tarea');
        const riesgoAsignado = t('riesgo_asignado');
        const riesgoProgreso = t('riesgo_progreso');
        const riesgoEstado = t('riesgo_estado');
        const riesgoRiesgo = t('riesgo_riesgo');
        const riesgoLeyendaCritico = t('riesgo_leyenda_critico');
        const riesgoLeyendaAlto = t('riesgo_leyenda_alto');
        const riesgoLeyendaMedio = t('riesgo_leyenda_medio');
        const riesgoLeyendaBajo = t('riesgo_leyenda_bajo');
        const riesgoCriticos = t('riesgo_criticos');
        const riesgoCompletadas = t('riesgo_completadas');
        const riesgoCompletada = t('riesgo_completada');
        const riesgoAtrasada = t('riesgo_atrasada');
        const riesgoEnProgreso = t('riesgo_en_progreso');
        const riesgoPendiente = t('riesgo_pendiente');
        const riesgoHaceDias = t('riesgo_hace_dias');
        const riesgoVenceHoy = t('riesgo_vence_hoy');
        const riesgoDiasRestantes = t('riesgo_dias_restantes');
        const montecarloConfianza = t('montecarlo_confianza');
        const montecarloIteraciones = t('montecarlo_iteraciones');
        const montecarloVelocidad = t('montecarlo_velocidad');
        const montecarloTareasDia = t('montecarlo_tareas_dia');

        // ---- GENERAR FILAS DE LA TABLA ----
        const tableRows = tasksWithRisk.sort((a,b) => b.risk - a.risk).slice(0,20).map(t => {
            const progresoMostrar = calcularProgresoReal(t);
            
            if (t.status === 'completed') {
                return `<tr style="background: #0a1a0a; border-left: 3px solid #10b981;">
                    <td><strong>🎉 ${(t.name || 'Sin nombre').substring(0,30)}</strong> <span style="color:#10b981;">✓ ${riesgoCompletada}</span></td>
                    <td style="color:#10b981;">${t.assignee || '—'}</td>
                    <td><div style="width:70px; background:#1a1f2e; border-radius:4px; height:4px;"><div style="width:100%; height:100%; background:#10b981; border-radius:4px;"></div></div> 100%</td>
                    <td><span style="background:#10b98120; color:#10b981; padding:2px 8px; border-radius:4px;">✅ ${riesgoCompletada}</span></td>
                    <td><span style="background:#0a2e1a; color:#10b981; padding:4px 10px; border-radius:4px;">✓ 0%</span></td>
                </tr>`;
            }
            
            let riskColor = '', riskBg = '', riskDisplay = '';
            if (t.risk >= 80) { riskColor = '#ef4444'; riskBg = '#2a0a0a'; riskDisplay = `🔴 ${t.risk}%`; }
            else if (t.risk >= 60) { riskColor = '#f97316'; riskBg = '#2a1a0a'; riskDisplay = `🟠 ${t.risk}%`; }
            else if (t.risk >= 40) { riskColor = '#f59e0b'; riskBg = '#2a2a0a'; riskDisplay = `🟡 ${t.risk}%`; }
            else { riskColor = '#10b981'; riskBg = '#0a2e1a'; riskDisplay = `🟢 ${t.risk}%`; }
            
            let statusIcon = '', statusText = '', statusColor = '';
            if (t.status === 'overdue') { statusIcon = '🔴'; statusText = riesgoAtrasada; statusColor = '#ef4444'; }
            else if (t.status === 'inProgress') { statusIcon = '🔄'; statusText = riesgoEnProgreso; statusColor = '#3b82f6'; }
            else { statusIcon = '⏳'; statusText = riesgoPendiente; statusColor = '#f59e0b'; }
            
            let daysLeftText = '';
            if (t.deadline && t.status !== 'completed') {
                const deadline = new Date(t.deadline);
                const today = new Date();
                const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
                if (daysLeft < 0) {
                    daysLeftText = ` ⚠️ ${riesgoHaceDias.replace('{días}', Math.abs(daysLeft))}`;
                } else if (daysLeft === 0) {
                    daysLeftText = ` 🔴 ${riesgoVenceHoy}`;
                } else if (daysLeft <= 3) {
                    daysLeftText = ` 🟡 ${riesgoDiasRestantes.replace('{días}', daysLeft)}`;
                } else {
                    daysLeftText = ` 🟢 ${riesgoDiasRestantes.replace('{días}', daysLeft)}`;
                }
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
                <td><div style="width:70px; background:#1a1f2e; border-radius:4px; height:4px;"><div style="width:${progresoMostrar}%; height:100%; background:${progresoColor}; border-radius:4px;"></div></div> ${progresoMostrar}%</td>
                <td><span style="background:${statusColor}20; color:${statusColor}; padding:2px 8px; border-radius:4px;">${statusIcon} ${statusText}</span></td>
                <td><span style="background:${riskBg}; color:${riskColor}; padding:4px 10px; border-radius:4px; font-weight:500;">${riskDisplay}</span></td>
            </tr>`;
        }).join('');

        // ---- ARMAR HTML ----
        dashboard.innerHTML = `
            <div class="quantum-dashboard">
                <div class="quantum-header">
                    <div class="quantum-logo">
                        <div class="quantum-icon">🎯</div>
                        <div class="quantum-title">
                            <h1>${titulo}</h1>
                            <p>${project.name} · ${new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div class="quantum-badge">${badge3d}</div>
                    <button class="quantum-close" id="quantumCloseBtn">${cerrar}</button>
                </div>
                <div class="quantum-content">
                    <div class="quantum-kpi-grid">
                        <div class="quantum-kpi"><div class="quantum-kpi-value" style="color:${kpiColors.total};">${tasks.length}</div><div class="quantum-kpi-label">${kpiTotal}</div></div>
                        <div class="quantum-kpi"><div class="quantum-kpi-value" style="color:${kpiColors.completed};">${completed}</div><div class="quantum-kpi-label">${kpiCompletadas}</div></div>
                        <div class="quantum-kpi"><div class="quantum-kpi-value" style="color:${kpiColors.inProgress};">${inProgress}</div><div class="quantum-kpi-label">${kpiEnProgreso}</div></div>
                        <div class="quantum-kpi"><div class="quantum-kpi-value" style="color:${kpiColors.pending};">${pending}</div><div class="quantum-kpi-label">${kpiPendientes}</div></div>
                        <div class="quantum-kpi"><div class="quantum-kpi-value" style="color:${kpiColors.overdue};">${overdue}</div><div class="quantum-kpi-label">${kpiAtrasadas}</div></div>
                        <div class="quantum-kpi"><div class="quantum-kpi-value" style="color:${kpiColors.completion};">${completionRate}%</div><div class="quantum-kpi-label">${kpiCompletado}</div></div>
                    </div>
                    
                    <div class="quantum-grid-2">
                        <div class="quantum-card">
                            <div class="quantum-card-header"><span>${cardCubo}</span><span>${completionRate}% completado</span></div>
                            <div class="quantum-card-body"><div id="quantum3dContainer" class="quantum-3d-container"></div></div>
                        </div>
                        <div class="quantum-card">
                            <div class="quantum-card-header"><span>${cardMontecarlo}</span><span>${monteCarlo.confidence}% ${montecarloConfianza}</span></div>
                            <div class="quantum-card-body" style="padding-top: 24px;">
                                <div class="quantum-mc-grid" style="margin-top: 8px;">
                                    <div class="quantum-mc-card"><div class="quantum-mc-value">${monteCarlo.optimistic}</div><div class="quantum-mc-label">${cardOptimista}</div></div>
                                    <div class="quantum-mc-card"><div class="quantum-mc-value">${monteCarlo.median}</div><div class="quantum-mc-label">${cardMediano}</div></div>
                                    <div class="quantum-mc-card"><div class="quantum-mc-value">${monteCarlo.pessimistic}</div><div class="quantum-mc-label">${cardPesimista}</div></div>
                                </div>
                                <div style="padding:12px 10px; background:#0a0c14; border-radius:6px; font-family:monospace; font-size:9px; color:#ffffff; border:1px solid #1a1f2e; margin-top: 12px;">
                                    > 500 ${montecarloIteraciones}<br>
                                    > ${montecarloVelocidad}: ${(completed / Math.max(1,30)).toFixed(2)} ${montecarloTareasDia}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="quantum-card">
                        <div class="quantum-card-header"><span>${cardExecutive}</span><span>CPI / SPI</span></div>
                        <div class="quantum-card-body">
                            <div style="display:flex; gap:30px; justify-content:center; margin-bottom:16px;">
                                <div style="text-align:center;">
                                    <div style="font-size:36px; font-weight:700; color:${cpi>=1?'#10b981':'#ef4444'};">${cpi.toFixed(2)}</div>
                                    <div style="font-size:11px; color:#ffffff; margin-top:4px;">${metricCpi}</div>
                                    <div style="font-size:9px; color:${cpi>=1?'#10b981':'#ef4444'}; margin-top:2px;">${cpi>=1 ? metricCpiEficiente : metricCpiSobrecosto}</div>
                                </div>
                                <div style="text-align:center;">
                                    <div style="font-size:36px; font-weight:700; color:${spi>=1?'#10b981':'#ef4444'};">${spi.toFixed(2)}</div>
                                    <div style="font-size:11px; color:#ffffff; margin-top:4px;">${metricSpi}</div>
                                    <div style="font-size:9px; color:${spi>=1?'#10b981':'#ef4444'}; margin-top:2px;">${spi>=1 ? metricSpiTiempo : metricSpiRetraso}</div>
                                </div>
                                <div style="text-align:center;">
                                    <div style="font-size:36px; font-weight:700; color:${healthScore>=70?'#10b981':healthScore>=40?'#f59e0b':'#ef4444'};">${healthScore}%</div>
                                    <div style="font-size:11px; color:#ffffff; margin-top:4px;">${metricHealth}</div>
                                    <div style="font-size:9px; color:${healthScore>=70?'#10b981':healthScore>=40?'#f59e0b':'#ef4444'}; margin-top:2px;">${healthScore>=70 ? metricHealthOptimo : healthScore>=40 ? metricHealthRiesgo : metricHealthCritico}</div>
                                </div>
                            </div>
                            <div class="quantum-progress"><div class="quantum-progress-fill" style="width: ${healthScore}%;"></div></div>
                            
                            <div class="explanation-beautiful">
                                <div style="text-align:center; margin-bottom:12px; color:#60a5fa; font-weight:600; font-size:12px; letter-spacing:1px;">${interpretacionTitulo}</div>
                                <div style="margin-bottom:10px; padding:8px; background:#0c0e16; border-radius:6px; border-left:3px solid ${cpi>=1?'#10b981':'#ef4444'};">
                                    <strong style="color:#e2e8f0;">CPI = ${cpi.toFixed(2)}</strong>
                                    <div style="color:#94a3b8; font-size:10px; margin-top:4px;">${cpi >= 1 ? interpretacionCpiPositivo : interpretacionCpiNegativo}</div>
                                </div>
                                <div style="margin-bottom:10px; padding:8px; background:#0c0e16; border-radius:6px; border-left:3px solid ${spi>=1?'#10b981':'#ef4444'};">
                                    <strong style="color:#e2e8f0;">SPI = ${spi.toFixed(2)}</strong>
                                    <div style="color:#94a3b8; font-size:10px; margin-top:4px;">${spi >= 1 ? interpretacionSpiPositivo : interpretacionSpiNegativo}</div>
                                </div>
                                <div style="padding:8px; background:#0c0e16; border-radius:6px; border-left:3px solid ${healthScore>=70?'#10b981':healthScore>=40?'#f59e0b':'#ef4444'};">
                                    <strong style="color:#e2e8f0;">HEALTH SCORE = ${healthScore}%</strong>
                                    <div style="color:#94a3b8; font-size:10px; margin-top:4px;">${healthScore >= 70 ? interpretacionHealthExcelente : healthScore >= 40 ? interpretacionHealthAtencion : interpretacionHealthCritico}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="quantum-grid-2">
                        <div class="quantum-card">
                            <div class="quantum-card-header"><span>${cardSentiment}</span><span style="color:${sentiment.color};">${sentiment.label.toUpperCase()} ${sentiment.emoji}</span></div>
                            <div class="quantum-card-body">
                                <div id="quantumMatrix" class="quantum-matrix">${generateMatrixText()}</div>
                                <div class="sentiment-stats">
                                    <div class="sentiment-stat"><div style="color:#10b981;">${sentiment.positiveCount}</div><div style="color:#ffffff;">${sentimentPositivas}</div></div>
                                    <div class="sentiment-stat"><div style="color:#ef4444;">${sentiment.negativeCount}</div><div style="color:#ffffff;">${sentimentNegativas}</div></div>
                                    <div class="sentiment-stat"><div style="color:#60a5fa;">${sentiment.totalComments}</div><div style="color:#ffffff;">${sentimentComentarios}</div></div>
                                </div>
                                <div style="margin-bottom:8px;">
                                    <div class="sentiment-bar-container">
                                        <div class="sentiment-bar-positive" style="width: ${sentiment.positivePercent}%;"></div>
                                        <div class="sentiment-bar-negative" style="width: ${sentiment.negativePercent}%;"></div>
                                    </div>
                                </div>
                                ${sentiment.negativeWords.length > 0 ? `
                                <div style="margin-bottom:8px;">
                                    <div style="font-size:9px; color:#ef4444; margin-bottom:4px;">${sentimentPalabrasNegativas}</div>
                                    <div style="font-size:8px;">${sentiment.negativeWords.slice(0,5).map(w => `<span class="sentiment-word-badge">${w}</span>`).join('')}</div>
                                </div>
                                ` : ''}
                                <div class="recommendation-box">
                                    <div style="color:#60a5fa; font-weight:600; margin-bottom:4px; font-size:10px;">${sentimentRecomendacion}</div>
                                    <div style="font-size:9px; color:#94a3b8;">${sentiment.recommendations}</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="quantum-card">
                            <div class="quantum-card-header"><span>${cardRiesgos}</span><span>🔴 ${tasksWithRisk.filter(t => t.risk >= 80 && t.status !== 'completed').length} ${riesgoCriticos} | 🎉 ${tasksWithRisk.filter(t => t.status === 'completed').length} ${riesgoCompletadas}</span></div>
                            <div class="quantum-card-body">
                                <div style="overflow-x:auto; max-height:280px; overflow-y:auto;">
                                    <table class="quantum-table">
                                        <thead>
                                            <tr><th>${riesgoTarea}</th><th>${riesgoAsignado}</th><th>${riesgoProgreso}</th><th>${riesgoEstado}</th><th>${riesgoRiesgo}</th></tr>
                                        </thead>
                                        <tbody>
                                            ${tableRows}
                                        </tbody>
                                    </table>
                                </div>
                                <div style="margin-top:12px; display:flex; gap:16px; justify-content:center; font-size:9px; color:#ffffff; padding:8px; border-top:1px solid #1a1f2e;">
                                    <span>${riesgoLeyendaCritico}</span>
                                    <span>${riesgoLeyendaAlto}</span>
                                    <span>${riesgoLeyendaMedio}</span>
                                    <span>${riesgoLeyendaBajo}</span>
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
                            const vozCerrar = t('voz_cerrar');
                            const vozEstado = t('voz_estado');
                            if (command.includes(vozCerrar)) dashboard.remove();
                            else if (command.includes(vozEstado)) {
                                const alertEstado = t('alert_estado')
                                    .replace('{nombre}', project.name)
                                    .replace('{completado}', completionRate)
                                    .replace('{completadas}', completed)
                                    .replace('{total}', tasks.length)
                                    .replace('{criticas}', tasksWithRisk.filter(t => t.risk >= 80 && t.status !== 'completed').length);
                                alert(alertEstado);
                            } else {
                                alert(t('alert_comando').replace('{comando}', command));
                            }
                        };
                        recognition.start();
                    }
                };
            }
        }
    }

    // ============================================================
    // 4. CREAR BOTÓN EN EL SIDEBAR
    // ============================================================
    function createSidebarButton() {
        if (document.getElementById('quantumV10Btn')) return;
        
        const interval = setInterval(() => {
            const sidebar = document.querySelector('aside, #sidebar, .sidebar');
            if (sidebar && !document.getElementById('quantumV10Btn')) {
                const btn = document.createElement('button');
                btn.id = 'quantumV10Btn';
                btn.innerHTML = t('sidebar_boton');
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

    // ============================================================
    // 5. EXPONER Y INICIALIZAR
    // ============================================================
    window.showQuantumDashboard = showQuantumDashboard;
    window.QuantumExecutive = { 
        show: showQuantumDashboard, 
        version: '12.2',
        getCurrentProject: getCurrentProject,
        calculateRisk: calculateRisk,
        calcularProgresoReal: calcularProgresoReal
    };

    function init() {
        createSidebarButton();
        console.log('✅ CENTRO DE CONTROL PM v12.2 - DEFINITIVO FUNCIONAL');
        console.log('   • Todas las traducciones aplicadas correctamente');
        console.log('   • Proyectos cargados desde localStorage');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();