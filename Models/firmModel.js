const mongoose = require("mongoose")
const { type } = require("os")

const firmSchema = mongoose.Schema({
    firmName:{
        type:String,
        required:"true"
    },
    area:{
        type:String,
        required:"true"
    },
    category:{
        type:[{
            type:String,
            enum:["veg","non-veg"]
        }]
    },
    region:{
        type:[{
            type:String,
            enum:["south-indian","north-indian","chineese","bakery"]
        }]
    },
    offer:{
        type:String
    },
    image:{
        type:String
    },
    vendor:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"vendor"
    }],
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    }]
})


const firmModel = mongoose.model("firm",firmSchema)

module.exports = firmModel