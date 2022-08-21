import { NextFunction, Request, Response } from "express";
import { vaccineSummeryHelper } from "../helper/vaccine.helper";

export const vaccineSummery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const country = req.query.c as string;
    const rangeSize = req.query.rangeSize as string;
    const dateFrom = req.query.dateFrom as string;
    const dateTo = req.query.dateTo as string;
    const sort = req.query.sort as string;

    next();

    const result = await vaccineSummeryHelper(
      country,
      dateFrom,
      dateTo,
      rangeSize,
      sort
    );
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};
