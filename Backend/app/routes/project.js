
const express = require('express');
const router = express.Router();

const projectsController = require('../controllers/projects');

// GET all projects
router.get('/', projectsController.getProjects);

// GET project by ID
router.get('/:id', projectsController.getProjectById);

// POST new project
router.post('/', projectsController.addProject);

// PUT update project
router.put('/:id', projectsController.updateProject);

// DELETE project
router.delete('/:id', projectsController.deleteProject);

module.exports = router;
