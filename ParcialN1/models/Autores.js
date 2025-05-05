const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({

    nombre: {
        type: String,
        require: true
    },
    bio: {
        type: String,

    },
    fechaNacimiento: {
        type: String,
        require: true

    },
    nacionalidad: {
        type: Date,
        require: true

    },
    libros: {
        type: [{type: mongoose.Types.ObjectId, ref: "libros"}],
    }
})

const Author = mongoose.model("autores", authorSchema)
module.exports = Author

