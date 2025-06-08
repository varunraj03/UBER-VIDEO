const dotenv = require('dotenv'); // Load environment variables from .env file
dotenv.config(); // Load environment variables

// require express
const express= require('express');
const cors = require('cors');
const app= express();

app.use(cors()); // Enable CORS for all routes

app.get('/',(req,res)=>{
    res.send('hello world');
});

module.exports=app;