const express = require("express")
const {} = require("../Controllers/proyectsController.js")

const routers = express.Router()



routers.get("/", getAllProjetcs)
routers.post("/", createProject)
routers.put("/:id", f5Project)


module.export = routers