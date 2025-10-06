const mongoose = require('mongoose');
const {PROFILEDB}  = require('./config');
const { required } = require('joi');

const ProfileSchema = mongoose.Schema({
    ownerId:{
        type:String,
        required:true
    },
    messName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    }
});

const ProfileModel = PROFILEDB.model('profile',ProfileSchema);

module.exports = ProfileModel;