const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

const key = 'QWERTYYUIO!@#$%^&';

const changePassword = async (req,res) =>{
    const{token,newpassword} = req.body;
    try{
        const user = jwt.verify(token,key);
        const _id = user.id;
        const password = await bcrypt.hash(newpassword,10);
        await User.updateOne(
            {_id},
            {
                $set:{password}
            }
        )
        return res.json({status:'ok'});
    }catch(error){
        return res.json({status:'error'})
    }
};

module.exports = changePassword;