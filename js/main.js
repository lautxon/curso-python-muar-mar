/* ========================================
   CONFIGURACIÓN GLOBAL
   ======================================== */
const CONFIG = {
    burstDuration: 15000, // 15 segundos máximo por ráfaga
    autoBurstDelay: 30000, // 30 segundos antes de primera ráfaga automática
    saveInterval: 5000, // Guardar progreso cada 5 segundos
    storageKey: 'pythonMuarProgress'
};

/* ========================================
   ESTADO DE LA APLICACIÓN
   ======================================== */
const AppState = {
    currentEstadio: null,
    currentLesson: null,
    progress: {},
    burstsTriggered: [],
    bitacoraEntries: []
};

/* ========================================
   INICIALIZACIÓN
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🐍 Python MUAR + MAR Course Loaded');
    loadProgress();
    initializeBurstSystem();
    setupNavigation();
});

/* ========================================
   SISTEMA DE PROGRESO
   ======================================== */
function loadProgress() {
    const saved = localStorage.getItem(CONFIG.storageKey);
    if (saved) {
        AppState.progress = JSON.parse(saved);
        updateProgressUI();
    }
}

function saveProgress() {
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(AppState.progress));
}

function updateProgressUI() {
    // Actualizar indicadores de progreso en la UI
    const progressElements = document.querySelectorAll('.progress-indicator');
    progressElements.forEach(el => {
        const estadio = el.dataset.estadio;
        if (AppState.progress[estadio]) {
            el.classList.add('completed');
        }
    });
}

/* ========================================
   SISTEMA MAR - INTERRUPCIONES
   ======================================== */
function initializeBurstSystem() {
    // Escuchar eventos de actividad del usuario
    document.addEventListener('codeExecute', handleCodeExecute);
    document.addEventListener('errorDetected', handleErrorDetected);
    document.addEventListener('lessonComplete', handleLessonComplete);
}

function triggerBurst(burstId, data = {}) {
    // Verificar si ya se activó esta ráfaga
    if (AppState.burstsTriggered.includes(burstId)) {
        return;
    }
    
    // Marcar como activada
    AppState.burstsTriggered.push(burstId);
    
    // Cargar contenido de la ráfaga
    loadBurstContent(burstId, data);
    
    // Guardar progreso
    saveProgress();
}

function loadBurstContent(burstId, data) {
    // En producción, esto cargaría desde data/burst-content.json
    const burstData = getBurstData(burstId, data);
    
    if (!burstData) {
        console.warn(`Burst ${burstId} no encontrado`);
        return;
    }
    
    showBurstModal(burstData);
}

function getBurstData(burstId, data) {
    // Datos de ejemplo (en producción venir de JSON externo)
    const bursts = {
        'welcome': {
            icon: '🐍',
            title: '¡Bienvenido!',
            message: 'Soy Python. Voy a acompañarte en este curso. Las interrupciones que veas son para ayudarte, no para distraerte. Podés saltarlas cuando quieras.',
            timer: 10,
            actions: [
                { text: '✅ Comenzar', class: 'btn-primary', callback: 'closeBurst' },
                { text: '🔇 Saltar', class: 'btn-secondary', callback: 'closeBurst' }
            ]
        },
        'error-detected': {
            icon: '⚠️',
            title: 'Python detectó un error',
            message: `¿Viste ese error? Es normal. ${data.hint || 'Revisá la sintaxis y probá de nuevo.'}`,
            timer: 15,
            actions: [
                { text: '🔧 Arreglar', class: 'btn-primary', callback: 'closeBurst' },
                { text: '💡 Ver pista', class: 'btn-secondary', callback: 'showHint' },
                { text: '⏭️ Saltar', class: 'btn-secondary', callback: 'closeBurst' }
            ]
        },
        'concept-check': {
            icon: '🎯',
            title: 'Verificación Rápida',
            message: data.question,
            timer: 10,
            options: data.options,
            actions: [
                { text: '✅ Verificar', class: 'btn-primary', callback: 'checkAnswer' },
                { text: '⏭️ Saltar', class: 'btn-secondary', callback: 'closeBurst' }
            ]
        },
        'celebration': {
            icon: '🎉',
            title: '¡Excelente!',
            message: 'Completaste este desafío. Tu código funciona. ¿Querés probar algo más complejo o continuar?',
            timer: 8,
            actions: [
                { text: '🚀 Continuar', class: 'btn-primary', callback: 'closeBurst' },
                { text: '🔄 Practicar más', class: 'btn-secondary', callback: 'repeatExercise' }
            ]
        }
    };
    
    return bursts[burstId] || null;
}

