const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    name:{
        name:String
    },
    bio:{
        bio:String
    },
    pic:{
        data: Buffer,
        contentType: String
    }
});

const Profile = mongoose.model("Profile",reportSchema);

module.exports = Profile;