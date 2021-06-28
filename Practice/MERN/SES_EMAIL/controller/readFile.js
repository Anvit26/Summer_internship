const fs = require('fs');
const sendMail = require('./sendMail');

// Read Uploaded File For Getting Mail List 
const getData = (req,res) => {
    const subject = req.body.subject;
    const message = req.body.message;
    fs.readFile(`./uploads/${req.params.fileName}`,'utf-8',(err,resp)=>{
        if(error){
            console.log("READ_FILE_ERROR: ",error);
            return res.status(401).json({msg:'Something went wrong'});
        }
        console.log("DEBUG_READ_FILE: ",resp);
        
        var mailList0 = resp.split(/\r\n/);
        //var mailList1 = mailList0.split(',');
        const mailList =  mailList0.filter(e =>  e);

        sendMail(mailList,subject,message);
        return res.status(200).json({success:true,msg:"Sending Mail"});
    })    
}

module.exports = getData;