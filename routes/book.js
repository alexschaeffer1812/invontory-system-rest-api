// Contains all book related routes
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const bodyParser = require('body-parser')

router.use(bodyParser.json())

// Connect and authenticate with MySQL database

// Production DB
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'bf5561c97283cb',
    password: '1f4442b0',
    database: 'heroku_ec907147b0ec13a'
})

// Local DB
// const pool = mysql.createPool({
//     connectionLimit: 10,
//     host: 'localhost',
//     user: 'root',
//     password: 'wdph2hc!1812A',
//     database: 'invontory_db'
// })

function getConnection() {
    return pool
}



// Gets all books in database
router.get("/books", (req, res) => {
    const queryString = "SELECT * FROM books"
    getConnection().query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Faild to execute query")
            res.sendStatus(500)
            return
        }
        console.log("Success!!")
        res.json(rows)
    })
})


// Gets book by ID
router.get('/books/:id', (req, res) => {
    console.log("Book id: " + req.params.id)
    const userId = req.params.id
    const queryString = "SELECT * FROM books WHERE id = ?"
    getConnection().query(queryString, [userId], (err, rows, fields) => {
        if (err) {
            console.log("Faild to execute query")
            res.sendStatus(500)
            return
        }
        console.log("Success!!")
        res.json(rows)
    })

})

// Inserts book into database
router.post('/add_book/', (req, res) => {

    const title = req.body.title
    const author = req.body.author
    const description = req.body.description
    const genre = req.body.genre
    const isbn = req.body.isbn
    const inStock = req.body.inStock
    const price = req.body.price

    const queryString = "INSERT INTO books (title, author, description, genre, isbn, instock, price) VALUES (?, ?, ?, ?, ?, ?, ?)"
    getConnection().query(queryString, [title, author, description, genre, isbn, inStock, price], (err, rows, fields) => {
        if (err) {
            console.log("Faild to add book: " + err)
            res.sendStatus(500)
            return
        }
        console.log("Success")
        console.log(title)
        res.end()
    })
})


// Updates book into database
router.post('/update_book/:id', (req, res) => {

    const title = req.body.title
    const author = req.body.author
    const description = req.body.description
    const genre = req.body.genre
    const isbn = req.body.isbn
    const inStock = req.body.inStock
    const price = req.body.price

    const queryString = "UPDATE books SET title = ?, author = ?, description = ?, genre = ?, isbn = ?, instock = ?, price = ? WHERE id = ?"
    getConnection().query(queryString, [title, author, description, genre, isbn, inStock, price, req.params.id], (err, rows, fields) => {
        if (err) {
            console.log("Faild to add book: " + err)
            res.sendStatus(500)
            return
        }
        console.log("Success")
        console.log(title)
        res.end()
    })
})


// Deletes book by ID
router.delete('/books/:id', (req, res) => {
    console.log("Book id: " + req.params.id)
    const userId = req.params.id
    const queryString = "DELETE FROM books WHERE id = ?"
    getConnection().query(queryString, [userId], (err, rows, fields) => {
        if (err) {
            console.log("Faild to execute query")
            res.sendStatus(500)
            return
        }
        console.log("Book deleted")
        res.end()
    })

})


module.exports = router