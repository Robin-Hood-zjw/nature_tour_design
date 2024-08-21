const { CastError } = require('mongoose');

const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  return new AppError(`Invalid ${err.path}: ${err.value}.`, 400);
};

// const handleDuplicateFieldsDB = (err) => {
//   console.log(err);

//   // const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
//   const message = `Duplicate field value: ${err.keyValue.name}. Please use a different value.`;
//   console.log('\n', message);
//   return new AppError(message, 400);
// };
const handleDuplicateFieldsDB = (err) => {
  const key = Object.keys(err.keyValue).join('');
  const message = `The key '${key}' has duplicate value of '${err.keyValue[key]}'`;
  return new AppError(message, 400);
};

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
    res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });
  } else {
    console.log(`Error: ${err}`);
    res.status(500).json({ status: 'error', message: 'Something went wrong.' });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err, name: err.name };

    console.log(error);

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    sendErrorProd(error, res);
  }
};
