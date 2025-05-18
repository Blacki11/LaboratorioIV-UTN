const libros = require("../models/libros.js");


//routers.get("/", libroController())
const getAllLibro = async (req, res)=>{
    try{
        const data = await libros.find()
        return res.status(200).json(data)
    }catch(err){
        console.log(err)
        return res.status(500).json({error: "Error en el servidor"})
    }
}

// routers.get("/:id", libroController())
const getByIdLibro = async(req,res)=>{
    try{
        const {id} = req.params
        const autor = await libros.findById(id)
        return res.status(200).json(autor)
    }catch(err){
        return res.status(500).json({error: "Error en el servidor"})
    }
}

// routers.put("/:id", libroController())
const actualizarLibro = async (req,res)=>{
    try{
        
        const {id} = req.params
        const {titulo, resumen, genero, publicacion, disponible} = req.body
        console.log(req.body)
        const libro = await libros.findById(id)
        if(!libro){
            return res.status(404).json({error: "Libro no encontrado"})
        }
        if(titulo){
            libro.titulo = titulo
        }
        if(resumen){
            libro.resumen = resumen
        }   
        if(genero){
            libro.genero = genero
        }
        if(publicacion){
            libro.publicacion = publicacion
        }
        if(disponible){
            libro.disponible = disponible
        }
        await libro.save()
        console.log(libro)
        return res.status(200).json(libro)
    }catch(err){
        console.log(err)
        return res.status(500).json({error: "Error en el servidor"})
    }
}

// routers.post("/", libroController())
const postNewLibro = (req,res)=>{
    try{

        const {titulo, resumen, genero, publicacion, disponible} = req.body
        if(!titulo || !genero || !publicacion){
            return res.status(400).json({error: "Faltan datos"})
        }
        const libro = {}
        if(titulo){
            libro.titulo = titulo
        }
        if(resumen){
            libro.resumen = resumen
        }
        if(genero){
            libro.genero = genero
        }
        if(publicacion){
            libro.publicacion = publicacion
        }
        if(disponible){
            libro.disponible = disponible
        }

        const nuevoLibro = new libros(libro)
        nuevoLibro.save()
        return res.status(201).json(nuevoLibro)
    }catch(err){
        console.log(err)
        return res.status(500).json({error: "Error en el servidor"})
    }

}
// routers.delete("/:id", libroController())
const deleteLibro = async (req, res)=>{
    try{
        const {id} = req.params
        const libro = await libros.Remove({_id: id})
        return res.status(200).json(libro)
    }catch(err){
        return res.status(500).json({error: "Error en el servidor"})
    }
}
const validationAssignetAuthor = async (req, res, next)=>{
    try{
        const {id} = req.params
        const libro = await libros.findById(id)
        if(!libro){
            return res.status(404).json({error: "Libro no encontrado"})
        }
        if(libro.autor){
            return res.status(400).json({error: "El libro ya tiene un autor asignado, no se puede eliminar"})
        }
        next()
    }catch(err){
        return res.status(500).json({error: "Error en el servidor"})
    }
}


module.exports = {getAllLibro, getByIdLibro, actualizarLibro, postNewLibro, deleteLibro, validationAssignetAuthor}
