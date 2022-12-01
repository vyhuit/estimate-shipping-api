import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ProductModule} from './product/product.module';
import {SupplierModule} from './supplier/supplier.module';

@Module({
  imports: [
    ProductModule, SupplierModule, MongooseModule.forRoot(process.env.ROOT_ROOT_DATABASE_URL + process.env.ESTIMATE_DB_PRODUCT || "mongodb+srv://hoang:Voyenhoang1998@cluster0.cwg4pt0.mongodb.net/test")
  ]
})
export class AppModule {}
