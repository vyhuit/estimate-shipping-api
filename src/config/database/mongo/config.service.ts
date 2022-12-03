import {MongooseModule} from "@nestjs/mongoose"

const mongodbConnect = MongooseModule.forRoot(process.env.ROOT_ROOT_DATABASE_URL + process.env.ESTIMATE_DB_PRODUCT || "mongodb+srv://hoang:Voyenhoang1998@cluster0.cwg4pt0.mongodb.net/test")

export {
  mongodbConnect}