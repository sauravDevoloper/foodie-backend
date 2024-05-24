const mongoose = require("mongoose")


const vendorSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    firm:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"firm"
    }]
})


const vendorModel = mongoose.model("vendor",vendorSchema)

module.exports = vendorModel