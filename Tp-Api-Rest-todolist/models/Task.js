import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  titulo: { type: String, required: true, unique: true  },
  description: { type: String, required: true },
  status: { type: String, required: true, enum: ['to-do', 'in-progress', 'done'] },
  dateLimit: { type: Date, required: true },
  colour: { type: String, required: true },
  backlog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Backlog',
    default: null
  },
  sprint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sprint',
    default: null
  }
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
