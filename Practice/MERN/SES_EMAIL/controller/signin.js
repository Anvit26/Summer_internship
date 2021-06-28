const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

const secKey = 'QWERTYYUIO!@#$%^&'; //JWT SECRET

// Verify User Data
const signin = async (req,res)=>{

    const {username,password} = req.body;
    console.log("SIGN_IN_ATTEMPT: ",username);
    
    if(!username || typeof username !== 'string'||!password ){
        return res.status(401).json({status:"Enter All Data"});
    }  
    
    const user = await User.findOne({username}).lean();
    if(!user){
        return res.status(401).json({status:"Enter All Data"});    
    }
    if(await bcrypt.compare(password,user.password)){
        const token = jwt.sign({
            id:user._id,username:user.username
        },secKey);                              //JWT SECRET
        return res.status(200).json({status:'ok',data:token});
    }else{
        return res.status(401).json({status:'error',data:'invalid information'});
    }
}

module.exports = signin;
