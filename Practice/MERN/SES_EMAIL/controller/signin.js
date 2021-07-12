const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

const secKey = 'QWERTYYUIO!@#$%^&'; //JWT SECRET

// Verify User Data
const signin = async (req,res)=>{
    // console.log(req);
    const {username,password} = req.body;
    console.log("SIGN_IN_ATTEMPT: ",username);
    
    if(!username || typeof username !== 'string'||!password ){
        return res.status(401).json({status:"Enter All Data"});
    }  
    
    const user = await User.findOne({username}).lean();
    if(!user){
        return res.status(401).json({status:"No User Found"});    
    }
    if(await bcrypt.compare(password,user.password)){
        let userType;
        if(user.isAdmin == true){
            userType = 'admin';
        }else{
            userType = 'user';
        }
        // console.log(user);
        const token = jwt.sign({
            id:user._id,username:user.username,type:user.isAdmin
        },secKey);                              //JWT SECRET
        return res.status(200).json({status:'ok',userType,data:token});
    }else{
        return res.status(401).json({status:'error',data:'invalid information'});
    }
}

module.exports = signin;
