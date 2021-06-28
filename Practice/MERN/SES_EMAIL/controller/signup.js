const bcrypt = require('bcryptjs');
const User = require('../model/user');

const signup = async (req,res)=>{
    const {username,password} = req.body;
    console.log("SIGN_UP_ATTEMPT: ",username);
    if(!username || typeof username !== 'string'||!password ){
        return res.status(401).json({status:"Enter All Data"});
    }
    const passwordHashed = await bcrypt.hash(password,10);
     try{
        const res = await User.create({
            username,password:passwordHashed
        })
        console.log(res); 
     }catch(error){
         if(error.code===11000){
            return res.status(401).json({status:"User Already Exist"});
         }
         console.log("SIGN_UP_ERROR: ",error);
         throw res.status(401).json({status:"Error"});
     }  
    res.status(200).json({msg:"SUCESS"});
};

module.exports = signup;