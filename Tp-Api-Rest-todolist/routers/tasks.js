import express from 'express';
import taskController from '../controllers/taskController';
const route = express.Router();

route.get('/', taskController.getAll);
route.get('/:id', taskController.getOne);
route.post('/', taskController.create); 
route.put('/:id', taskController.update);
route.delete('/:id', taskController.delete);

export default route