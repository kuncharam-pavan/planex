const user_model = require("../models/usermodel.js")


exports.user = async(req,res,next)=>{
    try {
        // res.send("all users ")
        const data = await user_model.find({role:{$ne:"admin"}})
        res.json({success:true,message:"total all user information",error:{code:"all registed data ",data:data}})
    } catch (error) {
       const err = new Error(error)
        err.statusCode = 400
        next(err)
    }
}

exports.finduser = async(req,res,next)=>{
    try {
        
        // res.send("successfully find user")
        const user = await user_model.findOne({_id:req.params.id,role:{$in:["participant","organiser"]}})
        if(!user){
             return res.json({success:false,
                           message:"no user found",
                           error:{
                                  code:"no user found",
                                  data:user}})
        }
          return res.json({success:true,
                           message:"feteche user by id or you are not be able to access it",
                           error:{
                                  code:"user data",
                                  data:user}})
    } catch (error) {
         const err = new Error(error)
        err.statusCode = 400
        next(err)
    }
}

exports.deleteuser = async(req,res,next)=>{
     try {
        
        // res.send("successfully find user")
        const user = await user_model.findOneAndDelete({_id:req.params.id, role: { $in: ["participant", "organiser"]}})
        
          return res.json({success:true,
                           message:"data has been deleted successfully",
                           error:{
                                  code:"user data",
                                  data:user}})
    } catch (error) {
         const err = new Error(error)
        err.statusCode = 400
        next(err)
    }
}