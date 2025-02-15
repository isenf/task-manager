const Task = require('../models/Task');
const { requireAuth } = require('../middleware/authMiddleware');
const mongoose = require('mongoose');

module.exports.tasks_get = async (req, res) =>{
    try{
        const tasks = await Task.find({ userId: req.user });
        res.render('tasks/index', { tasks });
    } 
    catch(err){
        console.log(err);
        res.status(500).send('error at searching for task');
    }
}

module.exports.task_details_get = async (req, res) =>{
    const { id } = req.params;

    try{
        const task = await Task.findById(id);

        if(!task){
            return res.status(404).json({message: 'task not found'});
        }

        res.status(200).json(task);
    }
    catch(err){
        console.error(err);
        return res.status(500).json({message: 'error at founding task', error: err.message});
    }
}

module.exports.new_task_get = (req, res) =>{
    res.render('tasks/form', {
        title: 'Create a new task',
        task: null,
        action: '/task/new'
    });
}

module.exports.task_edit_get = async (req, res) =>{
    const { id } = req.params;

    try{
        const task = await Task.findById(id);

        if(!task){
            return res.status(404).send('task not found');
        }

        res.render('tasks/form', {
            title: 'Edit task',
            task,
            action: `/task/edit/${id}`
        });
    }
    catch(err){
        console.error(err);
        res.send(500).send('error at finding task');
    }
}

module.exports.new_task_post = async (req, res) => {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newTask = await Task.create({ title, description, status, userId: req.user });
        res.status(201).redirect('/task');
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Failed to create a new task', error: err.message });
    }
};

module.exports.task_edit_post = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    try {
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;

        const updatedTask = await task.save();

        return res.status(200).redirect('/task')
    } 
    catch (err) {
        console.error(err);
        return res.status(400).json({
            message: 'Failed to update task',
            error: err.message
        });
    }
}

module.exports.task_delete = async (req, res) =>{
    const { id } = req.params;

    try{
        const task = await Task.findByIdAndDelete(id);

        if(!task){
            res.status(404).json({message: 'task not found'});
        }

        res.status(200).json({message: 'task deleted successfully'});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: 'error at deleting task', error: err.message});
    }
}