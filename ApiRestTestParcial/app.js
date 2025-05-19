const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config()

const app = express()

mongoose.connect(process.env.MONGOURL)
const db = mongoose.connection
db.on("error", (er)=>console.error(er))
db.once("open", ()=>console.log("Base de datos abierta"))

const proyectsRoute = require("./Routers/proyects.js")
app.use("/project", proyectsRoute)

const reseracherRoute = require("./Routers/researcher.js")
app.use("/researcher", proyectsRoute)

const publicationRoute = require("./Routers/publication.js")
app.use("/publication", publicationRoute)



app.listen(3000,()=>{
    console.log("Puerto escuchando en 3000")
})