import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';

@Module({
  imports: [
    ProductModule, SupplierModule, MongooseModule.forRoot("mongodb+srv://hoang:Voyenhoang1998@cluster0.cwg4pt0.mongodb.net/estimate-shipping")
  ]
})
export class AppModule {}
