import {DAY_IN_WEEK_INDEX} from "./enum";

const helper = {
  addDateExcWorkingDay: function(a:string,fromDate: Date, days: number) {
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
  getRandomInt: (max) => {
    return Math.floor(Math.random() * max);
  }
};

export {
  helper
};
