const mongoose = require("mongoose")
// name,email,password,role,profileimg,createdaccount
const user_model = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true,unique:true},
    password:{type:String,required:true,trim:true,unique:true},
    role:{type:String,required:true,enum:["participant","organiser","admin"],default:"participant"},
    profileimg:{ 
        filepath:{type:String,default:"profile_image"},
        fileurl:{type:String,default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtORynMFTrfC9LlfWrcABXyLRzfmO1OmJU-w&s"}
    },
    events:[
        {type:mongoose.Types.ObjectId,ref:"event_model"}//joing the Schema with event_model
    ]
},{timestamps:true})
module.exports = mongoose.model("users",user_model) 