const mongoose = require("mongoose")

const schemaResearcher = mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    speciality:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    listOfProjects: {
        type: [{type: mongoose.Types.ObjectId, ref: "project"}]
    }
    

})

const Researcher = mongoose.model("researcher", schemaResearcher)
module.exports = Researcher