/* Bitácora del Estudiante */
function saveBitacoraEntry() {
    const text = document.querySelector('.bitacora-entry').value;
    if (!text.trim()) return;
    
    const entry = {
        timestamp: new Date().toISOString(),
        estadio: AppState.currentEstadio,
        text: text
    };
    
    AppState.bitacoraEntries.push(entry);
    localStorage.setItem('pythonMuarBitacora', JSON.stringify(AppState.bitacoraEntries));
    
    showToast('💾 Entrada guardada en bitácora', 'success');
    document.querySelector('.bitacora-entry').value = '';
}

function loadBitacoraEntries() {
    const saved = localStorage.getItem('pythonMuarBitacora');
    if (saved) {
        AppState.bitacoraEntries = JSON.parse(saved);
    }
}
