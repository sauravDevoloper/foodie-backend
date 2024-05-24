const express = require("express")
const VerifyToken = require("../Middlewares/verifyToken")
const firmController = require("../controllers/firmController")

const router = express.Router()

router.post("/add-firm",VerifyToken,firmController.addFirm)
router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
})
router.delete('/:firmId', firmController.deleteFirmById);

module.exports = router