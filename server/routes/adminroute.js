const express = require("express")
const router = express.Router()
const {user,finduser,deleteuser} = require("../controllers/admincontroller.js")
const{validate_auth_header} = require("../validations/authValidation.js")
const {authentication} =  require("../middleware/Authentication.js")
const {validation} = require("../middleware/validationErrorCheck.js")
const {authorization} = require("../middleware/Authorization.js")
const {alluservalidation} = require("../validations/adminvalidation.js")


router.get("/allusers",alluservalidation,validate_auth_header,validation,authentication,authorization("admin"),user)
router.get("/finduser/:id",alluservalidation,validate_auth_header,validation,authentication,authorization("admin"),finduser)
router.delete("/deleteuser/:idff",validate_auth_header,validation,authentication,authorization("admin"),deleteuser)
module.exports = router