const multer = require("multer");
const path = require("path");
require("dotenv").config();
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);
console.log(UPLOAD_DIR);
// const DIR = process.env.UPLOAD_DIR
// console.log(DIR);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     console.log('storage', typeof UPLOAD_DIR);
//     cb(null,  'D:/projects/nodejs-homework-02-rest-api/tmp' );
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalName);
//   },
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
      return;
    }
    const err = new Error('Загружен не файл изображения')
    err.status = 400
    cb(err)
    // cb(null, false);
  },
});

module.exports = upload;
