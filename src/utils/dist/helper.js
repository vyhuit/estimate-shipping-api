"use strict";
exports.__esModule = true;
exports.helper = void 0;
var enum_1 = require("./enum");
var helper = {
    addDateExcWorkingDay: function (a, fromDate, days) {
        var count = 0;
        var date = new Date(fromDate);
        while (count < days) {
            date.setDate(date.getDate() + 1);
            if (date.getDay() != enum_1.DAY_IN_WEEK_INDEX.sun && date.getDay() != enum_1.DAY_IN_WEEK_INDEX.sat) {
                count++;
            }
        }
        ;
        return date;
    },
    getRandomInt: function (max) {
        return Math.floor(Math.random() * max);
    }
};
exports.helper = helper;
