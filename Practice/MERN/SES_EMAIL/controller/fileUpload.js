const multer = require('multer');
const axios = require('axios');

/* File Upload Start*/
const folderPath = './uploads';

const fileEngine = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,folderPath);
    },
    filename:(req,file,cb) =>{
        cb(null,`${Date.now()}_${file.originalname}`);
    },
})

const upload = multer({storage:fileEngine});
/* File Upload End*/

const fileUploadPost = (req,res)=>{
    const mailInfo =  JSON.parse(req.body.mailInfo);
    axios.get(`http://localhost:5000/readFile/${req.file.filename}`,{data:mailInfo})
        .then((resp)=>{
            return res.status(200).json({sucess:true,msg:"sucess"});
        })
        .catch(()=>{
        return res.status(401).json({sucess:false,msg:"Error"});
        })
};

module.exports = {fileUploadPost,upload};