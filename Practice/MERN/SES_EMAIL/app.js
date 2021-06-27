const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const fileUploadRoutes = require('./routes/fileUpload');
const readFileRoutes = require('./routes/readFile');
//const authorize = require('./authorization');
const signup = require('./routes/signup');
const signin = require('./routes/signin');
const changePassword = require('./routes/change-password');

const User = require('./model/user');
const { aws } = require('aws-sdk');

mongoose.connect('mongodb://localhost:27017/ses-app',{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true,
});

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
//app.use('/',express.static(path.join(__dirname,'public')));

app.use('/uploadFile',fileUploadRoutes);
app.use('/readFile',readFileRoutes);
app.use('/signup',signup);
app.use('/signin',signin);
app.use('/change-password',changePassword);

app.get('/',(req,res)=>{
    res.status(200).json('WELCOME TO API');
})

app.all('*',(req,res)=>{
    res.status(404).json("Page Not Found...!!")
});

app.listen(5000,()=>{
    console.log('server is on 5000');
})
