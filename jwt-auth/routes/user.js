const userController = require('../controllers/user');
const express = require('express');
const check_auth = require('../middleware/check_auth');

const router = express.Router()

router.post('/signup',userController.register_user);
router.post('/login', userController.login_user);
router.get('/details',check_auth,userController.user_details);

module.exports = router;