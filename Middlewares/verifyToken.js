const vendorModel = require("../Models/vendorModel")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

const secretKey = process.env.secret


const verifyToken = async(req,res,next)=>{
    const token = req.headers.token
    if(!token){
        return res.send({message:"token is required"})
    }

    try{

        const decoded = jwt.verify(token,secretKey)
        const vendor = await vendorModel.findById(decoded.vendorId)
        if(!vendor){
            return res.send({message:"vendor not found"})
        }
        req.vendorId = vendor._id

        next()
    }
    catch(error){
        return res.send({message:'internal server error'})
    }
}

module.exports = verifyToken