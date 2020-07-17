const express = require('express')
const mongoose = require('mongoose')
const register = require('./routes/registers')
const auth = require('./routes/auth')
const details = require('./routes/allDetails')
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended : true}));

mongoose.connect('mongodb://localhost/society')
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.error('Could not connect to MongoDB', err))

app.use('/register',register);
app.use('/auth',auth);
app.use('/details',details);

const port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log("Express app started on port 4000");
});