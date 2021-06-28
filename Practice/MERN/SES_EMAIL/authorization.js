const jwt = require('jsonwebtoken');

const secKey = 'QWERTYYUIO!@#$%^&';

module.exports = (creadentials = [])=>{
    return ((req,res,next)=>{        
        console.log('Auth-middleware');
        if(typeof creadentials === 'string'){
            creadentials =[creadentials];
        }
        
        const token = req.headers['authorization'];
        if(!token){
            return res.status(401).send("Error: Access Denied")
        }else{
            //Bearer
            const tokenBody = token.slice(7);
            //jwt.verify(tokenBody,'SuperSecreat',(err,decoded)=>{
            jwt.verify(tokenBody,secKey,(err,decoded)=>{
                if(err){
                    console.log(`JWT Error: ${err}`);
                    return res.status(401).send("Error: Access Denied");
                }
                if(creadentials.length > 0 ){
                    if(decoded.policy &&
                        decoded.policy.length &&
                        creadentials.some(cred => decoded.policy.indexOf(cred)>=0)
                        ){
                        next();
                    }else{
                        return res.status(401).send("Error: Access Denied")
                    }
                }else{
                    next();
                }
            });
        }
    });
};
