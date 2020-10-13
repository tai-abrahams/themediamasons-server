const express = require('express');

// error handling middleware, should be last piece of middleware
const error404 = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // next when filled with 'error' forwards every error to the 'error' middleware
};

// error handlers take in an additional error property, placed first
const errorHandler = (err, req, res, next) => {
  // if somehow statusCode is 200, change to 500 (internal server error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode)
    .json({
      error: err.message,
      stack: process.env.NODE_ENV === 'DEVELOPMENT' ? err.stack : null,
    });
};

module.exports = {
  error404,
  errorHandler,
};
