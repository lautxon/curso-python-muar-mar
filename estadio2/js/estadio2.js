/* ========================================
   ESTADIO 2 — LÓGICA ESPECÍFICA
   ======================================== */

// Configurar estado del estadio
AppState.currentEstadio = '2';

// Tracking de lecciones completadas
const estadio2Progress = {
    lesson1: false,
    lesson2: false,
    lesson3: false,
    lesson4: false
};

/* ========================================
   LECCIÓN 1: LISTAS
   ======================================== */
function runCode1() {
    const code = document.getElementById('code1').value;
    const output = document.getElementById('output1');
    
    output.innerHTML = '';
    
    try {
        const result = simulatePythonExecution(code, { allowLists: true });
        
        if (result.success) {
            output.innerHTML += `<div class="output-line success">${result.output}</div>`;
            
            document.dispatchEvent(new CustomEvent('codeExecute', {
                detail: { success: true, lesson: 'lesson1', estadio: '2' }
            }));
            
            // Marcar lección como completada
            estadio2Progress.lesson1 = true;
            updateProgressCircle(1);
            
            setTimeout(() => {
                triggerBurst('celebration-lesson');
            }, 1000);
        } else {
            output.innerHTML += `<div class="output-line error">${result.error}</div>`;
            
            document.dispatchEvent(new CustomEvent('errorDetected', {
                detail: { 
                    hint: result.hint || 'Revisá la sintaxis de listas: usa corchetes [] y comas para separar elementos',
                    errorType: 'list-error'
                }
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

function loadExample1() {
    document.getElementById('code1').value = `frutas = ["manzana", "banana", "naranja"]
print(frutas[0])
print(frutas[1])
print(frutas[2])`;
    updateCodeDisplay('code1');
}

function checkVerification1(answer) {
    const feedback = document.getElementById('verification1Feedback');
    feedback.classList.remove('hidden');
    
    if (answer === 20) {
        feedback.innerHTML = '<p class="success">✅ Correcto. Los índices empiezan en 0, así que [1] es el segundo elemento.</p>';
        triggerBurst('celebration-quick');
    } else {
        feedback.innerHTML = '<p class="error">❌ Recordá: los índices de lista empiezan en 0. [0]=10, [1]=20, [2]=30</p>';
        triggerBurst('error-detected', { hint: 'Contá desde 0: posición 0 es el primer elemento' });
    }
}

/* ========================================
   LECCIÓN 2: MÉTODOS DE LISTAS
   ======================================== */
function runCode2() {
    const code = document.getElementById('code2').value;
    const output = document.getElementById('output2');
    
    output.innerHTML = '';
    
    try {
        const result = simulatePythonExecution(code, { allowLists: true, allowMethods: true });
        
        if (result.success) {
            output.innerHTML += `<div class="output-line success">${result.output}</div>`;
            
            document.dispatchEvent(new CustomEvent('codeExecute', {
                detail: { success: true, lesson: 'lesson2', estadio: '2' }
            }));
            
            estadio2Progress.lesson2 = true;
            updateProgressCircle(2);
        } else {
            output.innerHTML += `<div class="output-line error">${result.error}</div>`;
            
            document.dispatchEvent(new CustomEvent('errorDetected', {
                detail: { 
                    hint: result.hint || '¿Usaste .append() para agregar elementos?',
                    errorType: 'method-error'
                }
            }));
        }
    } catch (e) {
        output.innerHTML += `<div class="output-line error">Error: ${e.message}</div>`;
    }
}

function clearCode2() {
    document.getElementById('code2').value = '';
    document.getElementById('output2').innerHTML = '';
}

/* ========================================
   LECCIÓN 3: DICCIONARIOS
   ======================================== */
function runCode3() {
    const code = document.getElementById('code3').value;
    const output = document.getElementById('output3');
    
    output.innerHTML = '';
    
    try {
        const result = simulatePythonExecution(code, { allowDicts: true });
        
        if (result.success) {
            output.innerHTML += `<div class="output-line success">${result.output}</div>`;
            
            document.dispatchEvent(new CustomEvent('codeExecute', {
                detail: { success: true, lesson: 'lesson3', estadio: '2' }
            }));
            
            estadio2Progress.lesson3 = true;
            updateProgressCircle(3);
            
            setTimeout(() => {
                triggerBurst('estadio2-dicts', {
                    message: 'Los diccionarios son como agendas. Buscás por clave, no por posición.'
                });
            }, 1500);
        } else {
            output.innerHTML += `<div class="output-line error">${result.error}</div>`;
            
            document.dispatchEvent(new CustomEvent('errorDetected', {
                detail: { 
                    hint: result.hint || 'Los diccionarios usan llaves {} y pares clave: valor',
                    errorType: 'dict-error'
                }
            }));
        }
    } catch (e) {
        output.innerHTML += `<div class="output-line error">Error: ${e.message}</div>`;
    }
}

function clearCode3() {
    document.getElementById('code3').value = '';
    document.getElementById('output3').innerHTML = '';
}

function checkVerification3(answer) {
    const feedback = document.getElementById('verification3Feedback');
    feedback.classList.remove('hidden');
    
    if (answer === 'datos["edad"]') {
        feedback.innerHTML = '<p class="success">✅ Correcto. En diccionarios se accede por clave, no por índice numérico.</p>';
        triggerBurst('celebration-quick');
    } else {
        feedback.innerHTML = '<p class="error">❌ Los diccionarios usan claves (texto), no índices numéricos como las listas.</p>';
        triggerBurst('error-detected', { hint: 'Usá la clave entre corchetes: datos["edad"]' });
    }
}

/* ========================================
   LECCIÓN 4: FUNCIONES
   ======================================== */
function runCode4() {
    const code = document.getElementById('code4').value;
    const output = document.getElementById('output4');
    
    output.innerHTML = '';
    
    try {
        const result = simulatePythonExecution(code, { allowFunctions: true });
        
        if (result.success) {
            output.innerHTML += `<div class="output-line success">${result.output}</div>`;
            
            document.dispatchEvent(new CustomEvent('codeExecute', {
                detail: { success: true, lesson: 'lesson4', estadio: '2' }
            }));
            
            estadio2Progress.lesson4 = true;
            updateProgressCircle(4);
            
            setTimeout(() => {
                triggerBurst('celebration-estadio', {
                    message: '¡Completaste todas las lecciones del Estadio 2!'
                });
            }, 1000);
        } else {
            output.innerHTML += `<div class="output-line error">${result.error}</div>`;
            
            document.dispatchEvent(new CustomEvent('errorDetected', {
                detail: { 
                    hint: result.hint || 'Recordá: def para definir, indentación consistente, return para devolver valores',
                    errorType: 'function-error'
                }
            }));
        }
    } catch (e) {
        output.innerHTML += `<div class="output-line error">Error: ${e.message}</div>`;
    }
}

function clearCode4() {
    document.getElementById('code4').value = '';
    document.getElementById('output4').innerHTML = '';
}

function completeEstadio2() {
    // Verificar que todas las lecciones estén completadas
    const allComplete = Object.values(estadio2Progress).every(v => v === true);
    
    if (!allComplete) {
        showToast('⚠️ Completá todas las lecciones primero', 'warning');
        triggerBurst('incomplete-estadio', {
            message: 'Todavía hay lecciones sin completar. ¿Querés que te muestre cuáles faltan?'
        });
        return;
    }
    
    // Guardar progreso
    AppState.progress['estadio2'] = {
        completed: true,
        timestamp: new Date().toISOString(),
        lessons: ['lesson1', 'lesson2', 'lesson3', 'lesson4'],
        estadio: '2'
    };
    
    // Disparar evento de estadio completo
    document.dispatchEvent(new CustomEvent('estadioComplete', {
        detail: { estadioId: 'estadio2' }
    }));
    
    // Mostrar celebración
    showToast('🎉 ¡Estadio 2 Completado!', 'success');
    
    // Ofrecer navegación
    setTimeout(() => {
        const nextStep = confirm('¡Felicitaciones! Completaste el Estadio 2.\n\n¿Querés continuar al Estadio 3 (Proyecto Integrador)?');
        if (nextStep) {
            window.location.href = '../estadio3/index.html';
        }
    }, 1500);
}

/* ========================================
   SIMULADOR DE EJECUCIÓN PYTHON (Estadio 2)
   ======================================== */
function simulatePythonExecution(code, options = {}) {
    const { allowLists = false, allowDicts = false, allowMethods = false, allowFunctions = false } = options;
    
    const lines = code.split('\n');
    let variables = {};
    let output = [];
    let functions = {};
    
    try {
        // Primero, detectar y guardar funciones
        if (allowFunctions) {
            const funcPattern = /^def\s+(\w+)\s*\(([^)]*)\)\s*:/;
            let inFunction = false;
            let currentFunc = null;
            let funcLines = [];
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                const funcMatch = line.match(funcPattern);
                
                if (funcMatch) {
                    inFunction = true;
                    currentFunc = funcMatch[1];
                    funcLines = [line];
                } else if (inFunction) {
                    if (line.trim() && !line.startsWith(' ') && !line.startsWith('\t')) {
                        // Fin de la función
                        functions[currentFunc] = funcLines;
                        inFunction = false;
                        currentFunc = null;
                        i--; // Volver a procesar esta línea
                    } else {
                        funcLines.push(line);
                    }
                }
            }
            
            // Guardar última función si existe
            if (currentFunc) {
                functions[currentFunc] = funcLines;
            }
        }
        
        // Ahora ejecutar líneas que no son definiciones de función
        for (const line of lines) {
            const trimmed = line.trim();
            
            if (!trimmed || trimmed.startsWith('#')) continue;
            if (trimmed.startsWith('def ')) continue; // Saltar definiciones de función
            
            // Detectar llamada a función
            if (allowFunctions) {
                const callMatch = trimmed.match(/^(\w+)\(([^)]*)\)$/);
                if (callMatch && functions[callMatch[1]]) {
                    const funcName = callMatch[1];
                    const args = callMatch[2].split(',').map(a => a.trim());
                    
                    // Ejecutar función (simplificado)
                    const funcResult = executeFunction(funcName, args, functions, variables);
                    if (funcResult.output) {
                        output.push(funcResult.output);
                    }
                    if (funcResult.variables) {
                        variables = { ...variables, ...funcResult.variables };
                    }
                    continue;
                }
                
                // Detectar print con llamada a función
                const printFuncMatch = trimmed.match(/^print\((\w+)\(([^)]*)\)\)$/);
                if (printFuncMatch && functions[printFuncMatch[1]]) {
                    const funcName = printFuncMatch[1];
                    const args = printFuncMatch[2].split(',').map(a => a.trim());
                    const funcResult = executeFunction(funcName, args, functions, variables);
                    output.push(funcResult.returnValue !== undefined ? funcResult.returnValue : '');
                    continue;
                }
            }
            
            // Detectar lista
            if (allowLists) {
                const listMatch = trimmed.match(/^(\w+)\s*=\s*\[(.*)\]$/);
                if (listMatch) {
                    const [, varName, elements] = listMatch;
                    const values = elements.split(',').map(e => {
                        e = e.trim();
                        if (e.startsWith('"') || e.startsWith("'")) {
                            return e.slice(1, -1);
                        } else if (!isNaN(e)) {
                            return Number(e);
                        }
                        return e;
                    });
                    variables[varName] = values;
                    continue;
                }
                
                // Detectar acceso a lista
                const listAccessMatch = trimmed.match(/^print\((\w+)\[(\d+)\]\)$/);
                if (listAccessMatch) {
                    const [, varName, index] = listAccessMatch;
                    if (variables[varName] && Array.isArray(variables[varName])) {
                        output.push(variables[varName][Number(index)]);
                    } else {
                        return { success: false, error: `IndexError: '${varName}' no es una lista o no existe`, hint: '¿Creaste esta lista antes?' };
                    }
                    continue;
                }
                
                // Detectar métodos de lista
                if (allowMethods) {
                    const appendMatch = trimmed.match(/^(\w+)\.append\((.+)\)$/);
                    if (appendMatch) {
                        const [, varName, value] = appendMatch;
                        if (variables[varName] && Array.isArray(variables[varName])) {
                            let val = value.trim();
                            if (val.startsWith('"') || val.startsWith("'")) {
                                val = val.slice(1, -1);
                            } else if (!isNaN(val)) {
                                val = Number(val);
                            }
                            variables[varName].push(val);
                        } else {
                            return { success: false, error: `AttributeError: '${varName}' no es una lista`, hint: '¿Creaste esta variable como lista?' };
                        }
                        continue;
                    }
                    
                    const printListMatch = trimmed.match(/^print\((\w+)\)$/);
                    if (printListMatch && variables[printListMatch[1]] && Array.isArray(variables[printListMatch[1]])) {
                        output.push(JSON.stringify(variables[printListMatch[1]]));
                        continue;
                    }
                }
            }
            
            // Detectar diccionario
            if (allowDicts) {
                const dictMatch = trimmed.match(/^(\w+)\s*=\s*\{(.*)\}$/);
                if (dictMatch) {
                    const [, varName, pairs] = dictMatch;
                    const dict = {};
                    const pairRegex = /"([^"]+)"\s*:\s*([^,}]+)/g;
                    let match;
                    while ((match = pairRegex.exec(pairs)) !== null) {
                        const key = match[1];
                        let value = match[2].trim();
                        if (value.startsWith('"') || value.startsWith("'")) {
                            value = value.slice(1, -1);
                        } else if (!isNaN(value)) {
                            value = Number(value);
                        }
                        dict[key] = value;
                    }
                    variables[varName] = dict;
                    continue;
                }
                
                // Detectar acceso a diccionario
                const dictAccessMatch = trimmed.match(/^print\((\w+)\["([^"]+)"\]\)$/);
                if (dictAccessMatch) {
                    const [, varName, key] = dictAccessMatch;
                    if (variables[varName] && typeof variables[varName] === 'object' && !Array.isArray(variables[varName])) {
                        if (variables[varName][key] !== undefined) {
                            output.push(variables[varName][key]);
                        } else {
                            return { success: false, error: `KeyError: '${key}' no existe en el diccionario`, hint: 'Revisá las claves del diccionario' };
                        }
                    } else {
                        return { success: false, error: `TypeError: '${varName}' no es un diccionario`, hint: '¿Creaste esta variable como diccionario?' };
                    }
                    continue;
                }
            }
            
            // Detectar asignación simple (Estadio 1)
            const assignMatch = trimmed.match(/^(\w+)\s*=\s*(.+)$/);
            if (assignMatch) {
                const [, varName, value] = assignMatch;
                
                if (value.startsWith('"') || value.startsWith("'")) {
                    variables[varName] = value.slice(1, -1);
                } else if (!isNaN(value)) {
                    variables[varName] = Number(value);
                } else if (variables[value] !== undefined) {
                    variables[varName] = variables[value];
                } else {
                    return { success: false, error: `NameError: '${value}' no está definido`, hint: '¿Creaste esta variable antes?' };
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
                    return { success: false, error: `NameError: name '${arg}' is not defined`, hint: '¿El nombre de la variable es correcto?' };
                }
                continue;
            }
            
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

function executeFunction(funcName, args, functions, variables) {
    // Ejecución simplificada de funciones
    const funcLines = functions[funcName];
    if (!funcLines) return { output: null, returnValue: undefined, variables: {} };
    
    let returnValue = undefined;
    let localVars = { ...variables };
    
    for (const line of funcLines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('def ') || !trimmed) continue;
        
        const returnMatch = trimmed.match(/^return\s+(.+)$/);
        if (returnMatch) {
            const expr = returnMatch[1];
            // Evaluar expresión simple
            if (!isNaN(expr)) {
                returnValue = Number(expr);
            } else if (localVars[expr] !== undefined) {
                returnValue = localVars[expr];
            } else {
                // Expresión con operación
                const opMatch = expr.match(/^(\w+)\s*\*\s*(\d+)$/);
                if (opMatch && localVars[opMatch[1]] !== undefined) {
                    returnValue = localVars[opMatch[1]] * Number(opMatch[2]);
                }
            }
        }
        
        const printMatch = trimmed.match(/^print\((.+)\)$/);
        if (printMatch && !returnValue) {
            const arg = printMatch[1];
            if (localVars[arg] !== undefined) {
                // Hay output pero no lo capturamos en esta versión simplificada
            }
        }
    }
    
    return { output: null, returnValue, variables: localVars };
}

/* ========================================
   ACTUALIZACIÓN DE PROGRESO VISUAL
   ======================================== */
function updateProgressCircle(lessonNum) {
    const circle = document.querySelector(`.progress-circle[data-lesson="${lessonNum}"]`);
    if (circle) {
        circle.classList.add('completed');
    }
}

/* ========================================
   INICIALIZACIÓN
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔗 Estadio 2 Loaded');
    
    // Cargar progreso guardado
    loadProgress();
    
    // Trigger burst de bienvenida
    setTimeout(() => {
        if (!AppState.burstsTriggered.includes('welcome-estadio2')) {
            triggerBurst('welcome-estadio2', {
                message: 'Estadio 2: Acá las cosas se ponen más potentes. Listas, diccionarios, funciones. Todo lo que aprendiste en Estadio 1 sigue vigente.'
            });
            AppState.burstsTriggered.push('welcome-estadio2');
        }
    }, 5000);
    
    // Cargar historial de bitácora
    loadBitacoraHistory();
});

/* ========================================
   EVENT LISTENERS PARA MAR
   ======================================== */
document.addEventListener('codeExecute', (e) => {
    if (e.detail.success) {
        // Guardar progreso de lección
        const lesson = e.detail.lesson;
        if (lesson && estadio2Progress[lesson] !== undefined) {
            estadio2Progress[lesson] = true;
            updateProgressCircle(lesson.replace('lesson', ''));
        }
    }
});
