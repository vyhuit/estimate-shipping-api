import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Supplier, SupplierSchema } from './schemas/supplier.schema';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';

@Module({
  providers: [SupplierService],
  controllers: [SupplierController],
  imports: [MongooseModule.forFeature(
      [{
          name: Supplier.name,
          schema: SupplierSchema
        }]
    )]
})
export class SupplierModule {}
