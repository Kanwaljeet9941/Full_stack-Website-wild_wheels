const AppError = require("./../utils/appError");

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

function sendErrorDev(err, res) {
  res.status(err.statusCode).json({
    stauts: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
}

function sendErrorProd(err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      stauts: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      stauts: "error",
      message: "Something went very wrong!",
    });
  }
}

module.exports = (err, req, res, next) => {
  const env = process.env.NODE_ENV.trim().toLowerCase();
  err.statusCode = err.statusCode || 500;
  err.status = err.staus || "Error!";

  if (env === "development") {
    sendErrorDev(err, res);
  } else if (env === "production") {
    let error = Object.assign(err);
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "VlidationError") error = handleValidationErrorDB(error);
    sendErrorProd(error, res);
  }
};
