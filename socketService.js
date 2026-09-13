import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";

class RealTimeCollaboration {
    constructor() {
        this.socket = null;
        this.currentProjectId = null;
        this.userId = localStorage.getItem('userId') || localStorage.getItem('uid') || 'anonimo';
        this.userName = localStorage.getItem('userName') || localStorage.getItem('userEmail') || 'Usuario';
        this.backendUrl = "https://mi-sistema-proyectos-backend-4.onrender.com"; 
    }

    connect() {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.warn("⚠️ No hay authToken en localStorage.");
            return;
        }
        
        this.socket = io(this.backendUrl, {
            auth: { token: token },
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        });

        this.socket.on('connect', () => {
            console.log('✅ Socket conectado:', this.socket.id);
            this.socket.emit('register-user', { userId: this.userId, name: this.userName });
        });

        this.setupListeners();
    }

    setupListeners() {
        this.socket.on('user-joined', (data) => {
            this.mostrarNotificacion(`🟢 ${data.userName || 'Un colaborador'} se unió`, 'success');
        });

        this.socket.on('user-left', (data) => {
            this.mostrarNotificacion(`🔴 ${data.userName || 'Un colaborador'} salió`, 'info');
        });

        this.socket.on('task-created', (data) => {
            if (data.userId !== this.userId && window.agregarTareaAlDOM) {
                window.agregarTareaAlDOM(data.task, data.projectId);
                this.mostrarNotificacion(`✏️ ${data.userName} creó: ${data.task.name}`, 'info');
            }
        });

        this.socket.on('task-moved', (data) => {
            if (data.userId !== this.userId && window.moverTareaEnDOM) {
                window.moverTareaEnDOM(data.taskId, data.targetStatus, data.projectId);
                this.mostrarNotificacion(`🔄 ${data.userName} movió una tarea a "${data.targetStatus}"`, 'info');
            }
        });

        this.socket.on('task-deleted', (data) => {
            if (data.userId !== this.userId && window.eliminarTareaDelDOM) {
                window.eliminarTareaDelDOM(data.taskId, data.projectId);
                this.mostrarNotificacion(`🗑️ ${data.userName} eliminó una tarea`, 'warning');
            }
        });
    }

    joinProject(projectId) {
        if (!this.socket || !this.socket.connected) {
            this.connect();
            setTimeout(() => this.joinProject(projectId), 1500);
            return;
        }
        this.currentProjectId = projectId;
        this.socket.emit('join-project', projectId);
        console.log(`📁 Unido a la sala: project-${projectId}`);
    }

    emitirTareaCreada(taskData, projectId) {
        if (this.socket) this.socket.emit('task-created', { task: taskData, projectId, userId: this.userId, userName: this.userName });
    }

    emitirTareaMovida(taskId, targetStatus, projectId, taskName) {
        if (this.socket) this.socket.emit('task-moved', { taskId, targetStatus, projectId, task: { name: taskName }, userId: this.userId, userName: this.userName });
    }

    emitirTareaEliminada(taskId, projectId, taskName) {
        if (this.socket) this.socket.emit('task-deleted', { taskId, projectId, task: { name: taskName }, userId: this.userId, userName: this.userName });
    }

    mostrarNotificacion(mensaje, tipo = 'info') {
        const toast = document.createElement('div');
        const colores = { success: '#2ecc71', warning: '#f39c12', info: '#3498db', error: '#e74c3c' };
        toast.style.cssText = `position: fixed; bottom: 20px; right: 20px; background: ${colores[tipo] || colores.info}; color: white; padding: 15px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 99999; font-family: sans-serif; font-size: 14px; animation: slideIn 0.3s ease;`;
        toast.textContent = mensaje;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }
}

export const collaboration = new RealTimeCollaboration();