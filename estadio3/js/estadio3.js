/* ========================================
   ESTADIO 3 — LÓGICA ESPECÍFICA
   ======================================== */

// Configurar estado del estadio
AppState.currentEstadio = '3';

// Estado del proyecto
const projectState = {
    definition: null,
    phase1Complete: false,
    phase2Complete: false,
    phase3Complete: false,
    phase4Complete: false,
    portfolio: null,
    evaluation: null
};

/* ========================================
   FASE 1: DEFINICIÓN DEL PROYECTO
   ======================================== */
function selectProjectIdea(ideaType) {
    const ideas = {
        'biblioteca': {
            name: 'Biblioteca Personal',
            description: 'Gestión de libros personales con estado de lectura',
            entities: 'Libros (título, autor, año, estado, fecha_lectura)',
            functions: 'agregar_libro(), buscar_por_autor(), prestar_libro(), mostrar_todos(), estadisticas()'
        },
        'peliculas': {
            name: 'Películas Vistas',
            description: 'Registro y rating de películas vistas',
            entities: 'Películas (título, género, director, año, rating, fecha_vista)',
            functions: 'agregar_pelicula(), buscar_por_genero(), calcular_promedio(), recomendadas()'
        },
        'gastos': {
            name: 'Control de Gastos',
            description: 'Seguimiento de gastos personales o familiares',
            entities: 'Gastos (categoría, monto, fecha, descripción, método_pago)',
            functions: 'agregar_gasto(), total_por_categoria(), presupuesto_restante(), reporte_mensual()'
        },
        'inventario': {
            name: 'Inventario de Tienda',
            description: 'Gestión de productos y stock',
            entities: 'Productos (nombre, precio, stock, categoría, proveedor)',
            functions: 'agregar_producto(), actualizar_stock(), buscar_producto(), alerta_stock_bajo()'
        },
        'personalizado': {
            name: 'Proyecto Personalizado',
            description: 'Tu propia idea de sistema de gestión',
            entities: 'Definí tus propias entidades',
            functions: 'Definí tus propias funciones'
        }
    };
    
    const idea = ideas[ideaType];
    document.getElementById('projectName').value = idea.name;
    document.getElementById('projectDescription').value = idea.description;
    document.getElementById('projectEntities').value = idea.entities;
    document.getElementById('projectFunctions').value = idea.functions;
    
    triggerBurst('project-idea-selected', {
        message: `¡Buena elección! ${idea.name} es un proyecto viable. Ahora completá los detalles.`
    });
}

function saveProjectDefinition() {
    const name = document.getElementById('projectName').value;
    const description = document.getElementById('projectDescription').value;
    const entities = document.getElementById('projectEntities').value;
    const functions = document.getElementById('projectFunctions').value;
    
    if (!name || !description) {
        showToast('⚠️ Completá al menos nombre y descripción', 'warning');
        triggerBurst('incomplete-definition', {
            message: 'Necesitás definir al menos el nombre y qué hace tu sistema.'
        });
        return;
    }
    
    projectState.definition = {
        name,
        description,
        entities,
        functions,
        timestamp: new Date().toISOString()
    };
    
    // Guardar en progreso
    AppState.progress['estadio3'] = {
        ...AppState.progress['estadio3'],
        definition: projectState.definition
    };
    saveProgress();
    
    showToast('💾 Definición guardada', 'success');
    triggerBurst('phase1-complete', {
        message: '¡Fase 1 completada! Ahora diseñá la estructura de datos.'
    });
    
    // Scroll a fase 2
    document.getElementById('phase2').scrollIntoView({ behavior: 'smooth' });
}

