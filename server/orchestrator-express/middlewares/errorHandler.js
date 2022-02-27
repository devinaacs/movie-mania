const errorHandler = (err, req, res, next) => {
    console.log(err)

    let statusCode = 500
    let errMessage = "Internal server error"

    if (err.response.status === 400) {
        statusCode = 400
        errMessage = `${err.response.data.message}`
    } else if (err.response.status === 404) {
        statusCode = 404
        errMessage = `${err.response.data.message}`
    }

    res.status(statusCode).json({
        message: errMessage
    })
}
module.exports = errorHandler