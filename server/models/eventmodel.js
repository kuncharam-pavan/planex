const mongoose = require("mongoose")


const event_schema =new  mongoose.Schema({
    title:{type:String,required:true},
    descripition:{type:String,required:true},
    category:{type:String,required:true}, // Example: "music", "sports", etc.
    location:{type:String,required:true},
    date:{type:Date,required:true}, // date for mate "2026-05-10"
    capicity:{type:Number,required:true},
    posterimg:{type:String,required:true},
    organiserid:{type:mongoose.Types.ObjectId,required:true,ref:"users"}, 
// Types = “I want to create/use an ObjectId” 👉 Schema.Types = “This field should store an ObjectId”
// ref is for makingthe realtion ship and like joining the both the schema
    price:{type:Number,required:true}  // each ticket price
},{timestamps:true})

module.exports = mongoose.model("event_model",event_schema)