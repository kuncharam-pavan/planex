const bcrypt = require("bcrypt")

// import jwt 
const jwt = require("jsonwebtoken")

const {secret_key} = require("../constants/env.js")

exports.generate_hash_password = async(password)=>{
    const hash_password = await bcrypt.hash(password,12)
    return hash_password
}


exports.token_generator = async (user)=>{
    const generate_token  =  jwt.sign(user,secret_key,{algorithm:"HS256",expiresIn:"24h"})
    return generate_token
}
