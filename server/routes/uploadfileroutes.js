const express = require("express")
const router = express.Router()
const {fileuploaded} =require("../controllers/uploadfilecontroller.js")
router.put("/file_upload/:id",fileuploaded)

module.exports = router