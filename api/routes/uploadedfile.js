const express = require('express');
const router = express.Router();
const xlsx = require('xlsx');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Multer configuration for handling file uploads

router.post('/excel', async (req, res) => {
    console.log(req.body);
});

module.exports = router;
