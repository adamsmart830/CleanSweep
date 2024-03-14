/* 
sets up an Express server with routes for retrieving and adding Todo items to a
MongoDB database, using Mongoose for database operations and CORS middleware for
cross-origin requests
*/
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
//imports the Mongoose model that handels ToDo items
const TodoModel = require('./Models/Todo')
//creates instance of Express
const app = express()
//establishes middleweare for cors and json requests
app.use(cors())
app.use(express.json())

//connecting to database, copy url from mongoDB compass
//local host gets changed to IP address, test creates a test database
//connection to MongoDB database running on 'localhose' at port '27017', connects to 'test' database
mongoose.connect('mongodb://127.0.0.1:27017/test')

/* 
This sets up a GET route at /get. When a GET request is made to this endpoint,
it queries the database for all Todo items using TodoModel.find(), then sends the result
as JSON back to the client.
*/
app.get('/get', (req, res) => {
    //gets all our data:
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

/* 
sets up a POST route at /add. When a POST request is made to this endpoint, it expects JSON data
with a task property in the request body. It then creates a new Todo item in the database with
the provided task, and sends the result as JSON back to the client.
*/
app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))

})
/*starts the Express server on port number '3001'; when server starts, logs message
"Server is Running" to the console*/
app.listen(3001, () => {
    console.log("Server is Running")
}) 