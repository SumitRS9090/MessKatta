const express = require('express');
const { ownerValidation, profileValidation } = require('../MiddleWare/Validation');
const { addProfile, getProfile } = require('../Controllers/ProfileController');

const router  = express.Router();

router.post('/addProfile',ownerValidation,profileValidation,addProfile);

router.get('/getprofile',ownerValidation,getProfile);

module.exports = router;