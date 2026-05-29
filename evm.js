<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>HYPERION X ∞ | Executive Quantum PMO</title>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/echarts-gl@2.0.9/dist/echarts-gl.min.js"></script>

<style>
*{margin:0;padding:0;box-sizing:border-box;}
:root{--cyan:#00F0FF;--pink:#FF00D4;--green:#00FFB3;--violet:#7B61FF;}
body{
    background:radial-gradient(circle at top,#0a0a2a,#050816 60%);
    color:white;
    overflow-x:hidden;
    font-family:'Inter',system-ui,sans-serif;
}
canvas#bg{
    position:fixed;
    top:0;
   left:0;
    width:100%;
    height:100%;
    z-index:-1;
    display:block;
}
.dashboard{
    width:100%;
    max-width:1600px;
    margin:0 auto;
    padding:30px;
    position:relative;
    z-index:10;
}
.header{text-align:center;margin-bottom:35px;}
.header h1{
    font-size:72px;
    font-weight:900;
    background:linear-gradient(90deg,#fff,var(--cyan),var(--pink),#fff);
    background-size:300%;
    -webkit-background-clip:text;
    background-clip:text;
    color:transparent;
    animation:flow 8s linear infinite;
}
@keyframes flow{0%{background-position:0%}100%{background-position:300%}}
.subtitle{letter-spacing:4px;color:rgba(255,255,255,.55);margin-top:10px;}
.kpiGrid{
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:25px;
    margin-bottom:30px;
}
.kpi{
    position:relative;
    overflow:hidden;
    border-radius:30px;
    background:rgba(255,255,255,.04);
    border:1px solid rgba(255,255,255,.08);
    backdrop-filter:blur(20px);
    padding:30px;
    transition:.5s;
    cursor:pointer;
    text-align:center;
}
.kpi:hover{transform:translateY(-10px) scale(1.03);box-shadow:0 20px 60px rgba(0,255,255,.15);}
.kpiLabel{color:rgba(255,255,255,.55);letter-spacing:3px;font-size:12px;}
.kpiValue{font-size:58px;font-weight:900;margin-top:10px;}
.grid{
    display:grid;
    grid-template-columns:repeat(12,1fr);
    gap:25px;
}
.card{
    background:rgba(255,255,255,.04);
    border:1px solid rgba(255,255,255,.08);
    backdrop-filter:blur(20px);
    border-radius:32px;
    overflow:hidden;
    transition:.5s;
}
.card:hover{transform:translateY(-8px);box-shadow:0 20px 60px rgba(255,0,212,.12);}
.span3{grid-column:span 3;}
.span4{grid-column:span 4;}
.span6{grid-column:span 6;}
.span8{grid-column:span 8;}
.span12{grid-column:span 12;}
.cardHeader{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:24px 28px;
    border-bottom:1px solid rgba(255,255,255,.05);
}
.cardTitle{font-size:18px;font-weight:700;}
.badge{
    padding:8px 14px;
    border-radius:100px;
    background:linear-gradient(90deg,rgba(0,255,255,.15),rgba(255,0,212,.15));
    font-size:11px;
    letter-spacing:2px;
}
.cardBody{padding:0 20px 20px;}
.chart{width:100%;height:400px;}
.chart3d{width:100%;height:450px;position:relative;overflow:hidden;border-radius:20px;}
.tableWrap{display:flex;flex-direction:column;gap:18px;padding:10px;}
.teamRow{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:18px;
    border-radius:22px;
    background:rgba(255,255,255,.03);
    border:1px solid rgba(255,255,255,.05);
    transition:.4s;
}
.teamRow:hover{transform:translateX(10px) scale(1.02);box-shadow:0 0 40px rgba(0,255,255,.15);}
.progress{width:180px;height:10px;background:#172036;border-radius:100px;overflow:hidden;}
.fill{height:100%;border-radius:100px;background:linear-gradient(90deg,var(--cyan),var(--pink));}
.floatPanel{
    position:fixed;
    bottom:20px;
    right:20px;
    display:flex;
    gap:25px;
    background:rgba(0,0,0,.55);
    border:1px solid rgba(255,255,255,.08);
    padding:18px 24px;
    border-radius:100px;
    backdrop-filter:blur(20px);
    z-index:1000;
}
.tooltip-info{
    position:absolute;
    background:rgba(0,0,0,0.85);
    border:1px solid #00F0FF;
    border-radius:12px;
    padding:12px 18px;
    font-size:13px;
    pointer-events:none;
    z-index:10000;
    backdrop-filter:blur(10px);
    transition:opacity 0.2s;
    opacity:0;
    max-width:300px;
    font-family:monospace;
}
@media(max-width:1200px){
    .kpiGrid{grid-template-columns:repeat(2,1fr);}
    .span8,.span6,.span4,.span3{grid-column:span 12;}
}
@media(max-width:768px){
    .kpiGrid{grid-template-columns:1fr;}
    .header h1{font-size:42px;}
    .floatPanel{display:none;}
}
</style>
</head>
<body>

<canvas id="bg"></canvas>
<div id="hoverTooltip" class="tooltip-info"></div>

<div class="dashboard" id="dashboard">

<div class="header">
    <h1 id="projectTitle">HYPERION X ∞</h1>
    <div class="subtitle">EXECUTIVE QUANTUM PMO COMMAND CENTER</div>
</div>

<div class="kpiGrid" id="kpiGrid"></div>

<div class="grid">

<!-- EVM -->
<div class="card span8">
<div class="cardHeader"><div class="cardTitle">⚡ EVM QUANTUM ANALYTICS (PMI)</div><div class="badge">LIVE PERFORMANCE</div></div>
<div class="cardBody"><div id="evmChart" class="chart"></div></div>
</div>

<!-- QUANTUM RINGS 3D (reemplaza el Load Balancer) -->
<div class="card span4">
<div class="cardHeader"><div class="cardTitle">🔄 QUANTUM RINGS 3D</div><div class="badge">HOVER INTERACTIVE</div></div>
<div class="cardBody"><div id="quantumRings3d" class="chart3d"></div></div>
</div>

<!-- BURNDOWN -->
<div class="card span6">
<div class="cardHeader"><div class="cardTitle">🔥 BURNDOWN HYPERFLOW</div><div class="badge">SPRINT AI</div></div>
<div class="cardBody"><div id="burndownChart" class="chart"></div></div>
</div>

<!-- STATUS -->
<div class="card span6">
<div class="cardHeader"><div class="cardTitle">📊 PROJECT STATUS MATRIX</div><div class="badge">REAL TIME</div></div>
<div class="cardBody"><div id="statusChart" class="chart"></div></div>
</div>

<!-- RISK 3D TERRAIN -->
<div class="card span6">
<div class="cardHeader"><div class="cardTitle">🌋 RISK TERRAIN 3D</div><div class="badge">PREDICTIVE</div></div>
<div class="cardBody"><div id="riskChart" class="chart"></div></div>
</div>

<!-- RESOURCE ALLOCATION -->
<div class="card span6">
<div class="cardHeader"><div class="cardTitle">👥 RESOURCE ALLOCATION MATRIX</div><div class="badge">DISPONIBILIDAD</div></div>
<div class="cardBody"><div id="allocationChart" class="chart"></div></div>
</div>

<!-- TEAM TABLE -->
<div class="card span12">
<div class="cardHeader"><div class="cardTitle">👥 EXECUTIVE TEAM MATRIX</div><div class="badge">SMART PERFORMANCE</div></div>
<div class="cardBody">
<div class="tableWrap" id="teamTable"></div>
</div>
</div>

</div>

</div>

<div class="floatPanel" id="floatPanel"></div>

<script>
// ============================================
// FUNCIÓN QUE LEE TUS DATOS REALES
// ============================================
function loadRealProjectData() {
    let projects = null;
    let currentIndex = 0;
    
    if(typeof window.projects !== 'undefined' && Array.isArray(window.projects)) {
        projects = window.projects;
        currentIndex = typeof window.currentProjectIndex !== 'undefined' ? window.currentProjectIndex : 0;
        console.log('✅ Datos cargados desde window.projects');
    } else {
        const stored = localStorage.getItem('projects');
        if(stored) {
            try {
                projects = JSON.parse(stored);
                currentIndex = parseInt(localStorage.getItem('currentProjectIndex') || '0');
                console.log('✅ Datos cargados desde localStorage');
            } catch(e) {}
        }
    }
    
    let project = null;
    let isDemo = false;
    
    if(projects && projects.length > 0 && projects[currentIndex]) {
        project = projects[currentIndex];
        console.log(`📊 Proyecto REAL: "${project.name}" con ${project.tasks?.length || 0} tareas`);
    } else {
        isDemo = true;
        project = {
            name: "⚠️ PROYECTO DEMO",
            tasks: [
                { name: "Tarea 1", status: "inProgress", assignee: "José Luna", estimatedTime: 40, timeLogged: 20, priority: "alta", startDate: "2026-03-30", deadline: "2026-05-27", progress: 50 },
                { name: "Prueba", status: "completed", assignee: "Angel", estimatedTime: 30, timeLogged: 30, priority: "media", startDate: "2026-03-30", deadline: "2026-05-21", progress: 100 },
                { name: "Tarea 15", status: "inProgress", assignee: "javier", estimatedTime: 25, timeLogged: 12, priority: "alta", startDate: "2026-05-16", deadline: "2026-05-31", progress: 50 },
                { name: "TAREA RETRASADA", status: "pending", assignee: "Sin asignar", estimatedTime: 20, timeLogged: 0, priority: "alta", startDate: "2026-05-14", deadline: "2026-05-28", progress: 0 }
            ]
        };
        console.warn('⚠️ Usando datos DEMO');
    }
    
    const tasks = project.tasks || [];
    
    // Calcular fechas reales del proyecto
    let minDate = null;
    let maxDate = null;
    tasks.forEach(task => {
        if(task.startDate) {
            const d = new Date(task.startDate);
            if(!minDate || d < minDate) minDate = d;
        }
        if(task.deadline) {
            const d = new Date(task.deadline);
            if(!maxDate || d > maxDate) maxDate = d;
        }
    });
    
    if(!minDate) minDate = new Date();
    if(!maxDate) maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    
    // Crear puntos de fecha entre inicio y fin
    const datePoints = [];
    const startDate = new Date(minDate);
    const endDate = new Date(maxDate);
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const numPoints = Math.min(12, Math.max(4, Math.ceil(totalDays / 14)));
    
    for(let i = 0; i <= numPoints; i++) {
        const pointDate = new Date(startDate);
        pointDate.setDate(startDate.getDate() + Math.floor((totalDays / numPoints) * i));
        datePoints.push(pointDate);
    }
    
    // Agregar el día de hoy como punto adicional para la línea vertical
    const today = new Date();
    let todayIndex = -1;
    for(let i = 0; i < datePoints.length; i++) {
        if(datePoints[i] >= today) {
            todayIndex = i;
            break;
        }
    }
    if(todayIndex === -1 && today >= startDate && today <= endDate) {
        datePoints.push(today);
        todayIndex = datePoints.length - 1;
        datePoints.sort((a,b) => a - b);
        todayIndex = datePoints.findIndex(d => d.toDateString() === today.toDateString());
    }
    
    // Calcular EVM para cada punto
    const BAC = tasks.reduce((sum, t) => sum + (Number(t.estimatedTime) || 0), 0);
    
    function calculateEVMAtDate(targetDate) {
        let PV = 0, EV = 0, AC = 0;
        
        tasks.forEach(task => {
            const estimated = Number(task.estimatedTime) || 0;
            const logged = Number(task.timeLogged) || 0;
            const start = task.startDate ? new Date(task.startDate) : null;
            const deadline = task.deadline ? new Date(task.deadline) : null;
            
            if(start && deadline && targetDate >= start && targetDate <= deadline) {
                const totalDuration = deadline - start;
                const elapsed = targetDate - start;
                const ratio = totalDuration > 0 ? Math.min(1, Math.max(0, elapsed / totalDuration)) : 0;
                PV += estimated * ratio;
            } else if(deadline && targetDate > deadline) {
                PV += estimated;
            }
            
            let progress = 0;
            if(task.status === 'completed') progress = 1;
            else if(task.status === 'inProgress') progress = (task.progress || 0) / 100;
            else if(task.progress) progress = task.progress / 100;
            
            if(start && targetDate >= start) {
                EV += estimated * progress;
            }
            
            if(start && targetDate >= start) {
                AC += logged * (targetDate >= deadline ? 1 : Math.min(1, progress));
            }
        });
        
        return { PV, EV, AC };
    }
    
    const pvData = [], evData = [], acData = [], dateLabels = [];
    datePoints.forEach(date => {
        const evm = calculateEVMAtDate(date);
        pvData.push(Math.round(evm.PV));
        evData.push(Math.round(evm.EV));
        acData.push(Math.round(evm.AC));
        dateLabels.push(date.toLocaleDateString('es-ES', { day:'2-digit', month:'short' }));
    });
    
    // KPIs
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const inProgressTasks = tasks.filter(t => t.status === 'inProgress').length;
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;
    const overdueTasks = tasks.filter(t => t.status === 'overdue' || (t.deadline && new Date(t.deadline) < new Date() && t.status !== 'completed')).length;
    
    let totalEstimated = 0, totalLogged = 0, earnedValue = 0;
    tasks.forEach(task => {
        const estimated = Number(task.estimatedTime) || 0;
        const logged = Number(task.timeLogged) || 0;
        totalEstimated += estimated;
        totalLogged += logged;
        let progress = task.status === 'completed' ? 1 : (task.status === 'inProgress' ? (task.progress || 0)/100 : 0);
        earnedValue += estimated * progress;
    });
    
    const spi = totalEstimated > 0 ? earnedValue / totalEstimated : 1;
    const cpi = totalLogged > 0 ? earnedValue / totalLogged : 1;
    const riskScore = Math.min(100, Math.round((overdueTasks * 15) + (pendingTasks * 5)));
    const progressPercent = totalEstimated > 0 ? Math.round((earnedValue / totalEstimated) * 100) : 0;
    
    // Burndown
    const remainingPoints = [];
    const weeks = [];
    const totalWeeks = Math.max(4, Math.ceil(totalDays / 7));
    
    for(let i = 0; i <= totalWeeks; i++) {
        const weekDate = new Date(startDate);
        weekDate.setDate(startDate.getDate() + (i * 7));
        weeks.push(`S${i+1}`);
        
        let remaining = 0;
        tasks.forEach(task => {
            const estimated = Number(task.estimatedTime) || 0;
            let progress = 0;
            if(task.status === 'completed') progress = 1;
            else if(task.status === 'inProgress') progress = (task.progress || 0) / 100;
            const weekDateNum = weekDate.getTime();
            const taskEnd = task.deadline ? new Date(task.deadline).getTime() : Infinity;
            if(weekDateNum < taskEnd) {
                remaining += estimated * (1 - progress);
            }
        });
        remainingPoints.push(Math.round(remaining));
    }
    
    const idealPoints = remainingPoints.map((_, i) => Math.round(remainingPoints[0] * (1 - i / (totalWeeks))));
    
    // Asignaciones
    const assigneeMap = new Map();
    tasks.forEach(task => {
        const assignee = task.assignee || 'Sin asignar';
        if(!assigneeMap.has(assignee)){
            assigneeMap.set(assignee, { totalTasks: 0, completedTasks: 0, totalHours: 0, loggedHours: 0 });
        }
        const d = assigneeMap.get(assignee);
        d.totalTasks++;
        if(task.status === 'completed') d.completedTasks++;
        d.totalHours += task.estimatedTime || 0;
        d.loggedHours += task.timeLogged || 0;
    });
    
    const assignees = Array.from(assigneeMap.keys());
    const taskCounts = Array.from(assigneeMap.values()).map(v => v.totalTasks);
    const hoursLogged = Array.from(assigneeMap.values()).map(v => v.loggedHours);
    
    // Datos para risk 3D (cada punto = una tarea)
    const riskDataPoints = [];
    tasks.forEach(task => {
        let delayDays = 0;
        if(task.deadline && task.status !== 'completed'){
            const deadline = new Date(task.deadline);
            const todayDate = new Date();
            if(deadline < todayDate) delayDays = Math.ceil((todayDate - deadline) / (1000*60*60*24));
        }
        const priorityVal = task.priority === 'alta' ? 3 : task.priority === 'media' ? 2 : 1;
        riskDataPoints.push({
            name: task.name,
            delayDays: delayDays,
            priority: priorityVal,
            hours: task.estimatedTime || 10,
            status: task.status,
            assignee: task.assignee || 'Sin asignar'
        });
    });
    
    const teamRows = Array.from(assigneeMap.entries()).map(([name, d]) => ({
        name, totalTasks: d.totalTasks, completedTasks: d.completedTasks,
        efficiency: d.totalTasks > 0 ? Math.round((d.completedTasks / d.totalTasks) * 100) : 0,
        hoursLogged: d.loggedHours, totalHours: d.totalHours
    }));
    
    return {
        projectName: project.name, isDemo, totalTasks, completedTasks, inProgressTasks, pendingTasks, overdueTasks,
        spi, cpi, riskScore, progressPercent,
        pvData, evData, acData, dateLabels, todayIndex,
        assignees, taskCounts, hoursLogged,
        riskDataPoints, teamRows,
        burndownReal: remainingPoints, burndownIdeal: idealPoints, burndownLabels: weeks,
        startDate: minDate, endDate: maxDate, today: new Date()
    };
}

// ============================================
// QUANTUM RINGS 3D (más espectacular, con hover)
// ============================================
let quantumScene = null;
let quantumRenderer = null;
let quantumCamera = null;
let quantumRings = [];

function initQuantumRings3D(data) {
    const container = document.getElementById('quantumRings3d');
    if(!container) return;
    while(container.firstChild) container.removeChild(container.firstChild);
    
    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2(0x050816, 0.02);
    
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / 450, 0.1, 1000);
    camera.position.set(0, 2, 10);
    camera.lookAt(0, 0, 0);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, 450);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Luces espectaculares
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(2, 5, 3);
    scene.add(mainLight);
    const backLight = new THREE.PointLight(0x00ffff, 0.8);
    backLight.position.set(-2, 1, -4);
    scene.add(backLight);
    const colorLight = new THREE.PointLight(0xff00ff, 0.6);
    colorLight.position.set(3, 2, 2);
    scene.add(colorLight);
    
    // Crear anillos concéntricos para cada asignado
    const colors = [0x00F0FF, 0x00FFB3, 0xFF00D4, 0x7B61FF, 0xFFAA00];
    const maxTasks = Math.max(...data.taskCounts, 1);
    
    data.assignees.forEach((name, idx) => {
        const ringRadius = 1.2 + (idx * 1.5);
        const ringHeight = (data.taskCounts[idx] / maxTasks) * 2.5;
        
        // Anillo principal
        const torusGeo = new THREE.TorusGeometry(ringRadius, 0.12, 64, 128);
        const torusMat = new THREE.MeshStandardMaterial({
            color: colors[idx % colors.length],
            metalness: 0.9,
            roughness: 0.1,
            emissive: colors[idx % colors.length],
            emissiveIntensity: 0.5
        });
        const ring = new THREE.Mesh(torusGeo, torusMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = ringHeight / 2;
        scene.add(ring);
        
        // Esfera central del anillo
        const sphereGeo = new THREE.SphereGeometry(0.25, 32, 32);
        const sphereMat = new THREE.MeshStandardMaterial({
            color: colors[idx % colors.length],
            metalness: 0.8,
            emissive: colors[idx % colors.length],
            emissiveIntensity: 0.7
        });
        const sphere = new THREE.Mesh(sphereGeo, sphereMat);
        sphere.position.set(0, ringHeight / 2, 0);
        scene.add(sphere);
        
        // Partículas orbitando alrededor del anillo
        const particleCount = 60;
        const particleGroup = new THREE.Group();
        for(let i = 0; i < particleCount; i++) {
            const particleGeo = new THREE.SphereGeometry(0.05, 8, 8);
            const particleMat = new THREE.MeshStandardMaterial({ color: colors[idx % colors.length], emissive: colors[idx % colors.length], emissiveIntensity: 0.3 });
            const particle = new THREE.Mesh(particleGeo, particleMat);
            const angle = (i / particleCount) * Math.PI * 2;
            particle.position.x = Math.cos(angle) * (ringRadius + 0.15);
            particle.position.z = Math.sin(angle) * (ringRadius + 0.15);
            particle.userData = { angle, radius: ringRadius + 0.15, speed: 0.01 + (idx * 0.003) };
            particleGroup.add(particle);
        }
        particleGroup.position.y = ringHeight / 2;
        scene.add(particleGroup);
        
        // Guardar para animación
        quantumRings.push({
            group: particleGroup,
            yPos: ringHeight / 2,
            color: colors[idx % colors.length],
            name: name,
            taskCount: data.taskCounts[idx],
            hours: data.hoursLogged[idx]
        });
        
        // Etiqueta flotante
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#00F0FF';
        ctx.font = 'Bold 28px Inter';
        ctx.fillText(name.length > 15 ? name.substring(0,12)+'..' : name, 20, 50);
        ctx.fillStyle = '#ffffff';
        ctx.font = '22px Inter';
        ctx.fillText(`📋 ${data.taskCounts[idx]} tareas`, 20, 100);
        ctx.fillStyle = 'rgba(0,240,255,0.8)';
        ctx.font = '20px Inter';
        ctx.fillText(`⏱️ ${data.hoursLogged[idx]} horas`, 20, 150);
        
        const texture = new THREE.CanvasTexture(canvas);
        const labelMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
        const label = new THREE.Sprite(labelMat);
        label.scale.set(1.8, 0.9, 1);
        label.position.set(ringRadius + 1.2, ringHeight / 2 + 0.5, 0);
        scene.add(label);
    });
    
    // Partículas de fondo
    const particleCountBg = 2000;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = [];
    for(let i = 0; i < particleCountBg; i++){
        particlePositions.push((Math.random() - 0.5) * 25);
        particlePositions.push((Math.random() - 0.5) * 15);
        particlePositions.push((Math.random() - 0.5) * 15);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(particlePositions), 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x00ffff, size: 0.08, transparent: true, opacity: 0.3 });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    
    // Raycaster para hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const tooltip = document.getElementById('hoverTooltip');
    
    function onMouseMove(event) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        
        let hit = null;
        for(let intersect of intersects) {
            if(intersect.object.parent === scene && intersect.object.isMesh) {
                hit = intersect.object;
                break;
            }
        }
        
        if(hit) {
            for(let ring of quantumRings) {
                if(hit.position.y === ring.yPos) {
                    tooltip.style.opacity = '1';
                    tooltip.style.left = (event.clientX + 15) + 'px';
                    tooltip.style.top = (event.clientY - 50) + 'px';
                    tooltip.innerHTML = `
                        <strong style="color:#00F0FF">${ring.name}</strong><br>
                        📋 Tareas: ${ring.taskCount}<br>
                        ⏱️ Horas: ${ring.hours}<br>
                        🎯 Eficiencia: ${Math.round((ring.hours/(ring.taskCount*10))*100)}%
                    `;
                    break;
                }
            }
        } else {
            tooltip.style.opacity = '0';
        }
    }
    
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;
        
        // Animar partículas orbitando
        quantumRings.forEach(ring => {
            ring.group.children.forEach(particle => {
                particle.userData.angle += particle.userData.speed;
                particle.position.x = Math.cos(particle.userData.angle) * particle.userData.radius;
                particle.position.z = Math.sin(particle.userData.angle) * particle.userData.radius;
            });
            ring.group.position.y = ring.yPos + Math.sin(time * 1.5) * 0.05;
        });
        
        particles.rotation.y = time * 0.1;
        particles.rotation.x = Math.sin(time * 0.2) * 0.1;
        
        camera.position.x = Math.sin(time * 0.2) * 1.2;
        camera.lookAt(0, 1.5, 0);
        
        renderer.render(scene, camera);
    }
    animate();
    
    window.addEventListener('resize', () => {
        const w = container.clientWidth;
        camera.aspect = w / 450;
        camera.updateProjectionMatrix();
        renderer.setSize(w, 450);
    });
}

