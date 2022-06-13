const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}

const sendErrorProd = (err, res) => {
  // operational error, send to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  } else {
    // progrramming or other unknown errror : don't send error details
    // 1. Log error
    console.error('ERROR ', err)
    // 2. Generic error
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!'
    })
  }
}

module.exports = (err, req, res, next) => {
  if (!res.headersSent) {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if (process.env.NODE_ENV === 'development') {
      sendErrorDev(err, res)
    } else if (process.env.NODE_ENV === 'production') {
      sendErrorProd(err, res)
    }
  }
}
