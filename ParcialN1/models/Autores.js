const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },
    bio: {
        type: String,

    },
    fechaNacimiento: {
        type: Date,
        required: true

    },
    nacionalidad: {
        type: String,
        required: true

    },
    libros: {
        type: [{type: mongoose.Types.ObjectId, ref: "libros"}],
        default: []
    }
})

const Author = mongoose.model("authors", authorSchema)
module.exports = Author

