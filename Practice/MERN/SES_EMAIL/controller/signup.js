const bcrypt = require('bcryptjs');
const User = require('../model/user');
const Profile = require('../model/Profile');

const signup = async (req,res)=>{
    const {username,password,phone,firstname,lastname} = req.body;
    if(!username || !firstname||!lastname||!phone||typeof username !== 'string'){
            return res.status(401).json({msg:"Required All Fileds"});
    }
    const data = {  
        username,firstname,lastname,phone,
    }
    console.log("SIGN_UP_ATTEMPT: ",username);

    const passwordHashed = await bcrypt.hash(password,10);
     try{
        const res = await User.create({
            username,password:passwordHashed,isAdmin:false
        })
         console.log(res); 
     }catch(error){
         if(error.code===11000){
             console.log(error);
            return res.status(401).json({msg:"User Already Exist"});
         }
         console.log("SIGN_UP_ERROR: ",error);
         throw res.status(401).json({msg:"Error"});
     }  
     createProfile(data);
    res.status(200).json({msg:"SUCESS"});
};

// Add User Profile
const createProfile = async(data)=>{
    const {username,firstname,lastname,phone} = data;
    try{
        const res = await Profile.create({
            username,
            firstname,
            lastname,
            phone,
            isPrime:false,
            isVerified:false,
        })
        console.log("PROFILE_GET_ERROR:",res);
    }catch(error){
        console.log("PROFILE_POST_ERROR:",error);
        // return res.status(401).json({msg:"Something Went Wrong"});
    }
    // res.status(200).json({msg:"SUCESS"});
}


module.exports = signup;
