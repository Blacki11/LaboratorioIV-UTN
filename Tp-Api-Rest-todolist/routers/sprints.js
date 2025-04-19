import express from 'express';
import sprintController from '../controllers/sprintsController.js';
const route = express.Router();

route.get('/', sprintController.getAll);
route.get('/:id', sprintController.getOne);
route.post('/', sprintController.create); 
route.put('/:id', sprintController.update);
route.delete('/:id', sprintController.delete);
route.put('/:id/add-task/:taskId', sprintController.addTaskToSprint);
route.put('/:id/remove-task/:taskId', sprintController.removeTaskFromSprint);

export default route