const fs = require('fs');
const sendMail = require('./sendMail');
const {setSendStatistics} = require('./sendStatistics');

// Read Uploaded File For Getting Mail List 
const getData = (req,res) => {
    const subject = req.body.subject;
    const message = req.body.message;
    fs.readFile(`./uploads/${req.params.fileName}`,'utf-8',async(error,resp)=>{
        if(error){
            console.log("READ_FILE_ERROR: ",error);
            return res.status(401).json({msg:'Something went wrong'});
        }
        // console.log("DEBUG_READ_FILE: ",resp);
        
        var mailList0 = resp.split(/\r\n/);
        console.log(mailList0);
        //var mailList1 = mailList0.split(',');
        const mailList =  mailList0.filter(e =>  e);
        const sendcount = mailList.length;
        const data = {
            filename: req.params.fileName,
            username:'daveanvit@gmail.com',
            sendcount
        }
        
        await setSendStatistics(data);
        sendMail(mailList,subject,message);
        return res.status(200).json({success:true,msg:"Sending Mail"});
    })    
}

module.exports = getData;