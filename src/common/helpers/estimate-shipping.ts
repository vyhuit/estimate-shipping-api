import {DAY_IN_WEEK_INDEX} from "src/common/constants/public";

let addDateExcludeWorkingDay = function(a: string, fromDate: Date, days: number) {
  let count = 0;
  let date = new Date(fromDate);
  while (count < days) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() != DAY_IN_WEEK_INDEX.sun && date.getDay() != DAY_IN_WEEK_INDEX.sat) {
      count++;
    }
  };
  return date;
};

export {
  addDateExcludeWorkingDay
};
