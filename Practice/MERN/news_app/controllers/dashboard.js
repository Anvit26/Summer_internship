const getData = require('./news');

const getDashboard = (req,res) =>{
    getData(req,res);
}

module.exports =  getDashboard;