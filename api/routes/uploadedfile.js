const express = require('express');
const router = express.Router();
const path = require("path");
const xlsx = require('xlsx');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // File naming convention
  },
});
const upload = multer({ storage });
router.post("/excel", upload.single("file"),  (req, res) => {
//   console.log("fileeeeeee",req.file);
   if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.status(200).json({ message: 'File uploaded successfully', filename: req.file.filename });
});

module.exports = router;
