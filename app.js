const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: false}))

app.use(morgan('short'))

app.use(express.static('./public'))


app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Welcome to Alex's invontory system!")
})

const router = require('./routes/book.js')
app.use(router)

const PORT = process.env.PORT || 5000

// localhost:5000
app.listen(PORT, () => {
    console.log("Console is up and listening on " + PORT)
})