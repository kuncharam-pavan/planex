const event_register = require("../models/registermodel.js")
const event_model = require("../models/eventmodel.js") 
const {nodemailer_mail} = require("../configs/nodemailer.js")
const {email} = require("../constants/env.js")



exports.registerevent =  async(req,res,next)=>{
    try {
        const eventcheck = await event_model.findById(req.params.id)
        if(!eventcheck){
            return res.json({success:false,
                message: "event not found",
                error: {
                    code: "event not found",
                    data: null
                }
            })
        }
        const checkuser = await event_register.findOne({eventId:req.params.id,userId:req.user._id})
        if(checkuser){
            return  res.json({success:false,
                message: "you have already registered",
                error: {
                    code: "already registered",
                    data: null
                }
            })
        }
        const eventregister = await event_register.create({
            userId:req.user._id,
            eventId:req.params.id,
            status:"successfully registered",
            registrationdate:Date.now()
        })
        
        await nodemailer_mail.sendMail({
            to:req.user.email,
            from:email,
            subject:" welcome to the event",
            html:`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Successful</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 50px auto;
      background: #ffffff;
      border-radius: 10px;
      padding: 30px;
      text-align: center;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    .success-icon {
      font-size: 60px;
      color: #28a745;
    }
    h1 {
      color: #333;
    }
    p {
      color: #555;
      font-size: 16px;
    }
    .details {
      margin-top: 20px;
      text-align: left;
      background: #f9f9f9;
      padding: 15px;
      border-radius: 8px;
    }
    .details p {
      margin: 5px 0;
    }
    .btn {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 20px;
      background: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
    }
    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #999;
    }
  </style>
</head>
<body>

  <div class="container">
    <div class="success-icon">✔</div>
    
    <h1>Registration Successful!</h1>
    
    <p>Thank you for registering. Your spot has been confirmed 🎉</p>

    <div class="details">
      <p><strong>Name:</strong> ${req.user.name}</p>
      <p><strong>email:</strong>  ${req.user.email}</p>
      <p><strong>Date:</strong>  ${eventcheck.date}</p>
      <p><strong>Location:</strong>  ${eventcheck.location}</p>
    </div>

    <a href="{{eventLink}}" class="btn">View Event</a>

    <div class="footer">
      <p>If you have any questions, contact support.</p>
    </div>
  </div>

</body>
</html>`
        })
        return res.json({success:true,
                message: "event registered successfully",
                error: {
                    code: "registration done",
                    data: eventregister
                }
            })
    
        
    }catch (error) {
        const newError = new Error(error.message)
        newError.statusCode = 400
        return next(error)
    }
}

exports.cancelevent =  async(req,res,next)=>{
    try {
        const checkuserevent = await event_register.findOne({eventId:req.params.id,userId:req.user._id})
        if(!checkuserevent){
            return res.json({success:false,
                message: "registration not found",
                error: {
                    code:"registration not found",
                    data: null
                }
            })
        }
        if (checkuserevent.status === "cancelled") {
        return res.json({
        success: false,
        message: "event already cancelled"
            })
        }
        checkuserevent.status = "cancelled"
        await checkuserevent.save()
        return res.json({success:true,
                message: "event cancelled successfully",
                error: {
                    code: "event cancelled ",
                    data: checkuserevent
                }
            })
       
    } catch (error) {
        const newError = new Error(error.message)
        newError.statusCode = 400
        return next(error)
    }
}

exports.my_event =  async(req,res,next)=>{
    try {
        const data = await event_register.find({userId:req.user._id}).populate(["userId","eventId"],["-__v"])
        return res.json({success:true,
                message: "all users data",
                error: {
                    code: "all registered data",
                    data: data
                }
            })
    } catch (error) {
        const newError = new Error(error.message)
        newError.statusCode = 400
        return next(error)
    }
}
exports.geteventpartcipants =  async(req,res,next)=>{
    try {
        // console.log(req.params.id)
        const userdata = await event_register.find({eventId:req.params.id}).populate("userId",["name","email","profileimg","createdAt","createdAt"])
        res.json({data:userdata})

    } catch (error) {
        const newError = new Error(error.message)
        newError.statusCode = 400
        return next(error)
    }
}