// ============================================
// RENDERIZAR TODO
// ============================================
function renderDashboard() {
    const data = loadRealProjectData();
    
    if(data.isDemo) {
        document.getElementById('projectTitle').innerHTML = '⚠️ ' + data.projectName + ' ⚠️';
    } else {
        document.getElementById('projectTitle').textContent = data.projectName;
    }
    
    // KPIs
    document.getElementById('kpiGrid').innerHTML = `
        <div class="kpi"><div class="kpiLabel">SPI</div><div class="kpiValue" style="color:var(--cyan)">${data.spi.toFixed(2)}</div></div>
        <div class="kpi"><div class="kpiLabel">CPI</div><div class="kpiValue" style="color:var(--green)">${data.cpi.toFixed(2)}</div></div>
        <div class="kpi"><div class="kpiLabel">RISK</div><div class="kpiValue" style="color:var(--pink)">${data.riskScore}%</div></div>
        <div class="kpi"><div class="kpiLabel">COMPLETION</div><div class="kpiValue" style="color:var(--violet)">${data.progressPercent}%</div></div>
    `;
    
    document.getElementById('floatPanel').innerHTML = `
        <div style="color:var(--cyan)">SPI ${data.spi.toFixed(2)}</div>
        <div style="color:var(--green)">CPI ${data.cpi.toFixed(2)}</div>
        <div style="color:var(--pink)">RISK ${data.riskScore}%</div>
        <div style="color:var(--violet)">PROGRESS ${data.progressPercent}%</div>
        <div style="color:#00F0FF">📅 HOY: ${data.today.toLocaleDateString()}</div>
    `;
    
    // Inicializar Quantum Rings 3D
    initQuantumRings3D(data);
    
    // EVM CHART con línea del día de hoy
    const evmChart = echarts.init(document.getElementById('evmChart'));
    const markLineData = data.todayIndex !== -1 ? [{
        xAxis: data.todayIndex,
        name: 'HOY',
        label: { formatter: 'HOY', color: '#FF00D4', fontWeight: 'bold' },
        lineStyle: { color: '#FF00D4', width: 2, type: 'solid', shadowBlur: 10, shadowColor: '#FF00D4' }
    }] : [];
    
    evmChart.setOption({
        backgroundColor:'transparent', tooltip:{trigger:'axis'},
        legend:{textStyle:{color:'#fff'},data:['PV (Plan)','EV (Earned)','AC (Actual)']},
        xAxis:{type:'category',data:data.dateLabels,axisLabel:{rotate:30,color:'#aaa'}},
        yAxis:{type:'value',name:'Horas',axisLabel:{color:'#aaa'},splitLine:{lineStyle:{color:'rgba(255,255,255,.05)'}}},
        series:[
            {name:'PV (Plan)',type:'line',data:data.pvData,lineStyle:{width:3,color:'#00F0FF'},areaStyle:{color:'rgba(0,240,255,.1)'},symbol:'circle',symbolSize:6},
            {name:'EV (Earned)',type:'line',data:data.evData,lineStyle:{width:4,color:'#00FFB3'},areaStyle:{color:'rgba(0,255,179,.1)'},symbol:'diamond',symbolSize:8},
            {name:'AC (Actual)',type:'line',data:data.acData,lineStyle:{width:3,color:'#FF00D4',type:'dashed'},symbol:'triangle',symbolSize:6}
        ],
        markLine: { data: markLineData, symbol: 'none', label: { show: true, position: 'middle', color: '#FF00D4', fontWeight: 'bold' } }
    });
    
    // BURNDOWN
    const burnChart = echarts.init(document.getElementById('burndownChart'));
    burnChart.setOption({
        backgroundColor:'transparent', tooltip:{trigger:'axis'},
        legend:{textStyle:{color:'#fff'},data:['Línea Ideal','Progreso Real']},
        xAxis:{type:'category',data:data.burndownLabels,axisLabel:{color:'#aaa'}},
        yAxis:{type:'value',name:'Horas Restantes',axisLabel:{color:'#aaa'},splitLine:{lineStyle:{color:'rgba(255,255,255,.05)'}}},
        series:[
            {name:'Línea Ideal',type:'line',data:data.burndownIdeal,lineStyle:{width:3,color:'#00F0FF',type:'dashed'},symbol:'none'},
            {name:'Progreso Real',type:'line',data:data.burndownReal,lineStyle:{width:4,color:'#FF00D4'},areaStyle:{color:'rgba(255,0,212,.1)'},symbol:'circle',symbolSize:8}
        ]
    });
    
    // STATUS PIE
    const statusChart = echarts.init(document.getElementById('statusChart'));
    statusChart.setOption({
        backgroundColor:'transparent', tooltip:{trigger:'item'},
        legend:{orient:'vertical',left:'left',textStyle:{color:'#fff'}},
        series:[{type:'pie',radius:['45%','75%'],data:[
            {value:data.completedTasks,name:'Completadas',itemStyle:{color:'#00FFB3'}},
            {value:data.inProgressTasks,name:'En Progreso',itemStyle:{color:'#00F0FF'}},
            {value:data.pendingTasks,name:'Pendientes',itemStyle:{color:'#7B61FF'}},
            {value:data.overdueTasks,name:'Rezagadas',itemStyle:{color:'#FF006E'}}
        ]}]
    });
    
    // RISK 3D TERRAIN - con tooltips interactivos
    const riskChart = echarts.init(document.getElementById('riskChart'));
    const riskPoints = data.riskDataPoints.map(p => [p.delayDays, p.priority, p.hours]);
    riskChart.setOption({
        backgroundColor:'transparent',
        tooltip:{ trigger: 'item', formatter: function(params) {
            const point = data.riskDataPoints[params.dataIndex];
            return `<strong style="color:#FF00D4">📌 ${point.name}</strong><br>
                    ⏱️ Retraso: ${point.delayDays} días<br>
                    🎯 Prioridad: ${point.priority === 3 ? 'ALTA' : point.priority === 2 ? 'MEDIA' : 'BAJA'}<br>
                    ⏰ Horas: ${point.hours}h<br>
                    📊 Estado: ${point.status}<br>
                    👤 Asignado: ${point.assignee}`;
        }},
        grid3D:{viewControl:{autoRotate:true,autoRotateSpeed:5},light:{main:{intensity:1.2}}},
        xAxis3D:{name:'Retraso (días)'}, yAxis3D:{name:'Prioridad'}, zAxis3D:{name:'Horas'},
        series:[{type:'scatter3D',data:riskPoints,symbolSize:12,itemStyle:{color:'#FF00D4',opacity:0.9,borderColor:'#fff',borderWidth:0.5}}]
    });
    
    // RESOURCE ALLOCATION
    const allocChart = echarts.init(document.getElementById('allocationChart'));
    allocChart.setOption({
        backgroundColor:'transparent', tooltip:{trigger:'axis',axisPointer:{type:'shadow'}},
        legend:{textStyle:{color:'#fff'},data:['Tareas asignadas','Horas registradas']},
        xAxis:{type:'category',data:data.assignees,axisLabel:{rotate:30,color:'#aaa'}},
        yAxis:{type:'value',axisLabel:{color:'#aaa'},splitLine:{lineStyle:{color:'rgba(255,255,255,.05)'}}},
        series:[
            {name:'Tareas asignadas',type:'bar',data:data.taskCounts,itemStyle:{color:'#00F0FF',borderRadius:[12,12,0,0]}},
            {name:'Horas registradas',type:'bar',data:data.hoursLogged,itemStyle:{color:'#FF00D4',borderRadius:[12,12,0,0]}}
        ]
    });
    
    // TEAM TABLE
    document.getElementById('teamTable').innerHTML = data.teamRows.map(m => `
        <div class="teamRow">
            <div><div style="font-size:18px;font-weight:700">${m.name}</div></div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:5px">
                <div style="font-size:12px">${m.hoursLogged}/${m.totalHours}h</div>
                <div class="progress"><div class="fill" style="width:${m.totalHours > 0 ? (m.hoursLogged/m.totalHours)*100 : 0}%"></div></div>
            </div>
            <div style="color:var(--green);font-weight:700">${m.efficiency}%</div>
        </div>
    `).join('');
    
    const charts = [evmChart, burnChart, statusChart, riskChart, allocChart];
    window.addEventListener('resize', () => charts.forEach(c => c.resize()));
}

