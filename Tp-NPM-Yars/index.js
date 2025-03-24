const yargs = require('yargs');
const fs = require("fs");


const argv = yargs
  .command('saludar', 'Muestra un saludo', {
    nombre: {
      describe: 'Nombre de la persona a saludar',
      demandOption: true,
      type: 'string'
    }
  })
  .command('despedir', 'Despide al usuario', {
    nombre: {
      describe: 'Nombre de la persona a despedir',
      demandOption: true,
      type: 'string'
    }
  })
  .command('sumar', 'suma dos numeros', {
    n1: {
      describe: 'Primer numero',
      demandOption: true,
      type: 'number'
    },
    n2: {
        describe: 'Segundo numero',
        demandOption: true,
        type: 'number'
      }
  }).command({
    command: "leer",
    describe: "Lee un archivo JSON y muestra su contenido",
    builder: {
      archivo: {
        describe: "Ruta del archivo JSON",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      fs.readFile(argv.archivo, "utf8", (err, data) => {
        if (err) {
          console.error("Error al leer el archivo:", err.message);
          return;
        }
        try {
          const jsonData = JSON.parse(data);
          console.log("Contenido del archivo JSON:", jsonData);
        } catch (error) {
          console.error("Error al parsear JSON:", error.message);
        }
      });
    },
  })

  
  .help()
  .argv;
  
if (argv._.includes('saludar')) {
    if(argv.nombre.length <= 0){
        console.log("Falta introducir nombre")
    }
    else{
        console.log(`Hola, ${argv.nombre}!`);
    }
}
if (argv._.includes('despedir')) {
    if(argv.nombre.length <= 0){
        console.log("Falta introducir nombre")
    }
    else{
        console.log(`Adios, ${argv.nombre}!`);
    }
}

if (argv._.includes('sumar')) {
    console.log("La suma de los dos numeros es: ", argv.n1 + argv.n2);
}



