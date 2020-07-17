const express = require('express')
const router = express.Router();
const {User,Detail,validateUser,validateDetail} = require('../models/user');

// User Registration
router.post('/', async (req,res) => {
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    let getUser = await User.findOne({mobile: req.body.mobile})
    if(getUser) return res.status(400).send('Mobile number registered. Enter a new mobile number');

        let user = new User({
            name: req.body.name,
            mobile: req.body.mobile,
            age: req.body.age,
            gender: req.body.gender,
            password: req.body.password,
            blockNumber: req.body.blockNumber,
            doorNumber: req.body.doorNumber,
        });
        const doc = await user.save();
        res.send(`Great! for being here ${user.name}`);
    // }
})

module.exports = router;