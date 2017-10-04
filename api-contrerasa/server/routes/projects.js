import express from 'express';
import projectController from './../controllers/Project-Controller';
const router = express.Router();

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);

router.post('/', projectController.saveNewProject);

router.patch('/:id', projectController.updateProject);

router.delete('/:id', projectController.deleteProject);

export default router;