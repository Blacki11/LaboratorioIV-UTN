const fs = require('fs');
const path = require('path');

const archivo = path.join(__dirname, 'contactos.json');
function crearArchivoPorDefecto() {
    if (!fs.existsSync(archivo)) {
        const contactoDefault = [
            {
                "nombre": "Juan Pérez",
                "telefono": "123-456-7890",
                "email": "juan@example.com"
            }
        ];
        fs.writeFileSync(archivo, JSON.stringify(contactoDefault, null, 4), 'utf8');
    }
}

// Función para leer contactos desde el archivo
function leerContactos() {
    try {
        const data = fs.readFileSync(archivo, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return []; 
    }
}

// Función para guardar los contactos en el archivo
function guardarContactos(contactos) {
    fs.writeFileSync(archivo, JSON.stringify(contactos, null, 4), 'utf8');
}

// Función para agregar un nuevo contacto
function agregarContacto(nombre, telefono, email) {
    let contactos = leerContactos();
    contactos.push({ nombre, telefono, email });
    guardarContactos(contactos);
    console.log(`Contacto agregado`);
}

// Función para mostrar todos los contactos
function mostrarContactos() {
    let contactos = leerContactos();
    if (contactos.length === 0) {
        console.log("No hay contactos guardados.");
    } else {
        console.log("\nLista de contactos:");
        console.table(contactos);
    }
}

// Función para eliminar un contacto por nombre
function eliminarContacto(nombre) {
    let contactos = leerContactos();
    let nuevosContactos = contactos.filter(contacto => contacto.nombre !== nombre);

    if (contactos.length === nuevosContactos.length) {
        console.log(`No se encontró el contacto: ${nombre}`);
    } else {
        guardarContactos(nuevosContactos);
        console.log(`Contacto eliminado: ${nombre}`);
    }
}

// prueba
crearArchivoPorDefecto();
agregarContacto('Carlos López', '987-654-3210', 'carlos@example.com');
mostrarContactos();
eliminarContacto('Juan Pérez');
mostrarContactos();