function updatePhaseProgress(phaseNum) {
    const checks = document.querySelectorAll(`#phase${phaseNum} .checklist-item input[type="checkbox"]`);
    const allChecked = Array.from(checks).every(c => c.checked);
    
    if (allChecked) {
        projectState[`phase${phaseNum}Complete`] = true;
        document.getElementById(`phase${phaseNum}Feedback`).innerHTML = '<p class="success">✅ Fase completada. Podés continuar.</p>';
        document.getElementById(`phase${phaseNum}Feedback`).classList.remove('hidden');
        
        triggerBurst('phase-complete', {
            message: `¡Fase ${phaseNum} completada! ${phaseNum < 4 ? 'Seguí con la próxima fase.' : '¡Proyecto terminado!'}`
        });
    }
}

/* ========================================
   FASE 2: ESTRUCTURA DE DATOS
   ======================================== */
function runCodePhase2() {
    const code = document.getElementById('code-phase2').value;
    const output = document.getElementById('output-phase2');
    
    output.innerHTML = '';
    
    try {
        const result = simulatePythonExecution(code, { allowLists: true, allowDicts: true });
        
        if (result.success) {
            output.innerHTML += `<div class="output-line success">${result.output}</div>`;
            output.innerHTML += `<div class="output-line" style="color: var(--python-yellow);"># Estructura válida. Podés continuar a Fase 3.</div>`;
            
            projectState.phase2Complete = true;
            
            document.dispatchEvent(new CustomEvent('codeExecute', {
                detail: { success: true, lesson: 'phase2', estadio: '3' }
            }));
        } else {
            output.innerHTML += `<div class="output-line error">${result.error}</div>`;
            
            document.dispatchEvent(new CustomEvent('errorDetected', {
                detail: { 
                    hint: result.hint || 'Revisá la sintaxis de listas y diccionarios',
                    errorType: 'structure-error'
                }
            }));
        }
    } catch (e) {
        output.innerHTML += `<div class="output-line error">Error: ${e.message}</div>`;
    }
}

function clearCodePhase2() {
    document.getElementById('code-phase2').value = '';
    document.getElementById('output-phase2').innerHTML = '<div class="output-line"># La estructura aparecerá acá...</div>';
}

/* ========================================
   FASE 3: FUNCIONES Y LÓGICA
   ======================================== */
function runCodePhase3() {
    const code = document.getElementById('code-phase3').value;
    const output = document.getElementById('output-phase3');
    
    output.innerHTML = '';
    
    try {
        const result = simulatePythonExecution(code, { 
            allowLists: true, 
            allowDicts: true, 
            allowFunctions: true 
        });
        
        if (result.success) {
            output.innerHTML += `<div class="output-line success">${result.output}</div>`;
            output.innerHTML += `<div class="output-line" style="color: var(--python-yellow);"># Funciones ejecutadas correctamente.</div>`;
            
            projectState.phase3Complete = true;
            
            document.dispatchEvent(new CustomEvent('codeExecute', {
                detail: { success: true, lesson: 'phase3', estadio: '3' }
            }));
        } else {
            output.innerHTML += `<div class="output-line error">${result.error}</div>`;
            
            document.dispatchEvent(new CustomEvent('errorDetected', {
                detail: { 
                    hint: result.hint || 'Revisá la definición y llamada de funciones',
                    errorType: 'function-error'
                }
            }));
        }
    } catch (e) {
        output.innerHTML += `<div class="output-line error">Error: ${e.message}</div>`;
    }
}

function clearCodePhase3() {
    document.getElementById('code-phase3').value = '';
    document.getElementById('output-phase3').innerHTML = '';
}

/* ========================================
   FASE 4: INTEGRACIÓN Y PORTAFOLIO
   ======================================== */
