"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helper = void 0;
const enum_1 = require("./enum");
const helper = {
    addDateExcWorkingDay: function (a, fromDate, days) {
        let count = 0;
        let date = new Date(fromDate);
        while (count < days) {
            date.setDate(date.getDate() + 1);
            if (date.getDay() != enum_1.DAY_IN_WEEK_INDEX.sun && date.getDay() != enum_1.DAY_IN_WEEK_INDEX.sat) {
                count++;
            }
        }
        ;
        return date;
    },
    getRandomInt: (max) => {
        return Math.floor(Math.random() * max);
    }
};
exports.helper = helper;
//# sourceMappingURL=helper.js.map