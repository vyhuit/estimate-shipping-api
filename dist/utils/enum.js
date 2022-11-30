"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAY_IN_WEEK_INDEX = exports.ESTIMATE_DEFAULT = void 0;
const DAY_IN_WEEK_INDEX = {
    sun: 0,
    mon: 1,
    tue: 2,
    web: 3,
    thu: 4,
    fri: 5,
    sat: 6
};
exports.DAY_IN_WEEK_INDEX = DAY_IN_WEEK_INDEX;
const ESTIMATE_DEFAULT = {
    name: "default",
    config: {
        shipping: {
            min: 4,
            max: 6
        },
        delivery: {
            min: 8,
            max: 12
        }
    }
};
exports.ESTIMATE_DEFAULT = ESTIMATE_DEFAULT;
//# sourceMappingURL=enum.js.map