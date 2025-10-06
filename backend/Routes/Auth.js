const express = require('express');
const {login,signUp} = require('../Controllers/AuthController');
const {signUpValidation,loginValidation} = require('../MiddleWare/Validation');
const router = express.Router();

router.post('/login',loginValidation,login);

router.post('/signup',signUpValidation,signUp);

module.exports = router;