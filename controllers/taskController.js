const Task = require('../models/Task');
const { requireAuth } = require('../middleware/authMiddleware');
const mongoose = require('mongoose');

module.exports.tasks_get = async (req, res) =>{
    try{
        const tasks = await Task.find({ userId: req.user });
        res.render('tasks', { tasks });
    } 
    catch(err){
        console.log(err);
        res.status(500).send('error at searching for task');
    }
}

//    "userId": "67abc209456cece3ac439a7c"

module.exports.new_task_post = async (req, res) => {
    /*const { title, description, status} = req.body;

    try {
        const newTask = await Task.create({title, description, status, userId: req.user});
*/
    const { title, description, status, userId} = req.body;

    try {
        const newTask = await Task.create({title, description, status, userId });
        res.status(201).json({message: 'task created successfullt', task: newTask});
    }catch(err){
        console.log(err);
        res.status(400).json({message: 'failed to create a new task'});
    }
}