import path from 'path';
import { fileURLToPath } from 'url';
import { pedirDatos } from './function/pedirDatos.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs' 

//Funcion para usar __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Pedimos nombre del archivo que guarda los productos o le damos productos.json como defecto
const argv = yargs(hideBin(process.argv))
  .option('file', {
    alias: 'f',
    type: 'string',
    describe: 'Name of the file',
    demandOption: true,
    //Aca se decide si existe un file o no y si le damos nombre o usamos el por defecto
    coerce: (file) => {
      if (file && file.length > 0) {
        const logFile = path.join(__dirname, file);
        return logFile;
      } else {
        const logFile = path.join(__dirname, "productos.json");
        return logFile;
      }
    }
  })
  .argv;

  const logFile = argv.file;

//Manejo asyncrono de una promesa para pedir los datos del producto
(async () => {
  try {
      await pedirDatos(logFile);  
      //Leemos lo que haya en el archivo despues de que termina la promesa
      const data = fs.readFileSync(logFile, 'utf8');
      console.log("Contenido del archivo:", data);
  } catch (err) {
    console.error('Error:', err);
  }
})();