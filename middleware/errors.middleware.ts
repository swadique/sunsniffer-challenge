import { NextFunction, Request, Response } from "express";
import { GeneralError } from "../utils/errors";

const errorResponseMiddleWare = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: "FAILED",
      message: err.message,
      ...(err.details && { details: err.details }),
    });
  }

  console.log("server error: ", err.message);
  return res.status(500).json({
    status: "FAILED",
    message: "An unexpected error ocurred! Try again later.",
  });
};

export default errorResponseMiddleWare;
