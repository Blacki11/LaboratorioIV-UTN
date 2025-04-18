import mongoose from 'mongoose';

const sprintSchema = new mongoose.Schema({
    dateStart: { type: Date, required: true },
    dateClose: { type: Date, required: true },
    taskReference: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    colour: { type: String, required: true },

});

const Sprint = mongoose.model('Sprint', sprintSchema);

export default Sprint;
