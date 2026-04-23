exports.fileuploaded =  async(req,res,next)=>{
    try {
        res.send("files are uploaded sucessfully")
    } catch (error) {
        console.log(error)
        next(error)
    }
}