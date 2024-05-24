const productModel = require("../Models/productModel")
const firmModel = require("../Models/firmModel")
const multer = require("multer")
const path = require('path');
const { error } = require("console");


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });


const addProduct = async(req,res)=>{
    try {

        const { productName, price, category, bestseller, description} = req.body

        const image = req.file? req.file.filename:undefined

        const firmId = req.params.firmId

        const firm = await firmModel.findById(firmId)
        if(!firm){
            return res.status(404).send({message:"firm not found"})
        }
        const newproduct = new productModel({
            productName,
             price,
            category,
            bestseller,
            description,
            image,
            firm:firm._id

        })

       const savedProducts = await newproduct.save()
       firm.products.push(savedProducts)
       await firm.save()
       return res.status(200).send({message:"product added successfully"})
        
    } catch (error) {
        res.status(500).send({message:"internal error occured"})
        console.log(error)
        
    }
}


//get product by firmId

const getProductByfirmId = async(req,res)=>{
    try{
        const firmId = req.params.firmId
        const firm = await firmModel.findById(firmId)
        if(!firm){
            return res.status(404).send({error:"vendor not found"})
        
            

    
        }
        const resturantname = firm.firmName
        const products = await productModel.find({firm:firmId})
        res.status(200).send({resturantname,products})

   }
    catch(error){
        res.status(500).send("internal error occured")
    }
}

//delete product by id
const deleteProductById = async(req, res) => {
    try {
        const productId = req.params.productId;

        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "No product found" })
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = {addProduct:[upload.single("image"),addProduct,],getProductByfirmId,deleteProductById}