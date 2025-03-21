const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);



function wordCounter(nameFile, word){
    const ejercicioDir = path.join(__dirname);
    const auxFileName = fs.readdirSync(ejercicioDir)
    .filter((file) => {
        const nameWithoutExt = path.parse(file).name;
        return nameWithoutExt.indexOf(".") !== 0 && // Ignorar archivos ocultos
        nameWithoutExt !== basename &&       // No incluir este mismo archivo
        nameWithoutExt === nameFile;         // Coincidir con el archivo buscado
    });
    const contenido = fs.readFileSync(auxFileName[0],'utf8')
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const coincidencias = contenido.match(regex);
    if(coincidencias){
        return `la palabra ${word} aparece un total de ${coincidencias}`
    }else{
        return `La palabra ${word} no aparece`
    }
}

console.log(wordCounter("archivo2", `"hola"`))