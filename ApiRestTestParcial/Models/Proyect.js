const mongoose = require("mongoose")
const Researcher = mongoose.model('researcher', schemaResearcher)
const schemaProyect = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: false
    },
    dateInitial:{
        type: Date,
        require: true
    },
    dateEstimated:{
        type: Date,
        require: true
    },
    stateProyect:{
        type: String,
        enum: ["propuesta", "en-curso", "finalizado"]
    },
    investigatorsResearch:{
        type: [{type: mongoose.Types.ObjectId, ref: "researcher"}],
        require: true
    }
    

})

const Proyect = mongoose.model("project", schemaProyect)
module.exports = Proyect

