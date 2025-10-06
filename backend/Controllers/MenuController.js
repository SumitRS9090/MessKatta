const MenuModel = require('../Models/Menu');
const ProfileModel = require('../Models/Profile');
const {Types} = require('mongoose');
const mongoose = require('mongoose');


const addMenu = async(req,res)=>{
    try{
        const {menu,price,category,reviewerSchema} = req.body;
        //console.log(reviewerSchema);
        const user = req.user;
        const result = await ProfileModel.findOne({ownerId:user._id});
        if(!result)
            return res.status(409).send({message:'Mess not Found',success:false});
        const menuModel = new MenuModel({ownerId:user._id,messId:result._id,menu,price,category,reviewer:reviewerSchema});
    
        const resultSave = await menuModel.save();

        if(resultSave)
            return res.status(201).send({message:'Menu updated',success:true});
        else 
            return res.status(409).send({message:'Error while saving menu',success:false});
    }catch(err){
        return res.status(500).send({message:'Add Menu Error',err,success:false});
    }
}

const getMenuMess = async(req,res)=>{
    try{
        // owner id
        const user = req.user;
        // mess id
        const result = await ProfileModel.findOne({ownerId:user._id});
        if(!result)
            return res.status(409).send({message:'Mess not Found',success:false});

        const menus = await MenuModel.find({ownerId:user._id,messId:result._id});

        if(!menus)
            return res.status(200).send({data:false,success:true});
        return res.status(200).send({menus,data:true,success:true});
    }catch(err){
        return res.status(500).send({message:'Error at getMenuMess',err});
    }
}

const getMenu = async(req,res)=>{
    try{
        const {category} = req.body;
        let menu;
        if(category==='none')
            menu = await MenuModel.find();
        else 
            menu = await MenuModel.find({category:category});
        if(!menu)
            return res.status(200).send({message:'No menu found',success:true});
        else{

            // Review Calculation
            const updatedMenu = menu.map((item)=>{
                let sum = 0;

                for(let i=0;i<item.reviewer.length;i++){
                    sum += item.reviewer[i].review;
                }

                const review = item.reviewer.length > 0 ? sum / item.reviewer.length : 0;

                return{
                    ...item._doc,
                    review
                };
            },{});

            // Finding messIds to refer profile db
            const messIds = updatedMenu.filter(item=>item.messId).map(item=>{
                try{
                    return new Types.ObjectId(item.messId);
                }catch(err){
                    console.error('error',err);
                    return null;
                }
            }).filter(id=>id);


            const profile = await ProfileModel.find({_id:{$in:messIds}});

            //Merging menu and profile
            const menuAndProfileMerge = (updatedMenu,profile)=>{
                // Creating map
                const profileMap = profile.reduce((map,profileItem)=>{
                    map[profileItem._id] = profileItem;
                    return map;
                },{});

                const mergedData = updatedMenu.map(menuItem=>{

                    const matchingProfile = profileMap[menuItem.messId];
                    return{
                        ...menuItem,
                        profile:matchingProfile || null
                    };
                });
                return mergedData;
            }

            const data = menuAndProfileMerge(updatedMenu,profile);

            return res.status(200).send({data,success:true});
        }
    }catch(err){
        return res.status(500).send({message:'Error at getMenu',success:false,error:err});
    }
}

const addReview = async(req,res)=>{
    try{
        const mess = await MenuModel.findById(req.params.id);

        const {name,description,review} = req.body;

        // creating new review
        const newReview = {name,description,review,_id:new mongoose.Types.ObjectId()};
        
        const updation = await MenuModel.findByIdAndUpdate(
            req.params.id,
            {$push:{reviewer:newReview}},
            {new:true}
        );

        if(updation)
            return res.status(200).send({message:'Review Added Successfully',success:true});
        return res.status(400).send({message:'Error occured',success:false});

    }catch(err){
        return res.status(500).send({message:'Add review error',err});
    }
}

const getMenuDetail =async(req,res)=>{
    try{
        const menu = await MenuModel.find();

        if(!menu)
            return res.status(200).send({message:'No menu found',success:false});

        const updatedMenu = menu.map((item)=>{
            let sum = 0;

            for(let i=0;i<item.reviewer.length;i++){
                sum += item.reviewer[i].review;
            }

            const review = item.reviewer.length > 0 ? sum / item.reviewer.length : 0;

            //console.log(item._doc);

            const{_id,menu,price,category,messId} = item._doc;

            return{
                _id,menu,price,category,review,messId
            };
        },{});

        // Finding messIds to refer profile db
        const messIds = updatedMenu.filter(item=>item.messId).map(item=>{
            try{
                return new Types.ObjectId(item.messId);
            }catch(err){
                console.error('error',err);
                return null;
            }
        }).filter(id=>id);


        const profile = await ProfileModel.find({_id:{$in:messIds}});
        //console.log(profile);

        const profileUpdated  = profile.map((item)=>{
            const {_id,messName,address,location,description} = item;
            return {
                _id,messName,address,location,description
            };
        });

        //Merging menu and profile
        const menuAndProfileMerge = (updatedMenu,profileUpdated)=>{
            // Creating map
            const profileMap = profileUpdated.reduce((map,profileItem)=>{
                map[profileItem._id] = profileItem;
                return map;
            },{});

            const mergedData = updatedMenu.map(menuItem=>{

                const matchingProfile = profileMap[menuItem.messId];
                return{
                    ...menuItem,
                    profile:matchingProfile || null
                };
            });
            return mergedData;
        }

        const data = menuAndProfileMerge(updatedMenu,profileUpdated);

        return res.status(200).send({data,success:true});
    }catch(err){
        return res.status(500).send({message:'Error at Get Menu Details',err,success:false});
    }
}

