const express = require('express');
const app = express()
const port = 4000

const errorHandler = require('./middlewares/errorHandler');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(require('./routes'))
app.use(errorHandler)


app.listen(port, () => {
    console.log(`Orchestrator-express app listening at http://localhost:${port}`)
})