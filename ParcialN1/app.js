const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
app.use(express.json()) 


mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection
db.on("error", (er)=>console.error(er))
db.once("open", ()=>console.log("Base de datos abierta"))

const libroRouter = require("./routers/libroRouter.js")
app.use("/books", libroRouter)
const autorRouter = require("./routers/autorRouter.js")
app.use("/authors", autorRouter)

app.listen(3000, ()=>{
    console.log("Puerto 3000 escuchando")
})