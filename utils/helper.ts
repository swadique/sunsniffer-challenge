export const getWeekNumber = (isoWeekYear: string) => {
  return parseInt(isoWeekYear.split("-")[1].replace("W", ""));
};

export const getYear = (isoWeekYear: string) => {
  return parseInt(isoWeekYear.split("-")[0]);
};

export const getSortData = (sort: string) => {
  return sort.replace("]", "").split("[");
};
