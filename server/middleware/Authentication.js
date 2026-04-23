const jwt = require("jsonwebtoken")
const user_model = require("../models/usermodel.js")
const {secret_key} = require("../constants/env.js")
exports.authentication = async(req,res,next)=>{
  try {
     const {authorization} = req.headers
    // console.log(authorization)
   if(!authorization){
    return res.send("token is not  added to the headers")
   }
   const token = authorization.split(" ")[1]
   const check_token = await jwt.verify(token,secret_key)
    //  console.log(check_token)
   if (!check_token){
        return res.send("not a valid token/ incorrect token")
   }
    //checking with the database
   const check_bd =  await user_model.findOne({_id:check_token.id})
   if(check_bd){
    // this is for using this data in other files
    req.user = check_bd
    // console.log(req.user)
    next();
   }
   else{
    return res.status(401).json({success:false,
                                message:"unauthorized user",
                                error:{code:"unouthorized user",
                                data:null
                                }})
   }
  } catch (error) {
    const err = new Error(error)
    err.statusCode = 401
    next(err)
  }
}