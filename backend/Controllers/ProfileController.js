const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ProfileModel = require('../Models/Profile');
const UserModel = require('../Models/User');

const addProfile = async(req,res)=>{
    try{
        const user = req.user;

        const{messName,description,address,location} = req.body;
        const identifyUser = await UserModel.findOne({email:user.email});
        if(!identifyUser)
            return res.status(401).send({message:'User not found',success:false});

        const result = await ProfileModel.updateOne({ownerId:user._id},{$set:{ownerId:user._id,messName:messName,description:description,address:address,location:location}},{upsert:true});

        if(result)
            return res.status(201).send({message:'Updated successfully',success:true});
        return res.status(401).send({message:'Error occured',success:false});
    }catch(error){
        return res.status(500).send({message:'Add Profile Error',error,success:false});
    }
}

const getProfile = async(req,res)=>{
    try{
        const user = req.user;
        const profile = await ProfileModel.findOne({ownerId:user._id});
        if(!profile)
            return res.status(200).send({data:false,success:true});
        return res.status(200).send({profile,success:true,data:true});
    }catch(err){
        return res.status(500).send({message:'Get Profile Error',err});
    }
}

module.exports={
    addProfile,
    getProfile
};