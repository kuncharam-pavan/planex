// for verify the data from two Schema like joins in sql
const event_model = require("../models/eventmodel.js")
const users = require("../models/usermodel.js")
const cloudinary= require("../configs/cloudinary.js")
const fs = require("fs")
exports.createevent = async(req,res,next)=>{
    try {
        // title,descripition,category,location,date,capicity,price
        const {title,descripition,category,location,date,capicity,price} = req.body
    
         // upload the image to the  clouduinary
         if (!req.file) {
            return res.json({ message: "Poster required" });
            }
        const cloud_upload  = await cloudinary.uploader.upload(req.file.path,{
            folder:"planex",
            public_id:"event poster"+Date.now(),
            resource_type:"image"
        }) 
        fs.unlink(req.file.path,()=>{})
        // console.log(cloud_upload);
        

        const eventdata = await event_model.create({
            title,
            descripition,
            category,
            location,
            date,
            capicity,
            price,
            posterimg:cloud_upload.secure_url,
            organiserid:req.user._id
        })
        // console.log(eventdata)
        // adding data to the user model
        const addevent = await users.findByIdAndUpdate(req.user._id,{$push:{events:eventdata._id}})
         return res.json({success:true,
                           message:"event created successfully",
                           error:{
                                  code:"event creeated successfully",
                                  data:eventdata}})
         
    }catch (error) {
        const err = new Error(error)
        err.statusCode = 400
        next(err)
    }
}
exports.getallevent = async(req,res,next)=>{
    try {
        const allevents = await event_model.find()
        res.json({success:true,
                           message:"all the events held in the planex",
                           error:{
                                  code:"all the events held in the planex",
                                  data:allevents}})
    } catch (error) {
       const err = new Error(error)
        err.statusCode = 400
        next(err)
    }
}
exports.getevent =  async(req,res,next)=>{
    try {
        // console.log(req.params.id)
        const single_user_data  = await event_model.findById(req.params.id)
        if(!single_user_data){
            return res.json({success:true,
                           message:"event not found",
                           error:{
                                  code:"event not found",
                                  data:null}})
        }
        res.json({success:true,
                           message:"data has been came based on the id ",
                           error:{
                                  code:"user data ",
                                  data:single_user_data}})
        
    } catch (error) {
        const err = new Error(error)
        err.statusCode = 400
        next(err)
    }
}
exports.updateevent = async(req,res,next)=>{
    try {
        // title,descripition,category,location,date,capicity,price
        // console.log(req.file)
        const checkevent  = await event_model.findOne({_id:req.params.id,organiserid:req.user._id})
        if(checkevent){
            checkevent.title = req.body.title
            checkevent.descripition =  req.body.descripition
            checkevent.category = req.body.category
            checkevent.location = req.body.location
            checkevent.data =req.body.date
            checkevent.capicity = req.body.capicity
            checkevent.price = req.body.price
           if(req.file){
             const upload_cloud = await cloudinary.uploader.upload(req.file.path,{
                folder:"planex",
                public_id:"updated poster",
                resource_type:"image"
                
            })
            checkevent.posterimg = upload_cloud.secure_url
           }
           
           
           fs.unlink(req.file.path,()=>{})
            checkevent.save()
            res.json({success:true,
                           message:"data updated successfully",
                           error:{
                                  code:"data has updated",
                                  data:checkevent}})

        }
        
    } catch (error) {
        const err = new Error(error)
        err.statusCode = 400
        next(err)
    }
}
exports.deleteevent =   async(req,res,next)=>{
    try {
        const checkevent = await event_model.findById({_id:req.params.id,organiserid:req.user.id})
        if(checkevent){
            // const deleteevent = await event_model.deleteOne()
            //                      or
            const deleteevent = await event_model.findByIdAndDelete({_id:req.params.id})
            res.json({success:true,
                           message:"event deleted successfully",
                           error:{
                                  code:"data has deleted",
                                  data:deleteevent}})
        }
        else{
            res.json({msg:"event not found"})
        }
    } catch (error) {
        const err = new Error(error)
        err.statusCode = 400
        next(err)
    }
}