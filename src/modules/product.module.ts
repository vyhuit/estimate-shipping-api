import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ProductType, ProductSchema} from 'src/schemas/product.schema';
import { Supplier, SupplierSchema } from 'src/schemas/supplier.schema';
import {ProductController} from '../controllers/product.controller';
import {ProductService} from '../services/product.service';

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
