exports.apinotfound = (req,res,next)=>{
    res.status(404).json({endpoints:req.method + req.url,msg:"api not found"})
} 