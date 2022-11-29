import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';

@Module({
  imports: [
    ProductModule, SupplierModule, MongooseModule.forRoot(process.env.ROOT_DATABASE_URL + process.env.ESTIMATE_DB || "mongodb://localhost:27017/estimate-shipping")
  ]
})
export class AppModule {}
