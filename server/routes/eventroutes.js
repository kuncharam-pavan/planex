const express = require("express")
const router = express.Router()
const {createevent,getallevent,getevent,updateevent,deleteevent}= require("../controllers/eventcontrollers.js")
const{validate_auth_header} = require("../validations/authValidation.js")
const {authentication} =  require("../middleware/Authentication.js")
const {validation} = require("../middleware/validationErrorCheck.js")
const {authorization} = require("../middleware/Authorization.js")


// multer
const event_storage = require("../eventmulter.js")
// event vakidation
const {createeventvalidation,geteventvalidation,updateeventvalidation} = require("../validations/eventvalidation.js")

router.post("/createevent",validate_auth_header,authentication,authorization("organiser"),event_storage.single("posterimg"),createeventvalidation,validation,createevent)
router.get("/getallevent",getallevent )
router.get("/getevent/:id",geteventvalidation,validation,getevent)
router.put("/updateevent/:id",event_storage.single("posterimg"),authentication,geteventvalidation,updateeventvalidation,validate_auth_header,validation,updateevent)
router.delete("/deleteevent/:id",geteventvalidation,validate_auth_header,validation,authentication,authorization("organiser"),deleteevent)

module.exports = router