exports.authorization = (...roles)=>{
    return (req,res,next)=>{
       if(roles.includes(req.user.role)){
        next()
       }
       else{
        res.json({
            success: false,
            message: "access denied",
            error: {
                code: "access denied",
                data: null
            }
        })
       }
    }
}