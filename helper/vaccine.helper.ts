import { PipelineStage } from "mongoose";
import vaccineModel from "../models/vaccine.model";
import { getWeekNumber, getYear } from "../utils/helper";

export const vaccineSummeryHelper = async (
  c: string,
  dateFrom: string,
  dateTo: string,
  rangeSize: string,
  sort: string
) => {
  const offsetYear = 2020;
  const totalWeek = 53;
  const sortData = sort.replace("]", "").split("[");
  const fromYear = getYear(dateFrom);
  const fromWeek = getWeekNumber(dateFrom);
  const toYear = getYear(dateTo);
  const toWeek = getWeekNumber(dateTo);
  let sortedResult;

  if (fromWeek <= 0 || fromWeek > totalWeek) {
    throw new BadRequest("Invalid input");
  }

  if (toWeek <= 0 || toWeek > totalWeek) {
    throw new Error("Invalid input");
  }

  const fromWeekIndex: number = (fromYear - offsetYear) * totalWeek + fromWeek;
  const toWeekIndex: number = (toYear - offsetYear) * totalWeek + toWeek;

  const pipe: PipelineStage[] = [
    {
      $match: {
        ReportingCountry: c,
      },
    },
    {
      $group: {
        _id: "$YearWeekISO",
        NumberDosesReceived: {
          $sum: "$NumberDosesReceived",
        },
      },
    },
    {
      $addFields: {
        weekIndex: {
          $let: {
            vars: {
              yearNumber: {
                $toInt: {
                  $first: {
                    $split: ["$_id", "-"],
                  },
                },
              },
              weekNumber: {
                $toInt: {
                  $trim: {
                    input: {
                      $last: {
                        $split: ["$_id", "-"],
                      },
                    },
                    chars: "W",
                  },
                },
              },
            },
            in: {
              $sum: [
                "$$weekNumber",
                {
                  $multiply: [
                    {
                      $subtract: ["$$yearNumber", offsetYear],
                    },
                    totalWeek,
                  ],
                },
              ],
            },
          },
        },
      },
    },
    {
      $match: {
        weekIndex: {
          $gte: fromWeekIndex,
          $lt: toWeekIndex,
        },
      },
    },
    {
      $setWindowFields: {
        sortBy: {
          weekIndex: 1,
        },
        output: {
          NumberDosesReceived: {
            $sum: "$NumberDosesReceived",
            window: {
              documents: [0, parseInt(rangeSize)],
            },
          },
          weekStart: {
            $first: "$_id",
            window: {
              documents: [0, parseInt(rangeSize)],
            },
          },
          weekEnd: {
            $last: "$_id",
            window: {
              documents: [0, parseInt(rangeSize)],
            },
          },
        },
      },
    },
  ];

  const aggregationResult = await vaccineModel.aggregate(pipe);
  const pickedAggregationResult = aggregationResult.filter((value, index) => {
    if (index === 0) {
      return value;
    }
    if ((index + 1) % parseInt(rangeSize) === 0) {
      return value;
    }
  });

  if (sortData[0] === "NumberDosesReceived") {
    if (sortData[1] === "ascending") {
      sortedResult = pickedAggregationResult.sort(
        (a, b) => a.NumberDosesReceived - b.NumberDosesReceived
      );
    } else {
      sortedResult = pickedAggregationResult.sort(
        (a, b) => b.NumberDosesReceived - a.NumberDosesReceived
      );
    }
  } else if (sortData[0] === "weekStart") {
    if (sortData[1] === "ascending") {
      sortedResult = pickedAggregationResult.sort(
        (a, b) => a.weekIndex - b.weekIndex
      );
    } else {
      sortedResult = pickedAggregationResult.sort(
        (a, b) => b.weekIndex - a.weekIndex
      );
    }
  } else {
    sortedResult = pickedAggregationResult;
  }

  return sortedResult;
};
