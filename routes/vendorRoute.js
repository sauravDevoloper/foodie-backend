const vendorController = require("../controllers/vendorController")
const express = require("express")


const router = express.Router()

router.use("/register",vendorController.vendorRegister)
router.use("/login",vendorController.vendorLogin)
router.get("/all-vendors",vendorController.getAllVendors)
router.get("/single-vendor/:Id",vendorController.getVendorById)


module.exports = router