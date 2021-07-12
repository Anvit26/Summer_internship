// PROFILE Create and Update 
// Authorization With Database

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const apiInfo = require('./api.json');

// Import Routes Modules
const fileUploadRoutes = require('./routes/fileUpload');
const readFileRoutes = require('./routes/readFile');
const signup = require('./routes/signup');
const signin = require('./routes/signin');
const passwordMgt = require('./routes/passwordmgt');
const userProfile = require('./routes/userProfile');
const sendStatistics = require('./routes/sendStatistics');
const admin = require('./routes/admin');
const textMessage = require('./routes/textMessage');

// MongoDB Connection
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

// Routes 
app.use('/signup',signup);
app.use('/signin',signin);
app.use('/password',passwordMgt);
app.use('/profile',userProfile);
app.use('/uploadFile',fileUploadRoutes);
app.use('/readFile',readFileRoutes);
app.use('/sendStatistics',sendStatistics);
app.use('/admin',admin);
app.use('/message',textMessage);

//Basic Info About API's
app.get('/',(req,res)=>{
    return res.status(200).json(apiInfo);
})

// Invalid Path
app.all('*',(req,res)=>{
    res.status(404).json("Page Not Found...!!")
});

const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`Server Running On ${PORT}`);
})

