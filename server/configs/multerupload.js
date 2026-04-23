const multer = require("multer")
const fs= require("fs")
const path= require("path")
const uploadpath= path.join(__dirname,"../multeruploadimgfolder")
if(!fs.existsSync(uploadpath)){
    fs.mkdirSync(uploadpath,{recursive:true})
}


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadpath)
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
    }
})



exports.upload = multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5
    },
    fileFilter:(req, file, cb)=>{
         const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed.'), false); // Reject with error
  }
    }
})