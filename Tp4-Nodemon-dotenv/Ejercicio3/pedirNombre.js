import readline from 'readline';

//RedLine no puede abrir varias interfaces
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export const pedirDatos = ()=>{

    rl.question('¿Cuál es tu nombre? ', (nombre) => {
        console.log(`Hola, ${nombre}!`);
        pedirEdad();
    });
}

export const pedirEdad = ()=>{
    

    rl.question('¿Cuál es tu edad? ', (edad) => {
        const Nacimiento = new Date().getFullYear() - parseInt(edad);
        console.log(`Tu edad es: ${edad} y naciste en el año: ${Nacimiento}`)
        rl.close();
    });
}

