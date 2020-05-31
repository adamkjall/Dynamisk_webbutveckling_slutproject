const express = require("express");
const router = express.Router();
const { 
    readSingleImage,
    writeSingleImage,
    deleteSingleImage
} = require("../handlers/fileStorage.handler");

router.get("/:id", readSingleImage, (req, res) => {
    res.status(200).json({message: "success", image: res.image})
})

router.post("/", writeSingleImage, (req, res) => {
    res.status(201).json({message: "success"})
})

router.delete("/:id", deleteSingleImage, (req, res) => {
    res.status(200).json({message: "image deleted"})
})

module.exports = router;
