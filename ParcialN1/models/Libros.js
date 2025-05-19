const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({

    titulo: {
        type: String,
        required: true
    },
    resumen: {
        type: String,

    },
    genero: {
        type: String,
        required: true

    },
    publicacion: {
        type: Date,
        required: true

    },
    disponible: {
        type: Boolean,
        required: true

    }
})
const Book = mongoose.model("books", bookSchema)
module.exports = Book

