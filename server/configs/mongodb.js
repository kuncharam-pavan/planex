const mongoose = require("mongoose")
const {mongouri,mongodbname} = require("../constants/env.js")
exports.connectdb = async()=>{
  
    try {
            // dbName is key we cant change
         await mongoose.connect(mongouri,{dbName:mongodbname})
        console.log(`database is connected successfully ${mongodbname}`)
    } catch (error) {
        console.log("database connection error")
        throw new Error(error)
    }
}
