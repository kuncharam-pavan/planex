const {param} = require("express-validator")

// this wiill be for both find user and delete user because both have id 
exports.alluservalidation = [
    param("id").isMongoId().withMessage("it is not a valid id")
]
