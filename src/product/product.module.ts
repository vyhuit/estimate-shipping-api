import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ProductType, ProductSchema} from 'src/product/schemas/product.schema';
import { Supplier, SupplierSchema } from 'src/supplier/schemas/supplier.schema';
import {ProductController} from './product.controller';
import {ProductService} from './product.service';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [
    MongooseModule.forFeature(
      [{
          name: ProductType.name,
          schema: ProductSchema
        }]
    ),
    MongooseModule.forFeature(
      [{
          name: Supplier.name,
          schema: SupplierSchema
        }]
    )
  ]
})
export class ProductModule {}
