if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const cors = require('cors');
const express = require('express')
const app = express()
const port = process.env.PORT || 4002

const errorHandler = require('./middlewares/errorHandler');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(require('./routes'))
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Postgres app listening at http://localhost:${port}`)
})
