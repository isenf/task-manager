const { Router } = require('express');
const taskController = require('../controllers/taskController');

const router = Router();

//isso tudo é muito confuso....
router.get('/', taskController.tasks_get); //view index.ejs
router.get('/new-task', taskController.new_task_get); //view form.ejs
router.post('/new-task', taskController.new_task_post); 
router.get('/:id', taskController.task_details_get); //view details.ejs
router.get('/edit/:id', taskController.task_edit_get); //view form.ejs
router.post('/edit/:id', taskController.task_edit_post);
router.delete('/delete/:id', taskController.task_delete)

module.exports = router;