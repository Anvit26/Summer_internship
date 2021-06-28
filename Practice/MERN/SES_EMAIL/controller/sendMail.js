const aws = require('aws-sdk');
const ses = new aws.SES({region:'ap-south-1'});

// To Send Mail To Clients Using AWS-SES
const sendMail = (mailList,subject,message) =>{
    let params ={
        Destination:{ToAddresses:mailList},
        Source:"###############",
        Message: {
            Body: {
             Text: {Charset: "UTF-8", Data: message}
            }, 
            Subject: {Charset: "UTF-8",Data: subject}
           }, 
    };

    ses.sendEmail(params,(error,data)=>{
        if(error){
            console.log("SEND_MAIL_ERROR: ",error);
        }else{
            console.log("SEND_MAIL_DATA: ",data);
        }
    });
};

module.exports = sendMail;
