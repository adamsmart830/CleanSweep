const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 3500;

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Using destructuring for environment variables (safer and cleaner)
const { MONGO_USER, MONGO_PASSWORD, MONGO_CLUSTER } = process.env;

// MongoDB connection
mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.mongodb.net/myDatabase?retryWrites=true&w=majority`)
.then(() => {
    console.log("Successfully connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
});

// Import your Report model
const Report = require("./models/reports"); 

// Middlewares
app.use(cors());
app.use(express.json()); 

// POST endpoint for reports
app.post("/reports", async (req, res) => {
    try {
        const { type, location } = req.body;
        const newReport = new Report({ type, location });
        await newReport.save();
        res.status(201).send("Report saved successfully.");
    } catch (err) {
        console.error("Error submitting report!", err);
        res.status(500).json({ message: "Report submission failed.", error: err.message });
    }
});


// Generic error handling middleware 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});