const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    type:{
        type:String
    },
    location:{
        x_coord:Number,
        y_coord:Number
    }
});

const Report = mongoose.model("Report",reportSchema);

module.exports = Report;