const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage")
const MONGODB_URI = process.env.MONGODB_URI;
const storage = new GridFsStorage({
    url: MONGODB_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        if (file.mimetype === 'image/jpeg') {
          return {
            bucketName: 'photos'
          };
        } else {
          return null;
        }
      }
  });
const upload = multer({ storage })

module.exports = {
    upload
}