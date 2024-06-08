const firmModel = require("../Models/firmModel")
const vendorModel = require("../Models/vendorModel")
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });


const addFirm = async(req,res)=>{
    const {firmName,area,category,region,offer} = req.body

    try{

        const image = req.file? req.file.filename:undefined
        const vendor = await vendorModel.findById(req.vendorId)
        if(!vendor){
            return res.send({message:"vendor not found"})
        }
        const newFirm = new firmModel({
            firmName,
             area,
            category, 
            region,
            offer ,
            image,
            vendor:vendor._id

        })

        const savedfirm = await newFirm.save()
        vendor.firm.push(savedfirm)
        await vendor.save()
        return res.status(200).send({message:"firm added successfully"})
    }catch (error) {

        res.status(500).send({message:"internal error occured"})
        
    }
}

//delete firmbyid

const deleteFirmById = async(req, res) => {
    try {
        const firmId = req.params.firmId;

        const deletedProduct = await firmModel.findByIdAndDelete(firmId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "No product found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}



module.exports = {addFirm:[upload.single("image"),addFirm],deleteFirmById}