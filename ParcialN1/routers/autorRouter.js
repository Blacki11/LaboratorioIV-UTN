const express = require("express");
const {getAllAutores, getByIdAutores, actualizarAutor, postNewAutor, deleteAutor, validationExistBook, addBookAutor} = require("../controllers/autorController.js")
const routers = express.Router()

routers.get("/" , getAllAutores)
routers.get("/:id", getByIdAutores)


routers.put("/:id", actualizarAutor)
routers.put("/:id/addBook/:bookId",validationExistBook, addBookAutor)

routers.post("/", postNewAutor)
routers.delete("/:id", deleteAutor)

module.exports = routers;