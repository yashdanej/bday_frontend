const express = require('express');
const { User, ImportXlsx } = require('../controller/userController');
const { upload, xlsxUpload } = require('../utils/upload');
const router = express.Router();

router
    .post("/", upload.single("avatar"), User)
    .post("/xlsx", xlsxUpload.single("file"), ImportXlsx)

exports.router = router;