const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const ClientModel = require('./models/Client')

const app = express()
app.use(express.json()) //transports data passed from frontend to backend in json format
app.use(cors())
//create connection
mongoose.connect("mongodb://localhost:27017/client"); //connection string from MongoDB
//localhost might not work so might have to change to local IP address, add database
//name "/client" to end

//create route (client); function to get request and response
app.post('/client', (req, res) => {
    //insert record into database
    ClientModel.create(req.body) //data coming from frontend is in req.body
    //return back to frontend
    .then(employees => res.json(clients))
    .catch(err => res.json(err))
})

//run server, callback function to make sure server running
app.listen(3002, () => { //3001 is port number
    console.log("server is running")
})