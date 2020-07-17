const Joi = require('@hapi/joi');
const mongoose = require('mongoose')

const detailSchema = new mongoose.Schema({
    // regname: String,
    name: String,
    age: String,
    gender: String,
    relation: String
})
const userSchema = new mongoose.Schema({
    name: String,
    mobile: Number,
    age: Number,
    gender: String,
    password: String,
    blockNumber: Number,
    doorNumber: Number,
    personDetails: [detailSchema]
})

const Detail = mongoose.model('Detail', detailSchema);
const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = Joi.object ({
        name: Joi.string(),
        mobile: Joi.number()
                // .min(10)
                // .max(10)
                .required(),
        age: Joi.number(),
        gender: Joi.string(),
        password: Joi.string(),
        blockNumber: Joi.number(),
        doorNumber: Joi.number(),      
    })

    return schema.validate(user)
}

function validateDetail(detail){
    const schema = Joi.object ({
        name: Joi.string(),
        age: Joi.number().required(),
        gender: Joi.string(),    
        relation: Joi.string()      
    })

    return schema.validate(detail)
}

exports.Detail = Detail;
exports.User = User;
exports.validateUser = validateUser;
exports.validateDetail = validateDetail;
