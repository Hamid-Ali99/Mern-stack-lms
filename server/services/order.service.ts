import { NextFunction, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import OrderModel from "../models/order.model";
import ErrorHandler from "../utils/ErrorHandler";

// create new order
// export const newOrder = catchAsyncError(
//   async (data: any, res: Response, next: NextFunction) => {
//     const order = await OrderModel.create(data);

//     res.status(201).json({
//       success: true,
//       order,
//     });
//   }
// );

export const newOrder = catchAsyncError(
  async (data: any, res: Response, next: NextFunction) => {
    try {
      const order = await OrderModel.create(data);

      res.status(201).json({
        success: true,
        order,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
