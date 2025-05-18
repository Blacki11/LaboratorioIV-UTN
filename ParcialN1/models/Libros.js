const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({

    titulo: {
        type: String,
        require: true
    },
    resumen: {
        type: String,

    },
    genero: {
        type: String,
        require: true

    },
    publicacion: {
        type: Date,
        require: true

    },
    disponible: {
        type: Boolean,
        require: true

    }
})
const Book = mongoose.model("books", bookSchema)
module.exports = Book

