import readline from 'readline';
import { appendFileSync, readFileSync  } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Definir __filename y __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFile = path.join(__dirname, 'datos_usuario.txt');

//RedLine no puede abrir varias interfaces
export const datosUsuario = () => {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('¿Cuál es tu nombre? ', (nombre) => {
            rl.question('¿Cuál es tu edad? ', (edad) => {
                rl.question('¿Cuál es tu email? ', (email) => {
                    appendFileSync(logFile, `${edad}\t${nombre}\t${email}\n`, 'utf8');
                    rl.close();
                    resolve(); 
                });
            });
        });
    });
};

export const mostrarDatos = ()=>{
        try {
            const data = readFileSync(logFile, 'utf8');
            return data
        } catch (error) {
            return []; 
        }
}
