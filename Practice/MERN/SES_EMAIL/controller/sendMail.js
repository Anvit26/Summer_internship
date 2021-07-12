const aws = require('aws-sdk');
const ses = new aws.SES({region:'ap-south-1'});

// To Send Mail To Clients Using AWS-SES
const sendMail = (mailList,subject,message) =>{
    for(let i=0;i<mailList.length;i++){
        let dynamic = mailList[i].split(',');
         message=message.replace("${dynamic}", dynamic[1]);
        
        // templateMail(dynamic[0],dynamic[1]);
        //  textMail(dynamic[0],subject,message);
    }
};

const sendMailOtp = (mailList,subject,message) =>{
    textMail(mailList,subject,message);
};

// Send Text Mail
const textMail = (mailList,subject,message) =>{
    console.log(mailList,subject,message)
    let params ={
        Destination:{
            ToAddresses:[mailList]
        },
        Source:"daveanvit@gmail.com",
        Message: {
            Body: {
             Text: {Charset: "UTF-8", Data: "OTP For Password Reset "+ message}
            }, 
            Subject: {Charset: "UTF-8",Data: subject}
           }, 
    };
    ses.sendEmail(params,(error,data)=>{
        if(error){
            console.log("SEND_MAIL_ERROR: ",error);
        }else{
            console.log("SEND_MAIL_DATA: SUCESS");
            // console.log("SEND_MAIL_DATA: ",data);
        }
    });
}

// sendTemplatedEmail params 
const templateMail = (reciverMail,dynamic) =>{
    // console.log(reciverMail,dynamic);
    let templateData = JSON.stringify({
        name:dynamic 
     })

    var sendTemplatedEmailParams = {
        Destination:{ToAddresses:[`${reciverMail}`]},
        Source:"daveanvit@gmail.com",
        Template: 'MyTemplate', 
        TemplateData: templateData,
    }

// Create the promise and SES service object
var sendPromise = new aws.SES({apiVersion: '2010-12-01',region:'ap-south-1'}).sendTemplatedEmail(sendTemplatedEmailParams).promise();

// Handle promise's fulfilled/rejected states
sendPromise.then(
  function(data) {
    console.log(data);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });

}

module.exports = {sendMail,sendMailOtp};
// module.exports = sendMail;