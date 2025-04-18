import express from 'express';
import backlogController from '../controllers/backlogController.js';
const route = express.Router();

route.get('/', backlogController.getAll);
route.post('/', backlogController.create);
route.put('/add-task/:taskId', backlogController.addTaskToBacklog);

export default route
