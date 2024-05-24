const vendorModel = require("../Models/vendorModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

const secretKey = process.env.secret

//vendor Register

const vendorRegister = async(req,res)=>{

    const{username,email,password} = req.body
    try {

        const vendorEmail = await vendorModel.findOne({email})
        if(vendorEmail){
            return res.status(404).send("Email already taken")
        }
        const hashedPassword = await bcrypt.hash(password,10)

        const newVendor = new vendorModel({
            username,
            email,
            password:hashedPassword
        })

        await newVendor.save()
        return res.status(200).send({message:"vendor registered successfully"})

        
    } catch (error) {
        res.status(500).send({message:"internal error occured"})
        
    }
}


//vendor login

const vendorLogin = async(req,res)=>{
    const {email,password} = req.body
    try {

        const vendor = await vendorModel.findOne({email})

        if(!vendor||await (!bcrypt.compare(password,vendor.password))){
            return res.status(404).send({message:"vendor or password not found"})
        }

        const token = jwt.sign({vendorId:vendor._id},secretKey)
        return res.status(200).send({message:"login success",token})
        
        
    } catch (error) {

        res.status(500).send({message:"internal error occured"})
        
    }
}


//get all vendors

const getAllVendors = async(req,res)=>{
    try {

        const vendors = await vendorModel.find().populate('firm')
        res.send(vendors)
        
    } catch (error) {
        res.status(500).send({message:"internal error occured"})
        
    }
}

//get vendor by Id 

const getVendorById = async(req,res)=>{
    const vendorId = req.params.Id
    try {
        const vendor = await vendorModel.findById(vendorId).populate('firm')
        if(!vendor){
            return res.status(404).send({error:"vendor not found"})
        }
        res.status(200).send({vendor})
        
    } catch (error) {

        res.status(500).send({message:"internal error occured"})
        
    }
}

module.exports = {vendorRegister,vendorLogin,getAllVendors,getVendorById}