declare const DAY_IN_WEEK_INDEX: {
    sun: number;
    mon: number;
    tue: number;
    web: number;
    thu: number;
    fri: number;
    sat: number;
};
declare const ESTIMATE_DEFAULT: {
    name: string;
    config: {
        shipping: {
            min: number;
            max: number;
        };
        delivery: {
            min: number;
            max: number;
        };
    };
};
export { ESTIMATE_DEFAULT, DAY_IN_WEEK_INDEX };
