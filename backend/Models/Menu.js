const mongoose = require('mongoose');
const {MENUDB} = require('./config');
const { required } = require('joi');


const reviewSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    review:{
        type:Number,
        required:true,
        min:0
    }
});

// const menuSchema = mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     price:{
//         type:Number,
//         required:true,
//         min:0
//     },
//     category:{
//         type:String,
//         required:true,
//     }
// });

const MenuSchema = mongoose.Schema({
    ownerId:{
        type:String,
        required:true
    },
    messId:{
        type:String,
        required:true
    },
    menu:{
        type:String,
        required:true 
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    category:{
        type:String,
        required:true
    },
    review:{
        type:Number,
        required:false,
        min:0
    },
    reviewer:[reviewSchema]
});

const MenuModel = MENUDB.model('menus',MenuSchema);

module.exports = MenuModel;