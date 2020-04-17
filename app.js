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

const PORT = process.env.PORT || 3000

// localhost:3000
app.listen(PORT, () => {
    console.log("Console is up and listening on " + PORT)
})