const express = require('express');
const router = express.Router();
const path = require("path");
const xlsx = require('xlsx');
const multer = require('multer');
const { spawn } = require('child_process');
const fs = require('fs');

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
   if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const filePath = 'uploads/'+req.file.filename;

  const pythonProcess = spawn('python', ['testing.py', filePath]);

  pythonProcess.stdout.on('data', (data) => {
      console.log(`Python script returned: ${data}`);
      fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        } else {
            console.log('File deleted successfully');
        }
    });
      res.status(200).json({ message: 'File uploaded successfully and value predicted successfully', dataa:data.toString().trim() });
  });
});

module.exports = router;
