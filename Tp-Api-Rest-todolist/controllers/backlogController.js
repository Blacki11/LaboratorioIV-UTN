import Backlog from '../models/Backlog.js';
import Task from '../models/Task.js';

class backlogController {
  async create(req, res) {
    try {
      const { taskReferences = [] } = req.body;

      const backlog = await Backlog.create({ taskReferences });

      // Actualizar tareas para reflejar que están en el backlog
      await Task.updateMany(
        { _id: { $in: taskReferences } },
        { backlog: backlog._id }
      );

      res.status(201).json(backlog);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear backlog', error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const backlogs = await Backlog.find().populate('taskReferences');
      res.status(200).json(backlogs);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener el backlog', error: err.message });
    }
  }

  async addTaskToBacklog(req, res) {
    try {
      const { taskId } = req.params;

      const task = await Task.findById(taskId);
      if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

      // Buscar backlog único (suponiendo que tenés uno solo)
      let backlog = await Backlog.findOne();

      if (!backlog) {
        backlog = await Backlog.create({ taskReferences: [] });
      }

      // Evitar duplicados
      if (!backlog.taskReferences.includes(taskId)) {
        backlog.taskReferences.push(taskId);
        await backlog.save();

        task.backlog = backlog._id;
        task.sprint = null; // por si estaba en un sprint, lo sacamos
        await task.save();
      }

      res.status(200).json({ message: 'Tarea agregada al backlog', backlog });
    } catch (err) {
      res.status(500).json({ message: 'Error al agregar tarea al backlog', error: err.message });
    }
  }
}

export default new backlogController();