const getFilterMenu = async(req,res)=>{
    try{
        const {category} = req.body;

        const menu = await MenuModel.find({category:category});

        if(!menu)
            return res.status(200).send({message:'No Menu Found',success:true});

        const updatedMenu = menu.map((item)=>{
            let sum = 0;

            for(let i=0;i<item.reviewer.length;i++){
                sum += item.reviewer[i].review;
            }

            const review = item.reviewer.length > 0 ? sum / item.reviewer.length : 0;

            const{_id,menu,price,category,messId} = item._doc;

            return{
                _id,menu,price,category,review,messId
            };
        },{});

        // Finding messIds to refer profile db
        const messIds = updatedMenu.filter(item=>item.messId).map(item=>{
            try{
                return new Types.ObjectId(item.messId);
            }catch(err){
                console.error('error',err);
                return null;
            }
        }).filter(id=>id);

        const profile = await ProfileModel.find({_id:{$in:messIds}});

        const profileUpdated  = profile.map((item)=>{
            const {_id,messName,address,location,description} = item;
            return {
                _id,messName,address,location,description
            };
        });

        //Merging menu and profile
        const menuAndProfileMerge = (updatedMenu,profileUpdated)=>{
            // Creating map
            const profileMap = profileUpdated.reduce((map,profileItem)=>{
                map[profileItem._id] = profileItem;
                return map;
            },{});

            const mergedData = updatedMenu.map(menuItem=>{

                const matchingProfile = profileMap[menuItem.messId];
                return{
                    ...menuItem,
                    profile:matchingProfile || null
                };
            });
            return mergedData;
        }

        const data = menuAndProfileMerge(updatedMenu,profileUpdated);

        return res.status(200).send({data,success:true});       
    }catch(err){
        return res.status(500).send({message:'Error at getFilterMenu',err});
    }
}

const deleteMenu = async(req,res)=>{
    try{
        const menu = await MenuModel.findOneAndDelete({_id:req.params.id});
        //console.log(menu);
        if(menu)
            return res.status(200).send({message:'Menu Deleted Successfully...!',success:true});
        return res.status(407).send({message:'Menu not deleted',success:false});
    }catch(err){
        return res.status(500).send({message:'Error at deleteMenu',err});
    }
}

const menuFind = async(req,res)=>{
    try{
        let {name} = req.body;
        const pattern = "^"+name.trim(); 
        const query = {menu:{$regex:pattern,$options:'i'}};
        //console.log(pattern);
        const menu = await MenuModel.find(query);
        //console.log(result.length);

        if(menu.length>=1){
            const updatedMenu = menu.map((item)=>{
                let sum = 0;
    
                for(let i=0;i<item.reviewer.length;i++){
                    sum += item.reviewer[i].review;
                }
    
                const review = item.reviewer.length > 0 ? sum / item.reviewer.length : 0;
    
                const{_id,menu,price,category,messId,reviewer} = item._doc;
    
                return{
                    _id,menu,price,category,review,messId,reviewer
                };
            },{});
    
            // Finding messIds to refer profile db
            const messIds = updatedMenu.filter(item=>item.messId).map(item=>{
                try{
                    return new Types.ObjectId(item.messId);
                }catch(err){
                    console.error('error',err);
                    return null;
                }
            }).filter(id=>id);
    
            const profile = await ProfileModel.find({_id:{$in:messIds}});
    
            const profileUpdated  = profile.map((item)=>{
                const {_id,messName,address,location,description} = item;
                return {
                    _id,messName,address,location,description
                };
            });
    
            //Merging menu and profile
            const menuAndProfileMerge = (updatedMenu,profileUpdated)=>{
                // Creating map
                const profileMap = profileUpdated.reduce((map,profileItem)=>{
                    map[profileItem._id] = profileItem;
                    return map;
                },{});
    
                const mergedData = updatedMenu.map(menuItem=>{
    
                    const matchingProfile = profileMap[menuItem.messId];
                    return{
                        ...menuItem,
                        profile:matchingProfile || null
                    };
                });
                return mergedData;
            }
    
            const data = menuAndProfileMerge(updatedMenu,profileUpdated);
            return res.status(200).send({message:'Found',result:data,success:true,data:true});
        }
            //return res.status(200).send({message:'Found',result,success:true,data:true});
        else
            return res.status(200).send({message:'Not found',success:true,data:false});

    }catch(error){
        return res.status(500).send({message:'Error at menuFind',error,success:false});
    }
}

module.exports={
    addMenu,
    getMenu,
    addReview,
    getMenuDetail,
    getFilterMenu,
    getMenuMess,
    deleteMenu,
    menuFind
};