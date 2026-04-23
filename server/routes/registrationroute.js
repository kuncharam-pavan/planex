const express = require("express")
const router = express.Router()
const {registerevent,cancelevent,my_event,geteventpartcipants} =require("../controllers/registrationcontroller.js")
const {authentication} = require("../middleware/Authentication.js")
const {authorization} = require("../middleware/Authorization.js")
const {registervalidation} = require("../validations/registervalidation.js")
const {validation}= require("../middleware/validationErrorCheck.js")
const{validate_auth_header} = require("../validations/authValidation.js")


router.post("/registerevent/:id",registervalidation,validate_auth_header,validation,authentication,authorization("participant"),registerevent)
router.get("/my_event",validate_auth_header,validation,authentication,authorization("participant"),my_event)
router.delete("/cancelevent/:id",registervalidation,validate_auth_header,validation,authentication,authorization("participant"),cancelevent)
router.get("/participants/:id",registervalidation,validate_auth_header,validation,authentication,authorization("organiser"),geteventpartcipants,geteventpartcipants)
module.exports = router