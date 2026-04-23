const express = require("express")
const router = express.Router()

const {validation} = require("../middleware/validationErrorCheck.js")
// console.log(validation)

const {login,register,signupOrganarizer,profile,updateprofile}= require("../controllers/usercontroller.js")

const {resitervalidation,loginValidation,organizorValidation,validate_auth_header,updateprofileValidation} = require("../validations/authValidation.js")


// authentication import

const {authentication}  = require("../middleware/Authentication.js")

// import the multer
 const {upload} = require("../configs/multerupload.js")







router.post("/register",resitervalidation,validation,register)

router.post("/signuporganarizor",organizorValidation,validation,signupOrganarizer)

router.post("/login",loginValidation,validation,login)

router.get("/profile",authentication,validate_auth_header,validation,profile)


// why validate_auth_header to check the user is valid or not 
router.put("/updateprofile/:id",upload.single("profile_pic"),updateprofileValidation,validate_auth_header,validation,authentication,updateprofile)
module.exports = router