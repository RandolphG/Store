const mongoose = require("mongoose");
const GridFs = require("multer-gridfs-storage");
const { GridFsStorage } = GridFs;
const router = require("express").Router();
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
require("dotenv").config();

const mongoURI = process.env.MONGODB_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

const connection = mongoose.createConnection(mongoURI, options);
let gfs;

connection.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(connection.db, {
    bucketName: "images",
  });
});

const storage = new GridFsStorage({
  url: mongoURI,
  options: { useUnifiedTopology: true },
  file: (request, files) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (error, buffer) => {
        if (error) {
          return reject(error);
        }
        const filename =
          buffer.toString("hex") + path.extname(files.originalname);
        const fileInfo = { filename: filename, bucketName: "images" };
        resolve(fileInfo);
      });
    });
  },
});

const store = multer({
  storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, callback) => {
    checkFileType(file, callback);
  },
});

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb("filetype");
}

const uploadMiddleware = (request, response, next) => {
  const upload = store.single("image");
  upload(request, response, (error) => {
    if (error instanceof multer.MulterError) {
      response.status(400).send("File too large");
    } else if (error) {
      if (error === "filetype") {
        response.status(400).send("Invalid file type");
        return response.sendStatus(500);
      }
    }
    next();
  });
};

const deleteImage = (id) => {
  if (!id || id === "undefined") {
    return response.status(400).send("No image to delete");
  }
  const _id = new mongoose.Types.ObjectId(id);
  gfs.delete(_id, (error) => {
    if (error) {
      console.log(error);
      return response.status(500).send("Error deleting image");
    }
  });
};

router.post("/upload", uploadMiddleware, async (request, response) => {
  const { file } = request;
  const { id } = file;
  if (file.size > 500000) {
    deleteImage(id);
    return response.status(400).send("File may not exceed 5MB");
  }
  console.log(`upload file`, file);
  response.status(200).send(file.id);
});

router.get("/:id", ({ params: { id } }, response) => {
  if (!id || id === "undefined") {
    return response.status(400).send("No image to delete");
  }
  const _id = new mongoose.Types.ObjectId(id);
  gfs.find({ _id }).toArray((error, files) => {
    if (error) {
      console.log(error);
      return response.status(500).send("Error deleting image");
    }
    if (!files || files.length === 0) {
      return response.status(404).send("No image found");
    }
    gfs.openDownloadStream(_id).pipe(response);
  });
});

module.exports = router;
