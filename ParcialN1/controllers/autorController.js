const autores = require("../models/Autores.js");
const libros = require("../models/libros.js");


//routers.get("/", autorController())
const getAllAutores = async (req, res)=>{
    try{
        const data = await autores.find()
        return res.status(200).json(data)
    }catch(err){
        console.log(err)
        return res.status(500).json({error: "Error en el servidor"})
    }
}

// routers.get("/:id", autorController())
const getByIdAutores = async(req,res)=>{
    try{
        const {id} = req.params
        const autor = await autores.findById(id)
        return res.status(200).json(autor)
    }catch(err){
        return res.status(500).json({error: "Error en el servidor"})
    }
}

// routers.put("/:id", autorController())
const actualizarAutor = async (req,res)=>{
    try{
        const {id} = req.params
        const {nombre, bio, fechaNacimiento, nacionalidad, libros} = req.body
        const autor = await autores.findById(id)
        if(!autor){
            return res.status(404).json({error: "Autor no encontrado"})
        }
        if(nombre){
            autor.nombre = nombre
        }
        if(bio){
            autor.bio = bio
        }   
        if(fechaNacimiento){
            autor.fechaNacimiento = fechaNacimiento
        }
        if(nacionalidad){
            autor.nacionalidad = nacionalidad
        }
        if(libros){
            autor.libros = libros
        }
        await autor.save()
        return res.status(200).json(autor)
    }catch(err){
        console.log(err)
        return res.status(500).json({error: "Error en el servidor"})
    }
}
// routers.put("/:id/addBook/:bookId", autorController())
const addBookAutor = async (req,res)=>{
    try{
        const {id, bookId} = req.params
        const autor = await autores.findById(id)
        if(!autor){
            return res.status(404).json({error: "Autor no encontrado"})
        }
        const libro = await libros.findById(bookId)
        autor.libros.map((e)=>{
           if(bookId == e){
            return res.status(404).json({error: "El libro que se intenta agregar ya fue agregado"})
           }
        })
        autor.libros.push(libro._id)
        await autor.save()
        return res.status(200).json(autor)
    }catch(err){
        console.log(err)
        return res.status(500).json({error: "Error en el servidor"})
    }
}

// routers.post("/", autorController())
const postNewAutor = async (req,res)=>{
    try{
        
        const {nombre, bio, fechaNacimiento, nacionalidad, libros} = req.body
        if(!nombre || !fechaNacimiento || !nacionalidad){
            return res.status(400).json({error: "Faltan datos"})
        }
        if(typeof nombre != "string" || typeof bio != "string" || typeof nacionalidad != "string"){
            return res.status(400).json({error: "Se deben usar los tipos correctos de datos"})
        }
        const autor = {}
        if(!autor){
            return res.status(404).json({error: "Autor no encontrado"})
        }
        if(nombre){
            autor.nombre = nombre
        }
        if(bio){
            autor.bio = bio
        }   
        if(fechaNacimiento){
            autor.fechaNacimiento = fechaNacimiento
        }
        if(nacionalidad){
            autor.nacionalidad = nacionalidad
        }
        if(libros){
            autor.libros = libros
        }
        const nuevoAutor = new autores(autor)
        await nuevoAutor.save()
        return res.status(201).json(nuevoAutor)
    }catch(err){
        return res.status(500).json({error: "Error en el servidor"})
    }

}
// routers.delete("/:id", autorController())
const deleteAutor = async (req, res)=>{
    try{
        const {id} = req.params
        const autor = await autores.deleteOne({_id: id})
        return res.status(200).json(autor)
    }catch(err){
        console.log(err)
        return res.status(500).json({error: "Error en el servidor"})
    }
}

const validationExistBook = async(req, res, next)=>{
    try{
        const {bookId} = req.params
        const libro = await libros.findById(bookId)
        if(!libro){
            return res.status(404).json({error: "Libro no existente, no se puede agregar al autor"})
        }
    }catch(err){
        return res.status(500).json({error: "Error en el servidor"})
    }
    next()
}

module.exports = {getAllAutores, getByIdAutores, actualizarAutor, postNewAutor, deleteAutor, validationExistBook, addBookAutor}