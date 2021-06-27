const express = require('express');
const changePassword = require('../controller/change-password');
const router = express.Router();

router.post('/',changePassword);

module.exports =router;