function runCodePhase4() {
    const code = document.getElementById('code-phase4').value;
    const output = document.getElementById('output-phase4');
    
    output.innerHTML = '';
    
    try {
        const result = simulatePythonExecution(code, { 
            allowLists: true, 
            allowDicts: true, 
            allowFunctions: true 
        });
        
        if (result.success) {
            output.innerHTML += `<div class="output-line success">${result.output}</div>`;
            output.innerHTML += `<div class="output-line success" style="margin-top: 10px;">🎉 ¡Tu proyecto funciona!</div>`;
            
            projectState.phase4Complete = true;
            
            document.dispatchEvent(new CustomEvent('codeExecute', {
                detail: { success: true, lesson: 'phase4', estadio: '3' }
            }));
            
            setTimeout(() => {
                triggerBurst('project-working', {
                    message: '¡Tu proyecto funciona! Ahora completá el portafolio y la autoevaluación.'
                });
            }, 1500);
        } else {
            output.innerHTML += `<div class="output-line error">${result.error}</div>`;
            
            document.dispatchEvent(new CustomEvent('errorDetected', {
                detail: { 
                    hint: result.hint || 'Revisá todo el código en busca de errores',
                    errorType: 'integration-error'
                }
            }));
        }
    } catch (e) {
        output.innerHTML += `<div class="output-line error">Error: ${e.message}</div>`;
    }
}

function clearCodePhase4() {
    document.getElementById('code-phase4').value = '';
    document.getElementById('output-phase4').innerHTML = '';
}

function completeEstadio3() {
    // Verificar que todas las fases estén completas
    const allPhasesComplete = 
        projectState.phase1Complete && 
        projectState.phase2Complete && 
        projectState.phase3Complete && 
        projectState.phase4Complete;
    
    if (!allPhasesComplete) {
        showToast('⚠️ Completá todas las fases primero', 'warning');
        triggerBurst('incomplete-project', {
            message: 'Todavía hay fases sin completar. Revisá los checklists de cada fase.'
        });
        return;
    }
    
    // Guardar progreso final
    AppState.progress['estadio3'] = {
        completed: true,
        timestamp: new Date().toISOString(),
        phases: ['phase1', 'phase2', 'phase3', 'phase4'],
        project: projectState.definition,
        estadio: '3'
    };
    
    // Marcar curso como completado
    AppState.progress['cursoCompleto'] = {
        completed: true,
        timestamp: new Date().toISOString(),
        estadios: ['1', '2', '3']
    };
    
    saveProgress();
    
    // Disparar evento de curso completo
    document.dispatchEvent(new CustomEvent('cursoComplete', {
        detail: { courseId: 'python-muar' }
    }));
    
    // Mostrar certificado
    document.getElementById('certificateSection').classList.remove('hidden');
    document.getElementById('certName').textContent = 'Estudiante'; // Podría personalizarse
    document.getElementById('certDate').textContent = `Fecha: ${new Date().toLocaleDateString()}`;
    document.getElementById('certProject').textContent = `Proyecto: ${projectState.definition?.name || 'Proyecto Integrador'}`;
    
    // Celebración
    showToast('🎉 ¡Curso Completado!', 'success');
    triggerBurst('curso-completo', {
        message: '¡Felicitaciones! Completaste los 3 estadios. Sos capaz de construir sistemas reales con Python.'
    });
    
    // Scroll al certificado
    document.getElementById('certificateSection').scrollIntoView({ behavior: 'smooth' });
}

/* ========================================
   PORTAFOLIO
   ======================================== */
function savePortfolio() {
    const title = document.getElementById('portfolioTitle').value;
    const description = document.getElementById('portfolioDescription').value;
    const challenges = document.getElementById('portfolioChallenges').value;
    const future = document.getElementById('portfolioFuture').value;
    
    if (!title || !description) {
        showToast('⚠️ Completá al menos título y descripción', 'warning');
        return;
    }
    
    projectState.portfolio = {
        title,
        description,
        challenges,
        future,
        timestamp: new Date().toISOString()
    };
    
    AppState.progress['estadio3'].portfolio = projectState.portfolio;
    saveProgress();
    
    showToast('💾 Portafolio guardado', 'success');
    triggerBurst('portfolio-saved', {
        message: 'Tu portafolio está guardado. Podés exportarlo o compartirlo cuando quieras.'
    });
}

