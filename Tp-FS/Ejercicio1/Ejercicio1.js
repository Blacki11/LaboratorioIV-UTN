const fs = require('fs');
const path = require('path');

// Obtenemos fecha y hora
function getTimestamp() {
    const now = new Date();
    return now.toISOString().replace('T', ' ').substring(0, 19);
}

// Ruta del archivo de log
const logFile = path.join(__dirname, 'log.txt');

// Inicio
const startMessage = `[${getTimestamp()}] - Inicio del programa\n\n`;
fs.appendFileSync(logFile, startMessage, 'utf8');
console.log(startMessage.trim());

// Ejecutando
const executingMessage = `[${getTimestamp()}] - Ejecutando tarea...\n\n`;
fs.appendFileSync(logFile, executingMessage, 'utf8');
console.log(executingMessage.trim());

// Simulacion
setTimeout(() => {
    const completedMessage = `[${getTimestamp()}] - Tarea completada\n\n`;
    fs.appendFileSync(logFile, completedMessage, 'utf8');
    console.log(completedMessage.trim());
}, 5000);
