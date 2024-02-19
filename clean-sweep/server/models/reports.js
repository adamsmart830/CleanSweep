const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    location:{
        x_coord:Number,
        y_coord:Number,
        required:true
    }
});

const Report = mongoose.model("Report",reportSchema);

module.exports = Report;