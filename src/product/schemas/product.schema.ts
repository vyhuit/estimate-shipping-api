import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type ProductTypeDocument = ProductType & Document;

@Schema()
export class ProductType {

  @Prop({required: true})
  type : string;

  @Prop({required: true})
  supplierId : string;
}

export const ProductSchema = SchemaFactory.createForClass(ProductType);