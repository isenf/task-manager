const { Router } = require('express');
const authController = require('../controllers/authController');
const {requireAuth} = require('../middleware/authMiddleware')

const router = Router();

router.get('/register', requireAuth ,authController.register_get);
router.post('/register', authController.register_post);
router.get('/login', requireAuth, authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

module.exports = router;