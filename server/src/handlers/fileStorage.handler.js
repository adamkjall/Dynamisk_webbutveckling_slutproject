const mongoose = require("mongoose");
const multer = require("multer");
const mongodb = require("mongodb");
const GridFsStorage = require("multer-gridfs-storage");

// let db
let bucket;
let storage;

const randomString = [...Array(6)]
  .map((i) => (~~(Math.random() * 36)).toString(36))
  .join("");

const BUCKET = "product-images";

mongoose.connection.once("open", () => {
  db = mongoose.connection.db;
  bucket = new mongodb.GridFSBucket(db, {
    bucketName: BUCKET,
  });
  storage = new GridFsStorage({
    db: db,
    // options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      const match = ["image/png", "image/jpeg"];
      if (match.indexOf(file.mimetype) === -1) {
        return null;
      }
      return {
        bucketName: BUCKET,
        filename: `${randomString}-${file.originalname}`,
      };
    },
  });
  storage.on("connection", () => {
    console.log("Connected to the image collection");
  });
  storage.on("connectionFailed", (err) => {
    console.error("Connection to image collection failed", err);
  });
});

const writeSingleImage = (req, res, next) => {
  const upload = multer({ storage }).single("image");
  upload(req, res, (err) => {
    if (err) res.status(500).json({ message: "Couldn't upload image" });
    next();
  });
};

const readSingleImage = async (req, res, next) => {
  const filter = mongoose.Types.ObjectId(req.params.id)
  
  try {  
    const { filename, contentType, uploadDate } = await bucket.find(filter).next()
    const readStream = bucket.openDownloadStream(filter);
    let imageData = [];

    readStream.on("error", () => {
      res.status(500).json({ message: "Couldn't load image" });
    });
  
    readStream.on("data", (chunk) => {
      imageData.push(chunk);
    });
  
    readStream.on("end", () => {
      const imageBase64 ={ data: imageData.concat()[0].toString("base64") };
      res.image = { 
        filename,
        contentType,
        uploadDate, 
        ...imageBase64 
      };
      next();
    });
  } catch (err) {
    res.status(404).json({ message: "Didn't find image" }); 
  }
};

const deleteSingleImage = (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.id)
  bucket.delete(id, (err) => {
    if (err) {
      res.status(404).json({ message: "Couldn't find dokument" });
    } else {
      next();
    }
  });
};

module.exports = {
  readSingleImage,
  writeSingleImage,
  deleteSingleImage,
};
