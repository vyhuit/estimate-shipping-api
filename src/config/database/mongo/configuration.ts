export default () => ({
  database: {
    host: process.env.ROOT_ROOT_DATABASE_URL,
    dbName: process.env.ESTIMATE_DB_PRODUCT
  }
});