const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const {User} = require('../models/user');

// Gets all users 
router.get('/',async (req,res) => {
    const apartmentDetails = await User.find({}).select('name mobile blockNumber doorNumber -_id')
    // console.log('++++++++++++++++',apartmentDetails)
    res.send(apartmentDetails);
})

module.exports = router;