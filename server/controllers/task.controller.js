const { Task, Log } = require('../models');
const { WebClient } = require('@slack/web-api');
const { Op } = require('sequelize');

// Slack API client
const slackClient = new WebClient(process.env.SLACK_TOKEN);

// Log activity function
const logActivity = async (action, details, userId) => {
    try {
        await Log.create({ action, details: JSON.stringify(details), userId });
    } catch (error) {
        console.error('Failed to log activity:', error.message);
    }
};

// Create Task
exports.createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;

        if (!title || !priority || !dueDate) {
            return res.status(400).json({ message: 'Title, priority, and due date are required' });
        }

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
        });

        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        console.error('Error creating task:', error.message);
        res.status(500).json({ message: 'Failed to create task', error: error.message });
    }
};

// Get All Tasks with Optional Filtering
exports.getTasks = async (req, res) => {
    try {
        const { projectId, title, status, dueDate } = req.query;

        const where = {};
        if (projectId) where.projectId = projectId;
        if (title) where.title = { [Op.like]: `%${title}%` };
        if (status) where.status = status;
        if (dueDate) where.dueDate = { [Op.eq]: dueDate };

        const tasks = await Task.findAll({ where });
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
    }
};

// Get Task by ID
exports.getTaskById = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error('Error fetching task:', error.message);
        res.status(500).json({ message: 'Failed to fetch task', error: error.message });
    }
};

// Update Task
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, priority, dueDate } = req.body;

        const task = await Task.findByPk(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        await task.update({ title, description, priority, dueDate });

        req.io.emit('taskUpdated', { taskId: id, changes: req.body });

        await logActivity('updateTask', { task }, req.user?.id || null);

        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        console.error('Error updating task:', error.message);
        res.status(500).json({ message: 'Failed to update task', error: error.message });
    }
};

// Delete Task
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByPk(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        const taskTitle = task.title;
        await task.destroy();

        req.io.emit('taskDeleted', { taskId: id });

        await logActivity('deleteTask', { taskId: id }, req.user?.id || null);

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error.message);
        res.status(500).json({ message: 'Failed to delete task', error: error.message });
    }
};
