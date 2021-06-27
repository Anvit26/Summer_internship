const axios = require('axios');
const { response } = require('express');
var {CacheData} = require('./cache');

const getArtsNews = async()=>{
    const type='arts';
    const url = `https://api.nytimes.com/svc/topstories/v2/${type}.json?api-key=${process.env.API_KEY}`;

    return await axios.get(url)
        .then((response) => response.data)
        .catch((error) => console.log(error));
}

const getScienceNews = async() =>{
    const type = 'science';
    const url = `https://api.nytimes.com/svc/topstories/v2/${type}.json?api-key=${process.env.API_KEY}`;

    return await axios.get(url)
        .then((response) => response.data)
        .catch((error) => console.log(error));
}

const getBusinessNews = async() =>{
    const type = 'business';
    const url = `https://api.nytimes.com/svc/topstories/v2/${type}.json?api-key=${process.env.API_KEY}`;

    return await axios.get(url)
        .then((response) => response.data)
        .catch((error) => console.log(error));
}

const scienceCache = new CacheData(getScienceNews,);
const businessCache = new CacheData(getBusinessNews);
const artsCache = new CacheData(getArtsNews);

const sendData = (req,res)=>{
    console.log(req.params);
    let path = req.params.type;
    //res.status(200).json({hello:"helo"});
    if(path === 'db'){
        var artsDB;
        var businessDB;
        var scienceDB;
    artsCache.getData()
        .then((result) =>{artsDB = result;})
        .catch((error) => {res.status(404).json({message:error.message})});
    scienceCache.getData()
        .then((result) =>{scienceDB = result;})
        .catch((error) => {res.status(404).json({message:error.message})});
    businessCache.getData()
        .then((result) =>{res.status(200).json({msg:{businessDB:result,artsDB,scienceDB}})})
        //.then((artsDB,businessDB,scienceDB) =>{res.status(200).json({artsDB,businessDB,scienceDB})})
        .catch((error) => {res.status(404).json({message:error.message})});
    }
    /*//let path = req.params.type;
    //console.log(path);
    if(path === 'art'){
        // res.status(200).json({path});
    artsCache.getData()
        .then((result) =>{res.status(200).json(result)})
        .catch((error) => {res.status(404).json({message:error.message})});
    }
    if(path === 'science'){
        //  res.status(200).json({path});
    scienceCache.getData()
        .then((result) =>{res.status(200).json(result)})
        .catch((error) => {res.status(404).json({message:error.message})});
    }
    if(path === 'business'){
        // res.status(200).json({path});
    businessCache.getData()
        .then((result) =>{res.status(200).json(result)})
        .catch((error) => {res.status(404).json({message:error.message})});
    }
    //res.status(200).json({path});*/
};
module.exports = sendData;


//module.exports = {sendData,scienceCache,businessCache,artsCache};

/*const getScienceNews = async(req,res) =>{
    type = 'science';
    await axios.get(url)
        .then((response)=>{
            console.log(response);
        })
        .catch((error)=>{
            console.log(error);
        });
}

const getBusinessNews = async(req,res) =>{
    type = 'business';
    await axios.get(url)
        .then((response) =>{
            console.log(response);
        })
        .catch((error) =>{
            console.log(error);
        });
}*/