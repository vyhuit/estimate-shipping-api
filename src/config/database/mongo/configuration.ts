export default function mongoConfig() {
  return {
    database: {
      host: process.env.ROOT_DATABASE_URL,
      dbName: process.env.MODE == "PRODUCTION" ? process.env.ESTIMATE_DB_PRODUCT: process.env.ESTIMATE_DB_DEV
    }
  }
};