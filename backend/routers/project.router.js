const express = require('express');
const router = express.Router();
const { verifyToken, adminOnly } = require('../middlewares/access-control.middleware');
const projectController = require('../controllers/project.controller')

// Create a new project
router.get('/', projectController.getAll);
router.post('/', verifyToken, adminOnly, projectController.create);
router.patch('/volunteer/assign', verifyToken, adminOnly, projectController.assignVolunteer);
router.get('/:id', projectController.getById);
router.patch('/:id', verifyToken, projectController.update);
router.delete('/:id', verifyToken, adminOnly, projectController.delete);
router.get('/:id/tasks', verifyToken, adminOnly, projectController.getTasksOfProject);
router.get('/category/:id', verifyToken, projectController.getListByCategory);
router.get('/admin/:userId', verifyToken, projectController.getByUser);
router.get('/tags/:id', verifyToken, projectController.getListByTags);
router.patch('/updateFund/:projectId', verifyToken, adminOnly, projectController.getListByTags);

module.exports = router;
