const fs = require('fs');
const path = require('path');
const { unlinkSync } = require('node:fs');
const readline = require('readline');

// Obtenemos fecha y hora
function getTimestamp() {
    const now = new Date();
    return now.toISOString().replace('T', ' ').substring(0, 19);
}
// Para mantener la sincronizacion con el realine, usamos una funcion
function fsChangeDate(usuario){
    //Creamos archivo
    const logFile = path.join(__dirname, 'datos.txt');

// Iniciando data
const data = `
   Nombre: [${usuario.nombre}]\n
   Edad: [${usuario.edad}]\n
   Carrera: [${usuario.carrera}]\n
\n\n`;
fs.appendFileSync(logFile, data, 'utf8');
console.log(data.trim());

// Agregando fecha
const date = `\n\nFecha de modificación:[${getTimestamp()}]\n\n`;
fs.appendFileSync(logFile, date, 'utf8');
console.log(date.trim());
//Creamos el nuevo path
let newFilePath = path.join(__dirname, `informacion.txt`);
//Renombrando archivo
fs.rename(logFile, newFilePath,(err) => {
    if (err) throw err;
    console. log('\nFile renamed successfully!\n');
  });



// Eliminacion del archivo
setTimeout(() => {
    try {
        unlinkSync(newFilePath);
        console.log(`successfully deleted ${newFilePath}`);
      } catch (err) {
        console.log(err)
      }
}, 10000);
}

//Pregunta nombre, edad y carrera por consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let usuario = {}; // guardamos los datos


rl.question("Nombre: ", (nombre) => {
    usuario.nombre = nombre; 

    rl.question("Edad: ", (edad) => {
        usuario.edad = edad;

        rl.question("Carrera: ", (carrera) => {
            usuario.carrera = carrera;

            console.log("\nInformación capturada:");
            console.log(usuario);
            console.log("\n")
            //Cerramos redline
            rl.close();
            //Empezamos la creacion de los datos
            fsChangeDate(usuario)
            
        });
    });
});

