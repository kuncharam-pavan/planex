const user_model  = require("../models/usermodel.js")


const { generate_hash_password,token_generator} = require("../unitlities(helperfunction)/authHelperFunction.js")

// these are from nodemailer from configs
const {nodemailer_mail} = require("../configs/nodemailer.js")


// to do bycrypt opr
const bcrypt = require("bcrypt")

// information fronm .env file

// here env is  a object 
const env =  require("../constants/env.js")

// data from cloudinary
const cloudinary = require("../configs/cloudinary.js")

// fs module

const fs = require("fs")



exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body
        // console.log(name,email,password,role)
        const user_data = await user_model.findOne({ email: email })
        if (user_data) {
            return res.json({
                success: false,
                message: "email alredy exists",
                error: {
                    code: "email exixts",
                    details: null
                }
            })
        }
        hash_password = await generate_hash_password(password)
        const data = await user_model.insertOne({
            name: name,
            email: email,
            password: hash_password,
            role: role
        })
        // nodemailer  operation
        // env is a object importted from theb env.js from that emaila dn password has taken
         const k = await nodemailer_mail.sendMail({
            from:env.email,
            to:email,
            subject:"welcome to planex",
            html:`<h3>Hi ${name},</h3>
           <p>You have been successfully registered.</p>
           this is the best wedding planner website `
        })
        // console.log(k)

        // token
        // const generate_token  = await token_generator({email:email})
        

        return res.json({
            success: true,
            message: "successfully inserted",
            error: {
                code: "data added to database",
                data: data
            }
        })

    } catch (error) {
        const err = new Error(error)
        err.statusCode = 400
        next(err)
    }
}


exports.signupOrganarizer = async (req, res,next) => {
    try {
        const { name, email, password} = req.body
        // console.log(name,email,password)
        const user_data = await user_model.findOne({ email: email })
        if (user_data) {
            return res.json({
                success: false,
                message: "email alredy exists",
                error: {
                    code: "email exixts",
                    details: null
                }
            })
        }
        
        const hash_password = await generate_hash_password(password)
        const data = await user_model.create({
            name: name,
            email: email,
            password: hash_password,
            role: "organiser"
        })
        // nodemailer  operation
        
        await nodemailer_mail.sendMail({
            from:env.email,
            to:email,
            subject:"welcome to planex",
            html:`<h3>Hi ${name},</h3>
           <p>You have been successfully registered as event organiser .</p>
           this is the best wedding planner website `
        })
        const user_info = {
            email:data.email,
        
        }
        const generate_token  = await token_generator({id:data._id})

        return res.json({
            success: true,
            message: "signup successfully ",
            error: {
                code: "signup successfully",
                data: data
            },
            token:generate_token
        })


    } catch (error) {
        const err = new Error(error)
        err.statusCode = 400
        next(err)
    }
}



exports.login = async (req, res,next) => {
    try {
        
        const { email, password} = req.body
        // console.log(email, password)
        const data = await user_model.findOne({ email: email })
        // console.log(data)
        if (!data) {
            return res.send("your are not yet registered")
        }
       const comparing = await bcrypt.compare(password,data.password)
    //    console.log(comparing)
       if(!comparing){
            return res.send("invalid username/password")
       }

       else{
        //    token generator
        const user_info = {
            id:data._id,
            name:data.name,
            email:data.email,
            role:data.role
        }
        const generate_token  = await token_generator({id:data._id})
        // console.log(generate_token)
            return res.json({msg:"you are the valid user",data:data,token:generate_token})

       }
    } catch (error) {
        const err = new Error(error)
        err.statusCode = 400
        next(err)
    }
}


exports.profile = async (req, res,next) => {
    try {
        const profile =  await user_model.findById(req.user._id)
        res.json({success: true,
            message: "feteched user profile",
            error: {
                code: "feteched user profile",
                data: profile
            }
        })
    } catch (error) {
         const err = new Error(error)
        err.statusCode = 400
        next(err)
    }

}

exports.updateprofile = async (req, res,next) => {
    try {
        
        const {name,email,password} = req.body
        // console.log(name,email,password)

        // this if stmt is used to check after updating tha data then it will be shown whether it is update 
        // or not first login then come and check update data once more the n it will show alredy exists
        if(await user_model.findOne({email:email})){
            return res.json({msg:"email already exists",data:email})
        }
        let file;
        if(req.file){
            if(req.file.mimetype.startsWith("image/")){

                if (!fs.existsSync(req.file.path)) {
                    return res.json({ msg: "File missing before upload" });
        }
            
            // cloudinary
            const cloud_file  = await cloudinary.uploader.upload(req.file.path,{
                folder:"planex",
                resource_type:"image",
                public_id:"updated user img"+Date.now()
            })
            file = cloud_file
            // console.log(cloud_file)
            fs.unlinkSync(req.file.path)
        }
        else{
            return res.json({success:false,
            message: "it will be accept only images",
            error: {
                code: "it will be accept only images",
                data: null
            }
        })
        }
        
        }
        else{
            return res.json({success:false,
            message: "your not uploaded the file ",
            error: {
                code: "your not uploaded the file",
                data: null
            }
        })
        }
        
        if(name||email||password||file){
            
            if(password){
                const hash_pass = await generate_hash_password(password)
                const update_data = await user_model.findByIdAndUpdate(req.user._id,{
                name:name,
                email:email,
                password:hash_pass,
                profileimg:{
                    filepath:file.asset_folder+"/"+file.original_filename || null,
                    fileurl:file.url || null
                }
            },{new:true})
            return  res.json({msg:"profile updated successfully",data:update_data})
            }
            else{
                const update_data = await user_model.findByIdAndUpdate(req.user._id,{
                name:name,
                email:email,
                profileimg:{
                    filepath:file.asset_folder+"/"+file.original_filename || null,
                    fileurl:file.url || null
                }
            },{new:true})
            return  res.json({msg:"profile updated successfully",data:update_data})
            }
            
        }
        else{
            const data = await user_model.findById(req.user._id)
            return  res.json({msg:"profile updated successfully",data:data})
        }
        
        
    } catch (error) {
        const newError = new Error(error.message)
        newError.statusCode = 400
        return next(error)
    }

}