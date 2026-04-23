const{body,header} = require("express-validator")

const allowed_domains = ["gmail.com","yahoo.com","outlook.com"]
exports.resitervalidation =  [
    body("name")
    .trim()
    .notEmpty().withMessage("name is mandatory")
    .isAlpha().withMessage("enyter only alphabets")
    .isLength({min:3,max:60}).withMessage("please enter minimum 3 charters and maximum  60 charters"),
    body("email") 
    .notEmpty().withMessage("email is mandatory")
    .isEmail({host_whitelist:allowed_domains}).withMessage("it will allow only gamil.com,yahoo.com,outlook.com"),
    body("password")
    .trim()
    .notEmpty().withMessage("password is mandatory")
    .isStrongPassword({minLength:8,minLowercase:1,minNumbers:1,minSymbols:1,minUppercase:1})
    .withMessage("plese enter strong password contains minLength 8,minLowercase 1,minNumbers 1,minSymbols 1,minUppercase 1 ")
    .isLength({min:8,max:60}).withMessage("it should be min char are 8 and max char are 60")
    .matches(/^(?=.*[A-Z])(?=.*[a-z]{2,4})(?=.*[0-9]{2})(?=.*[!@#$%^&*])/),
    body("role")
    .trim()
    .notEmpty().withMessage("role is mandatory")
]


exports.organizorValidation =  [
    body("name")
    .trim()
    .notEmpty().withMessage("name is mandatory")
    .isAlpha().withMessage("enyter only alphabets")
    .isLength({min:3,max:60}).withMessage("please enter minimum 3 charters and maximum  60 charters"),
    body("email") 
    .notEmpty().withMessage("email is mandatory")
    .isEmail({host_whitelist:allowed_domains}).withMessage("it will allow only gamil.com,yahoo.com,outlook.com"),
    body("password")
    .trim()
    .notEmpty().withMessage("password is mandatory")
    .isStrongPassword({minLength:8,minLowercase:1,minNumbers:1,minSymbols:1,minUppercase:1})
    .withMessage("plese enter strong password contains minLength 8,minLowercase 1,minNumbers 1,minSymbols 1,minUppercase 1 ")
    .isLength({min:8,max:60}).withMessage("it should be min char are 8 and max char are 60")
    .matches(/^(?=.*[A-Z])(?=.*[a-z]{2,4})(?=.*[0-9]{2})(?=.*[!@#$%^&*])/),
]

exports.loginValidation = [
     body("email") 
    .notEmpty().withMessage("email is mandatory")
    .isEmail().withMessage("enter correct email or valid email")
    .trim()
    .notEmpty().withMessage("password is mandatory")
    .isLength({min:8,max:60}).withMessage("it should be min char are 8 and max char are 60")
    
]

// to check the validation is their or not (token is their or not )
exports.validate_auth_header = [
    header("Authorization")
    .notEmpty().withMessage("authorization header is required")
    // value come from authorization value with  bearer and token  will be store in value
    .custom((value)=>value.startsWith("Bearer "))
    .withMessage("invalid autghorization formate use Bearer token")
]


// profile_img is a img that is abj from the file path and file url will be extracted 
// name,email,password,role
exports.updateprofileValidation = [
    body("name")
    .trim()
    .optional()
    .isLength({min:3,max:60}).withMessage("please enter minimum 3 charters and maximum  60 charters"),
    body("email") 
    .optional()
    .notEmpty().withMessage("email is mandatory")
    .isEmail({host_whitelist:allowed_domains}).withMessage("it will allow only gamil.com,yahoo.com,outlook.com"),
    body("password")
    .optional()
    .trim()
    .notEmpty().withMessage("password is mandatory")
    .isStrongPassword({minLength:8,minLowercase:1,minNumbers:1,minSymbols:1,minUppercase:1})
    .withMessage("plese enter strong password contains minLength 8,minLowercase 1,minNumbers 1,minSymbols 1,minUppercase 1 ")
    .isLength({min:8,max:60}).withMessage("it should be min char are 8 and max char are 60")
    .matches(/^(?=.*[A-Z])(?=.*[a-z]{2,4})(?=.*[0-9]{2})(?=.*[!@#$%^&*])/),
    
]