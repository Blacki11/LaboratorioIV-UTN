import { Router } from 'express';
import tasksRoutes from "./tasks.js";
import backlogRoutes from './backlog.js';
import sprintRoutes from './sprints.js';

const router = Router();

router.use('/tasks', tasksRoutes);
router.use('/backlog', backlogRoutes);
router.use('/sprints', sprintRoutes);

export default router;
