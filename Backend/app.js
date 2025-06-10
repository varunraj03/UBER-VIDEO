const dotenv = require('dotenv'); // Load environment variables from .env file
dotenv.config(); // Load environment variables

// require express
const express= require('express');
const cors = require('cors');
const app= express();
const connectToDb = require('./db/db'); // Import the database connection function
connectToDb(); // Connect to the database
const userRoutes = require('./routes/user.routes'); // Import user routes




app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies


app.get('/',(req,res)=>{
    res.send('hello world');
});

app.use('/users',userRoutes); // Use user routes for all requests to /user

module.exports=app;