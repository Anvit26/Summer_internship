const express = require('express');
const {fileUploadPost,upload} = require('../controller/fileUpload');
const router = express.Router();

router.post('/',upload.single('file'),fileUploadPost);

module.exports = router;