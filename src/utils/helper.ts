import {DAY_IN_WEEK_INDEX} from "./enum";

const helper = {
  addDateExcludeWorkingDay: function(a:string,fromDate: Date, days: number) {
    let count = 0;
    let date = new Date(fromDate);
    while (count < days) {
      date.setDate(date.getDate() + 1);
      if (date.getDay() != DAY_IN_WEEK_INDEX.sun && date.getDay() != DAY_IN_WEEK_INDEX.sat) {
        count++;
      }
    };
    return date;
  },
  getRandomInt: (max: number = 1000) => {
    return Math.floor(Math.random() * max);
  }
};

export {
  helper
};
