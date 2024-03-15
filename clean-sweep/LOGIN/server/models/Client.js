//create Client model for table
const mongoose = require('mongoose')

//schema for table
const ClientSchema = new mongoose.Schema({
    //assign the fields our table will have
    name: String,
    email: String,
    password: String
})
//create the model
const ClientModel = mongoose.model("clients", ClientSchema)
module.exports = ClientModel
//creates "clients" table and inserts record into MongoDB under client database