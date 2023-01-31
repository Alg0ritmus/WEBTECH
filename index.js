const express = require('express');
const app = express();
const Routerik = require('./Router/Routerik');


const PORT = 5000 || process.env.PORT;
//load static files scss,imgs...
app.use(express.json());
app.use(express.static('../WT')); 
//use router
app.use(Routerik);
app.listen(PORT,()=>console.log("Server is up and running on port",PORT,"..."));



