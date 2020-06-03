const mongoose = require("mongoose");
const multer = require("multer");
const mongodb = require("mongodb");
const GridFsStorage = require("multer-gridfs-storage");
const { ErrorHandler } = require("../helpers/error.helpers")

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
  upload(req, res, (error) => {
    try {
      if (error) next(error)
      if (!req.file.id) throw new ErrorHandler()
      res.id = req.file.id;
      next();
    } catch (error) {
      next(error)
    }
  });
};


const readSingleImage = async (req, res, next) => {
  try {
    const filter = mongoose.Types.ObjectId(req.params.id);
    if(!filter) throw new ErrorHandler()
    const { contentType } = await bucket
      .find(filter)
      .next();
    const readStream = bucket.openDownloadStream(filter);

    readStream.on("error", (error) => {
      next(error)
    });

    readStream.on("data", (chunk) => {
      res.write(chunk)
    });

    readStream.on("end", () => {
      res.contentType = contentType
      next();
    });
  } catch (error) {
    next(error)
  }
};

const deleteSingleImage = (req, res, next) => {
  try {
    if(!req.params.id) throw new ErrorHandler(400, "No image ID was submitted")
    const id = mongoose.Types.ObjectId(req.params.id);
    bucket.delete(id, (error) => {
      if (error) {
        next(error)
      } else {
        next();
      }
    });
  } catch (error) {
    next(error)
  }
};

module.exports = {
  readSingleImage,
  writeSingleImage,
  deleteSingleImage
};
