const express = require('express');
const {getProfile,createProfile,updateProfile} = require('../controller/userProfile');
const authorization = require('../authorization');      //Authorization Middleware
const router = express.Router();

// Get User Profile
router.get('/',authorization(),getProfile);
// Add User Profile
router.post('/',authorization(),createProfile);
// Upadte User Profile
router.put('/',authorization(),updateProfile)

module.exports = router;