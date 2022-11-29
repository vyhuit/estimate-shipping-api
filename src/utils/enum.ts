const DAY_IN_WEEK_INDEX = {
  sun: 0,
  mon: 1,
  tue: 2,
  web: 3,
  thu: 4,
  fri: 5,
  sat: 6
};

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

export {
  ESTIMATE_DEFAULT,
  DAY_IN_WEEK_INDEX
};