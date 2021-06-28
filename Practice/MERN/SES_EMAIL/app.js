const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes Modules
const fileUploadRoutes = require('./routes/fileUpload');
const readFileRoutes = require('./routes/readFile');
const signup = require('./routes/signup');
const signin = require('./routes/signin');
const changePassword = require('./routes/change-password');
const userProfile = require('./routes/userProfile');

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
app.use('/change-password',changePassword);
app.use('/profile',userProfile);
app.use('/uploadFile',fileUploadRoutes);
app.use('/readFile',readFileRoutes);

//Basic Info About API's
app.get('/',(req,res)=>{
    const list = {
        'Description':'This Web-Application Can Be Used For Sendding Mass-Mails for Promotions To Customer About Offers and Informationl Mails. Non-Prime Member Can Send Daily 10 Free Mails.',
        'List Of API\'s':{    
        '/':{
            'GET':'To Information About App and API'
        },
        '/signup':{
            'POST':'To Registe Users In System.'
        },
        '/signin':{
            'POST':'To Authenticate Registered User. (Protected)'
        },
        '/change-password':{
            'POST':'To Change Password For An Registerd User. (Protected)'
        },
        '/profile':{
            'GET':'To Get User Details (Protected)',
            'POST':'To Create User Profile (Protected) ',
            'PUT':'To Update User Profile Information (Protected)'
        },
        '/uploadFile':{
            'POST':'To Upload CSV File To Remote Server (Protected)'
        },
        '/readFile':{
            'GET':'To Read Data From Uplodaded CSV File From Remote Server (Protected)'
        }
    },
    'Note':'Futher Information About App Release And Beta Version Information Will Be Updated In Readme Section Soon.'
}   
    res.status(200).json(list);
})

// Invalid Path
app.all('*',(req,res)=>{
    res.status(404).json("Page Not Found...!!")
});

const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`Server Running On ${PORT}`);
})

