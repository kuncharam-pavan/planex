const {body,param} = require("express-validator")

exports.createeventvalidation = [
    // title,descripition,category,location,date,capicity,price
    body("title")
    .exists().withMessage("title is  mandatory")
    .bail()
    .isString().withMessage("it should be A-Z or a-zor in string char"),
    body("descripition")
    .exists().withMessage("desccripition is  mandatory")
    .bail()
    .isString().withMessage("it should be string")
    .isLength({min:10}).withMessage("it should be min 10 char"),
    body("category")
    .exists().withMessage("category is  mandatory")
    .bail()
    .isString().withMessage("category should be string"),
    body("location")
    .exists().withMessage("location is  mandatory")
    .bail()
    .isString().withMessage("location should be string"),
    body("date")
    .exists().withMessage("date is  mandatory")
    .bail()
    .isISO8601().withMessage("date must be iso data valid")
    .toDate()
    .custom((value)=>{  // event will be plan before that date write
        if(value < new Date()) throw new Error("date must be further");
        return true;
    }),
    body("capicity")
    .exists().withMessage("capicity is  mandatory")
    .bail()
    .isInt({min:1}).withMessage("it should be in numbers and greatetr than >=1")
    .toInt(),
    body("price")
    .exists().withMessage("price is  mandatory")
    .bail()
    .isFloat({min:0}).withMessage("it should be in numbers and greatetr than >=0")
    .toFloat(),
    body("posterimg").custom((value,{req})=>{
        if(!req.file){
            throw new Error("poster img is mandatory")
        }
        return true
    })
   
]


exports.geteventvalidation =  [
    
    param("id").isMongoId().withMessage("it is not a valid id")
]



exports.updateeventvalidation = [
    // title,descripition,category,location,date,capicity,price
    body("title")
    .optional()
    .isString().withMessage("it should be A-Z or a-zor in string char"),
    body("descripition")
    .optional()
    .isLength({min:10}).withMessage("it should be min 10 char"),
    body("category")
    .optional()
    .isString().withMessage("category should be string"),
    body("location")
    .optional()
    .isString().withMessage("location should be string"),
    body("date")
    .optional()
    .isISO8601().withMessage("date must be iso data valid")
    .toDate()
    .custom((value)=>{  // event will be plan before that date write
        if(value < new Date()) throw new Error("date must be further");
        return true;
    }),
    body("capicity")
    .optional()
    .isInt({min:1}).withMessage("it should be in numbers and greatetr than >=1")
    .toInt(),
    body("price")
    .optional() 
    .isFloat({min:0}).withMessage("it should be in numbers and greatetr than >=0")
    .toFloat(),
    body("posterimg")
    .optional()
    .custom((value,{req})=>{
        if(!req.file){
            throw new Error("poster img is mandatory")
        }
        return true
    })
   
]