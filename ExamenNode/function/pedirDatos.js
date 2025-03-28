import readline from 'readline';
import fs from 'fs'


export const pedirDatos = (logFile)=>{
return new Promise((resolve) => {
        //Funcion que crea el producto y lo pone dentro del array del archivo
        const addProduct = (nombre, precio, count)=>{
            const objectProduct = {"nombre": nombre, "precio": precio, "count": count}
                    try {
                        const fileData = fs.readFileSync(logFile, 'utf8');
                        const products = JSON.parse(fileData); 

                        products.push(objectProduct);

                        fs.writeFileSync(logFile, JSON.stringify(products, null, 2), 'utf8'); 

                    } catch (error) {
                        console.error('Error al leer o escribir el archivo:', error);
                        reject(error);
                    }
        }
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        //Si el archivo no existe, entonces lo creamos como un array vacio
        if (!fs.existsSync(logFile)) {
            fs.writeFileSync(logFile, JSON.stringify([]), 'utf8');
        }
        //Preguntamos los datos del producto y los mandamos a la funcion previamente descripta
        rl.question('¿Nombre del producto? ', (nombre) => {
            rl.question('¿Precio del producto? ', (precio) => {
                rl.question('¿Cantidad del producto? ', (count) => {
                    addProduct(nombre, precio, count)
                    rl.close();
                    resolve(); 
                });
            });
        });
    });
}