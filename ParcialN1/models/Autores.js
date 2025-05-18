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
        type: Date,
        require: true

    },
    nacionalidad: {
        type: String,
        require: true

    },
    libros: {
        type: [{type: mongoose.Types.ObjectId, ref: "libros"}],
        default: []
    }
})

const Author = mongoose.model("authors", authorSchema)
module.exports = Author

