const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');
const check_auth = require('../middlewares/appMiddleware');

router.get('/',appController.get_index);
router.get('/register',appController.get_register);
router.get('/login',appController.get_login);
router.get('/books',check_auth,appController.get_books);

router.post('/register',appController.post_register);
router.post('/login',appController.post_login);

module.exports = router;