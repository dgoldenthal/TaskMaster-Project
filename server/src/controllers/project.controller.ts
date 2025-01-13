import { Request, Response } from 'express';
import Project from '../models/project.model';

// Create Project
export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description, ownerId } = req.body;

    if (!name || !ownerId) {
      return res.status(400).json({ message: 'Name and ownerId are required' });
    }

    const newProject = await Project.create({ name, description, ownerId });
    return res.status(201).json({ message: 'Project created', project: newProject });
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({ message: 'Failed to create project' });
  }
};

// Fetch All Projects
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.findAll();
    return res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

// Get a Specific Project by ID
export const getProjectById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const ownerId = req.user?.id;

        const project = await Project.findOne({ where: { id, ownerId } });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        return res.status(200).json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        return res.status(500).json({ message: 'Failed to fetch project', error: error.message });
    }
};

// Update a Project
export const updateProject = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const ownerId = req.user?.id;
        const { title, description, startDate, dueDate } = req.body;

        const project = await Project.findOne({ where: { id, ownerId } });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await project.update({ title, description, startDate, dueDate });

        return res.status(200).json({ message: 'Project updated successfully', project });
    } catch (error) {
        console.error('Error updating project:', error);
        return res.status(500).json({ message: 'Failed to update project', error: error.message });
    }
};

// Delete a Project
export const deleteProject = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const ownerId = req.user?.id;

        const project = await Project.findOne({ where: { id, ownerId } });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await project.destroy();

        return res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        return res.status(500).json({ message: 'Failed to delete project', error: error.message });
    }
};
