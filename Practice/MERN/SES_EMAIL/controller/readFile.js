const fs = require('fs');
const sendMail = require('./sendMail');

const getData = (req,res) => {
    const subject = req.body.subject;
    const message = req.body.message;
    fs.readFile(`./uploads/${req.params.fileName}`,'utf-8',(err,resp)=>{
        if(err){
            console.log(err);
            return res.status(401).json({msg:'Something went wrong'});
        }
        //const len = resp.size();
        console.log(resp);
        //var mailList = resp.split(\r\n);
        var mailList0 = resp.split(/\r\n/);
        //var mailList1 = mailList0.split(',');
        const mailList =  mailList0.filter(e =>  e);
        //console.log(mailList);
        sendMail(mailList,subject,message);
        return res.status(200).json({success:true,msg:"Sending Mail"});
    })    
}

module.exports = getData;