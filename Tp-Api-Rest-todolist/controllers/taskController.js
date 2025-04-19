import Task from '../models/Task.js';

class taskController {
  // GET /tasks - obtener todas las tareas
  async getAll(req, res) {
    try {
      const tasks = await Task.find().populate('backlog sprint');
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener las tareas', error: err.message });
    }
  }

  // GET /tasks/:id - obtener una tarea por ID
  async getOne(req, res) {
    try {
      const task = await Task.findById(req.params.id).populate('backlog sprint');
      if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
      }
      res.status(200).json(task);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener la tarea', error: err.message });
    }
  }

  // POST /tasks - crear una tarea nueva
  async create(req, res) {
    try {
      const { titulo, description, status, dateLimit, colour, backlog, sprint } = req.body;
      const task = await Task.create({
        titulo,
        description,
        status,
        dateLimit,
        colour,
        backlog: backlog || null,
        sprint: sprint || null
      });
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la tarea', error: error.message });
    }
  }

  // PUT /tasks/:id - actualizar una tarea
  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedTask) {
        return res.status(404).json({ message: 'Tarea no encontrada para actualizar' });
      }
      res.status(200).json(updatedTask);
    } catch (err) {
      res.status(500).json({ message: 'Error al actualizar la tarea', error: err.message });
    }
  }

  // DELETE /tasks/:id - eliminar una tarea
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Task.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Tarea no encontrada para eliminar' });
      }
      res.status(200).json({ message: 'Tarea eliminada correctamente' });
    } catch (err) {
      res.status(500).json({ message: 'Error al eliminar la tarea', error: err.message });
    }
  }
}

export default new taskController();
