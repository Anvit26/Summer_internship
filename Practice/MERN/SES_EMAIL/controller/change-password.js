const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

const secKey = 'QWERTYYUIO!@#$%^&';

const changePassword = async (req,res) =>{
    const{token,newpassword} = req.body;
    try{
        const user = jwt.verify(token,secKey);
        const _id = user.id;
        const password = await bcrypt.hash(newpassword,10);
        await User.updateOne(
            {_id},
            {
                $set:{password}
            }
        )
        return res.status(200).json({msg:'sucess'});
    }catch(error){
        console.log("CHANGE_PASSWORD: ",error);
        return res.status(401).json({msg:'error'})
    }
};

module.exports = changePassword;