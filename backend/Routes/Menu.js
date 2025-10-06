const express = require('express');
const { ownerValidation, menuValidation, reviewValidation, filterValidation, menuFilterValidation } = require('../MiddleWare/Validation');
const { addMenu, getMenu, addReview, getMenuDetail, getFilterMenu, getMenuMess, deleteMenu, menuFind } = require('../Controllers/MenuController');

const router = express.Router();

router.post('/addMenu',ownerValidation,menuValidation,addMenu);

router.post('/getMenu',ownerValidation,filterValidation,getMenu);

router.post('/addReview/:id',ownerValidation,reviewValidation,addReview);

router.get('/getMenuDetails',ownerValidation,filterValidation,getMenuDetail);

router.post('/getFilterMenu',ownerValidation,filterValidation,getFilterMenu);

router.get('/getMessMenu',ownerValidation,getMenuMess);

router.get('/deleteMenu/:id',ownerValidation,deleteMenu);

router.post('/filter',ownerValidation,menuFilterValidation,menuFind);

module.exports = router;