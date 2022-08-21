import { query } from "express-validator";
import { getWeekNumber, getYear } from "../utils/helper";


export const vaccineSummeryValidator = [
  query(["c", "dateFrom", "dateTo", "rangeSize", "sort"]).notEmpty(),
  query("rangeSize").isNumeric(),
  query("dateFrom", "dateTo").custom((value) => {
    const year = getYear(value);
    const week = getWeekNumber(value);
    if (!year || !week) {
      return Promise.reject("Invalid year and week");
    }
    if (week <= 0 || week > 53) {
      return Promise.reject("Week should be between 1 and 53");
    }
    return value;
  }),
  query("sort").custom((value) => {
    try {
      const sortData = value.replace("]", "").split("[");
      const availableFields = ["weekStart", "NumberDosesReceived"];
      const availleOptions = ["ascending", "descending"];

      if (!availableFields.includes(sortData[0])) {
        throw new Error();
      }
      if (!availleOptions.includes(sortData[1])) {
        throw new Error();
      }
      return value;
    } catch (e) {
      return Promise.reject("Invalid sort option");
    }
  }),
];
