// src/routes/project.routes.ts
import { Router } from 'express';
import { auth } from '../middleware/auth.middleware';

import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from '../controllers/project.controller';

const router = Router();

// Apply auth middleware to all routes
router.use(auth);

// Routes for project management
router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

// Create a new project
router.post('/', async (req, res) => {
  try {
    console.log('POST /api/projects - Creating a new project');
    await createProject(req, res);
  } catch (error) {
    console.error('Error in POST /api/projects:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all projects
router.get('/', async (req, res) => {
  try {
    console.log('GET /api/projects - Fetching all projects');
    await getProjects(req, res);
  } catch (error) {
    console.error('Error in GET /api/projects:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get a specific project by ID
router.get('/:id', async (req, res) => {
  try {
    console.log(`GET /api/projects/${req.params.id} - Fetching project by ID`);
    await getProjectById(req, res);
  } catch (error) {
    console.error(`Error in GET /api/projects/${req.params.id}:`, error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update a project by ID
router.put('/:id', async (req, res) => {
  try {
    console.log(`PUT /api/projects/${req.params.id} - Updating project by ID`);
    await updateProject(req, res);
  } catch (error) {
    console.error(`Error in PUT /api/projects/${req.params.id}:`, error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a project by ID
router.delete('/:id', async (req, res) => {
  try {
    console.log(`DELETE /api/projects/${req.params.id} - Deleting project by ID`);
    await deleteProject(req, res);
  } catch (error) {
    console.error(`Error in DELETE /api/projects/${req.params.id}:`, error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;