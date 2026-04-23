const multer = require("multer")

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"eventmulterupload")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
    }
})

const event_storage = multer({
    storage:storage,
    fileFilter:(req,file,cb)=>{
        const accptdata = ["image/jpg","image/jpeg","image/png"]
        if(accptdata.includes(file.mimetype)){
            cb(null,true)
        }
        else{
            cb(new Error("only  jpg,jpeg,png files are accepted"),false)
        }
    }
})
module.exports = event_storage