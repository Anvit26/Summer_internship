const express = require('express');
const getData = require('../controller/readFile');

const router = express.Router();

router.get('/:fileName',getData);

module.exports = router;