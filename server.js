const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config(); // To have env variables in dotenv file.

// To configure the server
const app = express();
const port = process.env.Port || 3000; 

// Middleware
app.use(cors());
//app.use(bodyParser.json());    // OR
app.use(express.json()); // To parse json file.


// Connecting to MongoDB via local server
const url = process.env.ATLAS_URI;
mongoose.connect( url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err)=>{
    if(err){
        console.log("[MONGO ERROR]",err);
    }else{
        console.log("MongoDB database connection established successfully !!!");
        console.log("at:", url);
    }
    
});
const db_connect = mongoose.connection; 
/*
db_connect.once('open', () =>{
    console.log("MongoDB database connection established successfully !!!");
})
*/


// import schema files (models)


// require and use routers
const userRouter = require('./routes/user');
const restaurantRouter = require('./routes/restaurant');

app.use('/user', userRouter);
app.use('/restaurant', restaurantRouter);


app.listen(port, () => {
    console.log('Server is running in port:', port);
});