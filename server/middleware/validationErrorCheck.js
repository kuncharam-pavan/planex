const{validationResult} = require("express-validator")

exports.validation  =  async(req,res,next)=>{
   const errors =  await validationResult(req)

   if(!errors.isEmpty()){
        return res.status(400).json({
            "success":false,
            "message":"validation error",
            "error":{
                "code":"validation error",
                "details":errors.array()
            }
        })
   }
   next();
}