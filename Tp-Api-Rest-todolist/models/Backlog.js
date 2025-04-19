import mongoose from 'mongoose';

const backlogSchema = new mongoose.Schema({
  taskReferences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

const Backlog = mongoose.model('Backlog', backlogSchema);
export default Backlog;
