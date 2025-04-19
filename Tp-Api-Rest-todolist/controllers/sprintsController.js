import Sprint from '../models/Sprint.js';
import Task from '../models/Task.js';

class sprintController {
  async create(req, res) {
    try {
      const { dateStart, dateClose, taskReferences = [], colour } = req.body;

      const sprint = await Sprint.create({
        dateStart,
        dateClose,
        taskReferences,
        colour
      });

      // opcional: actualizar cada tarea para referenciar este sprint
      await Task.updateMany(
        { _id: { $in: taskReferences } },
        { sprint: sprint._id }
      );

      res.status(201).json(sprint);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el sprint', error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const sprints = await Sprint.find().populate('taskReferences');
      res.status(200).json(sprints);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener los sprints', error: err.message });
    }
  }

  async getOne(req, res) {
    try {
      const sprint = await Sprint.findById(req.params.id).populate('taskReferences');
      if (!sprint) return res.status(404).json({ message: 'Sprint no encontrado' });
      res.status(200).json(sprint);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener el sprint', error: err.message });
    }
  }

  async update(req, res) {
    try {
      const updated = await Sprint.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ message: 'Sprint no encontrado' });
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ message: 'Error al actualizar el sprint', error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await Sprint.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: 'Sprint no encontrado' });

      // Opcional: limpiar campo sprint en las tareas
      await Task.updateMany(
        { sprint: req.params.id },
        { sprint: null }
      );

      res.status(200).json({ message: 'Sprint eliminado correctamente' });
    } catch (err) {
      res.status(500).json({ message: 'Error al eliminar el sprint', error: err.message });
    }
  }

  async addTaskToSprint(req, res) {
    try {
      const { id, taskId } = req.params;

      const sprint = await Sprint.findById(id);
      const task = await Task.findById(taskId);

      if (!sprint || !task) {
        return res.status(404).json({ message: 'Sprint o tarea no encontrada' });
      }

      // Evitar duplicados
      if (!sprint.taskReferences.includes(taskId)) {
        sprint.taskReferences.push(taskId);
        await sprint.save();

        task.sprint = sprint._id;
        await task.save();
      }

      res.status(200).json({ message: 'Tarea agregada al sprint', sprint });
    } catch (err) {
      res.status(500).json({ message: 'Error al agregar tarea al sprint', error: err.message });
    }
  }

  async removeTaskFromSprint(req, res) {
    try {
      const { id, taskId } = req.params;

      const sprint = await Sprint.findById(id);
      const task = await Task.findById(taskId);

      if (!sprint || !task) {
        return res.status(404).json({ message: 'Sprint o tarea no encontrada' });
      }

      sprint.taskReferences = sprint.taskReferences.filter(t => t.toString() !== taskId);
      await sprint.save();

      if (task.sprint?.toString() === id) {
        task.sprint = null;
        await task.save();
      }

      res.status(200).json({ message: 'Tarea eliminada del sprint', sprint });
    } catch (err) {
      res.status(500).json({ message: 'Error al eliminar tarea del sprint', error: err.message });
    }
  }
}

export default new sprintController();
