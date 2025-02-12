const { Router } = require('express');
const taskController = require('../controllers/taskController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.get('/', requireAuth, taskController.tasks_get);
//router.get('/new-task', taskController.new_task_get); //view form.ejs
router.post('/new-task', taskController.new_task_post);
router.get('/:id', taskController.task_details_get);
//router.get('/edit/:id', taskController.task_edit_get); //view form.ejs
router.post('/edit/:id', requireAuth, taskController.task_edit_post);
//router.delete('/delete/:id', taskController.task_delete);

module.exports = router;