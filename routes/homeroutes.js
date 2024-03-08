const controller = require('../controllers/controller');
const express = require('express');

const router = express.Router();

router.get('', controller.homepage);
router.get('/dashboard', controller.dashboard);
router.get('/login', controller.loginpage);
router.get('/signup', controller.signuppage);
router.post('/login', controller.login_post);
router.post('/signup', controller.signup_post);
router.post('/logout', controller.logout_post);

module.exports = router;