const mongoose = require("mongoose");

const schemaPublication = mongoose.Schema({

    title: {
        type: String,
        require: true
    },
    resume:{
        type: String,
        default: ""
    },
    datePublication: {
        type: Date,
        require: true
    },
    projectPublicationRef:{
        type: {type: mongoose.Types.ObjectId, ref: "project"}
    },
    authorsPublication:{
        type: [{type: mongoose.Types.ObjectId, ref: "researcher"}]
    }



})

const Publication = mongoose.model("publication", schemaPublication)
module.exports = Publication