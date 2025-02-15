const { Router } = require('express');
const taskController = require('../controllers/taskController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.get('/', requireAuth, taskController.tasks_get);
router.get('/new', requireAuth, taskController.new_task_get); 
router.get('/:id', requireAuth, taskController.task_details_get);
router.get('/edit/:id', requireAuth, taskController.task_edit_get); 

router.post('/new', requireAuth, taskController.new_task_post);
router.post('/edit/:id', requireAuth, taskController.task_edit_post);

router.delete('/delete/:id', requireAuth, taskController.task_delete);

module.exports = router;