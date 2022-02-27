if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const cors = require('cors');
const express = require('express');
const app = express()
const port = process.env.PORT || 4001
const { connect } = require('./config/mongoConnection');
const errorHandler = require('./middlewares/errorHandler');



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', require('./routes'))
app.use(errorHandler)


connect()
    .then(() => {
        app.listen(port, () => {
            console.log(`MongoDB app listening at http://localhost:${port}`)
        })
    })
    .catch(err => {
        console.log(err)
    })