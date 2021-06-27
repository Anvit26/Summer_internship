const express = require('express');
const getData = require('../controllers/dashboard');

const router = express.Router();

router.get('/:type',getData);

module.exports = router;