function showBurstModal(burstData) {
    const modal = document.getElementById('marBurstModal');
    if (!modal) {
        createBurstModal();
    }
    
    const content = document.querySelector('.burst-content');
    content.innerHTML = `
        <button class="burst-close" onclick="closeBurst()">×</button>
        <div class="burst-icon">${burstData.icon}</div>
        <div class="burst-title">${burstData.title}</div>
        <div class="burst-timer">⏱️ ${burstData.timer} segundos</div>
        <div class="burst-message">${burstData.message}</div>
        ${burstData.options ? renderBurstOptions(burstData.options) : ''}
        <div class="burst-actions">
            ${burstData.actions.map(action => `
                <button class="btn ${action.class}" onclick="${action.callback}()">
                    ${action.text}
                </button>
            `).join('')}
        </div>
    `;
    
    modal.classList.add('active');
    startBurstTimer(burstData.timer);
}

function createBurstModal() {
    const modal = document.createElement('div');
    modal.id = 'marBurstModal';
    modal.className = 'mar-burst-modal';
    modal.innerHTML = '<div class="burst-content"></div>';
    document.body.appendChild(modal);
}

function renderBurstOptions(options) {
    return `
        <div class="burst-options">
            ${options.map((opt, i) => `
                <div class="burst-option" data-value="${opt.value}" onclick="selectBurstOption(this)">
                    ${opt.label}
                </div>
            `).join('')}
        </div>
    `;
}

function startBurstTimer(seconds) {
    let remaining = seconds;
    const timerEl = document.querySelector('.burst-timer');
    
    const interval = setInterval(() => {
        remaining--;
        timerEl.textContent = `⏱️ ${remaining} segundos`;
        
        if (remaining <= 0) {
            clearInterval(interval);
        }
    }, 1000);
}

function closeBurst() {
    const modal = document.getElementById('marBurstModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

/* ========================================
   EVENT HANDLERS
   ======================================== */
function handleCodeExecute(event) {
    // Activar ráfaga de celebración si el código funciona
    if (event.detail.success) {
        setTimeout(() => {
            triggerBurst('celebration');
        }, 1000);
    }
}

function handleErrorDetected(event) {
    // Activar ráfaga de ayuda cuando hay error
    setTimeout(() => {
        triggerBurst('error-detected', {
            hint: event.detail.hint || 'Revisá la sintaxis'
        });
    }, 1500);
}

function handleLessonComplete(event) {
    // Guardar progreso de lección completada
    const lessonId = event.detail.lessonId;
    AppState.progress[lessonId] = {
        completed: true,
        timestamp: new Date().toISOString(),
        estadio: AppState.currentEstadio
    };
    saveProgress();
}

/* ========================================
   NAVEGACIÓN
   ======================================== */
function setupNavigation() {
    // Manejar navegación entre estadios
    document.querySelectorAll('[data-estadio]').forEach(card => {
        card.addEventListener('click', () => {
            AppState.currentEstadio = card.dataset.estadio;
            saveProgress();
        });
    });
}

/* ========================================
   UTILIDADES
   ======================================== */
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('active');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('active');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function exportProgress() {
    const data = JSON.stringify(AppState.progress, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `python-muar-progreso-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
}

/* ========================================
   EXPORTAR PARA USO EXTERNO
   ======================================== */
window.MuarCourse = {
    triggerBurst,
    closeBurst,
    saveProgress,
    exportProgress,
    showToast,
    AppState
};