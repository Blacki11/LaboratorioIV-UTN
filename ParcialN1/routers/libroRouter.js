const express = require("express");
const {getAllLibro, getByIdLibro, actualizarLibro, postNewLibro, deleteLibro, validationAssignetAuthor} = require("../controllers/libroController.js")

const routers = express.Router()


routers.get("/", getAllLibro)
routers.get("/:id", getByIdLibro)


routers.put("/:id", actualizarLibro)

routers.post("/", postNewLibro)
routers.delete("/:id", validationAssignetAuthor, deleteLibro)

module.exports = routers;
