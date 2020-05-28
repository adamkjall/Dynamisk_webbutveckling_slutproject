const express = require('express');
const router = express.Router();
const { upload } = require('../fileStorage')

router.post("/", upload.single("image"), (req, res) => {
    console.log(req.file)
    res.status(200).json({ message: "Success!" })
})


module.exports = router