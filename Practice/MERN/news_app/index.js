//https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=#####################
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const newsRoutes = require('./routes/news');
const dashboardRoute = require('./routes/dashboard');

const app = express(); 
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

//app.use(bodyParser.json({limit:"30mb",extended:true}));
//app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));

app.use('/news',newsRoutes);
app.use('/dashboard',dashboardRoute);

const PORT  = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`server running on ${PORT}`))