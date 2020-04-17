const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))

app.use(morgan('short'))

app.use(express.static('./public'))


app.get("/", (req, res) => {
    console.log("Responding to roo route")
    res.send("Hello from the root!")
})

const router = require('./routes/book.js')
app.use(router)

// localhost:3000
app.listen(3000, () => {
    console.log("Console is up and listening on port 3000")
})