// ============================================
// INICIAR
// ============================================
renderDashboard();

// Partículas de fondo
const bgCanvas = document.getElementById('bg');
if(bgCanvas && typeof THREE !== 'undefined'){
    const rendererBG = new THREE.WebGLRenderer({canvas:bgCanvas,alpha:true});
    rendererBG.setSize(window.innerWidth, window.innerHeight);
    const sceneBG = new THREE.Scene();
    const cameraBG = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    cameraBG.position.z = 5;
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for(let i = 0; i < 2500; i++) vertices.push((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15);
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const particles = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0x00ffff, size: 0.05, transparent: true, opacity: 0.6 }));
    sceneBG.add(particles);
    function animateBG(){ requestAnimationFrame(animateBG); particles.rotation.y += 0.0008; rendererBG.render(sceneBG, cameraBG); }
    animateBG();
    window.addEventListener('resize', () => { rendererBG.setSize(window.innerWidth, window.innerHeight); cameraBG.aspect = window.innerWidth / window.innerHeight; cameraBG.updateProjectionMatrix(); });
}

console.log('%c✅ HYPERION X ∞ - Dashboard cargado', 'background: linear-gradient(135deg,#00F0FF,#FF00D4); color: black; font-size: 14px; padding: 8px; border-radius: 8px;');
</script>
</body>
</html>