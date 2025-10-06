const joi = require('joi');
const jwt = require('jsonwebtoken');

const loginValidation = (req,res,next)=>{
    const schema = joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(4).max(8).required(),
        role:joi.string().required()
    });

    const {error} = schema.validate(req.body);

    if(error)
        return res.status(400).json(error);
    console.log('hi');
    next();
}

const signUpValidation = (req,res,next) => {
    const schema = joi.object({
        name:joi.string().min(3).max(20).required(),
        email:joi.string().email().required(),
        password:joi.string().min(4).max(8).required(),
        role:joi.string().required()
    }); 

    const {error} = schema.validate(req.body);

    if(error)
        return res.status(400).json(error);
    next();
}

const profileValidation = (req,res,next)=>{
    const schema = joi.object({
        messName:joi.string().min(5).required(),
        description:joi.string().min(5).required(),
        address:joi.string().min(4).required(),
        location:joi.string().min(4).required()
    });
    const {error} = schema.validate(req.body);

    if(error)
        return res.status(400).json(error);
    next();
}

const ownerValidation = (req,res,next)=>{
    try{
        const token = req.headers['authorization']?.split(' ')[1];
        if(!token)
            return res.status(403).send({message:'Token Required'});
        jwt.verify(token,process.env.JWTSECRET,(err,decoded)=>{
            if(err)
                return res.status(401).send({message:'Invalid token',err});
            req.user = decoded;
            next();
        });
    }catch(err){
        return res.status(500).json({message:'Owner Validation Error',err,success:false});
    }
}

const reviewValidation = (req,res,next)=>{
    try{
        const reviewSchema = joi.object({
            name:joi.string().required(),
            description:joi.string().min(3).required(),
            review:joi.number().min(0).max(5).required()
        });

        const {error} = reviewSchema.validate(req.body);

        if(error)
            return res.status(400).send({message:'Validation error at review',error});

        next();

    }catch(err){
        return res.status(500).send({message:'Review validation error',err});
    }
}

const menuValidation = (req,res,next)=>{
    try{
        const reviewerSchema = joi.object({
            name:joi.string().required(),
            description:joi.string().required(),
            review:joi.number().min(0).max(5).required()
        });

        // const menuSchema = joi.object({
        //     name:joi.string().min(2).required(),
        //     price:joi.number().min(0).required(),
        //     category:joi.string().min
        // });

        const schema = joi.object({
            menu:joi.string().min(3).required(),
            price:joi.number().min(0).required(),
            category:joi.string().min(3).required(),
            reviewerSchema:joi.array().items(reviewerSchema).optional()
        });

        const {error} = schema.validate(req.body);

        if(error){
            return res.status(400).send({message:'Provide valid details',error});
        }
        next();

    }catch(err){
        return res.status(500).send({message:'Menu validation error',err,success:false});
    }
}

const filterValidation = (req,res,next)=>{
    try{
        const schema = joi.object({
            category:joi.string().min(3).required()
        });
        const {error} = schema.validate(req.body);

        if(error)
            return res.status(407).send({message:'filter validation error',error,success:false});
        next();
    }catch(err){
        return res.status(500).send({message:'Validation error at Filter'});
    }
}

const menuFilterValidation = (req,res,next)=>{
    try{
        const schema = joi.object({
            name:joi.string().min(3).required()
        });

        const {error} = schema.validate(req.body);

        if(error)
            return res.status(407).send({message:'menuFilterValidation Error',error});
        next();
    }catch(err){
        return res.status(500).send({message:'Error at menuFilterValidation',success:false});
    }
}

module.exports = {
    loginValidation,
    signUpValidation,
    profileValidation,
    ownerValidation,
    menuValidation,
    reviewValidation,
    filterValidation,
    menuFilterValidation
};
