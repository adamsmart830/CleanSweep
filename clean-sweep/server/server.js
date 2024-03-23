const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const router = express.Router();

const { MONGO_USER, MONGO_PASSWORD, MONGO_CLUSTER, PORT } = process.env;

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// MongoDB connection
mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.mongodb.net/myDatabase`)
.then(() => {
    console.log("Successfully connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
});

// Import your Report model
const Report = require("./models/reports.js"); 

// Middlewares
router.use(cors());
router.use(express.json()); 

// POST endpoint for reports
router.post('/reports', async (req, res) => {
    try {
        // Destructure and validate the required fields from the request body
        const { type, location } = req.body;

        // Basic validation (you can expand this based on your requirements)
        if (!type || !location || location.length !== 2) {
            // Bad request if type or properly formatted location isn't provided
            return res.status(400).json({ message: "Please provide a valid 'type' and 'location'." });
        }

        // Creating a new report with the request body data
        const newReport = new Report({ type, location });

        // Save the new report to the database
        const savedReport = await newReport.save();

        // Respond with the created report
        res.status(201).json({
            message: "Report saved successfully.",
            report: savedReport
        });

    } catch (err) {
        console.error("Error submitting report:", err);
        // Internal Server Error for unexpected issues
        res.status(500).json({ message: "Report submission failed due to an unexpected error.", error: err.message });
    }
});


// Generic error handling middleware 
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = router;
