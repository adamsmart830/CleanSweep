const express = require('express');
require('dotenv').config({path: __dirname+'../.env'});
const app = express();
const PORT = process.env.PORT || 3500 // Change to whatever local port
const mongoose = require('mongoose');

USER = process.env.MONGO_USER; 
PASSWD = process.env.MONGO_PASSWORD;
CLUSTER = process.env.MONGO_CLUSTER;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connect(`mongodb+srv://${USER}:${PASSWD}@$${CLUSTER}.mongodb.net`)
.then(() => {
    console.log("Successfully connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
});

// endpoints for reports
app.post("/report",async(req,res) =>{
    try{

    } catch(error){
        console.log("Error submitting report!", error);
        res.status(500).json({message:"Report submission failed."});
    }
})