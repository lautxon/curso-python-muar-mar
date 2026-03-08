/* ========================================
   ESTADIO 1 — LÓGICA ESPECÍFICA
   ======================================== */

// Configurar estado del estadio
AppState.currentEstadio = '1';

/* ========================================
   LECCIÓN 1: VARIABLES
   ======================================== */
function runCode1() {
    const code = document.getElementById('code1').value;
    const output = document.getElementById('output1');
    
    output.innerHTML = '';
    
    try {
        // Simulación de ejecución (en producción usar Pyodide o backend)
        const result = simulatePythonExecution(code);
        
        if (result.success) {
            output.innerHTML += `<div class="output-line success">${result.output}</div>`;
            
            // Disparar evento para sistema MAR
            document.dispatchEvent(new CustomEvent('codeExecute', {
                detail: { success: true, lesson: 'lesson1' }
            }));
            
            // Trigger burst de celebración después de 1 segundo
            setTimeout(() => {
                triggerBurst('celebration');
            }, 1000);
        } else {
            output.innerHTML += `<div class="output-line error">${result.error}</div>`;
            
            // Disparar evento de error para sistema MAR
            document.dispatchEvent(new CustomEvent('errorDetected', {
                detail: { hint: result.hint }
            }));
        }
    } catch (e) {
        output.innerHTML += `<div class="output-line error">Error: ${e.message}</div>`;
    }
}

function clearCode1() {
    document.getElementById('code1').value = '';
    document.getElementById('output1').innerHTML = '<div class="output-line"># La salida aparecerá acá...</div>';
}

function checkVerification1(answer) {
    const feedback = document.getElementById('verification1Feedback');
    feedback.classList.remove('hidden');
    
    if (answer === 10) {
        feedback.innerHTML = '<p class="success">✅ Correcto. El último valor asignado es el que queda.</p>';
        triggerBurst('celebration');
    } else {
        feedback.innerHTML = '<p class="error">❌ Casi. Recordá: cuando reasignás, el valor anterior se reemplaza.</p>';
        triggerBurst('error-detected', { hint: 'Mirá la línea 2: ¿qué valor se asigna finalmente?' });
    }
}

/* ========================================
   LECCIÓN 2: TIPOS
   ======================================== */
function runCode2() {
    const code = document.getElementById('code2').value;
    const output = document.getElementById('output2');
    
    output.innerHTML = '';
    
    try {
        const result = simulatePythonExecution(code);
        
        if (result.success) {
            output.innerHTML += `<div class="output-line success">${result.output}</div>`;
            document.dispatchEvent(new CustomEvent('codeExecute', {
                detail: { success: true, lesson: 'lesson2' }
            }));
        } else {
            output.innerHTML += `<div class="output-line error">${result.error}</div>`;
            document.dispatchEvent(new CustomEvent('errorDetected', {
                detail: { hint: '¿Estás usando comillas para el texto?' }
            }));
        }
    } catch (e) {
        output.innerHTML += `<div class="output-line error">Error: ${e.message}</div>`;
    }
}

/* ========================================
   LECCIÓN 3: OPERACIONES
   ======================================== */
function runCode3() {
    const code = document.getElementById('code3').value;
    const output = document.getElementById('output3');
    
    output.innerHTML = '';
    
    try {
        const result = simulatePythonExecution(code);
        
        if (result.success) {
            output.innerHTML += `<div class="output-line success">${result.output}</div>`;
            document.dispatchEvent(new CustomEvent('codeExecute', {
                detail: { success: true, lesson: 'lesson3' }
            }));
        } else {
            output.innerHTML += `<div class="output-line error">${result.error}</div>`;
            document.dispatchEvent(new CustomEvent('errorDetected', {
                detail: { hint: '¿Estás operando con números o con texto?' }
            }));
        }
    } catch (e) {
        output.innerHTML += `<div class="output-line error">Error: ${e.message}</div>`;
    }
}

