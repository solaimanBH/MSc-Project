// src/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { verifyToken, adminOnly } = require('../middlewares/access-control.middleware');

// Create a new task
router.post('/', verifyToken, adminOnly, async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// Get all tasks
router.get('/', async (_req, res) => {
  try {
    const tasks = await Task.find().populate('volunteer', 'name');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('volunteer', 'name');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a task by ID
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task by ID
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/changeStatus/:taskId/:status', async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.taskId, { status: req.params.status });
    if (!updated) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task Updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

})

module.exports = router;
