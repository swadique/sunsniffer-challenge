import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { BadRequest } from "../utils/errors";

const validatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req).array({
    onlyFirstError: true,
  });
  if (errors.length) {
    throw new BadRequest("Validation errors", errors);
  }
  next();
};

export default validatorMiddleware;
