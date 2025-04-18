import mongoose from 'mongoose';

const backlogtSchema = new mongoose.Schema({
    taskReference: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true }]

});

const Backlog = mongoose.model('Backlog', backlogtSchema);

export default Backlog;
