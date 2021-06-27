app.get('/token',(req,res)=>{
    const payload = {
        name:"Anvit",
        policy:['file:create']
    };

    const token = jwt.sign(payload,'SuperSecreat');
    res.send(token);
});


app.get('/user',authorize("file:create"),(req,res)=>{
    res.status(200).json('User Info');
})