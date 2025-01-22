// server/routes/taskRoutes.js
const express = require('express');
const { Task } = require('../models'); // Sequelize Task model
const router = express.Router();
const rbacMiddleware = require('../middleware/rbacMiddleware');

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks.' });
    }
});

// Get a task by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        res.json(task);
    } catch (error) {
        console.error('Error fetching task by ID:', error);
        res.status(500).json({ error: 'Failed to fetch task.' });
    }
});

// Create a new task
router.post('/', async (req, res) => {
    try {
        const { title, description, priority, dueDate, status } = req.body;
        const newTask = await Task.create({
            title,
            description,
            priority,
            dueDate,
            status,
        });
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task.' });
    }
});

// Update a task
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, priority, dueDate, status } = req.body;
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        await task.update({
            title,
            description,
            priority,
            dueDate,
            status,
        });

        res.json(task);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Failed to update task.' });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        await task.destroy();
        res.json({ message: 'Task deleted successfully.' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Failed to delete task.' });
    }
});

module.exports = router;
