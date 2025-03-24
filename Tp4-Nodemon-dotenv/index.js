
//Ejercicio 1
import { config } from "dotenv";
config()

const dbhost = process.env.DB_HOST
const dbuser = process.env.DB_USER
const dbpass = process.env.DB_PASS

console.log(`El host es: ${dbhost}, el usuario de la db es: ${dbuser}, la contraseña del host es: ${dbpass}`)

//Ejercicio2
import { sumar } from "./Ejercicio2/math.js";

sumar(2,3)


//Ejercicio 3
import { pedirDatos } from "./Ejercicio3/pedirNombre.js";

// pedirDatos()

//Ejercicio 4
import { datosUsuario, mostrarDatos } from "./Ejercicio4/fileReadSave.js";

async function ejecutarPreguntas() {
    for (let i = 0; i < 3; i++) {
        await datosUsuario(); // Espera que el usuario ingrese datos antes de seguir
    }

 

        const data = mostrarDatos();
        console.log(data);

}

ejecutarPreguntas();

