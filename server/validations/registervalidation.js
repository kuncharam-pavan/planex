const {param} = require("express-validator")
exports.registervalidation =  [
    
    param("id").isMongoId().withMessage("it is not a valid id")
]