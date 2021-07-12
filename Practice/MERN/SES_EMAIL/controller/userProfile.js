const Profile = require('../model/Profile');
const jwt = require('jsonwebtoken');

const secKey = 'QWERTYYUIO!@#$%^&';

// Get User
const getProfile = async(req,res) =>{
    const token = req.headers['authorization'];
    const tokenBody = token.slice(7);
    let username;
    jwt.verify(tokenBody,secKey,(err,decoded)=>{
        if(err){
            console.log(`JWT Error: ${err}`);
            return res.status(401).send("Error: Access Denied");
        }
        username = decoded.username;
    }); 

    //const {username} = req.headers['username'];
    if(!username){
        return res.status(401).json({msg:"Missing Required Parameter"});
    }
    const resp = await Profile.findOne({username:username},
        (error,obj)=>{
            if(error){
                console.log("PROFILE_GET_ERROR",error);
                return res.status(401).json({msg:"Something Went Wrong"});
            }else{
                // console.log("PROFILE_POST_OBJ: ",obj);
                if(!obj){
                    return res.status(200).json({msg:"No Data Found"});    
                }
                return res.status(200).json({msg:{
                    username:obj.username,
                    firstname:obj.firstname,
                    lastname:obj.lastname,
                    phone:obj.phone,
                    isVerified:obj.isVerified
                }});
            }
        }
    );
}
// Update User
const updateProfile = async(req,res)=>{
    const {username,firstname,lastname,phone} = req.body;
    await Profile.updateOne({username: username},{firstname,lastname,phone},
        (error,user)=>{
            if(error){
                console.log("PROFILE_UPDATE: ",error);
                return res.status(401).json({msg:"Something Went Wrong"});
            }else{
                return res.status(200).json({msg:"SUCESS"});
            }
        })
}
module.exports = {getProfile,updateProfile};