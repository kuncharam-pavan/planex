const nodemailer = require("nodemailer")
const {email,password} = require("../constants/env.js")

// create a transporter

exports.nodemailer_mail = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:email,
        pass:password
    }
})