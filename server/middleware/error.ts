import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddlware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found: invalid ${req.path}`;
    err = new ErrorHandler(message, 400);
  }

  // duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = "JsonWebToken is Invalid, try again later";
    err = new ErrorHandler(message, 400);
  }

  // jwt expired error
  if (err.name === "TokenExpiredError") {
    const message = "JsonWebToken is expired, try again later";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    status: "false",
    message: err.message,
  });
};
