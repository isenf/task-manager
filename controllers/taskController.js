const Task = require('../models/Task');
const { requireAuth } = require('../middleware/authMiddleware');

module.exports.tasks_get = async (req, res) =>{
    try{
        const tasks = await Task.find({ userId: req.user });
        res.render('tasks', { tasks });
    } 
    catch (err){
        console.log(err);
        res.status(500).send('error at searching for task');
    }
}