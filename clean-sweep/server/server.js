const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3500 // Change to whatever local port
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');

// from dotenv 
USER = process.env.MONGO_USER; 
PASSWD = process.env.MONGO_PASSWORD;
CLUSTER = process.env.MONGO_CLUSTER;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// confirm connection to database 
mongoose.connect(`mongodb+srv://${USER}:${PASSWD}@$${CLUSTER}.mongodb.net`)
.then(() => {
    console.log("Successfully connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
});

// schema
const Report = require("./models/reports");

// add middleware
app.use(cors());
app.use(bodyParser.json());

// endpoints for reports
app.post("/reports", async(req,res) => {
    try{
        const {type, location} = req.body;
        const newReport = new Report({type, location});
        await newReport.save();
        res.status(201).send("Report saved successfully.");
    } catch(err){
        console.log("Error submitting report!", err);
        res.status(500).json({message:"Report submission failed."});
    }
})