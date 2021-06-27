const aws = require('aws-sdk');
const ses = new aws.SES({region:'ap-south-1'});

const sendMail = (mailList,subject,message) =>{
    // let mailList = splitRes;
    //console.log(mailList);
    let params ={
        Destination:{
            ToAddresses:mailList,
        },
        Source:"daveanvit@gmail.com",
        Message: {
            Body: {
             Text: {
              Charset: "UTF-8", 
              Data: message
             }
            }, 
            Subject: {
             Charset: "UTF-8", 
             Data: subject
            }
           }, 
    };
    //console.log(params);
    ses.sendEmail(params,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            console.log(data);
        }
    });
};

module.exports = sendMail;
