const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const fast2sms = require('fast-two-sms')
const router = express.Router();
const passport = require('passport')
const {User} = require('../models/user');

let otp;

// Authentication Step 1
router.post('/login/step1', async (req, res) => {
    let mobnumber = req.body.number;
    let getUser = await User.findOne({mobile: mobnumber})
    if(!getUser) return res.status(400).send('Mobile number not registered')
    else{
        otp = getId(4);
        // console.log('---otp---',otp)
        const response = await fast2sms.sendMessage({authorization : process.env.API_KEY, message : `Here is your OTP ${otp}`, numbers : [mobnumber]})
        // console.log(response)
        res.send('OTP sent to your mobile number'); 
    }
})

// Authentication Step 2
router.post('/login/step2', async (req,res)=>{
    let enteredotp = req.body.otp
    if(enteredotp === otp){
        res.send('Successful Login');
    }
    else{
        res.status(400).send('Failed Login');
    }
})

// Add Family members details
router.post('/:userid', async (req,res)=>{
    var user_id = req.params.userid;
    User.findByIdAndUpdate(
        user_id,
        {$push: {'personDetails':req.body}},
        {safe: true, upsert: true},
         function(err,model) {
             if(err){
                //  console.log(err);
                 return res.status(400).send('User not found')
             }
             return res.send('User added successfully')
         }
        )
})

// Update Family member Details
router.put('/:userid/:personid', async (req, res) => {
    var user_id = req.params.userid;
    var person_id = req.params.personid;
    // console.log(']]]]]]]]',user_id,person_id)
    User.update({'personDetails._id': person_id},
        {'$set': {
            'personDetails.$.name': req.body.name, 
            'personDetails.$.age': req.body.age,
        }}, function(err,model) {
            if(err){
                // console.log(err);
                return res.status(400).send('User not found')
            }
            return res.send('Updated successfully')
        }
    )
})

// Delete Family member details
router.delete('/:userid/:personid', async (req, res) => {
    var user_id = req.params.userid;
    var person_id = req.params.personid;
    User.findByIdAndUpdate(
        user_id,
        { $pull: {'personDetails':{_id: person_id} } }, function(err,model) {
            if(err){
                // console.log(err);
                return res.status(400).send('User not found')
            }
            return res.send('User deleted successfully')
        }
    )
})

//LoggedOut
router.get('/logout', function(req, res){
    req.logout();
    res.send('LoggedOut successfully');
    // res.redirect('/');
  });

// Function that returns OTP
function getId(length){
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = router;
