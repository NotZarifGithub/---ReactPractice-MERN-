
const errorHandler = (err, req, res, next) => {

  const statusCode = res.statusCode ? res.statusCode : 500

  res.status(statusCode).json({
    success: false,
    message: "Something went wrong with the server!",
    error: err.message || "Internal server error"
  })
}

module.exports = errorHandler

