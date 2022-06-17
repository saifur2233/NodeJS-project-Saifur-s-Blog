const AppError = require('../utilities/AppError');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR ', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJwtError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid token. Please log in again! ${errors.join('. ')}`;
  return new AppError(message, 401);
};

const handleJwtExpiredError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Token Expired. Please log in again. ${errors.join('. ')}`;
  return new AppError(message, 401);
};

module.exports = (err, req, res, next) => {
  if (!res.headersSent) {
    console.log(err);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
      sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
      let error = { ...err };

      if (error.name === 'ValidationError')
        error = handleValidationErrorDB(error);
      if (error.name === 'JsonWebTokenError') error = handleJwtError(error);
      if (error.name === 'TokenExpiredError')
        error = handleJwtExpiredError(error);
      sendErrorProd(error, res);
    }
  }
};
