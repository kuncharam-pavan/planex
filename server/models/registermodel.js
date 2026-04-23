const mongoose = require("mongoose")

const register_model = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId,required:true,ref:"users"},
    eventId:{type:mongoose.Types.ObjectId,required:true,ref:"event_model"},
    status:{type:String,required:true,default:"pending"},
    registrationdate:{type:Date,required:true}

},{timestamps:true})

module.exports = mongoose.model("event_register",register_model)