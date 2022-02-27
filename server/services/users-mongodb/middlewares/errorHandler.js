const errorHandler = (err, req, res, next) => {
    // console.log('&&', err, '***')
    let statusCode = 500
    let errMessage = "Internal server error"

    if (err.name === "JsonWebTokenError" ||
        err.name == "UNAUTHORIZED") {
        statusCode = 401
        errMessage = "Invalid token"

    } else if (err.name === "NOT_FOUND") {
        statusCode = 404
        errMessage = "Data not found"

    }

    res.status(statusCode).json({
        message: errMessage
    })
}
module.exports = errorHandler