// router/User/UserAuthRoutes.js

const express = require('express');
const router = express.Router();
const authControllers = require('../../controllers/User/AuthControllers');

router.route('/').get(authControllers.home);
router.get('/register', authControllers.SignupController);
router.get('/login', authControllers.LoginController);

router.post('/login', authControllers.LoginVerifyController);
router.post('/register', authControllers.SignupAuthController);

module.exports = router;
