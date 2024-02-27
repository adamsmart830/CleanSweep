const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')

const app = express()
app.use(cors())
app.use(express.json())

//connecting to database, copy url from mongoDB compass
//local host gets changed to IP address, test creates a test database
mongoose.connect('mongodb://127.0.0.1:27017/test')
app.get('/get', (req, res) => {
    //gets all our data:
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))

})
app.listen(3001, () => {
    console.log("Server is Running")
}) //port number 3001