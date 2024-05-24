const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const vendorRoute = require("./routes/vendorRoute")
const firmRoute = require("./routes/firmRoute")
const productRoute = require("./routes/productRoute")
const cors = require("cors")
const path = require("path")



dotenv.config()



const PORT = process.env.PORT || 4000;

// database connection

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("database connected successfully")
})
.catch((err)=>{
    console.log(err)
})





const app = express()
app.use(cors())

app.use(express.json())

app.use("/vendor",vendorRoute)
app.use("/firm",firmRoute)
app.use("/products",productRoute)
app.use('/uploads', express.static('uploads'))

app.listen(PORT,()=>{
    console.log(`server up and running at Port ${PORT}`)
})

app.use('/', (req, res) => {
    res.send("<h1> Welcome to foodie");
})