function exportPortfolio() {
    if (!projectState.portfolio) {
        showToast('⚠️ Guardá el portafolio primero', 'warning');
        return;
    }
    
    const content = `
PORTAFOLIO DE PROYECTO - PYTHON MUAR
=====================================

Título: ${projectState.portfolio.title}
Fecha: ${new Date().toLocaleDateString()}

DESCRIPCIÓN:
${projectState.portfolio.description}

DESAFÍOS Y SOLUCIONES:
${projectState.portfolio.challenges || 'Sin completar'}

PRÓXIMOS PASOS:
${projectState.portfolio.future || 'Sin completar'}

CÓDIGO DEL PROYECTO:
${document.getElementById('code-phase4').value}

=====================================
Generado con Python MUAR + MAR
    `.trim();
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portafolio-${projectState.portfolio.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
    a.click();
    
    showToast('📥 Portafolio exportado', 'success');
}

function sharePortfolio() {
    // En producción, esto generaría un link único
    showToast('🔗 Link de compartir generado (simulado)', 'info');
    triggerBurst('share-info', {
        message: 'En una versión publicada, esto generaría un link único para compartir tu portafolio.'
    });
}

/* ========================================
   AUTOEVALUACIÓN
   ======================================== */
let evaluationScores = {
    tecnica: 0,
    conceptual: 0,
    conexion: 0,
    metacognicion: 0
};

// Setup star ratings
document.querySelectorAll('.rating-stars').forEach(container => {
    const dimension = container.dataset.dimension;
    const stars = container.querySelectorAll('.star');
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = parseInt(star.dataset.value);
            evaluationScores[dimension] = value;
            
            // Update visual
            stars.forEach((s, i) => {
                s.textContent = i < value ? '★' : '☆';
            });
        });
    });
});

function saveEvaluation() {
    const allRated = Object.values(evaluationScores).every(v => v > 0);
    
    if (!allRated) {
        showToast('⚠️ Evaluá todas las dimensiones', 'warning');
        return;
    }
    
    projectState.evaluation = {
        ...evaluationScores,
        timestamp: new Date().toISOString()
    };
    
    AppState.progress['estadio3'].evaluation = projectState.evaluation;
    saveProgress();
    
    showToast('💾 Autoevaluación guardada', 'success');
    triggerBurst('evaluation-complete', {
        message: 'Tu autoevaluación está guardada. Usala para reflexionar sobre tu aprendizaje.'
    });
}

/* ========================================
   CERTIFICADO
   ======================================== */
