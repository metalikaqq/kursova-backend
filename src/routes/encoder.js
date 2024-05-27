const express = require("express");
const encoderController = require('../controllers/encoder');
const multer = require('multer');


const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



router.post("/api/encrypt", upload.single('file'), encoderController.encrypt);
router.post("/api/decrypt", upload.single('file'), encoderController.decryptFile);
router.get("/api/files/:userId", encoderController.getFiles); 
router.get("/api/download/:fileId", encoderController.downloadFile); 

module.exports = { router };
