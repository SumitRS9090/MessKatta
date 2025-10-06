const mongoose = require('mongoose');
const {AUTHDB} = require('./config');

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
});

const UserModel = AUTHDB.model('users',UserSchema);

module.exports = UserModel;