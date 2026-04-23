exports.globalerror = (error,req,res,next)=>{
    
         res.status(error.statusCode || 500).json({
                success:false,
                message:"something went wrong",
                error:{
                    code:"something went wrong",
                    details:error.message
                }
                
            })
    
}