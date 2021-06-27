const express = require('express');
const sendData = require('../controllers/news');

const router = express.Router();

router.get('/:type',sendData);

module.exports = router;