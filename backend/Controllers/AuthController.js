const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User');

const login = async(req,res)=>{
    try{
        const {email,password,role} = req.body;
        const user = await UserModel.findOne({email});
        //console.log(user);
        if(user){
            const isPassEqual = await bcrypt.compare(password,user.password);

            if(!isPassEqual || user.role != role)
                return res.status(403).json({message:'Password is Incorrect or Invalid Role',success:false});
            
            const token = jwt.sign(
                {email:user.email,_id:user._id},
                process.env.JWTSECRET,
                {expiresIn:'1d'}
            );

            return res.status(200).json({message:'Login Successful !',success:true,token,name:user.name,role:user.role});
        }else 
            return res.status(403).json({message:'User not found',success:false});
    }catch(error){
        console.log('Login error',error);
        return res.status(500).json({message:'Login Error',success:false,error});
    }
}

const signUp = async(req,res)=>{
    try{
        const{name,email,password,role} = req.body;
        const user = await UserModel.findOne({email});
        if(user)
            return res.status(403).json({message:'Email is already exists',success:false});
        const userModel = new UserModel({name,email,password,role});
        userModel.password = await bcrypt.hash(password,10); //salt
        
        const result = await userModel.save();

        if(result)
            return res.status(201).json({message:'SignUp Successful!',success:true});
        return res.status(403).json({message:'Error while saving data',success:false});
    }catch(error){
        return res.status(500).json({message:'SignUp Error',success:false,error});
    }
}

module.exports={
    login,
    signUp
};
