const multer = require('multer');
const axios = require('axios');

// File Upload Multer Config
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

// Call To File Upload API
const fileUploadPost = (req,res)=>{
    const mailInfo =  JSON.parse(req.body.mailInfo);
    axios.get(`http://localhost:5000/readFile/${req.file.filename}`,{data:mailInfo})
        .then(()=>{
            return res.status(200).json({sucess:true,msg:"sucess"});
        })
        .catch((error)=>{
            console.log("FILE_UPLOAD_POST_ERROR: ",error);
            return res.status(401).json({sucess:false,msg:"Error"});
        })
};

module.exports = {fileUploadPost,upload};