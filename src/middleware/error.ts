import { NextFunction, Request, Response } from 'express';
import ErrorResponse from '../utils/errorResponse';
import logger from '../utils/logger';

const errorResponse = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;

  logger.info(err);

  // Mongoose bad object id
  if (err.name === 'CastError') {
    const message = `Country not found with id ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = `${Object.keys(err.keyValue)[0]} is taken`;
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  // if (err.name === 'ValidationError') {
  //   const message = Object.values(err.errors).map((val) => val.message);
  //   error = new ErrorResponse(message, 400);
  // }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

export default errorResponse;
