const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

const key = 'QWERTYYUIO!@#$%^&';

const signin = async (req,res)=>{
    const {username,password} = req.body;
    if(!username || typeof username !== 'string'||!password ){
        return res.status(401).json({status:"Enter All Data"});
    }  
    const user = await User.findOne({username}).lean();
    if(!user){
        return res.status(401).json({status:"Enter All Data"});    
    }
    if(await bcrypt.compare(password,user.password)){
        const token = jwt.sign({
            id:user._id,
            username:user.username
        },key); //change SECRET
        return res.json({status:'ok',data:token});
    }else{
        return res.json({status:'error',data:'invalid information'});
    }
}

module.exports = signin;