function downloadCertificate() {
    // En producción, esto generaría un PDF real
    const certContent = `
CERTIFICADO DE COMPLETACIÓN
===========================

Nombre: Estudiante
Curso: Python con MUAR 2.1 + MAR 1.0
Fecha: ${new Date().toLocaleDateString()}
Proyecto: ${projectState.definition?.name || 'Proyecto Integrador'}

Este certificado acredita la completación exitosa de los 3 estadios
del curso, incluyendo un proyecto integrador funcional.

===========================
Python MUAR Course
    `.trim();
    
    const blob = new Blob([certContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificado-python-muar.txt`;
    a.click();
    
    showToast('📥 Certificado descargado', 'success');
}

function shareCertificate() {
    showToast('🔗 Link para compartir generado (simulado)', 'info');
}

/* ========================================
   SIMULADOR DE EJECUCIÓN PYTHON (Estadio 3)
   ======================================== */
// Reutiliza la función del Estadio 2 pero con soporte completo
function simulatePythonExecution(code, options = {}) {
    // Para Estadio 3, usamos la misma función que Estadio 2
    // pero con todas las opciones habilitadas por defecto
    return window.simulatePythonExecution ? 
        window.simulatePythonExecution(code, { 
            allowLists: true, 
            allowDicts: true, 
            allowFunctions: true 
        }) : 
        { success: false, error: 'Simulador no disponible' };
}

/* ========================================
   INICIALIZACIÓN
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌐 Estadio 3 Loaded');
    
    // Cargar progreso guardado
    loadProgress();
    
    // Si hay definición guardada, restaurarla
    if (AppState.progress['estadio3']?.definition) {
        const def = AppState.progress['estadio3'].definition;
        document.getElementById('projectName').value = def.name || '';
        document.getElementById('projectDescription').value = def.description || '';
        document.getElementById('projectEntities').value = def.entities || '';
        document.getElementById('projectFunctions').value = def.functions || '';
    }
    
    // Trigger burst de bienvenida
    setTimeout(() => {
        if (!AppState.burstsTriggered.includes('welcome-estadio3')) {
            triggerBurst('welcome-estadio3', {
                message: 'Estadio 3: Acá no hay lecciones guiadas. Hay un proyecto que VOS diseñás. Usá todo lo aprendido. No hay una respuesta correcta.'
            });
            AppState.burstsTriggered.push('welcome-estadio3');
        }
    }, 5000);
    
    // Cargar historial de bitácora
    loadBitacoraHistory();
    
    // Cargar portafolio si existe
    if (AppState.progress['estadio3']?.portfolio) {
        const p = AppState.progress['estadio3'].portfolio;
        document.getElementById('portfolioTitle').value = p.title || '';
        document.getElementById('portfolioDescription').value = p.description || '';
        document.getElementById('portfolioChallenges').value = p.challenges || '';
        document.getElementById('portfolioFuture').value = p.future || '';
    }
    
    // Cargar evaluación si existe
    if (AppState.progress['estadio3']?.evaluation) {
        const e = AppState.progress['estadio3'].evaluation;
        Object.keys(evaluationScores).forEach(dim => {
            if (e[dim]) {
                evaluationScores[dim] = e[dim];
                const container = document.querySelector(`.rating-stars[data-dimension="${dim}"]`);
                if (container) {
                    const stars = container.querySelectorAll('.star');
                    stars.forEach((s, i) => {
                        s.textContent = i < e[dim] ? '★' : '☆';
                    });
                }
            }
        });
    }
});

/* ========================================
   BURST CONTENT FOR ESTADIO 3
   ======================================== */
// Estos se cargan desde data/burst-content.json pero acá hay fallbacks
const estadio3Bursts = {
    'welcome-estadio3': {
        icon: '🌐',
        title: 'Bienvenido al Estadio 3',
        message: 'Estadio 3: Acá no hay lecciones guiadas. Hay un proyecto que VOS diseñás. Usá todo lo aprendido. No hay una respuesta correcta.',
        duration: 15,
        actions: [
            { text: '✅ Comenzar Proyecto', class: 'btn-primary', callback: 'closeBurst' },
            { text: '🔇 Saltar', class: 'btn-secondary', callback: 'closeBurst' }
        ]
    },
    'phase1-guidance': {
        icon: '🎯',
        title: 'Consejo para Definir tu Proyecto',
        message: 'Elegí algo que te importe de verdad. Si el proyecto resuelve un problema real para vos, vas a tener más motivación para completarlo.',
        duration: 12,
        actions: [
            { text: '✅ Entendido', class: 'btn-primary', callback: 'closeBurst' },
            { text: '🔇 Saltar', class: 'btn-secondary', callback: 'closeBurst' }
        ]
    },
    'phase2-structures': {
        icon: '📊',
        title: 'Estructuras de Datos',
        message: 'Lista de diccionarios es más flexible para sistemas complejos. Diccionario de listas es más simple para datos homogéneos. Ambas funcionan.',
        duration: 15,
        actions: [
            { text: '✅ Probemos', class: 'btn-primary', callback: 'closeBurst' },
            { text: '🔇 Saltar', class: 'btn-secondary', callback: 'closeBurst' }
        ]
    },
    'curso-completo': {
        icon: '🏆',
        title: '¡Curso Completado!',
        message: 'Felicitaciones. Completaste los 3 estadios. Ahora podés construir sistemas reales con Python. Esto es solo el comienzo.',
        duration: 15,
        actions: [
            { text: '📥 Descargar Certificado', class: 'btn-primary', callback: 'downloadCertificate' },
            { text: '📓 Guardar Reflexión', class: 'btn-secondary', callback: 'openBitacora' }
        ]
    }
};
