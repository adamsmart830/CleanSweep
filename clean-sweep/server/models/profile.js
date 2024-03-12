const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    user:{
        user:String
    },
    location:{
        x_coord:Number,
        y_coord:Number
    }
});

const Profile = mongoose.model("Profile",reportSchema);

module.exports = Profile;