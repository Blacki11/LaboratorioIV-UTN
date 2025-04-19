import express from 'express';
import taskController from '../controllers/taskController.js';
const route = express.Router();

route.get('/', taskController.getAll);
route.get('/:id', taskController.getOne);
route.put('/:id', taskController.update);
route.delete('/:id', taskController.delete);
route.post('/', taskController.create); 

export default route