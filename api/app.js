const express = require('express')
const app = express()

const { listTodos, addTodo } = require('./dal.js')

const { split } = require('ramda')

const bodyParser = require('body-parser')

const HTTPError = require('node-http-error')
const port = process.env.PORT || 8080
const cors = require('cors')

app.use(cors({
  credentials: true
}))

app.use(bodyParser.json())

//Initial Code Example
app.get('/', function(req, res) {
  res.send('Welcome to the Todos API!')
})

//GET ALL TODOS IN DATABASE
app.get('/todos', function (req, res, next) {
  listTodos(function(err, listOfTodos) {
    if (err) next(new HTTPError(err.status, err.message, err))
    res.status(200).send(listOfTodos)
  })
})

//CREATE todo in database
app.post('/todos', function(req, res, next) {

    addTodo(req.body, function(err, todo) {
      if (err) next(new HTTPError(err.status, err.message, err))
      res.status(201).send(todo)
    })
})




//ERROR HANDLING
app.use(function(err, req, res, next) {
    console.log(req.method, " ", req.path, "error:  ", err)
    res.status(err.status || 500)
    res.send(err)
})

app.listen(port, function() {
    console.log("API is up and running on port ", port)
})
