const errorHandler = (err, req, res, next) => {
    console.log(err)
    let statusCode = 500
    let errMessage = "Internal server error"

    if (err.name === "SequelizeValidationError" ||
        err.name === "SequelizeUniqueConstraintError") {
        statusCode = 400
        errMessage = err.errors[0].message

    } else if (err.name === "JsonWebTokenError" ||
        err.name == "UNAUTHORIZED") {
        statusCode = 401
        errMessage = "Invalid token"

    } else if (err.name === "INVALID_EMAIL_PASSWORD") {
        statusCode = 401
        errMessage = "Invalid email/password"

    } else if (err.name === "NOT_FOUND") {
        statusCode = 404
        errMessage = "Data not found"

    } else if (err.name === "FORBIDDEN") {
        statusCode = 403
        errMessage = "You are not authorized"
    }

    res.status(statusCode).json({
        message: errMessage
    })
}
module.exports = errorHandler