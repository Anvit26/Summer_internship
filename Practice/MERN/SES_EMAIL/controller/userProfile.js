const Profile = require('../model/Profile');

// Get User
const getProfile = async(req,res) =>{
    const {username} = req.body;
    //const {username} = req.headers['username'];
    if(!username){
        return res.status(401).json({msg:"Missing Parameter"});
    }
    const resp = await Profile.findOne({username:username},
        (error,obj)=>{
            if(error){
                console.log("PROFILE_GET",error);
                return res.status(401).json({msg:"Something Went Wrong"});
            }else{
                // console.log("PROFILE_POST_OBJ: ",obj);
                if(!obj){
                    return res.status(200).json({msg:"No Data Found"});    
                }
                return res.status(200).json({msg:{
                    firstname:obj.firstname,
                    isVerified:obj.isVerified
                }});
            }
        }
    );
}
// Add User
const createProfile = async(req,res)=>{
    const {username,firstname,lastname,phone} = req.body;
    if(!username || !firstname||!lastname||!phone||typeof phone !== 'number'){
        return res.status(401).json({msg:"Required All Data"});
    }
    try{
        const res = await Profile.create({
            username,
            firstname,
            lastname,
            phone,
            isPrime:false,
            isVerified:false,
        })
        console.log(res);
    }catch(error){
        console.log(error);
        return res.status(401).json({msg:"Something Went Wrong"});
    }
    res.status(200).json({msg:"SUCESS"});
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
module.exports = {getProfile,createProfile,updateProfile};