function completeEstadio1() {
    // Guardar progreso
    AppState.progress['estadio1'] = {
        completed: true,
        timestamp: new Date().toISOString(),
        lessons: ['lesson1', 'lesson2', 'lesson3']
    };
    
    // Disparar evento de lección completa
    document.dispatchEvent(new CustomEvent('lessonComplete', {
        detail: { lessonId: 'estadio1' }
    }));
    
    // Mostrar mensaje de celebración
    showToast('🎉 ¡Estadio 1 Completado!', 'success');
    
    // Ofrecer navegación
    setTimeout(() => {
        if (confirm('¡Felicitaciones! ¿Querés continuar al Estadio 2?')) {
            window.location.href = '../estadio2/index.html';
        }
    }, 1500);
}

/* ========================================
   SIMULADOR DE EJECUCIÓN PYTHON
   ======================================== */
function simulatePythonExecution(code) {
    // Simulación básica para prototipo
    // En producción, usar Pyodide para ejecución real de Python en el navegador
    
    const lines = code.split('\n');
    let variables = {};
    let output = [];
    
    try {
        for (const line of lines) {
            const trimmed = line.trim();
            
            if (!trimmed || trimmed.startsWith('#')) continue;
            
            // Detectar asignación: variable = valor
            const assignMatch = trimmed.match(/^(\w+)\s*=\s*(.+)$/);
            if (assignMatch) {
                const [, varName, value] = assignMatch;
                
                // Determinar tipo
                if (value.startsWith('"') || value.startsWith("'")) {
                    variables[varName] = value.slice(1, -1); // String
                } else if (!isNaN(value)) {
                    variables[varName] = Number(value); // Número
                } else if (variables[value] !== undefined) {
                    variables[varName] = variables[value]; // Otra variable
                } else {
                    // Expresión con variable existente
                    const exprMatch = value.match(/^(\w+)\s*([+\-*/])\s*(\d+)$/);
                    if (exprMatch && variables[exprMatch[1]] !== undefined) {
                        const [, existingVar, operator, num] = exprMatch;
                        const existingValue = variables[existingVar];
                        
                        if (typeof existingValue === 'number') {
                            switch (operator) {
                                case '+': variables[varName] = existingValue + Number(num); break;
                                case '-': variables[varName] = existingValue - Number(num); break;
                                case '*': variables[varName] = existingValue * Number(num); break;
                                case '/': variables[varName] = existingValue / Number(num); break;
                            }
                        } else {
                            return { success: false, error: 'TypeError: no se puede operar texto con números' };
                        }
                    } else {
                        return { success: false, error: `NameError: '${value}' no está definido`, hint: '¿Creaste esta variable antes?' };
                    }
                }
                continue;
            }
            
            // Detectar print
            const printMatch = trimmed.match(/^print\((.+)\)$/);
            if (printMatch) {
                const arg = printMatch[1];
                
                if (arg.startsWith('"') || arg.startsWith("'")) {
                    output.push(arg.slice(1, -1));
                } else if (variables[arg] !== undefined) {
                    output.push(variables[arg]);
                } else {
                    return { success: false, error: `NameError: name '${arg}' is not defined`, hint: '¿El nombre de la variable es correcto? (recordá: distingue mayúsculas)' };
                }
                continue;
            }
            
            // Si llegamos acá, sintaxis no reconocida
            return { success: false, error: `SyntaxError: línea no válida: ${trimmed}`, hint: 'Revisá la sintaxis de Python' };
        }
        
        return {
            success: true,
            output: output.join('\n') || '(sin output)'
        };
        
    } catch (e) {
        return { success: false, error: e.message };
    }
}

/* ========================================
   INICIALIZACIÓN
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    console.log('📍 Estadio 1 Loaded');
    
    // Trigger burst de bienvenida después de 5 segundos
    setTimeout(() => {
        if (!AppState.burstsTriggered.includes('welcome-estadio1')) {
            triggerBurst('welcome');
            AppState.burstsTriggered.push('welcome-estadio1');
        }
    }, 5000);
});
