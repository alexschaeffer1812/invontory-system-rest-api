// Contains all book related routes
const express = require('express')
const router = express.Router()
const mysql = require('mysql')

// Connect and authenticate with MySQL database

// Production DB
const connection = mysql.createConnection( {
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'bf5561c97283cb',
    password: '1f4442b0',
    database: 'heroku_ec907147b0ec13a'
})


// Local DB
// const connection = mysql.createConnection( {
//     host: 'localhost',
//     user: 'root',
//     password: 'wdph2hc!1812A',
//     database: 'invontory_db'
// })


// Gets all books in database
router.get("/books", (req, res) => {
    const queryString = "SELECT * FROM books"
    connection.query(queryString, (err, rows, fields) => {
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
    connection.query(queryString, [userId], (err, rows, fields) => {
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
router.post('/book_add', (req, res) => {

    const title = req.body.add_title
    const author = req.body.add_author
    const description = req.body.add_description
    const genre = req.body.add_genre
    const isbn = req.body.add_isbn
    const inStock = req.body.add_inStock
    const price = req.body.add_price

    const queryString = "INSERT INTO books (title, author, description, genre, isbn, in_stock, price) VALUES (?, ?, ?, ?, ?, ?, ?)"
    connection.query(queryString, [title, author, description, genre, isbn, inStock, price], (err, rows, fields) => {
        if (err) {
            console.log("Faild to add book: " + err)
            res.sendStatus(500)
            return
        }
        console.log("Success")
        res.end();
    })
})


module.exports = router